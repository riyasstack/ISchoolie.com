import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentityOidcStateModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentityOidcStatePayload>;
export type AggregateIdentityOidcState = {
    _count: IdentityOidcStateCountAggregateOutputType | null;
    _min: IdentityOidcStateMinAggregateOutputType | null;
    _max: IdentityOidcStateMaxAggregateOutputType | null;
};
export type IdentityOidcStateMinAggregateOutputType = {
    state: string | null;
    expiresAt: Date | null;
};
export type IdentityOidcStateMaxAggregateOutputType = {
    state: string | null;
    expiresAt: Date | null;
};
export type IdentityOidcStateCountAggregateOutputType = {
    state: number;
    data: number;
    expiresAt: number;
    _all: number;
};
export type IdentityOidcStateMinAggregateInputType = {
    state?: true;
    expiresAt?: true;
};
export type IdentityOidcStateMaxAggregateInputType = {
    state?: true;
    expiresAt?: true;
};
export type IdentityOidcStateCountAggregateInputType = {
    state?: true;
    data?: true;
    expiresAt?: true;
    _all?: true;
};
export type IdentityOidcStateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityOidcStateWhereInput;
    orderBy?: Prisma.IdentityOidcStateOrderByWithRelationInput | Prisma.IdentityOidcStateOrderByWithRelationInput[];
    cursor?: Prisma.IdentityOidcStateWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentityOidcStateCountAggregateInputType;
    _min?: IdentityOidcStateMinAggregateInputType;
    _max?: IdentityOidcStateMaxAggregateInputType;
};
export type GetIdentityOidcStateAggregateType<T extends IdentityOidcStateAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentityOidcState]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentityOidcState[P]> : Prisma.GetScalarType<T[P], AggregateIdentityOidcState[P]>;
};
export type IdentityOidcStateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityOidcStateWhereInput;
    orderBy?: Prisma.IdentityOidcStateOrderByWithAggregationInput | Prisma.IdentityOidcStateOrderByWithAggregationInput[];
    by: Prisma.IdentityOidcStateScalarFieldEnum[] | Prisma.IdentityOidcStateScalarFieldEnum;
    having?: Prisma.IdentityOidcStateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentityOidcStateCountAggregateInputType | true;
    _min?: IdentityOidcStateMinAggregateInputType;
    _max?: IdentityOidcStateMaxAggregateInputType;
};
export type IdentityOidcStateGroupByOutputType = {
    state: string;
    data: runtime.JsonValue;
    expiresAt: Date;
    _count: IdentityOidcStateCountAggregateOutputType | null;
    _min: IdentityOidcStateMinAggregateOutputType | null;
    _max: IdentityOidcStateMaxAggregateOutputType | null;
};
export type GetIdentityOidcStateGroupByPayload<T extends IdentityOidcStateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentityOidcStateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentityOidcStateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentityOidcStateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentityOidcStateGroupByOutputType[P]>;
}>>;
export type IdentityOidcStateWhereInput = {
    AND?: Prisma.IdentityOidcStateWhereInput | Prisma.IdentityOidcStateWhereInput[];
    OR?: Prisma.IdentityOidcStateWhereInput[];
    NOT?: Prisma.IdentityOidcStateWhereInput | Prisma.IdentityOidcStateWhereInput[];
    state?: Prisma.StringFilter<"IdentityOidcState"> | string;
    data?: Prisma.JsonFilter<"IdentityOidcState">;
    expiresAt?: Prisma.DateTimeFilter<"IdentityOidcState"> | Date | string;
};
export type IdentityOidcStateOrderByWithRelationInput = {
    state?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type IdentityOidcStateWhereUniqueInput = Prisma.AtLeast<{
    state?: string;
    AND?: Prisma.IdentityOidcStateWhereInput | Prisma.IdentityOidcStateWhereInput[];
    OR?: Prisma.IdentityOidcStateWhereInput[];
    NOT?: Prisma.IdentityOidcStateWhereInput | Prisma.IdentityOidcStateWhereInput[];
    data?: Prisma.JsonFilter<"IdentityOidcState">;
    expiresAt?: Prisma.DateTimeFilter<"IdentityOidcState"> | Date | string;
}, "state">;
export type IdentityOidcStateOrderByWithAggregationInput = {
    state?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    _count?: Prisma.IdentityOidcStateCountOrderByAggregateInput;
    _max?: Prisma.IdentityOidcStateMaxOrderByAggregateInput;
    _min?: Prisma.IdentityOidcStateMinOrderByAggregateInput;
};
export type IdentityOidcStateScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentityOidcStateScalarWhereWithAggregatesInput | Prisma.IdentityOidcStateScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentityOidcStateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentityOidcStateScalarWhereWithAggregatesInput | Prisma.IdentityOidcStateScalarWhereWithAggregatesInput[];
    state?: Prisma.StringWithAggregatesFilter<"IdentityOidcState"> | string;
    data?: Prisma.JsonWithAggregatesFilter<"IdentityOidcState">;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"IdentityOidcState"> | Date | string;
};
export type IdentityOidcStateCreateInput = {
    state: string;
    data: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
};
export type IdentityOidcStateUncheckedCreateInput = {
    state: string;
    data: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
};
export type IdentityOidcStateUpdateInput = {
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityOidcStateUncheckedUpdateInput = {
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityOidcStateCreateManyInput = {
    state: string;
    data: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
};
export type IdentityOidcStateUpdateManyMutationInput = {
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityOidcStateUncheckedUpdateManyInput = {
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityOidcStateCountOrderByAggregateInput = {
    state?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type IdentityOidcStateMaxOrderByAggregateInput = {
    state?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type IdentityOidcStateMinOrderByAggregateInput = {
    state?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type IdentityOidcStateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    state?: boolean;
    data?: boolean;
    expiresAt?: boolean;
}, ExtArgs["result"]["identityOidcState"]>;
export type IdentityOidcStateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    state?: boolean;
    data?: boolean;
    expiresAt?: boolean;
}, ExtArgs["result"]["identityOidcState"]>;
export type IdentityOidcStateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    state?: boolean;
    data?: boolean;
    expiresAt?: boolean;
}, ExtArgs["result"]["identityOidcState"]>;
export type IdentityOidcStateSelectScalar = {
    state?: boolean;
    data?: boolean;
    expiresAt?: boolean;
};
export type IdentityOidcStateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"state" | "data" | "expiresAt", ExtArgs["result"]["identityOidcState"]>;
export type $IdentityOidcStatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdentityOidcState";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        state: string;
        data: runtime.JsonValue;
        expiresAt: Date;
    }, ExtArgs["result"]["identityOidcState"]>;
    composites: {};
};
export type IdentityOidcStateGetPayload<S extends boolean | null | undefined | IdentityOidcStateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentityOidcStatePayload, S>;
export type IdentityOidcStateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentityOidcStateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentityOidcStateCountAggregateInputType | true;
};
export interface IdentityOidcStateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdentityOidcState'];
        meta: {
            name: 'IdentityOidcState';
        };
    };
    findUnique<T extends IdentityOidcStateFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentityOidcStateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentityOidcStateClient<runtime.Types.Result.GetResult<Prisma.$IdentityOidcStatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentityOidcStateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentityOidcStateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityOidcStateClient<runtime.Types.Result.GetResult<Prisma.$IdentityOidcStatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentityOidcStateFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentityOidcStateFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentityOidcStateClient<runtime.Types.Result.GetResult<Prisma.$IdentityOidcStatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentityOidcStateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentityOidcStateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityOidcStateClient<runtime.Types.Result.GetResult<Prisma.$IdentityOidcStatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentityOidcStateFindManyArgs>(args?: Prisma.SelectSubset<T, IdentityOidcStateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityOidcStatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentityOidcStateCreateArgs>(args: Prisma.SelectSubset<T, IdentityOidcStateCreateArgs<ExtArgs>>): Prisma.Prisma__IdentityOidcStateClient<runtime.Types.Result.GetResult<Prisma.$IdentityOidcStatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentityOidcStateCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentityOidcStateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentityOidcStateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentityOidcStateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityOidcStatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentityOidcStateDeleteArgs>(args: Prisma.SelectSubset<T, IdentityOidcStateDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentityOidcStateClient<runtime.Types.Result.GetResult<Prisma.$IdentityOidcStatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentityOidcStateUpdateArgs>(args: Prisma.SelectSubset<T, IdentityOidcStateUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentityOidcStateClient<runtime.Types.Result.GetResult<Prisma.$IdentityOidcStatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentityOidcStateDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentityOidcStateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentityOidcStateUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentityOidcStateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentityOidcStateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentityOidcStateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityOidcStatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentityOidcStateUpsertArgs>(args: Prisma.SelectSubset<T, IdentityOidcStateUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentityOidcStateClient<runtime.Types.Result.GetResult<Prisma.$IdentityOidcStatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentityOidcStateCountArgs>(args?: Prisma.Subset<T, IdentityOidcStateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentityOidcStateCountAggregateOutputType> : number>;
    aggregate<T extends IdentityOidcStateAggregateArgs>(args: Prisma.Subset<T, IdentityOidcStateAggregateArgs>): Prisma.PrismaPromise<GetIdentityOidcStateAggregateType<T>>;
    groupBy<T extends IdentityOidcStateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentityOidcStateGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentityOidcStateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentityOidcStateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityOidcStateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentityOidcStateFieldRefs;
}
export interface Prisma__IdentityOidcStateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentityOidcStateFieldRefs {
    readonly state: Prisma.FieldRef<"IdentityOidcState", 'String'>;
    readonly data: Prisma.FieldRef<"IdentityOidcState", 'Json'>;
    readonly expiresAt: Prisma.FieldRef<"IdentityOidcState", 'DateTime'>;
}
export type IdentityOidcStateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityOidcStateSelect<ExtArgs> | null;
    omit?: Prisma.IdentityOidcStateOmit<ExtArgs> | null;
    where: Prisma.IdentityOidcStateWhereUniqueInput;
};
export type IdentityOidcStateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityOidcStateSelect<ExtArgs> | null;
    omit?: Prisma.IdentityOidcStateOmit<ExtArgs> | null;
    where: Prisma.IdentityOidcStateWhereUniqueInput;
};
export type IdentityOidcStateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityOidcStateSelect<ExtArgs> | null;
    omit?: Prisma.IdentityOidcStateOmit<ExtArgs> | null;
    where?: Prisma.IdentityOidcStateWhereInput;
    orderBy?: Prisma.IdentityOidcStateOrderByWithRelationInput | Prisma.IdentityOidcStateOrderByWithRelationInput[];
    cursor?: Prisma.IdentityOidcStateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityOidcStateScalarFieldEnum | Prisma.IdentityOidcStateScalarFieldEnum[];
};
export type IdentityOidcStateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityOidcStateSelect<ExtArgs> | null;
    omit?: Prisma.IdentityOidcStateOmit<ExtArgs> | null;
    where?: Prisma.IdentityOidcStateWhereInput;
    orderBy?: Prisma.IdentityOidcStateOrderByWithRelationInput | Prisma.IdentityOidcStateOrderByWithRelationInput[];
    cursor?: Prisma.IdentityOidcStateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityOidcStateScalarFieldEnum | Prisma.IdentityOidcStateScalarFieldEnum[];
};
export type IdentityOidcStateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityOidcStateSelect<ExtArgs> | null;
    omit?: Prisma.IdentityOidcStateOmit<ExtArgs> | null;
    where?: Prisma.IdentityOidcStateWhereInput;
    orderBy?: Prisma.IdentityOidcStateOrderByWithRelationInput | Prisma.IdentityOidcStateOrderByWithRelationInput[];
    cursor?: Prisma.IdentityOidcStateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityOidcStateScalarFieldEnum | Prisma.IdentityOidcStateScalarFieldEnum[];
};
export type IdentityOidcStateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityOidcStateSelect<ExtArgs> | null;
    omit?: Prisma.IdentityOidcStateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityOidcStateCreateInput, Prisma.IdentityOidcStateUncheckedCreateInput>;
};
export type IdentityOidcStateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentityOidcStateCreateManyInput | Prisma.IdentityOidcStateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityOidcStateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityOidcStateSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityOidcStateOmit<ExtArgs> | null;
    data: Prisma.IdentityOidcStateCreateManyInput | Prisma.IdentityOidcStateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityOidcStateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityOidcStateSelect<ExtArgs> | null;
    omit?: Prisma.IdentityOidcStateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityOidcStateUpdateInput, Prisma.IdentityOidcStateUncheckedUpdateInput>;
    where: Prisma.IdentityOidcStateWhereUniqueInput;
};
export type IdentityOidcStateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentityOidcStateUpdateManyMutationInput, Prisma.IdentityOidcStateUncheckedUpdateManyInput>;
    where?: Prisma.IdentityOidcStateWhereInput;
    limit?: number;
};
export type IdentityOidcStateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityOidcStateSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityOidcStateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityOidcStateUpdateManyMutationInput, Prisma.IdentityOidcStateUncheckedUpdateManyInput>;
    where?: Prisma.IdentityOidcStateWhereInput;
    limit?: number;
};
export type IdentityOidcStateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityOidcStateSelect<ExtArgs> | null;
    omit?: Prisma.IdentityOidcStateOmit<ExtArgs> | null;
    where: Prisma.IdentityOidcStateWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityOidcStateCreateInput, Prisma.IdentityOidcStateUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentityOidcStateUpdateInput, Prisma.IdentityOidcStateUncheckedUpdateInput>;
};
export type IdentityOidcStateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityOidcStateSelect<ExtArgs> | null;
    omit?: Prisma.IdentityOidcStateOmit<ExtArgs> | null;
    where: Prisma.IdentityOidcStateWhereUniqueInput;
};
export type IdentityOidcStateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityOidcStateWhereInput;
    limit?: number;
};
export type IdentityOidcStateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityOidcStateSelect<ExtArgs> | null;
    omit?: Prisma.IdentityOidcStateOmit<ExtArgs> | null;
};
