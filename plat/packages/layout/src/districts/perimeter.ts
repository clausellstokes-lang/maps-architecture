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
import { distToSegment2, insideRing, quot, segmentsMeet } from '../siting/geom.js';
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

/** The ring of largest area among the outer (counter-clockwise) rings, or null (the first of equal largest areas). */
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
 * E_DEGENERATE for a boundary of fewer than three points or of no area, and E_INVARIANT when no ring it builds is simple
 * and passes the sum check (`isSumRing`): a wrong ring is never returned. The frame clip keeps the piece of largest
 * area and drops the others: their land lies outside the perimeter, so it is the hinterland's (C-0245 (2)). A boundary
 * inside the frame — every stage's is — gives one piece: the frame is convex, so every point of the sum inside it is
 * joined to the boundary by a segment inside both; only a boundary that leaves the frame and re-enters it splits.
 * The construction that stood is `settlementPerimeterRung`'s (S6 reports the buffer rung, C-0454).
 */
export function settlementPerimeter(boundary: readonly LatticePoint[], k: Kernel, opts: PerimeterOptions = {}): KernelResult<LatticePoint[]> {
  const r = settlementPerimeterRung(boundary, k, opts);
  return r.ok ? ok(r.value.ring, r.warnings) : err(r.code, r.detail);
}

/**
 * Which construction gave the perimeter's ring (C-0454): the mitred curve with its folds cut (`fast`), the curve mitred
 * on its segments (`onSegments`), the overlay of the full convolution (`overlay`), §3.4's buffer of the closed ring
 * united with the boundary (`buffer`, the declared fallback rung), or none (`offset` 0: the boundary itself).
 */
export type PerimeterRung = 'none' | 'fast' | 'onSegments' | 'overlay' | 'buffer';

/**
 * `settlementPerimeter` with the construction that stood (`PerimeterRung`). The rungs, in order: the two fast rings,
 * each standing only when `isSumRing` finds it the sum's outer ring at `SUM_TOLERANCE_CM`; the overlay of the full
 * convolution, its ring held to `simpleCcw` and `isSumRing` at `OVERLAY_TOLERANCE_CM`; then — only where the overlay
 * refused or its ring failed a check, and only for a boundary with a region reading (`regionLoops`: a simple
 * counter-clockwise ring once its repeated vertices are dropped — §4.5's input —, or one pinched at vertices it visits
 * twice into counter-clockwise lobes, read as their union, a deterministic repair of that unlawful input; an antenna, a
 * clockwise lobe or a touch at no vertex has none and keeps the overlay's typed refusal) — the BUFFER RUNG: §3.4's
 * buffer of the closed ring (round joins and ends) united with the boundary, the form §4.5 names, held to the same two
 * checks. It costs about five overlays, so it is a rung, never the first construction (Q133: the overlay refuses an
 * interior swallowtail fold of the full convolution at a concave bay narrower than the offset, or leaves a sliver past
 * its tolerance; the buffer's arcs never fold there). A ring no rung stands is refused with the overlay's code and
 * text, the buffer rung's refusal appended.
 */
export function settlementPerimeterRung(boundary: readonly LatticePoint[], k: Kernel, opts: PerimeterOptions = {}): KernelResult<{ ring: LatticePoint[]; rung: PerimeterRung }> {
  if (boundary.length < 3 || area2(boundary as LatticePoint[]) <= 0) return err('E_DEGENERATE', 'settlementPerimeter: the boundary is no counter-clockwise ring of area above zero');
  const offsetCm = opts.offsetCm ?? Math.round(districtCells(opts.tables).perimeterOffsetM * 100);
  if (!(offsetCm >= 0 && Number.isFinite(offsetCm))) throw new RangeError(`settlementPerimeter: the offset is a finite length ≥ 0, got ${String(offsetCm)}`);
  // The boundary as a region: its exactly collinear vertices merged (a copy, unchanged, when it has none).
  const b = mergeCollinear(boundary);
  let ring: LatticePoint[] = b;
  let rung: PerimeterRung = 'none';
  if (offsetCm > 0) {
    const raw = convolution(b, offsetCm, 'miter');
    if (raw === null) return err('E_DEGENERATE', 'settlementPerimeter: the boundary has fewer than three distinct points');
    // A fast ring stands only where the check (`isSumRing`) finds it the sum's outer ring: first the mitred curve with
    // its local folds cut, then the curve mitred only where a miter lies on both its offset segments (the reflex arc
    // elsewhere), its folds cut; else (a fold the cut did not resolve, a curve that runs too near another part of the
    // boundary) the sum's outer ring through one overlay of the full convolution, itself checked — a ring that fails is
    // never committed (C-0245 (1)) — and, where it fails, the buffer rung.
    let fast = unloop(raw);
    rung = 'fast';
    if (!(simpleCcw(fast) && isSumRing(b, fast, offsetCm, SUM_TOLERANCE_CM))) {
      fast = unloop(convolution(b, offsetCm, 'onSegments') as LatticePoint[]);
      rung = 'onSegments';
      if (!(simpleCcw(fast) && isSumRing(b, fast, offsetCm, SUM_TOLERANCE_CM))) fast = [];
    }
    if (fast.length > 0) ring = fast;
    else {
      const o = overlayRing(b, k, offsetCm);
      if (o.ok) {
        ring = o.value;
        rung = 'overlay';
      } else {
        // the declared fallback rung (C-0454): a boundary with a region reading only (`regionLoops`: simple once its
        // repeated vertices are dropped, or pinched into counter-clockwise lobes at vertices it visits twice) — an
        // antenna, a clockwise lobe or a touch at no vertex has none (unlawful input) and keeps the overlay's refusal
        if (regionLoops(b) === null) return err(o.code, o.detail);
        const f = bufferRing(b, k, offsetCm);
        if (!f.ok) return err(o.code, `${o.detail}; the buffer rung: ${f.detail}`);
        ring = f.value;
        rung = 'buffer';
      }
    }
  }
  if (opts.frame !== undefined && !within(ring, opts.frame)) {
    const c = k.geom.booleans('intersection', [ring], [opts.frame.slice()], 'nonzero');
    if (!c.ok) return err(c.code, `settlementPerimeter: the frame clip: ${c.detail}`);
    const outer = largestOuter(c.value);
    if (outer === null) return err('E_DEGENERATE', 'settlementPerimeter: the perimeter lies outside the frame');
    ring = outer;
  }
  return ok({ ring, rung });
}

