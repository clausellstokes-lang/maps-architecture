// Iterated snap rounding and the router (§3.6 *Attraction*, steps 3 – 4; *The placement rule*; *Existing geometry
// wins*; §3.10's minEdge, clearance, one-vertex-per-lattice-point, no-two-edges-cross and face-corner rows). M0-a-05.
//
// `snapRound` routes one chain segment between two arena vertices of level ≤ n. Step 3 first: the segment's first
// contact — a vertex it passes within `attractCm`, a shared stretch, a collapsed stretch's contact point — splits it into
// two segments routed in turn; then step 4: its first exact crossing is placed by the placement rule (or resolved at an
// acute corner by wedge routing) and the segment is re-routed through the placed vertex. A placed crossing bends the
// segment by under a centimetre; the bent piece before it is re-checked, and a bent piece that meets something new is
// the next pass of the iterated snap rounding (≤ 3 passes; a segment still re-routing after the third commits — every
// pass is planar, because every edge is checked before it is written — and reports W_SNAP_PASSES). When no contact
// and no crossing is left, the segment is written as one new edge of the batch's level, after the hard rows it must keep
// are checked (no crossing, no overlap, `minEdge`, clearance) and the kept-content rule (finer geometry is an obstacle,
// §3.3; E_KEPT), with the face corners it makes (below `minFaceAngle`: W_ACUTE_CORNER for a mandatory chain,
// E_BELOW_MIN_ANGLE for an optional one, §3.6 *Chain classes*). A segment between two vertices a level-n route piece
// already joins is that piece, shared (its edges gain the chain's rows, W_STRETCH_SHARED). A vertex that stands closer
// than `minEdge` to another vertex it is not joined to — possible only inside an acute corner, where clearance's one-ring
// lets two vertices sharing their neighbours come that close — takes no new edge (any edge there would break clearance):
// the chain leaves or reaches it along an existing edge (C-0177 (7)). Each segment's route is checked for clearance as
// it is written, with a strict route and a route along existing edges as its fallbacks (insertChain's `routeSegment`,
// `routeAlongExisting` here) and, last, a route with every crossing on the placement's endpoint fallback (N-37, N-40:
// every such commit reports W_PLACED) and after it a route that places a crossing on the near side of a sliver across
// it (N-42 (a), C-0207: crossings.ts `placeAcross`, W_PLACED). A mandatory chain is wedge-routed only where the move is
// at most 2 · √2 · `attractCm` (N-38 as amended by N-40; `wedgeOutcome`). Readings: C-0177 (1), (2), (5) – (7), (13);
// C-0202; C-0207.
import {
  addRole,
  allocEdgePair,
  edgeLevel,
  freeEdgePair,
  removeRoleRow,
  faceWalk,
  handleOf,
  outgoing,
  pointOf,
  roleIdOf,
  rowsOn,
  type HalfEdgeId,
  type Plat,
  type RoleRow,
  type VertexId,
} from '../arena/index.js';
import { indexAdd, ITEM_EDGE, query } from '../index/index.js';
import { err, LATTICE, ok, orient2d, type KernelResult } from '../num/index.js';
import type { Level } from '../types/index.js';
import { charge, check, classOutcome, INSERT_ATTRACT_QUERIES, passOn, warn, workLimitHit } from './classes.js';
import { segmentsMeet } from './decimate.js';
import { segmentCloserThan } from './placement.js';
import { placeAcross, resolveCrossings, sliverPartner } from './crossings.js';
import {
  applyLanding,
  attractStretch,
  COS_MIN_ANGLE,
  nearerVertex,
  onRouteOfLevel,
  planLanding,
  promote,
  routeBetween,
  segmentBox,
  segmentDistance,
  SIN_MIN_ANGLE,
  withinSegment,
  type ChainCtx,
} from './stretch.js';
import { TX_FACES_WALKED } from './rewalk.js';
import { cornerMove, wedgeOutcome } from './wedge.js';

/** §3.6's bound on the iterated snap rounding's passes. */
export const MAX_PASSES = 3;

const MIN_EDGE = LATTICE.minEdgeCm;
const MIN_EDGE_SQ = LATTICE.minEdgeCm * LATTICE.minEdgeCm;
const ATTRACT = LATTICE.attractCm;
/** A guard on the router's recursion: far beyond any real chain, it turns a routing loop into a programming error. */
const MAX_DEPTH = 4096;

// ---- the arena's rotations --------------------------------------------------------------------------------------------

function quadrant(dx: number, dy: number): number {
  if (dx > 0 && dy >= 0) return 0;
  if (dx <= 0 && dy > 0) return 1;
  if (dx < 0 && dy <= 0) return 2;
  return 3;
}

/** Is direction a strictly before direction b counter-clockwise from the +x axis? Exact on integer directions. */
function ccwBefore(ax: number, ay: number, bx: number, by: number): boolean {
  const qa = quadrant(ax, ay);
  const qb = quadrant(bx, by);
  if (qa !== qb) return qa < qb;
  return orient2d(0, 0, ax, ay, bx, by) > 0;
}

