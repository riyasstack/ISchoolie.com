import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentityTotpModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentityTotpPayload>;
export type AggregateIdentityTotp = {
    _count: IdentityTotpCountAggregateOutputType | null;
    _avg: IdentityTotpAvgAggregateOutputType | null;
    _sum: IdentityTotpSumAggregateOutputType | null;
    _min: IdentityTotpMinAggregateOutputType | null;
    _max: IdentityTotpMaxAggregateOutputType | null;
};
export type IdentityTotpAvgAggregateOutputType = {
    lastUsedStep: number | null;
};
export type IdentityTotpSumAggregateOutputType = {
    lastUsedStep: number | null;
};
export type IdentityTotpMinAggregateOutputType = {
    userId: string | null;
    secret: string | null;
    confirmed: boolean | null;
    pendingSecret: string | null;
    lastUsedStep: number | null;
};
export type IdentityTotpMaxAggregateOutputType = {
    userId: string | null;
    secret: string | null;
    confirmed: boolean | null;
    pendingSecret: string | null;
    lastUsedStep: number | null;
};
export type IdentityTotpCountAggregateOutputType = {
    userId: number;
    secret: number;
    confirmed: number;
    pendingSecret: number;
    lastUsedStep: number;
    _all: number;
};
export type IdentityTotpAvgAggregateInputType = {
    lastUsedStep?: true;
};
export type IdentityTotpSumAggregateInputType = {
    lastUsedStep?: true;
};
export type IdentityTotpMinAggregateInputType = {
    userId?: true;
    secret?: true;
    confirmed?: true;
    pendingSecret?: true;
    lastUsedStep?: true;
};
export type IdentityTotpMaxAggregateInputType = {
    userId?: true;
    secret?: true;
    confirmed?: true;
    pendingSecret?: true;
    lastUsedStep?: true;
};
export type IdentityTotpCountAggregateInputType = {
    userId?: true;
    secret?: true;
    confirmed?: true;
    pendingSecret?: true;
    lastUsedStep?: true;
    _all?: true;
};
export type IdentityTotpAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityTotpWhereInput;
    orderBy?: Prisma.IdentityTotpOrderByWithRelationInput | Prisma.IdentityTotpOrderByWithRelationInput[];
    cursor?: Prisma.IdentityTotpWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentityTotpCountAggregateInputType;
    _avg?: IdentityTotpAvgAggregateInputType;
    _sum?: IdentityTotpSumAggregateInputType;
    _min?: IdentityTotpMinAggregateInputType;
    _max?: IdentityTotpMaxAggregateInputType;
};
export type GetIdentityTotpAggregateType<T extends IdentityTotpAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentityTotp]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentityTotp[P]> : Prisma.GetScalarType<T[P], AggregateIdentityTotp[P]>;
};
export type IdentityTotpGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityTotpWhereInput;
    orderBy?: Prisma.IdentityTotpOrderByWithAggregationInput | Prisma.IdentityTotpOrderByWithAggregationInput[];
    by: Prisma.IdentityTotpScalarFieldEnum[] | Prisma.IdentityTotpScalarFieldEnum;
    having?: Prisma.IdentityTotpScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentityTotpCountAggregateInputType | true;
    _avg?: IdentityTotpAvgAggregateInputType;
    _sum?: IdentityTotpSumAggregateInputType;
    _min?: IdentityTotpMinAggregateInputType;
    _max?: IdentityTotpMaxAggregateInputType;
};
export type IdentityTotpGroupByOutputType = {
    userId: string;
    secret: string;
    confirmed: boolean;
    pendingSecret: string | null;
    lastUsedStep: number;
    _count: IdentityTotpCountAggregateOutputType | null;
    _avg: IdentityTotpAvgAggregateOutputType | null;
    _sum: IdentityTotpSumAggregateOutputType | null;
    _min: IdentityTotpMinAggregateOutputType | null;
    _max: IdentityTotpMaxAggregateOutputType | null;
};
export type GetIdentityTotpGroupByPayload<T extends IdentityTotpGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentityTotpGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentityTotpGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentityTotpGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentityTotpGroupByOutputType[P]>;
}>>;
export type IdentityTotpWhereInput = {
    AND?: Prisma.IdentityTotpWhereInput | Prisma.IdentityTotpWhereInput[];
    OR?: Prisma.IdentityTotpWhereInput[];
    NOT?: Prisma.IdentityTotpWhereInput | Prisma.IdentityTotpWhereInput[];
    userId?: Prisma.UuidFilter<"IdentityTotp"> | string;
    secret?: Prisma.StringFilter<"IdentityTotp"> | string;
    confirmed?: Prisma.BoolFilter<"IdentityTotp"> | boolean;
    pendingSecret?: Prisma.StringNullableFilter<"IdentityTotp"> | string | null;
    lastUsedStep?: Prisma.IntFilter<"IdentityTotp"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type IdentityTotpOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    secret?: Prisma.SortOrder;
    confirmed?: Prisma.SortOrder;
    pendingSecret?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastUsedStep?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type IdentityTotpWhereUniqueInput = Prisma.AtLeast<{
    userId?: string;
    AND?: Prisma.IdentityTotpWhereInput | Prisma.IdentityTotpWhereInput[];
    OR?: Prisma.IdentityTotpWhereInput[];
    NOT?: Prisma.IdentityTotpWhereInput | Prisma.IdentityTotpWhereInput[];
    secret?: Prisma.StringFilter<"IdentityTotp"> | string;
    confirmed?: Prisma.BoolFilter<"IdentityTotp"> | boolean;
    pendingSecret?: Prisma.StringNullableFilter<"IdentityTotp"> | string | null;
    lastUsedStep?: Prisma.IntFilter<"IdentityTotp"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "userId">;
export type IdentityTotpOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    secret?: Prisma.SortOrder;
    confirmed?: Prisma.SortOrder;
    pendingSecret?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastUsedStep?: Prisma.SortOrder;
    _count?: Prisma.IdentityTotpCountOrderByAggregateInput;
    _avg?: Prisma.IdentityTotpAvgOrderByAggregateInput;
    _max?: Prisma.IdentityTotpMaxOrderByAggregateInput;
    _min?: Prisma.IdentityTotpMinOrderByAggregateInput;
    _sum?: Prisma.IdentityTotpSumOrderByAggregateInput;
};
export type IdentityTotpScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentityTotpScalarWhereWithAggregatesInput | Prisma.IdentityTotpScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentityTotpScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentityTotpScalarWhereWithAggregatesInput | Prisma.IdentityTotpScalarWhereWithAggregatesInput[];
    userId?: Prisma.UuidWithAggregatesFilter<"IdentityTotp"> | string;
    secret?: Prisma.StringWithAggregatesFilter<"IdentityTotp"> | string;
    confirmed?: Prisma.BoolWithAggregatesFilter<"IdentityTotp"> | boolean;
    pendingSecret?: Prisma.StringNullableWithAggregatesFilter<"IdentityTotp"> | string | null;
    lastUsedStep?: Prisma.IntWithAggregatesFilter<"IdentityTotp"> | number;
};
export type IdentityTotpCreateInput = {
    secret: string;
    confirmed: boolean;
    pendingSecret?: string | null;
    lastUsedStep?: number;
    user: Prisma.UserCreateNestedOneWithoutTotpInput;
};
export type IdentityTotpUncheckedCreateInput = {
    userId: string;
    secret: string;
    confirmed: boolean;
    pendingSecret?: string | null;
    lastUsedStep?: number;
};
export type IdentityTotpUpdateInput = {
    secret?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pendingSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastUsedStep?: Prisma.IntFieldUpdateOperationsInput | number;
    user?: Prisma.UserUpdateOneRequiredWithoutTotpNestedInput;
};
export type IdentityTotpUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    secret?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pendingSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastUsedStep?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type IdentityTotpCreateManyInput = {
    userId: string;
    secret: string;
    confirmed: boolean;
    pendingSecret?: string | null;
    lastUsedStep?: number;
};
export type IdentityTotpUpdateManyMutationInput = {
    secret?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pendingSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastUsedStep?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type IdentityTotpUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    secret?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pendingSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastUsedStep?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type IdentityTotpNullableScalarRelationFilter = {
    is?: Prisma.IdentityTotpWhereInput | null;
    isNot?: Prisma.IdentityTotpWhereInput | null;
};
export type IdentityTotpCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    secret?: Prisma.SortOrder;
    confirmed?: Prisma.SortOrder;
    pendingSecret?: Prisma.SortOrder;
    lastUsedStep?: Prisma.SortOrder;
};
export type IdentityTotpAvgOrderByAggregateInput = {
    lastUsedStep?: Prisma.SortOrder;
};
export type IdentityTotpMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    secret?: Prisma.SortOrder;
    confirmed?: Prisma.SortOrder;
    pendingSecret?: Prisma.SortOrder;
    lastUsedStep?: Prisma.SortOrder;
};
export type IdentityTotpMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    secret?: Prisma.SortOrder;
    confirmed?: Prisma.SortOrder;
    pendingSecret?: Prisma.SortOrder;
    lastUsedStep?: Prisma.SortOrder;
};
export type IdentityTotpSumOrderByAggregateInput = {
    lastUsedStep?: Prisma.SortOrder;
};
export type IdentityTotpCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.IdentityTotpCreateWithoutUserInput, Prisma.IdentityTotpUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.IdentityTotpCreateOrConnectWithoutUserInput;
    connect?: Prisma.IdentityTotpWhereUniqueInput;
};
export type IdentityTotpUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.IdentityTotpCreateWithoutUserInput, Prisma.IdentityTotpUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.IdentityTotpCreateOrConnectWithoutUserInput;
    connect?: Prisma.IdentityTotpWhereUniqueInput;
};
export type IdentityTotpUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityTotpCreateWithoutUserInput, Prisma.IdentityTotpUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.IdentityTotpCreateOrConnectWithoutUserInput;
    upsert?: Prisma.IdentityTotpUpsertWithoutUserInput;
    disconnect?: Prisma.IdentityTotpWhereInput | boolean;
    delete?: Prisma.IdentityTotpWhereInput | boolean;
    connect?: Prisma.IdentityTotpWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.IdentityTotpUpdateToOneWithWhereWithoutUserInput, Prisma.IdentityTotpUpdateWithoutUserInput>, Prisma.IdentityTotpUncheckedUpdateWithoutUserInput>;
};
export type IdentityTotpUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityTotpCreateWithoutUserInput, Prisma.IdentityTotpUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.IdentityTotpCreateOrConnectWithoutUserInput;
    upsert?: Prisma.IdentityTotpUpsertWithoutUserInput;
    disconnect?: Prisma.IdentityTotpWhereInput | boolean;
    delete?: Prisma.IdentityTotpWhereInput | boolean;
    connect?: Prisma.IdentityTotpWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.IdentityTotpUpdateToOneWithWhereWithoutUserInput, Prisma.IdentityTotpUpdateWithoutUserInput>, Prisma.IdentityTotpUncheckedUpdateWithoutUserInput>;
};
export type IdentityTotpCreateWithoutUserInput = {
    secret: string;
    confirmed: boolean;
    pendingSecret?: string | null;
    lastUsedStep?: number;
};
export type IdentityTotpUncheckedCreateWithoutUserInput = {
    secret: string;
    confirmed: boolean;
    pendingSecret?: string | null;
    lastUsedStep?: number;
};
export type IdentityTotpCreateOrConnectWithoutUserInput = {
    where: Prisma.IdentityTotpWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityTotpCreateWithoutUserInput, Prisma.IdentityTotpUncheckedCreateWithoutUserInput>;
};
export type IdentityTotpUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.IdentityTotpUpdateWithoutUserInput, Prisma.IdentityTotpUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.IdentityTotpCreateWithoutUserInput, Prisma.IdentityTotpUncheckedCreateWithoutUserInput>;
    where?: Prisma.IdentityTotpWhereInput;
};
export type IdentityTotpUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.IdentityTotpWhereInput;
    data: Prisma.XOR<Prisma.IdentityTotpUpdateWithoutUserInput, Prisma.IdentityTotpUncheckedUpdateWithoutUserInput>;
};
export type IdentityTotpUpdateWithoutUserInput = {
    secret?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pendingSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastUsedStep?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type IdentityTotpUncheckedUpdateWithoutUserInput = {
    secret?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pendingSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastUsedStep?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type IdentityTotpSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    secret?: boolean;
    confirmed?: boolean;
    pendingSecret?: boolean;
    lastUsedStep?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identityTotp"]>;
export type IdentityTotpSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    secret?: boolean;
    confirmed?: boolean;
    pendingSecret?: boolean;
    lastUsedStep?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identityTotp"]>;
export type IdentityTotpSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    secret?: boolean;
    confirmed?: boolean;
    pendingSecret?: boolean;
    lastUsedStep?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identityTotp"]>;
export type IdentityTotpSelectScalar = {
    userId?: boolean;
    secret?: boolean;
    confirmed?: boolean;
    pendingSecret?: boolean;
    lastUsedStep?: boolean;
};
export type IdentityTotpOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "secret" | "confirmed" | "pendingSecret" | "lastUsedStep", ExtArgs["result"]["identityTotp"]>;
export type IdentityTotpInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type IdentityTotpIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type IdentityTotpIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $IdentityTotpPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdentityTotp";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        secret: string;
        confirmed: boolean;
        pendingSecret: string | null;
        lastUsedStep: number;
    }, ExtArgs["result"]["identityTotp"]>;
    composites: {};
};
export type IdentityTotpGetPayload<S extends boolean | null | undefined | IdentityTotpDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentityTotpPayload, S>;
export type IdentityTotpCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentityTotpFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentityTotpCountAggregateInputType | true;
};
export interface IdentityTotpDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdentityTotp'];
        meta: {
            name: 'IdentityTotp';
        };
    };
    findUnique<T extends IdentityTotpFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentityTotpFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentityTotpClient<runtime.Types.Result.GetResult<Prisma.$IdentityTotpPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentityTotpFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentityTotpFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityTotpClient<runtime.Types.Result.GetResult<Prisma.$IdentityTotpPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentityTotpFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentityTotpFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentityTotpClient<runtime.Types.Result.GetResult<Prisma.$IdentityTotpPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentityTotpFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentityTotpFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityTotpClient<runtime.Types.Result.GetResult<Prisma.$IdentityTotpPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentityTotpFindManyArgs>(args?: Prisma.SelectSubset<T, IdentityTotpFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityTotpPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentityTotpCreateArgs>(args: Prisma.SelectSubset<T, IdentityTotpCreateArgs<ExtArgs>>): Prisma.Prisma__IdentityTotpClient<runtime.Types.Result.GetResult<Prisma.$IdentityTotpPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentityTotpCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentityTotpCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentityTotpCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentityTotpCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityTotpPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentityTotpDeleteArgs>(args: Prisma.SelectSubset<T, IdentityTotpDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentityTotpClient<runtime.Types.Result.GetResult<Prisma.$IdentityTotpPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentityTotpUpdateArgs>(args: Prisma.SelectSubset<T, IdentityTotpUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentityTotpClient<runtime.Types.Result.GetResult<Prisma.$IdentityTotpPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentityTotpDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentityTotpDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentityTotpUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentityTotpUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentityTotpUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentityTotpUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityTotpPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentityTotpUpsertArgs>(args: Prisma.SelectSubset<T, IdentityTotpUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentityTotpClient<runtime.Types.Result.GetResult<Prisma.$IdentityTotpPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentityTotpCountArgs>(args?: Prisma.Subset<T, IdentityTotpCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentityTotpCountAggregateOutputType> : number>;
    aggregate<T extends IdentityTotpAggregateArgs>(args: Prisma.Subset<T, IdentityTotpAggregateArgs>): Prisma.PrismaPromise<GetIdentityTotpAggregateType<T>>;
    groupBy<T extends IdentityTotpGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentityTotpGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentityTotpGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentityTotpGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityTotpGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentityTotpFieldRefs;
}
export interface Prisma__IdentityTotpClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentityTotpFieldRefs {
    readonly userId: Prisma.FieldRef<"IdentityTotp", 'String'>;
    readonly secret: Prisma.FieldRef<"IdentityTotp", 'String'>;
    readonly confirmed: Prisma.FieldRef<"IdentityTotp", 'Boolean'>;
    readonly pendingSecret: Prisma.FieldRef<"IdentityTotp", 'String'>;
    readonly lastUsedStep: Prisma.FieldRef<"IdentityTotp", 'Int'>;
}
export type IdentityTotpFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityTotpSelect<ExtArgs> | null;
    omit?: Prisma.IdentityTotpOmit<ExtArgs> | null;
    include?: Prisma.IdentityTotpInclude<ExtArgs> | null;
    where: Prisma.IdentityTotpWhereUniqueInput;
};
export type IdentityTotpFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityTotpSelect<ExtArgs> | null;
    omit?: Prisma.IdentityTotpOmit<ExtArgs> | null;
    include?: Prisma.IdentityTotpInclude<ExtArgs> | null;
    where: Prisma.IdentityTotpWhereUniqueInput;
};
export type IdentityTotpFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityTotpSelect<ExtArgs> | null;
    omit?: Prisma.IdentityTotpOmit<ExtArgs> | null;
    include?: Prisma.IdentityTotpInclude<ExtArgs> | null;
    where?: Prisma.IdentityTotpWhereInput;
    orderBy?: Prisma.IdentityTotpOrderByWithRelationInput | Prisma.IdentityTotpOrderByWithRelationInput[];
    cursor?: Prisma.IdentityTotpWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityTotpScalarFieldEnum | Prisma.IdentityTotpScalarFieldEnum[];
};
export type IdentityTotpFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityTotpSelect<ExtArgs> | null;
    omit?: Prisma.IdentityTotpOmit<ExtArgs> | null;
    include?: Prisma.IdentityTotpInclude<ExtArgs> | null;
    where?: Prisma.IdentityTotpWhereInput;
    orderBy?: Prisma.IdentityTotpOrderByWithRelationInput | Prisma.IdentityTotpOrderByWithRelationInput[];
    cursor?: Prisma.IdentityTotpWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityTotpScalarFieldEnum | Prisma.IdentityTotpScalarFieldEnum[];
};
export type IdentityTotpFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityTotpSelect<ExtArgs> | null;
    omit?: Prisma.IdentityTotpOmit<ExtArgs> | null;
    include?: Prisma.IdentityTotpInclude<ExtArgs> | null;
    where?: Prisma.IdentityTotpWhereInput;
    orderBy?: Prisma.IdentityTotpOrderByWithRelationInput | Prisma.IdentityTotpOrderByWithRelationInput[];
    cursor?: Prisma.IdentityTotpWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityTotpScalarFieldEnum | Prisma.IdentityTotpScalarFieldEnum[];
};
export type IdentityTotpCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityTotpSelect<ExtArgs> | null;
    omit?: Prisma.IdentityTotpOmit<ExtArgs> | null;
    include?: Prisma.IdentityTotpInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityTotpCreateInput, Prisma.IdentityTotpUncheckedCreateInput>;
};
export type IdentityTotpCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentityTotpCreateManyInput | Prisma.IdentityTotpCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityTotpCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityTotpSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityTotpOmit<ExtArgs> | null;
    data: Prisma.IdentityTotpCreateManyInput | Prisma.IdentityTotpCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.IdentityTotpIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type IdentityTotpUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityTotpSelect<ExtArgs> | null;
    omit?: Prisma.IdentityTotpOmit<ExtArgs> | null;
    include?: Prisma.IdentityTotpInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityTotpUpdateInput, Prisma.IdentityTotpUncheckedUpdateInput>;
    where: Prisma.IdentityTotpWhereUniqueInput;
};
export type IdentityTotpUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentityTotpUpdateManyMutationInput, Prisma.IdentityTotpUncheckedUpdateManyInput>;
    where?: Prisma.IdentityTotpWhereInput;
    limit?: number;
};
export type IdentityTotpUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityTotpSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityTotpOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityTotpUpdateManyMutationInput, Prisma.IdentityTotpUncheckedUpdateManyInput>;
    where?: Prisma.IdentityTotpWhereInput;
    limit?: number;
    include?: Prisma.IdentityTotpIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type IdentityTotpUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityTotpSelect<ExtArgs> | null;
    omit?: Prisma.IdentityTotpOmit<ExtArgs> | null;
    include?: Prisma.IdentityTotpInclude<ExtArgs> | null;
    where: Prisma.IdentityTotpWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityTotpCreateInput, Prisma.IdentityTotpUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentityTotpUpdateInput, Prisma.IdentityTotpUncheckedUpdateInput>;
};
export type IdentityTotpDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityTotpSelect<ExtArgs> | null;
    omit?: Prisma.IdentityTotpOmit<ExtArgs> | null;
    include?: Prisma.IdentityTotpInclude<ExtArgs> | null;
    where: Prisma.IdentityTotpWhereUniqueInput;
};
export type IdentityTotpDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityTotpWhereInput;
    limit?: number;
};
export type IdentityTotpDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityTotpSelect<ExtArgs> | null;
    omit?: Prisma.IdentityTotpOmit<ExtArgs> | null;
    include?: Prisma.IdentityTotpInclude<ExtArgs> | null;
};
