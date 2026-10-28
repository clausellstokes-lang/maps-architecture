// M0-f-02b: the tier jobs' own command (bench/src/tier-jobs/cli.ts; C-0447), driven in-process over FIXTURE trees.
// Only `node` itself is spawned (the watch and the replay protocol); no tier, harness or vitest run (C-0105).
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import {
  edgeHangs,
  edgeLog,
  edgeUnit,
  EXIT_DEADLINE,
  firstDifference,
  loggedFixtures,
  main,
  redirectedSummary,
  replayFixture,
  runRedirected,
  sameSummary,
  testFileOf,
  watch,
  type FixtureLike,
  type ReplayResult,
} from '../../src/tier-jobs/cli.js';
import { removeTrees, tree, write } from './support.js';

// the job lists read @plat/testkit's primitive list (its first import takes seconds on this class of machine)
vi.setConfig({ testTimeout: 60_000 });

afterAll(removeTrees);

const node = process.execPath;
const quietLog = (lines: string[]) => (l: string): void => void lines.push(l);

describe('firstDifference: the path of the first differing key of two JSON values', () => {
  it('null when deep-equal; the key, the index or the type change otherwise', () => {
    expect(firstDifference({ a: [1, { b: 2 }], c: 'x' }, { a: [1, { b: 2 }], c: 'x' })).toBeNull();
    expect(firstDifference({ a: [1, { b: 2 }] }, { a: [1, { b: 3 }] })).toBe('$.a[1].b');
    expect(firstDifference({ a: [1, 2] }, { a: [1, 2, 3] })).toBe('$.a[2]');
    expect(firstDifference({ a: 1 }, { a: 1, z: 0 })).toBe('$.z');
    expect(firstDifference({ a: 1, z: 0 }, { a: 1 })).toBe('$.z');
    expect(firstDifference({ a: null }, { a: 0 })).toBe('$.a');
    expect(firstDifference({ a: [] }, { a: {} })).toBe('$.a');
    expect(firstDifference(1, '1')).toBe('$');
  });
});

describe("same-summary: a harness's fresh summary against the committed one, byte for byte (the x-05 notes' row 5)", () => {
  const committed = '{\n  "item": "M0-zz-05",\n  "covered": true,\n  "rows": [1, 2]\n}\n';
  it('exit 0 naming the sha256 when the bytes agree', () => {
    const root = tree({ 'docs/build/summaries/M0-zz-05.json': committed });
    const out = tree({ 'summaries/M0-zz-05.json': committed });
    const r = sameSummary('M0-zz-05', { root, out });
    expect(r.code).toBe(0);
    expect(r.lines[0]).toMatch(/^same-summary: M0-zz-05 reproduced byte for byte in a second process \(sha256 [0-9a-f]{64}\)$/);
  });
  it('exit 1 naming the first differing key; the bytes alone differing (layout) named as such', () => {
    const root = tree({ 'docs/build/summaries/M0-zz-05.json': committed });
    let out = tree({ 'summaries/M0-zz-05.json': committed.replace('[1, 2]', '[1, 3]') });
    let r = sameSummary('M0-zz-05', { root, out });
    expect([r.code, r.lines[0].endsWith('first differing key $.rows[1]')]).toEqual([1, true]);
    out = tree({ 'summaries/M0-zz-05.json': JSON.stringify(JSON.parse(committed)) });
    r = sameSummary('M0-zz-05', { root, out });
    expect([r.code, r.lines[0].endsWith('the values agree, the bytes do not (key order or layout)')]).toEqual([1, true]);
  });
  it('exit 1 when either side is missing: the committed baseline (§13.8 Edges) or this run\'s', () => {
    const root = tree({ 'docs/build/summaries/M0-zz-05.json': committed });
    expect(sameSummary('M0-zz-05', { root, out: tree() }).code).toBe(1);
    expect(sameSummary('M0-zz-05', { root: tree(), out: tree({ 'summaries/M0-zz-05.json': committed }) })).toEqual({ code: 1, lines: ['same-summary: the committed docs/build/summaries/M0-zz-05.json is missing (§13.8 Edges)'] });
  });
});

