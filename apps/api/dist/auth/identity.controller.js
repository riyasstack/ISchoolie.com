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
exports.IdentityController = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const prisma_service_1 = require("../database/prisma.service");
const identity_service_1 = require("./identity.service");
const identity_util_1 = require("./identity.util");
const session_access_1 = require("./session-access");
const oidc_config_1 = require("./oidc.config");
const delivery_config_1 = require("./delivery.config");
let IdentityController = class IdentityController {
    identity;
    sessions;
    db;
    access;
    constructor(identity, sessions, db, access) {
        this.identity = identity;
        this.sessions = sessions;
        this.db = db;
        this.access = access;
    }
    raw(req) {
        return this.access.raw(req);
    }
    async session(req) {
        return this.access.require(req, { pending: true });
    }
    origin(req) {
        this.access.origin(req);
    }
    csrf(req) {
        this.access.csrf(req);
    }
    capabilities() {
        const configured = (0, oidc_config_1.oidcProviders)();
        return {
            emailPassword: true,
            emailDelivery: (0, delivery_config_1.localEmail)()
                ? 'LOCAL_CAPTURE_ONLY'
                : (0, delivery_config_1.emailConfigured)()
                    ? 'CONFIGURED_UNVERIFIED'
                    : 'UNCONFIGURED',
            smsDelivery: (0, delivery_config_1.localSms)()
                ? 'LOCAL_CAPTURE_ONLY'
                : (0, delivery_config_1.smsConfigured)()
                    ? 'CONFIGURED_UNVERIFIED'
                    : 'UNCONFIGURED',
            providers: Object.fromEntries(['google', 'github', 'apple'].map((provider) => [
                provider,
                Object.hasOwn(configured, provider)
                    ? 'CONFIGURED_UNVERIFIED'
                    : 'UNCONFIGURED',
            ])),
            student: 'RESTRICTED_LOGIN',
            staff: 'IMPLEMENTED',
            parent: 'IMPLEMENTED_DELIVERY_REQUIRED',
            privileged: 'MFA_REQUIRED',
            native: 'IMPLEMENTED_DEVICE_QA_REQUIRED',
        };
    }
    async register(input, req) {
        this.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['email', 'password', 'displayName']);
        const email = (0, identity_util_1.canonicalEmail)((0, identity_util_1.text)(body, 'email'));
        await this.identity.limit(req.ip ?? '', email);
        return this.identity.register(email, body.password, (0, identity_util_1.text)(body, 'displayName', 100));
    }
    async verify(input, req) {
        this.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['token', 'password']);
        await this.identity.limit(req.ip ?? '', `verify:${req.ip}`);
        return this.identity.verifyEmail((0, identity_util_1.text)(body, 'token', 128), body.password);
    }
    async login(input, req, res) {
        this.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['email', 'password']);
        const email = (0, identity_util_1.canonicalEmail)((0, identity_util_1.text)(body, 'email'));
        await this.identity.limit(req.ip ?? '', email);
        const issued = await this.identity.login(email, body.password, this.raw(req));
        return this.access.respond(req, res, issued, {
            message: issued.session.mfa === 'pending'
                ? 'Second factor required'
                : 'Signed in',
        });
    }
    async me(req, res) {
        const session = await this.session(req);
        res.setHeader('Cache-Control', 'no-store');
        const user = await this.db.user.findUniqueOrThrow({
            where: { id: session.userId },
            select: {
                id: true,
                email: true,
                displayName: true,
                status: true,
                accountKind: true,
            },
        });
        const permissions = session.mfa === 'verified' && user.status === 'ACTIVE'
            ? await this.db.institutionGrant.findMany({
                where: { userId: user.id, active: true },
                select: {
                    institutionId: true,
                    permission: true,
                    institution: { select: { code: true, name: true } },
                },
            })
            : [];
        return {
            user,
            csrf: this.access.native(req)
                ? undefined
                : (0, identity_util_1.digest)(`csrf:${this.raw(req)}`),
            permissions,
            mfa: session.mfa ?? 'none',
            restricted: user.status === 'RESTRICTED',
            session: {
                id: session.id,
                createdAt: session.createdAt,
                expiresAt: session.expiresAt,
            },
        };
    }
    async privileged(input, req, res) {
        this.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['email', 'password']);
        const email = (0, identity_util_1.canonicalEmail)((0, identity_util_1.text)(body, 'email'));
        await this.identity.limit(req.ip ?? '', `privileged:${email}`);
        return this.access.respond(req, res, await this.identity.privilegedLogin(email, body.password, this.raw(req)), { message: 'Second factor required' });
    }
    async logout(req, res) {
        this.csrf(req);
        const session = await this.session(req);
        if (await this.sessions.revoke(session.id, { userId: session.userId }))
            await this.db.identityAudit.create({
                data: { userId: session.userId, type: 'SIGNED_OUT' },
            });
        if (!this.access.native(req))
            res.setHeader('Set-Cookie', this.sessions.clearCookie());
        return { message: 'Signed out' };
    }
    async logoutAll(req, res) {
        this.csrf(req);
        const session = await this.session(req);
        await this.db.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: session.userId },
                data: { authVersion: { increment: 1 } },
            });
            await tx.identitySession.deleteMany({
                where: { userId: session.userId },
            });
        });
        if (!this.access.native(req))
            res.setHeader('Set-Cookie', this.sessions.clearCookie());
        return { message: 'All sessions ended' };
    }
    async recovery(input, req) {
        this.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['email']);
        const email = (0, identity_util_1.canonicalEmail)((0, identity_util_1.text)(body, 'email'));
        await this.identity.limit(req.ip ?? '', email);
        return this.identity.requestReset(email);
    }
    async reset(input, req) {
        this.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['token', 'password']);
        await this.identity.limit(req.ip ?? '', `reset:${req.ip}`);
        return this.identity.reset((0, identity_util_1.text)(body, 'token', 128), body.password);
    }
    async privilegedRecovery(input, req) {
        this.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['email']);
        const email = (0, identity_util_1.canonicalEmail)((0, identity_util_1.text)(body, 'email'));
        await this.identity.limit(req.ip ?? '', `privileged-recovery:${email}`);
        return this.identity.privilegedRecovery(email);
    }
};
exports.IdentityController = IdentityController;
__decorate([
    (0, common_1.Get)('capabilities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IdentityController.prototype, "capabilities", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('login/email'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('login/privileged'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "privileged", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('logout-all'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "logoutAll", null);
__decorate([
    (0, common_1.Post)('recovery/email'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "recovery", null);
__decorate([
    (0, common_1.Post)('recovery/reset'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "reset", null);
__decorate([
    (0, common_1.Post)('recovery/privileged'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "privilegedRecovery", null);
exports.IdentityController = IdentityController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, authentication_1.Public)(),
    __metadata("design:paramtypes", [identity_service_1.IdentityService,
        authentication_1.SessionService,
        prisma_service_1.PrismaService,
        session_access_1.SessionAccess])
], IdentityController);
//# sourceMappingURL=identity.controller.js.map