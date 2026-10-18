// arb.holedPolygon (M0-k-01; §13.1 (1) holed polygons; the builds' "holes disjoint / touching at a vertex / along an
// edge"). The outer ring is a star ring around its centre c; each hole lives in one fan triangle T = (pᵢ, pᵢ₊₁, c) of
// it, which the star ring's interior contains (open triangle) with only its side pᵢpᵢ₊₁ on the outline. A hole is a
// star ring around T's rounded incentre h whose points lie strictly inside T — so a disjoint hole is strictly inside
// the outer ring — plus, for a touching hole, its contact points on that side: one lattice point of the closed side (a
// vertex contact: an outer vertex or a point inside the side), or two (an edge contact: the hole's edge a′b′ lies on
// the side). Holes sit in fans two apart, so no two holes meet. Every test is exact; nothing is snapped into place.
import fc from 'fast-check';
import { dmath, orient2d, type LatticePoint } from '@plat/kernel';
import { RADIUS_PER_VERTEX, starArb, type StarDraw } from './polygon.js';
import { TAU, cross, gcd, place, posArb, pt, resolveCount, resolveLimit, resolveSize, reversedRing, starRing, type Vec } from './lattice.js';
import type { FuzzBoundsOptions, FuzzHoleContact, FuzzHoledPolygon, FuzzRing } from './types.js';

/** arb.holedPolygon's options. */
export interface FuzzHoledOptions extends FuzzBoundsOptions {
  /** The number of holes, [1, 3] by default (at most half the outer ring's vertex count is used). */
  holes?: readonly [number, number];
  /** Every hole's contact, or `mixed` (the default): each hole draws its own. */
  contact?: FuzzHoleContact | 'mixed';
  /** The outer ring's vertex count, [4, 12] by default. */
  vertices?: readonly [number, number];
}

const CONTACTS: readonly FuzzHoleContact[] = ['disjoint', 'vertex', 'edge'];

/** One hole's draw: its contact pick, its interior points' sectors and radii, and its contact positions. */
interface HoleRow {
  pick: number;
  rows: { u: number; s: number }[];
  turn: number;
  at1: number;
  at2: number;
}

const holeRowArb: fc.Arbitrary<HoleRow> = fc.record({
  pick: fc.integer({ min: 0, max: 2 }),
  rows: fc.array(fc.record({ u: fc.integer({ min: 100, max: 900 }), s: fc.integer({ min: 300, max: 1000 }) }), {
    minLength: 4,
    maxLength: 8,
  }),
  turn: fc.integer({ min: 0, max: 4_095 }),
  at1: posArb,
  at2: posArb,
});

/** Whether p lies strictly inside the counter-clockwise triangle abc (exact). */
export function strictlyInside(a: LatticePoint, b: LatticePoint, c: LatticePoint, p: LatticePoint): boolean {
  return orient2d(a.x, a.y, b.x, b.y, p.x, p.y) > 0 && orient2d(b.x, b.y, c.x, c.y, p.x, p.y) > 0 && orient2d(c.x, c.y, a.x, a.y, p.x, p.y) > 0;
}

/**
 * One hole in the counter-clockwise fan triangle (a, b, c) whose side ab lies on the outline, with the given contact;
 * clockwise, or null when the triangle is too small to hold one.
 */
