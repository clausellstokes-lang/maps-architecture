// Test support for M0-a-03's spatial-index tests. Three parts, each written here from the design's definitions and
// never with the code under test:
//   1. the ORACLE — a brute-force reading of the level-n view straight from the arena: route runs grouped through
//      finer vertices, their level-n pieces, the faces' level-n route rings, exact box tests (segment against the box's
//      four sides by BigInt orientation; containment by winding number) and the canonical sort (§3.3);
//   2. the RANDOM ARENAS — hierarchical rectilinear subdivisions (cuts of every level, floating rings as holes) built
//      through M0-a-02's hand-built arena support (rotations by exact angle, faces materialised level by level);
//   3. the WRITER — local edits by raw arena primitives (a split at any level, a dissolution, a promotion or demotion,
//      a slide, a regroup, a re-walk of every face record, a slot freed and reused) and the item-tombstone protocol
//      applied by diffing every item's signature before and after the edit: an item deleted, re-levelled, changed or
//      moved to another partition is tombstoned and its successor inserted in the grid (§3.3 "No item changes in place").
import {
  allocEdgePair,
  allocVertex,
  faceHoles,
  faceWalk,
  freeEdgePair,
  freeFace,
  freeVertex,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  setFaceHoles,
  VERTEX_SPLIT,
  VERTEX_STEINER,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../../src/arena/index.js';
import {
  attachIndex,
  beginIndexBatch,
  endIndexBatch,
  homeOf,
  indexAdd,
  indexChange,
  indexDelete,
  indexRelevel,
  ITEM_EDGE,
  ITEM_FACE,
  ITEM_VERTEX,
  OUTSIDE,
  type Box,
  type ChangedItem,
  type IndexBatchLog,
  type ItemRef,
  type PartitionResolver,
} from '../../src/index/index.js';
import type { LatticePoint, Level } from '../../src/types/index.js';
import { buildArena, intIn, linkByAngle, materialiseFaces, pt, rng, type ArenaSpec, type Built } from '../arena/support.js';

export { buildArena, faceAt, FRAME, GROUND, LAKE, permutation, pt, QUARTERS, type ArenaSpec, type Built } from '../arena/support.js';

export const LEVELS: Level[] = [0, 1, 2, 3, 4];

/** The grid cells the tests attach with (cm per level): small enough that items span cells and the large set is used. */
export const CELLS: [number, number, number, number, number] = [800, 400, 200, 100, 50];

// ---- a seeded generator ------------------------------------------------------------------------------------------------

/** The kernel tests' shared seeded generator (T-support-1's home: mulberry32 in [0, 1)) and its uniform integer. */
export { intIn, rng as generator };
export const pick = <T>(rnd: () => number, xs: readonly T[]): T => xs[Math.floor(rnd() * xs.length)];

// ---- 1. the oracle ---------------------------------------------------------------------------------------------------

const X = (p: Plat, v: VertexId): number => p.vertices.x[v];
const Y = (p: Plat, v: VertexId): number => p.vertices.y[v];

/** (y, x) order of two vertices. */
export function cmpV(p: Plat, a: VertexId, b: VertexId): number {
  return Y(p, a) - Y(p, b) || X(p, a) - X(p, b);
}

function incidentPairs(p: Plat): Map<VertexId, number[]> {
  const m = new Map<VertexId, number[]>();
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    for (const v of [p.halfEdges.origin[2 * e], p.halfEdges.origin[2 * e + 1]]) {
      const l = m.get(v) ?? [];
      l.push(e);
      m.set(v, l);
    }
  }
  return m;
}

/** A route edge read by the oracle: its level, its vertices from its lower endpoint, its pairs in order. */
export interface OracleRun {
  level: Level;
  vertices: VertexId[];
  pairs: number[];
}

/** Every route edge of the arena: maximal runs of one level's pairs through vertices finer than it (§3.3). */
export function oracleRuns(p: Plat): OracleRun[] {
  const inc = incidentPairs(p);
  const O = p.halfEdges.origin;
  const lv = p.vertices.level;
  const el = p.halfEdges.level;
  const other = (e: number, v: VertexId): VertexId => (O[2 * e] === v ? O[2 * e + 1] : O[2 * e]);
  const runs: OracleRun[] = [];
  const used = new Set<number>();
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e) || used.has(e)) continue;
    const m = el[e] as Level;
    // Walk both ways from the pair through vertices finer than m.
    const walk = (from: VertexId, e0: number): { vs: VertexId[]; es: number[] } => {
      const vs: VertexId[] = [];
      const es: number[] = [];
      let v = from;
      let cur = e0;
      for (;;) {
        es.push(cur);
        const w = other(cur, v);
        vs.push(w);
        if (lv[w] <= m) break;
        const nxt = (inc.get(w) ?? []).filter((f) => f !== cur && el[f] < lv[w]);
        if (nxt.length !== 1) throw new Error(`oracle: vertex ${w} finer than its run has ${nxt.length + 1} coarser edges`);
        cur = nxt[0];
        v = w;
      }
      return { vs, es };
    };
    const a = O[2 * e];
    const b = O[2 * e + 1];
    const fwd = walk(a, e); // b … the end beyond b
    const back = walk(b, e); // a … the end beyond a
    const vs: VertexId[] = [...[...back.vs].reverse(), ...fwd.vs];
    const es: number[] = [...[...back.es].reverse().slice(0, -1), ...fwd.es];
    for (const f of es) used.add(f);
    let flip = cmpV(p, vs[vs.length - 1], vs[0]) < 0;
    if (vs[0] === vs[vs.length - 1]) {
      // A loop: read both ways from the vertex, the smaller sequence of positions first.
      const fw = vs.slice(1).map((v) => [Y(p, v), X(p, v)]);
      const bw = [...vs].reverse().slice(1).map((v) => [Y(p, v), X(p, v)]);
      const c = fw.findIndex((q, i) => q[0] !== bw[i][0] || q[1] !== bw[i][1]);
      flip = c !== -1 && (bw[c][0] < fw[c][0] || (bw[c][0] === fw[c][0] && bw[c][1] < fw[c][1]));
    }
    if (flip) {
      vs.reverse();
      es.reverse();
    }
    runs.push({ level: m, vertices: vs, pairs: es });
  }
  return runs;
}

