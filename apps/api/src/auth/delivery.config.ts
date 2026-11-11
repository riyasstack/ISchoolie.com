import {
  MailTransport,
  ResendTransport,
  type MailModuleOptions,
} from '@nestjs/mail';
import { ServiceUnavailableException } from '@nestjs/common';
class UnconfiguredMailTransport extends MailTransport {
  async send(): Promise<never> {
    throw new ServiceUnavailableException('Email delivery is not configured');
  }
}
export const localEmail = () =>
  process.env.NODE_ENV !== 'production' &&
  process.env.AUTH_LOCAL_DELIVERY === 'true';
export const localSms = () =>
  process.env.NODE_ENV !== 'production' &&
  process.env.AUTH_LOCAL_SMS === 'true';
export const emailConfigured = () =>
  process.env.AUTH_EMAIL_TRANSPORT === 'resend' &&
  !!process.env.AUTH_RESEND_API_KEY &&
  !!process.env.AUTH_EMAIL_FROM;
export const smsConfigured = () =>
  process.env.AUTH_SMS_TRANSPORT === 'twilio' &&
  /^AC[0-9a-f]{32}$/i.test(process.env.AUTH_TWILIO_ACCOUNT_SID ?? '') &&
  !!process.env.AUTH_TWILIO_AUTH_TOKEN &&
  !!process.env.AUTH_TWILIO_FROM;
export function identityMailOptions(): MailModuleOptions {
  return {
    transport: emailConfigured()
      ? new ResendTransport({
          apiKey: process.env.AUTH_RESEND_API_KEY!,
          timeout: 15000,
        })
      : new UnconfiguredMailTransport(),
    from: process.env.AUTH_EMAIL_FROM,
    retry: false,
  };
}
