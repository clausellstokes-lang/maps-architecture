// The PLAT_FUZZ_RUNS contract (M0.md §4; C-0057): every fast-check property in every vitest project runs
// PLAT_FUZZ_RUNS cases — the PR size 10⁴ when unset, the nightly tier sets 10⁶. PLAT_FUZZ_SEED, when set, fixes the global
// seed (to replay a failure); the per-family H32-keyed seeds are the test kit's (M0-k-01). A test may still pass its own
// `numRuns` for a property whose bar names another size.
// The run seed (Q96, fuzz-seed.mjs): when PLAT_FUZZ_SEED is unset, the run's global setup chose and printed one seed;
// fast-check is replaced here by the same module whose runners hand that seed to every run that has none, so a red at
// that seed replays with PLAT_FUZZ_SEED=<the printed seed>. The global configuration keeps no seed in that case, and
// with PLAT_FUZZ_SEED set (or no run seed provided) fast-check is the library itself.
import fc from 'fast-check';
import { vi } from 'vitest';
import { fuzzSeed } from './fuzz-seed.mjs';

export { fuzzSeed };

vi.mock('fast-check', async (importOriginal) => {
  const real = await importOriginal();
  const { inject } = await import('vitest');
  const { RUN_SEED_KEY, fuzzSeed: seedOf, seededFastCheck } = await import('./fuzz-seed.mjs');
  const runSeed = inject(RUN_SEED_KEY);
  return seedOf() === undefined && typeof runSeed === 'number' ? seededFastCheck(real, runSeed) : real;
});

export const DEFAULT_FUZZ_RUNS = 10_000;

export function fuzzRuns(env = process.env) {
  const raw = env.PLAT_FUZZ_RUNS;
  if (raw === undefined || raw === '') return DEFAULT_FUZZ_RUNS;
  if (!/^[1-9][0-9]*$/.test(raw)) throw new Error(`PLAT_FUZZ_RUNS must be a positive integer, got ${JSON.stringify(raw)}`);
  return Number(raw);
}

const seed = fuzzSeed();
fc.configureGlobal({ numRuns: fuzzRuns(), ...(seed === undefined ? {} : { seed }) });
