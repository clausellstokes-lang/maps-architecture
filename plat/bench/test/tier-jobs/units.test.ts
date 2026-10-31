// M0-f-02b: each filled job's units — its command line read, never run (C-0105) — at the design's sizes (J238: no job
// cut, no size narrowed), partitioned as C-0097 names, each argument list one the harness's own parser accepts with
// the sizes it states; the fallback switch (§13.8) on the PR stand-ins; the edge suite's nightly form (C-0100); the
// routed rows of the x-05 notes (row 5) and the x-06 notes (row 10). The readings: C-0447.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { EDGE_SEEDS_NIGHTLY, FUZZ_PRIMITIVES } from '@plat/testkit';
import { describe, expect, it, vi } from 'vitest';
import { parseArgs as parseBentcut, DEFAULT_SIZES as BENTCUT_SIZES } from '../../src/bentcut/index.js';
import { parseCrossHostArgs } from '../../src/crosshost/index.js';
import { parseDeterminismArgs } from '../../src/determinism/index.js';
import { DEFAULT_SEEDS as FUSION_DEFAULT, parseArgs as parseFusion } from '../../src/fusion/index.js';
import { DEFAULT_SEEDS as SITE_DEFAULT, parseSiteArgs } from '../../src/site/index.js';
import {
  EDGE_DEADLINE_MS,
  EDGE_FOLDER,
  EDGE_HANG_MS,
  EDGE_NIGHTLY_SEEDS,
  edgeFiles,
  edgeUnits,
  edgeVitest,
  FCUT_FACES,
  FUSION_SEEDS,
  LADDER_SUMMARY,
  milestoneJobs,
  NIGHTLY_FUZZ_RUNS,
  nightlyJobs,
  PR_SEEDS,
  prJobs,
  SEED_BLOCK,
  seedBlocks,
  SITE_SEEDS,
  TIER_CLI,
} from '../../src/tier-jobs/index.js';
import { PLAT_ROOT } from '../../src/tiers/index.js';
import { applyFallback } from '../../src/tiers/runner.js';
import type { Job } from '../../src/tiers/types.js';
import { harnessArgs, tree, unitsAt } from './support.js';

// the job lists read @plat/testkit's primitive list (its first import takes seconds on this class of machine)
vi.setConfig({ testTimeout: 60_000 });

const pr = (name: string): Job => prJobs(PLAT_ROOT).find((j) => j.name === name) as Job;
const night = (name: string): Job => nightlyJobs().find((j) => j.name === name) as Job;
const tierCmd = ['corepack', 'pnpm', 'exec', 'tsx', '--conditions=plat-source', 'bench/src/tier-jobs/cli.ts'];

describe('seed blocks (C-0097: the spike stand-ins per 10-seed block)', () => {
  it('n seeds from first in blocks of 10, the last the remainder; none for n < 1', () => {
    expect(SEED_BLOCK).toBe(10);
    expect(seedBlocks(1, 50)).toEqual([1, 11, 21, 31, 41].map((from) => ({ from, count: 10 })));
    expect(seedBlocks(1, 25)).toEqual([{ from: 1, count: 10 }, { from: 11, count: 10 }, { from: 21, count: 5 }]);
    expect(seedBlocks(7, 1)).toEqual([{ from: 7, count: 1 }]);
    expect(seedBlocks(1, 11)).toEqual([{ from: 1, count: 10 }, { from: 11, count: 1 }]);
    expect(seedBlocks(1, 0)).toEqual([]);
    expect(seedBlocks(1, 9).map((b) => b.count)).toEqual([9]);
  });
});

