// The writers this item builds (§3.4): removeEdges, clearFiner, retypeEdges with rekey, setOwner — each a plan that
// decides every refusal before its first write, then one `rewriteRows` (§2.2 rule 3's consequences). M0-a-06.
// Readings: C-0185.
//
// * removeEdges(tx, ref, profiles?) strips (role, entity) from the ref's edges — a StretchRef's only, after cut knots at
//   its ends — or, for a VertexRef, that vertex role row; edges left with no row are deleted; then re-levelling and
//   dissolution. A profiled chain's cut knots need the profile's values, which live in the entity's record, so the
//   caller hands the profiles and receives the remaining part's (C-0185 (9)).
// * clearFiner(tx, faces, level) removes the content finer than `level` inside the faces under §3.3's clear rule:
//   finer faces an earlier stage made (stage rank below `rederivesFrom`'s) are kept content, never removed and never
//   reported; locked or pinned owners are M2a's, so the conflict list is wired and empty (§4b).
// * retypeEdges(tx, ref, add, remove, rekey?) adds and strips rows on the ref's edges; `rekey` moves the ref's
//   (role, from) rows, knot rows and vertex roles to `to`, cutting each profile at the cut vertices and joining it
//   where the moved edges meet `to`'s, renumbering each entity's knots from 0 in chain order, and returns both
//   entities' new profiles (§2.2 rule 5, J-K23).
// * setOwner(tx, faces, owner) re-owns faces of the batch's level and gives them the batch's stage rank (§2.2's
//   `LevelFaces.stage`: "created or last re-owned").
import {
  dest,
  faceWalk,
  facesOfOwner,
  handleOf,
  idOf,
  intern,
  isFaceLive,
  isVertexLive,
  outgoing,
  roleInfo,
  rowElement,
  rowsOfKey,
  rowsOn,
  setFaceOwner,
  VERTEX_SPLIT,
  type FaceId,
  type Five,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { faceBox, homeOf, indexChange, ITEM_FACE, query, type ItemRef } from '../index/index.js';
import { promote, TX_FACES_WALKED } from '../insert/index.js';
import { err, ok, type KernelResult, type Warning } from '../num/index.js';
import type { RoleRow } from '../arena/index.js';
import type { ChainRef, EdgeSetRef, FaceRef, Id, Level, RoleName, StretchRef, VertexRef } from '../types/index.js';
import { linesOfRuns, pairsOfKey, resolveStretch, runsOfPairs, type Span } from './chains.js';
import { chainLevel, cutKnot, JOIN_TOLERANCE_CM, knotLines, profileOut, routeLines, sameValue, type AnyProfile, type KnotLine, type RouteLine } from './profile.js';
import { recordLeftOf, rewriteRows, type AddRow } from './relevel.js';
import { chargeTx, check, doomed, noteRole, openTx, roleId, type OpenTx } from './state.js';
import type { Conflict, Overlay, ProfileOut, ProfileValue, RemoveResult, RetypeResult } from './types.js';

/** The open transaction, or the refusal of a doomed one (E_WORK_LIMIT reached by an earlier op). */
function enter<T>(o: Overlay): { t: OpenTx; refused: KernelResult<T> | null } {
  const t = openTx(o);
  if (t.failed === null && t.work.total > t.workLimit) t.failed = { code: 'E_WORK_LIMIT', detail: 'the batch exceeded its work limit' };
  return { t, refused: doomed<T>(t) };
}

/** E_WORK_LIMIT, the batch doomed. */
function overLimit<T>(t: OpenTx): KernelResult<T> {
  if (t.failed === null) t.failed = { code: 'E_WORK_LIMIT', detail: TX_FACES_WALKED };
  return doomed<T>(t) as KernelResult<T>;
}

/** Is the record at `level` left of h kept content of the batch (a stage ranked before `rederivesFrom`'s)? */
function keptLeft(t: OpenTx, level: Level, h: HalfEdgeId): boolean {
  const f = recordLeftOf(t, level, h);
  return f >= 0 && t.plat.faces[level].stage[f] < t.keptBelow;
}

/**
 * The level and kept-content rules for stripping rows (§3.3 *One level per transaction*, *Kept content*): a row coarser
 * than the batch is E_LEVEL; a finer row next to kept content (a finer face of a stage ranked before `rederivesFrom`'s,
 * on either side of its edge or round its vertex at the row's level) is E_KEPT. Null when every row may go.
 */
function stripRule(t: OpenTx, rows: Iterable<number>): KernelResult<never> | null {
  const p = t.plat;
  const R = p.roles;
  for (const r of rows) {
    const lr = R.level[r] as Level;
    if (lr < t.level) return err('E_LEVEL', `an L${t.level} batch strips no L${lr} row (§3.3: one level per transaction)`);
    if (lr === t.level) continue;
    const el = rowElement(p, r);
    if (roleInfo(R.kind[r]).kind === 'edge') {
      if (keptLeft(t, lr, 2 * el) || keptLeft(t, lr, 2 * el + 1)) return err('E_KEPT', `an L${lr} row beside kept content (§3.3)`);
    } else {
      for (const h of outgoing(p, el)) {
        if (p.halfEdges.level[h >> 1] > lr) continue;
        if (keptLeft(t, lr, h)) return err('E_KEPT', `an L${lr} vertex row inside kept content (§3.3)`);
      }
    }
  }
  return null;
}

/** The knot rows of an entity (any knot role) on a vertex. */
function knotRowsOn(p: Plat, v: VertexId, entity: number): number[] {
  if (entity < 0) return [];
  return rowsOn(p, 'vertex', v).filter((r) => p.roles.entity[r] === entity && roleInfo(p.roles.kind[r]).knot);
}

/** The knot roles of an entity present on any of the vertices. */
function knotRolesOn(p: Plat, vs: Iterable<VertexId>, entity: number): Set<number> {
  const out = new Set<number>();
  for (const v of vs) for (const r of knotRowsOn(p, v, entity)) out.add(p.roles.kind[r]);
  return out;
}

/** The vertices of edge pairs (both ends). */
function verticesOf(p: Plat, pairs: Iterable<number>): Set<VertexId> {
  const O = p.halfEdges.origin;
  const out = new Set<VertexId>();
  for (const e of pairs) {
    out.add(O[2 * e]);
    out.add(O[2 * e + 1]);
  }
  return out;
}

// ---- planning a profile over the chains a writer leaves ----------------------------------------------------------

/** A knot a plan places: on a vertex, with its value. */
interface Placed {
  readonly vertex: VertexId;
  readonly value: ProfileValue;
}

/** The sample of the old profile at a vertex of the old chain: the value a cut knot there carries (§2.2 rule 5). */
function sampleAtVertex(lines: readonly RouteLine[], kls: readonly KnotLine[], v: VertexId): ProfileValue {
  for (let i = 0; i < lines.length; i++) {
    const k = lines[i].vertices.indexOf(v);
    if (k >= 0) return cutKnot(kls[i], lines[i].pos[k]);
  }
  return check(false, 'a cut vertex lies on the own-level route of the chain it cuts') as never;
}

/** The knots of an old profile by vertex, in chain order at each vertex. */
function knotsByVertex(kls: readonly KnotLine[]): Map<VertexId, ProfileValue[]> {
  const m = new Map<VertexId, ProfileValue[]>();
  for (const line of kls) {
    for (const k of line.knots) {
      check(k.vertex !== undefined, 'a profile knot stands on a vertex');
      m.set(k.vertex, [...(m.get(k.vertex) ?? []), k.value]);
    }
  }
  return m;
}

/**
 * A profile over new runs (§2.2 rule 5): the knots at each route vertex in chain order (`at`: a vertex's candidate
 * values, the earlier side first), the join rule at the join vertices — two equal knots become one, and a single knot
 * there drops where the profile samples identically without it (within 1e-9 cm of the interpolation between its
 * neighbouring knots, decided in doubles; `step`: equal to the previous knot) — in chain order, so ordinal i is the i-th.
 */
function assemble(lines: readonly RouteLine[], at: ReadonlyMap<VertexId, readonly ProfileValue[]>, joins: ReadonlySet<VertexId>, interp: 'linear' | 'step'): Placed[] {
  const out: Placed[] = [];
  for (const ln of lines) {
    const ks: { vertex: VertexId; pos: number; value: ProfileValue; join: boolean }[] = [];
    ln.vertices.forEach((v, i) => {
      const merged: ProfileValue[] = [];
      for (const x of at.get(v) ?? []) if (merged.length === 0 || !sameValue(merged[merged.length - 1], x)) merged.push(x);
      for (const x of merged) ks.push({ vertex: v, pos: ln.pos[i], value: x, join: joins.has(v) && merged.length === 1 });
    });
    const keep = ks.map(() => true);
    ks.forEach((k, i) => {
      if (!k.join) return;
      const prev = i > 0 ? ks[i - 1] : ln.closed && ks.length > 1 ? ks[ks.length - 1] : null;
      const next = i + 1 < ks.length ? ks[i + 1] : ln.closed && ks.length > 1 ? ks[0] : null;
      let drop: boolean;
      if (interp === 'step') {
        drop = prev !== null ? sameValue(prev.value, k.value) : next !== null && sameValue(next.value, k.value);
      } else if (prev !== null && next !== null && prev !== next) {
        const pPos = prev.pos <= k.pos ? prev.pos : prev.pos - ln.length;
        const nPos = next.pos >= k.pos ? next.pos : next.pos + ln.length;
        const line: KnotLine = { interp: 'linear', closed: false, length: ln.length, knots: [{ pos: pPos, value: prev.value, ordinal: 0 }, { pos: nPos, value: next.value, ordinal: 1 }] };
        drop = Math.abs((cutKnot(line, k.pos) as number) - (k.value as number)) <= JOIN_TOLERANCE_CM;
      } else if (prev !== null || next !== null) {
        const nb = (prev ?? next) as (typeof ks)[number];
        drop = Math.abs((nb.value as number) - (k.value as number)) <= JOIN_TOLERANCE_CM;
      } else {
        drop = false;
      }
      if (drop) keep[i] = false;
    });
    ks.forEach((k, i) => {
      if (keep[i]) out.push({ vertex: k.vertex, value: k.value });
    });
  }
  return out;
}

/** The knot-row rewrite that leaves exactly `placed` (ordinals 0 …) for (knotRole, entity): rows stripped and added. */
function knotRewrite(p: Plat, knotRole: number, entity: Id, placed: readonly Placed[], level: Level): { strip: number[]; add: AddRow[] } {
  const h = handleOf(p, entity);
  const strip: number[] = [];
  const add: AddRow[] = [];
  const want = new Set<string>(placed.map((k, i) => `${k.vertex}:${i}`));
  const have = new Set<string>();
  if (h >= 0) {
    for (let o = 0; o <= 0xffff; o++) {
      const rows = rowsOfKey(p, knotRole, h, o);
      if (rows.length === 0 && o >= placed.length) break;
      for (const r of rows) {
        const k = `${rowElement(p, r)}:${o}`;
        if (want.has(k)) have.add(k);
        else strip.push(r);
      }
    }
  }
  placed.forEach((k, i) => {
    if (!have.has(`${k.vertex}:${i}`)) add.push({ element: k.vertex, role: knotRole, entity, ordinal: i, level });
  });
  return { strip, add };
}

/**
 * The constant a part takes as a scalar (§2.2 rule 5): when it lies wholly before the first or after the last knot of
 * its open run (no knot strictly inside it), that knot's value; else null.
 */
function scalarOfPart(lines: readonly RouteLine[], kls: readonly KnotLine[], part: readonly VertexId[]): ProfileValue | null {
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    const idx = part.map((v) => ln.vertices.indexOf(v)).filter((k) => k >= 0);
    if (idx.length === 0) continue;
    const ks = kls[i].knots;
    if (ln.closed || ks.length === 0) return null;
    const ps = idx.map((k) => ln.pos[k]);
    const s0 = Math.min(...ps);
    const s1 = Math.max(...ps);
    if (s1 <= ks[0].pos) return ks[0].value;
    if (s0 >= ks[ks.length - 1].pos) return ks[ks.length - 1].value;
    return null;
  }
  return null;
}

