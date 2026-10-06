// Class and width (M0-c-03; §4.3: "Class and width come from multiplicity and betweenness on this graph (the width
// table `ways.widths` keyed by class and rung, the class by betweenness)"; §17.1 (8): U. Brandes, "A faster algorithm
// for betweenness centrality", J. Math. Sociol. 25 (2001), and "On variants of shortest-path betweenness centrality and
// their generic computation", Social Networks 30 (2008) — edge betweenness with source and target sets). Readings
// C-0234 (6):
// * the betweenness of a chain is Brandes' edge betweenness on the chain graph (its ends the nodes, each chain an edge
//   weighted by its length) over the flows the routes carry: from every plaza attach point a route starts at to every
//   destination a route ends at (a frame end, a bridge, a landing), each pair counted once — the gates' trade to the
//   plaza (§4.3 *Trade flow*: "a way's trade weight adds up the weights of every gate … whose S4 route to the plaza
//   follows it");
// * the class: the highest class of the route parts that use the chain (the route split: inward `primary`, outward
//   `through`), and a `primary` chain that carries at least `PROMOTE_FLOWS` flows is `through` — the run several gates'
//   streets share out of the plaza is the town's main street;
// * the width: the class's `ways.json` band at the rung, `widthM.<rung>` = [lo, hi] m, at lo + (hi − lo) · (m − 1) ÷
//   (N − 1) for multiplicity m among N gate routes (lo when N ≤ 1), in whole cm; a class with no row of its own
//   (`track`, `path`: V11's rows, M1) takes the `lane` row.
import { ratio } from '@plat/kernel';
import type { BaseRung, TableView } from '@plat/tables';
import type { ArterialGraph, ChainClass, RouteClass } from './types.js';

/** The classes from the highest down (§4.3 F-ROUTE's slope order, with `secondary` in its place). */
export const CLASS_ORDER: readonly RouteClass[] = Object.freeze(['through', 'primary', 'secondary', 'track', 'path']);

/** A `primary` chain carrying at least this many plaza flows is `through` (C-0234 (6)). */
export const PROMOTE_FLOWS = 2;

/** The rank of a class (0 the highest). */
export function classRank(c: RouteClass): number {
  return CLASS_ORDER.indexOf(c);
}

/** The ways.json row a class's widths, radius and separation are read from (C-0234 (6)). */
export function wayRow(c: RouteClass): string {
  return c === 'track' || c === 'path' ? 'lane' : c;
}

/** A class's width band at the rung (cm): `ways.json` `<class>/widthM.<rung>`. */
export function widthBandCm(tables: TableView, c: RouteClass, rung: BaseRung): [number, number] {
  const [lo, hi] = tables.table('ways').pair(wayRow(c), `widthM.${rung}`);
  return [lo * 100, hi * 100];
}

/** A class's minimum radius and separation (cm): `ways.json` `<class>/minRadiusM`, `/separationM`. */
export function classGeometryCm(tables: TableView, c: RouteClass): { minRadiusCm: number; separationCm: number } {
  const t = tables.table('ways');
  return { minRadiusCm: t.num(wayRow(c), 'minRadiusM') * 100, separationCm: t.num(wayRow(c), 'separationM') * 100 };
}

/** The width a multiplicity takes inside a band among `routes` gate routes (cm, whole). */
export function widthAt(band: readonly [number, number], multiplicity: number, routes: number): number {
  if (routes <= 1 || multiplicity <= 1) return Math.round(band[0]);
  const s = ratio(Math.min(multiplicity, routes) - 1, routes - 1, 'count');
  const share = s.ok ? s.value : 0;
  return Math.round(band[0] + (band[1] - band[0]) * share);
}

/**
 * Brandes' edge betweenness on the chain graph (see the header): per chain, Σ over sources s and targets t ≠ s of
 * σ_st(chain) ÷ σ_st, shortest paths by chain length.
 */
