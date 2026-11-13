// The carve (M0-e-02; §4.2 S1 (3): "the terrain is carved to the course, its bed descending monotonically to the
// outfall so no depression is created and the flood is not repeated … carving is capped at `carveMaxCm` (400 cm at
// TOWN and CITY, 600 cm at METROPOLIS) and a course that would need more is re-routed by F-RIVER (§5.2), never
// trenched").
//
// The bed is laid on the height raster itself: the raster cells the course passes through, in course order (a simple
// 8-connected path, ./course.ts), each take the lowest height met so far from the inlet — the highest non-increasing
// profile under the ground, so every cell is carved as little as a monotone bed allows. A course whose bed would cut
// any cell deeper than carveMaxCm is refused before anything is written (F-RIVER re-routes it). Applied, each such
// cell is lowered to its bed; with half-widths, every other raster cell whose centre lies within a segment's half-width
// of the course is lowered towards the bed of the segment's upstream vertex, by at most carveMaxCm — so the channel has
// the course's width, no cell is carved past the cap, and the centreline keeps its monotone bed. Every write goes
// through the range check (../terrain/range.ts).
import { ok, type KernelResult, type Warning } from '@plat/kernel';
import type { Terrain } from '@plat/model';
import { centreX, centreY, rasterGrid } from '../terrain/grid.js';
import { heightWriter } from '../terrain/range.js';
import { cellAt, pointSegDist2, rasterise, type GridGeom, type XY } from './course.js';

/** The carve's plan: the bed along the course and what it would cut. */
export interface CarvePlan {
  /** The raster cells under the course, in course order (a simple path). */
  cells: number[];
  /** Each cell's bed (cm above the datum): non-increasing from the inlet. */
  bedCm: number[];
  /** The bed at each course vertex (the bed of the cell containing it). */
  vertexBedCm: number[];
  /** The deepest cut along the centreline (cm). */
  maxCarveCm: number;
  /** The first course vertex at or past the first cell cut deeper than the cap, or −1 when the course fits. */
  firstExceed: number;
}

/** The height raster's geometry (../terrain/grid.ts `rasterGrid`, the one reading of a terrain's five grid fields). */
export function rasterGeom(t: Terrain): GridGeom {
  return rasterGrid(t);
}

/** The bed of `course` on `terrain`'s raster and the deepest cut it needs, against `carveMaxCm`. Writes nothing. */
export function planCarve(terrain: Terrain, course: readonly XY[], carveMaxCm: number): CarvePlan {
  const g = rasterGeom(terrain);
  const { cells, at } = rasterise(g, course, true);
  const h = terrain.heightCm;
  const bedCm: number[] = [];
  let bed = Infinity;
  let maxCarveCm = 0;
  let exceedCell = -1;
  for (let k = 0; k < cells.length; k += 1) {
    const v = h[cells[k]];
    if (v < bed) bed = v;
    bedCm.push(bed);
    const cut = v - bed;
    if (cut > maxCarveCm) maxCarveCm = cut;
    if (cut > carveMaxCm && exceedCell < 0) exceedCell = k;
  }
  const vertexBedCm = at.map((k) => bedCm[k]);
  let firstExceed = -1;
  if (exceedCell >= 0) {
    for (let v = 0; v < at.length; v += 1) {
      if (at[v] >= exceedCell) {
        firstExceed = v;
        break;
      }
    }
    if (firstExceed < 0) firstExceed = at.length - 1;
  }
  return { cells, bedCm, vertexBedCm, maxCarveCm, firstExceed };
}

/** The carve applied. */
export interface CarveResult {
  plan: CarvePlan;
  /** Raster cells lowered (centreline and channel). */
  carvedCells: number;
}

/**
 * Carves `course` into `terrain`'s height raster (§4.2 S1 (3)): refused — nothing written, `ok: false` with the plan as
 * `partial` — when the monotone bed would cut deeper than `carveMaxCm`; otherwise the centreline cells take their bed
 * and, given `halfWidthCm` per course vertex, the channel cells are lowered towards their segment's upstream bed by at
 * most `carveMaxCm`. Warnings: the range check's (W_HEIGHT_CLAMPED), none on any lawful raster.
 */
