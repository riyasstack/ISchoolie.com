import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client/runtime/client").DbNullClass;
export declare const JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
export declare const AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly IdentitySession: "IdentitySession";
    readonly InstitutionIdentity: "InstitutionIdentity";
    readonly InstitutionalLogin: "InstitutionalLogin";
    readonly StaffIdentitySequence: "StaffIdentitySequence";
    readonly PhoneIdentity: "PhoneIdentity";
    readonly ProviderIdentity: "ProviderIdentity";
    readonly IdentityChallenge: "IdentityChallenge";
    readonly IdentityRateLimit: "IdentityRateLimit";
    readonly IdentityAudit: "IdentityAudit";
    readonly InstitutionGrant: "InstitutionGrant";
    readonly PlatformOperator: "PlatformOperator";
    readonly IdentityTotp: "IdentityTotp";
    readonly IdentityRecoveryCode: "IdentityRecoveryCode";
    readonly IdentityMfaFailure: "IdentityMfaFailure";
    readonly IdentityImport: "IdentityImport";
    readonly IdentityOidcState: "IdentityOidcState";
    readonly IdentityPhoneChallenge: "IdentityPhoneChallenge";
    readonly IdentityNativeBroker: "IdentityNativeBroker";
    readonly IdentityDeliveryMessage: "IdentityDeliveryMessage";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly emailCanonical: "emailCanonical";
    readonly passwordHash: "passwordHash";
    readonly displayName: "displayName";
    readonly status: "status";
    readonly accountKind: "accountKind";
    readonly authVersion: "authVersion";
    readonly emailVerifiedAt: "emailVerifiedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const IdentitySessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly authVersion: "authVersion";
    readonly createdAt: "createdAt";
    readonly expiresAt: "expiresAt";
    readonly lastActiveAt: "lastActiveAt";
    readonly mfa: "mfa";
    readonly metadata: "metadata";
};
export type IdentitySessionScalarFieldEnum = (typeof IdentitySessionScalarFieldEnum)[keyof typeof IdentitySessionScalarFieldEnum];
export declare const InstitutionIdentityScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly name: "name";
    readonly identifierCase: "identifierCase";
    readonly sequencePadding: "sequencePadding";
    readonly active: "active";
    readonly createdAt: "createdAt";
};
export type InstitutionIdentityScalarFieldEnum = (typeof InstitutionIdentityScalarFieldEnum)[keyof typeof InstitutionIdentityScalarFieldEnum];
export declare const InstitutionalLoginScalarFieldEnum: {
    readonly id: "id";
    readonly institutionId: "institutionId";
    readonly userId: "userId";
    readonly kind: "kind";
    readonly identifier: "identifier";
    readonly normalized: "normalized";
    readonly status: "status";
    readonly staffType: "staffType";
    readonly hiringYear: "hiringYear";
    readonly legacy: "legacy";
    readonly sequence: "sequence";
    readonly activatedAt: "activatedAt";
    readonly contactEmail: "contactEmail";
    readonly createdAt: "createdAt";
};
export type InstitutionalLoginScalarFieldEnum = (typeof InstitutionalLoginScalarFieldEnum)[keyof typeof InstitutionalLoginScalarFieldEnum];
export declare const StaffIdentitySequenceScalarFieldEnum: {
    readonly institutionId: "institutionId";
    readonly year: "year";
    readonly staffType: "staffType";
    readonly value: "value";
};
export type StaffIdentitySequenceScalarFieldEnum = (typeof StaffIdentitySequenceScalarFieldEnum)[keyof typeof StaffIdentitySequenceScalarFieldEnum];
export declare const PhoneIdentityScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly phone: "phone";
    readonly verifiedAt: "verifiedAt";
};
export type PhoneIdentityScalarFieldEnum = (typeof PhoneIdentityScalarFieldEnum)[keyof typeof PhoneIdentityScalarFieldEnum];
export declare const ProviderIdentityScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly provider: "provider";
    readonly subject: "subject";
    readonly linkedAt: "linkedAt";
};
export type ProviderIdentityScalarFieldEnum = (typeof ProviderIdentityScalarFieldEnum)[keyof typeof ProviderIdentityScalarFieldEnum];
export declare const IdentityChallengeScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly kind: "kind";
    readonly authVersion: "authVersion";
    readonly identityId: "identityId";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly consumedAt: "consumedAt";
    readonly createdAt: "createdAt";
};
export type IdentityChallengeScalarFieldEnum = (typeof IdentityChallengeScalarFieldEnum)[keyof typeof IdentityChallengeScalarFieldEnum];
export declare const IdentityRateLimitScalarFieldEnum: {
    readonly key: "key";
    readonly count: "count";
    readonly expiresAt: "expiresAt";
};
export type IdentityRateLimitScalarFieldEnum = (typeof IdentityRateLimitScalarFieldEnum)[keyof typeof IdentityRateLimitScalarFieldEnum];
export declare const IdentityAuditScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly createdAt: "createdAt";
};
export type IdentityAuditScalarFieldEnum = (typeof IdentityAuditScalarFieldEnum)[keyof typeof IdentityAuditScalarFieldEnum];
export declare const InstitutionGrantScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly institutionId: "institutionId";
    readonly permission: "permission";
    readonly active: "active";
};
export type InstitutionGrantScalarFieldEnum = (typeof InstitutionGrantScalarFieldEnum)[keyof typeof InstitutionGrantScalarFieldEnum];
export declare const PlatformOperatorScalarFieldEnum: {
    readonly userId: "userId";
    readonly active: "active";
};
export type PlatformOperatorScalarFieldEnum = (typeof PlatformOperatorScalarFieldEnum)[keyof typeof PlatformOperatorScalarFieldEnum];
export declare const IdentityTotpScalarFieldEnum: {
    readonly userId: "userId";
    readonly secret: "secret";
    readonly confirmed: "confirmed";
    readonly pendingSecret: "pendingSecret";
    readonly lastUsedStep: "lastUsedStep";
};
export type IdentityTotpScalarFieldEnum = (typeof IdentityTotpScalarFieldEnum)[keyof typeof IdentityTotpScalarFieldEnum];
export declare const IdentityRecoveryCodeScalarFieldEnum: {
    readonly userId: "userId";
    readonly hash: "hash";
};
export type IdentityRecoveryCodeScalarFieldEnum = (typeof IdentityRecoveryCodeScalarFieldEnum)[keyof typeof IdentityRecoveryCodeScalarFieldEnum];
export declare const IdentityMfaFailureScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly at: "at";
};
export type IdentityMfaFailureScalarFieldEnum = (typeof IdentityMfaFailureScalarFieldEnum)[keyof typeof IdentityMfaFailureScalarFieldEnum];
export declare const IdentityImportScalarFieldEnum: {
    readonly id: "id";
    readonly institutionId: "institutionId";
    readonly actorId: "actorId";
    readonly rows: "rows";
    readonly result: "result";
    readonly expiresAt: "expiresAt";
    readonly committedAt: "committedAt";
};
export type IdentityImportScalarFieldEnum = (typeof IdentityImportScalarFieldEnum)[keyof typeof IdentityImportScalarFieldEnum];
export declare const IdentityOidcStateScalarFieldEnum: {
    readonly state: "state";
    readonly data: "data";
    readonly expiresAt: "expiresAt";
};
export type IdentityOidcStateScalarFieldEnum = (typeof IdentityOidcStateScalarFieldEnum)[keyof typeof IdentityOidcStateScalarFieldEnum];
export declare const IdentityPhoneChallengeScalarFieldEnum: {
    readonly id: "id";
    readonly phone: "phone";
    readonly kind: "kind";
    readonly codeHash: "codeHash";
    readonly payload: "payload";
    readonly userId: "userId";
    readonly attempts: "attempts";
    readonly expiresAt: "expiresAt";
    readonly consumedAt: "consumedAt";
    readonly createdAt: "createdAt";
};
export type IdentityPhoneChallengeScalarFieldEnum = (typeof IdentityPhoneChallengeScalarFieldEnum)[keyof typeof IdentityPhoneChallengeScalarFieldEnum];
export declare const IdentityNativeBrokerScalarFieldEnum: {
    readonly id: "id";
    readonly provider: "provider";
    readonly challenge: "challenge";
    readonly clientState: "clientState";
    readonly linkUserId: "linkUserId";
    readonly linkSessionId: "linkSessionId";
    readonly oidcState: "oidcState";
    readonly userId: "userId";
    readonly authVersion: "authVersion";
    readonly codeHash: "codeHash";
    readonly expiresAt: "expiresAt";
    readonly consumedAt: "consumedAt";
};
export type IdentityNativeBrokerScalarFieldEnum = (typeof IdentityNativeBrokerScalarFieldEnum)[keyof typeof IdentityNativeBrokerScalarFieldEnum];
export declare const IdentityDeliveryMessageScalarFieldEnum: {
    readonly id: "id";
    readonly channel: "channel";
    readonly transport: "transport";
    readonly kind: "kind";
    readonly payload: "payload";
    readonly status: "status";
    readonly attempts: "attempts";
    readonly nextAttemptAt: "nextAttemptAt";
    readonly leaseUntil: "leaseUntil";
    readonly expiresAt: "expiresAt";
    readonly providerReceipt: "providerReceipt";
    readonly errorCode: "errorCode";
    readonly createdAt: "createdAt";
};
export type IdentityDeliveryMessageScalarFieldEnum = (typeof IdentityDeliveryMessageScalarFieldEnum)[keyof typeof IdentityDeliveryMessageScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client/runtime/client").DbNullClass;
    readonly JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client/runtime/client").DbNullClass;
    readonly JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
    readonly AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
