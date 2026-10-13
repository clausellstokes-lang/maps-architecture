// The refusal classifier of M0-a-09's tests (N-44 as amended by J203/J207/J208; C-0212 (10) as amended): a refusal of a
// band operation is insertChain's — counted against insertChain's measured cap, logged for the register, never gated
// here — only when it REPLAYS ON insertChain ALONE: the same chains, in the same order, fed straight to `insertChain` on
// a fresh arena, meet the same refusal (code and detail), and the chain refused is a well-formed input (a simple open
// chain or ring, no repeated point). Any other refusal is the item's own and is held to 1 per 10⁴ cases per operation.
//
// Two replays, one per place a band operation inserts:
//  - the scratch overlay (kerb's F − ⋃ buffer, tileRings' rings; M0-a-08's `buildOverlay`): a fresh L0 arena, the
//    frame 4096 cm beyond the inputs, then every distinct input segment as a two-point mandatory chain in input order —
//    `buildOverlay`'s insertion loop, written here from its contract (C-0196 (1)), with no arrangement code in it;
//  - the commit (corridorUnion at L2, bandUnion at L3): a fresh copy of the arena, every face's kerb read first, then
//    per face in canonical order its outline pieces and its corridor_split chains, each through `insertChain` directly —
//    an open piece's end left a dangling tip closed as the engine closes it (N-57 (2)): its contact placed on F's
//    boundary by `splitThrough` (the door) where the placement puts it at the contact, and the chord from the tip to it
//    (at most attractCm + 1 cm) through `insertChain`, else (a tip within 2·√2·attractCm) along the kerb's run to its
//    first vertex on F's boundary;
//    where it cannot be closed so, the replay starts again on a fresh copy with that end pinned first, as the engine
//    re-runs the op (C-0327 as refined by round S4).
import { compareFaces, createPlat, isVertexLive, outgoing, pointOf, roleIdOf, type FaceId, type Plat, type VertexId } from '../../../src/arena/index.js';
import { attachIndex, query } from '../../../src/index/index.js';
import { insertChain, insertTx, planSplitThrough, splitThrough } from '../../../src/insert/index.js';
import { planPoint } from '../../../src/insert/splitThrough.js';
import { HOT_PIXEL_CM } from '../../../src/index/index.js';
import { nearestRoutePiece } from '../../../src/insert/attractVertex.js';
import { LATTICE, type KernelResult } from '../../../src/num/index.js';
import { tx, type KernelTx, type Overlay } from '../../../src/tx/index.js';
import type { Cm, LatticePoint, PlatKey } from '../../../src/types/index.js';
import { kerbParts, nearestOn, readFace, readKerb, type KerbRead, type SpineWidths } from '../../../src/arr/kerb.js';
import { onOutline, outlinePieces } from '../../../src/arr/bandUnion.js';
import { spec } from './support.js';

/** A refusal: its code and detail. */
export interface Refusal {
  readonly code: string;
  readonly detail: string;
}

/** What the replay found: the refusal insertChain alone meets, the chain it refused and whether that chain is well formed. */
export interface Replay extends Refusal {
  readonly where: 'overlay' | 'commit';
  readonly chain: LatticePoint[];
  readonly closed: boolean;
  readonly wellFormed: boolean;
}

/** The class a refusal falls in: insertChain's (it replays) or the item's own. */
export type RefusalClass = 'insertChain' | 'own';

/** Is the chain well formed: at least two points, no point repeated, no two non-adjacent segments meeting (exact)? */
export function wellFormed(pts: readonly LatticePoint[], closed: boolean): boolean {
  const n = pts.length;
  if (n < 2 || (closed && n < 3)) return false;
  if (new Set(pts.map((q) => `${String(q.x)},${String(q.y)}`)).size !== n) return false;
  const o = (a: LatticePoint, b: LatticePoint, c: LatticePoint): number => {
    const v = (BigInt(b.x) - BigInt(a.x)) * (BigInt(c.y) - BigInt(a.y)) - (BigInt(b.y) - BigInt(a.y)) * (BigInt(c.x) - BigInt(a.x));
    return v > 0n ? 1 : v < 0n ? -1 : 0;
  };
  const on = (a: LatticePoint, b: LatticePoint, c: LatticePoint): boolean =>
    Math.min(a.x, b.x) <= c.x && c.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= c.y && c.y <= Math.max(a.y, b.y);
  const meet = (p1: LatticePoint, p2: LatticePoint, q1: LatticePoint, q2: LatticePoint): boolean => {
    const d1 = o(q1, q2, p1);
    const d2 = o(q1, q2, p2);
    const d3 = o(p1, p2, q1);
    const d4 = o(p1, p2, q2);
    if (d1 * d2 < 0 && d3 * d4 < 0) return true;
    return (d1 === 0 && on(q1, q2, p1)) || (d2 === 0 && on(q1, q2, p2)) || (d3 === 0 && on(p1, p2, q1)) || (d4 === 0 && on(p1, p2, q2));
  };
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i += 1) {
    for (let j = i + 1; j < segs; j += 1) {
      if (j === i + 1 || (closed && i === 0 && j === segs - 1)) continue;
      if (meet(pts[i], pts[(i + 1) % n], pts[j], pts[(j + 1) % n])) return false;
    }
  }
  return true;
}

