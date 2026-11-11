"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityProof = void 0;
const common_1 = require("@nestjs/common");
const node_async_hooks_1 = require("node:async_hooks");
let IdentityProof = class IdentityProof {
    storage = new node_async_hooks_1.AsyncLocalStorage();
    run(request, action, nativeActor) {
        return this.storage.run({ request, nativeActor }, action);
    }
    get request() {
        return this.storage.getStore()?.request;
    }
    get nativeActor() {
        return this.storage.getStore()?.nativeActor;
    }
    prove(user) {
        const state = this.storage.getStore();
        if (!state)
            throw new Error('Verified callback context required');
        state.user = { id: user.id, authVersion: user.authVersion };
    }
    version(userId) {
        const user = this.storage.getStore()?.user;
        return user?.id === userId ? user.authVersion : undefined;
    }
};
exports.IdentityProof = IdentityProof;
exports.IdentityProof = IdentityProof = __decorate([
    (0, common_1.Injectable)()
], IdentityProof);
//# sourceMappingURL=identity-proof.js.map