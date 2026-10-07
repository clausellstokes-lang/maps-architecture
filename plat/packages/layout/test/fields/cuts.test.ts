// FieldBands' cuts and the hysteresis (§4.5 *Bands*, *The band set*; §2.5; C-0049; C-0255 (5), (6)): the cuts give each
// band its share of the land within one cell; the middle band is the band where the cumulative share first passes one
// half — comfortable under the default shares (0.239 after modest, 0.674 after comfortable); a tie run straddling a
// target is reported, never hidden; no land, the default cuts; a block keeps its band until its value crosses a cut by
// more than the hysteresis.
import { describe, expect, it } from 'vitest';
import { bandOf } from '@plat/tables';
import { cutPoints, fieldBands, fieldsCells, holdBand, middleOf } from '../../src/index.js';
import { fixtureRandom } from '../districts/support.js';
import { TABLES } from './support.js';

const CELLS = fieldsCells(TABLES);

function landPerBand(values: Float64Array, land: Uint8Array, cuts: readonly number[], bands: readonly string[]): number[] {
  const out = bands.map(() => 0);
  for (let i = 0; i < values.length; i += 1) if (land[i]) out[bands.indexOf(bandOf(values[i], { bands, cuts }))] += 1;
  return out;
}

describe('cutPoints', () => {
  it("the default band set: six bands, shares 0.011 / 0.011 / 0.217 / 0.435 / 0.217 / 0.109, the middle band comfortable", () => {
    expect(CELLS.bands).toEqual(['squalid', 'poor', 'modest', 'comfortable', 'prosperous', 'rich']);
    expect(CELLS.shares).toEqual([0.011, 0.011, 0.217, 0.435, 0.217, 0.109]);
    let cum = 0;
    const after = CELLS.shares.map((s) => (cum += s));
    expect(after[2]).toBeCloseTo(0.239, 12);
    expect(after[3]).toBeCloseTo(0.674, 12);
    expect(middleOf(CELLS.bands, CELLS.shares)).toBe('comfortable');
    expect(CELLS.hysteresis).toBe(0.02);
  });

  it('random fields over random land: every band holds its share of the land within one cell, read back through bandOf', () => {
    const rand = fixtureRandom(11);
    for (let t = 0; t < 200; t += 1) {
      const n = 1 + Math.floor(rand() * 3000);
      const values = new Float64Array(n).map(() => rand());
      const land = new Uint8Array(n).map(() => (rand() < 0.6 ? 1 : 0));
      const r = cutPoints(values, CELLS.shares, land);
      let landN = 0;
      for (const v of land) landN += v;
      expect(r.landCells).toBe(landN);
      const per = landPerBand(values, land, r.cuts, CELLS.bands);
      expect(per).toEqual(r.perBand);
      for (let b = 0; b < CELLS.bands.length; b += 1) expect(Math.abs(per[b] - CELLS.shares[b] * landN)).toBeLessThanOrEqual(1);
      expect(r.errorCells).toBeLessThanOrEqual(1);
      for (let k = 1; k < r.cuts.length; k += 1) expect(r.cuts[k]).toBeGreaterThanOrEqual(r.cuts[k - 1]);
      for (const c of r.cuts) {
        expect(c).toBeGreaterThanOrEqual(0);
        expect(c).toBeLessThanOrEqual(1);
      }
    }
  });

  it('the cuts read the land only: values outside it move no cut', () => {
    const values = new Float64Array(1000).map((_, i) => (i * 7919) % 1000 / 1000);
    const land = new Uint8Array(1000).map((_, i) => (i % 3 === 0 ? 1 : 0));
    const a = cutPoints(values, CELLS.shares, land);
    const v2 = values.map((v, i) => (land[i] ? v : 1 - v));
    expect(cutPoints(v2, CELLS.shares, land).cuts).toEqual(a.cuts);
  });

  it('exact targets on 1 000 distinct values: 11 / 11 / 217 / 435 / 217 / 109 cells', () => {
    const values = new Float64Array(1000).map((_, i) => ((i * 389) % 1000) / 1000);
    const r = cutPoints(values, CELLS.shares, new Uint8Array(1000).fill(1));
    expect(r.perBand).toEqual([11, 11, 217, 435, 217, 109]);
    expect(r.cuts[0]).toBeCloseTo(0.0105, 12);
    expect(r.cuts[2]).toBeCloseTo(0.2385, 12);
    expect(r.cuts[3]).toBeCloseTo(0.6735, 12);
    expect(r.from).toBe('shares');
  });

  it('a plateau no cut can split (clamped values) is reported in cells, the cuts ascending, never hidden', () => {
    const values = new Float64Array(1000).map((_, i) => (i < 100 ? 0 : i / 1000));
    const r = cutPoints(values, CELLS.shares, new Uint8Array(1000).fill(1));
    expect(r.perBand[0]).toBe(100);
    expect(r.errorCells).toBeGreaterThan(80);
    for (let k = 1; k < r.cuts.length; k += 1) expect(r.cuts[k]).toBeGreaterThanOrEqual(r.cuts[k - 1]);
  });

  it('no land: the default cuts of bands.json stand, reported', () => {
    const r = cutPoints(new Float64Array(10).fill(0.5), CELLS.shares, new Uint8Array(10));
    expect(r.from).toBe('default');
    expect(r.cuts).toEqual([0.011, 0.022, 0.239, 0.674, 0.891]);
    expect(fieldBands('prosperity', r, CELLS.bands, CELLS.shares, 0.02).source).toBe('table');
  });

  it('a mask of another size is refused', () => {
    expect(() => cutPoints(new Float64Array(3), CELLS.shares, new Uint8Array(4))).toThrow(RangeError);
  });

  it('fieldBands: the record of §2.5 — the cuts, the bands in order, the middle band, the hysteresis, the source, the epoch', () => {
    const values = new Float64Array(500).map((_, i) => i / 500);
    const r = cutPoints(values, CELLS.shares, new Uint8Array(500).fill(1));
    const fb = fieldBands('density', r, CELLS.bands, CELLS.shares, CELLS.hysteresis, 3);
    expect(fb).toEqual({ field: 'density', cuts: r.cuts, hysteresis: 0.02, bands: CELLS.bands, middle: 'comfortable', source: 'roster-shares', epoch: 3 });
    // another share set moves the middle band: modest when the poorer bands pass one half first
    expect(middleOf(CELLS.bands, [0.1, 0.1, 0.31, 0.3, 0.1, 0.09])).toBe('modest');
    expect(middleOf(CELLS.bands, [0.1, 0.1, 0.3, 0.3, 0.1, 0.1])).toBe('comfortable');
  });
});

