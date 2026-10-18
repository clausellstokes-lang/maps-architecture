// M0-s-02: the shipped tables hold the design's default values and stay whole — the band set's shares and cuts, the
// granularity rows, the deep-interior shares and reach weights, the regimes, the strips (C-0033's 8 m and 15 m lines),
// the bent cut's cells with their MFCG presets, the lattice equal to the kernel's LatticeSpec, the terrain's per-rung
// cells; the cells that extend the references carry §7.6's `extension` marker (the snapshot of them); every value a
// number, a flag or one of our own keys (the snapshot of the keys: a new string value is a declared change); every
// M0-s-02 pick marked so.
//
// The hand-overs (M0.md §2: granularity.json and regimes.json → M0-b-05a, interior.json → M0-c-07a, cut.json → M0-b-05b
// → M0-c-07b, bands.json → M0-c-07b) are run items that write cells and bump the file's version and never edit these
// tests (C-0115, C-0117, C-0157 (2)). So a handed-over file's tests hold its invariants at any version and pin the
// design's defaults only while the file is at its golden.json version; past it, the change is the run item's declared
// change and the golden test reports it (C-0162 (1)). The simulated hand-overs below prove both halves.
import { LATTICE } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import {
  BAND_IDS,
  BASE_RUNGS,
  loadTable,
  minCorridorM,
  parseTable,
  provenanceForm,
  TABLE_IDS,
  type CellValue,
  type M0TableId,
  type Table,
} from '../../src/index.js';
import { rawTable } from '../loader/support.js';
import extensionCells from './extension-cells.json';
import golden from './golden.json';
import strings from './string-values.json';

const sum = (xs: readonly number[]): number => xs.reduce((a, b) => a + b, 0);
const PINS = golden as Record<string, { version: number; sha256: string }>;
const ROWED = ['poor', 'modest', 'prosperous', 'rich'] as const;

/** Is the table at its golden.json version (the design's defaults) rather than past it (a run item's declared change)? */
function atGolden(t: Table): boolean {
  const pin = PINS[`${t.id}.json`];
  expect(pin, `${t.id}.json has a golden pin`).toBeDefined();
  return t.version === pin.version;
}

/** A run item's hand-over as its table-cell writer makes it: the version bumped, each cell rewritten with 'M-1 ⟨date⟩'. */
function handOver(id: M0TableId, cells: readonly [string, string, CellValue][]): Table {
  const raw = rawTable<{ version: number; rows: Record<string, Record<string, { value: CellValue; provenance: string }>> }>(id);
  raw.version += 1;
  for (const [r, c, v] of cells) {
    raw.rows[r][c].value = v;
    raw.rows[r][c].provenance = 'M-1 2026-10-20';
  }
  return parseTable(id, raw);
}

/** A range [lo, hi] with 0 < lo ≤ hi. */
function positiveRange(t: Table, row: string, cell: string): void {
  const [lo, hi] = t.pair(row, cell);
  expect(lo, `${t.id}/${row}/${cell}`).toBeGreaterThan(0);
  expect(hi).toBeGreaterThanOrEqual(lo);
}

/** Every cell of the rows carries an admitted provenance and the calibratable flag C-0070 gives it. */
function flagged(t: Table, rows: readonly string[], cells: readonly string[], calibratable: boolean): void {
  for (const r of rows) {
    for (const c of cells) {
      const cell = t.cell(r, c);
      expect(provenanceForm(cell.provenance), `${t.id}/${r}/${c}`).not.toBeNull();
      expect(cell.calibratable, `${t.id}/${r}/${c}`).toBe(calibratable);
    }
  }
}

// ---- bands.json (§4.5) -------------------------------------------------------------------------------------------

