import { layOne } from './bandUnion.js';
export function kerb(tx: Overlay, face: FaceId, widths: SpineWidths): KernelResult<Ring[]> {
  const r = readKerb(tx, face, widths);
  if (!r.ok) return err(r.code, r.detail);
  return layOne(tx, face, r.value, widths);
}
function resolved(X: readonly Ring[], rings: readonly (readonly LatticePoint[])[]): Ring[] { return X.slice(); }
