// bench/calibrate (§12.1; C-0050): the four frozen Node kernels timed over their fixed inputs, returning a score and
// the host record. The score is a TIME in milliseconds — the sum of the four kernels' median times over the measured
// rounds — so a slower runner has a larger score and §12.1's normalisation (a timing divided by runner score ÷
// reference score) maps it onto the reference machine. The browser parts (the Canvas2D raster, the GPU probe) and the
// hardware tiers are M1's / M4's (M0-f-01's defers in M0-work.json).
// The score's arithmetic, the warm-up and the version are C-0138 (1).
import { hostRecord, type HostRecord } from '../host/index.js';
import { CALIBRATE_VERSION, kernels, type Kernel } from './kernels.js';

export interface KernelTiming {
  name: Kernel['name'];
  /** The median of the measured rounds, in ms. */
  medianMs: number;
  /** Every measured round, in ms, in order. */
  samplesMs: number[];
  /** The kernel's output checksum (fixed inputs: the same on every run of one version). */
  checksum: number;
}

export interface CalibrationResult {
  /** The calibrate score: the sum of the four kernels' medians, in ms. */
  score: number;
  unit: 'ms';
  host: HostRecord;
  version: number;
  kernels: KernelTiming[];
  rounds: number;
  warmup: number;
  at: string;
}

export interface CalibrateOptions {
  /** Measured rounds per kernel (default 9); the kernels run round-robin so a slow drift touches all four alike. */
  rounds?: number;
  /**
   * Unmeasured warm-up rounds first. Default: enough to bring this process's total to WARM_ROUNDS (the engine's tiers
   * settle by about the 30th round of each kernel — measured 2026-10-03), and never fewer than 3; so the first
   * calibration in a process warms up ≈ 30 rounds and every later one 3.
   */
  warmup?: number;
  /** The host record to stamp (default: hostRecord() of this process). */
  host?: HostRecord;
}

/** Keeps every checksum live so no kernel's work can be elided. */
let sink = 0;

/** The rounds a process runs before its kernels' compiled code is steady (see CalibrateOptions.warmup). */
export const WARM_ROUNDS = 30;
/** Rounds of the kernel set run so far in this process. */
let roundsRun = 0;
/** The kernel set with its fixed inputs, built once a process (no input garbage between calibrations). */
let set: Kernel[] | null = null;

function median(xs: readonly number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 === 1 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** Runs the calibration benchmark once (synchronous; ≈ 0.2 s on the reference machine, ≈ 0.5 s for a process's first). */
export function calibrate(opts: CalibrateOptions = {}): CalibrationResult {
  const rounds = opts.rounds ?? 9;
  const warmup = opts.warmup ?? Math.max(3, WARM_ROUNDS - roundsRun);
  if (!Number.isInteger(rounds) || rounds < 1 || !Number.isInteger(warmup) || warmup < 0) {
    throw new Error(`calibrate: rounds ${rounds} and warmup ${warmup} must be integers ≥ 1 and ≥ 0`);
  }
  const host = opts.host ?? hostRecord();
  set ??= kernels();
  const samples = set.map(() => [] as number[]);
  const sums = set.map(() => 0);
  for (let r = 0; r < warmup + rounds; r++) {
    roundsRun++;
    for (let k = 0; k < set.length; k++) {
      const t0 = process.hrtime.bigint();
      const c = set[k].run();
      const t1 = process.hrtime.bigint();
      sink += c;
      if (r === 0) sums[k] = c;
      else if (c !== sums[k]) throw new Error(`calibrate: kernel ${set[k].name} gave checksum ${c} after ${sums[k]} — its input is not fixed`);
      if (r >= warmup) samples[k].push(Number(t1 - t0) / 1e6);
    }
  }
  const timings: KernelTiming[] = set.map((k, i) => ({ name: k.name, medianMs: median(samples[i]), samplesMs: samples[i], checksum: sums[i] }));
  return {
    score: timings.reduce((s, t) => s + t.medianMs, 0),
    unit: 'ms',
    host,
    version: CALIBRATE_VERSION,
    kernels: timings,
    rounds,
    warmup,
    at: new Date().toISOString(),
  };
}

/** The relative difference of two scores, |a − b| ÷ min(a, b) — the larger of the two one-sided readings (§12.1's 5 %). */
export function scoreDrift(a: number, b: number): number {
  return Math.abs(a - b) / Math.min(a, b);
}

/** For tests: the sink is read so the optimiser cannot prove it dead. */
export function calibrateSink(): number {
  return sink;
}
