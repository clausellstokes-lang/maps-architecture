// The fields' pass 1 on M0-e-04's district fixture (§4.5 *Fields*, *Soft terms*, *Bands*; §6.1 `field.chance`; C-0049;
// C-0255): FieldBands' cuts give each band its share of the land within one cell (the here-bar) with the middle band
// comfortable; soft terms at weight 0 are byte-identical to the model without them (a digest comparison); ε is a
// function of the stream alone and carries its declared share; drivers(points) sums to the stored value before the
// clamp; every weight is a table cell; pass 1 is a function of committed state.
import { seedKey } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { DRIVER_TERMS, fieldChanceStream, fieldsCells, fieldsDigest, fieldsDrivers, fieldsPass1, type FieldsPass1, type ScalarField } from '../../src/index.js';
import { townS6 } from '../districts/support.js';
import { fieldDriverSources, fieldFaces } from '../../src/index.js';
import { fieldsVariant, fieldTown, insideRings, landPoints, mainClasses, ownVariant, pass1, TABLES, variance } from './support.js';

const SEEDS = [1, 2, 3, 4, 5, 6, 7, 8];
const CELLS = fieldsCells(TABLES);

function all(r: FieldsPass1): ScalarField[] {
  return [r.prosperity, r.density, r.greenery];
}

describe('FieldBands (the here-bar: the cuts give the shares\' land within one cell; C-0049)', () => {
  it('on 8 seeds, all three fields: every band holds its share of the land within one cell; the middle band comfortable', { timeout: 120_000 }, () => {
    for (const seed of SEEDS) {
      const r = pass1(fieldTown(seed));
      expect(r.report.landCells).toBeGreaterThan(1000);
      for (const f of all(r)) {
        expect(f.bands.field).toBe(f.field);
        expect(f.bands.bands).toEqual(CELLS.bands);
        expect(f.bands.middle).toBe('comfortable');
        expect(f.bands.source).toBe('roster-shares');
        expect(f.bands.hysteresis).toBe(0.02);
        expect(f.bands.epoch).toBe(0);
        expect(f.cutResult.from).toBe('shares');
        // read back independently: each land cell's stored value banded by the record's cuts
        const per = CELLS.bands.map(() => 0);
        for (let i = 0; i < f.values.length; i += 1) {
          if (!r.land[i]) continue;
          let b = 0;
          while (b < f.bands.cuts.length && f.values[i] >= f.bands.cuts[b]) b += 1;
          per[b] += 1;
        }
        expect(per).toEqual(f.cutResult.perBand);
        for (let b = 0; b < per.length; b += 1) expect(Math.abs(per[b] - CELLS.shares[b] * r.report.landCells)).toBeLessThanOrEqual(1);
      }
    }
  });

  it('the land is the cells whose centre lies in a district face; a cell outside every district is no land', () => {
    const ft = fieldTown(1);
    const r = pass1(ft);
    const districts = new Set(ft.districts.districts.map((d) => d.id));
    let land = 0;
    const g = r.grid;
    const dfaces = ft.districts.faces.filter((f) => f.owner !== null && districts.has(f.owner));
    for (let j = 0; j < g.rows; j += 7) {
      for (let i = 0; i < g.cols; i += 7) {
        const x = g.originX + (i + 0.5) * g.cellCm;
        const y = g.originY + (j + 0.5) * g.cellCm;
        const want = dfaces.some((f) => insideRings(f.rings, x, y));
        expect(r.land[j * g.cols + i] === 1).toBe(want);
      }
    }
    for (const v of r.land) land += v;
    expect(land).toBe(r.report.landCells);
  });
});

