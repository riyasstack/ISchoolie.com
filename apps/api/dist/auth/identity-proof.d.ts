import type { Request } from 'express';
import type { SessionRecord } from '@nestjs/authentication';
export declare class IdentityProof {
    private readonly storage;
    run<T>(request: Request, action: () => Promise<T>, nativeActor?: SessionRecord): Promise<T>;
    get request(): Request | undefined;
    get nativeActor(): SessionRecord | undefined;
    prove(user: {
        id: string;
        authVersion: number;
    }): void;
    version(userId: string): number | undefined;
}
