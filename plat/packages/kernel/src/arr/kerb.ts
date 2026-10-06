// kerb(face) (§3.7 *The kerb, defined once* (GEO-20); §3.4 `kerb`; §2.2 rule 5 — profiles sampled per segment end).
// M0-a-09.
//
// §3.7: "For an L1 face F, `kerb(F) = F − ⋃ buffer(spineᵢ, half-widthᵢ)` over F's bounding spines, each half-width
// sampled from the width the spine's linear entity declares … with round joins on the union's convex side and square
// ends where declared; the union's concave corners — the block corners at junctions — are sharp by construction. A face
// with no bounding spine … has `kerb(F) = F`." And: "`kerb` is also a read-only service on the faces of an open
// transaction's overlay", the one function S8 plans on and `corridorUnion` commits (the contract S8 ≡ S9, §4.6).
//
// The construction: F's rings on its L1 route (§2.2 rule 3: every level-1 reader reads the level-1 route, so a finer
// Steiner vertex on a spine changes nothing); its bounding spines — every (role, entity) chain on a route edge of F's
// boundary for which the caller's width declaration gives a positive half-width; each spine's whole own-level route
// (`routeLines`) with its half-width sampled at every route vertex — a scalar, or the knot profile interpolated by arc
// length (`knotLines` / `cutKnot`, M0-a-06), so a vertex that carries no knot (an S8 T-junction) changes no sample — and
// the strips of the route's segments near F (each the trapezoid between its two ends' half-widths), its joins `round`
// (round on the convex side; the concave side is the strips' sharp intersection) and its two ends as the chain
// declares them (`round` unless declared `square`) — M0-a-08's `bufferParts`, every part counter-clockwise; then one
// overlay on the scratch arrangement: F's rings one operand, every part the other, kept where F is inside and no part
// is (`offsetFace`'s construction). The result passes the insertion rules like every arrangement output.
//
// Readings (C-0212): (1) the kernel holds no entity record (§14), so the half-width a spine's linear entity declares
// reaches `kerb` through the caller's `SpineWidths` — the spine's half-width (a way's width profile halved, a tunnel's
// `widthCm ÷ 2 + wallCm`, J-A12.31) and its declared ends — and `kerb(tx, face, widths)` takes the open transaction first
// as `offsetFace` does (the façade, M0-a-16, binds the design's one-argument form); (2) a spine is buffered over its whole
// own-level route, read near F only: a segment whose box lies farther from F's box than twice its larger half-width plus
// the sagitta and 4 cm adds nothing (no part of it, its joins or its ends can reach F), so the result is the one the
// whole chain gives — a ring way's route is buffered once round, every vertex a join and no end cap; (3) a face whose
// kerb is empty — wholly within its bands — gives `ok([])`, no refusal (it holds no built block; §3.11's `empty`
// refusal is the booleans' and buffers'); (4) a spine-less face gives its own L1 route rings, outer ring first
// (counter-clockwise from its lowest-leftmost vertex), then the holes in that vertex order.
import { faceWalk, idOf, isFaceLive, outgoing, roleInfo, rowsOn, type FaceId, type HalfEdgeId, type Plat, type VertexId } from '../arena/index.js';
import type { InsertTx } from '../insert/classes.js';
import { area2, err, LATTICE, ok, orient2d, ratio, snap, type KernelResult, type Warning } from '../num/index.js';
import { cutKnot, knotLines, routeLines } from '../tx/profile.js';
import { check } from '../tx/state.js';
import type { ChainProfile, ChainRef, Cm, LatticePoint } from '../types/index.js';
import { bufferParts, SAGITTA_CM } from './buffer.js';
import { canonicalRing, compareRings, overlayRegion, type Ring } from './winding.js';

/** A spine's declared ends (§3.7: round joins, "square ends where declared"). */
export type SpineEnd = 'round' | 'square';

