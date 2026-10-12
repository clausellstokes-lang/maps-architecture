// M0-a-09's differential agreement for corridorUnion with both oracles (§3.7 (i) "Oracles, not fallbacks"; §13.1; the
// exit bar B-FUZZ's oracle part): the committed L2 kerb geometry — the built blocks — against each oracle's
// F − ⋃ buffer(spine, half-width), and the union of the bands against each oracle's F ∩ ⋃ buffer, split by
// attraction as M0-k-03's compareSplit judges, drawn from M0-k-01's face set and M0-k-02's tunnel fixture. The
// placement is C-0122's; the vacuity guard N-14's (support.ts).
import fc from 'fast-check';
import { beforeAll, describe, expect, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { corridorCaseArb, deadEndCaseArb, judgeCorridor, newHarness, RUNS, TIMEOUT, verdict } from './support.js';

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

  it('a dead-end spine on a spine-less boundary: the lane’s round caps meet the ring, its kerb pieces close on it (N-57 (2))', { timeout: TIMEOUT }, () => {
    // a tenth of the run's size (the PR size: 1 000 cases); most cases are attracted (the caps place kerb vertices
    // within attractCm of the ring), so §13.1's unattracted guard is the main property's — this one holds every
    // judged case and draws at least half the cases
    const runs = Math.max(100, Math.ceil(RUNS / 10));
    const h = newHarness();
    let cases = 0;
    fc.assert(
      fc.property(deadEndCaseArb, (c) => {
        if (c === null) return;
        cases += 1;
        judgeCorridor(h, c, 'deadEnd');
      }),
      { numRuns: runs },
    );
    for (const op of ['deadEnd', 'deadEnd-bands']) {
      const line = h.report.line(op);
      console.info(`arr-bands/${op}: ${String(cases)} of ${String(runs)} cases — drawn ${String(line.draws)} (unattracted ${String(line.unattracted)}; attracted ${String(line.attracted)}); passed ${String(line.unattractedPass)} + ${String(line.attractedPass)}; refusals ${JSON.stringify(line.refusals)}; unjudged ${String(line.unjudged)}; settled ${JSON.stringify(h.settled)}; notes ${JSON.stringify(h.notes)}`);
      expect(line.failures).toEqual({});
      expect(line.unattractedPass + line.attractedPass).toBe(line.draws);
      expect(line.unjudged).toBeLessThanOrEqual(Math.ceil(0.01 * runs));
      expect(line.draws).toBeGreaterThanOrEqual(Math.ceil(runs / 2));
    }
    expect(h.failures).toEqual([]);
    // N-44 (3): the item's own refusals at most 1 per 10⁴ cases
    expect(h.settled['refused-own'] ?? 0).toBeLessThanOrEqual(Math.ceil(runs / 10_000));
  });
});
