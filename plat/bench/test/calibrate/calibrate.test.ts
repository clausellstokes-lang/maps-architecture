// M0-f-01's calibrate tests (§12.1; C-0050, C-0075, C-0114): the four frozen kernels over fixed inputs (pinned
// checksums, the same on the arm64 and the Rosetta leg), each kernel's own correctness, the score's reproducibility
// within 5 % on an idle run (CONFIRMED when the machine is idle; measured and reported otherwise), no model-package
// import anywhere under bench/src/calibrate, and the command's printed and written output.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  CALIBRATE_VERSION,
  GRID,
  LEVELS,
  NODES,
  SORT_N,
  calibrate,
  calibrateSink,
  kernels,
  run,
  scoreDrift,
} from '../../src/calibrate/index.js';
import { dijkstra, fbm, flood, floodInput, graphInput, sortInput, sortKernel } from '../../src/calibrate/kernels.js';
import { NO_REFERENCE_SCORE } from '../../src/host/index.js';
import { contention } from '../../src/timing/contention.js';
import { LINE_CAP, OUT_CAP_BYTES, writeJson } from '../../src/timing/output.js';

const CALIBRATE_DIR = fileURLToPath(new URL('../../src/calibrate/', import.meta.url));
const KERNELS_TS = fileURLToPath(new URL('../../src/calibrate/kernels.ts', import.meta.url));
const BENCH_SRC = fileURLToPath(new URL('../../src/', import.meta.url));

/** The checksums of version 1's kernels over their fixed inputs (CONFIRMED identical on arm64 and under Rosetta). */
const PINNED: Record<string, number> = {
  fbm: 870.494291245938,
  flood: 1998308,
  dijkstra: 4478083,
  sort: 1.5008230248931795,
};

function out(): string {
  const dir = join(process.env['PLAT_BENCH_OUT'] || join(tmpdir(), 'plat-bench'), 'f01-calibrate-test');
  mkdirSync(dir, { recursive: true });
  return dir;
}

describe('the four frozen kernels (C-0050)', () => {
  it('are fbm, flood, dijkstra and sort over fixed inputs: pinned checksums, run after run', () => {
    expect(CALIBRATE_VERSION).toBe(1);
    const set = kernels();
    expect(set.map((k) => k.name)).toEqual(['fbm', 'flood', 'dijkstra', 'sort']);
    for (const k of set) {
      expect(k.run()).toBe(PINNED[k.name]);
      expect(k.run()).toBe(PINNED[k.name]);
    }
  });

  it('give the same checksums on the x64 leg under Rosetta 2 (kernels.ts is self-contained)', () => {
    const script = `const m = await import(${JSON.stringify(pathToFileURL(KERNELS_TS).href)}); const o = {}; for (const k of m.kernels()) o[k.name] = k.run(); process.stdout.write(JSON.stringify([process.arch, o]));`;
    const text = execFileSync('/usr/bin/arch', ['-x86_64', process.execPath, '--no-warnings', '--input-type=module', '-e', script], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 60_000,
    });
    const [arch, sums] = JSON.parse(text) as [string, Record<string, number>];
    expect(arch).toBe('x64');
    expect(sums).toEqual(PINNED);
  }, 90_000);

  it('fbm: 5 octaves over 256² cells, bounded, deterministic', () => {
    const a = fbm();
    expect(a.length).toBe(GRID * GRID);
    let lo = Infinity;
    let hi = -Infinity;
    for (const v of a) {
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    }
    expect(lo).toBeGreaterThan(-2);
    expect(hi).toBeLessThan(2);
    expect(hi - lo).toBeGreaterThan(0.5);
    expect(fbm()).toEqual(a);
  });

  it('flood: fills every depression — never below the input, the edge unchanged, no interior pit, every level in range', () => {
    const e = floodInput();
    const f = flood(e);
    let raised = 0;
    for (let k = 0; k < e.length; k++) {
      expect(e[k]).toBeGreaterThanOrEqual(0);
      expect(e[k]).toBeLessThan(LEVELS);
      if (f[k] < e[k]) throw new Error(`cell ${k} filled below its input`);
      if (f[k] > e[k]) raised++;
    }
    expect(raised).toBeGreaterThan(0);
    for (let i = 0; i < GRID; i++) {
      for (const k of [i, (GRID - 1) * GRID + i, i * GRID, i * GRID + GRID - 1]) expect(f[k]).toBe(e[k]);
    }
    for (let y = 1; y < GRID - 1; y++) {
      for (let x = 1; x < GRID - 1; x++) {
        const k = y * GRID + x;
        let lower = false;
        for (let dy = -1; dy <= 1 && !lower; dy++) for (let dx = -1; dx <= 1 && !lower; dx++) if ((dx || dy) && f[k + dy * GRID + dx] <= f[k]) lower = true;
        if (!lower) throw new Error(`cell (${x}, ${y}) is a pit of the filled surface`);
      }
    }
  });

  it('dijkstra: 20 000 nodes, every distance finite, every arc relaxed, every node but the source reached by a tight arc', () => {
    const g = graphInput();
    expect(g.off.length).toBe(NODES + 1);
    const d = dijkstra(g);
    expect(d[0]).toBe(0);
    for (let v = 0; v < NODES; v++) {
      if (!Number.isFinite(d[v])) throw new Error(`node ${v} unreached`);
      let tight = v === 0;
      for (let a = g.off[v]; a < g.off[v + 1]; a++) {
        const u = g.to[a];
        if (d[u] > d[v] + g.w[a]) throw new Error(`arc ${v}→${u} not relaxed`);
        if (d[u] + g.w[a] === d[v]) tight = true;
      }
      if (!tight) throw new Error(`node ${v} has no tight arc`);
    }
  });

  it('sort: 100 000 values sorted ascending, a permutation of the input, the input untouched', () => {
    const s = sortInput();
    const before = s.slice();
    const a = sortKernel(s);
    expect(a.length).toBe(SORT_N);
    for (let i = 1; i < SORT_N; i++) if (a[i - 1] > a[i]) throw new Error(`unsorted at ${i}`);
    expect(Array.from(a)).toEqual(Array.from(before).sort((x, y) => x - y));
    expect(s).toEqual(before);
  });
});