/**
 * What a spine's linear entity declares (§3.7): its half-width — a scalar in centimetres, or a knot profile of
 * half-widths on the entity's own chain (§2.2 rule 5; its knots the entity's knot rows) — and its ends.
 */
export interface SpineWidth {
  readonly halfWidthCm: Cm | number | ChainProfile<number>;
  readonly ends?: SpineEnd;
}

/**
 * The caller's width declarations (C-0212 (1)): for a chain on a face's boundary, its half-width, or null where the
 * chain declares none (a shore, the border, a setback line, a district boundary).
 */
export type SpineWidths = (chain: ChainRef) => SpineWidth | null | undefined;

/** One buffered spine: its chain, its row key, its declared ends and its own-level route with the sampled half-widths. */
export interface Spine {
  /** `${role id}:${entity handle}` — the key a boundary edge's row is matched by. */
  readonly key: string;
  readonly chain: ChainRef;
  readonly ends: SpineEnd;
  /** Per run of the chain's own-level route: its points, the half-width at each and whether the run is a ring. */
  readonly lines: readonly { readonly points: LatticePoint[]; readonly hw: number[]; readonly closed: boolean }[];
  /** The half-width at each route vertex of the chain. */
  readonly hwAt: ReadonlyMap<VertexId, number>;
}

/** One route edge of a face's L1 boundary, the face on its left: its two route vertices and its buffered spines. */
export interface RouteEdge {
  readonly a: VertexId;
  readonly b: VertexId;
  /** The first half-edge of the walk along it (its sub-edges share its rows). */
  readonly h: HalfEdgeId;
  /** The keys of the buffered spines it carries. */
  readonly spines: readonly string[];
}

/** A face read for its kerb: its L1 route rings and edges, its spines, the kerb and the overlay's warnings. */
export interface KerbRead {
  readonly face: FaceId;
  /** The route rings, the face on their left (outer ring first), in walk order. */
  readonly rings: LatticePoint[][];
  /** Per route ring, its route edges in walk order. */
  readonly edges: RouteEdge[][];
  /** The buffered spines by key. */
  readonly spines: ReadonlyMap<string, Spine>;
  /** kerb(F): outer rings counter-clockwise, holes clockwise; every junction's split end a vertex of it (C-0212 (5)). */
  readonly kerb: Ring[];
  /** The corridor_split chains at the face's junctions, in walk order (bandUnion.ts's module comment). */
  readonly splits: LatticePoint[][];
  readonly warnings: Warning[];
}

/** Two texts in code-unit order (a total order on the spine keys; never a slot order). */
function byText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** The key a row is matched by. */
function rowKeyOf(role: number, handle: number): string {
  return `${String(role)}:${String(handle)}`;
}

/** A spine's half-width at every route vertex (a scalar, or the profile by arc length); null where it buffers nothing. */
function readSpine(p: Plat, key: string, chain: ChainRef, w: SpineWidth): Spine | null {
  const lines = routeLines(p, chain, p.key);
  if (lines.length === 0) return null;
  const hw = w.halfWidthCm;
  const ends: SpineEnd = w.ends ?? 'round';
  check(ends === 'round' || ends === 'square', `kerb: a spine's ends are round or square, got ${String(ends)}`);
  let per: number[][];
  if (typeof hw === 'number') {
    check(hw >= 0 && hw < Infinity, `kerb: a half-width is a finite number ≥ 0, got ${String(hw)}`);
    per = lines.map((ln) => ln.vertices.map(() => hw));
  } else {
    check(hw.interp === 'linear' || hw.interp === 'step', 'kerb: a half-width profile interpolates linear or step');
    for (const v of hw.values) check(typeof v === 'number' && v >= 0 && v < Infinity, 'kerb: a half-width profile holds finite numbers ≥ 0');
    const kl = knotLines(p, hw, chain.entity, lines);
    per = lines.map((ln, run) => {
      check(kl[run].knots.length > 0, `kerb: a run of (${chain.role}, ${chain.entity}) carries no knot of its half-width profile`);
      return ln.pos.map((s) => cutKnot(kl[run], s) as number);
    });
  }
  if (per.every((ws) => ws.every((x) => x === 0))) return null;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const hwAt = new Map<VertexId, number>();
  const out = lines.map((ln, run) => {
    ln.vertices.forEach((v, i) => hwAt.set(v, per[run][i]));
    return { points: ln.vertices.map((v) => ({ x: X[v] as Cm, y: Y[v] as Cm })), hw: per[run], closed: ln.closed };
  });
  return { key, chain, ends, lines: out, hwAt };
}