/** The ring without consecutive repeats (the closing repeat included) — the overlay's reading of a ring. */
function distinct(ring: readonly LatticePoint[]): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const q of ring) {
    const l = out[out.length - 1];
    if (l === undefined || l.x !== q.x || l.y !== q.y) out.push(q);
  }
  while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  return out;
}

/**
 * The scratch overlay's insertions on insertChain alone: a fresh L0 arena, its frame, every distinct segment of the
 * operands as a two-point mandatory chain in input order. The first refusal other than a segment's collapse, or null.
 */
export function replayOverlay(operands: readonly (readonly (readonly LatticePoint[])[])[]): Replay | null {
  const segs: [LatticePoint, LatticePoint][] = [];
  const seen = new Set<string>();
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const op of operands) {
    for (const ringIn of op) {
      const ring = distinct(ringIn);
      const n = ring.length;
      if (n < 2) continue;
      for (let i = 0; i < n; i += 1) {
        const a = ring[i];
        const b = ring[(i + 1) % n];
        minX = Math.min(minX, a.x);
        minY = Math.min(minY, a.y);
        maxX = Math.max(maxX, a.x);
        maxY = Math.max(maxY, a.y);
        const fw = a.x < b.x || (a.x === b.x && a.y < b.y);
        const k = fw ? `${String(a.x)},${String(a.y)},${String(b.x)},${String(b.y)}` : `${String(b.x)},${String(b.y)},${String(a.x)},${String(a.y)}`;
        if (seen.has(k)) continue;
        seen.add(k);
        segs.push([a, b]);
      }
    }
  }
  if (segs.length === 0) return null;
  const q = createPlat({ layer: 'ground', part: 0 } as PlatKey, { widthCm: (2 * LATTICE.rangeCm) as Cm, heightCm: (2 * LATTICE.rangeCm) as Cm, aspect: 1, marginShare: 0 });
  const area = (maxX - minX + 1) * (maxY - minY + 1);
  let cell = 64;
  while (cell < 1_048_576 && cell * cell * Math.max(1, segs.length) < area) cell *= 2;
  attachIndex(q, { gridCellCm: cell });
  const t = insertTx(q, 0);
  const lim = LATTICE.rangeCm - 1;
  const P = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });
  const frame = [P(Math.max(-lim, minX - 4096), Math.max(-lim, minY - 4096)), P(Math.min(lim, maxX + 4096), Math.max(-lim, minY - 4096)), P(Math.min(lim, maxX + 4096), Math.min(lim, maxY + 4096)), P(Math.max(-lim, minX - 4096), Math.min(lim, maxY + 4096))];
  const f = insertChain(t, frame, [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true });
  if (!f.ok) return { where: 'overlay', code: f.code, detail: f.detail, chain: frame, closed: true, wellFormed: true };
  for (let s = 0; s < segs.length; s += 1) {
    const [a, b] = segs[s];
    const r = insertChain(t, [a, b], [{ role: 'invisible', entity: `arr:s${String(s)}` }], 'mandatory');
    if (!r.ok && !(r.code === 'E_DEGENERATE' && r.detail === 'empty')) return { where: 'overlay', code: r.code, detail: r.detail, chain: [a, b], closed: false, wellFormed: wellFormed([a, b], false) };
  }
  return null;
}

