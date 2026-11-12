// THE DEFINITION ORACLE of M0-a-09's hardening round S18 (line 6): §3.7's kerb judged from its definition alone —
// "kerb(F) = F − ⋃ buffer(spineᵢ, half-widthᵢ) … round joins … square ends where declared", with round S15's end rule
// (an end on another chain's line stops flat on the line through the end square to its last segment, unless another
// chain of the same role also ends there; an end on the frame keeps its declared end). Written here from those words and
// from nothing of the code under test: it never calls readFace, readSpine, junctionEnd, reaches, straightRun, spineParts,
// kerbParts, capped, bufferParts or kerbExact.ts — only two constants of the kernel are read (HOT_PIXEL_CM, SAGITTA_CM).
//
// ITS TRUTH is the test's own insertion record (refute-s18-r2 S18R-2): each chain's PLACED points (what insertChain
// placed, read from the arena right after the insertion), the half-width the test gave it (a scalar, or two knots at its
// two ends interpolated by the oracle's own arc length), its declared ends and the junction-ness of each end by the rule
// above, from the test's cut log (`endsOf`; the record follows each insertion: a chain a lane's end split runs through
// that end's placed point). A buffer is the exact set {q : dist(q, route) ≤ hw}, the half-width read where q's NEAREST
// route point lies (`bufferOf`): per segment the strip between its two ends' half-widths, at a vertex the wedge where
// the vertex is the nearest route point (a round join on the convex side), at an open end the half-disc beyond it
// (round), the square beyond it (square) or nothing (a junction's flat end) — no chords, no snap; with one half-width
// throughout it is exactly the points within hw of the route.
//
// F's SPINES: the chains whose placed route carries a route edge of F within HOT_PIXEL_CM (edge spines), and the chains
// that pass a route vertex of F only (vertex-only), kept where their buffer covers a grid sample of F lying in no edge
// spine's buffer; judgement (2) reads every chain incident to F (a vertex contact whose buffer covers no grid sample — a
// junction end's corner poking a few centimetres past the chain it meets — still bounds X there).
//
// THE JUDGEMENT, TWO-SIDED: (1) a 20 cm grid over F: every sample farther than THE MARGIN from every boundary (F's
// rings, each spine's buffer, X's rings) lies in X exactly when it lies in F and in no spine's buffer; (2) no vertex of X
// deeper than the margin in any spine's buffer, and every vertex of X within the margin of F's boundary or of a spine
// buffer's boundary; (3) every ring of X simple (support.ts `simpleRing`), a ring the caller exempts (F's own walk out
// and back along a dangling chain, line 2) judged by the caller's test instead.
//
// THE MARGIN, with its full sum (S18R-13): at an arc, SAGITTA_CM 2 + a part point's snap √2⁄2 + the crossing's rounding
// √2⁄2 = 3.41 cm; on a straight strip, the straight-through drop 2 · HOT_PIXEL_CM (1.42) + √2⁄2 + √2⁄2 = 2.84 cm; taken
// as 4 cm. WHAT IT CANNOT SEE, stated: an error thinner than 8 cm escapes the grid (a sample needs 4 cm clear of every
// boundary on both sides) and is left to (2), the construction relation (line 7) and the literal rings (line 8); a band
// of half-width ≤ 4 cm left out is invisible to (1) and (2) alike — line 8's narrow-band literal (a spine of half-width
// 3 cm) covers it.
import { HOT_PIXEL_CM } from '../../../src/index/index.js';
import { SAGITTA_CM } from '../../../src/arr/buffer.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { simpleRing } from './simple.js';
import { faceWalk, idOf, isFaceLive, outgoing, roleInfo, rowsOn, type FaceId, type Plat } from '../../../src/arena/index.js';

/** The oracle's margin (cm; see the module comment). */
export const MARGIN_CM = 4;

/** The margin's two sums (the module comment), each ≤ MARGIN_CM. */
export const MARGIN_ARC_CM = SAGITTA_CM + Math.SQRT2 / 2 + Math.SQRT2 / 2;
export const MARGIN_STRAIGHT_CM = 2 * HOT_PIXEL_CM + Math.SQRT2 / 2 + Math.SQRT2 / 2;

/** The grid's step (cm). */
export const GRID_CM = 20;

/** A point in doubles. */
export interface XY {
  readonly x: number;
  readonly y: number;
}

/** One chain of the test's record (its truth). */
export interface TruthChain {
  /** `${role}:${entity}` — the chain's label (the key a judgement names). */
  readonly key: string;
  readonly role: string;
  /** Its placed route points in order (the insertion record): its buffer's route. */
  readonly points: readonly XY[];
  /**
   * Its route as the arena holds it after later insertions — the placed points with every later lane's end that split
   * it (a T vertex: it bends nothing and changes no sample, §3.7, so the buffer keeps `points`); the end rule reads it.
   */
  readonly route?: readonly XY[];
  readonly closed: boolean;
  /** Its half-width: a scalar, two knots at its two ends (linear by arc length), or null (no width: no buffer). */
  readonly hw: number | readonly [number, number] | null;
  readonly ends: 'round' | 'square';
  /** Its ends' junction-ness (`endsOf`): a junction end stops flat. */
  readonly junction: readonly [boolean, boolean];
}

/** The distance from q to the segment a–b, and the foot's parameter t ∈ [0, 1]. */
function toSegment(q: XY, a: XY, b: XY): { d: number; t: number } {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / l2));
  return { d: Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy), t };
}

