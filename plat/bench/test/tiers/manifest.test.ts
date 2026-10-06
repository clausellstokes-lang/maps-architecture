// M0-f-02a: the three manifests' shape (§13.8; C-0027, C-0088, C-0097, C-0099, C-0113, C-0121) — read, never run
// (C-0105): the PR list is §13.8's PR contents that exist at M0, each job's status one of the derived forms; the budgets
// are §13.8's caps and never raised; the units partition each job as C-0097 names (tsc per project, vitest per project,
// B-FUZZ per primitive plus the constructive set) and no unit runs a tier or the timing phase; the fallback switch on
// the real PR list reduces B-FUZZ's random inputs and never its constructive draws; the nightly list ends with
// `timing-phase (nightly contents)` at not-built: M1; and the dispatcher's three tier entries reach this runner.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FUZZ_PRIMITIVES } from '@plat/testkit';
import { describe, expect, it } from 'vitest';
import { BUDGETS, PR_CONSTRUCTIVE_DRAWS, PR_FUZZ_RUNS, PR_SEEDS, manifest, milestoneJobs, nightlyJobs, prJobs, tsProjects, vitestProjects } from '../../src/tier-jobs/index.js';
import { PLAT_ROOT } from '../../src/tiers/index.js';
import { applyFallback, manifestProblems, nestedTierCall } from '../../src/tiers/runner.js';
import { deriveStatus } from '../../src/tiers/status.js';
import type { Job, Unit } from '../../src/tiers/types.js';

const work = JSON.parse(readFileSync(join(PLAT_ROOT, 'docs', 'build', 'M0-work.json'), 'utf8')) as { items: { id: string }[] };
const ITEMS = new Set(work.items.map((i) => i.id));

const units = async (j: Job, size: number | null = j.size?.n ?? null): Promise<Unit[]> => j.units(size);

describe('the budgets (§13.8; C-0027) — the caps, never raised in code', () => {
  it('PR ≤ 15 min on 8 cores, judged on wall-clock; nightly ≤ 4 h and milestone ≤ 12 h on 16 cores, projected', () => {
    expect(BUDGETS).toEqual({
      pr: { ms: 900_000, cores: 8, projected: false },
      nightly: { ms: 14_400_000, cores: 16, projected: true },
      milestone: { ms: 43_200_000, cores: 16, projected: true },
    });
    for (const t of ['pr', 'nightly', 'milestone'] as const) {
      const m = manifest(t, PLAT_ROOT);
      expect(m.budget).toEqual(BUDGETS[t]);
      expect(manifestProblems(m)).toEqual([]);
    }
  });
});

