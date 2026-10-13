// The exact path for convex near-rectangles (M0-a-11; §3.8 *Convex near-rectangles take the exact path*, J-K21;
// §2.6's BaseWing; §8.6's roof construction). A wing whose ring is convex (every turn non-negative by exact orient2d on
// its lattice vertices), whose four OBB corners are each matched by a ring vertex within 30 cm and whose area is at
// least 0.97 of its OBB's gets its ridge or apex from the OBB, independent of sub-centimetre snapping: a hip roof's ridge
// ends half the OBB's minor extent in from each short side with its hips from the four matched vertices to the ridge
// ends (a ridge shorter than minEdge is the apex at the OBB's centre, so a 1 cm edit never flips a micro-ridge — the GEO-8
// case, C-0168 (7)); a gable roof's ridge lies on the wing's ridgeAxis line and ends where that line meets the ring (the
// arc-length midpoints of the two sides the axis names, §2.6); a pyramid's apex is the OBB's centre. Every roof line is
// a segment between two points of the convex ring, so it lies inside it; a ridge end or apex found outside the ring
// would refuse the exact path instead — a defensive check §3.8's argument makes unreachable (C-0168 (7)). The RoofSpec
// readers that choose a wing's form are M1's (§4b); M0 builds the construction.
import { distinctRing, offLattice, type XY } from '../geom/common.js';
import { obb, type Obb } from '../geom/index.js';
import { LATTICE, area2, err, ok, orient2d, ratio, type KernelResult } from '../num/index.js';
import { halfPlaneOf } from '../num/exact.js';
import type { LatticePoint, Polygon } from '../types/index.js';

/** §3.8: each OBB corner matched by a ring vertex within 30 cm. */
export const NEAR_RECT_CORNER_CM = 30;
/** §3.8: the ring's area at least 0.97 of its OBB's. */
export const NEAR_RECT_AREA_SHARE = 0.97;

/** Why a ring fails the convex near-rectangle test. */
export type NearRectangleFail = 'degenerate' | 'nonConvex' | 'cornerUnmatched' | 'area';

/** The convex near-rectangle test's outcome: on a pass, the OBB and the ring indices matched to its four corners. */
export type NearRectangle =
  | { pass: true; obb: Obb; corners: [number, number, number, number] }
  | { pass: false; reason: NearRectangleFail };

/** A roof's form on the exact path (§3.8): the RoofSpec that chooses it is M1's. */
export type RoofForm = 'hip' | 'gable' | 'pyramid';

/**
 * The wing the exact path reads — BaseWing's ring, corners and ridgeAxis (§2.6) with the roof's form; the kernel cannot
 * import @plat/model, so it declares the fields it reads (C-0168 (7)).
 */
export interface RoofWing {
  kind: 'rect' | 'quad';
  /** World lattice points, counter-clockwise (BaseWing.ring). */
  ring: Polygon;
  /** The ring indices at which sides 1 – 4 begin (BaseWing.corners); absent: the ring is its four corners. */
  corners?: [0, number, number, number];
  /** rect: along side 1 (0) or side 2 (1) · quad: 0 joins the midpoints of sides 1 and 3, 1 of sides 2 and 4 (§2.6). */
  ridgeAxis: 0 | 1;
  form: RoofForm;
}

/** An exact roof's lines in world centimetres (values): the ridge or the apex, and the hips. */
export interface ExactRoof {
  form: RoofForm;
  ridge: [XY, XY] | null;
  apex: XY | null;
  hips: [XY, XY][];
}

export type ExactRoofResult =
  | { exact: true; roof: ExactRoof; obb: Obb; corners: [number, number, number, number] }
  | { exact: false; reason: NearRectangleFail | 'outside' };

/**
 * §3.8's convex near-rectangle test on a lattice ring (either orientation; consecutive repeats ignored). `corners`
 * index the input ring (a repeated point by its first index); they match `obb.corners` in order.
 */
