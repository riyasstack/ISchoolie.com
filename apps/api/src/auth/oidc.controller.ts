import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { OidcService, Public, SessionService } from '@nestjs/authentication';
import type { Request, Response } from 'express';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
import { IdentityProof } from './identity-proof';
import { IdentityService } from './identity.service';
import { bodyFields, text } from './identity.util';
import { NativeBrokerService } from './native-broker.service';
@Controller('auth')
@Public()
export class IdentityOidcController {
  constructor(
    private readonly oidc: OidcService,
    private readonly access: SessionAccess,
    private readonly proof: IdentityProof,
    private readonly identity: IdentityService,
    private readonly db: PrismaService,
    private readonly broker: NativeBrokerService,
    private readonly sessions: SessionService,
  ) {}
  @Post('oidc/:provider/start')
  async start(
    @Param('provider') provider: string,
    @Body() input: unknown,
    @Req() req: Request,
  ) {
    this.access.origin(req);
    const body = bodyFields(input, ['link']);
    if (body.link !== undefined && typeof body.link !== 'boolean')
      throw new BadRequestException('Invalid link option');
    if (this.access.native(req))
      throw new BadRequestException('Native browser broker is not configured');
    await this.identity.limit(req.ip ?? '', `oidc:${req.ip}`);
    if (body.link) {
      this.access.csrf(req);
      await this.access.require(req, { fresh: true });
    }
    const result = await this.oidc.start(provider, {
      link: body.link === true,
      redirectTo: '/auth/sign-in',
    });
    return { url: result.url };
  }
  @Get('oidc/:provider/callback')
  async callback(
    @Param('provider') provider: string,
    @Query() query: Record<string, unknown>,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const native =
        typeof query.state === 'string'
          ? await this.db.identityNativeBroker.findUnique({
              where: { oidcState: query.state },
            })
          : null;
      const actor = native ? await this.broker.linkActor(native) : undefined;
      const result = await this.proof.run(
        req,
        () => this.oidc.finish(provider, query),
        actor,
      );
      if (native) {
        const sessionCookie = result.cookies[0]
          ?.split(';')[0]
          ?.split('=')
          .slice(1)
          .join('=');
        const session = await this.sessions.validate(sessionCookie);
        if (!session) throw new Error('Native callback session unavailable');
        const user = await this.db.user.findUniqueOrThrow({
          where: { id: session.userId },
        });
        await this.sessions.revoke(session.id, { userId: user.id });
        res.appendHeader('Set-Cookie', this.sessions.clearCookie());
        const uri = await this.broker.handoff(String(query.state), user);
        if (!uri) throw new Error('Native callback unavailable');
        res.redirect(303, uri);
        return;
      }
      res.redirect(303, result.url);
    } catch {
      res.redirect(303, '/auth/sign-in?auth_error=provider');
    }
  }
  @Post('native/oidc/start')
  async nativeStart(@Body() input: unknown, @Req() req: Request) {
    this.access.origin(req);
    if (!this.access.native(req))
      throw new BadRequestException('Native transport required');
    const body = bodyFields(input, ['provider', 'challenge', 'state', 'link']);
    if (body.link !== undefined && typeof body.link !== 'boolean')
      throw new BadRequestException('Invalid link option');
    await this.identity.limit(req.ip ?? '', `native-oidc:${req.ip}`);
    const actor = body.link
      ? await this.access.require(req, { fresh: true })
      : undefined;
    return this.broker.start(
      text(body, 'provider', 20),
      text(body, 'challenge', 64),
      text(body, 'state', 64),
      actor,
    );
  }
  @Get('oidc/native/:id/begin')
  async nativeBegin(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.identity.limit(req.ip ?? '', `native-browser:${req.ip}`);
    const broker = await this.broker.begin(id);
    const result = await this.oidc.start(broker.provider, {
      redirectTo: '/auth/sign-in',
    });
    const state = new URL(result.url).searchParams.get('state');
    if (!state) throw new Error('Provider transaction unavailable');
    await this.broker.bind(broker.id, state);
    res.redirect(303, result.url);
  }
  @Post('native/oidc/exchange')
  async nativeExchange(
    @Body() input: unknown,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.access.origin(req);
    if (!this.access.native(req))
      throw new BadRequestException('Native transport required');
    const body = bodyFields(input, ['id', 'code', 'verifier']);
    await this.identity.limit(req.ip ?? '', `native-exchange:${req.ip}`);
    return this.access.respond(
      req,
      res,
      await this.broker.exchange(
        text(body, 'id', 36),
        text(body, 'code', 43),
        text(body, 'verifier', 64),
      ),
      { message: 'Provider identity verified' },
    );
  }
  @Get('providers')
  async linked(@Req() req: Request) {
    const actor = await this.access.require(req);
    return {
      providers: await this.db.providerIdentity.findMany({
        where: { userId: actor.userId },
        select: { id: true, provider: true, linkedAt: true },
      }),
    };
  }
  @Post('providers/unlink')
  async unlink(@Body() input: unknown, @Req() req: Request) {
    this.access.csrf(req);
    const actor = await this.access.require(req, { fresh: true });
    const body = bodyFields(input, ['provider']);
    const provider = text(body, 'provider', 20);
    await this.db.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT id FROM "User" WHERE id = ${actor.userId}::uuid FOR UPDATE`;
      const user = await tx.user.findUniqueOrThrow({
        where: { id: actor.userId },
      });
      const total = await tx.providerIdentity.count({
        where: { userId: user.id },
      });
      const institutional =
        !!user.passwordHash &&
        !!(await tx.institutionalLogin.findFirst({
          where: {
            userId: user.id,
            status: 'ACTIVE',
            institution: { active: true },
          },
        }));
      const email =
        !!user.passwordHash &&
        !!user.emailCanonical &&
        !!user.emailVerifiedAt &&
        user.accountKind !== 'STUDENT';
      const phone =
        !!user.passwordHash &&
        user.accountKind !== 'STUDENT' &&
        !!(await tx.phoneIdentity.findUnique({ where: { userId: user.id } }));
      if (total <= 1 && !institutional && !email && !phone)
        throw new BadRequestException('Cannot remove the last sign-in method');
      await tx.providerIdentity.deleteMany({
        where: { userId: user.id, provider },
      });
      await tx.user.update({
        where: { id: user.id },
        data: { authVersion: { increment: 1 } },
      });
      await tx.identitySession.deleteMany({ where: { userId: user.id } });
      await tx.identityAudit.create({
        data: { userId: user.id, type: 'PROVIDER_UNLINKED' },
      });
    });
    return { message: 'Provider removed. Sign in again.' };
  }
}
