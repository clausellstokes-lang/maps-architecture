// What each level's index holds (§3.3 *What each level's index holds*; SCL-2, J-K6, J-K32): the items of that level —
// its vertices, its route edges and its face records — with their keys (kind · 2³² + slot, *Tombstones and rebuilds*),
// their boxes and their home entries (`Plat.indexHome`, §2.2). M0-a-03.
//
// A **route edge** of level m is a maximal run of level-m sub-edges between two vertices of level ≤ m, whatever finer
// vertices split it later; its box is the bounding box of every vertex standing on the run, padded by the 0.71 cm hot
// pixel, and its handle is the half-edge leaving its lower (y, x) endpoint — the item is keyed by the handle's pair,
// which a split keeps on the part at that end, so the key never changes under finer splits. Its level-n route (n ≥ m)
// is the run cut at its vertices of level ≤ n (§2.2 rule 3); each piece is one level-n route edge, named by its sub-edge
// leaving its lower endpoint. A face's level-n route ring is its level-n walk with finer vertices skipped. Every reading
// here is a function of lattice positions and levels, never of a slot's number (§3.3 "No output depends on slot numbers").
import { compareVertices, faceWalk, isFaceLive, isHalfEdgeLive, isLevel, isVertexLive, type FaceId, type HalfEdgeId, type Plat, type VertexId } from '../arena/index.js';
import { lp } from '../num/exact.js';
import { area2 } from '../num/index.js';
import type { Level } from '../types/index.js';
import { setIndexHomeEdge, setIndexHomeFace, setIndexHomeVertex } from '../arena/write.js';

/** A structural precondition of the index (a programming error: it throws in every build, as the arena's `check`). */
export function check(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(`index: ${message}`);
}

/** The item kinds of §3.3's tombstone key: a vertex, a route edge or a face. */
export const ITEM_VERTEX = 0;
export const ITEM_EDGE = 1;
export const ITEM_FACE = 2;
export type ItemKind = typeof ITEM_VERTEX | typeof ITEM_EDGE | typeof ITEM_FACE;

/** 2³²: the kind's place in an item key (kind · 2³² + slot). */
const SLOT_SPAN = 4_294_967_296;

/** §3.3's hot pixel: half a lattice diagonal, the farthest a placement moves a route (§2.2 rule 3, §3.6). */
export const HOT_PIXEL_CM = 0.71;

/**
 * One index item: its kind, the level whose index holds it, and its slot — the vertex, the route edge's handle pair
 * (`handle >> 1`) or the face record at `level`. Kernel-internal, valid within one batch (§2.2 rule 5).
 */
export interface ItemRef {
  readonly kind: ItemKind;
  readonly level: Level;
  readonly slot: number;
}

/** A closed axis-aligned box in centimetres. */
export interface Box {
  readonly minX: number;
  readonly minY: number;
  readonly maxX: number;
  readonly maxY: number;
}

/** §3.3's item key: kind · 2³² + slot (exact in a double: below 2³⁴). */
export function itemKey(kind: ItemKind, slot: number): number {
  return kind * SLOT_SPAN + slot;
}

/** The kind of an item key. */
export function keyKind(key: number): ItemKind {
  return Math.floor(key / SLOT_SPAN) as ItemKind;
}

/** The slot of an item key. */
export function keySlot(key: number): number {
  return key - keyKind(key) * SLOT_SPAN;
}

// ---- route edges --------------------------------------------------------------------------------------------------

/** A route edge's run: its level and its sub-edges from its lower (y, x) endpoint, directed along it; [0] is the handle. */
export interface RouteRun {
  readonly level: Level;
  readonly halfEdges: readonly HalfEdgeId[];
}

/** The two vertices a route piece joins (the lower (y, x) first) and its sub-edge leaving `a` along the piece. */
export interface RoutePiece {
  readonly a: VertexId;
  readonly b: VertexId;
  readonly edge: HalfEdgeId;
}

