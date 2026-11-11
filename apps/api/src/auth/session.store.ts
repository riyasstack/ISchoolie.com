import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  AuthenticationStorage,
  type SessionRecord,
  type SessionStore,
} from '@nestjs/authentication';
import { PrismaService } from '../database/prisma.service';
import type { IdentitySession } from '../generated/prisma/client';
import { IdentityProof } from './identity-proof';

function record(row: IdentitySession): SessionRecord {
  return {
    id: row.id,
    userId: row.userId,
    createdAt: row.createdAt,
    expiresAt: row.expiresAt,
    lastActiveAt: row.lastActiveAt,
    ...(row.mfa ? { mfa: row.mfa as 'pending' | 'verified' } : {}),
    metadata: row.metadata as Record<string, unknown>,
  };
}
@Injectable()
export class PostgresSessionStore implements SessionStore {
  constructor(
    private readonly db: PrismaService,
    storage: AuthenticationStorage,
    private readonly proof: IdentityProof,
  ) {
    storage.registerSource({ sessions: this });
  }
  async getSession(id: string) {
    const row = await this.db.identitySession.findUnique({
      where: { id },
      include: { user: true },
    });
    if (
      !row ||
      row.user.authVersion !== row.authVersion ||
      !['ACTIVE', 'RESTRICTED'].includes(row.user.status)
    )
      return undefined;
    return record(row);
  }
  async createSession(value: SessionRecord) {
    // The password verifier carries the version it verified. A concurrent reset
    // cannot turn an earlier password proof into a live session.
    await this.db.$transaction(async (tx) => {
      const user = await tx.user.findUniqueOrThrow({
        where: { id: value.userId },
      });
      const expectedVersion =
        value.metadata?.authVersion ?? this.proof.version(value.userId);
      if (
        !['ACTIVE', 'RESTRICTED'].includes(user.status) ||
        expectedVersion !== user.authVersion
      )
        throw new UnauthorizedException('Sign in again');
      value.metadata = {
        authenticatedAt: Date.now(),
        ...value.metadata,
        authVersion: user.authVersion,
      };
      await tx.identitySession.deleteMany({
        where: { expiresAt: { lt: new Date() } },
      });
      await tx.identitySession.create({
        data: {
          ...value,
          mfa: value.mfa,
          metadata: JSON.parse(JSON.stringify(value.metadata ?? {})),
          authVersion: user.authVersion,
        },
      });
      await tx.identityAudit.create({
        data: { userId: user.id, type: 'SESSION_CREATED' },
      });
    });
  }
  async touchSession(id: string, lastActiveAt: Date) {
    await this.db.identitySession.updateMany({
      where: { id, lastActiveAt: { lt: lastActiveAt } },
      data: { lastActiveAt },
    });
  }
  async deleteSession(id: string) {
    return (
      (await this.db.identitySession.deleteMany({ where: { id } })).count > 0
    );
  }
  async listUserSessions(userId: string) {
    return (await this.db.identitySession.findMany({ where: { userId } })).map(
      record,
    );
  }
  async deleteUserSessions(userId: string) {
    await this.db.identitySession.deleteMany({ where: { userId } });
  }
}
