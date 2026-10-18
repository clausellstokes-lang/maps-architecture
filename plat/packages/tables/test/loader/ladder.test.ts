// M0-s-02: ladder.json's three base rows (§1.1) parse into RungProfiles; the TOWN / CITY / METROPOLIS bands include the
// lower bound and exclude the upper, the ladder's cap 120 000 inside METROPOLIS's closed band; the METROPOLIS row's
// matched FTG size is 'METROPOLIS' (N-19); the village rows are V07's; the layers column is II.7.4's SewerExistenceRow
// and II.7.5's UndercityExistenceRow, each key and bound checked on read (C-0162 (4)).
import { describe, expect, it } from 'vitest';
import {
  BASE_RUNGS,
  inPopulationBand,
  loadTable,
  parseTable,
  rungForPopulation,
  rungProfile,
  TableError,
} from '../../src/index.js';
import { rawTable, refusal } from './support.js';

describe("ladder.json's three base rows", () => {
  it('parse into the profiles §1.1 states', () => {
    const town = rungProfile('TOWN');
    expect(town).toEqual({
      rung: 'TOWN',
      populationBand: [1500, 10000],
      populationTarget: 5000,
      frameAreaKm2AtTarget: 4,
      aspect: [0.5, 2],
      frameLaw: 'base',
      stageRows: { count: 2, walledShares: [0.9], ribbonShare: 0.1, regimes: ['dense_core', 'ribbon'] },
      budgets: 'budgets.TOWN',
      granularity: {
        frontageScale: 1.1,
        depthScale: 1.1,
        joinMaxDelta: { squalid: 0, poor: 0, modest: 0, comfortable: 0, prosperous: 0, rich: 0 },
      },
      greenery: { parkPer1000Scale: 0.8, edgeGreenProb: 1, privateGreenShift: 5 },
      districtCountLaw: 'district.countLaw',
      gateLaw: 'walls.gateLaw',
      matched: { mfcgSize: 40, ftgSize: 'BIG_TOWN' },
      layers: {
        islands: 'none',
        sewers: { existence: 'law', law: { base: 0.05, populationWeight: 0.25, wealthWeight: 0.3, cap: 0.6 } },
        undercity: { existence: 'law', maxNeighbourhoods: 1, minPopulation: 6000, chance: 0.2 },
      },
    });
    const city = rungProfile('CITY');
    expect(city.populationBand).toEqual([10000, 30000]);
    expect(city.populationTarget).toBe(20000);
    expect(city.frameAreaKm2AtTarget).toBe(25);
    expect(city.stageRows).toEqual({ count: 3, walledShares: [0.55, 0.33], ribbonShare: 0.12, regimes: ['dense_core', 'walled_rings', 'ribbon'] });
    expect(city.granularity.frontageScale).toBe(1);
    expect(city.greenery).toEqual({ parkPer1000Scale: 1, edgeGreenProb: 0.6, privateGreenShift: 0 });
    expect(city.matched).toEqual({ mfcgSize: 80, ftgSize: 'BIG_CITY' });
    expect(city.layers).toEqual({ islands: 'possible', sewers: { existence: 'always' }, undercity: { existence: 'law', maxNeighbourhoods: 2 } });
    const metro = rungProfile('METROPOLIS');
    expect(metro.populationBand).toEqual([30000, 120000]);
    expect(metro.populationTarget).toBe(50000);
    expect(metro.frameAreaKm2AtTarget).toBe(64);
    expect(metro.stageRows.walledShares).toEqual([0.3, 0.3, 0.28]);
    expect(metro.stageRows.regimes).toEqual(['dense_core', 'walled_rings', 'walled_rings', 'ribbon']);
    expect(metro.granularity.frontageScale).toBe(0.9);
    expect(metro.granularity.depthScale).toBe(0.95);
    expect(metro.granularity.joinMaxDelta.rich).toBe(1);
    expect(metro.granularity.joinMaxDelta.prosperous).toBe(0);
    expect(metro.greenery).toEqual({ parkPer1000Scale: 1.2, edgeGreenProb: 0.4, privateGreenShift: -3 });
    expect(metro.layers).toEqual({ islands: 'possible', sewers: { existence: 'always' }, undercity: { existence: 'law', maxNeighbourhoods: 3 } });
  });

  it("gives the METROPOLIS row a matched FTG size, 'METROPOLIS' (N-19), and MFCG size 130", () => {
    expect(rungProfile('METROPOLIS').matched).toEqual({ mfcgSize: 130, ftgSize: 'METROPOLIS' });
  });

  it('keeps each stage row whole: the walled shares and the ribbon sum to one, one regime per stage', () => {
    for (const r of BASE_RUNGS) {
      const s = rungProfile(r).stageRows;
      expect(s.walledShares.length + 1).toBe(s.count);
      expect(s.regimes).toHaveLength(s.count);
      expect(s.regimes[s.count - 1]).toBe('ribbon');
      const sum = s.walledShares.reduce((a, b) => a + b, 0) + s.ribbonShare;
      expect(sum).toBeCloseTo(1, 12);
      for (const regime of s.regimes) expect(loadTable('regimes').has(regime)).toBe(true);
    }
  });

  it("resolves its laws' references to the rows that hold them", () => {
    for (const r of BASE_RUNGS) {
      for (const ref of [rungProfile(r).districtCountLaw, rungProfile(r).gateLaw]) {
        const [table, row] = ref.split('.');
        expect(loadTable(table).has(row)).toBe(true);
      }
    }
  });

  it("refuses the village rows (volume 7's)", () => {
    for (const r of ['THORP', 'HAMLET', 'VILLAGE'] as const) {
      expect(() => rungProfile(r)).toThrow(TableError);
      expect(() => rungProfile(r)).toThrow(/volume 7/);
    }
  });
});

