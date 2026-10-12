// bench/src/fusion — the fusion gate harness (M0-c-06; §4.4's fusion risk gate, §16 M0 (c), §12.4, §13.5, §13.2,
// §12.1; C-0016, C-0034, C-0067, C-0072, C-0080, C-0082, C-0084, C-0091, C-0094; readings C-0270). The folder was
// created empty by the scaffold (M0-s-01, C-0013) and belongs to M0-c-06.
//
//   corepack pnpm bench -- fusion [--from N] [--seeds N] [--runs fusion,integrated] [--workers W]
//                                 [--frame-ha N --walled-ha N] [--summary]
//   corepack pnpm bench -- fusion --timing [--timing-seeds N]
//
// runs `--seeds` seeds (1 000) of the flat CITY fixture from `--from` (1) through M0-x-02's runner, twice per seed
// (runs.ts): (a) the fusion run — S3's slice, S4, S5, then S8 over the walled coarse faces as stand-in districts banded
// by C-0034's ramp — and (b) the integrated run — S4 + S5 + S6 + S8 with S6's districts and pass-1 field; measures
// each (measure.ts) and folds the records (report.ts) into the FusionGateReport: the restart count (0), every ladder
// use, the turn histogram's cliff clause, the junction row (the integrated run's, C-0094), the growth-drift row, the
// block-area and cut-length distributions per band, the face counts, roads leaving each walled stage against N, lanes
// in a wall strip, S8 ≡ S9 (N-52 (1): Hausdorff ≤ 2 · √2 · attractCm on every block, the exact share reported), the
// refusal census (J264), the skeleton corpus bar on the district faces, the work per unit (C-0091)
// and the per-stage stamps (C-0084). The report goes to $PLAT_BENCH_OUT/fusion/report.json (no wall-clock in it: the
// same seeds give the same bytes), the stamps to stamps.json; the numbers-only summary to
// docs/build/summaries/M0-c-06.json only with --summary on a CITY run of both runs from seed 1 (checks/M0-spec-notes.md
// N-03): it states its own seed count against the bar's 1 000 and reads PENDING-LONG-RUN below it (C-0272's pattern,
// N-52 (6): the builder's 50-seed smoke, the session's 1 000-seed run).
// `--timing` times the fusion run in one stamped batch (timing.ts; the timing phase's, never judged here). Exit 0 when
// every bar judged holds, 1 when one does not, 64 on a bad argument. --workers W (or PLAT_BENCH_WORKERS) runs the
// tasks across W worker threads (the report does not depend on W).
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { outDir, say, writeJson } from '../timing/output.js';
import type { SeedRecord } from './measure.js';
import { runTasks, type Task } from './pool.js';
import { foldReport, foldStamps, summaryOf, type FusionGateReport, type FusionSizes, type StampFold } from './report.js';
import { RUN_KINDS, type RunKind } from './runs.js';
import { timeFusionGate } from './timing.js';

export { syntheticBandRamp, ringCentroid, type RampReading } from './ramp.js';
export { canonicalRing, compareRings, hausdorffCm, sameRing, vertexWithin, type RingComparison } from './hausdorff.js';
export { derive, fixtureBlueprint, fusionS8Stage, instrument, newInstruments, runRegistry, RUN_KINDS, sideOfRing, wallLines, type Derivation, type DeriveOptions, type FixtureSize, type Instruments, type RunKind, type StandIn } from './runs.js';
export { junctionRow, lanesInStrips, measure, metricDocOf, ringPassages, roadsLeaving, S8S9_BOUND_CM, S8S9_BOUND_SQ, S8S9_EXACT_FLOOR, s8s9, segmentEnters, stopKerb, stripFaces, turnRow, unitsOf, widthMap, workRows, type CorpusCounts, type HausdorffMiss, type KerbPlant, type MeasureOptions, type RefusalCensus, type S8S9Record, type SeedRecord, type WorkRow } from './measure.js';
export { BAR_SEEDS, binsCliff, CITY_FIGURES, DRIFT, foldReport, foldRun, foldStamps, foldWork, JUNCTION, longRunOf, quantiles, spread, summaryOf, type FusionGateReport, type FusionSizes, type Quantiles, type RunSummary, type SeedRow, type Spread, type StampFold, type Verdicts, type WorkCounter } from './report.js';
export { runTask, runTasks, type Task } from './pool.js';
export { GATE_ROW, R12_4_ROWS, timeFusionGate, type FusionTiming, type FusionTimingOptions } from './timing.js';

