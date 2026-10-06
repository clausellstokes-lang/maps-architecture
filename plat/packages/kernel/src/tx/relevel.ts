// Row rewrites and their consequences (§2.2 rule 3 *Dissolution*, *Levels follow the rows — demotion (a) – (c)*, split
// restoration; §3.3 *No item changes in place*; §3.6 step 5's re-walk, here for removals). M0-a-06.
//
// `removeEdges`, `clearFiner` and `retypeEdges` (§3.4) all end the same way: rows are added and stripped, edges left
// with no row are deleted, and then — rule 3 — (a) an edge whose remaining rows are all above its birth level takes the
// lowest of them; (b) a `split` vertex keeps its flag only while a run it split survives the batch whole, and a vertex
// stripped of its last vertex role row other than knot rows loses its kernel pin; (c) in canonical order (y, then x), a
// vertex with no incident edge and no vertex row of its level or coarser takes the lowest level among its edges and rows
// (with neither it is freed); then the dissolution rule; then split restoration. `rewriteRows` is that sequence, with the
// face records and the index kept as §2.2 rule 2 and §3.3 state:
//
// * the faces a deleted or demoted edge no longer bounds are re-walked at each level it vanished from: the old records
//   beside it (found before any write) give the new cycles; a cycle of positive exact area is a face's outer ring, every
//   other one a hole of the smallest such face holding it; each new face keeps the record of its old regions with the
//   smallest canonical key (§3.3's face key, read on lattice positions — never a slot), the others freed and their
//   children re-parented to it; a level-l face left with no level-l edge on its rings and no surviving child is its
//   parent's own child again and keeps no record (rule 2) — C-0185 (3); the rule climbs: a coarser own child (no edge of
//   its level on its rings, so no vanishing edge gathers it) whose every child the pass frees is freed too, up to L1,
//   listed among the batch's removed records and its index item tombstoned (N-47, C-0219);
// * a dissolved vertex's two edges become one: the edge pair at the run's start end is kept (the run's handle never
//   changes, §3.3), and every record that stored the dropped pair's half-edges stores the kept pair's;
// * the index is written only where an item changed (§3.3's "no item changes in place", §3.10's freshness row): a
//   vertex whose level changed or which was freed, a route edge whose run lost or gained a vertex of its level (its
//   handle, level or ends differ) — a Steiner vertex leaving a coarser run leaves that run's item alone, as one joining
//   it does (§3.3) — and a face whose own-level ring changed.
//
// Every list this module orders is ordered by lattice positions or canonical keys; slots are only lookup keys.
import {
  addRoleRow,
  allocFace,
  compareVertices,
  dest,
  faceHoles,
  faceKey,
  faceWalk,
  freeEdgePair,
  freeFace,
  freeVertex,
  idOf,
  intern,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  removeRoleRow,
  roleInfo,
  rowElement,
  rowsOn,
  setFaceHoles,
  setFaceOwner,
  walkRing,
  VERTEX_PINNED,
  VERTEX_SPLIT,
  VERTEX_STEINER,
  type FaceId,
  type Five,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import {
  HOT_PIXEL_CM,
  homeOf,
  indexAdd,
  indexChange,
  indexDelete,
  indexRelevel,
  ITEM_EDGE,
  ITEM_FACE,
  ITEM_VERTEX,
  query,
  routeRun,
  type Box,
  type ItemRef,
} from '../index/index.js';
import { TX_FACES_WALKED } from '../insert/index.js';
import { area2, orient2d } from '../num/index.js';
import type { Cm, LatticePoint, Level } from '../types/index.js';
import { chargeTx, check, noteRow, type OpenTx } from './state.js';

const LV: readonly Level[] = [0, 1, 2, 3, 4];

/** A row a rewrite adds: on a half-edge's pair (an edge role) or a vertex (a vertex role), at a level. */
export interface AddRow {
  readonly element: number;
  readonly role: number;
  readonly entity: string;
  readonly ordinal: number;
  readonly level: Level;
}

/** One rewrite: rows added, rows stripped, extra vertices to re-level, and records to clear whatever their rings. */
export interface Rewrite {
  readonly strip: readonly number[];
  readonly add: readonly AddRow[];
  readonly vertices?: readonly VertexId[];
  /** clearFiner's cleared records per level: freed (or, where a face must keep a record, emptied of their owner). */
  readonly clear?: Five<ReadonlySet<FaceId>>;
}

// ---- small helpers --------------------------------------------------------------------------------------------------

function box(p: Plat, a: VertexId, b: VertexId): Box {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  return { minX: Math.min(X[a], X[b]) - 1, minY: Math.min(Y[a], Y[b]) - 1, maxX: Math.max(X[a], X[b]) + 1, maxY: Math.max(Y[a], Y[b]) + 1 };
}

function ringBox(p: Plat, rings: readonly (readonly HalfEdgeId[])[]): Box {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const ring of rings) {
    for (const h of ring) {
      const v = O[h];
      minX = Math.min(minX, X[v]);
      minY = Math.min(minY, Y[v]);
      maxX = Math.max(maxX, X[v]);
      maxY = Math.max(maxY, Y[v]);
    }
  }
  return { minX: minX - 1, minY: minY - 1, maxX: maxX + 1, maxY: maxY + 1 };
}

/** The outgoing half-edges at v (clockwise from its `out`). */
function around(p: Plat, v: VertexId): HalfEdgeId[] {
  const first = p.vertices.out[v];
  const out: HalfEdgeId[] = [];
  if (first === -1) return out;
  let e = first;
  do {
    out.push(e);
    check(out.length <= p.halfEdges.origin.length, `the rotation at vertex ${v} does not close`);
    e = p.halfEdges.next[e ^ 1];
  } while (e !== first);
  return out;
}

/** A row's text with its level: identical row sets compare equal. */
function rowText(p: Plat, r: number): string {
  const R = p.roles;
  return `${R.kind[r]}/${R.entity[r]}/${R.ordinal[r]}/${R.level[r]}`;
}

/** The rows of a pair (by its half-edge), as texts, restricted to rows of level ≤ `upTo` (all when 4). */
function pairRows(p: Plat, h: HalfEdgeId, upTo: number = 4): string[] {
  return rowsOn(p, 'edge', h).filter((r) => p.roles.level[r] <= upTo).map((r) => rowText(p, r));
}

function sameList(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((x, i) => x === b[i]);
}

/**
 * The face record at `level` whose ring holds half-edge h on its left — a record storing a half-edge of that ring — or
 * −1 where the level holds no record there (its parent is its own child, or L0's unbounded outside). Walks one ring,
 * charged to `tx.facesWalked`; the candidates come from the index, which must be current for the level's faces.
 */
export function recordLeftOf(t: OpenTx, level: Level, h: HalfEdgeId): FaceId {
  const p = t.plat;
  const ring = new Set<HalfEdgeId>(walkRing(p, level, h));
  chargeTx(t, TX_FACES_WALKED, 1);
  const O = p.halfEdges.origin;
  const F = p.faces[level];
  for (const f of query(p, t.key, level, box(p, O[h], O[h ^ 1]), { faces: true }).faces) {
    if (ring.has(F.outer[f])) return f;
    for (const g of faceHoles(p, level, f)) if (ring.has(g)) return f;
  }
  return -1;
}

/** Is the doubled point strictly inside the ring of lattice points (crossing number, exact orientation)? */
function insidePoints(pts: readonly LatticePoint[], qx2: number, qy2: number): boolean {
  let inside = false;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    const ay = 2 * a.y;
    const by = 2 * b.y;
    if ((ay > qy2) !== (by > qy2)) {
      const o = orient2d(2 * a.x, ay, 2 * b.x, by, qx2, qy2);
      if (by > ay ? o > 0 : o < 0) inside = !inside;
    }
  }
  return inside;
}

function pointsOf(p: Plat, ring: readonly HalfEdgeId[]): LatticePoint[] {
  const O = p.halfEdges.origin;
  return ring.map((h) => ({ x: p.vertices.x[O[h]] as Cm, y: p.vertices.y[O[h]] as Cm }));
}

