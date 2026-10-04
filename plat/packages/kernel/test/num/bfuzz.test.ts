// M0-a-01's B-FUZZ bar (§13.1; marked *here* in M0-work.json): PLAT_FUZZ_RUNS random inputs per primitive — 10⁴ in
// the PR tier, 10⁶ nightly (C-0057) — with 0 crashes (a throw fails the property), 0 hangs (each test's hard timeout)
// and 0 invalid outputs (each primitive's contract below). The item's own fast-check properties meet it (the spec
// note N-16): the numeric core lands before the test kit's generators (M0-k-01).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  area2,
  area2Big,
  belowMinEdge,
  cdeg,
  dist2,
  frameOf,
  incircle,
  orient,
  orient2d,
  ratio,
  snap,
  unitVec,
  withinAttract,
  type KernelResult,
  type RatioKind,
} from '../../src/num/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { RANGE, TIMEOUT, anyRing, coord, incircleBig, latticePoint, orient2dBig, pt, rotate, shoelaceBig, signOf } from './support.js';

/** A KernelResult is well formed: ok with a warnings array, or a refusal with a code and a string detail. */
function wellFormed<T>(r: KernelResult<T>): boolean {
  return r.ok ? Array.isArray(r.warnings) : typeof r.code === 'string' && typeof r.detail === 'string';
}

/** Any double, the specials included, plus the range's edges. */
const anyDouble = fc.oneof(
  fc.double(),
  fc.constantFrom(RANGE, -RANGE, RANGE - 1, -(RANGE - 1), RANGE - 0.5, -(RANGE - 0.5), 0.5, -0.5, Number.NaN, Infinity, -Infinity),
);

/** Three points, often collinear by construction (§13.1 (2)'s gcd stepping, here through a shared step). */
const triple = fc.oneof(
  fc.tuple(latticePoint(), latticePoint(), latticePoint()),
  fc
    .tuple(coord(), coord(), fc.integer({ min: -1000, max: 1000 }), fc.integer({ min: -1000, max: 1000 }), fc.integer({ min: -4000, max: 4000 }), fc.integer({ min: -4000, max: 4000 }))
    .map(([x, y, dx, dy, j, k]) => {
      const clampC = (v: number) => Math.max(-(RANGE - 1), Math.min(RANGE - 1, v));
      const at = (t: number) => pt(clampC(x + t * dx), clampC(y + t * dy));
      return [at(0), at(j), at(k)] as [LatticePoint, LatticePoint, LatticePoint];
    }),
);

