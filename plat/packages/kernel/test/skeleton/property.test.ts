// M0-a-11: §13.1's skeleton property — "every straight-skeleton output passes the §3.8 validator — a connected graph
// inside the face whose number of independent cycles equals the number of holes — or is a reported downgrade" — and
// its ladder-coverage clauses "no roof line lies outside its footprint" and "a skeleton failure is never a crash", on
// random star-shaped faces with and without holes at three scales (fast-check, PLAT_FUZZ_RUNS cases). Each validated
// output is re-validated here and its arcs are checked inside the face independently; each downgrade is the reader's
// typed one (§3.8, §5.2 F-SKELETON); the result is the same on a second call (nothing stored).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { DOWNGRADE_OF, skeleton, skeletonEventLimit, validateSkeleton, type SkeletonUse } from '../../src/skeleton/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { TIMEOUT, arcsInFace, regularNgon, snapped } from './support.js';

const face = fc
  .record({
    m: fc.integer({ min: 3, max: 24 }),
    jitter: fc.array(fc.double({ min: 0, max: 1, noNaN: true }), { minLength: 48, maxLength: 48 }),
    scale: fc.constantFrom(400, 4_000, 40_000),
    holes: fc.array(fc.record({ k: fc.integer({ min: 3, max: 8 }), a: fc.double({ min: 0, max: 6.28, noNaN: true }), d: fc.double({ min: 0, max: 0.4, noNaN: true }), r: fc.double({ min: 0.03, max: 0.12, noNaN: true }) }), { maxLength: 2 }),
    use: fc.constantFrom<SkeletonUse>('roof', 'spine', 'regions'),
  })
  .map(({ m, jitter, scale, holes, use }) => {
    const outer: LatticePoint[] = [];
    for (let k = 0; k < m; k += 1) {
      const a = ((k + 0.15 + jitter[2 * k] * 0.7) * 2 * Math.PI) / m;
      const r = scale * (0.55 + 0.45 * jitter[2 * k + 1]);
      const p = snapped(r * Math.cos(a), r * Math.sin(a));
      const q = outer[outer.length - 1];
      if (q === undefined || q.x !== p.x || q.y !== p.y) outer.push(p);
    }
    const rings: LatticePoint[][] = [outer];
    for (const h of holes) rings.push(regularNgon(h.k, h.r * scale, h.a, h.d * scale * Math.cos(h.a), h.d * scale * Math.sin(h.a)));
    return { rings, use };
  });

describe('property: every output validated with every arc inside the face, or the reader’s typed downgrade (§13.1)', () => {
  it('random star-shaped faces with 0 – 2 holes, every use', { timeout: TIMEOUT }, () => {
    const counts = { validated: 0, contract: 0, other: 0 };
    fc.assert(
      fc.property(face, ({ rings, use }) => {
        const r = skeleton(rings, use);
        if (!r.ok) return false; // lattice input: never an error
        const again = skeleton(rings, use);
        expect(again).toEqual(r);
        const v = r.value;
        if (v.kind === 'downgrade') {
          if (v.cause.code === 'contract') counts.contract += 1;
          else counts.other += 1;
          return v.use === use && v.to === DOWNGRADE_OF[use] && r.warnings.length === 1 && r.warnings[0].code === 'W_DOWNGRADE';
        }
        counts.validated += 1;
        let n = 0;
        for (const ring of v.rings) n += ring.length;
        return validateSkeleton(v).ok && arcsInFace(v) && v.events <= skeletonEventLimit(n, n) && r.warnings.length === 0;
      }),
    );
    console.log(`[M0-a-11 property] validated ${counts.validated}, contract refusals ${counts.contract}, other downgrades ${counts.other}`);
    expect(counts.validated).toBeGreaterThan(0);
  });
});
