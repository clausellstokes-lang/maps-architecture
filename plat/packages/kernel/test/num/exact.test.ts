// M0-a-01: the shared exact predicates and constants of `src/num/exact.ts` (§3.2 (1), (2), (3), (8); C-0306), judged
// against BigInt references written here from the definitions — the squared distance to a closed segment, the shared
// point of two closed segments, the ray crossing at its exact rational intercept — never with the code under test.
// Their equality with the copies they replace is equivalence.test.ts's.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import * as barrel from '../../src/index.js';
import * as numIndex from '../../src/num/index.js';
import * as exact from '../../src/num/exact.js';
import {
  BOX_RANGE,
  PI,
  POW2_20,
  crossingStep,
  divScaled,
  insideDoubledRing,
  insideLatticeRing,
  insideOrOnRing,
  onLatticeSegment,
  segmentCloserThan,
  segmentsMeet,
  strictlyInsideRings,
  windingNumber,
} from '../../src/num/exact.js';
import type { LatticePoint } from '../../src/types/index.js';
import { MAX, TIMEOUT, coord, pt } from './support.js';

const B = BigInt;

/** Is p closer than r to the closed segment a–b — the squared distance to its nearest point, in BigInt. */
export function closerBig(px: number, py: number, ax: number, ay: number, bx: number, by: number, r: number): boolean {
  const dx = B(bx) - B(ax);
  const dy = B(by) - B(ay);
  const l2 = dx * dx + dy * dy;
  const t = (B(px) - B(ax)) * dx + (B(py) - B(ay)) * dy; // the projection's parameter times l2
  const r2 = B(r) * B(r);
  const d2 = (x: number, y: number): bigint => (B(px) - B(x)) * (B(px) - B(x)) + (B(py) - B(y)) * (B(py) - B(y));
  if (l2 === 0n || t <= 0n) return d2(ax, ay) < r2;
  if (t >= l2) return d2(bx, by) < r2;
  // the foot a + (t / l2)(b − a); its squared distance times l2² is |l2·(p − a) − t·(b − a)|²
  const ex = l2 * (B(px) - B(ax)) - t * dx;
  const ey = l2 * (B(py) - B(ay)) - t * dy;
  return ex * ex + ey * ey < r2 * l2 * l2;
}

/** Do the closed lattice segments a–b and c–d share a point — in BigInt, the collinear case by overlap on an axis. */
export function meetBig(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number): boolean {
  const o = (px: number, py: number, qx: number, qy: number, rx: number, ry: number): number => {
    const v = (B(qx) - B(px)) * (B(ry) - B(py)) - (B(qy) - B(py)) * (B(rx) - B(px));
    return v > 0n ? 1 : v < 0n ? -1 : 0;
  };
  const o1 = o(ax, ay, bx, by, cx, cy);
  const o2 = o(ax, ay, bx, by, dx, dy);
  const o3 = o(cx, cy, dx, dy, ax, ay);
  const o4 = o(cx, cy, dx, dy, bx, by);
  if (o1 !== 0 || o2 !== 0 || o3 !== 0 || o4 !== 0) {
    if (o1 * o2 < 0 && o3 * o4 < 0) return true;
    const on = (px: number, py: number, qx: number, qy: number, rx: number, ry: number): boolean =>
      o(px, py, qx, qy, rx, ry) === 0 && Math.min(px, qx) <= rx && rx <= Math.max(px, qx) && Math.min(py, qy) <= ry && ry <= Math.max(py, qy);
    return on(ax, ay, bx, by, cx, cy) || on(ax, ay, bx, by, dx, dy) || on(cx, cy, dx, dy, ax, ay) || on(cx, cy, dx, dy, bx, by);
  }
  // all four collinear (a point segment included): the closed intervals overlap on both axes
  return Math.max(Math.min(ax, bx), Math.min(cx, dx)) <= Math.min(Math.max(ax, bx), Math.max(cx, dx))
    && Math.max(Math.min(ay, by), Math.min(cy, dy)) <= Math.min(Math.max(ay, by), Math.max(cy, dy));
}

