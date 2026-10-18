// The fuzz generators' lattice helpers (M0-k-01; §3.2 (1), (7); §13.1 (1)). Every generated coordinate passes the
// kernel's `snap` (the one door, §3.2 (7)); shapes whose validity matters are built ON the lattice with exact integer
// tests (orient2d, cross products below 2⁴⁹), never by snapping a valid double shape and hoping it stays valid. The
// generators draw only integers from fast-check — sizes, shares, positions — and map them; so every value a shrink
// reaches maps to a valid shape too, and shrinking moves toward the smallest sizes and the lower-left of the range.
// Trigonometry goes through the kernel's `dmath` (fdlibm to the bit on every host, §6.5 (2)), so a seed gives the same
// shapes on every engine.
import fc from 'fast-check';
import { LATTICE, area2Big, snap, type LatticePoint } from '@plat/kernel';
import type { FuzzRing } from './types.js';

/** The largest |coordinate| `snap` accepts: 2²³ − 1 (§3.2 (1); `snap` refuses |v| ≥ 2²³). */
export const LIMIT_CM = LATTICE.rangeCm - 1;

/** The smallest `limitCm` a generator accepts (C-0161 (1)): room for every class's construction. */
export const FUZZ_MIN_LIMIT_CM = 65_536;

/** A drawn fraction f / POS_SCALE in [0, 1], for positions and picks (2²⁰ steps). */
export const POS_SCALE = 1_048_576;

/** An integer fraction in [0, POS_SCALE]. */
export const posArb: fc.Arbitrary<number> = fc.integer({ min: 0, max: POS_SCALE });

/** A full turn, in radians. */
export const TAU = 2 * Math.PI;

/** A vector with integer components. */
export interface Vec {
  x: number;
  y: number;
}

/** A lattice point from numbers, through `snap`; a refusal is a generator bug and throws. */
export function pt(x: number, y: number): LatticePoint {
  const s = snap(x, y);
  if (!s.ok) throw new Error(`fuzz: a generator built a point snap refuses (${x}, ${y}): ${s.code} ${s.detail}`);
  return s.value;
}

/** The integer in [lo, hi] at fraction f / POS_SCALE (hi − lo < 2²⁵, so the product is exact). */
export function place(lo: number, hi: number, f: number): number {
  return lo + Math.floor(((hi - lo) * f) / POS_SCALE);
}

/** ⌊log₂ v⌋ for an integer v ≥ 1. */
function floorLog2(v: number): number {
  let e = 0;
  while (2 ** (e + 1) <= v) e += 1;
  return e;
}

/**
 * A size in [min, max], log-uniform by octave: an octave, then a place inside it — so millimetre-to-kilometre scales
 * are all drawn, and a shrink goes to `min`.
 */
export function scaleArb(min: number, max: number): fc.Arbitrary<number> {
  const e0 = floorLog2(min);
  const e1 = floorLog2(max);
  return fc.tuple(fc.integer({ min: e0, max: e1 }), posArb).map(([e, f]) => {
    const lo = Math.max(min, 2 ** e);
    const hi = Math.min(max, 2 ** (e + 1) - 1);
    return place(lo, Math.max(lo, hi), f);
  });
}

/** The resolved limit (C-0161 (1)); a bad option is a test-kit usage error. */
export function resolveLimit(limitCm: number | undefined): number {
  const limit = limitCm ?? LIMIT_CM;
  if (!Number.isInteger(limit) || limit < FUZZ_MIN_LIMIT_CM || limit > LIMIT_CM) {
    throw new RangeError(`fuzz: limitCm must be an integer in [${FUZZ_MIN_LIMIT_CM}, ${LIMIT_CM}], got ${String(limitCm)}`);
  }
  return limit;
}

/** A resolved size range [min, max] inside [1, cap]; a bad option is a usage error naming it. */
export function resolveSize(sizeCm: readonly [number, number] | undefined, dflt: readonly [number, number], cap: number): [number, number] {
  const [lo, hi] = sizeCm ?? [dflt[0], Math.min(dflt[1], cap)];
  if (!Number.isInteger(lo) || !Number.isInteger(hi) || lo < 1 || hi < lo || hi > cap) {
    throw new RangeError(`fuzz: sizeCm must be integers 1 ≤ min ≤ max ≤ ${cap}, got [${String(lo)}, ${String(hi)}]`);
  }
  return [lo, hi];
}

