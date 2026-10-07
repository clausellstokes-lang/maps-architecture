// bench/src/bentcut-ng — the NG comparison harness, built NOW on synthetic files (M0-b-05; §16 M0 (b), §13.5's bent-cut
// signature and blocks rows, §13.8's T34-1 – T41-1 on NG's recorded shapes, §17.1 (4); C-0043, C-0071, C-0073, C-0081,
// C-0086, C-0092, C-0101, C-0116, C-0117). The folder was created empty by the scaffold (M0-s-01, C-0013, C-0113); it
// belongs to M0-b-05, and M0-b-05a / M0-b-05b only run it over M-1's committed files.
//
//   corepack pnpm bench -- bentcut-ng --phase a|b --frame recorded|first --attempts N [--baselines <file>]
//        [--seed N] [--workers W] [--summary]
//        phase a: [--sig N] [--cells <file> [--apply]]
//        phase b: [--faces <file>] [--seeds N] [--flatten lo:hi:step | none] [--flatten-seeds N] [--apply --date YYYY-MM-DD]
//
// phase a  σ of our start on the M0 (b) synthetic faces (M0-b-04's signature run, --sig faces of each of the five
//          kinds), read under the FRAME RULE the run is given (frame.ts; a parameter, never a default), judged ± 0.02
//          against the bent-cut signature row through M0-k-05's parity report (verdicts.ts); the corner, arrival and
//          fillet shares reported beside the rows; with --cells, the re-fitted plot-depth rows and regime block-depth
//          minimums written as cells of granularity.json and regimes.json by the table-cell writer (cells.ts: the
//          cells, their provenance, a version bump, nothing else) — proposed into the output folder, or with --apply
//          into plat/packages/tables/data/ (M0-b-05a's hand-over).
// phase b  NG's recorded faces read through M0-k-05's `loadNgFaces` (a refused record stops the run naming it), each run
//          through our S8 at --seeds derivation seeds (ngruns.ts): T34-1 – T41-1 on the runs (tbars.ts); σ re-read
//          under the frame rule; the fillet share ± 0.05 against the row; the corner (≥ 80 %) and arrival (≥ 95 %)
//          clauses re-judged on our cuts with M0-b-04's metric functions, the rows beside; the block-area KS against the
//          blocks row and the cut-length KS against the cut-lengths-per-face row by the band rule's distribution clause
//          (⟨M-1⟩ cells: a missing row fails); NG's own shares on the same faces reported beside; and the cut.flattenM
//          search (flatten.ts) against NG's one-bend share on the faces — with --apply, its value written into
//          cut.json with provenance "M-1 <date>" (M0-b-05b's hand-over).
// Inputs are read only from inside plat/ (C-0067, §17.1 (3)): baselines.json, ng-faces.json and the cells file at their
// given paths. The report (report.ts, canonical form) goes to $PLAT_BENCH_OUT/bentcut-ng/report-<phase>.json, an
// earlier one removed first; --summary writes the run item's numbers-only summary (docs/build/summaries/M0-b-05a.json or
// M0-b-05b.json) with its `reviewed` block (C-0121). Exit 0 when every gating clause holds, 1 when one does not, 2 when
// the run stops on an input (a missing file, a refused record or row, a refused cell), 64 on a bad argument.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { H128, type Hash128 } from '@plat/kernel';
import { loadTable } from '@plat/tables';
import {
  BASELINES_FILE,
  cutArrival85,
  cutCornerMid,
  cutFillet,
  hash128Hex,
  insidePlat,
  loadNgFacesFile,
  NgFacesRefusal,
  parityCanonicalJson,
  ParityStop,
  platRelative,
  readBaselines,
  resolveInPlat,
  type Baseline,
  type MetricBlock,
  type MetricCut,
  type MetricDistrict,
  type MetricDoc,
  type NgFace,
  type NgFacesFile,
} from '@plat/testkit';
import { checkT41Registry, checksOf, tallies, T_BARS, type TBar, type TChecks } from './tbars.js';
import { outDir, say, writeTruncated } from '../timing/output.js';
import { runTask, runTasks, signatureRow, signatureTasks, signatureVersions, type FaceRecord, type FullRecord, type SignatureCut, type Task } from '../bentcut/index.js';
import { CellWriteRefusal, readCellsFile, tableText, writeCells, type RawTable } from './cells.js';
import { bendRowOf, DEFAULT_GRID, flattenSearch, gridValues, type FlattenGrid, type FlattenResult } from './flatten.js';
import { frameCuts, parseFrameRule, ruleText, sigmaUnder, type FrameRule } from './frame.js';
import { runNgTask, type NgRecord, type NgTask } from './ngruns.js';
import { runNgTasks } from './pool.js';
import { summaryOf, type InputFile, type NgComparisonReport, type NgRecordedSummary, type OursSummary, type WrittenTable } from './report.js';
import { absoluteClause, ARRIVAL_MIN, CORNER_MIN, holds, judgedReport, oursOf, reportClauses, type Clause } from './verdicts.js';

