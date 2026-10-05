// What the matching result hands on (item M0-d-05b; §6.3 *Carry-over*, *Never reused; one collision rule*): every
// reference to an old address resolved through the outcomes — kept when the address lives on (a survivor, or a
// successor that took it), reported when it does not (a tombstone, with its `supersededBy` when a fresh entity covers
// its anchor), never re-bound silently to another address — and the two inputs of M0-d-05a's mint the routine
// produces: the live set (each address once, the re-derived ones `retired`; M0-d-05a's note N-2) and each fresh
// record's handed-on address.
import type { LineageHash } from '@plat/kernel';
import type { BatchRecord, LiveEntry } from '../identity/index.js';
import type { Id } from '../types/index.js';
import type { MatchEntity, MatchResult } from './types.js';

/** How one reference resolves. */
export type Resolution =
  /** The address lives on: a survivor keeps it, or the successor `fresh` took it (`fresh` absent for a survivor). */
  | { readonly ref: Id; readonly status: 'kept'; readonly fresh?: Id }
  /** The address is a tombstone: reported, with the covering successor's address when there is one (never re-bound). */
  | { readonly ref: Id; readonly status: 'tombstone'; readonly supersededBy?: Id }
  /** The routine never saw the address (outside the matched scope): reported, left as it is. */
  | { readonly ref: Id; readonly status: 'unknown' };

/** One reference resolved through the result. */
export function resolveRef(result: MatchResult, ref: Id): Resolution {
  const o = result.old.get(ref);
  if (o === undefined) return Object.freeze({ ref, status: 'unknown' });
  if (o.outcome === 'survive') return Object.freeze({ ref, status: 'kept' });
  if (o.outcome === 'succeed') return Object.freeze({ ref, status: 'kept', fresh: o.fresh });
  if (o.outcome === 'tombstone') {
    return Object.freeze(o.supersededBy === undefined ? { ref, status: 'tombstone' } : { ref, status: 'tombstone', supersededBy: o.supersededBy });
  }
  throw new RangeError(`match: the old address ${ref} has a fresh outcome`);
}

/** References resolved: those that keep their address, and those reported (tombstones and unknown addresses), each in input order. */
export interface Rebinding {
  readonly kept: readonly Resolution[];
  readonly reported: readonly Resolution[];
}

/** Resolves every reference; a reference is kept or reported, never re-bound to another address. */
export function rebind(result: MatchResult, refs: readonly Id[]): Rebinding {
  const kept: Resolution[] = [];
  const reported: Resolution[] = [];
  for (const ref of refs) {
    const r = resolveRef(result, ref);
    (r.status === 'kept' ? kept : reported).push(r);
  }
  return Object.freeze({ kept: Object.freeze(kept), reported: Object.freeze(reported) });
}

/**
 * The mint's live set (M0-d-05a's `LiveEntry`) from the old entities the routine matched: each address once (the
 * routine refuses an old id given twice, so no survivor's address can also be a retired one — M0-d-05a's note N-2),
 * every re-derived entity `retired`, every survivor not.
 */
export function liveSetOf(old: readonly MatchEntity[], result: MatchResult): readonly LiveEntry[] {
  const seen = new Set<Id>();
  const out: LiveEntry[] = [];
  for (const e of old) {
    if (seen.has(e.id)) throw new RangeError(`match: the old id ${e.id} is given twice`);
    seen.add(e.id);
    const o = result.old.get(e.id);
    if (o === undefined) throw new RangeError(`match: the old id ${e.id} is not in the result`);
    const lineage = Object.freeze([e.lineage[0], e.lineage[1]]) as unknown as Readonly<LineageHash>;
    out.push(Object.freeze(o.outcome === 'survive' ? { id: e.id, lineage } : { id: e.id, lineage, retired: true }));
  }
  return Object.freeze(out);
}

/** A fresh entity's batch record before the routine: the record without its handed-on address, and its provisional id. */
export interface FreshRecord {
  readonly id: Id;
  readonly record: BatchRecord;
}

/** The mint's batch records: each fresh record with the address succession handed it (none for a fresh entity). */
export function batchRecordsOf(fresh: readonly FreshRecord[], result: MatchResult): readonly BatchRecord[] {
  return Object.freeze(
    fresh.map(({ id, record }) => {
      if (record.address !== undefined) throw new RangeError(`match: the fresh record ${id} already carries an address`);
      const to = result.handedOn.get(id);
      return Object.freeze(to === undefined ? { ...record } : { ...record, address: to });
    }),
  );
}
