// Test support for M0-a-04's insertion steps 1–2 (snap and decimate, vertex attraction, the placement rule,
// splitThrough, the chain classes). Hand-built arenas come from M0-a-02's support (rotations by exact angle, faces
// materialised level by level) with M0-a-03's index attached. The independent references the tests judge with — exact
// BigInt distances and crossings, the arena validator for §3.10's rows these writers must keep, an arena fingerprint —
// are written here from the design's definitions, never with the code under test.
import { faceWalk, isFaceLive, isHalfEdgeLive, isVertexLive, LEVELS, outgoing, type Plat, type VertexId } from '../../../src/arena/index.js';
import { attachIndex, checkIndexState } from '../../../src/index/index.js';
import type { Level } from '../../../src/types/index.js';
import { buildArena, pt, ringPoints, type ArenaSpec, type Built } from '../../arena/support.js';

export { buildArena, dressQuarters, FRAME, GROUND, permutation, pt, QUARTERS, type ArenaSpec, type Built } from '../../arena/support.js';

/** The grid cells the tests attach the index with (cm per level), as M0-a-03's tests do. */
export const CELLS: [number, number, number, number, number] = [800, 400, 200, 100, 50];

/** The hard timeout of a property at PLAT_FUZZ_RUNS (10⁶ nightly, C-0057) on the shared machine; never a timing. */
export const TIMEOUT = 600_000;

/**
 * The L0 frame ±5 000 cm with an L1 line from (−3 750, −5 000) through (0, 0) and (30, 40) to (3 750, 5 000) — its edge
 * (0, 0)–(30, 40) 50 cm long (spec edge 7). The point (23, 14) stands 10 cm off that edge and √725 ≈ 26.9 cm from both
 * its ends (no vertex candidate); its foot (15, 20) lies 25 cm from each end — the endpoint rule's tie, which §3.6 step 2
 * decides y then x: onto (0, 0) (spec vertex 5).
 */
export const SLANT: ArenaSpec = {
  vertices: [
    [-5000, -5000, 0], [5000, -5000, 0], [5000, 5000, 0], [-5000, 5000, 0], // 0 – 3
    [-3750, -5000, 1], [0, 0, 1], [30, 40, 1], [3750, 5000, 1], // 4 – 7
  ],
  edges: [
    [0, 4, 0], [4, 1, 0], [1, 2, 0], [2, 7, 0], [7, 3, 0], [3, 0, 0],
    [4, 5, 1], [5, 6, 1], [6, 7, 1],
  ],
};

/** A hand-built arena with the spatial index attached. */
export function indexed(spec: ArenaSpec, order: { vertices?: readonly number[]; edges?: readonly number[] } = {}): Built {
  const b = buildArena(spec, order);
  attachIndex(b.plat, { gridCellCm: CELLS });
  return b;
}

