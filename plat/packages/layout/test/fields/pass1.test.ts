// The fields' pass 1 on M0-e-04's district fixture (§4.5 *Fields*, *Soft terms*, *Bands*; §6.1 `field.chance`; C-0049;
// C-0255): FieldBands' cuts give each band its share of the land within one cell (the here-bar) with the middle band
// comfortable; soft terms at weight 0 are byte-identical to the model without them (a digest comparison); ε is a
// function of the stream alone and carries its declared share; drivers(points) sums to the stored value before the
// clamp; every weight is a table cell; pass 1 is a function of committed state.
import { fbmRow, noiseStream, seedKey } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { blur3, boxFor, DRIVER_TERMS, fieldChanceStream, fieldsCells, fieldsDigest, fieldsDrivers, fieldsPass1, type FieldsPass1, type ScalarField } from '../../src/index.js';
import { townS6 } from '../districts/support.js';
import { fieldDriverSources, fieldFaces } from '../../src/index.js';
import { all, CELLS, fieldsVariant, fieldTown, insideRings, landPoints, mainClasses, ownVariant, pass1, TABLES, variance, wetSite } from './support.js';

const SEEDS = [1, 2, 3, 4, 5, 6, 7, 8];

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

  it('byte-identical on a wet site too (a river strip, the terrain and a wells raster, where q(x) is not 0): rows at weight 0 equal rows removed', () => {
    const without = fieldsVariant((rows) => {
      for (const f of ['prosperity', 'density', 'greenery']) {
        delete rows[f]['daylight.weight'];
        delete rows[f]['waterTerm.weight'];
      }
    });
    const wetW = fieldsVariant((rows) => {
      rows.prosperity['waterTerm.weight'] = { ...rows.prosperity['waterTerm.weight'], value: 0.2 };
    });
    for (const seed of [1, 2]) {
      const ft = fieldTown(seed);
      const site = wetSite(ft, true);
      const withRows = pass1(ft, {}, site);
      expect(fieldsDigest(pass1(ft, {}, site, without))).toEqual(fieldsDigest(withRows));
      // the site's q(x) is not 0: the term at a non-zero weight is the river's proximity by the river, the wells' yield on them
      const wet = pass1(ft, {}, site, wetW);
      const q = (p: { x: number; y: number }) => (wet.prosperity.drivers([p]).terms.find((t) => t.term === 'waterTerm')?.value ?? NaN) / 0.2;
      expect(q({ x: -155000, y: 0 })).toBeGreaterThan(0.9);
      expect(q({ x: 50000, y: -175000 })).toBeCloseTo(0.5, 9);
      expect(fieldsDigest(wet)).not.toEqual(fieldsDigest(withRows));
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

  it('zero-mean over the grid: ε shifts no field as a whole (its mean over every cell ≈ 0 against its spread)', () => {
    const r = pass1(fieldTown(2));
    const g = r.grid;
    const pts: { x: number; y: number }[] = [];
    for (let j = 0; j < g.rows; j += 2) for (let i = 0; i < g.cols; i += 2) pts.push({ x: g.originX + (i + 0.5) * g.cellCm, y: g.originY + (j + 0.5) * g.cellCm });
    for (const f of all(r)) {
      const vals = pts.map((p) => f.drivers([p]).chance / f.chanceScale);
      const m = vals.reduce((a, b) => a + b, 0) / vals.length;
      expect(Math.abs(m)).toBeLessThan(0.02);
      expect(variance(vals)).toBeGreaterThan(0.5);
    }
  });

  it('its raster is the blur of the stream\'s fBm normalised over the grid (its own mean subtracted), scaled once: read independently at every cell', { timeout: 60_000 }, () => {
    for (const seed of [2, 5]) {
      const r = pass1(fieldTown(seed));
      const g = r.grid;
      const n = g.cols * g.rows;
      const c = CELLS.chance;
      const stream = fieldChanceStream(seedKey(seed));
      const k = 1 / c.wavelengthCm;
      const box = boxFor(CELLS.sigmaCm('CITY') / g.cellCm);
      expect({ radius: box.radius, alpha: box.alpha }).toEqual(r.report.blur);
      for (const f of all(r)) {
        // the field's sampler, drawn in field order from the one stream; its fBm at every cell centre
        const ns = noiseStream(stream, { lacunarity: c.lacunarity, gain: c.gain }, c.octaves);
        if (!ns.ok) throw new Error(ns.detail);
        const raw = new Float64Array(n);
        const row = new Float64Array(g.cols);
        for (let j = 0; j < g.rows; j += 1) {
          fbmRow(row, (g.originX + 0.5 * g.cellCm) * k, g.cellCm * k, g.cols, (g.originY + (j + 0.5) * g.cellCm) * k, c.octaves, ns.value);
          raw.set(row, j * g.cols);
        }
        let m = 0;
        for (const v of raw) m += v;
        m /= n;
        let v2 = 0;
        for (const v of raw) v2 += (v - m) * (v - m);
        const sd = Math.sqrt(v2 / n);
        const norm = raw.map((v) => (v - m) / sd);
        const unsub = raw.map((v) => v / sd);
        const want = norm.slice();
        blur3(want, g.cols, g.rows, box);
        const wantUnsub = unsub.slice();
        blur3(wantUnsub, g.cols, g.rows, box);
        // the grid mean is not 0 before the subtraction, so the comparison below can tell the two apart
        expect(Math.abs(m / sd)).toBeGreaterThan(1e-4);
        let far = 0;
        let unsmoothed = 0;
        for (let i = 0; i < n; i += 7) {
          const p = { x: g.originX + ((i % g.cols) + 0.5) * g.cellCm, y: g.originY + (Math.floor(i / g.cols) + 0.5) * g.cellCm };
          const got = f.drivers([p]).chance;
          expect(Math.abs(got - f.chanceScale * want[i])).toBeLessThan(1e-9 * f.chanceScale);
          if (Math.abs(got - f.chanceScale * wantUnsub[i]) > 1e-6 * f.chanceScale) far += 1;
          if (Math.abs(got - f.chanceScale * norm[i]) > 1e-6 * f.chanceScale) unsmoothed += 1;
        }
        expect(far).toBeGreaterThan(n / 7 / 2);
        expect(unsmoothed).toBeGreaterThan(n / 7 / 2);
      }
    }
  });

  it('kernels with no variance over the land carry no share to scale against: ε vanishes, the field is the kernels\' constant, no NaN', () => {
    const ft = fieldTown(2);
    // every driver weight 0: the kernels are the base level alone, constant over the grid (C-0255 (7))
    const flat = fieldsVariant((rows) => {
      for (const f of ['prosperity', 'density', 'greenery']) for (const key of Object.keys(rows[f])) if (key.endsWith('.weight')) rows[f][key] = { ...rows[f][key], value: 0 };
    });
    const noOffset = ownVariant((rows) => {
      for (const key of Object.keys(rows.characterOffset)) rows.characterOffset[key] = { ...rows.characterOffset[key], value: 0 };
    });
    const r = pass1(ft, { own: noOffset }, ft.site, flat);
    for (const f of all(r)) {
      // the kernels' land variance is 0 or the blur's rounding alone, so ε's scale is 0 or at rounding level
      expect(Number.isFinite(f.chanceScale)).toBe(true);
      expect(f.chanceScale).toBeLessThan(1e-12);
      const base = CELLS.fields.find((x) => x.field === f.field)?.terms.find((t) => t.term === 'base')?.weight ?? NaN;
      for (let i = 0; i < f.values.length; i += 1) {
        expect(Number.isFinite(f.unclamped[i])).toBe(true);
        expect(Math.abs(f.unclamped[i] - base)).toBeLessThan(1e-12);
      }
      for (const p of landPoints(r).filter((_, i) => i % 97 === 0)) expect(Math.abs(f.drivers([p]).chance)).toBeLessThan(1e-12);
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

  it('at 48 m too (the fieldsCoarsen switch, and F-WORK\'s rung under a 5 000 field.cells limit): the terms sum to the stored value before the clamp', { timeout: 60_000 }, () => {
    const ft = fieldTown(4);
    for (const opts of [{ fieldsCoarsen: true }, { fieldCellsLimit: 5000 }]) {
      const r = pass1(ft, opts);
      expect(r.report.cellCm).toBe(4800);
      const pts = landPoints(r).filter((_, i) => i % 23 === 0);
      expect(pts.length).toBeGreaterThan(20);
      for (const f of all(r)) {
        for (const p of pts) {
          const d = f.drivers([p]);
          expect(Math.abs(d.sum - d.unclamped)).toBeLessThan(1e-12);
        }
      }
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
    // smoothed: across district boundaries the term takes values between the kinds' offsets, not only the table's own
    const own = new Set(CELLS.fields[0].offset.values());
    let between = 0;
    for (const p of landPoints(r)) {
      const o = r.prosperity.drivers([p]).characterOffset;
      if (![...own].some((v) => Math.abs(o - v) < 1e-9)) between += 1;
    }
    expect(between).toBeGreaterThan(50);
  });
});

describe('the per-face values and the driver-only state', () => {
  it('a face\'s value is the mean of the stored values over its cells; a face of no cell reads the cell at its centroid', () => {
    const ft = fieldTown(2);
    const r = pass1(ft);
    expect(r.prosperity.faces.length).toBe(ft.districts.faces.length);
    let some = 0;
    let empties = 0;
    for (const f of all(r)) {
      f.faces.forEach((fv, k) => {
        expect(fv.key).toEqual(ft.districts.faces[k].key);
        expect(fv.owner).toBe(ft.districts.faces[k].owner);
        if (fv.cells === 0) {
          empties += 1;
          // the cell at the outer ring's area centroid (the test's own centroid)
          const ring = ft.districts.faces[k].rings[0];
          let a2 = 0;
          let sx = 0;
          let sy = 0;
          for (let q = 0; q < ring.length; q += 1) {
            const P = ring[q];
            const Q = ring[(q + 1) % ring.length];
            const c = P.x * Q.y - Q.x * P.y;
            a2 += c;
            sx += (P.x + Q.x) * c;
            sy += (P.y + Q.y) * c;
          }
          expect(fv.value).toBe(f.valueAt({ x: sx / (3 * a2), y: sy / (3 * a2) }));
        } else some += 1;
      });
    }
    expect(some).toBeGreaterThan(0);
    expect(empties).toBeGreaterThan(0);
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

  it('every face of the district fixture, seeds 1 – 8, all three fields: its value is the mean of the stored (clamped) values over its cells, read independently', { timeout: 120_000 }, () => {
    let clampedInFaces = 0;
    for (const seed of SEEDS) {
      const ft = fieldTown(seed);
      const r = pass1(ft);
      const g = r.grid;
      // each face's cells: the cell centres inside its rings (the test's own even–odd), searched over its bounding box
      const cellsOf = ft.districts.faces.map((face) => {
        let x0 = Infinity;
        let x1 = -Infinity;
        let y0 = Infinity;
        let y1 = -Infinity;
        for (const ring of face.rings) for (const q of ring) {
          x0 = Math.min(x0, q.x);
          x1 = Math.max(x1, q.x);
          y0 = Math.min(y0, q.y);
          y1 = Math.max(y1, q.y);
        }
        const out: number[] = [];
        const i0 = Math.max(0, Math.floor((x0 - g.originX) / g.cellCm) - 1);
        const i1 = Math.min(g.cols - 1, Math.ceil((x1 - g.originX) / g.cellCm) + 1);
        const j0 = Math.max(0, Math.floor((y0 - g.originY) / g.cellCm) - 1);
        const j1 = Math.min(g.rows - 1, Math.ceil((y1 - g.originY) / g.cellCm) + 1);
        for (let j = j0; j <= j1; j += 1) for (let i = i0; i <= i1; i += 1) if (insideRings(face.rings, g.originX + (i + 0.5) * g.cellCm, g.originY + (j + 0.5) * g.cellCm)) out.push(j * g.cols + i);
        return out;
      });
      for (const f of all(r)) {
        f.faces.forEach((fv, k) => {
          const cells = cellsOf[k];
          expect(fv.cells).toBe(cells.length);
          if (cells.length === 0) return;
          let s = 0;
          for (const i of cells) {
            s += f.values[i];
            if (f.values[i] !== f.unclamped[i]) clampedInFaces += 1;
          }
          expect(fv.value).toBeCloseTo(s / cells.length, 12);
        });
      }
    }
    // the clamp moves cells inside the faces on these fixtures, so the mean of the stored values is not the unclamped one's
    expect(clampedInFaces).toBeGreaterThan(0);
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

describe('fieldsDigest reads the stored raster', () => {
  it('changing one stored raster cell moves the digest, the faces\' means held: a land cell, and a margin cell outside every district, in each field', () => {
    const ft = fieldTown(1);
    const r = pass1(ft);
    const g = r.grid;
    const base = fieldsDigest(r);
    // the grid's first cell (its south-west corner, in the margin): no district's face holds its centre, so no land
    // value and no district face's mean reads it
    const margin = 0;
    const districts = new Set(ft.districts.districts.map((d) => d.id));
    const corner = { x: g.originX + 0.5 * g.cellCm, y: g.originY + 0.5 * g.cellCm };
    expect(ft.districts.faces.some((f) => f.owner !== null && districts.has(f.owner) && insideRings(f.rings, corner.x, corner.y))).toBe(false);
    expect(r.land[margin]).toBe(0);
    const landCell = r.land.indexOf(1);
    expect(landCell).toBeGreaterThanOrEqual(0);
    const names = ['prosperity', 'density', 'greenery'] as const;
    for (const name of names) {
      for (const i of [margin, landCell]) {
        const values = r[name].values.slice();
        values[i] = values[i] === 0.5 ? 0.25 : 0.5;
        const moved: FieldsPass1 = { ...r, [name]: { ...r[name], values } };
        expect(fieldsDigest(moved)).not.toEqual(base);
      }
    }
    expect(fieldsDigest({ ...r })).toEqual(base);
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