export function carveCourse(terrain: Terrain, course: readonly XY[], carveMaxCm: number, halfWidthCm?: readonly number[]): KernelResult<CarveResult> {
  const plan = planCarve(terrain, course, carveMaxCm);
  if (plan.firstExceed >= 0) return { ok: false, code: 'E_OUT_OF_RANGE', detail: `carve ${String(plan.maxCarveCm)} cm > carveMaxCm ${String(carveMaxCm)}`, partial: { plan, carvedCells: 0 } };
  const g = rasterGeom(terrain);
  const h = terrain.heightCm;
  const out = heightWriter(h, terrain.reliefLimitCm);
  const centre = new Set<number>(plan.cells);
  // Channel cells first, each to the least of its assignments (centreline cells are never touched by them).
  const channel = new Map<number, number>();
  if (halfWidthCm !== undefined) {
    if (halfWidthCm.length !== course.length) throw new RangeError('carveCourse: one half-width per course vertex');
    for (let v = 0; v + 1 < course.length; v += 1) {
      const a = course[v];
      const b = course[v + 1];
      const r = Math.max(halfWidthCm[v], halfWidthCm[v + 1]);
      const r2 = r * r;
      const bed = plan.vertexBedCm[v];
      const lo = cellAt(g, Math.min(a.x, b.x) - r, Math.min(a.y, b.y) - r);
      const hi = cellAt(g, Math.max(a.x, b.x) + r, Math.max(a.y, b.y) + r);
      for (let j = lo.j; j <= hi.j; j += 1) {
        const y = centreY(g, j);
        for (let i = lo.i; i <= hi.i; i += 1) {
          const c = j * g.cols + i;
          if (centre.has(c)) continue;
          const x = centreX(g, i);
          if (pointSegDist2({ x, y }, a, b) > r2) continue;
          const now = h[c];
          if (now <= bed) continue;
          const floor = now - carveMaxCm;
          const target = bed > floor ? bed : floor;
          const prev = channel.get(c);
          if (prev === undefined || target < prev) channel.set(c, target);
        }
      }
    }
  }
  let carvedCells = 0;
  for (let k = 0; k < plan.cells.length; k += 1) {
    const c = plan.cells[k];
    if (h[c] !== plan.bedCm[k]) {
      out.write(c, plan.bedCm[k]);
      carvedCells += 1;
    }
  }
  for (const [c, v] of channel) {
    out.write(c, v);
    carvedCells += 1;
  }
  const warnings: Warning[] = out.warnings();
  return ok({ plan, carvedCells }, warnings);
}

/**
 * The joint bed of a run's courses on one raster (hardening round S3, N-s2c-1; §4.2 S1 (3): "the terrain is carved to
 * the course, its bed descending monotonically to the outfall so no depression is created … tributaries by the same
 * rule"). Each course is a chain of raster cells — its own path (`rasterise`, loop-erased, the bed `planCarve` lays) and,
 * for a course joining another, that course's centreline cell at the confluence (the joined cell). The beds are one
 * profile over every chain's cells, a pure function of the raster before any carve and the chains: the running minimum
 * is laid along every chain, in the order they were added, until nothing changes (values only fall, so it settles).
 * Then every chain's bed is non-increasing along it; a joining course's last bed is at or above the receiving bed at
 * the joined cell; and the receiving course is re-levelled from the joined cell to its own outfall where the joining
 * course arrives lower. A chain is admitted only when no cell's bed lies more than `carveMaxCm` below the raster before
 * any carve (the cap read on that raster, so two courses on one cell never cut it past the cap in total). One chain
 * alone is `planCarve`'s bed exactly.
 */
export class JointBed {
  private bed = new Map<number, number>();
  private readonly chains: (readonly number[])[] = [];
  /** `before`: the height raster before any carve (read, never written). */
  constructor(
    private readonly before: Int32Array,
    private readonly carveMaxCm: number,
  ) {}

