// FieldBands' cut points and the hysteresis (M0-e-05; §4.5 *Bands*: "the cut points are computed once per town so that
// the share of built land in each band equals that band's share …", *The band set* (the middle band), §2.5 FieldBands;
// C-0049; readings C-0255 (5), (6)).
//
// `cutPoints(field, shares, land)`: the land is the cells whose centre lies in a district's face (the raster's measure of
// the stage's land, one cell = cellCm²); its N values sorted; the cut after band b sits at the target index
// k_b = round(cumulative share_b × N), between the k_b-th and (k_b + 1)-th smallest values (their midpoint), so a band
// holds round(cum_b N) − round(cum_{b−1} N) cells — its share of the land within one cell. A value equal to a cut
// belongs to the band above (@plat/tables' `bandOf`). Where a run of equal values straddles a target (a clamped
// plateau), no cut can split it: the cut moves to the nearest index where the sorted values step (the nearer below on a
// tie), the cuts stay ascending, and the miss is reported in cells (`errorCells`) — never hidden. With no land cell the
// default cuts of bands.json stand (`from: 'default'`).
import { bandOf, defaultBandCuts } from '@plat/tables';
import type { FieldBands } from '@plat/model';
import type { CutResult, FieldName } from './types.js';

/** The middle band (§4.5): the band where the shares' cumulative sum first passes one half. */
export function middleOf(bands: readonly string[], shares: readonly number[]): string {
  let cum = 0;
  for (let b = 0; b < bands.length; b += 1) {
    cum += shares[b];
    if (cum > 0.5) return bands[b];
  }
  throw new RangeError('fields: the band shares never pass one half');
}

/** The nearest index to k (0 < index < n) where sorted values step (v[i − 1] < v[i]); the lower on a tie; −1 for none. */
function nearestStep(v: Float64Array, k: number): number {
  const n = v.length;
  for (let d = 0; d < n; d += 1) {
    const lo = k - d;
    if (lo >= 1 && lo < n && v[lo - 1] < v[lo]) return lo;
    const hi = k + d;
    if (d > 0 && hi >= 1 && hi < n && v[hi - 1] < v[hi]) return hi;
    if (lo < 1 && hi >= n) break;
  }
  return -1;
}

/**
 * The cut points of `field` over the `land` cells (mask: non-zero = land) for the bands' `shares` in order (see the
 * module comment). `shares` sum to 1.
 */
export function cutPoints(field: ArrayLike<number>, shares: readonly number[], land: Uint8Array): CutResult {
  if (land.length !== field.length) throw new RangeError(`cutPoints: a land mask of ${String(land.length)} for a field of ${String(field.length)}`);
  if (shares.length < 1) throw new RangeError('cutPoints: no band');
  let n = 0;
  for (let i = 0; i < land.length; i += 1) if (land[i] !== 0) n += 1;
  const nb = shares.length;
  const target: number[] = shares.map((s) => s * n);
  if (n === 0) {
    const d = defaultBandCuts();
    if (d.cuts.length !== nb - 1) throw new RangeError('cutPoints: the default cuts do not fit the band set');
    return { cuts: [...d.cuts], landCells: 0, perBand: shares.map(() => 0), target, errorCells: 0, from: 'default' };
  }
  const v = new Float64Array(n);
  let m = 0;
  for (let i = 0; i < land.length; i += 1) if (land[i] !== 0) v[m++] = field[i];
  v.sort((a, b) => a - b);
  const cuts: number[] = [];
  let cum = 0;
  for (let b = 0; b + 1 < nb; b += 1) {
    cum += shares[b];
    let k = Math.round(cum * n);
    if (k < 0) k = 0;
    if (k > n) k = n;
    let cut: number;
    if (k <= 0) cut = v[0];
    else if (k >= n) cut = v[n - 1] < 1 ? (v[n - 1] + 1) / 2 : 1;
    else if (v[k - 1] < v[k]) cut = (v[k - 1] + v[k]) / 2;
    else {
      const s = nearestStep(v, k);
      if (s < 0) cut = v[k];
      else {
        k = s;
        cut = (v[k - 1] + v[k]) / 2;
      }
    }
    if (cuts.length > 0 && cut < cuts[cuts.length - 1]) cut = cuts[cuts.length - 1];
    cuts.push(cut);
  }
  // the land per band, read back through the cuts the record carries (a value equal to a cut is the band above)
  const perBand = shares.map(() => 0);
  for (let i = 0; i < n; i += 1) {
    let b = 0;
    while (b < cuts.length && !(v[i] < cuts[b])) b += 1;
    perBand[b] += 1;
  }
  let errorCells = 0;
  for (let b = 0; b < nb; b += 1) errorCells = Math.max(errorCells, Math.abs(perBand[b] - target[b]));
  return { cuts, landCells: n, perBand, target, errorCells, from: 'shares' };
}

/**
 * The town's FieldBands for one field (§2.5): the cuts, the band set in order, the middle band, the hysteresis, the
 * source ('roster-shares': the cuts computed from the band shares — the default household shares standing in for the
 * roster's until M1, C-0049; 'table' when the land held no cell and bands.json's default cuts stand) and the epoch.
 */
export function fieldBands(field: FieldName, cut: CutResult, bands: readonly string[], shares: readonly number[], hysteresis: number, epoch = 0): FieldBands {
  if (cut.cuts.length !== bands.length - 1) throw new RangeError('fieldBands: one cut fewer than the bands');
  return { field, cuts: cut.cuts.slice(), hysteresis, bands: bands.slice(), middle: middleOf(bands, shares), source: cut.from === 'shares' ? 'roster-shares' : 'table', epoch };
}

/**
 * The band a block keeps (§4.5 *Bands*: "a block keeps its recorded band unless its value crosses a cut point by more
 * than the hysteresis (0.02)"): `held` while the value lies within its interval widened by the hysteresis on each side
 * (a crossing by exactly the hysteresis keeps it), else the band the value falls in.
 */
export function holdBand(value: number, held: string, fb: FieldBands): string {
  const b = fb.bands.indexOf(held);
  if (b < 0) throw new RangeError(`holdBand: '${held}' is not a band of the set`);
  const lo = b === 0 ? -Infinity : fb.cuts[b - 1] - fb.hysteresis;
  const hi = b === fb.bands.length - 1 ? Infinity : fb.cuts[b] + fb.hysteresis;
  if (value >= lo && value <= hi) return held;
  return bandOf(value, fb);
}
