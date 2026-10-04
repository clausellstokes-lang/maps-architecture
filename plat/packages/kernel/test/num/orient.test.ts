// M0-a-01: ring orientation is orient2d at the ring's lowest-leftmost vertex (§3.2 (6)); the three-point form is
// §3.4's read service (C-0134 (2)).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { orient, orient2d } from '../../src/num/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { MAX, TIMEOUT, latticePoint, pt, rotations, shoelaceBig, signOf } from './support.js';

/** orient over every rotation of a ring, then over every rotation of its reverse. */
const byRotation = (ring: readonly LatticePoint[]): { ring: number[]; reversed: number[] } => ({
  ring: rotations(ring).map((r) => orient(r)),
  reversed: rotations(ring.slice().reverse()).map((r) => orient(r)),
});

/** n copies of a value. */
const times = (n: number, v: number): number[] => Array.from({ length: n }, () => v);

/** Lobe offsets from a ring's lowest-leftmost point: above it, or on its row to its right, never on it. */
const LOBE = 4_194_304; // 2²²
const lobeOffset = fc
  .tuple(fc.integer({ min: -LOBE, max: LOBE }), fc.integer({ min: 0, max: LOBE }))
  .filter(([dx, dy]) => dy > 0 || dx > 0);

/**
 * A pinched ring (§13.1 (1)'s self-touching class): two or three lobes of 1 – 8 vertices each, every lobe leaving and
 * returning to the ring's lowest-leftmost point v, so v recurs apart from its runs; a lobe of one vertex is an antenna
 * based at v; v sometimes doubled in place (a run of consecutive duplicates).
 */
const pinchRing = fc
  .tuple(
    fc.integer({ min: -MAX + LOBE, max: MAX - LOBE }),
    fc.integer({ min: -MAX, max: MAX - LOBE }),
    fc.array(fc.array(lobeOffset, { minLength: 1, maxLength: 8 }), { minLength: 2, maxLength: 3 }),
    fc.array(fc.boolean(), { minLength: 3, maxLength: 3 }),
  )
  .map(([vx, vy, lobes, doubled]) => {
    const v = pt(vx, vy);
    const ring: LatticePoint[] = [];
    lobes.forEach((lobe, i) => {
      ring.push(v);
      if (doubled[i]) ring.push(v);
      for (const [dx, dy] of lobe) ring.push(pt(vx + dx, vy + dy));
    });
    return ring;
  });

/**
 * A simple star-shaped ring: whole-degree angles strictly increasing about a centre, every gap below 180° (so the centre
 * lies inside and the ring is simple), radii ≥ 10 m (so rounding to the lattice cannot reorder two vertices) —
 * counter-clockwise.
 */
const simpleRing = fc
  .tuple(
    fc.integer({ min: -1_000_000, max: 1_000_000 }),
    fc.integer({ min: -1_000_000, max: 1_000_000 }),
    fc.uniqueArray(fc.integer({ min: 0, max: 359 }), { minLength: 3, maxLength: 60 }),
    fc.array(fc.integer({ min: 1000, max: 5_000_000 }), { minLength: 60, maxLength: 60 }),
  )
  .map(([cx, cy, angles, radii]) => ({ cx, cy, angles: angles.slice().sort((a, b) => a - b), radii }))
  .filter(({ angles }) => angles.every((a, i) => (i === 0 ? a + 360 - angles[angles.length - 1] : a - angles[i - 1]) < 180))
  .map(({ cx, cy, angles, radii }) =>
    angles.map((a, i) => {
      const t = (a / 360) * 2 * Math.PI;
      return pt(Math.round(cx + radii[i] * Math.cos(t)), Math.round(cy + radii[i] * Math.sin(t)));
    }),
  );