export { CellWriteRefusal, compactJson, readCellsFile, sameShape, tableText, writeCells, CELLS_SCHEMA, type CellChange, type CellEdit, type CellsFile, type RawTable } from './cells.js';
export { MAX_RULE_ATTEMPTS, frameCuts, parseFrameRule, ruleText, sigmaUnder, type FrameRule, type RuleCut } from './frame.js';
export { bendRowOf, bendTolerance, DEFAULT_GRID, flattenFold, flattenSearch, gridValues, MAX_GRID, type BendRow, type FlattenCandidate, type FlattenGrid, type FlattenOptions, type FlattenResult } from './flatten.js';
export { cutTableAt, kindOf, ngSeed, placedPolygon, runNgTask, type NgOurBlock, type NgOurCut, type NgRecord, type NgTask } from './ngruns.js';
export { runNgTasks } from './pool.js';
export { summaryOf, type InputFile, type NgComparisonReport, type NgRecordedSummary, type OursSummary, type WrittenTable } from './report.js';
export { checkFacePlans, checkPlan, checkT34, checkT39, checkT40, checkT41Registry, checkT41Run, checksOf, tallies, T_BARS, type TBar, type TCheck, type TChecks } from './tbars.js';
export {
  absoluteClause,
  ARRIVAL_MIN,
  CORNER_MIN,
  FILLET_TOL,
  holds,
  judgedReport,
  NOTE_BESIDE,
  oursOf,
  OVERRIDE_FILLET,
  OVERRIDE_SIGMA,
  PHASE_METRICS,
  reportClauses,
  SIGMA_TOL,
  withOverrides,
  type Clause,
  type OursSeeds,
} from './verdicts.js';

/** plat/ (this file is bench/src/bentcut-ng/index.ts). */
export const PLAT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

/** ng-faces.json's one place (C-0043), relative to plat/. */
export const NG_FACES_FILE = 'packages/testkit/baselines/ng-faces.json';
/** The tables' data folder, relative to plat/. */
export const TABLES_DIR = 'packages/tables/data';
/** The run items' summaries, relative to plat/ (C-0117). */
export const SUMMARY_FILES = Object.freeze({ a: 'docs/build/summaries/M0-b-05a.json', b: 'docs/build/summaries/M0-b-05b.json' });
/** The run items, by phase. */
export const RUN_ITEMS = Object.freeze({ a: 'M0-b-05a', b: 'M0-b-05b' });
/** The tables each phase writes (M0.md §2's hand-overs: granularity and regimes to M0-b-05a, cut to M0-b-05b). */
export const PHASE_TABLES = Object.freeze({ a: ['granularity', 'regimes'] as const, b: ['cut'] as const });

/** The default sizes: the signature's faces per kind (M0-b-04's), derivation seeds per NG face, the search's seeds. */
export const DEFAULT_SIZES = Object.freeze({ seed: 1, perKind: 100, seeds: 5, flattenSeeds: 1 });

export const USAGE =
  'usage: corepack pnpm bench -- bentcut-ng --phase a|b --frame recorded|first --attempts N [--baselines <file>] [--seed N] [--workers W] [--summary] ' +
  '(phase a: [--sig N] [--cells <file> [--apply]]; phase b: [--faces <file>] [--seeds N] [--flatten lo:hi:step|none] [--flatten-seeds N] [--apply --date YYYY-MM-DD])';

/** The parsed arguments. */
export interface NgArgs {
  readonly phase: 'a' | 'b';
  readonly rule: FrameRule;
  readonly baselines: string;
  readonly faces: string;
  readonly seed: number;
  readonly perKind: number;
  readonly seeds: number;
  readonly flatten: FlattenGrid | null;
  readonly flattenSeeds: number;
  readonly cells: string | undefined;
  readonly apply: boolean;
  readonly date: string | undefined;
  readonly workers: number;
  readonly summary: boolean;
}

const VALUED = ['--phase', '--frame', '--attempts', '--baselines', '--faces', '--seed', '--sig', '--seeds', '--flatten', '--flatten-seeds', '--cells', '--date', '--workers'];
const FLAGS = ['--apply', '--summary'];
const PHASE_ONLY: Readonly<Record<string, 'a' | 'b'>> = { '--sig': 'a', '--cells': 'a', '--faces': 'b', '--seeds': 'b', '--flatten': 'b', '--flatten-seeds': 'b', '--date': 'b' };

