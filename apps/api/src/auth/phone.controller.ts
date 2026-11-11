import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Public, MfaService } from '@nestjs/authentication';
import type { Request, Response } from 'express';
import { SessionAccess } from './session-access';
import { IdentityPhoneService } from './phone.service';
import { bodyFields, canonicalPhone, text } from './identity.util';
import { IdentityService } from './identity.service';
@Controller('auth')
@Public()
export class IdentityPhoneController {
  constructor(
    private readonly phone: IdentityPhoneService,
    private readonly access: SessionAccess,
    private readonly identity: IdentityService,
    private readonly mfa: MfaService,
  ) {}
  @Post('phone/start')
  async start(@Body() input: unknown, @Req() req: Request) {
    this.access.origin(req);
    const body = bodyFields(input, [
      'phone',
      'kind',
      'password',
      'displayName',
    ]);
    const phone = canonicalPhone(text(body, 'phone', 30));
    await this.identity.limit(req.ip ?? '', `phone:${phone}`);
    const kind = text(body, 'kind', 12);
    const name =
      kind === 'REGISTER' ? text(body, 'displayName', 100) : undefined;
    return this.phone.start(phone, kind, body.password, name);
  }
  @Post('phone/confirm')
  async confirm(@Body() input: unknown, @Req() req: Request) {
    this.access.origin(req);
    const body = bodyFields(input, ['challengeId', 'code', 'password']);
    await this.identity.limit(req.ip ?? '', `phone-confirm:${req.ip}`);
    const id = text(body, 'challengeId', 36);
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id,
      )
    )
      throw new BadRequestException('Invalid challenge identifier');
    return this.phone.confirm(id, text(body, 'code', 6), body.password);
  }
  @Post('login/parent')
  async login(
    @Body() input: unknown,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.access.origin(req);
    const body = bodyFields(input, ['phone', 'password']);
    const phone = canonicalPhone(text(body, 'phone', 30));
    await this.identity.limit(req.ip ?? '', `phone:${phone}`);
    return this.access.respond(
      req,
      res,
      await this.phone.login(phone, body.password, this.access.raw(req)),
      { message: 'Signed in' },
    );
  }
  @Post('phone/change/start')
  async change(@Body() input: unknown, @Req() req: Request) {
    this.access.csrf(req);
    const actor = await this.access.require(req);
    if (await this.mfa.isEnrolled(actor.userId))
      await this.access.require(req, { fresh: true });
    const body = bodyFields(input, ['phone', 'password']);
    await this.identity.limit(req.ip ?? '', `phone-change:${actor.userId}`);
    return this.phone.change(actor, text(body, 'phone', 30), body.password);
  }
  @Post('phone/change/confirm')
  async confirmChange(@Body() input: unknown, @Req() req: Request) {
    this.access.csrf(req);
    const actor = await this.access.require(req);
    if (await this.mfa.isEnrolled(actor.userId))
      await this.access.require(req, { fresh: true });
    const body = bodyFields(input, ['challengeId', 'code']);
    await this.identity.limit(req.ip ?? '', `phone-change:${actor.userId}`);
    return this.phone.confirm(
      text(body, 'challengeId', 36),
      text(body, 'code', 6),
      undefined,
      actor,
    );
  }
  @Post('phone/link/start')
  async link(@Body() input: unknown, @Req() req: Request) {
    this.access.csrf(req);
    const actor = await this.access.require(req, { fresh: true });
    const body = bodyFields(input, ['phone', 'password']);
    await this.identity.limit(req.ip ?? '', `phone-link:${actor.userId}`);
    return this.phone.link(actor, text(body, 'phone', 30), body.password);
  }
  @Post('phone/link/confirm')
  async confirmLink(@Body() input: unknown, @Req() req: Request) {
    this.access.csrf(req);
    const actor = await this.access.require(req, { fresh: true });
    const body = bodyFields(input, ['challengeId', 'code', 'password']);
    await this.identity.limit(req.ip ?? '', `phone-link:${actor.userId}`);
    return this.phone.confirm(
      text(body, 'challengeId', 36),
      text(body, 'code', 6),
      body.password,
      actor,
    );
  }
  @Post('login/mobile')
  async mobile(
    @Body() input: unknown,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.access.origin(req);
    const body = bodyFields(input, ['phone', 'password']);
    const phone = canonicalPhone(text(body, 'phone', 30));
    await this.identity.limit(req.ip ?? '', `phone:${phone}`);
    return this.access.respond(
      req,
      res,
      await this.phone.login(phone, body.password, this.access.raw(req), false),
      { message: 'Signed in with the verified mobile credential' },
    );
  }
}
