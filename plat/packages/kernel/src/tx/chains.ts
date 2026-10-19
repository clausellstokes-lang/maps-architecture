// Chains and stretches as the writers read them (§2.2 rule 5 *Stretches* (J-K31); §3.4 *Stretches*): a ref's edges,
// a StretchRef resolved at the batch's current state, the runs a set of edges forms (in `resolve`'s order, computed
// without writing, so a writer can plan the chains it will leave), and their own-level routes. M0-a-06.
import {
  compareVertices,
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
import { query } from '../index/index.js';
import { degenerate, ok, orient2d, type KernelResult } from '../num/index.js';
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
 * The runs a set of edge pairs forms, in `resolve`'s order (C-0146 (5)): maximal paths between vertices where the set
 * does not continue in exactly one way, each open run from its lower (y, x) end (a loop off a branch vertex toward the
 * smaller neighbour), each ring from its lowest-leftmost vertex counter-clockwise; runs by their first two vertices.
 */
export function runsOfPairs(p: Plat, pairsIn: readonly number[]): HalfEdgeId[][] {
  const pairs = [...new Set(pairsIn)];
  const O = p.halfEdges.origin;
  const at = new Map<VertexId, number[]>();
  for (const e of pairs) {
    for (const v of [O[2 * e], O[2 * e + 1]]) {
      const list = at.get(v) ?? [];
      list.push(e);
      at.set(v, list);
    }
  }
  const used = new Set<number>();
  const walk = (s: VertexId, e0: number): HalfEdgeId[] => {
    const run: HalfEdgeId[] = [];
    let v = s;
    let e = e0;
    for (;;) {
      used.add(e);
      const h = O[2 * e] === v ? 2 * e : 2 * e + 1;
      run.push(h);
      v = O[h ^ 1];
      const inc = at.get(v) as number[];
      if (inc.length !== 2) break;
      const n = inc[0] === e ? inc[1] : inc[0];
      if (used.has(n)) break;
      e = n;
    }
    return run;
  };
  const flip = (run: HalfEdgeId[]): HalfEdgeId[] => run.map((h) => h ^ 1).reverse();
  const runs: HalfEdgeId[][] = [];
  // Open runs from every end or branch vertex, visited in lattice order so no slot decides anything.
  const branch = [...at.keys()].filter((v) => (at.get(v) as number[]).length !== 2).sort((a, b) => compareVertices(p, a, b));
  for (const v of branch) {
    const inc = (at.get(v) as number[]).slice().sort((a, b) => compareVertices(p, O[2 * a] === v ? O[2 * a + 1] : O[2 * a], O[2 * b] === v ? O[2 * b + 1] : O[2 * b]));
    for (const e of inc) {
      if (used.has(e)) continue;
      let run = walk(v, e);
      const a = O[run[0]];
      const b = dest(p, run[run.length - 1]);
      if (a === b) {
        if (compareVertices(p, O[run[run.length - 1]], dest(p, run[0])) < 0) run = flip(run);
      } else if (compareVertices(p, b, a) < 0) {
        run = flip(run);
      }
      runs.push(run);
    }
  }
  // Rings: what is left lies on cycles where the set continues in exactly one way.
  const rest = pairs.filter((e) => !used.has(e)).sort((a, b) => compareVertices(p, O[2 * a], O[2 * b]) || compareVertices(p, O[2 * a + 1], O[2 * b + 1]));
  for (const e0 of rest) {
    if (used.has(e0)) continue;
    let run = walk(O[2 * e0], e0);
    let low = 0;
    for (let k = 1; k < run.length; k++) if (compareVertices(p, O[run[k]], O[run[low]]) < 0) low = k;
    run = run.slice(low).concat(run.slice(0, low));
    const v = O[run[0]];
    const a = dest(p, run[0]);
    const b = O[run[run.length - 1]];
    const X = p.vertices.x;
    const Y = p.vertices.y;
    const turn = orient2d(X[v], Y[v], X[a], Y[a], X[b], Y[b]);
    if (turn < 0 || (turn === 0 && compareVertices(p, b, a) < 0)) run = flip(run);
    runs.push(run);
  }
  runs.sort((r, s) => compareVertices(p, O[r[0]], O[s[0]]) || compareVertices(p, dest(p, r[0]), dest(p, s[0])));
  return runs;
}

/** The own-level routes of runs (their vertices of level ≤ `level`, with arc positions) — §2.2 rule 5's route. */
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
