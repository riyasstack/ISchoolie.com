import { createHmac } from 'node:crypto';
/** RFC 6238 fixture generator, never used by application code. */
export function totpFixture(secret: string, at = Date.now()) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  for (const character of secret.replace(/=+$/, ''))
    bits += alphabet.indexOf(character).toString(2).padStart(5, '0');
  const bytes: number[] = [];
  for (let index = 0; index + 8 <= bits.length; index += 8)
    bytes.push(parseInt(bits.slice(index, index + 8), 2));
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(Math.floor(at / 30000)));
  const mac = createHmac('sha1', Buffer.from(bytes)).update(counter).digest();
  return ((mac.readUInt32BE(mac[19] & 15) & 0x7fffffff) % 1000000)
    .toString()
    .padStart(6, '0');
}
