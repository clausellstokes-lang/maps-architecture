// §3.8's coalescing on the finished skeleton (M0-a-11; C-0168 (4)): "events closer than 1 mm in offset time and 1 cm
// in position are coalesced into one multi-edge event". The engine resolves only coincident events (to its rounding
// scale), so its graph is the skeleton of the doubles, sub-centimetre structure included; this pass merges that
// structure into single nodes, as a multi-edge event would have made it. Every arc between two interior nodes shorter
// than 1 cm is contracted — clusters grown shortest arc first while every two of their nodes stay within 1 cm (a vertex
// moves at least as fast as the offset time, so such nodes are within 1 cm of time too, and every pair of events
// within 1 mm and 1 cm joined by the skeleton is among them) — each cluster at one node, the point and time
// equidistant from the lines of every face it bounds (least squares, about its nodes' mean), kept only when each of
// those lines lies within 1 cm of its time (§3.8 (3)'s tolerance). Arcs from the input vertices are never contracted.
// A merge that would join two arcs into one returns null and the caller keeps the engine's graph. Doubles with
// + − × ÷ √ only; the order of every loop is the arcs' and nodes' own.
import { ratio } from '../num/index.js';
import type { Lines, RawArc, RawNode } from './engine.js';

/** §3.8's coalescing radius in position: 1 cm. */
export const COALESCE_CM = 1;
/** §3.8 (3)'s height tolerance, which a merged node must keep on every face it bounds. */
const HEIGHT_CM = 1;
/** 2²⁰: Cramer's quotients are scaled by it so ratio()'s floor of 1 reads small determinants (exact). */
const SCALE = 1_048_576;

export interface RawGraph {
  nodes: RawNode[];
  arcs: RawArc[];
}

/** The point and time (x, y, t) nearest every line's n · p − t = c (least squares about the guess), or null. */
function fit(L: Lines, lines: readonly number[], px: number, py: number, pt: number): [number, number, number] | null {
  let a11 = 0;
  let a12 = 0;
  let a13 = 0;
  let a22 = 0;
  let a23 = 0;
  let a33 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  for (const g of lines) {
    const r = L.c[g] - (L.nx[g] * px + L.ny[g] * py - pt);
    const u = L.nx[g];
    const w = L.ny[g];
    a11 += u * u;
    a12 += u * w;
    a13 -= u;
    a22 += w * w;
    a23 -= w;
    a33 += 1;
    b1 += u * r;
    b2 += w * r;
    b3 -= r;
  }
  const det = a11 * (a22 * a33 - a23 * a23) - a12 * (a12 * a33 - a23 * a13) + a13 * (a12 * a23 - a22 * a13);
  if (!(det > 1e-6)) return null;
  const d1 = b1 * (a22 * a33 - a23 * a23) - a12 * (b2 * a33 - a23 * b3) + a13 * (b2 * a23 - a22 * b3);
  const d2 = a11 * (b2 * a33 - b3 * a23) - b1 * (a12 * a33 - a23 * a13) + a13 * (a12 * b3 - b2 * a13);
  const d3 = a11 * (a22 * b3 - a23 * b2) - a12 * (a12 * b3 - b2 * a13) + b1 * (a12 * a23 - a22 * a13);
  const qx = ratio(d1 * SCALE, det * SCALE, 'count');
  const qy = ratio(d2 * SCALE, det * SCALE, 'count');
  const qt = ratio(d3 * SCALE, det * SCALE, 'count');
  if (!qx.ok || !qy.ok || !qt.ok) return null;
  return [px + qx.value, py + qy.value, pt + qt.value];
}

/** Does (x, y, t) lie within the height tolerance of every line, and within 1 cm of every node it replaces? */
function holds(L: Lines, lines: readonly number[], nodes: readonly RawNode[], members: readonly number[], x: number, y: number, t: number): boolean {
  if (!(t > 0)) return false;
  for (const g of lines) {
    const h = L.nx[g] * x + L.ny[g] * y - L.c[g] - t;
    if (!(h <= HEIGHT_CM && h >= -HEIGHT_CM)) return false;
  }
  for (const m of members) {
    const q = nodes[m];
    if (!((q.x - x) * (q.x - x) + (q.y - y) * (q.y - y) <= COALESCE_CM * COALESCE_CM)) return false;
  }
  return true;
}

