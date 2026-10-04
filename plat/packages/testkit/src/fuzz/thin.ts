// arb.thin (M0-k-01; §13.1 (1) thin polygons and chains). Rings: a rectangle along a primitive lattice direction d,
// 1–3 lattice steps wide and at least 20 times as long (its corners exact); a sliver triangle whose apex stands t / |d|
// cm off its base (t = 1–3, the cross-unit offset of lattice.ts — sub-centimetre for long directions); and a strip — an
// x-monotone chain and its copy 1–3 cm above it, at least 40 times as long as it is high — through a lattice symmetry
// and a vertical shear (lattice.ts's `shearMapArb`, which keeps the strip's x-extent and area and never shortens it). Chains: the strip's two sides as one open hairpin, and a zigzag between two lattice lines t / |d| apart. Every
// ring is simple and counter-clockwise, and each shape's mean width (twice its area over its boundary length) is at
// most a twentieth of its diameter — the classifier `thin` of classes.ts.
import fc from 'fast-check';
import { SHEAR_GROWTH, crossUnit, det, fitIntoRange, mapVecs, place, posArb, primitive, resolveLimit, reversedRing, scaleArb, shearMapArb, type Vec } from './lattice.js';
import type { FuzzChain, FuzzRing, FuzzShapeOptions } from './types.js';

/** A primitive lattice direction with components in [−64, 64]. */
export const directionArb: fc.Arbitrary<Vec> = fc
  .tuple(fc.integer({ min: -64, max: 64 }), fc.integer({ min: -64, max: 64 }))
  .map(([x, y]) => (x === 0 && y === 0 ? { x: 1, y: 0 } : primitive({ x, y }).d));

/** The vertices of an x-monotone chain: x steps ≥ `minStep`, y steps in [−yMax, yMax]. */
function monotone(rows: readonly { dx: number; dy: number }[]): Vec[] {
  const out: Vec[] = [{ x: 0, y: 0 }];
  let x = 0;
  let y = 0;
  for (const { dx, dy } of rows) {
    x += dx;
    y += dy;
    out.push({ x, y });
  }
  return out;
}

/** An x-monotone chain's draw: 2–30 vertices, base extent at most `extent` per axis. */
function monotoneArb(extent: number, maxVertices = 30): fc.Arbitrary<{ rows: { dx: number; dy: number }[]; h: number }> {
  const step = Math.max(1, Math.floor(extent / maxVertices));
  return fc.record({
    rows: fc.array(fc.record({ dx: scaleArb(1, step), dy: fc.integer({ min: -step, max: step }) }), { minLength: 1, maxLength: maxVertices - 1 }),
    h: fc.integer({ min: 1, max: 3 }),
  });
}

/** The strip's lower side, its x steps stretched so its length is at least 40 × its height. */
function stripSides(rows: readonly { dx: number; dy: number }[], h: number): { low: Vec[]; high: Vec[] } {
  const need = Math.ceil((40 * h) / rows.length);
  const low = monotone(rows.map((r) => ({ dx: Math.max(r.dx, need), dy: r.dy })));
  return { low, high: low.map((v) => ({ x: v.x, y: v.y + h })) };
}

/** Thin rings: rectangles, slivers and mapped strips; see the module comment. */
function thinRing(limit: number): fc.Arbitrary<FuzzRing> {
  const base = Math.floor(limit / 8);
  const long = Math.floor(base / 65);
  const rect = fc
    .record({ d: directionArb, n: fc.integer({ min: 1, max: 3 }), m: scaleArb(60, long), fx: posArb, fy: posArb })
    .map(({ d, n, m, fx, fy }) => {
      const p = { x: -d.y, y: d.x };
      const len = Math.max(m, 20 * n);
      return fitIntoRange(
        [
          { x: 0, y: 0 },
          { x: len * d.x, y: len * d.y },
          { x: len * d.x + n * p.x, y: len * d.y + n * p.y },
          { x: n * p.x, y: n * p.y },
        ],
        limit,
        fx,
        fy,
      );
    });
  const sliver = fc
    .record({ d: directionArb, m: scaleArb(30, long), at: posArb, t: fc.integer({ min: 1, max: 3 }), fx: posArb, fy: posArb })
    .map(({ d, m, at, t, fx, fy }) => {
      const q = crossUnit(d);
      const j = place(1, m - 1, at);
      return fitIntoRange(
        [
          { x: 0, y: 0 },
          { x: m * d.x, y: m * d.y },
          { x: j * d.x + t * q.x, y: j * d.y + t * q.y },
        ],
        limit,
        fx,
        fy,
      );
    });
  const strip = fc
    .record({ mono: monotoneArb(Math.floor(base / SHEAR_GROWTH)), map: shearMapArb, fx: posArb, fy: posArb })
    .map(({ mono, map, fx, fy }) => {
      const { low, high } = stripSides(mono.rows, mono.h);
      const ring = fitIntoRange(mapVecs([...low, ...high.reverse()], map), limit, fx, fy);
      return det(map) > 0 ? ring : reversedRing(ring);
    });
  return fc.oneof(rect, sliver, strip);
}

/** Thin chains: hairpins and zigzags; see the module comment. */
function thinChain(limit: number): fc.Arbitrary<FuzzChain> {
  const base = Math.floor(limit / 8);
  const hairpin = fc
    .record({ mono: monotoneArb(Math.floor(base / SHEAR_GROWTH)), map: shearMapArb, fx: posArb, fy: posArb })
    .map(({ mono, map, fx, fy }) => {
      const { low, high } = stripSides(mono.rows, mono.h);
      return fitIntoRange(mapVecs([...low, ...high.reverse()], map), limit, fx, fy);
    });
  const zigzag = fc
    .record({
      d: directionArb,
      n: fc.integer({ min: 3, max: 40 }),
      a: scaleArb(1, Math.floor(base / (64 * 41))),
      t: fc.integer({ min: 1, max: 3 }),
      fx: posArb,
      fy: posArb,
    })
    .map(({ d, n, a, t, fx, fy }) => {
      const q = crossUnit(d);
      const dl = Math.max(Math.abs(d.x), Math.abs(d.y));
      const step = Math.max(a, Math.ceil((100 * t) / (n * dl)));
      const vs: Vec[] = [];
      for (let i = 0; i < n; i += 1) vs.push({ x: i * step * d.x + (i % 2) * t * q.x, y: i * step * d.y + (i % 2) * t * q.y });
      return fitIntoRange(vs, limit, fx, fy);
    });
  return fc.oneof(hairpin, zigzag);
}

/** Thin polygons (the default) or chains (§13.1 (1)); see the module comment. */
export function thin(opts: FuzzShapeOptions = {}): fc.Arbitrary<FuzzRing> {
  const limit = resolveLimit(opts.limitCm);
  return opts.shape === 'chain' ? thinChain(limit) : thinRing(limit);
}
