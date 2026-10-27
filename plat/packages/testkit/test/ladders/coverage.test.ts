// M0-x-05: stageLadderCoverage() — one report over §5.2 (§13.1 *Ladder coverage*; §16 M0 (a); C-0085, C-0109, C-0269):
// every built stage rung reached by its fixture and left nowhere on the plain controls, every deferred row with its
// milestone, every §5.2 ladder named; M0-k-04's ladderCoverage() merged unchanged (its file never edited, both folders
// exported from @plat/testkit); the report reproducing byte for byte; a planted fixture that reaches no rung, or a
// control that leaks a code, failing the check. Hardening round S1: a run that leaves a `bugs` entry fails the check
// (notes row 2); the kernel ladders read from the kernel report itself (row 4); each count's unit named (row 6). Round
// S2: a table that lost a row a stage declares fails the verdict with the walker's message (row 1, C-0435 (1)).
import { describe, expect, it } from 'vitest';
import * as testkit from '@plat/testkit';
import { ladderCoverage, ladderLeafOf, LADDER_FIXTURES, SECTION_5_2, STAGE_LADDERS, stageCoverageSummary, stageLadderCoverage, type CoverageReport, type LadderFixture, type StageCoverageReport } from '@plat/testkit';

let full: [StageCoverageReport, StageCoverageReport] | null = null;
/** The whole report, twice (each ≈ 2 min: every fixture and control runs). */
const twice = (): [StageCoverageReport, StageCoverageReport] => (full ??= [stageLadderCoverage({ kernelDraws: 2 }), stageLadderCoverage({ kernelDraws: 2 })]);

let cheap: CoverageReport | null = null;
const kernel1 = (): CoverageReport => (cheap ??= ladderCoverage({ draws: 1 }));

describe('the combined report (C-0109)', () => {
  it('both names are @plat/testkit’s: M0-k-04’s ladderCoverage and this folder’s stageLadderCoverage (no TS2308)', () => {
    expect(typeof testkit.ladderCoverage).toBe('function');
    expect(typeof testkit.stageLadderCoverage).toBe('function');
    expect(testkit.ladderCoverage).not.toBe(testkit.stageLadderCoverage);
  });

  it('every built stage rung is reached by its fixture (≥ 1) and left nowhere on the controls (0); covered', { timeout: 900_000 }, () => {
    const [a] = twice();
    expect(a.tableProblems).toEqual([]);
    expect(a.plain).toBeNull();
    const built = a.stage.filter((r) => r.status === 'built');
    expect(built.length).toBe(28);
    for (const r of built) {
      expect([r.leaf, r.exercised !== null && r.exercised.fixture >= 1]).toEqual([r.leaf, true]);
      expect([r.leaf, r.exercised?.control]).toEqual([r.leaf, 0]);
      // §13.1 *`bugs` empty*: no fixture run left a bug, nor did a control (notes row 2).
      expect([r.leaf, r.exercised?.bugs]).toEqual([r.leaf, 0]);
      expect(r.leaf).toBe(ladderLeafOf(r));
    }
    expect(a.controlBugs).toBe(0);
    for (const r of a.stage.filter((x) => x.status !== 'built')) {
      expect(r.exercised).toBeNull();
      expect(r.status).toEqual({ deferredTo: r.milestone });
    }
    expect(a.stageCovered).toBe(true);
    expect(a.kernel.covered).toBe(true);
    expect(a.covered).toBe(true);
  });

  it('every §5.2 ladder is named, in §5.2’s order; the stage rows are the registry’s, in its order', { timeout: 900_000 }, () => {
    const [a] = twice();
    expect(a.ladders).toEqual([...SECTION_5_2]);
    expect(a.stage.map((r) => [r.ladder, r.stage, r.rung, r.code, r.fixture])).toEqual(STAGE_LADDERS.map((r) => [r.ladder, r.stage, r.rung, r.code, r.fixture]));
  });

  it('contains every row of ladderCoverage() unchanged, first, and its whole report as `kernel`', { timeout: 900_000 }, () => {
    const [a] = twice();
    const k = ladderCoverage({ draws: 2 });
    expect(a.kernel).toEqual(k);
    expect(a.rows.slice(0, k.rows.length)).toEqual(k.rows);
    expect(a.rows.slice(k.rows.length)).toEqual(a.stage);
    expect(a.rows.length).toBe(k.rows.length + STAGE_LADDERS.length);
  });

  it('reproduces byte for byte (seeded): two whole runs, one JSON', { timeout: 900_000 }, () => {
    const [a, b] = twice();
    expect(JSON.stringify(b)).toBe(JSON.stringify(a));
    expect(JSON.stringify(stageCoverageSummary(b))).toBe(JSON.stringify(stageCoverageSummary(a)));
  });
});

