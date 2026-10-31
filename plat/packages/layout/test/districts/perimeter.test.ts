// The settlement perimeter (M0-e-04; §4.5 *Perimeter and margin band*): the last stage's boundary offset outward by
// 50 m (`district.perimeter.offsetM`) and rounded — every convex corner an arc of the offset's radius — clipped to the
// frame; the convolution form held equal to §3.4's buffer of the closed ring united with the boundary, and to the
// Minkowski sum by its definition on notched-star and ribbon-finger outlines, whose sharp reflex corners put a miter
// beyond its offset edges (C-0245 (1), C-0252).
import type { Kernel, LatticePoint } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { convolution, isSumRing, OVERLAY_TOLERANCE_CM, settlementPerimeter, settlementPerimeterByBuffer, simpleCcw, SUM_TOLERANCE_CM, unloop } from '../../src/index.js';
import { settlementPerimeterRung } from '../../src/districts/perimeter.js';
import { area2Of, fixtureRandom, insidePoly, kernel, P, ringDist, tableWith, town } from './support.js';

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

/** The C: a 600 m square holding a 400 m cavity whose mouth on the right is 90 m wide (under twice the offset). */
const C_SHAPE = [P(0, 0), P(60_000, 0), P(60_000, 25_500), P(50_000, 25_500), P(50_000, 10_000), P(10_000, 10_000), P(10_000, 50_000), P(50_000, 50_000), P(50_000, 34_500), P(60_000, 34_500), P(60_000, 60_000), P(0, 60_000)];

/** The sum of C_SHAPE as the overlay gives it: the boundary united with its full convolution (rings as they come). */
function cUnion(k: Kernel): LatticePoint[][] {
  const u = k.geom.booleans('union', [C_SHAPE.slice()], [convolution(C_SHAPE, 5000, 'arc') as LatticePoint[]], 'nonzero');
  if (!u.ok) throw new Error(`the C's union was refused: ${u.code}`);
  return u.value;
}

