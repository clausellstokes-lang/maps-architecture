// M0-f-03a: the law's evaluation (§5.1 (5)) — limit = floor + perUnit × count(unit, scope); the log2 form uses
// ⌈log2(count)⌉; count = 0 gives the floor; a fixed law gives its floor and reads no count (C-0174 (2)); count(unit,
// scope) reads only the scope's committed counts — no measurement and no clock (the item's `checker` line in
// M0-work.json: the source scan below and the scope-independence property).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import type { BatchScope, Id, StageId, WorkLimitLaw, WorkUnit } from '@plat/model';
import { countOf, loadWorkLimits, scopeLabel, workLimitOf, WORK_UNITS, type FixedWorkLimitLaw, type ScopeCounts } from '../../src/index.js';

const DISTRICT: BatchScope = { kind: 'district', id: 'd12' as Id };
const STAGE: BatchScope = { kind: 'stage', stage: 8 as StageId };

const law = (unit: WorkUnit, perUnit: number, floor: number, log2?: true): WorkLimitLaw =>
  log2 === undefined ? { counter: 'test.counter', unit, perUnit, floor } : { counter: 'test.counter', unit, perUnit, floor, log2 };

/** ⌈log2(n)⌉ by the definition: the least k ≥ 0 with 2^k ≥ n (0 for n ≤ 1). */
function ceilLog2Spec(n: number): number {
  let k = 0;
  while (2 ** k < n) k += 1;
  return k;
}

describe('limit arithmetic (§5.1 (5))', () => {
  it('is floor + perUnit × count', () => {
    expect(workLimitOf(law('faces', 4, 100), DISTRICT, { faces: 25 })).toBe(200);
    expect(workLimitOf(law('vertices', 1.5, 64), DISTRICT, { vertices: 10 })).toBe(79);
    expect(workLimitOf(law('landHa', 256, 4096), DISTRICT, { landHa: 12.5 })).toBe(4096 + 256 * 12.5);
  });

  it('the log2 form uses ⌈log2(count)⌉', () => {
    const l = law('faces', 4, 16, true);
    const cases: [number, number][] = [
      [1, 16],
      [2, 20],
      [3, 24],
      [4, 24],
      [5, 28],
      [8, 28],
      [9, 32],
      [1024, 56],
      [1025, 60],
    ];
    for (const [n, limit] of cases) expect(workLimitOf(l, DISTRICT, { faces: n }), `count ${n}`).toBe(limit);
  });

  it('count = 0 gives the floor, in both forms', () => {
    expect(workLimitOf(law('faces', 32, 4096), DISTRICT, { faces: 0 })).toBe(4096);
    expect(workLimitOf(law('faces', 4, 16, true), DISTRICT, { faces: 0 })).toBe(16);
    expect(workLimitOf(law('landHa', 2048, 32768), DISTRICT, { landHa: 0 })).toBe(32768);
  });

  it('a fixed law gives its floor and reads no count', () => {
    const fixed: FixedWorkLimitLaw = { counter: 'warp.halvings', unit: 'fixed', perUnit: 0, floor: 8 };
    expect(workLimitOf(fixed, DISTRICT, {})).toBe(8);
    expect(workLimitOf(fixed, STAGE, { faces: 1e6, vertices: 3 })).toBe(8);
    expect(() => workLimitOf({ ...fixed, perUnit: 1 as 0 }, DISTRICT, {})).toThrow(RangeError);
    expect(() => workLimitOf({ ...fixed, floor: Number.NaN }, DISTRICT, {})).toThrow(RangeError);
  });

  it('the shipped laws evaluate: warp.halvings is 8, cut.recursionDepth takes the log2 form', () => {
    const t = loadWorkLimits();
    expect(workLimitOf(t.law('warp.halvings'), DISTRICT, {})).toBe(8);
    const depth = t.law('cut.recursionDepth');
    expect(depth.unit).toBe('faces');
    expect(workLimitOf(depth, DISTRICT, { faces: 0 })).toBe(depth.floor);
    expect(workLimitOf(depth, DISTRICT, { faces: 1000 })).toBe(depth.floor + depth.perUnit * 10);
    for (const l of t.laws) {
      if (l.unit === 'fixed') continue;
      expect(workLimitOf(l, DISTRICT, { [l.unit]: 0 }), l.counter).toBe(l.floor);
    }
  });
});