/** The ray from q toward +x crosses a → b (half-open in y): +1 upward, −1 downward, q left of the exact intercept. */
export function crossingBig(ax: number, ay: number, bx: number, by: number, qx: number, qy: number): number {
  const up = ay <= qy && qy < by;
  const down = by <= qy && qy < ay;
  if (!up && !down) return 0;
  // qx < ax + (qy − ay)(bx − ax) / (by − ay), multiplied through by (by − ay), whose sign flips the comparison
  const lhs = (B(qx) - B(ax)) * (B(by) - B(ay));
  const rhs = (B(qy) - B(ay)) * (B(bx) - B(ax));
  if (up) return lhs < rhs ? 1 : 0;
  return lhs > rhs ? -1 : 0;
}

const windingBig = (ring: readonly LatticePoint[], qx: number, qy: number): number =>
  ring.reduce((w, a, i) => { const b = ring[(i + 1) % ring.length]; return w + crossingBig(a.x, a.y, b.x, b.y, qx, qy); }, 0);

const onRingBig = (ring: readonly LatticePoint[], qx: number, qy: number): boolean =>
  ring.some((a, i) => { const b = ring[(i + 1) % ring.length]; return meetBig(a.x, a.y, b.x, b.y, qx, qy, qx, qy); });

const ring = (...xy: number[]): LatticePoint[] => xy.flatMap((v, i) => (i % 2 === 0 ? [pt(v, xy[i + 1])] : []));
const SQUARE = ring(0, 0, 10, 0, 10, 10, 0, 10);

/** A small coordinate, so ties, collinear runs and repeated points are common. */
const small = (): fc.Arbitrary<number> => fc.integer({ min: -6, max: 6 });
const smallRing = (): fc.Arbitrary<LatticePoint[]> => fc.array(fc.tuple(small(), small()).map(([x, y]) => pt(x, y)), { minLength: 1, maxLength: 9 });

describe('segmentCloserThan (§3.2 (2), (3))', () => {
  it('is strict at r, measures to the nearer end past either end, and reads a one-point segment as a point', () => {
    expect(segmentCloserThan(0, 25, -100, 0, 100, 0, 25)).toBe(false); // exactly minEdge away: clear
    expect(segmentCloserThan(0, 24, -100, 0, 100, 0, 25)).toBe(true);
    expect(segmentCloserThan(117, 17, -100, 0, 100, 0, 25)).toBe(true); // past b: 17² + 17² = 578 < 625
    expect(segmentCloserThan(118, 18, -100, 0, 100, 0, 25)).toBe(false); // 648
    expect(segmentCloserThan(-100, 24, -100, 0, 100, 0, 25)).toBe(true); // the projection exactly at a (dot = 0)
    expect(segmentCloserThan(100, -25, -100, 0, 100, 0, 25)).toBe(false); // exactly at b (dot = l²), exactly r away
    expect(segmentCloserThan(15, 20, 0, 0, 0, 0, 25)).toBe(false); // a point segment: 15² + 20² = 25²
    expect(segmentCloserThan(15, 19, 0, 0, 0, 0, 25)).toBe(true);
    expect(segmentCloserThan(3, 4, 3, 4, 3, 4, 0)).toBe(false); // r = 0: nothing is closer than 0
  });

  it('equals the BigInt distance on every lattice point of a window around small segments, r 0 – 6', () => {
    for (let ax = -2; ax <= 2; ax++) for (let ay = -2; ay <= 2; ay++) for (let bx = -2; bx <= 2; bx++) for (let by = -2; by <= 2; by++) {
      for (let px = -6; px <= 6; px++) for (let py = -6; py <= 6; py++) for (const r of [0, 1, 2, 3, 5, 6]) {
        if (segmentCloserThan(px, py, ax, ay, bx, by, r) !== closerBig(px, py, ax, ay, bx, by, r)) {
          expect.fail(`(${px}, ${py}) to (${ax}, ${ay})–(${bx}, ${by}) at r ${r}`);
        }
      }
    }
  });

  it('property: equals the BigInt distance across the range where r²·|ab|² ≤ 2⁵³, near-ties drawn often', () => {
    // segments up to 2²⁰ cm long anywhere in range, and points within a few cm of the r-band around them
    const len = fc.integer({ min: -(2 ** 20), max: 2 ** 20 });
    fc.assert(
      fc.property(coord(), coord(), len, len, fc.double({ min: -0.2, max: 1.2, noNaN: true }), fc.integer({ min: -30, max: 30 }), fc.integer({ min: -3, max: 3 }), fc.constantFrom(25, 26), (ax, ay, dx, dy, t, off, jitter, r) => {
        const bx = Math.max(-MAX, Math.min(MAX, ax + dx));
        const by = Math.max(-MAX, Math.min(MAX, ay + dy));
        const l = Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)) || 1;
        // a point near the segment at parameter t, off it by `off` cm along the normal, then jittered
        const px = Math.max(-MAX, Math.min(MAX, Math.round(ax + t * (bx - ax) - (off * (by - ay)) / l) + jitter));
        const py = Math.max(-MAX, Math.min(MAX, Math.round(ay + t * (by - ay) + (off * (bx - ax)) / l) - jitter));
        return segmentCloserThan(px, py, ax, ay, bx, by, r) === closerBig(px, py, ax, ay, bx, by, r);
      }),
    );
  }, TIMEOUT);
});

