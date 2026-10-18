// The stage's level set (§4.2 S3 (6), §4.4 S5a; C-0017; M0-c-01): the selected nodes are the land nodes with T ≤ t
// (an unselected pocket they enclose filled in, so the boundary is one ring, C-0201 (5)); the outline is traced by
// marching triangles over the lattice's triangle mesh — the indicator of the selected nodes contoured at ½, the
// crossings at edge midpoints (snapped, §3.2 (7)) — then simplified (the kernel's topology-preserving Visvalingam,
// §3.4, every node beside the contour an obstacle so none changes side) and Chaikin-smoothed between the pins (the
// gates, which stay its vertices). A Chaikin pass that would move a node across the outline or make it touch itself is
// not applied (C-0201 (5)). Only interior nodes are land, so the contour always closes inside the frame.
import { BinaryHeap, chaikin, simplify, type Cm, type LatticePoint, type Polygon } from '@plat/kernel';
import { area2Of, insideRing, latticeAt, ringIsSimple, type XY } from './geom.js';
import type { Field, LevelSet } from './types.js';

/** The Chaikin passes the outline is smoothed with (C-0201 (5): §4.3's two passes of a way's chain, read for the line). */
export const OUTLINE_CHAIKIN_PASSES = 2;

/** The level set's options: the points the outline keeps as vertices (the gates, which lie on the contour). */
export interface LevelSetOptions {
  pins?: readonly LatticePoint[];
}

/**
 * The selection of `field` at `t`: the land nodes (interior, not in water) with T ≤ t; then the water the selection
 * reaches across from its banks — a water node whose least bank T plus the distance across the water to it is ≤ t, the
 * water never carrying cost back to land (C-0201 (8)), so the stage's boundary crosses a river where its reach ends;
 * then every unselected node not connected (through unselected nodes) to the lattice's rim filled in. Returns the
 * selection and the filled count.
 */
export function selectNodes(field: Field, t: number): { selected: Uint8Array; filled: number } {
  const { lattice, T } = field;
  const n = T.length;
  const selected = new Uint8Array(n);
  for (let i = 0; i < n; i += 1) if (lattice.interior[i] === 1 && lattice.water[i] === 0 && T[i] <= t) selected[i] = 1;
  spreadOverWater(field, t, selected);
  // The outside: unselected nodes reached from the rim through unselected nodes.
  const outside = new Uint8Array(n);
  const stack: number[] = [];
  for (let i = 0; i < n; i += 1) {
    if (lattice.rim[i] === 1 && selected[i] === 0) {
      outside[i] = 1;
      stack.push(i);
    }
  }
  while (stack.length > 0) {
    const u = stack.pop() as number;
    for (let d = 0; d < 6; d += 1) {
      const v = lattice.adjacency[6 * u + d];
      if (v === -1 || outside[v] === 1 || selected[v] === 1) continue;
      outside[v] = 1;
      stack.push(v);
    }
  }
  let filled = 0;
  for (let i = 0; i < n; i += 1) {
    if (selected[i] === 0 && outside[i] === 0) {
      selected[i] = 1;
      filled += 1;
    }
  }
  return { selected, filled };
}

/** The water the selection reaches from its banks (C-0201 (8)): a Dijkstra over the water nodes alone. */
function spreadOverWater(field: Field, t: number, selected: Uint8Array): void {
  const { lattice, T } = field;
  const { points, adjacency, water, interior } = lattice;
  const n = T.length;
  const reach = new Float64Array(n).fill(Infinity);
  const heap = new BinaryHeap();
  const len = (i: number, j: number): number => Math.sqrt((points[j].x - points[i].x) * (points[j].x - points[i].x) + (points[j].y - points[i].y) * (points[j].y - points[i].y));
  for (let i = 0; i < n; i += 1) {
    if (selected[i] !== 1) continue;
    for (let d = 0; d < 6; d += 1) {
      const w = adjacency[6 * i + d];
      if (w === -1 || water[w] !== 1 || interior[w] !== 1) continue;
      const r = T[i] + len(i, w);
      if (r < reach[w]) {
        reach[w] = r;
        heap.push(w, r);
      }
    }
  }
  while (heap.size > 0) {
    const u = heap.pop();
    const ru = reach[u];
    if (ru > t || selected[u] === 1) continue;
    selected[u] = 1;
    for (let d = 0; d < 6; d += 1) {
      const w = adjacency[6 * u + d];
      if (w === -1 || water[w] !== 1 || interior[w] !== 1 || selected[w] === 1) continue;
      const r = ru + len(u, w);
      if (r < reach[w]) {
        reach[w] = r;
        heap.push(w, r);
      }
    }
  }
}

