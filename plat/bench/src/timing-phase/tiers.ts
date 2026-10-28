// The tiers' budgets under C-0097's protocol (M0-t-00; §13.8, §12.1; C-0027, C-0088, C-0097, C-0103, C-0121), through
// M0-f-02a's runner — never a second copy of its batching, its 30 s idle or its drift re-run:
//   tier:pr        the GATING figure in the runner's batched mode (each declared unit a ≤ 60 s batch after 30 s idle,
//                  calibrate before and after within 5 %, a drifting batch re-run at most twice then `throttled`, a unit
//                  over 60 s `long-batch`, the batches' wall-clock summed with the CPU time beside it), then ONE whole run
//                  reported beside it (§13.8's literal figure);
//   tier:nightly,  each run ONCE whole (30 s idle first, calibrate before and after); an after-score more than 5 % off
//   tier:milestone repeats the run once — two runs at most — and a second drift records the tier `throttled` with both
//                  runs' scores; their 16-core verdicts projected (CPU ÷ 16), never gating at M0 (C-0027).
// The detector samples every 30 s through every run (this script's own sampler beside the runner's, so every record
// holds its samples; the runs' child processes are the phase's own, C-0103), a job pending at T is listed with its
// reason and never run or timed (C-0121), and no tier runs the timing phase (C-0088: the runner refuses such a unit; the
// record says whether a manifest held one).
import { join } from 'node:path';
import { readReferenceScore, REFERENCE_SCORE_PATH } from '../host/index.js';
import { manifest as realManifest } from '../tier-jobs/index.js';
import { spawnExecutor } from '../tiers/exec.js';
import { runTier as realRunTier, type RunTierOptions } from '../tiers/runner.js';
import type { BatchRecord, BudgetRecord, Executor, PendingRecord, TierManifest, TierMode, TierName, TierReport } from '../tiers/types.js';
import { DRIFT_LIMIT, judgeContention, type MachineSample } from '../timing/contention.js';
import { IDLE_MS, MAX_BATCH_MS } from '../timing/harness.js';
import { SAMPLE_EVERY_MS, startSampler, type Sampler } from '../timing/sampler.js';

/** One detector sample as a record keeps it. */
export interface DetectorSample {
  readonly at: string;
  readonly authority: 'authoritative' | 'contended';
  readonly reasons: readonly string[];
  readonly loadAverage: number;
  readonly power: string;
  readonly processes: number;
}

/** One run of a tier. */
export interface TierRunRecord {
  readonly mode: TierMode;
  readonly wallMs: number;
  readonly cpuMs: number;
  readonly elapsedMs: number;
  readonly calibration: TierReport['calibration'];
  readonly authority: TierReport['authority'];
  readonly readings: TierReport['readings'];
  readonly reasons: readonly string[];
  readonly normalisation: number | null;
  readonly budget: BudgetRecord;
  readonly verdict: TierReport['verdict'];
  readonly batches: readonly BatchRecord[];
  /** Batches over 60 s not flagged `long-batch`, and drifting batches not flagged `throttled` (both 0 by the runner). */
  readonly batchChecks: { readonly longUnflagged: number; readonly driftUnflagged: number; readonly longBatches: number; readonly throttledBatches: number };
  readonly failed: readonly string[];
  /** The detector's samples through the run (every SAMPLE_EVERY_MS). */
  readonly samples: readonly DetectorSample[];
  readonly sampleEveryMs: number;
}

/** One tier's record. */
export interface TierRecord {
  readonly tier: TierName;
  readonly projected: boolean;
  readonly budgetMs: number;
  readonly cores: number;
  /** PR: the batched run then the whole run; nightly and milestone: one or two whole runs. */
  readonly runs: readonly TierRunRecord[];
  /** A projected tier whose two runs both drifted more than 5 % (C-0097: never a loop). */
  readonly throttled: boolean;
  /** Pending jobs (after-M-1, C-0121): listed with their reason, in no batch, never timed. */
  readonly pending: readonly PendingRecord[];
  readonly notBuilt: readonly { readonly name: string; readonly status: string }[];
  /** What the gating figure covers (C-0121: the sum over the built jobs, pending ones named). */
  readonly covers: string;
  /** Whether any job of the tier would run the timing phase or a tier (C-0088): such a unit is refused by the runner. */
  readonly timingPhaseInside: boolean;
  readonly refusedJobs: readonly string[];
}

/** What the tiers need from the script. */
export interface TierContext {
  readonly root: string;
  readonly out: string;
  readonly manifest?: (tier: TierName, root: string) => TierManifest;
  readonly runTier?: (m: TierManifest, opts: RunTierOptions) => Promise<TierReport>;
  /** The runner's seams (the tests' executor and readings); the script itself passes none of the readings. */
  readonly options?: Partial<RunTierOptions>;
  readonly sleep: (ms: number) => Promise<void>;
  readonly watch?: (everyMs: number) => Promise<Sampler>;
  readonly referenceScorePath?: string;
  readonly log?: (line: string) => void;
}

