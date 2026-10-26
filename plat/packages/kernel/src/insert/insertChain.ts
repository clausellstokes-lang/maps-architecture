// insertChain(tx, points, roles, cls, opts) → ChainInsert (§3.4; §3.6 *Attraction* steps 1 – 5; §3.4 *The doors*;
// §2.2 rule 5's knots). M0-a-05.
//
// The door for chains (§3.4, §3.6 steps 1 – 5), the one door for new edges in a plat. Step 1 snaps and decimates the
// chain and splits it into simple runs (`decimate`, M0-a-04; this op reports its merges' W_ATTRACTED when the chain goes
// on, C-0170 (2)). Then run by run — the part already inserted counting as existing geometry for its later parts —
// step 2 lands each vertex: the nearest vertex within `attractCm`, the nearest edge's endpoint, a split at the placement
// point, or (candidate (b)) a finer vertex on that route, promoted; a vertex attraction brought within `minEdge` of the
// previous one merges into it (W_ATTRACTED); a vertex both of whose segments cross one existing edge within `minEdge` of
// each other — the chain's own acute corner — moves onto that edge (wedge routing, W_WEDGE_ROUTED). Each segment is
// routed by steps 3 – 4 (`snapRound`) under the readings in order — the design route, the strict routes, the route along
// existing edges, the endpoint route, the route across a sliver, the anchored route (`routeOne`), the split route — each
// judged whole against §3.10's clearance and the fidelity bound: within 2 · √2 · `attractCm` of the input segment,
// Hausdorff both ways (`FIDELITY_SQ`, `inFidelity`). A segment no reading keeps is refused E_INVARIANT — or, for an
// optional chain whose routes keep clearance only beyond the bound, E_BELOW_MIN_EDGE naming the bound — counted by
// B-FUZZ against its caps; before an E_INVARIANT stands, an end that is a free vertex the op just placed is re-landed
// onto an existing vertex within √2 · `attractCm` (W_PLACED, C-0209). Step 5 re-walks the faces incident to the new
// edges (`rewalk`). The knot rows (`opts.knots`) go onto the vertices their points became — a knot that attraction
// lands on an existing vertex is carried to it (§3.4) — and every new and shared edge carries the chain's rows at the
// batch's level.
//
// `ChainInsert.placed` names, per input point in input order, the vertex it became after snapping, attraction and
// sharing (§3.4); valid until the next commit. A mandatory chain never fails for a precision reason: only §3.1's
// non-precision codes reject it — E_DEGENERATE `empty` (step 1), E_KEPT (finer geometry is kept content, C-0177 (4)),
// E_LEVEL, E_OUT_OF_RANGE, E_WORK_LIMIT — beside the counted E_INVARIANT; an acute corner commits with its warning, and
// a wedge route beyond the wedge cap is not taken (its crossings are placed in turn, C-0202 (3)). An optional chain is
// also refused E_BELOW_MIN_EDGE (step 1's collapse, a collapse by attraction, a wedge route beyond `attractCm`, a route
// beyond the bound) and E_BELOW_MIN_ANGLE (§3.6 *Chain classes*).
//
// The passes (`insertChain`): the first is the router; a chain it refuses E_INVARIANT is tried again with the anchored
// and split readings; a chain the second pass refuses for the bound gets the third and fourth passes, whose in-bound
// landings keep a far endpoint fallback within the bound (`ctx.strip`; the fourth tries step 2's free spot first). The
// first pass's refusal other than E_INVARIANT, and the second pass's other than one for the bound, are final; otherwise
// only a later pass's commit replaces the refusal before it, so a chain the third and fourth passes refuse too keeps the
// second pass's code. A refusal for the bound names its class (§13.1 (3): the provenance of the design route's
// farthest vertex, `refusalClass`; KI-1's residual, notBuilt #2 at M4), and an optional chain's names the class's
// precision rules that stopped the in-bound passes. A route never re-enters a vertex already on its path (item 130
// (d): cut back there, snapRound.ts); a later segment whose route retraces an edge of the chain's path before it is cut
// back to a vertex of that path near its start's input point (`cutBack`, the passes watching the path; C-0361 (1)),
// and a chain no cut back routes is routed as before (notBuilt #3, M4: every retrace of the chain's own path the cut
// back does not route, its five forms in C-0362 (3) as C-0363 amends it). A chain given again under a key of one chain
// per entity whose run the arena carries is that run (item 130 (e): its points land on the run's vertices within √2 ·
// `attractCm`, its segments follow the run, `ownWalk`).
//
// The op is atomic and never throws on a geometric input: every write it makes is undone on a refusal — the arena, the
// index, the journals and the transaction's warnings as they were (C-0170 (2), C-0177 (8)) — and an invariant check's
// throw inside it is refused E_INVARIANT with the check's message. The work-limit check reads `tx.workLimit`. A closed
// overlay — the transaction of a batch that committed, was rejected or threw, kept past it — is a programming error:
// the op throws at its entry, before it reads or writes anything (as `splitThrough`, C-0294). A vertex the op makes by
// splitting the chain's OWN edge — a chain point that folds back over the chain, or a step-3 join, leave or contact
// point where a later segment shares an earlier one (§3.11's collinear overlap) — is the chain's own vertex and carries
// no `split` flag (§2.2 rule 3; `ownShapeVertex`).
//
// Readings: C-0177, C-0202, C-0209, C-0215, C-0217, C-0221, C-0302, C-0361.
// Rulings: N-37 – N-46, N-53, N-55, N-61 (checks/M0-spec-notes.md).
import {
  addRole,
  allocVertex,
  freeVertex,
  handleOf,
  isHalfEdgeLive,
  isVertexLive,
  MAX_ORDINAL,
  outgoing,
  pointOf,
  roleIdOf,
  roleInfo,
  type HalfEdgeId,
  type Plat,
  type RoleRow,
  type VertexId,
} from '../arena/index.js';
import { beginIndexBatch, endIndexBatch, indexAdd, indexChange, indexDelete, indexOf, isItemLive, ITEM_VERTEX, query } from '../index/index.js';
import { belowMinEdge, err, LATTICE, ok, ratio, type KernelResult, type Warning } from '../num/index.js';
import type { LatticePoint } from '../types/index.js';
import { applyAttraction, planAttraction } from './attractVertex.js';
import { charge, check, classOutcome, classRefusal, cloneWarnings, foldWarnings, INSERT_ATTRACT_QUERIES, INSERT_PLACEMENT_CANDIDATES, passOn, warn, workLimitHit, type ChainClass, type InsertTx } from './classes.js';
import { placeOnRun } from './crossings.js';
import { segmentCloserThan } from './placement.js';
import { decimate, segmentsMeet, type Knot } from './decimate.js';
import { carriesRow } from './splitThrough.js';
import { rewalk, TX_FACES_WALKED } from './rewalk.js';
import { clearanceProblem, OVER_LIMIT, recordHolding, RETRACE_DETAIL, routeAlongExisting, share, snapRound } from './snapRound.js';
import {
  applyLanding,
  carriesOwnKey,
  chainJournal,
  FIDELITY_SQ,
  inInputBound,
  footOnSegment,
  nearestVertexWithin,
  landingPoint,
  lattice,
  onRouteOfLevel,
  ownRunOf,
  ownShapeVertex,
  pieceFrom,
  pieceOf,
  planLanding,
  recordSplit,
  routeBetween,
  segmentBox,
  segmentDistance,
  withinSegment,
  type ChainCtx,
  type Piece,
  type Landing,
  type Provenance,
} from './stretch.js';
import { chainCorner, wedgeOutcome } from './wedge.js';

const ATTRACT = LATTICE.attractCm;
const ATTRACT_SQ = LATTICE.attractCm * LATTICE.attractCm;
/** The kernel's three assertion prefixes (insert's `check`, the arena's, the index's): a throw carrying one inside the op becomes E_INVARIANT, C-0215. */
const INVARIANT_THROW = /^(insert|arena|index): /;

/** §3.4's `insertChain` options: `closed`, `pinned` (decimation exemptions) and `knots` (the chain's vertex role rows). */
export interface InsertChainOpts {
  readonly closed?: boolean;
  /** Chain indices exempt from decimation (§3.6 step 1) — not the kernel's pinned flag, which only `pinVertices` sets. */
  readonly pinned?: readonly number[];
  /** Every vertex role row the chain's own vertices take; `entity` defaults to the chain's own (its first row's). */
  readonly knots?: readonly Knot[];
}

/** §3.4's `ChainInsert`. */
export interface ChainInsert {
  /** Per input point, in input order: the vertex it became after snapping, attraction and sharing; valid until the next commit. */
  readonly placed: VertexId[];
}

/** The chain's rows checked (§3.4: edge roles at the batch's level; an indexed row carries its ordinal). A programming error otherwise. */
function checkRows(roles: readonly RoleRow[]): void {
  for (const r of roles) {
    const id = roleIdOf(r.role);
    check(id >= 0, `no role named ${r.role}`);
    const info = roleInfo(id);
    check(info.kind === 'edge', `${r.role} is a vertex role: insertChain's roles are the chain's edge rows (§3.4; vertex rows are opts.knots)`);
    check(typeof r.entity === 'string' && r.entity.length > 0, 'a row names its entity by a non-empty address id');
    if (info.indexed) check(r.ordinal !== undefined, `an indexed row (${r.role}) carries its ordinal`);
    if (r.ordinal !== undefined) {
      check(Number.isInteger(r.ordinal) && r.ordinal >= 0 && r.ordinal <= MAX_ORDINAL, 'an ordinal is a u16');
      check(info.indexed || r.ordinal === 0, `role ${r.role} is not indexed: its ordinal is 0 (§2.2 rule 7)`);
    }
  }
}


/**
 * Step 2 for one chain vertex at the lattice point `pt` (see the module comment): its landing planned — vertex
 * attraction (M0-a-04's `planAttraction`), candidate (b) where that lands beside a finer vertex, the chain's own corner
 * for a free vertex, the kept-content test of a free vertex — then the merge rule against the previous vertex, then
 * written. Returns the vertex and whether it merged.
 */
