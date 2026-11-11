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
exports.IdentityPhoneController = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const session_access_1 = require("./session-access");
const phone_service_1 = require("./phone.service");
const identity_util_1 = require("./identity.util");
const identity_service_1 = require("./identity.service");
let IdentityPhoneController = class IdentityPhoneController {
    phone;
    access;
    identity;
    mfa;
    constructor(phone, access, identity, mfa) {
        this.phone = phone;
        this.access = access;
        this.identity = identity;
        this.mfa = mfa;
    }
    async start(input, req) {
        this.access.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, [
            'phone',
            'kind',
            'password',
            'displayName',
        ]);
        const phone = (0, identity_util_1.canonicalPhone)((0, identity_util_1.text)(body, 'phone', 30));
        await this.identity.limit(req.ip ?? '', `phone:${phone}`);
        const kind = (0, identity_util_1.text)(body, 'kind', 12);
        const name = kind === 'REGISTER' ? (0, identity_util_1.text)(body, 'displayName', 100) : undefined;
        return this.phone.start(phone, kind, body.password, name);
    }
    async confirm(input, req) {
        this.access.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['challengeId', 'code', 'password']);
        await this.identity.limit(req.ip ?? '', `phone-confirm:${req.ip}`);
        const id = (0, identity_util_1.text)(body, 'challengeId', 36);
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))
            throw new common_1.BadRequestException('Invalid challenge identifier');
        return this.phone.confirm(id, (0, identity_util_1.text)(body, 'code', 6), body.password);
    }
    async login(input, req, res) {
        this.access.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['phone', 'password']);
        const phone = (0, identity_util_1.canonicalPhone)((0, identity_util_1.text)(body, 'phone', 30));
        await this.identity.limit(req.ip ?? '', `phone:${phone}`);
        return this.access.respond(req, res, await this.phone.login(phone, body.password, this.access.raw(req)), { message: 'Signed in' });
    }
    async change(input, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req);
        if (await this.mfa.isEnrolled(actor.userId))
            await this.access.require(req, { fresh: true });
        const body = (0, identity_util_1.bodyFields)(input, ['phone', 'password']);
        await this.identity.limit(req.ip ?? '', `phone-change:${actor.userId}`);
        return this.phone.change(actor, (0, identity_util_1.text)(body, 'phone', 30), body.password);
    }
    async confirmChange(input, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req);
        if (await this.mfa.isEnrolled(actor.userId))
            await this.access.require(req, { fresh: true });
        const body = (0, identity_util_1.bodyFields)(input, ['challengeId', 'code']);
        await this.identity.limit(req.ip ?? '', `phone-change:${actor.userId}`);
        return this.phone.confirm((0, identity_util_1.text)(body, 'challengeId', 36), (0, identity_util_1.text)(body, 'code', 6), undefined, actor);
    }
    async link(input, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req, { fresh: true });
        const body = (0, identity_util_1.bodyFields)(input, ['phone', 'password']);
        await this.identity.limit(req.ip ?? '', `phone-link:${actor.userId}`);
        return this.phone.link(actor, (0, identity_util_1.text)(body, 'phone', 30), body.password);
    }
    async confirmLink(input, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req, { fresh: true });
        const body = (0, identity_util_1.bodyFields)(input, ['challengeId', 'code', 'password']);
        await this.identity.limit(req.ip ?? '', `phone-link:${actor.userId}`);
        return this.phone.confirm((0, identity_util_1.text)(body, 'challengeId', 36), (0, identity_util_1.text)(body, 'code', 6), body.password, actor);
    }
    async mobile(input, req, res) {
        this.access.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['phone', 'password']);
        const phone = (0, identity_util_1.canonicalPhone)((0, identity_util_1.text)(body, 'phone', 30));
        await this.identity.limit(req.ip ?? '', `phone:${phone}`);
        return this.access.respond(req, res, await this.phone.login(phone, body.password, this.access.raw(req), false), { message: 'Signed in with the verified mobile credential' });
    }
};
exports.IdentityPhoneController = IdentityPhoneController;
__decorate([
    (0, common_1.Post)('phone/start'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityPhoneController.prototype, "start", null);
__decorate([
    (0, common_1.Post)('phone/confirm'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityPhoneController.prototype, "confirm", null);
__decorate([
    (0, common_1.Post)('login/parent'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityPhoneController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('phone/change/start'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityPhoneController.prototype, "change", null);
__decorate([
    (0, common_1.Post)('phone/change/confirm'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityPhoneController.prototype, "confirmChange", null);
__decorate([
    (0, common_1.Post)('phone/link/start'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityPhoneController.prototype, "link", null);
__decorate([
    (0, common_1.Post)('phone/link/confirm'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityPhoneController.prototype, "confirmLink", null);
__decorate([
    (0, common_1.Post)('login/mobile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityPhoneController.prototype, "mobile", null);
exports.IdentityPhoneController = IdentityPhoneController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, authentication_1.Public)(),
    __metadata("design:paramtypes", [phone_service_1.IdentityPhoneService,
        session_access_1.SessionAccess,
        identity_service_1.IdentityService,
        authentication_1.MfaService])
], IdentityPhoneController);
//# sourceMappingURL=phone.controller.js.map