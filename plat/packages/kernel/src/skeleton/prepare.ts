// The skeleton's input side (M0-a-11; §3.8 *Numeric contract*): the lattice check, the pre-clean (consecutive repeats
// dropped, collinear vertices merged), the orientation (outer ring counter-clockwise, holes clockwise, so the
// interior lies left of every edge), the canonical start (each ring at its lowest-leftmost vertex — the order ties are
// broken in), and the contract's refusals, decided exactly on lattice integers before anything runs: a ring with fewer
// than three vertices or no area, a ring that is not simple, a corner sharper than 5° on either side (an interior angle
// below 5° or above 355°), a hole touching the outer ring or another hole, and a hole outside the outer ring or inside
// another hole (C-0168 (3)). A refused ring set takes its reader's downgrade without running (§3.8).
import { area2, orient2d } from '../num/index.js';
import type { LatticePoint } from '../types/index.js';
import type { ContractRefusal, SkeletonEdge } from './types.js';

/** tan 5°, to the double nearest it: a corner is sharper than 5° when |cross| < tan 5° · dot with dot > 0. */
export const TAN_5_DEG = 0.08748866352592401;

/** The cleaned input: rings in engine order with their source indices, or the contract's refusal. */
export interface PreparedRings {
  /** Cleaned, oriented, canonical rings (world lattice points): the outer ring first, then the holes in input order. */
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

/**
 * Merges collinear vertices: a vertex whose neighbours lie on one line through it, the ring running straight on
 * (orient2d = 0 and the two edges pointing the same way), is removed, repeatedly, until none is left. A vertex where
 * the ring folds back on itself (orient2d = 0, the edges opposed) is a 0° corner and stays for the contract to refuse.
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

/** Do the closed segments ab and cd share a point? Exact on lattice points. */
export function segmentsMeet(a: LatticePoint, b: LatticePoint, c: LatticePoint, d: LatticePoint): boolean {
  const o1 = Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y));
  const o2 = Math.sign(orient2d(a.x, a.y, b.x, b.y, d.x, d.y));
  const o3 = Math.sign(orient2d(c.x, c.y, d.x, d.y, a.x, a.y));
  const o4 = Math.sign(orient2d(c.x, c.y, d.x, d.y, b.x, b.y));
  if (o1 * o2 < 0 && o3 * o4 < 0) return true;
  const on = (p: LatticePoint, q: LatticePoint, r: LatticePoint): boolean =>
    Math.min(p.x, q.x) <= r.x && r.x <= Math.max(p.x, q.x) && Math.min(p.y, q.y) <= r.y && r.y <= Math.max(p.y, q.y);
  if (o1 === 0 && on(a, b, c)) return true;
  if (o2 === 0 && on(a, b, d)) return true;
  if (o3 === 0 && on(c, d, a)) return true;
  if (o4 === 0 && on(c, d, b)) return true;
  return false;
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

/** Even–odd containment of a lattice point strictly inside a lattice ring it does not touch: exact crossing parity. */
export function insideRing(ring: readonly LatticePoint[], p: LatticePoint): boolean {
  let inside = false;
  const n = ring.length;
  for (let i = 0, j = n - 1; i < n; j = i, i += 1) {
    const a = ring[j];
    const b = ring[i];
    if (a.y > p.y !== b.y > p.y) {
      // the edge straddles the horizontal through p: is p left of it (on the crossing's −x side)? exact by orient2d
      const o = orient2d(a.x, a.y, b.x, b.y, p.x, p.y);
      if (b.y > a.y ? o > 0 : o < 0) inside = !inside;
    }
  }
  return inside;
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
  for (let k = 0; k < input.length; k += 1) {
    const cleaned = mergeCollinear(dropRepeats(input[k]));
    if (cleaned.length < 3) return { ok: false, refusal: 'degenerate', ...(cleaned.length > 0 ? { at: cleaned[0].p } : {}) };
    const pts = cleaned.map((s) => s.p);
    const a = area2(pts);
    if (a === 0) return { ok: false, refusal: 'degenerate', at: pts[0] };
    // outer counter-clockwise (a > 0), holes clockwise: the interior lies left of every edge
    const want = k === 0 ? 1 : -1;
    const oriented = Math.sign(a) === want ? cleaned : [...cleaned].reverse();
    rings.push(canonical(oriented));
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
      edges.push({ ring: k, from: ring[i].i, to: ring[(i + 1) % m].i });
      const a = ring[(i + m - 1) % m].p;
      const b = ring[i].p;
      const c = ring[(i + 1) % m].p;
      if (orient2d(a.x, a.y, b.x, b.y, c.x, c.y) < 0) r += 1;
    }
  }
  return { ok: true, value: { rings: pts, edges, n, r } };
}