/** A resolved count range [min, max] inside [floor, cap]. */
export function resolveCount(name: string, v: readonly [number, number] | undefined, dflt: readonly [number, number], floor: number, cap: number): [number, number] {
  const [lo, hi] = v ?? dflt;
  if (!Number.isInteger(lo) || !Number.isInteger(hi) || lo < floor || hi < lo || hi > cap) {
    throw new RangeError(`fuzz: ${name} must be integers ${floor} ≤ min ≤ max ≤ ${cap}, got [${String(lo)}, ${String(hi)}]`);
  }
  return [lo, hi];
}

/** gcd(|a|, |b|), 0 for (0, 0). */
export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}

/** The primitive direction of a non-zero integer vector, and the vector's gcd: v = g · d. */
export function primitive(v: Vec): { d: Vec; g: number } {
  const g = gcd(v.x, v.y);
  return { d: { x: v.x / g, y: v.y / g }, g };
}

/**
 * For a primitive direction d, an integer vector q with cross(d, q) = d.x·q.y − d.y·q.x = 1 (extended Euclid): the
 * lattice points at cross t from a line along d lie at distance t / |d| from it — the near-collinear class's offsets.
 */
export function crossUnit(d: Vec): Vec {
  // Extended Euclid on (|a|, |b|): s·|a| + t·|b| = 1.
  let [r0, r1] = [Math.abs(d.x), Math.abs(d.y)];
  let [s0, s1] = [1, 0];
  let [t0, t1] = [0, 1];
  while (r1 !== 0) {
    const q = Math.floor(r0 / r1);
    [r0, r1] = [r1, r0 - q * r1];
    [s0, s1] = [s1, s0 - q * s1];
    [t0, t1] = [t1, t0 - q * t1];
  }
  if (r0 !== 1) throw new Error(`fuzz: crossUnit of a non-primitive direction (${d.x}, ${d.y})`);
  const x = Math.sign(d.x) * s0; // d.x·x + d.y·y = 1
  const y = Math.sign(d.y) * t0;
  return { x: -y, y: x }; // d.x·x − d.y·(−y) = 1
}

/** ⌊a / b⌋ for integers (b > 0), exact for |a| < 2⁵³. */
export function floorDiv(a: number, b: number): number {
  let q = Math.floor(a / b);
  while (q * b > a) q -= 1;
  while ((q + 1) * b <= a) q += 1;
  return q;
}

/** The cross product u × v of integer vectors (exact below 2⁵³). */
export function cross(u: Vec, v: Vec): number {
  return u.x * v.y - u.y * v.x;
}

/** 0 for directions in [0, π) (upper half-plane, the positive x-axis included), 1 for [π, 2π). */
function half(v: Vec): number {
  return v.y > 0 || (v.y === 0 && v.x > 0) ? 0 : 1;
}

/** An exact comparator of non-zero integer vectors by angle in [0, 2π); equal directions, the longer first. */
export function byAngle(u: Vec, v: Vec): number {
  const h = half(u) - half(v);
  if (h !== 0) return h;
  const c = cross(u, v);
  if (c !== 0) return c > 0 ? -1 : 1;
  return v.x * v.x + v.y * v.y - (u.x * u.x + u.y * u.y);
}

/**
 * The star ring around the lattice point c through c + v for each vector v (exact): zero vectors dropped, the rest
 * sorted by angle, one vector kept per direction (the longest), and the ring returned counter-clockwise only when every
 * angular gap between consecutive directions is strictly below π (each cross product positive). Such a ring is simple
 * — each edge lies in its own wedge from c, and c is strictly inside — whatever the radii. Null otherwise (fewer than
 * three directions, or a gap of π or more).
 */
export function starRing(c: LatticePoint, vectors: readonly Vec[]): FuzzRing | null {
  const vs = vectors.filter((v) => v.x !== 0 || v.y !== 0).sort(byAngle);
  const out: Vec[] = [];
  for (const v of vs) {
    const last = out[out.length - 1];
    if (last !== undefined && half(last) === half(v) && cross(last, v) === 0) continue;
    out.push(v);
  }
  const n = out.length;
  if (n < 3) return null;
  for (let i = 0; i < n; i += 1) if (!(cross(out[i], out[(i + 1) % n]) > 0)) return null;
  return out.map((v) => pt(c.x + v.x, c.y + v.y));
}

/** Three distinct lattice points as a counter-clockwise triangle, or null when they are collinear. */
export function triangleRing(points: readonly LatticePoint[]): FuzzRing | null {
  if (points.length !== 3) return null;
  const a2 = area2Big(points);
  if (a2 === 0n) return null;
  return a2 > 0n ? [points[0], points[1], points[2]] : [points[0], points[2], points[1]];
}

