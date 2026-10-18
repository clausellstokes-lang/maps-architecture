// The cross-host harness's shapes (M0-d-06; §6.5 (9) cross-host, §13.2 stage contract tests, §13.3 the five-engine
// run, §12.1 the host record and the in-Chrome figures; C-0028, C-0051, C-0067, C-0082).
//
// A FIXTURE is a seed list and a stage list over one stage table (an entry module inside plat/ exporting
// `crosshostStages`), with the input files its stages read (paths inside plat/, read by the runner and handed to every
// leg as text, C-0067). A LEG is one engine — Node arm64, Node x86-64 (under Rosetta 2 on the reference Mac), Chromium,
// Firefox, WebKit — run with workers off (the stages on the leg's main thread) and on (inside one worker_thread / Web
// Worker). Every run returns, per (stage, seed), the stage's model digest and records digest (and, in the timing mode,
// the wall-clock the harness took around the stage call); the REPORT compares every run with the reference run
// (Node arm64, workers off) and names the first differing stage and seed.

/** The five legs, in the report's order; the first is the reference engine (§6.5 (9), C-0028). */
export const CROSSHOST_LEGS = ['node-arm64', 'node-x64-rosetta', 'chromium', 'firefox', 'webkit'] as const;
export type CrossHostLegId = (typeof CROSSHOST_LEGS)[number];

/** Workers off (the stages on the leg's main thread) and on (inside one worker), in the report's order. */
export const CROSSHOST_WORKERS = ['off', 'on'] as const;
export type CrossHostWorkers = (typeof CROSSHOST_WORKERS)[number];

/** The reference run every other run is compared with (§6.5 (9): "a report comparing every leg to the arm64 reference"). */
export const CROSSHOST_REFERENCE: { readonly leg: CrossHostLegId; readonly workers: CrossHostWorkers } = Object.freeze({ leg: 'node-arm64', workers: 'off' });

/** A digest as 32 lower-case hexadecimal digits: the four u32 words of an H128, word 0 first. */
export type CrossHostHex = string;

/** What one stage call returns: its model digest and its records digest (null for a stage that writes no records). */
export interface CrossHostDigest {
  readonly model: CrossHostHex;
  readonly records: CrossHostHex | null;
}

/** What a stage call sees beside its seed. */
export interface CrossHostStageContext {
  /** The fixture's input files by name, as text (read by the runner inside plat/, C-0067). */
  readonly inputs: Readonly<Record<string, string>>;
  /**
   * One map per seed, shared by that seed's stages in list order: a pipeline stage leaves its output here for the next
   * (the spike city's S1 → S4 → …). Empty at each seed's first stage.
   */
  readonly carry: Map<string, unknown>;
}

/** One stage of a stage table. */
export interface CrossHostStage {
  /** The stage's id, unique in its table: what a fixture's stage list names. */
  readonly id: string;
  /**
   * false: the stage reads no seed (a known-answer set) and runs once per run, before the seeded stages, its cells
   * carrying seed null; absent or true: it runs once per seed.
   */
  readonly seeded?: boolean;
  /** The stage call: a pure function of (seed, inputs, the seed's carry) — no clock, no Math.random (§6.5 (3)). */
  run(seed: number, ctx: CrossHostStageContext): CrossHostDigest;
}

/** The fixture file's shape (JSON, inside plat/). */
export interface CrossHostFixtureFile {
  /** The fixture's id (the report's and the output file's name). */
  readonly id: string;
  /** The stage table: a plat/-relative path of a module exporting `crosshostStages: CrossHostStage[]`. */
  readonly entry: string;
  /** u32 seeds, in run order. */
  readonly seeds: readonly number[];
  /** Stage ids of the table, in run order (unseeded stages run first, once). */
  readonly stages: readonly string[];
  /** Input name → plat/-relative file path; each file is read as UTF-8 text and handed to every leg. */
  readonly inputs?: Readonly<Record<string, string>>;
}

/** A loaded fixture: the file's fields with the entry resolved and the inputs read. */
export interface CrossHostFixture {
  readonly id: string;
  /** The fixture file, plat/-relative (or the caller's label for an in-memory fixture). */
  readonly source: string;
  /** The entry module's absolute path (inside plat/). */
  readonly entryPath: string;
  readonly seeds: readonly number[];
  readonly stages: readonly string[];
  readonly inputs: Readonly<Record<string, string>>;
}

/** The job a leg runs: the fixture's seeds, stages and inputs, and the timing switch. */
export interface CrossHostJob {
  readonly fixture: string;
  readonly seeds: readonly number[];
  readonly stages: readonly string[];
  readonly inputs: Readonly<Record<string, string>>;
  /** The timing mode (C-0082): the harness's clock read around each stage call, never inside model code. */
  readonly timing: boolean;
}

