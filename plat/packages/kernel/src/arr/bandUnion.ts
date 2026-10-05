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
// side) — the `corridor_split` edges: at a corner of F (a left turn of its walk between two spines) the kerb corner K
// — the kerb point nearest the meeting point of the two spines' offset lines — is joined to the foot of its
// perpendicular on each of the two spine edges at J, so the junction wedge (J, the two feet, K) is a face of its own
// and each half-corridor strip ends square, half the crossed street's width short of J (§3.7: "S9's corridor union
// and junction wedge produce [the stroke's square caps] without model trimming"); a foot within `attractCm` of J is J;
// where the spine passes straight through J — or turns away from F there — there is no corner and no wedge: one edge
// from J to its nearest kerb point (the foot of J's perpendicular on a straight spine) separates the two strips
// (§3.7's T-junction clause); (3) the faces of the batch's level inside F are read back: a face bounded by a buffered
// spine edge is a band face — a junction wedge when it is bounded by two different spines, a strip otherwise — and
// every other face is outside the band (corridorUnion's built blocks). A face with no bounding spine is one built block
// with no kerb and no corridor_split edge: no edge is written, and the L1 face is its own child at the batch's level
// (§2.2 rule 2) — `BandResult.whole` names it.
//
// The op is atomic (M0-a-07's op savepoint): a refusal of any insertion — E_KEPT where an edge would cross kept finer
// content or come within `attractCm` of it (§3.7; the insertion's own test, §3.3), E_LEVEL, E_OUT_OF_RANGE, E_WORK_LIMIT,
// E_INVARIANT — puts the batch back as the op found it. Readings: C-0212.
import { compareFaces, faceWalk, facesOfOwner, handleOf, isFaceLive, outgoing, rowsOn, type FaceId, type Plat, type RoleRow, type VertexId } from '../arena/index.js';
import { enter, opSave, overLimit, refuse, rollback } from '../faces/common.js';
import { insertChain } from '../insert/insertChain.js';
import { TX_FACES_WALKED } from '../insert/index.js';
import { err, LATTICE, ok, orient2d, ratio, snap, type KernelResult, type Warning } from '../num/index.js';
import { chargeTx, check, type OpenTx } from '../tx/state.js';
import { kernelOp, setOwner, type KernelOp, type Overlay } from '../tx/index.js';
import type { LineageHash } from '../hash/index.js';
import type { ChainProfile, ChainRef, Cm, FaceRef, Id, LatticePoint, Level } from '../types/index.js';
import { readKerb, type KerbRead, type RouteEdge, type Spine, type SpineEnd, type SpineWidths } from './kerb.js';
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
  /** The L1 faces with no bounding spine: each one built block, its own child at the batch's level (§2.2 rule 2). */
  readonly whole: FaceId[];
}

/** One chain of `bandUnion` (§3.4). */
export interface BandChain {
  readonly ref: ChainRef;
  readonly halfWidthCm: Cm | number | ChainProfile<number>;
  readonly ends: SpineEnd;
}

const ATTRACT = LATTICE.attractCm;
/** A kerb edge lies on the face's boundary where its ends and midpoint stand within the hot pixel of it (cm²: 1 cm). */
const ON_BOUNDARY_SQ = 1;
/** 2²⁰: small denominators are scaled by it before ratio() (exact: a power of two). */
const SCALE = 1_048_576;

type XY = { x: number; y: number };

function div(num: number, den: number): number | null {
  const r = ratio(num * SCALE, den * SCALE, 'length');
  return r.ok ? r.value : null;
}

/** The point of segment a–b nearest q (doubles), and its squared distance. */
function nearestOn(q: XY, a: XY, b: XY): { p: XY; d2: number } {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let t = 0;
  if (l2 > 0) {
    const s = div((q.x - a.x) * dx + (q.y - a.y) * dy, l2);
    t = s === null ? 0 : Math.max(0, Math.min(1, s));
  }
  const p = { x: a.x + t * dx, y: a.y + t * dy };
  return { p, d2: (q.x - p.x) * (q.x - p.x) + (q.y - p.y) * (q.y - p.y) };
}

/** The kerb point nearest q (ties: the lower y, then x). */
function nearestKerbPoint(kerbRings: readonly Ring[], q: XY): XY | null {
  let best: XY | null = null;
  let bd = Infinity;
  for (const r of kerbRings) {
    for (let i = 0; i < r.length; i += 1) {
      const c = nearestOn(q, r[i], r[(i + 1) % r.length]);
      if (best === null || c.d2 < bd || (c.d2 === bd && (c.p.y < best.y || (c.p.y === best.y && c.p.x < best.x)))) {
        best = c.p;
        bd = c.d2;
      }
    }
  }
  return best;
}

/** Is the point within the hot pixel of the face's boundary (any route edge)? */
function onBoundary(rings: readonly LatticePoint[][], q: XY): boolean {
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) if (nearestOn(q, r[i], r[(i + 1) % r.length]).d2 <= ON_BOUNDARY_SQ) return true;
  }
  return false;
}

