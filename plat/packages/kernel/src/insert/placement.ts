// The placement rule (§3.6 *The placement rule*, GEO-3, GEO-35, J-K17; §3.10's placement bound and clearance rows;
// §3.11's "the placement search within attractCm"). M0-a-04.
//
// Every new vertex on an existing edge — a split foot, a stretch's join or leave point, a crossing — is placed at the
// lattice point nearest its exact position among the points that (i) lie within 0.71 cm of the existing edge's route at
// the edge's own level (one index item: the run's straight segment between its two endpoints, §3.3), so the edge moves
// no more than its hot pixel; (ii) lie at least `minEdge` from the endpoints of the edge being split — the sub-edge of
// the run the point falls on — and, for a crossing, from the endpoints of the crossing segment; and (iii) keep every
// vertex and edge around the split at least `minEdge` from the new vertex and from every edge incident to it
// (clearance, checked in the index) — read as §3.10's clearance after the split, which includes the split sub-edge's
// own ends: once s and t are no longer joined, each must clear the edges at the other (`splitEndsBreachClearance`;
// where they cannot, no point of that sub-edge qualifies, C-0284); ties y then x. The search runs outward from the
// exact position, never beyond `attractCm`, and charges each candidate to `insert.placementCandidates` (a candidate
// that can only fall on such sub-edges is not tried). If no candidate qualifies, the incoming vertex moves onto the
// nearer endpoint of the edge (a crossing routes its segment through it). W_PLACED reports a point placed away from its
// nearest lattice point and an incoming vertex moved onto the endpoint. The fallback is reached on valid arenas (an
// acute corner within a vertex's one-ring can refuse every candidate under (iii); C-0170 (1), C-0284).
//
// Every distance test here uses + − × ÷ √ only (§3.2 (3)) — on lattice points `orient2d` and the dot products are exact
// integers, and a comparison is written without a division where it can be — so every IEEE engine decides alike.
// `placePoint` writes nothing: its result is a plan the writer that commits it (`splitThrough`, M0-a-05's crossings)
// applies and reports to the transaction. Readings: C-0169 (4), C-0284.
//
// The rule's parts are exported for the kernel's other placements (C-0316): `nearestLatticePoint` (the nearest of the
// four lattice points around an exact position, ties y then x), `placementCandidates` (the candidates in the order the
// rule tries them), `inSweptWedge` (the rotation-slot test) and `splitEndsBreachClearance` ((iii) at the split's own
// ends). The exact segment tests (`segmentCloserThan`, `segmentsMeet`) and the index's box bound are num/exact.ts's
// (C-0314).
import { isHalfEdgeLive, outgoing, type HalfEdgeId, type Plat, type VertexId } from '../arena/index.js';
import { HOT_PIXEL_CM, query, routeRun, type Box } from '../index/index.js';
import { BOX_RANGE, segmentCloserThan, segmentsMeet } from '../num/exact.js';
import { belowMinEdge, LATTICE, ok, orient2d, ratio, type KernelResult, type Warning } from '../num/index.js';
import type { Cm, LatticePoint } from '../types/index.js';
import { addWarning, charge, check, INSERT_ATTRACT_QUERIES, passOn, INSERT_PLACEMENT_CANDIDATES, workLimitHit, type InsertTx } from './classes.js';

export { segmentCloserThan } from '../num/exact.js';

/** 0.71²: test (i)'s hot pixel (§3.3's `HOT_PIXEL_CM`) squared, compared as orient² ≤ 0.71² · |AB|² (§3.2 (1), §3.6). */
export const HOT_PIXEL_SQ = HOT_PIXEL_CM * HOT_PIXEL_CM;

const MIN_EDGE = LATTICE.minEdgeCm;
const ATTRACT = LATTICE.attractCm;

/** A crossing's segment (§3.6 step 4): its two endpoints, which the placed point keeps `minEdge` from. */
export interface Crossing {
  readonly c: LatticePoint;
  readonly d: LatticePoint;
}

/** The placement rule's answer: a lattice point on a sub-edge of the run, or the fallback onto an endpoint. */
export type Placement =
  | {
    readonly kind: 'placed';
    readonly at: LatticePoint;
    /** The sub-edge it splits, directed along its run from the run's handle end (§3.3). */
    readonly sub: HalfEdgeId;
    /** Whether it is the lattice point nearest the exact position (else W_PLACED). */
    readonly nearest: boolean;
    /** Candidates tried (each charged to `insert.placementCandidates`). */
    readonly tried: number;
  }
  | {
    readonly kind: 'endpoint';
    /** The nearer endpoint of the sub-edge the exact position falls on (W_PLACED). */
    readonly vertex: VertexId;
    readonly tried: number;
  };