/**
 * The run continues past the end of `g` (a half-edge of a level-m run): at `w = dest(g)`, when w is finer than m, the
 * one other outgoing half-edge coarser than w — §3.10's level consistency gives exactly two, of one level, there — or
 * −1 where w is of level ≤ m (an endpoint). A malformed rotation is refused rather than followed.
 */
function onward(p: Plat, g: HalfEdgeId, m: Level): HalfEdgeId {
  const t = p.halfEdges;
  const w = t.origin[g ^ 1];
  const lw = p.vertices.level[w];
  if (lw <= m) return -1;
  const first = p.vertices.out[w];
  check(first >= 0, `vertex ${w} on a run has no edge`);
  let found = -1;
  let coarser = 0;
  let e = first;
  let guard = 0;
  do {
    if (t.level[e >> 1] < lw) {
      coarser++;
      check(t.level[e >> 1] === m, `vertex ${w} (L${lw}) lies on edges of two levels coarser than it`);
      if (e !== (g ^ 1)) found = e;
    }
    e = t.next[e ^ 1];
    check(++guard <= t.origin.length, `the rotation at vertex ${w} does not close`);
  } while (e !== first);
  check(coarser === 2 && found !== -1, `vertex ${w} (L${lw}) finer than its run does not have exactly two coarser edges`);
  return found;
}

/**
 * The route edge whose run holds half-edge `h` (§3.3): its sub-edges from its lower (y, x) endpoint — for a loop off
 * one vertex of its level, toward that vertex's smaller neighbour. A level-m ring with no vertex of level ≤ m has no
 * endpoint and is refused.
 */
export function routeRun(p: Plat, h: HalfEdgeId): RouteRun {
  check(isHalfEdgeLive(p, h), `half-edge ${h} is not live`);
  const m = p.halfEdges.level[h >> 1] as Level;
  const limit = p.slots.pair.top + 1;
  const forward: HalfEdgeId[] = [h];
  for (let g = onward(p, h, m); g !== -1; g = onward(p, g, m)) {
    check(g !== h && forward.length <= limit, `the L${m} run through half-edge ${h} has no endpoint of its level`);
    forward.push(g);
  }
  const backward: HalfEdgeId[] = [];
  for (let g = onward(p, h ^ 1, m); g !== -1; g = onward(p, g, m)) {
    check(backward.length + forward.length <= limit, `the L${m} run through half-edge ${h} does not end`);
    backward.push(g);
  }
  const run: HalfEdgeId[] = [];
  for (let i = backward.length - 1; i >= 0; i--) run.push(backward[i] ^ 1);
  for (const g of forward) run.push(g);
  const O = p.halfEdges.origin;
  const a = O[run[0]];
  const b = O[run[run.length - 1] ^ 1];
  let flip = compareVertices(p, b, a) < 0;
  if (a === b) {
    // A loop off one vertex of its level: it leaves that vertex toward its smaller neighbour (the convention resolve
    // reads a loop by, C-0146 (5)); where the two neighbours tie, the next vertices decide (C-0160).
    const k = run.length;
    for (let i = 0; i < k - 1; i++) {
      const c = compareVertices(p, O[run[k - 1 - i]], O[run[i] ^ 1]);
      if (c !== 0) {
        flip = c < 0;
        break;
      }
    }
  }
  if (flip) {
    const reversed: HalfEdgeId[] = [];
    for (let i = run.length - 1; i >= 0; i--) reversed.push(run[i] ^ 1);
    return { level: m, halfEdges: reversed };
  }
  return { level: m, halfEdges: run };
}

/** The handle pair of the route edge holding half-edge `h`: its item slot. */
export function routeHandlePair(p: Plat, h: HalfEdgeId): number {
  return routeRun(p, h).halfEdges[0] >> 1;
}

/**
 * The pieces of a run's level-n route (n ≥ the run's level): the run cut at its vertices of level ≤ n (§2.2 rule 3).
 * `io/encode.ts`'s `runsAt` and `onward` walk the same routes for the persisted block — a level-r route edge is by
 * definition a piece of `routePieces(routeRun(…), r)` — with the format's own refusals; the two walks are kept apart,
 * the block's being part of a persisted format (N-45 (b), C-0345).
 */
