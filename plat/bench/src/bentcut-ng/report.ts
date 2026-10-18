// NgComparisonReport — the NG comparison's report (M0-b-05; C-0117's "writes the NgComparisonReport"; §13.5's
// ParityReport inside it; C-0067: numbers and our own ids only, its inputs named by their sha256). Written in M0-k-05's
// canonical form (keys in code-unit order, no white space), so the same inputs, frame rule and seed give the same bytes
// (§13.5 T-RIG-2's rule for a parity report); the run's wall-clock is printed, never written into it.
import type { ParityReport } from '@plat/testkit';
import type { SignatureRow } from '../bentcut/index.js';
import type { CellChange } from './cells.js';
import type { FlattenResult } from './flatten.js';
import type { FrameRule } from './frame.js';
import type { TChecks } from './tbars.js';
import type { Clause } from './verdicts.js';

/** An input file: its path relative to plat/, its sha256 (hex) and its size. */
export interface InputFile {
  readonly path: string;
  readonly sha256: string;
  readonly bytes: number;
}

/** A table a phase wrote (or proposes): its id, the version before and after, and the cells it changed. */
export interface WrittenTable {
  readonly table: string;
  readonly from: number;
  readonly to: number;
  readonly provenance: string;
  readonly changes: readonly CellChange[];
  /** `applied` when written into plat/packages/tables/data/, `proposed` when written to the output folder only. */
  readonly mode: 'applied' | 'proposed';
}

/** Our side of the run. */
export interface OursSummary {
  /** Faces run, faces the kernel refused (not S8 inputs), districts S8 refused, faces not replayed, planner cuts the replay missed. */
  readonly faces: number;
  readonly setupRefused: number;
  readonly s8Refused: number;
  readonly notReplayed: number;
  readonly missed: number;
  /** M0-b-04's signature row over every measured cut (one metricVersion each, C-0081), and σ under the frame rule. */
  readonly signature: SignatureRow;
  readonly metricVersions: Readonly<Record<string, string>>;
  readonly sigmaUnderRule: Readonly<Record<string, number>>;
  /** Our one-bend share over the measured planner cuts. */
  readonly oneBend: number | null;
}

/** NG's own numbers on its recorded faces, by the same metric functions (reported beside ours). */
export interface NgRecordedSummary {
  readonly faces: number;
  readonly hoods: number;
  readonly cuts: number;
  readonly oneBend: number | null;
  /** The corner within 0.10 of mid-course along its course (NG records the corner's place along the course). */
  readonly cornerMidCourse: number | null;
  readonly arrival85: number | null;
  readonly fillet: number | null;
}

/** The report (see the module comment). */
export interface NgComparisonReport {
  readonly item: 'M0-b-05';
  readonly phase: 'a' | 'b';
  readonly frameRule: FrameRule;
  readonly inputs: {
    readonly baselines: InputFile;
    readonly ngFaces?: InputFile & { readonly referenceBuild: string; readonly metricsVersion: string; readonly faces: number; readonly hoods: number };
    readonly cells?: InputFile;
    /** The tables the run read, by version and pinning hash (§7.6). */
    readonly tables: Readonly<Record<string, { readonly version: number; readonly hash: string }>>;
  };
  readonly sizes: { readonly seed: number; readonly perKind?: number; readonly seeds?: number };
  readonly ours: OursSummary;
  readonly ngRecorded?: NgRecordedSummary;
  /** M0-k-05's parity report with §13.5's row-specific bands applied (N-d). */
  readonly parity: ParityReport;
  readonly clauses: readonly Clause[];
  readonly tbars?: TChecks;
  readonly flatten?: FlattenResult;
  readonly tables?: readonly WrittenTable[];
  /** The gating clauses that do not hold. */
  readonly failing: readonly string[];
  readonly pass: boolean;
  readonly notes: readonly string[];
}

/** The numbers-only summary a run item writes with --summary (C-0067; C-0121's `reviewed` block). */
export function summaryOf(r: NgComparisonReport, runItem: string): Record<string, unknown> {
  const reviewed: Record<string, string> = { [r.inputs.baselines.path]: r.inputs.baselines.sha256 };
  if (r.inputs.ngFaces !== undefined) reviewed[r.inputs.ngFaces.path] = r.inputs.ngFaces.sha256;
  return {
    item: runItem,
    harness: 'M0-b-05',
    phase: r.phase,
    pass: r.pass,
    failing: r.failing,
    frameRule: r.frameRule,
    clauses: r.clauses.map((c) => ({ id: c.id, verdict: c.verdict, gating: c.gating, ours: c.ours, reference: c.reference, band: c.band, baselineIds: c.baselineIds })),
    ...(r.flatten === undefined ? {} : { flatten: { flattenM: r.flatten.flattenM, ours: r.flatten.ours, row: r.flatten.row, tolerance: r.flatten.tolerance, verdict: r.flatten.verdict } }),
    ...(r.tables === undefined ? {} : { tables: r.tables }),
    inputs: r.inputs,
    reviewed,
  };
}
