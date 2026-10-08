// The determinism spike runner (M0-d-09; §16 M0 (d), §6.1 *Distinctness*, §6.2's CI oracle, §6.5 (9), §12.1's authority
// stamp; C-0015, C-0067, C-0090; readings C-0268).
//
// `runDeterminism(config)`:
//   A. the CROSS-HOST run (M0-d-06's harness): the fixture's stage table — the spike city's by default (./stages.ts) —
//      over every seed on every leg asked for, workers off and on; the seeds split into `jobs` contiguous shards run
//      side by side (each shard one `runCrossHost`, its legs one after another), the shards' cells joined in seed order
//      and compared as one report (M0-d-06's `compareCrossHostRuns`), so the report does not depend on `jobs`; then
//   B. the IN-PROCESS checks per seed (./task.ts): the instrumented run with the oracle and the census, the pairs, the
//      dilation and op-order runs — in this process with `jobs` 1, else in up to `jobs` child processes of the bench
//      (the same Node with this process's loader flags), each seed's result read back as JSON and kept in seed order;
//   C. one report (./report.ts) — counts, the first differing seed and stage if any, the authority stamps of its
//      timings — to PLAT_BENCH_OUT, and the numbers-only summary to docs/build/summaries/M0-d-09.json (C-0067).
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import {
  buildCrossHostBundles,
  compareCrossHostRuns,
  CROSSHOST_LEGS,
  CROSSHOST_PLAT_ROOT,
  CROSSHOST_WORKERS,
  crossHostFixtureFrom,
  runCrossHost,
  type CrossHostFixture,
  type CrossHostLegId,
  type CrossHostReport,
  type CrossHostRun,
  type CrossHostStage,
  type CrossHostWorkers,
} from '@plat/testkit';
import { timeMatch } from '@plat/model';
import { timeBatch } from '../timing/harness.js';
import { buildReport, type DeterminismSpikeReport } from './report.js';
import { timedPair } from './rederive.js';
import { perKindUs, runSeedTask, type SeedResult, type SeedTask, type StampFn, type StampedTiming, type TaskConfig } from './task.js';
import { SIZE_INPUT, SPIKE_STAGE_IDS } from './stages.js';

/** The spike city's stage table (plat/-relative), the cross-host fixture's entry. */
export const SPIKE_ENTRY = 'bench/src/determinism/stages.ts';
/** The sizes the runner knows: CITY (the bar's), and the tests' small frame. */
export const SIZES = Object.freeze({ city: null, test: 'bench/src/determinism/sizes/test.json' } as const);
export type SizeName = keyof typeof SIZES;
/** §16 M0 (d)'s 100 seeds; C-0090's 20 pairs; the seeds the dilation and op-order runs take. */
export const DEFAULTS = Object.freeze({ seeds: 100, pairs: 20, checks: 2, repeats: 5 });
/**
 * A leg's time limit per seed of its shard: the spike city at CITY took ≈ 4 min (fusion) + ≈ 6 min (site) per seed on
 * this build (CONTENDED, informative), so 30 min a seed; the test frame's seed ≈ 30 s, so 5 min. Past it the harness
 * kills the leg and reports it failed — never a pass.
 */
export const CITY_SEED_MS = 30 * 60_000;
export const TEST_SEED_MS = 5 * 60_000;
export const TIMEOUT_BASE_MS = 10 * 60_000;
/** The fixture id of the runner's cross-host run. */
export const FIXTURE_ID = 'determinism-spike';

/** The runner's configuration. */
export interface DeterminismConfig {
  readonly seeds: readonly number[];
  /** The first `pairs` seeds are C-0090's re-derivation pairs. */
  readonly pairs: number;
  /** The first `checks` seeds take the dilation and op-order runs. */
  readonly checks: number;
  readonly legs: readonly CrossHostLegId[];
  readonly workers: readonly CrossHostWorkers[];
  readonly size: SizeName;
  /** The stage table (plat/-relative; default SPIKE_ENTRY) and its stage ids (default the spike city's). */
  readonly entry: string;
  readonly stages: readonly string[];
  /** Shards side by side (1: everything in this process, the legs one after another). */
  readonly jobs: number;
  /** Stamp the matching timings with M0-f-01's harness (off: the report carries no measurement). */
  readonly timing: boolean;
  readonly idleMs: number;
  readonly repeats: number;
}

/** The default configuration: the bar's run. */
export function defaultConfig(): DeterminismConfig {
  return {
    seeds: Array.from({ length: DEFAULTS.seeds }, (_, i) => i + 1),
    pairs: DEFAULTS.pairs,
    checks: DEFAULTS.checks,
    legs: [...CROSSHOST_LEGS],
    workers: [...CROSSHOST_WORKERS],
    size: 'city',
    entry: SPIKE_ENTRY,
    stages: [...SPIKE_STAGE_IDS],
    jobs: 1,
    timing: true,
    idleMs: 0,
    repeats: DEFAULTS.repeats,
  };
}

