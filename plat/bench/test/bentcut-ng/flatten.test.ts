// The cut.flattenM search (M0-b-05; the listed test: "the flattenM search reproduces its result run to run and reports
// the row it met"; §4.6 step 5, J-A37.01; C-0117). Real S8 runs on two synthetic NG-shaped faces over a three-value
// grid, twice; the fold's choice, tie-breaks and tolerance on planted records.
import { describe, expect, it } from 'vitest';
import { loadTable } from '@plat/tables';
import { bendRowOf, bendTolerance, cutTableAt, DEFAULT_GRID, flattenFold, flattenSearch, gridValues, MAX_GRID, runNgTask, type NgRecord, type NgTask } from '../../src/bentcut-ng/index.js';
import { genRings, ngFace, PLANTED_CUTS, rect } from './support.js';

const FACES = [ngFace(1, genRings('round-joined', 0), 'area', PLANTED_CUTS), ngFace(2, [rect(9_000, 5_000)], 'street', PLANTED_CUTS)];
const GRID = { lo: 0, hi: 1.4, step: 0.7 };

/** A planted record with `bent` of `cuts` cuts bent. */
function rec(cuts: number, bent: number): NgRecord {
  const c = (b: number) => ({ bends: b }) as unknown as NgRecord['cuts'][number];
  return { faceId: 1, template: 'area', holed: false, seedIndex: 0, flattenM: 0, setup: null, refused: null, replayed: true, cuts: [...Array.from({ length: bent }, () => c(1)), ...Array.from({ length: cuts - bent }, () => c(0))], blocks: [], missed: 0, checks: null };
}

