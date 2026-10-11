// Frames are rectangles (§3.2 (9)). M0-a-01 builds the law that turns an area and an aspect into a
// frame; the rung's area law (§1.1) is its caller's, and frame growth at an epoch is M4's (§4b; `Plat.frame` stays
// replaceable).
import type { Cm } from '../types/index.js';
import { roundHalfAway } from './lattice.js';
import { ratio } from './ratio.js';
import { err, ok, type KernelResult } from './result.js';

export interface Frame {
  widthCm: Cm;
  heightCm: Cm;
  /** width / height, 0.5–2. */
  aspect: number;
  /** The context margin per side, as a share of the frame's side: 0.3 under the `base` frame law (§3.2 (9)). */
  marginShare: number;
}

/**
 * The frame of area A (m²) at `aspect` ∈ [0.5, 2]: width = √(A · aspect), height = √(A / aspect) — taken as A ÷ width
 * through `ratio` (length), the same value without a division by the aspect — each rounded to whole centimetres, a
 * half away from zero, centred on (0, 0) with +y north. Refused with E_OUT_OF_RANGE, its detail naming the input, when
 * A is not positive and finite, the aspect lies outside [0.5, 2], the margin share is negative or not finite, or the
 * arena — the frame plus `marginShare` of its side on every side — would reach |x| or |y| ≥ 2²³ (§3.2 (1)) (C-0134 (6)).
 */
export function frameOf(areaM2: number, aspect: number, marginShare: number): KernelResult<Frame> {
  if (!(Number.isFinite(areaM2) && areaM2 > 0)) return err('E_OUT_OF_RANGE', 'area');
  if (!(aspect >= 0.5 && aspect <= 2)) return err('E_OUT_OF_RANGE', 'aspect');
  if (!(Number.isFinite(marginShare) && marginShare >= 0)) return err('E_OUT_OF_RANGE', 'margin');
  const areaCm2 = areaM2 * 10_000;
  const w = Math.sqrt(areaCm2 * aspect);
  const h = ratio(areaCm2, w, 'length');
  if (!h.ok) return err(h.code, h.detail);
  const widthCm = roundHalfAway(w);
  const heightCm = roundHalfAway(h.value);
  const reach = 0.5 + marginShare;
  if (!(Math.ceil(widthCm * reach) < 8_388_608 && Math.ceil(heightCm * reach) < 8_388_608)) {
    return err('E_OUT_OF_RANGE', 'range');
  }
  return ok({ widthCm: widthCm as Cm, heightCm: heightCm as Cm, aspect, marginShare });
}
