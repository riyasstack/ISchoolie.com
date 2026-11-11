import { MfaService, SessionService, type IssuedSession, type SessionRecord } from '@nestjs/authentication';
import type { Request, Response } from 'express';
import { PrismaService } from '../database/prisma.service';
export declare function trustedOrigins(): string[];
export declare class SessionAccess {
    private readonly sessions;
    private readonly mfa;
    private readonly db;
    constructor(sessions: SessionService, mfa: MfaService, db: PrismaService);
    native(req: Request): boolean;
    raw(req: Request): string | undefined;
    origin(req: Request): void;
    csrf(req: Request): void;
    require(req: Request, options?: {
        pending?: boolean;
        fresh?: boolean;
    }): Promise<SessionRecord>;
    privileged(userId: string): Promise<boolean>;
    respond(req: Request, res: Response, issued: IssuedSession, extra?: Record<string, unknown>): {
        token: string;
        expiresAt: Date;
        mfa: string;
    } | {
        mfa: string;
    };
    issue(user: {
        id: string;
        authVersion: number;
    }, replacing?: string): Promise<IssuedSession>;
    rotateVerified(session: SessionRecord): Promise<IssuedSession | null>;
}