describe('the sum check’s clauses, each alone (note 12; N-c1c-2)', () => {
  it('the enclosure clause: the ring of the C’s hole, reversed, lies in the shell yet does not hold the boundary — refused', () => {
    const k = kernel();
    const holes = cUnion(k).filter((r) => area2Of(r) < 0);
    expect(holes.length).toBe(1);
    const ring = holes[0].slice().reverse();
    // every vertex in the shell (the overlay's tolerance), and the boundary's first vertex outside the ring
    for (const q of ring) expect(Math.abs(ringDist(C_SHAPE, q) - 5000)).toBeLessThanOrEqual(OVERLAY_TOLERANCE_CM);
    expect(insidePoly(ring, C_SHAPE[0])).toBe(false);
    expect(isSumRing(C_SHAPE, ring, 5000, OVERLAY_TOLERANCE_CM)).toBe(false);
    // the outer ring of the same union is the sum's: it passes
    const outer = cUnion(k).filter((r) => area2Of(r) > 0);
    expect(outer.length).toBe(1);
    expect(isSumRing(C_SHAPE, outer[0], 5000, OVERLAY_TOLERANCE_CM)).toBe(true);
  });

  it('the lower bound’s boundary-vertex terms: a chord 30 m from a spike’s tip, its ends 50 m from the tip’s edges — refused', () => {
    // a thin triangle pointing down, tip T at the origin: the sum's ring is the convex convolution (an arc of 50 m
    // about T); cutting the arc's part below y = −30 m leaves one chord whose ends lie 50 m from both of T's edges
    const spike = [P(0, 0), P(1000, 100_000), P(-1000, 100_000)];
    const ring = convolution(spike, 5000, 'arc') as LatticePoint[];
    expect(simpleCcw(ring)).toBe(true);
    expect(isSumRing(spike, ring, 5000, SUM_TOLERANCE_CM)).toBe(true);
    const chorded = ring.filter((q) => q.y >= -3000);
    expect(chorded.length).toBeLessThan(ring.length - 10);
    // the chord: the one edge of the chorded ring passing below the tip, nearer it than 50 m less the tolerance
    let below = 0;
    for (let i = 0; i < chorded.length; i += 1) {
      const a = chorded[i];
      const b = chorded[(i + 1) % chorded.length];
      if (a.x < 0 && b.x > 0) {
        below += 1;
        expect(ringDist([a, b], { x: 0, y: 0 })).toBeLessThan(5000 - SUM_TOLERANCE_CM);
        for (const q of [a, b]) expect(Math.abs(Math.hypot(q.x, q.y) - 5000)).toBeLessThanOrEqual(2);
      }
    }
    expect(below).toBe(1);
    expect(isSumRing(spike, chorded, 5000, SUM_TOLERANCE_CM)).toBe(false);
  });

  it('the crossing test: a zigzag whose two edges cross a boundary edge, every end 50 m from it — refused', () => {
    const k = kernel();
    const r = settlementPerimeter(SQUARE, k);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    // the bottom offset edge, (0, −50 m) → (1 000 m, −50 m), bent into the square and back across its bottom edge
    const i = r.value.findIndex((q) => q.x === 0 && q.y === -5000);
    expect(r.value[(i + 1) % r.value.length]).toEqual(P(100_000, -5000));
    const zig = [...r.value.slice(0, i + 1), P(40_000, -5000), P(50_000, 5000), P(60_000, -5000), ...r.value.slice(i + 1)];
    for (const q of [P(40_000, -5000), P(50_000, 5000), P(60_000, -5000)]) expect(ringDist(SQUARE, q)).toBe(5000);
    expect(insidePoly(zig, SQUARE[0])).toBe(true);
    expect(isSumRing(SQUARE, zig, 5000, SUM_TOLERANCE_CM)).toBe(false);
  });

  it('the nearness clause holds at both ends of one edge: a chord over a notch, its ends near two different edges — refused', () => {
    const k = kernel();
    // the 60 m notch of the U (filled by 2 × 50 m): the sum's ring dips over it in two arcs about the notch's corners
    const u = [P(0, 0), P(40_000, 0), P(40_000, 40_000), P(23_000, 40_000), P(23_000, 10_000), P(17_000, 10_000), P(17_000, 40_000), P(0, 40_000)];
    const r = settlementPerimeter(u, k);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(isSumRing(u, r.value, 5000, SUM_TOLERANCE_CM)).toBe(true);
    const chorded = r.value.filter((q) => !(q.x > 17_000 && q.x < 23_000 && q.y > 40_000));
    expect(chorded.length).toBeLessThan(r.value.length);
    const j = chorded.findIndex((q) => q.x === 23_000 && q.y === 45_000);
    expect(j).toBeGreaterThanOrEqual(0);
    expect(chorded[(j + 1) % chorded.length]).toEqual(P(17_000, 45_000));
    // the chord's middle lies farther than 50 m and the tolerance from the boundary
    expect(ringDist(u, { x: 20_000, y: 45_000 })).toBeGreaterThan(5000 + SUM_TOLERANCE_CM);
    expect(isSumRing(u, chorded, 5000, SUM_TOLERANCE_CM)).toBe(false);
  });
});

describe('the frame clip keeps the largest piece; the others’ land lies outside the perimeter (note 14)', () => {
  it('a boundary leaving the frame and re-entering it: the clip splits the perimeter in two and keeps the larger, either side', () => {
    const k = kernel();
    const frame = [P(0, 0), P(100_000, 0), P(100_000, 100_000), P(0, 100_000)];
    // a U whose base lies below the frame: a wide leg (300 m) and a narrow one (100 m) rise into it, 300 m apart
    for (const wideLeft of [true, false]) {
      const [l0, l1, r0, r1] = wideLeft ? [10_000, 40_000, 70_000, 80_000] : [20_000, 30_000, 60_000, 90_000];
      const u = [P(l0, -30_000), P(r1, -30_000), P(r1, 60_000), P(r0, 60_000), P(r0, -20_000), P(l1, -20_000), P(l1, 60_000), P(l0, 60_000)];
      expect(simpleCcw(u)).toBe(true);
      const pieces = k.geom.booleans('intersection', [convolution(u, 5000, 'arc') as LatticePoint[]], [frame], 'nonzero');
      expect(pieces.ok && pieces.value.filter((q) => area2Of(q) > 0).length).toBe(2);
      const r = settlementPerimeter(u, k, { frame });
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      const wide = { x: wideLeft ? 25_000 : 75_000, y: 30_000 };
      const narrow = { x: wideLeft ? 75_000 : 25_000, y: 30_000 };
      expect(insidePoly(r.value, wide)).toBe(true);
      expect(insidePoly(r.value, narrow)).toBe(false);
      for (const q of r.value) expect(q.x >= 0 && q.x <= 100_000 && q.y >= 0 && q.y <= 100_000).toBe(true);
    }
  });
});

