// The skeleton's input side (M0-a-11; §3.8 *Numeric contract*): the lattice check, the pre-clean (consecutive repeats
// dropped, then, to a fixpoint, exact zero-width spurs dropped, inexact spurs within `attractCm` dropped and collinear
// vertices merged — C-0276, C-0283 and this round's row: a spur is a fold-back enclosing no area, or less than the
// lattice's own coincidence band, so dropping it reshapes nothing beyond §3.6's attraction), the orientation (outer
// ring counter-clockwise, holes clockwise, so the interior lies left of every edge), the canonical start (each ring at
// its lowest-leftmost vertex — the order ties are broken in), and the contract's refusals, decided exactly on lattice
// integers before anything runs: a ring with fewer than three vertices or no area, a ring that is not simple, a corner
// sharper than 5° on either side (an interior angle below 5° or above 355°; a fold-back the clean leaves is a 0°
// corner), a hole touching the outer ring or another hole, and a hole outside the outer ring or inside another hole
// (C-0168 (3)). A refused ring set takes its reader's downgrade without running (§3.8). The contact and containment
// tests are the kernel's shared exact predicates (`num/exact.ts`, C-0314), read here on lattice points.
import { area2, LATTICE, orient2d } from '../num/index.js';
import { insideLatticeRing, segmentsMeet as segmentsMeetXY } from '../num/exact.js';
import type { LatticePoint } from '../types/index.js';
import type { ContractRefusal, SkeletonEdge } from './types.js';

/** tan 5°, to the double nearest it: a corner is sharper than 5° when |cross| < tan 5° · dot with dot > 0. */
export const TAN_5_DEG = 0.08748866352592401;

/** The cleaned input: rings in engine order with their source indices, or the contract's refusal. */
export interface PreparedRings {
  /** Cleaned, oriented, canonical rings (world lattice points): the outer ring first, then the holes in input order (a hole that is all spur dropped). */
  rings: LatticePoint[][];
  /** Per cleaned edge (in ring order, edges numbered as the vertices that start them): the caller's ring and vertex indices. */
  edges: SkeletonEdge[];
  /** The vertex count n and the reflex count r of §3.8's work law. */
  n: number;
  r: number;
}

export type Prepared = { ok: true; value: PreparedRings } | { ok: false; refusal: ContractRefusal; at?: LatticePoint };

interface Src {
  p: LatticePoint;
  /** The caller's index of the vertex in its ring. */
  i: number;
}

/** Drops consecutive repeats of one lattice point (the closing repeat included), keeping the first index of each run. */
function dropRepeats(ring: readonly LatticePoint[]): Src[] {
  const out: Src[] = [];
  for (let i = 0; i < ring.length; i += 1) {
    const p = ring[i];
    const q = out[out.length - 1];
    if (q === undefined || q.p.x !== p.x || q.p.y !== p.y) out.push({ p, i });
  }
  while (out.length > 1 && out[0].p.x === out[out.length - 1].p.x && out[0].p.y === out[out.length - 1].p.y) out.pop();
  return out;
}

const same = (u: Src, v: Src): boolean => u.p.x === v.p.x && u.p.y === v.p.y;

/**
 * Drops exact zero-width spurs (C-0276; the seam rule, C-0283 (2)): a vertex whose two neighbours are one lattice point
 * is the tip of a spur — the ring walks out to it and back along the same segment, two coincident collinear edges
 * enclosing no area (a dead-end street walked out and back) — so the tip and the second of its two coincident
 * neighbours in walk order are removed, the first kept with its index, repeatedly, until none is left: a spur of
 * several segments goes tip by tip, one across the ring's seam included (read cyclically from the tip: a tip at the
 * walk's last vertex keeps the root's visit just before it). Only exact equality is a spur here: a fold-back whose
 * neighbours differ by any lattice step is `dropInexactSpurs`'s when it lies within `attractCm`, else a sharp corner the
 * contract refuses (`sharpCorner`). The ring must hold no consecutive repeats; it holds none after (the kept neighbour
 * differs from the next vertex).
 */
