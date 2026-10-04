// arb.faceSet(kind) (M0-k-01; §16 M0 (b): the synthetic face set — curved, round-joined, triangular, C-shaped and
// holed faces — on which the bent cut's bars run, M0-b-04; §4.6 step 8's F-CUT bars on random concave and holed faces;
// the S11 workload's plots, C-0107). Faces at CITY block scales by default — circumradius 30–300 m, inside CITY's
// 5 km frame (§1.1) — or at plot scale (4–30 m; C-0161 (5)). Every outline is built exactly on the lattice:
// the curved, round-joined, triangular and concave kinds are point sets around the face's centre turned into a star
// ring (lattice.ts's `starRing`, simple by construction); the C-shaped kind is an annular sector whose outer arc
// (chords at least cos 6° of R from the centre) and inner arc (at most 0.65 R) are separated by a circle, checked by the
// exact simplicity test; the holed kind is arb.holedPolygon's construction with disjoint holes. Outer rings
// counter-clockwise, holes clockwise.
import fc from 'fast-check';
import { dmath, orient, type LatticePoint, type PolygonCm } from '@plat/kernel';
import { isSimpleRing } from '../oracles/rings.js';
import { holedDraws } from './holed.js';
import { starArb } from './polygon.js';
import { TAU, dedupePoints, place, posArb, pt, scaleArb, starRing, type Vec } from './lattice.js';
import type { FuzzRing } from './types.js';

/** The face kinds: §16 M0 (b)'s five and F-CUT's random concave faces. */
export type FuzzFaceKind = 'curved' | 'round-joined' | 'triangular' | 'C-shaped' | 'holed' | 'concave';

/** Every face kind; the first five are §16 M0 (b)'s synthetic face set. */
export const FUZZ_FACE_KINDS: readonly FuzzFaceKind[] = Object.freeze(['curved', 'round-joined', 'triangular', 'C-shaped', 'holed', 'concave']);

/** The face scales: a circumradius range in cm (C-0161 (5)). */
export const FUZZ_FACE_SCALES = Object.freeze({ block: Object.freeze([3_000, 30_000] as const), plot: Object.freeze([400, 3_000] as const) });

/** Half the side of CITY's frame: 25 km² square, 5.0 km a side (§1.1's CITY row). */
export const CITY_HALF_SIDE_CM = 250_000;

/**
 * A generated face: the outline (and holes), its construction centre — strictly inside the outline for every kind but
 * the C-shaped, whose centre is its annulus's, in the opening — and its reach: the largest distance from the centre to
 * a vertex, rounded up. Every vertex lies inside the frame.
 */
export interface FuzzFace {
  kind: FuzzFaceKind;
  polygon: PolygonCm;
  centre: LatticePoint;
  radiusCm: number;
}

/** arb.faceSet's options. */
export interface FuzzFaceOptions {
  /** `block` (the default) or `plot`. */
  scale?: keyof typeof FUZZ_FACE_SCALES;
  /** The circumradius range in cm, instead of the scale's. */
  sizeCm?: readonly [number, number];
  /** Faces are centred inside [−halfSideCm, halfSideCm]²; CITY's 250 000 by default. */
  halfSideCm?: number;
}

/** A centre and a radius for a face of `size`, inside the frame. */
const placedArb = (size: readonly [number, number], half: number) =>
  fc.record({ R: scaleArb(size[0], size[1]), fx: posArb, fy: posArb, turn: fc.integer({ min: 0, max: 65_535 }) }).map(({ R, fx, fy, turn }) => {
    // A curved side bows out to at most √1.25 R ≈ 1.12 R from the centre; 1.2 R keeps every face inside the frame.
    const m = Math.ceil(1.2 * R);
    return { R, c: pt(place(-half + m, half - m, fx), place(-half + m, half - m, fy)), phi: (TAU * turn) / 65_536 };
  });

/** The corner at sector j of k, place u per mille inside it, radius share s per mille. */
function corner(c: LatticePoint, R: number, phi: number, j: number, k: number, u: number, s: number): LatticePoint {
  const th = phi + (TAU * (j * 1000 + u)) / (1000 * k);
  return pt(c.x + ((R * s) / 1000) * dmath.cos(th), c.y + ((R * s) / 1000) * dmath.sin(th));
}

/** A built outline with its construction centre and circumradius, or null when a draw does not give one. */
type Built = { ring: FuzzRing; c: LatticePoint; R: number } | null;

