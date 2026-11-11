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
exports.IdentityService = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const argon2_1 = require("argon2");
const prisma_service_1 = require("../database/prisma.service");
const identity_delivery_1 = require("./identity.delivery");
const identity_util_1 = require("./identity.util");
const session_access_1 = require("./session-access");
const generic = {
    message: 'If this account is eligible, instructions are available through its configured delivery channel.',
};
let IdentityService = class IdentityService {
    db;
    sessions;
    delivery;
    access;
    dummyHash = (0, argon2_1.hash)('unusable-comparison-' + (0, identity_util_1.token)(), {
        type: argon2_1.argon2id,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 1,
    });
    constructor(db, sessions, delivery, access) {
        this.db = db;
        this.sessions = sessions;
        this.delivery = delivery;
        this.access = access;
    }
    async limit(ip, identifier) {
        await this.db.identityRateLimit.deleteMany({
            where: { expiresAt: { lt: new Date() } },
        });
        for (const [key, maximum] of [
            [`ip:${(0, identity_util_1.digest)(ip)}`, 60],
            [`account:${(0, identity_util_1.digest)(identifier)}`, 10],
        ]) {
            const expires = new Date(Date.now() + 15 * 60_000);
            const rows = await this.db.$queryRaw `INSERT INTO "IdentityRateLimit" ("key", "count", "expiresAt") VALUES (${key}, 1, ${expires}) ON CONFLICT ("key") DO UPDATE SET "count" = CASE WHEN "IdentityRateLimit"."expiresAt" <= NOW() THEN 1 ELSE "IdentityRateLimit"."count" + 1 END, "expiresAt" = CASE WHEN "IdentityRateLimit"."expiresAt" <= NOW() THEN EXCLUDED."expiresAt" ELSE "IdentityRateLimit"."expiresAt" END RETURNING "count"`;
            if (rows[0].count > maximum)
                throw new common_1.HttpException('Too many attempts. Try again later.', 429);
        }
    }
    async register(emailInput, passwordInput, displayName) {
        this.delivery.requireAvailable();
        const email = (0, identity_util_1.canonicalEmail)(emailInput);
        const passwordHash = await (0, argon2_1.hash)((0, identity_util_1.validPassword)(passwordInput), {
            type: argon2_1.argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 1,
        });
        const existing = await this.db.user.findFirst({
            where: {
                OR: [
                    { emailCanonical: email },
                    { email: { equals: email, mode: 'insensitive' } },
                ],
            },
        });
        if (existing) {
            if (existing.status === 'PENDING' &&
                existing.accountKind === 'PUBLIC' &&
                !existing.emailVerifiedAt) {
                const raw = (0, identity_util_1.token)();
                await this.emailChallenge(existing.id, 'EMAIL_VERIFY', email, raw, 30 * 60_000);
            }
            return generic;
        }
        const raw = (0, identity_util_1.token)();
        let messageId;
        try {
            messageId = await this.db.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: {
                        email,
                        emailCanonical: email,
                        passwordHash,
                        displayName,
                        status: 'PENDING',
                        accountKind: 'PUBLIC',
                    },
                });
                await tx.identityChallenge.create({
                    data: {
                        userId: user.id,
                        kind: 'EMAIL_VERIFY',
                        tokenHash: (0, identity_util_1.digest)(raw),
                        expiresAt: new Date(Date.now() + 30 * 60_000),
                    },
                });
                await tx.identityAudit.create({
                    data: { userId: user.id, type: 'REGISTRATION_PENDING' },
                });
                return this.delivery.stageEmail(tx, email, 'EMAIL_VERIFY', raw);
            });
        }
        catch (error) {
            if (error.code === 'P2002')
                return generic;
            throw error;
        }
        this.delivery.kick(messageId);
        return generic;
    }
    async verifyEmail(raw, passwordInput) {
        const passwordHash = await (0, argon2_1.hash)((0, identity_util_1.validPassword)(passwordInput), {
            type: argon2_1.argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 1,
        });
        await this.db.$transaction(async (tx) => {
            const challenge = await tx.identityChallenge.findUnique({
                where: { tokenHash: (0, identity_util_1.digest)(raw) },
            });
            if (!challenge ||
                challenge.kind !== 'EMAIL_VERIFY' ||
                challenge.expiresAt <= new Date() ||
                challenge.consumedAt)
                throw new common_1.BadRequestException('Invalid or expired verification');
            await tx.$queryRaw `SELECT id FROM "User" WHERE id = ${challenge.userId}::uuid FOR UPDATE`;
            const claimed = await tx.identityChallenge.updateMany({
                where: {
                    id: challenge.id,
                    consumedAt: null,
                    expiresAt: { gt: new Date() },
                },
                data: { consumedAt: new Date() },
            });
            if (!claimed.count)
                throw new common_1.BadRequestException('Invalid or expired verification');
            const updated = await tx.user.updateMany({
                where: {
                    id: challenge.userId,
                    authVersion: challenge.authVersion,
                    status: 'PENDING',
                    accountKind: 'PUBLIC',
                },
                data: {
                    emailVerifiedAt: new Date(),
                    status: 'ACTIVE',
                    passwordHash,
                    authVersion: { increment: 1 },
                },
            });
            if (!updated.count)
                throw new common_1.BadRequestException('Account cannot be activated');
            await tx.identityChallenge.updateMany({
                where: {
                    userId: challenge.userId,
                    kind: 'EMAIL_VERIFY',
                    consumedAt: null,
                },
                data: { consumedAt: new Date() },
            });
            await tx.identityAudit.create({
                data: { userId: challenge.userId, type: 'EMAIL_VERIFIED' },
            });
        });
        return { message: 'Email verified. You can sign in.' };
    }
    async login(emailInput, passwordInput, replacing) {
        const email = (0, identity_util_1.canonicalEmail)(emailInput);
        if (typeof passwordInput !== 'string' || passwordInput.length > 128)
            throw new common_1.UnauthorizedException('Invalid sign-in details');
        const user = await this.db.user.findUnique({
            where: { emailCanonical: email },
        });
        const matches = await (0, argon2_1.verify)(user?.passwordHash ?? (await this.dummyHash), passwordInput).catch(() => false);
        if (!matches ||
            !user ||
            user.status !== 'ACTIVE' ||
            user.accountKind === 'STUDENT' ||
            !user.emailVerifiedAt)
            throw new common_1.UnauthorizedException('Invalid sign-in details');
        const issued = await this.access.issue(user, replacing);
        await this.db.identityAudit.create({
            data: { userId: user.id, type: 'PASSWORD_SIGN_IN' },
        });
        return issued;
    }
    async requestReset(emailInput) {
        this.delivery.requireAvailable();
        const email = (0, identity_util_1.canonicalEmail)(emailInput);
        const user = await this.db.user.findUnique({
            where: { emailCanonical: email },
        });
        if (!user ||
            user.status !== 'ACTIVE' ||
            user.accountKind === 'STUDENT' ||
            !user.emailVerifiedAt)
            return generic;
        const raw = (0, identity_util_1.token)();
        await this.emailChallenge(user.id, 'PASSWORD_RESET', email, raw, 15 * 60_000);
        return generic;
    }
    async privilegedLogin(emailInput, passwordInput, replacing) {
        const email = (0, identity_util_1.canonicalEmail)(emailInput);
        const user = await this.db.user.findUnique({
            where: { emailCanonical: email },
        });
        const matches = typeof passwordInput === 'string' &&
            passwordInput.length <= 128 &&
            (await (0, argon2_1.verify)(user?.passwordHash ?? (await this.dummyHash), passwordInput).catch(() => false));
        if (!matches ||
            !user ||
            user.status !== 'ACTIVE' ||
            !user.emailVerifiedAt ||
            !(await this.access.privileged(user.id)))
            throw new common_1.UnauthorizedException('Invalid privileged sign-in details');
        return this.access.issue(user, replacing);
    }
    async privilegedRecovery(emailInput) {
        this.delivery.requireAvailable();
        const email = (0, identity_util_1.canonicalEmail)(emailInput);
        const user = await this.db.user.findUnique({
            where: { emailCanonical: email },
        });
        if (user?.status === 'ACTIVE' &&
            user.emailVerifiedAt &&
            (await this.access.privileged(user.id))) {
            const raw = (0, identity_util_1.token)();
            await this.emailChallenge(user.id, 'PRIVILEGED_RESET', email, raw, 15 * 60_000);
        }
        return generic;
    }
    async emailChallenge(userId, kind, email, raw, ttl) {
        const messageId = await this.db.$transaction(async (tx) => {
            const user = await tx.user.findUniqueOrThrow({ where: { id: userId } });
            await tx.identityChallenge.create({
                data: {
                    userId,
                    kind,
                    authVersion: user.authVersion,
                    tokenHash: (0, identity_util_1.digest)(raw),
                    expiresAt: new Date(Date.now() + ttl),
                },
            });
            return this.delivery.stageEmail(tx, email, kind, raw);
        });
        this.delivery.kick(messageId);
    }
    async reset(raw, passwordInput) {
        const passwordHash = await (0, argon2_1.hash)((0, identity_util_1.validPassword)(passwordInput), {
            type: argon2_1.argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 1,
        });
        await this.db.$transaction(async (tx) => {
            const challenge = await tx.identityChallenge.findUnique({
                where: { tokenHash: (0, identity_util_1.digest)(raw) },
            });
            if (!challenge ||
                !['PASSWORD_RESET', 'INSTITUTION_RESET', 'PRIVILEGED_RESET'].includes(challenge.kind) ||
                challenge.expiresAt <= new Date() ||
                challenge.consumedAt)
                throw new common_1.BadRequestException('Invalid or expired recovery token');
            await tx.$queryRaw `SELECT id FROM "User" WHERE id = ${challenge.userId}::uuid FOR UPDATE`;
            const claimed = await tx.identityChallenge.updateMany({
                where: {
                    id: challenge.id,
                    consumedAt: null,
                    expiresAt: { gt: new Date() },
                },
                data: { consumedAt: new Date() },
            });
            if (!claimed.count)
                throw new common_1.BadRequestException('Invalid or expired recovery token');
            if (challenge.kind === 'INSTITUTION_RESET' &&
                (!challenge.identityId ||
                    !(await tx.institutionalLogin.findFirst({
                        where: {
                            id: challenge.identityId,
                            userId: challenge.userId,
                            status: 'ACTIVE',
                            institution: { active: true },
                        },
                    }))))
                throw new common_1.BadRequestException('Institution credential unavailable');
            const updated = await tx.user.updateMany({
                where: {
                    id: challenge.userId,
                    authVersion: challenge.authVersion,
                    status: {
                        in: challenge.kind === 'INSTITUTION_RESET'
                            ? ['ACTIVE', 'RESTRICTED']
                            : ['ACTIVE'],
                    },
                    ...(challenge.kind === 'PASSWORD_RESET'
                        ? {
                            accountKind: { not: 'STUDENT' },
                            emailVerifiedAt: { not: null },
                        }
                        : {}),
                },
                data: { passwordHash, authVersion: { increment: 1 } },
            });
            if (!updated.count)
                throw new common_1.BadRequestException('Account cannot be recovered');
            await tx.identitySession.deleteMany({
                where: { userId: challenge.userId },
            });
            await tx.identityChallenge.updateMany({
                where: { userId: challenge.userId, consumedAt: null },
                data: { consumedAt: new Date() },
            });
            await tx.identityPhoneChallenge.updateMany({
                where: { userId: challenge.userId, consumedAt: null },
                data: { consumedAt: new Date() },
            });
            await tx.identityAudit.create({
                data: { userId: challenge.userId, type: 'PASSWORD_RESET' },
            });
        });
        return { message: 'Password updated. Sign in again.' };
    }
};
exports.IdentityService = IdentityService;
exports.IdentityService = IdentityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        authentication_1.SessionService,
        identity_delivery_1.IdentityDelivery,
        session_access_1.SessionAccess])
], IdentityService);
//# sourceMappingURL=identity.service.js.map