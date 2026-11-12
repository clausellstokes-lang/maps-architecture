export function kerb(tx: Overlay, face: FaceId, widths: SpineWidths): KernelResult<Ring[]> {
  const r = readKerb(tx, face, widths);
  if (!r.ok) return err(r.code, r.detail);
  return ok(r.value.kerb, r.value.warnings);
}