/** The half-edge of a cycle leaving its lowest (y, x) vertex: the stored half-edge a re-walked record takes (slot-free). */
function lowestHalf(p: Plat, cycle: readonly HalfEdgeId[]): HalfEdgeId {
  const O = p.halfEdges.origin;
  let best = cycle[0];
  for (const h of cycle) {
    const c = compareVertices(p, O[h], O[best]);
    if (c < 0 || (c === 0 && compareVertices(p, dest(p, h), dest(p, best)) < 0)) best = h;
  }
  return best;
}

/**
 * Does v lie on the run its two incident edges ha, hb form — within the hot pixel (0.71 cm, §3.6's placement bound) of
 * that run's own-level route: for a vertex finer than the edges, the route between the run's ends of their level; for
 * one of their level, the segment joining their far ends? A chain's own corner that a split vertex carries (a chain
 * landing on another's edge) has two edges with identical rows but splits no run of its own; this is what tells the
 * two apart (C-0185 (4)). Exact: integer orientation and dot products against 0.71².
 */
function onRun(p: Plat, v: VertexId, ha: HalfEdgeId, hb: HalfEdgeId): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  let a: VertexId;
  let b: VertexId;
  if (p.vertices.level[v] > p.halfEdges.level[ha >> 1]) {
    const run = routeRun(p, ha).halfEdges;
    a = p.halfEdges.origin[run[0]];
    b = dest(p, run[run.length - 1]);
  } else {
    a = dest(p, ha);
    b = dest(p, hb);
  }
  return nearSegment(p, v, a, b);
}

/** Is v within the hot pixel of the segment a–b, its projection on it? Exact: integer orientation and dot products. */
function nearSegment(p: Plat, v: VertexId, a: VertexId, b: VertexId): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  if (a === b) return false;
  const dx = X[b] - X[a];
  const dy = Y[b] - Y[a];
  const l2 = dx * dx + dy * dy;
  const dot = (X[v] - X[a]) * dx + (Y[v] - Y[a]) * dy;
  if (dot < 0 || dot > l2) return false;
  const o = orient2d(X[a], Y[a], X[b], Y[b], X[v], Y[v]);
  return o * o <= HOT_SQ * l2;
}

/** The hot pixel's radius squared (0.71 cm, §3.2, §3.6). */
const HOT_SQ = HOT_PIXEL_CM * HOT_PIXEL_CM;

/**
 * Could the dissolution remove u — a `split` vertex with no vertex row and no pin whose two edges carry one level and
 * identical rows (§2.2 rule 3's conditions, its flag as it stands and the on-run test aside)?
 */
function dissolvable(p: Plat, u: VertexId): boolean {
  if (!isVertexLive(p, u)) return false;
  const flags = p.vertices.flags[u];
  if ((flags & VERTEX_SPLIT) === 0 || (flags & VERTEX_PINNED) !== 0 || p.roles.vertexFirst[u] !== -1) return false;
  const inc = around(p, u);
  if (inc.length !== 2 || inc[0] >> 1 === inc[1] >> 1) return false;
  const T = p.halfEdges;
  return T.level[inc[0] >> 1] === T.level[inc[1] >> 1] && sameList(pairRows(p, inc[0]), pairRows(p, inc[1]));
}

/**
 * Does v, of its edges' level, lie on the stretch its edges ha, hb form — within the hot pixel of the segment a–b for SOME
 * a on ha's side and b on hb's side, each a vertex the dissolution walks through (a split vertex with no row, no pin,
 * degree 2, one level, identical rows) or the first vertex each way it cannot remove (C-0223, C-0224)? A split vertex
 * was placed within the hot pixel of the PIECE of the edge it split, and that piece's ends were the edge's ends or
 * earlier splits of it, all still on the stretch before the batch (only a removal dissolves them): one of these segments
 * is that piece, whatever the order the splits came in — no history read. The neighbours' segment (an earlier split
 * standing off its LATER neighbour's, the property's case 855) and the restored stretch's are two of them; an edge split
 * four times places a middle split near a piece neither is (checks/M0-a-06-s2.md B-1: cases 817, 1526). Positions never
 * change in a rewrite, so the segments are the pre-batch arena's; the walk reads the topology the deletions left (the
 * removed chain's edges gone, its crossings of degree 2). A stretch that closes on v (a ring of such vertices) has no
 * ends: false.
 */
function onStretch(p: Plat, v: VertexId, ha: HalfEdgeId, hb: HalfEdgeId): boolean {
  const T = p.halfEdges;
  const side = (h0: HalfEdgeId): VertexId[] | null => {
    const out: VertexId[] = [];
    let h = h0;
    for (let guard = 0; ; guard++) {
      check(guard <= T.origin.length, `the stretch through vertex ${v} does not end`);
      const u = dest(p, h);
      if (u === v) return null;
      out.push(u);
      if (!dissolvable(p, u)) return out;
      const [g1, g2] = around(p, u);
      h = g1 === (h ^ 1) ? g2 : g1;
    }
  };
  const as = side(ha);
  const bs = side(hb);
  if (as === null || bs === null) return false;
  for (const a of as) for (const b of bs) if (nearSegment(p, v, a, b)) return true;
  return false;
}

/** Removes an edge pair (no row left on it) from both endpoints' rotations and frees it (§2.2's half-edge links). */
function deletePair(p: Plat, e: number): void {
  const T = p.halfEdges;
  const h = 2 * e;
  const g = h + 1;
  const a = T.origin[h];
  const b = T.origin[g];
  // At a: x → h becomes x → next(g); at b: x' → g becomes x' → next(h).
  const x = T.prev[h];
  const y = T.next[g];
  const x2 = T.prev[g];
  const y2 = T.next[h];
  if (x !== g) {
    T.next[x] = y;
    T.prev[y] = x;
  }
  if (x2 !== h) {
    T.next[x2] = y2;
    T.prev[y2] = x2;
  }
  if (p.vertices.out[a] === h) p.vertices.out[a] = x === g ? -1 : y;
  if (p.vertices.out[b] === g) p.vertices.out[b] = x2 === h ? -1 : y2;
  freeEdgePair(p, h);
}

// ---- the saved state -------------------------------------------------------------------------------------------------

/** An old record at a level, saved before any write: its rings, key points, attributes, children and index home. */
interface OldRecord {
  readonly f: FaceId;
  readonly level: Level;
  readonly rings: HalfEdgeId[][];
  readonly ringPoints: LatticePoint[][];
  readonly key: [LatticePoint, LatticePoint];
  readonly children: FaceId[];
}

/** A route edge's identity before the rewrite (§3.3: its level, its handle pair, its two ends) and its pairs. */
interface OldRun {
  readonly level: Level;
  readonly handle: number;
  readonly a: VertexId;
  readonly b: VertexId;
  readonly pairs: number[];
  readonly home: number;
}

function runOf(p: Plat, e: number): { level: Level; handle: number; a: VertexId; b: VertexId; pairs: number[] } {
  const run = routeRun(p, 2 * e);
  const hs = run.halfEdges;
  return { level: run.level, handle: hs[0] >> 1, a: p.halfEdges.origin[hs[0]], b: dest(p, hs[hs.length - 1]), pairs: hs.map((h) => h >> 1) };
}

function pointCmp(a: LatticePoint, b: LatticePoint): number {
  return a.y !== b.y ? (a.y < b.y ? -1 : 1) : a.x !== b.x ? (a.x < b.x ? -1 : 1) : 0;
}

function keyCmp(a: OldRecord, b: OldRecord): number {
  return pointCmp(a.key[0], b.key[0]) || pointCmp(a.key[1], b.key[1]);
}

/** The records round a split vertex at each level, found before any write (the dissolution's and restoration's faces). */
interface Around {
  readonly level: Level;
  readonly f: FaceId;
}

/**
 * Applies a rewrite on the open transaction and every consequence of §2.2 rule 3 (see the module comment). The caller
 * has decided every refusal; this writes and does not refuse (a broken precondition throws). Every read of the index
 * happens before the first write and every index write after the last arena write, so no query ever sees the arena
 * half-written. Returns false when the batch's work limit is now exceeded (the batch is doomed and will reject).
 */
