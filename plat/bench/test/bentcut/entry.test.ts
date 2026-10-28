// The bench entry `corepack pnpm bench -- bentcut` (M0-b-04; C-0067: the full report to PLAT_BENCH_OUT, the numbers-only
// summary only with --summary, checks/M0-spec-notes.md N-03; C-0091's work block; C-0105: the entry's `run` is called
// in-process at a toy size). One test runs the dispatcher itself across two worker threads (the pool's only path that
// vitest cannot load in-process) and compares its report with the in-process one.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { bentcut, DEFAULT_SIZES, parseArgs, PLAT_ROOT, run, runFcut, runFull, runTask, SUMMARY_PATH, t34Task, type BentCutReport, type FaceRecord, type FullRecord, type Task } from '../../src/bentcut/index.js';

const dir = mkdtempSync(join(tmpdir(), 'bentcut-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

const TOY = ['--fcut', '6', '--districts', '2', '--sig', '1', '--t34', '60'];

function withoutSeconds(path: string): unknown {
  const r = JSON.parse(readFileSync(path, 'utf8')) as Record<string, unknown>;
  delete r['seconds'];
  return r;
}

describe('bench -- bentcut: its arguments', () => {
  it('defaults to the bars’ sizes: 10⁵ F-CUT faces and T34-1’s 10 000 draws', () => {
    const a = parseArgs([], {});
    expect(typeof a).not.toBe('string');
    if (typeof a === 'string') return;
    expect(a.sizes).toEqual(DEFAULT_SIZES);
    expect([DEFAULT_SIZES.fcut, DEFAULT_SIZES.t34]).toEqual([100_000, 10_000]);
    expect(a.phases).toEqual(['fcut', 'residue', 'signature', 't34']);
    expect(a.workers).toBe(1);
    expect(a.summary).toBe(false);
    const w = parseArgs(['--workers', '3'], {});
    expect(typeof w !== 'string' && w.workers).toBe(3);
    const e = parseArgs([], { PLAT_BENCH_WORKERS: '4' });
    expect(typeof e !== 'string' && e.workers).toBe(4);
  });

  it('refuses an unknown or repeated argument, a bad size, a bad phase and --summary on a partial run (exit 64)', async () => {
    for (const bad of [['--nope'], ['--fcut', '0'], ['--fcut', 'x'], ['--fcut'], ['--t34', '1'], ['--seed', '-1'], ['--workers', '0'], ['--only', 'fcut,nope'], ['--fcut', '3', '--fcut', '4'], ['--only', 'fcut', '--summary']]) {
      expect([bad.join(' '), typeof parseArgs(bad, {})]).toEqual([bad.join(' '), 'string']);
    }
    expect(typeof parseArgs([], { PLAT_BENCH_WORKERS: 'many' })).toBe('string');
    expect(await run(['--nope'], { out: dir })).toBe(64);
    const only = parseArgs(['--only', 't34,fcut'], {});
    expect(typeof only !== 'string' && only.phases).toEqual(['fcut', 't34']);
  });
});

describe('bench -- bentcut: a toy run', () => {
  it('exits 0 when the bars hold, writes the full report, and the summary only with --summary', { timeout: 600_000 }, async () => {
    const summary = join(dir, 'summary.json');
    let report: BentCutReport | undefined;
    expect(await run(TOY, { out: dir, summary, onReport: (r) => (report = r) })).toBe(0);
    expect(existsSync(summary)).toBe(false);
    expect(existsSync(join(dir, 'bentcut', 'report.json'))).toBe(true);
    expect(report?.verdicts).toEqual({ fcut: true, corner: true, arrival: true, t34: true });
    expect(await run([...TOY, '--summary'], { out: dir, summary })).toBe(0);
    const s = JSON.parse(readFileSync(summary, 'utf8')) as Record<string, unknown>;
    expect(Object.keys(s)).toEqual(['item', 'sizes', 'pass', 'verdicts', 'fcut', 'residue', 'signature', 't34', 'work']);
    expect(s['item']).toBe('M0-b-04');
    // C-0091: the quantile block per counter the run charged (all three of S8's counters), with the unit and its counts.
    const work = s['work'] as { counters: Record<string, { unit: string; units: Record<string, number>; unitsTotal: number; perUnit: Record<string, number> }> };
    expect(Object.keys(work.counters)).toEqual(['cut.kernelCalls', 'cut.recursionDepth', 'cut.candidates']);
    for (const c of Object.values(work.counters)) {
      expect(c.unit).toBe('faces');
      expect(Object.keys(c.perUnit)).toEqual(['n', 'p50', 'p99', 'p999', 'max']);
      for (const v of Object.values(c.perUnit)) expect(Number.isFinite(v)).toBe(true);
      expect(c.perUnit['n']).toBeGreaterThan(0);
      expect(c.perUnit['max']).toBeGreaterThan(0);
      expect(c.unitsTotal).toBeGreaterThan(0);
    }
    // The default summary path is the item's (C-0067).
    expect(SUMMARY_PATH.endsWith(join('docs', 'build', 'summaries', 'M0-b-04.json'))).toBe(true);
  });

  it('exits 1 when a bar fails (a planted 7-call ladder)', { timeout: 600_000 }, async () => {
    let report: BentCutReport | undefined;
    const code = await run(['--fcut', '4', '--only', 'fcut'], { out: dir, onReport: (r) => (report = r), runTask: (t) => (t.phase === 'fcut' && t.i === 1 ? { ...runFcut(t), kernelCalls: 7 } : t.phase === 'fcut' ? runFcut(t) : runFull(t)) });
    expect(code).toBe(1);
    expect(report?.verdicts.fcut).toBe(false);
    expect(report?.fcut?.maxKernelCalls).toBe(7);
  });

  it('the report reproduces byte for byte (seeded), and does not depend on the worker count', { timeout: 600_000 }, async () => {
    const a = join(dir, 'a');
    const b = join(dir, 'b');
    expect(await run(TOY, { out: a })).toBe(0);
    expect(await run(TOY, { out: b })).toBe(0);
    expect(withoutSeconds(join(b, 'bentcut', 'report.json'))).toEqual(withoutSeconds(join(a, 'bentcut', 'report.json')));
    // The dispatcher across two worker threads (tsx with the plat-source condition, as `corepack pnpm bench` runs it).
    const c = join(dir, 'c');
    const p = spawnSync('corepack', ['pnpm', '--silent', 'bench', '--', 'bentcut', ...TOY, '--workers', '2'], { cwd: PLAT_ROOT, env: { ...process.env, PLAT_BENCH_OUT: c }, encoding: 'utf8', timeout: 540_000 });
    expect([p.status, p.stderr.slice(0, 400)]).toEqual([0, '']);
    expect(p.stdout).toContain('2 worker(s)');
    expect(withoutSeconds(join(c, 'bentcut', 'report.json'))).toEqual(withoutSeconds(join(a, 'bentcut', 'report.json')));
  });
});

describe('bench -- bentcut: T34-1 does not depend on the worker count (C-0242 (7); the closing check of round S1)', () => {
  it('the report at 1 worker equals the one at 6 and 7 (batches of 10, 12, 14), and t34.faces counts the faces up to the n-th draw', { timeout: 600_000 }, async () => {
    // An in-thread runner (the pool runs a test's runner in this thread) with a cache: each face runs whole once.
    const cache = new Map<string, FaceRecord>();
    const runner = (t: Task): FaceRecord => {
      const k = JSON.stringify(t);
      let r = cache.get(k);
      if (r === undefined) {
        r = runTask(t);
        cache.set(k, r);
      }
      return r;
    };
    const at = async (w: number): Promise<BentCutReport> => {
      const a = parseArgs(['--only', 't34', '--t34', '30', '--workers', String(w)], {});
      if (typeof a === 'string') throw new Error(a);
      return bentcut(a, () => {}, runner);
    };
    const one = await at(1);
    for (const w of [6, 7]) expect([w, await at(w)]).toEqual([w, one]);
    // The faces round the kinds, in order, up to the one that supplies the 30th draw — counted here, apart from bentcut.
    let draws = 0;
    let faces = 0;
    while (draws < 30) {
      draws += (runner(t34Task(faces, 1)) as FullRecord).g.length;
      faces += 1;
    }
    expect(one.t34?.n).toBe(30);
    expect(one.t34?.faces).toBe(faces);
    expect(one.work?.counters['cut.kernelCalls']?.districts).toBe(faces);
  });
});
