import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PhoneIdentityModel = runtime.Types.Result.DefaultSelection<Prisma.$PhoneIdentityPayload>;
export type AggregatePhoneIdentity = {
    _count: PhoneIdentityCountAggregateOutputType | null;
    _min: PhoneIdentityMinAggregateOutputType | null;
    _max: PhoneIdentityMaxAggregateOutputType | null;
};
export type PhoneIdentityMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    phone: string | null;
    verifiedAt: Date | null;
};
export type PhoneIdentityMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    phone: string | null;
    verifiedAt: Date | null;
};
export type PhoneIdentityCountAggregateOutputType = {
    id: number;
    userId: number;
    phone: number;
    verifiedAt: number;
    _all: number;
};
export type PhoneIdentityMinAggregateInputType = {
    id?: true;
    userId?: true;
    phone?: true;
    verifiedAt?: true;
};
export type PhoneIdentityMaxAggregateInputType = {
    id?: true;
    userId?: true;
    phone?: true;
    verifiedAt?: true;
};
export type PhoneIdentityCountAggregateInputType = {
    id?: true;
    userId?: true;
    phone?: true;
    verifiedAt?: true;
    _all?: true;
};
export type PhoneIdentityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PhoneIdentityWhereInput;
    orderBy?: Prisma.PhoneIdentityOrderByWithRelationInput | Prisma.PhoneIdentityOrderByWithRelationInput[];
    cursor?: Prisma.PhoneIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PhoneIdentityCountAggregateInputType;
    _min?: PhoneIdentityMinAggregateInputType;
    _max?: PhoneIdentityMaxAggregateInputType;
};
export type GetPhoneIdentityAggregateType<T extends PhoneIdentityAggregateArgs> = {
    [P in keyof T & keyof AggregatePhoneIdentity]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePhoneIdentity[P]> : Prisma.GetScalarType<T[P], AggregatePhoneIdentity[P]>;
};
export type PhoneIdentityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PhoneIdentityWhereInput;
    orderBy?: Prisma.PhoneIdentityOrderByWithAggregationInput | Prisma.PhoneIdentityOrderByWithAggregationInput[];
    by: Prisma.PhoneIdentityScalarFieldEnum[] | Prisma.PhoneIdentityScalarFieldEnum;
    having?: Prisma.PhoneIdentityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PhoneIdentityCountAggregateInputType | true;
    _min?: PhoneIdentityMinAggregateInputType;
    _max?: PhoneIdentityMaxAggregateInputType;
};
export type PhoneIdentityGroupByOutputType = {
    id: string;
    userId: string;
    phone: string;
    verifiedAt: Date;
    _count: PhoneIdentityCountAggregateOutputType | null;
    _min: PhoneIdentityMinAggregateOutputType | null;
    _max: PhoneIdentityMaxAggregateOutputType | null;
};
export type GetPhoneIdentityGroupByPayload<T extends PhoneIdentityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PhoneIdentityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PhoneIdentityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PhoneIdentityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PhoneIdentityGroupByOutputType[P]>;
}>>;
export type PhoneIdentityWhereInput = {
    AND?: Prisma.PhoneIdentityWhereInput | Prisma.PhoneIdentityWhereInput[];
    OR?: Prisma.PhoneIdentityWhereInput[];
    NOT?: Prisma.PhoneIdentityWhereInput | Prisma.PhoneIdentityWhereInput[];
    id?: Prisma.UuidFilter<"PhoneIdentity"> | string;
    userId?: Prisma.UuidFilter<"PhoneIdentity"> | string;
    phone?: Prisma.StringFilter<"PhoneIdentity"> | string;
    verifiedAt?: Prisma.DateTimeFilter<"PhoneIdentity"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PhoneIdentityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type PhoneIdentityWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    phone?: string;
    AND?: Prisma.PhoneIdentityWhereInput | Prisma.PhoneIdentityWhereInput[];
    OR?: Prisma.PhoneIdentityWhereInput[];
    NOT?: Prisma.PhoneIdentityWhereInput | Prisma.PhoneIdentityWhereInput[];
    verifiedAt?: Prisma.DateTimeFilter<"PhoneIdentity"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId" | "phone">;
export type PhoneIdentityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    _count?: Prisma.PhoneIdentityCountOrderByAggregateInput;
    _max?: Prisma.PhoneIdentityMaxOrderByAggregateInput;
    _min?: Prisma.PhoneIdentityMinOrderByAggregateInput;
};
export type PhoneIdentityScalarWhereWithAggregatesInput = {
    AND?: Prisma.PhoneIdentityScalarWhereWithAggregatesInput | Prisma.PhoneIdentityScalarWhereWithAggregatesInput[];
    OR?: Prisma.PhoneIdentityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PhoneIdentityScalarWhereWithAggregatesInput | Prisma.PhoneIdentityScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"PhoneIdentity"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"PhoneIdentity"> | string;
    phone?: Prisma.StringWithAggregatesFilter<"PhoneIdentity"> | string;
    verifiedAt?: Prisma.DateTimeWithAggregatesFilter<"PhoneIdentity"> | Date | string;
};
export type PhoneIdentityCreateInput = {
    id?: string;
    phone: string;
    verifiedAt: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPhonesInput;
};
export type PhoneIdentityUncheckedCreateInput = {
    id?: string;
    userId: string;
    phone: string;
    verifiedAt: Date | string;
};
export type PhoneIdentityUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPhonesNestedInput;
};
export type PhoneIdentityUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhoneIdentityCreateManyInput = {
    id?: string;
    userId: string;
    phone: string;
    verifiedAt: Date | string;
};
export type PhoneIdentityUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhoneIdentityUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhoneIdentityListRelationFilter = {
    every?: Prisma.PhoneIdentityWhereInput;
    some?: Prisma.PhoneIdentityWhereInput;
    none?: Prisma.PhoneIdentityWhereInput;
};
export type PhoneIdentityOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PhoneIdentityCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
};
export type PhoneIdentityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
};
export type PhoneIdentityMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
};
export type PhoneIdentityCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PhoneIdentityCreateWithoutUserInput, Prisma.PhoneIdentityUncheckedCreateWithoutUserInput> | Prisma.PhoneIdentityCreateWithoutUserInput[] | Prisma.PhoneIdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PhoneIdentityCreateOrConnectWithoutUserInput | Prisma.PhoneIdentityCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PhoneIdentityCreateManyUserInputEnvelope;
    connect?: Prisma.PhoneIdentityWhereUniqueInput | Prisma.PhoneIdentityWhereUniqueInput[];
};
export type PhoneIdentityUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PhoneIdentityCreateWithoutUserInput, Prisma.PhoneIdentityUncheckedCreateWithoutUserInput> | Prisma.PhoneIdentityCreateWithoutUserInput[] | Prisma.PhoneIdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PhoneIdentityCreateOrConnectWithoutUserInput | Prisma.PhoneIdentityCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PhoneIdentityCreateManyUserInputEnvelope;
    connect?: Prisma.PhoneIdentityWhereUniqueInput | Prisma.PhoneIdentityWhereUniqueInput[];
};
export type PhoneIdentityUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PhoneIdentityCreateWithoutUserInput, Prisma.PhoneIdentityUncheckedCreateWithoutUserInput> | Prisma.PhoneIdentityCreateWithoutUserInput[] | Prisma.PhoneIdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PhoneIdentityCreateOrConnectWithoutUserInput | Prisma.PhoneIdentityCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PhoneIdentityUpsertWithWhereUniqueWithoutUserInput | Prisma.PhoneIdentityUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PhoneIdentityCreateManyUserInputEnvelope;
    set?: Prisma.PhoneIdentityWhereUniqueInput | Prisma.PhoneIdentityWhereUniqueInput[];
    disconnect?: Prisma.PhoneIdentityWhereUniqueInput | Prisma.PhoneIdentityWhereUniqueInput[];
    delete?: Prisma.PhoneIdentityWhereUniqueInput | Prisma.PhoneIdentityWhereUniqueInput[];
    connect?: Prisma.PhoneIdentityWhereUniqueInput | Prisma.PhoneIdentityWhereUniqueInput[];
    update?: Prisma.PhoneIdentityUpdateWithWhereUniqueWithoutUserInput | Prisma.PhoneIdentityUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PhoneIdentityUpdateManyWithWhereWithoutUserInput | Prisma.PhoneIdentityUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PhoneIdentityScalarWhereInput | Prisma.PhoneIdentityScalarWhereInput[];
};
export type PhoneIdentityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PhoneIdentityCreateWithoutUserInput, Prisma.PhoneIdentityUncheckedCreateWithoutUserInput> | Prisma.PhoneIdentityCreateWithoutUserInput[] | Prisma.PhoneIdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PhoneIdentityCreateOrConnectWithoutUserInput | Prisma.PhoneIdentityCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PhoneIdentityUpsertWithWhereUniqueWithoutUserInput | Prisma.PhoneIdentityUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PhoneIdentityCreateManyUserInputEnvelope;
    set?: Prisma.PhoneIdentityWhereUniqueInput | Prisma.PhoneIdentityWhereUniqueInput[];
    disconnect?: Prisma.PhoneIdentityWhereUniqueInput | Prisma.PhoneIdentityWhereUniqueInput[];
    delete?: Prisma.PhoneIdentityWhereUniqueInput | Prisma.PhoneIdentityWhereUniqueInput[];
    connect?: Prisma.PhoneIdentityWhereUniqueInput | Prisma.PhoneIdentityWhereUniqueInput[];
    update?: Prisma.PhoneIdentityUpdateWithWhereUniqueWithoutUserInput | Prisma.PhoneIdentityUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PhoneIdentityUpdateManyWithWhereWithoutUserInput | Prisma.PhoneIdentityUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PhoneIdentityScalarWhereInput | Prisma.PhoneIdentityScalarWhereInput[];
};
export type PhoneIdentityCreateWithoutUserInput = {
    id?: string;
    phone: string;
    verifiedAt: Date | string;
};
export type PhoneIdentityUncheckedCreateWithoutUserInput = {
    id?: string;
    phone: string;
    verifiedAt: Date | string;
};
export type PhoneIdentityCreateOrConnectWithoutUserInput = {
    where: Prisma.PhoneIdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.PhoneIdentityCreateWithoutUserInput, Prisma.PhoneIdentityUncheckedCreateWithoutUserInput>;
};
export type PhoneIdentityCreateManyUserInputEnvelope = {
    data: Prisma.PhoneIdentityCreateManyUserInput | Prisma.PhoneIdentityCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PhoneIdentityUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PhoneIdentityWhereUniqueInput;
    update: Prisma.XOR<Prisma.PhoneIdentityUpdateWithoutUserInput, Prisma.PhoneIdentityUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PhoneIdentityCreateWithoutUserInput, Prisma.PhoneIdentityUncheckedCreateWithoutUserInput>;
};
export type PhoneIdentityUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PhoneIdentityWhereUniqueInput;
    data: Prisma.XOR<Prisma.PhoneIdentityUpdateWithoutUserInput, Prisma.PhoneIdentityUncheckedUpdateWithoutUserInput>;
};
export type PhoneIdentityUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PhoneIdentityScalarWhereInput;
    data: Prisma.XOR<Prisma.PhoneIdentityUpdateManyMutationInput, Prisma.PhoneIdentityUncheckedUpdateManyWithoutUserInput>;
};
export type PhoneIdentityScalarWhereInput = {
    AND?: Prisma.PhoneIdentityScalarWhereInput | Prisma.PhoneIdentityScalarWhereInput[];
    OR?: Prisma.PhoneIdentityScalarWhereInput[];
    NOT?: Prisma.PhoneIdentityScalarWhereInput | Prisma.PhoneIdentityScalarWhereInput[];
    id?: Prisma.UuidFilter<"PhoneIdentity"> | string;
    userId?: Prisma.UuidFilter<"PhoneIdentity"> | string;
    phone?: Prisma.StringFilter<"PhoneIdentity"> | string;
    verifiedAt?: Prisma.DateTimeFilter<"PhoneIdentity"> | Date | string;
};
export type PhoneIdentityCreateManyUserInput = {
    id?: string;
    phone: string;
    verifiedAt: Date | string;
};
export type PhoneIdentityUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhoneIdentityUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhoneIdentityUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhoneIdentitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    phone?: boolean;
    verifiedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["phoneIdentity"]>;
