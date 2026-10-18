// M0-k-01's exit bar "the generators cover every random input class of §13.1 (a coverage table in the test output)":
// the table is printed, it names each of §13.1 (1)'s nine classes for polygons and for chains, and every row's
// arbitrary reaches its floor; the classifiers that measure it are themselves checked on hand-built members and
// non-members, so the table cannot pass on a classifier that says yes to everything.
import { describe, expect, it } from 'vitest';
import type { LatticePoint } from '@plat/kernel';
import {
  FUZZ_CLASSES,
  FUZZ_CLASS_NAMES,
  formatFuzzCoverage,
  fuzzCoverage,
  fuzzHasDuplicateVertex,
  fuzzIsConcaveChain,
  fuzzIsConcaveRing,
  fuzzIsLarge,
  fuzzIsNearCollinear,
  fuzzIsSelfTouching,
  fuzzIsSnappedRegular,
  fuzzIsThin,
  fuzzIsZeroAreaChain,
  fuzzIsZeroAreaRing,
} from '@plat/testkit';

const P = (x: number, y: number) => ({ x, y }) as LatticePoint;
const R = (...xy: [number, number][]) => xy.map(([x, y]) => P(x, y));

describe('the coverage table of §13.1 (1)', () => {
  const rows = fuzzCoverage(200);

  it('is printed in the test output', () => {
    // The exit bar's table: one row per class and form, with the arbitrary, the sample, the hits and the floor. Written
    // to the process's stdout, which vitest's reporter passes through (a passing test's console.log it does not show).
    process.stdout.write(`\n${formatFuzzCoverage(rows)}\n\n`);
    expect(formatFuzzCoverage(rows).split('\n').length).toBe(3 + rows.length);
  });

  it('names each of the nine random classes of §13.1 (1), for polygons and for chains', () => {
    expect([...FUZZ_CLASS_NAMES]).toEqual([
      'concave',
      'holed',
      'thin',
      'near-collinear',
      'self-touching',
      'snapped',
      'duplicated-vertex',
      '≥ 300-vertex',
      'zero-area',
    ]);
    for (const cls of FUZZ_CLASS_NAMES) {
      for (const shape of ['polygon', 'chain'] as const) {
        const row = rows.find((r) => r.cls === cls && r.shape === shape);
        expect(row, `${cls} / ${shape}`).toBeDefined();
      }
    }
    expect(rows.length).toBe(2 * FUZZ_CLASS_NAMES.length);
  });

  it('draws every class with an arbitrary, the one exception named with its reason', () => {
    const missing = rows.filter((r) => r.arbitrary === null);
    expect(missing.map((r) => `${r.cls}/${r.shape}`)).toEqual(['holed/chain']);
    expect(missing[0].reason).toMatch(/no area/);
  });

  it('reaches every row\'s floor: each class drawn by its arbitrary', () => {
    for (const r of rows) {
      if (r.arbitrary === null) continue;
      expect(r.drawn, `${r.cls}/${r.shape}`).toBe(200);
      expect(r.hits, `${r.cls}/${r.shape}`).toBeGreaterThan(0);
      expect(r.share, `${r.cls}/${r.shape} ${r.share} < ${r.minShare}`).toBeGreaterThanOrEqual(r.minShare);
      expect(r.pass).toBe(true);
    }
    // The floors are real: a class arbitrary is held to all of its sample but where a row says why not.
    expect(FUZZ_CLASSES.filter((r) => r.make !== null && r.minShare < 1).map((r) => `${r.cls}/${r.shape}`)).toEqual([
      'concave/polygon',
      'concave/chain',
      'snapped/polygon',
      'snapped/chain',
    ]);
  });

  it('is reproducible: the same seeds give the same table', () => {
    expect(fuzzCoverage(50)).toEqual(fuzzCoverage(50));
  });
});

