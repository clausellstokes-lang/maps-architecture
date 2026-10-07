// The Gaussian of one block width as an O(N) three-box blur (M0-e-05; §4.5 "smoothed by a Gaussian of one block width
// (σ ≈ 60 m at CITY) … the Gaussian an O(N) three-box blur", §12.4, §17.1 (8): Wells, "Efficient synthesis of Gaussian
// filters by cascaded uniform filters", IEEE PAMI 8 (1986); readings C-0255 (4)). Three passes of a box filter along each
// axis; each box is the *extended* box of Gwosdek, Grewenig, Bruhn and Weickert ("Theoretical foundations of Gaussian
// convolution by extended box filtering", SSVM 2011): 2r + 1 cells of weight 1 and one cell of weight α at each end,
// normalised — its variance (r(r + 1)(2r + 1) ÷ 3 + 2α(r + 1)²) ÷ (2r + 1 + 2α) set to σ² ÷ 3 exactly, so three passes
// have variance σ² at any cell size (a plain box's variance moves in whole-cell steps: at 32 m cells the nearest three
// plain boxes give σ = 58.4 m, at 48 m 55.4 m). Each pass is a running sum: O(N) per pass, whatever σ. The grid's edge
// repeats its last cell (a constant raster stays constant; the mass of an interior source is kept).
import { ratio } from '@plat/kernel';

/** One extended box: radius r ≥ 0 and end weight α ∈ [0, 1), with its normaliser 1 ÷ (2r + 1 + 2α). */
export interface BoxSpec {
  readonly radius: number;
  readonly alpha: number;
  readonly norm: number;
}

/** The extended box whose three passes have variance σ² (σ in cells, > 0). */
export function boxFor(sigmaCells: number): BoxSpec {
  if (!(sigmaCells > 0 && sigmaCells < Infinity)) throw new RangeError(`blur: σ = ${String(sigmaCells)} cells`);
  const s2 = (sigmaCells * sigmaCells) / 3;
  // the widest plain box whose variance r(r + 1) ÷ 3 is ≤ s²
  const r = Math.floor((Math.sqrt(12 * s2 + 1) - 1) / 2);
  const base = (r * (r + 1) * (2 * r + 1)) / 3;
  // α from (base + 2α(r + 1)²) ÷ (2r + 1 + 2α) = s²: its denominator 2(r + 1)² − 2s² > 0, as s² < (r + 1)(r + 2) ÷ 3
  const den = 2 * (r + 1) * (r + 1) - 2 * s2;
  // eslint-disable-next-line plat/ratio-division -- den = 2(r + 1)² − 2s² > 2(r + 1)(2r + 1)/3 > 0: r is the widest plain box whose variance is ≤ s², so s² < (r + 1)(r + 2)/3
  let alpha = (s2 * (2 * r + 1) - base) / den;
  if (alpha < 0) alpha = 0;
  const norm = ratio(1, 2 * r + 1 + 2 * alpha, 'count');
  if (!norm.ok) throw new RangeError('blur: a box of no width');
  return { radius: r, alpha, norm: norm.value };
}

/**
 * One pass of the extended box along a line of n samples (stride `step` from `off`); `buf` a scratch line of
 * ≥ n + 2(r + 1): the line padded at each end with r + 1 copies of its end sample (the edge repeated).
 */
function pass(a: Float64Array, off: number, step: number, n: number, b: BoxSpec, buf: Float64Array): void {
  const r = b.radius;
  const al = b.alpha;
  const norm = b.norm;
  const pad = r + 1;
  const first = a[off];
  const last = a[off + (n - 1) * step];
  for (let k = 0; k < pad; k += 1) {
    buf[k] = first;
    buf[pad + n + k] = last;
  }
  for (let k = 0; k < n; k += 1) buf[pad + k] = a[off + k * step];
  // the running sum over the window [k − r, k + r]
  let s = 0;
  for (let k = pad - r; k <= pad + r; k += 1) s += buf[k];
  for (let k = 0; k < n; k += 1) {
    const c = pad + k;
    a[off + k * step] = (s + al * (buf[c - r - 1] + buf[c + r + 1])) * norm;
    s += buf[c + r + 1] - buf[c - r];
  }
}

/** The three-box blur of a cols × rows raster in place: three passes along every row, then three along every column. */
export function blur3(a: Float64Array, cols: number, rows: number, b: BoxSpec): void {
  if (a.length !== cols * rows) throw new RangeError(`blur: a raster of ${String(a.length)} for ${String(cols)} × ${String(rows)}`);
  const buf = new Float64Array(Math.max(cols, rows) + 2 * (b.radius + 1) + 1);
  for (let p = 0; p < 3; p += 1) for (let j = 0; j < rows; j += 1) pass(a, j * cols, 1, cols, b, buf);
  for (let p = 0; p < 3; p += 1) for (let i = 0; i < cols; i += 1) pass(a, i, cols, rows, b, buf);
}
