// M0-f-02a: the tier runner over FIXTURE manifests of trivial jobs (C-0105 — never a real tier): the budget rule (a
// normalised figure more than 10 % over fails over budget: 11 % fails, 9 % and exactly 10 % pass — for a job and for
// the tier), the projection (the 16-core tiers judged on CPU time ÷ 16 and marked projected; the PR tier on wall-clock),
// the fallback switch (fuzz and seeds reduced, the constructive set never cut), the verdict, the not-built and refused
// cases and the manifest's structural problems.
import { afterAll, describe, expect, it } from 'vitest';
import { applyFallback, budgetGates, FALLBACK_SIZES, judgeBudget, logName, manifestProblems, OVER_BUDGET_TOLERANCE, PROJECTION_CORES, runTier } from '../../src/tiers/runner.js';
import type { Unit } from '../../src/tiers/types.js';
import { fixtureManifest, job, plantedExec, readings, removeTrees, tree } from './fixture.js';

afterAll(removeTrees);

const root = (): string => tree({ 'scripts/ok.mjs': '' });

describe('the budget rule (§13.8: more than 10 % over fails over budget)', () => {
  it('judgeBudget: 11 % over fails, 9 % and exactly 10 % pass; the figure is divided by the normalisation; none → unjudged', () => {
    expect(OVER_BUDGET_TOLERANCE).toBe(0.1);
    expect(judgeBudget(1_110, 1, 1_000)).toEqual({ normalisedMs: 1_110, verdict: 'over budget' });
    expect(judgeBudget(1_090, 1, 1_000)).toEqual({ normalisedMs: 1_090, verdict: 'pass' });
    expect(judgeBudget(1_100, 1, 1_000).verdict).toBe('pass');
    expect(judgeBudget(1_101, 1, 1_000).verdict).toBe('over budget');
    // a runner twice as slow as the reference (score 200 against 100) halves the figure (§12.1)
    expect(judgeBudget(2_200, 2, 1_000)).toEqual({ normalisedMs: 1_100, verdict: 'pass' });
    expect(judgeBudget(2_220, 2, 1_000).verdict).toBe('over budget');
    expect(judgeBudget(5_000, null, 1_000)).toEqual({ normalisedMs: null, verdict: 'unjudged' });
  });

  it('a tier over budget by 11 % fails over budget, by 9 % passes (whole mode, normalisation 1, planted wall-clock)', async () => {
    const run = async (wallMs: number) =>
      runTier(fixtureManifest([job('a'), job('b')], { budget: { ms: 100_000, cores: 8, projected: false } }), {
        root: root(),
        out: tree({}),
        mode: 'whole',
        exec: plantedExec({ a: { wallMs: wallMs / 2, cpuMs: 1 }, b: { wallMs: wallMs / 2, cpuMs: 1 } }),
        ...readings([100, 100]),
      });
    const over = await run(111_000);
    expect(over.budget).toMatchObject({ figureMs: 111_000, basis: 'wall-clock', normalisedMs: 111_000, verdict: 'over budget' });
    expect(over.verdict).toBe('over budget');
    const under = await run(109_000);
    expect(under.budget).toMatchObject({ normalisedMs: 109_000, verdict: 'pass' });
    expect(under.verdict).toBe('pass');
  });

  it("a job over its own budget by 11 % fails over budget, by 9 % passes; the other jobs' outcomes stand", async () => {
    const run = async (wallMs: number) =>
      runTier(fixtureManifest([job('timed', { budgetMs: 10_000 }), job('free')]), {
        root: root(),
        out: tree({}),
        mode: 'whole',
        exec: plantedExec({ timed: { wallMs, cpuMs: 1 }, free: { wallMs: 50_000, cpuMs: 1 } }),
        ...readings([100, 100]),
      });
    const over = await run(11_100);
    expect(over.jobs.map((j) => [j.name, j.outcome])).toEqual([
      ['timed', 'over budget'],
      ['free', 'pass'],
    ]);
    expect(over.jobs[0].normalised).toBeCloseTo(11_100, 6);
    expect(over.verdict).toBe('over budget');
    const under = await run(10_900);
    expect(under.jobs[0].outcome).toBe('pass');
    expect(under.verdict).toBe('pass');
  });

  it('the normalisation is the whole run\'s mean calibrate score ÷ the reference score (a runner at 200 against 100 halves the figure)', async () => {
    const r = await runTier(fixtureManifest([job('a')], { budget: { ms: 100_000, cores: 8, projected: false } }), {
      root: root(),
      out: tree({}),
      mode: 'whole',
      exec: plantedExec({ a: { wallMs: 200_000, cpuMs: 1 } }),
      ...readings([198, 202]),
    });
    expect(r.normalisation).toBeCloseTo(2, 10);
    expect(r.normalised).toBeCloseTo(100_000, 6);
    expect(r.budget.verdict).toBe('pass');
  });

  it('a plain run (the receipt) takes no calibrate score: the budget is unjudged, never over, and the verdict rests on the jobs', async () => {
    const r = await runTier(fixtureManifest([job('a')], { budget: { ms: 1, cores: 8, projected: false } }), { root: root(), out: tree({}), exec: plantedExec({ a: { wallMs: 999_999, cpuMs: 1 } }) });
    expect(r.mode).toBe('plain');
    expect(r.normalisation).toBeNull();
    expect(r.budget).toMatchObject({ verdict: 'unjudged', gating: false, figureMs: 999_999 });
    expect(r.verdict).toBe('pass');
    expect(r.calibration).toBeNull();
    expect(r.authority).toBeNull();
  });

  it('with no reference score (null) a timed run is unjudged and contended (C-0075)', async () => {
    const r = await runTier(fixtureManifest([job('a')]), { root: root(), out: tree({}), mode: 'whole', exec: plantedExec(), ...readings([100, 100]), referenceScore: null });
    expect(r.normalisation).toBeNull();
    expect(r.budget.verdict).toBe('unjudged');
    expect(r.authority).toBe('contended');
    expect(r.reasons).toContain('no reference score');
  });

  it('a built-readings run never gates, even when authoritative and over budget (C-0047)', async () => {
    const r = await runTier(fixtureManifest([job('a')], { budget: { ms: 1_000, cores: 8, projected: false } }), { root: root(), out: tree({}), mode: 'whole', exec: plantedExec({ a: { wallMs: 5_000, cpuMs: 1 } }), ...readings([100, 100]) });
    expect(r.authority).toBe('authoritative');
    expect(r.readings).toBe('built');
    expect(r.budget).toMatchObject({ verdict: 'over budget', gating: false });
  });
});

