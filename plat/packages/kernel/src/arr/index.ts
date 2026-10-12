// The arrangement (§3.7, §3.4): booleans, buffers, offsetFace and insetRing on the scratch overlay by winding number
// (M0-a-08's five re-export lines), then kerb, corridorUnion, bandUnion and tileRings (M0-a-09's four; C-0122, C-0123).
export { buildOverlay, windingLabels, type EmptyResult, type Ring, type ScratchOverlay, type WindingLabels } from './winding.js';
export { booleans, type BooleanOp, type FillRule } from './booleans.js';
export { arcSteps, buffer, bufferParts, maxArcStep, ringEdgeParts, SAGITTA_CM, UNION_FAN_IN, type EndKind, type JoinKind } from './buffer.js';
export { canonicalFaceRings, faceEdges, offsetFace, type FaceEdge } from './offsetFace.js';
export { insetRing, type InsetCollapsed } from './insetRing.js';
export { kerb, type SpineEnd, type SpineWidth, type SpineWidths } from './kerb.js';
export { corridorUnion, opCorridorUnion } from './corridorUnion.js';
export { bandUnion, opBandUnion, type BandChain, type BandResult } from './bandUnion.js';
export { tileRings, type TileOverlap } from './tileRings.js';
