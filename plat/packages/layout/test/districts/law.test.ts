// The count law and the quarter law (M0-e-04; §4.5 *One law for count and band*, *Quarters*): N_d = round(3.5 ·
// √(A_ha ÷ 10)), the band [0.5, 1.5] × A ÷ N_d, the mean district √(10A) ÷ 3.5 (≈ 7 ha at 60 ha, ≈ 14 ha at 250 ha,
// ≈ 22 ha at 600 ha); N_q = round(1.37 · B^0.267) (9–10 at TOWN, 13–14 at CITY, 17–18 at METROPOLIS); every constant a
// table cell (the checker's clause).
import { parseTable, tableView, type TableView } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { countLaw, quarterCount, rosterBuildings, s6DistrictCells, s6Table, typingCells } from '../../src/index.js';

/** A TableView whose `district` table has one cell's value replaced. */
function districtWith(row: string, cell: string, value: unknown, base: TableView = tableView()): TableView {
  const t = base.table('district');
  const rows: Record<string, Record<string, unknown>> = {};
  for (const [rk, cells] of t.rows) {
    const r: Record<string, unknown> = {};
    for (const [ck, c] of cells) r[ck] = { ...c, ...(rk === row && ck === cell ? { value } : {}) };
    rows[rk] = r;
  }
  const district = parseTable('district', { table: 'district', version: t.version, section: t.section, rows });
  return {
    hash: base.hash,
    version: (id) => base.version(id),
    get: (id, key) => (id === 'district' ? district.rows.get(key) : base.get(id, key)),
    rows: (id) => (id === 'district' ? district.rows : base.rows(id)),
    slice: (id, kind, key) => base.slice(id, kind, key),
    table: (id) => (id === 'district' ? district : base.table(id)),
  };
}

describe('the count law (§4.5)', () => {
  it('N_d = round(3.5 · √(A ÷ 10)) and the band [0.5, 1.5] × A ÷ N_d', () => {
    for (const a of [1, 10, 22, 60, 137.5, 220, 250, 600, 1500]) {
      const law = countLaw(a);
      const n = Math.max(1, Math.round(3.5 * Math.sqrt(a / 10)));
      expect(law.n).toBe(n);
      expect(law.meanHa).toBeCloseTo(a / n, 9);
      expect(law.bandHa[0]).toBeCloseTo((0.5 * a) / n, 9);
      expect(law.bandHa[1]).toBeCloseTo((1.5 * a) / n, 9);
    }
    expect(countLaw(220).n).toBe(16);
    expect(countLaw(250).n).toBe(18);
  });

  it('the mean district tracks √(10A) ÷ 3.5: ≈ 7 ha at 60 ha, ≈ 14 ha at 250 ha, ≈ 22 ha at 600 ha', () => {
    for (const [a, mean] of [
      [60, 7],
      [250, 14],
      [600, 22],
    ] as const) {
      const law = countLaw(a);
      expect(Math.abs(law.meanHa - mean)).toBeLessThan(0.6);
      expect(Math.abs(law.meanHa - Math.sqrt(10 * a) / 3.5) / (Math.sqrt(10 * a) / 3.5)).toBeLessThan(0.08);
    }
  });

  it('a settlement of any land has at least one district; no land has none; a bad area is refused', () => {
    expect(countLaw(0.01).n).toBe(1);
    expect(countLaw(0)).toEqual({ n: 0, meanHa: 0, bandHa: [0, 0] });
    expect(() => countLaw(-1)).toThrow(RangeError);
    expect(() => countLaw(Number.NaN)).toThrow(RangeError);
  });

  it('reads every coefficient from district.json (a changed cell moves the law)', () => {
    const coef = s6DistrictCells(districtWith('countLaw', 'coefficient', 7));
    expect(countLaw(250, coef).n).toBe(Math.round(7 * Math.sqrt(25)));
    const anchor = s6DistrictCells(districtWith('countLaw', 'areaHa', 40));
    expect(countLaw(250, anchor).n).toBe(Math.round(3.5 * Math.sqrt(250 / 40)));
    const band = s6DistrictCells(districtWith('countLaw', 'band', [0.25, 2]));
    expect(countLaw(250, band).bandHa[0]).toBeCloseTo(0.25 * (250 / 18), 9);
    expect(countLaw(250, band).bandHa[1]).toBeCloseTo(2 * (250 / 18), 9);
  });
});

describe('the quarter law (§4.5 *Quarters*)', () => {
  it('N_q = round(1.37 · B^0.267): 9–10 at TOWN, 13–14 at CITY, 17–18 at METROPOLIS', () => {
    for (const b of [1200, 1500]) expect([9, 10]).toContain(quarterCount(b));
    for (const b of [4500, 6000]) expect([13, 14]).toContain(quarterCount(b));
    for (const b of [12000, 15000]) expect([17, 18]).toContain(quarterCount(b));
    for (const b of [1, 50, 1475, 5242, 13091, 31951]) expect(quarterCount(b)).toBe(Math.max(1, Math.round(1.37 * Math.pow(b, 0.267))));
    expect(() => quarterCount(0)).toThrow(RangeError);
  });

  it('reads its coefficient and exponent from district.json and B from the synthetic roster (s6.json)', () => {
    expect(quarterCount(5242, s6DistrictCells(districtWith('quarters', 'coefficient', 2)))).toBe(Math.round(2 * Math.pow(5242, 0.267)));
    expect(quarterCount(5242, s6DistrictCells(districtWith('quarters', 'exponent', 0.3)))).toBe(Math.round(1.37 * Math.pow(5242, 0.3)));
    expect(rosterBuildings('CITY')).toBe(5242);
    expect(quarterCount(rosterBuildings('CITY'))).toBe(13);
  });
});

describe('every rate and constant S6 reads is a table cell (unit, provenance, calibratable)', () => {
  it('the growth rates are district.json cells, read per kind (gate, castle, bridgehead 0.1; riverbank 0.5; others 1)', () => {
    const c = s6DistrictCells();
    expect([c.rate('gate'), c.rate('castle'), c.rate('bridgehead'), c.rate('riverbank'), c.rate('market'), c.rate('remainder'), c.rate('leftover')]).toEqual([0.1, 0.1, 0.1, 0.5, 1, 1, 1]);
    expect(s6DistrictCells(districtWith('growthRate', 'gate', 0.3)).rate('gate')).toBe(0.3);
    expect(s6DistrictCells(districtWith('growthRate', 'other', 0.7)).rate('remainder')).toBe(0.7);
    expect(c.compactnessMin).toBe(0.5);
    expect(c.perimeterOffsetM).toBe(50);
    expect([c.familyCostHa, c.barrierCostHa]).toEqual([1000, 10000]);
  });

  it('s6.json loads through the tables check: every cell carries unit, provenance and calibratable', () => {
    const t = s6Table();
    for (const [, row] of t.rows) {
      for (const [, cell] of row) {
        expect(typeof cell.unit).toBe('string');
        expect(typeof cell.provenance).toBe('string');
        expect(typeof cell.calibratable).toBe('boolean');
      }
    }
    const typing = typingCells();
    expect(typing.kinds.map((k) => k.kind)).toEqual(['central', 'market', 'gate', 'riverbank', 'craft', 'sprawl']);
    expect(typing.kinds.reduce((s, k) => s + k.share, 0)).toBeCloseTo(1, 12);
    expect(typing.mixedUseFloor).toBe(0.2);
  });
});