/** One (stage, seed) result. */
export interface CrossHostCell {
  readonly stage: string;
  /** The seed, or null for an unseeded stage. */
  readonly seed: number | null;
  /** The model digest, or null when the call threw. */
  readonly model: CrossHostHex | null;
  readonly records: CrossHostHex | null;
  /** The thrown value's text when the call threw (an error is compared like a digest). */
  readonly error?: string;
  /** The timing mode's wall-clock around the call, ms (the harness's clock, performance.now()). */
  readonly ms?: number;
}

/** What a leg's runtime returns for one job. */
export interface CrossHostLegResult {
  readonly cells: CrossHostCell[];
  /** Where the stages ran: 'main' (workers off) or 'worker' (workers on) — read from the leg itself. */
  readonly thread: 'main' | 'worker';
}

/** The host kinds of §12.1's host record (C-0028; M0-f-01's HostKind). */
export type CrossHostKind = 'native-arm64' | 'rosetta' | 'native-x64';

/** §12.1's host record on one leg: CPU, cores, memory, OS, the engine's name and version, the host kind. */
export interface CrossHostLegHost {
  readonly cpu: string;
  readonly cores: number;
  readonly memoryBytes: number;
  readonly os: string;
  /** The engine: 'node' with process.version (and V8's version), or the browser's name with Playwright's version string. */
  readonly engine: { readonly name: string; readonly version: string; readonly v8?: string };
  /** process.arch of the Node process (a Node leg's own; a browser leg's parent's — the browser runs on that machine). */
  readonly arch: string;
  readonly kind: CrossHostKind;
  /** A browser leg's user agent, cores and device memory as the page reads them. */
  readonly userAgent?: string;
  readonly hardwareConcurrency?: number;
  readonly deviceMemory?: number | null;
  /** A browser leg's executable (inside the Playwright cache). */
  readonly executable?: string;
}

/** The first cell where a run differs from the reference run. */
export interface CrossHostDifference {
  readonly stage: string;
  readonly seed: number | null;
  /** Which field differs first: the model digest, the records digest, the error, or a cell missing on one side. */
  readonly field: 'model' | 'records' | 'error' | 'missing';
  readonly reference: string | null;
  readonly got: string | null;
}

/** One run of the report: a leg with workers off or on. */
export interface CrossHostRun {
  readonly leg: CrossHostLegId;
  readonly workers: CrossHostWorkers;
  /**
   * ran: the leg returned its cells; blocked: the leg cannot run on this machine (no arm64 Node, a browser absent from
   * the Playwright cache — never downloaded, never faked, C-0028); failed: the leg started and broke (no result).
   */
  readonly status: 'ran' | 'blocked' | 'failed';
  /** Why a run is blocked or failed. */
  readonly reason?: string;
  readonly host?: CrossHostLegHost;
  readonly thread?: 'main' | 'worker';
  readonly cells?: CrossHostCell[];
  /** For a ran run other than the one compared with: whether every cell equals it. */
  readonly agrees?: boolean;
  readonly firstDifference?: CrossHostDifference;
  /** Wall-clock of the whole run, ms (informative; never a timing bar). */
  readonly wallMs?: number;
}

/** The cross-host report (§6.5 (9), §13.3's five-engine run shape). */
export interface CrossHostReport {
  readonly schema: 1;
  readonly fixture: string;
  readonly source: string;
  readonly seeds: readonly number[];
  readonly stages: readonly string[];
  readonly timing: boolean;
  /** The runs asked for (legs × workers), in the report's order. */
  readonly runs: CrossHostRun[];
  /** The design's reference run (Node arm64, workers off). */
  readonly reference: { readonly leg: CrossHostLegId; readonly workers: CrossHostWorkers };
  /** The run every other ran run was compared with: the reference when it ran, else the first ran run (null: none ran). */
  readonly comparedWith: { readonly leg: CrossHostLegId; readonly workers: CrossHostWorkers } | null;
  /** The cells per run. */
  readonly cellsPerRun: number;
  /**
   * pass: every run asked for ran and every cell agrees; fail: a ran run differs or a run failed; incomplete: no
   * difference and no failure, but a run is blocked (or none ran) — never a pass.
   */
  readonly verdict: 'pass' | 'fail' | 'incomplete';
  /** Each differing run's first difference, named by leg, workers, stage and seed. */
  readonly differences: { readonly leg: CrossHostLegId; readonly workers: CrossHostWorkers; readonly difference: CrossHostDifference }[];
}
