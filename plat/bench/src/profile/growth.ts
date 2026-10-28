// bench/src/profile/growth.ts — R7's growth.mjs as a module: from the windows of an analysis, per window the ms a cut
// split into the savepoint machinery (opSave's image + the rollback's putBack) and the rest, the insertion's and the
// index's ms a read, the restore's ms a read and GC's ms a cut; then each column's least-squares line against the
// window's index (the slope: ms per window of W cuts). Windows with fewer than W / 2 cuts (the stage's tail) are left
// out, as R7's `cuts >= 50` at W = 100.
import type { Window } from './analyse.js';

export const GROWTH_KEYS = ['perCut', 'save', 'rest', 'ins', 'idx', 'restore', 'gc'] as const;
export type GrowthKey = (typeof GROWTH_KEYS)[number];
export type GrowthRow = { readonly w: number; readonly cuts: number; readonly reads: number } & Record<GrowthKey, number>;

/** A least-squares line y = a + b·x over x = 0, 1, …: a, b, and the fitted first and last values. */
export interface Fit {
  readonly a: number;
  readonly b: number;
  readonly first: number;
  readonly last: number;
}

export function fit(ys: readonly number[]): Fit {
  const n = ys.length;
  if (n === 0) return { a: NaN, b: NaN, first: NaN, last: NaN };
  const mx = (n - 1) / 2;
  const my = ys.reduce((s, y) => s + y, 0) / n;
  let sxy = 0;
  let sxx = 0;
  ys.forEach((y, x) => {
    sxy += (x - mx) * (y - my);
    sxx += (x - mx) ** 2;
  });
  const b = sxx === 0 ? 0 : sxy / sxx;
  const a = my - b * mx;
  return { a, b, first: a, last: a + b * (n - 1) };
}

/** A ratio, 0 when the denominator is 0 (a window with no kerb reads has no per-read figure). */
const per = (x: number, n: number): number => (n === 0 ? 0 : x / n);

export function growthRows(windows: readonly Window[], window: number): GrowthRow[] {
  return windows
    .filter((w) => w.cuts >= window / 2)
    .map((w) => {
      const f = w.fns;
      const save = (f['opSave'] ?? 0) + (f['putBack'] ?? 0);
      return {
        w: w.w, cuts: w.cuts, reads: w.reads,
        perCut: w.wallMs / w.cuts, save: save / w.cuts, rest: (w.wallMs - save) / w.cuts,
        ins: per(f['insertChain'] ?? 0, w.reads), idx: per(f['gridCandidates'] ?? 0, w.reads), restore: per(f['putBack'] ?? 0, w.reads),
        gc: (f['(garbage collector)'] ?? 0) / w.cuts,
      };
    });
}

export function growthFits(rows: readonly GrowthRow[]): Record<GrowthKey, Fit> {
  return Object.fromEntries(GROWTH_KEYS.map((k) => [k, fit(rows.map((r) => r[k]))])) as Record<GrowthKey, Fit>;
}

export function formatGrowth(rows: readonly GrowthRow[], fits: Record<GrowthKey, Fit>, window: number): string[] {
  if (rows.length === 0) return [`## growth: no window holds ≥ ${String(window / 2)} cuts`];
  return [
    `## growth per window of ${String(window)} cuts (ms of the profiled run; savepoint = opSave + putBack inclusive; ins / idx / restore per kerb read)`,
    'win\tms/cut\tsavepoint ms/cut\trest ms/cut\tinsertChain ms/read\tgridCandidates ms/read\trestore ms/read\tGC ms/cut',
    ...rows.map((r) => [r.w, r.perCut.toFixed(1), r.save.toFixed(1), r.rest.toFixed(1), r.ins.toFixed(1), r.idx.toFixed(1), r.restore.toFixed(1), r.gc.toFixed(1)].join('\t')),
    ...GROWTH_KEYS.map((k) => `fit ${k}: ${fits[k].a.toFixed(1)} + ${fits[k].b.toFixed(2)} ms per window (first ${rows[0][k].toFixed(1)}, last ${rows[rows.length - 1][k].toFixed(1)}; fitted ${fits[k].first.toFixed(1)} → ${fits[k].last.toFixed(1)})`),
  ];
}
