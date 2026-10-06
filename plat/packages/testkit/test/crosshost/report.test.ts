// The report's comparison (M0-d-06; §6.5 (9): "a report comparing every leg to the arm64 reference, naming the first
// differing stage and seed"), on synthetic runs: the reference is Node arm64 with workers off; where it did not run the
// first ran run in the report's order is the comparison base, named, and the verdict cannot be a pass; the first
// difference is the first cell in run order, model before records before error; the timing figure is never compared.
import { describe, expect, it } from 'vitest';
import { compareCrossHostRuns, crossHostFirstDifference, crossHostReportLines, crossHostTimes, type CrossHostCell, type CrossHostRun } from '@plat/testkit';

const HEAD = { fixture: 'f', source: 'f.json', seeds: [1, 2], stages: ['a', 'b'], timing: false };
const H = (n: number): string => n.toString(16).padStart(32, '0');
const cells = (over: Partial<Record<string, Partial<CrossHostCell>>> = {}): CrossHostCell[] =>
  [
    { stage: 'k', seed: null, model: H(1), records: null },
    { stage: 'a', seed: 1, model: H(2), records: null },
    { stage: 'b', seed: 1, model: H(3), records: H(30) },
    { stage: 'a', seed: 2, model: H(4), records: null },
    { stage: 'b', seed: 2, model: H(5), records: H(50) },
  ].map((c) => ({ ...c, ...(over[`${c.stage}@${String(c.seed)}`] ?? {}) }));
const ran = (leg: CrossHostRun['leg'], workers: CrossHostRun['workers'], c: CrossHostCell[] = cells()): CrossHostRun => ({ leg, workers, status: 'ran', cells: c, thread: workers === 'on' ? 'worker' : 'main' });
const blocked = (leg: CrossHostRun['leg'], workers: CrossHostRun['workers']): CrossHostRun => ({ leg, workers, status: 'blocked', reason: 'not here' });

describe('the first difference', () => {
  it('is null when every cell agrees, the timing figure ignored', () => {
    expect(crossHostFirstDifference(cells(), cells({ 'a@1': { ms: 5 } }))).toBeNull();
  });
  it('is the first differing cell in run order', () => {
    const d = crossHostFirstDifference(cells(), cells({ 'b@2': { model: H(9) }, 'a@2': { model: H(8) } }));
    expect(d).toEqual({ stage: 'a', seed: 2, field: 'model', reference: H(4), got: H(8) });
  });
  it('compares the model digest, then the records digest, then the error', () => {
    expect(crossHostFirstDifference(cells(), cells({ 'b@1': { records: H(31) } }))?.field).toBe('records');
    expect(crossHostFirstDifference(cells(), cells({ 'b@1': { records: H(31), model: H(7) } }))?.field).toBe('model');
    const e = crossHostFirstDifference(cells({ 'a@1': { model: null, error: 'E: x' } }), cells({ 'a@1': { model: null, error: 'E: y' } }));
    expect(e).toEqual({ stage: 'a', seed: 1, field: 'error', reference: 'E: x', got: 'E: y' });
    expect(crossHostFirstDifference(cells(), cells({ 'k@null': { error: 'E: z' } }))).toEqual({ stage: 'k', seed: null, field: 'error', reference: null, got: 'E: z' });
  });
  it('names a missing or misplaced cell', () => {
    expect(crossHostFirstDifference(cells(), cells().slice(0, 4))).toEqual({ stage: 'b', seed: 2, field: 'missing', reference: 'b@2', got: null });
    expect(crossHostFirstDifference(cells().slice(0, 2), cells())?.field).toBe('missing');
    expect(crossHostFirstDifference(cells(), cells({ 'a@2': { seed: 3 } }))?.field).toBe('missing');
  });
});

