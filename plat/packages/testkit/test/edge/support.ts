// The edge suite's runner (M0-x-06; §13.2 B-EDGE: "the home's stated outcome, hard, 0 per 1 000"; C-0100): every built
// fixture at PLAT_EDGE_SEEDS seeds of its own family, each run judged; a throw is a crash, a run past HANG_MS a hang, and
// every failure names the fixture and the seed that replays it. No vitest import here, so a probe can load it.
import { performance } from 'node:perf_hooks';
import { EDGE_FIXTURES, edgeSeedCount, edgeSeeds, judgeEdgeOutcome, type EdgeFixture, type EdgeHandling } from '../../src/edge/index.js';

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
  return { absorbed: 0, laddered: 0, 'left-out': 0, 'refused-safe': 0, defined: 0, off: 0, crash: 0, hang: 0, offOutcome: 0 };
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
