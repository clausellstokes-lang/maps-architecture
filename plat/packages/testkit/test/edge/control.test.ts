// The edge suite's controls (M0-x-06; C-0100): a fixture whose expected outcome is deliberately wrong fails the suite
// naming the fixture and the seed; the judge's refusals; the restart assertion; and the harness's own pieces — the S5
// driver and the unplanted façade — leave the base's run unchanged (the fixtures run the real stages, no mock stage).
import { describe, expect, it } from 'vitest';
import { edgeSeeds, judgeEdgeOutcome, type EdgeFixture, type EdgeOutcome } from '../../src/edge/index.js';
import { edgeChain, MID_FLAT, restartFree, SMALL_FLAT, type ChainRun } from '../../src/edge/chain.js';
import { EP20_BLUEPRINT } from '../../src/edge/rows.js';
import type { BaseBlueprint } from '@plat/layout';
import { liveVertices } from '../../src/edge/arena.js';
import { arenaProblems, chainCheck, chainProblems } from '../../src/edge/observe.js';
import { s8State } from '../../src/edge/s8.js';
import { builtOf, edgeShard, inShard, mergeSummary, runFixture, SEEDS, summaryWanted, type EdgeSummary, type FixtureRun } from './support.js';

const [EP16] = builtOf('EP-16/');

/** The driver's parity seeds on the mid flat frame — S5c grows streets on both (2 and 3, one pruned on seed 1), so the
 * driver's step-insert hook meets the stage's default insert there (SMALL_FLAT's seeds 11 and 12 grow none) — and on
 * EP-20's capped frame, stages 2 and 3 folded into stage 1 and S5d skipped as capped (probed in the round's mirror). */
const PARITY_MID: readonly number[] = [1, 2];
const PARITY_EP20: readonly number[] = [1, 2];
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
    // a rare pin names its seeds (C-0342 (4)): the pinned code on any other seed is off
    const rare: EdgeFixture = { ...base, expect: { ...base.expect, refusal: { codes: ['E_INVARIANT'], known: 'KI rare', seeds: [7, 9] } } };
    expect(judgeEdgeOutcome(rare, 7, rs)).toBeNull();
    expect(judgeEdgeOutcome(rare, 9, rs)).toBeNull();
    expect(judgeEdgeOutcome(rare, 8, rs)).toBe('c/x at seed 8: refused E_INVARIANT on a seed the pin does not name (KI rare)');
  });

  it('the judge: a refused-lawful outcome passes only on a seed the cell names as a finding, with its code (J264, C-0342 (3))', () => {
    const rl: EdgeOutcome = { handling: 'refused-lawful', rung: 'E_INVARIANT', problems: [], facts: {} };
    const open: EdgeFixture = { id: 'c/y', home: 'h', run: () => ok, expect: { outcome: 'o', allowed: ['absorbed', 'refused-lawful'] } };
    expect(judgeEdgeOutcome(open, 3, rl)).toBe("c/y at seed 3: refused a lawful input (E_INVARIANT; J264's defect) on a seed the cell names no finding for — a new finding for the session");
    const named: EdgeFixture = { ...open, expect: { ...open.expect, findings: { 3: { code: 'E_INVARIANT', route: 'Q37' } } } };
    expect(judgeEdgeOutcome(named, 3, rl)).toBeNull();
    expect(judgeEdgeOutcome(named, 4, rl)).toMatch(/^c\/y at seed 4: refused a lawful input .* a new finding for the session$/);
    expect(judgeEdgeOutcome(named, 3, { ...rl, rung: 'E_DEGENERATE' })).toBe('c/y at seed 3: refused a lawful input E_DEGENERATE, the finding named E_INVARIANT (Q37)');
    // a refused-safe pin is not a finding, and a finding is not a refused-safe pin
    const safeOnly: EdgeFixture = { ...open, expect: { outcome: 'o', allowed: ['refused-safe'], refusal: { codes: ['E_INVARIANT'], known: 'KI' } } };
    expect(judgeEdgeOutcome(safeOnly, 3, rl)).toMatch(/handled refused-lawful/);
    expect(judgeEdgeOutcome(named, 3, { ...rl, handling: 'refused-safe' })).toMatch(/handled refused-safe/);
  });

  it('the runner counts and names every lawful-input refusal a run met, whether the run passed or not (J264)', () => {
    const lawful = [{ stateSeed: 99, stage: 'S4', code: 'E_INVARIANT', where: 'preparation' as const, detail: 'd' }];
    const met: EdgeFixture = { ...EP16, run: () => ({ ...ok, lawful }) };
    const r = runFixture(met, 2);
    expect(r.failures).toEqual([]);
    expect(r.counts.lawfulRefusals).toBe(2);
    const seeds = edgeSeeds(EP16.id, 2);
    expect(r.lawful).toEqual(seeds.map((s) => `EP-16/stop-test seed ${String(s)} state 99: S4 refused lawful input E_INVARIANT (preparation) — d`));
    expect(runFixture(EP16, 1).counts.lawfulRefusals).toBe(0);
  });
});

