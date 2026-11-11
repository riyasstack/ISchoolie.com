"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.JsonNullValueInput = exports.SortOrder = exports.IdentityDeliveryMessageScalarFieldEnum = exports.IdentityNativeBrokerScalarFieldEnum = exports.IdentityPhoneChallengeScalarFieldEnum = exports.IdentityOidcStateScalarFieldEnum = exports.IdentityImportScalarFieldEnum = exports.IdentityMfaFailureScalarFieldEnum = exports.IdentityRecoveryCodeScalarFieldEnum = exports.IdentityTotpScalarFieldEnum = exports.PlatformOperatorScalarFieldEnum = exports.InstitutionGrantScalarFieldEnum = exports.IdentityAuditScalarFieldEnum = exports.IdentityRateLimitScalarFieldEnum = exports.IdentityChallengeScalarFieldEnum = exports.ProviderIdentityScalarFieldEnum = exports.PhoneIdentityScalarFieldEnum = exports.StaffIdentitySequenceScalarFieldEnum = exports.InstitutionalLoginScalarFieldEnum = exports.InstitutionIdentityScalarFieldEnum = exports.IdentitySessionScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.10.1",
    engine: "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    IdentitySession: 'IdentitySession',
    InstitutionIdentity: 'InstitutionIdentity',
    InstitutionalLogin: 'InstitutionalLogin',
    StaffIdentitySequence: 'StaffIdentitySequence',
    PhoneIdentity: 'PhoneIdentity',
    ProviderIdentity: 'ProviderIdentity',
    IdentityChallenge: 'IdentityChallenge',
    IdentityRateLimit: 'IdentityRateLimit',
    IdentityAudit: 'IdentityAudit',
    InstitutionGrant: 'InstitutionGrant',
    PlatformOperator: 'PlatformOperator',
    IdentityTotp: 'IdentityTotp',
    IdentityRecoveryCode: 'IdentityRecoveryCode',
    IdentityMfaFailure: 'IdentityMfaFailure',
    IdentityImport: 'IdentityImport',
    IdentityOidcState: 'IdentityOidcState',
    IdentityPhoneChallenge: 'IdentityPhoneChallenge',
    IdentityNativeBroker: 'IdentityNativeBroker',
    IdentityDeliveryMessage: 'IdentityDeliveryMessage'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    emailCanonical: 'emailCanonical',
    passwordHash: 'passwordHash',
    displayName: 'displayName',
    status: 'status',
    accountKind: 'accountKind',
    authVersion: 'authVersion',
    emailVerifiedAt: 'emailVerifiedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.IdentitySessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    authVersion: 'authVersion',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt',
    lastActiveAt: 'lastActiveAt',
    mfa: 'mfa',
    metadata: 'metadata'
};
exports.InstitutionIdentityScalarFieldEnum = {
    id: 'id',
    code: 'code',
    name: 'name',
    identifierCase: 'identifierCase',
    sequencePadding: 'sequencePadding',
    active: 'active',
    createdAt: 'createdAt'
};
exports.InstitutionalLoginScalarFieldEnum = {
    id: 'id',
    institutionId: 'institutionId',
    userId: 'userId',
    kind: 'kind',
    identifier: 'identifier',
    normalized: 'normalized',
    status: 'status',
    staffType: 'staffType',
    hiringYear: 'hiringYear',
    legacy: 'legacy',
    sequence: 'sequence',
    activatedAt: 'activatedAt',
    contactEmail: 'contactEmail',
    createdAt: 'createdAt'
};
exports.StaffIdentitySequenceScalarFieldEnum = {
    institutionId: 'institutionId',
    year: 'year',
    staffType: 'staffType',
    value: 'value'
};
exports.PhoneIdentityScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    phone: 'phone',
    verifiedAt: 'verifiedAt'
};
exports.ProviderIdentityScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    subject: 'subject',
    linkedAt: 'linkedAt'
};
exports.IdentityChallengeScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    kind: 'kind',
    authVersion: 'authVersion',
    identityId: 'identityId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt',
    createdAt: 'createdAt'
};
exports.IdentityRateLimitScalarFieldEnum = {
    key: 'key',
    count: 'count',
    expiresAt: 'expiresAt'
};
exports.IdentityAuditScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    createdAt: 'createdAt'
};
exports.InstitutionGrantScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    institutionId: 'institutionId',
    permission: 'permission',
    active: 'active'
};
exports.PlatformOperatorScalarFieldEnum = {
    userId: 'userId',
    active: 'active'
};
exports.IdentityTotpScalarFieldEnum = {
    userId: 'userId',
    secret: 'secret',
    confirmed: 'confirmed',
    pendingSecret: 'pendingSecret',
    lastUsedStep: 'lastUsedStep'
};
exports.IdentityRecoveryCodeScalarFieldEnum = {
    userId: 'userId',
    hash: 'hash'
};
exports.IdentityMfaFailureScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    at: 'at'
};
exports.IdentityImportScalarFieldEnum = {
    id: 'id',
    institutionId: 'institutionId',
    actorId: 'actorId',
    rows: 'rows',
    result: 'result',
    expiresAt: 'expiresAt',
    committedAt: 'committedAt'
};
exports.IdentityOidcStateScalarFieldEnum = {
    state: 'state',
    data: 'data',
    expiresAt: 'expiresAt'
};
exports.IdentityPhoneChallengeScalarFieldEnum = {
    id: 'id',
    phone: 'phone',
    kind: 'kind',
    codeHash: 'codeHash',
    payload: 'payload',
    userId: 'userId',
    attempts: 'attempts',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt',
    createdAt: 'createdAt'
};
exports.IdentityNativeBrokerScalarFieldEnum = {
    id: 'id',
    provider: 'provider',
    challenge: 'challenge',
    clientState: 'clientState',
    linkUserId: 'linkUserId',
    linkSessionId: 'linkSessionId',
    oidcState: 'oidcState',
    userId: 'userId',
    authVersion: 'authVersion',
    codeHash: 'codeHash',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt'
};
exports.IdentityDeliveryMessageScalarFieldEnum = {
    id: 'id',
    channel: 'channel',
    transport: 'transport',
    kind: 'kind',
    payload: 'payload',
    status: 'status',
    attempts: 'attempts',
    nextAttemptAt: 'nextAttemptAt',
    leaseUntil: 'leaseUntil',
    expiresAt: 'expiresAt',
    providerReceipt: 'providerReceipt',
    errorCode: 'errorCode',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map