/** Links the outgoing half-edge x into the rotation at its origin v by exact angle (§2.2's next / prev; §3.9's rule). */
function attach(p: Plat, x: HalfEdgeId, v: VertexId): void {
  const T = p.halfEdges;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const first = p.vertices.out[v];
  if (first === -1) {
    T.next[x ^ 1] = x;
    T.prev[x] = x ^ 1;
    p.vertices.out[v] = x;
    return;
  }
  const dir = (h: HalfEdgeId): [number, number] => [X[T.origin[h ^ 1]] - X[v], Y[T.origin[h ^ 1]] - Y[v]];
  const [xx, xy] = dir(x);
  // The outgoing edges clockwise: c → next[c ^ 1]. x goes between c and its clockwise successor d where, counter-
  // clockwise, d < x < c (cyclically).
  let c = first;
  let guard = 0;
  for (;;) {
    const d = T.next[c ^ 1];
    if (d === c) break; // one edge: anywhere
    const [cx, cy] = dir(c);
    const [dx, dy] = dir(d);
    const inside = ccwBefore(dx, dy, cx, cy)
      ? ccwBefore(dx, dy, xx, xy) && ccwBefore(xx, xy, cx, cy)
      : ccwBefore(dx, dy, xx, xy) || ccwBefore(xx, xy, cx, cy);
    if (inside) break;
    c = d;
    check(++guard <= T.origin.length && c !== first, `no rotation slot for a new edge at vertex ${v}`);
  }
  const d = T.next[c ^ 1];
  T.next[c ^ 1] = x;
  T.prev[x] = c ^ 1;
  T.next[x ^ 1] = d;
  T.prev[d] = x ^ 1;
}

/** A new edge pair a → b of `level` linked into both rotations; returns its half-edge from a. */
export function linkEdge(p: Plat, a: VertexId, b: VertexId, level: number): HalfEdgeId {
  const h = allocEdgePair(p, a, b, level as 0 | 1 | 2 | 3 | 4);
  attach(p, h, a);
  attach(p, h ^ 1, b);
  return h;
}

// ---- rows ---------------------------------------------------------------------------------------------------------------

/** Does the edge pair of `h` carry the row's key? */
function edgeCarries(p: Plat, h: HalfEdgeId, row: RoleRow): boolean {
  const ent = handleOf(p, row.entity);
  if (ent < 0) return false;
  const role = roleIdOf(row.role);
  const ordinal = row.ordinal ?? 0;
  const R = p.roles;
  for (const r of rowsOn(p, 'edge', h)) if (R.kind[r] === role && R.entity[r] === ent && R.ordinal[r] === ordinal) return true;
  return false;
}

/** The chain's rows onto an edge pair at the batch's level — each once: never a duplicate, never an overwrite (§3.6). */
function addRows(ctx: ChainCtx, h: HalfEdgeId): void {
  const p = ctx.p;
  for (const row of ctx.rows) {
    if (edgeCarries(p, h, row)) continue;
    const r = addRole(p, h, row, ctx.n);
    ctx.undo.push(() => removeRoleRow(p, r));
  }
}

/** Unlinks the outgoing half-edge x from the rotation at its origin (the inverse of `attach`). */
function detach(p: Plat, x: HalfEdgeId): void {
  const T = p.halfEdges;
  const o = T.origin[x];
  const c1 = T.prev[x]; // c ^ 1, the incoming half-edge before x
  const d = T.next[x ^ 1];
  if (d === x) {
    p.vertices.out[o] = -1;
    return;
  }
  T.next[c1] = d;
  T.prev[d] = c1;
  if (p.vertices.out[o] === x) p.vertices.out[o] = d;
}

/** Shares a level-≤ n route piece (its physical half-edges, in order): its edges gain the chain's rows (W_STRETCH_SHARED). */
function share(ctx: ChainCtx, path: readonly HalfEdgeId[]): void {
  for (const g of path) {
    addRows(ctx, g);
    ctx.journal.sharedPairs.push(g >> 1);
  }
  warn(ctx.tx, ctx.warnings, 'W_STRETCH_SHARED', pointOf(ctx.p, ctx.p.halfEdges.origin[path[0]]));
}

// ---- checks of a new edge -------------------------------------------------------------------------------------------------

/** The neighbours of v (every level). */
function neighbours(p: Plat, v: VertexId): Set<VertexId> {
  const O = p.halfEdges.origin;
  return new Set(outgoing(p, v).map((h) => O[h ^ 1]));
}

/**
 * A vertex standing closer than `minEdge` to v without an edge to it (an acute corner's other tip), or −1. Clearance
 * lets two such vertices exist only where they share every neighbour (C-0177 (7)).
 */
export function twinOf(ctx: ChainCtx, v: VertexId): VertexId {
  const { tx, p } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const box = segmentBox(X[v], Y[v], X[v], Y[v], MIN_EDGE);
  const nb = neighbours(p, v);
  for (const w of query(p, tx.key, 4, box, { vertices: true }).vertices) {
    if (w === v || nb.has(w)) continue;
    if ((X[w] - X[v]) * (X[w] - X[v]) + (Y[w] - Y[v]) * (Y[w] - Y[v]) < MIN_EDGE_SQ) return w;
  }
  return -1;
}

/**
 * The route neighbour of v (the next vertex of level ≤ n along an edge of level ≤ n at v) nearest the point (x, y), ties
 * y then x; −1 when v has no edge of level ≤ n.
 */