describe('the harness\'s own sharding (PLAT_EDGE_SHARD, C-0342 (5))', () => {
  it('unset runs every fixture; i/n splits the built fixtures into n disjoint slices covering them all; a bad value is refused', () => {
    expect(edgeShard({})).toEqual({ i: 0, n: 1 });
    expect(edgeShard({ PLAT_EDGE_SHARD: '' })).toEqual({ i: 0, n: 1 });
    expect(edgeShard({ PLAT_EDGE_SHARD: '2/4' })).toEqual({ i: 2, n: 4 });
    for (const bad of ['4/4', '1', '-1/2', '1/0', '01/3', '1/2 ', 'a/b']) expect(() => edgeShard({ PLAT_EDGE_SHARD: bad })).toThrow(RangeError);
    const built = builtOf('');
    const seen = new Map<string, number>();
    for (let i = 0; i < 4; i += 1) for (const f of built) if (inShard(f, { i, n: 4 })) seen.set(f.id, (seen.get(f.id) ?? 0) + 1);
    expect(seen.size).toBe(built.length);
    expect([...seen.values()].every((n) => n === 1)).toBe(true);
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
    // J264's census: a stage before the home refusing the prepared (lawful) state is one lawful-input refusal, named
    const withDetail = (bugs: { stage: string; cls: string }[]): ChainRun => ({ ...fake(bugs, [['S1', 1], ['S3', 1], ['S4', 1]]), refusals: new Map([['S3', { code: 'E_INVARIANT', detail: 'layStrips: x' }]]) }) as unknown as ChainRun;
    expect(chainCheck(withDetail([{ stage: 'S3', cls: 'E_INVARIANT' }]), 'S4', 'S4').lawful).toEqual([{ stage: 'S3', code: 'E_INVARIANT', where: 'preparation', detail: 'layStrips: x' }]);
    expect(chainCheck(withDetail([{ stage: 'S4', cls: 'E_INVARIANT' }]), 'S4', 'S4').lawful).toEqual([]);
  });
});

describe("the harness's pieces leave the base's run unchanged (the real stages, no mock stage)", () => {
  const roots = (r: ChainRun): Record<string, string> => Object.fromEntries([...r.model.stageRoots].map(([k, v]) => [k, JSON.stringify(v)]));
  // the S5 driver's parity on every frame its fixtures run S5 on (the hardening round S1, note 9): the small flat frame,
  // the mid flat frame (S5b's main roads, S5c's and S5d's growth — the driver's insert hook among them) and EP-20's capped
  // frame (the folded stages)
  const PARITY: readonly [string, BaseBlueprint, readonly number[]][] = [
    ['SMALL_FLAT', SMALL_FLAT, [11, 12]],
    ['MID_FLAT', MID_FLAT, PARITY_MID],
    ['EP-20', EP20_BLUEPRINT, PARITY_EP20],
  ];
  it("the S5 driver reproduces the registered S5 adapter: the same stage-end digests, report and S5 outputs", { timeout: 900_000 }, () => {
    for (const [frame, blueprint, seeds] of PARITY) {
      for (const seed of seeds) {
        const a = edgeChain(seed, { blueprint, upTo: 'S6' });
        const b = edgeChain(seed, { blueprint, upTo: 'S6', registeredS5: true });
        expect(a.report.bugs, `${frame} ${String(seed)}`).toEqual([]);
        expect(a.ran).toEqual(['S1', 'S3', 'S4', 'S5', 'S6']);
        expect(roots(a), `${frame} ${String(seed)}`).toEqual(roots(b));
        expect(JSON.stringify(a.model.root), `${frame} ${String(seed)}`).toBe(JSON.stringify(b.model.root));
        expect(JSON.stringify(a.report.stages), `${frame} ${String(seed)}`).toBe(JSON.stringify(b.report.stages));
        // the whole report, the kernel's warning counts among them (every sub-stage's and the prune's warnings forwarded)
        expect(JSON.stringify(a.report.kernel)).toBe(JSON.stringify(b.report.kernel));
        expect(JSON.stringify(a.report)).toBe(JSON.stringify(b.report));
        expect(a.report.bugs).toEqual(b.report.bugs);
        for (const key of ['ways', 'junctions', 'gates', 's5']) expect(JSON.stringify(a.model.data.get(key)), key).toBe(JSON.stringify(b.model.data.get(key)));
        expect(restartFree(a, 'S6')).toBeNull();
        // the frame's own part is met: streets grown through the hook (MID_FLAT), the later stages folded (EP-20)
        if (frame === 'MID_FLAT') expect(a.s5.growth.reduce((n, g) => n + g.streets.length, 0), `${frame} ${String(seed)}`).toBeGreaterThan(0);
        if (frame === 'EP-20') expect(a.s5.state?.stages.filter((g) => g.foldedInto !== null).length, `${frame} ${String(seed)}`).toBeGreaterThan(0);
      }
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
    const run: FixtureRun = { id: 'EP-16/stop-test', seeds: 3, counts: { absorbed: 0, laddered: 0, 'left-out': 0, 'refused-safe': 0, 'refused-lawful': 0, defined: 3, off: 0, crash: 0, hang: 0, offOutcome: 0, lawfulRefusals: 2 }, failures: [], rungs: { 'a rung': 3 }, lawful: ['x', 'y'] };
    const s = mergeSummary(null, [run], 3);
    expect(s.seedsPerFixture).toBe(3);
    expect(s.fixtures['EP-16/stop-test']).toEqual({ seeds: 3, ...run.counts });
    expect(s.totals.fixtures).toBe(1);
    expect(s.totals.defined).toBe(3);
    expect(s.totals.lawfulRefusals).toBe(2);
    // an entry of an earlier shape (C-0278's refused-residue) is dropped, never mixed into the totals
    const old = { ...s, fixtures: { ...s.fixtures, 'EP-05/S5d': { seeds: 3, absorbed: 0, laddered: 3, 'left-out': 0, 'refused-safe': 0, 'refused-residue': 0, defined: 0, off: 0, crash: 0, hang: 0, offOutcome: 0 } } } as unknown as EdgeSummary;
    expect(Object.keys(mergeSummary(old, [run], 3).fixtures)).toEqual(['EP-16/stop-test']);
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
