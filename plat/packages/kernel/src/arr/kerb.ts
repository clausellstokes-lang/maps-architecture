// kerb(face) (§3.7 *The kerb, defined once* (GEO-20); §3.4 `kerb`; §2.2 rule 5 — profiles sampled per segment end).
// M0-a-09.
//
// §3.7: "For an L1 face F, `kerb(F) = F − ⋃ buffer(spineᵢ, half-widthᵢ)` over F's bounding spines, each half-width
// sampled from the width the spine's linear entity declares … with round joins on the union's convex side and square
// ends where declared; the union's concave corners — the block corners at junctions — are sharp by construction. A face
// with no bounding spine … has `kerb(F) = F`." And: "`kerb` is also a read-only service on the faces of an open
// transaction's overlay", the one function S8 plans on and `corridorUnion` commits (the contract S8 ≡ S9, §4.6).
// The reading of "F's bounding spines" (J318, the session's ruling; C-0380): a corridor is a reservation, and a block
// never overlaps one — the spines kerb(F) subtracts are every (role, entity) chain INCIDENT to F, on a route edge of F's
// boundary AND through a route vertex of it (a vertex-only contact: a chain on a route edge leaving that vertex that is
// not F's own), whose buffer meets F; a face with no incident spine keeps kerb(F) = F.
//
// The construction: F's rings on its L1 route (§2.2 rule 3: every level-1 reader reads the level-1 route, so a finer
// Steiner vertex on a spine changes nothing); its spines — every (role, entity) chain on a route edge of F's boundary,
// and (J318) every chain on a route edge leaving a route vertex of F's rings that is not F's own boundary edge (the
// vertex census reads the route too, so a finer vertex changes nothing) whose buffer reaches into the kerb of the edge
// spines (`reaches`, a superset of its buffer: one lying within those bands there changes no region and would only add
// vertices the insertion attracts), for which the caller's width declaration gives a positive half-width; a vertex-only
// spine bounds no route edge of F, so it adds no junction; each spine's whole own-level route
// (`routeLines`) with its half-width sampled at every route vertex — a scalar, or the knot profile interpolated by arc
// length (`knotLines` / `cutKnot`, M0-a-06), so a vertex that carries no knot (an S8 T-junction) changes no sample — and
// the strips of the route's segments near F (each the trapezoid between its two ends' half-widths), its joins `round`
// (round on the convex side; the concave side is the strips' sharp intersection) and its two ends as the chain
// declares them (`round` unless declared `square`) — M0-a-08's `bufferParts`, every part counter-clockwise.
//
// The read is a DRY-RUN ON THE REAL ARENA (session round S9, the ruling on KI-12 / KI-13; C-0387): kerb(F) is read in
// the open transaction it is asked on, so the content its insertions meet — the attractors — is the content an insertion
// of that transaction meets (every vertex and edge of level ≤ the batch's within attractCm: F's own L0 content, a
// neighbour's vertex beyond F's edge, an earlier batch's kerb), and the read is rolled back: no second arena, and F's
// rings are never inserted again (they are the arena's edges). Under the op's savepoint (`opSave`, M0-a-07) the parts
// are inserted at the batch's level through `insertChain` (the door) on a shell of the open arena (`insertTx`: its own
// work, warnings and chain journal, so the batch's work, warnings, journal and work limit stay untouched) — each part
// one closed mandatory chain under one `invisible` row naming it, every index pinned against decimation, so two points
// closer than minEdge merge at the first with W_ATTRACTED and no arc vertex is dropped (a part collapsing to one point
// is W_ATTRACTED; any other refusal is the read's); the faces of the batch's level inside F — those reached from F's
// boundary half-edges across every edge that bears no row of F's level or coarser beyond the read's own (a part edge, or
// finer content) — are labelled at their interior points (`labelPoint`: the candidate deepest in the face) by their winding against every part AS THE
// ARENA HOLDS IT (the cycle of edges carrying the part's row from `ChainInsert.placed`, never the input ring, which
// attraction may have moved — a sliver labelled from the input is a silently wrong kerb, N-45 (a)); a face is kept where
// it lies in no part (the sum 0), and the kept faces' boundary is traced in the overlay's form (an edge between two kept
// faces dropped; a finer vertex the read did not make on F's own boundary skipped, as the L1 route skips it; cut into
// simple loops, straight-through vertices dropped, spikes dropped, each ring canonical, the rings sorted); then
// everything is rolled back (`rollback`), the arena bit-identical. A face with no record of the batch's level inside it
// is its own child there (§2.2 rule 2): F itself, kept where its interior point lies in no part. The warnings are the
// shell's (§3.7's split reads them) — a part laid exactly where it was given (its ends where given, every vertex of its
// edges within the hot pixel of its segments) moved nothing, so its shared stretches (a strip and a join meeting along
// one segment, as the overlay's repeated segments did) are no W_STRETCH_SHARED. A part is clipped to F's box (`clipBox`:
// beyond it a part enters the neighbours only — beyond the L0 content, or into a neighbour's kept content). J318's census reads the base on the same dry-run: the edge spines' parts are
// inserted first and the region read (the base `reaches` reads); the reaching vertex-only spines' parts are then
// inserted on that arena and the region read again — F − (E ∪ V) read as (F − E) − V on one arrangement, so C-0381's
// staged read is the census itself (one dry-run, one savepoint per read); its post-condition (`clearOf`) stands: a vertex
// deeper into a vertex-only band than an insertion moves a boundary point refuses the read (N-45) — the insertion's move
// read as N-43's bound (`DRY_MOVE_CM`), the dry-run's parts being laid by `insertChain` itself. A segment an earlier part
// laid is laid along that part's held edges (`sharedPath`: a strip's end edge and its join's or cap's radius), and a
// kept face holding a part's region deeper than that move refuses the read (`keptDeep`, N-45 (a): a run end the
// insertion placed off its window point leaves the part's face unclosed). A post-condition's refusal names its place
// beside the arena (`kerbCensus().refusedAt`: the part and the point found deep in it), so the refusal replay can judge
// the insertion's hold of that part on insertChain alone (RULING J433: the class follows the cause). C-0387 records the
// construction and its census.
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
//
// Representation-free (§3.3: "never a VertexId, HalfEdgeId or FaceId … identical results for the same next edit";
// C-0207 (5); C-0230): every order this module makes is read from the geometry and the entity ids, never from a slot,
// an intern handle or a record's stored start — a spine is keyed by its role's name and its entity's id (`spineKey`), and
// each route ring of F is walked from its canonical start (`readFace`: its lowest-leftmost route vertex, a tie by the
// next route vertex, as §3.3's face key), the holes after the outer ring in ring order; the dry-run's trace starts from
// its boundary half-edges in lattice order and its rings are canonical and sorted. So the same arena after a save and
// load (the ids re-interned, the starts re-chosen) or a slot renumbering gives the same kerb, the same splits and the
// same insertion sequence in `corridorUnion`.
import {
  faceWalk,
  handleOf,
  idOf,
  isFaceLive,
  isHalfEdgeLive,
  outgoing,
  roleIdOf,
  roleInfo,
  rowsOn,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { opSave, rollback } from '../faces/common.js';
import { HOT_PIXEL_CM, query } from '../index/index.js';
import { addWarning, insertTx, type InsertTx } from '../insert/classes.js';
import { insertChain } from '../insert/insertChain.js';
import { nearParallel } from '../insert/stretch.js';
import { area2, err, LATTICE, ok, orient2d, ratio, snap, type KernelResult, type Warning } from '../num/index.js';
import { cutKnot, knotLines, routeLines } from '../tx/profile.js';
import { check, openTx, type OpenTx } from '../tx/state.js';
import type { Overlay } from '../tx/index.js';
import type { ChainProfile, ChainRef, Cm, Level, LatticePoint } from '../types/index.js';
import { bufferParts, SAGITTA_CM } from './buffer.js';
import { canonicalRing, compareRings, dropStraight, simpleLoops, type Ring } from './winding.js';

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
  /** `${role name}:${entity id}` (`spineKey`) — the key a boundary edge's row is matched by; never a handle (§3.3). */
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

/** A face read for its kerb: its L1 route rings and edges, its spines, the kerb and the dry-run's warnings. */
export interface KerbRead {
  readonly face: FaceId;
  /** The route rings, the face on their left (outer ring first, then the holes in ring order), each from its canonical start. */
  readonly rings: LatticePoint[][];
  /** Per route ring, its route edges in walk order from the ring's canonical start. */
  readonly edges: RouteEdge[][];
  /** The buffered spines by key: the route edges' (`RouteEdge.spines`) and the vertex-only contacts' (J318). */
  readonly spines: ReadonlyMap<string, Spine>;
  /** kerb(F): outer rings counter-clockwise, holes clockwise; every junction's split end a vertex of it (C-0212 (5)). */
  readonly kerb: Ring[];
  /** The corridor_split chains at the face's junctions, in walk order from each ring's canonical start (bandUnion.ts's module comment). */
  readonly splits: LatticePoint[][];
  /** The dry-run's insertion warnings (§3.7's split). */
  readonly warnings: Warning[];
  /** The region the dry-run read, before the splits' ends were spliced into it (C-0212 (5)). */
  readonly region: Ring[];
  /** J318's census, where F has vertex-only contacts: the edge spines' kerb and the vertex-only spines it added. */
  readonly census?: SpineCensus;
}

/** Two texts in code-unit order (a total order on the spine keys; never a slot order). */
function byText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * The key a spine row is matched by: its role's name and its entity's id (C-0230) — slot- and handle-free, so the spines'
 * order (`kerbParts`, the overlay's second operand) and a boundary edge's spine set are the same on every copy of the
 * arena (a loaded block re-interns the ids, §3.9). A role name holds no ':', so the key is one-to-one.
 */
export function spineKey(p: Plat, kind: number, entity: number): string {
  return `${roleInfo(kind).name}:${idOf(p, entity)}`;
}

/** Two lattice points by position, y then x (§3.3's vertex key). */
function comparePoints(a: LatticePoint, b: LatticePoint): number {
  return a.y !== b.y ? a.y - b.y : a.x - b.x;
}

/**
 * The route half-edges of one ring rotated to the ring's canonical start (§3.3's face key, C-0230): the lowest-leftmost
 * route vertex; where the ring visits it more than once, the visit whose following route vertices come first (y, then
 * x), one by one round the ring — never the record's stored start, which a load or a renumbering re-chooses.
 */
function canonicalStart(p: Plat, hs: readonly HalfEdgeId[]): HalfEdgeId[] {
  const O = p.halfEdges.origin;
  const pt = (h: HalfEdgeId): LatticePoint => ({ x: p.vertices.x[O[h]] as Cm, y: p.vertices.y[O[h]] as Cm });
  const n = hs.length;
  let best = 0;
  for (let i = 1; i < n; i += 1) {
    for (let k = 0; k < n; k += 1) {
      const c = comparePoints(pt(hs[(i + k) % n]), pt(hs[(best + k) % n]));
      if (c < 0) best = i;
      if (c !== 0) break;
    }
  }
  return [...hs.slice(best), ...hs.slice(0, best)];
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
 * The face's L1 route rings and edges, its edge spines, and (J318) the candidates of its census: the spines through its
 * route vertices only (`through`, in key order; the census keeps those whose buffer reaches into the kerb of the edge
 * spines, `readKerb`). `widths` is asked once per (role, entity) of level ≤ 1 on the face's boundary or on a route edge
 * leaving one of its route vertices; `cache` keeps the answers across the faces of one call. `vertexContacts` false
 * reads the edge spines only — bandUnion's per-side parts (C-0380: a band's parts lie on the sides of its chain; a face
 * touching it at a vertex holds neither). `seeds`: every half-edge of F's L1 walk (F on its left), read before any
 * dry-run splits F's records — the dry-run's flood starts from them. Reads the arena only.
 */
export function readFace(
  p: Plat,
  face: FaceId,
  widths: SpineWidths,
  cache: Map<string, Spine | null> = new Map(),
  vertexContacts = true,
): { rings: LatticePoint[][]; edges: RouteEdge[][]; spines: Map<string, Spine>; through: Spine[]; seeds: HalfEdgeId[] } {
  check(isFaceLive(p, 1, face), `kerb: face ${String(face)} is not a live L1 face (§3.7: kerb reads an L1 face)`);
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const R = p.roles;
  const spines = new Map<string, Spine>();
  const rings: LatticePoint[][] = [];
  const edges: RouteEdge[][] = [];
  const read: { ring: LatticePoint[]; es: RouteEdge[] }[] = [];
  const seeds: HalfEdgeId[] = [];
  for (const walk of faceWalk(p, 1, face)) {
    const route: HalfEdgeId[] = [];
    for (let i = 0; i < walk.length; i += 1) {
      seeds.push(walk[i]);
      if (L[O[walk[i]]] <= 1) route.push(walk[i]);
    }
    check(route.length >= 2, 'kerb: an L1 ring has at least two route vertices');
    const at = canonicalStart(p, route);
    const ring: LatticePoint[] = [];
    const es: RouteEdge[] = [];
    for (let j = 0; j < at.length; j += 1) {
      const h = at[j];
      const a = O[h];
      const b = O[at[(j + 1) % at.length]];
      ring.push({ x: X[a] as Cm, y: Y[a] as Cm });
      const keys: string[] = [];
      for (const r of rowsOn(p, 'edge', h)) {
        if (R.level[r] > 1 || R.ordinal[r] !== 0) continue;
        const key = spineKey(p, R.kind[r], R.entity[r]);
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
    read.push({ ring, es });
  }
  // the outer ring first, then the holes in ring order (each from its canonical start): never the record's hole order
  const holes = read.slice(1).sort((u, w) => compareRings(u.ring, w.ring));
  for (const r of [read[0], ...holes]) {
    rings.push(r.ring);
    edges.push(r.es);
  }
  // J318: the spines incident to F at a route vertex only — the chains on the route edges leaving a route vertex of F's
  // rings that are not F's own boundary edges (a vertex-only contact) — keyed by `spineKey`, in key order; they bound no
  // route edge of F, so they add no junction (`RouteEdge.spines` is unchanged). One is F's spine where its buffer
  // reaches into the kerb of F's edge spines (`reaches`, the census in `readKerb`): a band that lies within those bands
  // there changes no region, and is left out so that it adds no vertex the insertion would attract onto the kerb (C-0380).
  if (!vertexContacts) return { rings, edges, spines, through: [], seeds };
  const own = new Set<number>();
  for (const walk of faceWalk(p, 1, face)) for (const h of walk) own.add(h >> 1);
  const T = p.halfEdges;
  const through = new Map<string, ChainRef>();
  for (const es of edges) {
    for (const e of es) {
      for (const g of outgoing(p, e.a)) {
        if (T.level[g >> 1] > 1 || own.has(g >> 1)) continue;
        for (const row of rowsOn(p, 'edge', g)) {
          if (R.level[row] > 1 || R.ordinal[row] !== 0) continue;
          const key = spineKey(p, R.kind[row], R.entity[row]);
          if (!spines.has(key) && !through.has(key)) through.set(key, { role: roleInfo(R.kind[row]).name, entity: idOf(p, R.entity[row]) });
        }
      }
    }
  }
  const vertexOnly: Spine[] = [];
  for (const key of [...through.keys()].sort(byText)) {
    let s = cache.get(key);
    if (s === undefined) {
      const chain = through.get(key) as ChainRef;
      const w = widths(chain);
      s = w === null || w === undefined ? null : readSpine(p, key, chain, w);
      cache.set(key, s);
    }
    if (s !== null) vertexOnly.push(s);
  }
  return { rings, edges, spines, through: vertexOnly, seeds };
}

/** Do the segments a–b and c–d meet (touching included; exact on lattice points)? */
function segmentsMeet(a: LatticePoint, b: LatticePoint, c: LatticePoint, d: LatticePoint): boolean {
  const o1 = orient2d(a.x, a.y, b.x, b.y, c.x, c.y);
  const o2 = orient2d(a.x, a.y, b.x, b.y, d.x, d.y);
  const o3 = orient2d(c.x, c.y, d.x, d.y, a.x, a.y);
  const o4 = orient2d(c.x, c.y, d.x, d.y, b.x, b.y);
  if (((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0))) return true;
  const on = (q: LatticePoint, s: LatticePoint, t: LatticePoint): boolean =>
    q.x >= Math.min(s.x, t.x) && q.x <= Math.max(s.x, t.x) && q.y >= Math.min(s.y, t.y) && q.y <= Math.max(s.y, t.y);
  return (o1 === 0 && on(c, a, b)) || (o2 === 0 && on(d, a, b)) || (o3 === 0 && on(a, c, d)) || (o4 === 0 && on(b, c, d));
}

/**
 * Does a vertex-only spine's buffer reach into the rings (J318's "whose buffer meets F", read against the kerb of F's
 * edge spines: C-0380)? A segment of its route reaches where it comes nearer to a ring edge than its larger end
 * half-width — half as much again at an open run's end declared square, whose corners stand √2 half-widths off the end —
 * or meets one: a superset of the buffer (the trapezoid strips, the round joins and ends lie within the larger end
 * half-width of their segment), so a band that reaches is never left out. The spine lies outside F's interior (it
 * bounds no route edge of F), so a segment within the rings is no case.
 */
function reaches(s: Spine, rings: readonly Ring[]): boolean {
  if (rings.length === 0) return false;
  const box = boxOf(rings);
  for (const line of s.lines) {
    const n = line.points.length;
    const segs = line.closed ? n : n - 1;
    for (let k = 0; k < segs; k += 1) {
      const a = line.points[k];
      const b = line.points[(k + 1) % n];
      const end = !line.closed && (k === 0 || k === segs - 1);
      const r = Math.max(line.hw[k], line.hw[(k + 1) % n]) * (end && s.ends === 'square' ? 1.5 : 1);
      if (!(r > 0)) continue;
      if (Math.max(a.x, b.x) < box.x0 - r || Math.min(a.x, b.x) > box.x1 + r || Math.max(a.y, b.y) < box.y0 - r || Math.min(a.y, b.y) > box.y1 + r) continue;
      const r2 = r * r;
      for (const ring of rings) {
        for (let i = 0; i < ring.length; i += 1) {
          const c = ring[i];
          const d = ring[(i + 1) % ring.length];
          if (segmentsMeet(a, b, c, d)) return true;
          if (nearestOn(c, a, b).d2 < r2 || nearestOn(d, a, b).d2 < r2 || nearestOn(a, c, d).d2 < r2 || nearestOn(b, c, d).d2 < r2) return true;
        }
      }
    }
  }
  return false;
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

/**
 * The second operand of kerb(F)'s overlay: every part of the face's spines' buffers that can reach it, spine by spine in
 * key order (the first operand is F's route rings). Empty where no spine reaches F.
 */
export function kerbParts(rings: readonly LatticePoint[][], spines: ReadonlyMap<string, Spine>): KernelResult<Ring[]> {
  const box = boxOf(rings);
  const parts: Ring[] = [];
  const keys = [...spines.keys()].sort(byText);
  for (const k of keys) {
    const r = spineParts(spines.get(k) as Spine, box);
    if (!r.ok) return r;
    for (const q of r.value) parts.push(q);
  }
  return ok(parts);
}

/** A face's own route rings as a region (no band reaches it): the outer ring, then the holes, each canonical. */
function ownRings(rings: readonly (readonly LatticePoint[])[]): Ring[] {
  const outer = canonicalRing(rings[0]);
  const holes = rings.slice(1).map(canonicalRing).sort(compareRings);
  return [outer, ...holes];
}

/**
 * The farthest an overlay's attraction, placement or wedge routing moves a boundary point: √2 · attractCm (§3.7's
 * attracted cases, ≈ 36.8 cm), plus the round arcs' chords (`SAGITTA_CM`).
 */
const MOVE_CM = Math.sqrt(2) * LATTICE.attractCm + SAGITTA_CM;

/**
 * The farthest the dry-run's insertion moves a boundary point: N-43's per-segment bound on every mandatory commit,
 * 2 · √2 · attractCm (≈ 73.5 cm: wedge routing, a stretch-share's join and leave points), plus the round arcs' chords
 * (`SAGITTA_CM`). The dry-run's parts are laid by `insertChain` itself on the real arena, so a kerb vertex within this of
 * its band's edge is an insertion's move; deeper, it is no move an insertion makes — a face labelled wrongly (N-45 (a)).
 */
export const DRY_MOVE_CM = 2 * Math.sqrt(2) * LATTICE.attractCm + SAGITTA_CM;

/**
 * Does every vertex of the rings stand clear of a spine's buffer — at least its half-width there (interpolated along the
 * segment by the foot of the perpendicular, as the trapezoid strip's edge is; at a segment's end, its round join's or
 * end's radius) less `MOVE_CM` from its route? The staged read's post-condition (C-0381): its region is accepted where
 * no vertex reaches into a vertex-only band deeper than an overlay may move a boundary point (§3.7's attracted cases);
 * deeper, it is not a result the design accepts, and the one overlay's refusal stands (N-45: never a silently wrong kerb).
 */
export function clearOf(rings: readonly (readonly LatticePoint[])[], s: Spine, moveCm: number = MOVE_CM): boolean {
  return deepIn(rings, s, moveCm) === null;
}

/** The first vertex of the rings deeper in the spine's buffer than `moveCm` (`clearOf`'s reading), or null. */
function deepIn(rings: readonly (readonly LatticePoint[])[], s: Spine, moveCm: number): LatticePoint | null {
  for (const line of s.lines) {
    const n = line.points.length;
    const segs = line.closed ? n : n - 1;
    for (let k = 0; k < segs; k += 1) {
      const a = line.points[k];
      const b = line.points[(k + 1) % n];
      const ha = line.hw[k];
      const hb = line.hw[(k + 1) % n];
      for (const r of rings) {
        for (const q of r) {
          const c = nearestOn(q, a, b);
          const reach = ha + c.t * (hb - ha) - moveCm;
          if (reach > 0 && c.d2 < reach * reach) return q;
        }
      }
    }
  }
  return null;
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

// ---- the dry-run on the real arena (session round S9; the module comment; C-0387) ---------------------------------------

/** The refusal of a read whose unlaid run crosses a face deeper than an insertion moves a boundary point (N-45). */
export const UNLAID_DEEP = 'arr: a part edge no route laid crosses a face of F deeper than an insertion moves a boundary point (N-45)';

/** Points along a run, its own and every MOVE_CM ÷ 2 between them (the samples `dryRegion`'s guard reads, finer than its bound). */
function runSamples(run: readonly LatticePoint[]): XY[] {
  const out: XY[] = [];
  for (let i = 0; i + 1 < run.length; i += 1) {
    const a = run[i];
    const b = run[i + 1];
    const n = Math.max(1, Math.ceil(div(2 * Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y)), MOVE_CM) ?? 1));
    for (let k = 0; k < n; k += 1) {
      const t = div(k, n) ?? 0;
      out.push({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) });
    }
  }
  if (run.length > 0) out.push(run[run.length - 1]);
  return out;
}

/** The least distance from q to the rings' edges (doubles). */
function distToRings(rings: readonly (readonly XY[])[], q: XY): number {
  let d2 = Infinity;
  for (const r of rings) for (let i = 0; i < r.length; i += 1) d2 = Math.min(d2, nearestOn(q, r[i], r[(i + 1) % r.length]).d2);
  return Math.sqrt(d2);
}

/** The detail of insertChain's routing refusal (insertChain.ts: no route keeps §3.10's clearance within N-43's bound). */
const NO_ROUTE = 'insert: no route from';

/** The dry-run's row: the non-structural `invisible` edge role (roles.json), its entity naming the part. */
const DRY_ROLE = 'invisible';

/** The entity of the dry-run's part i: an address id no plat's entity takes (the scratch overlay's `arr:` names). */
const partEntity = (i: number): string => `arr:dry:${String(i)}`;

/** The refusal detail of a kept boundary whose trace does not close (never on a valid arena; a typed refusal, §3.11). */
export const DRY_UNCLOSED = 'arr: the kept boundary of the dry-run does not close';

/**
 * One piece of a clipped part, in its order round the part: a run laid as one chain (the whole ring, closed; or a
 * stretch between two edges along window lines, open) with the vertex each input point became (`ChainInsert.placed`);
 * or a point of the part between two such edges, never laid (`runsOf`).
 */
type Piece = { readonly kind: 'run'; readonly points: readonly LatticePoint[]; readonly closed: boolean } | { readonly kind: 'point'; readonly at: LatticePoint };

/** A part the dry-run laid: its pieces (a run with the vertices its points became; a run that collapsed is a point) and its row's entity handle. */
interface Laid {
  readonly pieces: readonly ({ readonly kind: 'run'; readonly placed: readonly VertexId[]; readonly closed: boolean } | { readonly kind: 'point'; readonly at: LatticePoint })[];
  readonly entity: number;
}

/** One read's dry-run: the open transaction, F, the shell and savepoint (opened at the first part), the parts laid. */
interface Dry {
  readonly t: OpenTx;
  readonly face: FaceId;
  readonly rings: readonly LatticePoint[][];
  readonly seeds: readonly HalfEdgeId[];
  /** The level the parts are laid at (`dryLevel`). */
  readonly level: Level;
  /** The window the parts are clipped to (`clipWindow`), read before the dry-run writes. */
  readonly clip: readonly HalfPlane[];
  sh: InsertTx | null;
  save: ReturnType<typeof opSave> | null;
  readonly laid: Laid[];
  /** Each laid part as clipped (`clipToWindow`), in `laid`'s order: the post-condition's input regions (`keptDeep`). */
  readonly clipped: LatticePoint[][];
  /** The runs no route laid (`dryInsert`), as given, each with its part's index (its order in `laid`). */
  readonly unlaid: { readonly part: number; readonly points: LatticePoint[] }[];
  /**
   * Where a post-condition refused the read (UNLAID_DEEP, KEPT_DEEP, CENSUS_DEEP): the part (its index in `laid`, as
   * its row's entity `arr:dry:<i>` numbers it) and the point found deep in it — a diagnostic beside the arena
   * (`kerbCensus`), which the refusal replay reads to judge the insertion's hold of that part (J433).
   */
  refusedAt: RefusedAt | null;
  readonly warnings: Warning[];
  parts: number;
  /**
   * Every segment a part laid so far, by its two input points (`segKey`, either way round): the vertices its ends became
   * and the part's row entity — a later part's identical segment is laid along the same edges (`sharedPath`).
   */
  readonly segs: Map<string, { readonly a: VertexId; readonly b: VertexId; readonly entity: number; readonly ax: number; readonly ay: number }>;
}

/**
 * The level the dry-run lays its parts at: the batch's, and at least L2 — the level `corridorUnion` commits kerb(F)'s
 * edges at (§3.7), so S8's read in its L1 batch lays them as S9's commit does: an L2 edge crossing F's L1 boundary
 * meets it where it runs (an L1 edge it may not move), never at a hot pixel an L1 insertion would bend F's edge through.
 */
function dryLevel(level: Level): Level {
  return level < 2 ? 2 : level;
}

function dryRun(t: OpenTx, face: FaceId, rings: readonly LatticePoint[][], seeds: readonly HalfEdgeId[]): Dry {
  return { t, face, rings, seeds, level: dryLevel(t.level), clip: clipWindow(t.plat, face, rings), sh: null, save: null, laid: [], clipped: [], unlaid: [], refusedAt: null, warnings: [], parts: 0, segs: new Map() };
}

/** The dry-run put back (`rollback`): the arena, its index, the batch's journals, log and warnings as the read found them. */
function dryClose(d: Dry): void {
  if (d.save === null) return;
  const s = d.save;
  d.save = null;
  d.sh = null;
  rollback(d.t, s, err('E_INVARIANT', 'arr: the dry-run put back'));
}

/** A half-plane of a clip window: the points on the left of the directed line a → c (or on it), a and c lattice points. */
interface HalfPlane {
  readonly a: LatticePoint;
  readonly c: LatticePoint;
}

/** The convex hull of lattice points, counter-clockwise, collinear points dropped (Andrew's monotone chain; orient2d exact). */
function hullOf(pts: readonly LatticePoint[]): LatticePoint[] {
  const q = pts.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  const out: LatticePoint[] = [];
  for (const pass of [0, 1]) {
    const start = out.length;
    const seq = pass === 0 ? q : q.slice().reverse();
    for (const r of seq) {
      while (out.length >= start + 2) {
        const a = out[out.length - 2];
        const b = out[out.length - 1];
        if (orient2d(a.x, a.y, b.x, b.y, r.x, r.y) > 0) break;
        out.pop();
      }
      out.push(r);
    }
    out.pop();
  }
  return out;
}

/**
 * The window the dry-run's parts are clipped to: F's convex hull (its outer route ring's), as half-planes, within the box
 * of the L0 face holding F (its outer ring's) and the lattice. The region read lies in F, and a part's geometry outside
 * F changes no face inside it — laid there it would only meet the neighbours' content (other chains, a neighbour's
 * committed kerb, kept finer content: E_KEPT) or leave the L0 content round F (an edge of a batch above L0 lies inside
 * an L0 face, §2.2 rule 2: E_LEVEL), none of which the commit's pieces (inside F) meet. Every part is convex (a strip's
 * trapezoid, a join's or an end's arc) and so is the window, so the clip is exact before the lattice's rounding. The
 * window's lines run along F's own edges where F is convex, so the edges of a clipped part along them are never laid
 * (`runsOf`): F's edge is there already, and a copy of it off by the rounding would leave slivers along it.
 */
function clipWindow(p: Plat, face: FaceId, rings: readonly (readonly LatticePoint[])[]): HalfPlane[] {
  const hull = hullOf(rings[0]);
  const out: HalfPlane[] = [];
  // within the box of the outer ring of the L0 face holding F, and the lattice: an edge of a batch above L0 lies inside
  // an L0 face (§2.2 rule 2), so a part beyond the L0 content round F would be refused E_LEVEL (no scratch overlay's was)
  const lim = LATTICE.rangeCm - 1;
  let x0 = -lim;
  let y0 = -lim;
  let x1 = lim;
  let y1 = lim;
  const f0 = p.faces[1].parent[face];
  if (f0 >= 0 && isFaceLive(p, 0, f0)) {
    const O = p.halfEdges.origin;
    const ob = boxOf([faceWalk(p, 0, f0)[0].map((h) => ({ x: p.vertices.x[O[h]] as Cm, y: p.vertices.y[O[h]] as Cm }))]);
    x0 = Math.max(x0, ob.x0);
    y0 = Math.max(y0, ob.y0);
    x1 = Math.min(x1, ob.x1);
    y1 = Math.min(y1, ob.y1);
  }
  const corner = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });
  out.push({ a: corner(x0, y0), c: corner(x1, y0) }, { a: corner(x1, y0), c: corner(x1, y1) }, { a: corner(x1, y1), c: corner(x0, y1) }, { a: corner(x0, y1), c: corner(x0, y0) });
  for (let i = 0; i < hull.length; i += 1) out.push({ a: hull[i], c: hull[(i + 1) % hull.length] });
  return out;
}

/** orient2d of q against the half-plane's line (> 0 inside, 0 on it; exact on doubles). */
function sideOf(h: HalfPlane, q: XY): number {
  return orient2d(h.a.x, h.a.y, h.c.x, h.c.y, q.x, q.y);
}

/** A clipped part: its lattice points, and whether the edge from point i to point i + 1 lies on a window line. */
interface Clipped {
  readonly points: LatticePoint[];
  readonly onWindow: boolean[];
}

/**
 * A part clipped to the window (Sutherland–Hodgman on each half-plane, each crossing snapped to the lattice, consecutive
 * repeats dropped; the part itself where it lies within), each edge marked where it runs along a window line (both its
 * ends on that line: a crossing made on it, or a lattice point exactly on it).
 */
function clipToWindow(ring: readonly LatticePoint[], window: readonly HalfPlane[]): Clipped {
  type Tagged = { q: XY; on: Set<number> };
  let pts: Tagged[] = ring.map((q) => ({ q, on: new Set<number>() }));
  const within = ring.every((q) => window.every((h) => sideOf(h, q) >= 0));
  for (let hi = 0; hi < window.length && !within; hi += 1) {
    const h = window[hi];
    const out: Tagged[] = [];
    for (let i = 0; i < pts.length; i += 1) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      const oa = sideOf(h, a.q);
      const ob = sideOf(h, b.q);
      if (oa >= 0) out.push(oa === 0 ? { q: a.q, on: new Set([...a.on, hi]) } : a);
      if ((oa > 0 && ob < 0) || (oa < 0 && ob > 0)) {
        // the crossing of a–b with the line: a + s (b − a), s = oa / (oa − ob); on the line, and on every line a–b runs along
        const sc = div(oa, oa - ob);
        if (sc !== null) out.push({ q: { x: a.q.x + sc * (b.q.x - a.q.x), y: a.q.y + sc * (b.q.y - a.q.y) }, on: new Set([hi, ...[...a.on].filter((t) => b.on.has(t))]) });
      }
    }
    pts = out;
    if (pts.length === 0) return { points: [], onWindow: [] };
  }
  const res: { q: LatticePoint; on: Set<number> }[] = [];
  for (const t of pts) {
    const sn = snap(t.q.x, t.q.y);
    if (!sn.ok) continue;
    const last = res[res.length - 1];
    if (last === undefined || last.q.x !== sn.value.x || last.q.y !== sn.value.y) res.push({ q: sn.value, on: new Set(t.on) });
    else for (const x of t.on) last.on.add(x);
  }
  while (res.length > 1 && res[0].q.x === res[res.length - 1].q.x && res[0].q.y === res[res.length - 1].q.y) {
    const last = res.pop() as { q: LatticePoint; on: Set<number> };
    for (const x of last.on) res[0].on.add(x);
  }
  // a lattice point exactly on a window line is on it too (a part's own vertex there, or a crossing of two lines that
  // coincide — F's hull edge along the L0 box's)
  for (const t of res) window.forEach((h, hi) => {
    if (sideOf(h, t.q) === 0) t.on.add(hi);
  });
  const n = res.length;
  return { points: res.map((t) => t.q), onWindow: res.map((t, i) => [...t.on].some((x) => res[(i + 1) % n].on.has(x))) };
}

