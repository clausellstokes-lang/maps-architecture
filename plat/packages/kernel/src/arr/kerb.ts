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
// whole chain gives; (3) a face whose kerb is empty — wholly within its bands — gives `ok([])`, no refusal (it holds no
// built block; §3.11's `empty` refusal is the booleans' and buffers'); (4) a spine-less face gives its own L1 route
// rings, outer ring first (counter-clockwise from its lowest-leftmost vertex), then the holes in that vertex order.
import { faceWalk, idOf, isFaceLive, roleInfo, rowsOn, type FaceId, type HalfEdgeId, type Plat, type VertexId } from '../arena/index.js';
import type { InsertTx } from '../insert/classes.js';
import { err, ok, type KernelResult, type Warning } from '../num/index.js';
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
  /** kerb(F): outer rings counter-clockwise, holes clockwise. */
  readonly kerb: Ring[];
  readonly warnings: Warning[];
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
      es.push({ a, b, h, spines: keys.sort() });
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
    if (line.closed && keep.every(Boolean)) {
      runs.push([...Array.from({ length: n }, (_, i) => i), 0]);
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
      const parts = bufferParts([pts], ws, 'round', line.closed ? 'round' : s.ends);
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
  const keys = [...spines.keys()].sort();
  for (const k of keys) {
    const r = spineParts(spines.get(k) as Spine, box);
    if (!r.ok) return r;
    for (const q of r.value) parts.push(q);
  }
  if (parts.length === 0) return kerbOf(rings, new Map());
  return overlayRegion([rings, parts], (w) => w[0] !== 0 && w[1] === 0);
}

/** The face read and its kerb (`corridorUnion` and `bandUnion` read the same function, §3.7). */
export function readKerb(p: Plat, face: FaceId, widths: SpineWidths, cache?: Map<string, Spine | null>): KernelResult<KerbRead> {
  const f = readFace(p, face, widths, cache);
  const k = kerbOf(f.rings, f.spines);
  if (!k.ok) return err(k.code, k.detail);
  return ok({ face, rings: f.rings, edges: f.edges, spines: f.spines, kerb: k.value, warnings: k.warnings.map((w) => ({ ...w })) }, k.warnings);
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
