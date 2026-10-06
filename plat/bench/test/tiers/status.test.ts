// M0-f-02a: a tier job's status is DERIVED at run time (C-0099, C-0121; C-0069's three statuses) — over FIXTURE trees
// and manifests only (C-0105): a harness folder without run → not-built naming its item, with run → built; a declared
// input absent → after-M-1 naming the file, never run and never counted pass or fail; a vitest folder without a test →
// not-built; the review condition (a reviewer's summary absent, or naming another sha256 → review pending, not run; the
// current sha256 → built); the deny-list and parity jobs' REAL entries derived over a fixture tree of their real shape.
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { BASELINES, DENYLIST, nightlyJobs, prJobs } from '../../src/tier-jobs/index.js';
import { runTier } from '../../src/tiers/runner.js';
import { deriveStatus, insideRoot, reviewPending, suiteProblem } from '../../src/tiers/status.js';
import type { Job, Unit } from '../../src/tiers/types.js';
import { EMPTY_INDEX, RUN_INDEX, fixtureManifest, job, plantedExec, removeTrees, sha, tree, write } from './fixture.js';

afterAll(removeTrees);

const harnessJob = (extra: Partial<Job> = {}): Job => job('h', { kind: 'harness', source: 'bench/src/zz-h/', item: 'M0-zz-01', ...extra });

describe('derived status (C-0099)', () => {
  it('a harness folder whose index exports no run is not-built naming its item; with run it is built', async () => {
    const root = tree({ 'bench/src/zz-h/index.ts': EMPTY_INDEX });
    expect((await deriveStatus(harnessJob(), root)).status).toBe('not-built: M0-zz-01');
    write(root, 'bench/src/zz-h/index.ts', RUN_INDEX.replace('run', 'notRun'));
    expect((await deriveStatus(harnessJob(), root)).status).toBe('not-built: M0-zz-01');
    const built = tree({ 'bench/src/zz-h/index.ts': RUN_INDEX });
    expect(await deriveStatus(harnessJob(), built)).toEqual({ status: 'built', state: 'built' });
    // no folder at all: not built
    expect((await deriveStatus(harnessJob(), tree({}))).status).toBe('not-built: M0-zz-01');
  });

  it('a harness index that fails to load is built with its load error: the job fails naming it, never skipped', async () => {
    const root = tree({ 'bench/src/zz-h/index.ts': 'export function run(: number {\n' });
    const d = await deriveStatus(harnessJob(), root);
    expect(d.state).toBe('built');
    expect(d.loadError).toBeTruthy();
    const calls: Unit[] = [];
    const r = await runTier(fixtureManifest([harnessJob()]), { root, out: tree({}), exec: plantedExec({}, calls) });
    expect(r.jobs[0].outcome).toBe('fail');
    expect(r.jobs[0].reason).toMatch(/^the harness failed to load: /);
    expect(calls).toEqual([]);
    expect(r.verdict).toBe('fail');
  });

  it('a vitest folder without a test is not-built; with a *.test.ts (or *.test.mjs) below it, built', async () => {
    const v = (root: string) => deriveStatus(job('v', { kind: 'vitest', source: 'packages/zz/test/suite/', item: 'M0-zz-02' }), root);
    expect((await v(tree({ 'packages/zz/test/suite/helper.ts': 'export {};\n' }))).status).toBe('not-built: M0-zz-02');
    expect((await v(tree({}))).status).toBe('not-built: M0-zz-02');
    expect((await v(tree({ 'packages/zz/test/suite/deep/a.test.ts': '' }))).status).toBe('built');
    expect((await v(tree({ 'packages/zz/test/suite/b.test.mjs': '' }))).status).toBe('built');
  });

  it("a command's script absent is not-built naming its item; present, built; a folder in its place is not a script", async () => {
    const c = job('c', { source: 'scripts/zz.mjs', item: 'M0-zz-03' });
    expect((await deriveStatus(c, tree({}))).status).toBe('not-built: M0-zz-03');
    expect((await deriveStatus(c, tree({ 'scripts/zz.mjs/x': '' }))).status).toBe('not-built: M0-zz-03');
    expect((await deriveStatus(c, tree({ 'scripts/zz.mjs': '' }))).status).toBe('built');
  });

  it('a declared input absent → after-M-1 naming the file, before any built check; never run, never counted pass or fail', async () => {
    const root = tree({ 'bench/src/zz-h/index.ts': RUN_INDEX, 'scripts/ok.mjs': '' });
    const waiting = harnessJob({ name: 'waits', inputs: ['packages/zz/baselines/list.json'] });
    const d = await deriveStatus(waiting, root);
    expect(d).toEqual({ status: 'after-M-1: list.json', state: 'after-M-1', file: 'packages/zz/baselines/list.json' });
    // an unbuilt harness with an absent input still reads after-M-1 (the deny-list job before M0-k-06 lands, C-0099)
    expect((await deriveStatus(harnessJob({ source: 'bench/src/zz-none/', inputs: ['x/absent.json'] }), root)).status).toBe('after-M-1: absent.json');
    const calls: Unit[] = [];
    const r = await runTier(fixtureManifest([waiting, job('other')]), { root, out: tree({}), exec: plantedExec({}, calls) });
    expect(calls.map((u) => u.name)).toEqual(['other']);
    expect(r.verdict).toBe('pass');
    expect(r.pending).toEqual([{ name: 'waits', item: 'M0-zz-01', status: 'after-M-1: list.json', file: 'packages/zz/baselines/list.json', reviewPending: [], reason: 'packages/zz/baselines/list.json absent (C-0069)' }]);
    expect(r.jobs[0]).toMatchObject({ name: 'waits', outcome: 'not run', wallMs: 0, cpuMs: 0, units: [] });
    expect(r.covers).toContain('pending, never run or timed: waits (after-M-1: list.json)');
  });

  it('a built job whose declared input is present runs', async () => {
    const root = tree({ 'bench/src/zz-h/index.ts': RUN_INDEX, 'packages/zz/baselines/list.json': '[1]' });
    const calls: Unit[] = [];
    const r = await runTier(fixtureManifest([harnessJob({ name: 'reads', inputs: ['packages/zz/baselines/list.json'] })]), { root, out: tree({}), exec: plantedExec({}, calls) });
    expect(calls.map((u) => u.name)).toEqual(['reads']);
    expect(r.jobs[0]).toMatchObject({ status: 'built', outcome: 'pass', wallMs: 1_000, cpuMs: 2_000 });
    expect(r.pending).toEqual([]);
  });

  it('a staged entry derives not-built naming the item or milestone that completes it', async () => {
    const root = tree({ 'bench/src/zz-h/index.ts': RUN_INDEX });
    expect((await deriveStatus(harnessJob({ stagedTo: 'M1' }), root)).status).toBe('not-built: M1');
    const r = await runTier(fixtureManifest([harnessJob({ stagedTo: 'M0-f-02b' })]), { root, out: tree({}), exec: plantedExec() });
    expect(r.notBuilt).toEqual([{ name: 'h', status: 'not-built: M0-f-02b' }]);
    expect(r.endToEnd).toBe(false);
    expect(r.jobs[0]).toMatchObject({ outcome: 'not run', reason: 'not built: not-built: M0-f-02b' });
  });
});