function exitTowards(ctx: ChainCtx, v: VertexId, x: number, y: number): VertexId {
  const { p, n } = ctx;
  const O = p.halfEdges.origin;
  const L = p.vertices.level;
  let best = -1;
  for (const h of outgoing(p, v)) {
    const m = edgeLevel(p, h);
    if (m > n) continue;
    let g = h;
    let w = O[g ^ 1];
    while (L[w] > n) {
      let onward = -1;
      for (const e of outgoing(p, w)) if (e !== (g ^ 1) && edgeLevel(p, e) === m) onward = e;
      check(onward >= 0, `vertex ${w} on a level-${m} run has no onward run edge`);
      g = onward;
      w = O[g ^ 1];
    }
    best = best < 0 ? w : nearerVertex(p, best, w, x, y);
  }
  return best;
}

/** Is the doubled point (qx2, qy2) strictly inside the ring of vertices (doubled coordinates; crossing number, exact)? */
function insideDoubled(p: Plat, ring: readonly VertexId[], qx2: number, qy2: number): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  let inside = false;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    const ay = 2 * Y[a];
    const by = 2 * Y[b];
    if ((ay > qy2) !== (by > qy2)) {
      const o = orient2d(2 * X[a], ay, 2 * X[b], by, qx2, qy2);
      if (by > ay ? o > 0 : o < 0) inside = !inside;
    }
  }
  return inside;
}

/** recordHolding's answer when the walk passed the work limit (E_WORK_LIMIT for the caller). */
export const OVER_LIMIT = -2;

/**
 * The face record of `level` whose region strictly holds the doubled point, or −1 (an index query, then the rings);
 * OVER_LIMIT when the rings walked pass the transaction's work limit (`tx.facesWalked`).
 */
export function recordHolding(ctx: ChainCtx, level: number, qx2: number, qy2: number): number {
  const { tx, p } = ctx;
  const lv = level as 0 | 1 | 2 | 3 | 4;
  const x0 = Math.floor(qx2 / 2);
  const y0 = Math.floor(qy2 / 2);
  const O = p.halfEdges.origin;
  for (const f of query(p, tx.key, lv, { minX: x0, minY: y0, maxX: x0 + 1, maxY: y0 + 1 }, { faces: true }).faces) {
    if (!charge(tx, TX_FACES_WALKED, 1)) return OVER_LIMIT;
    const rings = faceWalk(p, lv, f).map((r) => r.map((h) => O[h]));
    if (!insideDoubled(p, rings[0], qx2, qy2)) continue;
    let inHole = false;
    for (let i = 1; i < rings.length; i++) if (insideDoubled(p, rings[i], qx2, qy2)) inHole = true;
    if (!inHole) return f;
  }
  return -1;
}

/** Why a planned edge cannot be written: a refusal for the chain, or a gap in the router (a programming error). */
type EdgeCheck = { readonly ok: true; readonly acute: number } | { readonly ok: false; readonly code: 'E_KEPT' | 'E_BELOW_MIN_ANGLE' | 'E_WORK_LIMIT'; readonly detail: string };

/**
 * The checks of a new edge a → b of the batch's level before it is written: `minEdge`; no edge crossing or overlapping
 * it but at a shared end; clearance (every vertex outside its one-ring at least `minEdge` from it); finer geometry kept
 * (no finer edge meeting it or within `attractCm` but at its own ends, no finer vertex off the routes of level ≤ n within
 * `attractCm`, no finer face record round it — E_KEPT, §3.3); its face corners (the count below `minFaceAngle`, or
 * E_BELOW_MIN_ANGLE for an optional chain). A failed hard row is a gap in the router and throws.
 */
