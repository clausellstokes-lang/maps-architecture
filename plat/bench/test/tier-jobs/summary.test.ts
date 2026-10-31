// M0-f-02b: the numbers-only summary docs/build/summaries/M0-f-02b.json (C-0067) — written by the tier command from a
// REAL run's TierReport, never typed; each tier's section names the run it came from, and a receipt that could not run a
// job whole is PARTIAL with its reason (the session's receipt rule). Driven over FIXTURE trees with a planted executor
// (C-0105); the real summary is the builder's and the checker's runs.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { main, manifestDigest, parseSample, receiptManifest, reportProblems, tierSection, writeSection } from '../../src/tier-jobs/cli.js';
import { manifest, nightlyJobs } from '../../src/tier-jobs/index.js';
import { runTier } from '../../src/tiers/runner.js';
import type { TierReport, Unit } from '../../src/tiers/types.js';
import { builtTree, plantedExec, probe, removeTrees, tree } from './support.js';

// the job lists read @plat/testkit's primitive list (its first import takes seconds on this class of machine)
vi.setConfig({ testTimeout: 60_000 });

afterAll(removeTrees);

const EDGE_FILES = { 'packages/testkit/test/edge/a.test.ts': '// x\n', 'packages/testkit/test/edge/b.test.ts': '// x\n' };

async function nightlyRun(): Promise<{ root: string; report: TierReport; path: string }> {
  const root = builtTree(nightlyJobs(), EDGE_FILES);
  const report = await runTier(manifest('nightly', root), { root, out: tree(), exec: plantedExec([], { 'seeds 11–20': 1 }), probe });
  const path = join(tree(), 'nightly.json');
  writeFileSync(path, `${JSON.stringify(report, null, 2)}\n`);
  return { root, report, path };
}

