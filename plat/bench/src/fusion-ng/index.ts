// bench/src/fusion-ng — the fusion statistics harness, built NOW on synthetic files (M0-c-07; §16 M0 (c), §4.4's gate
// and its statistics fallback, §13.5's junction, MFCG street-signature, blocks and deep-block-interiors rows, the band
// rule and the ⟨M-1⟩ rule, §4.6's deep-interior shares; C-0018, C-0043, C-0071, C-0072, C-0092, C-0094, C-0101, C-0116,
// C-0117; readings C-0440). The folder was created empty by the scaffold (M0-s-01, C-0013, C-0059, C-0113); it belongs
// to M0-c-07, and M0-c-07a / M0-c-07b only run it over M-1's committed files.
//
//   corepack pnpm bench -- fusion-ng --phase a|b [--baselines <file>] [--from N] [--seeds N] [--frame-ha N --walled-ha N]
//        [--workers W] [--summary]
//        phase a: [--cells <file> [--apply]]
//        phase b: [--faces <file>] [--seed N] [--recalibrate <file> [--miss-from <summary>] [--apply]]
//                 [--gate-rerun [--gate-seeds N]]
//
// phase a  the fusion harness's statistics on the flat fixture's districts — M0-c-06's integrated run seed by seed
//          through its exported entry, read as M0-k-05's MetricDoc (stats.ts) — compared by the band rule through
//          M0-k-05's parity report: the junction row (median, p5, 4-way share) against the recomputed band, with the
//          declared shift beside M0-c-06's own verdict (C-0094); the MFCG rows that gate at M0 (T / Y share, intramural
//          dead ends, blocks per ha; C-0072); R4 and wall alignment reported as block-axis proxies (C-0018); lots per
//          block not measured (M1); the deep-interior row's court share (its NG cell gating, its MFCG cell the MFCG
//          preset's, reported); with --cells, §4.6's fitted default shares written as cells of interior.json
//          (tables.ts) — proposed into the output folder, or with --apply into plat/packages/tables/data/ (M0-c-07a's).
// phase b  NG's hood outlines read through M0-k-05's `loadNgFacesFile` (a refused record or a missing file stops the
//          run naming it) and run through the base registration with S8 on each outline as the district shape
//          (hoods.ts), --seeds derivation seeds per hood; the block-area KS and the junction-degree share against the
//          blocks and junction rows by the band rule (hoodstats.ts); with --recalibrate, the statistics fallback's
//          table change — the cut and band-table constants as a version bump with provenance and its choices row
//          (`recalibrate`, tables.ts), the hood runs re-judged with the recalibrated cut table — only on a statistics
//          miss (this run's, or a phase-a summary's named by --miss-from); with --gate-rerun, the gate re-run through
//          M0-c-06's entry (gate.ts) at --gate-seeds seeds, its report shape carried.
// Inputs are read only from inside plat/ (C-0067, §17.1 (3)): baselines.json, ng-faces.json, the cells files and the
// summary named, at their given paths. The report (report.ts, canonical form; no wall-clock) goes to
// $PLAT_BENCH_OUT/fusion-ng/report-<phase>.json, an earlier one removed first; --summary writes the run item's
// numbers-only summary (docs/build/summaries/M0-c-07a.json or M0-c-07b.json) with its `reviewed` block and `parityOurs`
// (C-0121), on a CITY run only. Exit 0 when every gating clause holds, 1 when one does not, 2 when the run stops on an
// input (a missing file, a refused record, row or cell, a recalibration that answers no miss), 64 on a bad argument.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseTable } from '@plat/tables';
import { BASELINES_FILE, loadNgFacesFile, NgFacesRefusal, parityCanonicalJson, type MetricDoc, type NgFacesFile } from '@plat/testkit';
import { CellWriteRefusal, NG_FACES_FILE, NgStop, readBaselinesInput, readInput, TABLES_DIR, type Clause, type InputFile, type RawTable, type WrittenTable } from '../bentcut-ng/index.js';
import { fusion, type FusionGateReport, type SeedRecord, type Task } from '../fusion/index.js';
import { outDir, say, writeTruncated } from '../timing/output.js';
import { failingOf } from './clauses.js';
import { censusOf, mergeCensus } from './census.js';
import { gateRerun, tablesLoaded } from './gate.js';
import { runHood, type HoodRecord, type HoodTask } from './hoods.js';
import { judgeHoods } from './hoodstats.js';
import { SUMMARY_FILES, summaryOf, type FusionStatisticsReport, type GateRerun, type Recalibration, type RefusalCensusReport, type RunSize } from './report.js';
import { judgeA, seedRun } from './stats.js';
import { interiorShares, readConstants, recalibrate, type TableWrite } from './tables.js';

