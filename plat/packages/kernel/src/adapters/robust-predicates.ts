// The adapter of robust-predicates 3.0.3 (Unlicense; §3.1's adopted `incircle`, J-K36): the one file of plat/ that
// imports the library (§14). M0-a-01. `incircle` is the adaptive exact predicate and is never on the topology path;
// `orient2d` is ours (exact in doubles under the range bound, ../num/predicates.ts). The library's README describes its
// signs with the y axis pointing down; in our +y-north world its incircle value is Shewchuk's (C-0134 (5)).
import { incircle as libIncircle } from 'robust-predicates';

/**
 * 1 when d lies strictly inside the circle through a, b, c taken counter-clockwise (+y north), −1 outside, 0 when the
 * four points are cocircular — the sign reversed when a, b, c run clockwise. Exact for every finite double (adaptive
 * arithmetic); never −0; a NaN input gives NaN.
 */
export function incircle(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
  dx: number,
  dy: number,
): number {
  const s = Math.sign(libIncircle(ax, ay, bx, by, cx, cy, dx, dy));
  return s === 0 ? 0 : s;
}
