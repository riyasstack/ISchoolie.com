"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oidcProviders = oidcProviders;
const authentication_1 = require("@nestjs/authentication");
function oidcProviders() {
    const providers = {};
    if (process.env.AUTH_GOOGLE_CLIENT_ID &&
        process.env.AUTH_GOOGLE_CLIENT_SECRET)
        providers.google = (0, authentication_1.google)({
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
        });
    if (process.env.AUTH_GITHUB_CLIENT_ID &&
        process.env.AUTH_GITHUB_CLIENT_SECRET)
        providers.github = (0, authentication_1.github)({
            clientId: process.env.AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
        });
    if (process.env.AUTH_APPLE_CLIENT_ID && process.env.AUTH_APPLE_CLIENT_SECRET)
        providers.apple = {
            issuer: 'https://appleid.apple.com',
            clientId: process.env.AUTH_APPLE_CLIENT_ID,
            clientSecret: process.env.AUTH_APPLE_CLIENT_SECRET,
            scopes: ['openid'],
            tokenEndpointAuthMethod: 'client_secret_post',
            authorizationParams: { response_mode: 'query' },
            idTokenAlgorithms: ['RS256'],
        };
    return providers;
}
//# sourceMappingURL=oidc.config.js.map