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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityMfaController = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const argon2_1 = require("argon2");
const prisma_service_1 = require("../database/prisma.service");
const session_access_1 = require("./session-access");
const identity_util_1 = require("./identity.util");
const identity_service_1 = require("./identity.service");
let IdentityMfaController = class IdentityMfaController {
    db;
    access;
    mfa;
    sessions;
    identity;
    constructor(db, access, mfa, sessions, identity) {
        this.db = db;
        this.access = access;
        this.mfa = mfa;
        this.sessions = sessions;
        this.identity = identity;
    }
    async locked(session, action) {
        return this.db.$transaction(async (tx) => {
            await tx.$executeRaw `SELECT pg_advisory_xact_lock(1702, hashtext(${session.userId}))`;
            const users = await tx.$queryRaw `SELECT id FROM "User" WHERE id=${session.userId}::uuid AND "authVersion"=${Number(session.metadata?.authVersion)} AND status IN ('ACTIVE','RESTRICTED') FOR NO KEY UPDATE`;
            const live = await tx.identitySession.findFirst({
                where: {
                    id: session.id,
                    userId: session.userId,
                    expiresAt: { gt: new Date() },
                    lastActiveAt: { gt: new Date(Date.now() - 30 * 60_000) },
                },
            });
            if (!users.length || !live)
                throw new common_1.UnauthorizedException('Sign in again');
            return action(tx);
        }, { timeout: 20000 });
    }
    async firstFactor(user, password, authenticatedAt) {
        if (user.passwordHash) {
            if (!(await (0, argon2_1.verify)(user.passwordHash, (0, identity_util_1.validPassword)(password)).catch(() => false)))
                throw new common_1.UnauthorizedException('Current password required');
            return Date.now();
        }
        else if (typeof authenticatedAt !== 'number' ||
            authenticatedAt < Date.now() - 5 * 60_000 ||
            !(await this.db.providerIdentity.findFirst({
                where: { userId: user.id },
            })))
            throw new common_1.UnauthorizedException('Sign in with your provider again before changing the authenticator');
        return authenticatedAt;
    }
    async status(req) {
        const session = await this.access.require(req, { pending: true });
        return {
            enrolled: await this.mfa.isEnrolled(session.userId),
            state: session.mfa ?? 'none',
            recoveryCodesRemaining: await this.mfa.remainingRecoveryCodes(session.userId),
        };
    }
    async enroll(input, req) {
        this.access.csrf(req);
        const session = await this.access.require(req, { pending: true });
        const body = (0, identity_util_1.bodyFields)(input, ['password']);
        await this.identity.limit(req.ip ?? '', `mfa-enroll:${session.userId}`);
        const user = await this.db.user.findUniqueOrThrow({
            where: { id: session.userId },
        });
        const authenticatedAt = await this.firstFactor(user, body.password, session.metadata?.authenticatedAt);
        return this.locked(session, async (tx) => {
            if (await this.mfa.isEnrolled(user.id))
                throw new common_1.BadRequestException('Authenticator already enrolled');
            const enrollment = await this.mfa.enroll(user.id, user.email ?? user.displayName ?? 'iSchoolie account');
            await tx.identitySession.update({
                where: { id: session.id },
                data: {
                    metadata: JSON.parse(JSON.stringify({
                        ...session.metadata,
                        authenticatedAt,
                        mfaEnrollmentAt: Date.now(),
                    })),
                },
            });
            return enrollment;
        });
    }
    async confirm(input, req, res) {
        this.access.csrf(req);
        const session = await this.access.require(req, { pending: true });
        const body = (0, identity_util_1.bodyFields)(input, ['code']);
        const code = (0, identity_util_1.text)(body, 'code', 16);
        const result = await this.locked(session, async (tx) => {
            if (typeof session.metadata?.mfaEnrollmentAt !== 'number' ||
                session.metadata.mfaEnrollmentAt < Date.now() - 10 * 60_000)
                throw new common_1.BadRequestException('Start authenticator setup again; this enrollment session expired');
            if (await this.mfa.isEnrolled(session.userId))
                throw new common_1.BadRequestException('Authenticator already confirmed');
            if (!(await this.mfa.confirm(session.userId, code)))
                throw new common_1.UnauthorizedException('Invalid authenticator code');
            const recoveryCodes = await this.mfa.generateRecoveryCodes(session.userId);
            if (!(await tx.identitySession.deleteMany({ where: { id: session.id } }))
                .count)
                throw new common_1.UnauthorizedException('Sign in again');
            const user = await tx.user.update({
                where: { id: session.userId },
                data: { authVersion: { increment: 1 } },
            });
            await tx.identitySession.deleteMany({
                where: { userId: session.userId },
            });
            await tx.identityAudit.create({
                data: { userId: session.userId, type: 'MFA_CONFIRMED' },
            });
            return { user, recoveryCodes };
        });
        const issued = await this.sessions.create(result.user.id, {
            mfa: 'verified',
            metadata: {
                authVersion: result.user.authVersion,
                authenticatedAt: session.metadata?.authenticatedAt,
                verifiedAt: Date.now(),
            },
        });
        return this.access.respond(req, res, issued, {
            message: 'Authenticator confirmed. Save these recovery codes securely; they are shown once.',
            recoveryCodes: result.recoveryCodes,
        });
    }
    async verify(input, req, res) {
        this.access.csrf(req);
        const session = await this.access.require(req, { pending: true });
        const body = (0, identity_util_1.bodyFields)(input, ['code', 'recovery']);
        if (body.recovery !== undefined && typeof body.recovery !== 'boolean')
            throw new common_1.BadRequestException('Invalid recovery selection');
        const code = (0, identity_util_1.text)(body, 'code', 64);
        await this.identity.limit(req.ip ?? '', `mfa:${session.userId}`);
        const issued = await this.locked(session, async (tx) => {
            if (!(await this.mfa.isEnrolled(session.userId)) ||
                !(await (body.recovery
                    ? this.mfa.verifyRecoveryCode(session.userId, code)
                    : this.mfa.verifyTotp(session.userId, code))))
                throw new common_1.UnauthorizedException('Invalid or already used second factor');
            const issued = await this.access.rotateVerified(session);
            if (issued)
                await tx.identityAudit.create({
                    data: { userId: session.userId, type: 'MFA_VERIFIED' },
                });
            return issued;
        });
        if (!issued)
            throw new common_1.UnauthorizedException('Sign in again');
        return this.access.respond(req, res, issued, {
            message: 'Second factor verified',
        });
    }
    async recovery(req) {
        this.access.csrf(req);
        const session = await this.access.require(req, { fresh: true });
        return this.locked(session, async (tx) => {
            const recoveryCodes = await this.mfa.generateRecoveryCodes(session.userId);
            await tx.identityAudit.create({
                data: { userId: session.userId, type: 'MFA_RECOVERY_CODES_REPLACED' },
            });
            return { recoveryCodes };
        });
    }
    async disable(input, req, res) {
        this.access.csrf(req);
        const session = await this.access.require(req, { fresh: true });
        const body = (0, identity_util_1.bodyFields)(input, ['password']);
        if (await this.access.privileged(session.userId))
            throw new common_1.ForbiddenException('Privileged accounts must retain MFA');
        await this.identity.limit(req.ip ?? '', `mfa-disable:${session.userId}`);
        const user = await this.db.user.findUniqueOrThrow({
            where: { id: session.userId },
        });
        await this.firstFactor(user, body.password, session.metadata?.authenticatedAt);
        const updated = await this.locked(session, async (tx) => {
            if (await this.access.privileged(user.id))
                throw new common_1.ForbiddenException('Privileged accounts must retain MFA');
            if (!(await tx.identitySession.deleteMany({ where: { id: session.id } }))
                .count)
                throw new common_1.UnauthorizedException('Sign in again');
            await this.mfa.disable(user.id);
            const updated = await tx.user.update({
                where: { id: user.id },
                data: { authVersion: { increment: 1 } },
            });
            await tx.identitySession.deleteMany({ where: { userId: user.id } });
            await tx.identityAudit.create({
                data: { userId: user.id, type: 'MFA_DISABLED' },
            });
            return updated;
        });
        return this.access.respond(req, res, await this.access.issue(updated), {
            message: 'Authenticator removed; previous sessions ended',
        });
    }
};
exports.IdentityMfaController = IdentityMfaController;
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdentityMfaController.prototype, "status", null);
__decorate([
    (0, common_1.Post)('enroll'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityMfaController.prototype, "enroll", null);
__decorate([
    (0, common_1.Post)('confirm'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityMfaController.prototype, "confirm", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityMfaController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('recovery-codes'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdentityMfaController.prototype, "recovery", null);
__decorate([
    (0, common_1.Post)('disable'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityMfaController.prototype, "disable", null);
exports.IdentityMfaController = IdentityMfaController = __decorate([
    (0, common_1.Controller)('auth/mfa'),
    (0, authentication_1.Public)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        session_access_1.SessionAccess,
        authentication_1.MfaService,
        authentication_1.SessionService,
        identity_service_1.IdentityService])
], IdentityMfaController);
//# sourceMappingURL=mfa.controller.js.map