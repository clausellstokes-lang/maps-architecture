// M0-e-01: the TerrainSampler (§2.3). The item's test: "the sampler: heightAt bilinear equals the raster at cell centres;
// slopeAt on a plane equals the plane's gradient" — plus the bilinear surface between centres, the edge clamp, the
// 2.5 m step read from the table, and flowAt over the hydrology grid (refused until S1 (3) writes it, M0-e-02).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import type { Terrain } from '@plat/model';
import { centreX, centreY, flatTerrain, GROUND_KEY, heightWriter, terrainSampler } from '../../src/terrain/index.js';
import { frame, paramsOf, pt, terrainOf } from './support.js';

const TOWN = paramsOf('TOWN');
const CITY = paramsOf('CITY');

/** A terrain whose raster is the plane a · i + b · j + c (cm) over its cells, written through the range check. */
function plane(a: number, b: number, c: number, areaKm2 = 1): Terrain {
  const r = flatTerrain({ id: 'terrain:plane', key: GROUND_KEY, frame: frame(areaKm2), params: CITY, epoch: 0 });
  if (!r.ok) throw new Error(r.detail);
  const t = r.value;
  const w = heightWriter(t.heightCm, t.reliefLimitCm);
  for (let j = 0; j < t.rows; j += 1) for (let i = 0; i < t.cols; i += 1) w.write(j * t.cols + i, a * i + b * j + c);
  expect(w.clamped).toBe(0);
  return t;
}

describe('heightAt (§2.3: bilinear on the height raster)', { timeout: 60_000 }, () => {
  it('equals the raster at every cell centre of a generated terrain', () => {
    const { terrain: t } = terrainOf(frame(0.4, 1.3), { relief: 'hilly', primitives: [{ kind: 'hill', at: pt(0, 0), radiusM: 200, heightM: 80 }] }, TOWN);
    const s = terrainSampler(t, TOWN.slopeQueryCm);
    const g = { cellCm: t.cellCm, cols: t.cols, rows: t.rows, originX: t.originX, originY: t.originY };
    for (let j = 0; j < t.rows; j += 1) {
      for (let i = 0; i < t.cols; i += 1) {
        const h = s.heightAt(pt(centreX(g, i), centreY(g, j)));
        if (h !== t.heightCm[j * t.cols + i]) expect([i, j, h]).toEqual([i, j, t.heightCm[j * t.cols + i]]);
      }
    }
  });

  it('is the bilinear blend between centres, rounded to the centimetre, and reads the edge beyond the outermost centres', () => {
    const t = plane(7, -3, 1000);
    const s = terrainSampler(t, CITY.slopeQueryCm);
    const g = { cellCm: t.cellCm, cols: t.cols, rows: t.rows, originX: t.originX, originY: t.originY };
    fc.assert(
      fc.property(fc.double({ min: 0, max: 1, noNaN: true }), fc.double({ min: 0, max: 1, noNaN: true }), fc.nat(t.cols - 2), fc.nat(t.rows - 2), (u, v, i, j) => {
        const x = centreX(g, i) + u * t.cellCm;
        const y = centreY(g, j) + v * t.cellCm;
        expect(s.heightAt(pt(x, y))).toBe(Math.round(7 * (i + u) - 3 * (j + v) + 1000));
      }),
    );
    // Beyond the edges: the outermost centre's value, extended.
    expect(s.heightAt(pt(t.originX - 1e6, t.originY - 1e6))).toBe(1000);
    expect(s.heightAt(pt(t.originX + t.cols * t.cellCm + 5e5, t.originY - 10))).toBe(7 * (t.cols - 1) + 1000);
    expect(Number.isInteger(s.heightAt(pt(12.3, -45.6)))).toBe(true);
  });
});

