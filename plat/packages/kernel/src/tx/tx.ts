// The transaction (§3.3; §14's `tx(tx, fn?)`): one batch, one level, applied to the overlay, checked, then committed
// atomically or rejected at the arena's prior version. M0-a-06. Readings: C-0185.
//
// * **Two op forms.** Declared (`KernelTx.ops`): independent ops, applied sorted by a stable key — op-kind rank (§3.4's
//   list order), then the owning entity's lineage key (§6.3: its 64-bit hash, high word first), then the op's index in
//   that entity's stream path — so the committed arena is a function of the prior arena and the op *set*, never of the
//   order the stage issued them in; two ops with one key are a programming error. Callback (`fn`): `fn` gets the open
//   overlay and each op it issues applies at once, in issue order. Both at once is a programming error (an assertion).
// * **Atomic.** The overlay is the arena written in place over a before-image (savepoint.ts, C-0185 (1)); a rejected
//   batch puts the image back, so the arena, its index and its version are as they were. A batch that writes nothing
//   commits nothing and keeps the version. A throw anywhere in the batch (an op's, the callback's, a check's — §3.11's
//   assertion class, a programming error or a corrupted arena) puts the image back too and is rethrown, never turned
//   into a refusal, its message prefixed `tx <stage>/L<level>/<form>/<op>: ` and the original kept as its `cause`
//   (C-0287).
// * **Work limits.** Every op charges operation counts to the batch (§3.3); a batch whose total exceeds `workLimit`
//   returns E_WORK_LIMIT and commits nothing — a count, never a clock (C-0185 (5)).
// * **Checks at commit.** `expect`'s class floors (E_BELOW_MIN_WIDTH / _AREA / _ANGLE) and named checks (E_INVARIANT)
//   on the touched faces of the batch's level, under `onFail` — reject (tier 1), repair (tier 2: the injected repairer,
//   M0-a-07's absorbSliver, on each face below a width or area floor, then checked again), downgrade (tier 4) — then the
//   batch-local kernel rows this item owns (role consistency, level consistency, index freshness) and M0-a-14's suite
//   through `env.invariants`; any failure rejects.
// * **The commit record** (§3.3) is assembled from the writers' journals against the before-image: the dirty faces per
//   level ≥ the batch's, the four counts, the work, the promoted, demoted and unflagged vertices, the owners and the
//   role keys — every list in a canonical order (lattice positions, canonical face keys, address ids, rule 7's order),
//   never a slot order. The digest hook gets its dirty set (`env.onCommit`, M0-d-04).
import {
  commitVersion,
  compareKeys,
  compareVertices,
  dest,
  faceKey,
  FREE_KIND,
  handleOf,
  idOf,
  isFaceLive,
  isHalfEdgeLive,
  isPlatKey,
  isVertexLive,
  outgoing,
  roleIdOf,
  roleInfo,
  rowElement,
  rowKey,
  rowsOn,
  sameKey,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { dmath } from '../dmath/index.js';
import { obb } from '../geom/index.js';
import { beginIndexBatch, checkIndexBatch, endIndexBatch, faceRouteRings, indexOf, isItemLive, ITEM_FACE, query } from '../index/index.js';
import { faceArea2 } from '../index/items.js';
import { chainJournal } from '../insert/index.js';
import { comparePoints, PI, segmentCloserThan } from '../num/exact.js';
import { err, ok, type KernelError, type KernelResult } from '../num/index.js';
import type { Cm, Id, LatticePoint, Level, RoleKey, StageId } from '../types/index.js';
import { pairsOfKey } from './chains.js';
import { ownerBefore, restoreSavepoint, takeSavepoint, wasFaceLive } from './savepoint.js';
import { check, emptyLog, markOpen, notBuilt, noteRow, roleKeyText, type OpenTx } from './state.js';
import { OP_KINDS, type ClassFloor, type CommitRecord, type DirtySet, type KernelOp, type KernelTx, type LevelDirt, type Overlay, type TxEnv } from './types.js';

/** What a committed batch returns: its commit record (null when it wrote nothing) and the ops' or the callback's value. */
export interface Committed<T> {
  readonly record: CommitRecord | null;
  readonly value: T;
}

/** A u8 stage rank (§2.2's `LevelFaces.stage`). */
function rankOf(env: TxEnv, stage: StageId): number {
  const r = env.rankOf !== undefined ? env.rankOf(stage) : (stage as number);
  check(Number.isInteger(r) && r >= 0 && r <= 255, `stage ${stage as number} has no u8 rank (§4.1's order; M0-x-04's table via env.rankOf)`);
  return r;
}

function isTransientKey(k: KernelTx['key']): k is Extract<KernelTx['key'], { transient: true }> {
  return typeof k === 'object' && k !== null && 'transient' in k;
}

/** Opens the batch on arena `p`: every declaration checked, the before-image taken, the index's batch log opened. */
function open(p: Plat, spec: KernelTx, env: TxEnv): OpenTx {
  if (isTransientKey(spec.key)) notBuilt('M6-P', 'a transaction on a transient arena (§3.4; TransientKey is M0-a-16\'s, C-0041)');
  check(isPlatKey(spec.key) && sameKey(spec.key, p.key), 'a transaction acts on the arena its key names (§3.4)');
  check(spec.level === 0 || spec.level === 1 || spec.level === 2 || spec.level === 3 || spec.level === 4, 'a batch level is 0 … 4');
  check(Number.isFinite(spec.workLimit) && spec.workLimit >= 0, 'a work limit is a finite count of operations ≥ 0 (C-0185 (5))');
  check(spec.onFail === 'reject' || spec.onFail === 'repair' || spec.onFail === 'downgrade', 'onFail is reject, repair or downgrade');
  if (spec.clearRegion !== undefined) notBuilt('M3a', 'a clear-region batch (KernelTx.clearRegion, §3.3)');
  if (spec.prepared !== undefined) notBuilt('M3a', 'prepared contacts (KernelTx.prepared, §3.3)');
  for (const e of spec.expect) {
    check(e.scope === 'batch' && e.class === 'hard', `expect holds the batch-scope hard rows only (${e.name}: §3.3; a soft row goes to the report)`);
    check(e.kind === 'classFloor' ? typeof e.faceClass === 'string' : typeof e.check === 'string', `expect entry ${e.name} names its face class or its check`);
  }
  check(p.index !== undefined, 'a transaction needs the arena\'s spatial index (attachIndex)');
  check(indexOf(p).log === null, 'another batch is open on this arena');
  const savepoint = takeSavepoint(p);
  const indexLog = beginIndexBatch(p, spec.level);
  const t: OpenTx = {
    open: true,
    plat: p,
    key: { layer: spec.key.layer, part: spec.key.part },
    level: spec.level,
    workLimit: spec.workLimit,
    work: { total: 0, counts: new Map() },
    warnings: [],
    journal: { vertices: [], pairs: [], split: [], steiner: 0, changed: [] },
    spec,
    env,
    stageRank: rankOf(env, spec.stage),
    keptBelow: rankOf(env, spec.rederivesFrom),
    savepoint,
    indexLog,
    log: emptyLog(),
    failed: null,
    closed: false,
    op: 'open',
  };
  markOpen(t);
  return t;
}

/** Is the batch over its work limit, or doomed by an op that reached it? (Read fresh: ops change it.) */
function overWork(t: OpenTx): boolean {
  return t.work.total > t.workLimit || t.failed !== null;
}

/** The detail of a work-limit refusal: the counter that crossed the limit, where an op named it. */
function workDetail(t: OpenTx, fallback: string): string {
  const f: { readonly detail: string } | null = t.failed;
  return f === null ? fallback : f.detail;
}

/** Rejects: the before-image back, the batch closed. */
function reject<T>(t: OpenTx, code: KernelError, detail: string): KernelResult<T> {
  restoreSavepoint(t.savepoint);
  t.closed = true;
  return err<T>(code, detail);
}

/** Two lineage keys (Hash64: words low first) as unsigned 64-bit numbers. */
function compareLineage(a: readonly [number, number], b: readonly [number, number]): number {
  if (a[1] !== b[1]) return a[1] < b[1] ? -1 : 1;
  if (a[0] !== b[0]) return a[0] < b[0] ? -1 : 1;
  return 0;
}

const RANK = new Map<string, number>(OP_KINDS.map((k, i) => [k, i]));

/** The declared form's canonical order (§3.3): op-kind rank, lineage key, index; two ops with one key are refused. */
export function canonicalOrder(ops: readonly KernelOp[]): number[] {
  for (const op of ops) {
    check(RANK.has(op.kind), `no writer named ${op.kind} (§3.4)`);
    check(op.lineage.length === 2 && op.lineage.every((w) => Number.isInteger(w) && w >= 0 && w <= 0xffffffff), 'a lineage key is a Hash64: two u32 words');
    check(Number.isInteger(op.index) && op.index >= 0, 'an op index is a whole number ≥ 0');
  }
  const order = ops.map((_, i) => i);
  const cmp = (i: number, j: number): number => {
    const a = ops[i];
    const b = ops[j];
    return ((RANK.get(a.kind) as number) - (RANK.get(b.kind) as number)) || compareLineage(a.lineage, b.lineage) || (a.index - b.index);
  };
  order.sort(cmp);
  for (let k = 1; k < order.length; k++) check(cmp(order[k - 1], order[k]) !== 0, 'two declared ops share one sort key (kind, lineage, index): their order would be the issue order (§3.3)');
  return order;
}

/** Did the batch write anything (a journal entry of any writer)? */
function wroteAnything(t: OpenTx): boolean {
  const J = t.journal;
  const C = chainJournal(t);
  const L = t.log;
  return J.vertices.length + J.pairs.length + J.split.length + J.changed.length > 0
    || C.newPairs.length + C.sharedPairs.length + C.promoted.length + C.materialised.length > 0
    || C.faces.some((f) => f.created.length + f.changed.length + f.removed.length > 0)
    || L.faces.some((f) => f.created.length + f.changed.length + f.removed.length > 0)
    || L.pairs.length + L.vertices.length + L.edgesRemoved + L.promoted.length + L.demotedVertices.length + L.demotedEdges.length + L.unflagged.length > 0
    || L.owners.size + L.roles.size > 0;
}

/**
 * Vertex role rows a writer added without journaling their vertex — splitThrough landing on an existing vertex, which
 * takes its row (M0-a-04's `applySplitPlan`) — found against the before-image: their keys are noted and their vertices
 * logged, so a batch whose only write is such a row (a contact name on an existing vertex) commits it and the record
 * lists its key (C-0189). O(role slots), as the before-image is O(arena) (C-0185 (1)).
 */
function sweepVertexRows(t: OpenTx): void {
  const p = t.plat;
  const R = p.roles;
  const S = t.savepoint.roles;
  const topBefore = t.savepoint.slots.role.top;
  for (let r = 0; r < p.slots.role.top; r++) {
    if (R.kind[r] === FREE_KIND || roleInfo(R.kind[r]).kind !== 'vertex') continue;
    if (r < topBefore && S.kind[r] === R.kind[r] && S.entity[r] === R.entity[r] && S.ordinal[r] === R.ordinal[r] && S.level[r] === R.level[r]) continue;
    t.log.vertices.push(rowElement(p, r));
    noteRow(t, R.kind[r], R.entity[r], R.ordinal[r]);
  }
}

// ---- the commit record ----------------------------------------------------------------------------------------------

/** The dirty faces per level ≥ the batch's: every record a writer named, classified against the before-image. */
function dirtyFaces(t: OpenTx): LevelDirt[] {
  const p = t.plat;
  const C = chainJournal(t);
  const out: LevelDirt[] = [];
  for (let l = t.level; l <= 4; l++) {
    const lv = l as Level;
    const named: FaceId[] = [];
    named.push(...C.faces[lv].created, ...C.faces[lv].changed, ...C.faces[lv].removed);
    for (const c of t.journal.changed) if (c.item.kind === ITEM_FACE && c.item.level === lv) named.push(c.item.slot);
    named.push(...t.log.faces[lv].created, ...t.log.faces[lv].changed, ...t.log.faces[lv].removed);
    const created: FaceId[] = [];
    const changed: FaceId[] = [];
    const removed: FaceId[] = [];
    for (const f of [...new Set(named)]) {
      const was = wasFaceLive(t.savepoint, lv, f);
      const is = isFaceLive(p, lv, f);
      if (!was && is) created.push(f);
      else if (was && is) changed.push(f);
      else if (was && !is) removed.push(f);
    }
    const byKey = (a: FaceId, b: FaceId): number => {
      const ka = faceKey(p, lv, a);
      const kb = faceKey(p, lv, b);
      return compareVertices(p, ka[0], kb[0]) || compareVertices(p, ka[1], kb[1]);
    };
    // A removed record is ordered by the key it had (its writer kept it), never by its slot.
    const keyOf = (f: FaceId): readonly [LatticePoint, LatticePoint] | undefined => t.log.removedKeys.get(`${lv}:${f}`);
    removed.sort((a, b) => {
      const ka = keyOf(a);
      const kb = keyOf(b);
      check(ka !== undefined && kb !== undefined, 'a removed record\'s key was kept by the writer that removed it');
      return comparePoints(ka[0], kb[0]) || comparePoints(ka[1], kb[1]);
    });
    out.push({ level: lv, created: created.sort(byKey), changed: changed.sort(byKey), removed });
  }
  return out;
}

function byPosition(p: Plat, vs: Iterable<VertexId>): VertexId[] {
  return [...new Set(vs)].filter((v) => isVertexLive(p, v)).sort((a, b) => compareVertices(p, a, b));
}

/** The record's role keys: this item's writers' and every row on the pairs and vertices the insertion journals name. */
function roleKeys(t: OpenTx): RoleKey[] {
  const p = t.plat;
  const C = chainJournal(t);
  const keys = new Map<string, RoleKey>(t.log.roles);
  const add = (r: number): void => {
    const k = rowKey(p, r);
    keys.set(roleKeyText(k), k);
  };
  for (const e of [...new Set([...C.newPairs, ...C.sharedPairs, ...t.journal.pairs, ...t.journal.split.map((h) => h >> 1)])]) {
    if (isHalfEdgeLive(p, 2 * e)) for (const r of rowsOn(p, 'edge', 2 * e)) add(r);
  }
  for (const v of [...new Set([...t.journal.vertices, ...C.promoted])]) if (isVertexLive(p, v)) for (const r of rowsOn(p, 'vertex', v)) add(r);
  const list = [...keys.values()];
  list.sort((a, b) => {
    const ra = roleIdOf(a.role);
    const rb = roleIdOf(b.role);
    if (ra !== rb) return roleInfo(ra).rank - roleInfo(rb).rank;
    return compareKeys(a.entity, b.entity) || a.ordinal - b.ordinal;
  });
  return list;
}

/** The commit record at the overlay's current state (its version the one the commit will give). */
function assemble(t: OpenTx, version: number): CommitRecord {
  const p = t.plat;
  const C = chainJournal(t);
  const faces = dirtyFaces(t);
  const owners = new Set<Id>(t.log.owners);
  for (const d of faces) {
    for (const f of [...d.created, ...d.changed]) {
      const o = p.faces[d.level].owner[f];
      if (o >= 0) owners.add(idOf(p, o));
    }
    for (const f of [...d.changed, ...d.removed]) {
      const o = ownerBefore(t.savepoint, d.level, f);
      if (o >= 0) owners.add(idOf(p, o));
    }
  }
  const demotedEdges = [...new Set(t.log.demotedEdges)].filter((h) => isHalfEdgeLive(p, h)).sort((a, b) => {
    const ea = [p.halfEdges.origin[a], dest(p, a)];
    const eb = [p.halfEdges.origin[b], dest(p, b)];
    return compareVertices(p, ea[0], eb[0]) || compareVertices(p, ea[1], eb[1]);
  });
  return {
    version,
    key: { layer: t.key.layer, part: t.key.part },
    level: t.level,
    faces,
    edgesAdded: t.journal.pairs.length + C.newPairs.length,
    edgesRemoved: t.log.edgesRemoved,
    steinerAdded: t.journal.steiner,
    steinerDissolved: t.log.steinerDissolved,
    work: t.work.total,
    moved: byPosition(p, t.log.moved),
    promoted: byPosition(p, [...C.promoted, ...t.log.promoted]),
    demoted: { vertices: byPosition(p, t.log.demotedVertices), edges: demotedEdges },
    unflagged: byPosition(p, t.log.unflagged),
    owners: [...owners].sort(compareKeys),
    roles: roleKeys(t),
    warnings: t.warnings.map((w) => (w.at === undefined ? { code: w.code, count: w.count } : { code: w.code, count: w.count, at: { x: w.at.x, y: w.at.y } })),
  };
}

/** The faces a commit record names, summed over its levels (the "touched faces" of §13.2's cost-model claim). */
export function touchedFaces(r: CommitRecord): number {
  let n = 0;
  for (const d of r.faces) n += d.created.length + d.changed.length + d.removed.length;
  return n;
}

// ---- expectations (§3.3 *Expectations*) -----------------------------------------------------------------------------

/** One failed expectation: its code and detail, and for a width or area floor the face a repair would absorb. */
interface Failure {
  readonly code: KernelError;
  readonly detail: string;
  readonly face: FaceId;
  readonly floor: ClassFloor | null;
  readonly repairable: boolean;
}

function routePoints(p: Plat, ring: readonly VertexId[]): LatticePoint[] {
  return ring.map((v) => ({ x: p.vertices.x[v] as Cm, y: p.vertices.y[v] as Cm }));
}

/**
 * Does a route ring (the face on its left) have a corner below `cdeg` (§3.10's angle row, decided on lattice points)? It
 * stops at the first such corner and allocates nothing; the suite's `acuteCorners` (invariants/batch.ts) lists them all.
 */
function cornerBelow(p: Plat, ring: readonly VertexId[], cdeg: number): boolean {
  const n = ring.length;
  if (n < 3) return false;
  const phi = (cdeg * PI) / 18_000;
  const c = dmath.cos(phi);
  const s = dmath.sin(phi);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  for (let i = 0; i < n; i++) {
    const a = ring[(i + n - 1) % n];
    const b = ring[i];
    const d = ring[(i + 1) % n];
    const ux = X[b] - X[a];
    const uy = Y[b] - Y[a];
    const vx = X[d] - X[b];
    const vy = Y[d] - Y[b];
    const cross = ux * vy - uy * vx;
    const dot = ux * vx + uy * vy;
    // The interior angle π − turn is below φ when the left turn exceeds π − φ (cross > 0), or the ring reverses there.
    if ((cross > 0 && cross * c + dot * s < 0) || (cross === 0 && dot < 0)) return true;
  }
  return false;
}

/** A face's width (cm): the injected measure, else its own-level outer ring's OBB minor extent (C-0185 (11)). */
function widthOf(t: OpenTx, level: Level, f: FaceId): number {
  if (t.env.width !== undefined) return t.env.width(t.plat, level, f);
  const r = obb(routePoints(t.plat, faceRouteRings(t.plat, level, f, level)[0]));
  return r.ok ? r.value.minorCm : 0;
}

/** The touched faces of the batch's level (created or changed, live), canonically ordered. */
function touchedAtLevel(t: OpenTx): FaceId[] {
  const d = dirtyFaces(t).find((x) => x.level === t.level) as LevelDirt;
  const p = t.plat;
  return [...d.created, ...d.changed].sort((a, b) => {
    const ka = faceKey(p, t.level, a);
    const kb = faceKey(p, t.level, b);
    return compareVertices(p, ka[0], kb[0]) || compareVertices(p, ka[1], kb[1]);
  });
}

/** Every failed expect entry on the current overlay, in entry order then face order. */
function failures(t: OpenTx): Failure[] {
  const p = t.plat;
  const faces = touchedAtLevel(t);
  const out: Failure[] = [];
  for (const e of t.spec.expect) {
    if (e.kind === 'check') {
      const fn = t.env.checks?.[e.check as string];
      check(fn !== undefined, `expect names the check ${e.check as string}, which the environment does not provide`);
      const detail = fn({ plat: p, level: t.level, faces });
      if (detail !== null) out.push({ code: 'E_INVARIANT', detail: `${e.name}: ${detail}`, face: -1, floor: null, repairable: false });
      continue;
    }
    const floor = t.env.floors?.(e.faceClass as string);
    if (floor === undefined) continue;
    for (const f of faces) {
      if (t.env.appliesTo !== undefined && !t.env.appliesTo(e.faceClass as string, p, t.level, f)) continue;
      if (floor.minWidthCm !== undefined && widthOf(t, t.level, f) < floor.minWidthCm) {
        out.push({ code: 'E_BELOW_MIN_WIDTH', detail: `${e.name}: a ${e.faceClass as string} face below ${floor.minWidthCm} cm wide`, face: f, floor, repairable: true });
      } else if (floor.minAreaCm2 !== undefined && faceArea2(p, t.level, f) < 2 * floor.minAreaCm2) {
        out.push({ code: 'E_BELOW_MIN_AREA', detail: `${e.name}: a ${e.faceClass as string} face below ${floor.minAreaCm2} cm²`, face: f, floor, repairable: true });
      } else if (floor.minAngleCdeg !== undefined && faceRouteRings(p, t.level, f, t.level).some((r) => cornerBelow(p, r, floor.minAngleCdeg as number))) {
        out.push({ code: 'E_BELOW_MIN_ANGLE', detail: `${e.name}: a ${e.faceClass as string} face with a corner below ${floor.minAngleCdeg} cdeg`, face: f, floor, repairable: false });
      }
    }
  }
  return out;
}

// ---- the kernel's batch-local rows this item owns -------------------------------------------------------------------

/**
 * The declared part counts of the linear roles (§3.10's role-consistency row: "the connected simple chains or rings the
 * entity declares"): a way, a wall trace, a tunnel, a gallery, a rim, a chamber outline and a deck span are one chain
 * each; a shore, a bank, the margin and the border are simple chains or rings of any number (C-0185 (8)).
 */
export const LINEAR_PARTS: Readonly<Record<string, number | null>> = Object.freeze({
  way: 1, wall: 1, tunnel: 1, gallery: 1, rim: 1, chamber_wall: 1, deck: 1, shore: null, bank: null, margin: null, border: null,
});

/** Role consistency on the batch's role keys: each linear key's edges simple (degree ≤ 2) and in at most its declared parts. */
function roleProblems(t: OpenTx, keys: readonly RoleKey[]): string[] {
  const p = t.plat;
  const out: string[] = [];
  for (const k of keys) {
    if (!(k.role in LINEAR_PARTS) || roleInfo(roleIdOf(k.role)).kind !== 'edge') continue;
    const declared = t.env.chainParts !== undefined ? t.env.chainParts(k.role, k.entity) : LINEAR_PARTS[k.role];
    const pairs = handleOf(p, k.entity) < 0 ? [] : pairsOfKey(p, { role: k.role, entity: k.entity, ordinal: k.ordinal });
    if (pairs.length === 0) continue;
    const O = p.halfEdges.origin;
    const deg = new Map<VertexId, number>();
    const parent = new Map<VertexId, VertexId>();
    const find = (v: VertexId): VertexId => {
      let r = v;
      while (parent.get(r) !== r) r = parent.get(r) as VertexId;
      return r;
    };
    for (const e of pairs) {
      for (const v of [O[2 * e], O[2 * e + 1]]) {
        deg.set(v, (deg.get(v) ?? 0) + 1);
        if (!parent.has(v)) parent.set(v, v);
      }
      parent.set(find(O[2 * e]), find(O[2 * e + 1]));
    }
    const branch = [...deg.values()].some((d) => d > 2);
    const parts = new Set([...parent.keys()].map(find)).size;
    if (branch) out.push(`(${k.role}, ${k.entity}) branches: a linear role forms simple chains or rings (§3.10 role consistency)`);
    if (declared !== null && parts > declared) out.push(`(${k.role}, ${k.entity}) lies in ${parts} parts, more than the ${declared} it declares (§3.10 role consistency; split it by rekey first, §3.4)`);
  }
  return out;
}

/** §3.10's level-consistency row on the vertices and edges the batch touched. */
function levelProblems(t: OpenTx): string[] {
  const p = t.plat;
  const T = p.halfEdges;
  const R = p.roles;
  const C = chainJournal(t);
  const out: string[] = [];
  const pairs = [...new Set([...C.newPairs, ...C.sharedPairs, ...t.journal.pairs, ...t.journal.split.map((h) => h >> 1), ...t.log.pairs])];
  const vs = new Set<VertexId>([...t.journal.vertices, ...C.promoted, ...t.log.vertices, ...t.log.demotedVertices, ...t.log.promoted]);
  for (const e of pairs) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    let lowest = 5;
    for (const r of rowsOn(p, 'edge', 2 * e)) lowest = Math.min(lowest, R.level[r]);
    if (lowest !== T.level[e]) out.push(`an edge's birth level L${T.level[e]} is not the lowest level among its rows (L${lowest})`);
    vs.add(T.origin[2 * e]);
    vs.add(T.origin[2 * e + 1]);
  }
  for (const v of vs) {
    if (!isVertexLive(p, v)) continue;
    const lv = p.vertices.level[v];
    const inc = outgoing(p, v);
    const vr = rowsOn(p, 'vertex', v);
    if (inc.length + vr.length > 0 && !inc.some((h) => T.level[h >> 1] <= lv) && !vr.some((r) => R.level[r] <= lv)) {
      out.push(`a vertex at (${p.vertices.x[v]}, ${p.vertices.y[v]}) is coarser than every edge and row at it`);
    }
    const coarser = inc.filter((h) => T.level[h >> 1] < lv);
    if (coarser.length === 0) continue;
    const same = coarser.length === 2 && T.level[coarser[0] >> 1] === T.level[coarser[1] >> 1];
    const rowsAt = (h: HalfEdgeId): string => rowsOn(p, 'edge', h).filter((r) => R.level[r] === T.level[h >> 1]).map((r) => `${R.kind[r]}/${R.entity[r]}/${R.ordinal[r]}`).join(';');
    if (!same || rowsAt(coarser[0]) !== rowsAt(coarser[1])) out.push(`a vertex at (${p.vertices.x[v]}, ${p.vertices.y[v]}) finer than its edges lies inside no single run`);
  }
  return out;
}

