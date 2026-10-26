// bandUnion(tx, chains, faces, edgeRole, owner) and the band engine `corridorUnion` shares (§3.4 `bandUnion`,
// `corridorUnion`; §3.7 *The kerb, defined once*, *Insets* — wall bands —, *The same functions on every arena*; §2.2
// rule 1's L2 and L3 views). M0-a-09.
//
// The engine, per L1 face F in canonical order (the faces' keys read before anything is written): F's kerb by the one
// function `kerb` reads (`readKerb`, kerb.ts) — F less the union of its spines' buffers — committed at the batch's
// level: (1) the kerb's outline, every maximal run of its edges that does not lie on F's own boundary (where the kerb
// follows a boundary that declares no half-width — a shore, a setback line — that boundary is already the edge),
// inserted through `insertChain` (the door) with the outline's row (`kerb` or `band`); (2) at every junction vertex J of
// F's boundary — a route vertex where the boundary passes from one buffered spine to another, or where one spine
// passes straight through a vertex at which a third L1 edge arrives (a T-junction whose street arrives from the other
// side) — the `corridor_split` edges (kerb.ts computes them with the kerb, so the kerb point a split reaches is a vertex
// of kerb(F) itself): at a corner of F (a left turn of its walk between two spines) the kerb corner K — the kerb's
// vertex at the meeting point of the two strips' inner edges — is joined to the foot of its perpendicular on each of
// the two spine edges at J, so the junction wedge (J, the two feet, K) is a face of its own and each half-corridor strip
// ends square, half the crossed street's width short of J (§3.7: "S9's corridor union and junction wedge produce [the
// stroke's square caps] without model trimming"; rule 1: "one junction wedge at each of its corners"); a foot within
// `attractCm` of J is J, and a foot beyond its spine edge (a strip shorter than the crossed half-width) leaves the one
// edge J → K; where the spine passes straight through J — or turns away from F there — there is no corner and no
// wedge: one edge from J to its nearest kerb point (the foot of J's perpendicular on a straight spine) separates the two
// strips (§3.7's T-junction clause). N-52 (2): every split stays within its junction's reach, 2·max(hwIn, hwOut) +
// attractCm of J — a left turn whose strips' inner edges meet beyond it or nowhere (a width step between two nearly
// collinear spines) is the straight-through case, a junction with no kerb point within reach draws no split, and a
// split that would enter kerb(F)'s interior is never drawn, the junction's next target tried instead (kerb.ts, `junctionsOf` / `splitChain` /
// `entersRegion`) — and one the insertion laid between two faces of F read outside the band is left out on the op's next
// run (`cutSplits`, round S13, C-0422); (3) the faces of the batch's level inside F are read back: a face whose interior
// area lies more than half inside kerb(F) as read (round S14: exactly, by strips) is outside the band — corridorUnion's built blocks — and every other is
// a band face: a junction wedge when two different spines bound it, a strip otherwise. A face with no record at the
// batch's level is its own child there (§2.2 rule 2): one built block when its kerb is not empty — a spine-less face,
// with no kerb or corridor_split edge — `BandResult.whole`, else all band, `BandResult.wholeBand`. A kerb piece or a
// split that collapses to one point (the insertion's E_DEGENERATE `empty`) adds nothing.
//
// N-57 (2) (C-0327, C-0346): an open piece's ends are closed on F's boundary. A contact within attractCm of the piece's
// vertex beside it — a dead-end lane's round cap meeting a spine-less edge, its last chord clipped to 25–26 cm — is
// attracted onto that vertex by the insertion (§3.6 step 2: the nearest vertex first), or the insertion leaves the
// contact a minEdge off the edge; either way the piece would end on a dangling tip, its strip one face with the block.
// So after a piece goes in, an end left as a tip (a vertex with the piece's one edge) within attractCm + 1 cm of its
// contact is closed (`closeEnds`), first of three ways:
//  - AT the contact: the contact pinned on F's boundary by `splitThrough` of the route piece of F's boundary it lies on
//    — planned first, written only where the placement puts it within the contact's 1 cm boundary reading plus the
//    route's hot pixel (`PIN_SQ`), never attracted — and the chord from the tip to it inserted: the vertex beside the
//    contact kept, the committed outline kerb(F)'s vertex for vertex (§13.2's Hausdorff 0);
//  - ALONG the kerb's run: where no vertex can stand at the contact beside the tip (§3.6's placement falls back onto
//    the route piece's endpoint — the round S3 defect closed onto that endpoint whichever side it lay, chords of metres,
//    blocks up to 343 cm beyond kerb(F)), the tip joined to the first vertex kerb(F)'s own run along F's boundary
//    reaches from the contact (`runVertex`): the chord lies within the tip's distance of that run, so the outline errs
//    by at most the tip's offset (≤ 2·√2·attractCm, N-43: the insertion's own displacement of the contact, which the
//    closing keeps and never adds to; notes row 32) — kept only where that vertex is one kerb(F) still holds when read
//    on the arena the run left (`offRead`, round S13, C-0421: an L1 read lays its parts at L2, kerb.ts `dryLevel`, so after an L2 op it
//    meets the op's own tip and chord and may read F's outline there otherwise — the run's vertex then off kerb(F) as
//    every later L1 read reads it, N-57 (2)'s bound broken on a committed result); off it, the end is pinned first;
//  - PINNED FIRST: where neither goes in, the op is put back and run again with that end pinned before its piece —
//    N-57 (2)'s own mechanism: the contact placed on F's boundary within attractCm (§3.6 step 2's endpoint rule), the
//    piece's vertices beside it within attractCm dropped, the piece inserted onto it (`insertPinned`).
// An end on F's boundary or on any vertex with more than the piece's edge is left as it is (no other committed geometry
// changes). The post-condition (N-45 (a)): an open piece whose end is still a dangling tip, or a pinned-first contact
// that cannot be placed within attractCm, refuses the op E_INVARIANT, naming the piece, the batch put back — never a
// merged face or a chord off kerb(F) committed. A short spur left inside a piece where attraction folded a sliver or a
// spike thinner than attractCm (C-0212 (8)'s KI) has its ends on F's boundary and passes. `bandClosings` reads back the
// closings of an arena's last band op (B-FUZZ's bound on them; no stage reads it).
//
// The op is atomic (M0-a-07's op savepoint): a refusal of any insertion — E_KEPT where an edge would cross kept finer
// content or come within `attractCm` of it (§3.7; the insertion's own test, §3.3), E_LEVEL, E_OUT_OF_RANGE, E_WORK_LIMIT,
// E_INVARIANT — puts the batch back as the op found it. Readings: C-0212.
import { compareFaces, faceWalk, facesOfOwner, handleOf, isFaceLive, isVertexLive, outgoing, pointOf, roleIdOf, rowsOn, type FaceId, type Plat, type RoleRow, type VertexId } from '../arena/index.js';
import { query } from '../index/index.js';
import { enter, opSave, overLimit, refuse, rollback } from '../faces/common.js';
import { insertChain } from '../insert/insertChain.js';
import { nearestRoutePiece } from '../insert/attractVertex.js';
import { applySplitPlan, planSplitThrough, TX_FACES_WALKED } from '../insert/index.js';
import { planPoint } from '../insert/splitThrough.js';
import { HOT_PIXEL_CM } from '../index/index.js';
import { dist2, err, LATTICE, ok, type KernelResult, type Warning } from '../num/index.js';
import { windingNumber } from '../num/exact.js';
import { chargeTx, check, noteRow, type OpenTx } from '../tx/state.js';
import { rewriteRows } from '../tx/relevel.js';
import { kernelOp, setOwner, type KernelOp, type Overlay } from '../tx/index.js';
import type { LineageHash } from '../hash/index.js';
import type { ChainProfile, ChainRef, Cm, FaceRef, Id, LatticePoint, Level, PlatKey } from '../types/index.js';
import { div, interiorPoint, nearestOn, readKerb, spineKey, type KerbRead, type Spine, type SpineEnd, type SpineWidths, type XY } from './kerb.js';
import type { Ring } from './winding.js';