function bandsInvariants(t: Table): void {
  expect(t.strs('settings', 'order')).toEqual([...BAND_IDS]);
  const shares = BAND_IDS.map((b) => t.num(b, 'share'));
  for (const s of shares) expect(s >= 0 && s <= 1).toBe(true);
  expect(Math.abs(sum(shares) - 1)).toBeLessThan(1e-9);
  for (const b of BAND_IDS) expect(t.num(b, 'weight')).toBeGreaterThan(0);
  const cuts = t.nums('settings', 'defaultCuts');
  expect(cuts).toHaveLength(BAND_IDS.length - 1);
  let cum = 0;
  cuts.forEach((c, i) => {
    cum += shares[i];
    expect(Math.abs(c - cum), `defaultCuts[${i}] is the cumulative share`).toBeLessThan(1e-9);
  });
  const h = t.num('settings', 'hysteresis');
  expect(h > 0 && h < 1).toBe(true);
  flagged(t, BAND_IDS, ['share', 'weight'], true);
  flagged(t, ['settings'], ['defaultCuts'], true);
}

function bandsDefaults(t: Table): void {
  expect(BAND_IDS.map((b) => t.num(b, 'weight'))).toEqual([1, 1, 20, 40, 20, 10]);
  expect(BAND_IDS.map((b) => t.num(b, 'share'))).toEqual([0.011, 0.011, 0.217, 0.435, 0.217, 0.109]);
  for (const b of BAND_IDS) expect(t.cell(b, 'share').provenance).toBe('ref:FTG lifestyle distribution');
  const weights = BAND_IDS.map((b) => t.num(b, 'weight'));
  BAND_IDS.forEach((b, i) => expect(t.num(b, 'share')).toBeCloseTo(weights[i] / sum(weights), 3));
  expect(t.nums('settings', 'defaultCuts')).toEqual([0.011, 0.022, 0.239, 0.674, 0.891]);
  expect(t.num('settings', 'hysteresis')).toBe(0.02);
}

describe('bands.json — the band set (§4.5)', () => {
  it('holds the invariants at any version, and at its golden version the default shares, FTG weights 1 / 1 / 20 / 40 / 20 / 10 and the hysteresis 0.02', () => {
    const t = loadTable('bands');
    bandsInvariants(t);
    if (atGolden(t)) bandsDefaults(t);
  });
});

// ---- granularity.json and faces.json (§4.7) ------------------------------------------------------------------------

function granularityInvariants(t: Table): void {
  expect([...t.rows.keys()].sort()).toEqual([...ROWED].sort());
  for (const r of ROWED) {
    positiveRange(t, r, 'frontageM');
    positiveRange(t, r, 'depthM');
    const j = t.num(r, 'joinMax');
    expect(Number.isInteger(j) && j >= 1).toBe(true);
    const v = t.num(r, 'vacancyShare');
    expect(v >= 0 && v <= 1).toBe(true);
  }
  flagged(t, ROWED, ['frontageM', 'depthM', 'joinMax', 'vacancyShare'], true);
}

function granularityDefaults(t: Table): void {
  expect(ROWED.map((r) => t.pair(r, 'frontageM'))).toEqual([[4, 6], [6, 9], [9, 14], [14, 25]]);
  expect(ROWED.map((r) => t.pair(r, 'depthM'))).toEqual([[12, 20], [18, 30], [25, 40], [30, 60]]);
  expect(ROWED.map((r) => t.num(r, 'joinMax'))).toEqual([1, 2, 3, 5]);
  expect(ROWED.map((r) => t.num(r, 'vacancyShare'))).toEqual([0.03, 0.06, 0.08, 0.05]);
}

describe('granularity.json and faces.json (§4.7)', () => {
  it('holds the four rows (frontage and depth bands, join maximum, vacancy share) at any version, and their default values at its golden version', () => {
    const g = loadTable('granularity');
    granularityInvariants(g);
    if (atGolden(g)) granularityDefaults(g);
  });

  it('holds the class floors: minPlotWidth 2.5 m, minInteriorAnglePlot 12°, minCorridor derived from ways.widths', () => {
    const f = loadTable('faces');
    expect(f.num('plot', 'minPlotWidthM')).toBe(2.5);
    expect(f.num('plot', 'minInteriorAnglePlotCdeg')).toBe(1200);
    expect(minCorridorM('lane')).toBe(3);
    expect(minCorridorM('alley')).toBe(2);
    expect(minCorridorM('through')).toBe(8);
  });
});

// ---- regimes.json (§4.4) -------------------------------------------------------------------------------------------

