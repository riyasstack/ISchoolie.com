import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { MfaService, Public, SessionService } from '@nestjs/authentication';
import type { Request, Response } from 'express';
import { argon2id, hash, verify } from 'argon2';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
import { bodyFields, text, validPassword } from './identity.util';
import { IdentityService } from './identity.service';
@Controller('auth')
@Public()
export class IdentitySessionsController {
  constructor(
    private readonly access: SessionAccess,
    private readonly sessions: SessionService,
    private readonly db: PrismaService,
    private readonly mfa: MfaService,
    private readonly identity: IdentityService,
  ) {}
  @Get('sessions')
  async list(@Req() req: Request) {
    const actor = await this.access.require(req);
    return {
      sessions: (await this.sessions.list(actor.userId)).map((value) => ({
        id: value.id,
        current: value.id === actor.id,
        createdAt: value.createdAt,
        lastActiveAt: value.lastActiveAt,
        expiresAt: value.expiresAt,
        mfa: value.mfa ?? 'none',
      })),
    };
  }
  @Post('sessions/revoke')
  async revoke(@Body() input: unknown, @Req() req: Request) {
    this.access.csrf(req);
    const actor = await this.access.require(req);
    const body = bodyFields(input, ['id']);
    const id = text(body, 'id', 43);
    if (!/^[A-Za-z0-9_-]{43}$/.test(id))
      throw new BadRequestException('Invalid session identifier');
    if (await this.sessions.revoke(id, { userId: actor.userId }))
      await this.db.identityAudit.create({
        data: { userId: actor.userId, type: 'SESSION_REVOKED' },
      });
    return { message: 'Session ended if it belonged to this account' };
  }
  @Post('refresh')
  async renew(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.access.csrf(req);
    const actor = await this.access.require(req);
    const issued = await this.sessions.rotate(actor);
    if (!issued) throw new UnauthorizedException('Sign in again');
    return this.access.respond(req, res, issued, {
      message: 'Session token renewed; absolute expiry is unchanged',
    });
  }
  @Post('password/change')
  async change(
    @Body() input: unknown,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.access.csrf(req);
    const actor = await this.access.require(req);
    if (await this.mfa.isEnrolled(actor.userId))
      await this.access.require(req, { fresh: true });
    const body = bodyFields(input, ['currentPassword', 'password']);
    await this.identity.limit(req.ip ?? '', `password-change:${actor.userId}`);
    const user = await this.db.user.findUniqueOrThrow({
      where: { id: actor.userId },
    });
    if (
      !user.passwordHash ||
      !(await verify(
        user.passwordHash,
        validPassword(body.currentPassword),
      ).catch(() => false))
    )
      throw new UnauthorizedException('Current password required');
    const passwordHash = await hash(validPassword(body.password), {
      type: argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 1,
    });
    await this.db.$transaction(async (tx) => {
      const changed = await tx.user.updateMany({
        where: {
          id: user.id,
          authVersion: user.authVersion,
          passwordHash: user.passwordHash,
          status: { in: ['ACTIVE', 'RESTRICTED'] },
        },
        data: { passwordHash, authVersion: { increment: 1 } },
      });
      if (!changed.count) throw new UnauthorizedException('Sign in again');
      await tx.identitySession.deleteMany({ where: { userId: user.id } });
      await tx.identityChallenge.updateMany({
        where: { userId: user.id, consumedAt: null },
        data: { consumedAt: new Date() },
      });
      await tx.identityPhoneChallenge.updateMany({
        where: { userId: user.id, consumedAt: null },
        data: { consumedAt: new Date() },
      });
      await tx.identityAudit.create({
        data: { userId: user.id, type: 'PASSWORD_CHANGED' },
      });
    });
    if (!this.access.native(req))
      res.setHeader('Set-Cookie', this.sessions.clearCookie());
    return { message: 'Password changed. Sign in again on every device.' };
  }
}