describe('the section a tier run gives the summary (numbers, names and statuses; the run it came from)', () => {
  it('names the run (its source, time, mode, report sha256 and the manifest digest), the verdict, the counts, every job and the pending and not-built entries', async () => {
    const { report } = await nightlyRun();
    const s = tierSection(report, { source: 'corepack pnpm tier:nightly', reportSha256: 'r'.repeat(64), manifestDigest: 'm'.repeat(64) }, null) as Record<string, any>;
    expect(s.run).toEqual({ source: 'corepack pnpm tier:nightly', at: report.at, mode: 'plain', reportSha256: 'r'.repeat(64), manifestDigest: 'm'.repeat(64) });
    expect([s.receipt, s.partial, s.verdict, s.endToEnd, s.authority]).toEqual(['whole', null, 'fail', false, 'contended']);
    // the planted failing unit name is a block of both spike jobs, so both fail
    expect(s.counts).toEqual({ jobs: 10, run: 8, passed: 6, failed: 2, overBudget: 0, pending: 1, notBuilt: 1 });
    const fusion = s.jobs.find((j: { name: string }) => j.name === 'fusion spike (full seed set)');
    expect(fusion).toEqual({ name: 'fusion spike (full seed set)', item: 'M0-c-06', status: 'built', outcome: 'fail', size: 1000, unitsRun: 100, failedUnits: [{ unit: 'seeds 11–20', code: 1 }], wallMs: 100_000, cpuMs: 200_000 });
    expect(s.pending).toEqual([{ name: 'parity report', status: 'after-M-1: baselines.json', file: 'packages/testkit/baselines/baselines.json' }]);
    expect(s.notBuilt).toEqual([{ name: 'timing-phase (nightly contents)', status: 'not-built: M1' }]);
    expect([s.wallMs, s.cpuMs, s.budget.basis, s.budget.verdict, s.budget.gating, s.budget.ms, s.budget.cores]).toEqual([report.wallMs, report.cpuMs, 'cpu ÷ 16', 'unjudged', false, 14_400_000, 16]);
    // numbers and words only: no prose reason travels into the summary (C-0067)
    expect(JSON.stringify(s)).not.toMatch(/C-0069|absent \(/);
  });

  it('a PARTIAL section names its reason, the sampled jobs and a projection: the finished units\' mean wall-clock × the job\'s units', async () => {
    const { report } = await nightlyRun();
    const sampled = [{ job: 'fusion spike (full seed set)', k: 2, total: 100 }];
    const cut: TierReport = { ...report, jobs: report.jobs.map((j) => (j.name === sampled[0].job ? { ...j, units: [{ ...j.units[0], wallMs: 3_000 }, { ...j.units[1], code: 124, wallMs: 9_000 }] } : j)) };
    const s = tierSection(cut, { source: 'receipt', reportSha256: '', manifestDigest: '' }, { reason: 'the receipt rule', sampled, capMs: 9_000 }) as Record<string, any>;
    expect([s.receipt, s.partial]).toEqual(['PARTIAL', { reason: 'the receipt rule', sampled, unitCapMs: 9_000 }]);
    const f = s.jobs.find((j: { name: string }) => j.name === sampled[0].job);
    expect([f.unitsRun, f.unitsTotal, f.projectedWallMs, f.failedUnits]).toEqual([2, 100, 300_000, [{ unit: 'seeds 11–20', code: 124 }]]);
    expect(s.jobs.find((j: { name: string }) => j.name === 'determinism spike').projectedWallMs).toBeUndefined();
  });

  it('writeSection keeps the other tiers\' sections and reads null for a tier never run', () => {
    const path = join(tree(), 'M0-f-02b.json');
    writeSection(path, 'pr', { a: 1 });
    expect(JSON.parse(readFileSync(path, 'utf8'))).toEqual({ item: 'M0-f-02b', tiers: { pr: { a: 1 }, nightly: null, milestone: null } });
    writeSection(path, 'nightly', { b: 2 });
    writeSection(path, 'pr', { a: 3 });
    expect(JSON.parse(readFileSync(path, 'utf8'))).toEqual({ item: 'M0-f-02b', tiers: { pr: { a: 3 }, nightly: { b: 2 }, milestone: null } });
    writeFileSync(path, 'not json');
    writeSection(path, 'milestone', { c: 4 });
    expect(JSON.parse(readFileSync(path, 'utf8'))).toEqual({ item: 'M0-f-02b', tiers: { pr: null, nightly: null, milestone: { c: 4 } } });
  });
});

describe("a report is refused unless it is this manifest's run (no figure from another job list)", () => {
  it('the same jobs in order and each run job\'s own units pass; a renamed, missing or extra unit or job, or another tier, is named', async () => {
    const { root, report } = await nightlyRun();
    const m = manifest('nightly', root);
    expect(await reportProblems(report, m)).toEqual([]);
    const renamed: TierReport = { ...report, jobs: report.jobs.map((j, i) => (i === 1 ? { ...j, units: j.units.map((u, k) => (k === 0 ? { ...u, unit: 'seeds 0–9' } : u)) } : j)) };
    expect((await reportProblems(renamed, m))[0]).toMatch(/^job fusion spike \(full seed set\): the units run \["seeds 0–9",/);
    const fewer: TierReport = { ...report, jobs: report.jobs.slice(1) };
    expect((await reportProblems(fewer, m))[0]).toMatch(/^the report's jobs \[/);
    expect(await reportProblems({ ...report, tier: 'pr' }, m)).toContain("the report is tier pr's, not nightly's");
    const short: TierReport = { ...report, jobs: report.jobs.map((j, i) => (i === 1 ? { ...j, units: j.units.slice(0, 2) } : j)) };
    expect((await reportProblems(short, m)).length).toBe(1);
    expect(await reportProblems(short, m, [{ job: 'fusion spike (full seed set)', k: 2, total: 100 }])).toEqual([]);
  });

  it('the manifest digest changes with any unit\'s command line or variables, and is stable otherwise', async () => {
    const root = builtTree(nightlyJobs(), EDGE_FILES);
    const m = manifest('nightly', root);
    const d = await manifestDigest(m);
    expect(d).toMatch(/^[0-9a-f]{64}$/);
    expect(await manifestDigest(manifest('nightly', root))).toBe(d);
    const tweak = (f: (u: Unit) => Unit) => ({ ...m, jobs: m.jobs.map((j, i) => (i === 3 ? { ...j, units: async (n: number | null) => (await j.units(n)).map(f) } : j)) });
    expect(await manifestDigest(tweak((u) => ({ ...u, argv: [...u.argv, '--x'] })))).not.toBe(d);
    expect(await manifestDigest(tweak((u) => ({ ...u, env: { A: '1' } })))).not.toBe(d);
    expect(await manifestDigest({ ...m, jobs: m.jobs.slice(1) })).not.toBe(d);
  });
});

describe('the command: `summary` from a real run\'s report, `receipt` a real run (here over a fixture tree, nothing spawned)', () => {
  it('summary writes the tier\'s section from the report and refuses (exit 1, nothing written) a report of another job list', async () => {
    const { root, report, path } = await nightlyRun();
    const summary = join(tree(), 'M0-f-02b.json');
    const lines: string[] = [];
    expect(await main(['summary', '--tier', 'nightly', '--report', path, '--summary', summary], { root, out: tree(), log: (l) => void lines.push(l) })).toBe(0);
    const s = JSON.parse(readFileSync(summary, 'utf8')) as { item: string; tiers: Record<string, any> };
    expect([s.item, s.tiers.pr, s.tiers.milestone, s.tiers.nightly.run.at, s.tiers.nightly.receipt, s.tiers.nightly.run.manifestDigest]).toEqual(['M0-f-02b', null, null, report.at, 'whole', await manifestDigest(manifest('nightly', root))]);
    expect(s.tiers.nightly.run.reportSha256).toMatch(/^[0-9a-f]{64}$/);
    const bad = join(tree(), 'bad.json');
    writeFileSync(bad, JSON.stringify({ ...report, jobs: report.jobs.slice(2) }));
    const other = join(tree(), 'other.json');
    expect(await main(['summary', '--tier', 'nightly', '--report', bad, '--summary', other], { root, out: tree(), log: (l) => void lines.push(l) })).toBe(1);
    expect(lines.at(-1)).toMatch(/^tier-jobs summary: refused: the report's jobs/);
    expect(() => readFileSync(other)).toThrow();
  });

  it('receipt: the sampled job on its first k units, every unit under the cap\'s watch, the PARTIAL section with its projection', async () => {
    const root = builtTree(nightlyJobs(), EDGE_FILES);
    const calls: Unit[] = [];
    const summary = join(tree(), 'M0-f-02b.json');
    const dir = tree();
    const code = await main(['receipt', '--tier', 'nightly', '--sample', 'fusion spike (full seed set)=2,site spike (full seed set)=1', '--unit-cap-ms', '60000', '--out', dir, '--summary', summary], { root, out: tree(), exec: plantedExec(calls), probe, log: () => undefined });
    expect(code).toBe(0);
    const fusionCalls = calls.filter((u) => u.argv.includes('fusion'));
    expect(fusionCalls.map((u) => u.name)).toEqual(['seeds 1–10', 'seeds 11–20']);
    for (const u of calls) expect(u.argv.slice(0, 9)).toEqual(['corepack', 'pnpm', 'exec', 'tsx', '--conditions=plat-source', 'bench/src/tier-jobs/cli.ts', 'watch', '--deadline-ms', '60000']);
    expect(fusionCalls[0].argv.slice(9)).toEqual(['--', 'corepack', 'pnpm', 'bench', '--', 'fusion', '--from', '1', '--seeds', '10']);
    const s = JSON.parse(readFileSync(summary, 'utf8')) as { tiers: Record<string, any> };
    const n = s.tiers.nightly;
    expect([n.receipt, n.partial.unitCapMs, n.partial.sampled]).toEqual(['PARTIAL', 60_000, [{ job: 'fusion spike (full seed set)', k: 2, total: 100 }, { job: 'site spike (full seed set)', k: 1, total: 20 }]]);
    expect(n.partial.reason).toBe('the receipt rule (J319): fusion spike (full seed set) on its first 2 of 100 unit(s); site spike (full seed set) on its first 1 of 20 unit(s); every unit stopped at 60000 ms (exit 124)');
    expect(n.jobs.find((j: { name: string }) => j.name === 'fusion spike (full seed set)')).toMatchObject({ unitsRun: 2, unitsTotal: 100, projectedWallMs: 100_000 });
    expect(JSON.parse(readFileSync(join(dir, 'nightly.json'), 'utf8')).tier).toBe('nightly');
    // a sample naming no job of the tier is refused before anything runs
    const before = calls.length;
    expect(await main(['receipt', '--tier', 'nightly', '--sample', 'nosuch=1', '--out', dir, '--summary', summary], { root, out: tree(), exec: plantedExec(calls), probe, log: () => undefined })).toBe(64);
    expect(calls.length).toBe(before);
  });

  it('a receipt with neither option is whole, its units unwrapped; parseSample reads job=k lists', async () => {
    const root = builtTree(nightlyJobs(), EDGE_FILES);
    const m = manifest('nightly', root);
    const rm = await receiptManifest(m, new Map(), null);
    if (typeof rm === 'string') throw new Error(rm);
    expect(rm.sampled).toEqual([]);
    expect(await rm.manifest.jobs[1].units(1_000)).toEqual(await m.jobs[1].units(1_000));
    expect(parseSample('a b=2,c=10')).toEqual(new Map([['a b', 2], ['c', 10]]));
    for (const bad of ['', 'a', 'a=0', '=2', 'a=2,', 'a=x']) expect(parseSample(bad)).toBeNull();
  });
});
