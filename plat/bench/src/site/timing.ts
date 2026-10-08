// The site spike's stage times (M0-e-06; §12.1, §12.4, §12.10 R12-4 and R12-5, §16 M0 (e); C-0047, C-0080, C-0082,
// C-0084, C-0271). Each derivation's per-stage wall-clock is taken by the harness around the registered stage's run
// (compose.ts; never by model code). Two modes: `informative` — the times of an ordinary run, folded to per-stage p50s
// and never judged (no timing batch stamped them: `judge` is not asked, the verdict is `requeue`); and `timing-phase` —
// one M0-f-01 batch per fixture and configuration (`timeBatch`: idle, calibrate before and after, the detector through
// it, the host and the measured authority stamped), the seeds derived serially in this thread (pool size 0), its figure
// the p50 over the seeds of S1 + S4 + S6, judged against R12-5's row only when AUTHORITATIVE (C-0047; M0-t-01 runs it
// in wave T), with R12-4's rows — the p50 of S1, the S3 slice, S4 and S6 with the fields — reported beside it (C-0084),
// and §12.4's hydrology row (`HYDROLOGY_ROW`) timed on the run's terrain before the carve.
import type { Terrain } from '@plat/model';
import { HYDROLOGY_ROW, hydroGridOver, hydrology, hydroParams, rasterGeom, type HydrologyRowRecord } from '@plat/site';
import { tableView, type BaseRung } from '@plat/tables';
import { judge, timeBatch, type Judgement, type RegisterRow, type TimeBatchOptions, type TimingResult } from '../timing/harness.js';
import { deriveSpike, GATE_STAGES, SPIKE_STAGES, type SpikeConfig, type SpikeDerivation } from './compose.js';
import type { SiteFixture, SpikeSize } from './fixtures.js';
import { quantiles } from './report.js';

/** §12.10 R12-5: the site gate (§12.4: S1 + S4 + S6 ≤ 50 ms at CITY, the p50 over the seeds). */
export const SITE_GATE_ROW: RegisterRow = Object.freeze({
  row: 'R12-5',
  budget: 50,
  unit: 'ms',
  measuredAt: "the timing phase (M0-t-01), CITY, Node and Chromium's worker (C-0082), on the site spike's fixtures",
  pass: 'S1 + S4 + S6 ≤ 50 ms at CITY (p50 over the seeds)',
  changeOnMiss: 'raster cells coarsen one step — fields and the margin 32 → 48 m; hydrology 25 → 32 m at CITY — and the spike re-runs (T-fix, T2; C-0080)',
});

/** §12.10 R12-4's rows this spike measures (C-0084): reported, never gated; an exceeding p50 restated by M0-x-01. */
export const R12_4_ROWS: readonly { readonly stage: string; readonly figureMs: number; readonly row: string }[] = Object.freeze([
  Object.freeze({ stage: 'S1', figureMs: 25, row: '§12.4 S1 site' }),
  Object.freeze({ stage: 'S3', figureMs: 11, row: "§12.4 S2 / S3 (the slice's ≈ 11 ms of the 16 ms row)" }),
  Object.freeze({ stage: 'S4', figureMs: 10, row: '§12.4 S4 backbone' }),
  Object.freeze({ stage: 'S6', figureMs: 17, row: '§12.4 S6 districts + fields' }),
]);

/** One derivation's stage times (ms, by stage name). */
export type StageTimes = Readonly<Record<string, number>>;

/** A derivation's times as the harness took them. */
export function stageTimesOf(d: SpikeDerivation): StageTimes {
  const out: Record<string, number> = {};
  for (const s of SPIKE_STAGES) {
    const ms = d.capture.stageMs.get(s);
    if (ms !== undefined) out[s] = ms;
  }
  return out;
}

/** The gate's sum for one derivation (null unless all three gate stages ran). */
export function gateMs(t: StageTimes): number | null {
  let sum = 0;
  for (const s of GATE_STAGES) {
    const v = t[s];
    if (v === undefined) return null;
    sum += v;
  }
  return sum;
}

/** The timing block of one fixture and configuration. */
export interface TimingBlock {
  readonly fixture: string;
  readonly config: SpikeConfig;
  readonly mode: 'informative' | 'timing-phase';
  readonly runs: number;
  /** Per stage, the p50 of its times (ms) over the derivations that ran it. */
  readonly stageP50: Readonly<Record<string, number>>;
  /** The p50 over the derivations that reached S6 of S1 + S4 + S6 (ms); null when none did. */
  readonly gateP50: number | null;
  readonly gateRuns: number;
  /** R12-4's rows: each stage's p50 against its §12.4 figure (reported; exceeding → M0-x-01's restatement). */
  readonly r12_4: readonly { readonly stage: string; readonly row: string; readonly figureMs: number; readonly p50: number | null; readonly exceeds: boolean | null }[];
  /** M0-f-01's stamp (timing-phase mode), else null. */
  readonly stamp: TimingResult | null;
  /** R12-5's judgement of the stamp (requeue unless AUTHORITATIVE and measured); null in informative mode. */
  readonly judgement: Judgement | null;
  /** §12.4's hydrology row timed on the derivations' terrains (timing-phase mode), else null. */
  readonly hydrology: HydrologyRowRecord | null;
  /** Why a figure here is never a result: the informative mode's reason, or the stamp's reasons. */
  readonly note: string;
}

