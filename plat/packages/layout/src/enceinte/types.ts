// The trace strategy's types (M0-c-02; §4.12 `EnceinteStrategy`, §2.7 `Enceinte` minimal and `Gate`, §4.4 S5a *Trace*
// and *Water and the waterfront*, §4.8 the strips, §5.2 F-WALL; C-0032, C-0033, C-0085, C-0087; readings C-0224).
// Types only.
import type { Kernel, LatticePoint, Plat, PlatKey, Polygon, Stream } from '@plat/kernel';
import type { Enceinte, Gate, GateSite, Id, Reservation, StageContext, StageEnv, Terrain, WaterSet } from '@plat/model';
import type { RungProfile, TableView } from '@plat/tables';

export type { Enceinte, Gate } from '@plat/model';

/** A point in cm (values, not arena slots). */
export interface XY {
  readonly x: number;
  readonly y: number;
}

/** The environment the base strategy runs in (§14's StageContext slots bound to the packages that hold their types). */
export interface EnceinteEnv extends StageEnv {
  plat: Plat;
  stream: Stream;
  kernel: Kernel;
  tables: TableView;
  rung: RungProfile;
}

/** What the strategy's run sees (§14). */
export type EnceinteContext = StageContext<EnceinteEnv>;

/** §4.12's trace policy: the waterfront (only `open` is built at M0, C-0087) and the placement (`aroundAll` at M0). */
export interface TracePolicy {
  readonly waterfront: 'open' | 'quay_wall' | 'sea_wall';
  readonly placement: 'aroundAll' | 'aroundStage';
}

/**
 * The pull's cost surface (§4.4 S5a *Trace* (2): "a cost-surface path around the town with a penalty for leaving high
 * ground"): the cost of standing at a point, any finite number (only differences along a vertex's normal matter);
 * +∞ bars the point. The base's default is the terrain's: lower ground costs more (C-0224 (3)).
 */
export type CostField = (p: XY) => number;

/** The base strategy's options beside §4.12's parameters (each with the base's default). */
export interface TraceOptions {
  /** The arena the trace is committed in (default the ground's, ground part 0). */
  readonly key?: PlatKey;
  /** The enceinte's address (default `enceinte:<stage>`). */
  readonly enceinteId?: Id;
  /** The stage the enceinte walls (default 1). */
  readonly stage?: number;
  /** The pull's cost surface (default: the terrain's, flat → the identity but for the pins). */
  readonly costField?: CostField;
  /** Rings the trace must enclose and never cross besides the reservations' (k ≥ 2: the previous enceinte). */
  readonly core?: readonly (readonly XY[])[];
  /**
   * The stage whose rank the trace batch carries (default S5: §4.1's S5 row, k = 1, commits S3's trace through S5a;
   * C-0224 (2)).
   */
  readonly batchStage?: number;
}

/** F-WALL's trace rungs as they ran (§5.2; C-0085): each reported with what triggered it and whether it held. */
export interface WallRung {
  readonly rung: 'reoffset' | 'union_simplify';
  /** What the trace showed before the rung: a self-touch, or a crossing of the core. */
  readonly cause: 'self_touch' | 'core';
  /** The rung's radius (re-offset: the band, C-0224 (6)); 0 for the union-simplify. */
  readonly radiusCm: number;
  /** Did the rung's trace pass every check (simple, the core enclosed, every pin on it, within the band)? */
  readonly held: boolean;
  /** Why it did not hold, when it did not. */
  readonly why?: 'self_touch' | 'core' | 'pin_lost' | 'band' | 'empty';
}

/**
 * Barrier closure's arcs (§4.4 S5a *Trace* (1)): each arc of the boundary with its defensibility class. At M0 the
 * barrier table has no row (V11's `walls.barriers`, C-0158), so every arc is `open` and the closure is the ring.
 */
export interface ClosureArc {
  /** The boundary vertex the arc starts at and the one it ends at (equal: the whole ring). */
  readonly from: number;
  readonly to: number;
  readonly defensibility: 'open';
}

