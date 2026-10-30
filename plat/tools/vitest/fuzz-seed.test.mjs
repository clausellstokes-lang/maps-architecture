// The run seed (Q96, C-0057; fuzz-seed.mjs, fuzz-seed.global.mjs, fast-check.setup.mjs). The pure parts: the line's
// pinned text, the choice (fresh when PLAT_FUZZ_SEED is unset, none when set, a malformed value refused), the hand-in
// rules (a run's own seed, a global seed and a run count kept), and the wrapped module (the same draws as the run seed
// given by hand, every other export the library's own). Then the setup itself in a nested vitest run over two fixture
// files in two workers (fixtures/run-seed/): unset, the line is printed once and both files draw from its seed while
// fast-check's global configuration keeps none; re-run with PLAT_FUZZ_SEED set to that seed, nothing is printed and
// every unseeded run draws the same cases; a property's own seed draws the same in every run.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as realFastCheck from 'fast-check';
import fc from 'fast-check';
import { afterEach, describe, expect, it } from 'vitest';
import { RUN_SEED_KEY, chooseRunSeed, freshSeed, fuzzSeed, seedLine, seededFastCheck, withRunSeed } from './fuzz-seed.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const PLAT = join(here, '..', '..');
const dirs = [];
afterEach(() => {
  while (dirs.length) rmSync(dirs.pop(), { recursive: true, force: true });
});

describe('the run seed\'s parts (Q96)', () => {
  it('prints one pinned line naming the seed and its replay', () => {
    expect(seedLine(-1863295922)).toBe(
      'fast-check: PLAT_FUZZ_SEED is unset; this run\'s seed is -1863295922 — every property without a seed of its own draws ' +
        'from it, and a re-run with PLAT_FUZZ_SEED=-1863295922 draws the same cases (Q96, C-0057)',
    );
    expect(RUN_SEED_KEY).toBe('platFuzzRunSeed');
  });

  it('chooses a fresh 32-bit seed only when PLAT_FUZZ_SEED is unset, and refuses a malformed one as the setup does', () => {
    expect(chooseRunSeed({}, () => 42)).toEqual({ seed: 42, line: seedLine(42) });
    expect(chooseRunSeed({ PLAT_FUZZ_SEED: '' }, () => 2 ** 32 + 5)).toEqual({ seed: 5, line: seedLine(5) });
    expect(chooseRunSeed({ PLAT_FUZZ_SEED: '1595' }, () => 42)).toEqual({ seed: undefined, line: null });
    expect(() => chooseRunSeed({ PLAT_FUZZ_SEED: '1e4' })).toThrow('PLAT_FUZZ_SEED must be an integer, got "1e4"');
    expect([fuzzSeed({}), fuzzSeed({ PLAT_FUZZ_SEED: '-7' }), fuzzSeed({ PLAT_FUZZ_SEED: '4294967297' })]).toEqual([undefined, -7, 1]);
    for (let i = 0; i < 64; i += 1) {
      const s = freshSeed();
      expect(s | 0).toBe(s);
      expect(fuzzSeed({ PLAT_FUZZ_SEED: String(s) })).toBe(s); // the printed seed reads back unchanged
    }
  });

  it('hands the run seed only to a run with no seed of its own and none in the global configuration', () => {
    expect(withRunSeed(undefined, 9)).toEqual({ seed: 9 });
    expect(withRunSeed({ numRuns: 3 }, 9)).toEqual({ numRuns: 3, seed: 9 });
    expect(withRunSeed(4, 9)).toEqual({ numRuns: 4, seed: 9 });
    const own = { numRuns: 3, seed: 7 };
    expect(withRunSeed(own, 9)).toBe(own);
    expect(withRunSeed(own, 9, { seed: 1 })).toBe(own);
    expect(withRunSeed({ numRuns: 3 }, 9, { numRuns: 10, seed: 1595 })).toEqual({ numRuns: 3 });
    expect(withRunSeed(4, 9, { seed: 1595 })).toBe(4);
  });

  it('the wrapped module draws as the run seed given by hand, keeps every other export and leaves the global seed unset', () => {
    const w = seededFastCheck(realFastCheck, 1234);
    const byHand = (n) => fc.sample(fc.integer(), { numRuns: n, seed: 1234 });
    expect(fc.readConfigureGlobal().seed).toBe(undefined); // the tools project loads no fast-check setup
    expect(w.default.sample(fc.integer(), 6)).toEqual(byHand(6));
    expect(w.sample(fc.integer(), { numRuns: 6 })).toEqual(byHand(6));
    expect(w.default.sample(fc.integer(), { numRuns: 3, seed: 7 })).toEqual(fc.sample(fc.integer(), { numRuns: 3, seed: 7 }));
    const drawn = [];
    w.default.assert(fc.property(fc.integer(), (n) => void drawn.push(n)), { numRuns: 6 });
    expect(drawn).toEqual(byHand(6));
    expect(w.default.check(fc.property(fc.integer(), (n) => n !== byHand(1)[0]), { numRuns: 1 }).seed).toBe(1234);
    const stats = (run, params) => {
      const logged = [];
      run(fc.integer({ min: 0, max: 9 }), (n) => `d${String(n)}`, { ...params, logger: (v) => logged.push(v) });
      return logged;
    };
    expect(stats(w.default.statistics, { numRuns: 50 })).toEqual(stats(fc.statistics, { numRuns: 50, seed: 1234 }));
    for (const k of Object.keys(realFastCheck)) {
      if (!['assert', 'check', 'sample', 'statistics', 'default'].includes(k)) expect(w[k], k).toBe(realFastCheck[k]);
    }
    expect(w.default.readConfigureGlobal).toBe(fc.readConfigureGlobal);
    expect(w.default.integer).toBe(fc.integer);
    expect(fc.readConfigureGlobal().seed).toBe(undefined);
  });
});

