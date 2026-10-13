// Chains and stretches as the writers read them (§2.2 rule 5 *Stretches* (J-K31); §3.4 *Stretches*): a ref's edges,
// a StretchRef resolved at the batch's current state, the runs a set of edges forms (the arena's run ordering, read
// without writing, so a writer can plan the chains it will leave), and their own-level routes. M0-a-06.
import {
  dest,
  handleOf,
  isVertexLive,
  resolve,
  roleInfo,
  rowElement,
  rowsOfKey,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { edgeRuns } from '../arena/resolve.js';
import { query } from '../index/index.js';
import { degenerate, ok, type KernelResult } from '../num/index.js';
import type { ChainRef, EdgeSetRef, LatticePoint, Level, PlatKey, StretchRef, VertexRef } from '../types/index.js';
import type { RouteLine } from './profile.js';
import { check, roleId } from './state.js';

/** The edge pairs carrying a key (an edge role's ChainRef or EdgeSetRef; an absent ordinal reads 0). */
export function pairsOfKey(p: Plat, ref: ChainRef | EdgeSetRef): number[] {
  const role = roleId(ref.role);
  check(roleInfo(role).kind === 'edge', `${ref.role} is not an edge role`);
  const ordinal = 'ordinal' in ref && ref.ordinal !== undefined ? ref.ordinal : 0;
  return rowsOfKey(p, role, handleOf(p, ref.entity), ordinal).map((r) => rowElement(p, r));
}

/**
 * The runs a set of edge pairs forms: the arena's one run ordering (C-0146 (5)), stated once above `edgeRuns`
 * (arena/resolve.ts) — open runs from their lower (y, x) end, rings from their lowest-leftmost vertex counter-clockwise,
 * runs by their first two vertices. Computed without writing, so a writer can plan the chains it will leave.
 */
export const runsOfPairs = edgeRuns;

/**
 * The own-level routes of runs — §2.2 rule 5's route: per run, its vertices of level ≤ `level` with their arc lengths
 * from the run's first route vertex (cumulative √ of integer squared lengths), a ring's length closing back to its start.
 * A ring starts at its first route vertex in run order, so the start never depends on a slot. `routeLines` reads it.
 */
export function linesOfRuns(p: Plat, runs: readonly HalfEdgeId[][], level: Level): RouteLine[] {
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  return runs.map((run) => {
    const all: VertexId[] = [O[run[0]], ...run.map((h) => O[h ^ 1])];
    const closed = all[0] === all[all.length - 1];
    const seq = closed ? all.slice(0, -1) : all;
    const vs = seq.filter((v) => L[v] <= level);
    check(vs.length >= (closed ? 1 : 2), 'a run has route vertices at its own level');
    const pos: number[] = [0];
    for (let i = 1; i < vs.length; i++) {
      const dx = X[vs[i]] - X[vs[i - 1]];
      const dy = Y[vs[i]] - Y[vs[i - 1]];
      pos.push(pos[i - 1] + Math.sqrt(dx * dx + dy * dy));
    }
    let length = pos[pos.length - 1];
    if (closed) {
      const dx = X[vs[0]] - X[vs[vs.length - 1]];
      const dy = Y[vs[0]] - Y[vs[vs.length - 1]];
      length += Math.sqrt(dx * dx + dy * dy);
    }
    return { vertices: vs, pos, closed, length };
  });
}

/** A resolved stretch: the run holding it (in chain order), its half-edges from `from`, its two end vertices. */
export interface Span {
  readonly chain: ChainRef;
  readonly run: HalfEdgeId[];
  readonly closed: boolean;
  readonly half: HalfEdgeId[];
  readonly from: VertexId;
  readonly to: VertexId;
}

/** A stretch end: a vertex by its vertex role, or the vertex at a lattice point; −1 when none or several. */
function endVertex(p: Plat, key: PlatKey, e: VertexRef | LatticePoint): VertexId {
  if ('role' in e) {
    const r = resolve(p, e, key);
    return r.view === 'vertices' && r.vertices.length === 1 ? r.vertices[0] : -1;
  }
  if (!Number.isInteger(e.x) || !Number.isInteger(e.y)) return -1;
  const vs = query(p, key, 4, { minX: e.x, minY: e.y, maxX: e.x, maxY: e.y }, { vertices: true }).vertices;
  return vs.length === 1 && isVertexLive(p, vs[0]) ? vs[0] : -1;
}

/**
 * §3.4's stretch resolution at the batch's current state: each end must be a vertex of the chain — by a vertex role
 * or by its lattice point — and both on one part of it, else E_DEGENERATE `stretch`; the stretch is the chain's
 * edges between them, in chain order on an open run and from `from` counter-clockwise to `to` on a ring.
 */
export function resolveStretch(p: Plat, key: PlatKey, ref: StretchRef): KernelResult<Span> {
  check(roleInfo(roleId(ref.chain.role)).kind === 'edge', `${ref.chain.role} is not an edge role`);
  const r = resolve(p, ref.chain, key);
  if (r.view !== 'edges' || r.runs.length === 0) return degenerate('stretch');
  const from = endVertex(p, key, ref.from);
  const to = endVertex(p, key, ref.to);
  if (from < 0 || to < 0 || from === to) return degenerate('stretch');
  const O = p.halfEdges.origin;
  for (const run of r.runs) {
    const closed = O[run[0]] === dest(p, run[run.length - 1]);
    const vs: VertexId[] = [O[run[0]], ...run.map((h) => O[h ^ 1])];
    const n = closed ? run.length : vs.length;
    const iFrom = vs.slice(0, n).indexOf(from);
    const iTo = vs.slice(0, n).indexOf(to);
    if (iFrom < 0 || iTo < 0) continue;
    let half: HalfEdgeId[];
    if (!closed) half = run.slice(Math.min(iFrom, iTo), Math.max(iFrom, iTo));
    else half = iFrom < iTo ? run.slice(iFrom, iTo) : run.slice(iFrom).concat(run.slice(0, iTo));
    const first = closed ? from : iFrom < iTo ? from : to;
    const last = closed ? to : iFrom < iTo ? to : from;
    return ok({ chain: ref.chain, run, closed, half, from: first, to: last });
  }
  return degenerate('stretch');
}
