// M0-e-06's fold, its verdicts and its arguments on built records (no derivation): every bar of M0.md §1 (e) judged
// from the receipts — pass on records that hold it, fail on one that breaks it (the failing seed named), unobserved
// when no derivation reached it (never a silent pass); C-0091's work-per-unit quantiles; the stage times' p50s and
// R12-4's rows (C-0084); the harness's arguments (the defaults the item names: 200 seeds, both fixtures, both
// configurations) and refusals.
import { describe, expect, it } from 'vitest';
import {
  BAR_NAMES,
  bandReceipt,
  DEFAULT_SEEDS,
  foldGroup,
  foldReport,
  foldTimes,
  gateMs,
  median,
  parseSiteArgs,
  quantiles,
  R12_4_ROWS,
  receiptsOf,
  reliefReceipt,
  SITE_FIXTURES,
  SITE_GATE_ROW,
  spikeTasks,
  summaryOf,
  WARD_SHARE_MIN,
  type RunRecord,
} from '../../src/site/index.js';
import { tableView } from '@plat/tables';

const C0 = { faces: 4, skeletons: 4, downgrades: 0, workLimitHits: 0, failures: 0 };

/** A record that holds every bar (fixture relief-60, default). */
function good(seed: number, over: Partial<RunRecord> = {}): RunRecord {
  return {
    fixture: 'relief-60',
    config: 'default',
    seed,
    stages: { S1: 'ok', S3: 'ok', S4: 'ok', S5: 'ok', S6: 'ok' },
    bugs: [],
    hydro: { cellCm: 2500, cols: 10, rows: 10, cells: 100, defined: 100, landCells: 90, landDefined: 90, drainsOff: true },
    rivers: [{ id: 'water:river:0', fits: true, outfall: 'frame', reachesCore: true, attempt: 0, bedCells: 40, bedMonotone: true }],
    riverRequested: ['river full'],
    relief: { deepestCutCm: 380, carveMaxCm: 400, raised: 0, reliefCm: 6000, clampedCells: 0, limitCm: 1_000_000 },
    waterGates: { gates: 1, wallOverWater: 1, wallOverWaterGated: 1, gatesWithOneEdge: 1, endsResolved: 2, endsOnShore: 2, endsAtRecordedBank: 2, stripFaces: 4, stripVerticesInWater: 0, mainGates: 4, gateSites: 4 },
    bridges: { sites: 3, built: 1, builtWithSpan: 1, builtWayNamed: 1, sitesClear: 2, wayOverWaterOffSpan: 0 },
    districts: { landHa: 100, nd: 11, districts: 12, countLaw: true, unownedByStage: 0, samples: 50, samplesContained: 50, samplesInDistricts: 44, wards: 4, wardMedianHa: 3, townMedianHa: 5, wardsBelow: true, leftovers: 0, belowFloor: 0, merges: 1 },
    fields: { cellCm: 3200, bands: ['prosperity', 'density', 'greenery'].map((field) => ({ field, landCells: 900, perBand: [10, 10, 195, 392, 195, 98], maxErrorCells: 0.9, readBack: true })), recomputedEqual: true, weightZeroIdentical: true },
    corpus: { district: { roof: C0, spine: C0 }, water: { roof: C0, spine: C0 } },
    work: { 'hydro.cells': { work: 100, units: 100 }, 'grower.turns': { work: 30, units: 60 + seed }, 'field.cells': { work: 300, units: 100 } },
    batches: { S1: { committed: 2, refused: 0, maxShare: 0.1 } },
    ...over,
  };
}

const SEEDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('the fold: every bar passes on records that hold it', () => {
  it('all thirteen bars pass, each observed, and the report passes', () => {
    const r = foldReport('test', 1, 10, ['relief-60'], ['default'], SEEDS.map((s) => good(s)));
    expect(Object.keys(r.verdicts)).toEqual([...BAR_NAMES]);
    for (const b of BAR_NAMES) expect([b, r.verdicts[b]]).toEqual([b, 'pass']);
    expect(r.pass).toBe(true);
    const g = r.groups[0];
    expect(g.runs).toBe(10);
    expect(g.bars.d8.numbers).toMatchObject({ landShare: 1, share: 1, cells: 1000 });
    expect(g.stages['S6']).toEqual({ ok: 10, refused: {}, notReached: 0 });
  });
});

