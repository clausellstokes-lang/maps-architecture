// The profile tool's analysers on hand-made fixtures (fixtures.ts): the source-map decoder, the stage-window analysis
// (self / inclusive by function and file, the heaviest path, joint times, the cut windows), the growth lines and the
// counts. No derivation runs here.
import { describe, expect, it } from 'vitest';
import { analyse, counts, decodeVlq, fit, growthFits, growthRows, shortPath, SourceMap, type Window } from '../../src/profile/index.js';
import { COVERAGE, MAP, PROFILE, RECORD, SOURCE, SOURCES } from './fixtures.js';

describe('the source map', () => {
  it('decodes base64 VLQ (sign bit, continuation)', () => {
    expect(decodeVlq('AAgBC')).toEqual([0, 0, 16, 1]);
    expect(decodeVlq('D')).toEqual([-1]);
    expect(() => decodeVlq('g')).toThrow(/inside a value/);
  });
  it('maps a generated position to its TypeScript file:line, from the JSON and from the inline comment', () => {
    const m = SourceMap.fromJson(MAP);
    expect(m.originalFor(1, 0)).toMatchObject({ source: '../../packages/kernel/src/a/outer.ts', line: 1 });
    expect(m.originalFor(2, 5)).toMatchObject({ source: '../../packages/layout/src/b/inner.ts', line: 5 });
    expect(m.originalFor(9, 0)).toBeNull();
    expect(SourceMap.fromInline(SOURCE)?.originalFor(2, 0)?.line).toBe(5);
    expect(SourceMap.fromInline('no map')).toBeNull();
  });
  it('cuts a plat path to its package and file', () => {
    expect(shortPath('../../packages/kernel/src/a/outer.ts')).toBe('kernel/a/outer.ts');
    expect(shortPath('/r/plat/bench/src/fusion/runs.ts')).toBe('bench/fusion/runs.ts');
  });
});

describe('the stage-window analysis', () => {
  const a = analyse(RECORD, PROFILE, SOURCES, { window: 1, fns: ['outer', 'inner', '(garbage collector)'], joint: ['outer>inner'] });
  it('counts only the samples inside the stage marks', () => {
    expect(a.totalUs).toBe(500);
    expect(a.enclosed).toBe(true);
    expect(a.self).toEqual([
      ['inner layout/b/inner.ts:5', 300],
      ['(garbage collector)', 100],
      ['outer kernel/a/outer.ts:1', 100],
    ]);
    expect(a.selfFile[0]).toEqual(['layout/b/inner.ts', 300]);
  });
  it('counts inclusive time once per sample, by function and by file', () => {
    expect(new Map(a.incl).get('outer kernel/a/outer.ts:1')).toBe(400);
    expect(new Map(a.inclFile).get('kernel/a/outer.ts')).toBe(400);
    expect(a.named).toEqual({ outer: 400, inner: 300, '(garbage collector)': 100 });
    expect(a.joint['outer>inner']).toBe(300);
    expect(a.heaviest.map(([k]) => k)).toEqual(['outer kernel/a/outer.ts:1', 'inner layout/b/inner.ts:5']);
  });
  it('splits the window at every W-th cut stamp', () => {
    expect(a.windows).toEqual([
      { w: 0, cuts: 1, reads: 1, wallMs: 0.35, fns: { outer: 0.3, inner: 0.2, '(garbage collector)': 0.1 } },
      { w: 1, cuts: 1, reads: 0, wallMs: 0.15, fns: { outer: 0.1, inner: 0.1, '(garbage collector)': 0 } },
    ]);
  });
  it('drops the samples under an excluded function, the shares still of the whole window', () => {
    const x = analyse(RECORD, PROFILE, SOURCES, { window: 0, exclude: 'inner' });
    expect(x.totalUs).toBe(500);
    expect(x.self.map(([k]) => k).sort()).toEqual(['(garbage collector)', 'outer kernel/a/outer.ts:1']);
    expect(x.windows).toBeNull();
  });
});

describe('the growth lines', () => {
  it('fits a least-squares line over the window index', () => {
    expect(fit([1, 3, 5, 7])).toEqual({ a: 1, b: 2, first: 1, last: 7 });
    expect(fit([4])).toEqual({ a: 4, b: 0, first: 4, last: 4 });
  });
  it('splits the ms a cut into the savepoint and the rest, and leaves out the short tail', () => {
    const w = (i: number, cuts: number, wallMs: number, opSave: number): Window => ({ w: i, cuts, reads: 2 * cuts, wallMs, fns: { opSave, putBack: opSave, insertChain: cuts, gridCandidates: 0, '(garbage collector)': 0 } });
    const rows = growthRows([w(0, 10, 100, 5), w(1, 10, 200, 10), w(2, 10, 300, 15), w(3, 4, 50, 0)], 10);
    expect(rows.map((r) => [r.perCut, r.save, r.rest, r.ins])).toEqual([[10, 1, 9, 0.5], [20, 2, 18, 0.5], [30, 3, 27, 0.5]]);
    const f = growthFits(rows);
    expect(f.perCut.b).toBeCloseTo(10, 12);
    expect(f.save.b).toBeCloseTo(1, 12);
    expect(f.ins.b).toBeCloseTo(0, 12);
  });
});

describe('the counts', () => {
  const c = counts(COVERAGE, SOURCES, ['inner', 'rollback', 'absent']);
  it('counts the cuts over every definition, collision suffixes included', () => {
    expect(c.cuts).toBe(5);
    expect(c.named['inner']).toMatchObject({ total: 40, perCut: 8 });
    expect(c.named['rollback'].total).toBe(5);
    expect(c.named['rollback'].defs.map((r) => r.at)).toEqual(['layout/b/inner.ts:5', 'kernel/a/outer.ts:1']);
    expect(c.named['absent']).toEqual({ total: 0, perCut: 0, defs: [] });
  });
  it('places a function whose script has no source by its offset', () => {
    expect(c.rows.find((r) => r.name === '(anonymous)')?.at).toBe('file:///y/other.mjs@12');
    expect(c.rows[0]).toEqual({ name: 'inner', at: 'layout/b/inner.ts:5', count: 40 });
  });
});
