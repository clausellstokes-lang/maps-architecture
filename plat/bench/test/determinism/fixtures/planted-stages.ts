// A scratch stage table for M0-d-09's planted-nondeterminism test (the item's second test): two stages whose digests are
// pure functions of the seed, except that `scratch.planted` reads Math.random at PLANTED_SEED alone — a planted
// nondeterminism the runner must catch at that seed and stage, on the cross-host legs (each run draws its own value)
// and in its in-process check runs (each run draws again). CLEAN_STAGES is the same table without the plant (the
// control). Bundled by M0-d-06's harness for the legs, so it imports no Node API.
import { fmix32 } from '@plat/kernel';
import type { CrossHostStage } from '@plat/testkit';

/** The seed at which the plant reads the random source. */
export const PLANTED_SEED = 3;

function hexOf(seed: number, salt: number): string {
  let s = '';
  for (let i = 0; i < 4; i += 1) s += fmix32((seed * 4 + i) ^ Math.imul(salt + 1, 0x9e3779b1)).toString(16).padStart(8, '0');
  return s;
}

const clean: CrossHostStage = { id: 'scratch.clean', run: (seed) => ({ model: hexOf(seed, 1), records: null }) };

export const crosshostStages: readonly CrossHostStage[] = [
  clean,
  {
    id: 'scratch.planted',
    // the planted nondeterminism the test exists to catch (bench code: the model rules do not reach it)
    run: (seed) => ({ model: hexOf(seed, seed === PLANTED_SEED ? Math.floor(Math.random() * 0x7fffffff) : 2), records: null }),
  },
  { id: 'scratch.after', run: (seed) => ({ model: hexOf(seed, 3), records: hexOf(seed, 4) }) },
];
