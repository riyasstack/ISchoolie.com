import { type SessionRecord } from '@nestjs/authentication';
import { PrismaService } from '../database/prisma.service';
import type { Prisma } from '../generated/prisma/client';
import { SessionAccess } from './session-access';
import { IdentityDelivery } from './identity.delivery';
type Tx = Prisma.TransactionClient;
export type CredentialRow = {
    kind: 'STUDENT' | 'STAFF';
    displayName: string;
    contactEmail: string;
    identifier?: string;
    staffType?: string;
    hiringYear?: number;
};
export declare function importedStaffSequence(identifier: string, year: number, type: string): bigint | undefined;
export declare function credentialRow(input: unknown): CredentialRow;
export declare class ProvisioningService {
    private readonly db;
    private readonly access;
    private readonly delivery;
    private readonly dummy;
    constructor(db: PrismaService, access: SessionAccess, delivery: IdentityDelivery);
    authorize(tx: Tx, actor: SessionRecord, institutionId: string, permissions: string[]): Promise<{
        id: string;
        createdAt: Date;
        code: string;
        name: string;
        identifierCase: string;
        sequencePadding: number;
        active: boolean;
    }>;
    private insert;
    provision(actor: SessionRecord, institutionId: string, input: unknown): Promise<{
        id: string;
        identifier: string;
        kind: string;
        status: string;
    }>;
    list(actor: SessionRecord, institutionId: string): Promise<{
        credentials: {
            id: string;
            status: string;
            kind: string;
            identifier: string;
            contactEmail: string | null;
            user: {
                displayName: string | null;
            };
        }[];
        limit: number;
    }>;
    preview(actor: SessionRecord, institutionId: string, rows: unknown): Promise<{
        id: string;
        rowCount: number;
        expiresAt: Date;
        rows: CredentialRow[];
        message: string;
    }>;
    commit(actor: SessionRecord, institutionId: string, importId: string): Promise<{
        id: string;
        credentials: import("@prisma/client/runtime/client").JsonValue;
        replay: boolean;
    } | {
        id: string;
        credentials: {
            id: string;
            identifier: string;
            kind: string;
            status: string;
        }[];
        replay: boolean;
    }>;
    invite(actor: SessionRecord, institutionId: string, identityId: string): Promise<{
        message: string;
    }>;
    requestRecovery(institutionCode: string, identifier: string): Promise<{
        message: string;
    }>;
    recover(actor: SessionRecord, institutionId: string, identityId: string): Promise<{
        message: string;
    }>;
    claim(actor: SessionRecord, raw: string): Promise<{
        message: string;
    }>;
    activate(raw: string, passwordInput: unknown): Promise<{
        message: string;
    }>;
    login(institutionCode: string, kind: string, identifier: string, password: unknown, replacing?: string): Promise<import("@nestjs/authentication", { with: { "resolution-mode": "import" } }).IssuedSession>;
    revoke(actor: SessionRecord, institutionId: string, identityId: string): Promise<{
        message: string;
    }>;
}
export {};
