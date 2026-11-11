import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InstitutionalLoginModel = runtime.Types.Result.DefaultSelection<Prisma.$InstitutionalLoginPayload>;
export type AggregateInstitutionalLogin = {
    _count: InstitutionalLoginCountAggregateOutputType | null;
    _avg: InstitutionalLoginAvgAggregateOutputType | null;
    _sum: InstitutionalLoginSumAggregateOutputType | null;
    _min: InstitutionalLoginMinAggregateOutputType | null;
    _max: InstitutionalLoginMaxAggregateOutputType | null;
};
export type InstitutionalLoginAvgAggregateOutputType = {
    hiringYear: number | null;
    sequence: number | null;
};
export type InstitutionalLoginSumAggregateOutputType = {
    hiringYear: number | null;
    sequence: bigint | null;
};
export type InstitutionalLoginMinAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    userId: string | null;
    kind: string | null;
    identifier: string | null;
    normalized: string | null;
    status: string | null;
    staffType: string | null;
    hiringYear: number | null;
    legacy: boolean | null;
    sequence: bigint | null;
    activatedAt: Date | null;
    contactEmail: string | null;
    createdAt: Date | null;
};
export type InstitutionalLoginMaxAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    userId: string | null;
    kind: string | null;
    identifier: string | null;
    normalized: string | null;
    status: string | null;
    staffType: string | null;
    hiringYear: number | null;
    legacy: boolean | null;
    sequence: bigint | null;
    activatedAt: Date | null;
    contactEmail: string | null;
    createdAt: Date | null;
};
export type InstitutionalLoginCountAggregateOutputType = {
    id: number;
    institutionId: number;
    userId: number;
    kind: number;
    identifier: number;
    normalized: number;
    status: number;
    staffType: number;
    hiringYear: number;
    legacy: number;
    sequence: number;
    activatedAt: number;
    contactEmail: number;
    createdAt: number;
    _all: number;
};
export type InstitutionalLoginAvgAggregateInputType = {
    hiringYear?: true;
    sequence?: true;
};
export type InstitutionalLoginSumAggregateInputType = {
    hiringYear?: true;
    sequence?: true;
};
export type InstitutionalLoginMinAggregateInputType = {
    id?: true;
    institutionId?: true;
    userId?: true;
    kind?: true;
    identifier?: true;
    normalized?: true;
    status?: true;
    staffType?: true;
    hiringYear?: true;
    legacy?: true;
    sequence?: true;
    activatedAt?: true;
    contactEmail?: true;
    createdAt?: true;
};
export type InstitutionalLoginMaxAggregateInputType = {
    id?: true;
    institutionId?: true;
    userId?: true;
    kind?: true;
    identifier?: true;
    normalized?: true;
    status?: true;
    staffType?: true;
    hiringYear?: true;
    legacy?: true;
    sequence?: true;
    activatedAt?: true;
    contactEmail?: true;
    createdAt?: true;
};
export type InstitutionalLoginCountAggregateInputType = {
    id?: true;
    institutionId?: true;
    userId?: true;
    kind?: true;
    identifier?: true;
    normalized?: true;
    status?: true;
    staffType?: true;
    hiringYear?: true;
    legacy?: true;
    sequence?: true;
    activatedAt?: true;
    contactEmail?: true;
    createdAt?: true;
    _all?: true;
};
export type InstitutionalLoginAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionalLoginWhereInput;
    orderBy?: Prisma.InstitutionalLoginOrderByWithRelationInput | Prisma.InstitutionalLoginOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionalLoginWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InstitutionalLoginCountAggregateInputType;
    _avg?: InstitutionalLoginAvgAggregateInputType;
    _sum?: InstitutionalLoginSumAggregateInputType;
    _min?: InstitutionalLoginMinAggregateInputType;
    _max?: InstitutionalLoginMaxAggregateInputType;
};
export type GetInstitutionalLoginAggregateType<T extends InstitutionalLoginAggregateArgs> = {
    [P in keyof T & keyof AggregateInstitutionalLogin]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInstitutionalLogin[P]> : Prisma.GetScalarType<T[P], AggregateInstitutionalLogin[P]>;
};
export type InstitutionalLoginGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionalLoginWhereInput;
    orderBy?: Prisma.InstitutionalLoginOrderByWithAggregationInput | Prisma.InstitutionalLoginOrderByWithAggregationInput[];
    by: Prisma.InstitutionalLoginScalarFieldEnum[] | Prisma.InstitutionalLoginScalarFieldEnum;
    having?: Prisma.InstitutionalLoginScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InstitutionalLoginCountAggregateInputType | true;
    _avg?: InstitutionalLoginAvgAggregateInputType;
    _sum?: InstitutionalLoginSumAggregateInputType;
    _min?: InstitutionalLoginMinAggregateInputType;
    _max?: InstitutionalLoginMaxAggregateInputType;
};
export type InstitutionalLoginGroupByOutputType = {
    id: string;
    institutionId: string;
    userId: string;
    kind: string;
    identifier: string;
    normalized: string;
    status: string;
    staffType: string | null;
    hiringYear: number | null;
    legacy: boolean;
    sequence: bigint | null;
    activatedAt: Date | null;
    contactEmail: string | null;
    createdAt: Date;
    _count: InstitutionalLoginCountAggregateOutputType | null;
    _avg: InstitutionalLoginAvgAggregateOutputType | null;
    _sum: InstitutionalLoginSumAggregateOutputType | null;
    _min: InstitutionalLoginMinAggregateOutputType | null;
    _max: InstitutionalLoginMaxAggregateOutputType | null;
};
export type GetInstitutionalLoginGroupByPayload<T extends InstitutionalLoginGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InstitutionalLoginGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InstitutionalLoginGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InstitutionalLoginGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InstitutionalLoginGroupByOutputType[P]>;
}>>;
export type InstitutionalLoginWhereInput = {
    AND?: Prisma.InstitutionalLoginWhereInput | Prisma.InstitutionalLoginWhereInput[];
    OR?: Prisma.InstitutionalLoginWhereInput[];
    NOT?: Prisma.InstitutionalLoginWhereInput | Prisma.InstitutionalLoginWhereInput[];
    id?: Prisma.UuidFilter<"InstitutionalLogin"> | string;
    institutionId?: Prisma.UuidFilter<"InstitutionalLogin"> | string;
    userId?: Prisma.UuidFilter<"InstitutionalLogin"> | string;
    kind?: Prisma.StringFilter<"InstitutionalLogin"> | string;
    identifier?: Prisma.StringFilter<"InstitutionalLogin"> | string;
    normalized?: Prisma.StringFilter<"InstitutionalLogin"> | string;
    status?: Prisma.StringFilter<"InstitutionalLogin"> | string;
    staffType?: Prisma.StringNullableFilter<"InstitutionalLogin"> | string | null;
    hiringYear?: Prisma.IntNullableFilter<"InstitutionalLogin"> | number | null;
    legacy?: Prisma.BoolFilter<"InstitutionalLogin"> | boolean;
    sequence?: Prisma.BigIntNullableFilter<"InstitutionalLogin"> | bigint | number | null;
    activatedAt?: Prisma.DateTimeNullableFilter<"InstitutionalLogin"> | Date | string | null;
    contactEmail?: Prisma.StringNullableFilter<"InstitutionalLogin"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"InstitutionalLogin"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionIdentityScalarRelationFilter, Prisma.InstitutionIdentityWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    challenges?: Prisma.IdentityChallengeListRelationFilter;
};
export type InstitutionalLoginOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    normalized?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    staffType?: Prisma.SortOrderInput | Prisma.SortOrder;
    hiringYear?: Prisma.SortOrderInput | Prisma.SortOrder;
    legacy?: Prisma.SortOrder;
    sequence?: Prisma.SortOrderInput | Prisma.SortOrder;
    activatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    institution?: Prisma.InstitutionIdentityOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    challenges?: Prisma.IdentityChallengeOrderByRelationAggregateInput;
};
export type InstitutionalLoginWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    institutionId_kind_normalized?: Prisma.InstitutionalLoginInstitutionIdKindNormalizedCompoundUniqueInput;
    institutionId_hiringYear_staffType_sequence?: Prisma.InstitutionalLoginInstitutionIdHiringYearStaffTypeSequenceCompoundUniqueInput;
    AND?: Prisma.InstitutionalLoginWhereInput | Prisma.InstitutionalLoginWhereInput[];
    OR?: Prisma.InstitutionalLoginWhereInput[];
    NOT?: Prisma.InstitutionalLoginWhereInput | Prisma.InstitutionalLoginWhereInput[];
    institutionId?: Prisma.UuidFilter<"InstitutionalLogin"> | string;
    userId?: Prisma.UuidFilter<"InstitutionalLogin"> | string;
    kind?: Prisma.StringFilter<"InstitutionalLogin"> | string;
    identifier?: Prisma.StringFilter<"InstitutionalLogin"> | string;
    normalized?: Prisma.StringFilter<"InstitutionalLogin"> | string;
    status?: Prisma.StringFilter<"InstitutionalLogin"> | string;
    staffType?: Prisma.StringNullableFilter<"InstitutionalLogin"> | string | null;
    hiringYear?: Prisma.IntNullableFilter<"InstitutionalLogin"> | number | null;
    legacy?: Prisma.BoolFilter<"InstitutionalLogin"> | boolean;
    sequence?: Prisma.BigIntNullableFilter<"InstitutionalLogin"> | bigint | number | null;
    activatedAt?: Prisma.DateTimeNullableFilter<"InstitutionalLogin"> | Date | string | null;
    contactEmail?: Prisma.StringNullableFilter<"InstitutionalLogin"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"InstitutionalLogin"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionIdentityScalarRelationFilter, Prisma.InstitutionIdentityWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    challenges?: Prisma.IdentityChallengeListRelationFilter;
}, "id" | "institutionId_kind_normalized" | "institutionId_hiringYear_staffType_sequence">;
export type InstitutionalLoginOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    normalized?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    staffType?: Prisma.SortOrderInput | Prisma.SortOrder;
    hiringYear?: Prisma.SortOrderInput | Prisma.SortOrder;
    legacy?: Prisma.SortOrder;
    sequence?: Prisma.SortOrderInput | Prisma.SortOrder;
    activatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.InstitutionalLoginCountOrderByAggregateInput;
    _avg?: Prisma.InstitutionalLoginAvgOrderByAggregateInput;
    _max?: Prisma.InstitutionalLoginMaxOrderByAggregateInput;
    _min?: Prisma.InstitutionalLoginMinOrderByAggregateInput;
    _sum?: Prisma.InstitutionalLoginSumOrderByAggregateInput;
};
export type InstitutionalLoginScalarWhereWithAggregatesInput = {
    AND?: Prisma.InstitutionalLoginScalarWhereWithAggregatesInput | Prisma.InstitutionalLoginScalarWhereWithAggregatesInput[];
    OR?: Prisma.InstitutionalLoginScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InstitutionalLoginScalarWhereWithAggregatesInput | Prisma.InstitutionalLoginScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"InstitutionalLogin"> | string;
    institutionId?: Prisma.UuidWithAggregatesFilter<"InstitutionalLogin"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"InstitutionalLogin"> | string;
    kind?: Prisma.StringWithAggregatesFilter<"InstitutionalLogin"> | string;
    identifier?: Prisma.StringWithAggregatesFilter<"InstitutionalLogin"> | string;
    normalized?: Prisma.StringWithAggregatesFilter<"InstitutionalLogin"> | string;
    status?: Prisma.StringWithAggregatesFilter<"InstitutionalLogin"> | string;
    staffType?: Prisma.StringNullableWithAggregatesFilter<"InstitutionalLogin"> | string | null;
    hiringYear?: Prisma.IntNullableWithAggregatesFilter<"InstitutionalLogin"> | number | null;
    legacy?: Prisma.BoolWithAggregatesFilter<"InstitutionalLogin"> | boolean;
    sequence?: Prisma.BigIntNullableWithAggregatesFilter<"InstitutionalLogin"> | bigint | number | null;
    activatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"InstitutionalLogin"> | Date | string | null;
    contactEmail?: Prisma.StringNullableWithAggregatesFilter<"InstitutionalLogin"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"InstitutionalLogin"> | Date | string;
};
export type InstitutionalLoginCreateInput = {
    id?: string;
    kind: string;
    identifier: string;
    normalized: string;
    status?: string;
    staffType?: string | null;
    hiringYear?: number | null;
    legacy?: boolean;
    sequence?: bigint | number | null;
    activatedAt?: Date | string | null;
    contactEmail?: string | null;
    createdAt?: Date | string;
    institution: Prisma.InstitutionIdentityCreateNestedOneWithoutLoginsInput;
    user: Prisma.UserCreateNestedOneWithoutLoginsInput;
    challenges?: Prisma.IdentityChallengeCreateNestedManyWithoutIdentityInput;
};
export type InstitutionalLoginUncheckedCreateInput = {
    id?: string;
    institutionId: string;
    userId: string;
    kind: string;
    identifier: string;
    normalized: string;
    status?: string;
    staffType?: string | null;
    hiringYear?: number | null;
    legacy?: boolean;
    sequence?: bigint | number | null;
    activatedAt?: Date | string | null;
    contactEmail?: string | null;
    createdAt?: Date | string;
    challenges?: Prisma.IdentityChallengeUncheckedCreateNestedManyWithoutIdentityInput;
};
export type InstitutionalLoginUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    normalized?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    staffType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiringYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    legacy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sequence?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionIdentityUpdateOneRequiredWithoutLoginsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoginsNestedInput;
    challenges?: Prisma.IdentityChallengeUpdateManyWithoutIdentityNestedInput;
};
export type InstitutionalLoginUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    normalized?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    staffType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiringYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    legacy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sequence?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    challenges?: Prisma.IdentityChallengeUncheckedUpdateManyWithoutIdentityNestedInput;
};
export type InstitutionalLoginCreateManyInput = {
    id?: string;
    institutionId: string;
    userId: string;
    kind: string;
    identifier: string;
    normalized: string;
    status?: string;
    staffType?: string | null;
    hiringYear?: number | null;
    legacy?: boolean;
    sequence?: bigint | number | null;
    activatedAt?: Date | string | null;
    contactEmail?: string | null;
    createdAt?: Date | string;
};
export type InstitutionalLoginUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    normalized?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    staffType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiringYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    legacy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sequence?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstitutionalLoginUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    normalized?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    staffType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiringYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    legacy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sequence?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstitutionalLoginListRelationFilter = {
    every?: Prisma.InstitutionalLoginWhereInput;
    some?: Prisma.InstitutionalLoginWhereInput;
    none?: Prisma.InstitutionalLoginWhereInput;
};
export type InstitutionalLoginOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InstitutionalLoginInstitutionIdKindNormalizedCompoundUniqueInput = {
    institutionId: string;
    kind: string;
    normalized: string;
};
export type InstitutionalLoginInstitutionIdHiringYearStaffTypeSequenceCompoundUniqueInput = {
    institutionId: string;
    hiringYear: number;
    staffType: string;
    sequence: bigint | number;
};
export type InstitutionalLoginCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    normalized?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    staffType?: Prisma.SortOrder;
    hiringYear?: Prisma.SortOrder;
    legacy?: Prisma.SortOrder;
    sequence?: Prisma.SortOrder;
    activatedAt?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InstitutionalLoginAvgOrderByAggregateInput = {
    hiringYear?: Prisma.SortOrder;
    sequence?: Prisma.SortOrder;
};
export type InstitutionalLoginMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    normalized?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    staffType?: Prisma.SortOrder;
    hiringYear?: Prisma.SortOrder;
    legacy?: Prisma.SortOrder;
    sequence?: Prisma.SortOrder;
    activatedAt?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InstitutionalLoginMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    normalized?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    staffType?: Prisma.SortOrder;
    hiringYear?: Prisma.SortOrder;
    legacy?: Prisma.SortOrder;
    sequence?: Prisma.SortOrder;
    activatedAt?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InstitutionalLoginSumOrderByAggregateInput = {
    hiringYear?: Prisma.SortOrder;
    sequence?: Prisma.SortOrder;
};
export type InstitutionalLoginNullableScalarRelationFilter = {
    is?: Prisma.InstitutionalLoginWhereInput | null;
    isNot?: Prisma.InstitutionalLoginWhereInput | null;
};
export type InstitutionalLoginCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutUserInput, Prisma.InstitutionalLoginUncheckedCreateWithoutUserInput> | Prisma.InstitutionalLoginCreateWithoutUserInput[] | Prisma.InstitutionalLoginUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstitutionalLoginCreateOrConnectWithoutUserInput | Prisma.InstitutionalLoginCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.InstitutionalLoginCreateManyUserInputEnvelope;
    connect?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
};
export type InstitutionalLoginUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutUserInput, Prisma.InstitutionalLoginUncheckedCreateWithoutUserInput> | Prisma.InstitutionalLoginCreateWithoutUserInput[] | Prisma.InstitutionalLoginUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstitutionalLoginCreateOrConnectWithoutUserInput | Prisma.InstitutionalLoginCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.InstitutionalLoginCreateManyUserInputEnvelope;
    connect?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
};
export type InstitutionalLoginUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutUserInput, Prisma.InstitutionalLoginUncheckedCreateWithoutUserInput> | Prisma.InstitutionalLoginCreateWithoutUserInput[] | Prisma.InstitutionalLoginUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstitutionalLoginCreateOrConnectWithoutUserInput | Prisma.InstitutionalLoginCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.InstitutionalLoginUpsertWithWhereUniqueWithoutUserInput | Prisma.InstitutionalLoginUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.InstitutionalLoginCreateManyUserInputEnvelope;
    set?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    disconnect?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    delete?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    connect?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    update?: Prisma.InstitutionalLoginUpdateWithWhereUniqueWithoutUserInput | Prisma.InstitutionalLoginUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.InstitutionalLoginUpdateManyWithWhereWithoutUserInput | Prisma.InstitutionalLoginUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.InstitutionalLoginScalarWhereInput | Prisma.InstitutionalLoginScalarWhereInput[];
};
export type InstitutionalLoginUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutUserInput, Prisma.InstitutionalLoginUncheckedCreateWithoutUserInput> | Prisma.InstitutionalLoginCreateWithoutUserInput[] | Prisma.InstitutionalLoginUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstitutionalLoginCreateOrConnectWithoutUserInput | Prisma.InstitutionalLoginCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.InstitutionalLoginUpsertWithWhereUniqueWithoutUserInput | Prisma.InstitutionalLoginUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.InstitutionalLoginCreateManyUserInputEnvelope;
    set?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    disconnect?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    delete?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    connect?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    update?: Prisma.InstitutionalLoginUpdateWithWhereUniqueWithoutUserInput | Prisma.InstitutionalLoginUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.InstitutionalLoginUpdateManyWithWhereWithoutUserInput | Prisma.InstitutionalLoginUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.InstitutionalLoginScalarWhereInput | Prisma.InstitutionalLoginScalarWhereInput[];
};
export type InstitutionalLoginCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutInstitutionInput, Prisma.InstitutionalLoginUncheckedCreateWithoutInstitutionInput> | Prisma.InstitutionalLoginCreateWithoutInstitutionInput[] | Prisma.InstitutionalLoginUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.InstitutionalLoginCreateOrConnectWithoutInstitutionInput | Prisma.InstitutionalLoginCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.InstitutionalLoginCreateManyInstitutionInputEnvelope;
    connect?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
};
export type InstitutionalLoginUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutInstitutionInput, Prisma.InstitutionalLoginUncheckedCreateWithoutInstitutionInput> | Prisma.InstitutionalLoginCreateWithoutInstitutionInput[] | Prisma.InstitutionalLoginUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.InstitutionalLoginCreateOrConnectWithoutInstitutionInput | Prisma.InstitutionalLoginCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.InstitutionalLoginCreateManyInstitutionInputEnvelope;
    connect?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
};
export type InstitutionalLoginUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutInstitutionInput, Prisma.InstitutionalLoginUncheckedCreateWithoutInstitutionInput> | Prisma.InstitutionalLoginCreateWithoutInstitutionInput[] | Prisma.InstitutionalLoginUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.InstitutionalLoginCreateOrConnectWithoutInstitutionInput | Prisma.InstitutionalLoginCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.InstitutionalLoginUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.InstitutionalLoginUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.InstitutionalLoginCreateManyInstitutionInputEnvelope;
    set?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    disconnect?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    delete?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    connect?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    update?: Prisma.InstitutionalLoginUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.InstitutionalLoginUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.InstitutionalLoginUpdateManyWithWhereWithoutInstitutionInput | Prisma.InstitutionalLoginUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.InstitutionalLoginScalarWhereInput | Prisma.InstitutionalLoginScalarWhereInput[];
};
export type InstitutionalLoginUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutInstitutionInput, Prisma.InstitutionalLoginUncheckedCreateWithoutInstitutionInput> | Prisma.InstitutionalLoginCreateWithoutInstitutionInput[] | Prisma.InstitutionalLoginUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.InstitutionalLoginCreateOrConnectWithoutInstitutionInput | Prisma.InstitutionalLoginCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.InstitutionalLoginUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.InstitutionalLoginUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.InstitutionalLoginCreateManyInstitutionInputEnvelope;
    set?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    disconnect?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    delete?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    connect?: Prisma.InstitutionalLoginWhereUniqueInput | Prisma.InstitutionalLoginWhereUniqueInput[];
    update?: Prisma.InstitutionalLoginUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.InstitutionalLoginUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.InstitutionalLoginUpdateManyWithWhereWithoutInstitutionInput | Prisma.InstitutionalLoginUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.InstitutionalLoginScalarWhereInput | Prisma.InstitutionalLoginScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type InstitutionalLoginCreateNestedOneWithoutChallengesInput = {
    create?: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutChallengesInput, Prisma.InstitutionalLoginUncheckedCreateWithoutChallengesInput>;
    connectOrCreate?: Prisma.InstitutionalLoginCreateOrConnectWithoutChallengesInput;
    connect?: Prisma.InstitutionalLoginWhereUniqueInput;
};
export type InstitutionalLoginUpdateOneWithoutChallengesNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutChallengesInput, Prisma.InstitutionalLoginUncheckedCreateWithoutChallengesInput>;
    connectOrCreate?: Prisma.InstitutionalLoginCreateOrConnectWithoutChallengesInput;
    upsert?: Prisma.InstitutionalLoginUpsertWithoutChallengesInput;
    disconnect?: Prisma.InstitutionalLoginWhereInput | boolean;
    delete?: Prisma.InstitutionalLoginWhereInput | boolean;
    connect?: Prisma.InstitutionalLoginWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionalLoginUpdateToOneWithWhereWithoutChallengesInput, Prisma.InstitutionalLoginUpdateWithoutChallengesInput>, Prisma.InstitutionalLoginUncheckedUpdateWithoutChallengesInput>;
};
export type InstitutionalLoginCreateWithoutUserInput = {
    id?: string;
    kind: string;
    identifier: string;
    normalized: string;
    status?: string;
    staffType?: string | null;
    hiringYear?: number | null;
    legacy?: boolean;
    sequence?: bigint | number | null;
    activatedAt?: Date | string | null;
    contactEmail?: string | null;
    createdAt?: Date | string;
    institution: Prisma.InstitutionIdentityCreateNestedOneWithoutLoginsInput;
    challenges?: Prisma.IdentityChallengeCreateNestedManyWithoutIdentityInput;
};
export type InstitutionalLoginUncheckedCreateWithoutUserInput = {
    id?: string;
    institutionId: string;
    kind: string;
    identifier: string;
    normalized: string;
    status?: string;
    staffType?: string | null;
    hiringYear?: number | null;
    legacy?: boolean;
    sequence?: bigint | number | null;
    activatedAt?: Date | string | null;
    contactEmail?: string | null;
    createdAt?: Date | string;
    challenges?: Prisma.IdentityChallengeUncheckedCreateNestedManyWithoutIdentityInput;
};
export type InstitutionalLoginCreateOrConnectWithoutUserInput = {
    where: Prisma.InstitutionalLoginWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutUserInput, Prisma.InstitutionalLoginUncheckedCreateWithoutUserInput>;
};
export type InstitutionalLoginCreateManyUserInputEnvelope = {
    data: Prisma.InstitutionalLoginCreateManyUserInput | Prisma.InstitutionalLoginCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type InstitutionalLoginUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.InstitutionalLoginWhereUniqueInput;
    update: Prisma.XOR<Prisma.InstitutionalLoginUpdateWithoutUserInput, Prisma.InstitutionalLoginUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutUserInput, Prisma.InstitutionalLoginUncheckedCreateWithoutUserInput>;
};
export type InstitutionalLoginUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.InstitutionalLoginWhereUniqueInput;
    data: Prisma.XOR<Prisma.InstitutionalLoginUpdateWithoutUserInput, Prisma.InstitutionalLoginUncheckedUpdateWithoutUserInput>;
};
export type InstitutionalLoginUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.InstitutionalLoginScalarWhereInput;
    data: Prisma.XOR<Prisma.InstitutionalLoginUpdateManyMutationInput, Prisma.InstitutionalLoginUncheckedUpdateManyWithoutUserInput>;
};
export type InstitutionalLoginScalarWhereInput = {
    AND?: Prisma.InstitutionalLoginScalarWhereInput | Prisma.InstitutionalLoginScalarWhereInput[];
    OR?: Prisma.InstitutionalLoginScalarWhereInput[];
    NOT?: Prisma.InstitutionalLoginScalarWhereInput | Prisma.InstitutionalLoginScalarWhereInput[];
    id?: Prisma.UuidFilter<"InstitutionalLogin"> | string;
    institutionId?: Prisma.UuidFilter<"InstitutionalLogin"> | string;
    userId?: Prisma.UuidFilter<"InstitutionalLogin"> | string;
    kind?: Prisma.StringFilter<"InstitutionalLogin"> | string;
    identifier?: Prisma.StringFilter<"InstitutionalLogin"> | string;
    normalized?: Prisma.StringFilter<"InstitutionalLogin"> | string;
    status?: Prisma.StringFilter<"InstitutionalLogin"> | string;
    staffType?: Prisma.StringNullableFilter<"InstitutionalLogin"> | string | null;
    hiringYear?: Prisma.IntNullableFilter<"InstitutionalLogin"> | number | null;
    legacy?: Prisma.BoolFilter<"InstitutionalLogin"> | boolean;
    sequence?: Prisma.BigIntNullableFilter<"InstitutionalLogin"> | bigint | number | null;
    activatedAt?: Prisma.DateTimeNullableFilter<"InstitutionalLogin"> | Date | string | null;
    contactEmail?: Prisma.StringNullableFilter<"InstitutionalLogin"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"InstitutionalLogin"> | Date | string;
};
export type InstitutionalLoginCreateWithoutInstitutionInput = {
    id?: string;
    kind: string;
    identifier: string;
    normalized: string;
    status?: string;
    staffType?: string | null;
    hiringYear?: number | null;
    legacy?: boolean;
    sequence?: bigint | number | null;
    activatedAt?: Date | string | null;
    contactEmail?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutLoginsInput;
    challenges?: Prisma.IdentityChallengeCreateNestedManyWithoutIdentityInput;
};
export type InstitutionalLoginUncheckedCreateWithoutInstitutionInput = {
    id?: string;
    userId: string;
    kind: string;
    identifier: string;
    normalized: string;
    status?: string;
    staffType?: string | null;
    hiringYear?: number | null;
    legacy?: boolean;
    sequence?: bigint | number | null;
    activatedAt?: Date | string | null;
    contactEmail?: string | null;
    createdAt?: Date | string;
    challenges?: Prisma.IdentityChallengeUncheckedCreateNestedManyWithoutIdentityInput;
};
export type InstitutionalLoginCreateOrConnectWithoutInstitutionInput = {
    where: Prisma.InstitutionalLoginWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutInstitutionInput, Prisma.InstitutionalLoginUncheckedCreateWithoutInstitutionInput>;
};
export type InstitutionalLoginCreateManyInstitutionInputEnvelope = {
    data: Prisma.InstitutionalLoginCreateManyInstitutionInput | Prisma.InstitutionalLoginCreateManyInstitutionInput[];
    skipDuplicates?: boolean;
};
export type InstitutionalLoginUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.InstitutionalLoginWhereUniqueInput;
    update: Prisma.XOR<Prisma.InstitutionalLoginUpdateWithoutInstitutionInput, Prisma.InstitutionalLoginUncheckedUpdateWithoutInstitutionInput>;
    create: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutInstitutionInput, Prisma.InstitutionalLoginUncheckedCreateWithoutInstitutionInput>;
};
export type InstitutionalLoginUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.InstitutionalLoginWhereUniqueInput;
    data: Prisma.XOR<Prisma.InstitutionalLoginUpdateWithoutInstitutionInput, Prisma.InstitutionalLoginUncheckedUpdateWithoutInstitutionInput>;
};
export type InstitutionalLoginUpdateManyWithWhereWithoutInstitutionInput = {
    where: Prisma.InstitutionalLoginScalarWhereInput;
    data: Prisma.XOR<Prisma.InstitutionalLoginUpdateManyMutationInput, Prisma.InstitutionalLoginUncheckedUpdateManyWithoutInstitutionInput>;
};
export type InstitutionalLoginCreateWithoutChallengesInput = {
    id?: string;
    kind: string;
    identifier: string;
    normalized: string;
    status?: string;
    staffType?: string | null;
    hiringYear?: number | null;
    legacy?: boolean;
    sequence?: bigint | number | null;
    activatedAt?: Date | string | null;
    contactEmail?: string | null;
    createdAt?: Date | string;
    institution: Prisma.InstitutionIdentityCreateNestedOneWithoutLoginsInput;
    user: Prisma.UserCreateNestedOneWithoutLoginsInput;
};
export type InstitutionalLoginUncheckedCreateWithoutChallengesInput = {
    id?: string;
    institutionId: string;
    userId: string;
    kind: string;
    identifier: string;
    normalized: string;
    status?: string;
    staffType?: string | null;
    hiringYear?: number | null;
    legacy?: boolean;
    sequence?: bigint | number | null;
    activatedAt?: Date | string | null;
    contactEmail?: string | null;
    createdAt?: Date | string;
};
export type InstitutionalLoginCreateOrConnectWithoutChallengesInput = {
    where: Prisma.InstitutionalLoginWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutChallengesInput, Prisma.InstitutionalLoginUncheckedCreateWithoutChallengesInput>;
};
export type InstitutionalLoginUpsertWithoutChallengesInput = {
    update: Prisma.XOR<Prisma.InstitutionalLoginUpdateWithoutChallengesInput, Prisma.InstitutionalLoginUncheckedUpdateWithoutChallengesInput>;
    create: Prisma.XOR<Prisma.InstitutionalLoginCreateWithoutChallengesInput, Prisma.InstitutionalLoginUncheckedCreateWithoutChallengesInput>;
    where?: Prisma.InstitutionalLoginWhereInput;
};
export type InstitutionalLoginUpdateToOneWithWhereWithoutChallengesInput = {
    where?: Prisma.InstitutionalLoginWhereInput;
    data: Prisma.XOR<Prisma.InstitutionalLoginUpdateWithoutChallengesInput, Prisma.InstitutionalLoginUncheckedUpdateWithoutChallengesInput>;
};
export type InstitutionalLoginUpdateWithoutChallengesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    normalized?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    staffType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiringYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    legacy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sequence?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionIdentityUpdateOneRequiredWithoutLoginsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoginsNestedInput;
};
export type InstitutionalLoginUncheckedUpdateWithoutChallengesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    normalized?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    staffType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiringYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    legacy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sequence?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstitutionalLoginCreateManyUserInput = {
    id?: string;
    institutionId: string;
    kind: string;
    identifier: string;
    normalized: string;
    status?: string;
    staffType?: string | null;
    hiringYear?: number | null;
    legacy?: boolean;
    sequence?: bigint | number | null;
    activatedAt?: Date | string | null;
    contactEmail?: string | null;
    createdAt?: Date | string;
};
export type InstitutionalLoginUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    normalized?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    staffType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiringYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    legacy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sequence?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionIdentityUpdateOneRequiredWithoutLoginsNestedInput;
    challenges?: Prisma.IdentityChallengeUpdateManyWithoutIdentityNestedInput;
};
export type InstitutionalLoginUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    normalized?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    staffType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiringYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    legacy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sequence?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    challenges?: Prisma.IdentityChallengeUncheckedUpdateManyWithoutIdentityNestedInput;
};
export type InstitutionalLoginUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    normalized?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    staffType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiringYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    legacy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sequence?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstitutionalLoginCreateManyInstitutionInput = {
    id?: string;
    userId: string;
    kind: string;
    identifier: string;
    normalized: string;
    status?: string;
    staffType?: string | null;
    hiringYear?: number | null;
    legacy?: boolean;
    sequence?: bigint | number | null;
    activatedAt?: Date | string | null;
    contactEmail?: string | null;
    createdAt?: Date | string;
};
export type InstitutionalLoginUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    normalized?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    staffType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiringYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    legacy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sequence?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutLoginsNestedInput;
    challenges?: Prisma.IdentityChallengeUpdateManyWithoutIdentityNestedInput;
};
export type InstitutionalLoginUncheckedUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    normalized?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    staffType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiringYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    legacy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sequence?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    challenges?: Prisma.IdentityChallengeUncheckedUpdateManyWithoutIdentityNestedInput;
};
export type InstitutionalLoginUncheckedUpdateManyWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    normalized?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    staffType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hiringYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    legacy?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sequence?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstitutionalLoginCountOutputType = {
    challenges: number;
};
export type InstitutionalLoginCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    challenges?: boolean | InstitutionalLoginCountOutputTypeCountChallengesArgs;
};
export type InstitutionalLoginCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginCountOutputTypeSelect<ExtArgs> | null;
};
export type InstitutionalLoginCountOutputTypeCountChallengesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityChallengeWhereInput;
};
export type InstitutionalLoginSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    userId?: boolean;
    kind?: boolean;
    identifier?: boolean;
    normalized?: boolean;
    status?: boolean;
    staffType?: boolean;
    hiringYear?: boolean;
    legacy?: boolean;
    sequence?: boolean;
    activatedAt?: boolean;
    contactEmail?: boolean;
    createdAt?: boolean;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    challenges?: boolean | Prisma.InstitutionalLogin$challengesArgs<ExtArgs>;
    _count?: boolean | Prisma.InstitutionalLoginCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["institutionalLogin"]>;
