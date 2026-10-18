// arb.duplicated, arb.zeroArea and arb.large (M0-k-01; §13.1 (1) duplicated-vertex, zero-area and ≥ 300-vertex
// polygons and chains; the builds' "duplicated-vertex and zero-area rings, ≥ 300-vertex rings"). Duplicates: a base
// ring or chain with one to four of its vertices repeated in place (one or two extra copies each) and, for a ring, now
// and then its first vertex repeated at the end (an explicitly closed ring). Zero area: a ring whose exact twice-area
// is 0 — points on one lattice line visited back and forth, a path walked out and back (every edge twice), or a bow tie
// [p, p + w + h, p + w, p + h] whose two lobes cancel — and a chain on one lattice line. Large: star rings of 300–600
// vertices, and walks of 300–600 vertices.
import fc from 'fast-check';
import type { LatticePoint } from '@plat/kernel';
import { chain, walkArb } from './chain.js';
import { RADIUS_PER_VERTEX, polygon } from './polygon.js';
import { directionArb } from './thin.js';
import { fitIntoRange, place, posArb, resolveLimit, type Vec } from './lattice.js';
import type { FuzzChain, FuzzRing, FuzzShapeOptions } from './types.js';

/** arb.duplicated's options: the form, the bounds, and the base shapes (arb.polygon() or arb.chain() by default). */
export interface FuzzDuplicatedOptions extends FuzzShapeOptions {
  base?: fc.Arbitrary<LatticePoint[]>;
}

/** Rings or chains with vertices repeated in place; see the module comment. */
export function duplicated(opts: FuzzDuplicatedOptions = {}): fc.Arbitrary<LatticePoint[]> {
  const limit = resolveLimit(opts.limitCm);
  const ringForm = opts.shape !== 'chain';
  const base = opts.base ?? (ringForm ? polygon({ limitCm: limit }) : chain({ limitCm: limit }));
  return fc
    .record({
      base,
      dups: fc.array(fc.record({ at: posArb, times: fc.integer({ min: 1, max: 2 }) }), { minLength: 1, maxLength: 4 }),
      close: fc.integer({ min: 0, max: 3 }),
    })
    .map(({ base: b, dups, close }) => {
      const extra = new Array<number>(b.length).fill(0);
      for (const { at, times } of dups) extra[place(0, b.length - 1, at)] += times;
      const out: LatticePoint[] = [];
      b.forEach((p, i) => {
        for (let j = 0; j <= extra[i]; j += 1) out.push(p);
      });
      if (ringForm && close === 0) out.push(b[0]);
      return out;
    });
}

/** Zero-area rings: collinear back-and-forth, out-and-back paths, bow ties. */
function zeroRing(limit: number): fc.Arbitrary<FuzzRing> {
  const base = Math.floor(limit / 8);
  const span = Math.max(1, Math.floor(base / (64 * 20)));
  const collinear = fc
    .record({
      d: directionArb,
      steps: fc.array(fc.tuple(fc.integer({ min: 1, max: span }), fc.boolean()), { minLength: 2, maxLength: 19 }),
      fx: posArb,
      fy: posArb,
    })
    .map(({ d, steps, fx, fy }) => {
      const vs: Vec[] = [{ x: 0, y: 0 }];
      let s = 0;
      for (const [k, back] of steps) {
        s += back ? -k : k;
        vs.push({ x: s * d.x, y: s * d.y });
      }
      return fitIntoRange(vs, limit, fx, fy);
    });
  const retrace = walkArb([3, 20], [1, Math.max(1, Math.floor(base / 20))], limit).map((w) => [...w, ...w.slice(1, -1).reverse()]);
  const q = Math.floor(base / 4);
  const vecArb = fc.record({ x: fc.integer({ min: -q, max: q }), y: fc.integer({ min: -q, max: q }) });
  const bowtie = fc
    .record({ w: vecArb, h: vecArb, fx: posArb, fy: posArb })
    .filter(({ w, h }) => (h.x !== 0 || h.y !== 0) && (w.x + h.x !== 0 || w.y + h.y !== 0) && (w.x !== h.x || w.y !== h.y))
    .map(({ w, h, fx, fy }) =>
      fitIntoRange(
        [
          { x: 0, y: 0 },
          { x: w.x + h.x, y: w.y + h.y },
          { x: w.x, y: w.y },
          { x: h.x, y: h.y },
        ],
        limit,
        fx,
        fy,
      ),
    );
  // A collinear walk that ends where it began would close on a duplicate, which is the duplicated class, not this one.
  const open = collinear.filter((r) => r[0].x !== r[r.length - 1].x || r[0].y !== r[r.length - 1].y);
  return fc.oneof(open, retrace, bowtie);
}

/** Zero-area chains: vertices on one lattice line, consecutive ones distinct, back and forth. */
function zeroChain(limit: number): fc.Arbitrary<FuzzChain> {
  const span = Math.max(1, Math.floor(Math.floor(limit / 8) / (64 * 40)));
  return fc
    .record({
      d: directionArb,
      steps: fc.array(fc.tuple(fc.integer({ min: 1, max: span }), fc.boolean()), { minLength: 2, maxLength: 39 }),
      fx: posArb,
      fy: posArb,
    })
    .map(({ d, steps, fx, fy }) => {
      const vs: Vec[] = [{ x: 0, y: 0 }];
      let s = 0;
      for (const [k, back] of steps) {
        s += back ? -k : k;
        vs.push({ x: s * d.x, y: s * d.y });
      }
      return fitIntoRange(vs, limit, fx, fy);
    });
}

/** Zero-area polygons (the default) or chains (§13.1 (1)); see the module comment. */
export function zeroArea(opts: FuzzShapeOptions = {}): fc.Arbitrary<FuzzRing> {
  const limit = resolveLimit(opts.limitCm);
  return opts.shape === 'chain' ? zeroChain(limit) : zeroRing(limit);
}

/** ≥ 300-vertex polygons (star rings of 300–600 vertices, the default) or chains (walks of 300–600 vertices). */
export function large(opts: FuzzShapeOptions = {}): fc.Arbitrary<FuzzRing> {
  const limit = resolveLimit(opts.limitCm);
  if (opts.shape === 'chain') return walkArb([300, 600], [1, Math.max(1, Math.floor(limit / 600))], limit);
  return polygon({ limitCm: limit, vertices: [300, 600], sizeCm: [RADIUS_PER_VERTEX * 600, Math.min(4_194_304, limit)] });
}
