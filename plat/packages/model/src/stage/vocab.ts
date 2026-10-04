// The stage vocabularies and the work-limit law's evaluation (M0-m-01; C-0142 (6), (7)).
//
// STAGE_IDS: the stage-id registry's textual names (§4.12's 'S0' … 'S15' and their lettered stages) in C-0020's
// registration order — §4.1's drawn order, then S7c, S9b and S8.seed. The u16 ids themselves are the registry's
// (M0-d-01's kernel/src/registry, C-0005); this is the names' typed vocabulary. DATA_KEYS: the data keys §4.12 names;
// DataKey stays a string, so a stage declares further keys of its own.
import type { WorkLimitLaw } from './decl.js';

/** The stage-id registry's names, in C-0020's order. */
export const STAGE_IDS = Object.freeze([
  'S0',
  'S1',
  'S2',
  'S3',
  'S4',
  'S5',
  'S6',
  'S7',
  'S7b',
  'SKY',
  'S12a',
  'S8',
  'S9',
  'S10a',
  'S10',
  'S10b',
  'S11',
  'S12b',
  'S12c',
  'S13a',
  'S14',
  'S15',
  'S7c',
  'S9b',
  'S8.seed',
] as const);

/** A registered base stage's name. */
export type StageName = (typeof STAGE_IDS)[number];

/** The data keys §4.12 names. */
export const DATA_KEYS = Object.freeze([
  'terrain',
  'water',
  'roster',
  'reservations',
  'reservations.landing',
  'allocations',
  'allocations.landing',
  'raised',
] as const);

/** A data key §4.12 names. */
export type KnownDataKey = (typeof DATA_KEYS)[number];

/** ⌈log2(n)⌉ for n > 1 — the least k with 2^k ≥ n, by exact doubling — and 0 for n ≤ 1 (a depth is never negative). */
function ceilLog2(n: number): number {
  let k = 0;
  let p = 1;
  while (p < n) {
    p = p * 2;
    k += 1;
  }
  return k;
}

/**
 * A work-limit law's limit for `count` units (§5.1 (5)): floor + perUnit × count, or with `log2` floor + perUnit ×
 * ⌈log2(count)⌉. Doubles with + and × only, the same on every engine; no rounding (a kernel count reaches the limit
 * when it is ≥ it). `count` is the committed count(unit, scope) — M0-f-03a's workLimitOf reads it. Throws a
 * RangeError on a count that is negative, NaN or infinite, or a law whose floor or perUnit is not finite.
 */
export function lawLimit(law: WorkLimitLaw, count: number): number {
  if (!(count >= 0) || !Number.isFinite(count)) throw new RangeError(`lawLimit: count ${count} for '${law.counter}'`);
  if (!Number.isFinite(law.floor) || !Number.isFinite(law.perUnit)) {
    throw new RangeError(`lawLimit: law '${law.counter}' has floor ${law.floor}, perUnit ${law.perUnit}`);
  }
  return law.floor + law.perUnit * (law.log2 === true ? ceilLog2(count) : count);
}
