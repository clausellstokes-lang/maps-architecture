// FusionStatisticsReport — the fusion statistics harness's report (M0-c-07; C-0117's "FusionStatisticsReport"; §13.5's
// ParityReport inside it; C-0067: numbers and our own ids only, its inputs named by their sha256). Written in M0-k-05's
// canonical form (keys in code-unit order, no white space), so the same inputs, sizes and seeds give the same bytes
// (§13.5 T-RIG-2's rule for a parity report): the run's wall-clock is printed, never written into it.
import type { ParityOurs, ParityReport } from '@plat/testkit';
import type { Clause, InputFile, WrittenTable } from '../bentcut-ng/index.js';
import type { FusionGateReport } from '../fusion/index.js';

/** The fixture's size a run reads: the CITY fixture unless a test size is given (M0-c-06's FixtureSize, C-0264 (10)). */
export interface RunSize {
  readonly frameHa: number | null;
  readonly walledHa: number | null;
}

/**
 * One refusal class of the run's census (J264, N-58): where it was met, its code, the input kind, the class's verdict,
 * how many and on which seeds (the first few). The census lists every refusal the run's stages raised, by class.
 */
export interface RefusalClass {
  /** The operation or stage and the run it was met in (`phase a`, `hood run`, `gate re-run`, `loader`). */
  readonly source: string;
  readonly code: string;
  readonly inputKind: 'LAWFUL' | 'UNLAWFUL' | 'OUR OWN INTERMEDIATE';
  readonly verdict: 'MAKE-IT-SUCCEED' | 'REPAIR' | 'REFUSE';
  readonly count: number;
  readonly seeds: readonly number[];
  readonly note: string;
}

/** The census: every class met, and the total (0 when the run met none). */
export interface RefusalCensusReport {
  readonly classes: readonly RefusalClass[];
  readonly total: number;
}

/**
 * The declared shift of the junction row (§13.5: "a recomputation that turns a passing gate into a failing one is
 * declared in the shift record"; C-0094): M0-c-06's verdict on the same seed records against its absolute thresholds,
 * and the band rule's verdicts on the recomputed band, with the numbers.
 */
export interface JunctionShift {
  /** M0-c-06's junction verdict on the same records (null: not judged, no integrated record). */
  readonly m0c06: boolean | null;
  /** The thresholds M0-c-06 judged against (C-0094). */
  readonly thresholds: { readonly p5Min: number; readonly medianLo: number; readonly medianHi: number; readonly share4Max: number };
  /** M0-c-06's pooled and per-seed readings it judged. */
  readonly m0c06Readings: { readonly pooledMedian: number | null; readonly p5Min: number | null; readonly share4Max: number | null; readonly nodes: number };
  /** The band rule's verdicts on the junction cells (pass only when every cell passes). */
  readonly bandRule: boolean;
  /** `pass→fail` is the declared shift; `fail→pass` and `none` are reported. */
  readonly direction: 'pass→fail' | 'fail→pass' | 'none';
  readonly declared: boolean;
  /** Each junction cell: its clause id, ours, the band, the rows read and the verdict. */
  readonly cells: readonly { readonly id: string; readonly ours: number | null; readonly band: Clause['band']; readonly baselineIds: readonly string[]; readonly verdict: string }[];
}

/** The gate re-run through M0-c-06's exported entry (§4.4's statistics fallback; C-0117; N-03). */
export interface GateRerun {
  /** The entry and the arguments it was run with (never --summary: N-03). */
  readonly entry: 'bench -- fusion';
  readonly args: readonly string[];
  readonly exit: number;
  /** The tables the re-run's process had loaded, by version and pinning hash (a recalibration takes effect once applied). */
  readonly tables: Readonly<Record<string, { readonly version: number; readonly hash: string }>>;
  /** True when the loaded cut and bands tables are the versions a recalibration of this run wrote (false: none, or not applied). */
  readonly recalibrationInEffect: boolean;
  /** M0-c-06's FusionGateReport as its entry delivered it, its per-seed tables left out (their count kept). */
  readonly report: Omit<FusionGateReport, 'runs'> & { readonly runs: readonly Record<string, unknown>[] };
}