/** The configuration's fixture (inside plat/, C-0067), optionally for a part of its seeds. */
export function fixtureOf(cfg: DeterminismConfig, seeds: readonly number[] = cfg.seeds): CrossHostFixture {
  const sizeFile = SIZES[cfg.size];
  const value = { id: FIXTURE_ID, entry: cfg.entry, seeds: [...seeds], stages: [...cfg.stages], ...(sizeFile === null ? {} : { inputs: { [SIZE_INPUT]: sizeFile } }) };
  return crossHostFixtureFrom(value, `${cfg.entry} (${cfg.size})`, CROSSHOST_PLAT_ROOT);
}

/** Splits a list into `n` contiguous parts of near-equal size (none empty). */
export function shards<T>(xs: readonly T[], n: number): T[][] {
  const k = Math.max(1, Math.min(n, xs.length));
  const out: T[][] = [];
  for (let i = 0; i < k; i += 1) out.push(xs.slice(Math.floor((i * xs.length) / k), Math.floor(((i + 1) * xs.length) / k)));
  return out.filter((s) => s.length > 0);
}

/** Runs `fn` over `items` with at most `jobs` at once; the results in the items' order. */
export async function pool<T, R>(items: readonly T[], jobs: number, fn: (x: T, i: number) => Promise<R>): Promise<R[]> {
  const out = new Array<R>(items.length);
  let next = 0;
  const lane = async (): Promise<void> => {
    for (;;) {
      const i = next;
      next += 1;
      if (i >= items.length) return;
      out[i] = await fn(items[i] as T, i);
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, Math.min(jobs, items.length)) }, () => lane()));
  return out;
}

/** Joins the shards' runs of one (leg, workers) into one run: cells in shard order; blocked or failed when any part was. */
export function joinRuns(parts: readonly CrossHostRun[]): CrossHostRun {
  const head = parts[0];
  if (head === undefined) throw new Error('determinism: no shard ran');
  const failed = parts.find((r) => r.status === 'failed');
  if (failed !== undefined) return { leg: head.leg, workers: head.workers, status: 'failed', ...(failed.reason === undefined ? {} : { reason: failed.reason }) };
  const blocked = parts.find((r) => r.status === 'blocked');
  if (blocked !== undefined) return { leg: head.leg, workers: head.workers, status: 'blocked', ...(blocked.reason === undefined ? {} : { reason: blocked.reason }) };
  return {
    leg: head.leg,
    workers: head.workers,
    status: 'ran',
    ...(head.host === undefined ? {} : { host: head.host }),
    ...(head.thread === undefined ? {} : { thread: head.thread }),
    cells: parts.flatMap((r) => r.cells ?? []),
    wallMs: parts.reduce((n, r) => n + (r.wallMs ?? 0), 0),
  };
}

/** A. The cross-host run over every seed, sharded; one report. */
export async function runCrossHostSharded(cfg: DeterminismConfig, onChild?: (pid: number) => void): Promise<CrossHostReport> {
  const all = fixtureOf(cfg);
  const bundles = await buildCrossHostBundles(all.entryPath);
  const parts = shards(cfg.seeds, cfg.jobs);
  const perSeedMs = cfg.size === 'city' ? CITY_SEED_MS : TEST_SEED_MS;
  const reports = await Promise.all(
    parts.map((seeds) =>
      runCrossHost(fixtureOf(cfg, seeds), {
        legs: cfg.legs,
        workers: cfg.workers,
        bundles,
        // A leg runs its shard's seeds in one child: its time limit grows with them (the harness's default is 10 minutes).
        timeoutMs: TIMEOUT_BASE_MS + seeds.length * perSeedMs,
        ...(onChild === undefined ? {} : { onChild: (pid: number) => onChild(pid) }),
      }),
    ),
  );
  const runs: CrossHostRun[] = [];
  for (const leg of cfg.legs) {
    for (const workers of cfg.workers) {
      runs.push(joinRuns(reports.map((r) => r.runs.find((x) => x.leg === leg && x.workers === workers) as CrossHostRun)));
    }
  }
  return compareCrossHostRuns({ fixture: all.id, source: all.source, seeds: all.seeds, stages: all.stages, timing: false }, runs);
}

/** M0-f-01's stamp of one pair's matching timing (CONTENDED outside the timing phase; the gating figures are M0-t-01's). */
export const harnessStamp: StampFn = async (pair, cfg) => {
  const tp = timedPair(pair);
  let rec: ReturnType<typeof timeMatch> | null = null;
  const r = await timeBatch(
    () => {
      rec = timeMatch(tp, () => performance.now(), cfg.repeats);
      return { value: rec.point.medianUs, unit: 'µs' as const };
    },
    { label: `matching ${tp.name}`, unit: 'µs', idleMs: cfg.idleMs },
  );
  const m = rec as unknown as ReturnType<typeof timeMatch>;
  return {
    label: r.label,
    value: r.value,
    unit: r.unit,
    authority: r.authority,
    readings: r.readings,
    reasons: r.reasons.length,
    firstReasons: r.reasons.slice(0, 3),
    host: `${r.host.cpu} × ${String(r.host.cores)}, ${r.host.os.name} ${r.host.os.version}, node ${r.host.node} ${r.host.arch} (${r.host.kind})`,
    perKindUs: perKindUs(m),
    pointUs: m.point.medianUs,
    overlapUs: m.overlap.medianUs,
  };
};