export { clauseId, clausesOf, failingOf, judged, rowOwners, rowsDate, type GatePredicate } from './clauses.js';
export { addRecordCensus, addRefusal, addTotalsCensus, censusOf, mergeCensus, NOTE_FINDING, type CensusTally } from './census.js';
export { GATE_TABLES, gateArgs, gateCensus, gateRerun, reportShape, tablesLoaded } from './gate.js';
export { FRAME_MARGIN, GROUND, hoodSeed, hoodStage, placedOutline, runHood, type HoodBlock, type HoodRecord, type HoodTask, type XYcm } from './hoods.js';
export { gateB, HOOD_SPACING_CM, hoodCensus, hoodDocs, judgeHoods, ngAreasBeside, oursB, PHASE_B_METRICS, runClause } from './hoodstats.js';
export { RUN_ITEMS, SUMMARY_FILES, summaryOf, type FusionStatisticsReport, type GateRerun, type JunctionShift, type Recalibration, type RefusalCensusReport, type RefusalClass, type RunSize } from './report.js';
export { courtBeside, gateA, JUNCTION_CLAUSES, judgeA, junctionShift, MFCG_GATING, NOTE_MFCG_PRESET, oursA, PHASE_A_METRICS, seedRun, statsDoc } from './stats.js';
export { INTERIOR_TABLES, interiorProblem, interiorShares, NO_MISS, readConstants, recalibrate, RECALIBRATION_TABLES, SHARE_CELLS, SHARE_SUM_TOL, type Constants, type TableWrite } from './tables.js';

/** plat/ (this file is bench/src/fusion-ng/index.ts). */
export const PLAT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

/** The default sizes: phase a's fixture seeds, phase b's derivation seeds per hood, the gate re-run's seeds. */
export const DEFAULT_SIZES = Object.freeze({ from: 1, seedsA: 20, seedsB: 5, seed: 1, gateSeeds: 5 });

export const USAGE =
  'usage: corepack pnpm bench -- fusion-ng --phase a|b [--baselines <file>] [--from N] [--seeds N] [--frame-ha N --walled-ha N] [--workers W] [--summary] ' +
  '(phase a: [--cells <file> [--apply]]; phase b: [--faces <file>] [--seed N] [--recalibrate <file> [--miss-from <summary>] [--apply]] [--gate-rerun [--gate-seeds N]])';

/** The parsed arguments. */
export interface FusionNgArgs {
  readonly phase: 'a' | 'b';
  readonly baselines: string;
  readonly faces: string;
  readonly from: number;
  readonly seeds: number;
  readonly seed: number;
  readonly size: RunSize;
  readonly cells: string | undefined;
  readonly recalibrate: string | undefined;
  readonly missFrom: string | undefined;
  readonly apply: boolean;
  readonly gateRerun: boolean;
  readonly gateSeeds: number;
  readonly workers: number;
  readonly summary: boolean;
}

const VALUED = ['--phase', '--baselines', '--faces', '--from', '--seeds', '--seed', '--frame-ha', '--walled-ha', '--cells', '--recalibrate', '--miss-from', '--gate-seeds', '--workers'];
const FLAGS = ['--apply', '--summary', '--gate-rerun'];
const PHASE_ONLY: Readonly<Record<string, 'a' | 'b'>> = { '--cells': 'a', '--faces': 'b', '--seed': 'b', '--recalibrate': 'b', '--miss-from': 'b', '--gate-rerun': 'b', '--gate-seeds': 'b' };

