import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentitySessionModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentitySessionPayload>;
export type AggregateIdentitySession = {
    _count: IdentitySessionCountAggregateOutputType | null;
    _avg: IdentitySessionAvgAggregateOutputType | null;
    _sum: IdentitySessionSumAggregateOutputType | null;
    _min: IdentitySessionMinAggregateOutputType | null;
    _max: IdentitySessionMaxAggregateOutputType | null;
};
export type IdentitySessionAvgAggregateOutputType = {
    authVersion: number | null;
};
export type IdentitySessionSumAggregateOutputType = {
    authVersion: number | null;
};
export type IdentitySessionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    authVersion: number | null;
    createdAt: Date | null;
    expiresAt: Date | null;
    lastActiveAt: Date | null;
    mfa: string | null;
};
export type IdentitySessionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    authVersion: number | null;
    createdAt: Date | null;
    expiresAt: Date | null;
    lastActiveAt: Date | null;
    mfa: string | null;
};
export type IdentitySessionCountAggregateOutputType = {
    id: number;
    userId: number;
    authVersion: number;
    createdAt: number;
    expiresAt: number;
    lastActiveAt: number;
    mfa: number;
    metadata: number;
    _all: number;
};
export type IdentitySessionAvgAggregateInputType = {
    authVersion?: true;
};
export type IdentitySessionSumAggregateInputType = {
    authVersion?: true;
};
export type IdentitySessionMinAggregateInputType = {
    id?: true;
    userId?: true;
    authVersion?: true;
    createdAt?: true;
    expiresAt?: true;
    lastActiveAt?: true;
    mfa?: true;
};
export type IdentitySessionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    authVersion?: true;
    createdAt?: true;
    expiresAt?: true;
    lastActiveAt?: true;
    mfa?: true;
};
export type IdentitySessionCountAggregateInputType = {
    id?: true;
    userId?: true;
    authVersion?: true;
    createdAt?: true;
    expiresAt?: true;
    lastActiveAt?: true;
    mfa?: true;
    metadata?: true;
    _all?: true;
};
export type IdentitySessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentitySessionWhereInput;
    orderBy?: Prisma.IdentitySessionOrderByWithRelationInput | Prisma.IdentitySessionOrderByWithRelationInput[];
    cursor?: Prisma.IdentitySessionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentitySessionCountAggregateInputType;
    _avg?: IdentitySessionAvgAggregateInputType;
    _sum?: IdentitySessionSumAggregateInputType;
    _min?: IdentitySessionMinAggregateInputType;
    _max?: IdentitySessionMaxAggregateInputType;
};
export type GetIdentitySessionAggregateType<T extends IdentitySessionAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentitySession]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentitySession[P]> : Prisma.GetScalarType<T[P], AggregateIdentitySession[P]>;
};
export type IdentitySessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentitySessionWhereInput;
    orderBy?: Prisma.IdentitySessionOrderByWithAggregationInput | Prisma.IdentitySessionOrderByWithAggregationInput[];
    by: Prisma.IdentitySessionScalarFieldEnum[] | Prisma.IdentitySessionScalarFieldEnum;
    having?: Prisma.IdentitySessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentitySessionCountAggregateInputType | true;
    _avg?: IdentitySessionAvgAggregateInputType;
    _sum?: IdentitySessionSumAggregateInputType;
    _min?: IdentitySessionMinAggregateInputType;
    _max?: IdentitySessionMaxAggregateInputType;
};
export type IdentitySessionGroupByOutputType = {
    id: string;
    userId: string;
    authVersion: number;
    createdAt: Date;
    expiresAt: Date;
    lastActiveAt: Date;
    mfa: string | null;
    metadata: runtime.JsonValue;
    _count: IdentitySessionCountAggregateOutputType | null;
    _avg: IdentitySessionAvgAggregateOutputType | null;
    _sum: IdentitySessionSumAggregateOutputType | null;
    _min: IdentitySessionMinAggregateOutputType | null;
    _max: IdentitySessionMaxAggregateOutputType | null;
};
export type GetIdentitySessionGroupByPayload<T extends IdentitySessionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentitySessionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentitySessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentitySessionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentitySessionGroupByOutputType[P]>;
}>>;
export type IdentitySessionWhereInput = {
    AND?: Prisma.IdentitySessionWhereInput | Prisma.IdentitySessionWhereInput[];
    OR?: Prisma.IdentitySessionWhereInput[];
    NOT?: Prisma.IdentitySessionWhereInput | Prisma.IdentitySessionWhereInput[];
    id?: Prisma.StringFilter<"IdentitySession"> | string;
    userId?: Prisma.UuidFilter<"IdentitySession"> | string;
    authVersion?: Prisma.IntFilter<"IdentitySession"> | number;
    createdAt?: Prisma.DateTimeFilter<"IdentitySession"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"IdentitySession"> | Date | string;
    lastActiveAt?: Prisma.DateTimeFilter<"IdentitySession"> | Date | string;
    mfa?: Prisma.StringNullableFilter<"IdentitySession"> | string | null;
    metadata?: Prisma.JsonFilter<"IdentitySession">;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type IdentitySessionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    mfa?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type IdentitySessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.IdentitySessionWhereInput | Prisma.IdentitySessionWhereInput[];
    OR?: Prisma.IdentitySessionWhereInput[];
    NOT?: Prisma.IdentitySessionWhereInput | Prisma.IdentitySessionWhereInput[];
    userId?: Prisma.UuidFilter<"IdentitySession"> | string;
    authVersion?: Prisma.IntFilter<"IdentitySession"> | number;
    createdAt?: Prisma.DateTimeFilter<"IdentitySession"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"IdentitySession"> | Date | string;
    lastActiveAt?: Prisma.DateTimeFilter<"IdentitySession"> | Date | string;
    mfa?: Prisma.StringNullableFilter<"IdentitySession"> | string | null;
    metadata?: Prisma.JsonFilter<"IdentitySession">;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type IdentitySessionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    mfa?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    _count?: Prisma.IdentitySessionCountOrderByAggregateInput;
    _avg?: Prisma.IdentitySessionAvgOrderByAggregateInput;
    _max?: Prisma.IdentitySessionMaxOrderByAggregateInput;
    _min?: Prisma.IdentitySessionMinOrderByAggregateInput;
    _sum?: Prisma.IdentitySessionSumOrderByAggregateInput;
};
export type IdentitySessionScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentitySessionScalarWhereWithAggregatesInput | Prisma.IdentitySessionScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentitySessionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentitySessionScalarWhereWithAggregatesInput | Prisma.IdentitySessionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"IdentitySession"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"IdentitySession"> | string;
    authVersion?: Prisma.IntWithAggregatesFilter<"IdentitySession"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"IdentitySession"> | Date | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"IdentitySession"> | Date | string;
    lastActiveAt?: Prisma.DateTimeWithAggregatesFilter<"IdentitySession"> | Date | string;
    mfa?: Prisma.StringNullableWithAggregatesFilter<"IdentitySession"> | string | null;
    metadata?: Prisma.JsonWithAggregatesFilter<"IdentitySession">;
};
export type IdentitySessionCreateInput = {
    id: string;
    authVersion: number;
    createdAt: Date | string;
    expiresAt: Date | string;
    lastActiveAt: Date | string;
    mfa?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    user: Prisma.UserCreateNestedOneWithoutSessionsInput;
};
export type IdentitySessionUncheckedCreateInput = {
    id: string;
    userId: string;
    authVersion: number;
    createdAt: Date | string;
    expiresAt: Date | string;
    lastActiveAt: Date | string;
    mfa?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type IdentitySessionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    mfa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    user?: Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput;
};
export type IdentitySessionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    mfa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type IdentitySessionCreateManyInput = {
    id: string;
    userId: string;
    authVersion: number;
    createdAt: Date | string;
    expiresAt: Date | string;
    lastActiveAt: Date | string;
    mfa?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type IdentitySessionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    mfa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type IdentitySessionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    mfa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type IdentitySessionListRelationFilter = {
    every?: Prisma.IdentitySessionWhereInput;
    some?: Prisma.IdentitySessionWhereInput;
    none?: Prisma.IdentitySessionWhereInput;
};
export type IdentitySessionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IdentitySessionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    mfa?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
};
export type IdentitySessionAvgOrderByAggregateInput = {
    authVersion?: Prisma.SortOrder;
};
export type IdentitySessionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    mfa?: Prisma.SortOrder;
};
export type IdentitySessionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    mfa?: Prisma.SortOrder;
};
export type IdentitySessionSumOrderByAggregateInput = {
    authVersion?: Prisma.SortOrder;
};
export type IdentitySessionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.IdentitySessionCreateWithoutUserInput, Prisma.IdentitySessionUncheckedCreateWithoutUserInput> | Prisma.IdentitySessionCreateWithoutUserInput[] | Prisma.IdentitySessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentitySessionCreateOrConnectWithoutUserInput | Prisma.IdentitySessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.IdentitySessionCreateManyUserInputEnvelope;
    connect?: Prisma.IdentitySessionWhereUniqueInput | Prisma.IdentitySessionWhereUniqueInput[];
};
export type IdentitySessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.IdentitySessionCreateWithoutUserInput, Prisma.IdentitySessionUncheckedCreateWithoutUserInput> | Prisma.IdentitySessionCreateWithoutUserInput[] | Prisma.IdentitySessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentitySessionCreateOrConnectWithoutUserInput | Prisma.IdentitySessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.IdentitySessionCreateManyUserInputEnvelope;
    connect?: Prisma.IdentitySessionWhereUniqueInput | Prisma.IdentitySessionWhereUniqueInput[];
};
export type IdentitySessionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.IdentitySessionCreateWithoutUserInput, Prisma.IdentitySessionUncheckedCreateWithoutUserInput> | Prisma.IdentitySessionCreateWithoutUserInput[] | Prisma.IdentitySessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentitySessionCreateOrConnectWithoutUserInput | Prisma.IdentitySessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.IdentitySessionUpsertWithWhereUniqueWithoutUserInput | Prisma.IdentitySessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.IdentitySessionCreateManyUserInputEnvelope;
    set?: Prisma.IdentitySessionWhereUniqueInput | Prisma.IdentitySessionWhereUniqueInput[];
    disconnect?: Prisma.IdentitySessionWhereUniqueInput | Prisma.IdentitySessionWhereUniqueInput[];
    delete?: Prisma.IdentitySessionWhereUniqueInput | Prisma.IdentitySessionWhereUniqueInput[];
    connect?: Prisma.IdentitySessionWhereUniqueInput | Prisma.IdentitySessionWhereUniqueInput[];
    update?: Prisma.IdentitySessionUpdateWithWhereUniqueWithoutUserInput | Prisma.IdentitySessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.IdentitySessionUpdateManyWithWhereWithoutUserInput | Prisma.IdentitySessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.IdentitySessionScalarWhereInput | Prisma.IdentitySessionScalarWhereInput[];
};
export type IdentitySessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.IdentitySessionCreateWithoutUserInput, Prisma.IdentitySessionUncheckedCreateWithoutUserInput> | Prisma.IdentitySessionCreateWithoutUserInput[] | Prisma.IdentitySessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentitySessionCreateOrConnectWithoutUserInput | Prisma.IdentitySessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.IdentitySessionUpsertWithWhereUniqueWithoutUserInput | Prisma.IdentitySessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.IdentitySessionCreateManyUserInputEnvelope;
    set?: Prisma.IdentitySessionWhereUniqueInput | Prisma.IdentitySessionWhereUniqueInput[];
    disconnect?: Prisma.IdentitySessionWhereUniqueInput | Prisma.IdentitySessionWhereUniqueInput[];
    delete?: Prisma.IdentitySessionWhereUniqueInput | Prisma.IdentitySessionWhereUniqueInput[];
    connect?: Prisma.IdentitySessionWhereUniqueInput | Prisma.IdentitySessionWhereUniqueInput[];
    update?: Prisma.IdentitySessionUpdateWithWhereUniqueWithoutUserInput | Prisma.IdentitySessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.IdentitySessionUpdateManyWithWhereWithoutUserInput | Prisma.IdentitySessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.IdentitySessionScalarWhereInput | Prisma.IdentitySessionScalarWhereInput[];
};
export type IdentitySessionCreateWithoutUserInput = {
    id: string;
    authVersion: number;
    createdAt: Date | string;
    expiresAt: Date | string;
    lastActiveAt: Date | string;
    mfa?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type IdentitySessionUncheckedCreateWithoutUserInput = {
    id: string;
    authVersion: number;
    createdAt: Date | string;
    expiresAt: Date | string;
    lastActiveAt: Date | string;
    mfa?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type IdentitySessionCreateOrConnectWithoutUserInput = {
    where: Prisma.IdentitySessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentitySessionCreateWithoutUserInput, Prisma.IdentitySessionUncheckedCreateWithoutUserInput>;
};
export type IdentitySessionCreateManyUserInputEnvelope = {
    data: Prisma.IdentitySessionCreateManyUserInput | Prisma.IdentitySessionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type IdentitySessionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.IdentitySessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.IdentitySessionUpdateWithoutUserInput, Prisma.IdentitySessionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.IdentitySessionCreateWithoutUserInput, Prisma.IdentitySessionUncheckedCreateWithoutUserInput>;
};
export type IdentitySessionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.IdentitySessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.IdentitySessionUpdateWithoutUserInput, Prisma.IdentitySessionUncheckedUpdateWithoutUserInput>;
};
export type IdentitySessionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.IdentitySessionScalarWhereInput;
    data: Prisma.XOR<Prisma.IdentitySessionUpdateManyMutationInput, Prisma.IdentitySessionUncheckedUpdateManyWithoutUserInput>;
};
export type IdentitySessionScalarWhereInput = {
    AND?: Prisma.IdentitySessionScalarWhereInput | Prisma.IdentitySessionScalarWhereInput[];
    OR?: Prisma.IdentitySessionScalarWhereInput[];
    NOT?: Prisma.IdentitySessionScalarWhereInput | Prisma.IdentitySessionScalarWhereInput[];
    id?: Prisma.StringFilter<"IdentitySession"> | string;
    userId?: Prisma.UuidFilter<"IdentitySession"> | string;
    authVersion?: Prisma.IntFilter<"IdentitySession"> | number;
    createdAt?: Prisma.DateTimeFilter<"IdentitySession"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"IdentitySession"> | Date | string;
    lastActiveAt?: Prisma.DateTimeFilter<"IdentitySession"> | Date | string;
    mfa?: Prisma.StringNullableFilter<"IdentitySession"> | string | null;
    metadata?: Prisma.JsonFilter<"IdentitySession">;
};
export type IdentitySessionCreateManyUserInput = {
    id: string;
    authVersion: number;
    createdAt: Date | string;
    expiresAt: Date | string;
    lastActiveAt: Date | string;
    mfa?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type IdentitySessionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    mfa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type IdentitySessionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    mfa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type IdentitySessionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    mfa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type IdentitySessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    authVersion?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
    lastActiveAt?: boolean;
    mfa?: boolean;
    metadata?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identitySession"]>;
export type IdentitySessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    authVersion?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
    lastActiveAt?: boolean;
    mfa?: boolean;
    metadata?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identitySession"]>;
export type IdentitySessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    authVersion?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
    lastActiveAt?: boolean;
    mfa?: boolean;
    metadata?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identitySession"]>;
export type IdentitySessionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    authVersion?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
    lastActiveAt?: boolean;
    mfa?: boolean;
    metadata?: boolean;
};
export type IdentitySessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "authVersion" | "createdAt" | "expiresAt" | "lastActiveAt" | "mfa" | "metadata", ExtArgs["result"]["identitySession"]>;
export type IdentitySessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type IdentitySessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type IdentitySessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $IdentitySessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdentitySession";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        authVersion: number;
        createdAt: Date;
        expiresAt: Date;
        lastActiveAt: Date;
        mfa: string | null;
        metadata: runtime.JsonValue;
    }, ExtArgs["result"]["identitySession"]>;
    composites: {};
};
export type IdentitySessionGetPayload<S extends boolean | null | undefined | IdentitySessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentitySessionPayload, S>;
export type IdentitySessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentitySessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentitySessionCountAggregateInputType | true;
};
export interface IdentitySessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdentitySession'];
        meta: {
            name: 'IdentitySession';
        };
    };
    findUnique<T extends IdentitySessionFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentitySessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentitySessionClient<runtime.Types.Result.GetResult<Prisma.$IdentitySessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentitySessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentitySessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentitySessionClient<runtime.Types.Result.GetResult<Prisma.$IdentitySessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentitySessionFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentitySessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentitySessionClient<runtime.Types.Result.GetResult<Prisma.$IdentitySessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentitySessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentitySessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentitySessionClient<runtime.Types.Result.GetResult<Prisma.$IdentitySessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentitySessionFindManyArgs>(args?: Prisma.SelectSubset<T, IdentitySessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentitySessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentitySessionCreateArgs>(args: Prisma.SelectSubset<T, IdentitySessionCreateArgs<ExtArgs>>): Prisma.Prisma__IdentitySessionClient<runtime.Types.Result.GetResult<Prisma.$IdentitySessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentitySessionCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentitySessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentitySessionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentitySessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentitySessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentitySessionDeleteArgs>(args: Prisma.SelectSubset<T, IdentitySessionDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentitySessionClient<runtime.Types.Result.GetResult<Prisma.$IdentitySessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentitySessionUpdateArgs>(args: Prisma.SelectSubset<T, IdentitySessionUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentitySessionClient<runtime.Types.Result.GetResult<Prisma.$IdentitySessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentitySessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentitySessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentitySessionUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentitySessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentitySessionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentitySessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentitySessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentitySessionUpsertArgs>(args: Prisma.SelectSubset<T, IdentitySessionUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentitySessionClient<runtime.Types.Result.GetResult<Prisma.$IdentitySessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentitySessionCountArgs>(args?: Prisma.Subset<T, IdentitySessionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentitySessionCountAggregateOutputType> : number>;
    aggregate<T extends IdentitySessionAggregateArgs>(args: Prisma.Subset<T, IdentitySessionAggregateArgs>): Prisma.PrismaPromise<GetIdentitySessionAggregateType<T>>;
    groupBy<T extends IdentitySessionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentitySessionGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentitySessionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentitySessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentitySessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentitySessionFieldRefs;
}
export interface Prisma__IdentitySessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentitySessionFieldRefs {
    readonly id: Prisma.FieldRef<"IdentitySession", 'String'>;
    readonly userId: Prisma.FieldRef<"IdentitySession", 'String'>;
    readonly authVersion: Prisma.FieldRef<"IdentitySession", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"IdentitySession", 'DateTime'>;
    readonly expiresAt: Prisma.FieldRef<"IdentitySession", 'DateTime'>;
    readonly lastActiveAt: Prisma.FieldRef<"IdentitySession", 'DateTime'>;
    readonly mfa: Prisma.FieldRef<"IdentitySession", 'String'>;
    readonly metadata: Prisma.FieldRef<"IdentitySession", 'Json'>;
}
export type IdentitySessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySessionSelect<ExtArgs> | null;
    omit?: Prisma.IdentitySessionOmit<ExtArgs> | null;
    include?: Prisma.IdentitySessionInclude<ExtArgs> | null;
    where: Prisma.IdentitySessionWhereUniqueInput;
};
export type IdentitySessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySessionSelect<ExtArgs> | null;
    omit?: Prisma.IdentitySessionOmit<ExtArgs> | null;
    include?: Prisma.IdentitySessionInclude<ExtArgs> | null;
    where: Prisma.IdentitySessionWhereUniqueInput;
};
export type IdentitySessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySessionSelect<ExtArgs> | null;
    omit?: Prisma.IdentitySessionOmit<ExtArgs> | null;
    include?: Prisma.IdentitySessionInclude<ExtArgs> | null;
    where?: Prisma.IdentitySessionWhereInput;
    orderBy?: Prisma.IdentitySessionOrderByWithRelationInput | Prisma.IdentitySessionOrderByWithRelationInput[];
    cursor?: Prisma.IdentitySessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentitySessionScalarFieldEnum | Prisma.IdentitySessionScalarFieldEnum[];
};
export type IdentitySessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySessionSelect<ExtArgs> | null;
    omit?: Prisma.IdentitySessionOmit<ExtArgs> | null;
    include?: Prisma.IdentitySessionInclude<ExtArgs> | null;
    where?: Prisma.IdentitySessionWhereInput;
    orderBy?: Prisma.IdentitySessionOrderByWithRelationInput | Prisma.IdentitySessionOrderByWithRelationInput[];
    cursor?: Prisma.IdentitySessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentitySessionScalarFieldEnum | Prisma.IdentitySessionScalarFieldEnum[];
};
export type IdentitySessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySessionSelect<ExtArgs> | null;
    omit?: Prisma.IdentitySessionOmit<ExtArgs> | null;
    include?: Prisma.IdentitySessionInclude<ExtArgs> | null;
    where?: Prisma.IdentitySessionWhereInput;
    orderBy?: Prisma.IdentitySessionOrderByWithRelationInput | Prisma.IdentitySessionOrderByWithRelationInput[];
    cursor?: Prisma.IdentitySessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentitySessionScalarFieldEnum | Prisma.IdentitySessionScalarFieldEnum[];
};
export type IdentitySessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySessionSelect<ExtArgs> | null;
    omit?: Prisma.IdentitySessionOmit<ExtArgs> | null;
    include?: Prisma.IdentitySessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentitySessionCreateInput, Prisma.IdentitySessionUncheckedCreateInput>;
};
export type IdentitySessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentitySessionCreateManyInput | Prisma.IdentitySessionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentitySessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySessionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentitySessionOmit<ExtArgs> | null;
    data: Prisma.IdentitySessionCreateManyInput | Prisma.IdentitySessionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.IdentitySessionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type IdentitySessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySessionSelect<ExtArgs> | null;
    omit?: Prisma.IdentitySessionOmit<ExtArgs> | null;
    include?: Prisma.IdentitySessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentitySessionUpdateInput, Prisma.IdentitySessionUncheckedUpdateInput>;
    where: Prisma.IdentitySessionWhereUniqueInput;
};
export type IdentitySessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentitySessionUpdateManyMutationInput, Prisma.IdentitySessionUncheckedUpdateManyInput>;
    where?: Prisma.IdentitySessionWhereInput;
    limit?: number;
};
export type IdentitySessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySessionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentitySessionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentitySessionUpdateManyMutationInput, Prisma.IdentitySessionUncheckedUpdateManyInput>;
    where?: Prisma.IdentitySessionWhereInput;
    limit?: number;
    include?: Prisma.IdentitySessionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type IdentitySessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySessionSelect<ExtArgs> | null;
    omit?: Prisma.IdentitySessionOmit<ExtArgs> | null;
    include?: Prisma.IdentitySessionInclude<ExtArgs> | null;
    where: Prisma.IdentitySessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentitySessionCreateInput, Prisma.IdentitySessionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentitySessionUpdateInput, Prisma.IdentitySessionUncheckedUpdateInput>;
};
export type IdentitySessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySessionSelect<ExtArgs> | null;
    omit?: Prisma.IdentitySessionOmit<ExtArgs> | null;
    include?: Prisma.IdentitySessionInclude<ExtArgs> | null;
    where: Prisma.IdentitySessionWhereUniqueInput;
};
export type IdentitySessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentitySessionWhereInput;
    limit?: number;
};
export type IdentitySessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySessionSelect<ExtArgs> | null;
    omit?: Prisma.IdentitySessionOmit<ExtArgs> | null;
    include?: Prisma.IdentitySessionInclude<ExtArgs> | null;
};
