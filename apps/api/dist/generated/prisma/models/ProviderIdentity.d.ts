import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProviderIdentityModel = runtime.Types.Result.DefaultSelection<Prisma.$ProviderIdentityPayload>;
export type AggregateProviderIdentity = {
    _count: ProviderIdentityCountAggregateOutputType | null;
    _min: ProviderIdentityMinAggregateOutputType | null;
    _max: ProviderIdentityMaxAggregateOutputType | null;
};
export type ProviderIdentityMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    provider: string | null;
    subject: string | null;
    linkedAt: Date | null;
};
export type ProviderIdentityMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    provider: string | null;
    subject: string | null;
    linkedAt: Date | null;
};
export type ProviderIdentityCountAggregateOutputType = {
    id: number;
    userId: number;
    provider: number;
    subject: number;
    linkedAt: number;
    _all: number;
};
export type ProviderIdentityMinAggregateInputType = {
    id?: true;
    userId?: true;
    provider?: true;
    subject?: true;
    linkedAt?: true;
};
export type ProviderIdentityMaxAggregateInputType = {
    id?: true;
    userId?: true;
    provider?: true;
    subject?: true;
    linkedAt?: true;
};
export type ProviderIdentityCountAggregateInputType = {
    id?: true;
    userId?: true;
    provider?: true;
    subject?: true;
    linkedAt?: true;
    _all?: true;
};
export type ProviderIdentityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderIdentityWhereInput;
    orderBy?: Prisma.ProviderIdentityOrderByWithRelationInput | Prisma.ProviderIdentityOrderByWithRelationInput[];
    cursor?: Prisma.ProviderIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProviderIdentityCountAggregateInputType;
    _min?: ProviderIdentityMinAggregateInputType;
    _max?: ProviderIdentityMaxAggregateInputType;
};
export type GetProviderIdentityAggregateType<T extends ProviderIdentityAggregateArgs> = {
    [P in keyof T & keyof AggregateProviderIdentity]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProviderIdentity[P]> : Prisma.GetScalarType<T[P], AggregateProviderIdentity[P]>;
};
export type ProviderIdentityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderIdentityWhereInput;
    orderBy?: Prisma.ProviderIdentityOrderByWithAggregationInput | Prisma.ProviderIdentityOrderByWithAggregationInput[];
    by: Prisma.ProviderIdentityScalarFieldEnum[] | Prisma.ProviderIdentityScalarFieldEnum;
    having?: Prisma.ProviderIdentityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProviderIdentityCountAggregateInputType | true;
    _min?: ProviderIdentityMinAggregateInputType;
    _max?: ProviderIdentityMaxAggregateInputType;
};
export type ProviderIdentityGroupByOutputType = {
    id: string;
    userId: string;
    provider: string;
    subject: string;
    linkedAt: Date;
    _count: ProviderIdentityCountAggregateOutputType | null;
    _min: ProviderIdentityMinAggregateOutputType | null;
    _max: ProviderIdentityMaxAggregateOutputType | null;
};
export type GetProviderIdentityGroupByPayload<T extends ProviderIdentityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProviderIdentityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProviderIdentityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProviderIdentityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProviderIdentityGroupByOutputType[P]>;
}>>;
export type ProviderIdentityWhereInput = {
    AND?: Prisma.ProviderIdentityWhereInput | Prisma.ProviderIdentityWhereInput[];
    OR?: Prisma.ProviderIdentityWhereInput[];
    NOT?: Prisma.ProviderIdentityWhereInput | Prisma.ProviderIdentityWhereInput[];
    id?: Prisma.UuidFilter<"ProviderIdentity"> | string;
    userId?: Prisma.UuidFilter<"ProviderIdentity"> | string;
    provider?: Prisma.StringFilter<"ProviderIdentity"> | string;
    subject?: Prisma.StringFilter<"ProviderIdentity"> | string;
    linkedAt?: Prisma.DateTimeFilter<"ProviderIdentity"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ProviderIdentityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type ProviderIdentityWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    provider_subject?: Prisma.ProviderIdentityProviderSubjectCompoundUniqueInput;
    userId_provider?: Prisma.ProviderIdentityUserIdProviderCompoundUniqueInput;
    AND?: Prisma.ProviderIdentityWhereInput | Prisma.ProviderIdentityWhereInput[];
    OR?: Prisma.ProviderIdentityWhereInput[];
    NOT?: Prisma.ProviderIdentityWhereInput | Prisma.ProviderIdentityWhereInput[];
    userId?: Prisma.UuidFilter<"ProviderIdentity"> | string;
    provider?: Prisma.StringFilter<"ProviderIdentity"> | string;
    subject?: Prisma.StringFilter<"ProviderIdentity"> | string;
    linkedAt?: Prisma.DateTimeFilter<"ProviderIdentity"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "provider_subject" | "userId_provider">;
export type ProviderIdentityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
    _count?: Prisma.ProviderIdentityCountOrderByAggregateInput;
    _max?: Prisma.ProviderIdentityMaxOrderByAggregateInput;
    _min?: Prisma.ProviderIdentityMinOrderByAggregateInput;
};
export type ProviderIdentityScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProviderIdentityScalarWhereWithAggregatesInput | Prisma.ProviderIdentityScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProviderIdentityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProviderIdentityScalarWhereWithAggregatesInput | Prisma.ProviderIdentityScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ProviderIdentity"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"ProviderIdentity"> | string;
    provider?: Prisma.StringWithAggregatesFilter<"ProviderIdentity"> | string;
    subject?: Prisma.StringWithAggregatesFilter<"ProviderIdentity"> | string;
    linkedAt?: Prisma.DateTimeWithAggregatesFilter<"ProviderIdentity"> | Date | string;
};
export type ProviderIdentityCreateInput = {
    id?: string;
    provider: string;
    subject: string;
    linkedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProvidersInput;
};
export type ProviderIdentityUncheckedCreateInput = {
    id?: string;
    userId: string;
    provider: string;
    subject: string;
    linkedAt?: Date | string;
};
export type ProviderIdentityUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProvidersNestedInput;
};
export type ProviderIdentityUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderIdentityCreateManyInput = {
    id?: string;
    userId: string;
    provider: string;
    subject: string;
    linkedAt?: Date | string;
};
export type ProviderIdentityUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderIdentityUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderIdentityListRelationFilter = {
    every?: Prisma.ProviderIdentityWhereInput;
    some?: Prisma.ProviderIdentityWhereInput;
    none?: Prisma.ProviderIdentityWhereInput;
};
export type ProviderIdentityOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProviderIdentityProviderSubjectCompoundUniqueInput = {
    provider: string;
    subject: string;
};
export type ProviderIdentityUserIdProviderCompoundUniqueInput = {
    userId: string;
    provider: string;
};
export type ProviderIdentityCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
};
export type ProviderIdentityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
};
export type ProviderIdentityMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    linkedAt?: Prisma.SortOrder;
};
export type ProviderIdentityCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProviderIdentityCreateWithoutUserInput, Prisma.ProviderIdentityUncheckedCreateWithoutUserInput> | Prisma.ProviderIdentityCreateWithoutUserInput[] | Prisma.ProviderIdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProviderIdentityCreateOrConnectWithoutUserInput | Prisma.ProviderIdentityCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProviderIdentityCreateManyUserInputEnvelope;
    connect?: Prisma.ProviderIdentityWhereUniqueInput | Prisma.ProviderIdentityWhereUniqueInput[];
};
export type ProviderIdentityUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProviderIdentityCreateWithoutUserInput, Prisma.ProviderIdentityUncheckedCreateWithoutUserInput> | Prisma.ProviderIdentityCreateWithoutUserInput[] | Prisma.ProviderIdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProviderIdentityCreateOrConnectWithoutUserInput | Prisma.ProviderIdentityCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProviderIdentityCreateManyUserInputEnvelope;
    connect?: Prisma.ProviderIdentityWhereUniqueInput | Prisma.ProviderIdentityWhereUniqueInput[];
};
export type ProviderIdentityUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderIdentityCreateWithoutUserInput, Prisma.ProviderIdentityUncheckedCreateWithoutUserInput> | Prisma.ProviderIdentityCreateWithoutUserInput[] | Prisma.ProviderIdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProviderIdentityCreateOrConnectWithoutUserInput | Prisma.ProviderIdentityCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProviderIdentityUpsertWithWhereUniqueWithoutUserInput | Prisma.ProviderIdentityUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProviderIdentityCreateManyUserInputEnvelope;
    set?: Prisma.ProviderIdentityWhereUniqueInput | Prisma.ProviderIdentityWhereUniqueInput[];
    disconnect?: Prisma.ProviderIdentityWhereUniqueInput | Prisma.ProviderIdentityWhereUniqueInput[];
    delete?: Prisma.ProviderIdentityWhereUniqueInput | Prisma.ProviderIdentityWhereUniqueInput[];
    connect?: Prisma.ProviderIdentityWhereUniqueInput | Prisma.ProviderIdentityWhereUniqueInput[];
    update?: Prisma.ProviderIdentityUpdateWithWhereUniqueWithoutUserInput | Prisma.ProviderIdentityUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProviderIdentityUpdateManyWithWhereWithoutUserInput | Prisma.ProviderIdentityUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProviderIdentityScalarWhereInput | Prisma.ProviderIdentityScalarWhereInput[];
};
export type ProviderIdentityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderIdentityCreateWithoutUserInput, Prisma.ProviderIdentityUncheckedCreateWithoutUserInput> | Prisma.ProviderIdentityCreateWithoutUserInput[] | Prisma.ProviderIdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProviderIdentityCreateOrConnectWithoutUserInput | Prisma.ProviderIdentityCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProviderIdentityUpsertWithWhereUniqueWithoutUserInput | Prisma.ProviderIdentityUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProviderIdentityCreateManyUserInputEnvelope;
    set?: Prisma.ProviderIdentityWhereUniqueInput | Prisma.ProviderIdentityWhereUniqueInput[];
    disconnect?: Prisma.ProviderIdentityWhereUniqueInput | Prisma.ProviderIdentityWhereUniqueInput[];
    delete?: Prisma.ProviderIdentityWhereUniqueInput | Prisma.ProviderIdentityWhereUniqueInput[];
    connect?: Prisma.ProviderIdentityWhereUniqueInput | Prisma.ProviderIdentityWhereUniqueInput[];
    update?: Prisma.ProviderIdentityUpdateWithWhereUniqueWithoutUserInput | Prisma.ProviderIdentityUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProviderIdentityUpdateManyWithWhereWithoutUserInput | Prisma.ProviderIdentityUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProviderIdentityScalarWhereInput | Prisma.ProviderIdentityScalarWhereInput[];
};
export type ProviderIdentityCreateWithoutUserInput = {
    id?: string;
    provider: string;
    subject: string;
    linkedAt?: Date | string;
};
export type ProviderIdentityUncheckedCreateWithoutUserInput = {
    id?: string;
    provider: string;
    subject: string;
    linkedAt?: Date | string;
};
export type ProviderIdentityCreateOrConnectWithoutUserInput = {
    where: Prisma.ProviderIdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderIdentityCreateWithoutUserInput, Prisma.ProviderIdentityUncheckedCreateWithoutUserInput>;
};
export type ProviderIdentityCreateManyUserInputEnvelope = {
    data: Prisma.ProviderIdentityCreateManyUserInput | Prisma.ProviderIdentityCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ProviderIdentityUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProviderIdentityWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProviderIdentityUpdateWithoutUserInput, Prisma.ProviderIdentityUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ProviderIdentityCreateWithoutUserInput, Prisma.ProviderIdentityUncheckedCreateWithoutUserInput>;
};
export type ProviderIdentityUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProviderIdentityWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProviderIdentityUpdateWithoutUserInput, Prisma.ProviderIdentityUncheckedUpdateWithoutUserInput>;
};
export type ProviderIdentityUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ProviderIdentityScalarWhereInput;
    data: Prisma.XOR<Prisma.ProviderIdentityUpdateManyMutationInput, Prisma.ProviderIdentityUncheckedUpdateManyWithoutUserInput>;
};
export type ProviderIdentityScalarWhereInput = {
    AND?: Prisma.ProviderIdentityScalarWhereInput | Prisma.ProviderIdentityScalarWhereInput[];
    OR?: Prisma.ProviderIdentityScalarWhereInput[];
    NOT?: Prisma.ProviderIdentityScalarWhereInput | Prisma.ProviderIdentityScalarWhereInput[];
    id?: Prisma.UuidFilter<"ProviderIdentity"> | string;
    userId?: Prisma.UuidFilter<"ProviderIdentity"> | string;
    provider?: Prisma.StringFilter<"ProviderIdentity"> | string;
    subject?: Prisma.StringFilter<"ProviderIdentity"> | string;
    linkedAt?: Prisma.DateTimeFilter<"ProviderIdentity"> | Date | string;
};
export type ProviderIdentityCreateManyUserInput = {
    id?: string;
    provider: string;
    subject: string;
    linkedAt?: Date | string;
};
export type ProviderIdentityUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderIdentityUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderIdentityUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    linkedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderIdentitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    subject?: boolean;
    linkedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["providerIdentity"]>;
