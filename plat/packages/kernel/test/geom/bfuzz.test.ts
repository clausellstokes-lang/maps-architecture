// M0-a-10's B-FUZZ bar (§13.1; marked *here* in M0-work.json): per service, PLAT_FUZZ_RUNS random inputs — 10⁴ in the
// PR tier, 10⁶ nightly (C-0057) — and §13.1's constructive classes (regular n-gons, snapped rotated squares, star rings
// of radius 2²³ − 2), with 0 crashes (a throw fails the property; a RangeError is an assert only where the service
// documents one and the input breaks it), 0 hangs (each test's hard timeout) and 0 invalid outputs (each service's
// contract below). The item's own fast-check properties meet it (the spec note N-16): the services land before the test
// kit's generators (M0-k-01) and constructive set (M0-k-02).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  BinaryHeap,
  astar,
  catmullRom,
  chaikin,
  dijkstra,
  faceNeighbours,
  fillet,
  graphFromEdges,
  hexLattice,
  hull,
  laplacianPinned,
  lir,
  obb,
  regularFit,
  sampleBoundary,
  sideRuns,
} from '../../src/geom/index.js';
import { orient2d, type KernelResult } from '../../src/num/index.js';
import { streamFromKey } from '../../src/rng/index.js';
import type { Level } from '../../src/types/index.js';
import { buildArena, faceAt, GROUND, permutation, strictlyInside, type ArenaSpec } from '../arena/support.js';
import { MAX, TIMEOUT, constructiveRing, isSimple, latticePoint, pt, randomRing, rectInside, segmentsMeet, type XY } from './support.js';

/** A KernelResult is well formed: ok with a warnings array, or a refusal with a code and a string detail. */
function wellFormed(r: KernelResult<unknown>): boolean {
  return r.ok ? Array.isArray(r.warnings) : typeof r.code === 'string' && typeof r.detail === 'string';
}

const finite = (p: XY): boolean => Number.isFinite(p.x) && Number.isFinite(p.y);

/** Is q on an edge of the closed ring (exact; a one-point ring's edge is its point)? */
function onRing(ring: readonly XY[], q: XY): boolean {
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    if (orient2d(a.x, a.y, b.x, b.y, q.x, q.y) === 0 && Math.min(a.x, b.x) <= q.x && q.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= q.y && q.y <= Math.max(a.y, b.y)) return true;
  }
  return false;
}

const anyRing = fc.oneof(randomRing(true), constructiveRing());
const anyPoints = fc.oneof(
  fc.array(latticePoint(), { maxLength: 40 }),
  fc.array(latticePoint(1000), { maxLength: 40 }),
  anyRing,
  fc.tuple(latticePoint(MAX / 4), fc.integer({ min: -50, max: 50 }), fc.integer({ min: -50, max: 50 }), fc.integer({ min: 0, max: 30 })).map(([p, dx, dy, k]) =>
    Array.from({ length: k }, (_, i) => pt(p.x + i * dx, p.y + i * dy)),
  ),
);

