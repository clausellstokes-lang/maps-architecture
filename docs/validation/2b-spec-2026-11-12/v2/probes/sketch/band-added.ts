import { emptyLog } from '../tx/state.js';
import { canonicalRing, compareRings, simpleLoops } from './winding.js';
interface EngineSpec {
  readonly reads?: ReadonlyMap<FaceId, Read>;
  readonly quiet?: boolean;
}
    const given = spec.reads?.get(f);
    const r = given !== undefined ? ok(given) : readOn(t, f, spec, cache);
  if (spec.quiet !== true) CLOSINGS.set(p, log);
const PLACEHOLDER: Id = 'arr:lay';
function loopsOf(p: Plat, walk: readonly HalfEdgeId[]): Ring[] {
  const out: Ring[] = [];
  for (const loop of simpleLoops(walk.map((h) => p.halfEdges.origin[h]))) {
    const q = unspiked(loop.map((v) => ({ x: p.vertices.x[v], y: p.vertices.y[v] })) as Ring);
    if (q.length >= 3 && area2(q) !== 0) out.push(canonicalRing(q));
  }
  return out;
}
export function layOne(o: Overlay, face: FaceId, read: Read, widths: SpineWidths): KernelResult<Ring[]> {
  const t = openTx(o);
  const p = t.plat;
  const h = p.faces[1].owner[face];
  const entity = h >= 0 ? idOf(p, h) : PLACEHOLDER;
  const v: OpenTx = { ...t, level: (t.level < 2 ? 2 : t.level) as Level, work: { total: 0, counts: new Map() }, warnings: [], journal: { vertices: [], pairs: [], split: [], steiner: 0, changed: [] }, log: emptyLog(), failed: null, closed: false, op: 'lay' };
  const save = opSave(v);
  try {
    const r = bandCore(v, [face], { widths, edgeRole: 'kerb', entityOf: () => entity, owner: null, vertexContacts: true, reads: new Map([[face, read]]), quiet: true });
    if (!r.ok) return err(r.code, r.detail);
    const rings: Ring[] = [];
    if (r.value.whole.includes(face)) for (const w of faceWalk(p, 1, face)) rings.push(...loopsOf(p, w));
    for (const c of r.value.blocks) for (const w of faceWalk(p, v.level, c)) rings.push(...loopsOf(p, w));
    return ok(rings.sort(compareRings), r.warnings);
  } finally {
    rollback(v, save, err('E_INVARIANT', 'lay: the dry lay put back'));
    v.closed = true;
  }
}
