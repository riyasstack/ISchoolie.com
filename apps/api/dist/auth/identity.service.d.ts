import { SessionService } from '@nestjs/authentication';
import { PrismaService } from '../database/prisma.service';
import { IdentityDelivery } from './identity.delivery';
import { SessionAccess } from './session-access';
export declare class IdentityService {
    private readonly db;
    private readonly sessions;
    private readonly delivery;
    private readonly access;
    private readonly dummyHash;
    constructor(db: PrismaService, sessions: SessionService, delivery: IdentityDelivery, access: SessionAccess);
    limit(ip: string, identifier: string): Promise<void>;
    register(emailInput: string, passwordInput: unknown, displayName: string): Promise<{
        message: string;
    }>;
    verifyEmail(raw: string, passwordInput: unknown): Promise<{
        message: string;
    }>;
    login(emailInput: string, passwordInput: unknown, replacing?: string): Promise<import("@nestjs/authentication", { with: { "resolution-mode": "import" } }).IssuedSession>;
    requestReset(emailInput: string): Promise<{
        message: string;
    }>;
    privilegedLogin(emailInput: string, passwordInput: unknown, replacing?: string): Promise<import("@nestjs/authentication", { with: { "resolution-mode": "import" } }).IssuedSession>;
    privilegedRecovery(emailInput: string): Promise<{
        message: string;
    }>;
    private emailChallenge;
    reset(raw: string, passwordInput: unknown): Promise<{
        message: string;
    }>;
}