/** The star ring of points around c, with c and R, or null. */
function around(c: LatticePoint, R: number, points: readonly LatticePoint[]): Built {
  const ring = starRing(
    c,
    points.map((p): Vec => ({ x: p.x - c.x, y: p.y - c.y })),
  );
  return ring === null ? null : { ring, c, R };
}

/** Curved faces: 3–6 corners, each side bowed by a half-sine of −12 % … +25 % of its chord, sampled 4–16 times. */
function curved(size: readonly [number, number], half: number): fc.Arbitrary<Built> {
  const row = fc.record({
    u: fc.integer({ min: 300, max: 700 }),
    s: fc.integer({ min: 700, max: 1000 }),
    bulge: fc.integer({ min: -120, max: 250 }),
    m: fc.integer({ min: 4, max: 16 }),
  });
  return fc.record({ at: placedArb(size, half), rows: fc.array(row, { minLength: 3, maxLength: 6 }) }).map(({ at: { R, c, phi }, rows }) => {
    const k = rows.length;
    const corners = rows.map((r, j) => corner(c, R, phi, j, k, r.u, r.s));
    const pts: LatticePoint[] = [...corners];
    rows.forEach((r, i) => {
      const a = corners[i];
      const b = corners[(i + 1) % k];
      const ex = b.x - a.x;
      const ey = b.y - a.y;
      const len = Math.sqrt(ex * ex + ey * ey);
      if (len === 0) return;
      const nx = ey / len; // outward: to the right of a → b on a counter-clockwise ring
      const ny = -ex / len;
      for (let j = 1; j <= r.m; j += 1) {
        const t = j / (r.m + 1);
        const off = ((r.bulge * len) / 1000) * dmath.sin(Math.PI * t);
        pts.push(pt(a.x + t * ex + off * nx, a.y + t * ey + off * ny));
      }
    });
    return around(c, R, pts);
  });
}

/** Round-joined faces: 3–7 corners, each replaced by a quadratic round join over 10–40 % of its sides' halves. */
function roundJoined(size: readonly [number, number], half: number): fc.Arbitrary<Built> {
  const row = fc.record({
    u: fc.integer({ min: 300, max: 700 }),
    s: fc.integer({ min: 600, max: 1000 }),
    f: fc.integer({ min: 100, max: 400 }),
    m: fc.integer({ min: 3, max: 10 }),
  });
  return fc.record({ at: placedArb(size, half), rows: fc.array(row, { minLength: 3, maxLength: 7 }) }).map(({ at: { R, c, phi }, rows }) => {
    const k = rows.length;
    const corners = rows.map((r, j) => corner(c, R, phi, j, k, r.u, r.s));
    const pts: LatticePoint[] = [];
    rows.forEach((r, i) => {
      const p = corners[i];
      const prev = corners[(i + k - 1) % k];
      const next = corners[(i + 1) % k];
      const share = r.f / 2000;
      const a = { x: p.x + share * (prev.x - p.x), y: p.y + share * (prev.y - p.y) };
      const b = { x: p.x + share * (next.x - p.x), y: p.y + share * (next.y - p.y) };
      for (let j = 0; j < r.m; j += 1) {
        const t = j / (r.m - 1);
        const w0 = (1 - t) * (1 - t);
        const w1 = 2 * t * (1 - t);
        const w2 = t * t;
        pts.push(pt(w0 * a.x + w1 * p.x + w2 * b.x, w0 * a.y + w1 * p.y + w2 * b.y));
      }
    });
    return around(c, R, pts);
  });
}

/** Triangular faces: three corners about the centre (each angular gap 72°–168°), 0–12 kerb vertices on each side. */
function triangular(size: readonly [number, number], half: number): fc.Arbitrary<Built> {
  const row = fc.record({ u: fc.integer({ min: 300, max: 700 }), s: fc.integer({ min: 600, max: 1000 }), m: fc.integer({ min: 0, max: 12 }) });
  return fc.record({ at: placedArb(size, half), rows: fc.tuple(row, row, row) }).map(({ at: { R, c, phi }, rows }) => {
    const corners = rows.map((r, j) => corner(c, R, phi, j, 3, r.u, r.s));
    const pts: LatticePoint[] = [...corners];
    rows.forEach((r, i) => {
      const a = corners[i];
      const b = corners[(i + 1) % 3];
      for (let j = 1; j <= r.m; j += 1) {
        const t = j / (r.m + 1);
        pts.push(pt(a.x + t * (b.x - a.x), a.y + t * (b.y - a.y)));
      }
    });
    return around(c, R, pts);
  });
}

