// The readers (M0-x-05): what a run's records left, counted under the registry's leaf keys (`leafOf`: stage, ladder,
// code). One reader per stage record, applied alike to a rung's fixture, to the plain controls and to the plain flat
// fixture, so "the code appears exactly where its fixture forces it" is one count read three ways. A rung is counted
// where it TOOK: a cut a rung made (outcome `cut` or `slit`), a block it stood (`d`), a rung line `held`, a ladder use
// the stage reported, a `work_cut` record, W_CUT_SLID's count.
import type { S3Slice, S4Output, S5cRecord, S5dRecord, S6Output, S8Output, GrowthState, WallRung, PipelineModel, GenerationReport } from '@plat/layout';
import type { RiverReport } from '@plat/site';
import type { Leaves } from './types.js';

/** A mutable tally of leaves. */
export type Tally = Record<string, number>;

/**
 * The reserved leaf a fixture run's `bugs` entries are counted under (§5.1 (8), §13.1 *`bugs` empty*; hardening round
 * S1, notes row 2): never a registry leaf (those read `stage ladder code`), absent when the run left no bug, so a clean
 * run's leaves are its rungs alone; `stageLadderCoverage()` carries it per fixture and fails a row whose run left one.
 */
export const BUGS_LEAF = 'bugs';

export function bump(t: Tally, leaf: string, by = 1): void {
  if (by === 0) return;
  t[leaf] = (t[leaf] ?? 0) + by;
}

/** Sums tallies into a fresh record, its keys in name order. */
export function sumLeaves(...ts: readonly Leaves[]): Leaves {
  const out: Tally = {};
  for (const t of ts) for (const k of Object.keys(t)) bump(out, k, t[k]);
  const sorted: Tally = {};
  for (const k of Object.keys(out).sort()) sorted[k] = out[k];
  return sorted;
}

/** S1: the RiverStrategy's report — F-RIVER's rungs by name, F-WORK's `work_cut` (hydrology coarsened). */
export function readRiver(t: Tally, report: RiverReport | null | undefined): void {
  if (report === null || report === undefined) return;
  for (const u of report.ladderUses) {
    if (u.cause === 'F-RIVER') bump(t, `S1 F-RIVER ${u.name}`);
    else if (u.cause === 'F-WORK' && u.code === 'work_cut') bump(t, 'S1 F-WORK work_cut');
  }
}

/** S3's slice: F-WALL's gate rungs (`gateRungs`), F-WORK's `work_cut` on a gate route (`report.unserved`). */
export function readSlice(t: Tally, slice: S3Slice | null | undefined): void {
  if (slice === null || slice === undefined) return;
  for (const r of slice.report.gateRungs) if (r.rung === 'redraw' || r.rung === 'drop') bump(t, `S3 F-WALL ${r.rung}`);
  for (const u of slice.report.unserved) if (u.code === 'work_cut') bump(t, 'S3 F-WORK work_cut');
}

/** A trace's F-WALL rungs (S3's, and S5a's at k ≥ 2): each rung that held. */
export function readTrace(t: Tally, rungs: readonly WallRung[] | null | undefined): void {
  for (const r of rungs ?? []) if (r.held) bump(t, `S3/S5a trace F-WALL ${r.rung}`);
}

/** S4 (and S5b's router, which shares its ladder): F-ROUTE's rungs that held; route.nodes' `work_cut`. */
export function readRoutes(t: Tally, rungs: readonly { readonly rung: string; readonly held: boolean }[] | null | undefined): void {
  for (const r of rungs ?? []) {
    if (!r.held) continue;
    if (r.rung === 'work_cut') bump(t, 'S4/S5b F-WORK work_cut');
    else bump(t, `S4/S5b F-ROUTE ${r.rung}`);
  }
}

/** S4's output. */
export function readS4(t: Tally, s4: S4Output | null | undefined): void {
  readRoutes(t, s4?.report.rungs);
}

/** S5c's records: F-NUM's re-propose and reject, F-WORK's `work_cut`. */
export function readGrowth(t: Tally, recs: readonly S5cRecord[] | null | undefined): void {
  for (const rec of recs ?? []) {
    for (const r of rec.rungs) {
      if (r.cause === 'F-NUM') bump(t, `S5c F-NUM ${r.rung}`);
      else if (r.cause === 'F-WORK') bump(t, 'S5c F-WORK work_cut');
    }
  }
}

