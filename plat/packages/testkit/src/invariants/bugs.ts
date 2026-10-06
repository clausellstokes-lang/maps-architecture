// The bug-abort shape on the kernel's side (M0-k-04; §5.1 (8): "F-NUM on a mandatory chain's E_OUT_OF_RANGE … A bug
// abort rolls its batch back, so nothing it wrote commits; writes a `bugs` entry (class, entity, stream key, stage;
// §5.4); and gives the entity its class's tier-6 outcome"; §13.1 "`bugs` empty: every CI run fails on a `bugs` entry
// outside those fixtures"). The fault-injection hook on B-CITY-lite is M1's and B-EDIT's M2a's (this item's defers);
// here the kernel half: a mandatory chain the kernel refuses E_OUT_OF_RANGE — a typed result, never a throw — leaves
// the arena at its version, and the caller's bugs entry is replayable from its key.
import type { LatticePoint } from '@plat/kernel';
import { framedAround, kernelOn, lpt, spec } from './support.js';
import type { BugEntry } from './types.js';

/** What a bug abort on one mandatory chain came to. */
export interface BugAbort {
  /** The kernel's result code for the chain. */
  readonly code: string;
  /** Nothing the batch wrote committed: the arena's version and print are those before it. */
  readonly rolledBack: boolean;
  /** The `bugs` entry the abort writes (null where the chain committed — no abort). */
  readonly bug: BugEntry | null;
  /** The entity's outcome tier: 6 (the feature omitted and reported) on an abort, else 0. */
  readonly tier: 0 | 6;
}

/**
 * Inserts `chain` as a mandatory way (an arterial, §3.6's mandatory class) on a framed arena through the façade and
 * takes §5.1 (8)'s bug abort when the kernel refuses it E_OUT_OF_RANGE. `key` is the draw's replay key (a seed).
 */
export function bugAbort(chain: readonly LatticePoint[], key: number): BugAbort {
  const inside = chain.filter((q) => Math.abs(q.x) < 8_388_608 && Math.abs(q.y) < 8_388_608);
  const p = framedAround(inside.length > 0 ? inside : [lpt(0, 0)]);
  if (p === null) throw new Error('bugAbort: no frame');
  const k = kernelOn([p]);
  const version = p.version;
  const entity = `way:arterial-${String(key)}`;
  const r = k.tx(spec(1), (o) => k.geom.insertChain(o, chain, [{ role: 'way', entity }], 'mandatory'));
  const rolledBack = p.version === version;
  if (r.ok) return { code: 'ok', rolledBack: false, bug: null, tier: 0 };
  if (r.code !== 'E_OUT_OF_RANGE') return { code: r.code, rolledBack, bug: null, tier: 0 };
  return { code: r.code, rolledBack, bug: { cls: 'F-NUM', entity, key: `bfuzz/bugAbort#${String(key)}`, stage: 'S4' }, tier: 6 };
}
