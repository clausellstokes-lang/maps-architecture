// radialSplit and ringBand (§3.4: "a fan from a centroid or a vertex (groves, chapter houses)"; "an inner band around a
// court (cloister, quadrangle)"). M0-a-07. Readings: C-0192.
//
// Both are built from splitFace and connectHole (and, for the band's inner ring, insertChain — the door), so §3.6's
// contact semantics decide every cut; each is atomic: a cut refused after an earlier one wrote puts the op's own
// savepoint back (common.ts's `opSave` / `rollback`), so a refused op leaves the batch as it found it.
//
// * radialSplit(tx, face, apex, raysCdeg): the apex is snapped; inside the face (farther than `attractCm` from its
//   boundary) it is a fan's centre, on the boundary it lands as a cut end lands (a boundary vertex, or a split). Each ray
//   (centidegrees counter-clockwise from +x, by dmath's cosine and sine) runs from the apex to the nearest boundary point
//   it meets. An interior apex takes at least two rays — the first two make one bent cut through the apex, every later
//   one a cut from the apex — and returns the sectors counter-clockwise from the smallest ray angle; a boundary apex
//   cuts once per ray and returns the sectors counter-clockwise from the face's boundary edge leaving the apex. Rays
//   whose angles are equal modulo 360° are one ray.
// * ringBand(tx, face, widthCm): on a convex face without holes (its own-level ring turning left or straight at every
//   vertex — §3.7's half-plane path; else E_NON_CONVEX), the core ring is the ring of the inset corners (each corner's
//   two sides moved inward by `widthCm` and met), inserted closed; then a slit from the lowest-leftmost corner to its
//   inset corner (connectHole) and a cut from every other corner to its inset corner (splitFace) make one band face per
//   side, counter-clockwise from that corner. A band no wider than `attractCm` would be attracted onto the face's
//   boundary: E_BELOW_MIN_WIDTH; an inset ring that collapses or comes within `attractCm` of the boundary, or of a
//   point inside the face on none of its rings (an isolated vertex, C-0214), or that the insertion bends all the same:
//   E_DEGENERATE `collapsed`.
import { dest, type FaceId, type HalfEdgeId, type RoleRow } from '../arena/index.js';
import { dmath } from '../dmath/index.js';
import { insertChain } from '../insert/index.js';
import { passesWithin, withinSegment } from '../insert/stretch.js';
import { area2, err, ok, orient2d, ratio, snap, type KernelResult, type Warning } from '../num/index.js';
import { recordLeftOf } from '../tx/relevel.js';
import { check, type OpenTx } from '../tx/state.js';
import type { Overlay } from '../tx/types.js';
import type { Cm, LatticePoint, Level } from '../types/index.js';
import {
  ATTRACT,
  cutRows,
  enter,
  halfEdgeFromTo,
  insideRegion,
  landEnd,
  lp,
  MIN_EDGE_SQ,
  opSave,
  refuse,
  regionOf,
  rollback,
  strayNear,
  type Region,
} from './common.js';
import { holeCore, splitCore, type CutOpts } from './split.js';

const PI = 3.141592653589793;
const FULL = 36_000;

/** A ray's angle reduced to [0, 36 000) centidegrees. */
function reduce(cdeg: number): number {
  const r = cdeg % FULL;
  return r < 0 ? r + FULL : r;
}

/** Two angles (centidegrees, values — never slots), ascending. */
function byAngle(a: number, b: number): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** The nearest point where the ray from (ax, ay) in direction (dx, dy) meets the region's boundary beyond the apex, or null. */
function rayHit(t: OpenTx, r: Region, ax: number, ay: number, dx: number, dy: number): { x: number; y: number } | null {
  const p = t.plat;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  let best = Infinity;
  for (const e of r.pairs) {
    const ux = X[O[2 * e]];
    const uy = Y[O[2 * e]];
    const wx = X[O[2 * e + 1]] - ux;
    const wy = Y[O[2 * e + 1]] - uy;
    const den = dx * wy - dy * wx;
    if (den === 0) continue;
    const qx = ux - ax;
    const qy = uy - ay;
    // Along the ray and along the edge; a ray all but parallel to the edge (|den| below 1 cm) meets it nowhere.
    const s = ratio(qx * wy - qy * wx, den, 'length');
    const u = ratio(qx * dy - qy * dx, den, 'length');
    if (!s.ok || !u.ok) continue;
    if (s.value > 1 && u.value >= 0 && u.value <= 1 && s.value < best) best = s.value;
  }
  return best === Infinity ? null : { x: ax + best * dx, y: ay + best * dy };
}

