// The stream's draw helpers (item M0-d-01; §6.1 Draw helpers; C-0143): float01's formula and range, int's inclusive
// unbiased range and its rejection boundary, bool, normal's Irwin–Hall moments, bell4's mean 7/30 within 3 s.e. over
// 10⁵ draws, mean3, fuzzy, weighted, deck, and the all-zero nudge. Every helper draws uniforms only; each test compares
// against a twin stream seeded with the same key, so the draw count of each helper is pinned too.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { Deck, Stream, streamFromKey, ZERO_STATE_NUDGE } from '../../src/rng/stream.js';
import { inverseOdd } from './invert.js';

const KEY: [number, number, number, number] = [0x01234567, 0x89abcdef, 0xdeadbeef, 0x0badf00d];
const twins = (key: ArrayLike<number> = KEY): [Stream, Stream] => [streamFromKey(key), streamFromKey(key)];
const u32x4 = fc.tuple(fc.nat({ max: 0xffffffff }), fc.nat({ max: 0xffffffff }), fc.nat({ max: 0xffffffff }), fc.nat({ max: 0xffffffff }));

/** Sample mean and standard error over n draws of f. */
function sample(n: number, f: () => number): { mean: number; se: number; values: Float64Array } {
  const values = new Float64Array(n);
  let sum = 0;
  for (let i = 0; i < n; i += 1) {
    values[i] = f();
    sum += values[i];
  }
  const mean = sum / n;
  let ss = 0;
  for (let i = 0; i < n; i += 1) ss += (values[i] - mean) * (values[i] - mean);
  return { mean, se: Math.sqrt(ss / (n - 1) / n), values };
}

describe('the stream key seeds the state; the all-zero key takes the fixed nudge (§6.1)', () => {
  it('keeps its key, frozen, and refuses a key that is not four u32 words', () => {
    const s = streamFromKey(KEY);
    expect(s.key).toEqual(KEY);
    expect(Object.isFrozen(s.key)).toBe(true);
    expect(() => streamFromKey([1, 2, 3])).toThrow(RangeError);
    expect(() => streamFromKey([1, 2, 3, -1])).toThrow(RangeError);
    expect(() => streamFromKey([1, 2, 3, 2 ** 32])).toThrow(RangeError);
    expect(() => streamFromKey([1, 2, 3, 0.5])).toThrow(RangeError);
  });

  it('replaces the all-zero state, which xoshiro never leaves, by ZERO_STATE_NUDGE', () => {
    const zero = streamFromKey([0, 0, 0, 0]);
    const nudge = streamFromKey(ZERO_STATE_NUDGE);
    expect(zero.key).toEqual([0, 0, 0, 0]);
    const a = Array.from({ length: 16 }, () => zero.u32());
    expect(a).toEqual(Array.from({ length: 16 }, () => nudge.u32()));
    expect(a.some((v) => v !== 0)).toBe(true);
    expect(ZERO_STATE_NUDGE).toEqual([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a]);
  });

  it('is a pure function of its key and the order of the calls', () => {
    fc.assert(
      fc.property(u32x4, (key) => {
        const [a, b] = twins(key);
        let same = true;
        for (let i = 0; i < 8; i += 1) same &&= a.u32() === b.u32();
        return same && a.float01() === b.float01();
      }),
    );
  }, 120_000);
});

describe('float01: (u32 >>> 8) · 2⁻²⁴ in [0, 1)', () => {
  it('is exactly the top 24 bits of one output scaled by 2⁻²⁴', () => {
    const [a, b] = twins();
    for (let i = 0; i < 1000; i += 1) expect(a.float01()).toBe((b.u32() >>> 8) / 16777216);
  }, 120_000);

  it('lies in [0, 1 − 2⁻²⁴] on every draw', () => {
    fc.assert(
      fc.property(u32x4, (key) => {
        const s = streamFromKey(key);
        let inside = true;
        for (let i = 0; i < 64; i += 1) {
          const v = s.float01();
          inside &&= v >= 0 && v <= 1 - 2 ** -24;
        }
        return inside;
      }),
    );
  }, 120_000);
});

