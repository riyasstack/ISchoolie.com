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
exports.ProvisioningController = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const session_access_1 = require("./session-access");
const provisioning_service_1 = require("./provisioning.service");
const identity_util_1 = require("./identity.util");
const identity_service_1 = require("./identity.service");
const uuid = (value) => {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value))
        throw new common_1.BadRequestException('Invalid identifier');
    return value;
};
let ProvisioningController = class ProvisioningController {
    provisioning;
    access;
    identity;
    constructor(provisioning, access, identity) {
        this.provisioning = provisioning;
        this.access = access;
        this.identity = identity;
    }
    async login(input, req, res) {
        this.access.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, [
            'institutionCode',
            'kind',
            'identifier',
            'password',
        ]);
        const institution = (0, identity_util_1.text)(body, 'institutionCode', 64);
        const identifier = (0, identity_util_1.text)(body, 'identifier', 64);
        const kind = (0, identity_util_1.text)(body, 'kind', 10);
        await this.identity.limit(req.ip ?? '', `${institution}:${kind}:${identifier}`.normalize('NFKC').toUpperCase());
        const issued = await this.provisioning.login(institution, kind, identifier, body.password, this.access.raw(req));
        return this.access.respond(req, res, issued, {
            message: issued.session.mfa === 'pending'
                ? 'Second factor required'
                : 'Signed in',
        });
    }
    async activate(input, req) {
        this.access.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['token', 'password']);
        await this.identity.limit(req.ip ?? '', `institution-activate:${req.ip}`);
        return this.provisioning.activate((0, identity_util_1.text)(body, 'token', 128), body.password);
    }
    async recovery(input, req) {
        this.access.origin(req);
        const body = (0, identity_util_1.bodyFields)(input, ['institutionCode', 'identifier']);
        const institution = (0, identity_util_1.text)(body, 'institutionCode', 64);
        const identifier = (0, identity_util_1.text)(body, 'identifier', 64);
        await this.identity.limit(req.ip ?? '', `institution-recovery:${institution}:${identifier}`.toUpperCase());
        return this.provisioning.requestRecovery(institution, identifier);
    }
    async claim(input, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req, { fresh: true });
        const body = (0, identity_util_1.bodyFields)(input, ['token']);
        return this.provisioning.claim(actor, (0, identity_util_1.text)(body, 'token', 128));
    }
    async provision(institutionId, input, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req, { fresh: true });
        return this.provisioning.provision(actor, uuid(institutionId), input);
    }
    async list(institutionId, req) {
        const actor = await this.access.require(req, { fresh: true });
        return this.provisioning.list(actor, uuid(institutionId));
    }
    async preview(institutionId, input, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req, { fresh: true });
        const body = (0, identity_util_1.bodyFields)(input, ['rows']);
        return this.provisioning.preview(actor, uuid(institutionId), body.rows);
    }
    async commit(institutionId, importId, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req, { fresh: true });
        return this.provisioning.commit(actor, uuid(institutionId), uuid(importId));
    }
    async invite(institutionId, identityId, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req, { fresh: true });
        return this.provisioning.invite(actor, uuid(institutionId), uuid(identityId));
    }
    async revoke(institutionId, identityId, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req, { fresh: true });
        return this.provisioning.revoke(actor, uuid(institutionId), uuid(identityId));
    }
    async managedRecovery(institutionId, identityId, req) {
        this.access.csrf(req);
        const actor = await this.access.require(req, { fresh: true });
        return this.provisioning.recover(actor, uuid(institutionId), uuid(identityId));
    }
};
exports.ProvisioningController = ProvisioningController;
__decorate([
    (0, common_1.Post)('login/institution'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProvisioningController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('activate/institution'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProvisioningController.prototype, "activate", null);
__decorate([
    (0, common_1.Post)('recovery/institution'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProvisioningController.prototype, "recovery", null);
__decorate([
    (0, common_1.Post)('identities/claim'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProvisioningController.prototype, "claim", null);
__decorate([
    (0, common_1.Post)('institutions/:institutionId/credentials'),
    __param(0, (0, common_1.Param)('institutionId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProvisioningController.prototype, "provision", null);
__decorate([
    (0, common_1.Get)('institutions/:institutionId/credentials'),
    __param(0, (0, common_1.Param)('institutionId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProvisioningController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('institutions/:institutionId/imports/preview'),
    __param(0, (0, common_1.Param)('institutionId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProvisioningController.prototype, "preview", null);
__decorate([
    (0, common_1.Post)('institutions/:institutionId/imports/:importId/commit'),
    __param(0, (0, common_1.Param)('institutionId')),
    __param(1, (0, common_1.Param)('importId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProvisioningController.prototype, "commit", null);
__decorate([
    (0, common_1.Post)('institutions/:institutionId/credentials/:identityId/invite'),
    __param(0, (0, common_1.Param)('institutionId')),
    __param(1, (0, common_1.Param)('identityId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProvisioningController.prototype, "invite", null);
__decorate([
    (0, common_1.Post)('institutions/:institutionId/credentials/:identityId/revoke'),
    __param(0, (0, common_1.Param)('institutionId')),
    __param(1, (0, common_1.Param)('identityId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProvisioningController.prototype, "revoke", null);
__decorate([
    (0, common_1.Post)('institutions/:institutionId/credentials/:identityId/recovery'),
    __param(0, (0, common_1.Param)('institutionId')),
    __param(1, (0, common_1.Param)('identityId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProvisioningController.prototype, "managedRecovery", null);
exports.ProvisioningController = ProvisioningController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, authentication_1.Public)(),
    __metadata("design:paramtypes", [provisioning_service_1.ProvisioningService,
        session_access_1.SessionAccess,
        identity_service_1.IdentityService])
], ProvisioningController);
//# sourceMappingURL=provisioning.controller.js.map