import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentityAuditModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentityAuditPayload>;
export type AggregateIdentityAudit = {
    _count: IdentityAuditCountAggregateOutputType | null;
    _min: IdentityAuditMinAggregateOutputType | null;
    _max: IdentityAuditMaxAggregateOutputType | null;
};
export type IdentityAuditMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: string | null;
    createdAt: Date | null;
};
export type IdentityAuditMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: string | null;
    createdAt: Date | null;
};
export type IdentityAuditCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    createdAt: number;
    _all: number;
};
export type IdentityAuditMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    createdAt?: true;
};
export type IdentityAuditMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    createdAt?: true;
};
export type IdentityAuditCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    createdAt?: true;
    _all?: true;
};
export type IdentityAuditAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityAuditWhereInput;
    orderBy?: Prisma.IdentityAuditOrderByWithRelationInput | Prisma.IdentityAuditOrderByWithRelationInput[];
    cursor?: Prisma.IdentityAuditWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentityAuditCountAggregateInputType;
    _min?: IdentityAuditMinAggregateInputType;
    _max?: IdentityAuditMaxAggregateInputType;
};
export type GetIdentityAuditAggregateType<T extends IdentityAuditAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentityAudit]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentityAudit[P]> : Prisma.GetScalarType<T[P], AggregateIdentityAudit[P]>;
};
export type IdentityAuditGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityAuditWhereInput;
    orderBy?: Prisma.IdentityAuditOrderByWithAggregationInput | Prisma.IdentityAuditOrderByWithAggregationInput[];
    by: Prisma.IdentityAuditScalarFieldEnum[] | Prisma.IdentityAuditScalarFieldEnum;
    having?: Prisma.IdentityAuditScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentityAuditCountAggregateInputType | true;
    _min?: IdentityAuditMinAggregateInputType;
    _max?: IdentityAuditMaxAggregateInputType;
};
export type IdentityAuditGroupByOutputType = {
    id: string;
    userId: string | null;
    type: string;
    createdAt: Date;
    _count: IdentityAuditCountAggregateOutputType | null;
    _min: IdentityAuditMinAggregateOutputType | null;
    _max: IdentityAuditMaxAggregateOutputType | null;
};
export type GetIdentityAuditGroupByPayload<T extends IdentityAuditGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentityAuditGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentityAuditGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentityAuditGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentityAuditGroupByOutputType[P]>;
}>>;
export type IdentityAuditWhereInput = {
    AND?: Prisma.IdentityAuditWhereInput | Prisma.IdentityAuditWhereInput[];
    OR?: Prisma.IdentityAuditWhereInput[];
    NOT?: Prisma.IdentityAuditWhereInput | Prisma.IdentityAuditWhereInput[];
    id?: Prisma.UuidFilter<"IdentityAudit"> | string;
    userId?: Prisma.UuidNullableFilter<"IdentityAudit"> | string | null;
    type?: Prisma.StringFilter<"IdentityAudit"> | string;
    createdAt?: Prisma.DateTimeFilter<"IdentityAudit"> | Date | string;
};
export type IdentityAuditOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityAuditWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.IdentityAuditWhereInput | Prisma.IdentityAuditWhereInput[];
    OR?: Prisma.IdentityAuditWhereInput[];
    NOT?: Prisma.IdentityAuditWhereInput | Prisma.IdentityAuditWhereInput[];
    userId?: Prisma.UuidNullableFilter<"IdentityAudit"> | string | null;
    type?: Prisma.StringFilter<"IdentityAudit"> | string;
    createdAt?: Prisma.DateTimeFilter<"IdentityAudit"> | Date | string;
}, "id">;
export type IdentityAuditOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.IdentityAuditCountOrderByAggregateInput;
    _max?: Prisma.IdentityAuditMaxOrderByAggregateInput;
    _min?: Prisma.IdentityAuditMinOrderByAggregateInput;
};
export type IdentityAuditScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentityAuditScalarWhereWithAggregatesInput | Prisma.IdentityAuditScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentityAuditScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentityAuditScalarWhereWithAggregatesInput | Prisma.IdentityAuditScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"IdentityAudit"> | string;
    userId?: Prisma.UuidNullableWithAggregatesFilter<"IdentityAudit"> | string | null;
    type?: Prisma.StringWithAggregatesFilter<"IdentityAudit"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"IdentityAudit"> | Date | string;
};
export type IdentityAuditCreateInput = {
    id?: string;
    userId?: string | null;
    type: string;
    createdAt?: Date | string;
};
export type IdentityAuditUncheckedCreateInput = {
    id?: string;
    userId?: string | null;
    type: string;
    createdAt?: Date | string;
};
export type IdentityAuditUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityAuditUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityAuditCreateManyInput = {
    id?: string;
    userId?: string | null;
    type: string;
    createdAt?: Date | string;
};
export type IdentityAuditUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityAuditUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityAuditCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityAuditMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityAuditMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityAuditSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["identityAudit"]>;
export type IdentityAuditSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["identityAudit"]>;
export type IdentityAuditSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["identityAudit"]>;
export type IdentityAuditSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    createdAt?: boolean;
};
export type IdentityAuditOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "createdAt", ExtArgs["result"]["identityAudit"]>;
export type $IdentityAuditPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdentityAudit";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string | null;
        type: string;
        createdAt: Date;
    }, ExtArgs["result"]["identityAudit"]>;
    composites: {};
};
export type IdentityAuditGetPayload<S extends boolean | null | undefined | IdentityAuditDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentityAuditPayload, S>;
export type IdentityAuditCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentityAuditFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentityAuditCountAggregateInputType | true;
};
export interface IdentityAuditDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdentityAudit'];
        meta: {
            name: 'IdentityAudit';
        };
    };
    findUnique<T extends IdentityAuditFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentityAuditFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentityAuditClient<runtime.Types.Result.GetResult<Prisma.$IdentityAuditPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentityAuditFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentityAuditFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityAuditClient<runtime.Types.Result.GetResult<Prisma.$IdentityAuditPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentityAuditFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentityAuditFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentityAuditClient<runtime.Types.Result.GetResult<Prisma.$IdentityAuditPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentityAuditFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentityAuditFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityAuditClient<runtime.Types.Result.GetResult<Prisma.$IdentityAuditPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentityAuditFindManyArgs>(args?: Prisma.SelectSubset<T, IdentityAuditFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityAuditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentityAuditCreateArgs>(args: Prisma.SelectSubset<T, IdentityAuditCreateArgs<ExtArgs>>): Prisma.Prisma__IdentityAuditClient<runtime.Types.Result.GetResult<Prisma.$IdentityAuditPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentityAuditCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentityAuditCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentityAuditCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentityAuditCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityAuditPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentityAuditDeleteArgs>(args: Prisma.SelectSubset<T, IdentityAuditDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentityAuditClient<runtime.Types.Result.GetResult<Prisma.$IdentityAuditPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentityAuditUpdateArgs>(args: Prisma.SelectSubset<T, IdentityAuditUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentityAuditClient<runtime.Types.Result.GetResult<Prisma.$IdentityAuditPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentityAuditDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentityAuditDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentityAuditUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentityAuditUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentityAuditUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentityAuditUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityAuditPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentityAuditUpsertArgs>(args: Prisma.SelectSubset<T, IdentityAuditUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentityAuditClient<runtime.Types.Result.GetResult<Prisma.$IdentityAuditPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentityAuditCountArgs>(args?: Prisma.Subset<T, IdentityAuditCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentityAuditCountAggregateOutputType> : number>;
    aggregate<T extends IdentityAuditAggregateArgs>(args: Prisma.Subset<T, IdentityAuditAggregateArgs>): Prisma.PrismaPromise<GetIdentityAuditAggregateType<T>>;
    groupBy<T extends IdentityAuditGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentityAuditGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentityAuditGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentityAuditGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityAuditGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentityAuditFieldRefs;
}
export interface Prisma__IdentityAuditClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentityAuditFieldRefs {
    readonly id: Prisma.FieldRef<"IdentityAudit", 'String'>;
    readonly userId: Prisma.FieldRef<"IdentityAudit", 'String'>;
    readonly type: Prisma.FieldRef<"IdentityAudit", 'String'>;
    readonly createdAt: Prisma.FieldRef<"IdentityAudit", 'DateTime'>;
}
export type IdentityAuditFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityAuditSelect<ExtArgs> | null;
    omit?: Prisma.IdentityAuditOmit<ExtArgs> | null;
    where: Prisma.IdentityAuditWhereUniqueInput;
};
export type IdentityAuditFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityAuditSelect<ExtArgs> | null;
    omit?: Prisma.IdentityAuditOmit<ExtArgs> | null;
    where: Prisma.IdentityAuditWhereUniqueInput;
};
export type IdentityAuditFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityAuditSelect<ExtArgs> | null;
    omit?: Prisma.IdentityAuditOmit<ExtArgs> | null;
    where?: Prisma.IdentityAuditWhereInput;
    orderBy?: Prisma.IdentityAuditOrderByWithRelationInput | Prisma.IdentityAuditOrderByWithRelationInput[];
    cursor?: Prisma.IdentityAuditWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityAuditScalarFieldEnum | Prisma.IdentityAuditScalarFieldEnum[];
};
export type IdentityAuditFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityAuditSelect<ExtArgs> | null;
    omit?: Prisma.IdentityAuditOmit<ExtArgs> | null;
    where?: Prisma.IdentityAuditWhereInput;
    orderBy?: Prisma.IdentityAuditOrderByWithRelationInput | Prisma.IdentityAuditOrderByWithRelationInput[];
    cursor?: Prisma.IdentityAuditWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityAuditScalarFieldEnum | Prisma.IdentityAuditScalarFieldEnum[];
};
export type IdentityAuditFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityAuditSelect<ExtArgs> | null;
    omit?: Prisma.IdentityAuditOmit<ExtArgs> | null;
    where?: Prisma.IdentityAuditWhereInput;
    orderBy?: Prisma.IdentityAuditOrderByWithRelationInput | Prisma.IdentityAuditOrderByWithRelationInput[];
    cursor?: Prisma.IdentityAuditWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityAuditScalarFieldEnum | Prisma.IdentityAuditScalarFieldEnum[];
};
export type IdentityAuditCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityAuditSelect<ExtArgs> | null;
    omit?: Prisma.IdentityAuditOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityAuditCreateInput, Prisma.IdentityAuditUncheckedCreateInput>;
};
export type IdentityAuditCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentityAuditCreateManyInput | Prisma.IdentityAuditCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityAuditCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityAuditSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityAuditOmit<ExtArgs> | null;
    data: Prisma.IdentityAuditCreateManyInput | Prisma.IdentityAuditCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityAuditUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityAuditSelect<ExtArgs> | null;
    omit?: Prisma.IdentityAuditOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityAuditUpdateInput, Prisma.IdentityAuditUncheckedUpdateInput>;
    where: Prisma.IdentityAuditWhereUniqueInput;
};
export type IdentityAuditUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentityAuditUpdateManyMutationInput, Prisma.IdentityAuditUncheckedUpdateManyInput>;
    where?: Prisma.IdentityAuditWhereInput;
    limit?: number;
};
export type IdentityAuditUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityAuditSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityAuditOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityAuditUpdateManyMutationInput, Prisma.IdentityAuditUncheckedUpdateManyInput>;
    where?: Prisma.IdentityAuditWhereInput;
    limit?: number;
};
export type IdentityAuditUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityAuditSelect<ExtArgs> | null;
    omit?: Prisma.IdentityAuditOmit<ExtArgs> | null;
    where: Prisma.IdentityAuditWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityAuditCreateInput, Prisma.IdentityAuditUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentityAuditUpdateInput, Prisma.IdentityAuditUncheckedUpdateInput>;
};
export type IdentityAuditDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityAuditSelect<ExtArgs> | null;
    omit?: Prisma.IdentityAuditOmit<ExtArgs> | null;
    where: Prisma.IdentityAuditWhereUniqueInput;
};
export type IdentityAuditDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityAuditWhereInput;
    limit?: number;
};
export type IdentityAuditDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityAuditSelect<ExtArgs> | null;
    omit?: Prisma.IdentityAuditOmit<ExtArgs> | null;
};
