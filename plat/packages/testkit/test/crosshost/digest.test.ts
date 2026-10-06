// The harness's digest writer (M0-d-06): raw IEEE-754 bit patterns read little-endian (−0 kept apart from +0, every NaN
// the one quiet NaN, C-0135 (1)), tagged values, code-unit key order — the words every leg writes alike.
import { describe, expect, it } from 'vitest';
import { H128, utf8Bytes } from '@plat/kernel';
import { CROSSHOST_NAN_WORDS, CrossHostDigestWriter, crossHostDigestOf, crossHostF64FromHex, crossHostF64Words, crossHostHex } from '@plat/testkit';

describe('the digest writer', () => {
  it('reads a double as its little-endian words: low word first, −0 kept, every NaN canonical', () => {
    expect(crossHostF64Words(1)).toEqual([0, 0x3ff00000]);
    expect(crossHostF64Words(-0)).toEqual([0, 0x80000000]);
    expect(crossHostF64Words(0)).toEqual([0, 0]);
    expect(crossHostF64Words(5e-324)).toEqual([1, 0]);
    expect(crossHostF64Words(Number.NaN)).toEqual([CROSSHOST_NAN_WORDS[1], CROSSHOST_NAN_WORDS[0]]);
    expect(crossHostF64Words(crossHostF64FromHex('fff8000000000001'))).toEqual([0, 0x7ff80000]);
    expect(crossHostF64FromHex('3ff0000000000000')).toBe(1);
    expect(Object.is(crossHostF64FromHex('8000000000000000'), -0)).toBe(true);
    expect(() => crossHostF64FromHex('3FF0000000000000')).toThrow(RangeError);
  });

  it('is H128 over the words written (little-endian bytes), as 32 hex digits word 0 first', () => {
    const w = new CrossHostDigestWriter().u32(0x04030201).u32(0x08070605);
    expect(w.hex()).toBe(crossHostHex(H128(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]))));
    expect(crossHostHex([1, 0xffffffff, 0, 0xabc])).toBe('00000001ffffffff0000000000000abc');
    expect(new CrossHostDigestWriter().str('ab').hex()).toBe(crossHostHex(H128(new Uint8Array([2, 0, 0, 0, ...utf8Bytes('ab'), 0, 0]))));
  });

  it('tells apart what a looser encoding would merge', () => {
    const d = crossHostDigestOf;
    expect(d(0)).not.toBe(d(-0));
    expect(d(['ab', 'c'])).not.toBe(d(['a', 'bc']));
    expect(d([1, [2]])).not.toBe(d([[1], 2]));
    expect(d(null)).not.toBe(d(undefined));
    expect(d(1)).not.toBe(d('1'));
    expect(d(true)).not.toBe(d(1));
    expect(d(new Float64Array([1, 2]))).not.toBe(d([1, 2]));
    expect(d(new Int32Array([-1]))).toBe(d(new Uint32Array([0xffffffff])));
    expect(d({ a: 1 })).not.toBe(d({ a: 2 }));
    expect(d(Number.NaN)).toBe(d(crossHostF64FromHex('7ff0000000000001')));
  });

  it('reads object keys in code-unit order (insertion order never matters), Maps in insertion order', () => {
    expect(crossHostDigestOf({ b: 1, a: 2, B: 3 })).toBe(crossHostDigestOf({ B: 3, a: 2, b: 1 }));
    expect(crossHostDigestOf(new Map([['a', 1], ['b', 2]]))).not.toBe(crossHostDigestOf(new Map([['b', 2], ['a', 1]])));
  });

  it('refuses what it cannot write', () => {
    expect(() => new CrossHostDigestWriter().u32(-1)).toThrow(RangeError);
    expect(() => new CrossHostDigestWriter().u32(1.5)).toThrow(RangeError);
    expect(() => crossHostDigestOf(() => 1)).toThrow(TypeError);
    expect(() => crossHostDigestOf(Symbol('s'))).toThrow(TypeError);
  });
});
