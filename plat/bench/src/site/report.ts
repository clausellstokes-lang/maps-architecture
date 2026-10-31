// The site spike's report (M0-e-06; M0.md §1 (e)'s bars NOW, §16 M0 (e), §12.4, §12.10 R12-4 / R12-5; C-0067,
// C-0084, C-0091, C-0271). `foldReport` folds the derivations' RunRecords — plain, deterministic data — into
// `SiteSpikeReport`: per fixture and configuration the stages' outcomes, every bar's receipt with its verdict
// (`pass`, `fail`, or `unobserved` when no derivation reached the clause — never a silent pass), the work per unit per
// counter (C-0091's `{ n, p50, p99, p999, max }`), and the records themselves. The report holds no time: two runs of
// the harness on the same seeds write it byte for byte (the item's first test). The stage times are the timing block's
// (timing.ts), kept beside the report, never in it (C-0271 (4)).
import { quantile7 } from '@plat/testkit';
import { CORPUS_BAR } from '../skeleton/runner.js';
import type { SpikeConfig } from './compose.js';
import type { SpikeSize } from './fixtures.js';
import type { CorpusCounts, EnceinteWaterReceipt, RunRecord } from './receipts.js';

/** A quantile block (C-0091): Hyndman and Fan's type 7 over the values. */
export interface Quantiles {
  readonly n: number;
  readonly p50: number;
  readonly p99: number;
  readonly p999: number;
  readonly max: number;
}

export function quantiles(values: readonly number[]): Quantiles {
  const s = [...values].sort((a, b) => a - b);
  if (s.length === 0) return { n: 0, p50: 0, p99: 0, p999: 0, max: 0 };
  return { n: s.length, p50: quantile7(s, 0.5), p99: quantile7(s, 0.99), p999: quantile7(s, 0.999), max: s[s.length - 1] };
}

/** A bar's verdict: failed wherever a receipt broke it, else held on every observation, else never reached. */
export type Verdict = 'pass' | 'fail' | 'unobserved';

/** One bar's receipt: its verdict, how many derivations it was judged on, and its numbers. */
export interface BarReceipt {
  readonly verdict: Verdict;
  /** Derivations (or bodies, gates, bridges — `of` says which) the clause was judged on. */
  readonly observed: number;
  readonly of: string;
  /** The failing observations' seeds (the first twenty). */
  readonly failing: readonly number[];
  readonly numbers: Readonly<Record<string, number | null>>;
}

/** The bars of M0.md §1 (e) the harness judges here, by name, in the order the item lists them. */
export const BAR_NAMES = Object.freeze([
  'd8',
  'bedMonotone',
  'carve',
  'noClamp',
  'reliefAsNamed',
  'waterGates',
  'spans',
  'containment',
  'countLaw',
  'gateWards',
  'fieldBands',
  'weightZero',
  'corpus',
] as const);
export type BarName = (typeof BAR_NAMES)[number];

/** The share of the gate and bridgehead wards' runs whose median lies below the town's (M0.md §1 (e): ≥ 90 %). */
export const WARD_SHARE_MIN = 0.9;
/** FieldBands: each band's land within one cell of its share (C-0049). */
export const BAND_TOLERANCE_CELLS = 1;
/** The 3 000 m fixture's stored relief at least 2 900 m, the 60 m one's at least 20 m (the fixtures' preconditions). */
export const RELIEF_FLOOR_CM: Readonly<Record<string, number>> = Object.freeze({ 'relief-60': 2_000, 'relief-3000': 290_000 });

/** One fixture and configuration: the stages' outcomes, the bars, the work. */
export interface GroupReport {
  readonly fixture: string;
  readonly config: SpikeConfig;
  readonly runs: number;
  /** Per stage: derivations it ended ok, refused (by code) and did not reach. */
  readonly stages: Readonly<Record<string, { ok: number; refused: Readonly<Record<string, number>>; notReached: number }>>;
  readonly bars: Readonly<Record<BarName, BarReceipt>>;
  /** C-0091: per counter the run charged, the law's unit, the unit counts and the work per unit. */
  readonly work: Readonly<Record<string, { readonly stage: string; readonly unit: string; readonly units: Quantiles; readonly unitsTotal: number; readonly perUnit: Quantiles }>>;
  /** Per stage, its batches: committed, refused, and the largest share of a batch's limit its work reached. */
  readonly batches: Readonly<Record<string, { committed: number; refused: number; maxShare: number }>>;
}