/**
 * The pieces a clipped part is laid as, in its order: the whole ring, closed, where no edge runs along a window line;
 * else every maximal stretch between two such edges, open, and every point between two such edges on its own: an edge
 * along a window line runs along F's own edge (or the L0 content's, or a hull edge across a concave F's pocket, outside
 * F), so it bounds no face inside F that F's edge does not; a stretch's ends, on F's edge to the lattice's rounding, meet
 * it as the insertion snaps it (a Steiner vertex on it). The points are kept for the part's cycle (`cycleOf`).
 */
function runsOf(c: Clipped): Piece[] {
  const n = c.points.length;
  const first = c.onWindow.indexOf(true);
  if (first < 0) return [{ kind: 'run', points: c.points.slice(), closed: true }];
  const out: Piece[] = [];
  let cur: LatticePoint[] = [];
  for (let j = 1; j <= n; j += 1) {
    // from the point after the first window edge, once round: a stretch ends where a window edge starts
    const i = (first + j) % n;
    cur.push(c.points[i]);
    if (c.onWindow[i]) {
      out.push(cur.length >= 2 ? { kind: 'run', points: cur, closed: false } : { kind: 'point', at: cur[0] });
      cur = [];
    }
  }
  return out;
}

/**
 * The vertices of a path from a to b along the edges carrying the part's row, a to b — a breadth-first search, each
 * vertex's edges taken in their far ends' lattice order (no slot order); null where no such path joins them.
 */