describe('int(lo, hi): a uniform integer with both ends included (C-0143)', () => {
  it('stays inside [lo, hi] and reaches both ends', () => {
    fc.assert(
      fc.property(u32x4, fc.integer({ min: -1e9, max: 1e9 }), fc.integer({ min: 0, max: 50 }), (key, lo, width) => {
        const s = streamFromKey(key);
        let inside = true;
        for (let i = 0; i < 32; i += 1) {
          const v = s.int(lo, lo + width);
          inside &&= Number.isInteger(v) && v >= lo && v <= lo + width;
        }
        return inside;
      }),
    );
    const s = streamFromKey(KEY);
    const seen = new Set<number>();
    for (let i = 0; i < 2000; i += 1) seen.add(s.int(-3, 3));
    expect([...seen].sort((x, y) => x - y)).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  }, 120_000);

  it('is uniform: each of six values within 3 s.e. of 1/6 over 6 · 10⁴ draws', () => {
    const s = streamFromKey(KEY);
    const n = 60000;
    const counts = new Array<number>(6).fill(0);
    for (let i = 0; i < n; i += 1) counts[s.int(0, 5)] += 1;
    const se = Math.sqrt(((1 / 6) * (5 / 6)) / n);
    for (const c of counts) expect(Math.abs(c / n - 1 / 6)).toBeLessThan(3 * se);
  }, 120_000);

  it('draws one output when it is below the rejection limit, and redraws above it (unbiased)', () => {
    // span 3 · 2³⁰: limit 2³² − 2³⁰ — outputs at or above it are drawn again
    const span = 3 * 2 ** 30;
    const limit = 2 ** 32 - (2 ** 32 % span);
    const [a, b] = twins();
    for (let i = 0; i < 2000; i += 1) {
      let u = b.u32();
      while (u >= limit) u = b.u32();
      expect(a.int(0, span - 1)).toBe(u % span);
    }
    const [c, d] = twins();
    expect(c.int(5, 5)).toBe(5);
    d.u32();
    expect(c.u32()).toBe(d.u32()); // a one-value range still draws one output
  }, 120_000);

  it('draws again on an output exactly at the rejection limit and keeps one just below it (C-0143 (2): ≥ 2³² − 2³² mod span)', () => {
    // A key whose first output is a chosen u32 v: xoshiro128**'s first output is rotl(s₁ · 5, 7) · 9 with s₁ the key's
    // word 1, so word 1 = 5⁻¹ · rotr(v · 9⁻¹, 7) mod 2³² (checks/M0-d-01.md F-6; the other words are free).
    const firstOutput = (v: number): [number, number, number, number] => {
      const r = Math.imul(v, inverseOdd(9)) >>> 0;
      return [1, Math.imul(((r >>> 7) | (r << 25)) >>> 0, inverseOdd(5)) >>> 0, 2, 3];
    };
    // span 3 · 2³⁰ (limit 0xc0000000, the checker's probe: word 1 = 0x33800000), and two spans that do not divide 2³²
    for (const span of [3 * 2 ** 30, 3, 10]) {
      const limit = 2 ** 32 - (2 ** 32 % span);
      // at the limit: the output is drawn again, so int gives the next output below the limit, and has drawn both
      const [a, b] = twins(firstOutput(limit));
      expect(b.u32()).toBe(limit);
      let u = b.u32();
      while (u >= limit) u = b.u32();
      expect(a.int(0, span - 1)).toBe(u % span);
      expect(a.u32()).toBe(b.u32());
      if (span === 3 * 2 ** 30) {
        expect(firstOutput(limit)[1]).toBe(0x33800000);
        expect(streamFromKey(firstOutput(limit)).int(0, span - 1)).toBe(11520); // under "u > limit" it would be limit mod span = 0
      }
      // one below the limit: kept, the top of the range, one output drawn
      const [c, d] = twins(firstOutput(limit - 1));
      expect(d.u32()).toBe(limit - 1);
      expect(c.int(7, 7 + span - 1)).toBe(7 + span - 1);
      expect(c.u32()).toBe(d.u32());
    }
  });

  it('takes the whole u32 range for a span of 2³², and refuses other ranges', () => {
    const [a, b] = twins();
    expect(a.int(-(2 ** 31), 2 ** 31 - 1)).toBe(-(2 ** 31) + b.u32());
    const s = streamFromKey(KEY);
    expect(() => s.int(2, 1)).toThrow(RangeError);
    expect(() => s.int(0, 2 ** 32)).toThrow(RangeError);
    expect(() => s.int(0.5, 3)).toThrow(RangeError);
    expect(() => s.int(0, Number.NaN)).toThrow(RangeError);
  });
});

