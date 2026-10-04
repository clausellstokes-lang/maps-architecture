// S1 (3)'s types (M0-e-02; §4.2 S0's site request "river with inflow bearing, islands and mouth", §4.12's
// RiverStrategy, §5.4's report fields a ladder writes): what the river stage reads from the blueprint, the strategy
// interface, its switches and the report it hands its caller. Types only.
import type { KernelResult, Warning } from '@plat/kernel';
import type { Id, StageContext, Terrain, WaterSet } from '@plat/model';
import type { SiteEnv, TerrainBlueprint } from '../terrain/types.js';
import type { Depression } from './flood.js';

/** A tributary's request (§4.2 S1 (3): "tributaries by the same rule from secondary inlets"). */
export interface TributaryRequest {
  /** The compass bearing (centidegrees clockwise from north) from the frame's centre to its inlet; absent, the highest edge other than the river's. */
  inflowBearingCdeg?: number;
}

/** §4.2 S0's river request, the part S1 (3) reads at M0 (C-0173 (1)). */
export interface RiverRequest {
  /**
   * The compass bearing (centidegrees clockwise from north) from the frame's centre to the point on the arena's edge
   * where the river arrives — its upstream edge; absent, the highest edge (§4.2 S1 (3)).
   */
  inflowBearingCdeg?: number;
  /** The mouth (§4.2 S1 (3) *Mouths*): `estuary` the widening profile; `delta`'s distributaries are M1's (§4b). */
  mouth?: 'none' | 'estuary' | 'delta';
  /** River islands (§4.2 S1 (4)): M1's (§4b); a request is reported, never silent. */
  islands?: number;
  /** Tributaries from secondary inlets. */
  tributaries?: readonly TributaryRequest[];
}

/** The part of §4.2 S0's Blueprint the river stage reads: the size (the frame, as S1 (1) reads it) and the river. */
export interface RiverBlueprint {
  size: TerrainBlueprint['size'];
  site: { river?: RiverRequest | null };
}

/** §4.12's RiverStrategy (S1 (3)–(5); at M0 S1 (3), the crossing sites of (5) being M0-e-03's). */
export interface RiverStrategy<E extends SiteEnv = SiteEnv> {
  rivers(bp: RiverBlueprint, terrain: Terrain, water: WaterSet, ctx: StageContext<E>, k: E['kernel']): KernelResult<WaterSet>;
}

/** The strategy's configuration (C-0173 (8)): R12-5's switch, F-WORK's limit, and where the report goes. */
export interface RiverOptions {
  /** R12-5's `hydroCoarsen` switch: the hydrology grid one step coarser from the start (25 → 32 m at CITY, …). */
  hydroCoarsen?: boolean;
  /** The `hydro.cells` work limit (F-WORK; the law's value for the stage's scope, evaluated by the caller). */
  hydroCellsLimit?: number;
  /** Receives every run's report (the runner's sink, M0-x-02 / M0-x-04). */
  onReport?: (report: RiverReport) => void;
}

/** One ladder use (§5.4's `ladderUses` row, with the rung's name and its measured value). */
export interface RiverLadderUse {
  cause: 'F-RIVER' | 'F-WORK';
  code?: 'work_cut';
  /** The rung's position in its class's ladder (§5.2): F-RIVER 1 carve, 2 re-trace, 3 inlet; F-WORK 1 coarsen. */
  rung: number;
  name: 'carve' | 'retrace' | 'inlet' | 'coarsen';
  /** §5.1's tier: 2 a local repair, 3 a bounded retry (attempt), 4 a simpler primitive (the coarser grid). */
  tier: 2 | 3 | 4;
  entity: Id;
  /** The stream key's textual form (§6.1). */
  key: string;
  /** carve: the filled depression's depth (cm); retrace: the knot re-traced from; inlet: the attempt; coarsen: the count. */
  value: number;
}

/** A requested feature by delivery tier (§5.1 (7)). */
export interface RiverRequested {
  feature: string;
  delivered: 'full' | 'degraded' | 'omitted';
  tier: number;
  entity?: Id;
  cause?: string;
}

/** One river's outcome. */
export interface RiverOutcome {
  id: Id;
  kind: 'river' | 'tributary';
  /** The attempt delivered (0 – 2). */
  attempt: number;
  /** The course fits (no self-touch, no cut past the cap) and reaches an outlet. */
  fits: boolean;
  /** The delivered course (whole, or cut before its failure) passes within the core (rivers; tributaries true). C-0175 (7). */
  reachesCore: boolean;
  /** Where it ends: the frame edge, a joined river, or (degraded) the sink it could not cross. */
  outfall: 'frame' | 'join' | 'sink';
  maxCarveCm: number;
  /** The corridor's D8 was set along the course (a fitting course; C-0173 (9)). */
  corridor: boolean;
}

/** S1 (3)'s report: the hydrology, the work it charged, every rung used, the requests by tier. */
export interface RiverReport {
  /** hydro.cells charged (§5.1 (5)); M0.md §2.2's counter. */
  work: { 'hydro.cells': number };
  /** F-WORK: the count that reached the limit, the limit, and whether the grid coarsened. */
  workCut: null | { counter: 'hydro.cells'; count: number; limit: number; coarsened: boolean; fromCellCm: number; toCellCm: number };
  ladderUses: RiverLadderUse[];
  requested: RiverRequested[];
  hydrology: {
    cellCm: number;
    cols: number;
    rows: number;
    /** Cells with no D8 direction (0: §13.1's 100 %). */
    d8Undefined: number;
    flatCells: number;
    flats: number;
    depressions: Depression[];
  };
  rivers: RiverOutcome[];
  warnings: Warning[];
}

/** A run's value: the water and the report. */
export interface RiverRun {
  water: WaterSet;
  report: RiverReport;
}