/**
 * The boundary's region reading for the buffer rung (C-0454), or null where it has none: its consecutive repeated
 * vertices dropped (`withoutRepeats`), then cut at every vertex it visits twice into lobes (a pinch: lobes meeting at
 * one point, or a ring given twice round); the reading stands when every lobe is a simple counter-clockwise ring of area
 * above zero — the region is then the lobes' union, and §3.4's buffer of the closed ring united with the boundary
 * (nonzero) is its sum. An antenna (a lobe of two points), a clockwise lobe (a hole touching the boundary), a crossing,
 * or a touch at a point that is no vertex of both edges leaves none: null. The same ring gives the same lobes.
 */
function regionLoops(ring: readonly LatticePoint[]): LatticePoint[][] | null {
  const lobes: LatticePoint[][] = [];
  const stack: LatticePoint[] = [];
  const at = new Map<string, number>();
  for (const q of withoutRepeats(ring)) {
    const key = `${String(q.x)},${String(q.y)}`;
    const i = at.get(key);
    if (i === undefined) {
      at.set(key, stack.length);
      stack.push(q);
      continue;
    }
    // q closes the lobe from its first visit: the lobe is that vertex and every vertex after it; q's first visit stays
    const tail = stack.splice(i + 1);
    for (const p of tail) at.delete(`${String(p.x)},${String(p.y)}`);
    lobes.push([stack[i], ...tail]);
  }
  lobes.push(stack);
  return lobes.every((l) => simpleCcw(l)) ? lobes : null;
}

/** The ring with its consecutive repeated vertices dropped (cyclically): the same point set, every edge of length > 0. */
function withoutRepeats(ring: readonly LatticePoint[]): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const q of ring) {
    const last = out[out.length - 1];
    if (last === undefined || last.x !== q.x || last.y !== q.y) out.push(q);
  }
  while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  return out;
}

/**
 * The overlay rung: the outer ring of the boundary united with its full convolution (the reflex arcs run backwards, so
 * every swallowtail fold is in the curve) through one overlay of the kernel's `booleans`, held to `simpleCcw` (the sum
 * check reads a simple ring) and to `isSumRing` at `OVERLAY_TOLERANCE_CM`.
 */
function overlayRing(b: readonly LatticePoint[], k: Kernel, offsetCm: number): KernelResult<LatticePoint[]> {
  const full = convolution(b, offsetCm, 'arc') as LatticePoint[];
  const u = k.geom.booleans('union', [b.slice()], [full], 'nonzero');
  if (!u.ok) return err(u.code, `settlementPerimeter: the union: ${u.detail}`);
  return checkedOuter(b, u.value, offsetCm, 'settlementPerimeter: the overlay\'s', 'settlementPerimeter: the offset');
}

/**
 * The buffer rung (C-0454): the outer ring of the boundary united with §3.4's buffer of its closed ring (round joins and
 * ends) — `settlementPerimeterByBuffer`'s region before its clip — held to the overlay's two checks.
 */
function bufferRing(b: readonly LatticePoint[], k: Kernel, offsetCm: number): KernelResult<LatticePoint[]> {
  const buf = k.geom.buffer([[...b, b[0]]], offsetCm, 'round', 'round');
  if (!buf.ok) return err(buf.code, `the buffer: ${buf.detail}`);
  const u = k.geom.booleans('union', [b.slice()], buf.value, 'nonzero');
  if (!u.ok) return err(u.code, `the union: ${u.detail}`);
  return checkedOuter(b, u.value, offsetCm, 'the buffer\'s', 'the buffer');
}