/**
 * The face's L1 route rings and edges and its buffered spines (see the module comment). `widths` is asked once per
 * (role, entity) of level ≤ 1 on the face's boundary; `cache` keeps the answers across the faces of one call.
 */
export function readFace(p: Plat, face: FaceId, widths: SpineWidths, cache: Map<string, Spine | null> = new Map()): { rings: LatticePoint[][]; edges: RouteEdge[][]; spines: Map<string, Spine> } {
  check(isFaceLive(p, 1, face), `kerb: face ${String(face)} is not a live L1 face (§3.7: kerb reads an L1 face)`);
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const R = p.roles;
  const spines = new Map<string, Spine>();
  const rings: LatticePoint[][] = [];
  const edges: RouteEdge[][] = [];
  for (const walk of faceWalk(p, 1, face)) {
    const at: number[] = [];
    for (let i = 0; i < walk.length; i += 1) if (L[O[walk[i]]] <= 1) at.push(i);
    check(at.length >= 2, 'kerb: an L1 ring has at least two route vertices');
    const ring: LatticePoint[] = [];
    const es: RouteEdge[] = [];
    for (let j = 0; j < at.length; j += 1) {
      const h = walk[at[j]];
      const a = O[h];
      const b = O[walk[at[(j + 1) % at.length]]];
      ring.push({ x: X[a] as Cm, y: Y[a] as Cm });
      const keys: string[] = [];
      for (const r of rowsOn(p, 'edge', h)) {
        if (R.level[r] > 1 || R.ordinal[r] !== 0) continue;
        const key = rowKeyOf(R.kind[r], R.entity[r]);
        let s = cache.get(key);
        if (s === undefined) {
          const chain: ChainRef = { role: roleInfo(R.kind[r]).name, entity: idOf(p, R.entity[r]) };
          const w = widths(chain);
          s = w === null || w === undefined ? null : readSpine(p, key, chain, w);
          cache.set(key, s);
        }
        if (s === null) continue;
        spines.set(key, s);
        if (!keys.includes(key)) keys.push(key);
      }
      es.push({ a, b, h, spines: keys.sort(byText) });
    }
    rings.push(ring);
    edges.push(es);
  }
  return { rings, edges, spines };
}

/** The box of rings. */
function boxOf(rings: readonly (readonly LatticePoint[])[]): { x0: number; y0: number; x1: number; y1: number } {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const r of rings) {
    for (const q of r) {
      if (q.x < x0) x0 = q.x;
      if (q.y < y0) y0 = q.y;
      if (q.x > x1) x1 = q.x;
      if (q.y > y1) y1 = q.y;
    }
  }
  return { x0, y0, x1, y1 };
}

/**
 * Every part of a spine's buffer that can reach the box (C-0212 (2)): the segments of each run whose box lies within
 * reach of it, in maximal runs of consecutive segments, each run buffered with round joins and the spine's ends.
 */
