import {
  canonicalEmail,
  canonicalIdentifier,
  canonicalPhone,
  staffIdentifier,
  bodyFields,
  validPassword,
} from './identity.util';

describe('identity input boundaries', () => {
  it('canonicalizes email without provider-specific alias rewriting', () => {
    expect(canonicalEmail(' A.B+tag@Example.COM ')).toBe('a.b+tag@example.com');
    expect(() => canonicalEmail('a b@example.com')).toThrow();
  });
  it('preserves leading zeros and applies institution case policy', () => {
    expect(canonicalIdentifier(' 001ab ')).toBe('001AB');
    expect(canonicalIdentifier('001ab', 'PRESERVE')).toBe('001ab');
    expect(() => canonicalIdentifier('abc def')).toThrow();
  });
  it('requires E.164 with a valid number', () => {
    expect(canonicalPhone('+14155552671')).toBe('+14155552671');
    expect(() => canonicalPhone('4155552671')).toThrow();
    expect(() => canonicalPhone('+123')).toThrow();
  });
  it('never truncates staff sequences or confers roles from staff type', () => {
    expect(staffIdentifier(2026, 'TCH', 1n)).toBe('2026-TCH-0001');
    expect(staffIdentifier(2026, 'ADM', 10000n)).toBe('2026-ADM-10000');
    expect(() => staffIdentifier(2026, 'ADMIN', 1n)).toThrow();
    expect(() => staffIdentifier(2026, 'SUP', 0n)).toThrow();
  });
  it('rejects role injection, null bodies, and weak passwords', () => {
    expect(() =>
      bodyFields({ email: 'a@b.c', role: 'admin' }, ['email']),
    ).toThrow();
    expect(() => bodyFields(null, ['email'])).toThrow();
    expect(() => validPassword('short')).toThrow();
    expect(validPassword('  meaningful password  ')).toBe(
      '  meaningful password  ',
    );
  });
});
