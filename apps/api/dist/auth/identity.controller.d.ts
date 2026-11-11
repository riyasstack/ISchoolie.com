import { SessionService } from '@nestjs/authentication';
import type { Request, Response } from 'express';
import { PrismaService } from '../database/prisma.service';
import { IdentityService } from './identity.service';
import { SessionAccess } from './session-access';
export declare class IdentityController {
    private readonly identity;
    private readonly sessions;
    private readonly db;
    private readonly access;
    constructor(identity: IdentityService, sessions: SessionService, db: PrismaService, access: SessionAccess);
    private raw;
    private session;
    private origin;
    private csrf;
    capabilities(): {
        emailPassword: boolean;
        emailDelivery: string;
        smsDelivery: string;
        providers: {
            [k: string]: string;
        };
        student: string;
        staff: string;
        parent: string;
        privileged: string;
        native: string;
    };
    register(input: unknown, req: Request): Promise<{
        message: string;
    }>;
    verify(input: unknown, req: Request): Promise<{
        message: string;
    }>;
    login(input: unknown, req: Request, res: Response): Promise<{
        token: string;
        expiresAt: Date;
        mfa: string;
    } | {
        mfa: string;
    }>;
    me(req: Request, res: Response): Promise<{
        user: {
            id: string;
            email: string | null;
            displayName: string | null;
            status: string;
            accountKind: string;
        };
        csrf: string | undefined;
        permissions: {
            institutionId: string;
            permission: string;
            institution: {
                code: string;
                name: string;
            };
        }[];
        mfa: string;
        restricted: boolean;
        session: {
            id: string;
            createdAt: Date;
            expiresAt: Date;
        };
    }>;
    privileged(input: unknown, req: Request, res: Response): Promise<{
        token: string;
        expiresAt: Date;
        mfa: string;
    } | {
        mfa: string;
    }>;
    logout(req: Request, res: Response): Promise<{
        message: string;
    }>;
    logoutAll(req: Request, res: Response): Promise<{
        message: string;
    }>;
    recovery(input: unknown, req: Request): Promise<{
        message: string;
    }>;
    reset(input: unknown, req: Request): Promise<{
        message: string;
    }>;
    privilegedRecovery(input: unknown, req: Request): Promise<{
        message: string;
    }>;
}