export function chainBetweenness(g: ArterialGraph): number[] {
  const nChains = g.chains.length;
  const out = new Array<number>(nChains).fill(0);
  // The chain graph's nodes: the chains' end nodes.
  const ends = new Map<number, number>();
  const nodeOf = (v: number): number => {
    let i = ends.get(v);
    if (i === undefined) {
      i = ends.size;
      ends.set(v, i);
    }
    return i;
  };
  const adj: { to: number; chain: number; w: number }[][] = [];
  for (const c of g.chains) {
    const a = nodeOf(c.nodes[0]);
    const b = nodeOf(c.nodes[c.nodes.length - 1]);
    while (adj.length < ends.size) adj.push([]);
    if (a === b) continue;
    adj[a].push({ to: b, chain: c.index, w: c.lengthCm });
    adj[b].push({ to: a, chain: c.index, w: c.lengthCm });
  }
  const n = ends.size;
  const sources = new Set<number>();
  const targets = new Set<number>();
  for (const r of g.routes) {
    if (r.points.length === 0) continue;
    const first = ends.get(nodeIndexOf(g, r.points[0].at));
    const last = ends.get(nodeIndexOf(g, r.points[r.points.length - 1].at));
    if (r.from.kind === 'plaza' && first !== undefined) sources.add(first);
    if ((r.to.kind === 'bearing' || r.to.kind === 'bridge' || r.to.kind === 'harbour') && last !== undefined) targets.add(last);
  }
  const srcs = [...sources].sort((a, b) => a - b);
  for (const s of srcs) {
    const dist = new Float64Array(n).fill(Infinity);
    const sigma = new Float64Array(n);
    const done = new Uint8Array(n);
    const preds: { from: number; chain: number }[][] = Array.from({ length: n }, () => []);
    const order: number[] = [];
    dist[s] = 0;
    sigma[s] = 1;
    for (;;) {
      let v = -1;
      for (let i = 0; i < n; i += 1) if (done[i] === 0 && dist[i] < Infinity && (v === -1 || dist[i] < dist[v])) v = i;
      if (v === -1) break;
      done[v] = 1;
      order.push(v);
      for (const e of adj[v]) {
        const d = dist[v] + e.w;
        if (d < dist[e.to]) {
          dist[e.to] = d;
          sigma[e.to] = sigma[v];
          preds[e.to] = [{ from: v, chain: e.chain }];
        } else if (d === dist[e.to] && done[e.to] === 0) {
          sigma[e.to] += sigma[v];
          preds[e.to].push({ from: v, chain: e.chain });
        }
      }
    }
    const delta = new Float64Array(n);
    for (let k = order.length - 1; k >= 0; k -= 1) {
      const w = order[k];
      const own = targets.has(w) && w !== s ? 1 : 0;
      for (const p of preds[w]) {
        const q = ratio(sigma[p.from], sigma[w], 'count');
        const c = (q.ok ? q.value : 0) * (own + delta[w]);
        out[p.chain] += c;
        delta[p.from] += c;
      }
    }
  }
  return out;
}

function nodeIndexOf(g: ArterialGraph, p: { readonly x: number; readonly y: number }): number {
  for (let i = 0; i < g.nodes.length; i += 1) if (g.nodes[i].at.x === p.x && g.nodes[i].at.y === p.y) return i;
  return -1;
}

/** The classify options: the tables, the rung, and the number of gate routes the widths are shared among. */
export interface ClassifyOptions {
  readonly tables: TableView;
  readonly rung: BaseRung;
  /** The gate routes N (default: the larger count of inward and outward route parts). */
  readonly routes?: number;
}

/** §4.3's class and width per chain of the graph (see the header). */
export function classify(g: ArterialGraph, opts: ClassifyOptions): ChainClass[] {
  const b = chainBetweenness(g);
  let inward = 0;
  let outward = 0;
  for (const r of g.routes) {
    if (r.part === 'inward') inward += 1;
    else outward += 1;
  }
  const n = opts.routes ?? Math.max(inward, outward);
  return g.chains.map((c) => {
    let cls: RouteClass = 'path';
    for (const ri of c.routes) {
      const rc = g.routes[ri].class;
      if (classRank(rc) < classRank(cls)) cls = rc;
    }
    if (cls === 'primary' && b[c.index] >= PROMOTE_FLOWS) cls = 'through';
    return { class: cls, widthCm: widthAt(widthBandCm(opts.tables, cls, opts.rung), c.multiplicity, n), betweenness: b[c.index], multiplicity: c.multiplicity };
  });
}
