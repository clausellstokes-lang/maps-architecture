// M0-a-08's differential agreement with both oracles (§3.7 "Oracles, not fallbacks"; §13.1 "CI oracles … on booleans
// … and buffers, split by attraction"; the exit bar §3.7 (i)) — the booleans. Every case runs our engine — reached only
// through @plat/kernel's export — and Clipper2 and polygon-clipping (M0-k-03), and is split by what OUR engine
// reported: unattracted cases need equal face counts after snapping and |Δ| ≤ perimeter × 1 cm; attracted cases every
// hard ring check and |Δ| ≤ perimeter × √2 · attractCm. Our output is also held to the ring checks on every case
// (0 invalid outputs) and a throw fails the property (0 crashes). The cases are M0-k-01's arbitraries and M0-k-02's
// empty-boolean case (support.ts). The size is PLAT_FUZZ_RUNS per operation (10⁴ on a PR, 10⁶ nightly; C-0057); the
// vacuity guard asserts min(10⁵, ⌈⅒ × runs⌉) unattracted draws per operation (C-0196 (7), the spec note N-14); the
// refusals are classified by step and bounded as N-39 / N-40 rule (`verdict`). The agreement runs in three files —
// booleans, buffer, the face services — so a test project's workers share it (C-0206). The placement is C-0122's: the
// one package test project that sees the oracles.
import fc from 'fast-check';
import { beforeAll, describe, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { booleanCaseArb, judgeBoolean, newHarness, RUNS, TIMEOUT, verdict } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

describe('booleans agree with both oracles, split by attraction (§3.7, §13.1)', () => {
  for (const op of ['union', 'intersection', 'difference', 'xor'] as const) {
    it(`${op}: nonzero and evenodd over M0-k-01's families and M0-k-02's empty case`, { timeout: TIMEOUT }, () => {
      const h = newHarness();
      fc.assert(
        fc.property(booleanCaseArb(op), (c) => {
          judgeBoolean(h, c);
        }),
        { numRuns: RUNS },
      );
      verdict(h, op);
    });
  }
});