/** kerb(F)'s overlay on insertChain alone: F's route rings, then its spines' buffer parts (kerb.ts's operands). */
export function replayKerb(p: Plat, face: FaceId, ws: SpineWidths): Replay | null {
  const f = readFace(p, face, ws);
  if (f.spines.size === 0) return null;
  const parts = kerbParts(f.rings, f.spines);
  if (!parts.ok || parts.value.length === 0) return null;
  return replayOverlay([f.rings, parts.value]);
}

/** tileRings' overlay on insertChain alone: every ring its own operand. */
export function replayTile(rings: readonly (readonly LatticePoint[])[]): Replay | null {
  return replayOverlay(rings.map((r) => [r]));
}

/** A band commit to replay: the arena builder (a fresh copy each call), the batch, the widths, the outline's row and entity. */
export interface CommitSpec {
  readonly build: () => { p: Plat; faces: FaceId[] };
  readonly level: 2 | 3;
  readonly over: Partial<KernelTx>;
  readonly widths: SpineWidths;
  readonly edgeRole: 'kerb' | 'band';
  readonly entityOf: (p: Plat, face: FaceId) => string;
}

/** Is q within the hot pixel (1 cm) of a route ring edge of the face (N-57 (2)'s boundary reading)? */
function onRings(rings: readonly (readonly LatticePoint[])[], q: LatticePoint): boolean {
  return rings.some((r) => r.some((a, i) => nearestOn(q, a, r[(i + 1) % r.length]).d2 <= 1));
}

const ATTRACT_SQ = LATTICE.attractCm * LATTICE.attractCm;
const PIN_SQ = (1 + HOT_PIXEL_CM) * (1 + HOT_PIXEL_CM);
const CHORD_MAX = LATTICE.attractCm + 1;
const ALONG_SQ = 8 * LATTICE.attractCm * LATTICE.attractCm;
const d2 = (a: LatticePoint, b: LatticePoint): number => (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);

/** A contact pinned on the doors: the vertex at it, else `splitThrough` of the route piece of F's boundary when its plan lands within `reach2`. */
function pinOnDoors(o: Overlay, rings: readonly LatticePoint[][], c: LatticePoint, reach2: number): { pin: VertexId | null; refusal: Replay | null } {
  const p = o.plat;
  const near = query(p, o.key, o.level, { minX: c.x - 2, minY: c.y - 2, maxX: c.x + 2, maxY: c.y + 2 }, { vertices: true, edges: true });
  const at = near.vertices.find((v) => isVertexLive(p, v) && p.vertices.x[v] === c.x && p.vertices.y[v] === c.y);
  if (at !== undefined) return { pin: at, refusal: null };
  const piece = nearestRoutePiece(p, near.edges, c, o.level);
  if (piece === null || !onRings(rings, pointOf(p, piece.a)) || !onRings(rings, pointOf(p, piece.b))) return { pin: null, refusal: null };
  const plan = planSplitThrough(o, piece.edge, c);
  if (!plan.ok) return { pin: null, refusal: { where: 'commit', code: plan.code, detail: plan.detail, chain: [c], closed: false, wellFormed: false } };
  if (d2(planPoint(p, plan.value), c) > reach2) return { pin: null, refusal: null };
  const v = splitThrough(o, piece.edge, c);
  if (!v.ok) return { pin: null, refusal: { where: 'commit', code: v.code, detail: v.detail, chain: [c], closed: false, wellFormed: false } };
  return { pin: v.value, refusal: null };
}

/** The engine's `runVertex` on the doors' reads: the route piece's end the kerb's run along F's boundary reaches first from c. */
function runVertexOnDoors(o: Overlay, read: KerbRead, contacts: readonly LatticePoint[], c: LatticePoint): VertexId | null {
  const p = o.plat;
  const near = query(p, o.key, o.level, { minX: c.x - 2, minY: c.y - 2, maxX: c.x + 2, maxY: c.y + 2 }, { edges: true });
  const piece = nearestRoutePiece(p, near.edges, c, o.level);
  if (piece === null) return null;
  const a = pointOf(p, piece.a);
  const b = pointOf(p, piece.b);
  if (!onRings(read.rings, a) || !onRings(read.rings, b)) return null;
  const da = d2(a, c);
  const db = d2(b, c);
  const order = da < db || (da === db && (a.y < b.y || (a.y === b.y && a.x <= b.x))) ? [piece.a, piece.b] : [piece.b, piece.a];
  for (const v of order) {
    const e = pointOf(p, v);
    if (!onRings(read.kerb, e) || !onRings(read.kerb, { x: ((c.x + e.x) * 0.5) as Cm, y: ((c.y + e.y) * 0.5) as Cm })) continue;
    if (!contacts.some((q) => (q.x !== c.x || q.y !== c.y) && d2(q, e) > 1 && nearestOn(q, c, e).d2 <= 1)) return v;
  }
  return null;
}

