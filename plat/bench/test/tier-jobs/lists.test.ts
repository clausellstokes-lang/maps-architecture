// M0-f-02b: the three manifests complete for M0 (§13.8, §16 M0 (f); C-0015, C-0068, C-0069, C-0088, C-0099, C-0100,
// C-0105, C-0121; the readings C-0447). Every status here is DERIVED over a FIXTURE tree (N-01: a review landing later
// never turns this suite red; the real tree's statuses are the checker's receipt), and no tier runs (C-0105).
import { afterAll, describe, expect, it, vi } from 'vitest';
import {
  BASELINES,
  BUDGETS,
  DENYLIST,
  manifest,
  milestoneJobs,
  nightlyJobs,
  prJobs,
} from '../../src/tier-jobs/index.js';
import { PLAT_ROOT } from '../../src/tiers/index.js';
import { manifestProblems, nestedTierCall, runTier } from '../../src/tiers/runner.js';
import { deriveStatus } from '../../src/tiers/status.js';
import type { Job, TierName, Unit } from '../../src/tiers/types.js';
import { builtTree, plantedExec, probe, removeTrees, sha, tree, unitsAt, write } from './support.js';

// the job lists read @plat/testkit's primitive list (its first import takes seconds on this class of machine)
vi.setConfig({ testTimeout: 60_000 });

afterAll(removeTrees);

/**
 * §13.8's tier rows, each content the design lists, with the job that holds it at M0 (in that tier's OWN list) or the
 * milestone that first builds it (M0.md §4b; the item's `defers`). B-EDGE's rows are included (C-0100).
 */
const TABLE: { tier: TierName; content: string; job: string | null; later?: string }[] = [
  { tier: 'pr', content: 'lint (the determinism allowlist, units, dependency direction, the repository path rule)', job: 'lint' },
  { tier: 'pr', content: 'type check', job: 'type check' },
  { tier: 'pr', content: 'unit and contract tests (B-EDGE on its fixtures at PLAT_EDGE_SEEDS 10 among them, C-0100)', job: 'unit and contract tests' },
  { tier: 'pr', content: 'B-FUZZ with 10⁴ random inputs per primitive plus the whole constructive-degeneracy set', job: 'B-FUZZ (10⁴ per primitive and the constructive set)' },
  { tier: 'pr', content: 'B-CITY-lite 50 seeds per rung × 4 water settings — at M0 the fusion spike at 50 seeds (C-0015)', job: 'B-CITY-lite stand-in: fusion spike' },
  { tier: 'pr', content: 'B-CITY-lite 50 seeds per rung × 4 water settings — at M0 the site spike at 50 seeds (C-0015)', job: 'B-CITY-lite stand-in: site spike' },
  { tier: 'pr', content: 'the licence scan', job: 'licence check' },
  { tier: 'pr', content: 'the notices scan', job: 'notices check' },
  { tier: 'pr', content: 'the vendored-library check (§17.4)', job: 'vendor check' },
  { tier: 'pr', content: 'the deny-list scan (§17.1 (5))', job: 'deny-list scan' },
  { tier: 'pr', content: 'B-EDIT 10³ sequences', job: null, later: 'M1' },
  { tier: 'pr', content: 'stage-isolated goldens and the per-stop placement digests', job: null, later: 'M1' },
  { tier: 'pr', content: "every shipped style sheet through §8.2's slot resolution; the render keys", job: null, later: 'M1' },
  { tier: 'pr', content: "the stamp-tile asset's loaded hashes and its seam check", job: null, later: 'M1' },
  { tier: 'pr', content: "the app's scripted and accessibility tasks on Chromium", job: null, later: 'M1' },
  { tier: 'nightly', content: 'B-FUZZ 10⁶ per primitive', job: 'B-FUZZ (10⁶ per primitive)' },
  { tier: 'nightly', content: 'B-CITY 1 000 seeds — at M0 the fusion spike at its full seed set (C-0015)', job: 'fusion spike (full seed set)' },
  { tier: 'nightly', content: 'B-CITY 1 000 seeds — at M0 the site spike at its full seed set (C-0015)', job: 'site spike (full seed set)' },
  { tier: 'nightly', content: "the bent cut's T34-1 10 000-face mean (§13.8's schedule) and the spike's F-CUT residue and signature", job: 'bent-cut F-CUT harness' },
  { tier: 'nightly', content: 'the cross-engine digests — at M0 the cross-host run (§16 M0 (d))', job: 'cross-host run' },
  { tier: 'nightly', content: 'a seed sweep of digests — at M0 the determinism spike (§16 M0 (d))', job: 'determinism spike' },
  { tier: 'nightly', content: "B-EDGE's nightly form — at M0 its fixtures at 1 000 seeds (C-0100)", job: 'edge-suite (1 000 seeds)' },
  { tier: 'nightly', content: "§13.1's ladder coverage of the stage ladders (M0-x-05)", job: 'ladder-coverage bench' },
  { tier: 'nightly', content: 'the B-REF parity report (AFTER-M-1, C-0068, C-0121)', job: 'parity report' },
  { tier: 'nightly', content: "last and alone, §12.1's timing phase (not-built: M1, C-0088)", job: 'timing-phase (nightly contents)' },
  { tier: 'nightly', content: 'B-EDIT 10⁴ sequences', job: null, later: 'M1' },
  { tier: 'nightly', content: 'the O9 (c) faithfulness campaign', job: null, later: 'M1' },
  { tier: 'nightly', content: 'the five-engine golden run, the placement digests, the stamp-tile rebuild, the census rows', job: null, later: 'M1' },
  { tier: 'nightly', content: 'visual regression and B-ZOOM', job: null, later: 'M1' },
  { tier: 'nightly', content: 'control sweeps at TOWN and CITY; the option matrix', job: null, later: 'M1' },
  { tier: 'nightly', content: "B-EDGE's rung and preset sweep", job: null, later: 'M1' },
  { tier: 'milestone', content: 'the F-CUT 10⁵-face bar (§4.6 step 8; M0.md §1 (b))', job: 'F-CUT (10⁵ faces)' },
  { tier: 'milestone', content: 'B-EDIT 10⁵ sequences; METROPOLIS control sweeps; the 20-epoch test', job: null, later: 'M1' },
  { tier: 'milestone', content: 'the parity report at 100 of our seeds per setting; the D-5 renders', job: null, later: 'M1' },
  { tier: 'milestone', content: "§12.3's pool comparison in the timing phase; memory and document-size tests", job: null, later: 'M1' },
];

