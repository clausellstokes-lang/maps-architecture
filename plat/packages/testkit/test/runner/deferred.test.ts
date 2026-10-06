// M0-k-04's listed test: "the report's deferred counts equal M0-k-02's tags" (C-0038: the classes whose mechanisms land
// later are tagged with their milestones and counted by the runner, never skipped silently; §4b). The counts report's
// deferred constructive cases by milestone — through the runner's iteration, the counts report and its numbers-only
// summary — equal the set's own tally of its tags, milestone by milestone, and every deferred case is counted once.
import { beforeAll, describe, expect, it } from 'vitest';
import {
  CONSTRUCTIVE_MILESTONES,
  CONSTRUCTIVE_SET,
  constructiveRun,
  constructiveTally,
  countsReport,
  countsSummary,
  ladderCoverage,
  loadOracles,
  runConstructiveOnKernel,
} from '@plat/testkit';

beforeAll(async () => {
  await loadOracles();
});

describe("the report's deferred counts equal M0-k-02's tags (C-0038)", () => {
  it('the deferred cases alone: counted once each by milestone, equal to the tally of the tags', () => {
    const deferred = CONSTRUCTIVE_SET.filter((c) => c.milestone !== 'M0');
    const r = runConstructiveOnKernel(deferred, 1);
    const tally = constructiveTally();
    for (const m of CONSTRUCTIVE_MILESTONES) {
      if (m === 'M0') {
        expect(r.deferred.M0).toBe(0);
        continue;
      }
      expect([m, r.deferred[m]]).toEqual([m, tally.byMilestone[m]]);
    }
    const sum = CONSTRUCTIVE_MILESTONES.reduce((t, m) => t + r.deferred[m], 0);
    expect(sum).toBe(deferred.length);
    expect(sum).toBeGreaterThan(30);
    expect(r.judged).toBe(0);
    expect(r.failures).toEqual([]);
  });

  it('the counts report and its summary carry the same deferred counts', () => {
    const deferred = CONSTRUCTIVE_SET.filter((c) => c.milestone !== 'M0');
    const run = constructiveRun(runConstructiveOnKernel(deferred, 1));
    const report = countsReport(1, [], run, ladderCoverage({ draws: 1 }));
    const summary = countsSummary(report) as { constructive: { deferred: Record<string, number> } };
    const tally = constructiveTally();
    for (const m of CONSTRUCTIVE_MILESTONES) if (m !== 'M0') expect(summary.constructive.deferred[m]).toBe(tally.byMilestone[m]);
    // a report with nothing judged never passes (§13.8 Edges: an empty family fails, never passes vacuously)
    expect(report.pass).toBe(false);
  });

  it('a deferred stub that returns an input instead of its tag is a failure, still counted by its milestone', () => {
    const c = CONSTRUCTIVE_SET.find((x) => x.milestone === 'M2b');
    if (c === undefined) throw new Error('no M2b case');
    const broken = { ...c, generate: () => CONSTRUCTIVE_SET.find((x) => x.milestone === 'M0')?.generate(0) as never };
    const r = runConstructiveOnKernel([broken], 1);
    expect(r.deferred.M2b).toBe(1);
    expect(r.failedCases).toBe(1);
  });
});
