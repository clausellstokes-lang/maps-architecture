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
// strips (§3.7's T-junction clause); (3) the faces of the batch's level inside F are read back: a face whose interior
// point (an ear's centroid) lies inside kerb(F) is outside the band — corridorUnion's built blocks — and every other is
// a band face: a junction wedge when two different spines bound it, a strip otherwise. A face with no record at the
// batch's level is its own child there (§2.2 rule 2): one built block when its kerb is not empty — a spine-less face,
// with no kerb or corridor_split edge — `BandResult.whole`, else all band, `BandResult.wholeBand`. A kerb piece or a
// split that collapses to one point (the insertion's E_DEGENERATE `empty`) adds nothing.
//
// The op is atomic (M0-a-07's op savepoint): a refusal of any insertion — E_KEPT where an edge would cross kept finer
// content or come within `attractCm` of it (§3.7; the insertion's own test, §3.3), E_LEVEL, E_OUT_OF_RANGE, E_WORK_LIMIT,
// E_INVARIANT — puts the batch back as the op found it. Readings: C-0212.
import { compareFaces, faceWalk, facesOfOwner, handleOf, isFaceLive, isVertexLive, outgoing, roleIdOf, rowsOn, type FaceId, type Plat, type RoleRow } from '../arena/index.js';
import { query } from '../index/index.js';
import { enter, opSave, overLimit, refuse, rollback } from '../faces/common.js';
import { insertChain } from '../insert/insertChain.js';
import { TX_FACES_WALKED } from '../insert/index.js';
import { ok, orient2d, type KernelResult, type Warning } from '../num/index.js';
import { chargeTx, check, type OpenTx } from '../tx/state.js';
import { kernelOp, setOwner, type KernelOp, type Overlay } from '../tx/index.js';
import type { LineageHash } from '../hash/index.js';
import type { ChainProfile, ChainRef, Cm, FaceRef, Id, LatticePoint, Level, PlatKey } from '../types/index.js';
import { nearestOn, readKerb, type KerbRead, type Spine, type SpineEnd, type SpineWidths, type XY } from './kerb.js';
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
   * The L1 faces wholly within their bands — an empty kerb, or a kerb sliver the commit folded onto F's boundary (C-0216
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
function onBoundary(rings: readonly LatticePoint[][], q: XY): boolean {
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) if (nearestOn(q, r[i], r[(i + 1) % r.length]).d2 <= ON_BOUNDARY_SQ) return true;
  }
  return false;
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

/**
 * Is the face (a record of level n) inside the kerb? Read at the centroid of the largest ear of its outer ring — a
 * convex corner whose triangle holds no other vertex of the face, so its centroid lies strictly inside the face — by the
 * non-zero winding of the kerb rings there (exact: coordinates tripled, orient2d on integers). Null where no ear is
 * free of the face's other vertices.
 */
