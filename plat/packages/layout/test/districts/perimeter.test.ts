// The settlement perimeter (M0-e-04; §4.5 *Perimeter and margin band*): the last stage's boundary offset outward by
// 50 m (`district.perimeter.offsetM`) and rounded — every convex corner an arc of the offset's radius — clipped to the
// frame; the convolution form held equal to §3.4's buffer of the closed ring united with the boundary, and to the
// Minkowski sum by its definition on notched-star and ribbon-finger outlines, whose sharp reflex corners put a miter
// beyond its offset edges (C-0245 (1); fix round 1 of the first check's B-1).
import { attachIndex, createKernel, createPlat, type Cm, type Kernel, type LatticePoint } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { convolution, isSumRing, OVERLAY_TOLERANCE_CM, settlementPerimeter, settlementPerimeterByBuffer, simpleCcw, SUM_TOLERANCE_CM, unloop } from '../../src/index.js';
import { area2Of, fixtureRandom, GROUND, insidePoly, P, ringDist, tableWith, town } from './support.js';

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

/** A town outline with ribbon fingers (growth along roads): a 500 m circle of 96 points with 3–8 rectangular fingers, 15–40 m wide and 80–300 m long. */
function fingerRing(seed: number): LatticePoint[] {
  const rand = fixtureRandom(seed * 977);
  const R = 50_000;
  const nf = 3 + Math.floor(rand() * 6);
  const fingers: { a: number; w: number; len: number }[] = [];
  for (let f = 0; f < nf; f += 1) fingers.push({ a: rand() * 2 * Math.PI, w: 1500 + rand() * 2500, len: 8000 + rand() * 22_000 });
  fingers.sort((x, y) => x.a - y.a);
  const ring: LatticePoint[] = [];
  const m = 96;
  for (let i = 0; i < m; i += 1) {
    const a = (2 * Math.PI * i) / m;
    const a2 = (2 * Math.PI * (i + 1)) / m;
    ring.push(P(R * Math.cos(a), R * Math.sin(a)));
    for (const f of fingers) {
      if (f.a < a || f.a >= a2) continue;
      const ux = Math.cos(f.a);
      const uy = Math.sin(f.a);
      const hw = f.w / 2;
      const bx = R * ux;
      const by = R * uy;
      ring.push(P(bx + uy * hw, by - ux * hw), P(bx + ux * f.len + uy * hw, by + uy * f.len - ux * hw), P(bx + ux * f.len - uy * hw, by + uy * f.len + ux * hw), P(bx - uy * hw, by + ux * hw));
    }
  }
  return ring;
}

/** A star ring with deep notches: 12–51 points round a 300–900 m radius, one in four pulled in to 20–50 % of it. */
function starRing(seed: number): LatticePoint[] {
  const rand = fixtureRandom(seed * 101);
  const m = 12 + Math.floor(rand() * 40);
  const R = 30_000 + rand() * 60_000;
  const ring: LatticePoint[] = [];
  for (let i = 0; i < m; i += 1) {
    const a = (2 * Math.PI * i) / m;
    const r = rand() < 0.25 ? R * (0.2 + 0.3 * rand()) : R * (0.85 + 0.3 * rand());
    ring.push(P(r * Math.cos(a), r * Math.sin(a)));
  }
  return ring;
}

/** The test's own reading of the sum (no code under test): the ring's misses on a grid of `step` cm over the box. */
function definitionMisses(boundary: readonly LatticePoint[], per: readonly LatticePoint[], d: number, tol: number, step: number): { landOutside: number; nearOutside: number; farInside: number; checked: number } {
  let xs = Infinity;
  let xe = -Infinity;
  let ys = Infinity;
  let ye = -Infinity;
  for (const p of boundary) {
    xs = Math.min(xs, p.x);
    xe = Math.max(xe, p.x);
    ys = Math.min(ys, p.y);
    ye = Math.max(ye, p.y);
  }
  let landOutside = 0;
  let nearOutside = 0;
  let farInside = 0;
  let checked = 0;
  for (let x = xs - d - 1000; x <= xe + d + 1000; x += step) {
    for (let y = ys - d - 1000; y <= ye + d + 1000; y += step) {
      const q = { x: x + 0.5, y: y + 0.5 };
      const land = insidePoly(boundary, q);
      const dist = land ? 0 : ringDist(boundary, q);
      if (dist > d - tol && dist < d + tol) continue;
      checked += 1;
      const inside = insidePoly(per, q);
      if (land && !inside) landOutside += 1;
      if (dist < d - tol && !inside) nearOutside += 1;
      if (dist > d + tol && inside) farInside += 1;
    }
  }
  return { landOutside, nearOutside, farInside, checked };
}

function ringLength(r: readonly LatticePoint[]): number {
  let s = 0;
  for (let i = 0; i < r.length; i += 1) s += Math.hypot(r[(i + 1) % r.length].x - r[i].x, r[(i + 1) % r.length].y - r[i].y);
  return s;
}

