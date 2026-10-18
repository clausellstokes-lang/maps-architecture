// Test support for M0-a-02's arena tests: hand-built arenas. `buildArena` allocates the vertices and edge pairs a spec
// lists (in any allocation order, so a test can show an output does not depend on slots), links each vertex's
// rotation by exact angle (quadrant, then orient2d — the load's rule, §3.9, written here from its definition), and
// materialises the face records of every level from the level walks, nesting each face under the level − 1 face that
// contains it and pruning a face that is its parent's own child (the same rings, no finer record inside: §2.2 rule 2,
// C-0146 (2)). The independent oracles the tests judge the walk with — the arena filtered to the edges of level ≤ n,
// exact areas, a crossing-number containment test — are written here too, never with the code under test. It is also
// the home of the kernel tests' one seeded generator (`rng`, mulberry32, and `intIn`), which the other folders' support
// files are to import from here in their own rounds (T-support-1); until then their copies are pinned to draw the same
// words (support.test.ts).
import { area2, orient2d, type Frame } from '../../src/num/index.js';
import type { Cm, LatticePoint, Level, PlatKey } from '../../src/types/index.js';
import {
  addRole,
  allocEdgePair,
  allocFace,
  allocVertex,
  createPlat,
  faceWalk,
  isHalfEdgeLive,
  setFaceHoles,
  walkRing,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type PlatCapacity,
  type VertexId,
} from '../../src/arena/index.js';
import './tiny.js'; // PLAT_TINY_TABLES=1: every table of every arena built here starts at capacity 1 (C-0286)

export const GROUND: PlatKey = { layer: 'ground', part: 0 };
export const FRAME: Frame = { widthCm: 2_000_00 as Cm, heightCm: 2_000_00 as Cm, aspect: 1, marginShare: 0.3 };

/** A lattice point from integers the test already holds in range. */
export const pt = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });

/** A hand-built arena: vertices [x, y, level, flags?], edges [a, b, level] by vertex index. */
export interface ArenaSpec {
  vertices: readonly (readonly [number, number, Level, number?])[];
  edges: readonly (readonly [number, number, Level])[];
}

export interface Built {
  plat: Plat;
  /** Per spec vertex: its slot. */
  v: VertexId[];
  /** Per spec edge: the half-edge from its first vertex to its second. */
  he: HalfEdgeId[];
  /** Per level: the face records materialised, in allocation order. */
  faces: FaceId[][];
}

/**
 * mulberry32 (Tommy Ettinger's published 32-bit generator): a seeded generator of doubles in [0, 1) — the kernel tests'
 * one seeded generator. Its words are the constant 0x6d2b79f5 and `>>> 0` arithmetic, so a seed gives the same
 * sequence on every host; `support.test.ts` pins the first draws of fixed seeds.
 */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A uniform integer in [lo, hi] from a generator's next draw. */
export const intIn = (rnd: () => number, lo: number, hi: number): number => lo + Math.floor(rnd() * (hi - lo + 1));

/** A permutation of 0 … n − 1 from a seed (`rng`; a Fisher–Yates shuffle from the top), for allocation orders. */
export function permutation(n: number, seed: number): number[] {
  const next = rng(seed);
  const p = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  return p;
}

function quadrant(dx: number, dy: number): number {
  if (dx > 0 && dy >= 0) return 0;
  if (dx <= 0 && dy > 0) return 1;
  if (dx < 0 && dy <= 0) return 2;
  return 3;
}

/** Links next / prev / out around every vertex by exact angle: next(twin(eᵢ)) = eᵢ₋₁ in counter-clockwise order. */
export function linkByAngle(p: Plat): void {
  const t = p.halfEdges;
  const byVertex = new Map<VertexId, HalfEdgeId[]>();
  for (let h = 0; h < 2 * p.slots.pair.top; h++) {
    if (!isHalfEdgeLive(p, h)) continue;
    const v = t.origin[h];
    const list = byVertex.get(v) ?? [];
    list.push(h);
    byVertex.set(v, list);
  }
  const X = p.vertices.x;
  const Y = p.vertices.y;
  for (const [v, list] of byVertex) {
    const d = (h: HalfEdgeId): [number, number] => [X[t.origin[h ^ 1]] - X[v], Y[t.origin[h ^ 1]] - Y[v]];
    list.sort((a, b) => {
      const [ax, ay] = d(a);
      const [bx, by] = d(b);
      const q = quadrant(ax, ay) - quadrant(bx, by);
      if (q !== 0) return q;
      return -Math.sign(orient2d(0, 0, ax, ay, bx, by));
    });
    const k = list.length;
    for (let i = 0; i < k; i++) {
      const e = list[i];
      const before = list[(i - 1 + k) % k];
      t.next[e ^ 1] = before;
      t.prev[before] = e ^ 1;
    }
    p.vertices.out[v] = list[0];
  }
}

