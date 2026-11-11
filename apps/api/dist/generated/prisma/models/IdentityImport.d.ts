import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentityImportModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentityImportPayload>;
export type AggregateIdentityImport = {
    _count: IdentityImportCountAggregateOutputType | null;
    _min: IdentityImportMinAggregateOutputType | null;
    _max: IdentityImportMaxAggregateOutputType | null;
};
export type IdentityImportMinAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    actorId: string | null;
    expiresAt: Date | null;
    committedAt: Date | null;
};
export type IdentityImportMaxAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    actorId: string | null;
    expiresAt: Date | null;
    committedAt: Date | null;
};
export type IdentityImportCountAggregateOutputType = {
    id: number;
    institutionId: number;
    actorId: number;
    rows: number;
    result: number;
    expiresAt: number;
    committedAt: number;
    _all: number;
};
export type IdentityImportMinAggregateInputType = {
    id?: true;
    institutionId?: true;
    actorId?: true;
    expiresAt?: true;
    committedAt?: true;
};
export type IdentityImportMaxAggregateInputType = {
    id?: true;
    institutionId?: true;
    actorId?: true;
    expiresAt?: true;
    committedAt?: true;
};
export type IdentityImportCountAggregateInputType = {
    id?: true;
    institutionId?: true;
    actorId?: true;
    rows?: true;
    result?: true;
    expiresAt?: true;
    committedAt?: true;
    _all?: true;
};
export type IdentityImportAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityImportWhereInput;
    orderBy?: Prisma.IdentityImportOrderByWithRelationInput | Prisma.IdentityImportOrderByWithRelationInput[];
    cursor?: Prisma.IdentityImportWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentityImportCountAggregateInputType;
    _min?: IdentityImportMinAggregateInputType;
    _max?: IdentityImportMaxAggregateInputType;
};
export type GetIdentityImportAggregateType<T extends IdentityImportAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentityImport]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentityImport[P]> : Prisma.GetScalarType<T[P], AggregateIdentityImport[P]>;
};
export type IdentityImportGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityImportWhereInput;
    orderBy?: Prisma.IdentityImportOrderByWithAggregationInput | Prisma.IdentityImportOrderByWithAggregationInput[];
    by: Prisma.IdentityImportScalarFieldEnum[] | Prisma.IdentityImportScalarFieldEnum;
    having?: Prisma.IdentityImportScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentityImportCountAggregateInputType | true;
    _min?: IdentityImportMinAggregateInputType;
    _max?: IdentityImportMaxAggregateInputType;
};
export type IdentityImportGroupByOutputType = {
    id: string;
    institutionId: string;
    actorId: string;
    rows: runtime.JsonValue;
    result: runtime.JsonValue | null;
    expiresAt: Date;
    committedAt: Date | null;
    _count: IdentityImportCountAggregateOutputType | null;
    _min: IdentityImportMinAggregateOutputType | null;
    _max: IdentityImportMaxAggregateOutputType | null;
};
export type GetIdentityImportGroupByPayload<T extends IdentityImportGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentityImportGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentityImportGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentityImportGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentityImportGroupByOutputType[P]>;
}>>;
export type IdentityImportWhereInput = {
    AND?: Prisma.IdentityImportWhereInput | Prisma.IdentityImportWhereInput[];
    OR?: Prisma.IdentityImportWhereInput[];
    NOT?: Prisma.IdentityImportWhereInput | Prisma.IdentityImportWhereInput[];
    id?: Prisma.UuidFilter<"IdentityImport"> | string;
    institutionId?: Prisma.UuidFilter<"IdentityImport"> | string;
    actorId?: Prisma.UuidFilter<"IdentityImport"> | string;
    rows?: Prisma.JsonFilter<"IdentityImport">;
    result?: Prisma.JsonNullableFilter<"IdentityImport">;
    expiresAt?: Prisma.DateTimeFilter<"IdentityImport"> | Date | string;
    committedAt?: Prisma.DateTimeNullableFilter<"IdentityImport"> | Date | string | null;
    institution?: Prisma.XOR<Prisma.InstitutionIdentityScalarRelationFilter, Prisma.InstitutionIdentityWhereInput>;
};
export type IdentityImportOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    result?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    committedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    institution?: Prisma.InstitutionIdentityOrderByWithRelationInput;
};
export type IdentityImportWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.IdentityImportWhereInput | Prisma.IdentityImportWhereInput[];
    OR?: Prisma.IdentityImportWhereInput[];
    NOT?: Prisma.IdentityImportWhereInput | Prisma.IdentityImportWhereInput[];
    institutionId?: Prisma.UuidFilter<"IdentityImport"> | string;
    actorId?: Prisma.UuidFilter<"IdentityImport"> | string;
    rows?: Prisma.JsonFilter<"IdentityImport">;
    result?: Prisma.JsonNullableFilter<"IdentityImport">;
    expiresAt?: Prisma.DateTimeFilter<"IdentityImport"> | Date | string;
    committedAt?: Prisma.DateTimeNullableFilter<"IdentityImport"> | Date | string | null;
    institution?: Prisma.XOR<Prisma.InstitutionIdentityScalarRelationFilter, Prisma.InstitutionIdentityWhereInput>;
}, "id">;
export type IdentityImportOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    result?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    committedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.IdentityImportCountOrderByAggregateInput;
    _max?: Prisma.IdentityImportMaxOrderByAggregateInput;
    _min?: Prisma.IdentityImportMinOrderByAggregateInput;
};
export type IdentityImportScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentityImportScalarWhereWithAggregatesInput | Prisma.IdentityImportScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentityImportScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentityImportScalarWhereWithAggregatesInput | Prisma.IdentityImportScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"IdentityImport"> | string;
    institutionId?: Prisma.UuidWithAggregatesFilter<"IdentityImport"> | string;
    actorId?: Prisma.UuidWithAggregatesFilter<"IdentityImport"> | string;
    rows?: Prisma.JsonWithAggregatesFilter<"IdentityImport">;
    result?: Prisma.JsonNullableWithAggregatesFilter<"IdentityImport">;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"IdentityImport"> | Date | string;
    committedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"IdentityImport"> | Date | string | null;
};
export type IdentityImportCreateInput = {
    id?: string;
    actorId: string;
    rows: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
    committedAt?: Date | string | null;
    institution: Prisma.InstitutionIdentityCreateNestedOneWithoutImportsInput;
};
export type IdentityImportUncheckedCreateInput = {
    id?: string;
    institutionId: string;
    actorId: string;
    rows: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
    committedAt?: Date | string | null;
};
export type IdentityImportUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    rows?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    committedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    institution?: Prisma.InstitutionIdentityUpdateOneRequiredWithoutImportsNestedInput;
};
export type IdentityImportUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    rows?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    committedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IdentityImportCreateManyInput = {
    id?: string;
    institutionId: string;
    actorId: string;
    rows: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
    committedAt?: Date | string | null;
};
export type IdentityImportUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    rows?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    committedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IdentityImportUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    rows?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    committedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IdentityImportListRelationFilter = {
    every?: Prisma.IdentityImportWhereInput;
    some?: Prisma.IdentityImportWhereInput;
    none?: Prisma.IdentityImportWhereInput;
};
export type IdentityImportOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IdentityImportCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    committedAt?: Prisma.SortOrder;
};
export type IdentityImportMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    committedAt?: Prisma.SortOrder;
};
export type IdentityImportMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    committedAt?: Prisma.SortOrder;
};
export type IdentityImportCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.IdentityImportCreateWithoutInstitutionInput, Prisma.IdentityImportUncheckedCreateWithoutInstitutionInput> | Prisma.IdentityImportCreateWithoutInstitutionInput[] | Prisma.IdentityImportUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.IdentityImportCreateOrConnectWithoutInstitutionInput | Prisma.IdentityImportCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.IdentityImportCreateManyInstitutionInputEnvelope;
    connect?: Prisma.IdentityImportWhereUniqueInput | Prisma.IdentityImportWhereUniqueInput[];
};
export type IdentityImportUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.IdentityImportCreateWithoutInstitutionInput, Prisma.IdentityImportUncheckedCreateWithoutInstitutionInput> | Prisma.IdentityImportCreateWithoutInstitutionInput[] | Prisma.IdentityImportUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.IdentityImportCreateOrConnectWithoutInstitutionInput | Prisma.IdentityImportCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.IdentityImportCreateManyInstitutionInputEnvelope;
    connect?: Prisma.IdentityImportWhereUniqueInput | Prisma.IdentityImportWhereUniqueInput[];
};
export type IdentityImportUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityImportCreateWithoutInstitutionInput, Prisma.IdentityImportUncheckedCreateWithoutInstitutionInput> | Prisma.IdentityImportCreateWithoutInstitutionInput[] | Prisma.IdentityImportUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.IdentityImportCreateOrConnectWithoutInstitutionInput | Prisma.IdentityImportCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.IdentityImportUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.IdentityImportUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.IdentityImportCreateManyInstitutionInputEnvelope;
    set?: Prisma.IdentityImportWhereUniqueInput | Prisma.IdentityImportWhereUniqueInput[];
    disconnect?: Prisma.IdentityImportWhereUniqueInput | Prisma.IdentityImportWhereUniqueInput[];
    delete?: Prisma.IdentityImportWhereUniqueInput | Prisma.IdentityImportWhereUniqueInput[];
    connect?: Prisma.IdentityImportWhereUniqueInput | Prisma.IdentityImportWhereUniqueInput[];
    update?: Prisma.IdentityImportUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.IdentityImportUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.IdentityImportUpdateManyWithWhereWithoutInstitutionInput | Prisma.IdentityImportUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.IdentityImportScalarWhereInput | Prisma.IdentityImportScalarWhereInput[];
};
export type IdentityImportUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityImportCreateWithoutInstitutionInput, Prisma.IdentityImportUncheckedCreateWithoutInstitutionInput> | Prisma.IdentityImportCreateWithoutInstitutionInput[] | Prisma.IdentityImportUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.IdentityImportCreateOrConnectWithoutInstitutionInput | Prisma.IdentityImportCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.IdentityImportUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.IdentityImportUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.IdentityImportCreateManyInstitutionInputEnvelope;
    set?: Prisma.IdentityImportWhereUniqueInput | Prisma.IdentityImportWhereUniqueInput[];
    disconnect?: Prisma.IdentityImportWhereUniqueInput | Prisma.IdentityImportWhereUniqueInput[];
    delete?: Prisma.IdentityImportWhereUniqueInput | Prisma.IdentityImportWhereUniqueInput[];
    connect?: Prisma.IdentityImportWhereUniqueInput | Prisma.IdentityImportWhereUniqueInput[];
    update?: Prisma.IdentityImportUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.IdentityImportUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.IdentityImportUpdateManyWithWhereWithoutInstitutionInput | Prisma.IdentityImportUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.IdentityImportScalarWhereInput | Prisma.IdentityImportScalarWhereInput[];
};
export type IdentityImportCreateWithoutInstitutionInput = {
    id?: string;
    actorId: string;
    rows: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
    committedAt?: Date | string | null;
};
export type IdentityImportUncheckedCreateWithoutInstitutionInput = {
    id?: string;
    actorId: string;
    rows: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
    committedAt?: Date | string | null;
};
export type IdentityImportCreateOrConnectWithoutInstitutionInput = {
    where: Prisma.IdentityImportWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityImportCreateWithoutInstitutionInput, Prisma.IdentityImportUncheckedCreateWithoutInstitutionInput>;
};
export type IdentityImportCreateManyInstitutionInputEnvelope = {
    data: Prisma.IdentityImportCreateManyInstitutionInput | Prisma.IdentityImportCreateManyInstitutionInput[];
    skipDuplicates?: boolean;
};
export type IdentityImportUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.IdentityImportWhereUniqueInput;
    update: Prisma.XOR<Prisma.IdentityImportUpdateWithoutInstitutionInput, Prisma.IdentityImportUncheckedUpdateWithoutInstitutionInput>;
    create: Prisma.XOR<Prisma.IdentityImportCreateWithoutInstitutionInput, Prisma.IdentityImportUncheckedCreateWithoutInstitutionInput>;
};
export type IdentityImportUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.IdentityImportWhereUniqueInput;
    data: Prisma.XOR<Prisma.IdentityImportUpdateWithoutInstitutionInput, Prisma.IdentityImportUncheckedUpdateWithoutInstitutionInput>;
};
export type IdentityImportUpdateManyWithWhereWithoutInstitutionInput = {
    where: Prisma.IdentityImportScalarWhereInput;
    data: Prisma.XOR<Prisma.IdentityImportUpdateManyMutationInput, Prisma.IdentityImportUncheckedUpdateManyWithoutInstitutionInput>;
};
export type IdentityImportScalarWhereInput = {
    AND?: Prisma.IdentityImportScalarWhereInput | Prisma.IdentityImportScalarWhereInput[];
    OR?: Prisma.IdentityImportScalarWhereInput[];
    NOT?: Prisma.IdentityImportScalarWhereInput | Prisma.IdentityImportScalarWhereInput[];
    id?: Prisma.UuidFilter<"IdentityImport"> | string;
    institutionId?: Prisma.UuidFilter<"IdentityImport"> | string;
    actorId?: Prisma.UuidFilter<"IdentityImport"> | string;
    rows?: Prisma.JsonFilter<"IdentityImport">;
    result?: Prisma.JsonNullableFilter<"IdentityImport">;
    expiresAt?: Prisma.DateTimeFilter<"IdentityImport"> | Date | string;
    committedAt?: Prisma.DateTimeNullableFilter<"IdentityImport"> | Date | string | null;
};
export type IdentityImportCreateManyInstitutionInput = {
    id?: string;
    actorId: string;
    rows: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
    committedAt?: Date | string | null;
};
export type IdentityImportUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    rows?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    committedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IdentityImportUncheckedUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    rows?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    committedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IdentityImportUncheckedUpdateManyWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    rows?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    committedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IdentityImportSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    actorId?: boolean;
    rows?: boolean;
    result?: boolean;
    expiresAt?: boolean;
    committedAt?: boolean;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identityImport"]>;