describe('the overlay’s ring is held to simplicity before the sum check (note 15)', () => {
  it('an overlay handing back a ring that retraces an edge is never returned: the buffer rung stands, or with its ring retraced too the perimeter is refused E_INVARIANT', () => {
    const k = kernel();
    let unions = 0;
    let retrace = 0;
    // the kernel as settlementPerimeter reads it, the largest ring of its first `retrace` unions retracing one edge
    const wrapped = {
      geom: {
        buffer: (...args: Parameters<Kernel['geom']['buffer']>) => k.geom.buffer(...args),
        booleans: (...args: Parameters<Kernel['geom']['booleans']>) => {
          const r = k.geom.booleans(...args);
          if (args[0] !== 'union' || !r.ok) return r;
          unions += 1;
          if (unions > retrace) return r;
          let best = 0;
          r.value.forEach((q, i) => {
            if (area2Of(q) > area2Of(r.value[best])) best = i;
          });
          const q = r.value[best];
          const bent = [q[0], q[1], q[0], ...q.slice(1)];
          return { ...r, value: r.value.map((x, i) => (i === best ? bent : x)) };
        },
      },
    } as unknown as Kernel;
    const plain = settlementPerimeterRung(C_SHAPE, wrapped);
    expect(plain.ok).toBe(true);
    expect(unions).toBe(1);
    if (plain.ok) {
      expect(plain.value.rung).toBe('overlay');
      expect(simpleCcw(plain.value.ring)).toBe(true);
    }
    // the overlay's ring retraced: the buffer rung's union (the second) stands
    unions = 0;
    retrace = 1;
    const rung = settlementPerimeterRung(C_SHAPE, wrapped);
    expect(unions).toBe(2);
    expect(rung.ok).toBe(true);
    if (rung.ok) {
      expect(rung.value.rung).toBe('buffer');
      expect(simpleCcw(rung.value.ring)).toBe(true);
      expect(isSumRing(C_SHAPE, rung.value.ring, 5000, OVERLAY_TOLERANCE_CM)).toBe(true);
    }
    // both retraced: refused, the overlay's text with the buffer rung's appended (C-0454; pinned verbatim)
    unions = 0;
    retrace = 2;
    const bad = settlementPerimeter(C_SHAPE, wrapped);
    expect(unions).toBe(2);
    expect(bad.ok).toBe(false);
    if (!bad.ok) {
      expect(bad.code).toBe('E_INVARIANT');
      expect(bad.detail).toBe("settlementPerimeter: the overlay's outer ring is not a simple counter-clockwise ring (the sum check reads a simple one); the buffer rung: the buffer's outer ring is not a simple counter-clockwise ring (the sum check reads a simple one)");
    }
  });
});

/**
 * The kernel as settlementPerimeter reads it, its first union (the overlay's) refused as the router refuses Q133's
 * interior fold (the text family of KI-1) and its buffer `shrinkCm` short when asked.
 */
function refusingOverlay(k: Kernel, shrinkCm = 0): { kernel: Kernel; calls: string[] } {
  const calls: string[] = [];
  let unions = 0;
  const kernel = {
    geom: {
      buffer: (...args: Parameters<Kernel['geom']['buffer']>) => {
        calls.push('buffer');
        const [rings, d, ...rest] = args;
        return k.geom.buffer(rings, typeof d === 'number' ? d - shrinkCm : d, ...rest);
      },
      booleans: (...args: Parameters<Kernel['geom']['booleans']>) => {
        calls.push(args[0]);
        if (args[0] === 'union') {
          unions += 1;
          if (unions === 1) return { ok: false as const, code: 'E_INVARIANT' as const, detail: 'insert: no route from (1, 2) to (3, 4) keeps clearance (§3.10) within the fidelity bound (N-43)' };
        }
        return k.geom.booleans(...args);
      },
    },
  } as unknown as Kernel;
  return { kernel, calls };
}

