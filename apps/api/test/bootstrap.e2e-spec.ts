import './test-safety';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { MfaService } from '@nestjs/authentication';
import { randomUUID } from 'node:crypto';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { IdentityBootstrap } from '../src/auth/bootstrap.service';
import { IdentityDelivery } from '../src/auth/identity.delivery';
import { ProvisioningService } from '../src/auth/provisioning.service';
import { totpFixture } from './totp-fixture';
describe('Restricted offline bootstrap (owned fixtures)', () => {
  let app: INestApplication;
  let db: PrismaService;
  let actorId = '';
  let actorEmail = '';
  let institutionId = '';
  const ids: string[] = [];
  const prefix = `boot-${randomUUID()}`;
  const captures: { email: string; token: string }[] = [];
  const password = 'Bootstrap test password only 8!';
  const previous = process.env.AUTH_BOOTSTRAP_ENABLED;
  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(IdentityDelivery)
      .useValue({
        requireAvailable() {},
        async stageEmail(
          _tx: unknown,
          email: string,
          _kind: string,
          token: string,
        ) {
          captures.push({ email, token });
          return randomUUID();
        },
        async dispatch() {},
      })
      .compile();
    app = module.createNestApplication();
    await app.init();
    db = app.get(PrismaService);
    if (await db.platformOperator.count())
      throw new Error(
        'Initial operator already exists; this test will not modify it',
      );
  });
  afterAll(async () => {
    if (db) {
      const owned = await db.user.findMany({
        where: { emailCanonical: { startsWith: prefix } },
        select: { id: true },
      });
      ids.push(...owned.map((value) => value.id));
      await db.identityChallenge.deleteMany({ where: { userId: { in: ids } } });
      await db.institutionGrant.deleteMany({ where: { userId: { in: ids } } });
      await db.platformOperator.deleteMany({ where: { userId: { in: ids } } });
      await db.identityAudit.deleteMany({ where: { userId: { in: ids } } });
      await db.user.deleteMany({ where: { id: { in: ids } } });
      if (institutionId)
        await db.institutionIdentity.delete({ where: { id: institutionId } });
    }
    await app?.close();
    if (previous === undefined) delete process.env.AUTH_BOOTSTRAP_ENABLED;
    else process.env.AUTH_BOOTSTRAP_ENABLED = previous;
  });
  it('is disabled by default and creates no credentials', async () => {
    delete process.env.AUTH_BOOTSTRAP_ENABLED;
    await expect(
      app.get(IdentityBootstrap).operator({
        email: `${prefix}-disabled@example.invalid`,
        displayName: 'QA',
      }),
    ).rejects.toThrow('Bootstrap is disabled');
  });
  it('allows only one initial operator under concurrent setup and issues no default password', async () => {
    process.env.AUTH_BOOTSTRAP_ENABLED = 'true';
    const result = await Promise.allSettled([
      app.get(IdentityBootstrap).operator({
        email: `${prefix}-a@example.invalid`,
        displayName: 'QA operator',
      }),
      app.get(IdentityBootstrap).operator({
        email: `${prefix}-b@example.invalid`,
        displayName: 'QA operator',
      }),
    ]);
    expect(result.filter((value) => value.status === 'fulfilled')).toHaveLength(
      1,
    );
    const actor = await db.user.findFirstOrThrow({
      where: { emailCanonical: { startsWith: prefix } },
    });
    actorId = actor.id;
    actorEmail = actor.emailCanonical!;
    expect(actor.passwordHash).toBeNull();
    expect(actor.status).toBe('PENDING');
  });
  it('requires activated operator password and MFA before institution bootstrap', async () => {
    const service = app.get(IdentityBootstrap);
    const body = {
      actorEmail,
      password,
      code: '000000',
      institutionCode: prefix.toUpperCase(),
      institutionName: 'QA institution',
      adminEmail: `${prefix}-admin@example.invalid`,
      adminName: 'QA admin',
    };
    await expect(service.institution(body)).rejects.toThrow(
      'operator password and MFA',
    );
    const invitation = captures.find((value) => value.email === actorEmail)!;
    await app.get(ProvisioningService).activate(invitation.token, password);
    const enrollment = await app.get(MfaService).enroll(actorId, actorEmail);
    expect(
      await app
        .get(MfaService)
        .confirm(actorId, totpFixture(enrollment.secret)),
    ).toBe(true);
    const result = await service.institution({
      ...body,
      code: totpFixture(enrollment.secret, Date.now() + 30000),
    });
    institutionId = result.institutionId;
    const admin = await db.user.findUniqueOrThrow({
      where: { emailCanonical: body.adminEmail },
      include: { grants: true },
    });
    expect(admin.status).toBe('PENDING');
    expect(admin.passwordHash).toBeNull();
    expect(admin.grants).toHaveLength(3);
    expect(
      admin.grants.every((value) => value.institutionId === institutionId),
    ).toBe(true);
  });
});
