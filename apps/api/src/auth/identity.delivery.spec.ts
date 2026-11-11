import { IdentityDelivery } from './identity.delivery';
describe('delivery boundary', () => {
  it('never enables local capture in production or without explicit opt-in', () => {
    const environment = process.env.NODE_ENV;
    const capture = process.env.AUTH_LOCAL_DELIVERY;
    try {
      const delivery = new IdentityDelivery({} as never, {} as never);
      process.env.NODE_ENV = 'production';
      process.env.AUTH_LOCAL_DELIVERY = 'true';
      expect(() => delivery.requireAvailable()).toThrow(
        'Email delivery is not configured',
      );
      process.env.NODE_ENV = 'test';
      delete process.env.AUTH_LOCAL_DELIVERY;
      expect(delivery.available()).toBe(false);
      process.env.AUTH_LOCAL_DELIVERY = 'true';
      expect(delivery.available()).toBe(true);
    } finally {
      if (environment === undefined) delete process.env.NODE_ENV;
      else process.env.NODE_ENV = environment;
      if (capture === undefined) delete process.env.AUTH_LOCAL_DELIVERY;
      else process.env.AUTH_LOCAL_DELIVERY = capture;
    }
  });
});