describe('B-FUZZ (§13.1): every M0-a-01 primitive at PLAT_FUZZ_RUNS', () => {
  it('snap: a lattice point in range or E_OUT_OF_RANGE', () => {
    fc.assert(
      fc.property(anyDouble, anyDouble, (x, y) => {
        const r = snap(x, y);
        if (!wellFormed(r)) return false;
        if (!r.ok) return r.code === 'E_OUT_OF_RANGE' && (r.detail === 'x' || r.detail === 'y');
        const { x: sx, y: sy } = r.value;
        return sx === (sx | 0) && sy === (sy | 0) && Math.abs(sx) < RANGE && Math.abs(sy) < RANGE && !Object.is(sx, -0) && !Object.is(sy, -0);
      }),
    );
  }, TIMEOUT);

  it('orient2d and orient (three points): exact and a sign', () => {
    fc.assert(
      fc.property(triple, ([a, b, c]) => {
        const d = orient2d(a.x, a.y, b.x, b.y, c.x, c.y);
        const s = orient(a, b, c);
        return BigInt(d) === orient2dBig(a.x, a.y, b.x, b.y, c.x, c.y) && s === signOf(d);
      }),
    );
  }, TIMEOUT);

  it('area2, area2Big and orient (ring): exact on every ring of ≤ 32 vertices, orientation a sign', () => {
    fc.assert(
      fc.property(anyRing(32), (ring) => {
        const exact = shoelaceBig(ring);
        const o = orient(ring);
        return BigInt(area2(ring)) === exact && area2Big(ring) === exact && (o === 1 || o === 0 || o === -1);
      }),
    );
  }, TIMEOUT);

  it('orient (ring): a property of the cyclic ring — invariant under rotation, negated by reversal (§3.2 (6), C-0140)', () => {
    fc.assert(
      fc.property(anyRing(32), fc.nat(), (ring, k) => {
        const o = orient(ring);
        const r = rotate(ring, k % ring.length);
        return orient(r) === o && orient(r.slice().reverse()) === -o && orient(ring.slice().reverse()) === -o;
      }),
    );
  }, TIMEOUT);

  it('ratio: the quotient at or above the floor, E_DEGENERATE `ratio` below it', () => {
    fc.assert(
      fc.property(anyDouble, anyDouble, fc.constantFrom<RatioKind>('length', 'area', 'angle', 'count'), (num, den, kind) => {
        const r = ratio(num, den, kind);
        if (!wellFormed(r)) return false;
        return Math.abs(den) >= 1 ? r.ok && Object.is(r.value, num / den) : !r.ok && r.code === 'E_DEGENERATE' && r.detail === 'ratio';
      }),
    );
  }, TIMEOUT);

  it('unitVec, cdeg and the distance tests: a unit vector or `ratio`, an integer centidegree, consistent tests', () => {
    fc.assert(
      fc.property(latticePoint(), latticePoint(), fc.double({ min: -1e7, max: 1e7, noNaN: true }), (a, b, deg) => {
        const r = unitVec(a, b);
        if (!wellFormed(r)) return false;
        const same = a.x === b.x && a.y === b.y;
        if (same !== !r.ok) return false;
        if (r.ok && Math.abs(Math.hypot(r.value.x, r.value.y) - 1) > 4 * Number.EPSILON) return false;
        const c = cdeg(deg);
        if (!Number.isInteger(c) || Math.abs(c - deg * 100) > 0.5) return false;
        const d2 = dist2(a.x, a.y, b.x, b.y);
        return withinAttract(a.x, a.y, b.x, b.y) === d2 <= 676 && belowMinEdge(a.x, a.y, b.x, b.y) === d2 < 625;
      }),
    );
  }, TIMEOUT);

  it('incircle: the exact sign', () => {
    fc.assert(
      fc.property(coord(), coord(), coord(), coord(), coord(), coord(), coord(), coord(), (ax, ay, bx, by, cx, cy, dx, dy) => {
        return incircle(ax, ay, bx, by, cx, cy, dx, dy) === signOf(incircleBig(ax, ay, bx, by, cx, cy, dx, dy));
      }),
    );
  }, TIMEOUT);

  it('frameOf: a frame inside the range or a typed refusal, for any inputs', () => {
    fc.assert(
      fc.property(anyDouble, anyDouble, anyDouble, (area, aspect, margin) => {
        const r = frameOf(area, aspect, margin);
        if (!wellFormed(r)) return false;
        if (!r.ok) return r.code === 'E_OUT_OF_RANGE' || (r.code === 'E_DEGENERATE' && r.detail === 'ratio');
        const f = r.value;
        return (
          Number.isInteger(f.widthCm) &&
          Number.isInteger(f.heightCm) &&
          f.widthCm * (0.5 + f.marginShare) < RANGE &&
          f.heightCm * (0.5 + f.marginShare) < RANGE &&
          f.aspect >= 0.5 &&
          f.aspect <= 2
        );
      }),
    );
  }, TIMEOUT);

  it('runs PLAT_FUZZ_RUNS cases per property (C-0057)', () => {
    const expected = process.env.PLAT_FUZZ_RUNS ? Number(process.env.PLAT_FUZZ_RUNS) : 10_000;
    expect(fc.readConfigureGlobal().numRuns).toBe(expected);
  });
});
