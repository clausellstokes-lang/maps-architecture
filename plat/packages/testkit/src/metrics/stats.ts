// The sample statistics the metrics and the band rule share (M0-k-05): Hyndman and Fan's type-7 quantile (1996;
// §17.1 (8)), the median, and the Kolmogorov–Smirnov distance of a sample to a binned reference (§13.5's distribution
// clause, read at the reference's bin edges; C-0180 (6)).

/** The type-7 quantile of an ascending sample (Hyndman and Fan 1996): h = (n − 1)p, linear between order statistics. */
export function quantile7(sorted: readonly number[], p: number): number {
  const n = sorted.length;
  if (n === 0) return Number.NaN;
  if (n === 1) return sorted[0];
  const h = (n - 1) * p;
  const lo = Math.floor(h);
  const hi = Math.min(n - 1, lo + 1);
  return sorted[lo] + (h - lo) * (sorted[hi] - sorted[lo]);
}

/** An ascending copy. */
export function ascending(values: readonly number[]): number[] {
  return [...values].sort((a, b) => a - b);
}

/** The median (type 7 at 0.5); NaN for an empty sample. */
export function median(values: readonly number[]): number {
  return quantile7(ascending(values), 0.5);
}

/** The sample standard deviation (n − 1) about the sample mean; NaN below two values. */
export function sampleStd(values: readonly number[]): number {
  const n = values.length;
  if (n < 2) return Number.NaN;
  let m = 0;
  for (const v of values) m += v;
  m /= n;
  let s = 0;
  for (const v of values) s += (v - m) * (v - m);
  return Math.sqrt(s / (n - 1));
}

/**
 * How a reference histogram's counts sit on its edges e₀ < … < e₍k−1₎ (C-0180 (6)): `k + 1` counts are an underflow
 * bin (x < e₀), the k − 1 bins [eᵢ, eᵢ₊₁) and an overflow bin (x ≥ e₍k−1₎); `k` counts are the bins and an overflow
 * bin (no underflow); `k − 1` counts are the bins alone. Any other length is no histogram (null).
 */
export function histogramLayout(edges: number, counts: number): 'under+over' | 'over' | 'closed' | null {
  if (edges < 1) return null;
  if (counts === edges + 1) return 'under+over';
  if (counts === edges) return 'over';
  if (counts === edges - 1 && edges >= 2) return 'closed';
  return null;
}

/**
 * The reference's cumulative share below each edge, P(X < eᵢ), from its counts (C-0180 (6)); null when the layout is
 * not one of `histogramLayout`'s or the counts sum to 0.
 */
export function referenceCdf(edges: readonly number[], counts: readonly number[]): number[] | null {
  const layout = histogramLayout(edges.length, counts.length);
  if (layout === null) return null;
  let total = 0;
  for (const c of counts) total += c;
  if (!(total > 0)) return null;
  const out: number[] = [];
  let below = 0;
  // under+over: P(X < e_i) = Σ_{j ≤ i} counts[j]; over / closed: P(X < e_i) = Σ_{j < i} counts[j]
  for (let i = 0; i < edges.length; i += 1) {
    if (layout === 'under+over') below += counts[i];
    else if (i > 0) below += counts[i - 1];
    out.push(below / total);
  }
  return out;
}

/** The binned KS distance of a sample to a reference CDF at the edges: maxᵢ |F_ours(eᵢ) − F_ref(eᵢ)|; 1 for no sample. */
export function binnedKs(sample: readonly number[], edges: readonly number[], refCdf: readonly number[]): number {
  if (sample.length === 0) return 1;
  const s = ascending(sample);
  let d = 0;
  let j = 0;
  for (let i = 0; i < edges.length; i += 1) {
    while (j < s.length && s[j] < edges[i]) j += 1;
    d = Math.max(d, Math.abs(j / s.length - refCdf[i]));
  }
  return d;
}
