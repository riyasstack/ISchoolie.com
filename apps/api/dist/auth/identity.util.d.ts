export declare const token: () => string;
export declare const digest: (value: string) => string;
export declare function bodyFields(input: unknown, allowed: string[]): Record<string, unknown>;
export declare function text(input: Record<string, unknown>, key: string, max?: number): string;
export declare function canonicalEmail(value: string): string;
export declare function validPassword(value: unknown): string;
export declare function canonicalPhone(value: string): string;
export declare function canonicalIdentifier(value: string, mode?: string): string;
export declare function staffIdentifier(year: number, type: string, sequence: bigint, padding?: number): string;
