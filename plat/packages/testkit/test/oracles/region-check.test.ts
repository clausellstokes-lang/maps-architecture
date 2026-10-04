// M0-k-03 (fix round 2; C-0150): the region check that every oracle answer passes — the area where a candidate region
// differs from the operands' region under the declared rule, from the operands' own winding numbers. Exact areas on
// hand-built cases; the fill rules, the four operations and the candidate's reading (winding 1 inside, 0 outside);
// crossings inside a slab; and, against an independent point test written here, the label at random points.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  REGION_CHECK_CM,
  checkOperand,
  regionCheck,
  regionMismatchCm2,
  wrongRegion,
  type CheckOperand,
  type DRing,
} from '../../src/oracles/region-check.js';
import { isSimpleRing } from '../../src/oracles/rings.js';
import type { BooleanOp, FillRule } from '../../src/oracles/types.js';
import { P } from './support.js';

/** An axis-aligned rectangle in doubles, counter-clockwise. */
function box(x0: number, y0: number, x1: number, y1: number): DRing {
  return [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
  ];
}

function rev(r: DRing): DRing {
  return r.slice().reverse();
}

function operand(fill: FillRule, ...rings: DRing[]): CheckOperand {
  return { rings, fill };
}

const NONE = operand('nonzero');
const A = operand('nonzero', box(0, 0, 1_000, 1_000));
const B = operand('nonzero', box(500, 500, 1_500, 1_500));
const OPS: readonly BooleanOp[] = ['union', 'intersection', 'difference', 'xor'];