export function rewriteRows(t: OpenTx, w: Rewrite): boolean {
  const p = t.plat;
  const T = p.halfEdges;
  const R = p.roles;
  const L = p.vertices.level;
  const strip = new Set<number>(w.strip);
  const clear = w.clear;

  // ---- the plan: what loses rows, what is deleted, what is demoted (a) ----
  const touchedPairs = new Set<number>();
  const vertexRowsLost = new Map<VertexId, number[]>();
  for (const r of strip) {
    const el = rowElement(p, r);
    if (roleInfo(R.kind[r]).kind === 'edge') touchedPairs.add(el);
    else {
      const list = vertexRowsLost.get(el) ?? [];
      list.push(r);
      vertexRowsLost.set(el, list);
    }
  }
  const addsOn = new Map<number, AddRow[]>();
  for (const a of w.add) {
    if (roleInfo(a.role).kind === 'edge') {
      const e = a.element >> 1;
      touchedPairs.add(e);
      const list = addsOn.get(e) ?? [];
      list.push(a);
      addsOn.set(e, list);
    }
  }
  const deleted = new Set<number>();
  const demoted = new Map<number, Level>();
  for (const e of touchedPairs) {
    let lowest = 5;
    for (const r of rowsOn(p, 'edge', 2 * e)) if (!strip.has(r)) lowest = Math.min(lowest, R.level[r]);
    for (const a of addsOn.get(e) ?? []) lowest = Math.min(lowest, a.level);
    if (lowest === 5) deleted.add(e);
    else if (lowest > T.level[e]) demoted.set(e, lowest as Level);
    else check(lowest === T.level[e], `an edge's birth level is the lowest level among its rows (pair ${e})`);
  }
  const vstar = new Set<VertexId>();
  for (const e of touchedPairs) {
    vstar.add(T.origin[2 * e]);
    vstar.add(T.origin[2 * e + 1]);
  }
  for (const v of vertexRowsLost.keys()) vstar.add(v);
  for (const v of w.vertices ?? []) if (isVertexLive(p, v)) vstar.add(v);
  for (const a of w.add) if (roleInfo(a.role).kind === 'vertex') vstar.add(a.element);

  // ---- the before-image of what the consequences read (every index read is here) ----
  // C-0185 (4)'s on-run test, decided for every split vertex before the first merge: every pair of its incident edges of
  // one level that it lies on — here against its neighbours before the batch, and (below, once the deletions are done)
  // against the stretch the dissolution will restore. Rule 3 (b), dissolution and split restoration read these pairs
  // (followed through the batch's earlier merges), never the geometry after a merge: dissolving one crossing of a run
  // moves the far end of the next, which was placed within the hot pixel of the piece it split, not of the restored edge
  // (checks/M0-a-06-s1.md B-1; C-0223).
  const onRunBefore = new Map<VertexId, [number, number][]>();
  // (b): each split vertex's run candidates — pairs of its incident edges of its lowest incident level with identical rows
  // there; a pair is one of its runs when it is also on onRunBefore's list.
  const runsBefore = new Map<VertexId, [number, number][]>();
  for (const v of vstar) {
    if ((p.vertices.flags[v] & VERTEX_SPLIT) === 0) continue;
    const inc = around(p, v);
    if (inc.length === 0) continue;
    const on: [number, number][] = [];
    for (let i = 0; i < inc.length; i++) {
      for (let j = i + 1; j < inc.length; j++) {
        if (T.level[inc[i] >> 1] === T.level[inc[j] >> 1] && onRun(p, v, inc[i], inc[j])) on.push([inc[i] >> 1, inc[j] >> 1]);
      }
    }
    onRunBefore.set(v, on);
    let m0 = 5;
    for (const h of inc) m0 = Math.min(m0, T.level[h >> 1]);
    const at = inc.filter((h) => T.level[h >> 1] === m0);
    const pairs: [number, number][] = [];
    for (let i = 0; i < at.length; i++) {
      for (let j = i + 1; j < at.length; j++) {
        if (sameList(levelRows(p, at[i], m0), levelRows(p, at[j], m0))) pairs.push([at[i] >> 1, at[j] >> 1]);
      }
    }
    runsBefore.set(v, pairs);
  }
  // The records beside every edge that vanishes from a level's view, and the cleared records.
  const old: Map<FaceId, OldRecord>[] = LV.map(() => new Map());
  const saveRecord = (level: Level, f: FaceId, into: Map<FaceId, OldRecord>[] = old, walked?: HalfEdgeId[][]): void => {
    if (f < 0 || into[level].has(f)) return;
    const rings = walked ?? faceWalk(p, level, f);
    if (walked === undefined) chargeTx(t, TX_FACES_WALKED, rings.length);
    const k = faceKey(p, level, f);
    const children: FaceId[] = [];
    if (level < 4) {
      const up = (level + 1) as Level;
      const Fu = p.faces[up];
      for (const c of query(p, t.key, up, ringBox(p, rings), { faces: true }).faces) if (Fu.parent[c] === f) children.push(c);
    }
    into[level].set(f, {
      f,
      level,
      rings,
      ringPoints: rings.map((r) => pointsOf(p, r)),
      key: [{ x: p.vertices.x[k[0]] as Cm, y: p.vertices.y[k[0]] as Cm }, { x: p.vertices.x[k[1]] as Cm, y: p.vertices.y[k[1]] as Cm }],
      children,
    });
  };
  // A side with no record at the level is its parent's own child there: its rings at the level (the coarser record's,
  // walked at this level) seed the re-walk too, so the face it merges into gets every ring it brings (C-0185 (3)).
  const seeds: HalfEdgeId[][][] = LV.map(() => []);
  // The records beside an edge demoted past their level: the face each joins still holds that (finer) edge, so it keeps a
  // record — the parent of the own children the edge's new level needs (rule 2; checks/M0-a-06.md F-1).
  const holdsDemoted: Set<FaceId>[] = LV.map(() => new Set());
  const sideAt = (l: Level, h: HalfEdgeId, demotedSide = false): void => {
    const f = recordLeftOf(t, l, h);
    if (f >= 0) {
      saveRecord(l, f);
      if (demotedSide) holdsDemoted[l].add(f);
      return;
    }
    seeds[l].push(walkRing(p, l, h));
    for (let m = l - 1; m >= 0; m--) {
      const g = recordLeftOf(t, m as Level, h);
      if (g < 0) continue;
      const Fm = p.faces[m];
      for (const s of [Fm.outer[g], ...faceHoles(p, m as Level, g)]) seeds[l].push(walkRing(p, l, s));
      chargeTx(t, TX_FACES_WALKED, 1);
      break;
    }
  };
  for (const l of LV) {
    for (const e of deleted) if (T.level[e] <= l) for (const h of [2 * e, 2 * e + 1]) sideAt(l, h);
    for (const [e, nl] of demoted) if (T.level[e] <= l && l < nl) for (const h of [2 * e, 2 * e + 1]) sideAt(l, h, true);
    if (clear !== undefined) for (const f of clear[l]) saveRecord(l, f);
  }
  // The records round every split vertex (the ones the dissolution and split restoration may change).
  const aroundV = new Map<VertexId, Around[]>();
  for (const v of vstar) {
    if ((p.vertices.flags[v] & VERTEX_SPLIT) === 0) continue;
    const inc = around(p, v);
    const list: Around[] = [];
    for (const l of LV) {
      for (const h of inc) {
        if (T.level[h >> 1] > l) continue;
        const f = recordLeftOf(t, l, h);
        if (f >= 0 && !list.some((x) => x.level === l && x.f === f)) list.push({ level: l, f });
      }
    }
    aroundV.set(v, list);
  }
  // The route edges whose runs may change, and the vertices whose items may.
  const oldRuns = new Map<number, OldRun>();
  const saveRun = (e: number): void => {
    if (!isHalfEdgeLive(p, 2 * e)) return;
    const r = runOf(p, e);
    if (oldRuns.has(r.handle)) return;
    oldRuns.set(r.handle, { ...r, home: homeOf(p, { kind: ITEM_EDGE, level: r.level, slot: r.handle }) });
  };
  for (const e of touchedPairs) saveRun(e);
  for (const v of vstar) for (const h of around(p, v)) saveRun(h >> 1);
  const oldVertex = new Map<VertexId, { level: Level; home: number }>();
  for (const v of vstar) oldVertex.set(v, { level: L[v] as Level, home: p.indexHome.vertex[v] });
  const faceHome = new Map<string, number>();
  const noteHome = (level: Level, f: FaceId): void => {
    const k = `${level}:${f}`;
    if (!faceHome.has(k)) faceHome.set(k, homeOf(p, { kind: ITEM_FACE, level, slot: f }));
  };
  // A demoted edge is an edge of its new level: where that level holds no record beside it, its own children are
  // materialised down to that level (§2.2 rule 2; C-0185 (3)) — the coarser record that holds it found now.
  // Every coarser record holding the side is noted, finest first: the face pass may merge or free the finest (its
  // successor is then the base), and where it freed it the next coarser one's successor is.
  const materialisePlan: MaterialisePlan[] = [];
  for (const [e, nl] of demoted) {
    for (const h of [2 * e, 2 * e + 1]) {
      if (recordLeftOf(t, nl, h) >= 0) continue;
      // The side's ring at each level the edge leaves (finest first; the face pass re-walks them all), then the record
      // holding it at the edge's old level and that record's ancestors (rule 2's parents), which no re-walk touches.
      const probes: { level: Level; ring: HalfEdgeId[] }[] = [];
      for (let m = nl - 1; m >= T.level[e]; m--) probes.push({ level: m as Level, ring: walkRing(p, m as Level, h) });
      chargeTx(t, TX_FACES_WALKED, probes.length);
      const bases: { level: Level; f: FaceId }[] = [];
      const m0 = T.level[e] as Level;
      const f0 = recordLeftOf(t, m0, h);
      const top = f0 >= 0 ? f0 : -1;
      if (top >= 0) bases.push({ level: m0, f: top });
      for (let l = m0 - 1, g = top >= 0 ? p.faces[m0].parent[top] : -1; l >= 0 && g >= 0; g = p.faces[l].parent[g], l--) bases.push({ level: l as Level, f: g });
      if (top < 0) {
        for (let l = m0 - 1; l >= 0; l--) {
          const g = recordLeftOf(t, l as Level, h);
          if (g < 0) continue;
          bases.push({ level: l as Level, f: g });
          for (let k = l - 1, q = p.faces[l].parent[g]; k >= 0 && q >= 0; q = p.faces[k].parent[q], k--) bases.push({ level: k as Level, f: q });
          break;
        }
      }
      materialisePlan.push({ h, level: nl, probes, bases });
    }
  }
  // The own-child ancestors of every saved record (N-47; rule 2, C-0185 (3)'s keep rule): a record coarser than the
  // vanishing edges with no edge of its own level on its rings has no edge the rewrite deletes or demotes, so no side
  // gathers it — yet where the face pass frees its every child it is its parent's own child again and keeps no record.
  // Gathered now, before any write (its children by the index): each saved record's parent chain, finest first, up to
  // L1, while the parent is an own child (a parent with an edge of its level keeps its record whatever). A coarser
  // record a demoted edge's own children will hang from (a materialise base) is never a candidate.
  const ancestors: Map<FaceId, OldRecord>[] = LV.map(() => new Map());
  const based = new Set<string>();
  for (const plan of materialisePlan) for (const b of plan.bases) based.add(`${b.level}:${b.f}`);
  const ownLevelEdge = new Set<string>();
  for (let l = 4; l >= 2; l--) {
    const up = (l - 1) as Level;
    const F = p.faces[l];
    for (const f of [...old[l].keys(), ...ancestors[l].keys()]) {
      const q = F.parent[f];
      if (q < 0) continue;
      const k = `${up}:${q}`;
      if (old[up].has(q) || ancestors[up].has(q) || ownLevelEdge.has(k) || based.has(k)) continue;
      check(isFaceLive(p, up, q), `an L${l} record's parent is a live L${up} record`);
      const rings = faceWalk(p, up, q);
      chargeTx(t, TX_FACES_WALKED, rings.length);
      if (rings.some((ring) => ring.some((h) => T.level[h >> 1] === up))) {
        ownLevelEdge.add(k);
        continue;
      }
      saveRecord(up, q, ancestors, rings);
    }
  }
  for (const l of LV) for (const f of ancestors[l].keys()) noteHome(l, f);
  for (const l of LV) for (const f of old[l].keys()) noteHome(l, f);
  for (const list of aroundV.values()) for (const a of list) noteHome(a.level, a.f);
  if (t.work.total > t.workLimit) return false;

  // Which vertices lose a vertex row other than a knot row (read before the strip, which frees the rows).
  const nonKnotLost = new Map<VertexId, boolean>();
  for (const [v, lost] of vertexRowsLost) nonKnotLost.set(v, lost.some((r) => !roleInfo(R.kind[r]).knot));

  // ---- writes: rows ----
  for (const a of w.add) {
    const r = addRoleRow(p, a.element, a.role, intern(p, a.entity), a.level, a.ordinal);
    noteRow(t, a.role, R.entity[r], a.ordinal);
  }
  for (const r of strip) {
    noteRow(t, R.kind[r], R.entity[r], R.ordinal[r]);
    removeRoleRow(p, r);
  }
  // (b), the pin: a vertex from which the batch strips its last vertex row other than knot rows loses its kernel pin — a
  // non-knot row stripped and none left; stripping only knot rows keeps it (checks/M0-a-06.md F-3).
  for (const [v, lostNonKnot] of nonKnotLost) {
    if ((p.vertices.flags[v] & VERTEX_PINNED) === 0) continue;
    const left = rowsOn(p, 'vertex', v).some((r) => !roleInfo(R.kind[r]).knot);
    if (lostNonKnot && !left) {
      p.vertices.flags[v] &= ~VERTEX_PINNED;
      t.log.unflagged.push(v);
    }
  }
  // (a) edges, then the deletions.
  for (const [e, nl] of demoted) {
    T.level[e] = nl;
    const a = T.origin[2 * e];
    const b = T.origin[2 * e + 1];
    t.log.demotedEdges.push(compareVertices(p, a, b) <= 0 ? 2 * e : 2 * e + 1);
  }
  const ends = (e: number): [VertexId, VertexId] => {
    const a = T.origin[2 * e];
    const b = T.origin[2 * e + 1];
    return compareVertices(p, a, b) <= 0 ? [a, b] : [b, a];
  };
  const deletedSorted = [...deleted].sort((x, y) => {
    const ax = ends(x);
    const ay = ends(y);
    return compareVertices(p, ax[0], ay[0]) || compareVertices(p, ax[1], ay[1]);
  });
  for (const e of deletedSorted) {
    deletePair(p, e);
    t.log.edgesRemoved += 1;
  }

  // ---- the faces the deleted and demoted edges no longer bound (C-0185 (3)) ----
  const pass = facePass(t, old, seeds, clear, holdsDemoted, ancestors);
  const faceWrites = pass.writes;
  faceWrites.push(...materialise(t, materialisePlan, pass.successor, pass.coveredBy));

  // The on-run test's second reading (C-0223, C-0224), on the arena the deletions left and before any flag, level or
  // merge changes: a surviving same-level pair of a split vertex of its level lies on its run when the vertex is within
  // the hot pixel of a segment joining a vertex of the stretch on one side to one on the other (onStretch: every piece it
  // could have split) — beside onRunBefore's pre-batch neighbour test.
  const canonical = (vs: Iterable<VertexId>): VertexId[] => [...vs].filter((v) => isVertexLive(p, v)).sort((a, b) => compareVertices(p, a, b));
  for (const v of canonical(vstar)) {
    if ((p.vertices.flags[v] & VERTEX_SPLIT) === 0) continue;
    const on = onRunBefore.get(v) ?? [];
    const inc = around(p, v);
    for (let i = 0; i < inc.length; i++) {
      for (let j = i + 1; j < inc.length; j++) {
        const x = inc[i] >> 1;
        const y = inc[j] >> 1;
        if (T.level[x] !== T.level[y] || L[v] > T.level[x] || on.some(([a, b]) => (a === x && b === y) || (a === y && b === x))) continue;
        if (onStretch(p, v, inc[i], inc[j])) on.push([x, y]);
      }
    }
    onRunBefore.set(v, on);
  }
  const isOn = (v: VertexId, x: number, y: number): boolean => (onRunBefore.get(v) ?? []).some(([a, b]) => (a === x && b === y) || (a === y && b === x));
  // (b) flags: a split vertex keeps its flag only while a run it split survives whole.
  for (const v of canonical(vstar)) {
    if ((p.vertices.flags[v] & VERTEX_SPLIT) === 0) continue;
    const before = runsBefore.get(v) ?? [];
    const survives = before.some(([x, y]) => isHalfEdgeLive(p, 2 * x) && isHalfEdgeLive(p, 2 * y) && T.level[x] === T.level[y]
      && sameList(levelRows(p, 2 * x, T.level[x]), levelRows(p, 2 * y, T.level[y])) && isOn(v, x, y));
    if (!survives) {
      p.vertices.flags[v] &= ~VERTEX_SPLIT;
      t.log.unflagged.push(v);
    }
  }
  // (c) vertices, in canonical order.
  for (const v of canonical(vstar)) {
    const lv = L[v];
    const inc = around(p, v);
    const vr = rowsOn(p, 'vertex', v);
    const coarse = inc.some((h) => T.level[h >> 1] <= lv) || vr.some((r) => R.level[r] <= lv);
    if (coarse) {
      // A vertex finer than an incident edge stands inside that edge's run — exactly two coarser edges, of one level,
      // with identical rows of it (§3.10's level consistency). A removal that leaves it an END of a coarser run (a Steiner
      // vertex on a run whose one side the batch deleted, the other demoted) makes it that run's own vertex: it takes the
      // lowest level among its edges and rows, as a promotion, listed (C-0189).
      const under = inc.filter((h) => T.level[h >> 1] < lv);
      if (under.length === 0) continue;
      const m = T.level[under[0] >> 1];
      const single = under.length === 2 && T.level[under[1] >> 1] === m && sameList(levelRows(p, under[0], m), levelRows(p, under[1], m));
      if (single) continue;
      let lowest = lv;
      for (const h of inc) lowest = Math.min(lowest, T.level[h >> 1]);
      for (const r of vr) lowest = Math.min(lowest, R.level[r]);
      L[v] = lowest;
      p.vertices.flags[v] &= ~VERTEX_STEINER;
      if ((p.vertices.flags[v] & VERTEX_SPLIT) !== 0) {
        p.vertices.flags[v] &= ~VERTEX_SPLIT;
        t.log.unflagged.push(v);
      }
      t.log.promoted.push(v);
      continue;
    }
    let lowest = 5;
    for (const h of inc) lowest = Math.min(lowest, T.level[h >> 1]);
    for (const r of vr) lowest = Math.min(lowest, R.level[r]);
    if (lowest === 5) {
      freeVertex(p, v);
      continue;
    }
    L[v] = lowest;
    t.log.demotedVertices.push(v);
  }
  // The dissolution rule, then split restoration.
  const moved = new Map<HalfEdgeId, HalfEdgeId>(); // a dropped half-edge → the kept one that replaces it
  const follow = (h: HalfEdgeId): HalfEdgeId => {
    let g = h;
    for (let guard = 0; moved.has(g); guard++) {
      check(guard <= moved.size, 'the replacement chain of dissolved half-edges does not end');
      g = moved.get(g) as HalfEdgeId;
    }
    return g;
  };
  // Did v lie, before the batch, on the run its edges ha, hb form now — a pair of onRunBefore's, each edge followed
  // through the merges made since (an edge a dissolution extended is the kept pair of the one v had)?
  const wasOnRun = (v: VertexId, ha: HalfEdgeId, hb: HalfEdgeId): boolean => {
    const ea = ha >> 1;
    const eb = hb >> 1;
    return (onRunBefore.get(v) ?? []).some(([x, y]) => {
      const cx = follow(2 * x) >> 1;
      const cy = follow(2 * y) >> 1;
      return (cx === ea && cy === eb) || (cx === eb && cy === ea);
    });
  };
  const changedFaces: Around[] = [];
  for (const v of canonical(vstar)) dissolve(t, v, aroundV.get(v) ?? [], moved, changedFaces, wasOnRun);
  for (const v of canonical(vstar)) restoreSplit(t, v, aroundV.get(v) ?? [], changedFaces, wasOnRun);
  // Every record that stored a dropped half-edge stores the kept one (the chain of replacements followed).
  if (moved.size > 0) {
    const fixed = new Set<string>();
    const fix = (level: Level, f: FaceId): void => {
      const k = `${level}:${f}`;
      if (fixed.has(k) || !isFaceLive(p, level, f)) return;
      fixed.add(k);
      const F = p.faces[level];
      F.outer[f] = follow(F.outer[f]);
      const hs = faceHoles(p, level, f);
      if (hs.some((h) => moved.has(h))) setFaceHoles(p, level, f, hs.map(follow));
    };
    for (const list of aroundV.values()) for (const a of list) fix(a.level, a.f);
    for (const fw of faceWrites) if (fw.keep) fix(fw.level, fw.f);
  }

  // ---- the index: only the items that changed, written now that the arena is whole again ----
  for (const [v, was] of oldVertex) {
    const item: ItemRef = { kind: ITEM_VERTEX, level: was.level, slot: v };
    if (!isVertexLive(p, v)) {
      indexDelete(p, item);
      t.journal.changed.push({ item, homeBefore: was.home, successor: null });
    } else if (L[v] !== was.level) {
      const now: ItemRef = { kind: ITEM_VERTEX, level: L[v] as Level, slot: v };
      indexRelevel(p, now, was.level);
      t.journal.changed.push({ item, homeBefore: was.home, successor: now });
    }
  }
  const newRuns = new Map<number, ReturnType<typeof runOf>>();
  for (const r of oldRuns.values()) {
    for (const e of r.pairs) {
      if (!isHalfEdgeLive(p, 2 * e)) continue;
      const n = runOf(p, e);
      if (!newRuns.has(n.handle)) newRuns.set(n.handle, n);
    }
  }
  const same = (o: OldRun, n: ReturnType<typeof runOf>): boolean => o.level === n.level && o.a === n.a && o.b === n.b;
  for (const o of oldRuns.values()) {
    const n = newRuns.get(o.handle);
    if (n !== undefined && same(o, n)) continue;
    const item: ItemRef = { kind: ITEM_EDGE, level: o.level, slot: o.handle };
    indexDelete(p, item);
    t.journal.changed.push({ item, homeBefore: o.home, successor: null });
  }
  for (const n of newRuns.values()) {
    const o = oldRuns.get(n.handle);
    if (o !== undefined && same(o, n)) continue;
    indexAdd(p, { kind: ITEM_EDGE, level: n.level, slot: n.handle });
  }
  const written = new Set<string>();
  const homeAt = (level: Level, f: FaceId): number => faceHome.get(`${level}:${f}`) ?? homeOf(p, { kind: ITEM_FACE, level, slot: f });
  for (const fw of faceWrites) {
    const k = `${fw.level}:${fw.f}`;
    if (written.has(k)) continue;
    written.add(k);
    const item: ItemRef = { kind: ITEM_FACE, level: fw.level, slot: fw.f };
    // The slot's state at the end decides: a record the face pass freed whose slot materialise re-used is live again.
    if (isFaceLive(p, fw.level, fw.f)) {
      indexChange(p, item);
      t.journal.changed.push({ item, homeBefore: homeAt(fw.level, fw.f), successor: item });
    } else {
      indexDelete(p, item);
      t.journal.changed.push({ item, homeBefore: homeAt(fw.level, fw.f), successor: null });
    }
  }
  for (const a of changedFaces) {
    const k = `${a.level}:${a.f}`;
    if (written.has(k) || !isFaceLive(p, a.level, a.f)) continue;
    written.add(k);
    const item: ItemRef = { kind: ITEM_FACE, level: a.level, slot: a.f };
    indexChange(p, item);
    t.journal.changed.push({ item, homeBefore: homeAt(a.level, a.f), successor: item });
    t.log.faces[a.level].changed.push(a.f);
    noteOwner(t, a.level, a.f);
  }
  for (const v of vstar) t.log.vertices.push(v);
  for (const e of touchedPairs) t.log.pairs.push(e);
  return t.work.total <= t.workLimit;
}