function checkEdge(ctx: ChainCtx, a: VertexId, b: VertexId): EdgeCheck {
  const { tx, p, n } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const O = p.halfEdges.origin;
  const ax = X[a];
  const ay = Y[a];
  const bx = X[b];
  const by = Y[b];
  check((bx - ax) * (bx - ax) + (by - ay) * (by - ay) >= MIN_EDGE_SQ, `the router planned an edge (${ax}, ${ay})–(${bx}, ${by}) shorter than minEdge`);
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return { ok: false, code: 'E_WORK_LIMIT', detail: INSERT_ATTRACT_QUERIES };
  const near = query(p, tx.key, 4, segmentBox(ax, ay, bx, by, ATTRACT), { vertices: true, edges: true });
  const na = neighbours(p, a);
  const nbb = neighbours(p, b);
  for (const h of near.edges) {
    const u = O[h];
    const w = O[h ^ 1];
    const finer = edgeLevel(p, h) > n;
    const shared = [u, w].filter((v) => v === a || v === b).length;
    if (shared === 2) {
      check(finer, 'the router planned an edge that already exists');
      return { ok: false, code: 'E_KEPT', detail: `the chain would share a finer edge at (${ax}, ${ay})–(${bx}, ${by}) (kept content)` };
    }
    if (shared === 1) {
      const s = u === a || u === b ? u : w;
      const t = s === u ? w : u;
      const o = s === a ? b : a;
      const overlap = orient2d(X[s], Y[s], X[o], Y[o], X[t], Y[t]) === 0 && (X[o] - X[s]) * (X[t] - X[s]) + (Y[o] - Y[s]) * (Y[t] - Y[s]) > 0;
      if (overlap) {
        check(finer, `the router planned an edge overlapping an edge at (${X[s]}, ${Y[s]})`);
        return { ok: false, code: 'E_KEPT', detail: `the chain would run along a finer edge at (${X[s]}, ${Y[s]}) (kept content)` };
      }
      continue;
    }
    if (segmentsMeet(ax, ay, bx, by, X[u], Y[u], X[w], Y[w])) {
      check(finer, `the router planned an edge (${ax}, ${ay})–(${bx}, ${by}) crossing (${X[u]}, ${Y[u]})–(${X[w]}, ${Y[w]})`);
      return { ok: false, code: 'E_KEPT', detail: `the chain would cross a finer edge at (${X[u]}, ${Y[u]})–(${X[w]}, ${Y[w]}) (kept content)` };
    }
    if (finer && (withinSegment(X[u], Y[u], ax, ay, bx, by, ATTRACT) || withinSegment(X[w], Y[w], ax, ay, bx, by, ATTRACT)
      || withinSegment(ax, ay, X[u], Y[u], X[w], Y[w], ATTRACT) || withinSegment(bx, by, X[u], Y[u], X[w], Y[w], ATTRACT))) {
      return { ok: false, code: 'E_KEPT', detail: `the chain comes within attractCm of a finer edge at (${X[u]}, ${Y[u]})–(${X[w]}, ${Y[w]}) (kept content)` };
    }
  }
  for (const v of near.vertices) {
    if (v === a || v === b) continue;
    const finerOff = L[v] > n && !onRouteOfLevel(p, v, n);
    if (finerOff && withinSegment(X[v], Y[v], ax, ay, bx, by, ATTRACT)) {
      return { ok: false, code: 'E_KEPT', detail: `the chain comes within attractCm of a finer vertex at (${X[v]}, ${Y[v]}) (kept content)` };
    }
    // Clearance against vertices of level ≤ n is checked once the chain's edges are all written (`checkClearance`):
    // a vertex the router is about to join to this edge's end may stand closer meanwhile (C-0177 (7)).
    if (L[v] > n && !na.has(v) && !nbb.has(v) && segmentCloserThan(X[v], Y[v], ax, ay, bx, by, MIN_EDGE)) {
      return { ok: false, code: 'E_KEPT', detail: `the chain comes within minEdge of a finer vertex at (${X[v]}, ${Y[v]}) (kept content)` };
    }
  }
  // No finer face record round the new edge (§3.3 kept content): finer records tile their parent where they exist, so
  // one at level n + 1 round the edge's midpoint is the test.
  const held = n < 4 ? recordHolding(ctx, n + 1, ax + bx, ay + by) : -1;
  if (held === OVER_LIMIT) return { ok: false, code: 'E_WORK_LIMIT', detail: TX_FACES_WALKED };
  if (held >= 0) {
    return { ok: false, code: 'E_KEPT', detail: `the chain would split a finer face at (${(ax + bx) / 2}, ${(ay + by) / 2}) (kept content)` };
  }
  // Face corners at both ends: an existing edge within minFaceAngle of the new one, on the same side.
  let acute = 0;
  for (const [v, ux, uy] of [[a, bx - ax, by - ay], [b, ax - bx, ay - by]] as const) {
    for (const h of outgoing(p, v)) {
      const w = O[h ^ 1];
      const vx = X[w] - X[v];
      const vy = Y[w] - Y[v];
      const dot = ux * vx + uy * vy;
      if (dot > 0 && Math.abs(ux * vy - uy * vx) * COS_MIN_ANGLE < SIN_MIN_ANGLE * dot) acute += 1;
    }
  }
  if (acute > 0) {
    const o = classOutcome(ctx.cls, 'acuteCorner');
    if ('refuse' in o) return { ok: false, code: 'E_BELOW_MIN_ANGLE', detail: `${o.detail} at (${ax}, ${ay})–(${bx}, ${by})` };
  }
  return { ok: true, acute };
}

/**
 * §3.10's clearance row over what a chain wrote, read on the arena as it stands: every vertex at least `minEdge` from
 * every new edge outside its one-ring, and every end of a new edge and of a split at least `minEdge` from every edge
 * outside its one-ring. The first problem found, or null.
 */
export function clearanceProblem(ctx: ChainCtx, pairs: readonly number[], splitEnds: readonly VertexId[]): string | null {
  const { tx, p } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const at = new Set<VertexId>(splitEnds);
  for (const e of pairs) {
    const a = O[2 * e];
    const b = O[2 * e + 1];
    at.add(a);
    at.add(b);
    const na = neighbours(p, a);
    const nb = neighbours(p, b);
    for (const v of query(p, tx.key, 4, segmentBox(X[a], Y[a], X[b], Y[b], MIN_EDGE), { vertices: true }).vertices) {
      if (v === a || v === b || na.has(v) || nb.has(v)) continue;
      if (segmentCloserThan(X[v], Y[v], X[a], Y[a], X[b], Y[b], MIN_EDGE)) return `the chain's edge (${X[a]}, ${Y[a]})–(${X[b]}, ${Y[b]}) stands within minEdge of the vertex (${X[v]}, ${Y[v]})`;
    }
  }
  for (const v of at) {
    const nv = neighbours(p, v);
    for (const h of query(p, tx.key, 4, segmentBox(X[v], Y[v], X[v], Y[v], MIN_EDGE), { edges: true }).edges) {
      const u = O[h];
      const w = O[h ^ 1];
      if (u === v || w === v || nv.has(u) || nv.has(w)) continue;
      if (segmentCloserThan(X[v], Y[v], X[u], Y[u], X[w], Y[w], MIN_EDGE)) return `the vertex (${X[v]}, ${Y[v]}) stands within minEdge of the edge (${X[u]}, ${Y[u]})–(${X[w]}, ${Y[w]})`;
    }
  }
  return null;
}

