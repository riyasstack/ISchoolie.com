import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'node:crypto';
function keys() {
  const values = (process.env.AUTH_DELIVERY_KEYS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  if (!values.length || values.some((value) => value.length < 32))
    throw new Error('AUTH_DELIVERY_KEYS is required');
  return values.map((value) => createHash('sha256').update(value).digest());
}
export function sealDelivery(id: string, value: object) {
  const key = keys()[0];
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  cipher.setAAD(Buffer.from(id));
  const body = Buffer.concat([
    cipher.update(JSON.stringify(value), 'utf8'),
    cipher.final(),
  ]);
  return [
    'v1',
    createHash('sha256').update(key).digest('hex').slice(0, 16),
    iv.toString('base64url'),
    cipher.getAuthTag().toString('base64url'),
    body.toString('base64url'),
  ].join('.');
}
export function openDelivery(
  id: string,
  envelope: string,
): Record<string, string> {
  const [version, keyId, iv, tag, body] = envelope.split('.');
  if (version !== 'v1' || !iv || !tag || !body)
    throw new Error('Invalid delivery envelope');
  const key = keys().find(
    (value) =>
      createHash('sha256').update(value).digest('hex').slice(0, 16) === keyId,
  );
  if (!key) throw new Error('Delivery key is unavailable');
  const cipher = createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(iv, 'base64url'),
  );
  cipher.setAAD(Buffer.from(id));
  cipher.setAuthTag(Buffer.from(tag, 'base64url'));
  return JSON.parse(
    Buffer.concat([
      cipher.update(Buffer.from(body, 'base64url')),
      cipher.final(),
    ]).toString('utf8'),
  ) as Record<string, string>;
}
