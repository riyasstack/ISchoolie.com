import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "identitySession" | "institutionIdentity" | "institutionalLogin" | "staffIdentitySequence" | "phoneIdentity" | "providerIdentity" | "identityChallenge" | "identityRateLimit" | "identityAudit" | "institutionGrant" | "platformOperator" | "identityTotp" | "identityRecoveryCode" | "identityMfaFailure" | "identityImport" | "identityOidcState" | "identityPhoneChallenge" | "identityNativeBroker" | "identityDeliveryMessage";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        IdentitySession: {
            payload: Prisma.$IdentitySessionPayload<ExtArgs>;
            fields: Prisma.IdentitySessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdentitySessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentitySessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdentitySessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentitySessionPayload>;
                };
                findFirst: {
                    args: Prisma.IdentitySessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentitySessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdentitySessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentitySessionPayload>;
                };
                findMany: {
                    args: Prisma.IdentitySessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentitySessionPayload>[];
                };
                create: {
                    args: Prisma.IdentitySessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentitySessionPayload>;
                };
                createMany: {
                    args: Prisma.IdentitySessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdentitySessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentitySessionPayload>[];
                };
                delete: {
                    args: Prisma.IdentitySessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentitySessionPayload>;
                };
                update: {
                    args: Prisma.IdentitySessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentitySessionPayload>;
                };
                deleteMany: {
                    args: Prisma.IdentitySessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdentitySessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdentitySessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentitySessionPayload>[];
                };
                upsert: {
                    args: Prisma.IdentitySessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentitySessionPayload>;
                };
                aggregate: {
                    args: Prisma.IdentitySessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdentitySession>;
                };
                groupBy: {
                    args: Prisma.IdentitySessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentitySessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdentitySessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentitySessionCountAggregateOutputType> | number;
                };
            };
        };
        InstitutionIdentity: {
            payload: Prisma.$InstitutionIdentityPayload<ExtArgs>;
            fields: Prisma.InstitutionIdentityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InstitutionIdentityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionIdentityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InstitutionIdentityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionIdentityPayload>;
                };
                findFirst: {
                    args: Prisma.InstitutionIdentityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionIdentityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InstitutionIdentityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionIdentityPayload>;
                };
                findMany: {
                    args: Prisma.InstitutionIdentityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionIdentityPayload>[];
                };
                create: {
                    args: Prisma.InstitutionIdentityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionIdentityPayload>;
                };
                createMany: {
                    args: Prisma.InstitutionIdentityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InstitutionIdentityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionIdentityPayload>[];
                };
                delete: {
                    args: Prisma.InstitutionIdentityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionIdentityPayload>;
                };
                update: {
                    args: Prisma.InstitutionIdentityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionIdentityPayload>;
                };
                deleteMany: {
                    args: Prisma.InstitutionIdentityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InstitutionIdentityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InstitutionIdentityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionIdentityPayload>[];
                };
                upsert: {
                    args: Prisma.InstitutionIdentityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionIdentityPayload>;
                };
                aggregate: {
                    args: Prisma.InstitutionIdentityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInstitutionIdentity>;
                };
                groupBy: {
                    args: Prisma.InstitutionIdentityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InstitutionIdentityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InstitutionIdentityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InstitutionIdentityCountAggregateOutputType> | number;
                };
            };
        };
        InstitutionalLogin: {
            payload: Prisma.$InstitutionalLoginPayload<ExtArgs>;
            fields: Prisma.InstitutionalLoginFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InstitutionalLoginFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionalLoginPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InstitutionalLoginFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionalLoginPayload>;
                };
                findFirst: {
                    args: Prisma.InstitutionalLoginFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionalLoginPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InstitutionalLoginFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionalLoginPayload>;
                };
                findMany: {
                    args: Prisma.InstitutionalLoginFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionalLoginPayload>[];
                };
                create: {
                    args: Prisma.InstitutionalLoginCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionalLoginPayload>;
                };
                createMany: {
                    args: Prisma.InstitutionalLoginCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InstitutionalLoginCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionalLoginPayload>[];
                };
                delete: {
                    args: Prisma.InstitutionalLoginDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionalLoginPayload>;
                };
                update: {
                    args: Prisma.InstitutionalLoginUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionalLoginPayload>;
                };
                deleteMany: {
                    args: Prisma.InstitutionalLoginDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InstitutionalLoginUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InstitutionalLoginUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionalLoginPayload>[];
                };
                upsert: {
                    args: Prisma.InstitutionalLoginUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionalLoginPayload>;
                };
                aggregate: {
                    args: Prisma.InstitutionalLoginAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInstitutionalLogin>;
                };
                groupBy: {
                    args: Prisma.InstitutionalLoginGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InstitutionalLoginGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InstitutionalLoginCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InstitutionalLoginCountAggregateOutputType> | number;
                };
            };
        };
        StaffIdentitySequence: {
            payload: Prisma.$StaffIdentitySequencePayload<ExtArgs>;
            fields: Prisma.StaffIdentitySequenceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StaffIdentitySequenceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StaffIdentitySequencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StaffIdentitySequenceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StaffIdentitySequencePayload>;
                };
                findFirst: {
                    args: Prisma.StaffIdentitySequenceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StaffIdentitySequencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StaffIdentitySequenceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StaffIdentitySequencePayload>;
                };
                findMany: {
                    args: Prisma.StaffIdentitySequenceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StaffIdentitySequencePayload>[];
                };
                create: {
                    args: Prisma.StaffIdentitySequenceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StaffIdentitySequencePayload>;
                };
                createMany: {
                    args: Prisma.StaffIdentitySequenceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StaffIdentitySequenceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StaffIdentitySequencePayload>[];
                };
                delete: {
                    args: Prisma.StaffIdentitySequenceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StaffIdentitySequencePayload>;
                };
                update: {
                    args: Prisma.StaffIdentitySequenceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StaffIdentitySequencePayload>;
                };
                deleteMany: {
                    args: Prisma.StaffIdentitySequenceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StaffIdentitySequenceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StaffIdentitySequenceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StaffIdentitySequencePayload>[];
                };
                upsert: {
                    args: Prisma.StaffIdentitySequenceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StaffIdentitySequencePayload>;
                };
                aggregate: {
                    args: Prisma.StaffIdentitySequenceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStaffIdentitySequence>;
                };
                groupBy: {
                    args: Prisma.StaffIdentitySequenceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StaffIdentitySequenceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StaffIdentitySequenceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StaffIdentitySequenceCountAggregateOutputType> | number;
                };
            };
        };
        PhoneIdentity: {
            payload: Prisma.$PhoneIdentityPayload<ExtArgs>;
            fields: Prisma.PhoneIdentityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PhoneIdentityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhoneIdentityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PhoneIdentityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhoneIdentityPayload>;
                };
                findFirst: {
                    args: Prisma.PhoneIdentityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhoneIdentityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PhoneIdentityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhoneIdentityPayload>;
                };
                findMany: {
                    args: Prisma.PhoneIdentityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhoneIdentityPayload>[];
                };
                create: {
                    args: Prisma.PhoneIdentityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhoneIdentityPayload>;
                };
                createMany: {
                    args: Prisma.PhoneIdentityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PhoneIdentityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhoneIdentityPayload>[];
                };
                delete: {
                    args: Prisma.PhoneIdentityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhoneIdentityPayload>;
                };
                update: {
                    args: Prisma.PhoneIdentityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhoneIdentityPayload>;
                };
                deleteMany: {
                    args: Prisma.PhoneIdentityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PhoneIdentityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PhoneIdentityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhoneIdentityPayload>[];
                };
                upsert: {
                    args: Prisma.PhoneIdentityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhoneIdentityPayload>;
                };
                aggregate: {
                    args: Prisma.PhoneIdentityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePhoneIdentity>;
                };
                groupBy: {
                    args: Prisma.PhoneIdentityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PhoneIdentityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PhoneIdentityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PhoneIdentityCountAggregateOutputType> | number;
                };
            };
        };
        ProviderIdentity: {
            payload: Prisma.$ProviderIdentityPayload<ExtArgs>;
            fields: Prisma.ProviderIdentityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProviderIdentityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderIdentityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProviderIdentityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderIdentityPayload>;
                };
                findFirst: {
                    args: Prisma.ProviderIdentityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderIdentityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProviderIdentityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderIdentityPayload>;
                };
                findMany: {
                    args: Prisma.ProviderIdentityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderIdentityPayload>[];
                };
                create: {
                    args: Prisma.ProviderIdentityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderIdentityPayload>;
                };
                createMany: {
                    args: Prisma.ProviderIdentityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProviderIdentityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderIdentityPayload>[];
                };
                delete: {
                    args: Prisma.ProviderIdentityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderIdentityPayload>;
                };
                update: {
                    args: Prisma.ProviderIdentityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderIdentityPayload>;
                };
                deleteMany: {
                    args: Prisma.ProviderIdentityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProviderIdentityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProviderIdentityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderIdentityPayload>[];
                };
                upsert: {
                    args: Prisma.ProviderIdentityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProviderIdentityPayload>;
                };
                aggregate: {
                    args: Prisma.ProviderIdentityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProviderIdentity>;
                };
                groupBy: {
                    args: Prisma.ProviderIdentityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProviderIdentityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProviderIdentityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProviderIdentityCountAggregateOutputType> | number;
                };
            };
        };
        IdentityChallenge: {
            payload: Prisma.$IdentityChallengePayload<ExtArgs>;
            fields: Prisma.IdentityChallengeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdentityChallengeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityChallengePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdentityChallengeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityChallengePayload>;
                };
                findFirst: {
                    args: Prisma.IdentityChallengeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityChallengePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdentityChallengeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityChallengePayload>;
                };
                findMany: {
                    args: Prisma.IdentityChallengeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityChallengePayload>[];
                };
                create: {
                    args: Prisma.IdentityChallengeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityChallengePayload>;
                };
                createMany: {
                    args: Prisma.IdentityChallengeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdentityChallengeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityChallengePayload>[];
                };
                delete: {
                    args: Prisma.IdentityChallengeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityChallengePayload>;
                };
                update: {
                    args: Prisma.IdentityChallengeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityChallengePayload>;
                };
                deleteMany: {
                    args: Prisma.IdentityChallengeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdentityChallengeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdentityChallengeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityChallengePayload>[];
                };
                upsert: {
                    args: Prisma.IdentityChallengeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityChallengePayload>;
                };
                aggregate: {
                    args: Prisma.IdentityChallengeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdentityChallenge>;
                };
                groupBy: {
                    args: Prisma.IdentityChallengeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityChallengeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdentityChallengeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityChallengeCountAggregateOutputType> | number;
                };
            };
        };
        IdentityRateLimit: {
            payload: Prisma.$IdentityRateLimitPayload<ExtArgs>;
            fields: Prisma.IdentityRateLimitFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdentityRateLimitFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRateLimitPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdentityRateLimitFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRateLimitPayload>;
                };
                findFirst: {
                    args: Prisma.IdentityRateLimitFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRateLimitPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdentityRateLimitFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRateLimitPayload>;
                };
                findMany: {
                    args: Prisma.IdentityRateLimitFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRateLimitPayload>[];
                };
                create: {
                    args: Prisma.IdentityRateLimitCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRateLimitPayload>;
                };
                createMany: {
                    args: Prisma.IdentityRateLimitCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdentityRateLimitCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRateLimitPayload>[];
                };
                delete: {
                    args: Prisma.IdentityRateLimitDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRateLimitPayload>;
                };
                update: {
                    args: Prisma.IdentityRateLimitUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRateLimitPayload>;
                };
                deleteMany: {
                    args: Prisma.IdentityRateLimitDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdentityRateLimitUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdentityRateLimitUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRateLimitPayload>[];
                };
                upsert: {
                    args: Prisma.IdentityRateLimitUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRateLimitPayload>;
                };
                aggregate: {
                    args: Prisma.IdentityRateLimitAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdentityRateLimit>;
                };
                groupBy: {
                    args: Prisma.IdentityRateLimitGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityRateLimitGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdentityRateLimitCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityRateLimitCountAggregateOutputType> | number;
                };
            };
        };
        IdentityAudit: {
            payload: Prisma.$IdentityAuditPayload<ExtArgs>;
            fields: Prisma.IdentityAuditFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdentityAuditFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityAuditPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdentityAuditFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityAuditPayload>;
                };
                findFirst: {
                    args: Prisma.IdentityAuditFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityAuditPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdentityAuditFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityAuditPayload>;
                };
                findMany: {
                    args: Prisma.IdentityAuditFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityAuditPayload>[];
                };
                create: {
                    args: Prisma.IdentityAuditCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityAuditPayload>;
                };
                createMany: {
                    args: Prisma.IdentityAuditCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdentityAuditCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityAuditPayload>[];
                };
                delete: {
                    args: Prisma.IdentityAuditDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityAuditPayload>;
                };
                update: {
                    args: Prisma.IdentityAuditUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityAuditPayload>;
                };
                deleteMany: {
                    args: Prisma.IdentityAuditDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdentityAuditUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdentityAuditUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityAuditPayload>[];
                };
                upsert: {
                    args: Prisma.IdentityAuditUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityAuditPayload>;
                };
                aggregate: {
                    args: Prisma.IdentityAuditAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdentityAudit>;
                };
                groupBy: {
                    args: Prisma.IdentityAuditGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityAuditGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdentityAuditCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityAuditCountAggregateOutputType> | number;
                };
            };
        };
        InstitutionGrant: {
            payload: Prisma.$InstitutionGrantPayload<ExtArgs>;
            fields: Prisma.InstitutionGrantFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InstitutionGrantFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionGrantPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InstitutionGrantFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionGrantPayload>;
                };
                findFirst: {
                    args: Prisma.InstitutionGrantFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionGrantPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InstitutionGrantFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionGrantPayload>;
                };
                findMany: {
                    args: Prisma.InstitutionGrantFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionGrantPayload>[];
                };
                create: {
                    args: Prisma.InstitutionGrantCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionGrantPayload>;
                };
                createMany: {
                    args: Prisma.InstitutionGrantCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InstitutionGrantCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionGrantPayload>[];
                };
                delete: {
                    args: Prisma.InstitutionGrantDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionGrantPayload>;
                };
                update: {
                    args: Prisma.InstitutionGrantUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionGrantPayload>;
                };
                deleteMany: {
                    args: Prisma.InstitutionGrantDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InstitutionGrantUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InstitutionGrantUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionGrantPayload>[];
                };
                upsert: {
                    args: Prisma.InstitutionGrantUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InstitutionGrantPayload>;
                };
                aggregate: {
                    args: Prisma.InstitutionGrantAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInstitutionGrant>;
                };
                groupBy: {
                    args: Prisma.InstitutionGrantGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InstitutionGrantGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InstitutionGrantCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InstitutionGrantCountAggregateOutputType> | number;
                };
            };
        };
        PlatformOperator: {
            payload: Prisma.$PlatformOperatorPayload<ExtArgs>;
            fields: Prisma.PlatformOperatorFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PlatformOperatorFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformOperatorPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PlatformOperatorFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformOperatorPayload>;
                };
                findFirst: {
                    args: Prisma.PlatformOperatorFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformOperatorPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PlatformOperatorFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformOperatorPayload>;
                };
                findMany: {
                    args: Prisma.PlatformOperatorFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformOperatorPayload>[];
                };
                create: {
                    args: Prisma.PlatformOperatorCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformOperatorPayload>;
                };
                createMany: {
                    args: Prisma.PlatformOperatorCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PlatformOperatorCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformOperatorPayload>[];
                };
                delete: {
                    args: Prisma.PlatformOperatorDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformOperatorPayload>;
                };
                update: {
                    args: Prisma.PlatformOperatorUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformOperatorPayload>;
                };
                deleteMany: {
                    args: Prisma.PlatformOperatorDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PlatformOperatorUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PlatformOperatorUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformOperatorPayload>[];
                };
                upsert: {
                    args: Prisma.PlatformOperatorUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformOperatorPayload>;
                };
                aggregate: {
                    args: Prisma.PlatformOperatorAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePlatformOperator>;
                };
                groupBy: {
                    args: Prisma.PlatformOperatorGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlatformOperatorGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PlatformOperatorCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlatformOperatorCountAggregateOutputType> | number;
                };
            };
        };
        IdentityTotp: {
            payload: Prisma.$IdentityTotpPayload<ExtArgs>;
            fields: Prisma.IdentityTotpFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdentityTotpFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityTotpPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdentityTotpFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityTotpPayload>;
                };
                findFirst: {
                    args: Prisma.IdentityTotpFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityTotpPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdentityTotpFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityTotpPayload>;
                };
                findMany: {
                    args: Prisma.IdentityTotpFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityTotpPayload>[];
                };
                create: {
                    args: Prisma.IdentityTotpCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityTotpPayload>;
                };
                createMany: {
                    args: Prisma.IdentityTotpCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdentityTotpCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityTotpPayload>[];
                };
                delete: {
                    args: Prisma.IdentityTotpDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityTotpPayload>;
                };
                update: {
                    args: Prisma.IdentityTotpUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityTotpPayload>;
                };
                deleteMany: {
                    args: Prisma.IdentityTotpDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdentityTotpUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdentityTotpUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityTotpPayload>[];
                };
                upsert: {
                    args: Prisma.IdentityTotpUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityTotpPayload>;
                };
                aggregate: {
                    args: Prisma.IdentityTotpAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdentityTotp>;
                };
                groupBy: {
                    args: Prisma.IdentityTotpGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityTotpGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdentityTotpCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityTotpCountAggregateOutputType> | number;
                };
            };
        };
        IdentityRecoveryCode: {
            payload: Prisma.$IdentityRecoveryCodePayload<ExtArgs>;
            fields: Prisma.IdentityRecoveryCodeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdentityRecoveryCodeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRecoveryCodePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdentityRecoveryCodeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRecoveryCodePayload>;
                };
                findFirst: {
                    args: Prisma.IdentityRecoveryCodeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRecoveryCodePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdentityRecoveryCodeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRecoveryCodePayload>;
                };
                findMany: {
                    args: Prisma.IdentityRecoveryCodeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRecoveryCodePayload>[];
                };
                create: {
                    args: Prisma.IdentityRecoveryCodeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRecoveryCodePayload>;
                };
                createMany: {
                    args: Prisma.IdentityRecoveryCodeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdentityRecoveryCodeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRecoveryCodePayload>[];
                };
                delete: {
                    args: Prisma.IdentityRecoveryCodeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRecoveryCodePayload>;
                };
                update: {
                    args: Prisma.IdentityRecoveryCodeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRecoveryCodePayload>;
                };
                deleteMany: {
                    args: Prisma.IdentityRecoveryCodeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdentityRecoveryCodeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdentityRecoveryCodeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRecoveryCodePayload>[];
                };
                upsert: {
                    args: Prisma.IdentityRecoveryCodeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityRecoveryCodePayload>;
                };
                aggregate: {
                    args: Prisma.IdentityRecoveryCodeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdentityRecoveryCode>;
                };
                groupBy: {
                    args: Prisma.IdentityRecoveryCodeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityRecoveryCodeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdentityRecoveryCodeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityRecoveryCodeCountAggregateOutputType> | number;
                };
            };
        };
        IdentityMfaFailure: {
            payload: Prisma.$IdentityMfaFailurePayload<ExtArgs>;
            fields: Prisma.IdentityMfaFailureFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdentityMfaFailureFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityMfaFailurePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdentityMfaFailureFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityMfaFailurePayload>;
                };
                findFirst: {
                    args: Prisma.IdentityMfaFailureFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityMfaFailurePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdentityMfaFailureFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityMfaFailurePayload>;
                };
                findMany: {
                    args: Prisma.IdentityMfaFailureFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityMfaFailurePayload>[];
                };
                create: {
                    args: Prisma.IdentityMfaFailureCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityMfaFailurePayload>;
                };
                createMany: {
                    args: Prisma.IdentityMfaFailureCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdentityMfaFailureCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityMfaFailurePayload>[];
                };
                delete: {
                    args: Prisma.IdentityMfaFailureDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityMfaFailurePayload>;
                };
                update: {
                    args: Prisma.IdentityMfaFailureUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityMfaFailurePayload>;
                };
                deleteMany: {
                    args: Prisma.IdentityMfaFailureDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdentityMfaFailureUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdentityMfaFailureUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityMfaFailurePayload>[];
                };
                upsert: {
                    args: Prisma.IdentityMfaFailureUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityMfaFailurePayload>;
                };
                aggregate: {
                    args: Prisma.IdentityMfaFailureAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdentityMfaFailure>;
                };
                groupBy: {
                    args: Prisma.IdentityMfaFailureGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityMfaFailureGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdentityMfaFailureCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityMfaFailureCountAggregateOutputType> | number;
                };
            };
        };
        IdentityImport: {
            payload: Prisma.$IdentityImportPayload<ExtArgs>;
            fields: Prisma.IdentityImportFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdentityImportFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityImportPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdentityImportFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityImportPayload>;
                };
                findFirst: {
                    args: Prisma.IdentityImportFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityImportPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdentityImportFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityImportPayload>;
                };
                findMany: {
                    args: Prisma.IdentityImportFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityImportPayload>[];
                };
                create: {
                    args: Prisma.IdentityImportCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityImportPayload>;
                };
                createMany: {
                    args: Prisma.IdentityImportCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdentityImportCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityImportPayload>[];
                };
                delete: {
                    args: Prisma.IdentityImportDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityImportPayload>;
                };
                update: {
                    args: Prisma.IdentityImportUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityImportPayload>;
                };
                deleteMany: {
                    args: Prisma.IdentityImportDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdentityImportUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdentityImportUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityImportPayload>[];
                };
                upsert: {
                    args: Prisma.IdentityImportUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityImportPayload>;
                };
                aggregate: {
                    args: Prisma.IdentityImportAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdentityImport>;
                };
                groupBy: {
                    args: Prisma.IdentityImportGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityImportGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdentityImportCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityImportCountAggregateOutputType> | number;
                };
            };
        };
        IdentityOidcState: {
            payload: Prisma.$IdentityOidcStatePayload<ExtArgs>;
            fields: Prisma.IdentityOidcStateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdentityOidcStateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityOidcStatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdentityOidcStateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityOidcStatePayload>;
                };
                findFirst: {
                    args: Prisma.IdentityOidcStateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityOidcStatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdentityOidcStateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityOidcStatePayload>;
                };
                findMany: {
                    args: Prisma.IdentityOidcStateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityOidcStatePayload>[];
                };
                create: {
                    args: Prisma.IdentityOidcStateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityOidcStatePayload>;
                };
                createMany: {
                    args: Prisma.IdentityOidcStateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdentityOidcStateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityOidcStatePayload>[];
                };
                delete: {
                    args: Prisma.IdentityOidcStateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityOidcStatePayload>;
                };
                update: {
                    args: Prisma.IdentityOidcStateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityOidcStatePayload>;
                };
                deleteMany: {
                    args: Prisma.IdentityOidcStateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdentityOidcStateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdentityOidcStateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityOidcStatePayload>[];
                };
                upsert: {
                    args: Prisma.IdentityOidcStateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityOidcStatePayload>;
                };
                aggregate: {
                    args: Prisma.IdentityOidcStateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdentityOidcState>;
                };
                groupBy: {
                    args: Prisma.IdentityOidcStateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityOidcStateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdentityOidcStateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityOidcStateCountAggregateOutputType> | number;
                };
            };
        };
        IdentityPhoneChallenge: {
            payload: Prisma.$IdentityPhoneChallengePayload<ExtArgs>;
            fields: Prisma.IdentityPhoneChallengeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdentityPhoneChallengeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityPhoneChallengePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdentityPhoneChallengeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityPhoneChallengePayload>;
                };
                findFirst: {
                    args: Prisma.IdentityPhoneChallengeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityPhoneChallengePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdentityPhoneChallengeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityPhoneChallengePayload>;
                };
                findMany: {
                    args: Prisma.IdentityPhoneChallengeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityPhoneChallengePayload>[];
                };
                create: {
                    args: Prisma.IdentityPhoneChallengeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityPhoneChallengePayload>;
                };
                createMany: {
                    args: Prisma.IdentityPhoneChallengeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdentityPhoneChallengeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityPhoneChallengePayload>[];
                };
                delete: {
                    args: Prisma.IdentityPhoneChallengeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityPhoneChallengePayload>;
                };
                update: {
                    args: Prisma.IdentityPhoneChallengeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityPhoneChallengePayload>;
                };
                deleteMany: {
                    args: Prisma.IdentityPhoneChallengeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdentityPhoneChallengeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdentityPhoneChallengeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityPhoneChallengePayload>[];
                };
                upsert: {
                    args: Prisma.IdentityPhoneChallengeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityPhoneChallengePayload>;
                };
                aggregate: {
                    args: Prisma.IdentityPhoneChallengeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdentityPhoneChallenge>;
                };
                groupBy: {
                    args: Prisma.IdentityPhoneChallengeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityPhoneChallengeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdentityPhoneChallengeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityPhoneChallengeCountAggregateOutputType> | number;
                };
            };
        };
        IdentityNativeBroker: {
            payload: Prisma.$IdentityNativeBrokerPayload<ExtArgs>;
            fields: Prisma.IdentityNativeBrokerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdentityNativeBrokerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityNativeBrokerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdentityNativeBrokerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityNativeBrokerPayload>;
                };
                findFirst: {
                    args: Prisma.IdentityNativeBrokerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityNativeBrokerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdentityNativeBrokerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityNativeBrokerPayload>;
                };
                findMany: {
                    args: Prisma.IdentityNativeBrokerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityNativeBrokerPayload>[];
                };
                create: {
                    args: Prisma.IdentityNativeBrokerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityNativeBrokerPayload>;
                };
                createMany: {
                    args: Prisma.IdentityNativeBrokerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdentityNativeBrokerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityNativeBrokerPayload>[];
                };
                delete: {
                    args: Prisma.IdentityNativeBrokerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityNativeBrokerPayload>;
                };
                update: {
                    args: Prisma.IdentityNativeBrokerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityNativeBrokerPayload>;
                };
                deleteMany: {
                    args: Prisma.IdentityNativeBrokerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdentityNativeBrokerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdentityNativeBrokerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityNativeBrokerPayload>[];
                };
                upsert: {
                    args: Prisma.IdentityNativeBrokerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityNativeBrokerPayload>;
                };
                aggregate: {
                    args: Prisma.IdentityNativeBrokerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdentityNativeBroker>;
                };
                groupBy: {
                    args: Prisma.IdentityNativeBrokerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityNativeBrokerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdentityNativeBrokerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityNativeBrokerCountAggregateOutputType> | number;
                };
            };
        };
        IdentityDeliveryMessage: {
            payload: Prisma.$IdentityDeliveryMessagePayload<ExtArgs>;
            fields: Prisma.IdentityDeliveryMessageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdentityDeliveryMessageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityDeliveryMessagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdentityDeliveryMessageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityDeliveryMessagePayload>;
                };
                findFirst: {
                    args: Prisma.IdentityDeliveryMessageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityDeliveryMessagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdentityDeliveryMessageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityDeliveryMessagePayload>;
                };
                findMany: {
                    args: Prisma.IdentityDeliveryMessageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityDeliveryMessagePayload>[];
                };
                create: {
                    args: Prisma.IdentityDeliveryMessageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityDeliveryMessagePayload>;
                };
                createMany: {
                    args: Prisma.IdentityDeliveryMessageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdentityDeliveryMessageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityDeliveryMessagePayload>[];
                };
                delete: {
                    args: Prisma.IdentityDeliveryMessageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityDeliveryMessagePayload>;
                };
                update: {
                    args: Prisma.IdentityDeliveryMessageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityDeliveryMessagePayload>;
                };
                deleteMany: {
                    args: Prisma.IdentityDeliveryMessageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdentityDeliveryMessageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdentityDeliveryMessageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityDeliveryMessagePayload>[];
                };
                upsert: {
                    args: Prisma.IdentityDeliveryMessageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdentityDeliveryMessagePayload>;
                };
                aggregate: {
                    args: Prisma.IdentityDeliveryMessageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdentityDeliveryMessage>;
                };
                groupBy: {
                    args: Prisma.IdentityDeliveryMessageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityDeliveryMessageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdentityDeliveryMessageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdentityDeliveryMessageCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
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
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
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
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>;
export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    identitySession?: Prisma.IdentitySessionOmit;
    institutionIdentity?: Prisma.InstitutionIdentityOmit;
    institutionalLogin?: Prisma.InstitutionalLoginOmit;
    staffIdentitySequence?: Prisma.StaffIdentitySequenceOmit;
    phoneIdentity?: Prisma.PhoneIdentityOmit;
    providerIdentity?: Prisma.ProviderIdentityOmit;
    identityChallenge?: Prisma.IdentityChallengeOmit;
    identityRateLimit?: Prisma.IdentityRateLimitOmit;
    identityAudit?: Prisma.IdentityAuditOmit;
    institutionGrant?: Prisma.InstitutionGrantOmit;
    platformOperator?: Prisma.PlatformOperatorOmit;
    identityTotp?: Prisma.IdentityTotpOmit;
    identityRecoveryCode?: Prisma.IdentityRecoveryCodeOmit;
    identityMfaFailure?: Prisma.IdentityMfaFailureOmit;
    identityImport?: Prisma.IdentityImportOmit;
    identityOidcState?: Prisma.IdentityOidcStateOmit;
    identityPhoneChallenge?: Prisma.IdentityPhoneChallengeOmit;
    identityNativeBroker?: Prisma.IdentityNativeBrokerOmit;
    identityDeliveryMessage?: Prisma.IdentityDeliveryMessageOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