/** The rows of a pair of exactly one level, as texts (the rows a run's identity reads, rule 3 (b)). */
function levelRows(p: Plat, h: HalfEdgeId, level: number): string[] {
  return rowsOn(p, 'edge', h).filter((r) => p.roles.level[r] === level).map((r) => rowText(p, r));
}

// ---- the face pass ----------------------------------------------------------------------------------------------------

/** A face record the face pass wrote: kept (its rings re-walked) or freed. */
interface FaceWrite {
  readonly level: Level;
  readonly f: FaceId;
  readonly keep: boolean;
}

interface NewFace {
  readonly outer: HalfEdgeId[];
  readonly holes: HalfEdgeId[][];
  readonly recs: OldRecord[];
}

/**
 * Re-walks, at every level, the faces round the old records (see the module comment): new cycles from the records'
 * surviving half-edges, faces by exact area and containment, each old record mapped to the face its region joined;
 * then, finest level first, which faces must keep a record (an edge of their level on a ring, or a surviving child),
 * an own-child ancestor of the re-walked records keeping its record only while a child survives (N-47); then, coarsest
 * first, the records written: the survivor by canonical key, the others freed, children re-parented.
 * Writes the arena's face tables only; returns the records whose index items the caller writes.
 */
function facePass(
  t: OpenTx,
  old: Map<FaceId, OldRecord>[],
  seeds: readonly HalfEdgeId[][][],
  clear: Five<ReadonlySet<FaceId>> | undefined,
  holdsDemoted: readonly ReadonlySet<FaceId>[],
  ancestors: readonly ReadonlyMap<FaceId, OldRecord>[],
): { writes: FaceWrite[]; successor: Map<string, FaceId>; coveredBy: Map<HalfEdgeId, FaceId>[] } {
  const p = t.plat;
  const T = p.halfEdges;
  const O = T.origin;
  const writes: FaceWrite[] = [];
  const successor = new Map<string, FaceId>(); // `${level}:${old record}` → the record its region now has (−1: none)
  const coveredBy: Map<HalfEdgeId, FaceId>[] = LV.map(() => new Map()); // per level: a kept record's new rings → it
  const perLevel: NewFace[][] = LV.map(() => []);
  const dropped: OldRecord[][] = LV.map(() => []);
  for (const l of LV) {
    const recs = [...old[l].values()];
    if (recs.length === 0) continue;
    const cycleOf = new Map<HalfEdgeId, number>();
    const cycles: HalfEdgeId[][] = [];
    for (const ring of [...recs.flatMap((rec) => rec.rings), ...seeds[l]]) {
      for (const h of ring) {
        if (cycleOf.has(h) || !isHalfEdgeLive(p, h) || T.level[h >> 1] > l) continue;
        const c = walkRing(p, l, h);
        for (const g of c) cycleOf.set(g, cycles.length);
        cycles.push(c);
      }
    }
    chargeTx(t, TX_FACES_WALKED, cycles.length);
    const pts = cycles.map((c) => pointsOf(p, c));
    const area = pts.map((x) => area2(x));
    const outers: number[] = [];
    const holeOf = new Map<number, number>(); // hole cycle → outer cycle
    for (let i = 0; i < cycles.length; i++) if (area[i] > 0) outers.push(i);
    for (let i = 0; i < cycles.length; i++) {
      if (area[i] > 0) continue;
      let best = -1;
      for (const o of outers) {
        if (best >= 0 && area[o] >= area[best]) continue;
        const on = new Set<VertexId>(cycles[o].map((h) => O[h]));
        const v = cycles[i].map((h) => O[h]).find((x) => !on.has(x));
        if (v === undefined) continue;
        if (insidePoints(pts[o], 2 * p.vertices.x[v], 2 * p.vertices.y[v])) best = o;
      }
      if (best >= 0) holeOf.set(i, best);
      else check(l === 0, `an L${l} hole cycle lies in no face of the re-walked region`);
    }
    const faceAt = new Map<number, number>(); // cycle → new face index
    const faces: { outer: number; holes: number[]; recs: OldRecord[] }[] = [];
    for (const o of outers) {
      faceAt.set(o, faces.length);
      faces.push({ outer: o, holes: [], recs: [] });
    }
    for (const [hc, o] of holeOf) {
      const fi = faceAt.get(o) as number;
      faces[fi].holes.push(hc);
      faceAt.set(hc, fi);
    }
    for (const rec of recs) {
      // The face on the left of the first surviving half-edge of its old rings (outer first) holds its old region.
      let fi: number | undefined;
      let found = false;
      for (const ring of rec.rings) {
        for (const h of ring) {
          if (!isHalfEdgeLive(p, h) || T.level[h >> 1] > l) continue;
          fi = faceAt.get(cycleOf.get(h) as number);
          found = true;
          break;
        }
        if (found) break;
      }
      if (fi === undefined) {
        // No boundary of the region survives in a bounded face: the face that now holds a point of its old interior —
        // the doubled midpoint of an old edge of it — by containment.
        const ring = rec.ringPoints[0];
        const a = ring[0];
        const b = ring[1 % ring.length];
        const qx2 = a.x + b.x;
        const qy2 = a.y + b.y;
        let best = -1;
        for (let k = 0; k < faces.length; k++) {
          const f = faces[k];
          if (!insidePoints(pts[f.outer], qx2, qy2)) continue;
          if (f.holes.some((hc) => insidePoints(pts[hc], qx2, qy2))) continue;
          if (best < 0 || area[f.outer] < area[faces[best].outer]) best = k;
        }
        if (best >= 0) fi = best;
      }
      if (fi === undefined) {
        check(l === 0, `an L${l} record's region lies in no face after the rewrite`);
        dropped[l].push(rec);
      } else {
        faces[fi].recs.push(rec);
      }
    }
    perLevel[l] = faces
      .filter((f) => f.recs.length > 0)
      .map((f) => ({ outer: cycles[f.outer], holes: f.holes.map((hc) => cycles[hc]), recs: f.recs.slice().sort(keyCmp) }));
  }

  // Finest level first: does each new face keep a record?
  const keeps: boolean[][] = LV.map((l) => perLevel[l].map(() => true));
  const survives: Map<FaceId, boolean>[] = LV.map(() => new Map()); // old record → survives as a record
  const survivorRec = (l: number, fi: number): OldRecord => {
    const recs = perLevel[l][fi].recs;
    const kept = clear === undefined ? recs : recs.filter((r) => !clear[l as Level].has(r.f));
    return kept.length > 0 ? kept[0] : recs[0];
  };
  for (let l = 4; l >= 0; l--) {
    perLevel[l].forEach((f, fi) => {
      let keep = true;
      if (l > 0) {
        const hasEdge = [f.outer, ...f.holes].some((c) => c.some((h) => T.level[h >> 1] === l));
        let hasChild = false;
        if (!hasEdge && l < 4) {
          const up = (l + 1) as Level;
          for (const r of f.recs) {
            for (const c of r.children) {
              // A child survives unless the pass frees it (a record outside the re-walk always does).
              if (!isFaceLive(p, up, c) || survives[up].get(c) === false) continue;
              hasChild = true;
              break;
            }
            if (hasChild) break;
          }
        }
        // A face beside an edge demoted past this level still holds that edge, now finer: its own children there need it.
        const holds = !hasEdge && f.recs.some((r) => holdsDemoted[l].has(r.f));
        keep = hasEdge || hasChild || holds;
      }
      keeps[l][fi] = keep;
      const sv = keep ? survivorRec(l, fi) : null;
      for (const r of f.recs) survives[l].set(r.f, sv !== null && r.f === sv.f);
    });
    // An own-child ancestor (N-47): its rings are unchanged and hold no edge of its level, so it keeps its record only
    // while a child survives.
    if (l > 0 && l < 4) {
      const up = (l + 1) as Level;
      for (const r of ancestors[l].values()) {
        const child = r.children.some((c) => isFaceLive(p, up, c) && survives[up].get(c) !== false);
        survives[l].set(r.f, child);
      }
    }
  }

  // Coarsest level first: write the records.
  for (const l of LV) {
    const F = p.faces[l];
    // The own-child ancestors left with no child: freed, listed and tombstoned like any freed record (N-47), in key order.
    for (const r of [...ancestors[l].values()].sort(keyCmp)) {
      if (survives[l].get(r.f) !== false) continue;
      successor.set(`${l}:${r.f}`, -1);
      noteOwner(t, l, r.f);
      t.log.removedKeys.set(`${l}:${r.f}`, r.key);
      freeFace(p, l, r.f);
      t.log.faces[l].removed.push(r.f);
      writes.push({ level: l, f: r.f, keep: false });
    }
    for (const r of dropped[l]) {
      successor.set(`${l}:${r.f}`, -1);
      noteOwner(t, l, r.f);
      t.log.removedKeys.set(`${l}:${r.f}`, r.key);
      freeFace(p, l, r.f);
      t.log.faces[l].removed.push(r.f);
      writes.push({ level: l, f: r.f, keep: false });
    }
    perLevel[l].forEach((f, fi) => {
      const sv = keeps[l][fi] ? survivorRec(l, fi) : null;
      for (const r of f.recs) {
        successor.set(`${l}:${r.f}`, sv === null ? -1 : sv.f);
        noteOwner(t, l, r.f);
        if (sv !== null && r.f === sv.f) continue;
        if (sv !== null && l < 4) {
          const up = (l + 1) as Level;
          const Fu = p.faces[up];
          for (const c of r.children) if (isFaceLive(p, up, c) && Fu.parent[c] === r.f) Fu.parent[c] = sv.f;
        }
        t.log.removedKeys.set(`${l}:${r.f}`, r.key);
        freeFace(p, l, r.f);
        t.log.faces[l].removed.push(r.f);
        writes.push({ level: l, f: r.f, keep: false });
      }
      if (sv === null) return;
      F.outer[sv.f] = lowestHalf(p, f.outer);
      setFaceHoles(p, l, sv.f, f.holes.map((c) => lowestHalf(p, c)));
      for (const c of [f.outer, ...f.holes]) for (const g of c) coveredBy[l].set(g, sv.f);
      if (clear !== undefined && clear[l].has(sv.f)) {
        // A cleared record a face must keep (kept finer content beside it): emptied of its owner and re-ranked to the
        // batch's stage (C-0185 (10)).
        setFaceOwner(p, l, sv.f, -1);
        F.stage[sv.f] = t.stageRank;
      }
      t.log.faces[l].changed.push(sv.f);
      noteOwner(t, l, sv.f);
      writes.push({ level: l, f: sv.f, keep: true });
    });
  }
  return { writes, successor, coveredBy };
}

