// The band rule in its M0 form (M0-k-05; §13.5 *The band rule*; C-0092 (1), C-0116, C-0180 (8), N-06). A *target*
// row's band is the union of [p10 × 0.9, p90 × 1.1] and the single value ± 15 %, p10 and p90 read from the row as M-1
// stored them (the row's `estimator` names how; M0 recomputes nothing), ours the median of our per-seed statistics; a
// *distribution* row passes when the median single-seed KS distance of ours to the row's histogram is ≤ 1.25 × the
// row's `spreadKS.p90`, and without `spreadKS` reads `missingBaseline` (`fail` for an ⟨M-1⟩ cell, N-06); a row flagged
// sign-indefinite or carrying a metric floor reads `notApplicable` "V12 §3.5 at M1", never pass; *weakness* rows are
// one-sided by the registry's declared direction and margin; *descriptive* rows are reported and gate nothing.
import { ascending, binnedKs, median, quantile7, referenceCdf } from '../metrics/stats.js';
import type { Baseline, ParityRow, ParityVerdict } from './types.js';

/** Our side of one cell: a scalar's per-seed values, or a distribution's per-seed samples, over `seeds` seeds. */
export interface OursCell {
  readonly perSeed?: readonly number[];
  readonly samples?: readonly (readonly number[])[];
  readonly seeds: number;
}

/** The band rule's outcome for one row. */
export interface BandOutcome {
  verdict: ParityVerdict;
  band: ParityRow['band'];
  ours: ParityRow['ours'];
  note?: string;
}

/** The target band's two parts (§13.5). */
export const BAND_SPREAD_LO = 0.9;
export const BAND_SPREAD_HI = 1.1;
export const BAND_SINGLE = 0.15;
/** The distribution clause's factor on the reference's own seed-to-seed KS at p90. */
export const KS_FACTOR = 1.25;
/** The note of a sign-indefinite or floored row (C-0092 (1)). */
export const NOTE_V12_AT_M1 = 'V12 §3.5 at M1';

/** Does the row carry V12's sign-indefinite flag or a metric floor, or a negative stored value (C-0092 (1), C-0180 (8))? */
export function needsV12(row: Baseline): boolean {
  const r = row as unknown as Record<string, unknown>;
  if (r['signIndefinite'] === true || r['floor'] !== undefined || r['metricFloor'] !== undefined) return true;
  const v = row.values as Record<string, unknown>;
  for (const p of ['p10', 'p50', 'p90']) if (typeof v[p] === 'number' && (v[p] as number) < 0) return true;
  return false;
}

/** Our scalar summary: type-7 p10, p50 (the median), p90 of the per-seed values. */
export function oursScalar(perSeed: readonly number[], seeds: number): ParityRow['ours'] {
  const s = ascending(perSeed);
  if (s.length === 0) return { n: 0, seeds };
  return { p10: quantile7(s, 0.1), p50: quantile7(s, 0.5), p90: quantile7(s, 0.9), n: s.length, seeds };
}

/**
 * The band rule over one row and our cell (C-0092 (1)). `weakness` is the registry's declared direction and margin
 * (none at M0: a weakness row then reads `notApplicable`); `m1` marks an ⟨M-1⟩ cell, for which a distribution row
 * without `spreadKS` or a target row without a value reads `fail` (N-06), never `missingBaseline`.
 */