describe('the review condition (C-0121)', () => {
  const input = 'packages/zz/baselines/list.json';
  const text = '{"rows":[1,2]}\n';
  const reviewed = harnessJob({ name: 'scan', inputs: [input], reviewedBy: ['M0-zz-07'] });

  it("the input present and the reviewer's summary absent → after-M-1: <file> (review pending: <item>), not run", async () => {
    const root = tree({ 'bench/src/zz-h/index.ts': RUN_INDEX, [input]: text });
    expect(await deriveStatus(reviewed, root)).toEqual({ status: 'after-M-1: list.json (review pending: M0-zz-07)', state: 'after-M-1', file: input, reviewPending: ['M0-zz-07'] });
    const calls: Unit[] = [];
    const r = await runTier(fixtureManifest([reviewed]), { root, out: tree({}), exec: plantedExec({}, calls) });
    expect(calls).toEqual([]);
    expect(r.pending[0].reason).toBe(`${input} present, review pending: M0-zz-07 (C-0121)`);
    expect(r.verdict).toBe('pass');
  });

  it('a summary naming another sha256, an unreadable summary or one with no reviewed block leaves it pending', async () => {
    for (const summary of [JSON.stringify({ reviewed: { [input]: sha('another version') } }), '{ not json', JSON.stringify({ counts: 3 }), JSON.stringify({ reviewed: { 'list.json': sha(text) } })]) {
      const root = tree({ 'bench/src/zz-h/index.ts': RUN_INDEX, [input]: text, 'docs/build/summaries/M0-zz-07.json': summary });
      expect((await deriveStatus(reviewed, root)).status).toBe('after-M-1: list.json (review pending: M0-zz-07)');
    }
  });

  it("the reviewer's summary naming the input's current sha256 → built, and the job runs; a new version turns it pending again", async () => {
    const root = tree({ 'bench/src/zz-h/index.ts': RUN_INDEX, [input]: text, 'docs/build/summaries/M0-zz-07.json': JSON.stringify({ reviewed: { [input]: sha(text) } }) });
    expect((await deriveStatus(reviewed, root)).status).toBe('built');
    const calls: Unit[] = [];
    await runTier(fixtureManifest([reviewed]), { root, out: tree({}), exec: plantedExec({}, calls) });
    expect(calls.map((u) => u.name)).toEqual(['scan']);
    write(root, input, '{"rows":[1,2,3]}\n');
    expect((await deriveStatus(reviewed, root)).status).toBe('after-M-1: list.json (review pending: M0-zz-07)');
  });

  it('with two reviewers each must name the sha256: the status names every reviewer still pending', async () => {
    const two = harnessJob({ inputs: [input], reviewedBy: ['M0-zz-05', 'M0-zz-06'] });
    const root = tree({ 'bench/src/zz-h/index.ts': RUN_INDEX, [input]: text });
    expect((await deriveStatus(two, root)).status).toBe('after-M-1: list.json (review pending: M0-zz-05, M0-zz-06)');
    write(root, 'docs/build/summaries/M0-zz-06.json', JSON.stringify({ reviewed: { [input]: sha(text) } }));
    expect(reviewPending(root, input, ['M0-zz-05', 'M0-zz-06'])).toEqual(['M0-zz-05']);
    expect((await deriveStatus(two, root)).status).toBe('after-M-1: list.json (review pending: M0-zz-05)');
    write(root, 'docs/build/summaries/M0-zz-05.json', JSON.stringify({ reviewed: { [input]: sha(text) } }));
    expect((await deriveStatus(two, root)).status).toBe('built');
  });
});

