// dmath — the kernel's deterministic transcendentals (M0-d-03; §3.1, §6.5 (2), §17.4; D-23, J-11; C-0136): our port
// of the fdlibm 5.3 routines the model reads (C-0039), each bit-exact to fdlibm's C on every IEEE 754 host — the
// known-answer vectors of both architectures (arm64 and x86-64, C-0029) hold it — so a digest never depends on the
// engine's Math.*. Every real function of a model package other than + − × ÷ and Math.sqrt goes through it (§6.5 (2),
// (3)); every power not a literal integer 0 … 4 through dmath.pow. Sun's notice: vendor/fdlibm-5.3/NOTICE.txt and
// THIRD-PARTY-NOTICES.txt (§17.4). Not ported yet: asin, acos, tan, log1p, expm1 and the rest — each when a reader
// lands, with its vectors (C-0039).
import { atan, atan2 } from './atan.js';
import { exp } from './exp.js';
import { log } from './log.js';
import { pow } from './pow.js';
import { cos, sin } from './trig.js';

/** The deterministic transcendentals: fdlibm 5.3's results to the bit on every host (§6.5 (2)). */
export interface Dmath {
  /** x raised to the power y (fdlibm's __ieee754_pow): §4.6's τ = e_lo · (e_hi / e_lo)^g and p = 0.5 · 4^u. */
  readonly pow: (x: number, y: number) => number;
  /** The natural logarithm (fdlibm's __ieee754_log). */
  readonly log: (x: number) => number;
  /** e raised to the power x (fdlibm's __ieee754_exp): §4.4 S5c's ρ = e^(−Δs/ℓ). */
  readonly exp: (x: number) => number;
  /** The sine of x radians, with fdlibm's argument reduction (§3.4's regularFit). */
  readonly sin: (x: number) => number;
  /** The cosine of x radians, with fdlibm's argument reduction (§3.4's regularFit). */
  readonly cos: (x: number) => number;
  /** The angle of the point (x, y) in radians, in [−π, π] (fdlibm's __ieee754_atan2): §3.2 (5)'s directions. */
  readonly atan2: (y: number, x: number) => number;
  /** The arctangent of x in radians, in [−π/2, π/2] (fdlibm's atan). */
  readonly atan: (x: number) => number;
}

/** dmath: `dmath.pow`, `dmath.log`, `dmath.exp`, `dmath.sin`, `dmath.cos`, `dmath.atan2`, `dmath.atan` (§3.1). */
export const dmath: Dmath = Object.freeze({ pow, log, exp, sin, cos, atan2, atan });
