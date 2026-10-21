// M0-d-09: the report's verdict per bar (C-0268 (9)), the first differing seed and stage, and the numbers-only summary
// (C-0067) — on synthetic cross-host reports and seed results, so every bar's failure is seen without a derivation.
import { describe, expect, it } from 'vitest';
import { compareCrossHostRuns, type CrossHostCell, type CrossHostReport, type CrossHostRun } from '@plat/testkit';
import { buildReport, defaultConfig, firstOf, reportLines, reportText, summaryOf, type DeterminismConfig, type SeedResult, type StampedTiming } from '../../src/determinism/index.js';

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
    const fail = (s: SeedResult, c: DeterminismConfig = cfg()): readonly string[] => buildReport(c, x, [s]).failures;
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
      redrawn: ['S5', 'S6', 'S8'],
      perKind: [{ kind: 'way' as const, old: 3, fresh: 2, survive: 1, succeed: 2, tombstone: 0, freshOutcome: 0, unanchored: { old: 0, fresh: 0 }, lineage: 'mixed' }],
      totals: { survive: 1, succeed: 2, tombstone: 0, fresh: 0 },
      duplicateIds: 0,
      suffixed: 2,
      silentRebinds: 0,
      reportedRefs: 0,
      carry: 0,
      bugs: { old: [], fresh: [] },
    };
    const ok = buildReport(cfg({ pairs: 1 }), x, [seedResult(1, { pairs: [pair] })]);
    expect(ok.matching).toMatchObject({ pairs: 1, duplicateIds: 0, suffixed: 2, silentRebinds: 0, pass: true, totals: { survive: 1, succeed: 2 } });
    expect(ok.matching.perPair[0]).toMatchObject({ duplicateIds: 0, suffixed: 2 });
    // the mint's suffixes are informative: they never fail a pair
    expect(buildReport(cfg({ pairs: 1 }), x, [seedResult(1, { pairs: [{ ...pair, suffixed: 50 }] })]).matching.pass).toBe(true);
    expect(ok.matching.perKind.find((k) => k.kind === 'way')).toMatchObject({ old: 3, fresh: 2, survive: 1, succeed: 2, lineage: 'mixed' });
    for (const bad of [{ duplicateIds: 1 }, { silentRebinds: 1 }, { standing: { ...pair.standing, missing: 1 } }, { standing: { ...pair.standing, rootsEqual: false } }, { standing: { ...pair.standing, recordsEqual: false } }]) {
      const r = buildReport(cfg({ pairs: 1 }), x, [seedResult(1, { pairs: [{ ...pair, ...bad }] })]);
      expect(r.matching.pass, JSON.stringify(bad)).toBe(false);
      expect(r.verdict).toBe('fail');
    }
    expect(buildReport(cfg({ pairs: 1 }), x, [seedResult(1)]).matching.pass).toBe(false);
    // a pair that re-drew no stage is no re-derivation (C-0280): counted; the bar fails when no pair re-drew one
    expect(ok.matching).toMatchObject({ unmoved: 0, perPair: [expect.objectContaining({ redrawn: ['S5', 'S6', 'S8'] })] });
    const still = { ...pair, redrawn: [] };
    const none = buildReport(cfg({ pairs: 1 }), x, [seedResult(1, { pairs: [still] })]);
    expect(none.matching).toMatchObject({ unmoved: 1, pass: false });
    expect(none.failures).toEqual([expect.stringMatching(/^matching: .*no pair re-drew a stage$/)]);
    expect(none.verdict).toBe('fail');
    const some = buildReport(cfg({ pairs: 2 }), x, [seedResult(1, { pairs: [still] }), seedResult(2, { pairs: [pair] })]);
    expect(some.matching).toMatchObject({ pairs: 2, unmoved: 1, pass: true });
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
  it('counts the timing stamps by their authority, one contended and one authoritative (hardening S1, check note 1)', () => {
    const x = xreport([ran('node-x64-rosetta', 'off', [1, 2, 3])], [1, 2, 3]);
    const stamp = (label: string, authority: StampedTiming['authority']): StampedTiming => ({
      label,
      value: 1.5,
      unit: 'µs',
      authority,
      readings: 'measured',
      reasons: authority === 'contended' ? 1 : 0,
      firstReasons: authority === 'contended' ? ['load average 3.1'] : [],
      host: 'a host',
      perKindUs: { junction: 1.5 },
      pointUs: 1.5,
      overlapUs: 4,
    });
    const r = buildReport(cfg({ checks: 2 }), x, [seedResult(1, { timings: [stamp('matching spike-site-1', 'contended')] }), seedResult(2, { timings: [stamp('matching spike-fusion-2', 'authoritative')] })]);
    expect(r.timings.taken).toBe(true);
    expect(r.timings.contended).toBe(1);
    expect(r.timings.authoritative).toBe(1);
    // every stamp kept with the authority the harness measured, in label order
    expect(r.timings.stamps.map((t) => [t.label, t.authority])).toEqual([
      ['matching spike-fusion-2', 'authoritative'],
      ['matching spike-site-1', 'contended'],
    ]);
    expect(summaryOf(r)['timings']).toEqual({ stamps: 2, contended: 1, authoritative: 1 });
    // a stamp is reported, never a result: the verdict is the bars'
    expect(r.verdict).toBe('pass');
    const two = buildReport(cfg({ checks: 2 }), x, [seedResult(1, { timings: [stamp('a', 'contended'), stamp('b', 'contended')] }), seedResult(2)]);
    expect(summaryOf(two)['timings']).toEqual({ stamps: 2, contended: 2, authoritative: 0 });
  });
  it('names the host each leg ran on: the x86-64 leg node-x64-rosetta on a native x86-64 host reads native-x64 (hardening S1, check note 7)', () => {
    const host = (kind: 'native-x64' | 'rosetta') => ({ cpu: 'c', cores: 4, memoryBytes: 1, os: 'o', engine: { name: 'node', version: 'v24.12.0' }, arch: 'x64', kind });
    const x = xreport([{ ...ran('node-x64-rosetta', 'off', [1, 2, 3]), host: host('native-x64') }, { ...ran('node-x64-rosetta', 'on', [1, 2, 3]), host: host('native-x64') }, { leg: 'chromium', workers: 'off', status: 'blocked', reason: 'not cached' }], [1, 2, 3]);
    const r = buildReport(cfg({ legs: ['node-x64-rosetta', 'chromium'], workers: ['off', 'on'] }), x, [seedResult(1)]);
    expect(r.crosshost.runs[0]).toMatchObject({ run: 'node-x64-rosetta/off', hostKind: 'native-x64' });
    const s = summaryOf(r) as { crosshost: { runs: unknown[] } };
    expect(s.crosshost.runs).toEqual([
      { run: 'node-x64-rosetta/off', status: 'ran', hostKind: 'native-x64' },
      { run: 'node-x64-rosetta/on', status: 'ran', hostKind: 'native-x64', agrees: true },
      { run: 'chromium/off', status: 'blocked' },
    ]);
    expect(reportLines(r)[1]).toBe('cross-host incomplete: node-x64-rosetta/off ran on native-x64, node-x64-rosetta/on ran on native-x64, chromium/off blocked');
    // under Rosetta it says so
    const ro = buildReport(cfg(), xreport([{ ...ran('node-x64-rosetta', 'off', [1, 2, 3]), host: host('rosetta') }], [1, 2, 3]), [seedResult(1)]);
    expect((summaryOf(ro) as { crosshost: { runs: unknown[] } }).crosshost.runs).toEqual([{ run: 'node-x64-rosetta/off', status: 'ran', hostKind: 'rosetta' }]);
  });
  it('says that the refused count covers the in-process seeds only (hardening S1, check note 8)', () => {
    const x = xreport([ran('node-x64-rosetta', 'off', [1, 2, 3])], [1, 2, 3]);
    const r = buildReport(cfg(), x, [seedResult(1, { bugs: ['site:S5:refused', 'fusion:S8:refused'] })]);
    expect(r.bugs).toEqual({ runs: 2, refused: 2, list: ['1:site:S5:refused', '1:fusion:S8:refused'] });
    const s = summaryOf(r);
    expect(s['refused']).toBe(2);
    expect(s['refusedScope']).toEqual({ inProcessSeeds: 1, crossHostOnlySeeds: 2 });
    expect(reportLines(r)[6]).toMatch(/^refused stages: 2 \(the 1 in-process seeds only; 2 cross-host-only seeds compared, not counted\); /);
    // a run with no in-process seed counts nothing, and says that every seed went uncounted
    const none = summaryOf(buildReport(cfg({ checks: 0 }), x, []));
    expect(none['refused']).toBe(0);
    expect(none['refusedScope']).toEqual({ inProcessSeeds: 0, crossHostOnlySeeds: 3 });
  });
});
