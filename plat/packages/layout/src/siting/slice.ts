// The S3 slice as data (C-0032; M0-c-01): (2)'s main plaza alone, (3) the lattice and costs, (4) the gate picks by the
// land law, (5) the gate routes, (6) the field T and the stage-1 level set, (7) the gates on the boundary with F-WALL's
// gate rungs, and (13)'s destinations — the plaza's attach points and each gate with its bearing. Nothing is
// committed: M0-c-02 commits the outer ring, the border, the plaza's barrier face and the trace from this data.
//
// F-WALL's gate rungs (§4.2 S3 (7), §5.2; C-0085): two routes that first reach T = t₁ at one point cannot both be
// gates; the later pick is re-drawn from its next ranked candidate (≤ 3 attempts), then dropped and reported. Each
// re-draw or drop re-solves the routes and re-derives T and the level set from the routes that stand, so T's road set
// is the gates' own routes (C-0201 (6)) but for a route the deck rule re-solved (below). A route that re-enters the
// stage after its gate (relief can bend it back in) has its outward stretch re-solved outside the stage, so roads
// leaving the walled stage = N (§13.2; §4.3's wallCrossingPenalty, only at gates), reported as a `reroute`, ≤ 3 per
// route. The deck rule (§4.2 S3 (7)): a route whose first point at T = t₁ falls on a deck edge with the gate's point
// in the water (a gate standing in the river, which no trace can pin) is re-solved whole with every deck edge
// straddling the boundary excluded (`resolveOffDecks`), its gate then on ground; T and the boundary keep the route as
// (5) solved it and are not re-derived for it, ≤ 3 per route, and a route the re-solve cannot serve is `unserved`
// (F-ROUTE, §5.2). A gate on a deck edge whose point is dry stands as before: the rule's fuller reach (a gate anywhere
// on a raised stretch, or nearer it than the gatehouse's foot) reads §2.7's laws' gatehouse and band rows, M1's. The
// loop ends because every round re-draws, drops, re-solves or reroutes within those caps. C-0365.
import { CONCERNS, STAGES, type LatticePoint } from '@plat/kernel';
import type { Destination, GateSite } from '@plat/model';
import { workLimitOf, loadWorkLimits } from '@plat/tables';
import { fieldT, stageThreshold, type FieldOptions } from './field.js';
import { gateCount, gatePicks, gatesOnBoundary } from './gates.js';
import { bearingCdeg, HA_CM2, quot } from './geom.js';
import { buildLattice, inWater, siteCosts } from './lattice.js';
import { levelSet } from './levelset.js';
import { plaza as drawPlaza } from './plaza.js';
import { gateRoutes, plazaTree, rerouteOutside, resolveOffDecks } from './routes.js';
import type { Gate, GatePick, GateRoute, GateRung, Lattice, LevelSet, S3Slice, Site, Threshold, UnservedRoute } from './types.js';

/** The slice's options: a requested N₁, requested bearings, the water pull, route.nodes' limit, F-WALL's attempts. */
export interface SliceOptions {
  requestedN?: number;
  requestedBearingsCdeg?: readonly number[];
  pull?: FieldOptions['pull'];
  /** route.nodes' per-route limit; default the workLimits.json law over the lattice's node count. */
  routeNodesLimit?: number;
  /** Picks given instead of drawn (a fixture forcing F-WALL's coincidence, C-0085). */
  picks?: GatePick[];
}

/** F-WALL's re-draw cap (§4.2 S3 (7): "≤ 3 attempts"). */
export const GATE_REDRAWS = 3;

/** The stage-1 field over `fieldRoutes` (the routes T reads), its threshold, level set and the gates of `routes`. */
function boundaryOf(lattice: Lattice, fieldRoutes: GateRoute[], routes: GateRoute[], a1: number, areaCm2: number, pull: FieldOptions['pull']): { field: ReturnType<typeof fieldT>; threshold: Threshold; set: LevelSet; gates: (Gate | null)[] } {
  const field = fieldT(lattice, fieldRoutes, a1, pull === undefined ? {} : { pull });
  const threshold = stageThreshold(field, areaCm2);
  const set = levelSet(field, threshold.t);
  const gates = gatesOnBoundary(routes, threshold.t, set);
  return { field, threshold, set, gates };
}

/** The first pair of gates at one point, as [earlier, later] route positions, or null. */
function coincidence(gates: readonly (Gate | null)[]): [number, number] | null {
  for (let j = 1; j < gates.length; j += 1) {
    const b = gates[j];
    if (b === null) continue;
    for (let i = 0; i < j; i += 1) {
      const a = gates[i];
      if (a !== null && a.at.x === b.at.x && a.at.y === b.at.y) return [i, j];
    }
  }
  return null;
}

/** The stage-1 regime's anisotropy a₁ (regimes.json's `a` of the first stage's regime; walled core 1.3). */
export function stageA(site: Site, k = 0): number {
  return site.tables.table('regimes').num(site.land.regimes[k], 'a');
}

