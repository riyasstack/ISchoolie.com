import {
  google,
  github,
  type OidcProviderConfig,
} from '@nestjs/authentication';
export function oidcProviders(): Record<string, OidcProviderConfig> {
  const providers: Record<string, OidcProviderConfig> = {};
  if (
    process.env.AUTH_GOOGLE_CLIENT_ID &&
    process.env.AUTH_GOOGLE_CLIENT_SECRET
  )
    providers.google = google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    });
  if (
    process.env.AUTH_GITHUB_CLIENT_ID &&
    process.env.AUTH_GITHUB_CLIENT_SECRET
  )
    providers.github = github({
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