/** The half-edge of pair e leaving vertex v. */
export function leaving(p: Plat, e: number, v: VertexId): HalfEdgeId {
  return p.halfEdges.origin[2 * e] === v ? 2 * e : 2 * e + 1;
}

/** One level-n route edge read by the oracle: endpoints (lower first) and its sub-edge leaving the lower one. */
export interface OraclePiece {
  a: VertexId;
  b: VertexId;
  edge: HalfEdgeId;
}

/** A run's level-n pieces. */
export function oraclePieces(p: Plat, run: OracleRun, n: Level): OraclePiece[] {
  const lv = p.vertices.level;
  const out: OraclePiece[] = [];
  let start = 0;
  for (let i = 1; i < run.vertices.length; i++) {
    if (lv[run.vertices[i]] > n) continue;
    const u = run.vertices[start];
    const w = run.vertices[i];
    if (cmpV(p, u, w) < 0) out.push({ a: u, b: w, edge: leaving(p, run.pairs[start], u) });
    else out.push({ a: w, b: u, edge: leaving(p, run.pairs[i - 1], w) });
    start = i;
  }
  return out;
}

function orientBig(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): number {
  const d = (BigInt(bx) - BigInt(ax)) * (BigInt(cy) - BigInt(ay)) - (BigInt(by) - BigInt(ay)) * (BigInt(cx) - BigInt(ax));
  return d > 0n ? 1 : d < 0n ? -1 : 0;
}

function onSeg(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): boolean {
  return Math.min(ax, bx) <= cx && cx <= Math.max(ax, bx) && Math.min(ay, by) <= cy && cy <= Math.max(ay, by);
}

/** Do two closed segments meet (the classic orientation cases, BigInt)? */
export function segmentsMeet(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number): boolean {
  const o1 = orientBig(ax, ay, bx, by, cx, cy);
  const o2 = orientBig(ax, ay, bx, by, dx, dy);
  const o3 = orientBig(cx, cy, dx, dy, ax, ay);
  const o4 = orientBig(cx, cy, dx, dy, bx, by);
  if (o1 !== o2 && o3 !== o4 && o1 * o2 <= 0 && o3 * o4 <= 0 && !(o1 === 0 && o2 === 0)) return true;
  if (o1 === 0 && onSeg(ax, ay, bx, by, cx, cy)) return true;
  if (o2 === 0 && onSeg(ax, ay, bx, by, dx, dy)) return true;
  if (o3 === 0 && onSeg(cx, cy, dx, dy, ax, ay)) return true;
  if (o4 === 0 && onSeg(cx, cy, dx, dy, bx, by)) return true;
  return false;
}

const inBox = (x: number, y: number, b: Box): boolean => x >= b.minX && x <= b.maxX && y >= b.minY && y <= b.maxY;

/** Does the closed segment meet the closed box: an end inside, or a crossing of one of the box's four sides. */
export function oracleSegmentBox(ax: number, ay: number, bx: number, by: number, b: Box): boolean {
  if (inBox(ax, ay, b) || inBox(bx, by, b)) return true;
  const c = [[b.minX, b.minY], [b.maxX, b.minY], [b.maxX, b.maxY], [b.minX, b.maxY]];
  for (let i = 0; i < 4; i++) {
    const [px, py] = c[i];
    const [qx, qy] = c[(i + 1) % 4];
    if (segmentsMeet(ax, ay, bx, by, px, py, qx, qy)) return true;
  }
  return false;
}

/** The winding number of a ring of points around q (q on no segment). */
export function winding(ring: readonly LatticePoint[], qx: number, qy: number): number {
  let w = 0;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    if (a.y <= qy) {
      if (b.y > qy && orientBig(a.x, a.y, b.x, b.y, qx, qy) > 0) w++;
    } else if (b.y <= qy && orientBig(a.x, a.y, b.x, b.y, qx, qy) < 0) w--;
  }
  return w;
}

/** A face record's rings read on the level-n route: the points of its level-`level` walk's vertices of level ≤ n. */
export function oracleRouteRings(p: Plat, level: Level, f: FaceId, n: Level): VertexId[][] {
  return faceWalk(p, level, f).map((r) => r.map((h) => p.halfEdges.origin[h]).filter((v) => p.vertices.level[v] <= n));
}