export function land(ctx: ChainCtx, pt: LatticePoint, prev: VertexId, prevPt: LatticePoint | null, nextPt: LatticePoint | null): KernelResult<{ vertex: VertexId; merged: boolean }> {
  const { tx, p, n } = ctx;
  const merges = (target: LatticePoint): boolean => prev >= 0 && belowMinEdge(p.vertices.x[prev], p.vertices.y[prev], target.x, target.y);
  const merged = (): KernelResult<{ vertex: VertexId; merged: boolean }> => {
    warn(tx, ctx.warnings, 'W_ATTRACTED', pt);
    return ok({ vertex: prev, merged: true });
  };
  // The third and fourth passes (C-0217): an in-bound landing in place of a far fallback (W_PLACED, W_ATTRACTED).
  const landInBound = (l: InBoundLanding): KernelResult<{ vertex: VertexId; merged: boolean }> => {
    if (merges(l.kind === 'free' ? l.at : landingPoint(p, l))) return merged();
    let v: VertexId;
    if (l.kind === 'free') {
      v = allocVertex(p, l.at, n, 0);
      const fresh = v;
      ctx.undo.push(() => {
        p.vertices.out[fresh] = -1;
        freeVertex(p, fresh);
      });
      indexAdd(p, { kind: ITEM_VERTEX, level: n, slot: v });
      tx.journal.vertices.push(v);
      warn(tx, ctx.warnings, 'W_PLACED', l.at);
    } else v = applyLanding(ctx, l);
    warn(tx, ctx.warnings, 'W_ATTRACTED', pt);
    return ok({ vertex: v, merged: false });
  };
  // A chain given again under a key that already carries a run (item 130 (e)): a point within √2 · attractCm of a vertex
  // of that run lands on it — the bound its first insertion moved it by.
  if (ctx.own != null) {
    const o = nearestOwn(ctx, pt);
    if (!o.ok) return passOn(o);
    if (o.value >= 0) {
      if (o.value === prev || merges(pointOf(p, o.value))) return merged();
      if (p.vertices.x[o.value] !== pt.x || p.vertices.y[o.value] !== pt.y) warn(tx, ctx.warnings, 'W_ATTRACTED', pt);
      return ok({ vertex: o.value, merged: false });
    }
  }
  const plan = planAttraction(tx, pt);
  if (!plan.ok) {
    if (plan.code !== 'E_LEVEL') return passOn(plan);
    // Candidate (b): the vertex lands on a route beside a finer vertex (C-0169 (5), (6) left it here).
    const l = landBesideFiner(ctx, pt);
    if (!l.ok) return passOn(l);
    if (l.value.kind === 'vertex' && l.value.onto === 'fallback') {
      const inBound = stepTwoStrip(ctx, pt, l.value.vertex, prevPt, nextPt);
      if (!inBound.ok) return passOn(inBound);
      if (inBound.value !== null) return landInBound(inBound.value);
    }
    if (merges(landingPoint(p, l.value))) return merged();
    const v = applyLanding(ctx, l.value);
    if (p.vertices.x[v] !== pt.x || p.vertices.y[v] !== pt.y) warn(tx, ctx.warnings, 'W_ATTRACTED', pt);
    return ok({ vertex: v, merged: false });
  }
  const pl = plan.value;
  // A split's sub-edge keeps clearance at its own ends by the placement rule's (iii) (C-0284): a sub-edge that cannot
  // gives the endpoint fallback, a split onto an existing vertex — which the third and fourth passes keep in bound.
  if (pl.kind === 'split' && pl.split.kind === 'existing') {
    const inBound = stepTwoStrip(ctx, pt, pl.split.vertex, prevPt, nextPt);
    if (!inBound.ok) return passOn(inBound);
    if (inBound.value !== null) return landInBound(inBound.value);
  }
  if (pl.kind !== 'free') {
    if (merges(pl.at)) return merged();
    const a = applyAttraction(tx, pl);
    if (!a.ok) return passOn(a);
    if (pl.kind === 'split' && pl.split.kind === 'new') {
      recordSplit(ctx, pl.split.sub, a.value.kind === 'free' ? -1 : a.value.vertex);
      if (a.value.kind !== 'free') ownShapeVertex(ctx, pl.split.sub, a.value.vertex);
    }
    foldWarnings(ctx.warnings, a.warnings);
    check(a.value.kind !== 'free', 'an attraction plan that is not free lands on a vertex');
    return ok({ vertex: a.value.vertex, merged: false });
  }
  // A free vertex: the chain's own acute corner over an existing edge first (step 4's second case).
  if (prevPt !== null && nextPt !== null) {
    const cc = chainCorner(ctx, prevPt, pt, nextPt);
    if (!cc.ok) return passOn(cc);
    if (cc.value !== null) {
      const l = planLanding(tx, cc.value.piece, cc.value.foot.x, cc.value.foot.y);
      if (!l.ok) return passOn(l);
      const at = landingPoint(p, l.value);
      const move = Math.sqrt((at.x - pt.x) * (at.x - pt.x) + (at.y - pt.y) * (at.y - pt.y));
      const w = wedgeOutcome(ctx, move, at);
      if (!w.ok) return passOn(w);
      if (w.value) {
        if (merges(at)) return merged();
        return ok({ vertex: applyLanding(ctx, l.value), merged: false });
      }
      // Beyond 2 · √2 · attractCm a mandatory chain's corner stays where it is: the router places its crossings in turn
      // (C-0202 (3)).
    }
  }
  // Kept content round a free vertex (§3.3): a finer vertex on a route of level ≤ n within attractCm is candidate (b);
  // any other finer geometry within attractCm, or a finer face record round it, refuses E_KEPT.
  const kept = finerNear(ctx, pt);
  if (!kept.ok) return passOn(kept);
  if (kept.value !== null) {
    if (merges(pointOf(p, kept.value))) return merged();
    applyLanding(ctx, { kind: 'vertex', vertex: kept.value, onto: 'finer', warnings: [] });
    warn(tx, ctx.warnings, 'W_ATTRACTED', pt);
    return ok({ vertex: kept.value, merged: false });
  }
  const v = allocVertex(p, pt, n, 0);
  ctx.undo.push(() => {
    p.vertices.out[v] = -1;
    freeVertex(p, v);
  });
  indexAdd(p, { kind: ITEM_VERTEX, level: n, slot: v });
  tx.journal.vertices.push(v);
  return ok({ vertex: v, merged: false });
}

/**
 * The vertex of the chain's own run (`ctx.own`, item 130 (e)) nearest the point within √2 · `attractCm` of it (ties y then
 * x), still live and of level ≤ n; −1 when none. One index query (`insert.attractQueries`).
 */
function nearestOwn(ctx: ChainCtx, pt: LatticePoint): KernelResult<VertexId> {
  const { tx, p, n } = ctx;
  const own = ctx.own;
  if (own == null) return ok(-1);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  let best = -1;
  let bestD = Infinity;
  for (const v of query(p, tx.key, n, segmentBox(pt.x, pt.y, pt.x, pt.y, Math.ceil(Math.sqrt(RELAND_SQ))), { vertices: true }).vertices) {
    if (!own.vertices.has(v) || p.vertices.level[v] > n) continue;
    const d = (X[v] - pt.x) * (X[v] - pt.x) + (Y[v] - pt.y) * (Y[v] - pt.y);
    if (d > RELAND_SQ) continue;
    if (d < bestD || (d === bestD && (Y[v] < Y[best] || (Y[v] === Y[best] && X[v] < X[best])))) {
      best = v;
      bestD = d;
    }
  }
  return ok(best);
}

/**
 * The walk along the chain's own run from a to b (item 130 (e): "its segments follow the run between two landings"): the
 * shortest path by length over level-≤ n route pieces carrying one of the chain's keys, through vertices within the
 * fidelity bound of the input segment pa → pb (ties by the vertex's lattice position, y then x), as its pieces in order;
 * null when the run joins them by no such path. Each vertex expanded is charged to `insert.attractQueries`. Nothing
 * written.
 */
function ownWalk(ctx: ChainCtx, a: VertexId, b: VertexId, pa: LatticePoint, pb: LatticePoint): KernelResult<HalfEdgeId[][] | null> {
  const { tx, p, n } = ctx;
  const own = ctx.own;
  if (own == null) return ok(null);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const dist = new Map<VertexId, number>([[a, 0]]);
  const via = new Map<VertexId, { readonly from: VertexId; readonly path: HalfEdgeId[] }>();
  const done = new Set<VertexId>();
  for (;;) {
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
    for (const h of outgoing(p, u)) {
      if (p.halfEdges.level[h >> 1] > n || !carriesOwnKey(p, own, h)) continue;
      const pc = pieceFrom(p, h, n);
      const w = pc.w;
      if (done.has(w) || !inInputBound(pa, pb, X[w], Y[w])) continue;
      const dw = du + Math.sqrt((X[w] - X[u]) * (X[w] - X[u]) + (Y[w] - Y[u]) * (Y[w] - Y[u]));
      const known = dist.get(w);
      if (known === undefined || dw < known) {
        dist.set(w, dw);
        via.set(w, { from: u, path: pc.path });
      }
    }
  }
  if (!dist.has(b) || a === b) return ok(null);
  const pieces: HalfEdgeId[][] = [];
  for (let v = b; v !== a; ) {
    const step = via.get(v);
    check(step !== undefined, 'a walk along the own run reaches back to its start');
    pieces.push(step.path);
    v = step.from;
  }
  return ok(pieces.reverse());
}

/**
 * Step 2's edge attraction where the foot stands beside a finer vertex (candidate (b)): the nearest level-n route piece
 * within `attractCm` (its foot inside it; ties by the query's canonical order), then its landing (`planLanding`: the
 * endpoint rule, the finer vertex promoted, or the placement). Nothing written.
 */
function landBesideFiner(ctx: ChainCtx, pt: LatticePoint): KernelResult<Landing> {
  const best = nearestPiece(ctx, pt);
  if (!best.ok) return passOn(best);
  check(best.value !== null, 'a landing refused E_LEVEL stands within attractCm of a route piece');
  const pc = best.value;
  const X = ctx.p.vertices.x;
  const Y = ctx.p.vertices.y;
  // The vertex's foot on the piece: the endpoint rule reads it (§3.6 step 2); planLanding re-projects it on the run's
  // own-level route for the placement.
  const foot = footOnSegment(X[pc.a], Y[pc.a], X[pc.b], Y[pc.b], pt.x, pt.y);
  return planLanding(ctx.tx, pc, foot.x, foot.y);
}

/**
 * The nearest level-n route piece within `attractCm` of the point, its foot strictly inside it, or null: a piece a–b at
 * orientation o from the point replaces the best so far, c–d at o', when o² · |cd|² < o'² · |ab|² — exact, cross-
 * multiplied, strict, so of two equally near the first in the query's canonical order. One index query (`insert.attractQueries`). attractVertex.ts's `nearestRoutePiece` reads the same
 * pieces but ranks by the rounded quotient o² ÷ |ab|², which can differ on near-ties and past 2⁵³, so step 2's landing
 * beside a finer vertex keeps this comparison (C-0321 (5)).
 */
