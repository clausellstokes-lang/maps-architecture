// S1 (3)'s parameters (M0-e-02; §2.3, §4.2 S1 (3), R12-5): terrain.json's hydrology and river cells for a rung, read
// once through the TableView, and the values the table does not hold, picked here (C-0173) as named constants until a
// table round adds their cells (terrain.json is M0-s-02's; no later item writes it).
import type { BaseRung, TableView } from '@plat/tables';

/**
 * The meander draw (§4.2 S1 (3): "knots sit mostly on alternating sides"): a knot keeps the previous knot's side with
 * this chance and changes side otherwise. C-0173 (4).
 */
export const MEANDER_SAME_SIDE = 0.2;

/** A knot's offset is (MEANDER_MIN_SHARE + (1 − MEANDER_MIN_SHARE) · u) × half the control spacing. C-0173 (4). */
export const MEANDER_MIN_SHARE = 0.4;

/**
 * The knots follow the descent line's bends (C-0175 (4)): a knot also falls where the chord from the previous knot
 * would leave a cell of the line by more than this many hydrology cells — so the course never cuts across a bend's
 * spur — and its offset is that share of half the chord when the chord is shorter than the spacing.
 */
export const KNOT_DEVIATION_CELLS = 1;

/**
 * The river's surface admits a cell only where its fill stays within this share of carveMaxCm (C-0175 (2)): the rest
 * of the cap is the headroom the height raster's detail below the hydrology cell and the course's chords and offsets
 * take on the raster, where the carve is measured.
 */
export const SURFACE_CAP_SHARE = 0.5;

/** Chaikin's corner cutting applied this many times to the control polyline (§4.2 S1 (3)). C-0173 (4). */
export const CHAIKIN_ROUNDS = 3;

/** The re-traces from the last good knot one inlet allows, the offsets halved at each (F-RIVER's second rung). */
export const RETRACE_MAX = 3;

/**
 * The core the course must reach before it leaves the frame (§5.2 F-RIVER's detection): the disc about the frame's
 * centre whose radius is this share of the frame's shorter side — S3's centre is not sited until later, and the
 * town's core stands at the frame's centre at M0. C-0173 (6).
 */
export const CORE_SHARE = 0.25;

/** The basic estuary mouth (§4.2 S1 (3) *Mouths*): the last ESTUARY_LENGTH_M of the course widens to ESTUARY_FACTOR × its width. C-0173 (7). */
export const ESTUARY_LENGTH_M = 400;
export const ESTUARY_FACTOR = 2.5;

/** One rung's hydrology and river cells (terrain.json) in the units the code reads. */
export interface HydroParams {
  rung: BaseRung;
  /** §2.3's hydrology cell (16 / 25 / 32 m), cm. */
  hydroCellCm: number;
  /** R12-5's one coarser step (20 / 32 / 40 m), cm — the hydroCoarsen switch and F-WORK's rung (C-0085). */
  hydroCoarseCellCm: number;
  /** carveMaxCm (400 / 400 / 600 cm). */
  carveMaxCm: number;
  /** The width law w = w0 · acc^exponent (§4.2 S1 (3)). */
  w0Cm: number;
  exponent: number;
  /** The class bands, cm. */
  riverBandCm: readonly [number, number];
  tributaryBandCm: readonly [number, number];
  /** river.controlSpacingM, cm. */
  controlSpacingCm: number;
  /** river.lakeThresholdCm. */
  lakeThresholdCm: number;
}

/** terrain.json's hydrology and river cells for `rung` (a missing or mistyped cell is the loader's refusal). */
export function hydroParams(tables: TableView, rung: BaseRung): HydroParams {
  const t = tables.table('terrain');
  const band = (cell: string): readonly [number, number] => {
    const [lo, hi] = t.pair('river', cell);
    return Object.freeze([lo * 100, hi * 100] as const);
  };
  return Object.freeze({
    rung,
    hydroCellCm: t.num(rung, 'hydroCellM') * 100,
    hydroCoarseCellCm: t.num(rung, 'hydroCoarseCellM') * 100,
    carveMaxCm: t.num(rung, 'carveMaxCm'),
    w0Cm: t.num('river', 'w0M') * 100,
    exponent: t.num('river', 'exponent'),
    riverBandCm: band('widthBandM.river'),
    tributaryBandCm: band('widthBandM.tributary'),
    controlSpacingCm: t.num('river', 'controlSpacingM') * 100,
    lakeThresholdCm: t.num('river', 'lakeThresholdCm'),
  });
}
