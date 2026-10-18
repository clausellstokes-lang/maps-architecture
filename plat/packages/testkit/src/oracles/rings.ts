// Ring helpers of the oracles (M0-k-03; §3.2, §3.7): the lattice check of an input, snapping an oracle's doubles into
// our integer frame, perimeters, loops and the representation's face count (faces.ts counts the region), simplicity,
// the ring-level hard checks, and the fan triangles the even-odd conversion uses (C-0144 (2), (3), (6)). Exact where a decision is topological: every
// orientation and crossing test is the kernel's integer `orient2d`, every area sign the kernel's `area2Big`.
import { LATTICE, area2Big, orient2d, snap } from '@plat/kernel';
import type { PointLike, Ring, RingLike } from './types.js';

/** Whether every coordinate is an integer with |v| < 2²³ (§3.2 (1)): a point `snap` could have produced. */
export function isLatticeRing(ring: RingLike): boolean {
  for (const p of ring) {
    if (!Number.isInteger(p.x) || !Number.isInteger(p.y)) return false;
    if (!(Math.abs(p.x) < LATTICE.rangeCm) || !(Math.abs(p.y) < LATTICE.rangeCm)) return false;
  }
  return true;
}

/** A copy of a lattice ring as the kernel's point type (the caller checked it with `isLatticeRing`). */
export function toRing(ring: RingLike): Ring {
  return dedupe(ring.map((p) => ({ x: p.x, y: p.y }) as Ring[number]));
}

/** The ring without consecutive duplicate points, the closing duplicate (last = first) included. */
export function dedupe(ring: Ring): Ring {
  const out: Ring = [];
  for (const p of ring) {
    const q = out[out.length - 1];
    if (q === undefined || q.x !== p.x || q.y !== p.y) out.push(p);
  }
  while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  return out;
}

/**
 * Doubles into our integer frame: each point through the kernel's `snap` (the one door, §3.2 (7)), consecutive
 * duplicates dropped. A coordinate `snap` refuses (out of range, not finite) makes the whole ring null.
 */
export function snapRing(points: readonly (readonly [number, number])[] | RingLike): Ring | null {
  const out: Ring = [];
  for (const p of points) {
    const x = Array.isArray(p) ? (p as readonly [number, number])[0] : (p as PointLike).x;
    const y = Array.isArray(p) ? (p as readonly [number, number])[1] : (p as PointLike).y;
    const s = snap(x, y);
    if (!s.ok) return null;
    out.push(s.value);
  }
  return dedupe(out);
}

/** A closed ring's boundary length in cm (doubles; a perimeter, never a topology decision). */
export function ringLength(ring: RingLike): number {
  const n = ring.length;
  if (n < 2) return 0;
  let s = 0;
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    s += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return s;
}

/** The summed boundary length of a ring set. */
export function perimeterOf(rings: readonly RingLike[]): number {
  let s = 0;
  for (const r of rings) s += ringLength(r);
  return s;
}

/** Twice the signed area of a ring set, exact (outer rings positive, holes negative). */
export function area2Of(rings: readonly Ring[]): bigint {
  let s = 0n;
  for (const r of rings) s += area2Big(r);
  return s;
}

/**
 * A ring split at its repeated vertices into loops, each loop free of repeats: walking the deduplicated ring, a point
 * met again closes the loop since its first visit, which is cut out and kept when it has three or more points; the
 * rest closes the last loop. A spike or antenna (a loop of fewer than three points) disappears, as a zero-area face.
 */
export function loops(ring: Ring): Ring[] {
  const r = dedupe(ring);
  const out: Ring[] = [];
  const path: Ring = [];
  const at = new Map<string, number>();
  for (const p of r) {
    const k = `${p.x},${p.y}`;
    const j = at.get(k);
    if (j === undefined) {
      at.set(k, path.length);
      path.push(p);
      continue;
    }
    const loop = path.slice(j);
    for (let i = j + 1; i < path.length; i += 1) at.delete(`${path[i].x},${path[i].y}`);
    path.length = j + 1;
    if (loop.length >= 3) out.push(loop);
  }
  if (path.length >= 3) out.push(path);
  return out;
}

/**
 * The faces of a ring set counted from its representation alone: the rings split into loops at repeated vertices,
 * each loop with a positive exact area counted once (outer rings counter-clockwise, holes clockwise). It misses a ring
 * that touches itself at a vertex lying inside one of its own edges; `faceCount` (faces.ts) counts the region instead
 * and falls back to this only when polygon-clipping cannot canonicalise the set.
 */
export function loopFaceCount(rings: readonly Ring[]): number {
  let n = 0;
  for (const r of rings) {
    for (const loop of loops(r)) if (area2Big(loop) > 0n) n += 1;
  }
  return n;
}

/** Whether closed segments ab and cd share a point, exactly (integer orient2d; collinear overlaps and touches count). */
export function segmentsMeet(a: PointLike, b: PointLike, c: PointLike, d: PointLike): boolean {
  const o1 = Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y));
  const o2 = Math.sign(orient2d(a.x, a.y, b.x, b.y, d.x, d.y));
  const o3 = Math.sign(orient2d(c.x, c.y, d.x, d.y, a.x, a.y));
  const o4 = Math.sign(orient2d(c.x, c.y, d.x, d.y, b.x, b.y));
  if (o1 !== o2 && o3 !== o4) return true; // a crossing, or an endpoint of one on the other
  return (
    (o1 === 0 && onSegment(a, b, c)) ||
    (o2 === 0 && onSegment(a, b, d)) ||
    (o3 === 0 && onSegment(c, d, a)) ||
    (o4 === 0 && onSegment(c, d, b))
  );
}