export function nearestPiece(ctx: ChainCtx, pt: LatticePoint): KernelResult<Piece | null> {
  const { tx, p, n } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  const box = { minX: pt.x - ATTRACT, minY: pt.y - ATTRACT, maxX: pt.x + ATTRACT, maxY: pt.y + ATTRACT };
  let best: ReturnType<typeof pieceOf> | null = null;
  let bestO2 = 0;
  let bestL2 = 1;
  for (const h of query(p, tx.key, n, box, { edges: true }).edges) {
    const pc = pieceOf(p, h, n);
    const ux = X[pc.b] - X[pc.a];
    const uy = Y[pc.b] - Y[pc.a];
    const l2 = ux * ux + uy * uy;
    const dot = (pt.x - X[pc.a]) * ux + (pt.y - Y[pc.a]) * uy;
    if (!(dot > 0 && dot < l2)) continue;
    const o = ux * (pt.y - Y[pc.a]) - uy * (pt.x - X[pc.a]);
    if (o * o > ATTRACT_SQ * l2) continue;
    if (best === null || o * o * bestL2 < bestO2 * l2) {
      best = pc;
      bestO2 = o * o;
      bestL2 = l2;
    }
  }
  return ok(best);
}

/** The 16 directions `freeSpot` searches along (integer vectors, every 22.5° to within a degree). */
const FREE_DIRS: readonly (readonly [number, number])[] = [
  [1, 0], [12, 5], [1, 1], [5, 12], [0, 1], [-5, 12], [-1, 1], [-12, 5], [-1, 0], [-12, -5], [-1, -1], [-5, -12], [0, -1], [5, -12], [1, -1], [12, -5],
];

/** The third pass's step-2 landing: an existing vertex or a split (`Landing`), or a free vertex of the chain's own at `at`. */
type InBoundLanding = Landing | { readonly kind: 'free'; readonly at: LatticePoint };

/**
 * The free spot for a chain point at `pt` (C-0217): the lattice point nearest `pt` within the fidelity bound (ties y then
 * x) where a free vertex of the chain's own keeps §3.10's clearance — at least `minEdge` from every vertex and every edge
 * — and the kept-content rule (no finer vertex or edge within `attractCm`, no finer face record holding it); null when
 * none does. One index query (`insert.attractQueries`), each point tried charged to `insert.placementCandidates`.
 * Nothing written.
 */
export function freeSpot(ctx: ChainCtx, pt: LatticePoint): KernelResult<LatticePoint | null> {
  const { tx, p, n } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const O = p.halfEdges.origin;
  const r = Math.floor(BOUND);
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  const near = query(p, tx.key, 4, segmentBox(pt.x, pt.y, pt.x, pt.y, r + ATTRACT), { vertices: true, edges: true });
  // The points tried: pt itself, then along 16 directions every centimetre out to the bound — nearest first (ties y then
  // x), each once — so a spot just beyond a strip's far side is found without testing every lattice point of the disc.
  const seen = new Set<string>();
  const pts: { x: number; y: number; d: number }[] = [];
  for (let k = 0; k <= r; k++) {
    for (const [ux, uy] of FREE_DIRS) {
      const len = Math.sqrt(ux * ux + uy * uy);
      const sx = ratio(k * ux, len, 'length');
      const sy = ratio(k * uy, len, 'length');
      check(sx.ok && sy.ok, 'a search direction has a length of at least 1');
      const x = pt.x + Math.floor(sx.value + 0.5);
      const y = pt.y + Math.floor(sy.value + 0.5);
      const d = (x - pt.x) * (x - pt.x) + (y - pt.y) * (y - pt.y);
      const key = `${x},${y}`;
      if (d > FIDELITY_SQ || seen.has(key)) continue;
      seen.add(key);
      pts.push({ x, y, d });
    }
  }
  pts.sort((u, w) => u.d - w.d || u.y - w.y || u.x - w.x);
  const edges = near.edges.map((h) => [O[h], O[h ^ 1], p.halfEdges.level[h >> 1]] as const);
  for (const q of pts) {
    if (!charge(tx, INSERT_PLACEMENT_CANDIDATES, 1)) return workLimitHit(INSERT_PLACEMENT_CANDIDATES);
    let fine = true;
    for (const v of near.vertices) {
      const d = (X[v] - q.x) * (X[v] - q.x) + (Y[v] - q.y) * (Y[v] - q.y);
      if (belowMinEdge(X[v], Y[v], q.x, q.y) || (L[v] > n && d <= ATTRACT_SQ)) {
        fine = false;
        break;
      }
    }
    if (!fine) continue;
    for (const [u, w, m] of edges) {
      if (m > n ? withinSegment(q.x, q.y, X[u], Y[u], X[w], Y[w], ATTRACT) : segmentCloserThan(q.x, q.y, X[u], Y[u], X[w], Y[w], LATTICE.minEdgeCm)) {
        fine = false;
        break;
      }
    }
    if (!fine) continue;
    if (n < 4) {
      const held = recordHolding(ctx, n + 1, 2 * q.x, 2 * q.y);
      if (held === OVER_LIMIT) return workLimitHit(TX_FACES_WALKED);
      if (held >= 0) continue;
    }
    return ok(lattice(q.x, q.y));
  }
  return ok(null);
}

/** The reach of the third pass's in-bound placements: the fidelity bound, 2 · √2 · `attractCm`. */
const BOUND = Math.sqrt(FIDELITY_SQ);

/**
 * The third and fourth passes for step 2 (C-0217; `ctx.strip`): a chain vertex at `pt` whose landing is the placement
 * rule's endpoint fallback `v` beyond the fidelity bound of `pt` — no route through `v` can keep the bound — lands within
 * the bound instead,
 * by the first of these that finds a place (the first reading in this order, the second with the free spot first):
 * across the thin strip — on a level-n route piece within the bound of `pt` (nearest first), the far side's sub-edge left
 * out of (iii): an edge the chain's segment from `prevPt` or to `nextPt` crosses there, which the router then joins to
 * the new vertex (`placeOnRun`, within `attractCm`, then within the bound); the nearer to `pt` of the nearest piece's
 * nearest qualifying point within the bound and the nearest existing vertex of level ≤ n within it; a free spot
 * (`freeSpot`). Every one reports W_PLACED. Null outside the third pass, when `v` is within the bound, or when nothing
 * qualifies. Nothing written; refuses only E_WORK_LIMIT.
 */
function stepTwoStrip(ctx: ChainCtx, pt: LatticePoint, v: VertexId, prevPt: LatticePoint | null, nextPt: LatticePoint | null): KernelResult<InBoundLanding | null> {
  if (ctx.strip == null) return ok(null);
  const { tx, p, n } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  if ((X[v] - pt.x) * (X[v] - pt.x) + (Y[v] - pt.y) * (Y[v] - pt.y) <= FIDELITY_SQ) return ok(null);
  const admit = (qx: number, qy: number): boolean => (qx - pt.x) * (qx - pt.x) + (qy - pt.y) * (qy - pt.y) <= FIDELITY_SQ;
  // The edges round pt (every level: clearance reads them all) and the level-n route pieces within the bound of pt.
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 2)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  const box = segmentBox(pt.x, pt.y, pt.x, pt.y, Math.ceil(BOUND));
  const pieces: { pc: Piece; d: number }[] = [];
  for (const h of query(p, tx.key, n, box, { edges: true }).edges) {
    const pc = pieceOf(p, h, n);
    const d = segmentDistance(pt.x, pt.y, X[pc.a], Y[pc.a], X[pc.b], Y[pc.b]);
    if (d * d <= FIDELITY_SQ) pieces.push({ pc, d });
  }
  pieces.sort((u, w) => u.d - w.d || Y[u.pc.a] - Y[w.pc.a] || X[u.pc.a] - X[w.pc.a] || Y[u.pc.b] - Y[w.pc.b] || X[u.pc.b] - X[w.pc.b]);
  // The edges a chain segment at pt crosses within the bound of pt, nearest pt first: a strip's far side.
  const crossed: { e: [VertexId, VertexId]; d: number }[] = [];
  for (const h of query(p, tx.key, 4, box, { edges: true }).edges) {
    const u = O[h];
    const w = O[h ^ 1];
    for (const q of [prevPt, nextPt]) {
      if (q === null || !segmentsMeet(pt.x, pt.y, q.x, q.y, X[u], Y[u], X[w], Y[w])) continue;
      crossed.push({ e: [u, w], d: segmentDistance(pt.x, pt.y, X[u], Y[u], X[w], Y[w]) });
      break;
    }
  }
  crossed.sort((u, w) => u.d - w.d);
  // Across the strip: the vertex on a piece near pt, the far side's sub-edge — an edge the chain crosses there, not of
  // the piece's own route — left out of (iii); the nearest piece first, within attractCm and then the bound.
  const across = (): KernelResult<Landing | null> => {
    for (const { pc } of pieces) {
      const route = routeBetween(p, pc.a, pc.b, n);
      const own = new Set<number>((route ?? []).map((h) => h >> 1));
      const partner = crossed.find((c) => {
        for (const h of outgoing(p, c.e[0])) if (O[h ^ 1] === c.e[1]) return !own.has(h >> 1);
        return false;
      });
      if (partner === undefined) continue;
      const foot = footOnSegment(X[pc.a], Y[pc.a], X[pc.b], Y[pc.b], pt.x, pt.y);
      for (const reach of [ATTRACT, BOUND]) {
        const r = placeOnRun(ctx, pc.edge, foot, { a: -1, b: -1, partner: partner.e, reach, passOver: true, admit });
        if (!r.ok) return passOn(r);
        if (r.value !== null) return ok(r.value);
      }
    }
    return ok(null);
  };
  // The nearer to pt of the nearest piece's nearest qualifying point within the bound and the nearest existing vertex of
  // level ≤ n within it (the endpoint fallback's own kind of landing, on the nearest vertex instead of the sub-edge's far
  // end).
  const nearest = (): KernelResult<Landing | null> => {
    let placed: Landing | null = null;
    if (pieces.length > 0) {
      const pc = pieces[0].pc;
      const foot = footOnSegment(X[pc.a], Y[pc.a], X[pc.b], Y[pc.b], pt.x, pt.y);
      const r = placeOnRun(ctx, pc.edge, foot, { a: -1, b: -1, partner: null, reach: BOUND, passOver: true, admit });
      if (!r.ok) return passOn(r);
      placed = r.value;
    }
    const w = nearestVertexWithin(ctx, pt, (u) => u === v);
    if (!w.ok) return passOn(w);
    if (w.value < 0) return ok(placed);
    const wd = (X[w.value] - pt.x) * (X[w.value] - pt.x) + (Y[w.value] - pt.y) * (Y[w.value] - pt.y);
    if (placed !== null) {
      const at = landingPoint(p, placed);
      if ((at.x - pt.x) * (at.x - pt.x) + (at.y - pt.y) * (at.y - pt.y) <= wd) return ok(placed);
    }
    return ok({ kind: 'vertex', vertex: w.value, onto: 'fallback', warnings: [{ code: 'W_PLACED', count: 1, at: pointOf(p, w.value) }] });
  };
  const free = (): KernelResult<InBoundLanding | null> => {
    const f = freeSpot(ctx, pt);
    if (!f.ok) return passOn(f);
    return ok(f.value === null ? null : { kind: 'free', at: f.value });
  };
  // The first reading tries the strip, then the nearest landing, then a free spot; the second (a chain the first refused)
  // the free spot first.
  const order = ctx.strip.variant === 1 ? [free, nearest, across] : [across, nearest, free];
  for (const f of order) {
    const r = f();
    if (!r.ok) return passOn(r);
    if (r.value !== null) return ok(r.value);
  }
  return ok(null);
}