function dropSpurs(ring: readonly Src[]): Src[] {
  const out: Src[] = [];
  for (const s of ring) {
    // out ends …, a, b and s is a: b is a tip — drop b and s, keep a (a is then judged again against the next vertex)
    if (out.length >= 2 && same(out[out.length - 2], s)) {
      out.pop();
      continue;
    }
    out.push(s);
  }
  // the seam: a tip at the walk's last vertex (between out[n − 2] and out[0]) or at its first (between out[n − 1] and out[1])
  for (;;) {
    const n = out.length;
    if (n < 3) return out;
    if (same(out[n - 2], out[0])) {
      out.pop();
      out.shift();
    } else if (same(out[n - 1], out[1])) {
      out.splice(0, 2);
    } else return out;
  }
}

/** §3.6's coincidence band, squared: the lattice's `attractCm` (26 cm). */
const ATTRACT2 = BigInt(LATTICE.attractCm * LATTICE.attractCm);

/**
 * Is vertex v, between p and q, the tip of an inexact spur (§3.8 as amended by item 130 (f); census D-01, RQ7 (A))?
 * The ring folds back at v — a corner sharper than 5° (|(q − v) × (p − v)| < tan 5° · (p − v) · (q − v), the contract's
 * own test, so the clean touches only a corner the contract would refuse) — and the end s of the shorter arm lies
 * within `attractCm` of the longer arm's segment v–l, its foot strictly inside it: 0 < (s − v) · (l − v) < |l − v|²
 * and |(l − v) × (s − v)|² ≤ attractCm² · |l − v|², exact (the cross in BigInt). An exact spur (s = l) is `dropSpurs`'s:
 * its foot is l itself.
 */
function inexactTip(p: LatticePoint, v: LatticePoint, q: LatticePoint): boolean {
  const ux = p.x - v.x;
  const uy = p.y - v.y;
  const wx = q.x - v.x;
  const wy = q.y - v.y;
  const dot = ux * wx + uy * wy;
  if (!(dot > 0 && Math.abs(wx * uy - wy * ux) < TAN_5_DEG * dot)) return false;
  const u2 = ux * ux + uy * uy;
  const w2 = wx * wx + wy * wy;
  // s − v the shorter arm, l − v the longer (a tie reads either: the test is symmetric then)
  const [sx, sy, lx, ly, l2] = u2 <= w2 ? [ux, uy, wx, wy, w2] : [wx, wy, ux, uy, u2];
  const foot = sx * lx + sy * ly;
  if (!(foot > 0 && foot < l2)) return false;
  const cross = BigInt(lx) * BigInt(sy) - BigInt(ly) * BigInt(sx);
  return cross * cross <= ATTRACT2 * BigInt(l2);
}

/**
 * Drops inexact spurs (§3.8 *Numeric contract* as amended by item 130 (f); N-61 (7), RQ7 (A)): every vertex of the ring
 * that is the tip of an inexact spur — a fold-back whose shorter arm's end lies within `attractCm` of the longer arm —
 * is marked on the ring as it stands, and every marked vertex is removed at once, so the pass reads the ring alone and
 * never the order it is walked in (a rotation or a reversal of the ring marks the same vertices). The kept vertices keep
 * their indices; a removed tip lies inside the span of the cleaned edge that bridges it, as a merged run does. A ring
 * the removal would leave with fewer than three vertices or no area — a sliver narrower than `attractCm`, the whole ring
 * a spur — is left as it is, for the contract to refuse at its sharp corner (`sharpCorner`, the reader's downgrade).
 * The fixpoint in `prepareRings` runs it with `dropSpurs` and `mergeCollinear` until no pass removes a vertex.
 */
function dropInexactSpurs(ring: readonly Src[]): Src[] {
  const n = ring.length;
  if (n < 3) return ring.slice();
  const out: Src[] = [];
  for (let i = 0; i < n; i += 1) {
    if (!inexactTip(ring[(i + n - 1) % n].p, ring[i].p, ring[(i + 1) % n].p)) out.push(ring[i]);
  }
  return out.length >= 3 && area2(out.map((s) => s.p)) !== 0 ? out : ring.slice();
}