/**
 * §3.4's `BandResult`: the faces a band op leaves at the batch's level, each list in canonical face order. Slots, valid
 * until the next commit (as `ChainInsert.placed`, §3.4).
 */
export interface BandResult {
  /** Every band face: corridorUnion's half-corridor strips and junction wedges, bandUnion's per-side parts. */
  readonly band: FaceId[];
  /** The band faces bounded by one spine: the half-corridor strips (a band's parts along one chain). */
  readonly strips: FaceId[];
  /** The band faces bounded by two spines: the junction wedges. */
  readonly wedges: FaceId[];
  /** The faces outside the band: corridorUnion's built blocks (bandUnion's remainder of each face). */
  readonly blocks: FaceId[];
  /** The L1 faces left whole as one built block — no bounding spine, or a kerb equal to F: its own child at the batch's level (§2.2 rule 2). */
  readonly whole: FaceId[];
  /**
   * The L1 faces wholly within their bands — an empty kerb, or a kerb sliver the commit folded onto F's boundary (C-0218
   * (7)): each one band face, its own child at the batch's level.
   */
  readonly wholeBand: FaceId[];
}

/** One chain of `bandUnion` (§3.4). */
export interface BandChain {
  readonly ref: ChainRef;
  readonly halfWidthCm: Cm | number | ChainProfile<number>;
  readonly ends: SpineEnd;
}

/** A kerb edge lies on the face's boundary where its ends and midpoint stand within the hot pixel of it (cm²: 1 cm). */
const ON_BOUNDARY_SQ = 1;

/** Is the point within the hot pixel of the face's boundary (any route edge)? */
function onBoundary(rings: readonly (readonly XY[])[], q: XY): boolean {
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) if (nearestOn(q, r[i], r[(i + 1) % r.length]).d2 <= ON_BOUNDARY_SQ) return true;
  }
  return false;
}

/**
 * The non-zero winding of a ring set at q: exact.ts's one crossing rule (`windingNumber`, Sunday's crossings, orient2d
 * exact) summed over the rings — an open reading with no on-edge test of its own (N-c2-1: no private copy of the rule).
 */
function windsRound(rings: readonly (readonly XY[])[], q: XY): boolean {
  let wind = 0;
  for (const r of rings) wind += windingNumber(r, q.x, q.y);
  return wind !== 0;
}

/** Is the point strictly inside the face's route rings (non-zero winding, orient2d exact) and off their hot pixel? */
function insideRings(rings: readonly (readonly XY[])[], q: XY): boolean {
  if (onBoundary(rings, q)) return false;
  return windsRound(rings, q);
}

/** The kerb's outline pieces off F's boundary: closed rings, or open runs between two boundary contacts. */
export function outlinePieces(read: KerbRead): { points: LatticePoint[]; closed: boolean }[] {
  const out: { points: LatticePoint[]; closed: boolean }[] = [];
  for (const ring of read.kerb) {
    const n = ring.length;
    const on: boolean[] = [];
    for (let i = 0; i < n; i += 1) {
      const a = ring[i];
      const b = ring[(i + 1) % n];
      on.push(onBoundary(read.rings, a) && onBoundary(read.rings, b) && onBoundary(read.rings, { x: (a.x + b.x) * 0.5, y: (a.y + b.y) * 0.5 }));
    }
    if (on.every((x) => !x)) {
      out.push({ points: ring.slice(), closed: true });
      continue;
    }
    if (on.every((x) => x)) continue;
    const start = (on.indexOf(true) + 1) % n;
    let cur: LatticePoint[] | null = null;
    for (let j = 0; j < n; j += 1) {
      const i = (start + j) % n;
      if (!on[i]) {
        if (cur === null) cur = [ring[i]];
        cur.push(ring[(i + 1) % n]);
      } else if (cur !== null) {
        out.push({ points: cur, closed: false });
        cur = null;
      }
    }
    if (cur !== null) out.push({ points: cur, closed: false });
  }
  return out;
}

/** The spans of the horizontal line y = qy inside the ring set (non-zero winding; qy through no vertex), in x order. */
function spansAt(rings: readonly (readonly XY[])[], qy: number): [number, number][] {
  const xs: { x: number; w: number }[] = [];
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      if (a.y < qy === b.y < qy) continue;
      xs.push({ x: a.x + (div((qy - a.y) * (b.x - a.x), b.y - a.y) ?? 0), w: b.y > a.y ? 1 : -1 });
    }
  }
  xs.sort((u, v) => u.x - v.x || u.w - v.w);
  const out: [number, number][] = [];
  let wind = 0;
  for (let i = 0; i < xs.length; i += 1) {
    const was = wind;
    wind += xs[i].w;
    if (was === 0 && wind !== 0) out.push([xs[i].x, xs[i].x]);
    else if (was !== 0 && wind === 0) out[out.length - 1][1] = xs[i].x;
  }
  return out;
}

/**
 * The share of a face's area (a record of level n) that lies inside the ring set, exactly up to the doubles: the strips
 * between consecutive heights at which either has a vertex hold no vertex of either, so in each the length of a
 * horizontal line inside the face, and inside both, is linear in its height and the strip's midline gives the strip's
 * area exactly. Null where the face has no area.
 */
function shareInside(p: Plat, level: Level, c: FaceId, rings: readonly Ring[]): number | null {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const face = faceWalk(p, level, c).map((r) => r.map((h) => ({ x: X[O[h]], y: Y[O[h]] })));
  let y0 = Infinity;
  let y1 = -Infinity;
  for (const r of face) for (const q of r) {
    y0 = Math.min(y0, q.y);
    y1 = Math.max(y1, q.y);
  }
  const ys = [...new Set([...face.flat(), ...rings.flat()].map((q) => q.y).filter((y) => y >= y0 && y <= y1))].sort((a, b) => a - b);
  let all = 0;
  let inside = 0;
  for (let k = 0; k + 1 < ys.length; k += 1) {
    const h = ys[k + 1] - ys[k];
    const qy = (ys[k] + ys[k + 1]) * 0.5;
    const fs = spansAt(face, qy);
    const ks = rings.length === 0 ? [] : spansAt(rings, qy);
    let j = 0;
    for (const [a, b] of fs) {
      all += h * (b - a);
      while (j < ks.length && ks[j][1] <= a) j += 1;
      for (let m = j; m < ks.length && ks[m][0] < b; m += 1) inside += h * (Math.min(b, ks[m][1]) - Math.max(a, ks[m][0]));
    }
  }
  return all > 0 ? div(inside, all) : null;
}

