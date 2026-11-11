import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
import type { SessionRecord } from '@nestjs/authentication';
export declare const nativeReturnUri: () => string;
export declare class NativeBrokerService {
    private readonly db;
    private readonly access;
    constructor(db: PrismaService, access: SessionAccess);
    start(provider: string, challenge: string, clientState: string, actor?: SessionRecord): Promise<{
        id: string;
        url: string;
        redirectUri: string;
    }>;
    begin(id: string): Promise<{
        id: string;
        authVersion: number | null;
        userId: string | null;
        expiresAt: Date;
        provider: string;
        consumedAt: Date | null;
        codeHash: string | null;
        challenge: string;
        clientState: string;
        linkUserId: string | null;
        linkSessionId: string | null;
        oidcState: string | null;
    }>;
    bind(id: string, state: string): Promise<void>;
    linkActor(broker: {
        linkUserId: string | null;
        linkSessionId: string | null;
    }): Promise<SessionRecord | undefined>;
    handoff(state: string, user: {
        id: string;
        authVersion: number;
    }): Promise<string | null>;
    exchange(id: string, code: string, verifier: string): Promise<import("@nestjs/authentication", { with: { "resolution-mode": "import" } }).IssuedSession>;
}