describe('the fold: each bar fails on one record that breaks it, naming its seed', () => {
  const cases: [string, (r: RunRecord) => RunRecord][] = [
    ['d8', (r) => ({ ...r, hydro: { ...(r.hydro as NonNullable<RunRecord['hydro']>), landDefined: 89 } })],
    ['d8', (r) => ({ ...r, hydro: { ...(r.hydro as NonNullable<RunRecord['hydro']>), drainsOff: false } })],
    ['bedMonotone', (r) => ({ ...r, rivers: [{ ...r.rivers[0], bedMonotone: false }] })],
    ['carve', (r) => ({ ...r, relief: { ...(r.relief as NonNullable<RunRecord['relief']>), deepestCutCm: 401 } })],
    ['carve', (r) => ({ ...r, relief: { ...(r.relief as NonNullable<RunRecord['relief']>), raised: 1 } })],
    ['noClamp', (r) => ({ ...r, relief: { ...(r.relief as NonNullable<RunRecord['relief']>), clampedCells: 1 } })],
    ['reliefAsNamed', (r) => ({ ...r, relief: { ...(r.relief as NonNullable<RunRecord['relief']>), reliefCm: 1999 } })],
    ['waterGates', (r) => ({ ...r, waterGates: { ...(r.waterGates as NonNullable<RunRecord['waterGates']>), wallOverWater: 2 } })],
    ['waterGates', (r) => ({ ...r, waterGates: { ...(r.waterGates as NonNullable<RunRecord['waterGates']>), endsOnShore: 1 } })],
    ['waterGates', (r) => ({ ...r, waterGates: { ...(r.waterGates as NonNullable<RunRecord['waterGates']>), stripVerticesInWater: 1 } })],
    ['waterGates', (r) => ({ ...r, waterGates: { ...(r.waterGates as NonNullable<RunRecord['waterGates']>), mainGates: 5 } })],
    ['waterGates', (r) => ({ ...r, waterGates: { ...(r.waterGates as NonNullable<RunRecord['waterGates']>), gatesWithOneEdge: 0 } })],
    ['spans', (r) => ({ ...r, bridges: { ...(r.bridges as NonNullable<RunRecord['bridges']>), builtWithSpan: 0 } })],
    ['spans', (r) => ({ ...r, bridges: { ...(r.bridges as NonNullable<RunRecord['bridges']>), sitesClear: 1 } })],
    ['spans', (r) => ({ ...r, bridges: { ...(r.bridges as NonNullable<RunRecord['bridges']>), wayOverWaterOffSpan: 1 } })],
    ['spans', (r) => ({ ...r, bridges: { ...(r.bridges as NonNullable<RunRecord['bridges']>), builtWayNamed: 0 } })],
    ['containment', (r) => ({ ...r, districts: { ...(r.districts as NonNullable<RunRecord['districts']>), samplesContained: 49 } })],
    ['containment', (r) => ({ ...r, districts: { ...(r.districts as NonNullable<RunRecord['districts']>), unownedByStage: 1 } })],
    ['countLaw', (r) => ({ ...r, districts: { ...(r.districts as NonNullable<RunRecord['districts']>), districts: 13, countLaw: false } })],
    ['fieldBands', (r) => ({ ...r, fields: { ...(r.fields as NonNullable<RunRecord['fields']>), bands: [{ ...(r.fields as NonNullable<RunRecord['fields']>).bands[0], maxErrorCells: 1.01 }] } })],
    ['fieldBands', (r) => ({ ...r, fields: { ...(r.fields as NonNullable<RunRecord['fields']>), bands: [{ ...(r.fields as NonNullable<RunRecord['fields']>).bands[0], readBack: false }] } })],
    ['weightZero', (r) => ({ ...r, fields: { ...(r.fields as NonNullable<RunRecord['fields']>), weightZeroIdentical: false } })],
    ['weightZero', (r) => ({ ...r, fields: { ...(r.fields as NonNullable<RunRecord['fields']>), recomputedEqual: false } })],
  ];
  for (const [name, breakIt] of cases) {
    it(`${name}: one broken record fails the bar and the report, its seed named`, () => {
      const recs = SEEDS.map((s) => (s === 7 ? breakIt(good(s)) : good(s)));
      const r = foldReport('test', 1, 10, ['relief-60'], ['default'], recs);
      const b = r.groups[0].bars[name as (typeof BAR_NAMES)[number]];
      expect(b.verdict).toBe('fail');
      expect(b.failing).toEqual([7]);
      expect(r.verdicts[name as (typeof BAR_NAMES)[number]]).toBe('fail');
      expect(r.pass).toBe(false);
      // every other bar still passes
      for (const other of BAR_NAMES) if (other !== name) expect([other, r.verdicts[other]]).toEqual([other, 'pass']);
    });
  }

  it('countLaw: within ± 1 passes, ± 2 fails (the bound in both directions)', () => {
    for (const [d, nd, ok] of [[12, 11, true], [10, 11, true], [13, 11, false], [9, 11, false]] as const) {
      const recs = SEEDS.map((s) => good(s, { districts: { ...(good(s).districts as NonNullable<RunRecord['districts']>), districts: d, nd, countLaw: Math.abs(d - nd) <= 1 } }));
      expect(foldGroup('relief-60', 'default', recs).bars.countLaw.verdict).toBe(ok ? 'pass' : 'fail');
    }
  });

  it('gateWards: 9 of 10 below the town passes (≥ 90 %), 8 of 10 fails; runs with no ward do not count', () => {
    expect(WARD_SHARE_MIN).toBe(0.9);
    const D = (s: number, below: boolean | null): RunRecord => good(s, { districts: { ...(good(s).districts as NonNullable<RunRecord['districts']>), wardsBelow: below, wardMedianHa: below === null ? null : 3 } });
    const nine = foldGroup('relief-60', 'default', SEEDS.map((s) => D(s, s !== 3)));
    expect([nine.bars.gateWards.verdict, nine.bars.gateWards.numbers['share'], nine.bars.gateWards.failing]).toEqual(['pass', 0.9, [3]]);
    const eight = foldGroup('relief-60', 'default', SEEDS.map((s) => D(s, s !== 3 && s !== 4)));
    expect(eight.bars.gateWards.verdict).toBe('fail');
    const none = foldGroup('relief-60', 'default', [...SEEDS.map((s) => D(s, s <= 9 ? true : null))]);
    expect([none.bars.gateWards.verdict, none.bars.gateWards.observed]).toEqual(['pass', 9]);
    expect(foldGroup('relief-60', 'default', SEEDS.map((s) => D(s, null))).bars.gateWards.verdict).toBe('unobserved');
  });

  it('corpus: the M0-a-12 bar over the group\'s faces (downgrades ≤ 0.5 %, work-limit hits ≤ 0.1 %, no failure)', () => {
    const many = { faces: 1000, skeletons: 995, downgrades: 5, workLimitHits: 1, failures: 0 };
    const at = (c: typeof many): RunRecord[] => SEEDS.map((s) => good(s, { corpus: { district: { roof: s === 1 ? c : C0, spine: C0 }, water: { roof: C0, spine: C0 } } }));
    expect(foldGroup('relief-60', 'default', at(many)).bars.corpus.verdict).toBe('pass');
    expect(foldGroup('relief-60', 'default', at({ ...many, downgrades: 6, skeletons: 994 })).bars.corpus.verdict).toBe('fail');
    expect(foldGroup('relief-60', 'default', at({ ...many, workLimitHits: 2 })).bars.corpus.verdict).toBe('fail');
    expect(foldGroup('relief-60', 'default', at({ ...many, failures: 1 })).bars.corpus.verdict).toBe('fail');
    // a set of the run's water faces breaking the bar fails it too
    const wet = SEEDS.map((s) => good(s, { corpus: { district: { roof: C0, spine: C0 }, water: { roof: C0, spine: s === 2 ? { faces: 4, skeletons: 3, downgrades: 1, workLimitHits: 0, failures: 0 } : C0 } } }));
    expect(foldGroup('relief-60', 'default', wet).bars.corpus.verdict).toBe('fail');
  });
});

