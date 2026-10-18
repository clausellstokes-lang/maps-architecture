// The op-permutation harness (M0-d-08; §13.1 "a declared batch's result identical under any permutation of its ops";
// §13.2 "a declared batch's ops permuted give the same result"; §3.3 *Two op forms*: the kernel applies a declared
// batch's ops in canonical order — op kind rank, the owning entity's lineage key, the op's index — so the committed
// arena is a function of the prior arena and the op *set*, not of the order the stage issued them in).
//
// `permuteOps(tx, seed)` returns the transaction with its ops in a seeded random order (the reversal on `reverse`);
// `permutationCompare(seq, opts)` runs a sequence with every declared batch's ops permuted — reversed, then `count`
// random orders — and compares every batch's slot-free outcome with the order as issued. A callback batch has no op
// list and runs unchanged (its issue order is `runTwiceCompare`'s, §13.2: "op permutation does not apply to it").
import type { KernelTx } from '@plat/kernel';
import { compareOutcomes, runBatch, runSequenceOutcomes, type DeterminismSequence, type Divergence } from './issue.js';
import { harnessRng, shuffled } from './rng.js';

/** How the ops are moved: a seeded random order, or the reversal. */
export type PermuteMode = 'random' | 'reverse';

/** §13.1's permutation: the transaction with its declared ops in another order (seeded); every other field kept. */
export function permuteOps(tx: KernelTx, seed = 1, mode: PermuteMode = 'random'): KernelTx {
  const ops = mode === 'reverse' ? tx.ops.slice().reverse() : shuffled(tx.ops, harnessRng(seed));
  return { ...tx, ops };
}

/** A sequence whose declared batches have their ops permuted (seed + batch index per batch). */
export function permutedSequence(seq: DeterminismSequence, seed: number, mode: PermuteMode = 'random'): DeterminismSequence {
  return {
    name: `${seq.name} (ops ${mode === 'reverse' ? 'reversed' : `permuted ${seed}`})`,
    arena: seq.arena,
    batches: seq.batches.map((b, i) => ({
      name: b.name,
      build: (p) => {
        const s = b.build(p);
        return s.spec.ops.length < 2 ? s : { ...s, spec: permuteOps(s.spec, seed + i, mode) };
      },
    })),
  };
}

/** The permutation harness's verdict on one sequence. */
export interface PermutationReport {
  readonly name: string;
  /** Declared batches with two ops or more (the ones a permutation can move). */
  readonly permutable: number;
  /** Orders run beside the issued one: the reversal and the random ones. */
  readonly orders: number;
  readonly identical: boolean;
  readonly divergence: Divergence | null;
}

/** The options of `permutationCompare`. */
export interface PermutationOptions {
  /** Random orders beside the reversal (default 8). */
  readonly count?: number;
  /** The first seed (default 1). */
  readonly seed?: number;
}

/**
 * §13.1 / §13.2's op-permutation test on one sequence: every declared batch run with its ops reversed and in `count`
 * random orders gives, batch by batch, the outcome of the order as issued.
 */
export function permutationCompare(seq: DeterminismSequence, opts: PermutationOptions = {}): PermutationReport {
  const count = opts.count ?? 8;
  const seed = opts.seed ?? 1;
  const ref = runSequenceOutcomes(seq);
  // The batches a permutation can move, each read on the arena it runs on (a build only reads the arena).
  let permutable = 0;
  const p = seq.arena();
  for (const b of seq.batches) {
    const s = b.build(p);
    if (s.spec.ops.length >= 2) permutable++;
    runBatch(p, s);
  }
  const variants: DeterminismSequence[] = [permutedSequence(seq, seed, 'reverse')];
  for (let k = 0; k < count; k++) variants.push(permutedSequence(seq, seed + 1000 * (k + 1), 'random'));
  let divergence: Divergence | null = null;
  for (const v of variants) {
    divergence = compareOutcomes(v.name, ref, runSequenceOutcomes(v));
    if (divergence !== null) break;
  }
  return { name: seq.name, permutable, orders: variants.length, identical: divergence === null, divergence };
}

