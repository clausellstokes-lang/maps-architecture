// The gate re-run (M0-c-07; §4.4's statistics fallback: "the infill constants are recalibrated … and the gate re-runs"
// before M1; §16 M0 (c); C-0117; N-03). The gate is re-run THROUGH M0-c-06's exported entry — `run` of
// bench/src/fusion/, the dispatcher's `bench -- fusion` — with the seeds and the size given, never with --summary (N-03:
// M0-c-06's summary is written only behind its own flag; the re-run's report and stamps go to the output folder). Its
// FusionGateReport, as the entry delivers it, is the re-run's record: its report shape reproduced, never a copy of its
// stages or of its measure. The tables the re-run's process loaded are recorded by version and pinning hash: the tables
// are compiled into @plat/tables, so a recalibration takes effect in a process started after it was applied (--apply),
// and `recalibrationInEffect` says whether the loaded versions are the ones the recalibration wrote.
import { loadTable } from '@plat/tables';
import { hash128Hex } from '@plat/testkit';
import { run as fusionEntry, type FusionGateReport } from '../fusion/index.js';
import { addTotalsCensus, censusOf, type CensusTally } from './census.js';
import type { GateRerun, RefusalCensusReport, RunSize } from './report.js';
import type { WrittenTable } from '../bentcut-ng/index.js';

/** The tables a re-run's statistics rest on (S8's cut constants and the band table; the granularity and interior rows). */
export const GATE_TABLES = Object.freeze(['cut', 'bands', 'granularity', 'interior']);

/** The tables loaded in this process, by version and pinning hash. */
export function tablesLoaded(ids: readonly string[] = GATE_TABLES): Record<string, { version: number; hash: string }> {
  const out: Record<string, { version: number; hash: string }> = {};
  for (const id of ids) {
    const t = loadTable(id);
    out[id] = { version: t.version, hash: hash128Hex(t.hash) };
  }
  return out;
}

/** The entry's arguments for a re-run: the seeds from `from`, both runs, the workers, the size (never --summary). */
export function gateArgs(from: number, seeds: number, size: RunSize, workers = 1): string[] {
  return ['--from', String(from), '--seeds', String(seeds), '--workers', String(workers), ...(size.frameHa === null ? [] : ['--frame-ha', String(size.frameHa), '--walled-ha', String(size.walledHa ?? 0)])];
}

/** M0-c-06's report without its per-seed tables (their count kept): the shape the re-run record carries. */
export function reportShape(r: FusionGateReport): GateRerun['report'] {
  return { ...r, runs: r.runs.map(({ perSeed, ...rest }) => ({ ...rest, seedRows: perSeed.length })) };
}

/** The re-run's census (J264): each run's refusal totals from M0-c-06's fold. */
export function gateCensus(r: FusionGateReport): RefusalCensusReport {
  const t: CensusTally = new Map();
  for (const s of r.runs) addTotalsCensus(t, `gate re-run: the ${s.run} run (M0-c-06's census)`, s.refusals.total, s.perSeed.map((x) => x.seed));
  return censusOf(t);
}

/**
 * Re-runs the gate through M0-c-06's entry into `out` (its report.json and stamps.json under `out`/fusion/); returns
 * the record and the census. `runner` reaches M0-c-06's own test seam (a planted record per task) for this item's
 * entry tests; the harness passes none. A re-run that delivers no report (exit 64) is a stop, never a pass.
 */
export async function gateRerun(opts: { from: number; seeds: number; size: RunSize; out: string; workers?: number; recalibrated?: readonly WrittenTable[]; runner?: Parameters<typeof fusionEntry>[1]['runTask'] }): Promise<{ gate: GateRerun; census: RefusalCensusReport }> {
  const args = gateArgs(opts.from, opts.seeds, opts.size, opts.workers ?? 1);
  let got: FusionGateReport | undefined;
  const exit = await fusionEntry(args, { out: opts.out, onReport: (r) => (got = r), ...(opts.runner === undefined ? {} : { runTask: opts.runner }) });
  if (got === undefined) throw new Error(`fusion-ng: the gate re-run delivered no report (bench -- fusion ${args.join(' ')}: exit ${String(exit)})`);
  const report: FusionGateReport = got;
  const tables = tablesLoaded();
  const recal = opts.recalibrated ?? [];
  const inEffect = recal.length > 0 && recal.every((w) => tables[w.table]?.version === w.to);
  return { gate: { entry: 'bench -- fusion', args, exit, tables, recalibrationInEffect: inEffect, report: reportShape(report) }, census: gateCensus(report) };
}
