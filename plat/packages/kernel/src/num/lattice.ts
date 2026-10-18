// The lattice constants (§2.2's LatticeSpec; their meaning §3.2 (2), their classes §3.10) and the one rounding rule a
// double takes on its way to an integer — snap's, cdeg's and the frame's (M0-a-01; C-0134 (1)).

/** Fixed for an arena's life (§2.2): §3.2 (1)'s range bound is taken at the population cap and the extreme aspect. */
export interface LatticeSpec {
  unitCm: 1;
  /** The shortest edge any writer may create or leave (§3.2 (2)). */
  minEdgeCm: 25;
  /** `minEdge` plus 1 cm of lattice slack (§3.2 (2)). */
  attractCm: 26;
  minFaceAngleCdeg: 500;
  /** 2²³: every coordinate satisfies |x|, |y| < rangeCm (§3.2 (1)). */
  rangeCm: 8_388_608;
}

export const LATTICE: LatticeSpec = Object.freeze({
  unitCm: 1,
  minEdgeCm: 25,
  attractCm: 26,
  minFaceAngleCdeg: 500,
  rangeCm: 8_388_608,
});

/**
 * The nearest integer, a half rounded away from zero, and never −0: Math.round's exact rounding (ties toward +∞) taken
 * on the magnitude, so the rule is symmetric under reflection through the origin, where every frame is centred (§3.2
 * (9)). NaN and ±∞ pass through unchanged for the caller's range check.
 */
export function roundHalfAway(v: number): number {
  return (v < 0 ? -Math.round(-v) : Math.round(v)) + 0;
}
