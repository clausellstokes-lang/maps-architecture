// §3.7's EXACT KERB as a pure function, and its content key (M0-a-09, hardening round S18 — the library round of round 2A
// of the kernel amendment z, item 986; J742 R-A, J744 (2)). A by-path, kernel-internal module: `arr/index.ts` and the
// package barrel do not re-export it, and nothing the construction serves imports it (kerb(), readKerb, corridorUnion,
// bandUnion, S8, S9 and the bench read the construction exactly as before).
//
// THE DEFINITION. §3.7: "kerb(F) = F − ⋃ buffer(spineᵢ, half-widthᵢ)". X(F) is that region computed EXACTLY on the
// rings' coordinates — one arrangement of every original segment, nothing inserted into any arena — over the spines the
// read's census keeps, read as the construction reads them (kerb.ts's module comment), in this fixed evaluation order:
//   (1) f := readFace(p, face, widths, new Map(), vertexContacts) — F's L1 route rings in their canonical order, its edge
//       spines and its `through` candidates (kerb.ts `readFace`);
//   (2) X_E := exactRegion(f.rings, the edge spines' parts) — the edge spines' kerb, computed exactly (below);
//   (3) the reaching set: f.through filtered by `reaches(s, X_E)` — the census's rule (kerb.ts `censusRead`, `reaches`)
//       applied to X_E, never to the construction's base;
//   (4) per keyed spine — the edge spines and the reaching ones, in key order — its parts kerbParts(f.rings, {s}, true):
//       the FAITHFUL read's parts (kerb.ts `kerbParts` / `spineParts` / `straightRun`): each run after straightRun's
//       drop, with the construction's strips, joins, sagitta rule and junction-flat ends, F's box from f.rings — so a
//       straight-through vertex a neighbour's T puts on a spine changes no part (§3.7: the T-junction "adds a vertex that
//       carries no knot and changes no half-width");
//   (5) THE RING RULE on f.rings: a maximal run v₁ … v_k of consecutive route vertices of a ring is left out where each is
//       straight-through against the kept neighbours u and w (straightRun's line test: within HOT_PIXEL_CM of the line
//       u–w, strictly between u and w) AND the polygon (u, v₁, …, v_k, w) is held by ONE of the key's parts (kerb.ts
//       `coveredBy`, exact) — so region(F) and the dropped region differ only inside a part, which X subtracts;
//   (6) the key: a canonical text of the flag, the rings of (5) and, per keyed spine, its key and its parts (`exactKey`);
//   (7) X := exactRegion(the key's rings, the key's parts) — X IS A FUNCTION OF THE KEY'S CONTENT, so equal keys give
//       identical X by construction; a ring vertex (5) left out is no input of X, so it makes no hot pixel either.
// A face whose key holds no part reads its own route rings verbatim (kerb.ts `ownRings`: the construction's reading (4) of
// its module comment, and its `d.laid.length === 0` branch); a face wholly within its bands reads ok([]); X refuses only
// where readFace or bufferParts refuse (their own codes and checks). X writes nothing: no arena, index, batch state,
// savepoint or insertion — no Plat is built (buildOverlay and createPlat are never called); the only state the module
// touches is kerb.ts's PART_GROUP, the WeakMap `spineParts` keys by the fresh parts it returns.
//
// exactRegion(rings, parts): the region inside `rings` (non-zero winding of the rings) and inside no part (the parts'
// windings SUMMED are 0 — so a ring set with holes may stand as one part set), as canonical rings:
//   * ONE arrangement of all the original segments, the rings' and every part's, at once: every pair of original
//     segments that cross properly is found with exact predicates (`orient2d`), their crossing an exact rational N / D
//     computed in BigInt; a touch or a collinear overlap meets at an input vertex;
//   * THE ROUNDING RULE (§3.2: `snap` rounds each coordinate to the nearest centimetre, a half AWAY FROM ZERO,
//     num/snap.ts and num/lattice.ts `roundHalfAway`): every output vertex is an input vertex or the ONE half-away
//     rounding of the exact crossing of two ORIGINAL segments, computed WITHOUT DIVISION — a double estimate of N / D
//     through ratio() corrected by BigInt multiply-compares until (2k − 1)·|D| ≤ 2·|N| < (2k + 1)·|D| for the
//     sign-adjusted k (num/exact.ts settles its ties in BigInt the same way), then snap's range check — never a rounding
//     of a point computed from a rounded point. THE TIE: an exact x.5 rounds to x + 1 and −x.5 to −x − 1 (half away);
//     the construction's crossing is placed by the insertion's own rule (insert/placement.ts `nearestLatticePoint`, its
//     ties y then x toward the smaller coordinate), so the two may differ by 1 cm at an exact half — the insertion's tie,
//     not X's;
//   * THE RESOLUTION where that rounding would leave a ring non-simple: ONE pass of SNAP ROUNDING over the whole
//     arrangement — the HOT PIXELS are every vertex of exactRegion's own input (the rings and parts it is given) and every
//     rounded crossing, each THE PIXEL ITS ROUNDING RULE GIVES: the unit square of the points that round half away to its
//     lattice point, per axis [c − ½, c + ½) for c > 0, (c − ½, c + ½] for c < 0 and (−½, ½) for c = 0 (`exactPixelEntry`,
//     round S19's F1: a pixel half-open the same way for every sign left the exact crossing (−a − ½, −b − ½), which rounds
//     to (−a − 1, −b − 1), outside that point's pixel, so a segment through it was never routed through it). The pixels
//     so partition the plane as `roundHalfAway` does, every exact crossing lies in its rounded point's pixel, and the
//     rule is symmetric under reflection through the origin (num/lattice.ts), where every frame is centred; every
//     original segment is routed through the centre of every hot pixel it meets, in its own order (Hobby's snap rounding:
//     the rounded segments meet only at hot-pixel centres); each rounded piece is cut again at any hot-pixel centre lying
//     on it (exact), coincident pieces merged with their windings summed, and the pieces whose summed windings are 0
//     dropped. The hot pixels, the pieces and their windings are SETS of the input's geometry, so the result depends on
//     no order of the spines, of their parts, of a ring's start or of the holes; a crossing left between two rounded
//     pieces (never on snap rounding's own law) is rounded as a hot pixel and the pass run once more over the original
//     segments, at most four times, and a proper crossing of two pieces still left after them — or one that rounds to a
//     pixel already hot — is a `check` failure (tx/state.ts), never a traced region (the trace below needs a planar
//     arrangement);
//   * the cells classed by winding — each face cycle of the rounded arrangement read once, its left side's winding of the
//     rings and of the parts by an exact ray from its first edge's midpoint (doubled coordinates) — and the kept region's
//     boundary traced as kerb.ts's dryRegion traces it: from its half-edges in lattice order, cut into simple loops at
//     repeated vertices (`simpleLoops`), straight-through vertices dropped but where the boundary meets itself
//     (`dropStraight`), each ring canonical (`canonicalRing`), its spikes dropped (`unspiked`), rings of no area dropped,
//     the rings in `compareRings` order (KerbRead.region's normal form).
import type { FaceId, Plat } from '../arena/index.js';
import { HOT_PIXEL_CM } from '../index/index.js';
import { DEBUG_BUILD } from '../invariants/debug.js';
import { area2, err, ok, orient2d, ratio, snap, type KernelResult } from '../num/index.js';
import { check } from '../tx/state.js';
import type { LatticePoint } from '../types/index.js';
import {
  coveredBy,
  kerbParts,
  ownRings,
  reaches,
  readFace,
  setReadShadow,
  unspiked,
  type LastRead,
  type ReadShadow,
  type Spine,
  type SpineWidths,
} from './kerb.js';
import { canonicalRing, compareRings, dropStraight, simpleLoops, type Ring } from './winding.js';

