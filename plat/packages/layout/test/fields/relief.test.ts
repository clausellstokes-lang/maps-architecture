// The kernels that read the site beyond the ways (§4.5: "water … (+); elevation above the flood line … (+); low, damp …
// (−)"; the intent's wealth gradient; the water term's q(x), item 111 (b); C-0255 (2), (8)) on M0-e-04's district
// fixture with a hand-built terrain — a plateau, ground rising away from a river strip — and S1 (10)-shaped resources.
import { describe, expect, it } from 'vitest';
import { coveringGrid, type SiteResources } from '@plat/site';
import { fieldsCells, type FieldSite, type ScalarField } from '../../src/index.js';
import { fieldsVariant, fieldTown, pass1, rect, TABLES, terrainOf } from './support.js';

const CELLS = fieldsCells(TABLES);
const ft = fieldTown(1);
// the arena reaches ± 3 200 m (4 km frame, 30 % margin); a 25 m height raster over it
const T_CELL = 2500;
const T_N = 256;
const T_O = -320000;
/** The river: a 100 m strip at x ∈ [−1 600, −1 500] m; ground 0 there, rising 1 m per 100 m eastward; a 100 m plateau. */
function height(x: number, y: number): number {
  const rise = x > -150000 ? (x + 150000) / 100 : 0;
  const plateau = x > 100000 && x < 250000 && y > 100000 && y < 250000 ? 10000 : 0;
  return rise + plateau;
}
const terrain = terrainOf(T_CELL, T_N, T_N, T_O, T_O, height);
const river = rect(-160000, -320000, -150000, 320000);
const site: FieldSite = { ...ft.site, terrain, sources: { ...ft.site.sources, water: [river] } };

function term(f: ScalarField, p: { x: number; y: number }, name: string): number {
  return f.drivers([p]).terms.find((t) => t.term === name)?.value ?? NaN;
}

function w(field: string, name: string): number {
  return CELLS.fields.find((f) => f.field === field)?.terms.find((t) => t.term === name)?.weight ?? NaN;
}

describe('elevation and low, damp ground', () => {
  const r = pass1(ft, {}, site);
  it('the elevation kernel: 1 on the plateau (100 m above the flood line, past its 30 m span), 0 at and just above the river', () => {
    expect(term(r.prosperity, { x: 175000, y: 175000 }, 'elevation')).toBeCloseTo(w('prosperity', 'elevation'), 12);
    expect(term(r.greenery, { x: 175000, y: 175000 }, 'elevation')).toBeCloseTo(w('greenery', 'elevation'), 12);
    expect(Math.abs(term(r.prosperity, { x: -155000, y: 0 }, 'elevation'))).toBeLessThan(1e-15);
    // 1 000 m east of the river: 10 m above its ground, 8 m above the flood line (2 m rise): 8 ÷ 30 of the weight
    expect(term(r.prosperity, { x: -50000, y: -250000 }, 'elevation') / w('prosperity', 'elevation')).toBeCloseTo(8 / 30, 2);
    // the density field carries no elevation row: no term
    expect(r.density.drivers([{ x: 0, y: 0 }]).terms.some((t) => t.term === 'elevation')).toBe(false);
  });

  it('the flood line is the nearest water\'s ground plus 2 m; the low and damp kernel lies by the water only, its sign the weight\'s', () => {
    const at = term(r.prosperity, { x: -155000, y: 0 }, 'lowDamp');
    expect(at).toBeLessThan(0.9 * w('prosperity', 'lowDamp'));
    expect(at / w('prosperity', 'lowDamp')).toBeLessThanOrEqual(1 + 1e-12);
    // greenery's lowDamp weight is positive: the same kernel, the other sign
    expect(term(r.greenery, { x: -155000, y: 0 }, 'lowDamp')).toBeGreaterThan(0.9 * w('greenery', 'lowDamp'));
    // 600 m from the river: beyond the 300 m damp radius and the blur
    expect(Math.abs(term(r.prosperity, { x: -90000, y: 0 }, 'lowDamp'))).toBeLessThan(1e-15);
    // a dry site has no damp ground
    const dry = pass1(ft, {}, { ...site, sources: { ...site.sources, water: [] } });
    expect(Math.abs(term(dry.prosperity, { x: -155000, y: 0 }, 'lowDamp'))).toBeLessThan(1e-15);
  });

  it('the water kernel decays from the river over its radius; with no water it is absent from the report\'s sourced classes', () => {
    expect(term(r.prosperity, { x: -155000, y: 0 }, 'water') / w('prosperity', 'water')).toBeGreaterThan(0.9);
    const mid = term(r.prosperity, { x: -150000 + 15000, y: 0 }, 'water') / w('prosperity', 'water');
    expect(mid).toBeGreaterThan(0.4);
    expect(mid).toBeLessThan(0.6);
    expect(r.report.sourced).toContain('water');
    expect(pass1(ft).report.sourced).not.toContain('water');
  });
});