export function routePieces(p: Plat, run: RouteRun, n: Level): RoutePiece[] {
  check(n >= run.level, `a level-${run.level} route has no level-${n} pieces`);
  const t = p.halfEdges;
  const lv = p.vertices.level;
  const hs = run.halfEdges;
  const out: RoutePiece[] = [];
  let start = t.origin[hs[0]];
  let pieceFirst = hs[0];
  for (let i = 0; i < hs.length; i++) {
    const g = hs[i];
    const w = t.origin[g ^ 1];
    if (lv[w] > n) continue;
    // The piece from `start` to `w`, named by its sub-edge leaving its lower endpoint (the run's last sub-edge always
    // ends at a vertex of level ≤ the run's, so the last piece closes).
    if (compareVertices(p, w, start) < 0) out.push({ a: w, b: start, edge: g ^ 1 });
    else out.push({ a: start, b: w, edge: pieceFirst });
    start = w;
    if (i + 1 < hs.length) pieceFirst = hs[i + 1];
  }
  return out;
}

/** The box of a run: every vertex standing on it, padded by the hot pixel. */
export function runBox(p: Plat, run: RouteRun): Box {
  const t = p.halfEdges;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const take = (v: VertexId): void => {
    if (X[v] < minX) minX = X[v];
    if (X[v] > maxX) maxX = X[v];
    if (Y[v] < minY) minY = Y[v];
    if (Y[v] > maxY) maxY = Y[v];
  };
  for (const g of run.halfEdges) take(t.origin[g]);
  take(t.origin[run.halfEdges[run.halfEdges.length - 1] ^ 1]);
  return { minX: minX - HOT_PIXEL_CM, minY: minY - HOT_PIXEL_CM, maxX: maxX + HOT_PIXEL_CM, maxY: maxY + HOT_PIXEL_CM };
}

// ---- faces --------------------------------------------------------------------------------------------------------

/**
 * A face's rings read on the level-n route (§3.3): the vertices of level ≤ n of its level-`walkLevel` walk, outer ring
 * first, in walk order. For a face record of level n, `walkLevel` = n; for a coarser record that is its own child at n
 * (§2.2 rule 2), its rings walked at n from its stored half-edges.
 */
export function faceRouteRings(p: Plat, level: Level, f: FaceId, n: Level): VertexId[][] {
  check(n >= level, `a level-${level} face has no level-${n} route below its own`);
  const rings = faceWalk(p, level, f);
  const t = p.halfEdges;
  const lv = p.vertices.level;
  return rings.map((ring) => {
    const vs: VertexId[] = [];
    for (const h of ring) {
      const v = t.origin[h];
      if (lv[v] <= n) vs.push(v);
    }
    return vs;
  });
}

/**
 * Twice the face's area (cm²) over its own-level route rings, outer counter-clockwise and holes clockwise: exact (`area2`
 * sums each ring exactly, §3.2 (6)). The package exports this body under the suite's name (invariants/batch.ts,
 * C-0357).
 */
export function faceArea2(p: Plat, level: Level, f: FaceId): number {
  let s = 0;
  for (const ring of faceRouteRings(p, level, f, level)) s += area2(ring.map((v) => lp(p.vertices.x[v], p.vertices.y[v])));
  return s;
}

/** The box of a face record: every vertex of its outer ring at its level, padded by the hot pixel. */
export function faceBox(p: Plat, level: Level, f: FaceId): Box {
  const ring = faceWalk(p, level, f)[0];
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const h of ring) {
    const v = O[h];
    if (X[v] < minX) minX = X[v];
    if (X[v] > maxX) maxX = X[v];
    if (Y[v] < minY) minY = Y[v];
    if (Y[v] > maxY) maxY = Y[v];
  }
  return { minX: minX - HOT_PIXEL_CM, minY: minY - HOT_PIXEL_CM, maxX: maxX + HOT_PIXEL_CM, maxY: maxY + HOT_PIXEL_CM };
}