/** The distance from q to a polyline (closed or open). */
function toPolyline(q: XY, pts: readonly XY[], closed: boolean): number {
  let d = Infinity;
  const n = pts.length;
  for (let i = 0; i < (closed ? n : n - 1); i += 1) d = Math.min(d, toSegment(q, pts[i], pts[(i + 1) % n]).d);
  if (n === 1) d = Math.hypot(q.x - pts[0].x, q.y - pts[0].y);
  return d;
}

/** Is q inside the rings (non-zero winding)? */
export function insideRings(rings: readonly (readonly XY[])[], q: XY): boolean {
  let w = 0;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      const side = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
      if (a.y <= q.y) {
        if (b.y > q.y && side > 0) w += 1;
      } else if (b.y <= q.y && side < 0) w -= 1;
    }
  }
  return w !== 0;
}

/** The distance from q to the rings' edges. */
export function toRings(rings: readonly (readonly XY[])[], q: XY): number {
  let d = Infinity;
  for (const r of rings) d = Math.min(d, toPolyline(q, r, true));
  return d;
}

/**
 * The END RULE (round S15's, from the test's record): per chain, per open end, is it a junction end — another chain's
 * line passes through the end point (it lies on that chain's route within HOT_PIXEL_CM, not at one of its own open ends)
 * while no other chain of the same role ends there? An end on the frame (`onFrame`) keeps its declared end.
 */
export function endsOf(chains: readonly Omit<TruthChain, 'junction'>[], onFrame: (q: XY) => boolean): TruthChain[] {
  const near = (a: XY, b: XY): boolean => Math.hypot(a.x - b.x, a.y - b.y) <= HOT_PIXEL_CM;
  const endsAt = (c: Omit<TruthChain, 'junction'>, q: XY): boolean => !c.closed && (near(c.points[0], q) || near(c.points[c.points.length - 1], q));
  const routeOf = (c: Omit<TruthChain, 'junction'>): readonly XY[] => c.route ?? c.points;
  return chains.map((c) => {
    const flag = (q: XY): boolean => {
      if (c.closed || onFrame(q)) return false;
      let passes = false;
      for (const o of chains) {
        if (o === c) continue;
        if (endsAt(o, q)) {
          if (o.role === c.role) return false;
          continue;
        }
        if (toPolyline(q, routeOf(o), o.closed) <= HOT_PIXEL_CM) passes = true;
      }
      return passes;
    };
    const junction: [boolean, boolean] = c.closed ? [false, false] : [flag(c.points[0]), flag(c.points[c.points.length - 1])];
    return { ...c, junction };
  });
}

/**
 * One piece of a buffer: a convex polygon (a strip, a square end), or a SECTOR — the points within r of its centre on the
 * side of each of its half-planes (a round join's wedge on the convex side, a round end's half-disc beyond the end), with
 * its straight sides for the distance to its boundary.
 */
type Piece =
  | { readonly kind: 'poly'; readonly pts: readonly XY[] }
  | { readonly kind: 'sector'; readonly c: XY; readonly r: number; readonly halves: readonly XY[]; readonly sides: readonly (readonly [XY, XY])[] };

/**
 * A chain's buffer as pieces: the set of points whose NEAREST route point s lies within the half-width there,
 * hw(s) — per segment the strip between its two ends' half-widths (the points whose foot falls on it), at a vertex the
 * wedge where the vertex is the nearest route point (the convex side of a join; nothing at a straight vertex), at an open
 * end the half-disc beyond it (round), the square beyond it (square) or nothing (a junction's flat end). With one
 * half-width throughout this is exactly {q : dist(q, route) ≤ hw}. Empty where the chain has no width.
 */