/** The ring reversed (a clockwise hole from a counter-clockwise outline). */
export function reversedRing(r: readonly LatticePoint[]): FuzzRing {
  return r.slice().reverse();
}

/** An integer linear map (x, y) → (a·x + b·y, c·x + d·y). */
export interface LatticeMap {
  a: number;
  b: number;
  c: number;
  d: number;
}

/** The eight symmetries of the square lattice. */
const SYMMETRIES: readonly LatticeMap[] = Object.freeze([
  { a: 1, b: 0, c: 0, d: 1 },
  { a: 0, b: -1, c: 1, d: 0 },
  { a: -1, b: 0, c: 0, d: -1 },
  { a: 0, b: 1, c: -1, d: 0 },
  { a: -1, b: 0, c: 0, d: 1 },
  { a: 1, b: 0, c: 0, d: -1 },
  { a: 0, b: 1, c: 1, d: 0 },
  { a: 0, b: -1, c: -1, d: 0 },
]);

/** The most a lattice map of `latticeMapArb` multiplies an extent by, per axis (its largest row sum, 13). */
export const MAP_GROWTH = 13;

/**
 * A unimodular lattice map (determinant ±1): a symmetry of the square times two shears with factors in [−3, 3]. It is
 * a bijection of the lattice, so it keeps every incidence, touch and simplicity of a shape exactly — a rotated copy
 * without rounding. Shrinks to the identity.
 */
export const latticeMapArb: fc.Arbitrary<LatticeMap> = fc
  .record({ sym: fc.integer({ min: 0, max: 7 }), s1: fc.integer({ min: -3, max: 3 }), s2: fc.integer({ min: -3, max: 3 }) })
  .map(({ sym, s1, s2 }) => {
    const m = SYMMETRIES[sym];
    // [[1 + s1·s2, s1], [s2, 1]] = [[1, s1], [0, 1]] · [[1, 0], [s2, 1]]
    const p = 1 + s1 * s2;
    return { a: m.a * p + m.b * s2, b: m.a * s1 + m.b, c: m.c * p + m.d * s2, d: m.c * s1 + m.d };
  });

/** The most a map of `shearMapArb` multiplies an extent by, per axis (its largest row sum, 4). */
export const SHEAR_GROWTH = 4;

/**
 * A symmetry of the square times one vertical shear (x, y) → (x, s·x + y), s in [−3, 3]: it keeps a shape's x-extent
 * and its area and never shortens a chain, so a thin shape stays thin (thin.ts). Shrinks to the identity.
 */
export const shearMapArb: fc.Arbitrary<LatticeMap> = fc
  .record({ sym: fc.integer({ min: 0, max: 7 }), s: fc.integer({ min: -3, max: 3 }) })
  .map(({ sym, s }) => {
    const m = SYMMETRIES[sym];
    return { a: m.a + m.b * s, b: m.b, c: m.c + m.d * s, d: m.d };
  });

/** The map's determinant: ±1 for `latticeMapArb`'s and `shearMapArb`'s. */
export function det(m: LatticeMap): number {
  return m.a * m.d - m.b * m.c;
}

/** The vectors through the map. */
export function mapVecs(vs: readonly Vec[], m: LatticeMap): Vec[] {
  return vs.map((v) => ({ x: m.a * v.x + m.b * v.y, y: m.c * v.x + m.d * v.y }));
}

/**
 * Integer vectors translated into [−limit, limit]² as lattice points: the bounding box placed at fractions (fx, fy)
 * of the room left (0: against the low side). The extent must fit; a generator that built a larger one has a bug.
 */
export function fitIntoRange(vs: readonly Vec[], limit: number, fx: number, fy: number): LatticePoint[] {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const v of vs) {
    if (v.x < minX) minX = v.x;
    if (v.x > maxX) maxX = v.x;
    if (v.y < minY) minY = v.y;
    if (v.y > maxY) maxY = v.y;
  }
  if (maxX - minX > 2 * limit || maxY - minY > 2 * limit) {
    throw new Error(`fuzz: a shape of extent ${maxX - minX} × ${maxY - minY} cannot fit in ±${limit}`);
  }
  const tx = place(-limit - minX, limit - maxX, fx);
  const ty = place(-limit - minY, limit - maxY, fy);
  return vs.map((v) => pt(v.x + tx, v.y + ty));
}

/** The points without consecutive duplicates (for a ring, the closing duplicate too). */
export function dedupePoints(points: readonly LatticePoint[], closed: boolean): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const p of points) {
    const q = out[out.length - 1];
    if (q === undefined || q.x !== p.x || q.y !== p.y) out.push(p);
  }
  if (closed) while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  return out;
}
