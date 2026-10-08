// splitThrough(tx, at, p, row?) (§3.4; §3.6 step 2 and *The placement rule*; §2.2 rule 3's Steiner vertices and the
// split flag; §3.3 rule 2's anchor allocation; §3.4 *The doors*). M0-a-04.
//
// The vertex at p on the edge of half-edge `at`, placed by §3.6's placement rule — a Steiner vertex when the edge is
// coarser than the batch (§2.2 rule 3), its flags `steiner | split` (a same-level split foot: `split`) — or, where p's
// foot lies within `attractCm` of an endpoint of the edge, that endpoint (§3.6 step 2), which then takes `row`. The
// edge is the batch's view of it: the level-n route piece holding `at` (the run cut at its vertices of level ≤ n,
// §3.3), whose endpoints the foot is measured against; the placement reads the run's own-level route (§3.6 (i)). The
// edge's endpoints, birth level, faces and own-level roles never change; the new sub-edge carries every row of the one
// it was split from, and the part at the run's handle end keeps the pair, so the run's handle never changes (§3.3).
//
// `row` is a vertex role row — the doors' one way, beside insertChain's knots, to add one (§3.4 *The doors*): an
// `anchor` row given without an ordinal takes its entity's smallest free `anchor` ordinal, from 2 on an enceinte, whose
// 0 and 1 name an open trace's ends (§3.3 rule 2, the allocation rule) — read at the op, so a batch applying its ops in
// canonical order (M0-a-06) allocates by that order; any other indexed row carries its ordinal (an assertion otherwise).
//
// The op is a plan, then a write: `planSplitThrough` reads (charging `insert.points` for p, and the placement's query and
// candidates) and decides every refusal — E_OUT_OF_RANGE, E_LEVEL (a finer edge; a landing on a vertex finer than the
// batch, whose promotion — candidate (b) — is M0-a-05's), E_WORK_LIMIT — so a refused op writes nothing; then
// `applySplitPlan` writes the vertex, the split, the rows, and the index items it changes (§3.3 "No item changes in
// place"), and journals them for the re-walk and the commit record. Readings: C-0169 (5).
import {
  addRole,
  addRoleRow,
  allocEdgePair,
  allocVertex,
  edgeLevel,
  faceWalk,
  handleOf,
  isHalfEdgeLive,
  MAX_ORDINAL,
  roleIdOf,
  roleInfo,
  rowsOfKey,
  rowsOn,
  sameKey,
  VERTEX_SPLIT,
  VERTEX_STEINER,
  type HalfEdgeId,
  type Plat,
  type RoleRow,
  type VertexId,
} from '../arena/index.js';
import {
  homeOf,
  indexAdd,
  indexChange,
  indexDelete,
  ITEM_EDGE,
  ITEM_FACE,
  ITEM_VERTEX,
  query,
  routeHandlePair,
  routeRun,
  type ItemRef,
} from '../index/index.js';
import { err, ok, ratio, snap, withinAttract, type KernelResult, type Warning } from '../num/index.js';
import type { Cm, Id, LatticePoint, Level } from '../types/index.js';
import {
  addWarning,
  charge,
  check,
  foldWarnings,
  INSERT_POINTS,
  passOn,
  workLimitHit,
  type InsertTx,
} from './classes.js';
import { placePoint } from './placement.js';

/** A vertex role row as the op will write it: its ordinal decided (an anchor's allocated). */
export interface PlannedRow {
  readonly role: string;
  readonly entity: Id;
  readonly ordinal: number;
}

/** What the op will do, decided with every refusal before anything is written. */
export type SplitPlan =
  | {
    /** Onto an existing vertex: an endpoint of the edge (step 2's rule) or the placement's fallback. */
    readonly kind: 'existing';
    readonly vertex: VertexId;
    readonly row: PlannedRow | null;
    readonly warnings: readonly Warning[];
  }
  | {
    /** A new vertex at `at` on sub-edge `sub` (directed along its run from the run's handle end). */
    readonly kind: 'new';
    readonly at: LatticePoint;
    readonly sub: HalfEdgeId;
    readonly row: PlannedRow | null;
    readonly warnings: readonly Warning[];
  };

/** The kind of an address id `kind:token`, read past its arena prefix (`under/`, `under3/`, `sky2/`; §2.1 Ids). */
export function addressKind(id: Id): string {
  const colon = id.indexOf(':');
  const slash = id.indexOf('/');
  const from = slash >= 0 && (colon < 0 || slash < colon) ? slash + 1 : 0;
  const to = id.indexOf(':', from);
  return to < 0 ? id.slice(from) : id.slice(from, to);
}

