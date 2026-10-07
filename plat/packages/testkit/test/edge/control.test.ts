// The edge suite's controls (M0-x-06; C-0100): a fixture whose expected outcome is deliberately wrong fails the suite
// naming the fixture and the seed; the judge's refusals; the restart assertion; and the harness's own pieces — the S5
// driver and the unplanted façade — leave the base's run unchanged (the fixtures run the real stages, no mock stage).
import { describe, expect, it } from 'vitest';
import { edgeSeeds, judgeEdgeOutcome, type EdgeFixture, type EdgeOutcome } from '../../src/edge/index.js';
import { edgeChain, restartFree, type ChainRun } from '../../src/edge/chain.js';
import { liveVertices } from '../../src/edge/arena.js';
import { arenaProblems, chainProblems } from '../../src/edge/observe.js';
import { s8State } from '../../src/edge/s8.js';
import { mergeSummary, fixturesOf, runFixture, SEEDS, summaryWanted, type FixtureRun } from './support.js';

const [EP16] = fixturesOf('EP-16/');
const ok: EdgeOutcome = { handling: 'defined', rung: 'x', problems: [], facts: {} };

describe('the negative controls', () => {
  it('a fixture whose expected outcome is deliberately wrong fails on every seed, naming the fixture and the seed', () => {
    const wrong: EdgeFixture = { ...EP16, expect: { ...EP16.expect, allowed: ['laddered'] } };
    const r = runFixture(wrong);
    const seeds = edgeSeeds(EP16.id, SEEDS);
    expect(r.counts.offOutcome).toBe(SEEDS);
    expect(r.failures).toHaveLength(SEEDS);
    for (let i = 0; i < SEEDS; i += 1) expect(r.failures[i]).toContain(`EP-16/stop-test at seed ${String(seeds[i])}: handled defined`);
    // the same fixture with its own expectation passes
    expect(runFixture(EP16).failures).toEqual([]);
  });

  it("a fixture whose own judge disagrees fails naming it; a throw is a crash; a problem is never a pass", () => {
    const judged: EdgeFixture = { ...EP16, expect: { ...EP16.expect, judge: () => 'the control says no' } };
    const r = runFixture(judged, 2);
    expect(r.failures.every((f) => f.startsWith('EP-16/stop-test at seed ') && f.endsWith('the control says no'))).toBe(true);
    expect(r.failures).toHaveLength(2);
    const throws: EdgeFixture = { ...EP16, run: () => { throw new Error('boom'); } };
    const t = runFixture(throws, 2);
    expect(t.counts.crash).toBe(2);
    expect(t.failures[0]).toMatch(/^EP-16\/stop-test at seed \d+: threw boom$/);
    const problem: EdgeFixture = { ...EP16, run: () => ({ ...ok, problems: ['the arena fails x'] }) };
    expect(runFixture(problem, 1).failures[0]).toMatch(/the arena fails x/);
  });

  it('the judge: a refused-safe outcome passes only where pinned, and only with a pinned code', () => {
    const base: EdgeFixture = { id: 'c/x', home: 'h', run: () => ok, expect: { outcome: 'o', allowed: ['laddered', 'refused-safe'] } };
    const rs: EdgeOutcome = { handling: 'refused-safe', rung: 'E_INVARIANT', problems: [], facts: {} };
    expect(judgeEdgeOutcome(base, 7, rs)).toBe('c/x at seed 7: refused-safe with no pinned refusal');
    const pinned: EdgeFixture = { ...base, expect: { ...base.expect, refusal: { codes: ['E_DEGENERATE'], known: 'KI' } } };
    expect(judgeEdgeOutcome(pinned, 7, rs)).toMatch(/^c\/x at seed 7: refused E_INVARIANT, pinned E_DEGENERATE/);
    expect(judgeEdgeOutcome(pinned, 7, { ...rs, rung: 'E_DEGENERATE' })).toBeNull();
    expect(judgeEdgeOutcome(pinned, 7, { ...rs, handling: 'off' })).toMatch(/handled off/);
    expect(judgeEdgeOutcome(pinned, 7, { ...rs, rung: 'E_DEGENERATE', problems: ['p'] })).toBe('c/x at seed 7: p');
  });
});

describe('the restart assertion (EP-01: never a whole-map retry)', () => {
  const fake = (runs: [string, number][], names: string[]): ChainRun => ({ runs: new Map(runs), report: { stages: names.map((name) => ({ name })) } }) as unknown as ChainRun;
  it('refuses a stage run twice, a stage after the last, and a report naming a stage twice', () => {
    expect(restartFree(fake([['S1', 1], ['S3', 1]], ['S1', 'S3']), 'S3')).toBeNull();
    expect(restartFree(fake([['S1', 2]], ['S1']), 'S3')).toBe('stage S1 ran 2 times');
    expect(restartFree(fake([['S1', 1], ['S4', 1]], ['S1', 'S4']), 'S3')).toBe('stage S4 ran after S3');
    expect(restartFree(fake([['S1', 1]], ['S1', 'S1']), 'S3')).toMatch(/twice/);
  });
});

