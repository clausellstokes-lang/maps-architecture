// The Voronoi dual of a Delaunay triangulation (M0-a-12; §3.8's sampled medial axis, C-0007): each triangle's
// circumcentre computed by our own arithmetic — + − × ÷ only, every division through ratio() (§3.2 (8)), no square root
// and no transcendental, so every IEEE engine returns the same doubles (§6.5; the grep test in test/medial/ holds the
// file to it, and M0-d-06 compares the bits across architectures) — and the Voronoi edges read from the half-edges:
// an interior Delaunay edge joins two triangles, and its dual joins their circumcentres (C-0172 (3), (4)).
import { nextHalfEdge, type Delaunay } from '../adapters/delaunator.js';
import { ratio } from '../num/index.js';

/**
 * Per triangle t, its circumcentre at `[2t, 2t + 1]` in the frame whose origin is (`ox`, `oy`) — the caller's bounding-
 * box corner, so the coordinates are small exact integers before the arithmetic — or NaN for a triangle of zero area.
 * Computed from the triangle's first vertex a: with b − a = (dx, dy), c − a = (ex, ey), D = 2 (dx·ey − dy·ex), the
 * centre is a + ((ey·|b − a|² − dy·|c − a|²) ÷ D, (dx·|c − a|² − ex·|b − a|²) ÷ D).
 */
export function circumcentres(d: Delaunay, ox: number, oy: number): Float64Array {
  const tri = d.triangles;
  const sites = d.sites;
  const count = tri.length / 3;
  const out = new Float64Array(2 * count);
  for (let t = 0; t < count; t += 1) {
    const a = sites[tri[3 * t]];
    const b = sites[tri[3 * t + 1]];
    const c = sites[tri[3 * t + 2]];
    const ax = a.x - ox;
    const ay = a.y - oy;
    const dx = b.x - ox - ax;
    const dy = b.y - oy - ay;
    const ex = c.x - ox - ax;
    const ey = c.y - oy - ay;
    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const den = 2 * (dx * ey - dy * ex);
    const ux = ratio(ey * bl - dy * cl, den, 'area');
    const uy = ratio(dx * cl - ex * bl, den, 'area');
    out[2 * t] = ux.ok ? ax + ux.value : NaN;
    out[2 * t + 1] = uy.ok ? ay + uy.value : NaN;
  }
  return out;
}

/** One Voronoi edge: the circumcentres of triangles `u` and `v`, dual to the Delaunay edge between sites `p` and `q`. */
export interface VoronoiEdge {
  u: number;
  v: number;
  p: number;
  q: number;
}

/**
 * The finite Voronoi edges, one per interior Delaunay edge, in half-edge order (each pair once, from its lower
 * half-edge). A hull half-edge's dual is a ray to infinity, outside every face the sites sample, and is not returned.
 */
export function voronoiEdges(d: Delaunay): VoronoiEdge[] {
  const tri = d.triangles;
  const half = d.halfedges;
  const out: VoronoiEdge[] = [];
  for (let h = 0; h < tri.length; h += 1) {
    const twin = half[h];
    if (twin <= h) continue;
    out.push({ u: (h - (h % 3)) / 3, v: (twin - (twin % 3)) / 3, p: tri[h], q: tri[nextHalfEdge(h)] });
  }
  return out;
}
