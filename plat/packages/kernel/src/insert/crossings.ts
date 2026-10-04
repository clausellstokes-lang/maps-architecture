// Insertion step 4 — exact crossings (§3.6 *Attraction*, step 4; *The placement rule*; GEO-3, GEO-35, J-K17). M0-a-05.
//
// After step 3 has routed a segment through every vertex it passes within `attractCm` and along every stretch it shares,
// the crossings that remain are computed exactly — the orientation signs of the segment and each level-n route piece,
// exact on lattice points — and the first one along the segment is placed by the placement rule on the crossed run: the
// lattice point nearest the exact crossing within 0.71 cm of the run's own-level route, at least `minEdge` from the
// split sub-edge's endpoints and from the crossing segment's endpoints, keeping clearance (`placePoint`), or the
// placement's fallback, the nearer endpoint of the sub-edge, through which the segment is then routed. Two consecutive
// crossings closer than `minEdge` lie on the two arms of an acute corner (the clearance invariant forbids any other way
// for two edges to come that close) and are resolved at that corner by wedge routing (wedge.ts), never by cutting a
// sliver off its tip. A crossing closer than `minEdge` to the segment's own end is the same corner: that end lies on one
// arm (it stands within `minEdge` of the crossed edge, which clearance allows only where an end of the crossed sub-edge
// is its neighbour — the corner) and the crossing on the other, so the segment is routed through the corner too, never
// bent along the crossed edge to a point that keeps `minEdge` from its end (C-0177 (5)). Each crossing resolved is
// charged to `insert.crossings`. The segment is then re-routed through the placed vertex — iterated snap rounding
// (snapRound.ts). Readings: C-0177 (5).
import { outgoing, type HalfEdgeId, type VertexId } from '../arena/index.js';
import { query } from '../index/index.js';
import { LATTICE, ok, orient2d, ratio, type KernelResult } from '../num/index.js';
import { charge, check, INSERT_ATTRACT_QUERIES, passOn, workLimitHit } from './classes.js';
import { nearerVertex, pieceOf, routeBetween, segmentBox, type ChainCtx, type Piece } from './stretch.js';

/** M0.md §2.2's work-limit counter of step 4 (unit `vertices`): one per crossing resolved (placed or wedge-routed). */
export const INSERT_CROSSINGS = 'insert.crossings';

const MIN_EDGE_SQ = LATTICE.minEdgeCm * LATTICE.minEdgeCm;

/** One exact crossing of a segment with a level-n route piece: its parameter along the segment and its point. */
export interface ExactCrossing {
  readonly piece: Piece;
  /** The crossed piece's sub-edge the index names it by. */
  readonly edge: HalfEdgeId;
  readonly t: number;
  readonly x: number;
  readonly y: number;
}

/**
 * The first crossing of a segment, or the wedge it meets: two crossings closer than `minEdge` on two arms of a corner, or
 * one crossing closer than `minEdge` to the segment's own end, which lies on the corner's other arm (`second` null).
 */
export type FirstCrossing =
  | { readonly kind: 'crossing'; readonly crossing: ExactCrossing }
  | { readonly kind: 'wedge'; readonly corner: VertexId; readonly first: ExactCrossing; readonly second: ExactCrossing | null };

/** Do two strict signs differ (one positive, one negative)? */
function opposite(a: number, b: number): boolean {
  return (a > 0 && b < 0) || (a < 0 && b > 0);
}

/**
 * The proper crossings of the segment a → b with the level-n route pieces (its interior meets each piece's interior at
 * one point, the four orientations strict), sorted by their parameter along the segment. Pieces at a or b are skipped
 * (a segment meets an edge at its own end only there). One index query, charged to `insert.attractQueries`.
 */
export function exactCrossings(ctx: ChainCtx, a: VertexId, b: VertexId): KernelResult<ExactCrossing[]> {
  const { tx, p, n } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const ax = X[a];
  const ay = Y[a];
  const bx = X[b];
  const by = Y[b];
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  const out: ExactCrossing[] = [];
  for (const h of query(p, tx.key, n, segmentBox(ax, ay, bx, by, 1), { edges: true }).edges) {
    const pc = pieceOf(p, h, n);
    if (pc.a === a || pc.a === b || pc.b === a || pc.b === b) continue;
    const ux = X[pc.a];
    const uy = Y[pc.a];
    const wx = X[pc.b];
    const wy = Y[pc.b];
    const o1 = orient2d(ux, uy, wx, wy, ax, ay);
    const o2 = orient2d(ux, uy, wx, wy, bx, by);
    const o3 = orient2d(ax, ay, bx, by, ux, uy);
    const o4 = orient2d(ax, ay, bx, by, wx, wy);
    if (!opposite(o1, o2) || !opposite(o3, o4)) continue;
    const t = ratio(o1, o1 - o2, 'area');
    check(t.ok, 'a proper crossing has a non-zero denominator');
    out.push({ piece: pc, edge: h, t: t.value, x: ax + t.value * (bx - ax), y: ay + t.value * (by - ay) });
  }
  // By parameter; two pieces never cross the segment at one point (they would share a vertex there, on the segment,
  // which step 3 routes through), so the order is total — ties fall back on the pieces' lattice ends for safety.
  out.sort((u, v) => u.t - v.t || Y[u.piece.a] - Y[v.piece.a] || X[u.piece.a] - X[v.piece.a] || Y[u.piece.b] - Y[v.piece.b] || X[u.piece.b] - X[v.piece.b]);
  return ok(out);
}

