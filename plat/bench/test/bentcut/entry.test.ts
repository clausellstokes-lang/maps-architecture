// The bench entry `corepack pnpm bench -- bentcut` (M0-b-04; C-0067: the full report to PLAT_BENCH_OUT, the numbers-only
// summary only with --summary, checks/M0-spec-notes.md N-03; C-0091's work block; C-0105: the entry's `run` is called
// in-process at a toy size). One test runs the dispatcher itself across two worker threads (the pool's only path that
// vitest cannot load in-process) and compares its report with the in-process one.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { bentcut, DEFAULT_SIZES, FCUT_KINDS, parseArgs, PLAT_ROOT, run, runFcut, runFull, runTask, SUMMARY_PATH, t34Task, type BentCutReport, type FaceRecord, type FcutRecord, type FullRecord, type Task } from '../../src/bentcut/index.js';

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
    expect(report?.verdicts).toEqual({ fcut: true, replay: true, corner: true, arrival: true, t34: true });
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

describe('bench -- bentcut: every bar the run judges reaches its exit code (hardening S3, N-4: the checker’s probe 2 as tests)', () => {
  // The toy run's records, each face run once (an in-thread runner with a cache); each case plants one fault on them.
  const SMALL = ['--fcut', '4', '--districts', '2', '--sig', '1', '--t34', '20'];
  const cache = new Map<string, FaceRecord>();
  const real = (t: Task): FaceRecord => {
    const k = JSON.stringify(t);
    let r = cache.get(k);
    if (r === undefined) {
      r = runTask(t);
      cache.set(k, r);
    }
    return r;
  };
  const residue = (t: Task): boolean => t.phase === 'full' && t.replay !== true && (FCUT_KINDS as readonly string[]).includes(t.kind);
  const sig = (t: Task): boolean => t.phase === 'full' && t.replay === true;
  const t34 = (t: Task): boolean => t.phase === 'full' && t.replay !== true && !(FCUT_KINDS as readonly string[]).includes(t.kind);
  const at = async (plant: (t: Task, r: FaceRecord) => FaceRecord): Promise<{ code: number; report: BentCutReport; lines: string[] }> => {
    let report: BentCutReport | undefined;
    const lines: string[] = [];
    const spy = vi.spyOn(process.stdout, 'write').mockImplementation((chunk: string | Uint8Array) => {
      lines.push(String(chunk).replace(/\n$/, ''));
      return true;
    });
    try {
      const code = await run(SMALL, { out: dir, onReport: (r) => (report = r), runTask: (t) => plant(t, real(t)) });
      if (report === undefined) throw new Error('no report');
      return { code, report, lines };
    } finally {
      spy.mockRestore();
    }
  };
  const failing = (r: BentCutReport): string[] => Object.entries(r.verdicts).filter(([, v]) => v === false).map(([k]) => k);

  it('the control holds (exit 0); each planted fault fails exactly its own bar (exit 1)', { timeout: 600_000 }, async () => {
    const control = await at((_, r) => r);
    expect([control.code, failing(control.report)]).toEqual([0, []]);
    // K15: a 7-call ladder below depth 0 in a residue district fails F-CUT (its every-depth records are folded).
    const deep = await at((t, r) => (residue(t) ? { ...(r as FullRecord), ladders: { ...(r as FullRecord).ladders, maxCalls: 7 } } : r));
    expect([deep.code, failing(deep.report), deep.report.fcut?.allDepths.maxKernelCalls]).toEqual([1, ['fcut'], 7]);
    // A residue district S8 threw on fails F-CUT.
    const threw = await at((t, r) => (residue(t) && t.i === 0 && t.kind === 'concave' ? { ...(r as FullRecord), refused: 'threw: planted' } : r));
    expect([threw.code, failing(threw.report), threw.report.fcut?.allDepths.refused]).toEqual([1, ['fcut'], 1]);
    // K16: the corner clause, the arrival clause and T34-1 each reach the exit code on their own.
    const offMid = await at((t, r) => (sig(t) ? { ...(r as FullRecord), cuts: (r as FullRecord).cuts.map((c) => (c.bends === 1 ? { ...c, cornerT: 0.9 } : c)) } : r));
    expect([offMid.code, failing(offMid.report)]).toEqual([1, ['corner']]);
    const steep = await at((t, r) => (sig(t) ? { ...(r as FullRecord), cuts: (r as FullRecord).cuts.map((c) => ({ ...c, arrivalCdeg: 8000 })) } : r));
    expect([steep.code, failing(steep.report)]).toEqual([1, ['arrival']]);
    const g = await at((t, r) => (t34(t) || sig(t) ? { ...(r as FullRecord), g: (r as FullRecord).g.map(() => 0.5) } : r));
    expect([g.code, failing(g.report)]).toEqual([1, ['t34']]);
    // N-3: one planner cut the replay missed fails the replay gate, and so the run.
    const missed = await at((t, r) => {
      const f = r as FullRecord;
      return sig(t) && t.kind === 'curved' && f.counts !== null ? { ...f, counts: { ...f.counts, missed: 1, misses: ['planted'] } } : r;
    });
    expect([missed.code, failing(missed.report)]).toEqual([1, ['replay']]);
    // A signature district whose replay fell back to S8's own run (counts null, its cuts unmeasured) fails it too.
    const fell = await at((t, r) => (sig(t) && t.kind === 'holed' ? { ...(r as FullRecord), cuts: [], counts: null, arrivals: null } : r));
    expect([fell.code, failing(fell.report), fell.report.signature?.replay.notReplayed]).toEqual([1, ['replay'], 1]);
  });

  it('prints the unresolved ladders beside the F-CUT verdict, which they do not fail (N-1; the text verbatim)', { timeout: 600_000 }, async () => {
    const plant = (t: Task, r: FaceRecord): FaceRecord => {
      if (t.phase === 'fcut' && t.kind === 'concave' && t.i === 1) return { ...(r as FcutRecord), outcome: 'unresolved', kernelCalls: 0, facesAfterLadder: 1, facesAfter: 1 };
      if (residue(t) && t.kind === 'concave' && t.i === 0) return { ...(r as FullRecord), ladders: { ...(r as FullRecord).ladders, unresolved: 2 } };
      return r;
    };
    const { code, report, lines } = await at(plant);
    expect(code).toBe(0);
    expect(report.fcut?.unresolved).toBe(1);
    expect(report.fcut?.outcomes['unresolved']).toBe(1);
    expect(report.fcut?.allDepths.unresolved).toBe(2);
    const verdict = lines.find((l) => l.startsWith('bentcut: F-CUT ') && l.includes('faces run of'));
    expect(verdict).toMatch(/^bentcut: F-CUT 4 faces run of 4 \(0 not built, 0 refused by S8\): 1 ladders ended unresolved \(every rung refused, the face left whole: the ladder ended, no pass of rung \(c\); reported, not judged\); the ladder ends in ≤ \d kernel calls, 0 face-count decreases — HOLDS$/);
    expect(lines.find((l) => l.startsWith('bentcut: F-CUT at every depth'))).toMatch(/, 2 ladders ended unresolved$/);
    expect(lines.find((l) => l.startsWith('bentcut: F-CUT depth-0 kernel calls '))).toMatch(/; outcomes \{.*"unresolved":1.*\}$/);
    // The replay gate's and the committed arrival's lines (N-3, N-2).
    expect(lines.find((l) => l.startsWith('bentcut: replay over '))).toMatch(/^bentcut: replay over 5 signature faces: 0 districts not replayed \(S8's own run stood, its cuts unmeasured\); 0 of \d+ planner cuts missed \(the bound 0\) — HOLDS$/);
    expect(lines.find((l) => l.startsWith('bentcut: arrival ≥ 85° read from the committed geometry'))).toMatch(/^bentcut: arrival ≥ 85° read from the committed geometry \(reported, not judged\): planner lanes [0-9.]+ % of \d+ ends \(\d+ unmeasured\), all lanes [0-9.]+ % of \d+ ends \(\d+ unmeasured\)$/);
  });
});
