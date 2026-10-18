// snap(x, y): the one door through which a number becomes an arena coordinate (§3.2 (1), (7)). M0-a-01.
import type { Cm, LatticePoint } from '../types/index.js';
import { roundHalfAway } from './lattice.js';
import { err, ok, type KernelResult } from './result.js';

/**
 * Rounds each coordinate to the nearest centimetre (a half away from zero) and refuses, in every build, a result
 * with `!(Math.abs(v) < 2**23)` — the literal 8388608 — as E_OUT_OF_RANGE: one comparison per coordinate that also
 * catches NaN and ±∞, so none of them, nor a value past 2³¹, ever reaches an Int32Array. The comparison is taken on
 * the rounded value, so an input in [2²³ − ½, 2²³) is refused rather than minted as 2²³ (C-0134 (1)); `detail` names
 * the refused coordinate, x first.
 */
export function snap(x: number, y: number): KernelResult<LatticePoint> {
  const sx = roundHalfAway(x);
  if (!(Math.abs(sx) < 8_388_608)) return err('E_OUT_OF_RANGE', 'x');
  const sy = roundHalfAway(y);
  if (!(Math.abs(sy) < 8_388_608)) return err('E_OUT_OF_RANGE', 'y');
  return ok({ x: sx as Cm, y: sy as Cm });
}
