// §3.6's whole-step validation (GEO-10, GEO-35) on a step's view, before anything is written: every edge incident to a
// moved vertex at least `minEdge` long and crossing no edge (the index's unmoved edges and the step's own moved ones);
// every unmoved vertex outside the triangles the moved edges sweep; no two vertices on one lattice point; no held vertex
// moved; §3.10's clearance on the moved vertices and edges; and the rotation at every vertex a moved edge reaches kept,
// so a step never turns a face inside out (§3.10's "faces simple" row on the touched faces; C-0193 (4)). The edit
// layer's `recordCheck` runs after these pass (warp.ts). Exact integer predicates throughout (§3.2 (3)). M0-a-13.
import { outgoing, type Plat, type VertexId } from '../arena/index.js';
import { HOT_PIXEL_CM } from '../index/index.js';
import { segmentsMeet } from '../insert/decimate.js';
import { orient2d } from '../num/index.js';
import type { RouteOf } from './held.js';
import { padBox, type StepView } from './view.js';

/** §3.2 (2)'s `minEdge`. */
const MIN_EDGE = 25;
const MIN_EDGE_SQ = MIN_EDGE * MIN_EDGE;

/** Is p closer than r to the closed segment a–b? Exact on lattice points. */
export function closerThan(px: number, py: number, ax: number, ay: number, bx: number, by: number, r: number): boolean {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  const dot = (px - ax) * dx + (py - ay) * dy;
  if (dot <= 0 || l2 === 0) return (px - ax) * (px - ax) + (py - ay) * (py - ay) < r * r;
  if (dot >= l2) return (px - bx) * (px - bx) + (py - by) * (py - by) < r * r;
  const o = orient2d(ax, ay, bx, by, px, py);
  return o * o < r * r * l2;
}

/** Is p inside the closed triangle a, b, c (a degenerate triangle holds nothing)? */
export function inTriangle(px: number, py: number, ax: number, ay: number, bx: number, by: number, cx: number, cy: number): boolean {
  const area = orient2d(ax, ay, bx, by, cx, cy);
  if (area === 0) return false;
  const s = area > 0 ? 1 : -1;
  return s * orient2d(ax, ay, bx, by, px, py) >= 0 && s * orient2d(bx, by, cx, cy, px, py) >= 0 && s * orient2d(cx, cy, ax, ay, px, py) >= 0;
}

/**
 * The checks local to one vertex at its view point: no other vertex on its lattice point; its incident edges at least
 * `minEdge` long, crossing and overlapping no edge, and at least `minEdge` from every vertex outside their ends'
 * one-rings; the vertex at least `minEdge` from every edge outside its one-ring (§3.10). Returns the first failure, or
 * null. The placement rule's (ii) and (iii) read through it (plan.ts), and the step's validation runs it on every mover.
 */