describe('orient (§3.2 (6), §3.4)', () => {
  it('a ring: counter-clockwise 1, clockwise −1, at the lowest-leftmost vertex', () => {
    const ccw = [pt(0, 0), pt(10, 0), pt(10, 10), pt(0, 10)];
    expect(orient(ccw)).toBe(1);
    expect(orient(ccw.slice().reverse())).toBe(-1);
    // a ring whose lowest-leftmost vertex is not its first
    expect(orient([pt(10, 10), pt(0, 10), pt(-5, -5), pt(10, 0)])).toBe(1);
    // a closing duplicate and repeated vertices are skipped
    expect(orient([pt(0, 0), pt(0, 0), pt(10, 0), pt(10, 10), pt(0, 10), pt(0, 0)])).toBe(1);
    expect(orient([pt(0, 0), pt(0, 10), pt(10, 10), pt(10, 0), pt(10, 0), pt(0, 0)])).toBe(-1);
  });

  it('a self-crossing ring: orient2d at the lowest-leftmost vertex, not at the highest and not the area\'s sign', () => {
    // A figure-eight: its lower-left lobe (0,0) (0,10) (10,10) (10,0) is clockwise, its upper-right lobe
    // counter-clockwise, its area 0; the lowest-leftmost vertex (0, 0) lies on the clockwise lobe (§3.2 (6)).
    const fig8 = [pt(0, 0), pt(0, 10), pt(20, 10), pt(20, 20), pt(10, 20), pt(10, 0)];
    expect(shoelaceBig(fig8)).toBe(0n);
    expect(orient(fig8)).toBe(-1);
    expect(orient(fig8.slice().reverse())).toBe(1);
    // the nearest neighbours that are not the same lattice point (C-0134 (2)): a closing duplicate is the vertex's
    // predecessor, a repeated first vertex its successor
    expect(orient([...fig8, pt(0, 0)])).toBe(-1);
    expect(orient([pt(0, 0), ...fig8])).toBe(-1);
    // the upper lobe the larger: the area is positive, the orientation at the lowest-leftmost vertex still clockwise
    const big8 = [pt(0, 0), pt(0, 10), pt(30, 10), pt(30, 40), pt(10, 40), pt(10, 0)];
    expect(shoelaceBig(big8)).toBe(1000n);
    expect(orient(big8)).toBe(-1);
    expect(orient(big8.slice().reverse())).toBe(1);
    // lowest, then leftmost: the mirrored figure-eight's lowest-leftmost vertex (10, 0) lies on its counter-clockwise
    // lobe, its leftmost-lowest (0, 10) on the clockwise one
    const mirror8 = [pt(20, 0), pt(20, 10), pt(0, 10), pt(0, 20), pt(10, 20), pt(10, 0)];
    expect(orient(mirror8)).toBe(1);
    expect(orient(mirror8.slice().reverse())).toBe(-1);
    // the least x among the lowest: the bow-tie's two lowest vertices lie on opposite lobes, (0, 0) on the
    // counter-clockwise one
    const bowtie = [pt(0, 0), pt(20, 20), pt(20, 0), pt(0, 20)];
    expect(shoelaceBig(bowtie)).toBe(0n);
    expect(orient(bowtie)).toBe(1);
    expect(orient(bowtie.slice().reverse())).toBe(-1);
  });

  it('agrees with the sign of the exact area on random simple rings, both ways round', () => {
    fc.assert(
      fc.property(simpleRing, (ring) => {
        const s = signOf(shoelaceBig(ring));
        return orient(ring) === s && orient(ring.slice().reverse()) === -s;
      }),
    );
  }, TIMEOUT);

  it('a degenerate ring: 0 when every vertex is one point or the ring has no area; the exact area where a spike tip is extreme', () => {
    expect(orient([])).toBe(0);
    expect(orient([pt(1, 1), pt(2, 2)])).toBe(0);
    expect(orient([pt(1, 1), pt(1, 1), pt(1, 1)])).toBe(0);
    expect(orient([pt(0, 0), pt(5, 5), pt(10, 10)])).toBe(0);
    // an antenna whose tip is the lowest-leftmost vertex: its neighbours coincide, so the exact area decides
    const spike = [pt(0, -50), pt(0, 0), pt(10, 0), pt(10, 10), pt(0, 10), pt(0, 0)];
    expect(orient(spike)).toBe(1);
    expect(orient(spike.slice().reverse())).toBe(-1);
  });

  it('a pinch — the lowest-leftmost point recurring apart from its run — takes the exact area\'s sign at every rotation (C-0140)', () => {
    // two counter-clockwise lobes touching at (0, 0): (0,0) (10,5) (10,10) [2A 50] and (0,0) (−5,10) (−5,5) [2A 25]
    const ccwCcw = [pt(0, 0), pt(10, 5), pt(10, 10), pt(0, 0), pt(-5, 10), pt(-5, 5)];
    expect(shoelaceBig(ccwCcw)).toBe(75n);
    expect(byRotation(ccwCcw)).toEqual({ ring: times(6, 1), reversed: times(6, -1) });
    // the pinch point doubled in place is still one corner of each lobe
    const doubled = [pt(0, 0), pt(10, 5), pt(10, 10), pt(0, 0), pt(0, 0), pt(-5, 10), pt(-5, 5)];
    expect(byRotation(doubled)).toEqual({ ring: times(7, 1), reversed: times(7, -1) });
    // a counter-clockwise lobe [2A 50] and a clockwise one [2A −25]: the larger lobe's sense
    const ccwCw = [pt(0, 0), pt(10, 5), pt(10, 10), pt(0, 0), pt(-5, 5), pt(-5, 10)];
    expect(shoelaceBig(ccwCw)).toBe(25n);
    expect(byRotation(ccwCw)).toEqual({ ring: times(6, 1), reversed: times(6, -1) });
    // the clockwise lobe the larger [2A −400]
    const cwLarger = [pt(0, 0), pt(10, 5), pt(10, 10), pt(0, 0), pt(-20, 20), pt(-20, 40)];
    expect(shoelaceBig(cwLarger)).toBe(-350n);
    expect(byRotation(cwLarger)).toEqual({ ring: times(6, -1), reversed: times(6, 1) });
    // mirror lobes, one each way, cancel: no orientation
    const balanced = [pt(0, 0), pt(10, 5), pt(10, 10), pt(0, 0), pt(-10, 5), pt(-10, 10)];
    expect(shoelaceBig(balanced)).toBe(0n);
    expect(byRotation(balanced)).toEqual({ ring: times(6, 0), reversed: times(6, 0) });
    // a declared antenna based at the lowest-leftmost corner of a counter-clockwise square adds no area (§3.2 (6))
    const antenna = [pt(0, 0), pt(30, 20), pt(0, 0), pt(100, 0), pt(100, 100), pt(0, 100)];
    expect(byRotation(antenna)).toEqual({ ring: times(6, 1), reversed: times(6, -1) });
  });

  it('a pinched ring of two or three random lobes: the exact area\'s sign at every rotation, negated reversed (C-0140)', () => {
    fc.assert(
      fc.property(pinchRing, (ring) => {
        const s = signOf(shoelaceBig(ring));
        const { ring: o, reversed: r } = byRotation(ring);
        return o.every((x) => x === s) && r.every((x) => x === -s);
      }),
    );
  }, TIMEOUT);

  it('three points: the sign of orient2d, at the range\'s extremes too', () => {
    fc.assert(
      fc.property(latticePoint(), latticePoint(), latticePoint(), (a, b, c) => {
        return orient(a, b, c) === Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y)) + 0;
      }),
    );
    expect(orient(pt(-MAX, -MAX), pt(MAX, -MAX), pt(MAX, MAX))).toBe(1);
  }, TIMEOUT);
});
