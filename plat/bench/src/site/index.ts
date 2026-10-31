// bench/src/site — the site spike harness (M0-e-06; §12.4's M0 site-and-fields spike, §12.10 R12-4 / R12-5, §16 M0 (e),
// §12.1's authority stamp, §13.1's relief fixtures; C-0048, C-0049, C-0067, C-0076, C-0080, C-0082, C-0084, C-0087,
// C-0091, C-0271). The folder was created empty by the scaffold (M0-s-01, C-0013) and belongs to M0-e-06.
//
// `corepack pnpm bench -- site [--seeds N] [--first S] [--fixture relief-60|relief-3000|both] [--config default|coarse|both]
// [--size city|test] [--workers W] [--timing [--idle-ms N] [--every-ms N]] [--summary]` derives each fixture (CITY, a
// river on 60 m and on 3 000 m relief) at seeds S … S + N − 1 (200 from 1 by default) under each configuration — the
// default and R12-5's coarsening switch, run beside it — through M0-x-04's base registration and M0-x-02's runner
// (S1, the S3 slice, S4, S5, S6 with the fields; compose.ts), reads every receipt from the committed state
// (receipts.ts), folds them into SiteSpikeReport (report.ts) and writes it to $PLAT_BENCH_OUT/site-spike.json (no time
// in it: the same seeds give the same bytes), the stage times to $PLAT_BENCH_OUT/site-spike-timing.json and — with
// `--summary` — the numbers-only summary to docs/build/summaries/M0-e-06.json (C-0067, C-0091). It exits 0 when every
// bar passed and was observed, 1 otherwise; 64 on a bad argument. `--timing` times each fixture and configuration as one
// M0-f-01 batch (timing.ts; the timing phase's mode — run by M0-t-01, judged only when AUTHORITATIVE); without it the
// times are informative (CONTENDED, never judged).
import { mkdirSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { outDir, say, writeTruncated } from '../timing/output.js';
import type { SpikeConfig } from './compose.js';
import { SITE_FIXTURES, type SiteFixture, type SpikeSize } from './fixtures.js';
import { runSpikeTasks, type SpikeTask } from './pool.js';
import { BAR_NAMES, foldReport, receiptsOf, type SiteSpikeReport } from './report.js';
import { foldTimes, timeSpike, type TimingBlock } from './timing.js';
import { anchorOf, type SummaryAnchor } from './anchor.js';

export { coarseRiverStrategy, composedS6Run, deriveSpike, GATE_STAGES, SPIKE_STAGES, spikeRegistry, type BatchSeen, type RunCapture, type SpikeConfig, type SpikeDerivation, type SpikeRegistryOptions } from './compose.js';
export { fixtureNamed, RELIEF_3000, RELIEF_60, riverOn, SITE_FIXTURES, sized, TEST_SIZE, type SiteFixture, type SpikeSize } from './fixtures.js';
export { runSpikeTask, runSpikeTasks, SPIKE_WORKER_URL, type SpikeResult, type SpikeTask } from './pool.js';
export {
  bandReceipt,
  bridgeReceipt,
  CONTAINMENT_STEP_CM,
  corpusReceipt,
  districtReceipt,
  edgeInWaterDeep,
  fieldsReceipt,
  hydroReceipt,
  median,
  pointInWaterDeep,
  reliefReceipt,
  riverReceipts,
  runRecord,
  s5Walls,
  spikeFaces,
  stageOutcomes,
  waterGateReceipt,
  WET_DEPTH_CM,
  withoutSoftRows,
  type EnceinteWaterReceipt,
  type RunRecord,
  type S5Walls,
  type StageOutcome,
  type WaterGateReceipt,
} from './receipts.js';
export { BAND_TOLERANCE_CELLS, BAR_NAMES, foldGroup, foldReport, quantiles, receiptsOf, RELIEF_FLOOR_CM, WARD_SHARE_MIN, type BarName, type BarReceipt, type GroupReport, type Quantiles, type SiteSpikeReport, type Verdict } from './report.js';
export { foldTimes, gateMs, R12_4_ROWS, SITE_GATE_ROW, stageTimesOf, timeHydrology, timeSpike, type StageTimes, type TimingBlock } from './timing.js';

/** plat/ itself, resolved. */
export const PLAT_ROOT = realpathSync(fileURLToPath(new URL('../../../', import.meta.url)));
/** The numbers-only summary (C-0067). */
export const SUMMARY_PATH = join(PLAT_ROOT, 'docs', 'build', 'summaries', 'M0-e-06.json');
/** The report and the timing block's files under PLAT_BENCH_OUT. */
export const REPORT_FILE = 'site-spike.json';
export const TIMING_FILE = 'site-spike-timing.json';
/** The report file's cap: the records of 200 seeds × 2 fixtures × 2 configurations fit (the output rule's cap, raised). */
export const REPORT_CAP_BYTES = 16 * 1024 * 1024;
/** The default seed count (M0-work.json: "on 200 seeds"). */
export const DEFAULT_SEEDS = 200;

const USAGE =
  'usage: corepack pnpm bench -- site [--seeds N] [--first S] [--fixture relief-60|relief-3000|both] [--config default|coarse|both] [--size city|test] [--workers W] [--timing [--idle-ms N] [--every-ms N]] [--summary]';

/** The dispatcher's context, with what a test may redirect: the summary's path, the fixtures. */
export interface SiteContext {
  out: string;
  summary?: string;
  fixtures?: readonly SiteFixture[];
}

/** The harness's parsed arguments. */
export interface SiteArgs {
  readonly seeds: number;
  readonly first: number;
  readonly fixtures: readonly string[];
  readonly configs: readonly SpikeConfig[];
  readonly size: SpikeSize;
  readonly workers: number;
  readonly timing: boolean;
  readonly idleMs?: number;
  readonly everyMs?: number;
  readonly summary: boolean;
}

function intArg(args: readonly string[], name: string, lo: number, hi: number): number | undefined | null {
  const i = args.indexOf(name);
  if (i < 0) return undefined;
  const v = Number(args[i + 1]);
  return Number.isInteger(v) && v >= lo && v <= hi ? v : null;
}

function strArg(args: readonly string[], name: string): string | undefined {
  const i = args.indexOf(name);
  return i < 0 ? undefined : args[i + 1];
}

/** Parses the harness's arguments; a string is the refusal's reason. */
export function parseSiteArgs(args: readonly string[], env: Readonly<Record<string, string | undefined>> = process.env, fixtures: readonly SiteFixture[] = SITE_FIXTURES): SiteArgs | string {
  const valued = new Set(['--seeds', '--first', '--fixture', '--config', '--size', '--workers', '--idle-ms', '--every-ms']);
  const flags = new Set(['--timing', '--summary']);
  const seen = new Set<string>();
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (!valued.has(a) && !flags.has(a)) return `unknown argument ${JSON.stringify(a)}`;
    if (seen.has(a)) return `${a} given twice`;
    seen.add(a);
    if (valued.has(a)) {
      if (i + 1 >= args.length) return `${a} takes a value`;
      i += 1;
    }
  }
  const seeds = intArg(args, '--seeds', 1, 1000);
  const first = intArg(args, '--first', 0, 0xffffffff);
  const workersArg = intArg(args, '--workers', 1, 64);
  const idleMs = intArg(args, '--idle-ms', 0, 600_000);
  const everyMs = intArg(args, '--every-ms', 1, 600_000);
  if (seeds === null) return '--seeds takes a whole number 1 … 1000';
  if (first === null) return '--first takes a whole number ≥ 0';
  if (workersArg === null) return '--workers takes a whole number 1 … 64';
  if (idleMs === null || everyMs === null) return '--idle-ms and --every-ms take a whole number of ms';
  const timing = args.includes('--timing');
  if (!timing && (idleMs !== undefined || everyMs !== undefined)) return '--idle-ms and --every-ms go with --timing';
  const names = fixtures.map((f) => f.name);
  const fx = strArg(args, '--fixture') ?? 'both';
  if (fx !== 'both' && !names.includes(fx)) return `--fixture takes ${names.join(', ')} or both`;
  const cf = strArg(args, '--config') ?? 'both';
  if (cf !== 'both' && cf !== 'default' && cf !== 'coarse') return '--config takes default, coarse or both';
  const size = strArg(args, '--size') ?? 'city';
  if (size !== 'city' && size !== 'test') return '--size takes city or test';
  const envW = env['PLAT_BENCH_WORKERS'];
  const workers = workersArg ?? (envW === undefined || envW === '' ? 1 : /^[1-9][0-9]?$/.test(envW) && Number(envW) <= 64 ? Number(envW) : null);
  if (workers === null) return 'PLAT_BENCH_WORKERS takes a whole number 1 … 64';
  return {
    seeds: seeds ?? DEFAULT_SEEDS,
    first: first ?? 1,
    fixtures: fx === 'both' ? names : [fx],
    configs: cf === 'both' ? ['default', 'coarse'] : [cf],
    size,
    workers,
    timing,
    ...(idleMs === undefined ? {} : { idleMs }),
    ...(everyMs === undefined ? {} : { everyMs }),
    summary: args.includes('--summary'),
  };
}