export function holeInFan(a: LatticePoint, b: LatticePoint, c: LatticePoint, contact: FuzzHoleContact, row: HoleRow): FuzzRing | null {
  const la = Math.sqrt((b.x - c.x) ** 2 + (b.y - c.y) ** 2);
  const lb = Math.sqrt((c.x - a.x) ** 2 + (c.y - a.y) ** 2);
  const lc = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  const per = la + lb + lc;
  const twiceArea = orient2d(a.x, a.y, b.x, b.y, c.x, c.y);
  if (!(twiceArea > 0)) return null;
  const h = pt((la * a.x + lb * b.x + lc * c.x) / per, (la * a.y + lb * b.y + lc * c.y) / per);
  if (!strictlyInside(a, b, c, h)) return null;
  const rho = Math.floor((0.85 * twiceArea) / per) - 1; // 0.85 of the inradius, less the rounding of h
  if (rho < 2) return null;
  const e = { x: b.x - a.x, y: b.y - a.y };
  const g = gcd(e.x, e.y);
  const onSide = (j: number): LatticePoint => pt(a.x + (e.x / g) * j, a.y + (e.y / g) * j);
  const contacts: LatticePoint[] = [];
  if (contact === 'vertex') contacts.push(onSide(place(0, g, row.at1)));
  if (contact === 'edge') {
    const j1 = place(0, g - 1, row.at1);
    contacts.push(onSide(j1), onSide(place(j1 + 1, g, row.at2)));
  }
  const m = row.rows.length;
  const vecs: Vec[] = contacts.map((p) => ({ x: p.x - h.x, y: p.y - h.y }));
  const [ca, cb] = vecs;
  row.rows.forEach(({ u, s }, j) => {
    const theta = (TAU * (j * 1000 + u)) / (1000 * m) + (TAU * row.turn) / 4_096;
    const r = (rho * s) / 1000;
    const p = pt(h.x + r * dmath.cos(theta), h.y + r * dmath.sin(theta));
    if (!strictlyInside(a, b, c, p)) return;
    const w = { x: p.x - h.x, y: p.y - h.y };
    // An edge contact's two points must be consecutive: no interior point strictly inside their sector from h.
    if (contact === 'edge' && cross(ca, w) > 0 && cross(w, cb) > 0) return;
    vecs.push(w);
  });
  const ring = starRing(h, vecs);
  return ring === null ? null : reversedRing(ring);
}

/** A holed polygon with its outer ring's construction centre (strictly inside the outline) and circumradius. */
export interface HoledDraw {
  holed: FuzzHoledPolygon;
  centre: LatticePoint;
  radiusCm: number;
}

/** Holed polygons drawn on the given outer star rings; see the module comment. */
export function holedDraws(outer: fc.Arbitrary<StarDraw>, holes: readonly [number, number], contact: FuzzHoleContact | 'mixed'): fc.Arbitrary<HoledDraw> {
  return fc
    .record({
      outer,
      rows: fc.array(holeRowArb, { minLength: holes[0], maxLength: holes[1] }),
      offset: posArb,
    })
    .map(({ outer: o, rows, offset }) => {
      const k = o.ring.length;
      const used = rows.slice(0, Math.floor(k / 2));
      const first = place(0, k - 1, offset);
      const rings: FuzzRing[] = [];
      const contacts: FuzzHoleContact[] = [];
      used.forEach((row, i) => {
        const f = (first + 2 * i) % k;
        const kind = contact === 'mixed' ? CONTACTS[row.pick] : contact;
        const hole = holeInFan(o.ring[f], o.ring[(f + 1) % k], o.centre, kind, row);
        if (hole === null) return;
        rings.push(hole);
        contacts.push(kind);
      });
      return rings.length === 0 ? null : { holed: { polygon: [o.ring, ...rings], contacts }, centre: o.centre, radiusCm: o.radiusCm };
    })
    .filter((v): v is HoledDraw => v !== null);
}

/**
 * Holed polygons (§13.1 (1)): a counter-clockwise star outline of 4–12 vertices, each radius 50–100 % of a circumradius
 * drawn log-uniformly up to 2²² cm (at least 512 cm per vertex), and 1–3 clockwise holes, each disjoint from the
 * outline, touching it at one vertex, or sharing a stretch of one of its edges.
 */
export function holedPolygon(opts: FuzzHoledOptions = {}): fc.Arbitrary<FuzzHoledPolygon> {
  const limit = resolveLimit(opts.limitCm);
  const vertices = resolveCount('vertices', opts.vertices, [4, 12], 4, 64);
  const holes = resolveCount('holes', opts.holes, [1, 3], 1, 32);
  const size = resolveSize(opts.sizeCm, [1, 4_194_304], limit);
  const contact = opts.contact ?? 'mixed';
  if (contact !== 'mixed' && !CONTACTS.includes(contact)) throw new RangeError(`fuzz: unknown hole contact ${String(contact)}`);
  const outer = starArb({ vertices, radiusShare: [500, 1000], jitter: [250, 750], size, limit, radiusPerVertex: 8 * RADIUS_PER_VERTEX });
  return holedDraws(outer, holes, contact).map((d) => d.holed);
}
