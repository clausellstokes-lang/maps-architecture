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
// E_LEVEL, E_OUT_OF_RANGE, E_WORK_LIMIT — and an acute corner or a long wedge route commits with its warning; an
// optional chain is also rejected E_BELOW_MIN_EDGE (step 1's collapse, or a collapse by attraction, or a wedge route
// beyond `attractCm`) and E_BELOW_MIN_ANGLE (§3.6 *Chain classes*). The op is atomic: every write it makes is undone on
// a refusal — the arena, the index, the journals and the transaction's warnings as they were (C-0170 (2), C-0177 (8),
// refining C-0169 (6)). The work-limit check reads `tx.workLimit` (M0-a-06 supplies the transaction; until then the
// shell of C-0169 (1)). Readings: C-0177.
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
import { belowMinEdge, err, LATTICE, ok, type KernelResult, type Warning } from '../num/index.js';
import type { LatticePoint } from '../types/index.js';
import { applyAttraction, planAttraction } from './attractVertex.js';
import { charge, check, classRefusal, foldWarnings, INSERT_ATTRACT_QUERIES, passOn, warn, workLimitHit, type ChainClass, type InsertTx } from './classes.js';
import { decimate, type Knot } from './decimate.js';
import { rewalk, TX_FACES_WALKED } from './rewalk.js';
import { checkClearance, clearanceProblem, OVER_LIMIT, recordHolding, routeAlongExisting, snapRound } from './snapRound.js';
import {
  applyLanding,
  chainJournal,
  footOnSegment,
  landingPoint,
  nearerVertex,
  onRouteOfLevel,
  pieceOf,
  planLanding,
  recordSplit,
  reservePair,
  segmentBox,
  splitBreaksClearance,
  withinSegment,
  type ChainCtx,
  type Landing,
} from './stretch.js';
import { chainCorner, wedgeOutcome } from './wedge.js';

