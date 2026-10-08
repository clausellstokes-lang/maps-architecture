// The edge suite's runner (M0-x-06; §13.2 B-EDGE: "the home's stated outcome, hard, 0 per 1 000"; C-0100): every built
// fixture at PLAT_EDGE_SEEDS seeds of its own family, each run judged; a throw is a crash, a run past HANG_MS a hang, and
// every failure names the fixture and the seed that replays it. No vitest import here, so a probe can load it.
import { mkdirSync, readFileSync, renameSync, rmdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { EDGE_FIXTURES, edgeCoverage, edgeSeedCount, edgeSeeds, judgeEdgeOutcome, type EdgeFixture, type EdgeHandling } from '../../src/edge/index.js';

/** The seeds per fixture this run (PLAT_EDGE_SEEDS; 10 unset). */
export const SEEDS = edgeSeedCount();

/** A run longer than this is a hang (the stages' work limits bound every run far below it). */
export const HANG_MS = 120_000;

/** One fixture's run over its seeds: the outcome counts and the failures. */
export interface FixtureRun {
  readonly id: string;
  readonly seeds: number;
  readonly counts: Record<EdgeHandling | 'crash' | 'hang' | 'offOutcome', number>;
  readonly failures: string[];
  /** The rungs the runs named, with their counts (the summary keeps the counts only). */
  readonly rungs: Record<string, number>;
}

function zero(): FixtureRun['counts'] {
  return { absorbed: 0, laddered: 0, 'left-out': 0, 'refused-safe': 0, 'refused-residue': 0, defined: 0, off: 0, crash: 0, hang: 0, offOutcome: 0 };
}

/** Runs a fixture at its first `n` seeds (default PLAT_EDGE_SEEDS) and judges every run. */
export function runFixture(f: EdgeFixture, n: number = SEEDS, seeds: readonly number[] = edgeSeeds(f.id, n)): FixtureRun {
  const counts = zero();
  const failures: string[] = [];
  const rungs: Record<string, number> = {};
  for (const seed of seeds) {
    const t0 = performance.now();
    let o;
    try {
      o = f.run(seed);
    } catch (e) {
      counts.crash += 1;
      failures.push(`${f.id} at seed ${String(seed)}: threw ${e instanceof Error ? e.message.split('\n')[0] : String(e)}`);
      continue;
    }
    const ms = performance.now() - t0;
    if (ms > HANG_MS) {
      counts.hang += 1;
      failures.push(`${f.id} at seed ${String(seed)}: ran ${String(Math.round(ms))} ms (a hang, over ${String(HANG_MS)} ms)`);
      continue;
    }
    const v = judgeEdgeOutcome(f, seed, o);
    if (v !== null) {
      counts.offOutcome += 1;
      failures.push(v);
      continue;
    }
    counts[o.handling] += 1;
    rungs[o.rung] = (rungs[o.rung] ?? 0) + 1;
  }
  return { id: f.id, seeds: seeds.length, counts, failures, rungs };
}

/** The built fixtures whose id starts with one of the prefixes, in EDGE_FIXTURES' order. */
export function fixturesOf(...prefixes: string[]): EdgeFixture[] {
  return EDGE_FIXTURES.filter((f) => f.milestone === undefined && prefixes.some((p) => f.id.startsWith(p)));
}

/** A fixture test's timeout: room for every seed at a minute each, at least five minutes. */
export function timeoutFor(n: number = SEEDS): number {
  return Math.max(300_000, n * 60_000);
}

/** The numbers-only summary (C-0067): plat/docs/build/summaries/M0-x-06.json. */
export const SUMMARY_PATH = fileURLToPath(new URL('../../../../docs/build/summaries/M0-x-06.json', import.meta.url));

/** Is this run asked to write the summary (PLAT_EDGE_SUMMARY=1)? A plain run — every seat's related run — writes nothing. */
export function summaryWanted(env: Readonly<Record<string, string | undefined>> = process.env): boolean {
  return env.PLAT_EDGE_SUMMARY === '1';
}

/** One fixture's counts as the summary keeps them: numbers only. */
export type SummaryCounts = Record<'seeds' | EdgeHandling | 'crash' | 'hang' | 'offOutcome', number>;

/** The summary's shape: per fixture the seed count and the outcome counts, the totals and the table's counts. */
export interface EdgeSummary {
  readonly item: 'M0-x-06';
  readonly seedsPerFixture: number;
  readonly fixtures: Record<string, SummaryCounts>;
  readonly totals: SummaryCounts & { readonly fixtures: number };
  readonly coverage: { readonly rows: number; readonly built: number; readonly deferred: number; readonly fixtures: number; readonly problems: number };
}

/** A fixture run's counts as the summary keeps them. */
export function summaryCounts(r: FixtureRun): SummaryCounts {
  return { seeds: r.seeds, ...r.counts };
}

/** Merges fixture runs into a summary (a summary at another seed count is replaced, never mixed). */
export function mergeSummary(prev: EdgeSummary | null, runs: readonly FixtureRun[], seeds: number = SEEDS): EdgeSummary {
  const fixtures: Record<string, SummaryCounts> = prev !== null && prev.seedsPerFixture === seeds ? { ...prev.fixtures } : {};
  for (const r of runs) fixtures[r.id] = summaryCounts(r);
  const sorted: Record<string, SummaryCounts> = {};
  for (const k of Object.keys(fixtures).sort()) sorted[k] = fixtures[k];
  const totals = { fixtures: 0, seeds: 0, absorbed: 0, laddered: 0, 'left-out': 0, 'refused-safe': 0, 'refused-residue': 0, defined: 0, off: 0, crash: 0, hang: 0, offOutcome: 0 };
  for (const c of Object.values(sorted)) {
    totals.fixtures += 1;
    for (const k of Object.keys(c) as (keyof SummaryCounts)[]) totals[k] += c[k];
  }
  const cov = edgeCoverage();
  return { item: 'M0-x-06', seedsPerFixture: seeds, fixtures: sorted, totals, coverage: { ...cov.counts, problems: cov.problems.length } };
}

function sleep(ms: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

/**
 * Writes the runs into the summary when PLAT_EDGE_SUMMARY=1 (each test file at its end; the files run in parallel, so the
 * read-merge-write holds a lock directory outside the tree, and the file is replaced by a rename).
 */
export function recordSummary(runs: readonly FixtureRun[], path: string = SUMMARY_PATH): boolean {
  if (!summaryWanted() || runs.length === 0) return false;
  const lock = join(tmpdir(), `plat-edge-summary-${path.replace(/[^A-Za-z0-9]/g, '_')}.lock`);
  for (let i = 0; ; i += 1) {
    try {
      mkdirSync(lock);
      break;
    } catch {
      if (i >= 600) throw new Error(`recordSummary: the lock ${lock} is held (a stale lock from a killed run: remove it)`);
      sleep(100);
    }
  }
  try {
    let prev: EdgeSummary | null = null;
    try {
      prev = JSON.parse(readFileSync(path, 'utf8')) as EdgeSummary;
    } catch {
      prev = null;
    }
    const next = mergeSummary(prev, runs);
    writeFileSync(`${path}.tmp`, `${JSON.stringify(next, null, 2)}\n`);
    renameSync(`${path}.tmp`, path);
  } finally {
    rmdirSync(lock);
  }
  return true;
}