/**
 * Is the face (a record of level n) inside the kerb? By area (`byArea`, a face of the batch's level): more than half its
 * area inside kerb(F) as read (`shareInside`, exact) — the choice of faces whose union differs least from kerb(F)
 * (§13.2's S8 ≡ S9). Hardening round S14 (notes row 28): the commit's outline may stand up to N-43's bound off kerb(F)
 * as read (attraction, §3.6's placement), so a face may straddle the read's outline — read at one point, the middle of
 * its widest cross-section, a kerb triangle whose widest stretch lay in that sliver was classed band (a block 147 cm
 * deep lost, seed 1012 draw 4066) and a junction wedge a block (204 cm deep in the band, draw 8706). Else (an L1 face
 * with nothing written inside it, its own child at the batch's level) at its interior point (`interiorPoint`) by the
 * non-zero winding of the kerb rings there (`windsRound`): a kerb sliver the commit folded reads outside. Null where the
 * face has no area.
 */
function insideKerb(p: Plat, level: Level, c: FaceId, kerbRings: readonly Ring[], byArea = true): boolean | null {
  const rs = kerbRings;
  if (!byArea) {
    const q = interiorPoint(p, level, c);
    return q === null ? null : windsRound(rs, q);
  }
  const s = shareInside(p, level, c, rs);
  return s === null ? null : s > 0.5;
}

/** Is there a vertex at the lattice point with an incident edge carrying the outline's role? */
export function onOutline(p: Plat, key: PlatKey, q: LatticePoint, outlineRole: number): boolean {
  const vs = query(p, key, 4, { minX: q.x, minY: q.y, maxX: q.x, maxY: q.y }, { vertices: true }).vertices;
  for (const v of vs) {
    if (!isVertexLive(p, v) || p.vertices.x[v] !== q.x || p.vertices.y[v] !== q.y) continue;
    for (const h of outgoing(p, v)) if (rowsOn(p, 'edge', h).some((r) => p.roles.kind[r] === outlineRole)) return true;
  }
  return false;
}

/** A face's reading (kerb.ts). */
type Read = Parameters<typeof outlinePieces>[0];

/** An outline piece as `outlinePieces` gives it: a closed ring, or an open run between two boundary contacts. */
type Piece = { points: LatticePoint[]; closed: boolean };

/**
 * A pinned contact stands AT its contact (N-57 (2), C-0346): within the contact's boundary reading (1 cm, `onBoundary`)
 * plus the route's hot pixel (§3.3's 0.71 cm, the placement's test (i)) — cm², (1 + 0.71)².
 */
const PIN_SQ = (1 + HOT_PIXEL_CM) * (1 + HOT_PIXEL_CM);

/** attractCm (§3.2 (2)), squared. */
const ATTRACT_SQ = LATTICE.attractCm * LATTICE.attractCm;

/** The longest closing chord (cm): attractCm, and 1 cm of the contact's boundary reading. */
const CHORD_MAX = LATTICE.attractCm + 1;

/**
 * The farthest a tip closed along the kerb's run may stand from its contact (cm²): (2·√2·attractCm)², the bound the
 * item's hardening census reads a block beyond kerb(F) by (C-0327 (3)) — the insertion's own displacement of the contact,
 * which the closing keeps and never adds to.
 */
const ALONG_SQ = 8 * LATTICE.attractCm * LATTICE.attractCm;

/** An along-run closing as the read-back needs it: the tip, the run's vertex, and which end of its piece. */
interface Along {
  readonly face: FaceId;
  readonly tip: VertexId;
  readonly far: VertexId;
  readonly piece: number;
  readonly end: 0 | 1;
}

/**
 * One closing of an op (`bandClosings`): `chord` — a tip closed by the chord to its contact pinned at it; `along` — a tip
 * within 2·√2·attractCm of its contact closed by the chord to `pin`, the vertex the kerb's run along F's boundary
 * reaches first from the contact (the chord within the tip's distance of the run); `pinned` — the contact pinned first and
 * `dropped` vertices of the piece beside it (within attractCm) left out; `folded` — a sliver piece no closing could
 * close, every point of it within `widthCm` ≤ attractCm of F's boundary, left out (its kerb sliver folded onto F's
 * boundary, C-0218 (7)).
 */
export type Closing =
  | { readonly kind: 'chord'; readonly face: FaceId; readonly piece: number; readonly end: 0 | 1; readonly contact: LatticePoint; readonly pin: LatticePoint; readonly tip: LatticePoint; readonly chordCm: number }
  | { readonly kind: 'along'; readonly face: FaceId; readonly piece: number; readonly end: 0 | 1; readonly contact: LatticePoint; readonly pin: LatticePoint; readonly tip: LatticePoint }
  | { readonly kind: 'pinned'; readonly face: FaceId; readonly piece: number; readonly end: 0 | 1; readonly contact: LatticePoint; readonly pin: LatticePoint; readonly dropped: readonly LatticePoint[] }
  | { readonly kind: 'folded'; readonly face: FaceId; readonly piece: number; readonly end: 0 | 1; readonly contact: LatticePoint; readonly pin: LatticePoint; readonly widthCm: number };

/** Each arena's closings of its last band op (kept beside the arena, never on it; a diagnostic, as savepoint.ts's RESTORES). */
const CLOSINGS = new WeakMap<Plat, Closing[]>();

/** The closings the arena's last `bandCore` op made (its last run, committed or refused): B-FUZZ's bound on them (N-57 (2)). */
export function bandClosings(p: Plat): readonly Closing[] {
  return CLOSINGS.get(p) ?? [];
}

/**
 * A contact pinned on the face's boundary (N-57 (2)): the vertex at it, else the vertex `splitThrough` places on the
 * level-n route piece of F's boundary it lies on (§3.6's placement; a foot within attractCm of the piece's end is that
 * end) — planned first and written only where it stands within `reach2` (cm²) of the contact; null (nothing written)
 * where no route piece of F's boundary holds the contact or the placement lands farther (§3.6's fallback onto the
 * piece's endpoint).
 */
export function pinContact(t: OpenTx, rings: readonly LatticePoint[][], c: LatticePoint, reach2: number): KernelResult<VertexId | null> {
  const p = t.plat;
  const near = query(p, t.key, t.level, { minX: c.x - 2, minY: c.y - 2, maxX: c.x + 2, maxY: c.y + 2 }, { vertices: true, edges: true });
  for (const v of near.vertices) if (isVertexLive(p, v) && p.vertices.x[v] === c.x && p.vertices.y[v] === c.y) return ok(v);
  const piece = nearestRoutePiece(p, near.edges, c, t.level);
  if (piece === null || !onBoundary(rings, pointOf(p, piece.a)) || !onBoundary(rings, pointOf(p, piece.b))) return ok(null);
  const plan = planSplitThrough(t, piece.edge, c);
  if (!plan.ok) return err(plan.code, plan.detail);
  const at = planPoint(p, plan.value);
  if (dist2(at.x, at.y, c.x, c.y) > reach2) return ok(null);
  const v = applySplitPlan(t, plan.value);
  return ok(v, plan.value.warnings.map((w) => (w.at === undefined ? { code: w.code, count: w.count } : { code: w.code, count: w.count, at: w.at })));
}

/**
 * The vertex the kerb's run along F's boundary reaches first from a contact (N-57 (2)'s along-run closing): of the two
 * ends of the level-n route piece of F's boundary holding the contact, the nearer one that lies on kerb(F)'s outline
 * with the stretch from the contact to it on the outline too and no other contact of the face's pieces on the way — so
 * kerb(F) follows F's boundary from the contact to it. Null where neither end does.
 */
