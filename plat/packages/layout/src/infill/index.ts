// @plat/layout's infill module (§4.6): the granularity bands (M0-b-01), the bent-cut planner, steps 1–7 (M0-b-02), and
// BentCutFabric with the S8 stage — the transaction, the ladder, width, continuation, recursion, the deep-interior
// rule and the seam portals (M0-b-03). Created empty by the scaffold (M0-s-01, C-0013); this index belongs to M0-b-03.
export { bandPlotDepth, blockDepthRange, granularityBands, minFrontage, regimeFloor, upperBlockArea, type GranularityBands, type GranularityBandsOptions } from './granularityBands.js';
export {
  cutCells,
  DrawRecord,
  planCut,
  stopThreshold,
  workingFrame,
  type BlockPlan,
  type CutCells,
  type CutGeometry,
  type CutPlan,
  type CutPlanned,
  type EndPlan,
  type FailedPlan,
  type KerbFace,
  type KerbPortal,
  type KerbSpine,
  type NextRungPlan,
  type PlanContext,
  type PlanStreams,
  type StopRecord,
} from './planner.js';
export { CUT_CLASSES, cutClass, drawWidthExponent, widthCells, widthExponent, widthOf, type ClassBands, type CutClass, type WidthBand, type WidthCells } from './width.js';
export { DEEP_FACTOR, DEEP_TREATMENTS, deepInterior, interiorRow, interiorSpine, localThickness, pickWeighted, REACHES, type DeepInterior, type DeepTreatment, type InteriorRow, type InteriorRowOptions, type Reach } from './deepInterior.js';
export {
  antennaCut,
  antennaTips,
  contactClear,
  continuationVerdict,
  judge,
  kerbEndsSquare,
  longestRun,
  meanNormalCut,
  reflexPreCut,
  reflexVertices,
  slideFeet,
  snapChain,
  straightCandidate,
  type BlockFloor,
  type Candidate,
  type Judgement,
  type ReflexVertex,
  type SlideFoot,
} from './ladder.js';
export { chainRuns, kerbPortals, portalGap, portalInvariant, removeLane, seamOfSpine, seamsOfSpine, spineSeam, vertexPoints, type LaneRemoval, type PortalProblem } from './portals.js';
export {
  BENT_CUT,
  BentCutFabric,
  BLOCK_FACE_CLASS,
  BLOCK_FLOOR_ROW,
  districtBatch,
  districtCells,
  districtCounts,
  districtTxLimit,
  S8_COUNTERS,
  spineWidthsOf,
  type BlockFaces,
  type DistrictBatch,
  type DistrictContext,
  type DistrictReport,
  type FabricStageContext,
  type FabricStrategy,
  type FaceLadder,
  type LevelledUnit,
  type PartitionResult,
  type RungUse,
  type StopUse,
  type WorkCut,
} from './bentCutFabric.js';
export { BASE_FABRICS, runS8, s8Stage, SEAM_PORTAL_ROW, seamPortalProblems, type S8District, type S8Input, type S8Output, type S8Report } from './stage.js';
