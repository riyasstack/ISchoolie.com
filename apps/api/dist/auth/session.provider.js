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
exports.IdentitySessionProvider = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const prisma_service_1 = require("../database/prisma.service");
const session_access_1 = require("./session-access");
let IdentitySessionProvider = class IdentitySessionProvider extends authentication_1.AuthenticationProvider {
    db;
    access;
    mfa;
    constructor(db, access, mfa, registry) {
        super();
        this.db = db;
        this.access = access;
        this.mfa = mfa;
        registry.registerProvider(this);
    }
    async authenticate(context) {
        if (context.getType() !== 'http')
            return null;
        const req = context.switchToHttp().getRequest();
        if (!this.access.raw(req))
            return null;
        if (this.access.native(req))
            this.access.origin(req);
        const session = await this.access.require(req, { pending: true });
        const user = await this.db.user.findFirst({
            where: {
                id: session.userId,
                status: 'ACTIVE',
                authVersion: Number(session.metadata?.authVersion),
            },
            select: { id: true, email: true, displayName: true },
        });
        if (!user)
            return null;
        const required = (await this.mfa.isEnrolled(user.id)) ||
            (await this.access.privileged(user.id));
        return {
            user,
            session,
            mfa: required && session.mfa !== 'verified'
                ? 'pending'
                : session.mfa,
        };
    }
};
exports.IdentitySessionProvider = IdentitySessionProvider;
exports.IdentitySessionProvider = IdentitySessionProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        session_access_1.SessionAccess,
        authentication_1.MfaService,
        authentication_1.AuthenticationRegistry])
], IdentitySessionProvider);
//# sourceMappingURL=session.provider.js.map