// M0-d-09: the report's verdict per bar (C-0268 (9)), the first differing seed and stage, and the numbers-only summary
// (C-0067) — on synthetic cross-host reports and seed results, so every bar's failure is seen without a derivation.
import { describe, expect, it } from 'vitest';
import { compareCrossHostRuns, type CrossHostCell, type CrossHostReport, type CrossHostRun } from '@plat/testkit';
import { buildReport, defaultConfig, firstOf, reportText, summaryOf, type DeterminismConfig, type SeedResult } from '../../src/determinism/index.js';

const H = (n: number): string => n.toString(16).padStart(32, '0');
const STAGES = ['a', 'b'];
const cells = (seed: number, salt = 0): CrossHostCell[] => STAGES.map((stage, i) => ({ stage, seed, model: H(seed * 10 + i + salt), records: null }));
const ran = (leg: CrossHostRun['leg'], workers: CrossHostRun['workers'], seeds: number[], plant?: { seed: number; stage: string }): CrossHostRun => ({
  leg,
  workers,
  status: 'ran',
  thread: workers === 'on' ? 'worker' : 'main',
  cells: seeds.flatMap((s) => cells(s).map((c) => (plant !== undefined && c.seed === plant.seed && c.stage === plant.stage ? { ...c, model: H(999) } : c))),
});
const xreport = (runs: CrossHostRun[], seeds: number[]): CrossHostReport => compareCrossHostRuns({ fixture: 'determinism-spike', source: 's', seeds, stages: STAGES, timing: false }, runs);

const census = { distinct: 10, reused: 2, collisions: 0, firstCollision: null };
function seedResult(seed: number, over: Partial<SeedResult> = {}): SeedResult {
  return {
    seed,
    cells: cells(seed),
    census: { streams: census, lineages: census },
    entityLineages: { entities: 5, duplicates: 0, first: null },
    oracle: { batches: 7, mismatches: 0, first: null, endFailures: 0 },
    bugs: [],
    pairs: null,
    timings: [],
    checks: [
      { what: 'dilation x10', identical: true, first: null, count: 0 },
      { what: 'dilation x0.1', identical: true, first: null, count: 0 },
      { what: 'op order (ops permuted, slots renumbered)', identical: true, first: null, count: 3 },
    ],
    ...over,
  };
}
const cfg = (over: Partial<DeterminismConfig> = {}): DeterminismConfig => ({ ...defaultConfig(), seeds: [1, 2, 3], stages: STAGES, pairs: 0, checks: 1, legs: ['node-x64-rosetta'], ...over });