describe('the region check (C-0150)', () => {
  it('measures the operands’ region itself against an empty candidate, for every operation', () => {
    const truth: Record<BooleanOp, number> = { union: 1_750_000, intersection: 250_000, difference: 750_000, xor: 1_500_000 };
    for (const op of OPS) expect(regionMismatchCm2(op, A, B, []), op).toBeCloseTo(truth[op], 6);
  });

  it('finds no mismatch for the exact answer of each operation', () => {
    const union: DRing = [
      [0, 0],
      [1_000, 0],
      [1_000, 500],
      [1_500, 500],
      [1_500, 1_500],
      [500, 1_500],
      [500, 1_000],
      [0, 1_000],
    ];
    const difference: DRing = [
      [0, 0],
      [1_000, 0],
      [1_000, 500],
      [500, 500],
      [500, 1_000],
      [0, 1_000],
    ];
    const otherSide: DRing = [
      [1_000, 500],
      [1_500, 500],
      [1_500, 1_500],
      [500, 1_500],
      [500, 1_000],
      [1_000, 1_000],
    ];
    expect(regionMismatchCm2('union', A, B, [union])).toBeCloseTo(0, 9);
    expect(regionMismatchCm2('intersection', A, B, [box(500, 500, 1_000, 1_000)])).toBeCloseTo(0, 9);
    expect(regionMismatchCm2('difference', A, B, [difference])).toBeCloseTo(0, 9);
    expect(regionMismatchCm2('xor', A, B, [difference, otherSide])).toBeCloseTo(0, 9);
    // the wrong operation's answer misses by the area between the two
    expect(regionMismatchCm2('intersection', A, B, [union])).toBeCloseTo(1_500_000, 6);
    expect(regionMismatchCm2('union', A, B, [difference])).toBeCloseTo(1_000_000, 6);
  });

  it('measures a 3 cm shift of one edge exactly', () => {
    expect(regionMismatchCm2('union', A, NONE, [box(0, 0, 1_003, 1_000)])).toBeCloseTo(3_000, 6);
    expect(regionMismatchCm2('union', A, NONE, [box(0, 0, 997, 1_000)])).toBeCloseTo(3_000, 6);
  });

  it('reads each operand by its own fill rule', () => {
    const two = [box(0, 0, 1_000, 1_000), box(500, 500, 1_500, 1_500)];
    expect(regionMismatchCm2('union', operand('nonzero', ...two), NONE, [])).toBeCloseTo(1_750_000, 6);
    expect(regionMismatchCm2('union', operand('evenodd', ...two), NONE, [])).toBeCloseTo(1_500_000, 6);
    const nestedSame = [box(0, 0, 1_000, 1_000), box(250, 250, 750, 750)];
    expect(regionMismatchCm2('union', operand('nonzero', ...nestedSame), NONE, [])).toBeCloseTo(1_000_000, 6);
    expect(regionMismatchCm2('union', operand('evenodd', ...nestedSame), NONE, [])).toBeCloseTo(750_000, 6);
    const holed = [box(0, 0, 1_000, 1_000), rev(box(250, 250, 750, 750))];
    expect(regionMismatchCm2('union', operand('nonzero', ...holed), NONE, [])).toBeCloseTo(750_000, 6);
    expect(regionMismatchCm2('union', operand('evenodd', ...holed), NONE, [])).toBeCloseTo(750_000, 6);
    // b's rule is b's own: a hole of b under even-odd, a double cover of b under non-zero
    expect(regionMismatchCm2('difference', A, operand('evenodd', ...nestedSame), [])).toBeCloseTo(250_000, 6);
    expect(regionMismatchCm2('difference', A, operand('nonzero', ...nestedSame), [])).toBeCloseTo(0, 6);
  });

  it('splits a slab at a crossing: a bow-tie’s two lobes, under either rule', () => {
    const bowTie: DRing = [
      [0, 0],
      [1_000, 1_000],
      [1_000, 0],
      [0, 1_000],
    ];
    // winding +1 in one lobe and −1 in the other: both filled under either rule, crossing at x = 500
    expect(regionMismatchCm2('union', operand('nonzero', bowTie), NONE, [])).toBeCloseTo(500_000, 6);
    expect(regionMismatchCm2('union', operand('evenodd', bowTie), NONE, [])).toBeCloseTo(500_000, 6);
    const lobes: DRing[] = [
      [
        [0, 0],
        [500, 500],
        [0, 1_000],
      ],
      [
        [1_000, 0],
        [1_000, 1_000],
        [500, 500],
      ],
    ];
    expect(regionMismatchCm2('union', operand('nonzero', bowTie), NONE, lobes)).toBeCloseTo(0, 6);
  });

  it('reads the candidate as winding 1 inside and 0 outside: a clockwise outline or an overlap is a mismatch', () => {
    expect(regionMismatchCm2('union', A, NONE, [rev(box(0, 0, 1_000, 1_000))])).toBeCloseTo(1_000_000, 6);
    expect(regionMismatchCm2('union', A, B, [box(0, 0, 1_000, 1_000), box(500, 500, 1_500, 1_500)])).toBeCloseTo(250_000, 6);
    // a hole written clockwise inside its outline is read right
    expect(regionMismatchCm2('difference', A, operand('nonzero', box(250, 250, 750, 750)), [box(0, 0, 1_000, 1_000), rev(box(250, 250, 750, 750))])).toBeCloseTo(0, 6);
  });

  it('bounds a candidate by 0.01 cm per cm of the operands’ boundary, and words a failure', () => {
    expect(REGION_CHECK_CM).toBe(0.01);
    const exact = regionCheck('intersection', A, B, [box(500, 500, 1_000, 1_000)]);
    expect(exact.boundCm2).toBeCloseTo(80, 9);
    expect(exact.ok).toBe(true);
    // 1 cm wider over a 500 cm side: 500 cm², beyond the 80 cm² bound
    const wide = regionCheck('intersection', A, B, [box(499, 500, 1_000, 1_000)]);
    expect(wide.mismatchCm2).toBeCloseTo(500, 6);
    expect(wide.ok).toBe(false);
    expect(wrongRegion(wide)).toBe("a wrong region (500.0 cm² off the operands' region; bound 80.0 cm²)");
    // within the bound: a 0.1 cm sliver along the same side
    expect(regionCheck('intersection', A, B, [box(499.9, 500, 1_000, 1_000)]).ok).toBe(true);
    expect(regionCheck('union', A, B, [[[Number.NaN, 0], [1, 0], [1, 1]]]).ok).toBe(false);
    expect(checkOperand([[{ x: 1, y: 2 }]], 'evenodd')).toEqual({ rings: [[[1, 2]]], fill: 'evenodd' });
  });
});

