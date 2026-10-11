// The settlement perimeter (M0-e-04; §4.5 *Perimeter and margin band*; §4.1's S6 row): the last stage's boundary
// offset outward by the ribbon regime's block-depth band top (50 m, `district.perimeter.offsetM`) and rounded — the
// boundary's Minkowski sum with a disc of the offset, so every convex corner becomes an arc of the offset's radius
// (C-0245 (1)) — clipped to the frame where it would leave it (the map border closes it there). The sum is built as the
// boundary's convolution curve with the disc (each edge offset outward; at a convex vertex the arc from one offset
// edge to the next, at a reflex vertex the same arc run backwards; arcs in §3.7's chords of at most 2 cm sagitta,
// `arcSteps`), whose region of positive winding is the sum (Kaul, Farouki and O'Connor's convolution theorem; the
// boundary is CCW, so non-zero is positive), taken with the boundary through one overlay of the kernel's `booleans` —
// the same region §3.4's `buffer` of the closed ring united with the boundary gives, at a small part of its cost
// (`settlementPerimeterByBuffer` keeps that form for the test that holds the two equal). Before the overlay two fast
// rings are tried — the curve mitred at its reflex vertices, then mitred only where the miter lies on both its offset
// segments — each with its local folds cut; a fast ring stands only when `isSumRing` finds it the sum's outer ring (a
// miter beyond its edges cuts across land the sum holds, C-0245 (1), C-0252), and the overlay's ring is checked the same way
// (a ring that fails is refused, never returned). The boundary's exactly collinear vertices are merged first
// (`mergeCollinear`, §3.8's collinear pre-clean in value form; N-56 (2), C-0305): the overlay's union merges them, so a
// boundary that kept them would put one ring edge across two of its halves and fail the sum check — the perimeter is
// a function of the boundary's region, not of how its straight runs are split. The ring is a value; S6's
// batch inserts it as an L1 chain carrying `district_bound`, closed against the arterials and shores it meets by the
// insertion rules (§3.6).
import { arcSteps, area2, dmath, err, LATTICE, ok, orient2d, type Kernel, type KernelResult, type LatticePoint } from '@plat/kernel';
import { insideRing, quot } from '../siting/geom.js';
import type { TableView } from '@plat/tables';
import { districtCells } from './table.js';

/** The options of `settlementPerimeter`. */
export interface PerimeterOptions {
  /** The frame rectangle (counter-clockwise): the perimeter is clipped to it. Absent: no clip. */
  readonly frame?: readonly LatticePoint[];
  /** The offset (cm) in place of `district.perimeter.offsetM`. */
  readonly offsetCm?: number;
  readonly tables?: TableView;
}

/** The ring of largest area among the outer (counter-clockwise) rings, or null. */
function largestOuter(rings: readonly (readonly LatticePoint[])[]): LatticePoint[] | null {
  let best: LatticePoint[] | null = null;
  let bestArea = 0;
  for (const r of rings) {
    const a = area2(r as LatticePoint[]);
    if (a > bestArea) {
      bestArea = a;
      best = r.slice();
    }
  }
  return best;
}

/**
 * §4.5's settlement perimeter of `boundary` (a counter-clockwise ring of lattice points): the outer ring of the
 * boundary united with its buffer of the offset (round joins and ends), clipped to `opts.frame` when given. Refuses
 * E_DEGENERATE for a boundary of fewer than three points or of no area, and E_INVARIANT when no ring it builds passes
 * the sum check (`isSumRing`): a wrong ring is never returned.
 */
