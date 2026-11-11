import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { SessionService } from '@nestjs/authentication';
import { hash, verify, argon2id } from 'argon2';
import { PrismaService } from '../database/prisma.service';
import { IdentityDelivery } from './identity.delivery';
import { canonicalEmail, digest, token, validPassword } from './identity.util';
import { SessionAccess } from './session-access';

const generic = {
  message:
    'If this account is eligible, instructions are available through its configured delivery channel.',
};
@Injectable()
export class IdentityService {
  private readonly dummyHash = hash('unusable-comparison-' + token(), {
    type: argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1,
  });
  constructor(
    private readonly db: PrismaService,
    private readonly sessions: SessionService,
    private readonly delivery: IdentityDelivery,
    private readonly access: SessionAccess,
  ) {}

  async limit(ip: string, identifier: string) {
    await this.db.identityRateLimit.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    // Atomic across API instances. Identifiers and IPs are never stored raw.
    for (const [key, maximum] of [
      [`ip:${digest(ip)}`, 60],
      [`account:${digest(identifier)}`, 10],
    ] as const) {
      const expires = new Date(Date.now() + 15 * 60_000);
      const rows = await this.db.$queryRaw<
        { count: number }[]
      >`INSERT INTO "IdentityRateLimit" ("key", "count", "expiresAt") VALUES (${key}, 1, ${expires}) ON CONFLICT ("key") DO UPDATE SET "count" = CASE WHEN "IdentityRateLimit"."expiresAt" <= NOW() THEN 1 ELSE "IdentityRateLimit"."count" + 1 END, "expiresAt" = CASE WHEN "IdentityRateLimit"."expiresAt" <= NOW() THEN EXCLUDED."expiresAt" ELSE "IdentityRateLimit"."expiresAt" END RETURNING "count"`;
      if (rows[0].count > maximum)
        throw new HttpException('Too many attempts. Try again later.', 429);
    }
  }
  async register(
    emailInput: string,
    passwordInput: unknown,
    displayName: string,
  ) {
    this.delivery.requireAvailable();
    const email = canonicalEmail(emailInput);
    const passwordHash = await hash(validPassword(passwordInput), {
      type: argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 1,
    });
    const existing = await this.db.user.findFirst({
      where: {
        OR: [
          { emailCanonical: email },
          { email: { equals: email, mode: 'insensitive' } },
        ],
      },
    });
    if (existing) {
      // Resend only to the address already owned by this pending identity.
      // Verification requires a fresh password, preventing pre-registration
      // with an attacker's password from surviving the email owner's proof.
      if (
        existing.status === 'PENDING' &&
        existing.accountKind === 'PUBLIC' &&
        !existing.emailVerifiedAt
      ) {
        const raw = token();
        await this.emailChallenge(
          existing.id,
          'EMAIL_VERIFY',
          email,
          raw,
          30 * 60_000,
        );
      }
      return generic;
    }
    const raw = token();
    let messageId: string;
    try {
      messageId = await this.db.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email,
            emailCanonical: email,
            passwordHash,
            displayName,
            status: 'PENDING',
            accountKind: 'PUBLIC',
          },
        });
        await tx.identityChallenge.create({
          data: {
            userId: user.id,
            kind: 'EMAIL_VERIFY',
            tokenHash: digest(raw),
            expiresAt: new Date(Date.now() + 30 * 60_000),
          },
        });
        await tx.identityAudit.create({
          data: { userId: user.id, type: 'REGISTRATION_PENDING' },
        });
        return this.delivery.stageEmail(tx, email, 'EMAIL_VERIFY', raw);
      });
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002') return generic;
      throw error;
    }
    this.delivery.kick(messageId);
    return generic;
  }
  async verifyEmail(raw: string, passwordInput: unknown) {
    const passwordHash = await hash(validPassword(passwordInput), {
      type: argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 1,
    });
    await this.db.$transaction(async (tx) => {
      const challenge = await tx.identityChallenge.findUnique({
        where: { tokenHash: digest(raw) },
      });
      if (
        !challenge ||
        challenge.kind !== 'EMAIL_VERIFY' ||
        challenge.expiresAt <= new Date() ||
        challenge.consumedAt
      )
        throw new BadRequestException('Invalid or expired verification');
      await tx.$queryRaw`SELECT id FROM "User" WHERE id = ${challenge.userId}::uuid FOR UPDATE`;
      const claimed = await tx.identityChallenge.updateMany({
        where: {
          id: challenge.id,
          consumedAt: null,
          expiresAt: { gt: new Date() },
        },
        data: { consumedAt: new Date() },
      });
      if (!claimed.count)
        throw new BadRequestException('Invalid or expired verification');
      const updated = await tx.user.updateMany({
        where: {
          id: challenge.userId,
          authVersion: challenge.authVersion,
          status: 'PENDING',
          accountKind: 'PUBLIC',
        },
        data: {
          emailVerifiedAt: new Date(),
          status: 'ACTIVE',
          passwordHash,
          authVersion: { increment: 1 },
        },
      });
      if (!updated.count)
        throw new BadRequestException('Account cannot be activated');
      await tx.identityChallenge.updateMany({
        where: {
          userId: challenge.userId,
          kind: 'EMAIL_VERIFY',
          consumedAt: null,
        },
        data: { consumedAt: new Date() },
      });
      await tx.identityAudit.create({
        data: { userId: challenge.userId, type: 'EMAIL_VERIFIED' },
      });
    });
    return { message: 'Email verified. You can sign in.' };
  }
  async login(emailInput: string, passwordInput: unknown, replacing?: string) {
    const email = canonicalEmail(emailInput);
    if (typeof passwordInput !== 'string' || passwordInput.length > 128)
      throw new UnauthorizedException('Invalid sign-in details');
    const user = await this.db.user.findUnique({
      where: { emailCanonical: email },
    });
    const matches = await verify(
      user?.passwordHash ?? (await this.dummyHash),
      passwordInput,
    ).catch(() => false);
    if (
      !matches ||
      !user ||
      user.status !== 'ACTIVE' ||
      user.accountKind === 'STUDENT' ||
      !user.emailVerifiedAt
    )
      throw new UnauthorizedException('Invalid sign-in details');
    const issued = await this.access.issue(user, replacing);
    await this.db.identityAudit.create({
      data: { userId: user.id, type: 'PASSWORD_SIGN_IN' },
    });
    return issued;
  }
  async requestReset(emailInput: string) {
    this.delivery.requireAvailable();
    const email = canonicalEmail(emailInput);
    const user = await this.db.user.findUnique({
      where: { emailCanonical: email },
    });
    if (
      !user ||
      user.status !== 'ACTIVE' ||
      user.accountKind === 'STUDENT' ||
      !user.emailVerifiedAt
    )
      return generic;
    const raw = token();
    await this.emailChallenge(
      user.id,
      'PASSWORD_RESET',
      email,
      raw,
      15 * 60_000,
    );
    return generic;
  }
  async privilegedLogin(
    emailInput: string,
    passwordInput: unknown,
    replacing?: string,
  ) {
    const email = canonicalEmail(emailInput);
    const user = await this.db.user.findUnique({
      where: { emailCanonical: email },
    });
    const matches =
      typeof passwordInput === 'string' &&
      passwordInput.length <= 128 &&
      (await verify(
        user?.passwordHash ?? (await this.dummyHash),
        passwordInput,
      ).catch(() => false));
    if (
      !matches ||
      !user ||
      user.status !== 'ACTIVE' ||
      !user.emailVerifiedAt ||
      !(await this.access.privileged(user.id))
    )
      throw new UnauthorizedException('Invalid privileged sign-in details');
    return this.access.issue(user, replacing);
  }
  async privilegedRecovery(emailInput: string) {
    this.delivery.requireAvailable();
    const email = canonicalEmail(emailInput);
    const user = await this.db.user.findUnique({
      where: { emailCanonical: email },
    });
    if (
      user?.status === 'ACTIVE' &&
      user.emailVerifiedAt &&
      (await this.access.privileged(user.id))
    ) {
      const raw = token();
      await this.emailChallenge(
        user.id,
        'PRIVILEGED_RESET',
        email,
        raw,
        15 * 60_000,
      );
    }
    return generic;
  }
  private async emailChallenge(
    userId: string,
    kind: string,
    email: string,
    raw: string,
    ttl: number,
  ) {
    const messageId = await this.db.$transaction(async (tx) => {
      const user = await tx.user.findUniqueOrThrow({ where: { id: userId } });
      await tx.identityChallenge.create({
        data: {
          userId,
          kind,
          authVersion: user.authVersion,
          tokenHash: digest(raw),
          expiresAt: new Date(Date.now() + ttl),
        },
      });
      return this.delivery.stageEmail(tx, email, kind, raw);
    });
    this.delivery.kick(messageId);
  }
  async reset(raw: string, passwordInput: unknown) {
    const passwordHash = await hash(validPassword(passwordInput), {
      type: argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 1,
    });
    await this.db.$transaction(async (tx) => {
      const challenge = await tx.identityChallenge.findUnique({
        where: { tokenHash: digest(raw) },
      });
      if (
        !challenge ||
        !['PASSWORD_RESET', 'INSTITUTION_RESET', 'PRIVILEGED_RESET'].includes(
          challenge.kind,
        ) ||
        challenge.expiresAt <= new Date() ||
        challenge.consumedAt
      )
        throw new BadRequestException('Invalid or expired recovery token');
      await tx.$queryRaw`SELECT id FROM "User" WHERE id = ${challenge.userId}::uuid FOR UPDATE`;
      const claimed = await tx.identityChallenge.updateMany({
        where: {
          id: challenge.id,
          consumedAt: null,
          expiresAt: { gt: new Date() },
        },
        data: { consumedAt: new Date() },
      });
      if (!claimed.count)
        throw new BadRequestException('Invalid or expired recovery token');
      if (
        challenge.kind === 'INSTITUTION_RESET' &&
        (!challenge.identityId ||
          !(await tx.institutionalLogin.findFirst({
            where: {
              id: challenge.identityId,
              userId: challenge.userId,
              status: 'ACTIVE',
              institution: { active: true },
            },
          })))
      )
        throw new BadRequestException('Institution credential unavailable');
      const updated = await tx.user.updateMany({
        where: {
          id: challenge.userId,
          authVersion: challenge.authVersion,
          status: {
            in:
              challenge.kind === 'INSTITUTION_RESET'
                ? ['ACTIVE', 'RESTRICTED']
                : ['ACTIVE'],
          },
          ...(challenge.kind === 'PASSWORD_RESET'
            ? {
                accountKind: { not: 'STUDENT' },
                emailVerifiedAt: { not: null },
              }
            : {}),
        },
        data: { passwordHash, authVersion: { increment: 1 } },
      });
      if (!updated.count)
        throw new BadRequestException('Account cannot be recovered');
      await tx.identitySession.deleteMany({
        where: { userId: challenge.userId },
      });
      await tx.identityChallenge.updateMany({
        where: { userId: challenge.userId, consumedAt: null },
        data: { consumedAt: new Date() },
      });
      await tx.identityPhoneChallenge.updateMany({
        where: { userId: challenge.userId, consumedAt: null },
        data: { consumedAt: new Date() },
      });
      await tx.identityAudit.create({
        data: { userId: challenge.userId, type: 'PASSWORD_RESET' },
      });
    });
    return { message: 'Password updated. Sign in again.' };
  }
}
