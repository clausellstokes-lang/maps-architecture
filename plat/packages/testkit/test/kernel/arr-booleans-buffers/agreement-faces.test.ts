// M0-a-08's differential agreement with both oracles (§3.7 "Oracles, not fallbacks", *Insets*; §13.1; the exit bar
// §3.7 (i)) — the face services. `offsetFace` (§3.4: face − ⋃ buffer(edgeᵢ, dᵢ)) against each oracle's round-ended
// buffers of the edges subtracted from the face; `insetRing` against each oracle's difference of the far half-plane
// strips, E_NON_CONVEX exactly on the faces the exact check calls non-convex. The bar, the guard and the refusal rules
// are `verdict`'s (support.ts; C-0196 (7), N-39 / N-40). Split from the booleans and the buffer so a test project's
// workers share the agreement (C-0206); the placement is C-0122's.
import fc from 'fast-check';
import { beforeAll, describe, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { insetCaseArb, judgeInset, judgeOffset, newHarness, offsetCaseArb, RUNS, TIMEOUT, verdict } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

describe('offsetFace and insetRing agree with the oracles’ own constructions (§3.4, §3.7 Insets)', () => {
  it('offsetFace: face − ⋃ buffer(edgeᵢ, dᵢ) through each oracle’s buffer and difference', { timeout: TIMEOUT }, () => {
    const h = newHarness();
    fc.assert(
      fc.property(offsetCaseArb, (c) => {
        judgeOffset(h, c);
      }),
      { numRuns: RUNS },
    );
    verdict(h, 'offsetFace');
  });

  it('insetRing: the half-plane intersection through each oracle’s difference; E_NON_CONVEX exactly on the non-convex faces', { timeout: TIMEOUT }, () => {
    const h = newHarness();
    fc.assert(
      fc.property(insetCaseArb, (c) => {
        judgeInset(h, c);
      }),
      { numRuns: RUNS },
    );
    verdict(h, 'insetRing');
  });
});