describe('segmentsMeet and onLatticeSegment (§3.2 (3))', () => {
  it('counts a proper crossing, a touch at an end, a T, a collinear overlap and a shared end; not parallel or apart', () => {
    expect(segmentsMeet(0, 0, 10, 10, 0, 10, 10, 0)).toBe(true); // crossing
    expect(segmentsMeet(0, 0, 10, 0, 10, 0, 20, 5)).toBe(true); // a shared end
    expect(segmentsMeet(0, 0, 10, 0, 5, 0, 5, 7)).toBe(true); // a T
    expect(segmentsMeet(0, 0, 10, 0, 4, 0, 20, 0)).toBe(true); // collinear overlap
    expect(segmentsMeet(0, 0, 10, 0, 11, 0, 20, 0)).toBe(false); // collinear, apart by 1
    expect(segmentsMeet(0, 0, 10, 0, 0, 1, 10, 1)).toBe(false); // parallel
    expect(segmentsMeet(0, 0, 10, 0, 5, 1, 5, 9)).toBe(false); // grazing by 1
    expect(segmentsMeet(3, 0, 3, 0, 0, 0, 10, 0)).toBe(true); // a point segment on the other
    expect(segmentsMeet(3, 1, 3, 1, 0, 0, 10, 0)).toBe(false);
    expect(onLatticeSegment(0, 0, 10, 0, 10, 0)).toBe(true);
    expect(onLatticeSegment(0, 0, 10, 0, 11, 0)).toBe(false);
    expect(onLatticeSegment(0, 0, 10, 10, 5, 5)).toBe(true);
    expect(onLatticeSegment(0, 0, 10, 10, 5, 6)).toBe(false);
  });

  it('equals the BigInt reference on every pair of segments with ends in a 4 × 4 grid', () => {
    for (let a = 0; a < 16; a++) for (let b = 0; b < 16; b++) for (let c = 0; c < 16; c++) for (let d = 0; d < 16; d++) {
      const [ax, ay, bx, by, cx, cy, dx, dy] = [a & 3, a >> 2, b & 3, b >> 2, c & 3, c >> 2, d & 3, d >> 2];
      if (segmentsMeet(ax, ay, bx, by, cx, cy, dx, dy) !== meetBig(ax, ay, bx, by, cx, cy, dx, dy)) expect.fail(`(${ax}, ${ay})–(${bx}, ${by}) with (${cx}, ${cy})–(${dx}, ${dy})`);
    }
  });

  it('property: equals the BigInt reference across the range, collinear and touching pairs drawn often', () => {
    const step = fc.integer({ min: -2000, max: 2000 });
    const collinear = fc.tuple(coord(), coord(), step, step, fc.array(fc.integer({ min: -3000, max: 3000 }), { minLength: 4, maxLength: 4 })).map(([x, y, sx, sy, ts]) => {
      const c = (v: number): number => Math.max(-MAX, Math.min(MAX, v));
      return ts.flatMap((t) => [c(x + t * sx), c(y + t * sy)]);
    });
    const any = fc.array(coord(), { minLength: 8, maxLength: 8 });
    const touching = fc.tuple(any, fc.integer({ min: 0, max: 3 })).map(([v, k]) => {
      const out = v.slice();
      out[4 + 2 * (k & 1)] = v[2 * (k >> 1)];
      out[5 + 2 * (k & 1)] = v[2 * (k >> 1) + 1];
      return out;
    });
    fc.assert(
      fc.property(fc.oneof(any, collinear, touching), (v) => {
        const [ax, ay, bx, by, cx, cy, dx, dy] = v;
        return segmentsMeet(ax, ay, bx, by, cx, cy, dx, dy) === meetBig(ax, ay, bx, by, cx, cy, dx, dy);
      }),
    );
  }, TIMEOUT);
});

