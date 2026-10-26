// index/slot-reuse-stage's case data (M0-k-02; N-49's second defect, fix round S1): the case promises "a slot freed
// and reused inside a stage — the query returns the new item", and its last step queries boxOld expecting 'none'.
// That query is only a test of the freed slot when boxOld cannot meet `fresh` by construction: boxOld spans local
// x ∈ [−50, L + 50] and `fresh` starts at x = gap, so the case draws gap ≥ L + 100, leaving ≥ 50 cm of clear lattice
// between them along one axis after placement. Seed 2 drew gap = 7 624 < L + 50 = 7 752 before the fix, putting
// fresh's first vertex (−2 837 055, −431 769) inside boxOld ('query-returns-new-item … met 1 edges, 1 vertices').
import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { casesAt, type ConstructiveInput } from '@plat/testkit';
import { DRAWS } from './support.js';

const CASE = casesAt('M0').find((c) => c.id === 'index/slot-reuse-stage');

function draw(seed: number): ConstructiveInput {
  if (CASE === undefined) throw new Error('index/slot-reuse-stage is not in casesAt(M0)');
  const g = CASE.generate(seed);
  if (g.kind !== 'input') throw new Error(`index/slot-reuse-stage seed ${String(seed)} drew no input`);
  return g;
}

/**
 * The clearance between the closed box `boxOld` and every vertex of `fresh` along the axis that separates them (the
 * largest of the four one-sided gaps; ≤ 0 when no axis separates them, so a segment of `fresh` may meet the box). A
 * positive clearance along an axis means the whole chain — vertices and the segments between them — lies outside.
 */
function clearance(g: ConstructiveInput): number {
  const box = g.rings.boxOld;
  const fresh = g.chains.fresh;
  const bx0 = Math.min(...box.map((p) => p.x));
  const bx1 = Math.max(...box.map((p) => p.x));
  const by0 = Math.min(...box.map((p) => p.y));
  const by1 = Math.max(...box.map((p) => p.y));
  const fx0 = Math.min(...fresh.map((p) => p.x));
  const fx1 = Math.max(...fresh.map((p) => p.x));
  const fy0 = Math.min(...fresh.map((p) => p.y));
  const fy1 = Math.max(...fresh.map((p) => p.y));
  return Math.max(fx0 - bx1, bx0 - fx1, fy0 - by1, by0 - fy1);
}

/** Whether p lies in the closed axis-aligned box of `ring`. */
function inBox(ring: readonly { x: number; y: number }[], p: { x: number; y: number }): boolean {
  const xs = ring.map((q) => q.x);
  const ys = ring.map((q) => q.y);
  return p.x >= Math.min(...xs) && p.x <= Math.max(...xs) && p.y >= Math.min(...ys) && p.y <= Math.max(...ys);
}

describe('index/slot-reuse-stage: boxOld never meets the fresh chain (N-49, gap ≥ L + 100)', () => {
  it('pins seed 2, the draw that put fresh inside boxOld', () => {
    const g = draw(2);
    expect(inBox(g.rings.boxOld, { x: -2_837_055, y: -431_769 })).toBe(false);
    for (const p of g.chains.fresh) expect(inBox(g.rings.boxOld, p), `fresh vertex (${String(p.x)}, ${String(p.y)})`).toBe(false);
    expect(clearance(g)).toBeGreaterThanOrEqual(50);
    // The fixed draw, pinned (L = 7 702, gap = 89 544 along +x after placement): a change to the case's draws shows here.
    expect(g.chains.old).toEqual([
      { x: 4_855_801, y: -431_769 },
      { x: 4_863_503, y: -431_769 },
    ]);
    expect(g.chains.fresh).toEqual([
      { x: 4_945_345, y: -431_769 },
      { x: 4_953_047, y: -431_628 },
    ]);
    // boxFresh still holds the fresh chain whole (the case's other query).
    for (const p of g.chains.fresh) expect(inBox(g.rings.boxFresh, p)).toBe(true);
  });

  it(`keeps ≥ 50 cm between boxOld and fresh on seeds 0 … ${String(DRAWS - 1)}`, () => {
    for (let seed = 0; seed < DRAWS; seed += 1) {
      const g = draw(seed);
      const c = clearance(g);
      if (c < 50) expect.fail(`seed ${String(seed)}: boxOld and fresh are ${String(c)} cm apart (< 50)`);
      for (const p of g.chains.fresh) if (!inBox(g.rings.boxFresh, p)) expect.fail(`seed ${String(seed)}: fresh leaves boxFresh`);
    }
  });

  it('keeps ≥ 50 cm between boxOld and fresh on any u32 seed (property)', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 0xffffffff }), (seed) => clearance(draw(seed)) >= 50),
      { numRuns: 1000 },
    );
  });
});
