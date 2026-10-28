// M0-timings.json's shape (M0-t-00 pins it; M0-t-01's run writes it, M0-t-02's `--only` re-run appends its `rerun` block —
// C-0080, C-0115). Per bar: the row as M0-work.json states it, the measured figures (each its value, unit, budget,
// verdict, the factor of a miss, the ±15 % rule's legs where it applies), the bar's verdict (pass / miss by factor /
// reported / unmeasured), the authority stamp and host record of its batches, the fallback its miss rule names
// (applied by its owning item in a T-fix round, recorded in choices.md) and — for a kernel bar — C-0098's next step;
// the normalisation is the measured ratio, ≈ 1 on the reference machine (C-0027, read as C-0411 (3) reads it).
import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import type { HostRecord } from '../host/index.js';
import type { BarId, TimingBarRow } from './bars.js';
import type { BatchSummary, FigureRecord, Ladder } from './protocol.js';
import type { TierRecord } from './tiers.js';

/** The record's schema tag. */
export const RECORD_SCHEMA = 'plat/M0-timings/1';

/** The phase's designed refusals: an unlawful STATE, never lawful input (J264, N-58). */
export type RefusalClass = 'no-token' | 'contended-machine';

export interface Refusal {
  readonly refused: RefusalClass;
  /** UNLAWFUL state; REFUSE (typed, visible); the message names the alternative. */
  readonly kind: 'unlawful-state';
  readonly message: string;
  readonly alternative: string;
  readonly reasons: readonly string[];
  readonly at: string;
}

/** The first act's record (C-0075): the score written once, or read (a later run, and every `--only` run, C-0080). */
export interface ReferenceAct {
  readonly action: 'written' | 'read';
  readonly path: string;
  readonly score: number | null;
  readonly calibrateVersion: number | null;
  readonly host: HostRecord | null;
  readonly calibration: { readonly scores: readonly [number, number]; readonly drift: number } | null;
  readonly measuredAt: string | null;
  readonly writtenBy: string | null;
  /** The first act's attempts (written: the agreeing attempt's number). */
  readonly attempts: number;
  /** The measured stamp the score was written under (its reasons hold only "no reference score"). */
  readonly stamp: { readonly readings: 'measured' | 'built'; readonly reasons: readonly string[] } | null;
}

/** One bar's record. */
export interface BarRecord {
  readonly id: BarId;
  /** The row as M0-work.json states it (read at the run, never copied into the code). */
  readonly bar: string;
  readonly source: string;
  readonly code: string;
  readonly measuredIn: string;
  readonly reMeasuredBy: string;
  readonly role: 'gating' | 'reported';
  readonly kernel: boolean;
  /** The real entry the bar is measured through. */
  readonly entry: string;
  /** Which workload was timed. */
  readonly workload: string;
  readonly figures: readonly FigureRecord[];
  /** pass; miss (by `factor`); reported (a reported row); unmeasured (a batch dropped, or no sample: re-run with --only). */
  readonly verdict: 'pass' | 'miss' | 'reported' | 'unmeasured';
  /** The largest factor of a missed gating figure (value ÷ budget), else null. */
  readonly factor: number | null;
  /** The fallback the row's miss rule names, set when the bar missed (applied by `appliedBy` in a T-fix round, C-0080). */
  readonly fallback: string | null;
  readonly appliedBy: string | null;
  /** A kernel bar's miss: C-0098's ordered ladder and its next step. */
  readonly ladder: Ladder | null;
  /** The authority stamps of its batches (accepted, re-queued and dropped), each with its host. */
  readonly batches: readonly BatchSummary[];
  readonly requeued: number;
  readonly dropped: number;
  /** The host record of the batches (§12.1: a stored timing names its machine). */
  readonly host: HostRecord | null;
  /** What the workload's batches kept beside their samples (the S11 call list, the per-kind matching rows, …). */
  readonly extras: readonly Readonly<Record<string, unknown>>[];
  /** The tiers bar's records (C-0097, C-0121). */
  readonly tiers?: readonly TierRecord[];
}

/** One `--only` re-run (M0-t-02, C-0080). */
export interface RerunBlock {
  readonly at: string;
  readonly token: string;
  readonly only: readonly BarId[];
  readonly referenceScore: ReferenceAct;
  readonly bars: readonly BarRecord[];
}

export interface TimingsRecord {
  readonly schema: typeof RECORD_SCHEMA;
  /** Written by M0-t-01's run of bench:timing-phase (M0-t-00's script, C-0115). */
  readonly writtenBy: string;
  /** The session's TIMING-PHASE OPEN token (C-0103), recorded. */
  readonly token: string;
  readonly startedAt: string;
  readonly finishedAt: string;
  readonly host: HostRecord | null;
  /** `measured`, or `built` with the seams a test injected (a built record is never a result, C-0047). */
  readonly readings: 'measured' | 'built';
  readonly seams: readonly string[];
  readonly referenceScore: ReferenceAct;
  /** §12.1's normalisation: each figure ÷ (its batch's calibrate score ÷ the reference score), ≈ 1 here (C-0027). */
  readonly normalisation: string;
  readonly protocol: Readonly<Record<string, number | string>>;
  /** Every timingBars row once, in its order (a full run). */
  readonly bars: readonly BarRecord[];
  /** The refusal census (J264, N-58): the phase's two designed refusals with their class, and what any bar refused. */
  readonly census: Readonly<Record<string, unknown>>;
  /** The `--only` re-runs appended after the full run (C-0080). */
  readonly rerun: readonly RerunBlock[];
  readonly verdict: { readonly missed: readonly BarId[]; readonly unmeasured: readonly BarId[]; readonly reportedExceeding: readonly BarId[] };
}

/** Writes a JSON file atomically (write and rename), its folder made. */
export function writeAtomic(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp-${String(process.pid)}`;
  writeFileSync(tmp, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(tmp, path);
}

/** Reads a record (null when the file is absent). */
export function readRecord(path: string): TimingsRecord | null {
  let text: string;
  try {
    text = readFileSync(path, 'utf8');
  } catch {
    return null;
  }
  const r = JSON.parse(text) as TimingsRecord;
  if (r.schema !== RECORD_SCHEMA) throw new Error(`timing-phase: ${path} is not a ${RECORD_SCHEMA} record`);
  return r;
}