describe('TOWN / CITY / METROPOLIS bands include the lower bound and exclude the upper', () => {
  const cases: [number, string | null][] = [
    [0, null],
    [1499, null],
    [1499.5, null],
    [1500, 'TOWN'],
    [9999, 'TOWN'],
    [9999.99, 'TOWN'],
    [10000, 'CITY'],
    [29999, 'CITY'],
    [30000, 'METROPOLIS'],
    [119999, 'METROPOLIS'],
    [120000, 'METROPOLIS'],
    [120001, null],
  ];
  for (const [p, rung] of cases) {
    it(`${p} → ${rung ?? 'outside the ladder'}`, () => {
      expect(rungForPopulation(p)).toBe(rung);
    });
  }

  it('holds each lower bound in its own band and each upper bound out of it, the cap excepted', () => {
    for (const r of BASE_RUNGS) {
      const p = rungProfile(r);
      const [lo, hi] = p.populationBand;
      expect(inPopulationBand(p, lo)).toBe(true);
      expect(inPopulationBand(p, lo - 1)).toBe(false);
      expect(inPopulationBand(p, hi)).toBe(r === 'METROPOLIS');
      expect(inPopulationBand(p, p.populationTarget)).toBe(true);
    }
  });

  it('leaves no gap and no overlap between the rows', () => {
    expect(rungProfile('TOWN').populationBand[1]).toBe(rungProfile('CITY').populationBand[0]);
    expect(rungProfile('CITY').populationBand[1]).toBe(rungProfile('METROPOLIS').populationBand[0]);
  });
});

describe("the layers column: II.7.4's SewerExistenceRow and II.7.5's UndercityExistenceRow", () => {
  type RawLadder = { rows: Record<string, Record<string, Record<string, unknown>>> } & Record<string, unknown>;
  const copy = (): RawLadder => rawTable<RawLadder>('ladder');
  /** The TableError reading the rung's profile from the raw ladder throws (the raw table itself parses). */
  const refuseProfile = (raw: RawLadder, rung: 'TOWN' | 'CITY' | 'METROPOLIS'): TableError => {
    const t = parseTable('ladder', raw);
    return refusal(() => rungProfile(rung, t));
  };

  it('reads a parsed ladder table as it reads the shipped one', () => {
    const t = parseTable('ladder', copy());
    for (const r of BASE_RUNGS) expect(rungProfile(r, t)).toEqual(rungProfile(r));
    expect(() => rungProfile('TOWN', loadTable('cut'))).toThrow(/reads the ladder table/);
  });

  it("gives II.7.1's law to the law row only (TOWN), all four terms", () => {
    expect(rungProfile('TOWN').layers.sewers.law).toEqual({ base: 0.05, populationWeight: 0.25, wealthWeight: 0.3, cap: 0.6 });
    for (const r of ['CITY', 'METROPOLIS'] as const) expect(rungProfile(r).layers.sewers).toEqual({ existence: 'always' });
    const lawOnCity = copy();
    lawOnCity.rows.CITY['layers.sewers.law.base'] = lawOnCity.rows.TOWN['layers.sewers.law.base'];
    const e = refuseProfile(lawOnCity, 'CITY');
    expect([e.row, e.cell, e.reason]).toEqual(['CITY', 'layers.sewers.law.base', "a law on a row whose existence is 'always'"]);
    const partial = copy();
    delete partial.rows.TOWN['layers.sewers.law.cap'];
    expect(refuseProfile(partial, 'TOWN').message).toBe("table 'ladder', row 'TOWN', cell 'layers.sewers.law.cap': no such cell");
  });

  it('refuses an existence word or an island gate outside the design\'s', () => {
    const cases: [string, unknown, string][] = [
      ['layers.sewers.existence', 'sometimes', "'sometimes' is not one of never | law | always"],
      ['layers.undercity.existence', 'always', "'always' is not one of never | law"],
      ['layers.islands', 'many', "'many' is not one of none | possible"],
    ];
    for (const [cell, value, reason] of cases) {
      const raw = copy();
      raw.rows.TOWN[cell].value = value;
      const e = refuseProfile(raw, 'TOWN');
      expect([e.table, e.row, e.cell, e.reason]).toEqual(['ladder', 'TOWN', cell, reason]);
    }
  });

  it('refuses a granularity.joinMaxDelta without one entry per band, naming the cell', () => {
    const raw = copy();
    raw.rows.CITY['granularity.joinMaxDelta'].value = [0, 0, 0];
    const e = refuseProfile(raw, 'CITY');
    expect([e.table, e.row, e.cell, e.reason]).toEqual(['ladder', 'CITY', 'granularity.joinMaxDelta', 'one entry per band of the band set']);
  });

  it('refuses a bound outside 0 – 3 neighbourhoods (the owner\'s one to three; 0 the parity presets\')', () => {
    for (const bad of [4, -1, 1.5]) {
      const raw = copy();
      raw.rows.METROPOLIS['layers.undercity.maxNeighbourhoods'].value = bad;
      expect(refuseProfile(raw, 'METROPOLIS').reason).toBe(`${bad} is not 0, 1, 2 or 3`);
    }
    const zero = copy();
    zero.rows.CITY['layers.undercity.maxNeighbourhoods'].value = 0;
    expect(rungProfile('CITY', parseTable('ladder', zero)).layers.undercity).toEqual({ existence: 'law', maxNeighbourhoods: 0 });
  });
});
