// The PLAT_FUZZ_RUNS contract (M0.md §4; C-0057): every fast-check property in every vitest project runs
// PLAT_FUZZ_RUNS cases — the PR size 10⁴ when unset, the nightly tier sets 10⁶. PLAT_FUZZ_SEED, when set, fixes the global
// seed (to replay a failure); the per-family H32-keyed seeds are the test kit's (M0-k-01). A test may still pass its own
// `numRuns` for a property whose bar names another size.
import fc from 'fast-check';

export const DEFAULT_FUZZ_RUNS = 10_000;

export function fuzzRuns(env = process.env) {
  const raw = env.PLAT_FUZZ_RUNS;
  if (raw === undefined || raw === '') return DEFAULT_FUZZ_RUNS;
  if (!/^[1-9][0-9]*$/.test(raw)) throw new Error(`PLAT_FUZZ_RUNS must be a positive integer, got ${JSON.stringify(raw)}`);
  return Number(raw);
}

export function fuzzSeed(env = process.env) {
  const raw = env.PLAT_FUZZ_SEED;
  if (raw === undefined || raw === '') return undefined;
  if (!/^-?[0-9]+$/.test(raw)) throw new Error(`PLAT_FUZZ_SEED must be an integer, got ${JSON.stringify(raw)}`);
  return Number(raw) | 0;
}

const seed = fuzzSeed();
fc.configureGlobal({ numRuns: fuzzRuns(), ...(seed === undefined ? {} : { seed }) });
