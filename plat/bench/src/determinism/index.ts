// bench/src/determinism — the determinism spike runner over the spike city (M0-d-09; §16 M0 (d), §6.1 *Distinctness*,
// §6.2's CI oracle, §6.5 (9), §12.1's authority stamp; C-0015, C-0067, C-0090; readings C-0268). The scaffold created
// this folder empty (M0-s-01, C-0013); it belongs to M0-d-09.
//
//   corepack pnpm bench -- determinism [--seeds N | a..b | s,s,…] [--pairs N] [--checks N] [--size city|test]
//                                      [--legs <leg,…>] [--workers off|on|both] [--jobs N] [--no-timing]
//                                      [--idle-ms N] [--repeats N] [--entry <plat path> --stages <id,…>]
//
// Defaults: 100 seeds (1 … 100) of the spike city at CITY on the five legs, workers off and on; the first 20 seeds are
// C-0090's re-derivation pairs, the first 2 take the dilation and op-order runs; one shard (`--jobs` splits the seeds
// over that many processes). Writes the full report to $PLAT_BENCH_OUT/determinism-spike.json and, for the spike city
// at CITY, the numbers-only summary to docs/build/summaries/M0-d-09.json (C-0067). Exit 0 when every bar holds on every
// leg (pass), 1 on a failed bar (fail), 3 when every bar that ran holds but a leg is blocked here (incomplete — never a
// pass), 64 on a bad argument. `determinism task <payload>` is the runner's own child (one seed's in-process checks).
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CROSSHOST_LEGS, CROSSHOST_PLAT_ROOT, CROSSHOST_WORKERS, type CrossHostLegId, type CrossHostWorkers } from '@plat/testkit';
import { outDir, say, writeJson } from '../timing/output.js';
import { reportLines, summaryOf, type DeterminismSpikeReport } from './report.js';
import { defaultConfig, fixtureOf, harnessStamp, loadTable, runDeterminism, SIZES, SPIKE_ENTRY, taskConfig, type DeterminismConfig, type SizeName } from './runner.js';
import { runSeedTask, type SeedTask } from './task.js';

export { addressLineage, MATCH_KINDS, spikeEntities, type MadeBy, type MatchKind, type SpikeEntities, type SpikeEntity } from './entities.js';
export { censusCounts, censusInstalled, withKeyCensus, type CensusCounts, type KeyCensusResult } from './census.js';
export { RECORDS_BATCHES, recordsRun, type RecordsRun } from './records.js';
export { anchorRefs, m0Anchors, matchPair, pairEntities, rederive, S5_REROLL, silentRebinds, STANDING, timedPair, type KindCounts, type PairResult, type PairSide, type RederivedPair, type RederiveOptions } from './rederive.js';
export { buildReport, firstOf, reportLines, reportText, summaryOf, type DeterminismSpikeReport, type FirstDifference, type KindTotals } from './report.js';
export { canSpawnTasks, CITY_SEED_MS, defaultConfig, DEFAULTS, FIXTURE_ID, fixtureOf, harnessStamp, joinRuns, loadTable, pool, runCrossHostSharded, runDeterminism, runSeedTasks, shards, SIZES, SPIKE_ENTRY, taskConfig, tasksOf, TEST_SEED_MS, type DeterminismConfig, type SizeName } from './runner.js';
export { CITY_SIZE, hex128, SPIKES, spikeBlueprint, spikeRun, textDigest, type OracleMiss, type OracleTally, type SpikeName, type SpikeRun, type SpikeRunOptions, type SpikeSize } from './spike.js';
export { carriedSpike, crosshostStages, OPTIONS_KEY, RECORDS_KEY, runKey, SIZE_INPUT, sizeOf, SPIKE_STAGE_IDS, spikeStageIds } from './stages.js';
export { DILATION, runSeedTask, runStagesAt, type CheckOutcome, type PairLite, type SeedResult, type SeedTask, type StampedTiming, type StampFn, type TaskConfig } from './task.js';

