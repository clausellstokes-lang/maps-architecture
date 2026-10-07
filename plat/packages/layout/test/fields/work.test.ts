// F-WORK and R12-5 (§5.2 F-WORK, §5.1 (5); C-0085; R12-5's fields 32 → 48 m): `field.cells` is charged cols × rows per
// field, its limit the law over the frame's cells; at the limit the fields take the coarser step, reported work_cut with
// the count, and the cuts still give the shares' land within one cell at the coarser cell; the `fieldsCoarsen` switch
// changes only the cell size.
import { loadWorkLimits, type WorkLimitsTable } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { fieldCellsLimit, fieldsCells, type FieldsPass1, type ScalarField } from '../../src/index.js';
import { fieldTown, landPoints, pass1, TABLES } from './support.js';

const CELLS = fieldsCells(TABLES);

function lowFloor(floor: number): WorkLimitsTable {
  const base = loadWorkLimits();
  return {
    table: base.table,
    laws: base.laws,
    has: (c) => base.has(c),
    law: (c) => (c === 'field.cells' ? { ...base.law(c), floor, perUnit: 0 } : base.law(c)),
  };
}

function all(r: FieldsPass1): ScalarField[] {
  return [r.prosperity, r.density, r.greenery];
}

function withinOneCell(r: FieldsPass1): void {
  for (const f of all(r)) {
    expect(f.cutResult.errorCells).toBeLessThanOrEqual(1);
    expect(f.cutResult.landCells).toBe(r.report.landCells);
    for (let b = 0; b < CELLS.shares.length; b += 1) expect(Math.abs(f.cutResult.perBand[b] - CELLS.shares[b] * r.report.landCells)).toBeLessThanOrEqual(1);
    expect(f.bands.middle).toBe('comfortable');
  }
}

describe('field.cells and F-WORK\'s coarser rung (C-0085)', () => {
  const ft = fieldTown(4);
  it('charged cols × rows × 3 at 32 m; the limit is the law over the frame\'s cells at 32 m (frame + margin): 4 096 + 32 × 40 000', () => {
    const r = pass1(ft);
    expect(r.report.cellCm).toBe(3200);
    expect(r.report.cols * r.report.rows).toBe(40000);
    expect(r.report.work['field.cells']).toBe(3 * 40000);
    const law = loadWorkLimits().law('field.cells');
    expect(r.report.work.limit).toBe(law.floor + law.perUnit * 40000);
    expect(fieldCellsLimit(ft.site.frame, 3200)).toBe(r.report.work.limit);
    expect(r.report.workCut).toBeNull();
  });

  it('a low field.cells floor coarsens the fields one step and reports work_cut with the count; the cuts still give the shares\' land within one cell', () => {
    const r = pass1(ft, { workLimits: lowFloor(5000) });
    expect(r.report.workCut).toEqual({ code: 'work_cut', counter: 'field.cells', count: 120000, limit: 5000, coarsened: true, fromCellCm: 3200, toCellCm: 4800 });
    expect(r.report.cellCm).toBe(4800);
    expect(r.grid.cellCm).toBe(4800);
    expect(r.report.work['field.cells']).toBe(3 * r.grid.cols * r.grid.rows);
    expect(r.report.switchCoarsen).toBe(false);
    withinOneCell(r);
  });

  it('the limit is reached at count ≥ limit: one cell below the count cuts, one above does not', () => {
    expect(pass1(ft, { fieldCellsLimit: 120000 }).report.workCut?.count).toBe(120000);
    expect(pass1(ft, { fieldCellsLimit: 120001 }).report.workCut).toBeNull();
    expect(pass1(ft, { fieldCellsLimit: 119999 }).report.cellCm).toBe(4800);
  });

  it('already at the coarser step (the switch on): work_cut reported, no further step, the run proceeds', () => {
    const r = pass1(ft, { fieldsCoarsen: true, workLimits: lowFloor(10) });
    expect(r.report.workCut?.coarsened).toBe(false);
    expect(r.report.workCut?.fromCellCm).toBe(4800);
    expect(r.report.cellCm).toBe(4800);
    withinOneCell(r);
  });
});

describe('the fieldsCoarsen switch (R12-5): only the cell size changes', () => {
  const ft = fieldTown(4);
  const a = pass1(ft);
  const b = pass1(ft, { fieldsCoarsen: true });
  it('48 m cells over the same frame + margin; σ, the weights, the terms, the band set and the middle band unchanged; the cuts within one cell', () => {
    expect(b.report.cellCm).toBe(4800);
    expect(b.report.switchCoarsen).toBe(true);
    expect(b.report.workCut).toBeNull();
    expect(b.report.sigmaM).toBe(a.report.sigmaM);
    expect(b.grid.cols * b.grid.cellCm).toBeGreaterThanOrEqual(a.grid.cols * a.grid.cellCm - b.grid.cellCm);
    expect(b.grid.cols * b.grid.cellCm).toBeLessThanOrEqual(a.grid.cols * a.grid.cellCm + b.grid.cellCm);
    expect(b.report.sourced).toEqual(a.report.sourced);
    withinOneCell(b);
    for (let k = 0; k < 3; k += 1) {
      const fa = all(a)[k];
      const fb = all(b)[k];
      expect(fb.bands.bands).toEqual(fa.bands.bands);
      const p = { x: 30000, y: -20000 };
      expect(fb.drivers([p]).terms.map((t) => [t.term, t.weight])).toEqual(fa.drivers([p]).terms.map((t) => [t.term, t.weight]));
    }
  });

  it('the same field sampled more coarsely: the stored values agree on the land within a small mean difference, the cuts close', () => {
    const pts = landPoints(a).filter((_, i) => i % 3 === 0);
    for (let k = 0; k < 3; k += 1) {
      const fa = all(a)[k];
      const fb = all(b)[k];
      let d = 0;
      for (const p of pts) d += Math.abs(fa.valueAt(p) - fb.valueAt(p));
      expect(d / pts.length).toBeLessThan(0.03);
      for (let c = 2; c < fa.bands.cuts.length; c += 1) expect(Math.abs(fa.bands.cuts[c] - fb.bands.cuts[c])).toBeLessThan(0.03);
    }
  });
});
