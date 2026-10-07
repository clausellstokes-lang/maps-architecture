// B-EDGE (M0-x-06; §4.13, §13.2, §13.8; C-0100): §13.1's per-class degenerate inputs — every fixture at PLAT_EDGE_SEEDS seeds gives the home's
// stated outcome on every seed (0 per 1 000 at the nightly size), each failure naming the fixture and the seed.
import { describe, expect, it } from 'vitest';
import { fixturesOf, runFixture, SEEDS, timeoutFor } from './support.js';

const FIXTURES = fixturesOf('class/');

describe(`§13.1's per-class degenerate inputs (B-EDGE, PLAT_EDGE_SEEDS = ${String(SEEDS)})`, () => {
  it('holds its fixtures', () => {
    expect(FIXTURES.length).toBeGreaterThan(0);
  });
  for (const f of FIXTURES) {
    it(f.id, { timeout: timeoutFor() }, () => {
      const r = runFixture(f);
      expect(r.failures).toEqual([]);
      expect(r.seeds).toBe(SEEDS);
      expect(r.counts.crash + r.counts.hang + r.counts.offOutcome + r.counts.off).toBe(0);
    });
  }
});
