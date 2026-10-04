// Path search (§3.1: "binary-heap A* / Dijkstra on rasters and on the subdivision graph … E_NO_PATH with the closest
// reached point"; §4.3: S3's plaza-rooted Dijkstra tree and the heap A* re-solves; §17.1 (8): E. W. Dijkstra, "A note
// on two problems in connexion with graphs", Numer. Math. 1 (1959); P. E. Hart, N. J. Nilsson and B. Raphael, "A formal
// basis for the heuristic determination of minimum cost paths", IEEE TSSC 4 (1968)). M0-a-10; C-0159 (9).
//
// One search over two spaces: a graph in compressed rows (the hex lattice's adjacency, a subdivision's edges) and a cost
// raster (4- or 8-connected cells). Determinism (§6.5): the heap breaks ties by node id, a node's distance is replaced
// only by a strictly smaller one, and edges are relaxed in their stored order, so the path returned is a function of
// the inputs alone. A target popped is reached by a shortest path when the heuristic is consistent (A*'s contract; the
// raster's default and the zero heuristic are). No path: E_NO_PATH, `partial` the path to the reached node closest to a
// target — by Euclidean distance where nodes have positions (a graph's `xy`, a raster's cell centres), else by the
// heuristic — with that node's position as `at`.
import { err, ok, ratio, type KernelResult } from '../num/index.js';
import type { XY } from './common.js';
import { BinaryHeap } from './heap.js';

/** A directed graph in compressed rows: node v's edges are targets[k], weights[k] for offsets[v] ≤ k < offsets[v + 1]. */
export interface SearchGraph {
  n: number;
  offsets: Int32Array;
  targets: Int32Array;
  /** Each ≥ 0; +∞ is impassable. */
  weights: Float64Array;
  /** Node positions (cm) as x₀, y₀, x₁, y₁, …: what "the closest reached point" is measured by. */
  xy?: Float64Array;
}

/** A cost raster: cell (row r, column c) is node r·cols + c, its centre at origin + ((c + ½)·cellCm, (r + ½)·cellCm). */
export interface CostRaster {
  cols: number;
  rows: number;
  /** Per cell, row by row: the cost per cm of travel inside it, ≥ 0; +∞ is impassable. */
  cost: Float64Array | Float32Array;
  /** 8-connected when true (the default), else 4-connected. A diagonal step never cuts an impassable cell's corner. */
  diagonal?: boolean;
  /** The cell side (cm); default 1. */
  cellCm?: number;
  /** The raster's minimum corner (cm); default (0, 0). */
  originCm?: XY;
}

/** A path: its nodes from a source to the node reached, its cost, and that node's position where nodes have one. */
export interface SearchPath {
  nodes: number[];
  cost: number;
  at?: XY;
}

interface Space {
  n: number;
  expand(v: number, relax: (u: number, w: number) => void): void;
  /** The node's position, or null where nodes have none. */
  pos(v: number): XY | null;
}

const SQRT2 = 1.4142135623730951;

function isRaster(g: SearchGraph | CostRaster): g is CostRaster {
  return 'cols' in g;
}

function graphSpace(g: SearchGraph): Space {
  if (!(Number.isInteger(g.n) && g.n >= 0 && g.offsets.length === g.n + 1 && g.weights.length === g.targets.length)) {
    throw new RangeError('path: a graph has n ≥ 0, n + 1 offsets and one weight per edge');
  }
  const xy = g.xy !== undefined && g.xy.length === 2 * g.n ? g.xy : null;
  return {
    n: g.n,
    expand(v, relax) {
      const end = g.offsets[v + 1];
      for (let k = g.offsets[v]; k < end; k += 1) relax(g.targets[k], g.weights[k]);
    },
    pos: (v) => (xy === null ? null : { x: xy[2 * v], y: xy[2 * v + 1] }),
  };
}

/** ⌊v ÷ cols⌋ exactly, for whole v ≥ 0 and cols ≥ 1 (the quotient through ratio(), then corrected by one either way). */
function rowOf(v: number, cols: number): number {
  const q = ratio(v, cols, 'count');
  let row = q.ok ? Math.floor(q.value) : 0;
  if (row * cols > v) row -= 1;
  else if ((row + 1) * cols <= v) row += 1;
  return row;
}