const FLOORED = ['dense_core', 'walled_rings', 'ribbon', 'suburb'] as const;

function regimesInvariants(t: Table): void {
  for (const r of FLOORED) positiveRange(t, r, 'blockDepthFloorM');
  flagged(t, FLOORED, ['blockDepthFloorM'], true);
  for (const r of [...FLOORED, 'linear_street']) expect(t.num(r, 'a')).toBeGreaterThan(0);
}

function regimesDefaults(t: Table): void {
  expect(t.pair('dense_core', 'blockDepthFloorM')).toEqual([30, 45]);
  expect(t.pair('walled_rings', 'blockDepthFloorM')).toEqual([45, 70]);
  expect(t.pair('ribbon', 'blockDepthFloorM')).toEqual([30, 50]);
  expect(t.pair('suburb', 'blockDepthFloorM')).toEqual([40, 60]);
  expect(BASE_RUNGS.map((r) => t.num('dense_core', `separationM.${r}`))).toEqual([120, 160, 200]);
  expect(BASE_RUNGS.map((r) => t.num('suburb', `separationM.${r}`))).toEqual([80, 80, 80]);
  expect(['dense_core', 'walled_rings', 'ribbon', 'suburb', 'linear_street'].map((r) => t.num(r, 'a'))).toEqual([1.3, 1.8, 4, 3, 8]);
  expect(t.str('dense_core', 'heading')).toBe('ou');
  expect(t.bool('suburb', 'destinationBias')).toBe(false);
  expect(t.num('ribbon', 'mainRoadSpacingM.CITY')).toBe(450);
  expect(t.num('heading.organic', 'sigmaCdegPer100m')).toBe(2000);
  expect(t.num('heading.planned', 'sigmaCdegPer100m')).toBe(500);
  expect(t.num('heading.organic', 'correlationM')).toBe(90);
  expect(t.num('heading.organic', 'reversionM')).toBe(250);
  expect(t.pair('growth', 'stepM.secondary')).toEqual([25, 40]);
  expect(t.pair('growth', 'stepM.lane')).toEqual([15, 25]);
  expect(t.bool('settings', 'lanesInfillOnly')).toBe(false);
}

describe('regimes.json — the stage regimes (§4.4)', () => {
  it('holds the block-depth floors and the anisotropies at any version, and at its golden version the floors, separations, a, heading, bias, headingSigma, the heading model\'s lengths, the step lengths and the fusion gate\'s switch (off)', () => {
    const t = loadTable('regimes');
    regimesInvariants(t);
    if (atGolden(t)) regimesDefaults(t);
  });
});

// ---- cut.json and interior.json (§4.6) -----------------------------------------------------------------------------

function cutInvariants(t: Table): void {
  const bend = t.cell('settings', 'bendMode');
  expect(['flatten', 'straightFirst']).toContain(bend.value);
  expect(bend.presets?.MFCG?.value).toBe('straightFirst');
  const flat = t.cell('settings', 'flattenM');
  expect(typeof flat.value === 'number' && flat.value > 0).toBe(true);
  expect([flat.unit, flat.calibratable]).toEqual(['m', true]);
  expect(typeof flat.presets?.MFCG?.value).toBe('number');
  expect(t.num('width', 'pMin')).toBeLessThanOrEqual(t.num('width', 'pMax'));
  positiveRange(t, 'width', 'alleyM');
  positiveRange(t, 'width', 'laneM');
  expect(t.num('settings', 'portalGapMinM')).toBeGreaterThan(0);
}

