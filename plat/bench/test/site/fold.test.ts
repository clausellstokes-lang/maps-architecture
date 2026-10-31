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
import { loadWorkLimits, tableView } from '@plat/tables';
import { attachIndex, createKernel, createPlat, type PlatKey } from '@plat/kernel';
import { fieldsCells, type S6Output } from '@plat/layout';
import { districtReceipt, stageOutcomes, withoutSoftRows } from '../../src/site/index.js';
import { STAGE_WORK } from '../../src/site/report.js';
import { canaryIndex, chargedWork, recordDigest } from '../../src/site/anchor.js';
import { KERNEL_COUNTERS, kernelUnits, lawUnits } from '../../src/site/receipts.js';

/** No downgrade: every cause 0 (the runner's names, in its order). */
const NO_CAUSES = {
  contract: { empty: 0, degenerate: 0, notSimple: 0, sharpCorner: 0, holeContact: 0, holeOutside: 0 },
  validator: { planarity: 0, faces: 0, heights: 0, topology: 0 },
  workLimit: 0,
};
const C0 = { faces: 4, skeletons: 4, downgrades: 0, workLimitHits: 0, failures: 0, causes: NO_CAUSES };

type WG = NonNullable<RunRecord['waterGates']>;
type ER = WG['enceintes'][number];
/** Stage 1's enceinte with one water gate (its chord the one wall edge over water), and a dry stage-2 enceinte. */
const E1: ER = { enceinte: 'enceinte:1', stage: 1, recorded: true, gates: 1, wallOverWater: 1, wallOverWaterGated: 1, gatesWithOneEdge: 1, endsResolved: 2, endsOnShore: 2, endsAtRecordedBank: 2, stripFaces: 4, stripVerticesInWater: 0 };
const E2: ER = { ...E1, enceinte: 'enceinte:2', stage: 2, gates: 0, wallOverWater: 0, wallOverWaterGated: 0, gatesWithOneEdge: 0, endsResolved: 0, endsOnShore: 0, endsAtRecordedBank: 0 };
/** A water-gate receipt from its per-enceinte rows (the totals their sums, as the receipt writes them). */
function wgOf(rows: readonly ER[], mainGates = 4, gateSites = 4): WG {
  const sum = (k: keyof ER): number => rows.reduce((t, r) => t + (r[k] as number), 0);
  return {
    gates: sum('gates'),
    wallOverWater: sum('wallOverWater'),
    wallOverWaterGated: sum('wallOverWaterGated'),
    gatesWithOneEdge: sum('gatesWithOneEdge'),
    endsResolved: sum('endsResolved'),
    endsOnShore: sum('endsOnShore'),
    endsAtRecordedBank: sum('endsAtRecordedBank'),
    stripFaces: sum('stripFaces'),
    stripVerticesInWater: sum('stripVerticesInWater'),
    mainGates,
    gateSites,
    enceintes: rows.map((r) => ({ ...r })),
    sharedWallOverWater: 0,
  };
}
/** The record's water gates with enceinte row i patched. */
const wgRow = (r: RunRecord, i: number, patch: Partial<ER>): RunRecord => ({ ...r, waterGates: wgOf((r.waterGates as WG).enceintes.map((e, j) => (j === i ? { ...e, ...patch } : e)), (r.waterGates as WG).mainGates, (r.waterGates as WG).gateSites) });

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
    waterGates: wgOf([E1, E2]),
    bridges: { sites: 3, built: 1, builtWithSpan: 1, builtWayNamed: 1, sitesClear: 2, wayOverWaterOffSpan: 0 },
    districts: { landHa: 100, nd: 11, districts: 12, countLaw: true, unownedByStage: 0, samples: 50, samplesContained: 50, samplesInDistricts: 44, wards: 4, wardMedianHa: 3, townMedianHa: 5, wardsBelow: true, leftovers: 0, belowFloor: 0, merges: 1 },
    fields: { cellCm: 3200, bands: ['prosperity', 'density', 'greenery'].map((field) => ({ field, landCells: 900, perBand: [10, 10, 195, 392, 195, 98], maxErrorCells: 0.9, readBack: true })), recomputedEqual: true, weightZeroIdentical: true },
    corpus: { district: { roof: C0, spine: C0 }, water: { roof: C0, spine: C0 } },
    work: { 'hydro.cells': { work: 100, units: 100 }, 'grower.turns': { work: 30, units: 60 + seed }, 'field.cells': { work: 300, units: 100 } },
    batches: { S1: { committed: 2, refused: 0, maxShare: 0.1 } },
    refusals: {},
    kernelBatches: [],
    stageRows: {},
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
    ['waterGates', (r) => wgRow(r, 0, { wallOverWater: 2 })],
    ['waterGates', (r) => wgRow(r, 0, { wallOverWaterGated: 0 })],
    ['waterGates', (r) => wgRow(r, 0, { endsOnShore: 1 })],
    ['waterGates', (r) => wgRow(r, 0, { endsResolved: 1 })],
    ['waterGates', (r) => wgRow(r, 0, { stripVerticesInWater: 1 })],
    ['waterGates', (r) => ({ ...r, waterGates: { ...(r.waterGates as WG), mainGates: 5 } })],
    ['waterGates', (r) => wgRow(r, 0, { gatesWithOneEdge: 0 })],
    // a stage-2 wall edge over water no gate of enceinte:2 spans (N-54 (4)), and a stage-2 strip vertex in the water
    ['waterGates', (r) => wgRow(r, 1, { wallOverWater: 1 })],
    ['waterGates', (r) => wgRow(r, 1, { stripVerticesInWater: 1 })],
    // a wall standing in the arena with no record over water (read ungated)
    ['waterGates', (r) => ({ ...r, waterGates: wgOf([...(r.waterGates as WG).enceintes, { ...E2, enceinte: 'enceinte:3', stage: 0, recorded: false, wallOverWater: 1 }]) })],
    // judged per enceinte: stage 1's gate has no wet edge while stage 2's wet edge is gated by nothing of its own —
    // every total equals its sum and the totals alone would pass
    ['waterGates', (r) => ({ ...r, waterGates: wgOf([{ ...E1, wallOverWater: 0, wallOverWaterGated: 0, gatesWithOneEdge: 0 }, { ...E2, wallOverWater: 1, wallOverWaterGated: 1, gatesWithOneEdge: 1 }]) })],
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
    const many = { faces: 1000, skeletons: 995, downgrades: 5, workLimitHits: 1, failures: 0, causes: { ...NO_CAUSES, contract: { ...NO_CAUSES.contract, sharpCorner: 4 }, workLimit: 1 } };
    const at = (c: typeof many): RunRecord[] => SEEDS.map((s) => good(s, { corpus: { district: { roof: s === 1 ? c : C0, spine: C0 }, water: { roof: C0, spine: C0 } } }));
    expect(foldGroup('relief-60', 'default', at(many)).bars.corpus.verdict).toBe('pass');
    // exactly at both bounds over the group (964 + 9 × 4 = 1 000 faces: 5 downgrades, 1 work-limit hit) still passes
    expect(foldGroup('relief-60', 'default', at({ ...many, faces: 964, skeletons: 959 })).bars.corpus.verdict).toBe('pass');
    expect(foldGroup('relief-60', 'default', at({ ...many, downgrades: 6, skeletons: 994 })).bars.corpus.verdict).toBe('fail');
    expect(foldGroup('relief-60', 'default', at({ ...many, workLimitHits: 2 })).bars.corpus.verdict).toBe('fail');
    expect(foldGroup('relief-60', 'default', at({ ...many, failures: 1 })).bars.corpus.verdict).toBe('fail');
    // a set of the run's water faces breaking the bar fails it too
    const wet = SEEDS.map((s) => good(s, { corpus: { district: { roof: C0, spine: C0 }, water: { roof: C0, spine: s === 2 ? { faces: 4, skeletons: 3, downgrades: 1, workLimitHits: 0, failures: 0, causes: { ...NO_CAUSES, validator: { ...NO_CAUSES.validator, faces: 1 } } } : C0 } } }));
    expect(foldGroup('relief-60', 'default', wet).bars.corpus.verdict).toBe('fail');
  });

  it('corpus: the report keeps each downgrade\'s cause per set, summed over the group — a sharpCorner sliver told from a validator failure (M0-e-06 S2, note 4)', () => {
    const sliver = { faces: 4, skeletons: 3, downgrades: 1, workLimitHits: 0, failures: 0, causes: { ...NO_CAUSES, contract: { ...NO_CAUSES.contract, sharpCorner: 1 } } };
    const invalid = { faces: 4, skeletons: 3, downgrades: 1, workLimitHits: 0, failures: 0, causes: { ...NO_CAUSES, validator: { ...NO_CAUSES.validator, faces: 1 } } };
    const recs = SEEDS.map((s) => good(s, { corpus: { district: { roof: s <= 3 ? sliver : C0, spine: C0 }, water: { roof: s === 4 ? invalid : C0, spine: C0 } } }));
    const n = foldGroup('relief-60', 'default', recs).bars.corpus.numbers;
    expect([n['districtRoof.downgrades'], n['districtRoof.contract.sharpCorner'], n['districtRoof.validator.faces'], n['districtRoof.workLimit']]).toEqual([3, 3, 0, 0]);
    expect([n['waterRoof.downgrades'], n['waterRoof.contract.sharpCorner'], n['waterRoof.validator.faces']]).toEqual([1, 0, 1]);
    // every cause is reported, zero or not, in the runner's order
    expect(Object.keys(n).filter((k) => k.startsWith('districtSpine.'))).toEqual([
      'districtSpine.faces',
      'districtSpine.downgrades',
      'districtSpine.workLimitHits',
      'districtSpine.failures',
      ...Object.keys(NO_CAUSES.contract).map((c) => `districtSpine.contract.${c}`),
      ...Object.keys(NO_CAUSES.validator).map((c) => `districtSpine.validator.${c}`),
      'districtSpine.workLimit',
    ]);
  });

  it('bedMonotone: only a fitting river observes the clause; a degraded (non-fitting) river is reported apart and still fails the bar when its bed rises (M0-e-06 S2, note 9)', () => {
    const river = (fits: boolean, bedCells: number, bedMonotone: boolean): RunRecord['rivers'][number] => ({ id: 'water:river:0', fits, outfall: fits ? 'frame' : 'sink', reachesCore: fits, attempt: 0, bedCells, bedMonotone });
    // every river degraded, each a 2-cell bed: the clause is not observed (a 2-cell bed never rising says next to nothing)
    const short = foldGroup('relief-3000', 'default', SEEDS.map((s) => good(s, { fixture: 'relief-3000', rivers: [river(false, 2, true)] }))).bars.bedMonotone;
    expect([short.verdict, short.observed, short.of]).toEqual(['unobserved', 0, 'fitting rivers']);
    expect(short.numbers).toMatchObject({ rivers: 10, fits: 0, fittingMonotone: 0, minFittingBedCells: null, degraded: 10, degradedMonotone: 10, minDegradedBedCells: 2, minBedCells: 2 });
    // fitting rivers observe it; the degraded ones beside them are reported apart
    const mixed = foldGroup('relief-3000', 'default', SEEDS.map((s) => good(s, { fixture: 'relief-3000', rivers: s <= 2 ? [river(false, 3, true)] : [river(true, 40 + s, true)] }))).bars.bedMonotone;
    expect([mixed.verdict, mixed.observed]).toEqual(['pass', 8]);
    expect(mixed.numbers).toMatchObject({ rivers: 10, fits: 8, fittingMonotone: 8, minFittingBedCells: 43, degraded: 2, degradedMonotone: 2, minDegradedBedCells: 3, minBedCells: 3 });
    // a degraded river whose bed rises still fails the bar (judged on every river, observed on the fitting ones)
    const rising = foldGroup('relief-3000', 'default', SEEDS.map((s) => good(s, { fixture: 'relief-3000', rivers: s === 6 ? [river(false, 5, false)] : [river(true, 40, true)] }))).bars.bedMonotone;
    expect([rising.verdict, rising.failing, rising.observed]).toEqual(['fail', [6], 9]);
  });
});