/**
 * Merges collinear vertices: a vertex whose neighbours lie on one line through it, the ring running straight on
 * (orient2d = 0 and the two edges pointing the same way), is removed, repeatedly, until none is left. A vertex where
 * the ring folds back on itself (orient2d = 0, the edges opposed) is a 0° corner and stays for the spur passes or the
 * contract.
 */
function mergeCollinear(ring: Src[]): Src[] {
  let cur = ring;
  for (;;) {
    const n = cur.length;
    if (n < 3) return cur;
    const keep: Src[] = [];
    let removed = false;
    for (let i = 0; i < n; i += 1) {
      const a = cur[(i + n - 1) % n].p;
      const b = cur[i].p;
      const c = cur[(i + 1) % n].p;
      const straight = orient2d(a.x, a.y, b.x, b.y, c.x, c.y) === 0 && (b.x - a.x) * (c.x - b.x) + (b.y - a.y) * (c.y - b.y) > 0;
      // One removal per pass between kept vertices, so a removed vertex's neighbours are re-judged on the next pass.
      if (straight && !removed) {
        removed = true;
        continue;
      }
      keep.push(cur[i]);
    }
    if (!removed) return cur;
    cur = keep;
  }
}

/** The ring started at its lowest-leftmost vertex (least y, then least x). */
function canonical(ring: Src[]): Src[] {
  let m = 0;
  for (let i = 1; i < ring.length; i += 1) {
    const p = ring[i].p;
    const q = ring[m].p;
    if (p.y < q.y || (p.y === q.y && p.x < q.x)) m = i;
  }
  return [...ring.slice(m), ...ring.slice(0, m)];
}

/**
 * Do the closed segments ab and cd share a point? `num/exact.ts`'s `segmentsMeet` on lattice points: a proper crossing,
 * or an end of one on the other (a touch at an end and a collinear overlap count). Exact on lattice points.
 */
export function segmentsMeet(a: LatticePoint, b: LatticePoint, c: LatticePoint, d: LatticePoint): boolean {
  return segmentsMeetXY(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y);
}

/** Is the ring simple: no two non-adjacent edges meet (adjacent edges share only their vertex — a fold-back is a 0° corner)? */
function simple(ring: readonly LatticePoint[]): boolean {
  const n = ring.length;
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    for (let j = i + 2; j < n; j += 1) {
      if (i === 0 && j === n - 1) continue;
      if (segmentsMeet(a, b, ring[j], ring[(j + 1) % n])) return false;
    }
  }
  return true;
}

/** Does any edge of ring A meet any edge of ring B (a touch included)? */
function ringsMeet(A: readonly LatticePoint[], B: readonly LatticePoint[]): boolean {
  for (let i = 0; i < A.length; i += 1) {
    const a = A[i];
    const b = A[(i + 1) % A.length];
    for (let j = 0; j < B.length; j += 1) if (segmentsMeet(a, b, B[j], B[(j + 1) % B.length])) return true;
  }
  return false;
}

/**
 * Is the lattice point p inside the lattice ring? `num/exact.ts`'s off-ring reading on the lattice (`insideLatticeRing`:
 * exact crossing parity, even–odd), defined for a point on none of the ring's edges: `prepareRings` asks only a hole's
 * first vertex, after `ringsMeet` has refused every contact between the rings, so p is never on the ring it is tested
 * against.
 */
export function insideRing(ring: readonly LatticePoint[], p: LatticePoint): boolean {
  return insideLatticeRing(ring, p.x, p.y);
}

/** The first vertex of a ring with a corner sharper than 5° on either side, or −1. Exact integer cross and dot. */
function sharpCorner(ring: readonly LatticePoint[]): number {
  const n = ring.length;
  for (let i = 0; i < n; i += 1) {
    const v = ring[i];
    const p = ring[(i + n - 1) % n];
    const q = ring[(i + 1) % n];
    const ux = p.x - v.x;
    const uy = p.y - v.y;
    const wx = q.x - v.x;
    const wy = q.y - v.y;
    const cross = wx * uy - wy * ux;
    const dot = wx * ux + wy * uy;
    if (dot > 0 && Math.abs(cross) < TAN_5_DEG * dot) return i;
  }
  return -1;
}

