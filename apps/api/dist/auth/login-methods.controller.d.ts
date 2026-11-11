import type { Request } from 'express';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
export declare class IdentityLoginMethodsController {
    private readonly db;
    private readonly access;
    constructor(db: PrismaService, access: SessionAccess);
    list(req: Request): Promise<{
        passwordConfigured: boolean;
        email: {
            address: string;
            verified: boolean;
        } | null;
        providers: {
            provider: string;
            id: string;
            linkedAt: Date;
        }[];
        phone: {
            number: string;
            verifiedAt: Date;
        } | null;
        institutions: {
            identifier: string;
            kind: string;
            status: string;
            institution: {
                code: string;
                name: string;
                active: boolean;
            };
        }[];
        message: string;
    }>;
    unlinkPhone(req: Request): Promise<{
        message: string;
    }>;
}
