// The stage ladder-coverage types (M0-x-05; §13.1 *Ladder coverage*, §5.2, §5.4; C-0085, C-0109).
import type { CoverageReport, CoverageRow } from '../invariants/types.js';

/**
 * One row of the stage-rung registry (`STAGE_LADDERS`): a rung of a §5.2 ladder, the stage whose record it lands in,
 * the report code or warning it leaves there (`code`), the fixture that forces it on the real stage (or, for a row
 * deferred to a later milestone, where that milestone builds it), and the milestone of a deferred row.
 */
export interface LadderRung {
  /** The §5.2 failure class (`F-CUT`, `F-WORK`, …). */
  readonly ladder: string;
  /** The rung in the design's words. */
  readonly rung: string;
  /** The stage (or sub-stage) whose record the rung leaves its code in: `S1`, `S3`, `S3 trace`, `S4`, `S5c`, `S5d`, `S6`, `S6 fields`, `S8`, `kernel`. */
  readonly stage: string;
  /** The report code or warning the rung leaves (a §5.4 code, a kernel warning, or the rung's entry in the stage's record). */
  readonly code: string;
  /** The fixture's id in `LADDER_FIXTURES` (a built row), or where the later milestone builds it (a deferred row). */
  readonly fixture: string;
  /** The milestone (or volume) that builds a deferred row; absent for a rung built at M0. */
  readonly milestone?: string;
}

/** What a run left, counted by leaf key (`leafOf(row)`: stage, ladder and code). */
export type Leaves = Readonly<Record<string, number>>;

/** One stage row of the combined report: the registry row and what its fixture and the plain fixtures left. */
export interface StageCoverageRow extends LadderRung {
  /** `built` (its fixture run here), or the milestone it is deferred to. */
  readonly status: 'built' | { readonly deferredTo: string };
  /** The leaf key the row is counted under. */
  readonly leaf: string;
  /**
   * A built row's run: its fixture's count of the code (≥ 1 when the rung is reached), the plain controls' count (0:
   * the code appears nowhere but where its fixture forces it); null for a deferred row.
   */
  readonly exercised: { readonly fixture: number; readonly control: number } | null;
}

/** The plain flat fixture's baseline (`runBase(FLAT_BLUEPRINT, seed)`): every stage code it left, by leaf key. */
export interface PlainBaseline {
  readonly seed: number;
  /** Every built row's leaf with its count on the plain fixture (0 included). */
  readonly leaves: Leaves;
  /** The rows the plain fixture reaches (count > 0), by leaf key. */
  readonly reached: readonly string[];
  /** The plain run's bugs (§5.1 (8); empty). */
  readonly bugs: number;
}

/**
 * `stageLadderCoverage()`'s combined report over §5.2 (C-0109): every ladder named once; the kernel ladders' report of
 * M0-k-04's `ladderCoverage()` unchanged (its rows, its degenerate table, its verdict); the stage rows; the verdicts.
 */
export interface StageCoverageReport {
  /** Every §5.2 failure class, in the table's order. */
  readonly ladders: readonly string[];
  /** M0-k-04's `ladderCoverage()` report, unchanged (C-0109). */
  readonly kernel: CoverageReport;
  /** The kernel rows (unchanged) followed by the stage rows. */
  readonly rows: readonly (CoverageRow | StageCoverageRow)[];
  /** The stage rows alone. */
  readonly stage: readonly StageCoverageRow[];
  /** The table check's problems (a §5.2 ladder missing, a ladder outside §5.2, a rung twice): empty when whole. */
  readonly tableProblems: readonly string[];
  /** The plain flat fixture's baseline, when asked for (`{ plain: seed }`). */
  readonly plain: PlainBaseline | null;
  /** Every built stage row reached by its fixture and left nowhere on the controls (and the table whole). */
  readonly stageCovered: boolean;
  /** `stageCovered` and the kernel report's `covered`. */
  readonly covered: boolean;
}
