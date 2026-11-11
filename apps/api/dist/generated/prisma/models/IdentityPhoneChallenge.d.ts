import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentityPhoneChallengeModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentityPhoneChallengePayload>;
export type AggregateIdentityPhoneChallenge = {
    _count: IdentityPhoneChallengeCountAggregateOutputType | null;
    _avg: IdentityPhoneChallengeAvgAggregateOutputType | null;
    _sum: IdentityPhoneChallengeSumAggregateOutputType | null;
    _min: IdentityPhoneChallengeMinAggregateOutputType | null;
    _max: IdentityPhoneChallengeMaxAggregateOutputType | null;
};
export type IdentityPhoneChallengeAvgAggregateOutputType = {
    attempts: number | null;
};
export type IdentityPhoneChallengeSumAggregateOutputType = {
    attempts: number | null;
};
export type IdentityPhoneChallengeMinAggregateOutputType = {
    id: string | null;
    phone: string | null;
    kind: string | null;
    codeHash: string | null;
    userId: string | null;
    attempts: number | null;
    expiresAt: Date | null;
    consumedAt: Date | null;
    createdAt: Date | null;
};
export type IdentityPhoneChallengeMaxAggregateOutputType = {
    id: string | null;
    phone: string | null;
    kind: string | null;
    codeHash: string | null;
    userId: string | null;
    attempts: number | null;
    expiresAt: Date | null;
    consumedAt: Date | null;
    createdAt: Date | null;
};
export type IdentityPhoneChallengeCountAggregateOutputType = {
    id: number;
    phone: number;
    kind: number;
    codeHash: number;
    payload: number;
    userId: number;
    attempts: number;
    expiresAt: number;
    consumedAt: number;
    createdAt: number;
    _all: number;
};
export type IdentityPhoneChallengeAvgAggregateInputType = {
    attempts?: true;
};
export type IdentityPhoneChallengeSumAggregateInputType = {
    attempts?: true;
};
export type IdentityPhoneChallengeMinAggregateInputType = {
    id?: true;
    phone?: true;
    kind?: true;
    codeHash?: true;
    userId?: true;
    attempts?: true;
    expiresAt?: true;
    consumedAt?: true;
    createdAt?: true;
};
export type IdentityPhoneChallengeMaxAggregateInputType = {
    id?: true;
    phone?: true;
    kind?: true;
    codeHash?: true;
    userId?: true;
    attempts?: true;
    expiresAt?: true;
    consumedAt?: true;
    createdAt?: true;
};
export type IdentityPhoneChallengeCountAggregateInputType = {
    id?: true;
    phone?: true;
    kind?: true;
    codeHash?: true;
    payload?: true;
    userId?: true;
    attempts?: true;
    expiresAt?: true;
    consumedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type IdentityPhoneChallengeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityPhoneChallengeWhereInput;
    orderBy?: Prisma.IdentityPhoneChallengeOrderByWithRelationInput | Prisma.IdentityPhoneChallengeOrderByWithRelationInput[];
    cursor?: Prisma.IdentityPhoneChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentityPhoneChallengeCountAggregateInputType;
    _avg?: IdentityPhoneChallengeAvgAggregateInputType;
    _sum?: IdentityPhoneChallengeSumAggregateInputType;
    _min?: IdentityPhoneChallengeMinAggregateInputType;
    _max?: IdentityPhoneChallengeMaxAggregateInputType;
};
export type GetIdentityPhoneChallengeAggregateType<T extends IdentityPhoneChallengeAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentityPhoneChallenge]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentityPhoneChallenge[P]> : Prisma.GetScalarType<T[P], AggregateIdentityPhoneChallenge[P]>;
};
export type IdentityPhoneChallengeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityPhoneChallengeWhereInput;
    orderBy?: Prisma.IdentityPhoneChallengeOrderByWithAggregationInput | Prisma.IdentityPhoneChallengeOrderByWithAggregationInput[];
    by: Prisma.IdentityPhoneChallengeScalarFieldEnum[] | Prisma.IdentityPhoneChallengeScalarFieldEnum;
    having?: Prisma.IdentityPhoneChallengeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentityPhoneChallengeCountAggregateInputType | true;
    _avg?: IdentityPhoneChallengeAvgAggregateInputType;
    _sum?: IdentityPhoneChallengeSumAggregateInputType;
    _min?: IdentityPhoneChallengeMinAggregateInputType;
    _max?: IdentityPhoneChallengeMaxAggregateInputType;
};
export type IdentityPhoneChallengeGroupByOutputType = {
    id: string;
    phone: string;
    kind: string;
    codeHash: string;
    payload: runtime.JsonValue;
    userId: string | null;
    attempts: number;
    expiresAt: Date;
    consumedAt: Date | null;
    createdAt: Date;
    _count: IdentityPhoneChallengeCountAggregateOutputType | null;
    _avg: IdentityPhoneChallengeAvgAggregateOutputType | null;
    _sum: IdentityPhoneChallengeSumAggregateOutputType | null;
    _min: IdentityPhoneChallengeMinAggregateOutputType | null;
    _max: IdentityPhoneChallengeMaxAggregateOutputType | null;
};
export type GetIdentityPhoneChallengeGroupByPayload<T extends IdentityPhoneChallengeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentityPhoneChallengeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentityPhoneChallengeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentityPhoneChallengeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentityPhoneChallengeGroupByOutputType[P]>;
}>>;
export type IdentityPhoneChallengeWhereInput = {
    AND?: Prisma.IdentityPhoneChallengeWhereInput | Prisma.IdentityPhoneChallengeWhereInput[];
    OR?: Prisma.IdentityPhoneChallengeWhereInput[];
    NOT?: Prisma.IdentityPhoneChallengeWhereInput | Prisma.IdentityPhoneChallengeWhereInput[];
    id?: Prisma.UuidFilter<"IdentityPhoneChallenge"> | string;
    phone?: Prisma.StringFilter<"IdentityPhoneChallenge"> | string;
    kind?: Prisma.StringFilter<"IdentityPhoneChallenge"> | string;
    codeHash?: Prisma.StringFilter<"IdentityPhoneChallenge"> | string;
    payload?: Prisma.JsonFilter<"IdentityPhoneChallenge">;
    userId?: Prisma.UuidNullableFilter<"IdentityPhoneChallenge"> | string | null;
    attempts?: Prisma.IntFilter<"IdentityPhoneChallenge"> | number;
    expiresAt?: Prisma.DateTimeFilter<"IdentityPhoneChallenge"> | Date | string;
    consumedAt?: Prisma.DateTimeNullableFilter<"IdentityPhoneChallenge"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"IdentityPhoneChallenge"> | Date | string;
};
export type IdentityPhoneChallengeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityPhoneChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.IdentityPhoneChallengeWhereInput | Prisma.IdentityPhoneChallengeWhereInput[];
    OR?: Prisma.IdentityPhoneChallengeWhereInput[];
    NOT?: Prisma.IdentityPhoneChallengeWhereInput | Prisma.IdentityPhoneChallengeWhereInput[];
    phone?: Prisma.StringFilter<"IdentityPhoneChallenge"> | string;
    kind?: Prisma.StringFilter<"IdentityPhoneChallenge"> | string;
    codeHash?: Prisma.StringFilter<"IdentityPhoneChallenge"> | string;
    payload?: Prisma.JsonFilter<"IdentityPhoneChallenge">;
    userId?: Prisma.UuidNullableFilter<"IdentityPhoneChallenge"> | string | null;
    attempts?: Prisma.IntFilter<"IdentityPhoneChallenge"> | number;
    expiresAt?: Prisma.DateTimeFilter<"IdentityPhoneChallenge"> | Date | string;
    consumedAt?: Prisma.DateTimeNullableFilter<"IdentityPhoneChallenge"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"IdentityPhoneChallenge"> | Date | string;
}, "id">;
export type IdentityPhoneChallengeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.IdentityPhoneChallengeCountOrderByAggregateInput;
    _avg?: Prisma.IdentityPhoneChallengeAvgOrderByAggregateInput;
    _max?: Prisma.IdentityPhoneChallengeMaxOrderByAggregateInput;
    _min?: Prisma.IdentityPhoneChallengeMinOrderByAggregateInput;
    _sum?: Prisma.IdentityPhoneChallengeSumOrderByAggregateInput;
};
export type IdentityPhoneChallengeScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentityPhoneChallengeScalarWhereWithAggregatesInput | Prisma.IdentityPhoneChallengeScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentityPhoneChallengeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentityPhoneChallengeScalarWhereWithAggregatesInput | Prisma.IdentityPhoneChallengeScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"IdentityPhoneChallenge"> | string;
    phone?: Prisma.StringWithAggregatesFilter<"IdentityPhoneChallenge"> | string;
    kind?: Prisma.StringWithAggregatesFilter<"IdentityPhoneChallenge"> | string;
    codeHash?: Prisma.StringWithAggregatesFilter<"IdentityPhoneChallenge"> | string;
    payload?: Prisma.JsonWithAggregatesFilter<"IdentityPhoneChallenge">;
    userId?: Prisma.UuidNullableWithAggregatesFilter<"IdentityPhoneChallenge"> | string | null;
    attempts?: Prisma.IntWithAggregatesFilter<"IdentityPhoneChallenge"> | number;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"IdentityPhoneChallenge"> | Date | string;
    consumedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"IdentityPhoneChallenge"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"IdentityPhoneChallenge"> | Date | string;
};
export type IdentityPhoneChallengeCreateInput = {
    id?: string;
    phone: string;
    kind: string;
    codeHash: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    userId?: string | null;
    attempts?: number;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type IdentityPhoneChallengeUncheckedCreateInput = {
    id?: string;
    phone: string;
    kind: string;
    codeHash: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    userId?: string | null;
    attempts?: number;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type IdentityPhoneChallengeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityPhoneChallengeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityPhoneChallengeCreateManyInput = {
    id?: string;
    phone: string;
    kind: string;
    codeHash: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    userId?: string | null;
    attempts?: number;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type IdentityPhoneChallengeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityPhoneChallengeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityPhoneChallengeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityPhoneChallengeAvgOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type IdentityPhoneChallengeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityPhoneChallengeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityPhoneChallengeSumOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type IdentityPhoneChallengeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    phone?: boolean;
    kind?: boolean;
    codeHash?: boolean;
    payload?: boolean;
    userId?: boolean;
    attempts?: boolean;
    expiresAt?: boolean;
    consumedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["identityPhoneChallenge"]>;
export type IdentityPhoneChallengeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    phone?: boolean;
    kind?: boolean;
    codeHash?: boolean;
    payload?: boolean;
    userId?: boolean;
    attempts?: boolean;
    expiresAt?: boolean;
    consumedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["identityPhoneChallenge"]>;
export type IdentityPhoneChallengeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    phone?: boolean;
    kind?: boolean;
    codeHash?: boolean;
    payload?: boolean;
    userId?: boolean;
    attempts?: boolean;
    expiresAt?: boolean;
    consumedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["identityPhoneChallenge"]>;
export type IdentityPhoneChallengeSelectScalar = {
    id?: boolean;
    phone?: boolean;
    kind?: boolean;
    codeHash?: boolean;
    payload?: boolean;
    userId?: boolean;
    attempts?: boolean;
    expiresAt?: boolean;
    consumedAt?: boolean;
    createdAt?: boolean;
};
export type IdentityPhoneChallengeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "phone" | "kind" | "codeHash" | "payload" | "userId" | "attempts" | "expiresAt" | "consumedAt" | "createdAt", ExtArgs["result"]["identityPhoneChallenge"]>;
export type $IdentityPhoneChallengePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdentityPhoneChallenge";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        phone: string;
        kind: string;
        codeHash: string;
        payload: runtime.JsonValue;
        userId: string | null;
        attempts: number;
        expiresAt: Date;
        consumedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["identityPhoneChallenge"]>;
    composites: {};
};
export type IdentityPhoneChallengeGetPayload<S extends boolean | null | undefined | IdentityPhoneChallengeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentityPhoneChallengePayload, S>;
export type IdentityPhoneChallengeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentityPhoneChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentityPhoneChallengeCountAggregateInputType | true;
};
export interface IdentityPhoneChallengeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdentityPhoneChallenge'];
        meta: {
            name: 'IdentityPhoneChallenge';
        };
    };
    findUnique<T extends IdentityPhoneChallengeFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentityPhoneChallengeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentityPhoneChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityPhoneChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentityPhoneChallengeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentityPhoneChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityPhoneChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityPhoneChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentityPhoneChallengeFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentityPhoneChallengeFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentityPhoneChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityPhoneChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentityPhoneChallengeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentityPhoneChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityPhoneChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityPhoneChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentityPhoneChallengeFindManyArgs>(args?: Prisma.SelectSubset<T, IdentityPhoneChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityPhoneChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentityPhoneChallengeCreateArgs>(args: Prisma.SelectSubset<T, IdentityPhoneChallengeCreateArgs<ExtArgs>>): Prisma.Prisma__IdentityPhoneChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityPhoneChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentityPhoneChallengeCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentityPhoneChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentityPhoneChallengeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentityPhoneChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityPhoneChallengePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentityPhoneChallengeDeleteArgs>(args: Prisma.SelectSubset<T, IdentityPhoneChallengeDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentityPhoneChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityPhoneChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentityPhoneChallengeUpdateArgs>(args: Prisma.SelectSubset<T, IdentityPhoneChallengeUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentityPhoneChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityPhoneChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentityPhoneChallengeDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentityPhoneChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentityPhoneChallengeUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentityPhoneChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentityPhoneChallengeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentityPhoneChallengeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityPhoneChallengePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentityPhoneChallengeUpsertArgs>(args: Prisma.SelectSubset<T, IdentityPhoneChallengeUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentityPhoneChallengeClient<runtime.Types.Result.GetResult<Prisma.$IdentityPhoneChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentityPhoneChallengeCountArgs>(args?: Prisma.Subset<T, IdentityPhoneChallengeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentityPhoneChallengeCountAggregateOutputType> : number>;
    aggregate<T extends IdentityPhoneChallengeAggregateArgs>(args: Prisma.Subset<T, IdentityPhoneChallengeAggregateArgs>): Prisma.PrismaPromise<GetIdentityPhoneChallengeAggregateType<T>>;
    groupBy<T extends IdentityPhoneChallengeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentityPhoneChallengeGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentityPhoneChallengeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentityPhoneChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityPhoneChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentityPhoneChallengeFieldRefs;
}
export interface Prisma__IdentityPhoneChallengeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentityPhoneChallengeFieldRefs {
    readonly id: Prisma.FieldRef<"IdentityPhoneChallenge", 'String'>;
    readonly phone: Prisma.FieldRef<"IdentityPhoneChallenge", 'String'>;
    readonly kind: Prisma.FieldRef<"IdentityPhoneChallenge", 'String'>;
    readonly codeHash: Prisma.FieldRef<"IdentityPhoneChallenge", 'String'>;
    readonly payload: Prisma.FieldRef<"IdentityPhoneChallenge", 'Json'>;
    readonly userId: Prisma.FieldRef<"IdentityPhoneChallenge", 'String'>;
    readonly attempts: Prisma.FieldRef<"IdentityPhoneChallenge", 'Int'>;
    readonly expiresAt: Prisma.FieldRef<"IdentityPhoneChallenge", 'DateTime'>;
    readonly consumedAt: Prisma.FieldRef<"IdentityPhoneChallenge", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"IdentityPhoneChallenge", 'DateTime'>;
}
export type IdentityPhoneChallengeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityPhoneChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityPhoneChallengeOmit<ExtArgs> | null;
    where: Prisma.IdentityPhoneChallengeWhereUniqueInput;
};
export type IdentityPhoneChallengeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityPhoneChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityPhoneChallengeOmit<ExtArgs> | null;
    where: Prisma.IdentityPhoneChallengeWhereUniqueInput;
};
export type IdentityPhoneChallengeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityPhoneChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityPhoneChallengeOmit<ExtArgs> | null;
    where?: Prisma.IdentityPhoneChallengeWhereInput;
    orderBy?: Prisma.IdentityPhoneChallengeOrderByWithRelationInput | Prisma.IdentityPhoneChallengeOrderByWithRelationInput[];
    cursor?: Prisma.IdentityPhoneChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityPhoneChallengeScalarFieldEnum | Prisma.IdentityPhoneChallengeScalarFieldEnum[];
};
export type IdentityPhoneChallengeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityPhoneChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityPhoneChallengeOmit<ExtArgs> | null;
    where?: Prisma.IdentityPhoneChallengeWhereInput;
    orderBy?: Prisma.IdentityPhoneChallengeOrderByWithRelationInput | Prisma.IdentityPhoneChallengeOrderByWithRelationInput[];
    cursor?: Prisma.IdentityPhoneChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityPhoneChallengeScalarFieldEnum | Prisma.IdentityPhoneChallengeScalarFieldEnum[];
};
export type IdentityPhoneChallengeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityPhoneChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityPhoneChallengeOmit<ExtArgs> | null;
    where?: Prisma.IdentityPhoneChallengeWhereInput;
    orderBy?: Prisma.IdentityPhoneChallengeOrderByWithRelationInput | Prisma.IdentityPhoneChallengeOrderByWithRelationInput[];
    cursor?: Prisma.IdentityPhoneChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityPhoneChallengeScalarFieldEnum | Prisma.IdentityPhoneChallengeScalarFieldEnum[];
};
export type IdentityPhoneChallengeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityPhoneChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityPhoneChallengeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityPhoneChallengeCreateInput, Prisma.IdentityPhoneChallengeUncheckedCreateInput>;
};
export type IdentityPhoneChallengeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentityPhoneChallengeCreateManyInput | Prisma.IdentityPhoneChallengeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityPhoneChallengeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityPhoneChallengeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityPhoneChallengeOmit<ExtArgs> | null;
    data: Prisma.IdentityPhoneChallengeCreateManyInput | Prisma.IdentityPhoneChallengeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityPhoneChallengeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityPhoneChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityPhoneChallengeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityPhoneChallengeUpdateInput, Prisma.IdentityPhoneChallengeUncheckedUpdateInput>;
    where: Prisma.IdentityPhoneChallengeWhereUniqueInput;
};
export type IdentityPhoneChallengeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentityPhoneChallengeUpdateManyMutationInput, Prisma.IdentityPhoneChallengeUncheckedUpdateManyInput>;
    where?: Prisma.IdentityPhoneChallengeWhereInput;
    limit?: number;
};
export type IdentityPhoneChallengeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityPhoneChallengeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityPhoneChallengeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityPhoneChallengeUpdateManyMutationInput, Prisma.IdentityPhoneChallengeUncheckedUpdateManyInput>;
    where?: Prisma.IdentityPhoneChallengeWhereInput;
    limit?: number;
};
export type IdentityPhoneChallengeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityPhoneChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityPhoneChallengeOmit<ExtArgs> | null;
    where: Prisma.IdentityPhoneChallengeWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityPhoneChallengeCreateInput, Prisma.IdentityPhoneChallengeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentityPhoneChallengeUpdateInput, Prisma.IdentityPhoneChallengeUncheckedUpdateInput>;
};
export type IdentityPhoneChallengeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityPhoneChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityPhoneChallengeOmit<ExtArgs> | null;
    where: Prisma.IdentityPhoneChallengeWhereUniqueInput;
};
export type IdentityPhoneChallengeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityPhoneChallengeWhereInput;
    limit?: number;
};
export type IdentityPhoneChallengeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityPhoneChallengeSelect<ExtArgs> | null;
    omit?: Prisma.IdentityPhoneChallengeOmit<ExtArgs> | null;
};
