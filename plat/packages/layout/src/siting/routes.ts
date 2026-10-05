// The gate routes, solved and not committed (§4.2 S3 (5); M0-c-01): for every pick, the route from its plaza's attach
// point through the pick to the frame at its bearing — the plaza-rooted Dijkstra tree to the pick (one tree, rooted at
// every attach node, which S4 reuses for its own plaza-anchored routes, §4.3), heap A* beyond it to the frame's rim
// nodes with S4's cost function (§4.3). The pick's bearing, when none was requested, is the least-cost outward
// direction from the pick to the frame: the direction to the rim node the A* reaches. route.nodes is charged (§5.1 (5),
// C-0085): the tree's settled nodes (`PlazaTree.settled`) and every node each A* labels (`charged`); a route whose search reaches the counter's limit
// takes F-ROUTE's `unserved` rung, reported `work_cut` with the count, as does a route with no path (`unserved`).
import { astar, dijkstraTree, dmath } from '@plat/kernel';
import { bearingCdeg, PI } from './geom.js';
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
class WorkLimitReached extends Error {
  constructor(readonly count: number) {
    super('route.nodes reached');
  }
}

/** The distance from p to the frame's nearest side (≥ 0 inside the frame). */
function toFrame(lattice: Lattice, x: number, y: number): number {
  const f = lattice.frame;
  return Math.max(0, Math.min(x - f.minX, f.maxX - x, y - f.minY, f.maxY - y));
}

/** The rim node nearest the point where the ray from (x, y) at the compass bearing meets the frame. */
function rimAtBearing(lattice: Lattice, x: number, y: number, bearing: number): number {
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

/**
 * §4.2 S3 (5)'s gate routes for `picks` over the plaza-rooted `tree`: each the tree path from its attach node to the
 * pick, then heap A* beyond the pick to the frame. Returns the solved routes in pick order and the unserved ones.
 */
export function gateRoutes(tree: PlazaTree, picks: readonly GatePick[], opts: RouteOptions = {}): { routes: GateRoute[]; unserved: UnservedRoute[]; charged: number } {
  const lattice = tree.lattice;
  const limit = opts.nodeLimit ?? Infinity;
  const roots = lattice.attachNodes[opts.reservation ?? 0];
  const rimNodes: number[] = [];
  for (let i = 0; i < lattice.points.length; i += 1) if (lattice.rim[i] === 1) rimNodes.push(i);
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
    const targets = req === undefined ? rimNodes : [rimAtBearing(lattice, p0.x, p0.y, req)];
    const tp = req === undefined ? null : lattice.points[targets[0]];
    let count = 0;
    const h = (v: number): number => {
      count += 1;
      if (count >= limit) throw new WorkLimitReached(count);
      const p = lattice.points[v];
      if (tp !== null) return lattice.minCostPerCm * Math.sqrt((p.x - tp.x) * (p.x - tp.x) + (p.y - tp.y) * (p.y - tp.y));
      return lattice.minCostPerCm * Math.max(0, toFrame(lattice, p.x, p.y) - lattice.rimInsetCm);
    };
    let out;
    try {
      out = astar(lattice.graph, pick.node, targets, h);
    } catch (e) {
      if (e instanceof WorkLimitReached) {
        charged += e.count;
        unserved.push({ ordinal: pick.ordinal, code: 'work_cut', count: e.count, limit });
        continue;
      }
      throw e;
    }
    charged += count;
    if (!out.ok) {
      unserved.push({ ordinal: pick.ordinal, code: 'unserved', count, limit });
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
      charged: count,
    });
  }
  return { routes, unserved, charged };
}
