// M0-e-01: the base TerrainStrategy — `terrain(bp, ctx, k): KernelResult<Terrain>` (§4.12) under a hand-built
// StageContext (C-0123's pattern) — and S1 (1)'s heightfield mechanism (§4.2 S1 (1)): the stream it draws (`terrain.noise`
// on the town root's key, §6.1), two runs byte-identical and another seed another terrain, the frame law, the record's
// fields, the relief class's amplitude, the fine octave inside the frame only, and the refusals.
import { describe, expect, it } from 'vitest';
import { CONCERNS, fbm, noiseStream, streamFromKey } from '@plat/kernel';
import type { Terrain } from '@plat/model';
import { BASE_WAVELENGTH_M, baseTerrain, buildTerrain, GROUND_KEY, heightGrid, siteFrame, TERRAIN_ID, TOWN_ROOT, type TerrainBlueprint } from '../../src/terrain/index.js';
import { rungProfile } from '@plat/tables';
import { extremes, frame, noiseFor, paramsOf, pt, siteContext, TABLES } from './support.js';

const BP: TerrainBlueprint = {
  size: {},
  site: { relief: 'hilly', primitives: [{ kind: 'hill', at: pt(0, 0), radiusM: 400, heightM: 60 }], baseElevationM: 212.5, wind: { bearingCdeg: 27000, strength: 0.4 } },
};

function run(seed: number, bp: TerrainBlueprint = BP, rung: 'TOWN' | 'CITY' | 'METROPOLIS' = 'TOWN', epoch = 0): { t: Terrain; ctx: ReturnType<typeof siteContext> } {
  const ctx = siteContext(seed, rung, epoch);
  const r = baseTerrain.terrain(bp, ctx, undefined);
  if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
  return { t: r.value, ctx };
}

function bytes(t: Terrain): Buffer {
  return Buffer.from(t.heightCm.buffer, t.heightCm.byteOffset, t.heightCm.byteLength);
}

describe('baseTerrain.terrain(bp, ctx, k) (§4.12)', { timeout: 60_000 }, () => {
  it('draws one stream — terrain.noise on the town root (TOWN_ROOT) — through the context, and builds on it', () => {
    const { t, ctx } = run(77);
    expect(ctx.requests).toEqual([{ concern: CONCERNS['terrain.noise'], entity: TOWN_ROOT }]);
    // §6.1's other S1 terrain concern is registered and unread at M0 (C-0167 (1)): the primitives are the request's and
    // nothing about them is drawn; its first reader is M1's.
    expect(ctx.requests.map((q) => q.concern)).not.toContain(CONCERNS['terrain.controls']);
    expect(TOWN_ROOT).toBe(0);
    const f = siteFrame({}, rungProfile('TOWN'), TABLES);
    if (!f.ok) throw new Error(f.detail);
    const direct = buildTerrain({ id: TERRAIN_ID, key: GROUND_KEY, frame: f.value, params: paramsOf('TOWN'), epoch: 0 }, BP.site, noiseFor(77));
    expect(direct.ok && bytes(direct.value).equals(bytes(t))).toBe(true);
  });

  it('two runs of one blueprint and seed are byte-identical; another seed gives another terrain', () => {
    const a = run(1).t;
    const b = run(1).t;
    const c = run(2).t;
    expect(bytes(a).equals(bytes(b))).toBe(true);
    expect(a).toEqual(b);
    let same = 0;
    for (let i = 0; i < a.heightCm.length; i += 1) if (a.heightCm[i] === c.heightCm[i]) same += 1;
    expect(same).toBeLessThan(a.heightCm.length / 10);
  }, 60_000);

  it('writes the record: the town\'s frame by the frame law, the rung\'s raster, the datum, sea level, wind, features, lifecycle', () => {
    const { t } = run(5, BP, 'TOWN', 3);
    const g = heightGrid(frame(4), 500);
    expect([t.cellCm, t.cols, t.rows, t.originX, t.originY]).toEqual([500, g.cols, g.rows, g.originX, g.originY]);
    expect([t.cols, t.rows]).toEqual([640, 640]);
    expect(t.id).toBe(TERRAIN_ID);
    expect(t.key).toEqual({ layer: 'ground', part: 0 });
    expect(t.datumCm).toBe(21250);
    expect(t.seaLevelCm).toBe(-21250);
    expect(t.reliefLimitCm).toBe(1_000_000);
    expect(t.wind).toEqual({ bearingCdeg: 27000, strength: 0.4 });
    expect(t.features).toEqual([{ kind: 'hill', at: { x: 0, y: 0 } }]);
    expect(t.lifecycle.since).toEqual({ epoch: 3, seq: 0 });
    const calm = run(5, { size: {}, site: { relief: 'plain' } }).t;
    expect(calm.wind).toEqual({ bearingCdeg: 0, strength: 0 });
    expect(calm.datumCm).toBe(0);
    expect(Object.is(calm.seaLevelCm, 0)).toBe(true);
  });

  it('a CITY at its target population: a 5 km frame, 1 000 × 1 000 cells of 8 m, the hydrology grid 320²', () => {
    const { t } = run(9, { size: {}, site: { relief: 'rolling' } }, 'CITY');
    expect([t.cellCm, t.cols, t.rows]).toEqual([800, 1000, 1000]);
    expect([t.hydro.cellCm, t.hydro.cols, t.hydro.rows]).toEqual([2500, 320, 320]);
  }, 120_000);

  it('refuses an unknown relief class, a base elevation that is not finite and an aspect outside [0.5, 2]', () => {
    const ctx = () => siteContext(1);
    expect(baseTerrain.terrain({ size: {}, site: { relief: 'alpine' as never } }, ctx(), undefined)).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'relief' });
    expect(baseTerrain.terrain({ size: {}, site: { relief: 'plain', baseElevationM: Number.NaN } }, ctx(), undefined)).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'datum' });
    expect(baseTerrain.terrain({ size: { aspect: 2.5 }, site: { relief: 'plain' } }, ctx(), undefined)).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'aspect' });
  });
});