describe('which budget verdict gates (C-0025, C-0027, C-0047, C-0075)', () => {
  it('only a timed, non-projected, measured and authoritative run with a normalised figure gates; each condition alone stops it', () => {
    const ok = { mode: 'batched', projected: false, authority: 'authoritative', readings: 'measured', verdict: 'over budget' } as const;
    expect(budgetGates(ok)).toBe(true);
    expect(budgetGates({ ...ok, mode: 'whole' })).toBe(true);
    expect(budgetGates({ ...ok, verdict: 'pass' })).toBe(true);
    expect(budgetGates({ ...ok, mode: 'plain' })).toBe(false);
    expect(budgetGates({ ...ok, projected: true })).toBe(false);
    expect(budgetGates({ ...ok, authority: 'contended' })).toBe(false);
    expect(budgetGates({ ...ok, authority: null })).toBe(false);
    expect(budgetGates({ ...ok, readings: 'built' })).toBe(false);
    expect(budgetGates({ ...ok, verdict: 'unjudged' })).toBe(false);
  });
});

describe('the projection (C-0027)', () => {
  const plants = { a: { wallMs: 3_000_000, cpuMs: 16_000_000 }, b: { wallMs: 1_000_000, cpuMs: 8_000_000 } };

  it('a 16-core tier is judged on CPU time ÷ 16, marked projected and never gating', async () => {
    const r = await runTier(fixtureManifest([job('a'), job('b')], { tier: 'nightly', budget: { ms: 1_400_000, cores: 16, projected: true } }), {
      root: root(),
      out: tree({}),
      mode: 'whole',
      exec: plantedExec(plants),
      ...readings([100, 100]),
    });
    expect(PROJECTION_CORES).toBe(16);
    expect(r.projected).toBe(true);
    expect(r.cpuMs).toBe(24_000_000);
    expect(r.budget).toMatchObject({ figureMs: 1_500_000, basis: 'cpu ÷ 16', normalisedMs: 1_500_000, verdict: 'pass', gating: false });
    expect(r.budget.reason).toContain('projected');
    // 1.5e6 against 1.35e6 is 11 % over: over budget, projected
    const over = await runTier(fixtureManifest([job('a'), job('b')], { tier: 'nightly', budget: { ms: 1_350_000, cores: 16, projected: true } }), { root: root(), out: tree({}), mode: 'whole', exec: plantedExec(plants), ...readings([100, 100]) });
    expect(over.budget).toMatchObject({ verdict: 'over budget', gating: false });
  });

  it('the PR tier is judged on wall-clock read literally, not projected', async () => {
    const r = await runTier(fixtureManifest([job('a'), job('b')], { budget: { ms: 4_000_000, cores: 8, projected: false } }), { root: root(), out: tree({}), mode: 'whole', exec: plantedExec(plants), ...readings([100, 100]) });
    expect(r.projected).toBe(false);
    expect(r.wallMs).toBe(4_000_000);
    expect(r.budget).toMatchObject({ figureMs: 4_000_000, basis: 'wall-clock', verdict: 'pass' });
  });

  it('a manifest whose cores and projection disagree is refused', () => {
    expect(manifestProblems(fixtureManifest([], { budget: { ms: 1, cores: 16, projected: false } }))).toEqual(['tier pr: a 16-core budget is not projected (C-0027)']);
    expect(manifestProblems(fixtureManifest([], { budget: { ms: 1, cores: 8, projected: true } }))).toEqual(['tier pr: a 8-core budget is projected (C-0027)']);
  });
});