function pts(p: Plat, ring: readonly VertexId[]): LatticePoint[] {
  return ring.map((v) => pt(X(p, v), Y(p, v)));
}

/** Does the face (read on the level-n route) meet the closed box? */
export function oracleFaceBox(p: Plat, level: Level, f: FaceId, n: Level, b: Box): boolean {
  const rings = oracleRouteRings(p, level, f, n);
  for (const r of rings) {
    for (let i = 0; i < r.length; i++) {
      const u = r[i];
      const w = r[(i + 1) % r.length];
      if (oracleSegmentBox(X(p, u), Y(p, u), X(p, w), Y(p, w), b)) return true;
    }
  }
  const [outer, ...holes] = rings.map((r) => pts(p, r));
  return winding(outer, b.minX, b.minY) !== 0 && holes.every((h) => winding(h, b.minX, b.minY) === 0);
}

/** The face key on the level-n route, by the oracle: the lowest-leftmost route vertex and the next, the smaller on a revisit. */
export function oracleFaceKey(p: Plat, level: Level, f: FaceId, n: Level): [VertexId, VertexId] {
  const r = oracleRouteRings(p, level, f, n)[0];
  let best: [VertexId, VertexId] | null = null;
  for (let i = 0; i < r.length; i++) {
    const cand: [VertexId, VertexId] = [r[i], r[(i + 1) % r.length]];
    if (best === null || cmpV(p, cand[0], best[0]) < 0 || (cmpV(p, cand[0], best[0]) === 0 && cmpV(p, cand[1], best[1]) < 0)) best = cand;
  }
  if (best === null) throw new Error('oracle: an empty face ring');
  return best;
}

/** The oracle's answer to a level-n query over a box (the same shape as `QueryResult`'s three lists). */
export interface OracleAnswer {
  vertices: VertexId[];
  edges: HalfEdgeId[];
  faces: FaceId[];
}

/** The level-n query, read from the whole arena by brute force. */
export function oracleQuery(p: Plat, n: Level, b: Box): OracleAnswer {
  const vertices: VertexId[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (isVertexLive(p, v) && p.vertices.level[v] <= n && inBox(X(p, v), Y(p, v), b)) vertices.push(v);
  }
  vertices.sort((u, w) => cmpV(p, u, w));
  const pieces: OraclePiece[] = [];
  for (const run of oracleRuns(p)) {
    if (run.level > n) continue;
    for (const q of oraclePieces(p, run, n)) if (oracleSegmentBox(X(p, q.a), Y(p, q.a), X(p, q.b), Y(p, q.b), b)) pieces.push(q);
  }
  pieces.sort((s, t) => cmpV(p, s.a, t.a) || cmpV(p, s.b, t.b));
  const faces: { f: FaceId; k: [VertexId, VertexId] }[] = [];
  for (let f = 0; f < p.slots.face[n].top; f++) {
    if (isFaceLive(p, n, f) && oracleFaceBox(p, n, f, n, b)) faces.push({ f, k: oracleFaceKey(p, n, f, n) });
  }
  faces.sort((s, t) => cmpV(p, s.k[0], t.k[0]) || cmpV(p, s.k[1], t.k[1]));
  return { vertices, edges: pieces.map((q) => q.edge), faces: faces.map((x) => x.f) };
}

/**
 * A ring of vertices as text from its lowest-leftmost vertex (the smaller successor on a revisit), so a record re-pointed
 * at another half-edge of the same ring reads the same.
 */
export function canonicalRing(p: Plat, r: readonly VertexId[]): string {
  let s = 0;
  for (let i = 1; i < r.length; i++) {
    const c = cmpV(p, r[i], r[s]);
    if (c < 0 || (c === 0 && cmpV(p, r[(i + 1) % r.length], r[(s + 1) % r.length]) < 0)) s = i;
  }
  return [...r.slice(s), ...r.slice(0, s)].map((v) => `${X(p, v)},${Y(p, v)}`).join(' ');
}

/** An answer as lattice positions — the same whatever slots the arena holds (the slot-free reading of a result). */
export function positions(p: Plat, n: Level, a: OracleAnswer): string[] {
  const at = (v: VertexId): string => `${X(p, v)},${Y(p, v)}`;
  const O = p.halfEdges.origin;
  return [
    ...a.vertices.map((v) => `v ${at(v)}`),
    ...a.edges.map((h) => `e ${at(O[h])}>${at(O[h ^ 1])}`),
    ...a.faces.map((f) => `f ${oracleRouteRings(p, n, f, n).map((r) => canonicalRing(p, r)).join(' | ')}`),
  ];
}

// ---- 2. random arenas ------------------------------------------------------------------------------------------------

interface Seg {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  level: Level;
}

