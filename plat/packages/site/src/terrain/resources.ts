// S1 (10)'s resources in their basic form (M0-e-01; §4.2 S1 (10), COV-FTG-B09, item 111 (b); C-0048): SiteResources'
// rasters, 0 … 1 per cell, on the resource grid — `fbm.baseGridM` (32 m) cells over the height raster's extent, the
// fields' cell (§4.5) — each cell read at its centre through the TerrainSampler (C-0165 (4)). The fields read slope,
// fertile land and well yield; stone, ore, timber, fish and clay are the same raster family in their basic forms, read
// by nothing at M0 (S2's gates and S12a's sites are M1's).
//
// The rules: rock where the slope reaches ROCK_SLOPE; stone 1 on rock, else slope ÷ ROCK_SLOPE; timber 1 − stone on
// land that is not a dry bed; fertile land "from gentle, dry, non-rock ground" — 1 − slope ÷ fertileSlopeMax up to the
// table's threshold, 0 beyond it, on rock, on water and on a dry bed; well yield by ground class from the table (0 on
// water); fish 1 on land beside water (reach width is M1's); clay 1 on alluvial ground no steeper than the fertile
// threshold ("low damp river flats"); ore on a hilly or mountainous site only — relief (the class's amplitude over the
// mountainous one) × an fBm propensity (its positive part) from the `terrain.noise` stream, drawn after the
// heightfield's sampler whatever the class, so the class never moves a later draw.
//
// Ground classes (V11's well table's rows; S1 (10)): water first, then a dry riverbed's gravels, then alluvial ground —
// land beside water (its eight neighbours) — then low ground within LOW_BAND_M of the lowest land (the water table at
// M0), else ordinary. The water mask is the caller's: the river's water is S1 (3)–(8)'s (M0-e-02, M0-e-03); without
// one every cell is land.
import { fbm, noiseStream, ok, err, ratio, type KernelResult, type Point, type Stream } from '@plat/kernel';
import type { Terrain, TerrainSampler } from '@plat/model';
import { centreX, centreY, coveringGrid, rasterGrid, type CellGrid } from './grid.js';
import { BASE_WAVELENGTH_M, LOW_BAND_M, ROCK_SLOPE, type TerrainParams } from './params.js';
import { GROUND_CLASSES, type GroundClass, type ReliefClass, type SiteResources } from './types.js';

/** A water mask cell: land. */
export const LAND_CELL = 0;
/** A water mask cell: water. */
export const WATER_CELL = 1;
/** A water mask cell: a dry riverbed (its gravels). */
export const DRY_BED_CELL = 2;

/** The ground classes' codes in `groundClasses`' raster (GROUND_CLASSES' order); water is WATER_GROUND. */
export const GROUND_CODES: Readonly<Record<GroundClass, number>> = Object.freeze({ alluvial: 0, gravel: 1, low: 2, ordinary: 3 });
/** A water cell's code in `groundClasses`' raster. */
export const WATER_GROUND = 255;

/** What S1 (10) reads beside the terrain. */
export interface ResourceInput {
  /** S0's relief class: ore is a hilly or mountainous site's. */
  relief: ReliefClass;
  /** Per resource cell, row-major: LAND_CELL, WATER_CELL or DRY_BED_CELL; absent, every cell is land. */
  water?: Uint8Array;
}

/** The resource grid over `terrain`: `params.baseGridCm` cells over the height raster's extent (C-0165 (4)). */
export function resourceGrid(terrain: Terrain, params: TerrainParams): CellGrid {
  return coveringGrid(rasterGrid(terrain), params.baseGridCm);
}

/** 2²⁰: a positive share or slope v is inverted as 2²⁰ ÷ (v · 2²⁰) — exact scaling, so it is 1 ÷ v to the bit. */
const SCALE = 1048576;

/** 1 ÷ v for a table share or slope v ≥ 2⁻²⁰, through ratio's count floor (see SCALE). */
function inverseShare(v: number): number | null {
  const r = ratio(SCALE, v * SCALE, 'count');
  return r.ok ? r.value : null;
}

/** Does cell c of grid g touch a water cell among its eight neighbours? */
function besideWater(water: Uint8Array, g: CellGrid, i: number, j: number): boolean {
  for (let dj = -1; dj <= 1; dj += 1) {
    const y = j + dj;
    if (y < 0 || y >= g.rows) continue;
    for (let di = -1; di <= 1; di += 1) {
      const x = i + di;
      if ((di === 0 && dj === 0) || x < 0 || x >= g.cols) continue;
      if (water[y * g.cols + x] === WATER_CELL) return true;
    }
  }
  return false;
}

/**
 * The ground class of every resource cell (GROUND_CODES; WATER_GROUND on water), by the header's precedence: water, a
 * dry bed's gravels, alluvial ground beside water, low ground within LOW_BAND_M of the lowest land, ordinary.
 */