describe('the buffer rung: where the overlay of the full convolution fails, §3.4’s buffer form stands, checked (Q133; C-0454)', () => {
  it('the overlay refused (Q133 A): the buffer’s ring of the boundary united with it stands — the sum by its check, the reference form’s region', () => {
    const k = kernel();
    const w = refusingOverlay(k);
    const r = settlementPerimeterRung(C_SHAPE, w.kernel);
    expect(w.calls).toEqual(['union', 'buffer', 'union']);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.rung).toBe('buffer');
    expect(simpleCcw(r.value.ring)).toBe(true);
    expect(isSumRing(C_SHAPE, r.value.ring, 5000, OVERLAY_TOLERANCE_CM)).toBe(true);
    const ref = settlementPerimeterByBuffer(C_SHAPE, k);
    expect(ref.ok).toBe(true);
    if (ref.ok) expect(xorArea(k, r.value.ring, ref.value)).toBe(0);
    // settlementPerimeter hands back the same ring
    const plain = settlementPerimeter(C_SHAPE, refusingOverlay(k).kernel);
    expect(plain.ok && plain.value).toEqual(r.value.ring);
  });

  it('the buffer’s ring is held to the sum check too: a buffer 2 m short is refused, the overlay’s text with the buffer rung’s appended (pinned verbatim)', () => {
    const k = kernel();
    const r = settlementPerimeter(C_SHAPE, refusingOverlay(k, 200).kernel);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toBe("settlementPerimeter: the union: insert: no route from (1, 2) to (3, 4) keeps clearance (§3.10) within the fidelity bound (N-43); the buffer rung: the buffer's outer ring is not the boundary's offset (the sum check failed)");
  });

  it('a boundary with a vertex given twice (the same region) takes the rung; one that touches itself keeps the overlay’s refusal, no buffer built', () => {
    const k = kernel();
    const twice = [...C_SHAPE.slice(0, 2), C_SHAPE[1], ...C_SHAPE.slice(2)];
    expect(simpleCcw(twice)).toBe(false);
    const w = refusingOverlay(k);
    const r = settlementPerimeterRung(twice, w.kernel);
    expect(r.ok && r.value.rung).toBe('buffer');
    expect(w.calls).toContain('buffer');
    // the C's lower arm pulled up until its corner touches the upper arm's underside: one point of the ring on another edge
    const touching = C_SHAPE.map((q) => (q.x === 50_000 && q.y === 25_500 ? P(50_000, 34_500) : q.x === 60_000 && q.y === 25_500 ? P(60_000, 30_000) : q));
    expect(simpleCcw(touching)).toBe(false);
    const t = refusingOverlay(k);
    const u = settlementPerimeterRung(touching, t.kernel);
    if (t.calls.includes('union')) {
      expect(u.ok).toBe(false);
      expect(t.calls).not.toContain('buffer');
      if (!u.ok) expect(u.detail).toBe('settlementPerimeter: the union: insert: no route from (1, 2) to (3, 4) keeps clearance (§3.10) within the fidelity bound (N-43)');
    } else {
      // the fast rings stood on it: no overlay, no rung
      expect(u.ok && u.value.rung).not.toBe('buffer');
    }
  });

  it('a boundary pinched at a vertex it visits twice into counter-clockwise lobes (x-06’s self-touching plant) takes the rung, read as the lobes’ union; an antenna or a clockwise lobe keeps the overlay’s refusal', () => {
    const k = kernel();
    // the C (whose fast rings fail) with a 100 m square lobe at its corner (600 m, 600 m), the ring visiting that corner
    // twice: both lobes counter-clockwise
    const withLobe = (lobe: LatticePoint[]): LatticePoint[] => [...C_SHAPE.slice(0, 11), ...lobe, C_SHAPE[10], C_SHAPE[11]];
    const pinched = withLobe([P(70_000, 60_000), P(70_000, 70_000), P(60_000, 70_000)]);
    expect(simpleCcw(pinched)).toBe(false);
    const w = refusingOverlay(k);
    const r = settlementPerimeterRung(pinched, w.kernel);
    expect(w.calls).toEqual(['union', 'buffer', 'union']);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.rung).toBe('buffer');
      expect(simpleCcw(r.value.ring)).toBe(true);
      expect(isSumRing(pinched, r.value.ring, 5000, OVERLAY_TOLERANCE_CM)).toBe(true);
      // the sum of the lobes' union: both squares' centres inside, every ring vertex 50 m from the boundary
      for (const q of [P(5000, 5000), P(65_000, 65_000)]) expect(insidePoly(r.value.ring, q)).toBe(true);
      for (const q of r.value.ring) expect(Math.abs(ringDist(pinched, q) - 5000)).toBeLessThanOrEqual(OVERLAY_TOLERANCE_CM);
    }
    // an antenna: from the corner a spike 100 m out and back (a lobe of two points), no region reading
    const antenna = withLobe([P(70_000, 70_000)]);
    const a = refusingOverlay(k);
    const ra = settlementPerimeterRung(antenna, a.kernel);
    expect(a.calls).toEqual(['union']);
    expect(ra.ok).toBe(false);
    if (!ra.ok) expect(ra.detail).toBe('settlementPerimeter: the union: insert: no route from (1, 2) to (3, 4) keeps clearance (§3.10) within the fidelity bound (N-43)');
    // a clockwise lobe at the corner (a hole touching the boundary), no region reading: the overlay's refusal kept
    const cwLobe = withLobe([P(62_000, 70_000), P(70_000, 70_000), P(70_000, 62_000)]);
    expect(area2Of(cwLobe)).toBeGreaterThan(0);
    const c = refusingOverlay(k);
    const rc = settlementPerimeterRung(cwLobe, c.kernel);
    expect(c.calls).toEqual(['union']);
    expect(rc.ok).toBe(false);
  });

  it('the fast rings and the overlay come first: on the C (whose fast rings fail) the overlay stands and no buffer is built; on the square the fast ring stands', () => {
    const k = kernel();
    const calls: string[] = [];
    const spy = {
      geom: {
        buffer: (...args: Parameters<Kernel['geom']['buffer']>) => {
          calls.push('buffer');
          return k.geom.buffer(...args);
        },
        booleans: (...args: Parameters<Kernel['geom']['booleans']>) => {
          calls.push(args[0]);
          return k.geom.booleans(...args);
        },
      },
    } as unknown as Kernel;
    const c = settlementPerimeterRung(C_SHAPE, spy);
    expect(c.ok && c.value.rung).toBe('overlay');
    expect(calls).toEqual(['union']);
    calls.length = 0;
    const sq = settlementPerimeterRung(SQUARE, spy);
    expect(sq.ok && sq.value.rung).toBe('fast');
    expect(calls).toEqual([]);
    const none = settlementPerimeterRung(SQUARE, spy, { offsetCm: 0 });
    expect(none.ok && none.value.rung).toBe('none');
  });
});