// ---- items --------------------------------------------------------------------------------------------------------

/**
 * Is the item live as named — a live vertex of that birth level; a live pair of that level that is its run's handle
 * pair; a live face record of that level?
 */
export function isItemLive(p: Plat, item: ItemRef): boolean {
  if (!isLevel(item.level)) return false;
  if (item.kind === ITEM_VERTEX) return isVertexLive(p, item.slot) && p.vertices.level[item.slot] === item.level;
  if (item.kind === ITEM_EDGE) {
    const h = 2 * item.slot;
    return isHalfEdgeLive(p, h) && p.halfEdges.level[item.slot] === item.level && routeHandlePair(p, h) === item.slot;
  }
  return isFaceLive(p, item.level, item.slot);
}

/** The item's box from the arena now (a vertex's point; a run's box; a face's box). The item must be live. */
export function itemBox(p: Plat, item: ItemRef): Box {
  check(isItemLive(p, item), `item ${item.kind}:${item.slot} is not live at L${item.level}`);
  if (item.kind === ITEM_VERTEX) {
    const x = p.vertices.x[item.slot];
    const y = p.vertices.y[item.slot];
    return { minX: x, minY: y, maxX: x, maxY: y };
  }
  if (item.kind === ITEM_EDGE) return runBox(p, routeRun(p, 2 * item.slot));
  return faceBox(p, item.level, item.slot);
}

/** Does `outer` contain `inner`? */
export function boxCovers(outer: Box, inner: Box): boolean {
  return outer.minX <= inner.minX && outer.minY <= inner.minY && outer.maxX >= inner.maxX && outer.maxY >= inner.maxY;
}

/** Do two closed boxes meet? */
export function boxesMeet(a: Box, b: Box): boolean {
  return a.minX <= b.maxX && b.minX <= a.maxX && a.minY <= b.maxY && b.minY <= a.maxY;
}

/** The home entry of an item's slot (§2.2 `Plat.indexHome`): the static partition whose build holds it, −1 if none. */
export function homeOf(p: Plat, item: ItemRef): number {
  if (item.kind === ITEM_VERTEX) return p.indexHome.vertex[item.slot];
  if (item.kind === ITEM_EDGE) return p.indexHome.edge[item.slot];
  return p.indexHome.face[item.level][item.slot];
}

/** Writes an item's home entry (the index's only writer of the column; the arena resets it when a slot is allocated). */
export function setHome(p: Plat, item: ItemRef, partition: number): void {
  if (item.kind === ITEM_VERTEX) setIndexHomeVertex(p, item.slot, partition);
  else if (item.kind === ITEM_EDGE) setIndexHomeEdge(p, item.slot, partition);
  else setIndexHomeFace(p, item.level, item.slot, partition);
}

/** Every live item of a level: its vertices, its route edges (each by its handle pair, once) and its face records. */
export function levelItems(p: Plat, level: Level): ItemRef[] {
  const out: ItemRef[] = [];
  const lv = p.vertices.level;
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (isVertexLive(p, v) && lv[v] === level) out.push({ kind: ITEM_VERTEX, level, slot: v });
  }
  const t = p.halfEdges;
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e) || t.level[e] !== level) continue;
    // A run is taken once, from the pair leaving its lower endpoint (an endpoint is of level ≤ the run's).
    for (const h of [2 * e, 2 * e + 1]) {
      if (lv[t.origin[h]] > level) continue;
      const run = routeRun(p, h);
      if (run.halfEdges[0] === h) out.push({ kind: ITEM_EDGE, level, slot: e });
    }
  }
  for (let f = 0; f < p.slots.face[level].top; f++) {
    if (isFaceLive(p, level, f)) out.push({ kind: ITEM_FACE, level, slot: f });
  }
  return out;
}
