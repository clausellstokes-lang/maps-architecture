// The fusion gate's time clause, its harness and record shape only (M0-c-06; §4.4's gate "S4 + S5 + S8 ≤ 100 ms at
// CITY", §16 M0 (c), §12.1, §12.4, R12-4; C-0025, C-0047, C-0080, C-0082, C-0084, C-0097). The timing is the timing
// phase's (M0-t-00's script run alone by M0-t-01): this file gives it the workload and the stamped record — the fusion
// run (a) on `seeds` seeds inside M0-f-01's `timeBatch` (after 30 s idle, calibrate before and after, the detector
// through it), the workload's own figure the median over the seeds of S4 + S5 + S8 (the runner's stage stamps), the
// per-stage p50 of the S3 slice, S4, S5 and S8 beside it (R12-4) — and judges it with M0-f-01's `judge`, which answers
// `requeue` for every CONTENDED result: a timing taken here is never the gate's result. The Chromium-worker figure is
// M0-d-06's runner's (C-0082), taken by M0-t-00's script.
import { judge, timeBatch, type Judgement, type RegisterRow, type TimeBatchOptions, type TimingResult } from '../timing/harness.js';
import { quantiles, type Quantiles } from './report.js';
import { derive, type FixtureSize } from './runs.js';

/** The gate's register row (§4.4; §16 M0 (c)): its budget, where it is measured, and the pre-decided change on a miss. */
export const GATE_ROW: RegisterRow = Object.freeze({
  row: 'fusion gate S4 + S5 + S8 (§4.4, §16 M0 (c))',
  budget: 100,
  unit: 'ms',
  measuredAt: 'M0-t-01, timing phase: Node 24 and Chromium\'s worker on the same seeds (C-0082)',
  pass: 'the median S4 + S5 + S8 over the seeds ≤ 100 ms at CITY, normalised by the calibrate score',
  changeOnMiss: 'extramural growth stops at secondary (lanesInfillOnly, regimes.json settings) in a T-fix round and the gate re-runs in T2 (§4.4; C-0080)',
});

/** R12-4's rows this harness's stamps give (§12.4; C-0084): the stage and its §12.4 p50. */
export const R12_4_ROWS = Object.freeze([
  { stage: 'S3', figureMs: 11, note: "the S3 slice: ≈ 11 ms of §12.4's 16 ms S2 / S3 row (the gate-route solves ≈ 7 ms, T with the level set, gates and trace ≈ 4 ms)" },
  { stage: 'S4', figureMs: 10, note: '§12.4 S4' },
  { stage: 'S5', figureMs: 40, note: '§12.4 S5' },
  { stage: 'S8', figureMs: 20, note: '§12.4 S8' },
] as const);

/** The timing record: the stamped result, its judgement, and the per-stage p50 the same batch measured. */
export interface FusionTiming {
  readonly result: TimingResult;
  readonly judgement: Judgement;
  readonly seeds: readonly number[];
  readonly gateMs: Quantiles;
  readonly stages: Readonly<Record<string, Quantiles>>;
  readonly r12_4: readonly { readonly stage: string; readonly figureMs: number; readonly p50: number; readonly exceeds: boolean }[];
}

/** Options: the seeds, the size (a test's), the harness's own options (a test's built readings). */
export interface FusionTimingOptions extends FixtureSize {
  readonly seeds: readonly number[];
  readonly batch?: TimeBatchOptions;
}

/** Times the fusion run (a) on the seeds in one stamped batch (see the module comment). */
export async function timeFusionGate(opts: FusionTimingOptions): Promise<FusionTiming> {
  const per: Record<string, number[]> = {};
  const gate: number[] = [];
  const size = { ...(opts.frameHa === undefined ? {} : { frameHa: opts.frameHa }), ...(opts.walledHa === undefined ? {} : { walledHa: opts.walledHa }) };
  const result = await timeBatch(
    () => {
      for (const seed of opts.seeds) {
        const d = derive('fusion', seed, size);
        const st = d.ins.stamps;
        for (const [stage, ms] of st) (per[stage] ??= []).push(ms);
        gate.push((st.get('S4') ?? 0) + (st.get('S5') ?? 0) + (st.get('S8') ?? 0));
      }
      const q = quantiles(gate);
      return { value: q.p50, unit: 'ms' as const };
    },
    { label: 'fusion gate S4 + S5 + S8', unit: 'ms', ...(opts.batch ?? {}) },
  );
  const stages: Record<string, Quantiles> = {};
  for (const s of Object.keys(per).sort()) stages[s] = quantiles(per[s]);
  return {
    result,
    judgement: judge(result, GATE_ROW),
    seeds: [...opts.seeds],
    gateMs: quantiles(gate),
    stages,
    r12_4: R12_4_ROWS.map((r) => {
      const p50 = stages[r.stage]?.p50 ?? Number.NaN;
      return { stage: r.stage, figureMs: r.figureMs, p50, exceeds: p50 > r.figureMs };
    }),
  };
}