/** Notes a face's owner (if any) among the entities whose faces changed. */
function noteOwner(t: OpenTx, level: Level, f: FaceId): void {
  const p = t.plat;
  const o = p.faces[level].owner[f];
  if (o >= 0) t.log.owners.add(idOf(p, o));
}


// ---- materialising own children for a demoted edge ---------------------------------------------------------------------

/** A demoted edge's side with no record at its new level: the coarser records holding it before the rewrite, finest first. */
interface MaterialisePlan {
  readonly h: HalfEdgeId;
  readonly level: Level;
  /** The side's ring before the rewrite at each level from the new one's coarser neighbour down to the edge's old level. */
  readonly probes: readonly { readonly level: Level; readonly ring: readonly HalfEdgeId[] }[];
  /** The record holding the side at the edge's old level (read through its successor), then the records below it, finest first. */
  readonly bases: readonly { readonly level: Level; readonly f: FaceId }[];
}

/**
 * The records a demoted edge needs at its new level (§2.2 rule 2: a level's records inside a parent face exist once an
 * edge of that level is there). For each side with no record there: the base is the finest coarser record that held the
 * side, as the face pass left it (its successor where it merged; the next coarser one's where it was freed); the base's
 * own children are made down to the level above (once per base and level), then, at the new level, the face left of the
 * side — the cycle through it, or the base region's ring that holds it as a hole — a new record with the base's kind,
 * owner and stage, its parent the record one level up. A side some record already covers (the face pass's, or one made
 * for the other side) is skipped, so both sides, a dangling edge and a merged or freed coarser record are each served
 * once (checks/M0-a-06.md F-1). Written to the face tables only; returns the records for the caller's index writes.
 */
