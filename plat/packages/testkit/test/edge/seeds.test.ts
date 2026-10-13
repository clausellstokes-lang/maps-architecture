// PLAT_EDGE_SEEDS (M0-x-06; C-0100: 10 when unset — the PR size —, 1 000 in the nightly job; C-0057's form): the count a
// run gives each fixture, its refusals, and each fixture's own seed family.
import { describe, expect, it } from 'vitest';
import { EDGE_FIXTURES, EDGE_SEEDS_NIGHTLY, EDGE_SEEDS_PR, edgeSeed, edgeSeedCount, edgeSeeds } from '../../src/edge/index.js';
import { builtOf, runFixture, SEEDS } from './support.js';

describe('PLAT_EDGE_SEEDS (C-0100, C-0057)', () => {
  it('is 10 when unset or empty, the PR size; 1 000 is the nightly size', () => {
    expect(EDGE_SEEDS_PR).toBe(10);
    expect(EDGE_SEEDS_NIGHTLY).toBe(1000);
    expect(edgeSeedCount({})).toBe(10);
    expect(edgeSeedCount({ PLAT_EDGE_SEEDS: undefined })).toBe(10);
    expect(edgeSeedCount({ PLAT_EDGE_SEEDS: '' })).toBe(10);
    expect(edgeSeedCount({ PLAT_EDGE_SEEDS: '1000' })).toBe(1000);
    expect(edgeSeedCount({ PLAT_EDGE_SEEDS: '1' })).toBe(1);
    expect(edgeSeedCount({ PLAT_EDGE_SEEDS: '11' })).toBe(11);
  });

  it('refuses anything but a positive decimal integer with a RangeError naming the value', () => {
    for (const bad of ['1.5', '10.0', 'abc', '-3', '0', '00', '010', '1e3', ' 10', '10 ', '+5', '0x10', 'NaN', 'Infinity', '9007199254740993']) {
      expect(() => edgeSeedCount({ PLAT_EDGE_SEEDS: bad }), bad).toThrow(RangeError);
      expect(() => edgeSeedCount({ PLAT_EDGE_SEEDS: bad }), bad).toThrow(JSON.stringify(bad));
    }
  });

  it('this run reads it from the environment, and a fixture runs exactly that many seeds', () => {
    expect(SEEDS).toBe(edgeSeedCount(process.env));
    if (process.env.PLAT_EDGE_SEEDS === undefined || process.env.PLAT_EDGE_SEEDS === '') expect(SEEDS).toBe(10);
    const [f] = builtOf('EP-16/');
    const r = runFixture(f);
    expect(r.seeds).toBe(SEEDS);
    expect(r.counts.defined).toBe(SEEDS);
  });

  it('each fixture draws its own family: deterministic u32 seeds, distinct within and across fixtures', () => {
    expect(edgeSeeds('EP-16/stop-test', 5)).toEqual(edgeSeeds('EP-16/stop-test', 5));
    expect(edgeSeeds('EP-16/stop-test', 3)).toEqual(edgeSeeds('EP-16/stop-test', 5).slice(0, 3));
    expect(edgeSeed('EP-16/stop-test', 4)).toBe(edgeSeeds('EP-16/stop-test', 5)[4]);
    const all = new Set<number>();
    let n = 0;
    for (const f of EDGE_FIXTURES) {
      for (const s of edgeSeeds(f.id, 20)) {
        expect(Number.isInteger(s) && s >= 0 && s <= 0xffffffff).toBe(true);
        all.add(s);
        n += 1;
      }
    }
    expect(all.size).toBe(n);
    expect(() => edgeSeeds('x', 0)).toThrow(RangeError);
    expect(() => edgeSeeds('x', 1.5)).toThrow(RangeError);
  });
});