describe('the check fails where it must (planted fixtures)', () => {
  const ok = (r: (typeof STAGE_LADDERS)[number]): LadderFixture => ({ id: r.fixture, forces: 'planted: its leaf once', run: () => ({ [ladderLeafOf(r)]: 1 }) });
  const built = STAGE_LADDERS.filter((r) => r.milestone === undefined);

  it('every planted fixture leaving its leaf, the controls nothing: covered', () => {
    const r = stageLadderCoverage({ kernel: kernel1(), fixtures: built.map(ok), controls: [] });
    expect(r.stageCovered).toBe(true);
    expect(r.covered).toBe(r.kernel.covered);
    // C-0109: the kernel report's rows first, unchanged, then the stage rows.
    expect(r.kernel).toBe(kernel1());
    expect(r.rows.slice(0, r.kernel.rows.length)).toEqual(r.kernel.rows);
    expect(r.rows.slice(r.kernel.rows.length)).toEqual(r.stage);
  });

  it('a planted fixture that reaches no rung fails the check, on its row alone', () => {
    for (const victim of [built[0], built[13], built[built.length - 1]]) {
      const fixtures = built.map((r) => (r === victim ? { id: r.fixture, forces: 'planted: nothing', run: () => ({}) } : ok(r)));
      const r = stageLadderCoverage({ kernel: kernel1(), fixtures, controls: [] });
      expect(r.stageCovered).toBe(false);
      expect(r.covered).toBe(false);
      const bad = r.stage.filter((x) => x.status === 'built' && (x.exercised === null || x.exercised.fixture === 0));
      expect(bad.map((x) => x.leaf)).toEqual([ladderLeafOf(victim)]);
    }
  });

  it('a fixture leaving another rung’s code only does not cover its own', () => {
    const [x, y] = [built[2], built[3]];
    const fixtures = built.map((r) => (r === x ? { id: r.fixture, forces: 'planted: the neighbour’s code', run: () => ({ [ladderLeafOf(y)]: 1 }) } : ok(r)));
    const r = stageLadderCoverage({ kernel: kernel1(), fixtures, controls: [] });
    expect(r.stage.find((s) => s.leaf === ladderLeafOf(x))?.exercised).toEqual({ fixture: 0, control: 0, bugs: 0 });
    expect(r.stageCovered).toBe(false);
  });

  it('a control leaving a rung’s code fails that row: the code must appear only where its fixture forces it', () => {
    // A single leaked line fails as surely as two (the bound is 0, not "few").
    for (const n of [1, 2]) {
      const leak: LadderFixture = { id: 'plain/leak', forces: 'planted', run: () => ({ [ladderLeafOf(built[5])]: n }) };
      const r = stageLadderCoverage({ kernel: kernel1(), fixtures: built.map(ok), controls: [leak] });
      expect(r.stage.find((s) => s.leaf === ladderLeafOf(built[5]))?.exercised).toEqual({ fixture: 1, control: n, bugs: 0 });
      expect(r.stageCovered).toBe(false);
      expect(r.covered).toBe(false);
    }
  });

  it('a table missing a ladder fails the check even when every fixture passes', () => {
    const rows = STAGE_LADDERS.filter((r) => r.ladder !== 'F-CORRIDOR');
    const r = stageLadderCoverage({ kernel: kernel1(), rows, fixtures: built.map(ok), controls: [] });
    expect(r.tableProblems).toEqual(["§5.2's F-CORRIDOR is missing from the table"]);
    expect(r.ladders.includes('F-CORRIDOR')).toBe(false);
    expect(r.stageCovered).toBe(false);
  });

  it('a table that lost a row a stage declares fails the check, with the walker’s message, though every fixture passes (notes row 1, C-0435 (1))', () => {
    // S8 declares F-CUT 'antennaSplit' (registerBase's StageDecl); the table without S8's antenna row cannot hold it.
    const rows = STAGE_LADDERS.filter((r) => !(r.ladder === 'F-CUT' && r.stage === 'S8' && r.code === 'antenna'));
    expect(rows.length).toBe(STAGE_LADDERS.length - 1);
    const fixtures = rows.filter((r) => r.milestone === undefined).map(ok);
    const r = stageLadderCoverage({ kernel: kernel1(), rows, fixtures, controls: [] });
    expect(r.tableProblems).toEqual(["S8's F-CUT 'antennaSplit' maps to 'S8 F-CUT antenna', which the table does not hold"]);
    // Every remaining built row is reached and clean: the declared problem alone fails the verdict.
    expect(r.stage.every((x) => x.status !== 'built' || (x.exercised !== null && x.exercised.fixture === 1 && x.exercised.control === 0 && x.exercised.bugs === 0))).toBe(true);
    expect(r.stageCovered).toBe(false);
    expect(r.covered).toBe(false);
    expect((stageCoverageSummary(r) as { tableProblems: number }).tableProblems).toBe(1);
  });

  it('a fixture run that leaves a bug fails its row, though it reaches its rung; a control that leaves one fails the check (notes row 2)', () => {
    const victim = built[6];
    const fixtures = built.map((r) => (r === victim ? { id: r.fixture, forces: 'planted: its leaf and a bug', run: () => ({ [ladderLeafOf(r)]: 1, bugs: 1 }) } : ok(r)));
    const r = stageLadderCoverage({ kernel: kernel1(), fixtures, controls: [] });
    expect(r.stage.find((x) => x.leaf === ladderLeafOf(victim))?.exercised).toEqual({ fixture: 1, control: 0, bugs: 1 });
    expect(r.stage.filter((x) => x.status === 'built' && x.exercised?.bugs !== 0).map((x) => x.leaf)).toEqual([ladderLeafOf(victim)]);
    expect(r.stageCovered).toBe(false);
    expect(r.covered).toBe(false);
    const s = stageCoverageSummary(r) as { fixtureBugs: number; controlBugs: number; rungs: Record<string, { bugs: number }> };
    expect([s.fixtureBugs, s.controlBugs, s.rungs[ladderLeafOf(victim)].bugs]).toEqual([1, 0, 1]);
    const buggy: LadderFixture = { id: 'plain/buggy', forces: 'planted: a bug, no code', run: () => ({ bugs: 2 }) };
    const c = stageLadderCoverage({ kernel: kernel1(), fixtures: built.map(ok), controls: [buggy] });
    expect(c.controlBugs).toBe(2);
    expect(c.stage.every((x) => x.status !== 'built' || (x.exercised?.control === 0 && x.exercised.bugs === 0))).toBe(true);
    expect(c.stageCovered).toBe(false);
    expect((stageCoverageSummary(c) as { controlBugs: number }).controlBugs).toBe(2);
  });

  it('the kernel ladders are the kernel report’s own: a report that lost F-SKELETON leaves it missing from the table (notes row 4)', () => {
    const k = kernel1();
    expect([...k.ladders]).toEqual(['F-NUM', 'F-SKELETON']);
    const lost = stageLadderCoverage({ kernel: { ...k, ladders: ['F-NUM'] }, fixtures: built.map(ok), controls: [] });
    expect(lost.tableProblems).toEqual(["§5.2's F-SKELETON is missing from the table"]);
    expect(lost.ladders.includes('F-SKELETON')).toBe(false);
    expect(lost.stageCovered).toBe(false);
    expect(lost.covered).toBe(false);
    // F-NUM lost from the kernel report stays named by its stage rows (S5c's re-propose and reject).
    const num = stageLadderCoverage({ kernel: { ...k, ladders: ['F-SKELETON'] }, fixtures: built.map(ok), controls: [] });
    expect(num.tableProblems).toEqual([]);
  });

  it('a kernel report not covered makes the whole report not covered', () => {
    const k = kernel1();
    const r = stageLadderCoverage({ kernel: { ...k, covered: false }, fixtures: built.map(ok), controls: [] });
    expect(r.stageCovered).toBe(true);
    expect(r.covered).toBe(false);
  });

  it('`only` runs the named rows’ fixtures; every other built row is unrun, so not covered', () => {
    const runs: string[] = [];
    const fixtures = built.map((r) => ({ ...ok(r), run: () => (runs.push(r.fixture), { [ladderLeafOf(r)]: 1 }) }));
    const r = stageLadderCoverage({ kernel: kernel1(), fixtures, controls: [], only: [ladderLeafOf(built[0])] });
    expect(runs).toEqual([built[0].fixture]);
    expect(r.stage.filter((s) => s.exercised !== null).map((s) => s.leaf)).toEqual([ladderLeafOf(built[0])]);
    expect(r.stageCovered).toBe(false);
  });

  it('the shipped fixtures are the registry’s: one per built row', () => {
    expect(LADDER_FIXTURES.map((f) => f.id).sort()).toEqual(built.map((r) => r.fixture).sort());
  });

  it('the summary is numbers and ids only: the counts per leaf, the deferred rows by milestone, the verdicts', () => {
    const r = stageLadderCoverage({ kernel: kernel1(), fixtures: built.map(ok), controls: [] });
    const s = stageCoverageSummary(r) as { rungs: Record<string, { fixture: number; control: number; bugs: number }>; units: Record<string, string>; deferredRows: Record<string, number>; builtRows: number; builtReached: number; builtClean: number; fixtureBugs: number; controlBugs: number; stageCovered: boolean; ladders: number };
    expect(s.builtRows).toBe(28);
    expect(s.builtReached).toBe(28);
    expect(s.builtClean).toBe(28);
    expect(s.ladders).toBe(SECTION_5_2.length);
    expect(Object.keys(s.rungs).length).toBe(28);
    for (const v of Object.values(s.rungs)) expect(v).toEqual({ fixture: 1, control: 0, bugs: 0 });
    expect([s.fixtureBugs, s.controlBugs]).toEqual([0, 0]);
    // Each count's unit (notes row 6): rung uses, but W_CUT_SLID's count is (c)'s slide steps (§4.6 step 8 (c)).
    expect(s.units).toEqual({ default: 'rung_uses', 'S8 F-CUT W_CUT_SLID': 'slide_steps' });
    const deferred = STAGE_LADDERS.filter((x) => x.milestone !== undefined);
    expect(Object.values(s.deferredRows).reduce((a, b) => a + b, 0)).toBe(deferred.length);
    expect(s.deferredRows['M1']).toBe(deferred.filter((x) => x.milestone === 'M1').length);
    expect(JSON.stringify(s)).not.toMatch(/"(at|seconds|wallMs|cpuMs|ms)"/);
    // One silent fixture and one leaking control: reached and clean each drop by one, the verdicts false.
    const leak: LadderFixture = { id: 'plain/leak', forces: 'planted', run: () => ({ [ladderLeafOf(built[4])]: 1 }) };
    const fx = built.map((x) => (x === built[7] ? { id: x.fixture, forces: 'planted: nothing', run: () => ({}) } : ok(x)));
    const s2 = stageCoverageSummary(stageLadderCoverage({ kernel: kernel1(), fixtures: fx, controls: [leak] })) as typeof s & { stageCovered: boolean };
    expect([s2.builtRows, s2.builtReached, s2.builtClean, s2.stageCovered]).toEqual([28, 27, 27, false]);
    expect(s2.rungs[ladderLeafOf(built[4])]).toEqual({ fixture: 1, control: 1, bugs: 0 });
    expect(s2.rungs[ladderLeafOf(built[7])]).toEqual({ fixture: 0, control: 0, bugs: 0 });
  });
});