export type ProviderIdentitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    subject?: boolean;
    linkedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["providerIdentity"]>;
export type ProviderIdentitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    subject?: boolean;
    linkedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["providerIdentity"]>;
export type ProviderIdentitySelectScalar = {
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    subject?: boolean;
    linkedAt?: boolean;
};
export type ProviderIdentityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "provider" | "subject" | "linkedAt", ExtArgs["result"]["providerIdentity"]>;
export type ProviderIdentityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProviderIdentityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProviderIdentityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ProviderIdentityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProviderIdentity";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        provider: string;
        subject: string;
        linkedAt: Date;
    }, ExtArgs["result"]["providerIdentity"]>;
    composites: {};
};
export type ProviderIdentityGetPayload<S extends boolean | null | undefined | ProviderIdentityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProviderIdentityPayload, S>;
export type ProviderIdentityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProviderIdentityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProviderIdentityCountAggregateInputType | true;
};
export interface ProviderIdentityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProviderIdentity'];
        meta: {
            name: 'ProviderIdentity';
        };
    };
    findUnique<T extends ProviderIdentityFindUniqueArgs>(args: Prisma.SelectSubset<T, ProviderIdentityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProviderIdentityClient<runtime.Types.Result.GetResult<Prisma.$ProviderIdentityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProviderIdentityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProviderIdentityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProviderIdentityClient<runtime.Types.Result.GetResult<Prisma.$ProviderIdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProviderIdentityFindFirstArgs>(args?: Prisma.SelectSubset<T, ProviderIdentityFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProviderIdentityClient<runtime.Types.Result.GetResult<Prisma.$ProviderIdentityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProviderIdentityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProviderIdentityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProviderIdentityClient<runtime.Types.Result.GetResult<Prisma.$ProviderIdentityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProviderIdentityFindManyArgs>(args?: Prisma.SelectSubset<T, ProviderIdentityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderIdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProviderIdentityCreateArgs>(args: Prisma.SelectSubset<T, ProviderIdentityCreateArgs<ExtArgs>>): Prisma.Prisma__ProviderIdentityClient<runtime.Types.Result.GetResult<Prisma.$ProviderIdentityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProviderIdentityCreateManyArgs>(args?: Prisma.SelectSubset<T, ProviderIdentityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProviderIdentityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProviderIdentityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderIdentityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProviderIdentityDeleteArgs>(args: Prisma.SelectSubset<T, ProviderIdentityDeleteArgs<ExtArgs>>): Prisma.Prisma__ProviderIdentityClient<runtime.Types.Result.GetResult<Prisma.$ProviderIdentityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProviderIdentityUpdateArgs>(args: Prisma.SelectSubset<T, ProviderIdentityUpdateArgs<ExtArgs>>): Prisma.Prisma__ProviderIdentityClient<runtime.Types.Result.GetResult<Prisma.$ProviderIdentityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProviderIdentityDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProviderIdentityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProviderIdentityUpdateManyArgs>(args: Prisma.SelectSubset<T, ProviderIdentityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProviderIdentityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProviderIdentityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderIdentityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProviderIdentityUpsertArgs>(args: Prisma.SelectSubset<T, ProviderIdentityUpsertArgs<ExtArgs>>): Prisma.Prisma__ProviderIdentityClient<runtime.Types.Result.GetResult<Prisma.$ProviderIdentityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProviderIdentityCountArgs>(args?: Prisma.Subset<T, ProviderIdentityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProviderIdentityCountAggregateOutputType> : number>;
    aggregate<T extends ProviderIdentityAggregateArgs>(args: Prisma.Subset<T, ProviderIdentityAggregateArgs>): Prisma.PrismaPromise<GetProviderIdentityAggregateType<T>>;
    groupBy<T extends ProviderIdentityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProviderIdentityGroupByArgs['orderBy'];
    } : {
        orderBy?: ProviderIdentityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProviderIdentityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderIdentityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProviderIdentityFieldRefs;
}
export interface Prisma__ProviderIdentityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProviderIdentityFieldRefs {
    readonly id: Prisma.FieldRef<"ProviderIdentity", 'String'>;
    readonly userId: Prisma.FieldRef<"ProviderIdentity", 'String'>;
    readonly provider: Prisma.FieldRef<"ProviderIdentity", 'String'>;
    readonly subject: Prisma.FieldRef<"ProviderIdentity", 'String'>;
    readonly linkedAt: Prisma.FieldRef<"ProviderIdentity", 'DateTime'>;
}
export type ProviderIdentityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderIdentitySelect<ExtArgs> | null;
    omit?: Prisma.ProviderIdentityOmit<ExtArgs> | null;
    include?: Prisma.ProviderIdentityInclude<ExtArgs> | null;
    where: Prisma.ProviderIdentityWhereUniqueInput;
};
export type ProviderIdentityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderIdentitySelect<ExtArgs> | null;
    omit?: Prisma.ProviderIdentityOmit<ExtArgs> | null;
    include?: Prisma.ProviderIdentityInclude<ExtArgs> | null;
    where: Prisma.ProviderIdentityWhereUniqueInput;
};
export type ProviderIdentityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderIdentitySelect<ExtArgs> | null;
    omit?: Prisma.ProviderIdentityOmit<ExtArgs> | null;
    include?: Prisma.ProviderIdentityInclude<ExtArgs> | null;
    where?: Prisma.ProviderIdentityWhereInput;
    orderBy?: Prisma.ProviderIdentityOrderByWithRelationInput | Prisma.ProviderIdentityOrderByWithRelationInput[];
    cursor?: Prisma.ProviderIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderIdentityScalarFieldEnum | Prisma.ProviderIdentityScalarFieldEnum[];
};
export type ProviderIdentityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderIdentitySelect<ExtArgs> | null;
    omit?: Prisma.ProviderIdentityOmit<ExtArgs> | null;
    include?: Prisma.ProviderIdentityInclude<ExtArgs> | null;
    where?: Prisma.ProviderIdentityWhereInput;
    orderBy?: Prisma.ProviderIdentityOrderByWithRelationInput | Prisma.ProviderIdentityOrderByWithRelationInput[];
    cursor?: Prisma.ProviderIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderIdentityScalarFieldEnum | Prisma.ProviderIdentityScalarFieldEnum[];
};
export type ProviderIdentityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderIdentitySelect<ExtArgs> | null;
    omit?: Prisma.ProviderIdentityOmit<ExtArgs> | null;
    include?: Prisma.ProviderIdentityInclude<ExtArgs> | null;
    where?: Prisma.ProviderIdentityWhereInput;
    orderBy?: Prisma.ProviderIdentityOrderByWithRelationInput | Prisma.ProviderIdentityOrderByWithRelationInput[];
    cursor?: Prisma.ProviderIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderIdentityScalarFieldEnum | Prisma.ProviderIdentityScalarFieldEnum[];
};
export type ProviderIdentityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderIdentitySelect<ExtArgs> | null;
    omit?: Prisma.ProviderIdentityOmit<ExtArgs> | null;
    include?: Prisma.ProviderIdentityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderIdentityCreateInput, Prisma.ProviderIdentityUncheckedCreateInput>;
};
export type ProviderIdentityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProviderIdentityCreateManyInput | Prisma.ProviderIdentityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProviderIdentityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderIdentitySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProviderIdentityOmit<ExtArgs> | null;
    data: Prisma.ProviderIdentityCreateManyInput | Prisma.ProviderIdentityCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProviderIdentityIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProviderIdentityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderIdentitySelect<ExtArgs> | null;
    omit?: Prisma.ProviderIdentityOmit<ExtArgs> | null;
    include?: Prisma.ProviderIdentityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderIdentityUpdateInput, Prisma.ProviderIdentityUncheckedUpdateInput>;
    where: Prisma.ProviderIdentityWhereUniqueInput;
};
export type ProviderIdentityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProviderIdentityUpdateManyMutationInput, Prisma.ProviderIdentityUncheckedUpdateManyInput>;
    where?: Prisma.ProviderIdentityWhereInput;
    limit?: number;
};
export type ProviderIdentityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderIdentitySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProviderIdentityOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderIdentityUpdateManyMutationInput, Prisma.ProviderIdentityUncheckedUpdateManyInput>;
    where?: Prisma.ProviderIdentityWhereInput;
    limit?: number;
    include?: Prisma.ProviderIdentityIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProviderIdentityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderIdentitySelect<ExtArgs> | null;
    omit?: Prisma.ProviderIdentityOmit<ExtArgs> | null;
    include?: Prisma.ProviderIdentityInclude<ExtArgs> | null;
    where: Prisma.ProviderIdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderIdentityCreateInput, Prisma.ProviderIdentityUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProviderIdentityUpdateInput, Prisma.ProviderIdentityUncheckedUpdateInput>;
};
export type ProviderIdentityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderIdentitySelect<ExtArgs> | null;
    omit?: Prisma.ProviderIdentityOmit<ExtArgs> | null;
    include?: Prisma.ProviderIdentityInclude<ExtArgs> | null;
    where: Prisma.ProviderIdentityWhereUniqueInput;
};
export type ProviderIdentityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderIdentityWhereInput;
    limit?: number;
};
export type ProviderIdentityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderIdentitySelect<ExtArgs> | null;
    omit?: Prisma.ProviderIdentityOmit<ExtArgs> | null;
    include?: Prisma.ProviderIdentityInclude<ExtArgs> | null;
};
