// Gate picks and gates (§4.2 S3 (4), (7); MFP-4; M0-c-01). The land law N₁ = round(1 + 0.47 · √A_ha), A the stage-1
// land, its two constants walls.json's `gateLaw` cells (the waterfront and closed-arc reductions are M1's: no water on
// the flat fixture, C-0032). Picks are sequential nested picks from the `gate.pick` stream on the pick contour (the
// level set of stage 1's land in the terrain-only field, a = 1): pick i scores every candidate — the contour's inside
// nodes — by its angular gap to the earlier picks (seen from the nucleus), its nearness to a requested bearing, the
// terrain (steep ground down) and a jitter, one uniform per candidate per pick, so the draws of pick i never depend on
// N and a smaller N is always a prefix of a larger one. Each gate is the first point at which its solved route, walked
// outward from the plaza, reaches T = t₁: the midpoint of the first route edge leaving the selection, which is the
// contour's own crossing there (C-0017), so every gate is a contour vertex. Choices: C-XXXX.
import { type LatticePoint, type Stream } from '@plat/kernel';
import type { TableView } from '@plat/tables';
import { angularGap, bearingCdeg, latticeAt } from './geom.js';
import type { Gate, GatePick, GateRoute, LevelSet } from './types.js';

/** The jitter's weight in a pick's score (an own pick, C-XXXX (2)): at most 900 cdeg of angular gap. */
export const PICK_JITTER = 0.05;
/** The requested bearing's weight (C-XXXX (2)). */
export const PICK_BEARING_WEIGHT = 0.5;
/** The terrain term's weight on the candidate's slope (rise over run; C-XXXX (2)). */
export const PICK_SLOPE_WEIGHT = 1;
/** The candidates kept per pick for F-WALL's re-draw: the pick and three more (§4.2 S3 (7): ≤ 3 attempts). */
export const PICK_RANKED = 4;

/** §4.2 S3 (4)'s land law from walls.json's `gateLaw` cells: round(intercept + coefficient · √A_ha). */
export function gateCount(landHa: number, tables: TableView): number {
  if (!(landHa >= 0 && landHa < Infinity)) throw new RangeError(`gateCount: the land is a finite area ≥ 0 ha, got ${String(landHa)}`);
  const t = tables.table('walls');
  return Math.round(t.num('gateLaw', 'intercept') + t.num('gateLaw', 'coefficient') * Math.sqrt(landHa));
}

/** The pick options: requested bearings (cdeg) in pick order, and the nucleus the gaps are seen from. */
export interface PickOptions {
  requestedBearingsCdeg?: readonly number[];
  centre?: LatticePoint;
}

/** The pick contour's candidates: the selection's nodes on its contour (inside ends of the crossed edges), by index. */
export function pickCandidates(contour: LevelSet): number[] {
  const set = new Set<number>();
  for (const [u] of contour.contourEdges) set.add(u);
  return [...set].sort((a, b) => a - b);
}

/**
 * §4.2 S3 (4)'s sequential nested picks: `n` picks on the pick contour from `stream` (the `gate.pick` concern). Each
 * carries its candidates ranked by score for F-WALL's re-draw.
 */
export function gatePicks(contour: LevelSet, n: number, stream: Stream, opts: PickOptions = {}): GatePick[] {
  if (!(Number.isInteger(n) && n >= 0)) throw new RangeError(`gatePicks: N is a whole number ≥ 0, got ${String(n)}`);
  const lattice = contour.field.lattice;
  const pts = lattice.points;
  const centre = opts.centre ?? { x: 0, y: 0 };
  const cands = pickCandidates(contour);
  const bearing = cands.map((i) => bearingCdeg(pts[i].x - centre.x, pts[i].y - centre.y));
  const slope = cands.map((i) => lattice.slope[i]);
  const picks: GatePick[] = [];
  const taken = new Set<number>();
  for (let k = 0; k < n; k += 1) {
    const req = opts.requestedBearingsCdeg?.[k];
    const scored: { c: number; score: number }[] = [];
    for (let c = 0; c < cands.length; c += 1) {
      const u = stream.float01();
      let gap = 1;
      if (picks.length > 0) {
        let g = 18_000;
        for (const p of picks) g = Math.min(g, angularGap(bearing[c], bearingCdeg(pts[p.node].x - centre.x, pts[p.node].y - centre.y)));
        gap = g / 18_000;
      }
      let score = gap + PICK_JITTER * u - PICK_SLOPE_WEIGHT * slope[c];
      if (req !== undefined) score -= PICK_BEARING_WEIGHT * (angularGap(bearing[c], req) / 18_000);
      if (taken.has(cands[c])) score = -Infinity;
      scored.push({ c, score });
    }
    scored.sort((a, b) => b.score - a.score || cands[a.c] - cands[b.c]);
    if (scored.length === 0 || scored[0].score === -Infinity) break;
    const ranked = scored.slice(0, PICK_RANKED).filter((s) => s.score > -Infinity).map((s) => cands[s.c]);
    const node = ranked[0];
    taken.add(node);
    const pick: GatePick = { ordinal: k, node, at: pts[node], ranked, forced: false };
    if (req !== undefined) pick.requestedBearingCdeg = req;
    picks.push(pick);
  }
  return picks;
}

/**
 * The gates on the boundary (§4.2 S3 (7)): per route, the first point at which it reaches T = t₁ walked outward from
 * its plaza end — the midpoint of its first edge from a selected node to an unselected one (the contour's crossing,
 * C-0017). A route that never leaves the selection gives no gate (null).
 */
export function gatesOnBoundary(routes: readonly GateRoute[], t1: number, set: LevelSet): (Gate | null)[] {
  if (set.t !== t1) throw new RangeError(`gatesOnBoundary: the level set is at t = ${String(set.t)}, not t₁ = ${String(t1)}`);
  const pts = set.field.lattice.points;
  return routes.map((r) => {
    for (let k = 1; k < r.nodes.length; k += 1) {
      const u = r.nodes[k - 1];
      const v = r.nodes[k];
      if (set.selected[u] === 1 && set.selected[v] === 0) {
        return {
          ordinal: r.ordinal,
          at: latticeAt((pts[u].x + pts[v].x) * 0.5, (pts[u].y + pts[v].y) * 0.5),
          edge: [u, v] as [number, number],
          routeIndex: k - 1,
          bearingCdeg: r.bearingCdeg,
        };
      }
    }
    return null;
  });
}
