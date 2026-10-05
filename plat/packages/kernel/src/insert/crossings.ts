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
//
// The step across a sliver (N-42 (a), C-0207): two consecutive crossings closer than `minEdge` whose crossed pieces share
// no end — two edges of one acute corner bridged by a short edge, a sliver between them narrower than `minEdge` where
// the segment meets it — leave the placement rule no point for the first crossing, because (iii) reads the second
// crossed edge, not yet joined to it, as outside the new vertex's one-ring; its fallback then lands the crossing on the
// sub-edge's nearer endpoint however far along the edge that is. `placeAcross` is the router's last-resort placement
// for that first crossing: the placement rule's tests with the second crossed sub-edge left out of (iii), because the
// router joins the new vertex to the second crossing, placed in its turn at least `minEdge` away under (ii), so both its
// sub-edges lie in the new vertex's one-ring (§3.10) — N-38's "a step across the sliver". Every route through it is
// checked whole for §3.10's clearance before it commits (insertChain's `routeSegment`).
import { outgoing, type HalfEdgeId, type VertexId } from '../arena/index.js';
import { HOT_PIXEL_CM, query, routeRun, type Box } from '../index/index.js';
import { belowMinEdge, LATTICE, ok, orient2d, ratio, type KernelResult, type Warning } from '../num/index.js';
import type { Cm } from '../types/index.js';
import { charge, check, INSERT_ATTRACT_QUERIES, INSERT_PLACEMENT_CANDIDATES, passOn, workLimitHit } from './classes.js';
import { segmentsMeet } from './decimate.js';
import { HOT_PIXEL_SQ, segmentCloserThan } from './placement.js';
import { footOnSegment, nearerVertex, pieceOf, routeBetween, segmentBox, splitBreaksClearance, type ChainCtx, type Landing, type Piece } from './stretch.js';

/** M0.md §2.2's work-limit counter of step 4 (unit `vertices`): one per crossing resolved (placed or wedge-routed). */
export const INSERT_CROSSINGS = 'insert.crossings';

const MIN_EDGE = LATTICE.minEdgeCm;
const MIN_EDGE_SQ = LATTICE.minEdgeCm * LATTICE.minEdgeCm;
const ATTRACT = LATTICE.attractCm;
const ATTRACT_SQ = LATTICE.attractCm * LATTICE.attractCm;
/** A query box's coordinates stay within ±2²⁴ (the index's bound). */
const BOX_RANGE = 16_777_216;

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

// ---- the step across a sliver (N-42 (a), C-0207) -------------------------------------------------------------------------

/**
 * The physical sub-edge of a route piece that holds the exact position (x, y) on it, as its two end vertices (by the
 * position's projection along the piece; the last sub-edge for a position beyond it).
 */
function subEdgeAt(ctx: ChainCtx, pc: Piece, x: number, y: number): readonly [VertexId, VertexId] | null {
  const p = ctx.p;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const path = routeBetween(p, pc.a, pc.b, ctx.n);
  if (path === null) return null;
  const vs = path.map((h) => O[h]);
  vs.push(O[path[path.length - 1] ^ 1]);
  const ux = X[pc.b] - X[pc.a];
  const uy = Y[pc.b] - Y[pc.a];
  const tq = (x - X[pc.a]) * ux + (y - Y[pc.a]) * uy;
  let i = 0;
  while (i + 2 < vs.length && (X[vs[i + 1]] - X[pc.a]) * ux + (Y[vs[i + 1]] - Y[pc.a]) * uy <= tq) i += 1;
  return [vs[i], vs[i + 1]];
}

/**
 * The crossing after `c` along the segment a → b when it lies closer than `minEdge` to c on another piece — the far side
 * of a sliver the segment crosses — or null. One index query (`exactCrossings`). Nothing written.
 */
export function sliverPartner(ctx: ChainCtx, a: VertexId, b: VertexId, c: ExactCrossing): KernelResult<ExactCrossing | null> {
  const all = exactCrossings(ctx, a, b);
  if (!all.ok) return passOn(all);
  const cs = all.value;
  const i = cs.findIndex((x) => x.edge === c.edge && x.t === c.t);
  if (i < 0 || i + 1 >= cs.length) return ok(null);
  const d = cs[i + 1];
  if (d.piece.edge === c.piece.edge) return ok(null);
  const gx = d.x - c.x;
  const gy = d.y - c.y;
  return ok(gx * gx + gy * gy < MIN_EDGE_SQ ? d : null);
}

