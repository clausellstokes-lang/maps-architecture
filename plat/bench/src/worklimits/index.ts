// bench/src/worklimits — the work-limit coefficients from the spikes' measured work, and the F-WORK hit-rate report
// (M0-f-03b; §5.1 (5) *Coefficients* and *Confirmation*, §13.2 "Work limits follow population", §5.4's
// `GenerationReport.stages[].work`; C-0021, C-0067, C-0091, C-0301 (3), N-61 (6)). The folder was created empty by the
// scaffold (M0-s-01, C-0013) and belongs to M0-f-03b.
//
// `corepack pnpm bench -- worklimits [--date YYYY-MM-DD] [--summary] [--write]` opens the four committed harness summaries
// docs/build/summaries/{M0-c-06, M0-e-06, M0-b-04, M0-k-04}.json — and no other file: never PLAT_BENCH_OUT (C-0091); the
// table in force is @plat/tables' own `loadWorkLimits()` — fits every counting row of workLimits.json to its measured
// work per unit (fit.ts: the largest p999 of the counter's blocks × 1.5, perUnit and floor alike; the fixed row skipped
// and its block never read; skeleton.events max(measured, §3.8's law)), bounds the F-WORK hit rate per stage at the
// fitted law — on every stage each summary shows ran, every counter the stage charges (fit.ts STAGE_CHARGES; a charged
// counter without a block is UNBOUNDED and fails the report, C-0446) — writes the full WorkLimitCoefficientReport to
// $PLAT_BENCH_OUT/worklimits-report.json and prints a line per counter and per stage. With `--write` it rewrites
// packages/tables/data/workLimits.json (the version bumped by one; every cell's provenance `M0 spike ⟨date⟩`; text.ts
// keeps the file's layout) and the numbers-only summary docs/build/summaries/M0-f-03b.json — only when the fit changes
// the table and the hit-rate report passes, so a second run on the same summaries writes nothing. `--summary` writes
// the summary alone, the record of the fit and its verdict whatever it is (the table left as it stands — the hand-over
// is `--write`). A fitted text the loader refuses writes nothing at all. `--date` is the provenance's date; without it,
// the date the table's spike cells carry.
// Exit 0: the table is the fit (or was just written), or the summary alone was written, and the report passes (no stage
// unbounded, every stage within 1 work cut per 1 000 batches); 1: the table is not the fit (a dry run), a stage
// unbounded or over the target (the missing blocks named), or a refusal (a summary missing or malformed, a unit
// departing from its row, a counter without a row, a stage the charge table lacks, a fitted table the loader refuses);
// 64: a bad argument.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadWorkLimits, parseWorkLimitsText, provenanceForm, TableError, type WorkLimitsTable } from '@plat/tables';
import { say, summariseReasons, writeJson } from '../timing/output.js';
import { FitError, fitWorkLimits, HIT_RATE_TARGET_PER_THOUSAND, STAGE_CHARGES, SUMMARY_IDS, type StageCharges, type SummaryId, type WorkLimitCoefficientReport } from './fit.js';
import { fittedText, summaryOf, type SummaryInput } from './text.js';

export {
  C06_RUN_STAGES,
  FitError,
  fitCounters,
  fitWorkLimits,
  hitBound,
  hitRates,
  HIT_RATE_TARGET_PER_THOUSAND,
  KERNEL_COUNTERS,
  LAW_FLOORS,
  P999_FACTOR,
  spikeProvenance,
  STAGE_CHARGES,
  stageGroups,
  SUMMARY_IDS,
  type BlockRef,
  type Coefficients,
  type CounterFit,
  type CounterHits,
  type FitStatus,
  type HitRateReport,
  type HitRateRow,
  type LawFloor,
  type MissingBlocks,
  type StageCharges,
  type StageGroup,
  type SummaryId,
  type WorkBlock,
  type WorkLimitCoefficientReport,
  type WorkQuantiles,
} from './fit.js';
export { fittedText, flooredNote, rowOrder, summaryOf, type SummaryInput } from './text.js';

/** plat/ (this file is bench/src/worklimits/index.ts). */
export const PLAT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
/** The committed harness summaries (C-0067). */
export const SUMMARIES_DIR = join(PLAT_ROOT, 'docs', 'build', 'summaries');
/** This item's numbers-only summary. */
export const SUMMARY_PATH = join(SUMMARIES_DIR, 'M0-f-03b.json');
/** The table the hand-over rewrites (M0-f-03a → M0-f-03b, C-0021). */
export const TABLE_PATH = join(PLAT_ROOT, 'packages', 'tables', 'data', 'workLimits.json');
/** The full report's file name under PLAT_BENCH_OUT. */
export const REPORT_NAME = 'worklimits-report.json';

/** An input summary's path. */
export function inputPath(id: SummaryId, dir: string = SUMMARIES_DIR): string {
  return join(dir, `${id}.json`);
}

