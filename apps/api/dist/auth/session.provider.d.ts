import { type ExecutionContext } from '@nestjs/common';
import { AuthenticationProvider, AuthenticationRegistry, MfaService, type SessionRecord } from '@nestjs/authentication';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
type SafeIdentity = {
    id: string;
    email: string | null;
    displayName: string | null;
};
export declare class IdentitySessionProvider extends AuthenticationProvider<SafeIdentity, SessionRecord> {
    private readonly db;
    private readonly access;
    private readonly mfa;
    constructor(db: PrismaService, access: SessionAccess, mfa: MfaService, registry: AuthenticationRegistry);
    authenticate(context: ExecutionContext): Promise<{
        user: {
            id: string;
            email: string | null;
            displayName: string | null;
        };
        session: SessionRecord;
        mfa: import("@nestjs/authentication", { with: { "resolution-mode": "import" } }).MfaState | undefined;
    } | null>;
}
export {};