export function runVertex(t: OpenTx, rings: readonly LatticePoint[][], outline: readonly Ring[], contacts: readonly LatticePoint[], c: LatticePoint): VertexId | null {
  const p = t.plat;
  const near = query(p, t.key, t.level, { minX: c.x - 2, minY: c.y - 2, maxX: c.x + 2, maxY: c.y + 2 }, { edges: true });
  const piece = nearestRoutePiece(p, near.edges, c, t.level);
  if (piece === null) return null;
  const a = pointOf(p, piece.a);
  const b = pointOf(p, piece.b);
  if (!onBoundary(rings, a) || !onBoundary(rings, b)) return null;
  const da = dist2(a.x, a.y, c.x, c.y);
  const db = dist2(b.x, b.y, c.x, c.y);
  const order = da < db || (da === db && (a.y < b.y || (a.y === b.y && a.x <= b.x))) ? [piece.a, piece.b] : [piece.b, piece.a];
  for (const v of order) {
    const e = pointOf(p, v);
    if (!onBoundary(outline, e) || !onBoundary(outline, { x: (c.x + e.x) * 0.5, y: (c.y + e.y) * 0.5 })) continue;
    const between = contacts.some((o) => (o.x !== c.x || o.y !== c.y) && dist2(o.x, o.y, e.x, e.y) > ON_BOUNDARY_SQ && nearestOn(o, c, e).d2 <= ON_BOUNDARY_SQ);
    if (!between) return v;
  }
  return null;
}

/** The number of edges at a vertex (its outgoing half-edges). */
function degree(p: Plat, v: VertexId): number {
  return [...outgoing(p, v)].length;
}

/**
 * How far an open piece stands from F's boundary at most (cm, its vertices and segment midpoints): a piece within
 * attractCm bounds a kerb sliver thinner than attractCm, which the commit may fold onto F's boundary (C-0218 (7)).
 */
function pieceWidth(rings: readonly (readonly XY[])[], q: readonly LatticePoint[]): number {
  const far = (z: XY): number => {
    let d = Infinity;
    for (const r of rings) for (let i = 0; i < r.length; i += 1) d = Math.min(d, nearestOn(z, r[i], r[(i + 1) % r.length]).d2);
    return d;
  };
  let w = 0;
  for (let i = 0; i < q.length; i += 1) {
    w = Math.max(w, far(q[i]));
    if (i + 1 < q.length) w = Math.max(w, far({ x: (q[i].x + q[i + 1].x) * 0.5, y: (q[i].y + q[i + 1].y) * 0.5 }));
  }
  return Math.sqrt(w);
}

/** A sliver piece to fold onto F's boundary on the op's next run: "face piece fold". */
const foldKey = (face: FaceId, piece: number): string => `${String(face)} ${String(piece)} fold`;

/** An end of an open piece to pin first, on the op's next run: "face piece end". */
const endKey = (face: FaceId, piece: number, end: 0 | 1): string => `${String(face)} ${String(piece)} ${String(end)}`;

/**
 * An open piece's ends closed on F's boundary (N-57 (2)): an end the insertion left as a dangling tip — the vertex its
 * contact became has the piece's one edge and no other — within `CHORD_MAX` of its contact gets the contact pinned AT it
 * (`pinContact`, `PIN_SQ`) and the chord from the tip to it inserted between the two vertices, so the piece ends on F's
 * boundary with the vertex beside the contact kept (the committed outline kerb(F)'s, vertex for vertex). Where no vertex
 * can stand at the contact beside the tip, or the tip stands farther than a chord but within `ALONG_SQ`, the tip is
 * joined to the vertex kerb(F)'s run along F's boundary reaches first from the contact (`runVertex`; the chord within the
 * tip's distance of the run; `alongs` records it for the read-back). An end on F's boundary, or on any other vertex with
 * more than the piece's edge, is left as it is. Where neither closing goes in, or the tip stands farther still, nothing
 * more is written: that end is returned in `retry` and the run stops (the op runs again with it pinned first); an end
 * already pinned first is never retried (the post-condition judges it). Returns the piece's ends.
 */
export function closeEnds(
  t: OpenTx, read: Read, contacts: readonly LatticePoint[], index: number, piece: Piece, placed: readonly VertexId[], rows: readonly RoleRow[],
  pinnedFirst: ReadonlySet<string>, log: Closing[], alongs: Along[],
): KernelResult<{ ends: VertexId[]; retry: string[] }> {
  const rings = read.rings;
  const face = read.face;
  const p = t.plat;
  const q = piece.points;
  const ends: VertexId[] = [placed[0], placed[placed.length - 1]];
  const warnings: Warning[] = [];
  for (const k of [0, 1] as const) {
    const tip = ends[k];
    if (degree(p, tip) !== 1 || pinnedFirst.has(endKey(face, index, k))) continue;
    const c = q[k === 0 ? 0 : q.length - 1];
    const tp = pointOf(p, tip);
    // a tip the insertion left across F's boundary (in a face beside F) is not closed from F: another face's piece may
    // reach it later, and the post-condition judges it once every outline is in
    if (!insideRings(rings, tp)) continue;
    const off2 = dist2(tp.x, tp.y, c.x, c.y);
    if (off2 > ALONG_SQ) {
      return ok({ ends, retry: [endKey(face, index, k)] }, warnings);
    }
    const pin = off2 <= CHORD_MAX * CHORD_MAX ? pinContact(t, rings, c, PIN_SQ) : ok<VertexId | null>(null);
    if (!pin.ok) return err(pin.code, pin.detail);
    if (pin.value === null) {
      // no vertex can stand at the contact beside the tip (§3.6's placement falls back), or the insertion left the tip
      // farther than a chord: the tip closed along the kerb's run on F's boundary to the run's first vertex, the chord
      // within the tip's distance of the run
      const far = runVertex(t, rings, read.kerb, contacts, c);
      if (far !== null && far !== tip) {
        const at = pointOf(p, far);
        const along = insertChain(t, k === 0 ? [at, tp] : [tp, at], rows, 'mandatory');
        if (!along.ok && along.code === 'E_WORK_LIMIT') return err(along.code, along.detail);
        if (along.ok) {
          warnings.push(...along.warnings);
          log.push({ kind: 'along', face, piece: index, end: k, contact: c, pin: at, tip: tp });
          alongs.push({ face, tip, far, piece: index, end: k });
          ends[k] = far;
          continue;
        }
      }
      return ok({ ends, retry: [endKey(face, index, k)] }, warnings);
    }
    if (pin.value === tip) continue;
    warnings.push(...pin.warnings);
    const at = pointOf(p, pin.value);
    const chord = insertChain(t, k === 0 ? [at, tp] : [tp, at], rows, 'mandatory');
    if (!chord.ok) {
      // a chord shorter than minEdge folds to one point: the post-condition judges what is left
      if (chord.code === 'E_DEGENERATE' && chord.detail === 'empty') continue;
      return err(chord.code, chord.detail);
    }
    warnings.push(...chord.warnings);
    log.push({ kind: 'chord', face, piece: index, end: k, contact: c, pin: at, tip: tp, chordCm: Math.sqrt(dist2(tp.x, tp.y, at.x, at.y)) });
    ends[k] = pin.value;
  }
  return ok({ ends, retry: [] }, warnings);
}

