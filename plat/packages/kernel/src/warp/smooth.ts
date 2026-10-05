// Smoothing committed geometry (§3.4 *The doors*, §3.6: "smoothing committed geometry is a `warp` whose field the
// smoother computes from the chain's current vertices"; §3.1's pinned-vertex Laplacian): each pass reads the chain's
// route vertices as they stand, gives every interior one the displacement w · (½(prev + next) − v) — an open chain's two
// ends and every kernel-pinned vertex none (the step holds the pinned ones, §3.6 held vertices (4)) — and applies it as
// one warp step at the batch's level, under every rule of a warp (held set, slides, re-seats, whole-step validation,
// halving). M0-a-13. Readings: C-0193 (6).
import { isVertexLive, resolve, VERTEX_PINNED, type Plat, type VertexId } from '../arena/index.js';
import { err, ok, type KernelResult } from '../num/index.js';
import { openTx } from '../tx/state.js';
import type { Overlay } from '../tx/types.js';
import type { ChainRef, Cm, Point } from '../types/index.js';
import { check, routeOf } from './held.js';
import type { DisplacementField, MoveReport, WarpOptions } from './types.js';
import { warp } from './warp.js';

/** The Laplacian's weight w (§3.1 names the smoother, not its weight; C-0193 (6)): half-way to the neighbours' mean. */
export const SMOOTH_WEIGHT = 0.5;

/** smoothCommitted's options: a warp's (the smoothing flag is set by the smoother) and the weight. */
export interface SmoothOptions extends WarpOptions {
  /** The Laplacian weight in (0, 1]; SMOOTH_WEIGHT by default. */
  readonly weight?: number;
}

/** The chain's route vertices per run, in run order (finer vertices on its runs are re-seated by the warp, not smoothed). */
function routeSequences(p: Plat, chain: ChainRef, key: Overlay['key']): { vs: VertexId[]; closed: boolean }[] {
  const r = resolve(p, chain, key);
  if (r.view !== 'edges') return [];
  const O = p.halfEdges.origin;
  return r.runs.map((run) => {
    const closed = O[run[0]] === O[run[run.length - 1] ^ 1];
    const vs: VertexId[] = run.map((h) => O[h]);
    if (!closed) vs.push(O[run[run.length - 1] ^ 1]);
    return { vs: vs.filter((v) => routeOf(p, v) === null), closed };
  });
}

/**
 * §3.6's smoothing of a committed chain: `passes` warp steps on the open overlay `o`, each with the field the
 * pinned-vertex Laplacian computes from the chain's current route vertices. Returns each pass's MoveReport (a pass that
 * halved to a no-op is reported, and the next pass reads the chain as it stands). A chain that resolves to no edge
 * gives []. Refuses E_DEGENERATE for a role that is not an edge role, and passes on a warp's refusal.
 */
export function smoothCommitted(o: Overlay, chain: ChainRef, passes: number, opts: SmoothOptions = {}): KernelResult<MoveReport[]> {
  const t = openTx(o);
  check(Number.isInteger(passes) && passes >= 0, 'smoothing passes are a whole number ≥ 0');
  const w = opts.weight ?? SMOOTH_WEIGHT;
  check(Number.isFinite(w) && w > 0 && w <= 1, 'the Laplacian weight lies in (0, 1]');
  const p = t.plat;
  const probe = resolve(p, chain, t.key);
  if (probe.view !== 'edges') return err('E_DEGENERATE', 'empty');
  const reports: MoveReport[] = [];
  for (let pass = 0; pass < passes; pass++) {
    const X = p.vertices.x;
    const Y = p.vertices.y;
    const field = new Map<string, { x: number; y: number }>();
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const { vs, closed } of routeSequences(p, chain, t.key)) {
      const n = vs.length;
      for (let i = 0; i < n; i++) {
        const v = vs[i];
        if (!isVertexLive(p, v)) continue;
        minX = Math.min(minX, X[v]);
        minY = Math.min(minY, Y[v]);
        maxX = Math.max(maxX, X[v]);
        maxY = Math.max(maxY, Y[v]);
        if (!closed && (i === 0 || i === n - 1)) continue;
        if ((p.vertices.flags[v] & VERTEX_PINNED) !== 0) continue;
        const a = vs[(i + n - 1) % n];
        const b = vs[(i + 1) % n];
        const dx = w * ((X[a] + X[b]) / 2 - X[v]);
        const dy = w * ((Y[a] + Y[b]) / 2 - Y[v]);
        if (dx !== 0 || dy !== 0) field.set(`${X[v]},${Y[v]}`, { x: dx, y: dy });
      }
    }
    if (field.size === 0) break;
    const f: DisplacementField = { displacement: (x, y) => field.get(`${x},${y}`) ?? { x: 0, y: 0 } };
    const region: Point[] = [
      { x: (minX - 1) as Cm, y: (minY - 1) as Cm },
      { x: (maxX + 1) as Cm, y: (minY - 1) as Cm },
      { x: (maxX + 1) as Cm, y: (maxY + 1) as Cm },
      { x: (minX - 1) as Cm, y: (maxY + 1) as Cm },
    ];
    const r = warp(o, f, t.level, region, undefined, { ...opts, smoothing: true });
    if (!r.ok) return err(r.code, r.detail);
    reports.push(r.value);
  }
  return ok(reports);
}
