// M0-a-08's differential agreement with both oracles (§3.7 "Oracles, not fallbacks", *Insets*; §13.1; the exit bar
// §3.7 (i)) — the face services. `offsetFace` (§3.4: face − ⋃ buffer(edgeᵢ, dᵢ)) against each oracle's round-ended
// buffers of the edges subtracted from the face; `insetRing` against each oracle's difference of the far half-plane
// strips, E_NON_CONVEX exactly on the faces the exact check calls non-convex. The bar, the guard and the refusal rules
// are `verdict`'s (support.ts; C-0196 (7), N-39 / N-40). Split from the booleans and the buffer so a test project's
// workers share the agreement (C-0206); the placement is C-0122's. Each operation's seed is `arr/agreement/<op>`'s
// fixed H32 seed unless PLAT_FUZZ_SEED replays another, printed with its replay command in the verdict's line and
// messages; the counted oracle refusals are capped at max(1, ⌈0.001 × runs⌉) per size (L18; Q97; `runAgreement`).
import { beforeAll, describe, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { insetCaseArb, judgeInset, judgeOffset, offsetCaseArb, runAgreement, TIMEOUT } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

describe('offsetFace and insetRing agree with the oracles’ own constructions (§3.4, §3.7 Insets)', () => {
  it('offsetFace: face − ⋃ buffer(edgeᵢ, dᵢ) through each oracle’s buffer and difference', { timeout: TIMEOUT }, () => {
    runAgreement('offsetFace', offsetCaseArb, judgeOffset);
  });

  it('insetRing: the half-plane intersection through each oracle’s difference; E_NON_CONVEX exactly on the non-convex faces', { timeout: TIMEOUT }, () => {
    runAgreement('insetRing', insetCaseArb, (h, c) => {
      judgeInset(h, c);
    });
  });
});
