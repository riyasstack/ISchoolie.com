import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InstitutionGrantModel = runtime.Types.Result.DefaultSelection<Prisma.$InstitutionGrantPayload>;
export type AggregateInstitutionGrant = {
    _count: InstitutionGrantCountAggregateOutputType | null;
    _min: InstitutionGrantMinAggregateOutputType | null;
    _max: InstitutionGrantMaxAggregateOutputType | null;
};
export type InstitutionGrantMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    institutionId: string | null;
    permission: string | null;
    active: boolean | null;
};
export type InstitutionGrantMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    institutionId: string | null;
    permission: string | null;
    active: boolean | null;
};
export type InstitutionGrantCountAggregateOutputType = {
    id: number;
    userId: number;
    institutionId: number;
    permission: number;
    active: number;
    _all: number;
};
export type InstitutionGrantMinAggregateInputType = {
    id?: true;
    userId?: true;
    institutionId?: true;
    permission?: true;
    active?: true;
};
export type InstitutionGrantMaxAggregateInputType = {
    id?: true;
    userId?: true;
    institutionId?: true;
    permission?: true;
    active?: true;
};
export type InstitutionGrantCountAggregateInputType = {
    id?: true;
    userId?: true;
    institutionId?: true;
    permission?: true;
    active?: true;
    _all?: true;
};
export type InstitutionGrantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionGrantWhereInput;
    orderBy?: Prisma.InstitutionGrantOrderByWithRelationInput | Prisma.InstitutionGrantOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionGrantWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InstitutionGrantCountAggregateInputType;
    _min?: InstitutionGrantMinAggregateInputType;
    _max?: InstitutionGrantMaxAggregateInputType;
};
export type GetInstitutionGrantAggregateType<T extends InstitutionGrantAggregateArgs> = {
    [P in keyof T & keyof AggregateInstitutionGrant]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInstitutionGrant[P]> : Prisma.GetScalarType<T[P], AggregateInstitutionGrant[P]>;
};
export type InstitutionGrantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionGrantWhereInput;
    orderBy?: Prisma.InstitutionGrantOrderByWithAggregationInput | Prisma.InstitutionGrantOrderByWithAggregationInput[];
    by: Prisma.InstitutionGrantScalarFieldEnum[] | Prisma.InstitutionGrantScalarFieldEnum;
    having?: Prisma.InstitutionGrantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InstitutionGrantCountAggregateInputType | true;
    _min?: InstitutionGrantMinAggregateInputType;
    _max?: InstitutionGrantMaxAggregateInputType;
};
export type InstitutionGrantGroupByOutputType = {
    id: string;
    userId: string;
    institutionId: string;
    permission: string;
    active: boolean;
    _count: InstitutionGrantCountAggregateOutputType | null;
    _min: InstitutionGrantMinAggregateOutputType | null;
    _max: InstitutionGrantMaxAggregateOutputType | null;
};
export type GetInstitutionGrantGroupByPayload<T extends InstitutionGrantGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InstitutionGrantGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InstitutionGrantGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InstitutionGrantGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InstitutionGrantGroupByOutputType[P]>;
}>>;
export type InstitutionGrantWhereInput = {
    AND?: Prisma.InstitutionGrantWhereInput | Prisma.InstitutionGrantWhereInput[];
    OR?: Prisma.InstitutionGrantWhereInput[];
    NOT?: Prisma.InstitutionGrantWhereInput | Prisma.InstitutionGrantWhereInput[];
    id?: Prisma.UuidFilter<"InstitutionGrant"> | string;
    userId?: Prisma.UuidFilter<"InstitutionGrant"> | string;
    institutionId?: Prisma.UuidFilter<"InstitutionGrant"> | string;
    permission?: Prisma.StringFilter<"InstitutionGrant"> | string;
    active?: Prisma.BoolFilter<"InstitutionGrant"> | boolean;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    institution?: Prisma.XOR<Prisma.InstitutionIdentityScalarRelationFilter, Prisma.InstitutionIdentityWhereInput>;
};
export type InstitutionGrantOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    permission?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    institution?: Prisma.InstitutionIdentityOrderByWithRelationInput;
};
export type InstitutionGrantWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_institutionId_permission?: Prisma.InstitutionGrantUserIdInstitutionIdPermissionCompoundUniqueInput;
    AND?: Prisma.InstitutionGrantWhereInput | Prisma.InstitutionGrantWhereInput[];
    OR?: Prisma.InstitutionGrantWhereInput[];
    NOT?: Prisma.InstitutionGrantWhereInput | Prisma.InstitutionGrantWhereInput[];
    userId?: Prisma.UuidFilter<"InstitutionGrant"> | string;
    institutionId?: Prisma.UuidFilter<"InstitutionGrant"> | string;
    permission?: Prisma.StringFilter<"InstitutionGrant"> | string;
    active?: Prisma.BoolFilter<"InstitutionGrant"> | boolean;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    institution?: Prisma.XOR<Prisma.InstitutionIdentityScalarRelationFilter, Prisma.InstitutionIdentityWhereInput>;
}, "id" | "userId_institutionId_permission">;
export type InstitutionGrantOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    permission?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    _count?: Prisma.InstitutionGrantCountOrderByAggregateInput;
    _max?: Prisma.InstitutionGrantMaxOrderByAggregateInput;
    _min?: Prisma.InstitutionGrantMinOrderByAggregateInput;
};
export type InstitutionGrantScalarWhereWithAggregatesInput = {
    AND?: Prisma.InstitutionGrantScalarWhereWithAggregatesInput | Prisma.InstitutionGrantScalarWhereWithAggregatesInput[];
    OR?: Prisma.InstitutionGrantScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InstitutionGrantScalarWhereWithAggregatesInput | Prisma.InstitutionGrantScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"InstitutionGrant"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"InstitutionGrant"> | string;
    institutionId?: Prisma.UuidWithAggregatesFilter<"InstitutionGrant"> | string;
    permission?: Prisma.StringWithAggregatesFilter<"InstitutionGrant"> | string;
    active?: Prisma.BoolWithAggregatesFilter<"InstitutionGrant"> | boolean;
};
export type InstitutionGrantCreateInput = {
    id?: string;
    permission: string;
    active?: boolean;
    user: Prisma.UserCreateNestedOneWithoutGrantsInput;
    institution: Prisma.InstitutionIdentityCreateNestedOneWithoutGrantsInput;
};
export type InstitutionGrantUncheckedCreateInput = {
    id?: string;
    userId: string;
    institutionId: string;
    permission: string;
    active?: boolean;
};
export type InstitutionGrantUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    permission?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    user?: Prisma.UserUpdateOneRequiredWithoutGrantsNestedInput;
    institution?: Prisma.InstitutionIdentityUpdateOneRequiredWithoutGrantsNestedInput;
};
export type InstitutionGrantUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    permission?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type InstitutionGrantCreateManyInput = {
    id?: string;
    userId: string;
    institutionId: string;
    permission: string;
    active?: boolean;
};
export type InstitutionGrantUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    permission?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type InstitutionGrantUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    permission?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type InstitutionGrantListRelationFilter = {
    every?: Prisma.InstitutionGrantWhereInput;
    some?: Prisma.InstitutionGrantWhereInput;
    none?: Prisma.InstitutionGrantWhereInput;
};
export type InstitutionGrantOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InstitutionGrantUserIdInstitutionIdPermissionCompoundUniqueInput = {
    userId: string;
    institutionId: string;
    permission: string;
};
export type InstitutionGrantCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    permission?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
};
export type InstitutionGrantMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    permission?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
};
export type InstitutionGrantMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    permission?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
};
export type InstitutionGrantCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.InstitutionGrantCreateWithoutUserInput, Prisma.InstitutionGrantUncheckedCreateWithoutUserInput> | Prisma.InstitutionGrantCreateWithoutUserInput[] | Prisma.InstitutionGrantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstitutionGrantCreateOrConnectWithoutUserInput | Prisma.InstitutionGrantCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.InstitutionGrantCreateManyUserInputEnvelope;
    connect?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
};
export type InstitutionGrantUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.InstitutionGrantCreateWithoutUserInput, Prisma.InstitutionGrantUncheckedCreateWithoutUserInput> | Prisma.InstitutionGrantCreateWithoutUserInput[] | Prisma.InstitutionGrantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstitutionGrantCreateOrConnectWithoutUserInput | Prisma.InstitutionGrantCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.InstitutionGrantCreateManyUserInputEnvelope;
    connect?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
};
export type InstitutionGrantUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionGrantCreateWithoutUserInput, Prisma.InstitutionGrantUncheckedCreateWithoutUserInput> | Prisma.InstitutionGrantCreateWithoutUserInput[] | Prisma.InstitutionGrantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstitutionGrantCreateOrConnectWithoutUserInput | Prisma.InstitutionGrantCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.InstitutionGrantUpsertWithWhereUniqueWithoutUserInput | Prisma.InstitutionGrantUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.InstitutionGrantCreateManyUserInputEnvelope;
    set?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    disconnect?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    delete?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    connect?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    update?: Prisma.InstitutionGrantUpdateWithWhereUniqueWithoutUserInput | Prisma.InstitutionGrantUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.InstitutionGrantUpdateManyWithWhereWithoutUserInput | Prisma.InstitutionGrantUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.InstitutionGrantScalarWhereInput | Prisma.InstitutionGrantScalarWhereInput[];
};
export type InstitutionGrantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionGrantCreateWithoutUserInput, Prisma.InstitutionGrantUncheckedCreateWithoutUserInput> | Prisma.InstitutionGrantCreateWithoutUserInput[] | Prisma.InstitutionGrantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstitutionGrantCreateOrConnectWithoutUserInput | Prisma.InstitutionGrantCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.InstitutionGrantUpsertWithWhereUniqueWithoutUserInput | Prisma.InstitutionGrantUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.InstitutionGrantCreateManyUserInputEnvelope;
    set?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    disconnect?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    delete?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    connect?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    update?: Prisma.InstitutionGrantUpdateWithWhereUniqueWithoutUserInput | Prisma.InstitutionGrantUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.InstitutionGrantUpdateManyWithWhereWithoutUserInput | Prisma.InstitutionGrantUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.InstitutionGrantScalarWhereInput | Prisma.InstitutionGrantScalarWhereInput[];
};
export type InstitutionGrantCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.InstitutionGrantCreateWithoutInstitutionInput, Prisma.InstitutionGrantUncheckedCreateWithoutInstitutionInput> | Prisma.InstitutionGrantCreateWithoutInstitutionInput[] | Prisma.InstitutionGrantUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.InstitutionGrantCreateOrConnectWithoutInstitutionInput | Prisma.InstitutionGrantCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.InstitutionGrantCreateManyInstitutionInputEnvelope;
    connect?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
};
export type InstitutionGrantUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.InstitutionGrantCreateWithoutInstitutionInput, Prisma.InstitutionGrantUncheckedCreateWithoutInstitutionInput> | Prisma.InstitutionGrantCreateWithoutInstitutionInput[] | Prisma.InstitutionGrantUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.InstitutionGrantCreateOrConnectWithoutInstitutionInput | Prisma.InstitutionGrantCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.InstitutionGrantCreateManyInstitutionInputEnvelope;
    connect?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
};
export type InstitutionGrantUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionGrantCreateWithoutInstitutionInput, Prisma.InstitutionGrantUncheckedCreateWithoutInstitutionInput> | Prisma.InstitutionGrantCreateWithoutInstitutionInput[] | Prisma.InstitutionGrantUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.InstitutionGrantCreateOrConnectWithoutInstitutionInput | Prisma.InstitutionGrantCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.InstitutionGrantUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.InstitutionGrantUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.InstitutionGrantCreateManyInstitutionInputEnvelope;
    set?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    disconnect?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    delete?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    connect?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    update?: Prisma.InstitutionGrantUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.InstitutionGrantUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.InstitutionGrantUpdateManyWithWhereWithoutInstitutionInput | Prisma.InstitutionGrantUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.InstitutionGrantScalarWhereInput | Prisma.InstitutionGrantScalarWhereInput[];
};
export type InstitutionGrantUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionGrantCreateWithoutInstitutionInput, Prisma.InstitutionGrantUncheckedCreateWithoutInstitutionInput> | Prisma.InstitutionGrantCreateWithoutInstitutionInput[] | Prisma.InstitutionGrantUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.InstitutionGrantCreateOrConnectWithoutInstitutionInput | Prisma.InstitutionGrantCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.InstitutionGrantUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.InstitutionGrantUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.InstitutionGrantCreateManyInstitutionInputEnvelope;
    set?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    disconnect?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    delete?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    connect?: Prisma.InstitutionGrantWhereUniqueInput | Prisma.InstitutionGrantWhereUniqueInput[];
    update?: Prisma.InstitutionGrantUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.InstitutionGrantUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.InstitutionGrantUpdateManyWithWhereWithoutInstitutionInput | Prisma.InstitutionGrantUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.InstitutionGrantScalarWhereInput | Prisma.InstitutionGrantScalarWhereInput[];
};
export type InstitutionGrantCreateWithoutUserInput = {
    id?: string;
    permission: string;
    active?: boolean;
    institution: Prisma.InstitutionIdentityCreateNestedOneWithoutGrantsInput;
};
export type InstitutionGrantUncheckedCreateWithoutUserInput = {
    id?: string;
    institutionId: string;
    permission: string;
    active?: boolean;
};
export type InstitutionGrantCreateOrConnectWithoutUserInput = {
    where: Prisma.InstitutionGrantWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionGrantCreateWithoutUserInput, Prisma.InstitutionGrantUncheckedCreateWithoutUserInput>;
};
export type InstitutionGrantCreateManyUserInputEnvelope = {
    data: Prisma.InstitutionGrantCreateManyUserInput | Prisma.InstitutionGrantCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type InstitutionGrantUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.InstitutionGrantWhereUniqueInput;
    update: Prisma.XOR<Prisma.InstitutionGrantUpdateWithoutUserInput, Prisma.InstitutionGrantUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.InstitutionGrantCreateWithoutUserInput, Prisma.InstitutionGrantUncheckedCreateWithoutUserInput>;
};
export type InstitutionGrantUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.InstitutionGrantWhereUniqueInput;
    data: Prisma.XOR<Prisma.InstitutionGrantUpdateWithoutUserInput, Prisma.InstitutionGrantUncheckedUpdateWithoutUserInput>;
};
export type InstitutionGrantUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.InstitutionGrantScalarWhereInput;
    data: Prisma.XOR<Prisma.InstitutionGrantUpdateManyMutationInput, Prisma.InstitutionGrantUncheckedUpdateManyWithoutUserInput>;
};
export type InstitutionGrantScalarWhereInput = {
    AND?: Prisma.InstitutionGrantScalarWhereInput | Prisma.InstitutionGrantScalarWhereInput[];
    OR?: Prisma.InstitutionGrantScalarWhereInput[];
    NOT?: Prisma.InstitutionGrantScalarWhereInput | Prisma.InstitutionGrantScalarWhereInput[];
    id?: Prisma.UuidFilter<"InstitutionGrant"> | string;
    userId?: Prisma.UuidFilter<"InstitutionGrant"> | string;
    institutionId?: Prisma.UuidFilter<"InstitutionGrant"> | string;
    permission?: Prisma.StringFilter<"InstitutionGrant"> | string;
    active?: Prisma.BoolFilter<"InstitutionGrant"> | boolean;
};
export type InstitutionGrantCreateWithoutInstitutionInput = {
    id?: string;
    permission: string;
    active?: boolean;
    user: Prisma.UserCreateNestedOneWithoutGrantsInput;
};
export type InstitutionGrantUncheckedCreateWithoutInstitutionInput = {
    id?: string;
    userId: string;
    permission: string;
    active?: boolean;
};
export type InstitutionGrantCreateOrConnectWithoutInstitutionInput = {
    where: Prisma.InstitutionGrantWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionGrantCreateWithoutInstitutionInput, Prisma.InstitutionGrantUncheckedCreateWithoutInstitutionInput>;
};
export type InstitutionGrantCreateManyInstitutionInputEnvelope = {
    data: Prisma.InstitutionGrantCreateManyInstitutionInput | Prisma.InstitutionGrantCreateManyInstitutionInput[];
    skipDuplicates?: boolean;
};
export type InstitutionGrantUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.InstitutionGrantWhereUniqueInput;
    update: Prisma.XOR<Prisma.InstitutionGrantUpdateWithoutInstitutionInput, Prisma.InstitutionGrantUncheckedUpdateWithoutInstitutionInput>;
    create: Prisma.XOR<Prisma.InstitutionGrantCreateWithoutInstitutionInput, Prisma.InstitutionGrantUncheckedCreateWithoutInstitutionInput>;
};
export type InstitutionGrantUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.InstitutionGrantWhereUniqueInput;
    data: Prisma.XOR<Prisma.InstitutionGrantUpdateWithoutInstitutionInput, Prisma.InstitutionGrantUncheckedUpdateWithoutInstitutionInput>;
};
export type InstitutionGrantUpdateManyWithWhereWithoutInstitutionInput = {
    where: Prisma.InstitutionGrantScalarWhereInput;
    data: Prisma.XOR<Prisma.InstitutionGrantUpdateManyMutationInput, Prisma.InstitutionGrantUncheckedUpdateManyWithoutInstitutionInput>;
};
export type InstitutionGrantCreateManyUserInput = {
    id?: string;
    institutionId: string;
    permission: string;
    active?: boolean;
};
export type InstitutionGrantUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    permission?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    institution?: Prisma.InstitutionIdentityUpdateOneRequiredWithoutGrantsNestedInput;
};
export type InstitutionGrantUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    permission?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type InstitutionGrantUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    permission?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type InstitutionGrantCreateManyInstitutionInput = {
    id?: string;
    userId: string;
    permission: string;
    active?: boolean;
};
export type InstitutionGrantUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    permission?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    user?: Prisma.UserUpdateOneRequiredWithoutGrantsNestedInput;
};
export type InstitutionGrantUncheckedUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    permission?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type InstitutionGrantUncheckedUpdateManyWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    permission?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type InstitutionGrantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    institutionId?: boolean;
    permission?: boolean;
    active?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["institutionGrant"]>;
