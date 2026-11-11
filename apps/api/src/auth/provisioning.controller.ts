import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Public } from '@nestjs/authentication';
import type { Request, Response } from 'express';
import { SessionAccess } from './session-access';
import { ProvisioningService } from './provisioning.service';
import { bodyFields, text } from './identity.util';
import { IdentityService } from './identity.service';
const uuid = (value: string) => {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  )
    throw new BadRequestException('Invalid identifier');
  return value;
};
@Controller('auth')
@Public()
export class ProvisioningController {
  constructor(
    private readonly provisioning: ProvisioningService,
    private readonly access: SessionAccess,
    private readonly identity: IdentityService,
  ) {}
  @Post('login/institution')
  async login(
    @Body() input: unknown,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.access.origin(req);
    const body = bodyFields(input, [
      'institutionCode',
      'kind',
      'identifier',
      'password',
    ]);
    const institution = text(body, 'institutionCode', 64);
    const identifier = text(body, 'identifier', 64);
    const kind = text(body, 'kind', 10);
    await this.identity.limit(
      req.ip ?? '',
      `${institution}:${kind}:${identifier}`.normalize('NFKC').toUpperCase(),
    );
    const issued = await this.provisioning.login(
      institution,
      kind,
      identifier,
      body.password,
      this.access.raw(req),
    );
    return this.access.respond(req, res, issued, {
      message:
        issued.session.mfa === 'pending'
          ? 'Second factor required'
          : 'Signed in',
    });
  }
  @Post('activate/institution')
  async activate(@Body() input: unknown, @Req() req: Request) {
    this.access.origin(req);
    const body = bodyFields(input, ['token', 'password']);
    await this.identity.limit(req.ip ?? '', `institution-activate:${req.ip}`);
    return this.provisioning.activate(text(body, 'token', 128), body.password);
  }
  @Post('recovery/institution')
  async recovery(@Body() input: unknown, @Req() req: Request) {
    this.access.origin(req);
    const body = bodyFields(input, ['institutionCode', 'identifier']);
    const institution = text(body, 'institutionCode', 64);
    const identifier = text(body, 'identifier', 64);
    await this.identity.limit(
      req.ip ?? '',
      `institution-recovery:${institution}:${identifier}`.toUpperCase(),
    );
    return this.provisioning.requestRecovery(institution, identifier);
  }
  @Post('identities/claim')
  async claim(@Body() input: unknown, @Req() req: Request) {
    this.access.csrf(req);
    const actor = await this.access.require(req, { fresh: true });
    const body = bodyFields(input, ['token']);
    return this.provisioning.claim(actor, text(body, 'token', 128));
  }
  @Post('institutions/:institutionId/credentials')
  async provision(
    @Param('institutionId') institutionId: string,
    @Body() input: unknown,
    @Req() req: Request,
  ) {
    this.access.csrf(req);
    const actor = await this.access.require(req, { fresh: true });
    return this.provisioning.provision(actor, uuid(institutionId), input);
  }
  @Get('institutions/:institutionId/credentials')
  async list(
    @Param('institutionId') institutionId: string,
    @Req() req: Request,
  ) {
    const actor = await this.access.require(req, { fresh: true });
    return this.provisioning.list(actor, uuid(institutionId));
  }
  @Post('institutions/:institutionId/imports/preview')
  async preview(
    @Param('institutionId') institutionId: string,
    @Body() input: unknown,
    @Req() req: Request,
  ) {
    this.access.csrf(req);
    const actor = await this.access.require(req, { fresh: true });
    const body = bodyFields(input, ['rows']);
    return this.provisioning.preview(actor, uuid(institutionId), body.rows);
  }
  @Post('institutions/:institutionId/imports/:importId/commit')
  async commit(
    @Param('institutionId') institutionId: string,
    @Param('importId') importId: string,
    @Req() req: Request,
  ) {
    this.access.csrf(req);
    const actor = await this.access.require(req, { fresh: true });
    return this.provisioning.commit(actor, uuid(institutionId), uuid(importId));
  }
  @Post('institutions/:institutionId/credentials/:identityId/invite')
  async invite(
    @Param('institutionId') institutionId: string,
    @Param('identityId') identityId: string,
    @Req() req: Request,
  ) {
    this.access.csrf(req);
    const actor = await this.access.require(req, { fresh: true });
    return this.provisioning.invite(
      actor,
      uuid(institutionId),
      uuid(identityId),
    );
  }
  @Post('institutions/:institutionId/credentials/:identityId/revoke')
  async revoke(
    @Param('institutionId') institutionId: string,
    @Param('identityId') identityId: string,
    @Req() req: Request,
  ) {
    this.access.csrf(req);
    const actor = await this.access.require(req, { fresh: true });
    return this.provisioning.revoke(
      actor,
      uuid(institutionId),
      uuid(identityId),
    );
  }
  @Post('institutions/:institutionId/credentials/:identityId/recovery')
  async managedRecovery(
    @Param('institutionId') institutionId: string,
    @Param('identityId') identityId: string,
    @Req() req: Request,
  ) {
    this.access.csrf(req);
    const actor = await this.access.require(req, { fresh: true });
    return this.provisioning.recover(
      actor,
      uuid(institutionId),
      uuid(identityId),
    );
  }
}