describe("the deny-list and parity jobs' real entries over a fixture tree of their real shape (C-0113, C-0121)", () => {
  const scan = prJobs('.').find((j) => j.name === 'deny-list scan') as Job;
  const parity = nightlyJobs().find((j) => j.name === 'parity report') as Job;

  it('the deny-list job: source bench/src/scan/, input denylist.json, reviewedBy M0-k-07, owned by M0-k-06', () => {
    expect(scan).toMatchObject({ kind: 'harness', source: 'bench/src/scan/', inputs: [DENYLIST], reviewedBy: ['M0-k-07'], item: 'M0-k-06' });
    expect(DENYLIST).toBe('packages/testkit/baselines/denylist.json');
    expect(parity).toMatchObject({ kind: 'harness', source: 'bench/src/parity/', inputs: [BASELINES], reviewedBy: ['M0-b-05a', 'M0-c-07a'], item: 'M0-k-05' });
    expect(BASELINES).toBe('packages/testkit/baselines/baselines.json');
  });

  it('the deny-list job reads after-M-1: denylist.json, then (review pending: M0-k-07), then built — and not-built: M0-k-06 while the scanner is unbuilt', async () => {
    const list = '{"normalisationVersion":1}\n';
    const root = tree({ 'bench/src/scan/index.ts': RUN_INDEX });
    expect((await deriveStatus(scan, root)).status).toBe('after-M-1: denylist.json');
    write(root, DENYLIST, list);
    expect((await deriveStatus(scan, root)).status).toBe('after-M-1: denylist.json (review pending: M0-k-07)');
    write(root, 'docs/build/summaries/M0-k-07.json', JSON.stringify({ reviewed: { [DENYLIST]: sha(list) } }));
    expect((await deriveStatus(scan, root)).status).toBe('built');
    write(root, 'bench/src/scan/index.ts', EMPTY_INDEX);
    expect((await deriveStatus(scan, root)).status).toBe('not-built: M0-k-06');
  });

  it('the parity job reads after-M-1: baselines.json, then (review pending: M0-b-05a, M0-c-07a)', async () => {
    const rows = '{"rows":[]}\n';
    const root = tree({ 'bench/src/parity/index.ts': RUN_INDEX });
    expect((await deriveStatus(parity, root)).status).toBe('after-M-1: baselines.json');
    write(root, BASELINES, rows);
    expect((await deriveStatus(parity, root)).status).toBe('after-M-1: baselines.json (review pending: M0-b-05a, M0-c-07a)');
    write(root, 'docs/build/summaries/M0-c-07a.json', JSON.stringify({ reviewed: { [BASELINES]: sha(rows) } }));
    expect((await deriveStatus(parity, root)).status).toBe('after-M-1: baselines.json (review pending: M0-b-05a)');
  });
});