function intIn(raw: string | undefined, lo: number, hi: number): number | null {
  if (raw === undefined || !/^[0-9]+$/.test(raw)) return null;
  const v = Number(raw);
  return v >= lo && v <= hi ? v : null;
}

/** Parses the entry's arguments; a message (exit 64) when refused. */
export function parseArgs(args: readonly string[], env: Readonly<Record<string, string | undefined>> = process.env): NgArgs | string {
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
  for (const [k, p] of Object.entries(PHASE_ONLY)) if (v.has(k) && p !== phase) return `${k} belongs to phase ${p}`;
  const rule = parseFrameRule(v.get('--frame'), v.get('--attempts'));
  if (typeof rule === 'string') return rule;
  const seed = v.has('--seed') ? intIn(v.get('--seed'), 0, 0xffffffff) : DEFAULT_SIZES.seed;
  const perKind = v.has('--sig') ? intIn(v.get('--sig'), 1, 100_000) : DEFAULT_SIZES.perKind;
  const seeds = v.has('--seeds') ? intIn(v.get('--seeds'), 1, 1_000) : DEFAULT_SIZES.seeds;
  const flattenSeeds = v.has('--flatten-seeds') ? intIn(v.get('--flatten-seeds'), 1, 1_000) : DEFAULT_SIZES.flattenSeeds;
  const envW = env['PLAT_BENCH_WORKERS'];
  const workers = v.has('--workers') ? intIn(v.get('--workers'), 1, 64) : envW === undefined || envW === '' ? 1 : intIn(envW, 1, 64);
  if (seed === null || perKind === null || seeds === null || flattenSeeds === null || workers === null) return 'a size, seed or worker count is not a whole number in its range';
  let flatten: FlattenGrid | null = DEFAULT_GRID;
  const fl = v.get('--flatten');
  if (fl !== undefined) {
    if (fl === 'none') flatten = null;
    else {
      const m = /^([0-9]+(?:\.[0-9]+)?):([0-9]+(?:\.[0-9]+)?):([0-9]+(?:\.[0-9]+)?)$/.exec(fl);
      if (m === null) return '--flatten takes lo:hi:step in metres, or none';
      flatten = { lo: Number(m[1]), hi: Number(m[2]), step: Number(m[3]) };
      const g = gridValues(flatten);
      if (typeof g === 'string') return `--flatten: ${g}`;
    }
  }
  const date = v.get('--date');
  if (date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(date)) return '--date takes YYYY-MM-DD';
  const apply = flags.has('--apply');
  if (apply && phase === 'a' && !v.has('--cells')) return '--apply in phase a writes the --cells file\'s cells: give --cells';
  if (apply && phase === 'b' && (date === undefined || flatten === null)) return '--apply in phase b writes the calibrated cut.flattenM: give --date and run the search';
  return {
    phase,
    rule,
    baselines: v.get('--baselines') ?? BASELINES_FILE,
    faces: v.get('--faces') ?? NG_FACES_FILE,
    seed,
    perKind,
    seeds,
    flatten,
    flattenSeeds,
    cells: v.get('--cells'),
    apply,
    date,
    workers,
    summary: flags.has('--summary'),
  };
}

/** A stop on an input (exit 2): a missing file, a refused record, row or cell. */
export class NgStop extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NgStop';
  }
}

/** The sha256 of bytes, hex. */
export function sha256Hex(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex');
}

/** Reads an input inside plat/: its bytes and its record; a stop naming the file when it is missing. */
export function readInput(platRoot: string, p: string): { bytes: Buffer; file: InputFile; abs: string } {
  if (!insidePlat(platRoot, p)) throw new NgStop(`${p}: lies outside plat/ (§17.1 (3), C-0067)`);
  const abs = resolveInPlat(platRoot, p);
  if (!existsSync(abs)) throw new NgStop(`${p}: missing file`);
  const bytes = readFileSync(abs);
  return { bytes, abs, file: { path: platRelative(platRoot, abs), sha256: sha256Hex(bytes), bytes: bytes.length } };
}

/** The tables the run reads, by version and pinning hash. */
function tablesRead(): Record<string, { version: number; hash: string }> {
  const out: Record<string, { version: number; hash: string }> = {};
  for (const id of ['cut', 'granularity', 'regimes']) {
    const t = loadTable(id);
    out[id] = { version: t.version, hash: hash128Hex(t.hash) };
  }
  return out;
}