interface Rect {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

/**
 * A random hierarchical rectilinear subdivision of a W × W square (coordinates on a 10 cm grid): every level-(l − 1)
 * rectangle may be cut at level l (vertically or horizontally, side to side), and a few leaf rectangles take a
 * floating square ring (a hole of their remainder). Vertex levels follow the segments ending at them (the lowest), so
 * a cut's end on its rectangle's (coarser) side is a finer (Steiner) vertex there.
 */
export function randomSpec(rnd: () => number, W = 4000, cutShare = 0.75, ringShare = 0.15): ArenaSpec {
  const segs: Seg[] = [
    { x0: 0, y0: 0, x1: W, y1: 0, level: 0 },
    { x0: W, y0: 0, x1: W, y1: W, level: 0 },
    { x0: 0, y0: W, x1: W, y1: W, level: 0 },
    { x0: 0, y0: 0, x1: 0, y1: W, level: 0 },
  ];
  let rects: Rect[] = [{ x0: 0, y0: 0, x1: W, y1: W }];
  for (let l = 1; l <= 4; l++) {
    const next: Rect[] = [];
    for (const r of rects) {
      const w = r.x1 - r.x0;
      const h = r.y1 - r.y0;
      const vertical = w >= h ? rnd() < 0.8 : rnd() < 0.2;
      const span = vertical ? w : h;
      if (span >= 120 && rnd() < cutShare) {
        const c = (vertical ? r.x0 : r.y0) + 10 * intIn(rnd, 5, span / 10 - 5);
        if (vertical) {
          segs.push({ x0: c, y0: r.y0, x1: c, y1: r.y1, level: l as Level });
          next.push({ x0: r.x0, y0: r.y0, x1: c, y1: r.y1 }, { x0: c, y0: r.y0, x1: r.x1, y1: r.y1 });
        } else {
          segs.push({ x0: r.x0, y0: c, x1: r.x1, y1: c, level: l as Level });
          next.push({ x0: r.x0, y0: r.y0, x1: r.x1, y1: c }, { x0: r.x0, y0: c, x1: r.x1, y1: r.y1 });
        }
      } else if (w >= 200 && h >= 200 && rnd() < ringShare) {
        // A floating ring at this level, its sides on the 10 cm grid, at least 50 cm inside the rectangle, which is
        // then cut no further (a later cut side to side would cross the ring).
        const x0 = r.x0 + 10 * intIn(rnd, 5, (w - 100) / 10);
        const y0 = r.y0 + 10 * intIn(rnd, 5, (h - 100) / 10);
        const room = Math.min(r.x1 - 50 - x0, r.y1 - 50 - y0);
        if (room >= 50) {
          const s = 10 * intIn(rnd, 5, room / 10);
          const L = l as Level;
          segs.push({ x0, y0, x1: x0 + s, y1: y0, level: L }, { x0: x0 + s, y0, x1: x0 + s, y1: y0 + s, level: L }, { x0, y0: y0 + s, x1: x0 + s, y1: y0 + s, level: L }, { x0, y0, x1: x0, y1: y0 + s, level: L });
        } else {
          next.push(r);
        }
      } else {
        next.push(r);
      }
    }
    rects = next;
  }
  // Vertices: every segment end, at the lowest level of the segments ending there.
  const vkey = (x: number, y: number): string => `${x},${y}`;
  const vlevel = new Map<string, Level>();
  for (const s of segs) {
    for (const [x, y] of [[s.x0, s.y0], [s.x1, s.y1]]) {
      const k = vkey(x, y);
      const old = vlevel.get(k);
      if (old === undefined || s.level < old) vlevel.set(k, s.level);
    }
  }
  const vlist = [...vlevel.entries()].map(([k, l]) => {
    const [x, y] = k.split(',').map(Number);
    return [x, y, l] as const;
  });
  vlist.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  const edges: [number, number, Level][] = [];
  for (const s of segs) {
    const on = vlist
      .map(([x, y], i) => ({ x, y, i }))
      .filter(({ x, y }) => (s.x0 === s.x1 ? x === s.x0 && y >= Math.min(s.y0, s.y1) && y <= Math.max(s.y0, s.y1) : y === s.y0 && x >= Math.min(s.x0, s.x1) && x <= Math.max(s.x0, s.x1)));
    on.sort((a, b) => a.y - b.y || a.x - b.x);
    for (let i = 0; i + 1 < on.length; i++) edges.push([on[i].i, on[i + 1].i, s.level]);
  }
  return { vertices: vlist.map(([x, y, l]) => [x, y, l]), edges };
}

// ---- 3. the writer ---------------------------------------------------------------------------------------------------

/** The test's district map: x < cut → 'd:a', x > cut → 'd:b', x = cut → both (the smaller takes it); y > hinterland → outside. */
export interface Districts {
  cutX: number;
  hinterlandY: number;
}

/** The anchor of an item for the test map: a vertex's point; a run's lower endpoint; a face's lowest-leftmost route vertex. */
function anchorOf(p: Plat, item: ItemRef): VertexId {
  if (item.kind === ITEM_VERTEX) return item.slot;
  if (item.kind === ITEM_EDGE) {
    const run = oracleRuns(p).find((r) => r.pairs.includes(item.slot));
    if (run === undefined) throw new Error('support: no run holds the pair');
    return run.vertices[0];
  }
  return oracleFaceKey(p, item.level, item.slot, item.level)[0];
}

/** A partition resolver over a district map (read at call time, so a regroup is a change of the map). */
export function districtResolver(d: Districts): PartitionResolver {
  return (p, item) => {
    const v = anchorOf(p, item);
    if (Y(p, v) > d.hinterlandY) return OUTSIDE;
    const x = X(p, v);
    return x < d.cutX ? 'd:a' : x > d.cutX ? 'd:b' : ['d:b', 'd:a'];
  };
}

/** The partition key the map gives an item (the smaller of several). */
export function districtOf(p: Plat, d: Districts, item: ItemRef): string {
  if (item.level <= 1) return OUTSIDE;
  const r = districtResolver(d)(p, item);
  return typeof r === 'string' ? r : [...r].sort()[0];
}

/** One item's identity and signature: what the index must know about it. */
interface Sig {
  item: ItemRef;
  sig: string;
}

/** Every live item's signature, by its key (faces by level and key): level, route shape and partition (§3.3). */
export function signatures(p: Plat, d: Districts | null): Map<string, Sig> {
  const out = new Map<string, Sig>();
  const part = (item: ItemRef): string => (d === null ? '' : districtOf(p, d, item));
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (!isVertexLive(p, v)) continue;
    const item: ItemRef = { kind: ITEM_VERTEX, level: p.vertices.level[v] as Level, slot: v };
    out.set(`v${v}`, { item, sig: `${item.level}|${X(p, v)},${Y(p, v)}|${part(item)}` });
  }
  for (const run of oracleRuns(p)) {
    const e = run.pairs[0];
    const item: ItemRef = { kind: ITEM_EDGE, level: run.level, slot: e };
    const a = run.vertices[0];
    const b = run.vertices[run.vertices.length - 1];
    out.set(`e${e}`, { item, sig: `${run.level}|${X(p, a)},${Y(p, a)}|${X(p, b)},${Y(p, b)}|${part(item)}` });
  }
  for (const level of LEVELS) {
    for (let f = 0; f < p.slots.face[level].top; f++) {
      if (!isFaceLive(p, level, f)) continue;
      const item: ItemRef = { kind: ITEM_FACE, level, slot: f };
      const rings = oracleRouteRings(p, level, f, level).map((r) => canonicalRing(p, r));
      out.set(`f${level}:${f}`, { item, sig: `${rings.join(' | ')}|${part(item)}` });
    }
  }
  return out;
}

