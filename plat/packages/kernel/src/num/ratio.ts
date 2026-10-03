// ratio(num, den, kind): the checked division of model code (§3.2 (8)); §6.5's lint (plat/ratio-division, C-0044)
// flags every other division whose divisor is not a non-zero literal. M0-a-01.
import { degenerate, ok, type KernelResult } from './result.js';

/** The quantity a denominator measures (§3.2 (8)). */
export type RatioKind = 'length' | 'area' | 'angle' | 'count';

/** Each quantity's floor in its own unit: length 1 cm, area 1 cm², angle 1 centidegree, count 1 (§3.2 (8)). */
export const RATIO_FLOOR: Readonly<Record<RatioKind, number>> = Object.freeze({ length: 1, area: 1, angle: 1, count: 1 });

/**
 * num ÷ den, or E_DEGENERATE with detail `ratio` when |den| is below its quantity's floor; the comparison is written so
 * that a NaN denominator is refused too (C-0134 (4)).
 */
export function ratio(num: number, den: number, kind: RatioKind): KernelResult<number> {
  if (!(Math.abs(den) >= RATIO_FLOOR[kind])) return degenerate('ratio');
  return ok(num / den);
}