/**
 * One entity's profile over the part(s) it keeps (`lines`), from the old profile (`oldLines`, `kls`): its knots on the
 * kept vertices, a cut knot at each cut vertex the parts reach (a knot standing there is kept, and copied where the
 * other part takes it too), extra knots (`extra`, a join's other side), or — every part lying wholly before the first or
 * after the last knot — the constant as a scalar.
 */
function planPart(
  lines: readonly RouteLine[],
  oldLines: readonly RouteLine[],
  kls: readonly KnotLine[],
  keepVertex: (v: VertexId) => boolean,
  cuts: Iterable<VertexId>,
): { at: Map<VertexId, ProfileValue[]>; scalar: ProfileValue | null } {
  const old = knotsByVertex(kls);
  const at = new Map<VertexId, ProfileValue[]>();
  for (const [v, vals] of old) if (keepVertex(v)) at.set(v, vals.slice());
  const scalars = lines.map((ln) => (ln.vertices.some((v) => at.has(v)) ? null : scalarOfPart(oldLines, kls, ln.vertices)));
  if (lines.length > 0 && scalars.every((s) => s !== null)) return { at: new Map(), scalar: scalars[0] };
  for (const c of cuts) {
    if (at.has(c) || !lines.some((ln) => ln.vertices.includes(c))) continue;
    at.set(c, [sampleAtVertex(oldLines, kls, c)]);
  }
  return { at, scalar: null };
}