export function bufferOf(c: TruthChain): Piece[] {
  if (c.hw === null) return [];
  const pts = c.points;
  const n = pts.length;
  if (n < 2) return [];
  const segs = c.closed ? n : n - 1;
  // half-widths at the vertices: a scalar, or two knots at the ends linear by arc length
  const hw: number[] = [];
  if (typeof c.hw === 'number') for (let i = 0; i < n; i += 1) hw.push(c.hw);
  else {
    const len: number[] = [0];
    for (let i = 1; i < n; i += 1) len.push(len[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
    const L = len[n - 1];
    const [h0, h1] = c.hw;
    for (let i = 0; i < n; i += 1) hw.push(L === 0 ? h0 : h0 + ((h1 - h0) * len[i]) / L);
  }
  const unit = (a: XY, b: XY): XY | null => {
    const l = Math.hypot(b.x - a.x, b.y - a.y);
    return l === 0 ? null : { x: (b.x - a.x) / l, y: (b.y - a.y) / l };
  };
  const out: Piece[] = [];
  for (let k = 0; k < segs; k += 1) {
    const a = pts[k];
    const b = pts[(k + 1) % n];
    const u = unit(a, b);
    if (u === null) continue;
    const nx = -u.y;
    const ny = u.x;
    const ha = hw[k];
    const hb = hw[(k + 1) % n];
    out.push({ kind: 'poly', pts: [{ x: a.x - nx * ha, y: a.y - ny * ha }, { x: b.x - nx * hb, y: b.y - ny * hb }, { x: b.x + nx * hb, y: b.y + ny * hb }, { x: a.x + nx * ha, y: a.y + ny * ha }] });
  }
  const at = (v: XY, d: XY, r: number): XY => ({ x: v.x + d.x * r, y: v.y + d.y * r });
  for (let i = 0; i < n; i += 1) {
    const v = pts[i];
    const r = hw[i];
    const end = !c.closed && (i === 0 || i === n - 1);
    if (!end) {
      // a join: past the incoming segment's end and before the outgoing one's start
      const u1 = unit(pts[(i + n - 1) % n], v);
      const u2 = unit(v, pts[(i + 1) % n]);
      if (u1 === null || u2 === null) continue;
      const turn = u1.x * u2.y - u1.y * u2.x;
      if (turn === 0 && u1.x * u2.x + u1.y * u2.y > 0) continue;
      const p1 = { x: -u1.y, y: u1.x };
      const n1 = p1.x * u2.x + p1.y * u2.y <= 0 ? p1 : { x: -p1.x, y: -p1.y };
      const p2 = { x: -u2.y, y: u2.x };
      const n2 = p2.x * u1.x + p2.y * u1.y >= 0 ? p2 : { x: -p2.x, y: -p2.y };
      out.push({ kind: 'sector', c: v, r, halves: [u1, { x: -u2.x, y: -u2.y }], sides: [[v, at(v, n1, r)], [v, at(v, n2, r)]] });
      continue;
    }
    const j = i === 0 ? 0 : 1;
    if (c.junction[j]) continue;
    // the end's outward direction
    const w = i === 0 ? unit(pts[1], v) : unit(pts[n - 2], v);
    if (w === null) continue;
    const pp = { x: -w.y, y: w.x };
    if (c.ends === 'round') {
      out.push({ kind: 'sector', c: v, r, halves: [w], sides: [[at(v, pp, r), at(v, pp, -r)]] });
      continue;
    }
    // square: the strip extended by the half-width beyond the end
    out.push({ kind: 'poly', pts: [at(v, pp, -r), { x: v.x + w.x * r - pp.x * r, y: v.y + w.y * r - pp.y * r }, { x: v.x + w.x * r + pp.x * r, y: v.y + w.y * r + pp.y * r }, at(v, pp, r)] });
  }
  return out;
}

/** The signed depth of q in a piece: its distance to the piece's boundary inside (> 0), minus its distance outside. */
function pieceDepth(pc: Piece, q: XY): number {
  if (pc.kind === 'sector') {
    const dx = q.x - pc.c.x;
    const dy = q.y - pc.c.y;
    const rho = Math.hypot(dx, dy);
    const inAngle = pc.halves.every((h) => dx * h.x + dy * h.y >= 0);
    let d = Infinity;
    for (const [a, b] of pc.sides) d = Math.min(d, toSegment(q, a, b).d);
    if (inAngle) d = Math.min(d, Math.abs(pc.r - rho));
    return inAngle && rho <= pc.r ? d : -d;
  }
  const P = pc.pts;
  let pos = 0;
  let neg = 0;
  let d = Infinity;
  for (let i = 0; i < P.length; i += 1) {
    const a = P[i];
    const b = P[(i + 1) % P.length];
    const s = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
    if (s > 0) pos += 1;
    else if (s < 0) neg += 1;
    d = Math.min(d, toSegment(q, a, b).d);
  }
  return pos === 0 || neg === 0 ? d : -d;
}

/**
 * The signed depth of q in a buffer (its pieces): the largest over the pieces — > 0 inside, at least that far from the
 * union's boundary; < 0 outside, exactly its distance from the union.
 */
export function bufferDepth(pieces: readonly Piece[], q: XY): number {
  let d = -Infinity;
  for (const pc of pieces) d = Math.max(d, pieceDepth(pc, q));
  return d;
}

/** F's spines (the module comment): the edge spines, and the vertex-only chains whose buffer covers a sample no edge spine's buffer does. */
export function spinesOf(F: readonly (readonly XY[])[], chains: readonly TruthChain[]): { edge: TruthChain[]; vertex: TruthChain[]; touching: TruthChain[] } {
  const edge: TruthChain[] = [];
  const touching: TruthChain[] = [];
  for (const c of chains) {
    if (c.hw === null) continue;
    let carries = false;
    let touches = false;
    // the route as the arena holds it (its T vertices included): F's route edges are its sub-edges
    const route = c.route ?? c.points;
    for (const r of F) {
      for (let i = 0; i < r.length && !carries; i += 1) {
        const a = r[i];
        const b = r[(i + 1) % r.length];
        const da = toPolyline(a, route, c.closed);
        if (da <= HOT_PIXEL_CM) touches = true;
        if (da <= HOT_PIXEL_CM && toPolyline(b, route, c.closed) <= HOT_PIXEL_CM && toPolyline({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, route, c.closed) <= HOT_PIXEL_CM) carries = true;
      }
    }
    if (carries) edge.push(c);
    else if (touches) touching.push(c);
  }
  if (touching.length === 0) return { edge, vertex: [], touching };
  const eb = edge.map(bufferOf);
  const samples = gridOf(F);
  const vertex = touching.filter((c) => {
    const b = bufferOf(c);
    return samples.some((q) => bufferDepth(b, q) > 0 && eb.every((e) => bufferDepth(e, q) < 0));
  });
  return { edge, vertex, touching };
}

/** The grid samples inside F (every GRID_CM, offset half a step from F's box corner). */
export function gridOf(F: readonly (readonly XY[])[]): XY[] {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const r of F) {
    for (const q of r) {
      x0 = Math.min(x0, q.x);
      y0 = Math.min(y0, q.y);
      x1 = Math.max(x1, q.x);
      y1 = Math.max(y1, q.y);
    }
  }
  const out: XY[] = [];
  for (let y = y0 + GRID_CM / 2; y < y1; y += GRID_CM) for (let x = x0 + GRID_CM / 2; x < x1; x += GRID_CM) if (insideRings(F, { x, y })) out.push({ x, y });
  return out;
}

/** The oracle's verdict on one X. */
export interface Verdict {
  /** (1): samples where X disagrees with the definition. */
  readonly misses: string[];
  /** (2): vertices of X deep in a buffer, or far from every boundary. */
  readonly vertexFaults: string[];
  /** (3): rings of X that are not simple (and not exempted). */
  readonly simplicity: string[];
  /** The samples judged (clear of every boundary) of those taken. */
  readonly judged: number;
  readonly samples: number;
  /** F's spines as the oracle read them. */
  readonly spines: readonly string[];
}

/** Is the verdict clean? */
export function clean(v: Verdict): boolean {
  return v.misses.length === 0 && v.vertexFaults.length === 0 && v.simplicity.length === 0;
}

/**
 * The judgement of X on F (the module comment): `chains` the whole record (with their ends read by `endsOf`); `exempt`
 * names a ring of X judged by the caller's own test (F's walk out and back along a dangling chain) — true where it passes.
 */
export function judge(F: readonly (readonly XY[])[], chains: readonly TruthChain[], X: readonly (readonly LatticePoint[])[], exempt: (ring: readonly LatticePoint[]) => boolean | null = () => null, spines?: { edge: TruthChain[]; vertex: TruthChain[]; touching: TruthChain[] }): Verdict {
  const sp = spines ?? spinesOf(F, chains);
  const all = [...sp.edge, ...sp.vertex];
  const bufs = all.map(bufferOf);
  // (2) reads every chain incident to F — the edge spines and every vertex contact with a width: a vertex contact whose
  // buffer covers no grid sample (a junction end's corner poking a few centimetres into F) still bounds X there
  const near = [...sp.edge, ...sp.touching];
  const nearBufs = near.map(bufferOf);
  const misses: string[] = [];
  const samples = gridOf(F);
  let judged = 0;
  for (const q of samples) {
    if (toRings(F, q) <= MARGIN_CM) continue;
    let depth = -Infinity;
    for (const b of bufs) depth = Math.max(depth, bufferDepth(b, q));
    if (Math.abs(depth) <= MARGIN_CM) continue;
    if (X.length > 0 && toRings(X, q) <= MARGIN_CM) continue;
    judged += 1;
    const want = depth < 0;
    const got = X.length > 0 && insideRings(X, q);
    if (want !== got) misses.push(`(${q.x}, ${q.y}) ${want ? 'kerb' : 'band'} read as ${got ? 'kerb' : 'band'}`);
  }
  const vertexFaults: string[] = [];
  for (const r of X) {
    for (const v of r) {
      let nearBoundary = toRings(F, v) <= MARGIN_CM;
      for (const [i, b] of nearBufs.entries()) {
        const d = bufferDepth(b, v);
        if (d > MARGIN_CM) vertexFaults.push(`(${v.x}, ${v.y}) ${d.toFixed(2)} cm deep in ${near[i].key}`);
        if (Math.abs(d) <= MARGIN_CM) nearBoundary = true;
      }
      if (!nearBoundary) vertexFaults.push(`(${v.x}, ${v.y}) farther than the margin from every boundary`);
    }
  }
  const simplicity: string[] = [];
  for (const r of X) {
    const ex = exempt(r);
    if (ex === null ? !simpleRing(r) : !ex) simplicity.push(r.map((q) => `${q.x},${q.y}`).join(' '));
  }
  return { misses, vertexFaults, simplicity, judged, samples: samples.length, spines: all.map((c) => c.key) };
}

// ---- THE ARENA FORM (M0-a-09 hardening round S20, line 6 (b); S18R-13 (3)) ---------------------------------------------
//
// The truth read from the ARENA, for a read no test recorded (a stage's, at CITY): the chains incident to F's L1 route —
// the (role, entity) chains with a row of level ≤ 1 and ordinal 0 on a route edge of F, or on an edge leaving a route
// vertex of F — each walked from the arena by this module's own walk of its rows (its edges of level ≤ 1 carrying the
// row, joined at their shared vertices; its route vertices — level ≤ 1 — in order), a scalar half-width from the
// caller's widths, its declared ends, and its junction ends by `endsOf` above, the chains through each incident chain's
// end vertices read the same way for the end rule, onFrame := the end vertex lies on the arena's FRAME RING (an edge of
// level 0 carrying a row of the role `margin`, the role every stage lays the frame ring with). Then the oracle's own
// spinesOf and judgement, CAPPED (S18R-10 (2)): each chain's buffer pieces kept where they meet F's box grown by
// MARGIN_CM (a piece is within its half-width of the chain, so the pieces left out are farther than the margin from every
// point of F), bucketed with F's and X's segments on a uniform grid, and the samples per face capped at CAP_SAMPLES (the
// step max(GRID_CM, √(area ⁄ CAP_SAMPLES))). It imports nothing of arr/ beyond the two constants above.
// A face is UNJUDGED — never a pass, never a fault — where: a widths answer is not a scalar ('profile reading'); an
// incident chain's rows do not walk as one run ('not one run'), or walk as one only by passing a vertex twice
// ('retracing route'); the arena has no frame ring ('unreadable frame'); or an incident chain ends on the frame ring
// where another chain's level-1 row runs along the frame through that end ('frame-side end': the end rule the session
// has not ruled — `endsOf` keeps the declared end there, the construction's junction rule makes it flat).

/** The samples per face the arena form judges at most (the step grows above GRID_CM to keep under it). */
export const CAP_SAMPLES = 4000;

/** Why the arena form leaves a face unjudged. */
export type Unjudged = 'profile reading' | 'frame-side end' | 'retracing route' | 'not one run' | 'unreadable frame';

/** A chain as the caller's widths read it (SpineWidths' shape, typed here so this module imports nothing of arr/). */
export type ArenaWidths = (chain: { readonly role: string; readonly entity: string }) => { readonly halfWidthCm: unknown; readonly ends?: 'round' | 'square' } | null | undefined;

/** The arena form's truth for one face. */
export interface ArenaTruth {
  /** F's L1 route rings (outer first), as walked. */
  readonly F: XY[][];
  /** The chains incident to F, with their junction ends. */
  readonly chains: TruthChain[];
  /** The sample step and F's area (cm²). */
  readonly step: number;
  readonly area: number;
}

/** The frame-ring test per arena, cached (the frame ring is written by the first batch and never moved). */
const FRAME = new WeakMap<Plat, boolean>();

/** The rows on the edge of half-edge h. */
function edgeRows(p: Plat, h: number): number[] {
  return rowsOn(p, 'edge', h);
}

/** Has the arena a frame ring (an edge of level 0 with a `margin` row)? */
function hasFrame(p: Plat): boolean {
  const got = FRAME.get(p);
  if (got !== undefined) return got;
  let found = false;
  const H = p.halfEdges;
  for (let e = 0; e < H.level.length && !found; e += 1) {
    const h = 2 * e;
    if (H.origin[h] < 0 || H.level[e] !== 0) continue;
    for (const r of edgeRows(p, h)) if (p.roles.level[r] === 0 && roleInfo(p.roles.kind[r]).name === 'margin') found = true;
  }
  FRAME.set(p, found);
  return found;
}

/** Is the vertex on the frame ring (an outgoing edge of level 0 with a `margin` row)? */
function onFrameRing(p: Plat, v: number): boolean {
  for (const g of outgoing(p, v)) {
    if (p.halfEdges.level[g >> 1] !== 0) continue;
    for (const r of edgeRows(p, g)) if (roleInfo(p.roles.kind[r]).name === 'margin') return true;
  }
  return false;
}

/** The chain rows (level ≤ 1, ordinal 0) on the edge of half-edge h, keyed `${role}:${entity}`. */
function chainKeysOn(p: Plat, h: number): Map<string, { kind: number; entity: number }> {
  const out = new Map<string, { kind: number; entity: number }>();
  for (const r of edgeRows(p, h)) {
    if (p.roles.level[r] > 1 || p.roles.ordinal[r] !== 0) continue;
    const name = roleInfo(p.roles.kind[r]).name;
    if (name === 'margin') continue;
    out.set(`${name}:${idOf(p, p.roles.entity[r])}`, { kind: p.roles.kind[r], entity: p.roles.entity[r] });
  }
  return out;
}

/** One chain walked from the arena: its route vertices in order and closedness, or why it does not walk as one run. */
function walkChain(p: Plat, key: string, seed: number): { ok: true; verts: number[]; closed: boolean } | { ok: false; why: Unjudged } {
  const O = p.halfEdges.origin;
  const adj = new Map<number, number[]>();
  const seen = new Set<number>();
  const stack = [seed >> 1];
  while (stack.length > 0) {
    const e = stack.pop() as number;
    if (seen.has(e)) continue;
    seen.add(e);
    const a = O[2 * e];
    const b = O[2 * e + 1];
    for (const [u, w] of [[a, b], [b, a]]) {
      if (!adj.has(u)) adj.set(u, []);
      (adj.get(u) as number[]).push(w);
    }
    for (const v of [a, b]) {
      for (const g of outgoing(p, v)) {
        if (p.halfEdges.level[g >> 1] > 1 || seen.has(g >> 1)) continue;
        if (chainKeysOn(p, g).has(key)) stack.push(g >> 1);
      }
    }
  }
  const odd = [...adj.entries()].filter(([, ns]) => ns.length % 2 === 1).map(([v]) => v);
  const branch = [...adj.values()].some((ns) => ns.length > 2);
  if (odd.length !== 0 && odd.length !== 2) return { ok: false, why: 'not one run' };
  if (branch) return { ok: false, why: 'retracing route' };
  // a path from its lower-keyed end (or, closed, from its lowest-leftmost vertex): every edge once
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const closed = odd.length === 0;
  const ends = closed ? [...adj.keys()] : odd;
  let start = ends[0];
  for (const v of ends) if (Y[v] < Y[start] || (Y[v] === Y[start] && X[v] < X[start])) start = v;
  const order: number[] = [start];
  let prev = -1;
  let at = start;
  for (let k = 0; k < seen.size; k += 1) {
    const ns = (adj.get(at) as number[]).filter((w) => w !== prev);
    if (ns.length === 0) break;
    let next = ns[0];
    if (closed && k === 0) for (const w of ns) if (Y[w] < Y[next] || (Y[w] === Y[next] && X[w] < X[next])) next = w;
    if (next === start) break;
    order.push(next);
    prev = at;
    at = next;
  }
  if (order.length !== adj.size) return { ok: false, why: 'not one run' };
  const L = p.vertices.level;
  const verts = order.filter((v) => L[v] <= 1);
  return { ok: true, verts, closed };
}

/**
 * THE ARENA FORM's truth of F (the comment above): F's L1 route rings, the chains incident to F walked from the arena
 * with their widths and ends, the end rule's chains through their ends, and the sample step — or why F is unjudged.
 */
export function truthOfFace(p: Plat, face: FaceId, widths: ArenaWidths): { ok: true; value: ArenaTruth } | { ok: false; unjudged: Unjudged; detail: string } {
  if (!isFaceLive(p, 1, face)) return { ok: false, unjudged: 'not one run', detail: `face ${String(face)} is not a live L1 face` };
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const xy = (v: number): XY => ({ x: X[v], y: Y[v] });
  const F: XY[][] = [];
  const incident = new Map<string, number>();
  const own = new Set<number>();
  const routeVerts: number[] = [];
  for (const walk of faceWalk(p, 1, face)) {
    const ring: XY[] = [];
    for (const h of walk) {
      own.add(h >> 1);
      const v = O[h];
      if (L[v] <= 1) {
        ring.push(xy(v));
        routeVerts.push(v);
      }
      for (const [k] of chainKeysOn(p, h)) if (!incident.has(k)) incident.set(k, h);
    }
    F.push(ring);
  }
  for (const v of routeVerts) {
    for (const g of outgoing(p, v)) {
      if (p.halfEdges.level[g >> 1] > 1 || own.has(g >> 1)) continue;
      for (const [k] of chainKeysOn(p, g)) if (!incident.has(k)) incident.set(k, g);
    }
  }
  if (!hasFrame(p)) return { ok: false, unjudged: 'unreadable frame', detail: 'the arena has no frame ring (no level-0 margin row)' };
  const walked = new Map<string, { verts: number[]; closed: boolean }>();
  const walkOf = (k: string, seed: number): { ok: true; verts: number[]; closed: boolean } | { ok: false; why: Unjudged } => {
    const got = walked.get(k);
    if (got !== undefined) return { ok: true, ...got };
    const w = walkChain(p, k, seed);
    if (w.ok) walked.set(k, { verts: w.verts, closed: w.closed });
    return w;
  };
  const chains: Omit<TruthChain, 'junction'>[] = [];
  const frameAt = new Map<string, boolean>();
  const context = new Map<string, number>();
  for (const k of [...incident.keys()].sort()) {
    const w = walkOf(k, incident.get(k) as number);
    if (!w.ok) return { ok: false, unjudged: w.why, detail: `${k}: its rows ${w.why === 'not one run' ? 'do not walk as one run' : 'pass a vertex twice'}` };
    const sep = k.indexOf(':');
    const role = k.slice(0, sep);
    const entity = k.slice(sep + 1);
    const ans = widths({ role, entity });
    let hw: number | null = null;
    if (ans !== null && ans !== undefined) {
      if (typeof ans.halfWidthCm !== 'number') return { ok: false, unjudged: 'profile reading', detail: `${k}: its widths answer is a profile` };
      hw = ans.halfWidthCm > 0 ? ans.halfWidthCm : null;
    }
    const pts = w.verts.map(xy);
    chains.push({ key: k, role, points: pts, route: pts, closed: w.closed, hw, ends: ans?.ends ?? 'round' });
    if (!w.closed) {
      for (const v of [w.verts[0], w.verts[w.verts.length - 1]]) {
        const fr = onFrameRing(p, v);
        frameAt.set(`${String(X[v])},${String(Y[v])}`, fr);
        for (const g of outgoing(p, v)) {
          if (p.halfEdges.level[g >> 1] > 1) continue;
          const on = chainKeysOn(p, g);
          for (const [k2] of on) {
            if (k2 === k) continue;
            // THE FRAME-SIDE END: another chain's level-1 row runs along the frame through this end
            if (fr && p.halfEdges.level[g >> 1] === 0 && edgeRows(p, g).some((r) => roleInfo(p.roles.kind[r]).name === 'margin')) return { ok: false, unjudged: 'frame-side end', detail: `${k}: its end (${String(X[v])}, ${String(Y[v])}) on the frame, ${k2} along the frame through it` };
            if (!incident.has(k2) && !context.has(k2)) context.set(k2, g);
          }
        }
      }
    }
  }
  const ctx: Omit<TruthChain, 'junction'>[] = [];
  for (const k of [...context.keys()].sort()) {
    const w = walkOf(k, context.get(k) as number);
    if (!w.ok) continue;
    const sep = k.indexOf(':');
    const pts = w.verts.map(xy);
    ctx.push({ key: k, role: k.slice(0, sep), points: pts, route: pts, closed: w.closed, hw: null, ends: 'round' });
  }
  const all = endsOf([...chains, ...ctx], (q) => frameAt.get(`${String(q.x)},${String(q.y)}`) ?? false);
  const truth = all.slice(0, chains.length);
  let area = 0;
  for (const r of F) for (let i = 0; i < r.length; i += 1) area += r[i].x * r[(i + 1) % r.length].y - r[(i + 1) % r.length].x * r[i].y;
  area = Math.abs(area) / 2;
  return { ok: true, value: { F, chains: truth, step: Math.max(GRID_CM, Math.sqrt(area / CAP_SAMPLES)), area } };
}

/** A uniform grid of boxes: the items whose box lies within r of a point. */
class Buckets<T> {
  private readonly cells = new Map<number, T[]>();
  constructor(private readonly cell: number) {}
  private key(i: number, j: number): number {
    return (i + 1_048_576) * 2_097_152 + (j + 1_048_576);
  }
  add(item: T, x0: number, y0: number, x1: number, y1: number): void {
    const c = this.cell;
    for (let i = Math.floor(x0 / c); i <= Math.floor(x1 / c); i += 1) {
      for (let j = Math.floor(y0 / c); j <= Math.floor(y1 / c); j += 1) {
        const k = this.key(i, j);
        const got = this.cells.get(k);
        if (got === undefined) this.cells.set(k, [item]);
        else got.push(item);
      }
    }
  }
  near(q: XY, r: number): T[] {
    const c = this.cell;
    const i0 = Math.floor((q.x - r) / c);
    const i1 = Math.floor((q.x + r) / c);
    const j0 = Math.floor((q.y - r) / c);
    const j1 = Math.floor((q.y + r) / c);
    if (i0 === i1 && j0 === j1) return this.cells.get(this.key(i0, j0)) ?? [];
    const out = new Set<T>();
    for (let i = i0; i <= i1; i += 1) for (let j = j0; j <= j1; j += 1) for (const it of this.cells.get(this.key(i, j)) ?? []) out.add(it);
    return [...out];
  }
}

/** A piece's box. */
function pieceBox(pc: Piece): [number, number, number, number] {
  const pts = pc.kind === 'poly' ? pc.pts : [{ x: pc.c.x - pc.r, y: pc.c.y - pc.r }, { x: pc.c.x + pc.r, y: pc.c.y + pc.r }];
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const q of pts) {
    x0 = Math.min(x0, q.x);
    y0 = Math.min(y0, q.y);
    x1 = Math.max(x1, q.x);
    y1 = Math.max(y1, q.y);
  }
  return [x0, y0, x1, y1];
}

/** The rings' box. */
function ringsBox(rs: readonly (readonly XY[])[]): [number, number, number, number] {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const r of rs) {
    for (const q of r) {
      x0 = Math.min(x0, q.x);
      y0 = Math.min(y0, q.y);
      x1 = Math.max(x1, q.x);
      y1 = Math.max(y1, q.y);
    }
  }
  return [x0, y0, x1, y1];
}