describe('the comparison and the verdict', () => {
  it('compares with Node arm64 workers off when it ran: all agree → pass', () => {
    const r = compareCrossHostRuns(HEAD, [ran('webkit', 'on'), ran('node-arm64', 'on'), ran('node-arm64', 'off'), ran('chromium', 'off')]);
    expect(r.comparedWith).toEqual({ leg: 'node-arm64', workers: 'off' });
    expect(r.runs.map((x) => `${x.leg}/${x.workers}`)).toEqual(['node-arm64/off', 'node-arm64/on', 'chromium/off', 'webkit/on']);
    expect(r.runs.map((x) => x.agrees)).toEqual([undefined, true, true, true]);
    expect(r.verdict).toBe('pass');
    expect(r.cellsPerRun).toBe(5);
  });
  it('names each differing run by leg, workers, stage and seed → fail', () => {
    const r = compareCrossHostRuns(HEAD, [ran('node-arm64', 'off'), ran('firefox', 'on', cells({ 'b@2': { model: H(99) } })), ran('webkit', 'off')]);
    expect(r.verdict).toBe('fail');
    expect(r.differences).toEqual([{ leg: 'firefox', workers: 'on', difference: { stage: 'b', seed: 2, field: 'model', reference: H(5), got: H(99) } }]);
    expect(r.runs.find((x) => x.leg === 'firefox')?.agrees).toBe(false);
    expect(crossHostReportLines(r).join('\n')).toContain('firefox workers on: first difference at stage b seed 2 — model');
  });
  it('where the reference is blocked, compares with the first ran run, names it, and is incomplete — never a pass', () => {
    const r = compareCrossHostRuns(HEAD, [blocked('node-arm64', 'off'), blocked('node-arm64', 'on'), ran('node-x64-rosetta', 'on'), ran('node-x64-rosetta', 'off')]);
    expect(r.comparedWith).toEqual({ leg: 'node-x64-rosetta', workers: 'off' });
    expect(r.verdict).toBe('incomplete');
    expect(crossHostReportLines(r).join('\n')).toContain('(the reference did not run here)');
  });
  it('a failed run fails the report; no ran run is incomplete with no base', () => {
    expect(compareCrossHostRuns(HEAD, [ran('node-arm64', 'off'), { leg: 'chromium', workers: 'on', status: 'failed', reason: 'page' }]).verdict).toBe('fail');
    const none = compareCrossHostRuns(HEAD, [blocked('chromium', 'off')]);
    expect(none.comparedWith).toBeNull();
    expect(none.verdict).toBe('incomplete');
    expect(none.cellsPerRun).toBe(0);
  });
  it('a difference outranks a blocked leg: fail', () => {
    expect(compareCrossHostRuns(HEAD, [blocked('node-arm64', 'off'), ran('node-x64-rosetta', 'off'), ran('node-x64-rosetta', 'on', cells({ 'k@null': { model: H(0) } }))]).verdict).toBe('fail');
  });
});

describe('the timing table', () => {
  it('gives each ran run one figure per stage per seed and the median, in the fixture order', () => {
    const c = cells({ 'k@null': { ms: 9 }, 'a@1': { ms: 1 }, 'a@2': { ms: 3 }, 'b@1': { ms: 2 }, 'b@2': { ms: 6 } });
    const r = compareCrossHostRuns({ ...HEAD, stages: ['k', 'a', 'b'], timing: true }, [ran('chromium', 'on', c), blocked('firefox', 'on')]);
    expect(crossHostTimes(r)).toEqual([
      {
        leg: 'chromium',
        workers: 'on',
        stages: [
          { stage: 'k', seeds: [null], ms: [9], medianMs: 9 },
          { stage: 'a', seeds: [1, 2], ms: [1, 3], medianMs: 2 },
          { stage: 'b', seeds: [1, 2], ms: [2, 6], medianMs: 4 },
        ],
      },
    ]);
  });
  it('refuses a cell without its figure, and a report without the timing mode', () => {
    const r = compareCrossHostRuns({ ...HEAD, timing: true }, [ran('chromium', 'on')]);
    expect(() => crossHostTimes(r)).toThrow(/carries no figure/);
    expect(() => crossHostTimes(compareCrossHostRuns(HEAD, [ran('chromium', 'on')]))).toThrow(/without the timing mode/);
  });
});