// ---- removeEdges -----------------------------------------------------------------------------------------------------

function isStretch(ref: ChainRef | EdgeSetRef | StretchRef | VertexRef): ref is StretchRef {
  return 'chain' in ref;
}

/**
 * §3.4's `removeEdges(tx, ref)` (see the module comment), with the chain's profiles (C-0185 (9)): for a StretchRef,
 * each remaining part of the chain takes a cut knot at the stretch's end on its side before the stretch's rows and its
 * interior knot rows leave, and the result gives each profile's remaining part (renumbered from 0 in chain order); a
 * whole chain's removal takes its entity's knot rows on its vertices with it. Refusals write nothing: E_DEGENERATE
 * `stretch`, E_LEVEL, E_KEPT, E_WORK_LIMIT.
 */
export function removeEdges(o: Overlay, ref: ChainRef | EdgeSetRef | StretchRef | VertexRef, profiles: readonly AnyProfile[] = []): KernelResult<RemoveResult> {
  const { t, refused } = enter<RemoveResult>(o);
  if (refused !== null) return refused;
  const p = t.plat;
  const warnings: Warning[] = [];
  if (!isStretch(ref)) {
    const role = roleId(ref.role);
    const info = roleInfo(role);
    const h = handleOf(p, ref.entity);
    const ordinal = 'ordinal' in ref && ref.ordinal !== undefined ? ref.ordinal : 0;
    const rows = h < 0 ? [] : rowsOfKey(p, role, h, ordinal);
    if (rows.length === 0) return ok({ profiles: profiles.map((x) => ({ knotRole: x.knotRole })) });
    const strip = new Set<number>(rows);
    if (info.kind === 'edge' && !info.indexed) {
      // The whole chain goes: its entity's knot rows on its vertices go with it.
      for (const v of verticesOf(p, rows.map((r) => rowElement(p, r)))) for (const r of knotRowsOn(p, v, h)) strip.add(r);
    }
    const rule = stripRule(t, strip);
    if (rule !== null) return rule;
    if (t.work.total > t.workLimit) return overLimit(t);
    noteRole(t, { role: ref.role, entity: ref.entity, ordinal });
    if (!rewriteRows(t, { strip: [...strip], add: [] })) return overLimit(t);
    return ok({ profiles: profiles.map((x) => ({ knotRole: x.knotRole })) }, warnings);
  }
  // A stretch.
  const sp = resolveStretch(p, t.key, ref);
  if (!sp.ok) return err(sp.code, sp.detail);
  const span = sp.value;
  const role = roleId(ref.chain.role);
  const h = handleOf(p, ref.chain.entity);
  const n = chainLevel(p, ref.chain);
  const O = p.halfEdges.origin;
  const stretchPairs = new Set<number>(span.half.map((x) => x >> 1));
  const chainRows = rowsOfKey(p, role, h, 0);
  const strip = new Set<number>(chainRows.filter((r) => stretchPairs.has(rowElement(p, r))));
  // Interior vertices: the stretch's vertices but its two ends; their knot rows of the entity leave with it.
  const interior = new Set<VertexId>(span.half.slice(1).map((x) => O[x]));
  for (const v of interior) for (const r of knotRowsOn(p, v, h)) strip.add(r);
  const rule = stripRule(t, strip);
  if (rule !== null) return rule;
  // Every knot role the chain carries must be handed in (its values are the record's).
  const oldPairs = [...new Set(chainRows.map((r) => rowElement(p, r)))];
  for (const kr of knotRolesOn(p, verticesOf(p, oldPairs), h)) {
    check(profiles.some((x) => roleId(x.knotRole) === kr), `removeEdges on a profiled chain needs its ${roleInfo(kr).name} profile (C-0185 (9))`);
  }
  const restPairs = oldPairs.filter((e) => !stretchPairs.has(e));
  const oldLines = routeLines(p, ref.chain, t.key);
  const newLines = linesOfRuns(p, runsOfPairs(p, restPairs), n);
  const keptVs = verticesOf(p, restPairs);
  const add: AddRow[] = [];
  const result: { knotRole: RoleName; value?: ProfileOut }[] = [];
  for (const prof of profiles) {
    const kr = roleId(prof.knotRole);
    const kls = knotLines(p, prof, ref.chain.entity, oldLines);
    const plan = planPart(newLines, oldLines, kls, (v) => keptVs.has(v) && !interior.has(v), [span.from, span.to]);
    const placed = plan.scalar !== null ? [] : assemble(newLines, plan.at, new Set(), prof.interp);
    const rw = knotRewrite(p, kr, ref.chain.entity, placed, t.level);
    for (const r of rw.strip) strip.add(r);
    add.push(...rw.add);
    result.push(newLines.length === 0 ? { knotRole: prof.knotRole } : { knotRole: prof.knotRole, value: profileOut(prof.knotRole, prof.interp, placed.map((k) => k.value), plan.scalar) });
  }
  if (t.work.total > t.workLimit) return overLimit(t);
  // Writes: the ends promoted to the chain's level (W_PROMOTED; their split flags cleared), then the rows.
  promoteEnds(t, span, n, warnings);
  noteRole(t, { role: ref.chain.role, entity: ref.chain.entity, ordinal: 0 });
  if (!rewriteRows(t, { strip: [...strip], add, vertices: [span.from, span.to] })) return overLimit(t);
  return ok({ profiles: result }, warnings);
}