/**
 * Cleans and checks the rings (§3.8): `rings[0]` is the outer ring, every other ring a hole, each in either
 * orientation. The caller has already refused an off-lattice coordinate (E_OUT_OF_RANGE). Returns the engine's rings
 * or the refusal, with the offending vertex where there is one.
 */
export function prepareRings(input: readonly (readonly LatticePoint[])[]): Prepared {
  if (input.length === 0) return { ok: false, refusal: 'empty' };
  const rings: Src[][] = [];
  /** Each kept ring's index in the caller's list (a hole that cleans away is not kept). */
  const from: number[] = [];
  for (let k = 0; k < input.length; k += 1) {
    // the pre-clean to a fixpoint: a merge can expose a spur (out along two collinear segments, back along one), a
    // dropped spur can leave its root straight on or expose another tip; every pass only removes vertices, so an
    // unchanged length is the fixpoint
    let cleaned = dropRepeats(input[k]);
    for (;;) {
      const next = mergeCollinear(dropInexactSpurs(dropSpurs(cleaned)));
      if (next.length === cleaned.length) break;
      cleaned = next;
    }
    // a hole that is all spur — a dead-end street network inside the face, walked out and back, not touching its outer
    // ring (census Q73: relief-60 seed 3's district at (32770, −86089)) — cleans to fewer than three vertices: it
    // encloses no area, so it is dropped as its spurs are (C-0276), and the face runs; an outer ring that cleans away is
    // `degenerate`
    if (cleaned.length < 3 && k > 0) continue;
    if (cleaned.length < 3) return { ok: false, refusal: 'degenerate', ...(cleaned.length > 0 ? { at: cleaned[0].p } : {}) };
    const pts = cleaned.map((s) => s.p);
    const a = area2(pts);
    if (a === 0) return { ok: false, refusal: 'degenerate', at: pts[0] };
    // outer counter-clockwise (a > 0), holes clockwise: the interior lies left of every edge
    const want = k === 0 ? 1 : -1;
    const oriented = Math.sign(a) === want ? cleaned : [...cleaned].reverse();
    rings.push(canonical(oriented));
    from.push(k);
  }
  const pts = rings.map((r) => r.map((s) => s.p));
  for (let k = 0; k < pts.length; k += 1) {
    const s = sharpCorner(pts[k]);
    if (s >= 0) return { ok: false, refusal: 'sharpCorner', at: pts[k][s] };
  }
  for (let k = 0; k < pts.length; k += 1) if (!simple(pts[k])) return { ok: false, refusal: 'notSimple', at: pts[k][0] };
  for (let k = 1; k < pts.length; k += 1) {
    for (let m = 0; m < k; m += 1) if (ringsMeet(pts[k], pts[m])) return { ok: false, refusal: 'holeContact', at: pts[k][0] };
  }
  for (let k = 1; k < pts.length; k += 1) {
    const p = pts[k][0];
    if (!insideRing(pts[0], p)) return { ok: false, refusal: 'holeOutside', at: p };
    for (let m = 1; m < pts.length; m += 1) if (m !== k && insideRing(pts[m], p)) return { ok: false, refusal: 'holeOutside', at: p };
  }
  const edges: SkeletonEdge[] = [];
  let r = 0;
  let n = 0;
  for (let k = 0; k < rings.length; k += 1) {
    const ring = rings[k];
    const m = ring.length;
    n += m;
    for (let i = 0; i < m; i += 1) {
      edges.push({ ring: from[k], from: ring[i].i, to: ring[(i + 1) % m].i });
      const a = ring[(i + m - 1) % m].p;
      const b = ring[i].p;
      const c = ring[(i + 1) % m].p;
      if (orient2d(a.x, a.y, b.x, b.y, c.x, c.y) < 0) r += 1;
    }
  }
  return { ok: true, value: { rings: pts, edges, n, r } };
}
