// The face partitioners (M0-a-07; §3.4, §3.6 *`splitFace` contact semantics*, *Roles on shared stretches, and
// slivers*): splitFace, connectHole, mergeFaces, absorbSliver, radialSplit, ringBand, claimSubFace (ring form) and
// pinVertices, each through the doors (insertChain, the removal's re-levelling, setOwner), and their declared ops. The
// scaffold created this index empty (M0-s-01, C-0013); it belongs to M0-a-07. Readings: C-0192.
export { connectHole, splitFace, type CutOpts } from './split.js';
export { absorbSliver, FACE_KIND_RESIDUE, mergeFaces } from './merge.js';
export { radialSplit, ringBand } from './fan.js';
export { claimSubFace, isPinned, pinVertices, type ScoreRaster, type SubFaceClaim } from './claim.js';
export { opAbsorbSliver, opClaimSubFace, opConnectHole, opMergeFaces, opPinVertices, opRadialSplit, opRingBand, opSplitFace } from './ops.js';