function spineParts(s: Spine, box: { x0: number; y0: number; x1: number; y1: number }): KernelResult<Ring[]> {
  const out: Ring[] = [];
  for (const line of s.lines) {
    const n = line.points.length;
    const segs = line.closed ? n : n - 1;
    if (segs < 1) continue;
    const keep: boolean[] = [];
    for (let k = 0; k < segs; k += 1) {
      const a = line.points[k];
      const b = line.points[(k + 1) % n];
      const reach = 2 * Math.max(line.hw[k], line.hw[(k + 1) % n]) + SAGITTA_CM + 4;
      keep.push(
        Math.max(a.x, b.x) >= box.x0 - reach && Math.min(a.x, b.x) <= box.x1 + reach && Math.max(a.y, b.y) >= box.y0 - reach && Math.min(a.y, b.y) <= box.y1 + reach,
      );
    }
    const runs: number[][] = [];
    let whole = false;
    if (line.closed && keep.every(Boolean)) {
      // a ring: once round and on over its first segment again, with flat ends — every vertex a join, no end cap
      // (its first segment's strip is one part twice, which the overlay enters once)
      runs.push([...Array.from({ length: n }, (_, i) => i), 0, n > 1 ? 1 : 0]);
      whole = true;
    } else {
      // From a segment that is not kept (a ring), or from the first (an open run): maximal runs of kept segments.
      const start = line.closed ? (keep.indexOf(false) + 1) % segs : 0;
      let cur: number[] | null = null;
      for (let j = 0; j < segs; j += 1) {
        const k = (start + j) % segs;
        if (keep[k]) {
          if (cur === null) cur = [k];
          cur.push((k + 1) % n);
        } else if (cur !== null) {
          runs.push(cur);
          cur = null;
        }
      }
      if (cur !== null) runs.push(cur);
    }
    for (const idx of runs) {
      const pts = idx.map((i) => line.points[i]);
      const ws = idx.map((i) => line.hw[i]);
      const parts = bufferParts([pts], ws, 'round', whole ? 'flat' : line.closed ? 'round' : s.ends);
      if (!parts.ok) return parts;
      for (const q of parts.value) out.push(q);
    }
  }
  return ok(out);
}

/** kerb(F) from a face's reading (see the module comment). */
export function kerbOf(rings: readonly LatticePoint[][], spines: ReadonlyMap<string, Spine>): KernelResult<Ring[]> {
  if (spines.size === 0) {
    const outer = canonicalRing(rings[0]);
    const holes = rings.slice(1).map(canonicalRing).sort(compareRings);
    return ok([outer, ...holes]);
  }
  const box = boxOf(rings);
  const parts: Ring[] = [];
  const keys = [...spines.keys()].sort(byText);
  for (const k of keys) {
    const r = spineParts(spines.get(k) as Spine, box);
    if (!r.ok) return r;
    for (const q of r.value) parts.push(q);
  }
  if (parts.length === 0) return kerbOf(rings, new Map());
  const r = overlayRegion([rings, parts], (w) => w[0] !== 0 && w[1] === 0);
  if (!r.ok) return r;
  return ok(r.value.map(unspiked).filter((q) => q.length >= 3 && area2(q) !== 0).sort(compareRings), r.warnings);
}

/**
 * A ring without its zero-width spikes: a vertex where the ring turns back exactly along itself (collinear, reversing)
 * bounds no area, so it is dropped, again until none is left — what an overlay's trace can leave where attraction folded
 * a strip thinner than `attractCm` onto the face's boundary (C-0212 (8)); the region is unchanged.
 */
function unspiked(ring: Ring): Ring {
  let pts = ring.slice();
  let changed = true;
  while (changed && pts.length >= 3) {
    changed = false;
    const n = pts.length;
    for (let i = 0; i < n; i += 1) {
      const a = pts[(i + n - 1) % n];
      const v = pts[i];
      const b = pts[(i + 1) % n];
      if (orient2d(a.x, a.y, v.x, v.y, b.x, b.y) === 0 && (v.x - a.x) * (b.x - v.x) + (v.y - a.y) * (b.y - v.y) < 0) {
        pts = [...pts.slice(0, i), ...pts.slice(i + 1)];
        changed = true;
        break;
      }
    }
  }
  return canonicalRing(pts);
}