/** C-shaped faces: an annular sector — inner radius 35–65 % of R, span 200°–300°, arcs sampled every 4°–12°. */
function cShaped(size: readonly [number, number], half: number): fc.Arbitrary<Built> {
  return fc
    .record({
      at: placedArb(size, half),
      inner: fc.integer({ min: 350, max: 650 }),
      span: fc.integer({ min: 20_000, max: 30_000 }),
      step: fc.integer({ min: 400, max: 1_200 }),
    })
    .map(({ at: { R, c, phi }, inner, span, step }) => {
      const n = Math.ceil(span / step);
      const r = (R * inner) / 1000;
      const outer: LatticePoint[] = [];
      const innerArc: LatticePoint[] = [];
      for (let j = 0; j <= n; j += 1) {
        const th = phi + (TAU * span * j) / (36_000 * n);
        outer.push(pt(c.x + R * dmath.cos(th), c.y + R * dmath.sin(th)));
        innerArc.push(pt(c.x + r * dmath.cos(th), c.y + r * dmath.sin(th)));
      }
      const ring = dedupePoints([...outer, ...innerArc.reverse()], true);
      return isSimpleRing(ring) && orient(ring) > 0 ? { ring, c, R } : null;
    });
}

/** Concave faces (F-CUT's random faces): star rings of 5–14 vertices, radii 35–100 % of R, at least one reflex. */
function concave(size: readonly [number, number], half: number): fc.Arbitrary<Built> {
  return starArb({ vertices: [5, 14], radiusShare: [350, 1000], jitter: [150, 850], size, limit: half, radiusPerVertex: 1 }).map((d) =>
    hasReflex(d.ring) ? { ring: d.ring, c: d.centre, R: d.radiusCm } : null,
  );
}

/** Whether a counter-clockwise ring has a reflex vertex (exact). */
export function hasReflex(ring: readonly LatticePoint[]): boolean {
  const n = ring.length;
  for (let i = 0; i < n; i += 1) {
    const a = ring[(i + n - 1) % n];
    const b = ring[i];
    const c = ring[(i + 1) % n];
    if ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) < 0) return true;
  }
  return false;
}

/**
 * Faces of one kind at CITY block scale (or plot scale); see the module comment. Each draw is one face; a set is n
 * draws from one seed family (`fc.sample(arb.faceSet(kind), { seed: seedFamily(…), numRuns: n })`).
 */
export function faceSet(kind: FuzzFaceKind, opts: FuzzFaceOptions = {}): fc.Arbitrary<FuzzFace> {
  if (!FUZZ_FACE_KINDS.includes(kind)) throw new RangeError(`fuzz: unknown face kind ${String(kind)}`);
  const scale = opts.scale ?? 'block';
  if (!(scale in FUZZ_FACE_SCALES)) throw new RangeError(`fuzz: unknown face scale ${String(scale)}`);
  const half = opts.halfSideCm ?? CITY_HALF_SIDE_CM;
  const size = opts.sizeCm ?? FUZZ_FACE_SCALES[scale];
  if (!Number.isInteger(half) || half < 1 || half > 8_388_607) throw new RangeError(`fuzz: halfSideCm must be an integer in [1, 2²³ − 1], got ${String(half)}`);
  if (!Number.isInteger(size[0]) || !Number.isInteger(size[1]) || size[0] < 100 || size[1] < size[0] || 2 * size[1] > half) {
    throw new RangeError(`fuzz: sizeCm must be integers 100 ≤ min ≤ max ≤ halfSideCm / 2, got [${String(size[0])}, ${String(size[1])}]`);
  }
  if (kind === 'holed') {
    const outer = starArb({ vertices: [5, 10], radiusShare: [500, 1000], jitter: [250, 750], size, limit: half, radiusPerVertex: 1 });
    return holedDraws(outer, [1, 2], 'disjoint').map((h) => ({ kind, polygon: h.holed.polygon, centre: h.centre, radiusCm: reach(h.holed.polygon[0], h.centre) }));
  }
  const build = { curved, 'round-joined': roundJoined, triangular, 'C-shaped': cShaped, concave }[kind];
  return build(size, half)
    .filter((b): b is NonNullable<Built> => b !== null)
    .map((b) => ({ kind, polygon: [b.ring], centre: b.c, radiusCm: reach(b.ring, b.c) }));
}

/** The largest distance from the centre to a vertex, rounded up: every vertex lies within it. */
function reach(ring: readonly LatticePoint[], c: LatticePoint): number {
  let m = 0;
  for (const p of ring) m = Math.max(m, (p.x - c.x) * (p.x - c.x) + (p.y - c.y) * (p.y - c.y));
  return Math.ceil(Math.sqrt(m));
}
