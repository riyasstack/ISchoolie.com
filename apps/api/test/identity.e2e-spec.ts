import './test-safety';
import { Test } from '@nestjs/testing';
import { Controller, Get, type INestApplication } from '@nestjs/common';
import request from 'supertest';
import { randomUUID, createHash } from 'node:crypto';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { IdentityDelivery } from '../src/auth/identity.delivery';
import { digest } from '../src/auth/identity.util';
import { IdentityService } from '../src/auth/identity.service';
import { PostgresSessionStore } from '../src/auth/session.store';

@Controller('qa-protected')
class ProtectedFixtureController {
  @Get() protectedRoute() {
    return { authenticated: true };
  }
}

describe('PostgreSQL identity integration (owned fixtures only)', () => {
  let app: INestApplication;
  let db: PrismaService;
  const messages: { email: string; kind: string; token: string }[] = [];
  const prefix = `qa-${randomUUID()}`;
  const email = `${prefix}@example.invalid`;
  const password = 'Test-only long password 42!';
  let cookie: string;
  let csrf: string;
  const post = (path: string) =>
    request(app.getHttpServer())
      .post(`/auth/${path}`)
      .set('Origin', 'http://localhost:3000');
  beforeAll(async () => {
    if (!process.env.DATABASE_URL)
      throw new Error('DATABASE_URL required; use migrated local PostgreSQL');
    const module = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ProtectedFixtureController],
    })
      .overrideProvider(IdentityDelivery)
      .useValue({
        requireAvailable() {},
        async stageEmail(
          _tx: unknown,
          email: string,
          kind: string,
          token: string,
        ) {
          messages.push({ email, kind, token });
          return randomUUID();
        },
        async dispatch() {},
        kick() {},
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
      const users = await db.user.findMany({
        where: { email: { startsWith: prefix } },
        select: { id: true },
      });
      await db.identityAudit.deleteMany({
        where: { userId: { in: users.map((user) => user.id) } },
      });
      await db.user.deleteMany({
        where: { id: { in: users.map((user) => user.id) } },
      });
      await db.identityRateLimit.deleteMany({
        where: {
          key: {
            in: [
              `account:${digest(email)}`,
              `account:${digest(`reset:${prefix}`)}`,
              `account:${digest(`verify:${prefix}`)}`,
              `ip:${digest(prefix)}`,
            ],
          },
        },
      });
    }
    await app?.close();
  });
  it('fails closed for origin, unknown fields, providers and unauthenticated requests', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password, displayName: 'QA' })
      .expect(403);
    await post('register')
      .send({ email, password, displayName: 'QA', role: 'admin' })
      .expect(400);
    await request(app.getHttpServer()).get('/auth/me').expect(401);
    await request(app.getHttpServer()).get('/qa-protected').expect(401);
    const capabilities = await request(app.getHttpServer())
      .get('/auth/capabilities')
      .expect(200);
    expect(capabilities.body.providers.google).toBe('UNCONFIGURED');
  });
  it('registers a pending account and requires single-use email proof', async () => {
    await post('register')
      .send({
        email,
        password: `Unowned-${password}`,
        displayName: 'QA identity',
      })
      .expect(201);
    await post('login/email').send({ email, password }).expect(401);
    const message = messages.find(
      (value) => value.email === email && value.kind === 'EMAIL_VERIFY',
    )!;
    const row = await db.identityChallenge.findUniqueOrThrow({
      where: { tokenHash: digest(message.token) },
    });
    expect(row.tokenHash).not.toBe(message.token);
    const results = await Promise.all([
      post('verify-email').send({ token: message.token, password }),
      post('verify-email').send({ token: message.token, password }),
    ]);
    expect(
      results.map((result) => result.status).sort((a, b) => a - b),
    ).toEqual([201, 400]);
    expect(
      (await db.user.findUniqueOrThrow({ where: { emailCanonical: email } }))
        .emailVerifiedAt,
    ).toBeTruthy();
    await post('login/email')
      .send({ email, password: `Unowned-${password}` })
      .expect(401);
  });
  it('returns a safe cookie, restores identity, rejects CSRF and revokes sessions', async () => {
    const result = await post('login/email')
      .send({ email: email.toUpperCase(), password })
      .expect(201);
    expect(result.body.token).toBeUndefined();
    const setCookie = result.headers['set-cookie'][0];
    expect(setCookie).toContain('HttpOnly');
    expect(setCookie).toContain('SameSite=Lax');
    cookie = setCookie.split(';')[0];
    await request(app.getHttpServer())
      .get('/qa-protected')
      .set('Cookie', cookie)
      .expect(200);
    const me = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', cookie)
      .expect(200);
    expect(me.body.user.email).toBe(email);
    expect(me.body.permissions).toEqual([]);
    csrf = me.body.csrf;
    const previousCookie = cookie;
    const renewed = await post('refresh')
      .set('Cookie', cookie)
      .set('X-CSRF-Token', csrf)
      .send({})
      .expect(201);
    cookie = renewed.headers['set-cookie'][0].split(';')[0];
    expect(cookie).not.toBe(previousCookie);
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', previousCookie)
      .expect(401);
    const restored = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', cookie)
      .expect(200);
    expect(restored.body.session.expiresAt).toBe(me.body.session.expiresAt);
    csrf = restored.body.csrf;
    await post('logout').set('Cookie', cookie).expect(403);
    await post('logout')
      .set('Cookie', cookie)
      .set('X-CSRF-Token', csrf)
      .expect(201);
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', cookie)
      .expect(401);
  });
  it('resets once, revokes existing sessions, rejects old passwords and replay', async () => {
    const login = await post('login/email')
      .send({ email, password })
      .expect(201);
    cookie = login.headers['set-cookie'][0].split(';')[0];
    await post('recovery/email').send({ email }).expect(201);
    const message = messages.find((value) => value.kind === 'PASSWORD_RESET')!;
    const nextPassword = 'Another test-only password 53!';
    await post('recovery/reset')
      .send({ token: message.token, password: nextPassword })
      .expect(201);
    await post('recovery/reset')
      .send({ token: message.token, password: nextPassword })
      .expect(400);
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', cookie)
      .expect(401);
    await post('login/email').send({ email, password }).expect(401);
    await post('login/email')
      .send({ email, password: nextPassword })
      .expect(201);
  });
  it('limits concurrent attempts atomically', async () => {
    const key = `qa-limit:${prefix}`;
    const service = app.get(IdentityService);
    const results = await Promise.allSettled(
      Array.from({ length: 12 }, () => service.limit(prefix, key)),
    );
    expect(
      results.filter((value) => value.status === 'fulfilled'),
    ).toHaveLength(10);
    await db.identityRateLimit.deleteMany({
      where: {
        key: { in: [`ip:${digest(prefix)}`, `account:${digest(key)}`] },
      },
    });
  });
  it('session touches move forward and cannot resurrect a revoked session', async () => {
    const store = app.get(PostgresSessionStore);
    const user = await db.user.findUniqueOrThrow({
      where: { emailCanonical: email },
    });
    const id = createHash('sha256').update(randomUUID()).digest('base64url');
    const now = new Date();
    await store.createSession({
      id,
      userId: user.id,
      createdAt: now,
      lastActiveAt: now,
      expiresAt: new Date(Date.now() + 60_000),
      metadata: { authVersion: user.authVersion },
    });
    const future = new Date(now.getTime() + 1000);
    await Promise.all([
      store.touchSession(id, future),
      store.touchSession(id, new Date(now.getTime() - 1000)),
    ]);
    expect((await store.getSession(id))?.lastActiveAt).toEqual(future);
    const deleted = await Promise.all([
      store.deleteSession(id),
      store.deleteSession(id),
    ]);
    expect(deleted.filter(Boolean)).toHaveLength(1);
    await store.touchSession(id, future);
    expect(await store.getSession(id)).toBeUndefined();
  });
  it('suspension invalidates sessions and public payloads cannot select account kinds', async () => {
    const user = await db.user.findUniqueOrThrow({
      where: { emailCanonical: email },
    });
    const store = app.get(PostgresSessionStore);
    const id = createHash('sha256').update(randomUUID()).digest('base64url');
    const now = new Date();
    await store.createSession({
      id,
      userId: user.id,
      createdAt: now,
      lastActiveAt: now,
      expiresAt: new Date(Date.now() + 60_000),
      metadata: { authVersion: user.authVersion },
    });
    await db.user.update({
      where: { id: user.id },
      data: { status: 'SUSPENDED' },
    });
    expect(await store.getSession(id)).toBeUndefined();
    await post('register')
      .send({
        email,
        password,
        displayName: 'QA',
        accountKind: 'PLATFORM_OPERATOR',
      })
      .expect(400);
    await db.user.update({
      where: { id: user.id },
      data: { status: 'ACTIVE' },
    });
  });
  it('expired challenges cannot change passwords or become consumed', async () => {
    const user = await db.user.findUniqueOrThrow({
      where: { emailCanonical: email },
    });
    const raw = randomUUID();
    const challenge = await db.identityChallenge.create({
      data: {
        userId: user.id,
        kind: 'PASSWORD_RESET',
        tokenHash: digest(raw),
        expiresAt: new Date(Date.now() - 1000),
      },
    });
    await expect(
      app.get(IdentityService).reset(raw, 'Expired proof must fail 88!'),
    ).rejects.toThrow('Invalid or expired');
    expect(
      (
        await db.identityChallenge.findUniqueOrThrow({
          where: { id: challenge.id },
        })
      ).consumedAt,
    ).toBeNull();
  });
});
