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
exports.ProvisioningService = void 0;
exports.importedStaffSequence = importedStaffSequence;
exports.credentialRow = credentialRow;
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const prisma_service_1 = require("../database/prisma.service");
const identity_util_1 = require("./identity.util");
const session_access_1 = require("./session-access");
const identity_delivery_1 = require("./identity.delivery");
function importedStaffSequence(identifier, year, type) {
    const match = /^(\d{4})-(TCH|ADM|SUP)-(\d+)$/i.exec(identifier);
    if (!match)
        return undefined;
    const value = BigInt(match[3]);
    if (Number(match[1]) !== year ||
        match[2].toUpperCase() !== type ||
        value < 1n ||
        value > 9223372036854775807n)
        throw new common_1.BadRequestException('Staff ID conflicts with year, type, or sequence limits');
    return value;
}
function credentialRow(input) {
    const body = (0, identity_util_1.bodyFields)(input, [
        'kind',
        'displayName',
        'contactEmail',
        'identifier',
        'staffType',
        'hiringYear',
    ]);
    const kind = (0, identity_util_1.text)(body, 'kind', 10);
    const common = {
        displayName: (0, identity_util_1.text)(body, 'displayName', 100),
        contactEmail: (0, identity_util_1.canonicalEmail)((0, identity_util_1.text)(body, 'contactEmail')),
    };
    if (kind === 'STUDENT') {
        if (body.staffType !== undefined || body.hiringYear !== undefined)
            throw new common_1.BadRequestException('Student rows cannot contain staff fields');
        return {
            ...common,
            kind,
            identifier: (0, identity_util_1.canonicalIdentifier)((0, identity_util_1.text)(body, 'identifier', 64), 'PRESERVE'),
        };
    }
    if (kind !== 'STAFF' ||
        typeof body.hiringYear !== 'number' ||
        typeof body.staffType !== 'string')
        throw new common_1.BadRequestException('Invalid credential row');
    (0, identity_util_1.staffIdentifier)(body.hiringYear, body.staffType, 1n);
    const identifier = body.identifier === undefined || body.identifier === ''
        ? undefined
        : (0, identity_util_1.canonicalIdentifier)((0, identity_util_1.text)(body, 'identifier', 64), 'PRESERVE');
    if (identifier)
        importedStaffSequence(identifier, body.hiringYear, body.staffType);
    return {
        ...common,
        kind,
        identifier,
        hiringYear: body.hiringYear,
        staffType: body.staffType,
    };
}
let ProvisioningService = class ProvisioningService {
    db;
    access;
    delivery;
    dummy = (0, argon2_1.hash)((0, identity_util_1.token)(), {
        type: argon2_1.argon2id,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 1,
    });
    constructor(db, access, delivery) {
        this.db = db;
        this.access = access;
        this.delivery = delivery;
    }
    async authorize(tx, actor, institutionId, permissions) {
        const rows = await tx.$queryRaw `SELECT s.id FROM "IdentitySession" s JOIN "User" u ON u.id = s."userId" WHERE s.id = ${actor.id} AND u.id = ${actor.userId}::uuid AND u.status = 'ACTIVE' AND u."authVersion" = s."authVersion" AND s.mfa = 'verified' AND s."expiresAt" > NOW() AND s."lastActiveAt" > NOW() - interval '30 minutes' FOR SHARE OF s, u`;
        if (!rows.length ||
            actor.mfa !== 'verified' ||
            Number(actor.metadata?.verifiedAt ?? 0) < Date.now() - 10 * 60_000)
            throw new common_1.ForbiddenException('Recent privileged MFA session required');
        const grants = await tx.$queryRaw `SELECT permission FROM "InstitutionGrant" WHERE "userId" = ${actor.userId}::uuid AND "institutionId" = ${institutionId}::uuid AND active = true FOR SHARE`;
        if (!permissions.every((permission) => grants.some((grant) => grant.permission === permission)))
            throw new common_1.ForbiddenException('Institution permission required');
        const institution = await tx.institutionIdentity.findUnique({
            where: { id: institutionId },
        });
        if (!institution?.active)
            throw new common_1.ForbiddenException('Institution unavailable');
        return institution;
    }
    async insert(tx, institution, row) {
        let identifier = row.identifier;
        let sequence;
        if (row.kind === 'STAFF' && !row.identifier) {
            const counter = await tx.staffIdentitySequence.upsert({
                where: {
                    institutionId_year_staffType: {
                        institutionId: institution.id,
                        year: row.hiringYear,
                        staffType: row.staffType,
                    },
                },
                create: {
                    institutionId: institution.id,
                    year: row.hiringYear,
                    staffType: row.staffType,
                    value: 1n,
                },
                update: { value: { increment: 1n } },
            });
            sequence = counter.value;
            identifier = (0, identity_util_1.staffIdentifier)(row.hiringYear, row.staffType, sequence, institution.sequencePadding);
        }
        if (row.kind === 'STAFF' && row.identifier) {
            sequence = importedStaffSequence(identifier, row.hiringYear, row.staffType);
            if (sequence !== undefined) {
                await tx.$executeRaw `INSERT INTO "StaffIdentitySequence" ("institutionId", year, "staffType", value) VALUES (${institution.id}::uuid, ${row.hiringYear}, ${row.staffType}, ${sequence}) ON CONFLICT ("institutionId", year, "staffType") DO UPDATE SET value = GREATEST("StaffIdentitySequence".value, EXCLUDED.value)`;
            }
        }
        const user = await tx.user.create({
            data: {
                displayName: row.displayName,
                accountKind: row.kind,
                status: 'PENDING',
            },
        });
        const login = await tx.institutionalLogin.create({
            data: {
                userId: user.id,
                institutionId: institution.id,
                kind: row.kind,
                identifier,
                normalized: (0, identity_util_1.canonicalIdentifier)(identifier, institution.identifierCase),
                contactEmail: row.contactEmail,
                staffType: row.staffType,
                hiringYear: row.hiringYear,
                sequence,
                legacy: row.kind === 'STAFF' && !!row.identifier && sequence === undefined,
            },
        });
        await tx.identityAudit.create({
            data: { userId: user.id, type: `INSTITUTION_${row.kind}_ISSUED` },
        });
        return {
            id: login.id,
            identifier: login.identifier,
            kind: login.kind,
            status: login.status,
        };
    }
    async provision(actor, institutionId, input) {
        const row = credentialRow(input);
        try {
            return await this.db.$transaction(async (tx) => {
                const institution = await this.authorize(tx, actor, institutionId, [
                    `PROVISION_${row.kind}`,
                ]);
                return this.insert(tx, institution, row);
            });
        }
        catch (error) {
            if (error.code === 'P2002')
                throw new common_1.BadRequestException('Identifier already issued in this institution');
            throw error;
        }
    }
    async list(actor, institutionId) {
        return this.db.$transaction(async (tx) => {
            await this.authorize(tx, actor, institutionId, ['MANAGE_IDENTITIES']);
            const rows = await tx.institutionalLogin.findMany({
                where: { institutionId },
                orderBy: { createdAt: 'desc' },
                take: 200,
                select: {
                    id: true,
                    identifier: true,
                    kind: true,
                    status: true,
                    contactEmail: true,
                    user: { select: { displayName: true } },
                },
            });
            return { credentials: rows, limit: 200 };
        });
    }
    async preview(actor, institutionId, rows) {
        if (!Array.isArray(rows) || !rows.length || rows.length > 200)
            throw new common_1.BadRequestException('Import requires 1–200 rows');
        const errors = [];
        const validated = [];
        rows.forEach((row, index) => {
            try {
                validated.push(credentialRow(row));
            }
            catch (error) {
                errors.push({
                    row: index + 1,
                    message: error instanceof Error ? error.message : 'Invalid credential row',
                });
            }
        });
        if (errors.length)
            throw new common_1.BadRequestException({
                message: 'Import validation failed',
                errors,
            });
        return this.db.$transaction(async (tx) => {
            const permissions = [
                ...new Set(validated.map((row) => `PROVISION_${row.kind}`)),
            ];
            const institution = await this.authorize(tx, actor, institutionId, permissions);
            const seen = new Set();
            const sequences = new Set();
            for (const [index, row] of validated.entries()) {
                if (!row.identifier)
                    continue;
                const normalized = (0, identity_util_1.canonicalIdentifier)(row.identifier, institution.identifierCase);
                const key = `${row.kind}:${normalized}`;
                const sequence = row.kind === 'STAFF'
                    ? importedStaffSequence(row.identifier, row.hiringYear, row.staffType)
                    : undefined;
                const sequenceKey = `${row.hiringYear}:${row.staffType}:${sequence}`;
                const duplicate = seen.has(key) ||
                    (sequence !== undefined && sequences.has(sequenceKey)) ||
                    (await tx.institutionalLogin.findFirst({
                        where: {
                            institutionId,
                            OR: [
                                { kind: row.kind, normalized },
                                ...(sequence === undefined
                                    ? []
                                    : [
                                        {
                                            hiringYear: row.hiringYear,
                                            staffType: row.staffType,
                                            sequence,
                                        },
                                    ]),
                            ],
                        },
                    }));
                if (duplicate)
                    errors.push({
                        row: index + 1,
                        message: 'Identifier or staff sequence already issued in this institution or import',
                    });
                seen.add(key);
                if (sequence !== undefined)
                    sequences.add(sequenceKey);
            }
            if (errors.length)
                throw new common_1.BadRequestException({
                    message: 'Import validation failed',
                    errors,
                });
            const draft = await tx.identityImport.create({
                data: {
                    institutionId,
                    actorId: actor.userId,
                    rows: JSON.parse(JSON.stringify(validated)),
                    expiresAt: new Date(Date.now() + 30 * 60_000),
                },
            });
            return {
                id: draft.id,
                rowCount: validated.length,
                expiresAt: draft.expiresAt,
                rows: validated,
                message: 'Preview only. No accounts or passwords have been issued.',
            };
        });
    }
    async commit(actor, institutionId, importId) {
        try {
            return await this.db.$transaction(async (tx) => {
                await tx.$queryRaw `SELECT id FROM "IdentityImport" WHERE id = ${importId}::uuid FOR UPDATE`;
                const draft = await tx.identityImport.findUnique({
                    where: { id: importId },
                });
                if (!draft ||
                    draft.institutionId !== institutionId ||
                    draft.actorId !== actor.userId)
                    throw new common_1.ForbiddenException('Import unavailable');
                const rows = draft.rows.map(credentialRow);
                const institution = await this.authorize(tx, actor, institutionId, [
                    ...new Set(rows.map((row) => `PROVISION_${row.kind}`)),
                ]);
                if (draft.committedAt)
                    return { id: draft.id, credentials: draft.result, replay: true };
                if (draft.expiresAt <= new Date())
                    throw new common_1.BadRequestException('Import preview expired');
                const credentials = [];
                for (const [index, row] of rows.entries()) {
                    try {
                        credentials.push(await this.insert(tx, institution, row));
                    }
                    catch (error) {
                        if (error.code === 'P2002')
                            throw new common_1.BadRequestException({
                                message: 'Import was not committed',
                                errors: [
                                    {
                                        row: index + 1,
                                        message: 'Identifier or staff sequence conflict',
                                    },
                                ],
                            });
                        throw error;
                    }
                }
                await tx.identityImport.update({
                    where: { id: draft.id },
                    data: { committedAt: new Date(), result: credentials },
                });
                return { id: draft.id, credentials, replay: false };
            }, { timeout: 30000 });
        }
        catch (error) {
            if (error.code === 'P2002')
                throw new common_1.BadRequestException('Identifier conflict; import was not committed');
            throw error;
        }
    }
    async invite(actor, institutionId, identityId) {
        this.delivery.requireAvailable();
        const raw = (0, identity_util_1.token)();
        const messageId = await this.db.$transaction(async (tx) => {
            await this.authorize(tx, actor, institutionId, ['MANAGE_IDENTITIES']);
            const login = await tx.institutionalLogin.findFirst({
                where: { id: identityId, institutionId, status: 'ISSUED' },
                include: { user: true },
            });
            if (!login?.contactEmail)
                throw new common_1.BadRequestException('Credential is not awaiting activation');
            await tx.identityChallenge.create({
                data: {
                    userId: login.userId,
                    authVersion: login.user.authVersion,
                    identityId: login.id,
                    kind: 'INSTITUTION_ACTIVATE',
                    tokenHash: (0, identity_util_1.digest)(raw),
                    expiresAt: new Date(Date.now() + 24 * 60 * 60_000),
                },
            });
            return this.delivery.stageEmail(tx, login.contactEmail, 'INSTITUTION_ACTIVATE', raw);
        });
        await this.delivery.dispatch(messageId);
        return {
            message: 'Activation instructions passed to the configured delivery channel',
        };
    }
    async requestRecovery(institutionCode, identifier) {
        this.delivery.requireAvailable();
        const institution = await this.db.institutionIdentity.findUnique({
            where: { code: (0, identity_util_1.canonicalIdentifier)(institutionCode) },
        });
        const login = institution?.active
            ? await this.db.institutionalLogin.findUnique({
                where: {
                    institutionId_kind_normalized: {
                        institutionId: institution.id,
                        kind: 'STAFF',
                        normalized: (0, identity_util_1.canonicalIdentifier)(identifier, institution.identifierCase),
                    },
                },
                include: { user: true },
            })
            : null;
        if (login?.status === 'ACTIVE' &&
            login.user.status === 'ACTIVE' &&
            login.contactEmail) {
            const raw = (0, identity_util_1.token)();
            const messageId = await this.db.$transaction(async (tx) => {
                await tx.identityChallenge.create({
                    data: {
                        userId: login.userId,
                        authVersion: login.user.authVersion,
                        identityId: login.id,
                        kind: 'INSTITUTION_RESET',
                        tokenHash: (0, identity_util_1.digest)(raw),
                        expiresAt: new Date(Date.now() + 15 * 60_000),
                    },
                });
                return this.delivery.stageEmail(tx, login.contactEmail, 'INSTITUTION_RESET', raw);
            });
            this.delivery.kick(messageId);
        }
        return {
            message: 'If this staff credential is eligible, recovery instructions are available through its institution-managed channel. Students must contact their institution.',
        };
    }
    async recover(actor, institutionId, identityId) {
        this.delivery.requireAvailable();
        const raw = (0, identity_util_1.token)();
        const messageId = await this.db.$transaction(async (tx) => {
            await this.authorize(tx, actor, institutionId, ['MANAGE_IDENTITIES']);
            const login = await tx.institutionalLogin.findFirst({
                where: {
                    id: identityId,
                    institutionId,
                    status: 'ACTIVE',
                    user: { status: { in: ['ACTIVE', 'RESTRICTED'] } },
                },
                include: { user: true },
            });
            if (!login?.contactEmail)
                throw new common_1.BadRequestException('Credential unavailable');
            await tx.identityChallenge.create({
                data: {
                    userId: login.userId,
                    authVersion: login.user.authVersion,
                    identityId: login.id,
                    kind: 'INSTITUTION_RESET',
                    tokenHash: (0, identity_util_1.digest)(raw),
                    expiresAt: new Date(Date.now() + 15 * 60_000),
                },
            });
            return this.delivery.stageEmail(tx, login.contactEmail, 'INSTITUTION_RESET', raw);
        });
        await this.delivery.dispatch(messageId);
        return {
            message: 'Recovery queued for the institution-managed channel. MFA and student restrictions remain enforced.',
        };
    }
    async claim(actor, raw) {
        await this.db.$transaction(async (tx) => {
            const challenge = await tx.identityChallenge.findUnique({
                where: { tokenHash: (0, identity_util_1.digest)(raw) },
            });
            if (!challenge?.identityId ||
                challenge.kind !== 'INSTITUTION_ACTIVATE' ||
                challenge.consumedAt ||
                challenge.expiresAt <= new Date())
                throw new common_1.BadRequestException('Invalid or expired invitation');
            await tx.$queryRaw `SELECT id FROM "User" WHERE id IN (${actor.userId}::uuid,${challenge.userId}::uuid) ORDER BY id FOR UPDATE`;
            const session = await tx.identitySession.findFirst({
                where: {
                    id: actor.id,
                    mfa: 'verified',
                    expiresAt: { gt: new Date() },
                    user: {
                        status: 'ACTIVE',
                        authVersion: Number(actor.metadata?.authVersion),
                    },
                },
            });
            const target = await tx.user.findUniqueOrThrow({
                where: { id: actor.userId },
            });
            const pending = await tx.user.findUniqueOrThrow({
                where: { id: challenge.userId },
            });
            const login = await tx.institutionalLogin.findUniqueOrThrow({
                where: { id: challenge.identityId },
                include: { institution: true },
            });
            if (!session ||
                !target.passwordHash ||
                pending.authVersion !== challenge.authVersion ||
                pending.status !== 'PENDING' ||
                pending.accountKind !== 'STAFF' ||
                login.kind !== 'STAFF' ||
                login.status !== 'ISSUED' ||
                !login.institution.active)
                throw new common_1.BadRequestException('Invitation cannot be associated. Student association requires an approved safeguarding policy.');
            if (!(await tx.identityChallenge.updateMany({
                where: {
                    id: challenge.id,
                    consumedAt: null,
                    expiresAt: { gt: new Date() },
                },
                data: { consumedAt: new Date() },
            })).count)
                throw new common_1.BadRequestException('Invitation already used');
            await tx.institutionalLogin.update({
                where: { id: login.id },
                data: { userId: target.id, status: 'ACTIVE', activatedAt: new Date() },
            });
            await tx.user.update({
                where: { id: pending.id },
                data: { status: 'CLOSED', authVersion: { increment: 1 } },
            });
            await tx.identityChallenge.updateMany({
                where: { userId: pending.id, consumedAt: null },
                data: { consumedAt: new Date() },
            });
            await tx.user.update({
                where: { id: target.id },
                data: { authVersion: { increment: 1 } },
            });
            await tx.identitySession.deleteMany({ where: { userId: target.id } });
            await tx.identityAudit.create({
                data: {
                    userId: target.id,
                    type: 'INSTITUTION_STAFF_IDENTITY_ASSOCIATED',
                },
            });
        });
        return {
            message: 'Staff identifier associated after proof of both accounts. Sign in again. No institution permission was granted.',
        };
    }
    async activate(raw, passwordInput) {
        const passwordHash = await (0, argon2_1.hash)((0, identity_util_1.validPassword)(passwordInput), {
            type: argon2_1.argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 1,
        });
        await this.db.$transaction(async (tx) => {
            const challenge = await tx.identityChallenge.findUnique({
                where: { tokenHash: (0, identity_util_1.digest)(raw) },
            });
            if (!challenge ||
                !['INSTITUTION_ACTIVATE', 'PRIVILEGED_ACTIVATE'].includes(challenge.kind) ||
                challenge.consumedAt ||
                challenge.expiresAt <= new Date())
                throw new common_1.BadRequestException('Invalid or expired activation');
            await tx.$queryRaw `SELECT id FROM "User" WHERE id = ${challenge.userId}::uuid FOR UPDATE`;
            const user = await tx.user.findUniqueOrThrow({
                where: { id: challenge.userId },
            });
            if (user.status !== 'PENDING' ||
                user.authVersion !== challenge.authVersion)
                throw new common_1.BadRequestException('Account already activated or unavailable');
            if (!(await tx.identityChallenge.updateMany({
                where: {
                    id: challenge.id,
                    consumedAt: null,
                    expiresAt: { gt: new Date() },
                },
                data: { consumedAt: new Date() },
            })).count)
                throw new common_1.BadRequestException('Activation already used');
            if (challenge.identityId) {
                const login = await tx.institutionalLogin.findUnique({
                    where: { id: challenge.identityId },
                    include: { institution: true },
                });
                if (!login || !login.institution.active || login.status !== 'ISSUED')
                    throw new common_1.BadRequestException('Credential unavailable');
                await tx.institutionalLogin.update({
                    where: { id: login.id },
                    data: { status: 'ACTIVE', activatedAt: new Date() },
                });
            }
            await tx.user.update({
                where: { id: user.id },
                data: {
                    passwordHash,
                    status: user.accountKind === 'STUDENT' ? 'RESTRICTED' : 'ACTIVE',
                    ...(challenge.kind === 'PRIVILEGED_ACTIVATE'
                        ? { emailVerifiedAt: new Date() }
                        : {}),
                    authVersion: { increment: 1 },
                },
            });
            await tx.identityChallenge.updateMany({
                where: { userId: user.id, consumedAt: null },
                data: { consumedAt: new Date() },
            });
            await tx.identityAudit.create({
                data: { userId: user.id, type: 'INSTITUTION_CREDENTIAL_ACTIVATED' },
            });
        });
        return {
            message: 'Credential activated. Students retain restricted access until an approved policy authorizes more.',
        };
    }
    async login(institutionCode, kind, identifier, password, replacing) {
        if (!['STUDENT', 'STAFF'].includes(kind) ||
            typeof password !== 'string' ||
            password.length > 128)
            throw new common_1.UnauthorizedException('Invalid sign-in details');
        const institution = await this.db.institutionIdentity.findUnique({
            where: { code: (0, identity_util_1.canonicalIdentifier)(institutionCode) },
        });
        const login = institution?.active
            ? await this.db.institutionalLogin.findUnique({
                where: {
                    institutionId_kind_normalized: {
                        institutionId: institution.id,
                        kind,
                        normalized: (0, identity_util_1.canonicalIdentifier)(identifier, institution.identifierCase),
                    },
                },
                include: { user: true },
            })
            : null;
        const matches = await (0, argon2_1.verify)(login?.user.passwordHash ?? (await this.dummy), password).catch(() => false);
        if (!matches ||
            !login ||
            login.status !== 'ACTIVE' ||
            !['ACTIVE', 'RESTRICTED'].includes(login.user.status))
            throw new common_1.UnauthorizedException('Invalid sign-in details');
        return this.access.issue(login.user, replacing);
    }
    async revoke(actor, institutionId, identityId) {
        await this.db.$transaction(async (tx) => {
            await this.authorize(tx, actor, institutionId, ['MANAGE_IDENTITIES']);
            const login = await tx.institutionalLogin.findFirst({
                where: { id: identityId, institutionId },
            });
            if (!login)
                throw new common_1.BadRequestException('Credential unavailable');
            await tx.institutionalLogin.update({
                where: { id: login.id },
                data: { status: 'REVOKED' },
            });
            await tx.user.update({
                where: { id: login.userId },
                data: { authVersion: { increment: 1 } },
            });
            await tx.identitySession.deleteMany({ where: { userId: login.userId } });
            await tx.identityChallenge.updateMany({
                where: { userId: login.userId, consumedAt: null },
                data: { consumedAt: new Date() },
            });
        });
        return { message: 'Credential revoked and sessions ended' };
    }
};
exports.ProvisioningService = ProvisioningService;
exports.ProvisioningService = ProvisioningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        session_access_1.SessionAccess,
        identity_delivery_1.IdentityDelivery])
], ProvisioningService);
//# sourceMappingURL=provisioning.service.js.map