/** The first `anchor` ordinal an entity's contact names take: 2 on an enceinte (0 and 1 are its open trace's ends), else 0. */
export function firstAnchorOrdinal(entity: Id): number {
  return addressKind(entity) === 'enceinte' ? 2 : 0;
}

/** §3.3 rule 2's allocation: the entity's smallest free `anchor` ordinal in this arena, as the arena stands now. */
export function allocateAnchor(p: Plat, entity: Id): number {
  const role = roleIdOf('anchor');
  const h = handleOf(p, entity);
  let o = firstAnchorOrdinal(entity);
  if (h === -1) return o;
  while (rowsOfKey(p, role, h, o).length > 0) {
    o += 1;
    check(o <= MAX_ORDINAL, `entity ${entity} has no free anchor ordinal`);
  }
  return o;
}

/** The row as the op writes it, its programming errors asserted (§3.4: an indexed row other than an anchor carries its ordinal). */
function planRow(p: Plat, row: RoleRow): PlannedRow {
  const id = roleIdOf(row.role);
  check(id >= 0, `no role named ${row.role}`);
  const info = roleInfo(id);
  check(info.kind === 'vertex', `${row.role} is an edge role: splitThrough's row is a vertex role row (§3.4)`);
  check(typeof row.entity === 'string' && row.entity.length > 0, 'a row names its entity by a non-empty address id');
  if (row.ordinal !== undefined) {
    check(Number.isInteger(row.ordinal) && row.ordinal >= 0 && row.ordinal <= MAX_ORDINAL, 'an ordinal is a u16');
    check(info.indexed || row.ordinal === 0, `role ${row.role} is not indexed: its ordinal is 0 (§2.2 rule 7)`);
    return { role: row.role, entity: row.entity, ordinal: row.ordinal };
  }
  if (row.role === 'anchor') return { role: row.role, entity: row.entity, ordinal: allocateAnchor(p, row.entity) };
  check(!info.indexed, `an indexed row (${row.role}) carries its ordinal; only an anchor contact name's is allocated (§3.4)`);
  return { role: row.role, entity: row.entity, ordinal: 0 };
}

/** Does the vertex already carry the row's key? (A second row of one key on one vertex is a programming error.) */
function carries(p: Plat, v: VertexId, row: PlannedRow): boolean {
  const h = handleOf(p, row.entity);
  if (h === -1) return false;
  for (const r of rowsOfKey(p, roleIdOf(row.role), h, row.ordinal)) {
    const t = p.roles;
    let e = t.nextInSet[r];
    for (let guard = 0; e >= 0; e = t.nextInSet[e]) check(++guard <= p.slots.role.top, 'a role set does not end');
    if (-2 - e === v) return true;
  }
  return false;
}

/** The foot of p on the segment a–b, clamped to it (+ − × ÷ only, the division through ratio()). */
function footOn(ax: number, ay: number, bx: number, by: number, px: number, py: number): { x: number; y: number } {
  const ux = bx - ax;
  const uy = by - ay;
  const t = ratio((px - ax) * ux + (py - ay) * uy, ux * ux + uy * uy, 'area');
  check(t.ok, 'an edge spans at least minEdge');
  const c = Math.max(0, Math.min(1, t.value));
  return { x: ax + c * ux, y: ay + c * uy };
}

/** Of two vertices, the nearer to (x, y); ties to the smaller lattice position, y then x. */
function nearer(p: Plat, a: VertexId, b: VertexId, x: number, y: number): VertexId {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const da = (X[a] - x) * (X[a] - x) + (Y[a] - y) * (Y[a] - y);
  const db = (X[b] - x) * (X[b] - x) + (Y[b] - y) * (Y[b] - y);
  if (da !== db) return da < db ? a : b;
  if (Y[a] !== Y[b]) return Y[a] < Y[b] ? a : b;
  return X[a] <= X[b] ? a : b;
}

/**
 * The plan of `splitThrough(tx, at, p, row)`: every read and refusal, nothing written. Its warnings (W_ATTRACTED when p
 * moved onto an endpoint, W_PLACED from the placement) are reported to the transaction when the plan is applied.
 */