describe('bool(p): one uniform below p', () => {
  it('never at p ≤ 0, always at p ≥ 1, and with frequency p within 3 s.e.', () => {
    const s = streamFromKey(KEY);
    for (let i = 0; i < 1000; i += 1) {
      expect(s.bool(0)).toBe(false);
      expect(s.bool(1)).toBe(true);
    }
    const n = 100000;
    let hits = 0;
    for (let i = 0; i < n; i += 1) if (s.bool(0.3)) hits += 1;
    expect(Math.abs(hits / n - 0.3)).toBeLessThan(3 * Math.sqrt((0.3 * 0.7) / n));
    const [a, b] = twins();
    expect(a.bool(0.5)).toBe(b.float01() < 0.5);
    expect(() => s.bool(Number.NaN)).toThrow(RangeError);
  }, 120_000);

  it('is false at p = 0 even when the uniform is exactly 0, and true for any p above it (float01() < p, C-0143 (2))', () => {
    // a key whose first output is 0 (word 1 zero), so the first float01() is exactly 0 (checks/M0-d-01.md F-3)
    const zeroFirst = (): Stream => streamFromKey([1, 0, 0, 0]);
    expect(zeroFirst().float01()).toBe(0);
    expect(zeroFirst().bool(0)).toBe(false);
    expect(zeroFirst().bool(-1)).toBe(false);
    expect(zeroFirst().bool(2 ** -24)).toBe(true);
    expect(zeroFirst().bool(Number.MIN_VALUE)).toBe(true);
    // one uniform per call, at every p
    const [a, b] = twins([1, 0, 0, 0]);
    a.bool(0);
    b.float01();
    expect(a.u32()).toBe(b.u32());
  });
});

describe("normal(): Irwin–Hall of twelve uniforms — its moments", () => {
  it('is the sum of twelve uniforms less 6, inside [−6, 6]', () => {
    const [a, b] = twins();
    for (let i = 0; i < 1000; i += 1) {
      let sum = 0;
      for (let k = 0; k < 12; k += 1) sum += b.float01();
      const v = a.normal();
      expect(v).toBe(sum - 6);
      expect(v >= -6 && v <= 6).toBe(true);
    }
  }, 120_000);

  it('has mean 0, variance 1 and fourth moment 2.9 (Irwin–Hall n = 12: excess kurtosis −1/10) within 3 s.e. over 10⁵ draws', () => {
    const s = streamFromKey(KEY);
    const n = 100000;
    const { mean, values } = sample(n, () => s.normal());
    expect(Math.abs(mean)).toBeLessThan(3 / Math.sqrt(n));
    let m2 = 0;
    let m4 = 0;
    for (const v of values) {
      m2 += v * v;
      m4 += v * v * v * v;
    }
    m2 /= n;
    m4 /= n;
    // s.e. of the second moment: √((μ₄ − σ⁴) / n) = √(1.9 / n); of the fourth: √((μ₈ − μ₄²) / n), μ₈ = 85.63 for n = 12
    // (from the cumulants of twelve uniforms: K₂ = 1, K₄ = −1/10, K₆ = 1/21, K₈ = −1/20)
    expect(Math.abs(m2 - 1)).toBeLessThan(3 * Math.sqrt(1.9 / n));
    expect(Math.abs(m4 - 2.9)).toBeLessThan(3 * Math.sqrt((85.63 - 2.9 * 2.9) / n));
  }, 120_000);
});

