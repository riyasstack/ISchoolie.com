import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { argon2id, hash, verify } from 'argon2';
import {
  createHmac,
  randomInt,
  randomUUID,
  timingSafeEqual,
} from 'node:crypto';
import { PrismaService } from '../database/prisma.service';
import { canonicalPhone, validPassword } from './identity.util';
import { IdentityDelivery } from './identity.delivery';
import { SessionAccess } from './session-access';
import type { SessionRecord } from '@nestjs/authentication';

@Injectable()
export class IdentityPhoneService {
  private readonly dummy = hash(randomUUID(), {
    type: argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1,
  });
  constructor(
    private readonly db: PrismaService,
    private readonly delivery: IdentityDelivery,
    private readonly access: SessionAccess,
  ) {}
  private proof(id: string, code: string) {
    const key = process.env.AUTH_PROOF_KEY;
    if (!key || key.length < 32) throw new Error('AUTH_PROOF_KEY is required');
    return createHmac('sha256', key).update(`${id}:${code}`).digest('hex');
  }
  async start(
    phoneInput: string,
    kind: string,
    passwordInput: unknown,
    displayName?: string,
  ) {
    this.delivery.requireSms();
    const phone = canonicalPhone(phoneInput);
    if (!['REGISTER', 'RECOVER'].includes(kind))
      throw new BadRequestException('Invalid phone verification action');
    await hash(validPassword(passwordInput), {
      type: argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 1,
    });
    const existing = await this.db.phoneIdentity.findUnique({
      where: { phone },
      include: { user: true },
    });
    const id = randomUUID();
    const code = randomInt(100000, 1000000).toString();
    // Requests for an existing registration or an unknown recovery still return
    // an indistinguishable challenge id, but never create/link/reset an identity.
    const eligible =
      kind === 'REGISTER'
        ? !existing
        : !!existing &&
          existing.user.accountKind !== 'STUDENT' &&
          existing.user.status === 'ACTIVE';
    await this.db.identityPhoneChallenge.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    if (eligible) {
      const messageId = await this.db.$transaction(async (tx) => {
        await tx.identityPhoneChallenge.create({
          data: {
            id,
            phone,
            kind,
            userId: existing?.userId,
            codeHash: this.proof(id, code),
            payload: {
              displayName: displayName ?? 'Parent account',
              ...(existing ? { authVersion: existing.user.authVersion } : {}),
            },
            expiresAt: new Date(Date.now() + 5 * 60_000),
          },
        });
        return this.delivery.stageSms(tx, phone, kind, code, id);
      });
      this.delivery.kick(messageId);
    }
    return {
      challengeId: id,
      message:
        'If this mobile number is eligible, verification instructions are available through its configured channel.',
    };
  }
  async change(
    actor: SessionRecord,
    phoneInput: string,
    passwordInput: unknown,
  ) {
    this.delivery.requireSms();
    const phone = canonicalPhone(phoneInput);
    const user = await this.db.user.findUniqueOrThrow({
      where: { id: actor.userId },
    });
    if (
      user.status !== 'ACTIVE' ||
      user.accountKind === 'STUDENT' ||
      !user.passwordHash ||
      !(await this.db.phoneIdentity.findUnique({
        where: { userId: user.id },
      })) ||
      !(await verify(user.passwordHash, validPassword(passwordInput)).catch(
        () => false,
      ))
    )
      throw new UnauthorizedException(
        'Current account password and existing mobile credential required',
      );
    const id = randomUUID();
    const code = randomInt(100000, 1000000).toString();
    if (!(await this.db.phoneIdentity.findUnique({ where: { phone } }))) {
      const messageId = await this.db.$transaction(async (tx) => {
        await tx.identityPhoneChallenge.create({
          data: {
            id,
            phone,
            userId: user.id,
            kind: 'CHANGE',
            codeHash: this.proof(id, code),
            payload: { authVersion: user.authVersion, sessionId: actor.id },
            expiresAt: new Date(Date.now() + 5 * 60_000),
          },
        });
        return this.delivery.stageSms(tx, phone, 'CHANGE', code, id);
      });
      this.delivery.kick(messageId);
    }
    return {
      challengeId: id,
      message:
        'If this mobile number is eligible, its verification instructions are available through the configured channel.',
    };
  }
  async link(actor: SessionRecord, phoneInput: string, passwordInput: unknown) {
    this.delivery.requireSms();
    const phone = canonicalPhone(phoneInput);
    const user = await this.db.user.findUniqueOrThrow({
      where: { id: actor.userId },
    });
    if (
      user.status !== 'ACTIVE' ||
      user.accountKind === 'STUDENT' ||
      (await this.db.phoneIdentity.findUnique({ where: { userId: user.id } }))
    )
      throw new BadRequestException(
        'Account cannot add this mobile credential; use mobile change for an existing credential',
      );
    if (user.passwordHash) {
      if (
        !(await verify(user.passwordHash, validPassword(passwordInput)).catch(
          () => false,
        ))
      )
        throw new UnauthorizedException('Current password required');
    } else if (
      typeof actor.metadata?.authenticatedAt !== 'number' ||
      actor.metadata.authenticatedAt < Date.now() - 5 * 60_000 ||
      !(await this.db.providerIdentity.findFirst({
        where: { userId: user.id },
      }))
    )
      throw new UnauthorizedException(
        'Sign in with your provider again before adding a mobile credential',
      );
    const id = randomUUID();
    const code = randomInt(100000, 1000000).toString();
    if (!(await this.db.phoneIdentity.findUnique({ where: { phone } }))) {
      const messageId = await this.db.$transaction(async (tx) => {
        await tx.identityPhoneChallenge.create({
          data: {
            id,
            phone,
            userId: user.id,
            kind: 'LINK',
            codeHash: this.proof(id, code),
            payload: { authVersion: user.authVersion, sessionId: actor.id },
            expiresAt: new Date(Date.now() + 5 * 60_000),
          },
        });
        return this.delivery.stageSms(tx, phone, 'LINK', code, id);
      });
      this.delivery.kick(messageId);
    }
    return {
      challengeId: id,
      message:
        'If this number is eligible, verification instructions are available through the configured channel. No account has been merged.',
    };
  }
  async confirm(
    id: string,
    code: string,
    passwordInput: unknown,
    actor?: SessionRecord,
  ) {
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id,
      ) ||
      !/^\d{6}$/.test(code)
    )
      throw new BadRequestException('Invalid or expired mobile verification');
    const passwordHash =
      passwordInput === undefined
        ? undefined
        : await hash(validPassword(passwordInput), {
            type: argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 1,
          });
    // Increment BEFORE checking, outside the business transaction: failures
    // persist even when verification fails, and parallel guesses cannot outrun 5.
    const rows = await this.db.$queryRaw<
      { id: string }[]
    >`UPDATE "IdentityPhoneChallenge" SET attempts = attempts + 1 WHERE id = ${id}::uuid AND "consumedAt" IS NULL AND "expiresAt" > NOW() AND attempts < 5 RETURNING id`;
    if (!rows.length)
      throw new UnauthorizedException('Invalid or expired mobile verification');
    await this.db.$transaction(async (tx) => {
      const initial = await tx.identityPhoneChallenge.findUniqueOrThrow({
        where: { id },
      });
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(1704, hashtext(${initial.phone}))`;
      if (initial.userId)
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(1705, hashtext(${initial.userId}))`;
      await tx.$queryRaw`SELECT id FROM "IdentityPhoneChallenge" WHERE id = ${id}::uuid FOR UPDATE`;
      const challenge = await tx.identityPhoneChallenge.findUniqueOrThrow({
        where: { id },
      });
      const expected = this.proof(id, code);
      if (
        challenge.consumedAt ||
        challenge.expiresAt <= new Date() ||
        !timingSafeEqual(Buffer.from(challenge.codeHash), Buffer.from(expected))
      )
        throw new UnauthorizedException(
          'Invalid or expired mobile verification',
        );
      const payload = challenge.payload as {
        displayName: string;
        authVersion?: number;
        sessionId?: string;
      };
      if (!['CHANGE', 'LINK'].includes(challenge.kind) && !passwordHash)
        throw new BadRequestException('Choose the proof-owner password');
      if (challenge.kind === 'REGISTER') {
        if (
          await tx.phoneIdentity.findUnique({
            where: { phone: challenge.phone },
          })
        )
          throw new BadRequestException('Mobile verification unavailable');
        const user = await tx.user.create({
          data: {
            displayName: payload.displayName,
            passwordHash,
            accountKind: 'PARENT',
            status: 'ACTIVE',
            phones: {
              create: { phone: challenge.phone, verifiedAt: new Date() },
            },
          },
        });
        await tx.identityAudit.create({
          data: { userId: user.id, type: 'PARENT_MOBILE_VERIFIED' },
        });
      } else if (['CHANGE', 'LINK'].includes(challenge.kind)) {
        if (
          !actor ||
          actor.userId !== challenge.userId ||
          actor.id !== payload.sessionId ||
          actor.metadata?.authVersion !== payload.authVersion
        )
          throw new UnauthorizedException('Original account session required');
        const live = await tx.identitySession.findFirst({
          where: {
            id: actor.id,
            userId: actor.userId,
            authVersion: payload.authVersion,
            expiresAt: { gt: new Date() },
            user: {
              status: 'ACTIVE',
              accountKind: { not: 'STUDENT' },
              authVersion: payload.authVersion,
            },
          },
        });
        if (!live) throw new UnauthorizedException('Sign in again');
        if (
          await tx.phoneIdentity.findUnique({
            where: { phone: challenge.phone },
          })
        )
          throw new BadRequestException('Mobile number unavailable');
        const user = await tx.user.findUniqueOrThrow({
          where: { id: actor.userId },
        });
        if (challenge.kind === 'LINK') {
          if (
            user.accountKind === 'STUDENT' ||
            (await tx.phoneIdentity.findUnique({
              where: { userId: actor.userId },
            }))
          )
            throw new BadRequestException('Mobile credential unavailable');
          if (!user.passwordHash && !passwordHash)
            throw new BadRequestException(
              'Choose a password for your mobile credential',
            );
          if (user.passwordHash && passwordHash)
            throw new BadRequestException(
              'Linking preserves the current password; use password change separately',
            );
          await tx.phoneIdentity.create({
            data: {
              userId: actor.userId,
              phone: challenge.phone,
              verifiedAt: new Date(),
            },
          });
        } else
          await tx.phoneIdentity.update({
            where: { userId: actor.userId },
            data: { phone: challenge.phone, verifiedAt: new Date() },
          });
        await tx.user.update({
          where: { id: actor.userId },
          data: {
            authVersion: { increment: 1 },
            ...(!user.passwordHash && passwordHash ? { passwordHash } : {}),
          },
        });
        await tx.identitySession.deleteMany({
          where: { userId: actor.userId },
        });
        await tx.identityPhoneChallenge.updateMany({
          where: { userId: actor.userId, consumedAt: null },
          data: { consumedAt: new Date() },
        });
        await tx.identityChallenge.updateMany({
          where: { userId: actor.userId, consumedAt: null },
          data: { consumedAt: new Date() },
        });
        await tx.identityAudit.create({
          data: {
            userId: actor.userId,
            type:
              challenge.kind === 'LINK'
                ? 'PHONE_CREDENTIAL_LINKED'
                : 'PARENT_MOBILE_CHANGED',
          },
        });
      } else {
        if (!challenge.userId)
          throw new BadRequestException('Mobile verification unavailable');
        const credential = await tx.phoneIdentity.findUnique({
          where: { phone: challenge.phone },
        });
        if (credential?.userId !== challenge.userId)
          throw new BadRequestException('Mobile verification unavailable');
        if (typeof payload.authVersion !== 'number')
          throw new BadRequestException('Request a new mobile recovery proof');
        const updated = await tx.user.updateMany({
          where: {
            id: challenge.userId,
            authVersion: payload.authVersion,
            status: 'ACTIVE',
            accountKind: { not: 'STUDENT' },
          },
          data: { passwordHash, authVersion: { increment: 1 } },
        });
        if (!updated.count)
          throw new BadRequestException('Mobile verification unavailable');
        await tx.identitySession.deleteMany({
          where: { userId: challenge.userId },
        });
        await tx.identityPhoneChallenge.updateMany({
          where: { userId: challenge.userId, consumedAt: null },
          data: { consumedAt: new Date() },
        });
        await tx.identityChallenge.updateMany({
          where: { userId: challenge.userId, consumedAt: null },
          data: { consumedAt: new Date() },
        });
        await tx.identityAudit.create({
          data: { userId: challenge.userId, type: 'PARENT_PASSWORD_RECOVERED' },
        });
      }
      await tx.identityPhoneChallenge.update({
        where: { id },
        data: { consumedAt: new Date() },
      });
    });
    return {
      message:
        'Mobile number verified. Sign in with your mobile number and chosen password. No child relationship has been created.',
    };
  }
  async login(
    phoneInput: string,
    password: unknown,
    replacing?: string,
    parentOnly = true,
  ) {
    const phone = canonicalPhone(phoneInput);
    const credential = await this.db.phoneIdentity.findUnique({
      where: { phone },
      include: { user: true },
    });
    const matches =
      typeof password === 'string' &&
      password.length <= 128 &&
      (await verify(
        credential?.user.passwordHash ?? (await this.dummy),
        password,
      ).catch(() => false));
    if (
      !matches ||
      !credential ||
      credential.user.status !== 'ACTIVE' ||
      (parentOnly && credential.user.accountKind !== 'PARENT')
    )
      throw new UnauthorizedException('Invalid sign-in details');
    return this.access.issue(credential.user, replacing);
  }
}
