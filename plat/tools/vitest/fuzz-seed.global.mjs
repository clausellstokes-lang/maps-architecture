// The vitest global setup of the run seed (Q96, C-0057; fuzz-seed.mjs): runs once per vitest run in the main process.
// With PLAT_FUZZ_SEED unset it chooses one fresh seed, prints its line to stderr once and provides it to every
// project's workers, where fast-check.setup.mjs hands it to the fast-check runs that have no seed; with PLAT_FUZZ_SEED
// set it provides nothing and prints nothing (the set seed is the replay). A malformed PLAT_FUZZ_SEED fails the run here.
import { RUN_SEED_KEY, chooseRunSeed } from './fuzz-seed.mjs';

export default function setup(project) {
  const { seed, line } = chooseRunSeed();
  if (line !== null) process.stderr.write(`${line}\n`);
  project.provide(RUN_SEED_KEY, seed ?? null);
}
