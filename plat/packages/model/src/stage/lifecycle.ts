// The lifecycle stamp a stage writes on a record it generates (§2.8): existence `generated`, no flag set, `since` —
// the event that last changed `existence` — the generating epoch at sequence 0, the stamp every M0 record writer
// spells (the digest's leaf reads `since`). One builder for every writer, in the package that declares `Lifecycle`.
import type { Lifecycle } from '../types/index.js';

/**
 * The lifecycle of a record generated in `epoch` (§2.8) — a fresh object per call (the records are plain and later
 * steps write on them), its keys in §2.8's order; an epoch of −0 is written as 0. Throws a RangeError on an epoch that
 * is not a whole number from 0 to 2^53 − 1 (an epoch counts the document's edit epochs).
 */
export function generatedLifecycle(epoch: number): Lifecycle {
  if (!Number.isSafeInteger(epoch) || epoch < 0) throw new RangeError(`generatedLifecycle: epoch ${epoch} is not a whole number ≥ 0`);
  return { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: epoch === 0 ? 0 : epoch, seq: 0 } };
}
