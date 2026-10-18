// §13.1 (1)'s random input classes, the arbitrary that draws each for polygons and for chains, the exact classifiers
// that recognise a member of each class from the shape alone (never from how it was drawn), and the coverage table —
// how many of a seeded sample of each arbitrary its class's classifier recognises (M0-k-01's exit bar: "the generators
// cover every random input class of §13.1 (a coverage table in the test output)"). The classifiers are independent of
// the generators' constructions, so the table is a measurement, not a restatement; each row carries the share it must
// reach (C-0161 (4)). M0-k-04's B-FUZZ runner reads the same registry.
import fc from 'fast-check';
import { area2Big, orient2d, type LatticePoint } from '@plat/kernel';
import { chain } from './chain.js';
import { duplicated, large, zeroArea } from './degenerate.js';
import { holedPolygon } from './holed.js';
import { nearCollinear } from './collinear.js';
import { polygon } from './polygon.js';
import { regularSnapped } from './regular.js';
import { seedFamily } from './seeds.js';
import { selfTouching } from './touching.js';
import { thin } from './thin.js';
import { dedupePoints } from './lattice.js';
import type { FuzzHoledPolygon, FuzzShape } from './types.js';

/** §13.1 (1)'s random input classes, in its order. */
export const FUZZ_CLASS_NAMES = Object.freeze([
  'concave',
  'holed',
  'thin',
  'near-collinear',
  'self-touching',
  'snapped',
  'duplicated-vertex',
  '≥ 300-vertex',
  'zero-area',
] as const);

/** One of §13.1 (1)'s random input classes. */
export type FuzzClass = (typeof FUZZ_CLASS_NAMES)[number];

type Pts = readonly LatticePoint[];

/** The orientation sign of a lattice ring (exact twice-area), −1, 0 or 1. */
function areaSign(r: Pts): number {
  const a = area2Big(r);
  return a > 0n ? 1 : a < 0n ? -1 : 0;
}

/** Concave ring: a vertex turning against the ring's orientation (exact; consecutive duplicates ignored). */
export function isConcaveRing(ring: Pts): boolean {
  const r = dedupePoints(ring, true);
  const s = areaSign(r);
  if (s === 0 || r.length < 4) return false;
  const n = r.length;
  for (let i = 0; i < n; i += 1) {
    const a = r[(i + n - 1) % n];
    const b = r[i];
    const c = r[(i + 1) % n];
    if (Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y)) === -s) return true;
  }
  return false;
}

/** Concave chain: it turns both left and right (exact). */
export function isConcaveChain(c: Pts): boolean {
  const r = dedupePoints(c, false);
  let left = false;
  let right = false;
  for (let i = 1; i + 1 < r.length; i += 1) {
    const o = orient2d(r[i - 1].x, r[i - 1].y, r[i].x, r[i].y, r[i + 1].x, r[i + 1].y);
    if (o > 0) left = true;
    if (o < 0) right = true;
  }
  return left && right;
}

/** Holed: at least one hole. */
export function isHoled(h: FuzzHoledPolygon): boolean {
  return h.polygon.length >= 2;
}

/**
 * Thin: the shape's mean width — twice its area over its boundary length, the chain closed by its last edge — is at
 * most 5 % of its diameter (its bounding box's diagonal), and the diameter is positive.
 */
export function isThin(points: Pts): boolean {
  const r = dedupePoints(points, true);
  if (r.length < 2) return false;
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let per = 0;
  for (let i = 0; i < r.length; i += 1) {
    const p = r[i];
    const q = r[(i + 1) % r.length];
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
    per += Math.sqrt((q.x - p.x) ** 2 + (q.y - p.y) ** 2);
  }
  const diag = Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2);
  if (!(diag > 0) || !(per > 0)) return false;
  const area2 = Math.abs(Number(area2Big(r)));
  return area2 / per <= 0.05 * diag;
}

/**
 * Near-collinear: some vertex v between neighbours a and b (cyclically for a ring) stands off the line ab by more than
 * 0 and at most 2 cm, its projection strictly inside the segment ab (exact: cross² ≤ 4·|ab|² in BigInt).
 */
export function isNearCollinear(points: Pts, closed: boolean): boolean {
  const r = dedupePoints(points, closed);
  const n = r.length;
  if (n < 3) return false;
  const last = closed ? n : n - 2;
  for (let i = 0; i < last; i += 1) {
    const a = r[i];
    const v = r[(i + 1) % n];
    const b = r[(i + 2) % n];
    const ex = b.x - a.x;
    const ey = b.y - a.y;
    const cr = orient2d(a.x, a.y, b.x, b.y, v.x, v.y);
    if (cr === 0) continue;
    if (!((v.x - a.x) * ex + (v.y - a.y) * ey > 0 && (b.x - v.x) * ex + (b.y - v.y) * ey > 0)) continue;
    const c = BigInt(cr);
    if (c * c <= 4n * (BigInt(ex) * BigInt(ex) + BigInt(ey) * BigInt(ey))) return true;
  }
  return false;
}

