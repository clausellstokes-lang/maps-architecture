// The field T and its stage threshold (§4.2 S3 (6), §4.4 S5a; M0-c-01). T is one multi-source Dijkstra from the
// plaza(s) over (3)'s lattice — the plaza's interior nodes and its attach nodes at 0 — with the road multiplier 1/a on
// the lattice edges of the gate routes (a = stage 1's regime row, walled core 1.3; a = 1 gives the terrain-only field
// the pick contour reads) and the water pull: every edge's cost × (1 − w_water · q(x)), q at the edge's midpoint — a
// soft term (§4.5's contract), so at weight 0 the field is byte-identical to the field without it. The road set is a
// set of edges, so the field is a function of the lattice and the routes alone, never of the routes' order. The
// threshold t sorts the land nodes by T (ties by index) and accumulates their cell areas to the stage's land, exact to
// one cell; capped at the largest T the nucleus reaches inside the frame (the shortfall reported). A node inside water
// is never land (a deck's nodes included). Choices: C-XXXX.
import { dijkstraTree } from '@plat/kernel';
import { quot, type XY } from './geom.js';
import type { Field, GateRoute, Lattice, Threshold } from './types.js';

/** S3 (6)'s water pull (item 111 (b)): w_water and q(x) ∈ [0, 1]; a soft term, byte-identical at weight 0. */
export interface WaterPull {
  weight: number;
  q(p: XY): number;
}

/** The field's options: the water pull (absent: the term is not applied). */
export interface FieldOptions {
  pull?: WaterPull;
}

/** The field's sources: the plaza(s)' interior nodes and attach nodes (§4.2 S3 (6) "from the plaza(s)"). */
export function fieldSources(lattice: Lattice): number[] {
  const seen = new Uint8Array(lattice.points.length);
  const out: number[] = [];
  const add = (i: number): void => {
    if (seen[i] === 1) return;
    seen[i] = 1;
    out.push(i);
  };
  for (const i of lattice.reservedNodes) add(i);
  for (const list of lattice.attachNodes) for (const i of list) add(i);
  out.sort((a, b) => a - b);
  return out;
}

/** The road set of the routes: both directions of every lattice edge a route uses, by graph edge. */
export function roadSet(lattice: Lattice, routes: readonly Pick<GateRoute, 'nodes'>[]): Uint8Array {
  const road = new Uint8Array(lattice.graph.targets.length);
  const mark = (u: number, v: number): void => {
    for (let d = 0; d < 6; d += 1) {
      if (lattice.adjacency[6 * u + d] === v) {
        const e = lattice.slot[6 * u + d];
        if (e !== -1) road[e] = 1;
        return;
      }
    }
    throw new RangeError(`roadSet: nodes ${String(u)} and ${String(v)} are not lattice neighbours`);
  };
  for (const r of routes) {
    for (let k = 1; k < r.nodes.length; k += 1) {
      mark(r.nodes[k - 1], r.nodes[k]);
      mark(r.nodes[k], r.nodes[k - 1]);
    }
  }
  return road;
}

/**
 * The field T (§4.2 S3 (6)): multi-source Dijkstra from the plaza over the lattice, the road multiplier 1/`a` on the
 * routes' edges, the water pull when given. Per node its cost (+∞ unreached).
 */
export function fieldT(lattice: Lattice, routes: readonly Pick<GateRoute, 'nodes'>[], a: number, opts: FieldOptions = {}): Field {
  if (!(a >= 1 && a < Infinity)) throw new RangeError(`fieldT: the anisotropy ratio a is ≥ 1 and finite, got ${String(a)}`);
  const g = lattice.graph;
  const road = roadSet(lattice, routes);
  const roadFactor = quot(1, a, 'count', 'road multiplier');
  const weights = new Float64Array(g.weights.length);
  const pull = opts.pull;
  if (pull !== undefined && !(pull.weight >= 0 && pull.weight < 1)) throw new RangeError(`fieldT: the water-pull weight lies in [0, 1), got ${String(pull.weight)}`);
  for (let u = 0; u < g.n; u += 1) {
    for (let e = g.offsets[u]; e < g.offsets[u + 1]; e += 1) {
      let w = g.weights[e];
      if (road[e] === 1) w *= roadFactor;
      if (pull !== undefined) {
        const p = lattice.points[u];
        const q = lattice.points[g.targets[e]];
        w *= 1 - pull.weight * pull.q({ x: (p.x + q.x) * 0.5, y: (p.y + q.y) * 0.5 });
      }
      weights[e] = w;
    }
  }
  const tree = dijkstraTree({ n: g.n, offsets: g.offsets, targets: g.targets, weights }, fieldSources(lattice));
  return { lattice, T: tree.dist, road, a };
}

/**
 * t for a stage's land (§4.2 S3 (6); §4.4 S5a): the land nodes (interior, reached) sorted by T, ties by index, their
 * cell areas accumulated to the nearest whole cell of `areaCm2`; capped at the largest T reached.
 */
export function stageThreshold(field: Field, areaCm2: number): Threshold {
  const { lattice, T } = field;
  const cell = lattice.cellAreaCm2;
  const nodes: number[] = [];
  for (let i = 0; i < T.length; i += 1) if (lattice.interior[i] === 1 && lattice.water[i] === 0 && T[i] < Infinity) nodes.push(i);
  nodes.sort((a, b) => T[a] - T[b] || a - b);
  const want = Math.max(1, Math.round(quot(areaCm2, cell, 'area', 'threshold')));
  if (nodes.length === 0) return { t: 0, landCm2: 0, askedCm2: areaCm2, capped: true, shortfallCm2: areaCm2 };
  if (want > nodes.length) {
    const land = nodes.length * cell;
    return { t: T[nodes[nodes.length - 1]], landCm2: land, askedCm2: areaCm2, capped: true, shortfallCm2: areaCm2 - land };
  }
  const t = T[nodes[want - 1]];
  let count = want;
  while (count < nodes.length && T[nodes[count]] <= t) count += 1;
  return { t, landCm2: count * cell, askedCm2: areaCm2, capped: false, shortfallCm2: 0 };
}