/** plat/ (this file is bench/src/fusion/index.ts). */
export const PLAT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

/** The numbers-only summary (C-0067). */
export const SUMMARY_PATH = join(PLAT_ROOT, 'docs', 'build', 'summaries', 'M0-c-06.json');

/** The bar's size: 1 000 seeds from seed 1, both runs, the CITY fixture (§16 M0 (c)). */
export const DEFAULT_SEEDS = 1_000;

const USAGE = 'usage: corepack pnpm bench -- fusion [--from N] [--seeds N] [--runs fusion,integrated] [--workers W] [--frame-ha N --walled-ha N] [--summary] | --timing [--timing-seeds N]';

/** The parsed arguments. */
export interface FusionArgs {
  readonly sizes: FusionSizes;
  readonly workers: number;
  readonly summary: boolean;
  readonly timing: { readonly seeds: number } | null;
}

/** The dispatcher's context, with what a test redirects. */
export interface FusionContext {
  out: string;
  summary?: string;
  onReport?: (r: FusionGateReport, stamps: StampFold) => void;
  /** Runs each task in this thread instead of pool.ts's `runTask` (the entry's tests plant a record). */
  runTask?: (t: Task) => SeedRecord;
}

function intArg(args: readonly string[], name: string, lo: number, hi: number): number | undefined | null {
  const i = args.indexOf(name);
  if (i < 0) return undefined;
  const raw = args[i + 1];
  if (raw === undefined || !/^[0-9]+$/.test(raw)) return null;
  const v = Number(raw);
  return Number.isInteger(v) && v >= lo && v <= hi ? v : null;
}

/** Parses the entry's arguments (a string: the refusal, exit 64). */
export function parseArgs(args: readonly string[], env: Readonly<Record<string, string | undefined>> = process.env): FusionArgs | string {
  const valued = new Set(['--from', '--seeds', '--runs', '--workers', '--frame-ha', '--walled-ha', '--timing-seeds']);
  const flags = new Set(['--summary', '--timing']);
  const seen = new Set<string>();
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (seen.has(a)) return `${a} given twice`;
    seen.add(a);
    if (flags.has(a)) continue;
    if (!valued.has(a)) return `unknown argument ${JSON.stringify(a)}`;
    i += 1;
  }
  const from = intArg(args, '--from', 0, 0xffffffff);
  const seeds = intArg(args, '--seeds', 1, 1_000_000);
  const frameHa = intArg(args, '--frame-ha', 100, 100_000);
  const walledHa = intArg(args, '--walled-ha', 1, 10_000);
  const timingSeeds = intArg(args, '--timing-seeds', 1, 10_000);
  const given = intArg(args, '--workers', 1, 64);
  const envWorkers = env.PLAT_BENCH_WORKERS;
  const workers = given !== undefined ? given : envWorkers === undefined || envWorkers === '' ? 1 : /^[1-9][0-9]?$/.test(envWorkers) && Number(envWorkers) <= 64 ? Number(envWorkers) : null;
  if (from === null || seeds === null || frameHa === null || walledHa === null || timingSeeds === null || workers === null) return 'a seed, size or worker count is not a whole number in its range';
  if ((frameHa === undefined) !== (walledHa === undefined)) return '--frame-ha and --walled-ha go together (a test size, C-0264 (10))';
  let runs: RunKind[] = [...RUN_KINDS];
  const ri = args.indexOf('--runs');
  if (ri >= 0) {
    const list = (args[ri + 1] ?? '').split(',');
    if (list.length === 0 || list.some((r) => !(RUN_KINDS as readonly string[]).includes(r))) return `--runs takes runs from ${RUN_KINDS.join(', ')}`;
    runs = RUN_KINDS.filter((r) => list.includes(r));
  }
  const timing = args.includes('--timing');
  if (!timing && seen.has('--timing-seeds')) return '--timing-seeds goes with --timing';
  const summary = args.includes('--summary');
  if (summary && (timing || frameHa !== undefined || ri >= 0 || (from !== undefined && from !== 1))) {
    return "--summary writes a CITY run's summary: seeds from 1, both runs, no test size, no --timing (it states its seed count)";
  }
  return {
    sizes: { from: from ?? 1, seeds: seeds ?? DEFAULT_SEEDS, runs, frameHa: frameHa ?? null, walledHa: walledHa ?? null },
    workers,
    summary,
    timing: timing ? { seeds: timingSeeds ?? 5 } : null,
  };
}