/** The parity side's date: the newest provenance date among the rows read (the report holds no wall-clock). */
function rowsDate(rows: readonly Baseline[]): string {
  let d = '';
  for (const r of rows) if (/^\d{4}-\d{2}-\d{2}/.test(r.date) && r.date.slice(0, 10) > d) d = r.date.slice(0, 10);
  return d === '' ? '1970-01-01' : d;
}

/** The baselines as the run reads them. */
export interface BaselinesInput {
  readonly rows: readonly Baseline[];
  readonly info: readonly string[];
  readonly hash: Hash128;
  readonly file: InputFile;
}

/** Reads baselines.json (M0-k-05's reader: a missing file, an unreadable row or a row lacking provenance stops it). */
export function readBaselinesInput(platRoot: string, p: string): BaselinesInput {
  const r = readInput(platRoot, p);
  try {
    const b = readBaselines(r.bytes.toString('utf8'), r.file.path);
    return { rows: b.rows, info: b.info, hash: H128(r.bytes), file: r.file };
  } catch (e) {
    if (e instanceof ParityStop) throw new NgStop(e.message);
    throw e;
  }
}

/** A run clause: every face built and run by S8, and some cut measured (fails the gate otherwise, never vacuous). */
function runClause(faces: number, setupRefused: number, s8Refused: number, cuts: number, setupGates: boolean): Clause {
  const ok = faces > 0 && s8Refused === 0 && (!setupGates || setupRefused === 0) && cuts > 0;
  return {
    id: 'run',
    metric: 'run',
    key: 'all',
    verdict: ok ? 'pass' : 'fail',
    gating: true,
    ours: cuts,
    reference: null,
    band: {},
    baselineIds: [],
    role: 'target',
    note: `${String(faces)} faces: ${String(setupRefused)} not built${setupGates ? '' : ' (generated faces the kernel refuses are not S8 inputs)'}, ${String(s8Refused)} refused by S8; ${String(cuts)} cuts measured`,
  };
}

/** A gated σ key ours has no cut for: notApplicable, gating (never a vacuous pass). */
function missingKey(metric: string, key: string): Clause {
  return { id: `${metric}/${key}`, metric, key, verdict: 'notApplicable', gating: true, ours: null, reference: null, band: {}, baselineIds: [], role: 'target', note: `ours: no ${key} cut under the frame rule` };
}

/** The ours summary from the measured cuts. */
function oursSummary(faces: number, setupRefused: number, s8Refused: number, notReplayed: number, missed: number, cuts: readonly SignatureCut[], rule: FrameRule): OursSummary {
  const sig = sigmaUnder(cuts, rule);
  const sigma: Record<string, number> = {};
  for (const k of [...sig.keys()].sort()) sigma[k] = sig.get(k) as number;
  const bent = cuts.filter((c) => c.bends === 1).length;
  return { faces, setupRefused, s8Refused, notReplayed, missed, signature: signatureRow(cuts), metricVersions: signatureVersions(), sigmaUnderRule: sigma, oneBend: cuts.length === 0 ? null : bent / cuts.length };
}

/** The failing gating clauses. */
function failingOf(clauses: readonly Clause[]): string[] {
  return clauses.filter((c) => c.gating && !holds(c)).map((c) => c.id);
}

/** A phase-a face: M0-b-04's full record (its cuts measured by the replay). */
export type PhaseAFace = Pick<FullRecord, 'kind' | 'i' | 'setup' | 'refused' | 'cuts' | 'counts'>;