describe('bell4(): the folded bell |(u₁ + u₂ + u₃ + u₄) / 2 − 1| on [0, 1]', () => {
  it('is the formula over four uniforms', () => {
    const [a, b] = twins();
    for (let i = 0; i < 1000; i += 1) {
      const sum = b.float01() + b.float01() + b.float01() + b.float01();
      const v = a.bell4();
      expect(v).toBe(Math.abs(sum * 0.5 - 1));
      expect(v >= 0 && v <= 1).toBe(true);
    }
  }, 120_000);

  it("has mean 7/30 within 3 s.e. over 10⁵ draws (the stop test's draw, §4.6)", () => {
    const s = streamFromKey(KEY);
    const { mean, se } = sample(100000, () => s.bell4());
    expect(Math.abs(mean - 7 / 30)).toBeLessThan(3 * se);
  }, 120_000);
});

describe('mean3() and fuzzy(f)', () => {
  it('mean3 averages three uniforms; its mean is 1/2 within 3 s.e.', () => {
    const [a, b] = twins();
    for (let i = 0; i < 1000; i += 1) expect(a.mean3()).toBe((b.float01() + b.float01() + b.float01()) / 3);
    const s = streamFromKey(KEY);
    const { mean, se } = sample(100000, () => s.mean3());
    expect(Math.abs(mean - 0.5)).toBeLessThan(3 * se);
  }, 120_000);

  it('fuzzy(f) = 0.5 + f · (mean3() − 0.5): the centre at f = 0, mean3 at f = 1, inside [0.5 − f/2, 0.5 + f/2]', () => {
    const [a, b] = twins();
    expect(a.fuzzy(0)).toBe(0.5);
    b.mean3(); // f = 0 still draws mean3's three uniforms
    expect(a.u32()).toBe(b.u32());
    const [c, d] = twins();
    for (let i = 0; i < 100; i += 1) expect(c.fuzzy(1)).toBe(0.5 + 1 * (d.mean3() - 0.5));
    fc.assert(
      fc.property(u32x4, fc.double({ min: 0, max: 1, noNaN: true }), (key, f) => {
        const v = streamFromKey(key).fuzzy(f);
        return v >= 0.5 - f / 2 - 1e-15 && v <= 0.5 + f / 2 + 1e-15;
      }),
    );
    const s = streamFromKey(KEY);
    expect(() => s.fuzzy(-0.1)).toThrow(RangeError);
    expect(() => s.fuzzy(1.5)).toThrow(RangeError);
    expect(() => s.fuzzy(Number.NaN)).toThrow(RangeError);
  }, 120_000);
});

