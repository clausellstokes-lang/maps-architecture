// Queries (§3.3 *Queries*; §3.4's `pointLocate`; §3.11's "no input": a query whose box meets nothing returns an empty
// list). M0-a-03.
//
// A level-n query reads the static partitions of levels ≤ n and their grids, drops each static hit whose item key its
// partition has tombstoned, expands each route-edge hit into the pieces of its level-n route that meet the box, and
// returns the vertices of level ≤ n, each level-n route edge once (as its sub-edge leaving its lower endpoint) and the
// level-n faces, each list sorted by its kind's canonical key read on the level-n route: a vertex by (y, x); an edge by
// its level-n route edge's two endpoints, the lower first; a face by the first two vertices of level ≤ n on its outer
// ring (`faceKey`). In a mixed reading vertices come before edges and edges before faces. Every answer is filtered
// exactly against the live geometry of the level-n route — a vertex's point in the closed box, a piece's segment
// meeting it, a face's route rings meeting it — with exact integer predicates, so it never depends on a stored box,
// on which structure holds an item, on whether a finer level has been derived, or on a slot's number (C-0160).
import { searchPacked, type PackedTree } from '../adapters/flatbush.js';
import {
  compareVertices,
  debugAssertions,
  faceKey,
  isFaceLive,
  isLevel,
  sameKey,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type Stamp,
  type VertexId,
} from '../arena/index.js';
import { keyName } from '../arena/resolve.js';
import { BOX_RANGE, crossingStep } from '../num/exact.js';
import { orient2d } from '../num/index.js';
import type { LatticePoint, Level, PlatKey } from '../types/index.js';
import { gridCandidates } from './grid.js';
import {
  check,
  faceRouteRings,
  homeOf,
  isItemLive,
  ITEM_EDGE,
  ITEM_FACE,
  ITEM_VERTEX,
  keyKind,
  keySlot,
  routePieces,
  routeRun,
  type Box,
  type ItemKind,
  type RoutePiece,
} from './items.js';
import { indexOf, type SpatialIndex } from './spatial.js';

/** Which kinds a query returns (all three by default). */
export interface QueryKinds {
  readonly vertices?: boolean;
  readonly edges?: boolean;
  readonly faces?: boolean;
}

/** A query's answer, stamped with the arena's key and version: valid until its next commit (§3.4). */
export interface QueryResult extends Stamp {
  readonly level: Level;
  /** The vertices of level ≤ n in the box, by (y, x). */
  readonly vertices: VertexId[];
  /** Each level-n route edge meeting the box once, as its sub-edge leaving its lower endpoint, by its two endpoints. */
  readonly edges: HalfEdgeId[];
  /** The level-n face records meeting the box, by their face keys read on the level-n route. */
  readonly faces: FaceId[];
}

/** Where a lattice point lies in the level-n view (§3.4 `pointLocate`), stamped like a query. */
export type Location = Stamp & (
  /** On a vertex of level ≤ n. */
  | { readonly on: 'vertex'; readonly vertex: VertexId }
  /** On a level-n route edge (not at its ends): its sub-edge leaving its lower endpoint. */
  | { readonly on: 'edge'; readonly edge: HalfEdgeId }
  /**
   * Inside a face of the level-n view: the level-n record, or — where level n holds no record there — the coarser
   * record that is its own child at n (§2.2 rule 2), with that record's level.
   */
  | { readonly on: 'face'; readonly level: Level; readonly face: FaceId }
  /** Outside every face. */
  | { readonly on: 'none' }
);

const ALL: QueryKinds = Object.freeze({ vertices: true, edges: true, faces: true });

function debugCheck(condition: boolean, message: string): void {
  if (debugAssertions() && !condition) throw new Error(`index: ${message}`);
}

/**
 * The inline stamp of a query's answer: the arena's key and version only. It is not the arena's `stamp`
 * (`arena/resolve.ts`), which also writes a non-zero restore generation: a `QueryResult` and a `Location` keep their
 * shape after a savepoint is put back across committed batches, and the façade carries the generation in its side
 * table (C-0313 (1), (5)).
 */
function stamp(p: Plat): Stamp {
  return { key: { layer: p.key.layer, part: p.key.part }, version: p.version };
}

/** A query box: four whole centimetres within ±2²⁴ (`BOX_RANGE`), so every predicate below is exact in doubles. */
function checkBox(box: Box): void {
  const ok = (v: number): boolean => Number.isInteger(v) && Math.abs(v) <= BOX_RANGE;
  check(ok(box.minX) && ok(box.minY) && ok(box.maxX) && ok(box.maxY), 'a query box is four whole centimetres within ±2²⁴');
  check(box.minX <= box.maxX && box.minY <= box.maxY, 'a query box has min ≤ max');
}