describe('the verdict', () => {
  it('passes when every bar holds on every leg asked for, and says incomplete when a leg is blocked', () => {
    const x = xreport([ran('node-x64-rosetta', 'off', [1, 2, 3]), ran('node-x64-rosetta', 'on', [1, 2, 3])], [1, 2, 3]);
    const r = buildReport(cfg({ workers: ['off', 'on'] }), x, [seedResult(1)]);
    expect(r.failures).toEqual([]);
    expect(r.verdict).toBe('pass');
    expect(r.firstDifference).toBeNull();
    expect(r.inProcess).toEqual({ seeds: 1, comparedWith: 'node-x64-rosetta/off', agrees: true, firstDifference: null });
    const blocked = xreport([{ leg: 'node-arm64', workers: 'off', status: 'blocked', reason: 'no arm64 Node' }, ran('node-x64-rosetta', 'off', [1, 2, 3])], [1, 2, 3]);
    expect(buildReport(cfg(), blocked, [seedResult(1)]).verdict).toBe('incomplete');
  });
  it('fails a leg that differs, naming the first differing seed and stage', () => {
    const x = xreport([ran('node-x64-rosetta', 'off', [1, 2, 3]), ran('node-x64-rosetta', 'on', [1, 2, 3], { seed: 2, stage: 'b' })], [1, 2, 3]);
    const r = buildReport(cfg(), x, [seedResult(1)]);
    expect(r.verdict).toBe('fail');
    expect(r.firstDifference).toEqual({ seed: 2, stage: 'b', check: 'cross-host node-x64-rosetta/on (model)' });
    expect(r.crosshost.runs[1]).toMatchObject({ run: 'node-x64-rosetta/on', agrees: false, firstDifference: 'b at seed 2 (model)' });
  });
  it('fails an in-process run that differs from the legs', () => {
    const x = xreport([ran('node-x64-rosetta', 'off', [1, 2, 3])], [1, 2, 3]);
    const r = buildReport(cfg(), x, [seedResult(1, { cells: cells(1, 5) })]);
    expect(r.verdict).toBe('fail');
    expect(r.inProcess.agrees).toBe(false);
    expect(r.firstDifference).toMatchObject({ seed: 1, stage: 'a' });
  });
  it('fails each bar on its own failure', () => {
    const x = xreport([ran('node-x64-rosetta', 'off', [1, 2, 3])], [1, 2, 3]);
    const fail = (s: SeedResult, c: DeterminismConfig = cfg()): string[] => buildReport(c, x, [s]).failures;
    expect(fail(seedResult(1, { census: { streams: { ...census, collisions: 1 }, lineages: census } }))[0]).toMatch(/^distinctness/);
    expect(fail(seedResult(1, { census: { streams: census, lineages: { ...census, collisions: 1 } } }))[0]).toMatch(/^distinctness/);
    expect(fail(seedResult(1, { entityLineages: { entities: 5, duplicates: 1, first: 'x' } }))[0]).toMatch(/^distinctness/);
    expect(fail(seedResult(1, { census: { streams: { ...census, distinct: 0 }, lineages: census } }))[0]).toMatch(/^distinctness/);
    expect(fail(seedResult(1, { oracle: { batches: 7, mismatches: 1, first: { spike: 'fusion', stage: 'S8', batch: 4 }, endFailures: 0 } }))[0]).toMatch(/^oracle/);
    expect(fail(seedResult(1, { oracle: { batches: 7, mismatches: 0, first: null, endFailures: 1 } }))[0]).toMatch(/^oracle/);
    expect(fail(seedResult(1, { oracle: { batches: 0, mismatches: 0, first: null, endFailures: 0 } }))[0]).toMatch(/^oracle/);
    const dil = seedResult(1);
    expect(fail({ ...dil, checks: [{ what: 'dilation x10', identical: false, first: { stage: 'b', seed: 1, field: 'model', reference: 'x', got: 'y' }, count: 2 }, ...(dil.checks ?? []).slice(1)] })[0]).toMatch(/^dilation/);
    expect(fail({ ...dil, checks: [...(dil.checks ?? []).slice(0, 2), { what: 'op order (ops permuted, slots renumbered)', identical: false, first: { stage: 'a', seed: 1, field: 'model', reference: 'x', got: 'y' }, count: 1 }] })[0]).toMatch(/^op order/);
    expect(fail(seedResult(1, { checks: null }))).toEqual(['dilation: 0 of 0 runs differ', 'op order: 0 of 0 runs differ']);
    expect(fail(seedResult(1, { checks: null }), cfg({ checks: 0 }))).toEqual([]);
  });
  it('names the oracle miss and the lowest differing seed first', () => {
    const x = xreport([ran('node-x64-rosetta', 'off', [1, 2, 3])], [1, 2, 3]);
    const r = buildReport(cfg(), x, [seedResult(1), seedResult(2, { oracle: { batches: 3, mismatches: 1, first: { spike: 'site', stage: 'S6', batch: 2 }, endFailures: 0 } })]);
    expect(r.oracle.first).toEqual({ seed: 2, spike: 'site', stage: 'S6', batch: 2 });
    expect(r.firstDifference).toEqual({ seed: 2, stage: 'site.S6', check: 'oracle (batch 2)' });
    expect(firstOf([null, { seed: 9, stage: 'a', check: 'x' }, { seed: 4, stage: 'b', check: 'y' }, { seed: 4, stage: 'c', check: 'z' }])).toEqual({ seed: 4, stage: 'b', check: 'y' });
    expect(firstOf([{ seed: 1, stage: 'a', check: 'x' }, { seed: null, stage: '(run failed)', check: 'f' }])).toMatchObject({ seed: null });
  });
  it('fails a pair with a duplicate id, a silent re-bind or a standing entity that did not survive', () => {
    const x = xreport([ran('node-x64-rosetta', 'off', [1, 2, 3])], [1, 2, 3]);
    const pair = {
      spike: 'site' as const,
      seed: 1,
      standing: { rootsEqual: true, recordsEqual: true, entities: 4, missing: 0, firstMissing: null, editedLater: 1 },
      perKind: [{ kind: 'way' as const, old: 3, fresh: 2, survive: 1, succeed: 2, tombstone: 0, freshOutcome: 0, unanchored: { old: 0, fresh: 0 }, lineage: 'mixed' }],
      totals: { survive: 1, succeed: 2, tombstone: 0, fresh: 0 },
      duplicateIds: 0,
      silentRebinds: 0,
      reportedRefs: 0,
      carry: 0,
      bugs: { old: [], fresh: [] },
    };
    const ok = buildReport(cfg({ pairs: 1 }), x, [seedResult(1, { pairs: [pair] })]);
    expect(ok.matching).toMatchObject({ pairs: 1, duplicateIds: 0, silentRebinds: 0, pass: true, totals: { survive: 1, succeed: 2 } });
    expect(ok.matching.perKind.find((k) => k.kind === 'way')).toMatchObject({ old: 3, fresh: 2, survive: 1, succeed: 2, lineage: 'mixed' });
    for (const bad of [{ duplicateIds: 1 }, { silentRebinds: 1 }, { standing: { ...pair.standing, missing: 1 } }, { standing: { ...pair.standing, rootsEqual: false } }, { standing: { ...pair.standing, recordsEqual: false } }]) {
      const r = buildReport(cfg({ pairs: 1 }), x, [seedResult(1, { pairs: [{ ...pair, ...bad }] })]);
      expect(r.matching.pass, JSON.stringify(bad)).toBe(false);
      expect(r.verdict).toBe('fail');
    }
    expect(buildReport(cfg({ pairs: 1 }), x, [seedResult(1)]).matching.pass).toBe(false);
  });
});

describe('the summary', () => {
  it('holds numbers and verdicts only: no host, no path, no stamp text', () => {
    const x = xreport([ran('node-x64-rosetta', 'off', [1, 2, 3])], [1, 2, 3]);
    const r = buildReport(cfg(), x, [seedResult(1)]);
    const s = summaryOf(r);
    const text = JSON.stringify(s);
    expect(s).toMatchObject({ item: 'M0-d-09', seeds: 3, verdict: 'pass', crosshost: { ran: 1, blocked: 0, failed: 0 }, oracle: { batches: 7, mismatches: 0 } });
    expect(text).not.toMatch(/Intel|linux|node v|\/home|\/Users|contended because/);
    expect(reportText(r).endsWith('}\n')).toBe(true);
    expect(JSON.parse(reportText(r))).toEqual(JSON.parse(JSON.stringify(r)));
  });
});
