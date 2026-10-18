// Test support for M0-a-08's kernel-side tests (the arrangement's booleans, buffers, offsetFace and insetRing): lattice
// rings, exact areas and containment written here from their definitions (BigInt shoelace, crossing number) — never
// with the code under test — and a face built in an arena through the insertion door, for the face-reading services.
import { createPlat, faceHoles, isFaceLive, type FaceId, type Plat } from '../../../src/arena/index.js';
import { attachIndex } from '../../../src/index/index.js';
import { insertTx, type InsertTx } from '../../../src/insert/classes.js';
import { insertChain } from '../../../src/insert/insertChain.js';
import type { Cm, LatticePoint, PlatKey } from '../../../src/types/index.js';

export const TIMEOUT = 600_000;

/** A lattice point from integers the test holds in range. */
export const pt = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });

/** A ring from [x, y] pairs. */
export function R(...xy: [number, number][]): LatticePoint[] {
  return xy.map(([x, y]) => pt(x, y));
}

/** An axis-aligned rectangle, counter-clockwise. */
export function rect(x0: number, y0: number, x1: number, y1: number): LatticePoint[] {
  return R([x0, y0], [x1, y0], [x1, y1], [x0, y1]);
}

/** Twice the signed area of a ring, exact. */
export function area2Exact(ring: readonly LatticePoint[]): bigint {
  let s = 0n;
  const n = ring.length;
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    s += BigInt(a.x) * BigInt(b.y) - BigInt(b.x) * BigInt(a.y);
  }
  return s;
}

/** The signed area of a ring set in cm² (outer rings positive, holes negative). */
export function areaOf(rings: readonly (readonly LatticePoint[])[]): number {
  let s = 0n;
  for (const r of rings) s += area2Exact(r);
  return Number(s) / 2;
}

/** Summed boundary length of a ring set, cm. */
export function perimeterOf(rings: readonly (readonly LatticePoint[])[]): number {
  let s = 0;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      s += Math.hypot(b.x - a.x, b.y - a.y);
    }
  }
  return s;
}

/** Is the point inside the ring set by the even-odd crossing number (a point on a boundary may go either way)? */
export function insideRings(rings: readonly (readonly LatticePoint[])[], x: number, y: number): boolean {
  let inside = false;
  for (const r of rings) {
    for (let i = 0, j = r.length - 1; i < r.length; j = i, i += 1) {
      const a = r[i];
      const b = r[j];
      if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
    }
  }
  return inside;
}

/** Distance from a point to a segment, doubles. */
export function distToSegment(px: number, py: number, a: LatticePoint, b: LatticePoint): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - a.x) * dx + (py - a.y) * dy) / l2));
  return Math.hypot(px - (a.x + t * dx), py - (a.y + t * dy));
}

/** Is every ring simple (no two non-adjacent edges meeting; exact orientation tests)? */
export function simpleRing(r: readonly LatticePoint[]): boolean {
  const n = r.length;
  const o = (a: LatticePoint, b: LatticePoint, c: LatticePoint): number => Math.sign((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
  const on = (a: LatticePoint, b: LatticePoint, c: LatticePoint): boolean =>
    Math.min(a.x, b.x) <= c.x && c.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= c.y && c.y <= Math.max(a.y, b.y);
  const meet = (p1: LatticePoint, p2: LatticePoint, q1: LatticePoint, q2: LatticePoint): boolean => {
    const d1 = o(q1, q2, p1);
    const d2 = o(q1, q2, p2);
    const d3 = o(p1, p2, q1);
    const d4 = o(p1, p2, q2);
    if (d1 !== d2 && d3 !== d4 && d1 !== 0 && d2 !== 0 && d3 !== 0 && d4 !== 0) return true;
    return (d1 === 0 && on(q1, q2, p1)) || (d2 === 0 && on(q1, q2, p2)) || (d3 === 0 && on(p1, p2, q1)) || (d4 === 0 && on(p1, p2, q2));
  };
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      if (j === i + 1 || (i === 0 && j === n - 1)) continue;
      if (meet(r[i], r[(i + 1) % n], r[j], r[(j + 1) % n])) return false;
    }
  }
  return true;
}

const KEY: PlatKey = { layer: 'ground', part: 0 };

/**
 * An arena holding the rings (outer counter-clockwise, then holes) as closed L0 chains, its face, and an open shell
 * transaction; 4 × 10⁶ cm wide unless a width is given (2²⁴ reaches the lattice's edge).
 */
export function arenaFace(rings: readonly (readonly LatticePoint[])[], widthCm = 4_000_000): { plat: Plat; tx: InsertTx; face: FaceId } {
  const plat = createPlat(KEY, { widthCm: widthCm as Cm, heightCm: widthCm as Cm, aspect: 1, marginShare: 0 });
  attachIndex(plat, { gridCellCm: 800 });
  const tx = insertTx(plat, 0);
  rings.forEach((r, i) => {
    const res = insertChain(tx, r.slice(), [{ role: 'way', entity: `way:${String(i)}` }], 'mandatory', { closed: true });
    if (!res.ok) throw new Error(`support: ring ${String(i)} refused: ${res.code} ${res.detail}`);
  });
  // The face: the one whose record holds every hole given; for a single ring its one bounded face.
  let face = -1;
  for (let f = 0; f < plat.slots.face[0].top; f += 1) {
    if (!isFaceLive(plat, 0, f)) continue;
    if (faceHoles(plat, 0, f).length === rings.length - 1) face = f;
  }
  if (face < 0) throw new Error('support: no face found');
  return { plat, tx, face };
}