/** Phase a's judgement (pure: the measured faces, the baselines, the rule): σ under the rule, the rows beside. */
export function judgeA(input: { baselines: BaselinesInput; rule: FrameRule; faces: readonly PhaseAFace[]; seed: number; perKind: number; cells?: InputFile; tables?: readonly WrittenTable[] }): NgComparisonReport {
  const { baselines, rule } = input;
  const ran = input.faces.filter((f) => f.setup === null && f.refused === null);
  const cuts: SignatureCut[] = [];
  let notReplayed = 0;
  let missed = 0;
  for (const f of ran) {
    if (f.counts === null) notReplayed += 1;
    else missed += f.counts.missed;
    cuts.push(...f.cuts);
  }
  const setupRefused = input.faces.filter((f) => f.setup !== null).length;
  const s8Refused = input.faces.filter((f) => f.setup === null && f.refused !== null).length;
  const ours = oursOf('a', { sigmaDocs: [{ ways: [], cuts: frameCuts(cuts, rule) }], docs: [{ ways: [], cuts }] }, { date: rowsDate(baselines.rows), seedFamily: `bentcut-ng-a/${String(input.seed)}` });
  const parity = judgedReport(baselines.rows, baselines.hash, ours, baselines.info);
  const gated = new Set(['plain', 'ring']);
  const clauses: Clause[] = [runClause(input.faces.length, setupRefused, s8Refused, cuts.length, false)];
  clauses.push(...reportClauses(parity, ours, baselines.rows, (m, k) => m === 'cut.sigma' && gated.has(k)));
  for (const k of gated) if (!ours.entries.some((e) => e.metric === 'cut.sigma' && e.key === k && e.notApplicable === undefined)) clauses.push(missingKey('cut.sigma', k));
  const sum = oursSummary(input.faces.length, setupRefused, s8Refused, notReplayed, missed, cuts, rule);
  const beside = (m: string): Clause | undefined => clauses.find((c) => c.metric === m && c.key === 'all');
  clauses.push({ ...absoluteClause('corner', 'cut.cornerMid', sum.signature.cornerMid, sum.signature.bent, CORNER_MIN, beside('cut.cornerMid')), gating: false });
  clauses.push({ ...absoluteClause('arrival', 'cut.arrival85', sum.signature.arrival85, sum.signature.cuts, ARRIVAL_MIN, beside('cut.arrival85')), gating: false });
  const failing = failingOf(clauses);
  return {
    item: 'M0-b-05',
    phase: 'a',
    frameRule: rule,
    inputs: { baselines: baselines.file, ...(input.cells === undefined ? {} : { cells: input.cells }), tables: tablesRead() },
    sizes: { seed: input.seed, perKind: input.perKind },
    ours: sum,
    parity,
    clauses,
    ...(input.tables === undefined ? {} : { tables: input.tables }),
    failing,
    pass: failing.length === 0,
    notes: [],
  };
}

/** NG's recorded cuts as M0-k-05's MetricCut (no start recorded: σ is never read from them). */
export function ngMetricCuts(faces: readonly NgFace[]): MetricCut[] {
  const out: MetricCut[] = [];
  for (const f of faces) {
    for (const c of f.cuts) {
      out.push({
        faceKind: f.holesCm.length > 0 ? 'ring' : 'plain',
        template: f.template,
        startT: 0.5,
        bends: c.bends,
        ...(c.bends === 1 ? { cornerT: c.cornerT / 1000 } : {}),
        arrivalCdeg: c.arrivalCdeg,
        fillet: c.fillet === 1,
        lengthCm: c.lengthCm,
      });
    }
  }
  return out;
}

/** NG's own shares on its faces by the same metric functions (reported beside ours). */
export function ngRecordedOf(file: NgFacesFile): NgRecordedSummary {
  const cuts = ngMetricCuts(file.faces);
  const doc: MetricDoc = { ways: [], cuts };
  const all = (m: Map<string, number>): number | null => m.get('all') ?? null;
  const bent = cuts.filter((c) => c.bends === 1).length;
  return { faces: file.faces.length, hoods: file.hoods.length, cuts: cuts.length, oneBend: cuts.length === 0 ? null : bent / cuts.length, cornerMidCourse: all(cutCornerMid(doc)), arrival85: all(cutArrival85(doc)), fillet: all(cutFillet(doc)) };
}

/** The T-bars' fold over the records' checks, with T41-1's registry clause once. */
export function foldChecks(records: readonly NgRecord[]): TChecks {
  const t = tallies();
  checkT41Registry(t['T41-1']);
  const out = checksOf(t);
  const sum = {} as Record<TBar, { checked: number; failed: number; first: string[] }>;
  for (const b of T_BARS) sum[b] = { checked: out[b].checked, failed: out[b].failed, first: [...out[b].first] };
  for (const r of records) {
    if (r.checks === null) continue;
    for (const b of T_BARS) {
      const c = r.checks[b];
      sum[b].checked += c.checked;
      sum[b].failed += c.failed;
      for (const w of c.first) if (sum[b].first.length < 3) sum[b].first.push(w);
    }
  }
  return sum;
}

/** A T-bar's clause: pass when nothing failed over at least one check; notApplicable (failing the gate) when none ran. */
function barClause(b: TBar, c: TChecks[TBar]): Clause {
  const verdict = c.checked === 0 ? 'notApplicable' : c.failed === 0 ? 'pass' : 'fail';
  const note = `${String(c.checked)} checked, ${String(c.failed)} failed${c.first.length > 0 ? `: ${c.first.join('; ')}` : ''}`;
  return { id: b, metric: b, key: 'all', verdict, gating: true, ours: c.failed, reference: 0, band: {}, baselineIds: [], role: 'target', note };
}

