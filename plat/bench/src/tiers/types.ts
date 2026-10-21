// The tier runner's types (M0-f-02a; §13.8, §12.1, §16 M0 (f); C-0027, C-0069, C-0075, C-0088, C-0097, C-0099,
// C-0105, C-0113, C-0121). A tier is a manifest of jobs; a job's status is DERIVED at run time from its source and its
// declared input files, never written when an item lands (C-0099). The readings this item took where the design
// leaves a case open are C-0241.
import type { HostRecord } from '../host/index.js';
import type { Authority } from '../timing/contention.js';
import type { TimingFlag } from '../timing/harness.js';

export type TierName = 'pr' | 'nightly' | 'milestone';

/**
 * How a job is found and run (C-0099): `harness` — a bench harness folder `bench/src/<folder>/` whose `index.ts`
 * exports `run` (the dispatcher's own test, C-0059); `vitest` — a vitest folder holding at least one test file;
 * `command` — a script or file the command runs, which must exist.
 */
export type JobKind = 'harness' | 'vitest' | 'command';

/**
 * A job's tier size, the one number §13.8's pre-decided fallback reduces: `fuzz` — random fuzz inputs per primitive
 * (10⁴ → 5 × 10³); `seeds` — B-CITY-lite's seeds per rung (50 → 25); `constructive` — the constructive set's draws,
 * NEVER cut by the fallback.
 */
export interface JobSize {
  kind: 'fuzz' | 'seeds' | 'constructive';
  n: number;
}

/**
 * One batch of a job: its natural partition (C-0097 — lint per package, `tsc` per project, vitest per project, B-FUZZ
 * per primitive, the constructive set per class, the spike stand-ins per 10-seed block, the scans per package, the
 * edge suite per fixture). The units of a job together are the job: every mode runs exactly the same units.
 */
export interface Unit {
  /** The unit's name inside its job (`kernel`, `segmentIntersect`, `constructive set`, …). */
  name: string;
  /** The full command line, run from plat/ (`corepack pnpm …` — never a bare pnpm, C-0030 — or node itself). */
  argv: string[];
  /** Variables set for this unit; the tier-size variables are cleared from the inherited environment first. */
  env?: Record<string, string>;
}

/** A suite the job reads: missing or empty → the built job FAILS naming it, never passes vacuously (§13.8 Edges). */
export interface Suite {
  kind: 'fixtures' | 'seeds' | 'baseline';
  /** The file or folder, relative to plat/. */
  path: string;
}

export interface Job {
  name: string;
  kind: JobKind;
  /** The harness folder, the vitest folder or the script, relative to plat/ (folders end in `/`). */
  source: string;
  /** Declared input files, relative to plat/: one absent → `after-M-1: <file>`, never run, never pass or fail (C-0069). */
  inputs: string[];
  /** Items whose numbers-only summaries must name each input's current sha256 before the job runs (C-0121). */
  reviewedBy?: string[];
  /** The owning item: `not-built: <item>` until its source is built. */
  item: string;
  /**
   * The item or milestone that completes this declared entry (the nightly and milestone lists and the PR tier's spike
   * stand-ins, filled by M0-f-02b; the nightly's `timing-phase (nightly contents)`, M1 — C-0088). While set the job
   * derives `not-built: <stagedTo>`; the completing item deletes the field, so no other item edits the manifest.
   */
  stagedTo?: string;
  /** The tier size the fallback switch reduces (none: the job has no size). */
  size?: JobSize;
  /** The suites the job reads (§13.8 Edges: an empty or missing one fails the built job naming it). */
  suites?: Suite[];
  /** A job's own budget in ms of normalised wall-clock (CPU ÷ 16 in a projected tier); > 10 % over fails. */
  budgetMs?: number;
  /** The job's units at its effective size (after the fallback switch, when applied). */
  units(size: number | null): Unit[] | Promise<Unit[]>;
}

export interface TierBudget {
  /** The budget in ms: 15 min for PR, 4 h nightly, 12 h milestone (§13.8). */
  ms: number;
  /** The cores the budget is stated on (§13.8): 8 for PR, 16 for the nightly and milestone tiers. */
  cores: 8 | 16;
  /**
   * `true` for the 16-core tiers on this 8-core machine (C-0027): the figure is total CPU time ÷ 16, marked projected,
   * never gating at M0; `false` for PR, judged on wall-clock read literally.
   */
  projected: boolean;
}

export interface TierManifest {
  tier: TierName;
  budget: TierBudget;
  jobs: Job[];
}

/**
 * A derived status (C-0069, C-0099, C-0121): `built`; `not-built: <item>`; `after-M-1: <file>`; or
 * `after-M-1: <file> (review pending: <item>[, <item>])`.
 */
export type JobStatus = string;

export interface DerivedStatus {
  status: JobStatus;
  state: 'built' | 'not-built' | 'after-M-1';
  /** The file an after-M-1 job waits for (relative to plat/). */
  file?: string;
  /** The reviewers whose summaries do not yet name the file's current sha256. */
  reviewPending?: string[];
  /** The item or milestone a not-built job waits for. */
  waitsFor?: string;
  /** A harness whose index exists but failed to load: the job is built and FAILS naming this (never skipped). */
  loadError?: string;
}