// ---- exact predicates on lattice points and integer boxes -------------------------------------------------------------

/** Is the point in the closed box? */
export function pointInBox(x: number, y: number, box: Box): boolean {
  return x >= box.minX && x <= box.maxX && y >= box.minY && y <= box.maxY;
}

/**
 * Does the closed segment a–b meet the closed box? The separating axes of a segment and a box: the two box axes (the
 * boxes overlap) and the segment's normal (the four corners not all strictly on one side) — exact for lattice points
 * and integer boxes within ±2²⁴.
 */
export function segmentMeetsBox(ax: number, ay: number, bx: number, by: number, box: Box): boolean {
  if (Math.max(ax, bx) < box.minX || Math.min(ax, bx) > box.maxX || Math.max(ay, by) < box.minY || Math.min(ay, by) > box.maxY) return false;
  if (ax === bx && ay === by) return true;
  const s1 = Math.sign(orient2d(ax, ay, bx, by, box.minX, box.minY));
  const s2 = Math.sign(orient2d(ax, ay, bx, by, box.maxX, box.minY));
  const s3 = Math.sign(orient2d(ax, ay, bx, by, box.maxX, box.maxY));
  const s4 = Math.sign(orient2d(ax, ay, bx, by, box.minX, box.maxY));
  return !((s1 > 0 && s2 > 0 && s3 > 0 && s4 > 0) || (s1 < 0 && s2 < 0 && s3 < 0 && s4 < 0));
}

/** Does a closed ring of vertices (consecutive pairs, cyclic) meet the box along its boundary? */
function ringMeetsBox(p: Plat, ring: readonly VertexId[], box: Box): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    if (segmentMeetsBox(X[a], Y[a], X[b], Y[b], box)) return true;
  }
  return false;
}

/**
 * Is the point inside the ring (crossing number, exact)? Meaningful only for a point on none of its segments. Each edge
 * counts by num's one crossing rule, `crossingStep` (half-open in y; the side read by the edge's direction).
 */
function insideRing(p: Plat, ring: readonly VertexId[], qx: number, qy: number): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  let inside = false;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    if (crossingStep(X[a], Y[a], X[b], Y[b], qx, qy) !== 0) inside = !inside;
  }
  return inside;
}

/** Is the point strictly inside the face's level-n route rings (inside its outer ring, in no hole)? Off the rings only. */
function insideRouteRings(p: Plat, rings: readonly (readonly VertexId[])[], qx: number, qy: number): boolean {
  if (!insideRing(p, rings[0], qx, qy)) return false;
  for (let i = 1; i < rings.length; i++) if (insideRing(p, rings[i], qx, qy)) return false;
  return true;
}

/** Does the face record (of `level`), read on the level-n route, meet the closed box? */
export function faceMeetsBox(p: Plat, level: Level, f: FaceId, n: Level, box: Box): boolean {
  const rings = faceRouteRings(p, level, f, n);
  for (const r of rings) if (ringMeetsBox(p, r, box)) return true;
  // No boundary meets the box: it lies wholly inside the face or wholly outside it, as its corner does.
  return insideRouteRings(p, rings, box.minX, box.minY);
}

// ---- reading the structures --------------------------------------------------------------------------------------------

/**
 * Hands every item of level m whose stored box meets `box` to `visit` once: the untombstoned hits of the level's static
 * partitions, then its grid's. A debug build asserts what the protocol guarantees: a static hit's home entry names its
 * partition and its item is live at m (no stale copy escaped its tombstone), and no item answers from two structures.
 */
function collect(p: Plat, idx: SpatialIndex, m: Level, box: Box, visit: (kind: ItemKind, slot: number) => void): void {
  const L = idx.levels[m];
  const debug = debugAssertions();
  const seen = debug ? new Set<number>() : null;
  for (let i = 0; i < L.static.length; i++) {
    const part = L.static[i];
    if (part.tree === null) continue;
    const dead = L.tombstones[i];
    for (const id of searchHits(part.tree, box)) {
      const k = part.keys[id];
      if (dead.has(k)) continue;
      const kind = keyKind(k);
      const slot = keySlot(k);
      if (seen !== null) {
        const item = { kind, level: m, slot };
        debugCheck(homeOf(p, item) === part.id && isItemLive(p, item), `partition ${part.id} answers a stale item ${k} that no tombstone filters`);
        seen.add(k);
      }
      visit(kind, slot);
    }
  }
  for (const k of gridCandidates(L.dynamic, box)) {
    const kind = keyKind(k);
    const slot = keySlot(k);
    if (seen !== null) {
      debugCheck(!seen.has(k), `item ${k} answers from a static partition and the L${m} grid`);
      debugCheck(isItemLive(p, { kind, level: m, slot }), `the L${m} grid holds a dead item ${k}`);
    }
    visit(kind, slot);
  }
}

