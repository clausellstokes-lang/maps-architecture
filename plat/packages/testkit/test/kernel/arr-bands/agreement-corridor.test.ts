// M0-a-09's differential agreement for corridorUnion with both oracles (§3.7 (i) "Oracles, not fallbacks"; §13.1; the
// exit bar B-FUZZ's oracle part): the committed L2 kerb geometry — the built blocks — against each oracle's
// F − ⋃ buffer(spine, half-width), and the union of the bands against each oracle's F ∩ ⋃ buffer, split by
// attraction as M0-k-03's compareSplit judges, drawn from M0-k-01's face set and M0-k-02's tunnel fixture. The
// placement is C-0122's; the vacuity guard N-14's (support.ts).
import fc from 'fast-check';
import { beforeAll, describe, expect, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { corridorCaseArb, deadEndCaseArb, judgeCorridor, newHarness, RUNS, TIMEOUT, verdict, type CorridorCase } from './support.js';

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

  it('the dead-end cases whose kerb piece lost its closing chord before N-57 (2): the blocks and the bands agree', () => {
    // two draws of `deadEndCaseArb` the pre-round engine committed with a piece dangling — its contact attracted onto the
    // piece's vertex beside it, the strip one face with the block (the area comparison failed on both oracles): a thin
    // triangle crossed by a lane meeting its edges at 11.6° / 16.8° (an unseeded PR-size run, 2026-10-11), and one at
    // PLAT_FUZZ_SEED 7 (40 000 runs)
    const P = (x: number, y: number): CorridorCase['ring'][number] => ({ x, y }) as CorridorCase['ring'][number];
    const cases: CorridorCase[] = [
      { ring: [P(-6611, -39999), P(-20897, -42939), P(-22556, -44801)], chord: [P(-18313, -42407), P(-14583, -42400)], hw: 188.4, role: 'way', key: { layer: 'ground', part: 0 }, source: 'dead-end', deadEnd: true },
      { ring: [P(-2870, 38651), P(-9322, 35937), P(1869, 33852)], chord: [P(638, 35098), P(-6704, 37038)], hw: 199.84, role: 'way', key: { layer: 'ground', part: 0 }, source: 'dead-end', deadEnd: true },
    ];
    const h = newHarness();
    for (const c of cases) judgeCorridor(h, c, 'deadEnd');
    expect(h.failures).toEqual([]);
    for (const op of ['deadEnd', 'deadEnd-bands']) {
      const line = h.report.line(op);
      expect(line.failures).toEqual({});
      expect(line.draws).toBe(cases.length);
      expect(line.unattractedPass + line.attractedPass).toBe(cases.length);
    }
    expect(h.settled).toEqual({});
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
