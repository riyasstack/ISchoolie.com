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
exports.NativeBrokerService = exports.nativeReturnUri = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const session_access_1 = require("./session-access");
const identity_util_1 = require("./identity.util");
const oidc_config_1 = require("./oidc.config");
const nativeReturnUri = () => process.env.AUTH_NATIVE_REDIRECT_URI ?? 'ischoolie://auth-return';
exports.nativeReturnUri = nativeReturnUri;
let NativeBrokerService = class NativeBrokerService {
    db;
    access;
    constructor(db, access) {
        this.db = db;
        this.access = access;
    }
    async start(provider, challenge, clientState, actor) {
        if (!Object.hasOwn((0, oidc_config_1.oidcProviders)(), provider))
            throw new common_1.BadRequestException('Provider is not configured');
        if (!/^[a-f0-9]{64}$/.test(challenge) ||
            !/^[a-f0-9]{64}$/.test(clientState))
            throw new common_1.BadRequestException('Invalid native challenge');
        await this.db.identityNativeBroker.deleteMany({
            where: { expiresAt: { lt: new Date() } },
        });
        const broker = await this.db.identityNativeBroker.create({
            data: {
                provider,
                challenge,
                clientState,
                linkUserId: actor?.userId,
                linkSessionId: actor?.id,
                expiresAt: new Date(Date.now() + 5 * 60_000),
            },
        });
        return {
            id: broker.id,
            url: `${process.env.AUTH_OIDC_CALLBACK_ORIGIN ?? 'http://localhost:3000'}/api/auth/oidc/native/${broker.id}/begin`,
            redirectUri: (0, exports.nativeReturnUri)(),
        };
    }
    async begin(id) {
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))
            throw new common_1.BadRequestException('Invalid native transaction');
        const claimed = await this.db.identityNativeBroker.updateMany({
            where: {
                id,
                oidcState: null,
                consumedAt: null,
                expiresAt: { gt: new Date() },
            },
            data: { oidcState: `STARTING:${id}` },
        });
        if (!claimed.count)
            throw new common_1.BadRequestException('Native transaction already started or expired');
        return this.db.identityNativeBroker.findUniqueOrThrow({ where: { id } });
    }
    async bind(id, state) {
        await this.db.identityNativeBroker.update({
            where: { id },
            data: { oidcState: state },
        });
    }
    async linkActor(broker) {
        if (!broker.linkUserId || !broker.linkSessionId)
            return undefined;
        const row = await this.db.identitySession.findUnique({
            where: { id: broker.linkSessionId },
            include: { user: true },
        });
        const metadata = row?.metadata;
        if (!row ||
            row.userId !== broker.linkUserId ||
            row.user.status !== 'ACTIVE' ||
            row.authVersion !== row.user.authVersion ||
            row.mfa !== 'verified' ||
            row.expiresAt <= new Date() ||
            row.lastActiveAt.getTime() < Date.now() - 30 * 60_000 ||
            typeof metadata?.verifiedAt !== 'number' ||
            metadata.verifiedAt < Date.now() - 10 * 60_000)
            throw new common_1.UnauthorizedException('Original recent-MFA session required to link');
        return {
            id: row.id,
            userId: row.userId,
            createdAt: row.createdAt,
            lastActiveAt: row.lastActiveAt,
            expiresAt: row.expiresAt,
            mfa: 'verified',
            metadata,
        };
    }
    async handoff(state, user) {
        const broker = await this.db.identityNativeBroker.findUnique({
            where: { oidcState: state },
        });
        if (!broker)
            return null;
        const code = (0, identity_util_1.token)();
        const saved = await this.db.identityNativeBroker.updateMany({
            where: {
                id: broker.id,
                consumedAt: null,
                codeHash: null,
                expiresAt: { gt: new Date() },
            },
            data: {
                userId: user.id,
                authVersion: user.authVersion,
                codeHash: (0, identity_util_1.digest)(code),
            },
        });
        if (!saved.count)
            throw new common_1.UnauthorizedException('Native handoff unavailable');
        const uri = new URL((0, exports.nativeReturnUri)());
        uri.searchParams.set('broker', broker.id);
        uri.searchParams.set('state', broker.clientState);
        uri.searchParams.set('code', code);
        return uri.toString();
    }
    async exchange(id, code, verifier) {
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) ||
            !/^[A-Za-z0-9_-]{43}$/.test(code) ||
            !/^[a-f0-9]{64}$/.test(verifier))
            throw new common_1.UnauthorizedException('Invalid native exchange');
        const user = await this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM "IdentityNativeBroker" WHERE id = ${id}::uuid FOR UPDATE`;
            const broker = await tx.identityNativeBroker.findUnique({
                where: { id },
            });
            if (!broker ||
                broker.consumedAt ||
                broker.expiresAt <= new Date() ||
                broker.codeHash !== (0, identity_util_1.digest)(code) ||
                broker.challenge !== (0, identity_util_1.digest)(verifier) ||
                !broker.userId)
                throw new common_1.UnauthorizedException('Invalid or expired native exchange');
            const user = await tx.user.findFirst({
                where: {
                    id: broker.userId,
                    authVersion: broker.authVersion,
                    status: 'ACTIVE',
                },
            });
            if (!user)
                throw new common_1.UnauthorizedException('Sign in again');
            await tx.identityNativeBroker.update({
                where: { id },
                data: { consumedAt: new Date() },
            });
            return user;
        });
        return this.access.issue(user);
    }
};
exports.NativeBrokerService = NativeBrokerService;
exports.NativeBrokerService = NativeBrokerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        session_access_1.SessionAccess])
], NativeBrokerService);
//# sourceMappingURL=native-broker.service.js.map