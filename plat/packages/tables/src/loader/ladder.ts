// The rung profile (§1.1; §3.2 (9); M0-s-02): one RungProfile row per rung in ladder.json. M0 ships the base's three
// rows — TOWN, CITY, METROPOLIS — with every field §1.1 states; the village rows are volume 7's (V07 §2.1; deferred).
// Size within a rung follows population: a population's rung is the row whose band holds it — a band includes its
// lower bound and excludes its upper one, except the ladder's cap, which METROPOLIS's band [30 000, 120 000] holds
// (§1.1 writes it closed; C-0156). Requests outside the ladder (the village product's
// routing, the cap's clamp) are LadderRouter's (§1.1, §4.12; M1). The layers column takes II.7.4's SewerExistenceRow
// and II.7.5's UndercityExistenceRow as the design types them, each key and bound checked on read (C-0162 (4)).
import type { Rung } from '@plat/model';
import { issueAt } from '../cell/cell.js';
import { BAND_IDS, type ProsperityBand } from './bands.js';
import { loadTable, TableError, type Table } from './table.js';

/** The base's three rungs, in ladder order. */
export const BASE_RUNGS = ['TOWN', 'CITY', 'METROPOLIS'] as const;
export type BaseRung = (typeof BASE_RUNGS)[number];

/** FTG's size presets (§13.5's FtgSize; BIG_TOWN, BIG_CITY and METROPOLIS the matched pairs). */
export type FtgSize = 'BIG_TOWN' | 'BIG_CITY' | 'CITY' | 'METROPOLIS';

/** The stage rows a rung takes (§4.2 S2): the stage count, each stage's regime and the walled and ribbon shares. */
export interface StageRowRef {
  count: number;
  /** One share per walled stage, in stage order. */
  walledShares: readonly number[];
  ribbonShare: number;
  /** regimes.json's row key of each stage, in stage order (the ribbon last). */
  regimes: readonly string[];
}

/** A row key of the budget register (§12.10; M1 — the register itself is not built at M0). */
export type BudgetRef = string;
/** A law's home as ⟨table⟩.⟨row⟩ (district.countLaw, walls.gateLaw). */
export type LawRef = string;
/** The sewers' existence by tier (II.7.4's row; II.7.1's rule and its law, which only a `law` row carries). */
export interface SewerExistenceRow {
  existence: 'never' | 'law' | 'always';
  /** P(sewers) = clamp(base + populationWeight · (population − 1 500) ÷ 8 500 + wealthWeight · wealthLevel, 0, cap). */
  law?: { base: number; populationWeight: number; wealthWeight: number; cap: number };
}
/** The undercity's existence (II.7.5's row): its rule, its bound of one to three neighbourhoods and, at TOWN, its gate. */
export interface UndercityExistenceRow {
  existence: 'never' | 'law';
  maxNeighbourhoods: 0 | 1 | 2 | 3;
  minPopulation?: number;
  chance?: number;
}

/** §1.1's RungProfile. */
export interface RungProfile {
  rung: Rung;
  populationBand: [number, number];
  populationTarget: number;
  frameAreaKm2AtTarget: number;
  /** The admissible width : height range (§3.2 (9): 0.5–2; square by default). */
  aspect: [number, number];
  frameLaw?: 'base' | 'territory';
  stageRows: StageRowRef;
  budgets: BudgetRef;
  granularity: { frontageScale: number; depthScale: number; joinMaxDelta: Record<ProsperityBand, number> };
  greenery: { parkPer1000Scale: number; edgeGreenProb: number; privateGreenShift: number /* points */ };
  districtCountLaw: LawRef;
  gateLaw: LawRef;
  matched: {
    mfcgSize: number;
    ftgSize?: FtgSize;
    vg?: { size: 'small' | 'medium' | 'large'; density: 'sparse' | 'normal' | 'dense' };
  };
  layers: { islands: 'none' | 'possible'; sewers: SewerExistenceRow; undercity: UndercityExistenceRow };
}

function isBaseRung(r: string): r is BaseRung {
  return (BASE_RUNGS as readonly string[]).includes(r);
}

function refuseCell(rung: string, cell: string, reason: string): never {
  throw new TableError([issueAt({ table: 'ladder', row: rung, cell, reason })]);
}

/** A key cell whose value must be one of `allowed`, else a refusal naming the cell. */
function oneOf<T extends string>(t: Table, rung: string, cell: string, allowed: readonly T[]): T {
  const v = t.str(rung, cell);
  if (!(allowed as readonly string[]).includes(v)) refuseCell(rung, cell, `'${v}' is not one of ${allowed.join(' | ')}`);
  return v as T;
}

const SEWER_LAW = ['base', 'populationWeight', 'wealthWeight', 'cap'] as const;

