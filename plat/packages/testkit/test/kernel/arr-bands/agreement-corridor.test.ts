// M0-a-09's differential agreement for corridorUnion with both oracles (§3.7 (i) "Oracles, not fallbacks"; §13.1; the
// exit bar B-FUZZ's oracle part): the committed L2 kerb geometry — the built blocks — against each oracle's
// F − ⋃ buffer(spine, half-width), and the union of the bands against each oracle's F ∩ ⋃ buffer, split by
// attraction as M0-k-03's compareSplit judges, drawn from M0-k-01's face set and M0-k-02's tunnel fixture. The
// placement is C-0122's; the vacuity guard N-14's (support.ts).
import fc from 'fast-check';
import { beforeAll, describe, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { corridorCaseArb, judgeCorridor, newHarness, RUNS, TIMEOUT, verdict } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

describe('corridorUnion agrees with the oracles’ F − ⋃ buffer(spine, half-width) and their union of the bands (§3.7 (i))', () => {
  it('the built blocks and the bands, by attraction', { timeout: TIMEOUT }, () => {
    const h = newHarness();
    fc.assert(
      fc.property(corridorCaseArb, (c) => {
        judgeCorridor(h, c);
      }),
      { numRuns: RUNS },
    );
    verdict(h, 'corridorUnion');
    verdict(h, 'corridorUnion-bands');
  });
});