export type InstitutionalLoginSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    userId?: boolean;
    kind?: boolean;
    identifier?: boolean;
    normalized?: boolean;
    status?: boolean;
    staffType?: boolean;
    hiringYear?: boolean;
    legacy?: boolean;
    sequence?: boolean;
    activatedAt?: boolean;
    contactEmail?: boolean;
    createdAt?: boolean;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["institutionalLogin"]>;
export type InstitutionalLoginSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    userId?: boolean;
    kind?: boolean;
    identifier?: boolean;
    normalized?: boolean;
    status?: boolean;
    staffType?: boolean;
    hiringYear?: boolean;
    legacy?: boolean;
    sequence?: boolean;
    activatedAt?: boolean;
    contactEmail?: boolean;
    createdAt?: boolean;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["institutionalLogin"]>;
export type InstitutionalLoginSelectScalar = {
    id?: boolean;
    institutionId?: boolean;
    userId?: boolean;
    kind?: boolean;
    identifier?: boolean;
    normalized?: boolean;
    status?: boolean;
    staffType?: boolean;
    hiringYear?: boolean;
    legacy?: boolean;
    sequence?: boolean;
    activatedAt?: boolean;
    contactEmail?: boolean;
    createdAt?: boolean;
};
export type InstitutionalLoginOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "institutionId" | "userId" | "kind" | "identifier" | "normalized" | "status" | "staffType" | "hiringYear" | "legacy" | "sequence" | "activatedAt" | "contactEmail" | "createdAt", ExtArgs["result"]["institutionalLogin"]>;
export type InstitutionalLoginInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    challenges?: boolean | Prisma.InstitutionalLogin$challengesArgs<ExtArgs>;
    _count?: boolean | Prisma.InstitutionalLoginCountOutputTypeDefaultArgs<ExtArgs>;
};
export type InstitutionalLoginIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type InstitutionalLoginIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $InstitutionalLoginPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InstitutionalLogin";
    objects: {
        institution: Prisma.$InstitutionIdentityPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        challenges: Prisma.$IdentityChallengePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        institutionId: string;
        userId: string;
        kind: string;
        identifier: string;
        normalized: string;
        status: string;
        staffType: string | null;
        hiringYear: number | null;
        legacy: boolean;
        sequence: bigint | null;
        activatedAt: Date | null;
        contactEmail: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["institutionalLogin"]>;
    composites: {};
};
export type InstitutionalLoginGetPayload<S extends boolean | null | undefined | InstitutionalLoginDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload, S>;
export type InstitutionalLoginCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InstitutionalLoginFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InstitutionalLoginCountAggregateInputType | true;
};
export interface InstitutionalLoginDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InstitutionalLogin'];
        meta: {
            name: 'InstitutionalLogin';
        };
    };
    findUnique<T extends InstitutionalLoginFindUniqueArgs>(args: Prisma.SelectSubset<T, InstitutionalLoginFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InstitutionalLoginClient<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InstitutionalLoginFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InstitutionalLoginFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstitutionalLoginClient<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InstitutionalLoginFindFirstArgs>(args?: Prisma.SelectSubset<T, InstitutionalLoginFindFirstArgs<ExtArgs>>): Prisma.Prisma__InstitutionalLoginClient<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InstitutionalLoginFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InstitutionalLoginFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstitutionalLoginClient<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InstitutionalLoginFindManyArgs>(args?: Prisma.SelectSubset<T, InstitutionalLoginFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InstitutionalLoginCreateArgs>(args: Prisma.SelectSubset<T, InstitutionalLoginCreateArgs<ExtArgs>>): Prisma.Prisma__InstitutionalLoginClient<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InstitutionalLoginCreateManyArgs>(args?: Prisma.SelectSubset<T, InstitutionalLoginCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InstitutionalLoginCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InstitutionalLoginCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InstitutionalLoginDeleteArgs>(args: Prisma.SelectSubset<T, InstitutionalLoginDeleteArgs<ExtArgs>>): Prisma.Prisma__InstitutionalLoginClient<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InstitutionalLoginUpdateArgs>(args: Prisma.SelectSubset<T, InstitutionalLoginUpdateArgs<ExtArgs>>): Prisma.Prisma__InstitutionalLoginClient<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InstitutionalLoginDeleteManyArgs>(args?: Prisma.SelectSubset<T, InstitutionalLoginDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InstitutionalLoginUpdateManyArgs>(args: Prisma.SelectSubset<T, InstitutionalLoginUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InstitutionalLoginUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InstitutionalLoginUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InstitutionalLoginUpsertArgs>(args: Prisma.SelectSubset<T, InstitutionalLoginUpsertArgs<ExtArgs>>): Prisma.Prisma__InstitutionalLoginClient<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InstitutionalLoginCountArgs>(args?: Prisma.Subset<T, InstitutionalLoginCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InstitutionalLoginCountAggregateOutputType> : number>;
    aggregate<T extends InstitutionalLoginAggregateArgs>(args: Prisma.Subset<T, InstitutionalLoginAggregateArgs>): Prisma.PrismaPromise<GetInstitutionalLoginAggregateType<T>>;
    groupBy<T extends InstitutionalLoginGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InstitutionalLoginGroupByArgs['orderBy'];
    } : {
        orderBy?: InstitutionalLoginGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InstitutionalLoginGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstitutionalLoginGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InstitutionalLoginFieldRefs;
}
export interface Prisma__InstitutionalLoginClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    institution<T extends Prisma.InstitutionIdentityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionIdentityDefaultArgs<ExtArgs>>): Prisma.Prisma__InstitutionIdentityClient<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    challenges<T extends Prisma.InstitutionalLogin$challengesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionalLogin$challengesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InstitutionalLoginFieldRefs {
    readonly id: Prisma.FieldRef<"InstitutionalLogin", 'String'>;
    readonly institutionId: Prisma.FieldRef<"InstitutionalLogin", 'String'>;
    readonly userId: Prisma.FieldRef<"InstitutionalLogin", 'String'>;
    readonly kind: Prisma.FieldRef<"InstitutionalLogin", 'String'>;
    readonly identifier: Prisma.FieldRef<"InstitutionalLogin", 'String'>;
    readonly normalized: Prisma.FieldRef<"InstitutionalLogin", 'String'>;
    readonly status: Prisma.FieldRef<"InstitutionalLogin", 'String'>;
    readonly staffType: Prisma.FieldRef<"InstitutionalLogin", 'String'>;
    readonly hiringYear: Prisma.FieldRef<"InstitutionalLogin", 'Int'>;
    readonly legacy: Prisma.FieldRef<"InstitutionalLogin", 'Boolean'>;
    readonly sequence: Prisma.FieldRef<"InstitutionalLogin", 'BigInt'>;
    readonly activatedAt: Prisma.FieldRef<"InstitutionalLogin", 'DateTime'>;
    readonly contactEmail: Prisma.FieldRef<"InstitutionalLogin", 'String'>;
    readonly createdAt: Prisma.FieldRef<"InstitutionalLogin", 'DateTime'>;
}
export type InstitutionalLoginFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    include?: Prisma.InstitutionalLoginInclude<ExtArgs> | null;
    where: Prisma.InstitutionalLoginWhereUniqueInput;
};
export type InstitutionalLoginFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    include?: Prisma.InstitutionalLoginInclude<ExtArgs> | null;
    where: Prisma.InstitutionalLoginWhereUniqueInput;
};
export type InstitutionalLoginFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    include?: Prisma.InstitutionalLoginInclude<ExtArgs> | null;
    where?: Prisma.InstitutionalLoginWhereInput;
    orderBy?: Prisma.InstitutionalLoginOrderByWithRelationInput | Prisma.InstitutionalLoginOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionalLoginWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionalLoginScalarFieldEnum | Prisma.InstitutionalLoginScalarFieldEnum[];
};
export type InstitutionalLoginFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    include?: Prisma.InstitutionalLoginInclude<ExtArgs> | null;
    where?: Prisma.InstitutionalLoginWhereInput;
    orderBy?: Prisma.InstitutionalLoginOrderByWithRelationInput | Prisma.InstitutionalLoginOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionalLoginWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionalLoginScalarFieldEnum | Prisma.InstitutionalLoginScalarFieldEnum[];
};
export type InstitutionalLoginFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    include?: Prisma.InstitutionalLoginInclude<ExtArgs> | null;
    where?: Prisma.InstitutionalLoginWhereInput;
    orderBy?: Prisma.InstitutionalLoginOrderByWithRelationInput | Prisma.InstitutionalLoginOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionalLoginWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionalLoginScalarFieldEnum | Prisma.InstitutionalLoginScalarFieldEnum[];
};
export type InstitutionalLoginCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    include?: Prisma.InstitutionalLoginInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionalLoginCreateInput, Prisma.InstitutionalLoginUncheckedCreateInput>;
};
export type InstitutionalLoginCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InstitutionalLoginCreateManyInput | Prisma.InstitutionalLoginCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InstitutionalLoginCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    data: Prisma.InstitutionalLoginCreateManyInput | Prisma.InstitutionalLoginCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InstitutionalLoginIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InstitutionalLoginUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    include?: Prisma.InstitutionalLoginInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionalLoginUpdateInput, Prisma.InstitutionalLoginUncheckedUpdateInput>;
    where: Prisma.InstitutionalLoginWhereUniqueInput;
};
export type InstitutionalLoginUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InstitutionalLoginUpdateManyMutationInput, Prisma.InstitutionalLoginUncheckedUpdateManyInput>;
    where?: Prisma.InstitutionalLoginWhereInput;
    limit?: number;
};
export type InstitutionalLoginUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionalLoginUpdateManyMutationInput, Prisma.InstitutionalLoginUncheckedUpdateManyInput>;
    where?: Prisma.InstitutionalLoginWhereInput;
    limit?: number;
    include?: Prisma.InstitutionalLoginIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InstitutionalLoginUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    include?: Prisma.InstitutionalLoginInclude<ExtArgs> | null;
    where: Prisma.InstitutionalLoginWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionalLoginCreateInput, Prisma.InstitutionalLoginUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InstitutionalLoginUpdateInput, Prisma.InstitutionalLoginUncheckedUpdateInput>;
};
export type InstitutionalLoginDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    include?: Prisma.InstitutionalLoginInclude<ExtArgs> | null;
    where: Prisma.InstitutionalLoginWhereUniqueInput;
};
export type InstitutionalLoginDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionalLoginWhereInput;
    limit?: number;
};
export type InstitutionalLogin$challengesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InstitutionalLoginDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionalLoginSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionalLoginOmit<ExtArgs> | null;
    include?: Prisma.InstitutionalLoginInclude<ExtArgs> | null;
};