describe('the point-in-ring tests: one crossing rule, three readings (§3.2 (3))', () => {
  it('counts a vertex at the query\'s height by the edge that leaves it upward or arrives at it downward', () => {
    expect(crossingStep(5, 0, 5, 10, 0, 0)).toBe(1); // upward, leaving qy: counted
    expect(crossingStep(5, 10, 5, 0, 0, 0)).toBe(-1); // downward, arriving at qy: counted
    expect(crossingStep(5, 10, 5, 0, 0, 10)).toBe(0); // downward, leaving qy: not
    expect(crossingStep(5, 0, 5, 10, 0, 10)).toBe(0); // upward, arriving at qy: not
    expect(crossingStep(5, 0, 5, 10, 6, 5)).toBe(0); // q right of an upward edge
    expect(crossingStep(5, 0, 5, 10, 5, 5)).toBe(0); // q on the edge
    expect(crossingStep(0, 3, 10, 3, 1, 3)).toBe(0); // a horizontal edge never counts
    // a diamond's lowest and highest vertices at the query's height: one crossing each side, not two
    const diamond = ring(5, 0, 10, 5, 5, 10, 0, 5);
    expect(windingNumber(diamond, 5, 5)).toBe(1);
    expect(windingNumber(diamond, -1, 5)).toBe(0);
    expect(windingNumber(diamond, -1, 0)).toBe(0);
    expect(windingNumber(diamond, -1, 10)).toBe(0);
  });

  it('winds +1 counter-clockwise, −1 clockwise, 2 twice round; even–odd reads the double loop as outside, non-zero inside', () => {
    expect(windingNumber(SQUARE, 5, 5)).toBe(1);
    expect(windingNumber(SQUARE.slice().reverse(), 5, 5)).toBe(-1);
    expect(windingNumber(SQUARE, 15, 5)).toBe(0);
    const twice = [...SQUARE, ...SQUARE];
    expect(windingNumber(twice, 5, 5)).toBe(2);
    expect(insideLatticeRing(twice, 5, 5)).toBe(false);
    expect(insideOrOnRing(twice, 5, 5, 'evenOdd')).toBe(false);
    expect(insideOrOnRing(twice, 5, 5, 'nonZero')).toBe(true);
    expect(strictlyInsideRings([twice], 5, 5, 'evenOdd')).toBe(false);
    expect(strictlyInsideRings([twice], 5, 5, 'nonZero')).toBe(true);
  });

  it('reads the boundary three ways: the open reading by parity, the closed one inside, the strict one outside', () => {
    for (const [x, y] of [[0, 5], [10, 5], [5, 0], [5, 10], [0, 0], [10, 10]]) {
      expect(insideOrOnRing(SQUARE, x, y, 'evenOdd'), `closed (${x}, ${y})`).toBe(true);
      expect(insideOrOnRing(SQUARE, x, y, 'nonZero'), `closed (${x}, ${y})`).toBe(true);
      expect(strictlyInsideRings([SQUARE], x, y, 'evenOdd'), `strict (${x}, ${y})`).toBe(false);
      expect(strictlyInsideRings([SQUARE], x, y, 'nonZero'), `strict (${x}, ${y})`).toBe(false);
      expect(insideLatticeRing(SQUARE, x, y), `open (${x}, ${y})`).toBe(windingNumber(SQUARE, x, y) !== 0);
    }
    // the open reading on the ring is the half-open rule's: the left and bottom sides in, the right and top out
    expect([insideLatticeRing(SQUARE, 0, 5), insideLatticeRing(SQUARE, 10, 5), insideLatticeRing(SQUARE, 5, 0), insideLatticeRing(SQUARE, 5, 10)]).toEqual([true, false, true, false]);
    expect(insideLatticeRing(SQUARE, 5, 5) && insideOrOnRing(SQUARE, 5, 5, 'evenOdd') && strictlyInsideRings([SQUARE], 5, 5, 'evenOdd')).toBe(true);
  });

  it('reads a ring set together: inside the outer ring and outside its hole, a point on the hole\'s edge outside', () => {
    const hole = ring(3, 3, 3, 7, 7, 7, 7, 3);
    expect(strictlyInsideRings([SQUARE, hole], 1, 1, 'evenOdd')).toBe(true);
    expect(strictlyInsideRings([SQUARE, hole], 5, 5, 'evenOdd')).toBe(false);
    expect(strictlyInsideRings([SQUARE, hole], 5, 5, 'nonZero')).toBe(false); // the hole runs clockwise: winding 0
    expect(strictlyInsideRings([SQUARE, hole], 3, 5, 'evenOdd')).toBe(false);
    expect(strictlyInsideRings([SQUARE, hole], 3, 5, 'nonZero')).toBe(false);
    // a hole wound the same way as its outer ring: even–odd still out, non-zero in (winding 2)
    const sameWay = hole.slice().reverse();
    expect(strictlyInsideRings([SQUARE, sameWay], 5, 5, 'evenOdd')).toBe(false);
    expect(strictlyInsideRings([SQUARE, sameWay], 5, 5, 'nonZero')).toBe(true);
  });

  it('the doubled convention is the lattice one at every lattice point, and decides edge midpoints off the ring', () => {
    for (let x = -1; x <= 11; x++) for (let y = -1; y <= 11; y++) expect(insideDoubledRing(SQUARE, 2 * x, 2 * y)).toBe(insideLatticeRing(SQUARE, x, y));
    const tri = ring(0, 0, 7, 1, 2, 5);
    expect(insideDoubledRing(tri, 7, 4)).toBe(true); // (3.5, 2)
    expect(insideDoubledRing(tri, 15, 3)).toBe(false); // (7.5, 1.5)
    expect(insideDoubledRing(SQUARE, 1, 19)).toBe(true); // (0.5, 9.5): half a centimetre in from a corner
    expect(insideDoubledRing(SQUARE, -1, 19)).toBe(false);
  });

  it('property: the winding number and every reading equal the exact ray crossing on small rings, the boundary included', () => {
    fc.assert(
      fc.property(smallRing(), small(), small(), fc.integer({ min: -13, max: 13 }), fc.integer({ min: -13, max: 13 }), (r, qx, qy, qx2, qy2) => {
        const w = windingBig(r, qx, qy);
        const on = onRingBig(r, qx, qy);
        const doubled = r.map((q) => pt(2 * q.x, 2 * q.y));
        return (
          insideDoubledRing(r, qx2, qy2) === (windingBig(doubled, qx2, qy2) % 2 !== 0) &&
          windingNumber(r, qx, qy) === w &&
          insideLatticeRing(r, qx, qy) === (w % 2 !== 0) &&
          insideDoubledRing(r, 2 * qx, 2 * qy) === (w % 2 !== 0) &&
          insideOrOnRing(r, qx, qy, 'evenOdd') === (on || w % 2 !== 0) &&
          insideOrOnRing(r, qx, qy, 'nonZero') === (on || w !== 0) &&
          strictlyInsideRings([r], qx, qy, 'evenOdd') === (!on && w % 2 !== 0) &&
          strictlyInsideRings([r], qx, qy, 'nonZero') === (!on && w !== 0)
        );
      }),
    );
  }, TIMEOUT);

  it('property: the same across the range', () => {
    const big = fc.array(fc.tuple(coord(), coord()).map(([x, y]) => pt(x, y)), { minLength: 3, maxLength: 12 });
    fc.assert(
      fc.property(big, coord(), coord(), fc.nat(), (r, x, y, k) => {
        // a query at a ring vertex's height or column half the time, so the half-open rule is exercised at range
        const v = r[k % r.length];
        const [qx, qy] = k % 4 === 0 ? [x, v.y] : k % 4 === 1 ? [v.x, y] : [x, y];
        const w = windingBig(r, qx, qy);
        const on = onRingBig(r, qx, qy);
        return windingNumber(r, qx, qy) === w && insideOrOnRing(r, qx, qy, 'evenOdd') === (on || w % 2 !== 0) && strictlyInsideRings([r], qx, qy, 'nonZero') === (!on && w !== 0);
      }),
    );
  }, TIMEOUT);
});