/**
 * The coalesced graph, or null when nothing merges (or a merge would join two arcs). Nodes 0 … n − 1 (the input
 * vertices) keep their indices; the other nodes are renumbered in their first order.
 */
export function coalesce(g: RawGraph, n: number, L: Lines): RawGraph | null {
  const { nodes, arcs } = g;
  const near = (a: number, b: number): boolean => {
    const dx = nodes[a].x - nodes[b].x;
    const dy = nodes[a].y - nodes[b].y;
    return dx * dx + dy * dy <= COALESCE_CM * COALESCE_CM;
  };
  const short: number[] = [];
  for (let k = 0; k < arcs.length; k += 1) {
    const e = arcs[k];
    if (e.a >= n && e.b >= n && near(e.a, e.b)) short.push(k);
  }
  if (short.length === 0) return null;
  const len2 = (k: number): number => {
    const e = arcs[k];
    const dx = nodes[e.a].x - nodes[e.b].x;
    const dy = nodes[e.a].y - nodes[e.b].y;
    return dx * dx + dy * dy;
  };
  short.sort((p, q) => len2(p) - len2(q) || p - q);
  // clusters: a root per node, its members
  const root = nodes.map((_, i) => i);
  const members: number[][] = nodes.map((_, i) => [i]);
  const find = (i: number): number => {
    let r = i;
    while (root[r] !== r) r = root[r];
    return r;
  };
  for (const k of short) {
    const ra = find(arcs[k].a);
    const rb = find(arcs[k].b);
    if (ra === rb) continue;
    let ok = true;
    for (const p of members[ra]) {
      for (const q of members[rb]) {
        if (!near(p, q)) {
          ok = false;
          break;
        }
      }
      if (!ok) break;
    }
    if (!ok) continue;
    const [keep, drop] = ra < rb ? [ra, rb] : [rb, ra];
    root[drop] = keep;
    members[keep] = [...members[keep], ...members[drop]];
    members[drop] = [];
  }
  // each cluster's node: fitted to the lines of the faces it bounds, kept when every line is within 1 cm of its time
  const facesOf: number[][] = nodes.map(() => []);
  for (const e of arcs) {
    for (const v of [e.a, e.b]) {
      const r = find(v);
      for (const f of [e.left, e.right]) if (!facesOf[r].includes(f)) facesOf[r].push(f);
    }
  }
  const merged = new Map<number, RawNode>();
  for (let r = n; r < nodes.length; r += 1) {
    if (find(r) !== r || members[r].length < 2) continue;
    const ms = members[r];
    let mx = 0;
    let my = 0;
    let mt = 0;
    for (const m of ms) {
      mx += nodes[m].x;
      my += nodes[m].y;
      mt += nodes[m].t;
    }
    const k = ratio(1, ms.length, 'count');
    const w = k.ok ? k.value : 0;
    mx *= w;
    my *= w;
    mt *= w;
    const f = fit(L, facesOf[r], mx, my, mt);
    if (f !== null && holds(L, facesOf[r], nodes, ms, f[0], f[1], f[2])) merged.set(r, { x: f[0], y: f[1], t: f[2] });
    else if (holds(L, facesOf[r], nodes, ms, mx, my, mt)) merged.set(r, { x: mx, y: my, t: mt });
  }
  if (merged.size === 0) return null;
  // renumber: the input vertices first, then each kept node or merged cluster at its first member
  const index = new Int32Array(nodes.length).fill(-1);
  const out: RawNode[] = [];
  for (let i = 0; i < nodes.length; i += 1) {
    const r = find(i);
    const m = merged.get(r);
    if (m === undefined) {
      index[i] = out.length;
      out.push(nodes[i]);
    } else if (index[r] < 0) {
      index[r] = out.length;
      out.push(m);
      for (const v of members[r]) index[v] = index[r];
    }
  }
  const seen = new Set<string>();
  const outArcs: RawArc[] = [];
  for (const e of arcs) {
    const a = index[e.a];
    const b = index[e.b];
    if (a === b) continue;
    const key = a < b ? `${a},${b}` : `${b},${a}`;
    if (seen.has(key)) return null;
    seen.add(key);
    outArcs.push({ a, b, left: e.left, right: e.right });
  }
  return { nodes: out, arcs: outArcs };
}
