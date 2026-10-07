// F-WORK and R12-5 (§5.2 F-WORK, §5.1 (5); C-0085; R12-5's fields 32 → 48 m): `field.cells` is charged cols × rows per
// field, its limit the law over the frame's cells; at the limit the fields take the coarser step, reported work_cut with
// the count, and the cuts still give the shares' land within one cell at the coarser cell; the `fieldsCoarsen` switch
// changes only the cell size: σ stays 60 m on the ground, so the applied box is re-derived from the cell in force (C-0255).
import { loadWorkLimits, type WorkLimitsTable } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { boxFor, fieldCellsLimit, fieldsCells, type FieldsPass1, type ScalarField } from '../../src/index.js';
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

// the applied blur: the extended box of σ ÷ the cell in force (the configured σ in cm, the fixture's rung CITY)
const SIGMA_CM = CELLS.sigmaCm('CITY');
function boxAt(cellCm: number): { radius: number; alpha: number } {
  const b = boxFor(SIGMA_CM / cellCm);
  return { radius: b.radius, alpha: b.alpha };
}
/** σ on the ground (m) of three passes of the reported box at the cell in force: √(3 · var(box)) · cell. */
function appliedSigmaM(r: FieldsPass1): number {
  const { radius: k, alpha: al } = r.report.blur;
  const v = ((k * (k + 1) * (2 * k + 1)) / 3 + 2 * al * (k + 1) * (k + 1)) / (2 * k + 1 + 2 * al);
  return (Math.sqrt(3 * v) * r.report.cellCm) / 100;
}
function appliedBlurIsSigma(r: FieldsPass1): void {
  expect(r.report.blur).toEqual(boxAt(r.report.cellCm));
  expect(Math.abs(appliedSigmaM(r) - SIGMA_CM / 100)).toBeLessThan(0.02 * (SIGMA_CM / 100));
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
    appliedBlurIsSigma(r);
  });

  it('a low field.cells floor coarsens the fields one step and reports work_cut with the count; the cuts still give the shares\' land within one cell', () => {
    const r = pass1(ft, { workLimits: lowFloor(5000) });
    expect(r.report.workCut).toEqual({ code: 'work_cut', counter: 'field.cells', count: 120000, limit: 5000, coarsened: true, fromCellCm: 3200, toCellCm: 4800 });
    expect(r.report.cellCm).toBe(4800);
    expect(r.grid.cellCm).toBe(4800);
    expect(r.report.work['field.cells']).toBe(3 * r.grid.cols * r.grid.rows);
    expect(r.report.switchCoarsen).toBe(false);
    // the coarser rung keeps σ on the ground: the box is re-derived from the 48 m cell
    appliedBlurIsSigma(r);
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
    appliedBlurIsSigma(r);
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
    // the limit's law reads the frame's cells at the 32 m cell whatever the switch
    expect(b.report.work.limit).toBe(a.report.work.limit);
    expect(b.report.work['field.cells']).toBe(3 * b.grid.cols * b.grid.rows);
    expect(b.report.sigmaM).toBe(a.report.sigmaM);
    // σ unchanged on the ground means the APPLIED box changes with the cell: boxFor(σ ÷ 3200) at 32 m, boxFor(σ ÷ 4800)
    // at 48 m, each within 2 % of σ (the configured report.sigmaM alone would not see a box built from the wrong cell)
    expect(SIGMA_CM / 100).toBe(a.report.sigmaM);
    expect(a.report.blur).toEqual(boxAt(3200));
    expect(b.report.blur).toEqual(boxAt(4800));
    expect(b.report.blur).not.toEqual(a.report.blur);
    appliedBlurIsSigma(a);
    appliedBlurIsSigma(b);
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