/** The contour direction at the nucleus (cdeg), or undefined on flat ground: the plaza's sides align to it. */
function contourBearing(site: Site): number | undefined {
  const t = site.terrain;
  const c = site.centre;
  const col = Math.floor(quot(c.x - t.originX, t.cellCm, 'length', 'terrain column'));
  const row = Math.floor(quot(c.y - t.originY, t.cellCm, 'length', 'terrain row'));
  if (col < 1 || row < 1 || col >= t.cols - 1 || row >= t.rows - 1) return undefined;
  const gx = t.heightCm[row * t.cols + col + 1] - t.heightCm[row * t.cols + col - 1];
  const gy = t.heightCm[(row + 1) * t.cols + col] - t.heightCm[(row - 1) * t.cols + col];
  if (gx === 0 && gy === 0) return undefined;
  // The contour runs perpendicular to the gradient (gx, gy): along (−gy, gx).
  return bearingCdeg(-gy, gx);
}

/**
 * The S3 slice on `site` (C-0032): the plaza, lattice, picks, routes, field, level set, gates, gate sites and
 * destinations, with the report (route.nodes, F-WALL's rungs, the unserved routes, the capped shortfall).
 */
export function s3Slice(site: Site, opts: SliceOptions = {}): S3Slice {
  const a1 = stageA(site, 0);
  const areaCm2 = site.land.stagesHa[0] * HA_CM2;
  const bearingHint = contourBearing(site);
  const thePlaza = drawPlaza(site.centre, site.stream(CONCERNS['reserve.plaza']), bearingHint === undefined ? { rung: site.rung } : { rung: site.rung, contourBearingCdeg: bearingHint });
  const costs = siteCosts(site, [{ id: 'plaza:0', ring: thePlaza.ring, attach: thePlaza.ring }]);
  const lattice = buildLattice(site, costs, site.stream(CONCERNS.route));
  const limit = opts.routeNodesLimit ?? workLimitOf(loadWorkLimits().law('route.nodes'), { kind: 'stage', stage: STAGES.S3 }, { latticeNodes: lattice.points.length });

  // (4) The pick contour: stage 1's land in the terrain-only field (a = 1), then the nested picks.
  const pickField = fieldT(lattice, [], 1);
  const pickT = stageThreshold(pickField, areaCm2);
  const pickSet = levelSet(pickField, pickT.t);
  const n = opts.requestedN ?? gateCount(site.land.stagesHa[0], site.tables);
  const pickOpts = opts.requestedBearingsCdeg === undefined ? { centre: site.centre } : { centre: site.centre, requestedBearingsCdeg: opts.requestedBearingsCdeg };
  const drawn = opts.picks ?? gatePicks(pickSet, n, site.stream(CONCERNS['gate.pick']), pickOpts);
  let picks: GatePick[] = drawn.map((p) => ({ ...p, ranked: [...p.ranked] }));

  // (5) – (7) with F-WALL's gate rungs and the reroute of a route that re-enters the stage after its gate.
  const tree = plazaTree(lattice);
  const rungs: GateRung[] = [];
  const attempts = new Map<number, number>();
  const reroutes = new Map<number, number>();
  // (7)'s deck rule: per re-solved route, the route as (5) solved it (T and the boundary read it), and its re-solves.
  const solvedAs = new Map<number, GateRoute>();
  const resolves = new Map<number, number>();
  let work = tree.settled;
  const first = gateRoutes(tree, picks, { nodeLimit: limit });
  work += first.charged;
  const unserved: UnservedRoute[] = [...first.unserved];
  let routes = first.routes;
  picks = picks.filter((p) => routes.some((r) => r.ordinal === p.ordinal));
  for (;;) {
    const b = boundaryOf(lattice, routes.map((r) => solvedAs.get(r.ordinal) ?? r), routes, a1, areaCm2, opts.pull);
    const hit = coincidence(b.gates);
    if (hit !== null) {
      const earlier = routes[hit[0]].ordinal;
      const later = routes[hit[1]].ordinal;
      const at = picks.findIndex((p) => p.ordinal === later);
      const p = picks[at];
      const tried = attempts.get(later) ?? 0;
      let solved: GateRoute | null = null;
      if (tried < GATE_REDRAWS && tried + 1 < p.ranked.length) {
        attempts.set(later, tried + 1);
        const to = p.ranked[tried + 1];
        rungs.push({ rung: 'redraw', ordinal: later, with: earlier, attempt: tried + 1, from: p.node, to });
        const moved = { ...p, node: to, at: lattice.points[to] };
        const again = gateRoutes(tree, [moved], { nodeLimit: limit });
        work += again.charged;
        unserved.push(...again.unserved);
        if (again.routes.length === 1) {
          solved = again.routes[0];
          picks = picks.map((q, i) => (i === at ? moved : q));
        }
      }
      solvedAs.delete(later);
      if (solved === null) {
        rungs.push({ rung: 'drop', ordinal: later, with: earlier, attempt: 0, from: p.node, to: -1 });
        picks = picks.filter((_, i) => i !== at);
        routes = routes.filter((r) => r.ordinal !== later);
      } else {
        routes = routes.map((r) => (r.ordinal === later ? (solved as GateRoute) : r));
      }
      continue;
    }
    // (7)'s deck rule: a gate standing in the water (its route's first exit a deck edge) re-solves its route whole off the
    // decks straddling the boundary (≤ 3 times per route; past them, or with no route, F-ROUTE's `unserved`).
    let resolved = false;
    for (let k = 0; k < routes.length && !resolved; k += 1) {
      const g = b.gates[k];
      if (g === null || !inWater(lattice, g.at)) continue;
      const r = routes[k];
      const tried = resolves.get(r.ordinal) ?? 0;
      resolves.set(r.ordinal, tried + 1);
      const p = picks.find((q) => q.ordinal === r.ordinal) as GatePick;
      const again = tried < GATE_REDRAWS ? resolveOffDecks(lattice, p, b.set.selected, limit) : { routes: [], unserved: [{ ordinal: r.ordinal, code: 'unserved' as const, count: 0, limit }], charged: 0 };
      work += again.charged;
      if (again.routes.length === 1) {
        if (!solvedAs.has(r.ordinal)) solvedAs.set(r.ordinal, r);
        routes = routes.map((q) => (q.ordinal === r.ordinal ? again.routes[0] : q));
      } else {
        unserved.push(...again.unserved);
        solvedAs.delete(r.ordinal);
        picks = picks.filter((q) => q.ordinal !== r.ordinal);
        routes = routes.filter((q) => q.ordinal !== r.ordinal);
      }
      resolved = true;
    }
    if (resolved) continue;
    // A route that re-enters the stage after its gate: its outward stretch re-solved outside (≤ 3 times per route).
    let rerouted = false;
    for (let k = 0; k < routes.length && !rerouted; k += 1) {
      const g = b.gates[k];
      const r = routes[k];
      if (g === null || !r.nodes.slice(g.routeIndex + 1).some((v) => b.set.selected[v] === 1)) continue;
      const tried = reroutes.get(r.ordinal) ?? 0;
      if (tried >= GATE_REDRAWS) continue;
      reroutes.set(r.ordinal, tried + 1);
      const re = rerouteOutside(lattice, r, g.routeIndex, b.set.selected, g.at, limit);
      rungs.push({ rung: 'reroute', ordinal: r.ordinal, with: -1, attempt: tried + 1, from: r.nodes[r.nodes.length - 1], to: re === null ? -1 : re.route.nodes[re.route.nodes.length - 1] });
      if (re !== null) {
        work += re.charged;
        routes = routes.map((q) => (q.ordinal === r.ordinal ? re.route : q));
        rerouted = true;
      }
    }
    if (rerouted) continue;
    return finish(site, thePlaza, lattice, pickSet, n, picks, routes, b, rungs, unserved, work, limit);
  }
}

