// The arterial graph (M0-c-03; §4.3 *One graph, then one smoothing*): "all routes are solved first on the lattice; the
// arterial graph is the union of the lattice edges they use, each carrying its multiplicity (how many routes share it).
// The graph is split into chains at every node of degree ≠ 2 and at every pinned node (gates, attach points, deck ends,
// landings); junctions closer than 8 m are merged on the graph". Readings C-0234 (3):
// * a node is a route point, keyed by its exact position; its pin is the first route's that names one (route order);
// * a junction is a node of degree ≠ 2 or a pinned node; two junctions closer than `ways.json` `graph/junctionMergeM`
//   merge into one, nearest pairs first: into the pinned one where one is pinned, else into the one of higher degree
//   (ties: the lower, then leftmost point); two pinned junctions, or a gate and any junction, are kept apart and
//   reported (a gate carries exactly its road out and its street in, §4.3 *Routes*);
// * the routes are rewritten through the merge (a merged point becomes its keeper, a repeated point closes a loop that
//   is cut out) and the graph rebuilt from them, so every chain is a run of whole route edges.
import type { LatticePoint } from '@plat/kernel';
import type { ArterialGraph, Chain, GraphEdge, GraphNode, JunctionKeptApart, JunctionMerge, RoutePoint, S4Route } from './types.js';

/** The key of a point (its exact position). */
export function pointKey(p: { readonly x: number; readonly y: number }): string {
  return `${String(p.x)},${String(p.y)}`;
}

function len(a: LatticePoint, b: LatticePoint): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/** Lower, then leftmost (§6.3's canonical vertex order). */
function lowerLeft(a: LatticePoint, b: LatticePoint): number {
  return a.y - b.y || a.x - b.x;
}

/** The nodes and edges of the union of the routes' consecutive point pairs. */
function union(routes: readonly S4Route[]): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const byKey = new Map<string, number>();
  const edges: GraphEdge[] = [];
  const edgeKey = new Map<string, number>();
  const nodeOf = (p: RoutePoint): number => {
    const k = pointKey(p.at);
    let i = byKey.get(k);
    if (i === undefined) {
      i = nodes.length;
      byKey.set(k, i);
      nodes.push({ at: p.at, pin: p.pin ?? null, pinId: p.pinId ?? null, pinOrdinal: p.pinOrdinal ?? 0, held: p.held === true, edges: [] });
    } else {
      const n = nodes[i];
      if (n.pin === null && p.pin !== undefined) {
        n.pin = p.pin;
        n.pinId = p.pinId ?? null;
        n.pinOrdinal = p.pinOrdinal ?? 0;
      }
      if (p.held === true) n.held = true;
    }
    return i;
  };
  routes.forEach((r, ri) => {
    const spanAt = new Map<number, string>();
    for (const s of r.spans) spanAt.set(s.at, s.bridge);
    let prev = -1;
    r.points.forEach((p, pi) => {
      const v = nodeOf(p);
      if (prev !== -1 && prev !== v) {
        const a = Math.min(prev, v);
        const b = Math.max(prev, v);
        const k = `${String(a)}:${String(b)}`;
        let e = edgeKey.get(k);
        if (e === undefined) {
          e = edges.length;
          edgeKey.set(k, e);
          edges.push({ a, b, routes: [], span: null, lengthCm: len(nodes[a].at, nodes[b].at) });
          nodes[a].edges.push(e);
          nodes[b].edges.push(e);
        }
        const edge = edges[e];
        if (edge.routes[edge.routes.length - 1] !== ri) edge.routes.push(ri);
        const span = spanAt.get(pi - 1);
        if (span !== undefined && edge.span === null) edge.span = span;
      }
      prev = v;
    });
  });
  return { nodes, edges };
}

function isJunction(n: GraphNode): boolean {
  return n.pin !== null || n.edges.length !== 2;
}

/**
 * The junction merge (see the header): which node each node is merged into (itself when kept), the merges made and the
 * pairs kept apart.
 */
function mergePlan(nodes: readonly GraphNode[], mergeCm: number): { rep: Int32Array; merges: JunctionMerge[]; keptApart: JunctionKeptApart[] } {
  const rep = new Int32Array(nodes.length);
  for (let i = 0; i < nodes.length; i += 1) rep[i] = i;
  const find = (i: number): number => {
    let r = i;
    while (rep[r] !== r) r = rep[r];
    return r;
  };
  const js: number[] = [];
  for (let i = 0; i < nodes.length; i += 1) if (isJunction(nodes[i])) js.push(i);
  const limit2 = mergeCm * mergeCm;
  const pairs: { i: number; j: number; d2: number }[] = [];
  for (let a = 0; a < js.length; a += 1) {
    for (let b = a + 1; b < js.length; b += 1) {
      const p = nodes[js[a]].at;
      const q = nodes[js[b]].at;
      const dx = q.x - p.x;
      const dy = q.y - p.y;
      if (Math.abs(dx) >= mergeCm || Math.abs(dy) >= mergeCm) continue;
      const d2 = dx * dx + dy * dy;
      if (d2 < limit2) pairs.push({ i: js[a], j: js[b], d2 });
    }
  }
  pairs.sort((u, v) => u.d2 - v.d2 || u.i - v.i || u.j - v.j);
  const merges: JunctionMerge[] = [];
  const keptApart: JunctionKeptApart[] = [];
  for (const { i, j, d2 } of pairs) {
    const ri = find(i);
    const rj = find(j);
    if (ri === rj) continue;
    const a = nodes[ri];
    const b = nodes[rj];
    const dist = Math.sqrt(d2);
    if (a.pin === 'gate' || b.pin === 'gate') {
      keptApart.push({ a: nodes[i].at, b: nodes[j].at, distanceCm: dist, why: 'gate' });
      continue;
    }
    if (a.pin !== null && b.pin !== null) {
      keptApart.push({ a: nodes[i].at, b: nodes[j].at, distanceCm: dist, why: 'both_pinned' });
      continue;
    }
    let keep: number;
    if (a.pin !== null) keep = ri;
    else if (b.pin !== null) keep = rj;
    else if (a.edges.length !== b.edges.length) keep = a.edges.length > b.edges.length ? ri : rj;
    else keep = lowerLeft(a.at, b.at) <= 0 ? ri : rj;
    const gone = keep === ri ? rj : ri;
    rep[gone] = keep;
    merges.push({ kept: nodes[keep].at, merged: nodes[gone].at, distanceCm: dist });
  }
  for (let i = 0; i < nodes.length; i += 1) rep[i] = find(i);
  return { rep, merges, keptApart };
}