/**
 * A piece with ends the last run could not close at their contacts, inserted with those ends PINNED FIRST (N-57 (2)'s
 * own mechanism, the closing's fallback): each such end's contact placed on F's boundary within attractCm of it
 * (`pinContact`: the vertex at it, the placement, or §3.6 step 2's endpoint within attractCm) before the piece goes in,
 * the piece's vertices beside it within attractCm of the contact dropped, and the piece inserted onto the pinned vertex
 * — the outline errs there by at most attractCm and never reaches a far vertex. (Pinned after the rest of the piece, a
 * contact on the boundary edge that holds the piece's other contact cannot be placed at all where the edge runs within
 * minEdge of other geometry: §3.6's placement (iii), C-0284.) Returns the points the piece now runs on and its two end
 * vertices (null where it collapsed to one point), or the contact that cannot be pinned within attractCm.
 */
function insertPinned(
  t: OpenTx, rings: readonly LatticePoint[][], face: FaceId, index: number, piece: Piece, rows: readonly RoleRow[], pinnedEnds: ReadonlySet<string>, log: Closing[],
): KernelResult<{ points: LatticePoint[]; ends: VertexId[] | null; unpinned: LatticePoint | null }> {
  const p = t.plat;
  const q = piece.points;
  const marked = [pinnedEnds.has(endKey(face, index, 0)), pinnedEnds.has(endKey(face, index, 1))] as const;
  const contact = [q[0], q[q.length - 1]] as const;
  const within = (a: LatticePoint, c: LatticePoint): boolean => dist2(a.x, a.y, c.x, c.y) <= ATTRACT_SQ;
  let lo = 0;
  let hi = q.length - 1;
  const dropped: LatticePoint[][] = [[], []];
  if (marked[0]) {
    lo = 1;
    while (lo < hi && within(q[lo], contact[0])) dropped[0].push(q[lo++]);
  }
  if (marked[1]) {
    hi = q.length - 2;
    while (hi > lo && within(q[hi], contact[1])) dropped[1].push(q[hi--]);
  }
  const core = lo <= hi ? q.slice(lo, hi + 1) : [];
  const warnings: Warning[] = [];
  const pin = (k: 0 | 1): KernelResult<LatticePoint | null> => {
    const v = pinContact(t, rings, contact[k], ATTRACT_SQ);
    if (!v.ok) return err(v.code, v.detail);
    if (v.value === null) return ok(null);
    warnings.push(...v.warnings);
    const at = pointOf(p, v.value);
    log.push({ kind: 'pinned', face, piece: index, end: k, contact: contact[k], pin: at, dropped: dropped[k] });
    return ok(at);
  };
  // the contacts pinned first, the piece inserted onto them
  const pts = core.slice();
  for (const k of [0, 1] as const) {
    if (!marked[k]) continue;
    const at = pin(k);
    if (!at.ok) return err(at.code, at.detail);
    if (at.value === null) return ok({ points: pts, ends: null, unpinned: contact[k] }, warnings);
    if (k === 0) pts.unshift(at.value);
    else pts.push(at.value);
  }
  const ins = insertChain(t, pts, rows, 'mandatory');
  if (!ins.ok) {
    if (ins.code === 'E_DEGENERATE' && ins.detail === 'empty') return ok({ points: pts, ends: null, unpinned: null }, warnings);
    return err(ins.code, ins.detail);
  }
  warnings.push(...ins.warnings);
  return ok({ points: pts, ends: [ins.value.placed[0], ins.value.placed[ins.value.placed.length - 1]], unpinned: null }, warnings);
}

/** The L1 ancestor of a face record of level n (its parent chain). */
function ancestorL1(p: Plat, level: Level, f: FaceId): FaceId {
  let g = f;
  for (let l = level; l > 1; l -= 1) g = p.faces[l].parent[g];
  return g;
}

/** What the engine is told: the spines' widths, the outline's row, the band faces' owner (bandUnion only). */
interface EngineSpec {
  readonly widths: SpineWidths;
  readonly edgeRole: 'kerb' | 'band';
  /** The rows' entity for a face: corridorUnion's the face's owner, bandUnion's its owner. */
  readonly entityOf: (face: FaceId) => Id;
  readonly owner: Id | null;
  /** The outline pieces of a face's reading (`outlinePieces`); a test plants a lost chord through it (N-57 (2)). */
  readonly pieces?: (read: Parameters<typeof outlinePieces>[0]) => Piece[];
  /** Open pieces' ends pinned first from the op's first run, as [face, piece, end]: a test reaches the fallback through it (N-57 (2)). */
  readonly pinFirst?: readonly (readonly [FaceId, number, 0 | 1])[];
  /**
   * Whether a face's spines include those through its route vertices only (J318, C-0380): corridorUnion's kerb, the one
   * `kerb` S8 reads — true; bandUnion's per-side parts — false (a face touching the chain at a vertex holds no side of it).
   */
  readonly vertexContacts: boolean;
}

/** The engine on the open transaction (see the module comment). */
export function bandCore(t: OpenTx, faces: readonly FaceId[], spec: EngineSpec): KernelResult<BandResult> {
  const p = t.plat;
  const unique = [...new Set(faces)];
  for (const f of unique) check(isFaceLive(p, 1, f), `band: face ${String(f)} is not a live L1 face`);
  unique.sort((a, b) => compareFaces(p, 1, a, b));
  if (!chargeTx(t, TX_FACES_WALKED, unique.length)) return overLimit(t);
  // the op runs again, from its savepoint, while a closing finds an end it must pin first (N-57 (2)): each run stops at
  // the first such end and adds it to the set, so the runs are at most the open pieces' ends plus one
  const pinned = new Set<string>((spec.pinFirst ?? []).map(([f, i, k]) => endKey(f, i, k)));
  for (;;) {
    const save = opSave(t);
    const run = writeOutlines(t, unique, spec, pinned);
    if (!run.ok) return rollback(t, save, run);
    const retry = run.value.retry.length > 0 ? run.value.retry : offRead(t, spec, run.value.alongs);
    if (retry.length > 0) {
      rollback(t, save, err('E_INVARIANT', 'outline: an end to pin first'));
      for (const k of retry) pinned.add(k);
      continue;
    }
    // KI-1 (hardening round S14): the op's own spurs — an edge it wrote with one face on both sides and an end no other
    // edge reaches — taken out in the same batch, before the faces are read back
    if (!dropSpurs(t, unique, [roleIdOf(spec.edgeRole), splitRoleId()])) return overLimit(t);
    const cut: string[] = [];
    const done = readBack(t, unique, spec, run.value.reads, run.value.alongs, pinned, cut);
    if (cut.length > 0) {
      rollback(t, save, err('E_INVARIANT', 'outline: a split to leave out'));
      for (const k of cut) pinned.add(k);
      continue;
    }
    if (!done.ok) return rollback(t, save, done);
    return ok(done.value, [...run.warnings, ...done.warnings]);
  }
}

/** A face's reading on the open transaction, with the engine's widths and contacts (the one function, kerb.ts). */
function readOn(t: OpenTx, f: FaceId, spec: EngineSpec, cache: Map<string, Spine | null> = new Map()): KernelResult<Read> {
  return readKerb(t, f, spec.widths, cache, spec.vertexContacts);
}

/**
 * The along-run closings whose run vertex an L1 read would not hold after the op (B-CLOSE, round S13): an L1 read lays
 * its parts at L2 (kerb.ts `dryLevel`), so it meets what an L2 op wrote — the tip the insertion left off its contact and
 * the chord from it — and may read F's outline there otherwise than the op's own read did. In an L2 batch each face
 * with such a closing is read again on the arena the run left (the read a later L1 read makes), and an end whose run
 * vertex stands off that outline (beyond the 1 cm boundary reading) is named to be PINNED FIRST on the next run.
 */