describe('the classifiers recognise members and refuse non-members (exact)', () => {
  const square = R([0, 0], [100, 0], [100, 100], [0, 100]);

  it('concave', () => {
    expect(fuzzIsConcaveRing(R([0, 0], [100, 0], [50, 10], [100, 100], [0, 100]))).toBe(true);
    expect(fuzzIsConcaveRing(square)).toBe(false);
    expect(fuzzIsConcaveRing(square.slice().reverse())).toBe(false); // clockwise, still convex
    expect(fuzzIsConcaveChain(R([0, 0], [10, 0], [10, 10], [20, 10]))).toBe(true);
    expect(fuzzIsConcaveChain(R([0, 0], [10, 0], [10, 10], [0, 10]))).toBe(false);
  });

  it('thin', () => {
    expect(fuzzIsThin(R([0, 0], [1000, 0], [1000, 40], [0, 40]))).toBe(true);
    expect(fuzzIsThin(R([0, 0], [1000, 0], [1000, 60], [0, 60]))).toBe(false);
    expect(fuzzIsThin(square)).toBe(false);
  });

  it('near-collinear: 0 < offset ≤ 2 cm, the projection inside the segment', () => {
    expect(fuzzIsNearCollinear(R([0, 0], [50, 2], [100, 0], [50, 80]), true)).toBe(true);
    expect(fuzzIsNearCollinear(R([0, 0], [50, 3], [100, 0], [50, 80]), true)).toBe(false);
    expect(fuzzIsNearCollinear(R([0, 0], [50, 0], [100, 0], [50, 80]), true)).toBe(false); // collinear: not near
    expect(fuzzIsNearCollinear(R([0, 0], [101, 1], [100, 0]), false)).toBe(false); // beyond the segment
    expect(fuzzIsNearCollinear(R([0, 0], [1, 1], [100, 0]), false)).toBe(true); // 1.0 cm off, inside
  });

  it('self-touching', () => {
    expect(fuzzIsSelfTouching(square, true)).toBe(false);
    expect(fuzzIsSelfTouching(R([0, 0], [100, 0], [50, 50], [100, 100], [0, 100], [50, 50]), true)).toBe(true);
    expect(fuzzIsSelfTouching(R([0, 0], [100, 0], [100, 50], [50, 0]), false)).toBe(true);
    expect(fuzzIsSelfTouching(R([0, 0], [100, 0], [100, 0], [100, 50]), false)).toBe(false); // a duplicate is not a touch
  });

  it('snapped regular', () => {
    expect(fuzzIsSnappedRegular(R([1000, 0], [-500, 866], [-500, -866]))).toBe(true);
    expect(fuzzIsSnappedRegular(R([0, 0], [100, 0], [100, 50], [0, 50]))).toBe(true); // a rectangle is cyclic
    expect(fuzzIsSnappedRegular(R([0, 0], [100, 0], [60, 50], [0, 50]))).toBe(false);
  });

  it('duplicated vertex, ≥ 300 vertices, zero area', () => {
    expect(fuzzHasDuplicateVertex(R([0, 0], [10, 0], [10, 0], [0, 10]), true)).toBe(true);
    expect(fuzzHasDuplicateVertex(R([0, 0], [10, 0], [0, 10], [0, 0]), true)).toBe(true); // explicitly closed
    expect(fuzzHasDuplicateVertex(R([0, 0], [10, 0], [0, 10], [0, 0]), false)).toBe(false); // a chain may end where it began
    expect(fuzzIsLarge(new Array(300).fill(P(0, 0)))).toBe(true);
    expect(fuzzIsLarge(new Array(299).fill(P(0, 0)))).toBe(false);
    expect(fuzzIsZeroAreaRing(R([0, 0], [10, 10], [10, 0], [0, 10]))).toBe(true); // a bow tie
    expect(fuzzIsZeroAreaRing(square)).toBe(false);
    expect(fuzzIsZeroAreaChain(R([0, 0], [20, 10], [-40, -20]))).toBe(true);
    expect(fuzzIsZeroAreaChain(R([0, 0], [20, 10], [40, 21]))).toBe(false);
  });
});
