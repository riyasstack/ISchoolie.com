import { MfaService } from '@nestjs/authentication';
import { PrismaService } from '../database/prisma.service';
import { IdentityDelivery } from './identity.delivery';
export declare class IdentityBootstrap {
    private readonly db;
    private readonly delivery;
    private readonly mfa;
    constructor(db: PrismaService, delivery: IdentityDelivery, mfa: MfaService);
    private enabled;
    operator(input: unknown): Promise<{
        message: string;
    }>;
    institution(input: unknown): Promise<{
        institutionId: string;
        code: string;
        message: string;
    }>;
    resend(input: unknown): Promise<{
        message: string;
    }>;
}