/** The kerb's outline pieces off F's boundary: closed rings, or open runs between two boundary contacts. */
function outlinePieces(read: KerbRead): { points: LatticePoint[]; closed: boolean }[] {
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

/** One junction of a face: its vertex, the route edges into and out of it, and whether F turns left between two spines there. */
interface Junction {
  readonly j: VertexId;
  readonly prev: VertexId;
  readonly next: VertexId;
  readonly hwIn: number;
  readonly hwOut: number;
  readonly corner: boolean;
}

/** The junctions of a face's boundary (see the module comment), in walk order ring by ring. */
function junctionsOf(p: Plat, read: KerbRead): Junction[] {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const T = p.halfEdges;
  const out: Junction[] = [];
  for (const es of read.edges) {
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
      const hwOf = (keys: readonly string[]): number => {
        let w = 0;
        for (const k of keys) w = Math.max(w, (read.spines.get(k) as Spine).hwAt.get(j) ?? 0);
        return w;
      };
      const o = orient2d(X[ein.a], Y[ein.a], X[j], Y[j], X[eout.b], Y[eout.b]);
      out.push({ j, prev: ein.a, next: eout.b, hwIn: hwOf(ein.spines), hwOut: hwOf(eout.spines), corner: !shared && o > 0 });
    }
  }
  return out;
}

/** The corridor_split chain at one junction (see the module comment), or null when the kerb has no point to reach. */
function splitChain(p: Plat, read: KerbRead, jn: Junction): XY[] | null {
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
  if (jn.corner) {
    const m = meet({ x: A.x + nu.x * jn.hwIn, y: A.y + nu.y * jn.hwIn }, u, { x: J.x + nv.x * jn.hwOut, y: J.y + nv.y * jn.hwOut }, v);
    if (m !== null) aim = m;
  } else {
    const b = unit({ x: 0, y: 0 }, { x: nu.x + nv.x, y: nu.y + nv.y });
    if (b !== null) aim = { x: J.x + b.x * Math.max(jn.hwIn, jn.hwOut), y: J.y + b.y * Math.max(jn.hwIn, jn.hwOut) };
  }
  const K = nearestKerbPoint(read.kerb, aim);
  if (K === null) return null;
  if (!jn.corner) return [J, K];
  const fa = nearestOn(K, A, J).p;
  const fb = nearestOn(K, J, B).p;
  const nearJ = (q: XY): boolean => (q.x - J.x) * (q.x - J.x) + (q.y - J.y) * (q.y - J.y) <= ATTRACT * ATTRACT;
  const a = nearJ(fa);
  const b = nearJ(fb);
  if (a && b) return [J, K];
  if (a) return [J, K, fb];
  if (b) return [fa, K, J];
  return [fa, K, fb];
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
  const whole: FaceId[] = [];
  for (const read of reads) {
    if (read.spines.size === 0) continue;
    const rows: RoleRow[] = [{ role: spec.edgeRole, entity: spec.entityOf(read.face) }];
    for (const piece of outlinePieces(read)) {
      const ins = insertChain(t, piece.points, rows, 'mandatory', piece.closed ? { closed: true } : {});
      if (!ins.ok) return rollback(t, save, ins);
      warnings.push(...ins.warnings);
    }
    const split: RoleRow[] = [{ role: 'corridor_split', entity: spec.entityOf(read.face) }];
    for (const jn of junctionsOf(p, read)) {
      const chain = splitChain(p, read, jn);
      if (chain === null) continue;
      const pts: LatticePoint[] = [];
      for (const q of chain) {
        const s = snap(q.x, q.y);
        if (!s.ok) return rollback(t, save, err(s.code, s.detail));
        const last = pts[pts.length - 1];
        if (last === undefined || last.x !== s.value.x || last.y !== s.value.y) pts.push(s.value);
      }
      if (pts.length < 2) continue;
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
  for (const read of reads) {
    const kids = inFace.get(read.face) as FaceId[];
    if (kids.length === 0) {
      if (read.spines.size === 0) whole.push(read.face);
      continue;
    }
    for (const c of kids) {
      const touched = new Set<string>();
      for (const ring of faceWalk(p, n, c)) {
        for (const h of ring) {
          for (const r of rowsOn(p, 'edge', h)) {
            if (R.level[r] > 1 || R.ordinal[r] !== 0) continue;
            const k = `${String(R.kind[r])}:${String(R.entity[r])}`;
            if (read.spines.has(k)) touched.add(k);
          }
        }
      }
      if (touched.size === 0) blocks.push(c);
      else {
        band.push(c);
        if (touched.size >= 2) wedges.push(c);
        else strips.push(c);
      }
    }
  }
  const byKey = (a: FaceId, b: FaceId): number => compareFaces(p, n, a, b);
  const result: BandResult = { band: band.sort(byKey), strips: strips.sort(byKey), wedges: wedges.sort(byKey), blocks: blocks.sort(byKey), whole };
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