/** Is q strictly inside the face's route rings (non-zero winding) and off their hot pixel (the engine's `insideRings`)? */
function insideF(rings: readonly (readonly LatticePoint[])[], q: LatticePoint): boolean {
  if (onRings(rings, q)) return false;
  let wind = 0;
  for (const r of rings) {
    for (let k = 0; k < r.length; k += 1) {
      const a = r[k];
      const b = r[(k + 1) % r.length];
      const o2 = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
      if (a.y <= q.y) {
        if (b.y > q.y && o2 > 0) wind += 1;
      } else if (b.y <= q.y && o2 < 0) wind -= 1;
    }
  }
  return wind !== 0;
}

/** The engine's `pieceWidth`: how far the piece's vertices and segment midpoints stand from F's boundary at most (cm). */
function widthOf(rings: readonly (readonly LatticePoint[])[], q: readonly LatticePoint[]): number {
  const far = (z: { x: number; y: number }): number => Math.min(...rings.flatMap((r) => r.map((a, i) => nearestOn(z, a, r[(i + 1) % r.length]).d2)));
  let w = 0;
  for (let i = 0; i < q.length; i += 1) {
    w = Math.max(w, far(q[i]));
    if (i + 1 < q.length) w = Math.max(w, far({ x: (q[i].x + q[i + 1].x) * 0.5, y: (q[i].y + q[i + 1].y) * 0.5 }));
  }
  return Math.sqrt(w);
}

/** A sliver piece to fold: "face piece fold" (the engine's key). */
const foldKey = (face: FaceId, piece: number): string => `${String(face)} ${String(piece)} fold`;

/** An end of an open piece to pin first: "face piece end" (the engine's key). */
const endKey = (face: FaceId, piece: number, end: 0 | 1): string => `${String(face)} ${String(piece)} ${String(end)}`;

/** What one replay run met: a door's refusal, an end to pin first on the next run, or the engine's own stop (null). */
type Step = { kind: 'refusal'; replay: Replay } | { kind: 'retry'; key: string } | { kind: 'stop' } | null;

/**
 * N-57 (2)'s closing of an open piece's dangling ends, on the doors alone: an end vertex with one edge within
 * attractCm + 1 cm of its contact gets the contact pinned AT it (the vertex at it, else a `splitThrough` of the route
 * piece of F's boundary when the placement lands within the contact's 1 cm plus the hot pixel) and the chord from the
 * tip to it through `insertChain`; an end that cannot be closed so is named for the next run.
 */
function closeOnDoors(o: Overlay, read: KerbRead, contacts: readonly LatticePoint[], index: number, pts: readonly LatticePoint[], ends: VertexId[], rows: { role: string; entity: string }[], pinned: ReadonlySet<string>): Step {
  const p = o.plat;
  const rings = read.rings;
  const face = read.face;
  for (const k of [0, 1] as const) {
    const tip = ends[k];
    if ([...outgoing(p, tip)].length !== 1 || pinned.has(endKey(face, index, k))) continue;
    if (!insideF(rings, pointOf(p, tip))) continue;
    const c = k === 0 ? pts[0] : pts[pts.length - 1];
    const off2 = d2(pointOf(p, tip), c);
    if (off2 > ALONG_SQ) return { kind: 'retry', key: endKey(face, index, k) };
    const pin = off2 <= CHORD_MAX * CHORD_MAX ? pinOnDoors(o, rings, c, PIN_SQ) : { pin: null, refusal: null };
    if (pin.refusal !== null) return { kind: 'refusal', replay: pin.refusal };
    if (pin.pin === null) {
      // the engine's along-run closing: the tip joined to the run's first vertex; refused, the end is pinned first
      const far = runVertexOnDoors(o, read, contacts, c);
      if (far !== null && far !== tip) {
        const along = k === 0 ? [pointOf(p, far), pointOf(p, tip)] : [pointOf(p, tip), pointOf(p, far)];
        const ins = insertChain(o, along, rows, 'mandatory');
        if (!ins.ok && ins.code === 'E_WORK_LIMIT') return { kind: 'refusal', replay: { where: 'commit', code: ins.code, detail: ins.detail, chain: along, closed: false, wellFormed: wellFormed(along, false) } };
        if (ins.ok) {
          ends[k] = far;
          continue;
        }
      }
      return { kind: 'retry', key: endKey(face, index, k) };
    }
    if (pin.pin === tip) continue;
    const chord = k === 0 ? [pointOf(p, pin.pin), pointOf(p, tip)] : [pointOf(p, tip), pointOf(p, pin.pin)];
    const ins = insertChain(o, chord, rows, 'mandatory');
    if (!ins.ok && !(ins.code === 'E_DEGENERATE' && ins.detail === 'empty')) return { kind: 'refusal', replay: { where: 'commit', code: ins.code, detail: ins.detail, chain: chord, closed: false, wellFormed: wellFormed(chord, false) } };
    if (ins.ok) ends[k] = pin.pin;
  }
  return null;
}