describe('calibrate() (§12.1)', () => {
  it('returns the score — the sum of the four kernels\' medians, in ms — with the host record', () => {
    const r = calibrate({ rounds: 3, warmup: 1 });
    expect(r.unit).toBe('ms');
    expect(r.version).toBe(CALIBRATE_VERSION);
    expect(r.kernels.map((k) => k.name)).toEqual(['fbm', 'flood', 'dijkstra', 'sort']);
    for (const k of r.kernels) {
      expect(k.samplesMs).toHaveLength(3);
      expect(k.medianMs).toBe([...k.samplesMs].sort((a, b) => a - b)[1]);
      expect(k.checksum).toBe(PINNED[k.name]);
    }
    expect(r.score).toBeCloseTo(r.kernels.reduce((s, k) => s + k.medianMs, 0), 12);
    expect(r.score).toBeGreaterThan(0);
    expect(r.host.cpu).toBe('Apple M1');
    expect(Number.isFinite(calibrateSink())).toBe(true);
    expect(() => calibrate({ rounds: 0 })).toThrow(/rounds/);
  });

  it('is reproducible within 5 % on an idle run (asserted when the detector finds the machine idle; measured and reported otherwise)', () => {
    const a = calibrate();
    const b = calibrate();
    const drift = scoreDrift(a.score, b.score);
    const stamp = contention({ calibration: { before: a.score, after: b.score } });
    const others = stamp.reasons.filter((r) => r !== NO_REFERENCE_SCORE && !r.startsWith('calibrate drift'));
    writeJson(out(), 'reproducibility.json', { scores: [a.score, b.score], drift, idle: others.length === 0, reasons: stamp.reasons });
    expect(stamp.reasons).toContain(NO_REFERENCE_SCORE);
    expect(stamp.authority).toBe('contended');
    if (others.length === 0) {
      expect(drift).toBeLessThanOrEqual(0.05); // CONFIRMED: an idle machine
    } else {
      expect(drift).toBeGreaterThanOrEqual(0); // CONTENDED: the drift is reported in reproducibility.json, never judged
    }
  }, 60_000);
});

