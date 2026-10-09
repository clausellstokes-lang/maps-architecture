// insertChain(tx, points, roles, cls, opts) → ChainInsert (§3.4; §3.6 *Attraction* steps 1 – 5; §3.4 *The doors*;
// §2.2 rule 5's knots). M0-a-05.
//
// The one door for new edges in a plat. The chain is processed in five steps (§3.6): (1) snap and decimate, split into
// simple runs (`decimate`, M0-a-04 — a plan whose merges' W_ATTRACTED this op reports when the chain goes on, C-0170
// (2)); then run by run, the part already inserted counting as existing geometry for its later parts, each vertex (2)
// lands by vertex attraction — the nearest vertex within `attractCm`, the nearest edge's endpoint, a split at the
// placement point, or (candidate (b)) a finer vertex on that route, promoted — and merges into the previous one when
// attraction brought them within `minEdge` (W_ATTRACTED); a vertex both of whose segments cross one existing edge within
// `minEdge` of each other — the chain's own acute corner — moves onto that edge instead (wedge routing, W_WEDGE_ROUTED);
// each segment is routed by steps (3) – (4) (`snapRound`): through the vertices it passes and along the stretches it
// shares, across its exact crossings, iterated ≤ 3 passes, and checked for §3.10's clearance as it is written — where the
// design route leaves it broken, the strict route and then the route along existing edges stand in (C-0177 (13)); then
// (5) the faces incident to its new edges are re-walked (`rewalk`). The knot rows (`opts.knots`) go onto the vertices their points became — a knot that attraction lands on an
// existing vertex is carried to it (§3.4) — and every new and shared edge carries the chain's rows at the batch's level.
//
// `ChainInsert.placed` names, per input point in input order, the vertex it became after snapping, attraction and
// sharing (§3.4); valid until the next commit. A mandatory chain never fails for a precision reason: only §3.1's
// non-precision codes reject it — E_DEGENERATE `empty` (step 1), E_KEPT (finer geometry is kept content, C-0177 (4)),
// E_LEVEL, E_OUT_OF_RANGE, E_WORK_LIMIT — and an acute corner commits with its warning (a wedge route beyond
// 2 · √2 · `attractCm` is not taken: its crossings are placed in turn, N-38, N-40); an optional chain is also rejected E_BELOW_MIN_EDGE
// (step 1's collapse, or a collapse by attraction, or a wedge route beyond `attractCm`) and E_BELOW_MIN_ANGLE (§3.6
// *Chain classes*). Every route a segment commits keeps §3.10's clearance, judged whole, and N-43 B's fidelity bound —
// within 2 · √2 · `attractCm` of the input segment, Hausdorff both ways (N-44 (2), C-0215). A segment no route keeps so —
// the design route, the strict route, the route along existing edges, N-37's endpoint route and N-42 (a)'s route across
// a sliver all tried — whose end is a free vertex the chain just placed has that end re-landed onto an existing vertex
// within √2 · `attractCm` (N-42 (b), W_PLACED; C-0209); one that still keeps no route is refused E_INVARIANT, as is a
// chain whose final arena fails §3.10's clearance round its writes, and an invariant check that throws inside the op:
// a counted, capped refusal, never a throw and never a commit out of bound (N-44 (1) – (3); B-FUZZ counts it on its own
// line, N-40). The first pass is that router; a chain it refuses E_INVARIANT is tried again with S4's further routes
// (C-0215), and a chain both refuse with S5's third pass (C-0217) — an optional chain refused E_BELOW_MIN_EDGE for the
// bound (N-43) as a mandatory one refused E_INVARIANT (S6, C-0221; N-46 (3)), its code kept when no pass commits it: a
// crossing or a step-2 vertex the placement rule can only send to its endpoint fallback beyond the bound is kept within
// the bound instead (the step across a thin strip, the nearest in-bound point of the run, the nearest in-bound vertex,
// a free in-bound spot for step 2), and a wedge corner beyond the bound of the input is not taken; a second reading
// tries step 2's free spot first. Only a pass's commit replaces the refusal before it. The op is atomic: every write it
// makes is undone on a refusal — the arena, the index, the journals and the transaction's warnings as they were (C-0170
// (2), C-0177 (8), refining C-0169 (6)). The work-limit check reads `tx.workLimit` (M0-a-06 supplies the transaction;
// until then the shell of C-0169 (1)). A transaction that is closed — the overlay of a batch that committed, was rejected or
// threw, kept past it — is a programming error: the op throws at its entry, before it reads or writes anything (N-55 (5);
// as `splitThrough`, C-0294). A vertex the op makes by splitting the chain's OWN edge — a chain point that folds back
// over the chain, or a step-3 join, leave or contact point where a later segment shares an earlier one (§3.11's
// collinear overlap) — is the chain's own vertex and carries no `split` flag (§2.2 rule 3; `ownShapeVertex`, N-55 (2),
// C-0297). Readings: C-0177.
import {
  addRole,
  allocVertex,
  freeVertex,
  handleOf,
  isVertexLive,
  MAX_ORDINAL,
  outgoing,
  pointOf,
  roleIdOf,
  roleInfo,
  rowsOfKey,
  rowElement,
  type Plat,
  type RoleRow,
  type VertexId,
} from '../arena/index.js';
import { beginIndexBatch, endIndexBatch, indexAdd, indexChange, indexDelete, indexOf, isItemLive, ITEM_VERTEX, query } from '../index/index.js';
import { belowMinEdge, err, LATTICE, ok, ratio, type KernelResult, type Warning } from '../num/index.js';
import type { LatticePoint } from '../types/index.js';
import { applyAttraction, planAttraction } from './attractVertex.js';
import { charge, check, classOutcome, classRefusal, foldWarnings, INSERT_ATTRACT_QUERIES, INSERT_PLACEMENT_CANDIDATES, passOn, warn, workLimitHit, type ChainClass, type InsertTx } from './classes.js';
import { placeOnRun } from './crossings.js';
import { segmentCloserThan } from './placement.js';
import { decimate, segmentsMeet, type Knot } from './decimate.js';
import { rewalk, TX_FACES_WALKED } from './rewalk.js';
import { clearanceProblem, OVER_LIMIT, recordHolding, routeAlongExisting, snapRound } from './snapRound.js';
import {
  applyLanding,
  chainJournal,
  FIDELITY_SQ,
  footOnSegment,
  nearestVertexWithin,
  landingPoint,
  lattice,
  onRouteOfLevel,
  ownShapeVertex,
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
} from './stretch.js';
import { chainCorner, wedgeOutcome } from './wedge.js';