/** SiteSpikeReport — the interface M0-e-06 lists: the receipts of every derivation, folded; no time in it. */
export interface SiteSpikeReport {
  readonly item: 'M0-e-06';
  readonly size: SpikeSize;
  readonly seeds: { readonly first: number; readonly count: number };
  readonly fixtures: readonly string[];
  readonly configs: readonly SpikeConfig[];
  readonly groups: readonly GroupReport[];
  /** Per bar over every group: fail if any group fails, else pass if any group observed it, else unobserved. */
  readonly verdicts: Readonly<Record<BarName, Verdict>>;
  /** No bar failed and every bar was observed. */
  readonly pass: boolean;
  readonly records: readonly RunRecord[];
}

const COUNTERS: Readonly<Record<string, { stage: string; unit: string }>> = Object.freeze({
  'hydro.cells': { stage: 'S1', unit: 'frameCells' },
  'route.nodes': { stage: 'S4', unit: 'latticeNodes' },
  'grower.turns': { stage: 'S6', unit: 'faces' },
  'field.cells': { stage: 'S6', unit: 'frameCells' },
});

function bar(observed: number, of: string, failing: readonly number[], numbers: Record<string, number | null>): BarReceipt {
  return { verdict: failing.length > 0 ? 'fail' : observed === 0 ? 'unobserved' : 'pass', observed, of, failing: failing.slice(0, 20), numbers };
}

function sumCorpus(rs: readonly CorpusCounts[]): CorpusCounts {
  const o = { faces: 0, skeletons: 0, downgrades: 0, workLimitHits: 0, failures: 0 };
  for (const r of rs) {
    o.faces += r.faces;
    o.skeletons += r.skeletons;
    o.downgrades += r.downgrades;
    o.workLimitHits += r.workLimitHits;
    o.failures += r.failures;
  }
  return o;
}

function corpusPass(c: CorpusCounts): boolean {
  if (c.faces === 0) return true;
  return c.failures === 0 && c.downgrades / c.faces <= CORPUS_BAR.downgradesMax && c.workLimitHits / c.faces <= CORPUS_BAR.workLimitHitsMax;
}