/**
 * §3.10's clearance row (as `clearanceProblem`) on the final arena: the router keeps it — each segment's route checked as
 * it is written, with its fallbacks (C-0177 (13)) — so a failure here is a gap in the router and throws.
 */
export function checkClearance(ctx: ChainCtx, pairs: readonly number[], splitEnds: readonly VertexId[]): void {
  const problem = clearanceProblem(ctx, pairs, splitEnds);
  check(problem === null, problem ?? '');
}

/** Writes the new edge a → b (checked): linked, the chain's rows, its route-edge item, the journal. */
function writeEdge(ctx: ChainCtx, a: VertexId, b: VertexId, acute: number): void {
  const p = ctx.p;
  const h = linkEdge(p, a, b, ctx.n);
  ctx.undo.push(() => {
    detach(p, h);
    detach(p, h ^ 1);
    freeEdgePair(p, h);
  });
  addRows(ctx, h);
  indexAdd(p, { kind: ITEM_EDGE, level: ctx.n, slot: h >> 1 });
  ctx.journal.newPairs.push(h >> 1);
  for (let i = 0; i < acute; i++) warn(ctx.tx, ctx.warnings, 'W_ACUTE_CORNER', pointOf(p, a));
}

// ---- the router -------------------------------------------------------------------------------------------------------------

/**
 * `snapRound`: routes the chain from vertex a to vertex b (both of level ≤ n) through steps 3 – 4 and writes the new
 * edges (see the module comment). Refuses E_KEPT, E_BELOW_MIN_ANGLE and E_BELOW_MIN_EDGE (the classes, §3.6), E_LEVEL
 * from a landing, E_WORK_LIMIT; a refusal leaves the edges written before it for the transaction to roll back (C-0169
 * (6), C-0177 (8)).
 */
export function snapRound(ctx: ChainCtx, a: VertexId, b: VertexId): KernelResult<null> {
  const r = route(ctx, a, b, 1, new Set(), 0);
  if (!r.ok) return r;
  if (ctx.maxPass > ctx.journal.passes) ctx.journal.passes = ctx.maxPass;
  return ok(null);
}

/** How far from the segment the route along existing edges may reach (4 · attractCm), and how many vertices it may expand. */
const ALONG_REACH = 4 * LATTICE.attractCm;
const ALONG_MAX = 256;

/** The vertices of level ≤ n joined to v by one level-≤ n route piece (through finer vertices), each with the piece's half-edges. */
function pieceNeighbours(p: Plat, v: VertexId, n: Level): { readonly w: VertexId; readonly path: HalfEdgeId[] }[] {
  const O = p.halfEdges.origin;
  const L = p.vertices.level;
  const out: { w: VertexId; path: HalfEdgeId[] }[] = [];
  for (const h of outgoing(p, v)) {
    const m = edgeLevel(p, h);
    if (m > n) continue;
    const path: HalfEdgeId[] = [h];
    let g = h;
    let w = O[g ^ 1];
    let guard = 0;
    while (L[w] > n) {
      let onward = -1;
      for (const e of outgoing(p, w)) if (e !== (g ^ 1) && edgeLevel(p, e) === m) onward = e;
      check(onward >= 0, `vertex ${w} on a level-${m} run has no onward run edge`);
      g = onward;
      path.push(g);
      w = O[g ^ 1];
      check(++guard <= p.slots.pair.top, 'a run does not end');
    }
    out.push({ w, path });
  }
  return out;
}

/**
 * The router's last fallback for a segment whose design route and strict route both leave clearance broken (C-0177 (13)):
 * the chain follows existing geometry — the shortest path from a to b along level-≤ n route pieces whose vertices stand
 * within 4 · `attractCm` of the segment (Dijkstra by length; ties by the vertex's lattice position, y then x; at most 256
 * vertices expanded, each charged to `insert.attractQueries`) — its pieces shared (W_STRETCH_SHARED). Sharing writes no
 * geometry, so it keeps every row of §3.10. An optional chain the path moves more than `attractCm` from its segment is
 * refused, as a wedge route is (E_BELOW_MIN_EDGE). ok(false) when no such path exists; nothing written then.
 */
