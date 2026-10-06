// The deep-interior rule (§4.6 *The deep-interior rule* (IMP-8, GEO-25; J-P15) and *Hidden plots* (item 30); M0-b-03).
//
// When recursion stops, S8 writes each block's `Block.depthClass` with its `interior` and its `reach`:
//   * depthClass `deep` when the block's local thickness exceeds 0.6 × its band's plot depth d̄ — the design as amended
//     by M-1's measurement (E12; the spec note N-27: twice the plot depth admitted 3 of NG's 597 deep blocks) — else
//     `standard`. The thickness is twice the radius of the largest circle inscribed in the block (the reference rows'
//     own measure: "an inscribed circle's radius above 1.5 × the median footprint's short side, 21.6 m of thickness"),
//     found by a best-first subdivision of the block's box (the pole of inaccessibility; Garcia-Castellanos and
//     Lombardo's grid refinement as published) to 5 cm.
//   * a `deep` block's interior is drawn now, in S8, by the district's band row's target shares — court, back_lane,
//     through_alley, rear_plots (interior.json `shares.*`, interpolated along the prosperity value between the rowed
//     bands, item 27) — and its reach by the band's reach weights (`reach.open`, `.passage`, `.gated`, interpolated
//     alike), the non-open weights scaled by (densityBase + density) and by the rung's factor (`reachRung.<rung>`).
//     One draw on `cut.interior` keyed by the block's lineage: one pair of uniforms (treatment, reach). A back lane or a
//     through alley is reached by its own spine: its reach is `open`; a `standard` block is `plots`, `open`, and draws
//     nothing.
// The deep factor 0.6 is the design's number since E12 (§4.6); interior.json's `settings.deepFactor` still holds the
// superseded 2 and is M0-c-07a's to re-fit (its hand-over), so the rule reads the design's factor and a test pins it
// (N-27; C-0239 (6)). The lanes a `back_lane` or `through_alley` asks for are cut by bentCutFabric.ts in the district's
// batch (`interiorSpine`).
import { BinaryHeap, obb, type LatticePoint, type Stream } from '@plat/kernel';
import type { Block } from '@plat/model';
import { bandInterpolate, defaultBandCuts, loadTable, type BandCuts, type Table } from '@plat/tables';
import { div } from './ladder.js';
import { insideFace, nearestOnSegment, type XY } from './sides.js';

/** §4.6's deep factor as amended by M-1 (E12): deep when the thickness exceeds 0.6 × the band's plot depth (N-27). */
export const DEEP_FACTOR = 0.6;

/** The deep treatments in the design's order (§4.6): the draw's cumulative order. */
export const DEEP_TREATMENTS = Object.freeze(['court', 'back_lane', 'through_alley', 'rear_plots'] as const);
export type DeepTreatment = (typeof DEEP_TREATMENTS)[number];

/** The reach kinds in the design's order (§4.6 *Hidden plots*). */
export const REACHES = Object.freeze(['open', 'passage', 'gated'] as const);
export type Reach = (typeof REACHES)[number];

/** A district's band row as the rule reads it: the plot depth, the shares, the scaled reach weights, the factor. */
export interface InteriorRow {
  /** The band's plot depth d̄ (cm): (d_lo + d_hi) / 2 (§4.6 step 1). */
  readonly plotDepthCm: number;
  /** The target shares, in DEEP_TREATMENTS' order. */
  readonly shares: readonly [number, number, number, number];
  /** The reach weights, scaled, in REACHES' order. */
  readonly reach: readonly [number, number, number];
  /** The deep factor (DEEP_FACTOR unless a test passes another). */
  readonly deepFactor: number;
}

/** The rule's verdict on one block. */
export interface DeepInterior {
  readonly depthClass: Block['depthClass'];
  readonly interior: Block['interior'];
  readonly reach: Block['reach'];
  /** The local thickness (cm) and the inscribed circle's centre. */
  readonly thicknessCm: number;
  readonly centre: XY;
  /** The `cut.interior` pair drawn (deep blocks only). */
  readonly uniforms: readonly [number, number] | null;
}

const SHARE_CELLS = ['shares.court', 'shares.backLane', 'shares.throughAlley', 'shares.rearPlots'] as const;
const REACH_CELLS = ['reach.open', 'reach.passage', 'reach.gated'] as const;

function finiteShare(v: unknown, where: string): number {
  if (typeof v !== 'number' || !Number.isFinite(v) || v < 0) throw new RangeError(`deep interior: ${where} is not a weight ≥ 0`);
  return v;
}

