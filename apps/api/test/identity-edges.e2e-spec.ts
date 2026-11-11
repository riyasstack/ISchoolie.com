import './test-safety';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import {
  SessionService,
  type SessionRecord,
  type OidcProfile,
} from '@nestjs/authentication';
import type { Request } from 'express';
import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { IdentityOidcResolver } from '../src/auth/oidc.resolver';
import { IdentityProof } from '../src/auth/identity-proof';
import { IdentitySecurityStore } from '../src/auth/security.store';
import { NativeBrokerService } from '../src/auth/native-broker.service';
import { digest } from '../src/auth/identity.util';
import { SessionAccess } from '../src/auth/session-access';
import { IdentityDelivery } from '../src/auth/identity.delivery';
import { IdentityService } from '../src/auth/identity.service';

describe('Identity linking and native handoff boundaries (owned DB fixtures)', () => {
  let app: INestApplication;
  let db: PrismaService;
  let userId: string;
  let providerOnly: string;
  let actor: SessionRecord;
  let actorToken: string;
  const prefix = `edge-${randomUUID()}`;
  const brokerIds: string[] = [];
  const phoneProofs: { id: string; code: string }[] = [];
  const profile = (subject: string, email?: string): OidcProfile => ({
    provider: 'google',
    subject,
    email,
    emailVerified: !!email,
    claims: {},
  });
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IdentityDelivery)
      .useValue({
        requireSms() {},
        async stageSms(
          _tx: unknown,
          _phone: string,
          _kind: string,
          code: string,
          id: string,
        ) {
          phoneProofs.push({ id, code });
          return randomUUID();
        },
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
    userId = (
      await db.user.create({
        data: {
          email: `${prefix}@example.invalid`,
          emailCanonical: `${prefix}@example.invalid`,
          emailVerifiedAt: new Date(),
          status: 'ACTIVE',
          accountKind: 'PUBLIC',
        },
      })
    ).id;
    providerOnly = (
      await db.user.create({
        data: {
          status: 'ACTIVE',
          accountKind: 'PUBLIC',
          providers: {
            create: { provider: 'github', subject: `${prefix}-only` },
          },
        },
      })
    ).id;
    const issued = await app.get(SessionService).create(userId, {
      mfa: 'verified',
      metadata: {
        authVersion: 0,
        authenticatedAt: Date.now(),
        verifiedAt: Date.now(),
      },
    });
    actor = issued.session;
    actorToken = issued.token;
  });
  afterAll(async () => {
    if (db) {
      const ids = [userId, providerOnly].filter(Boolean);
      await db.identityNativeBroker.deleteMany({
        where: { id: { in: brokerIds } },
      });
      await db.providerIdentity.deleteMany({ where: { userId: { in: ids } } });
      await db.phoneIdentity.deleteMany({ where: { userId: { in: ids } } });
      await db.identityPhoneChallenge.deleteMany({
        where: { userId: { in: ids } },
      });
      await db.identityRateLimit.deleteMany({
        where: {
          key: {
            in: [
              `ip:${digest(prefix)}`,
              `account:${digest(`phone-link:${userId}`)}`,
              `account:${digest('phone:+12025550125')}`,
            ],
          },
        },
      });
      await db.identityAudit.deleteMany({ where: { userId: { in: ids } } });
      await db.user.deleteMany({ where: { id: { in: ids } } });
    }
    await app?.close();
  });
  it('refuses matching-email auto-merge even when a provider claims it is verified', async () => {
    const proof = app.get(IdentityProof);
    const resolver = app.get(IdentityOidcResolver);
    await expect(
      proof.run({ headers: {} } as Request, () =>
        resolver.resolveUser(
          profile(`${prefix}-conflict`, `${prefix}@example.invalid`),
          { accessToken: 'test-only' },
          {},
        ),
      ),
    ).rejects.toThrow('explicitly link');
    expect(
      await db.providerIdentity.count({
        where: { provider: 'google', subject: `${prefix}-conflict` },
      }),
    ).toBe(0);
  });
  it('requires a live recent-MFA session and proof of the provider before linking; rotates sessions', async () => {
    const resolver = app.get(IdentityOidcResolver);
    const proof = app.get(IdentityProof);
    await expect(
      resolver.resolveUser(
        profile(`${prefix}-linked`),
        { accessToken: 'test-only' },
        { linkTo: { id: userId } },
      ),
    ).rejects.toThrow('verified browser session');
    await proof.run(
      { headers: {} } as Request,
      () =>
        resolver.resolveUser(
          profile(`${prefix}-linked`),
          { accessToken: 'test-only' },
          {},
        ),
      actor,
    );
    expect(
      (
        await db.providerIdentity.findUniqueOrThrow({
          where: {
            provider_subject: {
              provider: 'google',
              subject: `${prefix}-linked`,
            },
          },
        })
      ).userId,
    ).toBe(userId);
    expect(await app.get(SessionService).validate(actorToken)).toBeNull();
  });
  it('prevents deleting the final usable credential', async () => {
    const issued = await app.get(SessionService).create(providerOnly, {
      mfa: 'verified',
      metadata: { authVersion: 0, verifiedAt: Date.now() },
    });
    await request(app.getHttpServer())
      .post('/auth/providers/unlink')
      .set('X-iSchoolie-Client', 'native')
      .set('Authorization', `Bearer ${issued.token}`)
      .send({ provider: 'github' })
      .expect(400);
    expect(
      await db.providerIdentity.count({ where: { userId: providerOnly } }),
    ).toBe(1);
  });
  it('stores one-time native handoff hashes and binds exchange to the device verifier', async () => {
    const verifier = 'a'.repeat(64);
    const broker = await db.identityNativeBroker.create({
      data: {
        provider: 'google',
        challenge: digest(verifier),
        clientState: 'b'.repeat(64),
        oidcState: `${prefix}-state`,
        expiresAt: new Date(Date.now() + 60_000),
      },
    });
    brokerIds.push(broker.id);
    const user = await db.user.findUniqueOrThrow({ where: { id: userId } });
    const service = app.get(NativeBrokerService);
    const uri = await service.handoff(`${prefix}-state`, user);
    const code = new URL(uri!).searchParams.get('code')!;
    expect(
      (
        await db.identityNativeBroker.findUniqueOrThrow({
          where: { id: broker.id },
        })
      ).codeHash,
    ).not.toBe(code);
    await expect(
      service.exchange(broker.id, code, 'c'.repeat(64)),
    ).rejects.toThrow('Invalid or expired');
    const results = await Promise.allSettled([
      service.exchange(broker.id, code, verifier),
      service.exchange(broker.id, code, verifier),
    ]);
    expect(
      results.filter((value) => value.status === 'fulfilled'),
    ).toHaveLength(1);
  });
  it('claims TOTP steps and recovery hashes once under concurrent calls', async () => {
    const store = app.get(IdentitySecurityStore);
    await store.saveTotp(userId, {
      secret: 'test-cipher-envelope',
      confirmed: false,
      lastUsedStep: 0,
    });
    const claimed = await Promise.all(
      Array.from({ length: 12 }, () => store.claimTotpStep(userId, 10)),
    );
    expect(claimed.filter(Boolean)).toHaveLength(1);
    await store.saveTotp(userId, {
      secret: 'test-cipher-envelope',
      confirmed: false,
      lastUsedStep: 0,
    });
    expect((await store.getTotp(userId))?.lastUsedStep).toBe(10);
    await store.saveRecoveryCodes(userId, ['test-hash']);
    const used = await Promise.all(
      Array.from({ length: 12 }, () =>
        store.consumeRecoveryCode(userId, 'test-hash'),
      ),
    );
    expect(used.filter(Boolean)).toHaveLength(1);
  });
  it('cannot issue a new MFA session after the authorizing version is revoked', async () => {
    const user = await db.user.findUniqueOrThrow({ where: { id: userId } });
    const issued = await app
      .get(SessionService)
      .create(userId, { metadata: { authVersion: user.authVersion } });
    const access = app.get(SessionAccess);
    const original = access.require.bind(access);
    const spy = jest
      .spyOn(access, 'require')
      .mockImplementationOnce(async (req, options) => {
        const actor = await original(req, options);
        await db.user.update({
          where: { id: userId },
          data: { authVersion: { increment: 1 } },
        });
        await db.identitySession.deleteMany({ where: { userId } });
        return actor;
      });
    try {
      await request(app.getHttpServer())
        .post('/auth/mfa/confirm')
        .set('X-iSchoolie-Client', 'native')
        .set('Authorization', `Bearer ${issued.token}`)
        .send({ code: '123456' })
        .expect(401);
      expect(await db.identitySession.count({ where: { userId } })).toBe(0);
    } finally {
      spy.mockRestore();
    }
  });
  it('adds a verified mobile method to the same identity without assigning a parent role', async () => {
    const phone = '+12025550125';
    if (await db.phoneIdentity.findUnique({ where: { phone } }))
      throw new Error(
        'Reserved phone already exists; no existing identity will be modified',
      );
    const user = await db.user.findUniqueOrThrow({ where: { id: userId } });
    const issued = await app
      .get(SessionService)
      .create(userId, {
        mfa: 'verified',
        metadata: {
          authVersion: user.authVersion,
          authenticatedAt: Date.now(),
          verifiedAt: Date.now(),
        },
      });
    const post = (path: string) =>
      request(app.getHttpServer())
        .post(`/auth/${path}`)
        .set('X-iSchoolie-Client', 'native')
        .set('Authorization', `Bearer ${issued.token}`);
    const before = await db.user.count();
    const start = await post('phone/link/start').send({ phone }).expect(201);
    const proof = phoneProofs.find(
      (value) => value.id === start.body.challengeId,
    )!;
    const password = 'Chosen mobile method password 9!';
    await post('phone/link/confirm')
      .send({ challengeId: proof.id, code: proof.code, password })
      .expect(201);
    expect(await db.user.count()).toBe(before);
    expect(
      (await db.phoneIdentity.findUniqueOrThrow({ where: { phone } })).userId,
    ).toBe(userId);
    expect(
      (await db.user.findUniqueOrThrow({ where: { id: userId } })).accountKind,
    ).toBe('PUBLIC');
    await post('login/parent').send({ phone, password }).expect(401);
    await post('login/mobile').send({ phone, password }).expect(201);
    const current = await db.user.findUniqueOrThrow({ where: { id: userId } });
    const fresh = await app
      .get(SessionService)
      .create(userId, {
        mfa: 'verified',
        metadata: { authVersion: current.authVersion, verifiedAt: Date.now() },
      });
    const methods = await request(app.getHttpServer())
      .get('/auth/login-methods')
      .set('X-iSchoolie-Client', 'native')
      .set('Authorization', `Bearer ${fresh.token}`)
      .expect(200);
    expect(methods.body.phone.number).toBe(phone);
    expect(methods.body.passwordConfigured).toBe(true);
    expect(methods.body.providers[0].subject).toBeUndefined();
    await request(app.getHttpServer())
      .post('/auth/login-methods/phone/unlink')
      .set('X-iSchoolie-Client', 'native')
      .set('Authorization', `Bearer ${fresh.token}`)
      .send({})
      .expect(201);
    expect(await db.phoneIdentity.findUnique({ where: { phone } })).toBeNull();
  });
  it('binds recovery proofs to their issuance version', async () => {
    const user = await db.user.findUniqueOrThrow({ where: { id: userId } });
    const raw = randomUUID();
    await db.identityChallenge.create({
      data: {
        userId,
        authVersion: user.authVersion,
        kind: 'PASSWORD_RESET',
        tokenHash: digest(raw),
        expiresAt: new Date(Date.now() + 60000),
      },
    });
    await db.user.update({
      where: { id: userId },
      data: { authVersion: { increment: 1 } },
    });
    await expect(
      app.get(IdentityService).reset(raw, 'Rejected stale proof password 9!'),
    ).rejects.toThrow('Account cannot be recovered');
  });
});