describe('the soft terms at weight 0 (C-0049)', () => {
  it('byte-identical to the model without them: the digest with the daylight and water rows at weight 0 equals the digest with the rows removed', () => {
    for (const seed of [1, 2]) {
      const ft = fieldTown(seed);
      const withRows = pass1(ft);
      const without = fieldsVariant((rows) => {
        for (const f of ['prosperity', 'density', 'greenery']) {
          delete rows[f]['daylight.weight'];
          delete rows[f]['waterTerm.weight'];
        }
      });
      expect(CELLS.fields[0].terms.map((t) => t.term)).toContain('daylight');
      expect(CELLS.fields[0].terms.map((t) => t.term)).toContain('waterTerm');
      expect(fieldsCells(without).fields[0].terms.map((t) => t.term)).not.toContain('daylight');
      expect(fieldsDigest(pass1(ft, {}, ft.site, without))).toEqual(fieldsDigest(withRows));
    }
  });

  it('the digest sees a change: a non-zero water term moves it; the daylight term at a non-zero weight is refused, notBuilt(M2b)', () => {
    const ft = fieldTown(1);
    const base = fieldsDigest(pass1(ft));
    const wet = fieldsVariant((rows) => {
      rows.prosperity['waterTerm.weight'] = { ...rows.prosperity['waterTerm.weight'], value: 0.2 };
    });
    const site = { ...ft.site, sources: { ...ft.site.sources, water: [[{ x: -200000, y: -200000 }, { x: -150000, y: -200000 }, { x: -150000, y: 200000 }, { x: -200000, y: 200000 }]] } };
    const dry = fieldsDigest(pass1(ft, {}, site));
    expect(dry).not.toEqual(base);
    expect(fieldsDigest(pass1(ft, {}, site, wet))).not.toEqual(dry);
    const sun = fieldsVariant((rows) => {
      rows.greenery['daylight.weight'] = { ...rows.prosperity['daylight.weight'], value: 0.1 };
    });
    const r = fieldsPass1(ft.site, ft.districts, sun, fieldChanceStream(seedKey(1)));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.detail).toContain("notBuilt('M2b')");
  });
});

describe('ε (§4.5: a low-frequency fBm from the field.chance stream with a declared share, 0.15)', () => {
  it('a function of the stream alone: moving the drivers leaves its pattern; another seed\'s stream changes it', () => {
    const ft = fieldTown(3);
    const a = pass1(ft);
    // the same districts and stream, the gates and main streets gone: the kernels move, ε's pattern does not
    const b = pass1(ft, {}, { ...ft.site, sources: { ...ft.site.sources, gates: [], mainStreets: [] } });
    const c = fieldsPass1(ft.site, ft.districts, TABLES, fieldChanceStream(seedKey(99)));
    if (!c.ok) throw new Error(c.detail);
    const pts = landPoints(a).filter((_, i) => i % 13 === 0);
    for (const [fa, fb, fc] of [
      [a.prosperity, b.prosperity, c.value.prosperity],
      [a.density, b.density, c.value.density],
      [a.greenery, b.greenery, c.value.greenery],
    ] as [ScalarField, ScalarField, ScalarField][]) {
      expect(fa.chanceScale).toBeGreaterThan(0);
      expect(fb.chanceScale).not.toBe(fa.chanceScale);
      let differs = 0;
      for (const p of pts) {
        const na = fa.drivers([p]).chance / fa.chanceScale;
        const nb = fb.drivers([p]).chance / fb.chanceScale;
        const nc = fc.drivers([p]).chance / fc.chanceScale;
        expect(nb).toBeCloseTo(na, 9);
        if (Math.abs(nc - na) > 1e-3) differs += 1;
      }
      expect(differs).toBeGreaterThan(pts.length * 0.9);
    }
    // the three fields draw three samplers from the one stream: their patterns differ
    const p0 = pts[5];
    expect(a.prosperity.drivers([p0]).chance / a.prosperity.chanceScale).not.toBeCloseTo(a.density.drivers([p0]).chance / a.density.chanceScale, 3);
  });

  it('carries its declared share: Var ε ÷ (Var ε + Var kernels) over the land within 10 % of 0.15, on every field', { timeout: 60_000 }, () => {
    expect(CELLS.epsilonShare).toBe(0.15);
    for (const seed of [1, 4]) {
      const r = pass1(fieldTown(seed));
      const pts = landPoints(r);
      for (const f of all(r)) {
        const eps: number[] = [];
        const ker: number[] = [];
        for (const p of pts) {
          const d = f.drivers([p]);
          eps.push(d.chance);
          let k = 0;
          for (const t of d.terms) k += t.value;
          ker.push(k);
        }
        const ve = variance(eps);
        const share = ve / (ve + variance(ker));
        expect(Math.abs(share - 0.15) / 0.15).toBeLessThan(0.1);
        expect(share).toBeCloseTo(0.15, 6);
      }
    }
  });

  it('a share of 0 makes ε vanish; a larger share gives ε a larger part', () => {
    const ft = fieldTown(2);
    const none = pass1(ft, {}, ft.site, fieldsVariant((rows) => (rows.settings.epsilonShare = { ...rows.settings.epsilonShare, value: 0 })));
    expect(none.prosperity.chanceScale).toBe(0);
    const big = pass1(ft, {}, ft.site, fieldsVariant((rows) => (rows.settings.epsilonShare = { ...rows.settings.epsilonShare, value: 0.5 })));
    expect(big.prosperity.chanceScale).toBeGreaterThan(pass1(ft).prosperity.chanceScale * 2);
  });
});

