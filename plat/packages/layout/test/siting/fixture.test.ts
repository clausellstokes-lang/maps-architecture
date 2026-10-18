// The flat fixture (M0-c-01; C-0016, C-0032; §1.1's CITY row, §12.2's 220 ha) and the land law (§4.2 S3 (4)).
import { loadTable, parseTable, tableView, type TableView } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { CITY_MATCHED_WALLED_HA, flatFixture, gateCount } from '../../src/index.js';
import { sliceOf } from './support.js';

describe('the flat fixture (C-0016, C-0032)', () => {
  const site = flatFixture(1);

  it('is a CITY frame of 25 km² at aspect 1 with the 30 % margin, centred on the nucleus', () => {
    expect(site.rung).toBe('CITY');
    expect(site.frame.widthCm).toBe(500_000);
    expect(site.frame.heightCm).toBe(500_000);
    expect(site.frame.aspect).toBe(1);
    expect(site.frame.marginShare).toBe(0.3);
    expect(site.frameRing).toEqual([
      { x: -250_000, y: -250_000 },
      { x: 250_000, y: -250_000 },
      { x: 250_000, y: 250_000 },
      { x: -250_000, y: 250_000 },
    ]);
    expect(site.centre).toEqual({ x: 0, y: 0 });
  });

  it('has flat terrain (one constant height) over frame + margin, and no water', () => {
    const h = site.terrain.heightCm;
    expect(h.length).toBe(site.terrain.cols * site.terrain.rows);
    expect(h.every((v) => v === 0)).toBe(true);
    // The raster covers the frame plus the 30 % margin on each side.
    expect(site.terrain.cols * site.terrain.cellCm).toBeGreaterThanOrEqual(500_000 * 1.6);
    expect(site.water).toEqual({ faces: [], decks: [] });
    const raised = flatFixture(1, { heightCm: 1234 });
    expect(raised.terrain.heightCm.every((v) => v === 1234)).toBe(true);
  });

  it("splits §12.2's 220 ha by the CITY shares: 137.5 / 82.5 / 30 ha (C-0016's quota test)", () => {
    expect(CITY_MATCHED_WALLED_HA).toBe(220);
    expect(site.land.walledHa).toBe(220);
    expect(site.land.stagesHa).toEqual([137.5, 82.5, 30]);
    expect(site.land.regimes).toEqual(['dense_core', 'walled_rings', 'ribbon']);
    // The walled stages hold the walled area; the ribbon is 0.12 of the whole.
    expect(site.land.stagesHa[0] + site.land.stagesHa[1]).toBeCloseTo(220, 9);
    const other = flatFixture(1, { walledHa: 58 });
    expect(other.land.stagesHa[0]).toBeCloseTo((58 / 0.88) * 0.55, 6);
  });

  it('keys its streams by the seed: the same seed gives the same draws, another seed others', () => {
    const a = flatFixture(5).stream(9 as never).u32();
    const b = flatFixture(5).stream(9 as never).u32();
    const c = flatFixture(6).stream(9 as never).u32();
    expect(a).toBe(b);
    expect(a).not.toBe(c);
    // A fresh derivation per call: the stream starts afresh.
    const s = flatFixture(5);
    expect(s.stream(9 as never).u32()).toBe(s.stream(9 as never).u32());
  });

  it('refuses a seed that is not a safe integer', () => {
    expect(() => flatFixture(1.5)).toThrow(RangeError);
  });
});

describe('the land law (§4.2 S3 (4))', () => {
  const tables = tableView();

  it("gives the design's receipt values: 5 / 8 / 12 / 18 gates at 58 / 220 / 548 / 1 274 ha", () => {
    expect([58, 220, 548, 1274].map((a) => gateCount(a, tables))).toEqual([5, 8, 12, 18]);
  });

  it("takes stage 1's land: 7 gates at the fixture's 137.5 ha, and the slice draws that many", () => {
    expect(gateCount(137.5, tables)).toBe(7);
    expect(sliceOf(1).n).toBe(7);
  });

  it('reads its two constants from walls.json `gateLaw` cells, never from code', () => {
    const walls = loadTable('walls');
    expect(walls.num('gateLaw', 'intercept')).toBe(1);
    expect(walls.num('gateLaw', 'coefficient')).toBe(0.47);
    // A view whose walls table carries other cells changes the count: the law reads the cells.
    const cell = (value: number, unit: string): unknown => ({ value, unit, provenance: 'own', calibratable: false });
    const patched = parseTable('walls', {
      table: 'walls',
      version: 1,
      section: '§4.8',
      rows: { gateLaw: { intercept: cell(3, 'count'), coefficient: cell(0.1, 'ratio') } },
    });
    const view = { table: (id: string) => (id === 'walls' ? patched : tables.table(id as never)) } as unknown as TableView;
    expect(gateCount(100, view)).toBe(4);
    expect(gateCount(220, view)).toBe(4);
  });

  it('refuses a negative or non-finite land', () => {
    expect(() => gateCount(-1, tables)).toThrow(RangeError);
    expect(() => gateCount(Infinity, tables)).toThrow(RangeError);
  });
});