export function settlementPerimeter(boundary: readonly LatticePoint[], k: Kernel, opts: PerimeterOptions = {}): KernelResult<LatticePoint[]> {
  if (boundary.length < 3 || area2(boundary as LatticePoint[]) <= 0) return err('E_DEGENERATE', 'settlementPerimeter: the boundary is no counter-clockwise ring of area above zero');
  const offsetCm = opts.offsetCm ?? Math.round(districtCells(opts.tables).perimeterOffsetM * 100);
  if (!(offsetCm >= 0 && Number.isFinite(offsetCm))) throw new RangeError(`settlementPerimeter: the offset is a finite length ≥ 0, got ${String(offsetCm)}`);
  // The boundary as a region: its exactly collinear vertices merged (a copy, unchanged, when it has none).
  const b = mergeCollinear(boundary);
  let ring: LatticePoint[] = b;
  if (offsetCm > 0) {
    const raw = convolution(b, offsetCm, 'miter');
    if (raw === null) return err('E_DEGENERATE', 'settlementPerimeter: the boundary has fewer than three distinct points');
    // A fast ring stands only where the check (`isSumRing`) finds it the sum's outer ring: first the mitred curve with
    // its local folds cut, then the curve mitred only where a miter lies on both its offset segments (the reflex arc
    // elsewhere), its folds cut; else (a fold the cut did not resolve, a curve that runs too near another part of the
    // boundary) the sum's outer ring through one overlay of the full convolution, itself checked — a ring that fails is
    // refused, never committed (C-0245 (1)).
    let fast = unloop(raw);
    if (!(simpleCcw(fast) && isSumRing(b, fast, offsetCm, SUM_TOLERANCE_CM))) {
      fast = unloop(convolution(b, offsetCm, 'onSegments') as LatticePoint[]);
      if (!(simpleCcw(fast) && isSumRing(b, fast, offsetCm, SUM_TOLERANCE_CM))) fast = [];
    }
    if (fast.length > 0) ring = fast;
    else {
      const full = convolution(b, offsetCm, 'arc') as LatticePoint[];
      const u = k.geom.booleans('union', [b.slice()], [full], 'nonzero');
      if (!u.ok) return err(u.code, `settlementPerimeter: the union: ${u.detail}`);
      const outer = largestOuter(u.value);
      if (outer === null) return err('E_DEGENERATE', 'settlementPerimeter: the offset has no outer ring');
      if (!isSumRing(b, outer, offsetCm, OVERLAY_TOLERANCE_CM)) return err('E_INVARIANT', 'settlementPerimeter: the overlay\'s outer ring is not the boundary\'s offset (the sum check failed)');
      ring = outer;
    }
  }
  if (opts.frame !== undefined && !within(ring, opts.frame)) {
    const c = k.geom.booleans('intersection', [ring], [opts.frame.slice()], 'nonzero');
    if (!c.ok) return err(c.code, `settlementPerimeter: the frame clip: ${c.detail}`);
    const outer = largestOuter(c.value);
    if (outer === null) return err('E_DEGENERATE', 'settlementPerimeter: the perimeter lies outside the frame');
    ring = outer;
  }
  return ok(ring);
}

/** A point in cm. */
interface Pt {
  x: number;
  y: number;
}

/**
 * The ring with its exactly collinear vertices merged (§3.8's "merging collinear vertices" pre-clean in value form;
 * N-56 (2), C-0305): a vertex v between neighbours a and b with orient2d(a, v, b) = 0 and the ring running on through
 * it ((v − a) · (b − v) > 0) is dropped. Dropping such a vertex leaves the direction of the edges into and out of its
 * neighbours unchanged (a run of them lies on one line, each strictly ahead of the last), so one pass against the
 * original neighbours finds every one and the result is the same in any order. A vertex where the ring folds back or
 * repeats (dot ≤ 0) is kept — no continuation, the simplicity check's or the kernel's to judge. A ring with no such
 * vertex comes back as a copy, unchanged (a no-op on every ring that has none: zero shift). Exact on the lattice.
 */
export function mergeCollinear(ring: readonly LatticePoint[]): LatticePoint[] {
  const n = ring.length;
  if (n < 3) return ring.slice();
  const out: LatticePoint[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = ring[i === 0 ? n - 1 : i - 1];
    const v = ring[i];
    const c = ring[i + 1 === n ? 0 : i + 1];
    if (orient2d(a.x, a.y, v.x, v.y, c.x, c.y) === 0 && (v.x - a.x) * (c.x - v.x) + (v.y - a.y) * (c.y - v.y) > 0) continue;
    out.push(v);
  }
  // A ring of no area has every vertex on one line; it is refused before this is reached, and kept whole here.
  return out.length >= 3 ? out : ring.slice();
}

/**
 * The convolution curve of a counter-clockwise ring with a disc of radius d (see the module comment): one closed ring
 * of lattice points (consecutive repeats dropped), or null for fewer than three distinct points. `reflex` 'arc' runs
 * the arc backwards at a reflex vertex (the full convolution); 'miter' takes the two offset edges' meeting point there
 * instead, and 'onSegments' only where that point lies on both offset segments — neither is the sum's boundary unless
 * the caller's check (`isSumRing`) finds it so.
 */