/** A tier's OWN jobs: the milestone tier's list less the nightly set it carries. */
function ownJobs(tier: TierName): Job[] {
  if (tier === 'pr') return prJobs(PLAT_ROOT);
  if (tier === 'nightly') return nightlyJobs();
  const carried = new Set(nightlyJobs().map((j) => j.name));
  return milestoneJobs().filter((j) => !carried.has(j.name));
}

const ALL = (): Job[] => [...prJobs(PLAT_ROOT), ...nightlyJobs(), ...milestoneJobs()];

describe("§13.8's rows at M0: each in exactly one tier's own list, nothing missing, nothing extra (C-0079, C-0099)", () => {
  it('every M0 row of the table names one job of its tier, every job of each list is claimed by exactly one row', () => {
    for (const tier of ['pr', 'nightly', 'milestone'] as const) {
      const own = ownJobs(tier).map((j) => j.name);
      const claimed = TABLE.filter((r) => r.tier === tier && r.job !== null).map((r) => r.job as string);
      expect([...claimed].sort()).toEqual([...own].sort());
      expect(new Set(claimed).size).toBe(claimed.length);
      for (const r of TABLE.filter((x) => x.tier === tier && x.job === null)) expect(r.later).toMatch(/^M\d/);
    }
    // the nightly carries B-EDGE's 1 000-seed form; the PR its 10-seed form inside the unit and contract tests
    expect(nightlyJobs().find((j) => j.name === 'edge-suite (1 000 seeds)')).toMatchObject({ kind: 'vitest', source: 'packages/testkit/test/edge/', item: 'M0-x-06' });
  });

  it('a job name appears once per manifest, and no job of any tier sits in two tiers\' own lists', () => {
    const owners = new Map<string, TierName[]>();
    for (const tier of ['pr', 'nightly', 'milestone'] as const) {
      const names = manifest(tier, PLAT_ROOT).jobs.map((j) => j.name);
      expect(new Set(names).size).toBe(names.length);
      for (const n of ownJobs(tier).map((j) => j.name)) owners.set(n, [...(owners.get(n) ?? []), tier]);
    }
    for (const [, tiers] of owners) expect(tiers.length).toBe(1);
  });

  it("the milestone list is the nightly set less its timing-phase entry, in the nightly's order, then F-CUT at 10⁵ faces", () => {
    const n = nightlyJobs().map((j) => j.name);
    expect(milestoneJobs().map((j) => j.name)).toEqual([...n.slice(0, -1), 'F-CUT (10⁵ faces)']);
    expect(n.at(-1)).toBe('timing-phase (nightly contents)');
  });
});

