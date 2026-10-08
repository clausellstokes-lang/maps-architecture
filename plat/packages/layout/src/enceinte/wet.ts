// The trace's sides against the barred rings — the water and the reservations (N-54 (1); §4.4 *Water and the waterfront*:
// "the trace crosses water only at a water gate", §2.2 rule 7; M0-c-02 session round s1). The pull, the smoothing and
// F-WALL's verdict tested the trace's VERTICES against the barred rings, never its sides, so a vertex pulled across a
// river onto the far bank's land committed bare wall chords over the water (relief-60 CITY seed 9, stage 2). Here a
// side is tested whole: it lies over a ring when some point of it is inside the ring deeper than `WET_TOL_CM` — the
// bank points are lattice roundings of the shore crossings (up to √½ cm off the shore) and a trace that follows a shore
// lies on it, so a side touching its ring within that depth (at a bank pin, along a shore) is no side over it. A side of
// a water gate's course — the chord between its two bank pins, or the boundary's own course kept between them (C-0226
// (7)) — may lie over the water; never over a reservation.
//
// The test is a bound, as `segmentDepartureBound`'s (C-0232 (2)): the signed depth (inside positive) is 1-Lipschitz, so
// on a stretch of half-length h about a point of depth d no point lies deeper than d + h; a stretch is halved until its
// middle is found deeper than the tolerance (over) or the bound clears it (not over), stretches under a centimetre
// cleared at the tolerance plus half a centimetre. Each ring's sides sit in a packed grid (CSR) so a side far from every
// ring costs one box test, a side near one a few cells (the cost measured at CITY, C-0282).
import { orient2d } from '@plat/kernel';
import { quot } from '../siting/geom.js';
import type { XY } from './types.js';

/** A side lies over a ring when a point of it lies inside deeper than this (cm): the graze pin's 2 cm (N-54 (1)). */
export const WET_TOL_CM = 2;

/** The shortest stretch the bound halves (cm): below it the side is cleared at the tolerance plus half of it. */
const MIN_STRETCH_CM = 1;

/** One ring's sides in a packed uniform grid: cell c holds `items[start[c] … start[c + 1])`. */
interface RingGrid {
  readonly ring: readonly XY[];
  readonly minX: number;
  readonly minY: number;
  readonly maxX: number;
  readonly maxY: number;
  readonly cell: number;
  readonly cols: number;
  readonly rows: number;
  readonly start: Int32Array;
  readonly items: Int32Array;
  /** "x,y" → the ring's vertex indices there (a side lying on a ring side is no side over it). */
  readonly at: Map<string, number[]>;
  /** A visit stamp per side (dedupes a side met in several cells). */
  readonly seen: Uint32Array;
  stamp: number;
}

const keyOf = (p: XY): string => `${String(p.x)},${String(p.y)}`;

function clampCell(v: number, lo: number, cell: number, count: number): number {
  const c = Math.floor(quot(v - lo, cell, 'length', 'wet grid cell'));
  return c < 0 ? 0 : c >= count ? count - 1 : c;
}