function intIn(raw: string | undefined, lo: number, hi: number): number | null {
  if (raw === undefined || !/^[0-9]+$/.test(raw)) return null;
  const v = Number(raw);
  return v >= lo && v <= hi ? v : null;
}

/** Parses the entry's arguments; a message (exit 64) when refused. */
export function parseArgs(args: readonly string[], env: Readonly<Record<string, string | undefined>> = process.env): FusionNgArgs | string {
  const v = new Map<string, string>();
  const flags = new Set<string>();
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (FLAGS.includes(a)) {
      if (flags.has(a)) return `${a} given twice`;
      flags.add(a);
      continue;
    }
    if (!VALUED.includes(a)) return `unknown argument ${JSON.stringify(a)}`;
    if (v.has(a)) return `${a} given twice`;
    const val = args[i + 1];
    if (val === undefined) return `${a} needs a value`;
    v.set(a, val);
    i += 1;
  }
  const phase = v.get('--phase');
  if (phase !== 'a' && phase !== 'b') return '--phase a or --phase b is required';
  for (const [k, p] of Object.entries(PHASE_ONLY)) if ((v.has(k) || flags.has(k)) && p !== phase) return `${k} belongs to phase ${p}`;
  const from = v.has('--from') ? intIn(v.get('--from'), 0, 0xffffffff) : DEFAULT_SIZES.from;
  const seeds = v.has('--seeds') ? intIn(v.get('--seeds'), 1, 100_000) : phase === 'a' ? DEFAULT_SIZES.seedsA : DEFAULT_SIZES.seedsB;
  const seed = v.has('--seed') ? intIn(v.get('--seed'), 0, 0xffffffff) : DEFAULT_SIZES.seed;
  const gateSeeds = v.has('--gate-seeds') ? intIn(v.get('--gate-seeds'), 1, 100_000) : DEFAULT_SIZES.gateSeeds;
  const frameHa = v.has('--frame-ha') ? intIn(v.get('--frame-ha'), 100, 100_000) : undefined;
  const walledHa = v.has('--walled-ha') ? intIn(v.get('--walled-ha'), 1, 10_000) : undefined;
  const envW = env['PLAT_BENCH_WORKERS'];
  const workers = v.has('--workers') ? intIn(v.get('--workers'), 1, 64) : envW === undefined || envW === '' ? 1 : intIn(envW, 1, 64);
  if (from === null || seeds === null || seed === null || gateSeeds === null || frameHa === null || walledHa === null || workers === null) return 'a seed, size or worker count is not a whole number in its range';
  if ((frameHa === undefined) !== (walledHa === undefined)) return '--frame-ha and --walled-ha go together (a test size, C-0264 (10))';
  const apply = flags.has('--apply');
  if (apply && phase === 'a' && !v.has('--cells')) return '--apply in phase a writes the --cells file\'s interior shares: give --cells';
  if (apply && phase === 'b' && !v.has('--recalibrate')) return '--apply in phase b writes the --recalibrate file\'s constants: give --recalibrate';
  if (v.has('--miss-from') && !v.has('--recalibrate')) return '--miss-from names the miss a recalibration answers: give --recalibrate';
  if (v.has('--gate-seeds') && !flags.has('--gate-rerun')) return '--gate-seeds goes with --gate-rerun';
  const summary = flags.has('--summary');
  if (summary && frameHa !== undefined) return '--summary writes a run item\'s summary on the CITY fixture: no test size';
  return {
    phase,
    baselines: v.get('--baselines') ?? BASELINES_FILE,
    faces: v.get('--faces') ?? NG_FACES_FILE,
    from,
    seeds,
    seed,
    size: { frameHa: frameHa ?? null, walledHa: walledHa ?? null },
    cells: v.get('--cells'),
    recalibrate: v.get('--recalibrate'),
    missFrom: v.get('--miss-from'),
    apply,
    gateRerun: flags.has('--gate-rerun'),
    gateSeeds,
    workers,
    summary,
  };
}