/**
 * The corner beside the segment's end v where a crossing c of the piece `pc` lies closer than `minEdge` to v: the end of
 * the crossed physical sub-edge holding c that is a neighbour of v (the nearer to c when both are; ties y then x), or −1
 * when neither is (clearance forbids it on a valid arena: the crossing is then placed as any other).
 */
function cornerBeside(ctx: ChainCtx, pc: Piece, c: ExactCrossing, v: VertexId): VertexId {
  const p = ctx.p;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const path = routeBetween(p, pc.a, pc.b, ctx.n);
  if (path === null) return -1;
  const vs = path.map((h) => O[h]);
  vs.push(O[path[path.length - 1] ^ 1]);
  const ux = X[pc.b] - X[pc.a];
  const uy = Y[pc.b] - Y[pc.a];
  const tc = (c.x - X[pc.a]) * ux + (c.y - Y[pc.a]) * uy;
  let i = 0;
  while (i + 2 < vs.length && (X[vs[i + 1]] - X[pc.a]) * ux + (Y[vs[i + 1]] - Y[pc.a]) * uy <= tc) i += 1;
  const s = vs[i];
  const t = vs[i + 1];
  const nb = new Set<VertexId>(outgoing(p, v).map((h) => O[h ^ 1]));
  if (nb.has(s) && nb.has(t)) return nearerVertex(p, s, t, c.x, c.y);
  return nb.has(s) ? s : nb.has(t) ? t : -1;
}

/**
 * `resolveCrossings` (§3.6 step 4) on the segment a → b: its first exact crossing, or a wedge — the first crossing closer
 * than `minEdge` to a, or the last closer than `minEdge` to b (that end on one arm of a corner, the crossing on the
 * other: the corner beside it), or the next crossing closer than `minEdge` along the segment with the two crossed pieces
 * sharing an end (the arrangement's acute corner) — routed through by wedge.ts; null when the segment crosses nothing.
 * Charges one `insert.crossings` per crossing it resolves. Nothing written.
 */
export function resolveCrossings(ctx: ChainCtx, a: VertexId, b: VertexId): KernelResult<FirstCrossing | null> {
  const all = exactCrossings(ctx, a, b);
  if (!all.ok) return passOn(all);
  const cs = all.value;
  if (cs.length === 0) return ok(null);
  if (!charge(ctx.tx, INSERT_CROSSINGS, 1)) return workLimitHit(INSERT_CROSSINGS);
  const first = cs[0];
  const X = ctx.p.vertices.x;
  const Y = ctx.p.vertices.y;
  const near = (c: ExactCrossing, v: VertexId): boolean => (c.x - X[v]) * (c.x - X[v]) + (c.y - Y[v]) * (c.y - Y[v]) < MIN_EDGE_SQ;
  if (near(first, a)) {
    const k = cornerBeside(ctx, first.piece, first, a);
    if (k >= 0) return ok({ kind: 'wedge', corner: k, first, second: null });
  }
  const last = cs[cs.length - 1];
  if (near(last, b)) {
    const k = cornerBeside(ctx, last.piece, last, b);
    if (k >= 0) return ok({ kind: 'wedge', corner: k, first: last, second: null });
  }
  if (cs.length >= 2) {
    const second = cs[1];
    const gx = second.x - first.x;
    const gy = second.y - first.y;
    if (gx * gx + gy * gy < MIN_EDGE_SQ) {
      const f = first.piece;
      const s = second.piece;
      const corner = f.a === s.a || f.a === s.b ? f.a : f.b === s.a || f.b === s.b ? f.b : -1;
      if (corner >= 0) return ok({ kind: 'wedge', corner, first, second });
    }
  }
  return ok({ kind: 'crossing', crossing: first });
}