const ATTRACT = LATTICE.attractCm;
const ATTRACT_SQ = LATTICE.attractCm * LATTICE.attractCm;

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
function land(ctx: ChainCtx, pt: LatticePoint, prev: VertexId, prevPt: LatticePoint | null, nextPt: LatticePoint | null): KernelResult<{ vertex: VertexId; merged: boolean }> {
  const { tx, p, n } = ctx;
  const merges = (target: LatticePoint): boolean => prev >= 0 && belowMinEdge(p.vertices.x[prev], p.vertices.y[prev], target.x, target.y);
  const merged = (): KernelResult<{ vertex: VertexId; merged: boolean }> => {
    warn(tx, ctx.warnings, 'W_ATTRACTED', pt);
    return ok({ vertex: prev, merged: true });
  };
  const plan = planAttraction(tx, pt);
  if (!plan.ok) {
    if (plan.code !== 'E_LEVEL') return passOn(plan);
    // Candidate (b): the vertex lands on a route beside a finer vertex (C-0169 (5), (6) left it here).
    const l = landBesideFiner(ctx, pt);
    if (!l.ok) return passOn(l);
    if (merges(landingPoint(p, l.value))) return merged();
    const v = applyLanding(ctx, l.value);
    if (p.vertices.x[v] !== pt.x || p.vertices.y[v] !== pt.y) warn(tx, ctx.warnings, 'W_ATTRACTED', pt);
    return ok({ vertex: v, merged: false });
  }
  const pl = plan.value;
  if (pl.kind === 'split' && pl.split.kind === 'new' && splitBreaksClearance(p, p.halfEdges.origin[pl.split.sub], p.halfEdges.origin[pl.split.sub ^ 1])) {
    // No point of that sub-edge keeps clearance at its ends (C-0177 (11)): the placement's fallback, its nearer end.
    const O = p.halfEdges.origin;
    const v = nearerVertex(p, O[pl.split.sub], O[pl.split.sub ^ 1], pl.at.x, pl.at.y);
    const fb: Landing = { kind: 'vertex', vertex: v, onto: 'fallback', warnings: [{ code: 'W_PLACED', count: 1, at: pointOf(p, v) }] };
    if (merges(pointOf(p, v))) return merged();
    applyLanding(ctx, fb);
    warn(tx, ctx.warnings, 'W_ATTRACTED', pt);
    return ok({ vertex: v, merged: false });
  }
  if (pl.kind !== 'free') {
    if (merges(pl.at)) return merged();
    if (pl.kind === 'split' && pl.split.kind === 'new') reservePair(p, pl.split.sub);
    const a = applyAttraction(tx, pl);
    if (!a.ok) return passOn(a);
    if (pl.kind === 'split' && pl.split.kind === 'new') recordSplit(ctx, pl.split.sub, a.value.kind === 'free' ? -1 : a.value.vertex);
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
      // Beyond attractCm a mandatory chain's corner stays where it is: the router places its crossings in turn (N-38).
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
  check(best !== null, 'a landing refused E_LEVEL stands within attractCm of a route piece');
  // The vertex's foot on the piece: the endpoint rule reads it (§3.6 step 2); planLanding re-projects it on the run's
  // own-level route for the placement.
  const foot = footOnSegment(X[best.a], Y[best.a], X[best.b], Y[best.b], pt.x, pt.y);
  return planLanding(tx, best, foot.x, foot.y);
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

/** Where a chain's writes stand: the undo log, the journals, the index log, the warnings — what `rollback` returns to. */
interface Mark {
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

/** §3.10's clearance over what the chain wrote since the mark: its new edges, its new vertices and their neighbours. */
function clearSince(ctx: ChainCtx, m: Mark): boolean {
  const p = ctx.p;
  const ends: VertexId[] = [];
  for (const v of ctx.tx.journal.vertices.slice(m.vertices)) {
    if (!isVertexLive(p, v)) continue;
    ends.push(v);
    for (const h of outgoing(p, v)) ends.push(p.halfEdges.origin[h ^ 1]);
  }
  return clearanceProblem(ctx, ctx.journal.newPairs.slice(m.newPairs), ends) === null;
}

/**
 * One chain segment a → b routed and checked (C-0177 (13)): the design route of steps 3 – 4 (`snapRound`); where it leaves
 * §3.10's clearance broken — a tight cluster where step 3's band routes the chain through a vertex whose sub-route then
 * bends away from a vertex the first part was written beside — it is undone and the strict route tried (step 3 routing
 * only through vertices within `minEdge`); where that fails too, the route along existing edges (`routeAlongExisting`).
 * A refusal of the design route is the segment's; a gap no fallback closes throws (a programming error, which B-FUZZ
 * reports).
 */
function routeSegment(ctx: ChainCtx, log: IndexLog, a: VertexId, b: VertexId): KernelResult<null> {
  const m = markOf(ctx, log);
  const r1 = snapRound(ctx, a, b);
  if (!r1.ok || clearSince(ctx, m)) return r1;
  rollback(ctx, log, m);
  ctx.strict = true;
  const r2 = snapRound(ctx, a, b);
  ctx.strict = false;
  if (r2.ok && clearSince(ctx, m)) return r2;
  rollback(ctx, log, m);
  const r3 = routeAlongExisting(ctx, a, b);
  if (!r3.ok) return passOn(r3);
  if (r3.value) return ok(null);
  if (!r2.ok) return r2;
  // §3.6's own fallback before any refusal (N-37): the segment re-routed with every crossing on the placement's
  // endpoint fallback, never split — each such re-route lands on an existing vertex, so the loop ends.
  ctx.endpointCrossings = true;
  const r4 = snapRound(ctx, a, b);
  ctx.endpointCrossings = false;
  if (r4.ok && clearSince(ctx, m)) return r4;
  rollback(ctx, log, m);
  if (!r4.ok && r4.code !== 'E_INVARIANT') return r4;
  const X = ctx.p.vertices.x;
  const Y = ctx.p.vertices.y;
  return err('E_INVARIANT', `insert: no route from (${X[a]}, ${Y[a]}) to (${X[b]}, ${Y[b]}) keeps clearance (§3.10)`);
}

/**
 * §3.4's `insertChain(tx, points, roles, cls, opts)` (see the module comment). `roles` are the chain's edge rows, every
 * new and shared edge gaining each at the batch's level; `opts.knots` its vertex rows.
 */
export function insertChain(tx: InsertTx, points: readonly { readonly x: number; readonly y: number }[], roles: readonly RoleRow[], cls: ChainClass, opts: InsertChainOpts = {}): KernelResult<ChainInsert> {
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
  const ctx: ChainCtx = { tx, p, n, cls, rows: roles, warnings: [], journal, maxPass: 0, strict: false, undo: [] };
  const pairsFrom = journal.newPairs.length;
  const vertsFrom = tx.journal.vertices.length;
  const landed = new Array<VertexId>(dec.points.length).fill(-1);

  // The index writes this op makes are read from the batch's log (the transaction's when open, else one opened here).
  const idx = indexOf(p);
  const openedLog = idx.log === null;
  if (openedLog) beginIndexBatch(p, n);
  const log = idx.log as NonNullable<typeof idx.log>;
  const start = markOf(ctx, log);
  // Step 1's merges go on with the chain (N-7, C-0170 (2)).
  foldWarnings(tx.warnings, d.warnings);
  foldWarnings(ctx.warnings, d.warnings);
  const done = (): void => {
    if (openedLog) endIndexBatch(p);
  };
  const refuse = (r: { readonly code: Parameters<typeof passOn>[0]['code']; readonly detail: string }): KernelResult<ChainInsert> => {
    // Atomic: everything back to the op's start (C-0177 (8)).
    rollback(ctx, log, start);
    done();
    return passOn(r);
  };

  for (const run of dec.runs) {
    const vs = run.vertices;
    const k = vs.length;
    let prev = -1;
    for (let j = 0; j < k; j++) {
      const idx = vs[j];
      let v = landed[idx];
      if (v < 0) {
        const pt = dec.points[idx];
        const prevPt = prev >= 0 ? pointOf(p, prev) : null;
        const nextIdx = j + 1 < k ? vs[j + 1] : run.closed ? vs[0] : -1;
        const nextPt = nextIdx >= 0 ? (landed[nextIdx] >= 0 ? pointOf(p, landed[nextIdx]) : dec.points[nextIdx]) : null;
        const l = land(ctx, pt, prev, prevPt, nextPt);
        if (!l.ok) return refuse(l);
        v = l.value.vertex;
        landed[idx] = v;
        if (l.value.merged) continue;
      }
      if (prev >= 0 && v !== prev) {
        const r = routeSegment(ctx, log, prev, v);
        if (!r.ok) return refuse(r);
      }
      prev = v;
    }
    if (run.closed && prev >= 0 && prev !== landed[vs[0]]) {
      const r = routeSegment(ctx, log, prev, landed[vs[0]]);
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
  // §3.10's clearance on the final arena round everything the chain wrote (a gap in the router throws).
  const ends: VertexId[] = [];
  for (const v of tx.journal.vertices.slice(vertsFrom)) {
    if (!isVertexLive(p, v)) continue;
    ends.push(v);
    for (const h of outgoing(p, v)) ends.push(p.halfEdges.origin[h ^ 1]);
  }
  checkClearance(ctx, journal.newPairs.slice(pairsFrom), ends);
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
  done();
  return ok({ placed }, ctx.warnings);
}