/** The tiers in the order they are timed. */
export const TIERS: readonly TierName[] = ['pr', 'nightly', 'milestone'];

function judged(s: MachineSample, own: readonly number[], referenceScore: number | null): DetectorSample {
  const r = judgeContention(s, { ownPids: own, referenceScore, checkLoad: false, readings: 'measured' });
  return { at: s.at, authority: r.authority, reasons: r.reasons, loadAverage: s.loadAverage, power: s.power, processes: s.processes.length };
}

/** One run of a tier: the idle wait (whole mode), the watch, the runner, the samples. */
async function runOnce(c: TierContext, m: TierManifest, mode: TierMode, n: number): Promise<{ record: TierRunRecord; report: TierReport }> {
  const own: number[] = [];
  const base: Executor = c.options?.exec ?? spawnExecutor;
  const exec: Executor = (unit, ctx) =>
    base(unit, {
      ...ctx,
      onSpawn: (pid) => {
        own.push(pid);
        ctx.onSpawn?.(pid);
      },
    });
  // the batched mode's batches each wait their own 30 s inside timeBatch; a whole run waits once before it (§12.1)
  if (mode === 'whole') await c.sleep(IDLE_MS);
  const watch = await (c.watch ?? ((ms: number) => startSampler({ everyMs: ms })))(SAMPLE_EVERY_MS);
  let report: TierReport;
  try {
    report = await (c.runTier ?? realRunTier)(m, { ...c.options, root: c.root, out: join(c.out, 'tiers', m.tier, `${mode}-${String(n)}`), mode, exec, log: c.log });
  } catch (e) {
    await watch.stop().catch(() => undefined);
    throw e;
  }
  const raw = await watch.stop();
  let ref: number | null = null;
  try {
    ref = readReferenceScore(c.referenceScorePath ?? REFERENCE_SCORE_PATH).score;
  } catch {
    ref = null;
  }
  const samples = raw.map((s) => judged(s, own, ref));
  const longBatches = report.batches.filter((b) => b.flags.includes('long-batch')).length;
  const record: TierRunRecord = {
    mode,
    wallMs: report.wallMs,
    cpuMs: report.cpuMs,
    elapsedMs: report.elapsedMs,
    calibration: report.calibration,
    authority: report.authority,
    readings: report.readings,
    reasons: report.reasons,
    normalisation: report.normalisation,
    budget: report.budget,
    verdict: report.verdict,
    batches: report.batches,
    batchChecks: {
      longUnflagged: report.batches.filter((b) => b.wallMs > MAX_BATCH_MS && !b.flags.includes('long-batch')).length,
      driftUnflagged: report.batches.filter((b) => b.calibration.drift > DRIFT_LIMIT && !b.flags.includes('throttled')).length,
      longBatches,
      throttledBatches: report.batches.filter((b) => b.flags.includes('throttled')).length,
    },
    failed: report.jobs.filter((j) => j.outcome === 'fail').map((j) => `${j.name}: ${j.reason ?? ''}`),
    samples,
    sampleEveryMs: SAMPLE_EVERY_MS,
  };
  return { record, report };
}

const nestedOf = (r: TierReport): string[] => r.jobs.filter((j) => /\(C-0088/.test(j.reason ?? '') || /^bench\/src\/(timing-phase|tiers)\//.test(j.source)).map((j) => j.name);

function tierRecord(m: TierManifest, runs: { record: TierRunRecord; report: TierReport }[], throttled: boolean): TierRecord {
  const last = runs[0].report;
  const refused = [...new Set(runs.flatMap((r) => nestedOf(r.report)))];
  return {
    tier: m.tier,
    projected: m.budget.projected,
    budgetMs: m.budget.ms,
    cores: m.budget.cores,
    runs: runs.map((r) => r.record),
    throttled,
    pending: last.pending,
    notBuilt: last.notBuilt,
    covers: last.covers,
    timingPhaseInside: refused.length > 0,
    refusedJobs: refused,
  };
}

/** Times the three tiers (or the ones asked for) by C-0097's protocol. */
export async function timeTiers(c: TierContext, tiers: readonly TierName[] = TIERS): Promise<TierRecord[]> {
  const out: TierRecord[] = [];
  for (const tier of tiers) {
    const m = (c.manifest ?? realManifest)(tier, c.root);
    if (!m.budget.projected) {
      // the gating figure: the batched run; then one whole run, reported (C-0097 (1))
      const batched = await runOnce(c, m, 'batched', 1);
      const whole = await runOnce(c, m, 'whole', 1);
      out.push(tierRecord(m, [batched, whole], false));
      continue;
    }
    // a projected tier: once whole, one repeat on a > 5 % drift, then throttled — never a loop (C-0097 (2))
    const runs = [await runOnce(c, m, 'whole', 1)];
    const drifted = (r: TierReport): boolean => r.calibration !== null && r.calibration.drift > DRIFT_LIMIT;
    if (drifted(runs[0].report)) runs.push(await runOnce(c, m, 'whole', 2));
    out.push(tierRecord(m, runs, runs.length === 2 && drifted(runs[1].report)));
  }
  return out;
}
