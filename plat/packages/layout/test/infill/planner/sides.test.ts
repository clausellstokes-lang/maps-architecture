// The planner's sides (§4.6 *Sides*, GEO-22; §3.4 `sideRuns(face, 1000)`): the face's runs within the 10° turning
// tolerance, a crossing street's fillet arc replaced by its virtual corner at the kerb's corner scale (sideRuns'
// `arcMaxCm`, which the planner passes — M0-a-10's check note N-1; C-0159 (4)), "perpendicular to a side" read against
// the run's chord or, on a curved run, its tangent over ± 5 m — never one short segment of a round-joined kerb; the
// canonical rings, the line and ray tests.
import { describe, expect, it } from 'vitest';
import { planCut } from '../../../src/infill/planner.js';
import { canonicalRings, faceSides, insideFace, lineCrossings, rayHit, runAt, sideDir } from '../../../src/infill/sides.js';
import { asCut, CTX, dot, FACES, ring, streamsFor } from './support.js';

describe('the runs the planner reads', () => {
  it('passes the kerb\'s corner scale: a round-joined kerb reads as four runs meeting at virtual corners', () => {
    const p = asCut(planCut(FACES.roundJoined, CTX, streamsFor(1)));
    expect(p.sides.runs).toHaveLength(4);
    for (const r of p.sides.runs) {
      expect(r.virtualStart).toBe(true);
      expect(r.virtualEnd).toBe(true);
    }
    // The virtual corners are the rectangle's, within the arc's first pieces' lean: the chords' lines meet near (0, 0) …
    const corners = p.sides.runs.map((r) => r.a);
    for (const [x, y] of [[0, 0], [0, 7000], [12000, 0], [12000, 7000]]) {
      expect(Math.min(...corners.map((c) => Math.hypot(c.x - x, c.y - y)))).toBeLessThan(10);
    }
    // Without a corner scale the arc pieces stay runs of their own.
    const raw = asCut(planCut(FACES.roundJoined, { ...CTX, cornerScaleCm: 0 }, streamsFor(1)));
    expect(raw.sides.runs.length).toBeGreaterThan(4);
    // The default scale is the face's widest spine half-width; an explicit one overrides it.
    const wide = asCut(planCut(FACES.roundJoined, { ...CTX, cornerScaleCm: 300 }, streamsFor(1)));
    expect(wide.sides.runs).toHaveLength(4);
  });

  it('on a round-joined kerb the start and the far end lie on long runs, square to their chords', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const p = asCut(planCut(FACES.roundJoined, CTX, streamsFor(seed)));
      const run = p.sides.runs[p.start.run];
      expect(run.lengthCm).toBeGreaterThan(6000);
      // Square to the side read over ± 5 m (the long run holds its arcs' first pieces: a curved run's tangent),
      // which is the straight side itself away from the corners.
      expect(Math.abs(dot(p.start.normal, sideDir(p.sides, run, p.start.A)))).toBeLessThan(1e-12);
      expect(Math.abs(dot(p.start.normal, { x: Math.round(run.dir.x), y: Math.round(run.dir.y) }))).toBeLessThan(1e-9);
      if (p.far !== null) expect(p.sides.runs[p.far.run].lengthCm).toBeGreaterThan(6000);
    }
  });

  it('reads sides at the 10° tolerance: two edges 9.5° apart are one run, 10.5° apart two', () => {
    const t = (deg: number) => Math.round(6000 * Math.tan((deg * Math.PI) / 180));
    const one = faceSides([ring([[0, 0], [6000, 0], [12000, t(9.5)], [12000, 7000], [0, 7000]])], 1000, 0, 500);
    const two = faceSides([ring([[0, 0], [6000, 0], [12000, t(10.5)], [12000, 7000], [0, 7000]])], 1000, 0, 500);
    expect(one.runs).toHaveLength(4);
    expect(two.runs).toHaveLength(5);
  });

  it('a curved run is read by its tangent over ± 5 m (cut.sides.tangentWindowM)', () => {
    const p = asCut(planCut(FACES.curved, CTX, streamsFor(2)));
    expect(p.sides.windowCm).toBe(500);
    const arcRun = p.sides.runs.find((r) => r.spreadCdeg > 0);
    expect(arcRun).toBeDefined();
  });
});

