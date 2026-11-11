import type { Request, Response } from 'express';
import { SessionAccess } from './session-access';
import { ProvisioningService } from './provisioning.service';
import { IdentityService } from './identity.service';
export declare class ProvisioningController {
    private readonly provisioning;
    private readonly access;
    private readonly identity;
    constructor(provisioning: ProvisioningService, access: SessionAccess, identity: IdentityService);
    login(input: unknown, req: Request, res: Response): Promise<{
        token: string;
        expiresAt: Date;
        mfa: string;
    } | {
        mfa: string;
    }>;
    activate(input: unknown, req: Request): Promise<{
        message: string;
    }>;
    recovery(input: unknown, req: Request): Promise<{
        message: string;
    }>;
    claim(input: unknown, req: Request): Promise<{
        message: string;
    }>;
    provision(institutionId: string, input: unknown, req: Request): Promise<{
        id: string;
        identifier: string;
        kind: string;
        status: string;
    }>;
    list(institutionId: string, req: Request): Promise<{
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
    preview(institutionId: string, input: unknown, req: Request): Promise<{
        id: string;
        rowCount: number;
        expiresAt: Date;
        rows: import("./provisioning.service").CredentialRow[];
        message: string;
    }>;
    commit(institutionId: string, importId: string, req: Request): Promise<{
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
    invite(institutionId: string, identityId: string, req: Request): Promise<{
        message: string;
    }>;
    revoke(institutionId: string, identityId: string, req: Request): Promise<{
        message: string;
    }>;
    managedRecovery(institutionId: string, identityId: string, req: Request): Promise<{
        message: string;
    }>;
}
