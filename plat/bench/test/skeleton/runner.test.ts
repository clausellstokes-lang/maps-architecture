// M0-a-12: the skeleton corpus runner (C-0067, C-0114, C-0172 (8) – (10)) — the item's listed test "the corpus runner's
// counts are reproducible run to run (seeded), and the runner opens no path outside plat/ (a file-open log)", the corpus
// bar on the committed footprints (§3.8: downgrades ≤ 0.5 %, work-limit hits ≤ 0.1 %), every outcome counted in its slot,
// the in-process path the spike harnesses take, and the dispatcher entry's exits. node:fs is wrapped (a pass-through that
// records every call while a test asks it to), so the file-open log is checked against the calls the runner really made.
import * as realFs from 'node:fs';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ok, type KernelResult, type MedialAxis, type Polygon, type Skeleton, type SkeletonFailure } from '@plat/kernel';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  CORPUS_BAR,
  CORPUS_DIR,
  loadCorpus,
  PLAT_ROOT,
  run,
  skeletonCorpus,
  type OpenLog,
  type SkeletonService,
} from '../../src/skeleton/index.js';

// `realpath`, when a test sets it, answers realpathSync for the paths it names (a link made since the last lint run,
// which the lint's whole-tree check cannot see — the runner's own per-file refusal is what stands then)
const calls = vi.hoisted(() => ({ on: false, list: [] as { fn: string; path: string }[], realpath: null as ((p: string) => string | undefined) | null }));

vi.mock('node:fs', async (importOriginal) => {
  const real = await importOriginal<typeof import('node:fs')>();
  const wrapped: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(real)) {
    if (typeof value !== 'function' || /^[A-Z]/.test(name)) {
      wrapped[name] = value;
      continue;
    }
    const fn = value as (...a: unknown[]) => unknown;
    const w = (...args: unknown[]): unknown => {
      const p = args[0];
      if (calls.on && (typeof p === 'string' || p instanceof URL)) calls.list.push({ fn: name, path: typeof p === 'string' ? p : fileURLToPath(p) });
      if (name === 'realpathSync' && calls.realpath !== null && typeof p === 'string') {
        const to = calls.realpath(p);
        if (to !== undefined) return to;
      }
      return fn(...args);
    };
    wrapped[name] = Object.assign(w, fn);
  }
  return { ...wrapped, default: wrapped };
});

const TIMEOUT = 600_000;
const HERE = dirname(fileURLToPath(import.meta.url));
const FAILING = join(HERE, 'fixtures', 'failing');
const WRITES = new Set(['writeFileSync', 'mkdirSync', 'appendFileSync', 'createWriteStream', 'rmSync', 'unlinkSync', 'renameSync', 'copyFileSync']);

let scratch = '';
beforeAll(() => {
  scratch = mkdtempSync(join(tmpdir(), 'plat-m0a12-'));
});
afterAll(() => {
  rmSync(scratch, { recursive: true, force: true });
});

function recorded<T>(f: () => T): { value: T; list: { fn: string; path: string }[] } {
  calls.list = [];
  calls.on = true;
  try {
    return { value: f(), list: calls.list };
  } finally {
    calls.on = false;
  }
}

async function recordedAsync<T>(f: () => Promise<T>): Promise<{ value: T; list: { fn: string; path: string }[] }> {
  calls.list = [];
  calls.on = true;
  try {
    return { value: await f(), list: calls.list };
  } finally {
    calls.on = false;
  }
}

const insidePlat = (p: string): boolean => {
  const real = realFs.realpathSync(p);
  return real === PLAT_ROOT || real.startsWith(PLAT_ROOT + sep);
};

