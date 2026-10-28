// @plat/site's water module (M0-e-03; §4.1's S1 row, §4.2 S1 (5), (8), (9), §2.2 rule 7, §2.3, §2.7, §3.10): S1's L0
// batch — the arena's outer ring first, then the water bodies' polygons (river, tributary, estuary) as L0 faces with
// shore and bank edges, the land components by flood fill, every crossing site's two pinned deck_end vertices of a
// Bridge in state site — siteCrossings, Terrain.outfalls, and the batch as a Stage. This index and its folder are
// M0-e-03's. Its files also export, at file level, helpers for the sibling files to import by path; they are not part
// of the package's API and so are not listed here (J263 Q1): geometry.ts `lp`; offset.ts `unitOf`, `offsetRing`,
// `mouthRing` and the ring tools (`cleanRing`, `clearRing`, `isSimple`, `ringsApart`, `clearOf` …); polygons.ts
// `KERNEL_RING`, `provedRings`, `fastRings`, `chainOf`, `simplifyChain`.
export {
  DECK_CLEARANCE_CM,
  DECK_SPAN_SHARE_MAX,
  ESTUARY_SPLIT_M,
  SEED_DEPTH_CM,
  SLIVER_AREA_CM2,
  waterParams,
  type WaterParams,
} from './params.js';
export {
  area2,
  footOn,
  insideRings,
  lineOf,
  nearestOnLine,
  onRing,
  outerRing,
  rayHit,
  reachOf,
  ringGap,
  ringsDist2,
  segDist2,
  segSeg2,
  type Line,
  type RayHit,
  type Reach,
} from './geometry.js';
export { estuaryId, splitEstuary, waterPolygons } from './polygons.js';
export { siteCrossings, type CrossingOptions } from './crossings.js';
export {
  BANKED_KINDS,
  bridgeId,
  landComponents,
  leftFaces,
  outerRingBatch,
  siteBridge,
  waterFaces,
  type L0BatchOptions,
  type WaterFacesOptions,
} from './faces.js';
export { intoOf, outfalls, type OutfallOptions } from './outfalls.js';
export { l0WorkLimit, REFERENCES_ROW, runS1, S1_COUNTERS, s1Stage, type S1StageOptions } from './stage.js';
export type {
  CrossingSite,
  Deck,
  DroppedBody,
  LandComponent,
  S1Input,
  S1Output,
  S1Report,
  WaterFaces,
  WaterPart,
  WaterReach,
} from './types.js';
