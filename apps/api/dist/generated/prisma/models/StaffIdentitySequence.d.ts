import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StaffIdentitySequenceModel = runtime.Types.Result.DefaultSelection<Prisma.$StaffIdentitySequencePayload>;
export type AggregateStaffIdentitySequence = {
    _count: StaffIdentitySequenceCountAggregateOutputType | null;
    _avg: StaffIdentitySequenceAvgAggregateOutputType | null;
    _sum: StaffIdentitySequenceSumAggregateOutputType | null;
    _min: StaffIdentitySequenceMinAggregateOutputType | null;
    _max: StaffIdentitySequenceMaxAggregateOutputType | null;
};
export type StaffIdentitySequenceAvgAggregateOutputType = {
    year: number | null;
    value: number | null;
};
export type StaffIdentitySequenceSumAggregateOutputType = {
    year: number | null;
    value: bigint | null;
};
export type StaffIdentitySequenceMinAggregateOutputType = {
    institutionId: string | null;
    year: number | null;
    staffType: string | null;
    value: bigint | null;
};
export type StaffIdentitySequenceMaxAggregateOutputType = {
    institutionId: string | null;
    year: number | null;
    staffType: string | null;
    value: bigint | null;
};
export type StaffIdentitySequenceCountAggregateOutputType = {
    institutionId: number;
    year: number;
    staffType: number;
    value: number;
    _all: number;
};
export type StaffIdentitySequenceAvgAggregateInputType = {
    year?: true;
    value?: true;
};
export type StaffIdentitySequenceSumAggregateInputType = {
    year?: true;
    value?: true;
};
export type StaffIdentitySequenceMinAggregateInputType = {
    institutionId?: true;
    year?: true;
    staffType?: true;
    value?: true;
};
export type StaffIdentitySequenceMaxAggregateInputType = {
    institutionId?: true;
    year?: true;
    staffType?: true;
    value?: true;
};
export type StaffIdentitySequenceCountAggregateInputType = {
    institutionId?: true;
    year?: true;
    staffType?: true;
    value?: true;
    _all?: true;
};
export type StaffIdentitySequenceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StaffIdentitySequenceWhereInput;
    orderBy?: Prisma.StaffIdentitySequenceOrderByWithRelationInput | Prisma.StaffIdentitySequenceOrderByWithRelationInput[];
    cursor?: Prisma.StaffIdentitySequenceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StaffIdentitySequenceCountAggregateInputType;
    _avg?: StaffIdentitySequenceAvgAggregateInputType;
    _sum?: StaffIdentitySequenceSumAggregateInputType;
    _min?: StaffIdentitySequenceMinAggregateInputType;
    _max?: StaffIdentitySequenceMaxAggregateInputType;
};
export type GetStaffIdentitySequenceAggregateType<T extends StaffIdentitySequenceAggregateArgs> = {
    [P in keyof T & keyof AggregateStaffIdentitySequence]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStaffIdentitySequence[P]> : Prisma.GetScalarType<T[P], AggregateStaffIdentitySequence[P]>;
};
export type StaffIdentitySequenceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StaffIdentitySequenceWhereInput;
    orderBy?: Prisma.StaffIdentitySequenceOrderByWithAggregationInput | Prisma.StaffIdentitySequenceOrderByWithAggregationInput[];
    by: Prisma.StaffIdentitySequenceScalarFieldEnum[] | Prisma.StaffIdentitySequenceScalarFieldEnum;
    having?: Prisma.StaffIdentitySequenceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StaffIdentitySequenceCountAggregateInputType | true;
    _avg?: StaffIdentitySequenceAvgAggregateInputType;
    _sum?: StaffIdentitySequenceSumAggregateInputType;
    _min?: StaffIdentitySequenceMinAggregateInputType;
    _max?: StaffIdentitySequenceMaxAggregateInputType;
};
export type StaffIdentitySequenceGroupByOutputType = {
    institutionId: string;
    year: number;
    staffType: string;
    value: bigint;
    _count: StaffIdentitySequenceCountAggregateOutputType | null;
    _avg: StaffIdentitySequenceAvgAggregateOutputType | null;
    _sum: StaffIdentitySequenceSumAggregateOutputType | null;
    _min: StaffIdentitySequenceMinAggregateOutputType | null;
    _max: StaffIdentitySequenceMaxAggregateOutputType | null;
};
export type GetStaffIdentitySequenceGroupByPayload<T extends StaffIdentitySequenceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StaffIdentitySequenceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StaffIdentitySequenceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StaffIdentitySequenceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StaffIdentitySequenceGroupByOutputType[P]>;
}>>;
export type StaffIdentitySequenceWhereInput = {
    AND?: Prisma.StaffIdentitySequenceWhereInput | Prisma.StaffIdentitySequenceWhereInput[];
    OR?: Prisma.StaffIdentitySequenceWhereInput[];
    NOT?: Prisma.StaffIdentitySequenceWhereInput | Prisma.StaffIdentitySequenceWhereInput[];
    institutionId?: Prisma.UuidFilter<"StaffIdentitySequence"> | string;
    year?: Prisma.IntFilter<"StaffIdentitySequence"> | number;
    staffType?: Prisma.StringFilter<"StaffIdentitySequence"> | string;
    value?: Prisma.BigIntFilter<"StaffIdentitySequence"> | bigint | number;
    institution?: Prisma.XOR<Prisma.InstitutionIdentityScalarRelationFilter, Prisma.InstitutionIdentityWhereInput>;
};
export type StaffIdentitySequenceOrderByWithRelationInput = {
    institutionId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    staffType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    institution?: Prisma.InstitutionIdentityOrderByWithRelationInput;
};
export type StaffIdentitySequenceWhereUniqueInput = Prisma.AtLeast<{
    institutionId_year_staffType?: Prisma.StaffIdentitySequenceInstitutionIdYearStaffTypeCompoundUniqueInput;
    AND?: Prisma.StaffIdentitySequenceWhereInput | Prisma.StaffIdentitySequenceWhereInput[];
    OR?: Prisma.StaffIdentitySequenceWhereInput[];
    NOT?: Prisma.StaffIdentitySequenceWhereInput | Prisma.StaffIdentitySequenceWhereInput[];
    institutionId?: Prisma.UuidFilter<"StaffIdentitySequence"> | string;
    year?: Prisma.IntFilter<"StaffIdentitySequence"> | number;
    staffType?: Prisma.StringFilter<"StaffIdentitySequence"> | string;
    value?: Prisma.BigIntFilter<"StaffIdentitySequence"> | bigint | number;
    institution?: Prisma.XOR<Prisma.InstitutionIdentityScalarRelationFilter, Prisma.InstitutionIdentityWhereInput>;
}, "institutionId_year_staffType">;
export type StaffIdentitySequenceOrderByWithAggregationInput = {
    institutionId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    staffType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    _count?: Prisma.StaffIdentitySequenceCountOrderByAggregateInput;
    _avg?: Prisma.StaffIdentitySequenceAvgOrderByAggregateInput;
    _max?: Prisma.StaffIdentitySequenceMaxOrderByAggregateInput;
    _min?: Prisma.StaffIdentitySequenceMinOrderByAggregateInput;
    _sum?: Prisma.StaffIdentitySequenceSumOrderByAggregateInput;
};
export type StaffIdentitySequenceScalarWhereWithAggregatesInput = {
    AND?: Prisma.StaffIdentitySequenceScalarWhereWithAggregatesInput | Prisma.StaffIdentitySequenceScalarWhereWithAggregatesInput[];
    OR?: Prisma.StaffIdentitySequenceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StaffIdentitySequenceScalarWhereWithAggregatesInput | Prisma.StaffIdentitySequenceScalarWhereWithAggregatesInput[];
    institutionId?: Prisma.UuidWithAggregatesFilter<"StaffIdentitySequence"> | string;
    year?: Prisma.IntWithAggregatesFilter<"StaffIdentitySequence"> | number;
    staffType?: Prisma.StringWithAggregatesFilter<"StaffIdentitySequence"> | string;
    value?: Prisma.BigIntWithAggregatesFilter<"StaffIdentitySequence"> | bigint | number;
};
export type StaffIdentitySequenceCreateInput = {
    year: number;
    staffType: string;
    value?: bigint | number;
    institution: Prisma.InstitutionIdentityCreateNestedOneWithoutSequencesInput;
};
export type StaffIdentitySequenceUncheckedCreateInput = {
    institutionId: string;
    year: number;
    staffType: string;
    value?: bigint | number;
};
export type StaffIdentitySequenceUpdateInput = {
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    staffType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    institution?: Prisma.InstitutionIdentityUpdateOneRequiredWithoutSequencesNestedInput;
};
export type StaffIdentitySequenceUncheckedUpdateInput = {
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    staffType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type StaffIdentitySequenceCreateManyInput = {
    institutionId: string;
    year: number;
    staffType: string;
    value?: bigint | number;
};
export type StaffIdentitySequenceUpdateManyMutationInput = {
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    staffType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type StaffIdentitySequenceUncheckedUpdateManyInput = {
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    staffType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type StaffIdentitySequenceListRelationFilter = {
    every?: Prisma.StaffIdentitySequenceWhereInput;
    some?: Prisma.StaffIdentitySequenceWhereInput;
    none?: Prisma.StaffIdentitySequenceWhereInput;
};
export type StaffIdentitySequenceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StaffIdentitySequenceInstitutionIdYearStaffTypeCompoundUniqueInput = {
    institutionId: string;
    year: number;
    staffType: string;
};
export type StaffIdentitySequenceCountOrderByAggregateInput = {
    institutionId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    staffType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
};
export type StaffIdentitySequenceAvgOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
};
export type StaffIdentitySequenceMaxOrderByAggregateInput = {
    institutionId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    staffType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
};
export type StaffIdentitySequenceMinOrderByAggregateInput = {
    institutionId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    staffType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
};
export type StaffIdentitySequenceSumOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
};
export type StaffIdentitySequenceCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.StaffIdentitySequenceCreateWithoutInstitutionInput, Prisma.StaffIdentitySequenceUncheckedCreateWithoutInstitutionInput> | Prisma.StaffIdentitySequenceCreateWithoutInstitutionInput[] | Prisma.StaffIdentitySequenceUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.StaffIdentitySequenceCreateOrConnectWithoutInstitutionInput | Prisma.StaffIdentitySequenceCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.StaffIdentitySequenceCreateManyInstitutionInputEnvelope;
    connect?: Prisma.StaffIdentitySequenceWhereUniqueInput | Prisma.StaffIdentitySequenceWhereUniqueInput[];
};
export type StaffIdentitySequenceUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.StaffIdentitySequenceCreateWithoutInstitutionInput, Prisma.StaffIdentitySequenceUncheckedCreateWithoutInstitutionInput> | Prisma.StaffIdentitySequenceCreateWithoutInstitutionInput[] | Prisma.StaffIdentitySequenceUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.StaffIdentitySequenceCreateOrConnectWithoutInstitutionInput | Prisma.StaffIdentitySequenceCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.StaffIdentitySequenceCreateManyInstitutionInputEnvelope;
    connect?: Prisma.StaffIdentitySequenceWhereUniqueInput | Prisma.StaffIdentitySequenceWhereUniqueInput[];
};
export type StaffIdentitySequenceUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.StaffIdentitySequenceCreateWithoutInstitutionInput, Prisma.StaffIdentitySequenceUncheckedCreateWithoutInstitutionInput> | Prisma.StaffIdentitySequenceCreateWithoutInstitutionInput[] | Prisma.StaffIdentitySequenceUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.StaffIdentitySequenceCreateOrConnectWithoutInstitutionInput | Prisma.StaffIdentitySequenceCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.StaffIdentitySequenceUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.StaffIdentitySequenceUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.StaffIdentitySequenceCreateManyInstitutionInputEnvelope;
    set?: Prisma.StaffIdentitySequenceWhereUniqueInput | Prisma.StaffIdentitySequenceWhereUniqueInput[];
    disconnect?: Prisma.StaffIdentitySequenceWhereUniqueInput | Prisma.StaffIdentitySequenceWhereUniqueInput[];
    delete?: Prisma.StaffIdentitySequenceWhereUniqueInput | Prisma.StaffIdentitySequenceWhereUniqueInput[];
    connect?: Prisma.StaffIdentitySequenceWhereUniqueInput | Prisma.StaffIdentitySequenceWhereUniqueInput[];
    update?: Prisma.StaffIdentitySequenceUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.StaffIdentitySequenceUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.StaffIdentitySequenceUpdateManyWithWhereWithoutInstitutionInput | Prisma.StaffIdentitySequenceUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.StaffIdentitySequenceScalarWhereInput | Prisma.StaffIdentitySequenceScalarWhereInput[];
};
export type StaffIdentitySequenceUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.StaffIdentitySequenceCreateWithoutInstitutionInput, Prisma.StaffIdentitySequenceUncheckedCreateWithoutInstitutionInput> | Prisma.StaffIdentitySequenceCreateWithoutInstitutionInput[] | Prisma.StaffIdentitySequenceUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.StaffIdentitySequenceCreateOrConnectWithoutInstitutionInput | Prisma.StaffIdentitySequenceCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.StaffIdentitySequenceUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.StaffIdentitySequenceUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.StaffIdentitySequenceCreateManyInstitutionInputEnvelope;
    set?: Prisma.StaffIdentitySequenceWhereUniqueInput | Prisma.StaffIdentitySequenceWhereUniqueInput[];
    disconnect?: Prisma.StaffIdentitySequenceWhereUniqueInput | Prisma.StaffIdentitySequenceWhereUniqueInput[];
    delete?: Prisma.StaffIdentitySequenceWhereUniqueInput | Prisma.StaffIdentitySequenceWhereUniqueInput[];
    connect?: Prisma.StaffIdentitySequenceWhereUniqueInput | Prisma.StaffIdentitySequenceWhereUniqueInput[];
    update?: Prisma.StaffIdentitySequenceUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.StaffIdentitySequenceUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.StaffIdentitySequenceUpdateManyWithWhereWithoutInstitutionInput | Prisma.StaffIdentitySequenceUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.StaffIdentitySequenceScalarWhereInput | Prisma.StaffIdentitySequenceScalarWhereInput[];
};
export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type StaffIdentitySequenceCreateWithoutInstitutionInput = {
    year: number;
    staffType: string;
    value?: bigint | number;
};
export type StaffIdentitySequenceUncheckedCreateWithoutInstitutionInput = {
    year: number;
    staffType: string;
    value?: bigint | number;
};
export type StaffIdentitySequenceCreateOrConnectWithoutInstitutionInput = {
    where: Prisma.StaffIdentitySequenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.StaffIdentitySequenceCreateWithoutInstitutionInput, Prisma.StaffIdentitySequenceUncheckedCreateWithoutInstitutionInput>;
};
export type StaffIdentitySequenceCreateManyInstitutionInputEnvelope = {
    data: Prisma.StaffIdentitySequenceCreateManyInstitutionInput | Prisma.StaffIdentitySequenceCreateManyInstitutionInput[];
    skipDuplicates?: boolean;
};
export type StaffIdentitySequenceUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.StaffIdentitySequenceWhereUniqueInput;
    update: Prisma.XOR<Prisma.StaffIdentitySequenceUpdateWithoutInstitutionInput, Prisma.StaffIdentitySequenceUncheckedUpdateWithoutInstitutionInput>;
    create: Prisma.XOR<Prisma.StaffIdentitySequenceCreateWithoutInstitutionInput, Prisma.StaffIdentitySequenceUncheckedCreateWithoutInstitutionInput>;
};
export type StaffIdentitySequenceUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.StaffIdentitySequenceWhereUniqueInput;
    data: Prisma.XOR<Prisma.StaffIdentitySequenceUpdateWithoutInstitutionInput, Prisma.StaffIdentitySequenceUncheckedUpdateWithoutInstitutionInput>;
};
export type StaffIdentitySequenceUpdateManyWithWhereWithoutInstitutionInput = {
    where: Prisma.StaffIdentitySequenceScalarWhereInput;
    data: Prisma.XOR<Prisma.StaffIdentitySequenceUpdateManyMutationInput, Prisma.StaffIdentitySequenceUncheckedUpdateManyWithoutInstitutionInput>;
};
export type StaffIdentitySequenceScalarWhereInput = {
    AND?: Prisma.StaffIdentitySequenceScalarWhereInput | Prisma.StaffIdentitySequenceScalarWhereInput[];
    OR?: Prisma.StaffIdentitySequenceScalarWhereInput[];
    NOT?: Prisma.StaffIdentitySequenceScalarWhereInput | Prisma.StaffIdentitySequenceScalarWhereInput[];
    institutionId?: Prisma.UuidFilter<"StaffIdentitySequence"> | string;
    year?: Prisma.IntFilter<"StaffIdentitySequence"> | number;
    staffType?: Prisma.StringFilter<"StaffIdentitySequence"> | string;
    value?: Prisma.BigIntFilter<"StaffIdentitySequence"> | bigint | number;
};
export type StaffIdentitySequenceCreateManyInstitutionInput = {
    year: number;
    staffType: string;
    value?: bigint | number;
};
export type StaffIdentitySequenceUpdateWithoutInstitutionInput = {
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    staffType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type StaffIdentitySequenceUncheckedUpdateWithoutInstitutionInput = {
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    staffType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type StaffIdentitySequenceUncheckedUpdateManyWithoutInstitutionInput = {
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    staffType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type StaffIdentitySequenceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    institutionId?: boolean;
    year?: boolean;
    staffType?: boolean;
    value?: boolean;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["staffIdentitySequence"]>;
export type StaffIdentitySequenceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    institutionId?: boolean;
    year?: boolean;
    staffType?: boolean;
    value?: boolean;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["staffIdentitySequence"]>;
export type StaffIdentitySequenceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    institutionId?: boolean;
    year?: boolean;
    staffType?: boolean;
    value?: boolean;
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["staffIdentitySequence"]>;
export type StaffIdentitySequenceSelectScalar = {
    institutionId?: boolean;
    year?: boolean;
    staffType?: boolean;
    value?: boolean;
};
export type StaffIdentitySequenceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"institutionId" | "year" | "staffType" | "value", ExtArgs["result"]["staffIdentitySequence"]>;
export type StaffIdentitySequenceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
};
export type StaffIdentitySequenceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
};
export type StaffIdentitySequenceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionIdentityDefaultArgs<ExtArgs>;
};
export type $StaffIdentitySequencePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StaffIdentitySequence";
    objects: {
        institution: Prisma.$InstitutionIdentityPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        institutionId: string;
        year: number;
        staffType: string;
        value: bigint;
    }, ExtArgs["result"]["staffIdentitySequence"]>;
    composites: {};
};
export type StaffIdentitySequenceGetPayload<S extends boolean | null | undefined | StaffIdentitySequenceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload, S>;
export type StaffIdentitySequenceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StaffIdentitySequenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StaffIdentitySequenceCountAggregateInputType | true;
};
export interface StaffIdentitySequenceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StaffIdentitySequence'];
        meta: {
            name: 'StaffIdentitySequence';
        };
    };
    findUnique<T extends StaffIdentitySequenceFindUniqueArgs>(args: Prisma.SelectSubset<T, StaffIdentitySequenceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StaffIdentitySequenceClient<runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StaffIdentitySequenceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StaffIdentitySequenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StaffIdentitySequenceClient<runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StaffIdentitySequenceFindFirstArgs>(args?: Prisma.SelectSubset<T, StaffIdentitySequenceFindFirstArgs<ExtArgs>>): Prisma.Prisma__StaffIdentitySequenceClient<runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StaffIdentitySequenceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StaffIdentitySequenceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StaffIdentitySequenceClient<runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StaffIdentitySequenceFindManyArgs>(args?: Prisma.SelectSubset<T, StaffIdentitySequenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StaffIdentitySequenceCreateArgs>(args: Prisma.SelectSubset<T, StaffIdentitySequenceCreateArgs<ExtArgs>>): Prisma.Prisma__StaffIdentitySequenceClient<runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StaffIdentitySequenceCreateManyArgs>(args?: Prisma.SelectSubset<T, StaffIdentitySequenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StaffIdentitySequenceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StaffIdentitySequenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StaffIdentitySequenceDeleteArgs>(args: Prisma.SelectSubset<T, StaffIdentitySequenceDeleteArgs<ExtArgs>>): Prisma.Prisma__StaffIdentitySequenceClient<runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StaffIdentitySequenceUpdateArgs>(args: Prisma.SelectSubset<T, StaffIdentitySequenceUpdateArgs<ExtArgs>>): Prisma.Prisma__StaffIdentitySequenceClient<runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StaffIdentitySequenceDeleteManyArgs>(args?: Prisma.SelectSubset<T, StaffIdentitySequenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StaffIdentitySequenceUpdateManyArgs>(args: Prisma.SelectSubset<T, StaffIdentitySequenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StaffIdentitySequenceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StaffIdentitySequenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StaffIdentitySequenceUpsertArgs>(args: Prisma.SelectSubset<T, StaffIdentitySequenceUpsertArgs<ExtArgs>>): Prisma.Prisma__StaffIdentitySequenceClient<runtime.Types.Result.GetResult<Prisma.$StaffIdentitySequencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StaffIdentitySequenceCountArgs>(args?: Prisma.Subset<T, StaffIdentitySequenceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StaffIdentitySequenceCountAggregateOutputType> : number>;
    aggregate<T extends StaffIdentitySequenceAggregateArgs>(args: Prisma.Subset<T, StaffIdentitySequenceAggregateArgs>): Prisma.PrismaPromise<GetStaffIdentitySequenceAggregateType<T>>;
    groupBy<T extends StaffIdentitySequenceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StaffIdentitySequenceGroupByArgs['orderBy'];
    } : {
        orderBy?: StaffIdentitySequenceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StaffIdentitySequenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffIdentitySequenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StaffIdentitySequenceFieldRefs;
}
export interface Prisma__StaffIdentitySequenceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    institution<T extends Prisma.InstitutionIdentityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionIdentityDefaultArgs<ExtArgs>>): Prisma.Prisma__InstitutionIdentityClient<runtime.Types.Result.GetResult<Prisma.$InstitutionIdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StaffIdentitySequenceFieldRefs {
    readonly institutionId: Prisma.FieldRef<"StaffIdentitySequence", 'String'>;
    readonly year: Prisma.FieldRef<"StaffIdentitySequence", 'Int'>;
    readonly staffType: Prisma.FieldRef<"StaffIdentitySequence", 'String'>;
    readonly value: Prisma.FieldRef<"StaffIdentitySequence", 'BigInt'>;
}
export type StaffIdentitySequenceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffIdentitySequenceSelect<ExtArgs> | null;
    omit?: Prisma.StaffIdentitySequenceOmit<ExtArgs> | null;
    include?: Prisma.StaffIdentitySequenceInclude<ExtArgs> | null;
    where: Prisma.StaffIdentitySequenceWhereUniqueInput;
};
export type StaffIdentitySequenceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffIdentitySequenceSelect<ExtArgs> | null;
    omit?: Prisma.StaffIdentitySequenceOmit<ExtArgs> | null;
    include?: Prisma.StaffIdentitySequenceInclude<ExtArgs> | null;
    where: Prisma.StaffIdentitySequenceWhereUniqueInput;
};
export type StaffIdentitySequenceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StaffIdentitySequenceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StaffIdentitySequenceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StaffIdentitySequenceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffIdentitySequenceSelect<ExtArgs> | null;
    omit?: Prisma.StaffIdentitySequenceOmit<ExtArgs> | null;
    include?: Prisma.StaffIdentitySequenceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StaffIdentitySequenceCreateInput, Prisma.StaffIdentitySequenceUncheckedCreateInput>;
};
export type StaffIdentitySequenceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StaffIdentitySequenceCreateManyInput | Prisma.StaffIdentitySequenceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StaffIdentitySequenceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffIdentitySequenceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StaffIdentitySequenceOmit<ExtArgs> | null;
    data: Prisma.StaffIdentitySequenceCreateManyInput | Prisma.StaffIdentitySequenceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StaffIdentitySequenceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StaffIdentitySequenceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffIdentitySequenceSelect<ExtArgs> | null;
    omit?: Prisma.StaffIdentitySequenceOmit<ExtArgs> | null;
    include?: Prisma.StaffIdentitySequenceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StaffIdentitySequenceUpdateInput, Prisma.StaffIdentitySequenceUncheckedUpdateInput>;
    where: Prisma.StaffIdentitySequenceWhereUniqueInput;
};
export type StaffIdentitySequenceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StaffIdentitySequenceUpdateManyMutationInput, Prisma.StaffIdentitySequenceUncheckedUpdateManyInput>;
    where?: Prisma.StaffIdentitySequenceWhereInput;
    limit?: number;
};
export type StaffIdentitySequenceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffIdentitySequenceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StaffIdentitySequenceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StaffIdentitySequenceUpdateManyMutationInput, Prisma.StaffIdentitySequenceUncheckedUpdateManyInput>;
    where?: Prisma.StaffIdentitySequenceWhereInput;
    limit?: number;
    include?: Prisma.StaffIdentitySequenceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StaffIdentitySequenceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffIdentitySequenceSelect<ExtArgs> | null;
    omit?: Prisma.StaffIdentitySequenceOmit<ExtArgs> | null;
    include?: Prisma.StaffIdentitySequenceInclude<ExtArgs> | null;
    where: Prisma.StaffIdentitySequenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.StaffIdentitySequenceCreateInput, Prisma.StaffIdentitySequenceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StaffIdentitySequenceUpdateInput, Prisma.StaffIdentitySequenceUncheckedUpdateInput>;
};
export type StaffIdentitySequenceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffIdentitySequenceSelect<ExtArgs> | null;
    omit?: Prisma.StaffIdentitySequenceOmit<ExtArgs> | null;
    include?: Prisma.StaffIdentitySequenceInclude<ExtArgs> | null;
    where: Prisma.StaffIdentitySequenceWhereUniqueInput;
};
export type StaffIdentitySequenceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StaffIdentitySequenceWhereInput;
    limit?: number;
};
export type StaffIdentitySequenceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffIdentitySequenceSelect<ExtArgs> | null;
    omit?: Prisma.StaffIdentitySequenceOmit<ExtArgs> | null;
    include?: Prisma.StaffIdentitySequenceInclude<ExtArgs> | null;
};
