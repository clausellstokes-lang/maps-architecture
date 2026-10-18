// M0-a-10: sideRuns — §3.4 and §4.6 *Sides* (GEO-22): "a Chaikin-smoothed round-joined kerb yields runs whose chords
// match the pre-smoothing sides within 10°; a fillet arc replaced by its virtual corner"; the short runs that are no
// fillet arc (C-0159 (4)'s conditions); the band, the boundary order, the holes, the asserts and the ± 5 m tangent.
import { describe, expect, it } from 'vitest';
import { chaikin, runTangent, sideRuns, type Run } from '../../src/geom/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { pt, rotate, snapped, type XY } from './support.js';

const deg = (v: XY): number => (Math.atan2(v.y, v.x) * 180) / Math.PI;
/** The unsigned angle between two directions, in degrees, in [0, 180]. */
const between = (a: XY, b: XY): number => {
  const d = Math.abs(deg(a) - deg(b)) % 360;
  return d > 180 ? 360 - d : d;
};

/** A polygon with each corner replaced by a circular arc of radius r tangent to both sides, sampled every `stepDeg`. */
function roundJoined(poly: readonly XY[], r: number, stepDeg: number): XY[] {
  const n = poly.length;
  const out: XY[] = [];
  for (let i = 0; i < n; i += 1) {
    const p = poly[(i + n - 1) % n];
    const v = poly[i];
    const q = poly[(i + 1) % n];
    const ua = { x: (p.x - v.x) / Math.hypot(p.x - v.x, p.y - v.y), y: (p.y - v.y) / Math.hypot(p.x - v.x, p.y - v.y) };
    const ub = { x: (q.x - v.x) / Math.hypot(q.x - v.x, q.y - v.y), y: (q.y - v.y) / Math.hypot(q.x - v.x, q.y - v.y) };
    const phi = Math.acos(ua.x * ub.x + ua.y * ub.y);
    const t = r / Math.tan(phi / 2);
    const ta = { x: v.x + ua.x * t, y: v.y + ua.y * t };
    const tb = { x: v.x + ub.x * t, y: v.y + ub.y * t };
    const bis = { x: ua.x + ub.x, y: ua.y + ub.y };
    const bl = Math.hypot(bis.x, bis.y);
    const c = { x: v.x + (bis.x / bl) * (r / Math.sin(phi / 2)), y: v.y + (bis.y / bl) * (r / Math.sin(phi / 2)) };
    const a0 = Math.atan2(ta.y - c.y, ta.x - c.x);
    let a1 = Math.atan2(tb.y - c.y, tb.x - c.x);
    // the short way round, the corner's deflection
    while (a1 - a0 > Math.PI) a1 -= 2 * Math.PI;
    while (a1 - a0 < -Math.PI) a1 += 2 * Math.PI;
    const steps = Math.max(2, Math.ceil(Math.abs(a1 - a0) / ((stepDeg * Math.PI) / 180)));
    for (let k = 0; k <= steps; k += 1) {
      const a = a0 + ((a1 - a0) * k) / steps;
      out.push({ x: c.x + r * Math.cos(a), y: c.y + r * Math.sin(a) });
    }
  }
  return out;
}

const toLattice = (ring: readonly XY[]): LatticePoint[] => {
  const out: LatticePoint[] = [];
  for (const p of ring) {
    const s = snapped(p.x, p.y);
    const q = out[out.length - 1];
    if (q === undefined || q.x !== s.x || q.y !== s.y) out.push(s);
  }
  return out;
};

const sideDir = (poly: readonly XY[], i: number): XY => ({ x: poly[(i + 1) % poly.length].x - poly[i].x, y: poly[(i + 1) % poly.length].y - poly[i].y });

