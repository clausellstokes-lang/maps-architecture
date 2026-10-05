// M0-d-04: the canonical text serialisation (§6.2: "sorted keys, integer coordinates, floats as shortest round-trip
// strings — used only for golden files and exports"). Off the digest path (leaf.test.ts's source scan); the goldens'
// canonical text form is M1's (M0-work.json's defers).
import { describe, expect, it } from 'vitest';
import { canonicalText } from '../../src/index.js';

describe('canonicalText', () => {
  it('sorts keys, drops absent ones, writes numbers in their shortest round-trip form', () => {
    expect(canonicalText({ b: 1, a: [0.1, -0, 3], c: undefined, d: null })).toBe('{"a":[0.1,0,3],"b":1,"d":null}');
    expect(canonicalText({ x: 0.1 + 0.2 })).toBe('{"x":0.30000000000000004}');
    expect(Number(canonicalText(1 / 3))).toBe(1 / 3);
    expect(canonicalText({ p: { y: 20, x: 10 } })).toBe(canonicalText({ p: { x: 10, y: 20 } }));
    expect(canonicalText(new Int32Array([1, -2]))).toBe('[1,-2]');
    expect(canonicalText('a"b')).toBe('"a\\"b"');
  });

  it('refuses a value with no text form', () => {
    expect(() => canonicalText(Number.NaN)).toThrow(RangeError);
    expect(() => canonicalText({ a: Infinity })).toThrow(/\$\.a/);
    expect(() => canonicalText(() => 1)).toThrow(RangeError);
  });
});
