import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentityMfaFailureModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentityMfaFailurePayload>;
export type AggregateIdentityMfaFailure = {
    _count: IdentityMfaFailureCountAggregateOutputType | null;
    _avg: IdentityMfaFailureAvgAggregateOutputType | null;
    _sum: IdentityMfaFailureSumAggregateOutputType | null;
    _min: IdentityMfaFailureMinAggregateOutputType | null;
    _max: IdentityMfaFailureMaxAggregateOutputType | null;
};
export type IdentityMfaFailureAvgAggregateOutputType = {
    at: number | null;
};
export type IdentityMfaFailureSumAggregateOutputType = {
    at: bigint | null;
};
export type IdentityMfaFailureMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    at: bigint | null;
};
export type IdentityMfaFailureMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    at: bigint | null;
};
export type IdentityMfaFailureCountAggregateOutputType = {
    id: number;
    userId: number;
    at: number;
    _all: number;
};
export type IdentityMfaFailureAvgAggregateInputType = {
    at?: true;
};
export type IdentityMfaFailureSumAggregateInputType = {
    at?: true;
};
export type IdentityMfaFailureMinAggregateInputType = {
    id?: true;
    userId?: true;
    at?: true;
};
export type IdentityMfaFailureMaxAggregateInputType = {
    id?: true;
    userId?: true;
    at?: true;
};
export type IdentityMfaFailureCountAggregateInputType = {
    id?: true;
    userId?: true;
    at?: true;
    _all?: true;
};
export type IdentityMfaFailureAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityMfaFailureWhereInput;
    orderBy?: Prisma.IdentityMfaFailureOrderByWithRelationInput | Prisma.IdentityMfaFailureOrderByWithRelationInput[];
    cursor?: Prisma.IdentityMfaFailureWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentityMfaFailureCountAggregateInputType;
    _avg?: IdentityMfaFailureAvgAggregateInputType;
    _sum?: IdentityMfaFailureSumAggregateInputType;
    _min?: IdentityMfaFailureMinAggregateInputType;
    _max?: IdentityMfaFailureMaxAggregateInputType;
};
export type GetIdentityMfaFailureAggregateType<T extends IdentityMfaFailureAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentityMfaFailure]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentityMfaFailure[P]> : Prisma.GetScalarType<T[P], AggregateIdentityMfaFailure[P]>;
};
export type IdentityMfaFailureGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityMfaFailureWhereInput;
    orderBy?: Prisma.IdentityMfaFailureOrderByWithAggregationInput | Prisma.IdentityMfaFailureOrderByWithAggregationInput[];
    by: Prisma.IdentityMfaFailureScalarFieldEnum[] | Prisma.IdentityMfaFailureScalarFieldEnum;
    having?: Prisma.IdentityMfaFailureScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentityMfaFailureCountAggregateInputType | true;
    _avg?: IdentityMfaFailureAvgAggregateInputType;
    _sum?: IdentityMfaFailureSumAggregateInputType;
    _min?: IdentityMfaFailureMinAggregateInputType;
    _max?: IdentityMfaFailureMaxAggregateInputType;
};
export type IdentityMfaFailureGroupByOutputType = {
    id: string;
    userId: string;
    at: bigint;
    _count: IdentityMfaFailureCountAggregateOutputType | null;
    _avg: IdentityMfaFailureAvgAggregateOutputType | null;
    _sum: IdentityMfaFailureSumAggregateOutputType | null;
    _min: IdentityMfaFailureMinAggregateOutputType | null;
    _max: IdentityMfaFailureMaxAggregateOutputType | null;
};
export type GetIdentityMfaFailureGroupByPayload<T extends IdentityMfaFailureGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentityMfaFailureGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentityMfaFailureGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentityMfaFailureGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentityMfaFailureGroupByOutputType[P]>;
}>>;
export type IdentityMfaFailureWhereInput = {
    AND?: Prisma.IdentityMfaFailureWhereInput | Prisma.IdentityMfaFailureWhereInput[];
    OR?: Prisma.IdentityMfaFailureWhereInput[];
    NOT?: Prisma.IdentityMfaFailureWhereInput | Prisma.IdentityMfaFailureWhereInput[];
    id?: Prisma.UuidFilter<"IdentityMfaFailure"> | string;
    userId?: Prisma.UuidFilter<"IdentityMfaFailure"> | string;
    at?: Prisma.BigIntFilter<"IdentityMfaFailure"> | bigint | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type IdentityMfaFailureOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type IdentityMfaFailureWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.IdentityMfaFailureWhereInput | Prisma.IdentityMfaFailureWhereInput[];
    OR?: Prisma.IdentityMfaFailureWhereInput[];
    NOT?: Prisma.IdentityMfaFailureWhereInput | Prisma.IdentityMfaFailureWhereInput[];
    userId?: Prisma.UuidFilter<"IdentityMfaFailure"> | string;
    at?: Prisma.BigIntFilter<"IdentityMfaFailure"> | bigint | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type IdentityMfaFailureOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
    _count?: Prisma.IdentityMfaFailureCountOrderByAggregateInput;
    _avg?: Prisma.IdentityMfaFailureAvgOrderByAggregateInput;
    _max?: Prisma.IdentityMfaFailureMaxOrderByAggregateInput;
    _min?: Prisma.IdentityMfaFailureMinOrderByAggregateInput;
    _sum?: Prisma.IdentityMfaFailureSumOrderByAggregateInput;
};
export type IdentityMfaFailureScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentityMfaFailureScalarWhereWithAggregatesInput | Prisma.IdentityMfaFailureScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentityMfaFailureScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentityMfaFailureScalarWhereWithAggregatesInput | Prisma.IdentityMfaFailureScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"IdentityMfaFailure"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"IdentityMfaFailure"> | string;
    at?: Prisma.BigIntWithAggregatesFilter<"IdentityMfaFailure"> | bigint | number;
};
export type IdentityMfaFailureCreateInput = {
    id?: string;
    at: bigint | number;
    user: Prisma.UserCreateNestedOneWithoutMfaFailuresInput;
};
export type IdentityMfaFailureUncheckedCreateInput = {
    id?: string;
    userId: string;
    at: bigint | number;
};
export type IdentityMfaFailureUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user?: Prisma.UserUpdateOneRequiredWithoutMfaFailuresNestedInput;
};
export type IdentityMfaFailureUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type IdentityMfaFailureCreateManyInput = {
    id?: string;
    userId: string;
    at: bigint | number;
};
export type IdentityMfaFailureUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type IdentityMfaFailureUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type IdentityMfaFailureListRelationFilter = {
    every?: Prisma.IdentityMfaFailureWhereInput;
    some?: Prisma.IdentityMfaFailureWhereInput;
    none?: Prisma.IdentityMfaFailureWhereInput;
};
export type IdentityMfaFailureOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IdentityMfaFailureCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
};
export type IdentityMfaFailureAvgOrderByAggregateInput = {
    at?: Prisma.SortOrder;
};
export type IdentityMfaFailureMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
};
export type IdentityMfaFailureMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    at?: Prisma.SortOrder;
};
export type IdentityMfaFailureSumOrderByAggregateInput = {
    at?: Prisma.SortOrder;
};
export type IdentityMfaFailureCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.IdentityMfaFailureCreateWithoutUserInput, Prisma.IdentityMfaFailureUncheckedCreateWithoutUserInput> | Prisma.IdentityMfaFailureCreateWithoutUserInput[] | Prisma.IdentityMfaFailureUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityMfaFailureCreateOrConnectWithoutUserInput | Prisma.IdentityMfaFailureCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.IdentityMfaFailureCreateManyUserInputEnvelope;
    connect?: Prisma.IdentityMfaFailureWhereUniqueInput | Prisma.IdentityMfaFailureWhereUniqueInput[];
};
export type IdentityMfaFailureUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.IdentityMfaFailureCreateWithoutUserInput, Prisma.IdentityMfaFailureUncheckedCreateWithoutUserInput> | Prisma.IdentityMfaFailureCreateWithoutUserInput[] | Prisma.IdentityMfaFailureUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityMfaFailureCreateOrConnectWithoutUserInput | Prisma.IdentityMfaFailureCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.IdentityMfaFailureCreateManyUserInputEnvelope;
    connect?: Prisma.IdentityMfaFailureWhereUniqueInput | Prisma.IdentityMfaFailureWhereUniqueInput[];
};
export type IdentityMfaFailureUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityMfaFailureCreateWithoutUserInput, Prisma.IdentityMfaFailureUncheckedCreateWithoutUserInput> | Prisma.IdentityMfaFailureCreateWithoutUserInput[] | Prisma.IdentityMfaFailureUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityMfaFailureCreateOrConnectWithoutUserInput | Prisma.IdentityMfaFailureCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.IdentityMfaFailureUpsertWithWhereUniqueWithoutUserInput | Prisma.IdentityMfaFailureUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.IdentityMfaFailureCreateManyUserInputEnvelope;
    set?: Prisma.IdentityMfaFailureWhereUniqueInput | Prisma.IdentityMfaFailureWhereUniqueInput[];
    disconnect?: Prisma.IdentityMfaFailureWhereUniqueInput | Prisma.IdentityMfaFailureWhereUniqueInput[];
    delete?: Prisma.IdentityMfaFailureWhereUniqueInput | Prisma.IdentityMfaFailureWhereUniqueInput[];
    connect?: Prisma.IdentityMfaFailureWhereUniqueInput | Prisma.IdentityMfaFailureWhereUniqueInput[];
    update?: Prisma.IdentityMfaFailureUpdateWithWhereUniqueWithoutUserInput | Prisma.IdentityMfaFailureUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.IdentityMfaFailureUpdateManyWithWhereWithoutUserInput | Prisma.IdentityMfaFailureUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.IdentityMfaFailureScalarWhereInput | Prisma.IdentityMfaFailureScalarWhereInput[];
};
export type IdentityMfaFailureUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityMfaFailureCreateWithoutUserInput, Prisma.IdentityMfaFailureUncheckedCreateWithoutUserInput> | Prisma.IdentityMfaFailureCreateWithoutUserInput[] | Prisma.IdentityMfaFailureUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityMfaFailureCreateOrConnectWithoutUserInput | Prisma.IdentityMfaFailureCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.IdentityMfaFailureUpsertWithWhereUniqueWithoutUserInput | Prisma.IdentityMfaFailureUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.IdentityMfaFailureCreateManyUserInputEnvelope;
    set?: Prisma.IdentityMfaFailureWhereUniqueInput | Prisma.IdentityMfaFailureWhereUniqueInput[];
    disconnect?: Prisma.IdentityMfaFailureWhereUniqueInput | Prisma.IdentityMfaFailureWhereUniqueInput[];
    delete?: Prisma.IdentityMfaFailureWhereUniqueInput | Prisma.IdentityMfaFailureWhereUniqueInput[];
    connect?: Prisma.IdentityMfaFailureWhereUniqueInput | Prisma.IdentityMfaFailureWhereUniqueInput[];
    update?: Prisma.IdentityMfaFailureUpdateWithWhereUniqueWithoutUserInput | Prisma.IdentityMfaFailureUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.IdentityMfaFailureUpdateManyWithWhereWithoutUserInput | Prisma.IdentityMfaFailureUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.IdentityMfaFailureScalarWhereInput | Prisma.IdentityMfaFailureScalarWhereInput[];
};
export type IdentityMfaFailureCreateWithoutUserInput = {
    id?: string;
    at: bigint | number;
};
export type IdentityMfaFailureUncheckedCreateWithoutUserInput = {
    id?: string;
    at: bigint | number;
};
export type IdentityMfaFailureCreateOrConnectWithoutUserInput = {
    where: Prisma.IdentityMfaFailureWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityMfaFailureCreateWithoutUserInput, Prisma.IdentityMfaFailureUncheckedCreateWithoutUserInput>;
};
export type IdentityMfaFailureCreateManyUserInputEnvelope = {
    data: Prisma.IdentityMfaFailureCreateManyUserInput | Prisma.IdentityMfaFailureCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type IdentityMfaFailureUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.IdentityMfaFailureWhereUniqueInput;
    update: Prisma.XOR<Prisma.IdentityMfaFailureUpdateWithoutUserInput, Prisma.IdentityMfaFailureUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.IdentityMfaFailureCreateWithoutUserInput, Prisma.IdentityMfaFailureUncheckedCreateWithoutUserInput>;
};
export type IdentityMfaFailureUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.IdentityMfaFailureWhereUniqueInput;
    data: Prisma.XOR<Prisma.IdentityMfaFailureUpdateWithoutUserInput, Prisma.IdentityMfaFailureUncheckedUpdateWithoutUserInput>;
};
export type IdentityMfaFailureUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.IdentityMfaFailureScalarWhereInput;
    data: Prisma.XOR<Prisma.IdentityMfaFailureUpdateManyMutationInput, Prisma.IdentityMfaFailureUncheckedUpdateManyWithoutUserInput>;
};
export type IdentityMfaFailureScalarWhereInput = {
    AND?: Prisma.IdentityMfaFailureScalarWhereInput | Prisma.IdentityMfaFailureScalarWhereInput[];
    OR?: Prisma.IdentityMfaFailureScalarWhereInput[];
    NOT?: Prisma.IdentityMfaFailureScalarWhereInput | Prisma.IdentityMfaFailureScalarWhereInput[];
    id?: Prisma.UuidFilter<"IdentityMfaFailure"> | string;
    userId?: Prisma.UuidFilter<"IdentityMfaFailure"> | string;
    at?: Prisma.BigIntFilter<"IdentityMfaFailure"> | bigint | number;
};
export type IdentityMfaFailureCreateManyUserInput = {
    id?: string;
    at: bigint | number;
};
export type IdentityMfaFailureUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type IdentityMfaFailureUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type IdentityMfaFailureUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    at?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type IdentityMfaFailureSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    at?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identityMfaFailure"]>;
export type IdentityMfaFailureSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    at?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identityMfaFailure"]>;
export type IdentityMfaFailureSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    at?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identityMfaFailure"]>;
export type IdentityMfaFailureSelectScalar = {
    id?: boolean;
    userId?: boolean;
    at?: boolean;
};
export type IdentityMfaFailureOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "at", ExtArgs["result"]["identityMfaFailure"]>;
export type IdentityMfaFailureInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type IdentityMfaFailureIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type IdentityMfaFailureIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $IdentityMfaFailurePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdentityMfaFailure";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        at: bigint;
    }, ExtArgs["result"]["identityMfaFailure"]>;
    composites: {};
};
export type IdentityMfaFailureGetPayload<S extends boolean | null | undefined | IdentityMfaFailureDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentityMfaFailurePayload, S>;
export type IdentityMfaFailureCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentityMfaFailureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentityMfaFailureCountAggregateInputType | true;
};
export interface IdentityMfaFailureDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdentityMfaFailure'];
        meta: {
            name: 'IdentityMfaFailure';
        };
    };
    findUnique<T extends IdentityMfaFailureFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentityMfaFailureFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentityMfaFailureClient<runtime.Types.Result.GetResult<Prisma.$IdentityMfaFailurePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentityMfaFailureFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentityMfaFailureFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityMfaFailureClient<runtime.Types.Result.GetResult<Prisma.$IdentityMfaFailurePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentityMfaFailureFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentityMfaFailureFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentityMfaFailureClient<runtime.Types.Result.GetResult<Prisma.$IdentityMfaFailurePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentityMfaFailureFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentityMfaFailureFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityMfaFailureClient<runtime.Types.Result.GetResult<Prisma.$IdentityMfaFailurePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentityMfaFailureFindManyArgs>(args?: Prisma.SelectSubset<T, IdentityMfaFailureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityMfaFailurePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentityMfaFailureCreateArgs>(args: Prisma.SelectSubset<T, IdentityMfaFailureCreateArgs<ExtArgs>>): Prisma.Prisma__IdentityMfaFailureClient<runtime.Types.Result.GetResult<Prisma.$IdentityMfaFailurePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentityMfaFailureCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentityMfaFailureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentityMfaFailureCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentityMfaFailureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityMfaFailurePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentityMfaFailureDeleteArgs>(args: Prisma.SelectSubset<T, IdentityMfaFailureDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentityMfaFailureClient<runtime.Types.Result.GetResult<Prisma.$IdentityMfaFailurePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentityMfaFailureUpdateArgs>(args: Prisma.SelectSubset<T, IdentityMfaFailureUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentityMfaFailureClient<runtime.Types.Result.GetResult<Prisma.$IdentityMfaFailurePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentityMfaFailureDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentityMfaFailureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentityMfaFailureUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentityMfaFailureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentityMfaFailureUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentityMfaFailureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityMfaFailurePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentityMfaFailureUpsertArgs>(args: Prisma.SelectSubset<T, IdentityMfaFailureUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentityMfaFailureClient<runtime.Types.Result.GetResult<Prisma.$IdentityMfaFailurePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentityMfaFailureCountArgs>(args?: Prisma.Subset<T, IdentityMfaFailureCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentityMfaFailureCountAggregateOutputType> : number>;
    aggregate<T extends IdentityMfaFailureAggregateArgs>(args: Prisma.Subset<T, IdentityMfaFailureAggregateArgs>): Prisma.PrismaPromise<GetIdentityMfaFailureAggregateType<T>>;
    groupBy<T extends IdentityMfaFailureGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentityMfaFailureGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentityMfaFailureGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentityMfaFailureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityMfaFailureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentityMfaFailureFieldRefs;
}
export interface Prisma__IdentityMfaFailureClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentityMfaFailureFieldRefs {
    readonly id: Prisma.FieldRef<"IdentityMfaFailure", 'String'>;
    readonly userId: Prisma.FieldRef<"IdentityMfaFailure", 'String'>;
    readonly at: Prisma.FieldRef<"IdentityMfaFailure", 'BigInt'>;
}
export type IdentityMfaFailureFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityMfaFailureSelect<ExtArgs> | null;
    omit?: Prisma.IdentityMfaFailureOmit<ExtArgs> | null;
    include?: Prisma.IdentityMfaFailureInclude<ExtArgs> | null;
    where: Prisma.IdentityMfaFailureWhereUniqueInput;
};
export type IdentityMfaFailureFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityMfaFailureSelect<ExtArgs> | null;
    omit?: Prisma.IdentityMfaFailureOmit<ExtArgs> | null;
    include?: Prisma.IdentityMfaFailureInclude<ExtArgs> | null;
    where: Prisma.IdentityMfaFailureWhereUniqueInput;
};
export type IdentityMfaFailureFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityMfaFailureSelect<ExtArgs> | null;
    omit?: Prisma.IdentityMfaFailureOmit<ExtArgs> | null;
    include?: Prisma.IdentityMfaFailureInclude<ExtArgs> | null;
    where?: Prisma.IdentityMfaFailureWhereInput;
    orderBy?: Prisma.IdentityMfaFailureOrderByWithRelationInput | Prisma.IdentityMfaFailureOrderByWithRelationInput[];
    cursor?: Prisma.IdentityMfaFailureWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityMfaFailureScalarFieldEnum | Prisma.IdentityMfaFailureScalarFieldEnum[];
};
export type IdentityMfaFailureFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityMfaFailureSelect<ExtArgs> | null;
    omit?: Prisma.IdentityMfaFailureOmit<ExtArgs> | null;
    include?: Prisma.IdentityMfaFailureInclude<ExtArgs> | null;
    where?: Prisma.IdentityMfaFailureWhereInput;
    orderBy?: Prisma.IdentityMfaFailureOrderByWithRelationInput | Prisma.IdentityMfaFailureOrderByWithRelationInput[];
    cursor?: Prisma.IdentityMfaFailureWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityMfaFailureScalarFieldEnum | Prisma.IdentityMfaFailureScalarFieldEnum[];
};
export type IdentityMfaFailureFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityMfaFailureSelect<ExtArgs> | null;
    omit?: Prisma.IdentityMfaFailureOmit<ExtArgs> | null;
    include?: Prisma.IdentityMfaFailureInclude<ExtArgs> | null;
    where?: Prisma.IdentityMfaFailureWhereInput;
    orderBy?: Prisma.IdentityMfaFailureOrderByWithRelationInput | Prisma.IdentityMfaFailureOrderByWithRelationInput[];
    cursor?: Prisma.IdentityMfaFailureWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityMfaFailureScalarFieldEnum | Prisma.IdentityMfaFailureScalarFieldEnum[];
};
export type IdentityMfaFailureCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityMfaFailureSelect<ExtArgs> | null;
    omit?: Prisma.IdentityMfaFailureOmit<ExtArgs> | null;
    include?: Prisma.IdentityMfaFailureInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityMfaFailureCreateInput, Prisma.IdentityMfaFailureUncheckedCreateInput>;
};
export type IdentityMfaFailureCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentityMfaFailureCreateManyInput | Prisma.IdentityMfaFailureCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityMfaFailureCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityMfaFailureSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityMfaFailureOmit<ExtArgs> | null;
    data: Prisma.IdentityMfaFailureCreateManyInput | Prisma.IdentityMfaFailureCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.IdentityMfaFailureIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type IdentityMfaFailureUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityMfaFailureSelect<ExtArgs> | null;
    omit?: Prisma.IdentityMfaFailureOmit<ExtArgs> | null;
    include?: Prisma.IdentityMfaFailureInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityMfaFailureUpdateInput, Prisma.IdentityMfaFailureUncheckedUpdateInput>;
    where: Prisma.IdentityMfaFailureWhereUniqueInput;
};
export type IdentityMfaFailureUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentityMfaFailureUpdateManyMutationInput, Prisma.IdentityMfaFailureUncheckedUpdateManyInput>;
    where?: Prisma.IdentityMfaFailureWhereInput;
    limit?: number;
};
export type IdentityMfaFailureUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityMfaFailureSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityMfaFailureOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityMfaFailureUpdateManyMutationInput, Prisma.IdentityMfaFailureUncheckedUpdateManyInput>;
    where?: Prisma.IdentityMfaFailureWhereInput;
    limit?: number;
    include?: Prisma.IdentityMfaFailureIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type IdentityMfaFailureUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityMfaFailureSelect<ExtArgs> | null;
    omit?: Prisma.IdentityMfaFailureOmit<ExtArgs> | null;
    include?: Prisma.IdentityMfaFailureInclude<ExtArgs> | null;
    where: Prisma.IdentityMfaFailureWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityMfaFailureCreateInput, Prisma.IdentityMfaFailureUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentityMfaFailureUpdateInput, Prisma.IdentityMfaFailureUncheckedUpdateInput>;
};
export type IdentityMfaFailureDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityMfaFailureSelect<ExtArgs> | null;
    omit?: Prisma.IdentityMfaFailureOmit<ExtArgs> | null;
    include?: Prisma.IdentityMfaFailureInclude<ExtArgs> | null;
    where: Prisma.IdentityMfaFailureWhereUniqueInput;
};
export type IdentityMfaFailureDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityMfaFailureWhereInput;
    limit?: number;
};
export type IdentityMfaFailureDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityMfaFailureSelect<ExtArgs> | null;
    omit?: Prisma.IdentityMfaFailureOmit<ExtArgs> | null;
    include?: Prisma.IdentityMfaFailureInclude<ExtArgs> | null;
};
