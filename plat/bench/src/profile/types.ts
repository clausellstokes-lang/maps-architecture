// bench/src/profile — the shapes the driver writes and the analysers read (R7's driver.mts record, AMENDMENTS-2026-10-28z
// item 990 (c)). Only the fields the analysers use are typed; the inspector's own objects keep their protocol names.

/** One stage's hrtime marks (ns, as decimal strings: bigint survives JSON so) and its wall-clock (ms). */
export interface Mark {
  readonly t0: string;
  readonly t1: string;
  readonly ms: number;
}

/** A logpoint kind: a cut (splitFace / connectHole in tryCandidate) or a kerb read (kerbFace / kerbSeed). */
export type CutKind = 'split' | 'hole' | 'kerbFace' | 'kerbSeed';

/** The driver's record, `<tag>.json`. */
export interface ProfileRecord {
  readonly run: string;
  readonly seed: number;
  readonly stage: string;
  readonly mode: 'cpu' | 'plain' | 'count';
  readonly interval: number;
  readonly cuts: boolean;
  readonly node: string;
  readonly v8: string;
  readonly debugBuild: boolean;
  /** The model digest's root, hex (as measure.ts prints it). */
  readonly root: string;
  readonly stageRoots: Record<string, string>;
  readonly marks: Record<string, Mark>;
  readonly totalMs: number;
  readonly lanes: number | null;
  readonly blocks: number | null;
  /** Logpoint hits per kind inside the stage. */
  readonly cutCounts: Partial<Record<CutKind, number>>;
  /** The logpoints armed, one line each (kind@file:line:col -> the location V8 chose). */
  readonly armed: readonly string[];
  /** Every logpoint hit: [kind, hrtime ns as a decimal string]. */
  readonly cutStamps: readonly (readonly [CutKind, string])[];
}

/** A V8 call frame (the inspector's Runtime.CallFrame). */
export interface CallFrame {
  readonly functionName: string;
  readonly scriptId: string;
  readonly url: string;
  /** 0-based. */
  readonly lineNumber: number;
  /** 0-based. */
  readonly columnNumber: number;
}

/** A V8 CPU profile (the inspector's Profiler.Profile; times in µs). */
export interface CpuProfile {
  readonly nodes: readonly { readonly id: number; readonly callFrame: CallFrame; readonly children?: readonly number[] }[];
  readonly startTime: number;
  readonly endTime: number;
  readonly samples: readonly number[];
  readonly timeDeltas: readonly number[];
}

/** The generated sources the profile or the coverage names, by script id (`<tag>.sources.json`). */
export type Sources = Record<string, { readonly url: string; readonly source: string }>;

/** A count run's stage window: per script, the functions that ran, their start offset and call count. */
export type Coverage = readonly {
  readonly scriptId: string;
  readonly url: string;
  readonly functions: readonly { readonly functionName: string; readonly start: number; readonly count: number }[];
}[];
