// M0-a-01: exact areas (§3.2 (6)). §13.1's star rings of radius 2²³ − 2 — area2 exact with the 2⁵² flush exercised;
// the property area2(ring) == area2Big(ring) for every ring snap can produce (C-0134 (3)'s bound: any ring of at most
// 32 vertices, any simple ring); and multi-lap retraced rings whose partials pass 2⁵³, where a double sum without the
// flush is wrong and area2 is not.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { area2, area2Big, snap } from '../../src/num/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { MAX, anyRing, maxPartialBig, pt, shoelaceBig, unflushedSum } from './support.js';

const R = 2 ** 23 - 2;
const TWO52 = 2n ** 52n;
const TWO53 = 2n ** 53n;

/** The star polygon {n/k} of radius R about the origin, every vertex through snap. */
function star(n: number, k: number, phase = 0): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (let j = 0; j < n; j += 1) {
    const a = phase + (2 * Math.PI * j * k) / n;
    const r = snap(R * Math.cos(a), R * Math.sin(a));
    if (!r.ok) throw new Error('star vertex out of range');
    out.push(r.value);
  }
  return out;
}

/** L1 counter-clockwise laps of one odd-sided rectangle at the range's edge, then L2 clockwise laps of another. */
function laps(l1: number, l2: number): LatticePoint[] {
  const h = 2 ** 23 - 2;
  const ccw = [pt(-h, -h), pt(h - 1, -h), pt(h - 1, h - 1), pt(-h, h - 1)];
  const cw = [pt(-h, -h), pt(-h, h - 3), pt(h - 3, h - 3), pt(h - 3, -h)];
  const out: LatticePoint[] = [];
  for (let i = 0; i < l1; i += 1) out.push(...ccw);
  for (let i = 0; i < l2; i += 1) out.push(...cw);
  return out;
}

describe('area2 and area2Big (§3.2 (6))', () => {
  it('is exact on star rings of radius 2²³ − 2, the 2⁵² flush exercised (§13.1)', () => {
    const rings: [number, number][] = [
      [64, 15],
      [97, 24],
      [121, 30],
    ];
    for (const [n, k] of rings) {
      const ring = star(n, k);
      const exact = shoelaceBig(ring);
      // the partial sums reach the flush, and the total fits a double exactly
      expect(maxPartialBig(ring) >= TWO52, `{${n}/${k}} reaches 2⁵²`).toBe(true);
      expect(exact > 0n && exact < TWO53, `{${n}/${k}} below 2⁵³`).toBe(true);
      expect(BigInt(area2(ring))).toBe(exact);
      expect(area2Big(ring)).toBe(exact);
      // reversed, the same value negated
      const rev = ring.slice().reverse();
      expect(BigInt(area2(rev))).toBe(-exact);
      expect(area2Big(rev)).toBe(-exact);
    }
  });

  it('stays exact where a double sum without the flush is wrong (retraced laps whose partials pass 2⁵³)', () => {
    for (const [l1, l2] of [
      [20, 20],
      [40, 40],
      [40, 39],
    ]) {
      const ring = laps(l1, l2);
      const exact = shoelaceBig(ring);
      expect(maxPartialBig(ring) > TWO53).toBe(true);
      expect(BigInt(unflushedSum(ring))).not.toBe(exact); // the flush is what makes it exact
      expect(BigInt(area2(ring))).toBe(exact);
      expect(area2Big(ring)).toBe(exact);
    }
  });

  it('returns 0 for fewer than three vertices and for zero-area rings', () => {
    expect(area2([])).toBe(0);
    expect(area2([pt(1, 2)])).toBe(0);
    expect(area2([pt(1, 2), pt(MAX, -MAX)])).toBe(0);
    expect(area2Big([pt(1, 2), pt(3, 4)])).toBe(0n);
    expect(area2([pt(0, 0), pt(5, 5), pt(10, 10)])).toBe(0);
    expect(Object.is(area2([pt(0, 0), pt(5, 5), pt(10, 10), pt(5, 5)]), 0)).toBe(true);
    expect(area2([pt(0, 0), pt(10, 0), pt(10, 10), pt(0, 10)])).toBe(200);
    expect(area2([pt(0, 0), pt(0, 10), pt(10, 10), pt(10, 0)])).toBe(-200);
  });

  it('property: area2(ring) == area2Big(ring) == the shoelace in BigInt, for any ring of ≤ 32 vertices in range', () => {
    fc.assert(
      fc.property(anyRing(32), (ring) => {
        const exact = shoelaceBig(ring);
        const a = area2(ring);
        return Number.isInteger(a) && BigInt(a) === exact && area2Big(ring) === exact;
      }),
    );
  });

  it('property: the same for ≥ 300-vertex rings inside ± 2²¹ (any vertex count whose bound stays below 2⁵³)', () => {
    const c = fc.integer({ min: -(2 ** 21), max: 2 ** 21 });
    fc.assert(
      fc.property(fc.array(fc.tuple(c, c), { minLength: 300, maxLength: 400 }), (xy) => {
        const ring = xy.map(([x, y]) => pt(x, y));
        const exact = shoelaceBig(ring);
        return BigInt(area2(ring)) === exact && area2Big(ring) === exact;
      }),
      { numRuns: 1000 },
    );
  }, 120_000);
});