  /** The beds with `chain` laid beside the admitted chains, or null when a cell would be cut past the cap. */
  private settle(chain: readonly number[]): Map<number, number> | null {
    const bed = new Map(this.bed);
    const all = [...this.chains, chain];
    let changed = true;
    while (changed) {
      changed = false;
      for (const ch of all) {
        let run = Infinity;
        for (const c of ch) {
          const now = bed.get(c);
          const v = now ?? this.before[c];
          if (v < run) run = v;
          if (now === undefined || run < now) {
            if (now !== undefined) changed = true;
            bed.set(c, run);
          }
        }
      }
    }
    for (const [c, v] of bed) if (this.before[c] - v > this.carveMaxCm) return null;
    return bed;
  }

  /** Whether `chain` can be laid beside the admitted chains within the cap. Changes nothing. */
  fits(chain: readonly number[]): boolean {
    return this.settle(chain) !== null;
  }

  /** Lays `chain` beside the admitted chains when it fits (true); otherwise changes nothing (false). */
  add(chain: readonly number[]): boolean {
    const bed = this.settle(chain);
    if (bed === null) return false;
    this.bed = bed;
    this.chains.push(chain);
    return true;
  }

  /** Whether raster cell c lies on an admitted chain (a centreline cell). */
  has(c: number): boolean {
    return this.bed.has(c);
  }

  /** The bed of raster cell c: its joint bed on an admitted chain, else its height before any carve. */
  bedOf(c: number): number {
    return this.bed.get(c) ?? this.before[c];
  }

  /** The admitted beds, in the order their cells were first laid. */
  entries(): IterableIterator<[number, number]> {
    return this.bed.entries();
  }
}

/**
 * Carves a run's courses into `terrain`'s height raster on their joint bed (hardening round S3, N-s2c-1): every
 * centreline cell takes its bed, then each course's channel cells — those within a segment's half-width of it, on no
 * course's centreline — are lowered towards the bed of the segment's upstream vertex and never below `before` (the
 * raster before any carve) less `carveMaxCm`, never raised. With one course this is `carveCourse` exactly. Warnings: the
 * range check's (W_HEIGHT_CLAMPED), none on any lawful raster.
 */
export function carveJoint(
  terrain: Terrain,
  before: Int32Array,
  beds: JointBed,
  courses: readonly { course: readonly XY[]; halfWidthCm: readonly number[] }[],
  carveMaxCm: number,
): Warning[] {
  const g = rasterGeom(terrain);
  const h = terrain.heightCm;
  const out = heightWriter(h, terrain.reliefLimitCm);
  for (const [c, v] of beds.entries()) if (h[c] !== v) out.write(c, v);
  for (const { course, halfWidthCm } of courses) {
    if (halfWidthCm.length !== course.length) throw new RangeError('carveJoint: one half-width per course vertex');
    const { cells, at } = rasterise(g, course, true);
    if (!beds.has(cells[0])) continue;
    const channel = new Map<number, number>();
    for (let v = 0; v + 1 < course.length; v += 1) {
      const a = course[v];
      const b = course[v + 1];
      const r = Math.max(halfWidthCm[v], halfWidthCm[v + 1]);
      const r2 = r * r;
      const bed = beds.bedOf(cells[at[v]]);
      const lo = cellAt(g, Math.min(a.x, b.x) - r, Math.min(a.y, b.y) - r);
      const hi = cellAt(g, Math.max(a.x, b.x) + r, Math.max(a.y, b.y) + r);
      for (let j = lo.j; j <= hi.j; j += 1) {
        const y = centreY(g, j);
        for (let i = lo.i; i <= hi.i; i += 1) {
          const c = j * g.cols + i;
          if (beds.has(c)) continue;
          const x = centreX(g, i);
          if (pointSegDist2({ x, y }, a, b) > r2) continue;
          const now = h[c];
          if (now <= bed) continue;
          const floor = before[c] - carveMaxCm;
          const target = bed > floor ? bed : floor;
          if (target >= now) continue;
          const prev = channel.get(c);
          if (prev === undefined || target < prev) channel.set(c, target);
        }
      }
    }
    for (const [c, v] of channel) out.write(c, v);
  }
  return out.warnings();
}
