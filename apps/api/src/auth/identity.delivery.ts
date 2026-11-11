import {
  Injectable,
  ServiceUnavailableException,
  type OnModuleInit,
  type OnModuleDestroy,
} from '@nestjs/common';
import { Mailer, MailError } from '@nestjs/mail';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../database/prisma.service';
import {
  localEmail,
  localSms,
  emailConfigured,
  smsConfigured,
} from './delivery.config';
import { sealDelivery, openDelivery } from './delivery-cipher';
import type { Prisma } from '../generated/prisma/client';
class SmsDeliveryRefusal extends Error {
  readonly permanent: boolean;
  constructor(status: number) {
    super('SMS provider refused request');
    this.permanent = status >= 400 && status < 500 && status !== 429;
  }
}

/** Encrypted durable queue; provider acceptance never means confirmed delivery. */
@Injectable()
export class IdentityDelivery implements OnModuleInit, OnModuleDestroy {
  private readonly inFlight = new Set<Promise<void>>();
  private timer?: ReturnType<typeof setInterval>;
  constructor(
    private readonly db: PrismaService,
    private readonly mailer: Mailer,
  ) {}
  onModuleInit() {
    if (process.env.AUTH_DELIVERY_WORKER === 'true') {
      this.timer = setInterval(() => {
        void this.drain().catch(() => {});
      }, 30000);
      this.timer.unref();
    }
  }
  async onModuleDestroy() {
    if (this.timer) clearInterval(this.timer);
    await Promise.allSettled(this.inFlight);
  }
  kick(id: string) {
    const pending = this.dispatch(id).catch(() => {});
    this.inFlight.add(pending);
    void pending.finally(() => this.inFlight.delete(pending));
  }
  available() {
    return localEmail() || emailConfigured();
  }
  requireAvailable() {
    if (!this.available())
      throw new ServiceUnavailableException('Email delivery is not configured');
    if (
      !process.env.AUTH_DELIVERY_KEYS ||
      process.env.AUTH_DELIVERY_KEYS.length < 32
    )
      throw new ServiceUnavailableException(
        'Delivery encryption is not configured',
      );
  }
  async send(email: string, kind: string, token: string) {
    this.requireAvailable();
    return this.enqueue('EMAIL', kind, { email, kind, token });
  }
  smsAvailable() {
    return localSms() || smsConfigured();
  }
  requireSms() {
    if (!this.smsAvailable())
      throw new ServiceUnavailableException('SMS delivery is not configured');
    if (
      !process.env.AUTH_DELIVERY_KEYS ||
      process.env.AUTH_DELIVERY_KEYS.length < 32
    )
      throw new ServiceUnavailableException(
        'Delivery encryption is not configured',
      );
  }
  async sendSms(
    phone: string,
    kind: string,
    code: string,
    challengeId: string,
  ) {
    this.requireSms();
    return this.enqueue('SMS', kind, { phone, kind, code, challengeId });
  }
  stageEmail(
    tx: Prisma.TransactionClient,
    email: string,
    kind: string,
    token: string,
  ) {
    this.requireAvailable();
    return this.stage(tx, 'EMAIL', kind, { email, kind, token });
  }
  stageSms(
    tx: Prisma.TransactionClient,
    phone: string,
    kind: string,
    code: string,
    challengeId: string,
  ) {
    this.requireSms();
    return this.stage(tx, 'SMS', kind, { phone, kind, code, challengeId });
  }
  private async enqueue(
    channel: string,
    kind: string,
    payload: Record<string, string>,
  ) {
    const id = await this.db.$transaction((tx) =>
      this.stage(tx, channel, kind, payload),
    );
    await this.dispatch(id);
    return { id };
  }
  private async stage(
    tx: Prisma.TransactionClient,
    channel: string,
    kind: string,
    payload: Record<string, string>,
  ) {
    const id = randomUUID();
    const ttl =
      channel === 'SMS'
        ? 5 * 60_000
        : kind === 'INSTITUTION_ACTIVATE'
          ? 24 * 60 * 60_000
          : kind === 'PRIVILEGED_ACTIVATE'
            ? 60 * 60_000
            : kind.includes('RESET')
              ? 15 * 60_000
              : 30 * 60_000;
    const transport =
      channel === 'EMAIL'
        ? localEmail()
          ? 'LOCAL'
          : 'RESEND'
        : localSms()
          ? 'LOCAL'
          : 'TWILIO';
    await tx.identityDeliveryMessage.create({
      data: {
        id,
        channel,
        transport,
        kind,
        payload: sealDelivery(id, payload),
        expiresAt: new Date(Date.now() + ttl),
      },
    });
    return id;
  }
  async dispatch(id: string) {
    const rows = await this.db.$queryRaw<
      {
        id: string;
        channel: string;
        transport: string;
        kind: string;
        payload: string;
        attempts: number;
      }[]
    >`UPDATE "IdentityDeliveryMessage" SET attempts=attempts+1,"leaseUntil"=NOW()+interval '60 seconds' WHERE id=${id}::uuid AND status='PENDING' AND "nextAttemptAt"<=NOW() AND ("leaseUntil" IS NULL OR "leaseUntil"<NOW()) AND "expiresAt">NOW() AND attempts<4 RETURNING id,channel,transport,kind,payload,attempts`;
    const row = rows[0];
    if (!row) return;
    try {
      const payload = openDelivery(row.id, row.payload);
      let receipt: string | undefined;
      const capture = row.transport === 'LOCAL';
      if (capture) {
        if (!(row.channel === 'EMAIL' ? localEmail() : localSms()))
          throw new Error('Original local transport unavailable');
        const directory = resolve(process.cwd(), '.local-auth');
        await mkdir(directory, { recursive: true });
        try {
          await writeFile(
            resolve(directory, `${row.id}.json`),
            JSON.stringify({ ...payload, createdAt: new Date().toISOString() }),
            { flag: 'wx', mode: 0o600 },
          );
        } catch (error) {
          if ((error as { code?: string }).code !== 'EEXIST') throw error;
        }
      } else if (row.channel === 'EMAIL') {
        if (!emailConfigured())
          throw new ServiceUnavailableException('Email delivery unavailable');
        const route = payload.kind.includes('ACTIVATE')
          ? 'activate'
          : payload.kind === 'EMAIL_VERIFY'
            ? 'verify'
            : 'reset';
        const label =
          route === 'activate'
            ? 'Activate your iSchoolie account'
            : route === 'verify'
              ? 'Verify your iSchoolie email'
              : 'Recover your iSchoolie account';
        const origin = process.env.AUTH_WEB_ORIGIN ?? 'http://localhost:3000';
        if (
          process.env.NODE_ENV === 'production' &&
          !origin.startsWith('https://')
        )
          throw new Error('HTTPS account origin required');
        const result = await this.mailer.send({
          to: payload.email,
          subject: label,
          text: `${label}\n\nOpen ${origin}/auth/${route}, paste this one-time token, and choose your password:\n\n${payload.token}\n\nIf you did not request this, do not use or share the token.`,
          idempotencyKey: row.id,
          retry: false,
          signal: AbortSignal.timeout(15000),
        });
        receipt = result.providerMessageId;
      } else {
        if (!smsConfigured())
          throw new ServiceUnavailableException('SMS delivery unavailable');
        const sid = process.env.AUTH_TWILIO_ACCOUNT_SID!;
        const response = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${Buffer.from(`${sid}:${process.env.AUTH_TWILIO_AUTH_TOKEN!}`).toString('base64')}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              To: payload.phone,
              From: process.env.AUTH_TWILIO_FROM!,
              Body: `Your iSchoolie verification code is ${payload.code}. It expires in 5 minutes. Never share it.`,
            }),
            redirect: 'error',
            signal: AbortSignal.timeout(15000),
          },
        );
        if (!response.ok) throw new SmsDeliveryRefusal(response.status);
        const result = (await response.json()) as { sid?: string };
        if (!result.sid) throw new Error('SMS provider receipt unavailable');
        receipt = result.sid;
      }
      await this.db.identityDeliveryMessage.updateMany({
        where: { id, attempts: row.attempts, status: 'PENDING' },
        data: {
          status: capture ? 'CAPTURED' : 'PROVIDER_ACCEPTED',
          providerReceipt: receipt,
          payload: null,
          leaseUntil: null,
          errorCode: null,
        },
      });
    } catch (error) {
      await this.db.identityDeliveryMessage.updateMany({
        where: { id, attempts: row.attempts, status: 'PENDING' },
        data: {
          status:
            row.attempts >= 4 ||
            ((error instanceof MailError ||
              error instanceof SmsDeliveryRefusal) &&
              error.permanent)
              ? 'DEAD'
              : 'PENDING',
          leaseUntil: null,
          nextAttemptAt: new Date(Date.now() + 30000 * 2 ** (row.attempts - 1)),
          errorCode: 'DELIVERY_ATTEMPT_FAILED',
        },
      });
    }
  }
  async drain() {
    await this.db.identityDeliveryMessage.updateMany({
      where: {
        status: 'PENDING',
        attempts: { gte: 4 },
        OR: [{ leaseUntil: null }, { leaseUntil: { lt: new Date() } }],
      },
      data: { status: 'DEAD', leaseUntil: null },
    });
    await this.db.identityDeliveryMessage.updateMany({
      where: { expiresAt: { lte: new Date() }, payload: { not: null } },
      data: { status: 'EXPIRED', payload: null, leaseUntil: null },
    });
    const rows = await this.db.identityDeliveryMessage.findMany({
      where: {
        status: 'PENDING',
        nextAttemptAt: { lte: new Date() },
        expiresAt: { gt: new Date() },
      },
      select: { id: true },
      take: 25,
      orderBy: { nextAttemptAt: 'asc' },
    });
    for (const row of rows) await this.dispatch(row.id);
    return { attempted: rows.length };
  }
}
