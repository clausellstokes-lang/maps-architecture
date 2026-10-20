// bench/src/crosshost — the cross-host harness's command (M0-d-06; §6.5 (9), §13.3, §12.1; C-0028, C-0051, C-0067,
// C-0082). The scaffold created this folder empty (M0-s-01, C-0013); it belongs to M0-d-06.
//
//   corepack pnpm bench -- crosshost run <fixture> [--timing] [--legs <leg,…>] [--workers off|on|both]
//
// <fixture> is a plat/-relative path of a fixture file, or a name of fixtures/ here (`kernel`: the kernel fixtures).
// Runs the fixture's stages on the legs (default all five: node-arm64, node-x64-rosetta, chromium, firefox, webkit),
// each with workers off and on (default both), compares every run with the reference (Node arm64, workers off) and
// names the first differing stage and seed. `--timing` adds the harness's per-stage wall-clock per seed to every cell
// (C-0082: informative here; the timing phase stamps and judges it). Writes the full report to
// $PLAT_BENCH_OUT/crosshost-<id>.json and, for the kernel fixture's FULL run only (all five legs, workers off and on,
// timing off), the numbers-only summary to docs/build/summaries/M0-d-06.json (C-0067); a narrowed run leaves the
// committed summary as it is and says so (C-0394 (4)). Exit 0 when every run asked for ran and agrees (pass), 1 on a difference
// or a failed run (fail), 3 when the runs that ran agree but a leg is blocked on this machine (incomplete — never a
// pass), 64 on a bad argument. PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 is set before playwright-core loads; a browser is
// launched only from the Playwright cache (C-0028).
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CROSSHOST_LEGS,
  CROSSHOST_PLAT_ROOT,
  CROSSHOST_WORKERS,
  crossHostReportLines,
  crossHostTimes,
  loadCrossHostFixture,
  runCrossHost,
  type CrossHostLegId,
  type CrossHostReport,
  type CrossHostRunOptions,
  type CrossHostWorkers,
} from '@plat/testkit';
import { outDir, say, writeJson } from '../timing/output.js';

process.env['PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD'] = '1';

/** The fixtures folder (bench/src/crosshost/fixtures/), plat/-relative. */
export const CROSSHOST_FIXTURES = 'bench/src/crosshost/fixtures';
/** The kernel fixture, whose run writes the item's summary. */
export const KERNEL_FIXTURE = `${CROSSHOST_FIXTURES}/kernel.json`;
/** The item's numbers-only summary (C-0067). */
export const SUMMARY_PATH = fileURLToPath(new URL('../../../docs/build/summaries/M0-d-06.json', import.meta.url));
/** The full report's cap in PLAT_BENCH_OUT (a 100-seed spike-city report fits). */
export const REPORT_CAP_BYTES = 16 * 1024 * 1024;
/** The exit code of an incomplete run (the runs that ran agree; a leg is blocked here). */
export const EXIT_INCOMPLETE = 3;

const USAGE = 'usage: corepack pnpm bench -- crosshost run <fixture> [--timing] [--legs <leg,…>] [--workers off|on|both]';

/** The dispatcher's context, with the paths and options a test may set. */
export interface CrossHostContext {
  out: string;
  /** The summary file (default SUMMARY_PATH; written for the kernel fixture only). */
  summary?: string;
  /** Runner options a test passes through (the cache root's environment, child reporting). */
  runner?: Pick<CrossHostRunOptions, 'env' | 'onChild' | 'timeoutMs'>;
}

/** The parsed command line, or the reason it is refused. */
export type CrossHostArgs =
  | { ok: true; fixture: string; timing: boolean; legs: CrossHostLegId[]; workers: CrossHostWorkers[] }
  | { ok: false; message: string };

/** Parses `run <fixture> [--timing] [--legs …] [--workers …]`. */
export function parseCrossHostArgs(args: readonly string[]): CrossHostArgs {
  if (args[0] !== 'run') return { ok: false, message: `crosshost: the command is run; ${USAGE}` };
  let fixture: string | undefined;
  let timing = false;
  let legs: CrossHostLegId[] = [...CROSSHOST_LEGS];
  let workers: CrossHostWorkers[] = [...CROSSHOST_WORKERS];
  for (let i = 1; i < args.length; i += 1) {
    const a = args[i];
    if (a === '--timing') {
      if (timing) return { ok: false, message: `crosshost: --timing twice; ${USAGE}` };
      timing = true;
    } else if (a === '--legs') {
      const v = args[i + 1];
      i += 1;
      const list = v === undefined ? [] : v.split(',');
      if (list.length === 0 || list.some((l) => !(CROSSHOST_LEGS as readonly string[]).includes(l)) || new Set(list).size !== list.length) {
        return { ok: false, message: `crosshost: --legs takes distinct legs of ${CROSSHOST_LEGS.join(', ')}; ${USAGE}` };
      }
      legs = CROSSHOST_LEGS.filter((l) => list.includes(l));
    } else if (a === '--workers') {
      const v = args[i + 1];
      i += 1;
      if (v === 'both') workers = [...CROSSHOST_WORKERS];
      else if (v === 'off' || v === 'on') workers = [v];
      else return { ok: false, message: `crosshost: --workers takes off, on or both; ${USAGE}` };
    } else if (a.startsWith('--') || fixture !== undefined) {
      return { ok: false, message: `crosshost: an unknown argument ${JSON.stringify(a)}; ${USAGE}` };
    } else fixture = a;
  }
  if (fixture === undefined) return { ok: false, message: `crosshost: no fixture; ${USAGE}` };
  return { ok: true, fixture, timing, legs, workers };
}

