// M0-a-02: sortedKeys (C-0009) — the object's own enumerable string keys in one total order (UTF-16 code units), for
// any insertion order; integer-like keys take no special place.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { compareKeys, sortedKeys } from '../../src/arena/index.js';

/** The hard timeout of a property at PLAT_FUZZ_RUNS on the shared machine (M0-a-01's convention); never a timing. */
const TIMEOUT = 600_000;

describe('sortedKeys (C-0009)', () => {
  it('gives one order for any insertion order (integer-like, empty, unicode and prototype-named keys among them)', () => {
    const key = fc.oneof(fc.string({ maxLength: 4 }), fc.nat(300).map(String), fc.constantFrom('__proto__', 'constructor', 'toString', 'é', '\u{1F600}', '-1', '1.5', '01'));
    fc.assert(
      fc.property(fc.uniqueArray(key, { maxLength: 25 }), fc.nat(), (keys, seed) => {
        const build = (order: string[]): Record<string, number> => {
          const o: Record<string, number> = Object.create(null) as Record<string, number>;
          for (const k of order) Object.defineProperty(o, k, { value: 1, enumerable: true, configurable: true, writable: true });
          return o;
        };
        const shuffled = [...keys];
        let s = seed;
        for (let i = shuffled.length - 1; i > 0; i--) {
          s = (Math.imul(s, 1103515245) + 12345) >>> 0;
          const j = s % (i + 1);
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const a = sortedKeys(build(keys));
        expect(sortedKeys(build(shuffled))).toEqual(a);
        expect(a).toEqual([...keys].sort()); // the default string sort: UTF-16 code units
      }),
    );
  }, TIMEOUT);

  it('does not follow the engine\'s integer-first enumeration', () => {
    const o = { b: 1, 10: 1, a: 1, 9: 1, 1: 1 };
    expect(Object.keys(o)).toEqual(['1', '9', '10', 'b', 'a']);
    expect(sortedKeys(o)).toEqual(['1', '10', '9', 'a', 'b']);
  });

  it('reads own enumerable string keys only: no symbol, no non-enumerable or inherited key; an own __proto__ key and an accessor are keys', () => {
    const base = { inherited: 1 };
    const o = Object.create(base) as Record<string | symbol, unknown>;
    o.z = 1;
    o[Symbol('s')] = 2;
    Object.defineProperty(o, 'hidden', { value: 3, enumerable: false });
    Object.defineProperty(o, 'got', { get: () => 4, enumerable: true });
    expect(sortedKeys(o)).toEqual(['got', 'z']);
    expect(sortedKeys(JSON.parse('{"__proto__": 1, "a": 2}') as object)).toEqual(['__proto__', 'a']);
    expect(sortedKeys(['x', 'y'])).toEqual(['0', '1']);
    expect(sortedKeys({})).toEqual([]);
  });

  it('leaves the object as it was', () => {
    const o = { b: 1, a: 2 };
    sortedKeys(o);
    expect(o).toEqual({ b: 1, a: 2 });
    expect(Object.keys(o)).toEqual(['b', 'a']);
  });

  it('compareKeys is a total order: antisymmetric, 0 only on equal keys, a prefix first', () => {
    expect(compareKeys('a', 'b')).toBe(-1);
    expect(compareKeys('b', 'a')).toBe(1);
    expect(compareKeys('ab', 'ab')).toBe(0);
    expect(compareKeys('ab', 'abc')).toBe(-1);
    expect(compareKeys('Z', 'a')).toBe(-1); // code units, not locale
    fc.assert(fc.property(fc.string(), fc.string(), (a, b) => {
      expect(compareKeys(a, b)).toBe(-compareKeys(b, a) || 0);
      expect(compareKeys(a, b) === 0).toBe(a === b);
    }));
  }, TIMEOUT);
});