describe('drivers(points) (§4.5: each term separately; the terms sum, before the clamp, to the stored value)', () => {
  it('at single points and averaged over point sets, the terms sum to the stored value before the clamp', () => {
    const ft = fieldTown(2);
    const r = pass1(ft);
    const pts = landPoints(r);
    for (const f of all(r)) {
      for (let k = 0; k < pts.length; k += 37) {
        const d = f.drivers([pts[k]]);
        expect(d.points).toBe(1);
        expect(Math.abs(d.sum - d.unclamped)).toBeLessThan(1e-12);
        expect(d.value).toBe(f.valueAt(pts[k]));
        expect(d.value).toBe(Math.min(1, Math.max(0, d.unclamped)));
      }
      const set = pts.filter((_, i) => i % 5 === 0);
      const d = f.drivers(set);
      expect(d.points).toBe(set.length);
      expect(Math.abs(d.sum - d.unclamped)).toBeLessThan(1e-12);
      let mean = 0;
      for (const p of set) mean += f.valueAt(p);
      expect(d.value).toBeCloseTo(mean / set.length, 12);
      expect(d.brush).toBe(0);
      expect(d.drift).toBe(0);
      // every term of the field's row, in DRIVER_TERMS order, with its table weight; the soft terms at weight 0 read 0
      const row = CELLS.fields.find((x) => x.field === f.field);
      expect(d.terms.map((t) => t.term)).toEqual(row?.terms.map((t) => t.term));
      expect(d.terms.map((t) => t.term)).toEqual(DRIVER_TERMS.filter((t) => d.terms.some((x) => x.term === t)));
      expect(d.terms.map((t) => t.weight)).toEqual(row?.terms.map((t) => t.weight));
      for (const t of d.terms) if (t.weight === 0) expect(t.value).toBe(0);
      expect(() => f.drivers([])).toThrow(RangeError);
    }
  });

  it('the terms carry their kernels: the plaza term is ≈ its weight at the plaza and 0 beyond its radius; the base level is its weight', () => {
    const ft = fieldTown(1);
    const r = pass1(ft);
    const centre = { x: 0, y: 0 };
    const far = { x: 150000, y: 150000 };
    for (const f of all(r)) {
      const w = (term: string) => (CELLS.fields.find((x) => x.field === f.field)?.terms.find((t) => t.term === term)?.weight ?? NaN);
      const at = f.drivers([centre]);
      const plaza = at.terms.find((t) => t.term === 'plaza');
      // the kernel ≈ 1 at the plaza (its sign the weight's: greenery's plaza weight is negative)
      const ratio = (plaza?.value ?? NaN) / w('plaza');
      expect(ratio).toBeGreaterThan(0.9);
      expect(ratio).toBeLessThanOrEqual(1 + 1e-12);
      // beyond the radius and the blur's reach (three extended boxes: ± 6 cells) only the running sums' rounding remains
      const away = f.drivers([far]).terms.find((t) => t.term === 'plaza');
      expect(Math.abs(away?.value ?? NaN)).toBeLessThan(1e-15);
      const base = at.terms.find((t) => t.term === 'base');
      expect(base?.value).toBeCloseTo(w('base'), 12);
    }
  });

  it('every weight is a table cell: doubling fields.json\'s plaza weight doubles the plaza term; a radius moves the kernel; an unknown cell is refused', () => {
    const ft = fieldTown(1);
    const r = pass1(ft);
    const v2 = pass1(ft, {}, ft.site, fieldsVariant((rows) => (rows.prosperity['plaza.weight'] = { ...rows.prosperity['plaza.weight'], value: 0.6 })));
    const p = { x: 20000, y: -10000 };
    const t1 = r.prosperity.drivers([p]).terms.find((t) => t.term === 'plaza')?.value ?? NaN;
    const t2 = v2.prosperity.drivers([p]).terms.find((t) => t.term === 'plaza')?.value ?? NaN;
    expect(t1).toBeGreaterThan(0);
    expect(t2).toBeCloseTo(2 * t1, 12);
    const rad = pass1(ft, {}, ft.site, fieldsVariant((rows) => (rows.prosperity['plaza.radiusM'] = { ...rows.prosperity['plaza.radiusM'], value: 400 })));
    expect(Math.abs(rad.prosperity.drivers([{ x: 70000, y: 0 }]).terms.find((t) => t.term === 'plaza')?.value ?? NaN)).toBeLessThan(1e-15);
    expect(r.prosperity.drivers([{ x: 70000, y: 0 }]).terms.find((t) => t.term === 'plaza')?.value).toBeGreaterThan(0.02);
    expect(() => fieldsCells(fieldsVariant((rows) => (rows.density['foo.weight'] = { ...rows.density['plaza.weight'] })))).toThrow(RangeError);
    expect(() => fieldsCells(fieldsVariant((rows) => delete rows.density['plaza.radiusM']))).toThrow(RangeError);
  });

  it('the district-type term: each district\'s kind\'s offset (pass1.json), smoothed; a larger offset raises that district\'s field', () => {
    const ft = fieldTown(1);
    const r = pass1(ft);
    const central = ft.districts.districts.filter((d) => d.kind === 'central').map((d) => d.id);
    expect(central.length).toBeGreaterThan(0);
    const faces = ft.districts.faces.filter((f) => f.owner !== null && central.includes(f.owner));
    const cells = landPoints(r).filter((p) => faces.some((f) => insideRings(f.rings, p.x, p.y)));
    expect(cells.length).toBeGreaterThan(10);
    const d0 = r.prosperity.drivers(cells);
    expect(d0.characterOffset).toBeGreaterThan(0.02);
    expect(d0.characterOffset).toBeLessThanOrEqual(0.05 + 1e-12);
    const up = pass1(ft, { own: ownVariant((rows) => (rows.characterOffset['prosperity.central'] = { ...rows.characterOffset['prosperity.central'], value: 0.3 })) });
    const d1 = up.prosperity.drivers(cells);
    expect(d1.characterOffset - d0.characterOffset).toBeGreaterThan(0.1);
    expect(d1.unclamped).toBeGreaterThan(d0.unclamped + 0.1);
    // the other fields keep theirs
    expect(up.density.drivers(cells).characterOffset).toBe(r.density.drivers(cells).characterOffset);
    expect(r.report.kindsWithoutOffset).toEqual([]);
  });
});

