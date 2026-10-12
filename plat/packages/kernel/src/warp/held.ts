// §3.6's held set (GEO-5 (c)) and the step's candidates: the vertices a warp may move — every vertex of level ≥
// `fromLevel` inside the region, and every finer vertex on a run one of those ends, which is re-seated with it — and the
// vertices it holds where the field is zero: (1) the vertices the locked or pinned entities' references resolve to and
// those of every finer face nested in their faces (the lock layer is M2a's: the list is injected); (2) unless
// `fromLevel` = 0, every `deck_end` and `gate_end` vertex; (3) every raised way's part-0 foot (`raised_foot`; declared —
// raised ways are M3a's); (4) in a smoothing step, every kernel-pinned vertex; (5) closed downwards by level — the two
// ends of every coarser run that carries a held finer vertex — which ends within four rounds. M0-a-13. Readings: C-0193.
import {
  compareKeys,
  compareVertices,
  faceWalk,
  isFaceLive,
  isVertexLive,
  outgoing,
  resolve,
  roleIdOf,
  rowsOn,
  VERTEX_PINNED,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { faceBox, faceRouteRings, query, routeRun } from '../index/index.js';
import { insideOrOnRing } from '../num/exact.js';
import { orient2d } from '../num/index.js';
import type { Id, Level, Point, PlatKey } from '../types/index.js';
import type { HeldSet, WarpOptions } from './types.js';
import { padBox } from './view.js';

/**
 * A structural precondition of the warp — a programming error, never a geometric outcome: it throws
 * `warp: <message>` in every build (§3.11). Each kernel module keeps its own check under its own prefix (C-0334).
 */
export function check(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(`warp: ${message}`);
}

/**
 * Is the lattice point inside the closed region ring (on its boundary counts), by even–odd crossings? num/exact.ts's
 * closed reading (C-0314 (3)); a region of fewer than three points holds nothing. Exact.
 */
export function insideRegion(region: readonly Point[], x: number, y: number): boolean {
  return region.length >= 3 && insideOrOnRing(region, x, y, 'evenOdd');
}

/** The vertices inside the region (any level), by lattice position. */
export function regionVertices(p: Plat, key: PlatKey, region: readonly Point[]): VertexId[] {
  if (region.length < 3) return [];
  for (const q of region) check(Number.isInteger(q.x) && Number.isInteger(q.y), 'a region is a ring of lattice points');
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const q of region) {
    minX = Math.min(minX, q.x);
    minY = Math.min(minY, q.y);
    maxX = Math.max(maxX, q.x);
    maxY = Math.max(maxY, q.y);
  }
  const X = p.vertices.x;
  const Y = p.vertices.y;
  return query(p, key, 4, padBox(minX, minY, maxX, maxY, 0), { vertices: true }).vertices.filter((v) => insideRegion(region, X[v], Y[v]));
}

/** The run a finer vertex lies inside (§2.2 rule 3: its two coarser edges), or null for a vertex of its edges' level. */
export interface RouteOf {
  /** The run's level. */
  readonly m: Level;
  /** The run's sub-edges from its lower end (§3.3). */
  readonly run: readonly HalfEdgeId[];
  readonly a: VertexId;
  readonly b: VertexId;
}

/** The run `v` lies inside, if `v` is finer than an incident edge. */
export function routeOf(p: Plat, v: VertexId): RouteOf | null {
  const lv = p.vertices.level[v];
  const T = p.halfEdges;
  for (const h of outgoing(p, v)) {
    if (T.level[h >> 1] < lv) {
      const run = routeRun(p, h).halfEdges;
      return { m: T.level[h >> 1] as Level, run, a: T.origin[run[0]], b: T.origin[run[run.length - 1] ^ 1] };
    }
  }
  return null;
}

/** The finer vertices inside the runs `v` ends (those it re-seats when it moves). */
export function runInteriors(p: Plat, v: VertexId): VertexId[] {
  const T = p.halfEdges;
  const lv = p.vertices.level[v];
  const out: VertexId[] = [];
  for (const h of outgoing(p, v)) {
    if (T.level[h >> 1] < lv) continue; // v lies inside this run; it is not one of its ends
    const run = routeRun(p, h).halfEdges;
    for (let i = 1; i < run.length; i++) out.push(T.origin[run[i]]);
  }
  return out;
}

/**
 * The step's candidates: the vertices of level ≥ `fromLevel` inside the region, then, closed, every finer vertex inside
 * a run one of them ends (a re-seat). Held vertices are not excluded here. By lattice position.
 */
export function candidates(p: Plat, key: PlatKey, fromLevel: Level, region: readonly Point[]): { inRegion: Set<VertexId>; all: VertexId[] } {
  const lv = p.vertices.level;
  const inRegion = new Set<VertexId>(regionVertices(p, key, region).filter((v) => lv[v] >= fromLevel));
  const all = new Set<VertexId>(inRegion);
  const queue = [...inRegion];
  while (queue.length > 0) {
    const v = queue.pop() as VertexId;
    for (const w of runInteriors(p, v)) {
      if (all.has(w) || lv[w] < fromLevel) continue;
      all.add(w);
      queue.push(w);
    }
  }
  return { inRegion, all: [...all].sort((a, b) => compareVertices(p, a, b)) };
}

