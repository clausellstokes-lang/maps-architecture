// The granularity bands and the block-depth range (§4.6 step 1, §4.7 S10 (2), §4.4's regime floors, §4.5's band set;
// M0-b-01, C-0006). At M0 S8 reads the plot-depth and frontage bands here, over `@plat/tables`' granularity.json, before
// M1's `@plat/plots` implements the full `GranularityLaw` (areaM2, joinMax, vacancyRunShare, the manifested band) and S8
// reads it through the registry instead (C-0006). Every number this module returns is a table cell — a granularity row
// interpolated along the prosperity value by §4.5's continuous reading (M0-s-02's `bandInterpolate`, C-0155), a rung
// scale from ladder.json through `RungProfile.granularity`, a regime floor from regimes.json — or the design's
// arithmetic over cells: e_lo = max(2 · d_lo, r_lo), e_hi = max(2 · d_hi, r_hi); d̄ = (d_lo + d_hi) / 2; the upper block
// area e_hi²; w_min the low end of frontageM. The tables are read through a parsed `Table`, the shipped one by default,
// so a test may pass a fixture with the design's default rows while a run item re-fits the shipped cells (M0-b-05a,
// AFTER-M-1; C-0162 (1)'s pattern). Choices: C-0166.
import { bandInterpolate, defaultBandCuts, loadTable, type BandCuts, type BandRows, type Row, type RungProfile, type Table } from '@plat/tables';

/** The plot frontage-width and depth bands at a prosperity value and a rung, in metres (§4.7; §14's GranularityLaw). */
export interface GranularityBands {
  /** The plot frontage-width band [lo, hi] (m). */
  frontageM: [number, number];
  /** The plot-depth band [d_lo, d_hi] (m). */
  depthM: [number, number];
}

/** Where the granularity rows and the band set are read from: the shipped tables unless a caller passes its own. */
export interface GranularityBandsOptions {
  /** A parsed granularity table (a test's fixture); default the shipped granularity.json. */
  table?: Table;
  /** The band set and its cuts (a town's FieldBands passes as one); default bands.json's default cuts (C-0155). */
  set?: BandCuts;
}

const GRANULARITY = 'granularity';
const FRONTAGE = 'frontageM';
const DEPTH = 'depthM';
/** regimes.json's cell for a stage regime's block-depth band floor (§4.4). */
const FLOOR = 'blockDepthFloorM';

function refuse(reason: string): never {
  throw new RangeError(`granularity bands: ${reason}`);
}

/** A range cell `[lo, hi]` in metres with 0 ≤ lo ≤ hi, else a refusal naming the cell. */
function metreRange(value: unknown, unit: string, where: string): [number, number] {
  if (unit !== 'm') refuse(`${where} is in '${unit}', not metres`);
  if (!Array.isArray(value) || value.length !== 2) refuse(`${where} is not a range [lo, hi]`);
  const [lo, hi] = value as unknown[];
  if (typeof lo !== 'number' || typeof hi !== 'number' || !Number.isFinite(lo) || !Number.isFinite(hi) || !(lo >= 0 && lo <= hi)) {
    refuse(`${where} is not a range 0 ≤ lo ≤ hi`);
  }
  return [lo, hi];
}

/** One granularity cell of every band of the set that carries a row for it, as BandRows. */
function rowsOf(t: Table, cell: string, bands: readonly string[]): BandRows<readonly number[]> {
  const out: Record<string, readonly number[]> = {};
  for (const b of bands) {
    if (!t.has(b, cell)) continue;
    const c = t.cell(b, cell);
    out[b] = metreRange(c.value, c.unit, `granularity/${b}/${cell}`);
  }
  return out;
}

/** A rung scale (frontage × or depth ×): a positive finite ratio. */
function scale(v: number, name: string): number {
  if (!(Number.isFinite(v) && v > 0)) refuse(`the rung's ${name} must be a positive number, not ${String(v)}`);
  return v;
}

/**
 * The plot frontage-width and depth bands at a prosperity value (§4.7 S10 (2)): each granularity row interpolated
 * along the value between the rowed bands' centres — an end row flat beyond its centre (§4.5; `bandInterpolate`) — and
 * scaled by the rung's `RungProfile.granularity` (frontage × on frontageM, depth × on depthM, both ends; §1.1). S8 calls
 * it with the district's pass-1 prosperity value (§4.6 step 1). The value is the field's, in [0, 1] (§4.5).
 */
export function granularityBands(ctxValue: number, rung: RungProfile, opts: GranularityBandsOptions = {}): GranularityBands {
  if (!(Number.isFinite(ctxValue) && ctxValue >= 0 && ctxValue <= 1)) refuse(`the prosperity value must lie in [0, 1], not ${String(ctxValue)}`);
  const t = opts.table ?? loadTable(GRANULARITY);
  if (t.id !== GRANULARITY) refuse(`the bands read the granularity table, not '${t.id}'`);
  const set = opts.set ?? defaultBandCuts();
  const fScale = scale(rung.granularity.frontageScale, 'frontageScale');
  const dScale = scale(rung.granularity.depthScale, 'depthScale');
  const frontage = bandInterpolate(rowsOf(t, FRONTAGE, set.bands), ctxValue, set);
  const depth = bandInterpolate(rowsOf(t, DEPTH, set.bands), ctxValue, set);
  return {
    frontageM: [frontage[0] * fScale, frontage[1] * fScale],
    depthM: [depth[0] * dScale, depth[1] * dScale],
  };
}

/**
 * A stage regime's block-depth band floor [r_lo, r_hi] (§4.4) from its regimes.json row; [0, 0] for a regime without
 * a row or whose row gives none (§4.6 step 1: "both 0 for a regime whose row gives none").
 */
export function regimeFloor(regimeRow?: Row): [number, number] {
  const c = regimeRow?.get(FLOOR);
  if (c === undefined) return [0, 0];
  return metreRange(c.value, c.unit, `regimes/<row>/${FLOOR}`);
}

/**
 * The district's block-depth range [e_lo, e_hi] (§4.6 step 1, stated there once): e_lo = max(2 · d_lo, r_lo) and
 * e_hi = max(2 · d_hi, r_hi) — two back-to-back rows of the band's shallowest and deepest plots, floored by the stage
 * regime's block-depth band (`regimeFloor`; both 0 for a regime without a row).
 */
export function blockDepthRange(bands: GranularityBands, regimeRow?: Row): [number, number] {
  const [dLo, dHi] = bands.depthM;
  if (!(Number.isFinite(dLo) && Number.isFinite(dHi) && dLo >= 0 && dLo <= dHi)) refuse('the depth band is not a range 0 ≤ d_lo ≤ d_hi');
  const [rLo, rHi] = regimeFloor(regimeRow);
  return [Math.max(2 * dLo, rLo), Math.max(2 * dHi, rHi)];
}

/** The band's plot depth d̄ = (d_lo + d_hi) / 2 (§4.6 step 1; the reflex pre-cut's and the deep-interior rule's depth). */
export function bandPlotDepth(bands: GranularityBands): number {
  return (bands.depthM[0] + bands.depthM[1]) / 2;
}

/** The band's upper block area e_hi² in m² (§4.6 step 1; step 8 (d)'s substitution bound, S7b (3)'s claim size). */
export function upperBlockArea(range: readonly [number, number]): number {
  return range[1] * range[1];
}

/** w_min, the district's minimum plot frontage: the low end of frontageM (§4.6 step 6's fillet rule). */
export function minFrontage(bands: GranularityBands): number {
  return bands.frontageM[0];
}