/** The face read and its kerb (`corridorUnion` and `bandUnion` read the same function, §3.7). */
export function readKerb(p: Plat, face: FaceId, widths: SpineWidths, cache?: Map<string, Spine | null>): KernelResult<KerbRead> {
  const f = readFace(p, face, widths, cache);
  const k = kerbOf(f.rings, f.spines);
  if (!k.ok) return err(k.code, k.detail);
  const rings = k.value.map((r) => r.slice());
  const splits: LatticePoint[][] = [];
  if (f.spines.size > 0 && rings.length > 0) {
    for (const jn of junctionsOf(p, f.edges, f.spines)) {
      const chain = splitChain(p, rings, jn);
      if (chain === null) continue;
      const pts: LatticePoint[] = [];
      for (const q of chain) {
        const s = snap(q.x, q.y);
        if (!s.ok) return err(s.code, s.detail);
        const last = pts[pts.length - 1];
        if (last === undefined || last.x !== s.value.x || last.y !== s.value.y) pts.push(s.value);
      }
      if (pts.length >= 2) splits.push(pts);
    }
  }
  // a splice on a kerb edge collinear with its neighbour can fold the ring back on itself: spikes dropped again
  const kerbRings = rings.map(unspiked).filter((q) => q.length >= 3 && area2(q) !== 0).sort(compareRings);
  return ok({ face, rings: f.rings, edges: f.edges, spines: f.spines, kerb: kerbRings, splits, warnings: k.warnings.map((w) => ({ ...w })) }, k.warnings);
}

/**
 * §3.4's `kerb(face)`: kerb(F) of an L1 face, committed or in the open overlay — what `corridorUnion` commits (§3.7).
 * Read-only; the warnings are the scratch overlay's (§3.7's split reads them).
 */
export function kerb(tx: InsertTx, face: FaceId, widths: SpineWidths): KernelResult<Ring[]> {
  const r = readKerb(tx.plat, face, widths);
  if (!r.ok) return err(r.code, r.detail);
  return ok(r.value.kerb, r.value.warnings);
}

// ---- the junctions and their corridor_split chains -------------------------------------------------------------------
//
// Computed with the kerb, so the kerb point each split reaches is a vertex of kerb(F) itself (C-0212 (4), (5)); the
// rules are bandUnion.ts's module comment.

const ATTRACT = LATTICE.attractCm;
/** 2²⁰: small denominators are scaled by it before ratio() (exact: a power of two). */
const SCALE = 1_048_576;

export type XY = { x: number; y: number };

function div(num: number, den: number): number | null {
  const r = ratio(num * SCALE, den * SCALE, 'length');
  return r.ok ? r.value : null;
}

/** The point of segment a–b nearest q (doubles), and its squared distance. */
export function nearestOn(q: XY, a: XY, b: XY): { p: XY; d2: number; t: number } {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let t = 0;
  if (l2 > 0) {
    const s = div((q.x - a.x) * dx + (q.y - a.y) * dy, l2);
    t = s === null ? 0 : Math.max(0, Math.min(1, s));
  }
  const p = { x: a.x + t * dx, y: a.y + t * dy };
  return { p, d2: (q.x - p.x) * (q.x - p.x) + (q.y - p.y) * (q.y - p.y), t };
}

/** The unit direction a → b, or null. */
function unit(a: XY, b: XY): XY | null {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l = Math.sqrt(dx * dx + dy * dy);
  const ux = div(dx, l);
  const uy = div(dy, l);
  return ux === null || uy === null ? null : { x: ux, y: uy };
}

/** The meeting point of the line through a along u and the line through b along v (doubles), or null when all but parallel. */
function meet(a: XY, u: XY, b: XY, v: XY): XY | null {
  const den = u.x * v.y - u.y * v.x;
  const t = div((b.x - a.x) * v.y - (b.y - a.y) * v.x, den);
  if (t === null || Math.abs(den) < 1e-9) return null;
  return { x: a.x + t * u.x, y: a.y + t * u.y };
}