export function vertexProblem(view: StepView, v: VertexId): string | null {
  const p = view.p;
  const O = p.halfEdges.origin;
  const qx = view.x(v);
  const qy = view.y(v);
  for (const w of view.verticesIn({ minX: qx, minY: qy, maxX: qx, maxY: qy })) {
    if (w !== v) return `two vertices on the lattice point (${qx}, ${qy})`;
  }
  const nv = view.neighbours(v);
  const ringV = new Set<VertexId>([v, ...nv]);
  // The vertex against every edge outside its one-ring.
  for (const e of view.edgesNear(padBox(qx, qy, qx, qy, MIN_EDGE))) {
    const a = O[2 * e];
    const b = O[2 * e + 1];
    if (ringV.has(a) || ringV.has(b)) continue;
    if (closerThan(qx, qy, view.x(a), view.y(a), view.x(b), view.y(b), MIN_EDGE)) {
      return `clearance: the vertex (${qx}, ${qy}) within minEdge of the edge (${view.x(a)}, ${view.y(a)})–(${view.x(b)}, ${view.y(b)})`;
    }
  }
  for (const u of nv) {
    const ux = view.x(u);
    const uy = view.y(u);
    const dx = ux - qx;
    const dy = uy - qy;
    if (dx * dx + dy * dy < MIN_EDGE_SQ) return `minEdge: the edge (${qx}, ${qy})–(${ux}, ${uy}) is shorter than minEdge`;
    const nu = view.neighbours(u);
    const exempt = new Set<VertexId>([...ringV, u, ...nu]);
    for (const w of view.verticesIn(padBox(Math.min(qx, ux), Math.min(qy, uy), Math.max(qx, ux), Math.max(qy, uy), MIN_EDGE))) {
      if (exempt.has(w)) continue;
      if (closerThan(view.x(w), view.y(w), qx, qy, ux, uy, MIN_EDGE)) {
        return `clearance: the edge (${qx}, ${qy})–(${ux}, ${uy}) within minEdge of the vertex (${view.x(w)}, ${view.y(w)})`;
      }
    }
    for (const e of view.edgesNear(padBox(Math.min(qx, ux), Math.min(qy, uy), Math.max(qx, ux), Math.max(qy, uy), 0))) {
      const a = O[2 * e];
      const b = O[2 * e + 1];
      if ((a === v && b === u) || (a === u && b === v)) continue;
      const ax = view.x(a);
      const ay = view.y(a);
      const bx = view.x(b);
      const by = view.y(b);
      if (a === v || b === v || a === u || b === u) {
        // Edges sharing an end meet only there: no collinear overlap.
        const s = a === v || a === u ? a : b;
        const o = s === a ? b : a;
        const t = s === v ? u : v;
        const sx = view.x(s);
        const sy = view.y(s);
        if (orient2d(sx, sy, view.x(o), view.y(o), view.x(t), view.y(t)) === 0
          && (view.x(o) - sx) * (view.x(t) - sx) + (view.y(o) - sy) * (view.y(t) - sy) > 0) {
          return `overlap: the edges at (${sx}, ${sy}) overlap`;
        }
        continue;
      }
      if (segmentsMeet(qx, qy, ux, uy, ax, ay, bx, by)) return `crossing: the edge (${qx}, ${qy})–(${ux}, ${uy}) meets the edge (${ax}, ${ay})–(${bx}, ${by})`;
    }
  }
  return null;
}

/** The number of counter-clockwise steps in the cyclic sequence of directions (a clockwise rotation has exactly one). */
function ascents(dirs: readonly (readonly [number, number])[]): number {
  const half = (d: readonly [number, number]): number => (d[1] > 0 || (d[1] === 0 && d[0] > 0) ? 0 : 1);
  const cmp = (a: readonly [number, number], b: readonly [number, number]): number => {
    const ha = half(a);
    const hb = half(b);
    if (ha !== hb) return ha - hb;
    const o = orient2d(0, 0, a[0], a[1], b[0], b[1]);
    return o > 0 ? -1 : o < 0 ? 1 : 0;
  };
  let n = 0;
  for (let i = 0; i < dirs.length; i++) if (cmp(dirs[i], dirs[(i + 1) % dirs.length]) < 0) n++;
  return n;
}

/** Does the vertex's rotation (its outgoing edges, clockwise) keep its cyclic order at the view's points? */
export function rotationKept(view: StepView, v: VertexId): boolean {
  const p: Plat = view.p;
  const O = p.halfEdges.origin;
  const out = outgoing(p, v);
  if (out.length < 3) return true;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const before = out.map((h) => [X[O[h ^ 1]] - X[v], Y[O[h ^ 1]] - Y[v]] as const);
  const after = out.map((h) => [view.x(O[h ^ 1]) - view.x(v), view.y(O[h ^ 1]) - view.y(v)] as const);
  return ascents(after) === ascents(before);
}

/**
 * The whole step on its view (§3.6): `movers` are the vertices whose point changes, `held` the held set. Returns the
 * first failure, or null when the step may commit (the record check aside).
 */
