// The gate routes, solved and not committed (§4.2 S3 (5); M0-c-01): for every pick, the route from its plaza's attach
// point through the pick to the frame at its bearing — the plaza-rooted Dijkstra tree to the pick (one tree, rooted at
// every attach node, which S4 reuses for its own plaza-anchored routes, §4.3), heap A* beyond it to the frame's rim
// nodes with S4's cost function (§4.3). The pick's bearing, when none was requested, is the least-cost outward
// direction from the pick to the frame: the direction to the rim node the A* reaches. route.nodes is charged (§5.1 (5),
// C-0085): the tree's settled nodes (`PlazaTree.settled`) and every node each A* labels (`charged`); a route whose search reaches the counter's limit
// takes F-ROUTE's `unserved` rung, reported `work_cut` with the count, as does a route with no path (`unserved`).
// A route is a simple path (S4 commits it as one way, §4.3): when the least-cost outward path steps back onto the
// inward part (an A → pick → A spur), the A* beyond the pick is solved again with the inward nodes before the pick
// impassable, so the route still runs through the pick; with no such path the route is `unserved` (C-0249).
import { astar, dijkstraTree, dmath } from '@plat/kernel';
import { bearingCdeg, PI, type XY } from './geom.js';
import { meetsWater } from './lattice.js';
import type { GatePick, GateRoute, Lattice, PlazaTree, UnservedRoute } from './types.js';

/** The plaza-rooted Dijkstra tree over the lattice from every attach node of the plaza (§4.2 S3 (5)). */
export function plazaTree(lattice: Lattice, reservation = 0): PlazaTree {
  const roots = lattice.attachNodes[reservation];
  if (roots === undefined || roots.length === 0) throw new RangeError('plazaTree: the plaza has no attach node');
  const t = dijkstraTree(lattice.graph, roots);
  let settled = 0;
  for (let i = 0; i < t.dist.length; i += 1) if (t.dist[i] < Infinity) settled += 1;
  return { lattice, dist: t.dist, prev: t.prev, settled };
}

/** The routes' options: route.nodes' per-route limit (§5.1 (5); default unbounded) and the plaza's attach points. */
export interface RouteOptions {
  nodeLimit?: number;
  reservation?: number;
}

/** A search stopped at the work limit (F-WORK): the A*'s heuristic throws it once the labelled count reaches the limit. */
export class WorkLimitReached extends Error {
  constructor(readonly count: number) {
    super('route.nodes reached');
  }
}

/** The lattice's graph with every edge at a node marked in `blocked` impassable (weight Infinity). */
function blockedGraph(lattice: Lattice, blocked: Uint8Array): Lattice['graph'] {
  const g = lattice.graph;
  const weights = new Float64Array(g.weights.length);
  for (let u = 0; u < g.n; u += 1) {
    for (let e = g.offsets[u]; e < g.offsets[u + 1]; e += 1) weights[e] = blocked[u] === 1 || blocked[g.targets[e]] === 1 ? Infinity : g.weights[e];
  }
  return { ...g, weights };
}

/** True when the outward path (from the pick) steps on a node of the inward part other than the pick. */
function revisits(inward: readonly number[], outward: readonly number[]): boolean {
  const seen = new Set(inward);
  for (let k = 1; k < outward.length; k += 1) if (seen.has(outward[k])) return true;
  return false;
}

/** The distance from p to the frame's nearest side (≥ 0 inside the frame). */
function toFrame(lattice: Lattice, x: number, y: number): number {
  const f = lattice.frame;
  return Math.max(0, Math.min(x - f.minX, f.maxX - x, y - f.minY, f.maxY - y));
}

/** The rim node nearest the point where the ray from (x, y) at the compass bearing meets the frame. */
export function rimAtBearing(lattice: Lattice, x: number, y: number, bearing: number): number {
  const th = (9_000 - bearing) * (PI / 18_000);
  // Walk the ray in one-spacing steps until it leaves the frame.
  const f = lattice.frame;
  const dx = dmath.cos(th);
  const dy = dmath.sin(th);
  let px = x;
  let py = y;
  while (px > f.minX && px < f.maxX && py > f.minY && py < f.maxY) {
    px += dx * lattice.spacingCm;
    py += dy * lattice.spacingCm;
  }
  let best = -1;
  let bestD = Infinity;
  for (let i = 0; i < lattice.points.length; i += 1) {
    if (lattice.rim[i] !== 1) continue;
    const p = lattice.points[i];
    const d = (p.x - px) * (p.x - px) + (p.y - py) * (p.y - py);
    if (d < bestD) {
      best = i;
      bestD = d;
    }
  }
  return best;
}

