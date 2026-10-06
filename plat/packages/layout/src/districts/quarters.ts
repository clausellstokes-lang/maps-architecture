// The quarter merge tree (M0-e-04; §4.5 *Quarters* (MFP-10, VIS-4; J-P2, J-P28, J-I1); §9.1 `QuarterNode`; readings
// C-0245 (13), (14)): built once per model after typing — from one leaf per district it repeatedly merges the adjacent
// pair of nodes with the smallest cost, combined area + `familyCostHa` (1 000 ha) when their kinds are of different
// families + `barrierCostHa` (10 000 ha) when a wall or water barrier separates them, until one root remains; ties by
// id (the pair's smaller id, then its larger). The quarters are the tree's cut at min(N_q, L) nodes — the roots after
// L − min(N_q, L) merges (`cityCut`); every district stands alone when N_q ≥ L.
//   * A merged node's families are its members' (a set); two nodes are "of different families" when their sets share
//     none. Two nodes are adjacent when a member of one is adjacent to a member of the other; a barrier separates them
//     when every such adjacency is across one (C-0245 (13)).
//   * A model whose districts fall apart into parts no adjacency joins merges its parts' roots last, at the barrier
//     cost (as if separated), so one root always remains.
//   * Costs are integers in cm² (1 ha = 10⁸ cm²), so ties are exact.
//   * `name` and `spine` are S13a's (§9.1: "named by S13a"; the label spine §9.3's): '' and [] at M0 (C-0245 (14)).
import type { Id } from '@plat/model';
import type { QuarterNode } from './types.js';

/** One district as the tree reads it. */
export interface QuarterLeaf {
  readonly id: Id;
  readonly areaCm2: number;
  readonly family: string;
}

/** One adjacency of two districts (by index into the leaves), `separated` when it is across a wall or water. */
export interface QuarterAdjacency {
  readonly a: number;
  readonly b: number;
  readonly separated: boolean;
}

/** The tree's options. */
export interface QuarterOptions {
  /** N_q (§4.5): the cut keeps min(N_q, L) nodes. */
  readonly nq: number;
  readonly familyCostHa: number;
  readonly barrierCostHa: number;
  /** The node ids, by creation ordinal: 0 … L − 1 the leaves (in the leaves' order), L … 2L − 2 the merges. */
  readonly nodeId: (ordinal: number) => Id;
}

/** The tree: its root (§4.5's `quarterTree(districts): QuarterNode`), every node in creation order, the cut's ids. */
export interface QuarterTree {
  readonly root: QuarterNode | null;
  readonly nodes: QuarterNode[];
  readonly cut: Id[];
}

const HA_CM2 = 100_000_000;

interface Live {
  node: QuarterNode;
  area: number;
  families: Set<string>;
  /** Leaf indices. */
  leaves: number[];
}

function lessId(a: Id, b: Id): boolean {
  return a < b;
}

/** §4.5's quarter merge tree over `leaves` with their `adjacency` (see the module comment). */
export function quarterTree(leaves: readonly QuarterLeaf[], adjacency: readonly QuarterAdjacency[], opts: QuarterOptions): QuarterTree {
  const L = leaves.length;
  if (L === 0) return { root: null, nodes: [], cut: [] };
  if (!(Number.isInteger(opts.nq) && opts.nq >= 1)) throw new RangeError(`quarterTree: N_q is a count ≥ 1, got ${String(opts.nq)}`);
  const familyCost = Math.round(opts.familyCostHa * HA_CM2);
  const barrierCost = Math.round(opts.barrierCostHa * HA_CM2);
  const nodes: QuarterNode[] = [];
  const live: Live[] = leaves.map((l, i) => {
    const node: QuarterNode = { id: opts.nodeId(i), members: [l.id], children: null, name: '', spine: [], cityCut: false };
    nodes.push(node);
    return { node, area: Math.round(l.areaCm2), families: new Set([l.family]), leaves: [i] };
  });
  // Leaf adjacency: free (an adjacency not across a barrier) and separated, per pair.
  const free = new Set<string>();
  const sep = new Set<string>();
  const pk = (a: number, b: number): string => (a < b ? `${String(a)},${String(b)}` : `${String(b)},${String(a)}`);
  for (const e of adjacency) {
    if (e.a === e.b) continue;
    if (!(e.a >= 0 && e.a < L && e.b >= 0 && e.b < L)) throw new RangeError('quarterTree: an adjacency names no leaf');
    (e.separated ? sep : free).add(pk(e.a, e.b));
  }
  const relation = (x: Live, y: Live): 'free' | 'separated' | 'none' => {
    let any = false;
    for (const a of x.leaves) {
      for (const b of y.leaves) {
        const k = pk(a, b);
        if (free.has(k)) return 'free';
        if (sep.has(k)) any = true;
      }
    }
    return any ? 'separated' : 'none';
  };
  const keep = Math.min(opts.nq, L);
  const markCut = (): void => {
    for (const r of live) r.node.cityCut = true;
  };
  if (keep === L) markCut();
  let merges = 0;
  while (live.length > 1) {
    let bi = -1;
    let bj = -1;
    let bestCost = 0;
    let bestAdjacent = false;
    for (let i = 0; i < live.length; i += 1) {
      for (let j = i + 1; j < live.length; j += 1) {
        const rel = relation(live[i], live[j]);
        const adjacent = rel !== 'none';
        if (bestAdjacent && !adjacent) continue;
        let shares = false;
        for (const f of live[i].families) if (live[j].families.has(f)) shares = true;
        const cost = live[i].area + live[j].area + (shares ? 0 : familyCost) + (rel === 'free' ? 0 : barrierCost);
        const [lo, hi] = lessId(live[i].node.id, live[j].node.id) ? [live[i].node.id, live[j].node.id] : [live[j].node.id, live[i].node.id];
        let better = bi < 0 || (adjacent && !bestAdjacent) || cost < bestCost;
        if (!better && cost === bestCost && adjacent === bestAdjacent) {
          const [blo, bhi] = lessId(live[bi].node.id, live[bj].node.id) ? [live[bi].node.id, live[bj].node.id] : [live[bj].node.id, live[bi].node.id];
          better = lessId(lo, blo) || (lo === blo && lessId(hi, bhi));
        }
        if (better) {
          bi = i;
          bj = j;
          bestCost = cost;
          bestAdjacent = adjacent;
        }
      }
    }
    const x = live[bi];
    const y = live[bj];
    const [first, second] = lessId(x.node.id, y.node.id) ? [x, y] : [y, x];
    const node: QuarterNode = {
      id: opts.nodeId(L + merges),
      members: [...first.node.members, ...second.node.members].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)),
      children: [first.node.id, second.node.id],
      name: '',
      spine: [],
      cityCut: false,
    };
    nodes.push(node);
    const merged: Live = { node, area: x.area + y.area, families: new Set([...x.families, ...y.families]), leaves: [...x.leaves, ...y.leaves] };
    live.splice(bj, 1);
    live.splice(bi, 1, merged);
    merges += 1;
    if (merges === L - keep) markCut();
  }
  const cut = nodes.filter((nd) => nd.cityCut).map((nd) => nd.id);
  return { root: live[0].node, nodes, cut };
}
