// M0-d-02: MurmurHash3 x86 128 and fmix32 (§6.2, §6.1, §17.1 (8)). The exit bar's known-answer half: SMHasher's
// verification value 0xB3ECE62A, reproduced by its published procedure (no reference code read), and the 256 per-length
// known answers of that procedure committed in test/vectors/murmur/.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { fmix32, H128, Murmur128, murmur128 } from '../../src/hash/index.js';
import { VERIFICATION_VALUE, vectors, wordsLE } from './support.js';

/**
 * SMHasher's verification procedure: for i = 0 … 255, key[i] = i and the first i bytes of key are hashed with seed
 * 256 − i; the 256 results, each as its bytes in order, are hashed with seed 0; the value is the first 32-bit word.
 */
function verificationHashes(): [number, number, number, number][] {
  const key = new Uint8Array(256);
  const out: [number, number, number, number][] = [];
  for (let i = 0; i < 256; i += 1) {
    key[i] = i;
    out.push(murmur128(key.subarray(0, i), 256 - i));
  }
  return out;
}

const isU32 = (w: number) => Number.isInteger(w) && w >= 0 && w <= 0xffffffff;

describe('MurmurHash3 x86 128 (H128, §6.2)', () => {
  it('reproduces SMHasher\'s verification value 0xB3ECE62A', () => {
    const final = murmur128(wordsLE(verificationHashes().flat()), 0);
    expect(final[0]).toBe(VERIFICATION_VALUE);
    expect(vectors.verificationValue).toBe(VERIFICATION_VALUE);
  });

  it('gives the 256 committed per-length known answers, which alone hash to the verification value', () => {
    expect(vectors.perLength).toHaveLength(256);
    expect(verificationHashes()).toEqual(vectors.perLength);
    expect(murmur128(wordsLE(vectors.perLength.flat()), 0)[0]).toBe(VERIFICATION_VALUE);
  });

  it('hashes the empty input under seed 0 to four zero words, and H128 is the seed-0 hash', () => {
    expect(H128(new Uint8Array(0))).toEqual([0, 0, 0, 0]);
    const bytes = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
    expect(H128(bytes)).toEqual(murmur128(bytes, 0));
    expect(murmur128(bytes, 1)).not.toEqual(murmur128(bytes, 0));
  });

  it('returns four u32 words for every length 0 … 64', () => {
    const bytes = new Uint8Array(64).map((_, i) => (i * 37 + 11) & 0xff);
    for (let n = 0; n <= 64; n += 1) {
      const h = H128(bytes.subarray(0, n));
      expect(h).toHaveLength(4);
      expect(h.every(isU32)).toBe(true);
    }
  });

  it('incremental = one-shot over random bytes split at random points', () => {
    fc.assert(
      fc.property(
        fc.uint8Array({ maxLength: 200 }),
        fc.array(fc.nat(), { maxLength: 8 }),
        fc.nat(0xffffffff),
        (bytes, cuts, seed) => {
          const points = [...new Set(cuts.map((c) => c % (bytes.length + 1)))].sort((a, b) => a - b);
          const m = new Murmur128(seed);
          let from = 0;
          for (const p of [...points, bytes.length]) {
            m.update(bytes, from, p);
            from = p;
          }
          expect(m.byteLength).toBe(bytes.length);
          expect(m.digest()).toEqual(murmur128(bytes, seed));
        },
      ),
    );
  });

  it('feeds a word as its four little-endian bytes, aligned or not', () => {
    fc.assert(
      fc.property(fc.uint8Array({ maxLength: 40 }), fc.array(fc.nat(0xffffffff), { maxLength: 12 }), (prefix, words) => {
        const viaWords = new Murmur128().update(prefix);
        for (const w of words) viaWords.word(w);
        const bytes = new Uint8Array([...prefix, ...wordsLE(words)]);
        expect(viaWords.digest()).toEqual(H128(bytes));
      }),
    );
  });

  it('digest() leaves the state as it was', () => {
    const bytes = new Uint8Array(37).map((_, i) => i);
    const m = new Murmur128(7).update(bytes, 0, 20);
    const first = m.digest();
    expect(m.digest()).toEqual(first);
    expect(first).toEqual(murmur128(bytes.subarray(0, 20), 7));
    m.update(bytes, 20);
    expect(m.digest()).toEqual(murmur128(bytes, 7));
    expect(m.reset(7).update(bytes).digest()).toEqual(murmur128(bytes, 7));
  });

  it('refuses a seed outside u32 and a range outside the array', () => {
    for (const seed of [-1, 0x100000000, 1.5, Number.NaN]) {
      expect(() => new Murmur128(seed)).toThrow(RangeError);
      expect(() => murmur128(new Uint8Array(1), seed)).toThrow(RangeError);
    }
    const m = new Murmur128();
    const bytes = new Uint8Array(4);
    expect(() => m.update(bytes, -1, 2)).toThrow(RangeError);
    expect(() => m.update(bytes, 3, 2)).toThrow(RangeError);
    expect(() => m.update(bytes, 0, 5)).toThrow(RangeError);
    expect(() => m.update(bytes, 0.5, 2)).toThrow(RangeError);
    expect(m.byteLength).toBe(0);
  });
});

