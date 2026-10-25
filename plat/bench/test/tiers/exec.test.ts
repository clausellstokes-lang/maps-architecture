// M0-f-02a: the executor (a unit's wall-clock and its processes' CPU time; C-0241 (5), (6)) on trivial commands — never
// a tier script (C-0105) — and the command entry's arguments: `--list` derives the statuses and runs nothing; a bad tier
// or argument exits 64.
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { CLEARED_ENV, parseTimes, spawnExecutor, unitEnv } from '../../src/tiers/exec.js';
import { run } from '../../src/tiers/index.js';

const out = mkdtempSync(join(tmpdir(), 'plat-tiers-exec-'));
afterAll(() => rmSync(out, { recursive: true, force: true }));
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