/** mulberry32: a seeded generator in [0, 1). */
export function generator(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A uniform integer in [lo, hi]. */
export const intIn = (rnd: () => number, lo: number, hi: number): number => lo + Math.floor(rnd() * (hi - lo + 1));

// ---- exact references (BigInt) ---------------------------------------------------------------------------------------

const B = (v: number): bigint => BigInt(v);

/** orient2d by BigInt: exact for any integers. */
export function orientBig(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): bigint {
  return (B(bx) - B(ax)) * (B(cy) - B(ay)) - (B(by) - B(ay)) * (B(cx) - B(ax));
}

/** Is the lattice point p strictly closer than r (an integer) to the closed lattice segment a–b? Exact. */
export function closerThan(px: number, py: number, ax: number, ay: number, bx: number, by: number, r: number): boolean {
  const dx = B(bx) - B(ax);
  const dy = B(by) - B(ay);
  const l2 = dx * dx + dy * dy;
  const dot = (B(px) - B(ax)) * dx + (B(py) - B(ay)) * dy;
  const r2 = B(r) * B(r);
  const d2 = (x: number, y: number): bigint => (B(px) - B(x)) ** 2n + (B(py) - B(y)) ** 2n;
  if (l2 === 0n || dot <= 0n) return d2(ax, ay) < r2;
  if (dot >= l2) return d2(bx, by) < r2;
  const o = orientBig(ax, ay, bx, by, px, py);
  return o * o < r2 * l2;
}

/** The distance from a point (doubles) to the closed segment a–b (doubles): a plain reference for reporting bounds. */
export function segmentDistance(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  let t = l2 === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Do the closed lattice segments a–b and c–d share a point? Exact (BigInt). */
export function segmentsShare(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number): boolean {
  const s = (v: bigint): number => (v > 0n ? 1 : v < 0n ? -1 : 0);
  const o1 = s(orientBig(ax, ay, bx, by, cx, cy));
  const o2 = s(orientBig(ax, ay, bx, by, dx, dy));
  const o3 = s(orientBig(cx, cy, dx, dy, ax, ay));
  const o4 = s(orientBig(cx, cy, dx, dy, bx, by));
  if (o1 * o2 < 0 && o3 * o4 < 0) return true;
  const on = (x0: number, y0: number, x1: number, y1: number, x: number, y: number): boolean =>
    Math.min(x0, x1) <= x && x <= Math.max(x0, x1) && Math.min(y0, y1) <= y && y <= Math.max(y0, y1);
  return (o1 === 0 && on(ax, ay, bx, by, cx, cy)) || (o2 === 0 && on(ax, ay, bx, by, dx, dy))
    || (o3 === 0 && on(cx, cy, dx, dy, ax, ay)) || (o4 === 0 && on(cx, cy, dx, dy, bx, by));
}

// ---- the arena validator -----------------------------------------------------------------------------------------------

/** The live edge pairs as [a, b, level] (a = origin of the even half-edge). */
export function liveEdges(p: Plat): [VertexId, VertexId, number][] {
  const out: [VertexId, VertexId, number][] = [];
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    out.push([p.halfEdges.origin[2 * e], p.halfEdges.origin[2 * e + 1], p.halfEdges.level[e]]);
  }
  return out;
}

/** The live vertices. */
export function liveVertices(p: Plat): VertexId[] {
  const out: VertexId[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v)) out.push(v);
  return out;
}

/** The neighbours of a vertex (every level). */
export function neighboursOf(p: Plat, v: VertexId): VertexId[] {
  return outgoing(p, v).map((h) => p.halfEdges.origin[h ^ 1]);
}

/**
 * §3.10's rows the step-1–2 writers keep, read on the whole arena: the half-edge links; no edge shorter than minEdge;
 * one vertex per lattice point; no two edges crossing or touching but at a shared endpoint; clearance (every vertex at
 * least minEdge from every edge outside its one-ring); level consistency (a vertex finer than an incident edge has
 * exactly two coarser edges, of one level); every face record walks and its outer ring is counter-clockwise; the index
 * against the arena (M0-a-03's `checkIndexState`). Returns the problems found.
 */