// ---- exactRegion: the one arrangement, snap-rounded --------------------------------------------------------------------

/** An original segment of exactRegion's input: its ends, its operand (0 the rings, 1 the parts). */
interface ExactSeg {
  readonly ax: number;
  readonly ay: number;
  readonly bx: number;
  readonly by: number;
  readonly op: 0 | 1;
}

/** 2²³: a lattice coordinate's bound (snap's range, num/snap.ts). */
const LATTICE_SPAN = 8_388_608;
/** 2²⁴: the key's stride (a lattice coordinate plus 2²³ lies in [0, 2²⁴)). */
const KEY_STRIDE = 16_777_216;

/** A lattice point's integer key (exact: below 2⁴⁸). */
function exactPointKey(x: number, y: number): number {
  return (x + LATTICE_SPAN) * KEY_STRIDE + (y + LATTICE_SPAN);
}

/** The original segments of the operands, each ring closed (a zero-length edge, which no input carries, is skipped). */
function exactSegmentsOf(rings: readonly (readonly LatticePoint[])[], op: 0 | 1, out: ExactSeg[]): void {
  for (const r of rings) {
    const n = r.length;
    if (n < 2) continue;
    for (let i = 0; i < n; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % n];
      if (a.x === b.x && a.y === b.y) continue;
      out.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, op });
    }
  }
}

/**
 * N / D rounded to the nearest integer, a half AWAY FROM ZERO (§3.2's `snap` rule), without a division: a double estimate
 * through ratio() corrected by BigInt multiply-compares until (2k − 1)·|D| ≤ 2·|N| < (2k + 1)·|D| (D ≠ 0).
 */
export function roundQuotientHalfAway(N: bigint, D: bigint): number {
  let n = N;
  let d = D;
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const negative = n < 0n;
  if (negative) n = -n;
  const est = ratio(Number(n), Number(d), 'area');
  check(est.ok, 'exactRegion: a crossing with a zero denominator');
  let k = BigInt(Math.max(0, Math.round(est.value)));
  const two = 2n;
  while (two * n >= (two * k + 1n) * d) k += 1n;
  while (k > 0n && two * n < (two * k - 1n) * d) k -= 1n;
  const v = Number(k);
  return negative ? -v : v;
}

/**
 * The exact crossing of two original segments that cross properly, rounded half away per coordinate (BigInt; snap's
 * range check after): a + t (b − a), t = ((c − a) × (d − c)) / ((b − a) × (d − c)).
 */
function exactCrossingRounded(s: ExactSeg, u: ExactSeg): LatticePoint {
  const ax = BigInt(s.ax);
  const ay = BigInt(s.ay);
  const rx = BigInt(s.bx - s.ax);
  const ry = BigInt(s.by - s.ay);
  const qx = BigInt(u.bx - u.ax);
  const qy = BigInt(u.by - u.ay);
  const D = rx * qy - ry * qx;
  const T = (BigInt(u.ax) - ax) * qy - (BigInt(u.ay) - ay) * qx;
  const x = roundQuotientHalfAway(ax * D + rx * T, D);
  const y = roundQuotientHalfAway(ay * D + ry * T, D);
  const sn = snap(x, y);
  check(sn.ok, 'exactRegion: a rounded crossing outside the lattice');
  return sn.value;
}