/** Whether p, collinear with ab, lies on the closed segment ab. */
function within(a: LatticePoint, b: LatticePoint, p: LatticePoint): boolean {
  return Math.min(a.x, b.x) <= p.x && p.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= p.y && p.y <= Math.max(a.y, b.y);
}

/**
 * The places where a ring or chain touches itself (exact; consecutive duplicates ignored): each pair (vertex i,
 * edge j) with vertex i on the closed edge j and i not an end of edge j — a repeated point, or a vertex on another
 * edge. Empty when the shape never meets itself away from its own joints.
 */
export function selfTouches(points: Pts, closed: boolean): { vertex: number; edge: number }[] {
  const r = dedupePoints(points, closed);
  const n = r.length;
  const edges = closed ? n : n - 1;
  const out: { vertex: number; edge: number }[] = [];
  for (let j = 0; j < edges; j += 1) {
    const a = r[j];
    const b = r[(j + 1) % n];
    for (let i = 0; i < n; i += 1) {
      if (i === j || i === (j + 1) % n) continue;
      const p = r[i];
      if (orient2d(a.x, a.y, b.x, b.y, p.x, p.y) === 0 && within(a, b, p)) out.push({ vertex: i, edge: j });
    }
  }
  return out;
}

/** Self-touching: some vertex lies on an edge it is not an end of. */
export function isSelfTouching(points: Pts, closed: boolean): boolean {
  return selfTouches(points, closed).length > 0;
}

/**
 * Snapped (a snapped rotated rectangle, square or regular n-gon): at least three distinct vertices, all at one distance
 * from their mean within 3 cm — every rectangle and regular n-gon is cyclic, and `snap` moves each vertex by at most
 * √2 / 2 cm — on a circle of radius at least 2 cm.
 */
export function isSnappedRegular(points: Pts): boolean {
  const r = dedupePoints(points, false);
  if (r.length < 3) return false;
  let sx = 0;
  let sy = 0;
  for (const p of r) {
    sx += p.x;
    sy += p.y;
  }
  const cx = sx / r.length;
  const cy = sy / r.length;
  let lo = Infinity;
  let hi = -Infinity;
  for (const p of r) {
    const d = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2);
    lo = Math.min(lo, d);
    hi = Math.max(hi, d);
  }
  return hi >= 2 && hi - lo <= 3;
}

/** Duplicated vertex: two consecutive vertices equal (cyclically for a ring: an explicit closing vertex counts). */
export function hasDuplicateVertex(points: Pts, closed: boolean): boolean {
  const n = points.length;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i += 1) {
    const p = points[i];
    const q = points[(i + 1) % n];
    if (p.x === q.x && p.y === q.y) return true;
  }
  return false;
}

/** ≥ 300 vertices. */
export function isLarge(points: Pts): boolean {
  return points.length >= 300;
}

/** Zero-area ring: three or more distinct vertices and an exact twice-area of 0. */
export function isZeroAreaRing(points: Pts): boolean {
  const r = dedupePoints(points, true);
  return r.length >= 3 && area2Big(r) === 0n;
}

/** Zero-area chain: three or more vertices, all on one line (exact), not all one point. */
export function isZeroAreaChain(points: Pts): boolean {
  const r = dedupePoints(points, false);
  if (r.length < 3) return false;
  const a = r[0];
  const b = r.find((p) => p.x !== a.x || p.y !== a.y);
  if (b === undefined) return false;
  return r.every((p) => orient2d(a.x, a.y, b.x, b.y, p.x, p.y) === 0);
}

/** One row of the class registry: the class, the form, the arbitrary that draws it, the classifier and the floor. */
export interface FuzzClassRow {
  cls: FuzzClass;
  shape: FuzzShape;
  /** The arbitrary's call as written, or null where the class does not apply to the form. */
  arbitrary: string | null;
  /** Why the class does not apply, where it does not. */
  reason?: string;
  /** A fresh arbitrary (null where the class does not apply). */
  make: (() => fc.Arbitrary<unknown>) | null;
  /** Whether a drawn value is a member of the class. */
  classify: ((v: unknown) => boolean) | null;
  /** The share of a sample the classifier must recognise. */
  minShare: number;
}

/** A row whose arbitrary yields `T`. */
function row<T>(cls: FuzzClass, shape: FuzzShape, arbitrary: string, make: () => fc.Arbitrary<T>, classify: (v: T) => boolean, minShare: number): FuzzClassRow {
  return { cls, shape, arbitrary, make, classify: classify as (v: unknown) => boolean, minShare };
}

/**
 * The registry: each §13.1 (1) class for polygons and for chains (C-0161 (4)). `holed` applies to polygons only: a
 * chain bounds no area, so it has no holes.
 */