/** Is the direction e (from a vertex) inside the thin wedge an edge sweeps turning from `from` to `to` (as the placement rule's test)? */
function inSweptWedge(fx: number, fy: number, tx: number, ty: number, ex: number, ey: number): boolean {
  const turn = orient2d(0, 0, fx, fy, tx, ty);
  const onTo = orient2d(0, 0, tx, ty, ex, ey);
  if (onTo === 0 && tx * ex + ty * ey > 0) return true;
  if (turn === 0) return false;
  const o = orient2d(0, 0, fx, fy, ex, ey);
  return (turn > 0 && o > 0 && onTo < 0) || (turn < 0 && o < 0 && onTo > 0);
}

/**
 * `placeAcross` (N-42 (a), C-0207; see the module comment): the first crossing `first` of the segment a → b, whose next
 * crossing `second` lies closer than `minEdge` on another piece, placed by the placement rule's tests (§3.6) with the
 * sub-edge holding `second` left out of (iii): (i) within 0.71 cm of the crossed run's own-level route; (ii) at least
 * `minEdge` from the split sub-edge's ends and from a and b; (iii) every vertex at least `minEdge` from it and from each
 * new edge to those four ends, it at least `minEdge` from every other edge but those at a or b, no new edge crossing or
 * overlapping an edge (an edge the segment a → b already meets is another crossing of it), and no edge in the wedge the
 * split sub-edge sweeps at its ends; the nearest qualifying lattice point within `attractCm` of the exact position (ties
 * y then x), each charged to `insert.placementCandidates`. Always reported W_PLACED: a commit through this route is a
 * fallback (N-40). Null when no point qualifies or the split would break clearance at the sub-edge's ends (as
 * `planLanding`). Nothing written; refuses only E_WORK_LIMIT.
 */
