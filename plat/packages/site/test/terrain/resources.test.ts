// M0-e-01: S1 (10)'s resources in their basic form (§4.2 S1 (10), item 111 (b); C-0048). The item's test: "resources:
// fertile = 0 on rock and on slopes above the table's threshold; well yield by ground class reads the table" — plus the
// ground classes' precedence, the low band's base (the lowest land, never water or a dry bed below it: C-0165 (4)),
// the water mask's cells, the slope raster (the sampler's), the basic stone, timber, fish, clay and ore rules, the fixed
// draw count, determinism and the refusals.
import { describe, expect, it } from 'vitest';
import { cdeg, streamFromKey } from '@plat/kernel';
import type { Terrain } from '@plat/model';
import {
  centreX,
  centreY,
  DRY_BED_CELL,
  flatTerrain,
  GROUND_CLASSES,
  GROUND_KEY,
  GROUND_CODES,
  groundClasses,
  heightWriter,
  LOW_BAND_M,
  resourceGrid,
  ROCK_SLOPE,
  siteResources,
  terrainSampler,
  WATER_CELL,
  WATER_GROUND,
  type ResourceInput,
  type SiteResources,
  type TerrainParams,
} from '../../src/terrain/index.js';
import { frame, paramsOf, pt, terrainOf } from './support.js';

const TOWN = paramsOf('TOWN');

/** A TOWN-sized site with a hill, a cliff and a valley: steep, gentle and low ground side by side. */
const SITE: Terrain = terrainOf(frame(1.2), {
  relief: 'rolling',
  primitives: [
    { kind: 'hill', at: pt(-30000, 20000), radiusM: 350, heightM: 120 },
    { kind: 'cliff', at: pt(25000, -10000), bearingCdeg: cdeg(30), lengthM: 400, heightM: 40, widthM: 12 },
    { kind: 'valley', at: pt(0, -40000), bearingCdeg: cdeg(80), widthM: 300, depthM: 25 },
  ],
}, TOWN, [10, 20, 30, 40]).terrain;
const SAMPLER = terrainSampler(SITE, TOWN.slopeQueryCm);

function resources(input: ResourceInput, params: TerrainParams = TOWN, key = [5, 5, 5, 5]): SiteResources {
  const r = siteResources(SITE, SAMPLER, params, input, streamFromKey(key));
  if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
  return r.value;
}

/** A water mask: a band of water two cells wide across the grid's middle row, a dry bed of three cells below it. */
function maskOf(params: TerrainParams = TOWN): Uint8Array {
  const g = resourceGrid(SITE, params);
  const m = new Uint8Array(g.cols * g.rows);
  const r = g.rows >> 1;
  for (let i = 0; i < g.cols; i += 1) {
    m[r * g.cols + i] = WATER_CELL;
    m[(r + 1) * g.cols + i] = WATER_CELL;
  }
  for (let i = 3; i < 6; i += 1) m[(r - 5) * g.cols + i] = DRY_BED_CELL;
  return m;
}