describe('the derived statuses over a FIXTURE tree with every M0 source built and no M-1 file (C-0099, C-0121; N-01)', () => {
  it('built for every M0 job; after-M-1 naming its file for the deny-list scan and the parity report; not-built: M1 for the timing-phase job', async () => {
    const jobs = ALL();
    const root = builtTree(jobs);
    for (const j of jobs) {
      const d = await deriveStatus(j, root, probe);
      if (j.name === 'deny-list scan') expect(d).toMatchObject({ status: 'after-M-1: denylist.json', state: 'after-M-1', file: DENYLIST });
      else if (j.name === 'parity report') expect(d).toMatchObject({ status: 'after-M-1: baselines.json', state: 'after-M-1', file: BASELINES });
      else if (j.name === 'timing-phase (nightly contents)') expect(d).toEqual({ status: 'not-built: M1', state: 'not-built', waitsFor: 'M1' });
      else expect([j.name, d.status, d.loadError]).toEqual([j.name, 'built', undefined]);
    }
    // no entry is staged to an item any more: only the timing-phase job waits, for M1 (C-0241 (4)'s hand-over done)
    expect(jobs.filter((j) => j.stagedTo !== undefined).map((j) => [j.name, j.stagedTo])).toEqual([['timing-phase (nightly contents)', 'M1']]);
  });

  it("with the reviewers' summaries planted and absent (N-01's form): pending with the review reason until both name the file's sha256, then built", async () => {
    const parity = nightlyJobs().find((j) => j.name === 'parity report') as Job;
    const scan = prJobs(PLAT_ROOT).find((j) => j.name === 'deny-list scan') as Job;
    const rows = '{"rows":[1]}\n';
    const list = '{"normalisationVersion":1}\n';
    const root = builtTree([parity, scan], { [BASELINES]: rows, [DENYLIST]: list });
    expect((await deriveStatus(parity, root, probe)).status).toBe('after-M-1: baselines.json (review pending: M0-b-05a, M0-c-07a)');
    expect((await deriveStatus(scan, root, probe)).status).toBe('after-M-1: denylist.json (review pending: M0-k-07)');
    write(root, 'docs/build/summaries/M0-c-07a.json', JSON.stringify({ reviewed: { [BASELINES]: sha(rows) } }));
    expect((await deriveStatus(parity, root, probe)).status).toBe('after-M-1: baselines.json (review pending: M0-b-05a)');
    write(root, 'docs/build/summaries/M0-b-05a.json', JSON.stringify({ reviewed: { [BASELINES]: sha('another version') } }));
    expect((await deriveStatus(parity, root, probe)).status).toBe('after-M-1: baselines.json (review pending: M0-b-05a)');
    write(root, 'docs/build/summaries/M0-b-05a.json', JSON.stringify({ reviewed: { [BASELINES]: sha(rows) } }));
    write(root, 'docs/build/summaries/M0-k-07.json', JSON.stringify({ reviewed: { [DENYLIST]: sha(list) } }));
    expect((await deriveStatus(parity, root, probe)).status).toBe('built');
    expect((await deriveStatus(scan, root, probe)).status).toBe('built');
  });

  it('a job whose item has not landed derives not-built naming that item (an empty harness index, an empty test folder)', async () => {
    const jobs = nightlyJobs().filter((j) => j.stagedTo === undefined && j.inputs.length === 0);
    const files: Record<string, string> = {};
    for (const j of jobs) files[j.kind === 'harness' ? `${j.source}index.ts` : `${j.source}README.md`] = 'export {};\n';
    const root = tree(files);
    for (const j of jobs) expect((await deriveStatus(j, root)).status).toBe(`not-built: ${j.item}`);
  });
});

