import { MfaService, SessionService } from '@nestjs/authentication';
import type { Request, Response } from 'express';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
import { IdentityService } from './identity.service';
export declare class IdentityMfaController {
    private readonly db;
    private readonly access;
    private readonly mfa;
    private readonly sessions;
    private readonly identity;
    constructor(db: PrismaService, access: SessionAccess, mfa: MfaService, sessions: SessionService, identity: IdentityService);
    private locked;
    private firstFactor;
    status(req: Request): Promise<{
        enrolled: boolean;
        state: string;
        recoveryCodesRemaining: number;
    }>;
    enroll(input: unknown, req: Request): Promise<{
        secret: string;
        uri: string;
    }>;
    confirm(input: unknown, req: Request, res: Response): Promise<{
        token: string;
        expiresAt: Date;
        mfa: string;
    } | {
        mfa: string;
    }>;
    verify(input: unknown, req: Request, res: Response): Promise<{
        token: string;
        expiresAt: Date;
        mfa: string;
    } | {
        mfa: string;
    }>;
    recovery(req: Request): Promise<{
        recoveryCodes: string[];
    }>;
    disable(input: unknown, req: Request, res: Response): Promise<{
        token: string;
        expiresAt: Date;
        mfa: string;
    } | {
        mfa: string;
    }>;
}