/** The tasks of a run: per fixture, per configuration, per seed (that order). */
export function spikeTasks(a: SiteArgs): SpikeTask[] {
  const out: SpikeTask[] = [];
  for (const fixture of a.fixtures) for (const config of a.configs) for (let i = 0; i < a.seeds; i += 1) out.push({ fixture, config, seed: a.first + i, size: a.size });
  return out;
}

/**
 * The numbers-only summary (C-0067, C-0091, C-0084): the receipts' numbers and verdicts, the work, the stage p50s; per
 * group the refusal classes with their seeds (Q122) and the per-stage work blocks (Q118); and, given, the content anchor
 * (Q36: anchor.ts) as its first field after the item.
 */
export function summaryOf(report: SiteSpikeReport, timing: readonly TimingBlock[], anchor?: SummaryAnchor): Record<string, unknown> {
  const r = receiptsOf(report);
  return {
    item: r.item,
    ...(anchor === undefined ? {} : { anchor }),
    size: r.size,
    seeds: r.seeds,
    fixtures: r.fixtures,
    configs: r.configs,
    pass: r.pass,
    verdicts: r.verdicts,
    groups: r.groups.map((g) => ({ fixture: g.fixture, config: g.config, runs: g.runs, stages: g.stages, refusals: g.refusals, bars: g.bars, work: g.work, batches: g.batches, stageWork: g.stageWork })),
    timing: timing.map((t) => ({
      fixture: t.fixture,
      config: t.config,
      mode: t.mode,
      runs: t.runs,
      stageP50: t.stageP50,
      gateP50: t.gateP50,
      gateRuns: t.gateRuns,
      r12_4: t.r12_4,
      authority: t.stamp?.authority ?? 'contended',
      normalisation: t.stamp?.normalisation ?? null,
      flags: t.stamp?.flags ?? [],
      verdict: t.judgement?.verdict ?? 'requeue',
      hydrology: t.hydrology,
    })),
  };
}