function finish(
  site: Site,
  thePlaza: ReturnType<typeof drawPlaza>,
  lattice: Lattice,
  pickSet: LevelSet,
  n: number,
  picks: GatePick[],
  routes: GateRoute[],
  b: ReturnType<typeof boundaryOf>,
  rungs: GateRung[],
  unserved: UnservedRoute[],
  work: number,
  limit: number,
): S3Slice {
  // The gates (a route that never leaves the selection gives none: reported with the unserved).
  const gates: Gate[] = [];
  for (const g of b.gates) if (g !== null) gates.push(g);
  // The boundary's outline keeps the gates as its vertices (the trace pins them, M0-c-02).
  const set = levelSet(b.field, b.threshold.t, { pins: gates.map((g) => g.at) });
  const gateSites: GateSite[] = gates.map((g) => ({ ordinal: g.ordinal, at: g.at, bearingCdeg: g.bearingCdeg as GateSite['bearingCdeg'], kind: 'main', forced: false }));
  const destinations: Destination[] = [];
  thePlaza.ring.forEach((p: LatticePoint, i: number) => destinations.push({ id: `plaza:0/attach:${String(i)}`, kind: 'plaza_attach', at: p }));
  for (const g of gates) destinations.push({ id: `gate:${String(g.ordinal)}`, kind: 'gate', at: g.at, bearingCdeg: g.bearingCdeg as GateSite['bearingCdeg'] });
  return {
    site,
    plaza: thePlaza,
    lattice,
    pickSet,
    n,
    picks,
    routes,
    field: b.field,
    threshold: b.threshold,
    levelSet: set,
    gates,
    gateSites,
    destinations,
    report: {
      work: { 'route.nodes': work },
      routeNodesLimit: limit,
      gateRungs: rungs,
      unserved,
      shortfallCm2: b.threshold.shortfallCm2,
      gatesDropped: Math.max(0, n - gates.length),
    },
  };
}
