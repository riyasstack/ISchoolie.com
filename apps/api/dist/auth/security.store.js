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
exports.IdentitySecurityStore = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const prisma_service_1 = require("../database/prisma.service");
let IdentitySecurityStore = class IdentitySecurityStore {
    db;
    constructor(db, storage) {
        this.db = db;
        storage.registerSource({ mfa: this, oidcStates: this });
    }
    async getTotp(userId) {
        const row = await this.db.identityTotp.findUnique({ where: { userId } });
        return row
            ? {
                secret: row.secret,
                confirmed: row.confirmed,
                lastUsedStep: row.lastUsedStep,
                ...(row.pendingSecret ? { pendingSecret: row.pendingSecret } : {}),
            }
            : undefined;
    }
    async saveTotp(userId, value) {
        if (!value) {
            await this.db.identityTotp.deleteMany({ where: { userId } });
            return;
        }
        await this.db
            .$executeRaw `INSERT INTO "IdentityTotp" ("userId", secret, confirmed, "pendingSecret", "lastUsedStep") VALUES (${userId}::uuid, ${value.secret}, ${value.confirmed}, ${value.pendingSecret ?? null}, ${value.lastUsedStep ?? -1}) ON CONFLICT ("userId") DO UPDATE SET secret = EXCLUDED.secret, confirmed = EXCLUDED.confirmed, "pendingSecret" = EXCLUDED."pendingSecret", "lastUsedStep" = GREATEST("IdentityTotp"."lastUsedStep", EXCLUDED."lastUsedStep")`;
    }
    async claimTotpStep(userId, step) {
        return ((await this.db.identityTotp.updateMany({
            where: { userId, lastUsedStep: { lt: step } },
            data: { lastUsedStep: step },
        })).count === 1);
    }
    async saveRecoveryCodes(userId, hashes) {
        await this.db.$transaction(async (tx) => {
            await tx.identityRecoveryCode.deleteMany({ where: { userId } });
            if (hashes.length)
                await tx.identityRecoveryCode.createMany({
                    data: hashes.map((hash) => ({ userId, hash })),
                });
        });
    }
    async consumeRecoveryCode(userId, hash) {
        return ((await this.db.identityRecoveryCode.deleteMany({
            where: { userId, hash },
        })).count === 1);
    }
    countRecoveryCodes(userId) {
        return this.db.identityRecoveryCode.count({ where: { userId } });
    }
    async recordMfaFailure(userId, windowMs, now) {
        await this.db.identityMfaFailure.create({
            data: { userId, at: BigInt(now) },
        });
        return this.countMfaFailures(userId, windowMs, now);
    }
    async countMfaFailures(userId, windowMs, now) {
        await this.db.identityMfaFailure.deleteMany({
            where: { userId, at: { lte: BigInt(now - windowMs) } },
        });
        return this.db.identityMfaFailure.count({
            where: { userId, at: { gt: BigInt(now - windowMs) } },
        });
    }
    async clearMfaFailures(userId) {
        await this.db.identityMfaFailure.deleteMany({ where: { userId } });
    }
    async saveOidcState(value) {
        await this.db.$transaction(async (tx) => {
            await tx.identityOidcState.deleteMany({
                where: { expiresAt: { lte: new Date() } },
            });
            await tx.$executeRaw `SELECT pg_advisory_xact_lock(1701, 1)`;
            if ((await tx.identityOidcState.count()) >= 10000)
                throw new Error('Too many pending sign-ins');
            await tx.identityOidcState.create({
                data: {
                    state: value.state,
                    data: JSON.parse(JSON.stringify(value)),
                    expiresAt: value.expiresAt,
                },
            });
        });
    }
    async consumeOidcState(state) {
        const rows = await this.db.$queryRaw `DELETE FROM "IdentityOidcState" WHERE state = ${state} RETURNING data`;
        const value = rows[0]?.data;
        return value
            ? {
                ...value,
                createdAt: new Date(String(value.createdAt)),
                expiresAt: new Date(String(value.expiresAt)),
            }
            : undefined;
    }
};
exports.IdentitySecurityStore = IdentitySecurityStore;
exports.IdentitySecurityStore = IdentitySecurityStore = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        authentication_1.AuthenticationStorage])
], IdentitySecurityStore);
//# sourceMappingURL=security.store.js.map