/** The dispatcher's entry: `bench -- site …` (C-0059). */
export async function run(args: string[], ctx: SiteContext): Promise<number> {
  const fixtures = ctx.fixtures ?? SITE_FIXTURES;
  const a = parseSiteArgs(args, process.env, fixtures);
  if (typeof a === 'string') {
    say(`site: ${a}; ${USAGE}`);
    return 64;
  }
  const tasks = spikeTasks(a);
  say(`site: ${String(tasks.length)} derivations (${a.fixtures.join(', ')} × ${a.configs.join(', ')} × seeds ${String(a.first)}–${String(a.first + a.seeds - 1)}, ${a.size}) on ${String(a.workers)} worker(s)`);
  let last = 0;
  const results = await runSpikeTasks(tasks, a.workers, (done, total) => {
    if (done === total || done - last >= Math.max(1, Math.floor(total / 10))) {
      last = done;
      say(`site: ${String(done)} / ${String(total)}`);
    }
  }, ctx.fixtures ?? []);
  const report = foldReport(a.size, a.first, a.seeds, a.fixtures, a.configs, results.map((x) => x.record));
  const timing: TimingBlock[] = [];
  for (const fixture of a.fixtures) {
    for (const config of a.configs) {
      if (a.timing) {
        const f = fixtures.find((x) => x.name === fixture) as SiteFixture;
        const seeds = Array.from({ length: a.seeds }, (_, i) => a.first + i);
        timing.push(await timeSpike(f, config, seeds, a.size, { ...(a.idleMs === undefined ? {} : { idleMs: a.idleMs }), ...(a.everyMs === undefined ? {} : { sampleEveryMs: a.everyMs }) }));
      } else {
        timing.push(foldTimes(fixture, config, results.filter((_, i) => tasks[i].fixture === fixture && tasks[i].config === config).map((x) => x.times), 'informative'));
      }
    }
  }
  const dir = outDir(ctx.out);
  const file = writeTruncated(dir, REPORT_FILE, `${JSON.stringify(report, null, 2)}\n`, REPORT_CAP_BYTES);
  const tfile = writeTruncated(dir, TIMING_FILE, `${JSON.stringify(timing, null, 2)}\n`, REPORT_CAP_BYTES);
  if (a.summary) {
    const summaryPath = ctx.summary ?? SUMMARY_PATH;
    mkdirSync(dirname(summaryPath), { recursive: true });
    const tree = process.env['PLAT_TREE'];
    const anchor = anchorOf(PLAT_ROOT, report.records, tree === undefined || tree === '' ? undefined : tree);
    writeFileSync(summaryPath, `${JSON.stringify(summaryOf(report, timing, anchor), null, 2)}\n`);
    say(`site: summary ${relative(PLAT_ROOT, summaryPath)}`);
  }
  for (const g of report.groups) {
    const s6 = g.stages['S6'];
    say(`site: ${g.fixture} (${g.config}): ${String(g.runs)} runs, S6 ok ${String(s6?.ok ?? 0)}; refused ${Object.entries(g.stages).flatMap(([s, o]) => Object.entries(o.refused).map(([c, n]) => `${s} ${c} ×${String(n)}`)).join(', ') || 'none'}`);
    say(`site: ${g.fixture} (${g.config}): ${BAR_NAMES.map((b) => `${b} ${g.bars[b].verdict}`).join(', ')}`);
  }
  for (const t of timing) {
    say(`site: ${t.fixture} (${t.config}) times: S1 + S4 + S6 p50 ${t.gateP50 === null ? '—' : t.gateP50.toFixed(1)} ms over ${String(t.gateRuns)} runs; ${t.mode}${t.judgement === null ? '' : `, ${t.judgement.verdict}`} (never judged unless authoritative)`);
  }
  say(`site: ${report.pass ? 'pass' : 'FAIL'} — ${BAR_NAMES.filter((b) => report.verdicts[b] !== 'pass').map((b) => `${b} ${report.verdicts[b]}`).join(', ') || 'every bar passed'}; report ${file.path}${file.dropped > 0 ? ' (truncated)' : ''}; times ${tfile.path}`);
  return report.pass ? 0 : 1;
}
