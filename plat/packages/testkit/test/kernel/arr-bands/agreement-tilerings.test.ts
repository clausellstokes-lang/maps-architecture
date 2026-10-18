// M0-a-09's differential agreement for tileRings with both oracles (§13.1: "tileRings (each ring's pieces against the
// oracle's result for that ring less every earlier ring, and a refusal — detail overlap — exactly where that result has
// a hole on a case whose rings keep §2.6's composition contract …)", split by attraction (§3.7)), drawn from M0-k-01's
// polygon families and M0-k-02's seed clip cases. The placement is C-0122's; the vacuity guard N-14's (support.ts).
import fc from 'fast-check';
import { beforeAll, describe, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { judgeTile, newHarness, RUNS, tileCaseArb, TIMEOUT, verdict } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

describe('tileRings agrees with the oracles’ ring less every earlier ring (§3.4, §13.1)', () => {
  it('every ring’s pieces, by attraction; the overlap refusal only where the oracle’s piece has a hole', { timeout: TIMEOUT }, () => {
    const h = newHarness();
    fc.assert(
      fc.property(tileCaseArb, (c) => {
        judgeTile(h, c);
      }),
      { numRuns: RUNS },
    );
    verdict(h, 'tileRings');
  });
});