export function convolution(boundary: readonly LatticePoint[], d: number, reflex: 'arc' | 'miter' | 'onSegments'): LatticePoint[] | null {
  const pts: Pt[] = [];
  for (const p of boundary) {
    const q = pts[pts.length - 1];
    if (q === undefined || q.x !== p.x || q.y !== p.y) pts.push({ x: p.x, y: p.y });
  }
  while (pts.length > 1 && pts[0].x === pts[pts.length - 1].x && pts[0].y === pts[pts.length - 1].y) pts.pop();
  const n = pts.length;
  if (n < 3) return null;
  // Each edge's unit direction and outward normal (the right side of a counter-clockwise ring).
  const nx: number[] = [];
  const ny: number[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = pts[i];
    const b = pts[(i + 1) % n];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    nx.push(quot(dy, len, 'length', 'an edge'));
    ny.push(quot(-dx, len, 'length', 'an edge'));
  }
  const out: LatticePoint[] = [];
  const push = (x: number, y: number): void => {
    const q = { x: Math.round(x), y: Math.round(y) } as LatticePoint;
    const last = out[out.length - 1];
    if (last === undefined || last.x !== q.x || last.y !== q.y) out.push(q);
  };
  for (let i = 0; i < n; i += 1) {
    const v = pts[i];
    const j = (i + n - 1) % n;
    // The normal turns from edge j's to edge i's by θ: positive at a convex vertex, negative at a reflex one.
    const cross = nx[j] * ny[i] - ny[j] * nx[i];
    const dot = nx[j] * nx[i] + ny[j] * ny[i];
    const theta = dmath.atan2(cross, dot);
    const turn = orient2d(pts[j].x, pts[j].y, v.x, v.y, pts[(i + 1) % n].x, pts[(i + 1) % n].y);
    if (turn < 0 && (1 + dot) * 1_000_000 >= 1 && (reflex === 'miter' || (reflex === 'onSegments' && miterOnBoth(pts[j], v, pts[(i + 1) % n], nx[j], ny[j], nx[i], ny[i], dot, d)))) {
      // The offset lines' meeting point: v + d (n_j + n_i) ÷ (1 + n_j · n_i), scaled past ratio's floor (a notch so
      // sharp that 1 + n_j · n_i falls below it takes the reflex arc) — under 'onSegments' only where it lies on both
      // offset segments; else the reflex arc, as the full convolution runs it (the fold it makes is the cut's or the
      // overlay's).
      push(v.x + quot(d * (nx[j] + nx[i]) * 1_000_000, (1 + dot) * 1_000_000, 'length', 'a miter'), v.y + quot(d * (ny[j] + ny[i]) * 1_000_000, (1 + dot) * 1_000_000, 'length', 'a miter'));
      continue;
    }
    push(v.x + d * nx[j], v.y + d * ny[j]);
    if (turn !== 0 && theta !== 0) {
      const steps = arcSteps(Math.abs(theta), d);
      for (let s = 1; s < steps; s += 1) {
        const phi = quot(theta * s, steps, 'count', 'an arc step');
        const c = dmath.cos(phi);
        const sn = dmath.sin(phi);
        push(v.x + d * (nx[j] * c - ny[j] * sn), v.y + d * (nx[j] * sn + ny[j] * c));
      }
    }
    push(v.x + d * nx[i], v.y + d * ny[i]);
  }
  const first = out[0];
  const last = out[out.length - 1];
  if (out.length > 1 && first.x === last.x && first.y === last.y) out.pop();
  return out.length >= 3 ? out : null;
}

/**
 * Does the reflex miter at v (edges a→v and v→b, outward normals n_j and n_i, n_j · n_i = dot) lie on both offset
 * segments — its foot along a→v within that edge and along v→b within that one? A miter whose foot runs past an edge
 * would cut across the land beyond it (C-0245 (1)). Decided without the division: d (n_j + n_i) · u ÷ (1 + dot) against
 * the edge's length, both sides times 1 + dot > 0.
 */
function miterOnBoth(a: Pt, v: Pt, b: Pt, njx: number, njy: number, nix: number, niy: number, dot: number, d: number): boolean {
  const den = 1 + dot;
  const ajx = v.x - a.x;
  const ajy = v.y - a.y;
  const aix = b.x - v.x;
  const aiy = b.y - v.y;
  const sx = d * (njx + nix);
  const sy = d * (njy + niy);
  // (m − v) · (v − a) = s · (v − a) ÷ den must lie in [−|v − a|², 0]; (m − v) · (b − v) = s · (b − v) ÷ den in [0, |b − v|²].
  const tj = sx * ajx + sy * ajy;
  const ti = sx * aix + sy * aiy;
  const lj = ajx * ajx + ajy * ajy;
  const li = aix * aix + aiy * aiy;
  return tj <= 0 && -tj <= lj * den && ti >= 0 && ti <= li * den;
}