export function planSplitThrough(tx: InsertTx, at: HalfEdgeId, pIn: LatticePoint, row?: RoleRow, opts: { chargePoint?: boolean } = {}): KernelResult<SplitPlan> {
  const p = tx.plat;
  check(sameKey(tx.key, p.key), 'a transaction acts on the arena its key names');
  check(isHalfEdgeLive(p, at), `half-edge ${at} is not live`);
  const snapped = snap(pIn.x, pIn.y);
  if (!snapped.ok) return passOn(snapped);
  const pt = snapped.value;
  // p is snapped here and charged to insert.points, unless a chain vertex step 1 already snapped and charged (attraction).
  if (opts.chargePoint !== false && !charge(tx, INSERT_POINTS, 1)) return workLimitHit(INSERT_POINTS);
  const planned = row === undefined ? null : planRow(p, row);
  const n = tx.level;
  const m = edgeLevel(p, at);
  if (m > n) return err('E_LEVEL', `an L${n} batch splits no L${m} edge (§3.3: one level per transaction)`);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const O = p.halfEdges.origin;
  const run = routeRun(p, at).halfEdges;
  let i = 0;
  while (run[i] !== at && run[i] !== (at ^ 1)) i += 1;
  // The level-n route piece holding `at`: the run between its nearest vertices of level ≤ n around it (§3.3).
  let j0 = i;
  while (L[O[run[j0]]] > n) j0 -= 1;
  let j1 = i;
  while (L[O[run[j1] ^ 1]] > n) j1 += 1;
  const a = O[run[j0]];
  const b = O[run[j1] ^ 1];
  const f = footOn(X[a], Y[a], X[b], Y[b], pt.x, pt.y);
  const warnings: Warning[] = [];
  const onto = (v: VertexId): KernelResult<SplitPlan> => {
    if (L[v] > n) return err('E_LEVEL', `vertex at (${X[v]}, ${Y[v]}) is finer than the L${n} batch: promote it first (candidate (b), M0-a-05)`);
    if (planned !== null) check(!carries(p, v, planned), `the vertex at (${X[v]}, ${Y[v]}) already carries (${planned.role}, ${planned.entity}, ${planned.ordinal})`);
    return ok({ kind: 'existing', vertex: v, row: planned, warnings }, warnings);
  };
  // §3.6 step 2: a foot within attractCm of an endpoint of the edge moves onto that endpoint (the nearer; ties y then x).
  const nearA = withinAttract(f.x, f.y, X[a], Y[a]);
  const nearB = withinAttract(f.x, f.y, X[b], Y[b]);
  if (nearA || nearB) {
    const v = nearA && nearB ? nearer(p, a, b, f.x, f.y) : nearA ? a : b;
    if (X[v] !== pt.x || Y[v] !== pt.y) addWarning(warnings, 'W_ATTRACTED', pt);
    return onto(v);
  }
  // A finer vertex on the piece within attractCm of the foot is candidate (b): its promotion is M0-a-05's.
  for (let k = j0 + 1; k <= j1; k++) {
    const v = O[run[k]];
    if (withinAttract(f.x, f.y, X[v], Y[v])) return onto(v);
  }
  // The exact position: p's foot on the run's own-level route (§3.6 (i)).
  const A = O[run[0]];
  const B = O[run[run.length - 1] ^ 1];
  const e = footOn(X[A], Y[A], X[B], Y[B], pt.x, pt.y);
  const placement = placePoint(tx, at, e);
  if (!placement.ok) return passOn(placement);
  foldWarnings(warnings, placement.warnings);
  const pl = placement.value;
  if (pl.kind === 'endpoint') return onto(pl.vertex);
  return ok({ kind: 'new', at: pl.at, sub: pl.sub, row: planned, warnings }, warnings);
}

/**
 * Writes a plan of `planSplitThrough` (nothing here refuses): the vertex and the split — the sub-edge's pair kept at its
 * run's handle end, a new pair beyond the vertex carrying every row of the old one — the vertex's row, the index items
 * the split changes, the journal, and the plan's warnings into the transaction. Returns the vertex.
 */