/** §3.4: an end finer than the chain is first promoted to the chain's level (W_PROMOTED, listed), its split flag cleared. */
function promoteEnds(t: OpenTx, span: Span, n: Level, warnings: Warning[]): void {
  const p = t.plat;
  for (const v of [span.from, span.to]) {
    if (!isVertexLive(p, v) || p.vertices.level[v] <= n) continue;
    promote(t, v, n, warnings);
    t.log.promoted.push(v);
    if ((p.vertices.flags[v] & VERTEX_SPLIT) !== 0) {
      p.vertices.flags[v] &= ~VERTEX_SPLIT;
      t.log.unflagged.push(v);
    }
  }
}

// ---- retypeEdges -----------------------------------------------------------------------------------------------------

/**
 * §3.4's `retypeEdges(tx, ref, add, remove, rekey?)` (see the module comment). `add` rows go on every edge of the ref
 * at the batch's level (one coarser than an edge of the ref is E_LEVEL); `remove` strips the named roles of the ref's
 * entity from them; `rekey` moves the ref's (role, from) rows to `to`, with the knot rows and vertex roles of `from` on
 * the moved part, cut knots at the cut vertices and joins where the moved edges meet `to`'s, both entities' knots
 * renumbered from 0 in chain order; returns both entities' new profiles (a scalar where a part has no knot left;
 * `from` absent where `from` keeps no edge). Refusals write nothing: E_DEGENERATE `stretch`, E_LEVEL, E_KEPT,
 * E_WORK_LIMIT.
 */