/** The largest outer ring of an overlay's rings, held to `simpleCcw` and `isSumRing` at `OVERLAY_TOLERANCE_CM`. */
function checkedOuter(b: readonly LatticePoint[], rings: readonly (readonly LatticePoint[])[], offsetCm: number, whose: string, what: string): KernelResult<LatticePoint[]> {
  const outer = largestOuter(rings);
  if (outer === null) return err('E_DEGENERATE', `${what} has no outer ring`);
  // the sum check reads a simple ring (a simple ring in the shell enclosing the boundary is the sum's outer one), so
  // the ring is held to `simpleCcw` like the fast rings, not trusted to the overlay's contract
  if (!simpleCcw(outer)) return err('E_INVARIANT', `${whose} outer ring is not a simple counter-clockwise ring (the sum check reads a simple one)`);
  if (!isSumRing(b, outer, offsetCm, OVERLAY_TOLERANCE_CM)) return err('E_INVARIANT', `${whose} outer ring is not the boundary's offset (the sum check failed)`);
  return ok(outer);
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
 * vertex comes back as a copy, unchanged (a no-op on every ring that has none). Exact on the lattice.
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

/** How many times the sum check halves one ring edge in its whole-boundary nearness test before it refuses the edge. */
const NEAR_HALVINGS = 32;

/**
 * Is `ring` the outer ring of the boundary's Minkowski sum with a disc of radius d (within `tolCm`)? The
 * check (C-0245 (1)): no ring edge comes nearer the boundary than d less the tolerance (so it crosses no boundary edge
 * and runs through no land of the sum's interior), every point of each ring edge lies within d plus the tolerance of the
 * boundary as a whole, and the boundary's first vertex lies inside the ring (the boundary is connected and the ring
 * meets it nowhere, so all of it does). A simple ring in that shell enclosing the boundary is the sum's outer boundary.
 * The upper bound is tested edge by edge: an edge whose two ends lie within d plus the tolerance of ONE boundary edge
 * holds it whole (the distance to a segment is convex); else the edge is halved (C-0454; Q133's B1 — a ring edge beside
 * a near-collinear run of boundary edges, each end near a different one), a piece passing when one boundary edge is near
 * both its ends or its midpoint's distance to the boundary plus its half-length is within the bound, and failing when
 * its midpoint lies beyond the bound (a ring point outside the shell) or after `NEAR_HALVINGS` halvings. The boundary
 * is read as a region: its exactly collinear vertices are merged first (`mergeCollinear`; N-56 (2)). Edges are bucketed
 * on a grid of cells of d; the distances are siting's `distToSegment2` (the foot clamped to the segment), the crossing
 * test its `segmentsMeet`.
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
  // The boundary edges in the cells of the box of p and q grown by hi (each once, in grid order).
  const around = (p: Pt, q: Pt): number[] => {
    const out: number[] = [];
    const had = new Set<number>();
    for (let cx = cellOf(Math.min(p.x, q.x) - hi); cx <= cellOf(Math.max(p.x, q.x) + hi); cx += 1) {
      for (let cy = cellOf(Math.min(p.y, q.y) - hi); cy <= cellOf(Math.max(p.y, q.y) + hi); cy += 1) {
        const l = grid.get(`${String(cx)},${String(cy)}`);
        if (l === undefined) continue;
        for (const i of l) {
          if (had.has(i)) continue;
          had.add(i);
          out.push(i);
        }
      }
    }
    return out;
  };
  // The upper bound on the piece pq of a ring edge against the boundary as a whole (see the header).
  const nearAlong = (p: Pt, q: Pt, halvings: number): boolean => {
    const ids = around(p, q);
    for (const i of ids) if (distToSegment2(p, boundary[i], boundary[(i + 1) % n]) <= hi2 && distToSegment2(q, boundary[i], boundary[(i + 1) % n]) <= hi2) return true;
    const mid = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    let dm2 = Infinity;
    for (const i of ids) dm2 = Math.min(dm2, distToSegment2(mid, boundary[i], boundary[(i + 1) % n]));
    if (!(dm2 <= hi2)) return false;
    const half = Math.sqrt((q.x - p.x) * (q.x - p.x) + (q.y - p.y) * (q.y - p.y)) / 2;
    if (Math.sqrt(dm2) + half <= hi) return true;
    if (halvings >= NEAR_HALVINGS) return false;
    return nearAlong(p, mid, halvings + 1) && nearAlong(mid, q, halvings + 1);
  };
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
          if (segmentsMeet(p, q, a, b)) return false;
          const dp = distToSegment2(p, a, b);
          const dq = distToSegment2(q, a, b);
          if (dp < lo2 || dq < lo2 || distToSegment2(a, p, q) < lo2 || distToSegment2(b, p, q) < lo2) return false;
          if (dp <= hi2 && dq <= hi2) near = true;
        }
      }
    }
    if (!near && !nearAlong(p, q, 0)) return false;
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

/** Do the closed segments ab and cd meet (touch or cross)? Siting's `segmentsMeet`, exact through orient2d. */
export { segmentsMeet as meet } from '../siting/geom.js';

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
          if (segmentsMeet(a, b, c, d)) return false;
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
      if (segmentsMeet(pts[i], pts[i + 1], pts[j], pts[(j + 1) % n])) {
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
