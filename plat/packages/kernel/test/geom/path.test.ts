// M0-a-10: the binary heap and Dijkstra / A* — §3.1 and the item's test: "against a brute-force reference on 10³
// random graphs; E_NO_PATH carries the closest reached point" — on graphs (compressed rows) and on cost rasters, with
// the brute force (Floyd–Warshall; reachability by breadth-first search) written here from its definition.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { BinaryHeap, astar, dijkstra, dijkstraTree, graphFromEdges, type CostRaster, type SearchGraph, type SearchPath } from '../../src/geom/index.js';
import { TIMEOUT, generator, intIn } from './support.js';

/** All-pairs shortest costs by Floyd–Warshall. */
function floyd(n: number, edges: readonly (readonly [number, number, number])[]): number[][] {
  const d = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity)));
  for (const [a, b, w] of edges) if (w < d[a][b]) d[a][b] = w;
  for (let k = 0; k < n; k += 1) for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) if (d[i][k] + d[k][j] < d[i][j]) d[i][j] = d[i][k] + d[k][j];
  return d;
}

/** The path's cost by its own edges (the cheapest parallel edge), or NaN when a step is no edge. */
function walkCost(g: SearchGraph, nodes: readonly number[]): number {
  let c = 0;
  for (let i = 0; i + 1 < nodes.length; i += 1) {
    let best = Infinity;
    for (let k = g.offsets[nodes[i]]; k < g.offsets[nodes[i] + 1]; k += 1) if (g.targets[k] === nodes[i + 1] && g.weights[k] < best) best = g.weights[k];
    if (best === Infinity) return Number.NaN;
    c += best;
  }
  return c;
}

/** A random graph with positions: n ≤ 25 nodes, integer weights at least the Euclidean edge length (A*'s heuristic stays consistent). */
function randomGraph(rnd: () => number): { n: number; edges: [number, number, number][]; xy: Float64Array; g: SearchGraph } {
  const n = intIn(rnd, 1, 25);
  const xy = new Float64Array(2 * n);
  for (let i = 0; i < 2 * n; i += 1) xy[i] = intIn(rnd, 0, 10_000);
  const m = intIn(rnd, 0, 4 * n);
  const edges: [number, number, number][] = [];
  for (let e = 0; e < m; e += 1) {
    const a = intIn(rnd, 0, n - 1);
    const b = intIn(rnd, 0, n - 1);
    const len = Math.hypot(xy[2 * a] - xy[2 * b], xy[2 * a + 1] - xy[2 * b + 1]);
    edges.push([a, b, rnd() < 0.05 ? Infinity : Math.ceil(len) + intIn(rnd, 0, 3000)]);
  }
  return { n, edges, xy, g: graphFromEdges(n, edges, xy) };
}

describe('BinaryHeap (§3.1, C-0040)', () => {
  it('pops by priority, ties by the smaller item, whatever the push order', () => {
    fc.assert(
      fc.property(fc.array(fc.tuple(fc.integer({ min: -1000, max: 1000 }), fc.integer({ min: -5, max: 5 })), { maxLength: 200 }), (pairs) => {
        const h = new BinaryHeap(1);
        for (const [item, pr] of pairs) h.push(item, pr);
        expect(h.size).toBe(pairs.length);
        const want = pairs.slice().sort((a, b) => a[1] - b[1] || a[0] - b[0]).map((x) => x[0]);
        const got: number[] = [];
        while (h.size > 0) {
          const pr = h.peekPriority();
          expect(h.peek()).toBe(want[got.length]);
          got.push(h.pop());
          expect(pr).toBe(pairs.find((x) => x[0] === got[got.length - 1] && x[1] === pr)?.[1]);
        }
        expect(got).toEqual(want);
      }),
      { numRuns: 500 },
    );
    const h = new BinaryHeap();
    expect(() => h.pop()).toThrow(RangeError);
    expect(() => h.push(1.5, 0)).toThrow(RangeError);
    expect(() => h.push(1, Number.NaN)).toThrow(RangeError);
  }, TIMEOUT);
});