/** The dispatcher's context: the output folder, plat/ (a test's), the report's reader and the in-thread runners. */
export interface FusionNgContext {
  out: string;
  platRoot?: string;
  onReport?: (r: FusionStatisticsReport) => void;
  /** Phase a's seed runner (the integrated run derived, read and measured: `seedRun` by default). */
  runSeed?: (seed: number, size: RunSize) => { record: SeedRecord; doc: MetricDoc };
  /** Phase b's hood runner (`runHood` by default). */
  runHood?: (t: HoodTask) => HoodRecord;
  /** The gate re-run's task runner (M0-c-06's own seam; the harness passes none). */
  gateRunner?: (t: Task) => SeedRecord;
}

/** A file the run writes (a table) after the report is judged. */
interface PendingWrite {
  readonly path: string;
  readonly text: string;
}

/** The raw table of a shipped table read from the data folder inside plat/. */
function tableSource(platRoot: string, id: string): { raw: RawTable; abs: string } {
  const src = readInput(platRoot, `${TABLES_DIR}/${id}.json`);
  return { raw: JSON.parse(src.bytes.toString('utf8')) as RawTable, abs: src.abs };
}

function refusedInput(e: unknown): never {
  if (e instanceof CellWriteRefusal || e instanceof NgFacesRefusal) throw new NgStop(e.message);
  throw e;
}

/** A phase-a summary's failing clauses (--miss-from): its `failing` list, read from inside plat/. */
function missOf(platRoot: string, p: string): { file: InputFile; failing: string[] } {
  const r = readInput(platRoot, p);
  let v: unknown;
  try {
    v = JSON.parse(r.bytes.toString('utf8'));
  } catch {
    throw new NgStop(`${r.file.path}: not JSON`);
  }
  const o = v as { item?: unknown; failing?: unknown };
  if (o === null || typeof o !== 'object' || o.item !== 'M0-c-07a' || !Array.isArray(o.failing) || !o.failing.every((x) => typeof x === 'string')) {
    throw new NgStop(`${r.file.path}: not a phase-a summary (item M0-c-07a with a failing list)`);
  }
  return { file: r.file, failing: o.failing as string[] };
}

/** The statistics clauses among the failing ones (the run and gate clauses are not statistics). */
function statisticsMiss(clauses: readonly Clause[]): string[] {
  return failingOf(clauses).filter((id) => id !== 'run' && id !== 'gate');
}

