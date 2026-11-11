"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityModule = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("@nestjs/authentication");
const prisma_module_1 = require("../database/prisma.module");
const identity_controller_1 = require("./identity.controller");
const session_access_1 = require("./session-access");
const identity_service_1 = require("./identity.service");
const identity_delivery_1 = require("./identity.delivery");
const session_store_1 = require("./session.store");
const session_provider_1 = require("./session.provider");
const security_store_1 = require("./security.store");
const mfa_controller_1 = require("./mfa.controller");
const provisioning_controller_1 = require("./provisioning.controller");
const provisioning_service_1 = require("./provisioning.service");
const bootstrap_service_1 = require("./bootstrap.service");
const sessions_controller_1 = require("./sessions.controller");
const phone_controller_1 = require("./phone.controller");
const phone_service_1 = require("./phone.service");
const identity_proof_1 = require("./identity-proof");
const oidc_config_1 = require("./oidc.config");
const oidc_controller_1 = require("./oidc.controller");
const oidc_resolver_1 = require("./oidc.resolver");
const native_broker_service_1 = require("./native-broker.service");
const mail_1 = require("@nestjs/mail");
const delivery_config_1 = require("./delivery.config");
const login_methods_controller_1 = require("./login-methods.controller");
let IdentityModule = class IdentityModule {
};
exports.IdentityModule = IdentityModule;
exports.IdentityModule = IdentityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            mail_1.MailModule.forRootAsync({ useFactory: delivery_config_1.identityMailOptions }),
            authentication_1.AuthenticationModule.forRootAsync({
                useFactory: () => {
                    const keys = (process.env.AUTH_MFA_KEYS ??
                        process.env.AUTH_MFA_KEY ??
                        '')
                        .split(',')
                        .map((key) => key.trim())
                        .filter(Boolean);
                    if (!keys.length || keys.some((key) => key.length < 32))
                        throw new Error('AUTH_MFA_KEY or AUTH_MFA_KEYS is required; run the local-secret setup for development');
                    return {
                        allowInMemoryStorage: false,
                        oidc: {
                            providers: (0, oidc_config_1.oidcProviders)(),
                            callbackUrl: `${process.env.AUTH_OIDC_CALLBACK_ORIGIN ?? 'http://localhost:3000'}/api/auth/oidc/:provider/callback`,
                            redirectAfterLogin: '/auth/sign-in',
                            cookie: {
                                secure: process.env.NODE_ENV === 'production',
                                path: '/',
                            },
                        },
                        mfa: {
                            encryption: { keys },
                            issuer: 'iSchoolie',
                            window: 1,
                            maxAttempts: 5,
                            lockoutWindow: '15m',
                            pendingTtl: '10m',
                            recoveryCodes: 10,
                        },
                        session: {
                            cookieName: process.env.NODE_ENV === 'production'
                                ? '__Host-ischoolie'
                                : 'ischoolie-dev',
                            absoluteTtl: '7d',
                            idleTtl: '30m',
                            cookie: {
                                secure: process.env.NODE_ENV === 'production',
                                sameSite: 'lax',
                                path: '/',
                            },
                            trustedOrigins: (0, session_access_1.trustedOrigins)(),
                        },
                    };
                },
            }),
        ],
        controllers: [
            identity_controller_1.IdentityController,
            mfa_controller_1.IdentityMfaController,
            provisioning_controller_1.ProvisioningController,
            sessions_controller_1.IdentitySessionsController,
            phone_controller_1.IdentityPhoneController,
            oidc_controller_1.IdentityOidcController,
            login_methods_controller_1.IdentityLoginMethodsController,
        ],
        providers: [
            identity_service_1.IdentityService,
            identity_delivery_1.IdentityDelivery,
            session_store_1.PostgresSessionStore,
            session_provider_1.IdentitySessionProvider,
            security_store_1.IdentitySecurityStore,
            session_access_1.SessionAccess,
            provisioning_service_1.ProvisioningService,
            bootstrap_service_1.IdentityBootstrap,
            phone_service_1.IdentityPhoneService,
            identity_proof_1.IdentityProof,
            oidc_resolver_1.IdentityOidcResolver,
            native_broker_service_1.NativeBrokerService,
        ],
    })
], IdentityModule);
//# sourceMappingURL=identity.module.js.map