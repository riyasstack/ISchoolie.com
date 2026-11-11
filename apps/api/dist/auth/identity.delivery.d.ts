import { type OnModuleInit, type OnModuleDestroy } from '@nestjs/common';
import { Mailer } from '@nestjs/mail';
import { PrismaService } from '../database/prisma.service';
import type { Prisma } from '../generated/prisma/client';
export declare class IdentityDelivery implements OnModuleInit, OnModuleDestroy {
    private readonly db;
    private readonly mailer;
    private readonly inFlight;
    private timer?;
    constructor(db: PrismaService, mailer: Mailer);
    onModuleInit(): void;
    onModuleDestroy(): Promise<void>;
    kick(id: string): void;
    available(): boolean;
    requireAvailable(): void;
    send(email: string, kind: string, token: string): Promise<{
        id: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    smsAvailable(): boolean;
    requireSms(): void;
    sendSms(phone: string, kind: string, code: string, challengeId: string): Promise<{
        id: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    stageEmail(tx: Prisma.TransactionClient, email: string, kind: string, token: string): Promise<`${string}-${string}-${string}-${string}-${string}`>;
    stageSms(tx: Prisma.TransactionClient, phone: string, kind: string, code: string, challengeId: string): Promise<`${string}-${string}-${string}-${string}-${string}`>;
    private enqueue;
    private stage;
    dispatch(id: string): Promise<void>;
    drain(): Promise<{
        attempted: number;
    }>;
}
