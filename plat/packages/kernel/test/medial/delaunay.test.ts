// M0-a-12: the delaunator adapter (§3.1's Delaunay row: duplicate points merged first; §3.11 and §13.1: "a Delaunay of
// fewer than three distinct, or of collinear, sites returns no triangle"; C-0007, C-0172 (1)). Judged by independent
// references: the exact orient2d for orientation, robust-predicates' exact incircle (the num module's adapter) for the
// empty-circumcircle property, and the half-edge structure's own definition.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { delaunay, nextHalfEdge, type Delaunay } from '../../src/medial/index.js';
import { incircle, orient2d } from '../../src/num/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { generator, pt, TIMEOUT } from './support.js';

function sites(d: Delaunay, t: number): [LatticePoint, LatticePoint, LatticePoint] {
  return [d.sites[d.triangles[3 * t]], d.sites[d.triangles[3 * t + 1]], d.sites[d.triangles[3 * t + 2]]];
}

/** Every structural promise of a non-empty triangulation, checked from the definitions. */
function checkStructure(d: Delaunay): void {
  const T = d.triangles.length / 3;
  expect(d.halfedges.length).toBe(d.triangles.length);
  for (let t = 0; t < T; t += 1) {
    const [a, b, c] = sites(d, t);
    expect(orient2d(a.x, a.y, b.x, b.y, c.x, c.y)).toBeGreaterThan(0); // counter-clockwise, +y north
  }
  for (let h = 0; h < d.halfedges.length; h += 1) {
    const twin = d.halfedges[h];
    if (twin < 0) continue;
    expect(d.halfedges[twin]).toBe(h);
    // twins run between the same two sites in opposite directions
    expect(d.triangles[twin]).toBe(d.triangles[nextHalfEdge(h)]);
    expect(d.triangles[nextHalfEdge(twin)]).toBe(d.triangles[h]);
  }
  // the empty-circumcircle property, exactly: no site strictly inside any triangle's circumcircle
  for (let t = 0; t < T; t += 1) {
    const [a, b, c] = sites(d, t);
    for (const s of d.sites) expect(incircle(a.x, a.y, b.x, b.y, c.x, c.y, s.x, s.y)).toBeLessThanOrEqual(0);
  }
  // every site is a vertex of some triangle
  const used = new Set(d.triangles);
  expect(used.size).toBe(d.sites.length);
}

