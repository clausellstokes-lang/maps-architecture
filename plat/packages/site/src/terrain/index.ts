// @plat/site's terrain module (M0-e-01; §4.2 S1 (1), (10), §2.3, §4.12): S1's heightfield with its range check, the
// TerrainSampler, the base TerrainStrategy and SiteResources in their basic form. Created empty by the scaffold
// (M0-s-01, C-0013); this index and its folder are M0-e-01's. The noise is the kernel's (`@plat/kernel`'s noise module,
// C-0065): @plat/site imports no vendored library.
export * from './types.js';
export { BASE_WAVELENGTH_M, LOW_BAND_M, ROCK_SLOPE, terrainParams, type TerrainParams } from './params.js';
export { heightWriter, INT32_HEIGHT_MAX, type HeightWriter } from './range.js';
export { arenaReach, centreX, centreY, coveringGrid, heightGrid, hydroGridOver, type CellGrid } from './grid.js';
export { preparePrimitive, primitivesOffsetCm, sitePrimitives, type PreparedPrimitive } from './primitives.js';
export { buildTerrain, flatTerrain, GROUND_KEY, type TerrainSpec } from './heightfield.js';
export { terrainSampler } from './sampler.js';
export {
  DRY_BED_CELL,
  GROUND_CODES,
  groundClasses,
  LAND_CELL,
  resourceGrid,
  siteResources,
  WATER_CELL,
  WATER_GROUND,
  type ResourceInput,
} from './resources.js';
export { baseTerrain, siteFrame, TERRAIN_ID, TOWN_ROOT } from './strategy.js';