export type IdentityImportSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    actorId?: boolean;
    rows?: boolean;
    result?: boolean;
    expiresAt?: boolean;
    committedAt?: boolean;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identityImport"]>;
export type IdentityImportSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    actorId?: boolean;
    rows?: boolean;
    result?: boolean;
    expiresAt?: boolean;
    committedAt?: boolean;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identityImport"]>;
export type IdentityImportSelectScalar = {
    id?: boolean;
    institutionId?: boolean;
    actorId?: boolean;
    rows?: boolean;
    result?: boolean;
    expiresAt?: boolean;
    committedAt?: boolean;
};
export type IdentityImportOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "institutionId" | "actorId" | "rows" | "result" | "expiresAt" | "committedAt", ExtArgs["result"]["identityImport"]>;
export type IdentityImportInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
};
export type IdentityImportIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
};
export type IdentityImportIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
};
export type $IdentityImportPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdentityImport";
    objects: {
        institution: Prisma.$InstitutionIdentityPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        institutionId: string;
        actorId: string;
        rows: runtime.JsonValue;
        result: runtime.JsonValue | null;
        expiresAt: Date;
        committedAt: Date | null;
    }, ExtArgs["result"]["identityImport"]>;
    composites: {};
};
export type IdentityImportGetPayload<S extends boolean | null | undefined | IdentityImportDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload, S>;
export type IdentityImportCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentityImportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentityImportCountAggregateInputType | true;
};
export interface IdentityImportDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdentityImport'];
        meta: {
            name: 'IdentityImport';
        };
    };
    findUnique<T extends IdentityImportFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentityImportFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentityImportClient<runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentityImportFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentityImportFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityImportClient<runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentityImportFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentityImportFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentityImportClient<runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentityImportFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentityImportFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityImportClient<runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentityImportFindManyArgs>(args?: Prisma.SelectSubset<T, IdentityImportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentityImportCreateArgs>(args: Prisma.SelectSubset<T, IdentityImportCreateArgs<ExtArgs>>): Prisma.Prisma__IdentityImportClient<runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentityImportCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentityImportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentityImportCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentityImportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentityImportDeleteArgs>(args: Prisma.SelectSubset<T, IdentityImportDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentityImportClient<runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentityImportUpdateArgs>(args: Prisma.SelectSubset<T, IdentityImportUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentityImportClient<runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentityImportDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentityImportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentityImportUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentityImportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentityImportUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentityImportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentityImportUpsertArgs>(args: Prisma.SelectSubset<T, IdentityImportUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentityImportClient<runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentityImportCountArgs>(args?: Prisma.Subset<T, IdentityImportCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentityImportCountAggregateOutputType> : number>;
    aggregate<T extends IdentityImportAggregateArgs>(args: Prisma.Subset<T, IdentityImportAggregateArgs>): Prisma.PrismaPromise<GetIdentityImportAggregateType<T>>;
    groupBy<T extends IdentityImportGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentityImportGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentityImportGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentityImportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityImportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentityImportFieldRefs;
}
export interface Prisma__IdentityImportClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    institution<T extends Prisma.InstitutionIdentityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionIdentityDefaultArgs<ExtArgs>>): Prisma.Prisma__InstitutionIdentityClient<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentityImportFieldRefs {
    readonly id: Prisma.FieldRef<"IdentityImport", 'String'>;
    readonly institutionId: Prisma.FieldRef<"IdentityImport", 'String'>;
    readonly actorId: Prisma.FieldRef<"IdentityImport", 'String'>;
    readonly rows: Prisma.FieldRef<"IdentityImport", 'Json'>;
    readonly result: Prisma.FieldRef<"IdentityImport", 'Json'>;
    readonly expiresAt: Prisma.FieldRef<"IdentityImport", 'DateTime'>;
    readonly committedAt: Prisma.FieldRef<"IdentityImport", 'DateTime'>;
}
export type IdentityImportFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityImportSelect<ExtArgs> | null;
    omit?: Prisma.IdentityImportOmit<ExtArgs> | null;
    include?: Prisma.IdentityImportInclude<ExtArgs> | null;
    where: Prisma.IdentityImportWhereUniqueInput;
};
export type IdentityImportFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityImportSelect<ExtArgs> | null;
    omit?: Prisma.IdentityImportOmit<ExtArgs> | null;
    include?: Prisma.IdentityImportInclude<ExtArgs> | null;
    where: Prisma.IdentityImportWhereUniqueInput;
};
export type IdentityImportFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityImportSelect<ExtArgs> | null;
    omit?: Prisma.IdentityImportOmit<ExtArgs> | null;
    include?: Prisma.IdentityImportInclude<ExtArgs> | null;
    where?: Prisma.IdentityImportWhereInput;
    orderBy?: Prisma.IdentityImportOrderByWithRelationInput | Prisma.IdentityImportOrderByWithRelationInput[];
    cursor?: Prisma.IdentityImportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityImportScalarFieldEnum | Prisma.IdentityImportScalarFieldEnum[];
};
export type IdentityImportFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityImportSelect<ExtArgs> | null;
    omit?: Prisma.IdentityImportOmit<ExtArgs> | null;
    include?: Prisma.IdentityImportInclude<ExtArgs> | null;
    where?: Prisma.IdentityImportWhereInput;
    orderBy?: Prisma.IdentityImportOrderByWithRelationInput | Prisma.IdentityImportOrderByWithRelationInput[];
    cursor?: Prisma.IdentityImportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityImportScalarFieldEnum | Prisma.IdentityImportScalarFieldEnum[];
};
export type IdentityImportFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityImportSelect<ExtArgs> | null;
    omit?: Prisma.IdentityImportOmit<ExtArgs> | null;
    include?: Prisma.IdentityImportInclude<ExtArgs> | null;
    where?: Prisma.IdentityImportWhereInput;
    orderBy?: Prisma.IdentityImportOrderByWithRelationInput | Prisma.IdentityImportOrderByWithRelationInput[];
    cursor?: Prisma.IdentityImportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityImportScalarFieldEnum | Prisma.IdentityImportScalarFieldEnum[];
};
export type IdentityImportCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityImportSelect<ExtArgs> | null;
    omit?: Prisma.IdentityImportOmit<ExtArgs> | null;
    include?: Prisma.IdentityImportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityImportCreateInput, Prisma.IdentityImportUncheckedCreateInput>;
};
export type IdentityImportCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentityImportCreateManyInput | Prisma.IdentityImportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityImportCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityImportSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityImportOmit<ExtArgs> | null;
    data: Prisma.IdentityImportCreateManyInput | Prisma.IdentityImportCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.IdentityImportIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type IdentityImportUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityImportSelect<ExtArgs> | null;
    omit?: Prisma.IdentityImportOmit<ExtArgs> | null;
    include?: Prisma.IdentityImportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityImportUpdateInput, Prisma.IdentityImportUncheckedUpdateInput>;
    where: Prisma.IdentityImportWhereUniqueInput;
};
export type IdentityImportUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentityImportUpdateManyMutationInput, Prisma.IdentityImportUncheckedUpdateManyInput>;
    where?: Prisma.IdentityImportWhereInput;
    limit?: number;
};
export type IdentityImportUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityImportSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityImportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityImportUpdateManyMutationInput, Prisma.IdentityImportUncheckedUpdateManyInput>;
    where?: Prisma.IdentityImportWhereInput;
    limit?: number;
    include?: Prisma.IdentityImportIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type IdentityImportUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityImportSelect<ExtArgs> | null;
    omit?: Prisma.IdentityImportOmit<ExtArgs> | null;
    include?: Prisma.IdentityImportInclude<ExtArgs> | null;
    where: Prisma.IdentityImportWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityImportCreateInput, Prisma.IdentityImportUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentityImportUpdateInput, Prisma.IdentityImportUncheckedUpdateInput>;
};
export type IdentityImportDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityImportSelect<ExtArgs> | null;
    omit?: Prisma.IdentityImportOmit<ExtArgs> | null;
    include?: Prisma.IdentityImportInclude<ExtArgs> | null;
    where: Prisma.IdentityImportWhereUniqueInput;
};
export type IdentityImportDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityImportWhereInput;
    limit?: number;
};
export type IdentityImportDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityImportSelect<ExtArgs> | null;
    omit?: Prisma.IdentityImportOmit<ExtArgs> | null;
    include?: Prisma.IdentityImportInclude<ExtArgs> | null;
};
