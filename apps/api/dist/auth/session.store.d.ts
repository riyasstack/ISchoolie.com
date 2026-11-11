import { AuthenticationStorage, type SessionRecord, type SessionStore } from '@nestjs/authentication';
import { PrismaService } from '../database/prisma.service';
import { IdentityProof } from './identity-proof';
export declare class PostgresSessionStore implements SessionStore {
    private readonly db;
    private readonly proof;
    constructor(db: PrismaService, storage: AuthenticationStorage, proof: IdentityProof);
    getSession(id: string): Promise<SessionRecord | undefined>;
    createSession(value: SessionRecord): Promise<void>;
    touchSession(id: string, lastActiveAt: Date): Promise<void>;
    deleteSession(id: string): Promise<boolean>;
    listUserSessions(userId: string): Promise<SessionRecord[]>;
    deleteUserSessions(userId: string): Promise<void>;
}