/** One interior.json cell of every band of the set that carries it, as band rows. */
function rowsOf(t: Table, cell: string, bands: readonly string[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const b of bands) if (t.has(b, cell)) out[b] = finiteShare(t.cell(b, cell).value, `interior/${b}/${cell}`);
  return out;
}

/** The options of `interiorRow`. */
export interface InteriorRowOptions {
  /** A parsed interior table (a test's fixture); default the shipped interior.json. */
  readonly table?: Table;
  /** The band set; default bands.json's default cuts. */
  readonly set?: BandCuts;
  /** The deep factor (default the design's DEEP_FACTOR). */
  readonly deepFactor?: number;
}

/**
 * The district's band row (§4.6): the shares and reach weights at its prosperity value (interpolated along it between
 * the rowed bands, item 27), the non-open reach weights × (densityBase + density) × the rung's factor, with the band's
 * plot depth d̄ (cm) the caller has from M0-b-01's bands.
 */
export function interiorRow(prosperity: number, density: number, rung: 'TOWN' | 'CITY' | 'METROPOLIS', plotDepthCm: number, opts: InteriorRowOptions = {}): InteriorRow {
  if (!(prosperity >= 0 && prosperity <= 1)) throw new RangeError(`deep interior: the prosperity value must lie in [0, 1], got ${String(prosperity)}`);
  if (!(density >= 0 && density <= 1)) throw new RangeError(`deep interior: the density value must lie in [0, 1], got ${String(density)}`);
  if (!(plotDepthCm > 0 && Number.isFinite(plotDepthCm))) throw new RangeError(`deep interior: the plot depth must be positive, got ${String(plotDepthCm)}`);
  const t = opts.table ?? loadTable('interior');
  if (t.id !== 'interior') throw new RangeError(`deep interior: the rule reads the interior table, not '${t.id}'`);
  const set = opts.set ?? defaultBandCuts();
  const shares = SHARE_CELLS.map((c) => bandInterpolate(rowsOf(t, c, set.bands), prosperity, set)) as unknown as [number, number, number, number];
  const reach = REACH_CELLS.map((c) => bandInterpolate(rowsOf(t, c, set.bands), prosperity, set)) as unknown as [number, number, number];
  const base = finiteShare(t.cell('settings', 'densityBase').value, 'interior/settings/densityBase');
  const rungF = finiteShare(t.cell('settings', `reachRung.${rung}`).value, `interior/settings/reachRung.${rung}`);
  const scale = (base + density) * rungF;
  const factor = opts.deepFactor ?? DEEP_FACTOR;
  if (!(factor > 0)) throw new RangeError('deep interior: the deep factor must be positive');
  return { plotDepthCm, shares, reach: [reach[0], reach[1] * scale, reach[2] * scale], deepFactor: factor };
}

/** The signed distance (cm) from p to the face's boundary: positive inside. */
function signedDistance(rings: readonly (readonly LatticePoint[])[], p: XY): number {
  let d2 = Infinity;
  for (const ring of rings) {
    const m = ring.length;
    for (let i = 0; i < m; i += 1) {
      const n = nearestOnSegment(p, ring[i], ring[(i + 1) % m]).d2;
      if (n < d2) d2 = n;
    }
  }
  const d = Math.sqrt(d2);
  return insideFace(rings, p) ? d : -d;
}

/** √2 to the double nearest it. */
const SQRT2 = 1.4142135623730951;

/** The pole search's cell budget: past it the best centre found stands (a count, never a clock). */
const MAX_CELLS = 4_000;

/** The pole search's precision (cm): the thickness is known to 2 × 5 cm — far inside the deep test's metres. */
export const THICKNESS_PRECISION_CM = 5;

/**
 * The block's local thickness (§4.6): twice the radius of the largest inscribed circle, found to 5 cm by a best-first
 * subdivision of the outer ring's box (each cell bounded above by its centre's distance + half its diagonal); holes
 * count as boundary. Deterministic: cells are popped by bound, ties by creation order. Returns 0 for a ring with no area.
 */
