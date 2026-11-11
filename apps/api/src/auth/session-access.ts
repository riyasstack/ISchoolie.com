import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  MfaService,
  SessionService,
  type IssuedSession,
  type SessionRecord,
} from '@nestjs/authentication';
import { timingSafeEqual } from 'node:crypto';
import type { Request, Response } from 'express';
import { PrismaService } from '../database/prisma.service';
import { digest } from './identity.util';

export function trustedOrigins() {
  return (process.env.AUTH_TRUSTED_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}
@Injectable()
export class SessionAccess {
  constructor(
    private readonly sessions: SessionService,
    private readonly mfa: MfaService,
    private readonly db: PrismaService,
  ) {}
  native(req: Request) {
    return req.headers['x-ischoolie-client'] === 'native';
  }
  raw(req: Request) {
    // Explicit transport separation: native requests never fall back to cookies.
    if (this.native(req))
      return /^Bearer ([A-Za-z0-9_-]{43})$/.exec(
        req.headers.authorization ?? '',
      )?.[1];
    if (req.headers.authorization) return undefined;
    return this.sessions.tokenFrom(req);
  }
  origin(req: Request) {
    if (this.native(req)) {
      if (req.headers.origin || req.headers.cookie)
        throw new ForbiddenException('Invalid native transport');
      return;
    }
    if (!req.headers.origin || !trustedOrigins().includes(req.headers.origin))
      throw new ForbiddenException('Trusted origin required');
  }
  csrf(req: Request) {
    this.origin(req);
    if (this.native(req)) return;
    const actual = req.headers['x-csrf-token'];
    const expected = digest(`csrf:${this.raw(req) ?? ''}`);
    if (
      typeof actual !== 'string' ||
      Buffer.byteLength(actual) !== Buffer.byteLength(expected) ||
      !timingSafeEqual(Buffer.from(actual), Buffer.from(expected))
    )
      throw new ForbiddenException('Session verification required');
  }
  async require(
    req: Request,
    options: { pending?: boolean; fresh?: boolean } = {},
  ) {
    const session = await this.sessions.validate(this.raw(req));
    if (!session) throw new UnauthorizedException('Sign in required');
    const needsMfa =
      session.mfa === 'pending' ||
      ((await this.mfa.isEnrolled(session.userId)) &&
        session.mfa !== 'verified') ||
      ((await this.privileged(session.userId)) && session.mfa !== 'verified');
    if (needsMfa && !options.pending)
      throw new UnauthorizedException('Second factor required');
    if (
      options.fresh &&
      (session.mfa !== 'verified' ||
        typeof session.metadata?.verifiedAt !== 'number' ||
        session.metadata.verifiedAt < Date.now() - 10 * 60_000)
    )
      throw new ForbiddenException(
        'Recent second-factor verification required',
      );
    return session;
  }
  async privileged(userId: string) {
    return (
      !!(await this.db.platformOperator.findFirst({
        where: { userId, active: true },
      })) ||
      !!(await this.db.institutionGrant.findFirst({
        where: { userId, active: true },
      }))
    );
  }
  respond(
    req: Request,
    res: Response,
    issued: IssuedSession,
    extra: Record<string, unknown> = {},
  ) {
    res.setHeader('Cache-Control', 'no-store');
    if (this.native(req))
      return {
        ...extra,
        token: issued.token,
        expiresAt: issued.session.expiresAt,
        mfa: issued.session.mfa ?? 'none',
      };
    res.setHeader('Set-Cookie', issued.cookie);
    return { ...extra, mfa: issued.session.mfa ?? 'none' };
  }
  async issue(user: { id: string; authVersion: number }, replacing?: string) {
    const pending =
      (await this.mfa.isEnrolled(user.id)) || (await this.privileged(user.id));
    return this.sessions.create(user.id, {
      replacing,
      ...(pending ? { mfa: 'pending' } : {}),
      metadata: { authVersion: user.authVersion, authenticatedAt: Date.now() },
    });
  }
  async rotateVerified(session: SessionRecord) {
    return this.sessions.rotate(session, {
      mfa: 'verified',
      metadata: { ...session.metadata, verifiedAt: Date.now() },
    });
  }
}
