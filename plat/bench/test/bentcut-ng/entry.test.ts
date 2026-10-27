// The entry `corepack pnpm bench -- bentcut-ng --phase a | b` (M0-b-05; C-0113's dispatcher entry, C-0117: "the entry
// with --phase a | b"; the checker's line: "the entry's two phases dispatch and the folder has one owner"). Its
// arguments and refusals, both phases dispatched in-process on in-memory inputs (C-0105: no tier script, no file
// outside plat/), the report removed before a run (M0-k-05's closing check, N-h), the run item's summary with its
// `reviewed` block (C-0121), and phase b's --apply of the searched cut.flattenM.
import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_SIZES, parseArgs, run, runNgTask, SUMMARY_FILES, type NgComparisonReport, type NgRecord, type NgTask } from '../../src/bentcut-ng/index.js';
import { baselinesText, got, MEM_ROOT, ngFacesText, ngFile, put, resetMem, row, scalar, threeFaces } from './support.js';

const mem = vi.hoisted(() => ({ root: '', files: new Map<string, Uint8Array>(), log: [] as { op: string; path: string; virtual: boolean }[] }));
vi.mock('node:fs', async (orig) => (await import('./memfs.js')).memFs(await orig<typeof import('node:fs')>(), mem));

const RULE = ['--frame', 'recorded', '--attempts', '3'];

/** The real NG face runner, each task run once (the tests below share its records). */
const cache = new Map<string, NgRecord>();
function cached(t: NgTask): NgRecord {
  const k = JSON.stringify([t.face.id, t.seed, t.seedIndex, t.flattenM ?? null, t.bars]);
  let r = cache.get(k);
  if (r === undefined) {
    r = runNgTask(t);
    cache.set(k, r);
  }
  return r;
}

async function quiet<T>(f: () => Promise<T>): Promise<{ value: T; lines: string }> {
  const spy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  try {
    const value = await f();
    return { value, lines: spy.mock.calls.map((c) => String(c[0])).join('') };
  } finally {
    spy.mockRestore();
  }
}

describe('bench -- bentcut-ng: its arguments', () => {
  it('takes a phase and the frame rule, the rest defaulted to the run sizes', () => {
    const a = parseArgs(['--phase', 'a', ...RULE], {});
    expect(typeof a).not.toBe('string');
    if (typeof a === 'string') return;
    expect([a.phase, a.rule, a.baselines, a.seed, a.perKind, a.workers, a.apply, a.summary]).toEqual(['a', { frame: 'recorded', attempts: 3 }, 'packages/testkit/baselines/baselines.json', 1, 100, 1, false, false]);
    const b = parseArgs(['--phase', 'b', '--frame', 'first', '--attempts', '1', '--seeds', '2', '--flatten', '0.5:1:0.25', '--workers', '3'], {});
    expect(typeof b !== 'string' && [b.phase, b.rule, b.faces, b.seeds, b.flatten, b.flattenSeeds, b.workers]).toEqual(['b', { frame: 'first', attempts: 1 }, 'packages/testkit/baselines/ng-faces.json', 2, { lo: 0.5, hi: 1, step: 0.25 }, 1, 3]);
    const n = parseArgs(['--phase', 'b', ...RULE, '--flatten', 'none'], { PLAT_BENCH_WORKERS: '4' });
    expect(typeof n !== 'string' && [n.flatten, n.workers, n.seeds]).toEqual([null, 4, DEFAULT_SIZES.seeds]);
  });

  it('refuses a run without a phase or a frame rule, an unknown or repeated argument, a phase\'s flag in the other phase, and --apply without its inputs (exit 64)', async () => {
    const bad = [
      [],
      ['--phase', 'c', ...RULE],
      ['--phase', 'a'],
      ['--phase', 'a', '--frame', 'recorded'],
      ['--phase', 'a', '--attempts', '3'],
      ['--phase', 'a', '--frame', 'turned', '--attempts', '3'],
      ['--phase', 'a', ...RULE, '--nope'],
      ['--phase', 'a', ...RULE, '--seed', '1', '--seed', '2'],
      ['--phase', 'a', ...RULE, '--faces', 'x.json'],
      ['--phase', 'b', ...RULE, '--sig', '3'],
      ['--phase', 'b', ...RULE, '--cells', 'c.json'],
      ['--phase', 'a', ...RULE, '--seeds', '2'],
      ['--phase', 'a', ...RULE, '--apply'],
      ['--phase', 'b', ...RULE, '--apply'],
      ['--phase', 'b', ...RULE, '--apply', '--date', '2026-10-05', '--flatten', 'none'],
      ['--phase', 'b', ...RULE, '--date', '5 Oct'],
      ['--phase', 'b', ...RULE, '--flatten', '1:0:0.1'],
      ['--phase', 'b', ...RULE, '--flatten', 'x'],
      ['--phase', 'a', ...RULE, '--sig', '0'],
      ['--phase', 'a', ...RULE, '--workers', '0'],
      ['--phase', 'a', ...RULE, '--seed'],
    ];
    for (const args of bad) expect([args.join(' '), typeof parseArgs(args, {})]).toEqual([args.join(' '), 'string']);
    expect(typeof parseArgs(['--phase', 'a', ...RULE], { PLAT_BENCH_WORKERS: 'many' })).toBe('string');
    const r = await quiet(() => run(['--phase', 'a'], { out: `${MEM_ROOT}/out`, platRoot: MEM_ROOT }));
    expect(r.value).toBe(64);
    expect(r.lines).toContain('never a default');
  });
});