describe('the per-face values and the driver-only state', () => {
  it('a face\'s value is the mean of the stored values over its cells; a face of no cell reads the cell at its centroid', () => {
    const ft = fieldTown(2);
    const r = pass1(ft);
    expect(r.prosperity.faces.length).toBe(ft.districts.faces.length);
    let some = 0;
    for (const f of all(r)) {
      f.faces.forEach((fv, k) => {
        expect(fv.key).toEqual(ft.districts.faces[k].key);
        expect(fv.owner).toBe(ft.districts.faces[k].owner);
        if (fv.cells === 0) {
          expect(fv.value).toBeGreaterThanOrEqual(0);
          expect(fv.value).toBeLessThanOrEqual(1);
        } else some += 1;
      });
    }
    expect(some).toBeGreaterThan(0);
    // one district face's mean read independently through its cells
    const fi = r.prosperity.faces.findIndex((fv) => fv.cells > 20);
    const face = ft.districts.faces[fi];
    const g = r.grid;
    let s = 0;
    let n = 0;
    for (let j = 0; j < g.rows; j += 1) {
      for (let i = 0; i < g.cols; i += 1) {
        const x = g.originX + (i + 0.5) * g.cellCm;
        const y = g.originY + (j + 0.5) * g.cellCm;
        const c = insideRings(face.rings, x, y);
        if (c) {
          s += r.prosperity.values[j * g.cols + i];
          n += 1;
        }
      }
    }
    expect(n).toBe(r.prosperity.faces[fi].cells);
    expect(r.prosperity.faces[fi].value).toBeCloseTo(s / n, 12);
  });

  it('the driver-only state (typing and S5d read it) is the kernels\' sum, blurred: the complete field adds only the offset and ε; it is a FieldProvider', () => {
    const ft = fieldTown(2);
    const st = fieldsDrivers(ft.site, TABLES);
    if (!st.ok) throw new Error(st.detail);
    const r = fieldsPass1(ft.site, ft.districts, TABLES, fieldChanceStream(seedKey(2)), { drivers: st.value });
    if (!r.ok) throw new Error(r.detail);
    expect(fieldsDigest(r.value)).toEqual(fieldsDigest(pass1(ft)));
    const pts = landPoints(r.value).filter((_, i) => i % 41 === 0);
    st.value.fields.forEach((df, k) => {
      const f = all(r.value)[k];
      expect(df.field).toBe(f.field);
      expect(df.name).toBe('driver-only');
      const provider: { readonly name: string; prosperityAt(p: { x: number; y: number }): number } = df;
      for (const p of pts) {
        const d = f.drivers([p]);
        let kernels = 0;
        for (const t of d.terms) kernels += t.value;
        expect(df.valueAt(p)).toBe(provider.prosperityAt(p));
        expect(Math.abs(Math.min(1, Math.max(0, kernels)) - provider.prosperityAt(p))).toBeLessThan(1e-12);
        expect(Math.abs(kernels + d.characterOffset + d.chance - d.unclamped)).toBeLessThan(1e-12);
      }
    });
  });
});

describe('pass 1 is a function of committed state', () => {
  it('two runs over two arenas built afresh at one seed are byte-identical; another seed differs', { timeout: 60_000 }, () => {
    const digestOf = (seed: number) => {
      const t = townS6(seed);
      const site = { frame: t.plat.frame, rung: 'CITY', sources: fieldDriverSources(t.plat, { reservations: [t.plaza], ways: t.ways, gates: t.gates, mainStreetClasses: mainClasses() }) };
      const r = fieldsPass1(site, { districts: t.out.districts, faces: fieldFaces(t.plat) }, TABLES, fieldChanceStream(seedKey(seed)));
      if (!r.ok) throw new Error(r.detail);
      return fieldsDigest(r.value);
    };
    const a = digestOf(5);
    expect(digestOf(5)).toEqual(a);
    expect(fieldsDigest(pass1(fieldTown(5)))).toEqual(a);
    expect(digestOf(6)).not.toEqual(a);
  });
});