function rowPath(p: Plat, role: number, entity: number, a: VertexId, b: VertexId): VertexId[] | null {
  if (a === b) return [a];
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const R = p.roles;
  const carries = (h: HalfEdgeId): boolean => rowsOn(p, 'edge', h).some((r) => R.kind[r] === role && R.entity[r] === entity);
  const via = new Map<VertexId, VertexId>([[a, -1]]);
  const queue: VertexId[] = [a];
  for (let i = 0; i < queue.length && !via.has(b); i += 1) {
    const v = queue[i];
    const far = outgoing(p, v)
      .filter(carries)
      .map((h) => O[h ^ 1])
      .sort((u, w) => Y[u] - Y[w] || X[u] - X[w]);
    for (const w of far) {
      if (via.has(w)) continue;
      via.set(w, v);
      queue.push(w);
    }
  }
  if (!via.has(b)) return null;
  const path: VertexId[] = [b];
  let v = b;
  while (v !== a) {
    v = via.get(v) as VertexId;
    path.push(v);
  }
  return path.reverse();
}

/**
 * Is the part laid where it was given — every input point's vertex at that point, and every vertex of the edges
 * between two consecutive ones within the hot pixel of their segment? Such a part moved nothing: a stretch it shares
 * (a strip and a join meeting along one segment) is no move (§3.7: the attraction warnings mark a move).
 */
