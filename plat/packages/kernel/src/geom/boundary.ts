// sampleBoundary(face, stepCm) and faceRings (§3.4): boundary samples for §3.8's sampled medial axis (a Voronoi of
// samples at 1 m) and §9.3's spine candidates, and the read of an arena face as its rings, which the ring-reading
// services (`sideRuns`, `sampleBoundary`, `obb`, `lir`, `regularFit`) take. M0-a-10; C-0159 (5).
import { faceWalk, type FaceId, type Plat } from '../arena/index.js';
import { ratio } from '../num/index.js';
import type { LatticePoint, Level } from '../types/index.js';
import { distinctRing, lp, type XY } from './common.js';
import type { FaceRings } from './side-runs.js';

/**
 * A face of an arena as its rings at `level`: the outer ring (counter-clockwise), then each hole ring, each the
 * origins of its level walk's half-edges in walk order (§2.2 rule 2's level view: a finer Steiner vertex on a coarser
 * route is a vertex of the walk). Values: the points outlive the arena's next commit.
 */
export function faceRings(p: Plat, level: Level, face: FaceId): LatticePoint[][] {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  return faceWalk(p, level, face).map((ring) => ring.map((h) => lp(X[O[h]], Y[O[h]])));
}

/**
 * Samples along each ring of a face, in the rings' order and each ring's own order: every vertex (consecutive repeats
 * dropped), and on each edge longer than `stepCm` the points cutting it into ⌈length ÷ stepCm⌉ equal parts — so no two
 * consecutive samples lie more than `stepCm` apart and every vertex is a sample. A ring of one distinct point gives that
 * point; an empty ring gives none. Throws a RangeError unless `stepCm` is finite and ≥ 1.
 */
export function sampleBoundary(face: FaceRings, stepCm: number): XY[][] {
  if (!(stepCm >= 1 && stepCm < Infinity)) throw new RangeError(`sampleBoundary: stepCm must be finite and ≥ 1, got ${String(stepCm)}`);
  return face.map((ringIn) => {
    const ring = distinctRing(ringIn);
    const n = ring.length;
    const out: XY[] = [];
    if (n === 1) out.push({ x: ring[0].x, y: ring[0].y });
    if (n < 2) return out;
    for (let i = 0; i < n; i += 1) {
      const a = ring[i];
      const b = ring[i + 1 === n ? 0 : i + 1];
      out.push({ x: a.x, y: a.y });
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const pieces = ratio(Math.sqrt(dx * dx + dy * dy), stepCm, 'length');
      const k = pieces.ok ? Math.ceil(pieces.value) : 1;
      for (let j = 1; j < k; j += 1) {
        const t = ratio(j, k, 'count');
        if (t.ok) out.push({ x: a.x + dx * t.value, y: a.y + dy * t.value });
      }
    }
    return out;
  });
}
