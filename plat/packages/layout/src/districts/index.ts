// @plat/layout's districts module (M0-e-04; §4.5 S6 Districts and quarters, §4.1's S6 row, §6.1, §6.3, §9.1, §13.2,
// §5.3; C-0035, C-0046, C-0085, C-0122; readings C-0245): S6 as a callback-form Stage — the settlement perimeter,
// the coarse-face graph, the seeds and the grower with its leftover and merge rules, the count law, the typing stand-in
// over the synthetic demand table, the quarter merge tree and the minimal Seam records. Created empty by the scaffold
// (M0-s-01, C-0013); this index and its folder belong to M0-e-04.
export type { DistrictTyping, GrowResult, GrowSeed, Grown, MergeRecord, QuarterNode, S6Output, S6Report, SeedAnchor, SeedFeature, SeedKind, TurnRecord } from './types.js';
export { districtCells as s6DistrictCells, minBarrierClass, rosterBuildings, s6Table, typingCells, type DistrictCells, type KindRow, type RelationRow, type TypingCells } from './table.js';
export { countLaw, quarterCount, type CountLaw } from './law.js';
export { convolution, isSumRing, OVERLAY_TOLERANCE_CM, settlementPerimeter, settlementPerimeterByBuffer, simpleCcw, SUM_TOLERANCE_CM, unloop, UNLOOP_WINDOW, type PerimeterOptions } from './perimeter.js';
export { BARRIER, boundaryLoops, districtOfFace, hullCompactness, polsbyPopper, EDGE_TEST_BARRIERS, faceGraph, faceLineage, textLineage, WAY_CLASS_ORDER, type CoarseFace, type FaceGraph, type FaceGraphOptions, type FaceLink, type FaceSide } from './faces.js';
export { grow, type GrowFaces, type GrowOptions, type TurnStream } from './grow.js';
export { compartments, placeSeeds, type PlacedSeeds } from './seeds.js';
export { typeDistricts, type TypingDistrict, type TypingOptions } from './typing.js';
export { quarterTree, type QuarterAdjacency, type QuarterLeaf, type QuarterOptions, type QuarterTree } from './quarters.js';
export { seamEdges, seamRuns, type SeamRun, type SideOf } from './seams.js';
export { growerTurnLimit, HINTERLAND_INDEX, QUARTER_RUN_INDEX, runS6, s6Batch, s6Stage, S6_COUNTERS, s6WorkLimit, SEAM_RUN_INDEX, siteFeatures, type S6Batch, type S6Input } from './stage.js';