export function retypeEdges(
  o: Overlay,
  ref: ChainRef | EdgeSetRef | StretchRef,
  add: readonly RoleRow[],
  remove: readonly RoleName[],
  rekey?: { from: Id; to: Id; profiles?: { from?: AnyProfile; to?: AnyProfile }[] },
): KernelResult<RetypeResult> {
  const { t, refused } = enter<RetypeResult>(o);
  if (refused !== null) return refused;
  const p = t.plat;
  const T = p.halfEdges;
  const R = p.roles;
  const warnings: Warning[] = [];
  let span: Span | null = null;
  let chain: ChainRef;
  let pairs: number[];
  if (isStretch(ref)) {
    const sp = resolveStretch(p, t.key, ref);
    if (!sp.ok) return err(sp.code, sp.detail);
    span = sp.value;
    chain = ref.chain;
    pairs = [...new Set(span.half.map((x) => x >> 1))];
  } else {
    chain = { role: ref.role, entity: ref.entity };
    pairs = [...new Set(pairsOfKey(p, ref))];
  }
  if (pairs.length === 0) return ok({ profiles: [] });
  const role = roleId(chain.role);
  const hFrom = handleOf(p, chain.entity);
  // Added rows: edge roles at the batch's level; one coarser than an edge of the ref is E_LEVEL.
  const adds: AddRow[] = [];
  for (const row of add) {
    const id = roleId(row.role);
    check(roleInfo(id).kind === 'edge', `${row.role} is a vertex role: retypeEdges adds edge rows`);
    check(typeof row.entity === 'string' && row.entity.length > 0, 'a row names its entity by a non-empty address id');
    check(!roleInfo(id).indexed || row.ordinal !== undefined, `an indexed row (${row.role}) carries its ordinal`);
    for (const e of pairs) {
      if (t.level < T.level[e]) return err('E_LEVEL', `an L${t.level} row is coarser than the L${T.level[e]} edge it would go on (§3.4)`);
      adds.push({ element: 2 * e, role: id, entity: row.entity, ordinal: row.ordinal ?? 0, level: t.level });
    }
  }
  // Removed roles: the ref's entity's rows of those roles on the ref's edges.
  const removeIds = new Set(remove.map((r) => roleId(r)));
  const strip = new Set<number>();
  for (const e of pairs) for (const r of rowsOn(p, 'edge', 2 * e)) if (removeIds.has(R.kind[r]) && R.entity[r] === hFrom) strip.add(r);
  const result: { knotRole: RoleName; from?: ProfileOut; to: ProfileOut }[] = [];
  if (rekey !== undefined) {
    check(rekey.from === chain.entity, 'rekey moves the ref\'s own entity (rekey.from is the ref\'s entity)');
    check(rekey.to !== rekey.from && rekey.to.length > 0, 'rekey moves rows to another entity');
    check(!removeIds.has(role), 'a role both moved and removed');
    const n = chainLevel(p, chain);
    const pairSet = new Set(pairs);
    const fromRows = rowsOfKey(p, role, hFrom, 0);
    const fromPairs = [...new Set(fromRows.map((r) => rowElement(p, r)))];
    for (const e of pairs) check(fromPairs.includes(e), 'every edge rekey moves carries the ref\'s (role, from) row');
    const hTo = handleOf(p, rekey.to);
    const toPairs = hTo < 0 ? [] : [...new Set(rowsOfKey(p, role, hTo, 0).map((r) => rowElement(p, r)))];
    const restPairs = fromPairs.filter((e) => !pairSet.has(e));
    const movedVs = verticesOf(p, pairs);
    const restVs = verticesOf(p, restPairs);
    const toVs = verticesOf(p, toPairs);
    const cuts = [...movedVs].filter((v) => restVs.has(v));
    const joins = new Set<VertexId>([...movedVs].filter((v) => toVs.has(v)));
    // The moved rows: (role, from) → (role, to), each at its own level.
    for (const r of fromRows) {
      if (!pairSet.has(rowElement(p, r))) continue;
      strip.add(r);
      adds.push({ element: 2 * rowElement(p, r), role, entity: rekey.to, ordinal: 0, level: R.level[r] as Level });
    }
    // Vertex roles of `from` on the moved part's vertices other than the cut vertices (knot rows go by the profiles).
    const cutSet = new Set(cuts);
    for (const v of movedVs) {
      if (cutSet.has(v)) continue;
      for (const r of rowsOn(p, 'vertex', v)) {
        if (R.entity[r] !== hFrom || roleInfo(R.kind[r]).knot) continue;
        strip.add(r);
        adds.push({ element: v, role: R.kind[r], entity: rekey.to, ordinal: R.ordinal[r], level: R.level[r] as Level });
      }
    }
    // Every knot role either entity carries on the chains involved must be handed in.
    const given = (rekey.profiles ?? []).map((x) => {
      const any = x.from ?? x.to;
      check(any !== undefined, 'a rekey profile pair names a profile');
      check(x.from === undefined || x.to === undefined || (x.from.knotRole === x.to.knotRole && x.from.interp === x.to.interp), 'a rekey profile pair shares its knot role and interpolation');
      return roleId(any.knotRole);
    });
    for (const kr of [...knotRolesOn(p, verticesOf(p, fromPairs), hFrom), ...knotRolesOn(p, toVs, hTo)]) {
      check(given.includes(kr), `rekey across a profiled chain needs its ${roleInfo(kr).name} profiles (§3.4)`);
    }
    const fromLines = routeLines(p, chain, t.key);
    const toLines = toPairs.length === 0 ? [] : routeLines(p, { role: chain.role, entity: rekey.to }, t.key);
    const newFromLines = linesOfRuns(p, runsOfPairs(p, restPairs), n);
    const newToRuns = runsOfPairs(p, [...toPairs, ...pairs]);
    const newToLines = linesOfRuns(p, newToRuns, n);
    const movedLines = linesOfRuns(p, runsOfPairs(p, pairs), n);
    // At a join vertex the side whose edge enters it along the new `to` chain comes first in chain order.
    const enteredByMoved = (v: VertexId): boolean => {
      for (const run of newToRuns) {
        const closed = T.origin[run[0]] === dest(p, run[run.length - 1]);
        for (let i = 0; i < run.length; i++) {
          if (dest(p, run[i]) === v && (i + 1 < run.length || closed)) return pairSet.has(run[i] >> 1);
        }
      }
      return false;
    };
    for (const pr of rekey.profiles ?? []) {
      const any = (pr.from ?? pr.to) as AnyProfile;
      const kr = roleId(any.knotRole);
      const interp = any.interp;
      const fromKls = pr.from === undefined ? null : knotLines(p, pr.from, chain.entity, fromLines);
      const toKls = pr.to === undefined || toLines.length === 0 ? null : knotLines(p, pr.to, rekey.to, toLines);
      // The from-entity's remaining part, and the part it hands over.
      const rest = fromKls === null ? null : planPart(newFromLines, fromLines, fromKls, (v) => restVs.has(v), cuts);
      const moved = fromKls === null ? null : planPart(movedLines, fromLines, fromKls, (v) => movedVs.has(v), cuts);
      // The `to` chain after the move: its own knots and the moved part's, both at a join vertex.
      const toAt = toKls === null ? new Map<VertexId, ProfileValue[]>() : knotsByVertex(toKls);
      const movedAt = moved === null ? new Map<VertexId, ProfileValue[]>() : moved.at;
      const newToAt = new Map<VertexId, ProfileValue[]>();
      for (const v of new Set<VertexId>([...toAt.keys(), ...movedAt.keys()])) {
        const a = toAt.get(v) ?? [];
        const b = movedAt.get(v) ?? [];
        newToAt.set(v, joins.has(v) && enteredByMoved(v) ? [...b, ...a] : [...a, ...b]);
      }
      const toPlaced = assemble(newToLines, newToAt, joins, interp);
      const restPlaced = rest === null || rest.scalar !== null ? [] : assemble(newFromLines, rest.at, new Set(), interp);
      const rwFrom = knotRewrite(p, kr, chain.entity, restPlaced, t.level);
      const rwTo = knotRewrite(p, kr, rekey.to, toPlaced, t.level);
      for (const r of [...rwFrom.strip, ...rwTo.strip]) strip.add(r);
      adds.push(...rwFrom.add, ...rwTo.add);
      const toScalar = toPlaced.length > 0 ? null : (moved?.scalar ?? constantOf(pr.to) ?? constantOf(pr.from));
      check(toPlaced.length > 0 || toScalar !== null, 'a part with no knot takes the constant of its profile');
      const toOut = profileOut(any.knotRole, interp, toPlaced.map((k) => k.value), toScalar);
      if (pr.from === undefined || newFromLines.length === 0) {
        result.push({ knotRole: any.knotRole, to: toOut });
      } else {
        const fromScalar = restPlaced.length > 0 ? null : (rest?.scalar ?? constantOf(pr.from));
        result.push({ knotRole: any.knotRole, from: profileOut(any.knotRole, interp, restPlaced.map((k) => k.value), fromScalar), to: toOut });
      }
    }
  }
  const rule = stripRule(t, strip);
  if (rule !== null) return rule;
  if (t.work.total > t.workLimit) return overLimit(t);
  if (span !== null) promoteEnds(t, span, chainLevel(p, chain), warnings);
  noteRole(t, { role: chain.role, entity: chain.entity, ordinal: 0 });
  if (rekey !== undefined) noteRole(t, { role: chain.role, entity: rekey.to, ordinal: 0 });
  if (!rewriteRows(t, { strip: [...strip], add: adds, vertices: span === null ? [] : [span.from, span.to] })) return overLimit(t);
  return ok({ profiles: result }, warnings);
}

