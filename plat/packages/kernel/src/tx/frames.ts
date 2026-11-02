// The frame observer's hook (M0-a-06 hardening round S8, line 4 (a); amendment z item 985 (d) (5) as J627 corrects it):
// a kernel-internal hook, null in production, that the transaction layer calls at each FRAME POINT — a batch frame
// opening (tx.ts `open`, right after the batch's before-image is taken and before the index's batch log opens, so a mark
// sees the index log closed as the batch's restore leaves it), an op frame opening (savepoint.ts `takeSavepoint` while a
// batch is open on the arena: `opSave`'s image), an image about to be put back and just put back (savepoint.ts `putBack`,
// after its refusal checks, so a refused put-back still changes nothing) and the commit (tx.ts). Only the test-side
// observer installs one (kernel/test/tx/support.ts `installFrameObserver`): it attaches the arena's recorder
// (arena/write.ts) for the batch and proves at every put-back that the door's log undoes the frame exactly — the oracle
// round 1B (S9) inherits. Each frame point costs one check of the hook when none is installed. By path only (rule 5).
import type { Plat } from '../arena/index.js';
import type { Savepoint } from './savepoint.js';

/** What the transaction layer tells an installed observer. Its methods must not throw into the kernel. */
export interface FrameObserver {
  /** A batch frame opened on `p`; `image` is the batch's before-image. */
  batchOpen(p: Plat, image: Savepoint): void;
  /** An op frame opened on `p` (an image taken while a batch is open on it: `opSave`'s). */
  opOpen(p: Plat, image: Savepoint): void;
  /** `image` is about to be put back on `p` (its refusal checks passed). */
  beforePutBack(p: Plat, image: Savepoint): void;
  /** `image` was just put back on `p`. */
  afterPutBack(p: Plat, image: Savepoint): void;
  /** The batch open on `p` commits. */
  commit(p: Plat): void;
}

/** The installed observer; null in production (read as a live binding by tx.ts and savepoint.ts). */
export let frameObserver: FrameObserver | null = null;

/** Installs `o` (null: none) and returns the observer it replaces. Tests only. */
export function setFrameObserver(o: FrameObserver | null): FrameObserver | null {
  const was = frameObserver;
  frameObserver = o;
  return was;
}