describe('fertile land (§4.2 S1 (10): "from gentle, dry, non-rock ground")', { timeout: 60_000 }, () => {
  it('is 0 on rock and on every slope above the table\'s threshold; 1 − slope ÷ threshold on gentle land', () => {
    const r = resources({ relief: 'rolling' });
    let rock = 0;
    let steep = 0;
    let gentle = 0;
    for (let c = 0; c < r.fertile.length; c += 1) {
      const s = r.slope[c];
      if (s >= ROCK_SLOPE) {
        rock += 1;
        expect(r.fertile[c]).toBe(0);
      } else if (s > TOWN.fertileSlopeMax) {
        steep += 1;
        expect(r.fertile[c]).toBe(0);
      } else {
        gentle += 1;
        expect(r.fertile[c]).toBeCloseTo(1 - s / TOWN.fertileSlopeMax, 6);
      }
    }
    expect(rock).toBeGreaterThan(0);
    expect(steep).toBeGreaterThan(0);
    expect(gentle).toBeGreaterThan(0);
  });

  it('reads the threshold from the table\'s cell: a lower threshold leaves fertile only the gentler cells', () => {
    expect(TOWN.fertileSlopeMax).toBe(0.15);
    const strict = resources({ relief: 'rolling' }, { ...TOWN, fertileSlopeMax: 0.03 });
    const loose = resources({ relief: 'rolling' });
    let moved = 0;
    for (let c = 0; c < strict.fertile.length; c += 1) {
      if (strict.slope[c] > 0.03) expect(strict.fertile[c]).toBe(0);
      if (strict.fertile[c] === 0 && loose.fertile[c] > 0) moved += 1;
    }
    expect(moved).toBeGreaterThan(0);
  });

  it('is 0 on rock even under a threshold above the rock slope (rock is never fertile, whatever the table says)', () => {
    const loose = resources({ relief: 'rolling' }, { ...TOWN, fertileSlopeMax: 0.95 });
    let rock = 0;
    for (let c = 0; c < loose.fertile.length; c += 1) {
      if (loose.slope[c] >= ROCK_SLOPE * 1.000001) {
        rock += 1;
        expect(loose.fertile[c]).toBe(0);
      } else if (loose.slope[c] < ROCK_SLOPE * 0.999999) {
        expect(loose.fertile[c]).toBeGreaterThan(0);
      }
    }
    expect(rock).toBeGreaterThan(0);
  });

  it('is 0 on water and on a dry bed', () => {
    const m = maskOf();
    const r = resources({ relief: 'rolling', water: m });
    for (let c = 0; c < m.length; c += 1) if (m[c] !== 0) expect(r.fertile[c]).toBe(0);
  });
});

describe('well yield by ground class (item 111 (b); V11\'s water table)', { timeout: 60_000 }, () => {
  it('reads the table\'s row for each cell\'s class — alluvial, gravel, low and ordinary all present — and 0 on water', () => {
    const m = maskOf();
    const r = resources({ relief: 'rolling', water: m });
    const ground = groundClasses(SITE, SAMPLER, TOWN, m);
    const seen = new Set<number>();
    for (let c = 0; c < m.length; c += 1) {
      if (ground[c] === WATER_GROUND) {
        expect(r.wellYield[c]).toBe(0);
        continue;
      }
      seen.add(ground[c]);
      expect(r.wellYield[c]).toBe(Math.fround(TOWN.wellYield[GROUND_CLASSES[ground[c]]]));
    }
    expect([...seen].sort()).toEqual([0, 1, 2, 3]);
    expect(TOWN.wellYield).toEqual({ alluvial: 1, gravel: 0.8, low: 0.6, ordinary: 0.2 });
  });

  it('follows the table\'s values, not constants: other yields give other rasters, class for class', () => {
    const m = maskOf();
    const other = { ...TOWN, wellYield: { alluvial: 0.11, gravel: 0.22, low: 0.33, ordinary: 0.44 } };
    const r = resources({ relief: 'rolling', water: m }, other);
    const ground = groundClasses(SITE, SAMPLER, other, m);
    for (let c = 0; c < m.length; c += 1) {
      if (ground[c] !== WATER_GROUND) expect(r.wellYield[c]).toBe(Math.fround(other.wellYield[GROUND_CLASSES[ground[c]]]));
    }
  });
});