export type InstitutionGrantSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    institutionId?: boolean;
    permission?: boolean;
    active?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["institutionGrant"]>;
export type InstitutionGrantSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    institutionId?: boolean;
    permission?: boolean;
    active?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["institutionGrant"]>;
export type InstitutionGrantSelectScalar = {
    id?: boolean;
    userId?: boolean;
    institutionId?: boolean;
    permission?: boolean;
    active?: boolean;
};
export type InstitutionGrantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "institutionId" | "permission" | "active", ExtArgs["result"]["institutionGrant"]>;
export type InstitutionGrantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
};
export type InstitutionGrantIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
};
export type InstitutionGrantIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
};
export type $InstitutionGrantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InstitutionGrant";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        institution: Prisma.$InstitutionIdentityPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        institutionId: string;
        permission: string;
        active: boolean;
    }, ExtArgs["result"]["institutionGrant"]>;
    composites: {};
};
export type InstitutionGrantGetPayload<S extends boolean | null | undefined | InstitutionGrantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload, S>;
export type InstitutionGrantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InstitutionGrantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InstitutionGrantCountAggregateInputType | true;
};
export interface InstitutionGrantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InstitutionGrant'];
        meta: {
            name: 'InstitutionGrant';
        };
    };
    findUnique<T extends InstitutionGrantFindUniqueArgs>(args: Prisma.SelectSubset<T, InstitutionGrantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InstitutionGrantClient<runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InstitutionGrantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InstitutionGrantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstitutionGrantClient<runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InstitutionGrantFindFirstArgs>(args?: Prisma.SelectSubset<T, InstitutionGrantFindFirstArgs<ExtArgs>>): Prisma.Prisma__InstitutionGrantClient<runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InstitutionGrantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InstitutionGrantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstitutionGrantClient<runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InstitutionGrantFindManyArgs>(args?: Prisma.SelectSubset<T, InstitutionGrantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InstitutionGrantCreateArgs>(args: Prisma.SelectSubset<T, InstitutionGrantCreateArgs<ExtArgs>>): Prisma.Prisma__InstitutionGrantClient<runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InstitutionGrantCreateManyArgs>(args?: Prisma.SelectSubset<T, InstitutionGrantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InstitutionGrantCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InstitutionGrantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InstitutionGrantDeleteArgs>(args: Prisma.SelectSubset<T, InstitutionGrantDeleteArgs<ExtArgs>>): Prisma.Prisma__InstitutionGrantClient<runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InstitutionGrantUpdateArgs>(args: Prisma.SelectSubset<T, InstitutionGrantUpdateArgs<ExtArgs>>): Prisma.Prisma__InstitutionGrantClient<runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InstitutionGrantDeleteManyArgs>(args?: Prisma.SelectSubset<T, InstitutionGrantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InstitutionGrantUpdateManyArgs>(args: Prisma.SelectSubset<T, InstitutionGrantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InstitutionGrantUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InstitutionGrantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InstitutionGrantUpsertArgs>(args: Prisma.SelectSubset<T, InstitutionGrantUpsertArgs<ExtArgs>>): Prisma.Prisma__InstitutionGrantClient<runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InstitutionGrantCountArgs>(args?: Prisma.Subset<T, InstitutionGrantCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InstitutionGrantCountAggregateOutputType> : number>;
    aggregate<T extends InstitutionGrantAggregateArgs>(args: Prisma.Subset<T, InstitutionGrantAggregateArgs>): Prisma.PrismaPromise<GetInstitutionGrantAggregateType<T>>;
    groupBy<T extends InstitutionGrantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InstitutionGrantGroupByArgs['orderBy'];
    } : {
        orderBy?: InstitutionGrantGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InstitutionGrantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstitutionGrantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InstitutionGrantFieldRefs;
}
export interface Prisma__InstitutionGrantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    institution<T extends Prisma.InstitutionIdentityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionIdentityDefaultArgs<ExtArgs>>): Prisma.Prisma__InstitutionIdentityClient<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InstitutionGrantFieldRefs {
    readonly id: Prisma.FieldRef<"InstitutionGrant", 'String'>;
    readonly userId: Prisma.FieldRef<"InstitutionGrant", 'String'>;
    readonly institutionId: Prisma.FieldRef<"InstitutionGrant", 'String'>;
    readonly permission: Prisma.FieldRef<"InstitutionGrant", 'String'>;
    readonly active: Prisma.FieldRef<"InstitutionGrant", 'Boolean'>;
}
export type InstitutionGrantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionGrantSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionGrantOmit<ExtArgs> | null;
    include?: Prisma.InstitutionGrantInclude<ExtArgs> | null;
    where: Prisma.InstitutionGrantWhereUniqueInput;
};
export type InstitutionGrantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionGrantSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionGrantOmit<ExtArgs> | null;
    include?: Prisma.InstitutionGrantInclude<ExtArgs> | null;
    where: Prisma.InstitutionGrantWhereUniqueInput;
};
export type InstitutionGrantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionGrantSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionGrantOmit<ExtArgs> | null;
    include?: Prisma.InstitutionGrantInclude<ExtArgs> | null;
    where?: Prisma.InstitutionGrantWhereInput;
    orderBy?: Prisma.InstitutionGrantOrderByWithRelationInput | Prisma.InstitutionGrantOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionGrantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionGrantScalarFieldEnum | Prisma.InstitutionGrantScalarFieldEnum[];
};
export type InstitutionGrantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionGrantSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionGrantOmit<ExtArgs> | null;
    include?: Prisma.InstitutionGrantInclude<ExtArgs> | null;
    where?: Prisma.InstitutionGrantWhereInput;
    orderBy?: Prisma.InstitutionGrantOrderByWithRelationInput | Prisma.InstitutionGrantOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionGrantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionGrantScalarFieldEnum | Prisma.InstitutionGrantScalarFieldEnum[];
};
export type InstitutionGrantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionGrantSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionGrantOmit<ExtArgs> | null;
    include?: Prisma.InstitutionGrantInclude<ExtArgs> | null;
    where?: Prisma.InstitutionGrantWhereInput;
    orderBy?: Prisma.InstitutionGrantOrderByWithRelationInput | Prisma.InstitutionGrantOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionGrantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionGrantScalarFieldEnum | Prisma.InstitutionGrantScalarFieldEnum[];
};
export type InstitutionGrantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionGrantSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionGrantOmit<ExtArgs> | null;
    include?: Prisma.InstitutionGrantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionGrantCreateInput, Prisma.InstitutionGrantUncheckedCreateInput>;
};
export type InstitutionGrantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InstitutionGrantCreateManyInput | Prisma.InstitutionGrantCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InstitutionGrantCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionGrantSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstitutionGrantOmit<ExtArgs> | null;
    data: Prisma.InstitutionGrantCreateManyInput | Prisma.InstitutionGrantCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InstitutionGrantIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InstitutionGrantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionGrantSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionGrantOmit<ExtArgs> | null;
    include?: Prisma.InstitutionGrantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionGrantUpdateInput, Prisma.InstitutionGrantUncheckedUpdateInput>;
    where: Prisma.InstitutionGrantWhereUniqueInput;
};
export type InstitutionGrantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InstitutionGrantUpdateManyMutationInput, Prisma.InstitutionGrantUncheckedUpdateManyInput>;
    where?: Prisma.InstitutionGrantWhereInput;
    limit?: number;
};
export type InstitutionGrantUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionGrantSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstitutionGrantOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionGrantUpdateManyMutationInput, Prisma.InstitutionGrantUncheckedUpdateManyInput>;
    where?: Prisma.InstitutionGrantWhereInput;
    limit?: number;
    include?: Prisma.InstitutionGrantIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InstitutionGrantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionGrantSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionGrantOmit<ExtArgs> | null;
    include?: Prisma.InstitutionGrantInclude<ExtArgs> | null;
    where: Prisma.InstitutionGrantWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionGrantCreateInput, Prisma.InstitutionGrantUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InstitutionGrantUpdateInput, Prisma.InstitutionGrantUncheckedUpdateInput>;
};
export type InstitutionGrantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionGrantSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionGrantOmit<ExtArgs> | null;
    include?: Prisma.InstitutionGrantInclude<ExtArgs> | null;
    where: Prisma.InstitutionGrantWhereUniqueInput;
};
export type InstitutionGrantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionGrantWhereInput;
    limit?: number;
};
export type InstitutionGrantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionGrantSelect<ExtArgs> | null;
    omit?: Prisma.InstitutionGrantOmit<ExtArgs> | null;
    include?: Prisma.InstitutionGrantInclude<ExtArgs> | null;
};