/** Phase b's judgement (pure: the records, the faces file, the baselines, the rule, the search's result). */
export function judgeB(input: { baselines: BaselinesInput; rule: FrameRule; ng: NgFacesFile; ngFile: InputFile; records: readonly NgRecord[]; seed: number; seeds: number; flatten: FlattenResult | null }): NgComparisonReport {
  const { baselines, rule, ng, records } = input;
  const notes: string[] = [];
  const setupRefused = new Set(records.filter((r) => r.setup !== null).map((r) => r.faceId)).size;
  const s8Refused = records.filter((r) => r.setup === null && r.refused !== null).length;
  for (const r of records) if ((r.setup !== null || r.refused !== null) && notes.length < 8) notes.push(`face ${String(r.faceId)} seed ${String(r.seedIndex)}: ${r.setup ?? r.refused ?? ''}`);
  const sigmaDocs: MetricDoc[] = [];
  const docs: MetricDoc[] = [];
  const all: SignatureCut[] = [];
  const districts: MetricDistrict[] = ng.faces.map((f) => ({ id: `face-${String(f.id)}`, ring: f.ringCm.map(([x, y]) => ({ x, y })), template: f.template }));
  for (let s = 0; s < input.seeds; s += 1) {
    const rs = records.filter((r) => r.seedIndex === s && r.setup === null && r.refused === null);
    const cuts: SignatureCut[] = [];
    const blocks: MetricBlock[] = [];
    for (const r of rs) {
      cuts.push(...r.cuts);
      r.blocks.forEach((b, i) => blocks.push({ id: `face-${String(r.faceId)}/block-${String(i)}`, district: `face-${String(r.faceId)}`, ring: b.ring, content: b.content as MetricBlock['content'] }));
    }
    all.push(...cuts);
    sigmaDocs.push({ ways: [], cuts: frameCuts(cuts, rule) });
    docs.push({ ways: [], cuts, blocks, districts });
  }
  const ours = oursOf('b', { sigmaDocs, docs }, { date: rowsDate(baselines.rows), seedFamily: `bentcut-ng-b/${String(input.seed)}` });
  const parity = judgedReport(baselines.rows, baselines.hash, ours, baselines.info);
  const sigmaKeys = new Set<string>();
  if (ng.faces.some((f) => f.holesCm.length === 0)) sigmaKeys.add('plain');
  if (ng.faces.some((f) => f.holesCm.length > 0)) sigmaKeys.add('ring');
  const gate = (m: string, k: string): boolean => (m === 'cut.sigma' && sigmaKeys.has(k)) || (m === 'cut.fillet' && k === 'all') || m === 'block.area' || m === 'cut.length';
  const clauses: Clause[] = [runClause(records.length, setupRefused, s8Refused, all.length, true)];
  clauses.push(...reportClauses(parity, ours, baselines.rows, gate));
  for (const k of sigmaKeys) if (!ours.entries.some((e) => e.metric === 'cut.sigma' && e.key === k && e.notApplicable === undefined)) clauses.push(missingKey('cut.sigma', k));
  const notReplayed = records.filter((r) => r.setup === null && r.refused === null && !r.replayed).length;
  const missed = records.reduce((a, r) => a + r.missed, 0);
  const sum = oursSummary(records.length, setupRefused, s8Refused, notReplayed, missed, all, rule);
  const beside = (m: string): Clause | undefined => clauses.find((c) => c.metric === m && c.key === 'all');
  clauses.push(absoluteClause('corner', 'cut.cornerMid', sum.signature.cornerMid, sum.signature.bent, CORNER_MIN, beside('cut.cornerMid')));
  clauses.push(absoluteClause('arrival', 'cut.arrival85', sum.signature.arrival85, sum.signature.cuts, ARRIVAL_MIN, beside('cut.arrival85')));
  const tbars = foldChecks(records);
  for (const b of T_BARS) clauses.push(barClause(b, tbars[b]));
  const f = input.flatten;
  clauses.push({
    id: 'flatten',
    metric: 'cut.flattenM',
    key: 'all',
    verdict: f === null ? 'notApplicable' : f.verdict === 'met' ? 'pass' : 'fail',
    gating: true,
    ours: f?.ours ?? null,
    reference: f?.row.value ?? null,
    band: f === null || f.row.n === 0 ? {} : { lo: f.row.value - f.tolerance, hi: f.row.value + f.tolerance },
    baselineIds: [],
    role: 'target',
    note: f === null ? 'the search was not run (--flatten none)' : `cut.flattenM ${f.flattenM === null ? 'none' : String(f.flattenM)} m: one-bend share ${f.ours === null ? 'n/a' : f.ours.toFixed(4)} against NG's ${f.row.value.toFixed(4)} over ${String(f.row.n)} recorded cuts (± ${f.tolerance.toFixed(4)})`,
  });
  const failing = failingOf(clauses);
  return {
    item: 'M0-b-05',
    phase: 'b',
    frameRule: rule,
    inputs: { baselines: baselines.file, ngFaces: { ...input.ngFile, referenceBuild: ng.referenceBuild, metricsVersion: ng.metricsVersion, faces: ng.faces.length, hoods: ng.hoods.length }, tables: tablesRead() },
    sizes: { seed: input.seed, seeds: input.seeds },
    ours: sum,
    ngRecorded: ngRecordedOf(ng),
    parity,
    clauses,
    tbars,
    ...(f === null ? {} : { flatten: f }),
    failing,
    pass: failing.length === 0,
    notes,
  };
}

