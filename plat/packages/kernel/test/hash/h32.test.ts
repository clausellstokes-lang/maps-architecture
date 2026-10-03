// M0-d-02: H32 over UTF-8 with seed 0 (§13.6 (2)) and the UTF-8 encoder of the hash path. The exit bar's check-vector
// half: H32('d5/M1/TOWN/none/0') = 1221236157 and H32('d5/M1/TOWN/coast+river/4') = 3998735106, with §13.6 (2)'s other
// published values of the same function (the NG search's town seed and the three reduced reference seeds).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { encodeUtf8Into, H128, H32, utf8Bytes, utf8Length } from '../../src/hash/index.js';

/** §13.6 (2)'s reduction of an H32 into a Park–Miller / MINSTD state, 1 … 2³¹ − 2 (applied research-side). */
const reduce = (h: number) => 1 + (h % 2147483646);

describe('H32 (§13.6 (2))', () => {
  it('meets the check vectors of §13.6 (2)', () => {
    expect(H32('d5/M1/TOWN/none/0')).toBe(1221236157);
    expect(H32('d5/M1/TOWN/coast+river/4')).toBe(3998735106);
  });

  it('meets §13.6 (2)\'s other values of H32: the NG search\'s town seed and the reduced reference seeds', () => {
    expect(H32('d5/M5/area/0/0')).toBe(3881605733);
    expect(reduce(H32('d5-mfcg/M1/TOWN/none/0'))).toBe(1965791931);
    expect(reduce(H32('d5-ng/M5/area/0'))).toBe(1819777585);
    expect(reduce(H32('d5-ng/M5/ring/4'))).toBe(951122398);
  });

  it('is h1 of H128 over the UTF-8 bytes, a u32', () => {
    fc.assert(
      fc.property(fc.string({ unit: 'binary', maxLength: 40 }), (s) => {
        const h = H32(s);
        expect(h).toBe(H128(new TextEncoder().encode(s))[0]);
        expect(Number.isInteger(h) && h >= 0 && h <= 0xffffffff).toBe(true);
      }),
    );
  });
});

describe('UTF-8 on the hash path (C-0133)', () => {
  it('encodes every well-formed string as the platform\'s UTF-8 encoder does', () => {
    const encoder = new TextEncoder();
    fc.assert(
      fc.property(fc.string({ unit: 'binary', maxLength: 60 }), (s) => {
        const expected = encoder.encode(s);
        expect(utf8Length(s)).toBe(expected.length);
        expect(utf8Bytes(s)).toEqual(expected);
      }),
    );
  });

  it('encodes each sequence length at its boundaries', () => {
    const encoder = new TextEncoder();
    for (const s of ['', '\u0000', '\u007f', '\u0080', '߿', 'ࠀ', '퟿', '', '￿', '\u{10000}', '\u{10ffff}']) {
      expect(utf8Bytes(s)).toEqual(encoder.encode(s));
    }
  });

  it('writes at an offset and returns the end', () => {
    const out = new Uint8Array(12).fill(0xaa);
    const end = encodeUtf8Into('aé€', out, 3);
    expect(end).toBe(3 + 1 + 2 + 3);
    expect([...out]).toEqual([0xaa, 0xaa, 0xaa, 0x61, 0xc3, 0xa9, 0xe2, 0x82, 0xac, 0xaa, 0xaa, 0xaa]);
  });

  it('refuses a lone surrogate in H32, utf8Bytes and utf8Length', () => {
    for (const s of ['\ud800', 'a\udc00b', '\ud800\ud800', 'x\ud83d', '\udfff\ud800']) {
      expect(() => H32(s)).toThrow(RangeError);
      expect(() => utf8Bytes(s)).toThrow(RangeError);
      expect(() => utf8Length(s)).toThrow(RangeError);
      expect(() => encodeUtf8Into(s, new Uint8Array(16), 0)).toThrow(RangeError);
    }
  });
});