describe('the manifests over a FIXTURE tree through the runner (C-0105: a planted executor, nothing spawned)', () => {
  it("the nightly's last job is `timing-phase (nightly contents)`, listed not-built: M1 and never run; no manifest job calls bench:timing-phase or a tier (C-0088)", async () => {
    const m = manifest('nightly', PLAT_ROOT);
    const root = builtTree(m.jobs, { 'packages/testkit/test/edge/a.test.ts': '// x\n', 'packages/testkit/test/edge/b.test.ts': '// x\n' });
    const calls: Unit[] = [];
    const r = await runTier({ ...m, jobs: nightlyJobs(root) }, { root, out: tree(), exec: plantedExec(calls), probe });
    const last = r.jobs.at(-1);
    expect([last?.name, last?.status, last?.outcome, last?.units.length]).toEqual(['timing-phase (nightly contents)', 'not-built: M1', 'not run', 0]);
    expect(r.notBuilt).toEqual([{ name: 'timing-phase (nightly contents)', status: 'not-built: M1' }]);
    expect(r.pending.map((p) => [p.name, p.status, p.file])).toEqual([['parity report', 'after-M-1: baselines.json', BASELINES]]);
    expect(r.jobs.filter((j) => j.outcome === 'pass').length).toBe(8);
    expect(calls.some((u) => u.argv.includes('bench:timing-phase') || u.argv.some((a) => /^tier:/.test(a)))).toBe(false);
    for (const t of ['pr', 'nightly', 'milestone'] as const) {
      const mm = manifest(t, PLAT_ROOT);
      expect(manifestProblems(mm)).toEqual([]);
      expect(mm.budget).toEqual(BUDGETS[t]);
      for (const j of mm.jobs.filter((x) => x.stagedTo === undefined)) {
        expect(j.source).not.toMatch(/^bench\/src\/(tiers|timing-phase)\//);
        for (const u of await unitsAt(j)) {
          expect(nestedTierCall(u)).toBe(false);
          expect(u.argv.slice(0, 2)).toEqual(u.argv[0] === 'corepack' ? ['corepack', 'pnpm'] : u.argv.slice(0, 2));
          expect(u.argv[0]).not.toBe('pnpm');
        }
      }
    }
  }, 120_000);

  it("the parity job over an ABSENT baselines.json: pending-after-M-1 naming the file, not run (C-0068); over a present one without both reviews: pending with its review reason (C-0121)", async () => {
    const parity = nightlyJobs().find((j) => j.name === 'parity report') as Job;
    const m = { tier: 'nightly' as const, budget: { ...BUDGETS.nightly }, jobs: [parity] };
    const root = builtTree([parity]);
    const calls: Unit[] = [];
    let r = await runTier(m, { root, out: tree(), exec: plantedExec(calls), probe });
    expect(r.pending).toEqual([{ name: 'parity report', item: 'M0-k-05', status: 'after-M-1: baselines.json', file: BASELINES, reviewPending: [], reason: `${BASELINES} absent (C-0069)` }]);
    expect([r.jobs[0].outcome, r.jobs[0].reason, r.verdict]).toEqual(['not run', 'pending-after-M-1: after-M-1: baselines.json', 'pass']);
    write(root, BASELINES, '{"rows":[1]}\n');
    write(root, 'docs/build/summaries/M0-b-05a.json', JSON.stringify({ reviewed: { [BASELINES]: sha('{"rows":[1]}\n') } }));
    r = await runTier(m, { root, out: tree(), exec: plantedExec(calls), probe });
    expect(r.pending.map((p) => [p.status, p.reviewPending, p.reason])).toEqual([
      ['after-M-1: baselines.json (review pending: M0-c-07a)', ['M0-c-07a'], `${BASELINES} present, review pending: M0-c-07a (C-0121)`],
    ]);
    expect(calls).toEqual([]);
    // both reviews: built, and its one unit is the parity CLI over our side (the phase-a summary carrying parityOurs)
    write(root, 'docs/build/summaries/M0-c-07a.json', JSON.stringify({ reviewed: { [BASELINES]: sha('{"rows":[1]}\n') }, parityOurs: {} }));
    r = await runTier(m, { root, out: tree(), exec: plantedExec(calls), probe });
    expect([r.pending.length, r.jobs[0].outcome]).toEqual([0, 'pass']);
    expect(calls.map((u) => u.argv)).toEqual([['corepack', 'pnpm', 'bench', '--', 'parity', '--ours', 'docs/build/summaries/M0-c-07a.json']]);
  });

  it("a built spike job whose fixture suite is missing or empty fails naming it, never passes vacuously (§13.8 Edges; N-6)", async () => {
    for (const j of [...prJobs(PLAT_ROOT), ...nightlyJobs(), ...milestoneJobs()].filter((x) => (x.suites ?? []).length > 0 && x.inputs.length === 0)) {
      const root = builtTree([j]);
      const s = (j.suites ?? [])[0];
      write(root, s.path, '');
      const calls: Unit[] = [];
      const r = await runTier({ tier: 'nightly', budget: { ...BUDGETS.nightly }, jobs: [j] }, { root, out: tree(), exec: plantedExec(calls), probe });
      expect([j.name, r.jobs[0].outcome, r.jobs[0].reason]).toEqual([j.name, 'fail', `empty suite: ${s.kind} ${s.path} empty (§13.8 Edges)`]);
      expect(calls).toEqual([]);
    }
  });

  it('every declared suite exists in the tree and holds something (the fixture files the seed families draw on)', async () => {
    const { suiteProblem } = await import('../../src/tiers/status.js');
    const seen: string[] = [];
    for (const j of ALL()) for (const s of j.suites ?? []) if (j.inputs.length === 0) {
      expect([j.name, suiteProblem(PLAT_ROOT, s)]).toEqual([j.name, null]);
      seen.push(s.path);
    }
    expect([...new Set(seen)].sort()).toEqual([
      'bench/src/bentcut/faces.ts',
      'bench/src/crosshost/fixtures/kernel.json',
      'bench/src/site/fixtures.ts',
      'docs/build/summaries/M0-x-05.json',
      'packages/layout/src/fixtures/flat.ts',
    ]);
  });
});
