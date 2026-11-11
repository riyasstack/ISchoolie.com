import { sealDelivery, openDelivery } from './delivery-cipher';
describe('proof envelope encryption', () => {
  it('binds ciphertext to its message and supports explicit retained-key rotation', () => {
    const previous = process.env.AUTH_DELIVERY_KEYS;
    try {
      const oldKey = 'old-test-key-with-at-least-thirty-two-characters';
      const newKey = 'new-test-key-with-at-least-thirty-two-characters';
      process.env.AUTH_DELIVERY_KEYS = oldKey;
      const envelope = sealDelivery('message-a', {
        token: 'private-one-time-proof',
      });
      expect(envelope).not.toContain('private-one-time-proof');
      expect(() => openDelivery('message-b', envelope)).toThrow();
      process.env.AUTH_DELIVERY_KEYS = `${newKey},${oldKey}`;
      expect(openDelivery('message-a', envelope).token).toBe(
        'private-one-time-proof',
      );
      process.env.AUTH_DELIVERY_KEYS = newKey;
      expect(() => openDelivery('message-a', envelope)).toThrow(
        'key is unavailable',
      );
    } finally {
      if (previous === undefined) delete process.env.AUTH_DELIVERY_KEYS;
      else process.env.AUTH_DELIVERY_KEYS = previous;
    }
  });
});
