import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  AuthenticationProvider,
  AuthenticationRegistry,
  MfaService,
  type SessionRecord,
} from '@nestjs/authentication';
import type { Request } from 'express';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
type SafeIdentity = {
  id: string;
  email: string | null;
  displayName: string | null;
};
@Injectable()
export class IdentitySessionProvider extends AuthenticationProvider<
  SafeIdentity,
  SessionRecord
> {
  constructor(
    private readonly db: PrismaService,
    private readonly access: SessionAccess,
    private readonly mfa: MfaService,
    registry: AuthenticationRegistry,
  ) {
    super();
    registry.registerProvider(this);
  }
  async authenticate(context: ExecutionContext) {
    if (context.getType() !== 'http') return null;
    const req = context.switchToHttp().getRequest<Request>();
    if (!this.access.raw(req)) return null;
    if (this.access.native(req)) this.access.origin(req);
    const session = await this.access.require(req, { pending: true });
    const user = await this.db.user.findFirst({
      where: {
        id: session.userId,
        status: 'ACTIVE',
        authVersion: Number(session.metadata?.authVersion),
      },
      select: { id: true, email: true, displayName: true },
    });
    if (!user) return null;
    const required =
      (await this.mfa.isEnrolled(user.id)) ||
      (await this.access.privileged(user.id));
    return {
      user,
      session,
      mfa:
        required && session.mfa !== 'verified'
          ? ('pending' as const)
          : session.mfa,
    };
  }
}