/** The lattice points of a ring's origins. */
export function ringPoints(p: Plat, ring: readonly HalfEdgeId[]): LatticePoint[] {
  return ring.map((h) => pt(p.vertices.x[p.halfEdges.origin[h]], p.vertices.y[p.halfEdges.origin[h]]));
}

/** Twice the signed area of a ring of half-edges (exact; a retraced antenna adds none). */
export function ringArea2(p: Plat, ring: readonly HalfEdgeId[]): number {
  return area2(ringPoints(p, ring));
}

/** Strictly inside a ring of points (crossing number with exact integer tests; a point on the ring is not inside). */
export function strictlyInside(ring: readonly LatticePoint[], q: LatticePoint): boolean {
  let inside = false;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    const o = orient2d(a.x, a.y, b.x, b.y, q.x, q.y);
    const onSegment = o === 0 && Math.min(a.x, b.x) <= q.x && q.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= q.y && q.y <= Math.max(a.y, b.y);
    if (onSegment) return false;
    if ((a.y > q.y) !== (b.y > q.y)) {
      // The edge crosses the horizontal through q: count it when the crossing lies right of q.
      const right = b.y > a.y ? o > 0 : o < 0;
      if (right) inside = !inside;
    }
  }
  return inside;
}

/** Every level-`level` cycle of the arena: each half-edge of level ≤ level in exactly one. */
export function levelCycles(p: Plat, level: Level): HalfEdgeId[][] {
  const seen = new Set<HalfEdgeId>();
  const out: HalfEdgeId[][] = [];
  for (let h = 0; h < 2 * p.slots.pair.top; h++) {
    if (!isHalfEdgeLive(p, h) || p.halfEdges.level[h >> 1] > level || seen.has(h)) continue;
    const ring = walkRing(p, level, h);
    for (const g of ring) seen.add(g);
    out.push(ring);
  }
  return out;
}

interface Proto {
  outer: HalfEdgeId[];
  holes: HalfEdgeId[][];
  area: number;
  parent: number;
}

const sameSet = (a: readonly number[], b: readonly number[]): boolean => {
  if (a.length !== b.length) return false;
  const s = new Set(a);
  return b.every((x) => s.has(x));
};

/** The faces of one level from its cycles: counter-clockwise cycles are outer rings; every other cycle is the hole of the smallest face strictly around it, or the unbounded boundary. */
function levelProtos(p: Plat, level: Level): Proto[] {
  const cycles = levelCycles(p, level);
  const faces: Proto[] = [];
  const others: HalfEdgeId[][] = [];
  for (const c of cycles) {
    const a = ringArea2(p, c);
    if (a > 0) faces.push({ outer: c, holes: [], area: a, parent: -1 });
    else others.push(c);
  }
  for (const c of others) {
    const q = ringPoints(p, c)[0];
    let best = -1;
    for (let i = 0; i < faces.length; i++) {
      if (strictlyInside(ringPoints(p, faces[i].outer), q) && (best === -1 || faces[i].area < faces[best].area)) best = i;
    }
    if (best !== -1) faces[best].holes.push(c);
  }
  return faces;
}

function insideFace(p: Plat, f: Proto, q: LatticePoint): boolean {
  return strictlyInside(ringPoints(p, f.outer), q) && f.holes.every((h) => !strictlyInside(ringPoints(p, h), q));
}

