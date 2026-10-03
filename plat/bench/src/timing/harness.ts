// The timing harness (§12.1's timing protocol; C-0025, C-0047, C-0075, C-0097's batch rule, C-0103's detector):
// a batch runs after 30 s idle, in at most 60 s, with bench/calibrate before and after it; a batch whose two scores
// differ by more than 5 % is re-run (at most twice, then flagged `throttled`); the detector samples the machine before
// the batch, every 30 s through it and after it; every result is stamped with the host, the MEASURED authority and its
// reasons, the normalisation (the batch's calibrate score ÷ the reference score) and the pool size. A contended result
// is re-queued by its caller, never judged (judge() answers `requeue`); while the reference score is null every result
// is contended ("no reference score") and its normalisation null (C-0075). The readings this file takes where the design
// leaves the case open — async, the worker sampler, the re-run bound, `long-batch`, built readings never judged — are C-0138.
import { calibrate, scoreDrift } from '../calibrate/calibrate.js';
import { hostRecord, readReferenceScore, type HostRecord } from '../host/index.js';
import { contention, judgeContention, sampleMachine, type Authority, type ContentionReport, type MachineSample } from './contention.js';
import { startSampler, type Sampler } from './sampler.js';

export type TimingUnit = 'ms' | 'µs' | 's';

/** A workload may measure itself (a median over its own samples) and return the figure; the harness still stamps it. */
export interface TimedValue {
  value: number;
  unit: TimingUnit;
}

export type TimingFlag = 'long-batch' | 'throttled';

export interface TimingResult {
  label: string;
  /** The figure: the batch's wall-clock ÷ `ops` in `unit`, or the workload's own TimedValue. */
  value: number;
  unit: TimingUnit;
  host: HostRecord;
  authority: Authority;
  /**
   * `measured` when the harness read the machine, ran calibrate, sampled through the batch and read the reference
   * score itself; `built` when the caller passed any of them (the tests). judge() never judges a built result (C-0047).
   */
  readings: 'measured' | 'built';
  /** Every contention condition found before, through and after the batch; empty exactly when authoritative. */
  reasons: string[];
  /** The batch's mean calibrate score ÷ the reference score; null while the reference score is null (C-0075). */
  normalisation: number | null;
  /** The derivation pool's size the timing ran at (§12.1; M0 runs the pool-size-0 path, §4b). */
  poolSize: number;
  /** The batch's wall-clock in ms (the active time; the idle wait and the calibrations excluded). */
  wallMs: number;
  /** This process's CPU time over the batch in ms (user + system; child processes are the tier runner's to add). */
  cpuMs: number;
  /** The calibrate scores around the accepted attempt, their drift, and how many attempts ran (≤ 1 + maxRepeats). */
  calibration: { before: number; after: number; drift: number; attempts: number };
  /** `long-batch`: the batch ran past maxBatchMs (its figure kept, C-0097); `throttled`: the scores never agreed. */
  flags: TimingFlag[];
  /** How many detector samples the batch took (before, through, after). */
  samples: number;
  at: string;
}

export interface TimeBatchOptions {
  label?: string;
  /** The unit of the figure (default ms). */
  unit?: TimingUnit;
  /** Operations in the batch: the figure is the wall-clock ÷ ops (a per-operation bar). Default 1. */
  ops?: number;
  /** The pool size recorded (default 0). */
  poolSize?: number;
  /** The harness's own processes (the Chromium leg, a tier job) — a list, or a function read after the batch. */
  ownPids?: readonly number[] | (() => readonly number[]);
  /** The idle wait before each attempt (default 30 000 ms; §12.1's fanless host). */
  idleMs?: number;
  /** The detector's sampling period through the batch (default 30 000 ms, C-0103). */
  sampleEveryMs?: number;
  /** The batch cap (default 60 000 ms, §12.1); a longer batch is flagged `long-batch`, never cut. */
  maxBatchMs?: number;
  /** Re-runs on a > 5 % calibrate drift (default 2, C-0097); then the result is flagged `throttled`. */
  maxRepeats?: number;
  /** The calibrate score function (default: calibrate().score). */
  calibrate?: () => number | Promise<number>;
  /** The reference score (default: read reference-score.json at the call). */
  referenceScore?: number | null;
  /** The machine reading (default: sampleMachine()); the tests pass readings built from real rows. */
  machine?: () => MachineSample;
  /** The sampler through the batch (default: the worker-thread sampler of sampler.ts). */
  sampler?: (everyMs: number) => Promise<Sampler>;
  /** The host record (default: hostRecord()). */
  host?: HostRecord;
}

const UNIT_PER_MS: Record<TimingUnit, number> = { ms: 1, 'µs': 1000, s: 0.001 };

function sleep(ms: number): Promise<void> {
  return ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve();
}

function isTimedValue(x: unknown): x is TimedValue {
  if (typeof x !== 'object' || x === null) return false;
  const t = x as Record<string, unknown>;
  return typeof t['value'] === 'number' && (t['unit'] === 'ms' || t['unit'] === 'µs' || t['unit'] === 's');
}

function merge(into: string[], from: readonly string[]): void {
  for (const r of from) if (!into.includes(r)) into.push(r);
}