/**
 * A piece with ends pinned first, on the doors alone (the engine's `insertPinned`): each named end's contact pinned
 * within attractCm, the piece's vertices beside it within attractCm dropped, the piece inserted onto the pins.
 */
function insertPinnedOnDoors(o: Overlay, rings: readonly LatticePoint[][], face: FaceId, index: number, q: readonly LatticePoint[], rows: { role: string; entity: string }[], pinned: ReadonlySet<string>): { step: Step; pts: LatticePoint[]; placed: VertexId[] | null } {
  const p = o.plat;
  const marked = [pinned.has(endKey(face, index, 0)), pinned.has(endKey(face, index, 1))];
  let lo = 0;
  let hi = q.length - 1;
  if (marked[0]) {
    lo = 1;
    while (lo < hi && d2(q[lo], q[0]) <= ATTRACT_SQ) lo += 1;
  }
  if (marked[1]) {
    hi = q.length - 2;
    while (hi > lo && d2(q[hi], q[q.length - 1]) <= ATTRACT_SQ) hi -= 1;
  }
  const pts = lo <= hi ? q.slice(lo, hi + 1) : [];
  for (const k of [0, 1] as const) {
    if (!marked[k]) continue;
    const pin = pinOnDoors(o, rings, k === 0 ? q[0] : q[q.length - 1], ATTRACT_SQ);
    if (pin.refusal !== null) return { step: { kind: 'refusal', replay: pin.refusal }, pts, placed: null };
    // a contact that cannot be pinned is the engine's own refusal
    if (pin.pin === null) return { step: { kind: 'stop' }, pts, placed: null };
    if (k === 0) pts.unshift(pointOf(p, pin.pin));
    else pts.push(pointOf(p, pin.pin));
  }
  const ins = insertChain(o, pts, rows, 'mandatory');
  if (!ins.ok && !(ins.code === 'E_DEGENERATE' && ins.detail === 'empty')) return { step: { kind: 'refusal', replay: { where: 'commit', code: ins.code, detail: ins.detail, chain: pts, closed: false, wellFormed: wellFormed(distinct(pts), false) } }, pts, placed: null };
  return { step: null, pts, placed: ins.ok ? [ins.value.placed[0], ins.value.placed[ins.value.placed.length - 1]] : null };
}

/**
 * A band commit on insertChain alone: on a fresh copy of the arena, in a batch of the op's level, every face's kerb read
 * (a read's refusal replayed on its overlay), then per face in canonical order its outline pieces and its splits (the
 * ones the engine draws: their kerb point on the outline) — each through `insertChain` directly; an end the closing
 * cannot close at its contact starts the replay again on a fresh copy with that end pinned first. The first refusal
 * other than a collapse, or null.
 */