/** Materialises every level's face records (see the module comment). */
export function materialiseFaces(p: Plat): FaceId[][] {
  const levels: Proto[][] = [0, 1, 2, 3, 4].map((l) => levelProtos(p, l as Level));
  for (let l = 1; l <= 4; l++) {
    const coarser = levels[l - 1];
    for (const g of levels[l]) {
      const coarse = g.outer.find((h) => p.halfEdges.level[h >> 1] <= l - 1);
      if (coarse !== undefined) {
        g.parent = coarser.findIndex((f) => f.outer.includes(coarse) || f.holes.some((r) => r.includes(coarse)));
      } else {
        const q = ringPoints(p, g.outer)[0];
        let best = -1;
        for (let i = 0; i < coarser.length; i++) {
          if (insideFace(p, coarser[i], q) && (best === -1 || coarser[i].area < coarser[best].area)) best = i;
        }
        g.parent = best;
      }
      if (g.parent === -1) throw new Error(`support: an L${l} face has no parent`);
    }
  }
  // Prune own children, finest level first: a face with its parent's rings and no child record.
  const keep: boolean[][] = levels.map((fs) => fs.map(() => true));
  for (let l = 4; l >= 1; l--) {
    levels[l].forEach((g, i) => {
      const hasChild = l < 4 && levels[l + 1].some((c, j) => keep[l + 1][j] && c.parent === i);
      const f = levels[l - 1][g.parent];
      const same = sameSet(g.outer, f.outer) && g.holes.length === f.holes.length && g.holes.every((h) => f.holes.some((k) => sameSet(h, k)));
      if (same && !hasChild) keep[l][i] = false;
    });
  }
  const ids: FaceId[][] = [];
  for (let l = 0; l <= 4; l++) {
    // map[protoIndex] = the face slot; a pruned proto leaves a gap
    const map: number[] = [];
    levels[l].forEach((g, i) => {
      if (!keep[l][i]) return;
      const parent = l === 0 ? -1 : ids[l - 1][g.parent];
      const f = allocFace(p, l as Level, { outer: g.outer[0], kind: 1, owner: -1, stage: 0, parent });
      if (g.holes.length > 0) setFaceHoles(p, l as Level, f, g.holes.map((h) => h[0]));
      map[i] = f;
    });
    ids.push(map);
  }
  return ids.map((m) => m.filter((x) => x !== undefined));
}

/**
 * Builds a hand-built arena: allocation in the given orders, rotations by angle, faces materialised. Under
 * PLAT_TINY_TABLES=1 every table starts at capacity 1 whatever `capacity` asks (./tiny.ts; C-0286).
 */
export function buildArena(spec: ArenaSpec, order: { vertices?: readonly number[]; edges?: readonly number[] } = {}, capacity: Partial<PlatCapacity> = {}): Built {
  const plat = createPlat(GROUND, FRAME, capacity);
  const v: VertexId[] = new Array<number>(spec.vertices.length);
  for (const i of order.vertices ?? spec.vertices.map((_, k) => k)) {
    const [x, y, level, flags] = spec.vertices[i];
    v[i] = allocVertex(plat, pt(x, y), level, flags ?? 0);
  }
  const he: HalfEdgeId[] = new Array<number>(spec.edges.length);
  for (const i of order.edges ?? spec.edges.map((_, k) => k)) {
    const [a, b, level] = spec.edges[i];
    he[i] = allocEdgePair(plat, v[a], v[b], level);
  }
  linkByAngle(plat);
  const faces = materialiseFaces(plat);
  return { plat, v, he, faces };
}

/** The arena filtered to the spec edges of level ≤ n, every level-≤ n edge at level 0 so no walk skips: the level-n oracle. */
export function filtered(spec: ArenaSpec, n: Level): Built {
  const edges = spec.edges.filter((e) => e[2] <= n).map(([a, b]) => [a, b, 0] as const);
  const used = new Set<number>(edges.flatMap(([a, b]) => [a, b]));
  const vertices = spec.vertices.map(([x, y], i) => [x, y, 0, 0] as const).filter((_, i) => used.has(i));
  const index = new Map<number, number>();
  let k = 0;
  spec.vertices.forEach((_, i) => {
    if (used.has(i)) index.set(i, k++);
  });
  const plat = createPlat(GROUND, FRAME);
  const v = vertices.map(([x, y]) => allocVertex(plat, pt(x, y), 0));
  const he = edges.map(([a, b]) => allocEdgePair(plat, v[index.get(a) ?? -1], v[index.get(b) ?? -1], 0));
  linkByAngle(plat);
  return { plat, v, he, faces: [] };
}

/** A ring as a text of its directed lattice segments, rotated to its smallest segment (a set element for oracles). */
export function ringText(p: Plat, ring: readonly HalfEdgeId[]): string {
  const pts = ringPoints(p, ring);
  const segs = pts.map((a, i) => `${a.x},${a.y}>${pts[(i + 1) % pts.length].x},${pts[(i + 1) % pts.length].y}`);
  let low = 0;
  for (let i = 1; i < segs.length; i++) if (segs[i] < segs[low]) low = i;
  return segs.slice(low).concat(segs.slice(0, low)).join(' ');
}

/** The face records of a level whose outer ring contains the lattice point strictly (the smallest such). */
export function faceAt(b: Built, level: Level, q: LatticePoint): FaceId {
  let best = -1;
  let bestArea = 0;
  for (const f of b.faces[level]) {
    const rings = faceWalk(b.plat, level, f);
    const outer = ringPoints(b.plat, rings[0]);
    if (!strictlyInside(outer, q) || rings.slice(1).some((r) => strictlyInside(ringPoints(b.plat, r), q))) continue;
    const a = area2(outer);
    if (best === -1 || a < bestArea) {
      best = f;
      bestArea = a;
    }
  }
  if (best === -1) throw new Error(`support: no L${level} face record at ${q.x}, ${q.y}`);
  return best;
}