/**
 * §3.10's clearance row on what this item's writers changed: a removal ends one-rings — a vertex beside an edge it was
 * joined to through a deleted edge is no longer exempt — and a dissolution straightens a run by up to the hot pixel, so
 * every vertex they touched stands at least `minEdge` from every edge outside its one-ring, and every edge they changed
 * from every vertex outside its ends' one-rings (C-0185 (4)). The insertion keeps the row for what it writes (M0-a-05).
 */
function clearanceProblems(t: OpenTx): string[] {
  const p = t.plat;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const r = p.lattice.minEdgeCm;
  const ring = (v: VertexId): Set<VertexId> => new Set(outgoing(p, v).map((h) => O[h ^ 1]));
  const out: string[] = [];
  const vs = [...new Set([...t.log.vertices, ...t.log.demotedVertices])].filter((v) => isVertexLive(p, v));
  for (const v of vs) {
    const nv = ring(v);
    const box = { minX: X[v] - r, minY: Y[v] - r, maxX: X[v] + r, maxY: Y[v] + r };
    for (const h of query(p, t.key, 4, box, { edges: true }).edges) {
      const a = O[h];
      const b = O[h ^ 1];
      if (a === v || b === v || nv.has(a) || nv.has(b)) continue;
      if (segmentCloserThan(X[v], Y[v], X[a], Y[a], X[b], Y[b], r)) out.push(`clearance: the vertex (${X[v]}, ${Y[v]}) stands within minEdge of the edge (${X[a]}, ${Y[a]})–(${X[b]}, ${Y[b]}) (§3.10)`);
    }
  }
  for (const e of [...new Set(t.log.pairs)]) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    const a = O[2 * e];
    const b = O[2 * e + 1];
    const na = ring(a);
    const nb = ring(b);
    const box = { minX: Math.min(X[a], X[b]) - r, minY: Math.min(Y[a], Y[b]) - r, maxX: Math.max(X[a], X[b]) + r, maxY: Math.max(Y[a], Y[b]) + r };
    for (const v of query(p, t.key, 4, box, { vertices: true }).vertices) {
      if (v === a || v === b || na.has(v) || nb.has(v)) continue;
      if (segmentCloserThan(X[v], Y[v], X[a], Y[a], X[b], Y[b], r)) out.push(`clearance: the edge (${X[a]}, ${Y[a]})–(${X[b]}, ${Y[b]}) stands within minEdge of the vertex (${X[v]}, ${Y[v]}) (§3.10)`);
    }
  }
  return out;
}

