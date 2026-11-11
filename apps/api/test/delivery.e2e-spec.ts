import './test-safety';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { MailTransport, Mailer, ResendTransport } from '@nestjs/mail';
import { randomUUID } from 'node:crypto';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { IdentityDelivery } from '../src/auth/identity.delivery';
import { openDelivery, sealDelivery } from '../src/auth/delivery-cipher';
describe('Encrypted delivery queue (stub transport; no external messages)', () => {
  let app: INestApplication;
  let db: PrismaService;
  let fail = true;
  let calls = 0;
  const ids: string[] = [];
  const secret = `proof-${randomUUID()}`;
  const prefix = `delivery-${randomUUID()}`;
  const names = [
    'AUTH_EMAIL_TRANSPORT',
    'AUTH_RESEND_API_KEY',
    'AUTH_EMAIL_FROM',
    'AUTH_LOCAL_DELIVERY',
    'AUTH_DELIVERY_WORKER',
  ];
  const old = new Map(names.map((name) => [name, process.env[name]]));
  beforeAll(async () => {
    process.env.AUTH_EMAIL_TRANSPORT = 'resend';
    process.env.AUTH_RESEND_API_KEY = 'test-only';
    process.env.AUTH_EMAIL_FROM = 'qa@example.invalid';
    delete process.env.AUTH_LOCAL_DELIVERY;
    delete process.env.AUTH_DELIVERY_WORKER;
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(MailTransport)
      .useValue({
        async send() {
          calls++;
          if (fail)
            throw new Error('Private provider detail must not be persisted');
          return { providerMessageId: 'test-receipt' };
        },
      })
      .compile();
    app = module.createNestApplication();
    await app.init();
    db = app.get(PrismaService);
  });
  afterAll(async () => {
    if (db)
      await db.identityDeliveryMessage.deleteMany({
        where: { id: { in: ids } },
      });
    await app?.close();
    for (const [name, value] of old) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  });
  it('encrypts proof payloads and records safe retry status after failure', async () => {
    const queued = await app
      .get(IdentityDelivery)
      .send(`${prefix}@example.invalid`, 'EMAIL_VERIFY', secret);
    ids.push(queued.id);
    const row = await db.identityDeliveryMessage.findUniqueOrThrow({
      where: { id: queued.id },
    });
    expect(row.payload).not.toContain(secret);
    expect(row.payload).not.toContain(prefix);
    expect(openDelivery(row.id, row.payload!).token).toBe(secret);
    expect(row.attempts).toBe(1);
    expect(row.errorCode).toBe('DELIVERY_ATTEMPT_FAILED');
    expect(() => openDelivery(randomUUID(), row.payload!)).toThrow();
  });
  it('leases one retry across concurrent workers and clears accepted proof payloads', async () => {
    fail = false;
    await db.identityDeliveryMessage.update({
      where: { id: ids[0] },
      data: { nextAttemptAt: new Date(Date.now() - 1000) },
    });
    await Promise.all([
      app.get(IdentityDelivery).dispatch(ids[0]),
      app.get(IdentityDelivery).dispatch(ids[0]),
    ]);
    const row = await db.identityDeliveryMessage.findUniqueOrThrow({
      where: { id: ids[0] },
    });
    expect(calls).toBe(2);
    expect(row.status).toBe('PROVIDER_ACCEPTED');
    expect(row.payload).toBeNull();
    expect(row.providerReceipt).toBe('test-receipt');
  });
  it('expires queued proofs without sending and never exposes exception details', async () => {
    const id = randomUUID();
    ids.push(id);
    await db.identityDeliveryMessage.create({
      data: {
        id,
        channel: 'EMAIL',
        transport: 'RESEND',
        kind: 'EMAIL_VERIFY',
        payload: sealDelivery(id, {
          email: `${prefix}@example.invalid`,
          token: secret,
        }),
        expiresAt: new Date(Date.now() - 1000),
      },
    });
    await app.get(IdentityDelivery).drain();
    const row = await db.identityDeliveryMessage.findUniqueOrThrow({
      where: { id },
    });
    expect(row.status).toBe('EXPIRED');
    expect(row.payload).toBeNull();
    expect(calls).toBe(2);
  });
  it('sends validated email through the first-party Resend adapter with idempotency (stub HTTP)', async () => {
    let attempts = 0;
    const transport = new ResendTransport({
      apiKey: 'test-only-provider-key',
      fetch: async (_url, options) => {
        attempts++;
        const headers = new Headers(options?.headers);
        expect(headers.get('authorization')).toBe(
          'Bearer test-only-provider-key',
        );
        expect(headers.get('idempotency-key')).toBe('owned-message');
        return Response.json({ id: 'test-resend-receipt' });
      },
    });
    const message = await app
      .get(Mailer)
      .render({
        to: 'qa@example.invalid',
        subject: 'Test verification',
        text: 'Test-only one-time proof',
        idempotencyKey: 'owned-message',
      } as never);
    const result = await transport.send(message, {
      signal: AbortSignal.timeout(1000),
      attempt: 1,
      idempotencyKey: 'owned-message',
    });
    expect(result.providerMessageId).toBe('test-resend-receipt');
    expect(attempts).toBe(1);
  });
  it('uses the fixed Twilio endpoint and separates acceptance from permanent rejection (stub HTTP)', async () => {
    const variables = [
      'AUTH_SMS_TRANSPORT',
      'AUTH_TWILIO_ACCOUNT_SID',
      'AUTH_TWILIO_AUTH_TOKEN',
      'AUTH_TWILIO_FROM',
      'AUTH_LOCAL_SMS',
    ];
    const previous = new Map(
      variables.map((name) => [name, process.env[name]]),
    );
    process.env.AUTH_SMS_TRANSPORT = 'twilio';
    process.env.AUTH_TWILIO_ACCOUNT_SID = `AC${'0'.repeat(32)}`;
    process.env.AUTH_TWILIO_AUTH_TOKEN = 'test-only';
    process.env.AUTH_TWILIO_FROM = '+12025550100';
    delete process.env.AUTH_LOCAL_SMS;
    let reject = false;
    const spy = jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async (input, options) => {
        expect(input).toBe(
          `https://api.twilio.com/2010-04-01/Accounts/AC${'0'.repeat(32)}/Messages.json`,
        );
        expect(options?.body).toBeInstanceOf(URLSearchParams);
        return reject
          ? Response.json(
              { message: 'Private provider rejection detail' },
              { status: 400 },
            )
          : Response.json({ sid: 'test-twilio-receipt' }, { status: 201 });
      });
    try {
      const accepted = await app
        .get(IdentityDelivery)
        .sendSms('+12025550127', 'REGISTER', '123456', randomUUID());
      ids.push(accepted.id);
      const record = await db.identityDeliveryMessage.findUniqueOrThrow({
        where: { id: accepted.id },
      });
      expect(record.status).toBe('PROVIDER_ACCEPTED');
      expect(record.payload).toBeNull();
      reject = true;
      const refused = await app
        .get(IdentityDelivery)
        .sendSms('+12025550127', 'REGISTER', '123456', randomUUID());
      ids.push(refused.id);
      const failure = await db.identityDeliveryMessage.findUniqueOrThrow({
        where: { id: refused.id },
      });
      expect(failure.status).toBe('DEAD');
      expect(failure.errorCode).toBe('DELIVERY_ATTEMPT_FAILED');
      expect(failure.errorCode).not.toContain('Private');
    } finally {
      spy.mockRestore();
      for (const [name, value] of previous) {
        if (value === undefined) delete process.env[name];
        else process.env[name] = value;
      }
    }
  });
});