describe('properties (fast-check, PLAT_FUZZ_RUNS)', () => {
  const unit = fc.constantFrom(...WORK_UNITS);
  const coeff = fc.integer({ min: 0, max: 1 << 16 });

  it('the linear form equals floor + perUnit × count exactly, and never falls as the count grows', () => {
    fc.assert(
      fc.property(coeff, coeff, fc.integer({ min: 0, max: 1 << 20 }), fc.integer({ min: 0, max: 1 << 10 }), (perUnit, floor, n, d) => {
        const l = law('faces', perUnit, floor);
        const a = workLimitOf(l, DISTRICT, { faces: n });
        expect(a).toBe(floor + perUnit * n);
        expect(workLimitOf(l, DISTRICT, { faces: n + d })).toBeGreaterThanOrEqual(a);
      }),
    );
  });

  it('the log2 form equals floor + perUnit × ⌈log2(count)⌉ and never falls as the count grows', () => {
    fc.assert(
      fc.property(coeff, coeff, fc.integer({ min: 0, max: 1 << 24 }), fc.integer({ min: 0, max: 1 << 12 }), (perUnit, floor, n, d) => {
        const l = law('faces', perUnit, floor, true);
        const a = workLimitOf(l, DISTRICT, { faces: n });
        expect(a).toBe(floor + perUnit * ceilLog2Spec(n));
        expect(workLimitOf(l, DISTRICT, { faces: n + d })).toBeGreaterThanOrEqual(a);
      }),
    );
  });

  it('the limit reads the law’s own unit alone: the scope, other units and key order never move it', () => {
    fc.assert(
      fc.property(unit, coeff, coeff, fc.integer({ min: 0, max: 1 << 20 }), fc.integer({ min: 0, max: 1 << 20 }), (u, perUnit, floor, n, other) => {
        const l = law(u, perUnit, floor);
        const counts: Record<string, number> = {};
        for (const w of WORK_UNITS) counts[w] = w === u ? n : other;
        const reversed: Record<string, number> = {};
        for (const w of [...WORK_UNITS].reverse()) reversed[w] = counts[w];
        const a = workLimitOf(l, DISTRICT, counts as ScopeCounts);
        expect(workLimitOf(l, STAGE, reversed as ScopeCounts)).toBe(a);
        expect(workLimitOf(l, { kind: 'block', id: 'b1' as Id }, { [u]: n })).toBe(a);
      }),
    );
  });
});

describe('count(unit, scope): the committed counts, refused when they are not counts', () => {
  it('reads the unit from the scope’s counts', () => {
    expect(countOf('faces', DISTRICT, { faces: 7, vertices: 30 })).toBe(7);
    expect(countOf('landHa', DISTRICT, { landHa: 3.25 })).toBe(3.25);
    expect(countOf('moduleCells', DISTRICT, { moduleCells: 0.5 })).toBe(0.5);
  });

  it('refuses a missing, negative, non-finite or fractional discrete count, naming the unit and the scope', () => {
    expect(() => countOf('faces', DISTRICT, { vertices: 3 })).toThrow('count(faces, district d12): the scope has no committed count of faces');
    expect(() => countOf('faces', DISTRICT, { faces: -1 })).toThrow(RangeError);
    expect(() => countOf('faces', DISTRICT, { faces: Number.NaN })).toThrow(RangeError);
    expect(() => countOf('frameCells', STAGE, { frameCells: Number.POSITIVE_INFINITY })).toThrow(RangeError);
    expect(() => countOf('vertices', STAGE, { vertices: 2.5 })).toThrow('count(vertices, stage 8): 2.5 is not a whole number of vertices');
    expect(() => workLimitOf(law('latticeNodes', 8, 4096), DISTRICT, {})).toThrow(RangeError);
  });

  it('labels every scope kind', () => {
    expect(scopeLabel(STAGE)).toBe('stage 8');
    expect(scopeLabel(DISTRICT)).toBe('district d12');
    expect(scopeLabel({ kind: 'block', id: 'b3' as Id })).toBe('block b3');
    expect(scopeLabel({ kind: 'entity', id: 'x' as Id })).toBe('entity x');
    expect(scopeLabel({ kind: 'edit', edit: 41 })).toBe('edit 41');
  });
});

describe('count(unit, scope) reads no measurement and no clock (the checker’s line)', () => {
  const SRC = fileURLToPath(new URL('../../src/workLimits/', import.meta.url));
  const files = ['law.ts', 'table.ts', 'counters.ts', 'report.ts', 'index.ts'];

  it('the module imports only the kernel, the model, the package’s own cell and loader modules and its data file', () => {
    // The package's public names come through the folder indexes; `../cell/cell.js` (`issueAt`) and `../loader/census.js`
    // (`tableCensus`) are the two shared helpers imported by path (C-0323). What the list guards — no measurement, no
    // clock, no path outside the package — the banned-name scan below holds too.
    const allowed = new Set([
      '@plat/kernel',
      '@plat/model',
      '../cell/index.js',
      '../cell/cell.js',
      '../loader/index.js',
      '../loader/census.js',
      '../../data/workLimits.json',
      './counters.js',
      './table.js',
      './law.js',
      './report.js',
    ]);
    for (const f of files) {
      const text = readFileSync(`${SRC}${f}`, 'utf8');
      for (const m of text.matchAll(/^(?:import|export)[^'"]*from\s+'([^']+)'/gm)) expect(allowed.has(m[1]), `${f} imports ${m[1]}`).toBe(true);
    }
  });

  it('names no clock, timer, host or random source', () => {
    const banned = /\b(?:Date|performance|process|hrtime|setTimeout|setInterval|setImmediate|queueMicrotask|crypto|Math\.random|globalThis|navigator)\b/;
    for (const f of files) {
      const code = readFileSync(`${SRC}${f}`, 'utf8')
        .split('\n')
        .filter((l) => !l.trimStart().startsWith('//') && !l.trimStart().startsWith('*') && !l.trimStart().startsWith('/**'))
        .join('\n');
      expect(banned.exec(code)?.[0], f).toBeUndefined();
    }
  });
});