/** The constant a profile reads as when its values are all equal (a single knot), else null. */
function constantOf(pr: AnyProfile | undefined): ProfileValue | null {
  if (pr === undefined || pr.values.length === 0) return null;
  const vs = pr.values as readonly ProfileValue[];
  return vs.every((v) => sameValue(v, vs[0])) ? vs[0] : null;
}

// ---- clearFiner ------------------------------------------------------------------------------------------------------

/** The face records nested in face f of `level`, one level down (records whose parent is f), found through the index. */
function childrenOf(t: OpenTx, level: Level, f: FaceId): FaceId[] {
  const p = t.plat;
  if (level >= 4) return [];
  const up = (level + 1) as Level;
  const b = faceBox(p, level, f);
  const box = { minX: Math.floor(b.minX), minY: Math.floor(b.minY), maxX: Math.ceil(b.maxX), maxY: Math.ceil(b.maxY) };
  const Fu = p.faces[up];
  return query(p, t.key, up, box, { faces: true }).faces.filter((c) => Fu.parent[c] === f);
}

/**
 * §3.4's `clearFiner(tx, faces, level)` (see the module comment): every face record finer than `level` nested in the
 * FaceRef's faces whose stage rank is at least `rederivesFrom`'s and which holds no kept record is cleared — its rows
 * of its level on the edges and vertices of its rings stripped where no kept or outside record of that level lies on
 * the other side — and freed, or, where kept content beside it still needs a record there, emptied of its owner; then
 * re-levelling and dissolution as removeEdges. `level` below the batch's is E_LEVEL (`tx.clearRegion` is M3a's).
 * Returns the conflicts: locks and pins are M2a's, so the list is always empty at M0.
 */
