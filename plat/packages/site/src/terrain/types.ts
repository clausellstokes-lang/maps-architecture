// S1's terrain types (M0-e-01; §2.3, §4.2 S0's site request and S1 (1), (10), §4.12's TerrainStrategy): what the
// heightfield reads from the blueprint, the authored site primitives in their basic form, SiteResources and the strategy
// interface. Types only. The records themselves (Terrain, HydroGrid, TerrainSampler) are @plat/model's (M0-m-01).
import type { KernelResult, Stream } from '@plat/kernel';
import type { Cdeg, PointCm, StageContext, StageEnv, Terrain } from '@plat/model';
import type { RungProfile, TableView } from '@plat/tables';

/** S0's relief class (§4.2 S0; item 65): S1 (1) scales the fBm's amplitude by it. `auto` is resolved by S0 (M1). */
export type ReliefClass = 'plain' | 'rolling' | 'hilly' | 'mountainous';

/** The relief classes in the table's order (terrain.json's `relief` row). */
export const RELIEF_CLASSES: readonly ReliefClass[] = Object.freeze(['plain', 'rolling', 'hilly', 'mountainous']);

/**
 * A hill (§4.2 S1 (1)): a smooth mound of `heightM` at `at`, falling to nothing at `radiusM` — H · (1 − t²)², t the
 * distance over the radius. A hill-acropolis is a hill under the town's centre.
 */
export interface HillPrimitive {
  kind: 'hill';
  at: PointCm;
  radiusM: number;
  heightM: number;
}

/**
 * A valley (§4.2 S1 (1): "valley along the river bearing"): a trough `depthM` deep along the line through `at` at
 * `bearingCdeg`, crossing the whole arena, falling to nothing at half of `widthM` from its line — D · (1 − t²)², t the
 * distance from the line over the half-width.
 */
export interface ValleyPrimitive {
  kind: 'valley';
  at: PointCm;
  bearingCdeg: Cdeg;
  widthM: number;
  depthM: number;
}

/**
 * A terrace (§4.2 S1 (1)): a hill of `radiusM` and `heightM` cut into `steps` level treads — its profile H · (1 − t²)²
 * taken down to the tread below it, H · ⌊steps · (1 − t²)²⌋ ÷ steps.
 */
export interface TerracePrimitive {
  kind: 'terrace';
  at: PointCm;
  radiusM: number;
  heightM: number;
  steps: number;
}

/**
 * A cliff (§4.2 S1 (1)): a scarp of `heightM` along the line through `at` at `bearingCdeg`, `lengthM` long — the ground
 * to the right of the bearing raised, rising across `widthM` centred on the line (a smoothstep), its two ends tapered
 * over `widthM`.
 */
export interface CliffPrimitive {
  kind: 'cliff';
  at: PointCm;
  bearingCdeg: Cdeg;
  lengthM: number;
  heightM: number;
  widthM: number;
}

/** The authored site primitives M0 builds in their basic form (§4.2 S1 (1); spur, ravine and hollow are M1's, C-0165). */
export type SitePrimitive = HillPrimitive | ValleyPrimitive | TerracePrimitive | CliffPrimitive;

/** A primitive kind. */
export type SitePrimitiveKind = SitePrimitive['kind'];

/** The part of §4.2 S0's site request S1 (1) reads (C-0165). */
export interface SiteRequest {
  /** S0's relief class (resolved: S0's `auto` pick is M1's). */
  relief: ReliefClass;
  /** The authored primitives, applied in order (their offsets add). */
  primitives?: readonly SitePrimitive[];
  /** The site's base elevation above mean sea level — `datumCm` on a site with no coast (§4.2 S1 (1)); 0 when absent. */
  baseElevationM?: number;
  /** The prevailing wind (`Terrain.wind`); calm (strength 0) when absent (C-0165). */
  wind?: { bearingCdeg: number; strength: number };
}

/**
 * The part of §4.2 S0's Blueprint the terrain stage reads (C-0165): the size within the rung — population or area, and
 * the aspect (§3.2 (9)) — and the site request. The full Blueprint (S0, M1) carries these fields and satisfies it.
 */
export interface TerrainBlueprint {
  size: { population?: number; areaHa?: number; aspect?: number };
  site: SiteRequest;
}

/** The environment a site stage binds (StageEnv's slots, C-0142 (5)): the kernel's Stream, the tables' view and rung. */
export interface SiteEnv extends StageEnv {
  stream: Stream;
  tables: TableView;
  rung: RungProfile;
}

/** §4.12's TerrainStrategy: S1 (1) at M0 — S1 (3), (9) and (10) are M0-e-02's, M0-e-03's and `siteResources` (C-0165). */
export interface TerrainStrategy<E extends SiteEnv = SiteEnv> {
  terrain(bp: TerrainBlueprint, ctx: StageContext<E>, k: E['kernel']): KernelResult<Terrain>;
}

/**
 * The ground classes V11's water table yields wells by (§4.2 S1 (10), item 111 (b)): alluvial ground by the water, a
 * dry riverbed's gravels, low ground by the water table, and the rest — terrain.json's `resources/wellYield.*` rows.
 */
export type GroundClass = 'alluvial' | 'gravel' | 'low' | 'ordinary';

/** The ground classes in their codes' order (GROUND_CODES). */
export const GROUND_CLASSES: readonly GroundClass[] = Object.freeze(['alluvial', 'gravel', 'low', 'ordinary']);

/**
 * §2.5's SiteResources (S1 (10)'s output, 0 … 1 per cell) on its own grid: `cellCm` square cells over the height
 * raster's extent from its south-west corner, row-major — `coveringGrid(terrain, cellCm)` gives the columns and rows —
 * plus `slope`, the gradient the stone and fertile rules read and the fields read (M0-work.json's item lists it in the
 * family; C-0165).
 */
export interface SiteResources {
  cellCm: number;
  ore: Float32Array;
  stone: Float32Array;
  timber: Float32Array;
  fish: Float32Array;
  clay: Float32Array;
  fertile: Float32Array;
  wellYield: Float32Array;
  /** Rise over run at each cell's centre, by the TerrainSampler (§2.3: slope queries at 2.5 m). */
  slope: Float32Array;
}
