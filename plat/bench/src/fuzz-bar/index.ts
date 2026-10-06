// bench/src/fuzz-bar — the B-FUZZ bar as a tier's entry (M0-k-04; §13.1, §13.8, §16 M0 (a); C-0038, C-0067, C-0091,
// C-0107, C-0110). The folder was created empty by the scaffold (M0-s-01, C-0013) and belongs to M0-k-04.
//
// `corepack pnpm bench -- fuzz-bar [--runs N] [--first I] [--primitive NAME] [--constructive-seeds N] [--s11 N]
//  [--s11-timing] [--no-sweeps] [--no-summary]` runs every kernel primitive's B-FUZZ at N inputs (PLAT_FUZZ_RUNS, 10⁴ when unset —
// the PR size; the nightly sets 10⁶), the whole constructive set against the kernel (every M0 case at its draws, the
// sweeps whole; every deferred case counted by its milestone), the kernel ladders' coverage table and the S11
// workload's call-list check, folds them into the counts report, writes the full report to
// $PLAT_BENCH_OUT/fuzz-bar/report.json and — for a whole run (every primitive, from index 0) — the numbers-only summary
// to docs/build/summaries/M0-k-04.json, and exits 0 when the bar holds (0 crashes, 0 hangs, 0 invalid outputs, every M0
// case green, every built kernel rung reached, bugs empty), 1 when it does not, 64 on a bad argument. `--primitive`
// runs one primitive alone (the nightly size's reach check, a partition with `--first`). `--s11-timing` times the S11
// workload through M0-f-01's harness (stamped; CONTENDED outside the timing phase, never judged — M0-t-01 measures it).
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  casesAt,
  CONSTRUCTIVE_SET,
  constructiveRun,
  countsReport,
  countsSummary,
  FUZZ_PRIMITIVES,
  fuzzCountsPass,
  fuzzRuns,
  ladderCoverage,
  loadOracles,
  runConstructiveOnKernel,
  runFuzz,
  type CountsReport,
  type FuzzReport,
} from '@plat/testkit';
import { outDir, say, writeJson } from '../timing/output.js';
import { s11Workload, type S11Plot } from './s11Workload.js';

export { S11_PLOT_KINDS, s11Calls, s11Plots, s11Workload, spyKernel, type S11Call, type S11Plot, type S11Workload } from './s11Workload.js';

/** plat/ (this file is bench/src/fuzz-bar/index.ts). */
export const PLAT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

/** The numbers-only summary (C-0067). */
export const SUMMARY_PATH = join(PLAT_ROOT, 'docs', 'build', 'summaries', 'M0-k-04.json');

/** Constructive draws per M0 case in a run (the sweeps run whole): the PR tier's, and the nightly's at 10⁶ (C-0227 (13)). */
export const CONSTRUCTIVE_SEEDS_PR = 10;
export const CONSTRUCTIVE_SEEDS_NIGHTLY = 100;

/** S11 plots checked per run (the call list's; the timing phase's own size is M0-t-01's). */
export const S11_PLOTS = 50;

const USAGE = 'usage: corepack pnpm bench -- fuzz-bar [--runs N] [--first I] [--primitive NAME] [--constructive-seeds N] [--s11 N] [--s11-timing] [--no-sweeps] [--no-summary]';

/** The dispatcher's context, with the summary path a test may redirect. */
export interface FuzzBarContext {
  out: string;
  summary?: string;
  /** Replaces `runFuzz` (the entry's own tests plant a primitive report: the bar's decision and exit read it). */
  runFuzz?: typeof runFuzz;
}

function intArg(args: readonly string[], name: string, lo: number, hi: number): number | undefined | null {
  const i = args.indexOf(name);
  if (i < 0) return undefined;
  const v = Number(args[i + 1]);
  return Number.isInteger(v) && v >= lo && v <= hi ? v : null;
}

/** The S11 workload's call-list check: every plot exactly one offsetFace, obb, lir and L4 insertChain, ≥ 1 L4 splitFace. */
export function s11Problems(plots: readonly S11Plot[]): string[] {
  const out: string[] = [];
  for (const p of plots) {
    const n = (op: string, level?: number) => p.calls.filter((c) => c.op === op && (level === undefined || c.level === level)).length;
    if (n('offsetFace') !== 1 || n('obb') !== 1 || n('lir') !== 1 || n('insertChain') !== 1 || n('insertChain', 4) !== 1 || n('splitFace', 4) < 1 || n('splitFace') !== n('splitFace', 4)) {
      out.push(`plot ${String(p.index)}: ${p.calls.map((c) => `${c.op}${c.level ?? ''}`).join(' ')}`);
    }
  }
  return out;
}