/**
 * How far (cm) a ring may stray from the offset distance and still be the sum's boundary. The fast ring: its arcs'
 * chords (2 cm sagitta) and its roundings. The overlay's ring: besides, the arrangement's booleans place every vertex
 * by the insertion rules (attraction within `LATTICE.attractCm`, `minEdge`, hot pixels), which moved the ring by up
 * to 60 cm on the notched, finger and grown outlines measured (C-0245 (1)); four attraction radii bound it, and a
 * ring beyond that is refused.
 */
export const SUM_TOLERANCE_CM = 5;
export const OVERLAY_TOLERANCE_CM = 4 * LATTICE.attractCm;

/** The squared distance of p to the segment ab. */
function segDist2(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  let t = 0;
  // the projection's parameter, clamped to the segment (l2 ≥ 1 cm² between two distinct lattice points)
  if (l2 > 0) t = Math.max(0, Math.min(1, quot((px - ax) * dx + (py - ay) * dy, l2, 'area', 'a segment projection')));
  const ex = ax + t * dx - px;
  const ey = ay + t * dy - py;
  return ex * ex + ey * ey;
}

/**
 * Is `ring` the outer ring of the boundary's Minkowski sum with a disc of radius d (within `tolCm`)? The
 * check (C-0245 (1)): no ring edge comes nearer the boundary than d less the tolerance (so it crosses no boundary edge
 * and runs through no land of the sum's interior), each ring edge has both ends within d plus the tolerance of one
 * boundary edge (the distance to a segment is convex, so the whole edge does), and the boundary's first vertex lies
 * inside the ring (the boundary is connected and the ring meets it nowhere, so all of it does). A simple ring in that
 * shell enclosing the boundary is the sum's outer boundary. The boundary is read as a region: its exactly collinear
 * vertices are merged first (`mergeCollinear`), else a ring edge spanning two halves of one straight boundary side —
 * the overlay's union merges such vertices — would be near neither half alone (N-56 (2)). Edges are bucketed on a grid
 * of cells of d.
 */
export function isSumRing(given: readonly LatticePoint[], ring: readonly LatticePoint[], d: number, tolCm: number = SUM_TOLERANCE_CM): boolean {
  const boundary = mergeCollinear(given);
  const n = boundary.length;
  const m = ring.length;
  if (n < 2 || m < 3 || !(d > 0)) return false;
  if (!insideRing(ring, boundary[0])) return false;
  const lo = d - tolCm;
  const hi = d + tolCm;
  const lo2 = lo * lo;
  const hi2 = hi * hi;
  const cell = Math.max(d, 1);
  const cellOf = (v: number): number => Math.floor(quot(v, cell, 'length', 'a grid cell'));
  const grid = new Map<string, number[]>();
  for (let i = 0; i < n; i += 1) {
    const a = boundary[i];
    const b = boundary[(i + 1) % n];
    for (let cx = cellOf(Math.min(a.x, b.x)); cx <= cellOf(Math.max(a.x, b.x)); cx += 1) {
      for (let cy = cellOf(Math.min(a.y, b.y)); cy <= cellOf(Math.max(a.y, b.y)); cy += 1) {
        const key = `${String(cx)},${String(cy)}`;
        const l = grid.get(key);
        if (l === undefined) grid.set(key, [i]);
        else l.push(i);
      }
    }
  }
  const seen = new Int32Array(n).fill(-1);
  for (let r = 0; r < m; r += 1) {
    const p = ring[r];
    const q = ring[(r + 1) % m];
    let near = false;
    for (let cx = cellOf(Math.min(p.x, q.x) - hi); cx <= cellOf(Math.max(p.x, q.x) + hi); cx += 1) {
      for (let cy = cellOf(Math.min(p.y, q.y) - hi); cy <= cellOf(Math.max(p.y, q.y) + hi); cy += 1) {
        const l = grid.get(`${String(cx)},${String(cy)}`);
        if (l === undefined) continue;
        for (const i of l) {
          if (seen[i] === r) continue;
          seen[i] = r;
          const a = boundary[i];
          const b = boundary[(i + 1) % n];
          // The segments' distance: 0 when they meet, else the least of the four end-to-segment distances.
          if (meet(p, q, a, b)) return false;
          const dp = segDist2(p.x, p.y, a.x, a.y, b.x, b.y);
          const dq = segDist2(q.x, q.y, a.x, a.y, b.x, b.y);
          if (dp < lo2 || dq < lo2 || segDist2(a.x, a.y, p.x, p.y, q.x, q.y) < lo2 || segDist2(b.x, b.y, p.x, p.y, q.x, q.y) < lo2) return false;
          if (dp <= hi2 && dq <= hi2) near = true;
        }
      }
    }
    if (!near) return false;
  }
  return true;
}

