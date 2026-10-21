// M0-k-04's listed test: "the report's deferred counts equal M0-k-02's tags" (C-0038: the classes whose mechanisms land
// later are tagged with their milestones and counted by the runner, never skipped silently; §4b). The counts report's
// deferred constructive cases by milestone — through the runner's iteration, the counts report and its numbers-only
// summary — equal the set's own tally of its tags, milestone by milestone, and every deferred case is counted once.
import { beforeAll, describe, expect, it } from 'vitest';
import {
  CONSTRUCTIVE_MILESTONES,
  CONSTRUCTIVE_SET,
  constructiveCase,
  constructiveRun,
  constructiveTally,
  countsReport,
  countsSummary,
  fuzzCountsPass,
  ladderCoverage,
  loadOracles,
  runConstructiveOnKernel,
  runFuzz,
  type ConstructiveCase,
  type ConstructiveJudge,
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

  it('the bar fails on a failing M0 case, a stale known finding or an uncovered ladder, and holds otherwise (countsReport)', () => {
    const base = constructiveRun(runConstructiveOnKernel(CONSTRUCTIVE_SET.filter((c) => c.id === 'geom/antenna'), 1));
    const ladders = ladderCoverage({ draws: 1 });
    expect(countsReport(1, [], base, ladders).pass).toBe(true);
    expect(countsReport(1, [], { ...base, failedCases: 1 }, ladders).pass).toBe(false);
    expect(countsReport(1, [], { ...base, staleKnown: ['geom/antenna'] }, ladders).pass).toBe(false);
    expect(countsReport(1, [], { ...base, pending: ['geom/antenna'] }, ladders).pass).toBe(false);
    expect(countsReport(1, [], base, { ...ladders, covered: false }).pass).toBe(false);
  }, 60_000);

  it('the bar fails on 1 crash, 1 hang, 1 invalid output or 1 bugs entry in a primitive report, each on its own (§13.1; §5.1 (8))', () => {
    const base = constructiveRun(runConstructiveOnKernel(CONSTRUCTIVE_SET.filter((c) => c.id === 'geom/antenna'), 1));
    const ladders = ladderCoverage({ draws: 1 });
    const clean = runFuzz('obb', 3);
    expect([clean.crashes, clean.hangs, clean.invalid, clean.bugs.length]).toEqual([0, 0, 0, 0]);
    expect(countsReport(1, [clean], base, ladders).pass).toBe(true);
    const bug = { cls: 'F-NUM', entity: 'way:fuzz', key: 'bfuzz/obb#1', stage: 'B-FUZZ' };
    const planted: [string, typeof clean][] = [
      ['crash', { ...clean, crashes: 1 }],
      ['hang', { ...clean, hangs: 1 }],
      ['invalid', { ...clean, invalid: 1 }],
      ['bug', { ...clean, bugs: [bug] }],
    ];
    for (const [what, r] of planted) {
      const report = countsReport(1, [clean, r], base, ladders);
      expect([what, report.pass]).toEqual([what, false]);
      expect([what, fuzzCountsPass(report.totals, report.bugs)]).toEqual([what, false]);
    }
    expect(countsReport(1, [clean, { ...clean, bugs: [bug] }], base, ladders).bugs).toEqual([bug]);
  }, 60_000);

  it('a deferred stub that returns an input instead of its tag is a failure, still counted by its milestone', () => {
    const c = CONSTRUCTIVE_SET.find((x) => x.milestone === 'M2b');
    if (c === undefined) throw new Error('no M2b case');
    const broken = { ...c, generate: () => CONSTRUCTIVE_SET.find((x) => x.milestone === 'M0')?.generate(0) as never };
    const r = runConstructiveOnKernel([broken], 1);
    expect(r.deferred.M2b).toBe(1);
    expect(r.failedCases).toBe(1);
  });
});