/** The tasks of a run: each seed's runs in order (seed, then run). */
export function tasksOf(sizes: FusionSizes): Task[] {
  const out: Task[] = [];
  for (let s = sizes.from; s < sizes.from + sizes.seeds; s += 1) {
    for (const run of sizes.runs) out.push({ seed: s, run, ...(sizes.frameHa === null ? {} : { frameHa: sizes.frameHa }), ...(sizes.walledHa === null ? {} : { walledHa: sizes.walledHa }) });
  }
  return out;
}

/** The harness: the records, the report and the stamps (see the module comment). */
export async function fusion(a: FusionArgs, log: (line: string) => void = () => {}, runner?: (t: Task) => SeedRecord): Promise<{ report: FusionGateReport; stamps: StampFold; records: SeedRecord[] }> {
  const tasks = tasksOf(a.sizes);
  let shown = 0;
  const records = await runTasks(
    tasks,
    a.workers,
    (done, total) => {
      const tenth = Math.floor((10 * done) / total);
      if (total >= 20 && tenth > shown) {
        shown = tenth;
        log(`fusion: ${String(done)} / ${String(total)} runs`);
      }
    },
    runner,
  );
  return { report: foldReport(a.sizes, records), stamps: foldStamps(records), records };
}

function f2(x: number | null): string {
  return x === null || !Number.isFinite(x) ? 'n/a' : x.toFixed(2);
}

function pct(x: number): string {
  return Number.isFinite(x) ? `${(100 * x).toFixed(2)} %` : 'n/a';
}