describe('slopeAt (§2.3: the 2.5 m refinement on demand)', { timeout: 60_000 }, () => {
  it('on a plane equals the plane\'s gradient |∇h| (rise over run) at any point a step inside the outermost centres', () => {
    fc.assert(
      fc.property(fc.integer({ min: -400, max: 400 }), fc.integer({ min: -400, max: 400 }), fc.double({ min: 0, max: 1, noNaN: true }), fc.double({ min: 0, max: 1, noNaN: true }), (a, b, u, v) => {
        const t = plane(a, b, 500_000, 0.1);
        const s = terrainSampler(t, CITY.slopeQueryCm);
        const lo = t.originX + t.cellCm; // a step (250 cm) and more inside the first centre
        const x = lo + u * (t.cols - 3) * t.cellCm;
        const y = t.originY + t.cellCm + v * (t.rows - 3) * t.cellCm;
        const gradient = Math.hypot(a / t.cellCm, b / t.cellCm);
        expect(s.slopeAt(pt(x, y))).toBeCloseTo(gradient, 12);
      }),
      { numRuns: 1000 },
    );
  });

  it('is 0 on flat ground and reads the step it is given (2.5 m from the table)', () => {
    expect(CITY.slopeQueryCm).toBe(250);
    const flat = plane(0, 0, 500);
    expect(terrainSampler(flat, 250).slopeAt(pt(123, -456))).toBe(0);
    // One raised cell: half-way to its east neighbour the surface falls 800 cm per 800 cm, which a 250 cm step reads;
    // an 800 cm step reaches past both centres and reads (0 − 400) ÷ 1 600, a quarter.
    const t = plane(0, 0, 0);
    const w = heightWriter(t.heightCm, t.reliefLimitCm);
    const mid = (t.rows >> 1) * t.cols + (t.cols >> 1);
    w.write(mid, 800);
    const c = pt(t.originX + ((t.cols >> 1) + 0.5) * t.cellCm, t.originY + ((t.rows >> 1) + 0.5) * t.cellCm);
    const near = terrainSampler(t, 250).slopeAt(pt(c.x + 400, c.y));
    const far = terrainSampler(t, 800).slopeAt(pt(c.x + 400, c.y));
    expect(near).toBeCloseTo(1, 12);
    expect(far).toBeCloseTo(0.25, 12);
  });

  it('refuses a raster that does not match its cols × rows and a step under one centimetre', () => {
    const t = plane(1, 1, 0);
    expect(() => terrainSampler({ ...t, rows: t.rows + 1 }, 250)).toThrow(RangeError);
    expect(() => terrainSampler(t, 0.25)).toThrow(RangeError);
  });
});

describe('flowAt (§2.3: the hydro cell containing p; wired by M0-e-02)', { timeout: 60_000 }, () => {
  it('refuses on a terrain whose flow arrays S1 (3) has not written', () => {
    const { terrain } = terrainOf(frame(0.5), { relief: 'plain' }, TOWN);
    expect(() => terrainSampler(terrain, 250).flowAt(pt(0, 0))).toThrow(/S1 \(3\)/);
  });

  it('reads the D8 direction and accumulation of the containing hydro cell once they are written, clamped to the grid', () => {
    const { terrain } = terrainOf(frame(0.5), { relief: 'plain' }, TOWN);
    const n = terrain.hydro.cols * terrain.hydro.rows;
    const flowDir = new Uint8Array(n);
    const flowAccum = new Uint32Array(n);
    for (let c = 0; c < n; c += 1) {
      flowDir[c] = c % 8;
      flowAccum[c] = c + 1;
    }
    const t: Terrain = { ...terrain, flowDir, flatRank: new Uint32Array(n), flowAccum };
    const s = terrainSampler(t, 250);
    const h = t.hydro;
    for (const [i, j] of [[0, 0], [3, 5], [h.cols - 1, h.rows - 1], [h.cols >> 1, 2]]) {
      const c = j * h.cols + i;
      const p = pt(h.originX + (i + 0.5) * h.cellCm, h.originY + (j + 0.5) * h.cellCm);
      expect(s.flowAt(p)).toEqual({ dir: c % 8, accum: c + 1 });
    }
    expect(s.flowAt(pt(h.originX - 1e7, h.originY - 1e7))).toEqual({ dir: 0, accum: 1 });
  });
});