describe('the fold: a clause no derivation reached is unobserved, never a pass', () => {
  it('no river crossing, no built bridge, no S6: waterGates, spans and the S6 bars unobserved; the report does not pass', () => {
    const recs = SEEDS.map((s) =>
      good(s, {
        stages: { S1: 'ok', S3: 'ok', S4: 'ok', S5: 'refused E_SELF_INTERSECT', S6: 'not reached' },
        waterGates: { gates: 0, wallOverWater: 0, wallOverWaterGated: 0, gatesWithOneEdge: 0, endsResolved: 0, endsOnShore: 0, endsAtRecordedBank: 0, stripFaces: 4, stripVerticesInWater: 0, mainGates: 4, gateSites: 4 },
        bridges: { sites: 3, built: 0, builtWithSpan: 0, builtWayNamed: 0, sitesClear: 3, wayOverWaterOffSpan: 0 },
        districts: null,
        fields: null,
        corpus: { district: { roof: { ...C0, faces: 0, skeletons: 0 }, spine: { ...C0, faces: 0, skeletons: 0 } }, water: { roof: C0, spine: C0 } },
      }),
    );
    const r = foldReport('test', 1, 10, ['relief-60'], ['default'], recs);
    for (const b of ['waterGates', 'spans', 'containment', 'countLaw', 'gateWards', 'fieldBands', 'weightZero'] as const) expect([b, r.verdicts[b]]).toEqual([b, 'unobserved']);
    expect(r.verdicts.d8).toBe('pass');
    expect(r.pass).toBe(false);
    expect(r.groups[0].stages['S5']).toEqual({ ok: 0, refused: { E_SELF_INTERSECT: 10 }, notReached: 0 });
    expect(r.groups[0].stages['S6']).toEqual({ ok: 0, refused: {}, notReached: 10 });
  });

  it('a broken receipt fails its bar even where the clause itself was never reached (a way over water off a span, no bridge built)', () => {
    const recs = SEEDS.map((s) => good(s, { bridges: { sites: 3, built: 0, builtWithSpan: 0, builtWayNamed: 0, sitesClear: 3, wayOverWaterOffSpan: s === 5 ? 1 : 0 } }));
    const b = foldGroup('relief-60', 'default', recs).bars.spans;
    expect([b.verdict, b.observed, b.failing]).toEqual(['fail', 0, [5]]);
    const clean = SEEDS.map((s) => good(s, { bridges: { sites: 3, built: 0, builtWithSpan: 0, builtWayNamed: 0, sitesClear: 3, wayOverWaterOffSpan: 0 } }));
    expect(foldGroup('relief-60', 'default', clean).bars.spans.verdict).toBe('unobserved');
    // N changed on a run whose trace met no river fails the water-gate bar too
    const n = SEEDS.map((s) => good(s, { waterGates: { gates: 0, wallOverWater: 0, wallOverWaterGated: 0, gatesWithOneEdge: 0, endsResolved: 0, endsOnShore: 0, endsAtRecordedBank: 0, stripFaces: 4, stripVerticesInWater: 0, mainGates: s === 4 ? 3 : 4, gateSites: 4 } }));
    expect(foldGroup('relief-60', 'default', n).bars.waterGates.verdict).toBe('fail');
  });

  it('the verdict over groups: fail if any group fails, pass if any observed, the groups in fixture then configuration order', () => {
    const a = SEEDS.map((s) => good(s));
    const b = SEEDS.map((s) => ({ ...good(s, s === 2 ? { districts: { ...(good(s).districts as NonNullable<RunRecord['districts']>), districts: 20, countLaw: false } } : {}), fixture: 'relief-3000', config: 'coarse' as const }));
    const r = foldReport('city', 1, 10, ['relief-60', 'relief-3000'], ['default', 'coarse'], [...a, ...b]);
    expect(r.groups.map((g) => [g.fixture, g.config, g.runs])).toEqual([
      ['relief-60', 'default', 10],
      ['relief-60', 'coarse', 0],
      ['relief-3000', 'default', 0],
      ['relief-3000', 'coarse', 10],
    ]);
    expect(r.verdicts.countLaw).toBe('fail');
    expect(r.verdicts.d8).toBe('pass');
    expect(r.groups[1].bars.d8.verdict).toBe('unobserved');
  });
});