describe('dijkstra and astar (§3.1)', () => {
  it('match a brute-force reference on 10³ random graphs; E_NO_PATH carries the closest reached point', () => {
    const rnd = generator(31_415);
    let noPath = 0;
    for (let t = 0; t < 1000; t += 1) {
      const { n, edges, xy, g } = randomGraph(rnd);
      const d = floyd(n, edges);
      const s = intIn(rnd, 0, n - 1);
      const goal = intIn(rnd, 0, n - 1);
      const h = (v: number): number => Math.hypot(xy[2 * v] - xy[2 * goal], xy[2 * v + 1] - xy[2 * goal + 1]);
      for (const r of [dijkstra(g, s, goal), astar(g, s, goal, h)]) {
        if (d[s][goal] < Infinity) {
          expect(r.ok).toBe(true);
          if (!r.ok) continue;
          expect(r.value.cost).toBe(d[s][goal]);
          expect(r.value.nodes[0]).toBe(s);
          expect(r.value.nodes[r.value.nodes.length - 1]).toBe(goal);
          expect(walkCost(g, r.value.nodes)).toBe(d[s][goal]);
          expect(r.value.at).toEqual({ x: xy[2 * goal], y: xy[2 * goal + 1] });
        } else {
          noPath += 1;
          expect(r.ok).toBe(false);
          if (r.ok) continue;
          expect(r.code).toBe('E_NO_PATH');
          // the closest reached point: among the nodes the source reaches, the nearest the target (ties: cheaper, then smaller id)
          const reached = [...Array(n).keys()].filter((v) => d[s][v] < Infinity);
          const dist2 = (v: number): number => (xy[2 * v] - xy[2 * goal]) ** 2 + (xy[2 * v + 1] - xy[2 * goal + 1]) ** 2;
          const best = reached.reduce((a, v) => (dist2(v) < dist2(a) || (dist2(v) === dist2(a) && d[s][v] < d[s][a]) ? v : a));
          const p = r.partial as SearchPath;
          expect(p.nodes[p.nodes.length - 1]).toBe(best);
          expect(p.cost).toBe(d[s][best]);
          expect(walkCost(g, p.nodes)).toBe(d[s][best]);
          expect(p.at).toEqual({ x: xy[2 * best], y: xy[2 * best + 1] });
        }
      }
      // the tree: every node's distance from the source
      const tree = dijkstraTree(g, s);
      for (let v = 0; v < n; v += 1) expect(tree.dist[v]).toBe(d[s][v]);
    }
    expect(noPath).toBeGreaterThan(50);
  }, TIMEOUT);

  it('E_NO_PATH breaks a tie for the closest reached point by the cheaper path, then the smaller node', () => {
    // nodes 1 and 2 lie equally far from the unreachable target 3
    const xy = new Float64Array([0, 0, 10, 10, 10, -10, 20, 0]);
    const cheaperFirst = dijkstra(graphFromEdges(4, [[0, 1, 3], [0, 2, 5]], xy), 0, 3);
    expect(cheaperFirst.ok === false && (cheaperFirst.partial as SearchPath).nodes).toEqual([0, 1]);
    const cheaperSecond = dijkstra(graphFromEdges(4, [[0, 1, 5], [0, 2, 3]], xy), 0, 3);
    expect(cheaperSecond.ok === false && (cheaperSecond.partial as SearchPath).nodes).toEqual([0, 2]);
    const even = dijkstra(graphFromEdges(4, [[0, 1, 4], [0, 2, 4]], xy), 0, 3);
    expect(even.ok === false && (even.partial as SearchPath).nodes).toEqual([0, 1]);
  });

  it('takes several sources and targets, a source that is a target costs 0, and refuses malformed input', () => {
    const g = graphFromEdges(4, [[0, 1, 5], [1, 2, 5], [3, 2, 1]]);
    expect(dijkstra(g, [0, 3], [2])).toMatchObject({ ok: true, value: { nodes: [3, 2], cost: 1 } });
    expect(dijkstra(g, 2, [2, 1])).toMatchObject({ ok: true, value: { nodes: [2], cost: 0 } });
    // no positions and no heuristic: E_NO_PATH without a closest point
    expect(dijkstra(g, 2, 0)).toEqual({ ok: false, code: 'E_NO_PATH', detail: 'no path' });
    expect(() => dijkstra(g, 7, 0)).toThrow(RangeError);
    expect(() => dijkstra(g, [], 0)).toThrow(RangeError);
    expect(() => dijkstra(graphFromEdges(2, [[0, 1, -1]]), 0, 1)).toThrow(RangeError);
    expect(() => astar(g, 0, 2, () => -1)).toThrow(RangeError);
  });

  it('on cost rasters: Dijkstra and A* agree with the graph of the same steps; walls give E_NO_PATH at the closest reached cell', () => {
    const rnd = generator(2718);
    for (let t = 0; t < 200; t += 1) {
      const cols = intIn(rnd, 1, 12);
      const rows = intIn(rnd, 1, 12);
      const cost = new Float64Array(cols * rows).map(() => (rnd() < 0.15 ? Infinity : 1 + intIn(rnd, 0, 9)));
      const diagonal = rnd() < 0.5;
      const r: CostRaster = { cols, rows, cost, diagonal, cellCm: 200, originCm: { x: -100, y: 50 } };
      // the same steps as an explicit graph
      const edges: [number, number, number][] = [];
      for (let y = 0; y < rows; y += 1) for (let x = 0; x < cols; x += 1) {
        const v = y * cols + x;
        if (!(cost[v] < Infinity)) continue;
        for (const [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1], ...(diagonal ? [[1, 1], [-1, 1], [-1, -1], [1, -1]] : [])]) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
          if (dx !== 0 && dy !== 0 && (!(cost[y * cols + nx] < Infinity) || !(cost[ny * cols + x] < Infinity))) continue;
          const u = ny * cols + nx;
          edges.push([v, u, (cost[v] + cost[u]) * 0.5 * (dx !== 0 && dy !== 0 ? Math.SQRT2 : 1) * 200]);
        }
      }
      const xy = new Float64Array(2 * cols * rows);
      for (let v = 0; v < cols * rows; v += 1) {
        xy[2 * v] = -100 + ((v % cols) + 0.5) * 200;
        xy[2 * v + 1] = 50 + (Math.floor(v / cols) + 0.5) * 200;
      }
      const g = graphFromEdges(cols * rows, edges, xy);
      const s = intIn(rnd, 0, cols * rows - 1);
      const goal = intIn(rnd, 0, cols * rows - 1);
      const ref = dijkstra(g, s, goal);
      for (const res of [dijkstra(r, s, goal), astar(r, s, goal)]) {
        expect(res.ok).toBe(ref.ok);
        if (res.ok && ref.ok) {
          expect(Math.abs(res.value.cost - ref.value.cost)).toBeLessThanOrEqual(1e-9 * ref.value.cost);
          expect(res.value.at).toEqual(ref.value.at);
        } else if (!res.ok && !ref.ok) {
          expect(res.code).toBe('E_NO_PATH');
          expect((res.partial as SearchPath).at).toEqual((ref.partial as SearchPath).at);
        }
      }
    }
  }, TIMEOUT);
});
