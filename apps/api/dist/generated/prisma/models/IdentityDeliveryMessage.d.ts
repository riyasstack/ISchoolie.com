import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentityDeliveryMessageModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentityDeliveryMessagePayload>;
export type AggregateIdentityDeliveryMessage = {
    _count: IdentityDeliveryMessageCountAggregateOutputType | null;
    _avg: IdentityDeliveryMessageAvgAggregateOutputType | null;
    _sum: IdentityDeliveryMessageSumAggregateOutputType | null;
    _min: IdentityDeliveryMessageMinAggregateOutputType | null;
    _max: IdentityDeliveryMessageMaxAggregateOutputType | null;
};
export type IdentityDeliveryMessageAvgAggregateOutputType = {
    attempts: number | null;
};
export type IdentityDeliveryMessageSumAggregateOutputType = {
    attempts: number | null;
};
export type IdentityDeliveryMessageMinAggregateOutputType = {
    id: string | null;
    channel: string | null;
    transport: string | null;
    kind: string | null;
    payload: string | null;
    status: string | null;
    attempts: number | null;
    nextAttemptAt: Date | null;
    leaseUntil: Date | null;
    expiresAt: Date | null;
    providerReceipt: string | null;
    errorCode: string | null;
    createdAt: Date | null;
};
export type IdentityDeliveryMessageMaxAggregateOutputType = {
    id: string | null;
    channel: string | null;
    transport: string | null;
    kind: string | null;
    payload: string | null;
    status: string | null;
    attempts: number | null;
    nextAttemptAt: Date | null;
    leaseUntil: Date | null;
    expiresAt: Date | null;
    providerReceipt: string | null;
    errorCode: string | null;
    createdAt: Date | null;
};
export type IdentityDeliveryMessageCountAggregateOutputType = {
    id: number;
    channel: number;
    transport: number;
    kind: number;
    payload: number;
    status: number;
    attempts: number;
    nextAttemptAt: number;
    leaseUntil: number;
    expiresAt: number;
    providerReceipt: number;
    errorCode: number;
    createdAt: number;
    _all: number;
};
export type IdentityDeliveryMessageAvgAggregateInputType = {
    attempts?: true;
};
export type IdentityDeliveryMessageSumAggregateInputType = {
    attempts?: true;
};
export type IdentityDeliveryMessageMinAggregateInputType = {
    id?: true;
    channel?: true;
    transport?: true;
    kind?: true;
    payload?: true;
    status?: true;
    attempts?: true;
    nextAttemptAt?: true;
    leaseUntil?: true;
    expiresAt?: true;
    providerReceipt?: true;
    errorCode?: true;
    createdAt?: true;
};
export type IdentityDeliveryMessageMaxAggregateInputType = {
    id?: true;
    channel?: true;
    transport?: true;
    kind?: true;
    payload?: true;
    status?: true;
    attempts?: true;
    nextAttemptAt?: true;
    leaseUntil?: true;
    expiresAt?: true;
    providerReceipt?: true;
    errorCode?: true;
    createdAt?: true;
};
export type IdentityDeliveryMessageCountAggregateInputType = {
    id?: true;
    channel?: true;
    transport?: true;
    kind?: true;
    payload?: true;
    status?: true;
    attempts?: true;
    nextAttemptAt?: true;
    leaseUntil?: true;
    expiresAt?: true;
    providerReceipt?: true;
    errorCode?: true;
    createdAt?: true;
    _all?: true;
};
export type IdentityDeliveryMessageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityDeliveryMessageWhereInput;
    orderBy?: Prisma.IdentityDeliveryMessageOrderByWithRelationInput | Prisma.IdentityDeliveryMessageOrderByWithRelationInput[];
    cursor?: Prisma.IdentityDeliveryMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentityDeliveryMessageCountAggregateInputType;
    _avg?: IdentityDeliveryMessageAvgAggregateInputType;
    _sum?: IdentityDeliveryMessageSumAggregateInputType;
    _min?: IdentityDeliveryMessageMinAggregateInputType;
    _max?: IdentityDeliveryMessageMaxAggregateInputType;
};
export type GetIdentityDeliveryMessageAggregateType<T extends IdentityDeliveryMessageAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentityDeliveryMessage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentityDeliveryMessage[P]> : Prisma.GetScalarType<T[P], AggregateIdentityDeliveryMessage[P]>;
};
export type IdentityDeliveryMessageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityDeliveryMessageWhereInput;
    orderBy?: Prisma.IdentityDeliveryMessageOrderByWithAggregationInput | Prisma.IdentityDeliveryMessageOrderByWithAggregationInput[];
    by: Prisma.IdentityDeliveryMessageScalarFieldEnum[] | Prisma.IdentityDeliveryMessageScalarFieldEnum;
    having?: Prisma.IdentityDeliveryMessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentityDeliveryMessageCountAggregateInputType | true;
    _avg?: IdentityDeliveryMessageAvgAggregateInputType;
    _sum?: IdentityDeliveryMessageSumAggregateInputType;
    _min?: IdentityDeliveryMessageMinAggregateInputType;
    _max?: IdentityDeliveryMessageMaxAggregateInputType;
};
export type IdentityDeliveryMessageGroupByOutputType = {
    id: string;
    channel: string;
    transport: string;
    kind: string;
    payload: string | null;
    status: string;
    attempts: number;
    nextAttemptAt: Date;
    leaseUntil: Date | null;
    expiresAt: Date;
    providerReceipt: string | null;
    errorCode: string | null;
    createdAt: Date;
    _count: IdentityDeliveryMessageCountAggregateOutputType | null;
    _avg: IdentityDeliveryMessageAvgAggregateOutputType | null;
    _sum: IdentityDeliveryMessageSumAggregateOutputType | null;
    _min: IdentityDeliveryMessageMinAggregateOutputType | null;
    _max: IdentityDeliveryMessageMaxAggregateOutputType | null;
};
export type GetIdentityDeliveryMessageGroupByPayload<T extends IdentityDeliveryMessageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentityDeliveryMessageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentityDeliveryMessageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentityDeliveryMessageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentityDeliveryMessageGroupByOutputType[P]>;
}>>;
export type IdentityDeliveryMessageWhereInput = {
    AND?: Prisma.IdentityDeliveryMessageWhereInput | Prisma.IdentityDeliveryMessageWhereInput[];
    OR?: Prisma.IdentityDeliveryMessageWhereInput[];
    NOT?: Prisma.IdentityDeliveryMessageWhereInput | Prisma.IdentityDeliveryMessageWhereInput[];
    id?: Prisma.UuidFilter<"IdentityDeliveryMessage"> | string;
    channel?: Prisma.StringFilter<"IdentityDeliveryMessage"> | string;
    transport?: Prisma.StringFilter<"IdentityDeliveryMessage"> | string;
    kind?: Prisma.StringFilter<"IdentityDeliveryMessage"> | string;
    payload?: Prisma.StringNullableFilter<"IdentityDeliveryMessage"> | string | null;
    status?: Prisma.StringFilter<"IdentityDeliveryMessage"> | string;
    attempts?: Prisma.IntFilter<"IdentityDeliveryMessage"> | number;
    nextAttemptAt?: Prisma.DateTimeFilter<"IdentityDeliveryMessage"> | Date | string;
    leaseUntil?: Prisma.DateTimeNullableFilter<"IdentityDeliveryMessage"> | Date | string | null;
    expiresAt?: Prisma.DateTimeFilter<"IdentityDeliveryMessage"> | Date | string;
    providerReceipt?: Prisma.StringNullableFilter<"IdentityDeliveryMessage"> | string | null;
    errorCode?: Prisma.StringNullableFilter<"IdentityDeliveryMessage"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"IdentityDeliveryMessage"> | Date | string;
};
export type IdentityDeliveryMessageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    transport?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    payload?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    nextAttemptAt?: Prisma.SortOrder;
    leaseUntil?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    providerReceipt?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityDeliveryMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.IdentityDeliveryMessageWhereInput | Prisma.IdentityDeliveryMessageWhereInput[];
    OR?: Prisma.IdentityDeliveryMessageWhereInput[];
    NOT?: Prisma.IdentityDeliveryMessageWhereInput | Prisma.IdentityDeliveryMessageWhereInput[];
    channel?: Prisma.StringFilter<"IdentityDeliveryMessage"> | string;
    transport?: Prisma.StringFilter<"IdentityDeliveryMessage"> | string;
    kind?: Prisma.StringFilter<"IdentityDeliveryMessage"> | string;
    payload?: Prisma.StringNullableFilter<"IdentityDeliveryMessage"> | string | null;
    status?: Prisma.StringFilter<"IdentityDeliveryMessage"> | string;
    attempts?: Prisma.IntFilter<"IdentityDeliveryMessage"> | number;
    nextAttemptAt?: Prisma.DateTimeFilter<"IdentityDeliveryMessage"> | Date | string;
    leaseUntil?: Prisma.DateTimeNullableFilter<"IdentityDeliveryMessage"> | Date | string | null;
    expiresAt?: Prisma.DateTimeFilter<"IdentityDeliveryMessage"> | Date | string;
    providerReceipt?: Prisma.StringNullableFilter<"IdentityDeliveryMessage"> | string | null;
    errorCode?: Prisma.StringNullableFilter<"IdentityDeliveryMessage"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"IdentityDeliveryMessage"> | Date | string;
}, "id">;
export type IdentityDeliveryMessageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    transport?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    payload?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    nextAttemptAt?: Prisma.SortOrder;
    leaseUntil?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    providerReceipt?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.IdentityDeliveryMessageCountOrderByAggregateInput;
    _avg?: Prisma.IdentityDeliveryMessageAvgOrderByAggregateInput;
    _max?: Prisma.IdentityDeliveryMessageMaxOrderByAggregateInput;
    _min?: Prisma.IdentityDeliveryMessageMinOrderByAggregateInput;
    _sum?: Prisma.IdentityDeliveryMessageSumOrderByAggregateInput;
};
export type IdentityDeliveryMessageScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentityDeliveryMessageScalarWhereWithAggregatesInput | Prisma.IdentityDeliveryMessageScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentityDeliveryMessageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentityDeliveryMessageScalarWhereWithAggregatesInput | Prisma.IdentityDeliveryMessageScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"IdentityDeliveryMessage"> | string;
    channel?: Prisma.StringWithAggregatesFilter<"IdentityDeliveryMessage"> | string;
    transport?: Prisma.StringWithAggregatesFilter<"IdentityDeliveryMessage"> | string;
    kind?: Prisma.StringWithAggregatesFilter<"IdentityDeliveryMessage"> | string;
    payload?: Prisma.StringNullableWithAggregatesFilter<"IdentityDeliveryMessage"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"IdentityDeliveryMessage"> | string;
    attempts?: Prisma.IntWithAggregatesFilter<"IdentityDeliveryMessage"> | number;
    nextAttemptAt?: Prisma.DateTimeWithAggregatesFilter<"IdentityDeliveryMessage"> | Date | string;
    leaseUntil?: Prisma.DateTimeNullableWithAggregatesFilter<"IdentityDeliveryMessage"> | Date | string | null;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"IdentityDeliveryMessage"> | Date | string;
    providerReceipt?: Prisma.StringNullableWithAggregatesFilter<"IdentityDeliveryMessage"> | string | null;
    errorCode?: Prisma.StringNullableWithAggregatesFilter<"IdentityDeliveryMessage"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"IdentityDeliveryMessage"> | Date | string;
};
export type IdentityDeliveryMessageCreateInput = {
    id?: string;
    channel: string;
    transport?: string;
    kind: string;
    payload?: string | null;
    status?: string;
    attempts?: number;
    nextAttemptAt?: Date | string;
    leaseUntil?: Date | string | null;
    expiresAt: Date | string;
    providerReceipt?: string | null;
    errorCode?: string | null;
    createdAt?: Date | string;
};
export type IdentityDeliveryMessageUncheckedCreateInput = {
    id?: string;
    channel: string;
    transport?: string;
    kind: string;
    payload?: string | null;
    status?: string;
    attempts?: number;
    nextAttemptAt?: Date | string;
    leaseUntil?: Date | string | null;
    expiresAt: Date | string;
    providerReceipt?: string | null;
    errorCode?: string | null;
    createdAt?: Date | string;
};
export type IdentityDeliveryMessageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    transport?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    nextAttemptAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leaseUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    providerReceipt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityDeliveryMessageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    transport?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    nextAttemptAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leaseUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    providerReceipt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityDeliveryMessageCreateManyInput = {
    id?: string;
    channel: string;
    transport?: string;
    kind: string;
    payload?: string | null;
    status?: string;
    attempts?: number;
    nextAttemptAt?: Date | string;
    leaseUntil?: Date | string | null;
    expiresAt: Date | string;
    providerReceipt?: string | null;
    errorCode?: string | null;
    createdAt?: Date | string;
};
export type IdentityDeliveryMessageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    transport?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    nextAttemptAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leaseUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    providerReceipt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityDeliveryMessageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    transport?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    nextAttemptAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leaseUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    providerReceipt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityDeliveryMessageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    transport?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    nextAttemptAt?: Prisma.SortOrder;
    leaseUntil?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    providerReceipt?: Prisma.SortOrder;
    errorCode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityDeliveryMessageAvgOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type IdentityDeliveryMessageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    transport?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    nextAttemptAt?: Prisma.SortOrder;
    leaseUntil?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    providerReceipt?: Prisma.SortOrder;
    errorCode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityDeliveryMessageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    transport?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    nextAttemptAt?: Prisma.SortOrder;
    leaseUntil?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    providerReceipt?: Prisma.SortOrder;
    errorCode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IdentityDeliveryMessageSumOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type IdentityDeliveryMessageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    channel?: boolean;
    transport?: boolean;
    kind?: boolean;
    payload?: boolean;
    status?: boolean;
    attempts?: boolean;
    nextAttemptAt?: boolean;
    leaseUntil?: boolean;
    expiresAt?: boolean;
    providerReceipt?: boolean;
    errorCode?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["identityDeliveryMessage"]>;
