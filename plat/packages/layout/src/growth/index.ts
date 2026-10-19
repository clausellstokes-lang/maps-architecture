// The growth stages' module (§4.4 S5a – S5d; M0-c-04: boundary.ts, mainRoads.ts; M0-c-05: heading.ts, legality.ts,
// proposals.ts, prune.ts, capacity.ts). The scaffold created this index empty (M0-s-01, C-0013); it belongs to M0-c-05,
// whose duty it is to re-export M0-c-04's two files as well (C-0244 (11)). Its exports are listed by name, values and
// types apart, as every other folder's index lists them: a module's new export is public only once it is named here
// (queue row L29; the names are exactly those the earlier `export *` lines gave, 137).
// M0-c-04's S5a boundaries (./boundary.ts)
export {
  boundaryCrossings, commitS3ThenStage1, HA_CM2, insertOnOutline, landOf, MAINROAD_CONCERN, outlineMeasures,
  PLAZA_ID, resettleT, S5_STAGE, squareGates, stageBoundary, traceStage, traceStage1, unionField, wayLines, withPins
} from './boundary.js';
export type {
  BoundaryCrossing, Resettled, ResettleOptions, Stage1Options, StageBoundary, StageBoundaryOptions,
  StageQuotas, StageTrace, StageTraceOptions, StageTraceResult, WayLine
} from './boundary.js';
// M0-c-04's S5b main roads and S5a's trace (./mainRoads.ts)
export {
  ALTERNATIVES, APPROACH_NODES, growthStart, mainRoadCount, mainRoadsStep, mainRoadStream, RADIAL_COS,
  ringMask, runS5ab, s5aStage, s5bStage, s5bWorkLimit, spawnPrimaries, stageWalled, traceStep, wallClearance
} from './mainRoads.js';
export type {
  GrowthInput, GrowthStage, GrowthState, MainRoad, MainRoadCount, MainRoadPick, RoadFault, S5Input,
  SpawnOptions, Unserved
} from './mainRoads.js';
// S5c's heading model (./heading.ts)
export {
  correlationOf, headingModel, headingStep, initialCurvature, RAD_PER_CDEG, wrapAngle
} from './heading.js';
export type {
  HeadingModel, HeadingPreset, HeadingState, HeadingStepped, HeadingStepState
} from './heading.js';
// S5c's legality (./legality.ts)
export {
  classRankOf, crossingMatrix, FeatureIndex, legal, lineAngle, streetOrigin
} from './legality.js';
export type {
  Accepted, CrossingAction, CrossingMatrix, EndKind, Feature, FeatureKind, LegalityContext,
  LegalityRules, Rejected, RejectWhy, StepCandidate, StepCrossing, StreetOrigin, Verdict, XY
} from './legality.js';
// S5c's growth (./proposals.ts)
export {
  acceptedStreets, growStreets, growthArea, growthBatch, growthRecord, growthRules, growthStageLineage,
  growthStep, growthStreams, idNumber, joinState, keepRecord, PRECISION_CODES, s5cStage
} from './proposals.js';
export type {
  GrownStreet, GrowthArea, GrowthAreaOptions, GrowthBatch, GrowthClass, GrowthRuleOptions, GrowthRules,
  GrowthRung, GrowthSeed, GrowthStepOptions, GrowthStreams, Proposal, S5cInput, S5cRecord, StreetGrowOptions
} from './proposals.js';
// the between-stage prune and trim (./prune.ts)
export {
  pruneAndTrim
} from './prune.js';
export type {
  PruneOptions, PruneRecord, StageRef
} from './prune.js';
// S5d's capacity check and the whole S5 run (./capacity.ts)
export {
  CAPACITY_TOLERANCE, capacityCheck, capacityStep, runS5, s5dStage, stageOneReach, standInDemand,
  syntheticRamp
} from './capacity.js';
export type {
  BudgetRung, CapacityDemand, CapacityOptions, CapacityResult, FieldProvider, PricedFace, S5dInput,
  S5dRecord, S5Options, S5Run
} from './capacity.js';