describe('harness: a bench harness run with its summary redirected under PLAT_BENCH_OUT (nothing tracked written; C-0411 (4))', () => {
  const harnesses = { 'zz-sum': { folder: 'zz-sum', item: 'M0-zz-07', args: ['first'] }, 'zz-bad': { folder: 'zz-bad', item: 'M0-zz-08' }, 'zz-none': { folder: 'zz-none', item: 'M0-zz-09' } };
  const writer = "import { writeFileSync } from 'node:fs';\nexport function run(args, ctx) { writeFileSync(ctx.summary, JSON.stringify({ args, out: ctx.out }) + '\\n'); return args.includes('fail') ? 1 : 0; }\n";
  it('the harness gets the dispatcher\'s arguments (its entry args first) and ctx.summary under out; the stale redirected summary is removed first', async () => {
    const root = tree({ 'bench/src/zz-sum/index.mjs': writer, 'docs/build/summaries/M0-zz-07.json': 'committed\n' });
    const out = tree({ 'summaries/M0-zz-07.json': 'stale\n' });
    const seen: { args: string[]; ctx: { out: string; summary: string } }[] = [];
    const load = (p: string): Promise<Record<string, unknown>> => {
      expect(p).toBe(join(root, 'bench', 'src', 'zz-sum', 'index.ts'));
      return Promise.resolve({
        run: (args: string[], ctx: { out: string; summary: string }) => {
          seen.push({ args, ctx });
          expect(existsSync(ctx.summary)).toBe(false);
          writeFileSync(ctx.summary, 'fresh\n');
          return 3;
        },
      });
    };
    expect(await runRedirected('zz-sum', ['--x', '1'], { root, out, harnesses, load, log: () => undefined })).toBe(3);
    expect(seen).toEqual([{ args: ['first', '--x', '1'], ctx: { out, summary: redirectedSummary(out, 'M0-zz-07') } }]);
    expect(readFileSync(join(out, 'summaries', 'M0-zz-07.json'), 'utf8')).toBe('fresh\n');
    expect(readFileSync(join(root, 'docs', 'build', 'summaries', 'M0-zz-07.json'), 'utf8')).toBe('committed\n');
  });
  it('a harness that writes the committed summary anyway fails (exit 1) naming the file', async () => {
    const root = tree({ 'docs/build/summaries/M0-zz-07.json': 'committed\n' });
    const lines: string[] = [];
    const load = (): Promise<Record<string, unknown>> => Promise.resolve({ run: () => (writeFileSync(join(root, 'docs', 'build', 'summaries', 'M0-zz-07.json'), 'rewritten\n'), 0) });
    expect(await runRedirected('zz-sum', [], { root, out: tree(), harnesses, load, log: quietLog(lines) })).toBe(1);
    expect(lines[0]).toMatch(/^tier-jobs harness: zz-sum changed the committed summary docs\/build\/summaries\/M0-zz-07\.json \(sha256 [0-9a-f]{64} -> [0-9a-f]{64}\)/);
    // a harness that creates the committed summary where none was is caught the same way
    const fresh = tree();
    const load2 = (): Promise<Record<string, unknown>> => Promise.resolve({ run: () => (write(fresh, 'docs/build/summaries/M0-zz-07.json', 'new\n'), 0) });
    expect(await runRedirected('zz-sum', [], { root: fresh, out: tree(), harnesses, load: load2, log: () => undefined })).toBe(1);
  });
  it('exit 2 for a harness exporting no run; 64 for an unknown name, a tier entry or the timing phase (C-0088); a non-number exit reads 0', async () => {
    const lines: string[] = [];
    const none = (): Promise<Record<string, unknown>> => Promise.resolve({});
    expect(await runRedirected('zz-none', [], { root: tree(), out: tree(), harnesses, load: none, log: quietLog(lines) })).toBe(2);
    expect(lines).toEqual(['not built: M0-zz-09 (bench/src/zz-none/index.ts exports no run)']);
    for (const name of ['nosuch', 'tier:pr', 'tier:nightly', 'tier:milestone', 'timing-phase']) {
      expect(await runRedirected(name, [], { root: tree(), out: tree(), harnesses: { ...harnesses, 'tier:pr': { folder: 'tiers', item: 'M0-f-02a' }, 'timing-phase': { folder: 'timing-phase', item: 'M0-t-00' } }, load: none, log: () => undefined })).toBe(64);
    }
    const undef = (): Promise<Record<string, unknown>> => Promise.resolve({ run: () => undefined });
    expect(await runRedirected('zz-sum', [], { root: tree(), out: tree(), harnesses, load: undef, log: () => undefined })).toBe(0);
  });
  it("the real dispatcher's map: the three redirected harnesses resolve to their folders, and each entry honours ctx.summary", async () => {
    const { harnessMap, PLAT_ROOT } = await import('../../src/tier-jobs/cli.js');
    const map = await harnessMap(PLAT_ROOT);
    expect([map['crosshost'], map['determinism'], map['ladder-coverage']]).toEqual([
      { folder: 'crosshost', item: 'M0-d-06' },
      { folder: 'determinism', item: 'M0-d-09' },
      { folder: 'ladder-coverage', item: 'M0-x-05' },
    ]);
    for (const f of ['crosshost', 'determinism', 'ladder-coverage']) expect(readFileSync(join(PLAT_ROOT, 'bench', 'src', f, 'index.ts'), 'utf8')).toMatch(/ctx\.summary \?\? SUMMARY_PATH/);
  });
});

