    const retry = run.value.retry.length > 0 ? run.value.retry : offRead(t, spec, run.value.alongs);
function offRead(t: OpenTx, spec: EngineSpec, alongs: readonly Along[]): string[] {
  if (t.level !== 2 || alongs.length === 0) return [];
  const p = t.plat;
  const out: string[] = [];
  const again = new Map<FaceId, readonly Ring[] | null>();
  for (const a of alongs) {
    if (!again.has(a.face)) {
      const r = readOn(t, a.face, spec);
      again.set(a.face, r.ok ? r.value.kerb : null);
    }
    const rings = again.get(a.face) ?? null;
    if (rings === null || !onBoundary(rings, pointOf(p, a.far))) out.push(endKey(a.face, a.piece, a.end));
  }
  return out;
}
    const r = readOn(t, f, spec, cache);
  CLOSINGS.set(p, log);