/**
 * One junction of a face: its vertex J, the route vertices before and after it on the walk, the in- and out-edges'
 * half-widths at their two ends, and whether F turns left between two spines there (a corner).
 */
interface Junction {
  readonly j: VertexId;
  readonly prev: VertexId;
  readonly next: VertexId;
  /** The in-edge's spine half-width at its start (prev) and at J. */
  readonly hwA: number;
  readonly hwIn: number;
  /** The out-edge's spine half-width at J and at its end (next). */
  readonly hwOut: number;
  readonly hwB: number;
  readonly corner: boolean;
}

/** The junctions of a face's boundary (bandUnion.ts's module comment), in walk order ring by ring. */
function junctionsOf(p: Plat, edges: readonly RouteEdge[][], spines: ReadonlyMap<string, Spine>): Junction[] {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const T = p.halfEdges;
  const out: Junction[] = [];
  for (const es of edges) {
    const m = es.length;
    for (let i = 0; i < m; i += 1) {
      const ein: RouteEdge = es[(i + m - 1) % m];
      const eout: RouteEdge = es[i];
      if (ein.spines.length === 0 || eout.spines.length === 0) continue;
      const j = eout.a;
      const shared = ein.spines.some((k) => eout.spines.includes(k));
      let degree = 0;
      for (const h of outgoing(p, j)) if (T.level[h >> 1] <= 1) degree += 1;
      if (shared && degree < 3) continue;
      const hwOf = (keys: readonly string[], v: VertexId): number => {
        let w = 0;
        for (const k of keys) w = Math.max(w, (spines.get(k) as Spine).hwAt.get(v) ?? 0);
        return w;
      };
      const o = orient2d(X[ein.a], Y[ein.a], X[j], Y[j], X[eout.b], Y[eout.b]);
      out.push({
        j,
        prev: ein.a,
        next: eout.b,
        hwA: hwOf(ein.spines, ein.a),
        hwIn: hwOf(ein.spines, j),
        hwOut: hwOf(eout.spines, j),
        hwB: hwOf(eout.spines, eout.b),
        corner: !shared && o > 0,
      });
    }
  }
  return out;
}

/** The kerb vertex nearest q within `r` cm of it, or null. */
function kerbVertexNear(rings: readonly LatticePoint[][], q: XY, r: number): LatticePoint | null {
  let best: LatticePoint | null = null;
  let bd = r * r;
  for (const ring of rings) {
    for (const v of ring) {
      const d2 = (v.x - q.x) * (v.x - q.x) + (v.y - q.y) * (v.y - q.y);
      if (d2 < bd || (d2 === bd && best !== null && (v.y < best.y || (v.y === best.y && v.x < best.x)))) {
        best = v;
        bd = d2;
      }
    }
  }
  return best;
}

/**
 * The kerb point a split reaches, made a vertex of the kerb (C-0212 (5)): the point of the kerb nearest `q`, snapped; an
 * end of its kerb edge where it lands there or within `minEdge` of one, else spliced into the ring between them — so
 * the kerb `kerb` returns and the kerb `corridorUnion` commits carry the split's end as one vertex (§4.6's S8 ≡ S9).
 */