export function problems(p: Plat): string[] {
  const out: string[] = [];
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const T = p.halfEdges;
  for (let h = 0; h < 2 * p.slots.pair.top; h++) {
    if (!isHalfEdgeLive(p, h)) continue;
    if (T.prev[T.next[h]] !== h || T.next[T.prev[h]] !== h) out.push(`half-edge ${h}: next / prev disagree`);
    if (T.origin[T.next[h]] !== T.origin[h ^ 1]) out.push(`half-edge ${h}: next does not start where it ends`);
  }
  const vs = liveVertices(p);
  const seen = new Map<string, VertexId>();
  for (const v of vs) {
    const k = `${X[v]},${Y[v]}`;
    if (seen.has(k)) out.push(`two vertices at ${k}`);
    seen.set(k, v);
    const o = p.vertices.out[v];
    if (o !== -1 && T.origin[o] !== v) out.push(`vertex ${v}: its out half-edge leaves another vertex`);
  }
  const es = liveEdges(p);
  for (const [a, b] of es) {
    const d2 = (X[a] - X[b]) ** 2 + (Y[a] - Y[b]) ** 2;
    if (d2 < 625) out.push(`edge (${X[a]}, ${Y[a]})–(${X[b]}, ${Y[b]}) is shorter than minEdge`);
  }
  for (let i = 0; i < es.length; i++) {
    for (let j = i + 1; j < es.length; j++) {
      const [a, b] = es[i];
      const [c, d] = es[j];
      const shared = [a, b].filter((x) => x === c || x === d);
      if (shared.length === 2) {
        out.push(`two edges join (${X[a]}, ${Y[a]}) and (${X[b]}, ${Y[b]})`);
        continue;
      }
      if (shared.length === 1) {
        // Two edges at one vertex meet only there: no collinear overlap.
        const s = shared[0];
        const u = a === s ? b : a;
        const w = c === s ? d : c;
        if (orientBig(X[s], Y[s], X[u], Y[u], X[w], Y[w]) === 0n && (X[u] - X[s]) * (X[w] - X[s]) + (Y[u] - Y[s]) * (Y[w] - Y[s]) > 0) {
          out.push(`edges at (${X[s]}, ${Y[s]}) overlap`);
        }
        continue;
      }
      if (segmentsShare(X[a], Y[a], X[b], Y[b], X[c], Y[c], X[d], Y[d])) {
        out.push(`edges (${X[a]}, ${Y[a]})–(${X[b]}, ${Y[b]}) and (${X[c]}, ${Y[c]})–(${X[d]}, ${Y[d]}) cross`);
      }
    }
  }
  for (const w of vs) {
    const ring = new Set<VertexId>([w, ...neighboursOf(p, w)]);
    for (const [a, b] of es) {
      if (ring.has(a) || ring.has(b)) continue;
      if (closerThan(X[w], Y[w], X[a], Y[a], X[b], Y[b], 25)) {
        out.push(`vertex (${X[w]}, ${Y[w]}) stands within minEdge of edge (${X[a]}, ${Y[a]})–(${X[b]}, ${Y[b]})`);
      }
    }
    const levels = outgoing(p, w).map((h) => T.level[h >> 1]);
    if (levels.length > 0) {
      const coarser = levels.filter((l) => l < p.vertices.level[w]);
      if (coarser.length > 0 && (coarser.length !== 2 || coarser[0] !== coarser[1])) {
        out.push(`vertex (${X[w]}, ${Y[w]}) of L${p.vertices.level[w]} lies on coarser edges of levels ${coarser.join(', ')}`);
      }
      if (Math.min(...levels) > p.vertices.level[w] && p.roles.vertexFirst[w] === -1) {
        out.push(`vertex (${X[w]}, ${Y[w]}) is coarser than every edge and role at it`);
      }
    }
  }
  for (const level of LEVELS) {
    for (let f = 0; f < p.slots.face[level].top; f++) {
      if (!isFaceLive(p, level, f)) continue;
      try {
        const rings = faceWalk(p, level, f);
        const pts = ringPoints(p, rings[0]);
        let s = 0n;
        for (let i = 0; i < pts.length; i++) {
          const a = pts[i];
          const b = pts[(i + 1) % pts.length];
          s += B(a.x) * B(b.y) - B(b.x) * B(a.y);
        }
        if (s <= 0n) out.push(`L${level} face ${f}'s outer ring is not counter-clockwise`);
      } catch (e) {
        out.push(`L${level} face ${f} does not walk: ${String(e)}`);
      }
    }
  }
  if (p.index !== undefined) out.push(...checkIndexState(p));
  return out;
}

/**
 * A fingerprint of everything an op may write: every arena table up to its high-water mark, the slot counters, the
 * version, the handles, and the index's grid entries, partition shares and tombstone sets. Two equal fingerprints mean
 * the op wrote nothing.
 */
