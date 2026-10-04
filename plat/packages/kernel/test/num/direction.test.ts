// M0-a-01: centidegrees, unit vectors from integer endpoints and the distance tests against attractCm / minEdge,
// + − × ÷ √ only (§3.2 (2), (3), (5); C-0134 (7), (8)).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { LATTICE, belowMinEdge, cdeg, dist, dist2, unitVec, withinAttract, withinCm } from '../../src/num/index.js';
import { MAX, TIMEOUT, latticePoint, pt } from './support.js';

describe('cdeg (§2.1, §3.2 (3))', () => {
  it('quantises degrees to the nearest centidegree, a half away from zero, unnormalised', () => {
    expect(cdeg(0)).toBe(0);
    expect(cdeg(5)).toBe(500);
    expect(cdeg(1.125)).toBe(113); // 112.5 exactly: a tie, away from zero
    expect(cdeg(-1.125)).toBe(-113);
    expect(cdeg(0.375)).toBe(38);
    expect(cdeg(12.345)).toBe(1235); // 12.345 × 100 rounds to exactly 1234.5 in doubles: a tie
    expect(cdeg(359.996)).toBe(36000);
    expect(cdeg(720)).toBe(72000);
    expect(Object.is(cdeg(-0.001), 0)).toBe(true);
    expect(LATTICE.minFaceAngleCdeg).toBe(cdeg(5));
  });

  it('property: an integer within ½ cdeg of the angle', () => {
    fc.assert(
      fc.property(fc.double({ min: -1e6, max: 1e6, noNaN: true }), (deg) => {
        const c = cdeg(deg);
        return Number.isInteger(c) && Math.abs(c - deg * 100) <= 0.5;
      }),
    );
  }, TIMEOUT);
});

describe('unitVec (§3.2 (5))', () => {
  it('is exact on the axes and refuses equal endpoints with E_DEGENERATE `ratio`', () => {
    expect(unitVec(pt(3, 4), pt(3, 900))).toEqual({ ok: true, value: { x: 0, y: 1 }, warnings: [] });
    expect(unitVec(pt(3, 4), pt(-MAX, 4))).toEqual({ ok: true, value: { x: -1, y: 0 }, warnings: [] });
    expect(unitVec(pt(0, 0), pt(3, 4))).toEqual({ ok: true, value: { x: 0.6, y: 0.8 }, warnings: [] });
    expect(unitVec(pt(7, 7), pt(7, 7))).toEqual({ ok: false, code: 'E_DEGENERATE', detail: 'ratio' });
  });

  it('property: unit length within 4 ulp and the direction of b − a, across the whole range', () => {
    fc.assert(
      fc.property(latticePoint(), latticePoint(), (a, b) => {
        const r = unitVec(a, b);
        if (a.x === b.x && a.y === b.y) return !r.ok && r.detail === 'ratio';
        if (!r.ok) return false;
        const { x, y } = r.value;
        const len = Math.hypot(x, y);
        const cross = x * (b.y - a.y) - y * (b.x - a.x);
        const dot = x * (b.x - a.x) + y * (b.y - a.y);
        return Math.abs(len - 1) <= 4 * Number.EPSILON && dot > 0 && Math.abs(cross) <= 1e-9 * Math.abs(dot);
      }),
    );
  }, TIMEOUT);
});

describe('the distance tests against attractCm and minEdge (§3.2 (2), (3))', () => {
  it('dist2 is exact for lattice points across the range', () => {
    expect(dist2(-MAX, -MAX, MAX, MAX)).toBe(2 * (2 * MAX) ** 2);
    expect(dist(0, 0, 3, 4)).toBe(5);
  });

  it('within attractCm is inclusive, below minEdge strict (C-0134 (7))', () => {
    expect(LATTICE.attractCm).toBe(26);
    expect(LATTICE.minEdgeCm).toBe(25);
    expect(withinAttract(0, 0, 26, 0)).toBe(true);
    expect(withinAttract(0, 0, 10, 24)).toBe(true); // exactly 26
    expect(withinAttract(0, 0, 26.0000001, 0)).toBe(false);
    expect(withinAttract(0, 0, 20, 0)).toBe(true); // §13.1: the vertex (20, 20)'s exact foot on (0, 0)–(1 000, 0)
    expect(withinAttract(0, 0, 20, 20)).toBe(false); // the vertex itself is 28.3 cm away
    expect(belowMinEdge(0, 0, 25, 0)).toBe(false); // a 25 cm edge is allowed
    expect(belowMinEdge(0, 0, 7, 24)).toBe(false); // exactly 25
    expect(belowMinEdge(0, 0, 24.999, 0)).toBe(true);
    expect(withinCm(0, 0, 3, 4, 5)).toBe(true);
    expect(withinCm(0, 0, 3, 4, 4.999)).toBe(false);
  });

  it('a computed point beyond attractCm stays at or beyond minEdge after one rounding (the 1 cm exceeds 0.71 cm)', () => {
    // §3.2 (3): a borderline case may fall either way without breaking a bound — a point not attracted (beyond 26 cm)
    // lands, once rounded to the lattice, at least 26 − 0.71 cm away, never below the 25 cm minEdge
    fc.assert(
      fc.property(fc.double({ min: 26, max: 27, noNaN: true }), fc.double({ min: 0, max: 2 * Math.PI, noNaN: true }), (r, t) => {
        const x = r * Math.cos(t);
        const y = r * Math.sin(t);
        if (withinAttract(0, 0, x, y)) return true;
        return !belowMinEdge(0, 0, Math.round(x), Math.round(y)) && dist(0, 0, Math.round(x), Math.round(y)) >= 26 - Math.SQRT1_2;
      }),
    );
  }, TIMEOUT);
});