describe('the shared constants (§3.2 (8), §6.5 (3))', () => {
  it('holds π\'s nearest double, 2²⁴ and 2²⁰', () => {
    expect(PI).toBe(3.141592653589793);
    expect(PI).toBe(Math.PI);
    expect(BOX_RANGE).toBe(2 ** 24);
    expect(BOX_RANGE).toBe(16_777_216);
    expect(POW2_20).toBe(2 ** 20);
    expect(POW2_20).toBe(1_048_576);
  });

  it('divScaled: the quotient for a denominator down to 2⁻²⁰ in its unit, null below it or for NaN', () => {
    expect(divScaled(1, 2 ** -20, 'length')).toBe(2 ** 20);
    expect(divScaled(1, 2 ** -21, 'length')).toBeNull();
    expect(divScaled(1, -(2 ** -20), 'area')).toBe(-(2 ** 20));
    expect(divScaled(1, Number.NaN, 'length')).toBeNull();
    expect(divScaled(0, 0, 'count')).toBeNull();
    expect(divScaled(7, 3, 'angle')).toBe(7 / 3);
  });

  it('property: divScaled is num ÷ den to the bit wherever the scaled terms stay finite and the denominator clears 2⁻²⁰', () => {
    fc.assert(
      fc.property(fc.double({ min: -1e290, max: 1e290, noNaN: true }), fc.double({ min: -1e290, max: 1e290, noNaN: true }), (num, den) => {
        const q = divScaled(num, den, 'length');
        return Math.abs(den) >= 2 ** -20 ? q !== null && Object.is(q, num / den) : q === null;
      }),
    );
  }, TIMEOUT);
});

describe('exact.ts is imported by path, never re-exported (C-0306)', () => {
  it('neither num/index.ts nor the package barrel exports any of its names', () => {
    const names = Object.keys(exact);
    expect(names.sort()).toEqual(['BOX_RANGE', 'PI', 'POW2_20', 'crossingStep', 'divScaled', 'insideDoubledRing', 'insideLatticeRing', 'insideOrOnRing', 'onLatticeSegment', 'segmentCloserThan', 'segmentsMeet', 'strictlyInsideRings', 'windingNumber']);
    for (const n of names) {
      expect(n in numIndex, `num/index.ts exports ${n}`).toBe(false);
      if (n in barrel) expect((barrel as Record<string, unknown>)[n], `the barrel's ${n} is another module's`).not.toBe((exact as Record<string, unknown>)[n]);
    }
  });
});