function insideKerb(p: Plat, level: Level, c: FaceId, kerbRings: readonly Ring[]): boolean | null {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const rings = faceWalk(p, level, c).map((r) => r.map((h) => O[h]));
  const outer = rings[0];
  const m = outer.length;
  const all = rings.flat();
  // the largest clean ear: the one least likely to sit in a sliver beside a vertex attraction moved
  let best = -1;
  let bestArea = 0;
  for (let i = 0; i < m; i += 1) {
    const a = outer[(i + m - 1) % m];
    const v = outer[i];
    const b = outer[(i + 1) % m];
    const turn = orient2d(X[a], Y[a], X[v], Y[v], X[b], Y[b]);
    if (turn <= bestArea) continue;
    let clean = true;
    for (const w of all) {
      if (w === a || w === v || w === b) continue;
      if ((X[w] === X[a] && Y[w] === Y[a]) || (X[w] === X[v] && Y[w] === Y[v]) || (X[w] === X[b] && Y[w] === Y[b])) continue;
      if (orient2d(X[a], Y[a], X[v], Y[v], X[w], Y[w]) >= 0 && orient2d(X[v], Y[v], X[b], Y[b], X[w], Y[w]) >= 0 && orient2d(X[b], Y[b], X[a], Y[a], X[w], Y[w]) >= 0) {
        clean = false;
        break;
      }
    }
    if (!clean) continue;
    best = i;
    bestArea = turn;
  }
  if (best < 0) return null;
  const a = outer[(best + m - 1) % m];
  const v = outer[best];
  const b = outer[(best + 1) % m];
  const qx = X[a] + X[v] + X[b];
  const qy = Y[a] + Y[v] + Y[b];
  let wind = 0;
  for (const r of kerbRings) {
    for (let k = 0; k < r.length; k += 1) {
      const s = r[k];
      const t = r[(k + 1) % r.length];
      const sy = 3 * s.y;
      const ty = 3 * t.y;
      if (sy <= qy) {
        if (ty > qy && orient2d(3 * s.x, sy, 3 * t.x, ty, qx, qy) > 0) wind += 1;
      } else if (ty <= qy && orient2d(3 * s.x, sy, 3 * t.x, ty, qx, qy) < 0) wind -= 1;
    }
  }
  return wind !== 0;
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

/** The L1 ancestor of a face record of level n (its parent chain). */
function ancestorL1(p: Plat, level: Level, f: FaceId): FaceId {
  let g = f;
  for (let l = level; l > 1; l -= 1) g = p.faces[l].parent[g];
  return g;
}

/** What the engine is told: the spines' widths, the outline's row, the band faces' owner (bandUnion only). */
interface BandSpec {
  readonly widths: SpineWidths;
  readonly edgeRole: 'kerb' | 'band';
  /** The rows' entity for a face: corridorUnion's the face's owner, bandUnion's its owner. */
  readonly entityOf: (face: FaceId) => Id;
  readonly owner: Id | null;
}

/** The engine on the open transaction (see the module comment). */
export function bandCore(t: OpenTx, faces: readonly FaceId[], spec: BandSpec): KernelResult<BandResult> {
  const p = t.plat;
  const n = t.level;
  const unique = [...new Set(faces)];
  for (const f of unique) check(isFaceLive(p, 1, f), `band: face ${String(f)} is not a live L1 face`);
  unique.sort((a, b) => compareFaces(p, 1, a, b));
  if (!chargeTx(t, TX_FACES_WALKED, unique.length)) return overLimit(t);
  const save = opSave(t);
  const warnings: Warning[] = [];
  const cache = new Map<string, Spine | null>();
  const reads: KerbRead[] = [];
  for (const f of unique) {
    const r = readKerb(p, f, spec.widths, cache);
    if (!r.ok) return rollback(t, save, r);
    reads.push(r.value);
  }
  const outlineRole = roleIdOf(spec.edgeRole);
  const whole: FaceId[] = [];
  const wholeBand: FaceId[] = [];
  for (const read of reads) {
    if (read.spines.size === 0) continue;
    const rows: RoleRow[] = [{ role: spec.edgeRole, entity: spec.entityOf(read.face) }];
    for (const piece of outlinePieces(read)) {
      const ins = insertChain(t, piece.points, rows, 'mandatory', piece.closed ? { closed: true } : {});
      if (!ins.ok) {
        // A piece shorter than minEdge collapses to one point (step 1's E_DEGENERATE `empty`) and adds nothing.
        if (ins.code === 'E_DEGENERATE' && ins.detail === 'empty') continue;
        return rollback(t, save, ins);
      }
      warnings.push(...ins.warnings);
    }
    const split: RoleRow[] = [{ role: 'corridor_split', entity: spec.entityOf(read.face) }];
    for (const pts of read.splits) {
      // the split ends on the kerb: where the kerb's insertion left no outline vertex at its kerb point (attraction
      // moved the kerb there), a split would dangle in the face — it is not drawn
      if (!onOutline(p, t.key, pts[1], outlineRole)) continue;
      const ins = insertChain(t, pts, split, 'mandatory');
      if (!ins.ok) {
        // A split whose two ends attraction folds onto one vertex adds nothing (the kerb meets the junction there).
        if (ins.code === 'E_DEGENERATE' && ins.detail === 'empty') continue;
        return rollback(t, save, ins);
      }
      warnings.push(...ins.warnings);
    }
  }
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
  const splitRole = roleIdOf('corridor_split');
  for (const read of reads) {
    const kids = inFace.get(read.face) as FaceId[];
    if (kids.length === 0) {
      // no edge written inside it: a spine-less face, or one whose kerb is F itself, is one built block; an empty kerb
      // leaves it all band — and so does a kerb sliver thinner than attractCm that the commit folded onto F's boundary
      // (nothing of it left inside F): F is judged as its children are, at a point strictly inside it (C-0216 (7))
      const inside = read.kerb.length === 0 ? false : insideKerb(p, 1, read.face, read.kerb);
      if (inside !== false) whole.push(read.face);
      else wholeBand.push(read.face);
      continue;
    }
    for (const c of kids) {
      const touched = new Set<string>();
      let split = false;
      for (const ring of faceWalk(p, n, c)) {
        for (const h of ring) {
          const rows = rowsOn(p, 'edge', h);
          // a split edge the outline shares (attraction laid them on one stretch) is the outline's
          if (rows.some((r) => R.kind[r] === splitRole && R.level[r] === n) && !rows.some((r) => R.kind[r] === outlineRole && R.level[r] === n)) split = true;
          for (const r of rows) {
            if (R.level[r] > 1 || R.ordinal[r] !== 0) continue;
            const k = `${String(R.kind[r])}:${String(R.entity[r])}`;
            if (read.spines.has(k)) touched.add(k);
          }
        }
      }
      // a corridor_split edge lies inside the band, so a face it bounds is a band face even where no spine bounds it
      // inside kerb(F) or not, read at a point strictly inside the face; where no ear gives one, by its bounds
      const inside = insideKerb(p, n, c, read.kerb);
      if (inside === null ? touched.size === 0 && !split : inside) blocks.push(c);
      else {
        band.push(c);
        if (touched.size >= 2) wedges.push(c);
        else strips.push(c);
      }
    }
  }
  const byKey = (a: FaceId, b: FaceId): number => compareFaces(p, n, a, b);
  const result: BandResult = { band: band.sort(byKey), strips: strips.sort(byKey), wedges: wedges.sort(byKey), blocks: blocks.sort(byKey), whole, wholeBand };
  if (spec.owner !== null && result.band.length > 0) {
    const o = setOwner(t, result.band, spec.owner);
    if (!o.ok) return rollback(t, save, o);
  }
  return ok(result, warnings);
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
  return bandCore(t, faces, { widths, edgeRole, entityOf: () => owner, owner });
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
