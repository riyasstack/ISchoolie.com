import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PlatformOperatorModel = runtime.Types.Result.DefaultSelection<Prisma.$PlatformOperatorPayload>;
export type AggregatePlatformOperator = {
    _count: PlatformOperatorCountAggregateOutputType | null;
    _min: PlatformOperatorMinAggregateOutputType | null;
    _max: PlatformOperatorMaxAggregateOutputType | null;
};
export type PlatformOperatorMinAggregateOutputType = {
    userId: string | null;
    active: boolean | null;
};
export type PlatformOperatorMaxAggregateOutputType = {
    userId: string | null;
    active: boolean | null;
};
export type PlatformOperatorCountAggregateOutputType = {
    userId: number;
    active: number;
    _all: number;
};
export type PlatformOperatorMinAggregateInputType = {
    userId?: true;
    active?: true;
};
export type PlatformOperatorMaxAggregateInputType = {
    userId?: true;
    active?: true;
};
export type PlatformOperatorCountAggregateInputType = {
    userId?: true;
    active?: true;
    _all?: true;
};
export type PlatformOperatorAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlatformOperatorWhereInput;
    orderBy?: Prisma.PlatformOperatorOrderByWithRelationInput | Prisma.PlatformOperatorOrderByWithRelationInput[];
    cursor?: Prisma.PlatformOperatorWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PlatformOperatorCountAggregateInputType;
    _min?: PlatformOperatorMinAggregateInputType;
    _max?: PlatformOperatorMaxAggregateInputType;
};
export type GetPlatformOperatorAggregateType<T extends PlatformOperatorAggregateArgs> = {
    [P in keyof T & keyof AggregatePlatformOperator]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePlatformOperator[P]> : Prisma.GetScalarType<T[P], AggregatePlatformOperator[P]>;
};
export type PlatformOperatorGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlatformOperatorWhereInput;
    orderBy?: Prisma.PlatformOperatorOrderByWithAggregationInput | Prisma.PlatformOperatorOrderByWithAggregationInput[];
    by: Prisma.PlatformOperatorScalarFieldEnum[] | Prisma.PlatformOperatorScalarFieldEnum;
    having?: Prisma.PlatformOperatorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PlatformOperatorCountAggregateInputType | true;
    _min?: PlatformOperatorMinAggregateInputType;
    _max?: PlatformOperatorMaxAggregateInputType;
};
export type PlatformOperatorGroupByOutputType = {
    userId: string;
    active: boolean;
    _count: PlatformOperatorCountAggregateOutputType | null;
    _min: PlatformOperatorMinAggregateOutputType | null;
    _max: PlatformOperatorMaxAggregateOutputType | null;
};
export type GetPlatformOperatorGroupByPayload<T extends PlatformOperatorGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PlatformOperatorGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PlatformOperatorGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PlatformOperatorGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PlatformOperatorGroupByOutputType[P]>;
}>>;
export type PlatformOperatorWhereInput = {
    AND?: Prisma.PlatformOperatorWhereInput | Prisma.PlatformOperatorWhereInput[];
    OR?: Prisma.PlatformOperatorWhereInput[];
    NOT?: Prisma.PlatformOperatorWhereInput | Prisma.PlatformOperatorWhereInput[];
    userId?: Prisma.UuidFilter<"PlatformOperator"> | string;
    active?: Prisma.BoolFilter<"PlatformOperator"> | boolean;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PlatformOperatorOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type PlatformOperatorWhereUniqueInput = Prisma.AtLeast<{
    userId?: string;
    AND?: Prisma.PlatformOperatorWhereInput | Prisma.PlatformOperatorWhereInput[];
    OR?: Prisma.PlatformOperatorWhereInput[];
    NOT?: Prisma.PlatformOperatorWhereInput | Prisma.PlatformOperatorWhereInput[];
    active?: Prisma.BoolFilter<"PlatformOperator"> | boolean;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "userId">;
export type PlatformOperatorOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    _count?: Prisma.PlatformOperatorCountOrderByAggregateInput;
    _max?: Prisma.PlatformOperatorMaxOrderByAggregateInput;
    _min?: Prisma.PlatformOperatorMinOrderByAggregateInput;
};
export type PlatformOperatorScalarWhereWithAggregatesInput = {
    AND?: Prisma.PlatformOperatorScalarWhereWithAggregatesInput | Prisma.PlatformOperatorScalarWhereWithAggregatesInput[];
    OR?: Prisma.PlatformOperatorScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PlatformOperatorScalarWhereWithAggregatesInput | Prisma.PlatformOperatorScalarWhereWithAggregatesInput[];
    userId?: Prisma.UuidWithAggregatesFilter<"PlatformOperator"> | string;
    active?: Prisma.BoolWithAggregatesFilter<"PlatformOperator"> | boolean;
};
export type PlatformOperatorCreateInput = {
    active?: boolean;
    user: Prisma.UserCreateNestedOneWithoutOperatorInput;
};
export type PlatformOperatorUncheckedCreateInput = {
    userId: string;
    active?: boolean;
};
export type PlatformOperatorUpdateInput = {
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    user?: Prisma.UserUpdateOneRequiredWithoutOperatorNestedInput;
};
export type PlatformOperatorUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type PlatformOperatorCreateManyInput = {
    userId: string;
    active?: boolean;
};
export type PlatformOperatorUpdateManyMutationInput = {
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type PlatformOperatorUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type PlatformOperatorNullableScalarRelationFilter = {
    is?: Prisma.PlatformOperatorWhereInput | null;
    isNot?: Prisma.PlatformOperatorWhereInput | null;
};
export type PlatformOperatorCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
};
export type PlatformOperatorMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
};
export type PlatformOperatorMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
};
export type PlatformOperatorCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PlatformOperatorCreateWithoutUserInput, Prisma.PlatformOperatorUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PlatformOperatorCreateOrConnectWithoutUserInput;
    connect?: Prisma.PlatformOperatorWhereUniqueInput;
};
export type PlatformOperatorUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PlatformOperatorCreateWithoutUserInput, Prisma.PlatformOperatorUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PlatformOperatorCreateOrConnectWithoutUserInput;
    connect?: Prisma.PlatformOperatorWhereUniqueInput;
};
export type PlatformOperatorUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PlatformOperatorCreateWithoutUserInput, Prisma.PlatformOperatorUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PlatformOperatorCreateOrConnectWithoutUserInput;
    upsert?: Prisma.PlatformOperatorUpsertWithoutUserInput;
    disconnect?: Prisma.PlatformOperatorWhereInput | boolean;
    delete?: Prisma.PlatformOperatorWhereInput | boolean;
    connect?: Prisma.PlatformOperatorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PlatformOperatorUpdateToOneWithWhereWithoutUserInput, Prisma.PlatformOperatorUpdateWithoutUserInput>, Prisma.PlatformOperatorUncheckedUpdateWithoutUserInput>;
};
export type PlatformOperatorUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PlatformOperatorCreateWithoutUserInput, Prisma.PlatformOperatorUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PlatformOperatorCreateOrConnectWithoutUserInput;
    upsert?: Prisma.PlatformOperatorUpsertWithoutUserInput;
    disconnect?: Prisma.PlatformOperatorWhereInput | boolean;
    delete?: Prisma.PlatformOperatorWhereInput | boolean;
    connect?: Prisma.PlatformOperatorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PlatformOperatorUpdateToOneWithWhereWithoutUserInput, Prisma.PlatformOperatorUpdateWithoutUserInput>, Prisma.PlatformOperatorUncheckedUpdateWithoutUserInput>;
};
export type PlatformOperatorCreateWithoutUserInput = {
    active?: boolean;
};
export type PlatformOperatorUncheckedCreateWithoutUserInput = {
    active?: boolean;
};
export type PlatformOperatorCreateOrConnectWithoutUserInput = {
    where: Prisma.PlatformOperatorWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlatformOperatorCreateWithoutUserInput, Prisma.PlatformOperatorUncheckedCreateWithoutUserInput>;
};
export type PlatformOperatorUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.PlatformOperatorUpdateWithoutUserInput, Prisma.PlatformOperatorUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PlatformOperatorCreateWithoutUserInput, Prisma.PlatformOperatorUncheckedCreateWithoutUserInput>;
    where?: Prisma.PlatformOperatorWhereInput;
};
export type PlatformOperatorUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.PlatformOperatorWhereInput;
    data: Prisma.XOR<Prisma.PlatformOperatorUpdateWithoutUserInput, Prisma.PlatformOperatorUncheckedUpdateWithoutUserInput>;
};
export type PlatformOperatorUpdateWithoutUserInput = {
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type PlatformOperatorUncheckedUpdateWithoutUserInput = {
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type PlatformOperatorSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    active?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["platformOperator"]>;
export type PlatformOperatorSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    active?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["platformOperator"]>;
export type PlatformOperatorSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    active?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["platformOperator"]>;
export type PlatformOperatorSelectScalar = {
    userId?: boolean;
    active?: boolean;
};
export type PlatformOperatorOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "active", ExtArgs["result"]["platformOperator"]>;
export type PlatformOperatorInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PlatformOperatorIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PlatformOperatorIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PlatformOperatorPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PlatformOperator";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        active: boolean;
    }, ExtArgs["result"]["platformOperator"]>;
    composites: {};
};
export type PlatformOperatorGetPayload<S extends boolean | null | undefined | PlatformOperatorDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PlatformOperatorPayload, S>;
export type PlatformOperatorCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PlatformOperatorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PlatformOperatorCountAggregateInputType | true;
};
export interface PlatformOperatorDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PlatformOperator'];
        meta: {
            name: 'PlatformOperator';
        };
    };
    findUnique<T extends PlatformOperatorFindUniqueArgs>(args: Prisma.SelectSubset<T, PlatformOperatorFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PlatformOperatorClient<runtime.Types.Result.GetResult<Prisma.$PlatformOperatorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PlatformOperatorFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PlatformOperatorFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlatformOperatorClient<runtime.Types.Result.GetResult<Prisma.$PlatformOperatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PlatformOperatorFindFirstArgs>(args?: Prisma.SelectSubset<T, PlatformOperatorFindFirstArgs<ExtArgs>>): Prisma.Prisma__PlatformOperatorClient<runtime.Types.Result.GetResult<Prisma.$PlatformOperatorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PlatformOperatorFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PlatformOperatorFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlatformOperatorClient<runtime.Types.Result.GetResult<Prisma.$PlatformOperatorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PlatformOperatorFindManyArgs>(args?: Prisma.SelectSubset<T, PlatformOperatorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlatformOperatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PlatformOperatorCreateArgs>(args: Prisma.SelectSubset<T, PlatformOperatorCreateArgs<ExtArgs>>): Prisma.Prisma__PlatformOperatorClient<runtime.Types.Result.GetResult<Prisma.$PlatformOperatorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PlatformOperatorCreateManyArgs>(args?: Prisma.SelectSubset<T, PlatformOperatorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PlatformOperatorCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PlatformOperatorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlatformOperatorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PlatformOperatorDeleteArgs>(args: Prisma.SelectSubset<T, PlatformOperatorDeleteArgs<ExtArgs>>): Prisma.Prisma__PlatformOperatorClient<runtime.Types.Result.GetResult<Prisma.$PlatformOperatorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PlatformOperatorUpdateArgs>(args: Prisma.SelectSubset<T, PlatformOperatorUpdateArgs<ExtArgs>>): Prisma.Prisma__PlatformOperatorClient<runtime.Types.Result.GetResult<Prisma.$PlatformOperatorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PlatformOperatorDeleteManyArgs>(args?: Prisma.SelectSubset<T, PlatformOperatorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PlatformOperatorUpdateManyArgs>(args: Prisma.SelectSubset<T, PlatformOperatorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PlatformOperatorUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PlatformOperatorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlatformOperatorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PlatformOperatorUpsertArgs>(args: Prisma.SelectSubset<T, PlatformOperatorUpsertArgs<ExtArgs>>): Prisma.Prisma__PlatformOperatorClient<runtime.Types.Result.GetResult<Prisma.$PlatformOperatorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PlatformOperatorCountArgs>(args?: Prisma.Subset<T, PlatformOperatorCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PlatformOperatorCountAggregateOutputType> : number>;
    aggregate<T extends PlatformOperatorAggregateArgs>(args: Prisma.Subset<T, PlatformOperatorAggregateArgs>): Prisma.PrismaPromise<GetPlatformOperatorAggregateType<T>>;
    groupBy<T extends PlatformOperatorGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PlatformOperatorGroupByArgs['orderBy'];
    } : {
        orderBy?: PlatformOperatorGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PlatformOperatorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformOperatorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PlatformOperatorFieldRefs;
}
export interface Prisma__PlatformOperatorClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PlatformOperatorFieldRefs {
    readonly userId: Prisma.FieldRef<"PlatformOperator", 'String'>;
    readonly active: Prisma.FieldRef<"PlatformOperator", 'Boolean'>;
}
export type PlatformOperatorFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformOperatorSelect<ExtArgs> | null;
    omit?: Prisma.PlatformOperatorOmit<ExtArgs> | null;
    include?: Prisma.PlatformOperatorInclude<ExtArgs> | null;
    where: Prisma.PlatformOperatorWhereUniqueInput;
};
export type PlatformOperatorFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformOperatorSelect<ExtArgs> | null;
    omit?: Prisma.PlatformOperatorOmit<ExtArgs> | null;
    include?: Prisma.PlatformOperatorInclude<ExtArgs> | null;
    where: Prisma.PlatformOperatorWhereUniqueInput;
};
export type PlatformOperatorFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformOperatorSelect<ExtArgs> | null;
    omit?: Prisma.PlatformOperatorOmit<ExtArgs> | null;
    include?: Prisma.PlatformOperatorInclude<ExtArgs> | null;
    where?: Prisma.PlatformOperatorWhereInput;
    orderBy?: Prisma.PlatformOperatorOrderByWithRelationInput | Prisma.PlatformOperatorOrderByWithRelationInput[];
    cursor?: Prisma.PlatformOperatorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlatformOperatorScalarFieldEnum | Prisma.PlatformOperatorScalarFieldEnum[];
};
export type PlatformOperatorFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformOperatorSelect<ExtArgs> | null;
    omit?: Prisma.PlatformOperatorOmit<ExtArgs> | null;
    include?: Prisma.PlatformOperatorInclude<ExtArgs> | null;
    where?: Prisma.PlatformOperatorWhereInput;
    orderBy?: Prisma.PlatformOperatorOrderByWithRelationInput | Prisma.PlatformOperatorOrderByWithRelationInput[];
    cursor?: Prisma.PlatformOperatorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlatformOperatorScalarFieldEnum | Prisma.PlatformOperatorScalarFieldEnum[];
};
export type PlatformOperatorFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformOperatorSelect<ExtArgs> | null;
    omit?: Prisma.PlatformOperatorOmit<ExtArgs> | null;
    include?: Prisma.PlatformOperatorInclude<ExtArgs> | null;
    where?: Prisma.PlatformOperatorWhereInput;
    orderBy?: Prisma.PlatformOperatorOrderByWithRelationInput | Prisma.PlatformOperatorOrderByWithRelationInput[];
    cursor?: Prisma.PlatformOperatorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlatformOperatorScalarFieldEnum | Prisma.PlatformOperatorScalarFieldEnum[];
};
export type PlatformOperatorCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformOperatorSelect<ExtArgs> | null;
    omit?: Prisma.PlatformOperatorOmit<ExtArgs> | null;
    include?: Prisma.PlatformOperatorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlatformOperatorCreateInput, Prisma.PlatformOperatorUncheckedCreateInput>;
};
export type PlatformOperatorCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PlatformOperatorCreateManyInput | Prisma.PlatformOperatorCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PlatformOperatorCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformOperatorSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PlatformOperatorOmit<ExtArgs> | null;
    data: Prisma.PlatformOperatorCreateManyInput | Prisma.PlatformOperatorCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PlatformOperatorIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PlatformOperatorUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformOperatorSelect<ExtArgs> | null;
    omit?: Prisma.PlatformOperatorOmit<ExtArgs> | null;
    include?: Prisma.PlatformOperatorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlatformOperatorUpdateInput, Prisma.PlatformOperatorUncheckedUpdateInput>;
    where: Prisma.PlatformOperatorWhereUniqueInput;
};
export type PlatformOperatorUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PlatformOperatorUpdateManyMutationInput, Prisma.PlatformOperatorUncheckedUpdateManyInput>;
    where?: Prisma.PlatformOperatorWhereInput;
    limit?: number;
};
export type PlatformOperatorUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformOperatorSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PlatformOperatorOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlatformOperatorUpdateManyMutationInput, Prisma.PlatformOperatorUncheckedUpdateManyInput>;
    where?: Prisma.PlatformOperatorWhereInput;
    limit?: number;
    include?: Prisma.PlatformOperatorIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PlatformOperatorUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformOperatorSelect<ExtArgs> | null;
    omit?: Prisma.PlatformOperatorOmit<ExtArgs> | null;
    include?: Prisma.PlatformOperatorInclude<ExtArgs> | null;
    where: Prisma.PlatformOperatorWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlatformOperatorCreateInput, Prisma.PlatformOperatorUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PlatformOperatorUpdateInput, Prisma.PlatformOperatorUncheckedUpdateInput>;
};
export type PlatformOperatorDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformOperatorSelect<ExtArgs> | null;
    omit?: Prisma.PlatformOperatorOmit<ExtArgs> | null;
    include?: Prisma.PlatformOperatorInclude<ExtArgs> | null;
    where: Prisma.PlatformOperatorWhereUniqueInput;
};
export type PlatformOperatorDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlatformOperatorWhereInput;
    limit?: number;
};
export type PlatformOperatorDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformOperatorSelect<ExtArgs> | null;
    omit?: Prisma.PlatformOperatorOmit<ExtArgs> | null;
    include?: Prisma.PlatformOperatorInclude<ExtArgs> | null;
};