/** The run's file access: every read and write goes through it (the file-open log, C-0091). */
export interface WorkLimitsIo {
  read(path: string): string;
  write(path: string, text: string): void;
}

/** The file system. */
export const FS_IO: WorkLimitsIo = Object.freeze({
  read: (path: string): string => readFileSync(path, 'utf8'),
  write: (path: string, text: string): void => writeFileSync(path, text),
});

/** The dispatcher's context, with what a test may redirect. */
export interface WorkLimitsContext {
  out: string;
  io?: WorkLimitsIo;
  /** The table in force (default `loadWorkLimits()`, the shipped file as @plat/tables loads it). */
  table?: WorkLimitsTable;
  summariesDir?: string;
  tablePath?: string;
  summaryPath?: string;
  /** The line printer (default: the bench's `say`, one capped line to stdout). */
  say?: (line: string) => void;
  /** The stage-charge table the hit-rate report holds the stages to (default STAGE_CHARGES; a test may narrow it). */
  charges?: StageCharges;
}

/** What a run did: its exit code, the report (when the fit ran), the paths it read and wrote, in order. */
export interface WorkLimitsRun {
  readonly code: number;
  readonly report: WorkLimitCoefficientReport | null;
  readonly opened: readonly string[];
  readonly written: readonly string[];
  readonly text: string | null;
  readonly version: number | null;
  readonly changed: boolean;
}

const USAGE = 'usage: corepack pnpm bench -- worklimits [--date YYYY-MM-DD] [--summary] [--write]';

interface Args {
  readonly write: boolean;
  readonly summary: boolean;
  readonly date: string | null;
}

function parseArgs(args: readonly string[]): Args | string {
  let write = false;
  let summary = false;
  let date: string | null = null;
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === '--write' && !write) write = true;
    else if (a === '--summary' && !summary) summary = true;
    else if (a === '--date' && date === null) {
      const d = args[i + 1];
      if (d === undefined || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return `--date takes YYYY-MM-DD, not ${JSON.stringify(d)}`;
      date = d;
      i += 1;
    } else return `unknown or repeated argument ${JSON.stringify(a)}`;
  }
  return { write, summary, date };
}

/** The date the table's spike cells carry (`M0 spike ⟨date⟩`), when every one carries the same; null when none does. */
export function spikeDateOf(table: WorkLimitsTable): string | null {
  const dates = new Set<string>();
  for (const [, row] of table.table.rows) {
    for (const [, c] of row) if (provenanceForm(c.provenance) === provenanceForm('M0 spike 2026-01-01')) dates.add(c.provenance.slice('M0 spike '.length));
  }
  return dates.size === 1 ? [...dates][0] : null;
}