describe("every run's fail-safety checks (EP-01: never an invalid output; the prepared state stands)", () => {
  it('arenaProblems: none on a valid arena; a vertex moved behind the kernel is an invalid output', () => {
    const st = s8State(5, null);
    expect(arenaProblems(st.plat)).toEqual([]);
    const v = liveVertices(st.plat).find((q) => q.level === 1);
    expect(v).toBeDefined();
    if (v === undefined) return;
    st.plat.vertices.x[v.v] += 123_457;
    const p = arenaProblems(st.plat);
    expect(p.length).toBeGreaterThan(0);
    expect(p[0]).toMatch(/^the arena fails /);
  });

  it('chainProblems: a stage before the home refused, a refusal with no §3.1 code, a restart — each named', () => {
    const st = s8State(6, null);
    const fake = (bugs: { stage: string; cls: string }[], runs: [string, number][]): ChainRun =>
      ({ runs: new Map(runs), report: { stages: runs.map(([name]) => ({ name })), bugs }, model: { plats: new Map([['ground/0', st.plat]]) }, refusals: new Map() }) as unknown as ChainRun;
    expect(chainProblems(fake([], [['S1', 1], ['S3', 1], ['S4', 1]]), 'S4', 'S4')).toEqual([]);
    expect(chainProblems(fake([{ stage: 'S4', cls: 'E_INVARIANT' }], [['S1', 1], ['S3', 1], ['S4', 1]]), 'S4', 'S4')).toEqual([]);
    expect(chainProblems(fake([{ stage: 'S3', cls: 'E_INVARIANT' }], [['S1', 1], ['S3', 1], ['S4', 1]]), 'S4', 'S4')[0]).toMatch(/^the prepared state did not stand: S3 refused E_INVARIANT/);
    expect(chainProblems(fake([{ stage: 'S4', cls: 'W_SOMETHING' }], [['S1', 1], ['S3', 1], ['S4', 1]]), 'S4', 'S4')).toEqual(["S4's refusal carries no §3.1 code: W_SOMETHING"]);
    expect(chainProblems(fake([], [['S1', 1], ['S3', 2]]), 'S4', 'S4')).toEqual(['restart: stage S3 ran 2 times']);
  });
});

describe("the harness's pieces leave the base's run unchanged (the real stages, no mock stage)", () => {
  const roots = (r: ChainRun): Record<string, string> => Object.fromEntries([...r.model.stageRoots].map(([k, v]) => [k, JSON.stringify(v)]));
  it("the S5 driver reproduces the registered S5 adapter: the same stage-end digests, report and S5 outputs", { timeout: 300_000 }, () => {
    for (const seed of [11, 12]) {
      const a = edgeChain(seed, { upTo: 'S6' });
      const b = edgeChain(seed, { upTo: 'S6', registeredS5: true });
      expect(a.ran).toEqual(['S1', 'S3', 'S4', 'S5', 'S6']);
      expect(roots(a)).toEqual(roots(b));
      expect(JSON.stringify(a.model.root)).toBe(JSON.stringify(b.model.root));
      expect(JSON.stringify(a.report.stages)).toBe(JSON.stringify(b.report.stages));
      expect(a.report.bugs).toEqual(b.report.bugs);
      for (const key of ['ways', 'junctions', 'gates', 's5']) expect(JSON.stringify(a.model.data.get(key)), key).toBe(JSON.stringify(b.model.data.get(key)));
      expect(restartFree(a, 'S6')).toBeNull();
    }
    expect(() => edgeChain(1, { upTo: 'S5', registeredS5: true, s5: {} })).toThrow(/registered S5/);
  });

  it('an unplanted façade (a plant that never fires) leaves every stage-end digest as the plain chain', { timeout: 300_000 }, () => {
    const seed = 13;
    const plain = edgeChain(seed, { upTo: 'S4' });
    const watched = edgeChain(seed, { upTo: 'S4', plant: { stage: 'S4', plant: { kind: 'collinear', select: () => false } } });
    expect(watched.plant.fired).toBeNull();
    expect(watched.plant.calls).toBeGreaterThan(0);
    expect(roots(watched)).toEqual(roots(plain));
    expect(JSON.stringify(watched.report.stages)).toBe(JSON.stringify(plain.report.stages));
  });
});

describe('the numbers-only summary (C-0067)', () => {
  it('carries counts only, per fixture the seed count and the outcome counts, replacing a summary at another size', () => {
    const run: FixtureRun = { id: 'EP-16/stop-test', seeds: 3, counts: { absorbed: 0, laddered: 0, 'left-out': 0, 'refused-safe': 0, defined: 3, off: 0, crash: 0, hang: 0, offOutcome: 0 }, failures: [], rungs: { 'a rung': 3 } };
    const s = mergeSummary(null, [run], 3);
    expect(s.seedsPerFixture).toBe(3);
    expect(s.fixtures['EP-16/stop-test']).toEqual({ seeds: 3, ...run.counts });
    expect(s.totals.fixtures).toBe(1);
    expect(s.totals.defined).toBe(3);
    const walk = (v: unknown, at: string): void => {
      if (typeof v === 'object' && v !== null) for (const [k, x] of Object.entries(v)) walk(x, `${at}.${k}`);
      else if (at !== '.item') expect(typeof v, at).toBe('number');
    };
    walk(s, '');
    const other: FixtureRun = { ...run, id: 'EP-05/S5d' };
    expect(Object.keys(mergeSummary(s, [other], 3).fixtures)).toEqual(['EP-05/S5d', 'EP-16/stop-test']);
    expect(Object.keys(mergeSummary(s, [other], 10).fixtures)).toEqual(['EP-05/S5d']);
    expect(summaryWanted({})).toBe(false);
    expect(summaryWanted({ PLAT_EDGE_SUMMARY: '1' })).toBe(true);
  });
});
