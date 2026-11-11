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
exports.IdentityBootstrap = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const argon2_1 = require("argon2");
const prisma_service_1 = require("../database/prisma.service");
const identity_delivery_1 = require("./identity.delivery");
const identity_util_1 = require("./identity.util");
let IdentityBootstrap = class IdentityBootstrap {
    db;
    delivery;
    mfa;
    constructor(db, delivery, mfa) {
        this.db = db;
        this.delivery = delivery;
        this.mfa = mfa;
    }
    enabled() {
        if (process.env.AUTH_BOOTSTRAP_ENABLED !== 'true')
            throw new common_1.ForbiddenException('Bootstrap is disabled');
        this.delivery.requireAvailable();
    }
    async operator(input) {
        this.enabled();
        const body = (0, identity_util_1.bodyFields)(input, ['email', 'displayName']);
        const email = (0, identity_util_1.canonicalEmail)((0, identity_util_1.text)(body, 'email'));
        const displayName = (0, identity_util_1.text)(body, 'displayName', 100);
        const raw = (0, identity_util_1.token)();
        const messageId = await this.db.$transaction(async (tx) => {
            await tx.$executeRaw `SELECT pg_advisory_xact_lock(1703, 1)`;
            if (await tx.platformOperator.count())
                throw new common_1.BadRequestException('Initial operator already exists');
            const user = await tx.user.create({
                data: {
                    email,
                    emailCanonical: email,
                    displayName,
                    accountKind: 'PLATFORM_OPERATOR',
                    status: 'PENDING',
                    operator: { create: {} },
                },
            });
            await tx.identityChallenge.create({
                data: {
                    userId: user.id,
                    kind: 'PRIVILEGED_ACTIVATE',
                    tokenHash: (0, identity_util_1.digest)(raw),
                    expiresAt: new Date(Date.now() + 60 * 60_000),
                },
            });
            await tx.identityAudit.create({
                data: { userId: user.id, type: 'INITIAL_OPERATOR_BOOTSTRAPPED' },
            });
            return this.delivery.stageEmail(tx, email, 'PRIVILEGED_ACTIVATE', raw);
        });
        await this.delivery.dispatch(messageId);
        return {
            message: 'Initial operator invitation created. Activation and MFA enrollment are required.',
        };
    }
    async institution(input) {
        this.enabled();
        const body = (0, identity_util_1.bodyFields)(input, [
            'actorEmail',
            'password',
            'code',
            'institutionCode',
            'institutionName',
            'adminEmail',
            'adminName',
        ]);
        const actorEmail = (0, identity_util_1.canonicalEmail)((0, identity_util_1.text)(body, 'actorEmail'));
        const actor = await this.db.user.findUnique({
            where: { emailCanonical: actorEmail },
            include: { operator: true },
        });
        if (!actor?.operator?.active ||
            actor.status !== 'ACTIVE' ||
            !actor.passwordHash ||
            !(await (0, argon2_1.verify)(actor.passwordHash, (0, identity_util_1.validPassword)(body.password)).catch(() => false)))
            throw new common_1.ForbiddenException('Active operator password and MFA required');
        if (!(await this.mfa.verifyTotp(actor.id, (0, identity_util_1.text)(body, 'code', 16))))
            throw new common_1.ForbiddenException('Active operator password and MFA required');
        const email = (0, identity_util_1.canonicalEmail)((0, identity_util_1.text)(body, 'adminEmail'));
        const raw = (0, identity_util_1.token)();
        const code = (0, identity_util_1.canonicalIdentifier)((0, identity_util_1.text)(body, 'institutionCode', 64));
        const name = (0, identity_util_1.text)(body, 'institutionName', 150);
        const displayName = (0, identity_util_1.text)(body, 'adminName', 100);
        const result = await this.db.$transaction(async (tx) => {
            const live = await tx.platformOperator.findFirst({
                where: {
                    userId: actor.id,
                    active: true,
                    user: { status: 'ACTIVE', authVersion: actor.authVersion },
                },
            });
            if (!live)
                throw new common_1.ForbiddenException('Operator unavailable');
            const institution = await tx.institutionIdentity.create({
                data: { code, name },
            });
            const admin = await tx.user.create({
                data: {
                    email,
                    emailCanonical: email,
                    displayName,
                    status: 'PENDING',
                    accountKind: 'INSTITUTION_ADMIN',
                    grants: {
                        create: [
                            'PROVISION_STUDENT',
                            'PROVISION_STAFF',
                            'MANAGE_IDENTITIES',
                        ].map((permission) => ({
                            institutionId: institution.id,
                            permission,
                        })),
                    },
                },
            });
            await tx.identityChallenge.create({
                data: {
                    userId: admin.id,
                    kind: 'PRIVILEGED_ACTIVATE',
                    tokenHash: (0, identity_util_1.digest)(raw),
                    expiresAt: new Date(Date.now() + 60 * 60_000),
                },
            });
            await tx.identityAudit.create({
                data: { userId: actor.id, type: 'INSTITUTION_ADMIN_BOOTSTRAPPED' },
            });
            const messageId = await this.delivery.stageEmail(tx, email, 'PRIVILEGED_ACTIVATE', raw);
            return {
                institutionId: institution.id,
                code: institution.code,
                messageId,
            };
        });
        await this.delivery.dispatch(result.messageId);
        return {
            institutionId: result.institutionId,
            code: result.code,
            message: 'Institution and administrator invitation created. Activation and MFA required.',
        };
    }
    async resend(input) {
        this.enabled();
        const body = (0, identity_util_1.bodyFields)(input, ['email']);
        const email = (0, identity_util_1.canonicalEmail)((0, identity_util_1.text)(body, 'email'));
        const user = await this.db.user.findFirst({
            where: {
                emailCanonical: email,
                status: 'PENDING',
                accountKind: { in: ['INSTITUTION_ADMIN', 'PLATFORM_OPERATOR'] },
            },
        });
        if (!user)
            throw new common_1.BadRequestException('Pending privileged invitation unavailable');
        const raw = (0, identity_util_1.token)();
        const messageId = await this.db.$transaction(async (tx) => {
            await tx.identityChallenge.create({
                data: {
                    userId: user.id,
                    authVersion: user.authVersion,
                    kind: 'PRIVILEGED_ACTIVATE',
                    tokenHash: (0, identity_util_1.digest)(raw),
                    expiresAt: new Date(Date.now() + 60 * 60_000),
                },
            });
            return this.delivery.stageEmail(tx, email, 'PRIVILEGED_ACTIVATE', raw);
        });
        await this.delivery.dispatch(messageId);
        return {
            message: 'Privileged invitation queued for its existing address.',
        };
    }
};
exports.IdentityBootstrap = IdentityBootstrap;
exports.IdentityBootstrap = IdentityBootstrap = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        identity_delivery_1.IdentityDelivery,
        authentication_1.MfaService])
], IdentityBootstrap);
//# sourceMappingURL=bootstrap.service.js.map