export function routeAlongExisting(ctx: ChainCtx, a: VertexId, b: VertexId): KernelResult<boolean> {
  const { tx, p, n } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const ax = X[a];
  const ay = Y[a];
  const bx = X[b];
  const by = Y[b];
  const dist = new Map<VertexId, number>([[a, 0]]);
  const via = new Map<VertexId, { readonly from: VertexId; readonly path: HalfEdgeId[] }>();
  const done = new Set<VertexId>();
  for (let expanded = 0; expanded < ALONG_MAX; expanded++) {
    let u = -1;
    let du = 0;
    for (const [v, d] of dist) {
      if (done.has(v)) continue;
      if (u < 0 || d < du || (d === du && (Y[v] < Y[u] || (Y[v] === Y[u] && X[v] < X[u])))) {
        u = v;
        du = d;
      }
    }
    if (u < 0 || u === b) break;
    done.add(u);
    if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return workLimitHit(INSERT_ATTRACT_QUERIES);
    for (const { w, path } of pieceNeighbours(p, u, n)) {
      if (done.has(w) || segmentDistance(X[w], Y[w], ax, ay, bx, by) > ALONG_REACH) continue;
      const dw = du + Math.sqrt((X[w] - X[u]) * (X[w] - X[u]) + (Y[w] - Y[u]) * (Y[w] - Y[u]));
      const known = dist.get(w);
      if (known === undefined || dw < known) {
        dist.set(w, dw);
        via.set(w, { from: u, path });
      }
    }
  }
  if (!dist.has(b)) return ok(false);
  const pieces: HalfEdgeId[][] = [];
  let move = 0;
  for (let v = b; v !== a; ) {
    const step = via.get(v);
    check(step !== undefined, 'a route along existing edges reaches back to its start');
    pieces.push(step.path);
    move = Math.max(move, segmentDistance(X[v], Y[v], ax, ay, bx, by));
    v = step.from;
  }
  if (move > ATTRACT) {
    const o = classOutcome(ctx.cls, 'wedgeBeyondAttract');
    if ('refuse' in o) return err('E_BELOW_MIN_EDGE', `a route along existing edges would move it more than attractCm (${move.toFixed(1)} cm)`);
  }
  for (let i = pieces.length - 1; i >= 0; i--) share(ctx, pieces[i]);
  return ok(true);
}

