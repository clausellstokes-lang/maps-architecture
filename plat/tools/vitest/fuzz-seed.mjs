// The run seed of the PLAT_FUZZ_SEED contract (C-0057; Q96, the session round S6): a red at a random seed must be
// replayable from the run's own output. When PLAT_FUZZ_SEED is unset, the run's global setup (fuzz-seed.global.mjs,
// once per vitest run, in the main process) chooses one fresh 32-bit seed, prints `seedLine(seed)` to stderr once and
// provides it to every worker; the fast-check setup (fast-check.setup.mjs) then hands that seed to every fast-check run
// whose parameters and global configuration give it none — exactly the seed a re-run with PLAT_FUZZ_SEED=<seed> gives
// it — and leaves every other run alone: a property with its own seed (the test kit's H32 family seeds, M0-k-01) keeps
// it, fast-check's global configuration keeps no seed (so `fuzzParams` and `replaySeed` read the run as unseeded, as
// before), and under a set PLAT_FUZZ_SEED nothing is wrapped at all, so no suite draws other cases under a set seed.
// Side-effect free: the setup files and the tests import it.
import { randomInt } from 'node:crypto';

/** The key under which the global setup provides the run seed to the workers (vitest's provide / inject). */
export const RUN_SEED_KEY = 'platFuzzRunSeed';

/** PLAT_FUZZ_SEED as fast-check's 32-bit seed, or undefined when unset or empty; anything but an integer is refused. */
export function fuzzSeed(env = process.env) {
  const raw = env.PLAT_FUZZ_SEED;
  if (raw === undefined || raw === '') return undefined;
  if (!/^-?[0-9]+$/.test(raw)) throw new Error(`PLAT_FUZZ_SEED must be an integer, got ${JSON.stringify(raw)}`);
  return Number(raw) | 0;
}

/** The one line a run without PLAT_FUZZ_SEED prints to stderr (pinned text, fuzz-seed.test.mjs). */
export function seedLine(seed) {
  return (
    `fast-check: PLAT_FUZZ_SEED is unset; this run's seed is ${String(seed)} — every property without a seed of its own ` +
    `draws from it, and a re-run with PLAT_FUZZ_SEED=${String(seed)} draws the same cases (Q96, C-0057)`
  );
}

/** A fresh seed in fast-check's 32-bit range. */
export const freshSeed = () => randomInt(-0x80000000, 0x80000000);

/**
 * The run seed and its line: { seed, line } with a fresh seed (`fresh()`, as a 32-bit integer) when PLAT_FUZZ_SEED is
 * unset, { seed: undefined, line: null } when it is set (the set seed is the replay; nothing to print). A malformed
 * PLAT_FUZZ_SEED is refused, as the setup file refuses it.
 */
export function chooseRunSeed(env = process.env, fresh = freshSeed) {
  if (fuzzSeed(env) !== undefined) return { seed: undefined, line: null };
  const seed = fresh() | 0;
  return { seed, line: seedLine(seed) };
}

/**
 * A fast-check run's parameters with the run seed handed in: unchanged when the parameters or the global configuration
 * (`globalParams`) give a seed; a number (fc.sample's and fc.statistics's run count) becomes { numRuns, seed }.
 */
export function withRunSeed(params, runSeed, globalParams = {}) {
  const own = typeof params === 'number' ? { numRuns: params } : (params ?? {});
  if ({ ...globalParams, ...own }.seed !== undefined) return params;
  return { ...own, seed: runSeed };
}

/**
 * The fast-check module `real` with its four runners — assert, check, sample, statistics — handing the run seed to every
 * run that has none (withRunSeed); every other export, and fast-check's global configuration, is `real`'s own.
 */
export function seededFastCheck(real, runSeed) {
  const fc = real.default ?? real;
  const runners = {
    assert: (property, params) => fc.assert(property, withRunSeed(params, runSeed, fc.readConfigureGlobal())),
    check: (property, params) => fc.check(property, withRunSeed(params, runSeed, fc.readConfigureGlobal())),
    sample: (generator, params) => fc.sample(generator, withRunSeed(params, runSeed, fc.readConfigureGlobal())),
    statistics: (generator, classify, params) => fc.statistics(generator, classify, withRunSeed(params, runSeed, fc.readConfigureGlobal())),
  };
  return { ...real, ...runners, default: { ...fc, ...runners } };
}