// ---- tx(tx, fn?) ------------------------------------------------------------------------------------------------------

/**
 * §14's `tx(tx, fn?)` on arena `p` (the façade maps the key to its arena, M0-a-16): exactly one form — `tx.ops`
 * (declared) or `fn` (callback). Returns the commit record and the ops' values in issue order (declared) or `fn`'s value
 * (callback); a refusal — an op's, `fn`'s, E_WORK_LIMIT, a failed expectation or a failed kernel row — leaves the arena
 * at its prior version. `env` carries the injected services (types.ts `TxEnv`).
 */
export function tx<T>(p: Plat, spec: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>, env: TxEnv = {}): KernelResult<Committed<T | KernelResult<unknown>[]>> {
  check(!(fn !== undefined && spec.ops.length > 0), 'a transaction supplies its ops or a callback, never both (§3.3 *Two op forms*)');
  const t = open(p, spec, env);
  try {
    return run(t, fn);
  } catch (e) {
    // A programming error anywhere in the batch (an op's, the callback's, a check's) or a corrupted arena (§3.11's
    // assertion class stays a throw, C-0287): the arena, its index and its version as they were, the batch closed, the
    // error rethrown with where it arose. A throw after the commit (the digest listener's) leaves the commit standing.
    if (!t.closed) {
      restoreSavepoint(t.savepoint);
      t.closed = true;
    }
    throw rethrown(t, fn === undefined ? 'declared' : 'callback', e);
  }
}

