// M0-c-01's test support: the flat fixture's slice per seed (cached: one slice costs about half a second), small sites
// for the property tests, and the readers the tests share.
import type { LatticePoint } from '@plat/kernel';
import { flatFixture, s3Slice, type FlatFixtureOptions, type S3Slice, type Site } from '../../src/index.js';

const SLICES = new Map<number, S3Slice>();

/** The flat fixture's S3 slice at `seed` (cached per seed). */
export function sliceOf(seed: number): S3Slice {
  let s = SLICES.get(seed);
  if (s === undefined) {
    s = s3Slice(flatFixture(seed));
    SLICES.set(seed, s);
  }
  return s;
}

/** The seeds the fixture-level tests run on. */
export const SEEDS: readonly number[] = [1, 7, 20251005];

/** A small flat site: a 4 km² frame (2 km square) with a 30 ha walled area, quick to build. */
export function smallSite(seed: number, opts: FlatFixtureOptions = {}): Site {
  return flatFixture(seed, { frameAreaHa: 400, walledHa: 30, ...opts });
}

/** A lattice point. */
export function P(x: number, y: number): LatticePoint {
  return { x, y } as LatticePoint;
}

/** Index of a point in a ring by exact equality, −1 when absent. */
export function vertexIndex(ring: readonly LatticePoint[], p: LatticePoint): number {
  return ring.findIndex((q) => q.x === p.x && q.y === p.y);
}