const ATTRACT = LATTICE.attractCm;
const ATTRACT_SQ = LATTICE.attractCm * LATTICE.attractCm;
/** The kernel's invariant checks this op runs (insert's `check`, the arena's and the index's): their throws become E_INVARIANT (N-44 (1)). */
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

/** A copy of a warning list (the transaction's, restored on a refusal). */
function copyWarnings(ws: readonly Warning[]): Warning[] {
  return ws.map((w) => (w.at === undefined ? { code: w.code, count: w.count } : { code: w.code, count: w.count, at: { x: w.at.x, y: w.at.y } }));
}

/** Does the vertex carry the vertex row's key already? */
function vertexCarries(p: Plat, v: VertexId, role: string, entity: string, ordinal: number): boolean {
  const h = handleOf(p, entity);
  if (h < 0) return false;
  for (const r of rowsOfKey(p, roleIdOf(role), h, ordinal)) if (rowElement(p, r) === v) return true;
  return false;
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
  // S5's third pass (C-0217): an in-bound landing in place of a far fallback, written as a split (W_PLACED, W_ATTRACTED).
  const landS5 = (l: S5Landing): KernelResult<{ vertex: VertexId; merged: boolean }> => {
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
  const plan = planAttraction(tx, pt);
  if (!plan.ok) {
    if (plan.code !== 'E_LEVEL') return passOn(plan);
    // Candidate (b): the vertex lands on a route beside a finer vertex (C-0169 (5), (6) left it here).
    const l = landBesideFiner(ctx, pt);
    if (!l.ok) return passOn(l);
    if (l.value.kind === 'vertex' && l.value.onto === 'fallback') {
      const s5 = stepTwoStrip(ctx, pt, l.value.vertex, prevPt, nextPt);
      if (!s5.ok) return passOn(s5);
      if (s5.value !== null) return landS5(s5.value);
    }
    if (merges(landingPoint(p, l.value))) return merged();
    const v = applyLanding(ctx, l.value);
    if (p.vertices.x[v] !== pt.x || p.vertices.y[v] !== pt.y) warn(tx, ctx.warnings, 'W_ATTRACTED', pt);
    return ok({ vertex: v, merged: false });
  }
  const pl = plan.value;
  // A planned new split's sub-edge keeps clearance at its own ends: the placement rule's (iii) gives the endpoint
  // fallback (a split onto an existing vertex) for any other (C-0284), so C-0177 (11)'s wrapper here is gone (C-0284 (3),
  // C-0297).
  if (pl.kind === 'split' && pl.split.kind === 'existing') {
    const s5 = stepTwoStrip(ctx, pt, pl.split.vertex, prevPt, nextPt);
    if (!s5.ok) return passOn(s5);
    if (s5.value !== null) return landS5(s5.value);
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
      // (N-38, N-40).
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
 * The nearest level-n route piece within `attractCm` of the point, its foot strictly inside it (ties by the query's
 * canonical order), or null. One index query (`insert.attractQueries`).
 */
function nearestPiece(ctx: ChainCtx, pt: LatticePoint): KernelResult<Piece | null> {
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

/** S5's step-2 landing: an existing vertex or a split (`Landing`), or a free vertex of the chain's own at `at`. */
type S5Landing = Landing | { readonly kind: 'free'; readonly at: LatticePoint };

/**
 * S5's free spot for a chain point at `pt` (C-0217): the lattice point nearest `pt` within N-43 B's bound (ties y then x)
 * where a free vertex of the chain's own keeps §3.10's clearance — at least `minEdge` from every vertex and every edge —
 * and keeps the kept-content rule (no finer vertex or edge within `attractCm`, no finer face record holding it); null
 * when none does. One index query (`insert.attractQueries`), each point tried charged to `insert.placementCandidates`.
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

/** The reach of S5's in-bound placements: N-43 B's bound, 2 · √2 · `attractCm`. */
const BOUND = Math.sqrt(FIDELITY_SQ);

/**
 * S5's third pass for step 2 (C-0217; `ctx.strip`): a chain vertex at `pt` whose landing is the placement rule's endpoint
 * fallback `v` beyond N-43 B's bound of `pt` — no route through `v` can keep the bound — lands within the bound instead,
 * by the first of these that finds a place (the first reading in this order, the second with the free spot first):
 * across the thin strip — on a level-n route piece within the bound of `pt` (nearest first), the far side's sub-edge left
 * out of (iii): an edge the chain's segment from `prevPt` or to `nextPt` crosses there, which the router then joins to
 * the new vertex (`placeOnRun`, within `attractCm`, then within the bound); the nearer to `pt` of the nearest piece's
 * nearest qualifying point within the bound and the nearest existing vertex of level ≤ n within it; a free spot
 * (`freeSpot`). Every one reports W_PLACED. Null outside the third pass, when `v` is within the bound, or when nothing
 * qualifies. Nothing written; refuses only E_WORK_LIMIT.
 */
function stepTwoStrip(ctx: ChainCtx, pt: LatticePoint, v: VertexId, prevPt: LatticePoint | null, nextPt: LatticePoint | null): KernelResult<S5Landing | null> {
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
  const free = (): KernelResult<S5Landing | null> => {
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

/** How far a free chain vertex may be re-landed (N-42 (b)): §3.6's attracted bound √2 · attractCm, squared (exact). */
const RELAND_SQ = 2 * ATTRACT_SQ;
/** How many times a segment no route keeps in bound is halved at most (S4's split route: up to four pieces). */
const SPLIT_DEPTH = 2;
/** A refusal as a callee gives it. */
type Refusal = { readonly code: Parameters<typeof passOn>[0]['code']; readonly detail: string };
/** The detail's end an optional chain's refusal for N-43 B's bound carries (`routeOne`; N-46 (3)). */
const BOUND_DETAIL = 'leaves the fidelity bound (N-43)';

/**
 * Is the refusal one N-43 B's bound caused (N-46 (3))? E_INVARIANT — no route keeps §3.10 within the bound — or an
 * optional chain's E_BELOW_MIN_EDGE whose every route keeping clearance leaves the bound. S4's split route and S5's
 * third pass serve both alike, and a refusal keeps the code it was given when neither commits (S6, C-0221).
 */
export function boundRefusal(r: Refusal): boolean {
  return r.code === 'E_INVARIANT' || (r.code === 'E_BELOW_MIN_EDGE' && r.detail.endsWith(BOUND_DETAIL));
}
/** How many re-landing candidates one free end tries (nearest first), bounding a last resort's work. */
const RELAND_MAX = 8;

/**
 * N-42 (b)'s candidates for a free chain vertex at the input point `pt` that no route reaches with clearance kept: the
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

/** Did the op place v free since the mark — a new vertex of its own with no edge yet (N-42 (b))? */
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
}

type IndexLog = NonNullable<ReturnType<typeof indexOf>['log']>;

function markOf(ctx: ChainCtx, log: IndexLog): Mark {
  const J = ctx.tx.journal;
  const C = ctx.journal;
  return {
    undo: ctx.undo.length, vertices: J.vertices.length, pairs: J.pairs.length, split: J.split.length, changed: J.changed.length, steiner: J.steiner,
    newPairs: C.newPairs.length, shared: C.sharedPairs.length, promoted: C.promoted.length, materialised: C.materialised.length,
    faces: C.faces.map((f) => [f.created.length, f.changed.length, f.removed.length] as const),
    log: log.writes.length, txWarnings: copyWarnings(ctx.tx.warnings), own: copyWarnings(ctx.warnings), maxPass: ctx.maxPass, passes: C.passes,
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
  ctx.tx.warnings.length = 0;
  for (const w of copyWarnings(m.txWarnings)) ctx.tx.warnings.push(w);
  ctx.warnings.length = 0;
  for (const w of copyWarnings(m.own)) ctx.warnings.push(w);
}

/**
 * §3.10's clearance over everything written since the mark, whole (C-0209; S4, C-0215): every new edge and every edge at a
 * new vertex — the two sub-edges of each split among them — against the vertices round it, and every new vertex and its
 * neighbours against the edges round them; read on the arena as it stands. A split takes its sub-edge's ends out of each
 * other's one-ring, so a third vertex beside the split edge (its one-ring reached the far end through a neighbour) is
 * judged here too: the S1–S3 test read only the chain's own new edges and let such a split commit an invalid arena
 * (M0-a-08's buffer group, s157). The first problem found, or null.
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
 * N-43 B (J199; N-44 (2)): does the route written since the mark — the segment's new and shared edges, every stretch join
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
 * One chain segment a → b routed and checked (C-0177 (13)): the design route of steps 3 – 4 (`snapRound`); where it leaves
 * §3.10's clearance broken — a tight cluster where step 3's band routes the chain through a vertex whose sub-route then
 * bends away from a vertex the first part was written beside — or runs beyond N-43's fidelity bound of the input segment
 * pa → pb, it is undone and the strict route tried (step 3 routing only through vertices within `minEdge`); where that
 * fails too, the route along existing edges (`routeAlongExisting`); and before any refusal the route with every crossing
 * on the placement rule's endpoint fallback (§3.6: "each such re-route lands on an existing vertex, so the loop ends";
 * N-37, C-0202); last, the design route with a crossing on the near side of a sliver placed across it (N-42 (a),
 * C-0209). Every route is judged by §3.10's clearance whole (`wholeProblem`) and by the fidelity bound (`inFidelity`,
 * N-43 B, N-44 (2); C-0215) before it commits; in S5's third pass the segment's two ends are judged too, and every route
 * reads the input segment pa → pb for its in-bound landings (`ctx.strip`, C-0217). A refusal of the design or strict route is the segment's; a gap no
 * fallback closes is refused E_INVARIANT (insertChain then re-lands a free end of the segment, N-42 (b)), never thrown.
 */
function routeSegment(ctx: ChainCtx, log: IndexLog, a: VertexId, b: VertexId, pa: LatticePoint, pb: LatticePoint): KernelResult<null> {
  // S5's third pass reads the input segment being routed (C-0217); restored after, as the segment's routes may nest.
  const st = ctx.strip ?? null;
  if (st === null) return routeOne(ctx, log, a, b, pa, pb);
  ctx.strip = { variant: st.variant, a: pa, b: pb };
  const r = routeOne(ctx, log, a, b, pa, pb);
  ctx.strip = st;
  return r;
}

function routeOne(ctx: ChainCtx, log: IndexLog, a: VertexId, b: VertexId, pa: LatticePoint, pb: LatticePoint): KernelResult<null> {
  const m = markOf(ctx, log);
  // Whether some route kept §3.10 but left the fidelity bound: an optional chain is then refused for precision.
  let outOfBound = false;
  // S5's third pass judges the segment's two ends too (C-0217): a vertex step 2 placed across a strip keeps clearance
  // only once a route joins it to the strip's far side, which this segment's route must do.
  const ends: readonly VertexId[] = ctx.strip != null ? [a, b] : [];
  const kept = (): boolean => {
    if (wholeProblem(ctx, m, ends) !== null) return false;
    if (inFidelity(ctx, m, pa, pb)) return true;
    outOfBound = true;
    return false;
  };
  const r1 = snapRound(ctx, a, b);
  if (!r1.ok) return r1;
  if (kept()) return r1;
  rollback(ctx, log, m);
  ctx.strict = true;
  const r2 = snapRound(ctx, a, b);
  ctx.strict = false;
  if (r2.ok && kept()) return r2;
  rollback(ctx, log, m);
  const r3 = routeAlongExisting(ctx, a, b);
  if (!r3.ok) return passOn(r3);
  if (r3.value) {
    if (kept()) return ok(null);
    rollback(ctx, log, m);
  }
  if (!r2.ok) return r2;
  // §3.6's own fallback before any refusal (N-37): the segment re-routed with every crossing on the placement's
  // endpoint fallback, never split — each such re-route lands on an existing vertex, so the loop ends. A commit here
  // always reports W_PLACED (N-40): without a crossing this route is the design route, which failed above.
  ctx.endpointCrossings = true;
  const r4 = snapRound(ctx, a, b);
  ctx.endpointCrossings = false;
  if (r4.ok && kept()) return r4;
  rollback(ctx, log, m);
  // N-42 (a): a sliver's near crossing, which the placement can only send to its endpoint fallback — however far along
  // the edge — is placed across the sliver. A commit here always reports W_PLACED: without such a crossing this route is
  // the design route, which failed above.
  ctx.acrossSlivers = true;
  const r5 = snapRound(ctx, a, b);
  ctx.acrossSlivers = false;
  if (r5.ok && kept()) return r5;
  rollback(ctx, log, m);
  // S4 (C-0215): the design route anchored to the input segment — step 3's contacts only where they also lie within
  // attractCm of pa → pb, so a run of contacts along a near-parallel chain cannot carry the route beyond the bound.
  if (ctx.extended === true) {
    ctx.anchor = { a: pa, b: pb, reach: ATTRACT };
    const r6 = snapRound(ctx, a, b);
    ctx.anchor = null;
    if (r6.ok && kept()) return r6;
    rollback(ctx, log, m);
    ctx.anchor = { a: pa, b: pb, reach: FIDELITY };
    const r7 = snapRound(ctx, a, b);
    ctx.anchor = null;
    if (r7.ok && kept()) return r7;
    rollback(ctx, log, m);
  }
  if (!r4.ok && r4.code !== 'E_INVARIANT') return r4;
  const X = ctx.p.vertices.x;
  const Y = ctx.p.vertices.y;
  if (outOfBound && ctx.extended === true) {
    // An optional chain's route beyond the bound is a precision refusal, as a wedge route beyond attractCm (§3.6
    // *Chain classes*); a mandatory chain's is E_INVARIANT, counted (N-44).
    const o = classOutcome(ctx.cls, 'wedgeBeyondAttract');
    if ('refuse' in o) return err('E_BELOW_MIN_EDGE', `every route from (${X[a]}, ${Y[a]}) to (${X[b]}, ${Y[b]}) keeping clearance ${BOUND_DETAIL}`);
  }
  return err('E_INVARIANT', `insert: no route from (${X[a]}, ${Y[a]}) to (${X[b]}, ${Y[b]}) keeps clearance (§3.10) within the fidelity bound (N-43)`);
}

/**
 * §3.4's `insertChain(tx, points, roles, cls, opts)` (see the module comment). `roles` are the chain's edge rows, every
 * new and shared edge gaining each at the batch's level; `opts.knots` its vertex rows.
 */
export function insertChain(tx: InsertTx, points: readonly { readonly x: number; readonly y: number }[], roles: readonly RoleRow[], cls: ChainClass, opts: InsertChainOpts = {}): KernelResult<ChainInsert> {
  // A stale overlay (its batch committed, rejected or rolled back by a throw) is a programming error: thrown here, before
  // anything is read, charged or written — never a silent write outside a transaction (N-55 (5); C-0297).
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
  const ctx: ChainCtx = { tx, p, n, cls, rows: roles, warnings: [], journal, pairsFrom, txPairsFrom: tx.journal.pairs.length, maxPass: 0, strict: false, undo: [] };
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
  // becomes the op's E_INVARIANT refusal with the check's message, everything undone (N-44 (1), C-0215); any other throw
  // (a staged branch's notBuilt, a programming error) is not caught.
  const run = (): KernelResult<ChainInsert> => {
    /**
     * N-42 (b): the segment from `a` (input index `aIdx`) to the vertex of input index `bIdx` keeps clearance on no route,
     * and an end of it is a free vertex this op just placed (its mark before that landing given): that end is re-landed
     * onto an existing vertex within √2 · `attractCm` of its input point — the far end first, then the near one (with the
     * far end landed again after it) — nearest first, each reported W_PLACED (and W_ATTRACTED at the input point), the
     * first whose segment routes with clearance kept taken (C-0209); a candidate refused for any other reason is passed
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
     * S4 (C-0215; N-43 B's "the segment split at the obstruction"): the segment a → b (input pa → pb), which no route
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

    for (const run of dec.runs) {
      const vs = run.vertices;
      const k = vs.length;
      let prev = -1;
      let prevIdx = -1;
      // The mark before prev's own landing, when this op placed it free (N-42 (b)'s re-landing reads it).
      let prevMark: Mark | null = null;
      for (let j = 0; j < k; j++) {
        const idx = vs[j];
        let v = landed[idx];
        let mark: Mark | null = null;
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
          if (freeSince(ctx, before, v)) mark = before;
        }
        if (prev >= 0 && v !== prev) {
          const r0 = routeSegment(ctx, log, prev, v, dec.points[prevIdx], dec.points[idx]);
          const r = r0.ok || !boundRefusal(r0) || ctx.extended !== true ? r0 : splitRoute(prev, dec.points[prevIdx], v, dec.points[idx], SPLIT_DEPTH, r0);
          if (!r.ok) {
            // N-42 (b)'s re-landing serves E_INVARIANT alone: an optional chain's refusal for the bound reached it in none
            // of 40 000 scanned B-FUZZ cases, so S6 leaves it as S5 had it (C-0221).
            if (r.code !== 'E_INVARIANT' || !landedNow || (mark === null && prevMark === null)) return refuse(r);
            const re = reland(prev, prevIdx, prevMark, idx, mark, nextPt, r);
            if (!re.ok) return refuse(re);
            v = re.value.b;
          }
        }
        prev = v;
        prevIdx = idx;
        // Re-landable later only while still free: the run's first vertex, before its first segment.
        prevMark = mark !== null && p.vertices.out[v] === -1 ? mark : null;
      }
      if (run.closed && prev >= 0 && prev !== landed[vs[0]]) {
        const r0 = routeSegment(ctx, log, prev, landed[vs[0]], dec.points[prevIdx], dec.points[vs[0]]);
        const r = r0.ok || !boundRefusal(r0) || ctx.extended !== true ? r0 : splitRoute(prev, dec.points[prevIdx], landed[vs[0]], dec.points[vs[0]], SPLIT_DEPTH, r0);
        if (!r.ok) return refuse(r);
      }
    }
    const placed = dec.of.map((i) => landed[i]);
    // A chain that attraction collapsed onto one vertex is left with fewer than two distinct points: the class's code, as
    // step 1's (C-0177 (12)) — nothing written.
    if (placed.every((v) => v === placed[0])) {
      const c = classRefusal<ChainInsert>(cls, 'belowOneEdge');
      check(c !== null, 'a chain below one edge is refused by both classes');
      return refuse(c);
    }
    // §3.10's clearance on the final arena round everything the chain wrote, whole: a gap no route closed is refused
    // E_INVARIANT, never committed and never thrown (N-43 A, N-44 (1) – (2); C-0215).
    const problem = wholeProblem(ctx, start);
    if (problem !== null) return refuse({ code: 'E_INVARIANT', detail: `insert: ${problem}` });
    const rw = rewalk(tx, { pairs: journal.newPairs.slice(pairsFrom) }, ctx.undo);
    if (!rw.ok) return refuse(rw);
    if (ctx.maxPass > 3) warn(tx, ctx.warnings, 'W_SNAP_PASSES', pointOf(p, placed[0]));
    // The knot rows onto the vertices their points became (carried by attraction, §3.4).
    const own = roles.length > 0 ? roles[0].entity : '';
    for (const kn of dec.knots) {
      const v = landed[kn.index];
      const entity = kn.entity ?? own;
      if (vertexCarries(p, v, kn.role, entity, kn.ordinal)) continue;
      addRole(p, v, { role: kn.role, entity, ordinal: kn.ordinal }, n);
    }
    return ok({ placed }, ctx.warnings);
  };
  // One pass of the op from its start: step 1's merges go on with the chain (N-7, C-0170 (2)), then `run`.
  const attempt = (extended: boolean, strip: 0 | 1 | null = null): KernelResult<ChainInsert> => {
    ctx.extended = extended;
    // Every pass starts from §3.6's own readings (a throw caught below may have left a route's reading set).
    ctx.strict = false;
    ctx.endpointCrossings = false;
    ctx.acrossSlivers = false;
    ctx.anchor = null;
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
  // The first pass is the router of S1 – S3 with every route judged by §3.10 whole and the fidelity bound; only a chain
  // it refuses E_INVARIANT is tried again with S4's further routes (C-0215), so a chain the first pass commits keeps its
  // output (the one-time shift is the chains whose earlier commit broke the bound or the arena).
  let result = attempt(false);
  if (!result.ok && result.code === 'E_INVARIANT') result = attempt(true);
  // S5's third pass (C-0217): only a chain both passes refuse for N-43 B's bound — E_INVARIANT, or an optional chain's
  // E_BELOW_MIN_EDGE 'N-43' (S6, C-0221: N-46 (3)'s class gets the same readings) — so every commit of S4's two passes
  // stands; its second reading (step 2's free spot first) only a chain the first reading does not commit. A refusal of
  // either keeps the second pass's refusal and its code, counted (N-44 (3), N-46 (3)): the third pass never turns a
  // refusal into another code.
  if (!result.ok && boundRefusal(result)) {
    const third = attempt(true, 0);
    if (third.ok) result = third;
    else {
      const fourth = attempt(true, 1);
      if (fourth.ok) result = fourth;
    }
  }
  if (openedLog) endIndexBatch(p);
  return result;
}