describe("the PR tier's jobs at M0 (§13.8's PR contents; §16 M0 (f))", () => {
  const jobs = prJobs(PLAT_ROOT);

  it("lists lint, the type check, the unit and contract tests, B-FUZZ, the licence, notices and vendor checks, the deny-list scan and B-CITY-lite's two spike stand-ins", () => {
    expect(jobs.map((j) => [j.name, j.kind, j.source, j.item])).toEqual([
      ['lint', 'command', 'scripts/lint.mjs', 'M0-d-07'],
      ['type check', 'command', 'tsconfig.json', 'M0-s-01'],
      ['unit and contract tests', 'command', 'vitest.config.ts', 'M0-s-01'],
      ['B-FUZZ (10⁴ per primitive and the constructive set)', 'harness', 'bench/src/fuzz-bar/', 'M0-k-04'],
      ['licence check', 'command', 'tools/lint/licences.mjs', 'M0-d-07'],
      ['notices check', 'command', 'tools/notices/generate.mjs', 'M0-s-01'],
      ['vendor check', 'command', 'tools/vendor/verify.mjs', 'M0-s-01'],
      ['deny-list scan', 'harness', 'bench/src/scan/', 'M0-k-06'],
      ['B-CITY-lite stand-in: fusion spike', 'harness', 'bench/src/fusion/', 'M0-c-06'],
      ['B-CITY-lite stand-in: site spike', 'harness', 'bench/src/site/', 'M0-e-06'],
    ]);
    expect(jobs.find((j) => j.name === 'deny-list scan')?.reviewedBy).toEqual(['M0-k-07']);
    for (const j of jobs.filter((x) => x.name.startsWith('B-CITY-lite'))) {
      expect(j.stagedTo).toBe('M0-f-02b');
      expect(j.size).toEqual({ kind: 'seeds', n: PR_SEEDS });
    }
    expect(PR_SEEDS).toBe(50);
  });

  it('every status derived on this tree is built, not-built naming an item of this spec (or M1), or after-M-1 naming its file', async () => {
    for (const j of jobs) {
      const d = await deriveStatus(j, PLAT_ROOT);
      if (d.state === 'built') expect(d.status).toBe('built');
      else if (d.state === 'not-built') expect(ITEMS.has(d.waitsFor ?? '') || d.waitsFor === 'M1').toBe(true);
      else expect(d.status).toMatch(/^after-M-1: denylist\.json( \(review pending: M0-k-07\))?$/);
      expect(d.loadError).toBeUndefined();
    }
    // the jobs whose items have all landed are built on this tree (each source exists and the fuzz-bar exports run)
    for (const name of ['lint', 'type check', 'unit and contract tests', 'B-FUZZ (10⁴ per primitive and the constructive set)', 'licence check', 'notices check', 'vendor check']) {
      expect((await deriveStatus(jobs.find((j) => j.name === name) as Job, PLAT_ROOT)).status).toBe('built');
    }
  });

  it('the type check runs tsc per project in tsconfig.json\'s reference order; the tests vitest per project of vitest.config.ts', async () => {
    const tc = await units(jobs[1]);
    expect(tc.map((u) => u.name)).toEqual(tsProjects(PLAT_ROOT));
    expect(tc.length).toBe(14);
    expect(tc[0].argv).toEqual(['corepack', 'pnpm', 'exec', 'tsc', '-p', 'packages/kernel', '--composite', 'false', '--incremental', 'false']);
    const vt = await units(jobs[2]);
    expect(vt.map((u) => u.name)).toEqual(['kernel', 'model', 'tables', 'site', 'layout', 'testkit', 'bench', 'tools']);
    expect(vitestProjects(PLAT_ROOT)).toEqual(vt.map((u) => u.name));
    expect(vt[6].argv).toEqual(['corepack', 'pnpm', 'exec', 'vitest', 'run', '--project', 'bench']);
    // every vitest project the config names is one unit (a project added to the config joins the job with no edit here)
    const config = readFileSync(join(PLAT_ROOT, 'vitest.config.ts'), 'utf8');
    expect([...config.matchAll(/pkg\('|name: '/g)].length).toBe(vt.length);
  });

  it('B-FUZZ: one unit per kernel primitive at 10⁴ and the constructive set at its fixed draws; no summary written into plat/', async () => {
    const fz = jobs[3];
    expect(fz.size).toEqual({ kind: 'fuzz', n: PR_FUZZ_RUNS });
    expect(PR_FUZZ_RUNS).toBe(10_000);
    const us = await units(fz);
    expect(us.map((u) => u.name)).toEqual([...FUZZ_PRIMITIVES.map((p) => p.name), 'constructive set']);
    for (const u of us.slice(0, -1)) {
      expect(u.argv).toEqual(['corepack', 'pnpm', 'bench', '--', 'fuzz-bar', '--primitive', u.name, '--runs', '10000', '--constructive-seeds', String(PR_CONSTRUCTIVE_DRAWS), '--no-summary']);
    }
    expect(us[us.length - 1].argv).toEqual(['corepack', 'pnpm', 'bench', '--', 'fuzz-bar', '--runs', '1', '--constructive-seeds', '10', '--no-summary']);
  });

  it('the fallback switch on the real list: B-FUZZ at 5 × 10³ per primitive, the constructive draws unchanged, the spikes at 25 seeds', async () => {
    const { sizes, record } = applyFallback(jobs, true);
    expect(record.changed).toEqual([
      { job: 'B-FUZZ (10⁴ per primitive and the constructive set)', kind: 'fuzz', from: 10_000, to: 5_000 },
      { job: 'B-CITY-lite stand-in: fusion spike', kind: 'seeds', from: 50, to: 25 },
      { job: 'B-CITY-lite stand-in: site spike', kind: 'seeds', from: 50, to: 25 },
    ]);
    const us = await units(jobs[3], sizes.get(jobs[3].name) ?? null);
    for (const u of us.slice(0, -1)) expect(u.argv.slice(7, 9)).toEqual(['--runs', '5000']);
    for (const u of us) expect(u.argv.slice(u.argv.indexOf('--constructive-seeds'), u.argv.indexOf('--constructive-seeds') + 2)).toEqual(['--constructive-seeds', '10']);
    expect(us[us.length - 1].argv).toEqual((await units(jobs[3])).at(-1)?.argv);
  });

  it('no unit of a built PR job runs a tier or the timing phase, and none calls a bare pnpm (C-0030, C-0088)', async () => {
    for (const j of jobs.filter((x) => x.stagedTo === undefined)) {
      for (const u of await units(j)) {
        expect(nestedTierCall(u)).toBe(false);
        expect(u.argv[0]).not.toBe('pnpm');
        if (u.argv[1] === 'pnpm') expect(u.argv[0]).toBe('corepack');
      }
    }
  });
});

describe('the nightly and milestone lists, declared (C-0088, C-0099; filled by M0-f-02b)', () => {
  it("the nightly's last job is `timing-phase (nightly contents)` at not-built: M1; every other entry not-built: M0-f-02b or after-M-1", async () => {
    const jobs = nightlyJobs();
    const last = jobs[jobs.length - 1];
    expect(last.name).toBe('timing-phase (nightly contents)');
    expect((await deriveStatus(last, PLAT_ROOT)).status).toBe('not-built: M1');
    for (const j of jobs.slice(0, -1)) {
      expect(ITEMS.has(j.item)).toBe(true);
      const s = (await deriveStatus(j, PLAT_ROOT)).status;
      expect(s === 'not-built: M0-f-02b' || s.startsWith('after-M-1: baselines.json')).toBe(true);
    }
    expect(jobs.map((j) => j.name)).toEqual([
      'B-FUZZ (10⁶ per primitive)',
      'fusion spike (full seed set)',
      'site spike (full seed set)',
      'bent-cut F-CUT harness',
      'cross-host run',
      'determinism spike',
      'edge-suite (1 000 seeds)',
      'ladder-coverage bench',
      'parity report',
      'timing-phase (nightly contents)',
    ]);
    // no job's source is the timing-phase script or the tier runner (C-0088)
    for (const j of [...jobs, ...milestoneJobs()]) expect(j.source).not.toMatch(/^bench\/src\/(timing-phase|tiers)\//);
  });

  it('the milestone list is the nightly set less its timing-phase entry, plus F-CUT at 10⁵ faces', () => {
    expect(milestoneJobs().map((j) => j.name)).toEqual([...nightlyJobs().slice(0, -1).map((j) => j.name), 'F-CUT (10⁵ faces)']);
    expect(milestoneJobs().every((j) => j.stagedTo === 'M0-f-02b')).toBe(true);
  });

  it('a declared entry refuses to give units until it is filled', () => {
    expect(() => nightlyJobs()[0].units(1_000_000)).toThrow('declared by M0-f-02a, filled by M0-f-02b');
  });
});

describe("the dispatcher's tier entries (C-0059)", () => {
  it('tier:pr, tier:nightly and tier:milestone resolve to this folder with their tier as the first argument', async () => {
    const { HARNESSES } = (await import(join(PLAT_ROOT, 'scripts', 'bench.mjs'))) as { HARNESSES: Record<string, { folder: string; item: string; args?: string[] }> };
    expect(HARNESSES['tier:pr']).toEqual({ folder: 'tiers', item: 'M0-f-02a', args: ['pr'] });
    expect(HARNESSES['tier:nightly']).toEqual({ folder: 'tiers', item: 'M0-f-02a', args: ['nightly'] });
    expect(HARNESSES['tier:milestone']).toEqual({ folder: 'tiers', item: 'M0-f-02a', args: ['milestone'] });
  });
});