/**
 * Applies the item-tombstone protocol for the difference between two signature maps and returns the changed items —
 * every deleted, re-levelled, changed or re-partitioned item, as the commit record names them. `skip` withholds the
 * protocol (not the fact) from the keys it accepts: the negative control's writer that forgets an item.
 */
export function applyProtocol(p: Plat, before: Map<string, Sig>, homes: Map<string, number>, after: Map<string, Sig>, skip?: (k: string) => boolean): ChangedItem[] {
  const changed: ChangedItem[] = [];
  const keys = [...new Set([...before.keys(), ...after.keys()])].sort();
  for (const k of keys) {
    const b = before.get(k);
    const a = after.get(k);
    const act = skip?.(k) !== true;
    const released = RELEASED.has(k); // deleted from the index while the edit freed its slot
    if (b !== undefined && a === undefined) {
      changed.push({ item: b.item, homeBefore: homes.get(k) ?? -1, successor: null });
      if (act && !released) indexDelete(p, b.item);
    } else if (b === undefined && a !== undefined) {
      if (act) indexAdd(p, a.item);
    } else if (b !== undefined && a !== undefined && (b.sig !== a.sig || released)) {
      changed.push({ item: b.item, homeBefore: homes.get(k) ?? -1, successor: a.item });
      if (!act) continue;
      if (released) indexAdd(p, a.item);
      else if (b.item.level !== a.item.level) indexRelevel(p, a.item, b.item.level);
      else indexChange(p, a.item);
    }
  }
  RELEASED.clear();
  return changed;
}

/** Every item's home entry now, by the signature keys. */
export function homesOf(p: Plat, sigs: Map<string, Sig>): Map<string, number> {
  const out = new Map<string, number>();
  for (const [k, s] of sigs) out.set(k, homeOf(p, s.item));
  return out;
}

/** The signature keys of the items the writer deleted from the index during the current edit (read by applyProtocol). */
const RELEASED = new Set<string>();

function sigKey(item: ItemRef): string {
  return item.kind === ITEM_VERTEX ? `v${item.slot}` : item.kind === ITEM_EDGE ? `e${item.slot}` : `f${item.level}:${item.slot}`;
}

/** The writer's delete of an item whose slot it is about to free (when the arena carries an index). */
function release(p: Plat, item: ItemRef): void {
  if (p.index === undefined) return;
  indexDelete(p, item);
  RELEASED.add(sigKey(item));
}

/** The face records that reference half-edge `h` (outer or hole), as (level, face, which) — the writer's re-pointing. */
function repoint(p: Plat, from: HalfEdgeId, to: HalfEdgeId): void {
  for (const level of LEVELS) {
    const t = p.faces[level];
    for (let f = 0; f < p.slots.face[level].top; f++) {
      if (!isFaceLive(p, level, f)) continue;
      if (t.outer[f] === from) t.outer[f] = to;
      const hs = faceHoles(p, level, f);
      if (hs.includes(from)) setFaceHoles(p, level, f, hs.map((h) => (h === from ? to : h)));
    }
  }
}

/** Is there a live vertex at the point? */
export function occupied(p: Plat, x: number, y: number): boolean {
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v) && X(p, v) === x && Y(p, v) === y) return true;
  return false;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

/**
 * Splits pair e at lattice point `at` by a new vertex of `level` (≥ the edge's): the part at the run's lower end keeps
 * the pair (§3.3: the handle never changes under a split). The caller keeps `at` on the segment, or — for a finer
 * vertex — within the hot pixel of it. Returns the vertex.
 */
