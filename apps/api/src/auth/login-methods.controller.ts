import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { Public } from '@nestjs/authentication';
import type { Request } from 'express';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
@Controller('auth/login-methods')
@Public()
export class IdentityLoginMethodsController {
  constructor(
    private readonly db: PrismaService,
    private readonly access: SessionAccess,
  ) {}
  @Get()
  async list(@Req() req: Request) {
    const actor = await this.access.require(req);
    const user = await this.db.user.findUniqueOrThrow({
      where: { id: actor.userId },
      include: {
        phones: true,
        providers: true,
        logins: {
          include: {
            institution: { select: { code: true, name: true, active: true } },
          },
        },
      },
    });
    return {
      passwordConfigured: !!user.passwordHash,
      email: user.email
        ? { address: user.email, verified: !!user.emailVerifiedAt }
        : null,
      providers: user.providers.map((value) => ({
        provider: value.provider,
        id: value.id,
        linkedAt: value.linkedAt,
      })),
      phone: user.phones[0]
        ? {
            number: user.phones[0].phone,
            verifiedAt: user.phones[0].verifiedAt,
          }
        : null,
      institutions: user.logins.map((value) => ({
        identifier: value.identifier,
        kind: value.kind,
        status: value.status,
        institution: value.institution,
      })),
      message:
        'Login identifiers are separate from permissions. No secret provider tokens are exposed.',
    };
  }
  @Post('phone/unlink')
  async unlinkPhone(@Req() req: Request) {
    this.access.csrf(req);
    const actor = await this.access.require(req, { fresh: true });
    await this.db.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT id FROM "User" WHERE id=${actor.userId}::uuid FOR UPDATE`;
      const user = await tx.user.findUniqueOrThrow({
        where: { id: actor.userId },
      });
      const provider = !!(await tx.providerIdentity.findFirst({
        where: { userId: user.id },
      }));
      const email =
        !!user.passwordHash &&
        !!user.emailCanonical &&
        !!user.emailVerifiedAt &&
        user.accountKind !== 'STUDENT';
      const institution =
        !!user.passwordHash &&
        !!(await tx.institutionalLogin.findFirst({
          where: {
            userId: user.id,
            status: 'ACTIVE',
            institution: { active: true },
          },
        }));
      if (!provider && !email && !institution)
        throw new BadRequestException(
          'Cannot remove the last usable sign-in method',
        );
      await tx.phoneIdentity.deleteMany({ where: { userId: user.id } });
      await tx.user.update({
        where: { id: user.id },
        data: { authVersion: { increment: 1 } },
      });
      await tx.identitySession.deleteMany({ where: { userId: user.id } });
      await tx.identityPhoneChallenge.updateMany({
        where: { userId: user.id, consumedAt: null },
        data: { consumedAt: new Date() },
      });
      await tx.identityAudit.create({
        data: { userId: user.id, type: 'PHONE_CREDENTIAL_UNLINKED' },
      });
    });
    return {
      message: 'Mobile credential removed. Sign in again with another method.',
    };
  }
}
