// tileRings(rings) — the seed clip (§3.4 *Transient arenas*: "the faces of one overlay of the storey's rings on the
// arrangement (§3.7's boolean machinery), each face going to the first ring in the order passed (§2.6's clip order)
// that contains it and each ring's faces united"; §3.4's signature; §13.1's fixtures and oracle comparison). M0-a-09;
// built at M0 inside the arrangement though its reader, the transient arena, is M6-P's (C-0041).
//
// One overlay of every ring (each ring its own operand, M0-a-08's scratch arrangement), every face labelled with each
// ring's winding number, each face given to the first ring whose winding there is not 0, and each ring's faces traced
// into its pieces: outer rings counter-clockwise, each from its lowest-leftmost vertex, in that vertex order. "Each ring
// is thereby minus every ring before it — a ring the earlier ones cover has no piece, one they cut in two has two — and
// every ring, an earlier one included, carries each crossing vertex the overlay placed on its sides, so the joints are
// shared sides vertex for vertex": a straight-through vertex of a piece is dropped unless the overlay has a third edge
// there (a crossing, or another ring's vertex on the side) — such a vertex stays a vertex of every piece through it.
// "A piece left with a hole — earlier rings lying inside a later one without reaching its sides — is refused (detail
// `overlap`, naming a vertex of the hole)": `TileOverlap` names the ring (its index) and the hole's lowest-leftmost
// vertex, and carries the overlay's warnings. No rings → []. A ring whose pieces the overlay left with no area has none. The warnings are the overlay's
// (§13.1's split). Readings: C-0212.
import { isHalfEdgeLive, type FaceId, type Plat, type VertexId } from '../arena/index.js';
import { area2, err, ok, orient2d, type KernelResult, type Warning } from '../num/index.js';
import type { Cm, LatticePoint } from '../types/index.js';
import { buildOverlay, canonicalRing, compareRings, windingLabels, type Ring } from './winding.js';

/** tileRings' refusal of a piece with a hole: E_DEGENERATE `overlap`, the ring and a vertex of the hole (§3.4). */
export type TileOverlap = Extract<KernelResult<Ring[][]>, { ok: false }> & {
  readonly detail: 'overlap';
  /** The index of the ring whose piece holds the hole. */
  readonly ring: number;
  /** The hole's lowest-leftmost vertex. */
  readonly at: LatticePoint;
  /** The overlay's warnings (§3.7's split reads a refusal's case by them, as an empty boolean's, C-0196 (4)). */
  readonly warnings: Warning[];
};

/** A closed vertex walk cut into simple loops at every vertex it visits twice (each loop in walk order). */
function simpleLoops(cycle: readonly VertexId[]): VertexId[][] {
  const loops: VertexId[][] = [];
  const stack: VertexId[] = [];
  const at = new Map<VertexId, number>();
  for (const v of cycle) {
    const i = at.get(v);
    if (i !== undefined) {
      const loop = stack.splice(i);
      for (const u of loop) at.delete(u);
      loops.push(loop);
    }
    at.set(v, stack.length);
    stack.push(v);
  }
  if (stack.length > 0) loops.push(stack);
  return loops;
}

/** The loop without its straight-through vertices, cyclically — but never a vertex `keep` names. */
function dropStraight(loop: LatticePoint[], keep: (q: LatticePoint) => boolean): LatticePoint[] {
  let pts = loop;
  let changed = true;
  while (changed && pts.length >= 3) {
    changed = false;
    const out: LatticePoint[] = [];
    const n = pts.length;
    for (let i = 0; i < n; i += 1) {
      const a = out.length > 0 ? out[out.length - 1] : pts[n - 1];
      const v = pts[i];
      const b = pts[i + 1 === n ? 0 : i + 1];
      const straight = !keep(v) && orient2d(a.x, a.y, v.x, v.y, b.x, b.y) === 0 && (v.x - a.x) * (b.x - v.x) + (v.y - a.y) * (b.y - v.y) > 0;
      if (straight) changed = true;
      else out.push(v);
    }
    pts = out;
  }
  return pts;
}

