// The matching bar's harness and record shape (item M0-d-05b; §6.3 *Budget*: "≤ 2 µs per re-derived point-anchored
// entity and ≤ 20 µs per overlap-anchored one, median"; §16 M0 (d)). The routine is run `repeats` times on a set; the
// whole call's time and each kind's time are read through the routine's probe from a clock the caller hands in (the
// model package reads no clock, §6.5 (3)). Every millisecond of a call counts (C-0190): a kind's time is its probed span
// plus a share of the call's unprobed time (the checks, the preparation of both sides, the splits, the result) in
// proportion to its re-derived old entities; per repeat, the per-entity time of each anchor class is the class's summed
// kind times over its re-derived old entities, so the classes' times add up to the whole call; the record holds every
// repeat's value and their medians. The bar is the timing phase's (M0-t-00's
// script, run alone by M0-t-01): a record taken anywhere else is stamped `contended` and never gates.
import { ratio } from '@plat/kernel';
import type { EntityKind } from '../types/index.js';
import { checkAnchors, type CheckedSpec } from './anchors.js';
import { match } from './match.js';
import type { SyntheticSet } from './synthetic.js';
import type { AnchorType, MatchCounts, MatchEntity, AnchorSpec } from './types.js';

/** §6.3's budgets, µs per re-derived entity, median. */
export const MATCH_BUDGET_US = Object.freeze({ point: 2, overlap: 20 });

/** The anchor class a kind's time counts in: `point`, or `overlap` (an area, a way, a key — every kind not point-anchored). */
export type AnchorClass = 'point' | 'overlap';

const classOf = (a: AnchorType): AnchorClass => (a === 'point' ? 'point' : 'overlap');

/** One kind's row. */
export interface KindTiming {
  readonly kind: EntityKind;
  readonly anchorClass: AnchorClass;
  /** Its re-derived old entities (the divisor). */
  readonly entities: number;
  /** Per repeat, µs per re-derived entity. */
  readonly samplesUs: readonly number[];
  readonly medianUs: number;
}

/** One anchor class's row, against its budget. */
export interface ClassTiming {
  readonly entities: number;
  readonly samplesUs: readonly number[];
  readonly medianUs: number;
  readonly budgetUs: number;
}

/** The record one run of the harness writes. */
export interface MatchTimingRecord {
  readonly item: 'M0-d-05b';
  readonly bar: 'matching ≤ 2 µs per point-anchored and ≤ 20 µs per overlap-anchored entity, median (§6.3; §16 M0 (d))';
  readonly set: string;
  readonly seed: number;
  readonly repeats: number;
  /** `contended` everywhere but the timing phase, which alone may stamp `timing-phase` (M0.md §0.1 (5)); a contended record never gates. */
  readonly status: 'contended' | 'timing-phase';
  readonly point: ClassTiming;
  readonly overlap: ClassTiming;
  readonly perKind: readonly KindTiming[];
  /** Per repeat, the whole call's time in milliseconds (the classes' times add up to it). */
  readonly callMs: readonly number[];
  /** The routine's outcome counts (the same on every repeat). */
  readonly counts: Readonly<MatchCounts>;
}

/** The median of a list of numbers (the lower middle of an even count). */
export function median(xs: readonly number[]): number {
  if (xs.length === 0) return 0;
  const s = [...xs].sort((a, b) => a - b);
  return s[(s.length - 1) >> 1];
}

const perEntity = (ms: number, n: number): number => {
  if (n === 0) return 0;
  const r = ratio(ms * 1000, n, 'count');
  if (!r.ok) throw new RangeError('match: no per-entity time without entities');
  return r.value;
};

/** The pair the harness times: a synthetic set, or any old / fresh pair with its anchor table (M0-d-09's real pairs). */
export interface TimedPair {
  readonly name: string;
  readonly seed: number;
  readonly old: readonly MatchEntity[];
  readonly fresh: readonly MatchEntity[];
  readonly anchors: readonly AnchorSpec[];
}

/**
 * Times the routine on `pair` `repeats` times with `now` (milliseconds) and returns the record. `status` is the
 * caller's: the timing phase stamps `timing-phase`; every other caller leaves `contended`.
 */