/** The item's numbers-only summary (C-0067). */
export const SUMMARY_PATH = fileURLToPath(new URL('../../../docs/build/summaries/M0-d-09.json', import.meta.url));
/** The full report's file name in PLAT_BENCH_OUT, and its cap. */
export const REPORT_NAME = 'determinism-spike.json';
export const REPORT_CAP_BYTES = 16 * 1024 * 1024;

const USAGE =
  'usage: corepack pnpm bench -- determinism [--seeds N | a..b | s,s,…] [--pairs N] [--checks N] [--size city|test] [--legs <leg,…>] [--workers off|on|both] [--jobs N] [--no-timing] [--idle-ms N] [--repeats N] [--entry <plat path> --stages <id,…>]';

/** The dispatcher's context, with the paths a test may set. */
export interface DeterminismContext {
  out: string;
  /** The summary file (default SUMMARY_PATH; written only for the spike city at CITY, or when a test names one). */
  summary?: string;
}

/** The parsed command line, or why it is refused. */
export type DeterminismArgs = { ok: true; config: DeterminismConfig } | { ok: false; message: string };

const isU32 = (n: number): boolean => Number.isInteger(n) && n >= 0 && n <= 0xffffffff;

/** A seed list: a count N (1 … N), a range a..b, or a comma list of distinct u32s. */
export function parseSeeds(v: string): number[] | null {
  if (/^\d+$/.test(v)) {
    const n = Number(v);
    return n >= 1 && n <= 100_000 ? Array.from({ length: n }, (_, i) => i + 1) : null;
  }
  const range = /^(\d+)\.\.(\d+)$/.exec(v);
  if (range !== null) {
    const a = Number(range[1]);
    const b = Number(range[2]);
    return isU32(a) && isU32(b) && a <= b && b - a < 100_000 ? Array.from({ length: b - a + 1 }, (_, i) => a + i) : null;
  }
  if (!/^\d+(,\d+)+$/.test(v)) return null;
  const xs = v.split(',').map(Number);
  return xs.every(isU32) && new Set(xs).size === xs.length ? xs : null;
}

/** Parses the command line (see the header). */
export function parseDeterminismArgs(args: readonly string[]): DeterminismArgs {
  const cfg = defaultConfig() as { -readonly [K in keyof DeterminismConfig]: DeterminismConfig[K] };
  const seen = new Set<string>();
  const int = (v: string | undefined, lo: number, hi: number): number | null => (v !== undefined && /^\d+$/.test(v) && Number(v) >= lo && Number(v) <= hi ? Number(v) : null);
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i] as string;
    if (a === 'run' && i === 0) continue;
    if (!a.startsWith('--')) return { ok: false, message: `determinism: an unknown argument ${JSON.stringify(a)}; ${USAGE}` };
    if (seen.has(a)) return { ok: false, message: `determinism: ${a} twice; ${USAGE}` };
    seen.add(a);
    if (a === '--no-timing') {
      cfg.timing = false;
      continue;
    }
    const v = args[i + 1];
    i += 1;
    const bad = (what: string): DeterminismArgs => ({ ok: false, message: `determinism: ${a} takes ${what}; ${USAGE}` });
    switch (a) {
      case '--seeds': {
        const s = v === undefined ? null : parseSeeds(v);
        if (s === null) return bad('a count, a range a..b or a list of distinct u32 seeds');
        cfg.seeds = s;
        break;
      }
      case '--pairs': {
        const n = int(v, 0, 100_000);
        if (n === null) return bad('a count');
        cfg.pairs = n;
        break;
      }
      case '--checks': {
        const n = int(v, 0, 100_000);
        if (n === null) return bad('a count');
        cfg.checks = n;
        break;
      }
      case '--jobs': {
        const n = int(v, 1, 64);
        if (n === null) return bad('a count 1 … 64');
        cfg.jobs = n;
        break;
      }
      case '--idle-ms': {
        const n = int(v, 0, 600_000);
        if (n === null) return bad('milliseconds');
        cfg.idleMs = n;
        break;
      }
      case '--repeats': {
        const n = int(v, 1, 1000);
        if (n === null) return bad('a count ≥ 1');
        cfg.repeats = n;
        break;
      }
      case '--size':
        if (v !== 'city' && v !== 'test') return bad(`one of ${Object.keys(SIZES).join(', ')}`);
        cfg.size = v as SizeName;
        break;
      case '--legs': {
        const list = v === undefined ? [] : v.split(',');
        if (list.length === 0 || list.some((l) => !(CROSSHOST_LEGS as readonly string[]).includes(l)) || new Set(list).size !== list.length) return bad(`distinct legs of ${CROSSHOST_LEGS.join(', ')}`);
        cfg.legs = CROSSHOST_LEGS.filter((l) => list.includes(l)) as CrossHostLegId[];
        break;
      }
      case '--workers':
        if (v === 'both') cfg.workers = [...CROSSHOST_WORKERS];
        else if (v === 'off' || v === 'on') cfg.workers = [v as CrossHostWorkers];
        else return bad('off, on or both');
        break;
      case '--entry':
        if (v === undefined || v === '') return bad('a plat/-relative path');
        cfg.entry = v;
        break;
      case '--stages': {
        const list = v === undefined ? [] : v.split(',');
        if (list.length === 0 || list.some((x) => x === '') || new Set(list).size !== list.length) return bad('distinct stage ids');
        cfg.stages = list;
        break;
      }
      default:
        return { ok: false, message: `determinism: an unknown argument ${JSON.stringify(a)}; ${USAGE}` };
    }
  }
  if (seen.has('--entry') && !seen.has('--stages')) return { ok: false, message: `determinism: --entry needs --stages; ${USAGE}` };
  if (cfg.pairs > cfg.seeds.length || cfg.checks > cfg.seeds.length) return { ok: false, message: `determinism: --pairs and --checks are at most the seeds' count (${String(cfg.seeds.length)}); ${USAGE}` };
  return { ok: true, config: cfg };
}