function p50(xs: readonly number[]): number | null {
  return xs.length === 0 ? null : quantiles(xs).p50;
}

/** Folds derivations' times into a block (no stamp). */
export function foldTimes(fixture: string, config: SpikeConfig, times: readonly StageTimes[], mode: TimingBlock['mode'], stamp: TimingResult | null = null, hydrologyRow: HydrologyRowRecord | null = null): TimingBlock {
  const stageP50: Record<string, number> = {};
  for (const s of SPIKE_STAGES) {
    const v = p50(times.map((t) => t[s]).filter((x): x is number => x !== undefined));
    if (v !== null) stageP50[s] = v;
  }
  const gates = times.map(gateMs).filter((x): x is number => x !== null);
  const g = p50(gates);
  const r12 = R12_4_ROWS.map((r) => {
    const v = stageP50[r.stage];
    return { stage: r.stage, row: r.row, figureMs: r.figureMs, p50: v ?? null, exceeds: v === undefined ? null : v > r.figureMs };
  });
  const judgement = stamp === null ? null : judge(stamp, SITE_GATE_ROW);
  return {
    fixture,
    config,
    mode,
    runs: times.length,
    stageP50,
    gateP50: g,
    gateRuns: gates.length,
    r12_4: r12,
    stamp,
    judgement,
    hydrology: hydrologyRow,
    note:
      judgement === null
        ? 'informative: taken outside a timing batch (no idle, no calibrate, no detector) — CONTENDED by C-0047, never judged'
        : judgement.verdict === 'requeue'
          ? `timing-phase batch, re-queued, never judged: ${judgement.reason}`
          : `timing-phase batch, authoritative and measured: ${judgement.verdict} (${judgement.reason})`,
  };
}

/** §12.4's hydrology row on a derivation's terrain before the carve: the unit `hydrology(terrain, grid, lake)` timed (ms). */
export function timeHydrology(d: SpikeDerivation, coarse: boolean): { ms: number; cellCm: number; cells: number } | null {
  const terrain = d.model.data.get('terrain') as Terrain | undefined;
  const before = d.capture.preHeights;
  if (terrain === undefined || before === null) return null;
  const rung = d.blueprint.size.rung as BaseRung;
  const p = hydroParams(tableView(), rung);
  const t: Terrain = { ...terrain, heightCm: Int32Array.from(before) };
  const grid = hydroGridOver(rasterGeom(t), coarse ? p.hydroCoarseCellCm : p.hydroCellCm);
  const t0 = process.hrtime.bigint();
  hydrology(t, grid, p.lakeThresholdCm);
  const t1 = process.hrtime.bigint();
  return { ms: Number(t1 - t0) / 1e6, cellCm: grid.cellCm, cells: grid.cols * grid.rows };
}

/**
 * One timing-phase batch (M0-f-01's `timeBatch`): the fixture's seeds derived serially under the configuration, each
 * stage timed by the harness, §12.4's hydrology row timed on each terrain; the batch's figure the gate's p50 (ms).
 */
export async function timeSpike(fixture: SiteFixture, config: SpikeConfig, seeds: readonly number[], size: SpikeSize, batch: TimeBatchOptions = {}): Promise<TimingBlock> {
  const times: StageTimes[] = [];
  const hyd: { ms: number; cellCm: number; cells: number }[] = [];
  const stamp = await timeBatch(
    () => {
      times.length = 0;
      hyd.length = 0;
      for (const seed of seeds) {
        const d = deriveSpike(fixture, seed, config, size);
        times.push(stageTimesOf(d));
        const h = timeHydrology(d, config === 'coarse');
        if (h !== null) hyd.push(h);
      }
      const g = p50(times.map(gateMs).filter((x): x is number => x !== null));
      return { value: g ?? Number.NaN, unit: 'ms' as const };
    },
    { label: `site spike: ${fixture.name} (${config}), ${String(seeds.length)} seeds, S1 + S4 + S6 p50`, ...batch },
  );
  const row: HydrologyRowRecord | null =
    hyd.length === 0
      ? null
      : { row: HYDROLOGY_ROW.row, rung: fixture.blueprint.size.rung as BaseRung, cellCm: hyd[0].cellCm, cells: hyd[0].cells, ms: quantiles(hyd.map((h) => h.ms)).p50, authority: stamp.authority };
  return foldTimes(fixture.name, config, times, 'timing-phase', stamp, row);
}