/** The frame's rim nodes in lattice order: the outward A*'s targets when no single rim node is requested. */
function rimNodes(lattice: Lattice): number[] {
  const rim: number[] = [];
  for (let i = 0; i < lattice.points.length; i += 1) if (lattice.rim[i] === 1) rim.push(i);
  return rim;
}

/** An outward A*'s heuristic and the count of the nodes it has labelled (route.nodes' charge, §5.1 (5), C-0085). */
interface OutwardSearch {
  readonly h: (v: number) => number;
  count: number;
}

/**
 * The outward A*'s heuristic: `minCostPerCm` × the straight distance from the node to `target` (the rim node at a
 * requested bearing), or with no target to the rim band (the distance to the frame less `rimInsetCm`, never below 0).
 * Every call counts one labelled node; at `limit` it throws WorkLimitReached with the count (F-WORK).
 */
function outwardHeuristic(lattice: Lattice, target: XY | null, limit: number): OutwardSearch {
  const search: OutwardSearch = {
    count: 0,
    h: (v: number): number => {
      search.count += 1;
      if (search.count >= limit) throw new WorkLimitReached(search.count);
      const p = lattice.points[v];
      if (target !== null) return lattice.minCostPerCm * Math.sqrt((p.x - target.x) * (p.x - target.x) + (p.y - target.y) * (p.y - target.y));
      return lattice.minCostPerCm * Math.max(0, toFrame(lattice, p.x, p.y) - lattice.rimInsetCm);
    },
  };
  return search;
}

/**
 * §4.2 S3 (5)'s gate routes for `picks` over the plaza-rooted `tree`: each the tree path from its attach node to the
 * pick, then heap A* beyond the pick to the frame. Returns the solved routes in pick order and the unserved ones.
 */
export function gateRoutes(tree: PlazaTree, picks: readonly GatePick[], opts: RouteOptions = {}): { routes: GateRoute[]; unserved: UnservedRoute[]; charged: number } {
  const lattice = tree.lattice;
  const limit = opts.nodeLimit ?? Infinity;
  const roots = lattice.attachNodes[opts.reservation ?? 0];
  const rim = rimNodes(lattice);
  const routes: GateRoute[] = [];
  const unserved: UnservedRoute[] = [];
  let charged = 0;
  for (const pick of picks) {
    if (!(tree.dist[pick.node] < Infinity)) {
      unserved.push({ ordinal: pick.ordinal, code: 'unserved', count: 0, limit });
      continue;
    }
    // The tree path, attach node → pick.
    const inward: number[] = [];
    for (let v = pick.node; v !== -1; v = tree.prev[v]) inward.push(v);
    inward.reverse();
    const attachIndex = roots.indexOf(inward[0]);
    // Heap A* beyond the pick to the frame (to the rim node at the requested bearing when there is one).
    const req = pick.requestedBearingCdeg;
    const p0 = lattice.points[pick.node];
    const targets = req === undefined ? rim : [rimAtBearing(lattice, p0.x, p0.y, req)];
    const search = outwardHeuristic(lattice, req === undefined ? null : lattice.points[targets[0]], limit);
    let out;
    try {
      out = astar(lattice.graph, pick.node, targets, search.h);
      // A spur at the pick (the outward path stepping back onto the inward part): solved again with the inward nodes
      // before the pick impassable, so the joined route is a simple path through the pick (C-0249).
      if (out.ok && revisits(inward, out.value.nodes)) {
        const blocked = new Uint8Array(lattice.points.length);
        for (let k = 0; k < inward.length - 1; k += 1) blocked[inward[k]] = 1;
        out = astar(blockedGraph(lattice, blocked), pick.node, targets, search.h);
      }
    } catch (e) {
      if (e instanceof WorkLimitReached) {
        charged += e.count;
        unserved.push({ ordinal: pick.ordinal, code: 'work_cut', count: e.count, limit });
        continue;
      }
      throw e;
    }
    charged += search.count;
    if (!out.ok) {
      unserved.push({ ordinal: pick.ordinal, code: 'unserved', count: search.count, limit });
      continue;
    }
    const outward = out.value.nodes;
    const end = lattice.points[outward[outward.length - 1]];
    const bearing = req ?? bearingCdeg(end.x - p0.x, end.y - p0.y);
    const nodes = inward.concat(outward.slice(1));
    routes.push({
      ordinal: pick.ordinal,
      attach: lattice.costs.reservations[opts.reservation ?? 0].attach[attachIndex],
      attachIndex,
      nodes,
      pickAt: inward.length - 1,
      bearingCdeg: bearing,
      cost: tree.dist[pick.node] + out.value.cost,
      charged: search.count,
    });
  }
  return { routes, unserved, charged };
}