describe('watch: a command in its own process group, stopped at its deadline (exit 124)', () => {
  it("passes the command's exit code through; a run past the deadline is stopped with its children and exits 124", async () => {
    expect(await watch([node, '-e', 'process.exit(3)'], { deadlineMs: 30_000, stdio: 'ignore' })).toMatchObject({ code: 3, timedOut: false });
    const marker = join(tree(), 'grandchild-alive');
    // the child starts a grandchild that would write the marker after 1.5 s; stopping the group stops it too
    const inner = `setTimeout(() => require('fs').writeFileSync(${JSON.stringify(marker)}, 'x'), 1500)`;
    const script = `require('child_process').spawn(process.execPath, ['-e', ${JSON.stringify(inner)}], { stdio: 'ignore' }); setInterval(() => {}, 1000); setTimeout(() => process.exit(9), 8000);`;
    const r = await watch([node, '-e', script], { deadlineMs: 300, graceMs: 200, stdio: 'ignore' });
    expect([r.code, r.timedOut, EXIT_DEADLINE]).toEqual([124, true, 124]);
    expect(r.ms).toBeLessThan(5_000);
    await new Promise((res) => setTimeout(res, 2_000));
    expect(existsSync(marker)).toBe(false);
  }, 20_000);
  it('rejects an empty command line', async () => {
    await expect(watch([], { deadlineMs: 10 })).rejects.toThrow('watch: an empty command line');
  });
});

describe("edge: one edge-suite test file's vitest run, its outcomes logged under PLAT_BENCH_OUT (PLAT_EDGE_LOG)", () => {
  it('names the log after the file, removes a stale one, passes PLAT_EDGE_LOG and the exit code; a deadline stop says the post-hoc unit attributes it', async () => {
    const out = tree({ 'edge-suite/cells.test.ts.jsonl': 'stale\n' });
    const argv = ['corepack', 'pnpm', 'exec', 'vitest', 'run', '--project', 'testkit', 'packages/testkit/test/edge/cells.test.ts'];
    expect(testFileOf(argv)).toBe('packages/testkit/test/edge/cells.test.ts');
    expect(edgeLog(out, 'packages/testkit/test/edge/cells.test.ts')).toBe(join(out, 'edge-suite', 'cells.test.ts.jsonl'));
    const seen: { argv: readonly string[]; log: string | undefined; seeds: string | undefined; deadline: number }[] = [];
    const lines: string[] = [];
    const code = await edgeUnit(argv, {
      out,
      deadlineMs: 4_321,
      env: { PLAT_EDGE_SEEDS: '1000' },
      log: quietLog(lines),
      run: (a, o) => {
        seen.push({ argv: a, log: o.env?.['PLAT_EDGE_LOG'], seeds: o.env?.['PLAT_EDGE_SEEDS'], deadline: o.deadlineMs });
        expect(existsSync(join(out, 'edge-suite', 'cells.test.ts.jsonl'))).toBe(false);
        return Promise.resolve({ code: EXIT_DEADLINE, signal: null, timedOut: true, ms: 4_321 });
      },
    });
    expect(code).toBe(124);
    expect(seen).toEqual([{ argv, log: join(out, 'edge-suite', 'cells.test.ts.jsonl'), seeds: '1000', deadline: 4_321 }]);
    expect(lines).toEqual(['tier-jobs edge: packages/testkit/test/edge/cells.test.ts stopped at its deadline of 4321 ms with a run that never returned; the post-hoc unit names the fixture and the seed']);
    expect(await edgeUnit(['corepack', 'pnpm', 'exec', 'vitest'], { out, deadlineMs: 1, log: () => undefined })).toBe(64);
    expect(await edgeUnit(argv, { out, deadlineMs: 9, log: () => undefined, run: () => Promise.resolve({ code: 1, signal: null, timedOut: false, ms: 1 }) })).toBe(1);
  });
});

