// arb.polygon and the star rings every ring family starts from (M0-k-01; §13.1 (1): concave and ≥ 300-vertex
// polygons). A star ring is k directions drawn one per angular sector around a lattice centre, each at its own radius,
// built exactly on the lattice (lattice.ts's `starRing`): simple and counter-clockwise by construction, concave
// wherever a short radius sits between longer ones. Radii are at least `MIN_SHARE` of the circumradius R and R is at
// least `RADIUS_PER_VERTEX` × k, so the k drawn directions survive rounding distinct and in order: exactly k vertices
// (C-0161 (2)).
import fc from 'fast-check';
import { dmath, type LatticePoint } from '@plat/kernel';
import { TAU, place, posArb, pt, resolveCount, resolveLimit, resolveSize, scaleArb, starRing, triangleRing } from './lattice.js';
import type { FuzzBoundsOptions, FuzzRing } from './types.js';

/** The least circumradius per vertex (cm) that keeps k sector directions distinct after rounding (C-0161 (2)). */
export const RADIUS_PER_VERTEX = 64;

/** Steps of a full turn for a ring's random rotation. */
const TURN_STEPS = 65_536;

/** A star ring's construction: the vertex count, the per-mille shares and the circumradius floor. */
export interface StarSpec {
  vertices: readonly [number, number];
  /** Each radius as a per-mille share of R, in this range (lowest ≥ 50). */
  radiusShare: readonly [number, number];
  /** Each direction's place inside its sector, per mille, in this range (inside [100, 900]). */
  jitter: readonly [number, number];
  size: readonly [number, number];
  limit: number;
  /** R is raised to at least this many cm per vertex. */
  radiusPerVertex: number;
}

/** A star ring with its centre (strictly inside) and its circumradius. */
export interface StarDraw {
  ring: FuzzRing;
  centre: LatticePoint;
  radiusCm: number;
}

/** The draw of a star ring (null when a shrunk or tiny draw collapses; the arbitraries filter it). */
export function starDraw(spec: StarSpec): fc.Arbitrary<StarDraw | null> {
  const [kMin, kMax] = spec.vertices;
  return fc
    .record({
      rows: fc.array(
        fc.record({
          u: fc.integer({ min: spec.jitter[0], max: spec.jitter[1] }),
          s: fc.integer({ min: spec.radiusShare[0], max: spec.radiusShare[1] }),
        }),
        { minLength: kMin, maxLength: kMax },
      ),
      size: scaleArb(spec.size[0], spec.size[1]),
      turn: fc.integer({ min: 0, max: TURN_STEPS - 1 }),
      fx: posArb,
      fy: posArb,
    })
    .map(({ rows, size, turn, fx, fy }) => {
      const k = rows.length;
      const R = Math.min(spec.size[1], Math.max(size, spec.radiusPerVertex * k));
      const c = pt(place(-spec.limit + R, spec.limit - R, fx), place(-spec.limit + R, spec.limit - R, fy));
      const points = rows.map(({ u, s }, j) => {
        const theta = (TAU * (j * 1000 + u)) / (1000 * k) + (TAU * turn) / TURN_STEPS;
        const r = (R * s) / 1000;
        return pt(c.x + r * dmath.cos(theta), c.y + r * dmath.sin(theta));
      });
      const ring =
        starRing(c, points.map((p) => ({ x: p.x - c.x, y: p.y - c.y }))) ??
        (k === 3 ? triangleRing(points) : null);
      return ring === null ? null : { ring, centre: c, radiusCm: R };
    });
}

/** The star draws that did not collapse. */
export function starArb(spec: StarSpec): fc.Arbitrary<StarDraw> {
  return starDraw(spec).filter((d): d is StarDraw => d !== null);
}

/** arb.polygon's options: the bounds and the vertex count. */
export interface FuzzPolygonOptions extends FuzzBoundsOptions {
  /** The vertex count, [3, 40] by default (at most 4 096). */
  vertices?: readonly [number, number];
}

/**
 * Simple polygons, concave and convex (§13.1 (1)): counter-clockwise star rings with 3–40 vertices by default, each
 * radius 5–100 % of a circumradius drawn log-uniformly in [1 cm, 2²² cm] (raised to 64 cm per vertex), anywhere in the
 * range. `sizeCm` bounds the circumradius.
 */
export function polygon(opts: FuzzPolygonOptions = {}): fc.Arbitrary<FuzzRing> {
  const limit = resolveLimit(opts.limitCm);
  const vertices = resolveCount('vertices', opts.vertices, [3, 40], 3, 4_096);
  const size = resolveSize(opts.sizeCm, [1, 4_194_304], limit);
  return starArb({ vertices, radiusShare: [50, 1000], jitter: [100, 900], size, limit, radiusPerVertex: RADIUS_PER_VERTEX }).map(
    (d) => d.ring,
  );
}
