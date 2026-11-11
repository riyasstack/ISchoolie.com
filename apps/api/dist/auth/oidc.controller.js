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
exports.IdentityOidcController = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const prisma_service_1 = require("../database/prisma.service");
const session_access_1 = require("./session-access");
const identity_proof_1 = require("./identity-proof");
const identity_service_1 = require("./identity.service");
const identity_util_1 = require("./identity.util");
const native_broker_service_1 = require("./native-broker.service");
let IdentityOidcController = class IdentityOidcController {
    oidc;
    access;
    proof;
    identity;
    db;
    broker;
    sessions;
    constructor(oidc, access, proof, identity, db, broker, sessions) {
        this.oidc = oidc;
        this.access = access;
        this.proof = proof;
        this.identity = identity;
        this.db = db;
        this.broker = broker;
        this.sessions = sessions;
    }
    async start(provider, input, req) {
        this.access.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['link']);
        if (body.link !== undefined && typeof body.link !== 'boolean')
            throw new common_1.BadRequestException('Invalid link option');
        if (this.access.native(req))
            throw new common_1.BadRequestException('Native browser broker is not configured');
        await this.identity.limit(req.ip ?? '', `oidc:${req.ip}`);
        if (body.link) {
            this.access.csrf(req);
            await this.access.require(req, { fresh: true });
        }
        const result = await this.oidc.start(provider, {
            link: body.link === true,
            redirectTo: '/auth/sign-in',
        });
        return { url: result.url };
    }
    async callback(provider, query, req, res) {
        try {
            const native = typeof query.state === 'string'
                ? await this.db.identityNativeBroker.findUnique({
                    where: { oidcState: query.state },
                })
                : null;
            const actor = native ? await this.broker.linkActor(native) : undefined;
            const result = await this.proof.run(req, () => this.oidc.finish(provider, query), actor);
            if (native) {
                const sessionCookie = result.cookies[0]
                    ?.split(';')[0]
                    ?.split('=')
                    .slice(1)
                    .join('=');
                const session = await this.sessions.validate(sessionCookie);
                if (!session)
                    throw new Error('Native callback session unavailable');
                const user = await this.db.user.findUniqueOrThrow({
                    where: { id: session.userId },
                });
                await this.sessions.revoke(session.id, { userId: user.id });
                res.appendHeader('Set-Cookie', this.sessions.clearCookie());
                const uri = await this.broker.handoff(String(query.state), user);
                if (!uri)
                    throw new Error('Native callback unavailable');
                res.redirect(303, uri);
                return;
            }
            res.redirect(303, result.url);
        }
        catch {
            res.redirect(303, '/auth/sign-in?auth_error=provider');
        }
    }
    async nativeStart(input, req) {
        this.access.origin(req);
        if (!this.access.native(req))
            throw new common_1.BadRequestException('Native transport required');
        const body = (0, identity_util_1.bodyFields)(input, ['provider', 'challenge', 'state', 'link']);
        if (body.link !== undefined && typeof body.link !== 'boolean')
            throw new common_1.BadRequestException('Invalid link option');
        await this.identity.limit(req.ip ?? '', `native-oidc:${req.ip}`);
        const actor = body.link
            ? await this.access.require(req, { fresh: true })
            : undefined;
        return this.broker.start((0, identity_util_1.text)(body, 'provider', 20), (0, identity_util_1.text)(body, 'challenge', 64), (0, identity_util_1.text)(body, 'state', 64), actor);
    }
    async nativeBegin(id, req, res) {
        await this.identity.limit(req.ip ?? '', `native-browser:${req.ip}`);
        const broker = await this.broker.begin(id);
        const result = await this.oidc.start(broker.provider, {
            redirectTo: '/auth/sign-in',
        });
        const state = new URL(result.url).searchParams.get('state');
        if (!state)
            throw new Error('Provider transaction unavailable');
        await this.broker.bind(broker.id, state);
        res.redirect(303, result.url);
    }
    async nativeExchange(input, req, res) {
        this.access.origin(req);
        if (!this.access.native(req))
            throw new common_1.BadRequestException('Native transport required');
        const body = (0, identity_util_1.bodyFields)(input, ['id', 'code', 'verifier']);
        await this.identity.limit(req.ip ?? '', `native-exchange:${req.ip}`);
        return this.access.respond(req, res, await this.broker.exchange((0, identity_util_1.text)(body, 'id', 36), (0, identity_util_1.text)(body, 'code', 43), (0, identity_util_1.text)(body, 'verifier', 64)), { message: 'Provider identity verified' });
    }
    async linked(req) {
        const actor = await this.access.require(req);
        return {
            providers: await this.db.providerIdentity.findMany({
                where: { userId: actor.userId },
                select: { id: true, provider: true, linkedAt: true },
            }),
        };
    }
    async unlink(input, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req, { fresh: true });
        const body = (0, identity_util_1.bodyFields)(input, ['provider']);
        const provider = (0, identity_util_1.text)(body, 'provider', 20);
        await this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM "User" WHERE id = ${actor.userId}::uuid FOR UPDATE`;
            const user = await tx.user.findUniqueOrThrow({
                where: { id: actor.userId },
            });
            const total = await tx.providerIdentity.count({
                where: { userId: user.id },
            });
            const institutional = !!user.passwordHash &&
                !!(await tx.institutionalLogin.findFirst({
                    where: {
                        userId: user.id,
                        status: 'ACTIVE',
                        institution: { active: true },
                    },
                }));
            const email = !!user.passwordHash &&
                !!user.emailCanonical &&
                !!user.emailVerifiedAt &&
                user.accountKind !== 'STUDENT';
            const phone = !!user.passwordHash &&
                user.accountKind !== 'STUDENT' &&
                !!(await tx.phoneIdentity.findUnique({ where: { userId: user.id } }));
            if (total <= 1 && !institutional && !email && !phone)
                throw new common_1.BadRequestException('Cannot remove the last sign-in method');
            await tx.providerIdentity.deleteMany({
                where: { userId: user.id, provider },
            });
            await tx.user.update({
                where: { id: user.id },
                data: { authVersion: { increment: 1 } },
            });
            await tx.identitySession.deleteMany({ where: { userId: user.id } });
            await tx.identityAudit.create({
                data: { userId: user.id, type: 'PROVIDER_UNLINKED' },
            });
        });
        return { message: 'Provider removed. Sign in again.' };
    }
};
exports.IdentityOidcController = IdentityOidcController;
__decorate([
    (0, common_1.Post)('oidc/:provider/start'),
    __param(0, (0, common_1.Param)('provider')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityOidcController.prototype, "start", null);
__decorate([
    (0, common_1.Get)('oidc/:provider/callback'),
    __param(0, (0, common_1.Param)('provider')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityOidcController.prototype, "callback", null);
__decorate([
    (0, common_1.Post)('native/oidc/start'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityOidcController.prototype, "nativeStart", null);
__decorate([
    (0, common_1.Get)('oidc/native/:id/begin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityOidcController.prototype, "nativeBegin", null);
__decorate([
    (0, common_1.Post)('native/oidc/exchange'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityOidcController.prototype, "nativeExchange", null);
__decorate([
    (0, common_1.Get)('providers'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdentityOidcController.prototype, "linked", null);
__decorate([
    (0, common_1.Post)('providers/unlink'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityOidcController.prototype, "unlink", null);
exports.IdentityOidcController = IdentityOidcController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, authentication_1.Public)(),
    __metadata("design:paramtypes", [authentication_1.OidcService,
        session_access_1.SessionAccess,
        identity_proof_1.IdentityProof,
        identity_service_1.IdentityService,
        prisma_service_1.PrismaService,
        native_broker_service_1.NativeBrokerService,
        authentication_1.SessionService])
], IdentityOidcController);
//# sourceMappingURL=oidc.controller.js.map