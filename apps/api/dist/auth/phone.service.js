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
exports.IdentityPhoneService = void 0;
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const node_crypto_1 = require("node:crypto");
const prisma_service_1 = require("../database/prisma.service");
const identity_util_1 = require("./identity.util");
const identity_delivery_1 = require("./identity.delivery");
const session_access_1 = require("./session-access");
let IdentityPhoneService = class IdentityPhoneService {
    db;
    delivery;
    access;
    dummy = (0, argon2_1.hash)((0, node_crypto_1.randomUUID)(), {
        type: argon2_1.argon2id,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 1,
    });
    constructor(db, delivery, access) {
        this.db = db;
        this.delivery = delivery;
        this.access = access;
    }
    proof(id, code) {
        const key = process.env.AUTH_PROOF_KEY;
        if (!key || key.length < 32)
            throw new Error('AUTH_PROOF_KEY is required');
        return (0, node_crypto_1.createHmac)('sha256', key).update(`${id}:${code}`).digest('hex');
    }
    async start(phoneInput, kind, passwordInput, displayName) {
        this.delivery.requireSms();
        const phone = (0, identity_util_1.canonicalPhone)(phoneInput);
        if (!['REGISTER', 'RECOVER'].includes(kind))
            throw new common_1.BadRequestException('Invalid phone verification action');
        await (0, argon2_1.hash)((0, identity_util_1.validPassword)(passwordInput), {
            type: argon2_1.argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 1,
        });
        const existing = await this.db.phoneIdentity.findUnique({
            where: { phone },
            include: { user: true },
        });
        const id = (0, node_crypto_1.randomUUID)();
        const code = (0, node_crypto_1.randomInt)(100000, 1000000).toString();
        const eligible = kind === 'REGISTER'
            ? !existing
            : !!existing &&
                existing.user.accountKind !== 'STUDENT' &&
                existing.user.status === 'ACTIVE';
        await this.db.identityPhoneChallenge.deleteMany({
            where: { expiresAt: { lt: new Date() } },
        });
        if (eligible) {
            const messageId = await this.db.$transaction(async (tx) => {
                await tx.identityPhoneChallenge.create({
                    data: {
                        id,
                        phone,
                        kind,
                        userId: existing?.userId,
                        codeHash: this.proof(id, code),
                        payload: {
                            displayName: displayName ?? 'Parent account',
                            ...(existing ? { authVersion: existing.user.authVersion } : {}),
                        },
                        expiresAt: new Date(Date.now() + 5 * 60_000),
                    },
                });
                return this.delivery.stageSms(tx, phone, kind, code, id);
            });
            this.delivery.kick(messageId);
        }
        return {
            challengeId: id,
            message: 'If this mobile number is eligible, verification instructions are available through its configured channel.',
        };
    }
    async change(actor, phoneInput, passwordInput) {
        this.delivery.requireSms();
        const phone = (0, identity_util_1.canonicalPhone)(phoneInput);
        const user = await this.db.user.findUniqueOrThrow({
            where: { id: actor.userId },
        });
        if (user.status !== 'ACTIVE' ||
            user.accountKind === 'STUDENT' ||
            !user.passwordHash ||
            !(await this.db.phoneIdentity.findUnique({
                where: { userId: user.id },
            })) ||
            !(await (0, argon2_1.verify)(user.passwordHash, (0, identity_util_1.validPassword)(passwordInput)).catch(() => false)))
            throw new common_1.UnauthorizedException('Current account password and existing mobile credential required');
        const id = (0, node_crypto_1.randomUUID)();
        const code = (0, node_crypto_1.randomInt)(100000, 1000000).toString();
        if (!(await this.db.phoneIdentity.findUnique({ where: { phone } }))) {
            const messageId = await this.db.$transaction(async (tx) => {
                await tx.identityPhoneChallenge.create({
                    data: {
                        id,
                        phone,
                        userId: user.id,
                        kind: 'CHANGE',
                        codeHash: this.proof(id, code),
                        payload: { authVersion: user.authVersion, sessionId: actor.id },
                        expiresAt: new Date(Date.now() + 5 * 60_000),
                    },
                });
                return this.delivery.stageSms(tx, phone, 'CHANGE', code, id);
            });
            this.delivery.kick(messageId);
        }
        return {
            challengeId: id,
            message: 'If this mobile number is eligible, its verification instructions are available through the configured channel.',
        };
    }
    async link(actor, phoneInput, passwordInput) {
        this.delivery.requireSms();
        const phone = (0, identity_util_1.canonicalPhone)(phoneInput);
        const user = await this.db.user.findUniqueOrThrow({
            where: { id: actor.userId },
        });
        if (user.status !== 'ACTIVE' ||
            user.accountKind === 'STUDENT' ||
            (await this.db.phoneIdentity.findUnique({ where: { userId: user.id } })))
            throw new common_1.BadRequestException('Account cannot add this mobile credential; use mobile change for an existing credential');
        if (user.passwordHash) {
            if (!(await (0, argon2_1.verify)(user.passwordHash, (0, identity_util_1.validPassword)(passwordInput)).catch(() => false)))
                throw new common_1.UnauthorizedException('Current password required');
        }
        else if (typeof actor.metadata?.authenticatedAt !== 'number' ||
            actor.metadata.authenticatedAt < Date.now() - 5 * 60_000 ||
            !(await this.db.providerIdentity.findFirst({
                where: { userId: user.id },
            })))
            throw new common_1.UnauthorizedException('Sign in with your provider again before adding a mobile credential');
        const id = (0, node_crypto_1.randomUUID)();
        const code = (0, node_crypto_1.randomInt)(100000, 1000000).toString();
        if (!(await this.db.phoneIdentity.findUnique({ where: { phone } }))) {
            const messageId = await this.db.$transaction(async (tx) => {
                await tx.identityPhoneChallenge.create({
                    data: {
                        id,
                        phone,
                        userId: user.id,
                        kind: 'LINK',
                        codeHash: this.proof(id, code),
                        payload: { authVersion: user.authVersion, sessionId: actor.id },
                        expiresAt: new Date(Date.now() + 5 * 60_000),
                    },
                });
                return this.delivery.stageSms(tx, phone, 'LINK', code, id);
            });
            this.delivery.kick(messageId);
        }
        return {
            challengeId: id,
            message: 'If this number is eligible, verification instructions are available through the configured channel. No account has been merged.',
        };
    }
    async confirm(id, code, passwordInput, actor) {
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) ||
            !/^\d{6}$/.test(code))
            throw new common_1.BadRequestException('Invalid or expired mobile verification');
        const passwordHash = passwordInput === undefined
            ? undefined
            : await (0, argon2_1.hash)((0, identity_util_1.validPassword)(passwordInput), {
                type: argon2_1.argon2id,
                memoryCost: 65536,
                timeCost: 3,
                parallelism: 1,
            });
        const rows = await this.db.$queryRaw `UPDATE "IdentityPhoneChallenge" SET attempts = attempts + 1 WHERE id = ${id}::uuid AND "consumedAt" IS NULL AND "expiresAt" > NOW() AND attempts < 5 RETURNING id`;
        if (!rows.length)
            throw new common_1.UnauthorizedException('Invalid or expired mobile verification');
        await this.db.$transaction(async (tx) => {
            const initial = await tx.identityPhoneChallenge.findUniqueOrThrow({
                where: { id },
            });
            await tx.$executeRaw `SELECT pg_advisory_xact_lock(1704, hashtext(${initial.phone}))`;
            if (initial.userId)
                await tx.$executeRaw `SELECT pg_advisory_xact_lock(1705, hashtext(${initial.userId}))`;
            await tx.$queryRaw `SELECT id FROM "IdentityPhoneChallenge" WHERE id = ${id}::uuid FOR UPDATE`;
            const challenge = await tx.identityPhoneChallenge.findUniqueOrThrow({
                where: { id },
            });
            const expected = this.proof(id, code);
            if (challenge.consumedAt ||
                challenge.expiresAt <= new Date() ||
                !(0, node_crypto_1.timingSafeEqual)(Buffer.from(challenge.codeHash), Buffer.from(expected)))
                throw new common_1.UnauthorizedException('Invalid or expired mobile verification');
            const payload = challenge.payload;
            if (!['CHANGE', 'LINK'].includes(challenge.kind) && !passwordHash)
                throw new common_1.BadRequestException('Choose the proof-owner password');
            if (challenge.kind === 'REGISTER') {
                if (await tx.phoneIdentity.findUnique({
                    where: { phone: challenge.phone },
                }))
                    throw new common_1.BadRequestException('Mobile verification unavailable');
                const user = await tx.user.create({
                    data: {
                        displayName: payload.displayName,
                        passwordHash,
                        accountKind: 'PARENT',
                        status: 'ACTIVE',
                        phones: {
                            create: { phone: challenge.phone, verifiedAt: new Date() },
                        },
                    },
                });
                await tx.identityAudit.create({
                    data: { userId: user.id, type: 'PARENT_MOBILE_VERIFIED' },
                });
            }
            else if (['CHANGE', 'LINK'].includes(challenge.kind)) {
                if (!actor ||
                    actor.userId !== challenge.userId ||
                    actor.id !== payload.sessionId ||
                    actor.metadata?.authVersion !== payload.authVersion)
                    throw new common_1.UnauthorizedException('Original account session required');
                const live = await tx.identitySession.findFirst({
                    where: {
                        id: actor.id,
                        userId: actor.userId,
                        authVersion: payload.authVersion,
                        expiresAt: { gt: new Date() },
                        user: {
                            status: 'ACTIVE',
                            accountKind: { not: 'STUDENT' },
                            authVersion: payload.authVersion,
                        },
                    },
                });
                if (!live)
                    throw new common_1.UnauthorizedException('Sign in again');
                if (await tx.phoneIdentity.findUnique({
                    where: { phone: challenge.phone },
                }))
                    throw new common_1.BadRequestException('Mobile number unavailable');
                const user = await tx.user.findUniqueOrThrow({
                    where: { id: actor.userId },
                });
                if (challenge.kind === 'LINK') {
                    if (user.accountKind === 'STUDENT' ||
                        (await tx.phoneIdentity.findUnique({
                            where: { userId: actor.userId },
                        })))
                        throw new common_1.BadRequestException('Mobile credential unavailable');
                    if (!user.passwordHash && !passwordHash)
                        throw new common_1.BadRequestException('Choose a password for your mobile credential');
                    if (user.passwordHash && passwordHash)
                        throw new common_1.BadRequestException('Linking preserves the current password; use password change separately');
                    await tx.phoneIdentity.create({
                        data: {
                            userId: actor.userId,
                            phone: challenge.phone,
                            verifiedAt: new Date(),
                        },
                    });
                }
                else
                    await tx.phoneIdentity.update({
                        where: { userId: actor.userId },
                        data: { phone: challenge.phone, verifiedAt: new Date() },
                    });
                await tx.user.update({
                    where: { id: actor.userId },
                    data: {
                        authVersion: { increment: 1 },
                        ...(!user.passwordHash && passwordHash ? { passwordHash } : {}),
                    },
                });
                await tx.identitySession.deleteMany({
                    where: { userId: actor.userId },
                });
                await tx.identityPhoneChallenge.updateMany({
                    where: { userId: actor.userId, consumedAt: null },
                    data: { consumedAt: new Date() },
                });
                await tx.identityChallenge.updateMany({
                    where: { userId: actor.userId, consumedAt: null },
                    data: { consumedAt: new Date() },
                });
                await tx.identityAudit.create({
                    data: {
                        userId: actor.userId,
                        type: challenge.kind === 'LINK'
                            ? 'PHONE_CREDENTIAL_LINKED'
                            : 'PARENT_MOBILE_CHANGED',
                    },
                });
            }
            else {
                if (!challenge.userId)
                    throw new common_1.BadRequestException('Mobile verification unavailable');
                const credential = await tx.phoneIdentity.findUnique({
                    where: { phone: challenge.phone },
                });
                if (credential?.userId !== challenge.userId)
                    throw new common_1.BadRequestException('Mobile verification unavailable');
                if (typeof payload.authVersion !== 'number')
                    throw new common_1.BadRequestException('Request a new mobile recovery proof');
                const updated = await tx.user.updateMany({
                    where: {
                        id: challenge.userId,
                        authVersion: payload.authVersion,
                        status: 'ACTIVE',
                        accountKind: { not: 'STUDENT' },
                    },
                    data: { passwordHash, authVersion: { increment: 1 } },
                });
                if (!updated.count)
                    throw new common_1.BadRequestException('Mobile verification unavailable');
                await tx.identitySession.deleteMany({
                    where: { userId: challenge.userId },
                });
                await tx.identityPhoneChallenge.updateMany({
                    where: { userId: challenge.userId, consumedAt: null },
                    data: { consumedAt: new Date() },
                });
                await tx.identityChallenge.updateMany({
                    where: { userId: challenge.userId, consumedAt: null },
                    data: { consumedAt: new Date() },
                });
                await tx.identityAudit.create({
                    data: { userId: challenge.userId, type: 'PARENT_PASSWORD_RECOVERED' },
                });
            }
            await tx.identityPhoneChallenge.update({
                where: { id },
                data: { consumedAt: new Date() },
            });
        });
        return {
            message: 'Mobile number verified. Sign in with your mobile number and chosen password. No child relationship has been created.',
        };
    }
    async login(phoneInput, password, replacing, parentOnly = true) {
        const phone = (0, identity_util_1.canonicalPhone)(phoneInput);
        const credential = await this.db.phoneIdentity.findUnique({
            where: { phone },
            include: { user: true },
        });
        const matches = typeof password === 'string' &&
            password.length <= 128 &&
            (await (0, argon2_1.verify)(credential?.user.passwordHash ?? (await this.dummy), password).catch(() => false));
        if (!matches ||
            !credential ||
            credential.user.status !== 'ACTIVE' ||
            (parentOnly && credential.user.accountKind !== 'PARENT'))
            throw new common_1.UnauthorizedException('Invalid sign-in details');
        return this.access.issue(credential.user, replacing);
    }
};
exports.IdentityPhoneService = IdentityPhoneService;
exports.IdentityPhoneService = IdentityPhoneService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        identity_delivery_1.IdentityDelivery,
        session_access_1.SessionAccess])
], IdentityPhoneService);
//# sourceMappingURL=phone.service.js.map