function gridOf(ring: readonly XY[]): RingGrid {
  const n = ring.length;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const q of ring) {
    if (q.x < minX) minX = q.x;
    if (q.y < minY) minY = q.y;
    if (q.x > maxX) maxX = q.x;
    if (q.y > maxY) maxY = q.y;
  }
  // About one side per cell over the ring's box, never below a metre.
  const w = Math.max(1, maxX - minX);
  const h = Math.max(1, maxY - minY);
  const cell = Math.max(100, Math.sqrt(quot(w * h, Math.max(1, n), 'count', 'wet grid area')));
  const cols = Math.max(1, Math.ceil(quot(w, cell, 'length', 'wet grid cols')) + 1);
  const rows = Math.max(1, Math.ceil(quot(h, cell, 'length', 'wet grid rows')) + 1);
  const span = (i: number): [number, number, number, number] => {
    const a = ring[i];
    const b = ring[i + 1 === n ? 0 : i + 1];
    return [clampCell(Math.min(a.x, b.x), minX, cell, cols), clampCell(Math.min(a.y, b.y), minY, cell, rows), clampCell(Math.max(a.x, b.x), minX, cell, cols), clampCell(Math.max(a.y, b.y), minY, cell, rows)];
  };
  const count = new Int32Array(cols * rows + 1);
  for (let i = 0; i < n; i += 1) {
    const [c0, r0, c1, r1] = span(i);
    for (let r = r0; r <= r1; r += 1) for (let c = c0; c <= c1; c += 1) count[r * cols + c + 1] += 1;
  }
  for (let c = 1; c < count.length; c += 1) count[c] += count[c - 1];
  const start = Int32Array.from(count);
  const fill = Int32Array.from(count);
  const items = new Int32Array(start[start.length - 1]);
  for (let i = 0; i < n; i += 1) {
    const [c0, r0, c1, r1] = span(i);
    for (let r = r0; r <= r1; r += 1) {
      for (let c = c0; c <= c1; c += 1) {
        items[fill[r * cols + c]] = i;
        fill[r * cols + c] += 1;
      }
    }
  }
  const at = new Map<string, number[]>();
  ring.forEach((q, i) => {
    const l = at.get(keyOf(q));
    if (l === undefined) at.set(keyOf(q), [i]);
    else l.push(i);
  });
  return { ring, minX, minY, maxX, maxY, cell, cols, rows, start, items, at, seen: new Uint32Array(n), stamp: 0 };
}

/** Calls `f` once for each side of the grid's ring whose cells meet the box. */
function eachSide(g: RingGrid, x0: number, y0: number, x1: number, y1: number, f: (i: number) => void): void {
  if (x1 < g.minX || y1 < g.minY || x0 > g.maxX || y0 > g.maxY) return;
  const c0 = clampCell(x0, g.minX, g.cell, g.cols);
  const c1 = clampCell(x1, g.minX, g.cell, g.cols);
  const r0 = clampCell(y0, g.minY, g.cell, g.rows);
  const r1 = clampCell(y1, g.minY, g.cell, g.rows);
  g.stamp += 1;
  if (g.stamp === 0xffffffff) {
    g.seen.fill(0);
    g.stamp = 1;
  }
  for (let r = r0; r <= r1; r += 1) {
    for (let c = c0; c <= c1; c += 1) {
      const cell = r * g.cols + c;
      for (let k = g.start[cell]; k < g.start[cell + 1]; k += 1) {
        const i = g.items[k];
        if (g.seen[i] === g.stamp) continue;
        g.seen[i] = g.stamp;
        f(i);
      }
    }
  }
}

/** Squared distance of p from segment ab. */
function segD2(p: XY, a: XY, b: XY): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let t = l2 < 1 ? 0 : quot((p.x - a.x) * dx + (p.y - a.y) * dy, l2, 'area', 'wet foot');
  if (t < 0) t = 0;
  if (t > 1) t = 1;
  const ex = a.x + t * dx - p.x;
  const ey = a.y + t * dy - p.y;
  return ex * ex + ey * ey;
}

/** The distance of p from the ring's line when some side lies within `r` of p (by box), else +∞. */
function nearDist(g: RingGrid, p: XY, r: number): number {
  let best = Infinity;
  const n = g.ring.length;
  eachSide(g, p.x - r, p.y - r, p.x + r, p.y + r, (i) => {
    const d = segD2(p, g.ring[i], g.ring[i + 1 === n ? 0 : i + 1]);
    if (d < best) best = d;
  });
  return best === Infinity ? Infinity : Math.sqrt(best);
}

/** Is p strictly inside the ring (even–odd; on the ring outside) — `insideRing`'s rule over the cells of p's row. */
function insideGrid(g: RingGrid, p: XY): boolean {
  if (p.x < g.minX || p.x > g.maxX || p.y < g.minY || p.y > g.maxY) return false;
  const n = g.ring.length;
  let odd = false;
  let on = false;
  eachSide(g, p.x, p.y, g.maxX, p.y, (i) => {
    if (on) return;
    const a = g.ring[i];
    const b = g.ring[i + 1 === n ? 0 : i + 1];
    const o = orient2d(a.x, a.y, b.x, b.y, p.x, p.y);
    if (o === 0 && Math.min(a.x, b.x) <= p.x && p.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= p.y && p.y <= Math.max(a.y, b.y)) {
      on = true;
      return;
    }
    if (a.y > p.y !== b.y > p.y && (b.y > a.y ? o > 0 : o < 0)) odd = !odd;
  });
  return !on && odd;
}

