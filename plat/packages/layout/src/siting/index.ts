// @plat/layout's siting module (M0-c-01; §4.2 S3, §4.3, §4.4 S5a; C-0016, C-0017, C-0032, C-0076, C-0085): the S3
// slice as data — the lattice and costs, the gate picks, the gate routes, the field T, the stage-1 level set, the gates,
// the plaza and the destinations. No arena is written here; the commits are M0-c-02's. Created empty by the scaffold
// (M0-s-01, C-0013); this index and its folder belong to M0-c-01.
export * from './types.js';
export { angularGap, bearingCdeg, compactnessOf, insideRing, ringIsSimple } from './geom.js';
export { buildLattice, edgeBetween, edgeCost, latticeSpacing, siteCosts } from './lattice.js';
export { fieldSources, fieldT, roadSet, stageThreshold, type FieldOptions, type WaterPull } from './field.js';
export { levelSet, marchingRings, OUTLINE_CHAIKIN_PASSES, selectNodes, type LevelSetOptions } from './levelset.js';
export { gateCount, gatePicks, gatesOnBoundary, pickCandidates, PICK_BEARING_WEIGHT, PICK_JITTER, PICK_RANKED, PICK_SLOPE_WEIGHT, type PickOptions } from './gates.js';
export { gateRoutes, plazaTree, type RouteOptions } from './routes.js';
export { plaza, PLAZA_AREA_BAND_HA, PLAZA_COMPACTNESS_MIN, PLAZA_VERTICES, type PlazaOptions } from './plaza.js';
export { GATE_REDRAWS, s3Slice, stageA, type SliceOptions } from './slice.js';
