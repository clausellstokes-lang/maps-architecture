// The numeric-core judge's exact references (M0-k-02; C-0110: "the cases that need only the numeric core —
// quantisation, the gcd-stepped collinear class against orient2d, the star rings against area2 — run green against
// M0-a-01 here"). Each reference is computed independently of the kernel — rounding by its definition, orientation
// and area in BigInt — so a run judges `snap`, `orient2d`, `orient`, `area2` and `area2Big` against a second
// computation, never against themselves.
import type { LatticePoint } from '@plat/kernel';
import type { P } from './draw.js';
import type { ConstructiveVerdict } from './types.js';

/** 2²³: `snap` refuses a rounded |v| at or above it (§3.2 (7)). */
export const RANGE_BOUND = 8_388_608;

/** The nearest integer, a half away from zero, never −0 — C-0134 (1)'s rule, by its definition; NaN and ±∞ unchanged. */
export function refRoundHalfAway(v: number): number {
  if (!Number.isFinite(v)) return v;
  const m = Math.abs(v);
  const f = Math.floor(m);
  const r = m - f >= 0.5 ? f + 1 : f;
  return r === 0 ? 0 : v < 0 ? -r : r;
}

/** The reference snap: the rounded pair, or the refused coordinate (x first) when a rounded |v| is not below 2²³. */
export function refSnap(x: number, y: number): { ok: true; x: number; y: number } | { ok: false; detail: 'x' | 'y' } {
  const rx = refRoundHalfAway(x);
  if (!(Math.abs(rx) < RANGE_BOUND)) return { ok: false, detail: 'x' };
  const ry = refRoundHalfAway(y);
  if (!(Math.abs(ry) < RANGE_BOUND)) return { ok: false, detail: 'y' };
  return { ok: true, x: rx, y: ry };
}

/** (b − a) × (c − a) in BigInt. */
export function refCross(a: P, b: P, c: P): bigint {
  return (BigInt(b.x) - BigInt(a.x)) * (BigInt(c.y) - BigInt(a.y)) - (BigInt(b.y) - BigInt(a.y)) * (BigInt(c.x) - BigInt(a.x));
}

/** The sign of a BigInt, as −1, 0 or 1. */
export function bigSign(v: bigint): number {
  return v > 0n ? 1 : v < 0n ? -1 : 0;
}

/** Twice the signed area of a ring, by the shoelace formula on the raw coordinates, in BigInt. */
export function refArea2(ring: readonly P[]): bigint {
  let s = 0n;
  const n = ring.length;
  for (let i = 0; i < n; i += 1) {
    const p = ring[i];
    const q = ring[(i + 1) % n];
    s += BigInt(p.x) * BigInt(q.y) - BigInt(q.x) * BigInt(p.y);
  }
  return s;
}

/**
 * The partial sums area2 accumulates — each shoelace term on coordinates relative to the ring's bounding-box minimum
 * corner (§3.2 (6)) — and the largest |partial| they reach without a flush, in BigInt: a witness that a ring takes
 * the flush at 2⁵² (§3.11's caps).
 */
export function refLargestPartial(ring: readonly P[]): bigint {
  let minX = Infinity;
  let minY = Infinity;
  for (const p of ring) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
  }
  let s = 0n;
  let best = 0n;
  const n = ring.length;
  for (let i = 0; i < n; i += 1) {
    const p = ring[(i + n - 1) % n];
    const q = ring[i];
    s += BigInt(p.x - minX) * BigInt(q.y - minY) - BigInt(q.x - minX) * BigInt(p.y - minY);
    const m = s < 0n ? -s : s;
    if (m > best) best = m;
  }
  return best;
}

/**
 * For a primitive direction d (gcd 1), an integer vector q with d × q = 1 (the extended Euclidean algorithm): the
 * lattice points at cross ±1 from a line along d — the nearest a lattice point can stand off it.
 */
export function crossUnit(d: P): P {
  let [r0, r1] = [Math.abs(d.x), Math.abs(d.y)];
  let [s0, s1] = [1, 0];
  let [t0, t1] = [0, 1];
  while (r1 !== 0) {
    const k = Math.floor(r0 / r1);
    [r0, r1] = [r1, r0 - k * r1];
    [s0, s1] = [s1, s0 - k * s1];
    [t0, t1] = [t1, t0 - k * t1];
  }
  if (r0 !== 1) throw new Error(`constructive: crossUnit of a non-primitive direction (${String(d.x)}, ${String(d.y)})`);
  // s0·|d.x| + t0·|d.y| = 1, so d.x·(sx·s0) + d.y·(sy·t0) = 1 with sx, sy the signs of d's components.
  const u = (d.x < 0 ? -1 : 1) * s0;
  const v = (d.y < 0 ? -1 : 1) * t0;
  // d × (−v, u) = d.x·u + d.y·v = 1.
  return { x: -v + 0, y: u + 0 };
}

/** A green verdict. */
export const GREEN: ConstructiveVerdict = Object.freeze({ ok: true as const });

/** A failed verdict. */
export function fail(reason: string): ConstructiveVerdict {
  return Object.freeze({ ok: false as const, reason });
}

/** A point in a reason. */
export function at(p: LatticePoint | P): string {
  return `(${String(p.x)}, ${String(p.y)})`;
}

/** The numeric-core judge's exact references, for the runner and the tests (the package index's one name for them). */
export const CONSTRUCTIVE_REFERENCE = Object.freeze({
  roundHalfAway: refRoundHalfAway,
  snap: refSnap,
  cross: refCross,
  area2: refArea2,
  largestPartial: refLargestPartial,
  crossUnit,
  sign: bigSign,
});
