// M0-e-02's terrain fixtures for the river: analytic height functions (metres over arena centimetres) on a small CITY
// frame — a 100 ha frame, 1 km a side, its arena 1.6 km (a 64 × 64 hydrology grid at 25 m, a 200 × 200 raster at 8 m).
import type { RiverBlueprint } from '../../src/hydro/index.js';

export const SMALL: RiverBlueprint['size'] = { areaHa: 100 };

/** A bowl of `depthM` and `radiusM` at (cx, cy) metres: −D · (1 − t²)² inside its radius. */
export function bowl(xm: number, ym: number, cx: number, cy: number, radiusM: number, depthM: number): number {
  const dx = xm - cx;
  const dy = ym - cy;
  const t2 = (dx * dx + dy * dy) / (radiusM * radiusM);
  return t2 >= 1 ? 0 : -depthM * (1 - t2) * (1 - t2);
}

/**
 * A valley running north to south: the ground falls 2 % southward from 50 m at the centre and a trough 6 m deep, 600 m
 * across, follows x = 0 — a river from the north edge runs through the core and out of the south edge.
 */
export function valley(x: number, y: number): number {
  const xm = x / 100;
  const ym = y / 100;
  const t = xm / 300;
  const trough = Math.abs(t) >= 1 ? 0 : -6 * (1 - t * t) * (1 - t * t);
  return 50 + 0.02 * ym + trough;
}

/** The valley with a sink on its axis 200 m north of the centre (3 m deep, 50 m across the radius). */
export function valleyWithSink(x: number, y: number): number {
  return valley(x, y) + bowl(x / 100, y / 100, 0, 200, 50, 3);
}

/** The valley with a crater on its axis 400 m north of the centre, 12 m deep and 150 m in radius — deeper than any carve. */
export function valleyWithCrater(x: number, y: number): number {
  return valley(x, y) + bowl(x / 100, y / 100, 0, 400, 150, 12);
}

/**
 * The north–south line (cm) of a one-cell ridge on the height raster: the 8 m raster row centred there, which no
 * 25 m hydrology cell's bilinear sample reads (the samples at 287.5 m and 312.5 m read the rows at 284/292 m and
 * 308/316 m), 300 m north of the centre — outside the 250 m core.
 */
export const RIDGE_Y_CM = 30_000;

/**
 * The valley with a 6 m ridge one raster row wide across the whole arena at RIDGE_Y_CM: invisible to the hydrology
 * grid (its heights equal the valley's), so the river's surface admits the line across it and only the carve plan on
 * the raster finds the cut past the cap — a failure past the second knot that no route around can avoid.
 */
export function valleyWithRidge(x: number, y: number): number {
  return valley(x, y) + (Math.abs(y - RIDGE_Y_CM) < 400 ? 6 : 0);
}

/**
 * The valley whose east side beyond x = 200 m falls away 5 % eastward: from an inlet east of that line the river runs
 * east, far from the core; from one west of it, down the valley through the core.
 */
export function valleyFallingEast(x: number, y: number): number {
  const xm = x / 100;
  return valley(x, y) - (xm > 200 ? 0.05 * (xm - 200) : 0);
}

/** Ground falling 2 % eastward: a river from the north edge turns east and leaves by the east edge, far from the core. */
export function eastward(x: number, y: number): number {
  return 50 - 0.02 * (x / 100) + 0.001 * (y / 100);
}

/**
 * The valley with a side valley from the east (a tributary's): a trough along y = 0 from the east edge to the main
 * trough, its floor rising 0.2 % eastward from the main trough's floor (44 m at the centre), its sides rising with the
 * square of the distance from its line (2.5 m at 50 m) until they meet the valley's ground.
 */
export function valleyWithSide(x: number, y: number): number {
  const xm = x / 100;
  const ym = y / 100;
  const base = valley(x, y);
  if (xm < 0) return base;
  const side = 44 + 0.002 * xm + 0.001 * ym * ym;
  return Math.min(base, side);
}