describe('bench -- bentcut-ng: both phases dispatch', () => {
  it('phase a and phase b each run to a report; an earlier report never stands for a stopped run (N-h)', { timeout: 600_000 }, async () => {
    resetMem(mem);
    const base = put(mem, 'e/baselines.json', baselinesText([row('cut.sigma', 'plain', scalar(0.084)), row('cut.sigma', 'ring', scalar(0.094))]));
    const faces = put(mem, 'e/ng-faces.json', ngFacesText(ngFile(threeFaces())));
    const reports: NgComparisonReport[] = [];
    const ctx = { out: `${MEM_ROOT}/out`, platRoot: MEM_ROOT, onReport: (r: NgComparisonReport) => reports.push(r), runNg: cached };
    const a = await quiet(() => run(['--phase', 'a', ...RULE, '--sig', '1', '--baselines', base], ctx));
    const b = await quiet(() => run(['--phase', 'b', ...RULE, '--seeds', '1', '--flatten', '0.7:0.7:0.1', '--baselines', base, '--faces', faces], ctx));
    expect(reports.map((r) => r.phase)).toEqual(['a', 'b']);
    expect([a.value, b.value]).toEqual([reports[0].pass ? 0 : 1, reports[1].pass ? 0 : 1]);
    expect(got(mem, 'out/bentcut-ng/report-a.json')).toBeDefined();
    expect(got(mem, 'out/bentcut-ng/report-b.json')).toBeDefined();
    // Phase b's report: its inputs named by their sha256, the frame rule, the faces' file's provenance.
    const rb = reports[1];
    expect(rb.inputs.ngFaces).toMatchObject({ path: 'e/ng-faces.json', referenceBuild: 'NG-1.2.2', metricsVersion: '1.0.0', faces: 3, hoods: 3 });
    expect(rb.inputs.ngFaces?.sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(rb.inputs.baselines.path).toBe('e/baselines.json');
    expect(rb.frameRule).toEqual({ frame: 'recorded', attempts: 3 });
    expect(Object.keys(rb.inputs.tables)).toEqual(['cut', 'granularity', 'regimes']);
    // A stopped run removes the earlier report of its phase first: no report stands for it.
    const s = await quiet(() => run(['--phase', 'b', ...RULE, '--baselines', base, '--faces', 'e/missing.json'], ctx));
    expect(s.value).toBe(2);
    expect(got(mem, 'out/bentcut-ng/report-b.json')).toBeUndefined();
    expect(got(mem, 'out/bentcut-ng/report-a.json')).toBeDefined();
  });

  it('--summary writes the run item\'s numbers-only summary with its reviewed block; --apply writes the searched cut.flattenM', { timeout: 600_000 }, async () => {
    resetMem(mem);
    const base = put(mem, 'e/baselines.json', baselinesText([row('cut.sigma', 'plain', scalar(0.084))]));
    const faces = put(mem, 'e/ng-faces.json', ngFacesText(ngFile(threeFaces())));
    let rep: NgComparisonReport | undefined;
    const ctx = { out: `${MEM_ROOT}/out`, platRoot: MEM_ROOT, onReport: (r: NgComparisonReport) => (rep = r), runNg: cached };
    const r = await quiet(() => run(['--phase', 'b', ...RULE, '--seeds', '1', '--flatten', '0.7:0.7:0.1', '--baselines', base, '--faces', faces, '--summary', '--apply', '--date', '2026-10-05'], ctx));
    expect(r.value).toBe(1);
    const s = JSON.parse(got(mem, SUMMARY_FILES.b) ?? '{}') as Record<string, unknown>;
    expect(s['item']).toBe('M0-b-05b');
    expect(s['harness']).toBe('M0-b-05');
    expect(s['reviewed']).toEqual({ 'e/baselines.json': rep?.inputs.baselines.sha256, 'e/ng-faces.json': rep?.inputs.ngFaces?.sha256 });
    expect(s['pass']).toBe(false);
    expect(s['failing']).toEqual(rep?.failing);
    // The search met NG's one-bend share (its tolerance wide on nine recorded cuts): cut.json bumped with the value.
    expect(rep?.flatten?.verdict).toBe('met');
    expect(rep?.tables).toEqual([{ table: 'cut', from: 1, to: 2, provenance: 'M-1 2026-10-05', changes: [{ row: 'settings', cell: 'flattenM', before: 0.7, after: 0.7 }], mode: 'applied' }]);
    // The run's verdict printed beside "applied" (hardening S1, note 8): the run fails, so the line says so.
    expect(r.lines).toContain(`bentcut-ng: applied cut.json version 1 → 2, 1 cells, provenance M-1 2026-10-05; the run fails (exit 1) — read the verdict before committing the table\n`);
    const cut = JSON.parse(got(mem, 'packages/tables/data/cut.json') ?? '{}') as { version: number; rows: { settings: { flattenM: { value: number; provenance: string } } } };
    expect([cut.version, cut.rows.settings.flattenM.value, cut.rows.settings.flattenM.provenance]).toEqual([2, 0.7, 'M-1 2026-10-05']);
    // A search that misses its row applies nothing (its note says so).
    resetMem(mem);
    put(mem, 'e/baselines.json', baselinesText([row('cut.sigma', 'plain', scalar(0.084))]));
    const f = ngFile(threeFaces());
    for (const x of f.faces) for (const c of x.cuts) c.bends = 0;
    for (const x of f.faces) for (const c of x.cuts) [c.cornerT, c.fillet] = [-1, 0];
    put(mem, 'e/ng-faces.json', ngFacesText(f));
    await quiet(() => run(['--phase', 'b', ...RULE, '--seeds', '1', '--flatten', '0.7:0.7:0.1', '--baselines', base, '--faces', faces, '--apply', '--date', '2026-10-05'], ctx));
    expect(rep?.flatten?.verdict).toBe('notMet');
    expect(rep?.tables).toBeUndefined();
    expect(rep?.notes).toContain('cut.flattenM not applied: the search did not meet the row');
    expect(got(mem, 'packages/tables/data/cut.json')).toContain('"version": 1');
  });
});
