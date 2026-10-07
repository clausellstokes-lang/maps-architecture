// The fields' types (M0-e-05; §4.5 *Fields*, *Soft terms*, *The band set*, *Bands*; §2.5 FieldBands; §6.1
// `field.chance`; §12.4's S6 row; C-0049, C-0085; readings C-0255). Types only.
import type { LatticePoint } from '@plat/kernel';
import type { FieldBands, Id } from '@plat/model';
import type { CellGrid } from '@plat/site';

/** A point in cm. */
export interface XY {
  readonly x: number;
  readonly y: number;
}

/** The three fields of §4.5 (the density and greenery fields follow the prosperity field's construction). */
export type FieldName = 'prosperity' | 'density' | 'greenery';

/** The fields in their one order: the order ε's samplers are drawn from the `field.chance` stream, and every report's. */
export const FIELD_NAMES: readonly FieldName[] = Object.freeze(['prosperity', 'density', 'greenery']);

/**
 * A driver term of P(x) (§4.5), in the one order every sum and every report takes: the field's base level (a constant
 * kernel 1, its weight this folder's own cell, C-0255 (7)), the distance-decay kernels (one exact
 * distance transform per class), the elevation and low-and-damp kernels, the intent's wealth gradient, and the two soft
 * terms (daylight, water; C-0049). A field's table row names the terms it carries (`<term>.weight`).
 */
export type DriverTerm =
  | 'base'
  | 'plaza'
  | 'market'
  | 'mainStreet'
  | 'gate'
  | 'water'
  | 'elevation'
  | 'lowDamp'
  | 'wall'
  | 'wealthGradient'
  | 'daylight'
  | 'waterTerm';

/** The driver terms in their one order (see DriverTerm). */
export const DRIVER_TERMS: readonly DriverTerm[] = Object.freeze(['base', 'plaza', 'market', 'mainStreet', 'gate', 'water', 'elevation', 'lowDamp', 'wall', 'wealthGradient', 'daylight', 'waterTerm']);

/** The distance classes: each one exact Euclidean distance transform over the grid (§4.5, §17.1 (8)). */
export type DistanceClass = 'plaza' | 'market' | 'mainStreet' | 'gate' | 'water' | 'wall';

/** The distance classes in their one order. */
export const DISTANCE_CLASSES: readonly DistanceClass[] = Object.freeze(['plaza', 'market', 'mainStreet', 'gate', 'water', 'wall']);

/** The soft terms (§4.5 *Soft terms*; C-0049): at weight 0 the model is byte-identical to the model without them. */
export const SOFT_TERMS: readonly DriverTerm[] = Object.freeze(['daylight', 'waterTerm']);

/** The field grid: `cellCm` square cells over frame + margin (§4.5: 32 m cells; R12-5's coarser step 48 m). */
export type FieldGrid = CellGrid;

/** A ring or a polyline of the sources (cm). */
export type Path = readonly XY[];

/**
 * The geometry the driver kernels measure from (§4.5): the plaza, the markets (the principal — the plaza's reservation
 * at M0 — and any `market` reservation), the main streets, the gates, the water and the walls. Rings are filled (a cell
 * whose centre lies inside) and their edges marked; lines are marked cell by cell; points mark their cell.
 */
export interface FieldSources {
  readonly plaza: readonly Path[];
  readonly markets: readonly Path[];
  readonly mainStreets: readonly Path[];
  readonly gates: readonly XY[];
  /** Water areas (rings: a water body's L0 faces). */
  readonly water: readonly Path[];
  /** Water lines (shores and banks: segments). */
  readonly waterLines: readonly Path[];
  readonly walls: readonly Path[];
}

/** One coarse face as the fields store it (§4.5: "stored per coarse face"): its canonical key, owner and rings. */
export interface FieldFace {
  /** The canonical key's two vertices (x0, y0, x1, y1) (§3.3), slot-free. */
  readonly key: readonly [number, number, number, number];
  readonly owner: Id | null;
  /** Its rings (outer first, then holes). */
  readonly rings: readonly (readonly LatticePoint[])[];
}

/** What pass 1's completion reads after typing: each district's kind and the coarse faces (§4.5). */
export interface FieldDistricts {
  readonly districts: readonly { readonly id: Id; readonly kind: string }[];
  /** Every live L1 face, in canonical order. */
  readonly faces: readonly FieldFace[];
}

/** One term's value averaged over the points (`drivers(points)`). */
export interface DriverValue {
  readonly term: DriverTerm;
  readonly weight: number;
  readonly value: number;
}

/**
 * §4.5's FieldDrivers: each term of P(x) separately, averaged over the points — every driver kernel (its weight
 * applied; the daylight and water terms among them), the `characterOffset`, the brush strokes' composite and an epoch's
 * drift (0 at M0: no brush, no epoch), and ε as `chance`. The terms sum, before the clamp, to the stored value
 * (`unclamped`, averaged over the same points); `value` is the stored, clamped value averaged.
 */