export function placeAcross(ctx: ChainCtx, a: VertexId, b: VertexId, first: ExactCrossing, second: ExactCrossing): KernelResult<Landing | null> {
  const { tx, p } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const partner = subEdgeAt(ctx, second.piece, second.x, second.y);
  if (partner === null) return ok(null);
  const [u2, w2] = partner;
  // The crossed run, its vertices from its handle end, and its own-level route A–B (as the placement rule reads it).
  const run = routeRun(p, first.piece.edge).halfEdges;
  const k = run.length;
  const V: VertexId[] = run.map((h) => O[h]);
  V.push(O[run[k - 1] ^ 1]);
  const ax = X[V[0]];
  const ay = Y[V[0]];
  const ux = X[V[k]] - ax;
  const uy = Y[V[k]] - ay;
  const len2 = ux * ux + uy * uy;
  const tv = V.map((v) => (X[v] - ax) * ux + (Y[v] - ay) * uy);
  const subAt = (t: number): number => {
    let lo = 0;
    let hi = k - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >>> 1;
      if (tv[mid] <= t) lo = mid;
      else hi = mid - 1;
    }
    return lo;
  };
  const exact = footOnSegment(ax, ay, ax + ux, ay + uy, first.x, first.y);
  // The neighbourhood: the candidates' reach, the sub-edges they can fall on, and the segment's two ends.
  const tE = (exact.x - ax) * ux + (exact.y - ay) * uy;
  const reach = ATTRACT * Math.sqrt(len2);
  let minX = exact.x - ATTRACT;
  let minY = exact.y - ATTRACT;
  let maxX = exact.x + ATTRACT;
  let maxY = exact.y + ATTRACT;
  const grow = (x: number, y: number): void => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  };
  for (let j = subAt(tE - reach); j <= subAt(tE + reach) + 1; j++) grow(X[V[j]], Y[V[j]]);
  grow(X[a], Y[a]);
  grow(X[b], Y[b]);
  const clamp = (v: number): number => Math.max(-BOX_RANGE, Math.min(BOX_RANGE, v));
  const box: Box = { minX: clamp(Math.floor(minX) - ATTRACT), minY: clamp(Math.floor(minY) - ATTRACT), maxX: clamp(Math.ceil(maxX) + ATTRACT), maxY: clamp(Math.ceil(maxY) + ATTRACT) };
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  const near = query(p, tx.key, 4, box, { vertices: true, edges: true });
  const verts = near.vertices;
  const edges: [VertexId, VertexId][] = near.edges.map((h) => [O[h], O[h ^ 1]]);
  const nbs = new Map<VertexId, Set<VertexId>>();
  const nb = (v: VertexId): Set<VertexId> => {
    let set = nbs.get(v);
    if (set === undefined) {
      set = new Set(outgoing(p, v).map((h) => O[h ^ 1]));
      nbs.set(v, set);
    }
    return set;
  };
  const meetsSegment = (u: VertexId, w: VertexId): boolean => segmentsMeet(X[a], Y[a], X[b], Y[b], X[u], Y[u], X[w], Y[w]);

  const qualifies = (qx: number, qy: number): number => {
    const tq = (qx - ax) * ux + (qy - ay) * uy;
    if (tq <= 0 || tq >= len2) return -1;
    const o = orient2d(ax, ay, ax + ux, ay + uy, qx, qy);
    if (o * o > HOT_PIXEL_SQ * len2) return -1; // (i)
    const j = subAt(tq);
    const s = V[j];
    const t = V[j + 1];
    const ends = [s, t, a, b];
    for (const e of ends) if (belowMinEdge(qx, qy, X[e], Y[e])) return -1; // (ii)
    const isEnd = (v: VertexId): boolean => v === s || v === t || v === a || v === b;
    const isSplit = (u: VertexId, w: VertexId): boolean => (u === s && w === t) || (u === t && w === s);
    const isPartner = (u: VertexId, w: VertexId): boolean => (u === u2 && w === w2) || (u === w2 && w === u2);
    // (iii): every vertex at least minEdge from the new vertex …
    for (const w of verts) if (!isEnd(w) && belowMinEdge(qx, qy, X[w], Y[w])) return -1;
    // … the new vertex at least minEdge from every edge outside its one-ring — the second crossed sub-edge joins it
    // through the second crossing …
    for (const [u, w] of edges) {
      if (isSplit(u, w) || isEnd(u) || isEnd(w) || isPartner(u, w)) continue;
      if (segmentCloserThan(qx, qy, X[u], Y[u], X[w], Y[w], MIN_EDGE)) return -1;
    }
    // … every vertex at least minEdge from each new edge outside its one-ring, and no new edge crossing or overlapping.
    for (const e of ends) {
      for (const w of verts) {
        if (isEnd(w) || nb(e).has(w)) continue;
        if (segmentCloserThan(X[w], Y[w], qx, qy, X[e], Y[e], MIN_EDGE)) return -1;
      }
      for (const [u, w] of edges) {
        if (isSplit(u, w)) continue;
        if (u === e || w === e) {
          const other = u === e ? w : u;
          if (orient2d(X[e], Y[e], qx, qy, X[other], Y[other]) === 0 && (X[other] - X[e]) * (qx - X[e]) + (Y[other] - Y[e]) * (qy - Y[e]) > 0) return -1;
          continue;
        }
        if ((e === a || e === b) && meetsSegment(u, w)) continue;
        if (segmentsMeet(qx, qy, X[e], Y[e], X[u], Y[u], X[w], Y[w])) return -1;
      }
    }
    // The rotation slots at the split's ends.
    for (const [x, other] of [[s, t], [t, s]] as const) {
      for (const h of outgoing(p, x)) {
        const w = O[h ^ 1];
        if (w === other) continue;
        if (inSweptWedge(X[other] - X[x], Y[other] - Y[x], qx - X[x], qy - Y[x], X[w] - X[x], Y[w] - Y[x])) return -1;
      }
    }
    return j;
  };

  // The lattice points of the hot-pixel band within attractCm of the exact position, nearest first (ties y then x).
  const shallow = Math.abs(ux) >= Math.abs(uy);
  const along = shallow ? ux : uy;
  const slope = ratio(shallow ? uy : ux, along, 'length');
  const half = ratio(HOT_PIXEL_CM * Math.sqrt(len2), Math.abs(along), 'length');
  check(slope.ok && half.ok, 'an edge spans at least minEdge');
  const e0 = shallow ? exact.x : exact.y;
  const a0 = shallow ? ax : ay;
  const b0 = shallow ? ay : ax;
  const candidates: { x: number; y: number; d: number }[] = [];
  for (let i = Math.ceil(e0 - ATTRACT); i <= Math.floor(e0 + ATTRACT); i++) {
    const mid = b0 + (i - a0) * slope.value;
    for (let j = Math.ceil(mid - half.value); j <= Math.floor(mid + half.value); j++) {
      const qx = (shallow ? i : j) + 0;
      const qy = (shallow ? j : i) + 0;
      const d = (qx - exact.x) * (qx - exact.x) + (qy - exact.y) * (qy - exact.y);
      if (d <= ATTRACT_SQ) candidates.push({ x: qx, y: qy, d });
    }
  }
  candidates.sort((u, v) => u.d - v.d || u.y - v.y || u.x - v.x);
  for (const c of candidates) {
    if (!charge(tx, INSERT_PLACEMENT_CANDIDATES, 1)) return workLimitHit(INSERT_PLACEMENT_CANDIDATES);
    const j = qualifies(c.x, c.y);
    if (j < 0) continue;
    const sub = run[j];
    if (splitBreaksClearance(p, O[sub], O[sub ^ 1])) return ok(null);
    const at = { x: c.x as Cm, y: c.y as Cm };
    const warnings: Warning[] = [{ code: 'W_PLACED', count: 1, at }];
    return ok({ kind: 'split', plan: { kind: 'new', at, sub, row: null, warnings }, warnings });
  }
  return ok(null);
}