describe('the fold: a clause no derivation reached is unobserved, never a pass', () => {
  it('no river crossing, no built bridge, no S6: waterGates, spans and the S6 bars unobserved; the report does not pass', () => {
    const recs = SEEDS.map((s) =>
      good(s, {
        stages: { S1: 'ok', S3: 'ok', S4: 'ok', S5: 'refused E_SELF_INTERSECT', S6: 'not reached' },
        waterGates: wgOf([{ ...E2, enceinte: 'enceinte:1', stage: 1 }]),
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
    const n = SEEDS.map((s) => good(s, { waterGates: wgOf([{ ...E2, enceinte: 'enceinte:1', stage: 1 }, E2], s === 4 ? 3 : 4, 4) }));
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
    // the carve only cuts: a cell raised by one centimetre counts; a cell left as it was does not
    const one = reliefReceipt(Int32Array.from([100, 200]), { heightCm: Int32Array.from([101, 200]), reliefLimitCm: 1_000_000 } as never, 'CITY', tableView(), 0);
    expect([one.raised, one.deepestCutCm]).toEqual([1, 0]);
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

describe('districtReceipt\'s arithmetic on a built S6 output (no samples: an empty perimeter)', () => {
  const GROUND = { layer: 'ground', part: 0 } as PlatKey;
  const plat = createPlat(GROUND, { widthCm: 100_000, heightCm: 100_000, aspect: 1, marginShare: 0 } as never);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]));
  const grown = (kind: string, ha: number, merged = -1) => ({ seed: { kind }, faces: [], areaCm2: ha * 1e8, perimeterCm: 0, turns: 0, mergedInto: merged });
  const s6 = (nd: number, kinds: [string, number, number?][]): S6Output =>
    ({
      districts: kinds.filter((x) => (x[2] ?? -1) < 0).map((_, i) => ({ id: `district:${String(i)}` })),
      report: { landHa: 100, nd, unowned: 0, leftovers: 1, belowFloor: 2, merges: 3 },
      grow: { grown: kinds.map(([kind, ha, m]) => grown(kind, ha, m)) },
      perimeter: [],
      hinterland: 'district:hinterland',
    }) as unknown as S6Output;

  it('the count law: |L − N_d| ≤ 1 in both directions, 2 off fails', () => {
    const three: [string, number][] = [['market', 1], ['gate', 1], ['remainder', 1]];
    expect(districtReceipt(k, plat, s6(3, three)).countLaw).toBe(true);
    expect(districtReceipt(k, plat, s6(2, three)).countLaw).toBe(true);
    expect(districtReceipt(k, plat, s6(4, three)).countLaw).toBe(true);
    expect(districtReceipt(k, plat, s6(1, three)).countLaw).toBe(false);
    expect(districtReceipt(k, plat, s6(5, three)).countLaw).toBe(false);
    expect(districtReceipt(k, plat, s6(3, three))).toMatchObject({ landHa: 100, nd: 3, districts: 3, leftovers: 1, belowFloor: 2, merges: 3, unownedByStage: 0, samples: 0 });
  });

  it('the wards: gate and bridgehead wards (merged ones left out) against every alive district, by the median', () => {
    // wards 1 and 3 ha (median 2), town 1, 3, 5, 7 ha (median 4): below
    const r = districtReceipt(k, plat, s6(4, [['gate', 1], ['bridgehead', 3], ['market', 5], ['remainder', 7], ['gate', 0.1, 2]]));
    expect([r.wards, r.wardMedianHa, r.townMedianHa, r.wardsBelow]).toEqual([2, 2, 4, true]);
    // a bridgehead ward counts as a ward: alone and large, it is above the town
    const b = districtReceipt(k, plat, s6(3, [['bridgehead', 9], ['market', 1], ['remainder', 2]]));
    expect([b.wards, b.wardMedianHa, b.wardsBelow]).toEqual([1, 9, false]);
    // equal medians are not below
    const eq = districtReceipt(k, plat, s6(3, [['gate', 2], ['market', 1], ['remainder', 3]]));
    expect([eq.wardMedianHa, eq.townMedianHa, eq.wardsBelow]).toEqual([2, 2, false]);
    // no ward: unobserved for this run (null)
    expect(districtReceipt(k, plat, s6(2, [['market', 1], ['remainder', 2]])).wardsBelow).toBeNull();
    // a riverbank or market seed is no ward
    expect(districtReceipt(k, plat, s6(2, [['riverbank', 1], ['market', 3]])).wards).toBe(0);
  });
});

describe('the model without the soft terms (C-0049)', () => {
  it('withoutSoftRows removes exactly the daylight and water terms\' weight rows of the three fields', () => {
    const base = fieldsCells(tableView());
    const bare = fieldsCells(withoutSoftRows(tableView()));
    expect(base.fields.map((f) => f.field)).toEqual(bare.fields.map((f) => f.field));
    // fields.json carries the two soft rows on prosperity (at weight 0, C-0049); the variant drops them and nothing else
    const prosperity = base.fields.find((f) => f.field === 'prosperity');
    expect(prosperity?.terms.filter((t) => t.term === 'daylight' || t.term === 'waterTerm').map((t) => [t.term, t.weight])).toEqual([['daylight', 0], ['waterTerm', 0]]);
    for (let i = 0; i < base.fields.length; i += 1) {
      const terms = base.fields[i].terms.map((t) => t.term);
      expect(bare.fields[i].terms.map((t) => t.term)).toEqual(terms.filter((t) => t !== 'daylight' && t !== 'waterTerm'));
      expect(bare.fields[i].terms.map((t) => t.weight)).toEqual(base.fields[i].terms.filter((t) => t.term !== 'daylight' && t.term !== 'waterTerm').map((t) => t.weight));
    }
    expect(bare.shares).toEqual(base.shares);
  });
});

describe('stageOutcomes: a refused stage by its bug\'s code, every later stage not reached', () => {
  it('reads the runner\'s order and bug entries', () => {
    const d = (bugs: { stage: string; cls: string }[]) => ({ model: { order: ['S1', 'S3', 'S4', 'S5', 'S6'] }, report: { bugs } }) as never;
    expect(stageOutcomes(d([]))).toEqual({ S1: 'ok', S3: 'ok', S4: 'ok', S5: 'ok', S6: 'ok' });
    expect(stageOutcomes(d([{ stage: 'S3', cls: 'E_INVARIANT' }]))).toEqual({ S1: 'ok', S3: 'refused E_INVARIANT', S4: 'not reached', S5: 'not reached', S6: 'not reached' });
    expect(stageOutcomes(d([{ stage: 'S5', cls: 'E_SELF_INTERSECT' }]))).toEqual({ S1: 'ok', S3: 'ok', S4: 'ok', S5: 'refused E_SELF_INTERSECT', S6: 'not reached' });
  });
});


describe('hardening round S3: the refusal classes (Q122) and the per-stage work blocks (Q118)', () => {
  const refusedAt = (seed: number, stage: string, code: string, detail: string): RunRecord => {
    const order = ['S1', 'S3', 'S4', 'S5', 'S6'];
    const i = order.indexOf(stage);
    const stages = Object.fromEntries(order.map((s, j) => [s, j < i ? 'ok' : j === i ? `refused ${code}` : 'not reached'])) as RunRecord['stages'];
    return good(seed, { stages, refusals: { [stage]: { code, detail } } });
  };

  it('a class per stage and code: its seeds sorted, its count theirs, the lowest seed\'s message once with the distinct texts counted', () => {
    const rs = [refusedAt(9, 'S5', 'E_SELF_INTERSECT', 'F-WALL: b'), refusedAt(3, 'S5', 'E_SELF_INTERSECT', 'F-WALL: a'), refusedAt(5, 'S3', 'E_INVARIANT', 'gate x'), refusedAt(7, 'S5', 'E_SELF_INTERSECT', 'F-WALL: a'), good(1), good(2)];
    const g = foldGroup('relief-60', 'default', rs);
    expect(g.refusals).toEqual([
      { stage: 'S3', code: 'E_INVARIANT', count: 1, seeds: [5], message: 'gate x', messages: 1 },
      { stage: 'S5', code: 'E_SELF_INTERSECT', count: 3, seeds: [3, 7, 9], message: 'F-WALL: a', messages: 2 },
    ]);
    for (const c of g.refusals) expect(g.stages[c.stage].refused[c.code]).toBe(c.count);
    // a record with no runner detail for its refused stage names the seed with no message
    const bare = foldGroup('relief-60', 'default', [good(4, { stages: { S1: 'refused E_INVARIANT', S3: 'not reached', S4: 'not reached', S5: 'not reached', S6: 'not reached' } })]);
    expect(bare.refusals).toEqual([{ stage: 'S1', code: 'E_INVARIANT', count: 1, seeds: [4], message: null, messages: 0 }]);
    // the summary carries the classes per group
    const sum = summaryOf(foldReport('test', 1, 6, ['relief-60'], ['default'], rs), []) as { groups: { refusals: unknown }[] };
    expect(sum.groups[0].refusals).toEqual(g.refusals);
  });

  it('a stage\'s blocks: a kernel counter one sample per batch (its count over the batch\'s units), route.nodes and growth.* from the stage rows, every charged counter', () => {
    const kb = (stage: string, units: number, counts: Record<string, number>): RunRecord['kernelBatches'][number] => ({ stage, level: 1, limit: 0, units, committed: true, code: null, vertices: 0, faces: 0, counts });
    const r1 = good(1, {
      kernelBatches: [kb('S1', 10, { 'insert.points': 20 }), kb('S3', 100, { 'insert.points': 5, 'tx.facesWalked': 1 }), kb('S4', 10, {}), kb('S5', 50, { 'insert.points': 50 }), kb('S5', 50, {}), kb('S6', 10, { 'insert.points': 1 })],
      stageRows: { S3: { 'route.nodes': [{ work: 300, units: 100 }] }, S4: { 'route.nodes': [{ work: 0, units: 100 }] }, S5: { 'route.nodes': [{ work: 50, units: 100 }], 'growth.proposals': [{ work: 8, units: 4 }, { work: 2, units: 4 }], 'growth.candidates': [{ work: 1, units: 1 }] } },
    });
    const g = foldGroup('relief-60', 'default', [r1]);
    expect(Object.keys(g.stageWork)).toEqual(['S1', 'S3', 'S4', 'S5', 'S6']);
    for (const [st, row] of Object.entries(g.stageWork)) expect([st, Object.keys(row)]).toEqual([st, [...STAGE_WORK[st]]]);
    expect(g.stageWork['S1']['insert.points']).toEqual({ stage: 'S1', unit: 'vertices', units: quantiles([10]), unitsTotal: 10, perUnit: quantiles([2]), charged: 1 });
    expect(g.stageWork['S1']['insert.crossings'].perUnit).toEqual(quantiles([0]));
    expect(g.stageWork['S1']['hydro.cells'].perUnit).toEqual(quantiles([1]));
    expect(g.stageWork['S3']['tx.facesWalked']).toMatchObject({ unit: 'faces', perUnit: quantiles([0.01]), charged: 1 });
    expect(g.stageWork['S3']['route.nodes']).toMatchObject({ stage: 'S3', unit: 'latticeNodes', perUnit: quantiles([3]), charged: 1 });
    expect(g.stageWork['S4']['route.nodes']).toMatchObject({ perUnit: quantiles([0]), charged: 0 });
    expect(g.stageWork['S5']['insert.points']).toMatchObject({ perUnit: quantiles([1, 0]), charged: 1, unitsTotal: 100 });
    expect(g.stageWork['S5']['growth.proposals']).toMatchObject({ unit: 'landHa', perUnit: quantiles([2, 0.5]), charged: 2 });
    expect(g.stageWork['S5']['route.nodes'].perUnit).toEqual(quantiles([0.5]));
    expect(g.stageWork['S6']['grower.turns'].perUnit).toEqual(quantiles([30 / 61]));
    // a batch neither committed nor refused (S5's declared batches with no op: ok, no record) is no sample: a kernel
    // block's n is the stage's batches row, committed + refused (the reader's population; 137 such S5 batches at CITY)
    const empty: RunRecord['kernelBatches'][number] = { ...kb('S5', 50, {}), committed: false, code: null };
    const refusedBatch: RunRecord['kernelBatches'][number] = { ...kb('S5', 50, { 'insert.points': 25 }), committed: false, code: 'E_WORK_LIMIT' };
    const ge = foldGroup('relief-60', 'default', [good(1, { kernelBatches: [kb('S5', 50, { 'insert.points': 50 }), empty, refusedBatch, empty] })]);
    expect(ge.stageWork['S5']['insert.points']).toMatchObject({ perUnit: quantiles([1, 0.5]), charged: 2, unitsTotal: 100 });
    // a stage that made no batch has no kernel sample: its kernel counters have no block (unbounded at the reader)
    const noBatch = foldGroup('relief-60', 'default', [good(3)]);
    expect(noBatch.stageWork['S4']).toEqual({});
    // a stage that never ran in the group has no blocks
    const early = foldGroup('relief-60', 'default', [refusedAt(2, 'S3', 'E_SELF_INTERSECT', 'x')]);
    expect(Object.keys(early.stageWork)).toEqual(['S1', 'S3']);
  });
});

describe('hardening round S3: a batch\'s units read back from its limit (Q118)', () => {
  it('the five kernel laws summed over one count, inverted: floor + perUnit × u gives u back; at least 1; growth.* by its own law', () => {
    const wl = loadWorkLimits();
    let floor = 0;
    let per = 0;
    for (const c of KERNEL_COUNTERS) {
      floor += wl.law(c).floor;
      per += wl.law(c).perUnit;
    }
    expect(KERNEL_COUNTERS).toEqual(['insert.points', 'insert.attractQueries', 'insert.placementCandidates', 'insert.crossings', 'tx.facesWalked']);
    expect(kernelUnits(floor + per * 37)).toBe(37);
    expect(kernelUnits(floor)).toBe(1);
    expect(kernelUnits(0)).toBe(1);
    const g = wl.law('growth.proposals');
    expect(lawUnits('growth.proposals', g.floor + g.perUnit * 12)).toBe(12);
  });
});

describe('hardening round S3: the anchor\'s canary (Q36)', () => {
  it('the canary is a record that ends every stage ok, the least charged work among them, ties to the lower seed; else the most stages ok', () => {
    const kb = (n: number): RunRecord['kernelBatches'][number] => ({ stage: 'S1', level: 0, limit: 0, units: 1, committed: true, code: null, vertices: 0, faces: 0, counts: { 'insert.points': n } });
    const cut: RunRecord['stages'] = { S1: 'ok', S3: 'ok', S4: 'ok', S5: 'refused E_SELF_INTERSECT', S6: 'not reached' };
    const rs = [good(1, { kernelBatches: [kb(500)] }), good(2, { stages: cut, kernelBatches: [kb(1)] }), good(3, { kernelBatches: [kb(40)] }), good(4, { kernelBatches: [kb(40)] })];
    expect(canaryIndex(rs)).toBe(2);
    expect(chargedWork(rs[2])).toBe(40 + 100 + 30 + 300);
    expect(canaryIndex([rs[1], good(5, { stages: { ...cut, S4: 'refused E_INVARIANT', S5: 'not reached' } })])).toBe(0);
    expect(recordDigest(rs[2])).not.toBe(recordDigest(rs[3]));
    expect(recordDigest(good(3, { kernelBatches: [kb(40)] }))).toBe(recordDigest(rs[2]));
  });
});
