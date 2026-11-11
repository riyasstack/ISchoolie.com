import { AuthenticationStorage, type MfaStore, type TotpRecord, type OidcStateStore, type OidcTransaction } from '@nestjs/authentication';
import { PrismaService } from '../database/prisma.service';
export declare class IdentitySecurityStore implements MfaStore, OidcStateStore {
    private readonly db;
    constructor(db: PrismaService, storage: AuthenticationStorage);
    getTotp(userId: string): Promise<TotpRecord | undefined>;
    saveTotp(userId: string, value: TotpRecord | null): Promise<void>;
    claimTotpStep(userId: string, step: number): Promise<boolean>;
    saveRecoveryCodes(userId: string, hashes: string[]): Promise<void>;
    consumeRecoveryCode(userId: string, hash: string): Promise<boolean>;
    countRecoveryCodes(userId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<number>;
    recordMfaFailure(userId: string, windowMs: number, now: number): Promise<number>;
    countMfaFailures(userId: string, windowMs: number, now: number): Promise<number>;
    clearMfaFailures(userId: string): Promise<void>;
    saveOidcState(value: OidcTransaction): Promise<void>;
    consumeOidcState(state: string): Promise<OidcTransaction | undefined>;
}
