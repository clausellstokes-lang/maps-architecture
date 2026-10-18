// The perimeter is a function of the boundary's region, not of how its straight runs are split (M0-e-04; N-56 (2);
// C-0305): the overlay's union merges a boundary's exactly collinear vertices, so against a boundary that kept them one
// ring edge would span two halves of a side and fail `isSumRing`'s nearness clause (both ends within d + tol of ONE
// boundary edge); `settlementPerimeter` merges them (`mergeCollinear`) before the convolution and inside every
// `isSumRing` call, so a lawful simple counter-clockwise ring with collinear vertices added gives the perimeter of the
// ring without them. Pins: seed 1165799859's outline (S5's last boundary on SMALL_FLAT) with and without its collinear
// vertices; a 300 m square with and without its side midpoints; a property over the 100 count-law seeds of
// bars.test.ts; and two goldens — the 100 perimeters' digest and seed 1165799859's committed perimeter.
import { createHash } from 'node:crypto';
import type { LatticePoint } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { convolution, isSumRing, mergeCollinear, OVERLAY_TOLERANCE_CM, settlementPerimeter, simpleCcw, SUM_TOLERANCE_CM } from '../../src/index.js';
import { fixtureRandom, kernel, P, town } from './support.js';

function gcd(a: number, b: number): number {
  let x = a;
  let y = b;
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

/**
 * The ring with exactly collinear vertices added, as M0-x-06's `collinear` kind lays them (testkit `degenerateRing`):
 * on each edge with an interior lattice point (gcd of its steps ≥ 2), the one nearest its middle. With `rand`, up to
 * `per` lattice points at drawn places on such an edge instead, in order along it.
 */
function collinear(ring: readonly LatticePoint[], rand?: () => number, per = 3): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (let i = 0; i < ring.length; i += 1) {
    const p = ring[i];
    const q = ring[(i + 1) % ring.length];
    out.push(p);
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    const g = gcd(Math.abs(dx), Math.abs(dy));
    if (g < 2) continue;
    const ts = rand === undefined ? [Math.floor(g / 2)] : [...new Set(Array.from({ length: 1 + Math.floor(rand() * per) }, () => 1 + Math.floor(rand() * (g - 1))))].sort((a, b) => a - b);
    for (const t of ts) out.push(P(p.x + (dx / g) * t, p.y + (dy / g) * t));
  }
  return out;
}

const sha = (v: unknown): string => createHash('sha256').update(JSON.stringify(v)).digest('hex');

/** Seed 1165799859's outline — S5's last boundary on testkit's SMALL_FLAT chain — and its frame, captured 2026-10-09. */
const OUTLINE_1165799859 = (
  [
    [-1670, -16239], [2071, -16025], [4596, -16261], [5864, -13794], [8207, -13884], [12106, -7555], [13757, -4303], [15185, -2101], [14035, -99], [16325, 4256],
    [13104, 9603], [10784, 9731], [9423, 12101], [4256, 12202], [2983, 14313], [-607, 14119], [-2053, 11858], [-6943, 11857], [-8333, 9770], [-10573, 11747],
    [-13119, 5560], [-15437, 5662], [-14991, 2384], [-16345, -21], [-13237, -874], [-13411, -3255], [-15615, -3052], [-15542, -5592], [-11081, -8620], [-9379, -11918],
    [-4174, -11954],
  ] as const
).map(([x, y]) => P(x, y));
const FRAME_1165799859 = [P(-27386, -27386), P(27386, -27386), P(27386, 27386), P(-27386, 27386)];

describe('mergeCollinear: the boundary as a region (N-56 (2))', () => {
  it('drops exactly the vertices the ring runs straight on through; a ring with none comes back unchanged', () => {
    const sq = [P(0, 0), P(30_000, 0), P(30_000, 30_000), P(0, 30_000)];
    expect(mergeCollinear(sq)).toEqual(sq);
    expect(mergeCollinear(sq)).not.toBe(sq);
    // midpoints, a run of three on one side, and a collinear first vertex
    expect(mergeCollinear([P(15_000, 0), P(30_000, 0), P(30_000, 10_000), P(30_000, 20_000), P(30_000, 25_000), P(30_000, 30_000), P(0, 30_000), P(0, 0)])).toEqual([P(30_000, 0), P(30_000, 30_000), P(0, 30_000), P(0, 0)]);
    expect(mergeCollinear(collinear(sq))).toEqual(sq);
    // a fold back along a side (a spike: dot < 0) and a repeated vertex (dot = 0) are no continuation: kept
    const spike = [P(0, 0), P(30_000, 0), P(20_000, 0), P(20_000, 30_000), P(0, 30_000)];
    expect(mergeCollinear(spike)).toEqual(spike);
    const rep = [P(0, 0), P(30_000, 0), P(30_000, 0), P(30_000, 30_000), P(0, 30_000)];
    expect(mergeCollinear(rep)).toEqual(rep);
    // a vertex off the line by one centimetre is a corner
    const bent = [P(0, 0), P(15_000, 1), P(30_000, 0), P(30_000, 30_000), P(0, 30_000)];
    expect(mergeCollinear(bent)).toEqual(bent);
  });
});