/** A point the rule tests: a vertex of the arena (its slot) or a crossing endpoint that is not one yet (−1). */
interface End {
  readonly x: number;
  readonly y: number;
  readonly vertex: VertexId;
}

/**
 * Would a split of the sub-edge s–t, at any point, leave s or t within `minEdge` of an edge outside its one-ring
 * (§3.10's clearance)? While s and t are joined each lies in the other's one-ring, so s may stand nearer than `minEdge`
 * to an edge at t — an acute corner, which `minFaceAngle` governs — and t to an edge at s. A split ends that exemption
 * (the new vertex, not t, is then s's neighbour), so s must clear every edge t–w whose far end w is not one of s's
 * neighbours, and t every such edge at s. The answer reads no candidate: where it is yes, no point of s–t qualifies
 * under (iii) and the placement falls back onto the nearer endpoint (C-0284). + − × only.
 */
export function splitEndsBreachClearance(p: Plat, s: VertexId, t: VertexId): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  for (const [x, y] of [[s, t], [t, s]] as const) {
    let ring: Set<VertexId> | null = null;
    for (const h of outgoing(p, y)) {
      const w = O[h ^ 1];
      if (w === x) continue;
      // x against the edge y–w: the edges at x's neighbours stay in its one-ring after the split.
      if (!segmentCloserThan(X[x], Y[x], X[y], Y[y], X[w], Y[w], MIN_EDGE)) continue;
      ring ??= new Set(outgoing(p, x).map((g) => O[g ^ 1]));
      if (!ring.has(w)) return true;
    }
  }
  return false;
}

/**
 * Is the direction e (from a vertex) inside the closed thin wedge swept when that vertex's edge turns from direction
 * `from` to direction `to` — the one slot of its rotation an edge may not stand in, or the embedding would change?
 * `from` and `to` differ by at most a few degrees (a split moves the route by its hot pixel). Along the new direction
 * counts as overlap (e collinear with `to`, pointing the same way: true, turn or no turn); else, where the direction
 * does not change (`from` and `to` collinear), nothing is swept (false); else true exactly when e lies strictly inside
 * the wedge between `from` and `to`. `orient2d` and + − × only.
 */
export function inSweptWedge(fx: number, fy: number, tx: number, ty: number, ex: number, ey: number): boolean {
  const turn = orient2d(0, 0, fx, fy, tx, ty);
  const onTo = orient2d(0, 0, tx, ty, ex, ey);
  if (onTo === 0 && tx * ex + ty * ey > 0) return true; // along the new direction: an overlap
  if (turn === 0) return false; // the direction does not change
  const a = orient2d(0, 0, fx, fy, ex, ey);
  return (turn > 0 && a > 0 && onTo < 0) || (turn < 0 && a < 0 && onTo > 0);
}

/**
 * The lattice point nearest the exact position (x, y): one of the four around it (`Math.floor` of each coordinate, and
 * one more), the nearest by squared distance, ties y then x (§3.6 *The placement rule*'s "nearest"). Never −0.
 */
export function nearestLatticePoint(x: number, y: number): { x: number; y: number } {
  const fx = Math.floor(x) + 0;
  const fy = Math.floor(y) + 0;
  let nx = fx;
  let ny = fy;
  let nd = Infinity;
  for (const [cx, cy] of [[fx, fy], [fx + 1, fy], [fx, fy + 1], [fx + 1, fy + 1]] as const) {
    const d = (cx - x) * (cx - x) + (cy - y) * (cy - y);
    if (d < nd || (d === nd && (cy < ny || (cy === ny && cx < nx)))) {
      nd = d;
      nx = cx;
      ny = cy;
    }
  }
  return { x: nx, y: ny };
}

/** A candidate of the placement rule: a lattice point, and whether it is the one nearest the exact position. */
export interface PlacementCandidate {
  readonly x: number;
  readonly y: number;
  readonly nearest: boolean;
}

