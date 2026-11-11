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
exports.IdentitySessionsController = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const argon2_1 = require("argon2");
const prisma_service_1 = require("../database/prisma.service");
const session_access_1 = require("./session-access");
const identity_util_1 = require("./identity.util");
const identity_service_1 = require("./identity.service");
let IdentitySessionsController = class IdentitySessionsController {
    access;
    sessions;
    db;
    mfa;
    identity;
    constructor(access, sessions, db, mfa, identity) {
        this.access = access;
        this.sessions = sessions;
        this.db = db;
        this.mfa = mfa;
        this.identity = identity;
    }
    async list(req) {
        const actor = await this.access.require(req);
        return {
            sessions: (await this.sessions.list(actor.userId)).map((value) => ({
                id: value.id,
                current: value.id === actor.id,
                createdAt: value.createdAt,
                lastActiveAt: value.lastActiveAt,
                expiresAt: value.expiresAt,
                mfa: value.mfa ?? 'none',
            })),
        };
    }
    async revoke(input, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req);
        const body = (0, identity_util_1.bodyFields)(input, ['id']);
        const id = (0, identity_util_1.text)(body, 'id', 43);
        if (!/^[A-Za-z0-9_-]{43}$/.test(id))
            throw new common_1.BadRequestException('Invalid session identifier');
        if (await this.sessions.revoke(id, { userId: actor.userId }))
            await this.db.identityAudit.create({
                data: { userId: actor.userId, type: 'SESSION_REVOKED' },
            });
        return { message: 'Session ended if it belonged to this account' };
    }
    async renew(req, res) {
        this.access.csrf(req);
        const actor = await this.access.require(req);
        const issued = await this.sessions.rotate(actor);
        if (!issued)
            throw new common_1.UnauthorizedException('Sign in again');
        return this.access.respond(req, res, issued, {
            message: 'Session token renewed; absolute expiry is unchanged',
        });
    }
    async change(input, req, res) {
        this.access.csrf(req);
        const actor = await this.access.require(req);
        if (await this.mfa.isEnrolled(actor.userId))
            await this.access.require(req, { fresh: true });
        const body = (0, identity_util_1.bodyFields)(input, ['currentPassword', 'password']);
        await this.identity.limit(req.ip ?? '', `password-change:${actor.userId}`);
        const user = await this.db.user.findUniqueOrThrow({
            where: { id: actor.userId },
        });
        if (!user.passwordHash ||
            !(await (0, argon2_1.verify)(user.passwordHash, (0, identity_util_1.validPassword)(body.currentPassword)).catch(() => false)))
            throw new common_1.UnauthorizedException('Current password required');
        const passwordHash = await (0, argon2_1.hash)((0, identity_util_1.validPassword)(body.password), {
            type: argon2_1.argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 1,
        });
        await this.db.$transaction(async (tx) => {
            const changed = await tx.user.updateMany({
                where: {
                    id: user.id,
                    authVersion: user.authVersion,
                    passwordHash: user.passwordHash,
                    status: { in: ['ACTIVE', 'RESTRICTED'] },
                },
                data: { passwordHash, authVersion: { increment: 1 } },
            });
            if (!changed.count)
                throw new common_1.UnauthorizedException('Sign in again');
            await tx.identitySession.deleteMany({ where: { userId: user.id } });
            await tx.identityChallenge.updateMany({
                where: { userId: user.id, consumedAt: null },
                data: { consumedAt: new Date() },
            });
            await tx.identityPhoneChallenge.updateMany({
                where: { userId: user.id, consumedAt: null },
                data: { consumedAt: new Date() },
            });
            await tx.identityAudit.create({
                data: { userId: user.id, type: 'PASSWORD_CHANGED' },
            });
        });
        if (!this.access.native(req))
            res.setHeader('Set-Cookie', this.sessions.clearCookie());
        return { message: 'Password changed. Sign in again on every device.' };
    }
};
exports.IdentitySessionsController = IdentitySessionsController;
__decorate([
    (0, common_1.Get)('sessions'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdentitySessionsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('sessions/revoke'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentitySessionsController.prototype, "revoke", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentitySessionsController.prototype, "renew", null);
__decorate([
    (0, common_1.Post)('password/change'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], IdentitySessionsController.prototype, "change", null);
exports.IdentitySessionsController = IdentitySessionsController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, authentication_1.Public)(),
    __metadata("design:paramtypes", [session_access_1.SessionAccess,
        authentication_1.SessionService,
        prisma_service_1.PrismaService,
        authentication_1.MfaService,
        identity_service_1.IdentityService])
], IdentitySessionsController);
//# sourceMappingURL=sessions.controller.js.map