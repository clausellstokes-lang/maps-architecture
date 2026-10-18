// The adapter of delaunator 5.1.0 (ISC; §3.1's adopted Delaunay / Voronoi, C-0007 — `d3-delaunay` is not adopted): the
// one file of plat/ that imports the library (§14). M0-a-12. The library is vendored with C-0011's patch (its EPSILON
// written as the literal 2⁻⁵², bit-identical), and its arithmetic is + − × ÷, comparisons and robust-predicates'
// orient2d, so one input triangulates identically on every IEEE engine (§6.5 (4), the vendored scan's audit record).
// §3.1's degenerate-input contract is decided here, before the library runs: duplicate points are merged first, and
// fewer than three distinct sites, or collinear sites (exact orient2d on lattice integers, §3.2 (1)), give no triangle.
// The library's triangles turn clockwise in our +y-north frame (its README draws y down); the adapter hands every
// triangle back counter-clockwise, its half-edges renumbered to match (C-0172 (1)).
import Delaunator from 'delaunator';
import { offLattice } from '../geom/common.js';
import { ok, orient2d, type KernelResult } from '../num/index.js';
import type { LatticePoint } from '../types/index.js';

/** A Delaunay triangulation of lattice sites, as the medial axis (§3.8) and later readers (§3.1's list) take it. */
export interface Delaunay {
  /** The distinct sites: each point's first occurrence, in input order (duplicates merged first, §3.1). */
  sites: LatticePoint[];
  /** Per input point, the index of its site in `sites`. */
  siteOf: Int32Array;
  /**
   * Site indices, three per triangle, each triangle counter-clockwise (+y north). Half-edge h (an index into this
   * array) runs from `triangles[h]` to the next vertex of its triangle. Empty for fewer than three distinct or for
   * collinear sites (§3.11 *no input*).
   */
  triangles: Uint32Array;
  /** Per half-edge, its twin in the adjacent triangle, or −1 on the convex hull. */
  halfedges: Int32Array;
}

/** The next half-edge of a half-edge's triangle (its triangle's corner after it). */
export function nextHalfEdge(h: number): number {
  return h % 3 === 2 ? h - 2 : h + 1;
}

function empty(sites: LatticePoint[], siteOf: Int32Array): Delaunay {
  return { sites, siteOf, triangles: new Uint32Array(0), halfedges: new Int32Array(0) };
}

/**
 * The Delaunay triangulation of `points` (lattice points, §3.2 (1)): an off-lattice coordinate is E_OUT_OF_RANGE, as
 * every geometry service refuses it. Coordinates are handed to the library relative to the sites' bounding-box corner
 * (an exact integer translation), so a translated input triangulates identically.
 */
export function delaunay(points: readonly LatticePoint[]): KernelResult<Delaunay> {
  const bad = offLattice<Delaunay>(points);
  if (bad !== null) return bad;
  const n = points.length;
  // duplicates merged first (§3.1): sort by (x, y, index); the first of each run of one lattice point is its site
  const order: number[] = [];
  for (let i = 0; i < n; i += 1) order.push(i);
  order.sort((i, j) => points[i].x - points[j].x || points[i].y - points[j].y || i - j);
  const first = new Int32Array(n);
  for (let k = 0; k < n; k += 1) {
    const i = order[k];
    const prev = k === 0 ? -1 : order[k - 1];
    first[i] = prev >= 0 && points[prev].x === points[i].x && points[prev].y === points[i].y ? first[prev] : i;
  }
  const sites: LatticePoint[] = [];
  const siteOf = new Int32Array(n);
  for (let i = 0; i < n; i += 1) {
    if (first[i] === i) {
      siteOf[i] = sites.length;
      sites.push(points[i]);
    } else {
      siteOf[i] = siteOf[first[i]];
    }
  }
  const m = sites.length;
  if (m < 3) return ok(empty(sites, siteOf));
  const a = sites[0];
  const b = sites[1];
  let collinear = true;
  for (let k = 2; k < m && collinear; k += 1) collinear = orient2d(a.x, a.y, b.x, b.y, sites[k].x, sites[k].y) === 0;
  if (collinear) return ok(empty(sites, siteOf));
  let minX = a.x as number;
  let minY = a.y as number;
  for (const p of sites) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
  }
  const coords = new Float64Array(2 * m);
  for (let k = 0; k < m; k += 1) {
    coords[2 * k] = sites[k].x - minX;
    coords[2 * k + 1] = sites[k].y - minY;
  }
  const d = new Delaunator(coords);
  const tri = d.triangles;
  const half = d.halfedges;
  const len = tri.length;
  // each library triangle (a, b, c) is clockwise here: hand back (a, c, b), whose half-edge k is the library's 2 − k
  // reversed, so the twin of new half-edge 3t + k is the renumbered twin of the library's 3t + 2 − k
  const triangles = new Uint32Array(len);
  const halfedges = new Int32Array(len);
  for (let t = 0; t < len; t += 3) {
    triangles[t] = tri[t];
    triangles[t + 1] = tri[t + 2];
    triangles[t + 2] = tri[t + 1];
    for (let k = 0; k < 3; k += 1) {
      const twin = half[t + 2 - k];
      halfedges[t + k] = twin < 0 ? -1 : twin - (twin % 3) + 2 - (twin % 3);
    }
  }
  return ok({ sites, siteOf, triangles, halfedges });
}