function rasterSpace(r: CostRaster): Space {
  const { cols, rows, cost } = r;
  if (!(Number.isInteger(cols) && Number.isInteger(rows) && cols >= 0 && rows >= 0 && cost.length === cols * rows)) {
    throw new RangeError('path: a raster has whole cols and rows and one cost per cell');
  }
  const cell = r.cellCm ?? 1;
  if (!(cell > 0 && cell < Infinity)) throw new RangeError('path: a raster cell side is finite and > 0');
  const diag = r.diagonal ?? true;
  const ox = r.originCm?.x ?? 0;
  const oy = r.originCm?.y ?? 0;
  const ORTHO: readonly [number, number][] = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  const DIAG: readonly [number, number][] = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
  return {
    n: cols * rows,
    expand(v, relax) {
      const row = rowOf(v, cols);
      const col = v - row * cols;
      const cv = cost[v];
      if (!(cv < Infinity)) return;
      for (const [dc, dr] of ORTHO) {
        const c = col + dc;
        const rr = row + dr;
        if (c < 0 || c >= cols || rr < 0 || rr >= rows) continue;
        const u = rr * cols + c;
        relax(u, (cv + cost[u]) * 0.5 * cell);
      }
      if (!diag) return;
      for (const [dc, dr] of DIAG) {
        const c = col + dc;
        const rr = row + dr;
        if (c < 0 || c >= cols || rr < 0 || rr >= rows) continue;
        if (!(cost[row * cols + c] < Infinity) || !(cost[rr * cols + col] < Infinity)) continue;
        const u = rr * cols + c;
        relax(u, (cv + cost[u]) * 0.5 * SQRT2 * cell);
      }
    },
    pos: (v) => {
      const row = rowOf(v, cols);
      const col = v - row * cols;
      return { x: ox + (col + 0.5) * cell, y: oy + (row + 0.5) * cell };
    },
  };
}

function spaceOf(g: SearchGraph | CostRaster): Space {
  return isRaster(g) ? rasterSpace(g) : graphSpace(g);
}

function nodeList(v: number | readonly number[], n: number, what: string): number[] {
  const list = typeof v === 'number' ? [v] : [...v];
  if (list.length === 0) throw new RangeError(`path: no ${what}`);
  for (const x of list) if (!(Number.isInteger(x) && x >= 0 && x < n)) throw new RangeError(`path: ${what} ${String(x)} is not a node`);
  return list;
}

interface SearchRun {
  dist: Float64Array;
  prev: Int32Array;
  closed: Uint8Array;
  /** The target reached, or −1. */
  reached: number;
}

function run(sp: Space, sources: readonly number[], target: Uint8Array | null, h: ((v: number) => number) | null): SearchRun {
  const n = sp.n;
  const dist = new Float64Array(n).fill(Infinity);
  const prev = new Int32Array(n).fill(-1);
  const closed = new Uint8Array(n);
  const heap = new BinaryHeap();
  const hOf = (v: number): number => {
    if (h === null) return 0;
    const x = h(v);
    if (!(x >= 0 && x < Infinity)) throw new RangeError(`path: the heuristic at node ${String(v)} is not finite and ≥ 0: ${String(x)}`);
    return x;
  };
  for (const s of sources) {
    if (dist[s] === 0) continue;
    dist[s] = 0;
    heap.push(s, hOf(s));
  }
  let v = -1;
  const relax = (u: number, w: number): void => {
    if (!(w >= 0)) throw new RangeError(`path: the edge ${String(v)} → ${String(u)} has a weight that is negative or NaN: ${String(w)}`);
    if (w === Infinity || closed[u] === 1) return;
    const nd = dist[v] + w;
    if (nd < dist[u]) {
      dist[u] = nd;
      prev[u] = v;
      heap.push(u, nd + hOf(u));
    }
  };
  while (heap.size > 0) {
    v = heap.pop();
    if (closed[v] === 1) continue;
    closed[v] = 1;
    if (target !== null && target[v] === 1) return { dist, prev, closed, reached: v };
    sp.expand(v, relax);
  }
  return { dist, prev, closed, reached: -1 };
}

function pathTo(r: SearchRun, v: number, sp: Space): SearchPath {
  const nodes: number[] = [];
  for (let u = v; u !== -1; u = r.prev[u]) nodes.push(u);
  nodes.reverse();
  const at = sp.pos(v);
  return at === null ? { nodes, cost: r.dist[v] } : { nodes, cost: r.dist[v], at };
}