function route(ctx: ChainCtx, a: VertexId, b: VertexId, pass: number, exclude: ReadonlySet<VertexId>, depth: number): KernelResult<null> {
  check(depth <= MAX_DEPTH, 'the router does not converge');
  if (a === b) return ok(null);
  const { tx, p, n } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const path = routeBetween(p, a, b, n);
  if (path !== null) {
    share(ctx, path);
    return ok(null);
  }
  const via = (x: VertexId, nextPass: number): KernelResult<null> => {
    const r1 = route(ctx, a, x, nextPass, withAll(exclude, b), depth + 1);
    if (!r1.ok) return r1;
    return route(ctx, x, b, pass, withAll(exclude, a), depth + 1);
  };
  // A vertex inside an acute corner with its twin beside it takes no new edge: leave or reach it along an existing one.
  if (twinOf(ctx, a) >= 0) {
    const z = exitTowards(ctx, a, X[b], Y[b]);
    if (z < 0) return passOn({ code: 'E_KEPT', detail: `the vertex at (${X[a]}, ${Y[a]}) can be left only along finer edges (kept content)` });
    return via(z, pass);
  }
  if (twinOf(ctx, b) >= 0) {
    const z = exitTowards(ctx, b, X[a], Y[a]);
    if (z < 0) return passOn({ code: 'E_KEPT', detail: `the vertex at (${X[b]}, ${Y[b]}) can be reached only along finer edges (kept content)` });
    return via(z, pass);
  }
  // Step 3. A contact or stretch whose landing would put the chain back on its own path (a vertex the router has
  // already placed round this segment) is no contact for this segment: its piece is skipped (C-0177 (7)).
  const onPath = (v: VertexId): boolean => v === a || v === b || exclude.has(v);
  const skip = new Set<HalfEdgeId>();
  for (;;) {
    const s3 = attractStretch(ctx, a, b, exclude, skip);
    if (!s3.ok) return passOn(s3);
    const ob = s3.value;
    if (ob === null) break;
    if (pass > ctx.maxPass) ctx.maxPass = pass;
    if (ob.kind === 'vertex') {
      if (L[ob.vertex] > n) promote(tx, ob.vertex, n, ctx.warnings, ctx.undo);
      warn(tx, ctx.warnings, 'W_ATTRACTED', pointOf(p, ob.vertex));
      return via(ob.vertex, pass);
    }
    if (ob.kind === 'contact') {
      const l = planLanding(tx, ob.piece, ob.at.x, ob.at.y);
      if (!l.ok) return passOn(l);
      if (l.value.kind === 'vertex' && onPath(l.value.vertex)) {
        skip.add(ob.piece.edge);
        continue;
      }
      const m = applyLanding(ctx, l.value);
      warn(tx, ctx.warnings, 'W_ATTRACTED', pointOf(p, m));
      return via(m, pass);
    }
    // A shared stretch: join, follow, leave.
    const jl = planLanding(tx, ob.piece, ob.join.x, ob.join.y);
    if (!jl.ok) return passOn(jl);
    const kl0 = planLanding(tx, ob.piece, ob.leave.x, ob.leave.y);
    if (!kl0.ok) return passOn(kl0);
    if ((jl.value.kind === 'vertex' && onPath(jl.value.vertex)) || (kl0.value.kind === 'vertex' && onPath(kl0.value.vertex))) {
      skip.add(ob.piece.edge);
      continue;
    }
    const j = applyLanding(ctx, jl.value);
    warn(tx, ctx.warnings, 'W_ATTRACTED', pointOf(p, j));
    const kl = planLandingAfter(ctx, ob.piece, j, ob.leave.x, ob.leave.y);
    if (!kl.ok) return passOn(kl);
    const k = kl.value;
    const r1 = route(ctx, a, j, pass, withAll(exclude, b), depth + 1);
    if (!r1.ok) return r1;
    if (k !== j) {
      // The route to j may have split or promoted a vertex between j and k: then the run is walked from j to k, and only
      // where that walk is impossible is j → k routed as any segment (N-37).
      const along = routeBetween(p, j, k, n) ?? walkRun(ctx, ob.piece, j, k);
      if (along !== null) share(ctx, along);
      else {
        const r2 = route(ctx, j, k, pass, withAll(exclude, a, b), depth + 1);
        if (!r2.ok) return r2;
      }
    }
    return route(ctx, k, b, pass, withAll(exclude, a, j), depth + 1);
  }
  // Step 4.
  const s4 = resolveCrossings(ctx, a, b);
  if (!s4.ok) return passOn(s4);
  const fc = s4.value;
  if (fc !== null) {
    if (pass > ctx.maxPass) ctx.maxPass = pass;
    if (fc.kind === 'wedge') {
      const k = fc.corner;
      const w = wedgeOutcome(ctx, cornerMove(ctx, a, b, k), pointOf(p, k));
      if (!w.ok) return passOn(w);
      if (w.value) {
        if (L[k] > n) promote(tx, k, n, ctx.warnings, ctx.undo);
        return via(k, pass);
      }
      // Beyond 2 · √2 · attractCm a mandatory chain is not wedge-routed: its crossings are placed in turn, the first here
      // (N-38, N-40).
    }
    const c = fc.kind === 'wedge' ? fc.first : fc.crossing;
    if (ctx.endpointCrossings === true) {
      // N-37's route: the crossing lands on the placement's endpoint fallback, never a split.
      const e = fallbackEnd(ctx, c.piece, c.x, c.y, onPath);
      if (e < 0) return err('E_INVARIANT', `a crossing at (${c.x.toFixed(1)}, ${c.y.toFixed(1)}) has both sub-edge ends on the chain's path`);
      const v = applyLanding(ctx, { kind: 'vertex', vertex: e, onto: 'fallback', warnings: [{ code: 'W_PLACED', count: 1, at: pointOf(p, e) }] });
      return via(v, pass + 1);
    }
    const l = planLanding(tx, c.piece, c.x, c.y, { c: pointOf(p, a), d: pointOf(p, b) });
    if (!l.ok) return passOn(l);
    let landing = l.value;
    if (ctx.acrossSlivers === true && landing.kind === 'vertex' && landing.onto === 'fallback') {
      // N-42 (a)'s route: a crossing the placement can only send to its endpoint fallback, on the near side of a sliver,
      // is placed across it; the far side's crossing is placed in its turn, at least minEdge away (C-0207).
      const partner = sliverPartner(ctx, a, b, c);
      if (!partner.ok) return passOn(partner);
      if (partner.value !== null) {
        const across = placeAcross(ctx, a, b, c, partner.value);
        if (!across.ok) return passOn(across);
        if (across.value !== null) landing = across.value;
      }
    }
    if (landing.kind === 'vertex' && onPath(landing.vertex)) {
      // The placement's fallback (or an end within attractCm) would send the segment back onto its own path: the other
      // end of the sub-edge the crossing falls on takes it (C-0177 (7)).
      const alt = otherEnd(ctx, c.piece, c.x, c.y, landing.vertex);
      if (alt >= 0 && !onPath(alt)) landing = { kind: 'vertex', vertex: alt, onto: 'fallback', warnings: [{ code: 'W_PLACED', count: 1, at: pointOf(p, alt) }] };
    }
    const v = applyLanding(ctx, landing);
    return via(v, pass + 1);
  }
  // Nothing left between a and b: one new edge.
  const ce = checkEdge(ctx, a, b);
  if (!ce.ok) return passOn(ce);
  writeEdge(ctx, a, b, ce.acute);
  return ok(null);
}

/**
 * A stretch's leave point, landed after its join point j was written on the same route piece: the piece now ends at j
 * on one side, so the leave point lands on the sub-piece of the run that holds it (the endpoint rule then reads j too).
 */
function planLandingAfter(ctx: ChainCtx, piece: { readonly a: VertexId; readonly b: VertexId; readonly runA: VertexId; readonly runB: VertexId; readonly edge: HalfEdgeId }, j: VertexId, x: number, y: number): KernelResult<VertexId> {
  const p = ctx.p;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  // Which side of j along the piece holds (x, y)? Projections along a → b.
  const ux = X[piece.b] - X[piece.a];
  const uy = Y[piece.b] - Y[piece.a];
  const tj = (X[j] - X[piece.a]) * ux + (Y[j] - Y[piece.a]) * uy;
  const tq = (x - X[piece.a]) * ux + (y - Y[piece.a]) * uy;
  let lo = piece.a;
  let hi = piece.b;
  if (j !== piece.a && j !== piece.b) {
    if (tq <= tj) hi = j;
    else lo = j;
  }
  const path = routeBetween(p, lo, hi, ctx.n);
  check(path !== null, 'a piece split at its join point still joins its ends');
  const sub = { a: lo, b: hi, edge: path[0], runA: piece.runA, runB: piece.runB };
  const l = planLanding(ctx.tx, sub, x, y);
  if (!l.ok) return passOn(l);
  return ok(applyLanding(ctx, l.value));
}

