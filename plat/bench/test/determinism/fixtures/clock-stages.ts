// A scratch stage table for M0-d-09's dilation test (hardening S1, check note 4): `scratch.clocked` is a time-budgeted
// ladder that reads `performance.now()` at CLOCK_SEED alone — it sleeps a real CLOCK_SLEEP_MS (Atomics.wait, which no
// clock shim scales), reads the clock again and takes rung 2 when more than CLOCK_BUDGET_MS seem to have passed, else
// rung 1. Un-dilated (the cross-host legs, the instrumented run, the op-order run) it always takes rung 1, so it is
// deterministic; under M0-d-08's shim × 10 the 300 ms read as ≈ 3 000 and it takes rung 2 (× 0.1: ≈ 30, rung 1). So the
// dilation runs, and only they, must name it as the first difference, with the clock reads the shim answered counted.
// Bundled by M0-d-06's harness for the legs, so it imports no Node API.
import { fmix32 } from '@plat/kernel';
import type { CrossHostStage } from '@plat/testkit';

/** The seed at which the stage reads the clock. */
export const CLOCK_SEED = 2;
/** The real sleep between the two clock reads, and the budget (5 × the sleep: un-dilated it never runs out). */
export const CLOCK_SLEEP_MS = 300;
export const CLOCK_BUDGET_MS = 1500;

function hexOf(seed: number, salt: number): string {
  let s = '';
  for (let i = 0; i < 4; i += 1) s += fmix32((seed * 4 + i) ^ Math.imul(salt + 1, 0x9e3779b1)).toString(16).padStart(8, '0');
  return s;
}

/** The ladder's rung at the seed: 1 within the budget, 2 past it (reads the clock twice at CLOCK_SEED). */
function rungAt(seed: number): number {
  if (seed !== CLOCK_SEED) return 1;
  const t0 = performance.now();
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, CLOCK_SLEEP_MS);
  return performance.now() - t0 > CLOCK_BUDGET_MS ? 2 : 1;
}

export const crosshostStages: readonly CrossHostStage[] = [
  { id: 'scratch.clean', run: (seed) => ({ model: hexOf(seed, 1), records: null }) },
  // the planted clock read the test exists to see through the dilation runs (bench code: the model rules do not reach it)
  { id: 'scratch.clocked', run: (seed) => ({ model: hexOf(seed, 10 + rungAt(seed)), records: null }) },
  { id: 'scratch.after', run: (seed) => ({ model: hexOf(seed, 3), records: hexOf(seed, 4) }) },
];