/** Whether p, known collinear with ab, lies on the closed segment ab. */
function onSegment(a: PointLike, b: PointLike, p: PointLike): boolean {
  return Math.min(a.x, b.x) <= p.x && p.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= p.y && p.y <= Math.max(a.y, b.y);
}

/** Whether the bounding boxes of ab and cd are disjoint (a cheap reject before the exact test). */
function boxesApart(a: PointLike, b: PointLike, c: PointLike, d: PointLike): boolean {
  return (
    Math.max(a.x, b.x) < Math.min(c.x, d.x) ||
    Math.max(c.x, d.x) < Math.min(a.x, b.x) ||
    Math.max(a.y, b.y) < Math.min(c.y, d.y) ||
    Math.max(c.y, d.y) < Math.min(a.y, b.y)
  );
}

/**
 * Whether a lattice ring is simple: at least three distinct points, no repeated point, no two non-adjacent edges
 * sharing a point and no two adjacent edges folding back over each other (a spike) — so its non-zero interior and its
 * even-odd interior are one region (C-0144 (2)). Exact; quadratic with a box reject.
 */
export function isSimpleRing(ring: Ring): boolean {
  const r = dedupe(ring);
  const n = r.length;
  if (n < 3) return false;
  const seen = new Set<string>();
  for (const p of r) {
    const k = `${p.x},${p.y}`;
    if (seen.has(k)) return false;
    seen.add(k);
  }
  for (let i = 0; i < n; i += 1) {
    const a = r[i];
    const b = r[(i + 1) % n];
    const c = r[(i + 2) % n];
    // Adjacent edges ab and bc: a fold-back when c lies on ab's line on a's side of b.
    if (orient2d(a.x, a.y, b.x, b.y, c.x, c.y) === 0 && (c.x - b.x) * (a.x - b.x) + (c.y - b.y) * (a.y - b.y) > 0) {
      return false;
    }
    for (let j = i + 2; j < n; j += 1) {
      if (i === 0 && j === n - 1) continue; // edges n-1 and 0 are adjacent
      const c2 = r[j];
      const d2 = r[(j + 1) % n];
      if (boxesApart(a, b, c2, d2)) continue;
      if (segmentsMeet(a, b, c2, d2)) return false;
    }
  }
  return true;
}

/**
 * The fan triangles of a ring from its first vertex, zero-area ones dropped: their boundaries sum to the ring's
 * boundary (each spoke is traversed once each way), so a point's crossing parity for the ring is the XOR of its
 * parities for the triangles — the ring's even-odd region is the XOR of the triangles (C-0144 (2)).
 */
export function fanTriangles(ring: Ring): Ring[] {
  const r = dedupe(ring);
  const out: Ring[] = [];
  const o = r[0];
  for (let i = 1; i + 1 < r.length; i += 1) {
    const a = r[i];
    const b = r[i + 1];
    if (orient2d(o.x, o.y, a.x, a.y, b.x, b.y) !== 0) out.push([o, a, b]);
  }
  return out;
}

/** Whether segments ab and cd cross at a point inside both, or overlap along a stretch of positive length (exact). */
export function segmentsCross(a: PointLike, b: PointLike, c: PointLike, d: PointLike): boolean {
  const o1 = Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y));
  const o2 = Math.sign(orient2d(a.x, a.y, b.x, b.y, d.x, d.y));
  const o3 = Math.sign(orient2d(c.x, c.y, d.x, d.y, a.x, a.y));
  const o4 = Math.sign(orient2d(c.x, c.y, d.x, d.y, b.x, b.y));
  if (o1 !== 0 && o2 !== 0 && o3 !== 0 && o4 !== 0) return o1 !== o2 && o3 !== o4;
  if (o1 !== 0 || o2 !== 0) return false; // a touch at an end point, never a crossing
  // Collinear: the overlap of the two parameter ranges along ab's dominant axis.
  const useX = Math.abs(b.x - a.x) >= Math.abs(b.y - a.y);
  const lo1 = useX ? Math.min(a.x, b.x) : Math.min(a.y, b.y);
  const hi1 = useX ? Math.max(a.x, b.x) : Math.max(a.y, b.y);
  const lo2 = useX ? Math.min(c.x, d.x) : Math.min(c.y, d.y);
  const hi2 = useX ? Math.max(c.x, d.x) : Math.max(c.y, d.y);
  return Math.min(hi1, hi2) > Math.max(lo1, lo2);
}

/**
 * The ring-level hard checks of an engine's output (C-0144 (6)), read from §13.1's "no self-intersecting output" and
 * §3.2 (2)'s `minEdge`: every ring at least three distinct points with a non-zero exact area, no two edges of the set
 * crossing or overlapping along a stretch (a touch at a vertex — two faces meeting at a point, a hole touching its
 * outline — is allowed), and no edge shorter than `minEdge`. Returns one line per violation kind found (empty when
 * valid). §3.10's arena-level rows are the invariant suite's (M0-a-14), passed to `compareSplit`.
 */
export function ringProblems(rings: readonly Ring[]): string[] {
  const problems = new Set<string>();
  const edges: [PointLike, PointLike][] = [];
  for (const raw of rings) {
    const r = dedupe(raw);
    if (r.length < 3 || area2Big(r) === 0n) problems.add('degenerate ring');
    if (r.length < 2) continue;
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      if (dx * dx + dy * dy < LATTICE.minEdgeCm * LATTICE.minEdgeCm) problems.add('edge below minEdge');
      edges.push([a, b]);
    }
  }
  for (let i = 0; i < edges.length; i += 1) {
    const [a, b] = edges[i];
    for (let j = i + 1; j < edges.length; j += 1) {
      const [c, d] = edges[j];
      if (boxesApart(a, b, c, d)) continue;
      if (segmentsCross(a, b, c, d)) problems.add('crossing edges');
    }
  }
  return [...problems].sort();
}