/** The dispatcher's entry. */
export async function run(args: string[], ctx: FusionContext): Promise<number> {
  const a = parseArgs(args);
  if (typeof a === 'string') {
    say(`fusion: ${a}; ${USAGE}`);
    return 64;
  }
  const dir = join(outDir(ctx.out), 'fusion');
  mkdirSync(dir, { recursive: true });
  if (a.timing !== null) {
    const seeds = Array.from({ length: a.timing.seeds }, (_, i) => a.sizes.from + i);
    say(`fusion: timing the fusion run on seeds ${String(seeds[0])} – ${String(seeds[seeds.length - 1])} (one stamped batch; the timing phase's figure, never judged outside it)`);
    const t = await timeFusionGate({ seeds, ...(a.sizes.frameHa === null ? {} : { frameHa: a.sizes.frameHa, walledHa: a.sizes.walledHa ?? undefined }) });
    const path = writeJson(dir, 'timing.json', t);
    say(`fusion: S4 + S5 + S8 median ${t.result.value.toFixed(1)} ms (${t.result.authority}${t.result.flags.length > 0 ? `, ${t.result.flags.join(', ')}` : ''}); judged ${t.judgement.verdict}: ${t.judgement.reason}; ${path.path}`);
    for (const r of t.r12_4) say(`fusion:   R12-4 ${r.stage} p50 ${f2(r.p50)} ms against ${String(r.figureMs)} ms${r.exceeds ? ' (exceeds)' : ''}`);
    return 0;
  }
  const t0 = performance.now();
  say(`fusion: seeds ${String(a.sizes.from)} – ${String(a.sizes.from + a.sizes.seeds - 1)}, runs ${a.sizes.runs.join(', ')}${a.sizes.frameHa === null ? ' (CITY)' : ` (test size: ${String(a.sizes.frameHa)} ha frame, ${String(a.sizes.walledHa)} ha walled)`}; ${String(a.workers)} worker(s)`);
  const { report: r, stamps } = await fusion(a, say, ctx.runTask);
  const seconds = (performance.now() - t0) / 1000;
  for (const s of r.runs) {
    say(`fusion: [${s.run}] ${String(s.seeds)} seeds: restarts ${String(s.restarts.total)} (S5 sequence violations ${String(s.restarts.s5Violations)}), bugs ${String(s.bugs.entries)}, ladder uses ${String(s.ladderUses)}`);
    say(`fusion: [${s.run}] faces per seed: districts p50 ${f2(s.faces.districts.p50)} (≈ ${String(s.faces.figures.districts)}), cuts p50 ${f2(s.faces.cuts.p50)} (≈ ${String(s.faces.figures.cuts)}), blocks p50 ${f2(s.faces.blocks.p50)}, S8 refusals ${String(s.faces.s8Refused)}`);
    say(`fusion: [${s.run}] junctions: per seed p5 ≥ ${f2(s.junction.perSeed.p5Min)}°, median ${f2(s.junction.perSeed.medianMin)} – ${f2(s.junction.perSeed.medianMax)}°, 4-way ≤ ${pct(s.junction.perSeed.share4Max)}; pooled p5 ${f2(s.junction.pooled.p5)}°, median ${f2(s.junction.pooled.median)}°, 4-way ${pct(s.junction.pooled.share4)} of ${String(s.junction.pooled.nodes)}`);
    say(`fusion: [${s.run}] turns: ${String(s.turns.steps)} steps of 10 m, ${pct(s.turns.over15Share)} above 15°, cliff on ${String(s.turns.cliffSeeds)} seeds, pooled ${s.turns.pooledCliff ? 'CLIFF' : 'no cliff'}; drift ${String(s.drift.windows)} windows p50 ${f2(s.drift.p50)}° p90 ${f2(s.drift.p90)}°, ${String(s.drift.over90)} above 90°${s.drift.medianJudged ? '' : ' (median descriptive below 20 windows)'}`);
    say(`fusion: [${s.run}] roads leaving the walled stages: ${String(s.roads.mismatches)} of ${String(s.roads.stages)} off N; lanes in a wall strip ${String(s.strips.crossings)} of ${String(s.strips.lanes)}`);
    say(`fusion: [${s.run}] S8 ≡ S9: ${String(s.s8s9.beyond)} of ${String(s.s8s9.compared)} beyond ${f2(s.s8s9.boundCm)} cm (max ${f2(s.s8s9.maxCm)} cm); exact ${String(s.s8s9.zero)} (${pct(s.s8s9.exactShare)}), within 1 cm ${String(s.s8s9.within1cm)}, distance quantiles of the misses ${JSON.stringify(s.s8s9.missCm)}; stop kerb drifted on ${String(s.s8s9.drifted)} (max ${f2(s.s8s9.driftMaxCm)} cm, ${String(s.s8s9.driftBeyond)} beyond); S9 unions refused ${String(s.s8s9.s9Refused)}, kerb reads refused ${String(s.s8s9.kerbReads)}`);
    say(`fusion: [${s.run}] refusals: ${JSON.stringify(s.refusals.total)} on ${String(s.refusals.seeds)} seed(s)`);
    say(`fusion: [${s.run}] skeleton corpus on ${String(s.corpus.roof.faces)} district faces: roof ${pct(s.corpus.roof.downgradeShare)} downgrades, ${pct(s.corpus.roof.workLimitShare)} work-limit hits; spine ${pct(s.corpus.spine.downgradeShare)}, ${pct(s.corpus.spine.workLimitShare)}`);
  }
  for (const n of r.notes) say(`fusion:   ${n}`);
  const full = writeJson(dir, 'report.json', r);
  writeJson(dir, 'stamps.json', stamps);
  if (a.summary) {
    const path = ctx.summary ?? SUMMARY_PATH;
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify(summaryOf(r, stamps), null, 2)}\n`);
    say(`fusion: summary ${relative(PLAT_ROOT, path)}`);
  }
  say(`fusion: S4 + S5 + S8 per fusion seed p50 ${f2(stamps.gateMs.p50)} ms (${stamps.authority}, never judged here)`);
  say(`fusion: bars ${r.pass ? 'HOLD' : 'FAIL'} ${JSON.stringify(r.verdicts)}; full report ${full.path} (${seconds.toFixed(0)} s)`);
  ctx.onReport?.(r, stamps);
  return r.pass ? 0 : 1;
}