function offRead(t: OpenTx, spec: EngineSpec, alongs: readonly Along[]): string[] {
  if (t.level !== 2 || alongs.length === 0) return [];
  const p = t.plat;
  const out: string[] = [];
  const again = new Map<FaceId, readonly Ring[] | null>();
  for (const a of alongs) {
    if (!again.has(a.face)) {
      const r = readOn(t, a.face, spec);
      again.set(a.face, r.ok ? r.value.kerb : null);
    }
    const rings = again.get(a.face) ?? null;
    if (rings === null || !onBoundary(rings, pointOf(p, a.far))) out.push(endKey(a.face, a.piece, a.end));
  }
  return out;
}

/**
 * The engine's writing run: every face's kerb read, then per face its outline pieces (open ends closed, or pinned first
 * where `pinned` names them) and its splits. Returns the reads and, where a closing could not close an end at its
 * contact, that end (`retry`: the run stops there, the op is put back and runs again with it pinned first); refuses as
 * the insertion does, and E_INVARIANT where the post-condition fails. The caller puts the batch back on a refusal.
 */
function writeOutlines(t: OpenTx, unique: readonly FaceId[], spec: EngineSpec, pinned: ReadonlySet<string>): KernelResult<{ reads: Read[]; retry: string[]; alongs: Along[] }> {
  const p = t.plat;
  const warnings: Warning[] = [];
  const log: Closing[] = [];
  const alongs: Along[] = [];
  const openEnds: { read: Read; piece: number; points: LatticePoint[]; v: VertexId }[] = [];
  // a sliver piece (within attractCm of F's boundary) whose end no closing could close is folded on the next run
  const foldable = (read: Read, i: number, piece: Piece): boolean => !pinned.has(foldKey(read.face, i)) && pieceWidth(read.rings, piece.points) <= LATTICE.attractCm;
  CLOSINGS.set(p, log);
  const cache = new Map<string, Spine | null>();
  const reads: Read[] = [];
  for (const f of unique) {
    const r = readOn(t, f, spec, cache);
    if (!r.ok) return err(r.code, r.detail);
    reads.push(r.value);
  }
  const outlineRole = roleIdOf(spec.edgeRole);
  for (const read of reads) {
    if (read.spines.size === 0) continue;
    const rows: RoleRow[] = [{ role: spec.edgeRole, entity: spec.entityOf(read.face) }];
    const pieces = (spec.pieces ?? outlinePieces)(read);
    const contacts = pieces.filter((q) => !q.closed).flatMap((q) => [q.points[0], q.points[q.points.length - 1]]);
    for (let i = 0; i < pieces.length; i += 1) {
      const piece = pieces[i];
      if (!piece.closed && pinned.has(foldKey(read.face, i))) {
        // N-57 (2): a sliver piece no closing could close is folded onto F's boundary (C-0218 (7))
        log.push({ kind: 'folded', face: read.face, piece: i, end: 0, contact: piece.points[0], pin: piece.points[piece.points.length - 1], widthCm: pieceWidth(read.rings, piece.points) });
        continue;
      }
      let points = piece.points;
      let placed: readonly VertexId[];
      if (!piece.closed && (pinned.has(endKey(read.face, i, 0)) || pinned.has(endKey(read.face, i, 1)))) {
        // N-57 (2): an end the last run could not close at its contact is pinned, its beside vertices dropped
        const pf = insertPinned(t, read.rings, read.face, i, piece, rows, pinned, log);
        if (!pf.ok) return err(pf.code, pf.detail);
        warnings.push(...pf.warnings);
        const u = pf.value.unpinned;
        if (u !== null) {
          if (foldable(read, i, piece)) return ok({ reads, retry: [foldKey(read.face, i)], alongs }, warnings);
          return err('E_INVARIANT', `outline: piece ${String(i)} of the face ${String(read.face)} cannot pin its contact at (${String(u.x)}, ${String(u.y)}) within attractCm on the face's boundary (N-57 (2))`);
        }
        // a piece collapsed to one point adds nothing
        if (pf.value.ends === null) continue;
        points = pf.value.points;
        placed = pf.value.ends;
      } else {
        const ins = insertChain(t, points, rows, 'mandatory', piece.closed ? { closed: true } : {});
        if (!ins.ok) {
          // A piece shorter than minEdge collapses to one point (step 1's E_DEGENERATE `empty`) and adds nothing.
          if (ins.code === 'E_DEGENERATE' && ins.detail === 'empty') continue;
          return err(ins.code, ins.detail);
        }
        warnings.push(...ins.warnings);
        if (piece.closed) continue;
        placed = ins.value.placed;
      }
      // N-57 (2): an end left dangling is closed on F's boundary at its contact, or named for the next run
      const ends = closeEnds(t, read, contacts, i, { points, closed: false }, placed, rows, pinned, log, alongs);
      if (!ends.ok) return err(ends.code, ends.detail);
      warnings.push(...ends.warnings);
      // the run stops here (what follows would be written beside a piece the next run replaces)
      if (ends.value.retry.length > 0) return ok({ reads, retry: ends.value.retry, alongs }, warnings);
      // the post-condition (N-57 (2), N-45 (a)): an open piece ends on F's boundary — an end still a dangling tip
      // would leave its strip one face with the block beside it: refused, the batch put back, never committed; a tip
      // the insertion left across F's boundary is judged once every face's outline is in (another face's piece may
      // reach it)
      for (const v of ends.value.ends) {
        if (degree(p, v) !== 1) continue;
        const q = pointOf(p, v);
        if (!insideRings(read.rings, q)) {
          openEnds.push({ read, piece: i, points: piece.points, v });
          continue;
        }
        if (foldable(read, i, piece)) return ok({ reads, retry: [foldKey(read.face, i)], alongs }, warnings);
        return err('E_INVARIANT', `outline: piece ${String(i)} of the face ${String(read.face)} ends on a dangling tip at (${String(q.x)}, ${String(q.y)}), off the face's boundary (N-57 (2))`);
      }
    }
    const split: RoleRow[] = [{ role: 'corridor_split', entity: spec.entityOf(read.face) }];
    for (let si = 0; si < read.splits.length; si += 1) {
      const pts = read.splits[si];
      // a split the last run laid between two faces read outside the band is left out (N-52 (2), `cutSplits`)
      if (pinned.has(splitKey(read.face, si))) continue;
      // the split ends on the kerb: where the kerb's insertion left no outline vertex at its kerb point (attraction
      // moved the kerb there), a split would dangle in the face — it is not drawn
      if (!onOutline(p, t.key, pts[1], outlineRole)) continue;
      const ins = insertChain(t, pts, split, 'mandatory');
      if (!ins.ok) {
        // A split whose two ends attraction folds onto one vertex adds nothing (the kerb meets the junction there).
        if (ins.code === 'E_DEGENERATE' && ins.detail === 'empty') continue;
        return err(ins.code, ins.detail);
      }
      warnings.push(...ins.warnings);
    }
  }
  // the post-condition for the tips left across their face's boundary, now every face's outline is in
  for (const e of openEnds) {
    if (degree(p, e.v) !== 1) continue;
    const q = pointOf(p, e.v);
    if (foldable(e.read, e.piece, { points: e.points, closed: false })) return ok({ reads, retry: [foldKey(e.read.face, e.piece)], alongs }, warnings);
    return err('E_INVARIANT', `outline: piece ${String(e.piece)} of the face ${String(e.read.face)} ends on a dangling tip at (${String(q.x)}, ${String(q.y)}), off the face's boundary (N-57 (2))`);
  }
  return ok({ reads, retry: [], alongs }, warnings);
}