export function fingerprint(p: Plat): string {
  const parts: string[] = [];
  const take = (name: string, a: ArrayLike<number>, n: number): void => {
    const xs: number[] = [];
    for (let i = 0; i < n; i++) xs.push(a[i]);
    parts.push(`${name}:${xs.join(',')}`);
  };
  const nv = p.slots.vertex.top;
  const np = p.slots.pair.top;
  const nr = p.slots.role.top;
  take('vx', p.vertices.x, nv);
  take('vy', p.vertices.y, nv);
  take('vout', p.vertices.out, nv);
  take('vlevel', p.vertices.level, nv);
  take('vflags', p.vertices.flags, nv);
  take('ho', p.halfEdges.origin, 2 * np);
  take('hn', p.halfEdges.next, 2 * np);
  take('hp', p.halfEdges.prev, 2 * np);
  take('hl', p.halfEdges.level, np);
  take('rk', p.roles.kind, nr);
  take('re', p.roles.entity, nr);
  take('rl', p.roles.level, nr);
  take('ro', p.roles.ordinal, nr);
  take('rs', p.roles.nextInSet, nr);
  take('rq', p.roles.nextSameKey, nr);
  take('ref', p.roles.edgeFirst, np);
  take('rvf', p.roles.vertexFirst, nv);
  for (const level of LEVELS) {
    const f = p.faces[level];
    const n = p.slots.face[level].top;
    take(`f${level}o`, f.outer, n);
    take(`f${level}k`, f.kind, n);
    take(`f${level}w`, f.owner, n);
    take(`f${level}p`, f.parent, n);
    take(`f${level}h`, f.holesStart, n);
    take(`ih${level}`, p.indexHome.face[level], n);
  }
  take('ihv', p.indexHome.vertex, nv);
  take('ihe', p.indexHome.edge, np);
  parts.push(`slots:${JSON.stringify(p.slots)} v${p.version} handles:${p.handles.count}`);
  if (p.index !== undefined) {
    for (const level of LEVELS) {
      const L = p.index.levels[level];
      parts.push(`grid${level}:${[...L.dynamic.entries.keys()].sort((a, b) => a - b).join(',')}`);
      parts.push(`tomb${level}:${L.tombstones.map((t) => [...t].sort((a, b) => a - b).join('.')).join('|')}`);
    }
    parts.push(`pending:${p.index.partitions.map((q) => [...q.pending].sort((a, b) => a - b).join('.')).join('|')}`);
  }
  return parts.join('\n');
}

// ---- random arenas: a frame with non-crossing L1 chords ------------------------------------------------------------------

/** The frame's side (cm): the arenas below span [0, W]². */
export const W = 4000;

interface Seg {
  a: number;
  b: number;
  level: Level;
}

/**
 * A random valid arena spec (or null after too many rejections): the L0 frame square [0, W]², and 1 – 3 L1 chords from
 * one side to another, each with 0 – 2 interior bends (an acute corner sometimes), the chords neither crossing nor
 * touching, every edge at least 30 cm, every vertex at least minEdge from every edge outside its one-ring.
 */