export function groundClasses(terrain: Terrain, sampler: TerrainSampler, params: TerrainParams, water?: Uint8Array): Uint8Array {
  const g = resourceGrid(terrain, params);
  const n = g.cols * g.rows;
  if (water !== undefined && water.length !== n) throw new RangeError(`groundClasses: the water mask holds ${String(water.length)} cells, the grid ${String(n)}`);
  const height = new Float64Array(n);
  let lowest = Infinity;
  for (let j = 0; j < g.rows; j += 1) {
    for (let i = 0; i < g.cols; i += 1) {
      const c = j * g.cols + i;
      height[c] = sampler.heightAt({ x: centreX(g, i), y: centreY(g, j) } as Point);
      if ((water === undefined || water[c] === LAND_CELL) && height[c] < lowest) lowest = height[c];
    }
  }
  const lowTop = lowest + LOW_BAND_M * 100;
  const out = new Uint8Array(n);
  for (let j = 0; j < g.rows; j += 1) {
    for (let i = 0; i < g.cols; i += 1) {
      const c = j * g.cols + i;
      const w = water === undefined ? LAND_CELL : water[c];
      if (w === WATER_CELL) out[c] = WATER_GROUND;
      else if (w === DRY_BED_CELL) out[c] = GROUND_CODES.gravel;
      else if (water !== undefined && besideWater(water, g, i, j)) out[c] = GROUND_CODES.alluvial;
      else if (height[c] <= lowTop) out[c] = GROUND_CODES.low;
      else out[c] = GROUND_CODES.ordinary;
    }
  }
  return out;
}

/**
 * S1 (10): SiteResources over `terrain` (see the header), its ore propensity's sampler drawn from `stream`
 * (`terrain.noise`, continued after the heightfield's) — params.octaves octaves, drawn whatever the relief class.
 * Refused with E_OUT_OF_RANGE when the water mask does not match the grid (`water`), a mask cell is not 0, 1 or 2
 * (`water`), the fertile threshold is not positive (`fertileSlopeMax`) or the noise shape is out of range (`noise.*`).
 */
export function siteResources(
  terrain: Terrain,
  sampler: TerrainSampler,
  params: TerrainParams,
  input: ResourceInput,
  stream: Stream,
): KernelResult<SiteResources> {
  const g = resourceGrid(terrain, params);
  const n = g.cols * g.rows;
  const water = input.water;
  if (water !== undefined) {
    if (water.length !== n) return err('E_OUT_OF_RANGE', 'water');
    for (let c = 0; c < n; c += 1) if (water[c] > DRY_BED_CELL) return err('E_OUT_OF_RANGE', 'water');
  }
  const invFertile = params.fertileSlopeMax > 0 ? inverseShare(params.fertileSlopeMax) : null;
  if (invFertile === null) return err('E_OUT_OF_RANGE', 'fertileSlopeMax');
  const made = noiseStream(stream, params.shape, params.octaves);
  if (!made.ok) return err(made.code, made.detail);
  const oreNoise = made.value;
  const amp = params.amplitudeCm;
  const hills = input.relief === 'hilly' || input.relief === 'mountainous';
  const reliefShare = hills ? ratio(amp[input.relief], amp.mountainous, 'length') : null;
  if (reliefShare !== null && !reliefShare.ok) return err('E_OUT_OF_RANGE', 'relief');
  const relief = reliefShare === null ? 0 : reliefShare.value;
  const perCm = ratio(1, BASE_WAVELENGTH_M * 100, 'length');
  if (!perCm.ok) return err('E_OUT_OF_RANGE', 'grid');
  const f = perCm.value;

  const ground = groundClasses(terrain, sampler, params, water);
  const res: SiteResources = {
    cellCm: g.cellCm,
    ore: new Float32Array(n),
    stone: new Float32Array(n),
    timber: new Float32Array(n),
    fish: new Float32Array(n),
    clay: new Float32Array(n),
    fertile: new Float32Array(n),
    wellYield: new Float32Array(n),
    slope: new Float32Array(n),
  };
  const yieldOf = new Float64Array(GROUND_CLASSES.length);
  for (const gc of GROUND_CLASSES) yieldOf[GROUND_CODES[gc]] = params.wellYield[gc];
  for (let j = 0; j < g.rows; j += 1) {
    const y = centreY(g, j);
    for (let i = 0; i < g.cols; i += 1) {
      const x = centreX(g, i);
      const c = j * g.cols + i;
      const slope = sampler.slopeAt({ x, y } as Point);
      res.slope[c] = slope;
      const gc = ground[c];
      if (gc === WATER_GROUND) continue;
      const rock = slope >= ROCK_SLOPE;
      const stone = rock ? 1 : slope / ROCK_SLOPE;
      res.stone[c] = stone;
      res.wellYield[c] = yieldOf[gc];
      const bed = gc === GROUND_CODES.gravel;
      if (!bed) res.timber[c] = 1 - stone;
      const gentle = slope <= params.fertileSlopeMax;
      if (!bed && !rock && gentle) res.fertile[c] = 1 - slope * invFertile;
      if (water !== undefined && besideWater(water, g, i, j)) res.fish[c] = 1;
      if (gc === GROUND_CODES.alluvial && gentle) res.clay[c] = 1;
      if (hills) {
        const p = fbm(x * f, y * f, params.octaves, oreNoise);
        if (p > 0) res.ore[c] = relief * p;
      }
    }
  }
  return ok(res);
}
