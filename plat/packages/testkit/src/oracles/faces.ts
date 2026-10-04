// The face count of §3.7's unattracted comparison (M0-k-03): "equal face counts after both are snapped (zero-area
// faces dropped)". A face is a connected piece of the region's interior — what the arrangement keeps as one face — so
// the count is taken from the region, never from how a library chose to write its rings: two faces touching at a
// point count two whether they come as two rings, as one ring through a repeated vertex or as one ring touching
// itself at a vertex inside its own edge; a hole touching its outline counts none. The rings (already in our integer
// frame) are canonicalised by polygon-clipping's union under the non-zero rule, whose output polygons are exactly the
// interior's connected pieces (its documented output: no ring touches or crosses itself; rings may touch each other),
// and the polygons with a positive area are counted (C-0144 (3)).
import { polygonClippingRaw } from './polygon-clipping.js';
import { dedupe, loopFaceCount } from './rings.js';
import type { Ring } from './types.js';

/** The number of faces of a ring set in our frame (zero-area pieces dropped). */
export function faceCount(rings: readonly Ring[]): number {
  const rs = rings.map(dedupe).filter((r) => r.length >= 3);
  if (rs.length === 0) return 0;
  let mp: [number, number][][][];
  try {
    mp = polygonClippingRaw('union', rs, [], 'nonzero');
  } catch {
    return loopFaceCount(rs);
  }
  let n = 0;
  for (const poly of mp) {
    const outer = poly[0];
    if (outer === undefined) continue;
    let s = 0;
    for (let i = 0; i < outer.length; i += 1) {
      const [ax, ay] = outer[i];
      const [bx, by] = outer[(i + 1) % outer.length];
      s += ax * by - bx * ay;
    }
    if (s > 0) n += 1;
  }
  return n;
}