describe('the workspace\'s vitest configuration loads the run seed (Q96)', () => {
  it('runs fuzz-seed.global.mjs once per run, and every package project loads fast-check.setup.mjs', async () => {
    const { default: config } = await import('../../vitest.config.ts');
    expect(config.test.globalSetup).toEqual([join(here, 'fuzz-seed.global.mjs')]);
    const packages = config.test.projects.filter((p) => p.test.name !== 'tools');
    expect(packages.length).toBeGreaterThan(6);
    for (const p of packages) expect(p.test.setupFiles, p.test.name).toContain(join(here, 'fast-check.setup.mjs'));
  });
});

/** One nested vitest run over fixtures/run-seed/ with PLAT_FUZZ_SEED as given: its stderr and each file's draws. */
function nestedRun(seed) {
  const out = mkdtempSync(join(tmpdir(), 'plat-run-seed-'));
  dirs.push(out);
  const env = { PATH: process.env.PATH, HOME: process.env.HOME, PLAT_SEED_FIXTURE_OUT: out, ...(seed === undefined ? {} : { PLAT_FUZZ_SEED: String(seed) }) };
  const r = spawnSync(process.execPath, [join(PLAT, 'node_modules', 'vitest', 'vitest.mjs'), 'run', '--config', join(here, 'fixtures', 'run-seed', 'vitest.config.mjs')], {
    cwd: PLAT,
    env,
    encoding: 'utf8',
    timeout: 120_000,
  });
  expect(r.status, `${r.stdout}\n${r.stderr}`).toBe(0);
  const files = Object.fromEntries(['a', 'b'].map((n) => [n, JSON.parse(readFileSync(join(out, `${n}.json`), 'utf8'))]));
  return { lines: r.stderr.split('\n').filter((l) => l.startsWith('fast-check:')), files };
}

describe('the setup\'s seed handling in a vitest run (Q96)', () => {
  it('prints the chosen seed once per run, and a re-run with PLAT_FUZZ_SEED set to it draws the same cases', { timeout: 300_000 }, () => {
    const first = nestedRun(undefined);
    expect(first.lines).toHaveLength(1);
    const m = /this run's seed is (-?\d+) /.exec(first.lines[0]);
    expect(m).not.toBe(null);
    const seed = Number(m[1]);
    expect(first.lines[0]).toBe(seedLine(seed));
    const own = fc.sample(fc.nat(), { numRuns: 3, seed: 7 });
    for (const n of ['a', 'b']) {
      expect(first.files[n], n).toEqual({
        asserted: fc.sample(fc.integer(), { numRuns: 5, seed }),
        sampled: fc.sample(fc.nat(), { numRuns: 4, seed }),
        own,
        globalSeed: null, // the global configuration keeps no seed: fuzzParams and replaySeed read an unseeded run
        library: false, // the runners are wrapped
      });
    }
    const replay = nestedRun(seed);
    expect(replay.lines).toEqual([]);
    // Under a set seed fast-check is the library itself: no suite draws other cases than before.
    for (const n of ['a', 'b']) expect(replay.files[n], n).toEqual({ ...first.files[n], globalSeed: seed, library: true });
  });
});