function cutDefaults(t: Table): void {
  const bend = t.cell('settings', 'bendMode');
  expect(bend.value).toBe('flatten');
  const flat = t.cell('settings', 'flattenM');
  expect([flat.value, flat.unit, flat.provenance, flat.calibratable]).toEqual([0.7, 'm', 'own', true]);
  expect(flat.presets?.MFCG?.value).toBe(8);
  expect(t.num('settings', 'flattenShare')).toBe(0.02);
  expect(t.num('settings', 'straightCross2')).toBe(0.99);
  expect(t.num('stop', 'uniforms')).toBe(4);
  expect(t.num('t', 'uniforms')).toBe(3);
  expect(t.num('t', 'holedMarginMax')).toBe(0.45);
  expect(t.cell('stop', 'uniforms').provenance).toBe('ref:NG 1.2.2 per-face stop threshold (code), P1');
  expect(t.num('arc', 'minSamplePoints')).toBe(3);
  expect([t.num('width', 'pMin'), t.num('width', 'pMax')]).toEqual([0.5, 2]);
  expect(t.pair('width', 'alleyM')).toEqual([2, 3]);
  expect(t.pair('width', 'laneM')).toEqual([3, 5]);
  expect(t.num('settings', 'portalGapMinM')).toBe(6);
  expect(t.num('settings', 'portalGapLaneFactor')).toBe(2);
  // ways.json's lane and alley widths are §4.6's (P8, C-0158): equal while cut.json carries the design's widths.
  const ways = loadTable('ways');
  for (const r of BASE_RUNGS) {
    expect(ways.pair('lane', `widthM.${r}`)).toEqual(t.pair('width', 'laneM'));
    expect(ways.pair('alley', `widthM.${r}`)).toEqual(t.pair('width', 'alleyM'));
  }
}

const SHARES = ['shares.court', 'shares.backLane', 'shares.throughAlley', 'shares.rearPlots'] as const;
const REACH = ['reach.open', 'reach.passage', 'reach.gated'] as const;

function interiorInvariants(t: Table): void {
  for (const b of BAND_IDS) {
    const rowed = (ROWED as readonly string[]).includes(b);
    for (const c of SHARES) expect(t.has(b, c), `interior/${b}/${c}`).toBe(rowed);
    if (rowed) {
      const s = SHARES.map((c) => t.num(b, c));
      for (const x of s) expect(x >= 0 && x <= 1).toBe(true);
      expect(Math.abs(sum(s) - 1), `interior/${b}: the shares sum to one`).toBeLessThan(1e-9);
    }
    const w = REACH.map((c) => t.num(b, c));
    for (const x of w) expect(x).toBeGreaterThanOrEqual(0);
    expect(sum(w)).toBeGreaterThan(0);
    const h = t.num(b, 'hiddenShare');
    expect(h >= 0 && h <= 1).toBe(true);
  }
  flagged(t, ROWED, SHARES, true);
  flagged(t, BAND_IDS, [...REACH, 'hiddenShare'], true);
}

function interiorDefaults(t: Table): void {
  const share = (b: string): number[] => SHARES.map((c) => t.num(b, c));
  expect(share('poor')).toEqual([0.35, 0.25, 0.3, 0.1]);
  expect(share('modest')).toEqual([0.45, 0.3, 0.15, 0.1]);
  expect(share('prosperous')).toEqual([0.65, 0.15, 0.05, 0.15]);
  expect(share('rich')).toEqual([0.75, 0.1, 0, 0.15]);
  const reach = (b: string): number[] => REACH.map((c) => t.num(b, c));
  expect(BAND_IDS.map(reach)).toEqual([
    [0.25, 0.75, 0], [0.25, 0.75, 0], [0.7, 0.3, 0], [0.8, 0.15, 0.05], [0.6, 0.05, 0.35], [0.3, 0, 0.7],
  ]);
  for (const b of BAND_IDS) expect(sum(reach(b))).toBeCloseTo(1, 12);
  expect(BAND_IDS.map((b) => t.num(b, 'hiddenShare'))).toEqual([0.2, 0.12, 0.04, 0.02, 0.04, 0.08]);
  expect(t.num('settings', 'deepFactor')).toBe(2);
}

describe('cut.json and interior.json (§4.6)', () => {
  it('holds cut.bendMode and cut.flattenM with their MFCG presets, the widths and the portal gap at any version, and at its golden version flatten, 0.7 m, cut.stop, cut.t, cut.arc and cut.width with their P-ids', () => {
    const t = loadTable('cut');
    cutInvariants(t);
    if (atGolden(t)) cutDefaults(t);
  });

  it('holds the deep-interior shares (each row summing to one), the reach weights and the hidden-share targets at any version, and their default values at its golden version', () => {
    const i = loadTable('interior');
    interiorInvariants(i);
    if (atGolden(i)) interiorDefaults(i);
  });
});