export function splitAt(p: Plat, e: number, at: LatticePoint, level: Level): VertexId {
  const m = p.halfEdges.level[e] as Level;
  if (level < m) throw new Error('support: a split vertex is not coarser than its edge');
  if (occupied(p, at.x, at.y)) throw new Error('support: the point holds a vertex');
  const run = oracleRuns(p).find((r) => r.pairs.includes(e));
  if (run === undefined) throw new Error('support: no run holds the pair');
  const i = run.pairs.indexOf(e);
  const a = run.vertices[i];
  const b = run.vertices[i + 1];
  const h = leaving(p, e, a);
  const flags = VERTEX_SPLIT | (level > m ? VERTEX_STEINER : 0);
  const v = allocVertex(p, at, level, flags);
  p.halfEdges.origin[h ^ 1] = v; // h: a → v, its twin v → a
  allocEdgePair(p, v, b, m); // v → b
  linkByAngle(p);
  return v;
}

/**
 * Splits pair e at a random lattice point by a new vertex of `level` (≥ the edge's): on the segment exactly when it has
 * an interior lattice point, else (a finer vertex only) at the lattice point nearest its midpoint, within the hot
 * pixel. Returns the vertex, or −1 when the edge has no free point.
 */
export function splitPair(p: Plat, e: number, level: Level, rnd: () => number): VertexId {
  const m = p.halfEdges.level[e] as Level;
  if (level < m) throw new Error('support: a split vertex is not coarser than its edge');
  const O = p.halfEdges.origin;
  const a = O[2 * e];
  const b = O[2 * e + 1];
  const dx = X(p, b) - X(p, a);
  const dy = Y(p, b) - Y(p, a);
  const g = gcd(dx, dy);
  let at: LatticePoint;
  if (g >= 2) {
    const t = intIn(rnd, 1, g - 1);
    at = pt(X(p, a) + (t * dx) / g, Y(p, a) + (t * dy) / g);
  } else {
    if (level === m) return -1;
    at = pt(Math.round(X(p, a) + dx / 2), Math.round(Y(p, a) + dy / 2));
  }
  if (occupied(p, at.x, at.y)) return -1;
  return splitAt(p, e, at, level);
}

/**
 * Dissolves a degree-2 vertex whose two edges have one level (§2.2 rule 3's dissolution): the edge at the run's lower
 * side keeps its pair, now joining the two far ends; the other pair and the vertex are freed (slots for reuse).
 * Returns false when the vertex is not dissolvable.
 */
export function dissolve(p: Plat, v: VertexId): boolean {
  const inc: number[] = [];
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (isHalfEdgeLive(p, 2 * e) && (p.halfEdges.origin[2 * e] === v || p.halfEdges.origin[2 * e + 1] === v)) inc.push(e);
  }
  if (inc.length !== 2 || p.halfEdges.level[inc[0]] !== p.halfEdges.level[inc[1]] || p.roles.vertexFirst[v] !== -1 || !nearStraight(p, v)) return false;
  const run = oracleRuns(p).find((r) => r.pairs.includes(inc[0]));
  if (run === undefined || !run.pairs.includes(inc[1])) return false;
  const i = run.vertices.indexOf(v);
  if (i <= 0 || i >= run.vertices.length - 1) return false;
  const low = run.pairs[i - 1];
  const high = run.pairs[i];
  const far = run.vertices[i + 1];
  // A dissolution must not leave two vertices joined twice (a run folding back): refuse a far end already joined.
  const near = run.vertices[i - 1];
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (e === low || e === high || !isHalfEdgeLive(p, 2 * e)) continue;
    const o = [p.halfEdges.origin[2 * e], p.halfEdges.origin[2 * e + 1]];
    if (o.includes(near) && o.includes(far)) return false;
  }
  const x = leaving(p, low, near); // near → v
  const y = leaving(p, high, v); // v → far
  repoint(p, y, x);
  repoint(p, y ^ 1, x ^ 1);
  // The writer deletes what it frees from the index before the slots can be handed out again (§3.3: the arena resets a
  // reallocated slot's home entry, so a tombstone is written while the entry still names the static copy).
  release(p, { kind: ITEM_EDGE, level: p.halfEdges.level[high] as Level, slot: high });
  release(p, { kind: ITEM_VERTEX, level: p.vertices.level[v] as Level, slot: v });
  p.halfEdges.origin[x ^ 1] = far; // x: near → far, its twin far → near
  freeEdgePair(p, y);
  freeVertex(p, v);
  linkByAngle(p);
  return true;
}

/**
 * Does v lie within the hot pixel of the segment joining its two coarsest edges' other ends (§3.10's placement bound,
 * which a route through v after its demotion or dissolution must keep)? Exact: orient² ≤ 0.5041 · |ab|², foot inside.
 */