describe('C-0091: the work per unit per counter the run charged', () => {
  it('per counter: the stage, the law\'s unit, the unit counts and the work per unit as { n, p50, p99, p999, max }', () => {
    const g = foldGroup('relief-60', 'default', SEEDS.map((s) => good(s)));
    expect(Object.keys(g.work)).toEqual(['hydro.cells', 'grower.turns', 'field.cells']);
    expect(g.work['grower.turns'].stage).toBe('S6');
    expect(g.work['grower.turns'].unit).toBe('faces');
    expect(g.work['grower.turns'].unitsTotal).toBe(SEEDS.reduce((s, x) => s + 60 + x, 0));
    expect(g.work['grower.turns'].perUnit).toEqual(quantiles(SEEDS.map((s) => 30 / (60 + s))));
    expect(g.work['grower.turns'].perUnit.n).toBe(10);
    expect(g.work['hydro.cells']).toMatchObject({ stage: 'S1', unit: 'frameCells', perUnit: { n: 10, p50: 1, max: 1 } });
    expect(g.work['field.cells'].perUnit.p999).toBe(3);
    // a counter the run did not charge is left out
    const none = foldGroup('relief-60', 'default', SEEDS.map((s) => good(s, { work: {} })));
    expect(none.work).toEqual({});
  });

  it('quantiles: Hyndman and Fan type 7 over the values; an empty list is all zeros with n 0', () => {
    expect(quantiles([3, 1, 2])).toEqual({ n: 3, p50: 2, p99: 2.98, p999: 2.998, max: 3 });
    expect(quantiles([])).toEqual({ n: 0, p50: 0, p99: 0, p999: 0, max: 0 });
    expect(median([4, 1, 3, 2])).toBe(2.5);
    expect(median([5, 1, 3])).toBe(3);
  });
});

