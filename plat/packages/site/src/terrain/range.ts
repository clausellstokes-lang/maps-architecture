// The height range check (M0-e-01; §2.3 *Heights*, GEO-15, J-K7): the one door every write to a height raster goes
// through. A value is rounded to the centimetre and checked against the raster's declared limit (`reliefLimitCm`,
// 10 km): a value beyond ± the limit is clamped to it and counted, and the count is reported as W_HEIGHT_CLAMPED with
// the cell count (§3.1's warning) — so a height never wraps (an Int16Array would store 40 000 as −25 536; an Int32Array
// would wrap past 2³¹). A NaN is no height: it is clamped to 0 and counted with the rest. No other module of
// @plat/site writes a height raster's cells (test/terrain/range.test.ts holds it by a source scan).
import type { Warning } from '@plat/kernel';

/** The writer of one height raster: every cell is written through `write`, which checks the range. */
export interface HeightWriter {
  /** The raster written (Int32 cm above the datum). */
  readonly heights: Int32Array;
  /** The declared limit: every stored value lies in [−limitCm, limitCm]. */
  readonly limitCm: number;
  /** Writes `valueCm`, rounded to the centimetre and clamped to ± the limit, into cell `i`. */
  write(i: number, valueCm: number): void;
  /** Writes values[0 … n − 1] into cells start … start + n − 1, each as `write` writes it. */
  writeRow(start: number, values: Float64Array, n: number): void;
  /** The number of writes clamped so far. */
  readonly clamped: number;
  /** W_HEIGHT_CLAMPED with the clamped count, or no warning when nothing was clamped. */
  warnings(): Warning[];
}

class RangeCheckedWriter implements HeightWriter {
  readonly heights: Int32Array;
  readonly limitCm: number;
  private count = 0;

  constructor(heights: Int32Array, limitCm: number) {
    this.heights = heights;
    this.limitCm = limitCm;
  }

  get clamped(): number {
    return this.count;
  }

  write(i: number, valueCm: number): void {
    if (!(Number.isInteger(i) && i >= 0 && i < this.heights.length)) throw new RangeError(`height write: cell ${String(i)} outside the raster`);
    this.heights[i] = this.checked(valueCm);
  }

  writeRow(start: number, values: Float64Array, n: number): void {
    if (!(Number.isInteger(start) && Number.isInteger(n) && start >= 0 && n >= 0 && n <= values.length && start + n <= this.heights.length)) {
      throw new RangeError(`height write: cells ${String(start)} … ${String(start + n - 1)} outside the raster`);
    }
    const h = this.heights;
    for (let i = 0; i < n; i += 1) h[start + i] = this.checked(values[i]);
  }

  /** The range check: rounded to the centimetre, clamped to ± the limit (a NaN to 0), each clamp counted. */
  private checked(valueCm: number): number {
    const lim = this.limitCm;
    const v = Math.round(valueCm);
    if (v > lim) {
      this.count += 1;
      return lim;
    }
    if (v < -lim) {
      this.count += 1;
      return -lim;
    }
    if (v !== v) {
      this.count += 1;
      return 0;
    }
    return v;
  }

  warnings(): Warning[] {
    return this.count > 0 ? [{ code: 'W_HEIGHT_CLAMPED', count: this.count }] : [];
  }
}

/** The largest limit an Int32 raster can hold: 2³¹ − 1 cm. */
export const INT32_HEIGHT_MAX = 2147483647;

/**
 * The range-checked writer of `heights` against ± `limitCm` (an integer in 1 … 2³¹ − 1, so a clamped value itself
 * always fits the Int32 cell). Throws a RangeError on any other limit.
 */
export function heightWriter(heights: Int32Array, limitCm: number): HeightWriter {
  if (!(Number.isInteger(limitCm) && limitCm >= 1 && limitCm <= INT32_HEIGHT_MAX)) {
    throw new RangeError(`heightWriter: the limit ${String(limitCm)} cm is not an integer in 1 … 2³¹ − 1`);
  }
  return new RangeCheckedWriter(heights, limitCm);
}