/** Writes a table's text into plat/'s data folder (--apply) or the output folder (proposed). */
interface PendingWrite {
  readonly path: string;
  readonly text: string;
}

/** The written tables of a cells file (phase a): each table read from plat/'s data folder, its cells written. */
export function cellsTables(platRoot: string, text: string, file: string, apply: boolean, outFolder: string): { tables: WrittenTable[]; writes: PendingWrite[] } {
  const cf = readCellsFile(text, file, PHASE_TABLES.a);
  if (typeof cf === 'string') throw new NgStop(cf);
  const tables: WrittenTable[] = [];
  const writes: PendingWrite[] = [];
  for (const id of Object.keys(cf.tables).sort()) {
    const src = readInput(platRoot, `${TABLES_DIR}/${id}.json`);
    const raw = JSON.parse(src.bytes.toString('utf8')) as RawTable;
    try {
      const w = writeCells(raw, cf.tables[id], cf.provenance, { form: 'M-1' });
      tables.push({ table: id, from: raw.version, to: w.raw.version, provenance: cf.provenance, changes: w.changes, mode: apply ? 'applied' : 'proposed' });
      writes.push({ path: apply ? src.abs : join(outFolder, `${id}.json`), text: tableText(w.raw) });
    } catch (e) {
      if (e instanceof CellWriteRefusal) throw new NgStop(`${file}: ${e.message}`);
      throw e;
    }
  }
  return { tables, writes };
}

/** The dispatcher's context: the output folder, plat/ (a test's), the report's reader and the in-thread runners. */
export interface NgContext {
  out: string;
  platRoot?: string;
  onReport?: (r: NgComparisonReport) => void;
  /** Phase a's face runner (M0-b-04's runTask by default). */
  runTask?: (t: Task) => FaceRecord;
  /** Phase b's NG face runner (runNgTask by default). */
  runNg?: (t: NgTask) => NgRecord;
}

/** The comparison (both phases): its report and the files it would write. Throws NgStop on an input. */
export async function compare(a: NgArgs, ctx: NgContext, outFolder: string, log: (line: string) => void = () => {}): Promise<{ report: NgComparisonReport; writes: PendingWrite[] }> {
  const platRoot = ctx.platRoot ?? PLAT_ROOT;
  const baselines = readBaselinesInput(platRoot, a.baselines);
  if (a.phase === 'a') {
    let cells: InputFile | undefined;
    let tables: WrittenTable[] | undefined;
    let writes: PendingWrite[] = [];
    if (a.cells !== undefined) {
      const c = readInput(platRoot, a.cells);
      cells = c.file;
      const w = cellsTables(platRoot, c.bytes.toString('utf8'), c.file.path, a.apply, outFolder);
      tables = w.tables;
      writes = w.writes;
    }
    const recs = (await runTasks(signatureTasks(a.perKind, a.seed), a.workers, 1, (d, n) => log(`bentcut-ng: phase a ${String(d)} / ${String(n)} faces`), ctx.runTask ?? runTask)) as FullRecord[];
    const report = judgeA({ baselines, rule: a.rule, faces: recs, seed: a.seed, perKind: a.perKind, ...(cells === undefined ? {} : { cells }), ...(tables === undefined ? {} : { tables }) });
    return { report, writes };
  }
  const nf = readInput(platRoot, a.faces);
  let ng: NgFacesFile;
  try {
    ng = loadNgFacesFile(nf.abs);
  } catch (e) {
    if (e instanceof NgFacesRefusal) throw new NgStop(e.message);
    throw e;
  }
  const tasks: NgTask[] = [];
  for (let s = 0; s < a.seeds; s += 1) for (const face of ng.faces) tasks.push({ face, seed: a.seed, seedIndex: s, bars: true });
  const records = await runNgTasks(tasks, a.workers, 4, (d, n) => log(`bentcut-ng: phase b ${String(d)} / ${String(n)} face runs`), ctx.runNg ?? runNgTask);
  let flatten: FlattenResult | null = null;
  if (a.flatten !== null) {
    log(`bentcut-ng: the cut.flattenM search over ${String((gridValues(a.flatten) as number[]).length)} values`);
    flatten = await flattenSearch(ng.faces, bendRowOf(ng.faces), { seed: a.seed, seeds: a.flattenSeeds, grid: a.flatten, workers: a.workers, ...(ctx.runNg === undefined ? {} : { runner: ctx.runNg }) });
  }
  let report = judgeB({ baselines, rule: a.rule, ng, ngFile: nf.file, records, seed: a.seed, seeds: a.seeds, flatten });
  const writes: PendingWrite[] = [];
  if (a.apply && flatten !== null && a.date !== undefined) {
    if (flatten.verdict !== 'met' || flatten.flattenM === null) {
      report = { ...report, notes: [...report.notes, 'cut.flattenM not applied: the search did not meet the row'] };
    } else {
      const src = readInput(platRoot, `${TABLES_DIR}/cut.json`);
      const raw = JSON.parse(src.bytes.toString('utf8')) as RawTable;
      const provenance = `M-1 ${a.date}`;
      const w = writeCells(raw, [{ row: 'settings', cell: 'flattenM', value: flatten.flattenM }], provenance, { form: 'M-1' });
      writes.push({ path: src.abs, text: tableText(w.raw) });
      report = { ...report, tables: [{ table: 'cut', from: raw.version, to: w.raw.version, provenance, changes: w.changes, mode: 'applied' }] };
    }
  }
  return { report, writes };
}