export function nearStraight(p: Plat, v: VertexId): boolean {
  const inc: { e: number; w: VertexId; l: number }[] = [];
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    const o = [p.halfEdges.origin[2 * e], p.halfEdges.origin[2 * e + 1]];
    if (o[0] === v) inc.push({ e, w: o[1], l: p.halfEdges.level[e] });
    else if (o[1] === v) inc.push({ e, w: o[0], l: p.halfEdges.level[e] });
  }
  inc.sort((s, u) => s.l - u.l);
  if (inc.length < 2 || inc[0].l !== inc[1].l) return false;
  const a = inc[0].w;
  const b = inc[1].w;
  const ax = X(p, a), ay = Y(p, a), bx = X(p, b), by = Y(p, b), vx = X(p, v), vy = Y(p, v);
  const o = (bx - ax) * (vy - ay) - (by - ay) * (vx - ax);
  const len2 = (bx - ax) * (bx - ax) + (by - ay) * (by - ay);
  const dot1 = (vx - ax) * (bx - ax) + (vy - ay) * (by - ay);
  return o * o <= 0.5041 * len2 && dot1 > 0 && dot1 < len2;
}

/** The levels a vertex may take (§3.10's level consistency): [m, k] over its two coarsest edges m and the rest's least k. */
export function levelRange(p: Plat, v: VertexId): [Level, Level] | null {
  const levels: number[] = [];
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (isHalfEdgeLive(p, 2 * e) && (p.halfEdges.origin[2 * e] === v || p.halfEdges.origin[2 * e + 1] === v)) levels.push(p.halfEdges.level[e]);
  }
  if (levels.length < 2) return null;
  levels.sort((a, b) => a - b);
  if (levels[0] !== levels[1]) return null;
  if (levels.length >= 3 && levels[2] === levels[0]) return null;
  const hi = levels.length >= 3 ? levels[2] : 4;
  return [levels[0] as Level, hi as Level];
}

/** Sets a vertex's birth level (a promotion lowers it, a demotion raises it), its Steiner flag following. */
export function setLevel(p: Plat, v: VertexId, level: Level): void {
  const r = levelRange(p, v);
  if (r === null || level < r[0] || level > r[1]) throw new Error('support: that level breaks level consistency');
  p.vertices.level[v] = level;
  p.vertices.flags[v] = (p.vertices.flags[v] & ~VERTEX_STEINER) | (level > r[0] ? VERTEX_STEINER : 0);
}

/**
 * Slides a degree-2 vertex to another free lattice point on the straight segment between its two neighbours, strictly
 * between them; false when there is none.
 */
export function slide(p: Plat, v: VertexId, rnd: () => number): boolean {
  const nb: VertexId[] = [];
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    const o = [p.halfEdges.origin[2 * e], p.halfEdges.origin[2 * e + 1]];
    if (o[0] === v) nb.push(o[1]);
    else if (o[1] === v) nb.push(o[0]);
  }
  if (nb.length !== 2) return false;
  const [a, b] = nb;
  const dx = X(p, b) - X(p, a);
  const dy = Y(p, b) - Y(p, a);
  if (orientBig(X(p, a), Y(p, a), X(p, b), Y(p, b), X(p, v), Y(p, v)) !== 0) return false;
  const g = gcd(dx, dy);
  if (g < 3) return false;
  const t = intIn(rnd, 1, g - 1);
  const x = X(p, a) + (t * dx) / g;
  const y = Y(p, a) + (t * dy) / g;
  if (occupied(p, x, y)) return false;
  p.vertices.x[v] = x;
  p.vertices.y[v] = y;
  return true;
}

/**
 * Frees every face record in a random order and materialises them again — a re-walk of every level, whose face slots
 * are freed and reused (each face likely in another slot).
 */
export function materialiseAgainShuffled(p: Plat, rnd: () => number): void {
  for (const level of LEVELS) {
    const live: FaceId[] = [];
    for (let f = 0; f < p.slots.face[level].top; f++) if (isFaceLive(p, level, f)) live.push(f);
    for (let i = live.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [live[i], live[j]] = [live[j], live[i]];
    }
    for (const f of live) {
      release(p, { kind: ITEM_FACE, level, slot: f });
      freeFace(p, level, f);
    }
  }
  materialiseFaces(p);
}

/** A random arena from a seed, with the index attached under a district map. */
export function randomArena(seed: number, d: Districts | null, spec?: ArenaSpec): { built: Built; rnd: () => number } {
  const rnd = rng(seed);
  const s = spec ?? randomSpec(rnd);
  const built = buildArena(s, {});
  attachIndex(built.plat, { gridCellCm: CELLS, ...(d === null ? {} : { partitionOf: districtResolver(d) }) });
  return { built, rnd };
}

/** The pair joining two vertices (−1 when none). */
export function pairOf(p: Plat, a: VertexId, b: VertexId): number {
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    const o = [p.halfEdges.origin[2 * e], p.halfEdges.origin[2 * e + 1]];
    if ((o[0] === a && o[1] === b) || (o[0] === b && o[1] === a)) return e;
  }
  return -1;
}

/** The live vertex at a point (−1 when none). */
export function vertexAtPoint(p: Plat, x: number, y: number): VertexId {
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v) && X(p, v) === x && Y(p, v) === y) return v;
  return -1;
}

/**
 * One edit under the protocol (support.ts's writer): the signatures before, the edit, the signatures after, the
 * item-tombstone protocol for the difference — inside an index batch log of `level`. Returns the changed items and log.
 */
