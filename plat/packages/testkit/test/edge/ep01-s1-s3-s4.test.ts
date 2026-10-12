// B-EDGE (M0-x-06; §4.13, §13.2, §13.8; C-0100): EP-01 at S1's L0 batch, the S3 slice's commits and S4 — every fixture at PLAT_EDGE_SEEDS seeds gives the home's
// stated outcome on every seed (0 per 1 000 at the nightly size), each failure naming the fixture and the seed.
import { afterAll, describe, expect, it } from 'vitest';
import { builtOf, fixturesOf, recordSummary, runFixture, SEEDS, timeoutFor, type FixtureRun } from './support.js';

const FIXTURES = fixturesOf('EP-01/S1/', 'EP-01/S3/', 'EP-01/S4/');

describe(`EP-01 at S1's L0 batch, the S3 slice's commits and S4 (B-EDGE, PLAT_EDGE_SEEDS = ${String(SEEDS)})`, () => {
  const runs: FixtureRun[] = [];
  afterAll(() => {
    recordSummary(runs);
  });
  it('holds its fixtures', () => {
    expect(builtOf('EP-01/S1/', 'EP-01/S3/', 'EP-01/S4/').length).toBeGreaterThan(0);
  });
  for (const f of FIXTURES) {
    it(f.id, { timeout: timeoutFor() }, () => {
      const r = runFixture(f);
      runs.push(r);
      expect(r.failures).toEqual([]);
      expect(r.seeds).toBe(SEEDS);
      expect(r.counts.crash + r.counts.hang + r.counts.offOutcome + r.counts.off).toBe(0);
    });
  }
});
