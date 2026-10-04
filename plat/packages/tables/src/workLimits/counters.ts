// The work-limit counters M0 names (M0.md §2.2; M0-work.json's `workLimitCounters`, the authority; C-0021) and the units
// a law counts over its batch scope (§5.1 (5)'s WorkUnit). M0-f-03a.
//
// `WORK_LIMIT_COUNTERS` is the set `workLimits.json` must hold a row for — each counter once, with the unit and the
// log2 form the list gives it; a counter an item adds beyond it is a further row of the same form, amended into
// M0-work.json's list by M0-f-03b (C-0021), which the loader admits and the list test pins (C-0174 (3)).
// The unit `fixed` is the list's for `warp.halvings` (§3.6's "at most 8 halvings"): its law counts nothing, so its
// limit is its floor (C-0174 (2)).
import type { WorkUnit } from '@plat/model';

/** §5.1 (5)'s WorkUnit at run time, in the design's order (§4.12 adds 'moduleCells'). */
export const WORK_UNITS = Object.freeze([
  'plots',
  'buildings',
  'households',
  'landHa',
  'frameCells',
  'latticeNodes',
  'faces',
  'vertices',
  'moduleCells',
] as const satisfies readonly WorkUnit[]);

/** The units a count may hold a fraction of (an area in hectares; a storey's piece area ÷ `moduleCm`²). */
export const CONTINUOUS_WORK_UNITS: ReadonlySet<WorkUnit> = new Set<WorkUnit>(['landHa', 'moduleCells']);

/** A row's unit: a WorkUnit, or `fixed` — a law that reads no count (M0.md §2.2's `warp.halvings`). */
export type TableWorkUnit = WorkUnit | 'fixed';

const UNIT_SET: ReadonlySet<string> = new Set<string>([...WORK_UNITS, 'fixed']);

/** Is `u` a WorkUnit or `fixed`? */
export function isTableWorkUnit(u: unknown): u is TableWorkUnit {
  return typeof u === 'string' && UNIT_SET.has(u);
}

/** One counter of the list: its name, the unit its law counts and whether the law takes the log2 form. */
export interface WorkLimitCounterSpec {
  readonly counter: string;
  readonly unit: TableWorkUnit;
  readonly log2?: true;
}

/** M0.md §2.2's seventeen counters, in its order. */
export const WORK_LIMIT_COUNTERS: readonly WorkLimitCounterSpec[] = Object.freeze(
  (
    [
      { counter: 'insert.points', unit: 'vertices' },
      { counter: 'insert.attractQueries', unit: 'vertices' },
      { counter: 'insert.placementCandidates', unit: 'vertices' },
      { counter: 'insert.crossings', unit: 'vertices' },
      { counter: 'tx.facesWalked', unit: 'faces' },
      { counter: 'skeleton.events', unit: 'vertices' },
      { counter: 'cut.kernelCalls', unit: 'faces' },
      { counter: 'cut.recursionDepth', unit: 'faces', log2: true },
      { counter: 'cut.candidates', unit: 'faces' },
      { counter: 'growth.proposals', unit: 'landHa' },
      { counter: 'growth.candidates', unit: 'landHa' },
      { counter: 'route.nodes', unit: 'latticeNodes' },
      { counter: 'grower.turns', unit: 'faces' },
      { counter: 'field.cells', unit: 'frameCells' },
      { counter: 'hydro.cells', unit: 'frameCells' },
      { counter: 'warp.halvings', unit: 'fixed' },
      { counter: 'index.rebuilds', unit: 'faces' },
    ] as const satisfies readonly WorkLimitCounterSpec[]
  ).map((s) => Object.freeze({ ...s })),
);
