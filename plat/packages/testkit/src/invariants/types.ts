// The B-FUZZ runner's report types (M0-k-04; §13.1's bar, §13.8's sizes, §5.4's `GenerationReport.kernel` and `bugs`,
// §5.1 (8); C-0091's work quantiles, C-0109's coverage report). Types only; numbers and short reasons, so the counts
// report's summary is numbers only (C-0067).
import type { ConstructiveMilestone } from '../constructive/types.js';

/** §5.1 (5) / M0.md §2.2's work units a kernel counter is divided by. */
export type WorkUnit = 'vertices' | 'faces' | 'fixed';

/** C-0091's work-per-unit quantiles of one counter over a run: the charged work ÷ the unit count, per operation. */
export interface WorkQuantiles {
  /** The kernel counter (M0.md §2.2), e.g. `insert.points`. */
  readonly counter: string;
  readonly unit: WorkUnit;
  /** Operations that charged the counter. */
  readonly n: number;
  readonly p50: number;
  readonly p99: number;
  readonly p999: number;
  readonly max: number;
  /** The unit count summed over those operations (the law's divisor). */
  readonly units: number;
}

/** §5.4's `bugs` entry (§5.1 (8)): a bug abort's class, entity, stream key and stage. */
export interface BugEntry {
  readonly cls: string;
  readonly entity: string;
  readonly key: string;
  readonly stage: string;
}

/** What went wrong on one fuzz input. */
export type FuzzFailureKind = 'crash' | 'hang' | 'invalid' | 'bug';

/** One failing input, replayable from its family seed and index. */
export interface FuzzFailure {
  readonly primitive: string;
  /** The input's index in the run (its chunk and place: `fc.sample` of the family's chunk seed). */
  readonly index: number;
  readonly kind: FuzzFailureKind;
  readonly reason: string;
}

/** One primitive's B-FUZZ run (`runFuzz(primitive, n)`). */
export interface FuzzReport {
  readonly primitive: string;
  /** The seed family the inputs were drawn from (`seedFamily(family, chunk)`, C-0161). */
  readonly family: string;
  readonly runs: number;
  readonly crashes: number;
  readonly hangs: number;
  readonly invalid: number;
  /** Ok results (a downgrade among them). */
  readonly ok: number;
  /** Inputs that never reached the operation (no room for a frame, a degenerate set-up ring; C-0225 (2)). */
  readonly skipped: number;
  /** Typed refusals per §3.1 code — each a valid outcome (never a throw for a geometric reason). */
  readonly refused: Readonly<Record<string, number>>;
  /** Warnings per §3.1 code, summed over the run (§5.4 `kernel.warnings`). */
  readonly warnings: Readonly<Record<string, number>>;
  /** Counted findings that judge no output — a follow-up op's typed refusal (C-0225 (4)) — by name. */
  readonly notes: Readonly<Record<string, number>>;
  /** Typed downgrades (§3.8 W_DOWNGRADE; §5.4 `kernel.downgrades`). */
  readonly downgrades: number;
  /** E_WORK_LIMIT results (§5.4 `kernel.workLimitHits`). */
  readonly workLimitHits: number;
  /** §3.7's split, for the oracle-compared primitives: cases per class and the cases an oracle could not judge. */
  readonly oracle: { readonly unattracted: number; readonly attracted: number; readonly refused: number } | null;
  /** The sampled determinism harnesses (M0-d-08): sequences compared, and how many diverged (each also invalid). */
  readonly sampled: { readonly renumbering: number; readonly permutation: number };
  /** Per counter charged: C-0091's quantiles. */
  readonly work: readonly WorkQuantiles[];
  /** §5.4 `bugs` (§5.1 (8)): CI requires it empty. */
  readonly bugs: readonly BugEntry[];
  /** The first failures (at most 20), and the total failing inputs. */
  readonly failures: readonly FuzzFailure[];
  readonly failed: number;
}

/** The constructive set's run against the kernel (C-0110): M0-k-02's `runConstructive` with this item's judge. */
export interface ConstructiveRun {
  readonly cases: number;
  readonly judged: number;
  readonly draws: number;
  readonly green: number;
  readonly failedCases: number;
  readonly pending: readonly string[];
  /** Deferred cases by milestone — the counts report's "deferred constructive cases by milestone". */
  readonly deferred: Readonly<Record<ConstructiveMilestone, number>>;
  readonly failures: readonly { readonly id: string; readonly seed: number; readonly reason: string }[];
  /** Known findings (C-0225 (14)): failing as known, owned by another item, listed — never green, never hidden. */
  readonly known: readonly { readonly id: string; readonly draws: number; readonly finding: string }[];
  /** Known findings whose case is green now (the list is stale: the bar fails until it is corrected). */
  readonly staleKnown: readonly string[];
}

/** One row of the kernel ladders' coverage table (§13.1 *Ladder coverage*; C-0085, C-0109). */
export interface CoverageRow {
  /** The §5.2 failure class: F-NUM or F-SKELETON (the kernel ladders; the stage ladders are M0-x-05's). */
  readonly failureClass: 'F-NUM' | 'F-SKELETON';
  /** The rung or downgrade, in the design's words. */
  readonly rung: string;
  /** §5.1's tier of the rung. */
  readonly tier: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** The typed code or report the rung returns (a §3.1 code, W_DOWNGRADE's path, or `bug`). */
  readonly code: string;
  /** The fixture that reaches it: a constructive case id, or a fixture of this item. */
  readonly fixture: string;
  /** Built at M0 (exercised by the fixture here), or the milestone that builds it. */
  readonly status: 'built' | { readonly deferredTo: string };
  /** The fixture's run: draws exercised and how many reached the rung (null for a deferred row). */
  readonly exercised: { readonly draws: number; readonly reached: number } | null;
}

/** `ladderCoverage()`'s report (C-0109: M0-x-05's `stageLadderCoverage()` merges it unchanged). */
export interface CoverageReport {
  readonly ladders: readonly ('F-NUM' | 'F-SKELETON')[];
  readonly rows: readonly CoverageRow[];
  /** §5.1 (9)'s five degenerate kinds per kernel class: the fixture id per (class, kind). */
  readonly degenerate: readonly { readonly failureClass: 'F-NUM' | 'F-SKELETON'; readonly kind: string; readonly fixture: string }[];
  /** True when every built row's fixture reached its rung on every draw. */
  readonly covered: boolean;
}

/** The counts report of a B-FUZZ run (the bar's report; its numbers-only summary goes to summaries/M0-k-04.json). */
export interface CountsReport {
  readonly runsPerPrimitive: number;
  readonly primitives: readonly FuzzReport[];
  readonly totals: {
    readonly crashes: number;
    readonly hangs: number;
    readonly invalid: number;
    readonly warnings: Readonly<Record<string, number>>;
    readonly downgrades: number;
    readonly workLimitHits: number;
  };
  readonly constructive: ConstructiveRun;
  readonly ladders: CoverageReport;
  readonly bugs: readonly BugEntry[];
  /** The bar: 0 crashes, 0 hangs, 0 invalid outputs, every M0 case green, every built rung reached, bugs empty. */
  readonly pass: boolean;
}
