// M0-f-02a: the executor (a unit's wall-clock and its processes' CPU time; C-0241 (5), (6)) on trivial commands — never
// a tier script (C-0105) — and the command entry's arguments: `--list` derives the statuses and runs nothing; a bad tier
// or argument exits 64; over a FIXTURE tree and manifest injected through the entry's ctx (N-1, C-0398) `--fallback`,
// `--mode` and the exit codes (a failing job, a gating and a non-gating over-budget verdict) reach the runner.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { CLEARED_ENV, parseTimes, spawnExecutor, unitEnv } from '../../src/tiers/exec.js';
import { run } from '../../src/tiers/index.js';
import { runTier } from '../../src/tiers/runner.js';
import type { Job, TierManifest, TierReport, Unit } from '../../src/tiers/types.js';
import { fixtureManifest, job, plantedExec, readings, removeTrees, tree, type Planted } from './fixture.js';

const out = mkdtempSync(join(tmpdir(), 'plat-tiers-exec-'));
afterAll(() => {
  rmSync(out, { recursive: true, force: true });
  removeTrees();
});
afterEach(() => vi.unstubAllEnvs());

describe('parseTimes (the shell builtin `times`)', () => {
  it("reads the children's user and system time from the second line (bash and dash forms)", () => {
    expect(parseTimes('0m0.004s 0m0.000s\n0m1.250s 0m0.500s\n')).toBe(1_750);
    expect(parseTimes('0m0.000000s 0m0.004000s\n1m2.500000s 0m0.250000s')).toBe(62_750);
    expect(parseTimes('0m0.004s 0m0.000s')).toBeNull();
    expect(parseTimes('')).toBeNull();
  });
});

describe('spawnExecutor', () => {
  it("measures a busy child's CPU time and wall-clock, passes its exit code, and reports its pid", async () => {
    const pids: number[] = [];
    const busy = "const e = Date.now() + 300; let x = 0; while (Date.now() < e) x++; console.log('done', x > 0);";
    const r = await spawnExecutor({ name: 'busy', argv: [process.execPath, '-e', busy] }, { root: process.cwd(), out, onSpawn: (p) => pids.push(p) });
    expect(r.code).toBe(0);
    expect(r.wallMs).toBeGreaterThanOrEqual(300);
    expect(r.cpuMs).toBeGreaterThanOrEqual(150);
    expect(r.output).toContain('done true');
    expect(pids.length).toBe(1);
    const failed = await spawnExecutor({ name: 'three', argv: [process.execPath, '-e', 'process.exit(3)'] }, { root: process.cwd(), out });
    expect(failed.code).toBe(3);
  }, 30_000);

  it('runs from the given root, clears the tier sizes from the environment and applies the unit\'s own', async () => {
    vi.stubEnv('PLAT_FUZZ_RUNS', '7');
    vi.stubEnv('PLAT_EDGE_SEEDS', '3');
    const show = "console.log(process.cwd(), process.env.PLAT_FUZZ_RUNS ?? 'unset', process.env.PLAT_EDGE_SEEDS ?? 'unset', process.env.PLAT_BENCH_OUT)";
    const r = await spawnExecutor({ name: 'env', argv: [process.execPath, '-e', show], env: { PLAT_EDGE_SEEDS: '1000' } }, { root: out, out });
    expect(r.output?.trim()).toBe(`${out} unset 1000 ${join(out, 'jobs')}`);
    expect(CLEARED_ENV).toEqual(['PLAT_FUZZ_RUNS', 'PLAT_FUZZ_SEED', 'PLAT_EDGE_SEEDS', 'PLAT_BENCH_FIXTURE_ROOT']);
    expect(unitEnv({ name: 'u', argv: ['x'] }, out, { PLAT_FUZZ_SEED: '1', PATH: '/bin' })).toEqual({ PATH: '/bin', PLAT_BENCH_OUT: join(out, 'jobs') });
  }, 30_000);

  it('an argument is passed as one word (no shell splitting) and a missing program fails its unit', async () => {
    const r = await spawnExecutor({ name: 'words', argv: [process.execPath, '-e', 'console.log(JSON.stringify(process.argv.slice(1)))', 'a b', '$HOME', ';ls'] }, { root: out, out });
    expect(JSON.parse(r.output?.trim() ?? '')).toEqual(['a b', '$HOME', ';ls']);
    const missing = await spawnExecutor({ name: 'missing', argv: ['plat-no-such-program-zz'] }, { root: out, out });
    expect(missing.code).toBe(127);
  }, 30_000);
});

