import { github } from '@nestjs/authentication';
import { oidcProviders } from './oidc.config';
describe('provider configuration boundaries', () => {
  it('leaves providers unavailable without complete server-side credentials', () => {
    const names = [
      'AUTH_GOOGLE_CLIENT_ID',
      'AUTH_GOOGLE_CLIENT_SECRET',
      'AUTH_GITHUB_CLIENT_ID',
      'AUTH_GITHUB_CLIENT_SECRET',
      'AUTH_APPLE_CLIENT_ID',
      'AUTH_APPLE_CLIENT_SECRET',
    ];
    const old = new Map(names.map((name) => [name, process.env[name]]));
    try {
      for (const name of names) delete process.env[name];
      process.env.AUTH_GOOGLE_CLIENT_ID = 'test-only';
      expect(oidcProviders()).toEqual({});
      process.env.AUTH_APPLE_CLIENT_ID = 'test-service';
      process.env.AUTH_APPLE_CLIENT_SECRET =
        'test-signed-assertion-placeholder';
      const apple = oidcProviders().apple;
      expect(apple.issuer).toBe('https://appleid.apple.com');
      expect(apple.scopes).toEqual(['openid']);
      expect(apple.authorizationParams?.response_mode).toBe('query');
    } finally {
      for (const [name, value] of old) {
        if (value === undefined) delete process.env[name];
        else process.env[name] = value;
      }
    }
  });
  it('uses stable GitHub subject and only a primary verified email, without repository scope', async () => {
    const config = github({
      clientId: 'test-client',
      clientSecret: 'test-secret',
    });
    const profile = await config.profile!(
      { id: 42, login: 'qa', email: 'untrusted@example.invalid' },
      {
        provider: 'github',
        tokens: { accessToken: 'test-token' },
        fetchJson: async () => [
          {
            email: 'untrusted@example.invalid',
            primary: true,
            verified: false,
          },
          { email: 'verified@example.invalid', primary: true, verified: true },
        ],
      },
    );
    expect(profile.subject).toBe('42');
    expect(profile.email).toBe('verified@example.invalid');
    expect(profile.emailVerified).toBe(true);
    expect(config.scopes).not.toContain('repo');
  });
});