export type IdentityDeliveryMessageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    channel?: boolean;
    transport?: boolean;
    kind?: boolean;
    payload?: boolean;
    status?: boolean;
    attempts?: boolean;
    nextAttemptAt?: boolean;
    leaseUntil?: boolean;
    expiresAt?: boolean;
    providerReceipt?: boolean;
    errorCode?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["identityDeliveryMessage"]>;
export type IdentityDeliveryMessageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    channel?: boolean;
    transport?: boolean;
    kind?: boolean;
    payload?: boolean;
    status?: boolean;
    attempts?: boolean;
    nextAttemptAt?: boolean;
    leaseUntil?: boolean;
    expiresAt?: boolean;
    providerReceipt?: boolean;
    errorCode?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["identityDeliveryMessage"]>;
export type IdentityDeliveryMessageSelectScalar = {
    id?: boolean;
    channel?: boolean;
    transport?: boolean;
    kind?: boolean;
    payload?: boolean;
    status?: boolean;
    attempts?: boolean;
    nextAttemptAt?: boolean;
    leaseUntil?: boolean;
    expiresAt?: boolean;
    providerReceipt?: boolean;
    errorCode?: boolean;
    createdAt?: boolean;
};
export type IdentityDeliveryMessageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "channel" | "transport" | "kind" | "payload" | "status" | "attempts" | "nextAttemptAt" | "leaseUntil" | "expiresAt" | "providerReceipt" | "errorCode" | "createdAt", ExtArgs["result"]["identityDeliveryMessage"]>;
export type $IdentityDeliveryMessagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IdentityDeliveryMessage";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        channel: string;
        transport: string;
        kind: string;
        payload: string | null;
        status: string;
        attempts: number;
        nextAttemptAt: Date;
        leaseUntil: Date | null;
        expiresAt: Date;
        providerReceipt: string | null;
        errorCode: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["identityDeliveryMessage"]>;
    composites: {};
};
export type IdentityDeliveryMessageGetPayload<S extends boolean | null | undefined | IdentityDeliveryMessageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentityDeliveryMessagePayload, S>;
export type IdentityDeliveryMessageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentityDeliveryMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentityDeliveryMessageCountAggregateInputType | true;
};
export interface IdentityDeliveryMessageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IdentityDeliveryMessage'];
        meta: {
            name: 'IdentityDeliveryMessage';
        };
    };
    findUnique<T extends IdentityDeliveryMessageFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentityDeliveryMessageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentityDeliveryMessageClient<runtime.Types.Result.GetResult<Prisma.$IdentityDeliveryMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentityDeliveryMessageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentityDeliveryMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityDeliveryMessageClient<runtime.Types.Result.GetResult<Prisma.$IdentityDeliveryMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentityDeliveryMessageFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentityDeliveryMessageFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentityDeliveryMessageClient<runtime.Types.Result.GetResult<Prisma.$IdentityDeliveryMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentityDeliveryMessageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentityDeliveryMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityDeliveryMessageClient<runtime.Types.Result.GetResult<Prisma.$IdentityDeliveryMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentityDeliveryMessageFindManyArgs>(args?: Prisma.SelectSubset<T, IdentityDeliveryMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityDeliveryMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentityDeliveryMessageCreateArgs>(args: Prisma.SelectSubset<T, IdentityDeliveryMessageCreateArgs<ExtArgs>>): Prisma.Prisma__IdentityDeliveryMessageClient<runtime.Types.Result.GetResult<Prisma.$IdentityDeliveryMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentityDeliveryMessageCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentityDeliveryMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentityDeliveryMessageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentityDeliveryMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityDeliveryMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentityDeliveryMessageDeleteArgs>(args: Prisma.SelectSubset<T, IdentityDeliveryMessageDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentityDeliveryMessageClient<runtime.Types.Result.GetResult<Prisma.$IdentityDeliveryMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentityDeliveryMessageUpdateArgs>(args: Prisma.SelectSubset<T, IdentityDeliveryMessageUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentityDeliveryMessageClient<runtime.Types.Result.GetResult<Prisma.$IdentityDeliveryMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentityDeliveryMessageDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentityDeliveryMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentityDeliveryMessageUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentityDeliveryMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentityDeliveryMessageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentityDeliveryMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityDeliveryMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentityDeliveryMessageUpsertArgs>(args: Prisma.SelectSubset<T, IdentityDeliveryMessageUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentityDeliveryMessageClient<runtime.Types.Result.GetResult<Prisma.$IdentityDeliveryMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentityDeliveryMessageCountArgs>(args?: Prisma.Subset<T, IdentityDeliveryMessageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentityDeliveryMessageCountAggregateOutputType> : number>;
    aggregate<T extends IdentityDeliveryMessageAggregateArgs>(args: Prisma.Subset<T, IdentityDeliveryMessageAggregateArgs>): Prisma.PrismaPromise<GetIdentityDeliveryMessageAggregateType<T>>;
    groupBy<T extends IdentityDeliveryMessageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentityDeliveryMessageGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentityDeliveryMessageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentityDeliveryMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityDeliveryMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentityDeliveryMessageFieldRefs;
}
export interface Prisma__IdentityDeliveryMessageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentityDeliveryMessageFieldRefs {
    readonly id: Prisma.FieldRef<"IdentityDeliveryMessage", 'String'>;
    readonly channel: Prisma.FieldRef<"IdentityDeliveryMessage", 'String'>;
    readonly transport: Prisma.FieldRef<"IdentityDeliveryMessage", 'String'>;
    readonly kind: Prisma.FieldRef<"IdentityDeliveryMessage", 'String'>;
    readonly payload: Prisma.FieldRef<"IdentityDeliveryMessage", 'String'>;
    readonly status: Prisma.FieldRef<"IdentityDeliveryMessage", 'String'>;
    readonly attempts: Prisma.FieldRef<"IdentityDeliveryMessage", 'Int'>;
    readonly nextAttemptAt: Prisma.FieldRef<"IdentityDeliveryMessage", 'DateTime'>;
    readonly leaseUntil: Prisma.FieldRef<"IdentityDeliveryMessage", 'DateTime'>;
    readonly expiresAt: Prisma.FieldRef<"IdentityDeliveryMessage", 'DateTime'>;
    readonly providerReceipt: Prisma.FieldRef<"IdentityDeliveryMessage", 'String'>;
    readonly errorCode: Prisma.FieldRef<"IdentityDeliveryMessage", 'String'>;
    readonly createdAt: Prisma.FieldRef<"IdentityDeliveryMessage", 'DateTime'>;
}
export type IdentityDeliveryMessageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityDeliveryMessageSelect<ExtArgs> | null;
    omit?: Prisma.IdentityDeliveryMessageOmit<ExtArgs> | null;
    where: Prisma.IdentityDeliveryMessageWhereUniqueInput;
};
export type IdentityDeliveryMessageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityDeliveryMessageSelect<ExtArgs> | null;
    omit?: Prisma.IdentityDeliveryMessageOmit<ExtArgs> | null;
    where: Prisma.IdentityDeliveryMessageWhereUniqueInput;
};
export type IdentityDeliveryMessageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityDeliveryMessageSelect<ExtArgs> | null;
    omit?: Prisma.IdentityDeliveryMessageOmit<ExtArgs> | null;
    where?: Prisma.IdentityDeliveryMessageWhereInput;
    orderBy?: Prisma.IdentityDeliveryMessageOrderByWithRelationInput | Prisma.IdentityDeliveryMessageOrderByWithRelationInput[];
    cursor?: Prisma.IdentityDeliveryMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityDeliveryMessageScalarFieldEnum | Prisma.IdentityDeliveryMessageScalarFieldEnum[];
};
export type IdentityDeliveryMessageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityDeliveryMessageSelect<ExtArgs> | null;
    omit?: Prisma.IdentityDeliveryMessageOmit<ExtArgs> | null;
    where?: Prisma.IdentityDeliveryMessageWhereInput;
    orderBy?: Prisma.IdentityDeliveryMessageOrderByWithRelationInput | Prisma.IdentityDeliveryMessageOrderByWithRelationInput[];
    cursor?: Prisma.IdentityDeliveryMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityDeliveryMessageScalarFieldEnum | Prisma.IdentityDeliveryMessageScalarFieldEnum[];
};
export type IdentityDeliveryMessageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityDeliveryMessageSelect<ExtArgs> | null;
    omit?: Prisma.IdentityDeliveryMessageOmit<ExtArgs> | null;
    where?: Prisma.IdentityDeliveryMessageWhereInput;
    orderBy?: Prisma.IdentityDeliveryMessageOrderByWithRelationInput | Prisma.IdentityDeliveryMessageOrderByWithRelationInput[];
    cursor?: Prisma.IdentityDeliveryMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityDeliveryMessageScalarFieldEnum | Prisma.IdentityDeliveryMessageScalarFieldEnum[];
};
export type IdentityDeliveryMessageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityDeliveryMessageSelect<ExtArgs> | null;
    omit?: Prisma.IdentityDeliveryMessageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityDeliveryMessageCreateInput, Prisma.IdentityDeliveryMessageUncheckedCreateInput>;
};
export type IdentityDeliveryMessageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentityDeliveryMessageCreateManyInput | Prisma.IdentityDeliveryMessageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityDeliveryMessageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityDeliveryMessageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityDeliveryMessageOmit<ExtArgs> | null;
    data: Prisma.IdentityDeliveryMessageCreateManyInput | Prisma.IdentityDeliveryMessageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityDeliveryMessageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityDeliveryMessageSelect<ExtArgs> | null;
    omit?: Prisma.IdentityDeliveryMessageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityDeliveryMessageUpdateInput, Prisma.IdentityDeliveryMessageUncheckedUpdateInput>;
    where: Prisma.IdentityDeliveryMessageWhereUniqueInput;
};
export type IdentityDeliveryMessageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentityDeliveryMessageUpdateManyMutationInput, Prisma.IdentityDeliveryMessageUncheckedUpdateManyInput>;
    where?: Prisma.IdentityDeliveryMessageWhereInput;
    limit?: number;
};
export type IdentityDeliveryMessageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityDeliveryMessageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityDeliveryMessageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityDeliveryMessageUpdateManyMutationInput, Prisma.IdentityDeliveryMessageUncheckedUpdateManyInput>;
    where?: Prisma.IdentityDeliveryMessageWhereInput;
    limit?: number;
};
export type IdentityDeliveryMessageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityDeliveryMessageSelect<ExtArgs> | null;
    omit?: Prisma.IdentityDeliveryMessageOmit<ExtArgs> | null;
    where: Prisma.IdentityDeliveryMessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityDeliveryMessageCreateInput, Prisma.IdentityDeliveryMessageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentityDeliveryMessageUpdateInput, Prisma.IdentityDeliveryMessageUncheckedUpdateInput>;
};
export type IdentityDeliveryMessageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityDeliveryMessageSelect<ExtArgs> | null;
    omit?: Prisma.IdentityDeliveryMessageOmit<ExtArgs> | null;
    where: Prisma.IdentityDeliveryMessageWhereUniqueInput;
};
export type IdentityDeliveryMessageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityDeliveryMessageWhereInput;
    limit?: number;
};
export type IdentityDeliveryMessageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentityDeliveryMessageSelect<ExtArgs> | null;
    omit?: Prisma.IdentityDeliveryMessageOmit<ExtArgs> | null;
};
