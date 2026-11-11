import './test-safety';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { IdentityDelivery } from '../src/auth/identity.delivery';
import { digest } from '../src/auth/identity.util';
describe('Parent mobile proof boundary (mock delivery, PostgreSQL)', () => {
  let app: INestApplication;
  let db: PrismaService;
  let userId: string | undefined;
  let token = '';
  let challenge = '';
  const prefix = `phone-${randomUUID()}`;
  const phone = '+12025550123';
  const password = 'Parent proof chosen password 8!';
  const captures: { phone: string; kind: string; code: string; id: string }[] =
    [];
  const post = (path: string) =>
    request(app.getHttpServer())
      .post(`/auth/${path}`)
      .set('X-iSchoolie-Client', 'native')
      .set('Authorization', `Bearer ${token}`);
  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(IdentityDelivery)
      .useValue({
        requireSms() {},
        async stageSms(
          _tx: unknown,
          phone: string,
          kind: string,
          code: string,
          id: string,
        ) {
          captures.push({ phone, kind, code, id });
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
    if (await db.phoneIdentity.findUnique({ where: { phone } }))
      throw new Error(
        'Reserved QA phone already exists; no existing identity will be modified',
      );
  });
  afterAll(async () => {
    if (db) {
      if (userId) {
        await db.identityAudit.deleteMany({ where: { userId } });
        await db.phoneIdentity.deleteMany({ where: { userId } });
        await db.user.delete({ where: { id: userId } });
      }
      await db.identityPhoneChallenge.deleteMany({
        where: { id: { in: captures.map((value) => value.id) } },
      });
      await db.identityRateLimit.deleteMany({
        where: {
          key: {
            in: [
              `ip:${digest(prefix)}`,
              `account:${digest(`phone:${phone}`)}`,
              `account:${digest(`phone-confirm:${prefix}`)}`,
            ],
          },
        },
      });
    }
    await app?.close();
  });
  it('creates no parent or relationship before proof and persists a five-attempt limit', async () => {
    const initial = await db.user.count();
    const result = await post('phone/start')
      .send({ phone, kind: 'REGISTER', password, displayName: 'QA parent' })
      .expect(201);
    challenge = result.body.challengeId;
    expect(await db.user.count()).toBe(initial);
    expect(await db.phoneIdentity.count({ where: { phone } })).toBe(0);
    for (let index = 0; index < 5; index++)
      await post('phone/confirm')
        .send({ challengeId: challenge, code: '000000', password })
        .expect(401);
    const capture = captures.find((value) => value.id === challenge)!;
    await post('phone/confirm')
      .send({ challengeId: challenge, code: capture.code, password })
      .expect(401);
    expect(
      (
        await db.identityPhoneChallenge.findUniqueOrThrow({
          where: { id: challenge },
        })
      ).attempts,
    ).toBe(5);
  });
  it('requires proof, sets the proof-owner password and rejects replay', async () => {
    const result = await post('phone/start')
      .send({
        phone,
        kind: 'REGISTER',
        password: 'Unowned preliminary password 7!',
        displayName: 'QA parent',
      })
      .expect(201);
    challenge = result.body.challengeId;
    const capture = captures.find((value) => value.id === challenge)!;
    await post('phone/confirm')
      .send({ challengeId: challenge, code: capture.code, password })
      .expect(201);
    userId = (await db.phoneIdentity.findUniqueOrThrow({ where: { phone } }))
      .userId;
    await post('phone/confirm')
      .send({ challengeId: challenge, code: capture.code, password })
      .expect(401);
    await post('login/parent')
      .send({ phone, password: 'Unowned preliminary password 7!' })
      .expect(401);
    const login = await post('login/parent')
      .send({ phone, password })
      .expect(201);
    token = login.body.token;
    const me = await request(app.getHttpServer())
      .get('/auth/me')
      .set('X-iSchoolie-Client', 'native')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(me.body.user.accountKind).toBe('PARENT');
    expect(me.body.permissions).toEqual([]);
  });
  it('phone recovery retains restrictions and revokes old sessions', async () => {
    const result = await post('phone/start')
      .send({ phone, kind: 'RECOVER', password })
      .expect(201);
    const capture = captures.find(
      (value) => value.id === result.body.challengeId,
    )!;
    const nextPassword = 'New parent password after proof 9!';
    await post('phone/confirm')
      .send({
        challengeId: result.body.challengeId,
        code: capture.code,
        password: nextPassword,
      })
      .expect(201);
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('X-iSchoolie-Client', 'native')
      .set('Authorization', `Bearer ${token}`)
      .expect(401);
    await post('login/parent').send({ phone, password }).expect(401);
    await post('login/parent')
      .send({ phone, password: nextPassword })
      .expect(201);
    expect(await db.institutionGrant.count({ where: { userId } })).toBe(0);
  });
  it('requires the original authenticated account and new-number proof for a phone change', async () => {
    const newPhone = '+12025550124';
    if (await db.phoneIdentity.findUnique({ where: { phone: newPhone } }))
      throw new Error(
        'New reserved QA phone already exists; it will not be modified',
      );
    const currentPassword = 'New parent password after proof 9!';
    const login = await post('login/parent')
      .send({ phone, password: currentPassword })
      .expect(201);
    token = login.body.token;
    const start = await post('phone/change/start')
      .send({ phone: newPhone, password: currentPassword })
      .expect(201);
    const capture = captures.find(
      (value) => value.id === start.body.challengeId,
    )!;
    await post('phone/confirm')
      .send({
        challengeId: start.body.challengeId,
        code: capture.code,
        password: currentPassword,
      })
      .expect(401);
    await post('phone/change/confirm')
      .send({ challengeId: start.body.challengeId, code: capture.code })
      .expect(201);
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('X-iSchoolie-Client', 'native')
      .set('Authorization', `Bearer ${token}`)
      .expect(401);
    await post('login/parent')
      .send({ phone, password: currentPassword })
      .expect(401);
    await post('login/parent')
      .send({ phone: newPhone, password: currentPassword })
      .expect(201);
    await db.identityRateLimit.deleteMany({
      where: {
        key: {
          in: [
            `account:${digest(`phone-change:${userId}`)}`,
            `account:${digest(`phone:${newPhone}`)}`,
          ],
        },
      },
    });
  });
});
