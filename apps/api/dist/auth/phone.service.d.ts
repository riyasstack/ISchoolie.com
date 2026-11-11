import { PrismaService } from '../database/prisma.service';
import { IdentityDelivery } from './identity.delivery';
import { SessionAccess } from './session-access';
import type { SessionRecord } from '@nestjs/authentication';
export declare class IdentityPhoneService {
    private readonly db;
    private readonly delivery;
    private readonly access;
    private readonly dummy;
    constructor(db: PrismaService, delivery: IdentityDelivery, access: SessionAccess);
    private proof;
    start(phoneInput: string, kind: string, passwordInput: unknown, displayName?: string): Promise<{
        challengeId: `${string}-${string}-${string}-${string}-${string}`;
        message: string;
    }>;
    change(actor: SessionRecord, phoneInput: string, passwordInput: unknown): Promise<{
        challengeId: `${string}-${string}-${string}-${string}-${string}`;
        message: string;
    }>;
    link(actor: SessionRecord, phoneInput: string, passwordInput: unknown): Promise<{
        challengeId: `${string}-${string}-${string}-${string}-${string}`;
        message: string;
    }>;
    confirm(id: string, code: string, passwordInput: unknown, actor?: SessionRecord): Promise<{
        message: string;
    }>;
    login(phoneInput: string, password: unknown, replacing?: string, parentOnly?: boolean): Promise<import("@nestjs/authentication", { with: { "resolution-mode": "import" } }).IssuedSession>;
}