/**
 * The perimeter through §3.4's `buffer` of the boundary's closed ring (round joins and ends) united with the boundary,
 * clipped to the frame: the reference the convolution form is held equal to by M0-e-04's test (C-0245 (1)).
 */
export function settlementPerimeterByBuffer(boundary: readonly LatticePoint[], k: Kernel, opts: PerimeterOptions = {}): KernelResult<LatticePoint[]> {
  if (boundary.length < 3 || area2(boundary as LatticePoint[]) <= 0) return err('E_DEGENERATE', 'settlementPerimeter: the boundary is no counter-clockwise ring of area above zero');
  const offsetCm = opts.offsetCm ?? Math.round(districtCells(opts.tables).perimeterOffsetM * 100);
  const b = k.geom.buffer([[...boundary, boundary[0]]], offsetCm, 'round', 'round');
  if (!b.ok) return err(b.code, b.detail);
  const u = k.geom.booleans('union', [boundary.slice()], b.value, 'nonzero');
  if (!u.ok) return err(u.code, u.detail);
  let ring = largestOuter(u.value);
  if (ring === null) return err('E_DEGENERATE', 'no outer ring');
  if (opts.frame !== undefined) {
    const c = k.geom.booleans('intersection', [ring], [opts.frame.slice()], 'nonzero');
    if (!c.ok) return err(c.code, c.detail);
    ring = largestOuter(c.value);
    if (ring === null) return err('E_DEGENERATE', 'outside the frame');
  }
  return ok(ring);
}


/** Does the ring lie inside (or on) the frame's bounding box? */
function within(ring: readonly LatticePoint[], frame: readonly LatticePoint[]): boolean {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const p of frame) {
    x0 = Math.min(x0, p.x);
    y0 = Math.min(y0, p.y);
    x1 = Math.max(x1, p.x);
    y1 = Math.max(y1, p.y);
  }
  for (const p of ring) if (p.x < x0 || p.x > x1 || p.y < y0 || p.y > y1) return false;
  return true;
}

/** Do the closed segments ab and cd meet (exact orientation on integers)? */
export function meet(a: LatticePoint, b: LatticePoint, c: LatticePoint, d: LatticePoint): boolean {
  const o1 = Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y));
  const o2 = Math.sign(orient2d(a.x, a.y, b.x, b.y, d.x, d.y));
  const o3 = Math.sign(orient2d(c.x, c.y, d.x, d.y, a.x, a.y));
  const o4 = Math.sign(orient2d(c.x, c.y, d.x, d.y, b.x, b.y));
  if (o1 !== o2 && o3 !== o4) return true;
  const on = (p: LatticePoint, q: LatticePoint, r: LatticePoint): boolean => Math.min(p.x, q.x) <= r.x && r.x <= Math.max(p.x, q.x) && Math.min(p.y, q.y) <= r.y && r.y <= Math.max(p.y, q.y);
  return (o1 === 0 && on(a, b, c)) || (o2 === 0 && on(a, b, d)) || (o3 === 0 && on(c, d, a)) || (o4 === 0 && on(c, d, b));
}

/**
 * Is the ring simple (no two non-adjacent edges meet, adjacent edges meet only at their shared vertex) and
 * counter-clockwise? Edges are bucketed on a grid of cells as large as the longest edge, so only near edges are tested.
 */