describe('the canonical rings', () => {
  it('orients the outer ring counter-clockwise and the holes clockwise, each from its lowest-leftmost vertex', () => {
    const rings = canonicalRings([
      ring([[0, 7000], [12000, 7000], [12000, 0], [0, 0]]),
      ring([[9000, 6000], [9000, 8000], [10000, 8000], [10000, 6000]]),
      ring([[2000, 2000], [3000, 2000], [3000, 3000], [2000, 3000]]),
    ]);
    expect(rings[0]).toEqual(ring([[0, 0], [12000, 0], [12000, 7000], [0, 7000]]));
    expect(rings[1][0]).toEqual({ x: 2000, y: 2000 });
    expect(rings[1]).toEqual(ring([[2000, 2000], [2000, 3000], [3000, 3000], [3000, 2000]]));
    expect(rings[2][0]).toEqual({ x: 9000, y: 6000 });
  });

  it('drops repeats, a ring under three points or with no area; a dropped outer ring leaves no face', () => {
    expect(canonicalRings([ring([[0, 0], [0, 0], [10, 0], [10, 10], [0, 0]])])).toEqual([ring([[0, 0], [10, 0], [10, 10]])]);
    expect(canonicalRings([ring([[0, 0], [10, 0], [20, 0]])])).toEqual([]);
    expect(canonicalRings([])).toEqual([]);
    expect(canonicalRings([ring([[0, 0], [100, 0], [100, 100]]), ring([[1, 1], [2, 2]])])).toHaveLength(1);
  });
});

describe('the line and ray tests', () => {
  const face = canonicalRings([ring([[0, 0], [12000, 0], [12000, 7000], [0, 7000]]), ring([[5000, 3000], [5000, 4000], [6000, 4000], [6000, 3000]])]);

  it('a line through the face crosses each ring an even number of times, through a vertex once', () => {
    const xs = lineCrossings(face, { x: 5500, y: -100 }, { x: 0, y: 1 });
    expect(xs.map((c) => c.t)).toEqual([100, 3100, 4100, 7100]);
    // Through the vertex (5 000, 3 000) and (5 000, 4 000) of the hole and along its edge: counted by the half-open rule.
    const v = lineCrossings(face, { x: 5000, y: -100 }, { x: 0, y: 1 });
    expect(v.length % 2).toBe(0);
    const w = lineCrossings(face, { x: 0, y: 0 }, { x: Math.SQRT1_2, y: Math.SQRT1_2 });
    expect(w.length % 2).toBe(0);
  });

  it('a ray finds the first boundary beyond its origin; inside reads the holes', () => {
    const h = rayHit(face, { x: 5500, y: 0 }, { x: 0, y: 1 }, 0.5);
    expect(h?.t).toBe(3000);
    expect(h?.ring).toBe(1);
    expect(rayHit(face, { x: 5500, y: 0 }, { x: 0, y: 1 }, 0.5, 2999)).toBeNull();
    expect(insideFace(face, { x: 100, y: 100 })).toBe(true);
    expect(insideFace(face, { x: 5500, y: 3500 })).toBe(false);
    expect(insideFace(face, { x: -1, y: 100 })).toBe(false);
  });

  it('runAt takes the nearest run of the ring, ties the earlier', () => {
    const sides = faceSides(face, 1000, 0, 500);
    expect(sides.runs[runAt(sides, 0, { x: 6000, y: 0 })].dir).toEqual({ x: 1, y: 0 });
    // The corner (12 000, 0) lies on runs 0 and 1: the earlier.
    expect(runAt(sides, 0, { x: 12000, y: 0 })).toBe(0);
    expect(sides.runs[runAt(sides, 1, { x: 5500, y: 4000 })].ring).toBe(1);
    expect(runAt(sides, 5, { x: 0, y: 0 })).toBe(-1);
  });
});