describe("§13.8's edge: a built job's empty or missing suite fails naming it (T-RIG-5's form)", () => {
  it('suiteProblem: a missing path, an empty folder, a 0-byte file, an empty JSON array or object, whitespace JSON', () => {
    const root = tree({ 'f/empty.json': '[]', 'f/obj.json': '{}', 'f/blank.json': ' \n', 'f/zero.txt': '', 'f/ok.json': '[1]', 'f/full/a.txt': 'x' });
    mkdirSync(join(root, 'f', 'emptydir', 'sub'), { recursive: true });
    expect(suiteProblem(root, { kind: 'fixtures', path: 'f/none/' })).toBe('fixtures f/none/ missing');
    expect(suiteProblem(root, { kind: 'baseline', path: 'f/empty.json' })).toBe('baseline f/empty.json empty');
    expect(suiteProblem(root, { kind: 'baseline', path: 'f/obj.json' })).toBe('baseline f/obj.json empty');
    expect(suiteProblem(root, { kind: 'baseline', path: 'f/blank.json' })).toBe('baseline f/blank.json empty');
    expect(suiteProblem(root, { kind: 'seeds', path: 'f/zero.txt' })).toBe('seeds f/zero.txt empty');
    expect(suiteProblem(root, { kind: 'baseline', path: 'f/ok.json' })).toBeNull();
    expect(suiteProblem(root, { kind: 'fixtures', path: 'f/full/' })).toBeNull();
    expect(suiteProblem(root, { kind: 'fixtures', path: 'f/emptydir/' })).toBe('fixtures f/emptydir/ empty'); // folders, no file
  });

  it('a built job whose fixture set is empty fails naming it and runs nothing; the tier fails', async () => {
    const root = tree({ 'scripts/ok.mjs': '' });
    write(root, 'fx/set/sub/.gitkeep', '');
    const calls: Unit[] = [];
    const empty = tree({ 'scripts/ok.mjs': '' });
    mkdirSync(join(empty, 'fx', 'set'), { recursive: true });
    const r = await runTier(fixtureManifest([job('suite', { suites: [{ kind: 'fixtures', path: 'fx/set/' }] }), job('fine')]), { root: empty, out: tree({}), exec: plantedExec({}, calls) });
    expect(r.jobs[0]).toMatchObject({ name: 'suite', status: 'built', outcome: 'fail', reason: 'empty suite: fixtures fx/set/ empty (§13.8 Edges)' });
    expect(calls.map((u) => u.name)).toEqual(['fine']);
    expect(r.verdict).toBe('fail');
    // the same job with a fixture present passes
    const ok = await runTier(fixtureManifest([job('suite', { suites: [{ kind: 'fixtures', path: 'fx/set/' }] })]), { root, out: tree({}), exec: plantedExec() });
    expect(ok.jobs[0].outcome).toBe('pass');
  });

  it('a missing baseline file and a seed family of 0 fail the built job naming them; a job declaring no unit fails', async () => {
    const root = tree({ 'scripts/ok.mjs': '' });
    const r = await runTier(
      fixtureManifest([
        job('baseline', { suites: [{ kind: 'baseline', path: 'b/rows.json' }] }),
        job('seeds', { size: { kind: 'seeds', n: 0 } }),
        job('nothing', { units: () => [] }),
      ]),
      { root, out: tree({}), exec: plantedExec() },
    );
    expect(r.jobs.map((j) => [j.name, j.outcome, j.reason])).toEqual([
      ['baseline', 'fail', 'empty suite: baseline b/rows.json missing (§13.8 Edges)'],
      ['seeds', 'fail', 'empty suite: seeds family of 0 (§13.8 Edges)'],
      ['nothing', 'fail', 'empty suite: the job declares no unit (§13.8 Edges)'],
    ]);
  });
});

describe('paths stay inside plat/ (C-0067)', () => {
  it('insideRoot refuses an absolute path and any .. step', () => {
    expect(insideRoot('bench/src/scan/')).toBe(true);
    expect(insideRoot('/etc/passwd')).toBe(false);
    expect(insideRoot('../research/x.json')).toBe(false);
    expect(insideRoot('bench/../../x')).toBe(false);
    expect(insideRoot('')).toBe(false);
  });
});
