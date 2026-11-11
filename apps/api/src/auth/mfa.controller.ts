import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  MfaService,
  Public,
  SessionService,
  type SessionRecord,
} from '@nestjs/authentication';
import type { Prisma } from '../generated/prisma/client';
import type { Request, Response } from 'express';
import { verify } from 'argon2';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
import { bodyFields, text, validPassword } from './identity.util';
import { IdentityService } from './identity.service';

@Controller('auth/mfa')
@Public()
export class IdentityMfaController {
  constructor(
    private readonly db: PrismaService,
    private readonly access: SessionAccess,
    private readonly mfa: MfaService,
    private readonly sessions: SessionService,
    private readonly identity: IdentityService,
  ) {}
  private async locked<T>(
    session: SessionRecord,
    action: (tx: Prisma.TransactionClient) => Promise<T>,
  ) {
    return this.db.$transaction(
      async (tx) => {
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(1702, hashtext(${session.userId}))`;
        // NO KEY UPDATE blocks reset/version changes but permits FK KEY SHARE
        // checks from the first-party store's separate pooled connection.
        const users = await tx.$queryRaw<
          { id: string }[]
        >`SELECT id FROM "User" WHERE id=${session.userId}::uuid AND "authVersion"=${Number(session.metadata?.authVersion)} AND status IN ('ACTIVE','RESTRICTED') FOR NO KEY UPDATE`;
        const live = await tx.identitySession.findFirst({
          where: {
            id: session.id,
            userId: session.userId,
            expiresAt: { gt: new Date() },
            lastActiveAt: { gt: new Date(Date.now() - 30 * 60_000) },
          },
        });
        if (!users.length || !live)
          throw new UnauthorizedException('Sign in again');
        return action(tx);
      },
      { timeout: 20000 },
    );
  }
  private async firstFactor(
    user: { id: string; passwordHash: string | null },
    password: unknown,
    authenticatedAt: unknown,
  ) {
    if (user.passwordHash) {
      if (
        !(await verify(user.passwordHash, validPassword(password)).catch(
          () => false,
        ))
      )
        throw new UnauthorizedException('Current password required');
      return Date.now();
    } else if (
      typeof authenticatedAt !== 'number' ||
      authenticatedAt < Date.now() - 5 * 60_000 ||
      !(await this.db.providerIdentity.findFirst({
        where: { userId: user.id },
      }))
    )
      throw new UnauthorizedException(
        'Sign in with your provider again before changing the authenticator',
      );
    return authenticatedAt;
  }
  @Get('status')
  async status(@Req() req: Request) {
    const session = await this.access.require(req, { pending: true });
    return {
      enrolled: await this.mfa.isEnrolled(session.userId),
      state: session.mfa ?? 'none',
      recoveryCodesRemaining: await this.mfa.remainingRecoveryCodes(
        session.userId,
      ),
    };
  }
  @Post('enroll')
  async enroll(@Body() input: unknown, @Req() req: Request) {
    this.access.csrf(req);
    const session = await this.access.require(req, { pending: true });
    const body = bodyFields(input, ['password']);
    await this.identity.limit(req.ip ?? '', `mfa-enroll:${session.userId}`);
    const user = await this.db.user.findUniqueOrThrow({
      where: { id: session.userId },
    });
    const authenticatedAt = await this.firstFactor(
      user,
      body.password,
      session.metadata?.authenticatedAt,
    );
    return this.locked(session, async (tx) => {
      if (await this.mfa.isEnrolled(user.id))
        throw new BadRequestException('Authenticator already enrolled');
      const enrollment = await this.mfa.enroll(
        user.id,
        user.email ?? user.displayName ?? 'iSchoolie account',
      );
      await tx.identitySession.update({
        where: { id: session.id },
        data: {
          metadata: JSON.parse(
            JSON.stringify({
              ...session.metadata,
              authenticatedAt,
              mfaEnrollmentAt: Date.now(),
            }),
          ),
        },
      });
      return enrollment;
    });
  }
  @Post('confirm')
  async confirm(
    @Body() input: unknown,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.access.csrf(req);
    const session = await this.access.require(req, { pending: true });
    const body = bodyFields(input, ['code']);
    const code = text(body, 'code', 16);
    const result = await this.locked(session, async (tx) => {
      if (
        typeof session.metadata?.mfaEnrollmentAt !== 'number' ||
        session.metadata.mfaEnrollmentAt < Date.now() - 10 * 60_000
      )
        throw new BadRequestException(
          'Start authenticator setup again; this enrollment session expired',
        );
      if (await this.mfa.isEnrolled(session.userId))
        throw new BadRequestException('Authenticator already confirmed');
      if (!(await this.mfa.confirm(session.userId, code)))
        throw new UnauthorizedException('Invalid authenticator code');
      const recoveryCodes = await this.mfa.generateRecoveryCodes(
        session.userId,
      );
      if (
        !(await tx.identitySession.deleteMany({ where: { id: session.id } }))
          .count
      )
        throw new UnauthorizedException('Sign in again');
      const user = await tx.user.update({
        where: { id: session.userId },
        data: { authVersion: { increment: 1 } },
      });
      await tx.identitySession.deleteMany({
        where: { userId: session.userId },
      });
      await tx.identityAudit.create({
        data: { userId: session.userId, type: 'MFA_CONFIRMED' },
      });
      return { user, recoveryCodes };
    });
    const issued = await this.sessions.create(result.user.id, {
      mfa: 'verified',
      metadata: {
        authVersion: result.user.authVersion,
        authenticatedAt: session.metadata?.authenticatedAt,
        verifiedAt: Date.now(),
      },
    });
    return this.access.respond(req, res, issued, {
      message:
        'Authenticator confirmed. Save these recovery codes securely; they are shown once.',
      recoveryCodes: result.recoveryCodes,
    });
  }
  @Post('verify')
  async verify(
    @Body() input: unknown,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.access.csrf(req);
    const session = await this.access.require(req, { pending: true });
    const body = bodyFields(input, ['code', 'recovery']);
    if (body.recovery !== undefined && typeof body.recovery !== 'boolean')
      throw new BadRequestException('Invalid recovery selection');
    const code = text(body, 'code', 64);
    await this.identity.limit(req.ip ?? '', `mfa:${session.userId}`);
    const issued = await this.locked(session, async (tx) => {
      if (
        !(await this.mfa.isEnrolled(session.userId)) ||
        !(await (body.recovery
          ? this.mfa.verifyRecoveryCode(session.userId, code)
          : this.mfa.verifyTotp(session.userId, code)))
      )
        throw new UnauthorizedException(
          'Invalid or already used second factor',
        );
      const issued = await this.access.rotateVerified(session);
      if (issued)
        await tx.identityAudit.create({
          data: { userId: session.userId, type: 'MFA_VERIFIED' },
        });
      return issued;
    });
    if (!issued) throw new UnauthorizedException('Sign in again');
    return this.access.respond(req, res, issued, {
      message: 'Second factor verified',
    });
  }
  @Post('recovery-codes')
  async recovery(@Req() req: Request) {
    this.access.csrf(req);
    const session = await this.access.require(req, { fresh: true });
    return this.locked(session, async (tx) => {
      const recoveryCodes = await this.mfa.generateRecoveryCodes(
        session.userId,
      );
      await tx.identityAudit.create({
        data: { userId: session.userId, type: 'MFA_RECOVERY_CODES_REPLACED' },
      });
      return { recoveryCodes };
    });
  }
  @Post('disable')
  async disable(
    @Body() input: unknown,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.access.csrf(req);
    const session = await this.access.require(req, { fresh: true });
    const body = bodyFields(input, ['password']);
    if (await this.access.privileged(session.userId))
      throw new ForbiddenException('Privileged accounts must retain MFA');
    await this.identity.limit(req.ip ?? '', `mfa-disable:${session.userId}`);
    const user = await this.db.user.findUniqueOrThrow({
      where: { id: session.userId },
    });
    await this.firstFactor(
      user,
      body.password,
      session.metadata?.authenticatedAt,
    );
    const updated = await this.locked(session, async (tx) => {
      if (await this.access.privileged(user.id))
        throw new ForbiddenException('Privileged accounts must retain MFA');
      if (
        !(await tx.identitySession.deleteMany({ where: { id: session.id } }))
          .count
      )
        throw new UnauthorizedException('Sign in again');
      await this.mfa.disable(user.id);
      const updated = await tx.user.update({
        where: { id: user.id },
        data: { authVersion: { increment: 1 } },
      });
      await tx.identitySession.deleteMany({ where: { userId: user.id } });
      await tx.identityAudit.create({
        data: { userId: user.id, type: 'MFA_DISABLED' },
      });
      return updated;
    });
    return this.access.respond(req, res, await this.access.issue(updated), {
      message: 'Authenticator removed; previous sessions ended',
    });
  }
}