export interface FieldDrivers {
  readonly field: FieldName;
  readonly points: number;
  readonly terms: readonly DriverValue[];
  readonly characterOffset: number;
  readonly brush: number;
  readonly drift: number;
  readonly chance: number;
  readonly sum: number;
  readonly unclamped: number;
  readonly value: number;
}

/** A field's stored value at one coarse face: the mean over the cells whose centres lie in it, else the cell at its centroid. */
export interface FaceValue {
  readonly key: readonly [number, number, number, number];
  readonly owner: Id | null;
  readonly cells: number;
  readonly value: number;
}

/** The driver-only state of one field (§4.5 pass 1's first half: the driver kernels, blurred; read by typing and S5d). */
export interface DriverField {
  readonly field: FieldName;
  /** 'driver-only' — the FieldProvider name S5d reports. */
  readonly name: string;
  readonly grid: FieldGrid;
  /** Σ w_i · kernel_i, blurred, before the clamp. */
  readonly unclamped: Float64Array;
  /** The same clamped to [0, 1]. */
  readonly values: Float64Array;
  /** The stored value at the cell holding p (clamped to the grid). */
  valueAt(p: XY): number;
  /** The FieldProvider form S5d reads (§4.4 S5d: "S6 pass 1's kernels"). */
  prosperityAt(p: XY): number;
}

/** The cut points of one field over the land (`cutPoints`). */
export interface CutResult {
  readonly cuts: number[];
  /** Land cells, and per band the land cells whose value falls in it. */
  readonly landCells: number;
  readonly perBand: number[];
  /** Per band, its share of the land in cells (share × landCells). */
  readonly target: number[];
  /** max over bands of |perBand − target|: ≤ 1 unless a tie run straddles a target (reported, never hidden). */
  readonly errorCells: number;
  /** 'shares' — or 'default' when the land holds no cell (bands.json's default cuts stand, reported). */
  readonly from: 'shares' | 'default';
}

/** One field of pass 1, complete (§4.5): the raster, the per-face values, FieldBands and the oracle's drivers. */
export interface ScalarField<F extends FieldName = FieldName> {
  readonly field: F;
  readonly name: string;
  readonly grid: FieldGrid;
  /** P before the clamp: Σ w_i k_i + characterOffset + ε, smoothed. */
  readonly unclamped: Float64Array;
  /** P clamped once to [0, 1]: the stored raster. */
  readonly values: Float64Array;
  /** Per coarse face, in canonical order. */
  readonly faces: readonly FaceValue[];
  readonly bands: FieldBands;
  readonly cutResult: CutResult;
  /** ε's scale: the factor on the stream's normalised, smoothed fBm that gives ε its declared share. */
  readonly chanceScale: number;
  valueAt(p: XY): number;
  /** §4.5's `drivers(points)`: read-only, for the oracle. Throws on an empty point list. */
  drivers(points: readonly XY[]): FieldDrivers;
}

/** §4.5's ProsperityField: a ScalarField that is also S5d's FieldProvider. */
export interface ProsperityField extends ScalarField<'prosperity'> {
  prosperityAt(p: XY): number;
}

/** §4.5's density field. */
export type DensityField = ScalarField<'density'>;

/** §4.5's greenery propensity field. */
export type GreeneryField = ScalarField<'greenery'>;

/** F-WORK's rung on `field.cells` (C-0085): the fields one step coarser, reported `work_cut` with the count. */
export interface FieldsWorkCut {
  readonly code: 'work_cut';
  readonly counter: 'field.cells';
  readonly count: number;
  readonly limit: number;
  /** False when the grid was already at the coarser step (the switch on): no further rung, the run proceeds. */
  readonly coarsened: boolean;
  readonly fromCellCm: number;
  readonly toCellCm: number;
}

/** The fields' report (§5.4's rows they fill). */
export interface FieldsReport {
  readonly cellCm: number;
  /** The fieldsCoarsen switch (R12-5) was on. */
  readonly switchCoarsen: boolean;
  readonly cols: number;
  readonly rows: number;
  readonly work: { readonly 'field.cells': number; readonly limit: number };
  readonly workCut: FieldsWorkCut | null;
  readonly sigmaM: number;
  /** The extended box's radius and end weight per pass (C-0255 (4)). */
  readonly blur: { readonly radius: number; readonly alpha: number };
  /** The distance classes that had a source (the rest measure nothing: their kernels are 0 everywhere). */
  readonly sourced: readonly DistanceClass[];
  /** The kinds no characterOffset cell names (their offset 0). */
  readonly kindsWithoutOffset: readonly string[];
  readonly landCells: number;
}