/**
 * The marching-triangle rings of a selection (C-0017): each mixed triangle gives one segment between the midpoints of
 * its two mixed edges, oriented with the selection on its left; segments link at shared midpoints into
 * counter-clockwise rings. Each ring's vertices carry their lattice edge as [inside node, outside node].
 */
export function marchingRings(field: Field, selected: Uint8Array): { ring: LatticePoint[]; edges: [number, number][] }[] {
  const { lattice } = field;
  const { points, adjacency } = lattice;
  const n = points.length;
  const keyOf = (u: number, v: number): number => (u < v ? u * n + v : v * n + u);
  const next = new Map<number, number>();
  const ends = new Map<number, [number, number]>();
  const seg = (fromU: number, fromV: number, toU: number, toV: number): void => {
    const a = keyOf(fromU, fromV);
    const b = keyOf(toU, toV);
    next.set(a, b);
    if (!ends.has(a)) ends.set(a, selected[fromU] === 1 ? [fromU, fromV] : [fromV, fromU]);
    if (!ends.has(b)) ends.set(b, selected[toU] === 1 ? [toU, toV] : [toV, toU]);
  };
  const tri = (p: number, q: number, r: number): void => {
    const sp = selected[p];
    const sq = selected[q];
    const sr = selected[r];
    if (sp === sq && sq === sr) return;
    // Rotate so the lone vertex X comes first (counter-clockwise X, Y, Z).
    let X = p;
    let Y = q;
    let Z = r;
    if (sq !== sp && sq !== sr) {
      X = q;
      Y = r;
      Z = p;
    } else if (sr !== sp && sr !== sq) {
      X = r;
      Y = p;
      Z = q;
    }
    if (selected[X] === 1) seg(X, Y, Z, X); // lone selected: mid(X, Y) → mid(Z, X)
    else seg(Z, X, X, Y); // lone unselected: mid(Z, X) → mid(X, Y)
  };
  for (let i = 0; i < n; i += 1) {
    const e = adjacency[6 * i];
    const ne = adjacency[6 * i + 1];
    const nw = adjacency[6 * i + 2];
    if (e !== -1 && ne !== -1) tri(i, e, ne);
    if (ne !== -1 && nw !== -1) tri(i, ne, nw);
  }
  // Link into rings, starting each at its least key (deterministic order).
  const starts = [...next.keys()].sort((a, b) => a - b);
  const used = new Set<number>();
  const rings: { ring: LatticePoint[]; edges: [number, number][] }[] = [];
  for (const s of starts) {
    if (used.has(s)) continue;
    const ring: LatticePoint[] = [];
    const edges: [number, number][] = [];
    let k = s;
    while (!used.has(k)) {
      used.add(k);
      const [u, v] = ends.get(k) as [number, number];
      edges.push([u, v]);
      ring.push(latticeAt((points[u].x + points[v].x) * 0.5, (points[u].y + points[v].y) * 0.5));
      const nk = next.get(k);
      if (nk === undefined) throw new RangeError('marchingRings: an open contour (a selected node on the rim)');
      k = nk;
    }
    if (k !== s) throw new RangeError('marchingRings: a contour that does not close on its start');
    rings.push({ ring, edges });
  }
  return rings;
}

/** Every node on either side of the contour (the ends of its crossed edges), with its side. */
function guards(contourEdges: readonly [number, number][]): { inside: Set<number>; outside: Set<number> } {
  const inside = new Set<number>();
  const outside = new Set<number>();
  for (const [u, v] of contourEdges) {
    inside.add(u);
    outside.add(v);
  }
  return { inside, outside };
}

/** Does `ring` keep every guard node on its side and stay simple? */
function keepsSides(ring: readonly XY[], points: readonly LatticePoint[], g: { inside: Set<number>; outside: Set<number> }): boolean {
  if (!ringIsSimple(ring)) return false;
  for (const i of g.inside) if (!insideRing(ring, points[i])) return false;
  for (const i of g.outside) if (insideRing(ring, points[i], true)) return false;
  return true;
}

/**
 * The Chaikin smoothing of a simplified ring between its pins (C-0201 (5)): `OUTLINE_CHAIKIN_PASSES` passes, or fewer
 * when a deeper one would carry a guard node across the ring or make it touch itself; 0 passes keeps the ring.
 */
export function smoothOutline(
  ring: readonly LatticePoint[],
  pins: readonly number[],
  points: readonly LatticePoint[],
  g: { inside: Set<number>; outside: Set<number> },
): { outline: LatticePoint[]; passes: number } {
  for (let k = OUTLINE_CHAIKIN_PASSES; k >= 1; k -= 1) {
    const smooth = chaikinPinned(ring, pins, k);
    if (keepsSides(smooth, points, g)) return { outline: smooth, passes: k };
  }
  return { outline: [...ring], passes: 0 };
}

