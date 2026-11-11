import { MfaService, SessionService } from '@nestjs/authentication';
import type { Request, Response } from 'express';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
import { IdentityService } from './identity.service';
export declare class IdentitySessionsController {
    private readonly access;
    private readonly sessions;
    private readonly db;
    private readonly mfa;
    private readonly identity;
    constructor(access: SessionAccess, sessions: SessionService, db: PrismaService, mfa: MfaService, identity: IdentityService);
    list(req: Request): Promise<{
        sessions: {
            id: string;
            current: boolean;
            createdAt: Date;
            lastActiveAt: Date;
            expiresAt: Date;
            mfa: string;
        }[];
    }>;
    revoke(input: unknown, req: Request): Promise<{
        message: string;
    }>;
    renew(req: Request, res: Response): Promise<{
        token: string;
        expiresAt: Date;
        mfa: string;
    } | {
        mfa: string;
    }>;
    change(input: unknown, req: Request, res: Response): Promise<{
        message: string;
    }>;
}
