// bench/calibrate (M0-f-01; §12.1; C-0050, C-0075): `corepack pnpm bench:calibrate [-- --runs N]`.
// The folder was created empty by the scaffold (M0-s-01, C-0013) and belongs to M0-f-01. The kernels are the bench's
// own frozen copies (kernels.ts): nothing here imports a model package or an adopted library.
//
// The command runs the benchmark N times (default 1; the checker's idle receipt uses 2), prints each score, the drift
// between the first and the last, the host and the detector's stamp — contended while the reference score is null
// ("no reference score", C-0075) — and writes the full record to $PLAT_BENCH_OUT/calibrate.json, truncated.
import { describeHost } from '../host/index.js';
import { contention } from '../timing/contention.js';
import { outDir, say, summariseReasons, writeJson } from '../timing/output.js';
import { calibrate, scoreDrift, type CalibrationResult } from './calibrate.js';

export { WARM_ROUNDS, calibrate, calibrateSink, scoreDrift } from './calibrate.js';
export type { CalibrateOptions, CalibrationResult, KernelTiming } from './calibrate.js';
export { CALIBRATE_VERSION, GRID, LEVELS, NODES, SORT_N, kernels, lcg } from './kernels.js';
export type { Kernel } from './kernels.js';

const USAGE = 'usage: corepack pnpm bench:calibrate [-- --runs N (1–10)] [--rounds R] [--warmup W]';

function intArg(args: readonly string[], name: string, fallback: number, lo: number, hi: number): number | null {
  const i = args.indexOf(name);
  if (i < 0) return fallback;
  const v = Number(args[i + 1]);
  return Number.isInteger(v) && v >= lo && v <= hi ? v : null;
}

function kernelLine(r: CalibrationResult): string {
  return r.kernels.map((k) => `${k.name} ${k.medianMs.toFixed(2)}`).join(', ');
}

/** The dispatcher's entry: `bench -- calibrate [--runs N] [--rounds R] [--warmup W]`. */
export function run(args: string[], ctx: { out: string }): number {
  const known = new Set(['--runs', '--rounds', '--warmup']);
  for (let i = 0; i < args.length; i += 2) {
    if (!known.has(args[i])) {
      say(`calibrate: unknown argument ${JSON.stringify(args[i])}; ${USAGE}`);
      return 64;
    }
  }
  const runs = intArg(args, '--runs', 1, 1, 10);
  const rounds = intArg(args, '--rounds', 9, 1, 100);
  const warmup = intArg(args, '--warmup', -1, 0, 100); // -1: the process-level default (CalibrateOptions.warmup)
  if (runs === null || rounds === null || warmup === null) {
    say(`calibrate: bad argument; ${USAGE}`);
    return 64;
  }
  const results: CalibrationResult[] = [];
  for (let r = 0; r < runs; r++) {
    const res = calibrate(warmup < 0 ? { rounds } : { rounds, warmup });
    results.push(res);
    say(`calibrate: run ${r + 1} score ${res.score.toFixed(2)} ms (${kernelLine(res)}; version ${res.version}, ${res.rounds} rounds after ${res.warmup} warm-up)`);
  }
  const first = results[0];
  const last = results[results.length - 1];
  const drift = results.length > 1 ? scoreDrift(first.score, last.score) : null;
  if (drift !== null) say(`calibrate: drift ${(drift * 100).toFixed(2)} % between run 1 and run ${results.length} (§12.1: within 5 %)`);
  const stamp = contention(drift === null ? {} : { calibration: { before: first.score, after: last.score } });
  say(`calibrate: host ${describeHost(first.host)}`);
  const file = writeJson(outDir(ctx.out), 'calibrate.json', { runs: results, drift, stamp });
  say(`calibrate: stamp ${stamp.authority} — ${stamp.reasons.length} reason(s): ${summariseReasons(stamp.reasons)}`);
  say(`calibrate: full record ${file.path}${file.dropped > 0 ? ` (truncated, ${file.dropped} bytes dropped)` : ''}`);
  return 0;
}
