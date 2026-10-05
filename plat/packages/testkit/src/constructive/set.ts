// The constructive set (M0-k-02; §13.1 (2), §3.11; C-0038, C-0110, C-0181, C-0182): one list in §13.1's bullet order, which
// the B-FUZZ runner (M0-k-04) iterates, every case tagged with its milestone. `casesAt(m)` is the slice a milestone runs;
// `constructiveTally` reports the whole list's milestones; `runConstructive` is the iteration both this item's
// numeric-core run and M0-k-04's runner share — a deferred case is counted by its milestone, an M0 case with no judge
// is counted as pending its runner, never skipped silently.
import type { Seed } from '@plat/kernel';
import { DEFERRED_BULLET_CASES } from './cases/deferred.js';
import { EXPECTATION_CASES } from './cases/expectations.js';
import { FIXTURE_CASES } from './cases/fixtures.js';
import { FURTHER_CASES } from './cases/further.js';
import { GEOMETRY_CASES } from './cases/geometry.js';
import { INDEX_CASES } from './cases/indexes.js';
import { LIMIT_CASES } from './cases/limits.js';
import { MOVE_CASES } from './cases/moves.js';
import { QUANTISATION_CASES } from './cases/quantisation.js';
import { REMOVAL_CASES } from './cases/removals.js';
import { SKELETON_CASES } from './cases/skeleton.js';
import type { ConstructiveCase, ConstructiveClass, ConstructiveInput, ConstructiveMilestone, ConstructiveVerdict } from './types.js';

/** Every milestone a case may carry, in §16's order. */
export const CONSTRUCTIVE_MILESTONES: readonly ConstructiveMilestone[] = Object.freeze(['M0', 'M1', 'M2a', 'M2b', 'M3a', 'M4', 'M5', 'M6-P', 'M6-U']);

/** Every class, in §13.1's order. */
export const CONSTRUCTIVE_CLASSES: readonly ConstructiveClass[] = Object.freeze([
  'geometry',
  'quantisation',
  'attraction-moves',
  'kept-carves-water',
  'removals-profiles-neighbours',
  'stretch-state-writes',
  'indexes-slots-pool',
  'skeleton-fixtures',
  'kernel-limits',
  'expectations',
  'further-limits',
  'fixtures-items-12-28',
  'fixtures-items-45-53-65',
]);

const KEPT_IDS = new Set(DEFERRED_BULLET_CASES.filter((c) => c.class === 'kept-carves-water').map((c) => c.id));

/** The whole constructive set, in §13.1's bullet order. */
export const CONSTRUCTIVE_SET: readonly ConstructiveCase[] = Object.freeze([
  ...GEOMETRY_CASES,
  ...QUANTISATION_CASES,
  ...MOVE_CASES,
  ...DEFERRED_BULLET_CASES.filter((c) => KEPT_IDS.has(c.id)),
  ...REMOVAL_CASES,
  ...DEFERRED_BULLET_CASES.filter((c) => !KEPT_IDS.has(c.id)),
  ...INDEX_CASES,
  ...SKELETON_CASES,
  ...LIMIT_CASES,
  ...EXPECTATION_CASES,
  ...FURTHER_CASES,
  ...FIXTURE_CASES,
]);

{
  const seen = new Set<string>();
  for (const c of CONSTRUCTIVE_SET) {
    if (seen.has(c.id)) throw new Error(`constructive: the id ${c.id} is used twice`);
    seen.add(c.id);
  }
}

/** The cases tagged with `milestone`, in set order. */
export function casesAt(milestone: ConstructiveMilestone): ConstructiveCase[] {
  if (!CONSTRUCTIVE_MILESTONES.includes(milestone)) throw new RangeError(`casesAt: unknown milestone ${String(milestone)}`);
  return CONSTRUCTIVE_SET.filter((c) => c.milestone === milestone);
}

/** A case by its id, or undefined. */
export function constructiveCase(id: string): ConstructiveCase | undefined {
  return CONSTRUCTIVE_SET.find((c) => c.id === id);
}

/** The whole list's milestones: the count per milestone, per class and milestone, and the numeric-core count. */
export interface ConstructiveTally {
  total: number;
  byMilestone: Record<ConstructiveMilestone, number>;
  byClass: Record<ConstructiveClass, Partial<Record<ConstructiveMilestone, number>>>;
  numericCore: number;
}

function zeroMilestones(): Record<ConstructiveMilestone, number> {
  const out = {} as Record<ConstructiveMilestone, number>;
  for (const m of CONSTRUCTIVE_MILESTONES) out[m] = 0;
  return out;
}

/** Tallies a list of cases (the whole set by default). */
export function constructiveTally(cases: readonly ConstructiveCase[] = CONSTRUCTIVE_SET): ConstructiveTally {
  const byMilestone = zeroMilestones();
  const byClass = {} as ConstructiveTally['byClass'];
  for (const k of CONSTRUCTIVE_CLASSES) byClass[k] = {};
  let numericCore = 0;
  for (const c of cases) {
    byMilestone[c.milestone] += 1;
    byClass[c.class][c.milestone] = (byClass[c.class][c.milestone] ?? 0) + 1;
    if (c.numericCore) numericCore += 1;
  }
  return { total: cases.length, byMilestone, byClass, numericCore };
}

