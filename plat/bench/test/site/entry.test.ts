// The bench entry `corepack pnpm bench -- site` (M0-e-06; M0-work.json's test 1: "the harness reproduces its report byte
// for byte (seeded)"; C-0067: the full report to PLAT_BENCH_OUT, the numbers-only summary only with --summary; C-0091;
// C-0105: the entry's `run` called in-process at the test size). The report is derived twice — once in this process on
// one thread, once by the dispatcher in a child process across two worker threads — and the two files are equal byte
// for byte; the stage times live beside the report, never in it.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { BAR_NAMES, PLAT_ROOT, REPORT_FILE, run, SUMMARY_PATH, TIMING_FILE, type SiteSpikeReport, type TimingBlock } from '../../src/site/index.js';

const dir = mkdtempSync(join(tmpdir(), 'site-spike-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

const HEAVY = 1_200_000;
const ARGS = ['--seeds', '2', '--fixture', 'relief-60', '--config', 'default', '--size', 'test'];

describe('bench -- site: the report, reproduced byte for byte (seeded)', () => {
  it('in-process on one thread and by the dispatcher across two worker threads: the same seeds give the same report file', { timeout: HEAVY }, async () => {
    const a = join(dir, 'a');
    const b = join(dir, 'b');
    const summary = join(dir, 'summary.json');
    const code = await run([...ARGS, '--summary'], { out: a, summary });
    const child = spawnSync('corepack', ['pnpm', 'bench', '--', 'site', ...ARGS, '--workers', '2'], { cwd: PLAT_ROOT, env: { ...process.env, PLAT_BENCH_OUT: b, PLAT_BENCH_WORKERS: '' }, encoding: 'utf8', timeout: HEAVY });
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
    expect(existsSync(join(b, 'summary.json'))).toBe(false);
    expect(SUMMARY_PATH.endsWith(join('docs', 'build', 'summaries', 'M0-e-06.json'))).toBe(true);
  });

  it('a bad argument exits 64 before deriving anything, writing nothing', async () => {
    const out = join(dir, 'bad');
    for (const bad of [['--nope'], ['--seeds', '0'], ['--fixture', 'flat'], ['--idle-ms', '1']]) {
      expect(await run(bad, { out })).toBe(64);
    }
    expect(existsSync(join(out, REPORT_FILE))).toBe(false);
  });
});