describe('the fallback switch (§13.8: B-CITY-lite 25 seeds, random fuzz 5 × 10³; the constructive set never cut)', () => {
  const jobs = () => [
    job('fuzz', { size: { kind: 'fuzz', n: 10_000 } }),
    job('seeds', { size: { kind: 'seeds', n: 50 } }),
    job('constructive', { size: { kind: 'constructive', n: 10 } }),
    job('small', { size: { kind: 'seeds', n: 10 } }),
    job('plain'),
  ];

  it('applyFallback reduces the fuzz and seed counts to their fallback and never the constructive set; off changes nothing', () => {
    expect(FALLBACK_SIZES).toEqual({ fuzz: 5_000, seeds: 25 });
    const on = applyFallback(jobs(), true);
    expect([...on.sizes]).toEqual([
      ['fuzz', 5_000],
      ['seeds', 25],
      ['constructive', 10],
      ['small', 10],
      ['plain', null],
    ]);
    expect(on.record).toEqual({
      applied: true,
      changed: [
        { job: 'fuzz', kind: 'fuzz', from: 10_000, to: 5_000 },
        { job: 'seeds', kind: 'seeds', from: 50, to: 25 },
      ],
    });
    const off = applyFallback(jobs(), false);
    expect([...off.sizes.values()]).toEqual([10_000, 50, 10, 10, null]);
    expect(off.record).toEqual({ applied: false, changed: [] });
  });

  it('a run with the switch hands each job its reduced size, the constructive job its own, and reports it applied', async () => {
    const calls: Unit[] = [];
    const r = await runTier(fixtureManifest(jobs()), { root: root(), out: tree({}), fallback: true, exec: plantedExec({}, calls) });
    expect(calls.map((u) => u.argv.join(' '))).toEqual(['fixture fuzz 5000', 'fixture seeds 25', 'fixture constructive 10', 'fixture small 10', 'fixture plain']);
    expect(r.jobs.map((j) => j.size)).toEqual([5_000, 25, 10, 10, null]);
    expect(r.fallback.applied).toBe(true);
    const plain: Unit[] = [];
    const r0 = await runTier(fixtureManifest(jobs()), { root: root(), out: tree({}), exec: plantedExec({}, plain) });
    expect(plain.map((u) => u.argv.join(' '))).toEqual(['fixture fuzz 10000', 'fixture seeds 50', 'fixture constructive 10', 'fixture small 10', 'fixture plain']);
    expect(r0.fallback).toEqual({ applied: false, changed: [] });
  });
});

