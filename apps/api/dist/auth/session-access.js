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
exports.SessionAccess = void 0;
exports.trustedOrigins = trustedOrigins;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const node_crypto_1 = require("node:crypto");
const prisma_service_1 = require("../database/prisma.service");
const identity_util_1 = require("./identity.util");
function trustedOrigins() {
    return (process.env.AUTH_TRUSTED_ORIGINS ?? 'http://localhost:3000')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
}
let SessionAccess = class SessionAccess {
    sessions;
    mfa;
    db;
    constructor(sessions, mfa, db) {
        this.sessions = sessions;
        this.mfa = mfa;
        this.db = db;
    }
    native(req) {
        return req.headers['x-ischoolie-client'] === 'native';
    }
    raw(req) {
        if (this.native(req))
            return /^Bearer ([A-Za-z0-9_-]{43})$/.exec(req.headers.authorization ?? '')?.[1];
        if (req.headers.authorization)
            return undefined;
        return this.sessions.tokenFrom(req);
    }
    origin(req) {
        if (this.native(req)) {
            if (req.headers.origin || req.headers.cookie)
                throw new common_1.ForbiddenException('Invalid native transport');
            return;
        }
        if (!req.headers.origin || !trustedOrigins().includes(req.headers.origin))
            throw new common_1.ForbiddenException('Trusted origin required');
    }
    csrf(req) {
        this.origin(req);
        if (this.native(req))
            return;
        const actual = req.headers['x-csrf-token'];
        const expected = (0, identity_util_1.digest)(`csrf:${this.raw(req) ?? ''}`);
        if (typeof actual !== 'string' ||
            Buffer.byteLength(actual) !== Buffer.byteLength(expected) ||
            !(0, node_crypto_1.timingSafeEqual)(Buffer.from(actual), Buffer.from(expected)))
            throw new common_1.ForbiddenException('Session verification required');
    }
    async require(req, options = {}) {
        const session = await this.sessions.validate(this.raw(req));
        if (!session)
            throw new common_1.UnauthorizedException('Sign in required');
        const needsMfa = session.mfa === 'pending' ||
            ((await this.mfa.isEnrolled(session.userId)) &&
                session.mfa !== 'verified') ||
            ((await this.privileged(session.userId)) && session.mfa !== 'verified');
        if (needsMfa && !options.pending)
            throw new common_1.UnauthorizedException('Second factor required');
        if (options.fresh &&
            (session.mfa !== 'verified' ||
                typeof session.metadata?.verifiedAt !== 'number' ||
                session.metadata.verifiedAt < Date.now() - 10 * 60_000))
            throw new common_1.ForbiddenException('Recent second-factor verification required');
        return session;
    }
    async privileged(userId) {
        return (!!(await this.db.platformOperator.findFirst({
            where: { userId, active: true },
        })) ||
            !!(await this.db.institutionGrant.findFirst({
                where: { userId, active: true },
            })));
    }
    respond(req, res, issued, extra = {}) {
        res.setHeader('Cache-Control', 'no-store');
        if (this.native(req))
            return {
                ...extra,
                token: issued.token,
                expiresAt: issued.session.expiresAt,
                mfa: issued.session.mfa ?? 'none',
            };
        res.setHeader('Set-Cookie', issued.cookie);
        return { ...extra, mfa: issued.session.mfa ?? 'none' };
    }
    async issue(user, replacing) {
        const pending = (await this.mfa.isEnrolled(user.id)) || (await this.privileged(user.id));
        return this.sessions.create(user.id, {
            replacing,
            ...(pending ? { mfa: 'pending' } : {}),
            metadata: { authVersion: user.authVersion, authenticatedAt: Date.now() },
        });
    }
    async rotateVerified(session) {
        return this.sessions.rotate(session, {
            mfa: 'verified',
            metadata: { ...session.metadata, verifiedAt: Date.now() },
        });
    }
};
exports.SessionAccess = SessionAccess;
exports.SessionAccess = SessionAccess = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [authentication_1.SessionService,
        authentication_1.MfaService,
        prisma_service_1.PrismaService])
], SessionAccess);
//# sourceMappingURL=session-access.js.map