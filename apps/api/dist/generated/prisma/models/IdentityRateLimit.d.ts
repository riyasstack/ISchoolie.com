import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentityRateLimitModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentityRateLimitPayload>;
export type AggregateIdentityRateLimit = {
    _count: IdentityRateLimitCountAggregateOutputType | null;
    _avg: IdentityRateLimitAvgAggregateOutputType | null;
    _sum: IdentityRateLimitSumAggregateOutputType | null;
    _min: IdentityRateLimitMinAggregateOutputType | null;
    _max: IdentityRateLimitMaxAggregateOutputType | null;
};
export type IdentityRateLimitAvgAggregateOutputType = {
    count: number | null;
};
export type IdentityRateLimitSumAggregateOutputType = {
    count: number | null;
};
export type IdentityRateLimitMinAggregateOutputType = {
    key: string | null;
    count: number | null;
    expiresAt: Date | null;
};
export type IdentityRateLimitMaxAggregateOutputType = {
    key: string | null;
    count: number | null;
    expiresAt: Date | null;
};
export type IdentityRateLimitCountAggregateOutputType = {
    key: number;
    count: number;
    expiresAt: number;
    _all: number;
};
export type IdentityRateLimitAvgAggregateInputType = {
    count?: true;
};
export type IdentityRateLimitSumAggregateInputType = {
    count?: true;
};
export type IdentityRateLimitMinAggregateInputType = {
    key?: true;
    count?: true;
    expiresAt?: true;
};
export type IdentityRateLimitMaxAggregateInputType = {
    key?: true;
    count?: true;
    expiresAt?: true;
};
export type IdentityRateLimitCountAggregateInputType = {
    key?: true;
    count?: true;
    expiresAt?: true;
    _all?: true;
};
export type IdentityRateLimitAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityRateLimitWhereInput;
    orderBy?: Prisma.IdentityRateLimitOrderByWithRelationInput | Prisma.IdentityRateLimitOrderByWithRelationInput[];
    cursor?: Prisma.IdentityRateLimitWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentityRateLimitCountAggregateInputType;
    _avg?: IdentityRateLimitAvgAggregateInputType;
    _sum?: IdentityRateLimitSumAggregateInputType;
    _min?: IdentityRateLimitMinAggregateInputType;
    _max?: IdentityRateLimitMaxAggregateInputType;
};
export type GetIdentityRateLimitAggregateType<T extends IdentityRateLimitAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentityRateLimit]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentityRateLimit[P]> : Prisma.GetScalarType<T[P], AggregateIdentityRateLimit[P]>;
};
export type IdentityRateLimitGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityRateLimitWhereInput;
    orderBy?: Prisma.IdentityRateLimitOrderByWithAggregationInput | Prisma.IdentityRateLimitOrderByWithAggregationInput[];
    by: Prisma.IdentityRateLimitScalarFieldEnum[] | Prisma.IdentityRateLimitScalarFieldEnum;
    having?: Prisma.IdentityRateLimitScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentityRateLimitCountAggregateInputType | true;
    _avg?: IdentityRateLimitAvgAggregateInputType;
    _sum?: IdentityRateLimitSumAggregateInputType;
    _min?: IdentityRateLimitMinAggregateInputType;
    _max?: IdentityRateLimitMaxAggregateInputType;
};
export type IdentityRateLimitGroupByOutputType = {
    key: string;
    count: number;
    expiresAt: Date;
    _count: IdentityRateLimitCountAggregateOutputType | null;
    _avg: IdentityRateLimitAvgAggregateOutputType | null;
    _sum: IdentityRateLimitSumAggregateOutputType | null;
    _min: IdentityRateLimitMinAggregateOutputType | null;
    _max: IdentityRateLimitMaxAggregateOutputType | null;
};
export type GetIdentityRateLimitGroupByPayload<T extends IdentityRateLimitGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentityRateLimitGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentityRateLimitGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentityRateLimitGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentityRateLimitGroupByOutputType[P]>;
}>>;
export type IdentityRateLimitWhereInput = {
    AND?: Prisma.IdentityRateLimitWhereInput | Prisma.IdentityRateLimitWhereInput[];
    OR?: Prisma.IdentityRateLimitWhereInput[];
    NOT?: Prisma.IdentityRateLimitWhereInput | Prisma.IdentityRateLimitWhereInput[];
    key?: Prisma.StringFilter<"IdentityRateLimit"> | string;
    count?: Prisma.IntFilter<"IdentityRateLimit"> | number;
    expiresAt?: Prisma.DateTimeFilter<"IdentityRateLimit"> | Date | string;
};
export type IdentityRateLimitOrderByWithRelationInput = {
    key?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type IdentityRateLimitWhereUniqueInput = Prisma.AtLeast<{
    key?: string;
    AND?: Prisma.IdentityRateLimitWhereInput | Prisma.IdentityRateLimitWhereInput[];
    OR?: Prisma.IdentityRateLimitWhereInput[];
    NOT?: Prisma.IdentityRateLimitWhereInput | Prisma.IdentityRateLimitWhereInput[];
    count?: Prisma.IntFilter<"IdentityRateLimit"> | number;
    expiresAt?: Prisma.DateTimeFilter<"IdentityRateLimit"> | Date | string;
}, "key">;
export type IdentityRateLimitOrderByWithAggregationInput = {
    key?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    _count?: Prisma.IdentityRateLimitCountOrderByAggregateInput;
    _avg?: Prisma.IdentityRateLimitAvgOrderByAggregateInput;
    _max?: Prisma.IdentityRateLimitMaxOrderByAggregateInput;
    _min?: Prisma.IdentityRateLimitMinOrderByAggregateInput;
    _sum?: Prisma.IdentityRateLimitSumOrderByAggregateInput;
};
export type IdentityRateLimitScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentityRateLimitScalarWhereWithAggregatesInput | Prisma.IdentityRateLimitScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentityRateLimitScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentityRateLimitScalarWhereWithAggregatesInput | Prisma.IdentityRateLimitScalarWhereWithAggregatesInput[];
    key?: Prisma.StringWithAggregatesFilter<"IdentityRateLimit"> | string;
    count?: Prisma.IntWithAggregatesFilter<"IdentityRateLimit"> | number;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"IdentityRateLimit"> | Date | string;
};
export type IdentityRateLimitCreateInput = {
    key: string;
    count: number;
    expiresAt: Date | string;
};
export type IdentityRateLimitUncheckedCreateInput = {
    key: string;
    count: number;
    expiresAt: Date | string;
};
export type IdentityRateLimitUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityRateLimitUncheckedUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityRateLimitCreateManyInput = {
    key: string;
    count: number;
    expiresAt: Date | string;
};
export type IdentityRateLimitUpdateManyMutationInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityRateLimitUncheckedUpdateManyInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityRateLimitCountOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type IdentityRateLimitAvgOrderByAggregateInput = {
    count?: Prisma.SortOrder;
};
export type IdentityRateLimitMaxOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type IdentityRateLimitMinOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type IdentityRateLimitSumOrderByAggregateInput = {
    count?: Prisma.SortOrder;
};
export type IdentityRateLimitSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    count?: boolean;
    expiresAt?: boolean;
}, ExtArgs["result"]["identityRateLimit"]>;
export type IdentityRateLimitSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    count?: boolean;
    expiresAt?: boolean;
}, ExtArgs["result"]["identityRateLimit"]>;
export type IdentityRateLimitSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    count?: boolean;
    expiresAt?: boolean;
}, ExtArgs["result"]["identityRateLimit"]>;
export type IdentityRateLimitSelectScalar = {
    key?: boolean;
    count?: boolean;
    expiresAt?: boolean;
};
export type IdentityRateLimitOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"key" | "count" | "expiresAt", ExtArgs["result"]["identityRateLimit"]>;
export type $IdentityRateLimitPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdentityRateLimit";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        key: string;
        count: number;
        expiresAt: Date;
    }, ExtArgs["result"]["identityRateLimit"]>;
    composites: {};
};
export type IdentityRateLimitGetPayload<S extends boolean | null | undefined | IdentityRateLimitDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentityRateLimitPayload, S>;
export type IdentityRateLimitCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentityRateLimitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentityRateLimitCountAggregateInputType | true;
};
export interface IdentityRateLimitDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdentityRateLimit'];
        meta: {
            name: 'IdentityRateLimit';
        };
    };
    findUnique<T extends IdentityRateLimitFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentityRateLimitFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentityRateLimitClient<runtime.Types.Result.GetResult<Prisma.$IdentityRateLimitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentityRateLimitFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentityRateLimitFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityRateLimitClient<runtime.Types.Result.GetResult<Prisma.$IdentityRateLimitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentityRateLimitFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentityRateLimitFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentityRateLimitClient<runtime.Types.Result.GetResult<Prisma.$IdentityRateLimitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentityRateLimitFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentityRateLimitFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityRateLimitClient<runtime.Types.Result.GetResult<Prisma.$IdentityRateLimitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentityRateLimitFindManyArgs>(args?: Prisma.SelectSubset<T, IdentityRateLimitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityRateLimitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentityRateLimitCreateArgs>(args: Prisma.SelectSubset<T, IdentityRateLimitCreateArgs<ExtArgs>>): Prisma.Prisma__IdentityRateLimitClient<runtime.Types.Result.GetResult<Prisma.$IdentityRateLimitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentityRateLimitCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentityRateLimitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentityRateLimitCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentityRateLimitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityRateLimitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentityRateLimitDeleteArgs>(args: Prisma.SelectSubset<T, IdentityRateLimitDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentityRateLimitClient<runtime.Types.Result.GetResult<Prisma.$IdentityRateLimitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentityRateLimitUpdateArgs>(args: Prisma.SelectSubset<T, IdentityRateLimitUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentityRateLimitClient<runtime.Types.Result.GetResult<Prisma.$IdentityRateLimitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentityRateLimitDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentityRateLimitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentityRateLimitUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentityRateLimitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentityRateLimitUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentityRateLimitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityRateLimitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentityRateLimitUpsertArgs>(args: Prisma.SelectSubset<T, IdentityRateLimitUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentityRateLimitClient<runtime.Types.Result.GetResult<Prisma.$IdentityRateLimitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentityRateLimitCountArgs>(args?: Prisma.Subset<T, IdentityRateLimitCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentityRateLimitCountAggregateOutputType> : number>;
    aggregate<T extends IdentityRateLimitAggregateArgs>(args: Prisma.Subset<T, IdentityRateLimitAggregateArgs>): Prisma.PrismaPromise<GetIdentityRateLimitAggregateType<T>>;
    groupBy<T extends IdentityRateLimitGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentityRateLimitGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentityRateLimitGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentityRateLimitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityRateLimitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentityRateLimitFieldRefs;
}
export interface Prisma__IdentityRateLimitClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentityRateLimitFieldRefs {
    readonly key: Prisma.FieldRef<"IdentityRateLimit", 'String'>;
    readonly count: Prisma.FieldRef<"IdentityRateLimit", 'Int'>;
    readonly expiresAt: Prisma.FieldRef<"IdentityRateLimit", 'DateTime'>;
}
export type IdentityRateLimitFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRateLimitOmit<ExtArgs> | null;
    where: Prisma.IdentityRateLimitWhereUniqueInput;
};
export type IdentityRateLimitFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRateLimitOmit<ExtArgs> | null;
    where: Prisma.IdentityRateLimitWhereUniqueInput;
};
export type IdentityRateLimitFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRateLimitOmit<ExtArgs> | null;
    where?: Prisma.IdentityRateLimitWhereInput;
    orderBy?: Prisma.IdentityRateLimitOrderByWithRelationInput | Prisma.IdentityRateLimitOrderByWithRelationInput[];
    cursor?: Prisma.IdentityRateLimitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityRateLimitScalarFieldEnum | Prisma.IdentityRateLimitScalarFieldEnum[];
};
export type IdentityRateLimitFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRateLimitOmit<ExtArgs> | null;
    where?: Prisma.IdentityRateLimitWhereInput;
    orderBy?: Prisma.IdentityRateLimitOrderByWithRelationInput | Prisma.IdentityRateLimitOrderByWithRelationInput[];
    cursor?: Prisma.IdentityRateLimitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityRateLimitScalarFieldEnum | Prisma.IdentityRateLimitScalarFieldEnum[];
};
export type IdentityRateLimitFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRateLimitOmit<ExtArgs> | null;
    where?: Prisma.IdentityRateLimitWhereInput;
    orderBy?: Prisma.IdentityRateLimitOrderByWithRelationInput | Prisma.IdentityRateLimitOrderByWithRelationInput[];
    cursor?: Prisma.IdentityRateLimitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityRateLimitScalarFieldEnum | Prisma.IdentityRateLimitScalarFieldEnum[];
};
export type IdentityRateLimitCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRateLimitOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityRateLimitCreateInput, Prisma.IdentityRateLimitUncheckedCreateInput>;
};
export type IdentityRateLimitCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentityRateLimitCreateManyInput | Prisma.IdentityRateLimitCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityRateLimitCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRateLimitSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityRateLimitOmit<ExtArgs> | null;
    data: Prisma.IdentityRateLimitCreateManyInput | Prisma.IdentityRateLimitCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityRateLimitUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRateLimitOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityRateLimitUpdateInput, Prisma.IdentityRateLimitUncheckedUpdateInput>;
    where: Prisma.IdentityRateLimitWhereUniqueInput;
};
export type IdentityRateLimitUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentityRateLimitUpdateManyMutationInput, Prisma.IdentityRateLimitUncheckedUpdateManyInput>;
    where?: Prisma.IdentityRateLimitWhereInput;
    limit?: number;
};
export type IdentityRateLimitUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRateLimitSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityRateLimitOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityRateLimitUpdateManyMutationInput, Prisma.IdentityRateLimitUncheckedUpdateManyInput>;
    where?: Prisma.IdentityRateLimitWhereInput;
    limit?: number;
};
export type IdentityRateLimitUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRateLimitOmit<ExtArgs> | null;
    where: Prisma.IdentityRateLimitWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityRateLimitCreateInput, Prisma.IdentityRateLimitUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentityRateLimitUpdateInput, Prisma.IdentityRateLimitUncheckedUpdateInput>;
};
export type IdentityRateLimitDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRateLimitOmit<ExtArgs> | null;
    where: Prisma.IdentityRateLimitWhereUniqueInput;
};
export type IdentityRateLimitDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityRateLimitWhereInput;
    limit?: number;
};
export type IdentityRateLimitDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.IdentityRateLimitOmit<ExtArgs> | null;
};