/** A chain's buffer, clipped to the box (its pieces that meet it) and bucketed: signed depths within `R` of a point. */
class NearBuffer {
  private readonly b: Buckets<Piece>;
  readonly pieces: Piece[];
  constructor(c: TruthChain, box: readonly [number, number, number, number], cell: number) {
    this.b = new Buckets<Piece>(cell);
    this.pieces = [];
    for (const pc of bufferOf(c)) {
      const [x0, y0, x1, y1] = pieceBox(pc);
      if (x1 < box[0] || x0 > box[2] || y1 < box[1] || y0 > box[3]) continue;
      this.pieces.push(pc);
      this.b.add(pc, x0, y0, x1, y1);
    }
  }
  /** bufferDepth over the pieces whose box lies within R of q; −R where none does (q farther than R from the buffer). */
  depth(q: XY, R: number): number {
    let d = -R;
    for (const pc of this.b.near(q, R)) d = Math.max(d, pieceDepth(pc, q));
    return d;
  }
}

/** Ring segments bucketed: the distance to the rings within R of a point (R where none is nearer). */
class NearRings {
  private readonly b: Buckets<readonly [XY, XY]>;
  constructor(rs: readonly (readonly XY[])[], cell: number) {
    this.b = new Buckets(cell);
    for (const r of rs) {
      for (let i = 0; i < r.length; i += 1) {
        const a = r[i];
        const c = r[(i + 1) % r.length];
        this.b.add([a, c], Math.min(a.x, c.x), Math.min(a.y, c.y), Math.max(a.x, c.x), Math.max(a.y, c.y));
      }
    }
  }
  dist(q: XY, R: number): number {
    let d = R;
    for (const [a, c] of this.b.near(q, R)) d = Math.min(d, toSegment(q, a, c).d);
    return d;
  }
}

