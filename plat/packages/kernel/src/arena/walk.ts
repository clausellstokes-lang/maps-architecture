// The five levels as views (§2.2 rule 2, J-K1): the level-n subdivision is the set of edges of level ≤ n, and a face
// walk at level n follows `next` and, around each vertex, skips edges of level > n — O(degree). The views are functions
// of the levels alone, never of slots (§6.5 (3)), and so are the canonical keys below (§3.3's query keys), which order
// every list this module returns to a caller. M0-a-02.
import type { Level } from '../types/index.js';
import { check } from './debug.js';
import { faceHoles, isFaceLive, isHalfEdgeLive, isLevel, isVertexLive, type FaceId, type HalfEdgeId, type Plat, type VertexId } from './plat.js';

/**
 * The half-edge after `h` around the level-`level` face on its left: `next`, then — while that edge is finer than the
 * level — the next outgoing edge clockwise around the same vertex (next(twin(e)) is the outgoing edge after e,
 * clockwise). `h` itself must be of the level or coarser.
 */
export function nextAt(p: Plat, level: Level, h: HalfEdgeId): HalfEdgeId {
  const t = p.halfEdges;
  let g = t.next[h];
  let guard = 0;
  while (t.level[g >> 1] > level) {
    g = t.next[g ^ 1];
    check(++guard <= t.origin.length, `the rotation at half-edge ${h} does not close`);
  }
  return g;
}

/** The ring of the level-`level` face left of `h`: its half-edges from `h`, in walk order (the face on their left). */
export function walkRing(p: Plat, level: Level, h: HalfEdgeId): HalfEdgeId[] {
  check(isLevel(level), 'a level is 0 … 4');
  check(isHalfEdgeLive(p, h), `half-edge ${h} is not live`);
  check(p.halfEdges.level[h >> 1] <= level, `half-edge ${h} is finer than L${level}: it bounds no level-${level} face`);
  const ring: HalfEdgeId[] = [];
  let g = h;
  do {
    ring.push(g);
    check(ring.length <= p.halfEdges.origin.length, `the level-${level} walk from ${h} does not close`);
    g = nextAt(p, level, g);
  } while (g !== h);
  return ring;
}

/** The face's rings at its level: the outer ring first (counter-clockwise), then each hole ring, each from its stored half-edge. */
export function faceWalk(p: Plat, level: Level, face: FaceId): HalfEdgeId[][] {
  check(isLevel(level) && isFaceLive(p, level, face), `face ${face} is not live at L${level}`);
  const rings = [walkRing(p, level, p.faces[level].outer[face])];
  for (const h of faceHoles(p, level, face)) rings.push(walkRing(p, level, h));
  return rings;
}

/** The outgoing half-edges at `v`, clockwise from its `out` (every level). */
export function outgoing(p: Plat, v: VertexId): HalfEdgeId[] {
  check(isVertexLive(p, v), `vertex ${v} is not live`);
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

/** Two vertices by lattice position, y then x (§3.3's vertex key; one vertex per lattice point, §3.10). */
export function compareVertices(p: Plat, a: VertexId, b: VertexId): number {
  const t = p.vertices;
  if (t.y[a] !== t.y[b]) return t.y[a] < t.y[b] ? -1 : 1;
  if (t.x[a] !== t.x[b]) return t.x[a] < t.x[b] ? -1 : 1;
  return 0;
}

/**
 * A face's canonical key at its level (§3.3): the first two vertices of level ≤ n on its outer ring — the
 * lowest-leftmost such vertex and the next such vertex counter-clockwise, finer vertices skipped; where the ring visits
 * that vertex twice, the smaller of its two successors. One directed level-n route edge, which bounds exactly one
 * level-n face, so the key is total.
 */
export function faceKey(p: Plat, level: Level, face: FaceId): [VertexId, VertexId] {
  const ring = faceWalk(p, level, face)[0];
  const vs: VertexId[] = [];
  for (const h of ring) {
    const v = p.halfEdges.origin[h];
    if (p.vertices.level[v] <= level) vs.push(v);
  }
  check(vs.length >= 2, `face ${face} at L${level} has fewer than two vertices of its level`);
  let first = -1;
  let second = -1;
  for (let i = 0; i < vs.length; i++) {
    const v = vs[i];
    const succ = vs[(i + 1) % vs.length];
    const c = first === -1 ? -1 : compareVertices(p, v, first);
    if (c < 0 || (c === 0 && compareVertices(p, succ, second) < 0)) {
      first = v;
      second = succ;
    }
  }
  return [first, second];
}

/** Two faces of one level by canonical key. */
export function compareFaces(p: Plat, level: Level, a: FaceId, b: FaceId): number {
  if (a === b) return 0;
  const ka = faceKey(p, level, a);
  const kb = faceKey(p, level, b);
  return compareVertices(p, ka[0], kb[0]) || compareVertices(p, ka[1], kb[1]);
}