/** The error a throw inside a batch is rethrown as: `tx <stage>/L<level>/<form>/<op>: <message>`, the original its cause. */
function rethrown(t: OpenTx, form: 'declared' | 'callback', e: unknown): Error {
  const message = e instanceof Error ? e.message : String(e);
  return new Error(`tx ${String(t.spec.stage)}/L${t.level}/${form}/${t.op}: ${message}`, { cause: e });
}

/** The batch on its open overlay: the ops or the callback, the expectations, the kernel rows, the commit. */
function run<T>(t: OpenTx, fn: ((overlay: Overlay) => KernelResult<T>) | undefined): KernelResult<Committed<T | KernelResult<unknown>[]>> {
  const p = t.plat;
  const spec = t.spec;
  const env = t.env;
  let value: T | KernelResult<unknown>[];
  if (fn === undefined) {
    const results: KernelResult<unknown>[] = spec.ops.map(() => err('E_INVARIANT', 'not applied'));
    t.op = 'order';
    const order = canonicalOrder(spec.ops);
    // Every op reads the arena as the batch found it before any applies (C-0189).
    for (const i of order) {
      t.op = `${spec.ops[i].kind} (prepare)`;
      spec.ops[i].prepare?.(t);
    }
    for (const i of order) {
      t.op = spec.ops[i].kind;
      const r = spec.ops[i].apply(t);
      results[i] = r;
      if (!r.ok) {
        if (overWork(t)) return reject(t, 'E_WORK_LIMIT', workDetail(t, r.detail));
        return reject(t, r.code, `${spec.ops[i].kind} (op ${i}): ${r.detail}`);
      }
    }
    value = results;
  } else {
    t.op = 'fn';
    const r = fn(t);
    if (overWork(t)) return reject(t, 'E_WORK_LIMIT', workDetail(t, 'the batch exceeded its work limit'));
    if (!r.ok) return reject(t, r.code, r.detail);
    value = r.value;
  }
  t.op = 'commit';
  if (overWork(t)) return reject(t, 'E_WORK_LIMIT', workDetail(t, 'the batch exceeded its work limit'));
  sweepVertexRows(t);
  if (!wroteAnything(t)) {
    // A batch with no op commits nothing and keeps the version (§3.3).
    restoreSavepoint(t.savepoint);
    t.closed = true;
    return ok({ record: null, value }, []);
  }
  // Expectations, under onFail.
  let failed = failures(t);
  if (failed.length > 0 && spec.onFail === 'repair') {
    check(env.repair !== undefined, 'onFail \'repair\' needs the injected repairer (absorbSliver, M0-a-07)');
    for (const f of failed) {
      if (!f.repairable || !isFaceLive(p, t.level, f.face)) continue;
      const floor = f.floor as ClassFloor;
      const r = env.repair(t, f.face, { minWidthCm: floor.minWidthCm ?? 0, minAreaCm2: floor.minAreaCm2 ?? 0 });
      if (!r.ok) return reject(t, r.code, `the repair of a face below its class floor was refused: ${r.detail}`);
    }
    if (overWork(t)) return reject(t, 'E_WORK_LIMIT', workDetail(t, 'the repair exceeded the work limit'));
    failed = failures(t);
  }
  if (failed.length > 0) return reject(t, failed[0].code, failed[0].detail);
  // The kernel rows this item owns, then the suite's.
  const provisional = assemble(t, p.version + 1);
  const problems = [...roleProblems(t, provisional.roles), ...levelProblems(t), ...clearanceProblems(t)];
  if (t.indexLog !== null) {
    // §3.10's freshness row allows a batch's coarser index writes for its promotions and demotions; the own children
    // §2.2 rule 2 materialises for a finer level's records (the re-walk's, and a demoted edge's) are new records of a
    // coarser level and are allowed too (C-0185 (12)); so is the delete of a coarser own child a removal freed, its last
    // child gone (C-0219): the only records this item's writers free below the batch's level.
    const own = new Set<string>(chainJournal(t).materialised.map((m) => `${m.level}:${m.face}`));
    for (let l = 0; l <= 4; l++) for (const f of t.log.faces[l].created) own.add(`${l}:${f}`);
    for (let l = 0; l < t.level; l++) for (const f of t.log.faces[l].removed) own.add(`${l}:${f}`);
    const writes = t.indexLog.writes.filter((w) => !(w.kind === ITEM_FACE && own.has(`${w.level}:${w.slot}`)));
    // The journal is a log over the batch's ops: an item an earlier op changed and a later one deleted answers as deleted.
    const changed = t.journal.changed.map((c) => (c.successor !== null && !isItemLive(p, c.successor) ? { ...c, successor: null } : c));
    problems.push(...checkIndexBatch(p, { level: t.indexLog.level, writes }, { promoted: provisional.promoted, demoted: provisional.demoted, changed }));
  }
  if (env.invariants !== undefined) problems.push(...env.invariants(p, provisional));
  if (problems.length > 0) return reject(t, 'E_INVARIANT', problems[0]);
  // Commit.
  endIndexBatch(p);
  const version = commitVersion(p);
  const record: CommitRecord = { ...provisional, version };
  t.closed = true;
  if (env.onCommit !== undefined) {
    const dirty: DirtySet = { key: record.key, version, faces: record.faces, owners: record.owners, roles: record.roles };
    env.onCommit(p, dirty, record);
  }
  return ok({ record, value }, record.warnings);
}

// ---- the declared ops ------------------------------------------------------------------------------------------------

/** A declared op from any writer (the writers later items build run through this, with their own `apply`). */
export function kernelOp<T>(kind: KernelOp['kind'], lineage: readonly [number, number], index: number, apply: (overlay: Overlay) => KernelResult<T>): KernelOp<T> {
  return { kind, lineage: [lineage[0], lineage[1]], index, apply };
}

