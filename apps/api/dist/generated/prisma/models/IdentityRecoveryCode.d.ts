import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentityRecoveryCodeModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentityRecoveryCodePayload>;
export type AggregateIdentityRecoveryCode = {
    _count: IdentityRecoveryCodeCountAggregateOutputType | null;
    _min: IdentityRecoveryCodeMinAggregateOutputType | null;
    _max: IdentityRecoveryCodeMaxAggregateOutputType | null;
};
export type IdentityRecoveryCodeMinAggregateOutputType = {
    userId: string | null;
    hash: string | null;
};
export type IdentityRecoveryCodeMaxAggregateOutputType = {
    userId: string | null;
    hash: string | null;
};
export type IdentityRecoveryCodeCountAggregateOutputType = {
    userId: number;
    hash: number;
    _all: number;
};
export type IdentityRecoveryCodeMinAggregateInputType = {
    userId?: true;
    hash?: true;
};
export type IdentityRecoveryCodeMaxAggregateInputType = {
    userId?: true;
    hash?: true;
};
export type IdentityRecoveryCodeCountAggregateInputType = {
    userId?: true;
    hash?: true;
    _all?: true;
};
export type IdentityRecoveryCodeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityRecoveryCodeWhereInput;
    orderBy?: Prisma.IdentityRecoveryCodeOrderByWithRelationInput | Prisma.IdentityRecoveryCodeOrderByWithRelationInput[];
    cursor?: Prisma.IdentityRecoveryCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentityRecoveryCodeCountAggregateInputType;
    _min?: IdentityRecoveryCodeMinAggregateInputType;
    _max?: IdentityRecoveryCodeMaxAggregateInputType;
};
export type GetIdentityRecoveryCodeAggregateType<T extends IdentityRecoveryCodeAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentityRecoveryCode]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentityRecoveryCode[P]> : Prisma.GetScalarType<T[P], AggregateIdentityRecoveryCode[P]>;
};
export type IdentityRecoveryCodeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityRecoveryCodeWhereInput;
    orderBy?: Prisma.IdentityRecoveryCodeOrderByWithAggregationInput | Prisma.IdentityRecoveryCodeOrderByWithAggregationInput[];
    by: Prisma.IdentityRecoveryCodeScalarFieldEnum[] | Prisma.IdentityRecoveryCodeScalarFieldEnum;
    having?: Prisma.IdentityRecoveryCodeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentityRecoveryCodeCountAggregateInputType | true;
    _min?: IdentityRecoveryCodeMinAggregateInputType;
    _max?: IdentityRecoveryCodeMaxAggregateInputType;
};
export type IdentityRecoveryCodeGroupByOutputType = {
    userId: string;
    hash: string;
    _count: IdentityRecoveryCodeCountAggregateOutputType | null;
    _min: IdentityRecoveryCodeMinAggregateOutputType | null;
    _max: IdentityRecoveryCodeMaxAggregateOutputType | null;
};
export type GetIdentityRecoveryCodeGroupByPayload<T extends IdentityRecoveryCodeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentityRecoveryCodeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentityRecoveryCodeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentityRecoveryCodeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentityRecoveryCodeGroupByOutputType[P]>;
}>>;
export type IdentityRecoveryCodeWhereInput = {
    AND?: Prisma.IdentityRecoveryCodeWhereInput | Prisma.IdentityRecoveryCodeWhereInput[];
    OR?: Prisma.IdentityRecoveryCodeWhereInput[];
    NOT?: Prisma.IdentityRecoveryCodeWhereInput | Prisma.IdentityRecoveryCodeWhereInput[];
    userId?: Prisma.UuidFilter<"IdentityRecoveryCode"> | string;
    hash?: Prisma.StringFilter<"IdentityRecoveryCode"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type IdentityRecoveryCodeOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type IdentityRecoveryCodeWhereUniqueInput = Prisma.AtLeast<{
    userId_hash?: Prisma.IdentityRecoveryCodeUserIdHashCompoundUniqueInput;
    AND?: Prisma.IdentityRecoveryCodeWhereInput | Prisma.IdentityRecoveryCodeWhereInput[];
    OR?: Prisma.IdentityRecoveryCodeWhereInput[];
    NOT?: Prisma.IdentityRecoveryCodeWhereInput | Prisma.IdentityRecoveryCodeWhereInput[];
    userId?: Prisma.UuidFilter<"IdentityRecoveryCode"> | string;
    hash?: Prisma.StringFilter<"IdentityRecoveryCode"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "userId_hash">;
export type IdentityRecoveryCodeOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    _count?: Prisma.IdentityRecoveryCodeCountOrderByAggregateInput;
    _max?: Prisma.IdentityRecoveryCodeMaxOrderByAggregateInput;
    _min?: Prisma.IdentityRecoveryCodeMinOrderByAggregateInput;
};
export type IdentityRecoveryCodeScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentityRecoveryCodeScalarWhereWithAggregatesInput | Prisma.IdentityRecoveryCodeScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentityRecoveryCodeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentityRecoveryCodeScalarWhereWithAggregatesInput | Prisma.IdentityRecoveryCodeScalarWhereWithAggregatesInput[];
    userId?: Prisma.UuidWithAggregatesFilter<"IdentityRecoveryCode"> | string;
    hash?: Prisma.StringWithAggregatesFilter<"IdentityRecoveryCode"> | string;
};
export type IdentityRecoveryCodeCreateInput = {
    hash: string;
    user: Prisma.UserCreateNestedOneWithoutRecoveryCodesInput;
};
export type IdentityRecoveryCodeUncheckedCreateInput = {
    userId: string;
    hash: string;
};
export type IdentityRecoveryCodeUpdateInput = {
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRecoveryCodesNestedInput;
};
export type IdentityRecoveryCodeUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type IdentityRecoveryCodeCreateManyInput = {
    userId: string;
    hash: string;
};
export type IdentityRecoveryCodeUpdateManyMutationInput = {
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type IdentityRecoveryCodeUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type IdentityRecoveryCodeListRelationFilter = {
    every?: Prisma.IdentityRecoveryCodeWhereInput;
    some?: Prisma.IdentityRecoveryCodeWhereInput;
    none?: Prisma.IdentityRecoveryCodeWhereInput;
};
export type IdentityRecoveryCodeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IdentityRecoveryCodeUserIdHashCompoundUniqueInput = {
    userId: string;
    hash: string;
};
export type IdentityRecoveryCodeCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
};
export type IdentityRecoveryCodeMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
};
export type IdentityRecoveryCodeMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
};
export type IdentityRecoveryCodeCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.IdentityRecoveryCodeCreateWithoutUserInput, Prisma.IdentityRecoveryCodeUncheckedCreateWithoutUserInput> | Prisma.IdentityRecoveryCodeCreateWithoutUserInput[] | Prisma.IdentityRecoveryCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityRecoveryCodeCreateOrConnectWithoutUserInput | Prisma.IdentityRecoveryCodeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.IdentityRecoveryCodeCreateManyUserInputEnvelope;
    connect?: Prisma.IdentityRecoveryCodeWhereUniqueInput | Prisma.IdentityRecoveryCodeWhereUniqueInput[];
};
export type IdentityRecoveryCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.IdentityRecoveryCodeCreateWithoutUserInput, Prisma.IdentityRecoveryCodeUncheckedCreateWithoutUserInput> | Prisma.IdentityRecoveryCodeCreateWithoutUserInput[] | Prisma.IdentityRecoveryCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityRecoveryCodeCreateOrConnectWithoutUserInput | Prisma.IdentityRecoveryCodeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.IdentityRecoveryCodeCreateManyUserInputEnvelope;
    connect?: Prisma.IdentityRecoveryCodeWhereUniqueInput | Prisma.IdentityRecoveryCodeWhereUniqueInput[];
};
export type IdentityRecoveryCodeUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityRecoveryCodeCreateWithoutUserInput, Prisma.IdentityRecoveryCodeUncheckedCreateWithoutUserInput> | Prisma.IdentityRecoveryCodeCreateWithoutUserInput[] | Prisma.IdentityRecoveryCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityRecoveryCodeCreateOrConnectWithoutUserInput | Prisma.IdentityRecoveryCodeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.IdentityRecoveryCodeUpsertWithWhereUniqueWithoutUserInput | Prisma.IdentityRecoveryCodeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.IdentityRecoveryCodeCreateManyUserInputEnvelope;
    set?: Prisma.IdentityRecoveryCodeWhereUniqueInput | Prisma.IdentityRecoveryCodeWhereUniqueInput[];
    disconnect?: Prisma.IdentityRecoveryCodeWhereUniqueInput | Prisma.IdentityRecoveryCodeWhereUniqueInput[];
    delete?: Prisma.IdentityRecoveryCodeWhereUniqueInput | Prisma.IdentityRecoveryCodeWhereUniqueInput[];
    connect?: Prisma.IdentityRecoveryCodeWhereUniqueInput | Prisma.IdentityRecoveryCodeWhereUniqueInput[];
    update?: Prisma.IdentityRecoveryCodeUpdateWithWhereUniqueWithoutUserInput | Prisma.IdentityRecoveryCodeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.IdentityRecoveryCodeUpdateManyWithWhereWithoutUserInput | Prisma.IdentityRecoveryCodeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.IdentityRecoveryCodeScalarWhereInput | Prisma.IdentityRecoveryCodeScalarWhereInput[];
};
export type IdentityRecoveryCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityRecoveryCodeCreateWithoutUserInput, Prisma.IdentityRecoveryCodeUncheckedCreateWithoutUserInput> | Prisma.IdentityRecoveryCodeCreateWithoutUserInput[] | Prisma.IdentityRecoveryCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityRecoveryCodeCreateOrConnectWithoutUserInput | Prisma.IdentityRecoveryCodeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.IdentityRecoveryCodeUpsertWithWhereUniqueWithoutUserInput | Prisma.IdentityRecoveryCodeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.IdentityRecoveryCodeCreateManyUserInputEnvelope;
    set?: Prisma.IdentityRecoveryCodeWhereUniqueInput | Prisma.IdentityRecoveryCodeWhereUniqueInput[];
    disconnect?: Prisma.IdentityRecoveryCodeWhereUniqueInput | Prisma.IdentityRecoveryCodeWhereUniqueInput[];
    delete?: Prisma.IdentityRecoveryCodeWhereUniqueInput | Prisma.IdentityRecoveryCodeWhereUniqueInput[];
    connect?: Prisma.IdentityRecoveryCodeWhereUniqueInput | Prisma.IdentityRecoveryCodeWhereUniqueInput[];
    update?: Prisma.IdentityRecoveryCodeUpdateWithWhereUniqueWithoutUserInput | Prisma.IdentityRecoveryCodeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.IdentityRecoveryCodeUpdateManyWithWhereWithoutUserInput | Prisma.IdentityRecoveryCodeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.IdentityRecoveryCodeScalarWhereInput | Prisma.IdentityRecoveryCodeScalarWhereInput[];
};
export type IdentityRecoveryCodeCreateWithoutUserInput = {
    hash: string;
};
export type IdentityRecoveryCodeUncheckedCreateWithoutUserInput = {
    hash: string;
};
export type IdentityRecoveryCodeCreateOrConnectWithoutUserInput = {
    where: Prisma.IdentityRecoveryCodeWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityRecoveryCodeCreateWithoutUserInput, Prisma.IdentityRecoveryCodeUncheckedCreateWithoutUserInput>;
};
export type IdentityRecoveryCodeCreateManyUserInputEnvelope = {
    data: Prisma.IdentityRecoveryCodeCreateManyUserInput | Prisma.IdentityRecoveryCodeCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type IdentityRecoveryCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.IdentityRecoveryCodeWhereUniqueInput;
    update: Prisma.XOR<Prisma.IdentityRecoveryCodeUpdateWithoutUserInput, Prisma.IdentityRecoveryCodeUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.IdentityRecoveryCodeCreateWithoutUserInput, Prisma.IdentityRecoveryCodeUncheckedCreateWithoutUserInput>;
};
export type IdentityRecoveryCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.IdentityRecoveryCodeWhereUniqueInput;
    data: Prisma.XOR<Prisma.IdentityRecoveryCodeUpdateWithoutUserInput, Prisma.IdentityRecoveryCodeUncheckedUpdateWithoutUserInput>;
};
export type IdentityRecoveryCodeUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.IdentityRecoveryCodeScalarWhereInput;
    data: Prisma.XOR<Prisma.IdentityRecoveryCodeUpdateManyMutationInput, Prisma.IdentityRecoveryCodeUncheckedUpdateManyWithoutUserInput>;
};
export type IdentityRecoveryCodeScalarWhereInput = {
    AND?: Prisma.IdentityRecoveryCodeScalarWhereInput | Prisma.IdentityRecoveryCodeScalarWhereInput[];
    OR?: Prisma.IdentityRecoveryCodeScalarWhereInput[];
    NOT?: Prisma.IdentityRecoveryCodeScalarWhereInput | Prisma.IdentityRecoveryCodeScalarWhereInput[];
    userId?: Prisma.UuidFilter<"IdentityRecoveryCode"> | string;
    hash?: Prisma.StringFilter<"IdentityRecoveryCode"> | string;
};
export type IdentityRecoveryCodeCreateManyUserInput = {
    hash: string;
};
export type IdentityRecoveryCodeUpdateWithoutUserInput = {
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type IdentityRecoveryCodeUncheckedUpdateWithoutUserInput = {
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type IdentityRecoveryCodeUncheckedUpdateManyWithoutUserInput = {
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type IdentityRecoveryCodeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    hash?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identityRecoveryCode"]>;
export type IdentityRecoveryCodeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    hash?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identityRecoveryCode"]>;
export type IdentityRecoveryCodeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    hash?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identityRecoveryCode"]>;
export type IdentityRecoveryCodeSelectScalar = {
    userId?: boolean;
    hash?: boolean;
};
export type IdentityRecoveryCodeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "hash", ExtArgs["result"]["identityRecoveryCode"]>;
export type IdentityRecoveryCodeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type IdentityRecoveryCodeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type IdentityRecoveryCodeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $IdentityRecoveryCodePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdentityRecoveryCode";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        hash: string;
    }, ExtArgs["result"]["identityRecoveryCode"]>;
    composites: {};
};
export type IdentityRecoveryCodeGetPayload<S extends boolean | null | undefined | IdentityRecoveryCodeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentityRecoveryCodePayload, S>;
export type IdentityRecoveryCodeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentityRecoveryCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentityRecoveryCodeCountAggregateInputType | true;
};
export interface IdentityRecoveryCodeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdentityRecoveryCode'];
        meta: {
            name: 'IdentityRecoveryCode';
        };
    };
    findUnique<T extends IdentityRecoveryCodeFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentityRecoveryCodeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentityRecoveryCodeClient<runtime.Types.Result.GetResult<Prisma.$IdentityRecoveryCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentityRecoveryCodeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentityRecoveryCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityRecoveryCodeClient<runtime.Types.Result.GetResult<Prisma.$IdentityRecoveryCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentityRecoveryCodeFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentityRecoveryCodeFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentityRecoveryCodeClient<runtime.Types.Result.GetResult<Prisma.$IdentityRecoveryCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentityRecoveryCodeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentityRecoveryCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityRecoveryCodeClient<runtime.Types.Result.GetResult<Prisma.$IdentityRecoveryCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentityRecoveryCodeFindManyArgs>(args?: Prisma.SelectSubset<T, IdentityRecoveryCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityRecoveryCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentityRecoveryCodeCreateArgs>(args: Prisma.SelectSubset<T, IdentityRecoveryCodeCreateArgs<ExtArgs>>): Prisma.Prisma__IdentityRecoveryCodeClient<runtime.Types.Result.GetResult<Prisma.$IdentityRecoveryCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentityRecoveryCodeCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentityRecoveryCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentityRecoveryCodeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentityRecoveryCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityRecoveryCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentityRecoveryCodeDeleteArgs>(args: Prisma.SelectSubset<T, IdentityRecoveryCodeDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentityRecoveryCodeClient<runtime.Types.Result.GetResult<Prisma.$IdentityRecoveryCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentityRecoveryCodeUpdateArgs>(args: Prisma.SelectSubset<T, IdentityRecoveryCodeUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentityRecoveryCodeClient<runtime.Types.Result.GetResult<Prisma.$IdentityRecoveryCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentityRecoveryCodeDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentityRecoveryCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentityRecoveryCodeUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentityRecoveryCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentityRecoveryCodeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentityRecoveryCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityRecoveryCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentityRecoveryCodeUpsertArgs>(args: Prisma.SelectSubset<T, IdentityRecoveryCodeUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentityRecoveryCodeClient<runtime.Types.Result.GetResult<Prisma.$IdentityRecoveryCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentityRecoveryCodeCountArgs>(args?: Prisma.Subset<T, IdentityRecoveryCodeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentityRecoveryCodeCountAggregateOutputType> : number>;
    aggregate<T extends IdentityRecoveryCodeAggregateArgs>(args: Prisma.Subset<T, IdentityRecoveryCodeAggregateArgs>): Prisma.PrismaPromise<GetIdentityRecoveryCodeAggregateType<T>>;
    groupBy<T extends IdentityRecoveryCodeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentityRecoveryCodeGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentityRecoveryCodeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentityRecoveryCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityRecoveryCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentityRecoveryCodeFieldRefs;
}
export interface Prisma__IdentityRecoveryCodeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentityRecoveryCodeFieldRefs {
    readonly userId: Prisma.FieldRef<"IdentityRecoveryCode", 'String'>;
    readonly hash: Prisma.FieldRef<"IdentityRecoveryCode", 'String'>;
}
export type IdentityRecoveryCodeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRecoveryCodeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRecoveryCodeOmit<ExtArgs> | null;
    include?: Prisma.IdentityRecoveryCodeInclude<ExtArgs> | null;
    where: Prisma.IdentityRecoveryCodeWhereUniqueInput;
};
export type IdentityRecoveryCodeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRecoveryCodeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRecoveryCodeOmit<ExtArgs> | null;
    include?: Prisma.IdentityRecoveryCodeInclude<ExtArgs> | null;
    where: Prisma.IdentityRecoveryCodeWhereUniqueInput;
};
export type IdentityRecoveryCodeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRecoveryCodeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRecoveryCodeOmit<ExtArgs> | null;
    include?: Prisma.IdentityRecoveryCodeInclude<ExtArgs> | null;
    where?: Prisma.IdentityRecoveryCodeWhereInput;
    orderBy?: Prisma.IdentityRecoveryCodeOrderByWithRelationInput | Prisma.IdentityRecoveryCodeOrderByWithRelationInput[];
    cursor?: Prisma.IdentityRecoveryCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityRecoveryCodeScalarFieldEnum | Prisma.IdentityRecoveryCodeScalarFieldEnum[];
};
export type IdentityRecoveryCodeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRecoveryCodeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRecoveryCodeOmit<ExtArgs> | null;
    include?: Prisma.IdentityRecoveryCodeInclude<ExtArgs> | null;
    where?: Prisma.IdentityRecoveryCodeWhereInput;
    orderBy?: Prisma.IdentityRecoveryCodeOrderByWithRelationInput | Prisma.IdentityRecoveryCodeOrderByWithRelationInput[];
    cursor?: Prisma.IdentityRecoveryCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityRecoveryCodeScalarFieldEnum | Prisma.IdentityRecoveryCodeScalarFieldEnum[];
};
export type IdentityRecoveryCodeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRecoveryCodeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRecoveryCodeOmit<ExtArgs> | null;
    include?: Prisma.IdentityRecoveryCodeInclude<ExtArgs> | null;
    where?: Prisma.IdentityRecoveryCodeWhereInput;
    orderBy?: Prisma.IdentityRecoveryCodeOrderByWithRelationInput | Prisma.IdentityRecoveryCodeOrderByWithRelationInput[];
    cursor?: Prisma.IdentityRecoveryCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityRecoveryCodeScalarFieldEnum | Prisma.IdentityRecoveryCodeScalarFieldEnum[];
};
export type IdentityRecoveryCodeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRecoveryCodeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRecoveryCodeOmit<ExtArgs> | null;
    include?: Prisma.IdentityRecoveryCodeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityRecoveryCodeCreateInput, Prisma.IdentityRecoveryCodeUncheckedCreateInput>;
};
export type IdentityRecoveryCodeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentityRecoveryCodeCreateManyInput | Prisma.IdentityRecoveryCodeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityRecoveryCodeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRecoveryCodeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityRecoveryCodeOmit<ExtArgs> | null;
    data: Prisma.IdentityRecoveryCodeCreateManyInput | Prisma.IdentityRecoveryCodeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.IdentityRecoveryCodeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type IdentityRecoveryCodeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRecoveryCodeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRecoveryCodeOmit<ExtArgs> | null;
    include?: Prisma.IdentityRecoveryCodeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityRecoveryCodeUpdateInput, Prisma.IdentityRecoveryCodeUncheckedUpdateInput>;
    where: Prisma.IdentityRecoveryCodeWhereUniqueInput;
};
export type IdentityRecoveryCodeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentityRecoveryCodeUpdateManyMutationInput, Prisma.IdentityRecoveryCodeUncheckedUpdateManyInput>;
    where?: Prisma.IdentityRecoveryCodeWhereInput;
    limit?: number;
};
export type IdentityRecoveryCodeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRecoveryCodeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityRecoveryCodeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityRecoveryCodeUpdateManyMutationInput, Prisma.IdentityRecoveryCodeUncheckedUpdateManyInput>;
    where?: Prisma.IdentityRecoveryCodeWhereInput;
    limit?: number;
    include?: Prisma.IdentityRecoveryCodeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type IdentityRecoveryCodeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRecoveryCodeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRecoveryCodeOmit<ExtArgs> | null;
    include?: Prisma.IdentityRecoveryCodeInclude<ExtArgs> | null;
    where: Prisma.IdentityRecoveryCodeWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityRecoveryCodeCreateInput, Prisma.IdentityRecoveryCodeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentityRecoveryCodeUpdateInput, Prisma.IdentityRecoveryCodeUncheckedUpdateInput>;
};
export type IdentityRecoveryCodeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRecoveryCodeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRecoveryCodeOmit<ExtArgs> | null;
    include?: Prisma.IdentityRecoveryCodeInclude<ExtArgs> | null;
    where: Prisma.IdentityRecoveryCodeWhereUniqueInput;
};
export type IdentityRecoveryCodeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityRecoveryCodeWhereInput;
    limit?: number;
};
export type IdentityRecoveryCodeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRecoveryCodeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRecoveryCodeOmit<ExtArgs> | null;
    include?: Prisma.IdentityRecoveryCodeInclude<ExtArgs> | null;
};
