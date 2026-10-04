// M0-a-10: lir — §3.1 ("LIR sampled deterministically over four candidate axes — OBB long axis, frontage normal,
// ± 45°"), §3.4's one contract (GEO-7) and §13.1's property "LIR inside the face". Containment is judged by an
// independent even–odd test, a vertex-in-rectangle test and a side-crossing test (support.ts's rectInside).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { LIR_MARGIN, hull, lir, lirAxes, obb } from '../../src/geom/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { TIMEOUT, constructiveRing, generator, intIn, isSimple, pt, randomRing, rectInside, starShaped } from './support.js';

describe('lir (§3.1, §3.4, §13.1)', () => {
  it('fills an axis-aligned rectangle up to the margin', () => {
    const ring = [pt(0, 0), pt(4000, 0), pt(4000, 1000), pt(0, 1000)];
    const r = lir(ring);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.widthCm).toBeCloseTo(4000 - 2 * LIR_MARGIN, 6);
    expect(r.value.depthCm).toBeCloseTo(1000 - 2 * LIR_MARGIN, 6);
    expect(r.value.axisIndex).toBe(0); // the OBB's long axis comes first
    expect(rectInside(ring, r.value.corners)).toBe(true);
  });

  it('finds a large rectangle in an L-shaped and a C-shaped ring, strictly inside', () => {
    const L = [pt(0, 0), pt(6000, 0), pt(6000, 2000), pt(2000, 2000), pt(2000, 6000), pt(0, 6000)];
    const C = [pt(0, 0), pt(6000, 0), pt(6000, 1500), pt(1500, 1500), pt(1500, 4500), pt(6000, 4500), pt(6000, 6000), pt(0, 6000)];
    for (const ring of [L, C]) {
      const r = lir(ring);
      expect(r.ok).toBe(true);
      if (!r.ok) continue;
      expect(rectInside(ring, r.value.corners)).toBe(true);
      expect(r.value.areaCm2).toBeGreaterThan(0.6 * 6000 * 1500);
    }
  });

  it('reads the frontage normal among its axes and skips an unusable axis', () => {
    const ring = [pt(0, 0), pt(5000, 0), pt(5000, 3000), pt(0, 3000)];
    const box = obb(ring);
    expect(box.ok).toBe(true);
    if (!box.ok) return;
    const axes = lirAxes(box.value, { x: 0, y: 1 });
    expect(axes).toHaveLength(4);
    expect(axes[0]).toEqual({ x: 1, y: 0 });
    expect(axes[1]).toEqual({ x: 0, y: 1 });
    const withBad = lir(ring, [{ x: 0, y: 0 }, { x: Number.NaN, y: 1 }, { x: 0, y: 2 }]);
    expect(withBad.ok && withBad.value.axisIndex).toBe(2);
    const allBad = lir(ring, [{ x: 0, y: 0 }]);
    expect(allBad.ok && rectInside(ring, allBad.value.corners)).toBe(true);
    expect(() => lir(ring, undefined, { levels: 0 })).toThrow(RangeError);
  });

  it('the convex path finds the general slabs\' rectangle on convex rings (the same slab, the same area to 10⁻⁹)', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 0x7fffffff }), fc.integer({ min: 3, max: 12 }), fc.integer({ min: 100, max: 3_000_000 }), (seed, n, r) => {
        const rnd = generator(seed);
        // a convex ring: a regular n-gon's vertices pushed outward at random keep it convex only rarely, so take a hull
        const pts = starShaped(rnd, 3 * n, r * 0.5, r, intIn(rnd, -4e6, 4e6), intIn(rnd, -4e6, 4e6));
        const h = hull(pts);
        if (!h.ok) return;
        const fast = lir(h.value);
        const slow = lir(h.value, undefined, { path: 'slabs' });
        expect(fast.ok).toBe(slow.ok);
        if (!fast.ok || !slow.ok) return;
        expect(rectInside(h.value, fast.value.corners)).toBe(true);
        expect(Math.abs(fast.value.areaCm2 - slow.value.areaCm2)).toBeLessThanOrEqual(1e-9 * slow.value.areaCm2 + 1e-6);
      }),
      { numRuns: 1000 },
    );
  }, TIMEOUT);

  it('returns E_DEGENERATE `collinear` for fewer than 3 distinct points or a collinear ring, `empty` for a ring with no interior', () => {
    expect(lir([pt(0, 0), pt(10, 10)])).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'collinear' });
    expect(lir([pt(0, 0), pt(10, 10), pt(20, 20)])).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'collinear' });
    expect(lir([pt(0, 0), pt(1000, 0), pt(1000, 1000), pt(1000, 0)])).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    expect(lir([pt(0, 0), pt(1000, 0), { x: 5, y: Number.NaN } as LatticePoint])).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
  });

  it('LIR inside the face: on random simple rings, the rectangle lies strictly inside and has positive extents', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 0x7fffffff }), fc.integer({ min: 3, max: 60 }), fc.integer({ min: 30, max: 2_000_000 }), (seed, n, r) => {
        const rnd = generator(seed);
        const ring = starShaped(rnd, n, r * 0.15, r, intIn(rnd, -5e6, 5e6), intIn(rnd, -5e6, 5e6));
        const res = lir(ring);
        if (!res.ok) {
          expect(res.code).toBe('E_DEGENERATE');
          return;
        }
        expect(res.value.widthCm).toBeGreaterThan(0);
        expect(res.value.depthCm).toBeGreaterThan(0);
        expect(rectInside(ring, res.value.corners)).toBe(true);
      }),
      { numRuns: 2000 },
    );
  }, TIMEOUT);

  it('LIR inside the face on the constructive classes and on thin rings (the fallback slabs)', () => {
    fc.assert(
      fc.property(fc.oneof(constructiveRing(), randomRing(false)), (ring) => {
        const res = lir(ring);
        if (!res.ok) return;
        expect(res.value.widthCm).toBeGreaterThan(0);
        expect(res.value.depthCm).toBeGreaterThan(0);
        // only simple rings have an inside to judge against; every result lies in the even–odd region
        expect(rectInside(ring, res.value.corners, 1e-7) || !isSimple(ring)).toBe(true);
      }),
      { numRuns: 1000 },
    );
    // one level step (K = 1): the only slab spans the whole v-range, where a triangle's apex leaves it no room — the
    // vertex-level slabs (the fallback) find the rectangle
    const tri = [pt(0, 0), pt(6000, 0), pt(3000, 4000)];
    for (const path of ['auto', 'slabs'] as const) {
      const t = lir(tri, undefined, { levels: 1, path });
      expect(t.ok && rectInside(tri, t.value.corners) && t.value.areaCm2 > 0.2 * 12_000_000).toBe(true);
    }
    // a thin diagonal sliver: no slab of the eight-level grid holds a rectangle on the ± 45° axes, the OBB axis does
    const sliver = [pt(0, 0), pt(100_000, 100_000), pt(100_000, 100_003), pt(0, 3)];
    const s = lir(sliver);
    expect(s.ok && rectInside(sliver, s.value.corners)).toBe(true);
  }, TIMEOUT);
});