/** Does some point of ab lie inside the grid's ring deeper than `WET_TOL_CM` (the bound of the module comment)? */
function overRing(g: RingGrid, a: XY, b: XY): boolean {
  const tol = WET_TOL_CM;
  if (Math.max(a.x, b.x) + tol < g.minX || Math.max(a.y, b.y) + tol < g.minY || Math.min(a.x, b.x) - tol > g.maxX || Math.min(a.y, b.y) - tol > g.maxY) return false;
  // A side of the ring itself (a trace along a shore) lies on it.
  const ia = g.at.get(keyOf(a));
  const ib = g.at.get(keyOf(b));
  if (ia !== undefined && ib !== undefined) {
    const n = g.ring.length;
    for (const i of ia) for (const j of ib) if (j === (i + 1 === n ? 0 : i + 1) || i === (j + 1 === n ? 0 : j + 1)) return false;
  }
  const len = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
  const stack: number[] = [0, 1];
  while (stack.length > 0) {
    const t1 = stack.pop() as number;
    const t0 = stack.pop() as number;
    const tm = (t0 + t1) * 0.5;
    const m = { x: a.x + tm * (b.x - a.x), y: a.y + tm * (b.y - a.y) };
    const half = len * (t1 - t0) * 0.5;
    const d = nearDist(g, m, half + tol);
    const ins = insideGrid(g, m);
    if (ins && d > tol) return true;
    if (d === Infinity) continue;
    const depth = ins ? d : -d;
    if (depth + half <= tol || half * 2 < MIN_STRETCH_CM) continue;
    stack.push(t0, tm, tm, t1);
  }
  return false;
}

/** The trace's side test over the barred rings (see the module comment). */
export interface WetSides {
  /** The barred rings (the water's first). */
  readonly rings: readonly (readonly XY[])[];
  /** Does side ab lie over a barred ring — over water when it is no water gate's course side, over a reservation ever? */
  over(a: XY, b: XY): boolean;
  /** Does a ring side lie within the box (an early out: a side whose box meets none lies over no ring)? */
  near(x0: number, y0: number, x1: number, y1: number): boolean;
  /** The first side i (line[i] → line[i + 1], the closed line wrapping) lying over a barred ring, or −1. */
  firstOver(line: readonly XY[]): number;
  /** Is ab a side of a water gate's course (either way)? */
  course(a: XY, b: XY): boolean;
}

/**
 * The side test over `rings` — the first `waterCount` of them water, the rest reservations (and the core) — with each
 * water gate's course (its bank pins and the points kept between them, in order) exempt over the water.
 */
export function wetSides(rings: readonly (readonly XY[])[], waterCount: number, courses: readonly (readonly XY[])[] = []): WetSides {
  const grids = rings.map((r) => (r.length >= 3 ? gridOf(r) : null));
  const sides = new Set<string>();
  for (const c of courses) {
    for (let i = 0; i + 1 < c.length; i += 1) {
      sides.add(`${keyOf(c[i])}>${keyOf(c[i + 1])}`);
      sides.add(`${keyOf(c[i + 1])}>${keyOf(c[i])}`);
    }
  }
  const course = (a: XY, b: XY): boolean => sides.has(`${keyOf(a)}>${keyOf(b)}`);
  const over = (a: XY, b: XY): boolean => {
    const gate = sides.size > 0 && course(a, b);
    for (let r = 0; r < grids.length; r += 1) {
      const g = grids[r];
      if (g === null || (gate && r < waterCount)) continue;
      if (overRing(g, a, b)) return true;
    }
    return false;
  };
  const near = (x0: number, y0: number, x1: number, y1: number): boolean => {
    for (const g of grids) {
      if (g === null) continue;
      let hit = false;
      eachSide(g, x0, y0, x1, y1, () => {
        hit = true;
      });
      if (hit) return true;
    }
    return false;
  };
  const firstOver = (line: readonly XY[]): number => {
    for (let i = 0; i < line.length; i += 1) if (over(line[i], line[i + 1 === line.length ? 0 : i + 1])) return i;
    return -1;
  };
  return { rings, over, near, firstOver, course };
}