describe('the corpus runner opens no path outside plat/ (the file-open log, C-0067)', () => {
  it(
    'bench -- skeleton reads only the fixture folder inside plat/, logs every file it reads, and writes only its outputs',
    async () => {
      const out = join(scratch, 'out-a');
      const summary = join(scratch, 'summary-a.json');
      const { value: code, list } = await recordedAsync(() => run([], { out, summary }));
      expect(code).toBe(0);
      const writes = list.filter((c) => WRITES.has(c.fn));
      const reads = list.filter((c) => !WRITES.has(c.fn));
      expect(reads.length).toBeGreaterThan(0);
      for (const r of reads) expect(insidePlat(r.path), `${r.fn} ${r.path}`).toBe(true);
      for (const r of reads) expect(realFs.realpathSync(r.path).startsWith(realFs.realpathSync(CORPUS_DIR)), `${r.fn} ${r.path}`).toBe(true);
      // writes: the summary and the out folder (PLAT_BENCH_OUT in a real run) only
      for (const w of writes) expect(w.path === summary || w.path === dirname(summary) || w.path.startsWith(out), `${w.fn} ${w.path}`).toBe(true);
      const full = JSON.parse(readFileSync(join(out, 'skeleton-corpus.json'), 'utf8')) as { opened: string[] };
      // the log names every file read (relative to plat/), the folder first
      const readFiles = [...new Set(reads.filter((r) => r.fn === 'readFileSync').map((r) => realFs.realpathSync(r.path)))];
      expect(full.opened.slice(1)).toEqual(readFiles.map((p) => p.slice(PLAT_ROOT.length + 1)));
      expect(full.opened[0]).toBe('bench/fixtures/skeleton-corpus');
      const s = JSON.parse(readFileSync(summary, 'utf8')) as { inputs: { opened: number; outsidePlat: number } };
      expect(s.inputs).toEqual({ opened: full.opened.length, outsidePlat: 0 });
    },
    TIMEOUT,
  );

  it('refuses a corpus folder that resolves outside plat/ before reading anything in it', () => {
    const log: OpenLog = { reads: [] };
    const { list } = recorded(() => {
      expect(() => loadCorpus(scratch, log)).toThrow(/outside plat/);
    });
    expect(log.reads).toEqual([]);
    expect(list.filter((c) => c.fn === 'readdirSync' || c.fn === 'readFileSync')).toEqual([]);
  });

  it('refuses a corpus file that resolves outside plat/ (a link made since the last lint run) before reading it', () => {
    const dir = realFs.realpathSync(CORPUS_DIR);
    const file = join(dir, 'footprints.json');
    const log: OpenLog = { reads: [] };
    calls.realpath = (p) => (p === file ? join(scratch, 'footprints.json') : undefined);
    try {
      const { list } = recorded(() => {
        expect(() => loadCorpus(CORPUS_DIR, log)).toThrow(/footprints\.json resolves outside plat/);
      });
      // the folder was resolved and logged; the file was resolved, refused, and neither logged nor read
      expect(log.reads).toEqual([dir]);
      expect(list.filter((c) => c.fn === 'realpathSync').map((c) => c.path)).toContain(file);
      expect(list.filter((c) => c.fn === 'readFileSync')).toEqual([]);
    } finally {
      calls.realpath = null;
    }
    // the same folder, the redirect gone, loads whole
    expect(loadCorpus(CORPUS_DIR).faces.length).toBe(2000);
  });

  it('takes faces in-process from a caller (the spike harnesses, C-0067) and opens no file at all', () => {
    const faces: Polygon[][] = loadCorpus().faces.slice(0, 50);
    const { value, list } = recorded(() => skeletonCorpus(faces, 'spine'));
    expect(list).toEqual([]);
    expect(value.faces).toBe(50);
  });
});

describe('the counts are reproducible run to run (seeded corpus, pure runner)', () => {
  it(
    'two runs over the committed corpus give identical reports, and two dispatcher runs identical summaries',
    async () => {
      const corpus = loadCorpus();
      for (const use of ['roof', 'spine'] as const) {
        const a = skeletonCorpus(corpus.faces, use, { families: corpus.families });
        const b = skeletonCorpus(corpus.faces, use, { families: corpus.families });
        expect(b).toEqual(a);
      }
      const s1 = join(scratch, 's1.json');
      const s2 = join(scratch, 's2.json');
      expect(await run([], { out: join(scratch, 'o1'), summary: s1 })).toBe(0);
      expect(await run([], { out: join(scratch, 'o2'), summary: s2 })).toBe(0);
      expect(readFileSync(s2, 'utf8')).toBe(readFileSync(s1, 'utf8'));
    },
    TIMEOUT,
  );
});