describe('the ground classes (S1 (10))', { timeout: 60_000 }, () => {
  it('take water, then a dry bed\'s gravels, then alluvial ground beside water, then low ground, then ordinary', () => {
    const m = maskOf();
    const g = resourceGrid(SITE, TOWN);
    const ground = groundClasses(SITE, SAMPLER, TOWN, m);
    let lowest = Infinity;
    const h = new Float64Array(m.length);
    for (let j = 0; j < g.rows; j += 1) {
      for (let i = 0; i < g.cols; i += 1) {
        const c = j * g.cols + i;
        h[c] = SAMPLER.heightAt(pt(centreX(g, i), centreY(g, j)));
        if (m[c] === 0 && h[c] < lowest) lowest = h[c];
      }
    }
    for (let j = 0; j < g.rows; j += 1) {
      for (let i = 0; i < g.cols; i += 1) {
        const c = j * g.cols + i;
        let beside = false;
        for (let dj = -1; dj <= 1; dj += 1) {
          for (let di = -1; di <= 1; di += 1) {
            const x = i + di;
            const y = j + dj;
            if ((di || dj) && x >= 0 && y >= 0 && x < g.cols && y < g.rows && m[y * g.cols + x] === WATER_CELL) beside = true;
          }
        }
        const want =
          m[c] === WATER_CELL ? WATER_GROUND
            : m[c] === DRY_BED_CELL ? GROUND_CODES.gravel
              : beside ? GROUND_CODES.alluvial
                : h[c] <= lowest + LOW_BAND_M * 100 ? GROUND_CODES.low
                  : GROUND_CODES.ordinary;
        expect(ground[c]).toBe(want);
      }
    }
  });

  it('beside water the ground is alluvial even where it is also low (flat ground: every land cell lies in the low band)', () => {
    const r = flatTerrain({ id: 'terrain:flat', key: GROUND_KEY, frame: frame(1.2), params: TOWN, epoch: 0 }, 300);
    if (!r.ok) throw new Error(r.detail);
    const flat = r.value;
    const sampler = terrainSampler(flat, TOWN.slopeQueryCm);
    const g = resourceGrid(flat, TOWN);
    const m = new Uint8Array(g.cols * g.rows);
    const row = g.rows >> 1;
    for (let i = 0; i < g.cols; i += 1) m[row * g.cols + i] = WATER_CELL;
    const ground = groundClasses(flat, sampler, TOWN, m);
    for (let i = 0; i < g.cols; i += 1) {
      expect(ground[(row - 1) * g.cols + i]).toBe(GROUND_CODES.alluvial);
      expect(ground[(row + 1) * g.cols + i]).toBe(GROUND_CODES.alluvial);
      expect(ground[(row - 3) * g.cols + i]).toBe(GROUND_CODES.low);
    }
  });

  it('measure low ground from the lowest LAND, never from water or a dry bed lying below it (C-0165 (4))', () => {
    // A flat TOWN raster at 300 cm; one resource row lowered to 0 cm and masked as water (a river bed below its banks, as
    // S1 (3)'s carve leaves it, M0-e-02); another lowered to 50 cm and masked as a dry bed; one raised to 600 cm. The
    // lowest land is 300 cm, so the low band ends at 300 cm + LOW_BAND_M: the 300 cm land away from the water is low
    // although it stands more than LOW_BAND_M above the water and the dry bed (a band measured from either would end at
    // 200 or 250 cm and leave it ordinary); the 600 cm ridge is ordinary; the land beside the water is alluvial.
    const made = flatTerrain({ id: 'terrain:bed', key: GROUND_KEY, frame: frame(1.2), params: TOWN, epoch: 0 }, 300);
    if (!made.ok) throw new Error(made.detail);
    const t = made.value;
    const g = resourceGrid(t, TOWN);
    const bed = g.rows >> 1;
    const ridge = bed - 6;
    const dry = bed + 8;
    const heightOf = (row: number): number => (row === bed ? 0 : row === dry ? 50 : row === ridge ? 600 : 300);
    // The raster rewritten through the range check (the one door): every height cell whose centre lies in the bed's,
    // the dry bed's or the ridge's resource row; the sampler at a resource centre reads only height cells within one
    // height cell of it, all inside its own 32 m row.
    const hg = { cellCm: t.cellCm, cols: t.cols, rows: t.rows, originX: t.originX, originY: t.originY };
    const w = heightWriter(t.heightCm, TOWN.reliefLimitCm);
    for (let j = 0; j < t.rows; j += 1) {
      const row = Math.floor((centreY(hg, j) - g.originY) / g.cellCm);
      if (row !== bed && row !== dry && row !== ridge) continue;
      for (let i = 0; i < t.cols; i += 1) w.write(j * t.cols + i, heightOf(row));
    }
    expect(w.clamped).toBe(0);
    const sampler = terrainSampler(t, TOWN.slopeQueryCm);
    const m = new Uint8Array(g.cols * g.rows);
    for (let i = 0; i < g.cols; i += 1) {
      m[bed * g.cols + i] = WATER_CELL;
      m[dry * g.cols + i] = DRY_BED_CELL;
    }
    const ground = groundClasses(t, sampler, TOWN, m);
    const r = siteResources(t, sampler, TOWN, { relief: 'plain', water: m }, streamFromKey([3, 3, 3, 3]));
    if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
    expect(300 - 50).toBeGreaterThan(LOW_BAND_M * 100);
    expect(600 - 300).toBeGreaterThan(LOW_BAND_M * 100);
    let low = 0;
    for (let j = 0; j < g.rows; j += 1) {
      for (let i = 0; i < g.cols; i += 1) {
        const c = j * g.cols + i;
        const d = j - bed;
        expect(sampler.heightAt(pt(centreX(g, i), centreY(g, j)))).toBe(heightOf(j));
        const want =
          j === bed ? WATER_GROUND
            : j === dry ? GROUND_CODES.gravel
              : d === 1 || d === -1 ? GROUND_CODES.alluvial
                : j === ridge ? GROUND_CODES.ordinary
                  : GROUND_CODES.low;
        expect(ground[c]).toBe(want);
        if (want === GROUND_CODES.low) {
          low += 1;
          expect(r.value.wellYield[c]).toBe(Math.fround(TOWN.wellYield.low));
        }
      }
    }
    expect(low).toBe(g.cols * (g.rows - 5));
  });

  it('with no water mask every cell is land: no water, gravel or alluvial ground; low ground is the lowest land\'s band', () => {
    const ground = groundClasses(SITE, SAMPLER, TOWN);
    expect(ground.includes(WATER_GROUND)).toBe(false);
    expect(ground.includes(GROUND_CODES.gravel)).toBe(false);
    expect(ground.includes(GROUND_CODES.alluvial)).toBe(false);
    expect(ground.includes(GROUND_CODES.low)).toBe(true);
    expect(ground.includes(GROUND_CODES.ordinary)).toBe(true);
  });
});

