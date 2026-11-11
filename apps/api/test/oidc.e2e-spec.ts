import './test-safety';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { AUTHENTICATION_MODULE_OPTIONS } from '@nestjs/authentication';
import { createHash, generateKeyPairSync, randomUUID, sign } from 'node:crypto';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { digest } from '../src/auth/identity.util';

describe('OIDC adapter with isolated signed test issuer (not live Google)', () => {
  let app: INestApplication;
  let db: PrismaService;
  let nonce = '';
  let challenge = '';
  let badNonce = false;
  let badSignature = false;
  const prefix = `oidc-${randomUUID()}`;
  const issuer = 'https://issuer.example.invalid';
  const keys = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const jwk = {
    ...keys.publicKey.export({ format: 'jwk' }),
    kid: 'qa-key',
    alg: 'RS256',
    use: 'sig',
  };
  const users: string[] = [];
  const states: string[] = [];
  let exchanges = 0;
  const fakeFetch: typeof fetch = async (input, options) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.href
          : input.url;
    if (url.endsWith('/.well-known/openid-configuration'))
      return Response.json({
        issuer,
        authorization_endpoint: `${issuer}/authorize`,
        token_endpoint: `${issuer}/token`,
        jwks_uri: `${issuer}/jwks`,
        userinfo_endpoint: `${issuer}/userinfo`,
      });
    if (url.endsWith('/jwks')) return Response.json({ keys: [jwk] });
    if (url.endsWith('/userinfo'))
      return Response.json({
        sub: prefix,
        email: `${prefix}@example.invalid`,
        email_verified: true,
        name: 'OIDC QA',
      });
    if (url.endsWith('/token')) {
      exchanges++;
      const body = options?.body;
      if (typeof body !== 'string' && !(body instanceof URLSearchParams))
        throw new Error('Expected form encoded token exchange');
      const parameters = new URLSearchParams(body);
      const verifier = parameters.get('code_verifier')!;
      expect(createHash('sha256').update(verifier).digest('base64url')).toBe(
        challenge,
      );
      const header = Buffer.from(
        JSON.stringify({ alg: 'RS256', kid: 'qa-key' }),
      ).toString('base64url');
      const payload = Buffer.from(
        JSON.stringify({
          iss: issuer,
          aud: 'qa-client',
          sub: prefix,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 300,
          nonce: badNonce ? 'wrong-nonce' : nonce,
        }),
      ).toString('base64url');
      const signature = badSignature
        ? 'invalid'
        : sign(
            'RSA-SHA256',
            Buffer.from(`${header}.${payload}`),
            keys.privateKey,
          ).toString('base64url');
      return Response.json({
        access_token: 'test-access-token',
        token_type: 'Bearer',
        id_token: `${header}.${payload}.${signature}`,
      });
    }
    throw new Error('Unexpected external request in isolated issuer test');
  };
  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(AUTHENTICATION_MODULE_OPTIONS)
      .useValue({
        allowInMemoryStorage: false,
        mfa: { encryption: { keys: [process.env.AUTH_MFA_KEY!] } },
        session: {
          cookieName: 'ischoolie-dev',
          cookie: { secure: false, sameSite: 'lax', path: '/' },
          trustedOrigins: ['http://localhost:3000'],
        },
        oidc: {
          callbackUrl: 'http://localhost:3000/api/auth/oidc/:provider/callback',
          providers: {
            google: {
              issuer,
              clientId: 'qa-client',
              clientSecret: 'test-only-not-real',
            },
          },
          cookie: { secure: false, path: '/' },
          fetch: fakeFetch,
        },
      })
      .compile();
    app = module.createNestApplication();
    app.use((req: object, _res: object, next: () => void) => {
      Object.defineProperty(req, 'ip', { value: prefix });
      next();
    });
    await app.init();
    db = app.get(PrismaService);
  });
  afterAll(async () => {
    if (db) {
      const owned = await db.providerIdentity.findMany({
        where: { subject: prefix },
        select: { userId: true },
      });
      users.push(...owned.map((value) => value.userId));
      await db.providerIdentity.deleteMany({
        where: { userId: { in: users } },
      });
      await db.identityAudit.deleteMany({ where: { userId: { in: users } } });
      await db.user.deleteMany({ where: { id: { in: users } } });
      await db.identityOidcState.deleteMany({
        where: { state: { in: states } },
      });
      await db.identityRateLimit.deleteMany({
        where: {
          key: {
            in: [`ip:${digest(prefix)}`, `account:${digest(`oidc:${prefix}`)}`],
          },
        },
      });
    }
    await app?.close();
  });
  async function begin() {
    const start = await request(app.getHttpServer())
      .post('/auth/oidc/google/start')
      .set('Origin', 'http://localhost:3000')
      .send({})
      .expect(201);
    const url = new URL(start.body.url);
    nonce = url.searchParams.get('nonce')!;
    challenge = url.searchParams.get('code_challenge')!;
    expect(url.searchParams.get('code_challenge_method')).toBe('S256');
    const state = url.searchParams.get('state')!;
    states.push(state);
    return { state, cookie: start.headers['set-cookie'][0].split(';')[0] };
  }
  it('binds state to the browser, uses PKCE, verifies a signed identity and creates a shared session', async () => {
    const transaction = await begin();
    await request(app.getHttpServer())
      .get('/auth/oidc/google/callback')
      .query({ state: transaction.state, code: 'test-code' })
      .expect(303)
      .expect('Location', '/auth/sign-in?auth_error=provider');
    expect(exchanges).toBe(0);
    const callback = await request(app.getHttpServer())
      .get('/auth/oidc/google/callback')
      .set('Cookie', transaction.cookie)
      .query({ state: transaction.state, code: 'test-code' })
      .expect(303)
      .expect('Location', '/auth/sign-in');
    const cookie = callback.headers['set-cookie'].find((value: string) =>
      value.startsWith('ischoolie-dev='),
    );
    expect(cookie).toBeTruthy();
    const me = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', cookie.split(';')[0])
      .expect(200);
    expect(me.body.user.email).toBe(`${prefix}@example.invalid`);
    users.push(me.body.user.id);
    await request(app.getHttpServer())
      .get('/auth/oidc/google/callback')
      .set('Cookie', transaction.cookie)
      .query({ state: transaction.state, code: 'test-code' })
      .expect('Location', '/auth/sign-in?auth_error=provider');
    expect(exchanges).toBe(1);
  });
  it('rejects nonce mismatch and invalid signatures before resolving an account', async () => {
    badNonce = true;
    let transaction = await begin();
    await request(app.getHttpServer())
      .get('/auth/oidc/google/callback')
      .set('Cookie', transaction.cookie)
      .query({ state: transaction.state, code: 'bad-nonce' })
      .expect('Location', '/auth/sign-in?auth_error=provider');
    badNonce = false;
    badSignature = true;
    transaction = await begin();
    await request(app.getHttpServer())
      .get('/auth/oidc/google/callback')
      .set('Cookie', transaction.cookie)
      .query({ state: transaction.state, code: 'bad-signature' })
      .expect('Location', '/auth/sign-in?auth_error=provider');
    expect(
      await db.providerIdentity.count({ where: { subject: prefix } }),
    ).toBe(1);
  });
});