/**
 * The placement rule's candidates for the exact position `exact` on the route a–b (the run's own-level route, §3.3), in
 * the order the rule tries them (§3.6): first the nearest lattice point (`nearestLatticePoint`), then every other lattice
 * point of the route's hot-pixel band (i) within `reach` of the exact position, nearest first, ties y then x. The band
 * is at most ⌈1.42 · |ab| ÷ max(|ux|, |uy|)⌉ + 1 ≤ 3 points across per column (row). Lazy: the band is enumerated only
 * when the nearest point is passed over, so a caller that stops at the first answer reads no more; the caller charges
 * each candidate it tries. The route spans at least `minEdge` (asserted when the band is enumerated).
 */
export function* placementCandidates(
  exact: { readonly x: number; readonly y: number },
  edge: { readonly a: { readonly x: number; readonly y: number }; readonly b: { readonly x: number; readonly y: number } },
  reach: number,
): Generator<PlacementCandidate, void, undefined> {
  const ax = edge.a.x;
  const ay = edge.a.y;
  const ux = edge.b.x - ax;
  const uy = edge.b.y - ay;
  const len2 = ux * ux + uy * uy;
  const first = nearestLatticePoint(exact.x, exact.y);
  yield { x: first.x, y: first.y, nearest: true };
  const candidates: { x: number; y: number; d: number }[] = [];
  const shallow = Math.abs(ux) >= Math.abs(uy);
  const along = shallow ? ux : uy;
  const across = shallow ? uy : ux;
  const slope = ratio(across, along, 'length');
  const half = ratio(HOT_PIXEL_CM * Math.sqrt(len2), Math.abs(along), 'length');
  check(slope.ok && half.ok, 'an edge spans at least minEdge');
  const e0 = shallow ? exact.x : exact.y;
  const a0 = shallow ? ax : ay;
  const b0 = shallow ? ay : ax;
  const reach2 = reach * reach;
  for (let i = Math.ceil(e0 - reach); i <= Math.floor(e0 + reach); i++) {
    const mid = b0 + (i - a0) * slope.value;
    for (let j = Math.ceil(mid - half.value); j <= Math.floor(mid + half.value); j++) {
      const qx = (shallow ? i : j) + 0; // never −0 (§3.2 (7)'s lattice)
      const qy = (shallow ? j : i) + 0;
      const d = (qx - exact.x) * (qx - exact.x) + (qy - exact.y) * (qy - exact.y);
      if (d > reach2 || (qx === first.x && qy === first.y)) continue;
      const o = orient2d(ax, ay, ax + ux, ay + uy, qx, qy);
      if (o * o > HOT_PIXEL_SQ * len2) continue;
      candidates.push({ x: qx, y: qy, d });
    }
  }
  candidates.sort((a, b) => a.d - b.d || a.y - b.y || a.x - b.x);
  for (const c of candidates) yield { x: c.x, y: c.y, nearest: false };
}

/**
 * §3.6's placement rule for a new vertex at the exact position `exact` (doubles) on the run of half-edge `edge` — and,
 * for a crossing, keeping `minEdge` from the crossing segment's endpoints. Reads the arena through the index (one
 * neighbourhood query at level 4, charged to `insert.attractQueries`) and the vertex rotations; writes nothing; reports
 * W_PLACED in its own result only (the writer that commits the placement reports it to the transaction). Refuses only
 * E_WORK_LIMIT.
 */