// ---- the hand-overs, simulated (M0.md §2's chains; the checker's F-1) ---------------------------------------------

describe('a run item\'s hand-over keeps the tests green and the invariants bite', () => {
  const sims: [string, Table, (t: Table) => void, (t: Table) => void][] = [
    [
      'M0-b-05a: the re-fitted plot-depth rows',
      handOver('granularity', [['poor', 'depthM', [11, 19]], ['modest', 'depthM', [17, 28]], ['prosperous', 'depthM', [24, 38]], ['rich', 'depthM', [28, 55]]]),
      granularityInvariants,
      granularityDefaults,
    ],
    [
      'M0-b-05a: the regime block-depth minimums',
      handOver('regimes', [['dense_core', 'blockDepthFloorM', [28, 42]], ['walled_rings', 'blockDepthFloorM', [42, 66]]]),
      regimesInvariants,
      regimesDefaults,
    ],
    ['M0-b-05b: cut.flattenM', handOver('cut', [['settings', 'flattenM', 0.9]]), cutInvariants, cutDefaults],
    [
      'M0-c-07b: the infill constants on a statistics miss',
      handOver('cut', [['width', 'laneM', [3.5, 5.5]], ['stop', 'uniforms', 5], ['settings', 'bendMode', 'straightFirst']]),
      cutInvariants,
      cutDefaults,
    ],
    [
      'M0-c-07a: the fitted deep-interior shares',
      handOver('interior', [['poor', 'shares.court', 0.4], ['poor', 'shares.backLane', 0.2]]),
      interiorInvariants,
      interiorDefaults,
    ],
    [
      'M0-c-07b: the band table on a statistics miss',
      handOver('bands', [
        ...BAND_IDS.map((b, i) => [b, 'weight', [2, 2, 20, 40, 20, 10][i]] as [string, string, CellValue]),
        ...BAND_IDS.map((b, i) => [b, 'share', [0.021, 0.021, 0.213, 0.426, 0.213, 0.106][i]] as [string, string, CellValue]),
        ['settings', 'defaultCuts', [0.021, 0.042, 0.255, 0.681, 0.894]],
      ]),
      bandsInvariants,
      bandsDefaults,
    ],
  ];

  for (const [what, sim, invariants, defaults] of sims) {
    it(`${what}: past the golden version, the invariants hold and the default pins are not applied`, () => {
      expect(atGolden(sim)).toBe(false);
      invariants(sim);
      expect(() => defaults(sim), 'the default pins would refuse the hand-over').toThrow();
    });
  }

  it('a hand-over that breaks an invariant is refused: shares off one, a cut off its cumulative share, a reversed floor', () => {
    expect(() => interiorInvariants(handOver('interior', [['poor', 'shares.court', 0.5]]))).toThrow();
    expect(() => bandsInvariants(handOver('bands', [['settings', 'defaultCuts', [0.011, 0.022, 0.25, 0.674, 0.891]]]))).toThrow();
    expect(() => bandsInvariants(handOver('bands', [['rich', 'share', 0.2]]))).toThrow();
    expect(() => granularityInvariants(handOver('granularity', [['rich', 'depthM', [0, 60]]]))).toThrow();
    expect(() => regimesInvariants(handOver('regimes', [['suburb', 'blockDepthFloorM', [-1, 60]]]))).toThrow();
    expect(() => cutInvariants(handOver('cut', [['settings', 'flattenM', 0]]))).toThrow();
  });
});

// ---- the other tables ----------------------------------------------------------------------------------------------