function laidExactly(p: Plat, pieces: readonly Piece[], l: Laid, role: number): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const hot = HOT_PIXEL_CM * HOT_PIXEL_CM;
  for (let r = 0; r < pieces.length; r += 1) {
    const given = pieces[r];
    const held = l.pieces[r];
    if (given.kind !== 'run') continue;
    if (held.kind !== 'run') return false;
    const pts = given.points;
    const placed = held.placed;
    const n = pts.length;
    for (let k = 0; k < n; k += 1) if (X[placed[k]] !== pts[k].x || Y[placed[k]] !== pts[k].y) return false;
    const segs = given.closed ? n : n - 1;
    for (let k = 0; k < segs; k += 1) {
      const a = placed[k];
      const b = placed[(k + 1) % n];
      if (a === b) return false;
      const path = rowPath(p, role, l.entity, a, b);
      if (path === null) return false;
      for (let i2 = 1; i2 + 1 < path.length; i2 += 1) if (nearestOn({ x: X[path[i2]], y: Y[path[i2]] }, pts[k], pts[(k + 1) % n]).d2 > hot) return false;
    }
  }
  return true;
}

/**
 * The part's cycle as the arena holds it: within each run, from each vertex an input point became to the next along its
 * row's edges; a point between two window edges (never laid) as the input gives it, joined by straight chords.
 */
function cycleOf(p: Plat, l: Laid, role: number): XY[] {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const cyc: XY[] = [];
  const at = (v: VertexId): XY => ({ x: X[v], y: Y[v] });
  for (const piece of l.pieces) {
    if (piece.kind === 'point') {
      cyc.push(piece.at);
      continue;
    }
    const n = piece.placed.length;
    const segs = piece.closed ? n : n - 1;
    for (let k = 0; k < segs; k += 1) {
      const a = piece.placed[k];
      const b = piece.placed[(k + 1) % n];
      if (a === b) continue;
      const path = rowPath(p, role, l.entity, a, b);
      // a defence: insertion leaves a part's edges joining its consecutive vertices; where they do not, the chord
      if (path === null) cyc.push(at(a));
      else for (let i = 0; i + 1 < path.length; i += 1) cyc.push(at(path[i]));
    }
    if (!piece.closed) cyc.push(at(piece.placed[n - 1]));
  }
  return cyc;
}

/** The winding number of a closed vertex walk round the point q (doubles; orient2d exact). */
function windingOf(cyc: readonly XY[], q: XY): number {
  let w = 0;
  const n = cyc.length;
  for (let i = 0; i < n; i += 1) {
    const sx = cyc[i].x;
    const sy = cyc[i].y;
    const tx = cyc[(i + 1) % n].x;
    const ty = cyc[(i + 1) % n].y;
    if (sy <= q.y) {
      if (ty > q.y && orient2d(sx, sy, tx, ty, q.x, q.y) > 0) w += 1;
    } else if (ty <= q.y && orient2d(sx, sy, tx, ty, q.x, q.y) < 0) w -= 1;
  }
  return w;
}

/** A segment's key by its two input points, either way round. */
function segKey(a: LatticePoint, b: LatticePoint): string {
  const [u, w] = comparePoints(a, b) <= 0 ? [a, b] : [b, a];
  return `${String(u.x)},${String(u.y)},${String(w.x)},${String(w.y)}`;
}

/**
 * A run's points with every segment an earlier part laid (the same two input points: a strip's end edge and its join's
 * or end cap's radius, which `bufferParts` give alike) replaced by the vertices that part's segment became, in order
 * along its row's edges — so the two parts hold one boundary there, as the scratch overlay's repeated segment was one
 * edge. Laid apart, each segment is attracted on its own (the first along an edge it passes within attractCm of, the
 * second along the first's or another), and the sliver between them lies in neither part as the arena holds it: a face
 * inside the band read as kerb (N-45 (a)). Null where no segment of the run is shared.
 */
