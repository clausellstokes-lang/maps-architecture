// The street graph the junction and street-signature metrics read (M0-k-05; §13.5's junction and MFCG street-signature
// rows, attachment A's `junction.*` and `sgd.*` measures restated on our side; C-0180 (4)). The street ways' polylines
// are joined at shared vertices (exact centimetres — our ways meet at the arena's shared junction vertices); a node is
// a vertex whose degree is not 2; nodes within 2 m of each other merge (single linkage) and the edges between merged
// nodes vanish; an arm's direction is taken 10 m along it (or at its far node when it is shorter).
import type { MetricDoc } from './doc.js';
import { type Pt } from './geometry.js';
import { streetWays } from './street.js';

/** The merge radius (attachment A: "after merging nodes within 2 m"). */
export const NODE_MERGE_M = 2;
/** How far along an arm its direction is taken (attachment A: "each arm's direction taken 10 m along it"). */
export const ARM_PROBE_M = 10;

/** A merged node: its members' mean position, its arms' bearings (radians) and its degree (the arm count). */
export interface StreetNode {
  readonly at: Pt;
  readonly bearings: readonly number[];
  readonly degree: number;
}

/** The street graph: merged nodes and the edges' polylines (metres) between nodes. */
export interface StreetGraph {
  readonly nodes: readonly StreetNode[];
  readonly edges: readonly (readonly Pt[])[];
}

/** Builds the street graph of a doc's street ways. */
export function streetGraph(doc: MetricDoc): StreetGraph {
  // vertices by exact cm key; undirected adjacency without duplicate segments
  const key = (x: number, y: number): string => `${x},${y}`;
  const index = new Map<string, number>();
  const pos: Pt[] = [];
  const adj: Set<number>[] = [];
  const vid = (x: number, y: number): number => {
    const k = key(x, y);
    let i = index.get(k);
    if (i === undefined) {
      i = pos.length;
      index.set(k, i);
      pos.push({ x: x / 100, y: y / 100 });
      adj.push(new Set<number>());
    }
    return i;
  };
  for (const w of streetWays(doc)) {
    let prev = -1;
    for (const p of w.line) {
      const v = vid(p.x, p.y);
      if (prev >= 0 && prev !== v) {
        adj[prev].add(v);
        adj[v].add(prev);
      }
      prev = v;
    }
  }
  const nV = pos.length;
  const isNode = (v: number): boolean => adj[v].size !== 2 && adj[v].size > 0;

  // edge paths from every node: walk through degree-2 vertices to the next node
  interface Arm {
    from: number;
    to: number;
    path: number[];
  }
  const arms: Arm[] = [];
  for (let v = 0; v < nV; v += 1) {
    if (!isNode(v)) continue;
    for (const first of adj[v]) {
      const path = [v, first];
      let prev = v;
      let cur = first;
      let guard = 0;
      while (!isNode(cur) && guard <= nV) {
        let nxt = -1;
        for (const u of adj[cur]) if (u !== prev) nxt = u;
        if (nxt < 0) break;
        prev = cur;
        cur = nxt;
        path.push(cur);
        guard += 1;
      }
      arms.push({ from: v, to: cur, path });
    }
  }

  // single-linkage merge of the nodes within NODE_MERGE_M (union-find over a 2 m grid)
  const parent = new Map<number, number>();
  const find = (a: number): number => {
    let r = a;
    while (parent.get(r) !== r) r = parent.get(r) as number;
    let c = a;
    while (c !== r) {
      const n = parent.get(c) as number;
      parent.set(c, r);
      c = n;
    }
    return r;
  };
  const cell = new Map<string, number[]>();
  const nodeIds: number[] = [];
  for (let v = 0; v < nV; v += 1) {
    if (!isNode(v)) continue;
    parent.set(v, v);
    nodeIds.push(v);
    const cx = Math.floor(pos[v].x / NODE_MERGE_M);
    const cy = Math.floor(pos[v].y / NODE_MERGE_M);
    const ck = key(cx, cy);
    const list = cell.get(ck);
    if (list === undefined) cell.set(ck, [v]);
    else list.push(v);
  }
  for (const v of nodeIds) {
    const cx = Math.floor(pos[v].x / NODE_MERGE_M);
    const cy = Math.floor(pos[v].y / NODE_MERGE_M);
    for (let dx = -1; dx <= 1; dx += 1) {
      for (let dy = -1; dy <= 1; dy += 1) {
        for (const u of cell.get(key(cx + dx, cy + dy)) ?? []) {
          if (u <= v) continue;
          if (Math.hypot(pos[u].x - pos[v].x, pos[u].y - pos[v].y) <= NODE_MERGE_M) {
            const a = find(u);
            const b = find(v);
            if (a !== b) parent.set(a < b ? b : a, a < b ? a : b);
          }
        }
      }
    }
  }

  // the arms leaving each merged node, its bearing 10 m along the arm
  const members = new Map<number, number[]>();
  for (const v of nodeIds) {
    const r = find(v);
    const list = members.get(r);
    if (list === undefined) members.set(r, [v]);
    else list.push(v);
  }
  const bearings = new Map<number, number[]>();
  const edges: Pt[][] = [];
  const seenEdge = new Set<string>();
  for (const arm of arms) {
    const r = find(arm.from);
    if (isNode(arm.to) && find(arm.to) === r) continue; // an edge inside a merged node vanishes
    const b = probeBearing(arm.path.map((i) => pos[i]));
    const list = bearings.get(r);
    if (list === undefined) bearings.set(r, [b]);
    else list.push(b);
    const fwd = arm.path.join('>');
    const rev = [...arm.path].reverse().join('>');
    const ek = fwd < rev ? fwd : rev;
    if (!seenEdge.has(ek)) {
      seenEdge.add(ek);
      edges.push(arm.path.map((i) => pos[i]));
    }
  }
  // a closed loop of degree-2 vertices meets no node: it is an edge of its own (it counts in the graph's length)
  const onArm = new Set<number>();
  for (const arm of arms) for (const v of arm.path) onArm.add(v);
  for (let v = 0; v < nV; v += 1) {
    if (adj[v].size !== 2 || onArm.has(v)) continue;
    const loop = [v];
    onArm.add(v);
    let prev = v;
    let cur = [...adj[v]][0];
    while (cur !== v && !onArm.has(cur)) {
      loop.push(cur);
      onArm.add(cur);
      let nxt = -1;
      for (const u of adj[cur]) if (u !== prev) nxt = u;
      prev = cur;
      cur = nxt;
    }
    loop.push(v);
    edges.push(loop.map((i) => pos[i]));
  }
  const nodes: StreetNode[] = [];
  for (const [r, ms] of members) {
    let sx = 0;
    let sy = 0;
    for (const m of ms) {
      sx += pos[m].x;
      sy += pos[m].y;
    }
    const bs = bearings.get(r) ?? [];
    nodes.push({ at: { x: sx / ms.length, y: sy / ms.length }, bearings: bs, degree: bs.length });
  }
  return { nodes, edges };
}