export function edit(p: Plat, d: Districts | null, level: Level, fn: () => void): { changed: ChangedItem[]; log: IndexBatchLog } {
  const before = signatures(p, d);
  const homes = homesOf(p, before);
  const log = beginIndexBatch(p, level);
  let changed: ChangedItem[] = [];
  try {
    fn();
    changed = applyProtocol(p, before, homes, signatures(p, d));
  } finally {
    endIndexBatch(p);
  }
  return { changed, log };
}

/**
 * "Off-line" (the checker's fixture, `checks/M0-a-03.md` §5.1 P2): an L0 square 0 … 1000; an L1 line A (0, 500) →
 * B (1000, 503) whose ends are Steiner vertices on the L0 sides; S (500, 501), an L2 vertex on that run 0.5 cm below its
 * straight route (inside the hot pixel); an L2 line S → T (500, 0). The upper L1 face holds no L2 record. Between A–S
 * and A–B — (400, 501), say — a point lies in the lower L1 face read on the L1 route and in the upper L1 record read on
 * the L2 route (§3.3: a record is read on the query's level-n route, never at its own level).
 */
export const OFFLINE: ArenaSpec = {
  vertices: [
    [0, 0, 0], [1000, 0, 0], [1000, 1000, 0], [0, 1000, 0], // 0 – 3
    [0, 500, 1], [1000, 503, 1], // A 4, B 5
    [500, 501, 2], [500, 0, 2], // S 6, T 7
  ],
  edges: [
    [0, 7, 0], [7, 1, 0], [1, 5, 0], [5, 2, 0], [2, 3, 0], [3, 4, 0], [4, 0, 0],
    [4, 6, 1], [6, 5, 1],
    [6, 7, 2],
  ],
};

/** OFFLINE before its L2 batch: the L0 square and the L1 line A → B alone (S and T are derived by a test's batch). */
export const OFFLINE_BASE: ArenaSpec = {
  vertices: [[0, 0, 0], [1000, 0, 0], [1000, 1000, 0], [0, 1000, 0], [0, 500, 1], [1000, 503, 1]],
  edges: [[0, 1, 0], [1, 5, 0], [5, 2, 0], [2, 3, 0], [3, 4, 0], [4, 0, 0], [4, 5, 1]],
};

/**
 * "Chain" (the closing check's probe, `checks/M0-a-03-notes.md` N-5): off-line finer vertices three levels deep on one
 * L1 run. An L0 square 0 … 2000; the L1 run A (0, 1000) → B (2000, 1006), its ends Steiner vertices on the L0 sides;
 * on it S1 (1100, 1003) at L2, S2 (500, 1002) at L3 and S3 (800, 1002) at L4, each within the 0.71 cm hot pixel of
 * every coarser route through it, on alternate sides (S1 below A–B, S2 above A–S1, S3 below S2–S1), so L1 reads the
 * run as A–B, L2 as A–S1–B, L3 as A–S2–S1–B and L4 as A–S2–S3–S1–B. A line runs up from each to the L0 top side:
 * S1 → T1 (1100, 2000) at L2, S2 → T2 (500, 2000) at L3, S3 → T3 (800, 2000) at L4. The lower L1 face therefore holds
 * no finer record: it is its own child at L2, L3 and L4, read there on the L2, L3 and L4 route (as are the upper-right
 * L2 record at L3 – L4 and the upper-left L3 record at L4). The points between the L2 route A–S1 and the L3 route
 * A–S2–S1 (above the first, below the second) lie in the upper L1 record at L2 and in the lower one at L3 and L4: a
 * record read on any route but the query's level-n one — its own, or one level finer than its own — misplaces them
 * (§3.3: a record is read on the query's level-n route).
 */
export const CHAIN: ArenaSpec = {
  vertices: [
    [0, 0, 0], [2000, 0, 0], [2000, 2000, 0], [0, 2000, 0], // 0 – 3
    [0, 1000, 1], [2000, 1006, 1], // A 4, B 5
    [1100, 1003, 2], [1100, 2000, 2], // S1 6, T1 7
    [500, 1002, 3], [500, 2000, 3], // S2 8, T2 9
    [800, 1002, 4], [800, 2000, 4], // S3 10, T3 11
  ],
  edges: [
    [0, 1, 0], [1, 5, 0], [5, 2, 0], [2, 7, 0], [7, 11, 0], [11, 9, 0], [9, 3, 0], [3, 4, 0], [4, 0, 0],
    [4, 8, 1], [8, 10, 1], [10, 6, 1], [6, 5, 1],
    [6, 7, 2],
    [8, 9, 3],
    [10, 11, 4],
  ],
};

/** An L0 square with an L1 line across it carrying n L3 Steiner vertices (a long kerb's plot-line ends). */
export function steinerLineSpec(n: number): ArenaSpec {
  const W = 40 * (n + 2);
  const vertices: [number, number, Level][] = [[0, 0, 0], [W, 0, 0], [W, W, 0], [0, W, 0], [0, 20, 1], [W, 20, 1]];
  for (let k = 1; k <= n; k++) vertices.push([40 * k, 20, 3]);
  const edges: [number, number, Level][] = [[0, 1, 0], [1, 5, 0], [5, 2, 0], [2, 3, 0], [3, 4, 0], [4, 0, 0]];
  let prev = 4;
  for (let k = 1; k <= n; k++) {
    edges.push([prev, 5 + k, 1]);
    prev = 5 + k;
  }
  edges.push([prev, 5, 1]);
  return { vertices, edges };
}