/** The seeds' tasks: pairs first `pairs`, checks first `checks`; every seed that has one. */
export function tasksOf(cfg: DeterminismConfig): SeedTask[] {
  const n = Math.max(cfg.pairs, cfg.checks);
  return cfg.seeds.slice(0, n).map((seed, i) => ({ seed, pair: i < cfg.pairs, check: i < cfg.checks }));
}

/** The bench's dispatcher script (a child task runs through it). */
const BENCH_SCRIPT = join(CROSSHOST_PLAT_ROOT, 'scripts', 'bench.mjs');

/** Whether this process can start the bench as a child (it runs under tsx: its loader flags are in execArgv). */
export function canSpawnTasks(): boolean {
  return process.execArgv.some((a) => a.includes('tsx'));
}

/** Runs one seed's task in a child process of the bench; its result is the last line of its output. */
function spawnTask(cfg: DeterminismConfig, task: SeedTask, onChild?: (pid: number) => void): Promise<SeedResult> {
  return new Promise((resolve, reject) => {
    const payload = Buffer.from(JSON.stringify({ cfg, task }), 'utf8').toString('base64');
    const child = spawn(process.execPath, [...process.execArgv, BENCH_SCRIPT, 'determinism', 'task', payload], { stdio: ['ignore', 'pipe', 'pipe'], env: process.env });
    if (child.pid !== undefined) onChild?.(child.pid);
    const out: Buffer[] = [];
    const err: Buffer[] = [];
    child.stdout.on('data', (b: Buffer) => out.push(b));
    child.stderr.on('data', (b: Buffer) => err.push(b));
    child.on('error', reject);
    child.on('close', (code) => {
      const text = Buffer.concat(out).toString('utf8').trim();
      const line = text.slice(text.lastIndexOf('\n') + 1);
      try {
        const v = JSON.parse(line) as { result?: SeedResult; error?: string };
        if (v.result !== undefined) return resolve(v.result);
        return reject(new Error(`determinism: the task at seed ${String(task.seed)} failed: ${v.error ?? 'no result'}`));
      } catch {
        return reject(new Error(`determinism: the task at seed ${String(task.seed)} gave no result (exit ${String(code)}): ${Buffer.concat(err).toString('utf8').trim().split('\n').slice(-3).join(' | ')}`));
      }
    });
  });
}

/** The fixture's stage table, loaded (the entry module's `crosshostStages`). */
export async function loadTable(f: CrossHostFixture): Promise<readonly CrossHostStage[]> {
  const mod = (await import(pathToFileURL(f.entryPath).href)) as { crosshostStages?: readonly CrossHostStage[] };
  if (!Array.isArray(mod.crosshostStages)) throw new Error(`determinism: ${f.entryPath} exports no crosshostStages`);
  return mod.crosshostStages;
}

/** The task configuration a fixture gives. */
export function taskConfig(cfg: DeterminismConfig, f: CrossHostFixture): TaskConfig {
  return { stages: f.stages, inputs: f.inputs, timing: cfg.timing, idleMs: cfg.idleMs, repeats: cfg.repeats };
}

/** B. The in-process checks of every task seed (in this process, or sharded over child processes). */
export async function runSeedTasks(cfg: DeterminismConfig, stamp: StampFn = harnessStamp, onChild?: (pid: number) => void): Promise<SeedResult[]> {
  const f = fixtureOf(cfg);
  const tasks = tasksOf(cfg);
  if (cfg.jobs > 1 && canSpawnTasks()) return pool(tasks, cfg.jobs, (t) => spawnTask(cfg, t, onChild));
  const table = await loadTable(f);
  const tc = taskConfig(cfg, f);
  const out: SeedResult[] = [];
  for (const t of tasks) out.push(await runSeedTask(table, tc, t, stamp));
  return out;
}

/**
 * The whole run: A, then B (one after the other, so at most `jobs` shards or tasks run at once and the in-process
 * checks never stall the legs' pipes), then the report.
 */
export async function runDeterminism(cfg: DeterminismConfig, opts: { stamp?: StampFn; onChild?: (pid: number) => void } = {}): Promise<DeterminismSpikeReport> {
  const crosshost = await runCrossHostSharded(cfg, opts.onChild);
  const seeds = await runSeedTasks(cfg, opts.stamp ?? harnessStamp, opts.onChild);
  return buildReport(cfg, crosshost, seeds);
}
