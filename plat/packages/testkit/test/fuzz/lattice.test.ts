// M0-k-01's listed test "every arbitrary yields only coordinates snap accepts; shrinking terminates" (§3.2 (1), (7);
// §13.1 (1)), over every arbitrary of the kit in each form, the small-range options and every face kind at both scales.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { snap, type LatticePoint } from '@plat/kernel';
import { fuzzParams } from '@plat/testkit';
import { SELF_TEST_RUNS, allArbitraries } from './support.js';

/** Whether every point is an integer pair `snap` accepts and returns unchanged. */
function snapAccepts(points: readonly LatticePoint[]): boolean {
  for (const p of points) {
    if (!Number.isInteger(p.x) || !Number.isInteger(p.y)) return false;
    const s = snap(p.x, p.y);
    if (!s.ok || s.value.x !== p.x || s.value.y !== p.y) return false;
  }
  return points.length > 0;
}

const CASES = allArbitraries();

describe('every arbitrary yields only coordinates snap accepts (§3.2 (1), (7))', () => {
  for (const c of CASES) {
    it(c.name, () => {
      fc.assert(
        fc.property(c.arbitrary, (v) => snapAccepts(c.points(v))),
        { ...fuzzParams(`fuzz/test/snap/${c.name}`), numRuns: SELF_TEST_RUNS },
      );
    }, 120_000);
  }

  it('reads `snap`, so a coordinate past 2²³ − 1 or a fraction fails the check (its negative control)', () => {
    expect(snapAccepts([{ x: 8_388_607, y: -8_388_607 } as LatticePoint])).toBe(true);
    expect(snapAccepts([{ x: 8_388_608, y: 0 } as LatticePoint])).toBe(false);
    expect(snapAccepts([{ x: 0.5, y: 0 } as LatticePoint])).toBe(false);
    expect(snapAccepts([])).toBe(false);
  });
});

describe('shrinking terminates on every arbitrary, at a value it could have drawn', () => {
  for (const c of CASES) {
    it(c.name, () => {
      // A property every value fails: the shrinker walks to the smallest value and stops.
      const all = fc.check(
        fc.property(c.arbitrary, () => false),
        { ...fuzzParams(`fuzz/test/shrink-all/${c.name}`), numRuns: 1 },
      );
      expect(all.failed).toBe(true);
      expect(all.counterexample).not.toBeNull();
      expect(snapAccepts(c.points(all.counterexample?.[0]))).toBe(true);
      expect(Number.isFinite(all.numShrinks)).toBe(true);
      // A property half the values fail (the parity of the first coordinate): the shrinker keeps a failing value.
      const half = fc.check(
        fc.property(c.arbitrary, (v) => c.points(v)[0].x % 2 === 0),
        { ...fuzzParams(`fuzz/test/shrink-half/${c.name}`), numRuns: 200 },
      );
      if (half.failed) {
        const p = c.points(half.counterexample?.[0]);
        expect(snapAccepts(p)).toBe(true);
        expect(p[0].x % 2 !== 0).toBe(true);
      }
    }, 120_000);
  }
});