function sha256(text: string): string {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

/** The run with its record (the entry's `run` returns the code alone). */
export function runWorkLimits(args: readonly string[], ctx: WorkLimitsContext): WorkLimitsRun {
  const opened: string[] = [];
  const written: string[] = [];
  const io = ctx.io ?? FS_IO;
  const print = ctx.say ?? say;
  const done = (code: number, rest: Partial<WorkLimitsRun> = {}): WorkLimitsRun => ({ code, report: null, opened, written, text: null, version: null, changed: false, ...rest });
  const parsed = parseArgs(args);
  if (typeof parsed === 'string') {
    print(`worklimits: ${parsed}`);
    print(USAGE);
    return done(64);
  }
  const table = ctx.table ?? loadWorkLimits();
  const date = parsed.date ?? spikeDateOf(table);
  if (date === null) {
    print('worklimits: the table carries no single spike date — pass --date YYYY-MM-DD');
    return done(64);
  }
  const dir = ctx.summariesDir ?? SUMMARIES_DIR;
  const summaries: Partial<Record<SummaryId, unknown>> = {};
  const inputs: SummaryInput[] = [];
  try {
    for (const id of SUMMARY_IDS) {
      const path = inputPath(id, dir);
      opened.push(path);
      let text: string;
      try {
        text = io.read(path);
      } catch (e) {
        throw new FitError(`${id}: cannot read ${relative(PLAT_ROOT, path)} (${(e as Error).message})`);
      }
      try {
        summaries[id] = JSON.parse(text) as unknown;
      } catch (e) {
        throw new FitError(`${id}: not JSON (${(e as Error).message})`);
      }
      inputs.push({ summary: id, path: relative(PLAT_ROOT, path).split('\\').join('/'), sha256: sha256(text), bytes: Buffer.byteLength(text, 'utf8') });
    }
    const report = fitWorkLimits(table, summaries as Record<SummaryId, unknown>, date, ctx.charges ?? STAGE_CHARGES);
    const { text, version, changed } = fittedText(table, report.counters);
    // The loader's own check: a fitted table it refuses is never written.
    parseWorkLimitsText(text);
    const rel = opened.map((p) => relative(PLAT_ROOT, p).split('\\').join('/'));
    const summary = summaryOf(report, inputs, version, rel);
    const r = writeJson(ctx.out, REPORT_NAME, { report, inputs, opened: rel, version, changed, text });
    written.push(r.path);
    for (const f of report.counters) {
      const fit = f.coefficient === null ? '' : ` p999 ${String(f.p999)} × 1.5 = ${String(f.coefficient)} from ${String(f.sources.length)} block(s);`;
      print(`worklimits: ${f.counter} (${f.unit}${f.log2 ? ', log2' : ''}) ${f.status};${fit} perUnit ${String(f.before.perUnit)} → ${String(f.after.perUnit)}, floor ${String(f.before.floor)} → ${String(f.after.floor)}`);
    }
    const h = report.hitRate;
    for (const row of h.rows) {
      const head = `worklimits: ${row.summary} ${row.at} ${row.stage}: ${row.batches === null ? 'batches not recorded' : `${String(row.batches)} batches`}, E_WORK_LIMIT before ${row.before === null ? 'not recorded' : String(row.before)}`;
      if (row.after === null || row.perThousand === null) print(`${head}, after UNBOUNDED — no block for ${row.unbounded.join(', ')} (never counted as 0)`);
      else print(`${head}, after ≤ ${String(row.after)}${row.afterExact ? ' (none can reach the limit)' : ''} = ${row.perThousand.toFixed(3)} per 1 000`);
    }
    print(`worklimits: ${String(h.batches)} batches; E_WORK_LIMIT before ${String(h.before)} (${String(h.beforeUnrecorded)} row(s) unrecorded), after ≤ ${String(h.after)} on the bounded rows; worst ${h.worstPerThousand.toFixed(3)} per 1 000 (target ≤ ${String(HIT_RATE_TARGET_PER_THOUSAND)}); ${String(h.unbounded.length)} row(s) unbounded; report ${r.path}`);
    const tablePath = ctx.tablePath ?? TABLE_PATH;
    const summaryPath = ctx.summaryPath ?? SUMMARY_PATH;
    const writeSummary = (): void => {
      io.write(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);
      written.push(summaryPath);
    };
    if (!h.pass) {
      if (h.unbounded.length > 0) {
        const missing = h.unbounded.map((m) => `${m.summary} ${m.at} ${m.stage}: ${m.counters.join(', ')}`);
        print(`worklimits: the hit rate is UNBOUNDED at ${String(h.unbounded.length)} stage row(s): the spikes ran stages charging counters their summaries carry no block for (C-0444 (7), C-0446) — missing blocks: ${summariseReasons(missing, 3)}`);
      }
      if (h.worstPerThousand > HIT_RATE_TARGET_PER_THOUSAND) print('worklimits: a stage is over 1 work cut per 1 000 batches at the fitted coefficients — §5.1 (5)\'s fallback is M1\'s sweep');
      if (parsed.summary) {
        writeSummary();
        print(`worklimits: wrote ${relative(PLAT_ROOT, summaryPath)} only (the record of a fit whose hit-rate report does not pass); no table written`);
      } else print('worklimits: the hit-rate report does not pass; nothing written');
      return done(1, { report, text, version, changed });
    }
    if (!changed) {
      print(`worklimits: workLimits.json (version ${String(version)}) is the fit of the four summaries; nothing to hand over`);
      if (parsed.summary) {
        writeSummary();
        print(`worklimits: wrote ${relative(PLAT_ROOT, summaryPath)}`);
      }
      return done(0, { report, text, version, changed });
    }
    if (parsed.write) {
      io.write(tablePath, text);
      written.push(tablePath);
      writeSummary();
      print(`worklimits: wrote ${relative(PLAT_ROOT, tablePath)} (version ${String(version)}, sha256 ${sha256(text)}) and ${relative(PLAT_ROOT, summaryPath)}`);
      return done(0, { report, text, version, changed });
    }
    if (parsed.summary) {
      writeSummary();
      print(`worklimits: wrote ${relative(PLAT_ROOT, summaryPath)} only — workLimits.json (version ${String(table.table.version)}) is not yet the fit (its hand-over as version ${String(version)}, sha256 ${sha256(text)}, is --write)`);
      return done(0, { report, text, version, changed });
    }
    print(`worklimits: workLimits.json (version ${String(table.table.version)}) is not the fit of the four summaries — run with --write to hand it over as version ${String(version)}`);
    return done(1, { report, text, version, changed });
  } catch (e) {
    if (!(e instanceof FitError || e instanceof TableError)) throw e;
    print(`worklimits: refused — ${e.message}`);
    return done(1);
  }
}

/** The bench entry (C-0059): the exit code. */
export function run(args: string[], ctx: WorkLimitsContext): number {
  return runWorkLimits(args, ctx).code;
}
