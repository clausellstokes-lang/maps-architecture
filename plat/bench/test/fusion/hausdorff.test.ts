// M0-c-06's listed test: "the Hausdorff check equals 0 on every seed (a planted 1 cm shift fails it)" — §13.2's contract
// "S8's working block equals S9's committed block (Hausdorff 0; §3.7)", read through corridorUnion over every district's
// committed L1 faces (S9's kernel op) — and the ring geometry it rests on.
import { describe, expect, it } from 'vitest';
import { canonicalRing, derive, hausdorffCm, measure, s8s9, sameRing, type SeedRecord } from '../../src/fusion/index.js';
import { TEST_SIZE } from './support.js';

const sq = [
  { x: 0, y: 0 },
  { x: 1_000, y: 0 },
  { x: 1_000, y: 1_000 },
  { x: 0, y: 1_000 },
];

describe('the ring geometry (canonical forms, Hausdorff)', () => {
  it('one closed point set has one canonical form: rotation, direction, a closing vertex, repeats and collinear vertices', () => {
    const c = canonicalRing(sq);
    expect(c).toEqual(sq);
    expect(canonicalRing([sq[2], sq[3], sq[0], sq[1]])).toEqual(c);
    expect(canonicalRing([...sq].reverse())).toEqual(c);
    expect(canonicalRing([...sq, sq[0]])).toEqual(c);
    expect(canonicalRing([sq[0], sq[0], { x: 500, y: 0 }, sq[1], sq[2], { x: 1_000, y: 1_000 }, sq[3]])).toEqual(c);
    expect(sameRing([{ x: 500, y: 0 }, ...sq.slice(1), sq[0]], sq)).toBe(true);
    expect(hausdorffCm([{ x: 0, y: 500 }, ...sq], sq)).toBe(0);
    // A degenerate ring has no form.
    expect(canonicalRing([{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 9, y: 0 }])).toEqual([]);
  });

  it('a 1 cm shift of one vertex is a Hausdorff distance > 0 (at most the shift), never 0', () => {
    const moved = [{ x: 1, y: 0 }, ...sq.slice(1)];
    expect(sameRing(moved, sq)).toBe(false);
    const d = hausdorffCm(moved, sq);
    expect(d).toBeGreaterThan(0);
    expect(d).toBeLessThanOrEqual(1);
    const out = [sq[0], { x: 1_001, y: 0 }, sq[2], sq[3]];
    expect(hausdorffCm(out, sq)).toBeCloseTo(1, 1);
    // A far vertex is measured as far.
    expect(hausdorffCm([sq[0], sq[1], { x: 1_000, y: 1_500 }, sq[3]], sq)).toBeGreaterThan(350);
    // An inserted vertex 1 cm off an edge: a new turning vertex, > 0.
    expect(hausdorffCm([sq[0], { x: 500, y: 1 }, sq[1], sq[2], sq[3]], sq)).toBeGreaterThan(0);
  });
});

describe('S8 ≡ S9 on the flat fixture (the test size)', () => {
  it('a planted 1 cm shift of one vertex of every working block fails the check on every block that held', { timeout: 300_000 }, () => {
    const base = s8s9(derive('fusion', 1, TEST_SIZE));
    expect(base.compared).toBeGreaterThan(50);
    expect(base.zero).toBeGreaterThan(0);
    // Each ring's first turning vertex moved 1 cm east (a collinear vertex moved along its line would move no point).
    const shifted = s8s9(derive('fusion', 1, TEST_SIZE), (_block, ring) => canonicalRing(ring).map((q, i) => (i === 0 ? { x: q.x + 1, y: q.y } : q)) as unknown as typeof ring);
    expect(shifted.compared).toBe(base.compared);
    // No block holds once its working block moved by 1 cm; the ones that held stand within the shift.
    expect(shifted.zero).toBe(0);
    expect(shifted.within1cm).toBeGreaterThanOrEqual(base.zero);
    expect(shifted.misses.length).toBeGreaterThan(0);
    for (const m of shifted.misses) expect(m.cm).toBeGreaterThan(0);
  });

  it('the Hausdorff check equals 0 on every seed (seeds 1 – 2, both runs)', { timeout: 600_000 }, () => {
    const recs: SeedRecord[] = [];
    for (const seed of [1, 2]) for (const run of ['fusion', 'integrated'] as const) recs.push(measure(derive(run, seed, TEST_SIZE)));
    for (const r of recs) {
      expect(r.hausdorff.compared, `${r.run} seed ${String(r.seed)}`).toBeGreaterThan(0);
      expect({ run: r.run, seed: r.seed, off: r.hausdorff.compared - r.hausdorff.zero, maxCm: r.hausdorff.maxCm, first: r.hausdorff.misses[0] ?? null }).toEqual({ run: r.run, seed: r.seed, off: 0, maxCm: 0, first: null });
    }
  });
});
