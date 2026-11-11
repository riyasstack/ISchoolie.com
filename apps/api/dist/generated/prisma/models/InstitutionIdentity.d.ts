import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InstitutionIdentityModel = runtime.Types.Result.DefaultSelection<Prisma.$InstitutionIdentityPayload>;
export type AggregateInstitutionIdentity = {
    _count: InstitutionIdentityCountAggregateOutputType | null;
    _avg: InstitutionIdentityAvgAggregateOutputType | null;
    _sum: InstitutionIdentitySumAggregateOutputType | null;
    _min: InstitutionIdentityMinAggregateOutputType | null;
    _max: InstitutionIdentityMaxAggregateOutputType | null;
};
export type InstitutionIdentityAvgAggregateOutputType = {
    sequencePadding: number | null;
};
export type InstitutionIdentitySumAggregateOutputType = {
    sequencePadding: number | null;
};
export type InstitutionIdentityMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    name: string | null;
    identifierCase: string | null;
    sequencePadding: number | null;
    active: boolean | null;
    createdAt: Date | null;
};
export type InstitutionIdentityMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    name: string | null;
    identifierCase: string | null;
    sequencePadding: number | null;
    active: boolean | null;
    createdAt: Date | null;
};
export type InstitutionIdentityCountAggregateOutputType = {
    id: number;
    code: number;
    name: number;
    identifierCase: number;
    sequencePadding: number;
    active: number;
    createdAt: number;
    _all: number;
};
export type InstitutionIdentityAvgAggregateInputType = {
    sequencePadding?: true;
};
export type InstitutionIdentitySumAggregateInputType = {
    sequencePadding?: true;
};
export type InstitutionIdentityMinAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    identifierCase?: true;
    sequencePadding?: true;
    active?: true;
    createdAt?: true;
};
export type InstitutionIdentityMaxAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    identifierCase?: true;
    sequencePadding?: true;
    active?: true;
    createdAt?: true;
};
export type InstitutionIdentityCountAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    identifierCase?: true;
    sequencePadding?: true;
    active?: true;
    createdAt?: true;
    _all?: true;
};
export type InstitutionIdentityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionIdentityWhereInput;
    orderBy?: Prisma.InstitutionIdentityOrderByWithRelationInput | Prisma.InstitutionIdentityOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InstitutionIdentityCountAggregateInputType;
    _avg?: InstitutionIdentityAvgAggregateInputType;
    _sum?: InstitutionIdentitySumAggregateInputType;
    _min?: InstitutionIdentityMinAggregateInputType;
    _max?: InstitutionIdentityMaxAggregateInputType;
};
export type GetInstitutionIdentityAggregateType<T extends InstitutionIdentityAggregateArgs> = {
    [P in keyof T & keyof AggregateInstitutionIdentity]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInstitutionIdentity[P]> : Prisma.GetScalarType<T[P], AggregateInstitutionIdentity[P]>;
};
export type InstitutionIdentityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionIdentityWhereInput;
    orderBy?: Prisma.InstitutionIdentityOrderByWithAggregationInput | Prisma.InstitutionIdentityOrderByWithAggregationInput[];
    by: Prisma.InstitutionIdentityScalarFieldEnum[] | Prisma.InstitutionIdentityScalarFieldEnum;
    having?: Prisma.InstitutionIdentityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InstitutionIdentityCountAggregateInputType | true;
    _avg?: InstitutionIdentityAvgAggregateInputType;
    _sum?: InstitutionIdentitySumAggregateInputType;
    _min?: InstitutionIdentityMinAggregateInputType;
    _max?: InstitutionIdentityMaxAggregateInputType;
};
export type InstitutionIdentityGroupByOutputType = {
    id: string;
    code: string;
    name: string;
    identifierCase: string;
    sequencePadding: number;
    active: boolean;
    createdAt: Date;
    _count: InstitutionIdentityCountAggregateOutputType | null;
    _avg: InstitutionIdentityAvgAggregateOutputType | null;
    _sum: InstitutionIdentitySumAggregateOutputType | null;
    _min: InstitutionIdentityMinAggregateOutputType | null;
    _max: InstitutionIdentityMaxAggregateOutputType | null;
};
export type GetInstitutionIdentityGroupByPayload<T extends InstitutionIdentityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InstitutionIdentityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InstitutionIdentityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InstitutionIdentityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InstitutionIdentityGroupByOutputType[P]>;
}>>;
export type InstitutionIdentityWhereInput = {
    AND?: Prisma.InstitutionIdentityWhereInput | Prisma.InstitutionIdentityWhereInput[];
    OR?: Prisma.InstitutionIdentityWhereInput[];
    NOT?: Prisma.InstitutionIdentityWhereInput | Prisma.InstitutionIdentityWhereInput[];
    id?: Prisma.UuidFilter<"InstitutionIdentity"> | string;
    code?: Prisma.StringFilter<"InstitutionIdentity"> | string;
    name?: Prisma.StringFilter<"InstitutionIdentity"> | string;
    identifierCase?: Prisma.StringFilter<"InstitutionIdentity"> | string;
    sequencePadding?: Prisma.IntFilter<"InstitutionIdentity"> | number;
    active?: Prisma.BoolFilter<"InstitutionIdentity"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"InstitutionIdentity"> | Date | string;
    logins?: Prisma.InstitutionalLoginListRelationFilter;
    sequences?: Prisma.StaffIdentitySequenceListRelationFilter;
    grants?: Prisma.InstitutionGrantListRelationFilter;
    imports?: Prisma.IdentityImportListRelationFilter;
};
export type InstitutionIdentityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    identifierCase?: Prisma.SortOrder;
    sequencePadding?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    logins?: Prisma.InstitutionalLoginOrderByRelationAggregateInput;
    sequences?: Prisma.StaffIdentitySequenceOrderByRelationAggregateInput;
    grants?: Prisma.InstitutionGrantOrderByRelationAggregateInput;
    imports?: Prisma.IdentityImportOrderByRelationAggregateInput;
};
export type InstitutionIdentityWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.InstitutionIdentityWhereInput | Prisma.InstitutionIdentityWhereInput[];
    OR?: Prisma.InstitutionIdentityWhereInput[];
    NOT?: Prisma.InstitutionIdentityWhereInput | Prisma.InstitutionIdentityWhereInput[];
    name?: Prisma.StringFilter<"InstitutionIdentity"> | string;
    identifierCase?: Prisma.StringFilter<"InstitutionIdentity"> | string;
    sequencePadding?: Prisma.IntFilter<"InstitutionIdentity"> | number;
    active?: Prisma.BoolFilter<"InstitutionIdentity"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"InstitutionIdentity"> | Date | string;
    logins?: Prisma.InstitutionalLoginListRelationFilter;
    sequences?: Prisma.StaffIdentitySequenceListRelationFilter;
    grants?: Prisma.InstitutionGrantListRelationFilter;
    imports?: Prisma.IdentityImportListRelationFilter;
}, "id" | "code">;
export type InstitutionIdentityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    identifierCase?: Prisma.SortOrder;
    sequencePadding?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.InstitutionIdentityCountOrderByAggregateInput;
    _avg?: Prisma.InstitutionIdentityAvgOrderByAggregateInput;
    _max?: Prisma.InstitutionIdentityMaxOrderByAggregateInput;
    _min?: Prisma.InstitutionIdentityMinOrderByAggregateInput;
    _sum?: Prisma.InstitutionIdentitySumOrderByAggregateInput;
};
export type InstitutionIdentityScalarWhereWithAggregatesInput = {
    AND?: Prisma.InstitutionIdentityScalarWhereWithAggregatesInput | Prisma.InstitutionIdentityScalarWhereWithAggregatesInput[];
    OR?: Prisma.InstitutionIdentityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InstitutionIdentityScalarWhereWithAggregatesInput | Prisma.InstitutionIdentityScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"InstitutionIdentity"> | string;
    code?: Prisma.StringWithAggregatesFilter<"InstitutionIdentity"> | string;
    name?: Prisma.StringWithAggregatesFilter<"InstitutionIdentity"> | string;
    identifierCase?: Prisma.StringWithAggregatesFilter<"InstitutionIdentity"> | string;
    sequencePadding?: Prisma.IntWithAggregatesFilter<"InstitutionIdentity"> | number;
    active?: Prisma.BoolWithAggregatesFilter<"InstitutionIdentity"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"InstitutionIdentity"> | Date | string;
};
export type InstitutionIdentityCreateInput = {
    id?: string;
    code: string;
    name: string;
    identifierCase?: string;
    sequencePadding?: number;
    active?: boolean;
    createdAt?: Date | string;
    logins?: Prisma.InstitutionalLoginCreateNestedManyWithoutInstitutionInput;
    sequences?: Prisma.StaffIdentitySequenceCreateNestedManyWithoutInstitutionInput;
    grants?: Prisma.InstitutionGrantCreateNestedManyWithoutInstitutionInput;
    imports?: Prisma.IdentityImportCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionIdentityUncheckedCreateInput = {
    id?: string;
    code: string;
    name: string;
    identifierCase?: string;
    sequencePadding?: number;
    active?: boolean;
    createdAt?: Date | string;
    logins?: Prisma.InstitutionalLoginUncheckedCreateNestedManyWithoutInstitutionInput;
    sequences?: Prisma.StaffIdentitySequenceUncheckedCreateNestedManyWithoutInstitutionInput;
    grants?: Prisma.InstitutionGrantUncheckedCreateNestedManyWithoutInstitutionInput;
    imports?: Prisma.IdentityImportUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionIdentityUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    identifierCase?: Prisma.StringFieldUpdateOperationsInput | string;
    sequencePadding?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logins?: Prisma.InstitutionalLoginUpdateManyWithoutInstitutionNestedInput;
    sequences?: Prisma.StaffIdentitySequenceUpdateManyWithoutInstitutionNestedInput;
    grants?: Prisma.InstitutionGrantUpdateManyWithoutInstitutionNestedInput;
    imports?: Prisma.IdentityImportUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionIdentityUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    identifierCase?: Prisma.StringFieldUpdateOperationsInput | string;
    sequencePadding?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logins?: Prisma.InstitutionalLoginUncheckedUpdateManyWithoutInstitutionNestedInput;
    sequences?: Prisma.StaffIdentitySequenceUncheckedUpdateManyWithoutInstitutionNestedInput;
    grants?: Prisma.InstitutionGrantUncheckedUpdateManyWithoutInstitutionNestedInput;
    imports?: Prisma.IdentityImportUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionIdentityCreateManyInput = {
    id?: string;
    code: string;
    name: string;
    identifierCase?: string;
    sequencePadding?: number;
    active?: boolean;
    createdAt?: Date | string;
};
export type InstitutionIdentityUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    identifierCase?: Prisma.StringFieldUpdateOperationsInput | string;
    sequencePadding?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstitutionIdentityUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    identifierCase?: Prisma.StringFieldUpdateOperationsInput | string;
    sequencePadding?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstitutionIdentityCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    identifierCase?: Prisma.SortOrder;
    sequencePadding?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InstitutionIdentityAvgOrderByAggregateInput = {
    sequencePadding?: Prisma.SortOrder;
};
export type InstitutionIdentityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    identifierCase?: Prisma.SortOrder;
    sequencePadding?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InstitutionIdentityMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    identifierCase?: Prisma.SortOrder;
    sequencePadding?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InstitutionIdentitySumOrderByAggregateInput = {
    sequencePadding?: Prisma.SortOrder;
};
export type InstitutionIdentityScalarRelationFilter = {
    is?: Prisma.InstitutionIdentityWhereInput;
    isNot?: Prisma.InstitutionIdentityWhereInput;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type InstitutionIdentityCreateNestedOneWithoutLoginsInput = {
    create?: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutLoginsInput, Prisma.InstitutionIdentityUncheckedCreateWithoutLoginsInput>;
    connectOrCreate?: Prisma.InstitutionIdentityCreateOrConnectWithoutLoginsInput;
    connect?: Prisma.InstitutionIdentityWhereUniqueInput;
};
export type InstitutionIdentityUpdateOneRequiredWithoutLoginsNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutLoginsInput, Prisma.InstitutionIdentityUncheckedCreateWithoutLoginsInput>;
    connectOrCreate?: Prisma.InstitutionIdentityCreateOrConnectWithoutLoginsInput;
    upsert?: Prisma.InstitutionIdentityUpsertWithoutLoginsInput;
    connect?: Prisma.InstitutionIdentityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionIdentityUpdateToOneWithWhereWithoutLoginsInput, Prisma.InstitutionIdentityUpdateWithoutLoginsInput>, Prisma.InstitutionIdentityUncheckedUpdateWithoutLoginsInput>;
};
export type InstitutionIdentityCreateNestedOneWithoutSequencesInput = {
    create?: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutSequencesInput, Prisma.InstitutionIdentityUncheckedCreateWithoutSequencesInput>;
    connectOrCreate?: Prisma.InstitutionIdentityCreateOrConnectWithoutSequencesInput;
    connect?: Prisma.InstitutionIdentityWhereUniqueInput;
};
export type InstitutionIdentityUpdateOneRequiredWithoutSequencesNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutSequencesInput, Prisma.InstitutionIdentityUncheckedCreateWithoutSequencesInput>;
    connectOrCreate?: Prisma.InstitutionIdentityCreateOrConnectWithoutSequencesInput;
    upsert?: Prisma.InstitutionIdentityUpsertWithoutSequencesInput;
    connect?: Prisma.InstitutionIdentityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionIdentityUpdateToOneWithWhereWithoutSequencesInput, Prisma.InstitutionIdentityUpdateWithoutSequencesInput>, Prisma.InstitutionIdentityUncheckedUpdateWithoutSequencesInput>;
};
export type InstitutionIdentityCreateNestedOneWithoutGrantsInput = {
    create?: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutGrantsInput, Prisma.InstitutionIdentityUncheckedCreateWithoutGrantsInput>;
    connectOrCreate?: Prisma.InstitutionIdentityCreateOrConnectWithoutGrantsInput;
    connect?: Prisma.InstitutionIdentityWhereUniqueInput;
};
export type InstitutionIdentityUpdateOneRequiredWithoutGrantsNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutGrantsInput, Prisma.InstitutionIdentityUncheckedCreateWithoutGrantsInput>;
    connectOrCreate?: Prisma.InstitutionIdentityCreateOrConnectWithoutGrantsInput;
    upsert?: Prisma.InstitutionIdentityUpsertWithoutGrantsInput;
    connect?: Prisma.InstitutionIdentityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionIdentityUpdateToOneWithWhereWithoutGrantsInput, Prisma.InstitutionIdentityUpdateWithoutGrantsInput>, Prisma.InstitutionIdentityUncheckedUpdateWithoutGrantsInput>;
};
export type InstitutionIdentityCreateNestedOneWithoutImportsInput = {
    create?: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutImportsInput, Prisma.InstitutionIdentityUncheckedCreateWithoutImportsInput>;
    connectOrCreate?: Prisma.InstitutionIdentityCreateOrConnectWithoutImportsInput;
    connect?: Prisma.InstitutionIdentityWhereUniqueInput;
};
export type InstitutionIdentityUpdateOneRequiredWithoutImportsNestedInput = {
    create?: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutImportsInput, Prisma.InstitutionIdentityUncheckedCreateWithoutImportsInput>;
    connectOrCreate?: Prisma.InstitutionIdentityCreateOrConnectWithoutImportsInput;
    upsert?: Prisma.InstitutionIdentityUpsertWithoutImportsInput;
    connect?: Prisma.InstitutionIdentityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InstitutionIdentityUpdateToOneWithWhereWithoutImportsInput, Prisma.InstitutionIdentityUpdateWithoutImportsInput>, Prisma.InstitutionIdentityUncheckedUpdateWithoutImportsInput>;
};
export type InstitutionIdentityCreateWithoutLoginsInput = {
    id?: string;
    code: string;
    name: string;
    identifierCase?: string;
    sequencePadding?: number;
    active?: boolean;
    createdAt?: Date | string;
    sequences?: Prisma.StaffIdentitySequenceCreateNestedManyWithoutInstitutionInput;
    grants?: Prisma.InstitutionGrantCreateNestedManyWithoutInstitutionInput;
    imports?: Prisma.IdentityImportCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionIdentityUncheckedCreateWithoutLoginsInput = {
    id?: string;
    code: string;
    name: string;
    identifierCase?: string;
    sequencePadding?: number;
    active?: boolean;
    createdAt?: Date | string;
    sequences?: Prisma.StaffIdentitySequenceUncheckedCreateNestedManyWithoutInstitutionInput;
    grants?: Prisma.InstitutionGrantUncheckedCreateNestedManyWithoutInstitutionInput;
    imports?: Prisma.IdentityImportUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionIdentityCreateOrConnectWithoutLoginsInput = {
    where: Prisma.InstitutionIdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutLoginsInput, Prisma.InstitutionIdentityUncheckedCreateWithoutLoginsInput>;
};
export type InstitutionIdentityUpsertWithoutLoginsInput = {
    update: Prisma.XOR<Prisma.InstitutionIdentityUpdateWithoutLoginsInput, Prisma.InstitutionIdentityUncheckedUpdateWithoutLoginsInput>;
    create: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutLoginsInput, Prisma.InstitutionIdentityUncheckedCreateWithoutLoginsInput>;
    where?: Prisma.InstitutionIdentityWhereInput;
};
export type InstitutionIdentityUpdateToOneWithWhereWithoutLoginsInput = {
    where?: Prisma.InstitutionIdentityWhereInput;
    data: Prisma.XOR<Prisma.InstitutionIdentityUpdateWithoutLoginsInput, Prisma.InstitutionIdentityUncheckedUpdateWithoutLoginsInput>;
};
export type InstitutionIdentityUpdateWithoutLoginsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    identifierCase?: Prisma.StringFieldUpdateOperationsInput | string;
    sequencePadding?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sequences?: Prisma.StaffIdentitySequenceUpdateManyWithoutInstitutionNestedInput;
    grants?: Prisma.InstitutionGrantUpdateManyWithoutInstitutionNestedInput;
    imports?: Prisma.IdentityImportUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionIdentityUncheckedUpdateWithoutLoginsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    identifierCase?: Prisma.StringFieldUpdateOperationsInput | string;
    sequencePadding?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sequences?: Prisma.StaffIdentitySequenceUncheckedUpdateManyWithoutInstitutionNestedInput;
    grants?: Prisma.InstitutionGrantUncheckedUpdateManyWithoutInstitutionNestedInput;
    imports?: Prisma.IdentityImportUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionIdentityCreateWithoutSequencesInput = {
    id?: string;
    code: string;
    name: string;
    identifierCase?: string;
    sequencePadding?: number;
    active?: boolean;
    createdAt?: Date | string;
    logins?: Prisma.InstitutionalLoginCreateNestedManyWithoutInstitutionInput;
    grants?: Prisma.InstitutionGrantCreateNestedManyWithoutInstitutionInput;
    imports?: Prisma.IdentityImportCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionIdentityUncheckedCreateWithoutSequencesInput = {
    id?: string;
    code: string;
    name: string;
    identifierCase?: string;
    sequencePadding?: number;
    active?: boolean;
    createdAt?: Date | string;
    logins?: Prisma.InstitutionalLoginUncheckedCreateNestedManyWithoutInstitutionInput;
    grants?: Prisma.InstitutionGrantUncheckedCreateNestedManyWithoutInstitutionInput;
    imports?: Prisma.IdentityImportUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionIdentityCreateOrConnectWithoutSequencesInput = {
    where: Prisma.InstitutionIdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutSequencesInput, Prisma.InstitutionIdentityUncheckedCreateWithoutSequencesInput>;
};
export type InstitutionIdentityUpsertWithoutSequencesInput = {
    update: Prisma.XOR<Prisma.InstitutionIdentityUpdateWithoutSequencesInput, Prisma.InstitutionIdentityUncheckedUpdateWithoutSequencesInput>;
    create: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutSequencesInput, Prisma.InstitutionIdentityUncheckedCreateWithoutSequencesInput>;
    where?: Prisma.InstitutionIdentityWhereInput;
};
export type InstitutionIdentityUpdateToOneWithWhereWithoutSequencesInput = {
    where?: Prisma.InstitutionIdentityWhereInput;
    data: Prisma.XOR<Prisma.InstitutionIdentityUpdateWithoutSequencesInput, Prisma.InstitutionIdentityUncheckedUpdateWithoutSequencesInput>;
};
export type InstitutionIdentityUpdateWithoutSequencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    identifierCase?: Prisma.StringFieldUpdateOperationsInput | string;
    sequencePadding?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logins?: Prisma.InstitutionalLoginUpdateManyWithoutInstitutionNestedInput;
    grants?: Prisma.InstitutionGrantUpdateManyWithoutInstitutionNestedInput;
    imports?: Prisma.IdentityImportUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionIdentityUncheckedUpdateWithoutSequencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    identifierCase?: Prisma.StringFieldUpdateOperationsInput | string;
    sequencePadding?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logins?: Prisma.InstitutionalLoginUncheckedUpdateManyWithoutInstitutionNestedInput;
    grants?: Prisma.InstitutionGrantUncheckedUpdateManyWithoutInstitutionNestedInput;
    imports?: Prisma.IdentityImportUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionIdentityCreateWithoutGrantsInput = {
    id?: string;
    code: string;
    name: string;
    identifierCase?: string;
    sequencePadding?: number;
    active?: boolean;
    createdAt?: Date | string;
    logins?: Prisma.InstitutionalLoginCreateNestedManyWithoutInstitutionInput;
    sequences?: Prisma.StaffIdentitySequenceCreateNestedManyWithoutInstitutionInput;
    imports?: Prisma.IdentityImportCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionIdentityUncheckedCreateWithoutGrantsInput = {
    id?: string;
    code: string;
    name: string;
    identifierCase?: string;
    sequencePadding?: number;
    active?: boolean;
    createdAt?: Date | string;
    logins?: Prisma.InstitutionalLoginUncheckedCreateNestedManyWithoutInstitutionInput;
    sequences?: Prisma.StaffIdentitySequenceUncheckedCreateNestedManyWithoutInstitutionInput;
    imports?: Prisma.IdentityImportUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionIdentityCreateOrConnectWithoutGrantsInput = {
    where: Prisma.InstitutionIdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutGrantsInput, Prisma.InstitutionIdentityUncheckedCreateWithoutGrantsInput>;
};
export type InstitutionIdentityUpsertWithoutGrantsInput = {
    update: Prisma.XOR<Prisma.InstitutionIdentityUpdateWithoutGrantsInput, Prisma.InstitutionIdentityUncheckedUpdateWithoutGrantsInput>;
    create: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutGrantsInput, Prisma.InstitutionIdentityUncheckedCreateWithoutGrantsInput>;
    where?: Prisma.InstitutionIdentityWhereInput;
};
export type InstitutionIdentityUpdateToOneWithWhereWithoutGrantsInput = {
    where?: Prisma.InstitutionIdentityWhereInput;
    data: Prisma.XOR<Prisma.InstitutionIdentityUpdateWithoutGrantsInput, Prisma.InstitutionIdentityUncheckedUpdateWithoutGrantsInput>;
};
export type InstitutionIdentityUpdateWithoutGrantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    identifierCase?: Prisma.StringFieldUpdateOperationsInput | string;
    sequencePadding?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logins?: Prisma.InstitutionalLoginUpdateManyWithoutInstitutionNestedInput;
    sequences?: Prisma.StaffIdentitySequenceUpdateManyWithoutInstitutionNestedInput;
    imports?: Prisma.IdentityImportUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionIdentityUncheckedUpdateWithoutGrantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    identifierCase?: Prisma.StringFieldUpdateOperationsInput | string;
    sequencePadding?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logins?: Prisma.InstitutionalLoginUncheckedUpdateManyWithoutInstitutionNestedInput;
    sequences?: Prisma.StaffIdentitySequenceUncheckedUpdateManyWithoutInstitutionNestedInput;
    imports?: Prisma.IdentityImportUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionIdentityCreateWithoutImportsInput = {
    id?: string;
    code: string;
    name: string;
    identifierCase?: string;
    sequencePadding?: number;
    active?: boolean;
    createdAt?: Date | string;
    logins?: Prisma.InstitutionalLoginCreateNestedManyWithoutInstitutionInput;
    sequences?: Prisma.StaffIdentitySequenceCreateNestedManyWithoutInstitutionInput;
    grants?: Prisma.InstitutionGrantCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionIdentityUncheckedCreateWithoutImportsInput = {
    id?: string;
    code: string;
    name: string;
    identifierCase?: string;
    sequencePadding?: number;
    active?: boolean;
    createdAt?: Date | string;
    logins?: Prisma.InstitutionalLoginUncheckedCreateNestedManyWithoutInstitutionInput;
    sequences?: Prisma.StaffIdentitySequenceUncheckedCreateNestedManyWithoutInstitutionInput;
    grants?: Prisma.InstitutionGrantUncheckedCreateNestedManyWithoutInstitutionInput;
};
export type InstitutionIdentityCreateOrConnectWithoutImportsInput = {
    where: Prisma.InstitutionIdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutImportsInput, Prisma.InstitutionIdentityUncheckedCreateWithoutImportsInput>;
};
export type InstitutionIdentityUpsertWithoutImportsInput = {
    update: Prisma.XOR<Prisma.InstitutionIdentityUpdateWithoutImportsInput, Prisma.InstitutionIdentityUncheckedUpdateWithoutImportsInput>;
    create: Prisma.XOR<Prisma.InstitutionIdentityCreateWithoutImportsInput, Prisma.InstitutionIdentityUncheckedCreateWithoutImportsInput>;
    where?: Prisma.InstitutionIdentityWhereInput;
};
export type InstitutionIdentityUpdateToOneWithWhereWithoutImportsInput = {
    where?: Prisma.InstitutionIdentityWhereInput;
    data: Prisma.XOR<Prisma.InstitutionIdentityUpdateWithoutImportsInput, Prisma.InstitutionIdentityUncheckedUpdateWithoutImportsInput>;
};
export type InstitutionIdentityUpdateWithoutImportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    identifierCase?: Prisma.StringFieldUpdateOperationsInput | string;
    sequencePadding?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logins?: Prisma.InstitutionalLoginUpdateManyWithoutInstitutionNestedInput;
    sequences?: Prisma.StaffIdentitySequenceUpdateManyWithoutInstitutionNestedInput;
    grants?: Prisma.InstitutionGrantUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionIdentityUncheckedUpdateWithoutImportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    identifierCase?: Prisma.StringFieldUpdateOperationsInput | string;
    sequencePadding?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logins?: Prisma.InstitutionalLoginUncheckedUpdateManyWithoutInstitutionNestedInput;
    sequences?: Prisma.StaffIdentitySequenceUncheckedUpdateManyWithoutInstitutionNestedInput;
    grants?: Prisma.InstitutionGrantUncheckedUpdateManyWithoutInstitutionNestedInput;
};
export type InstitutionIdentityCountOutputType = {
    logins: number;
    sequences: number;
    grants: number;
    imports: number;
};
export type InstitutionIdentityCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    logins?: boolean | InstitutionIdentityCountOutputTypeCountLoginsArgs;
    sequences?: boolean | InstitutionIdentityCountOutputTypeCountSequencesArgs;
    grants?: boolean | InstitutionIdentityCountOutputTypeCountGrantsArgs;
    imports?: boolean | InstitutionIdentityCountOutputTypeCountImportsArgs;
};
export type InstitutionIdentityCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentityCountOutputTypeSelect<ExtArgs> | null;
};
export type InstitutionIdentityCountOutputTypeCountLoginsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionalLoginWhereInput;
};
export type InstitutionIdentityCountOutputTypeCountSequencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StaffIdentitySequenceWhereInput;
};
export type InstitutionIdentityCountOutputTypeCountGrantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionGrantWhereInput;
};
export type InstitutionIdentityCountOutputTypeCountImportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityImportWhereInput;
};
export type InstitutionIdentitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    identifierCase?: boolean;
    sequencePadding?: boolean;
    active?: boolean;
    createdAt?: boolean;
    logins?: boolean | Prisma.InstitutionIdentity$loginsArgs<ExtArgs>;
    sequences?: boolean | Prisma.InstitutionIdentity$sequencesArgs<ExtArgs>;
    grants?: boolean | Prisma.InstitutionIdentity$grantsArgs<ExtArgs>;
    imports?: boolean | Prisma.InstitutionIdentity$importsArgs<ExtArgs>;
    _count?: boolean | Prisma.InstitutionIdentityCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["institutionIdentity"]>;