function search(
  g: SearchGraph | CostRaster,
  from: number | readonly number[],
  to: number | readonly number[],
  h: ((v: number) => number) | null,
): KernelResult<SearchPath> {
  const sp = spaceOf(g);
  const sources = nodeList(from, sp.n, 'source');
  const targets = nodeList(to, sp.n, 'target');
  const isTarget = new Uint8Array(sp.n);
  for (const t of targets) isTarget[t] = 1;
  const r = run(sp, sources, isTarget, h);
  if (r.reached !== -1) return ok(pathTo(r, r.reached, sp));
  // The closest reached node: by distance to the nearest target where nodes have positions, else by the heuristic.
  const tpos = targets.map((t) => sp.pos(t));
  const positioned = tpos.every((p) => p !== null);
  if (!positioned && h === null) return err('E_NO_PATH', 'no path');
  let best = -1;
  let bestD = Infinity;
  for (let v = 0; v < sp.n; v += 1) {
    if (r.closed[v] !== 1) continue;
    let d = Infinity;
    if (positioned) {
      const p = sp.pos(v) as XY;
      for (const q of tpos as XY[]) {
        const e = (p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y);
        if (e < d) d = e;
      }
    } else {
      d = (h as (v: number) => number)(v);
    }
    if (d < bestD || (d === bestD && best !== -1 && r.dist[v] < r.dist[best])) {
      best = v;
      bestD = d;
    }
  }
  return best === -1 ? err('E_NO_PATH', 'no path') : err('E_NO_PATH', 'no path', pathTo(r, best, sp));
}

/** The shortest path from any source to any target by Dijkstra's search. RangeError on a malformed graph or node. */
export function dijkstra(g: SearchGraph | CostRaster, sources: number | readonly number[], targets: number | readonly number[]): KernelResult<SearchPath> {
  return search(g, sources, targets, null);
}

/**
 * The shortest path by A*, `heuristic(v)` a lower bound (consistent, finite, ≥ 0) of v's remaining cost to the nearest
 * target. Omitted: on a raster, the Euclidean distance to the nearest target's centre times the least cell cost
 * (admissible and consistent: every step costs at least that cost times its length); on a graph, 0 (Dijkstra's order).
 */
export function astar(
  g: SearchGraph | CostRaster,
  sources: number | readonly number[],
  targets: number | readonly number[],
  heuristic?: (v: number) => number,
): KernelResult<SearchPath> {
  if (heuristic !== undefined) return search(g, sources, targets, heuristic);
  if (!isRaster(g)) return search(g, sources, targets, null);
  const sp = rasterSpace(g);
  let least = Infinity;
  for (let i = 0; i < g.cost.length; i += 1) if (g.cost[i] < least) least = g.cost[i];
  if (!(least < Infinity) || least < 0) least = 0;
  const tpos = nodeList(targets, sp.n, 'target').map((t) => sp.pos(t) as XY);
  const h = (v: number): number => {
    const p = sp.pos(v) as XY;
    let d = Infinity;
    for (const q of tpos) {
      const e = Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));
      if (e < d) d = e;
    }
    // A path runs centre to centre, at least that far, and every cm of it costs at least the least cell cost.
    return d * least;
  };
  return search(g, sources, targets, h);
}

/** Dijkstra's full shortest-path tree from the sources: per node its distance (+∞ unreached) and predecessor (−1). */
export function dijkstraTree(g: SearchGraph | CostRaster, sources: number | readonly number[]): { dist: Float64Array; prev: Int32Array } {
  const sp = spaceOf(g);
  const r = run(sp, nodeList(sources, sp.n, 'source'), null, null);
  return { dist: r.dist, prev: r.prev };
}

/** A graph in compressed rows from an edge list (each [from, to, weight]), edges kept in their given order per node. */
export function graphFromEdges(n: number, edges: readonly (readonly [number, number, number])[], xy?: Float64Array): SearchGraph {
  if (!(Number.isInteger(n) && n >= 0)) throw new RangeError('graphFromEdges: n must be a whole number');
  const offsets = new Int32Array(n + 1);
  for (const [a, b] of edges) {
    if (!(Number.isInteger(a) && a >= 0 && a < n && Number.isInteger(b) && b >= 0 && b < n)) throw new RangeError('graphFromEdges: an edge end is not a node');
    offsets[a + 1] += 1;
  }
  for (let v = 0; v < n; v += 1) offsets[v + 1] += offsets[v];
  const fill = offsets.slice(0, n);
  const targets = new Int32Array(edges.length);
  const weights = new Float64Array(edges.length);
  for (const [a, b, w] of edges) {
    targets[fill[a]] = b;
    weights[fill[a]] = w;
    fill[a] += 1;
  }
  return xy === undefined ? { n, offsets, targets, weights } : { n, offsets, targets, weights, xy };
}