/** S5d's records: F-BUDGET-STAGE's top-up and accepted shortfall. */
export function readCapacity(t: Tally, recs: readonly S5dRecord[] | null | undefined): void {
  for (const rec of recs ?? []) for (const r of rec.rungs) bump(t, `S5d F-BUDGET-STAGE ${r.rung}`);
}

/** S5's growth state: S5b's router rungs and S5a's traces at k ≥ 2. */
export function readGrowthState(t: Tally, state: GrowthState | null | undefined): void {
  if (state === null || state === undefined) return;
  readRoutes(t, state.report.rungs);
  for (const st of state.stages) readTrace(t, st.trace?.traced.report.rungs);
}

/** S6: the grower's `work_cut` (the leftover rule). */
export function readS6(t: Tally, s6: S6Output | null | undefined): void {
  if (s6?.report.workCut !== null && s6?.report.workCut !== undefined) bump(t, 'S6 F-WORK work_cut');
}

/** S6's second half: the fields' `work_cut`. */
export function readFields(t: Tally, fields: { readonly report: { readonly workCut: unknown } } | null | undefined): void {
  if (fields !== null && fields !== undefined && fields.report.workCut !== null && fields.report.workCut !== undefined) bump(t, 'S6 fields F-WORK work_cut');
}

/**
 * S8: F-CUT's rungs where they took, W_CUT_SLID's count (§4.6 step 8 (c): "reported as `W_CUT_SLID` with its step
 * count", so the leaf counts slide steps, not slid cuts — `LEAF_UNITS`), F-WORK's `work_cut` records.
 */
export function readS8(t: Tally, out: Pick<S8Output, 'infill'> | null | undefined): void {
  if (out === null || out === undefined) return;
  for (const d of out.infill.report.districts) {
    for (const r of d.rungs) {
      const took = r.outcome === 'cut' || r.outcome === 'slit';
      if (r.rung === 'pre' && took) bump(t, 'S8 F-CUT pre');
      else if (r.rung === 'antenna' && took) bump(t, 'S8 F-CUT antenna');
      else if (r.rung === 'a' && r.attempt >= 1 && took) bump(t, 'S8 F-CUT a@attempt>=1');
      else if (r.rung === 'b' && took) bump(t, 'S8 F-CUT b');
      else if (r.rung === 'd' && r.outcome === 'block') bump(t, 'S8 F-CUT d');
    }
    bump(t, 'S8 F-CUT W_CUT_SLID', d.warnings['W_CUT_SLID'] ?? 0);
    bump(t, 'S8 F-WORK work_cut', d.workCut.length);
  }
}

/** Every stage record a chain (or runBase) model holds, read into one tally. */
export function readModel(model: Pick<PipelineModel, 'data'>): Leaves {
  const t: Tally = {};
  const d = model.data;
  readRiver(t, (d.get('s1') as { river?: RiverReport | null } | undefined)?.river ?? null);
  readSlice(t, d.get('s3.slice') as S3Slice | undefined);
  readTrace(t, (d.get('s3.commit') as { traced?: { report: { rungs: readonly WallRung[] } } } | undefined)?.traced?.report.rungs);
  readS4(t, d.get('s4') as S4Output | undefined);
  readGrowthState(t, d.get('s5.growth') as GrowthState | undefined);
  const s5 = d.get('s5') as { growth?: readonly S5cRecord[]; capacity?: readonly S5dRecord[] } | undefined;
  readGrowth(t, s5?.growth);
  readCapacity(t, s5?.capacity);
  readS6(t, d.get('s6') as S6Output | undefined);
  readFields(t, d.get('fields') as { report: { workCut: unknown } } | undefined);
  if (d.has('infill')) readS8(t, { infill: d.get('infill') as S8Output['infill'] });
  return sumLeaves(t);
}

/**
 * A chain (or runBase) run's leaves with its bugs (hardening round S1, notes row 2): `readModel` over its records and the
 * report's `bugs` entries counted under `BUGS_LEAF` — absent when there are none.
 */
export function readRun(run: { readonly model: Pick<PipelineModel, 'data'>; readonly report: Pick<GenerationReport, 'bugs'> }): Leaves {
  const t: Tally = { ...readModel(run.model) };
  bump(t, BUGS_LEAF, run.report.bugs.length);
  return sumLeaves(t);
}

/** The report's S8 stage warnings (W_CUT_SLID reaches the generation report through the stage's sink). */
export function reportWarnings(report: GenerationReport, stage: string): Readonly<Record<string, number>> {
  return report.stages.find((s) => s.name === stage)?.warnings ?? {};
}