export function applySplitPlan(tx: InsertTx, plan: SplitPlan): VertexId {
  const p = tx.plat;
  foldWarnings(tx.warnings, plan.warnings);
  if (plan.kind === 'existing') {
    if (plan.row !== null) addRole(p, plan.vertex, { role: plan.row.role, entity: plan.row.entity, ordinal: plan.row.ordinal }, tx.level);
    return plan.vertex;
  }
  const n = tx.level;
  const g = plan.sub;
  const m = edgeLevel(p, g);
  const t0 = p.halfEdges.origin[g ^ 1];
  const journal = tx.journal;
  // A same-level split cuts the run in two (§3.3): its old handle's item, and its home before the batch.
  const oldHandle = m === n ? routeRun(p, g).halfEdges[0] >> 1 : -1;
  const oldItem: ItemRef = { kind: ITEM_EDGE, level: m, slot: oldHandle };
  const homeBefore = oldHandle >= 0 ? homeOf(p, oldItem) : -1;
  // The vertex and the split: g keeps its origin and pair (s → v); a new pair runs v → t.
  const v = allocVertex(p, plan.at, n, VERTEX_SPLIT | (m < n ? VERTEX_STEINER : 0));
  const h = allocEdgePair(p, v, t0, m);
  // Read the tables only now: a full table doubles inside allocVertex / allocEdgePair, which replace p.vertices and
  // p.halfEdges, so a table read before them is a dead copy (N-53 (1); C-0279).
  const T = p.halfEdges;
  const after = T.next[g];
  const before = T.prev[g ^ 1];
  T.next[g] = h;
  T.prev[h] = g;
  T.next[h ^ 1] = g ^ 1;
  T.prev[g ^ 1] = h ^ 1;
  if (after === (g ^ 1)) {
    // t ended the edge (degree 1): the walk turns round at t on the new pair.
    T.next[h] = h ^ 1;
    T.prev[h ^ 1] = h;
  } else {
    T.next[h] = after;
    T.prev[after] = h;
    T.next[before] = h ^ 1;
    T.prev[h ^ 1] = before;
  }
  T.origin[g ^ 1] = v;
  p.vertices.out[v] = h;
  if (p.vertices.out[t0] === (g ^ 1)) p.vertices.out[t0] = h ^ 1;
  const R = p.roles;
  for (const r of rowsOn(p, 'edge', g)) addRoleRow(p, h, R.kind[r], R.entity[r], R.level[r] as Level, R.ordinal[r]);
  // The index (§3.3 "No item changes in place"): a same-level split's two runs, the vertex, the faces whose own-level
  // rings gained it.
  if (oldHandle >= 0) {
    const h1 = routeHandlePair(p, g);
    const h2 = routeHandlePair(p, h);
    if (oldHandle === h1 || oldHandle === h2) {
      indexChange(p, oldItem);
      journal.changed.push({ item: oldItem, homeBefore, successor: oldItem });
      indexAdd(p, { kind: ITEM_EDGE, level: m, slot: oldHandle === h1 ? h2 : h1 });
    } else {
      indexDelete(p, oldItem);
      journal.changed.push({ item: oldItem, homeBefore, successor: null });
      indexAdd(p, { kind: ITEM_EDGE, level: m, slot: h1 });
      indexAdd(p, { kind: ITEM_EDGE, level: m, slot: h2 });
    }
  }
  indexAdd(p, { kind: ITEM_VERTEX, level: n, slot: v });
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = T.origin;
  for (let l = n; l <= 4; l++) {
    const lv = l as Level;
    const box = { minX: X[v] - 4, minY: Y[v] - 4, maxX: X[v] + 4, maxY: Y[v] + 4 };
    for (const f of query(p, tx.key, lv, box, { faces: true }).faces) {
      if (!faceWalk(p, lv, f).some((ring) => ring.some((e) => O[e] === v))) continue;
      const item: ItemRef = { kind: ITEM_FACE, level: lv, slot: f };
      journal.changed.push({ item, homeBefore: homeOf(p, item), successor: item });
      indexChange(p, item);
    }
  }
  journal.vertices.push(v);
  journal.pairs.push(h >> 1);
  journal.split.push(g);
  if (m < n) journal.steiner += 1;
  if (plan.row !== null) addRole(p, v, { role: plan.row.role, entity: plan.row.entity, ordinal: plan.row.ordinal }, n);
  return v;
}

/**
 * §3.4's `splitThrough(tx, at, p, row?)`: the vertex at p on the edge of half-edge `at` (see the module comment), with
 * `row` on it. Refusals write nothing: E_OUT_OF_RANGE (p), E_LEVEL (a finer edge, or a landing on a vertex finer than
 * the batch), E_WORK_LIMIT. A closed transaction (a stale overlay of a committed or rejected batch) throws before
 * anything is read or charged — a programming error, as tx's own writers (N-55 (5), N-53 (3); C-0294).
 */
export function splitThrough(tx: InsertTx, at: HalfEdgeId, p: LatticePoint, row?: RoleRow): KernelResult<VertexId> {
  check(tx.closed !== true, 'the transaction is closed (committed or rejected)');
  const plan = planSplitThrough(tx, at, p, row);
  if (!plan.ok) return passOn(plan);
  const v = applySplitPlan(tx, plan.value);
  return ok(v, plan.value.warnings.map((w) => (w.at === undefined ? { code: w.code, count: w.count } : { code: w.code, count: w.count, at: w.at })));
}

/** A lattice point of the plan's target (the new vertex's point, or the existing vertex's). */
export function planPoint(p: Plat, plan: SplitPlan): LatticePoint {
  if (plan.kind === 'new') return plan.at;
  return { x: p.vertices.x[plan.vertex] as Cm, y: p.vertices.y[plan.vertex] as Cm };
}
