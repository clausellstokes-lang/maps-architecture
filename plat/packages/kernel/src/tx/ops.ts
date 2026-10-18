// The declared form's ops (§3.3 *Two op forms*): each a writer call with its sort key — the owning entity's lineage key
// and the op's index in that entity's stream path. The writers M0-a-04 … M0-a-06 build have their constructors here;
// a later item's writer runs in a declared batch through `kernelOp` (tx.ts). M0-a-06.
import { dest, edgeLevel, isHalfEdgeLive, isVertexLive, outgoing, type FaceId, type HalfEdgeId, type RoleRow, type VertexId } from '../arena/index.js';
import { HOT_PIXEL_CM, routeRun } from '../index/index.js';
import { orient2d } from '../num/index.js';
import type { LineageHash } from '../hash/index.js';
import { insertChain, splitThrough, type ChainClass, type ChainInsert, type InsertChainOpts } from '../insert/index.js';
import type { ChainRef, EdgeSetRef, FaceRef, Id, LatticePoint, Level, RoleName, StretchRef, VertexRef } from '../types/index.js';
import type { AnyProfile } from './profile.js';
import { kernelOp } from './tx.js';
import type { Conflict, KernelOp, Overlay, RemoveResult, RetypeResult } from './types.js';
import { clearFiner, removeEdges, retypeEdges, setOwner } from './writers.js';

/** insertChain as a declared op. */
export function opInsertChain(lineage: LineageHash, index: number, points: readonly LatticePoint[], roles: readonly RoleRow[], cls: ChainClass, opts: InsertChainOpts = {}): KernelOp<ChainInsert> {
  return kernelOp('insertChain', lineage, index, (o) => insertChain(o, points, roles, cls, opts));
}

/** The level-n route piece a declared splitThrough op names, as the batch found it: its ends and its level. */
interface Piece {
  readonly a: VertexId;
  readonly b: VertexId;
  readonly ax: number;
  readonly ay: number;
  readonly bx: number;
  readonly by: number;
  readonly m: Level;
}

/** The piece of the level-n route holding `at` (the run cut at its vertices of level ≤ n), read when the batch opens. */
function pieceAt(o: Overlay, at: HalfEdgeId): Piece | null {
  const p = o.plat;
  if (!isHalfEdgeLive(p, at) || edgeLevel(p, at) > o.level) return null;
  const run = routeRun(p, at).halfEdges;
  const L = p.vertices.level;
  const O = p.halfEdges.origin;
  const i = run.findIndex((h) => h === at || h === (at ^ 1));
  if (i < 0) return null;
  let j0 = i;
  while (L[O[run[j0]]] > o.level) j0 -= 1;
  let j1 = i;
  while (L[O[run[j1] ^ 1]] > o.level) j1 += 1;
  // Directed as `at` is: from the end `at` leaves toward the end it enters.
  const forward = run[i] === at;
  const a = forward ? O[run[j0]] : O[run[j1] ^ 1];
  const b = forward ? O[run[j1] ^ 1] : O[run[j0]];
  const X = p.vertices.x;
  const Y = p.vertices.y;
  return { a, b, ax: X[a], ay: Y[a], bx: X[b], by: Y[b], m: edgeLevel(p, at) };
}

/**
 * The tolerance off the piece's chord a sub-edge's far end may stand: four hot pixels (0.71 cm, §3.6) — a split vertex
 * stands within one of its run's route, and the piece's ends may be Steiner vertices themselves; another edge of the
 * level that close to the chord and advancing along it would break §3.10's clearance.
 */
const OFF_CHORD_CM = 4 * HOT_PIXEL_CM;

/**
 * The half-edge of the piece's current sub-piece that holds p's foot: the piece as it is now, walked from its first end
 * to its last along edges of its level (each step the outgoing edge that advances along the chord and stands nearest
 * it, within OFF_CHORD_CM), cut at its vertices of level ≤ n; the sub-piece whose span along the chord holds p's
 * projection (the first or last where p projects beyond the piece). Null where the walk does not reach the far end.
 */