describe('delaunay(points) — the adapter of delaunator 5.1.0 (§3.1)', () => {
  it('§13.1: fewer than three distinct sites give no triangle', () => {
    const cases: LatticePoint[][] = [[], [pt(5, 5)], [pt(0, 0), pt(10, 3)], [pt(1, 1), pt(1, 1), pt(1, 1)], [pt(0, 0), pt(7, 9), pt(0, 0), pt(7, 9), pt(7, 9)]];
    for (const pts of cases) {
      const r = delaunay(pts);
      expect(r.ok).toBe(true);
      if (!r.ok) continue;
      expect(r.value.triangles.length).toBe(0);
      expect(r.value.halfedges.length).toBe(0);
      expect(r.value.siteOf.length).toBe(pts.length);
    }
  });

  it('§13.1: collinear sites give no triangle — horizontal, vertical, diagonal, with repeats, far out', () => {
    const lines: LatticePoint[][] = [
      [pt(0, 0), pt(100, 0), pt(300, 0), pt(-50, 0)],
      [pt(7, -9), pt(7, 400), pt(7, 12), pt(7, 12)],
      [pt(0, 0), pt(3, 5), pt(6, 10), pt(-30, -50), pt(3, 5)],
      [pt(8_000_000, -8_000_000), pt(8_000_001, -7_999_998), pt(8_000_003, -7_999_994)],
    ];
    for (const pts of lines) {
      const r = delaunay(pts);
      expect(r.ok && r.value.triangles.length).toBe(0);
    }
    // one point off the line is enough for triangles
    const off = delaunay([pt(0, 0), pt(100, 0), pt(300, 0), pt(150, 1)]);
    expect(off.ok && off.value.triangles.length).toBeGreaterThan(0);
  });

  it('merges duplicate points first: each site is a first occurrence, in input order', () => {
    const pts = [pt(10, 0), pt(0, 0), pt(10, 0), pt(0, 10), pt(0, 0), pt(10, 10), pt(0, 10)];
    const r = delaunay(pts);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.sites).toEqual([pt(10, 0), pt(0, 0), pt(0, 10), pt(10, 10)]);
    expect(Array.from(r.value.siteOf)).toEqual([0, 1, 0, 2, 1, 3, 2]);
    expect(r.value.triangles.length).toBe(6);
    checkStructure(r.value);
  });

  it('refuses an off-lattice coordinate with E_OUT_OF_RANGE', () => {
    for (const bad of [pt(0.5, 0), pt(0, Number.NaN), pt(8_388_608, 0), pt(0, -Infinity)]) {
      const r = delaunay([pt(0, 0), pt(10, 0), bad]);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe('E_OUT_OF_RANGE');
    }
  });

  it(
    'returns a valid Delaunay triangulation: counter-clockwise triangles, involutive half-edges, empty circumcircles',
    () => {
      fc.assert(
        fc.property(fc.array(fc.tuple(fc.integer({ min: -2000, max: 2000 }), fc.integer({ min: -2000, max: 2000 })), { minLength: 3, maxLength: 40 }), (xs) => {
          const r = delaunay(xs.map(([x, y]) => pt(x, y)));
          expect(r.ok).toBe(true);
          if (!r.ok || r.value.triangles.length === 0) return;
          checkStructure(r.value);
        }),
        { numRuns: 400 },
      );
    },
    TIMEOUT,
  );

  it('cocircular and grid inputs (the samples of a lattice rectangle) triangulate validly', () => {
    const grid: LatticePoint[] = [];
    for (let i = 0; i <= 12; i += 1) for (let j = 0; j <= 5; j += 1) grid.push(pt(i * 100, j * 100));
    const ring: LatticePoint[] = [];
    for (let i = 0; i < 20; i += 1) ring.push(pt(i * 100, 0), pt(i * 100, 1000));
    for (let j = 1; j < 10; j += 1) ring.push(pt(0, j * 100), pt(2000, j * 100));
    for (const pts of [grid, ring]) {
      const r = delaunay(pts);
      expect(r.ok).toBe(true);
      if (r.ok) checkStructure(r.value);
    }
  });

  it('triangulates a translated input identically (coordinates go to the library relative to the bounding-box corner)', () => {
    const rnd = generator(12);
    for (let k = 0; k < 50; k += 1) {
      const pts: LatticePoint[] = [];
      for (let i = 0; i < 30; i += 1) pts.push(pt(Math.floor(rnd() * 5000), Math.floor(rnd() * 5000)));
      const dx = Math.floor(rnd() * 8_000_000) - 4_000_000;
      const dy = Math.floor(rnd() * 8_000_000) - 4_000_000;
      const a = delaunay(pts);
      const b = delaunay(pts.map((p) => pt(p.x + dx, p.y + dy)));
      expect(a.ok && b.ok).toBe(true);
      if (!a.ok || !b.ok) continue;
      expect(Array.from(b.value.triangles)).toEqual(Array.from(a.value.triangles));
      expect(Array.from(b.value.halfedges)).toEqual(Array.from(a.value.halfedges));
    }
    // cocircular sets — a lattice grid, a rectangle's samples — moved far out: the library sees the same small numbers
    const grid: LatticePoint[] = [];
    for (let i = 0; i <= 12; i += 1) for (let j = 0; j <= 5; j += 1) grid.push(pt(i * 100, j * 100));
    const ring: LatticePoint[] = [];
    for (let i = 0; i < 20; i += 1) ring.push(pt(i * 100, 0), pt(i * 100, 1000));
    for (let j = 1; j < 10; j += 1) ring.push(pt(0, j * 100), pt(2000, j * 100));
    for (const pts of [grid, ring]) {
      const a = delaunay(pts);
      for (const [dx, dy] of [[4_000_037, -3_000_011], [-8_000_000, 7_999_000], [5_123_457, 5_123_457]]) {
        const b = delaunay(pts.map((p) => pt(p.x + dx, p.y + dy)));
        expect(a.ok && b.ok).toBe(true);
        if (!a.ok || !b.ok) continue;
        expect(Array.from(b.value.triangles)).toEqual(Array.from(a.value.triangles));
        expect(Array.from(b.value.halfedges)).toEqual(Array.from(a.value.halfedges));
      }
    }
  });
});
