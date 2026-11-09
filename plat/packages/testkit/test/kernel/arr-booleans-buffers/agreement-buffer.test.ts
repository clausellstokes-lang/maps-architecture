// M0-a-08's differential agreement with both oracles (§3.7 "Oracles, not fallbacks"; §13.1; the exit bar §3.7 (i)) —
// `buffer`. Every case runs our `buffer` (through @plat/kernel's export) and each oracle's own construction of §3.7's
// strips, joins and ends (M0-k-03), split by what OUR engine reported, with the bar, the guard and the refusal rules of
// `verdict` (support.ts; C-0196 (7), N-39 / N-40). The cases are M0-k-01's chain families, the sparse family of
// C-0196 (7) and M0-k-02's buffer cases. Split from the booleans and the face services so a test project's workers
// share the agreement (C-0206); the placement is C-0122's.
import fc from 'fast-check';
import { beforeAll, describe, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { bufferCaseArb, judgeBuffer, newHarness, RUNS, TIMEOUT, verdict } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

describe('buffer agrees with both oracles, split by attraction (§3.7, §13.1)', () => {
  it('buffer: round, square and miter joins; round, square and flat ends; one or per-point half-widths', { timeout: TIMEOUT }, () => {
    const h = newHarness();
    fc.assert(
      fc.property(bufferCaseArb, (c) => {
        judgeBuffer(h, c);
      }),
      { numRuns: RUNS },
    );
    verdict(h, 'buffer');
  });
});
