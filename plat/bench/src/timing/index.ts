// bench/src/timing — the timing harness, the authority stamp and the contention detector (M0-f-01; §12.1, §12.10,
// §13.8's "Measurement (M0)"; C-0025, C-0047, C-0075, C-0082, C-0103). The folder was created empty by the scaffold
// (M0-s-01, C-0013) and belongs to M0-f-01. The timing-phase script (M0-t-00), the tier runner (M0-f-02a) and every
// harness that reports a timing build on timeBatch(), contention() and judge().
//
// `corepack pnpm bench -- timing` prints the detector's stamp of the machine now (every process on it) and writes the
// report to $PLAT_BENCH_OUT/timing-contention.json; `bench -- timing --batch [--idle-ms N] [--every-ms N]` times one
// probe batch (the fBm kernel ten times) through timeBatch() and writes the stamped TimingResult to
// $PLAT_BENCH_OUT/timing-batch.json. Both exit 0 whatever the stamp: a contended result is reported, never judged.
import { kernels } from '../calibrate/kernels.js';
import { contention } from './contention.js';
import { timeBatch } from './harness.js';
import { outDir, say, summariseReasons, writeJson } from './output.js';

export {
  CPU_LIMIT,
  DRIFT_LIMIT,
  LOAD_LIMIT,
  ancestors,
  baseName,
  contention,
  judgeContention,
  ownTree,
  parsePower,
  parsePs,
  processKind,
  sampleMachine,
} from './contention.js';
export type { Authority, ContentionOptions, ContentionReport, MachineSample, Offender, PowerSource, ProcessRow } from './contention.js';
export { IDLE_MS, MAX_BATCH_MS, MAX_REPEATS, judge, timeBatch } from './harness.js';
export type { Judgement, RegisterRow, TimeBatchOptions, TimedValue, TimingFlag, TimingResult, TimingUnit } from './harness.js';
export { LINE_CAP, OUT_CAP_BYTES, outDir, say, summariseReasons, truncate, writeJson, writeTruncated } from './output.js';
export { SAMPLE_EVERY_MS, SAMPLER_WORKER_SOURCE, startSampler } from './sampler.js';
export type { Sampler, SamplerOptions } from './sampler.js';

const USAGE = 'usage: corepack pnpm bench -- timing [--batch [--idle-ms N] [--every-ms N]]';

/** A millisecond argument: undefined when absent (timeBatch's default then holds), null when malformed. */
function msArg(args: readonly string[], name: string): number | undefined | null {
  const i = args.indexOf(name);
  if (i < 0) return undefined;
  const v = Number(args[i + 1]);
  return Number.isInteger(v) && v >= 0 && v <= 600_000 ? v : null;
}

/** The dispatcher's entry: `bench -- timing [--batch [--idle-ms N] [--every-ms N]]`. */
export async function run(args: string[], ctx: { out: string }): Promise<number> {
  const batch = args.includes('--batch');
  const rest = args.filter((a) => a !== '--batch');
  for (let i = 0; i < rest.length; i += 2) {
    if (rest[i] !== '--idle-ms' && rest[i] !== '--every-ms') {
      say(`timing: unknown argument ${JSON.stringify(rest[i])}; ${USAGE}`);
      return 64;
    }
  }
  const idleMs = msArg(rest, '--idle-ms'); // absent: timeBatch's IDLE_MS
  const everyMs = msArg(rest, '--every-ms'); // absent: SAMPLE_EVERY_MS
  if (idleMs === null || everyMs === null || everyMs === 0 || (!batch && rest.length > 0)) {
    say(`timing: bad argument; ${USAGE}`);
    return 64;
  }
  const dir = outDir(ctx.out);
  if (!batch) {
    const report = contention();
    const file = writeJson(dir, 'timing-contention.json', report);
    say(`timing: machine ${report.authority} — ${report.reasons.length} reason(s) over ${report.processes} processes: ${summariseReasons(report.reasons)}`);
    say(`timing: full report ${file.path}`);
    return 0;
  }
  const fbm = kernels()[0];
  const result = await timeBatch(
    () => {
      for (let i = 0; i < 10; i++) fbm.run();
    },
    { label: 'probe: fbm × 10', idleMs, sampleEveryMs: everyMs },
  );
  const file = writeJson(dir, 'timing-batch.json', result);
  say(`timing: ${result.label} ${result.value.toFixed(2)} ${result.unit}; ${result.authority}; normalisation ${result.normalisation ?? 'null'}; pool ${result.poolSize}; calibrate ${result.calibration.before.toFixed(2)} → ${result.calibration.after.toFixed(2)} ms (${(result.calibration.drift * 100).toFixed(1)} %, ${result.calibration.attempts} attempt(s)); ${result.samples} samples${result.flags.length > 0 ? `; flags ${result.flags.join(', ')}` : ''}`);
  say(`timing: ${result.reasons.length} reason(s): ${summariseReasons(result.reasons)}`);
  say(`timing: full record ${file.path}`);
  return 0;
}