describe('the command entry (tier:pr | tier:nightly | tier:milestone)', () => {
  it('a bad tier or argument exits 64; --list derives the statuses and runs nothing', async () => {
    const said: string[] = [];
    const spy = vi.spyOn(process.stdout, 'write').mockImplementation((s: string | Uint8Array) => {
      said.push(String(s));
      return true;
    });
    try {
      expect(await run(['weekly'], { out })).toBe(64);
      expect(await run(['pr', '--mode', 'fast'], { out })).toBe(64);
      expect(await run(['pr', '--nope'], { out })).toBe(64);
      said.length = 0;
      expect(await run(['nightly', '--list'], { out })).toBe(0);
    } finally {
      spy.mockRestore();
    }
    expect(said.length).toBe(10);
    expect(said[9]).toBe('tier nightly: timing-phase (nightly contents) — not-built: M1 (M1; command bench/src/tier-jobs/nightly-timing-phase.ts)\n');
  }, 60_000);
});

/** Runs the entry with stdout captured: its exit code, its printed lines and the TierReport it wrote (null for --list). */
async function entry(args: string[], ctx: Parameters<typeof run>[1]): Promise<{ code: number; said: string[]; report: TierReport | null }> {
  const said: string[] = [];
  const spy = vi.spyOn(process.stdout, 'write').mockImplementation((s: string | Uint8Array) => {
    said.push(String(s));
    return true;
  });
  let code: number;
  try {
    code = await run(args, ctx);
  } finally {
    spy.mockRestore();
  }
  let report: TierReport | null = null;
  try {
    report = JSON.parse(readFileSync(join(ctx.out, 'tiers', `${args[0]}.json`), 'utf8')) as TierReport;
  } catch {
    report = null;
  }
  return { code, said, report };
}