export function timeMatch(
  pair: TimedPair | SyntheticSet,
  now: () => number,
  repeats = 5,
  status: 'contended' | 'timing-phase' = 'contended',
): MatchTimingRecord {
  if (!Number.isInteger(repeats) || repeats < 1) throw new RangeError('match: the harness runs at least one repeat');
  const specs = checkAnchors(pair.anchors);
  const kinds = [...specs.keys()];
  const entities = new Map<EntityKind, number>();
  for (const k of kinds) entities.set(k, 0);
  for (const e of pair.old) if (e.survives !== true) entities.set(e.kind, (entities.get(e.kind) ?? 0) + 1);
  const samples = new Map<EntityKind, number[]>();
  for (const k of kinds) samples.set(k, []);
  const classSamples: Record<AnchorClass, number[]> = { point: [], overlap: [] };
  const classEntities: Record<AnchorClass, number> = { point: 0, overlap: 0 };
  for (const k of kinds) classEntities[classOf((specs.get(k) as CheckedSpec).spec.anchor)] += entities.get(k) ?? 0;
  const allEntities = classEntities.point + classEntities.overlap;
  const callMs: number[] = [];
  let counts: Readonly<MatchCounts> = { survive: 0, succeed: 0, tombstone: 0, fresh: 0 };
  for (let r = 0; r < repeats; r += 1) {
    const ms = new Map<EntityKind, number>();
    let t0 = 0;
    let call0 = 0;
    let call = 0;
    // One clock read per probe call: the whole call (kind null) and each kind's span.
    const result = match(pair.old, pair.fresh, pair.anchors, {
      probe: (kind, phase) => {
        const t = now();
        if (kind === null) {
          if (phase === 'begin') call0 = t;
          else call = t - call0;
        } else if (phase === 'begin') t0 = t;
        else ms.set(kind, (ms.get(kind) ?? 0) + (t - t0));
      },
    });
    counts = result.counts;
    callMs.push(call);
    let probed = 0;
    for (const k of kinds) probed += ms.get(k) ?? 0;
    // The call's unprobed time, shared across kinds by their re-derived old entities.
    const unprobed = call - probed;
    const shareOf = (n: number): number => {
      if (n === 0) return 0;
      const q = ratio(unprobed * n, allEntities, 'count');
      if (!q.ok) throw new RangeError('match: no share of the unprobed time without entities');
      return q.value;
    };
    const sum: Record<AnchorClass, number> = { point: 0, overlap: 0 };
    for (const k of kinds) {
      const n = entities.get(k) ?? 0;
      const t = (ms.get(k) ?? 0) + shareOf(n);
      sum[classOf((specs.get(k) as CheckedSpec).spec.anchor)] += t;
      if (n > 0) (samples.get(k) as number[]).push(perEntity(t, n));
    }
    classSamples.point.push(perEntity(sum.point, classEntities.point));
    classSamples.overlap.push(perEntity(sum.overlap, classEntities.overlap));
  }
  const perKind: KindTiming[] = [];
  for (const k of kinds) {
    const n = entities.get(k) ?? 0;
    if (n === 0) continue;
    const xs = samples.get(k) as number[];
    perKind.push(Object.freeze({ kind: k, anchorClass: classOf((specs.get(k) as CheckedSpec).spec.anchor), entities: n, samplesUs: Object.freeze(xs), medianUs: median(xs) }));
  }
  const cls = (c: AnchorClass): ClassTiming =>
    Object.freeze({ entities: classEntities[c], samplesUs: Object.freeze(classSamples[c]), medianUs: median(classSamples[c]), budgetUs: MATCH_BUDGET_US[c] });
  return Object.freeze({
    item: 'M0-d-05b',
    bar: 'matching ≤ 2 µs per point-anchored and ≤ 20 µs per overlap-anchored entity, median (§6.3; §16 M0 (d))',
    set: pair.name,
    seed: pair.seed,
    repeats,
    status,
    point: cls('point'),
    overlap: cls('overlap'),
    perKind: Object.freeze(perKind),
    callMs: Object.freeze(callMs),
    counts,
  });
}