/** The comparison (both phases): its report and the files it would write. Throws NgStop on an input. */
export async function compare(a: FusionNgArgs, ctx: FusionNgContext, outFolder: string, log: (line: string) => void = () => {}): Promise<{ report: FusionStatisticsReport; writes: PendingWrite[] }> {
  const platRoot = ctx.platRoot ?? PLAT_ROOT;
  const baselines = readBaselinesInput(platRoot, a.baselines);
  const writes: PendingWrite[] = [];
  const mode: WrittenTable['mode'] = a.apply ? 'applied' : 'proposed';
  const sizes = { from: a.from, seeds: a.seeds, size: a.size };
  if (a.phase === 'a') {
    let cellsFile: InputFile | undefined;
    let tables: WrittenTable[] | undefined;
    if (a.cells !== undefined) {
      const c = readInput(platRoot, a.cells);
      cellsFile = c.file;
      const src = tableSource(platRoot, 'interior');
      let w: TableWrite;
      try {
        w = interiorShares(src.raw, c.bytes.toString('utf8'), c.file.path, mode);
      } catch (e) {
        refusedInput(e);
      }
      tables = [w.table];
      writes.push({ path: a.apply ? src.abs : join(outFolder, 'interior.json'), text: w.text });
    }
    const docs = new Map<number, MetricDoc>();
    const runner = ctx.runSeed ?? seedRun;
    const { report: gate, records } = await fusion(
      { sizes: { from: a.from, seeds: a.seeds, runs: ['integrated'], frameHa: a.size.frameHa, walledHa: a.size.walledHa }, workers: 1, summary: false, timing: null },
      (line) => log(`fusion-ng: phase a: ${line}`),
      (t) => {
        const r = runner(t.seed, a.size);
        docs.set(t.seed, r.doc);
        return r.record;
      },
    );
    const ordered = [...docs.keys()].sort((x, y) => x - y).map((s) => docs.get(s) as MetricDoc);
    const j = judgeA({ rows: baselines.rows, info: baselines.info, hash: baselines.hash, from: a.from, docs: ordered, records, gate });
    const failing = failingOf(j.clauses);
    const notes: string[] = [];
    if (j.shift.declared) notes.push(`DECLARED SHIFT (§13.5, C-0094): the junction row passes M0-c-06's thresholds and fails the recomputed band: ${j.shift.cells.filter((c) => c.verdict === 'fail').map((c) => `${c.id} ours ${String(c.ours)} band ${JSON.stringify(c.band)}`).join('; ')}`);
    if (tables !== undefined && a.apply) notes.push('interior.json applied: the deep-interior rule reads the new shares in a process started after this run (the tables are compiled into @plat/tables)');
    const report: FusionStatisticsReport = {
      item: 'M0-c-07',
      phase: 'a',
      inputs: { baselines: baselines.file, ...(cellsFile === undefined ? {} : { cells: cellsFile }), tables: tablesLoaded() },
      sizes,
      parityOurs: j.ours,
      parity: j.parity,
      clauses: j.clauses,
      beside: j.beside,
      shift: j.shift,
      ...(tables === undefined ? {} : { tables }),
      census: j.census,
      failing,
      pass: failing.length === 0,
      notes,
    };
    return { report, writes };
  }

  // phase b
  const nf = readInput(platRoot, a.faces);
  let ng: NgFacesFile;
  try {
    ng = loadNgFacesFile(nf.abs);
  } catch (e) {
    refusedInput(e);
  }
  const hoodRunner = ctx.runHood ?? runHood;
  const hoods = [...ng.hoods].sort((x, y) => x.id - y.id);
  const runAll = (cut?: Parameters<typeof parseTable>[1]): HoodRecord[] => {
    const out: HoodRecord[] = [];
    const table = cut === undefined ? undefined : parseTable('cut', cut);
    for (let s = 0; s < a.seeds; s += 1) {
      for (const hood of hoods) {
        out.push(hoodRunner({ hood, seed: a.seed, seedIndex: s, size: a.size, ...(table === undefined ? {} : { cut: table }) }));
        log(`fusion-ng: phase b ${String(out.length)} / ${String(a.seeds * hoods.length)} hood runs`);
      }
    }
    return out;
  };
  const records = runAll();
  const j = judgeHoods({ rows: baselines.rows, info: baselines.info, hash: baselines.hash, seed: a.seed, seeds: a.seeds, ng, records });
  const clauses: Clause[] = [...j.clauses];
  let census: RefusalCensusReport = j.census;
  const notes: string[] = [];
  let recalibration: Recalibration | undefined;
  let recalFile: InputFile | undefined;
  let missFile: InputFile | undefined;
  let written: WrittenTable[] = [];
  if (a.recalibrate !== undefined) {
    const c = readInput(platRoot, a.recalibrate);
    recalFile = c.file;
    const miss = statisticsMiss(clauses);
    if (a.missFrom !== undefined) {
      const m = missOf(platRoot, a.missFrom);
      missFile = m.file;
      for (const id of m.failing) if (!miss.includes(`phase a: ${id}`)) miss.push(`phase a: ${id}`);
    }
    const sources: Record<string, RawTable> = {};
    const abs: Record<string, string> = {};
    for (const id of ['cut', 'bands']) {
      const s = tableSource(platRoot, id);
      sources[id] = s.raw;
      abs[id] = s.abs;
    }
    let r: ReturnType<typeof recalibrate>;
    try {
      r = recalibrate(readConstants(c.bytes.toString('utf8'), c.file.path), miss, sources, mode);
    } catch (e) {
      refusedInput(e);
    }
    written = r.writes.map((w) => w.table);
    for (const w of r.writes) writes.push({ path: a.apply ? abs[w.table.table] : join(outFolder, `${w.table.table}.json`), text: w.text });
    const cutWrite = r.writes.find((w) => w.table.table === 'cut');
    let rejudged: Recalibration['rejudged'] = null;
    if (cutWrite !== undefined) {
      log('fusion-ng: phase b re-judged with the recalibrated cut table (in memory)');
      const again = judgeHoods({ rows: baselines.rows, info: baselines.info, hash: baselines.hash, seed: a.seed, seeds: a.seeds, ng, records: runAll(JSON.parse(cutWrite.text) as Parameters<typeof parseTable>[1]) });
      rejudged = again.clauses.filter((x) => x.gating).map((x) => ({ id: x.id, verdict: x.verdict, ours: x.ours }));
    }
    recalibration = {
      miss,
      tables: written,
      choicesRow: r.choicesRow,
      rejudged,
      note: `${cutWrite === undefined ? 'no cut cell changed: the hood runs were not re-judged' : 'the hood runs re-judged with the recalibrated cut table in memory'}; ${r.writes.some((w) => w.table.table === 'bands') ? 'the band table reaches the stages through @plat/tables, so it takes effect in a run started after --apply' : 'no band-table cell changed'}; the gate re-run reads the tables its process loaded`,
    };
  }
  let gate: GateRerun | undefined;
  if (a.gateRerun) {
    log(`fusion-ng: the gate re-run through M0-c-06's entry, seeds ${String(a.from)} – ${String(a.from + a.gateSeeds - 1)}`);
    const g = await gateRerun({ from: a.from, seeds: a.gateSeeds, size: a.size, out: join(outFolder, 'gate'), workers: a.workers, recalibrated: a.apply ? written : [], ...(ctx.gateRunner === undefined ? {} : { runner: ctx.gateRunner }) });
    gate = g.gate;
    census = mergeCensus(census, g.census);
    clauses.push({
      id: 'gate',
      metric: 'gate',
      key: 'all',
      verdict: g.gate.report.pass ? 'pass' : 'fail',
      gating: true,
      ours: null,
      reference: null,
      band: {},
      baselineIds: [],
      role: 'target',
      note: `M0-c-06's gate re-run (bench -- fusion ${g.gate.args.join(' ')}): exit ${String(g.gate.exit)}, bars ${g.gate.report.pass ? 'HOLD' : 'FAIL'} ${JSON.stringify(g.gate.report.verdicts)}; tables cut v${String(g.gate.tables['cut']?.version)}, bands v${String(g.gate.tables['bands']?.version)}${written.length > 0 ? `; recalibration in effect: ${String(g.gate.recalibrationInEffect)}` : ''}`,
    });
  }
  const failing = failingOf(clauses);
  const report: FusionStatisticsReport = {
    item: 'M0-c-07',
    phase: 'b',
    inputs: {
      baselines: baselines.file,
      ngFaces: { ...nf.file, referenceBuild: ng.referenceBuild, metricsVersion: ng.metricsVersion, hoods: ng.hoods.length, faces: ng.faces.length },
      ...(recalFile === undefined ? {} : { recalibrate: recalFile }),
      ...(missFile === undefined ? {} : { missFrom: missFile }),
      tables: tablesLoaded(),
    },
    sizes: { ...sizes, ...(a.gateRerun ? { gateSeeds: a.gateSeeds } : {}) },
    parityOurs: j.ours,
    parity: j.parity,
    clauses,
    beside: j.beside,
    ...(recalibration === undefined ? {} : { recalibration }),
    ...(gate === undefined ? {} : { gate }),
    census,
    failing,
    pass: failing.length === 0,
    notes,
  };
  return { report, writes };
}