export function replayCommit(c: CommitSpec): Replay | null {
  const pinned = new Set<string>();
  for (;;) {
    const { p, faces } = c.build();
    const unique = [...new Set(faces)].sort((a, b) => compareFaces(p, 1, a, b));
    const reads: KerbRead[] = [];
    for (const f of unique) {
      const r = readKerb(p, f, c.widths);
      if (!r.ok) return replayKerb(p, f, c.widths);
      reads.push(r.value);
    }
    let found: Step = null;
    const outlineRole = roleIdOf(c.edgeRole);
    const deferred: { v: VertexId; key: string | null }[] = [];
    tx(p, spec(c.level, c.over), (o: Overlay): KernelResult<null> => {
      const stop: KernelResult<null> = { ok: false, code: 'E_INVARIANT', detail: 'replay: stop' };
      for (const read of reads) {
        if (read.spines.size === 0) continue;
        const entity = c.entityOf(p, read.face);
        const rows = [{ role: c.edgeRole, entity }];
        const pieces = outlinePieces(read);
        const contacts = pieces.filter((q) => !q.closed).flatMap((q) => [q.points[0], q.points[q.points.length - 1]]);
        for (let i = 0; i < pieces.length; i += 1) {
          const piece = pieces[i];
          if (!piece.closed && pinned.has(foldKey(read.face, i))) continue;
          const fold = (): boolean => !pinned.has(foldKey(read.face, i)) && widthOf(read.rings, piece.points) <= LATTICE.attractCm;
          let pts = piece.points;
          let placed: VertexId[] | null;
          if (!piece.closed && (pinned.has(endKey(read.face, i, 0)) || pinned.has(endKey(read.face, i, 1)))) {
            const pf = insertPinnedOnDoors(o, read.rings, read.face, i, piece.points, rows, pinned);
            if (pf.step !== null) {
              // an unpinnable contact: the engine folds a sliver piece, else refuses on its own
              found = pf.step.kind === 'stop' && fold() ? { kind: 'retry', key: foldKey(read.face, i) } : pf.step;
              return stop;
            }
            if (pf.placed === null) continue;
            pts = pf.pts;
            placed = pf.placed;
          } else {
            const ins = insertChain(o, piece.points, rows, 'mandatory', piece.closed ? { closed: true } : {});
            if (!ins.ok && !(ins.code === 'E_DEGENERATE' && ins.detail === 'empty')) {
              found = { kind: 'refusal', replay: { where: 'commit', code: ins.code, detail: ins.detail, chain: piece.points, closed: piece.closed, wellFormed: wellFormed(distinct(piece.points), piece.closed) } };
              return stop;
            }
            if (!ins.ok || piece.closed) continue;
            placed = ins.value.placed;
          }
          const ends = [placed[0], placed[placed.length - 1]];
          const closing = closeOnDoors(o, read, contacts, i, pts, ends, rows, pinned);
          if (closing !== null) {
            found = closing;
            return stop;
          }
          // the engine's post-condition: a dangling tip inside F folds a sliver piece or is the engine's own refusal;
          // one across F's boundary is judged once every face is in
          for (const v of ends) {
            if ([...outgoing(p, v)].length !== 1) continue;
            if (!insideF(read.rings, pointOf(p, v))) {
              deferred.push({ v, key: fold() ? foldKey(read.face, i) : null });
              continue;
            }
            found = fold() ? { kind: 'retry', key: foldKey(read.face, i) } : { kind: 'stop' };
            return stop;
          }
        }
        for (const pts of read.splits) {
          if (!onOutline(p, p.key, pts[1], outlineRole)) continue;
          const ins = insertChain(o, pts, [{ role: 'corridor_split', entity }], 'mandatory');
          if (!ins.ok && !(ins.code === 'E_DEGENERATE' && ins.detail === 'empty')) {
            found = { kind: 'refusal', replay: { where: 'commit', code: ins.code, detail: ins.detail, chain: pts, closed: false, wellFormed: wellFormed(pts, false) } };
            return stop;
          }
        }
      }
      for (const d of deferred) {
        if ([...outgoing(p, d.v)].length !== 1) continue;
        found = d.key !== null ? { kind: 'retry', key: d.key } : { kind: 'stop' };
        return stop;
      }
      return { ok: false, code: 'E_INVARIANT', detail: 'replay: done' };
    });
    const step = found as Step;
    if (step === null || step.kind === 'stop') return null;
    if (step.kind === 'refusal') return step.replay;
    if (pinned.has(step.key)) return null;
    pinned.add(step.key);
  }
}

/**
 * The class of an operation's refusal: insertChain's when the replay meets the same code and detail on a well-formed
 * chain, else the item's own.
 */
export function classify(r: Refusal, replay: Replay | null): RefusalClass {
  return replay !== null && replay.code === r.code && replay.detail === r.detail && replay.wellFormed ? 'insertChain' : 'own';
}