/**
 * The winding number of a ring set at q, written here apart from the check: the signed count of the edges the
 * vertical line through q crosses below q — +1 for an edge running in +x (a counter-clockwise ring's bottom), −1 for
 * one running in −x.
 */
function winding(rings: readonly DRing[], qx: number, qy: number): number {
  let w = 0;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const [ax, ay] = r[i];
      const [bx, by] = r[(i + 1) % r.length];
      if (!(qx > Math.min(ax, bx) && qx < Math.max(ax, bx))) continue;
      const y = ay + ((by - ay) * (qx - ax)) / (bx - ax);
      if (y < qy) w += bx > ax ? 1 : -1;
    }
  }
  return w;
}

/** The distance from q to the nearest edge of a ring set. */
function nearestEdge(rings: readonly DRing[], qx: number, qy: number): number {
  let d = Number.POSITIVE_INFINITY;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const [ax, ay] = r[i];
      const [bx, by] = r[(i + 1) % r.length];
      const dx = bx - ax;
      const dy = by - ay;
      const len2 = dx * dx + dy * dy;
      const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((qx - ax) * dx + (qy - ay) * dy) / len2));
      d = Math.min(d, Math.hypot(qx - ax - t * dx, qy - ay - t * dy));
    }
  }
  return d;
}

const smallRing = fc
  .array(fc.tuple(fc.integer({ min: -50, max: 50 }), fc.integer({ min: -50, max: 50 })), { minLength: 3, maxLength: 8 })
  .map((pts) => pts as DRing);

describe('the region check against a point test written apart from it', () => {
  it('labels every point as the operation and the fill rules say (a 10⁻³ cm square around a random point)', () => {
    fc.assert(
      fc.property(
        fc.array(smallRing, { minLength: 1, maxLength: 2 }),
        fc.array(smallRing, { minLength: 0, maxLength: 2 }),
        fc.constantFrom<BooleanOp>(...OPS),
        fc.constantFrom<FillRule>('nonzero', 'evenodd'),
        fc.constantFrom<FillRule>('nonzero', 'evenodd'),
        fc.tuple(fc.integer({ min: -55, max: 55 }), fc.integer({ min: -55, max: 55 })),
        (ra, rb, op, fa, fb, [qi, qj]) => {
          const qx = qi + 0.3719;
          const qy = qj + 0.6143;
          fc.pre(nearestEdge([...ra, ...rb], qx, qy) > 0.01);
          const a = operand(fa, ...ra);
          const b = operand(fb, ...rb);
          const inside = (w: number, f: FillRule): boolean => (f === 'nonzero' ? w !== 0 : w % 2 !== 0);
          const ia = inside(winding(ra, qx, qy), fa);
          const ib = inside(winding(rb, qx, qy), fb);
          const truth = op === 'union' ? ia || ib : op === 'intersection' ? ia && ib : op === 'difference' ? ia && !ib : ia !== ib;
          const h = 0.0005;
          const tiny = box(qx - h, qy - h, qx + h, qy + h);
          const d = regionMismatchCm2(op, a, b, [tiny]) - regionMismatchCm2(op, a, b, []);
          // the tiny square inside the region removes its area from the mismatch; outside it adds it
          return Math.abs(d - (truth ? -1e-6 : 1e-6)) < 1e-8;
        },
      ),
      { numRuns: 3_000 },
    );
  });

  it('gives a simple ring’s exact area, and no mismatch for the ring written counter-clockwise', () => {
    fc.assert(
      fc.property(smallRing, (r) => {
        fc.pre(isSimpleRing(r.map(([x, y]) => P(x, y))));
        let s = 0;
        for (let i = 0; i < r.length; i += 1) {
          const [ax, ay] = r[i];
          const [bx, by] = r[(i + 1) % r.length];
          s += ax * by - bx * ay;
        }
        const ccw = s > 0 ? r : rev(r);
        const alone = regionMismatchCm2('union', operand('nonzero', r), NONE, []);
        const itself = regionMismatchCm2('union', operand('evenodd', r), NONE, [ccw]);
        return Math.abs(alone - Math.abs(s) / 2) < 1e-6 && itself < 1e-6;
      }),
      { numRuns: 1_000 },
    );
  });
});