describe('holdBand: the hysteresis (0.02)', () => {
  const fb = { field: 'prosperity' as const, cuts: [0.1, 0.2, 0.4, 0.6, 0.8], hysteresis: 0.02, bands: ['squalid', 'poor', 'modest', 'comfortable', 'prosperous', 'rich'], middle: 'comfortable', source: 'roster-shares' as const, epoch: 0 };
  it('a block keeps its band within the cut ± 0.02 and takes the new band beyond it', () => {
    expect(holdBand(0.61, 'comfortable', fb)).toBe('comfortable');
    expect(holdBand(0.619, 'comfortable', fb)).toBe('comfortable');
    expect(holdBand(0.6201, 'comfortable', fb)).toBe('prosperous');
    expect(holdBand(0.381, 'comfortable', fb)).toBe('comfortable');
    expect(holdBand(0.3799, 'comfortable', fb)).toBe('modest');
    expect(holdBand(0.5, 'modest', fb)).toBe('comfortable');
    expect(holdBand(0.0, 'squalid', fb)).toBe('squalid');
    expect(holdBand(0.99, 'rich', fb)).toBe('rich');
    expect(holdBand(0.79, 'rich', fb)).toBe('rich');
    expect(holdBand(0.7799, 'rich', fb)).toBe('prosperous');
    expect(() => holdBand(0.5, 'gilded', fb)).toThrow(RangeError);
  });
});
