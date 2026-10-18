// arb.nearCollinear (M0-k-01; §13.1 (1) near-collinear polygons and chains). On an edge ab = g·d (d primitive), the
// lattice points at cross t from the line ab lie on a parallel line t / |d| cm away, one every |d| along it
// (lattice.ts's `crossUnit`); the generator inserts such a point v, t = 1 or 2, whose projection falls strictly inside
// ab — so a, v, b are near-collinear: v stands 0 < t / |d| ≤ 2 cm off the line through its neighbours. Rings: a star
// ring of 4–24 vertices whose chosen edges each take one such vertex on their inner side, kept only where v lies strictly inside the fan
// triangle (a, b, c) — so the ring stays simple and star-shaped. Chains: a walk with long steps, each chosen step
// taking one such vertex on either side.
import fc from 'fast-check';
import type { LatticePoint } from '@plat/kernel';
import { strictlyInside } from './holed.js';
import { walkArb } from './chain.js';
import { RADIUS_PER_VERTEX, starArb } from './polygon.js';
import { LIMIT_CM, crossUnit, floorDiv, place, posArb, primitive, pt, resolveLimit } from './lattice.js';
import type { FuzzChain, FuzzRing, FuzzShapeOptions } from './types.js';

/** One insertion's draw: whether the edge takes a vertex, its side and offset t, and its place along the edge. */
const insertRowArb = fc.record({ on: fc.boolean(), t: fc.integer({ min: 1, max: 2 }), left: fc.boolean(), at: posArb });

type InsertRow = { on: boolean; t: number; left: boolean; at: number };

/**
 * The lattice point at cross t (signed: t > 0 left of a → b) from the line ab whose projection lies strictly inside
 * the segment, at fraction `at` of the valid ones; null when there is none (an axis-parallel unit step, say) or when it
 * falls outside snap's range.
 */
export function nearPoint(a: LatticePoint, b: LatticePoint, t: number, at: number): LatticePoint | null {
  const e = { x: b.x - a.x, y: b.y - a.y };
  if (e.x === 0 && e.y === 0) return null;
  const { d, g } = primitive(e);
  const q = crossUnit(d);
  // v = a + t·q + k·d; its projection parameter along d is (t·q·d + k·|d|²) / |d|², which must lie in (0, g).
  const qd = t * (q.x * d.x + q.y * d.y);
  const dd = d.x * d.x + d.y * d.y;
  const kMin = floorDiv(-qd, dd) + 1;
  const kMax = -floorDiv(qd - g * dd, dd) - 1; // ⌈(g·dd − qd) / dd⌉ − 1
  if (kMin > kMax) return null;
  const k = place(kMin, kMax, at);
  const x = a.x + t * q.x + k * d.x;
  const y = a.y + t * q.y + k * d.y;
  // Beside an edge on the range's border the point can fall outside it: none then.
  return Math.abs(x) <= LIMIT_CM && Math.abs(y) <= LIMIT_CM ? pt(x, y) : null;
}

/** Rings: a star ring with near-collinear vertices on chosen edges; at least one inserted. */
function nearRing(limit: number): fc.Arbitrary<FuzzRing> {
  const star = starArb({ vertices: [4, 24], radiusShare: [300, 1000], jitter: [100, 900], size: [1, Math.min(4_194_304, limit)], limit, radiusPerVertex: RADIUS_PER_VERTEX });
  return fc
    .record({ star, rows: fc.array(insertRowArb, { minLength: 24, maxLength: 24 }) })
    .map(({ star: s, rows }) => {
      const ring = s.ring;
      const n = ring.length;
      const out: LatticePoint[] = [];
      let inserted = 0;
      for (let i = 0; i < n; i += 1) {
        const a = ring[i];
        const b = ring[(i + 1) % n];
        out.push(a);
        const row: InsertRow = rows[i % rows.length];
        if (!row.on && !(i === n - 1 && inserted === 0)) continue;
        const v = nearPoint(a, b, row.t, row.at);
        if (v !== null && strictlyInside(a, b, s.centre, v)) {
          out.push(v);
          inserted += 1;
        }
      }
      return inserted === 0 ? null : out;
    })
    .filter((r): r is FuzzRing => r !== null);
}

/** Chains: a walk of 2–20 vertices with steps of 10 m – 655 m, near-collinear vertices on chosen steps. */
function nearChain(limit: number): fc.Arbitrary<FuzzChain> {
  return fc
    .record({ walk: walkArb([2, 20], [1_000, Math.min(65_536, Math.floor(limit / 20))], limit), rows: fc.array(insertRowArb, { minLength: 20, maxLength: 20 }) })
    .map(({ walk, rows }) => {
      const out: LatticePoint[] = [walk[0]];
      let inserted = 0;
      for (let i = 0; i + 1 < walk.length; i += 1) {
        const a = walk[i];
        const b = walk[i + 1];
        const row = rows[i];
        if (row.on || (i + 2 === walk.length && inserted === 0)) {
          const v = nearPoint(a, b, row.left ? row.t : -row.t, row.at);
          // The chain's coordinates must stay inside the range: v is within 2 cm of ab, which is inside it.
          if (v !== null && Math.abs(v.x) <= limit && Math.abs(v.y) <= limit) {
            out.push(v);
            inserted += 1;
          }
        }
        out.push(b);
      }
      return inserted === 0 ? null : out;
    })
    .filter((c): c is FuzzChain => c !== null);
}

/** Near-collinear polygons (the default) or chains (§13.1 (1)); see the module comment. */
export function nearCollinear(opts: FuzzShapeOptions = {}): fc.Arbitrary<FuzzRing> {
  const limit = resolveLimit(opts.limitCm);
  return opts.shape === 'chain' ? nearChain(limit) : nearRing(limit);
}