/** Do the two segments cross properly — each one's ends strictly either side of the other's line (exact)? */
function exactProperCross(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number): boolean {
  const o1 = orient2d(ax, ay, bx, by, cx, cy);
  const o2 = orient2d(ax, ay, bx, by, dx, dy);
  if (!((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0))) return false;
  const o3 = orient2d(cx, cy, dx, dy, ax, ay);
  const o4 = orient2d(cx, cy, dx, dy, bx, by);
  return (o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0);
}

/** Every pair of segments whose boxes overlap, by a sweep in x (the visit order is irrelevant to every caller: sets). */
function exactBoxPairs<S extends { readonly ax: number; readonly ay: number; readonly bx: number; readonly by: number }>(segs: readonly S[], visit: (a: S, b: S) => void): void {
  const order = segs.map((_, i) => i).sort((i, j) => Math.min(segs[i].ax, segs[i].bx) - Math.min(segs[j].ax, segs[j].bx) || i - j);
  for (let k = 0; k < order.length; k += 1) {
    const s = segs[order[k]];
    const sx1 = Math.max(s.ax, s.bx);
    const sy0 = Math.min(s.ay, s.by);
    const sy1 = Math.max(s.ay, s.by);
    for (let m = k + 1; m < order.length; m += 1) {
      const u = segs[order[m]];
      if (Math.min(u.ax, u.bx) > sx1) break;
      if (Math.max(u.ay, u.by) < sy0 || Math.min(u.ay, u.by) > sy1) continue;
      visit(s, u);
    }
  }
}

/** A fraction num / den (den > 0) with whether the bound it is includes its value. */
interface Bound {
  readonly n: number;
  readonly d: number;
  readonly closed: boolean;
}

/** a < b, a = b, a > b for two fractions (exact: every product below 2⁵²). */
function compareBounds(a: Bound, b: Bound): number {
  const l = a.n * b.d;
  const r = b.n * a.d;
  return l < r ? -1 : l > r ? 1 : 0;
}

/**
 * The parameter interval of the segment A → B (doubled coordinates) inside the pixel of the lattice point C (doubled):
 * the points whose half-away rounding (num/lattice.ts `roundHalfAway`) is C, per axis — [C − 1, C + 1) for a positive
 * centre, (C − 1, C + 1] for a negative one, (−1, 1) for 0 — so the pixels partition the plane exactly as the rounding
 * rule does and a rounded crossing's pixel holds the exact crossing in every quadrant (round S19, F1). Its lower bound, or
 * null where the segment does not meet the pixel. Exact (integers below 2²⁶, products below 2⁵²).
 */
function exactPixelEntry(Ax: number, Ay: number, Bx: number, By: number, Cx: number, Cy: number): Bound | null {
  let lo: Bound = { n: 0, d: 1, closed: true };
  let hi: Bound = { n: 1, d: 1, closed: true };
  const axis = (A: number, B: number, C: number): boolean => {
    // the pixel's sides on this axis: C − 1 closed where C > 0, C + 1 closed where C < 0 (a half rounds away from zero)
    const loIn = C > 0;
    const hiIn = C < 0;
    const dd = B - A;
    if (dd === 0) return (loIn ? C - 1 <= A : C - 1 < A) && (hiIn ? A <= C + 1 : A < C + 1);
    // x(t) = A + t·dd: x ≥ C − 1 (closed where loIn) and x ≤ C + 1 (closed where hiIn)
    let l: Bound;
    let h: Bound;
    if (dd > 0) {
      l = { n: C - 1 - A, d: dd, closed: loIn };
      h = { n: C + 1 - A, d: dd, closed: hiIn };
    } else {
      l = { n: A - C - 1, d: -dd, closed: hiIn };
      h = { n: A - C + 1, d: -dd, closed: loIn };
    }
    const cl = compareBounds(l, lo);
    if (cl > 0 || (cl === 0 && !l.closed)) lo = l;
    const ch = compareBounds(h, hi);
    if (ch < 0 || (ch === 0 && !h.closed)) hi = h;
    return true;
  };
  if (!axis(Ax, Bx, Cx) || !axis(Ay, By, Cy)) return null;
  const c = compareBounds(lo, hi);
  if (c < 0 || (c === 0 && lo.closed && hi.closed)) return lo;
  return null;
}

/** The hot pixels, sorted by x then y, for the range scans. */
interface HotPixels {
  readonly xs: number[];
  readonly ys: number[];
}

/** The hot pixels from their set, in lattice order x then y. */
function exactHotPixels(hot: ReadonlyMap<number, LatticePoint>): HotPixels {
  const pts = [...hot.values()].sort((a, b) => a.x - b.x || a.y - b.y);
  return { xs: pts.map((q) => q.x), ys: pts.map((q) => q.y) };
}