describe('the water term (soft; weight 0 at M0, C-0049) and the wealth gradient', () => {
  it('q(x) at a non-zero weight: the river bank\'s proximity or the wells\' yield, whichever is higher', () => {
    const rg = coveringGrid({ cellCm: T_CELL, cols: T_N, rows: T_N, originX: T_O, originY: T_O }, 10000);
    const wellYield = new Float32Array(rg.cols * rg.rows);
    for (let j = 0; j < rg.rows; j += 1) for (let i = 0; i < rg.cols; i += 1) {
      const x = rg.originX + (i + 0.5) * rg.cellCm;
      const y = rg.originY + (j + 0.5) * rg.cellCm;
      if (x > 0 && x < 100000 && y > -250000 && y < -100000) wellYield[j * rg.cols + i] = 0.5;
    }
    const z = new Float32Array(wellYield.length);
    const res: SiteResources = { cellCm: 10000, ore: z, stone: z, timber: z, fish: z, clay: z, fertile: z, wellYield, slope: z };
    const wet = fieldsVariant((rows) => (rows.prosperity['waterTerm.weight'] = { ...rows.prosperity['waterTerm.weight'], value: 0.2 }));
    const r = pass1(ft, {}, { ...site, resources: res }, wet);
    expect(term(r.prosperity, { x: -155000, y: 0 }, 'waterTerm')).toBeGreaterThan(0.9 * 0.2);
    expect(term(r.prosperity, { x: 50000, y: -175000 }, 'waterTerm')).toBeCloseTo(0.2 * 0.5, 9);
    expect(Math.abs(term(r.prosperity, { x: 200000, y: 200000 }, 'waterTerm'))).toBeLessThan(1e-15);
    // at weight 0 the term reads 0 everywhere, the wells notwithstanding
    const off = pass1(ft, {}, { ...site, resources: res });
    expect(term(off.prosperity, { x: 50000, y: -175000 }, 'waterTerm')).toBe(0);
  });

  it('the wealth ramp: absent without a bearing; with one it rises toward the bearing across the grid, at its table weight', () => {
    const none = pass1(ft);
    expect(term(none.prosperity, { x: 250000, y: 0 }, 'wealthGradient')).toBe(0);
    const east = pass1(ft, {}, { ...ft.site, wealthBearingCdeg: 9000 });
    const e = term(east.prosperity, { x: 250000, y: 0 }, 'wealthGradient');
    const wv = term(east.prosperity, { x: -250000, y: 0 }, 'wealthGradient');
    const c = term(east.prosperity, { x: 0, y: 0 }, 'wealthGradient');
    expect(e).toBeGreaterThan(c);
    expect(c).toBeGreaterThan(wv);
    expect(c / w('prosperity', 'wealthGradient')).toBeCloseTo(0.5, 2);
    // north: the ramp turns with the bearing
    const north = pass1(ft, {}, { ...ft.site, wealthBearingCdeg: 0 });
    expect(term(north.prosperity, { x: 0, y: 250000 }, 'wealthGradient')).toBeCloseTo(e, 6);
    expect(term(north.prosperity, { x: 250000, y: 0 }, 'wealthGradient')).toBeCloseTo(c, 6);
  });

  it('resources without the terrain their grid lies on are refused', () => {
    const z = new Float32Array(4);
    expect(() => pass1(ft, {}, { ...ft.site, resources: { cellCm: 10000, ore: z, stone: z, timber: z, fish: z, clay: z, fertile: z, wellYield: z, slope: z } })).toThrow(/the resources need the terrain/);
  });
});