/**
 * The finer geometry round a free vertex: the nearest finer vertex on a route of level ≤ n within `attractCm` (candidate
 * (b)), or null; E_KEPT where a finer vertex off those routes or a finer edge stands within `attractCm`, or a finer face
 * record holds the point.
 */
function finerNear(ctx: ChainCtx, pt: LatticePoint): KernelResult<VertexId | null> {
  const { tx, p, n } = ctx;
  if (n === 4) return ok(null);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const O = p.halfEdges.origin;
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  const near = query(p, tx.key, 4, segmentBox(pt.x, pt.y, pt.x, pt.y, ATTRACT), { vertices: true, edges: true });
  let best = -1;
  let bestD = Infinity;
  for (const v of near.vertices) {
    if (L[v] <= n) continue;
    const d = (X[v] - pt.x) * (X[v] - pt.x) + (Y[v] - pt.y) * (Y[v] - pt.y);
    if (d > ATTRACT_SQ) continue;
    if (!onRouteOfLevel(p, v, n)) return passOn({ code: 'E_KEPT', detail: `a chain vertex within attractCm of a finer vertex at (${X[v]}, ${Y[v]}) (kept content)` });
    if (d < bestD || (d === bestD && (Y[v] < Y[best] || (Y[v] === Y[best] && X[v] < X[best])))) {
      best = v;
      bestD = d;
    }
  }
  if (best >= 0) return ok(best);
  for (const h of near.edges) {
    if (p.halfEdges.level[h >> 1] <= n) continue;
    if (withinSegment(pt.x, pt.y, X[O[h]], Y[O[h]], X[O[h ^ 1]], Y[O[h ^ 1]], ATTRACT)) {
      return passOn({ code: 'E_KEPT', detail: `a chain vertex within attractCm of a finer edge at (${X[O[h]]}, ${Y[O[h]]}) (kept content)` });
    }
  }
  const held = recordHolding(ctx, n + 1, 2 * pt.x, 2 * pt.y);
  if (held === OVER_LIMIT) return workLimitHit(TX_FACES_WALKED);
  if (held >= 0) return passOn({ code: 'E_KEPT', detail: `a chain vertex inside a finer face at (${pt.x}, ${pt.y}) (kept content)` });
  return ok(null);
}

/** How far a free chain vertex may be re-landed (C-0209): §3.6's attracted bound √2 · attractCm, squared (exact). */
const RELAND_SQ = 2 * ATTRACT_SQ;
/** How many times a segment no route keeps in bound is halved at most (the split route, C-0215: up to four pieces). */
const SPLIT_DEPTH = 2;
/** A refusal as a callee gives it. */
type Refusal = { readonly code: Parameters<typeof passOn>[0]['code']; readonly detail: string };
/**
 * The end of the detail an optional chain's refusal for the fidelity bound carries (`routeOne`, C-0221). A message text
 * the registers and tests pin, kept as written.
 */
const BOUND_DETAIL = 'leaves the fidelity bound (N-43)';

/**
 * Is the refusal one the fidelity bound caused (C-0221)? E_INVARIANT — no route keeps §3.10 within the bound — or an
 * optional chain's E_BELOW_MIN_EDGE whose every route keeping clearance leaves the bound. The split route and the third
 * and fourth passes serve both alike, and a refusal keeps the code it was given when none of them commits. B-FUZZ's
 * `countedRefusal` (caps.ts) states the same predicate independently.
 */
export function boundRefusal(r: Refusal): boolean {
  return r.code === 'E_INVARIANT' || (r.code === 'E_BELOW_MIN_EDGE' && r.detail.includes(BOUND_DETAIL));
}
/** How many re-landing candidates one free end tries (nearest first), bounding a last resort's work. */
const RELAND_MAX = 8;

/**
 * The re-landing candidates (C-0209) for a free chain vertex at the input point `pt` that no route reaches with clearance kept: the
 * live vertices of level ≤ n within √2 · `attractCm` of `pt` — the bound §3.6 gives an incoming vertex moved onto an
 * edge's endpoint — other than `other` (the segment's other end, −1 for none), and none standing closer than `minEdge`
 * to it without a route piece joining them (no edge could join them); nearest first, ties y then x, at most 8. One index
 * query (`insert.attractQueries`).
 */
export function relandCandidates(ctx: ChainCtx, pt: LatticePoint, other: VertexId): KernelResult<VertexId[]> {
  const { tx, p, n } = ctx;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  if (!charge(tx, INSERT_ATTRACT_QUERIES, 1)) return workLimitHit(INSERT_ATTRACT_QUERIES);
  const reach = Math.ceil(Math.sqrt(RELAND_SQ));
  const found: { v: VertexId; d: number }[] = [];
  for (const v of query(p, tx.key, 4, segmentBox(pt.x, pt.y, pt.x, pt.y, reach), { vertices: true }).vertices) {
    if (p.vertices.level[v] > n || v === other) continue;
    const d = (X[v] - pt.x) * (X[v] - pt.x) + (Y[v] - pt.y) * (Y[v] - pt.y);
    if (d > RELAND_SQ) continue;
    if (other >= 0 && belowMinEdge(X[v], Y[v], X[other], Y[other]) && routeBetween(p, other, v, n) === null) continue;
    found.push({ v, d });
  }
  found.sort((u, w) => u.d - w.d || Y[u.v] - Y[w.v] || X[u.v] - X[w.v]);
  return ok(found.slice(0, RELAND_MAX).map((f) => f.v));
}

/** Did the op place v free since the mark — a new vertex of its own with no edge yet (the re-landing reads it, C-0209)? */
export function freeSince(ctx: ChainCtx, m: Pick<Mark, 'vertices'>, v: VertexId): boolean {
  return ctx.p.vertices.out[v] === -1 && ctx.tx.journal.vertices.slice(m.vertices).includes(v);
}

/** Where a chain's writes stand: the undo log, the journals, the index log, the warnings — what `rollback` returns to. */
export interface Mark {
  readonly undo: number;
  readonly vertices: number;
  readonly pairs: number;
  readonly split: number;
  readonly changed: number;
  readonly steiner: number;
  readonly newPairs: number;
  readonly shared: number;
  readonly promoted: number;
  readonly materialised: number;
  readonly faces: readonly (readonly [number, number, number])[];
  readonly log: number;
  readonly txWarnings: readonly Warning[];
  readonly own: readonly Warning[];
  readonly maxPass: number;
  readonly passes: number;
  /** `ChainCtx.reentry` then: a retrace noted by a reading undone since is no longer noted. */
  readonly reentry: boolean;
}

type IndexLog = NonNullable<ReturnType<typeof indexOf>['log']>;

function markOf(ctx: ChainCtx, log: IndexLog): Mark {
  const J = ctx.tx.journal;
  const C = ctx.journal;
  return {
    undo: ctx.undo.length, vertices: J.vertices.length, pairs: J.pairs.length, split: J.split.length, changed: J.changed.length, steiner: J.steiner,
    newPairs: C.newPairs.length, shared: C.sharedPairs.length, promoted: C.promoted.length, materialised: C.materialised.length,
    faces: C.faces.map((f) => [f.created.length, f.changed.length, f.removed.length] as const),
    log: log.writes.length, txWarnings: cloneWarnings(ctx.tx.warnings), own: cloneWarnings(ctx.warnings), maxPass: ctx.maxPass, passes: C.passes,
    reentry: ctx.reentry === true,
  };
}

/**
 * Undoes every write since the mark, last first; then re-enters every index item written since as the arena now stands
 * (its static copy tombstoned, the item in its level's grid, or deleted), so the index answers as at the mark (§3.3);
 * the journals and both warning lists go back to the mark (C-0177 (8)).
 */