/** Does the vertex carry a row of one of the role ids? */
function carries(p: Plat, v: VertexId, roles: readonly number[]): boolean {
  for (const r of rowsOn(p, 'vertex', v)) if (roles.includes(p.roles.kind[r])) return true;
  return false;
}

/** The vertices of every finer face nested in face f of level n, read on their own levels' routes. */
function nestedVertices(p: Plat, key: PlatKey, n: Level, f: FaceId, into: Set<VertexId>): void {
  const box = faceBox(p, n, f);
  const b = padBox(box.minX, box.minY, box.maxX, box.maxY, 1);
  for (let l = n + 1; l <= 4; l++) {
    const L = l as Level;
    for (const g of query(p, key, L, b, { faces: true }).faces) {
      let anc = g;
      for (let k = L; k > n && anc >= 0; k--) anc = p.faces[k].parent[anc];
      if (anc !== f) continue;
      for (const ring of faceRouteRings(p, L, g, L)) for (const v of ring) into.add(v);
    }
  }
}

/**
 * The finer vertices on a held face's own boundary that belong to its neighbour: those none of whose finer edges enters
 * the face (each finer edge's midpoint lies on the boundary's outer side, or on it). A nested finer face reaches them only
 * through the boundary they lie on, so they are not the face's to hold: they slide along its fixed route (§13.1's
 * neighbour's footprint corner on a locked plot's line; C-0193 (2)).
 */
function neighbourSteiners(p: Plat, level: Level, f: FaceId): Set<VertexId> {
  const out = new Set<VertexId>();
  const T = p.halfEdges;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  for (const ring of faceWalk(p, level, f)) {
    for (const h of ring) {
      const w = T.origin[h];
      if (p.vertices.level[w] <= level) continue;
      const a = w;
      const b = T.origin[h ^ 1];
      let enters = false;
      for (const g of outgoing(p, w)) {
        if (T.level[g >> 1] <= level) continue;
        const u = T.origin[g ^ 1];
        // Twice the midpoint, against the boundary's sub-edge leaving w (the face on its left): exact on lattice points.
        if (orient2d(2 * X[a], 2 * Y[a], 2 * X[b], 2 * Y[b], X[w] + X[u], Y[w] + Y[u]) > 0) enters = true;
      }
      if (!enters) out.add(w);
    }
  }
  return out;
}

/** §3.6's held set over the candidates (rules (1) – (5)); `fromLevel` is the batch's level. */
export function computeHeld(p: Plat, key: PlatKey, fromLevel: Level, cands: readonly VertexId[], opts: WarpOptions = {}): HeldSet & { set: Set<VertexId> } {
  const held = new Set<VertexId>();
  const entities = new Set<Id>();
  const T = p.halfEdges;
  // (1) The injected locked and pinned entities.
  for (const { entity, ref } of opts.held ?? []) {
    const r = resolve(p, ref, key);
    if (r.view === 'faces') {
      for (const f of r.faces) {
        if (!isFaceLive(p, r.level, f)) continue;
        for (const ring of faceRouteRings(p, r.level, f, r.level)) for (const v of ring) held.add(v);
        const nested = new Set<VertexId>();
        nestedVertices(p, key, r.level, f, nested);
        const outside = neighbourSteiners(p, r.level, f);
        for (const v of nested) if (!outside.has(v)) held.add(v);
      }
    } else if (r.view === 'edges') {
      for (const run of r.runs) {
        for (const h of run) {
          const m = T.level[h >> 1];
          for (const v of [T.origin[h], T.origin[h ^ 1]]) if (p.vertices.level[v] <= m) held.add(v);
        }
      }
    } else {
      for (const v of r.vertices) held.add(v);
    }
    const found = r.view === 'faces' ? r.faces.length : r.view === 'edges' ? r.runs.length : r.vertices.length;
    if (found > 0) entities.add(entity);
  }
  // (2) – (4) on the candidates.
  const crossing = [roleIdOf('deck_end'), roleIdOf('gate_end')];
  const feet = [roleIdOf('raised_foot')];
  for (const v of cands) {
    if (fromLevel !== 0 && carries(p, v, crossing)) held.add(v);
    if (carries(p, v, feet)) held.add(v);
    if (opts.smoothing === true && (p.vertices.flags[v] & VERTEX_PINNED) !== 0) held.add(v);
  }
  // (5) Closed downwards by level: each round adds the ends of the coarser runs carrying a held finer vertex.
  let frontier = [...held];
  for (let round = 0; frontier.length > 0; round++) {
    check(round <= 4, 'the held set\'s downward closure ends within four rounds (§3.6 (5))');
    const next: VertexId[] = [];
    for (const v of frontier) {
      if (!isVertexLive(p, v)) continue;
      const r = routeOf(p, v);
      if (r === null) continue;
      for (const w of [r.a, r.b]) {
        if (!held.has(w)) {
          held.add(w);
          next.push(w);
        }
      }
    }
    frontier = next;
  }
  const vertices = [...held].sort((a, b) => compareVertices(p, a, b));
  return { vertices, entities: [...entities].sort(compareKeys), set: held };
}
