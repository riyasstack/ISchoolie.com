"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresSessionStore = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const prisma_service_1 = require("../database/prisma.service");
const identity_proof_1 = require("./identity-proof");
function record(row) {
    return {
        id: row.id,
        userId: row.userId,
        createdAt: row.createdAt,
        expiresAt: row.expiresAt,
        lastActiveAt: row.lastActiveAt,
        ...(row.mfa ? { mfa: row.mfa } : {}),
        metadata: row.metadata,
    };
}
let PostgresSessionStore = class PostgresSessionStore {
    db;
    proof;
    constructor(db, storage, proof) {
        this.db = db;
        this.proof = proof;
        storage.registerSource({ sessions: this });
    }
    async getSession(id) {
        const row = await this.db.identitySession.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!row ||
            row.user.authVersion !== row.authVersion ||
            !['ACTIVE', 'RESTRICTED'].includes(row.user.status))
            return undefined;
        return record(row);
    }
    async createSession(value) {
        await this.db.$transaction(async (tx) => {
            const user = await tx.user.findUniqueOrThrow({
                where: { id: value.userId },
            });
            const expectedVersion = value.metadata?.authVersion ?? this.proof.version(value.userId);
            if (!['ACTIVE', 'RESTRICTED'].includes(user.status) ||
                expectedVersion !== user.authVersion)
                throw new common_1.UnauthorizedException('Sign in again');
            value.metadata = {
                authenticatedAt: Date.now(),
                ...value.metadata,
                authVersion: user.authVersion,
            };
            await tx.identitySession.deleteMany({
                where: { expiresAt: { lt: new Date() } },
            });
            await tx.identitySession.create({
                data: {
                    ...value,
                    mfa: value.mfa,
                    metadata: JSON.parse(JSON.stringify(value.metadata ?? {})),
                    authVersion: user.authVersion,
                },
            });
            await tx.identityAudit.create({
                data: { userId: user.id, type: 'SESSION_CREATED' },
            });
        });
    }
    async touchSession(id, lastActiveAt) {
        await this.db.identitySession.updateMany({
            where: { id, lastActiveAt: { lt: lastActiveAt } },
            data: { lastActiveAt },
        });
    }
    async deleteSession(id) {
        return ((await this.db.identitySession.deleteMany({ where: { id } })).count > 0);
    }
    async listUserSessions(userId) {
        return (await this.db.identitySession.findMany({ where: { userId } })).map(record);
    }
    async deleteUserSessions(userId) {
        await this.db.identitySession.deleteMany({ where: { userId } });
    }
};
exports.PostgresSessionStore = PostgresSessionStore;
exports.PostgresSessionStore = PostgresSessionStore = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        authentication_1.AuthenticationStorage,
        identity_proof_1.IdentityProof])
], PostgresSessionStore);
//# sourceMappingURL=session.store.js.map