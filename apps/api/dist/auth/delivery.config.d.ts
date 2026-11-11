import { type MailModuleOptions } from '@nestjs/mail';
export declare const localEmail: () => boolean;
export declare const localSms: () => boolean;
export declare const emailConfigured: () => boolean;
export declare const smsConfigured: () => boolean;
export declare function identityMailOptions(): MailModuleOptions;
