import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentityChallengeModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentityChallengePayload>;
export type AggregateIdentityChallenge = {
    _count: IdentityChallengeCountAggregateOutputType | null;
    _avg: IdentityChallengeAvgAggregateOutputType | null;
    _sum: IdentityChallengeSumAggregateOutputType | null;
    _min: IdentityChallengeMinAggregateOutputType | null;
    _max: IdentityChallengeMaxAggregateOutputType | null;
};
export type IdentityChallengeAvgAggregateOutputType = {
    authVersion: number | null;
};
export type IdentityChallengeSumAggregateOutputType = {
    authVersion: number | null;
};
export type IdentityChallengeMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    kind: string | null;
    authVersion: number | null;
    identityId: string | null;
    tokenHash: string | null;
    expiresAt: Date | null;
    consumedAt: Date | null;
    createdAt: Date | null;
};
export type IdentityChallengeMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    kind: string | null;
    authVersion: number | null;
    identityId: string | null;
    tokenHash: string | null;
    expiresAt: Date | null;
    consumedAt: Date | null;
    createdAt: Date | null;
};
export type IdentityChallengeCountAggregateOutputType = {
    id: number;
    userId: number;
    kind: number;
    authVersion: number;
    identityId: number;
    tokenHash: number;
    expiresAt: number;
    consumedAt: number;
    createdAt: number;
    _all: number;
};
export type IdentityChallengeAvgAggregateInputType = {
    authVersion?: true;
};
export type IdentityChallengeSumAggregateInputType = {
    authVersion?: true;
};
export type IdentityChallengeMinAggregateInputType = {
    id?: true;
    userId?: true;
    kind?: true;
    authVersion?: true;
    identityId?: true;
    tokenHash?: true;
    expiresAt?: true;
    consumedAt?: true;
    createdAt?: true;
};
export type IdentityChallengeMaxAggregateInputType = {
    id?: true;
    userId?: true;
    kind?: true;
    authVersion?: true;
    identityId?: true;
    tokenHash?: true;
    expiresAt?: true;
    consumedAt?: true;
    createdAt?: true;
};
export type IdentityChallengeCountAggregateInputType = {
    id?: true;
    userId?: true;
    kind?: true;
    authVersion?: true;
    identityId?: true;
    tokenHash?: true;
    expiresAt?: true;
    consumedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type IdentityChallengeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityChallengeWhereInput;
    orderBy?: Prisma.IdentityChallengeOrderByWithRelationInput | Prisma.IdentityChallengeOrderByWithRelationInput[];
    cursor?: Prisma.IdentityChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentityChallengeCountAggregateInputType;
    _avg?: IdentityChallengeAvgAggregateInputType;
    _sum?: IdentityChallengeSumAggregateInputType;
    _min?: IdentityChallengeMinAggregateInputType;
    _max?: IdentityChallengeMaxAggregateInputType;
};
export type GetIdentityChallengeAggregateType<T extends IdentityChallengeAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentityChallenge]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentityChallenge[P]> : Prisma.GetScalarType<T[P], AggregateIdentityChallenge[P]>;
};
export type IdentityChallengeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityChallengeWhereInput;
    orderBy?: Prisma.IdentityChallengeOrderByWithAggregationInput | Prisma.IdentityChallengeOrderByWithAggregationInput[];
    by: Prisma.IdentityChallengeScalarFieldEnum[] | Prisma.IdentityChallengeScalarFieldEnum;
    having?: Prisma.IdentityChallengeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentityChallengeCountAggregateInputType | true;
    _avg?: IdentityChallengeAvgAggregateInputType;
    _sum?: IdentityChallengeSumAggregateInputType;
    _min?: IdentityChallengeMinAggregateInputType;
    _max?: IdentityChallengeMaxAggregateInputType;
};
export type IdentityChallengeGroupByOutputType = {
    id: string;
    userId: string;
    kind: string;
    authVersion: number;
    identityId: string | null;
    tokenHash: string;
    expiresAt: Date;
    consumedAt: Date | null;
    createdAt: Date;
    _count: IdentityChallengeCountAggregateOutputType | null;
    _avg: IdentityChallengeAvgAggregateOutputType | null;
    _sum: IdentityChallengeSumAggregateOutputType | null;
    _min: IdentityChallengeMinAggregateOutputType | null;
    _max: IdentityChallengeMaxAggregateOutputType | null;
};
export type GetIdentityChallengeGroupByPayload<T extends IdentityChallengeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentityChallengeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentityChallengeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentityChallengeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentityChallengeGroupByOutputType[P]>;
}>>;
export type IdentityChallengeWhereInput = {
    AND?: Prisma.IdentityChallengeWhereInput | Prisma.IdentityChallengeWhereInput[];
    OR?: Prisma.IdentityChallengeWhereInput[];
    NOT?: Prisma.IdentityChallengeWhereInput | Prisma.IdentityChallengeWhereInput[];
    id?: Prisma.UuidFilter<"IdentityChallenge"> | string;
    userId?: Prisma.UuidFilter<"IdentityChallenge"> | string;
    kind?: Prisma.StringFilter<"IdentityChallenge"> | string;
    authVersion?: Prisma.IntFilter<"IdentityChallenge"> | number;
    identityId?: Prisma.UuidNullableFilter<"IdentityChallenge"> | string | null;
    tokenHash?: Prisma.StringFilter<"IdentityChallenge"> | string;
    expiresAt?: Prisma.DateTimeFilter<"IdentityChallenge"> | Date | string;
    consumedAt?: Prisma.DateTimeNullableFilter<"IdentityChallenge"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"IdentityChallenge"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    identity?: Prisma.XOR<Prisma.InstitutionalLoginNullableScalarRelationFilter, Prisma.InstitutionalLoginWhereInput> | null;
};
export type IdentityChallengeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    identityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    identity?: Prisma.InstitutionalLoginOrderByWithRelationInput;
};
export type IdentityChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tokenHash?: string;
    AND?: Prisma.IdentityChallengeWhereInput | Prisma.IdentityChallengeWhereInput[];
    OR?: Prisma.IdentityChallengeWhereInput[];
    NOT?: Prisma.IdentityChallengeWhereInput | Prisma.IdentityChallengeWhereInput[];
    userId?: Prisma.UuidFilter<"IdentityChallenge"> | string;
    kind?: Prisma.StringFilter<"IdentityChallenge"> | string;
    authVersion?: Prisma.IntFilter<"IdentityChallenge"> | number;
    identityId?: Prisma.UuidNullableFilter<"IdentityChallenge"> | string | null;
    expiresAt?: Prisma.DateTimeFilter<"IdentityChallenge"> | Date | string;
    consumedAt?: Prisma.DateTimeNullableFilter<"IdentityChallenge"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"IdentityChallenge"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    identity?: Prisma.XOR<Prisma.InstitutionalLoginNullableScalarRelationFilter, Prisma.InstitutionalLoginWhereInput> | null;
}, "id" | "tokenHash">;
export type IdentityChallengeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    identityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.IdentityChallengeCountOrderByAggregateInput;
    _avg?: Prisma.IdentityChallengeAvgOrderByAggregateInput;
    _max?: Prisma.IdentityChallengeMaxOrderByAggregateInput;
    _min?: Prisma.IdentityChallengeMinOrderByAggregateInput;
    _sum?: Prisma.IdentityChallengeSumOrderByAggregateInput;
};
export type IdentityChallengeScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentityChallengeScalarWhereWithAggregatesInput | Prisma.IdentityChallengeScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentityChallengeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentityChallengeScalarWhereWithAggregatesInput | Prisma.IdentityChallengeScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"IdentityChallenge"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"IdentityChallenge"> | string;
    kind?: Prisma.StringWithAggregatesFilter<"IdentityChallenge"> | string;
    authVersion?: Prisma.IntWithAggregatesFilter<"IdentityChallenge"> | number;
    identityId?: Prisma.UuidNullableWithAggregatesFilter<"IdentityChallenge"> | string | null;
    tokenHash?: Prisma.StringWithAggregatesFilter<"IdentityChallenge"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"IdentityChallenge"> | Date | string;
    consumedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"IdentityChallenge"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"IdentityChallenge"> | Date | string;
};
export type IdentityChallengeCreateInput = {
    id?: string;
    kind: string;
    authVersion?: number;
    tokenHash: string;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutChallengesInput;
    identity?: Prisma.InstitutionalLoginCreateNestedOneWithoutChallengesInput;
};
export type IdentityChallengeUncheckedCreateInput = {
    id?: string;
    userId: string;
    kind: string;
    authVersion?: number;
    identityId?: string | null;
    tokenHash: string;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type IdentityChallengeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutChallengesNestedInput;
    identity?: Prisma.InstitutionalLoginUpdateOneWithoutChallengesNestedInput;
};
export type IdentityChallengeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    identityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityChallengeCreateManyInput = {
    id?: string;
    userId: string;
    kind: string;
    authVersion?: number;
    identityId?: string | null;
    tokenHash: string;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type IdentityChallengeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityChallengeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    identityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityChallengeListRelationFilter = {
    every?: Prisma.IdentityChallengeWhereInput;
    some?: Prisma.IdentityChallengeWhereInput;
    none?: Prisma.IdentityChallengeWhereInput;
};
export type IdentityChallengeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IdentityChallengeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    identityId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityChallengeAvgOrderByAggregateInput = {
    authVersion?: Prisma.SortOrder;
};
export type IdentityChallengeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    identityId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityChallengeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    identityId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityChallengeSumOrderByAggregateInput = {
    authVersion?: Prisma.SortOrder;
};
export type IdentityChallengeCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.IdentityChallengeCreateWithoutUserInput, Prisma.IdentityChallengeUncheckedCreateWithoutUserInput> | Prisma.IdentityChallengeCreateWithoutUserInput[] | Prisma.IdentityChallengeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityChallengeCreateOrConnectWithoutUserInput | Prisma.IdentityChallengeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.IdentityChallengeCreateManyUserInputEnvelope;
    connect?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
};
export type IdentityChallengeUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.IdentityChallengeCreateWithoutUserInput, Prisma.IdentityChallengeUncheckedCreateWithoutUserInput> | Prisma.IdentityChallengeCreateWithoutUserInput[] | Prisma.IdentityChallengeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityChallengeCreateOrConnectWithoutUserInput | Prisma.IdentityChallengeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.IdentityChallengeCreateManyUserInputEnvelope;
    connect?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
};
export type IdentityChallengeUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityChallengeCreateWithoutUserInput, Prisma.IdentityChallengeUncheckedCreateWithoutUserInput> | Prisma.IdentityChallengeCreateWithoutUserInput[] | Prisma.IdentityChallengeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityChallengeCreateOrConnectWithoutUserInput | Prisma.IdentityChallengeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.IdentityChallengeUpsertWithWhereUniqueWithoutUserInput | Prisma.IdentityChallengeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.IdentityChallengeCreateManyUserInputEnvelope;
    set?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    disconnect?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    delete?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    connect?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    update?: Prisma.IdentityChallengeUpdateWithWhereUniqueWithoutUserInput | Prisma.IdentityChallengeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.IdentityChallengeUpdateManyWithWhereWithoutUserInput | Prisma.IdentityChallengeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.IdentityChallengeScalarWhereInput | Prisma.IdentityChallengeScalarWhereInput[];
};
export type IdentityChallengeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityChallengeCreateWithoutUserInput, Prisma.IdentityChallengeUncheckedCreateWithoutUserInput> | Prisma.IdentityChallengeCreateWithoutUserInput[] | Prisma.IdentityChallengeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityChallengeCreateOrConnectWithoutUserInput | Prisma.IdentityChallengeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.IdentityChallengeUpsertWithWhereUniqueWithoutUserInput | Prisma.IdentityChallengeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.IdentityChallengeCreateManyUserInputEnvelope;
    set?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    disconnect?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    delete?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    connect?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    update?: Prisma.IdentityChallengeUpdateWithWhereUniqueWithoutUserInput | Prisma.IdentityChallengeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.IdentityChallengeUpdateManyWithWhereWithoutUserInput | Prisma.IdentityChallengeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.IdentityChallengeScalarWhereInput | Prisma.IdentityChallengeScalarWhereInput[];
};
export type IdentityChallengeCreateNestedManyWithoutIdentityInput = {
    create?: Prisma.XOR<Prisma.IdentityChallengeCreateWithoutIdentityInput, Prisma.IdentityChallengeUncheckedCreateWithoutIdentityInput> | Prisma.IdentityChallengeCreateWithoutIdentityInput[] | Prisma.IdentityChallengeUncheckedCreateWithoutIdentityInput[];
    connectOrCreate?: Prisma.IdentityChallengeCreateOrConnectWithoutIdentityInput | Prisma.IdentityChallengeCreateOrConnectWithoutIdentityInput[];
    createMany?: Prisma.IdentityChallengeCreateManyIdentityInputEnvelope;
    connect?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
};
export type IdentityChallengeUncheckedCreateNestedManyWithoutIdentityInput = {
    create?: Prisma.XOR<Prisma.IdentityChallengeCreateWithoutIdentityInput, Prisma.IdentityChallengeUncheckedCreateWithoutIdentityInput> | Prisma.IdentityChallengeCreateWithoutIdentityInput[] | Prisma.IdentityChallengeUncheckedCreateWithoutIdentityInput[];
    connectOrCreate?: Prisma.IdentityChallengeCreateOrConnectWithoutIdentityInput | Prisma.IdentityChallengeCreateOrConnectWithoutIdentityInput[];
    createMany?: Prisma.IdentityChallengeCreateManyIdentityInputEnvelope;
    connect?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
};
export type IdentityChallengeUpdateManyWithoutIdentityNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityChallengeCreateWithoutIdentityInput, Prisma.IdentityChallengeUncheckedCreateWithoutIdentityInput> | Prisma.IdentityChallengeCreateWithoutIdentityInput[] | Prisma.IdentityChallengeUncheckedCreateWithoutIdentityInput[];
    connectOrCreate?: Prisma.IdentityChallengeCreateOrConnectWithoutIdentityInput | Prisma.IdentityChallengeCreateOrConnectWithoutIdentityInput[];
    upsert?: Prisma.IdentityChallengeUpsertWithWhereUniqueWithoutIdentityInput | Prisma.IdentityChallengeUpsertWithWhereUniqueWithoutIdentityInput[];
    createMany?: Prisma.IdentityChallengeCreateManyIdentityInputEnvelope;
    set?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    disconnect?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    delete?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    connect?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    update?: Prisma.IdentityChallengeUpdateWithWhereUniqueWithoutIdentityInput | Prisma.IdentityChallengeUpdateWithWhereUniqueWithoutIdentityInput[];
    updateMany?: Prisma.IdentityChallengeUpdateManyWithWhereWithoutIdentityInput | Prisma.IdentityChallengeUpdateManyWithWhereWithoutIdentityInput[];
    deleteMany?: Prisma.IdentityChallengeScalarWhereInput | Prisma.IdentityChallengeScalarWhereInput[];
};
export type IdentityChallengeUncheckedUpdateManyWithoutIdentityNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityChallengeCreateWithoutIdentityInput, Prisma.IdentityChallengeUncheckedCreateWithoutIdentityInput> | Prisma.IdentityChallengeCreateWithoutIdentityInput[] | Prisma.IdentityChallengeUncheckedCreateWithoutIdentityInput[];
    connectOrCreate?: Prisma.IdentityChallengeCreateOrConnectWithoutIdentityInput | Prisma.IdentityChallengeCreateOrConnectWithoutIdentityInput[];
    upsert?: Prisma.IdentityChallengeUpsertWithWhereUniqueWithoutIdentityInput | Prisma.IdentityChallengeUpsertWithWhereUniqueWithoutIdentityInput[];
    createMany?: Prisma.IdentityChallengeCreateManyIdentityInputEnvelope;
    set?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    disconnect?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    delete?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    connect?: Prisma.IdentityChallengeWhereUniqueInput | Prisma.IdentityChallengeWhereUniqueInput[];
    update?: Prisma.IdentityChallengeUpdateWithWhereUniqueWithoutIdentityInput | Prisma.IdentityChallengeUpdateWithWhereUniqueWithoutIdentityInput[];
    updateMany?: Prisma.IdentityChallengeUpdateManyWithWhereWithoutIdentityInput | Prisma.IdentityChallengeUpdateManyWithWhereWithoutIdentityInput[];
    deleteMany?: Prisma.IdentityChallengeScalarWhereInput | Prisma.IdentityChallengeScalarWhereInput[];
};
export type IdentityChallengeCreateWithoutUserInput = {
    id?: string;
    kind: string;
    authVersion?: number;
    tokenHash: string;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
    identity?: Prisma.InstitutionalLoginCreateNestedOneWithoutChallengesInput;
};
export type IdentityChallengeUncheckedCreateWithoutUserInput = {
    id?: string;
    kind: string;
    authVersion?: number;
    identityId?: string | null;
    tokenHash: string;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type IdentityChallengeCreateOrConnectWithoutUserInput = {
    where: Prisma.IdentityChallengeWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityChallengeCreateWithoutUserInput, Prisma.IdentityChallengeUncheckedCreateWithoutUserInput>;
};
export type IdentityChallengeCreateManyUserInputEnvelope = {
    data: Prisma.IdentityChallengeCreateManyUserInput | Prisma.IdentityChallengeCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type IdentityChallengeUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.IdentityChallengeWhereUniqueInput;
    update: Prisma.XOR<Prisma.IdentityChallengeUpdateWithoutUserInput, Prisma.IdentityChallengeUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.IdentityChallengeCreateWithoutUserInput, Prisma.IdentityChallengeUncheckedCreateWithoutUserInput>;
};
export type IdentityChallengeUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.IdentityChallengeWhereUniqueInput;
    data: Prisma.XOR<Prisma.IdentityChallengeUpdateWithoutUserInput, Prisma.IdentityChallengeUncheckedUpdateWithoutUserInput>;
};
export type IdentityChallengeUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.IdentityChallengeScalarWhereInput;
    data: Prisma.XOR<Prisma.IdentityChallengeUpdateManyMutationInput, Prisma.IdentityChallengeUncheckedUpdateManyWithoutUserInput>;
};
export type IdentityChallengeScalarWhereInput = {
    AND?: Prisma.IdentityChallengeScalarWhereInput | Prisma.IdentityChallengeScalarWhereInput[];
    OR?: Prisma.IdentityChallengeScalarWhereInput[];
    NOT?: Prisma.IdentityChallengeScalarWhereInput | Prisma.IdentityChallengeScalarWhereInput[];
    id?: Prisma.UuidFilter<"IdentityChallenge"> | string;
    userId?: Prisma.UuidFilter<"IdentityChallenge"> | string;
    kind?: Prisma.StringFilter<"IdentityChallenge"> | string;
    authVersion?: Prisma.IntFilter<"IdentityChallenge"> | number;
    identityId?: Prisma.UuidNullableFilter<"IdentityChallenge"> | string | null;
    tokenHash?: Prisma.StringFilter<"IdentityChallenge"> | string;
    expiresAt?: Prisma.DateTimeFilter<"IdentityChallenge"> | Date | string;
    consumedAt?: Prisma.DateTimeNullableFilter<"IdentityChallenge"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"IdentityChallenge"> | Date | string;
};
export type IdentityChallengeCreateWithoutIdentityInput = {
    id?: string;
    kind: string;
    authVersion?: number;
    tokenHash: string;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutChallengesInput;
};
export type IdentityChallengeUncheckedCreateWithoutIdentityInput = {
    id?: string;
    userId: string;
    kind: string;
    authVersion?: number;
    tokenHash: string;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type IdentityChallengeCreateOrConnectWithoutIdentityInput = {
    where: Prisma.IdentityChallengeWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityChallengeCreateWithoutIdentityInput, Prisma.IdentityChallengeUncheckedCreateWithoutIdentityInput>;
};
export type IdentityChallengeCreateManyIdentityInputEnvelope = {
    data: Prisma.IdentityChallengeCreateManyIdentityInput | Prisma.IdentityChallengeCreateManyIdentityInput[];
    skipDuplicates?: boolean;
};
export type IdentityChallengeUpsertWithWhereUniqueWithoutIdentityInput = {
    where: Prisma.IdentityChallengeWhereUniqueInput;
    update: Prisma.XOR<Prisma.IdentityChallengeUpdateWithoutIdentityInput, Prisma.IdentityChallengeUncheckedUpdateWithoutIdentityInput>;
    create: Prisma.XOR<Prisma.IdentityChallengeCreateWithoutIdentityInput, Prisma.IdentityChallengeUncheckedCreateWithoutIdentityInput>;
};
export type IdentityChallengeUpdateWithWhereUniqueWithoutIdentityInput = {
    where: Prisma.IdentityChallengeWhereUniqueInput;
    data: Prisma.XOR<Prisma.IdentityChallengeUpdateWithoutIdentityInput, Prisma.IdentityChallengeUncheckedUpdateWithoutIdentityInput>;
};
export type IdentityChallengeUpdateManyWithWhereWithoutIdentityInput = {
    where: Prisma.IdentityChallengeScalarWhereInput;
    data: Prisma.XOR<Prisma.IdentityChallengeUpdateManyMutationInput, Prisma.IdentityChallengeUncheckedUpdateManyWithoutIdentityInput>;
};
export type IdentityChallengeCreateManyUserInput = {
    id?: string;
    kind: string;
    authVersion?: number;
    identityId?: string | null;
    tokenHash: string;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type IdentityChallengeUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    identity?: Prisma.InstitutionalLoginUpdateOneWithoutChallengesNestedInput;
};
export type IdentityChallengeUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    identityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityChallengeUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    identityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityChallengeCreateManyIdentityInput = {
    id?: string;
    userId: string;
    kind: string;
    authVersion?: number;
    tokenHash: string;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type IdentityChallengeUpdateWithoutIdentityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutChallengesNestedInput;
};
export type IdentityChallengeUncheckedUpdateWithoutIdentityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityChallengeUncheckedUpdateManyWithoutIdentityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    authVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityChallengeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    kind?: boolean;
    authVersion?: boolean;
    identityId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    consumedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    identity?: boolean | Prisma.IdentityChallenge$identityArgs<ExtArgs>;
}, ExtArgs["result"]["identityChallenge"]>;
export type IdentityChallengeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    kind?: boolean;
    authVersion?: boolean;
    identityId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    consumedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    identity?: boolean | Prisma.IdentityChallenge$identityArgs<ExtArgs>;
}, ExtArgs["result"]["identityChallenge"]>;
export type IdentityChallengeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    kind?: boolean;
    authVersion?: boolean;
    identityId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    consumedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    identity?: boolean | Prisma.IdentityChallenge$identityArgs<ExtArgs>;
}, ExtArgs["result"]["identityChallenge"]>;
export type IdentityChallengeSelectScalar = {
    id?: boolean;
    userId?: boolean;
    kind?: boolean;
    authVersion?: boolean;
    identityId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    consumedAt?: boolean;
    createdAt?: boolean;
};
export type IdentityChallengeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "kind" | "authVersion" | "identityId" | "tokenHash" | "expiresAt" | "consumedAt" | "createdAt", ExtArgs["result"]["identityChallenge"]>;
export type IdentityChallengeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    identity?: boolean | Prisma.IdentityChallenge$identityArgs<ExtArgs>;
};
export type IdentityChallengeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    identity?: boolean | Prisma.IdentityChallenge$identityArgs<ExtArgs>;
};
export type IdentityChallengeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    identity?: boolean | Prisma.IdentityChallenge$identityArgs<ExtArgs>;
};
export type $IdentityChallengePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdentityChallenge";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        identity: Prisma.$InstitutionalLoginPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        kind: string;
        authVersion: number;
        identityId: string | null;
        tokenHash: string;
        expiresAt: Date;
        consumedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["identityChallenge"]>;
    composites: {};
};
export type IdentityChallengeGetPayload<S extends boolean | null | undefined | IdentityChallengeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload, S>;
export type IdentityChallengeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentityChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentityChallengeCountAggregateInputType | true;
};
export interface IdentityChallengeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdentityChallenge'];
        meta: {
            name: 'IdentityChallenge';
        };
    };
    findUnique<T extends IdentityChallengeFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentityChallengeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentityChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentityChallengeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentityChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentityChallengeFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentityChallengeFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentityChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentityChallengeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentityChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentityChallengeFindManyArgs>(args?: Prisma.SelectSubset<T, IdentityChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentityChallengeCreateArgs>(args: Prisma.SelectSubset<T, IdentityChallengeCreateArgs<ExtArgs>>): Prisma.Prisma__IdentityChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentityChallengeCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentityChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentityChallengeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentityChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentityChallengeDeleteArgs>(args: Prisma.SelectSubset<T, IdentityChallengeDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentityChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentityChallengeUpdateArgs>(args: Prisma.SelectSubset<T, IdentityChallengeUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentityChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentityChallengeDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentityChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentityChallengeUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentityChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentityChallengeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentityChallengeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentityChallengeUpsertArgs>(args: Prisma.SelectSubset<T, IdentityChallengeUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentityChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentityChallengeCountArgs>(args?: Prisma.Subset<T, IdentityChallengeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentityChallengeCountAggregateOutputType> : number>;
    aggregate<T extends IdentityChallengeAggregateArgs>(args: Prisma.Subset<T, IdentityChallengeAggregateArgs>): Prisma.PrismaPromise<GetIdentityChallengeAggregateType<T>>;
    groupBy<T extends IdentityChallengeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentityChallengeGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentityChallengeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentityChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentityChallengeFieldRefs;
}
export interface Prisma__IdentityChallengeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    identity<T extends Prisma.IdentityChallenge$identityArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.IdentityChallenge$identityArgs<ExtArgs>>): Prisma.Prisma__InstitutionalLoginClient<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentityChallengeFieldRefs {
    readonly id: Prisma.FieldRef<"IdentityChallenge", 'String'>;
    readonly userId: Prisma.FieldRef<"IdentityChallenge", 'String'>;
    readonly kind: Prisma.FieldRef<"IdentityChallenge", 'String'>;
    readonly authVersion: Prisma.FieldRef<"IdentityChallenge", 'Int'>;
    readonly identityId: Prisma.FieldRef<"IdentityChallenge", 'String'>;
    readonly tokenHash: Prisma.FieldRef<"IdentityChallenge", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"IdentityChallenge", 'DateTime'>;
    readonly consumedAt: Prisma.FieldRef<"IdentityChallenge", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"IdentityChallenge", 'DateTime'>;
}
export type IdentityChallengeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityChallengeOmit<ExtArgs> | null;
    include?: Prisma.IdentityChallengeInclude<ExtArgs> | null;
    where: Prisma.IdentityChallengeWhereUniqueInput;
};
export type IdentityChallengeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityChallengeOmit<ExtArgs> | null;
    include?: Prisma.IdentityChallengeInclude<ExtArgs> | null;
    where: Prisma.IdentityChallengeWhereUniqueInput;
};
export type IdentityChallengeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityChallengeOmit<ExtArgs> | null;
    include?: Prisma.IdentityChallengeInclude<ExtArgs> | null;
    where?: Prisma.IdentityChallengeWhereInput;
    orderBy?: Prisma.IdentityChallengeOrderByWithRelationInput | Prisma.IdentityChallengeOrderByWithRelationInput[];
    cursor?: Prisma.IdentityChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityChallengeScalarFieldEnum | Prisma.IdentityChallengeScalarFieldEnum[];
};
export type IdentityChallengeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityChallengeOmit<ExtArgs> | null;
    include?: Prisma.IdentityChallengeInclude<ExtArgs> | null;
    where?: Prisma.IdentityChallengeWhereInput;
    orderBy?: Prisma.IdentityChallengeOrderByWithRelationInput | Prisma.IdentityChallengeOrderByWithRelationInput[];
    cursor?: Prisma.IdentityChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityChallengeScalarFieldEnum | Prisma.IdentityChallengeScalarFieldEnum[];
};
export type IdentityChallengeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityChallengeOmit<ExtArgs> | null;
    include?: Prisma.IdentityChallengeInclude<ExtArgs> | null;
    where?: Prisma.IdentityChallengeWhereInput;
    orderBy?: Prisma.IdentityChallengeOrderByWithRelationInput | Prisma.IdentityChallengeOrderByWithRelationInput[];
    cursor?: Prisma.IdentityChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityChallengeScalarFieldEnum | Prisma.IdentityChallengeScalarFieldEnum[];
};
export type IdentityChallengeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityChallengeOmit<ExtArgs> | null;
    include?: Prisma.IdentityChallengeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityChallengeCreateInput, Prisma.IdentityChallengeUncheckedCreateInput>;
};
export type IdentityChallengeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentityChallengeCreateManyInput | Prisma.IdentityChallengeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityChallengeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityChallengeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityChallengeOmit<ExtArgs> | null;
    data: Prisma.IdentityChallengeCreateManyInput | Prisma.IdentityChallengeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.IdentityChallengeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type IdentityChallengeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityChallengeOmit<ExtArgs> | null;
    include?: Prisma.IdentityChallengeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityChallengeUpdateInput, Prisma.IdentityChallengeUncheckedUpdateInput>;
    where: Prisma.IdentityChallengeWhereUniqueInput;
};
export type IdentityChallengeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentityChallengeUpdateManyMutationInput, Prisma.IdentityChallengeUncheckedUpdateManyInput>;
    where?: Prisma.IdentityChallengeWhereInput;
    limit?: number;
};
export type IdentityChallengeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityChallengeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityChallengeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityChallengeUpdateManyMutationInput, Prisma.IdentityChallengeUncheckedUpdateManyInput>;
    where?: Prisma.IdentityChallengeWhereInput;
    limit?: number;
    include?: Prisma.IdentityChallengeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type IdentityChallengeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityChallengeOmit<ExtArgs> | null;
    include?: Prisma.IdentityChallengeInclude<ExtArgs> | null;
    where: Prisma.IdentityChallengeWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityChallengeCreateInput, Prisma.IdentityChallengeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentityChallengeUpdateInput, Prisma.IdentityChallengeUncheckedUpdateInput>;
};
export type IdentityChallengeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityChallengeOmit<ExtArgs> | null;
    include?: Prisma.IdentityChallengeInclude<ExtArgs> | null;
    where: Prisma.IdentityChallengeWhereUniqueInput;
};
export type IdentityChallengeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityChallengeWhereInput;
    limit?: number;
};
export type IdentityChallenge$identityArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    include?: Prisma.InstitutionalLoginInclude<ExtArgs> | null;
    where?: Prisma.InstitutionalLoginWhereInput;
};
export type IdentityChallengeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityChallengeOmit<ExtArgs> | null;
    include?: Prisma.IdentityChallengeInclude<ExtArgs> | null;
};