describe("the runner's own iteration of the M0 cases (the hardening round S1: M0-k-02's N-7, N-3)", () => {
  const antenna = constructiveCase('geom/antenna') as ConstructiveCase;
  /** A judge answering draw by draw from a script (`undefined`: no verdict on that draw). */
  const scripted = (answers: (string | null | undefined)[]): ConstructiveJudge => {
    let i = 0;
    return () => {
      const a = answers[Math.min(i++, answers.length - 1)];
      return a === undefined ? undefined : a === null ? { ok: true } : { ok: false, reason: a };
    };
  };

  it('a judge silent on the first draw but answering later makes no pending case: its later failure counts, and each silent draw fails (N-7)', () => {
    const r = runConstructiveOnKernel([antenna], 3, { judge: scripted([undefined, 'planted late failure']) });
    expect([r.pending, r.judged, r.failedCases, r.green, r.draws]).toEqual([[], 1, 1, 0, 3]);
    expect(r.failures.map((f) => [f.seed, f.reason])).toEqual([
      [0, 'the judge gave no verdict on this seed but gave one on seed 1 (a judge selective by seed)'],
      [1, 'planted late failure'],
      [2, 'planted late failure'],
    ]);
    // a judge selective by seed fails the case even where every verdict it gave is green
    const g = runConstructiveOnKernel([antenna], 3, { judge: scripted([null, undefined, null]) });
    expect([g.pending, g.failedCases, g.green, g.failures.map((f) => f.seed)]).toEqual([[], 1, 0, [1]]);
    // silent on every draw: pending its runner, nothing judged
    const p = runConstructiveOnKernel([antenna], 3, { judge: scripted([undefined]) });
    expect([p.pending, p.judged, p.draws, p.failedCases]).toEqual([['geom/antenna'], 0, 0, 0]);
  });

  it('a known case is known only when every failing draw matches its pattern, past the 20 failures a report keeps (N-3)', () => {
    const known = [{ id: 'geom/antenna', owner: 'test', pattern: /^planted pattern$/, finding: 'test' }];
    const answers = Array.from({ length: 30 }, (_, i) => (i === 25 ? 'another reason' : 'planted pattern'));
    const r = runConstructiveOnKernel([antenna], 30, { known, judge: scripted(answers) });
    expect([r.known.length, r.failedCases, r.draws]).toEqual([0, 1, 30]);
    expect(r.failures.filter((f) => f.reason === 'another reason').map((f) => f.seed)).toEqual([25]);
    const k = runConstructiveOnKernel([antenna], 30, { known, judge: scripted(['planted pattern']) });
    expect([k.known.map((x) => [x.id, x.draws]), k.failedCases]).toEqual([[['geom/antenna', 30]], 0]);
  });
});

describe('the summary names each ladder fixture whole and reports the oracle draw guard (the hardening round S1: N-12, N-13)', () => {
  it("a ladder row's fixture id is kept whole (`F-PLOT, S10`, never `F-PLOT,`), a prefix of the row's fixture", () => {
    const run = constructiveRun(runConstructiveOnKernel(CONSTRUCTIVE_SET.filter((c) => c.id === 'geom/antenna'), 1));
    const ladders = ladderCoverage({ draws: 1 });
    const summary = countsSummary(countsReport(1, [], run, ladders)) as { ladders: { rows: { fixture: string }[] } };
    const ids = summary.ladders.rows.map((r) => r.fixture);
    expect(ids).toContain('F-PLOT, S10');
    ids.forEach((id, i) => {
      expect(ladders.rows[i].fixture.startsWith(id)).toBe(true);
      expect(id).not.toMatch(/[,;(]$/);
    });
    expect(ids).toContain('packages/kernel/test/skeleton/worklimit.test.ts');
    expect(ids).toContain('limit/one-item-chain-optional');
  }, 60_000);

  it('§13.1\'s ≥ 10⁵ unattracted draws are reported per oracle primitive (met at this size, projected to 10⁶), never asserted', () => {
    const r = runFuzz('buffer', 100);
    const o = r.oracle;
    if (o === null) throw new Error('buffer is oracle-compared');
    expect(o.guard).toEqual({ min: 100_000, met: false, projectedNightly: Math.round((o.unattracted * 1_000_000) / 100) });
    // the buffer family draws enough unattracted cases for the guard at the nightly size (≥ 10 %; ≈ 4 % before N-13)
    expect(o.guard.projectedNightly).toBeGreaterThanOrEqual(100_000);
    expect(runFuzz('orient', 3).oracle).toBeNull();
    const run = constructiveRun(runConstructiveOnKernel(CONSTRUCTIVE_SET.filter((c) => c.id === 'geom/antenna'), 1));
    const report = countsReport(100, [r], run, ladderCoverage({ draws: 1 }));
    expect(report.pass).toBe(true); // reported, not gated
    const summary = countsSummary(report) as { primitives: Record<string, { oracle: { guard: unknown }; judged: unknown }> };
    expect(summary.primitives.buffer.oracle.guard).toEqual(o.guard);
    expect(summary.primitives.buffer.judged).toEqual({});
  }, 60_000);
});
