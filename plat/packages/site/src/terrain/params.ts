// The terrain's parameters (M0-e-01; §2.3, §4.2 S1 (1), (10)): terrain.json's cells for a rung, read once through the
// TableView, and the three values the table does not hold, picked here (C-0165) until a table round adds their cells
// (M0-s-02's file; no later item writes it).
import type { NoiseShape } from '@plat/kernel';
import type { BaseRung, TableView } from '@plat/tables';
import { GROUND_CLASSES, RELIEF_CLASSES, type GroundClass, type ReliefClass } from './types.js';

/**
 * The fBm's base wavelength (§4.2 S1 (1): "a low base frequency"), in metres: the first octave's wavelength, the
 * fifth's 250 m at lacunarity 2, the fine octave's 125 m. A physical length, so the relief's character does not scale
 * with the frame (and survives M4's frame growth unchanged). C-0165 (1).
 */
export const BASE_WAVELENGTH_M = 4000;

/** Rise over run at and above which ground is rock (≈ 35°, the angle of repose): S1 (10)'s rock class. C-0165 (1). */
export const ROCK_SLOPE = 0.7;

/**
 * The band above the site's lowest land within which ground is `low` — "low ground by the water table" (S1 (10)),
 * the water table standing at the lowest land until M1's water table is read. C-0165 (1).
 */
export const LOW_BAND_M = 2;

/** One rung's terrain cells (terrain.json) in the units the code reads. */
export interface TerrainParams {
  rung: BaseRung;
  /** The height raster's cell (§2.3: TOWN 5 m, CITY 8 m, METROPOLIS 10 m), cm. */
  cellCm: number;
  /** The hydrology grid's cell (§2.3: 16 / 25 / 32 m), cm — the grid S1 (3) fills (M0-e-02). */
  hydroCellCm: number;
  /** §2.3's declared range: every height write is checked against ± this (1 000 000 cm). */
  reliefLimitCm: number;
  /** The TerrainSampler's slope step (§2.3: 2.5 m), cm. */
  slopeQueryCm: number;
  /** The fBm's octaves on the coarse grid (§4.2 S1 (1): 5). */
  octaves: number;
  /** The coarse grid the fBm is evaluated on (§4.2 S1 (1): 32 m), cm; also the resource grid's cell (C-0165). */
  baseGridCm: number;
  /** The fine octaves added inside the built extent (§4.2 S1 (1): one). */
  fineOctaves: number;
  /** Lacunarity and gain (§3.1: table values; C-0158's picks). */
  shape: NoiseShape;
  /** The relief-character amplitude by S0's relief class (§4.2 S1 (1)), cm. */
  amplitudeCm: Readonly<Record<ReliefClass, number>>;
  /** Fertile land only on slopes up to this (rise over run; S1 (10)). */
  fertileSlopeMax: number;
  /** Well yield by ground class (S1 (10), item 111 (b); V11's water table). */
  wellYield: Readonly<Record<GroundClass, number>>;
}

/** terrain.json's cells for `rung`, read through the view (a missing or mistyped cell is the loader's refusal). */
export function terrainParams(tables: TableView, rung: BaseRung): TerrainParams {
  const t = tables.table('terrain');
  const amplitudeCm = {} as Record<ReliefClass, number>;
  for (const c of RELIEF_CLASSES) amplitudeCm[c] = t.num('relief', `${c}.amplitudeM`) * 100;
  const wellYield = {} as Record<GroundClass, number>;
  for (const g of GROUND_CLASSES) wellYield[g] = t.num('resources', `wellYield.${g}`);
  return Object.freeze({
    rung,
    cellCm: t.num(rung, 'rasterCellM') * 100,
    hydroCellCm: t.num(rung, 'hydroCellM') * 100,
    reliefLimitCm: t.num('settings', 'reliefLimitCm'),
    slopeQueryCm: t.num('settings', 'slopeQueryM') * 100,
    octaves: t.num('fbm', 'octaves'),
    baseGridCm: t.num('fbm', 'baseGridM') * 100,
    fineOctaves: t.num('fbm', 'fineOctaves'),
    shape: Object.freeze({ lacunarity: t.num('fbm', 'lacunarity'), gain: t.num('fbm', 'gain') }),
    amplitudeCm: Object.freeze(amplitudeCm),
    fertileSlopeMax: t.num('resources', 'fertileSlopeMax'),
    wellYield: Object.freeze(wellYield),
  });
}