/** The first index of the sorted xs at or above x. */
function exactLowerIndex(xs: readonly number[], x: number): number {
  let lo = 0;
  let hi = xs.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (xs[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/** The centres of the hot pixels the segment meets, in its own order (Hobby's snap rounding of one segment). */
function exactSnapSegment(s: ExactSeg, hp: HotPixels): LatticePoint[] {
  const x0 = Math.min(s.ax, s.bx) - 1;
  const x1 = Math.max(s.ax, s.bx) + 1;
  const y0 = Math.min(s.ay, s.by) - 1;
  const y1 = Math.max(s.ay, s.by) + 1;
  const met: { x: number; y: number; at: Bound }[] = [];
  for (let i = exactLowerIndex(hp.xs, x0); i < hp.xs.length && hp.xs[i] <= x1; i += 1) {
    const cy = hp.ys[i];
    if (cy < y0 || cy > y1) continue;
    const cx = hp.xs[i];
    const at = exactPixelEntry(2 * s.ax, 2 * s.ay, 2 * s.bx, 2 * s.by, 2 * cx, 2 * cy);
    if (at !== null) met.push({ x: cx, y: cy, at });
  }
  // the pixels partition the plane, so their intervals along the segment are disjoint: by entry, a closed entry first
  met.sort((a, b) => compareBounds(a.at, b.at) || (a.at.closed === b.at.closed ? 0 : a.at.closed ? -1 : 1));
  return met.map((m) => ({ x: m.x, y: m.y }) as LatticePoint);
}

/** A rounded piece: its ends (lattice points) and its windings of the rings and of the parts, along a → b. */
interface ExactPiece {
  readonly ax: number;
  readonly ay: number;
  readonly bx: number;
  readonly by: number;
  readonly c0: number;
  readonly c1: number;
}

/** Is the lattice point a before b in lattice order (y, then x: §3.3's vertex key)? */
function exactBefore(ax: number, ay: number, bx: number, by: number): boolean {
  return ay < by || (ay === by && ax < bx);
}

/**
 * The snap-rounded arrangement: every original segment through the hot pixels it meets, each rounded piece cut at every
 * hot-pixel centre on it, coincident pieces merged (their windings summed, oriented from the lattice-lower end), the
 * pieces of no winding dropped — in lattice order of their ends.
 */
function exactPieces(segs: readonly ExactSeg[], hp: HotPixels): ExactPiece[] {
  const sum = new Map<string, { ax: number; ay: number; bx: number; by: number; c0: number; c1: number }>();
  const add = (ax: number, ay: number, bx: number, by: number, op: 0 | 1): void => {
    const fwd = exactBefore(ax, ay, bx, by);
    const [px, py, qx, qy] = fwd ? [ax, ay, bx, by] : [bx, by, ax, ay];
    const k = `${String(px)},${String(py)},${String(qx)},${String(qy)}`;
    let e = sum.get(k);
    if (e === undefined) {
      e = { ax: px, ay: py, bx: qx, by: qy, c0: 0, c1: 0 };
      sum.set(k, e);
    }
    const w = fwd ? 1 : -1;
    if (op === 0) e.c0 += w;
    else e.c1 += w;
  };
  for (const s of segs) {
    const cs = exactSnapSegment(s, hp);
    for (let i = 0; i + 1 < cs.length; i += 1) {
      const a = cs[i];
      const b = cs[i + 1];
      // every hot-pixel centre lying on the rounded piece, strictly between its ends, in its order
      const inner: { x: number; y: number; t: number }[] = [];
      const x0 = Math.min(a.x, b.x);
      const x1 = Math.max(a.x, b.x);
      const y0 = Math.min(a.y, b.y);
      const y1 = Math.max(a.y, b.y);
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      for (let j = exactLowerIndex(hp.xs, x0); j < hp.xs.length && hp.xs[j] <= x1; j += 1) {
        const cx = hp.xs[j];
        const cy = hp.ys[j];
        if (cy < y0 || cy > y1) continue;
        if ((cx === a.x && cy === a.y) || (cx === b.x && cy === b.y)) continue;
        if (orient2d(a.x, a.y, b.x, b.y, cx, cy) !== 0) continue;
        inner.push({ x: cx, y: cy, t: (cx - a.x) * dx + (cy - a.y) * dy });
      }
      inner.sort((u, v) => u.t - v.t);
      let px: number = a.x;
      let py: number = a.y;
      for (const q of inner) {
        add(px, py, q.x, q.y, s.op);
        px = q.x;
        py = q.y;
      }
      add(px, py, b.x, b.y, s.op);
    }
  }
  const out: ExactPiece[] = [];
  for (const e of sum.values()) if (e.c0 !== 0 || e.c1 !== 0) out.push(e);
  out.sort((u, v) => u.ay - v.ay || u.ax - v.ax || u.by - v.by || u.bx - v.bx);
  return out;
}

/** The half-plane of a direction (0: up, or along +x; 1: down, or along −x), for the angular order. */
function exactHalfOf(dx: number, dy: number): number {
  return dy > 0 || (dy === 0 && dx > 0) ? 0 : 1;
}

/**
 * The kept region of the rounded arrangement as rings (KerbRead.region's normal form; see the module comment): the face
 * cycles' left windings by an exact ray each, the kept region inside the rings and in no part, its boundary traced.
 */
function exactTraceKept(pieces: readonly ExactPiece[]): Ring[] {
  // the vertices, in lattice order (ids follow the geometry)
  const vkeys = new Map<number, number>();
  const vx: number[] = [];
  const vy: number[] = [];
  const pts: { x: number; y: number }[] = [];
  for (const e of pieces) {
    pts.push({ x: e.ax, y: e.ay });
    pts.push({ x: e.bx, y: e.by });
  }
  pts.sort((a, b) => a.y - b.y || a.x - b.x);
  for (const q of pts) {
    const k = exactPointKey(q.x, q.y);
    if (vkeys.has(k)) continue;
    vkeys.set(k, vx.length);
    vx.push(q.x);
    vy.push(q.y);
  }
  const m = pieces.length;
  // half-edge 2i runs a → b of piece i, 2i + 1 back; its winding counts along it
  const org = new Int32Array(2 * m);
  const c0 = new Int32Array(2 * m);
  const c1 = new Int32Array(2 * m);
  for (let i = 0; i < m; i += 1) {
    const e = pieces[i];
    const a = vkeys.get(exactPointKey(e.ax, e.ay)) as number;
    const b = vkeys.get(exactPointKey(e.bx, e.by)) as number;
    org[2 * i] = a;
    org[2 * i + 1] = b;
    c0[2 * i] = e.c0;
    c0[2 * i + 1] = -e.c0;
    c1[2 * i] = e.c1;
    c1[2 * i + 1] = -e.c1;
  }
  const dest = (h: number): number => org[h ^ 1];
  // each vertex's outgoing half-edges counter-clockwise (exact: half-plane, then the cross product's sign)
  const out: number[][] = vx.map(() => []);
  for (let h = 0; h < 2 * m; h += 1) out[org[h]].push(h);
  const dirX = (h: number): number => vx[dest(h)] - vx[org[h]];
  const dirY = (h: number): number => vy[dest(h)] - vy[org[h]];
  for (const list of out) {
    list.sort((g, h) => {
      const hg = exactHalfOf(dirX(g), dirY(g));
      const hh = exactHalfOf(dirX(h), dirY(h));
      if (hg !== hh) return hg - hh;
      const o = orient2d(0, 0, dirX(g), dirY(g), dirX(h), dirY(h));
      return o > 0 ? -1 : o < 0 ? 1 : 0;
    });
  }
  const slot = new Int32Array(2 * m);
  for (const list of out) list.forEach((h, i) => (slot[h] = i));
  // next(h): at h's end, the outgoing half-edge clockwise after h's twin (the face on h's left goes on along it)
  const next = new Int32Array(2 * m);
  for (let h = 0; h < 2 * m; h += 1) {
    const list = out[dest(h)];
    const i = slot[h ^ 1];
    next[h] = list[(i + list.length - 1) % list.length];
  }
  // the face cycles and each one's left winding (an exact ray from its first half-edge's midpoint, doubled coordinates)
  const cyc = new Int32Array(2 * m).fill(-1);
  const keptCycle: boolean[] = [];
  for (let h0 = 0; h0 < 2 * m; h0 += 1) {
    if (cyc[h0] >= 0) continue;
    const id = keptCycle.length;
    let h = h0;
    let guard = 0;
    do {
      cyc[h] = id;
      h = next[h];
      guard += 1;
      check(guard <= 2 * m, 'exactRegion: a face cycle that does not close');
    } while (h !== h0);
    const [w0, w1] = exactLeftWinding(h0, org, c0, c1, vx, vy, m);
    keptCycle.push(w0 !== 0 && w1 === 0);
  }
  const bnd = (h: number): boolean => keptCycle[cyc[h]] && !keptCycle[cyc[h ^ 1]];
  const B: number[] = [];
  for (let h = 0; h < 2 * m; h += 1) if (bnd(h)) B.push(h);
  B.sort((u, w) => vy[org[u]] - vy[org[w]] || vx[org[u]] - vx[org[w]] || vy[dest(u)] - vy[dest(w)] || vx[dest(u)] - vx[dest(w)]);
  const leaving = new Map<number, number>();
  for (const h of B) leaving.set(org[h], (leaving.get(org[h]) ?? 0) + 1);
  const touch = new Set<string>();
  for (const [v, k] of leaving) if (k > 1) touch.add(`${String(vx[v])},${String(vy[v])}`);
  const done = new Uint8Array(2 * m);
  const rings: Ring[] = [];
  for (const h0 of B) {
    if (done[h0] === 1) continue;
    const vs: number[] = [];
    let h = h0;
    let guard = 0;
    do {
      done[h] = 1;
      vs.push(org[h]);
      let g = next[h];
      while (!bnd(g)) {
        g = next[g ^ 1];
        guard += 1;
        check(guard <= 8 * m, 'exactRegion: the kept boundary does not close');
      }
      h = g;
      guard += 1;
      check(guard <= 8 * m, 'exactRegion: the kept boundary does not close');
    } while (h !== h0);
    for (const loop of simpleLoops(vs)) {
      const ring = dropStraight(
        loop.map((v) => ({ x: vx[v], y: vy[v] }) as LatticePoint),
        (q) => touch.has(`${String(q.x)},${String(q.y)}`),
      );
      if (ring.length < 3 || area2(ring) === 0) continue;
      rings.push(canonicalRing(ring));
    }
  }
  return rings.map(unspiked).filter((q) => q.length >= 3 && area2(q) !== 0).sort(compareRings);
}

/**
 * The windings of the rings and of the parts on the left of half-edge h: an exact ray from h's midpoint towards +x over
 * every other piece (doubled coordinates; the half-open rule reads a point at a vertex's height as just above it), then
 * h's own winding added where its left side is the side the ray does not see (an upward h, a horizontal h running −x).
 */
function exactLeftWinding(h: number, org: Int32Array, c0: Int32Array, c1: Int32Array, vx: readonly number[], vy: readonly number[], m: number): [number, number] {
  const a = org[h];
  const b = org[h ^ 1];
  const mx = vx[a] + vx[b];
  const my = vy[a] + vy[b];
  let w0 = 0;
  let w1 = 0;
  const self = h >> 1;
  for (let i = 0; i < m; i += 1) {
    if (i === self) continue;
    const p = org[2 * i];
    const q = org[2 * i + 1];
    const py = 2 * vy[p];
    const qy = 2 * vy[q];
    if (py <= my && my < qy) {
      if (orient2d(2 * vx[p], py, 2 * vx[q], qy, mx, my) > 0) {
        w0 += c0[2 * i];
        w1 += c1[2 * i];
      }
    } else if (qy <= my && my < py) {
      if (orient2d(2 * vx[p], py, 2 * vx[q], qy, mx, my) < 0) {
        w0 -= c0[2 * i];
        w1 -= c1[2 * i];
      }
    }
  }
  const up = vy[b] > vy[a];
  const leftward = vy[b] === vy[a] && vx[b] < vx[a];
  if (up || leftward) {
    w0 += c0[h];
    w1 += c1[h];
  }
  return [w0, w1];
}

/** The rounded crossings of every two pieces that still cross properly (none, on snap rounding's own law). */
function exactPieceCrossings(pieces: readonly ExactPiece[]): LatticePoint[] {
  const found: LatticePoint[] = [];
  exactBoxPairs(pieces, (s, u) => {
    if (exactProperCross(s.ax, s.ay, s.bx, s.by, u.ax, u.ay, u.bx, u.by)) found.push(exactCrossingRounded({ ...s, op: 0 }, { ...u, op: 0 }));
  });
  return found;
}

/**
 * §3.7's region on the rings' coordinates, exactly (see the module comment): inside `rings` (non-zero winding) and inside
 * no part (the parts' windings summed 0), one arrangement of every original segment, snap-rounded by the half-away rule;
 * the normal form KerbRead.region's. No part: the rings verbatim (`ownRings`); no ring: [].
 */
export function exactRegion(rings: readonly (readonly LatticePoint[])[], parts: readonly (readonly LatticePoint[])[]): Ring[] {
  if (rings.length === 0) return [];
  if (parts.length === 0) return ownRings(rings);
  const segs: ExactSeg[] = [];
  exactSegmentsOf(rings, 0, segs);
  exactSegmentsOf(parts, 1, segs);
  const hot = new Map<number, LatticePoint>();
  for (const s of segs) {
    hot.set(exactPointKey(s.ax, s.ay), { x: s.ax, y: s.ay } as LatticePoint);
    hot.set(exactPointKey(s.bx, s.by), { x: s.bx, y: s.by } as LatticePoint);
  }
  // every proper crossing of two original segments, rounded half away (a touch or an overlap meets at an input vertex)
  exactBoxPairs(segs, (s, u) => {
    if (exactProperCross(s.ax, s.ay, s.bx, s.by, u.ax, u.ay, u.bx, u.by)) {
      const q = exactCrossingRounded(s, u);
      hot.set(exactPointKey(q.x, q.y), q);
    }
  });
  let pieces = exactPieces(segs, exactHotPixels(hot));
  // (never on snap rounding's law: a crossing left between rounded pieces is a hot pixel too, and the pass is run again;
  // a crossing still left after the repeats, or one that rounds to a pixel already hot, is a planarity failure — a
  // `check`, never a traced region: round S19, F1)
  let crossing = exactPieceCrossings(pieces);
  for (let round = 0; round < 4 && crossing.length > 0; round += 1) {
    const left = crossing.filter((q) => !hot.has(exactPointKey(q.x, q.y)));
    check(left.length > 0, 'exactRegion: two rounded pieces cross at no vertex (a crossing rounded to a hot pixel it does not pass)');
    for (const q of left) hot.set(exactPointKey(q.x, q.y), q);
    pieces = exactPieces(segs, exactHotPixels(hot));
    crossing = exactPieceCrossings(pieces);
  }
  check(crossing.length === 0, 'exactRegion: two rounded pieces still cross after the snap-rounding pass');
  if (pieces.length === 0) return [];
  return exactTraceKept(pieces);
}

// ---- the exact kerb and its content key --------------------------------------------------------------------------------

/** One keyed spine of the key: its key and its parts (each canonical, in kerbParts' order). */
export interface KeyedSpine {
  readonly key: string;
  readonly parts: readonly Ring[];
}

/** The content of a kerb's key (line 4 of round S18): everything X depends on, and nothing else. */
export interface ExactKeyContent {
  /** `vertexContacts` as readFace took it. */
  readonly vertexContacts: boolean;
  /** F's route rings in readFace's canonical order, under THE RING RULE (the module comment, step (5)). */
  readonly rings: readonly (readonly LatticePoint[])[];
  /** The edge spines and the `through` spines that reach X_E, in key order, each with its faithful parts. */
  readonly spines: readonly KeyedSpine[];
  /** The `through` spines that reach X_E (the census's set, read on X_E). */
  readonly reaching: readonly string[];
  /** X_E: the edge spines' kerb, exactly. */
  readonly edgeRegion: readonly Ring[];
  /** The key's canonical text. */
  readonly text: string;
}

/** Two texts in code-unit order. */
function exactByText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** A lattice ring as "x,y x,y …". */
function exactRingText(r: readonly LatticePoint[]): string {
  return r.map((q) => `${String(q.x)},${String(q.y)}`).join(' ');
}

/**
 * Is the vertex i of the ring straight-through on the line from vertex a to vertex b (straightRun's line test, kerb.ts:
 * within HOT_PIXEL_CM of the line a–b, strictly between a and b)?
 */
function exactStraightOn(ring: readonly LatticePoint[], a: number, i: number, b: number): boolean {
  const P = ring[a];
  const Q = ring[i];
  const R = ring[b];
  const dx = R.x - P.x;
  const dy = R.y - P.y;
  const l2 = dx * dx + dy * dy;
  if (!(l2 > 0)) return false;
  const o = orient2d(P.x, P.y, R.x, R.y, Q.x, Q.y);
  if (o * o > HOT_PIXEL_CM * HOT_PIXEL_CM * l2) return false;
  const t = (Q.x - P.x) * dx + (Q.y - P.y) * dy;
  return t > 0 && t < l2;
}

/**
 * THE RING RULE (the module comment, step (5)): the ring without each maximal run v₁ … v_k of consecutive vertices that
 * are straight-through against the kept neighbours u and w AND whose polygon (u, v₁, …, v_k, w) one of the parts holds
 * (`coveredBy`). Walked from the ring's first vertex that cannot go alone (in readFace's canonical order), greedily: from
 * each kept vertex, the farthest next one such that every vertex between them goes; a ring that would keep fewer than three
 * vertices, or whose every vertex could go alone, is kept whole.
 */
function exactRingRule(ring: readonly LatticePoint[], parts: readonly Ring[]): LatticePoint[] {
  const n = ring.length;
  if (n < 4 || parts.length === 0) return ring.slice();
  const goes = (a: number, b: number, span: number): boolean => {
    for (let s = 1; s < span; s += 1) if (!exactStraightOn(ring, a, (a + s) % n, b)) return false;
    const poly: LatticePoint[] = [];
    for (let s = 0; s <= span; s += 1) poly.push(ring[(a + s) % n]);
    return coveredBy(parts, poly);
  };
  let start = -1;
  for (let i = 0; i < n && start < 0; i += 1) if (!goes((i + n - 1) % n, (i + 1) % n, 2)) start = i;
  if (start < 0) return ring.slice();
  const kept: number[] = [start];
  let at = 0;
  while (at < n) {
    let j = at + 1;
    for (let k = at + 2; k <= n; k += 1) {
      if (!goes((start + at) % n, (start + k) % n, k - at)) break;
      j = k;
    }
    if (j < n) kept.push((start + j) % n);
    at = j;
  }
  if (kept.length < 3 || kept.length === n) return ring.slice();
  // in readFace's order from its canonical start
  return kept.sort((a, b) => a - b).map((i) => ring[i]);
}

/**
 * The content of the kerb's key and X_E, in the module comment's evaluation order (1) – (6): readFace; X_E over the edge
 * spines' parts; the reaching `through` spines on X_E; the keyed spines' faithful parts; the ring rule; the text.
 * Refuses only where readFace or bufferParts refuse. Reads the arena only.
 */
export function exactKeyContent(p: Plat, face: FaceId, widths: SpineWidths, vertexContacts = true): KernelResult<ExactKeyContent> {
  return exactKeyContentOfRead(readFace(p, face, widths, new Map(), vertexContacts), vertexContacts);
}

/**
 * exactKeyContent on a face record already read (round S20, line 3): steps (2) – (6) on `f` as given — the served read's
 * own record where the shadow calls it (no second readFace, so the caller's widths callback is not asked again).
 */
export function exactKeyContentOfRead(f: ReturnType<typeof readFace>, vertexContacts: boolean): KernelResult<ExactKeyContent> {
  const partsOf = (s: Spine): KernelResult<Ring[]> => kerbParts(f.rings, new Map([[s.key, s]]), true);
  const edgeKeys = [...f.spines.keys()].sort(exactByText);
  const edgeParts: Ring[] = [];
  const per = new Map<string, Ring[]>();
  for (const k of edgeKeys) {
    const r = partsOf(f.spines.get(k) as Spine);
    if (!r.ok) return err(r.code, r.detail);
    per.set(k, r.value);
    for (const q of r.value) edgeParts.push(q);
  }
  const edgeRegion = exactRegion(f.rings, edgeParts);
  const reaching = f.through.filter((s) => reaches(s, edgeRegion));
  for (const s of reaching) {
    const r = partsOf(s);
    if (!r.ok) return err(r.code, r.detail);
    per.set(s.key, r.value);
  }
  const keys = [...per.keys()].sort(exactByText);
  const spines: KeyedSpine[] = keys.map((k) => ({ key: k, parts: (per.get(k) as Ring[]).map(canonicalRing) }));
  const all: Ring[] = [];
  for (const s of spines) for (const q of s.parts) all.push(q);
  const rings = f.rings.map((r) => exactRingRule(r, all));
  const lines: string[] = [`exact/1 contacts=${vertexContacts ? '1' : '0'}`];
  for (const r of rings) lines.push(`ring ${exactRingText(r)}`);
  for (const s of spines) {
    lines.push(`spine ${s.key}`);
    for (const q of s.parts) lines.push(`part ${exactRingText(q)}`);
  }
  return ok({ vertexContacts, rings, spines, reaching: reaching.map((s) => s.key), edgeRegion, text: lines.join('\n') });
}

/** X from a key's content: exactRegion(the key's rings, the key's parts) — the module comment's step (7). */
export function exactRegionOfKey(c: Pick<ExactKeyContent, 'rings' | 'spines'>): Ring[] {
  const all: Ring[] = [];
  for (const s of c.spines) for (const q of s.parts) all.push(q);
  return exactRegion(c.rings, all);
}

/**
 * The kerb's content key (line 4 of round S18): a canonical text of the flag, F's route rings under the ring rule and, per
 * keyed spine in key order, its key and its parts — equal keys give identical X by construction (X is computed from it).
 * A refusal reads `refused <code> <detail>`.
 */
export function exactKey(p: Plat, face: FaceId, widths: SpineWidths, vertexContacts = true): string {
  const c = exactKeyContent(p, face, widths, vertexContacts);
  return c.ok ? c.value.text : `refused ${c.code} ${c.detail}`;
}

/** §3.7's exact kerb X(F) and its key (the module comment): writes nothing; refuses where readFace or bufferParts refuse. */
export function exactRegionOfFace(p: Plat, face: FaceId, widths: SpineWidths, vertexContacts = true): KernelResult<{ key: string; region: Ring[] }> {
  return exactRegionOfRead(readFace(p, face, widths, new Map(), vertexContacts), vertexContacts);
}

/** X and its key on a face record already read (round S20, line 3): exactRegionOfFace's steps on `f` as given. */
export function exactRegionOfRead(f: ReturnType<typeof readFace>, vertexContacts: boolean): KernelResult<{ key: string; region: Ring[] }> {
  const c = exactKeyContentOfRead(f, vertexContacts);
  if (!c.ok) return err(c.code, c.detail);
  return ok({ key: c.value.text, region: exactRegionOfKey(c.value) });
}


// ---- the shadow: X beside each served read (round S20, line 4) ---------------------------------------------------------

/** What the shadow hands its observer per served read (round S20): the served read, X beside it, and the two times. */
export interface ExactShadowRead {
  /** The arena the read was made on, at the moment its served outcome is fixed (read it; never write it). */
  readonly p: Plat;
  readonly face: FaceId;
  /** The served read's own face record (readFace's, with the caller's cache and flag). */
  readonly f: ReturnType<typeof readFace>;
  readonly vertexContacts: boolean;
  /** The construction's region (KerbRead.region's source) as the read fixed it, its warnings included. */
  readonly construction: KernelResult<Ring[]>;
  /** The splits read on it (KerbRead.kerb and .splits' source); null where the construction refused. */
  readonly sp: KernelResult<{ rings: Ring[]; splits: LatticePoint[][] }> | null;
  /** The served outcome as readKerb returns it: its region and kerb, or its refusal. */
  readonly served: { readonly ok: true; readonly region: readonly Ring[]; readonly rings: readonly Ring[] } | { readonly ok: false; readonly code: string; readonly detail: string };
  /** The spines the construction read with (its census's reaching ones added). */
  readonly spines: ReadonlyMap<string, Spine>;
  /** The census's reaching keys, where the face had vertex-only contacts. */
  readonly reaching: readonly string[] | null;
  readonly faithful: LastRead['faithful'];
  readonly restaged: boolean;
  /** The served read's warning codes, in order. */
  readonly warnings: readonly string[];
  /** X and its key, or X's refusal (a value, never a throw). */
  readonly exact: KernelResult<{ key: string; region: Ring[] }>;
  /** The construction's time (start → done) and X's, in the observer's clock's unit; null without a clock. */
  readonly constructionMs: number | null;
  readonly exactMs: number | null;
}

/** The shadow's observer: the caller's clock (milliseconds; none: no times) and the record sink. */
export interface ExactObserver {
  clock?: () => number;
  read(r: ExactShadowRead): void;
  /** Told of an exception thrown inside X before it propagates out of the read (it is rethrown, never swallowed). */
  failed?(face: FaceId, e: unknown): void;
}

/**
 * Installs (or, with null, removes) the shadow: per served read, X computed beside it on the read's own face record and
 * handed to `o` with the served outcome. Installs only in a debug build, or where `opts.anyBuild` asks (a forced
 * production measurement in a mirror, alone; round 2B removes it or rules its guard before any served path imports this
 * module). Returns whether it installed. Nothing installs it at module evaluation. The shadow writes nothing and serves
 * nothing; an exception inside X or the observer propagates out of the read.
 */
export function setExactShadow(o: ExactObserver | null, opts: { anyBuild?: boolean } = {}): boolean {
  if (o === null) {
    setReadShadow(null);
    return false;
  }
  if (!DEBUG_BUILD && opts.anyBuild !== true) return false;
  const clock = o.clock;
  const starts: (number | null)[] = [];
  const shadow: ReadShadow = {
    start(): void {
      starts.push(clock === undefined ? null : clock());
    },
    done(p, face, f, vertexContacts, read, restaged, sp, last): void {
      const t1 = clock === undefined ? null : clock();
      const t0 = starts.length > 0 ? (starts.pop() as number | null) : null;
      const t2 = clock === undefined ? null : clock();
      let exact: KernelResult<{ key: string; region: Ring[] }>;
      try {
        exact = exactRegionOfRead(f, vertexContacts);
      } catch (e) {
        if (o.failed !== undefined) o.failed(face, e);
        throw e;
      }
      const t3 = clock === undefined ? null : clock();
      const k = read.k;
      const served: ExactShadowRead['served'] = !k.ok
        ? { ok: false, code: k.code, detail: k.detail }
        : sp === null
          ? { ok: false, code: 'E_INVARIANT', detail: 'arr: a read without its splits' }
          : !sp.ok
            ? { ok: false, code: sp.code, detail: sp.detail }
            : { ok: true, region: k.value, rings: sp.value.rings };
      o.read({
        p,
        face,
        f,
        vertexContacts,
        construction: k,
        sp,
        served,
        spines: read.spines,
        reaching: read.census === undefined ? null : read.census.reaching,
        faithful: last.faithful,
        restaged,
        warnings: k.ok ? k.warnings.map((w) => w.code) : [],
        exact,
        constructionMs: t0 === null || t1 === null ? null : t1 - t0,
        exactMs: t2 === null || t3 === null ? null : t3 - t2,
      });
    },
  };
  setReadShadow(shadow);
  return true;
}