export function clearFiner(o: Overlay, faces: FaceRef, level: Level): KernelResult<Conflict[]> {
  const { t, refused } = enter<Conflict[]>(o);
  if (refused !== null) return refused;
  const p = t.plat;
  if (level < t.level) return err('E_LEVEL', `an L${t.level} batch clears no L${level + 1} content (§3.3: one level per transaction)`);
  check(faces.level <= level, 'clearFiner clears the content finer than `level` inside faces of that level or coarser');
  const h = handleOf(p, faces.owner);
  // The nested records, level by level, and which of them are kept or hold kept content.
  const nested: FaceId[][] = [[], [], [], [], []];
  nested[faces.level] = h < 0 ? [] : facesOfOwner(p, faces.level, h);
  for (let l = faces.level; l < 4; l++) {
    for (const f of nested[l]) nested[l + 1].push(...childrenOf(t, l as Level, f));
    if (!chargeTx(t, TX_FACES_WALKED, nested[l].length)) return overLimit(t);
  }
  const clear: Five<Set<FaceId>> = [new Set(), new Set(), new Set(), new Set(), new Set()];
  const holdsKept = new Set<string>();
  for (let l = 4; l > level; l--) {
    const F = p.faces[l];
    for (const f of nested[l]) {
      if (F.stage[f] < t.keptBelow || holdsKept.has(`${l}:${f}`)) holdsKept.add(`${l - 1}:${F.parent[f]}`);
      else clear[l].add(f);
    }
  }
  // The rows to strip: rows of a cleared record's level on its rings' edges and vertices, where every record of that
  // level on the other side is cleared too or absent.
  const strip = new Set<number>();
  for (let l = level + 1; l <= 4; l++) {
    const lv = l as Level;
    for (const f of clear[lv]) {
      for (const ring of faceWalk(p, lv, f)) {
        chargeTx(t, TX_FACES_WALKED, 1);
        for (const g of ring) {
          const rows = rowsOn(p, 'edge', g).filter((r) => p.roles.level[r] === lv);
          if (rows.length > 0) {
            const other = recordLeftOf(t, lv, g ^ 1);
            if (other < 0 || clear[lv].has(other)) for (const r of rows) strip.add(r);
          }
          const v = p.halfEdges.origin[g];
          const vrows = rowsOn(p, 'vertex', v).filter((r) => p.roles.level[r] === lv);
          if (vrows.length > 0) {
            let all = true;
            for (const e of outgoing(p, v)) {
              if (p.halfEdges.level[e >> 1] > lv) continue;
              const r = recordLeftOf(t, lv, e);
              if (r >= 0 && !clear[lv].has(r)) all = false;
            }
            if (all) for (const r of vrows) strip.add(r);
          }
        }
      }
    }
  }
  if (t.work.total > t.workLimit) return overLimit(t);
  if (!rewriteRows(t, { strip: [...strip], add: [], clear })) return overLimit(t);
  return ok([]);
}