/** The dispatcher's entry. */
export async function run(args: string[], ctx: FuzzBarContext): Promise<number> {
  const known = new Set(['--runs', '--first', '--primitive', '--constructive-seeds', '--s11', '--s11-timing', '--no-sweeps', '--no-summary']);
  const flags = new Set(['--s11-timing', '--no-sweeps', '--no-summary']);
  for (let i = 0; i < args.length; i++) {
    if (!known.has(args[i])) {
      say(`fuzz-bar: unknown argument ${JSON.stringify(args[i])}; ${USAGE}`);
      return 64;
    }
    if (!flags.has(args[i])) i++;
  }
  let runs: number | undefined | null;
  try {
    const given = intArg(args, '--runs', 1, 10_000_000);
    runs = given === undefined ? fuzzRuns() : given; // a malformed --runs is refused below, never read as the default
  } catch (e) {
    say(`fuzz-bar: ${e instanceof Error ? e.message : String(e)}`);
    return 64;
  }
  const first = intArg(args, '--first', 0, 1_000_000_000);
  const seeds = intArg(args, '--constructive-seeds', 1, 100_000);
  const plots = intArg(args, '--s11', 1, 100_000);
  const pi = args.indexOf('--primitive');
  const only = pi < 0 ? undefined : args[pi + 1];
  if (runs === null || first === null || seeds === null || plots === null || (only !== undefined && !FUZZ_PRIMITIVES.some((p) => p.name === only))) {
    say(`fuzz-bar: bad argument (primitives: ${FUZZ_PRIMITIVES.map((p) => p.name).join(', ')}); ${USAGE}`);
    return 64;
  }
  const dir = join(outDir(ctx.out), 'fuzz-bar');
  mkdirSync(dir, { recursive: true });
  await loadOracles();
  const t0 = performance.now();
  const reports: FuzzReport[] = [];
  for (const p of FUZZ_PRIMITIVES) {
    if (only !== undefined && p.name !== only) continue;
    const t = performance.now();
    const r = (ctx.runFuzz ?? runFuzz)(p.name, runs, { first: first ?? 0 });
    reports.push(r);
    say(`fuzz-bar: ${p.name.padEnd(14)} ${String(r.runs)} inputs: ${String(r.crashes)} crashes, ${String(r.hangs)} hangs, ${String(r.invalid)} invalid; refused ${JSON.stringify(r.refused)}; notes ${JSON.stringify(r.notes)}; ${String(r.downgrades)} downgrades; ${String(r.workLimitHits)} work-limit hits${r.oracle === null ? '' : `; oracle split ${JSON.stringify(r.oracle)}`} (${((performance.now() - t) / 1000).toFixed(1)} s CONTENDED)`);
    for (const f of r.failures.slice(0, 5)) say(`fuzz-bar:   ${f.kind} #${String(f.index)}: ${f.reason}`);
  }
  // The summary is a whole run's: every primitive from its first input (it records the draws and whether the sweeps ran whole).
  const whole = only === undefined && (first ?? 0) === 0;
  const perCase = seeds ?? (runs >= 1_000_000 ? CONSTRUCTIVE_SEEDS_NIGHTLY : CONSTRUCTIVE_SEEDS_PR);
  const t1 = performance.now();
  const cons = only === undefined ? runConstructiveOnKernel(CONSTRUCTIVE_SET, perCase, { sweeps: !args.includes('--no-sweeps') }) : runConstructiveOnKernel(CONSTRUCTIVE_SET.filter((c) => c.milestone !== 'M0'), 1);
  say(`fuzz-bar: constructive set ${String(cons.cases)} cases (${String(casesAt('M0').length)} M0): ${String(cons.judged)} judged over ${String(cons.draws)} draws, ${String(cons.green)} green, ${String(cons.failedCases)} failing, ${String(cons.known.length)} known findings (${cons.known.map((k) => k.id).join(', ')}), ${String(cons.staleKnown.length)} stale, ${String(cons.pending.length)} pending; deferred ${JSON.stringify(cons.deferred)} (${((performance.now() - t1) / 1000).toFixed(1)} s)`);
  for (const f of cons.failures.slice(0, 12)) say(`fuzz-bar:   ${f.id} #${String(f.seed)}: ${f.reason}`);
  const ladders = ladderCoverage();
  say(`fuzz-bar: kernel ladders ${String(ladders.rows.length)} rows, covered ${String(ladders.covered)}`);
  const s11 = await s11Workload(1, plots ?? S11_PLOTS, args.includes('--s11-timing') ? {} : { timing: false });
  const s11Bad = s11Problems(s11.calls);
  say(`fuzz-bar: S11 workload ${String(s11.calls.length)} plots, call lists ${s11Bad.length === 0 ? 'as listed' : `off on ${String(s11Bad.length)} plots`}${s11.timings === null ? '' : `; ${s11.timings.value.toFixed(1)} ${s11.timings.unit} per plot median, ${s11.timings.authority}`}`);
  const report: CountsReport = countsReport(runs, reports, constructiveRun(cons), ladders);
  const pass = (only === undefined ? report.pass : fuzzCountsPass(report.totals, report.bugs)) && s11Bad.length === 0;
  const full = writeJson(dir, 'report.json', { ...report, s11: { plots: s11.calls.length, problems: s11Bad, timing: s11.timings }, seconds: (performance.now() - t0) / 1000 });
  if (whole && !args.includes('--no-summary')) {
    const path = ctx.summary ?? SUMMARY_PATH;
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify({ ...countsSummary(report), constructiveDraws: { perCase: perCase, sweepsWhole: !args.includes('--no-sweeps') }, s11: { plots: s11.calls.length, callListsAsListed: s11Bad.length === 0 } }, null, 2)}\n`);
    say(`fuzz-bar: summary ${relative(PLAT_ROOT, path)}`);
  }
  say(`fuzz-bar: bar ${pass ? 'HOLDS' : 'FAILS'} — ${String(report.totals.crashes)} crashes, ${String(report.totals.hangs)} hangs, ${String(report.totals.invalid)} invalid outputs, ${String(report.bugs.length)} bugs; full report ${full.path}`);
  return pass ? 0 : 1;
}