/**
 * KI-1 (C-0212 (8), C-0218 (5); hardening round S14): the op's own SPURS taken out of the batch — an edge of the batch's
 * level that bounds one face of an L1 face of the op on both sides and has an end with no other edge, every row on it
 * the op's own (its outline role or `corridor_split`, at the batch's level), stripped through the removal door's engine
 * (`rewriteRows`, as `mergeFaces` strips a shared edge), again until none is left (a spur of two edges loses its tip
 * edge first). Such an edge separates nothing — the faces are the same with or without it — so the region and every
 * face's class are unchanged; only the dangling edge goes. Two causes on the B-FUZZ families: a kerb piece's spike or
 * sliver thinner than attractCm whose insertion retraced a stretch (A–P–T–P–B, N-61 (1): the router's retrace, M0-a-05's
 * hardening round, RQ1), leaving the tip T dangling; and a wedge split's foot on a spine edge that runs within minEdge of
 * the L0 frame, which §3.6's placement puts minEdge into F, off F's boundary — the split's leg to it dangles, its leg
 * from J to the kerb corner stays. An edge of the outline alone (`roles[0]`) with one face on both sides whose two ends
 * both have other edges — a BRIDGE, bounding no block (the agreement's corridor family: 2 per 10⁴) — goes too; a split's
 * bridge (a single split from F's boundary to an island kerb, notes row 57: it marks the junction) is kept. False where
 * the batch's work limit is now exceeded.
 */
function dropSpurs(t: OpenTx, faces: readonly FaceId[], roles: readonly number[]): boolean {
  const p = t.plat;
  const n = t.level;
  const R = p.roles;
  const O = p.halfEdges.origin;
  const mine = new Set(faces);
  for (;;) {
    const strip: number[] = [];
    const seen = new Set<number>();
    for (let c = 0; c < p.slots.face[n].top; c += 1) {
      if (!isFaceLive(p, n, c) || !mine.has(ancestorL1(p, n, c))) continue;
      const walk = new Set<number>();
      for (const ring of faceWalk(p, n, c)) for (const h of ring) walk.add(h);
      for (const h of walk) {
        const e = h >> 1;
        if (seen.has(e) || !walk.has(h ^ 1)) continue;
        seen.add(e);
        const rows = rowsOn(p, 'edge', h);
        if (rows.length === 0 || !rows.every((r) => roles.includes(R.kind[r]) && R.level[r] === n)) continue;
        // a spur (an end with no other edge), or a bridge of the outline alone (both ends reached, the one face on both
        // sides: it bounds no block); a split's bridge is kept (notes row 57: it marks the junction)
        const spur = degree(p, O[h]) === 1 || degree(p, O[h ^ 1]) === 1;
        if (!spur && !rows.every((r) => R.kind[r] === roles[0])) continue;
        strip.push(...rows);
      }
    }
    if (strip.length === 0) return true;
    for (const r of strip) noteRow(t, R.kind[r], R.entity[r], R.ordinal[r]);
    if (!rewriteRows(t, { strip, add: [] })) return false;
  }
}

/** The role id of the junctions' split edges. */
const splitRoleId = (): number => roleIdOf('corridor_split');

/** A split of a face's reading to leave out on the op's next run: "face split-index split". */
const splitKey = (face: FaceId, si: number): string => `${String(face)} ${String(si)} split`;

/**
 * The splits the run laid between two faces of one L1 face read outside the band (N-52 (2): a corridor_split never cuts a
 * block; round S13, C-0422): an edge carrying this op's split row with such a face of F on each side names the split of
 * F's reading nearest its midpoint (not yet left out). The split was guarded on its input chain (kerb.ts `entersRegion`),
 * but the insertion may lay it otherwise — attracted onto a kerb vertex within attractCm of it and along the kerb's
 * edges beyond (a kerb spur at a junction: the spur then a face of its own, the split between it and the rest) — so it
 * is judged here on the faces the arena holds and left out on the next run, as a split the guard drops is (C-0281). Two
 * such faces of two L1 faces meet on F's own boundary, where a split laid along it cuts no block.
 */
function cutSplits(p: Plat, n: Level, inner: ReadonlyMap<FaceId, Read>, splitRole: number, pinned: ReadonlySet<string>): string[] {
  const side = new Map<number, FaceId>();
  for (const c of [...inner.keys()].sort((a, b) => compareFaces(p, n, a, b))) for (const ring of faceWalk(p, n, c)) for (const h of ring) side.set(h, c);
  const out = new Set<string>();
  const O = p.halfEdges.origin;
  for (const [h, c] of side) {
    const o = side.get(h ^ 1);
    if (o === undefined || o === c || (h & 1) === 1) continue;
    if (!rowsOn(p, 'edge', h).some((r) => p.roles.kind[r] === splitRole && p.roles.level[r] === n)) continue;
    const read = inner.get(c) as Read;
    if (inner.get(o)?.face !== read.face) continue;
    const a = pointOf(p, O[h]);
    const b = pointOf(p, O[h ^ 1]);
    const m: XY = { x: (a.x + b.x) * 0.5, y: (a.y + b.y) * 0.5 };
    let best = -1;
    let bestD = Infinity;
    for (let si = 0; si < read.splits.length; si += 1) {
      if (pinned.has(splitKey(read.face, si))) continue;
      const pts = read.splits[si];
      let d = Infinity;
      for (let k = 0; k + 1 < pts.length; k += 1) d = Math.min(d, nearestOn(m, pts[k], pts[k + 1]).d2);
      if (d < bestD) {
        best = si;
        bestD = d;
      }
    }
    if (best >= 0) out.add(splitKey(read.face, best));
  }
  return [...out];
}

/**
 * The engine's read-back (see the module comment): the faces of the batch's level inside each face, classed. Where a
 * split of the run lies between two faces read outside the band (`cutSplits`), its key is put in `cut` and nothing is
 * written: the caller runs the op again with it left out.
 */