describe('the perimeter is invariant under collinear splitting (N-56 (2); Q21)', () => {
  it('seed 1165799859: the outline with its collinear vertices (31 → 42 points, simple, CCW) gives the clean outline’s perimeter byte for byte — the committed one', () => {
    const k = kernel();
    const deg = collinear(OUTLINE_1165799859);
    expect([OUTLINE_1165799859.length, deg.length]).toEqual([31, 42]);
    expect(simpleCcw(deg)).toBe(true);
    const a = settlementPerimeter(OUTLINE_1165799859, k, { frame: FRAME_1165799859 });
    const b = settlementPerimeter(deg, k, { frame: FRAME_1165799859 });
    expect(a.ok).toBe(true);
    expect(b.ok ? 'ok' : `${b.code} ${b.detail}`).toBe('ok');
    if (!a.ok || !b.ok) return;
    expect(b.value).toEqual(a.value);
    // the golden: the perimeter S6 commits on this seed (310 points; sha256 of its JSON)
    expect(a.value.length).toBe(310);
    expect(sha(a.value).slice(0, 16)).toBe('6455a8e440db8202');
    // the cause, held: the overlay's ring passes the sum check against the collinear outline as against the clean one
    const d = 5000;
    const u = k.geom.booleans('union', [deg.slice()], [convolution(deg, d, 'arc') as LatticePoint[]], 'nonzero');
    expect(u.ok).toBe(true);
    if (!u.ok) return;
    const outer = u.value.reduce((x, y) => (y.length > x.length ? y : x));
    expect(isSumRing(deg, outer, d, OVERLAY_TOLERANCE_CM)).toBe(true);
    expect(isSumRing(OUTLINE_1165799859, outer, d, OVERLAY_TOLERANCE_CM)).toBe(true);
  });

  it('a 300 m square with and without its side midpoints: one perimeter; the overlay’s ring is the sum of both', () => {
    const k = kernel();
    const sq = [P(0, 0), P(30_000, 0), P(30_000, 30_000), P(0, 30_000)];
    const mid = collinear(sq);
    expect(mid.length).toBe(8);
    const a = settlementPerimeter(sq, k);
    const b = settlementPerimeter(mid, k);
    expect(a.ok && b.ok).toBe(true);
    if (!a.ok || !b.ok) return;
    expect(b.value).toEqual(a.value);
    // the cause, held: the union merges the midpoints, and its ring passes the sum check against the boundary that
    // keeps them as against the clean one
    const u = k.geom.booleans('union', [mid.slice()], [convolution(mid, 5000, 'arc') as LatticePoint[]], 'nonzero');
    expect(u.ok).toBe(true);
    if (!u.ok) return;
    const outer = u.value.reduce((x, y) => (y.length > x.length ? y : x));
    expect(isSumRing(mid, outer, 5000, OVERLAY_TOLERANCE_CM)).toBe(true);
    expect(isSumRing(sq, outer, 5000, OVERLAY_TOLERANCE_CM)).toBe(true);
    // the check still tells the sum from a wrong ring on the split boundary: the true sum passes at the fast tolerance,
    // a ring 1 m long or one shifted off it fails
    const long = settlementPerimeter(sq, k, { offsetCm: 5100 });
    expect(long.ok).toBe(true);
    if (long.ok) expect(isSumRing(mid, long.value, 5000, SUM_TOLERANCE_CM)).toBe(false);
    expect(isSumRing(mid, a.value, 5000, SUM_TOLERANCE_CM)).toBe(true);
    expect(isSumRing(mid, a.value.map((q) => P(q.x + 300_000, q.y)), 5000, OVERLAY_TOLERANCE_CM)).toBe(false);
  });

  it('the 100 count-law seeds: perimeter(ring) === perimeter(collinear(ring)), the kind’s midpoints and drawn runs; the 100 perimeters unchanged by the round', { timeout: 600_000 }, () => {
    const all = createHash('sha256');
    let split = 0;
    for (let seed = 1; seed <= 100; seed += 1) {
      const t = town(seed);
      const frame = { frame: t.input.frame as LatticePoint[] };
      const r = settlementPerimeter(t.input.boundary, t.k, frame);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      all.update(JSON.stringify(r.value));
      const rand = fixtureRandom(seed * 7919);
      for (const ring of [collinear(t.input.boundary), collinear(t.input.boundary, rand)]) {
        if (ring.length === t.input.boundary.length) continue;
        split += 1;
        const s = settlementPerimeter(ring, t.k, frame);
        expect(s.ok ? 'ok' : `seed ${String(seed)}: ${s.code} ${s.detail}`).toBe('ok');
        if (s.ok) expect(s.value).toEqual(r.value);
      }
    }
    // every town boundary has edges with interior lattice points: both splittings ran on every seed
    expect(split).toBe(200);
    // the golden: the digest of the 100 perimeters (each JSON in seed order)
    expect(all.digest('hex')).toBe('0617ad24549920ecf0c361dc8c6dfaff60e3daffcc0428e89f4cd84ee7dad2f6');
  });
});