export function stepProblem(view: StepView, movers: readonly VertexId[], held: ReadonlySet<VertexId>): string | null {
  const p = view.p;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  for (const v of movers) if (held.has(v)) return `held: the held vertex (${X[v]}, ${Y[v]}) would move`;
  for (const v of movers) {
    const r = vertexProblem(view, v);
    if (r !== null) return r;
  }
  // Every unmoved vertex outside the triangles the moved edges sweep (old a, old b, new b) and (old a, new b, new a).
  const reached = new Set<VertexId>();
  for (const e of view.movedPairs()) {
    const a = O[2 * e];
    const b = O[2 * e + 1];
    reached.add(a);
    reached.add(b);
    const pts = [X[a], Y[a], X[b], Y[b], view.x(b), view.y(b), view.x(a), view.y(a)];
    const minX = Math.min(pts[0], pts[2], pts[4], pts[6]);
    const maxX = Math.max(pts[0], pts[2], pts[4], pts[6]);
    const minY = Math.min(pts[1], pts[3], pts[5], pts[7]);
    const maxY = Math.max(pts[1], pts[3], pts[5], pts[7]);
    for (const w of view.verticesIn(padBox(minX, minY, maxX, maxY, 0))) {
      if (w === a || w === b || view.moving(w)) continue;
      const wx = X[w];
      const wy = Y[w];
      if (inTriangle(wx, wy, pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]) || inTriangle(wx, wy, pts[0], pts[1], pts[4], pts[5], pts[6], pts[7])) {
        return `swept: the unmoved vertex (${wx}, ${wy}) lies in the triangle the edge (${pts[0]}, ${pts[1]})–(${pts[2]}, ${pts[3]}) sweeps`;
      }
    }
  }
  // Every mover's path (its point before the step to its point after) crossing no unmoved edge: an unmoved edge through
  // a swept area with neither end in it crosses the sweep's boundary, and the boundary's old and new edges are checked
  // above, so it crosses a path. Without this a free chain (a hole) could jump over an unmoved edge into another face
  // (B-FUZZ seed 137587846; C-0193 (4)).
  for (const v of movers) {
    const x0 = X[v];
    const y0 = Y[v];
    const x1 = view.x(v);
    const y1 = view.y(v);
    for (const e of view.edgesNear(padBox(Math.min(x0, x1), Math.min(y0, y1), Math.max(x0, x1), Math.max(y0, y1), 0))) {
      const a = O[2 * e];
      const b = O[2 * e + 1];
      if (view.moving(a) || view.moving(b)) continue;
      if (segmentsMeet(x0, y0, x1, y1, X[a], Y[a], X[b], Y[b])) {
        return `swept: the path of (${x0}, ${y0}) to (${x1}, ${y1}) crosses the unmoved edge (${X[a]}, ${Y[a]})–(${X[b]}, ${Y[b]})`;
      }
    }
  }
  for (const v of reached) if (!rotationKept(view, v)) return `rotation: the edges at (${X[v]}, ${Y[v]}) change their order`;
  return null;
}

/** The hot pixel squared (§3.3's HOT_PIXEL_CM). */
const HOT_PIXEL_SQ = HOT_PIXEL_CM * HOT_PIXEL_CM;

/**
 * §3.10's placement bound on a step's view: every slid or re-seated vertex within 0.71 cm of its route's line between the
 * route's ends as the step leaves them. A re-seat placed before an end of its own route reads that end at its rounded
 * target (§3.6's order), so an end placed elsewhere can leave it off its route: the step then fails and halves.
 */
export function placementBoundProblem(view: StepView, onRoutes: readonly { readonly v: VertexId; readonly route: RouteOf }[]): string | null {
  for (const { v, route } of onRoutes) {
    const ax = view.x(route.a);
    const ay = view.y(route.a);
    const bx = view.x(route.b);
    const by = view.y(route.b);
    const len2 = (bx - ax) * (bx - ax) + (by - ay) * (by - ay);
    const o = orient2d(ax, ay, bx, by, view.x(v), view.y(v));
    if (o * o > HOT_PIXEL_SQ * len2) return `placement bound: (${view.x(v)}, ${view.y(v)}) lies beyond the hot pixel of its route`;
  }
  return null;
}