/** A recalibration (§4.4's statistics fallback): the miss it answers, the tables changed, and the choices row to append. */
export interface Recalibration {
  readonly miss: readonly string[];
  readonly tables: readonly WrittenTable[];
  /** The choices row text the run item appends (a table-version bump with its row, C-0117). */
  readonly choicesRow: string;
  /** Phase b's statistics re-judged on the hood runs with the recalibrated cut table (in memory): the gating clauses' verdicts. */
  readonly rejudged: readonly { readonly id: string; readonly verdict: string; readonly ours: number | null }[] | null;
  readonly note: string;
}

/** FusionStatisticsReport — see the module comment. */
export interface FusionStatisticsReport {
  readonly item: 'M0-c-07';
  readonly phase: 'a' | 'b';
  readonly inputs: {
    readonly baselines: InputFile;
    readonly ngFaces?: InputFile & { readonly referenceBuild: string; readonly metricsVersion: string; readonly hoods: number; readonly faces: number };
    readonly cells?: InputFile;
    readonly recalibrate?: InputFile;
    readonly missFrom?: InputFile;
    /** The tables the run read, by version and pinning hash (§7.6). */
    readonly tables: Readonly<Record<string, { readonly version: number; readonly hash: string }>>;
  };
  readonly sizes: { readonly from: number; readonly seeds: number; readonly size: RunSize; readonly gateSeeds?: number };
  /** Our side as the parity CLI reads it (`corepack pnpm parity -- --ours <the summary>` re-reads it). */
  readonly parityOurs: ParityOurs;
  /** M0-k-05's parity report of our side against baselines.json (the band rule, the ⟨M-1⟩ rule, the proxies). */
  readonly parity: ParityReport;
  readonly clauses: readonly Clause[];
  /** Phase a: the statistics beside the clauses (per-band court shares, M0-c-06's readings). Phase b: the hoods and NG's own numbers. */
  readonly beside: Readonly<Record<string, unknown>>;
  readonly shift?: JunctionShift;
  readonly tables?: readonly WrittenTable[];
  readonly recalibration?: Recalibration;
  readonly gate?: GateRerun;
  readonly census: RefusalCensusReport;
  /** The gating clauses that do not hold. */
  readonly failing: readonly string[];
  readonly pass: boolean;
  readonly notes: readonly string[];
}

/** The run items, by phase (C-0117), and their numbers-only summaries, relative to plat/. */
export const RUN_ITEMS = Object.freeze({ a: 'M0-c-07a', b: 'M0-c-07b' });
export const SUMMARY_FILES = Object.freeze({ a: 'docs/build/summaries/M0-c-07a.json', b: 'docs/build/summaries/M0-c-07b.json' });

/**
 * The numbers-only summary a run item writes with --summary (C-0067; C-0121's `reviewed` block naming each M-1 file
 * with the sha256 it ran over). It carries `parityOurs`, so the parity CLI re-reads it as our side.
 */
export function summaryOf(r: FusionStatisticsReport): Record<string, unknown> {
  const reviewed: Record<string, string> = { [r.inputs.baselines.path]: r.inputs.baselines.sha256 };
  if (r.inputs.ngFaces !== undefined) reviewed[r.inputs.ngFaces.path] = r.inputs.ngFaces.sha256;
  return {
    item: RUN_ITEMS[r.phase],
    harness: 'M0-c-07',
    phase: r.phase,
    pass: r.pass,
    failing: r.failing,
    sizes: r.sizes,
    clauses: r.clauses.map((c) => ({ id: c.id, verdict: c.verdict, gating: c.gating, ours: c.ours, reference: c.reference, band: c.band, baselineIds: c.baselineIds })),
    ...(r.shift === undefined ? {} : { shift: r.shift }),
    ...(r.tables === undefined ? {} : { tables: r.tables }),
    ...(r.recalibration === undefined ? {} : { recalibration: { miss: r.recalibration.miss, tables: r.recalibration.tables, choicesRow: r.recalibration.choicesRow, rejudged: r.recalibration.rejudged } }),
    ...(r.gate === undefined ? {} : { gate: { exit: r.gate.exit, pass: r.gate.report.pass, verdicts: r.gate.report.verdicts, tables: r.gate.tables, recalibrationInEffect: r.gate.recalibrationInEffect } }),
    census: r.census,
    inputs: r.inputs,
    reviewed,
    parityOurs: r.parityOurs,
  };
}