export function localThickness(rings: readonly (readonly LatticePoint[])[]): { thicknessCm: number; centre: XY } {
  const outer = rings[0];
  if (outer === undefined || outer.length < 3) return { thicknessCm: 0, centre: { x: 0, y: 0 } };
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of outer) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  const w = maxX - minX;
  const h = maxY - minY;
  const size = Math.min(w, h);
  if (!(size > 0)) return { thicknessCm: 0, centre: { x: minX, y: minY } };
  type Cell = { x: number; y: number; half: number; d: number; max: number };
  const cells: Cell[] = [];
  const heap = new BinaryHeap(64);
  const push = (x: number, y: number, half: number): void => {
    const d = signedDistance(rings, { x, y });
    const c = { x, y, half, d, max: d + half * SQRT2 };
    heap.push(cells.length, -c.max);
    cells.push(c);
  };
  const half0 = size / 2;
  for (let x = minX; x < maxX; x += size) for (let y = minY; y < maxY; y += size) push(x + half0, y + half0, half0);
  // The first guess: the box's centre (the area centroid would do as well; any interior start converges).
  let best: Cell = { x: (minX + maxX) / 2, y: (minY + maxY) / 2, half: 0, d: signedDistance(rings, { x: (minX + maxX) / 2, y: (minY + maxY) / 2 }), max: 0 };
  const precision = THICKNESS_PRECISION_CM;
  while (heap.size > 0 && cells.length < MAX_CELLS) {
    const i = heap.pop();
    const c = cells[i];
    if (c.d > best.d) best = c;
    if (c.max - best.d <= precision) continue;
    const q = c.half / 2;
    push(c.x - q, c.y - q, q);
    push(c.x + q, c.y - q, q);
    push(c.x - q, c.y + q, q);
    push(c.x + q, c.y + q, q);
  }
  return { thicknessCm: best.d > 0 ? 2 * best.d : 0, centre: { x: best.x, y: best.y } };
}

/** The index the uniform u picks from weights in order (cumulative; zero weights never picked); −1 when all are 0. */
export function pickWeighted(weights: readonly number[], u: number): number {
  let total = 0;
  for (const w of weights) total += w;
  if (!(total > 0)) return -1;
  const target = u * total;
  let acc = 0;
  let last = -1;
  for (let i = 0; i < weights.length; i += 1) {
    if (!(weights[i] > 0)) continue;
    acc += weights[i];
    last = i;
    if (target < acc) return i;
  }
  return last;
}

/**
 * §4.6's deep-interior rule on one block (its committed rings: the outer ring, then its holes) with the district's band
 * row: `standard` blocks are `plots` / `open` and draw nothing; a `deep` block draws one pair on `cut.interior` (the
 * stream is keyed by the block's lineage) — the treatment by the shares, the reach by the weights; a back lane or a
 * through alley is `open` (its spine reaches it).
 */
export function deepInterior(block: { readonly rings: readonly (readonly LatticePoint[])[] }, bandRow: InteriorRow, stream: Stream): DeepInterior {
  const { thicknessCm, centre } = localThickness(block.rings);
  const limit = bandRow.deepFactor * bandRow.plotDepthCm;
  if (!(thicknessCm > limit)) return { depthClass: 'standard', interior: 'plots', reach: 'open', thicknessCm, centre, uniforms: null };
  const u1 = stream.float01();
  const u2 = stream.float01();
  const t = pickWeighted(bandRow.shares, u1);
  const interior: DeepTreatment = t < 0 ? 'court' : DEEP_TREATMENTS[t];
  const r = pickWeighted(bandRow.reach, u2);
  const reach: Reach = interior === 'back_lane' || interior === 'through_alley' || r < 0 ? 'open' : REACHES[r];
  return { depthClass: 'deep', interior, reach, thicknessCm, centre, uniforms: [u1, u2] };
}

/**
 * The spine a `back_lane` or `through_alley` asks for (§4.6): through the inscribed circle's centre, parallel to the
 * block's longer side (a back lane: its OBB major axis, between the two long frontages' backs) or across it (a through
 * alley: the minor axis, joining two opposite frontages). A line, the caller clips it to the block.
 */
export function interiorSpine(outer: readonly LatticePoint[], centre: XY, treatment: 'back_lane' | 'through_alley'): { origin: XY; dir: XY } | null {
  const box = obb(outer);
  if (!box.ok) return null;
  const d = treatment === 'back_lane' ? box.value.major : box.value.minor;
  // A unit vector already (obb's axes are unit); the ratio keeps the lint's division rule on the one normalisation.
  const l = Math.sqrt(d.x * d.x + d.y * d.y);
  const x = div(d.x, l);
  const y = div(d.y, l);
  if (x === null || y === null) return null;
  return { origin: centre, dir: { x, y } };
}