describe('the verdict and the run', () => {
  it('a unit exiting non-zero fails its job and the tier, every other job still runs; sums cover the units run', async () => {
    const calls: Unit[] = [];
    const r = await runTier(fixtureManifest([job('a', { unitNames: ['a1', 'a2'] }), job('b')]), {
      root: root(),
      out: tree({}),
      exec: plantedExec({ a1: { wallMs: 10, cpuMs: 20 }, a2: { wallMs: 30, cpuMs: 40, code: 3 }, b: { wallMs: 50, cpuMs: 60 } }, calls),
    });
    expect(calls.map((u) => u.name)).toEqual(['a1', 'a2', 'b']);
    expect(r.jobs.map((j) => [j.name, j.outcome, j.reason, j.wallMs, j.cpuMs])).toEqual([
      ['a', 'fail', 'unit a2 exit 3', 40, 60],
      ['b', 'pass', null, 50, 60],
    ]);
    expect([r.wallMs, r.cpuMs]).toEqual([90, 120]);
    expect(r.verdict).toBe('fail');
  });

  it('an executor that throws fails that unit (exit 1), never the run', async () => {
    const r = await runTier(fixtureManifest([job('a'), job('b')]), {
      root: root(),
      out: tree({}),
      exec: (u) => (u.name === 'a' ? Promise.reject(new Error('spawn ENOENT')) : Promise.resolve({ code: 0, wallMs: 1, cpuMs: 1 })),
    });
    expect(r.jobs.map((j) => j.outcome)).toEqual(['fail', 'pass']);
  });

  it('a unit that would run a tier or the timing phase inside a tier is refused (C-0088, C-0105)', async () => {
    for (const bad of [['corepack', 'pnpm', 'tier:pr'], ['corepack', 'pnpm', 'bench:timing-phase'], ['corepack', 'pnpm', 'bench', '--', 'timing-phase'], ['corepack', 'pnpm', 'bench', '--', 'tiers', 'pr']]) {
      const calls: Unit[] = [];
      const r = await runTier(fixtureManifest([job('nest', { units: () => [{ name: 'x', argv: bad }] })]), { root: root(), out: tree({}), exec: plantedExec({}, calls) });
      expect(calls).toEqual([]);
      expect(r.jobs[0]).toMatchObject({ outcome: 'fail', reason: 'refused: unit x would run a tier or the timing phase inside a tier (C-0088, C-0105)' });
    }
  });

  it('a not-built job is listed, never run, and the tier is not end to end; with every job built it is', async () => {
    const r = await runTier(fixtureManifest([job('built'), job('later', { source: 'scripts/absent.mjs', item: 'M0-zz-04' })]), { root: root(), out: tree({}), exec: plantedExec() });
    expect(r.notBuilt).toEqual([{ name: 'later', status: 'not-built: M0-zz-04' }]);
    expect(r.endToEnd).toBe(false);
    expect(r.verdict).toBe('pass');
    expect(r.covers).toBe('the sum over the 1 built job(s); not built: later (not-built: M0-zz-04)');
    const all = await runTier(fixtureManifest([job('built')]), { root: root(), out: tree({}), exec: plantedExec() });
    expect(all.endToEnd).toBe(true);
  });

  it('a malformed manifest is refused before anything runs: a repeated name, a path outside plat/, a tier or timing-phase source', async () => {
    const m = fixtureManifest([
      job('a'),
      job('a'),
      job('out', { inputs: ['../research/list.json'] }),
      job('abs', { source: '/usr/bin/env' }),
      job('h', { kind: 'harness', source: 'bench/src/x/y/' }),
      job('t', { kind: 'harness', source: 'bench/src/tiers/' }),
      job('p', { kind: 'harness', source: 'bench/src/timing-phase/' }),
    ]);
    expect(manifestProblems(m)).toEqual([
      'tier pr: job "a" listed twice',
      'job out: "../research/list.json" lies outside plat/ (C-0067)',
      'job abs: "/usr/bin/env" lies outside plat/ (C-0067)',
      'job h: a harness source is a folder bench/src/<folder>/',
      'job t: a tier job never runs a tier or the timing phase (C-0088)',
      'job p: a tier job never runs a tier or the timing phase (C-0088)',
    ]);
    const calls: Unit[] = [];
    await expect(runTier(m, { root: root(), out: tree({}), exec: plantedExec({}, calls) })).rejects.toThrow(/the manifest is malformed/);
    expect(calls).toEqual([]);
  });

  it('a unit log name is one plain file name', () => {
    expect(logName('B-FUZZ (10⁴ per primitive)', 'a/b')).toBe('B-FUZZ_10_per_primitive_--a_b.log');
  });
});