export function placePoint(tx: InsertTx, edge: HalfEdgeId, exact: { readonly x: number; readonly y: number }, crossing?: Crossing): KernelResult<Placement> {
  const p = tx.plat;
  check(isHalfEdgeLive(p, edge), `half-edge ${edge} is not live`);
  check(Number.isFinite(exact.x) && Number.isFinite(exact.y), 'an exact position is finite');
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  // The run (§3.3): its sub-edges from its handle end, its vertices in order, and its own-level route A–B.
  const run = routeRun(p, edge).halfEdges;
  const k = run.length;
  const V: VertexId[] = run.map((h) => O[h]);
  V.push(O[run[k - 1] ^ 1]);
  const ax = X[V[0]];
  const ay = Y[V[0]];
  const ux = X[V[k]] - ax;
  const uy = Y[V[k]] - ay;
  const len2 = ux * ux + uy * uy;
  const len = Math.sqrt(len2);
  // Projections along A–B as unnormalised dot products (exact integers for lattice points), increasing along the run.
  const tv = V.map((v) => (X[v] - ax) * ux + (Y[v] - ay) * uy);
  const tE = (exact.x - ax) * ux + (exact.y - ay) * uy;
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
  // The sub-edges a candidate (within attractCm of the exact position) can fall on, and the neighbourhood around them.
  const reach = ATTRACT * len;
  const jlo = subAt(tE - reach);
  const jhi = subAt(tE + reach) + 1;
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
  for (let j = jlo; j <= jhi; j++) grow(X[V[j]], Y[V[j]]);
  if (crossing !== undefined) {
    grow(crossing.c.x, crossing.c.y);
    grow(crossing.d.x, crossing.d.y);
  }
  const clamp = (v: number): number => Math.max(-BOX_RANGE, Math.min(BOX_RANGE, v));
  const box: Box = {
    minX: clamp(Math.floor(minX) - ATTRACT),
    minY: clamp(Math.floor(minY) - ATTRACT),
    maxX: clamp(Math.ceil(maxX) + ATTRACT),
    maxY: clamp(Math.ceil(maxY) + ATTRACT),
  };
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  const near = query(p, tx.key, 4, box, { vertices: true, edges: true });
  const verts = near.vertices;
  const edges: [VertexId, VertexId][] = near.edges.map((h) => [O[h], O[h ^ 1]]);
  const vertexAtPoint = (pt: LatticePoint): VertexId => {
    for (const v of verts) if (X[v] === pt.x && Y[v] === pt.y) return v;
    return -1;
  };
  const cEnd: End | null = crossing === undefined ? null : { x: crossing.c.x, y: crossing.c.y, vertex: vertexAtPoint(crossing.c) };
  const dEnd: End | null = crossing === undefined ? null : { x: crossing.d.x, y: crossing.d.y, vertex: vertexAtPoint(crossing.d) };
  const neighbours = new Map<VertexId, Set<VertexId>>();
  const nb = (v: VertexId): Set<VertexId> => {
    let s = neighbours.get(v);
    if (s === undefined) {
      s = new Set(outgoing(p, v).map((h) => O[h ^ 1]));
      neighbours.set(v, s);
    }
    return s;
  };
  // (iii) at the split sub-edge's own ends, per sub-edge (it reads no candidate).
  const endsBreak = new Map<number, boolean>();
  const breaks = (j: number): boolean => {
    let b = endsBreak.get(j);
    if (b === undefined) {
      b = splitEndsBreachClearance(p, V[j], V[j + 1]);
      endsBreak.set(j, b);
    }
    return b;
  };

  /** The sub-edge index a candidate qualifies on under (i) – (iii), or −1. */
  const qualifies = (qx: number, qy: number): number => {
    const tq = (qx - ax) * ux + (qy - ay) * uy;
    if (tq <= 0 || tq >= len2) return -1; // outside the run
    const o = orient2d(ax, ay, ax + ux, ay + uy, qx, qy);
    if (o * o > HOT_PIXEL_SQ * len2) return -1; // (i)
    const j = subAt(tq);
    const s = V[j];
    const t = V[j + 1];
    // (ii): minEdge from the split sub-edge's endpoints and, for a crossing, from the crossing segment's.
    if (belowMinEdge(qx, qy, X[s], Y[s]) || belowMinEdge(qx, qy, X[t], Y[t])) return -1;
    const ends: End[] = [{ x: X[s], y: Y[s], vertex: s }, { x: X[t], y: Y[t], vertex: t }];
    if (cEnd !== null && dEnd !== null) {
      if (belowMinEdge(qx, qy, cEnd.x, cEnd.y) || belowMinEdge(qx, qy, dEnd.x, dEnd.y)) return -1;
      ends.push(cEnd, dEnd);
    }
    // (iii) at the split's own ends: s and t, no longer joined, each clear the edges at the other.
    if (breaks(j)) return -1;
    const isEnd = (v: VertexId): boolean => {
      for (const e of ends) if (e.vertex === v) return true;
      return false;
    };
    const isSplit = (u: VertexId, w: VertexId): boolean => (u === s && w === t) || (u === t && w === s);
    // (iii) clearance (§3.10): every vertex at least minEdge from the new vertex …
    for (const w of verts) {
      if (isEnd(w)) continue;
      if (belowMinEdge(qx, qy, X[w], Y[w])) return -1;
    }
    // … the new vertex at least minEdge from every edge outside its one-ring (edges at its neighbours are inside) …
    for (const [u, w] of edges) {
      if (isSplit(u, w) || isEnd(u) || isEnd(w)) continue;
      if (segmentCloserThan(qx, qy, X[u], Y[u], X[w], Y[w], MIN_EDGE)) return -1;
    }
    // … every vertex at least minEdge from each new edge outside its one-ring (a new edge q–x is inside the one-ring of
    // x's neighbours), and no new edge crossing or overlapping an edge.
    for (const e of ends) {
      for (const w of verts) {
        if (isEnd(w) || (e.vertex >= 0 && nb(e.vertex).has(w))) continue;
        if (segmentCloserThan(X[w], Y[w], qx, qy, e.x, e.y, MIN_EDGE)) return -1;
      }
      for (const [u, w] of edges) {
        if (isSplit(u, w)) continue;
        if (e.vertex >= 0 && (u === e.vertex || w === e.vertex)) {
          const other = u === e.vertex ? w : u;
          const ox = X[other] - e.x;
          const oy = Y[other] - e.y;
          if (orient2d(e.x, e.y, qx, qy, X[other], Y[other]) === 0 && ox * (qx - e.x) + oy * (qy - e.y) > 0) return -1;
          continue;
        }
        // An edge the crossing segment already meets elsewhere is another crossing of that segment — step 4 places it
        // in its turn — not one this placement creates (C-0169 (4)).
        if ((e === cEnd || e === dEnd) && cEnd !== null && dEnd !== null && segmentsMeet(cEnd.x, cEnd.y, dEnd.x, dEnd.y, X[u], Y[u], X[w], Y[w])) continue;
        if (segmentsMeet(qx, qy, e.x, e.y, X[u], Y[u], X[w], Y[w])) return -1;
      }
    }
    // The rotation slots at the split's endpoints: no edge stands in the wedge the split sub-edge sweeps there.
    for (const [x, other] of [[s, t], [t, s]] as const) {
      const fx = X[other] - X[x];
      const fy = Y[other] - Y[x];
      const gx = qx - X[x];
      const gy = qy - Y[x];
      for (const h of outgoing(p, x)) {
        const w = O[h ^ 1];
        if (w === other) continue;
        if (inSweptWedge(fx, fy, gx, gy, X[w] - X[x], Y[w] - Y[x])) return -1;
      }
    }
    return j;
  };

  const warnings: Warning[] = [];
  let tried = 0;
  const tryOne = (qx: number, qy: number): KernelResult<number> => {
    tried += 1;
    if (!charge(tx, INSERT_PLACEMENT_CANDIDATES, 1)) return workLimitHit(INSERT_PLACEMENT_CANDIDATES);
    return ok(qualifies(qx, qy));
  };
  const placed = (qx: number, qy: number, j: number, nearest: boolean): KernelResult<Placement> => {
    const at = { x: qx as Cm, y: qy as Cm };
    if (!nearest) addWarning(warnings, 'W_PLACED', at);
    return ok({ kind: 'placed', at, sub: run[j], nearest, tried }, warnings);
  };
  // No candidate qualifies: the nearer endpoint of the sub-edge the exact position falls on (ties y then x).
  const fallback = (): KernelResult<Placement> => {
    const j = subAt(Math.max(0, Math.min(len2, tE)));
    const s = V[j];
    const t = V[j + 1];
    const ds = (X[s] - exact.x) * (X[s] - exact.x) + (Y[s] - exact.y) * (Y[s] - exact.y);
    const dt = (X[t] - exact.x) * (X[t] - exact.x) + (Y[t] - exact.y) * (Y[t] - exact.y);
    const vertex = ds < dt || (ds === dt && (Y[s] < Y[t] || (Y[s] === Y[t] && X[s] < X[t]))) ? s : t;
    addWarning(warnings, 'W_PLACED', { x: X[vertex], y: Y[vertex] } as LatticePoint);
    return ok({ kind: 'endpoint', vertex, tried }, warnings);
  };
  // Every candidate (within attractCm, so on a sub-edge between jlo and jhi) falls on a sub-edge whose ends cannot clear
  // each other's edges once split: none can qualify, so none is tried (the answer is the fallback either way).
  let splittable = false;
  for (let j = Math.max(0, jlo - 1); j <= Math.min(k - 1, jhi) && !splittable; j++) splittable = !breaks(j);
  if (!splittable) return fallback();

  // The nearest lattice point first — it qualifies almost always (§3.6) — then outward from the exact position within
  // attractCm along the hot-pixel band around A–B, each candidate charged as it is tried.
  for (const c of placementCandidates(exact, { a: { x: ax, y: ay }, b: { x: X[V[k]], y: Y[V[k]] } }, ATTRACT)) {
    const r = tryOne(c.x, c.y);
    if (!r.ok) return passOn(r);
    if (r.value >= 0) return placed(c.x, c.y, r.value, c.nearest);
  }
  return fallback();
}
