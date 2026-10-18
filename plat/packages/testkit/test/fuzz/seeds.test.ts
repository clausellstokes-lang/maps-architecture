// M0-k-01's listed test "the seed family is a function of (name, i) alone" (§13.2's seed-family form; §13.6 (2)'s
// H32 and its check vectors), and the PLAT_FUZZ_RUNS contract's test-kit side (C-0057): `fuzzParams` and `fuzzRuns`.
import fc from 'fast-check';
import { afterEach, describe, expect, it } from 'vitest';
import { H32 } from '@plat/kernel';
import { FUZZ_RUNS_NIGHTLY, FUZZ_RUNS_PR, arb, fuzzParams, fuzzRuns, seedFamily } from '@plat/testkit';
import { SELF_TEST_RUNS } from './support.js';

const saved = fc.readConfigureGlobal();
afterEach(() => {
  fc.configureGlobal(saved);
});

/** A family name: any well-formed non-empty string (fast-check's full-Unicode strings have no lone surrogate). */
const nameArb = fc.string({ unit: 'grapheme', minLength: 1, maxLength: 24 });
const indexArb = fc.integer({ min: 0, max: 0xffffffff });

describe('the seed family is a function of (name, i) alone (§13.2)', () => {
  it('is H32 of "<name>/<i>": §13.2\'s B-CITY form and §13.6 (2)\'s check vectors', () => {
    expect(seedFamily('d5/M1/TOWN/none', 0)).toBe(1_221_236_157);
    expect(seedFamily('d5/M1/TOWN/coast+river', 4)).toBe(3_998_735_106);
    expect(seedFamily('bcity/CITY/none', 3)).toBe(H32('bcity/CITY/none/3'));
  });

  it('gives the same seed for the same (name, i) whatever ran before, in any order, under any global configuration', () => {
    fc.assert(
      fc.property(fc.uniqueArray(fc.tuple(nameArb, indexArb), { minLength: 1, maxLength: 12 }), fc.integer(), (pairs, globalSeed) => {
        const first = pairs.map(([n, i]) => seedFamily(n, i));
        fc.configureGlobal({ ...saved, seed: globalSeed });
        fc.sample(arb.polygon(), 3); // other draws in between
        const again = pairs
          .map((p, k) => [p, k] as const)
          .reverse()
          .map(([[n, i], k]) => [seedFamily(n, i), k] as const);
        fc.configureGlobal(saved);
        for (const [s, k] of again) expect(s).toBe(first[k]);
        for (const [n, i] of pairs) expect(seedFamily(n, i)).toBe(H32(`${n}/${i}`));
      }),
      { seed: seedFamily('fuzz/test/seeds/pure', 0) | 0, numRuns: SELF_TEST_RUNS },
    );
  });

  it('is a u32 (a `Seed`, §2.9)', () => {
    fc.assert(
      fc.property(nameArb, indexArb, (n, i) => {
        const s = seedFamily(n, i);
        expect(Number.isInteger(s) && s >= 0 && s <= 0xffffffff).toBe(true);
      }),
      { seed: seedFamily('fuzz/test/seeds/u32', 0) | 0, numRuns: SELF_TEST_RUNS },
    );
  });

  it('tells the families and indices apart that §13.2 names', () => {
    const seeds = new Set<number>();
    for (const rung of ['TOWN', 'CITY', 'METROPOLIS']) {
      for (const water of ['none', 'coast', 'river', 'coast+river']) for (let i = 0; i < 50; i += 1) seeds.add(seedFamily(`bcity/${rung}/${water}`, i));
    }
    expect(seeds.size).toBe(3 * 4 * 50);
  });

  it('refuses an empty name, a negative, fractional, non-finite or over-u32 index, and a lone surrogate', () => {
    expect(() => seedFamily('', 0)).toThrow(RangeError);
    for (const i of [-1, 0.5, Number.NaN, Number.POSITIVE_INFINITY, 2 ** 32]) expect(() => seedFamily('fuzz/x', i)).toThrow(RangeError);
    expect(() => seedFamily('fuzz/\ud800', 0)).toThrow(RangeError);
    expect(seedFamily('fuzz/x', 0xffffffff)).toBe(H32('fuzz/x/4294967295'));
  });
});

describe('the PLAT_FUZZ_RUNS contract, the test kit side (C-0057)', () => {
  it('fuzzParams gives the family seed as fast-check\'s 32-bit integer, or the global seed PLAT_FUZZ_SEED fixed', () => {
    fc.configureGlobal({ ...saved, seed: undefined });
    expect(fuzzParams('fuzz/polygon', 7)).toEqual({ seed: seedFamily('fuzz/polygon', 7) | 0 });
    expect(fuzzParams('fuzz/polygon')).toEqual({ seed: seedFamily('fuzz/polygon', 0) | 0 });
    fc.configureGlobal({ ...saved, seed: 12_345 });
    expect(fuzzParams('fuzz/polygon', 7)).toEqual({ seed: 12_345 });
  });

  it('a family seed replays: one seed, one sample', () => {
    const p = fuzzParams('fuzz/test/replay', 1);
    expect(fc.sample(arb.polygon(), { ...p, numRuns: 5 })).toEqual(fc.sample(arb.polygon(), { ...p, numRuns: 5 }));
  });

  it('fuzzRuns reads PLAT_FUZZ_RUNS as the vitest setup does: 10⁴ when unset, a positive integer, nothing else', () => {
    expect(FUZZ_RUNS_PR).toBe(10_000);
    expect(FUZZ_RUNS_NIGHTLY).toBe(1_000_000);
    expect(fuzzRuns({})).toBe(10_000);
    expect(fuzzRuns({ PLAT_FUZZ_RUNS: '' })).toBe(10_000);
    expect(fuzzRuns({ PLAT_FUZZ_RUNS: '1000000' })).toBe(1_000_000);
    expect(fuzzRuns({ PLAT_FUZZ_RUNS: '5000' })).toBe(5_000);
    for (const bad of ['0', '-1', '1e4', '10.5', 'many', ' 10']) expect(() => fuzzRuns({ PLAT_FUZZ_RUNS: bad })).toThrow(/PLAT_FUZZ_RUNS/);
  });

  it('agrees with the run count the setup file configured from this process\'s PLAT_FUZZ_RUNS', () => {
    expect(fuzzRuns()).toBe(saved.numRuns);
  });
});