/** Times one batch of `fn` under §12.1's protocol and returns the stamped result. */
export async function timeBatch(fn: () => unknown, opts: TimeBatchOptions = {}): Promise<TimingResult> {
  const label = opts.label ?? 'batch';
  const unit = opts.unit ?? 'ms';
  const ops = opts.ops ?? 1;
  if (!(ops > 0)) throw new Error(`timeBatch ${label}: ops ${ops} must be positive`);
  const idleMs = opts.idleMs ?? 30_000;
  const everyMs = opts.sampleEveryMs ?? 30_000;
  const maxBatchMs = opts.maxBatchMs ?? 60_000;
  const maxRepeats = opts.maxRepeats ?? 2;
  const cal = opts.calibrate ?? (() => calibrate().score);
  const machine = opts.machine ?? sampleMachine;
  const sampler = opts.sampler ?? ((ms: number) => startSampler({ everyMs: ms }));
  const host = opts.host ?? hostRecord();
  const ref = opts.referenceScore === undefined ? readReferenceScore() : null;
  const referenceScore = ref !== null ? ref.score : opts.referenceScore ?? null;
  const referenceVersion = ref !== null ? ref.calibrateVersion : null;
  const readings: 'measured' | 'built' =
    opts.calibrate === undefined && opts.referenceScore === undefined && opts.machine === undefined && opts.sampler === undefined ? 'measured' : 'built';
  const own = (): readonly number[] => (typeof opts.ownPids === 'function' ? opts.ownPids() : opts.ownPids ?? []);

  let attempt = 0;
  for (;;) {
    attempt += 1;
    await sleep(idleMs);
    const before: ContentionReport = contention({ ownPids: own(), referenceScore, referenceVersion, machine: machine(), checkLoad: true });
    const s1 = await cal();
    const watch = await sampler(everyMs);
    const cpu0 = process.cpuUsage();
    const t0 = process.hrtime.bigint();
    let produced: unknown;
    try {
      produced = await fn();
    } catch (e) {
      await watch.stop(); // a throwing workload still stops the sampler's worker
      throw e;
    }
    const t1 = process.hrtime.bigint();
    const cpu = process.cpuUsage(cpu0);
    const during = await watch.stop();
    const s2 = await cal();
    const after = contention({ ownPids: own(), referenceScore, referenceVersion, machine: machine(), checkLoad: false, calibration: { before: s1, after: s2 } });
    const drift = scoreDrift(s1, s2);
    if (drift > 0.05 && attempt <= maxRepeats) continue; // §12.1: a batch whose two scores differ by > 5 % is re-run

    const reasons: string[] = [];
    merge(reasons, before.reasons);
    for (const s of during) merge(reasons, judgeContention(s, { ownPids: own(), referenceScore, referenceVersion, checkLoad: false }).reasons);
    merge(reasons, after.reasons);
    const wallMs = Number(t1 - t0) / 1e6;
    const flags: TimingFlag[] = [];
    if (wallMs > maxBatchMs) flags.push('long-batch');
    if (drift > 0.05) flags.push('throttled');
    let value: number;
    let outUnit: TimingUnit;
    if (isTimedValue(produced)) {
      value = produced.value;
      outUnit = produced.unit;
    } else {
      value = (wallMs / ops) * UNIT_PER_MS[unit];
      outUnit = unit;
    }
    return {
      label,
      value,
      unit: outUnit,
      host,
      authority: reasons.length === 0 ? 'authoritative' : 'contended',
      readings,
      reasons,
      normalisation: referenceScore === null ? null : (s1 + s2) / 2 / referenceScore,
      poolSize: opts.poolSize ?? 0,
      wallMs,
      cpuMs: (cpu.user + cpu.system) / 1000,
      calibration: { before: s1, after: s2, drift, attempts: attempt },
      flags,
      samples: 2 + during.length,
      at: new Date().toISOString(),
    };
  }
}

/** One row of §12.10's budget register, in the shape a timing bar is judged by. */
export interface RegisterRow {
  /** The row id (R12-n) or the bar's name. */
  row: string;
  /** The budget, in `unit`, on the reference machine. */
  budget: number;
  unit: TimingUnit;
  /** Where and when it is measured. */
  measuredAt: string;
  /** The pass bar, in words. */
  pass: string;
  /** The pre-decided change taken once if it misses. */
  changeOnMiss: string;
  /** An allowed overrun as a fraction (§13.8's tiers: 0.10); default 0. */
  tolerance?: number;
}

export interface Judgement {
  row: string;
  verdict: 'pass' | 'miss' | 'requeue';
  /** The result's figure divided by its normalisation (null when re-queued). */
  normalised: number | null;
  budget: number;
  unit: TimingUnit;
  reason: string;
}

/**
 * Judges a stamped result against a register row. A contended result — every result while the reference score is
 * null — is never judged: the verdict is `requeue` (C-0047, C-0075); nor is a result stamped from built readings. The
 * figure is divided by the normalisation (runner score ÷ reference score, §12.1) before it meets the budget.
 */
export function judge(result: TimingResult, row: RegisterRow): Judgement {
  if (result.readings !== 'measured') {
    return { row: row.row, verdict: 'requeue', normalised: null, budget: row.budget, unit: row.unit, reason: 'built readings: the stamp is measured, never declared (C-0047)' };
  }
  if (result.authority !== 'authoritative' || result.normalisation === null) {
    return { row: row.row, verdict: 'requeue', normalised: null, budget: row.budget, unit: row.unit, reason: `contended: ${result.reasons.join('; ') || 'no normalisation'}` };
  }
  if (result.unit !== row.unit) throw new Error(`judge ${row.row}: the result is in ${result.unit}, the row in ${row.unit}`);
  const normalised = result.value / result.normalisation;
  const limit = row.budget * (1 + (row.tolerance ?? 0));
  return {
    row: row.row,
    verdict: normalised <= limit ? 'pass' : 'miss',
    normalised,
    budget: row.budget,
    unit: row.unit,
    reason: `${normalised.toPrecision(4)} ${row.unit} against ${row.budget} ${row.unit}${row.tolerance ? ` + ${row.tolerance * 100} %` : ''}`,
  };
}