/** How far off its run's own-level route a vertex the stretch walk steps onto may stand: J-K32's ≈ 1.49 cm, rounded up. */
const WALK_BAND_CM = 2;

/**
 * N-37's walk along a stretch's run from its join point j to its leave point k, for when the route to j has split or
 * promoted a vertex between them, so that no one route piece joins them: the physical half-edges of the run's level from
 * j, each step to the neighbour that lies on towards k along the run's own-level route (of several, the one nearest that
 * line; it must stand within 2 cm of it), until k. Null when the walk cannot reach k. Nothing written.
 */
function walkRun(ctx: ChainCtx, piece: { readonly runA: VertexId; readonly runB: VertexId; readonly edge: HalfEdgeId }, j: VertexId, k: VertexId): HalfEdgeId[] | null {
  const p = ctx.p;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const m = p.halfEdges.level[piece.edge >> 1];
  const ax = X[piece.runA];
  const ay = Y[piece.runA];
  const bx = X[piece.runB];
  const by = Y[piece.runB];
  const ux = bx - ax;
  const uy = by - ay;
  const band2 = WALK_BAND_CM * WALK_BAND_CM * (ux * ux + uy * uy);
  const tOf = (v: VertexId): number => (X[v] - ax) * ux + (Y[v] - ay) * uy;
  const tk = tOf(k);
  const dir = tk > tOf(j) ? 1 : -1;
  const path: HalfEdgeId[] = [];
  let u = j;
  for (let guard = 0; u !== k; guard++) {
    if (guard > p.slots.pair.top) return null;
    const tu = tOf(u);
    let step = -1;
    let stepOff = 0;
    for (const h of outgoing(p, u)) {
      if (edgeLevel(p, h) !== m) continue;
      const w = O[h ^ 1];
      const tw = tOf(w);
      if (dir * (tw - tu) <= 0 || dir * (tw - tk) > 0) continue;
      const o = orient2d(ax, ay, bx, by, X[w], Y[w]);
      if (o * o > band2) continue;
      if (step < 0 || o * o < stepOff) {
        step = h;
        stepOff = o * o;
      }
    }
    if (step < 0) return null;
    path.push(step);
    u = O[step ^ 1];
  }
  return path.length > 0 ? path : null;
}

/**
 * N-37's endpoint for a crossing at the exact position (x, y) on the route piece: the nearer end of the physical
 * sub-edge holding it (ties y then x — the placement rule's fallback, §3.6), or its other end when that one is already on
 * the chain's path (C-0177 (7)); −1 when both are.
 */
function fallbackEnd(ctx: ChainCtx, piece: { readonly a: VertexId; readonly b: VertexId }, x: number, y: number, onPath: (v: VertexId) => boolean): VertexId {
  const p = ctx.p;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const path = routeBetween(p, piece.a, piece.b, ctx.n);
  check(path !== null, 'a piece joins its two ends');
  const vs = path.map((h) => O[h]);
  vs.push(O[path[path.length - 1] ^ 1]);
  const ux = X[piece.b] - X[piece.a];
  const uy = Y[piece.b] - Y[piece.a];
  const tq = (x - X[piece.a]) * ux + (y - Y[piece.a]) * uy;
  let i = 0;
  while (i + 2 < vs.length && (X[vs[i + 1]] - X[piece.a]) * ux + (Y[vs[i + 1]] - Y[piece.a]) * uy <= tq) i += 1;
  const near = nearerVertex(p, vs[i], vs[i + 1], x, y);
  const far = near === vs[i] ? vs[i + 1] : vs[i];
  if (!onPath(near)) return near;
  return onPath(far) ? -1 : far;
}

/** A set with more members. */
function withAll(s: ReadonlySet<VertexId>, ...vs: VertexId[]): Set<VertexId> {
  const out = new Set(s);
  for (const v of vs) out.add(v);
  return out;
}

/**
 * The vertex beside `v` along the route piece on the side of the exact position (x, y): the other end of the sub-edge
 * the position falls on when v is one of its ends; −1 when v is not on the piece.
 */
function otherEnd(ctx: ChainCtx, piece: { readonly a: VertexId; readonly b: VertexId }, x: number, y: number, v: VertexId): VertexId {
  const p = ctx.p;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const path = routeBetween(p, piece.a, piece.b, ctx.n);
  if (path === null) return -1;
  const vs = path.map((h) => O[h]);
  vs.push(O[path[path.length - 1] ^ 1]);
  const i = vs.indexOf(v);
  if (i < 0) return -1;
  const ux = X[piece.b] - X[piece.a];
  const uy = Y[piece.b] - Y[piece.a];
  const tq = (x - X[piece.a]) * ux + (y - Y[piece.a]) * uy;
  const tv = (X[v] - X[piece.a]) * ux + (Y[v] - Y[piece.a]) * uy;
  const j = tq > tv ? i + 1 : i - 1;
  return j >= 0 && j < vs.length ? vs[j] : -1;
}