function sharedPath(d: Dry, points: readonly LatticePoint[], closed: boolean, role: number): LatticePoint[] | null {
  const p = d.t.plat;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const at = (v: VertexId): LatticePoint => ({ x: X[v] as Cm, y: Y[v] as Cm });
  const n = points.length;
  const segs = closed ? n : n - 1;
  const out: LatticePoint[] = [];
  let any = false;
  const push = (q: LatticePoint): void => {
    const last = out[out.length - 1];
    if (last === undefined || last.x !== q.x || last.y !== q.y) out.push(q);
  };
  for (let k = 0; k < segs; k += 1) {
    const a = points[k];
    const b = points[(k + 1) % n];
    const held = d.segs.get(segKey(a, b));
    const path = held === undefined ? null : rowPath(p, role, held.entity, held.a, held.b);
    if (held === undefined || path === null) {
      push(a);
      if (!closed && k === segs - 1) push(b);
      continue;
    }
    any = true;
    // the held segment's vertices, from the end a became to the end b became
    const along = held.ax === a.x && held.ay === a.y ? path : path.slice().reverse();
    for (let i = 0; i < along.length; i += 1) if (i < along.length - 1 || (!closed && k === segs - 1)) push(at(along[i]));
  }
  if (!any) return null;
  if (closed && out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  return out;
}

/**
 * Lays the parts on the dry-run's shell (opening the savepoint and the shell at the first part): each part, clipped to
 * the arena's box, one closed mandatory chain under its own `invisible` row, every index pinned against decimation;
 * a part that collapses to one point (E_DEGENERATE `empty`) adds nothing and is W_ATTRACTED; any other refusal is the
 * read's (the caller rolls the dry-run back).
 */
function dryInsert(d: Dry, parts: readonly Ring[]): KernelResult<null> {
  if (parts.length === 0) return ok(null);
  const p = d.t.plat;
  if (d.sh === null) {
    d.save = opSave(d.t);
    d.sh = insertTx(p, d.level);
  }
  const sh = d.sh;
  const window = d.clip;
  const role = roleIdOf(DRY_ROLE);
  for (const part of parts) {
    const c = clipToWindow(part, window);
    // a part beyond the window, or touching it along a line only, lays nothing
    if (c.points.length < 3 || area2(c.points) === 0) continue;
    const pieces = runsOf(c);
    const entity = partEntity(d.parts);
    d.parts += 1;
    const held: Laid['pieces'][number][] = [];
    const layPieces: Piece[] = [];
    const ws: Warning[] = [];
    for (const piece of pieces) {
      if (piece.kind === 'point') {
        held.push(piece);
        layPieces.push(piece);
        continue;
      }
      // a segment an earlier part laid is laid along its edges (`sharedPath`); the run is then given as held there
      const shared = sharedPath(d, piece.points, piece.closed, role);
      const given = shared ?? piece.points;
      const r = insertChain(sh, given, [{ role: DRY_ROLE, entity }], 'mandatory', { closed: piece.closed, pinned: given.map((_, k) => k) });
      if (!r.ok) {
        // A run collapsing to one point (shorter than minEdge: as the scratch's two-point segment collapsed), or one no
        // route lays within §3.10's clearance (a short or shallow stretch hugging an edge it may not move — F's own, the
        // L0 content's — which no scratch overlay's peer edges met): it adds no edge. Its points stay in the part's cycle
        // as given (the labels read the part where the arena could not hold it), and a run left out is an attracted
        // case (W_ATTRACTED); `unlaidClear` holds the region to it.
        const collapsed = r.code === 'E_DEGENERATE' && r.detail === 'empty';
        if (collapsed || (r.code === 'E_INVARIANT' && r.detail.startsWith(NO_ROUTE))) {
          addWarning(d.warnings, 'W_ATTRACTED', piece.points[0]);
          for (const q of piece.points) {
            held.push({ kind: 'point', at: q });
            layPieces.push({ kind: 'point', at: q });
          }
          if (!collapsed) d.unlaid.push({ part: d.parts - 1, points: piece.points.slice() });
          continue;
        }
        return err(r.code, r.detail);
      }
      held.push({ kind: 'run', placed: r.value.placed.slice(), closed: piece.closed });
      layPieces.push({ kind: 'run', points: given, closed: piece.closed });
      for (const w of r.warnings) ws.push(w);
      // its segments by their input points, for a later part's identical one (the first part's stand)
      if (shared === null) {
        const pl = r.value.placed;
        const m = piece.points.length;
        for (let k = 0; k < (piece.closed ? m : m - 1); k += 1) {
          const key = segKey(piece.points[k], piece.points[(k + 1) % m]);
          if (!d.segs.has(key)) d.segs.set(key, { a: pl[k], b: pl[(k + 1) % m], entity: handleOf(p, entity), ax: piece.points[k].x, ay: piece.points[k].y });
        }
      }
    }
    const l: Laid = { pieces: held, entity: handleOf(p, entity) };
    d.laid.push(l);
    d.clipped.push(c.points);
    const exact = laidExactly(p, layPieces, l, role);
    for (const w of ws) {
      if (exact && w.code === 'W_STRETCH_SHARED') continue;
      for (let k = 0; k < w.count; k += 1) addWarning(d.warnings, w.code, w.at);
    }
  }
  return ok(null);
}

/**
 * The region the dry-run reads (see the module comment): the faces of the batch's level inside F that lie in no part
 * laid so far, traced as rings. F with no record of the batch's level inside it is its own child there.
 */
function dryRegion(d: Dry): KernelResult<Ring[]> {
  const t = d.t;
  const p = t.plat;
  const n: Level = d.level;
  if (d.laid.length === 0) return ok(ownRings(d.rings), d.warnings.map((w) => ({ ...w })));
  const role = roleIdOf(DRY_ROLE);
  const mine = new Set(d.laid.map((l) => l.entity));
  const R = p.roles;
  const T = p.halfEdges;
  const O = T.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  // F's own boundary: an edge of F's level or coarser bearing a row that is not the read's (its splits keep the rows)
  const boundaryOfF = (h: HalfEdgeId): boolean => T.level[h >> 1] <= 1 && rowsOn(p, 'edge', h).some((r) => !(R.kind[r] === role && mine.has(R.entity[r])));
  const cycles = d.laid.map((l) => cycleOf(p, l, role));
  const inParts = (q: XY): number => cycles.reduce((s, c) => s + windingOf(c, q), 0);
  // the faces round F at every level from F's own (1) to the batch's (the index), each half-edge of their rings by its
  // face: a region of level n holding no record of level n is the coarser record standing as its own child there (§2.2
  // rule 2), so a half-edge's face is the finest record whose walk holds it
  const b = boxOf(d.rings);
  const near = { minX: b.x0 - 2, minY: b.y0 - 2, maxX: b.x1 + 2, maxY: b.y1 + 2 };
  const rec = new Map<HalfEdgeId, number>();
  for (let level = 1; level <= n; level += 1) {
    const lv = level as Level;
    for (const c of query(p, t.key, lv, near, { faces: true }).faces) for (const ring of faceWalk(p, lv, c)) for (const h of ring) rec.set(h, c * 8 + level);
  }
  const levelOf = (cell: number): Level => (cell & 7) as Level;
  const faceOf = (cell: number): FaceId => cell >> 3;
  // the cells inside F: from F's boundary half-edges (F on their left), across every edge that is not F's own
  const inside: number[] = [];
  const seen = new Set<number>();
  for (const h of d.seeds) {
    if (!isHalfEdgeLive(p, h)) continue;
    const c = rec.get(h);
    if (c !== undefined && !seen.has(c)) {
      seen.add(c);
      inside.push(c);
    }
  }
  if (inside.length === 0) return err('E_INVARIANT', 'arr: F holds no face of the dry-run (its boundary is not indexed)');
  for (let i = 0; i < inside.length; i += 1) {
    for (const ring of faceWalk(p, levelOf(inside[i]), faceOf(inside[i]))) {
      for (const h of ring) {
        if (boundaryOfF(h)) continue;
        const c = rec.get(h ^ 1);
        if (c === undefined) return err('E_INVARIANT', 'arr: a face of the dry-run inside F is not indexed');
        if (!seen.has(c)) {
          seen.add(c);
          inside.push(c);
        }
      }
    }
  }
  // labelled at their interior points against every part as the arena holds it: kept where they lie in no part
  const kept = new Set<number>();
  for (const c of inside) {
    const q = labelPoint(p, levelOf(c), faceOf(c));
    if (q !== null && inParts(q) === 0) kept.add(c);
  }
  // a run no route laid splits no face, so a face it crosses is read whole at its interior point: accepted where the
  // run stays within an insertion's move (DRY_MOVE_CM) of the face's boundary — the face it crosses is then an attracted
  // case's sliver — and refused beyond (N-45: never a silently wrong kerb)
  if (d.unlaid.length > 0) {
    const cells = inside.map((c) => faceWalk(p, levelOf(c), faceOf(c)).map((r) => r.map((h) => ({ x: X[O[h]] as Cm, y: Y[O[h]] as Cm }))));
    for (const run of d.unlaid) {
      for (const q of runSamples(run.points)) {
        const at = cells.find((rings) => strictlyInside(rings, q));
        if (at !== undefined && distToRings(at, q) > DRY_MOVE_CM) {
          d.refusedAt = { part: run.part, x: q.x, y: q.y };
          return err('E_INVARIANT', UNLAID_DEEP);
        }
      }
    }
  }
  // the post-condition (N-45 (a)): a kept face holds no point of a part's region deeper than an insertion moves a
  // boundary point (`keptDeep`) — a part whose laid edges do not close round it (a run's end attracted or placed onto
  // other content, left dangling inside F) leaves its interior one face with the kept region, read whole at one point
  for (const c of kept) {
    const deep = keptDeep(p, levelOf(c), faceOf(c), d.clipped);
    if (deep !== null) {
      d.refusedAt = deep;
      return err('E_INVARIANT', KEPT_DEEP);
    }
  }
  const keptAt = (h: HalfEdgeId): boolean => {
    const c = rec.get(h);
    return c !== undefined && kept.has(c);
  };
  const bnd = (h: HalfEdgeId): boolean => keptAt(h) && !keptAt(h ^ 1);
  const B: HalfEdgeId[] = [];
  for (const c of kept) for (const ring of faceWalk(p, levelOf(c), faceOf(c))) for (const h of ring) if (bnd(h)) B.push(h);
  // the trace starts from its half-edges in lattice order (no slot order)
  B.sort((u, w) => Y[O[u]] - Y[O[w]] || X[O[u]] - X[O[w]] || Y[O[u ^ 1]] - Y[O[w ^ 1]] || X[O[u ^ 1]] - X[O[w ^ 1]]);
  const leaving = new Map<VertexId, number>();
  for (const h of B) leaving.set(O[h], (leaving.get(O[h]) ?? 0) + 1);
  const touch = new Set<string>();
  for (const [v, k] of leaving) if (k > 1) touch.add(`${String(X[v])},${String(Y[v])}`);
  const created = new Set<VertexId>(d.sh === null ? [] : d.sh.journal.vertices);
  const next = T.next;
  const guardMax = 4 * T.origin.length;
  const done = new Set<HalfEdgeId>();
  const out: Ring[] = [];
  for (const h0 of B) {
    if (done.has(h0)) continue;
    const cyc: HalfEdgeId[] = [];
    let h = h0;
    let guard = 0;
    do {
      done.add(h);
      cyc.push(h);
      let g = next[h];
      while (!bnd(g)) {
        g = next[g ^ 1];
        if (++guard > guardMax) return err('E_INVARIANT', DRY_UNCLOSED);
      }
      h = g;
      if (++guard > guardMax) return err('E_INVARIANT', DRY_UNCLOSED);
    } while (h !== h0);
    // a finer vertex the read did not make, on F's own boundary, is skipped: the L1 route skips it (§2.2 rule 3)
    const m = cyc.length;
    const vs: VertexId[] = [];
    for (let i = 0; i < m; i += 1) {
      const v = O[cyc[i]];
      if (L[v] > 1 && !created.has(v) && (leaving.get(v) ?? 0) < 2 && boundaryOfF(cyc[(i + m - 1) % m]) && boundaryOfF(cyc[i])) continue;
      vs.push(v);
    }
    for (const loop of simpleLoops(vs)) {
      const pts = dropStraight(
        loop.map((v) => ({ x: X[v] as Cm, y: Y[v] as Cm })),
        (q) => touch.has(`${String(q.x)},${String(q.y)}`),
      );
      if (pts.length < 3 || area2(pts) === 0) continue;
      out.push(canonicalRing(pts));
    }
  }
  return ok(out.map(unspiked).filter((q) => q.length >= 3 && area2(q) !== 0).sort(compareRings), d.warnings.map((w) => ({ ...w })));
}

/** The refusal of a read whose kept face holds a part's region deeper than an insertion moves a boundary point (N-45 (a)). */
export const KEPT_DEEP = 'arr: a kept face of the dry-run holds a point of a part deeper than an insertion moves a boundary point (N-45)';

/**
 * Where the face (a record of level n) holds a part's region, as given (clipped), deeper than an insertion's move: the
 * part's index and the sample, or null where it stands clear. Sampled at the midpoint
 * of every interval its outline cuts from each horizontal line halfway between two consecutive distinct vertex heights
 * (`interiorPoint`'s lines, every interval): a sample inside a part farther than `DRY_MOVE_CM` from the part's outline
 * is no insertion's move — the face holds part of the band. A sample within it is an attracted case's sliver (a part
 * thinner there than an insertion's move, or its edge moved onto F's boundary): accepted.
 */
function keptDeep(p: Plat, level: Level, c: FaceId, parts: readonly (readonly LatticePoint[])[]): RefusedAt | null {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const rings = faceWalk(p, level, c).map((r) => r.map((h) => ({ x: X[O[h]], y: Y[O[h]] })));
  const box = boxOf(rings as LatticePoint[][]);
  const near = parts.flatMap((q, i) => {
    const b = boxOf([q]);
    return b.x1 >= box.x0 && b.x0 <= box.x1 && b.y1 >= box.y0 && b.y0 <= box.y1 ? [i] : [];
  });
  if (near.length === 0) return null;
  const ys = [...new Set(rings.flatMap((r) => r.map((q) => q.y)))].sort((a, b) => a - b);
  for (let k = 0; k + 1 < ys.length; k += 1) {
    const qy = (ys[k] + ys[k + 1]) * 0.5;
    const xs: number[] = [];
    for (const r of rings) {
      for (let i = 0; i < r.length; i += 1) {
        const a = r[i];
        const b = r[(i + 1) % r.length];
        if (a.y < qy === b.y < qy) continue;
        const t = div(qy - a.y, b.y - a.y);
        if (t !== null) xs.push(a.x + t * (b.x - a.x));
      }
    }
    xs.sort((a, b) => a - b);
    for (let i = 0; i + 1 < xs.length; i += 2) {
      const q = { x: (xs[i] + xs[i + 1]) * 0.5, y: qy };
      for (const i of near) if (windingOf(parts[i], q) !== 0 && distToRings([parts[i]], q) > DRY_MOVE_CM) return { part: i, x: q.x, y: q.y };
    }
  }
  return null;
}

/** The census's result (J318; C-0380, C-0381): the edge spines' kerb (the base) and the vertex-only spines it added. */
export interface SpineCensus {
  readonly base: KernelResult<Ring[]>;
  readonly reaching: readonly string[];
}

/**
 * Does one of the parts hold the ring — every vertex of it inside the part or on its boundary, and no edge of it
 * properly crossing one of the part's (exact on lattice points)? Each part is a simple ring, so the ring's region then
 * lies within it.
 */
function coveredBy(parts: readonly Ring[], ring: readonly LatticePoint[]): boolean {
  const inOrOn = (part: Ring, q: LatticePoint): boolean => {
    let w = 0;
    for (let k = 0; k < part.length; k += 1) {
      const a = part[k];
      const b = part[(k + 1) % part.length];
      const o = orient2d(a.x, a.y, b.x, b.y, q.x, q.y);
      if (o === 0 && q.x >= Math.min(a.x, b.x) && q.x <= Math.max(a.x, b.x) && q.y >= Math.min(a.y, b.y) && q.y <= Math.max(a.y, b.y)) return true;
      if (a.y <= q.y) {
        if (b.y > q.y && o > 0) w += 1;
      } else if (b.y <= q.y && o < 0) w -= 1;
    }
    return w !== 0;
  };
  const crosses = (part: Ring): boolean => {
    for (let i = 0; i < ring.length; i += 1) {
      const a = ring[i];
      const b = ring[(i + 1) % ring.length];
      for (let k = 0; k < part.length; k += 1) {
        const c = part[k];
        const e = part[(k + 1) % part.length];
        const o1 = orient2d(a.x, a.y, b.x, b.y, c.x, c.y);
        const o2 = orient2d(a.x, a.y, b.x, b.y, e.x, e.y);
        const o3 = orient2d(c.x, c.y, e.x, e.y, a.x, a.y);
        const o4 = orient2d(c.x, c.y, e.x, e.y, b.x, b.y);
        if (((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0))) return true;
      }
    }
    return false;
  };
  return parts.some((part) => part.length >= 3 && ring.every((q) => inOrOn(part, q)) && !crosses(part));
}

/** The read on one dry-run: the edge spines' parts, the census's base and reach, the reaching spines' parts (module comment). */
function censusRead(d: Dry, f: ReturnType<typeof readFace>): { k: KernelResult<Ring[]>; spines: Map<string, Spine>; census?: SpineCensus } {
  const e = f.spines.size === 0 ? ok<Ring[]>([]) : kerbParts(f.rings, f.spines);
  if (!e.ok) return { k: e, spines: f.spines };
  // F within one part (a strip, a join or an end, every part a simple ring): kerb(F) is empty, read from the geometry
  // alone — nothing is laid (a sliver face along a spine, whose strip covers it, routes no part edge beside F's own)
  const ins = coveredBy(e.value, f.rings[0]) ? ok(null) : dryInsert(d, e.value);
  const base = !ins.ok ? err<Ring[]>(ins.code, ins.detail) : coveredBy(e.value, f.rings[0]) ? ok<Ring[]>([]) : dryRegion(d);
  if (f.through.length === 0) return { k: base, spines: f.spines };
  // C-0380 (2): where the edge spines' kerb cannot be read, the read refuses with it — no vertex-only spine added
  if (!base.ok) return { k: base, spines: f.spines, census: { base, reaching: [] } };
  const reaching = f.through.filter((s) => reaches(s, base.value));
  const census: SpineCensus = { base, reaching: reaching.map((s) => s.key) };
  if (reaching.length === 0) return { k: base, spines: f.spines, census };
  const spines = new Map(f.spines);
  for (const s of reaching) spines.set(s.key, s);
  const v = kerbParts(f.rings, new Map(reaching.map((s) => [s.key, s])));
  if (!v.ok) return { k: v, spines, census };
  if (coveredBy(v.value, f.rings[0])) return { k: ok([]), spines, census };
  // (F − E) − V on the one arrangement: the reaching spines' parts laid on the arena that holds the edge spines' (C-0381)
  const first = d.clipped.length;
  const vi = dryInsert(d, v.value);
  if (!vi.ok) return { k: err(vi.code, vi.detail), spines, census };
  const full = dryRegion(d);
  // the post-condition (C-0381, N-45): no vertex deeper into a vertex-only band than an insertion moves a boundary point
  if (full.ok) {
    for (const s of reaching) {
      const q = deepIn(full.value, s, DRY_MOVE_CM);
      if (q === null) continue;
      // the refusing place: the reaching spines' part holding the vertex (the nearest one where none holds it)
      const own = d.clipped.slice(first);
      let part = own.findIndex((r) => windingOf(r, q) !== 0);
      if (part < 0) part = own.reduce((best, r, i) => (distToRings([r], q) < distToRings([own[best]], q) ? i : best), 0);
      d.refusedAt = { part: first + part, x: q.x, y: q.y };
      return { k: err('E_INVARIANT', CENSUS_DEEP), spines, census };
    }
  }
  return { k: full, spines, census };
}

/**
 * A point strictly inside the face (a record of level n), as far from its boundary across as the face allows: on each
 * horizontal line halfway between two consecutive distinct vertex heights (never through a vertex), the face's
 * crossings paired off (even-odd: outer ring and holes), and the midpoint of the widest interval over all those lines.
 * A point deep in the face's widest cross-section stays inside the region the face stands for when attraction bent its
 * outline by a few centimetres at one vertex — which an ear's centroid beside that vertex does not (C-0218 (10)). Null
 * where the face has no interval (never for a face of positive area). bandUnion's read-back (the dry-run's labels
 * take the deepest candidate, `labelPoint`).
 */
export function interiorPoint(p: Plat, level: Level, c: FaceId): XY | null {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const rings = faceWalk(p, level, c).map((r) => r.map((h) => ({ x: X[O[h]], y: Y[O[h]] })));
  const ys = [...new Set(rings.flatMap((r) => r.map((q) => q.y)))].sort((a, b) => a - b);
  let best: XY | null = null;
  let bestW = 0;
  for (let k = 0; k + 1 < ys.length; k += 1) {
    const qy = (ys[k] + ys[k + 1]) * 0.5;
    const xs: number[] = [];
    for (const r of rings) {
      for (let i = 0; i < r.length; i += 1) {
        const a = r[i];
        const b = r[(i + 1) % r.length];
        if (a.y < qy === b.y < qy) continue;
        const t = div(qy - a.y, b.y - a.y);
        if (t === null) continue;
        xs.push(a.x + t * (b.x - a.x));
      }
    }
    xs.sort((a, b) => a - b);
    for (let i = 0; i + 1 < xs.length; i += 2) {
      const w = xs[i + 1] - xs[i];
      if (w > bestW) {
        bestW = w;
        best = { x: (xs[i] + xs[i + 1]) * 0.5, y: qy };
      }
    }
  }
  return best;
}

/**
 * The point a face of the dry-run is labelled at: of `interiorPoint`'s candidates — the midpoint of every interval on
 * each horizontal line halfway between two consecutive distinct vertex heights — the one farthest from the face's
 * boundary (the least distance to its edges, a tie by the earlier line and interval). A part's cycle joins its points on
 * a window line by straight chords (`cycleOf`), while the arena holds F's edge there through lattice vertices up to a
 * hot pixel off that chord; a label within that of the face's boundary can fall on the wrong side of the chord (a
 * band face read as kerb: N-45 (a); the agreement run's unattracted case, notes row 55), one deeper inside cannot.
 */
function labelPoint(p: Plat, level: Level, c: FaceId): XY | null {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const rings = faceWalk(p, level, c).map((r) => r.map((h) => ({ x: X[O[h]], y: Y[O[h]] })));
  const ys = [...new Set(rings.flatMap((r) => r.map((q) => q.y)))].sort((a, b) => a - b);
  const cands: { q: XY; w: number; i: number }[] = [];
  for (let k = 0; k + 1 < ys.length; k += 1) {
    const qy = (ys[k] + ys[k + 1]) * 0.5;
    const xs: number[] = [];
    for (const r of rings) {
      for (let i = 0; i < r.length; i += 1) {
        const a = r[i];
        const b = r[(i + 1) % r.length];
        if (a.y < qy === b.y < qy) continue;
        const t = div(qy - a.y, b.y - a.y);
        if (t !== null) xs.push(a.x + t * (b.x - a.x));
      }
    }
    xs.sort((a, b) => a - b);
    for (let i = 0; i + 1 < xs.length; i += 2) if (xs[i + 1] > xs[i]) cands.push({ q: { x: (xs[i] + xs[i + 1]) * 0.5, y: qy }, w: xs[i + 1] - xs[i], i: cands.length });
  }
  // the widest first: a candidate's distance to the boundary is at most half its interval, so the search stops there
  cands.sort((a, b) => b.w - a.w || a.i - b.i);
  let best: { q: XY; d: number; i: number } | null = null;
  for (const cd of cands) {
    if (best !== null && cd.w * 0.5 < best.d) break;
    const d = distToRings(rings, cd.q);
    if (best === null || d > best.d || (d === best.d && cd.i < best.i)) best = { q: cd.q, d, i: cd.i };
  }
  return best === null ? null : best.q;
}

/** The post-condition's refusal (C-0381): a vertex of the region deeper in a vertex-only buffer than an insertion moves a boundary point. */
export const CENSUS_DEEP = 'arr: a vertex of the region lies deeper in a vertex-only buffer than an insertion moves a boundary point (C-0381)';

/** Where a dry-run's post-condition refused: the part's index (its row `arr:dry:<i>`) and the point found deep in it. */
export interface RefusedAt {
  readonly part: number;
  readonly x: number;
  readonly y: number;
}

/** The arena's last kerb read: its face, the vertex-only spines its census added, and where a post-condition refused it. */
export interface LastRead {
  readonly face: FaceId;
  readonly reaching: readonly string[];
  readonly refusedAt: RefusedAt | null;
}

/** The census of the last read on each arena (kept beside the arena, never on it; a diagnostic, as bandClosings). */
const CENSUS = new WeakMap<Plat, LastRead>();

/**
 * The face of the arena's last kerb read, the vertex-only spines its census added and the place its post-condition
 * refused at (the refusal replay reads it, J433: the replay judges the insertion's hold of that part on its own).
 */
export function kerbCensus(p: Plat): LastRead | null {
  return CENSUS.get(p) ?? null;
}

/**
 * The face read and its kerb (`corridorUnion` and `bandUnion` read the same function, §3.7), on the open transaction's
 * arena by the dry-run (the module comment); `vertexContacts` as `readFace` takes it (corridorUnion's and `kerb`'s true,
 * bandUnion's false). The overlay must be open (`openTx`: a shell or a closed transaction is a programming error). Reads
 * only: the arena, its index and the batch's work, warnings and journals are as the read found them.
 */
export function readKerb(o: Overlay, face: FaceId, widths: SpineWidths, cache?: Map<string, Spine | null>, vertexContacts = true): KernelResult<KerbRead> {
  const t = openTx(o);
  const p = t.plat;
  const f = readFace(p, face, widths, cache, vertexContacts);
  const d = dryRun(t, face, f.rings, f.seeds);
  let read: ReturnType<typeof censusRead>;
  try {
    read = censusRead(d, f);
  } finally {
    dryClose(d);
  }
  CENSUS.set(p, { face, reaching: read.census?.reaching ?? [], refusedAt: d.refusedAt });
  const k = read.k;
  if (!k.ok) return err(k.code, k.detail);
  const spines = read.spines;
  const region = k.value.map((r) => r.slice());
  const sp = splitsOn(p, f.edges, spines, region);
  if (!sp.ok) return err(sp.code, sp.detail);
  const value: KerbRead = { face, rings: f.rings, edges: f.edges, spines, kerb: sp.value.rings, splits: sp.value.splits, warnings: k.warnings.map((w) => ({ ...w })), region, ...(read.census === undefined ? {} : { census: read.census }) };
  return ok(value, k.warnings);
}

/**
 * The junctions' corridor_split chains on a region read for F (`KerbRead.region`), each split end spliced into it: the
 * kerb's rings and the splits (C-0212 (5)) — `readKerb`'s last step, on the region its dry-run traced. Given another region
 * of the same face (a recorded one), the same junction rules on it: the splits are a function of F's route, its spines
 * and the region alone.
 */
export function splitsOn(p: Plat, edges: readonly RouteEdge[][], spines: ReadonlyMap<string, Spine>, region: readonly (readonly LatticePoint[])[]): KernelResult<{ rings: Ring[]; splits: LatticePoint[][] }> {
  const rings = region.map((r) => r.slice());
  const splits: LatticePoint[][] = [];
  if (spines.size > 0 && rings.length > 0) {
    for (const jn of junctionsOf(p, edges, spines)) {
      // each split in the band, never across a block (`splitChain`'s guard; C-0212 (5), N-52 (2), C-0281)
      const sc = splitChain(p, rings, jn);
      if (!sc.ok) return err(sc.code, sc.detail);
      if (sc.value !== null) splits.push(sc.value);
    }
  }
  // a splice on a kerb edge collinear with its neighbour can fold the ring back on itself: spikes dropped again
  const kerbRings = rings.map(unspiked).filter((q) => q.length >= 3 && area2(q) !== 0).sort(compareRings);
  return ok({ rings: kerbRings, splits });
}

/**
 * §3.4's `kerb(face)`: kerb(F) of an L1 face, committed or in the open overlay — what `corridorUnion` commits (§3.7).
 * Read-only, on the open transaction's arena (the dry-run); the warnings are its insertions' (§3.7's split reads them).
 */
export function kerb(tx: Overlay, face: FaceId, widths: SpineWidths): KernelResult<Ring[]> {
  const r = readKerb(tx, face, widths);
  if (!r.ok) return err(r.code, r.detail);
  return ok(r.value.kerb, r.value.warnings);
}

// ---- the junctions and their corridor_split chains -------------------------------------------------------------------
//
// Computed with the kerb, so the kerb point each split reaches is a vertex of kerb(F) itself (C-0212 (4), (5)); the
// rules are bandUnion.ts's module comment. N-52 (2) (J239; C-0277): a junction's split stays within its REACH —
// 2·max(hwIn, hwOut) + attractCm of J — so a corner is geometric: F turns left between two spines AND the strips'
// inner edges meet within reach (or, at a corner sharper than a right angle, at a vertex the kerb holds there); a
// left turn whose inner edges meet beyond reach or nowhere (all but parallel: a width step between two nearly
// collinear spines) is §3.7's straight-through case, one split from J to the foot of its perpendicular on the kerb; a
// kerb point is accepted only within reach of J (never a far vertex), and a chain that would enter kerb(F)'s interior is
// not drawn — the junction's next target is tried instead (`splitChain`; C-0281).

const ATTRACT = LATTICE.attractCm;
/** 2²⁰: small denominators are scaled by it before ratio() (exact: a power of two). */
const SCALE = 1_048_576;

export type XY = { x: number; y: number };

/** num ÷ den through `ratio()` (the division rule, C-0044), or null. */
export function div(num: number, den: number): number | null {
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

/**
 * The meeting point of the line through a along u and the line through b along v (doubles), or null when the lines are
 * near-parallel — their directions within `minFaceAngle` of each other either way round, the kernel's straight-on
 * tolerance (`nearParallel`, the test insertion shares stretches by): there the meeting point runs off to any distance
 * on a centimetre's change of offset, and is no kerb corner (N-52 (2)).
 */
export function meet(a: XY, u: XY, b: XY, v: XY): XY | null {
  if (nearParallel(u.x, u.y, v.x, v.y)) return null;
  const den = u.x * v.y - u.y * v.x;
  const t = div((b.x - a.x) * v.y - (b.y - a.y) * v.x, den);
  if (t === null) return null;
  return { x: a.x + t * u.x, y: a.y + t * u.y };
}

/** Is q within `r` cm of J (inclusive)? */
function within(q: XY, J: XY, r: number): boolean {
  return (q.x - J.x) * (q.x - J.x) + (q.y - J.y) * (q.y - J.y) <= r * r;
}

/**
 * One junction of a face: its vertex J, the route vertices before and after it on the walk, the in- and out-edges'
 * half-widths at their two ends, its reach, and whether it is a corner of F (a left turn between two spines whose
 * strips' inner edges meet within reach, or at a turn sharper than a right angle) with the inner edges' meeting point.
 */
export interface Junction {
  readonly j: VertexId;
  readonly prev: VertexId;
  readonly next: VertexId;
  /** The in-edge's spine half-width at its start (prev) and at J. */
  readonly hwA: number;
  readonly hwIn: number;
  /** The out-edge's spine half-width at J and at its end (next). */
  readonly hwOut: number;
  readonly hwB: number;
  /** 2·max(hwIn, hwOut) + attractCm: how far from J a split of this junction may reach (N-52 (2)). */
  readonly reach: number;
  readonly corner: boolean;
  /** At a corner: the turn is sharper than a right angle (the kerb corner may lie beyond reach, on the bisector). */
  readonly acute: boolean;
  /** At a corner: the meeting point of the two strips' inner edges; else null. */
  readonly meet: XY | null;
}

/**
 * The meeting point of the in- and out-strips' inner edges at a junction — each the line between its segment's two ends
 * offset to F's side by their half-widths (the trapezoid, §3.7) — or null where they are near-parallel.
 */
function innerMeet(A: XY, J: XY, B: XY, hwA: number, hwIn: number, hwOut: number, hwB: number): XY | null {
  const u = unit(A, J);
  const v = unit(J, B);
  if (u === null || v === null) return null;
  // The left normals (the face lies on the left of its walk).
  const nu: XY = { x: -u.y, y: u.x };
  const nv: XY = { x: -v.y, y: v.x };
  const a0: XY = { x: A.x + nu.x * hwA, y: A.y + nu.y * hwA };
  const a1: XY = { x: J.x + nu.x * hwIn, y: J.y + nu.y * hwIn };
  const b0: XY = { x: J.x + nv.x * hwOut, y: J.y + nv.y * hwOut };
  const b1: XY = { x: B.x + nv.x * hwB, y: B.y + nv.y * hwB };
  const du = unit(a0, a1);
  const dv = unit(b0, b1);
  return du === null || dv === null ? null : meet(a0, du, b0, dv);
}

/** The junctions of a face's boundary (bandUnion.ts's module comment), in walk order ring by ring. */
export function junctionsOf(p: Plat, edges: readonly RouteEdge[][], spines: ReadonlyMap<string, Spine>): Junction[] {
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
      const hwA = hwOf(ein.spines, ein.a);
      const hwIn = hwOf(ein.spines, j);
      const hwOut = hwOf(eout.spines, j);
      const hwB = hwOf(eout.spines, eout.b);
      const reach = 2 * Math.max(hwIn, hwOut) + ATTRACT;
      const A: XY = { x: X[ein.a], y: Y[ein.a] };
      const J: XY = { x: X[j], y: Y[j] };
      const B: XY = { x: X[eout.b], y: Y[eout.b] };
      const o = orient2d(A.x, A.y, J.x, J.y, B.x, B.y);
      // exact on lattice points: the walk turns by more than a right angle at J
      const acute = (J.x - A.x) * (B.x - J.x) + (J.y - A.y) * (B.y - J.y) < 0;
      const mt = !shared && o > 0 ? innerMeet(A, J, B, hwA, hwIn, hwOut, hwB) : null;
      const corner = mt !== null && (acute || within(mt, J, reach));
      out.push({ j, prev: ein.a, next: eout.b, hwA, hwIn, hwOut, hwB, reach, corner, acute, meet: corner ? mt : null });
    }
  }
  return out;
}

