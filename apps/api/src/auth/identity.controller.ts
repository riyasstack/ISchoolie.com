import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SessionService, Public } from '@nestjs/authentication';
import type { Request, Response } from 'express';
import { PrismaService } from '../database/prisma.service';
import { IdentityService } from './identity.service';
import { bodyFields, canonicalEmail, digest, text } from './identity.util';
import { SessionAccess } from './session-access';
import { oidcProviders } from './oidc.config';
import {
  localEmail,
  localSms,
  emailConfigured,
  smsConfigured,
} from './delivery.config';

@Controller('auth')
// Public entry points; session operations below explicitly validate the session
// and all cookie-authenticated writes also validate origin and CSRF.
@Public()
export class IdentityController {
  constructor(
    private readonly identity: IdentityService,
    private readonly sessions: SessionService,
    private readonly db: PrismaService,
    private readonly access: SessionAccess,
  ) {}
  private raw(req: Request) {
    return this.access.raw(req);
  }
  private async session(req: Request) {
    return this.access.require(req, { pending: true });
  }
  private origin(req: Request) {
    this.access.origin(req);
  }
  private csrf(req: Request) {
    this.access.csrf(req);
  }
  @Get('capabilities')
  capabilities() {
    const configured = oidcProviders();
    return {
      emailPassword: true,
      emailDelivery: localEmail()
        ? 'LOCAL_CAPTURE_ONLY'
        : emailConfigured()
          ? 'CONFIGURED_UNVERIFIED'
          : 'UNCONFIGURED',
      smsDelivery: localSms()
        ? 'LOCAL_CAPTURE_ONLY'
        : smsConfigured()
          ? 'CONFIGURED_UNVERIFIED'
          : 'UNCONFIGURED',
      providers: Object.fromEntries(
        ['google', 'github', 'apple'].map((provider) => [
          provider,
          Object.hasOwn(configured, provider)
            ? 'CONFIGURED_UNVERIFIED'
            : 'UNCONFIGURED',
        ]),
      ),
      student: 'RESTRICTED_LOGIN',
      staff: 'IMPLEMENTED',
      parent: 'IMPLEMENTED_DELIVERY_REQUIRED',
      privileged: 'MFA_REQUIRED',
      native: 'IMPLEMENTED_DEVICE_QA_REQUIRED',
    };
  }
  @Post('register')
  async register(@Body() input: unknown, @Req() req: Request) {
    this.origin(req);
    const body = bodyFields(input, ['email', 'password', 'displayName']);
    const email = canonicalEmail(text(body, 'email'));
    await this.identity.limit(req.ip ?? '', email);
    return this.identity.register(
      email,
      body.password,
      text(body, 'displayName', 100),
    );
  }
  @Post('verify-email')
  async verify(@Body() input: unknown, @Req() req: Request) {
    this.origin(req);
    const body = bodyFields(input, ['token', 'password']);
    await this.identity.limit(req.ip ?? '', `verify:${req.ip}`);
    return this.identity.verifyEmail(text(body, 'token', 128), body.password);
  }
  @Post('login/email')
  async login(
    @Body() input: unknown,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.origin(req);
    const body = bodyFields(input, ['email', 'password']);
    const email = canonicalEmail(text(body, 'email'));
    await this.identity.limit(req.ip ?? '', email);
    const issued = await this.identity.login(
      email,
      body.password,
      this.raw(req),
    );
    return this.access.respond(req, res, issued, {
      message:
        issued.session.mfa === 'pending'
          ? 'Second factor required'
          : 'Signed in',
    });
  }
  @Get('me')
  async me(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const session = await this.session(req);
    res.setHeader('Cache-Control', 'no-store');
    const user = await this.db.user.findUniqueOrThrow({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        status: true,
        accountKind: true,
      },
    });
    const permissions =
      session.mfa === 'verified' && user.status === 'ACTIVE'
        ? await this.db.institutionGrant.findMany({
            where: { userId: user.id, active: true },
            select: {
              institutionId: true,
              permission: true,
              institution: { select: { code: true, name: true } },
            },
          })
        : [];
    return {
      user,
      csrf: this.access.native(req)
        ? undefined
        : digest(`csrf:${this.raw(req)}`),
      permissions,
      mfa: session.mfa ?? 'none',
      restricted: user.status === 'RESTRICTED',
      session: {
        id: session.id,
        createdAt: session.createdAt,
        expiresAt: session.expiresAt,
      },
    };
  }
  @Post('login/privileged')
  async privileged(
    @Body() input: unknown,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.origin(req);
    const body = bodyFields(input, ['email', 'password']);
    const email = canonicalEmail(text(body, 'email'));
    await this.identity.limit(req.ip ?? '', `privileged:${email}`);
    return this.access.respond(
      req,
      res,
      await this.identity.privilegedLogin(email, body.password, this.raw(req)),
      { message: 'Second factor required' },
    );
  }
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.csrf(req);
    const session = await this.session(req);
    if (await this.sessions.revoke(session.id, { userId: session.userId }))
      await this.db.identityAudit.create({
        data: { userId: session.userId, type: 'SIGNED_OUT' },
      });
    if (!this.access.native(req))
      res.setHeader('Set-Cookie', this.sessions.clearCookie());
    return { message: 'Signed out' };
  }
  @Post('logout-all')
  async logoutAll(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.csrf(req);
    const session = await this.session(req);
    await this.db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: session.userId },
        data: { authVersion: { increment: 1 } },
      });
      await tx.identitySession.deleteMany({
        where: { userId: session.userId },
      });
    });
    if (!this.access.native(req))
      res.setHeader('Set-Cookie', this.sessions.clearCookie());
    return { message: 'All sessions ended' };
  }
  @Post('recovery/email')
  async recovery(@Body() input: unknown, @Req() req: Request) {
    this.origin(req);
    const body = bodyFields(input, ['email']);
    const email = canonicalEmail(text(body, 'email'));
    await this.identity.limit(req.ip ?? '', email);
    return this.identity.requestReset(email);
  }
  @Post('recovery/reset')
  async reset(@Body() input: unknown, @Req() req: Request) {
    this.origin(req);
    const body = bodyFields(input, ['token', 'password']);
    await this.identity.limit(req.ip ?? '', `reset:${req.ip}`);
    return this.identity.reset(text(body, 'token', 128), body.password);
  }
  @Post('recovery/privileged')
  async privilegedRecovery(@Body() input: unknown, @Req() req: Request) {
    this.origin(req);
    const body = bodyFields(input, ['email']);
    const email = canonicalEmail(text(body, 'email'));
    await this.identity.limit(req.ip ?? '', `privileged-recovery:${email}`);
    return this.identity.privilegedRecovery(email);
  }
}
