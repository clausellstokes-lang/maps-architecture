// M0-a-08's differential agreement with both oracles (§3.7 "Oracles, not fallbacks"; §13.1; the exit bar §3.7 (i)) —
// `buffer`. Every case runs our `buffer` (through @plat/kernel's export) and each oracle's own construction of §3.7's
// strips, joins and ends (M0-k-03), split by what OUR engine reported, with the bar, the guard and the refusal rules of
// `verdict` (support.ts; C-0196 (7), N-39 / N-40). The cases are M0-k-01's chain families, the sparse family of
// C-0196 (7) and M0-k-02's buffer cases. Split from the booleans and the face services so a test project's workers
// share the agreement (C-0206); the placement is C-0122's.
//
// Size, seed and cap (L18's test half; Q97; M0-k-03's agreement test the model): the size is PLAT_FUZZ_RUNS (§3.7 (i)'s
// bar: 10⁴ on a PR, 10⁶ nightly; 10³ in a RELATED run); the seed is `arr/agreement/buffer`'s fixed H32 seed unless
// PLAT_FUZZ_SEED replays another (C-0057), handed to fast-check with the size (`runAgreement`, `agreementParams`) and
// printed in the verdict's line and every assertion message ("replay with PLAT_FUZZ_SEED=…"); the counted oracle
// refusals are capped per size at max(1, ⌈0.001 × runs⌉) — 1 at 10³, 10 at 10⁴, 1 000 at 10⁶ (`agreementRefusalCap`:
// C-0150's share at every size, judged at 10³ on the seed's fixed draw; the measured counts are in the notes' section
// 'Hardening round S5').
import { beforeAll, describe, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { bufferCaseArb, judgeBuffer, runAgreement, TIMEOUT } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

describe('buffer agrees with both oracles, split by attraction (§3.7, §13.1)', () => {
  it('buffer: round, square and miter joins; round, square and flat ends; one or per-point half-widths', { timeout: TIMEOUT }, () => {
    runAgreement('buffer', bufferCaseArb, judgeBuffer);
  });
});