export type InstitutionIdentitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    identifierCase?: boolean;
    sequencePadding?: boolean;
    active?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["institutionIdentity"]>;
export type InstitutionIdentitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    identifierCase?: boolean;
    sequencePadding?: boolean;
    active?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["institutionIdentity"]>;
export type InstitutionIdentitySelectScalar = {
    id?: boolean;
    code?: boolean;
    name?: boolean;
    identifierCase?: boolean;
    sequencePadding?: boolean;
    active?: boolean;
    createdAt?: boolean;
};
export type InstitutionIdentityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "name" | "identifierCase" | "sequencePadding" | "active" | "createdAt", ExtArgs["result"]["institutionIdentity"]>;
export type InstitutionIdentityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    logins?: boolean | Prisma.InstitutionIdentity$loginsArgs<ExtArgs>;
    sequences?: boolean | Prisma.InstitutionIdentity$sequencesArgs<ExtArgs>;
    grants?: boolean | Prisma.InstitutionIdentity$grantsArgs<ExtArgs>;
    imports?: boolean | Prisma.InstitutionIdentity$importsArgs<ExtArgs>;
    _count?: boolean | Prisma.InstitutionIdentityCountOutputTypeDefaultArgs<ExtArgs>;
};
export type InstitutionIdentityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type InstitutionIdentityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $InstitutionIdentityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InstitutionIdentity";
    objects: {
        logins: Prisma.$InstitutionalLoginPayload<ExtArgs>[];
        sequences: Prisma.$StaffIdentitySequencePayload<ExtArgs>[];
        grants: Prisma.$InstitutionGrantPayload<ExtArgs>[];
        imports: Prisma.$IdentityImportPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        name: string;
        identifierCase: string;
        sequencePadding: number;
        active: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["institutionIdentity"]>;
    composites: {};
};
export type InstitutionIdentityGetPayload<S extends boolean | null | undefined | InstitutionIdentityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload, S>;
export type InstitutionIdentityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InstitutionIdentityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InstitutionIdentityCountAggregateInputType | true;
};
export interface InstitutionIdentityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InstitutionIdentity'];
        meta: {
            name: 'InstitutionIdentity';
        };
    };
    findUnique<T extends InstitutionIdentityFindUniqueArgs>(args: Prisma.SelectSubset<T, InstitutionIdentityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InstitutionIdentityClient<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InstitutionIdentityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InstitutionIdentityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstitutionIdentityClient<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InstitutionIdentityFindFirstArgs>(args?: Prisma.SelectSubset<T, InstitutionIdentityFindFirstArgs<ExtArgs>>): Prisma.Prisma__InstitutionIdentityClient<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InstitutionIdentityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InstitutionIdentityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstitutionIdentityClient<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InstitutionIdentityFindManyArgs>(args?: Prisma.SelectSubset<T, InstitutionIdentityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InstitutionIdentityCreateArgs>(args: Prisma.SelectSubset<T, InstitutionIdentityCreateArgs<ExtArgs>>): Prisma.Prisma__InstitutionIdentityClient<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InstitutionIdentityCreateManyArgs>(args?: Prisma.SelectSubset<T, InstitutionIdentityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InstitutionIdentityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InstitutionIdentityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InstitutionIdentityDeleteArgs>(args: Prisma.SelectSubset<T, InstitutionIdentityDeleteArgs<ExtArgs>>): Prisma.Prisma__InstitutionIdentityClient<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InstitutionIdentityUpdateArgs>(args: Prisma.SelectSubset<T, InstitutionIdentityUpdateArgs<ExtArgs>>): Prisma.Prisma__InstitutionIdentityClient<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InstitutionIdentityDeleteManyArgs>(args?: Prisma.SelectSubset<T, InstitutionIdentityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InstitutionIdentityUpdateManyArgs>(args: Prisma.SelectSubset<T, InstitutionIdentityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InstitutionIdentityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InstitutionIdentityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InstitutionIdentityUpsertArgs>(args: Prisma.SelectSubset<T, InstitutionIdentityUpsertArgs<ExtArgs>>): Prisma.Prisma__InstitutionIdentityClient<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InstitutionIdentityCountArgs>(args?: Prisma.Subset<T, InstitutionIdentityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InstitutionIdentityCountAggregateOutputType> : number>;
    aggregate<T extends InstitutionIdentityAggregateArgs>(args: Prisma.Subset<T, InstitutionIdentityAggregateArgs>): Prisma.PrismaPromise<GetInstitutionIdentityAggregateType<T>>;
    groupBy<T extends InstitutionIdentityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InstitutionIdentityGroupByArgs['orderBy'];
    } : {
        orderBy?: InstitutionIdentityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InstitutionIdentityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstitutionIdentityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InstitutionIdentityFieldRefs;
}
export interface Prisma__InstitutionIdentityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    logins<T extends Prisma.InstitutionIdentity$loginsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionIdentity$loginsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionalLoginPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sequences<T extends Prisma.InstitutionIdentity$sequencesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionIdentity$sequencesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    grants<T extends Prisma.InstitutionIdentity$grantsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionIdentity$grantsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstitutionGrantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    imports<T extends Prisma.InstitutionIdentity$importsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionIdentity$importsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityImportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InstitutionIdentityFieldRefs {
    readonly id: Prisma.FieldRef<"InstitutionIdentity", 'String'>;
    readonly code: Prisma.FieldRef<"InstitutionIdentity", 'String'>;
    readonly name: Prisma.FieldRef<"InstitutionIdentity", 'String'>;
    readonly identifierCase: Prisma.FieldRef<"InstitutionIdentity", 'String'>;
    readonly sequencePadding: Prisma.FieldRef<"InstitutionIdentity", 'Int'>;
    readonly active: Prisma.FieldRef<"InstitutionIdentity", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"InstitutionIdentity", 'DateTime'>;
}
export type InstitutionIdentityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentitySelect<ExtArgs> | null;
    omit?: Prisma.InstitutionIdentityOmit<ExtArgs> | null;
    include?: Prisma.InstitutionIdentityInclude<ExtArgs> | null;
    where: Prisma.InstitutionIdentityWhereUniqueInput;
};
export type InstitutionIdentityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentitySelect<ExtArgs> | null;
    omit?: Prisma.InstitutionIdentityOmit<ExtArgs> | null;
    include?: Prisma.InstitutionIdentityInclude<ExtArgs> | null;
    where: Prisma.InstitutionIdentityWhereUniqueInput;
};
export type InstitutionIdentityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentitySelect<ExtArgs> | null;
    omit?: Prisma.InstitutionIdentityOmit<ExtArgs> | null;
    include?: Prisma.InstitutionIdentityInclude<ExtArgs> | null;
    where?: Prisma.InstitutionIdentityWhereInput;
    orderBy?: Prisma.InstitutionIdentityOrderByWithRelationInput | Prisma.InstitutionIdentityOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionIdentityScalarFieldEnum | Prisma.InstitutionIdentityScalarFieldEnum[];
};
export type InstitutionIdentityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentitySelect<ExtArgs> | null;
    omit?: Prisma.InstitutionIdentityOmit<ExtArgs> | null;
    include?: Prisma.InstitutionIdentityInclude<ExtArgs> | null;
    where?: Prisma.InstitutionIdentityWhereInput;
    orderBy?: Prisma.InstitutionIdentityOrderByWithRelationInput | Prisma.InstitutionIdentityOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionIdentityScalarFieldEnum | Prisma.InstitutionIdentityScalarFieldEnum[];
};
export type InstitutionIdentityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentitySelect<ExtArgs> | null;
    omit?: Prisma.InstitutionIdentityOmit<ExtArgs> | null;
    include?: Prisma.InstitutionIdentityInclude<ExtArgs> | null;
    where?: Prisma.InstitutionIdentityWhereInput;
    orderBy?: Prisma.InstitutionIdentityOrderByWithRelationInput | Prisma.InstitutionIdentityOrderByWithRelationInput[];
    cursor?: Prisma.InstitutionIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstitutionIdentityScalarFieldEnum | Prisma.InstitutionIdentityScalarFieldEnum[];
};
export type InstitutionIdentityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentitySelect<ExtArgs> | null;
    omit?: Prisma.InstitutionIdentityOmit<ExtArgs> | null;
    include?: Prisma.InstitutionIdentityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionIdentityCreateInput, Prisma.InstitutionIdentityUncheckedCreateInput>;
};
export type InstitutionIdentityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InstitutionIdentityCreateManyInput | Prisma.InstitutionIdentityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InstitutionIdentityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentitySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstitutionIdentityOmit<ExtArgs> | null;
    data: Prisma.InstitutionIdentityCreateManyInput | Prisma.InstitutionIdentityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InstitutionIdentityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentitySelect<ExtArgs> | null;
    omit?: Prisma.InstitutionIdentityOmit<ExtArgs> | null;
    include?: Prisma.InstitutionIdentityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionIdentityUpdateInput, Prisma.InstitutionIdentityUncheckedUpdateInput>;
    where: Prisma.InstitutionIdentityWhereUniqueInput;
};
export type InstitutionIdentityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InstitutionIdentityUpdateManyMutationInput, Prisma.InstitutionIdentityUncheckedUpdateManyInput>;
    where?: Prisma.InstitutionIdentityWhereInput;
    limit?: number;
};
export type InstitutionIdentityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentitySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstitutionIdentityOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstitutionIdentityUpdateManyMutationInput, Prisma.InstitutionIdentityUncheckedUpdateManyInput>;
    where?: Prisma.InstitutionIdentityWhereInput;
    limit?: number;
};
export type InstitutionIdentityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentitySelect<ExtArgs> | null;
    omit?: Prisma.InstitutionIdentityOmit<ExtArgs> | null;
    include?: Prisma.InstitutionIdentityInclude<ExtArgs> | null;
    where: Prisma.InstitutionIdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstitutionIdentityCreateInput, Prisma.InstitutionIdentityUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InstitutionIdentityUpdateInput, Prisma.InstitutionIdentityUncheckedUpdateInput>;
};
export type InstitutionIdentityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentitySelect<ExtArgs> | null;
    omit?: Prisma.InstitutionIdentityOmit<ExtArgs> | null;
    include?: Prisma.InstitutionIdentityInclude<ExtArgs> | null;
    where: Prisma.InstitutionIdentityWhereUniqueInput;
};
export type InstitutionIdentityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstitutionIdentityWhereInput;
    limit?: number;
};
export type InstitutionIdentity$loginsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InstitutionIdentity$sequencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffIdentitySequenceSelect<ExtArgs> | null;
    omit?: Prisma.StaffIdentitySequenceOmit<ExtArgs> | null;
    include?: Prisma.StaffIdentitySequenceInclude<ExtArgs> | null;
    where?: Prisma.StaffIdentitySequenceWhereInput;
    orderBy?: Prisma.StaffIdentitySequenceOrderByWithRelationInput | Prisma.StaffIdentitySequenceOrderByWithRelationInput[];
    cursor?: Prisma.StaffIdentitySequenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StaffIdentitySequenceScalarFieldEnum | Prisma.StaffIdentitySequenceScalarFieldEnum[];
};
export type InstitutionIdentity$grantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InstitutionIdentity$importsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InstitutionIdentityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstitutionIdentitySelect<ExtArgs> | null;
    omit?: Prisma.InstitutionIdentityOmit<ExtArgs> | null;
    include?: Prisma.InstitutionIdentityInclude<ExtArgs> | null;
};