describe('walls.json, lattice.json, district.json, terrain.json', () => {
  it("lays C-0033's strip lines at 8 m and 15 m from the default era row, inside §4.8's ranges", () => {
    const w = loadTable('walls');
    const half = w.num('era.default', 'thicknessM') / 2;
    expect(half + w.num('era.default', 'innerSetbackM')).toBe(8);
    expect(half + w.num('era.default', 'outerSetbackGlacisM')).toBe(15);
    const inside = (v: number, [lo, hi]: [number, number]): boolean => v >= lo && v <= hi;
    expect(inside(w.num('era.default', 'thicknessM'), w.pair('strip', 'thicknessRangeM'))).toBe(true);
    expect(inside(w.num('era.default', 'innerSetbackM'), w.pair('strip', 'innerSetbackRangeM'))).toBe(true);
    expect(inside(w.num('era.default', 'outerSetbackGlacisM'), w.pair('strip', 'outerSetbackGlacisRangeM'))).toBe(true);
    expect(w.num('trace', 'smoothPasses')).toBe(3);
    expect([w.num('gateLaw', 'intercept'), w.num('gateLaw', 'coefficient')]).toEqual([1, 0.47]);
  });

  it("holds the arena's LatticeSpec equal to the kernel's, and the route lattice's spacing and jitter", () => {
    const l = loadTable('lattice');
    expect({
      unitCm: l.num('arena', 'unitCm'),
      minEdgeCm: l.num('arena', 'minEdgeCm'),
      attractCm: l.num('arena', 'attractCm'),
      minFaceAngleCdeg: l.num('arena', 'minFaceAngleCdeg'),
      rangeCm: l.num('arena', 'rangeCm'),
    }).toEqual({ ...LATTICE });
    expect(l.num('route', 'spacingM')).toBe(25);
    expect(l.num('route', 'jitterM')).toBeLessThan(l.num('route', 'spacingM') / 2);
  });

  it("holds the grower's rates, the count law and the quarters' law", () => {
    const d = loadTable('district');
    expect(['gate', 'castle', 'bridgehead', 'riverbank', 'other'].map((k) => d.num('growthRate', k))).toEqual([0.1, 0.1, 0.1, 0.5, 1]);
    expect([d.num('countLaw', 'coefficient'), d.num('countLaw', 'areaHa')]).toEqual([3.5, 10]);
    expect(d.pair('countLaw', 'band')).toEqual([0.5, 1.5]);
    expect([d.num('quarters', 'coefficient'), d.num('quarters', 'exponent')]).toEqual([1.37, 0.267]);
  });

  it('holds the per-rung rasters, hydro cells and carve caps', () => {
    const t = loadTable('terrain');
    expect(BASE_RUNGS.map((r) => t.num(r, 'rasterCellM'))).toEqual([5, 8, 10]);
    expect(BASE_RUNGS.map((r) => t.num(r, 'hydroCellM'))).toEqual([16, 25, 32]);
    expect(BASE_RUNGS.map((r) => t.num(r, 'hydroCoarseCellM'))).toEqual([20, 32, 40]);
    expect(BASE_RUNGS.map((r) => t.num(r, 'carveMaxCm'))).toEqual([400, 400, 600]);
    expect(t.num('settings', 'reliefLimitCm')).toBe(1_000_000);
    expect(t.num('fbm', 'octaves')).toBe(5);
    expect(t.num('crossing', 'minSpacingM')).toBe(40);
  });
});

// ---- §7.6's extension markers --------------------------------------------------------------------------------------