describe('the receipts\' own arithmetic', () => {
  it('bandReceipt: each land cell banded by the record\'s cuts; the error against share × land; the read-back against the record', () => {
    const values = Float64Array.from([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95]);
    const land = Uint8Array.from([1, 1, 1, 1, 1, 1, 1, 1, 1, 0]);
    const field = { field: 'density', values, bands: { cuts: [0.25, 0.55] }, cutResult: { perBand: [2, 3, 4] } } as never;
    const r = bandReceipt(field, land, [2 / 9, 3 / 9, 4 / 9]);
    expect(r).toEqual({ field: 'density', landCells: 9, perBand: [2, 3, 4], maxErrorCells: r.maxErrorCells, readBack: true });
    expect(r.maxErrorCells).toBeLessThan(1e-9);
    const off = bandReceipt(field, land, [0.5, 0.25, 0.25]);
    expect(off.maxErrorCells).toBeCloseTo(2.5, 9);
    const stale = bandReceipt({ ...(field as object), cutResult: { perBand: [3, 2, 4] } } as never, land, [2 / 9, 3 / 9, 4 / 9]);
    expect(stale.readBack).toBe(false);
    // a value equal to a cut belongs to the band above it
    const edge = bandReceipt({ field: 'x', values: Float64Array.from([0.25]), bands: { cuts: [0.25] }, cutResult: { perBand: [0, 1] } } as never, Uint8Array.from([1]), [0, 1]);
    expect(edge.perBand).toEqual([0, 1]);
  });

  it('reliefReceipt: the deepest cut, the raised cells, the relief before the carve, the cap of the rung', () => {
    const before = Int32Array.from([100, 500, 900, 300]);
    const after = { heightCm: Int32Array.from([100, 120, 950, 300]), reliefLimitCm: 1_000_000 } as never;
    const r = reliefReceipt(before, after, 'CITY', tableView(), 0);
    expect(r).toEqual({ deepestCutCm: 380, carveMaxCm: 400, raised: 1, reliefCm: 800, clampedCells: 0, limitCm: 1_000_000 });
  });
});