// ---- setOwner --------------------------------------------------------------------------------------------------------

/**
 * §3.4's `setOwner(tx, faces, owner)`: re-owns faces of the batch's level (§3.3: a batch writes owners of its own level)
 * to `owner`, each taking the batch's stage rank (§2.2's `LevelFaces.stage`: "created or last re-owned"). A face slot
 * not live at the batch's level is a programming error. The faces' index items are re-entered (an owner change can move
 * an L2 – L4 item to another district's partition, §3.3).
 */
export function setOwner(o: Overlay, faces: readonly FaceId[], owner: Id): KernelResult<void> {
  const { t, refused } = enter<void>(o);
  if (refused !== null) return refused;
  const p = t.plat;
  const l = t.level;
  check(typeof owner === 'string' && owner.length > 0, 'an owner is an entity\'s non-empty address id');
  const unique = [...new Set(faces)];
  for (const f of unique) check(isFaceLive(p, l, f), `face ${f} is not live at the batch's level L${l}`);
  if (!chargeTx(t, TX_FACES_WALKED, unique.length)) return overLimit(t);
  const F = p.faces[l];
  const handle = intern(p, owner);
  for (const f of unique) {
    const was = F.owner[f];
    if (was >= 0) t.log.owners.add(idOf(p, was));
    setFaceOwner(p, l, f, handle);
    F.stage[f] = t.stageRank;
    const item: ItemRef = { kind: ITEM_FACE, level: l, slot: f };
    const home = homeOf(p, item);
    indexChange(p, item);
    t.journal.changed.push({ item, homeBefore: home, successor: item });
    t.log.faces[l].changed.push(f);
  }
  t.log.owners.add(owner);
  return ok(undefined);
}