describe("the cells that extend the references carry §7.6's `extension` marker (the parity presets zero them)", () => {
  const found: Record<string, string> = {};
  for (const id of TABLE_IDS) {
    for (const [rk, row] of loadTable(id).rows) {
      for (const [ck, c] of row) if (c.extension !== undefined) found[`${id}/${rk}/${ck}`] = `${c.extension.over}/${c.extension.mode}`;
    }
  }

  it('lists exactly the committed extension cells, each with its over and mode', () => {
    expect(found).toEqual(extensionCells.cells);
    expect(Object.keys(found)).toHaveLength(extensionCells.count);
    expect(extensionCells.count).toBe(41);
  });

  it("marks §4.6's hidden-share targets and the non-open reach weights on every band (open, the parity presets' only value, stays unmarked)", () => {
    for (const b of BAND_IDS) {
      for (const c of ['hiddenShare', 'reach.passage', 'reach.gated']) expect(found[`interior/${b}/${c}`]).toBe('both/weight');
      expect(found[`interior/${b}/reach.open`]).toBeUndefined();
    }
  });

  it("marks the ladder's island and sewer rules and the undercity's existence, bound and chance (§7.6; II.7.1, II.7.5), not the TOWN gate's population", () => {
    for (const r of BASE_RUNGS) {
      for (const c of ['layers.islands', 'layers.sewers.existence', 'layers.undercity.existence']) expect(found[`ladder/${r}/${c}`]).toBe('both/option');
      expect(found[`ladder/${r}/layers.undercity.maxNeighbourhoods`]).toBe('both/weight');
    }
    for (const k of ['base', 'populationWeight', 'wealthWeight', 'cap']) expect(found[`ladder/TOWN/layers.sewers.law.${k}`]).toBe('both/chance');
    expect(found['ladder/TOWN/layers.undercity.chance']).toBe('both/chance');
    expect(found['ladder/TOWN/layers.undercity.minPopulation']).toBeUndefined();
  });

  it('gives every categorical option cell its MFCG, FTG and VG value: the off word', () => {
    const off: Record<string, string> = { 'layers.islands': 'none', 'layers.sewers.existence': 'never', 'layers.undercity.existence': 'never' };
    const ladder = loadTable('ladder');
    for (const r of BASE_RUNGS) {
      for (const [c, word] of Object.entries(off)) {
        const ps = ladder.cell(r, c).presets;
        expect([ps?.MFCG?.value, ps?.FTG?.value, ps?.VG?.value], `ladder/${r}/${c}`).toEqual([word, word, word]);
      }
    }
  });
});

// ---- values: numbers, flags and our own keys -----------------------------------------------------------------------

describe('every value is a number, a flag or one of our own keys (no reference list, palette or table)', () => {
  const found = new Set<string>();
  const walk = (v: CellValue): void => {
    if (typeof v === 'string') found.add(v);
    else if (Array.isArray(v)) for (const e of v) walk(e);
  };
  for (const id of TABLE_IDS) {
    for (const [, row] of loadTable(id).rows) {
      for (const [, c] of row) {
        walk(c.value);
        if (c.presets !== undefined) for (const p of Object.values(c.presets)) walk(p.value);
      }
    }
  }

  it('holds exactly the committed key values while every table is at its golden version, and never a new one (a new string value is a declared change)', () => {
    for (const s of found) expect(strings, `'${s}' is a new key value`).toContain(s);
    if (TABLE_IDS.every((id) => atGolden(loadTable(id)))) expect([...found].sort()).toEqual(strings);
  });

  it('holds no colour value and no prose', () => {
    for (const s of found) {
      expect(s).toMatch(/^[A-Za-z][A-Za-z0-9_.\-]*$/);
      expect(s).not.toMatch(/^#?[0-9a-fA-F]{6}$/);
    }
  });
});

// ---- M0-s-02's picks (C-0158) --------------------------------------------------------------------------------------

/** C-0158's 81 picks by table, as shipped. */
const PICKS: Readonly<Record<string, number>> = { bands: 1, fields: 34, lattice: 1, regimes: 4, terrain: 18, walls: 3, ways: 20 };

describe("M0-s-02's picks are marked", () => {
  it("carry provenance 'own' and a note naming the lane — all 81 while their tables are at their golden versions; a handed-over table's re-signed pick is its run item's", () => {
    let total = 0;
    for (const id of TABLE_IDS) {
      const t = loadTable(id);
      let own = 0;
      let resigned = 0;
      for (const [, row] of t.rows) {
        for (const [, c] of row) {
          if (c.note?.startsWith('M0-s-02 pick') !== true) continue;
          expect(c.note).toContain('lane build/M0-s-02');
          if (c.provenance === 'own') own += 1;
          else resigned += 1;
        }
      }
      const shipped = PICKS[id] ?? 0;
      if (atGolden(t)) {
        expect([id, own, resigned]).toEqual([id, shipped, 0]);
      } else {
        expect(own + resigned, `${id}: no pick added past the golden version`).toBeLessThanOrEqual(shipped);
      }
      total += shipped;
    }
    expect(total).toBe(81);
  });
});