/** The ray's unit direction (dmath's cosine and sine of the angle in radians). */
function direction(cdeg: number): [number, number] {
  const phi = (cdeg * PI) / 18_000;
  return [dmath.cos(phi), dmath.sin(phi)];
}

/** The angle (cdeg, in [0, 36 000)) of the direction from a to b. */
function angleOf(ax: number, ay: number, bx: number, by: number): number {
  return reduce((dmath.atan2(by - ay, bx - ax) * 18_000) / PI);
}

/**
 * §3.4's `radialSplit(tx, face, apex, raysCdeg)` (see the module comment): the sectors, counter-clockwise. Refuses,
 * writing nothing: E_DEGENERATE `empty` (no ray), E_NOT_TWO_CROSSINGS (one ray from an interior apex, an apex neither
 * inside the face nor on its boundary, a ray meeting no boundary, and every cut §3.6 refuses), E_HOLE_CONTACT, and the
 * doors' own codes.
 */
export function radialSplit(o: Overlay, face: FaceId, apex: { readonly x: number; readonly y: number }, raysCdeg: readonly number[], opts: CutOpts = {}): KernelResult<FaceId[]> {
  const { t, refused } = enter<FaceId[]>(o);
  if (refused !== null) return refused;
  const p = t.plat;
  const n = t.level;
  for (const c of raysCdeg) check(Number.isFinite(c), 'a ray angle is a finite number of centidegrees');
  const angles = [...new Set(raysCdeg.map(reduce))].sort(byAngle);
  if (angles.length === 0) return err('E_DEGENERATE', 'empty');
  const s = snap(apex.x, apex.y);
  if (!s.ok) return err(s.code, s.detail);
  const A = s.value;
  const r = regionOf(t, face, opts.faceLevel ?? n);
  const interior = insideRegion(p, r, 2 * A.x, 2 * A.y) && !r.pairs.some((e) => {
    const O = p.halfEdges.origin;
    const X = p.vertices.x;
    const Y = p.vertices.y;
    return withinSegment(A.x, A.y, X[O[2 * e]], Y[O[2 * e]], X[O[2 * e + 1]], Y[O[2 * e + 1]], ATTRACT);
  });
  let start = 0;
  let at: LatticePoint = A;
  if (!interior) {
    const l = landEnd(t, r, A);
    if (!l.ok) return refuse(l.code, l.detail);
    at = l.value.at;
    // The boundary edge leaving the apex along the face's ring: the sectors run counter-clockwise from it.
    let h: HalfEdgeId = -1;
    const lv = l.value;
    for (const ring of r.rings) {
      for (const g of ring) {
        if (lv.kind === 'vertex' ? p.halfEdges.origin[g] === lv.vertex : g >> 1 === lv.pair) {
          h = g;
          break;
        }
      }
      if (h >= 0) break;
    }
    check(h >= 0, 'a landing lies on a ring of the region');
    const nx = p.vertices.x[dest(p, h)];
    const ny = p.vertices.y[dest(p, h)];
    start = angleOf(at.x, at.y, nx, ny);
  } else if (angles.length === 1) {
    return refuse('E_NOT_TWO_CROSSINGS', 'one ray from an interior apex meets the boundary once: no fan (§3.6 (2))');
  }
  const order = interior ? angles : [...angles].sort((a, b) => byAngle(reduce(a - start), reduce(b - start)));
  const hits: { x: number; y: number }[] = [];
  for (const a of order) {
    const [dx, dy] = direction(a);
    const hit = rayHit(t, r, at.x, at.y, dx, dy);
    if (hit === null) return refuse('E_NOT_TWO_CROSSINGS', `the ray at ${a} cdeg meets no boundary of the face (§3.6 (1))`);
    hits.push(hit);
  }
  const save = opSave(t);
  const warnings: Warning[] = [];
  const sectors: FaceId[] = [];
  let rest = face;
  let restLevel: Level = opts.faceLevel ?? n;
  let first = 0;
  if (interior) {
    const c = splitCore(t, face, restLevel, [hits[1], at, hits[0]], opts.rows);
    if (!c.ok) return rollback(t, save, c);
    warnings.push(...c.warnings);
    sectors.push(c.value[0]);
    rest = c.value[1];
    restLevel = n;
    first = 2;
  }
  for (let j = first; j < hits.length; j++) {
    const c = splitCore(t, rest, restLevel, [at, hits[j]], opts.rows);
    if (!c.ok) return rollback(t, save, c);
    warnings.push(...c.warnings);
    sectors.push(c.value[1]);
    rest = c.value[0];
    restLevel = n;
  }
  sectors.push(rest);
  return ok(sectors, warnings);
}