function rollback(ctx: ChainCtx, log: IndexLog, m: Mark): void {
  const p = ctx.p;
  for (let i = ctx.undo.length - 1; i >= m.undo; i--) ctx.undo[i]();
  ctx.undo.length = m.undo;
  const seen = new Set<string>();
  for (const w of log.writes.slice(m.log)) {
    const key = `${w.kind}:${w.level}:${w.slot}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const item = { kind: w.kind, level: w.level, slot: w.slot };
    if (isItemLive(p, item)) indexChange(p, item);
    else indexDelete(p, item);
  }
  const J = ctx.tx.journal;
  J.vertices.length = m.vertices;
  J.pairs.length = m.pairs;
  J.split.length = m.split;
  J.changed.length = m.changed;
  J.steiner = m.steiner;
  const C = ctx.journal;
  C.newPairs.length = m.newPairs;
  C.sharedPairs.length = m.shared;
  C.promoted.length = m.promoted;
  C.materialised.length = m.materialised;
  C.faces.forEach((f, l) => {
    f.created.length = m.faces[l][0];
    f.changed.length = m.faces[l][1];
    f.removed.length = m.faces[l][2];
  });
  C.passes = m.passes;
  ctx.maxPass = m.maxPass;
  ctx.reentry = m.reentry;
  ctx.tx.warnings.length = 0;
  for (const w of cloneWarnings(m.txWarnings)) ctx.tx.warnings.push(w);
  ctx.warnings.length = 0;
  for (const w of cloneWarnings(m.own)) ctx.warnings.push(w);
}

/**
 * §3.10's clearance over everything written since the mark, whole (C-0209, C-0215): every new edge and every edge at a
 * new vertex — the two sub-edges of each split among them — against the vertices round it, and every new vertex and its
 * neighbours (and `also`) against the edges round them; read on the arena as it stands. A split takes its sub-edge's
 * ends out of each other's one-ring, so a third vertex beside the split edge (its one-ring reached the far end through a
 * neighbour) is judged too, not only the chain's own new edges. The first problem found, or null.
 */
function wholeProblem(ctx: ChainCtx, m: Mark, also: readonly VertexId[] = []): string | null {
  const p = ctx.p;
  const pairs = new Set<number>(ctx.journal.newPairs.slice(m.newPairs));
  const ends: VertexId[] = [...also];
  for (const v of ctx.tx.journal.vertices.slice(m.vertices)) {
    if (!isVertexLive(p, v)) continue;
    ends.push(v);
    for (const h of outgoing(p, v)) {
      pairs.add(h >> 1);
      ends.push(p.halfEdges.origin[h ^ 1]);
    }
  }
  return clearanceProblem(ctx, [...pairs], ends);
}

export { FIDELITY_SQ };
const FIDELITY = Math.sqrt(FIDELITY_SQ);
/** How many distance evaluations the segment-to-route half of the bound may take before it judges the route out of it. */
const FIDELITY_EVALS = 4096;

/**
 * The fidelity bound (C-0215): does the route written since the mark — the segment's new and shared edges, every stretch join
 * and leave point and every finer vertex of a shared piece among their ends — stay within 2 · √2 · `attractCm` of the
 * input segment pa → pb, as a Hausdorff distance both ways? Route to segment: the distance to a segment is convex along
 * an edge, so the route's vertices decide it (exactly, on lattice points: every squared distance and dot product here
 * is an integer below 2⁵³). Segment to route: the route is one connected path from a to b whose vertices all stand
 * within the bound, so every point of the segment whose foot lies between the route's two extreme feet has a route point
 * on its perpendicular, within the bound by the first half; the two end pieces beyond those feet are bisected on the
 * distance to the route (1-Lipschitz along the segment: an interval [t₀, t₁] is within the bound when (d₀ + d₁ + its
 * length) / 2 is), at most 4 096 evaluations, after which the route is judged out of the bound — never committed on a
 * guess (C-0215).
 */
export function inFidelity(ctx: ChainCtx, m: Pick<Mark, 'newPairs' | 'shared'>, pa: LatticePoint, pb: LatticePoint): boolean {
  const p = ctx.p;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const pairs = [...ctx.journal.newPairs.slice(m.newPairs), ...ctx.journal.sharedPairs.slice(m.shared)];
  const dx = pb.x - pa.x;
  const dy = pb.y - pa.y;
  const l2 = dx * dx + dy * dy;
  let tMin = Infinity;
  let tMax = -Infinity;
  for (const e of pairs) {
    for (const v of [O[2 * e], O[2 * e + 1]]) {
      const vx = X[v] - pa.x;
      const vy = Y[v] - pa.y;
      const dot = vx * dx + vy * dy;
      let d2: number;
      if (dot <= 0 || l2 === 0) d2 = vx * vx + vy * vy;
      else if (dot >= l2) d2 = (X[v] - pb.x) * (X[v] - pb.x) + (Y[v] - pb.y) * (Y[v] - pb.y);
      else {
        const o = vx * dy - vy * dx;
        if (o * o > FIDELITY_SQ * l2) return false;
        d2 = 0;
      }
      if (d2 > FIDELITY_SQ) return false;
      if (dot < tMin) tMin = dot;
      if (dot > tMax) tMax = dot;
    }
  }
  if (pairs.length === 0) return false;
  if (l2 === 0) return true;
  const len = Math.sqrt(l2);
  const dist = (t: number): number => {
    const qx = pa.x + t * dx;
    const qy = pa.y + t * dy;
    let best = Infinity;
    for (const e of pairs) {
      const d = segmentDistance(qx, qy, X[O[2 * e]], Y[O[2 * e]], X[O[2 * e + 1]], Y[O[2 * e + 1]]);
      if (d < best) best = d;
    }
    return best;
  };
  let evals = 0;
  const covered = (t0: number, t1: number): boolean => {
    const stack: [number, number, number, number][] = [[t0, dist(t0), t1, dist(t1)]];
    evals += 2;
    while (stack.length > 0) {
      const [u0, d0, u1, d1] = stack.pop() as [number, number, number, number];
      if (d0 > FIDELITY || d1 > FIDELITY) return false;
      if (d0 + d1 + (u1 - u0) * len <= 2 * FIDELITY) continue;
      if (evals >= FIDELITY_EVALS) return false;
      const um = 0.5 * (u0 + u1);
      const dm = dist(um);
      evals += 1;
      stack.push([u0, d0, um, dm], [um, dm, u1, d1]);
    }
    return true;
  };
  const lo = ratio(tMin, l2, 'area');
  const hi = ratio(tMax, l2, 'area');
  if (!lo.ok || !hi.ok) return false;
  if (tMin > 0 && !covered(0, Math.min(1, lo.value))) return false;
  if (tMax < l2 && !covered(Math.max(0, hi.value), 1)) return false;
  return true;
}

/**
 * One chain segment a → b, from the input segment pa → pb, routed and checked (`routeOne`). In the third and fourth
 * passes `ctx.strip` carries pa → pb for the segment's in-bound landings (C-0217), restored after, as the segment's
 * routes may nest.
 */
function routeSegment(ctx: ChainCtx, log: IndexLog, a: VertexId, b: VertexId, pa: LatticePoint, pb: LatticePoint): KernelResult<null> {
  const st = ctx.strip ?? null;
  if (st === null) return routeOne(ctx, log, a, b, pa, pb);
  ctx.strip = { variant: st.variant, a: pa, b: pb };
  const r = routeOne(ctx, log, a, b, pa, pb);
  ctx.strip = st;
  return r;
}

/**
 * The readings of one segment a → b (input pa → pb), tried in order until one is kept — §3.10's clearance whole
 * (`wholeProblem`) and the fidelity bound (`inFidelity`) — each undone before the next:
 *
 *   r0  the walk along the chain's own run, between two landings on it (`ownWalk`)    every pass       item 130 (e)
 *   r1  the design route (steps 3 – 4, `snapRound`)                                    every pass       C-0177
 *   r2  the strict route (step 3 only through vertices within `minEdge`, `ctx.strict`) every pass     C-0177 (13)
 *   r2b the strict route passing over the neighbours of the segment's own ends
 *       (`ctx.strictEnds`)                                                           every pass       C-0361
 *   r3  the route along existing edges (`routeAlongExisting`)                        every pass       C-0177 (13)
 *   r4  the endpoint route (every crossing on its endpoint fallback, `ctx.endpointCrossings`; §3.6: "each such
 *       re-route lands on an existing vertex, so the loop ends"; a commit reports W_PLACED)  every pass  C-0202 (1)
 *   r5  the route across a sliver (`ctx.acrossSlivers`, `placeAcross`; W_PLACED)        every pass       C-0209
 *   r6  the anchored route, reach `attractCm` (`ctx.anchor`)                          from pass 2      C-0215
 *   r7  the anchored route, reach the fidelity bound                                  from pass 2      C-0215
 *
 * In the third and fourth passes every reading also reads `ctx.strip`, and the segment's two ends are judged with it (a
 * vertex step 2 placed across a strip keeps clearance only once a route joins it to the strip's far side). A refusal of
 * r1, of r3, or of r2 when r3 keeps nothing, is the segment's; so is a refusal of r4 other than E_INVARIANT when r5 – r7
 * keep nothing. A segment no reading keeps is refused E_INVARIANT — or, from the second pass, for an optional chain whose
 * routes kept clearance only beyond the bound, E_BELOW_MIN_EDGE naming it — never thrown; insertChain then re-lands a
 * free end (C-0209) or splits the segment (C-0215).
 */
function routeOne(ctx: ChainCtx, log: IndexLog, a: VertexId, b: VertexId, pa: LatticePoint, pb: LatticePoint): KernelResult<null> {
  const outer = ctx.path ?? null;
  const prov = ctx.provenance ?? null;
  const r = readings(ctx, log, a, b, pa, pb);
  ctx.path = outer;
  ctx.provenance = prov;
  return r;
}

/**
 * The chain's path before the segment a → b (item 130 (d) on the chain's path): the ends of every new and shared edge the run
 * has written since its start (`ChainCtx.runStart`) — its landed points among them — but a and b. Read on the journal as
 * it stands, so a reading, a re-landing or a split half undone is no longer part of it.
 */
function priorPath(ctx: ChainCtx, a: VertexId, b: VertexId): Set<VertexId> {
  const prior = new Set<VertexId>();
  const rs = ctx.runStart ?? null;
  if (rs === null) return prior;
  const p = ctx.p;
  const O = p.halfEdges.origin;
  for (const e of [...ctx.journal.newPairs.slice(rs.newPairs), ...ctx.journal.sharedPairs.slice(rs.shared)]) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    for (const v of [O[2 * e], O[2 * e + 1]]) if (v !== a && v !== b) prior.add(v);
  }
  return prior;
}

/** The pairs of the run's committed route so far (`ChainCtx.runStart`): its new and shared edges. */
function priorPairs(ctx: ChainCtx): Set<number> {
  const rs = ctx.runStart ?? null;
  return rs === null ? new Set() : new Set([...ctx.journal.newPairs.slice(rs.newPairs), ...ctx.journal.sharedPairs.slice(rs.shared)]);
}

/** The router (`snapRound`) on a → b with a fresh path (item 130 (d): the route never re-enters a vertex of it). */
function routed(ctx: ChainCtx, log: IndexLog, a: VertexId, b: VertexId): KernelResult<null> {
  const J = ctx.tx.journal;
  const C = ctx.journal;
  const v0 = J.vertices.length;
  const p0 = C.promoted.length;
  const placedBefore = (v: VertexId, m: unknown): boolean => {
    const i = J.vertices.indexOf(v, v0);
    const k = C.promoted.indexOf(v, p0);
    return (i >= 0 && i < (m as Mark).vertices) || (k >= 0 && k < (m as Mark).promoted);
  };
  ctx.path = { order: [], marks: new Map(), mark: () => markOf(ctx, log), back: (m) => rollback(ctx, log, m as Mark), placedBefore, end: b, cuts: 0, restart: null };
  ctx.provenance = new Map();
  return snapRound(ctx, a, b);
}

/**
 * The refusal a pass gives in place of a commit whose route retraced the chain's own path before a segment (item 130 (d)
 * on the chain's path; `ChainCtx.chainPath`): read by insertChain's passes, never returned by the op.
 */
const REENTRY_DETAIL = 'insert: the chain re-enters its own path';

/** Has a kept reading of this pass retraced an edge of the chain's path (`ChainCtx.reentry`)? */
function retracedNow(ctx: ChainCtx): boolean {
  return ctx.reentry === true;
}

/** Is r a pass's refusal for a retrace of the chain's own path (`REENTRY_DETAIL`)? */
function reentered(r: KernelResult<unknown>): boolean {
  return !r.ok && r.code === 'E_INVARIANT' && r.detail === REENTRY_DETAIL;
}

/** A route refused for a re-entry of its own path it could neither cut nor avoid (item 130 (d)): a route that keeps nothing. */
function retraced(r: KernelResult<null>): boolean {
  return !r.ok && r.code === 'E_INVARIANT' && r.detail.startsWith(RETRACE_DETAIL);
}

/** `routeOne`'s readings in order (see there). */
function readings(ctx: ChainCtx, log: IndexLog, a: VertexId, b: VertexId, pa: LatticePoint, pb: LatticePoint): KernelResult<null> {
  const m = markOf(ctx, log);
  // Whether some route kept §3.10 but left the fidelity bound: an optional chain is then refused for precision.
  let outOfBound = false;
  // The third and fourth passes judge the segment's two ends too (C-0217).
  const ends: readonly VertexId[] = ctx.strip != null ? [a, b] : [];
  let problem: string | null = null;
  // The chain's path before the segment (item 130 (d) on the chain's path, `ChainCtx.chainPath`): a kept reading whose
  // route shares an edge of it again — a retraced edge — is noted (`ChainCtx.reentry`); the run loop cuts it back.
  const done: ReadonlySet<number> = ctx.chainPath != null ? priorPairs(ctx) : new Set();
  const retraces = (): boolean => {
    if (done.size === 0) return false;
    for (let i = m.shared; i < ctx.journal.sharedPairs.length; i++) if (done.has(ctx.journal.sharedPairs[i])) return true;
    return false;
  };
  const kept = (): boolean => {
    problem = wholeProblem(ctx, m, ends);
    if (problem !== null) return false;
    if (inFidelity(ctx, m, pa, pb)) {
      if (retraces()) ctx.reentry = true;
      return true;
    }
    outOfBound = true;
    return false;
  };
  // r0: a segment between two landings on the chain's own run follows the run (item 130 (e)).
  if (ctx.own != null && ctx.own.vertices.has(a) && ctx.own.vertices.has(b)) {
    const w = ownWalk(ctx, a, b, pa, pb);
    if (!w.ok) return passOn(w);
    if (w.value !== null) {
      for (const piece of w.value) share(ctx, piece);
      if (kept()) return ok(null);
      rollback(ctx, log, m);
    }
  }
  const r1 = routed(ctx, log, a, b);
  if (!r1.ok && !retraced(r1)) return r1;
  if (r1.ok && kept()) return r1;
  // The class of a refusal (§13.1 (3): its cause, the provenance of the failing route's farthest vertex) is read on the
  // design route, before it is undone.
  const cause = refusalClass(ctx, m, a, b, pa, pb, problem);
  rollback(ctx, log, m);
  ctx.strict = true;
  const r2 = routed(ctx, log, a, b);
  ctx.strict = false;
  if (r2.ok && kept()) return r2;
  rollback(ctx, log, m);
  // r2b: the strict route passing over the neighbours of the segment's own ends (C-0361), after r2, so a segment r2
  // keeps routes as before; its refusal is never the segment's (r2's is, below).
  ctx.strict = true;
  ctx.strictEnds = true;
  const r2b = routed(ctx, log, a, b);
  ctx.strict = false;
  ctx.strictEnds = false;
  if (r2b.ok && kept()) return r2b;
  rollback(ctx, log, m);
  const r3 = routeAlongExisting(ctx, a, b);
  if (!r3.ok) return passOn(r3);
  if (r3.value) {
    if (kept()) return ok(null);
    rollback(ctx, log, m);
  }
  if (!r2.ok && !retraced(r2)) return r2;
  // r4: without a crossing the endpoint route is the design route, which failed above, so a commit here always reports
  // W_PLACED.
  ctx.endpointCrossings = true;
  const r4 = routed(ctx, log, a, b);
  ctx.endpointCrossings = false;
  if (r4.ok && kept()) return r4;
  rollback(ctx, log, m);
  // r5: a sliver's near crossing, which the placement can only send to its endpoint fallback — however far along the
  // edge — is placed across the sliver; without such a crossing this route is the design route, so a commit reports
  // W_PLACED.
  ctx.acrossSlivers = true;
  const r5 = routed(ctx, log, a, b);
  ctx.acrossSlivers = false;
  if (r5.ok && kept()) return r5;
  rollback(ctx, log, m);
  // r6, r7: the design route anchored to the input segment — step 3's contacts only where they also lie within reach of
  // pa → pb, so a run of contacts along a near-parallel chain cannot carry the route beyond the bound.
  if (ctx.extended === true) {
    ctx.anchor = { a: pa, b: pb, reach: ATTRACT };
    const r6 = routed(ctx, log, a, b);
    ctx.anchor = null;
    if (r6.ok && kept()) return r6;
    rollback(ctx, log, m);
    ctx.anchor = { a: pa, b: pb, reach: FIDELITY };
    const r7 = routed(ctx, log, a, b);
    ctx.anchor = null;
    if (r7.ok && kept()) return r7;
    rollback(ctx, log, m);
  }
  if (!r4.ok && r4.code !== 'E_INVARIANT') return r4;
  const X = ctx.p.vertices.x;
  const Y = ctx.p.vertices.y;
  if (outOfBound && ctx.extended === true) {
    // An optional chain's route beyond the bound is a precision refusal, as a wedge route beyond attractCm (§3.6
    // *Chain classes*, C-0221); a mandatory chain's is E_INVARIANT, counted (C-0215). Both detail texts are pinned.
    const o = classOutcome(ctx.cls, 'wedgeBeyondAttract');
    if ('refuse' in o) return err('E_BELOW_MIN_EDGE', `every route from (${X[a]}, ${Y[a]}) to (${X[b]}, ${Y[b]}) keeping clearance ${BOUND_DETAIL}; ${cause}`);
  }
  return err('E_INVARIANT', `insert: no route from (${X[a]}, ${Y[a]}) to (${X[b]}, ${Y[b]}) keeps clearance (§3.10) within the fidelity bound (N-43); ${cause}`);
}

/**
 * The residual classes of the router's refusal for the bound (§13.1 (3), by the provenance of the failing route's
 * farthest vertex; C-0221's KI-1, named as notBuilt #2, milestone M4, in this item's notes): S — a crossing on the
 * placement rule's endpoint fallback, no point of the crossed run near it keeping clearance (a sliver or fan of edges
 * closer than `minEdge`); D — a step-3 contact (a vertex, a contact point, a stretch's end) carrying the route off; W — a
 * wedge corner or a corner's exit; P — a crossing placed on its run; A — a vertex of an existing piece the route shares;
 * E — the segment's own end, landed off its input segment; V — every vertex within the bound, the segment not covered
 * (the segment-to-route half of the bound); C — the design route breaks §3.10's clearance.
 */
const CLASS_OF: Readonly<Record<Provenance | 'arena', string>> = {
  fallback: 'S', contact: 'D', stretch: 'D', corner: 'W', exit: 'W', placed: 'P', endpoint: 'P', arena: 'A',
};

/**
 * The class of a segment's refusal for the bound, read on its design route (written since the mark): `class C: <the
 * clearance problem>` where the route breaks §3.10, else `class X: the design route's farthest vertex (x, y), d cm off`
 * by that vertex's provenance (`CLASS_OF`). Text only; deterministic on the arena and the input.
 */
function refusalClass(ctx: ChainCtx, m: Pick<Mark, 'newPairs' | 'shared'>, a: VertexId, b: VertexId, pa: LatticePoint, pb: LatticePoint, problem: string | null): string {
  if (problem !== null) return `class C (notBuilt #2, M4): the design route breaks clearance — ${problem}`;
  const p = ctx.p;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  let far = -1;
  let farD = -1;
  for (const e of [...ctx.journal.newPairs.slice(m.newPairs), ...ctx.journal.sharedPairs.slice(m.shared)]) {
    for (const v of [O[2 * e], O[2 * e + 1]]) {
      const d = segmentDistance(X[v], Y[v], pa.x, pa.y, pb.x, pb.y);
      if (d > farD || (d === farD && (Y[v] < Y[far] || (Y[v] === Y[far] && X[v] < X[far])))) {
        far = v;
        farD = d;
      }
    }
  }
  if (far < 0) return 'class A (notBuilt #2, M4): the design route writes nothing';
  const k = farD <= FIDELITY ? 'V' : far === a || far === b ? 'E' : CLASS_OF[ctx.provenance?.get(far) ?? 'arena'];
  return `class ${k} (notBuilt #2, M4): the design route's farthest vertex (${X[far]}, ${Y[far]}), ${farD.toFixed(1)} cm off`;
}

/**
 * §3.4's `insertChain(tx, points, roles, cls, opts)` (see the module comment). `roles` are the chain's edge rows, every
 * new and shared edge gaining each at the batch's level; `opts.knots` its vertex rows.
 */
export function insertChain(tx: InsertTx, points: readonly { readonly x: number; readonly y: number }[], roles: readonly RoleRow[], cls: ChainClass, opts: InsertChainOpts = {}): KernelResult<ChainInsert> {
  // A stale overlay (its batch committed, rejected or rolled back by a throw) is a programming error: thrown here, before
  // anything is read, charged or written — never a silent write outside a transaction (C-0294 (1), C-0302).
  check(tx.closed !== true, 'the transaction is closed (committed or rejected)');
  const p = tx.plat;
  const n = tx.level;
  checkRows(roles);
  for (const k of opts.knots ?? []) {
    const id = roleIdOf(k.role);
    check(id >= 0 && roleInfo(id).kind === 'vertex', `a knot row's role (${k.role}) is a vertex role`);
    check(k.entity !== undefined || roles.length > 0, 'a knot row without an entity takes the chain\'s own, which its first row names');
  }
  const d = decimate(tx, points, cls, opts);
  if (!d.ok) return passOn(d);
  const dec = d.value;
  const journal = chainJournal(tx);
  const pairsFrom = journal.newPairs.length;
  const ctx: ChainCtx = { tx, p, n, cls, rows: roles, warnings: [], journal, pairsFrom, txPairsFrom: tx.journal.pairs.length, maxPass: 0, strict: false, undo: [], own: ownRunOf(p, roles, n) };
  const landed = new Array<VertexId>(dec.points.length).fill(-1);

  // The index writes this op makes are read from the batch's log (the transaction's when open, else one opened here).
  const idx = indexOf(p);
  const openedLog = idx.log === null;
  if (openedLog) beginIndexBatch(p, n);
  const log = idx.log as NonNullable<typeof idx.log>;
  const start = markOf(ctx, log);
  const refuse = (r: Refusal): KernelResult<ChainInsert> => {
    // Atomic: everything back to the op's start (C-0177 (8)).
    rollback(ctx, log, start);
    return passOn(r);
  };

  // The op itself (steps 2 – 5). An invariant check's throw inside it — a gap in the router or in a structure it reads —
  // becomes the op's E_INVARIANT refusal with the check's message, everything undone (C-0215); any other throw (a staged
  // branch's notBuilt, a programming error) is not caught.
  const run = (): KernelResult<ChainInsert> => {
    /**
     * The re-landing (C-0209): the segment from `a` (input index `aIdx`) to the vertex of input index `bIdx` keeps clearance on no route,
     * and an end of it is a free vertex this op just placed (its mark before that landing given): that end is re-landed
     * onto an existing vertex within √2 · `attractCm` of its input point — the far end first, then the near one (with the
     * far end landed again after it) — nearest first, each reported W_PLACED (and W_ATTRACTED at the input point), the
     * first whose segment routes with clearance kept taken; a candidate refused for any other reason is passed
     * over (E_WORK_LIMIT ends the op). Returns the segment's two ends as they stand; the failure as it was when no
     * candidate routes (everything back to the marks).
     */
    const reland = (a: VertexId, aIdx: number, aMark: Mark | null, bIdx: number, bMark: Mark | null, nextPt: LatticePoint | null, failure: { readonly code: Parameters<typeof passOn>[0]['code']; readonly detail: string }): KernelResult<{ a: VertexId; b: VertexId }> => {
      const tryEnds = (from: VertexId): KernelResult<VertexId | null> => {
        const m0 = markOf(ctx, log);
        const cs = relandCandidates(ctx, dec.points[bIdx], from);
        if (!cs.ok) return passOn(cs);
        for (const x of cs.value) {
          warn(tx, ctx.warnings, 'W_PLACED', pointOf(p, x));
          warn(tx, ctx.warnings, 'W_ATTRACTED', dec.points[bIdx]);
          const r = routeSegment(ctx, log, from, x, dec.points[aIdx], dec.points[bIdx]);
          if (r.ok) return ok(x);
          rollback(ctx, log, m0);
          if (r.code === 'E_WORK_LIMIT') return passOn(r);
        }
        return ok(null);
      };
      if (bMark !== null) {
        rollback(ctx, log, bMark);
        const x = tryEnds(a);
        if (!x.ok) return passOn(x);
        if (x.value !== null) {
          landed[bIdx] = x.value;
          return ok({ a, b: x.value });
        }
      }
      if (aMark !== null && p.vertices.out[a] === -1) {
        rollback(ctx, log, aMark);
        const cs = relandCandidates(ctx, dec.points[aIdx], -1);
        if (!cs.ok) return passOn(cs);
        for (const y of cs.value) {
          const m1 = markOf(ctx, log);
          warn(tx, ctx.warnings, 'W_PLACED', pointOf(p, y));
          warn(tx, ctx.warnings, 'W_ATTRACTED', dec.points[aIdx]);
          const l = land(ctx, dec.points[bIdx], y, pointOf(p, y), nextPt);
          if (!l.ok) {
            rollback(ctx, log, m1);
            if (l.code === 'E_WORK_LIMIT') return passOn(l);
            continue;
          }
          const bv = l.value.vertex;
          if (l.value.merged || bv === y) {
            landed[aIdx] = y;
            landed[bIdx] = y;
            return ok({ a: y, b: y });
          }
          const r = routeSegment(ctx, log, y, bv, dec.points[aIdx], dec.points[bIdx]);
          if (r.ok) {
            landed[aIdx] = y;
            landed[bIdx] = bv;
            return ok({ a: y, b: bv });
          }
          if (r.code === 'E_WORK_LIMIT') return passOn(r);
          if (r.code === 'E_INVARIANT' && freeSince(ctx, m1, bv)) {
            // b's own landing undone (and y's reports with it), then b's candidates from y.
            rollback(ctx, log, m1);
            warn(tx, ctx.warnings, 'W_PLACED', pointOf(p, y));
            warn(tx, ctx.warnings, 'W_ATTRACTED', dec.points[aIdx]);
            const x = tryEnds(y);
            if (!x.ok) return passOn(x);
            if (x.value !== null) {
              landed[aIdx] = y;
              landed[bIdx] = x.value;
              return ok({ a: y, b: x.value });
            }
          }
          rollback(ctx, log, m1);
        }
      }
      return passOn(failure);
    };

    /**
     * The split route (C-0215; the fidelity bound's "the segment split at the obstruction"): the segment a → b (input
     * pa → pb), which no route
     * keeps in bound, split at its input midpoint — the midpoint landed as a chain point is (step 2: attraction, the
     * chain's own corner, kept content), reported W_PLACED — and each half routed in turn, a half that fails split again,
     * down to SPLIT_DEPTH levels; the whole is judged against pa → pb (§3.10's clearance whole, the fidelity bound) before
     * it stands. Returns ok, E_WORK_LIMIT, or the failure as given (everything back to the mark then).
     */
    const splitRoute = (a: VertexId, pa: LatticePoint, b: VertexId, pb: LatticePoint, depth: number, failure: Refusal): KernelResult<null> => {
      if (depth === 0) return passOn(failure);
      const mid = lattice(Math.floor((pa.x + pb.x) / 2 + 0.5), Math.floor((pa.y + pb.y) / 2 + 0.5));
      if (belowMinEdge(mid.x, mid.y, pa.x, pa.y) || belowMinEdge(mid.x, mid.y, pb.x, pb.y)) return passOn(failure);
      const m0 = markOf(ctx, log);
      const back = (r: Refusal): KernelResult<null> => {
        rollback(ctx, log, m0);
        return passOn(r.code === 'E_WORK_LIMIT' ? r : failure);
      };
      const l = land(ctx, mid, a, pointOf(p, a), pb);
      if (!l.ok) return back(l);
      const vm = l.value.vertex;
      if (l.value.merged || vm === a || vm === b) return back(failure);
      warn(tx, ctx.warnings, 'W_PLACED', pointOf(p, vm));
      const halves: readonly (readonly [VertexId, LatticePoint, VertexId, LatticePoint])[] = [[a, pa, vm, mid], [vm, mid, b, pb]];
      for (const [u, pu, w, pw] of halves) {
        const r = routeSegment(ctx, log, u, w, pu, pw);
        if (r.ok) continue;
        if (!boundRefusal(r)) return back(r);
        const h = splitRoute(u, pu, w, pw, depth - 1, r);
        if (!h.ok) return back(h);
      }
      if (wholeProblem(ctx, m0) !== null || !inFidelity(ctx, m0, pa, pb)) return back(failure);
      return ok(null);
    };

    /**
     * The cut back across segments (item 130 (d) on the chain's path, C-0361 (1)): the segment from prev (input index
     * `prevIdx`, reached from pprev) to the vertex of input index `idx` was routed back over an edge of the run's path
     * before it — attracted through a vertex an earlier segment routed through, the edge between them retraced and prev
     * left at the end of a spur. The path is cut back to a vertex x of it within √2 · `attractCm` of prev's input point
     * — the bound attraction moves an incoming vertex by: prev's point lands on x — and routed on from x: everything
     * since prev's own landing undone (`prevLand`), pprev → x routed, the point of `idx` landed again after x and x → it
     * routed, neither route retracing the path again. Candidates nearest first (ties y then x), at most 8, pprev itself
     * never (its segment would vanish); each reports W_ATTRACTED at prev's input point. A candidate the undo removed or
     * that stands finer than the batch is passed over; E_WORK_LIMIT ends the op. Returns x, the vertex of `idx` and the
     * mark before its landing; the failure as given when no candidate routes (the pass then refuses, everything undone).
     * Two of notBuilt #3's forms end here (C-0362 (3) as C-0363 amends it): (4) every candidate's route refused, an
     * optional chain's by its class's precision rules (E_BELOW_MIN_ANGLE on pprev → x or on x → the next point); (5) a
     * candidate the chain's own earlier segment placed (a crossing or wedge vertex), removed by the undo to `prevLand`
     * and so passed over.
     */
    const cutBack = (prev: VertexId, pp: VertexId, ppIdx: number, prevIdx: number, prevLand: Mark, idx: number, nextPt: LatticePoint | null, failure: Refusal): KernelResult<{ x: VertexId; v: VertexId; landMark: Mark }> => {
      const X = p.vertices.x;
      const Y = p.vertices.y;
      const at = dec.points[prevIdx];
      const found: { x: VertexId; d: number }[] = [];
      for (const x of priorPath(ctx, prev, -1)) {
        const d = (X[x] - at.x) * (X[x] - at.x) + (Y[x] - at.y) * (Y[x] - at.y);
        if (x !== pp && d <= RELAND_SQ) found.push({ x, d });
      }
      if (found.length === 0) return passOn(failure);
      found.sort((u, w) => u.d - w.d || Y[u.x] - Y[w.x] || X[u.x] - X[w.x]);
      rollback(ctx, log, prevLand);
      for (const { x } of found.slice(0, RELAND_MAX)) {
        if (!isVertexLive(p, x) || p.vertices.level[x] > n) continue;
        const m1 = markOf(ctx, log);
        warn(tx, ctx.warnings, 'W_ATTRACTED', at);
        const r1 = routeSegment(ctx, log, pp, x, dec.points[ppIdx], at);
        if (!r1.ok || retracedNow(ctx)) {
          rollback(ctx, log, m1);
          if (!r1.ok && r1.code === 'E_WORK_LIMIT') return passOn(r1);
          continue;
        }
        const landMark = markOf(ctx, log);
        const l = land(ctx, dec.points[idx], x, pointOf(p, x), nextPt);
        if (!l.ok) {
          rollback(ctx, log, m1);
          if (l.code === 'E_WORK_LIMIT') return passOn(l);
          continue;
        }
        const bv = l.value.vertex;
        if (l.value.merged || bv === x) {
          rollback(ctx, log, m1);
          continue;
        }
        const r = routeSegment(ctx, log, x, bv, at, dec.points[idx]);
        if (r.ok && !retracedNow(ctx)) return ok({ x, v: bv, landMark });
        rollback(ctx, log, m1);
        if (!r.ok && r.code === 'E_WORK_LIMIT') return passOn(r);
      }
      return passOn(failure);
    };

    for (const run of dec.runs) {
      const vs = run.vertices;
      const k = vs.length;
      // The run's committed route so far is read from here (item 130 (d) on the chain's path, `priorPath`, `priorPairs`).
      ctx.runStart = { newPairs: journal.newPairs.length, shared: journal.sharedPairs.length };
      let prev = -1;
      let prevIdx = -1;
      // The mark before prev's own landing, when this op placed it free (the re-landing reads it).
      let prevMark: Mark | null = null;
      // The vertex before prev on the run, its input index, and the mark before prev's own landing in this pass (the cut
      // back across segments reads them; null where prev was not landed by this loop or a re-landing moved the marks).
      let pprev = -1;
      let pprevIdx = -1;
      let prevLand: Mark | null = null;
      for (let j = 0; j < k; j++) {
        const idx = vs[j];
        let v = landed[idx];
        let mark: Mark | null = null;
        let landMark: Mark | null = null;
        const landedNow = v < 0;
        const nextIdx = j + 1 < k ? vs[j + 1] : run.closed ? vs[0] : -1;
        const nextPt = nextIdx >= 0 ? (landed[nextIdx] >= 0 ? pointOf(p, landed[nextIdx]) : dec.points[nextIdx]) : null;
        if (v < 0) {
          const pt = dec.points[idx];
          const prevPt = prev >= 0 ? pointOf(p, prev) : null;
          const before = markOf(ctx, log);
          const l = land(ctx, pt, prev, prevPt, nextPt);
          if (!l.ok) return refuse(l);
          v = l.value.vertex;
          landed[idx] = v;
          if (l.value.merged) continue;
          landMark = before;
          if (freeSince(ctx, before, v)) mark = before;
        }
        if (prev >= 0 && v !== prev) {
          const segMark = markOf(ctx, log);
          const r0 = routeSegment(ctx, log, prev, v, dec.points[prevIdx], dec.points[idx]);
          const r = r0.ok || !boundRefusal(r0) || ctx.extended !== true ? r0 : splitRoute(prev, dec.points[prevIdx], v, dec.points[idx], SPLIT_DEPTH, r0);
          if (!r.ok) {
            // The re-landing serves E_INVARIANT alone; an optional chain's refusal for the bound goes to the split route
            // and the later passes (C-0221).
            if (r.code !== 'E_INVARIANT' || !landedNow || (mark === null && prevMark === null)) return refuse(r);
            const re = reland(prev, prevIdx, prevMark, idx, mark, nextPt, r);
            if (!re.ok) return refuse(re);
            v = re.value.b;
            landMark = null;
          } else if (ctx.chainPath === 'back' && retracedNow(ctx) && !segMark.reentry) {
            // Item 130 (d) on the chain's path: the segment's route retraced an edge of the run's path before it. The path
            // is cut back to a vertex of it near prev's input point and routed on from there (`cutBack`); where none
            // routes, the pass refuses and insertChain routes the chain as before (notBuilt #3).
            if (!landedNow || prevLand === null || pprev < 0) return refuse({ code: 'E_INVARIANT', detail: REENTRY_DETAIL });
            // The run's points that became prev (prev's own and those merged into it) follow it onto x.
            const onPrev = vs.slice(vs.indexOf(prevIdx), j).filter((i) => landed[i] === prev);
            const cb = cutBack(prev, pprev, pprevIdx, prevIdx, prevLand, idx, nextPt, { code: 'E_INVARIANT', detail: REENTRY_DETAIL });
            if (!cb.ok) return refuse(cb);
            for (const i of onPrev) landed[i] = cb.value.x;
            landed[idx] = cb.value.v;
            v = cb.value.v;
            prev = cb.value.x;
            landMark = cb.value.landMark;
            mark = null;
          }
        }
        pprev = prev;
        pprevIdx = prevIdx;
        prevLand = landMark;
        prev = v;
        prevIdx = idx;
        // Re-landable later only while still free: the run's first vertex, before its first segment.
        prevMark = mark !== null && p.vertices.out[v] === -1 ? mark : null;
      }
      // The closing segment has no cut back: a ring whose closing segment retraces its path (its seam's corner beside a
      // vertex its first segment routed through) is refused by the watching and back passes at the commit and routed as
      // before — notBuilt #3, form (3).
      if (run.closed && prev >= 0 && prev !== landed[vs[0]]) {
        const r0 = routeSegment(ctx, log, prev, landed[vs[0]], dec.points[prevIdx], dec.points[vs[0]]);
        const r = r0.ok || !boundRefusal(r0) || ctx.extended !== true ? r0 : splitRoute(prev, dec.points[prevIdx], landed[vs[0]], dec.points[vs[0]], SPLIT_DEPTH, r0);
        if (!r.ok) return refuse(r);
      }
    }
    ctx.runStart = null;
    const placed = dec.of.map((i) => landed[i]);
    // A chain that attraction collapsed onto one vertex is left with fewer than two distinct points: the class's code, as
    // step 1's (C-0177 (12)) — nothing written.
    if (placed.every((v) => v === placed[0])) {
      const c = classRefusal<ChainInsert>(cls, 'belowOneEdge');
      check(c !== null, 'a chain below one edge is refused by both classes');
      return refuse(c);
    }
    // §3.10's clearance on the final arena round everything the chain wrote, whole: a gap no route closed is refused
    // E_INVARIANT, never committed and never thrown (C-0215).
    const problem = wholeProblem(ctx, start);
    if (problem !== null) return refuse({ code: 'E_INVARIANT', detail: `insert: ${problem}` });
    const rw = rewalk(tx, { pairs: journal.newPairs.slice(pairsFrom) }, ctx.undo);
    if (!rw.ok) return refuse(rw);
    // A chain whose route retraced its own path (item 130 (d) on the chain's path) and was not cut back is not committed
    // by a watching pass: insertChain reads the refusal and routes it again with the cut back, or as before (`passes`).
    if (ctx.chainPath != null && ctx.reentry === true) return refuse({ code: 'E_INVARIANT', detail: REENTRY_DETAIL });
    if (ctx.maxPass > 3) warn(tx, ctx.warnings, 'W_SNAP_PASSES', pointOf(p, placed[0]));
    // The knot rows onto the vertices their points became (carried by attraction, §3.4).
    const own = roles.length > 0 ? roles[0].entity : '';
    for (const kn of dec.knots) {
      const v = landed[kn.index];
      const entity = kn.entity ?? own;
      // Never a second row of one key on a vertex (an entity with no handle yet carries none).
      const h = handleOf(p, entity);
      if (h >= 0 && carriesRow(p, v, roleIdOf(kn.role), h, kn.ordinal)) continue;
      addRole(p, v, { role: kn.role, entity, ordinal: kn.ordinal }, n);
    }
    return ok({ placed }, ctx.warnings);
  };
  // One pass of the op from its start: step 1's merges go on with the chain (C-0170 (2)), then `run`.
  const attempt = (extended: boolean, strip: 0 | 1 | null = null): KernelResult<ChainInsert> => {
    ctx.extended = extended;
    // Every pass starts from §3.6's own readings (a throw caught below may have left a route's reading set).
    ctx.strict = false;
    ctx.strictEnds = false;
    ctx.endpointCrossings = false;
    ctx.acrossSlivers = false;
    ctx.anchor = null;
    ctx.runStart = null;
    ctx.reentry = false;
    ctx.strip = strip === null ? null : { variant: strip, a: null, b: null };
    landed.fill(-1);
    foldWarnings(tx.warnings, d.warnings);
    foldWarnings(ctx.warnings, d.warnings);
    try {
      return run();
    } catch (e) {
      if (e instanceof Error && INVARIANT_THROW.test(e.message)) return refuse({ code: 'E_INVARIANT', detail: e.message });
      throw e;
    }
  };
  // The passes. Pass 1: the router, every route judged by §3.10 whole and the fidelity bound. Pass 2: the anchored and
  // split readings, for a chain pass 1 refused E_INVARIANT (C-0215). Passes 3 and 4: the in-bound landings (`ctx.strip`,
  // reading 0, then reading 1 with step 2's free spot first), for a chain pass 2 refused for the bound — E_INVARIANT, or
  // an optional chain's E_BELOW_MIN_EDGE naming the bound (C-0217, C-0221). A commit stands as soon as a pass makes it;
  // a refusal keeps pass 2's refusal and its code, counted — a later pass never turns a refusal into another code. A pass
  // that would commit a route retracing the chain's own path (`REENTRY_DETAIL`, `mode` 'watch' or 'back') ends the
  // passes at once.
  const passes = (mode: 'watch' | 'back' | null): KernelResult<ChainInsert> => {
    ctx.chainPath = mode;
    let result = attempt(false);
    if (reentered(result)) return result;
    if (!result.ok && result.code === 'E_INVARIANT') {
      result = attempt(true);
      if (reentered(result)) return result;
    }
    if (!result.ok && boundRefusal(result)) {
      const third = attempt(true, 0);
      if (reentered(third) || third.ok) return third;
      const fourth = attempt(true, 1);
      if (reentered(fourth) || fourth.ok) return fourth;
      if (result.code === 'E_BELOW_MIN_EDGE') {
        // An optional chain's refusal for the bound keeps its code and the bound's key; where the in-bound passes were
        // stopped by the class's own precision rules (§3.6 *Chain classes*: a wedge beyond attractCm, a corner below
        // minFaceAngle), their reasons follow, so the cause is read, never hidden (the KI-1 cause table).
        const stops = [third, fourth].filter((r) => !boundRefusal(r)).map((r) => `${r.code} ${r.detail}`);
        if (stops.length > 0) result = err('E_BELOW_MIN_EDGE', `${result.detail}; the in-bound passes stop at the class's precision rules: ${stops.join(' | ')}`);
      }
    }
    return result;
  };
  // Item 130 (d) on the chain's path (C-0361 (1)): the passes watch the chain's path; a chain whose route retraces it — a
  // later segment attracted back through a vertex an earlier one routed through, sharing the edge between them again,
  // the earlier corner left a dead end and the vertex a branch in the chain's own rows — is routed again with each such
  // segment cut back to a vertex of the path near its start's input point (`cutBack`). Where no cut back routes, the
  // chain is routed as before: nothing a chain committed before is refused now. That residual is notBuilt #3 (M4): every
  // retrace of the chain's own path that the cut back does not route (C-0362 (3) as C-0363 amends it). Its five forms:
  // (1) a corner farther than √2 · attractCm from every vertex of the path it re-enters; (2) a first arm shorter than
  // that bound folded back over by the second (only pprev near); (3) a closed run's seam (the closing segment is never
  // cut back); (4) a cut back whose routes are refused at every candidate, an optional chain's by its precision rules;
  // (5) a re-entered vertex the chain's own earlier segment placed (the cut back's undo removes it). Each commits with a
  // branch in the chain's own rows (or, (2), a re-ordered run) and is refused 'branches' under a linear key
  // (reentry.test.ts pins each form).
  let result = passes('watch');
  if (reentered(result)) {
    const back = passes('back');
    result = back.ok ? back : passes(null);
  }
  ctx.chainPath = null;
  if (openedLog) endIndexBatch(p);
  return result;
}