function currentSub(o: Overlay, pc: Piece, pIn: LatticePoint): HalfEdgeId | null {
  const p = o.plat;
  if (!isVertexLive(p, pc.a) || !isVertexLive(p, pc.b)) return null;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const dx = pc.bx - pc.ax;
  const dy = pc.by - pc.ay;
  const l2 = dx * dx + dy * dy;
  const along = (x: number, y: number): number => (x - pc.ax) * dx + (y - pc.ay) * dy;
  const tol2 = OFF_CHORD_CM * OFF_CHORD_CM * l2;
  const target = along(pIn.x, pIn.y);
  let u = pc.a;
  let first: HalfEdgeId = -1; // the current sub-piece's first half-edge
  for (let guard = 0; u !== pc.b; guard++) {
    if (guard > p.halfEdges.origin.length) return null;
    let best: HalfEdgeId = -1;
    let bestOff = Infinity;
    const su = along(X[u], Y[u]);
    for (const g of outgoing(p, u)) {
      if (edgeLevel(p, g) !== pc.m) continue;
      const w = dest(p, g);
      if (along(X[w], Y[w]) <= su) continue;
      const off = orient2d(pc.ax, pc.ay, pc.bx, pc.by, X[w], Y[w]);
      const off2 = off * off;
      if (off2 > tol2) continue;
      if (off2 < bestOff) {
        best = g;
        bestOff = off2;
      }
    }
    if (best < 0) return null;
    if (first < 0) first = best;
    const w = dest(p, best);
    if (w === pc.b || L[w] <= o.level) {
      // The sub-piece from its first half-edge to w: does it hold p's projection (or is it the last)?
      if (w === pc.b || target <= along(X[w], Y[w])) return first;
      first = -1;
    }
    u = w;
  }
  return null;
}

/**
 * splitThrough as a declared op. `at` names a half-edge of the arena as the batch found it; the op reads, when the batch
 * opens (`prepare`), the level-n route piece holding it, and applies to the sub-piece of that piece that holds p's foot
 * when it runs — so two ops of one batch on one edge (§3.3 rule 2's two bank points as `anchor` contact names) each
 * land at their own point in either issue order, the canonical order deciding only their ordinals (C-0189). Where the
 * piece cannot be re-found (an earlier op removed it), `at` itself is used, as the callback form would.
 */
export function opSplitThrough(lineage: LineageHash, index: number, at: HalfEdgeId, p: LatticePoint, row?: RoleRow): KernelOp<VertexId> {
  const pieces = new WeakMap<Overlay, Piece | null>();
  return {
    ...kernelOp('splitThrough', lineage, index, (o) => {
      const pc = pieces.get(o) ?? null;
      const sub = pc === null ? null : currentSub(o, pc, p);
      return splitThrough(o, sub ?? at, p, row);
    }),
    prepare: (o) => void pieces.set(o, pieceAt(o, at)),
  };
}

/** removeEdges as a declared op. */
export function opRemoveEdges(lineage: LineageHash, index: number, ref: ChainRef | EdgeSetRef | StretchRef | VertexRef, profiles: readonly AnyProfile[] = []): KernelOp<RemoveResult> {
  return kernelOp('removeEdges', lineage, index, (o) => removeEdges(o, ref, profiles));
}

/** clearFiner as a declared op. */
export function opClearFiner(lineage: LineageHash, index: number, faces: FaceRef, level: Level): KernelOp<Conflict[]> {
  return kernelOp('clearFiner', lineage, index, (o) => clearFiner(o, faces, level));
}

/** retypeEdges as a declared op. */
export function opRetypeEdges(
  lineage: LineageHash,
  index: number,
  ref: ChainRef | EdgeSetRef | StretchRef,
  add: readonly RoleRow[],
  remove: readonly RoleName[],
  rekey?: { from: Id; to: Id; profiles?: { from?: AnyProfile; to?: AnyProfile }[] },
): KernelOp<RetypeResult> {
  return kernelOp('retypeEdges', lineage, index, (o) => retypeEdges(o, ref, add, remove, rekey));
}

/** setOwner as a declared op. */
export function opSetOwner(lineage: LineageHash, index: number, faces: readonly FaceId[], owner: Id): KernelOp<void> {
  return kernelOp('setOwner', lineage, index, (o) => setOwner(o, faces, owner));
}