describe("the PR tier's B-CITY-lite stand-ins, filled (C-0015: the fusion and site harnesses at 50 seeds)", () => {
  it('fusion: 5 blocks of seeds 1–50, each a run of the gate harness the harness parses as those seeds, both runs, CITY', async () => {
    const j = pr('B-CITY-lite stand-in: fusion spike');
    expect([j.stagedTo, j.size, j.suites]).toEqual([undefined, { kind: 'seeds', n: 50 }, [{ kind: 'fixtures', path: 'packages/layout/src/fixtures/flat.ts' }]]);
    expect(PR_SEEDS).toBe(50);
    const us = await unitsAt(j);
    expect(us.map((u) => u.name)).toEqual(['seeds 1–10', 'seeds 11–20', 'seeds 21–30', 'seeds 31–40', 'seeds 41–50']);
    const covered: number[] = [];
    for (const u of us) {
      expect(u.argv.slice(0, 5)).toEqual(['corepack', 'pnpm', 'bench', '--', 'fusion']);
      const a = parseFusion(harnessArgs(u, 'fusion'), {});
      if (typeof a === 'string') throw new Error(a);
      expect([a.sizes.runs, a.sizes.frameHa, a.summary, a.timing]).toEqual([['fusion', 'integrated'], null, false, null]);
      for (let s = a.sizes.from; s < a.sizes.from + a.sizes.seeds; s += 1) covered.push(s);
    }
    expect(covered).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
  });

  it('site: 5 blocks of seeds 1–50, both fixtures and both configurations at CITY, no summary written', async () => {
    const j = pr('B-CITY-lite stand-in: site spike');
    expect([j.stagedTo, j.size, j.suites]).toEqual([undefined, { kind: 'seeds', n: 50 }, [{ kind: 'fixtures', path: 'bench/src/site/fixtures.ts' }]]);
    const covered: number[] = [];
    for (const u of await unitsAt(j)) {
      const a = parseSiteArgs(harnessArgs(u, 'site'), {});
      if (typeof a === 'string') throw new Error(a);
      expect([a.fixtures, a.configs, a.size, a.summary, a.timing]).toEqual([['relief-60', 'relief-3000'], ['default', 'coarse'], 'city', false, false]);
      for (let s = a.first; s < a.first + a.seeds; s += 1) covered.push(s);
    }
    expect(covered).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
  });

  it('the fallback switch: the stand-ins at 25 seeds in blocks 1–10, 11–20, 21–25, B-FUZZ at 5 × 10³, the constructive set never cut', async () => {
    const jobs = prJobs(PLAT_ROOT);
    const { sizes, record } = applyFallback(jobs, true);
    expect(record.changed.map((c) => [c.job, c.from, c.to])).toEqual([
      ['B-FUZZ (10⁴ per primitive and the constructive set)', 10_000, 5_000],
      ['B-CITY-lite stand-in: fusion spike', 50, 25],
      ['B-CITY-lite stand-in: site spike', 50, 25],
    ]);
    const f = pr('B-CITY-lite stand-in: fusion spike');
    expect((await unitsAt(f, sizes.get(f.name) ?? null)).map((u) => harnessArgs(u, 'fusion'))).toEqual([
      ['--from', '1', '--seeds', '10'],
      ['--from', '11', '--seeds', '10'],
      ['--from', '21', '--seeds', '5'],
    ]);
    const s = pr('B-CITY-lite stand-in: site spike');
    expect((await unitsAt(s, sizes.get(s.name) ?? null)).map((u) => harnessArgs(u, 'site'))).toEqual([
      ['--first', '1', '--seeds', '10'],
      ['--first', '11', '--seeds', '10'],
      ['--first', '21', '--seeds', '5'],
    ]);
  });
});