describe("edge-hangs: the post-hoc hang attribution (the x-06 notes' row 10: a run that never returns, named with its seed)", () => {
  const fx = (id: string, milestone?: string): FixtureLike => ({ id, ...(milestone === undefined ? {} : { milestone }), run: () => null });
  const logLines = (ids: string[]): string => ids.map((id) => JSON.stringify({ id, seed: 1, handling: 'absorbed' })).join('\n') + '\n';
  const noReplay = (): Promise<ReplayResult> => Promise.reject(new Error('no replay expected'));

  it('every built fixture in the logs: exit 0, nothing replayed; a deferred fixture (with a milestone) is never asked for', async () => {
    const out = tree({ 'edge-suite/a.test.ts.jsonl': logLines(['A', 'B']), 'edge-suite/b.test.ts.jsonl': logLines(['C']) });
    const lines: string[] = [];
    expect(await edgeHangs({ out, hangMs: 120_000, seeds: 1000, fixtures: [fx('A'), fx('B'), fx('C'), fx('Z', 'M1')], replay: noReplay, log: quietLog(lines) })).toBe(0);
    expect(lines).toEqual(['tier-jobs edge-hangs: every built fixture (3) returned in the logs (2 file(s)): no unattributed hang']);
    expect(loggedFixtures(join(out, 'edge-suite'))).toEqual({ ids: new Set(['A', 'B', 'C']), logs: 2, unreadable: 0 });
  });

  it('a built fixture missing from the logs is replayed at the run\'s seed count; the first seed not returning is named, the rest listed and not replayed', async () => {
    const out = tree({ 'edge-suite/a.test.ts.jsonl': logLines(['A']) });
    const asked: [string, number, number][] = [];
    const lines: string[] = [];
    const replay = (id: string, n: number, hangMs: number): Promise<ReplayResult> => {
      asked.push([id, n, hangMs]);
      return Promise.resolve(id === 'B' ? { returned: 0, crashed: [], hang: null, code: 0 } : { returned: 41, crashed: [], hang: { seed: 2651453823, ms: 120_250 }, code: null });
    };
    expect(await edgeHangs({ out, hangMs: 120_000, seeds: 1000, fixtures: [fx('A'), fx('B'), fx('C'), fx('D')], replay, log: quietLog(lines) })).toBe(1);
    expect(asked).toEqual([['B', 1000, 120_000], ['C', 1000, 120_000]]);
    expect(lines).toEqual([
      'tier-jobs edge-hangs: 3 built fixture(s) never returned in the logs: B, C, D',
      "tier-jobs edge-hangs: B replayed on 1000 seed(s): 0 returned, 0 threw; no hang — its unit's own failure",
      'tier-jobs edge-hangs: C at seed 2651453823: no return in 120250 ms (a hang, over 120000 ms) after 41 seed(s) returned',
      'tier-jobs edge-hangs: not replayed after the hang: D',
    ]);
  });

  it('a missing fixture whose replay returns on every seed still fails (exit 1): its unit failed for another reason', async () => {
    const out = tree({ 'edge-suite/a.test.ts.jsonl': logLines(['A']) });
    const lines: string[] = [];
    const replay = (): Promise<ReplayResult> => Promise.resolve({ returned: 995, crashed: [7, 8, 9, 10, 11, 12], hang: null, code: 0 });
    expect(await edgeHangs({ out, hangMs: 50, seeds: 1001, fixtures: [fx('A'), fx('B')], replay, log: quietLog(lines) })).toBe(1);
    expect(lines.at(-1)).toBe("tier-jobs edge-hangs: B replayed on 1001 seed(s): 995 returned, 6 threw (seeds 7, 8, 9, 10, 11, …); no hang — its unit's own failure");
  });

  it('no log at all, no built fixture, or an unreadable line: exit 1 naming it (never a vacuous pass, §13.8 Edges)', async () => {
    const lines: string[] = [];
    expect(await edgeHangs({ out: tree(), hangMs: 1, seeds: 1, fixtures: [fx('A')], replay: noReplay, log: quietLog(lines) })).toBe(1);
    expect(lines[0]).toMatch(/^tier-jobs edge-hangs: no edge-suite log under .*edge-suite: the edge units wrote none$/);
    expect(await edgeHangs({ out: tree({ 'edge-suite/a.test.ts.jsonl': logLines(['A']) }), hangMs: 1, seeds: 1, fixtures: [fx('A', 'M1')], replay: noReplay, log: quietLog(lines) })).toBe(1);
    expect(lines.at(-1)).toBe('tier-jobs edge-hangs: no built fixture (§13.8 Edges: an empty fixture set fails naming it)');
    expect(await edgeHangs({ out: tree({ 'edge-suite/a.test.ts.jsonl': `${logLines(['A'])}not json\n` }), hangMs: 1, seeds: 1, fixtures: [fx('A')], replay: noReplay, log: quietLog(lines) })).toBe(1);
  });

  it('replayFixture over the progress protocol: a child that stops returning at a seed is stopped and the seed named; one that finishes counts its returns and throws', async () => {
    const child = (hangAt: number | null): string[] => [
      node,
      '-e',
      `for (const s of [11, 22, 33, 44]) { console.log(JSON.stringify({ start: s })); if (s === ${String(hangAt)}) { setInterval(() => {}, 1000); setTimeout(() => process.exit(9), 8000); break; } if (s === 22) { console.log(JSON.stringify({ crash: s })); continue; } console.log(JSON.stringify({ done: s, ms: 1 })); }`,
    ];
    // a threshold well above a loaded machine's line-to-line gap, so only the planted stop reads as a hang
    const hung = await replayFixture('X', 4, { hangMs: 1_500, pollMs: 20, argv: child(33) });
    expect([hung.returned, hung.crashed, hung.hang?.seed, hung.code]).toEqual([1, [22], 33, null]);
    expect(hung.hang?.ms).toBeGreaterThan(1_500);
    // (each planted child also exits on its own after 8 s, so a broken stop fails the test instead of leaving it waiting)
    const fine = await replayFixture('X', 4, { hangMs: 10_000, pollMs: 20, argv: child(null) });
    expect(fine).toEqual({ returned: 3, crashed: [22], hang: null, code: 0 });
  }, 20_000);
});