export function bandRule(row: Baseline, ours: OursCell, opts: { weakness?: { direction: 'above' | 'below'; margin: number }; m1?: boolean } = {}): BandOutcome {
  const missing = (note: string): BandOutcome => ({ verdict: opts.m1 === true ? 'fail' : 'missingBaseline', band: {}, ours: { n: 0, seeds: ours.seeds }, note });
  const isDist = 'bins' in row.values;
  const oursSummary = (): ParityRow['ours'] => {
    if (!isDist) return oursScalar(ours.perSeed ?? [], ours.seeds);
    const s = ours.samples ?? [];
    let n = 0;
    for (const x of s) n += x.length;
    return { n, seeds: ours.seeds };
  };
  if (row.role === 'descriptive') return { verdict: 'reported', band: {}, ours: oursSummary(), note: row.values.n === 0 ? 'descriptive: values.n 0, every member failed (C-0116)' : 'descriptive' };
  if (row.values.n === 0) return { verdict: 'reported', band: {}, ours: oursSummary(), note: 'values.n 0: not measured by the reference (C-0116)' };
  if (needsV12(row)) return { verdict: 'notApplicable', band: {}, ours: oursSummary(), note: NOTE_V12_AT_M1 };

  if ('bins' in row.values) {
    const values = row.values;
    if (row.role === 'weakness') return { verdict: 'notApplicable', band: {}, ours: oursSummary(), note: 'a weakness distribution row has no M0 reading (C-0180 (8))' };
    if (row.spreadKS === undefined) return missing(opts.m1 === true ? '⟨M-1⟩ row lacks spreadKS (N-06)' : 'row lacks spreadKS (C-0092)');
    if (ours.samples === undefined) return { verdict: 'notApplicable', band: {}, ours: oursSummary(), note: 'ours is not a sample' };
    const cdf = referenceCdf(values.bins, values.histogram);
    if (cdf === null) return missing('row histogram is empty');
    const ks: number[] = [];
    let n = 0;
    for (const s of ours.samples) {
      if (s.length === 0) continue;
      ks.push(binnedKs(s, values.bins, cdf));
      n += s.length;
    }
    if (ks.length === 0) return { verdict: 'notApplicable', band: {}, ours: { n: 0, seeds: ours.seeds }, note: 'ours: no sample' };
    const ksMax = KS_FACTOR * row.spreadKS.p90;
    const k = median(ks);
    return { verdict: k <= ksMax ? 'pass' : 'fail', band: { ksMax }, ours: { ks: k, n, seeds: ours.seeds } };
  }

  const values = row.values;
  const o = oursSummary();
  if (ours.perSeed === undefined) return { verdict: 'notApplicable', band: {}, ours: o, note: 'ours is a sample, the row a scalar' };
  if (o.p50 === undefined) return { verdict: 'notApplicable', band: {}, ours: o, note: 'ours: no per-seed value' };
  if (row.role === 'weakness') {
    if (opts.weakness === undefined) return { verdict: 'notApplicable', band: {}, ours: o, note: 'weakness direction not declared at M0 (C-0180 (8))' };
    if (values.p50 === undefined) return missing('weakness row without p50');
    const { direction, margin } = opts.weakness;
    if (direction === 'above') {
      const lo = values.p50 + margin;
      return { verdict: o.p50 >= lo ? 'pass' : 'fail', band: { lo, direction, margin }, ours: o };
    }
    const hi = values.p50 - margin;
    return { verdict: o.p50 <= hi ? 'pass' : 'fail', band: { hi, direction, margin }, ours: o };
  }
  const parts: [number, number][] = [];
  if (values.p10 !== undefined && values.p90 !== undefined) parts.push([values.p10 * BAND_SPREAD_LO, values.p90 * BAND_SPREAD_HI]);
  if (values.p50 !== undefined) parts.push([values.p50 * (1 - BAND_SINGLE), values.p50 * (1 + BAND_SINGLE)]);
  if (parts.length === 0) return missing('row carries neither p10 and p90 nor p50');
  const inside = parts.some(([lo, hi]) => o.p50 !== undefined && o.p50 >= lo && o.p50 <= hi);
  const lo = Math.min(...parts.map((p) => p[0]));
  const hi = Math.max(...parts.map((p) => p[1]));
  const disjoint = parts.length === 2 && (parts[0][1] < parts[1][0] || parts[1][1] < parts[0][0]);
  const out: BandOutcome = { verdict: inside ? 'pass' : 'fail', band: { lo, hi }, ours: o };
  if (disjoint) out.note = `band: [${parts[0][0]}, ${parts[0][1]}] ∪ [${parts[1][0]}, ${parts[1][1]}]`;
  return out;
}
