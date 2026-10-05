// The arrangement (§3.7, §3.4): booleans, buffers, offsetFace and insetRing on the scratch overlay by winding number
// (M0-a-08) — then kerb, corridorUnion, bandUnion and tileRings (M0-a-09). The scaffold created this index empty
// (M0-s-01, C-0013); M0-a-08 writes its five re-export lines and hands the file to M0-a-09, which appends its four
// (C-0122, C-0123).
export { buildOverlay, windingLabels, type EmptyResult, type Ring, type ScratchOverlay, type WindingLabels } from './winding.js';
export { booleans, type BooleanOp, type FillRule } from './booleans.js';
export { arcSteps, buffer, bufferParts, maxArcStep, SAGITTA_CM, type EndKind, type JoinKind } from './buffer.js';
export { faceEdges, offsetFace, type FaceEdge } from './offsetFace.js';
export { insetRing, type InsetCollapsed } from './insetRing.js';
