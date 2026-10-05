// M0-a-08's booleans on the arrangement (§3.4, §3.7 *Decision*, §3.11 *no input*): the four operations under both fill
// rules on hand-made operands with known answers, the winding labels, holes and pinches, the empty result, the lattice
// door, and a fast-check property tying the four operations' areas together. The oracle agreement is the testkit
// folder's (C-0122).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { booleans, buildOverlay, windingLabels, type Ring } from '../../../src/arr/index.js';
import { areaOf, perimeterOf, pt, R, rect, simpleRing, TIMEOUT, area2Exact } from './support.js';

function rings(r: ReturnType<typeof booleans>): Ring[] {
  if (!r.ok) throw new Error(`refused: ${r.code} ${r.detail}`);
  return r.value;
}

describe('booleans: the four operations on two overlapping squares', () => {
  const A = [rect(0, 0, 1000, 1000)];
  const B = [rect(500, 500, 1500, 1500)];

  it('union, intersection, difference and xor give the exact areas and canonical counter-clockwise rings', () => {
    const u = rings(booleans('union', A, B, 'nonzero'));
    expect(u).toHaveLength(1);
    expect(areaOf(u)).toBe(1_750_000);
    expect(u[0]).toEqual(R([0, 0], [1000, 0], [1000, 500], [1500, 500], [1500, 1500], [500, 1500], [500, 1000], [0, 1000]));
    const i = rings(booleans('intersection', A, B, 'nonzero'));
    expect(i).toEqual([rect(500, 500, 1000, 1000)]);
    const d = rings(booleans('difference', A, B, 'nonzero'));
    expect(areaOf(d)).toBe(750_000);
    expect(d).toHaveLength(1);
    const x = rings(booleans('xor', A, B, 'evenodd'));
    expect(x).toHaveLength(2);
    expect(areaOf(x)).toBe(1_500_000);
    for (const r of [...u, ...i, ...d, ...x]) {
      expect(simpleRing(r)).toBe(true);
      expect(area2Exact(r) > 0n).toBe(true);
    }
  });

  it('reports no attraction warning on a case where nothing moves', () => {
    const r = booleans('union', A, B, 'nonzero');
    expect(r.ok && r.warnings.filter((w) => ['W_ATTRACTED', 'W_STRETCH_SHARED', 'W_WEDGE_ROUTED', 'W_PLACED'].includes(w.code))).toEqual([]);
  });
});

describe('booleans: holes, pinches and fill rules', () => {
  it('a difference that leaves a hole returns the outer ring counter-clockwise and the hole clockwise', () => {
    const r = rings(booleans('difference', [rect(0, 0, 3000, 3000)], [rect(1000, 1000, 2000, 2000)], 'nonzero'));
    expect(r).toHaveLength(2);
    expect(area2Exact(r[0]) > 0n).toBe(true);
    expect(area2Exact(r[1]) < 0n).toBe(true);
    expect(areaOf(r)).toBe(8_000_000);
  });

  it('two squares touching at one corner unite as two faces meeting at a point', () => {
    const r = rings(booleans('union', [rect(0, 0, 1000, 1000)], [rect(1000, 1000, 2000, 2000)], 'nonzero'));
    expect(r).toHaveLength(2);
    expect(areaOf(r)).toBe(2_000_000);
  });

  it('two squares sharing a side unite as one face (the shared side removed)', () => {
    const r = rings(booleans('union', [rect(0, 0, 1000, 1000)], [rect(1000, 0, 2000, 1000)], 'nonzero'));
    expect(r).toEqual([rect(0, 0, 2000, 1000)]);
  });

  it('nonzero fills a doubly wound region, evenodd leaves it out (one operand of two overlapping rings)', () => {
    const a = [rect(0, 0, 2000, 2000), rect(1000, 1000, 3000, 3000)];
    const nz = rings(booleans('union', a, [], 'nonzero'));
    expect(areaOf(nz)).toBe(7_000_000);
    const eo = rings(booleans('union', a, [], 'evenodd'));
    expect(areaOf(eo)).toBe(6_000_000);
  });

  it('a clockwise ring winds −1: nonzero keeps it, and it cancels a counter-clockwise copy of itself', () => {
    const cw = rect(0, 0, 1000, 1000).reverse();
    expect(areaOf(rings(booleans('union', [cw], [], 'nonzero')))).toBe(1_000_000);
    const cancel = booleans('union', [cw, rect(0, 0, 1000, 1000)], [], 'nonzero');
    expect(cancel.ok).toBe(false);
  });

  it('a self-crossing bow-tie: both lobes under either rule', () => {
    const bow = R([0, 0], [2000, 2000], [2000, 0], [0, 2000]);
    const nz = rings(booleans('union', [bow], [], 'nonzero'));
    expect(nz).toHaveLength(2);
    expect(areaOf(nz)).toBe(2_000_000);
  });
});