/** The trace's report (§5.4's rows it fills). */
export interface TraceReport {
  /** The closure (§2.7 `Enceinte.closure`): `ring` at M0. */
  readonly closure: 'ring';
  readonly arcs: readonly ClosureArc[];
  /** The pull: vertices moved and the largest offset taken (cm). */
  readonly pull: { readonly moved: number; readonly maxOffsetCm: number };
  /** The pinned smoothing passes run (walls.json `trace/smoothPasses`). */
  readonly smoothPasses: number;
  /** Vertices before and after the topology-preserving simplify; `skipped` when it would leave the band. */
  readonly simplify: { readonly before: number; readonly after: number; readonly skipped: boolean };
  /** F-WALL's trace rungs (C-0085), in the order they ran. */
  readonly rungs: readonly WallRung[];
  /** The largest distance of the committed trace from the boundary (cm), sampled at 1 m: ≤ the band. */
  readonly departureCm: number;
  /** The water gates written (not counted in N, C-0087). */
  readonly waterGates: number;
}

/** A water gate (C-0087) with the two bank points the trace crosses the water between. */
export interface WaterGate extends Gate {
  readonly kind: 'water';
  readonly way: null;
  /** The bank points: where the trace leaves the land (0) and reaches it again (1), in trace order. */
  readonly bankAt: readonly [LatticePoint, LatticePoint];
  /** The water body crossed. */
  readonly body: Id;
}

/** The trace as committed: the minimal Enceinte, its gates' records and the run's report. */
export interface Traced {
  readonly enceinte: Enceinte;
  /** Main gates in gate-site order, then the water gates in trace order. */
  readonly gates: readonly Gate[];
  readonly waterGates: readonly WaterGate[];
  /** The committed line (closed ring, counter-clockwise, lattice points; the gates and bank points among them). */
  readonly line: readonly LatticePoint[];
  readonly report: TraceReport;
}

/** §4.12's EnceinteStrategy: the base's pull-and-simplify with barrier closure (§4.4 S5a *Trace*). */
export interface EnceinteStrategy {
  trace(
    boundary: Polygon,
    gateSites: readonly GateSite[],
    reservations: readonly Reservation[],
    terrain: Terrain,
    water: WaterSet,
    policy: TracePolicy,
    ctx: EnceinteContext,
    k: Kernel,
    opts?: TraceOptions,
  ): import('@plat/kernel').KernelResult<Enceinte & { readonly traced: Traced }>;
}

/**
 * The corridor a strip stops at (§4.8; C-0033): a main gate's — the way through it, the buffer of `halfWidthCm` about
 * the way's centreline near the gate (`path`, through the gate) — or a water gate's, the water itself (the river is
 * its corridor, C-0087).
 */
export type StripStop =
  | { readonly kind: 'way'; readonly gate: Id; readonly at: XY; readonly path: readonly XY[]; readonly halfWidthCm: number }
  | { readonly kind: 'water'; /** The water body (or its gate). */ readonly gate: Id; readonly ring: readonly XY[] };

/** The strips as laid (C-0033): per side, the setback chains and the strip faces' owner. */
export interface StripsLaid {
  /** The owners the strip faces were given (`Enceinte.strips`' FaceRefs name them at L1). */
  readonly owners: { readonly inner: Id; readonly outer: Id };
  /** Per side, the strip faces (one per arc between two stops; one ring strip when there is no stop). */
  readonly faces: { readonly inner: number; readonly outer: number };
  /** Per side, the setback chains inserted, as lattice points. */
  readonly lines: { readonly inner: readonly (readonly LatticePoint[])[]; readonly outer: readonly (readonly LatticePoint[])[] };
  /** The strip widths read from the era row (cm): band half + inner setback, band half + outer setback and glacis. */
  readonly widthsCm: { readonly inner: number; readonly outer: number };
}