describe('B-FUZZ: the geometry services (§13.1)', () => {
  it('hull: a strictly convex counter-clockwise hull containing every point, or `collinear`', () => {
    fc.assert(
      fc.property(anyPoints, (pts) => {
        const r = hull(pts);
        expect(wellFormed(r)).toBe(true);
        if (!r.ok) return r.code === 'E_DEGENERATE' && r.detail === 'collinear';
        const h = r.value;
        for (let i = 0; i < h.length; i += 1) {
          const a = h[i];
          const b = h[(i + 1) % h.length];
          const c = h[(i + 2) % h.length];
          if (orient2d(a.x, a.y, b.x, b.y, c.x, c.y) <= 0) return false;
          for (const p of pts) if (orient2d(a.x, a.y, b.x, b.y, p.x, p.y) < 0) return false;
        }
        return h.length >= 3;
      }),
    );
  }, TIMEOUT);

  it('obb: positive finite extents, unit orthogonal axes, the hull inside — never ok with a zero extent', () => {
    fc.assert(
      fc.property(anyPoints, (pts) => {
        const r = obb(pts);
        expect(wellFormed(r)).toBe(true);
        if (!r.ok) return r.code === 'E_DEGENERATE' && r.detail === 'collinear';
        const b = r.value;
        if (!(b.minorCm > 0 && b.majorCm >= b.minorCm && b.majorCm < Infinity)) return false;
        if (Math.abs(Math.hypot(b.major.x, b.major.y) - 1) > 1e-12 || b.minor.x !== -b.major.y || b.minor.y !== b.major.x) return false;
        if (!b.corners.every(finite) || !finite(b.centre)) return false;
        const eps = 1e-9 * Math.max(1, ...pts.map((p) => Math.max(Math.abs(p.x), Math.abs(p.y))));
        for (const p of pts) {
          const u = (p.x - b.centre.x) * b.major.x + (p.y - b.centre.y) * b.major.y;
          const v = (p.x - b.centre.x) * b.minor.x + (p.y - b.centre.y) * b.minor.y;
          if (Math.abs(u) > b.majorCm / 2 + eps || Math.abs(v) > b.minorCm / 2 + eps) return false;
        }
        return true;
      }),
    );
  }, TIMEOUT);

  it('lir: positive finite extents strictly inside the ring (even–odd), or `collinear` / `empty`', () => {
    fc.assert(
      fc.property(anyRing, (ring) => {
        const r = lir(ring);
        expect(wellFormed(r)).toBe(true);
        if (!r.ok) return r.code === 'E_DEGENERATE' && (r.detail === 'collinear' || r.detail === 'empty');
        const l = r.value;
        if (!(l.widthCm > 0 && l.depthCm > 0 && l.widthCm < Infinity && l.depthCm < Infinity)) return false;
        return l.corners.every(finite) && rectInside(ring, l.corners);
      }),
    );
  }, TIMEOUT);

  it('regularFit: n finite targets, radius ≥ 1 cm, a phase in [0, 36000) and a compactness in (0, 1] on a simple ring, or `fit`', () => {
    fc.assert(
      fc.property(anyRing, (ring) => {
        const r = regularFit(ring);
        expect(wellFormed(r)).toBe(true);
        if (!r.ok) return r.code === 'E_DEGENERATE' && r.detail === 'fit';
        const f = r.value;
        return (
          f.n === ring.length &&
          f.targets.length === ring.length &&
          f.targets.every(finite) &&
          finite(f.centre) &&
          f.radiusCm >= 1 &&
          Number.isInteger(f.phaseCdeg) &&
          f.phaseCdeg >= 0 &&
          f.phaseCdeg < 36_000 &&
          f.compactness > 0 &&
          Number.isFinite(f.compactness) &&
          // at most 1 on a simple ring (the isoperimetric inequality; simplicity read only where the bound is exceeded)
          !(f.compactness > 1 + 1e-9 && isSimple(ring))
        );
      }),
    );
  }, TIMEOUT);

  it('sideRuns: runs within the tolerance, unit chord directions, every edge of a ring in exactly one run (no arc scale)', () => {
    fc.assert(
      fc.property(fc.array(anyRing, { minLength: 1, maxLength: 3 }), fc.integer({ min: 0, max: 9000 }), fc.oneof(fc.constant(0), fc.integer({ min: 1, max: 100_000 })), (face, tol, arc) => {
        const runs = sideRuns(face, tol, { arcMaxCm: arc });
        for (const r of runs) {
          if (!(r.spreadCdeg <= tol + 1) || !finite(r.a) || !finite(r.b) || r.points.length < 2) return false;
          if (Math.abs(Math.hypot(r.dir.x, r.dir.y) - 1) > 1e-12 && !(r.lengthCm === 0)) return false;
        }
        if (arc === 0) {
          face.forEach((ring, i) => {
            const distinct = ring.filter((p, k) => {
              const q = ring[(k + ring.length - 1) % ring.length];
              return p.x !== q.x || p.y !== q.y;
            });
            const n = distinct.length === 0 ? 0 : distinct.length;
            const edges = runs.filter((r) => r.ring === i).reduce((s, r) => s + r.points.length - 1, 0);
            if (n >= 3) expect(edges).toBe(n);
          });
        }
        return true;
      }),
    );
  }, TIMEOUT);

  it('sampleBoundary: every vertex sampled, consecutive samples at most a step apart', () => {
    fc.assert(
      fc.property(fc.array(anyRing, { minLength: 1, maxLength: 2 }), fc.integer({ min: 1, max: 2_000_000 }), (face, step) => {
        // keep the sample count bounded: a step no finer than the face's extent ÷ 2000
        const ext = Math.max(...face.flat().map((p) => Math.max(Math.abs(p.x), Math.abs(p.y))), 1);
        const s = Math.max(step, Math.ceil(ext / 2000));
        const samples = sampleBoundary(face, s);
        if (samples.length !== face.length) return false;
        return samples.every((ring, i) => {
          for (const v of face[i]) if (!ring.some((q) => q.x === v.x && q.y === v.y)) return false;
          // every consecutive pair of the closed ring, the closing pair (last sample → first) included
          for (let k = 0; k < ring.length; k += 1) {
            const q = ring[(k + 1) % ring.length];
            if (Math.hypot(q.x - ring[k].x, q.y - ring[k].y) > s * (1 + 1e-12)) return false;
          }
          return true;
        });
      }),
    );
  }, TIMEOUT);

  it('hexLattice: distinct points strictly inside the region, a symmetric adjacency, no two edges meet but at a shared point', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 0xffffffff }),
        fc.array(fc.tuple(fc.integer({ min: -30_000, max: 30_000 }), fc.integer({ min: -30_000, max: 30_000 })), { minLength: 0, maxLength: 8 }),
        // an optional hole ring, drawn in the middle of the box (a face's holes; drawn on its own, it may also cross the
        // outer ring or lie outside it — the even–odd reading over both rings decides either way)
        fc.option(fc.array(fc.tuple(fc.integer({ min: -20_000, max: 20_000 }), fc.integer({ min: -20_000, max: 20_000 })), { minLength: 1, maxLength: 6 }), { nil: undefined }),
        fc.integer({ min: 25, max: 50_000 }),
        fc.double({ min: 0, max: 0.4999, noNaN: true }),
        (seed, raw, rawHole, spacing, jf) => {
          const ring = raw.map(([x, y]) => pt(x, y));
          const region = [ring, (rawHole ?? []).map(([x, y]) => pt(x, y))].filter((r) => r.length > 0);
          const s = Math.max(spacing, 6000); // at most ≈ 10 × 12 lattice points over the ± 300 m box
          const h = hexLattice(region, s, jf * s, streamFromKey([seed, 1, 2, 3]));
          // every point strictly inside the region (even–odd over its rings; on any ring is outside), no two points equal
          const seen = new Set<string>();
          for (const q of h.points) {
            if (region.some((r) => onRing(r, q)) || region.filter((r) => strictlyInside(r, q)).length % 2 !== 1) return false;
            const k = `${q.x},${q.y}`;
            if (seen.has(k)) return false;
            seen.add(k);
          }
          if (h.adjacency.length !== 6 * h.points.length) return false;
          for (let i = 0; i < h.points.length; i += 1) {
            for (let d = 0; d < 6; d += 1) {
              const j = h.adjacency[6 * i + d];
              if (j !== -1 && h.adjacency[6 * j + ((d + 3) % 6)] !== i) return false;
            }
          }
          const e: [number, number][] = [];
          for (let i = 0; i < h.points.length; i += 1) for (let d = 0; d < 3; d += 1) if (h.adjacency[6 * i + d] !== -1) e.push([i, h.adjacency[6 * i + d]]);
          for (let a = 0; a < e.length; a += 1) for (let b = a + 1; b < e.length; b += 1) {
            const [p, q] = e[a];
            const [r, t] = e[b];
            if (p === r || p === t || q === r || q === t) continue;
            if (segmentsMeet(h.points[p], h.points[q], h.points[r], h.points[t])) return false;
          }
          return true;
        },
      ),
    );
  }, TIMEOUT);

  it('the curves: finite point lists with their ends, pins and control points kept', () => {
    const pts = fc.array(fc.tuple(fc.double({ min: -8e6, max: 8e6, noNaN: true }), fc.double({ min: -8e6, max: 8e6, noNaN: true })), { maxLength: 30 }).map((a) => a.map(([x, y]) => ({ x, y })));
    const same = (a: XY, b: XY): boolean => a.x === b.x && a.y === b.y;
    const d2 = (a: XY, b: XY): number => (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
    fc.assert(
      fc.property(pts, fc.boolean(), fc.integer({ min: 0, max: 3 }), fc.integer({ min: 1, max: 5000 }), fc.nat({ max: 31 }), (p, closed, it, chord, pin) => {
        const n = p.length;
        // Chaikin: an open polyline keeps both its ends
        const c = chaikin(p, { closed, iterations: it });
        if (!c.every(finite)) return false;
        if (!closed && n >= 1 && (!same(c[0], p[0]) || !same(c[c.length - 1], p[n - 1]))) return false;
        // Catmull–Rom: one span per pair of consecutive control points — the points with neighbours closer than 1 cm
        // merged (the first kept; a closed list's closing repeats dropped) — from the one to the next, exactly
        const merged: XY[] = [];
        for (const q of p) {
          const l = merged[merged.length - 1];
          if (l === undefined || d2(q, l) >= 1) merged.push(q);
        }
        if (closed) {
          while (merged.length > 1 && d2(merged[0], merged[merged.length - 1]) < 1) merged.pop();
        }
        const m = merged.length;
        const spans = m < 2 || (closed && m < 3) ? 0 : closed ? m : m - 1;
        const cr = catmullRom(p, { closed });
        if (cr.length !== spans) return false;
        for (let i = 0; i < cr.length; i += 1) {
          const q = cr[i];
          if (![q.p0, q.c1, q.c2, q.p1].every(finite)) return false;
          if (!same(q.p0, merged[i]) || !same(q.p1, merged[(i + 1) % m])) return false;
        }
        // the pinned Laplacian: the pinned points and an open polyline's two ends never move
        const l = laplacianPinned(p, { closed, pinned: [1, pin], iterations: it });
        if (l.length !== n || !l.every(finite)) return false;
        for (const k of [1, pin]) if (k < n && !same(l[k], p[k])) return false;
        if (!closed && n >= 1 && (!same(l[0], p[0]) || !same(l[n - 1], p[n - 1]))) return false;
        // the fillet: from a to b, both kept
        if (n >= 3) {
          const f = fillet(p[0], p[1], p[2], { chordCm: chord });
          if (!f.points.every(finite)) return false;
          if (!same(f.points[0], p[0]) || !same(f.points[f.points.length - 1], p[2])) return false;
        }
        return true;
      }),
    );
  }, TIMEOUT);

  it('the heap and the searches: sorted pops; a path along edges whose cost is its edges\' sum, or E_NO_PATH', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 30 }),
        fc.array(fc.tuple(fc.nat(), fc.nat(), fc.oneof(fc.integer({ min: 0, max: 1000 }), fc.constant(Number.POSITIVE_INFINITY))), { maxLength: 90 }),
        fc.nat(),
        fc.nat(),
        (n, raw, s0, t0) => {
          const edges = raw.map(([a, b, w]) => [a % n, b % n, w] as [number, number, number]);
          const g = graphFromEdges(n, edges);
          const h = new BinaryHeap(2);
          edges.forEach(([a, , w], i) => h.push(i, Number.isFinite(w) ? w + a : 1e9));
          let last = -Infinity;
          while (h.size > 0) {
            const pr = h.peekPriority();
            if (pr < last) return false;
            last = pr;
            h.pop();
          }
          for (const r of [dijkstra(g, s0 % n, t0 % n), astar(g, s0 % n, t0 % n)]) {
            if (!wellFormed(r)) return false;
            if (!r.ok) {
              if (r.code !== 'E_NO_PATH') return false;
              continue;
            }
            const nodes = r.value.nodes;
            if (nodes[0] !== s0 % n || nodes[nodes.length - 1] !== t0 % n) return false;
            let c = 0;
            for (let i = 0; i + 1 < nodes.length; i += 1) {
              const ws = edges.filter(([a, b]) => a === nodes[i] && b === nodes[i + 1]).map(([, , w]) => w);
              if (ws.length === 0) return false;
              c += Math.min(...ws);
            }
            if (c !== r.value.cost) return false;
          }
          return true;
        },
      ),
    );
  }, TIMEOUT);

  it('faceNeighbours: on grids in any allocation order, exactly the faces across a shared side', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 3 }), fc.integer({ min: 1, max: 3 }), fc.integer({ min: 0, max: 0x7fffffff }), (k, m, seed) => {
        const spec = gridSpec(k, m);
        const b = buildArena(spec, { vertices: permutation(spec.vertices.length, seed), edges: permutation(spec.edges.length, seed + 1) });
        for (let j = 0; j < m; j += 1) for (let i = 0; i < k; i += 1) {
          const f = faceAt(b, 0, pt(i * 1000 + 500, j * 1000 + 500));
          const want = [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]].filter(([x, y]) => x >= 0 && x < k && y >= 0 && y < m).map(([x, y]) => faceAt(b, 0, pt(x * 1000 + 500, y * 1000 + 500)));
          const got = faceNeighbours(b.plat, GROUND, f, 0).faces;
          if (got.length !== want.length || !want.every((w) => got.includes(w))) return false;
        }
        return true;
      }),
    );
  }, TIMEOUT);

  it('runs PLAT_FUZZ_RUNS cases per property (C-0057)', () => {
    const expected = process.env.PLAT_FUZZ_RUNS ? Number(process.env.PLAT_FUZZ_RUNS) : 10_000;
    expect(fc.readConfigureGlobal().numRuns).toBe(expected);
  });
});

function gridSpec(k: number, m: number): ArenaSpec {
  const vertices: [number, number, Level][] = [];
  const id = (i: number, j: number): number => j * (k + 1) + i;
  for (let j = 0; j <= m; j += 1) for (let i = 0; i <= k; i += 1) vertices.push([i * 1000, j * 1000, 0]);
  const edges: [number, number, Level][] = [];
  for (let j = 0; j <= m; j += 1) for (let i = 0; i < k; i += 1) edges.push([id(i, j), id(i + 1, j), 0]);
  for (let j = 0; j < m; j += 1) for (let i = 0; i <= k; i += 1) edges.push([id(i, j), id(i, j + 1), 0]);
  return { vertices, edges };
}