/** Whether a run is the bar's form, whose summary the item commits: the spike city at CITY. */
export function isBarRun(cfg: DeterminismConfig): boolean {
  return cfg.entry === SPIKE_ENTRY && cfg.size === 'city';
}

/** The runner's own child: one seed's in-process checks, its result as the last line of its output. */
async function runTask(payload: string | undefined): Promise<number> {
  try {
    const { cfg, task } = JSON.parse(Buffer.from(payload ?? '', 'base64').toString('utf8')) as { cfg: DeterminismConfig; task: SeedTask };
    const f = fixtureOf(cfg);
    const result = await runSeedTask(await loadTable(f), taskConfig(cfg, f), task, harnessStamp);
    process.stdout.write(`\n${JSON.stringify({ result })}\n`);
    return 0;
  } catch (e) {
    process.stdout.write(`\n${JSON.stringify({ error: e instanceof Error ? e.message : String(e) })}\n`);
    return 1;
  }
}

/** The dispatcher's entry (C-0059). */
export async function run(args: string[], ctx: DeterminismContext): Promise<number> {
  if (args[0] === 'task') return runTask(args[1]);
  const p = parseDeterminismArgs(args);
  if (!p.ok) {
    say(p.message);
    return 64;
  }
  let report: DeterminismSpikeReport;
  try {
    report = await runDeterminism(p.config);
  } catch (e) {
    say(`determinism: ${e instanceof Error ? e.message : String(e)}`);
    return 64;
  }
  const full = writeJson(outDir(ctx.out), REPORT_NAME, report, REPORT_CAP_BYTES);
  for (const line of reportLines(report)) say(line);
  if (ctx.summary !== undefined || isBarRun(p.config)) {
    const path = ctx.summary ?? SUMMARY_PATH;
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify(summaryOf(report), null, 2)}\n`);
    const rel = relative(CROSSHOST_PLAT_ROOT, path);
    say(`determinism: summary ${rel.startsWith('..') || rel === '' ? path : rel}`);
  }
  say(`determinism: full report ${full.path}${full.dropped > 0 ? ` (truncated: ${String(full.dropped)} bytes dropped)` : ''}`);
  return report.verdict === 'pass' ? 0 : report.verdict === 'fail' ? 1 : 3;
}