export function convexNearRectangle(ring: readonly LatticePoint[]): KernelResult<NearRectangle> {
  const bad = offLattice<NearRectangle>(ring);
  if (bad !== null) return bad;
  // the distinct ring with each point's first input index, counter-clockwise
  const src: number[] = [];
  const pts: LatticePoint[] = [];
  for (let i = 0; i < ring.length; i += 1) {
    const q = pts[pts.length - 1];
    if (q === undefined || q.x !== ring[i].x || q.y !== ring[i].y) {
      pts.push(ring[i]);
      src.push(i);
    }
  }
  while (pts.length > 1 && pts[0].x === pts[pts.length - 1].x && pts[0].y === pts[pts.length - 1].y) {
    pts.pop();
    src.pop();
  }
  const a2 = pts.length < 3 ? 0 : area2(pts);
  if (a2 === 0) return ok({ pass: false, reason: 'degenerate' });
  if (a2 < 0) {
    pts.reverse();
    src.reverse();
  }
  const n = pts.length;
  let wraps = 0;
  for (let i = 0; i < n; i += 1) {
    const a = pts[i];
    const b = pts[(i + 1) % n];
    const c = pts[(i + 2) % n];
    const o = orient2d(a.x, a.y, b.x, b.y, c.x, c.y);
    const ux = b.x - a.x;
    const uy = b.y - a.y;
    const vx = c.x - b.x;
    const vy = c.y - b.y;
    if (o < 0 || (o === 0 && ux * vx + uy * vy < 0)) return ok({ pass: false, reason: 'nonConvex' });
    if (halfPlaneOf(ux, uy) === 1 && halfPlaneOf(vx, vy) === 0) wraps += 1;
  }
  if (wraps !== 1) return ok({ pass: false, reason: 'nonConvex' }); // turns all left but winding twice: not simple
  const box = obb(pts);
  if (!box.ok) return ok({ pass: false, reason: 'degenerate' });
  const corners: number[] = [];
  for (const c of box.value.corners) {
    let best = -1;
    let bestD = Number.POSITIVE_INFINITY;
    for (let i = 0; i < n; i += 1) {
      const dx = pts[i].x - c.x;
      const dy = pts[i].y - c.y;
      const d = dx * dx + dy * dy;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    if (!(bestD <= NEAR_RECT_CORNER_CM * NEAR_RECT_CORNER_CM) || corners.includes(src[best])) return ok({ pass: false, reason: 'cornerUnmatched' });
    corners.push(src[best]);
  }
  if (!(Math.abs(a2) >= 2 * NEAR_RECT_AREA_SHARE * box.value.majorCm * box.value.minorCm)) return ok({ pass: false, reason: 'area' });
  return ok({ pass: true, obb: box.value, corners: [corners[0], corners[1], corners[2], corners[3]] });
}

/** The point at half the arc length of the ring's chain from index i0 forward to index i1 (cyclic). */
function arcMidpoint(ring: readonly LatticePoint[], i0: number, i1: number): XY {
  const n = ring.length;
  let total = 0;
  for (let i = i0; i !== i1; i = (i + 1) % n) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    total += Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
  }
  let rest = total * 0.5;
  for (let i = i0; i !== i1; i = (i + 1) % n) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    const len = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
    if (rest <= len) {
      const f = ratio(rest, len, 'length');
      const t = f.ok ? f.value : 0;
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
    rest -= len;
  }
  return { x: ring[i1].x, y: ring[i1].y };
}

/** Is the point inside the convex counter-clockwise lattice ring or on it (doubles; the points tested lie well inside)? */
function insideConvex(ring: readonly LatticePoint[], p: XY): boolean {
  const n = ring.length;
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    if ((b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x) < 0) return false;
  }
  return true;
}

/**
 * The exact OBB roof of a wing that passes the convex near-rectangle test (§3.8): `exact: false` with the test's
 * reason otherwise — the caller then takes the validated skeleton (`skeleton(rings, 'roof')`) with its plain-roof
 * downgrade (§3.8, §8.6). E_OUT_OF_RANGE for an off-lattice ring.
 */
export function exactRoof(wing: RoofWing): KernelResult<ExactRoofResult> {
  const test = convexNearRectangle(wing.ring);
  if (!test.ok) return err(test.code, test.detail);
  if (!test.value.pass) return ok({ exact: false, reason: test.value.reason });
  const box = test.value.obb;
  const matched = test.value.corners;
  const ccw = area2(distinctRing(wing.ring)) > 0 ? distinctRing(wing.ring) : distinctRing(wing.ring).reverse();
  const centre = box.centre;
  const u = box.major;
  const at = (i: number): XY => ({ x: wing.ring[i].x, y: wing.ring[i].y });
  let roof: ExactRoof;
  if (wing.form === 'gable') {
    const cs = wing.corners ?? (wing.ring.length === 4 ? [0, 1, 2, 3] : [...matched].sort((p, q) => p - q));
    const side = (s: number): XY => arcMidpoint(wing.ring, cs[s - 1], cs[s % 4]);
    // a rect's axis 0 runs along side 1 — the line joining the midpoints of sides 2 and 4, a quad's axis 1 (§2.6)
    const alongSide1 = wing.kind === 'rect' ? wing.ridgeAxis === 0 : wing.ridgeAxis === 1;
    roof = { form: 'gable', ridge: alongSide1 ? [side(2), side(4)] : [side(1), side(3)], apex: null, hips: [] };
  } else if (wing.form === 'pyramid' || box.majorCm - box.minorCm < LATTICE.minEdgeCm) {
    roof = { form: wing.form, ridge: null, apex: { x: centre.x, y: centre.y }, hips: matched.map((i) => [at(i), { x: centre.x, y: centre.y }]) };
  } else {
    const h = (box.majorCm - box.minorCm) * 0.5;
    const lo: XY = { x: centre.x - u.x * h, y: centre.y - u.y * h };
    const hi: XY = { x: centre.x + u.x * h, y: centre.y + u.y * h };
    const hips: [XY, XY][] = matched.map((i) => {
      const v = at(i);
      return [v, u.x * (v.x - centre.x) + u.y * (v.y - centre.y) < 0 ? lo : hi];
    });
    roof = { form: 'hip', ridge: [lo, hi], apex: null, hips };
  }
  const inner: XY[] = roof.apex !== null ? [roof.apex] : roof.form === 'hip' && roof.ridge !== null ? [roof.ridge[0], roof.ridge[1]] : [];
  for (const p of inner) if (!insideConvex(ccw, p)) return ok({ exact: false, reason: 'outside' });
  return ok({ exact: true, roof, obb: box, corners: matched });
}