/**
 * Arena A, "quarters": an L0 square 0 … 1000 cm; L1 a cross through its centre (its ends split the L0 sides); L2 a
 * line splitting the south-west quarter (both ends Steiner vertices) and an antenna into the south-east quarter; L3 a
 * floating courtyard ring in the south-west-left block (a hole of its L3 parent's remainder); L4 a line splitting the
 * north-east quarter, whose L2 and L3 records are then the quarter's own children.
 */
export const QUARTERS: ArenaSpec = {
  vertices: [
    [0, 0, 0], [1000, 0, 0], [1000, 1000, 0], [0, 1000, 0], // 0 – 3
    [500, 0, 1], [1000, 500, 1], [500, 1000, 1], [0, 500, 1], [500, 500, 1], // 4 – 8
    [250, 0, 2], [250, 500, 2], // 9, 10
    [50, 100, 3], [150, 100, 3], [150, 200, 3], [50, 200, 3], // 11 – 14
    [500, 750, 4], [1000, 750, 4], // 15, 16
    [750, 0, 2], [750, 200, 2], // 17, 18
  ],
  edges: [
    [0, 9, 0], [9, 4, 0], [4, 17, 0], [17, 1, 0], [1, 5, 0], [5, 16, 0], [16, 2, 0], [2, 6, 0], [6, 3, 0], [3, 7, 0], [7, 0, 0],
    [4, 8, 1], [5, 8, 1], [6, 15, 1], [15, 8, 1], [7, 10, 1], [10, 8, 1],
    [9, 10, 2], [17, 18, 2],
    [11, 12, 3], [12, 13, 3], [13, 14, 3], [14, 11, 3],
    [15, 16, 4],
  ],
};

/** Arena B, "lake": an L0 square with an L0 lake ring inside (a hole at L0) and an L1 edge from the shore of the square to the lake's. */
export const LAKE: ArenaSpec = {
  vertices: [
    [0, 0, 0], [2000, 0, 0], [2000, 2000, 0], [0, 2000, 0],
    [800, 800, 0], [1200, 800, 0], [1200, 1200, 0], [800, 1200, 0],
    [1000, 0, 1], [1000, 800, 1],
  ],
  edges: [
    [0, 8, 0], [8, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0],
    [4, 9, 0], [9, 5, 0], [5, 6, 0], [6, 7, 0], [7, 4, 0],
    [8, 9, 1],
  ],
};

/**
 * QUARTERS with a role row on every edge at the edge's birth level (an edge with no row would be deleted, §3.4
 * removeEdges) and a few vertex rows: the margin ring (L0), the two ways and the district boundary on the cross (L1),
 * a wall on the east arm (L1), a kerb on the L2 line, a gate opening on the antenna (L2), the courtyard's yard parts
 * (L3), a party wall across the north-east quarter (L4); a junction, two gate ends and a width knot.
 */
export function dressQuarters(b: Built): Built {
  const p = b.plat;
  const e = (i: number, role: string, entity: string, level: Level, ordinal?: number) => addRole(p, b.he[i], { role, entity, ordinal }, level);
  for (let i = 0; i <= 10; i++) e(i, 'margin', 'terrain:1', 0);
  for (const i of [11, 13, 14]) e(i, 'way', 'way:ns', 1);
  for (const i of [15, 16, 12]) e(i, 'way', 'way:ew', 1);
  for (const i of [11, 12, 13, 14, 15, 16]) e(i, 'district_bound', 'district:1', 1);
  e(12, 'wall', 'enceinte:1', 1);
  e(17, 'kerb', 'block:sw', 2);
  e(18, 'gate_opening', 'bound:1', 2, 3);
  for (const i of [19, 20, 21, 22]) e(i, 'yard_part', 'plot:yard', 3);
  e(23, 'party_wall', 'building:ne', 4);
  addRole(p, b.v[8], { role: 'junction', entity: 'junction:c' }, 1);
  addRole(p, b.v[7], { role: 'gate_end', entity: 'gate:1', ordinal: 0 }, 1);
  addRole(p, b.v[5], { role: 'gate_end', entity: 'gate:1', ordinal: 1 }, 1);
  addRole(p, b.v[8], { role: 'width_knot', entity: 'way:ns', ordinal: 1 }, 1);
  return b;
}
