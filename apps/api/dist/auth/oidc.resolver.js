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
exports.IdentityOidcResolver = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const prisma_service_1 = require("../database/prisma.service");
const session_access_1 = require("./session-access");
const identity_proof_1 = require("./identity-proof");
const identity_util_1 = require("./identity.util");
let IdentityOidcResolver = class IdentityOidcResolver extends authentication_1.OidcAccountResolver {
    db;
    access;
    proof;
    mfa;
    constructor(db, access, proof, mfa, registry) {
        super();
        this.db = db;
        this.access = access;
        this.proof = proof;
        this.mfa = mfa;
        registry.registerHandler('oidc', this);
    }
    async resolveUser(profile, _tokens, context) {
        if (!['google', 'github', 'apple'].includes(profile.provider) ||
            !profile.subject ||
            profile.subject.length > 255)
            throw new common_1.ForbiddenException('Provider identity refused');
        const linkTo = context.linkTo ??
            (this.proof.nativeActor
                ? { id: this.proof.nativeActor.userId }
                : undefined);
        if (linkTo) {
            if (!this.proof.request)
                throw new common_1.ForbiddenException('Linking requires a verified browser session');
            const actor = this.proof.nativeActor ??
                (await this.access.require(this.proof.request, { fresh: true }));
            if (actor.userId !== linkTo.id)
                throw new common_1.ForbiddenException('Linking account changed');
            try {
                const linkedUser = await this.db.$transaction(async (tx) => {
                    await tx.$queryRaw `SELECT id FROM "User" WHERE id = ${actor.userId}::uuid FOR UPDATE`;
                    const current = await tx.identitySession.findFirst({
                        where: {
                            id: actor.id,
                            userId: actor.userId,
                            mfa: 'verified',
                            user: {
                                status: 'ACTIVE',
                                authVersion: Number(actor.metadata?.authVersion),
                            },
                        },
                    });
                    if (!current)
                        throw new common_1.ForbiddenException('Linking session expired');
                    const existing = await tx.providerIdentity.findUnique({
                        where: {
                            provider_subject: {
                                provider: profile.provider,
                                subject: profile.subject,
                            },
                        },
                    });
                    if (existing && existing.userId !== actor.userId)
                        throw new common_1.ForbiddenException('Provider already belongs to another identity');
                    if (!existing)
                        await tx.providerIdentity.create({
                            data: {
                                userId: actor.userId,
                                provider: profile.provider,
                                subject: profile.subject,
                            },
                        });
                    await tx.identityAudit.create({
                        data: { userId: actor.userId, type: 'PROVIDER_LINKED' },
                    });
                    const updated = await tx.user.update({
                        where: { id: actor.userId },
                        data: { authVersion: { increment: 1 } },
                    });
                    await tx.identitySession.deleteMany({
                        where: { userId: actor.userId },
                    });
                    return updated;
                });
                this.proof.prove(linkedUser);
            }
            catch (error) {
                if (error.code === 'P2002')
                    throw new common_1.BadRequestException('This provider slot is already linked');
                throw error;
            }
            return { id: actor.userId };
        }
        const existing = await this.db.providerIdentity.findUnique({
            where: {
                provider_subject: {
                    provider: profile.provider,
                    subject: profile.subject,
                },
            },
            include: { user: true },
        });
        if (existing) {
            if (existing.user.status !== 'ACTIVE')
                return null;
            if ((await this.access.privileged(existing.userId)) &&
                !(await this.mfa.isEnrolled(existing.userId)))
                return null;
            this.proof.prove(existing.user);
            return { id: existing.userId };
        }
        const email = profile.emailVerified && profile.email
            ? (0, identity_util_1.canonicalEmail)(profile.email)
            : undefined;
        if (email &&
            (await this.db.user.findFirst({
                where: {
                    OR: [
                        { emailCanonical: email },
                        { email: { equals: email, mode: 'insensitive' } },
                    ],
                },
            })))
            throw new common_1.ForbiddenException('Sign in to the existing account and explicitly link this provider');
        try {
            const user = await this.db.user.create({
                data: {
                    email,
                    emailCanonical: email,
                    emailVerifiedAt: email ? new Date() : undefined,
                    displayName: profile.name?.slice(0, 100) ?? null,
                    status: 'ACTIVE',
                    accountKind: 'PUBLIC',
                    providers: {
                        create: { provider: profile.provider, subject: profile.subject },
                    },
                },
            });
            this.proof.prove(user);
            return { id: user.id };
        }
        catch (error) {
            if (error.code === 'P2002')
                throw new common_1.ForbiddenException('Identity conflict. Sign in and link explicitly.');
            throw error;
        }
    }
};
exports.IdentityOidcResolver = IdentityOidcResolver;
exports.IdentityOidcResolver = IdentityOidcResolver = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        session_access_1.SessionAccess,
        identity_proof_1.IdentityProof,
        authentication_1.MfaService,
        authentication_1.AuthenticationRegistry])
], IdentityOidcResolver);
//# sourceMappingURL=oidc.resolver.js.map