describe('the nightly jobs at their full sizes (§13.8; §16 M0 (a), (b), (c), (d), (e); J238)', () => {
  it('B-FUZZ at 10⁶ per primitive: one unit per kernel primitive and the constructive set, no summary written into plat/', async () => {
    const j = night('B-FUZZ (10⁶ per primitive)');
    expect([j.size, NIGHTLY_FUZZ_RUNS, j.stagedTo]).toEqual([{ kind: 'fuzz', n: 1_000_000 }, 1_000_000, undefined]);
    const us = await unitsAt(j);
    expect(us.map((u) => u.name)).toEqual([...FUZZ_PRIMITIVES.map((p) => p.name), 'constructive set']);
    for (const u of us.slice(0, -1)) expect(harnessArgs(u, 'fuzz-bar')).toEqual(['--primitive', u.name, '--runs', '1000000', '--constructive-seeds', '10', '--no-summary']);
    expect(harnessArgs(us[us.length - 1], 'fuzz-bar')).toEqual(['--runs', '1', '--constructive-seeds', '10', '--no-summary']);
  });

  it("the spike harnesses at their full seed sets: fusion 1 000 (its bar), site 200 (its harness's default), in 10-seed blocks covering every seed once", async () => {
    expect([FUSION_SEEDS, SITE_SEEDS]).toEqual([FUSION_DEFAULT, SITE_DEFAULT]);
    expect([FUSION_SEEDS, SITE_SEEDS]).toEqual([1_000, 200]);
    const f = night('fusion spike (full seed set)');
    const fu = await unitsAt(f);
    expect([f.size, fu.length]).toEqual([{ kind: 'seeds', n: 1_000 }, 100]);
    const fs: number[] = [];
    for (const u of fu) {
      const a = parseFusion(harnessArgs(u, 'fusion'), {});
      if (typeof a === 'string') throw new Error(a);
      for (let s = a.sizes.from; s < a.sizes.from + a.sizes.seeds; s += 1) fs.push(s);
    }
    expect(fs).toEqual(Array.from({ length: 1_000 }, (_, i) => i + 1));
    const s = night('site spike (full seed set)');
    const su = await unitsAt(s);
    expect([s.size, su.length]).toEqual([{ kind: 'seeds', n: 200 }, 20]);
    const ss: number[] = [];
    for (const u of su) {
      const a = parseSiteArgs(harnessArgs(u, 'site'), {});
      if (typeof a === 'string') throw new Error(a);
      for (let x = a.first; x < a.first + a.seeds; x += 1) ss.push(x);
    }
    expect(ss).toEqual(Array.from({ length: 200 }, (_, i) => i + 1));
  });

  it("the bent cut nightly: the residue, the signature and T34-1's mean at their bar sizes; the milestone's F-CUT on 10⁵ faces", async () => {
    const [u] = await unitsAt(night('bent-cut F-CUT harness'));
    const a = parseBentcut(harnessArgs(u, 'bentcut'), {});
    if (typeof a === 'string') throw new Error(a);
    expect([a.phases, a.sizes, a.summary]).toEqual([['residue', 'signature', 't34'], BENTCUT_SIZES, false]);
    expect([BENTCUT_SIZES.districts, BENTCUT_SIZES.signature, BENTCUT_SIZES.t34]).toEqual([1_000, 100, 10_000]);
    const fcut = milestoneJobs().find((j) => j.name === 'F-CUT (10⁵ faces)') as Job;
    const [v] = await unitsAt(fcut);
    const b = parseBentcut(harnessArgs(v, 'bentcut'), {});
    if (typeof b === 'string') throw new Error(b);
    expect([b.phases, b.sizes.fcut, FCUT_FACES, b.summary]).toEqual([['fcut'], 100_000, 100_000, false]);
    expect([fcut.kind, fcut.source, fcut.item]).toEqual(['harness', 'bench/src/bentcut/', 'M0-b-04']);
  });

  it('the cross-host run (all five legs, workers off and on) and the determinism spike (its bar run) through the tier command, summaries redirected', async () => {
    const [c] = await unitsAt(night('cross-host run'));
    expect(c.argv.slice(0, 7)).toEqual([...tierCmd, 'harness']);
    const ca = parseCrossHostArgs(harnessArgs(c, 'crosshost'));
    expect(ca).toEqual({ ok: true, fixture: 'kernel', timing: false, legs: ['node-arm64', 'node-x64-rosetta', 'chromium', 'firefox', 'webkit'], workers: ['off', 'on'] });
    const [d] = await unitsAt(night('determinism spike'));
    expect(d.argv.slice(0, 7)).toEqual([...tierCmd, 'harness']);
    const da = parseDeterminismArgs(harnessArgs(d, 'determinism'));
    if (!da.ok) throw new Error(da.message);
    expect([da.config.seeds.length, da.config.seeds[0], da.config.size, da.config.legs.length, da.config.workers]).toEqual([100, 1, 'city', 5, ['off', 'on']]);
    expect(TIER_CLI).toBe('bench/src/tier-jobs/cli.ts');
  });

  it("the ladder-coverage bench: its whole run, then its committed summary reproduced byte for byte by a second process (the x-05 notes' row 5)", async () => {
    const j = night('ladder-coverage bench');
    expect(j.suites).toEqual([{ kind: 'baseline', path: LADDER_SUMMARY }]);
    expect(LADDER_SUMMARY).toBe('docs/build/summaries/M0-x-05.json');
    const us = await unitsAt(j);
    expect(us.map((u) => u.argv)).toEqual([
      [...tierCmd, 'harness', 'ladder-coverage'],
      [...tierCmd, 'same-summary', 'M0-x-05'],
    ]);
  });
});

