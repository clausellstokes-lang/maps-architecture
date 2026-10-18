// insetRing(face, dCm) (§3.4; §3.7 *Insets*; §3.11). M0-a-08.
//
// §3.7: "The per-edge half-plane inset of the 2017 idea survives only as `insetRing`, for a uniform inset of a face
// whose convexity is checked exactly (`E_NON_CONVEX` otherwise, and the caller takes `offsetFace` for an inward inset or
// unites the face with a `buffer` of its ring for an outward one): a `dCm` of 0 returns the face's ring; a negative
// `dCm` offsets outward on the same path and never collapses; an inset larger than the inradius returns `E_DEGENERATE`
// (detail `collapsed`, carrying the last non-empty distance)."
//
// The path: the face's outer ring (counter-clockwise) is convex when every turn is a left turn or straight (exact
// `orient2d`); a face with a hole is not convex. Each edge's line is moved inward by dCm (outward for a negative dCm)
// and the half-planes are intersected by successive clipping in doubles (Sutherland–Hodgman; from the ring itself
// inward, from a box enclosing the lattice outward), the result's points snapped to the lattice and the ring passed
// through the scratch arrangement (`winding.ts`), so it re-enters through `insertChain` like every output. Where nothing
// is left the inset has collapsed: the refusal carries the largest whole distance below dCm whose inset is not empty
// (`lastCm`, found by bisection on the same path; 0 is the face itself) and that inset as its `partial`, and the
// warnings of the inset at dCm (C-0196 (5)). A trial of the bisection that the scratch arrangement refuses is not an
// empty inset: §3.7 names emptiness only as the collapse past the inradius, so the trial's typed refusal is the
// operation's result, its code and detail unchanged, and never lowers `lastCm` (KI-7; the refusal census R-16).
// Readings (C-0196 (5)): like `offsetFace` it takes the open transaction first and reads the face at its level;
// a dCm that is not a whole number of centimetres is the caller's error (a RangeError). §3.11's row lists `insetRing`
// among the operations whose empty result is `empty`; §3.7 and this item name the inset past the inradius — the one
// way an inset of a face can come out empty — `collapsed`, which this function returns.
import { type FaceId } from '../arena/index.js';
import type { InsertTx } from '../insert/classes.js';
import { degenerate, err, LATTICE, ok, orient2d, snap, type KernelResult, type Warning } from '../num/index.js';
import { divScaled } from '../num/exact.js';
import type { Cm, LatticePoint } from '../types/index.js';
import { unitOf, type XY } from '../geom/common.js';
import { canonicalFaceRings } from './offsetFace.js';
import { overlayRegion, type Ring } from './winding.js';

/** The collapsed inset's refusal: E_DEGENERATE `collapsed`, the last non-empty distance and its inset (§3.7). */
export type InsetCollapsed = Extract<KernelResult<Ring[]>, { ok: false }> & {
  readonly detail: 'collapsed';
  /** The largest whole distance below dCm whose inset is not empty. */
  readonly lastCm: Cm;
  /** That inset's rings. */
  readonly partial: Ring[];
  /**
   * The warnings of the inset at dCm on its way to nothing (C-0196 (5)): a half-plane inset that is not empty in doubles
   * but thinner than the insertion rules keep is emptied by attraction (W_ATTRACTED), an attracted case of §3.7's split.
   */
  readonly warnings: Warning[];
};

/**
 * Is the counter-clockwise ring convex — every turn a left turn or straight (`orient2d` ≥ 0 at every vertex), exactly?
 * No tolerance: a dent of 1 cm is a right turn and the face is not convex (§3.7 *Insets*: "convexity is checked
 * exactly"); a straight-through vertex — a neighbour's T-junction on a side — keeps it convex (C-0196 (5)). This is
 * the inset path's own test on the ring as the face walks it. `geom/lir.ts` keeps a different, private test — the
 * ring, its repeats and straight-through vertices dropped, is a rotation of its strict hull in either direction — so
 * it reads a clockwise ring as convex too, and refuses a ring whose left turns wind round more than once, which the
 * test here accepts (a face's ring never does).
 */
export function isConvexRing(ring: readonly LatticePoint[]): boolean {
  const n = ring.length;
  if (n < 3) return false;
  for (let i = 0; i < n; i += 1) {
    const a = ring[i === 0 ? n - 1 : i - 1];
    const v = ring[i];
    const b = ring[i + 1 === n ? 0 : i + 1];
    if (orient2d(a.x, a.y, v.x, v.y, b.x, b.y) < 0) return false;
  }
  return true;
}

