// Shared pieces of the geometry services (M0-a-10; §3.1, §3.2, §3.4): the double point shape the services return, the
// angle constants (dmath carries its own; the lint refuses Math.PI, C-0125), the lattice-input refusal, an exact sum
// with a BigInt flush (§3.2 (6)'s pattern, reused by regularFit's centroid), and unit directions through ratio(). π,
// the lattice-coordinate check, `lp` and `distinctRing` live in the kernel's shared exact module and are re-exported
// here under their names, so a geometry module and a by-path importer of this file read the one definition
// (kernel-plan.md §1.12 G-1; C-0314, C-0333). `geom/index.ts` exports none of this file's names.
import { err, ratio, type KernelResult } from '../num/index.js';
import { isLatticeCoord } from '../num/exact.js';
import type { LatticePoint } from '../types/index.js';

export { PI, distinctRing, isLatticeCoord, lp } from '../num/exact.js';

/** A point or a direction in doubles (cm): a value the services return, never an arena coordinate (§3.2 (1)). */
export interface XY {
  x: number;
  y: number;
}

/** 2π. */
export const TWO_PI = 6.283185307179586;
/** Centidegrees per radian, 18 000 ÷ π. */
export const CDEG_PER_RAD = 5729.5779513082325;
/** √3. */
export const SQRT3 = 1.7320508075688772;

/** 2⁵²: the flush threshold of an exact double partial (§3.2 (6)). */
const FLUSH = 4_503_599_627_370_496;

/**
 * An exact sum of integer-valued doubles each below 2⁴⁹ in magnitude: a double partial flushed into a BigInt whenever it
 * reaches 2⁵², so every partial stays below 2⁵³ and every addition is exact — area2's accumulator (§3.2 (6)).
 */
export class ExactSum {
  private partial = 0;
  private acc = 0n;

  add(v: number): void {
    this.partial += v;
    if (this.partial >= FLUSH || this.partial <= -FLUSH) {
      this.acc += BigInt(this.partial);
      this.partial = 0;
    }
  }

  total(): bigint {
    return this.acc + BigInt(this.partial);
  }
}

/**
 * The refusal for a point list that is not on the lattice: the services read lattice points (snap is the door, §3.2
 * (7)), so a coordinate that is not an integer below 2²³ — NaN and ±∞ among them — returns E_OUT_OF_RANGE naming the
 * coordinate, x first, as snap does, instead of a value computed from it. Null when every point is a lattice point.
 */
export function offLattice<T>(points: readonly LatticePoint[]): Extract<KernelResult<T>, { ok: false }> | null {
  for (const p of points) {
    if (!isLatticeCoord(p.x)) return err('E_OUT_OF_RANGE', 'x');
    if (!isLatticeCoord(p.y)) return err('E_OUT_OF_RANGE', 'y');
  }
  return null;
}

/** 2²⁰: directions are scaled by it before normalising, so ratio()'s 1 cm floor reads any direction of length ≥ 2⁻²⁰. */
const DIR_SCALE = 1_048_576;

/**
 * The unit vector along v, or null when v is not a finite direction of length at least 2⁻²⁰. Scaling by a power of two
 * is exact, so the result equals v ÷ |v| to the bit; the division goes through ratio() (§3.2 (8)).
 */
export function unitOf(v: XY): XY | null {
  const x = v.x * DIR_SCALE;
  const y = v.y * DIR_SCALE;
  const len = Math.sqrt(x * x + y * y);
  if (!(len < Infinity)) return null;
  const ux = ratio(x, len, 'length');
  const uy = ratio(y, len, 'length');
  if (!ux.ok || !uy.ok) return null;
  return { x: ux.value, y: uy.value };
}

/** The point at parameter t of a → b. */
export function lerp(a: XY, b: XY, t: number): XY {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}
