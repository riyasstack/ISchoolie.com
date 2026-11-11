"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityDelivery = void 0;
const common_1 = require("@nestjs/common");
const mail_1 = require("@nestjs/mail");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const node_crypto_1 = require("node:crypto");
const prisma_service_1 = require("../database/prisma.service");
const delivery_config_1 = require("./delivery.config");
const delivery_cipher_1 = require("./delivery-cipher");
class SmsDeliveryRefusal extends Error {
    permanent;
    constructor(status) {
        super('SMS provider refused request');
        this.permanent = status >= 400 && status < 500 && status !== 429;
    }
}
let IdentityDelivery = class IdentityDelivery {
    db;
    mailer;
    inFlight = new Set();
    timer;
    constructor(db, mailer) {
        this.db = db;
        this.mailer = mailer;
    }
    onModuleInit() {
        if (process.env.AUTH_DELIVERY_WORKER === 'true') {
            this.timer = setInterval(() => {
                void this.drain().catch(() => { });
            }, 30000);
            this.timer.unref();
        }
    }
    async onModuleDestroy() {
        if (this.timer)
            clearInterval(this.timer);
        await Promise.allSettled(this.inFlight);
    }
    kick(id) {
        const pending = this.dispatch(id).catch(() => { });
        this.inFlight.add(pending);
        void pending.finally(() => this.inFlight.delete(pending));
    }
    available() {
        return (0, delivery_config_1.localEmail)() || (0, delivery_config_1.emailConfigured)();
    }
    requireAvailable() {
        if (!this.available())
            throw new common_1.ServiceUnavailableException('Email delivery is not configured');
        if (!process.env.AUTH_DELIVERY_KEYS ||
            process.env.AUTH_DELIVERY_KEYS.length < 32)
            throw new common_1.ServiceUnavailableException('Delivery encryption is not configured');
    }
    async send(email, kind, token) {
        this.requireAvailable();
        return this.enqueue('EMAIL', kind, { email, kind, token });
    }
    smsAvailable() {
        return (0, delivery_config_1.localSms)() || (0, delivery_config_1.smsConfigured)();
    }
    requireSms() {
        if (!this.smsAvailable())
            throw new common_1.ServiceUnavailableException('SMS delivery is not configured');
        if (!process.env.AUTH_DELIVERY_KEYS ||
            process.env.AUTH_DELIVERY_KEYS.length < 32)
            throw new common_1.ServiceUnavailableException('Delivery encryption is not configured');
    }
    async sendSms(phone, kind, code, challengeId) {
        this.requireSms();
        return this.enqueue('SMS', kind, { phone, kind, code, challengeId });
    }
    stageEmail(tx, email, kind, token) {
        this.requireAvailable();
        return this.stage(tx, 'EMAIL', kind, { email, kind, token });
    }
    stageSms(tx, phone, kind, code, challengeId) {
        this.requireSms();
        return this.stage(tx, 'SMS', kind, { phone, kind, code, challengeId });
    }
    async enqueue(channel, kind, payload) {
        const id = await this.db.$transaction((tx) => this.stage(tx, channel, kind, payload));
        await this.dispatch(id);
        return { id };
    }
    async stage(tx, channel, kind, payload) {
        const id = (0, node_crypto_1.randomUUID)();
        const ttl = channel === 'SMS'
            ? 5 * 60_000
            : kind === 'INSTITUTION_ACTIVATE'
                ? 24 * 60 * 60_000
                : kind === 'PRIVILEGED_ACTIVATE'
                    ? 60 * 60_000
                    : kind.includes('RESET')
                        ? 15 * 60_000
                        : 30 * 60_000;
        const transport = channel === 'EMAIL'
            ? (0, delivery_config_1.localEmail)()
                ? 'LOCAL'
                : 'RESEND'
            : (0, delivery_config_1.localSms)()
                ? 'LOCAL'
                : 'TWILIO';
        await tx.identityDeliveryMessage.create({
            data: {
                id,
                channel,
                transport,
                kind,
                payload: (0, delivery_cipher_1.sealDelivery)(id, payload),
                expiresAt: new Date(Date.now() + ttl),
            },
        });
        return id;
    }
    async dispatch(id) {
        const rows = await this.db.$queryRaw `UPDATE "IdentityDeliveryMessage" SET attempts=attempts+1,"leaseUntil"=NOW()+interval '60 seconds' WHERE id=${id}::uuid AND status='PENDING' AND "nextAttemptAt"<=NOW() AND ("leaseUntil" IS NULL OR "leaseUntil"<NOW()) AND "expiresAt">NOW() AND attempts<4 RETURNING id,channel,transport,kind,payload,attempts`;
        const row = rows[0];
        if (!row)
            return;
        try {
            const payload = (0, delivery_cipher_1.openDelivery)(row.id, row.payload);
            let receipt;
            const capture = row.transport === 'LOCAL';
            if (capture) {
                if (!(row.channel === 'EMAIL' ? (0, delivery_config_1.localEmail)() : (0, delivery_config_1.localSms)()))
                    throw new Error('Original local transport unavailable');
                const directory = (0, node_path_1.resolve)(process.cwd(), '.local-auth');
                await (0, promises_1.mkdir)(directory, { recursive: true });
                try {
                    await (0, promises_1.writeFile)((0, node_path_1.resolve)(directory, `${row.id}.json`), JSON.stringify({ ...payload, createdAt: new Date().toISOString() }), { flag: 'wx', mode: 0o600 });
                }
                catch (error) {
                    if (error.code !== 'EEXIST')
                        throw error;
                }
            }
            else if (row.channel === 'EMAIL') {
                if (!(0, delivery_config_1.emailConfigured)())
                    throw new common_1.ServiceUnavailableException('Email delivery unavailable');
                const route = payload.kind.includes('ACTIVATE')
                    ? 'activate'
                    : payload.kind === 'EMAIL_VERIFY'
                        ? 'verify'
                        : 'reset';
                const label = route === 'activate'
                    ? 'Activate your iSchoolie account'
                    : route === 'verify'
                        ? 'Verify your iSchoolie email'
                        : 'Recover your iSchoolie account';
                const origin = process.env.AUTH_WEB_ORIGIN ?? 'http://localhost:3000';
                if (process.env.NODE_ENV === 'production' &&
                    !origin.startsWith('https://'))
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
            }
            else {
                if (!(0, delivery_config_1.smsConfigured)())
                    throw new common_1.ServiceUnavailableException('SMS delivery unavailable');
                const sid = process.env.AUTH_TWILIO_ACCOUNT_SID;
                const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${sid}:${process.env.AUTH_TWILIO_AUTH_TOKEN}`).toString('base64')}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        To: payload.phone,
                        From: process.env.AUTH_TWILIO_FROM,
                        Body: `Your iSchoolie verification code is ${payload.code}. It expires in 5 minutes. Never share it.`,
                    }),
                    redirect: 'error',
                    signal: AbortSignal.timeout(15000),
                });
                if (!response.ok)
                    throw new SmsDeliveryRefusal(response.status);
                const result = (await response.json());
                if (!result.sid)
                    throw new Error('SMS provider receipt unavailable');
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
        }
        catch (error) {
            await this.db.identityDeliveryMessage.updateMany({
                where: { id, attempts: row.attempts, status: 'PENDING' },
                data: {
                    status: row.attempts >= 4 ||
                        ((error instanceof mail_1.MailError ||
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
        for (const row of rows)
            await this.dispatch(row.id);
        return { attempted: rows.length };
    }
};
exports.IdentityDelivery = IdentityDelivery;
exports.IdentityDelivery = IdentityDelivery = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_1.Mailer])
], IdentityDelivery);
//# sourceMappingURL=identity.delivery.js.map