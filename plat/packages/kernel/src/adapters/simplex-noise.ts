// The adapter of simplex-noise 4.0.3 (MIT; §3.1's adopted noise base — "seeding, fBm and warp ours"; C-0065): the one
// file of plat/ that imports the library (§14, §6.5 (4)). M0-e-01. The library is vendored with C-0011's patch: its
// `createNoise2D` has no `Math.random` default, so a call without a source does not type-check and throws at run time.
// The source handed in here is always a kernel `Stream` (§6.1) — never a bare function — so the only randomness a field
// ever reads is a sub-stream's uniforms (§3.1: "seeded from sub-streams"). The field itself reads no randomness after it
// is made: its permutation table is drawn once, in the constructor, from SIMPLEX2_DRAWS uniforms of the stream; its
// arithmetic is + − × and Math.floor on doubles, the same on every IEEE engine (the vendored scan's audit record).
import { createNoise2D } from 'simplex-noise';
import type { Stream } from '../rng/index.js';

/** A seeded 2D simplex field: (x, y) → a value in [−1, 1]; finite coordinates with |x|, |y| < 2³¹. */
export type Simplex2 = (x: number, y: number) => number;

/**
 * The uniforms one field draws from its stream: the library's permutation table is a Fisher–Yates shuffle of 0 … 255
 * that draws once per swap, 255 swaps (`buildPermutationTable`).
 */
export const SIMPLEX2_DRAWS = 255;

/**
 * A 2D simplex field whose permutation table is drawn from `stream` — exactly SIMPLEX2_DRAWS of its `float01()`
 * uniforms, in order, the stream continued after them. Two streams in the same state give the same field.
 */
export function seededSimplex2(stream: Stream): Simplex2 {
  return createNoise2D(() => stream.float01());
}
