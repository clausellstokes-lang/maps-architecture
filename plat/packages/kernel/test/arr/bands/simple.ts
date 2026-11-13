// The vitest-free copy of support.ts's `simpleRing` (M0-a-09 hardening round S20, line 6 (b)): definition.ts imports it
// from here, so the definition oracle, relation.ts and observer.ts load in a plain tsx process (support.ts imports
// ../../tx/support.ts, which imports vitest). The function is support.ts's, copied verbatim.
import type { LatticePoint } from '../../../src/types/index.js';

/** Is the ring simple — no two non-adjacent edges meeting, no repeated point (exact orientation tests, BigInt)? */
export function simpleRing(r: readonly LatticePoint[]): boolean {
  const n = r.length;
  if (n < 3) return false;
  if (new Set(r.map((q) => `${String(q.x)},${String(q.y)}`)).size !== n) return false;
  const o = (a: LatticePoint, b: LatticePoint, c: LatticePoint): number => {
    const v = (BigInt(b.x) - BigInt(a.x)) * (BigInt(c.y) - BigInt(a.y)) - (BigInt(b.y) - BigInt(a.y)) * (BigInt(c.x) - BigInt(a.x));
    return v > 0n ? 1 : v < 0n ? -1 : 0;
  };
  const on = (a: LatticePoint, b: LatticePoint, c: LatticePoint): boolean =>
    Math.min(a.x, b.x) <= c.x && c.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= c.y && c.y <= Math.max(a.y, b.y);
  const meet = (p1: LatticePoint, p2: LatticePoint, q1: LatticePoint, q2: LatticePoint): boolean => {
    const d1 = o(q1, q2, p1);
    const d2 = o(q1, q2, p2);
    const d3 = o(p1, p2, q1);
    const d4 = o(p1, p2, q2);
    if (d1 * d2 < 0 && d3 * d4 < 0) return true;
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
