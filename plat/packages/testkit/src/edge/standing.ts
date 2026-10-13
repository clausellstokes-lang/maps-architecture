// A fixture's state that stands (M0-x-06; C-0100: "each the smallest state that reaches its home"; §4.13's "the home's
// stated outcome, hard, 0 per 1 000"; C-0278 (2)). A fixture's small frame does not stand on every seed of the nightly
// family: an earlier stage refuses it (typed and fail-safe, its owner's), the plant's call never comes (no main road at
// stage 2, no top-up rim), or the fixture's own precondition is not met (no face whose reserves cover its land). Those
// seeds test nothing of the home. So each fixture seed `s` names a deterministic sequence of states — `s` itself, then
// H32("edge-standing/<s>", j) for j = 1 … STANDING_TRIES − 1 (M0-k-01's `seedFamily`) — and the fixture runs the first
// whose preparation stands. The choice is the fixture's alone and is declared in the outcome's facts (`stateSeed`,
// `tries`); it never retries the home's outcome:
//   * an attempt with a fail-safety problem (an invalid arena, a restart, a refusal with no §3.1 code, an off handling,
//     a precondition the home itself broke) is returned at once — the run fails on it;
//   * a throw is never caught here — a crash in any attempt is the run's crash;
//   * when no state of STANDING_TRIES stands, the run fails naming every attempt's unmet preparation.
// A state replaced because a stage refused its LAWFUL input is never hidden (J264, C-0342 (2)): each attempt names the
// lawful-input refusals it met, and the outcome carries every one, with the state seed that replays it.
import { seedFamily } from '../fuzz/seeds.js';
import type { EdgeOutcome, LawfulRefusal } from './types.js';

/** The states a fixture seed may try (the first that stands is run): 8 — measured misses are ≤ 19 % per state. */
export const STANDING_TRIES = 8;

/** The j-th state of fixture seed `seed`: the seed itself at j = 0, else H32("edge-standing/<seed>", j) (a u32). */
export function standingSeed(seed: number, j: number): number {
  if (!(Number.isInteger(j) && j >= 0 && j < STANDING_TRIES)) throw new RangeError(`standingSeed: the try is 0 … ${String(STANDING_TRIES - 1)}, got ${String(j)}`);
  return j === 0 ? seed >>> 0 : seedFamily(`edge-standing/${String(seed >>> 0)}`, j);
}

/** A lawful-input refusal an attempt met, before its state seed is known (./types.ts's LawfulRefusal). */
export type AttemptRefusal = Omit<LawfulRefusal, 'stateSeed'>;

/** One attempt: the outcome on that state, its unmet preparation (empty when the state stood) and the lawful-input
 * refusals it met (J264's census). */
export interface Attempt {
  readonly outcome: EdgeOutcome;
  readonly unmet: readonly string[];
  readonly lawful?: readonly AttemptRefusal[];
}

/**
 * The fixture's outcome at `seed` on the first state that stands (see the header): the attempt's outcome with
 * `stateSeed` and `tries` added to its facts. An attempt whose outcome carries a problem is returned at once, whatever
 * its preparation; when no state stands, the last attempt's outcome with every attempt's unmet preparation as problems.
 */
export function firstStanding(seed: number, attempt: (stateSeed: number) => Attempt): EdgeOutcome {
  const misses: string[] = [];
  const lawful: LawfulRefusal[] = [];
  let last: EdgeOutcome | null = null;
  for (let j = 0; j < STANDING_TRIES; j += 1) {
    const s = standingSeed(seed, j);
    const a = attempt(s);
    for (const r of a.lawful ?? []) lawful.push({ stateSeed: s, ...r });
    const facts = { ...a.outcome.facts, stateSeed: s, tries: j + 1 };
    if (a.outcome.problems.length > 0 || a.unmet.length === 0) return { ...a.outcome, facts, lawful };
    misses.push(`state ${String(s)}: ${a.unmet.join('; ')}`);
    last = { ...a.outcome, facts };
  }
  const o = last as EdgeOutcome;
  return { ...o, problems: [`no state of ${String(STANDING_TRIES)} stood — ${misses.join(' | ')}`], lawful };
}
