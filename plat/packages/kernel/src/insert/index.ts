// Insertion (§3.4 insertChain, splitThrough; §3.6): M0-a-05's index, re-exporting M0-a-04's steps 1 – 2 beside its own
// steps 3 – 5 (C-0169 (7)). Every name here is public through the package barrel (API.md Appendix B); the folder's
// other exported helpers are read by path.
export {
  addWarning,
  CHAIN_CLASSES,
  CLASS_OUTCOMES,
  charge,
  classOutcome,
  classRefusal,
  INSERT_ATTRACT_QUERIES,
  INSERT_PLACEMENT_CANDIDATES,
  INSERT_POINTS,
  insertTx,
  type ChainClass,
  type ClassOutcome,
  type ClassReason,
  type InsertJournal,
  type InsertTx,
  type WorkCharged,
} from './classes.js';
export { decimate, simpleRuns, type ChainRun, type Decimated, type DecimateOpts, type Knot } from './decimate.js';
export { attractRun, attractVertex, planAttraction, applyAttraction, type Attraction, type AttractionPlan, type RunVertex } from './attractVertex.js';
export { placePoint, type Crossing, type Placement } from './placement.js';
export { allocateAnchor, applySplitPlan, planSplitThrough, splitThrough, type PlannedRow, type SplitPlan } from './splitThrough.js';
export { attractStretch, chainJournal, promote, type ChainCtx, type ChainJournal, type FaceDelta, type Landing, type StretchObstacle } from './stretch.js';
export { exactCrossings, INSERT_CROSSINGS, resolveCrossings, type ExactCrossing, type FirstCrossing } from './crossings.js';
export { chainCorner, wedgeBound, type ChainCorner } from './wedge.js';
export { MAX_PASSES, snapRound } from './snapRound.js';
export { rewalk, TX_FACES_WALKED, type Touched } from './rewalk.js';
export { insertChain, type ChainInsert, type InsertChainOpts } from './insertChain.js';