/** What running one unit gave (the executor's own measurement: spawn to exit, the unit's processes' CPU). */
export interface UnitRun {
  code: number;
  /** The unit's wall-clock in ms: its active time, from start to exit. */
  wallMs: number;
  /** The unit's CPU time in ms: user + system of its processes (the children's, read by the shell's `times`). */
  cpuMs: number;
  /** The tail of the unit's output (truncated), when the executor kept one. */
  output?: string;
  signal?: string | null;
}

export type Executor = (unit: Unit, ctx: { root: string; out: string; onSpawn?: (pid: number) => void }) => Promise<UnitRun>;

export type TierMode = 'plain' | 'whole' | 'batched';

export interface UnitRecord {
  job: string;
  unit: string;
  code: number;
  wallMs: number;
  cpuMs: number;
}

/** One batch of the batched timing mode (C-0097): one unit under §12.1's protocol through M0-f-01's timeBatch. */
export interface BatchRecord extends UnitRecord {
  calibration: { before: number; after: number; drift: number; attempts: number };
  flags: TimingFlag[];
  authority: Authority;
  reasons: string[];
  /** The batch's mean calibrate score ÷ the reference score; null while the reference score is null (C-0075). */
  normalisation: number | null;
}

export type JobOutcome = 'pass' | 'fail' | 'over budget' | 'not run';

export interface JobRecord {
  name: string;
  item: string;
  kind: JobKind;
  source: string;
  status: JobStatus;
  outcome: JobOutcome;
  /** Why a job failed or was not run (an empty suite, a failing unit, a pending file, a not-built item). */
  reason: string | null;
  /** The effective size the job ran at (after the fallback switch), or null. */
  size: number | null;
  wallMs: number;
  cpuMs: number;
  /** The job's normalised figure (wall, or CPU ÷ 16 in a projected tier) when a normalisation exists. */
  normalised: number | null;
  budgetMs: number | null;
  units: UnitRecord[];
}

export interface PendingRecord {
  name: string;
  item: string;
  status: JobStatus;
  file: string;
  reviewPending: string[];
  reason: string;
}

export interface FallbackRecord {
  applied: boolean;
  /** Each job whose size the switch reduced; the constructive set is never among them. */
  changed: { job: string; kind: JobSize['kind']; from: number; to: number }[];
}

export interface BudgetRecord {
  /** The budget in ms and the cores it is stated on. */
  ms: number;
  cores: 8 | 16;
  /** The raw figure: wall-clock (PR) or CPU time ÷ 16 (the projected tiers). */
  figureMs: number;
  /** 'wall-clock' or 'cpu ÷ 16'. */
  basis: 'wall-clock' | 'cpu ÷ 16';
  /** The figure divided by the normalisation; null while there is none (no reference score, or a plain run). */
  normalisedMs: number | null;
  /** Over budget is a normalised figure more than 10 % over (§13.8); `unjudged` without a normalisation. */
  verdict: 'pass' | 'over budget' | 'unjudged';
  /** Whether this verdict may gate: a measured, authoritative, timed (whole or batched), non-projected figure. */
  gating: boolean;
  reason: string;
}

export interface TierReport {
  tier: TierName;
  mode: TierMode;
  jobs: JobRecord[];
  /** The summed active wall-clock of every unit run (idle and calibrations excluded). */
  wallMs: number;
  /** The summed CPU time of every unit run. */
  cpuMs: number;
  /** The tier's normalised figure (budget basis ÷ normalisation), or null. */
  normalised: number | null;
  /**
   * The figure's normalisation, a measured ratio (§12.1's runner score ÷ reference score): the whole run's mean calibrate
   * score ÷ the reference score; in the batched mode the summed figure ÷ the sum of its batches, each normalised by its
   * own two scores. It is ≈ 1 on the reference machine (within the 5 % drift): C-0027's "normalisation 1" is read as
   * this ratio (N-3, C-0398). Null while there is no reference score (C-0075), and in a plain run.
   */
  normalisation: number | null;
  budget: BudgetRecord;
  /**
   * `fail` when a built job failed (an empty or missing suite, a failing unit); `over budget` when a job or the tier
   * ran more than 10 % over its normalised budget; else `pass`. Pending and not-built jobs are neither (C-0069).
   */
  verdict: 'pass' | 'fail' | 'over budget';
  /** True for the 16-core tiers (C-0027): the budget figure is CPU ÷ 16 and never gates at M0. */
  projected: boolean;
  /** Jobs listed pending-after-M-1 with their file and reason: never run, never counted (C-0069, C-0121). */
  pending: PendingRecord[];
  /** Jobs not built yet, with the item they wait for: the tier is not end to end until none remains. */
  notBuilt: { name: string; status: JobStatus }[];
  endToEnd: boolean;
  /** The batched mode's batches (C-0097); empty in the other modes. */
  batches: BatchRecord[];
  /** The whole mode's two calibrate scores and their drift (C-0097); null in the other modes. */
  calibration: { before: number; after: number; drift: number } | null;
  authority: Authority | null;
  readings: 'measured' | 'built' | null;
  reasons: string[];
  fallback: FallbackRecord;
  /** The whole run's elapsed time end to end (plain and whole modes; the batched sum excludes idle). */
  elapsedMs: number;
  host: HostRecord | null;
  /** States what the gating figure covers (C-0121: the sum over the built jobs, pending ones named). */
  covers: string;
  at: string;
}
