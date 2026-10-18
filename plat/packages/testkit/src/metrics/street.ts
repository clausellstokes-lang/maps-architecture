// The street-curve metrics (M0-k-05; §13.5's street-turning and growth-drift rows, §13.2's "turning per 100 m on ways
// resampled at 10 m", §4.4's heading model): every way resampled at 10 m first (§13.5 *Curves*), so neither the
// stages' vertex spacing nor a reference's placement step enters a number (C-0180 (2), (3)).
import type { WayClass } from '@plat/model';
import type { MetricDoc, MetricWay } from './doc.js';
import { DEG, headings, RESAMPLE_STEP_M, resample, toMetres, wrapPi } from './geometry.js';

/** The way classes that are not streets: a water channel, the waterfront's structures and footpaths (C-0180 (3)). */
export const NON_STREET_CLASSES: readonly WayClass[] = Object.freeze(['aqueduct', 'pier', 'quay', 'path'] as const);
const NON_STREET: ReadonlySet<string> = new Set<string>(NON_STREET_CLASSES);

/** The doc's street ways. */
export function streetWays(doc: MetricDoc): MetricWay[] {
  return doc.ways.filter((w) => !NON_STREET.has(w.class));
}

/** A way's step headings after 10 m resampling (radians). */
export function wayHeadings(way: MetricWay): number[] {
  return headings(resample(toMetres(way.line), RESAMPLE_STEP_M));
}

/** The unsigned turn between consecutive 10 m steps of one way, degrees in [0, 180]. */
export function stepTurnsDeg(way: MetricWay): number[] {
  const h = wayHeadings(way);
  const out: number[] = [];
  for (let i = 1; i < h.length; i += 1) out.push(Math.abs(wrapPi(h[i] - h[i - 1])) * DEG);
  return out;
}

/** Every street way's step turns pooled (the 10 m step histogram §13.5's no-cliff clause reads). */
export function turnSteps10m(doc: MetricDoc): number[] {
  const out: number[] = [];
  for (const w of streetWays(doc)) for (const t of stepTurnsDeg(w)) out.push(t);
  return out;
}

/**
 * Turning per 100 m (§13.2, §13.5; C-0180 (3)): the street ways' step turns pooled, as degrees per 100 m of run —
 * 100 / 10 × the mean unsigned turn per 10 m step. A straight street gives 0; a circle of radius r gives
 * 2·asin(5 / r) per step, ≈ 5 729.6 / r degrees per 100 m. NaN when no way has two steps.
 */
export function turningPer100m(doc: MetricDoc): number {
  const t = turnSteps10m(doc);
  if (t.length === 0) return Number.NaN;
  let s = 0;
  for (const v of t) s += v;
  return ((s / t.length) * 100) / RESAMPLE_STEP_M;
}

/** The step offset of 50 m at 10 m resampling. */
export const HEADING_LAG_STEPS = 5;

/** The heading change over 50 m (§13.5's "heading change per 50 m"): |θ(i + 5) − θ(i)| over every street way, degrees. */
export function headingChange50m(doc: MetricDoc): number[] {
  const out: number[] = [];
  for (const w of streetWays(doc)) {
    const h = wayHeadings(w);
    for (let i = HEADING_LAG_STEPS; i < h.length; i += 1) out.push(Math.abs(wrapPi(h[i] - h[i - HEADING_LAG_STEPS])) * DEG);
  }
  return out;
}

/** The growth-drift window: 600 m = 60 steps of 10 m (§13.5's growth-drift row, §4.4). */
export const DRIFT_WINDOW_STEPS = 60;

/**
 * Growth drift (§13.5, §4.4; C-0180 (3)): the net turn of grown organic streets over 600 m — for each grown way (an
 * organic one: `organic` not false) and each consecutive non-overlapping 600 m window from its start, the absolute
 * sum of the signed turns between the window's 60 steps, degrees (it may exceed 180°: a curl counts whole).
 */
export function growthDrift600m(doc: MetricDoc): number[] {
  const out: number[] = [];
  for (const w of streetWays(doc)) {
    if (w.grown !== true || w.organic === false) continue;
    const h = wayHeadings(w);
    for (let start = 0; start + DRIFT_WINDOW_STEPS <= h.length; start += DRIFT_WINDOW_STEPS) {
      let net = 0;
      for (let i = start + 1; i < start + DRIFT_WINDOW_STEPS; i += 1) net += wrapPi(h[i] - h[i - 1]);
      out.push(Math.abs(net) * DEG);
    }
  }
  return out;
}

/** The no-cliff clause's reading (§13.5's street-turning row; C-0180 (3)). */
export interface TurnCliff {
  /** A cliff: an empty bin above 15° while the bin below it holds more than 1 % of the steps. */
  readonly cliff: boolean;
  /** The empty bin's lower edge in degrees, when there is a cliff. */
  readonly atDeg?: number;
  /** The bin counts from 0°, `binDeg` wide. */
  readonly bins: readonly number[];
  readonly steps: number;
}

/**
 * §13.5's weakness clause "no cliff (no empty bin above 15° while the bin below it holds > 1 %)" over 10 m step turns:
 * the turns binned at `binDeg` (1° unless given); a bin whose lower edge is ≥ `aboveDeg` (15°) that is empty while the
 * bin just below it holds more than `share` (1 %) of the steps is a cliff — the step histogram stops abruptly, as a hard
 * clamp makes it, instead of tailing off. No step: no cliff.
 */
export function turnCliff(stepTurns: readonly number[], opts: { binDeg?: number; aboveDeg?: number; share?: number } = {}): TurnCliff {
  const binDeg = opts.binDeg ?? 1;
  const above = opts.aboveDeg ?? 15;
  const share = opts.share ?? 0.01;
  let max = 0;
  for (const t of stepTurns) max = Math.max(max, t);
  const nBins = Math.max(Math.floor(max / binDeg) + 2, Math.ceil(above / binDeg) + 2);
  const bins: number[] = new Array<number>(nBins).fill(0);
  for (const t of stepTurns) bins[Math.floor(t / binDeg)] += 1;
  const steps = stepTurns.length;
  if (steps > 0) {
    for (let k = 1; k < nBins; k += 1) {
      if (k * binDeg < above) continue;
      if (bins[k] === 0 && bins[k - 1] / steps > share) return { cliff: true, atDeg: k * binDeg, bins, steps };
    }
  }
  return { cliff: false, bins, steps };
}