/** A judge of one M0 draw: a verdict, or undefined when it has no judge for the case (counted as pending). */
export type ConstructiveJudge = (c: ConstructiveCase, input: ConstructiveInput) => ConstructiveVerdict | undefined;

/** The judge this item runs: a numeric-core case's own `run` against M0-a-01; no other case. */
export const constructiveNumericJudge: ConstructiveJudge = (c, input) => (c.run !== undefined ? c.run(input) : undefined);

/** The report of one iteration over a list of cases. */
export interface ConstructiveReport {
  cases: number;
  /** M0 cases judged on every seed, and their draws. */
  judged: number;
  draws: number;
  /** M0 cases green on every seed. */
  green: number;
  /** The failing draws (at most 20 kept; `failedCases` counts the cases). */
  failures: { id: string; seed: Seed; reason: string }[];
  failedCases: number;
  /** M0 cases the judge has no verdict for: pending their runner, listed by id. */
  pending: string[];
  /** Deferred cases, counted by milestone — never skipped silently (C-0038). */
  deferred: Record<ConstructiveMilestone, number>;
}

/**
 * The seed list of an iteration: a count n ≥ 1 (seeds 0 … n − 1) or a non-empty list of u32 seeds. An empty family is
 * refused (RangeError), so no iteration reports a case judged or green with nothing drawn (C-0187 (6); §13.8 *Edges*: a
 * suite whose seed family is empty fails naming it, never passes vacuously).
 */
function seedList(seeds: number | readonly Seed[]): readonly Seed[] {
  if (typeof seeds === 'number') {
    if (!Number.isInteger(seeds) || seeds < 1 || seeds > 0x100000000) throw new RangeError(`runConstructive: the seed count must be an integer in [1, 2³²], got ${String(seeds)}`);
    return Array.from({ length: seeds }, (_, i) => i);
  }
  if (seeds.length === 0) throw new RangeError('runConstructive: the seed list is empty — an iteration that draws nothing judges nothing');
  for (const s of seeds) if (!Number.isInteger(s) || s < 0 || s > 0xffffffff) throw new RangeError(`runConstructive: a seed is an integer in [0, 2³² − 1], got ${String(s)}`);
  return seeds;
}

/**
 * Iterates the cases: each deferred case is drawn once (its stub must return `deferred` with its own tag; a throw is a
 * failure) and counted by milestone; each M0 case is drawn on every seed and judged — a throw from the generator or the
 * judge is a failure, never a skip. The judge's answer on the first seed decides whether the case is judged or pending
 * its runner; a judged case must have a verdict on every seed, and a seed it has none for is a failed draw (C-0187 (6)).
 * `seeds` is a count (seeds 0 … n − 1) or a list, never empty. The report's counts satisfy
 * cases = judged + pending + Σ deferred and draws = judged × seeds.
 */
export function runConstructive(cases: readonly ConstructiveCase[], seeds: number | readonly Seed[], judge: ConstructiveJudge = constructiveNumericJudge): ConstructiveReport {
  const list = seedList(seeds);
  const report: ConstructiveReport = { cases: cases.length, judged: 0, draws: 0, green: 0, failures: [], failedCases: 0, pending: [], deferred: zeroMilestones() };
  const fail = (id: string, seed: Seed, reason: string) => {
    if (report.failures.length < 20) report.failures.push({ id, seed, reason });
  };
  const threw = (e: unknown) => `threw: ${e instanceof Error ? e.message : String(e)}`;
  for (const c of cases) {
    if (c.milestone !== 'M0') {
      try {
        const g = c.generate(0);
        if (g.kind !== 'deferred' || g.milestone !== c.milestone || g.id !== c.id) {
          fail(c.id, 0, `a deferred case's stub returned ${g.kind === 'deferred' ? `the tag ${g.milestone}` : 'an input'}`);
          report.failedCases += 1;
        }
      } catch (e) {
        fail(c.id, 0, `a deferred case's stub ${threw(e)}`);
        report.failedCases += 1;
      }
      report.deferred[c.milestone] += 1;
      continue;
    }
    let failed = false;
    let judged = false;
    for (const seed of list) {
      let v: ConstructiveVerdict | undefined;
      try {
        const input = c.generate(seed);
        if (input.kind !== 'input') v = { ok: false, reason: 'an M0 case returned a deferred stub' };
        else v = judge(c, input);
      } catch (e) {
        v = { ok: false, reason: threw(e) };
      }
      if (v === undefined) {
        if (!judged) break; // no verdict on the first seed: pending its runner
        v = { ok: false, reason: 'the judge gave no verdict on this seed after a verdict on an earlier one' };
      }
      judged = true;
      report.draws += 1;
      if (!v.ok) {
        failed = true;
        fail(c.id, seed, v.reason);
      }
    }
    if (!judged) {
      report.pending.push(c.id);
      continue;
    }
    report.judged += 1;
    if (failed) report.failedCases += 1;
    else report.green += 1;
  }
  return report;
}