describe('bench/src/calibrate imports no model package (C-0050)', () => {
  /** Every module specifier of a file (static imports and re-exports, dynamic imports). */
  function specifiers(file: string): string[] {
    const text = readFileSync(file, 'utf8');
    const found: string[] = [];
    for (const m of text.matchAll(/(?:^|\n)\s*(?:import|export)\b[^'"]*?from\s*['"]([^'"]+)['"]/g)) found.push(m[1]);
    for (const m of text.matchAll(/(?:^|\n)\s*import\s*['"]([^'"]+)['"]/g)) found.push(m[1]);
    for (const m of text.matchAll(/\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g)) found.push(m[1]);
    return found;
  }

  it('its closure of relative imports stays inside bench/src and names only node: built-ins outside it', () => {
    const files = readdirSync(CALIBRATE_DIR).filter((f) => f.endsWith('.ts')).map((f) => join(CALIBRATE_DIR, f));
    expect(files.length).toBeGreaterThanOrEqual(3);
    const seen = new Set<string>();
    const stack = [...files];
    const bare = new Set<string>();
    while (stack.length > 0) {
      const f = stack.pop() as string;
      if (seen.has(f)) continue;
      seen.add(f);
      for (const s of specifiers(f)) {
        if (s.startsWith('.')) {
          const target = resolve(dirname(f), s.replace(/\.js$/, '.ts'));
          expect(target.startsWith(BENCH_SRC), `${f} imports ${s} outside bench/src`).toBe(true);
          expect(statSync(target).isFile()).toBe(true);
          stack.push(target);
        } else bare.add(s);
      }
    }
    for (const s of bare) expect(s, `bench/src/calibrate's closure imports ${s}`).toMatch(/^node:/);
    expect([...seen].some((f) => f.endsWith(join('calibrate', 'kernels.ts')))).toBe(true);
    // the kernels themselves import nothing at all
    expect(specifiers(KERNELS_TS)).toEqual([]);
  });
});

describe('corepack pnpm bench:calibrate (the dispatcher entry run)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('prints a few capped lines — the scores, the drift, the host, the stamp (contended: no reference score) — and writes the record truncated', () => {
    const lines: string[] = [];
    vi.spyOn(process.stdout, 'write').mockImplementation((chunk: string | Uint8Array) => {
      lines.push(...String(chunk).split('\n').filter((l) => l !== ''));
      return true;
    });
    const dir = out();
    const code = run(['--runs', '2', '--rounds', '2', '--warmup', '0'], { out: dir });
    vi.restoreAllMocks();
    expect(code).toBe(0);
    expect(lines.length).toBeLessThanOrEqual(8);
    for (const l of lines) expect(l.length).toBeLessThanOrEqual(LINE_CAP);
    expect(lines.filter((l) => /^calibrate: run \d score [0-9.]+ ms/.test(l))).toHaveLength(2);
    expect(lines.some((l) => l.startsWith('calibrate: drift '))).toBe(true);
    expect(lines.some((l) => l.startsWith('calibrate: host Apple M1, 8 cores (4P + 4E), 16 GiB, macOS 14.7.8'))).toBe(true);
    expect(lines.some((l) => l.startsWith('calibrate: stamp contended') && l.includes(NO_REFERENCE_SCORE))).toBe(true);
    const text = readFileSync(join(dir, 'calibrate.json'), 'utf8');
    expect(Buffer.byteLength(text)).toBeLessThanOrEqual(OUT_CAP_BYTES);
    const rec = JSON.parse(text) as { runs: { score: number }[]; stamp: { authority: string; reasons: string[] } };
    expect(rec.runs).toHaveLength(2);
    expect(rec.stamp.authority).toBe('contended');
    expect(rec.stamp.reasons).toContain(NO_REFERENCE_SCORE);
  }, 60_000);

  it('refuses an unknown or out-of-range argument with exit 64', () => {
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    expect(run(['--nope'], { out: out() })).toBe(64);
    expect(run(['--runs', '0'], { out: out() })).toBe(64);
    expect(run(['--runs', '11'], { out: out() })).toBe(64);
  });
});
