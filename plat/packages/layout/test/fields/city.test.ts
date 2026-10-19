// pass 1 after the real S3 slice, S4 and S6 on the flat CITY fixture (§4.1's order; §4.5; C-0049): the sources the arena
// holds after S5 (the plaza, the gates, the arterials, the wall trace), the land the districts hold, the here-bar (the
// cuts give the shares' land within one cell), the middle band, the per-face values over every L1 face.
import { describe, expect, it } from 'vitest';
import { fieldsCells, fieldsDigest, type ScalarField } from '../../src/index.js';
import { fieldCity, pass1, TABLES } from './support.js';

const CELLS = fieldsCells(TABLES);

describe('pass 1 on the flat CITY fixture through S3, S4 and S6', () => {
  it('the bar holds on all three fields; the sources are the plaza, markets, main streets, gates and the wall; two runs one digest', { timeout: 300_000 }, () => {
    const c = fieldCity(1);
    const r = pass1(c);
    expect(r.report.cellCm).toBe(3200);
    expect(r.report.sourced).toEqual(['plaza', 'market', 'mainStreet', 'gate', 'wall']);
    expect(r.report.landCells).toBeGreaterThan(1500);
    expect(r.report.kindsWithoutOffset).toEqual([]);
    for (const f of [r.prosperity, r.density, r.greenery] as ScalarField[]) {
      expect(f.bands.middle).toBe('comfortable');
      for (let b = 0; b < CELLS.shares.length; b += 1) expect(Math.abs(f.cutResult.perBand[b] - CELLS.shares[b] * r.report.landCells)).toBeLessThanOrEqual(1);
      expect(f.faces.length).toBe(c.districts.faces.length);
      // the prosperity falls from the plaza outward
      if (f.field === 'prosperity') expect(f.valueAt({ x: 0, y: 0 })).toBeGreaterThan(f.bands.cuts[3]);
    }
    expect(fieldsDigest(pass1(c))).toEqual(fieldsDigest(r));
  });
});