describe('the command line: every command checks its arguments (exit 64 on a bad one)', () => {
  it('refuses missing or malformed arguments and unknown commands', async () => {
    const out = tree();
    for (const argv of [[], ['nosuch'], ['harness'], ['watch', '--', 'x'], ['watch', '--deadline-ms', '0', '--', 'x'], ['edge', '--deadline-ms', '5'], ['edge-hangs', '--hang-ms', 'x'], ['edge-replay', 'A'], ['edge-replay', 'A', '0'], ['same-summary'], ['summary', '--tier', 'weekly', '--report', 'x'], ['summary', '--tier', 'pr'], ['receipt'], ['receipt', '--tier', 'pr', '--sample', 'x'], ['receipt', '--tier', 'pr', '--unit-cap-ms', '0']]) {
      const lines: string[] = [];
      expect([argv, await main(argv, { out, log: quietLog(lines) })]).toEqual([argv, 64]);
      expect(lines.at(-1)).toMatch(/^tier-jobs: bad arguments /);
    }
  });
  it('watch through the command: the exit code passed, a deadline stop 124', async () => {
    const out = tree();
    expect(await main(['watch', '--deadline-ms', '30000', '--', node, '-e', 'process.exit(5)'], { out, log: () => undefined })).toBe(5);
    const lines: string[] = [];
    expect(await main(['watch', '--deadline-ms', '200', '--', node, '-e', 'setInterval(() => {}, 1000); setTimeout(() => process.exit(9), 8000)'], { out, log: quietLog(lines) })).toBe(124);
    expect(lines).toEqual(['tier-jobs watch: stopped at its deadline of 200 ms']);
  }, 20_000);
});