/** A route rewritten through the merge: points mapped to their keepers, repeats removed, loops cut out, spans re-found. */
function rewrite(r: S4Route, nodes: readonly GraphNode[], byKey: ReadonlyMap<string, number>, rep: Int32Array): S4Route {
  const mapped: RoutePoint[] = r.points.map((p) => {
    const i = byKey.get(pointKey(p.at)) as number;
    const k = rep[i];
    if (k === i) return p;
    const n = nodes[k];
    return {
      at: n.at,
      ...(n.pin === null ? {} : { pin: n.pin, ...(n.pinId === null ? {} : { pinId: n.pinId }), pinOrdinal: n.pinOrdinal }),
      ...(p.held === true || n.held ? { held: true } : {}),
    };
  });
  // Consecutive repeats, then loops: a point met again cuts out everything between its two visits.
  const out: RoutePoint[] = [];
  const seen = new Map<string, number>();
  for (const p of mapped) {
    const k = pointKey(p.at);
    const at = seen.get(k);
    if (at !== undefined) {
      for (let q = at + 1; q < out.length; q += 1) seen.delete(pointKey(out[q].at));
      out.length = at + 1;
      continue;
    }
    seen.set(k, out.length);
    out.push(p);
  }
  const spans: { at: number; bridge: string }[] = [];
  for (const s of r.spans) {
    const a = pointKey(r.points[s.at].at);
    const b = pointKey(r.points[s.at + 1].at);
    for (let i = 0; i + 1 < out.length; i += 1) {
      if (pointKey(out[i].at) === a && pointKey(out[i + 1].at) === b) {
        spans.push({ at: i, bridge: s.bridge });
        break;
      }
    }
  }
  return { ...r, points: out, spans };
}

/** The chains of a graph: split at every node of degree ≠ 2 and at every pinned node. */
function chainsOf(nodes: readonly GraphNode[], edges: readonly GraphEdge[]): Chain[] {
  const used = new Uint8Array(edges.length);
  const chains: Chain[] = [];
  const walk = (start: number, e0: number): void => {
    const ns = [start];
    const es: number[] = [];
    let v = start;
    let e = e0;
    for (;;) {
      used[e] = 1;
      es.push(e);
      const w = edges[e].a === v ? edges[e].b : edges[e].a;
      ns.push(w);
      v = w;
      const n = nodes[w];
      if (isJunction(n) || w === start) break;
      const next = n.edges[0] === e ? n.edges[1] : n.edges[0];
      if (used[next] === 1) break;
      e = next;
    }
    const routes = new Set<number>();
    let m = 0;
    let lengthCm = 0;
    let span: string | null = null;
    for (const x of es) {
      for (const r of edges[x].routes) routes.add(r);
      m = Math.max(m, edges[x].routes.length);
      lengthCm += edges[x].lengthCm;
      if (edges[x].span !== null) span = edges[x].span;
    }
    chains.push({ index: chains.length, nodes: ns, edges: es, multiplicity: m, routes: [...routes].sort((a, b) => a - b), span, lengthCm });
  };
  for (let v = 0; v < nodes.length; v += 1) {
    if (!isJunction(nodes[v])) continue;
    for (const e of nodes[v].edges) if (used[e] === 0) walk(v, e);
  }
  // A ring with no junction on it (never from routes whose ends are pinned): started at its lowest node.
  for (let e = 0; e < edges.length; e += 1) if (used[e] === 0) walk(edges[e].a, e);
  return chains;
}

/**
 * §4.3's arterial graph of `routes`: their union with each edge's multiplicity, the junctions closer than `mergeCm`
 * merged on the graph (see the header), split into chains.
 */
export function arterialGraph(routes: readonly S4Route[], mergeCm: number): ArterialGraph {
  const first = union(routes);
  const byKey = new Map<string, number>();
  first.nodes.forEach((n, i) => byKey.set(pointKey(n.at), i));
  const plan = mergePlan(first.nodes, mergeCm);
  const rewritten = plan.merges.length === 0 ? routes.map((r) => ({ ...r })) : routes.map((r) => rewrite(r, first.nodes, byKey, plan.rep));
  const { nodes, edges } = plan.merges.length === 0 ? first : union(rewritten);
  return { nodes, edges, chains: chainsOf(nodes, edges), routes: rewritten, merges: plan.merges, keptApart: plan.keptApart };
}

/** A chain's points in order, from its first node (or reversed). */
export function chainPoints(g: ArterialGraph, c: Chain, reversed = false): LatticePoint[] {
  const pts = c.nodes.map((n) => g.nodes[n].at);
  return reversed ? pts.reverse() : pts;
}
