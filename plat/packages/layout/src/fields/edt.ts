// The exact Euclidean distance transform (M0-e-05; §4.5 "one distance transform per driver class", §12.4, §17.1 (8):
// Felzenszwalb and Huttenlocher, "Distance Transforms of Sampled Functions", Theory of Computing 8 (2012)). The squared
// distance from every cell centre to the nearest source cell centre, in cells², exact: the 1-D transform of a sampled
// function f (0 at a source, +∞ elsewhere) is the lower envelope of the parabolas (q − v)² + f(v) over the finite
// samples, built in one left-to-right pass and read in a second, and the 2-D transform is the 1-D transform along every
// column, then along every row of the result — O(N) in all. The envelope's breakpoints are kept as exact fractions
// (numerator, positive denominator — integers far inside 2⁵³) and compared by cross-multiplication, so no rounding
// enters: every output is the integer min over sources of Δi² + Δj². The nearest source's index rides along (the lowest
// index among equals is not promised; the distance is).
//
/** The squared distances (cells²; +∞ where the grid holds no source) and, per cell, a nearest source's index (−1: none). */
export interface DistanceField {
  readonly d2: Float64Array;
  readonly nearest: Int32Array;
}

/**
 * The 1-D transform of `f` (n samples read at `fOff + k · fStep`, its source indices `src` likewise) into `out` / `outSrc`
 * (written at `oOff + k · oStep`). `v`, `zn`, `zd` are scratch of length ≥ n + 1.
 */
function dt1(
  f: Float64Array,
  src: Int32Array,
  fOff: number,
  fStep: number,
  n: number,
  out: Float64Array,
  outSrc: Int32Array,
  oOff: number,
  oStep: number,
  v: Int32Array,
  zn: Float64Array,
  zd: Float64Array,
): void {
  // the envelope: parabolas v[0..k], parabola v[m] lowest on (z[m], z[m + 1]]; z[0] = −∞ (zd 0, zn −1), z[k + 1] = +∞
  let k = -1;
  for (let q = 0; q < n; q += 1) {
    const fq = f[fOff + q * fStep];
    if (!(fq < Infinity)) continue;
    if (k < 0) {
      k = 0;
      v[0] = q;
      zn[0] = -1;
      zd[0] = 0;
      continue;
    }
    // the intersection of parabola q with parabola v[k]: s = ((fq + q²) − (f(v) + v²)) ÷ (2q − 2v)
    let sn = 0;
    let sd = 0;
    for (;;) {
      const p = v[k];
      const fp = f[fOff + p * fStep];
      sn = fq + q * q - (fp + p * p);
      sd = 2 * (q - p);
      // s ≤ z[k]?  z[k] = −∞ never: the envelope keeps its first parabola
      if (zd[k] === 0) break;
      if (sn * zd[k] <= zn[k] * sd) {
        k -= 1;
        continue;
      }
      break;
    }
    k += 1;
    v[k] = q;
    zn[k] = sn;
    zd[k] = sd;
  }
  if (k < 0) {
    for (let q = 0; q < n; q += 1) {
      out[oOff + q * oStep] = Infinity;
      outSrc[oOff + q * oStep] = -1;
    }
    return;
  }
  const top = k;
  let m = 0;
  for (let q = 0; q < n; q += 1) {
    // advance while the next breakpoint z[m + 1] < q
    while (m < top && zn[m + 1] < q * zd[m + 1]) m += 1;
    const p = v[m];
    const dq = q - p;
    out[oOff + q * oStep] = dq * dq + f[fOff + p * fStep];
    outSrc[oOff + q * oStep] = src[fOff + p * fStep];
  }
}

/**
 * The exact squared Euclidean distance transform of a source mask over a cols × rows grid (row-major): per cell, the
 * least Δi² + Δj² to a marked cell (+∞ when none is marked) and that cell's index.
 */
export function distanceTransform(mask: Uint8Array, cols: number, rows: number): DistanceField {
  const n = cols * rows;
  if (!(Number.isInteger(cols) && Number.isInteger(rows) && cols >= 1 && rows >= 1 && mask.length === n)) {
    throw new RangeError(`distanceTransform: a ${String(cols)} × ${String(rows)} grid with a mask of ${String(mask.length)}`);
  }
  const f = new Float64Array(n);
  const src = new Int32Array(n);
  for (let i = 0; i < n; i += 1) {
    f[i] = mask[i] !== 0 ? 0 : Infinity;
    src[i] = mask[i] !== 0 ? i : -1;
  }
  const len = Math.max(cols, rows) + 1;
  const v = new Int32Array(len);
  const zn = new Float64Array(len);
  const zd = new Float64Array(len);
  const mid = new Float64Array(n);
  const midSrc = new Int32Array(n);
  // along every column (stride cols), then along every row of the result
  for (let i = 0; i < cols; i += 1) dt1(f, src, i, cols, rows, mid, midSrc, i, cols, v, zn, zd);
  const d2 = new Float64Array(n);
  const nearest = new Int32Array(n);
  for (let j = 0; j < rows; j += 1) dt1(mid, midSrc, j * cols, 1, cols, d2, nearest, j * cols, 1, v, zn, zd);
  return { d2, nearest };
}
