// @plat/layout's enceinte module (M0-c-02; §4.12 `EnceinteStrategy`, §4.4 S5a *Trace* and *Water and the waterfront*,
// §4.2 S3 (7), (9), §4.1's S1 and S3 batch rows, §4.8 the strips, §4.6 the barrier, §2.2 rule 7, §2.7, §5.2 F-WALL;
// C-0032, C-0033, C-0085, C-0087; readings C-0226): the registered trace strategy `base` with the strip stand-in, the
// basic water gate and F-WALL's trace rungs, and the S3 slice's commits through the façade. Created empty by the
// scaffold (M0-s-01, C-0013); this index and its folder belong to M0-c-02.
export type { ClosureArc, CostField, Enceinte, EnceinteContext, EnceinteEnv, EnceinteStrategy, StripsLaid, StripStop, TraceOptions, TracePolicy, TraceReport, Traced, WallRung, WaterGate } from './types.js';
export { classifyArcs, type BarrierKind, type BarrierRow, type BarrierRun } from './closure.js';
export { PULL_STEPS, outwardNormals, pullAndPin, smoothPinned, terrainCost, type Pulled } from './pull.js';
export { defectOf, placePins, reoffset, rungVerdict, unionOuter } from './rungs.js';
export { crossWater, GRAZE_RATIO, shoreArc, waterGates, waterRings, type WaterCrossing, type WaterRing } from './water.js';
export { baseEnceinte, ENCEINTE_STRATEGY_ID, simplifyInBand, stripOwner, traceBase, wallCells, type WallCells } from './trace.js';
export { layStrips, stripWidths, traceLine, type LayStripsOptions } from './strips.js';
export { commitOuterRing, commitS3Batch, commitS3Slice, outerRing, PLAZA_ID, siteContext, WAY_SPAN_NODES, type CommitOptions, type S3Batch, type S3Commit } from './commit.js';
export { bandBreaches, bandLimit, departure, segmentDepartureBound, selfTouches, sideHolds, TOUCH_CM } from './plane.js';
export { WET_TOL_CM, wetSides, type WetSides } from './wet.js';