/** The report's file name. */
export function reportName(phase: 'a' | 'b'): string {
  return `report-${phase}.json`;
}

/** The dispatcher's entry. */
export async function run(args: string[], ctx: NgContext): Promise<number> {
  const a = parseArgs(args);
  if (typeof a === 'string') {
    say(`bentcut-ng: ${a}; ${USAGE}`);
    return 64;
  }
  const dir = join(outDir(ctx.out), 'bentcut-ng');
  mkdirSync(dir, { recursive: true });
  // An earlier run's report never stands for this one (M0-k-05's closing check, N-h).
  rmSync(join(dir, reportName(a.phase)), { force: true });
  const t0 = performance.now();
  say(`bentcut-ng: phase ${a.phase}; ${ruleText(a.rule)}; seed ${String(a.seed)}; ${a.phase === 'a' ? `${String(a.perKind)} faces per kind` : `${String(a.seeds)} seeds per face`}; ${String(a.workers)} worker(s)`);
  let out: { report: NgComparisonReport; writes: PendingWrite[] };
  try {
    out = await compare(a, ctx, dir, say);
  } catch (e) {
    if (e instanceof NgStop) {
      say(`bentcut-ng stopped: ${e.message}`);
      return 2;
    }
    throw e;
  }
  const r = out.report;
  for (const w of out.writes) {
    mkdirSync(dirname(w.path), { recursive: true });
    writeFileSync(w.path, w.text);
  }
  for (const c of r.clauses) say(`bentcut-ng: ${c.gating ? 'gate' : 'beside'} ${c.id}: ${c.verdict}; ours ${c.ours === null ? 'n/a' : String(c.ours)}${c.reference === null ? '' : `, reference ${String(c.reference)}`}${c.note === undefined ? '' : ` — ${c.note}`}`);
  for (const t of r.tables ?? []) say(`bentcut-ng: ${t.mode} ${t.table}.json version ${String(t.from)} → ${String(t.to)}, ${String(t.changes.length)} cells, provenance ${t.provenance}`);
  const text = `${parityCanonicalJson(r)}\n`;
  const full = writeTruncated(dir, reportName(a.phase), text);
  if (full.dropped > 0) say(`bentcut-ng: the report was truncated by ${String(full.dropped)} bytes`);
  if (a.summary) {
    const path = join(ctx.platRoot ?? PLAT_ROOT, SUMMARY_FILES[a.phase]);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify(summaryOf(r, RUN_ITEMS[a.phase]), null, 2)}\n`);
    say(`bentcut-ng: summary ${SUMMARY_FILES[a.phase]}`);
  }
  const seconds = (performance.now() - t0) / 1000;
  say(`bentcut-ng: ${r.pass ? 'every gating clause holds' : `failing: ${r.failing.join(', ')}`}; report ${full.path} (${seconds.toFixed(0)} s CONTENDED, never judged)`);
  ctx.onReport?.(r);
  return r.pass ? 0 : 1;
}