function readBack(t: OpenTx, unique: readonly FaceId[], spec: EngineSpec, reads: readonly Read[], alongs: readonly Along[], pinned: ReadonlySet<string>, cut: string[]): KernelResult<BandResult> {
  const p = t.plat;
  const n = t.level;
  const outlineRole = roleIdOf(spec.edgeRole);
  // an along-run closing leaves the strip of kerb(F) between its chord and F's boundary (no wider than the tip's
  // distance) on the band side: the face beyond the chord is a band face, whatever its interior point reads (N-57 (2))
  const sideOf = new Map<FaceId, Set<number>>();
  for (const a of alongs) {
    // an along chord attraction laid back onto the piece's own vertices (each within attractCm of the chord: the
    // insertion's W_STRETCH_SHARED) leaves the tip a spur, which `dropSpurs` took out: the piece now ends where the
    // chord left it, and its faces are classed by their area (hardening round S14: seed -1784686652's B-FUZZ network
    // {15589 → 7960, hw 1, knots 338 / 539}, {7179 → 0, hw 24} at L3 read the dead tip and threw)
    if (!isVertexLive(p, a.tip) || !isVertexLive(p, a.far)) continue;
    const X = p.vertices.x;
    const Y = p.vertices.y;
    const O = p.halfEdges.origin;
    const ux = X[a.far] - X[a.tip];
    const uy = Y[a.far] - Y[a.tip];
    // the outgoing half-edge nearest the chord's direction: the largest cosine, compared without a division
    // (dot₁·|v₂| > dot₂·|v₁|)
    let best = -1;
    let bestDot = 0;
    let bestLen = 1;
    for (const h of outgoing(p, a.tip)) {
      const w = O[h ^ 1];
      const vx = X[w] - X[a.tip];
      const vy = Y[w] - Y[a.tip];
      const dot = ux * vx + uy * vy;
      const len = Math.sqrt(vx * vx + vy * vy);
      if (best < 0 || dot * bestLen > bestDot * len) {
        best = h;
        bestDot = dot;
        bestLen = len;
      }
    }
    if (best < 0) continue;
    const set = sideOf.get(a.face) ?? new Set<number>();
    set.add(a.end === 1 ? best ^ 1 : best);
    sideOf.set(a.face, set);
  }
  const whole: FaceId[] = [];
  const wholeBand: FaceId[] = [];
  // Read back: the faces of the batch's level inside each face.
  const inFace = new Map<FaceId, FaceId[]>();
  for (const f of unique) inFace.set(f, []);
  for (let c = 0; c < p.slots.face[n].top; c += 1) {
    if (!isFaceLive(p, n, c)) continue;
    const a = ancestorL1(p, n, c);
    inFace.get(a)?.push(c);
  }
  const band: FaceId[] = [];
  const strips: FaceId[] = [];
  const wedges: FaceId[] = [];
  const blocks: FaceId[] = [];
  const R = p.roles;
  const splitRole = splitRoleId();
  const inner = new Map<FaceId, Read>();
  for (const read of reads) {
    const kids = inFace.get(read.face) as FaceId[];
    const beyondChord = sideOf.get(read.face);
    if (kids.length === 0) {
      // no edge written inside it: a spine-less face, or one whose kerb is F itself, is one built block; an empty kerb
      // leaves it all band — and so does a kerb sliver thinner than attractCm that the commit folded onto F's boundary
      // (nothing of it left inside F): F is judged as its children are, at a point strictly inside it (C-0218 (7))
      const outline = read.kerb;
      const inside = outline.length === 0 ? false : insideKerb(p, 1, read.face, outline, false);
      if (inside !== false) whole.push(read.face);
      else wholeBand.push(read.face);
      continue;
    }
    for (const c of kids) {
      const touched = new Set<string>();
      let split = false;
      let beyond = false;
      for (const ring of faceWalk(p, n, c)) {
        for (const h of ring) {
          if (beyondChord?.has(h) === true) beyond = true;
          const rows = rowsOn(p, 'edge', h);
          // a split edge the outline shares (attraction laid them on one stretch) is the outline's
          if (rows.some((r) => R.kind[r] === splitRole && R.level[r] === n) && !rows.some((r) => R.kind[r] === outlineRole && R.level[r] === n)) split = true;
          for (const r of rows) {
            if (R.level[r] > 1 || R.ordinal[r] !== 0) continue;
            const k = spineKey(p, R.kind[r], R.entity[r]);
            if (read.spines.has(k)) touched.add(k);
          }
        }
      }
      // a corridor_split edge lies inside the band, so a face it bounds is a band face even where no spine bounds it
      // inside kerb(F) or not, read at a point strictly inside the face; where it has none, by its bounds
      const inside = beyond ? false : insideKerb(p, n, c, read.kerb);
      if (inside === null ? touched.size === 0 && !split : inside) {
        blocks.push(c);
        inner.set(c, read);
      } else {
        band.push(c);
        if (touched.size >= 2) wedges.push(c);
        else strips.push(c);
      }
    }
  }
  cut.push(...cutSplits(p, n, inner, splitRole, pinned));
  if (cut.length > 0) return err('E_INVARIANT', 'outline: a split to leave out');
  const byKey = (a: FaceId, b: FaceId): number => compareFaces(p, n, a, b);
  const result: BandResult = { band: band.sort(byKey), strips: strips.sort(byKey), wedges: wedges.sort(byKey), blocks: blocks.sort(byKey), whole, wholeBand };
  if (spec.owner !== null && result.band.length > 0) {
    const o = setOwner(t, result.band, spec.owner);
    if (!o.ok) return err(o.code, o.detail);
  }
  return ok(result);
}

/**
 * §3.4's `bandUnion(tx, chains, faces, edgeRole, owner)`: the band of the chains — each buffered by its half-width (a
 * scalar or a profile of half-widths sampled per segment end, §2.2 rule 5) with round joins and its ends — inside the
 * L1 faces, at the batch's level: its outline edges carrying `edgeRole`, its corners `corridor_split`, the axis chain
 * (already an L1 edge) splitting it per side; the band faces owned by `owner`, so a band is a FaceRef of per-side
 * parts (§3.7 *Insets*). Refuses E_LEVEL below L2 (the band is finer than its L1 chain), and as the engine does.
 */
export function bandUnion(o: Overlay, chains: readonly BandChain[], faces: readonly FaceId[], edgeRole: 'kerb' | 'band', owner: Id): KernelResult<BandResult> {
  const { t, refused } = enter<BandResult>(o);
  if (refused !== null) return refused;
  check(edgeRole === 'kerb' || edgeRole === 'band', `bandUnion: the outline's role is kerb or band, got ${String(edgeRole)}`);
  check(typeof owner === 'string' && owner.length > 0, 'bandUnion: an owner is an entity\'s non-empty address id');
  if (t.level < 2) return refuse('E_LEVEL', `bandUnion builds a band finer than its L1 chain: a batch of L2 or finer, not L${String(t.level)}`);
  const declared = new Map<string, BandChain>();
  for (const c of chains) {
    check(c.ends === 'round' || c.ends === 'square', `bandUnion: a chain's ends are round or square, got ${String(c.ends)}`);
    declared.set(`${c.ref.role}\u0000${c.ref.entity}`, c);
  }
  const widths: SpineWidths = (chain) => {
    const c = declared.get(`${chain.role}\u0000${chain.entity}`);
    return c === undefined ? null : { halfWidthCm: c.halfWidthCm, ends: c.ends };
  };
  return bandCore(t, faces, { widths, edgeRole, entityOf: () => owner, owner, vertexContacts: false });
}

/** The L1 faces a FaceRef or a list names (a FaceRef of level 1: its owner's L1 faces). */
export function l1FacesOf(p: Plat, faces: FaceRef | readonly FaceId[]): FaceId[] {
  if (Array.isArray(faces)) return (faces as readonly FaceId[]).slice();
  const ref = faces as FaceRef;
  check(ref.level === 1, `a FaceRef of L1 faces, got level ${String(ref.level)}`);
  return facesOfOwner(p, 1, handleOf(p, ref.owner));
}

/** bandUnion as a declared op (§3.3 *Two op forms*). */
export function opBandUnion(lineage: LineageHash, index: number, chains: readonly BandChain[], faces: readonly FaceId[], edgeRole: 'kerb' | 'band', owner: Id): KernelOp<BandResult> {
  return kernelOp('bandUnion', lineage, index, (o) => bandUnion(o, chains, faces, edgeRole, owner));
}