/** The grid samples inside F at `step` (gridOf's at GRID_CM). */
export function gridOfStep(F: readonly (readonly XY[])[], step: number): XY[] {
  const [x0, y0, x1, y1] = ringsBox(F);
  const out: XY[] = [];
  for (let y = y0 + step / 2; y < y1; y += step) for (let x = x0 + step / 2; x < x1; x += step) if (insideRings(F, { x, y })) out.push({ x, y });
  return out;
}

/**
 * The arena form's reading of the truth at a face's `step` (judgeCapped's and truthAtOf's one reading): spinesOf's rules
 * (edge spines, touching, vertex-only kept by a sample no edge spine's buffer covers) over the samples at `step`, each
 * chain's buffer clipped to F's box grown by MARGIN_CM + 1 and bucketed, F's segments bucketed.
 */
function cappedTruth(F: readonly (readonly XY[])[], chains: readonly TruthChain[], step: number): { R: number; cell: number; samples: XY[]; edge: TruthChain[]; touching: TruthChain[]; all: TruthChain[]; near: TruthChain[]; bufOf: (c: TruthChain) => NearBuffer; fRings: NearRings } {
  const [bx0, by0, bx1, by1] = ringsBox(F);
  const R = MARGIN_CM + 1;
  const box = [bx0 - R, by0 - R, bx1 + R, by1 + R] as const;
  const cell = Math.max(50, step * 2);
  const samples = gridOfStep(F, step);
  // spinesOf's rules (edge spines, touching, vertex-only kept by a sample no edge spine's buffer covers)
  const edge: TruthChain[] = [];
  const touching: TruthChain[] = [];
  for (const c of chains) {
    if (c.hw === null) continue;
    let carries = false;
    let touches = false;
    const route = c.route ?? c.points;
    for (const r of F) {
      for (let i = 0; i < r.length && !carries; i += 1) {
        const a = r[i];
        const b = r[(i + 1) % r.length];
        const da = toPolyline(a, route, c.closed);
        if (da <= HOT_PIXEL_CM) touches = true;
        if (da <= HOT_PIXEL_CM && toPolyline(b, route, c.closed) <= HOT_PIXEL_CM && toPolyline({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, route, c.closed) <= HOT_PIXEL_CM) carries = true;
      }
    }
    if (carries) edge.push(c);
    else if (touches) touching.push(c);
  }
  const nb = new Map<TruthChain, NearBuffer>();
  const bufOf = (c: TruthChain): NearBuffer => {
    let b = nb.get(c);
    if (b === undefined) {
      b = new NearBuffer(c, box, cell);
      nb.set(c, b);
    }
    return b;
  };
  const vertex = touching.filter((c) => samples.some((q) => bufOf(c).depth(q, R) > 0 && edge.every((e) => bufOf(e).depth(q, R) < 0)));
  return { R, cell, samples, edge, touching, all: [...edge, ...vertex], near: [...edge, ...touching], bufOf, fRings: new NearRings(F, cell) };
}

/**
 * spinesOf and judge, CAPPED (the arena form; the comment above): the same rules at the face's `step`, each chain's
 * buffer clipped to F's box grown by MARGIN_CM and every distance read from bucketed pieces and segments.
 */
export function judgeCapped(F: readonly (readonly XY[])[], chains: readonly TruthChain[], X: readonly (readonly LatticePoint[])[], step: number, exempt: (ring: readonly LatticePoint[]) => boolean | null = () => null): Verdict & { readonly step: number } {
  const { R, cell, samples, all, near, bufOf, fRings } = cappedTruth(F, chains, step);
  const reach = (_c: TruthChain): number => R;
  const xRings = new NearRings(X, cell);
  const misses: string[] = [];
  let judged = 0;
  for (const q of samples) {
    if (fRings.dist(q, R) <= MARGIN_CM) continue;
    let depth = -Infinity;
    for (const c of all) depth = Math.max(depth, bufOf(c).depth(q, reach(c)));
    if (Math.abs(depth) <= MARGIN_CM) continue;
    if (X.length > 0 && xRings.dist(q, R) <= MARGIN_CM) continue;
    judged += 1;
    const want = depth < 0;
    const got = X.length > 0 && insideRings(X, q);
    if (want !== got) misses.push(`(${q.x}, ${q.y}) ${want ? 'kerb' : 'band'} read as ${got ? 'kerb' : 'band'}`);
  }
  const vertexFaults: string[] = [];
  for (const r of X) {
    for (const v of r) {
      let nearBoundary = fRings.dist(v, R) <= MARGIN_CM;
      for (const c of near) {
        const d = bufOf(c).depth(v, reach(c));
        if (d > MARGIN_CM) vertexFaults.push(`(${v.x}, ${v.y}) ${d.toFixed(2)} cm deep in ${c.key}`);
        if (Math.abs(d) <= MARGIN_CM) nearBoundary = true;
      }
      if (!nearBoundary) vertexFaults.push(`(${v.x}, ${v.y}) farther than the margin from every boundary`);
    }
  }
  const simplicity: string[] = [];
  for (const r of X) {
    const ex = exempt(r);
    if (ex === null ? !simpleRing(r) : !ex) simplicity.push(r.map((q) => `${q.x},${q.y}`).join(' '));
  }
  return { misses, vertexFaults, simplicity, judged, samples: samples.length, spines: all.map((c) => c.key), step };
}

/** The truth at one point (J785 (2) (b)): in the region, out of it, or within MARGIN_CM of the truth's own boundary. */
export type PointTruth = 'in' | 'out' | 'undecided';

/**
 * THE TRUTH AT A POINT (the session's ruling J785 (2) (b), the local arbitration's): the arena form's truth — its chains
 * (truthOfFace's), its spines (spinesOf's rules at the face's step, as judgeCapped reads them), the oracle's buffer depth
 * (its pieces, clipped and bucketed) and its insideRings on F's route rings — says IN (inside F and in no spine's
 * buffer) or OUT; a point within MARGIN_CM of F's rings, or whose depth in the nearest buffer is within MARGIN_CM of 0,
 * is UNDECIDED. spinesOf's vertex rule is read at the point too: a chain touching F whose buffer covers the point, where no
 * edge spine's does, is a vertex spine by that rule (the point is a point of F) even where the capped grid — a step of
 * √(area ⁄ CAP_SAMPLES), up to metres at CITY — has no sample in its poke (round S20's trial at fusion 1: way 4's band
 * beside a round end, missed by a 194 cm grid, read as kerb at four reads' witnesses until this rule was read here).
 */
export function truthAtOf(F: readonly (readonly XY[])[], chains: readonly TruthChain[], step: number): (q: XY) => PointTruth {
  const { R, edge, touching, all, bufOf, fRings } = cappedTruth(F, chains, step);
  const rest = touching.filter((c) => !all.includes(c));
  return (q) => {
    if (fRings.dist(q, R) <= MARGIN_CM) return 'undecided';
    let depth = -Infinity;
    for (const c of all) depth = Math.max(depth, bufOf(c).depth(q, R));
    for (const c of rest) {
      const d = bufOf(c).depth(q, R);
      if (d > 0 && edge.every((e) => bufOf(e).depth(q, R) < 0)) depth = Math.max(depth, d);
    }
    if (Math.abs(depth) <= MARGIN_CM) return 'undecided';
    return insideRings(F, q) && depth < 0 ? 'in' : 'out';
  };
}