function searchHits(tree: PackedTree, box: Box): number[] {
  return searchPacked(tree, box.minX, box.minY, box.maxX, box.maxY);
}

/**
 * §3.3's query on arena `p` at `level` over the closed box (four whole centimetres): the vertices of level ≤ n, each
 * level-n route edge once and the level-n faces that meet it, each sorted by its canonical key read on the level-n
 * route (see `QueryResult`). The arena is handed in by the caller — the façade's key-only `query(key, level, box)`
 * maps the key to its arena (M0-a-16) — and in a debug build `key` must name it. A box that meets nothing gives [].
 */
export function query(p: Plat, key: PlatKey, level: Level, box: Box, kinds: QueryKinds = ALL): QueryResult {
  debugCheck(sameKey(key, p.key), `query on arena ${keyName(p.key)} was handed the key ${keyName(key)}`);
  check(isLevel(level), 'a query level is 0 … 4');
  checkBox(box);
  const idx = indexOf(p);
  const wantV = kinds.vertices === true;
  const wantE = kinds.edges === true;
  const wantF = kinds.faces === true;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const vertices = new Set<VertexId>();
  const pieces = new Map<HalfEdgeId, RoutePiece>();
  const faces = new Set<FaceId>();
  for (let m = 0; m <= level; m++) {
    const lm = m as Level;
    collect(p, idx, lm, box, (kind, slot) => {
      if (kind === ITEM_VERTEX) {
        if (wantV && pointInBox(X[slot], Y[slot], box)) vertices.add(slot);
      } else if (kind === ITEM_EDGE) {
        if (!wantE) return;
        for (const piece of routePieces(p, routeRun(p, 2 * slot), level)) {
          if (segmentMeetsBox(X[piece.a], Y[piece.a], X[piece.b], Y[piece.b], box)) pieces.set(piece.edge, piece);
        }
      } else if (kind === ITEM_FACE && wantF && lm === level && faceMeetsBox(p, lm, slot, level, box)) {
        faces.add(slot);
      }
    });
  }
  const vs = [...vertices].sort((a, b) => compareVertices(p, a, b));
  const ps = [...pieces.values()].sort((x, y) => compareVertices(p, x.a, y.a) || compareVertices(p, x.b, y.b));
  const keyed = [...faces].map((f) => ({ f, k: faceKey(p, level, f) }));
  keyed.sort((x, y) => compareVertices(p, x.k[0], y.k[0]) || compareVertices(p, x.k[1], y.k[1]));
  return { ...stamp(p), level, vertices: vs, edges: ps.map((x) => x.edge), faces: keyed.map((x) => x.f) };
}

/**
 * §3.4's `pointLocate(key, level, p)` on arena `p`: where the lattice point lies in the level-n view, over the index
 * and the face walk — on a vertex of level ≤ n, on a level-n route edge, inside a level-n face (or, where level n holds
 * no record, inside the coarser record that is its own child there), or outside every face.
 */
export function pointLocate(p: Plat, key: PlatKey, level: Level, at: LatticePoint): Location {
  check(Number.isInteger(at.x) && Number.isInteger(at.y), 'pointLocate takes a lattice point');
  const box: Box = { minX: at.x, minY: at.y, maxX: at.x, maxY: at.y };
  const q = query(p, key, level, box);
  const s = stamp(p);
  if (q.vertices.length > 0) return { ...s, on: 'vertex', vertex: q.vertices[0] };
  if (q.edges.length > 0) return { ...s, on: 'edge', edge: q.edges[0] };
  if (q.faces.length > 0) {
    debugCheck(q.faces.length === 1, `${q.faces.length} level-${level} faces contain one point`);
    return { ...s, on: 'face', level, face: q.faces[0] };
  }
  const idx = indexOf(p);
  for (let m = level - 1; m >= 0; m--) {
    const lm = m as Level;
    let found = -1;
    collect(p, idx, lm, box, (kind, slot) => {
      if (kind !== ITEM_FACE || found !== -1 || !isFaceLive(p, lm, slot)) return;
      if (insideRouteRings(p, faceRouteRings(p, lm, slot, level), at.x, at.y)) found = slot;
    });
    if (found !== -1) return { ...s, on: 'face', level: lm, face: found };
  }
  return { ...s, on: 'none' };
}
