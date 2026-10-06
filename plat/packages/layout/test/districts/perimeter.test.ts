// The settlement perimeter (M0-e-04; §4.5 *Perimeter and margin band*): the last stage's boundary offset outward by
// 50 m (`district.perimeter.offsetM`) and rounded — every convex corner an arc of the offset's radius — clipped to the
// frame; the convolution form held equal to §3.4's buffer of the closed ring united with the boundary (C-0245 (1)).
import { attachIndex, createKernel, createPlat, type Cm, type Kernel, type LatticePoint } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { convolution, settlementPerimeter, settlementPerimeterByBuffer, simpleCcw, unloop } from '../../src/index.js';
import { area2Of, GROUND, insidePoly, P, ringDist, tableWith, town } from './support.js';

function kernel(): Kernel {
  const plat = createPlat(GROUND, { widthCm: 1_000_000 as Cm, heightCm: 1_000_000 as Cm, aspect: 1, marginShare: 0.3 });
  attachIndex(plat, { gridCellCm: 5000 });
  return createKernel(new Map([[GROUND, plat]]), { spineWidths: () => null });
}

/** The area of the symmetric difference of two rings (cm²). */
function xorArea(k: Kernel, a: LatticePoint[], b: LatticePoint[]): number {
  const x = k.geom.booleans('xor', [a], [b], 'nonzero');
  if (!x.ok) return 0;
  let s = 0;
  for (const r of x.value) s += Math.abs(area2Of(r)) / 2;
  return s;
}

const SQUARE = [P(0, 0), P(100_000, 0), P(100_000, 100_000), P(0, 100_000)];

describe('the perimeter: the boundary offset outward by 50 m and rounded (§4.5)', () => {
  it('every perimeter vertex lies 50 m from the boundary (± 1 cm), outside it; the corners are arcs about the corner', () => {
    const k = kernel();
    const r = settlementPerimeter(SQUARE, k);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const ring = r.value;
    expect(area2Of(ring)).toBeGreaterThan(0);
    for (const q of ring) {
      expect(Math.abs(ringDist(SQUARE, q) - 5000)).toBeLessThanOrEqual(1);
      expect(insidePoly(SQUARE, q)).toBe(false);
    }
    // Rounded: the corner (100 000, 100 000) is passed on an arc — vertices strictly between the two offset edges' ends,
    // each 50 m from the corner.
    const arc = ring.filter((q) => q.x > 100_000 && q.y > 100_000);
    expect(arc.length).toBeGreaterThan(10);
    for (const q of arc) expect(Math.abs(Math.hypot(q.x - 100_000, q.y - 100_000) - 5000)).toBeLessThanOrEqual(1);
    // The area: the square, four strips and a disc of 50 m (chords inside the arc by at most 2 cm sagitta).
    const want = 1e10 + 4 * 100_000 * 5000 + Math.PI * 5000 * 5000;
    expect(Math.abs(area2Of(ring) / 2 - want) / want).toBeLessThan(1e-4);
  });

  it('reads the offset from district.json (a changed cell moves the perimeter)', () => {
    const k = kernel();
    const r = settlementPerimeter(SQUARE, k, { tables: tableWith('district', 'perimeter', 'offsetM', 20) });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    for (const q of r.value) expect(Math.abs(ringDist(SQUARE, q) - 2000)).toBeLessThanOrEqual(1);
  });

  it('equals §3.4’s buffer of the closed ring united with the boundary (the synthetic towns’ last boundaries)', () => {
    for (const seed of [1, 2]) {
      const t = town(seed, { noGrid: true });
      const a = settlementPerimeter(t.boundary, t.k, { frame: t.frame });
      const b = settlementPerimeterByBuffer(t.boundary, t.k, { frame: t.frame });
      expect(a.ok && b.ok).toBe(true);
      if (!a.ok || !b.ok) return;
      // the two forms place their arc chords alike; the regions agree to within a few m² over ≈ 250 ha
      expect(xorArea(t.k, a.value, b.value)).toBeLessThan(10 * 10_000);
      expect(simpleCcw(a.value)).toBe(true);
    }
  });

  it('a concavity narrower than twice the offset is filled; a wider one is followed', () => {
    const k = kernel();
    // A U: a 400 m square with a notch cut in from the top, 60 m wide (filled by 2 × 50 m) or 200 m wide (followed).
    for (const [w, filled] of [
      [6000, true],
      [20_000, false],
    ] as const) {
      const l = 20_000 - w / 2;
      const rr = 20_000 + w / 2;
      const u = [P(0, 0), P(40_000, 0), P(40_000, 40_000), P(rr, 40_000), P(rr, 10_000), P(l, 10_000), P(l, 40_000), P(0, 40_000)];
      const r = settlementPerimeter(u, k);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(simpleCcw(r.value)).toBe(true);
      // The notch's middle, 300 m up: inside the perimeter when filled, outside when followed.
      expect(insidePoly(r.value, { x: 20_000, y: 30_000 })).toBe(filled);
      // The Minkowski sum by its definition: a sample point nearer the boundary's region than 50 m less 5 cm lies
      // inside the perimeter, one farther than 50 m and 5 cm outside it (a 5 m grid over the box).
      for (let x = -6000; x <= 46_000; x += 500) {
        for (let y = -6000; y <= 46_000; y += 500) {
          const q = { x, y };
          const d = insidePoly(u, q) ? 0 : ringDist(u, q);
          if (d < 4995) expect(insidePoly(r.value, q)).toBe(true);
          else if (d > 5005) expect(insidePoly(r.value, q)).toBe(false);
        }
      }
    }
  });

  it('the raw curve folds in a narrow concavity; the fold cut leaves a simple ring', () => {
    const u = [P(0, 0), P(40_000, 0), P(40_000, 40_000), P(23_000, 40_000), P(23_000, 10_000), P(17_000, 10_000), P(17_000, 40_000), P(0, 40_000)];
    const raw = convolution(u, 5000, 'miter');
    expect(raw).not.toBeNull();
    expect(simpleCcw(raw as LatticePoint[])).toBe(false);
    expect(simpleCcw(unloop(raw as LatticePoint[]))).toBe(true);
  });

  it('is clipped to the frame where it would leave it; a boundary of no area is refused', () => {
    const k = kernel();
    const frame = [P(-2000, -2000), P(200_000, -2000), P(200_000, 200_000), P(-2000, 200_000)];
    const r = settlementPerimeter(SQUARE, k, { frame });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    for (const q of r.value) expect(q.x >= -2000 && q.y >= -2000).toBe(true);
    expect(r.value.some((q) => q.x === -2000)).toBe(true);
    expect(settlementPerimeter([P(0, 0), P(10, 0)], k).ok).toBe(false);
    const cw = SQUARE.slice().reverse();
    const bad = settlementPerimeter(cw, k);
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.code).toBe('E_DEGENERATE');
    const zero = settlementPerimeter(SQUARE, k, { offsetCm: 0 });
    expect(zero.ok && zero.value).toEqual(SQUARE);
  });
});