// ---- ringBand ----------------------------------------------------------------------------------------------------------

/** The corners of a ring of lattice points (counter-clockwise): its strict left turns; null where it turns right or repeats. */
function convexCorners(pts: readonly LatticePoint[]): number[] | null {
  const m = pts.length;
  const seen = new Set<string>();
  for (const q of pts) {
    const k = `${q.x},${q.y}`;
    if (seen.has(k)) return null;
    seen.add(k);
  }
  const corners: number[] = [];
  for (let i = 0; i < m; i++) {
    const a = pts[(i + m - 1) % m];
    const b = pts[i];
    const c = pts[(i + 1) % m];
    const o = orient2d(a.x, a.y, b.x, b.y, c.x, c.y);
    if (o < 0) return null;
    if (o > 0) corners.push(i);
  }
  return corners.length >= 3 ? corners : null;
}

/** The inset corner: the two sides at corner b (from a, to c) moved inward (left) by w and met (doubles); null where they all but agree. */
function insetCorner(a: LatticePoint, b: LatticePoint, c: LatticePoint, w: number): { x: number; y: number } | null {
  const ux = b.x - a.x;
  const uy = b.y - a.y;
  const vx = c.x - b.x;
  const vy = c.y - b.y;
  const lu = Math.sqrt(ux * ux + uy * uy);
  const lv = Math.sqrt(vx * vx + vy * vy);
  // Points on the moved sides (each side's left normal times w), met along the first side.
  const fu = ratio(w, lu, 'length');
  const fv = ratio(w, lv, 'length');
  if (!fu.ok || !fv.ok) return null;
  const px = b.x - uy * fu.value;
  const py = b.y + ux * fu.value;
  const qx = b.x - vy * fv.value;
  const qy = b.y + vx * fv.value;
  const s = ratio((qx - px) * vy - (qy - py) * vx, ux * vy - uy * vx, 'area');
  if (!s.ok) return null;
  return { x: px + s.value * ux, y: py + s.value * uy };
}

/** The core ring is placeable: simple, convex, counter-clockwise, every side ≥ minEdge, every point and side clear of the boundary by more than attractCm. */
function coreClear(t: OpenTx, r: Region, core: readonly LatticePoint[]): boolean {
  const p = t.plat;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const k = core.length;
  if (area2(core) <= 0) return false;
  for (let i = 0; i < k; i++) {
    const a = core[(i + k - 1) % k];
    const b = core[i];
    const c = core[(i + 1) % k];
    if (orient2d(a.x, a.y, b.x, b.y, c.x, c.y) <= 0) return false;
    if ((c.x - b.x) * (c.x - b.x) + (c.y - b.y) * (c.y - b.y) < MIN_EDGE_SQ) return false;
    if (!insideRegion(p, r, 2 * b.x, 2 * b.y)) return false;
    for (const e of r.pairs) {
      if (withinSegment(b.x, b.y, X[O[2 * e]], Y[O[2 * e]], X[O[2 * e + 1]], Y[O[2 * e + 1]], ATTRACT)) return false;
    }
    for (const v of r.vertexRings.keys()) if (passesWithin(X[v], Y[v], b.x, b.y, c.x, c.y, ATTRACT)) return false;
  }
  return true;
}

/**
 * §3.4's `ringBand(tx, face, widthCm)` (see the module comment): the band faces counter-clockwise from the
 * lowest-leftmost corner, and the core. Refuses, writing nothing: E_NON_CONVEX, E_BELOW_MIN_WIDTH, E_DEGENERATE
 * `collapsed`, E_NOT_TWO_CROSSINGS (a cross cut §3.6 refuses), and the doors' own codes.
 */
