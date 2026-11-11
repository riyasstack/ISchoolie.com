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
exports.IdentityLoginMethodsController = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const prisma_service_1 = require("../database/prisma.service");
const session_access_1 = require("./session-access");
let IdentityLoginMethodsController = class IdentityLoginMethodsController {
    db;
    access;
    constructor(db, access) {
        this.db = db;
        this.access = access;
    }
    async list(req) {
        const actor = await this.access.require(req);
        const user = await this.db.user.findUniqueOrThrow({
            where: { id: actor.userId },
            include: {
                phones: true,
                providers: true,
                logins: {
                    include: {
                        institution: { select: { code: true, name: true, active: true } },
                    },
                },
            },
        });
        return {
            passwordConfigured: !!user.passwordHash,
            email: user.email
                ? { address: user.email, verified: !!user.emailVerifiedAt }
                : null,
            providers: user.providers.map((value) => ({
                provider: value.provider,
                id: value.id,
                linkedAt: value.linkedAt,
            })),
            phone: user.phones[0]
                ? {
                    number: user.phones[0].phone,
                    verifiedAt: user.phones[0].verifiedAt,
                }
                : null,
            institutions: user.logins.map((value) => ({
                identifier: value.identifier,
                kind: value.kind,
                status: value.status,
                institution: value.institution,
            })),
            message: 'Login identifiers are separate from permissions. No secret provider tokens are exposed.',
        };
    }
    async unlinkPhone(req) {
        this.access.csrf(req);
        const actor = await this.access.require(req, { fresh: true });
        await this.db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM "User" WHERE id=${actor.userId}::uuid FOR UPDATE`;
            const user = await tx.user.findUniqueOrThrow({
                where: { id: actor.userId },
            });
            const provider = !!(await tx.providerIdentity.findFirst({
                where: { userId: user.id },
            }));
            const email = !!user.passwordHash &&
                !!user.emailCanonical &&
                !!user.emailVerifiedAt &&
                user.accountKind !== 'STUDENT';
            const institution = !!user.passwordHash &&
                !!(await tx.institutionalLogin.findFirst({
                    where: {
                        userId: user.id,
                        status: 'ACTIVE',
                        institution: { active: true },
                    },
                }));
            if (!provider && !email && !institution)
                throw new common_1.BadRequestException('Cannot remove the last usable sign-in method');
            await tx.phoneIdentity.deleteMany({ where: { userId: user.id } });
            await tx.user.update({
                where: { id: user.id },
                data: { authVersion: { increment: 1 } },
            });
            await tx.identitySession.deleteMany({ where: { userId: user.id } });
            await tx.identityPhoneChallenge.updateMany({
                where: { userId: user.id, consumedAt: null },
                data: { consumedAt: new Date() },
            });
            await tx.identityAudit.create({
                data: { userId: user.id, type: 'PHONE_CREDENTIAL_UNLINKED' },
            });
        });
        return {
            message: 'Mobile credential removed. Sign in again with another method.',
        };
    }
};
exports.IdentityLoginMethodsController = IdentityLoginMethodsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdentityLoginMethodsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('phone/unlink'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdentityLoginMethodsController.prototype, "unlinkPhone", null);
exports.IdentityLoginMethodsController = IdentityLoginMethodsController = __decorate([
    (0, common_1.Controller)('auth/login-methods'),
    (0, authentication_1.Public)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        session_access_1.SessionAccess])
], IdentityLoginMethodsController);
//# sourceMappingURL=login-methods.controller.js.map