/** The kerb vertex nearest q within `r` cm of it, or null. */
function vertexNear(rings: readonly LatticePoint[][], q: XY, r: number): LatticePoint | null {
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

/** A kerb point a split reaches, and the ring it was spliced into (null where it was a vertex already). */
interface Reached {
  readonly v: LatticePoint;
  readonly spliced: { readonly ring: LatticePoint[]; readonly v: LatticePoint } | null;
}

/**
 * The kerb point a split reaches, made a vertex of the kerb (C-0212 (5)): the point of the kerb nearest `q`, snapped; an
 * end of its kerb edge where it lands there or within `attractCm` of one (C-0281), else spliced into the ring between them — so
 * the kerb `kerb` returns and the kerb `corridorUnion` commits carry the split's end as one vertex (§4.6's S8 ≡ S9).
 * Accepted only within `reach` of the junction J (N-52 (2): never a far vertex); else null, the rings untouched.
 */
function spliceAt(rings: LatticePoint[][], q: XY, J: XY, reach: number): Reached | null {
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
  // within attractCm of an end the insertion would attract the one onto the other (§3.6), so the end is the point
  // (C-0281: an end within minEdge only left a splice 25–26 cm off a kerb corner that S9's commit then pulled the
  // corner onto — S9's block a sliver off S8's)
  const min = ATTRACT * ATTRACT;
  if (da <= min || db <= min) {
    const end = da <= db ? a : b;
    if (within(end, J, reach)) return { v: end, spliced: null };
    // the end lies beyond reach: the point itself where it is a vertex apart from the end (≥ minEdge) and within reach
    if (Math.min(da, db) < LATTICE.minEdgeCm * LATTICE.minEdgeCm) return null;
  }
  if (!within(v, J, reach)) return null;
  ring.splice(bi + 1, 0, v);
  return { v, spliced: { ring, v } };
}

/**
 * The corridor_split chain at one junction (bandUnion.ts's module comment), snapped, its kerb end a vertex of the kerb
 * (spliced in for it where it was not one), or null when no target gives a chain that stays in the band.
 *
 * The targets in turn (C-0277 (4)): at a corner, (i) the kerb's vertex within attractCm of the strips' inner edges'
 * meeting point m (within reach of J, or anywhere at a corner sharper than a right angle, C-0277 (2)), the wedge through
 * it; (ii) the kerb point nearest m, where m lies within reach, the wedge through it; then at every junction (iii) the
 * straight-through aim, one split from J to the kerb point nearest it — each kerb point accepted only within reach of J.
 * A corridor_split lies in the band (§3.7): a candidate chain that would enter kerb(F)'s interior — a block — is not
 * drawn, the kerb point spliced in for it is taken out again, and the next target is tried (C-0212 (5) as refined by
 * N-52 (2) and C-0281): never a split across a block, and a corner whose wedge would cross a kerb tip still separates
 * its strips by the straight-through split where that one fits.
 */
function splitChain(p: Plat, kerbRings: LatticePoint[][], jn: Junction): KernelResult<LatticePoint[] | null> {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const J: XY = { x: X[jn.j], y: Y[jn.j] };
  const A: XY = { x: X[jn.prev], y: Y[jn.prev] };
  const B: XY = { x: X[jn.next], y: Y[jn.next] };
  const u = unit(A, J);
  const v = unit(J, B);
  if (u === null || v === null) return ok(null);
  // The left normals (the face lies on the left of its walk).
  const nu: XY = { x: -u.y, y: u.x };
  const nv: XY = { x: -v.y, y: v.x };
  // Straight through J, turning away from F, or a corner whose kerb corner is out of reach: one split from J to its
  // nearest kerb point — the foot of J's perpendicular on the kerb, aimed along the normals' bisector.
  let aim: XY = { x: J.x + nu.x * jn.hwIn, y: J.y + nu.y * jn.hwIn };
  const bis = unit({ x: 0, y: 0 }, { x: nu.x + nv.x, y: nu.y + nv.y });
  if (bis !== null) aim = { x: J.x + bis.x * Math.max(jn.hwIn, jn.hwOut), y: J.y + bis.y * Math.max(jn.hwIn, jn.hwOut) };
  // A candidate snapped and guarded: kept where it stays in the band, else its splice taken out (null: try the next).
  const fit = (chain: readonly XY[], spliced: Reached['spliced']): KernelResult<LatticePoint[] | null> => {
    const pts: LatticePoint[] = [];
    for (const q of chain) {
      const s = snap(q.x, q.y);
      if (!s.ok) return err(s.code, s.detail);
      const last = pts[pts.length - 1];
      if (last === undefined || last.x !== s.value.x || last.y !== s.value.y) pts.push(s.value);
    }
    if (pts.length >= 2 && !entersRegion(kerbRings, pts)) return ok(pts);
    if (spliced !== null) {
      const at = spliced.ring.indexOf(spliced.v);
      if (at >= 0) spliced.ring.splice(at, 1);
    }
    return ok(null);
  };
  if (jn.corner && jn.meet !== null) {
    const near = vertexNear(kerbRings, jn.meet, ATTRACT);
    if (near !== null && (jn.acute || within(near, J, jn.reach))) {
      const r = fit(wedge(J, A, B, near), null);
      if (!r.ok || r.value !== null) return r;
    }
    if (within(jn.meet, J, jn.reach)) {
      const K = spliceAt(kerbRings, jn.meet, J, jn.reach);
      if (K !== null) {
        const r = fit(wedge(J, A, B, K.v), K.spliced);
        if (!r.ok || r.value !== null) return r;
      }
    }
  }
  const K = spliceAt(kerbRings, aim, J, jn.reach);
  return K === null ? ok(null) : fit([J, K.v], K.spliced);
}

/** A corner's chain: from the kerb corner K to the foot of its perpendicular on each spine edge at J (C-0212 (4)). */
function wedge(J: XY, A: XY, B: XY, K: XY): XY[] {
  const ca = nearestOn(K, A, J);
  const cb = nearestOn(K, J, B);
  // A foot beyond its spine edge's far end (a corner whose strip is shorter than the crossed street's half-width): no
  // square wedge fits — the one split from J to the kerb corner separates the two strips there.
  if (ca.t <= 0 || cb.t >= 1) return [J, K];
  const fa = ca.p;
  const fb = cb.p;
  const nearJ = (q: XY): boolean => within(q, J, ATTRACT);
  const a = nearJ(fa);
  const b = nearJ(fb);
  if (a && b) return [J, K];
  if (a) return [J, K, fb];
  if (b) return [fa, K, J];
  return [fa, K, fb];
}

/** Is q on the segment s–t (exact on doubles)? */
function onSegment(q: XY, s: XY, t: XY): boolean {
  if (orient2d(s.x, s.y, t.x, t.y, q.x, q.y) !== 0) return false;
  return q.x >= Math.min(s.x, t.x) && q.x <= Math.max(s.x, t.x) && q.y >= Math.min(s.y, t.y) && q.y <= Math.max(s.y, t.y);
}

/** Is q strictly inside the kerb rings (non-zero winding, off every kerb edge)? */
function strictlyInside(rings: readonly LatticePoint[][], q: XY): boolean {
  let wind = 0;
  for (const r of rings) {
    for (let k = 0; k < r.length; k += 1) {
      const s = r[k];
      const t = r[(k + 1) % r.length];
      if (onSegment(q, s, t)) return false;
      if (s.y <= q.y) {
        if (t.y > q.y && orient2d(s.x, s.y, t.x, t.y, q.x, q.y) > 0) wind += 1;
      } else if (t.y <= q.y && orient2d(s.x, s.y, t.x, t.y, q.x, q.y) < 0) wind -= 1;
    }
  }
  return wind !== 0;
}

/**
 * Does the chain enter kerb(F)'s interior — a built block (N-52 (2): a split never crosses a block)? A segment that
 * properly crosses a kerb edge does; else the segment is cut at every kerb vertex on it and each piece is read at its
 * middle (a piece between two boundary contacts lies wholly inside or wholly outside a simple ring set). Exact on the
 * lattice points (orient2d).
 */
export function entersRegion(rings: readonly LatticePoint[][], chain: readonly LatticePoint[]): boolean {
  for (let i = 0; i + 1 < chain.length; i += 1) {
    const a = chain[i];
    const b = chain[i + 1];
    const cuts: number[] = [0, 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const l2 = dx * dx + dy * dy;
    for (const r of rings) {
      for (let k = 0; k < r.length; k += 1) {
        const s = r[k];
        const t = r[(k + 1) % r.length];
        const o1 = orient2d(a.x, a.y, b.x, b.y, s.x, s.y);
        const o2 = orient2d(a.x, a.y, b.x, b.y, t.x, t.y);
        const o3 = orient2d(s.x, s.y, t.x, t.y, a.x, a.y);
        const o4 = orient2d(s.x, s.y, t.x, t.y, b.x, b.y);
        if (((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0))) return true;
        if (o1 === 0 && l2 > 0) {
          const c = div((s.x - a.x) * dx + (s.y - a.y) * dy, l2);
          if (c !== null && c > 0 && c < 1) cuts.push(c);
        }
      }
    }
    cuts.sort((x, y) => x - y);
    for (let k = 0; k + 1 < cuts.length; k += 1) {
      if (cuts[k + 1] === cuts[k]) continue;
      const tm = (cuts[k] + cuts[k + 1]) * 0.5;
      if (strictlyInside(rings, { x: a.x + tm * dx, y: a.y + tm * dy })) return true;
    }
  }
  return false;
}