describe('the corpus bar (§3.8, C-0015): downgrades ≤ 0.5 %, work-limit hits ≤ 0.1 % on the synthetic footprints', () => {
  it(
    'holds for both uses, with no failure; every spine downgrade carries a computed medial axis',
    () => {
      const corpus = loadCorpus();
      expect(corpus.faces.length).toBe(2000);
      for (const use of ['roof', 'spine'] as const) {
        const r = skeletonCorpus(corpus.faces, use, { families: corpus.families });
        expect(r.failures).toBe(0);
        expect(r.skeletons + r.downgrades).toBe(r.faces);
        expect(r.shares.downgrades).toBeLessThanOrEqual(CORPUS_BAR.downgradesMax);
        expect(r.shares.workLimitHits).toBeLessThanOrEqual(CORPUS_BAR.workLimitHitsMax);
        expect(r.bar.pass).toBe(true);
        if (use === 'spine') expect(r.axes.computed).toBe(r.downgrades);
        expect(r.byFamily.reduce((s, f) => s + f.faces, 0)).toBe(r.faces);
        expect(r.byFamily.reduce((s, f) => s + f.downgrades, 0)).toBe(r.downgrades);
      }
    },
    TIMEOUT,
  );

  it('the summary the dispatcher writes carries the counts and the verdict, numbers only', async () => {
    const summary = join(scratch, 'summary-b.json');
    expect(await run(['--use', 'roof'], { out: join(scratch, 'out-b'), summary })).toBe(0);
    const s = JSON.parse(readFileSync(summary, 'utf8')) as Record<string, unknown>;
    expect(Object.keys(s)).toEqual(['item', 'corpus', 'inputs', 'bar', 'roof']);
    const roof = s['roof'] as Record<string, unknown>;
    expect(roof['faces']).toBe(2000);
    expect((s['bar'] as { pass: boolean }).pass).toBe(true);
    // numbers only: every leaf a number or a boolean, but the item id
    const leaves = (v: unknown): unknown[] => (typeof v === 'object' && v !== null ? Object.values(v).flatMap(leaves) : [v]);
    for (const leaf of leaves({ ...s, item: 0 })) expect(['number', 'boolean']).toContain(typeof leaf);
  });
});