function materialise(t: OpenTx, plans: readonly MaterialisePlan[], successor: ReadonlyMap<string, FaceId>, coveredBy: readonly Map<HalfEdgeId, FaceId>[]): FaceWrite[] {
  const p = t.plat;
  const T = p.halfEdges;
  const O = T.origin;
  const out: FaceWrite[] = [];
  // Per level: the half-edges on a materialised record's rings → it (as the face pass's coveredBy for its kept records).
  const madeBy: Map<HalfEdgeId, FaceId>[] = LV.map(() => new Map());
  const recordOn = (l: Level, g: HalfEdgeId): FaceId | undefined => coveredBy[l].get(g) ?? madeBy[l].get(g);
  const ownChild = new Map<string, FaceId>(); // `${level}:${base level}:${base}` → the own child made at that level
  // Coarser targets first, so a finer plan finds the records a coarser one made; then by the edge's ends and direction
  // (lattice positions, never a slot).
  const order = plans.slice().sort((a, b) => a.level - b.level
    || compareVertices(p, O[a.h & ~1], O[b.h & ~1]) || compareVertices(p, O[a.h | 1], O[b.h | 1]) || (a.h & 1) - (b.h & 1));
  for (const plan of order) {
    // A side the face pass has since given a record (its region merged into one that has a record at the level) needs none.
    if (!isHalfEdgeLive(p, plan.h) || T.level[plan.h >> 1] !== plan.level || recordOn(plan.level, plan.h) !== undefined) continue;
    // The base: the finest level whose face holding the side now keeps a record — found on the re-walked rings the face
    // pass kept (a region that merged into a recorded face, or a record that survived), else a record below the levels
    // the edge left.
    let from: Level = 0;
    let base: FaceId = -1;
    for (const pr of plan.probes) {
      for (const g of pr.ring) {
        if (!isHalfEdgeLive(p, g) || T.level[g >> 1] > pr.level) continue;
        const rec = recordOn(pr.level, g);
        if (rec !== undefined) {
          from = pr.level;
          base = rec;
          break;
        }
      }
      if (base >= 0) break;
    }
    if (base < 0) {
      for (const c of plan.bases) {
        const s = successor.get(`${c.level}:${c.f}`) ?? c.f;
        if (s >= 0 && isFaceLive(p, c.level, s)) {
          from = c.level;
          base = s;
          break;
        }
      }
    }
    if (base < 0) continue;
    const Fb = p.faces[from];
    const kind = Fb.kind[base];
    const owner = Fb.owner[base];
    const stage = Fb.stage[base];
    const baseRings = [Fb.outer[base], ...faceHoles(p, from, base)];
    let parent = base;
    for (let m = from + 1; m < plan.level; m++) {
      const lm = m as Level;
      const k = `${lm}:${from}:${base}`;
      const had = ownChild.get(k);
      if (had !== undefined) {
        parent = had;
        continue;
      }
      const f = allocFace(p, lm, { outer: baseRings[0], kind, owner, stage, parent });
      if (baseRings.length > 1) setFaceHoles(p, lm, f, baseRings.slice(1));
      for (const b of baseRings) for (const g of walkRing(p, lm, b)) madeBy[lm].set(g, f);
      t.log.faces[lm].created.push(f);
      out.push({ level: lm, f, keep: true });
      ownChild.set(k, f);
      parent = f;
    }
    // At the new level: the cycles of the base's region with the edge in it, and the face holding the side.
    const lv = plan.level;
    const seen = new Set<HalfEdgeId>();
    const cycles: HalfEdgeId[][] = [];
    for (const h0 of [plan.h, ...baseRings]) {
      if (seen.has(h0) || !isHalfEdgeLive(p, h0) || T.level[h0 >> 1] > lv) continue;
      const c = walkRing(p, lv, h0);
      for (const g of c) seen.add(g);
      cycles.push(c);
    }
    chargeTx(t, TX_FACES_WALKED, cycles.length);
    const pts = cycles.map((c) => pointsOf(p, c));
    const area = pts.map((x) => area2(x));
    // cycles[0] runs through the side: an outer ring itself, or a hole of the smallest outer holding it.
    let outer = -1;
    if (area[0] > 0) outer = 0;
    else {
      const holeVertex = (i: number, o: number): VertexId | undefined => {
        const on = new Set<VertexId>(cycles[o].map((h) => T.origin[h]));
        return cycles[i].map((h) => T.origin[h]).find((x) => !on.has(x));
      };
      for (let o = 1; o < cycles.length; o++) {
        if (area[o] <= 0 || (outer >= 0 && area[o] >= area[outer])) continue;
        const v = holeVertex(0, o);
        if (v !== undefined && insidePoints(pts[o], 2 * p.vertices.x[v], 2 * p.vertices.y[v])) outer = o;
      }
    }
    if (outer < 0) continue;
    const holes: number[] = [];
    for (let i = 0; i < cycles.length; i++) {
      if (i === outer || area[i] > 0) continue;
      // A hole of this outer: the smallest outer among the cycles holding it is this one.
      let best = -1;
      for (let o = 0; o < cycles.length; o++) {
        if (area[o] <= 0 || (best >= 0 && area[o] >= area[best])) continue;
        const on = new Set<VertexId>(cycles[o].map((h) => T.origin[h]));
        const v = cycles[i].map((h) => T.origin[h]).find((x) => !on.has(x));
        if (v !== undefined && insidePoints(pts[o], 2 * p.vertices.x[v], 2 * p.vertices.y[v])) best = o;
      }
      if (best === outer) holes.push(i);
    }
    if ([outer, ...holes].some((i) => cycles[i].some((g) => recordOn(lv, g) !== undefined))) continue;
    const f = allocFace(p, lv, { outer: lowestHalf(p, cycles[outer]), kind, owner, stage, parent });
    if (holes.length > 0) setFaceHoles(p, lv, f, holes.map((i) => lowestHalf(p, cycles[i])));
    for (const i of [outer, ...holes]) for (const g of cycles[i]) madeBy[lv].set(g, f);
    t.log.faces[lv].created.push(f);
    out.push({ level: lv, f, keep: true });
  }
  return out;
}