describe('the command entry over a FIXTURE manifest (N-1; C-0105: never a real tier)', () => {
  const fixture = (jobs: Job[], extra: Partial<TierManifest> = {}): { root: string; manifest: () => TierManifest } => ({
    root: tree({ 'scripts/ok.mjs': '' }),
    manifest: () => fixtureManifest(jobs, extra),
  });

  it('exit 0 when the tier passes, 1 when a built job fails; pending and not-built jobs are neither; --list derives over the injected tree and runs nothing', async () => {
    const calls: Unit[] = [];
    const jobs = [job('a'), job('later', { source: 'scripts/absent.mjs', item: 'M0-zz-04' })];
    const pass = await entry(['pr'], { out: tree({}), ...fixture(jobs), options: { exec: plantedExec({}, calls) } });
    expect(pass.code).toBe(0);
    expect(pass.report).toMatchObject({ tier: 'pr', mode: 'plain', verdict: 'pass', endToEnd: false, fallback: { applied: false, changed: [] } });
    expect(calls.map((u) => u.name)).toEqual(['a']);
    expect(pass.said.at(-1)).toMatch(/^tier pr: verdict PASS; report /);
    const fail = await entry(['pr'], { out: tree({}), ...fixture(jobs), options: { exec: plantedExec({ a: { wallMs: 1, cpuMs: 1, code: 3 } }) } });
    expect(fail.code).toBe(1);
    expect(fail.report?.verdict).toBe('fail');
    expect(fail.report?.jobs[0]).toMatchObject({ name: 'a', outcome: 'fail', reason: 'unit a exit 3' });
    calls.length = 0;
    const list = await entry(['pr', '--list'], { out: tree({}), ...fixture(jobs), options: { exec: plantedExec({}, calls) } });
    expect(list.code).toBe(0);
    expect(list.said).toEqual(['tier pr: a — built (M0-zz-09; command scripts/ok.mjs)\n', 'tier pr: later — not-built: M0-zz-04 (M0-zz-04; command scripts/absent.mjs)\n']);
    expect(calls).toEqual([]);
    expect(list.report).toBeNull();
  });

  it('--fallback reaches the runner: fuzz 10 000 → 5 000, the constructive size never cut; without it nothing changes', async () => {
    const jobs = [job('fz', { size: { kind: 'fuzz', n: 10_000 } }), job('cons', { size: { kind: 'constructive', n: 10 } })];
    for (const on of [false, true]) {
      const calls: Unit[] = [];
      const r = await entry(on ? ['pr', '--fallback'] : ['pr'], { out: tree({}), ...fixture(jobs), options: { exec: plantedExec({}, calls) } });
      expect(r.code).toBe(0);
      expect(calls.map((u) => u.argv.at(-1))).toEqual([on ? '5000' : '10000', '10']);
      expect(r.report?.fallback).toEqual(on ? { applied: true, changed: [{ job: 'fz', kind: 'fuzz', from: 10_000, to: 5_000 }] } : { applied: false, changed: [] });
      expect(r.report?.jobs.map((j) => j.size)).toEqual([on ? 5_000 : 10_000, 10]);
      expect(r.said.some((l) => l === 'tier pr: fallback applied: fz fuzz 10000 → 5000\n')).toBe(on);
    }
  });

  it('--mode reaches the runner: plain by default (no calibrate), whole (one run, two scores), batched (one batch per unit, two scores each)', async () => {
    const jobs = [job('a', { unitNames: ['a1', 'a2'] })];
    const scored = async (args: string[]) => {
      const calls: number[] = [];
      const r = await entry(args, { out: tree({}), ...fixture(jobs), options: { exec: plantedExec(), ...readings([100, 102], { calls }) } });
      expect(r.code).toBe(0);
      return { report: r.report as TierReport, calls };
    };
    const plain = await scored(['pr']);
    expect([plain.report.mode, plain.report.calibration, plain.report.batches.length, plain.report.readings, plain.calls]).toEqual(['plain', null, 0, null, []]);
    const whole = await scored(['pr', '--mode', 'whole']);
    expect([whole.report.mode, whole.report.calibration?.before, whole.report.calibration?.after, whole.report.batches.length, whole.report.readings]).toEqual(['whole', 100, 102, 0, 'built']);
    expect(whole.calls).toEqual([100, 102]);
    const batched = await scored(['pr', '--fallback', '--mode', 'batched']);
    expect(batched.report.mode).toBe('batched');
    expect(batched.report.fallback.applied).toBe(true);
    expect(batched.report.batches.map((b) => [b.unit, b.calibration.before, b.calibration.after])).toEqual([
      ['a1', 100, 102],
      ['a2', 100, 102],
    ]);
    expect(batched.report.calibration).toBeNull();
  });

  it('an over-budget verdict exits 1 only when it gates (C-0047): a built-readings run over budget exits 0; the same verdict gating exits 1; a gating pass exits 0', async () => {
    const budget = { budget: { ms: 100_000, cores: 8 as const, projected: false } };
    const at = (wallMs: number): Record<string, Planted> => ({ a: { wallMs, cpuMs: 1 } });
    const gating: typeof runTier = async (m, o) => {
      const r = await runTier(m, o);
      return { ...r, budget: { ...r.budget, gating: true } };
    };
    const over = await entry(['pr', '--mode', 'whole'], { out: tree({}), ...fixture([job('a')], budget), options: { exec: plantedExec(at(111_000)), ...readings([100, 100]) } });
    expect(over.report?.verdict).toBe('over budget');
    expect(over.report?.budget.gating).toBe(false);
    expect(over.code).toBe(0);
    const overGating = await entry(['pr', '--mode', 'whole'], { out: tree({}), ...fixture([job('a')], budget), options: { exec: plantedExec(at(111_000)), ...readings([100, 100]) }, runTier: gating });
    expect([overGating.report?.verdict, overGating.report?.budget.gating, overGating.code]).toEqual(['over budget', true, 1]);
    const passGating = await entry(['pr', '--mode', 'whole'], { out: tree({}), ...fixture([job('a')], budget), options: { exec: plantedExec(at(109_000)), ...readings([100, 100]) }, runTier: gating });
    expect([passGating.report?.verdict, passGating.report?.budget.gating, passGating.code]).toEqual(['pass', true, 0]);
  });
});
