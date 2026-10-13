// offsetFace(face, perEdgeCm) (§3.4: "face − ⋃ buffer(edgeᵢ, dᵢ)"; §3.7 *Insets*; §3.11 *no input*). M0-a-08.
//
// §3.7: "Per-edge distances on any face use the buffer difference (`offsetFace`), so a concave, mixed-class face — the
// usual face of organic growth — has one correct construction." Each edge of the face is buffered by its own distance
// with round ends — so every point left lies at least dᵢ from edge i, a reflex corner rounded and a convex one kept
// sharp — built as each edge's strip and, at each vertex, one disc of the larger of its two edges' distances (the union
// of the two round ends there; `ringEdgeParts`, C-0196 (3)), and the union is taken from the face on the scratch
// arrangement in one overlay (the face's rings one operand, every part the other, kept where the first is inside and
// the second is not). An edge whose distance is 0 adds nothing.
//
// Readings (C-0196 (3)): `offsetFace` is a service that reads the open transaction's arena (§3.4 *Arenas, keys and
// services*: "kerb, offsetFace, insetRing … read the open transaction's arena and are called only inside one"), so it
// takes that transaction first — `offsetFace(tx, face, perEdgeCm)`, the façade (M0-a-16) binding the design's
// two-argument form — and reads the face at the transaction's level. The face's edges, in `perEdgeCm`'s order, are
// `faceEdges`': the outer ring from its lowest-leftmost vertex counter-clockwise, then each hole from its own
// lowest-leftmost vertex in that vertex order, an edge between two consecutive vertices of the level walk (a finer
// Steiner vertex on a coarser route is a vertex of the walk, §2.2 rule 2) — an order of lattice points, never of slots.
// A distance list of another length, or a distance that is negative or not finite, is the caller's error (a
// RangeError). An empty result is E_DEGENERATE `empty` (§3.11), carrying the overlay's warnings.
import { type FaceId } from '../arena/index.js';
import { faceRings } from '../geom/boundary.js';
import { distinctRing } from '../geom/common.js';
import type { InsertTx } from '../insert/classes.js';
import { ok, type KernelResult } from '../num/index.js';
import type { Cm, LatticePoint } from '../types/index.js';
import { ringEdgeParts, SAGITTA_CM } from './buffer.js';
import { canonicalRing, compareRings, emptyResult, overlayRegion, type Ring } from './winding.js';

/** One edge of a face, in `faceEdges`' order: its two lattice points, the face on its left. */
export interface FaceEdge {
  readonly a: LatticePoint;
  readonly b: LatticePoint;
}

/**
 * The face's rings at the transaction's level in canonical order: the outer ring (counter-clockwise) from its
 * lowest-leftmost vertex, then the holes (clockwise), each from its lowest-leftmost vertex, in that vertex order.
 */
export function canonicalFaceRings(tx: InsertTx, face: FaceId): Ring[] {
  const rings = faceRings(tx.plat, tx.level, face).map(distinctRing);
  const outer = canonicalRing(rings[0]);
  const holes = rings.slice(1).map(canonicalRing).sort(compareRings);
  return [outer, ...holes];
}

/** The diagonal of the rings' bounding box, rounded up (cm). */
function reachOf(rings: readonly Ring[]): number {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const r of rings) {
    for (const p of r) {
      if (p.x < x0) x0 = p.x;
      if (p.y < y0) y0 = p.y;
      if (p.x > x1) x1 = p.x;
      if (p.y > y1) y1 = p.y;
    }
  }
  return x1 < x0 ? 0 : Math.ceil(Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)));
}

/** The face's edges in `perEdgeCm`'s order (see the module comment). */
export function faceEdges(tx: InsertTx, face: FaceId): FaceEdge[] {
  const out: FaceEdge[] = [];
  for (const ring of canonicalFaceRings(tx, face)) {
    const n = ring.length;
    if (n < 2) continue;
    for (let i = 0; i < n; i += 1) out.push({ a: ring[i], b: ring[i + 1 === n ? 0 : i + 1] });
  }
  return out;
}

/**
 * §3.4's `offsetFace`: the face less the union of every edge's buffer by its own distance (round ends), as rings; an
 * empty result E_DEGENERATE `empty` (§3.11).
 */
export function offsetFace(tx: InsertTx, face: FaceId, perEdgeCm: readonly (Cm | number)[]): KernelResult<Ring[]> {
  const rings = canonicalFaceRings(tx, face);
  const edges = faceEdges(tx, face);
  if (perEdgeCm.length !== edges.length) {
    throw new RangeError(`offsetFace: one distance per edge of the face (${String(edges.length)}), got ${String(perEdgeCm.length)}`);
  }
  for (const d of perEdgeCm) {
    if (!(d >= 0 && d < Infinity)) throw new RangeError(`offsetFace: a distance is a finite number ≥ 0, got ${String(d)}`);
  }
  // An edge set back by the face's whole reach takes the whole face (C-0196 (3)): every point of the face lies within
  // its box's diagonal of every edge, and a round part loses at most its sagitta and a snap to its chords, so a distance
  // beyond diagonal + SAGITTA_CM + 2 leaves nothing — the result the overlay would give, without parts that could
  // reach past the lattice.
  if (perEdgeCm.some((d) => d >= reachOf(rings) + SAGITTA_CM + 2)) return emptyResult([]);
  const parts = ringEdgeParts(rings, perEdgeCm);
  if (!parts.ok) return parts;
  const r = overlayRegion([rings, parts.value], (w) => w[0] !== 0 && w[1] === 0);
  if (!r.ok) return r;
  if (r.value.length === 0) return emptyResult(r.warnings);
  return ok(r.value, r.warnings);
}