describe('the raster family in its basic form', { timeout: 60_000 }, () => {
  it('sits on the 32 m resource grid over the height raster\'s extent; slope is the sampler\'s at each centre', () => {
    const g = resourceGrid(SITE, TOWN);
    expect(g.cellCm).toBe(3200);
    const r = resources({ relief: 'rolling' });
    expect(r.cellCm).toBe(3200);
    for (const raster of [r.ore, r.stone, r.timber, r.fish, r.clay, r.fertile, r.wellYield, r.slope]) {
      expect(raster).toBeInstanceOf(Float32Array);
      expect(raster.length).toBe(g.cols * g.rows);
    }
    for (let j = 0; j < g.rows; j += 3) {
      for (let i = 0; i < g.cols; i += 3) expect(r.slope[j * g.cols + i]).toBe(Math.fround(SAMPLER.slopeAt(pt(centreX(g, i), centreY(g, j)))));
    }
  });

  it('every value lies in 0 … 1; stone is 1 on rock and slope ÷ ROCK_SLOPE below it; timber 1 − stone on land', () => {
    const m = maskOf();
    const r = resources({ relief: 'mountainous', water: m });
    for (const raster of [r.ore, r.stone, r.timber, r.fish, r.clay, r.fertile, r.wellYield]) {
      for (const v of raster) expect(v >= 0 && v <= 1).toBe(true);
    }
    for (let c = 0; c < m.length; c += 1) {
      if (m[c] === WATER_CELL) {
        expect([r.stone[c], r.timber[c], r.fish[c], r.clay[c], r.ore[c]]).toEqual([0, 0, 0, 0, 0]);
        continue;
      }
      const s = r.slope[c];
      // (slope is stored as a Float32, the rules read the sampler's double: equal to float precision)
      const stone = s >= ROCK_SLOPE ? 1 : s / ROCK_SLOPE;
      expect(r.stone[c]).toBeCloseTo(stone, 6);
      expect(r.timber[c]).toBeCloseTo(m[c] === DRY_BED_CELL ? 0 : 1 - stone, 6);
      if (s >= ROCK_SLOPE * 1.000001) expect(r.stone[c]).toBe(1);
    }
  });

  it('fish beside water, clay on gentle alluvial ground', () => {
    const m = maskOf();
    const r = resources({ relief: 'rolling', water: m });
    const ground = groundClasses(SITE, SAMPLER, TOWN, m);
    let fish = 0;
    for (let c = 0; c < m.length; c += 1) {
      if (ground[c] === GROUND_CODES.alluvial) {
        expect(r.fish[c]).toBe(1);
        fish += 1;
        expect(r.clay[c]).toBe(r.slope[c] <= TOWN.fertileSlopeMax ? 1 : 0);
      } else {
        expect(r.clay[c]).toBe(0);
      }
    }
    expect(fish).toBeGreaterThan(0);
  });

  it('ore only on a hilly or mountainous site, at most the class\'s relief share; the draws are the same whatever the class', () => {
    for (const relief of ['plain', 'rolling'] as const) expect(resources({ relief }).ore.every((v) => v === 0)).toBe(true);
    const hilly = resources({ relief: 'hilly' });
    const mountainous = resources({ relief: 'mountainous' });
    const share = TOWN.amplitudeCm.hilly / TOWN.amplitudeCm.mountainous;
    expect(hilly.ore.some((v) => v > 0)).toBe(true);
    expect(hilly.ore.every((v) => v <= Math.fround(share))).toBe(true);
    expect(mountainous.ore.some((v) => v > 0.2)).toBe(true);
    // One propensity (the same stream), scaled by the class's share: zero together, proportional where positive.
    for (let c = 0; c < hilly.ore.length; c += 1) {
      expect(hilly.ore[c] > 0).toBe(mountainous.ore[c] > 0);
      expect(hilly.ore[c]).toBeCloseTo(share * mountainous.ore[c], 6);
    }
    // The same stream after a plain site's resources as after a mountainous one's: the class never moves a later draw.
    const a = streamFromKey([8, 8, 8, 8]);
    const b = streamFromKey([8, 8, 8, 8]);
    siteResources(SITE, SAMPLER, TOWN, { relief: 'plain' }, a);
    siteResources(SITE, SAMPLER, TOWN, { relief: 'mountainous' }, b);
    expect(a.u32()).toBe(b.u32());
  });

  it('is a function of its inputs: two runs byte-identical; another ore stream another ore raster', () => {
    const m = maskOf();
    const x = resources({ relief: 'hilly', water: m });
    const y = resources({ relief: 'hilly', water: m });
    for (const k of ['ore', 'stone', 'timber', 'fish', 'clay', 'fertile', 'wellYield', 'slope'] as const) {
      expect(Buffer.from(x[k].buffer).equals(Buffer.from(y[k].buffer))).toBe(true);
    }
    const z = resources({ relief: 'hilly', water: m }, TOWN, [6, 6, 6, 6]);
    expect(Buffer.from(x.ore.buffer).equals(Buffer.from(z.ore.buffer))).toBe(false);
    expect(Buffer.from(x.fertile.buffer).equals(Buffer.from(z.fertile.buffer))).toBe(true);
  });

  it('refuses a mask of the wrong size or with a cell other than 0, 1 or 2, and a threshold that is not positive', () => {
    const s = () => streamFromKey([1, 1, 1, 1]);
    expect(siteResources(SITE, SAMPLER, TOWN, { relief: 'plain', water: new Uint8Array(3) }, s())).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'water' });
    const bad = maskOf();
    bad[7] = 3;
    expect(siteResources(SITE, SAMPLER, TOWN, { relief: 'plain', water: bad }, s())).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'water' });
    expect(siteResources(SITE, SAMPLER, { ...TOWN, fertileSlopeMax: 0 }, { relief: 'plain' }, s())).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'fertileSlopeMax' });
    expect(() => groundClasses(SITE, SAMPLER, TOWN, new Uint8Array(2))).toThrow(RangeError);
  });
});