describe('the perimeter is the Minkowski sum on sharp reflex corners (C-0245 (1); the first check’s B-1)', () => {
  it('ribbon-finger seed 7 and notched-star seed 9: the mitred curve, folds cut, is simple yet no sum — the check refuses it, the perimeter holds the land', { timeout: 300_000 }, () => {
    const k = kernel();
    for (const ring of [fingerRing(7), starRing(9)]) {
      expect(simpleCcw(ring)).toBe(true);
      const mitred = unloop(convolution(ring, 5000, 'miter') as LatticePoint[]);
      // the fault the check names: a simple counter-clockwise ring that leaves land of the sum outside
      expect(simpleCcw(mitred)).toBe(true);
      expect(definitionMisses(ring, mitred, 5000, OVERLAY_TOLERANCE_CM, 1000).nearOutside).toBeGreaterThan(0);
      expect(isSumRing(ring, mitred, 5000, OVERLAY_TOLERANCE_CM)).toBe(false);
      const r = settlementPerimeter(ring, k);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(isSumRing(ring, r.value, 5000, OVERLAY_TOLERANCE_CM)).toBe(true);
      for (const v of ring) expect(insidePoly(r.value, v)).toBe(true);
    }
  });

  it('where the fully mitred ring fails the check, the ring mitred on its segments stands: the sum to 5 cm, no overlay (stars 2, 3, 7)', () => {
    const k = kernel();
    for (const seed of [2, 3, 7]) {
      const ring = starRing(seed);
      const mitred = unloop(convolution(ring, 5000, 'miter') as LatticePoint[]);
      expect(simpleCcw(mitred) && isSumRing(ring, mitred, 5000, SUM_TOLERANCE_CM)).toBe(false);
      const r = settlementPerimeter(ring, k);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.value).toEqual(unloop(convolution(ring, 5000, 'onSegments') as LatticePoint[]));
      expect(isSumRing(ring, r.value, 5000, SUM_TOLERANCE_CM)).toBe(true);
    }
  });

  it('on generated notched stars and ribbon fingers, point by point: the land and every point within 50 m inside, none beyond it', { timeout: 600_000 }, () => {
    const k = kernel();
    const rings: LatticePoint[][] = [];
    for (let seed = 1; seed <= 10; seed += 1) rings.push(fingerRing(seed));
    for (let seed = 1; seed <= 12; seed += 1) rings.push(starRing(seed));
    let tested = 0;
    for (const ring of rings) {
      if (!simpleCcw(ring)) continue;
      const r = settlementPerimeter(ring, k);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(simpleCcw(r.value)).toBe(true);
      const m = definitionMisses(ring, r.value, 5000, OVERLAY_TOLERANCE_CM, 500);
      expect(m.checked).toBeGreaterThan(10_000);
      expect([m.landOutside, m.nearOutside, m.farInside]).toEqual([0, 0, 0]);
      tested += 1;
    }
    expect(tested).toBeGreaterThanOrEqual(18);
  });

  it('agrees with §3.4’s buffer form on them: the two regions differ by at most a 10 cm strip along the perimeter', { timeout: 600_000 }, () => {
    const k = kernel();
    for (const ring of [fingerRing(7), fingerRing(1), starRing(9), starRing(2), starRing(5)]) {
      const a = settlementPerimeter(ring, k);
      const b = settlementPerimeterByBuffer(ring, k);
      expect(a.ok && b.ok).toBe(true);
      if (!a.ok || !b.ok) return;
      const x = k.geom.booleans('xor', [a.value], [b.value], 'nonzero');
      // an empty difference is the overlay's E_DEGENERATE `empty`
      if (!x.ok) expect(x.code).toBe('E_DEGENERATE');
      let area = 0;
      if (x.ok) for (const q of x.value) area += Math.abs(area2Of(q)) / 2;
      expect(area).toBeLessThanOrEqual(10 * ringLength(a.value));
    }
  });

  it('the check: the true sum passes at the fast tolerance; a ring 1 m short or 1 m long, one not round the boundary or one cutting its corner fails', () => {
    const k = kernel();
    const r = settlementPerimeter(SQUARE, k);
    const short = settlementPerimeter(SQUARE, k, { offsetCm: 4900 });
    const long = settlementPerimeter(SQUARE, k, { offsetCm: 5100 });
    expect(r.ok && short.ok && long.ok).toBe(true);
    if (!r.ok || !short.ok || !long.ok) return;
    expect(isSumRing(SQUARE, r.value, 5000, SUM_TOLERANCE_CM)).toBe(true);
    expect(isSumRing(SQUARE, short.value, 5000, SUM_TOLERANCE_CM)).toBe(false);
    expect(isSumRing(SQUARE, long.value, 5000, SUM_TOLERANCE_CM)).toBe(false);
    expect(isSumRing(SQUARE, r.value.map((q) => P(q.x + 300_000, q.y)), 5000, SUM_TOLERANCE_CM)).toBe(false);
    // a ring cutting a corner off the square (its corner's land outside)
    const cut = r.value.filter((q) => !(q.x > 90_000 && q.y > 90_000));
    expect(isSumRing(SQUARE, cut, 5000, OVERLAY_TOLERANCE_CM)).toBe(false);
  });

  it('a hairline notch (its reflex miter past ratio’s floor) is no throw: the arc is taken, the notch filled', () => {
    const k = kernel();
    // a V notch 2 cm wide at the top, 300 m deep, in a 400 m square
    const v = [P(0, 0), P(40_000, 0), P(40_000, 40_000), P(20_001, 40_000), P(20_000, 10_000), P(19_999, 40_000), P(0, 40_000)];
    expect(simpleCcw(v)).toBe(true);
    const r = settlementPerimeter(v, k);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(isSumRing(v, r.value, 5000, OVERLAY_TOLERANCE_CM)).toBe(true);
    expect(insidePoly(r.value, { x: 20_000, y: 30_000 })).toBe(true);
  });
});
