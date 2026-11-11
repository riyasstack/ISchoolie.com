import './test-safety';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { SessionService } from '@nestjs/authentication';
import { createHmac, randomUUID } from 'node:crypto';
import { hash, argon2id } from 'argon2';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { IdentityDelivery } from '../src/auth/identity.delivery';
import { ProvisioningService } from '../src/auth/provisioning.service';
import { digest } from '../src/auth/identity.util';

function totp(secret: string, at = Date.now()) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  for (const character of secret.replace(/=+$/, ''))
    bits += alphabet.indexOf(character).toString(2).padStart(5, '0');
  const bytes: number[] = [];
  for (let index = 0; index + 8 <= bits.length; index += 8)
    bytes.push(parseInt(bits.slice(index, index + 8), 2));
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(Math.floor(at / 30000)));
  const mac = createHmac('sha1', Buffer.from(bytes)).update(counter).digest();
  const offset = mac[19] & 15;
  return ((mac.readUInt32BE(offset) & 0x7fffffff) % 1000000)
    .toString()
    .padStart(6, '0');
}
describe('MFA, native transport and institution provisioning in PostgreSQL', () => {
  let app: INestApplication;
  let db: PrismaService;
  let adminId: string;
  let institutionId: string;
  let otherId: string;
  const prefix = `sec-${randomUUID()}`;
  const email = `${prefix}@example.invalid`;
  const password = 'Security test password 55!';
  const captures: { email: string; kind: string; token: string }[] = [];
  let token = '';
  let secret = '';
  let confirmedCode = '';
  let codes: string[] = [];
  let staffId = '';
  let staffIdentifier = '';
  const extraUsers: string[] = [];
  const nativePost = (path: string, credential = token) =>
    request(app.getHttpServer())
      .post(`/auth/${path}`)
      .set('X-iSchoolie-Client', 'native')
      .set('Authorization', `Bearer ${credential}`);
  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(IdentityDelivery)
      .useValue({
        requireAvailable() {},
        async stageEmail(
          _tx: unknown,
          email: string,
          kind: string,
          token: string,
        ) {
          captures.push({ email, kind, token });
          return randomUUID();
        },
        async dispatch() {},
      })
      .compile();
    app = module.createNestApplication();
    app.use((req: object, _res: object, next: () => void) => {
      Object.defineProperty(req, 'ip', { value: prefix });
      next();
    });
    await app.init();
    db = app.get(PrismaService);
    const user = await db.user.create({
      data: {
        email,
        emailCanonical: email,
        emailVerifiedAt: new Date(),
        passwordHash: await hash(password, { type: argon2id }),
        status: 'ACTIVE',
        accountKind: 'INSTITUTION_ADMIN',
      },
    });
    adminId = user.id;
    const institution = await db.institutionIdentity.create({
      data: { code: prefix.toUpperCase(), name: 'Owned test institution' },
    });
    institutionId = institution.id;
    otherId = (
      await db.institutionIdentity.create({
        data: {
          code: `OTHER-${prefix}`.toUpperCase(),
          name: 'Other owned test institution',
        },
      })
    ).id;
    await db.institutionGrant.createMany({
      data: ['PROVISION_STUDENT', 'PROVISION_STAFF', 'MANAGE_IDENTITIES'].map(
        (permission) => ({ userId: adminId, institutionId, permission }),
      ),
    });
  });
  afterAll(async () => {
    if (db) {
      const logins = await db.institutionalLogin.findMany({
        where: { institutionId: { in: [institutionId, otherId] } },
      });
      const userIds = [
        adminId,
        ...extraUsers,
        ...logins.map((value) => value.userId),
      ].filter(Boolean);
      await db.identityChallenge.deleteMany({
        where: { userId: { in: userIds } },
      });
      await db.institutionalLogin.deleteMany({
        where: { institutionId: { in: [institutionId, otherId] } },
      });
      await db.institutionGrant.deleteMany({
        where: { userId: { in: userIds } },
      });
      await db.identityImport.deleteMany({
        where: { institutionId: { in: [institutionId, otherId] } },
      });
      await db.staffIdentitySequence.deleteMany({
        where: { institutionId: { in: [institutionId, otherId] } },
      });
      await db.identityAudit.deleteMany({ where: { userId: { in: userIds } } });
      await db.user.deleteMany({ where: { id: { in: userIds } } });
      await db.institutionIdentity.deleteMany({
        where: { id: { in: [institutionId, otherId] } },
      });
      const identifiers = [
        `privileged:${email}`,
        `mfa-enroll:${adminId}`,
        `mfa:${adminId}`,
        `institution-activate:${prefix}`,
      ];
      await db.identityRateLimit.deleteMany({
        where: {
          key: {
            in: [
              `ip:${digest(prefix)}`,
              ...identifiers.map((value) => `account:${digest(value)}`),
            ],
          },
        },
      });
    }
    await app?.close();
  });
  it('requires MFA before privileged/native access and stores only encrypted TOTP', async () => {
    const login = await nativePost('login/privileged', '')
      .send({ email, password })
      .expect(201);
    token = login.body.token;
    expect(token).toHaveLength(43);
    expect(login.headers['set-cookie']).toBeUndefined();
    expect(login.body.mfa).toBe('pending');
    await request(app.getHttpServer())
      .get('/auth/sessions')
      .set('X-iSchoolie-Client', 'native')
      .set('Authorization', `Bearer ${token}`)
      .expect(401);
    await nativePost(`institutions/${institutionId}/credentials`)
      .send({
        kind: 'STUDENT',
        identifier: '0001',
        displayName: 'Learner',
        contactEmail: 'learner@example.invalid',
      })
      .expect(401);
    const enroll = await nativePost('mfa/enroll')
      .send({ password })
      .expect(201);
    secret = enroll.body.secret;
    const stored = await db.identityTotp.findUniqueOrThrow({
      where: { userId: adminId },
    });
    expect(stored.secret).not.toBe(secret);
    expect(stored.secret).toMatch(/^v1\./);
    confirmedCode = totp(secret);
    const confirmation = await nativePost('mfa/confirm')
      .send({ code: confirmedCode })
      .expect(201);
    token = confirmation.body.token;
    codes = confirmation.body.recoveryCodes;
    expect(codes).toHaveLength(10);
    expect(confirmation.body.mfa).toBe('verified');
    const hashes = await db.identityRecoveryCode.findMany({
      where: { userId: adminId },
    });
    expect(hashes.every((value) => !codes.includes(value.hash))).toBe(true);
  });
  it('rejects TOTP/recovery replay and prohibits disabling privileged MFA', async () => {
    const login = await nativePost('login/privileged', '')
      .send({ email, password })
      .expect(201);
    token = login.body.token;
    await nativePost('mfa/verify').send({ code: confirmedCode }).expect(401);
    const completed = await nativePost('mfa/verify')
      .send({ code: codes[0], recovery: true })
      .expect(201);
    token = completed.body.token;
    await nativePost('mfa/verify')
      .send({ code: codes[0], recovery: true })
      .expect(401);
    await nativePost('mfa/disable').send({ password }).expect(403);
  });
  it('rejects cross-institution provisioning and staff type never becomes a grant', async () => {
    const row = {
      kind: 'STAFF',
      staffType: 'ADM',
      hiringYear: 2026,
      displayName: 'Office staff',
      contactEmail: 'office@example.invalid',
    };
    await nativePost(`institutions/${otherId}/credentials`)
      .send(row)
      .expect(403);
    const result = await nativePost(`institutions/${institutionId}/credentials`)
      .send(row)
      .expect(201);
    staffId = result.body.id;
    staffIdentifier = result.body.identifier;
    expect(staffIdentifier).toBe('2026-ADM-0001');
    const login = await db.institutionalLogin.findUniqueOrThrow({
      where: { id: staffId },
    });
    expect(
      await db.institutionGrant.count({ where: { userId: login.userId } }),
    ).toBe(0);
  });
  it('allocates unique consecutive staff numbers concurrently', async () => {
    const actor = (await app.get(SessionService).validate(token))!;
    const results = await Promise.all(
      Array.from({ length: 8 }, (_, index) =>
        app.get(ProvisioningService).provision(actor, institutionId, {
          kind: 'STAFF',
          staffType: 'TCH',
          hiringYear: 2026,
          displayName: `Teacher ${index}`,
          contactEmail: `teacher${index}@example.invalid`,
        }),
      ),
    );
    expect(new Set(results.map((value) => value.identifier)).size).toBe(8);
    expect(results.some((value) => value.identifier === '2026-TCH-0008')).toBe(
      true,
    );
  });
  it('previews without issuing accounts and commits an import idempotently', async () => {
    const before = await db.user.count();
    const preview = await nativePost(
      `institutions/${institutionId}/imports/preview`,
    )
      .send({
        rows: [
          {
            kind: 'STUDENT',
            identifier: '0001',
            displayName: 'Learner',
            contactEmail: 'learner@example.invalid',
          },
          {
            kind: 'STAFF',
            staffType: 'SUP',
            hiringYear: 2026,
            displayName: 'Support',
            contactEmail: 'support@example.invalid',
          },
        ],
      })
      .expect(201);
    expect(await db.user.count()).toBe(before);
    const results = await Promise.all([
      nativePost(
        `institutions/${institutionId}/imports/${preview.body.id}/commit`,
      ).send({}),
      nativePost(
        `institutions/${institutionId}/imports/${preview.body.id}/commit`,
      ).send({}),
    ]);
    expect(results.every((value) => value.status === 201)).toBe(true);
    expect(
      results
        .map((value) => value.body.replay)
        .sort((a, b) => Number(a) - Number(b)),
    ).toEqual([false, true]);
    expect(await db.user.count()).toBe(before + 2);
  });
  it('preserves legacy staff IDs, advances imported sequences and reports row conflicts', async () => {
    const path = `institutions/${institutionId}`;
    const base = {
      kind: 'STAFF',
      staffType: 'TCH',
      hiringYear: 2026,
      displayName: 'Imported staff',
      contactEmail: 'legacy@example.invalid',
    };
    const preview = await nativePost(`${path}/imports/preview`)
      .send({
        rows: [
          { ...base, identifier: 'LEGACY/0007' },
          { ...base, identifier: '2026-TCH-0100' },
        ],
      })
      .expect(201);
    await nativePost(`${path}/imports/${preview.body.id}/commit`)
      .send({})
      .expect(201);
    const legacy = await db.institutionalLogin.findFirstOrThrow({
      where: { institutionId, identifier: 'LEGACY/0007' },
    });
    expect(legacy.legacy).toBe(true);
    expect(legacy.sequence).toBeNull();
    const next = await nativePost(`${path}/credentials`).send(base).expect(201);
    expect(next.body.identifier).toMatch(/2026-TCH-0*101$/);
    const conflict = await nativePost(`${path}/imports/preview`)
      .send({
        rows: [
          { ...base, identifier: '2026-TCH-00100' },
          { ...base, identifier: '2025-TCH-0102' },
          { ...base, password: 'forbidden' },
        ],
      })
      .expect(400);
    expect(
      conflict.body.errors.map((value: { row: number }) => value.row),
    ).toEqual([2, 3]);
    const alias = await nativePost(`${path}/imports/preview`)
      .send({ rows: [{ ...base, identifier: '2026-TCH-00100' }] })
      .expect(400);
    expect(alias.body.errors[0].row).toBe(1);
    const before = await db.user.count();
    const stale = await nativePost(`${path}/imports/preview`)
      .send({ rows: [{ ...base, identifier: 'LEGACY/RACE' }] })
      .expect(201);
    await nativePost(`${path}/credentials`)
      .send({ ...base, identifier: 'LEGACY/RACE' })
      .expect(201);
    const failed = await nativePost(`${path}/imports/${stale.body.id}/commit`)
      .send({})
      .expect(400);
    expect(failed.body.errors[0].row).toBe(1);
    expect(await db.user.count()).toBe(before + 1);
  });
  it('activates issued staff credentials once without treating contact email as a login', async () => {
    await nativePost(
      `institutions/${institutionId}/credentials/${staffId}/invite`,
    )
      .send({})
      .expect(201);
    const invitation = captures.find(
      (value) => value.kind === 'INSTITUTION_ACTIVATE',
    )!;
    await nativePost('activate/institution', '')
      .send({ token: invitation.token, password })
      .expect(201);
    await nativePost('activate/institution', '')
      .send({ token: invitation.token, password })
      .expect(400);
    const login = await nativePost('login/institution', '')
      .send({
        institutionCode: prefix,
        kind: 'STAFF',
        identifier: staffIdentifier,
        password,
      })
      .expect(201);
    const me = await request(app.getHttpServer())
      .get('/auth/me')
      .set('X-iSchoolie-Client', 'native')
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(200);
    expect(me.body.permissions).toEqual([]);
    expect(me.body.user.email).toBeNull();
    await nativePost('login/institution', '')
      .send({
        institutionCode: `OTHER-${prefix}`,
        kind: 'STAFF',
        identifier: staffIdentifier,
        password,
      })
      .expect(401);
  });
  it('revocation ends staff sessions and native cookie mixing is forbidden', async () => {
    await nativePost(
      `institutions/${institutionId}/credentials/${staffId}/revoke`,
    )
      .send({})
      .expect(201);
    await nativePost('login/institution', '')
      .send({
        institutionCode: prefix,
        kind: 'STAFF',
        identifier: staffIdentifier,
        password,
      })
      .expect(401);
    await nativePost('logout')
      .set('Cookie', 'ischoolie-dev=bad')
      .send({})
      .expect(403);
  });
  it('student activation and managed recovery retain restricted status and grant no academic permissions', async () => {
    const contact = `student-${prefix}@example.invalid`;
    const issued = await nativePost(`institutions/${institutionId}/credentials`)
      .send({
        kind: 'STUDENT',
        identifier: '0002',
        displayName: 'QA restricted student',
        contactEmail: contact,
      })
      .expect(201);
    await nativePost(
      `institutions/${institutionId}/credentials/${issued.body.id}/invite`,
    )
      .send({})
      .expect(201);
    const invitation = captures.find(
      (value) =>
        value.email === contact && value.kind === 'INSTITUTION_ACTIVATE',
    )!;
    await nativePost('activate/institution', '')
      .send({ token: invitation.token, password })
      .expect(201);
    const login = await nativePost('login/institution', '')
      .send({
        institutionCode: prefix,
        kind: 'STUDENT',
        identifier: '0002',
        password,
      })
      .expect(201);
    const me = await request(app.getHttpServer())
      .get('/auth/me')
      .set('X-iSchoolie-Client', 'native')
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(200);
    expect(me.body.restricted).toBe(true);
    expect(me.body.permissions).toEqual([]);
    await nativePost(
      `institutions/${institutionId}/credentials/${issued.body.id}/recovery`,
    )
      .send({})
      .expect(201);
    const recovery = captures.find(
      (value) => value.email === contact && value.kind === 'INSTITUTION_RESET',
    )!;
    await nativePost('recovery/reset', '')
      .send({
        token: recovery.token,
        password: 'New restricted student password 8!',
      })
      .expect(201);
    expect(
      (await db.user.findUniqueOrThrow({ where: { id: me.body.user.id } }))
        .status,
    ).toBe('RESTRICTED');
  });
  it('associates an issued staff identifier only after invitation plus authenticated recent-MFA proof', async () => {
    const contact = `claim-${prefix}@example.invalid`;
    const issued = await nativePost(`institutions/${institutionId}/credentials`)
      .send({
        kind: 'STAFF',
        staffType: 'SUP',
        hiringYear: 2026,
        displayName: 'QA association',
        contactEmail: contact,
      })
      .expect(201);
    const pending = await db.institutionalLogin.findUniqueOrThrow({
      where: { id: issued.body.id },
    });
    extraUsers.push(pending.userId);
    await nativePost(
      `institutions/${institutionId}/credentials/${issued.body.id}/invite`,
    )
      .send({})
      .expect(201);
    const invitation = captures.find((value) => value.email === contact)!;
    await nativePost('identities/claim', '')
      .send({ token: invitation.token })
      .expect(401);
    await nativePost('identities/claim')
      .send({ token: invitation.token })
      .expect(201);
    expect(
      (
        await db.institutionalLogin.findUniqueOrThrow({
          where: { id: issued.body.id },
        })
      ).userId,
    ).toBe(adminId);
    expect(
      (await db.user.findUniqueOrThrow({ where: { id: pending.userId } }))
        .status,
    ).toBe('CLOSED');
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('X-iSchoolie-Client', 'native')
      .set('Authorization', `Bearer ${token}`)
      .expect(401);
  });
});
