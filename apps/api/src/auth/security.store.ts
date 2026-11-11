import { Injectable } from '@nestjs/common';
import {
  AuthenticationStorage,
  type MfaStore,
  type TotpRecord,
  type OidcStateStore,
  type OidcTransaction,
} from '@nestjs/authentication';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class IdentitySecurityStore implements MfaStore, OidcStateStore {
  constructor(
    private readonly db: PrismaService,
    storage: AuthenticationStorage,
  ) {
    storage.registerSource({ mfa: this, oidcStates: this });
  }
  async getTotp(userId: string): Promise<TotpRecord | undefined> {
    const row = await this.db.identityTotp.findUnique({ where: { userId } });
    return row
      ? {
          secret: row.secret,
          confirmed: row.confirmed,
          lastUsedStep: row.lastUsedStep,
          ...(row.pendingSecret ? { pendingSecret: row.pendingSecret } : {}),
        }
      : undefined;
  }
  async saveTotp(userId: string, value: TotpRecord | null) {
    if (!value) {
      await this.db.identityTotp.deleteMany({ where: { userId } });
      return;
    }
    await this.db
      .$executeRaw`INSERT INTO "IdentityTotp" ("userId", secret, confirmed, "pendingSecret", "lastUsedStep") VALUES (${userId}::uuid, ${value.secret}, ${value.confirmed}, ${value.pendingSecret ?? null}, ${value.lastUsedStep ?? -1}) ON CONFLICT ("userId") DO UPDATE SET secret = EXCLUDED.secret, confirmed = EXCLUDED.confirmed, "pendingSecret" = EXCLUDED."pendingSecret", "lastUsedStep" = GREATEST("IdentityTotp"."lastUsedStep", EXCLUDED."lastUsedStep")`;
  }
  async claimTotpStep(userId: string, step: number) {
    return (
      (
        await this.db.identityTotp.updateMany({
          where: { userId, lastUsedStep: { lt: step } },
          data: { lastUsedStep: step },
        })
      ).count === 1
    );
  }
  async saveRecoveryCodes(userId: string, hashes: string[]) {
    await this.db.$transaction(async (tx) => {
      await tx.identityRecoveryCode.deleteMany({ where: { userId } });
      if (hashes.length)
        await tx.identityRecoveryCode.createMany({
          data: hashes.map((hash) => ({ userId, hash })),
        });
    });
  }
  async consumeRecoveryCode(userId: string, hash: string) {
    return (
      (
        await this.db.identityRecoveryCode.deleteMany({
          where: { userId, hash },
        })
      ).count === 1
    );
  }
  countRecoveryCodes(userId: string) {
    return this.db.identityRecoveryCode.count({ where: { userId } });
  }
  async recordMfaFailure(userId: string, windowMs: number, now: number) {
    await this.db.identityMfaFailure.create({
      data: { userId, at: BigInt(now) },
    });
    return this.countMfaFailures(userId, windowMs, now);
  }
  async countMfaFailures(userId: string, windowMs: number, now: number) {
    await this.db.identityMfaFailure.deleteMany({
      where: { userId, at: { lte: BigInt(now - windowMs) } },
    });
    return this.db.identityMfaFailure.count({
      where: { userId, at: { gt: BigInt(now - windowMs) } },
    });
  }
  async clearMfaFailures(userId: string) {
    await this.db.identityMfaFailure.deleteMany({ where: { userId } });
  }
  async saveOidcState(value: OidcTransaction) {
    await this.db.$transaction(async (tx) => {
      await tx.identityOidcState.deleteMany({
        where: { expiresAt: { lte: new Date() } },
      });
      // Global cap plus endpoint rate limiting bounds abandoned transactions.
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(1701, 1)`;
      if ((await tx.identityOidcState.count()) >= 10000)
        throw new Error('Too many pending sign-ins');
      await tx.identityOidcState.create({
        data: {
          state: value.state,
          data: JSON.parse(JSON.stringify(value)),
          expiresAt: value.expiresAt,
        },
      });
    });
  }
  async consumeOidcState(state: string) {
    const rows = await this.db.$queryRaw<
      { data: Record<string, unknown> }[]
    >`DELETE FROM "IdentityOidcState" WHERE state = ${state} RETURNING data`;
    const value = rows[0]?.data;
    return value
      ? ({
          ...value,
          createdAt: new Date(String(value.createdAt)),
          expiresAt: new Date(String(value.expiresAt)),
        } as OidcTransaction)
      : undefined;
  }
}