// ---- dissolution and split restoration -----------------------------------------------------------------------------

/**
 * The dissolution rule (§2.2 rule 3): a vertex left with degree 2 that carries the `split` flag, no vertex role row and
 * no pin, whose two edges carry identical role sets and one birth level, is removed and its two edges become one — the
 * edge it was created on, restored. The two edges must be a pair the vertex lay on as the batch decided before its first
 * merge (`wasOnRun`, C-0185 (4), C-0223), so the order of the dissolutions never changes which vertices go. The pair at the run's start end is kept (for a vertex finer than the run, the pair
 * first in the run's order; for one of the run's level, the pair toward the lower (y, x) neighbour), so the run's
 * handle and every coarser route stay as they were; `moved` maps the dropped pair's half-edges to the kept ones, which
 * every record that stored them takes (the caller). `near` are the records round v found before any write.
 */
function dissolve(
  t: OpenTx,
  v: VertexId,
  near: readonly Around[],
  moved: Map<HalfEdgeId, HalfEdgeId>,
  changedFaces: Around[],
  wasOnRun: (v: VertexId, ha: HalfEdgeId, hb: HalfEdgeId) => boolean,
): void {
  const p = t.plat;
  const T = p.halfEdges;
  if (!isVertexLive(p, v)) return;
  const flags = p.vertices.flags[v];
  if ((flags & VERTEX_SPLIT) === 0 || (flags & VERTEX_PINNED) !== 0) return;
  if (p.roles.vertexFirst[v] !== -1) return;
  const inc = around(p, v);
  if (inc.length !== 2) return;
  const [ha, hb] = inc;
  const ea = ha >> 1;
  const eb = hb >> 1;
  if (ea === eb || T.level[ea] !== T.level[eb]) return;
  if (!sameList(pairRows(p, ha), pairRows(p, hb))) return;
  if (!wasOnRun(v, ha, hb)) return;
  const ua = dest(p, ha);
  const ub = dest(p, hb);
  if (ua === ub) return;
  for (const h of around(p, ua)) if (dest(p, h) === ub) return; // the restored edge would double an existing one
  const m = T.level[ea] as Level;
  const lv = p.vertices.level[v];
  let keepA: boolean;
  if (lv > m) {
    const run = routeRun(p, ha).halfEdges;
    const ia = run.findIndex((h) => h >> 1 === ea);
    const ib = run.findIndex((h) => h >> 1 === eb);
    keepA = ia < ib;
  } else {
    keepA = compareVertices(p, ua, ub) <= 0;
  }
  const k = (keepA ? ha : hb) ^ 1; // x → v on the kept pair
  const d = keepA ? hb : ha; // v → y on the dropped pair
  for (const a of near) if (a.level >= lv) changedFaces.push(a);
  // The merge (the inverse of splitThrough's writer): k: x → v and d: v → y become k: x → y.
  const y = T.origin[d ^ 1];
  const after = T.next[d];
  const before = T.prev[d ^ 1];
  if (after === (d ^ 1)) {
    T.next[k] = k ^ 1;
    T.prev[k ^ 1] = k;
  } else {
    T.next[k] = after;
    T.prev[after] = k;
    T.next[before] = k ^ 1;
    T.prev[k ^ 1] = before;
  }
  T.origin[k ^ 1] = y;
  if (p.vertices.out[y] === (d ^ 1)) p.vertices.out[y] = k ^ 1;
  moved.set(d, k);
  moved.set(d ^ 1, k ^ 1);
  for (const r of rowsOn(p, 'edge', k)) noteRow(t, p.roles.kind[r], p.roles.entity[r], p.roles.ordinal[r]);
  for (const r of rowsOn(p, 'edge', d)) removeRoleRow(p, r);
  freeEdgePair(p, d);
  p.vertices.out[v] = -1;
  freeVertex(p, v);
  t.log.edgesRemoved += 1;
  if ((flags & VERTEX_STEINER) !== 0) t.log.steinerDissolved += 1;
  t.log.pairs.push(k >> 1);
}