describe('the sum check’s upper bound reads the boundary as a whole (Q133 B1; note 10’s near-collinear form; C-0454)', () => {
  // a 800 m × 400 m block whose bottom side is four near-collinear edges (turns of a few thousandths of a degree,
  // never exactly collinear, so mergeCollinear keeps every vertex), and the sum's outer ring with ONE straight edge
  // 50 m below the whole side: each end of that edge is near a different boundary edge, no single edge near both
  const BLOCK = [P(0, 0), P(20_000, -3), P(40_000, -4), P(60_000, -3), P(80_000, 0), P(80_000, 40_000), P(0, 40_000)];
  // the sum's outer ring drawn directly: quarter arcs of 50 m about the block's corners (64 chords each, a sagitta
  // under 0.4 cm), the bottom run one straight edge from (0, y) to (800 m, y)
  const arc = (cx: number, cy: number, from: number): LatticePoint[] => {
    const out: LatticePoint[] = [];
    for (let s = 0; s <= 64; s += 1) {
      const t = ((from + (s * 90) / 64) * Math.PI) / 180;
      out.push(P(Math.round(cx + 5000 * Math.cos(t)), Math.round(cy + 5000 * Math.sin(t))));
    }
    return out;
  };
  const ringBelow = (y: number): LatticePoint[] => {
    const r = [P(0, y), P(80_000, y), ...arc(80_000, 0, 270), ...arc(80_000, 40_000, 0), ...arc(0, 40_000, 90), ...arc(0, 0, 180)];
    return r.filter((q, i) => i === 0 || q.x !== r[i - 1].x || q.y !== r[i - 1].y).filter((q, i, a) => i < a.length - 1 || q.x !== a[0].x || q.y !== a[0].y);
  };

  it('a ring edge beside a near-collinear run, every point of it within the bound of the boundary, passes; no single boundary edge is near both its ends', () => {
    const ring = ringBelow(-5000);
    expect(simpleCcw(ring)).toBe(true);
    // the precondition: the long edge's two ends are each near a different end edge, and no boundary edge is near both
    const near = (q: LatticePoint, i: number) => ringDist([BLOCK[i], BLOCK[(i + 1) % BLOCK.length]], q) <= 5000 + SUM_TOLERANCE_CM;
    expect([0, 1, 2, 3, 4, 5, 6].filter((i) => near(P(0, -5000), i) && near(P(80_000, -5000), i))).toEqual([]);
    // every point of it lies 49.96 – 50.00 m from the boundary as a whole (sampled each metre)
    for (let x = 0; x <= 80_000; x += 100) {
      const dd = ringDist(BLOCK, { x, y: -5000 });
      expect(dd).toBeGreaterThanOrEqual(5000 - SUM_TOLERANCE_CM);
      expect(dd).toBeLessThanOrEqual(5000 + SUM_TOLERANCE_CM);
    }
    expect(isSumRing(BLOCK, ring, 5000, SUM_TOLERANCE_CM)).toBe(true);
    expect(isSumRing(BLOCK, ring, 5000, OVERLAY_TOLERANCE_CM)).toBe(true);
  });

  it('an edge whose middle lies near the boundary but whose quarters stray 3 m past it (two shallow notches) is refused: the halving reads every piece', () => {
    const NOTCHED = [P(0, 0), P(10_000, 0), P(20_000, 300), P(30_000, 0), P(50_000, 0), P(60_000, 300), P(70_000, 0), P(80_000, 0), P(80_000, 40_000), P(0, 40_000)];
    const r = [P(0, -5000), P(80_000, -5000), ...arc(80_000, 0, 270), ...arc(80_000, 40_000, 0), ...arc(0, 40_000, 90), ...arc(0, 0, 180)];
    const ring = r.filter((q, i) => i === 0 || q.x !== r[i - 1].x || q.y !== r[i - 1].y).filter((q, i, a) => i < a.length - 1 || q.x !== a[0].x || q.y !== a[0].y);
    expect(simpleCcw(ring)).toBe(true);
    expect(ringDist(NOTCHED, { x: 40_000, y: -5000 })).toBe(5000);
    expect(ringDist(NOTCHED, { x: 20_000, y: -5000 })).toBeGreaterThan(5000 + OVERLAY_TOLERANCE_CM);
    expect(isSumRing(NOTCHED, ring, 5000, OVERLAY_TOLERANCE_CM)).toBe(false);
  });

  it('the same edge 2 m too far, or bowed 2 m out at its middle, is refused: a point of it lies beyond the bound', () => {
    expect(isSumRing(BLOCK, ringBelow(-5200), 5000, SUM_TOLERANCE_CM)).toBe(false);
    const bowed = ringBelow(-5000);
    const j = bowed.findIndex((q) => q.x === 80_000 && q.y === -5000);
    bowed.splice(j, 0, P(40_000, -5204));
    expect(simpleCcw(bowed)).toBe(true);
    expect(isSumRing(BLOCK, bowed, 5000, SUM_TOLERANCE_CM)).toBe(false);
    expect(isSumRing(BLOCK, bowed, 5000, OVERLAY_TOLERANCE_CM)).toBe(false);
  });
});
