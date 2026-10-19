// @plat/site's hydro module (M0-e-02; §4.2 S1 (3), §2.3 *The hydrology grid*, *Flats*, §5.2 F-RIVER and F-WORK,
// R12-5, C-0048, C-0085): the hydrology grid and its pipeline — the bucket-queue priority flood on integer heights with
// exact flats and the lake typing, the two-gradient flat resolution into flatRank, D8 with the fixed tie order, flow
// accumulation — and the river by descent: the inlet, the meandering Chaikin-smoothed course with its control knots,
// the capped monotone carve, the corridor's D8 and one accumulation, the width law, the basic estuary, tributaries;
// F-RIVER's carve / re-trace / inlet rungs, F-WORK's coarser grid and R12-5's `hydroCoarsen` switch. This index and
// its folder are M0-e-02's. Its files also export, at file level, helpers for the sibling folders to import by path;
// they are not part of the package's API and so are not listed here (J263 Q1): field.ts `invOfCols`, `rowOf`; d8.ts
// `slopeKey`; course.ts `segParam`, `cellIndexAt`, `lengthQuotient`.
export {
  cellCount,
  codeOf,
  D8_DX,
  D8_DY,
  D8_NAMES,
  fieldOf,
  hydroField,
  invCols,
  NO_FLOW,
  onBorder,
  outwardCode,
  pointCm,
  type HydroField,
} from './field.js';
export { priorityFlood, type Depression, type FloodResult } from './flood.js';
export { resolveFlats, type FlatsResult } from './flats.js';
export { accumulate, d8, downstream, flowCode, recomputeCorridors, type Corridor, type D8Result } from './d8.js';
export { arcLengths, cellAt, chaikin, firstSelfTouch, pointAtArc, pointSegDist2, rasterise, rounded, segSegDist2, type GridGeom, type XY } from './course.js';
export { carveCourse, planCarve, rasterGeom, type CarvePlan, type CarveResult } from './carve.js';
export {
  CHAIKIN_ROUNDS,
  CORE_SHARE,
  ESTUARY_FACTOR,
  ESTUARY_LENGTH_M,
  hydroParams,
  KNOT_DEVIATION_CELLS,
  MEANDER_MIN_SHARE,
  MEANDER_SAME_SIDE,
  RETRACE_MAX,
  SURFACE_CAP_SHARE,
  type HydroParams,
} from './params.js';
export { NO_PARENT, riverSurface, surfaceCapCm, type RiverSurface } from './surface.js';
export { descentLine, edgePoint, inletMasks, knotVertices, MeanderDraws, traceRiver, type Inlet, type Knot, type RiverTrace, type TraceEvent, type TraceOptions } from './trace.js';
export {
  baseRivers,
  HYDROLOGY_ROW,
  hydrology,
  inletOf,
  riverId,
  riverStrategy,
  runRivers,
  widthCm,
  widthProfile,
  type HydrologyRowRecord,
  type HydrologyRun,
} from './strategy.js';
export type {
  RiverBlueprint,
  RiverLadderUse,
  RiverOptions,
  RiverOutcome,
  RiverReport,
  RiverRequest,
  RiverRequested,
  RiverRun,
  RiverStrategy,
  TributaryRequest,
} from './types.js';
