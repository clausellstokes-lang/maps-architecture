// The edge suite B-EDGE at M0 (M0-x-06; §4.13, §13.2, §13.8's B-EDGE row, §13.1's per-class degenerate inputs; C-0100,
// C-0118, C-0273). `EDGE_FIXTURES` holds every fixture — §4.13's EP-01 on every M0 stage × the five degenerate kinds,
// EP-04, EP-05, EP-06, EP-16's stop-test end, EP-20's and EP-23's M0 parts, the four frame cells (cliff, river, bridge,
// wall) and §13.1's (class, kind) pairs — each run on the real stages at PLAT_EDGE_SEEDS seeds by `testkit/test/edge/`,
// and a stub for every row, cell and sweep deferred to its milestone; `edgeCoverage()` is the coverage table. The folder
// belongs to M0-x-06; its one re-export line in the package index is C-0064's.
import { cellFixtures } from './cells.js';
import { classFixtures } from './classes.js';
import { coverageReportOf, edgeCoverageRows, type EdgeCoverageReport } from './coverage.js';
import { ep01Fixtures } from './ep01.js';
import { rowFixtures } from './rows.js';
import { notBuiltRun, type EdgeFixture } from './types.js';

/** The rows, cells and sweeps the table defers, each a fixture stub of its milestone (its run throws notBuilt). */
function deferredFixtures(): EdgeFixture[] {
  const out: EdgeFixture[] = [];
  for (const r of edgeCoverageRows()) {
    if (r.fixtures.length > 0 || r.milestone === undefined) continue;
    out.push({
      id: `deferred/${r.key}`,
      home: r.kind === 'EP row' ? `§4.13 ${r.key}` : r.kind === 'sweep' ? "§13.8's B-EDGE row" : "§4.13's combination table",
      run: notBuiltRun(r.milestone, `${r.key} — ${r.what}`),
      expect: { outcome: `the home's stated outcome for ${r.what}, at ${r.milestone}`, allowed: [] },
      milestone: r.milestone,
    });
  }
  return out;
}

/** Every fixture of the edge suite (M0-work.json's `EDGE_FIXTURES: EdgeFixture[]`). */
export const EDGE_FIXTURES: readonly EdgeFixture[] = Object.freeze([...ep01Fixtures(), ...rowFixtures(), ...cellFixtures(), ...classFixtures(), ...deferredFixtures()]);

/** The coverage table over EDGE_FIXTURES (M0-work.json's `edgeCoverage(): EdgeCoverageReport`). */
export function edgeCoverage(): EdgeCoverageReport {
  return coverageReportOf(EDGE_FIXTURES);
}

export { edgeSeedCount, edgeSeeds, edgeSeed, EDGE_SEEDS_NIGHTLY, EDGE_SEEDS_PR } from './seeds.js';
export { judgeOutcome as judgeEdgeOutcome, type EdgeExpect, type EdgeFixture, type EdgeHandling, type EdgeOutcome } from './types.js';
export type { EdgeCoverageReport, EdgeCoverageRow } from './coverage.js';
export { DEGENERATE_KINDS as EDGE_DEGENERATE_KINDS, type DegenerateKind as EdgeDegenerateKind } from './kinds.js';