/** The bearing from a path's first point to its point ARM_PROBE_M along it (or its last point when shorter). */
export function probeBearing(path: readonly Pt[]): number {
  const o = path[0];
  let walked = 0;
  for (let i = 1; i < path.length; i += 1) {
    const a = path[i - 1];
    const b = path[i];
    const seg = Math.hypot(b.x - a.x, b.y - a.y);
    if (walked + seg >= ARM_PROBE_M && seg > 0) {
      const t = (ARM_PROBE_M - walked) / seg;
      return Math.atan2(a.y + (b.y - a.y) * t - o.y, a.x + (b.x - a.x) * t - o.x);
    }
    walked += seg;
  }
  const e = path[path.length - 1];
  return Math.atan2(e.y - o.y, e.x - o.x);
}

/** The angles between angularly consecutive arms of a node, degrees (they sum to 360). */
export function armGapsDeg(bearings: readonly number[]): number[] {
  if (bearings.length < 2) return [];
  const b = bearings.map((x) => ((x % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)).sort((x, y) => x - y);
  const out: number[] = [];
  for (let i = 1; i < b.length; i += 1) out.push(((b[i] - b[i - 1]) * 180) / Math.PI);
  out.push(((b[0] + 2 * Math.PI - b[b.length - 1]) * 180) / Math.PI);
  return out;
}

/** Does a degree-3 node have two arms within `tolDeg` of straight (a T rather than a Y; attachment A's `sgd.tShare`)? */
export function hasStraightPair(bearings: readonly number[], tolDeg = 20): boolean {
  for (let i = 0; i < bearings.length; i += 1) {
    for (let j = i + 1; j < bearings.length; j += 1) {
      let d = Math.abs(bearings[i] - bearings[j]) % (2 * Math.PI);
      if (d > Math.PI) d = 2 * Math.PI - d;
      if ((d * 180) / Math.PI >= 180 - tolDeg) return true;
    }
  }
  return false;
}

/** §13.2's junction-degree histogram (the core record's M0 part): merged nodes counted by degree, index = degree. */
export function junctionDegreeHistogram(g: StreetGraph): number[] {
  const out: number[] = [];
  for (const n of g.nodes) {
    while (out.length <= n.degree) out.push(0);
    out[n.degree] += 1;
  }
  return out;
}
