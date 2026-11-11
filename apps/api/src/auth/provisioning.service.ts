import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { type SessionRecord } from '@nestjs/authentication';
import { hash, verify, argon2id } from 'argon2';
import { PrismaService } from '../database/prisma.service';
import type { Prisma } from '../generated/prisma/client';
import {
  bodyFields,
  canonicalEmail,
  canonicalIdentifier,
  digest,
  staffIdentifier,
  text,
  token,
  validPassword,
} from './identity.util';
import { SessionAccess } from './session-access';
import { IdentityDelivery } from './identity.delivery';

type Tx = Prisma.TransactionClient;
export type CredentialRow = {
  kind: 'STUDENT' | 'STAFF';
  displayName: string;
  contactEmail: string;
  identifier?: string;
  staffType?: string;
  hiringYear?: number;
};
export function importedStaffSequence(
  identifier: string,
  year: number,
  type: string,
): bigint | undefined {
  const match = /^(\d{4})-(TCH|ADM|SUP)-(\d+)$/i.exec(identifier);
  if (!match) return undefined;
  const value = BigInt(match[3]);
  if (
    Number(match[1]) !== year ||
    match[2].toUpperCase() !== type ||
    value < 1n ||
    value > 9223372036854775807n
  )
    throw new BadRequestException(
      'Staff ID conflicts with year, type, or sequence limits',
    );
  return value;
}
export function credentialRow(input: unknown): CredentialRow {
  const body = bodyFields(input, [
    'kind',
    'displayName',
    'contactEmail',
    'identifier',
    'staffType',
    'hiringYear',
  ]);
  const kind = text(body, 'kind', 10);
  const common = {
    displayName: text(body, 'displayName', 100),
    contactEmail: canonicalEmail(text(body, 'contactEmail')),
  };
  if (kind === 'STUDENT') {
    if (body.staffType !== undefined || body.hiringYear !== undefined)
      throw new BadRequestException('Student rows cannot contain staff fields');
    return {
      ...common,
      kind,
      identifier: canonicalIdentifier(text(body, 'identifier', 64), 'PRESERVE'),
    };
  }
  if (
    kind !== 'STAFF' ||
    typeof body.hiringYear !== 'number' ||
    typeof body.staffType !== 'string'
  )
    throw new BadRequestException('Invalid credential row');
  staffIdentifier(body.hiringYear, body.staffType, 1n);
  const identifier =
    body.identifier === undefined || body.identifier === ''
      ? undefined
      : canonicalIdentifier(text(body, 'identifier', 64), 'PRESERVE');
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

@Injectable()
export class ProvisioningService {
  private readonly dummy = hash(token(), {
    type: argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1,
  });
  constructor(
    private readonly db: PrismaService,
    private readonly access: SessionAccess,
    private readonly delivery: IdentityDelivery,
  ) {}
  async authorize(
    tx: Tx,
    actor: SessionRecord,
    institutionId: string,
    permissions: string[],
  ) {
    // Lock authorization evidence for the transaction; revocation cannot race a
    // successful provisioning commit using an earlier permission read.
    const rows = await tx.$queryRaw<
      { id: string }[]
    >`SELECT s.id FROM "IdentitySession" s JOIN "User" u ON u.id = s."userId" WHERE s.id = ${actor.id} AND u.id = ${actor.userId}::uuid AND u.status = 'ACTIVE' AND u."authVersion" = s."authVersion" AND s.mfa = 'verified' AND s."expiresAt" > NOW() AND s."lastActiveAt" > NOW() - interval '30 minutes' FOR SHARE OF s, u`;
    if (
      !rows.length ||
      actor.mfa !== 'verified' ||
      Number(actor.metadata?.verifiedAt ?? 0) < Date.now() - 10 * 60_000
    )
      throw new ForbiddenException('Recent privileged MFA session required');
    const grants = await tx.$queryRaw<
      { permission: string }[]
    >`SELECT permission FROM "InstitutionGrant" WHERE "userId" = ${actor.userId}::uuid AND "institutionId" = ${institutionId}::uuid AND active = true FOR SHARE`;
    if (
      !permissions.every((permission) =>
        grants.some((grant) => grant.permission === permission),
      )
    )
      throw new ForbiddenException('Institution permission required');
    const institution = await tx.institutionIdentity.findUnique({
      where: { id: institutionId },
    });
    if (!institution?.active)
      throw new ForbiddenException('Institution unavailable');
    return institution;
  }
  private async insert(
    tx: Tx,
    institution: {
      id: string;
      identifierCase: string;
      sequencePadding: number;
    },
    row: CredentialRow,
  ) {
    let identifier = row.identifier!;
    let sequence: bigint | undefined;
    if (row.kind === 'STAFF' && !row.identifier) {
      const counter = await tx.staffIdentitySequence.upsert({
        where: {
          institutionId_year_staffType: {
            institutionId: institution.id,
            year: row.hiringYear!,
            staffType: row.staffType!,
          },
        },
        create: {
          institutionId: institution.id,
          year: row.hiringYear!,
          staffType: row.staffType!,
          value: 1n,
        },
        update: { value: { increment: 1n } },
      });
      sequence = counter.value;
      identifier = staffIdentifier(
        row.hiringYear!,
        row.staffType!,
        sequence,
        institution.sequencePadding,
      );
    }
    if (row.kind === 'STAFF' && row.identifier) {
      sequence = importedStaffSequence(
        identifier,
        row.hiringYear!,
        row.staffType!,
      );
      if (sequence !== undefined) {
        await tx.$executeRaw`INSERT INTO "StaffIdentitySequence" ("institutionId", year, "staffType", value) VALUES (${institution.id}::uuid, ${row.hiringYear!}, ${row.staffType!}, ${sequence}) ON CONFLICT ("institutionId", year, "staffType") DO UPDATE SET value = GREATEST("StaffIdentitySequence".value, EXCLUDED.value)`;
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
        normalized: canonicalIdentifier(identifier, institution.identifierCase),
        contactEmail: row.contactEmail,
        staffType: row.staffType,
        hiringYear: row.hiringYear,
        sequence,
        legacy:
          row.kind === 'STAFF' && !!row.identifier && sequence === undefined,
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
  async provision(actor: SessionRecord, institutionId: string, input: unknown) {
    const row = credentialRow(input);
    try {
      return await this.db.$transaction(async (tx) => {
        const institution = await this.authorize(tx, actor, institutionId, [
          `PROVISION_${row.kind}`,
        ]);
        return this.insert(tx, institution, row);
      });
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002')
        throw new BadRequestException(
          'Identifier already issued in this institution',
        );
      throw error;
    }
  }
  async list(actor: SessionRecord, institutionId: string) {
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
  async preview(actor: SessionRecord, institutionId: string, rows: unknown) {
    if (!Array.isArray(rows) || !rows.length || rows.length > 200)
      throw new BadRequestException('Import requires 1–200 rows');
    const errors: { row: number; message: string }[] = [];
    const validated: CredentialRow[] = [];
    rows.forEach((row, index) => {
      try {
        validated.push(credentialRow(row));
      } catch (error) {
        errors.push({
          row: index + 1,
          message:
            error instanceof Error ? error.message : 'Invalid credential row',
        });
      }
    });
    if (errors.length)
      throw new BadRequestException({
        message: 'Import validation failed',
        errors,
      });
    return this.db.$transaction(async (tx) => {
      const permissions = [
        ...new Set(validated.map((row) => `PROVISION_${row.kind}`)),
      ];
      const institution = await this.authorize(
        tx,
        actor,
        institutionId,
        permissions,
      );
      const seen = new Set<string>();
      const sequences = new Set<string>();
      for (const [index, row] of validated.entries()) {
        if (!row.identifier) continue;
        const normalized = canonicalIdentifier(
          row.identifier,
          institution.identifierCase,
        );
        const key = `${row.kind}:${normalized}`;
        const sequence =
          row.kind === 'STAFF'
            ? importedStaffSequence(
                row.identifier,
                row.hiringYear!,
                row.staffType!,
              )
            : undefined;
        const sequenceKey = `${row.hiringYear}:${row.staffType}:${sequence}`;
        const duplicate =
          seen.has(key) ||
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
            message:
              'Identifier or staff sequence already issued in this institution or import',
          });
        seen.add(key);
        if (sequence !== undefined) sequences.add(sequenceKey);
      }
      if (errors.length)
        throw new BadRequestException({
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
  async commit(actor: SessionRecord, institutionId: string, importId: string) {
    try {
      return await this.db.$transaction(
        async (tx) => {
          await tx.$queryRaw`SELECT id FROM "IdentityImport" WHERE id = ${importId}::uuid FOR UPDATE`;
          const draft = await tx.identityImport.findUnique({
            where: { id: importId },
          });
          if (
            !draft ||
            draft.institutionId !== institutionId ||
            draft.actorId !== actor.userId
          )
            throw new ForbiddenException('Import unavailable');
          const rows = (draft.rows as unknown[]).map(credentialRow);
          const institution = await this.authorize(tx, actor, institutionId, [
            ...new Set(rows.map((row) => `PROVISION_${row.kind}`)),
          ]);
          if (draft.committedAt)
            return { id: draft.id, credentials: draft.result, replay: true };
          if (draft.expiresAt <= new Date())
            throw new BadRequestException('Import preview expired');
          const credentials = [];
          for (const [index, row] of rows.entries()) {
            try {
              credentials.push(await this.insert(tx, institution, row));
            } catch (error) {
              if ((error as { code?: string }).code === 'P2002')
                throw new BadRequestException({
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
        },
        { timeout: 30000 },
      );
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002')
        throw new BadRequestException(
          'Identifier conflict; import was not committed',
        );
      throw error;
    }
  }
  async invite(
    actor: SessionRecord,
    institutionId: string,
    identityId: string,
  ) {
    this.delivery.requireAvailable();
    const raw = token();
    const messageId = await this.db.$transaction(async (tx) => {
      await this.authorize(tx, actor, institutionId, ['MANAGE_IDENTITIES']);
      const login = await tx.institutionalLogin.findFirst({
        where: { id: identityId, institutionId, status: 'ISSUED' },
        include: { user: true },
      });
      if (!login?.contactEmail)
        throw new BadRequestException('Credential is not awaiting activation');
      await tx.identityChallenge.create({
        data: {
          userId: login.userId,
          authVersion: login.user.authVersion,
          identityId: login.id,
          kind: 'INSTITUTION_ACTIVATE',
          tokenHash: digest(raw),
          expiresAt: new Date(Date.now() + 24 * 60 * 60_000),
        },
      });
      return this.delivery.stageEmail(
        tx,
        login.contactEmail,
        'INSTITUTION_ACTIVATE',
        raw,
      );
    });
    await this.delivery.dispatch(messageId);
    return {
      message:
        'Activation instructions passed to the configured delivery channel',
    };
  }
  async requestRecovery(institutionCode: string, identifier: string) {
    this.delivery.requireAvailable();
    const institution = await this.db.institutionIdentity.findUnique({
      where: { code: canonicalIdentifier(institutionCode) },
    });
    const login = institution?.active
      ? await this.db.institutionalLogin.findUnique({
          where: {
            institutionId_kind_normalized: {
              institutionId: institution.id,
              kind: 'STAFF',
              normalized: canonicalIdentifier(
                identifier,
                institution.identifierCase,
              ),
            },
          },
          include: { user: true },
        })
      : null;
    if (
      login?.status === 'ACTIVE' &&
      login.user.status === 'ACTIVE' &&
      login.contactEmail
    ) {
      const raw = token();
      const messageId = await this.db.$transaction(async (tx) => {
        await tx.identityChallenge.create({
          data: {
            userId: login.userId,
            authVersion: login.user.authVersion,
            identityId: login.id,
            kind: 'INSTITUTION_RESET',
            tokenHash: digest(raw),
            expiresAt: new Date(Date.now() + 15 * 60_000),
          },
        });
        return this.delivery.stageEmail(
          tx,
          login.contactEmail!,
          'INSTITUTION_RESET',
          raw,
        );
      });
      this.delivery.kick(messageId);
    }
    return {
      message:
        'If this staff credential is eligible, recovery instructions are available through its institution-managed channel. Students must contact their institution.',
    };
  }
  async recover(
    actor: SessionRecord,
    institutionId: string,
    identityId: string,
  ) {
    this.delivery.requireAvailable();
    const raw = token();
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
        throw new BadRequestException('Credential unavailable');
      await tx.identityChallenge.create({
        data: {
          userId: login.userId,
          authVersion: login.user.authVersion,
          identityId: login.id,
          kind: 'INSTITUTION_RESET',
          tokenHash: digest(raw),
          expiresAt: new Date(Date.now() + 15 * 60_000),
        },
      });
      return this.delivery.stageEmail(
        tx,
        login.contactEmail,
        'INSTITUTION_RESET',
        raw,
      );
    });
    await this.delivery.dispatch(messageId);
    return {
      message:
        'Recovery queued for the institution-managed channel. MFA and student restrictions remain enforced.',
    };
  }
  async claim(actor: SessionRecord, raw: string) {
    await this.db.$transaction(async (tx) => {
      const challenge = await tx.identityChallenge.findUnique({
        where: { tokenHash: digest(raw) },
      });
      if (
        !challenge?.identityId ||
        challenge.kind !== 'INSTITUTION_ACTIVATE' ||
        challenge.consumedAt ||
        challenge.expiresAt <= new Date()
      )
        throw new BadRequestException('Invalid or expired invitation');
      await tx.$queryRaw`SELECT id FROM "User" WHERE id IN (${actor.userId}::uuid,${challenge.userId}::uuid) ORDER BY id FOR UPDATE`;
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
      if (
        !session ||
        !target.passwordHash ||
        pending.authVersion !== challenge.authVersion ||
        pending.status !== 'PENDING' ||
        pending.accountKind !== 'STAFF' ||
        login.kind !== 'STAFF' ||
        login.status !== 'ISSUED' ||
        !login.institution.active
      )
        throw new BadRequestException(
          'Invitation cannot be associated. Student association requires an approved safeguarding policy.',
        );
      if (
        !(
          await tx.identityChallenge.updateMany({
            where: {
              id: challenge.id,
              consumedAt: null,
              expiresAt: { gt: new Date() },
            },
            data: { consumedAt: new Date() },
          })
        ).count
      )
        throw new BadRequestException('Invitation already used');
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
      message:
        'Staff identifier associated after proof of both accounts. Sign in again. No institution permission was granted.',
    };
  }
  async activate(raw: string, passwordInput: unknown) {
    const passwordHash = await hash(validPassword(passwordInput), {
      type: argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 1,
    });
    await this.db.$transaction(async (tx) => {
      const challenge = await tx.identityChallenge.findUnique({
        where: { tokenHash: digest(raw) },
      });
      if (
        !challenge ||
        !['INSTITUTION_ACTIVATE', 'PRIVILEGED_ACTIVATE'].includes(
          challenge.kind,
        ) ||
        challenge.consumedAt ||
        challenge.expiresAt <= new Date()
      )
        throw new BadRequestException('Invalid or expired activation');
      await tx.$queryRaw`SELECT id FROM "User" WHERE id = ${challenge.userId}::uuid FOR UPDATE`;
      const user = await tx.user.findUniqueOrThrow({
        where: { id: challenge.userId },
      });
      if (
        user.status !== 'PENDING' ||
        user.authVersion !== challenge.authVersion
      )
        throw new BadRequestException(
          'Account already activated or unavailable',
        );
      if (
        !(
          await tx.identityChallenge.updateMany({
            where: {
              id: challenge.id,
              consumedAt: null,
              expiresAt: { gt: new Date() },
            },
            data: { consumedAt: new Date() },
          })
        ).count
      )
        throw new BadRequestException('Activation already used');
      if (challenge.identityId) {
        const login = await tx.institutionalLogin.findUnique({
          where: { id: challenge.identityId },
          include: { institution: true },
        });
        if (!login || !login.institution.active || login.status !== 'ISSUED')
          throw new BadRequestException('Credential unavailable');
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
      message:
        'Credential activated. Students retain restricted access until an approved policy authorizes more.',
    };
  }
  async login(
    institutionCode: string,
    kind: string,
    identifier: string,
    password: unknown,
    replacing?: string,
  ) {
    if (
      !['STUDENT', 'STAFF'].includes(kind) ||
      typeof password !== 'string' ||
      password.length > 128
    )
      throw new UnauthorizedException('Invalid sign-in details');
    const institution = await this.db.institutionIdentity.findUnique({
      where: { code: canonicalIdentifier(institutionCode) },
    });
    const login = institution?.active
      ? await this.db.institutionalLogin.findUnique({
          where: {
            institutionId_kind_normalized: {
              institutionId: institution.id,
              kind,
              normalized: canonicalIdentifier(
                identifier,
                institution.identifierCase,
              ),
            },
          },
          include: { user: true },
        })
      : null;
    const matches = await verify(
      login?.user.passwordHash ?? (await this.dummy),
      password,
    ).catch(() => false);
    if (
      !matches ||
      !login ||
      login.status !== 'ACTIVE' ||
      !['ACTIVE', 'RESTRICTED'].includes(login.user.status)
    )
      throw new UnauthorizedException('Invalid sign-in details');
    return this.access.issue(login.user, replacing);
  }
  async revoke(
    actor: SessionRecord,
    institutionId: string,
    identityId: string,
  ) {
    await this.db.$transaction(async (tx) => {
      await this.authorize(tx, actor, institutionId, ['MANAGE_IDENTITIES']);
      const login = await tx.institutionalLogin.findFirst({
        where: { id: identityId, institutionId },
      });
      if (!login) throw new BadRequestException('Credential unavailable');
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
}