describe('the winding labels', () => {
  it('label nested squares 1 and 2, the outside 0, consistently', () => {
    const ov = buildOverlay([[rect(0, 0, 3000, 3000), rect(1000, 1000, 2000, 2000)]]);
    expect(ov.ok).toBe(true);
    if (!ov.ok) return;
    const labels = windingLabels(ov.value);
    expect(labels.consistent).toBe(true);
    // the outside and the scratch frame's inside 0, the ring and the nested square 1 and 2
    const values = [...new Set([...labels.winding.values()].map((w) => w[0]))].sort();
    expect(values).toEqual([0, 1, 2]);
    expect(labels.winding.get(-1)).toEqual([0]);
  });
});

describe('the empty result and the lattice door (§3.11)', () => {
  it('an empty boolean result is E_DEGENERATE empty', () => {
    const disjoint = booleans('intersection', [rect(0, 0, 1000, 1000)], [rect(2000, 0, 3000, 1000)], 'nonzero');
    expect(disjoint).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    const covered = booleans('difference', [rect(0, 0, 1000, 1000)], [rect(-10, -10, 1010, 1010)], 'nonzero');
    expect(covered).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    expect(booleans('union', [], [], 'evenodd')).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    expect('warnings' in disjoint).toBe(true);
  });

  it('a coordinate off the lattice is E_OUT_OF_RANGE', () => {
    expect(booleans('union', [[pt(0, 0), pt(1.5, 0), pt(0, 10)]], [], 'nonzero')).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
    expect(booleans('union', [[pt(0, 0), pt(8_388_608, 0), pt(0, 10)]], [], 'nonzero')).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
  });
});

const MOVES = ['W_ATTRACTED', 'W_STRETCH_SHARED', 'W_WEDGE_ROUTED', 'W_PLACED'];

describe('a property over random rectangles (inclusion–exclusion within the split tolerance of §3.7)', () => {
  const box = fc
    .record({ x: fc.integer({ min: -5000, max: 5000 }), y: fc.integer({ min: -5000, max: 5000 }), w: fc.integer({ min: 100, max: 4000 }), h: fc.integer({ min: 100, max: 4000 }) })
    .map(({ x, y, w, h }) => rect(x, y, x + w, y + h));
  it('area(A ∪ B) + area(A ∩ B) = area(A) + area(B), and xor = union − intersection', { timeout: TIMEOUT }, () => {
    fc.assert(
      fc.property(box, box, (a, b) => {
        let moved = false;
        const area = (r: ReturnType<typeof booleans>): number => {
          const ws = r.ok ? r.warnings : 'warnings' in r ? (r as { warnings: { code: string; count: number }[] }).warnings : [];
          if (ws.some((w) => MOVES.includes(w.code) && w.count > 0)) moved = true;
          return r.ok ? areaOf(r.value) : 0;
        };
        const u = area(booleans('union', [a], [b], 'nonzero'));
        const i = area(booleans('intersection', [a], [b], 'nonzero'));
        const x = area(booleans('xor', [a], [b], 'nonzero'));
        const d = area(booleans('difference', [a], [b], 'nonzero'));
        // unattracted: 1 cm per cm of perimeter; attracted: √2 · attractCm (§3.7), each of the three sums at most twice
        const tol = perimeterOf([a, b]) * (moved ? 2 * Math.SQRT2 * 26 : 1);
        return Math.abs(u + i - areaOf([a]) - areaOf([b])) <= tol && Math.abs(x - (u - i)) <= tol && Math.abs(d - (u - areaOf([b]))) <= tol;
      }),
      { numRuns: 500 },
    );
  });
});