export const FUZZ_CLASSES: readonly FuzzClassRow[] = Object.freeze([
  row('concave', 'polygon', 'arb.polygon()', () => polygon(), (r: Pts) => isConcaveRing(r), 0.6),
  row('concave', 'chain', 'arb.chain()', () => chain(), (c: Pts) => isConcaveChain(c), 0.5),
  row('holed', 'polygon', 'arb.holedPolygon()', () => holedPolygon(), (h: FuzzHoledPolygon) => isHoled(h), 1),
  { cls: 'holed', shape: 'chain', arbitrary: null, reason: 'a chain bounds no area, so it has no holes', make: null, classify: null, minShare: 0 },
  row('thin', 'polygon', 'arb.thin()', () => thin(), (r: Pts) => isThin(r), 1),
  row('thin', 'chain', "arb.thin({ shape: 'chain' })", () => thin({ shape: 'chain' }), (c: Pts) => isThin(c), 1),
  row('near-collinear', 'polygon', 'arb.nearCollinear()', () => nearCollinear(), (r: Pts) => isNearCollinear(r, true), 1),
  row('near-collinear', 'chain', "arb.nearCollinear({ shape: 'chain' })", () => nearCollinear({ shape: 'chain' }), (c: Pts) => isNearCollinear(c, false), 1),
  row('self-touching', 'polygon', 'arb.selfTouching()', () => selfTouching(), (r: Pts) => isSelfTouching(r, true), 1),
  row('self-touching', 'chain', "arb.selfTouching({ shape: 'chain' })", () => selfTouching({ shape: 'chain' }), (c: Pts) => isSelfTouching(c, false), 1),
  row('snapped', 'polygon', 'arb.regularSnapped()', () => regularSnapped(), (r: Pts) => isSnappedRegular(r), 0.9),
  row('snapped', 'chain', "arb.regularSnapped({ shape: 'chain' })", () => regularSnapped({ shape: 'chain' }), (c: Pts) => isSnappedRegular(c), 0.9),
  row('duplicated-vertex', 'polygon', 'arb.duplicated()', () => duplicated(), (r: Pts) => hasDuplicateVertex(r, true), 1),
  row('duplicated-vertex', 'chain', "arb.duplicated({ shape: 'chain' })", () => duplicated({ shape: 'chain' }), (c: Pts) => hasDuplicateVertex(c, false), 1),
  row('≥ 300-vertex', 'polygon', 'arb.large()', () => large(), (r: Pts) => isLarge(r), 1),
  row('≥ 300-vertex', 'chain', "arb.large({ shape: 'chain' })", () => large({ shape: 'chain' }), (c: Pts) => isLarge(c), 1),
  row('zero-area', 'polygon', 'arb.zeroArea()', () => zeroArea(), (r: Pts) => isZeroAreaRing(r), 1),
  row('zero-area', 'chain', "arb.zeroArea({ shape: 'chain' })", () => zeroArea({ shape: 'chain' }), (c: Pts) => isZeroAreaChain(c), 1),
]);

/** One measured row of the coverage table. */
export interface FuzzCoverageRow {
  cls: FuzzClass;
  shape: FuzzShape;
  arbitrary: string | null;
  reason?: string;
  drawn: number;
  hits: number;
  share: number;
  minShare: number;
  pass: boolean;
}

/**
 * The coverage table: each registry row's arbitrary sampled `samples` times from seed 0 of the family
 * `fuzz/coverage/<class>/<shape>` and classified. A row that does not apply passes with nothing drawn.
 */
export function fuzzCoverage(samples = 200): FuzzCoverageRow[] {
  return FUZZ_CLASSES.map((r) => {
    if (r.make === null || r.classify === null) {
      return { cls: r.cls, shape: r.shape, arbitrary: null, reason: r.reason, drawn: 0, hits: 0, share: 0, minShare: 0, pass: true };
    }
    const seed = seedFamily(`fuzz/coverage/${r.cls}/${r.shape}`, 0) | 0;
    const values = fc.sample(r.make(), { seed, numRuns: samples });
    const hits = values.filter((v) => r.classify?.(v) === true).length;
    const share = hits / values.length;
    return { cls: r.cls, shape: r.shape, arbitrary: r.arbitrary, drawn: values.length, hits, share, minShare: r.minShare, pass: share >= r.minShare };
  });
}

/** The coverage table as text, one line per row (the test prints it). */
export function formatFuzzCoverage(rows: readonly FuzzCoverageRow[]): string {
  const head = ['class', 'shape', 'arbitrary', 'drawn', 'hits', 'share', 'floor', 'verdict'];
  const lines = rows.map((r) =>
    r.arbitrary === null
      ? [r.cls, r.shape, `— (${r.reason ?? 'not applicable'})`, '—', '—', '—', '—', 'n/a']
      : [r.cls, r.shape, r.arbitrary, String(r.drawn), String(r.hits), r.share.toFixed(3), r.minShare.toFixed(2), r.pass ? 'pass' : 'FAIL'],
  );
  const widths = head.map((h, i) => Math.max(h.length, ...lines.map((l) => l[i].length)));
  const fmt = (l: readonly string[]) => l.map((c, i) => c.padEnd(widths[i])).join(' | ');
  return [
    '§13.1 (1) random input classes — coverage of the fuzz generators (M0-k-01)',
    fmt(head),
    widths.map((w) => '-'.repeat(w)).join('-|-'),
    ...lines.map(fmt),
  ].join('\n');
}
