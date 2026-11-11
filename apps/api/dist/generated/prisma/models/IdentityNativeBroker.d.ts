import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentityNativeBrokerModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentityNativeBrokerPayload>;
export type AggregateIdentityNativeBroker = {
    _count: IdentityNativeBrokerCountAggregateOutputType | null;
    _avg: IdentityNativeBrokerAvgAggregateOutputType | null;
    _sum: IdentityNativeBrokerSumAggregateOutputType | null;
    _min: IdentityNativeBrokerMinAggregateOutputType | null;
    _max: IdentityNativeBrokerMaxAggregateOutputType | null;
};
export type IdentityNativeBrokerAvgAggregateOutputType = {
    authVersion: number | null;
};
export type IdentityNativeBrokerSumAggregateOutputType = {
    authVersion: number | null;
};
export type IdentityNativeBrokerMinAggregateOutputType = {
    id: string | null;
    provider: string | null;
    challenge: string | null;
    clientState: string | null;
    linkUserId: string | null;
    linkSessionId: string | null;
    oidcState: string | null;
    userId: string | null;
    authVersion: number | null;
    codeHash: string | null;
    expiresAt: Date | null;
    consumedAt: Date | null;
};
export type IdentityNativeBrokerMaxAggregateOutputType = {
    id: string | null;
    provider: string | null;
    challenge: string | null;
    clientState: string | null;
    linkUserId: string | null;
    linkSessionId: string | null;
    oidcState: string | null;
    userId: string | null;
    authVersion: number | null;
    codeHash: string | null;
    expiresAt: Date | null;
    consumedAt: Date | null;
};
export type IdentityNativeBrokerCountAggregateOutputType = {
    id: number;
    provider: number;
    challenge: number;
    clientState: number;
    linkUserId: number;
    linkSessionId: number;
    oidcState: number;
    userId: number;
    authVersion: number;
    codeHash: number;
    expiresAt: number;
    consumedAt: number;
    _all: number;
};
export type IdentityNativeBrokerAvgAggregateInputType = {
    authVersion?: true;
};
export type IdentityNativeBrokerSumAggregateInputType = {
    authVersion?: true;
};
export type IdentityNativeBrokerMinAggregateInputType = {
    id?: true;
    provider?: true;
    challenge?: true;
    clientState?: true;
    linkUserId?: true;
    linkSessionId?: true;
    oidcState?: true;
    userId?: true;
    authVersion?: true;
    codeHash?: true;
    expiresAt?: true;
    consumedAt?: true;
};
export type IdentityNativeBrokerMaxAggregateInputType = {
    id?: true;
    provider?: true;
    challenge?: true;
    clientState?: true;
    linkUserId?: true;
    linkSessionId?: true;
    oidcState?: true;
    userId?: true;
    authVersion?: true;
    codeHash?: true;
    expiresAt?: true;
    consumedAt?: true;
};
export type IdentityNativeBrokerCountAggregateInputType = {
    id?: true;
    provider?: true;
    challenge?: true;
    clientState?: true;
    linkUserId?: true;
    linkSessionId?: true;
    oidcState?: true;
    userId?: true;
    authVersion?: true;
    codeHash?: true;
    expiresAt?: true;
    consumedAt?: true;
    _all?: true;
};
export type IdentityNativeBrokerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityNativeBrokerWhereInput;
    orderBy?: Prisma.IdentityNativeBrokerOrderByWithRelationInput | Prisma.IdentityNativeBrokerOrderByWithRelationInput[];
    cursor?: Prisma.IdentityNativeBrokerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentityNativeBrokerCountAggregateInputType;
    _avg?: IdentityNativeBrokerAvgAggregateInputType;
    _sum?: IdentityNativeBrokerSumAggregateInputType;
    _min?: IdentityNativeBrokerMinAggregateInputType;
    _max?: IdentityNativeBrokerMaxAggregateInputType;
};
export type GetIdentityNativeBrokerAggregateType<T extends IdentityNativeBrokerAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentityNativeBroker]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentityNativeBroker[P]> : Prisma.GetScalarType<T[P], AggregateIdentityNativeBroker[P]>;
};
export type IdentityNativeBrokerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityNativeBrokerWhereInput;
    orderBy?: Prisma.IdentityNativeBrokerOrderByWithAggregationInput | Prisma.IdentityNativeBrokerOrderByWithAggregationInput[];
    by: Prisma.IdentityNativeBrokerScalarFieldEnum[] | Prisma.IdentityNativeBrokerScalarFieldEnum;
    having?: Prisma.IdentityNativeBrokerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentityNativeBrokerCountAggregateInputType | true;
    _avg?: IdentityNativeBrokerAvgAggregateInputType;
    _sum?: IdentityNativeBrokerSumAggregateInputType;
    _min?: IdentityNativeBrokerMinAggregateInputType;
    _max?: IdentityNativeBrokerMaxAggregateInputType;
};
export type IdentityNativeBrokerGroupByOutputType = {
    id: string;
    provider: string;
    challenge: string;
    clientState: string;
    linkUserId: string | null;
    linkSessionId: string | null;
    oidcState: string | null;
    userId: string | null;
    authVersion: number | null;
    codeHash: string | null;
    expiresAt: Date;
    consumedAt: Date | null;
    _count: IdentityNativeBrokerCountAggregateOutputType | null;
    _avg: IdentityNativeBrokerAvgAggregateOutputType | null;
    _sum: IdentityNativeBrokerSumAggregateOutputType | null;
    _min: IdentityNativeBrokerMinAggregateOutputType | null;
    _max: IdentityNativeBrokerMaxAggregateOutputType | null;
};
export type GetIdentityNativeBrokerGroupByPayload<T extends IdentityNativeBrokerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentityNativeBrokerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentityNativeBrokerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentityNativeBrokerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentityNativeBrokerGroupByOutputType[P]>;
}>>;
export type IdentityNativeBrokerWhereInput = {
    AND?: Prisma.IdentityNativeBrokerWhereInput | Prisma.IdentityNativeBrokerWhereInput[];
    OR?: Prisma.IdentityNativeBrokerWhereInput[];
    NOT?: Prisma.IdentityNativeBrokerWhereInput | Prisma.IdentityNativeBrokerWhereInput[];
    id?: Prisma.UuidFilter<"IdentityNativeBroker"> | string;
    provider?: Prisma.StringFilter<"IdentityNativeBroker"> | string;
    challenge?: Prisma.StringFilter<"IdentityNativeBroker"> | string;
    clientState?: Prisma.StringFilter<"IdentityNativeBroker"> | string;
    linkUserId?: Prisma.UuidNullableFilter<"IdentityNativeBroker"> | string | null;
    linkSessionId?: Prisma.StringNullableFilter<"IdentityNativeBroker"> | string | null;
    oidcState?: Prisma.StringNullableFilter<"IdentityNativeBroker"> | string | null;
    userId?: Prisma.UuidNullableFilter<"IdentityNativeBroker"> | string | null;
    authVersion?: Prisma.IntNullableFilter<"IdentityNativeBroker"> | number | null;
    codeHash?: Prisma.StringNullableFilter<"IdentityNativeBroker"> | string | null;
    expiresAt?: Prisma.DateTimeFilter<"IdentityNativeBroker"> | Date | string;
    consumedAt?: Prisma.DateTimeNullableFilter<"IdentityNativeBroker"> | Date | string | null;
};
export type IdentityNativeBrokerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    challenge?: Prisma.SortOrder;
    clientState?: Prisma.SortOrder;
    linkUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    linkSessionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    oidcState?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    authVersion?: Prisma.SortOrderInput | Prisma.SortOrder;
    codeHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type IdentityNativeBrokerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    oidcState?: string;
    AND?: Prisma.IdentityNativeBrokerWhereInput | Prisma.IdentityNativeBrokerWhereInput[];
    OR?: Prisma.IdentityNativeBrokerWhereInput[];
    NOT?: Prisma.IdentityNativeBrokerWhereInput | Prisma.IdentityNativeBrokerWhereInput[];
    provider?: Prisma.StringFilter<"IdentityNativeBroker"> | string;
    challenge?: Prisma.StringFilter<"IdentityNativeBroker"> | string;
    clientState?: Prisma.StringFilter<"IdentityNativeBroker"> | string;
    linkUserId?: Prisma.UuidNullableFilter<"IdentityNativeBroker"> | string | null;
    linkSessionId?: Prisma.StringNullableFilter<"IdentityNativeBroker"> | string | null;
    userId?: Prisma.UuidNullableFilter<"IdentityNativeBroker"> | string | null;
    authVersion?: Prisma.IntNullableFilter<"IdentityNativeBroker"> | number | null;
    codeHash?: Prisma.StringNullableFilter<"IdentityNativeBroker"> | string | null;
    expiresAt?: Prisma.DateTimeFilter<"IdentityNativeBroker"> | Date | string;
    consumedAt?: Prisma.DateTimeNullableFilter<"IdentityNativeBroker"> | Date | string | null;
}, "id" | "oidcState">;
export type IdentityNativeBrokerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    challenge?: Prisma.SortOrder;
    clientState?: Prisma.SortOrder;
    linkUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    linkSessionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    oidcState?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    authVersion?: Prisma.SortOrderInput | Prisma.SortOrder;
    codeHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.IdentityNativeBrokerCountOrderByAggregateInput;
    _avg?: Prisma.IdentityNativeBrokerAvgOrderByAggregateInput;
    _max?: Prisma.IdentityNativeBrokerMaxOrderByAggregateInput;
    _min?: Prisma.IdentityNativeBrokerMinOrderByAggregateInput;
    _sum?: Prisma.IdentityNativeBrokerSumOrderByAggregateInput;
};
export type IdentityNativeBrokerScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentityNativeBrokerScalarWhereWithAggregatesInput | Prisma.IdentityNativeBrokerScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentityNativeBrokerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentityNativeBrokerScalarWhereWithAggregatesInput | Prisma.IdentityNativeBrokerScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"IdentityNativeBroker"> | string;
    provider?: Prisma.StringWithAggregatesFilter<"IdentityNativeBroker"> | string;
    challenge?: Prisma.StringWithAggregatesFilter<"IdentityNativeBroker"> | string;
    clientState?: Prisma.StringWithAggregatesFilter<"IdentityNativeBroker"> | string;
    linkUserId?: Prisma.UuidNullableWithAggregatesFilter<"IdentityNativeBroker"> | string | null;
    linkSessionId?: Prisma.StringNullableWithAggregatesFilter<"IdentityNativeBroker"> | string | null;
    oidcState?: Prisma.StringNullableWithAggregatesFilter<"IdentityNativeBroker"> | string | null;
    userId?: Prisma.UuidNullableWithAggregatesFilter<"IdentityNativeBroker"> | string | null;
    authVersion?: Prisma.IntNullableWithAggregatesFilter<"IdentityNativeBroker"> | number | null;
    codeHash?: Prisma.StringNullableWithAggregatesFilter<"IdentityNativeBroker"> | string | null;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"IdentityNativeBroker"> | Date | string;
    consumedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"IdentityNativeBroker"> | Date | string | null;
};
export type IdentityNativeBrokerCreateInput = {
    id?: string;
    provider: string;
    challenge: string;
    clientState: string;
    linkUserId?: string | null;
    linkSessionId?: string | null;
    oidcState?: string | null;
    userId?: string | null;
    authVersion?: number | null;
    codeHash?: string | null;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
};
export type IdentityNativeBrokerUncheckedCreateInput = {
    id?: string;
    provider: string;
    challenge: string;
    clientState: string;
    linkUserId?: string | null;
    linkSessionId?: string | null;
    oidcState?: string | null;
    userId?: string | null;
    authVersion?: number | null;
    codeHash?: string | null;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
};
export type IdentityNativeBrokerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    challenge?: Prisma.StringFieldUpdateOperationsInput | string;
    clientState?: Prisma.StringFieldUpdateOperationsInput | string;
    linkUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    linkSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oidcState?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authVersion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    codeHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IdentityNativeBrokerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    challenge?: Prisma.StringFieldUpdateOperationsInput | string;
    clientState?: Prisma.StringFieldUpdateOperationsInput | string;
    linkUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    linkSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oidcState?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authVersion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    codeHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IdentityNativeBrokerCreateManyInput = {
    id?: string;
    provider: string;
    challenge: string;
    clientState: string;
    linkUserId?: string | null;
    linkSessionId?: string | null;
    oidcState?: string | null;
    userId?: string | null;
    authVersion?: number | null;
    codeHash?: string | null;
    expiresAt: Date | string;
    consumedAt?: Date | string | null;
};
export type IdentityNativeBrokerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    challenge?: Prisma.StringFieldUpdateOperationsInput | string;
    clientState?: Prisma.StringFieldUpdateOperationsInput | string;
    linkUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    linkSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oidcState?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authVersion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    codeHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IdentityNativeBrokerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    challenge?: Prisma.StringFieldUpdateOperationsInput | string;
    clientState?: Prisma.StringFieldUpdateOperationsInput | string;
    linkUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    linkSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oidcState?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authVersion?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    codeHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IdentityNativeBrokerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    challenge?: Prisma.SortOrder;
    clientState?: Prisma.SortOrder;
    linkUserId?: Prisma.SortOrder;
    linkSessionId?: Prisma.SortOrder;
    oidcState?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrder;
};
export type IdentityNativeBrokerAvgOrderByAggregateInput = {
    authVersion?: Prisma.SortOrder;
};
export type IdentityNativeBrokerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    challenge?: Prisma.SortOrder;
    clientState?: Prisma.SortOrder;
    linkUserId?: Prisma.SortOrder;
    linkSessionId?: Prisma.SortOrder;
    oidcState?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrder;
};
export type IdentityNativeBrokerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    challenge?: Prisma.SortOrder;
    clientState?: Prisma.SortOrder;
    linkUserId?: Prisma.SortOrder;
    linkSessionId?: Prisma.SortOrder;
    oidcState?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    authVersion?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    consumedAt?: Prisma.SortOrder;
};
export type IdentityNativeBrokerSumOrderByAggregateInput = {
    authVersion?: Prisma.SortOrder;
};
export type IdentityNativeBrokerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    provider?: boolean;
    challenge?: boolean;
    clientState?: boolean;
    linkUserId?: boolean;
    linkSessionId?: boolean;
    oidcState?: boolean;
    userId?: boolean;
    authVersion?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    consumedAt?: boolean;
}, ExtArgs["result"]["identityNativeBroker"]>;
export type IdentityNativeBrokerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    provider?: boolean;
    challenge?: boolean;
    clientState?: boolean;
    linkUserId?: boolean;
    linkSessionId?: boolean;
    oidcState?: boolean;
    userId?: boolean;
    authVersion?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    consumedAt?: boolean;
}, ExtArgs["result"]["identityNativeBroker"]>;
export type IdentityNativeBrokerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    provider?: boolean;
    challenge?: boolean;
    clientState?: boolean;
    linkUserId?: boolean;
    linkSessionId?: boolean;
    oidcState?: boolean;
    userId?: boolean;
    authVersion?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    consumedAt?: boolean;
}, ExtArgs["result"]["identityNativeBroker"]>;
export type IdentityNativeBrokerSelectScalar = {
    id?: boolean;
    provider?: boolean;
    challenge?: boolean;
    clientState?: boolean;
    linkUserId?: boolean;
    linkSessionId?: boolean;
    oidcState?: boolean;
    userId?: boolean;
    authVersion?: boolean;
    codeHash?: boolean;
    expiresAt?: boolean;
    consumedAt?: boolean;
};
export type IdentityNativeBrokerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "provider" | "challenge" | "clientState" | "linkUserId" | "linkSessionId" | "oidcState" | "userId" | "authVersion" | "codeHash" | "expiresAt" | "consumedAt", ExtArgs["result"]["identityNativeBroker"]>;
export type $IdentityNativeBrokerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdentityNativeBroker";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        provider: string;
        challenge: string;
        clientState: string;
        linkUserId: string | null;
        linkSessionId: string | null;
        oidcState: string | null;
        userId: string | null;
        authVersion: number | null;
        codeHash: string | null;
        expiresAt: Date;
        consumedAt: Date | null;
    }, ExtArgs["result"]["identityNativeBroker"]>;
    composites: {};
};
export type IdentityNativeBrokerGetPayload<S extends boolean | null | undefined | IdentityNativeBrokerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentityNativeBrokerPayload, S>;
export type IdentityNativeBrokerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentityNativeBrokerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentityNativeBrokerCountAggregateInputType | true;
};
export interface IdentityNativeBrokerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdentityNativeBroker'];
        meta: {
            name: 'IdentityNativeBroker';
        };
    };
    findUnique<T extends IdentityNativeBrokerFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentityNativeBrokerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentityNativeBrokerClient<runtime.Types.Result.GetResult<Prisma.$IdentityNativeBrokerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentityNativeBrokerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentityNativeBrokerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityNativeBrokerClient<runtime.Types.Result.GetResult<Prisma.$IdentityNativeBrokerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentityNativeBrokerFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentityNativeBrokerFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentityNativeBrokerClient<runtime.Types.Result.GetResult<Prisma.$IdentityNativeBrokerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentityNativeBrokerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentityNativeBrokerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityNativeBrokerClient<runtime.Types.Result.GetResult<Prisma.$IdentityNativeBrokerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentityNativeBrokerFindManyArgs>(args?: Prisma.SelectSubset<T, IdentityNativeBrokerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityNativeBrokerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentityNativeBrokerCreateArgs>(args: Prisma.SelectSubset<T, IdentityNativeBrokerCreateArgs<ExtArgs>>): Prisma.Prisma__IdentityNativeBrokerClient<runtime.Types.Result.GetResult<Prisma.$IdentityNativeBrokerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentityNativeBrokerCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentityNativeBrokerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentityNativeBrokerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentityNativeBrokerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityNativeBrokerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentityNativeBrokerDeleteArgs>(args: Prisma.SelectSubset<T, IdentityNativeBrokerDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentityNativeBrokerClient<runtime.Types.Result.GetResult<Prisma.$IdentityNativeBrokerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentityNativeBrokerUpdateArgs>(args: Prisma.SelectSubset<T, IdentityNativeBrokerUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentityNativeBrokerClient<runtime.Types.Result.GetResult<Prisma.$IdentityNativeBrokerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentityNativeBrokerDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentityNativeBrokerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentityNativeBrokerUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentityNativeBrokerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentityNativeBrokerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentityNativeBrokerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityNativeBrokerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentityNativeBrokerUpsertArgs>(args: Prisma.SelectSubset<T, IdentityNativeBrokerUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentityNativeBrokerClient<runtime.Types.Result.GetResult<Prisma.$IdentityNativeBrokerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentityNativeBrokerCountArgs>(args?: Prisma.Subset<T, IdentityNativeBrokerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentityNativeBrokerCountAggregateOutputType> : number>;
    aggregate<T extends IdentityNativeBrokerAggregateArgs>(args: Prisma.Subset<T, IdentityNativeBrokerAggregateArgs>): Prisma.PrismaPromise<GetIdentityNativeBrokerAggregateType<T>>;
    groupBy<T extends IdentityNativeBrokerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentityNativeBrokerGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentityNativeBrokerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentityNativeBrokerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityNativeBrokerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentityNativeBrokerFieldRefs;
}
export interface Prisma__IdentityNativeBrokerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentityNativeBrokerFieldRefs {
    readonly id: Prisma.FieldRef<"IdentityNativeBroker", 'String'>;
    readonly provider: Prisma.FieldRef<"IdentityNativeBroker", 'String'>;
    readonly challenge: Prisma.FieldRef<"IdentityNativeBroker", 'String'>;
    readonly clientState: Prisma.FieldRef<"IdentityNativeBroker", 'String'>;
    readonly linkUserId: Prisma.FieldRef<"IdentityNativeBroker", 'String'>;
    readonly linkSessionId: Prisma.FieldRef<"IdentityNativeBroker", 'String'>;
    readonly oidcState: Prisma.FieldRef<"IdentityNativeBroker", 'String'>;
    readonly userId: Prisma.FieldRef<"IdentityNativeBroker", 'String'>;
    readonly authVersion: Prisma.FieldRef<"IdentityNativeBroker", 'Int'>;
    readonly codeHash: Prisma.FieldRef<"IdentityNativeBroker", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"IdentityNativeBroker", 'DateTime'>;
    readonly consumedAt: Prisma.FieldRef<"IdentityNativeBroker", 'DateTime'>;
}
export type IdentityNativeBrokerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityNativeBrokerSelect<ExtArgs> | null;
    omit?: Prisma.IdentityNativeBrokerOmit<ExtArgs> | null;
    where: Prisma.IdentityNativeBrokerWhereUniqueInput;
};
export type IdentityNativeBrokerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityNativeBrokerSelect<ExtArgs> | null;
    omit?: Prisma.IdentityNativeBrokerOmit<ExtArgs> | null;
    where: Prisma.IdentityNativeBrokerWhereUniqueInput;
};
export type IdentityNativeBrokerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityNativeBrokerSelect<ExtArgs> | null;
    omit?: Prisma.IdentityNativeBrokerOmit<ExtArgs> | null;
    where?: Prisma.IdentityNativeBrokerWhereInput;
    orderBy?: Prisma.IdentityNativeBrokerOrderByWithRelationInput | Prisma.IdentityNativeBrokerOrderByWithRelationInput[];
    cursor?: Prisma.IdentityNativeBrokerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityNativeBrokerScalarFieldEnum | Prisma.IdentityNativeBrokerScalarFieldEnum[];
};
export type IdentityNativeBrokerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityNativeBrokerSelect<ExtArgs> | null;
    omit?: Prisma.IdentityNativeBrokerOmit<ExtArgs> | null;
    where?: Prisma.IdentityNativeBrokerWhereInput;
    orderBy?: Prisma.IdentityNativeBrokerOrderByWithRelationInput | Prisma.IdentityNativeBrokerOrderByWithRelationInput[];
    cursor?: Prisma.IdentityNativeBrokerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityNativeBrokerScalarFieldEnum | Prisma.IdentityNativeBrokerScalarFieldEnum[];
};
export type IdentityNativeBrokerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityNativeBrokerSelect<ExtArgs> | null;
    omit?: Prisma.IdentityNativeBrokerOmit<ExtArgs> | null;
    where?: Prisma.IdentityNativeBrokerWhereInput;
    orderBy?: Prisma.IdentityNativeBrokerOrderByWithRelationInput | Prisma.IdentityNativeBrokerOrderByWithRelationInput[];
    cursor?: Prisma.IdentityNativeBrokerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityNativeBrokerScalarFieldEnum | Prisma.IdentityNativeBrokerScalarFieldEnum[];
};
export type IdentityNativeBrokerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityNativeBrokerSelect<ExtArgs> | null;
    omit?: Prisma.IdentityNativeBrokerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityNativeBrokerCreateInput, Prisma.IdentityNativeBrokerUncheckedCreateInput>;
};
export type IdentityNativeBrokerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentityNativeBrokerCreateManyInput | Prisma.IdentityNativeBrokerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityNativeBrokerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityNativeBrokerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityNativeBrokerOmit<ExtArgs> | null;
    data: Prisma.IdentityNativeBrokerCreateManyInput | Prisma.IdentityNativeBrokerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityNativeBrokerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityNativeBrokerSelect<ExtArgs> | null;
    omit?: Prisma.IdentityNativeBrokerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityNativeBrokerUpdateInput, Prisma.IdentityNativeBrokerUncheckedUpdateInput>;
    where: Prisma.IdentityNativeBrokerWhereUniqueInput;
};
export type IdentityNativeBrokerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentityNativeBrokerUpdateManyMutationInput, Prisma.IdentityNativeBrokerUncheckedUpdateManyInput>;
    where?: Prisma.IdentityNativeBrokerWhereInput;
    limit?: number;
};
export type IdentityNativeBrokerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityNativeBrokerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityNativeBrokerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityNativeBrokerUpdateManyMutationInput, Prisma.IdentityNativeBrokerUncheckedUpdateManyInput>;
    where?: Prisma.IdentityNativeBrokerWhereInput;
    limit?: number;
};
export type IdentityNativeBrokerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityNativeBrokerSelect<ExtArgs> | null;
    omit?: Prisma.IdentityNativeBrokerOmit<ExtArgs> | null;
    where: Prisma.IdentityNativeBrokerWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityNativeBrokerCreateInput, Prisma.IdentityNativeBrokerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentityNativeBrokerUpdateInput, Prisma.IdentityNativeBrokerUncheckedUpdateInput>;
};
export type IdentityNativeBrokerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityNativeBrokerSelect<ExtArgs> | null;
    omit?: Prisma.IdentityNativeBrokerOmit<ExtArgs> | null;
    where: Prisma.IdentityNativeBrokerWhereUniqueInput;
};
export type IdentityNativeBrokerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityNativeBrokerWhereInput;
    limit?: number;
};
export type IdentityNativeBrokerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityNativeBrokerSelect<ExtArgs> | null;
    omit?: Prisma.IdentityNativeBrokerOmit<ExtArgs> | null;
};