export type PhoneIdentitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    phone?: boolean;
    verifiedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["phoneIdentity"]>;
export type PhoneIdentitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    phone?: boolean;
    verifiedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["phoneIdentity"]>;
export type PhoneIdentitySelectScalar = {
    id?: boolean;
    userId?: boolean;
    phone?: boolean;
    verifiedAt?: boolean;
};
export type PhoneIdentityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "phone" | "verifiedAt", ExtArgs["result"]["phoneIdentity"]>;
export type PhoneIdentityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PhoneIdentityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PhoneIdentityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PhoneIdentityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PhoneIdentity";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        phone: string;
        verifiedAt: Date;
    }, ExtArgs["result"]["phoneIdentity"]>;
    composites: {};
};
export type PhoneIdentityGetPayload<S extends boolean | null | undefined | PhoneIdentityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PhoneIdentityPayload, S>;
export type PhoneIdentityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PhoneIdentityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PhoneIdentityCountAggregateInputType | true;
};
export interface PhoneIdentityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PhoneIdentity'];
        meta: {
            name: 'PhoneIdentity';
        };
    };
    findUnique<T extends PhoneIdentityFindUniqueArgs>(args: Prisma.SelectSubset<T, PhoneIdentityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PhoneIdentityClient<runtime.Types.Result.GetResult<Prisma.$PhoneIdentityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PhoneIdentityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PhoneIdentityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PhoneIdentityClient<runtime.Types.Result.GetResult<Prisma.$PhoneIdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PhoneIdentityFindFirstArgs>(args?: Prisma.SelectSubset<T, PhoneIdentityFindFirstArgs<ExtArgs>>): Prisma.Prisma__PhoneIdentityClient<runtime.Types.Result.GetResult<Prisma.$PhoneIdentityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PhoneIdentityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PhoneIdentityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PhoneIdentityClient<runtime.Types.Result.GetResult<Prisma.$PhoneIdentityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PhoneIdentityFindManyArgs>(args?: Prisma.SelectSubset<T, PhoneIdentityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PhoneIdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PhoneIdentityCreateArgs>(args: Prisma.SelectSubset<T, PhoneIdentityCreateArgs<ExtArgs>>): Prisma.Prisma__PhoneIdentityClient<runtime.Types.Result.GetResult<Prisma.$PhoneIdentityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PhoneIdentityCreateManyArgs>(args?: Prisma.SelectSubset<T, PhoneIdentityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PhoneIdentityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PhoneIdentityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PhoneIdentityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PhoneIdentityDeleteArgs>(args: Prisma.SelectSubset<T, PhoneIdentityDeleteArgs<ExtArgs>>): Prisma.Prisma__PhoneIdentityClient<runtime.Types.Result.GetResult<Prisma.$PhoneIdentityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PhoneIdentityUpdateArgs>(args: Prisma.SelectSubset<T, PhoneIdentityUpdateArgs<ExtArgs>>): Prisma.Prisma__PhoneIdentityClient<runtime.Types.Result.GetResult<Prisma.$PhoneIdentityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PhoneIdentityDeleteManyArgs>(args?: Prisma.SelectSubset<T, PhoneIdentityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PhoneIdentityUpdateManyArgs>(args: Prisma.SelectSubset<T, PhoneIdentityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PhoneIdentityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PhoneIdentityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PhoneIdentityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PhoneIdentityUpsertArgs>(args: Prisma.SelectSubset<T, PhoneIdentityUpsertArgs<ExtArgs>>): Prisma.Prisma__PhoneIdentityClient<runtime.Types.Result.GetResult<Prisma.$PhoneIdentityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PhoneIdentityCountArgs>(args?: Prisma.Subset<T, PhoneIdentityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PhoneIdentityCountAggregateOutputType> : number>;
    aggregate<T extends PhoneIdentityAggregateArgs>(args: Prisma.Subset<T, PhoneIdentityAggregateArgs>): Prisma.PrismaPromise<GetPhoneIdentityAggregateType<T>>;
    groupBy<T extends PhoneIdentityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PhoneIdentityGroupByArgs['orderBy'];
    } : {
        orderBy?: PhoneIdentityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PhoneIdentityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhoneIdentityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PhoneIdentityFieldRefs;
}
export interface Prisma__PhoneIdentityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PhoneIdentityFieldRefs {
    readonly id: Prisma.FieldRef<"PhoneIdentity", 'String'>;
    readonly userId: Prisma.FieldRef<"PhoneIdentity", 'String'>;
    readonly phone: Prisma.FieldRef<"PhoneIdentity", 'String'>;
    readonly verifiedAt: Prisma.FieldRef<"PhoneIdentity", 'DateTime'>;
}
export type PhoneIdentityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhoneIdentitySelect<ExtArgs> | null;
    omit?: Prisma.PhoneIdentityOmit<ExtArgs> | null;
    include?: Prisma.PhoneIdentityInclude<ExtArgs> | null;
    where: Prisma.PhoneIdentityWhereUniqueInput;
};
export type PhoneIdentityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhoneIdentitySelect<ExtArgs> | null;
    omit?: Prisma.PhoneIdentityOmit<ExtArgs> | null;
    include?: Prisma.PhoneIdentityInclude<ExtArgs> | null;
    where: Prisma.PhoneIdentityWhereUniqueInput;
};
export type PhoneIdentityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhoneIdentitySelect<ExtArgs> | null;
    omit?: Prisma.PhoneIdentityOmit<ExtArgs> | null;
    include?: Prisma.PhoneIdentityInclude<ExtArgs> | null;
    where?: Prisma.PhoneIdentityWhereInput;
    orderBy?: Prisma.PhoneIdentityOrderByWithRelationInput | Prisma.PhoneIdentityOrderByWithRelationInput[];
    cursor?: Prisma.PhoneIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PhoneIdentityScalarFieldEnum | Prisma.PhoneIdentityScalarFieldEnum[];
};
export type PhoneIdentityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhoneIdentitySelect<ExtArgs> | null;
    omit?: Prisma.PhoneIdentityOmit<ExtArgs> | null;
    include?: Prisma.PhoneIdentityInclude<ExtArgs> | null;
    where?: Prisma.PhoneIdentityWhereInput;
    orderBy?: Prisma.PhoneIdentityOrderByWithRelationInput | Prisma.PhoneIdentityOrderByWithRelationInput[];
    cursor?: Prisma.PhoneIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PhoneIdentityScalarFieldEnum | Prisma.PhoneIdentityScalarFieldEnum[];
};
export type PhoneIdentityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhoneIdentitySelect<ExtArgs> | null;
    omit?: Prisma.PhoneIdentityOmit<ExtArgs> | null;
    include?: Prisma.PhoneIdentityInclude<ExtArgs> | null;
    where?: Prisma.PhoneIdentityWhereInput;
    orderBy?: Prisma.PhoneIdentityOrderByWithRelationInput | Prisma.PhoneIdentityOrderByWithRelationInput[];
    cursor?: Prisma.PhoneIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PhoneIdentityScalarFieldEnum | Prisma.PhoneIdentityScalarFieldEnum[];
};
export type PhoneIdentityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhoneIdentitySelect<ExtArgs> | null;
    omit?: Prisma.PhoneIdentityOmit<ExtArgs> | null;
    include?: Prisma.PhoneIdentityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PhoneIdentityCreateInput, Prisma.PhoneIdentityUncheckedCreateInput>;
};
export type PhoneIdentityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PhoneIdentityCreateManyInput | Prisma.PhoneIdentityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PhoneIdentityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhoneIdentitySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PhoneIdentityOmit<ExtArgs> | null;
    data: Prisma.PhoneIdentityCreateManyInput | Prisma.PhoneIdentityCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PhoneIdentityIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PhoneIdentityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhoneIdentitySelect<ExtArgs> | null;
    omit?: Prisma.PhoneIdentityOmit<ExtArgs> | null;
    include?: Prisma.PhoneIdentityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PhoneIdentityUpdateInput, Prisma.PhoneIdentityUncheckedUpdateInput>;
    where: Prisma.PhoneIdentityWhereUniqueInput;
};
export type PhoneIdentityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PhoneIdentityUpdateManyMutationInput, Prisma.PhoneIdentityUncheckedUpdateManyInput>;
    where?: Prisma.PhoneIdentityWhereInput;
    limit?: number;
};
export type PhoneIdentityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhoneIdentitySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PhoneIdentityOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PhoneIdentityUpdateManyMutationInput, Prisma.PhoneIdentityUncheckedUpdateManyInput>;
    where?: Prisma.PhoneIdentityWhereInput;
    limit?: number;
    include?: Prisma.PhoneIdentityIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PhoneIdentityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhoneIdentitySelect<ExtArgs> | null;
    omit?: Prisma.PhoneIdentityOmit<ExtArgs> | null;
    include?: Prisma.PhoneIdentityInclude<ExtArgs> | null;
    where: Prisma.PhoneIdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.PhoneIdentityCreateInput, Prisma.PhoneIdentityUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PhoneIdentityUpdateInput, Prisma.PhoneIdentityUncheckedUpdateInput>;
};
export type PhoneIdentityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhoneIdentitySelect<ExtArgs> | null;
    omit?: Prisma.PhoneIdentityOmit<ExtArgs> | null;
    include?: Prisma.PhoneIdentityInclude<ExtArgs> | null;
    where: Prisma.PhoneIdentityWhereUniqueInput;
};
export type PhoneIdentityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PhoneIdentityWhereInput;
    limit?: number;
};
export type PhoneIdentityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhoneIdentitySelect<ExtArgs> | null;
    omit?: Prisma.PhoneIdentityOmit<ExtArgs> | null;
    include?: Prisma.PhoneIdentityInclude<ExtArgs> | null;
};