/** A fixture argument as a plat/-relative path: a bare name is a file of fixtures/. */
export function fixturePath(arg: string): string {
  return /^[a-z0-9][a-z0-9.-]*$/.test(arg) && !arg.endsWith('.json') ? `${CROSSHOST_FIXTURES}/${arg}.json` : arg;
}

/** Is this the full run, the only one whose report the committed summary records: every leg, both workers settings, no timing? */
function isFullRun(p: { legs: readonly CrossHostLegId[]; workers: readonly CrossHostWorkers[]; timing: boolean }): boolean {
  return !p.timing && CROSSHOST_LEGS.every((l) => p.legs.includes(l)) && CROSSHOST_WORKERS.every((w) => p.workers.includes(w));
}

/** The report's numbers-only summary (C-0067): counts and statuses, no prose. */
export function crossHostSummary(r: CrossHostReport): Record<string, unknown> {
  return {
    item: 'M0-d-06',
    fixture: r.fixture,
    seeds: r.seeds.length,
    stages: r.stages.length,
    cellsPerRun: r.cellsPerRun,
    timing: r.timing,
    reference: `${r.reference.leg}/${r.reference.workers}`,
    comparedWith: r.comparedWith === null ? null : `${r.comparedWith.leg}/${r.comparedWith.workers}`,
    runs: r.runs.map((x) => ({
      leg: x.leg,
      workers: x.workers,
      status: x.status,
      ...(x.host !== undefined ? { engine: `${x.host.engine.name} ${x.host.engine.version}`, arch: x.host.arch, kind: x.host.kind } : {}),
      ...(x.thread !== undefined ? { thread: x.thread } : {}),
      ...(x.agrees !== undefined ? { agrees: x.agrees } : {}),
    })),
    ran: r.runs.filter((x) => x.status === 'ran').length,
    blocked: r.runs.filter((x) => x.status === 'blocked').length,
    failed: r.runs.filter((x) => x.status === 'failed').length,
    differences: r.differences.length,
    verdict: r.verdict,
  };
}

/** The dispatcher's entry: `bench -- crosshost run <fixture> …` (C-0059). */
export async function run(args: string[], ctx: CrossHostContext): Promise<number> {
  const p = parseCrossHostArgs(args);
  if (!p.ok) {
    say(p.message);
    return 64;
  }
  const path = fixturePath(p.fixture);
  let fixture;
  try {
    fixture = loadCrossHostFixture(path);
  } catch (e) {
    say(e instanceof Error ? e.message : String(e));
    return 64;
  }
  const report = await runCrossHost(fixture, { legs: p.legs, workers: p.workers, timing: p.timing, ...(ctx.runner ?? {}) });
  const dir = outDir(ctx.out);
  const full = writeJson(dir, `crosshost-${fixture.id}.json`, { item: 'M0-d-06', report, ...(p.timing ? { times: crossHostTimes(report) } : {}) }, REPORT_CAP_BYTES);
  for (const line of crossHostReportLines(report)) say(line);
  if (p.timing) {
    for (const t of crossHostTimes(report)) {
      say(`timing ${t.leg} workers ${t.workers} (informative; the timing phase stamps and judges, C-0082): ${t.stages.map((s) => `${s.stage} p50 ${s.medianMs.toFixed(3)} ms`).join(', ')}`);
    }
  }
  if (fixture.source === KERNEL_FIXTURE) {
    const summaryPath = ctx.summary ?? SUMMARY_PATH;
    const rel = relative(CROSSHOST_PLAT_ROOT, summaryPath);
    const shown = rel.startsWith('..') || rel === '' ? summaryPath : rel;
    if (isFullRun(p)) {
      mkdirSync(dirname(summaryPath), { recursive: true });
      writeFileSync(summaryPath, `${JSON.stringify(crossHostSummary(report), null, 2)}\n`);
      say(`crosshost: summary ${shown}`);
    } else {
      say(`crosshost: summary ${shown} not written: a narrowed run (legs ${p.legs.join(',')}; workers ${p.workers.join(',')}; timing ${p.timing ? 'on' : 'off'}) — the summary records the full run only (all five legs, workers off and on, timing off)`);
    }
  }
  say(`crosshost: full report ${full.path}${full.dropped > 0 ? ` (truncated: ${String(full.dropped)} bytes dropped)` : ''}`);
  return report.verdict === 'pass' ? 0 : report.verdict === 'fail' ? 1 : EXIT_INCOMPLETE;
}