/**
 * The polygon clipped to the half-plane (x − a)·n ≥ d (Sutherland–Hodgman, one plane). An edge whose two signed
 * distances differ by less than divScaled's floor (2⁻²⁰ cm) crosses the line at its first point. Exported for its pin.
 */
export function clip(poly: readonly XY[], a: XY, n: XY, d: number): XY[] {
  const out: XY[] = [];
  const m = poly.length;
  for (let i = 0; i < m; i += 1) {
    const p = poly[i];
    const q = poly[i + 1 === m ? 0 : i + 1];
    const sp = (p.x - a.x) * n.x + (p.y - a.y) * n.y - d;
    const sq = (q.x - a.x) * n.x + (q.y - a.y) * n.y - d;
    if (sp >= 0) out.push(p);
    if (sp >= 0 !== sq >= 0) {
      const s = divScaled(sp, sp - sq, 'length') ?? 0;
      out.push({ x: p.x + (q.x - p.x) * s, y: p.y + (q.y - p.y) * s });
    }
  }
  return out;
}

/** The half-plane inset of the convex ring by dCm in doubles (outward for a negative dCm); [] when nothing is left. */
function halfPlanes(ring: readonly LatticePoint[], dCm: number): XY[] {
  const big = 2 * LATTICE.rangeCm;
  let poly: XY[] =
    dCm > 0
      ? ring.map((p) => ({ x: p.x, y: p.y }))
      : [
          { x: -big, y: -big },
          { x: big, y: -big },
          { x: big, y: big },
          { x: -big, y: big },
        ];
  const n = ring.length;
  for (let i = 0; i < n && poly.length > 0; i += 1) {
    const a = ring[i];
    const b = ring[i + 1 === n ? 0 : i + 1];
    const u = unitOf({ x: b.x - a.x, y: b.y - a.y });
    if (u === null) continue;
    poly = clip(poly, a, { x: -u.y, y: u.x }, dCm);
  }
  return poly;
}

/** The inset at dCm on the path, as rings ([] when it is empty); E_OUT_OF_RANGE when a point leaves the lattice. */
function insetAt(ring: readonly LatticePoint[], dCm: number): KernelResult<Ring[]> {
  const poly = halfPlanes(ring, dCm);
  const pts: LatticePoint[] = [];
  for (const q of poly) {
    const s = snap(q.x, q.y);
    if (!s.ok) return err(s.code, s.detail);
    const last = pts[pts.length - 1];
    if (last === undefined || last.x !== s.value.x || last.y !== s.value.y) pts.push(s.value);
  }
  while (pts.length > 1 && pts[0].x === pts[pts.length - 1].x && pts[0].y === pts[pts.length - 1].y) pts.pop();
  if (pts.length < 3) return ok([]);
  return overlayRegion([[pts]], (w) => w[0] !== 0);
}

/**
 * §3.4's `insetRing`: the face's uniform inset by dCm on the half-plane path — the face's ring at 0, outward below 0 —
 * E_NON_CONVEX for a face that is not convex, E_DEGENERATE `collapsed` past the inradius (an `InsetCollapsed`); a
 * refusal of the scratch arrangement, at dCm or at a trial distance of the bisection, passed on as it came.
 */
export function insetRing(tx: InsertTx, face: FaceId, dCm: Cm | number): KernelResult<Ring[]> {
  if (!Number.isInteger(dCm)) throw new RangeError(`insetRing: dCm is a whole number of centimetres, got ${String(dCm)}`);
  const rings = canonicalFaceRings(tx, face);
  const ring = rings[0];
  if (rings.length > 1 || !isConvexRing(ring)) return err('E_NON_CONVEX', 'face');
  if (dCm === 0) return ok([ring.slice()]);
  const r = insetAt(ring, dCm);
  if (!r.ok) return r;
  if (r.value.length > 0) return ok(r.value, r.warnings);
  // Collapsed: the largest whole distance below dCm with a non-empty inset, by bisection (0 is the face itself).
  let lo = 0;
  let hi = dCm;
  let lastRings: Ring[] = [ring.slice()];
  while (hi - lo > 1) {
    const mid = lo + Math.floor((hi - lo) * 0.5);
    const m = insetAt(ring, mid);
    if (!m.ok) return m;
    if (m.value.length > 0) {
      lo = mid;
      lastRings = m.value;
    } else hi = mid;
  }
  const collapsed: InsetCollapsed = {
    ...degenerate<Ring[]>('collapsed', lastRings),
    detail: 'collapsed',
    lastCm: lo as Cm,
    partial: lastRings,
    warnings: r.warnings.map((w) => ({ ...w })),
  };
  return collapsed;
}