describe('the stage times (C-0084, R12-5): folded, never judged outside a stamped batch', () => {
  it('gateMs sums S1 + S4 + S6 only (S3 and S5 are not the gate\'s), null when one is missing', () => {
    expect(gateMs({ S1: 10, S3: 100, S4: 2, S5: 50, S6: 7 })).toBe(19);
    expect(gateMs({ S1: 10, S3: 100, S4: 2, S5: 50 })).toBeNull();
  });

  it('foldTimes: per-stage p50s, the gate\'s p50 over the runs that reached S6, R12-4\'s rows against §12.4\'s figures', () => {
    const t = foldTimes('relief-60', 'default', [{ S1: 30, S3: 9, S4: 5, S5: 40, S6: 10 }, { S1: 20, S3: 12, S4: 15, S5: 40, S6: 20 }, { S1: 26, S3: 30, S4: 8, S5: 1 }], 'informative');
    expect(t.stageP50).toEqual({ S1: 26, S3: 12, S4: 8, S5: 40, S6: 15 });
    expect([t.gateP50, t.gateRuns]).toEqual([(45 + 55) / 2, 2]);
    expect(R12_4_ROWS.map((r) => [r.stage, r.figureMs])).toEqual([['S1', 25], ['S3', 11], ['S4', 10], ['S6', 17]]);
    expect(t.r12_4.map((r) => [r.stage, r.p50, r.exceeds])).toEqual([['S1', 26, true], ['S3', 12, true], ['S4', 8, false], ['S6', 15, false]]);
    expect(t.stamp).toBeNull();
    expect(t.judgement).toBeNull();
    expect(t.note).toContain('never judged');
    expect([SITE_GATE_ROW.row, SITE_GATE_ROW.budget, SITE_GATE_ROW.unit]).toEqual(['R12-5', 50, 'ms']);
  });

  it('the summary: numbers and verdicts, the work, the times — the records left out', () => {
    const rep = foldReport('test', 1, 10, ['relief-60'], ['default'], SEEDS.map((s) => good(s)));
    const s = summaryOf(rep, [foldTimes('relief-60', 'default', [{ S1: 1, S4: 1, S6: 1 }], 'informative')]);
    expect(Object.keys(s)).toEqual(['item', 'size', 'seeds', 'fixtures', 'configs', 'pass', 'verdicts', 'groups', 'timing']);
    expect(s['item']).toBe('M0-e-06');
    expect(JSON.stringify(s)).not.toContain('records');
    expect((s['timing'] as { authority: string; verdict: string }[])[0]).toMatchObject({ authority: 'contended', verdict: 'requeue', gateP50: 3 });
    expect((s['groups'] as { work: object }[])[0].work).toEqual(rep.groups[0].work);
    expect(receiptsOf(rep)).not.toHaveProperty('records');
  });
});

describe('bench -- site: its arguments', () => {
  it('defaults to the item\'s run: 200 seeds from 1, both fixtures, the default and the coarsening switch, CITY', () => {
    const a = parseSiteArgs([], {});
    if (typeof a === 'string') throw new Error(a);
    expect(DEFAULT_SEEDS).toBe(200);
    expect(a).toMatchObject({ seeds: 200, first: 1, fixtures: ['relief-60', 'relief-3000'], configs: ['default', 'coarse'], size: 'city', workers: 1, timing: false, summary: false });
    expect(SITE_FIXTURES.map((f) => f.name)).toEqual(['relief-60', 'relief-3000']);
    const tasks = spikeTasks(a);
    expect(tasks).toHaveLength(800);
    expect(tasks[0]).toEqual({ fixture: 'relief-60', config: 'default', seed: 1, size: 'city' });
    expect(tasks[199]).toEqual({ fixture: 'relief-60', config: 'default', seed: 200, size: 'city' });
    expect(tasks[200]).toEqual({ fixture: 'relief-60', config: 'coarse', seed: 1, size: 'city' });
    expect(tasks[799]).toEqual({ fixture: 'relief-3000', config: 'coarse', seed: 200, size: 'city' });
    const b = parseSiteArgs(['--seeds', '3', '--first', '7', '--fixture', 'relief-3000', '--config', 'coarse', '--size', 'test', '--workers', '2', '--timing', '--idle-ms', '0', '--summary'], {});
    expect(b).toMatchObject({ seeds: 3, first: 7, fixtures: ['relief-3000'], configs: ['coarse'], size: 'test', workers: 2, timing: true, idleMs: 0, summary: true });
    expect(parseSiteArgs([], { PLAT_BENCH_WORKERS: '5' })).toMatchObject({ workers: 5 });
  });

  it('refuses an unknown, repeated or malformed argument with its reason', () => {
    for (const bad of [['--nope'], ['--seeds', '0'], ['--seeds', '1001'], ['--seeds', 'x'], ['--seeds'], ['--fixture', 'relief-9'], ['--config', 'fine'], ['--size', 'metropolis'], ['--workers', '0'], ['--idle-ms', '5'], ['--seeds', '2', '--seeds', '3'], ['--first', '-1']]) {
      expect(typeof parseSiteArgs(bad, {}), bad.join(' ')).toBe('string');
    }
    expect(typeof parseSiteArgs([], { PLAT_BENCH_WORKERS: 'many' })).toBe('string');
  });
});
