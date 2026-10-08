// The bench entry `corepack pnpm bench -- site` (M0-e-06; M0-work.json's test 1: "the harness reproduces its report byte
// for byte (seeded)"; C-0067: the full report to PLAT_BENCH_OUT, the numbers-only summary only with --summary; C-0091;
// C-0105: the entry's `run` called in-process at the test size). The report is derived twice — once in this process on
// one thread, once by the dispatcher in a child process across two worker threads — and the two files are equal byte
// for byte; the stage times live beside the report, never in it. The pool keeps task order whatever order its workers
// finish in: a planted worker answers the first task last, and the records, the report and the times stay in task order
// (C-0275 (1)). Without --summary nothing touches the committed summary (its bytes and mtime are compared around both
// runs, and restored should a regression rewrite it; C-0275 (2)).
import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { BAR_NAMES, foldReport, PLAT_ROOT, REPORT_FILE, run, runSpikeTasks, SUMMARY_PATH, TIMING_FILE, type SiteSpikeReport, type SpikeResult, type SpikeTask, type TimingBlock } from '../../src/site/index.js';

const dir = mkdtempSync(join(tmpdir(), 'site-spike-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

const HEAVY = 1_200_000;
const ARGS = ['--seeds', '2', '--fixture', 'relief-60', '--config', 'default', '--size', 'test'];

/** A planted worker module (a data: URL, plain JavaScript): it answers task `at` with `results[at]` after `delays[at]` ms. */
function plantedWorker(results: readonly unknown[], delays: readonly number[]): URL {
  const src = `import { parentPort } from 'node:worker_threads';
const R = ${JSON.stringify(results)};
const D = ${JSON.stringify(delays)};
parentPort.on('message', (m) => { setTimeout(() => parentPort.postMessage({ at: m.at, result: R[m.at] }), D[m.at]); });
`;
  return new URL(`data:text/javascript,${encodeURIComponent(src)}`);
}

/** The committed summary's bytes and mtime, or null when it does not exist. */
function summaryState(): { bytes: Buffer; mtimeMs: number } | null {
  return existsSync(SUMMARY_PATH) ? { bytes: readFileSync(SUMMARY_PATH), mtimeMs: statSync(SUMMARY_PATH).mtimeMs } : null;
}

describe('bench -- site: the report, reproduced byte for byte (seeded)', () => {
  it('in-process on one thread and by the dispatcher across two worker threads: the same seeds give the same report file', { timeout: HEAVY }, async () => {
    const a = join(dir, 'a');
    const b = join(dir, 'b');
    const summary = join(dir, 'summary.json');
    const before = summaryState();
    let code: number;
    let child: SpawnSyncReturns<string>;
    let afterInProcess: ReturnType<typeof summaryState>;
    let afterChild: ReturnType<typeof summaryState>;
    try {
      code = await run([...ARGS, '--summary'], { out: a, summary });
      afterInProcess = summaryState();
      child = spawnSync('corepack', ['pnpm', 'bench', '--', 'site', ...ARGS, '--workers', '2'], { cwd: PLAT_ROOT, env: { ...process.env, PLAT_BENCH_OUT: b, PLAT_BENCH_WORKERS: '' }, encoding: 'utf8', timeout: HEAVY });
      afterChild = summaryState();
    } finally {
      // a regression must not leave the committed summary rewritten by this test's test-size run (a CITY summary another
      // run wrote meanwhile is left alone)
      const now = summaryState();
      const ours = now !== null && (JSON.parse(now.bytes.toString('utf8')) as { size?: string }).size === 'test';
      if (ours && before !== null) writeFileSync(SUMMARY_PATH, before.bytes);
      if (ours && before === null) rmSync(SUMMARY_PATH);
    }
    // --summary in-process wrote the context's path only; the child, without --summary, wrote no summary anywhere: the
    // committed summary (the path a run without a context's summary would write) is untouched, bytes and mtime
    expect(afterInProcess).toEqual(before);
    expect(afterChild).toEqual(before);
    expect(child.stdout).not.toContain('site: summary');
    const textA = readFileSync(join(a, REPORT_FILE), 'utf8');
    const textB = readFileSync(join(b, REPORT_FILE), 'utf8');
    expect(textB).toBe(textA);
    const rep = JSON.parse(textA) as SiteSpikeReport;
    // the exit code is the report's verdict, the child's the same
    expect(code).toBe(rep.pass ? 0 : 1);
    expect(child.status).toBe(code);
    expect(child.stdout).toContain('site: 2 derivations');
    expect(child.stdout).toContain('on 2 worker(s)');
    // the report: what was run, one record per seed in seed order, every bar judged
    expect(rep.item).toBe('M0-e-06');
    expect([rep.size, rep.seeds, rep.fixtures, rep.configs]).toEqual(['test', { first: 1, count: 2 }, ['relief-60'], ['default']]);
    expect(rep.records.map((r) => [r.fixture, r.config, r.seed])).toEqual([
      ['relief-60', 'default', 1],
      ['relief-60', 'default', 2],
    ]);
    expect(Object.keys(rep.verdicts)).toEqual([...BAR_NAMES]);
    expect(rep.groups[0].runs).toBe(2);
    // the seed reaches the receipts: the two seeds' records differ
    expect(JSON.stringify(rep.records[0])).not.toBe(JSON.stringify(rep.records[1]));
    // no time in the report: the times are the timing file's
    expect(textA).not.toMatch(/"(ms|stageMs|wallMs|gateP50|stageP50)"/);
    const times = JSON.parse(readFileSync(join(a, TIMING_FILE), 'utf8')) as TimingBlock[];
    expect(times.map((t) => [t.fixture, t.config, t.mode, t.runs])).toEqual([['relief-60', 'default', 'informative', 2]]);
    expect(times[0].judgement).toBeNull();
    expect(Object.keys(times[0].stageP50)).toEqual(['S1', 'S3', 'S4', 'S5', 'S6'].filter((s) => times[0].stageP50[s] !== undefined));
    // --summary wrote the numbers-only summary where the context said, and only there
    const s = JSON.parse(readFileSync(summary, 'utf8')) as Record<string, unknown>;
    expect(s['item']).toBe('M0-e-06');
    expect(s['verdicts']).toEqual(rep.verdicts);
    expect(JSON.stringify(s)).not.toContain('"records"');
    expect(SUMMARY_PATH.endsWith(join('docs', 'build', 'summaries', 'M0-e-06.json'))).toBe(true);
    // the pool keeps task order when the workers finish out of it: the first task's worker answers 400 ms after the
    // second's, and the records it returns fold to the same report, byte for byte, with each task's own times
    const tasks: SpikeTask[] = rep.records.map((r) => ({ fixture: r.fixture, config: r.config, seed: r.seed, size: 'test' }));
    const planted = rep.records.map((record, i) => ({ record, times: { S1: 1000 + i, S4: 2000 + i } }));
    const order: number[] = [];
    const out = await runSpikeTasks(tasks, 2, (done) => order.push(done), [], plantedWorker(planted, [400, 0]));
    expect(order).toEqual([1, 2]);
    expect(out.map((x) => x.times)).toEqual(planted.map((x) => x.times));
    const again = foldReport('test', 1, 2, ['relief-60'], ['default'], out.map((x: SpikeResult) => x.record));
    expect(`${JSON.stringify(again, null, 2)}\n`).toBe(textA);
  });

  it('the pool puts each result back at its task\'s place: seven tasks on three workers, finishing in reverse order', async () => {
    const tasks: SpikeTask[] = Array.from({ length: 7 }, (_, i) => ({ fixture: 'relief-60', config: 'default', seed: i + 1, size: 'test' }));
    const results = tasks.map((t) => ({ record: { seed: t.seed }, times: { S1: t.seed } }));
    const out = await runSpikeTasks(tasks, 3, undefined, [], plantedWorker(results, tasks.map((_, i) => (7 - i) * 60)));
    expect(out.map((x) => x.record.seed)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(out.map((x) => x.times)).toEqual(results.map((x) => x.times));
  });

  it('a bad argument exits 64 before deriving anything, writing nothing', async () => {
    const out = join(dir, 'bad');
    for (const bad of [['--nope'], ['--seeds', '0'], ['--fixture', 'flat'], ['--idle-ms', '1']]) {
      expect(await run(bad, { out })).toBe(64);
    }
    expect(existsSync(join(out, REPORT_FILE))).toBe(false);
  });
});