export function ringBand(o: Overlay, face: FaceId, widthCm: Cm | number, opts: CutOpts = {}): KernelResult<{ band: FaceId[]; core: FaceId }> {
  const { t, refused } = enter<{ band: FaceId[]; core: FaceId }>(o);
  if (refused !== null) return refused;
  const p = t.plat;
  const n = t.level;
  check(Number.isFinite(widthCm), 'a band width is a finite number of centimetres');
  const faceLevel = opts.faceLevel ?? n;
  const r = regionOf(t, face, faceLevel);
  if (r.rings.length > 1) return refuse('E_NON_CONVEX', 'ringBand takes a convex face without holes (§3.7\'s half-plane path)');
  const O = p.halfEdges.origin;
  const pts = r.rings[0].map((h) => lp(p.vertices.x[O[h]], p.vertices.y[O[h]]));
  const idx = convexCorners(pts);
  if (idx === null) return refuse('E_NON_CONVEX', 'ringBand takes a convex face without holes (§3.7\'s half-plane path)');
  if (widthCm <= ATTRACT) return refuse('E_BELOW_MIN_WIDTH', `a band of ${widthCm} cm is within attractCm of the face's boundary`);
  // The corners counter-clockwise from the lowest-leftmost one.
  let s0 = 0;
  for (let i = 1; i < idx.length; i++) {
    const a = pts[idx[i]];
    const b = pts[idx[s0]];
    if (a.y < b.y || (a.y === b.y && a.x < b.x)) s0 = i;
  }
  const corners = [...idx.slice(s0), ...idx.slice(0, s0)].map((i) => pts[i]);
  const k = corners.length;
  const core: LatticePoint[] = [];
  for (let i = 0; i < k; i++) {
    const q = insetCorner(corners[(i + k - 1) % k], corners[i], corners[(i + 1) % k], widthCm);
    if (q === null) return err('E_DEGENERATE', 'collapsed');
    const sq = snap(q.x, q.y);
    if (!sq.ok) return err('E_DEGENERATE', 'collapsed');
    core.push(sq.value);
  }
  if (!coreClear(t, r, core)) return err('E_DEGENERATE', 'collapsed');
  // No side of the core passes a point inside the face on none of its rings: insertion would bend the ring through it.
  for (let i = 0; i < k; i++) {
    const stray = strayNear(t, r, core[i], core[(i + 1) % k]);
    if (!stray.ok) return refuse(stray.code, stray.detail);
    if (stray.value >= 0) return err('E_DEGENERATE', 'collapsed');
  }
  const rows: readonly RoleRow[] | undefined = opts.rows;
  const save = opSave(t);
  const warnings: Warning[] = [];
  // The core ring (the door), unbent: its points land where they were judged.
  const coreRows = cutRows(p, r, rows);
  const ins = insertChain(t, core, coreRows, 'mandatory', { closed: true });
  if (!ins.ok) return rollback(t, save, ins);
  warnings.push(...ins.warnings);
  const placed = ins.value.placed;
  for (let i = 0; i < k; i++) {
    if (p.vertices.x[placed[i]] !== core[i].x || p.vertices.y[placed[i]] !== core[i].y) {
      return rollback(t, save, err('E_DEGENERATE', 'collapsed'));
    }
  }
  // Unbent: every side one edge, else refused with the op's savepoint put back, never thrown (C-0214).
  for (let i = 0; i < k; i++) {
    if (halfEdgeFromTo(p, placed[i], placed[(i + 1) % k]) < 0) return rollback(t, save, err('E_DEGENERATE', 'collapsed'));
  }
  const h0 = halfEdgeFromTo(p, placed[0], placed[1]);
  const coreFace = recordLeftOf(t, n, h0);
  const annulus = recordLeftOf(t, n, h0 ^ 1);
  check(coreFace >= 0 && annulus >= 0 && coreFace !== annulus, 'a closed core ring bounds a face of its own');
  const slit = holeCore(t, annulus, n, [corners[0], core[0]], coreRows);
  if (!slit.ok) return rollback(t, save, slit);
  warnings.push(...slit.warnings);
  const band: FaceId[] = [];
  let rest = slit.value;
  for (let j = 1; j < k; j++) {
    const c = splitCore(t, rest, n, [corners[j], core[j]], coreRows);
    if (!c.ok) return rollback(t, save, c);
    warnings.push(...c.warnings);
    band.push(c.value[0]);
    rest = c.value[1];
  }
  band.push(rest);
  return ok({ band, core: coreFace }, warnings);
}