/**
 * A gate route's outward stretch re-solved outside the stage (§4.2 S3 (7) with §4.3's wallCrossingPenalty, "only at
 * gates"; C-0201 (6)): from the node just outside its gate, heap A* to the frame with every selected node impassable,
 * so the road leaves the walled stage once, at its gate. The inward part up to the gate is kept; the bearing becomes
 * the direction from the gate to the rim node reached. Null when no such path exists or the search reaches `limit`.
 */
export function rerouteOutside(
  lattice: Lattice,
  route: GateRoute,
  gateIndex: number,
  selected: Uint8Array,
  gateAt: { x: number; y: number },
  limit = Infinity,
): { route: GateRoute; charged: number } | null {
  const g = lattice.graph;
  const from = route.nodes[gateIndex + 1];
  const targets = rimNodes(lattice);
  const search = outwardHeuristic(lattice, null, limit);
  let out;
  try {
    out = astar(blockedGraph(lattice, selected), from, targets, search.h);
  } catch (e) {
    if (e instanceof WorkLimitReached) return null;
    throw e;
  }
  if (!out.ok) return null;
  const outward = out.value.nodes;
  const end = lattice.points[outward[outward.length - 1]];
  const nodes = route.nodes.slice(0, gateIndex + 1).concat(outward);
  let cost = 0;
  for (let k = 1; k < nodes.length; k += 1) {
    const u = nodes[k - 1];
    const v = nodes[k];
    for (let d = 0; d < 6; d += 1) if (lattice.adjacency[6 * u + d] === v) cost += g.weights[lattice.slot[6 * u + d]];
  }
  return {
    route: { ...route, nodes, pickAt: Math.min(route.pickAt, gateIndex), bearingCdeg: bearingCdeg(end.x - gateAt.x, end.y - gateAt.y), cost, charged: route.charged + search.count },
    charged: search.count,
  };
}

/**
 * §4.2 S3 (7)'s deck rule: a route whose first point at T = t₁ falls on a deck edge with the gate's point in the
 * water (`s3Slice` reads `inWater`) is re-solved whole as (5) solves it — the plaza-rooted Dijkstra tree to its pick, heap A*
 * beyond it — with every deck edge whose ends straddle the stage-1 boundary (one end in `selected`, one not) excluded,
 * so its first exit is a ground edge and its gate stands on land. The tree is the blocked graph's own (its settled
 * nodes charged with the A*'s, route.nodes, C-0201 (6)); a pick the re-solve cannot serve is `unserved` (F-ROUTE,
 * §5.2), or `work_cut` at `limit`. C-0365.
 */
export function resolveOffDecks(lattice: Lattice, pick: GatePick, selected: Uint8Array, limit = Infinity): { routes: GateRoute[]; unserved: UnservedRoute[]; charged: number } {
  const g = lattice.graph;
  const weights = Float64Array.from(g.weights);
  for (let u = 0; u < g.n; u += 1) {
    for (let e = g.offsets[u]; e < g.offsets[u + 1]; e += 1) {
      const v = g.targets[e];
      if (selected[u] !== selected[v] && weights[e] < Infinity && meetsWater(lattice, lattice.points[u], lattice.points[v])) weights[e] = Infinity;
    }
  }
  const tree = plazaTree({ ...lattice, graph: { ...g, weights } });
  const solved = gateRoutes(tree, [pick], { nodeLimit: limit });
  return { routes: solved.routes, unserved: solved.unserved, charged: tree.settled + solved.charged };
}