/** Folds one fixture and configuration's records. */
export function foldGroup(fixture: string, config: SpikeConfig, records: readonly RunRecord[]): GroupReport {
  const rs = records.filter((r) => r.fixture === fixture && r.config === config);
  const stages: Record<string, { ok: number; refused: Record<string, number>; notReached: number }> = {};
  for (const r of rs) {
    for (const [s, o] of Object.entries(r.stages)) {
      const row = stages[s] ?? { ok: 0, refused: {}, notReached: 0 };
      if (o === 'ok') row.ok += 1;
      else if (o === 'not reached') row.notReached += 1;
      else {
        const code = o.slice('refused '.length);
        row.refused[code] = (row.refused[code] ?? 0) + 1;
      }
      stages[s] = row;
    }
  }

  // S1: D8 on the land cells (and every cell), the bed, the carve, the clamp, the relief.
  const hy = rs.filter((r) => r.hydro !== null);
  let cells = 0;
  let defined = 0;
  let land = 0;
  let landDefined = 0;
  for (const r of hy) {
    const h = r.hydro as NonNullable<RunRecord['hydro']>;
    cells += h.cells;
    defined += h.defined;
    land += h.landCells;
    landDefined += h.landDefined;
  }
  const d8 = bar(hy.length, 'derivations', hy.filter((r) => { const h = r.hydro as NonNullable<RunRecord['hydro']>; return h.landDefined !== h.landCells || !h.drainsOff; }).map((r) => r.seed), {
    cells,
    defined,
    landCells: land,
    landDefined,
    landShare: land === 0 ? null : landDefined / land,
    share: cells === 0 ? null : defined / cells,
  });
  const rivers = rs.flatMap((r) => r.rivers.map((v) => ({ seed: r.seed, v })));
  const bed = bar(rivers.length, 'rivers', rivers.filter((x) => !x.v.bedMonotone).map((x) => x.seed), {
    rivers: rivers.length,
    fits: rivers.filter((x) => x.v.fits).length,
    frameOutfall: rivers.filter((x) => x.v.outfall === 'frame').length,
    reachesCore: rivers.filter((x) => x.v.reachesCore).length,
    minBedCells: rivers.length === 0 ? null : Math.min(...rivers.map((x) => x.v.bedCells)),
  });
  const rl = rs.filter((r) => r.relief !== null);
  const relief = (r: RunRecord): NonNullable<RunRecord['relief']> => r.relief as NonNullable<RunRecord['relief']>;
  const carve = bar(rl.length, 'derivations', rl.filter((r) => relief(r).deepestCutCm > relief(r).carveMaxCm || relief(r).raised > 0).map((r) => r.seed), {
    deepestCutCm: rl.length === 0 ? null : Math.max(...rl.map((r) => relief(r).deepestCutCm)),
    carveMaxCm: rl.length === 0 ? null : relief(rl[0]).carveMaxCm,
    raisedCells: rl.reduce((s, r) => s + relief(r).raised, 0),
  });
  const clamp = bar(rl.length, 'derivations', rl.filter((r) => relief(r).clampedCells > 0).map((r) => r.seed), {
    clampedCells: rl.reduce((s, r) => s + relief(r).clampedCells, 0),
    limitCm: rl.length === 0 ? null : relief(rl[0]).limitCm,
  });
  const floor = RELIEF_FLOOR_CM[fixture] ?? 0;
  const reliefNamed = bar(rl.length, 'derivations', rl.filter((r) => relief(r).reliefCm < floor).map((r) => r.seed), {
    floorCm: floor,
    minReliefCm: rl.length === 0 ? null : Math.min(...rl.map((r) => relief(r).reliefCm)),
    maxReliefCm: rl.length === 0 ? null : Math.max(...rl.map((r) => relief(r).reliefCm)),
  });

  // S3 and S5a: the water gates (observed where a trace crossed the river), judged per enceinte (N-54 (4)): each
  // enceinte's wall over water exactly its own water gates' chords.
  const wg = rs.filter((r) => r.waterGates !== null);
  const W = (r: RunRecord): NonNullable<RunRecord['waterGates']> => r.waterGates as NonNullable<RunRecord['waterGates']>;
  const encBad = (e: EnceinteWaterReceipt): boolean =>
    e.wallOverWater !== e.gates || e.wallOverWaterGated !== e.gates || e.gatesWithOneEdge !== e.gates || e.endsResolved !== 2 * e.gates || e.endsOnShore !== 2 * e.gates || e.stripVerticesInWater > 0;
  const wgBad = (r: RunRecord): boolean => {
    const w = W(r);
    return w.enceintes.length === 0 || w.enceintes.some(encBad) || w.mainGates !== w.gateSites;
  };
  const crossing = wg.filter((r) => W(r).gates > 0 || W(r).wallOverWater > 0);
  const waterGates = bar(crossing.length, 'derivations whose trace meets the river', wg.filter(wgBad).map((r) => r.seed), {
    traced: wg.length,
    gates: wg.reduce((s, r) => s + W(r).gates, 0),
    wallOverWater: wg.reduce((s, r) => s + W(r).wallOverWater, 0),
    wallOverWaterGated: wg.reduce((s, r) => s + W(r).wallOverWaterGated, 0),
    endsOnShore: wg.reduce((s, r) => s + W(r).endsOnShore, 0),
    endsAtRecordedBank: wg.reduce((s, r) => s + W(r).endsAtRecordedBank, 0),
    stripVerticesInWater: wg.reduce((s, r) => s + W(r).stripVerticesInWater, 0),
    nUnchanged: wg.filter((r) => W(r).mainGates === W(r).gateSites).length,
    enceintes: wg.reduce((s, r) => s + W(r).enceintes.length, 0),
    laterGates: wg.reduce((s, r) => s + W(r).enceintes.filter((e) => e.stage !== 1).reduce((t, e) => t + e.gates, 0), 0),
    unrecordedWallOverWater: wg.reduce((s, r) => s + W(r).enceintes.filter((e) => !e.recorded).reduce((t, e) => t + e.wallOverWater, 0), 0),
  });

  // S4: the spans (observed where a bridge was built; the clear sites and dry routes on every S4 run).
  const br = rs.filter((r) => r.bridges !== null);
  const B = (r: RunRecord): NonNullable<RunRecord['bridges']> => r.bridges as NonNullable<RunRecord['bridges']>;
  const builtRuns = br.filter((r) => B(r).built > 0);
  const spans = bar(builtRuns.length, 'derivations with a built bridge', br.filter((r) => B(r).builtWithSpan !== B(r).built || B(r).builtWayNamed !== B(r).built || B(r).sitesClear !== B(r).sites - B(r).built || B(r).wayOverWaterOffSpan > 0).map((r) => r.seed), {
    s4Runs: br.length,
    sites: br.reduce((s, r) => s + B(r).sites, 0),
    built: br.reduce((s, r) => s + B(r).built, 0),
    builtWithSpan: br.reduce((s, r) => s + B(r).builtWithSpan, 0),
    sitesClear: br.reduce((s, r) => s + B(r).sitesClear, 0),
    wayOverWaterOffSpan: br.reduce((s, r) => s + B(r).wayOverWaterOffSpan, 0),
  });

  // S6: containment, the count law, the wards.
  const ds = rs.filter((r) => r.districts !== null);
  const D = (r: RunRecord): NonNullable<RunRecord['districts']> => r.districts as NonNullable<RunRecord['districts']>;
  const containment = bar(ds.length, 'derivations', ds.filter((r) => D(r).unownedByStage > 0 || D(r).samplesContained !== D(r).samples || D(r).samples === 0).map((r) => r.seed), {
    samples: ds.reduce((s, r) => s + D(r).samples, 0),
    samplesContained: ds.reduce((s, r) => s + D(r).samplesContained, 0),
    samplesInDistricts: ds.reduce((s, r) => s + D(r).samplesInDistricts, 0),
    unownedByStage: ds.reduce((s, r) => s + D(r).unownedByStage, 0),
  });
  const offBy = ds.map((r) => D(r).districts - D(r).nd);
  const countLaw = bar(ds.length, 'derivations', ds.filter((r) => !D(r).countLaw).map((r) => r.seed), {
    within: ds.filter((r) => D(r).countLaw).length,
    minOffBy: offBy.length === 0 ? null : Math.min(...offBy),
    maxOffBy: offBy.length === 0 ? null : Math.max(...offBy),
    medianNd: ds.length === 0 ? null : quantiles(ds.map((r) => D(r).nd)).p50,
    medianDistricts: ds.length === 0 ? null : quantiles(ds.map((r) => D(r).districts)).p50,
    leftovers: ds.reduce((s, r) => s + D(r).leftovers, 0),
    belowFloor: ds.reduce((s, r) => s + D(r).belowFloor, 0),
    merges: ds.reduce((s, r) => s + D(r).merges, 0),
  });
  const withWards = ds.filter((r) => D(r).wardsBelow !== null);
  const below = withWards.filter((r) => D(r).wardsBelow === true).length;
  const wardShare = withWards.length === 0 ? null : below / withWards.length;
  const wardsBar: BarReceipt = {
    verdict: withWards.length === 0 ? 'unobserved' : (wardShare as number) >= WARD_SHARE_MIN ? 'pass' : 'fail',
    observed: withWards.length,
    of: 'derivations with a gate or bridgehead ward',
    failing: withWards.filter((r) => D(r).wardsBelow === false).map((r) => r.seed).slice(0, 20),
    numbers: { below, share: wardShare, shareMin: WARD_SHARE_MIN, medianWardHa: withWards.length === 0 ? null : quantiles(withWards.map((r) => D(r).wardMedianHa as number)).p50, medianTownHa: withWards.length === 0 ? null : quantiles(withWards.map((r) => D(r).townMedianHa)).p50 },
  };

  // S6's second half: the bands, weight 0.
  const fs = rs.filter((r) => r.fields !== null);
  const F = (r: RunRecord): NonNullable<RunRecord['fields']> => r.fields as NonNullable<RunRecord['fields']>;
  const fieldBands = bar(fs.length, 'derivations', fs.filter((r) => F(r).bands.some((b) => b.maxErrorCells > BAND_TOLERANCE_CELLS || !b.readBack || b.landCells === 0)).map((r) => r.seed), {
    maxErrorCells: fs.length === 0 ? null : Math.max(...fs.flatMap((r) => F(r).bands.map((b) => b.maxErrorCells))),
    minLandCells: fs.length === 0 ? null : Math.min(...fs.flatMap((r) => F(r).bands.map((b) => b.landCells))),
    cellCm: fs.length === 0 ? null : F(fs[0]).cellCm,
  });
  const weightZero = bar(fs.length, 'derivations', fs.filter((r) => !F(r).weightZeroIdentical || !F(r).recomputedEqual).map((r) => r.seed), {
    identical: fs.filter((r) => F(r).weightZeroIdentical).length,
    recomputedEqual: fs.filter((r) => F(r).recomputedEqual).length,
  });

  // The corpus bar on the run's district and water faces (M0-a-12's, C-0067): over the group's faces, per set and use.
  const cs = rs.filter((r) => r.corpus !== null);
  const C = (r: RunRecord): NonNullable<RunRecord['corpus']> => r.corpus as NonNullable<RunRecord['corpus']>;
  const sets = {
    districtRoof: sumCorpus(cs.map((r) => C(r).district.roof)),
    districtSpine: sumCorpus(cs.map((r) => C(r).district.spine)),
    waterRoof: sumCorpus(cs.map((r) => C(r).water.roof)),
    waterSpine: sumCorpus(cs.map((r) => C(r).water.spine)),
  };
  const corpusFaces = sets.districtRoof.faces + sets.waterRoof.faces;
  const corpusNumbers: Record<string, number | null> = {};
  for (const [k, v] of Object.entries(sets)) {
    corpusNumbers[`${k}.faces`] = v.faces;
    corpusNumbers[`${k}.downgrades`] = v.downgrades;
    corpusNumbers[`${k}.workLimitHits`] = v.workLimitHits;
    corpusNumbers[`${k}.failures`] = v.failures;
  }
  const corpus: BarReceipt = {
    verdict: corpusFaces === 0 ? 'unobserved' : Object.values(sets).every(corpusPass) ? 'pass' : 'fail',
    observed: corpusFaces,
    of: 'district and water faces',
    failing: [],
    numbers: { ...corpusNumbers, downgradesMax: CORPUS_BAR.downgradesMax, workLimitHitsMax: CORPUS_BAR.workLimitHitsMax },
  };

  // C-0091's work per unit.
  const work: Record<string, { stage: string; unit: string; units: Quantiles; unitsTotal: number; perUnit: Quantiles }> = {};
  for (const [counter, law] of Object.entries(COUNTERS)) {
    const rows = rs.map((r) => r.work[counter]).filter((w) => w !== undefined && w.work > 0 && w.units > 0);
    if (rows.length === 0) continue;
    work[counter] = { stage: law.stage, unit: law.unit, units: quantiles(rows.map((w) => w.units)), unitsTotal: rows.reduce((s, w) => s + w.units, 0), perUnit: quantiles(rows.map((w) => w.work / w.units)) };
  }
  const batches: Record<string, { committed: number; refused: number; maxShare: number }> = {};
  for (const r of rs) {
    for (const [s, b] of Object.entries(r.batches)) {
      const row = batches[s] ?? { committed: 0, refused: 0, maxShare: 0 };
      row.committed += b.committed;
      row.refused += b.refused;
      row.maxShare = Math.max(row.maxShare, b.maxShare);
      batches[s] = row;
    }
  }

  return {
    fixture,
    config,
    runs: rs.length,
    stages,
    bars: { d8, bedMonotone: bed, carve, noClamp: clamp, reliefAsNamed: reliefNamed, waterGates, spans, containment, countLaw, gateWards: wardsBar, fieldBands, weightZero, corpus },
    work,
    batches,
  };
}

/** Folds every record into the report (the groups in fixture, then configuration order; the records in task order). */
export function foldReport(size: SpikeSize, first: number, count: number, fixtures: readonly string[], configs: readonly SpikeConfig[], records: readonly RunRecord[]): SiteSpikeReport {
  const groups: GroupReport[] = [];
  for (const f of fixtures) for (const c of configs) groups.push(foldGroup(f, c, records));
  const verdicts = {} as Record<BarName, Verdict>;
  for (const b of BAR_NAMES) {
    const vs = groups.map((g) => g.bars[b].verdict);
    verdicts[b] = vs.includes('fail') ? 'fail' : vs.includes('pass') ? 'pass' : 'unobserved';
  }
  const pass = BAR_NAMES.every((b) => verdicts[b] === 'pass');
  return { item: 'M0-e-06', size, seeds: { first, count }, fixtures: [...fixtures], configs: [...configs], groups, verdicts, pass, records: [...records] };
}

/** The report without its records (the summary's receipts block; numbers only). */
export function receiptsOf(r: SiteSpikeReport): Omit<SiteSpikeReport, 'records'> {
  const { records: _records, ...rest } = r;
  return rest;
}
