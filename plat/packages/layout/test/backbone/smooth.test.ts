// M0-c-03: one smoothing per chain (§4.3: "each chain is simplified (Visvalingam) and smoothed (Chaikin × 2, then
// curvature-limited to the class's minimum radius) once, with its end nodes pinned"; C-0236 (5), (7)).
import { describe, expect, it } from 'vitest';
import { belowRadiusAt, chaikinRuns, countBelowRadius, curvatureLimit, simplifyChain, smoothChain } from '../../src/index.js';
import { P } from './support.js';

/** Points on a circle of radius r (cm) every `stepDeg` degrees from 0 to `toDeg`. */
function arc(r: number, stepDeg: number, toDeg: number): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  for (let a = 0; a <= toDeg + 1e-9; a += stepDeg) out.push({ x: r * Math.cos((a * Math.PI) / 180), y: r * Math.sin((a * Math.PI) / 180) });
  return out;
}

describe('the discrete radius (C-0236 (7))', () => {
  it('on a circle sampled every 10° the radius is r · cos 5°: below r, above r · 0.99', () => {
    const pts = arc(10000, 10, 90);
    for (let i = 1; i + 1 < pts.length; i += 1) {
      expect(belowRadiusAt(pts[i - 1], pts[i], pts[i + 1], 10000)).toBe(true);
      expect(belowRadiusAt(pts[i - 1], pts[i], pts[i + 1], 9900)).toBe(false);
    }
    // A straight line has no radius below any; a fold-back is below every one.
    expect(belowRadiusAt({ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 200, y: 0 }, 1e9)).toBe(false);
    expect(belowRadiusAt({ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 0, y: 0 }, 1)).toBe(true);
  });
});

describe('Chaikin between the anchors, the curvature limit, the simplify (C-0236 (5), (7))', () => {
  it('Chaikin × 2 cuts every corner between anchors, keeps the anchors and the end directions', () => {
    const pts = [P(0, 0), P(1000, 0), P(2000, 1000), P(3000, 1000), P(4000, 0)];
    const anchor = [true, false, true, false, true];
    const ch = chaikinRuns(pts, anchor, 2);
    // An open run of n points becomes 2n − 2 after a pass: each run of three, six after two, its two ends kept.
    expect(ch.points).toHaveLength(1 + 2 * 5);
    expect(ch.points[0]).toEqual({ x: 0, y: 0 });
    expect(ch.points[5]).toEqual({ x: 2000, y: 1000 });
    expect(ch.points[10]).toEqual({ x: 4000, y: 0 });
    expect(ch.fixed.filter(Boolean)).toHaveLength(3);
    // The first segment keeps its direction.
    expect(ch.points[1].y).toBe(0);
    // One pass fewer: fewer points.
    expect(chaikinRuns(pts, anchor, 1).points).toHaveLength(1 + 2 * 3);
  });

  it('the curvature limit lifts every free vertex to the radius, never moving the fixed ones', () => {
    const pts = [P(0, 0), P(1000, 0), P(2000, 0), P(3000, 0), P(4000, 3000), P(5000, 6000), P(6000, 9000), P(7000, 12000)];
    const fixed = pts.map((_, i) => i === 0 || i === pts.length - 1);
    const r = 3000;
    expect(countBelowRadius(pts, r)).toBeGreaterThan(0);
    const lim = curvatureLimit(pts, fixed, r, 400);
    expect(lim.below).toBe(0);
    expect(countBelowRadius(lim.points, r, [true, true, ...pts.slice(2, -2).map(() => false), true, true])).toBe(0);
    for (const i of [0, 1, pts.length - 2, pts.length - 1]) expect(lim.points[i]).toEqual(pts[i]);
    // A pass budget of 0 leaves what was below counted.
    expect(curvatureLimit(pts, fixed, r, 0).below).toBeGreaterThan(0);
  });

  it('the simplify keeps the ends, the held points and the points next to the ends; it never crosses an obstacle', () => {
    const pts = [P(0, 0), P(1000, 100), P(2000, -100), P(3000, 100), P(4000, -100), P(5000, 100), P(6000, 0)];
    const held = pts.map((_, i) => i === 3);
    const s = simplifyChain(pts, held, { minSegmentCm: 2500, obstacles: [] });
    for (const p of [pts[0], pts[1], pts[3], pts[5], pts[6]]) expect(s.points).toContainEqual(p);
    expect(s.points.length).toBeLessThan(pts.length);
    expect(s.points).not.toContainEqual(P(2000, -100));
    expect(s.anchor[0]).toBe(true);
    expect(s.anchor[s.anchor.length - 1]).toBe(true);
    expect(s.anchor[s.points.findIndex((p) => p.x === 3000)]).toBe(true);
    // An obstacle inside the triangle the vertex at (2 000, −100) would cut off: that vertex stays.
    const wall = [P(1900, 0), P(2100, 0), P(2100, 10), P(1900, 10)];
    const s2 = simplifyChain(pts, held, { minSegmentCm: 2500, obstacles: [wall] });
    expect(s2.points).toContainEqual(P(2000, -100));
  });

  it('smoothChain: the ends pinned, the result in whole cm', () => {
    const pts = [P(0, 0), P(2500, 0), P(5000, 0), P(7500, 2500), P(10000, 5000), P(12500, 5000), P(15000, 5000)];
    const out = smoothChain(pts, pts.map(() => false), { minSegmentCm: 2500, chaikinPasses: 2, minRadiusCm: 4000, obstacles: [] });
    expect(out.points[0]).toEqual(pts[0]);
    expect(out.points[out.points.length - 1]).toEqual(pts[pts.length - 1]);
    for (const p of out.points) {
      expect(Number.isInteger(p.x)).toBe(true);
      expect(Number.isInteger(p.y)).toBe(true);
    }
    expect(out.points.length).toBeGreaterThan(pts.length);
  });
});