describe("the edge suite's nightly form (B-EDGE at 1 000 seeds, C-0100; the x-06 notes' row 10)", () => {
  it('each test file of testkit/test/edge is one unit: a vitest invocation of the testkit project on that file, PLAT_EDGE_SEEDS=1000, under the watch', async () => {
    expect(EDGE_NIGHTLY_SEEDS).toBe(EDGE_SEEDS_NIGHTLY);
    const j = night('edge-suite (1 000 seeds)');
    expect([j.kind, j.source, j.item, EDGE_FOLDER]).toEqual(['vitest', 'packages/testkit/test/edge/', 'M0-x-06', 'packages/testkit/test/edge/']);
    const us = await unitsAt(j);
    const files = edgeFiles(PLAT_ROOT);
    expect(files.length).toBeGreaterThan(10);
    expect(us.map((u) => u.name)).toEqual([...files, 'hang attribution (post-hoc)']);
    for (const [i, f] of files.entries()) {
      const u = us[i];
      expect(u.env).toEqual({ PLAT_EDGE_SEEDS: '1000' });
      expect(u.argv).toEqual([...tierCmd, 'edge', '--deadline-ms', String(EDGE_DEADLINE_MS), '--', 'corepack', 'pnpm', 'exec', 'vitest', 'run', '--project', 'testkit', `packages/testkit/test/edge/${f}`]);
      expect(u.argv.slice(u.argv.indexOf('--') + 1)).toEqual(edgeVitest(f));
    }
    expect(us.at(-1)).toEqual({ name: 'hang attribution (post-hoc)', argv: [...tierCmd, 'edge-hangs', '--hang-ms', '120000'], env: { PLAT_EDGE_SEEDS: '1000' } });
    expect(EDGE_DEADLINE_MS).toBe(12 * 3_600_000);
  });

  it("the attribution's hang threshold is the suite's own HANG_MS (support.ts), and its folder is the one the units run", () => {
    const text = readFileSync(join(PLAT_ROOT, 'packages', 'testkit', 'test', 'edge', 'support.ts'), 'utf8');
    const m = /export const HANG_MS = ([0-9_]+);/.exec(text);
    expect(m?.[1].replace(/_/g, '')).toBe(String(EDGE_HANG_MS));
    expect(text).toMatch(/process\.env\.PLAT_EDGE_LOG/);
  });

  it('the files are read from the tree at the run: a fixture tree of none gives no unit (the runner then fails the job naming it)', () => {
    expect(edgeUnits(tree())).toEqual([]);
    const root = tree({ 'packages/testkit/test/edge/b.test.ts': '', 'packages/testkit/test/edge/a.test.ts': '', 'packages/testkit/test/edge/support.ts': '' });
    expect(edgeUnits(root).map((u) => u.name)).toEqual(['a.test.ts', 'b.test.ts', 'hang attribution (post-hoc)']);
    expect(nightlyJobs(root).find((j) => j.name === 'edge-suite (1 000 seeds)')?.units(null)).toEqual(edgeUnits(root));
  });
});