describe('flattenSearch(faces, row)', () => {
  it('reproduces its result run to run and reports the row it met', { timeout: 600_000 }, async () => {
    const row = bendRowOf(FACES);
    expect(row).toEqual({ metric: 'cut.oneBendShare', value: 4 / 6, n: 6, bent: 4, source: 'ng-faces.json: the recorded cuts of the same faces' });
    const a = await flattenSearch(FACES, row, { seed: 1, grid: GRID });
    const b = await flattenSearch(FACES, row, { seed: 1, grid: GRID });
    expect(b).toEqual(a);
    expect(a.row).toBe(row);
    expect(a.candidates.map((c) => c.flattenM)).toEqual([0, 0.7, 1.4]);
    for (const c of a.candidates) expect(c.cuts).toBeGreaterThan(0);
    expect(a.current).toBe(loadTable('cut').num('settings', 'flattenM'));
    // The chosen value is a candidate's, its share the one reported, its verdict by the tolerance.
    const best = a.candidates.find((c) => c.flattenM === a.flattenM);
    expect(best?.share).toBe(a.ours);
    expect(a.tolerance).toBe(bendTolerance(row));
    expect(a.verdict).toBe(Math.abs(a.delta as number) <= a.tolerance ? 'met' : 'notMet');
    for (const c of a.candidates) expect(Math.abs(c.delta as number)).toBeGreaterThanOrEqual(Math.abs(a.delta as number));
    // The cell enters the run: a candidate's table carries it, and a large value flattens corners a small one keeps.
    expect(cutTableAt(1.4).num('settings', 'flattenM')).toBe(1.4);
    const at = (v: number): number => {
      let bent = 0;
      for (const f of FACES) bent += runNgTask({ face: f, seed: 1, seedIndex: 0, flattenM: v, bars: false }).cuts.filter((c) => c.bends === 1).length;
      return bent;
    };
    expect(at(40)).toBeLessThan(at(0));
  });

  it('the fold: the nearest share, ties to the value nearer the table\'s, then the smaller; met within the tolerance', () => {
    const row = { metric: 'cut.oneBendShare' as const, value: 0.6, n: 100, bent: 60, source: 'ng-faces.json: the recorded cuts of the same faces' as const };
    const grid = { lo: 0, hi: 2, step: 0.5 };
    const values = [0, 0.5, 1, 1.5, 2];
    // shares 0.8, 0.7, 0.6, 0.5, 0.4: 1 is exact.
    const recs = [[rec(10, 8)], [rec(10, 7)], [rec(10, 6)], [rec(10, 5)], [rec(10, 4)]];
    const f = flattenFold(row, grid, values, recs, 0.7);
    expect([f.flattenM, f.ours, f.delta, f.verdict]).toEqual([1, 0.6, 0, 'met']);
    // A tie (0.5 and 1.5 both 0.1 off): the one nearer the table's 0.7, then — equally near — the smaller.
    const tie = flattenFold(row, grid, values, [[rec(10, 8)], [rec(10, 7)], [rec(10, 8)], [rec(10, 5)], [rec(10, 4)]], 0.7);
    expect(tie.flattenM).toBe(0.5);
    const tie2 = flattenFold(row, grid, values, [[rec(10, 8)], [rec(10, 7)], [rec(10, 8)], [rec(10, 5)], [rec(10, 4)]], 1);
    expect(tie2.flattenM).toBe(0.5);
    const tie3 = flattenFold(row, grid, values, [[rec(10, 8)], [rec(10, 7)], [rec(10, 8)], [rec(10, 5)], [rec(10, 4)]], 1.2);
    expect(tie3.flattenM).toBe(1.5);
    // The tolerance: max(0.01, 2 √(p(1 − p)/n)) — 2 × √(0.24 / 100) ≈ 0.09798 here; 0.097 off is met, 0.098 is not.
    expect(bendTolerance(row)).toBeCloseTo(2 * Math.sqrt(0.0024), 12);
    expect(bendTolerance({ ...row, n: 1_000_000 })).toBe(0.01);
    const off = (share10: number) => flattenFold(row, { lo: 0, hi: 0, step: 1 }, [0], [[rec(1_000, share10)]], 0.7);
    expect(off(697).verdict).toBe('met');
    expect(off(503).verdict).toBe('met');
    expect(off(698).verdict).toBe('notMet');
    expect(off(502).verdict).toBe('notMet');
    // No cut at any value, or a row of no recorded cut: never met.
    expect(flattenFold(row, grid, [0], [[rec(0, 0)]], 0.7)).toMatchObject({ flattenM: null, ours: null, verdict: 'notMet' });
    expect(flattenFold({ ...row, n: 0, value: 0 }, grid, [0], [[rec(10, 0)]], 0.7).verdict).toBe('notMet');
  });

  it('the row is NG\'s ONE-bend share: a two-bend recorded cut counts in n, never in bent (§4.6 step 5; C-0256 (8))', () => {
    const cuts = [...PLANTED_CUTS, { lengthCm: 7_000, cornerT: -1, arrivalCdeg: 9_000, fillet: 0 as const, bends: 2 }, { lengthCm: 7_500, cornerT: -1, arrivalCdeg: 9_000, fillet: 0 as const, bends: 2 }];
    const row = bendRowOf([ngFace(1, [rect(9_000, 5_000)], 'street', cuts)]);
    expect([row.n, row.bent, row.value]).toEqual([5, 2, 2 / 5]);
    // Our side likewise: a two-bend cut of ours is a cut of the share's denominator, not a one-bend one.
    const two = { ...rec(4, 2), cuts: [...rec(4, 2).cuts, { bends: 2 } as unknown as NgRecord['cuts'][number]] };
    const f = flattenFold(row, { lo: 0, hi: 0, step: 1 }, [0], [[two]], 0.7);
    expect([f.candidates[0].cuts, f.candidates[0].bent, f.ours]).toEqual([5, 2, 2 / 5]);
  });

  it('the grid: its values to the micrometre, refused when empty, reversed, non-positive in step, or too long', () => {
    expect(gridValues(DEFAULT_GRID)).toEqual(Array.from({ length: 21 }, (_, i) => Math.round(i * 0.1 * 1e6) / 1e6));
    expect(gridValues({ lo: 0.3, hi: 0.3, step: 0.1 })).toEqual([0.3]);
    expect(gridValues({ lo: 0, hi: 0.3, step: 0.1 })).toEqual([0, 0.1, 0.2, 0.3]);
    for (const g of [{ lo: 1, hi: 0, step: 0.1 }, { lo: 0, hi: 1, step: 0 }, { lo: -0.1, hi: 1, step: 0.1 }, { lo: 0, hi: Number.NaN, step: 0.1 }, { lo: 0, hi: MAX_GRID, step: 1 }]) {
      expect(typeof gridValues(g)).toBe('string');
    }
    expect(Array.isArray(gridValues({ lo: 0, hi: MAX_GRID - 1, step: 1 }))).toBe(true);
  });

  it('runs a test\'s runner in this thread, one task per face, seed and value', async () => {
    const seen: NgTask[] = [];
    await flattenSearch(FACES, bendRowOf(FACES), { seed: 3, seeds: 2, grid: { lo: 0, hi: 0.5, step: 0.5 }, runner: (t) => (seen.push(t), rec(2, 1)) });
    expect(seen.map((t) => [t.face.id, t.seedIndex, t.flattenM, t.seed, t.bars])).toEqual([
      [1, 0, 0, 3, false],
      [2, 0, 0, 3, false],
      [1, 1, 0, 3, false],
      [2, 1, 0, 3, false],
      [1, 0, 0.5, 3, false],
      [2, 0, 0.5, 3, false],
      [1, 1, 0.5, 3, false],
      [2, 1, 0.5, 3, false],
    ]);
  });
});