/** The outgoing live half-edges' count at each vertex of the overlay. */
function degrees(p: Plat): Map<VertexId, number> {
  const d = new Map<VertexId, number>();
  const O = p.halfEdges.origin;
  const half = 2 * p.slots.pair.top;
  for (let h = 0; h < half; h += 1) if (isHalfEdgeLive(p, h)) d.set(O[h], (d.get(O[h]) ?? 0) + 1);
  return d;
}

/**
 * The boundary of the faces `mine` selects, as rings (outer counter-clockwise, holes clockwise), keeping every vertex
 * of degree three or more (`deg`) and every vertex where the boundary meets itself.
 */
function trace(p: Plat, faceOf: Int32Array, mine: (f: FaceId) => boolean, deg: ReadonlyMap<VertexId, number>): Ring[] {
  const half = faceOf.length;
  const boundary = (h: number): boolean => faceOf[h] >= -1 && mine(faceOf[h]) && !mine(faceOf[h ^ 1]);
  const next = p.halfEdges.next;
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const leaving = new Map<VertexId, number>();
  for (let h = 0; h < half; h += 1) if (boundary(h)) leaving.set(O[h], (leaving.get(O[h]) ?? 0) + 1);
  const keepAt = new Set<string>();
  for (const [v, k] of deg) if (k >= 3) keepAt.add(`${String(X[v])},${String(Y[v])}`);
  for (const [v, k] of leaving) if (k > 1) keepAt.add(`${String(X[v])},${String(Y[v])}`);
  const seen = new Uint8Array(half);
  const rings: Ring[] = [];
  for (let h0 = 0; h0 < half; h0 += 1) {
    if (seen[h0] === 1 || !boundary(h0)) continue;
    const cycle: VertexId[] = [];
    let h = h0;
    let guard = 0;
    do {
      seen[h] = 1;
      cycle.push(O[h]);
      let g = next[h];
      while (!boundary(g)) {
        g = next[g ^ 1];
        if (++guard > half * 4) throw new Error('tileRings: a piece\'s boundary does not close');
      }
      h = g;
      if (++guard > half * 4) throw new Error('tileRings: a piece\'s boundary does not close');
    } while (h !== h0);
    for (const loop of simpleLoops(cycle)) {
      const pts = dropStraight(
        loop.map((v) => ({ x: X[v] as Cm, y: Y[v] as Cm })),
        (q) => keepAt.has(`${String(q.x)},${String(q.y)}`),
      );
      if (pts.length < 3 || area2(pts) === 0) continue;
      rings.push(canonicalRing(pts));
    }
  }
  return rings.sort(compareRings);
}

/**
 * §3.4's `tileRings`: per input ring, in the order passed, its pieces — counter-clockwise, none where the rings before
 * it cover it; no rings → []. A piece with a hole is refused E_DEGENERATE `overlap` (a `TileOverlap`); a coordinate off
 * the lattice E_OUT_OF_RANGE.
 */
export function tileRings(rings: readonly (readonly LatticePoint[])[]): KernelResult<Ring[][]> {
  if (rings.length === 0) return ok([]);
  const ov = buildOverlay(rings.map((r) => [r]));
  if (!ov.ok) return err(ov.code, ov.detail);
  const labels = windingLabels(ov.value);
  if (!labels.consistent) return err('E_INVARIANT', 'winding');
  // Each face's ring: the first whose winding there is not 0 (−1: none).
  const first = new Map<FaceId, number>();
  for (const [f, w] of labels.winding) {
    let i = -1;
    for (let j = 0; j < w.length; j += 1) {
      if (w[j] !== 0) {
        i = j;
        break;
      }
    }
    first.set(f, i);
  }
  const deg = degrees(ov.value.plat);
  const pieces: Ring[][] = [];
  for (let i = 0; i < rings.length; i += 1) {
    const mine = trace(ov.value.plat, labels.faceOf, (f) => first.get(f) === i, deg);
    const hole = mine.find((r) => area2(r) < 0);
    if (hole !== undefined) {
      const at = canonicalRing(hole)[0];
      const refusal: TileOverlap = { ok: false, code: 'E_DEGENERATE', detail: 'overlap', ring: i, at: { x: at.x, y: at.y }, warnings: ov.value.warnings.map((w) => ({ ...w })) };
      return refusal;
    }
    pieces.push(mine);
  }
  return ok(pieces, ov.value.warnings);
}