/** The report's file name. */
export function reportName(phase: 'a' | 'b'): string {
  return `report-${phase}.json`;
}

/** The dispatcher's entry. */
export async function run(args: string[], ctx: FusionNgContext): Promise<number> {
  const a = parseArgs(args);
  if (typeof a === 'string') {
    say(`fusion-ng: ${a}; ${USAGE}`);
    return 64;
  }
  const dir = join(outDir(ctx.out), 'fusion-ng');
  mkdirSync(dir, { recursive: true });
  // An earlier run's report never stands for this one (M0-k-05's closing check, N-h).
  rmSync(join(dir, reportName(a.phase)), { force: true });
  const t0 = performance.now();
  const sizeText = a.size.frameHa === null ? 'CITY' : `test size ${String(a.size.frameHa)} ha frame, ${String(a.size.walledHa)} ha walled`;
  say(`fusion-ng: phase ${a.phase}; ${a.phase === 'a' ? `seeds ${String(a.from)} – ${String(a.from + a.seeds - 1)} of the integrated run` : `seed ${String(a.seed)}, ${String(a.seeds)} derivation seeds per hood`} (${sizeText})`);
  let out: { report: FusionStatisticsReport; writes: PendingWrite[] };
  try {
    out = await compare(a, ctx, dir, say);
  } catch (e) {
    if (e instanceof NgStop) {
      say(`fusion-ng stopped: ${e.message}`);
      return 2;
    }
    throw e;
  }
  const r = out.report;
  for (const w of out.writes) {
    mkdirSync(dirname(w.path), { recursive: true });
    writeFileSync(w.path, w.text);
  }
  for (const c of r.clauses) say(`fusion-ng: ${c.gating ? 'gate' : 'beside'} ${c.id}: ${c.verdict}; ours ${c.ours === null ? 'n/a' : String(c.ours)}${c.reference === null ? '' : `, reference ${String(c.reference)}`}${c.note === undefined ? '' : ` — ${c.note}`}`);
  if (r.shift !== undefined) say(`fusion-ng: junction row: M0-c-06 ${r.shift.m0c06 === null ? 'not judged' : r.shift.m0c06 ? 'pass' : 'fail'}, the band rule ${r.shift.bandRule ? 'pass' : 'fail'}; shift ${r.shift.direction}${r.shift.declared ? ' (DECLARED)' : ''}`);
  for (const n of r.notes) say(`fusion-ng: ${n}`);
  const verdict = r.pass ? 'the run passes (exit 0)' : 'the run fails (exit 1) — read the verdict before committing the table';
  for (const t of [...(r.tables ?? []), ...(r.recalibration?.tables ?? [])]) say(`fusion-ng: ${t.mode} ${t.table}.json version ${String(t.from)} → ${String(t.to)}, ${String(t.changes.length)} cells, provenance ${t.provenance}; ${verdict}`);
  if (r.recalibration !== undefined) say(`fusion-ng: the recalibration's choices row: ${r.recalibration.choicesRow}`);
  say(`fusion-ng: refusals ${String(r.census.total)}${r.census.classes.length > 0 ? `: ${r.census.classes.map((c) => `${c.source} ${c.code} ${String(c.count)}`).join('; ')}` : ''}`);
  const text = `${parityCanonicalJson(r)}\n`;
  const full = writeTruncated(dir, reportName(a.phase), text, 64 * 1024 * 1024);
  if (a.summary) {
    const path = join(ctx.platRoot ?? PLAT_ROOT, SUMMARY_FILES[a.phase]);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify(summaryOf(r), null, 2)}\n`);
    say(`fusion-ng: summary ${SUMMARY_FILES[a.phase]}`);
  }
  const seconds = (performance.now() - t0) / 1000;
  say(`fusion-ng: ${r.pass ? 'every gating clause holds' : `failing: ${r.failing.join(', ')}`}; report ${full.path} (${seconds.toFixed(0)} s CONTENDED, never judged)`);
  ctx.onReport?.(r);
  return r.pass ? 0 : 1;
}

/** Re-reads a written report (the canonical text) — a test's and a run item's check that it reproduces. */
export function readReport(path: string): FusionStatisticsReport {
  return JSON.parse(readFileSync(path, 'utf8')) as FusionStatisticsReport;
}

/** The gate report type, re-exported for the tests. */
export type { FusionGateReport };
