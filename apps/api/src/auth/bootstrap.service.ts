import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MfaService } from '@nestjs/authentication';
import { verify } from 'argon2';
import { PrismaService } from '../database/prisma.service';
import { IdentityDelivery } from './identity.delivery';
import {
  bodyFields,
  canonicalEmail,
  canonicalIdentifier,
  digest,
  text,
  token,
  validPassword,
} from './identity.util';

/** Offline administrative entry point; deliberately has no HTTP controller. */
@Injectable()
export class IdentityBootstrap {
  constructor(
    private readonly db: PrismaService,
    private readonly delivery: IdentityDelivery,
    private readonly mfa: MfaService,
  ) {}
  private enabled() {
    if (process.env.AUTH_BOOTSTRAP_ENABLED !== 'true')
      throw new ForbiddenException('Bootstrap is disabled');
    this.delivery.requireAvailable();
  }
  async operator(input: unknown) {
    this.enabled();
    const body = bodyFields(input, ['email', 'displayName']);
    const email = canonicalEmail(text(body, 'email'));
    const displayName = text(body, 'displayName', 100);
    const raw = token();
    const messageId = await this.db.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(1703, 1)`;
      if (await tx.platformOperator.count())
        throw new BadRequestException('Initial operator already exists');
      const user = await tx.user.create({
        data: {
          email,
          emailCanonical: email,
          displayName,
          accountKind: 'PLATFORM_OPERATOR',
          status: 'PENDING',
          operator: { create: {} },
        },
      });
      await tx.identityChallenge.create({
        data: {
          userId: user.id,
          kind: 'PRIVILEGED_ACTIVATE',
          tokenHash: digest(raw),
          expiresAt: new Date(Date.now() + 60 * 60_000),
        },
      });
      await tx.identityAudit.create({
        data: { userId: user.id, type: 'INITIAL_OPERATOR_BOOTSTRAPPED' },
      });
      return this.delivery.stageEmail(tx, email, 'PRIVILEGED_ACTIVATE', raw);
    });
    await this.delivery.dispatch(messageId);
    return {
      message:
        'Initial operator invitation created. Activation and MFA enrollment are required.',
    };
  }
  async institution(input: unknown) {
    this.enabled();
    const body = bodyFields(input, [
      'actorEmail',
      'password',
      'code',
      'institutionCode',
      'institutionName',
      'adminEmail',
      'adminName',
    ]);
    const actorEmail = canonicalEmail(text(body, 'actorEmail'));
    const actor = await this.db.user.findUnique({
      where: { emailCanonical: actorEmail },
      include: { operator: true },
    });
    if (
      !actor?.operator?.active ||
      actor.status !== 'ACTIVE' ||
      !actor.passwordHash ||
      !(await verify(actor.passwordHash, validPassword(body.password)).catch(
        () => false,
      ))
    )
      throw new ForbiddenException('Active operator password and MFA required');
    if (!(await this.mfa.verifyTotp(actor.id, text(body, 'code', 16))))
      throw new ForbiddenException('Active operator password and MFA required');
    const email = canonicalEmail(text(body, 'adminEmail'));
    const raw = token();
    const code = canonicalIdentifier(text(body, 'institutionCode', 64));
    const name = text(body, 'institutionName', 150);
    const displayName = text(body, 'adminName', 100);
    const result = await this.db.$transaction(async (tx) => {
      const live = await tx.platformOperator.findFirst({
        where: {
          userId: actor.id,
          active: true,
          user: { status: 'ACTIVE', authVersion: actor.authVersion },
        },
      });
      if (!live) throw new ForbiddenException('Operator unavailable');
      const institution = await tx.institutionIdentity.create({
        data: { code, name },
      });
      const admin = await tx.user.create({
        data: {
          email,
          emailCanonical: email,
          displayName,
          status: 'PENDING',
          accountKind: 'INSTITUTION_ADMIN',
          grants: {
            create: [
              'PROVISION_STUDENT',
              'PROVISION_STAFF',
              'MANAGE_IDENTITIES',
            ].map((permission) => ({
              institutionId: institution.id,
              permission,
            })),
          },
        },
      });
      await tx.identityChallenge.create({
        data: {
          userId: admin.id,
          kind: 'PRIVILEGED_ACTIVATE',
          tokenHash: digest(raw),
          expiresAt: new Date(Date.now() + 60 * 60_000),
        },
      });
      await tx.identityAudit.create({
        data: { userId: actor.id, type: 'INSTITUTION_ADMIN_BOOTSTRAPPED' },
      });
      const messageId = await this.delivery.stageEmail(
        tx,
        email,
        'PRIVILEGED_ACTIVATE',
        raw,
      );
      return {
        institutionId: institution.id,
        code: institution.code,
        messageId,
      };
    });
    await this.delivery.dispatch(result.messageId);
    return {
      institutionId: result.institutionId,
      code: result.code,
      message:
        'Institution and administrator invitation created. Activation and MFA required.',
    };
  }
  async resend(input: unknown) {
    this.enabled();
    const body = bodyFields(input, ['email']);
    const email = canonicalEmail(text(body, 'email'));
    const user = await this.db.user.findFirst({
      where: {
        emailCanonical: email,
        status: 'PENDING',
        accountKind: { in: ['INSTITUTION_ADMIN', 'PLATFORM_OPERATOR'] },
      },
    });
    if (!user)
      throw new BadRequestException(
        'Pending privileged invitation unavailable',
      );
    const raw = token();
    const messageId = await this.db.$transaction(async (tx) => {
      await tx.identityChallenge.create({
        data: {
          userId: user.id,
          authVersion: user.authVersion,
          kind: 'PRIVILEGED_ACTIVATE',
          tokenHash: digest(raw),
          expiresAt: new Date(Date.now() + 60 * 60_000),
        },
      });
      return this.delivery.stageEmail(tx, email, 'PRIVILEGED_ACTIVATE', raw);
    });
    await this.delivery.dispatch(messageId);
    return {
      message: 'Privileged invitation queued for its existing address.',
    };
  }
}