/**
 * Split restoration (§2.2 rule 3 (c)'s last step): a `split` vertex whose incident edges of its level or coarser are
 * exactly two, of one level, with identical rows of its level or coarser, which carries no vertex row of its level or
 * coarser and no pin, but still meets finer edges or carries finer vertex rows, takes the lowest level among those —
 * the vertex dissolution would take but for that finer geometry — and keeps its flag (now a Steiner vertex of the run).
 * The on-run test is `wasOnRun`'s, decided before the first merge (C-0223).
 */
function restoreSplit(
  t: OpenTx,
  v: VertexId,
  near: readonly Around[],
  changedFaces: Around[],
  wasOnRun: (v: VertexId, ha: HalfEdgeId, hb: HalfEdgeId) => boolean,
): void {
  const p = t.plat;
  const T = p.halfEdges;
  const R = p.roles;
  if (!isVertexLive(p, v)) return;
  const flags = p.vertices.flags[v];
  if ((flags & VERTEX_SPLIT) === 0 || (flags & VERTEX_PINNED) !== 0) return;
  const lv = p.vertices.level[v];
  const inc = around(p, v);
  const coarse = inc.filter((h) => T.level[h >> 1] <= lv);
  if (coarse.length !== 2 || (coarse[0] >> 1) === (coarse[1] >> 1)) return;
  const m = T.level[coarse[0] >> 1];
  if (T.level[coarse[1] >> 1] !== m) return;
  if (!sameList(pairRows(p, coarse[0], lv), pairRows(p, coarse[1], lv))) return;
  if (!wasOnRun(v, coarse[0], coarse[1])) return;
  const vr = rowsOn(p, 'vertex', v);
  if (vr.some((r) => R.level[r] <= lv)) return;
  let finer = 5;
  for (const h of inc) if (T.level[h >> 1] > lv) finer = Math.min(finer, T.level[h >> 1]);
  for (const r of vr) finer = Math.min(finer, R.level[r]);
  if (finer === 5) return;
  for (const a of near) if (a.level >= lv && a.level < finer) changedFaces.push(a);
  p.vertices.level[v] = finer;
  if (finer > m) p.vertices.flags[v] |= VERTEX_STEINER;
  t.log.demotedVertices.push(v);
}
