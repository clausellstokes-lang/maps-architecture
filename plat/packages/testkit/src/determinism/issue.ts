// The issue-order harness (M0-d-08; §13.2 "a callback-form stage run twice, on a slot-renumbered arena and inside the
// pool at sizes 0–3 gives identical digests (issue order; op permutation does not apply to it, §3.3)"; §3.3 *Two op
// forms*: the issue order is a function of the stage's inputs, its streams and canonically sorted query results —
// never of slot numbers, worker scheduling or arrival order).
//
// A `DeterminismSequence` is a fresh arena and a list of batches, each built from the arena it runs on (a callback
// reads its slots from the overlay; a declared batch's ops are made from the arena just before it runs), so one
// sequence runs unchanged on any slot assignment. `runTwiceCompare(seq)` runs it four ways — fresh, fresh again, with
// the arena's slots reversed before every batch, and with them randomly permuted before every batch (seeded) — and
// compares every batch's slot-free outcome (outcomePrint: the refusal code, or the commit record, the arena and the
// five level digests). The pool-size clause (sizes 0–3) is M1's: the pool and its overlays are M1's (§4b).
import { tx, type Committed, type KernelResult, type KernelTx, type Overlay, type Plat, type TxEnv } from '@plat/kernel';
import { digestText, firstDifference, outcomePrint } from './print.js';
import { renumberSlots, type RenumberMode } from './renumber.js';

/** One batch as the arena it runs on sees it: its spec (declared ops in `spec.ops`, or none) and its callback. */
export interface DeterminismBatchSpec {
  readonly spec: KernelTx;
  readonly fn?: (o: Overlay) => KernelResult<unknown>;
  readonly env?: TxEnv;
}

/** One batch of a sequence, built from the arena it is about to run on. */
export interface DeterminismBatch {
  readonly name: string;
  readonly build: (p: Plat) => DeterminismBatchSpec;
}

/** A fresh arena and its batches, in order (§13.2's "stage", one batch or many). */
export interface DeterminismSequence {
  readonly name: string;
  readonly arena: () => Plat;
  readonly batches: readonly DeterminismBatch[];
}

/** How a run treats the slots between batches. */
export type RunKind = 'fresh' | 'again' | 'reversed' | 'renumbered';

/** One batch's outcome in one run: its print's digest and the print itself. */
export interface BatchOutcome {
  readonly batch: string;
  readonly digest: string;
  readonly print: string;
}

/** Where two runs first part. */
export interface Divergence {
  readonly run: RunKind | string;
  readonly batch: string;
  readonly line: number;
  readonly expected: string;
  readonly actual: string;
}

/** The issue-order harness's verdict on one sequence. */
export interface IssueOrderReport {
  readonly name: string;
  readonly runs: readonly (RunKind | string)[];
  readonly batches: number;
  /** Per batch, the reference run's outcome digest (the "per-stage digests"). */
  readonly digests: readonly string[];
  /** Per batch, the reference run's outcome: commit, nothing, or refused <code>. */
  readonly outcomes: readonly string[];
  readonly identical: boolean;
  readonly divergence: Divergence | null;
  /** The clause the harness does not run at M0, with its milestone (§4b). */
  readonly deferred: readonly string[];
}

/** Runs one batch on `p`. */
export function runBatch(p: Plat, b: DeterminismBatchSpec): KernelResult<Committed<unknown>> {
  return tx(p, b.spec, b.fn, b.env ?? {}) as KernelResult<Committed<unknown>>;
}

/** The options of a sequence run: how the slots move between batches. */
export interface SequenceRunOptions {
  /** Renumber the arena before every batch: in this mode, seeded per batch (seed + batch index). */
  readonly renumber?: { readonly mode: RenumberMode; readonly seed: number };
}

/** Runs a sequence once; every batch's slot-free outcome. */
export function runSequenceOutcomes(seq: DeterminismSequence, opts: SequenceRunOptions = {}): BatchOutcome[] {
  let p = seq.arena();
  const out: BatchOutcome[] = [];
  seq.batches.forEach((b, i) => {
    if (opts.renumber !== undefined) p = renumberSlots(p, opts.renumber.seed + i, { mode: opts.renumber.mode });
    const print = outcomePrint(p, runBatch(p, b.build(p)));
    out.push({ batch: b.name, digest: digestText(print), print });
  });
  return out;
}

/** The first batch where two runs' outcomes differ, or null. */
export function compareOutcomes(run: RunKind | string, want: readonly BatchOutcome[], got: readonly BatchOutcome[]): Divergence | null {
  for (let i = 0; i < want.length; i++) {
    const g = got[i];
    if (g !== undefined && g.digest === want[i].digest) continue;
    const d = firstDifference(want[i].print, g === undefined ? '' : g.print);
    return { run, batch: want[i].batch, line: d?.[0] ?? 0, expected: d?.[1] ?? '', actual: d?.[2] ?? '' };
  }
  return null;
}

/** The options of `runTwiceCompare`. */
export interface RunTwiceOptions {
  /** The seed of the random renumbering (default 1). */
  readonly seed?: number;
}

/** A batch outcome's kind, for the report. */
function kindOf(print: string): string {
  const first = print.split('\n', 1)[0];
  return first.startsWith('commit') ? 'commit' : first;
}

/**
 * §13.2's issue-order test on one sequence: run fresh, run again, run with the slots reversed before every batch and
 * run with them randomly renumbered before every batch; every batch's outcome compared with the first run's.
 */
export function runTwiceCompare(seq: DeterminismSequence, opts: RunTwiceOptions = {}): IssueOrderReport {
  const seed = opts.seed ?? 1;
  const ref = runSequenceOutcomes(seq);
  const runs: [RunKind, SequenceRunOptions][] = [
    ['again', {}],
    ['reversed', { renumber: { mode: 'reverse', seed } }],
    ['renumbered', { renumber: { mode: 'random', seed } }],
  ];
  let divergence: Divergence | null = null;
  for (const [kind, o] of runs) {
    divergence = compareOutcomes(kind, ref, runSequenceOutcomes(seq, o));
    if (divergence !== null) break;
  }
  return {
    name: seq.name,
    runs: ['fresh', ...runs.map(([k]) => k)],
    batches: ref.length,
    digests: ref.map((o) => o.digest),
    outcomes: ref.map((o) => kindOf(o.print)),
    identical: divergence === null,
    divergence,
    deferred: ['pool sizes 0–3 (§13.2; the pool and its overlays, §3.3) → M1 (§4b)'],
  };
}
