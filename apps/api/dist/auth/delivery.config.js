"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsConfigured = exports.emailConfigured = exports.localSms = exports.localEmail = void 0;
exports.identityMailOptions = identityMailOptions;
const mail_1 = require("@nestjs/mail");
const common_1 = require("@nestjs/common");
class UnconfiguredMailTransport extends mail_1.MailTransport {
    async send() {
        throw new common_1.ServiceUnavailableException('Email delivery is not configured');
    }
}
const localEmail = () => process.env.NODE_ENV !== 'production' &&
    process.env.AUTH_LOCAL_DELIVERY === 'true';
exports.localEmail = localEmail;
const localSms = () => process.env.NODE_ENV !== 'production' &&
    process.env.AUTH_LOCAL_SMS === 'true';
exports.localSms = localSms;
const emailConfigured = () => process.env.AUTH_EMAIL_TRANSPORT === 'resend' &&
    !!process.env.AUTH_RESEND_API_KEY &&
    !!process.env.AUTH_EMAIL_FROM;
exports.emailConfigured = emailConfigured;
const smsConfigured = () => process.env.AUTH_SMS_TRANSPORT === 'twilio' &&
    /^AC[0-9a-f]{32}$/i.test(process.env.AUTH_TWILIO_ACCOUNT_SID ?? '') &&
    !!process.env.AUTH_TWILIO_AUTH_TOKEN &&
    !!process.env.AUTH_TWILIO_FROM;
exports.smsConfigured = smsConfigured;
function identityMailOptions() {
    return {
        transport: (0, exports.emailConfigured)()
            ? new mail_1.ResendTransport({
                apiKey: process.env.AUTH_RESEND_API_KEY,
                timeout: 15000,
            })
            : new UnconfiguredMailTransport(),
        from: process.env.AUTH_EMAIL_FROM,
        retry: false,
    };
}
//# sourceMappingURL=delivery.config.js.map