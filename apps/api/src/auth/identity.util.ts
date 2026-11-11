import { BadRequestException } from '@nestjs/common';
import { createHash, randomBytes } from 'node:crypto';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max';

export const token = () => randomBytes(32).toString('base64url');
export const digest = (value: string) =>
  createHash('sha256').update(value).digest('hex');
export function bodyFields(
  input: unknown,
  allowed: string[],
): Record<string, unknown> {
  if (
    !input ||
    typeof input !== 'object' ||
    Array.isArray(input) ||
    Object.keys(input).some((key) => !allowed.includes(key))
  )
    throw new BadRequestException('Invalid request fields');
  return input as Record<string, unknown>;
}
export function text(
  input: Record<string, unknown>,
  key: string,
  max = 254,
): string {
  const value = input[key];
  if (typeof value !== 'string' || !value.trim() || value.length > max)
    throw new BadRequestException(`Invalid ${key}`);
  return value.trim();
}
export function canonicalEmail(value: string): string {
  const result = value.trim().toLowerCase();
  if (result.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result))
    throw new BadRequestException('Invalid email');
  return result;
}
export function validPassword(value: unknown): string {
  if (typeof value !== 'string' || value.length < 12 || value.length > 128)
    throw new BadRequestException('Use a password of 12–128 characters');
  return value;
}
export function canonicalPhone(value: string): string {
  const parsed = parsePhoneNumberFromString(value);
  if (!value.startsWith('+') || !parsed?.isValid() || parsed.ext)
    throw new BadRequestException('Use a valid international mobile number');
  return parsed.number;
}
export function canonicalIdentifier(value: string, mode = 'UPPER'): string {
  const result = value.trim().normalize('NFKC');
  if (!/^[\p{L}\p{N}._/-]{1,64}$/u.test(result))
    throw new BadRequestException('Invalid institutional identifier');
  return mode === 'PRESERVE' ? result : result.toUpperCase();
}
export function staffIdentifier(
  year: number,
  type: string,
  sequence: bigint,
  padding = 4,
): string {
  if (
    !Number.isInteger(year) ||
    year < 1900 ||
    year > new Date().getFullYear() + 1 ||
    !['TCH', 'ADM', 'SUP'].includes(type) ||
    sequence < 1n ||
    !Number.isInteger(padding) ||
    padding < 1 ||
    padding > 12
  )
    throw new BadRequestException('Invalid staff identifier inputs');
  return `${year}-${type}-${sequence.toString().padStart(padding, '0')}`;
}