describe('weighted(weights): an index with chance proportional to its weight (C-0143)', () => {
  it('draws one uniform per call and walks the running sums', () => {
    const [a, b] = twins();
    const w = [1, 2, 3, 0, 4];
    for (let i = 0; i < 1000; i += 1) {
      const u = b.float01() * 10;
      const expected = u < 1 ? 0 : u < 3 ? 1 : u < 6 ? 2 : 4;
      expect(a.weighted(w)).toBe(expected);
    }
  }, 120_000);

  it('matches the weights within 3 s.e. over 10⁵ draws and never draws a zero weight', () => {
    const s = streamFromKey(KEY);
    const w = [1, 2, 3, 0, 4];
    const n = 100000;
    const counts = [0, 0, 0, 0, 0];
    for (let i = 0; i < n; i += 1) counts[s.weighted(w)] += 1;
    expect(counts[3]).toBe(0);
    w.forEach((wi, i) => {
      const p = wi / 10;
      expect(Math.abs(counts[i] / n - p)).toBeLessThanOrEqual(3 * Math.sqrt((p * (1 - p)) / n));
    });
    expect(s.weighted([0, 0, 5, 0])).toBe(2);
    expect(s.weighted(new Float64Array([0.25, 0]))).toBe(0);
  }, 120_000);

  it('skips a zero weight even when the uniform is exactly 0 (a key whose first output is 0: word 1 zero)', () => {
    const s = streamFromKey([1, 0, 0, 0]);
    expect(streamFromKey([1, 0, 0, 0]).float01()).toBe(0);
    expect(s.weighted([0, 1])).toBe(1);
    expect(streamFromKey([1, 0, 0, 0]).weighted([0, 0, 3])).toBe(2);
  });

  it('takes the upper index at an exact running-sum boundary: index i holds [sum before i, sum through i) (§6.1; C-0143 (2))', () => {
    // checks/M0-d-01.md F-11 (the checker's probe P11): a key whose first float01() is exactly 0.5 puts u = 1 on the first
    // running sum of [1, 1], which belongs to index 1; one grid point (2⁻²⁴) below it belongs to index 0. Keys built as
    // the rejection-limit test builds them: xoshiro128**'s first output is rotl(s₁ · 5, 7) · 9 with s₁ the key's word 1.
    const firstOutput = (v: number): [number, number, number, number] => {
      const r = Math.imul(v, inverseOdd(9)) >>> 0;
      return [1, Math.imul(((r >>> 7) | (r << 25)) >>> 0, inverseOdd(5)) >>> 0, 2, 3];
    };
    expect(streamFromKey(firstOutput(0x80000000)).float01()).toBe(0.5);
    expect(streamFromKey(firstOutput(0x80000000)).weighted([1, 1])).toBe(1);
    expect(streamFromKey(firstOutput(0x7fffff00)).weighted([1, 1])).toBe(0);
  });

  it('refuses negative, non-finite or all-zero weights', () => {
    const s = streamFromKey(KEY);
    expect(() => s.weighted([])).toThrow(RangeError);
    expect(() => s.weighted([0, 0])).toThrow(RangeError);
    expect(() => s.weighted([1, -1])).toThrow(RangeError);
    expect(() => s.weighted([1, Number.NaN])).toThrow(RangeError);
    expect(() => s.weighted([1, Infinity])).toThrow(RangeError);
    expect(() => s.weighted([Number.MAX_VALUE, Number.MAX_VALUE])).toThrow(RangeError);
  });
});

describe('deck(table): draw without replacement', () => {
  it('draws every card exactly once, then refuses', () => {
    fc.assert(
      fc.property(u32x4, fc.array(fc.integer(), { maxLength: 40 }), (key, table) => {
        const d = streamFromKey(key).deck(table);
        const out: number[] = [];
        while (d.size > 0) out.push(d.draw());
        const sort = (x: number[]): number[] => [...x].sort((p, q) => p - q);
        let refused = false;
        try {
          d.draw();
        } catch (e) {
          refused = e instanceof RangeError;
        }
        return d instanceof Deck && JSON.stringify(sort(out)) === JSON.stringify(sort(table)) && refused;
      }),
    );
  }, 120_000);

  it('takes each card with int(0, left − 1) off its stream, leaving the table untouched', () => {
    const [a, b] = twins();
    const table = ['a', 'b', 'c', 'd', 'e'];
    const d = a.deck(table);
    const left = [...table];
    for (let n = table.length; n > 0; n -= 1) {
      const j = b.int(0, n - 1);
      const card = left[j];
      left[j] = left[n - 1];
      left[n - 1] = card;
      expect(d.draw()).toBe(card);
    }
    expect(table).toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(a.u32()).toBe(b.u32());
  }, 120_000);

  it('gives the first card uniformly within 3 s.e. over 6 · 10⁴ decks, a repeated entry its multiplicity', () => {
    const s = streamFromKey(KEY);
    const n = 60000;
    const counts = new Map<string, number>();
    for (let i = 0; i < n; i += 1) {
      const c = s.deck(['x', 'y', 'y', 'z']).draw();
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    for (const [card, p] of [['x', 0.25], ['y', 0.5], ['z', 0.25]] as const) {
      expect(Math.abs((counts.get(card) ?? 0) / n - p)).toBeLessThan(3 * Math.sqrt((p * (1 - p)) / n));
    }
  }, 120_000);
});