/** Chaikin over a closed ring with pinned vertices: each open run between pins smoothed with both ends kept. */
function chaikinPinned(ring: readonly LatticePoint[], pinned: readonly number[], passes: number): LatticePoint[] {
  const n = ring.length;
  if (pinned.length === 0) return dedupe(chaikin(ring, { closed: true, iterations: passes }).map((p) => latticeAt(p.x, p.y)));
  const pins = [...pinned].sort((a, b) => a - b);
  const out: LatticePoint[] = [];
  for (let k = 0; k < pins.length; k += 1) {
    const from = pins[k];
    const to = k + 1 < pins.length ? pins[k + 1] : pins[0] + n;
    const run: LatticePoint[] = [];
    for (let i = from; i <= to; i += 1) run.push(ring[i % n]);
    const smooth = chaikin(run, { closed: false, iterations: passes });
    // Keep the run's first point (its pin) exactly; the last is the next run's first.
    out.push(ring[from]);
    for (let i = 1; i < smooth.length - 1; i += 1) out.push(latticeAt(smooth[i].x, smooth[i].y));
  }
  return dedupe(out);
}

/** Consecutive duplicates removed (the snap may land two smoothed points on one centimetre). */
function dedupe(ring: LatticePoint[]): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const p of ring) {
    const q = out.length > 0 ? out[out.length - 1] : null;
    if (q === null || q.x !== p.x || q.y !== p.y) out.push(p);
  }
  while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  return out;
}

/** The indices of the pins within the ring (each pin must be a ring vertex). */
function pinIndices(ring: readonly LatticePoint[], pins: readonly LatticePoint[]): number[] {
  const out: number[] = [];
  for (const p of pins) {
    const i = ring.findIndex((q) => q.x === p.x && q.y === p.y);
    if (i === -1) throw new RangeError(`levelSet: the pin (${String(p.x)}, ${String(p.y)}) is not a contour vertex`);
    if (!out.includes(i)) out.push(i);
  }
  return out;
}

/**
 * The level set of `field` at `t` (C-0017): the selection, the exact contour (the largest ring by area when the
 * marching finds several; `rings` counts them) and its outline, simplified and Chaikin-smoothed with `pins` kept.
 */
export function levelSet(field: Field, t: number, opts: LevelSetOptions = {}): LevelSet {
  const { lattice } = field;
  const { selected, filled } = selectNodes(field, t);
  let count = 0;
  for (let i = 0; i < selected.length; i += 1) if (lattice.water[i] === 0) count += selected[i];
  const land = count * lattice.cellAreaCm2;
  const rings = marchingRings(field, selected);
  if (rings.length === 0) {
    return { field, t, selected, filled, landCm2: land, contour: [], contourEdges: [], rings: 0, outline: [], smoothPasses: 0 };
  }
  let best = rings[0];
  let bestA = area2Of(best.ring);
  for (const r of rings) {
    const a = area2Of(r.ring);
    if (a > bestA) {
      best = r;
      bestA = a;
    }
  }
  const contour = best.ring;
  const g = guards(best.edges);
  const pins = pinIndices(contour, opts.pins ?? []);

  // Simplify: the topology-preserving Visvalingam of §3.4 with every guard node a tiny obstacle (no node changes side).
  const obstacles: Polygon[] = [];
  for (const i of [...g.inside, ...g.outside].sort((a, b) => a - b)) {
    const p = lattice.points[i];
    obstacles.push([p, latticeAt(p.x + 1, p.y), latticeAt(p.x, p.y + 1)]);
  }
  const closed = [...contour, contour[0]];
  const simple = simplify(closed, lattice.spacingCm as Cm, 0, obstacles, pins);
  let simplified: LatticePoint[] = contour;
  if (simple.ok) {
    const s = simple.value;
    simplified = s.length > 1 && s[0].x === s[s.length - 1].x && s[0].y === s[s.length - 1].y ? s.slice(0, -1) : s;
    if (!keepsSides(simplified, lattice.points, g)) simplified = contour;
  }
  // The pins located again on the simplified ring: the simplify drops vertices, so their indices there differ.
  const smooth = smoothOutline(simplified, pinIndices(simplified, opts.pins ?? []), lattice.points, g);
  const outline = smooth.outline;
  const passes = smooth.passes;
  return { field, t, selected, filled, landCm2: land, contour, contourEdges: best.edges, rings: rings.length, outline, smoothPasses: passes };
}