export function simpleCcw(ring: readonly LatticePoint[]): boolean {
  const n = ring.length;
  if (n < 3 || area2(ring as LatticePoint[]) <= 0) return false;
  let cell = 1;
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    cell = Math.max(cell, Math.abs(b.x - a.x), Math.abs(b.y - a.y));
  }
  const grid = new Map<string, number[]>();
  const cellOf = (v: number): number => Math.floor(quot(v, cell, 'length', 'a grid cell'));
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    const cx0 = cellOf(Math.min(a.x, b.x));
    const cx1 = cellOf(Math.max(a.x, b.x));
    const cy0 = cellOf(Math.min(a.y, b.y));
    const cy1 = cellOf(Math.max(a.y, b.y));
    for (let cx = cx0; cx <= cx1; cx += 1) {
      for (let cy = cy0; cy <= cy1; cy += 1) {
        const key = `${String(cx)},${String(cy)}`;
        const l = grid.get(key);
        if (l === undefined) grid.set(key, [i]);
        else l.push(i);
      }
    }
  }
  for (const l of grid.values()) {
    for (let x = 0; x < l.length; x += 1) {
      for (let y = x + 1; y < l.length; y += 1) {
        const i = l[x];
        const j = l[y];
        const adjacent = (i + 1) % n === j || (j + 1) % n === i;
        const a = ring[i];
        const b = ring[(i + 1) % n];
        const c = ring[j];
        const d = ring[(j + 1) % n];
        if (!adjacent) {
          if (meet(a, b, c, d)) return false;
          continue;
        }
        // Adjacent edges: they share one vertex; they fold back when the other end lies on the other edge.
        const [p, q, r] = (i + 1) % n === j ? [a, b, d] : [c, d, b];
        if (orient2d(p.x, p.y, q.x, q.y, r.x, r.y) === 0 && (r.x - q.x) * (p.x - q.x) + (r.y - q.y) * (p.y - q.y) > 0) return false;
      }
    }
  }
  return true;
}

/** How many edges ahead a local fold is looked for (a fold of a concavity narrower than the offset spans a few). */
export const UNLOOP_WINDOW = 64;

/** Where the segments ab and cd cross (doubles), or null for parallel ones. */
function crossing(a: LatticePoint, b: LatticePoint, c: LatticePoint, d: LatticePoint): { x: number; y: number } | null {
  const rx = b.x - a.x;
  const ry = b.y - a.y;
  const sx = d.x - c.x;
  const sy = d.y - c.y;
  const den = rx * sy - ry * sx;
  if (den === 0) return null;
  const t = quot((c.x - a.x) * sy - (c.y - a.y) * sx, den, 'area', 'a crossing');
  return { x: a.x + t * rx, y: a.y + t * ry };
}

/**
 * The curve with its local folds cut out (C-0245 (1)): started at its lowest-then-leftmost point (on the hull, so on
 * the sum's outer ring and inside no fold), each edge is tested against the next UNLOOP_WINDOW; where the farthest
 * such edge crosses it, the vertices between are replaced by the crossing point (the swallowtail a concavity narrower
 * than the offset folds the curve into, which lies inside the sum). A fold the window cannot see is left for the
 * caller's simplicity check and its overlay.
 */
export function unloop(ring: readonly LatticePoint[]): LatticePoint[] {
  let start = 0;
  for (let i = 1; i < ring.length; i += 1) if (ring[i].y < ring[start].y || (ring[i].y === ring[start].y && ring[i].x < ring[start].x)) start = i;
  const pts = [...ring.slice(start), ...ring.slice(0, start)];
  const out: LatticePoint[] = [];
  let i = 0;
  const n = pts.length;
  while (i < n) {
    out.push(pts[i]);
    if (i + 1 >= n) break;
    let cut = -1;
    for (let j = Math.min(n - 1, i + UNLOOP_WINDOW); j >= i + 2; j -= 1) {
      if (meet(pts[i], pts[i + 1], pts[j], pts[(j + 1) % n])) {
        cut = j;
        break;
      }
    }
    if (cut < 0 || (cut + 1) % n === 0) {
      i += 1;
      continue;
    }
    const x = crossing(pts[i], pts[i + 1], pts[cut], pts[cut + 1]);
    if (x !== null) {
      const q = { x: Math.round(x.x), y: Math.round(x.y) } as LatticePoint;
      const last = out[out.length - 1];
      if (last.x !== q.x || last.y !== q.y) out.push(q);
    }
    i = cut + 1;
  }
  const dedup: LatticePoint[] = [];
  for (const p of out) {
    const q = dedup[dedup.length - 1];
    if (q === undefined || q.x !== p.x || q.y !== p.y) dedup.push(p);
  }
  while (dedup.length > 1 && dedup[0].x === dedup[dedup.length - 1].x && dedup[0].y === dedup[dedup.length - 1].y) dedup.pop();
  return dedup;
}
