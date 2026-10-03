// M0-a-01: ring orientation is orient2d at the ring's lowest-leftmost vertex (§3.2 (6)); the three-point form is
// §3.4's read service (C-0134 (2)).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { orient, orient2d } from '../../src/num/index.js';
import { MAX, latticePoint, pt, shoelaceBig, signOf } from './support.js';

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

  it('agrees with the sign of the exact area on random simple rings, both ways round', () => {
    fc.assert(
      fc.property(simpleRing, (ring) => {
        const s = signOf(shoelaceBig(ring));
        return orient(ring) === s && orient(ring.slice().reverse()) === -s;
      }),
    );
  });

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

  it('three points: the sign of orient2d, at the range\'s extremes too', () => {
    fc.assert(
      fc.property(latticePoint(), latticePoint(), latticePoint(), (a, b, c) => {
        return orient(a, b, c) === Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y)) + 0;
      }),
    );
    expect(orient(pt(-MAX, -MAX), pt(MAX, -MAX), pt(MAX, MAX))).toBe(1);
  });
});