function spliceAt(rings: LatticePoint[][], q: XY): LatticePoint | null {
  let br = -1;
  let bi = -1;
  let bp: XY = { x: 0, y: 0 };
  let bd = Infinity;
  rings.forEach((r, ri) => {
    for (let i = 0; i < r.length; i += 1) {
      const c = nearestOn(q, r[i], r[(i + 1) % r.length]);
      if (c.d2 < bd || (c.d2 === bd && (c.p.y < bp.y || (c.p.y === bp.y && c.p.x < bp.x)))) {
        br = ri;
        bi = i;
        bp = c.p;
        bd = c.d2;
      }
    }
  });
  if (br < 0) return null;
  const ring = rings[br];
  const a = ring[bi];
  const b = ring[(bi + 1) % ring.length];
  const s = snap(bp.x, bp.y);
  if (!s.ok) return null;
  const v = s.value;
  const da = (v.x - a.x) * (v.x - a.x) + (v.y - a.y) * (v.y - a.y);
  const db = (v.x - b.x) * (v.x - b.x) + (v.y - b.y) * (v.y - b.y);
  const min = LATTICE.minEdgeCm * LATTICE.minEdgeCm;
  if (da < min || db < min) return da <= db ? a : b;
  ring.splice(bi + 1, 0, v);
  return v;
}

/** The corridor_split chain at one junction (bandUnion.ts's module comment), or null when the kerb has no point to reach. */
function splitChain(p: Plat, kerbRings: LatticePoint[][], jn: Junction): XY[] | null {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const J: XY = { x: X[jn.j], y: Y[jn.j] };
  const A: XY = { x: X[jn.prev], y: Y[jn.prev] };
  const B: XY = { x: X[jn.next], y: Y[jn.next] };
  const u = unit(A, J);
  const v = unit(J, B);
  if (u === null || v === null) return null;
  // The left normals (the face lies on the left of its walk).
  const nu: XY = { x: -u.y, y: u.x };
  const nv: XY = { x: -v.y, y: v.x };
  let aim: XY = { x: J.x + nu.x * jn.hwIn, y: J.y + nu.y * jn.hwIn };
  let K: LatticePoint | null = null;
  if (jn.corner) {
    // The two strips' inner edges — each the line between its segment's two ends offset by their half-widths (the
    // trapezoid, §3.7) — meet at the kerb corner: the kerb's vertex there.
    const a0: XY = { x: A.x + nu.x * jn.hwA, y: A.y + nu.y * jn.hwA };
    const a1: XY = { x: J.x + nu.x * jn.hwIn, y: J.y + nu.y * jn.hwIn };
    const b0: XY = { x: J.x + nv.x * jn.hwOut, y: J.y + nv.y * jn.hwOut };
    const b1: XY = { x: B.x + nv.x * jn.hwB, y: B.y + nv.y * jn.hwB };
    const du = unit(a0, a1);
    const dv = unit(b0, b1);
    const m = du === null || dv === null ? null : meet(a0, du, b0, dv);
    if (m !== null) {
      aim = m;
      K = kerbVertexNear(kerbRings, m, ATTRACT);
    }
  } else {
    const b = unit({ x: 0, y: 0 }, { x: nu.x + nv.x, y: nu.y + nv.y });
    if (b !== null) aim = { x: J.x + b.x * Math.max(jn.hwIn, jn.hwOut), y: J.y + b.y * Math.max(jn.hwIn, jn.hwOut) };
  }
  if (K === null) K = spliceAt(kerbRings, aim);
  if (K === null) return null;
  if (!jn.corner) return [J, K];
  const ca = nearestOn(K, A, J);
  const cb = nearestOn(K, J, B);
  // A foot beyond its spine edge's far end (a corner whose strip is shorter than the crossed street's half-width): no
  // square wedge fits — the one split from J to the kerb corner separates the two strips there.
  if (ca.t <= 0 || cb.t >= 1) return [J, K];
  const fa = ca.p;
  const fb = cb.p;
  const nearJ = (q: XY): boolean => (q.x - J.x) * (q.x - J.x) + (q.y - J.y) * (q.y - J.y) <= ATTRACT * ATTRACT;
  const a = nearJ(fa);
  const b = nearJ(fb);
  if (a && b) return [J, K];
  if (a) return [J, K, fb];
  if (b) return [fa, K, J];
  return [fa, K, fb];
}

