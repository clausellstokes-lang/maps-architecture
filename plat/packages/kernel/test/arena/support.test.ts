// The kernel tests' one seeded generator (`rng`, mulberry32, and `intIn` in ./support.ts; T-support-1 of the kernel
// consolidation plan): its draws are pinned word for word against the values the generator gave before it moved here,
// so every seeded test of every folder that imports it replays the same sequences; the copies the other folders still
// hold (tx/fuzzgen.ts, insert/step1-2/support.ts) draw the same words until they import this one.
import { describe, expect, it } from 'vitest';
import { generator, intIn as intIn12 } from '../insert/step1-2/support.js';
import { rng as rngTx } from '../tx/fuzzgen.js';
import { intIn, permutation, rng } from './support.js';

/** The first 16 draws of four seeds as 32-bit words (draw × 2³²), from the generator before it moved here. */
const WORDS: readonly (readonly [number, readonly number[]])[] = [
  [0, [1144304738, 1416247, 958946056, 627933444, 2007157716, 2340967985, 2642484575, 2787370982, 1958536065, 2496316458, 1057668038, 420269829, 3880206403, 1753221639, 3093645806, 2834277798]],
  [1, [2693262067, 11749833, 2265367787, 4213581821, 4159151403, 1207330352, 2632122864, 3095568220, 1828783984, 4272732017, 1955374602, 2099329838, 596715197, 1734070562, 1063107040, 663542962]],
  [0x0053_0004, [1311003545, 2955767983, 3299753696, 932185485, 343449154, 2938434716, 221309147, 302885665, 986036378, 3572746872, 2229247396, 1711353830, 4093428989, 24619669, 3481742779, 2513376435]],
  [4242, [2348084964, 1196615638, 3999632104, 2178503905, 2872380842, 1236430774, 1115355685, 1724097787, 1478131505, 2524250870, 3140510815, 3240356459, 2609655636, 4269880394, 1447969846, 3226386556]],
];

const draws = (next: () => number, n: number): number[] => Array.from({ length: n }, () => next());

describe('the one seeded generator (test/arena/support.ts)', () => {
  it('rng draws the pinned words of each seed: doubles in [0, 1), each an exact multiple of 2⁻³²', () => {
    for (const [seed, words] of WORDS) {
      const xs = draws(rng(seed), 16);
      expect(xs.map((x) => x * 4294967296), `seed ${seed}`).toEqual(words);
      for (const x of xs) expect(x >= 0 && x < 1).toBe(true);
    }
  });

  it('a generator is its own stream: two of one seed agree, and a seed is read as a u32 (seed and seed + 2³² alike)', () => {
    const a = rng(77);
    const b = rng(77);
    expect(draws(a, 64)).toEqual(draws(b, 64));
    expect(draws(rng(-1), 16)).toEqual(draws(rng(0xffffffff), 16));
    expect(draws(rng(5 + 4294967296), 16)).toEqual(draws(rng(5), 16));
  });

  it('the folders\' copies (tx/fuzzgen.ts rng, insert/step1-2 generator and intIn) draw the same words', () => {
    for (const [seed] of WORDS) {
      expect(draws(rngTx(seed), 256), `tx seed ${seed}`).toEqual(draws(rng(seed), 256));
      expect(draws(generator(seed), 256), `step1-2 seed ${seed}`).toEqual(draws(rng(seed), 256));
    }
    const [r1, r2] = [rng(7), generator(7)];
    expect(draws(() => intIn(r1, -5, 5), 64)).toEqual(draws(() => intIn12(r2, -5, 5), 64));
  });

  it('intIn gives a uniform integer in [lo, hi] (pinned on seed 7), both ends reached', () => {
    const r = rng(7);
    expect(draws(() => intIn(r, -5, 5), 16)).toEqual([-5, -5, 5, 2, 0, -1, 0, -3, 1, 3, -3, -4, 3, 0, -3, -1]);
    const seen = new Set(draws(() => intIn(r, 0, 3), 400));
    expect([...seen].sort((a, b) => a - b)).toEqual([0, 1, 2, 3]);
  });

  it('permutation (the allocation orders of every arena test) is pinned: the same orders as before the move', () => {
    expect(permutation(19, 1)).toEqual([5, 12, 18, 6, 1, 2, 17, 13, 10, 9, 4, 16, 7, 3, 14, 15, 8, 0, 11]);
    expect(permutation(24, 31)).toEqual([22, 10, 2, 3, 17, 11, 21, 5, 0, 7, 13, 18, 14, 4, 9, 12, 15, 20, 6, 8, 1, 23, 19, 16]);
    expect(permutation(5, 50)).toEqual([4, 3, 1, 0, 2]);
    expect(permutation(0, 3)).toEqual([]);
    expect([...permutation(40, 9)].sort((a, b) => a - b)).toEqual(Array.from({ length: 40 }, (_, i) => i));
  });
});
