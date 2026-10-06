// The count law and the quarter law (M0-e-04; §4.5 *One law for count and band (MFP-10)*, *Quarters*): N_d =
// round(3.5 · √(A_ha ÷ 10)) seeds over the settlement's land A, the band [0.5, 1.5] × A ÷ N_d, so the mean district
// grows as √(10A) ÷ 3.5; N_q = round(1.37 · B^0.267), B the roster's building count. Every coefficient is a cell of
// `district.json` (DistrictCells); the power goes through dmath (§6.5 (2)), every division by a variable through
// `ratio` (C-0044).
import { dmath, ratio } from '@plat/kernel';
import { districtCells, type DistrictCells } from './table.js';

/** The count law at A (ha). */
export interface CountLaw {
  /** N_d: the seeds over the land (at least 1 on land above zero; 0 on none). */
  readonly n: number;
  /** A ÷ N_d (ha). */
  readonly meanHa: number;
  /** The district band [0.5, 1.5] × A ÷ N_d (ha). */
  readonly bandHa: readonly [number, number];
}

/**
 * §4.5's count law: N_d = round(3.5 · √(A_ha ÷ 10)) — at least one district on any land (§4.5: "a settlement with a
 * single coarse face is one district") — and the band [0.5, 1.5] × A ÷ N_d. No land: N_d = 0 and an empty band.
 */
export function countLaw(aHa: number, cells: DistrictCells = districtCells()): CountLaw {
  if (!(aHa >= 0 && Number.isFinite(aHa))) throw new RangeError(`countLaw: A is a finite area ≥ 0 (ha), got ${String(aHa)}`);
  if (aHa === 0) return { n: 0, meanHa: 0, bandHa: [0, 0] };
  const q = ratio(aHa * 1_000_000, cells.countAreaHa * 1_000_000, 'area');
  if (!q.ok) throw new RangeError('countLaw: the anchor area is below one hectare-millionth');
  const n = Math.max(1, Math.round(cells.countCoefficient * Math.sqrt(q.value)));
  const mean = ratio(aHa, n, 'count');
  if (!mean.ok) throw new RangeError('countLaw: N_d is below one');
  return { n, meanHa: mean.value, bandHa: [cells.band[0] * mean.value, cells.band[1] * mean.value] };
}

/** §4.5's N_q = round(1.37 · B^0.267) (B ≥ 1 buildings; at least one quarter). */
export function quarterCount(buildings: number, cells: DistrictCells = districtCells()): number {
  if (!(buildings >= 1 && Number.isFinite(buildings))) throw new RangeError(`quarterCount: B is a building count ≥ 1, got ${String(buildings)}`);
  return Math.max(1, Math.round(cells.quarterCoefficient * dmath.pow(buildings, cells.quarterExponent)));
}
