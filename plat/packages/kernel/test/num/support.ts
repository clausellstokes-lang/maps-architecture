// Test support for M0-a-01's numeric-core tests: lattice points without snap, a seeded generator for the fixed-size
// loops (independent of fast-check, so the 10⁶-case run is reproducible), and the BigInt references every exactness
// claim is judged against — written here from the definitions, never with the code under test.
import fc from 'fast-check';
import type { Cm, LatticePoint } from '../../src/types/index.js';

/** 2²³ and the largest coordinate snap accepts. */
export const RANGE = 2 ** 23;
export const MAX = RANGE - 1;

/** A lattice point from integers the test already holds in range (the test's own door; production code snaps). */
export const pt = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });

/** mulberry32: a small seeded u32 generator for the fixed-size loops. */
export function generator(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A uniform integer in [lo, hi] from a generator. */
export const intIn = (rnd: () => number, lo: number, hi: number): number => lo + Math.floor(rnd() * (hi - lo + 1));

/** The orient2d determinant (b − a) × (c − a) in BigInt. */
export function orient2dBig(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): bigint {
  return (BigInt(bx) - BigInt(ax)) * (BigInt(cy) - BigInt(ay)) - (BigInt(by) - BigInt(ay)) * (BigInt(cx) - BigInt(ax));
}

/** The shoelace twice-area on absolute coordinates, in BigInt. */
export function shoelaceBig(ring: readonly LatticePoint[]): bigint {
  const n = ring.length;
  let s = 0n;
  for (let i = 0; i < n; i += 1) {
    const p = ring[(i + n - 1) % n];
    const q = ring[i];
    s += BigInt(p.x) * BigInt(q.y) - BigInt(q.x) * BigInt(p.y);
  }
  return s;
}

/** The largest magnitude of the bounding-box-relative shoelace partial sums (§3.2 (6)'s partials), in BigInt. */
export function maxPartialBig(ring: readonly LatticePoint[]): bigint {
  const n = ring.length;
  let minX = Infinity;
  let minY = Infinity;
  for (const p of ring) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
  }
  let s = 0n;
  let max = 0n;
  for (let i = 0; i < n; i += 1) {
    const p = ring[(i + n - 1) % n];
    const q = ring[i];
    s += BigInt(p.x - minX) * BigInt(q.y - minY) - BigInt(q.x - minX) * BigInt(p.y - minY);
    const a = s < 0n ? -s : s;
    if (a > max) max = a;
  }
  return max;
}

/** The same partial sums in plain doubles with no flush: what area2 would return without §3.2 (6)'s accumulator. */
export function unflushedSum(ring: readonly LatticePoint[]): number {
  const n = ring.length;
  let minX = Infinity;
  let minY = Infinity;
  for (const p of ring) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
  }
  let s = 0;
  for (let i = 0; i < n; i += 1) {
    const p = ring[(i + n - 1) % n];
    const q = ring[i];
    s += (p.x - minX) * (q.y - minY) - (q.x - minX) * (p.y - minY);
  }
  return s;
}

/** The exact incircle determinant of integer points (Shewchuk's form, + inside for counter-clockwise a, b, c). */
export function incircleBig(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number): bigint {
  const adx = BigInt(ax) - BigInt(dx);
  const ady = BigInt(ay) - BigInt(dy);
  const bdx = BigInt(bx) - BigInt(dx);
  const bdy = BigInt(by) - BigInt(dy);
  const cdx = BigInt(cx) - BigInt(dx);
  const cdy = BigInt(cy) - BigInt(dy);
  const alift = adx * adx + ady * ady;
  const blift = bdx * bdx + bdy * bdy;
  const clift = cdx * cdx + cdy * cdy;
  return alift * (bdx * cdy - cdx * bdy) + blift * (cdx * ady - adx * cdy) + clift * (adx * bdy - bdx * ady);
}

export const signOf = (v: bigint | number): number => (v > 0 ? 1 : v < 0 ? -1 : 0);

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

/** A coordinate snap accepts. */
export const coord = (): fc.Arbitrary<number> => fc.integer({ min: -MAX, max: MAX });

/** A lattice point anywhere in range. */
export const latticePoint = (): fc.Arbitrary<LatticePoint> => fc.tuple(coord(), coord()).map(([x, y]) => pt(x, y));

/**
 * A ring snap can produce, of 3 – 32 vertices anywhere in range: random, with duplicated, collinear and self-crossing
 * vertices drawn often (the bound that makes area2's double exact for any such ring: 32 terms below 2⁴⁸ each).
 */
export const anyRing = (maxLength = 32): fc.Arbitrary<LatticePoint[]> =>
  fc
    .array(fc.oneof(latticePoint(), fc.constantFrom(pt(0, 0), pt(MAX, MAX), pt(-MAX, -MAX), pt(MAX, -MAX), pt(-MAX, MAX))), {
      minLength: 3,
      maxLength: maxLength - 1,
    })
    .chain((ring) =>
      fc.integer({ min: 0, max: ring.length - 1 }).map((dup) => {
        // a duplicated vertex at a random place, the snapped-input degeneracy of §13.1 (1); its term is 0
        const out = ring.slice();
        out.splice(dup, 0, ring[dup]);
        return out;
      }),
    );