export function chordSpec(rnd: () => number): ArenaSpec | null {
  for (let attempt = 0; attempt < 50; attempt++) {
    const verts: [number, number, Level][] = [[0, 0, 0], [W, 0, 0], [W, W, 0], [0, W, 0]];
    const onSide: number[][] = [[], [], [], []]; // vertex indices on each side (bottom, right, top, left)
    const chords: number[][] = [];
    const k = intIn(rnd, 1, 3);
    const sidePoint = (side: number): [number, number] => {
      const t = intIn(rnd, 80, W - 80);
      return side === 0 ? [t, 0] : side === 1 ? [W, t] : side === 2 ? [t, W] : [0, t];
    };
    for (let c = 0; c < k; c++) {
      const s0 = intIn(rnd, 0, 3);
      let s1 = intIn(rnd, 0, 3);
      if (s1 === s0) s1 = (s0 + 2) % 4;
      const [x0, y0] = sidePoint(s0);
      const [x1, y1] = sidePoint(s1);
      const chain: number[] = [verts.length];
      verts.push([x0, y0, 1]);
      onSide[s0].push(chain[0]);
      const bends = intIn(rnd, 0, 2);
      for (let i = 1; i <= bends; i++) {
        const t = i / (bends + 1);
        const bx = Math.round(x0 + t * (x1 - x0) + intIn(rnd, -600, 600));
        const by = Math.round(y0 + t * (y1 - y0) + intIn(rnd, -600, 600));
        if (bx < 80 || bx > W - 80 || by < 80 || by > W - 80) continue;
        chain.push(verts.length);
        verts.push([bx, by, 1]);
      }
      chain.push(verts.length);
      verts.push([x1, y1, 1]);
      onSide[s1].push(chain[chain.length - 1]);
      chords.push(chain);
    }
    const segs: Seg[] = [];
    const corners = [[0, 1], [1, 2], [2, 3], [3, 0]];
    for (let s = 0; s < 4; s++) {
      const [c0, c1] = corners[s];
      const along = (v: number): number => (s === 0 || s === 2 ? verts[v][0] : verts[v][1]);
      const list = [...onSide[s]].sort((u, w) => along(u) - along(w));
      if (s === 2 || s === 3) list.reverse(); // sides run counter-clockwise from c0 to c1
      const path = [c0, ...list, c1];
      for (let i = 0; i + 1 < path.length; i++) segs.push({ a: path[i], b: path[i + 1], level: 0 });
    }
    for (const chain of chords) for (let i = 0; i + 1 < chain.length; i++) segs.push({ a: chain[i], b: chain[i + 1], level: 1 });
    if (valid(verts, segs)) return { vertices: verts, edges: segs.map((s) => [s.a, s.b, s.level] as const) };
  }
  return null;
}

function valid(verts: [number, number, Level][], segs: Seg[]): boolean {
  const X = (v: number): number => verts[v][0];
  const Y = (v: number): number => verts[v][1];
  const keys = new Set<string>();
  for (const [x, y] of verts) {
    if (keys.has(`${x},${y}`)) return false;
    keys.add(`${x},${y}`);
  }
  for (const s of segs) if ((X(s.a) - X(s.b)) ** 2 + (Y(s.a) - Y(s.b)) ** 2 < 900) return false;
  for (let i = 0; i < segs.length; i++) {
    for (let j = i + 1; j < segs.length; j++) {
      const s = segs[i];
      const t = segs[j];
      const shared = [s.a, s.b].filter((x) => x === t.a || x === t.b);
      if (shared.length === 2) return false;
      if (shared.length === 1) {
        const c = shared[0];
        const u = s.a === c ? s.b : s.a;
        const w = t.a === c ? t.b : t.a;
        if (orientBig(X(c), Y(c), X(u), Y(u), X(w), Y(w)) === 0n && (X(u) - X(c)) * (X(w) - X(c)) + (Y(u) - Y(c)) * (Y(w) - Y(c)) > 0) return false;
        continue;
      }
      if (segmentsShare(X(s.a), Y(s.a), X(s.b), Y(s.b), X(t.a), Y(t.a), X(t.b), Y(t.b))) return false;
    }
  }
  for (let v = 0; v < verts.length; v++) {
    const ring = new Set<number>([v]);
    for (const s of segs) {
      if (s.a === v) ring.add(s.b);
      if (s.b === v) ring.add(s.a);
    }
    for (const s of segs) {
      if (ring.has(s.a) || ring.has(s.b)) continue;
      if (closerThan(X(v), Y(v), X(s.a), Y(s.a), X(s.b), Y(s.b), 25)) return false;
    }
  }
  return true;
}

/** A random valid chord arena with the index attached (retrying seeds until one is valid). */
export function chordArena(seed: number): { built: Built; rnd: () => number } {
  const rnd = generator(seed);
  for (;;) {
    const spec = chordSpec(rnd);
    if (spec !== null) return { built: indexed(spec), rnd };
  }
}

export { pt as lattice };

/** Every live vertex's position, as text (for placing a point on no vertex). */
export function occupied(p: Plat): Set<string> {
  return new Set(liveVertices(p).map((v) => `${p.vertices.x[v]},${p.vertices.y[v]}`));
}

/** The levels, as a list (re-exported for the tests). */
export const ALL_LEVELS: readonly Level[] = LEVELS;
