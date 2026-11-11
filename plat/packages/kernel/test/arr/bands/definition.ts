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
import { simpleRing } from './support.js';

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