/** II.7.4's SewerExistenceRow: the existence word and, on a `law` row only, II.7.1's law (all four terms). */
function sewerRow(t: Table, rung: string): SewerExistenceRow {
  const existence = oneOf(t, rung, 'layers.sewers.existence', ['never', 'law', 'always'] as const);
  if (existence !== 'law') {
    for (const k of SEWER_LAW) {
      if (t.has(rung, `layers.sewers.law.${k}`)) refuseCell(rung, `layers.sewers.law.${k}`, `a law on a row whose existence is '${existence}'`);
    }
    return { existence };
  }
  const [base, populationWeight, wealthWeight, cap] = SEWER_LAW.map((k) => t.num(rung, `layers.sewers.law.${k}`));
  return { existence, law: { base, populationWeight, wealthWeight, cap } };
}

/** II.7.5's UndercityExistenceRow: the existence word, the bound of 0 – 3 neighbourhoods and the rung's gate. */
function undercityRow(t: Table, rung: string): UndercityExistenceRow {
  const existence = oneOf(t, rung, 'layers.undercity.existence', ['never', 'law'] as const);
  const max = t.num(rung, 'layers.undercity.maxNeighbourhoods');
  if (!(max === 0 || max === 1 || max === 2 || max === 3)) refuseCell(rung, 'layers.undercity.maxNeighbourhoods', `${max} is not 0, 1, 2 or 3`);
  const row: UndercityExistenceRow = { existence, maxNeighbourhoods: max };
  if (t.has(rung, 'layers.undercity.minPopulation')) row.minPopulation = t.num(rung, 'layers.undercity.minPopulation');
  if (t.has(rung, 'layers.undercity.chance')) row.chance = t.num(rung, 'layers.undercity.chance');
  return row;
}

/**
 * The rung's profile from ladder.json (or from `table`, a parsed ladder table — a test's fixture); a village rung is
 * refused (its rows are V07's, deferred).
 */
export function rungProfile(rung: Rung, table?: Table): RungProfile {
  if (!isBaseRung(rung)) {
    throw new TableError([issueAt({ table: 'ladder', row: rung, reason: "the village rows of ladder.json are volume 7's (V07 §2.1; deferred)" })]);
  }
  const t = table ?? loadTable('ladder');
  if (t.id !== 'ladder') throw new TableError([issueAt({ table: t.id, reason: 'a rung profile reads the ladder table, not this one' })]);
  const deltas = t.nums(rung, 'granularity.joinMaxDelta');
  if (deltas.length !== BAND_IDS.length) refuseCell(rung, 'granularity.joinMaxDelta', 'one entry per band of the band set');
  const joinMaxDelta = {} as Record<ProsperityBand, number>;
  BAND_IDS.forEach((b, i) => {
    joinMaxDelta[b] = deltas[i];
  });
  const matched: RungProfile['matched'] = { mfcgSize: t.num(rung, 'matched.mfcgSize') };
  if (t.has(rung, 'matched.ftgSize')) matched.ftgSize = t.str(rung, 'matched.ftgSize') as FtgSize;
  const profile: RungProfile = {
    rung,
    populationBand: t.pair(rung, 'populationBand'),
    populationTarget: t.num(rung, 'populationTarget'),
    // The cell is in hectares (§2.1 has no km² word): 100 ha to the km².
    frameAreaKm2AtTarget: t.num(rung, 'frameAreaHaAtTarget') / 100,
    aspect: t.pair(rung, 'aspect'),
    frameLaw: t.str(rung, 'frameLaw') as 'base' | 'territory',
    stageRows: {
      count: t.num(rung, 'stageRows.count'),
      walledShares: t.nums(rung, 'stageRows.walledShares'),
      ribbonShare: t.num(rung, 'stageRows.ribbonShare'),
      regimes: t.strs(rung, 'stageRows.regimes'),
    },
    budgets: t.str(rung, 'budgets'),
    granularity: {
      frontageScale: t.num(rung, 'granularity.frontageScale'),
      depthScale: t.num(rung, 'granularity.depthScale'),
      joinMaxDelta,
    },
    greenery: {
      parkPer1000Scale: t.num(rung, 'greenery.parkPer1000Scale'),
      edgeGreenProb: t.num(rung, 'greenery.edgeGreenProb'),
      // The cell is a share (§2.1 has no points word): 100 points to the share, rounded to whole points.
      privateGreenShift: Math.round(t.num(rung, 'greenery.privateGreenShift') * 100),
    },
    districtCountLaw: t.str(rung, 'districtCountLaw'),
    gateLaw: t.str(rung, 'gateLaw'),
    matched,
    layers: {
      islands: oneOf(t, rung, 'layers.islands', ['none', 'possible'] as const),
      sewers: sewerRow(t, rung),
      undercity: undercityRow(t, rung),
    },
  };
  return profile;
}

/** Does the rung's band hold the population (the lower bound in, the upper out, the ladder's cap in)? */
export function inPopulationBand(profile: RungProfile, population: number): boolean {
  const [lo, hi] = profile.populationBand;
  const cap = profile.rung === BASE_RUNGS[BASE_RUNGS.length - 1];
  return population >= lo && (population < hi || (cap && population === hi));
}

/** The base rung whose band holds the population, or null outside the ladder [1 500, 120 000]. */
export function rungForPopulation(population: number): BaseRung | null {
  for (const r of BASE_RUNGS) if (inPopulationBand(rungProfile(r), population)) return r;
  return null;
}
