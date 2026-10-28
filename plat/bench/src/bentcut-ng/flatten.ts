// The cut.flattenM search (M0-b-05; §4.6 step 5: "`cut.flattenM` = 0.7 m … with the rule applied, one-bend streets make
// up 0.658 against the recorded 0.660 — and §16 M0 (b) calibrates it on NG's recorded faces (J-A37.01)"; §13.5's
// bent-cut row: "one bend on 739 of 1 125 streets"; C-0117: "the one-dimensional cut.flattenM search"). The row the
// search meets is NG's one-bend share on the same faces — the share of the recorded cuts of `ng-faces.json` with
// exactly one bend — since the cell decides exactly whether a corner is kept and M0-k-05's registry has no bend-share
// metric (the choices row of this item). The search runs our S8 on every face at each value of a fixed grid
// (default 0 – 2 m by 0.1 m; the cell's 0.7 m and the 0.59 m bound of M-1's E12 inside it), measures our one-bend share
// over the planner cuts the replay measured, and takes the grid value nearest the row (ties: the value nearer the
// table's current one, then the smaller). It is met when that value's share lies within max(0.01, two binomial
// standard errors of NG's share) of the row. The search draws nothing of its own, so the same faces, seeds and grid
// give the same result on every run.
import { loadTable } from '@plat/tables';
import type { NgFace } from '@plat/testkit';
import type { NgRecord, NgTask } from './ngruns.js';
import { runNgTasks } from './pool.js';

/** The row the search meets: NG's one-bend share over the recorded cuts of the faces. */
export interface BendRow {
  readonly metric: 'cut.oneBendShare';
  readonly value: number;
  /** NG's recorded cuts counted, and those with one bend. */
  readonly n: number;
  readonly bent: number;
  readonly source: 'ng-faces.json: the recorded cuts of the same faces';
}

/** The grid of candidate values (m): lo, lo + step, …, up to hi. */
export interface FlattenGrid {
  readonly lo: number;
  readonly hi: number;
  readonly step: number;
}

export const DEFAULT_GRID: FlattenGrid = Object.freeze({ lo: 0, hi: 2, step: 0.1 });
/** The most grid values a search may run. */
export const MAX_GRID = 201;

/** One candidate's measurement. */
export interface FlattenCandidate {
  readonly flattenM: number;
  readonly cuts: number;
  readonly bent: number;
  readonly share: number | null;
  readonly delta: number | null;
}

/** The search's result: the value it chose, the row it met (or missed), and every candidate. */
export interface FlattenResult {
  readonly row: BendRow;
  readonly grid: FlattenGrid;
  readonly current: number;
  readonly flattenM: number | null;
  readonly ours: number | null;
  readonly delta: number | null;
  readonly tolerance: number;
  readonly verdict: 'met' | 'notMet';
  readonly candidates: readonly FlattenCandidate[];
}

/** NG's one-bend share over the faces' recorded cuts (§13.5's "one bend on … streets"). */
export function bendRowOf(faces: readonly NgFace[]): BendRow {
  let n = 0;
  let bent = 0;
  for (const f of faces) {
    for (const c of f.cuts) {
      n += 1;
      if (c.bends === 1) bent += 1;
    }
  }
  return { metric: 'cut.oneBendShare', value: n === 0 ? 0 : bent / n, n, bent, source: 'ng-faces.json: the recorded cuts of the same faces' };
}

/** The grid's values, each rounded to a micrometre so no float residue reaches a table cell; a message when refused. */
export function gridValues(g: FlattenGrid): number[] | string {
  if (!(Number.isFinite(g.lo) && Number.isFinite(g.hi) && Number.isFinite(g.step))) return 'the flattenM grid holds a non-finite number';
  if (!(g.lo >= 0 && g.hi >= g.lo && g.step > 0)) return 'the flattenM grid needs 0 ≤ lo ≤ hi and step > 0';
  const n = Math.floor((g.hi - g.lo) / g.step + 1e-9) + 1;
  if (n > MAX_GRID) return `the flattenM grid has ${String(n)} values, more than ${String(MAX_GRID)}`;
  return Array.from({ length: n }, (_, i) => Math.round((g.lo + i * g.step) * 1e6) / 1e6);
}

/** The tolerance the row is met within: max(0.01, 2 √(p (1 − p) / n)). */
export function bendTolerance(row: BendRow): number {
  const se = row.n > 0 ? Math.sqrt((row.value * (1 - row.value)) / row.n) : 0;
  return Math.max(0.01, 2 * se);
}

/** The search's fold over every candidate's records (grid order, then task order). */
export function flattenFold(row: BendRow, grid: FlattenGrid, values: readonly number[], records: readonly (readonly NgRecord[])[], current: number): FlattenResult {
  const candidates: FlattenCandidate[] = values.map((v, i) => {
    let cuts = 0;
    let bent = 0;
    for (const r of records[i]) {
      for (const c of r.cuts) {
        cuts += 1;
        if (c.bends === 1) bent += 1;
      }
    }
    const share = cuts === 0 ? null : bent / cuts;
    return { flattenM: v, cuts, bent, share, delta: share === null ? null : share - row.value };
  });
  let best: FlattenCandidate | null = null;
  for (const c of candidates) {
    if (c.delta === null) continue;
    if (best === null || best.delta === null) {
      best = c;
      continue;
    }
    const a = Math.abs(c.delta);
    const b = Math.abs(best.delta);
    if (a < b || (a === b && (Math.abs(c.flattenM - current) < Math.abs(best.flattenM - current) || (Math.abs(c.flattenM - current) === Math.abs(best.flattenM - current) && c.flattenM < best.flattenM)))) best = c;
  }
  const tolerance = bendTolerance(row);
  const met = best !== null && best.delta !== null && row.n > 0 && Math.abs(best.delta) <= tolerance;
  return { row, grid, current, flattenM: best?.flattenM ?? null, ours: best?.share ?? null, delta: best?.delta ?? null, tolerance, verdict: met ? 'met' : 'notMet', candidates };
}

/** The search's options: the run's seed, its derivation seeds per face, the grid, the workers and a test's runner. */
export interface FlattenOptions {
  readonly seed: number;
  readonly seeds?: number;
  readonly grid?: FlattenGrid;
  readonly workers?: number;
  readonly runner?: (t: NgTask) => NgRecord;
}

/**
 * flattenSearch(faces, row): the one-dimensional search over the cut.flattenM cell (see the module comment), its
 * chosen value and its verdict against the row, with every candidate's measurement.
 */
export async function flattenSearch(faces: readonly NgFace[], row: BendRow, opts: FlattenOptions): Promise<FlattenResult> {
  const grid = opts.grid ?? DEFAULT_GRID;
  const values = gridValues(grid);
  if (typeof values === 'string') throw new RangeError(`flattenSearch: ${values}`);
  const seeds = opts.seeds ?? 1;
  const current = loadTable('cut').num('settings', 'flattenM');
  const records: NgRecord[][] = [];
  for (const v of values) {
    const tasks: NgTask[] = [];
    for (let s = 0; s < seeds; s += 1) for (const face of faces) tasks.push({ face, seed: opts.seed, seedIndex: s, flattenM: v, bars: false });
    records.push(await runNgTasks(tasks, opts.workers ?? 1, 4, undefined, opts.runner));
  }
  return flattenFold(row, grid, values, records, current);
}