describe('every outcome is counted in its slot', () => {
  const ring: Polygon = [
    { x: 0, y: 0 },
    { x: 1000, y: 0 },
    { x: 1000, y: 1000 },
  ] as Polygon;
  const down = (cause: SkeletonFailure, events = 3): KernelResult<Skeleton<KernelResult<MedialAxis>>> =>
    ok({ kind: 'downgrade', use: 'roof', to: 'plainRoof', cause, events }, [{ code: 'W_DOWNGRADE', count: 1 }]);
  const outcomes: (() => KernelResult<Skeleton<KernelResult<MedialAxis>>>)[] = [
    () => ok({ kind: 'skeleton', use: 'roof', rings: [], edges: [], nodes: [], arcs: [], faces: [], events: 7 }),
    () => down({ code: 'contract', refusal: 'sharpCorner' }, 0),
    () => down({ code: 'contract', refusal: 'holeContact' }, 0),
    () => down({ code: 'E_WORK_LIMIT', count: 69, limit: 68 }, 69),
    () => down({ code: 'validator', check: 'planarity', detail: 'x' }),
    () => down({ code: 'validator', check: 'heights', detail: 'x' }),
    () => ({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'x' }),
    () => {
      throw new Error('a crash');
    },
  ];

  it('validated, each refusal, work-limit hits, each validator check, refused calls and throws', () => {
    let i = 0;
    const service: SkeletonService = () => outcomes[i++ % outcomes.length]();
    const r = skeletonCorpus(new Array<Polygon[]>(outcomes.length).fill([ring]), 'roof', { service, families: [0, 1, 1, 0, 2, 2, 0, 0] });
    expect(r.skeletons).toBe(1);
    expect(r.downgrades).toBe(5);
    expect(r.workLimitHits).toBe(1);
    expect(r.failures).toBe(2);
    expect(r.causes.contract).toEqual({ empty: 0, degenerate: 0, notSimple: 0, sharpCorner: 1, holeContact: 1, holeOutside: 0 });
    expect(r.causes.validator).toEqual({ planarity: 1, faces: 0, heights: 1, topology: 0 });
    expect(r.causes.workLimit).toBe(1);
    expect(r.events).toEqual({ total: 7 + 0 + 0 + 69 + 3 + 3, max: 69 });
    expect(r.flagged).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(r.byFamily).toEqual([
      { faces: 4, downgrades: 1 },
      { faces: 2, downgrades: 2 },
      { faces: 2, downgrades: 2 },
    ]);
    expect(r.bar.pass).toBe(false);
  });

  it('the bar fails at one downgrade in 199 faces and one work-limit hit in 999, holds at one in 200 and in 1 000', () => {
    const at = (bad: number, n: number, cause: SkeletonFailure): boolean => {
      let i = 0;
      const service: SkeletonService = () => (i++ < bad ? down(cause) : outcomes[0]());
      return skeletonCorpus(new Array<Polygon[]>(n).fill([ring]), 'roof', { service }).bar.pass;
    };
    const v: SkeletonFailure = { code: 'validator', check: 'faces', detail: 'x' };
    const w: SkeletonFailure = { code: 'E_WORK_LIMIT', count: 1, limit: 1 };
    expect(at(1, 199, v)).toBe(false);
    expect(at(1, 200, v)).toBe(true);
    expect(at(1, 999, w)).toBe(false);
    expect(at(1, 1000, w)).toBe(true);
    expect(skeletonCorpus([], 'roof').bar.pass).toBe(false);
  });

  it("spine: a face the contract refuses downgrades with the kernel's sampled medial axis, computed and non-empty", () => {
    const spike = [{ x: 0, y: 0 }, { x: 4000, y: 0 }, { x: 4000, y: 200 }] as Polygon; // 2.9°: sharper than 5°
    const r = skeletonCorpus([[spike]], 'spine');
    expect(r.causes.contract.sharpCorner).toBe(1);
    expect(r.axes).toEqual({ computed: 1, empty: 0 });
  });
});

describe('the dispatcher entry', () => {
  it('exits 1 when the bar fails (a corpus folder inside plat/ with one face in four refused)', async () => {
    const summary = join(scratch, 'summary-c.json');
    expect(await run([], { out: join(scratch, 'out-c'), summary, corpusDir: FAILING })).toBe(1);
    const s = JSON.parse(readFileSync(summary, 'utf8')) as { bar: { pass: boolean }; roof: { downgrades: number; contract: { sharpCorner: number } } };
    expect(s.bar.pass).toBe(false);
    expect(s.roof.downgrades).toBe(1);
    expect(s.roof.contract.sharpCorner).toBe(1);
  });

  it('exits 64 on an unknown or malformed argument', async () => {
    const ctx = { out: join(scratch, 'out-d'), summary: join(scratch, 'summary-d.json') };
    expect(await run(['--fast'], ctx)).toBe(64);
    expect(await run(['--use', 'regions'], ctx)).toBe(64);
    expect(await run(['--rounds', '3'], ctx)).toBe(64); // a timing option without --timing
    expect(await run(['--timing', '--rounds', '0'], ctx)).toBe(64);
    expect(await run(['--generate', '--timing'], ctx)).toBe(64);
  });

  it('--generate writes the committed file again, byte for byte (into a folder the test names)', async () => {
    const dir = join(scratch, 'gen');
    expect(await run(['--generate'], { out: join(scratch, 'out-e'), corpusDir: dir })).toBe(0);
    expect(readFileSync(join(dir, 'footprints.json'), 'utf8')).toBe(readFileSync(join(CORPUS_DIR, 'footprints.json'), 'utf8'));
  });
});
