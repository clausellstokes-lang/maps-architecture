// The face partitioners as declared ops (§3.3 *Two op forms*; C-0185 (2)): each a `kernelOp` of its §3.4 kind, applied
// in canonical order by a declared batch. M0-a-07.
import type { FaceId } from '../arena/index.js';
import type { LineageHash } from '../hash/index.js';
import { kernelOp, type KernelOp } from '../tx/index.js';
import type { Cm, FaceRef, Id, VertexRef } from '../types/index.js';
import { claimSubFace, pinVertices, type SubFaceClaim } from './claim.js';
import { radialSplit, ringBand } from './fan.js';
import { absorbSliver, mergeFaces } from './merge.js';
import { connectHole, splitFace, type CutOpts } from './split.js';

type Pt = { readonly x: number; readonly y: number };

export function opSplitFace(lineage: LineageHash, index: number, face: FaceId, cut: readonly Pt[], opts: CutOpts = {}): KernelOp<[FaceId, FaceId]> {
  return kernelOp('splitFace', lineage, index, (o) => splitFace(o, face, cut, opts));
}

export function opConnectHole(lineage: LineageHash, index: number, face: FaceId, cut: readonly Pt[], opts: CutOpts = {}): KernelOp<FaceId> {
  return kernelOp('connectHole', lineage, index, (o) => connectHole(o, face, cut, opts));
}

export function opMergeFaces(lineage: LineageHash, index: number, a: FaceId, b: FaceId): KernelOp<FaceId> {
  return kernelOp('mergeFaces', lineage, index, (o) => mergeFaces(o, a, b));
}

export function opAbsorbSliver(lineage: LineageHash, index: number, face: FaceId, floor: { minWidthCm: Cm | number; minAreaCm2: number }): KernelOp<FaceId> {
  return kernelOp('absorbSliver', lineage, index, (o) => absorbSliver(o, face, floor));
}

export function opClaimSubFace(lineage: LineageHash, index: number, claim: SubFaceClaim, owner: Id): KernelOp<FaceRef> {
  return kernelOp('claimSubFace', lineage, index, (o) => claimSubFace(o, claim, owner));
}

export function opRadialSplit(lineage: LineageHash, index: number, face: FaceId, apex: Pt, raysCdeg: readonly number[], opts: CutOpts = {}): KernelOp<FaceId[]> {
  return kernelOp('radialSplit', lineage, index, (o) => radialSplit(o, face, apex, raysCdeg, opts));
}

export function opRingBand(lineage: LineageHash, index: number, face: FaceId, widthCm: Cm | number, opts: CutOpts = {}): KernelOp<{ band: FaceId[]; core: FaceId }> {
  return kernelOp('ringBand', lineage, index, (o) => ringBand(o, face, widthCm, opts));
}

export function opPinVertices(lineage: LineageHash, index: number, refs: readonly VertexRef[]): KernelOp<void> {
  return kernelOp('pinVertices', lineage, index, (o) => pinVertices(o, refs));
}
