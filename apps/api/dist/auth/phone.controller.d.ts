import { MfaService } from '@nestjs/authentication';
import type { Request, Response } from 'express';
import { SessionAccess } from './session-access';
import { IdentityPhoneService } from './phone.service';
import { IdentityService } from './identity.service';
export declare class IdentityPhoneController {
    private readonly phone;
    private readonly access;
    private readonly identity;
    private readonly mfa;
    constructor(phone: IdentityPhoneService, access: SessionAccess, identity: IdentityService, mfa: MfaService);
    start(input: unknown, req: Request): Promise<{
        challengeId: `${string}-${string}-${string}-${string}-${string}`;
        message: string;
    }>;
    confirm(input: unknown, req: Request): Promise<{
        message: string;
    }>;
    login(input: unknown, req: Request, res: Response): Promise<{
        token: string;
        expiresAt: Date;
        mfa: string;
    } | {
        mfa: string;
    }>;
    change(input: unknown, req: Request): Promise<{
        challengeId: `${string}-${string}-${string}-${string}-${string}`;
        message: string;
    }>;
    confirmChange(input: unknown, req: Request): Promise<{
        message: string;
    }>;
    link(input: unknown, req: Request): Promise<{
        challengeId: `${string}-${string}-${string}-${string}-${string}`;
        message: string;
    }>;
    confirmLink(input: unknown, req: Request): Promise<{
        message: string;
    }>;
    mobile(input: unknown, req: Request, res: Response): Promise<{
        token: string;
        expiresAt: Date;
        mfa: string;
    } | {
        mfa: string;
    }>;
}
