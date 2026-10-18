// The fuzz families' seeds and the PLAT_FUZZ_RUNS contract (M0-k-01; §13.2's seed-family form "seed i of a family
// H32('bcity/<rung>/<water>/<i>')", adopted for the fuzz families; §13.6 (2)'s H32; §13.8's tier sizes; C-0057).
// `seedFamily(name, i)` is H32 of the string "<name>/<i>" — so seedFamily('bcity/CITY/none', 3) is §13.2's
// H32('bcity/CITY/none/3') and §13.6 (2)'s check vectors hold for the 'd5/…' families — a function of (name, i) alone:
// no state, no clock, no global configuration. V12 §2.4's collision rehash is not applied here: it belongs to the
// B-CITY seed families, which are M1's (this item's defers; C-0161 (7)). `fuzzParams` hands a property its family's
// seed unless PLAT_FUZZ_SEED fixed the global seed (to replay a failure); `fuzzRuns` reads PLAT_FUZZ_RUNS for a runner
// outside vitest exactly as the vitest setup file does (10⁴, the PR size, when unset; the nightly sets 10⁶).
import fc from 'fast-check';
import { H32, type Seed } from '@plat/kernel';

/** The PR tier's fuzz size per primitive (§13.8), the default when PLAT_FUZZ_RUNS is unset (C-0057). */
export const FUZZ_RUNS_PR = 10_000;

/** The nightly tier's fuzz size per primitive (§13.8). */
export const FUZZ_RUNS_NIGHTLY = 1_000_000;

/**
 * Seed i of the family `name`: H32("<name>/<i>") (§13.2's form, §13.6 (2)'s H32), a u32. `name` is a non-empty string
 * and i an integer in [0, 2³² − 1]; anything else is refused with a RangeError (a lone surrogate in `name` by H32).
 */
export function seedFamily(name: string, i: number): Seed {
  if (typeof name !== 'string' || name.length === 0) throw new RangeError(`seedFamily: the family name must be a non-empty string, got ${JSON.stringify(name)}`);
  if (!Number.isInteger(i) || i < 0 || i > 0xffffffff) throw new RangeError(`seedFamily: i must be an integer in [0, 2³² − 1], got ${String(i)}`);
  return H32(`${name}/${String(i)}`);
}

/**
 * The fast-check parameters of seed i of a fuzz family: `{ seed }`, the family's seed as fast-check's 32-bit integer,
 * or the global seed when PLAT_FUZZ_SEED fixed one (C-0057: the replay of a failure wins). The run count stays the
 * global one (PLAT_FUZZ_RUNS through the vitest setup file).
 */
export function fuzzParams(name: string, i = 0): { seed: number } {
  const global = fc.readConfigureGlobal().seed;
  return { seed: global !== undefined ? global : seedFamily(name, i) | 0 };
}

/**
 * PLAT_FUZZ_RUNS as a run count (C-0057): FUZZ_RUNS_PR when unset or empty, else a positive decimal integer — anything
 * else is refused, as the vitest setup file refuses it.
 */
export function fuzzRuns(env: Readonly<Record<string, string | undefined>> = process.env): number {
  const raw = env.PLAT_FUZZ_RUNS;
  if (raw === undefined || raw === '') return FUZZ_RUNS_PR;
  if (!/^[1-9][0-9]*$/.test(raw)) throw new Error(`PLAT_FUZZ_RUNS must be a positive integer, got ${JSON.stringify(raw)}`);
  return Number(raw);
}