// The inverse of fmix32, for the bijection property: each xor-shift by s ≥ 16 is its own inverse, the one by 13 is
// undone by repeating it, and the multiplications by their inverses modulo 2³² (Newton's iteration).
function inverseMod32(a: number): number {
  let x = a;
  for (let i = 0; i < 5; i += 1) x = Math.imul(x, 2 - Math.imul(a, x));
  return x;
}
function unXorShift(h: number, s: number): number {
  let x = h;
  for (let k = s; k < 32; k += s) x = h ^ (x >>> s);
  return x;
}
function fmix32Inverse(h: number): number {
  let x = h | 0;
  x = unXorShift(x, 16);
  x = Math.imul(x, inverseMod32(0xc2b2ae35));
  x = unXorShift(x, 13);
  x = Math.imul(x, inverseMod32(0x85ebca6b));
  x = unXorShift(x, 16);
  return x >>> 0;
}

describe('fmix32, the 32-bit finaliser (§6.1)', () => {
  it('maps 0 to 0 and returns a u32', () => {
    expect(fmix32(0)).toBe(0);
    for (const v of [1, 0x7fffffff, 0x80000000, 0xffffffff, -1]) expect(isU32(fmix32(v))).toBe(true);
    expect(fmix32(-1)).toBe(fmix32(0xffffffff));
  });

  it('is a bijection on u32 (its inverse undoes it)', () => {
    expect(Math.imul(0x85ebca6b, inverseMod32(0x85ebca6b))).toBe(1);
    fc.assert(
      fc.property(fc.nat(0xffffffff), (v) => {
        expect(fmix32Inverse(fmix32(v))).toBe(v);
      }),
    );
  });

  it('is the finaliser H128 applies: the empty input under seed s hashes to the closed form of the final mix', () => {
    // For the empty input under seed s the four lanes are equal before the final mix, so each word is a sum of
    // fmix32(4s) and fmix32(5s) — the per-length vector of length 0 (seed 256) has this [h, g, g, g] shape.
    for (const s of [1, 2, 0xdeadbeef]) {
      let h = (4 * s) | 0; // h1 += h2 + h3 + h4, all equal to s
      const h2 = (s + h) | 0; // h2 += h1 (likewise h3, h4)
      const f1 = fmix32(h);
      const f2 = fmix32(h2);
      h = (f1 + 3 * f2) | 0;
      const g = (f2 + h) | 0;
      expect(murmur128(new Uint8Array(0), s)).toEqual([h >>> 0, g >>> 0, g >>> 0, g >>> 0]);
    }
  });
});
