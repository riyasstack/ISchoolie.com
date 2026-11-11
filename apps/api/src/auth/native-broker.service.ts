import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
import { digest, token } from './identity.util';
import { oidcProviders } from './oidc.config';
import type { SessionRecord } from '@nestjs/authentication';
export const nativeReturnUri = () =>
  process.env.AUTH_NATIVE_REDIRECT_URI ?? 'ischoolie://auth-return';
@Injectable()
export class NativeBrokerService {
  constructor(
    private readonly db: PrismaService,
    private readonly access: SessionAccess,
  ) {}
  async start(
    provider: string,
    challenge: string,
    clientState: string,
    actor?: SessionRecord,
  ) {
    if (!Object.hasOwn(oidcProviders(), provider))
      throw new BadRequestException('Provider is not configured');
    if (
      !/^[a-f0-9]{64}$/.test(challenge) ||
      !/^[a-f0-9]{64}$/.test(clientState)
    )
      throw new BadRequestException('Invalid native challenge');
    await this.db.identityNativeBroker.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    const broker = await this.db.identityNativeBroker.create({
      data: {
        provider,
        challenge,
        clientState,
        linkUserId: actor?.userId,
        linkSessionId: actor?.id,
        expiresAt: new Date(Date.now() + 5 * 60_000),
      },
    });
    return {
      id: broker.id,
      url: `${process.env.AUTH_OIDC_CALLBACK_ORIGIN ?? 'http://localhost:3000'}/api/auth/oidc/native/${broker.id}/begin`,
      redirectUri: nativeReturnUri(),
    };
  }
  async begin(id: string) {
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id,
      )
    )
      throw new BadRequestException('Invalid native transaction');
    const claimed = await this.db.identityNativeBroker.updateMany({
      where: {
        id,
        oidcState: null,
        consumedAt: null,
        expiresAt: { gt: new Date() },
      },
      data: { oidcState: `STARTING:${id}` },
    });
    if (!claimed.count)
      throw new BadRequestException(
        'Native transaction already started or expired',
      );
    return this.db.identityNativeBroker.findUniqueOrThrow({ where: { id } });
  }
  async bind(id: string, state: string) {
    await this.db.identityNativeBroker.update({
      where: { id },
      data: { oidcState: state },
    });
  }
  async linkActor(broker: {
    linkUserId: string | null;
    linkSessionId: string | null;
  }): Promise<SessionRecord | undefined> {
    if (!broker.linkUserId || !broker.linkSessionId) return undefined;
    const row = await this.db.identitySession.findUnique({
      where: { id: broker.linkSessionId },
      include: { user: true },
    });
    const metadata = row?.metadata as Record<string, unknown> | undefined;
    if (
      !row ||
      row.userId !== broker.linkUserId ||
      row.user.status !== 'ACTIVE' ||
      row.authVersion !== row.user.authVersion ||
      row.mfa !== 'verified' ||
      row.expiresAt <= new Date() ||
      row.lastActiveAt.getTime() < Date.now() - 30 * 60_000 ||
      typeof metadata?.verifiedAt !== 'number' ||
      metadata.verifiedAt < Date.now() - 10 * 60_000
    )
      throw new UnauthorizedException(
        'Original recent-MFA session required to link',
      );
    return {
      id: row.id,
      userId: row.userId,
      createdAt: row.createdAt,
      lastActiveAt: row.lastActiveAt,
      expiresAt: row.expiresAt,
      mfa: 'verified',
      metadata,
    };
  }
  async handoff(state: string, user: { id: string; authVersion: number }) {
    const broker = await this.db.identityNativeBroker.findUnique({
      where: { oidcState: state },
    });
    if (!broker) return null;
    const code = token();
    const saved = await this.db.identityNativeBroker.updateMany({
      where: {
        id: broker.id,
        consumedAt: null,
        codeHash: null,
        expiresAt: { gt: new Date() },
      },
      data: {
        userId: user.id,
        authVersion: user.authVersion,
        codeHash: digest(code),
      },
    });
    if (!saved.count)
      throw new UnauthorizedException('Native handoff unavailable');
    const uri = new URL(nativeReturnUri());
    uri.searchParams.set('broker', broker.id);
    uri.searchParams.set('state', broker.clientState);
    uri.searchParams.set('code', code);
    return uri.toString();
  }
  async exchange(id: string, code: string, verifier: string) {
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id,
      ) ||
      !/^[A-Za-z0-9_-]{43}$/.test(code) ||
      !/^[a-f0-9]{64}$/.test(verifier)
    )
      throw new UnauthorizedException('Invalid native exchange');
    const user = await this.db.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT id FROM "IdentityNativeBroker" WHERE id = ${id}::uuid FOR UPDATE`;
      const broker = await tx.identityNativeBroker.findUnique({
        where: { id },
      });
      if (
        !broker ||
        broker.consumedAt ||
        broker.expiresAt <= new Date() ||
        broker.codeHash !== digest(code) ||
        broker.challenge !== digest(verifier) ||
        !broker.userId
      )
        throw new UnauthorizedException('Invalid or expired native exchange');
      const user = await tx.user.findFirst({
        where: {
          id: broker.userId,
          authVersion: broker.authVersion!,
          status: 'ACTIVE',
        },
      });
      if (!user) throw new UnauthorizedException('Sign in again');
      await tx.identityNativeBroker.update({
        where: { id },
        data: { consumedAt: new Date() },
      });
      return user;
    });
    return this.access.issue(user);
  }
}
