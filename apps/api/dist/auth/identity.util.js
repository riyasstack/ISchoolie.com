"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.digest = exports.token = void 0;
exports.bodyFields = bodyFields;
exports.text = text;
exports.canonicalEmail = canonicalEmail;
exports.validPassword = validPassword;
exports.canonicalPhone = canonicalPhone;
exports.canonicalIdentifier = canonicalIdentifier;
exports.staffIdentifier = staffIdentifier;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const max_1 = require("libphonenumber-js/max");
const token = () => (0, node_crypto_1.randomBytes)(32).toString('base64url');
exports.token = token;
const digest = (value) => (0, node_crypto_1.createHash)('sha256').update(value).digest('hex');
exports.digest = digest;
function bodyFields(input, allowed) {
    if (!input ||
        typeof input !== 'object' ||
        Array.isArray(input) ||
        Object.keys(input).some((key) => !allowed.includes(key)))
        throw new common_1.BadRequestException('Invalid request fields');
    return input;
}
function text(input, key, max = 254) {
    const value = input[key];
    if (typeof value !== 'string' || !value.trim() || value.length > max)
        throw new common_1.BadRequestException(`Invalid ${key}`);
    return value.trim();
}
function canonicalEmail(value) {
    const result = value.trim().toLowerCase();
    if (result.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result))
        throw new common_1.BadRequestException('Invalid email');
    return result;
}
function validPassword(value) {
    if (typeof value !== 'string' || value.length < 12 || value.length > 128)
        throw new common_1.BadRequestException('Use a password of 12–128 characters');
    return value;
}
function canonicalPhone(value) {
    const parsed = (0, max_1.parsePhoneNumberFromString)(value);
    if (!value.startsWith('+') || !parsed?.isValid() || parsed.ext)
        throw new common_1.BadRequestException('Use a valid international mobile number');
    return parsed.number;
}
function canonicalIdentifier(value, mode = 'UPPER') {
    const result = value.trim().normalize('NFKC');
    if (!/^[\p{L}\p{N}._/-]{1,64}$/u.test(result))
        throw new common_1.BadRequestException('Invalid institutional identifier');
    return mode === 'PRESERVE' ? result : result.toUpperCase();
}
function staffIdentifier(year, type, sequence, padding = 4) {
    if (!Number.isInteger(year) ||
        year < 1900 ||
        year > new Date().getFullYear() + 1 ||
        !['TCH', 'ADM', 'SUP'].includes(type) ||
        sequence < 1n ||
        !Number.isInteger(padding) ||
        padding < 1 ||
        padding > 12)
        throw new common_1.BadRequestException('Invalid staff identifier inputs');
    return `${year}-${type}-${sequence.toString().padStart(padding, '0')}`;
}
//# sourceMappingURL=identity.util.js.map