describe('sideRuns (§3.4, §4.6 Sides)', () => {
  const PENTAGON: XY[] = [{ x: 0, y: 0 }, { x: 6000, y: 0 }, { x: 8000, y: 4000 }, { x: 3000, y: 7000 }, { x: -1000, y: 3500 }];

  it('a Chaikin-smoothed round-joined kerb: one long run per pre-smoothing side, its chord within 10° of the side', () => {
    const kerb = toLattice(chaikin(roundJoined(PENTAGON, 400, 15), { closed: true, iterations: 2 }));
    for (const arcMaxCm of [0, 1500]) {
      const runs = sideRuns([kerb], 1000, { arcMaxCm });
      const long = runs.filter((r) => r.lengthCm >= 1500);
      expect(long).toHaveLength(5);
      // each long run matches exactly one side, within 10°, and its chord lies along that side (within the join's reach)
      for (let i = 0; i < 5; i += 1) {
        const d = sideDir(PENTAGON, i);
        const matches = long.filter((r) => between(r.dir, d) <= 10);
        expect(matches).toHaveLength(1);
      }
      for (const r of runs) expect(r.spreadCdeg).toBeLessThanOrEqual(1000);
      if (arcMaxCm > 0) {
        // the arcs are replaced by their virtual corners: only the five sides remain, meeting near the polygon's corners
        expect(runs).toHaveLength(5);
        for (let i = 0; i < 5; i += 1) {
          const r = runs[i];
          const next = runs[(i + 1) % 5];
          expect(r.virtualEnd && next.virtualStart).toBe(true);
          expect(r.b).toEqual(next.a);
          const nearest = Math.min(...PENTAGON.map((p) => Math.hypot(p.x - r.b.x, p.y - r.b.y)));
          expect(nearest).toBeLessThan(100);
        }
      } else {
        expect(runs.length).toBeGreaterThan(5); // the arc pieces stay runs of their own
      }
    }
  });

  it('a fillet arc is replaced by its virtual corner', () => {
    // a 60 × 40 m rectangle whose corner (6000, 4000) is filleted with radius 8 m, sampled every 10°
    const arc: XY[] = [];
    for (let k = 0; k <= 9; k += 1) arc.push({ x: 5200 + 800 * Math.cos((k * Math.PI) / 18), y: 3200 + 800 * Math.sin((k * Math.PI) / 18) });
    const ring = toLattice([{ x: 0, y: 0 }, { x: 6000, y: 0 }, ...arc, { x: 0, y: 4000 }]);
    const plain = sideRuns([ring], 1000);
    expect(plain.length).toBeGreaterThan(4);
    const runs = sideRuns([ring], 1000, { arcMaxCm: 1000 });
    expect(runs).toHaveLength(4);
    const right = runs.find((r) => r.virtualEnd) as Run;
    const top = runs.find((r) => r.virtualStart) as Run;
    expect(right.b).toEqual(top.a);
    expect(Math.hypot(right.b.x - 6000, right.b.y - 4000)).toBeLessThan(30);
    expect(between(right.dir, { x: 0, y: 1 })).toBeLessThan(1);
    expect(between(top.dir, { x: -1, y: 0 })).toBeLessThan(1);
    // the arc's pieces left the runs: fewer edges are kept than the ring has
    const kept = runs.reduce((s, r) => s + r.points.length - 1, 0);
    expect(kept).toBeLessThan(ring.length - 4);
  });

  // C-0159 (4)'s conditions on the short runs a virtual corner replaces: they "bend one way through more than the
  // tolerance". Short runs that do not are no fillet arc and stay, whatever the arc scale: the runs with `arcMaxCm` equal
  // the runs without it — no virtual corner, no run dropped (C-0163 names the mutants each fixture holds).
  const keptWithArcScale = (ring: LatticePoint[], runs: number): Run[] => {
    const plain = sideRuns([ring], 1000);
    expect(plain).toHaveLength(runs);
    expect(plain.some((r) => r.lengthCm < 1000)).toBe(true); // the fixture has short runs between long ones
    const withArc = sideRuns([ring], 1000, { arcMaxCm: 1000 });
    expect(withArc).toEqual(plain);
    expect(withArc.some((r) => r.virtualStart || r.virtualEnd)).toBe(false);
    return plain;
  };

  it('keeps a jog of short runs turning both ways between two long collinear runs', () => {
    // the bottom side of a 60 × 40 m rectangle with a 3 × 3 m notch: east, north, east, south, east
    const ring = [pt(0, 0), pt(3000, 0), pt(3000, 300), pt(3300, 300), pt(3300, 0), pt(6000, 0), pt(6000, 4000), pt(0, 4000)];
    const runs = keptWithArcScale(ring, 8);
    expect(runs.filter((r) => r.lengthCm < 1000)).toHaveLength(3);
  });

  it('keeps a jog of short runs turning both ways between two long runs at a corner (the one-way condition)', () => {
    // a step at the corner: east 50 m, north 3 m, east 3 m, north 37 m — the long runs turn 90°, the short ones both ways
    const ring = [pt(0, 0), pt(5000, 0), pt(5000, 300), pt(5300, 300), pt(5300, 4000), pt(0, 4000)];
    const runs = keptWithArcScale(ring, 6);
    const p = runs.find((r) => r.a.x === 0 && r.a.y === 0) as Run;
    const n = runs.find((r) => r.a.x === 5300 && r.a.y === 300) as Run;
    expect(between(p.dir, n.dir)).toBeGreaterThan(10); // through more than the tolerance: only the both-ways turn keeps them
  });

  it('keeps a short run in a gentle bend whose long runs\' chords differ by less than the tolerance (the tolerance condition)', () => {
    // the bottom side bends one way, −1.9° → 0° → +1.9° by chord, but the band splits it: a long run of edges at −1.0° and
    // −10.6°, a short run at 0°, a long run at +10.6° and +1.0° (each new run's first edge outside the band before it)
    const ring = [pt(0, 0), pt(3000, -52), pt(3295, -107), pt(3595, -107), pt(3890, -52), pt(6890, 0), pt(6890, 4000), pt(0, 4000)];
    const runs = keptWithArcScale(ring, 6);
    const p = runs.find((r) => r.a.x === 0 && r.a.y === 0) as Run;
    const s = runs.find((r) => r.a.x === 3295 && r.a.y === -107) as Run;
    const n = runs.find((r) => r.a.x === 3595 && r.a.y === -107) as Run;
    expect(s.lengthCm).toBeLessThan(1000);
    expect(p.lengthCm >= 1000 && n.lengthCm >= 1000).toBe(true);
    expect(between(p.dir, n.dir)).toBeLessThan(10);
    // one way: the chords turn left from p to s and from s to n
    const turn = (a: XY, b: XY): number => a.x * b.y - a.y * b.x;
    expect(turn(p.dir, s.dir) > 0 && turn(s.dir, n.dir) > 0).toBe(true);
  });

  it('reads the outer ring counter-clockwise and a hole clockwise (the face on the left), whatever order they are passed in', () => {
    const outer = [pt(0, 0), pt(0, 10_000), pt(10_000, 10_000), pt(10_000, 0)]; // clockwise as passed
    const hole = [pt(4000, 4000), pt(6000, 4000), pt(6000, 6000), pt(4000, 6000)]; // counter-clockwise as passed
    const runs = sideRuns([outer, hole], 1000);
    expect(runs.filter((r) => r.ring === 0)).toHaveLength(4);
    expect(runs.filter((r) => r.ring === 1)).toHaveLength(4);
    for (const r of runs) {
      // the face lies left of every run: the run's left normal points into the face
      const mid = { x: (r.a.x + r.b.x) / 2 - r.dir.y * 10, y: (r.a.y + r.b.y) / 2 + r.dir.x * 10 };
      const inOuter = mid.x > 0 && mid.x < 10_000 && mid.y > 0 && mid.y < 10_000;
      const inHole = mid.x > 4000 && mid.x < 6000 && mid.y > 4000 && mid.y < 6000;
      expect(inOuter && !inHole).toBe(true);
    }
  });

  it('does not depend on the vertex a ring starts at', () => {
    const kerb = toLattice(chaikin(roundJoined(PENTAGON, 400, 15), { closed: true, iterations: 1 }));
    const base = sideRuns([kerb], 1000, { arcMaxCm: 1500 });
    for (let k = 0; k < kerb.length; k += 7) expect(sideRuns([rotate(kerb, k)], 1000, { arcMaxCm: 1500 })).toEqual(base);
  });

  it('gives no run for a ring of fewer than 3 distinct points, and asserts its tolerance and arc scale', () => {
    expect(sideRuns([[pt(0, 0), pt(10, 0), pt(10, 0), pt(0, 0)]], 1000)).toEqual([]);
    expect(sideRuns([], 1000)).toEqual([]);
    for (const tol of [-1, 9001, Number.NaN]) expect(() => sideRuns([[pt(0, 0), pt(10, 0), pt(0, 10)]], tol)).toThrow(RangeError);
    expect(() => sideRuns([[pt(0, 0), pt(10, 0), pt(0, 10)]], 1000, { arcMaxCm: -1 })).toThrow(RangeError);
  });

  it('cuts a curved boundary into runs no wider than the tolerance, and runTangent reads the tangent over ± 5 m', () => {
    // a half-disc of radius 100 m, its arc sampled every 2°
    const arc: XY[] = [];
    for (let k = 0; k <= 90; k += 1) arc.push({ x: 10_000 * Math.cos((k * Math.PI) / 90), y: 10_000 * Math.sin((k * Math.PI) / 90) });
    const ring = toLattice(arc);
    const runs = sideRuns([ring], 1000);
    const curved = runs.filter((r) => r.points.length > 2);
    expect(curved.length).toBeGreaterThanOrEqual(15); // 180° in runs of at most six 2° edges (a 10° band)
    for (const r of runs) expect(r.spreadCdeg).toBeLessThanOrEqual(1000);
    for (const r of curved) {
      const mid = r.points[Math.floor(r.points.length / 2)];
      const t = runTangent(r, mid);
      // on a circle the tangent is perpendicular to the radius
      const radial = { x: mid.x, y: mid.y };
      expect(Math.abs(between(t, radial) - 90)).toBeLessThan(1.5);
    }
  });
});