describe('S1 (1)\'s heightfield mechanism (§4.2 S1 (1))', { timeout: 60_000 }, () => {
  const params = paramsOf('TOWN');
  const f = frame(1.5, 1.25);
  const build = (relief: 'plain' | 'rolling' | 'hilly' | 'mountainous', p = params, key = [4, 3, 2, 1]): Terrain => {
    const r = buildTerrain({ id: 'terrain:t', key: GROUND_KEY, frame: f, params: p, epoch: 0 }, { relief }, streamFromKey(key));
    if (!r.ok) throw new Error(r.detail);
    return r.value;
  };

  it('scales the fBm by the relief class\'s amplitude: one noise, the spread in the table\'s ratio', () => {
    const spread: number[] = [];
    for (const relief of ['plain', 'rolling', 'hilly', 'mountainous'] as const) {
      const { min, max } = extremes(build(relief).heightCm);
      spread.push(max - min);
      expect(max).toBeLessThanOrEqual(params.amplitudeCm[relief] * 1.05);
      expect(min).toBeGreaterThanOrEqual(-params.amplitudeCm[relief] * 0.05);
    }
    for (let k = 1; k < 4; k += 1) expect(spread[k]).toBeGreaterThan(spread[k - 1]);
    expect(spread[3] / spread[0]).toBeCloseTo(1500 / 20, 0);
  });

  it('adds the fine octave inside the frame (the built extent at S1) only: the margin is the coarse grid\'s bilinear refinement', () => {
    const fine = build('mountainous');
    const coarse = build('mountainous', { ...params, fineOctaves: 0 });
    const halfW = f.widthCm / 2;
    const halfH = f.heightCm / 2;
    let insideDiffer = 0;
    let inside = 0;
    for (let j = 0; j < fine.rows; j += 1) {
      const y = fine.originY + (j + 0.5) * fine.cellCm;
      for (let i = 0; i < fine.cols; i += 1) {
        const x = fine.originX + (i + 0.5) * fine.cellCm;
        const c = j * fine.cols + i;
        if (Math.abs(x) < halfW && Math.abs(y) < halfH) {
          inside += 1;
          if (fine.heightCm[c] !== coarse.heightCm[c]) insideDiffer += 1;
        } else {
          expect(fine.heightCm[c]).toBe(coarse.heightCm[c]);
        }
      }
    }
    expect(insideDiffer).toBeGreaterThan(inside * 0.8);
  });

  it('the margin is the bilinear refinement of fBm on the 32 m coarse grid from the raster\'s corner, at the base wavelength', () => {
    const t = build('mountainous', { ...params, fineOctaves: 0 });
    const ns = noiseStream(streamFromKey([4, 3, 2, 1]), params.shape, params.octaves + params.fineOctaves);
    if (!ns.ok) throw new Error(ns.detail);
    const perCm = 1 / (BASE_WAVELENGTH_M * 100);
    const G = params.baseGridCm;
    const node = (k: number, l: number): number => fbm((t.originX + k * G) * perCm, (t.originY + l * G) * perCm, params.octaves, ns.value);
    let checked = 0;
    for (let j = 0; j < t.rows; j += 7) {
      for (let i = 0; i < t.cols; i += 5) {
        const x = t.originX + (i + 0.5) * t.cellCm;
        const y = t.originY + (j + 0.5) * t.cellCm;
        const gx = (x - t.originX) / G;
        const gy = (y - t.originY) / G;
        const k = Math.floor(gx);
        const l = Math.floor(gy);
        const u = gx - k;
        const v = gy - l;
        const n = (1 - v) * ((1 - u) * node(k, l) + u * node(k + 1, l)) + v * ((1 - u) * node(k, l + 1) + u * node(k + 1, l + 1));
        const want = (params.amplitudeCm.mountainous / 2) * (n + 1);
        expect(Math.abs(t.heightCm[j * t.cols + i] - want)).toBeLessThanOrEqual(0.5 + 1e-6);
        checked += 1;
      }
    }
    expect(checked).toBeGreaterThan(1000);
  });

  it('fades the fine octave in over one coarse cell inside the frame\'s edge, so the raster has no seam there', () => {
    const fine = build('mountainous');
    const coarse = build('mountainous', { ...params, fineOctaves: 0 });
    const halfW = f.widthCm / 2;
    for (let j = 0; j < fine.rows; j += 1) {
      const y = fine.originY + (j + 0.5) * fine.cellCm;
      if (Math.abs(y) > f.heightCm / 2 - 3200) continue;
      for (let i = 0; i < fine.cols; i += 1) {
        const x = fine.originX + (i + 0.5) * fine.cellCm;
        const d = halfW - Math.abs(x);
        if (d > 0 && d < 3200) {
          // The fine octave's whole share is gain⁵ of the coarse sum's normaliser at most: here a fraction d ÷ 3 200 of it.
          const bound = (params.amplitudeCm.mountainous / 2) * (0.5 ** 5 / 1.9375) * (d / 3200) + 1;
          expect(Math.abs(fine.heightCm[j * fine.cols + i] - coarse.heightCm[j * fine.cols + i])).toBeLessThanOrEqual(bound);
        }
      }
    }
  });

  it('reads the table\'s octaves and shape: five coarse octaves and one fine, lacunarity 2, gain ½, the coarse grid 32 m', () => {
    expect([params.octaves, params.fineOctaves, params.shape, params.baseGridCm]).toEqual([5, 1, { lacunarity: 2, gain: 0.5 }, 3200]);
    const other = build('hilly', { ...params, shape: { lacunarity: 2.2, gain: 0.45 } });
    expect(bytes(other).equals(bytes(build('hilly')))).toBe(false);
    // The draws: (5 + 1) octaves × 257 uniforms, whatever the shape.
    const a = streamFromKey([4, 3, 2, 1]);
    buildTerrain({ id: 'terrain:t', key: GROUND_KEY, frame: f, params, epoch: 0 }, { relief: 'plain' }, a);
    const b = streamFromKey([4, 3, 2, 1]);
    for (let i = 0; i < 6 * 257; i += 1) b.float01();
    expect(a.u32()).toBe(b.u32());
  });
});
