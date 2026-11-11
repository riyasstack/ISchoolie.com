import { OidcService, SessionService } from '@nestjs/authentication';
import type { Request, Response } from 'express';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
import { IdentityProof } from './identity-proof';
import { IdentityService } from './identity.service';
import { NativeBrokerService } from './native-broker.service';
export declare class IdentityOidcController {
    private readonly oidc;
    private readonly access;
    private readonly proof;
    private readonly identity;
    private readonly db;
    private readonly broker;
    private readonly sessions;
    constructor(oidc: OidcService, access: SessionAccess, proof: IdentityProof, identity: IdentityService, db: PrismaService, broker: NativeBrokerService, sessions: SessionService);
    start(provider: string, input: unknown, req: Request): Promise<{
        url: string;
    }>;
    callback(provider: string, query: Record<string, unknown>, req: Request, res: Response): Promise<void>;
    nativeStart(input: unknown, req: Request): Promise<{
        id: string;
        url: string;
        redirectUri: string;
    }>;
    nativeBegin(id: string, req: Request, res: Response): Promise<void>;
    nativeExchange(input: unknown, req: Request, res: Response): Promise<{
        token: string;
        expiresAt: Date;
        mfa: string;
    } | {
        mfa: string;
    }>;
    linked(req: Request): Promise<{
        providers: {
            id: string;
            provider: string;
            linkedAt: Date;
        }[];
    }>;
    unlink(input: unknown, req: Request): Promise<{
        message: string;
    }>;
}
