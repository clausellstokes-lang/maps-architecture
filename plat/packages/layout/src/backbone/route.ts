// S4's router and F-ROUTE's M0 rungs (M0-c-03; §4.3 *Lattice and costs*, *The class grade limit*, *Decks*; §5.2
// F-ROUTE: "another crossing site on the reach within its search band … → one bridge at extra cost … → relax the slope
// limit one class → route to the nearest reachable junction, the destination `unserved`"; §5.2 F-WORK with C-0085:
// route.nodes reached → `unserved`, reported `work_cut` with the count; C-0076). Readings C-0236 (2), (4):
// * the router is heap A* on M0-c-01's lattice with its §4.3 costs (water impassable except along a crossing site's
//   deck, a reservation impassable inside), an edge steeper than the routed class's grade limit impassable, an excluded
//   deck's edges impassable, and a node mask (a gate route's inward part stays in the walled stage, its outward part
//   outside it, §4.3's wallCrossingPenalty "only at gates"); route.nodes is charged per labelled node (the heuristic's
//   evaluations, M0-c-01's count) and its limit is `workLimits.json`'s law over the lattice's nodes;
// * the grade limits are the caller's: `ways.crossing`'s `rampMaxGrade` is V11's row, left out at M0 (C-0158), so
//   none is applied unless given — the slope rung is a code path tested on a synthetic impassable edge;
// * a deck's approach "cannot meet the radius" when the route's first point at least the class's minimum radius away
//   along it from a deck end lies strictly inside either circle of that radius tangent to the span's line at that end
//   (no arc of that radius leaving the deck along its line reaches it); a deck whose approach segment crosses its water
//   off the deck end is unusable too;
// * the extra-bridge rung is M1's (C-0076): listed `held: false` with why `notBuilt(M1)`, never run.
import { astar, err, ok, type KernelResult, type LatticePoint, type SearchGraph } from '@plat/kernel';
import { distToSegment, quot, segmentMeetsRing, segmentsMeet } from '../siting/geom.js';
import type { DeckSegment, Lattice } from '../siting/types.js';
import { CLASS_ORDER, classRank } from './classify.js';
import type { RouteClass, RouteRung } from './types.js';

/** cos 30°: an edge runs along a deck within 30° of its direction (M0-c-01's reading, C-0201 (4)). */
const COS30 = 0.8660254037844387;

/** The lattice as S4's router reads it: the graph, each edge's grade, and the deck each wet edge runs along. */
export interface RouteGraph {
  readonly lattice: Lattice;
  /** Per graph edge: |Δh| ÷ length. */
  readonly grade: Float64Array;
  /** Per graph edge: the index of the deck (in `decks`) a passable edge across water runs along, else −1. */
  readonly deckOf: Int32Array;
  readonly decks: readonly DeckSegment[];
}

/** Does the edge ab meet any water face of the lattice's costs? */
function wet(lattice: Lattice, a: LatticePoint, b: LatticePoint): boolean {
  for (const f of lattice.costs.water.faces) if (segmentMeetsRing(f, a, b)) return true;
  return false;
}

/**
 * The router's graph over a lattice: `heights[i]` the terrain's height at node i (cm; all 0 when omitted — the flat
 * fixture), the decks those of the lattice's water plan.
 */
export function routeGraph(lattice: Lattice, heights?: Float64Array): RouteGraph {
  const g = lattice.graph;
  const grade = new Float64Array(g.targets.length);
  const deckOf = new Int32Array(g.targets.length).fill(-1);
  const decks = lattice.costs.water.decks;
  const pts = lattice.points;
  for (let u = 0; u < g.n; u += 1) {
    for (let e = g.offsets[u]; e < g.offsets[u + 1]; e += 1) {
      const v = g.targets[e];
      const len = lattice.length[e];
      if (heights !== undefined && len > 0) grade[e] = quot(Math.abs(heights[v] - heights[u]), len, 'length', 'edge grade');
    }
  }
  if (decks.length > 0) {
    const s = lattice.spacingCm;
    decks.forEach((d, di) => {
      const x0 = Math.min(d.a.x, d.b.x) - s;
      const x1 = Math.max(d.a.x, d.b.x) + s;
      const y0 = Math.min(d.a.y, d.b.y) - s;
      const y1 = Math.max(d.a.y, d.b.y) + s;
      for (let u = 0; u < g.n; u += 1) {
        const p = pts[u];
        if (p.x < x0 || p.x > x1 || p.y < y0 || p.y > y1) continue;
        if (distToSegment(p, d.a, d.b) > s) continue;
        for (let e = g.offsets[u]; e < g.offsets[u + 1]; e += 1) {
          if (deckOf[e] !== -1 || !(g.weights[e] < Infinity)) continue;
          const q = pts[g.targets[e]];
          if (distToSegment(q, d.a, d.b) > s) continue;
          const ex = q.x - p.x;
          const ey = q.y - p.y;
          const dx = d.b.x - d.a.x;
          const dy = d.b.y - d.a.y;
          if (Math.abs(ex * dx + ey * dy) < COS30 * Math.sqrt(ex * ex + ey * ey) * Math.sqrt(dx * dx + dy * dy)) continue;
          if (wet(lattice, p, q)) deckOf[e] = di;
        }
      }
    });
  }
  return { lattice, grade, deckOf, decks };
}

/** One search's options. */
export interface SolveOptions {
  readonly class: RouteClass;
  /** Per class, its grade limit (rise over run); a class with none is unlimited (C-0236 (2)). */
  readonly gradeLimits?: Partial<Record<RouteClass, number>>;
  /** Deck ids whose edges are impassable to this search. */
  readonly excludedDecks?: ReadonlySet<string>;
  /** Per node, 1 where the search may pass. */
  readonly mask?: Uint8Array;
  /** route.nodes' limit for this search. */
  readonly nodeLimit?: number;
}

/** A search's outcome: the nodes, or why none (no path; the work limit reached with its count). */
export type Solved =
  | { readonly ok: true; readonly nodes: number[]; readonly cost: number; readonly charged: number }
  | { readonly ok: false; readonly code: 'no_path' | 'work_cut'; readonly charged: number };

class WorkLimitReached extends Error {
  constructor(readonly count: number) {
    super('route.nodes reached');
  }
}

/** Heap A* from `sources` to `targets` under the class's grade limit, the excluded decks and the mask. */
export function solve(rg: RouteGraph, sources: readonly number[], targets: readonly number[], opts: SolveOptions): Solved {
  const lattice = rg.lattice;
  const g = lattice.graph;
  const limit = opts.gradeLimits?.[opts.class];
  const excluded = opts.excludedDecks ?? new Set<string>();
  const mask = opts.mask;
  const weights = new Float64Array(g.weights.length);
  for (let u = 0; u < g.n; u += 1) {
    for (let e = g.offsets[u]; e < g.offsets[u + 1]; e += 1) {
      let w = g.weights[e];
      const v = g.targets[e];
      if (mask !== undefined && (mask[u] !== 1 || mask[v] !== 1)) w = Infinity;
      else if (limit !== undefined && rg.grade[e] > limit) w = Infinity;
      else if (rg.deckOf[e] !== -1 && excluded.has(rg.decks[rg.deckOf[e]].id)) w = Infinity;
      weights[e] = w;
    }
  }
  const search: SearchGraph = { n: g.n, offsets: g.offsets, targets: g.targets, weights };
  const tps = targets.map((t) => lattice.points[t]);
  const nodeLimit = opts.nodeLimit ?? Infinity;
  let count = 0;
  const h = (v: number): number => {
    count += 1;
    if (count >= nodeLimit) throw new WorkLimitReached(count);
    const p = lattice.points[v];
    let d = Infinity;
    for (const q of tps) {
      const e = Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));
      if (e < d) d = e;
    }
    return lattice.minCostPerCm * d;
  };
  try {
    const r = astar(search, sources, targets, h);
    if (!r.ok) return { ok: false, code: 'no_path', charged: count };
    return { ok: true, nodes: r.value.nodes, cost: r.value.cost, charged: count };
  } catch (e) {
    if (e instanceof WorkLimitReached) return { ok: false, code: 'work_cut', charged: e.count };
    throw e;
  }
}

/** A crossing on a route: the run of its edges along a deck, the dry nodes before and after, the deck. */
export interface Crossing {
  /** Index in the route's nodes of the node before the run and of the node after it. */
  readonly before: number;
  readonly after: number;
  readonly deck: DeckSegment;
  /** The deck end the route reaches first, and the other. */
  readonly entry: LatticePoint;
  readonly exit: LatticePoint;
}

/** The crossings of a route's nodes (each maximal run of edges along one deck). */
export function crossingsOf(rg: RouteGraph, nodes: readonly number[]): Crossing[] {
  const lattice = rg.lattice;
  const out: Crossing[] = [];
  let i = 0;
  const deckOfStep = (k: number): number => {
    const u = nodes[k];
    const v = nodes[k + 1];
    for (let d = 0; d < 6; d += 1) if (lattice.adjacency[6 * u + d] === v) return rg.deckOf[lattice.slot[6 * u + d]];
    return -1;
  };
  while (i + 1 < nodes.length) {
    const d = deckOfStep(i);
    if (d === -1) {
      i += 1;
      continue;
    }
    let j = i + 1;
    while (j + 1 < nodes.length && deckOfStep(j) === d) j += 1;
    const deck = rg.decks[d];
    const p = lattice.points[nodes[i]];
    const da = (deck.a.x - p.x) * (deck.a.x - p.x) + (deck.a.y - p.y) * (deck.a.y - p.y);
    const db = (deck.b.x - p.x) * (deck.b.x - p.x) + (deck.b.y - p.y) * (deck.b.y - p.y);
    const entry = da <= db ? deck.a : deck.b;
    const exit = da <= db ? deck.b : deck.a;
    out.push({ before: i, after: j, deck, entry, exit });
    i = j;
  }
  return out;
}

/** Strictly inside either circle of radius r tangent at `end` to the line from `other` through `end`? */
export function insideTurningCircles(end: LatticePoint, other: LatticePoint, q: { x: number; y: number }, r: number): boolean {
  const hx = end.x - other.x;
  const hy = end.y - other.y;
  const l = Math.sqrt(hx * hx + hy * hy);
  if (l === 0) return false;
  const k = quot(r, l, 'length', 'turning circle');
  const nx = -hy * k;
  const ny = hx * k;
  for (const s of [1, -1]) {
    const cx = end.x + s * nx;
    const cy = end.y + s * ny;
    const dx = q.x - cx;
    const dy = q.y - cy;
    if (dx * dx + dy * dy < r * r - 1e-6) return true;
  }
  return false;
}

/** The first of `pts` (walked from `end`) at least `r` along the polyline from `end`, else the last. */
function pointAtArc(end: LatticePoint, pts: readonly LatticePoint[], r: number): LatticePoint | null {
  let arc = 0;
  let prev: { x: number; y: number } = end;
  for (const q of pts) {
    arc += Math.sqrt((q.x - prev.x) * (q.x - prev.x) + (q.y - prev.y) * (q.y - prev.y));
    if (arc >= r) return q;
    prev = q;
  }
  return pts.length > 0 ? pts[pts.length - 1] : null;
}

/**
 * Is a crossing usable by a route of minimum radius `r` (C-0236 (4))? Each approach — the route's points walked away
 * from a deck end — reaches its first point at least r along without entering a turning circle, and the segment from
 * the dry node to its deck end meets the water only at that end.
 */
export function approachUsable(rg: RouteGraph, nodes: readonly number[], c: Crossing, r: number): boolean {
  const pts = rg.lattice.points;
  const back: LatticePoint[] = [];
  for (let k = c.before; k >= 0; k -= 1) back.push(pts[nodes[k]]);
  const ahead: LatticePoint[] = [];
  for (let k = c.after; k < nodes.length; k += 1) ahead.push(pts[nodes[k]]);
  for (const [end, other, walk] of [
    [c.entry, c.exit, back],
    [c.exit, c.entry, ahead],
  ] as const) {
    const q = pointAtArc(end, walk, r);
    if (q !== null && insideTurningCircles(end, other, q, r)) return false;
    if (walk.length > 0 && crossesWaterOff(rg.lattice, walk[0], end)) return false;
  }
  return true;
}

/** Does the segment from the dry point p to the deck end meet a water face anywhere but at the deck end? */
function crossesWaterOff(lattice: Lattice, p: LatticePoint, end: LatticePoint): boolean {
  for (const f of lattice.costs.water.faces) {
    for (let i = 0; i < f.length; i += 1) {
      const a = f[i];
      const b = f[i + 1 === f.length ? 0 : i + 1];
      if (!segmentsMeet(p, end, a, b)) continue;
      // The shore side the deck end lies on is met at the deck end (the landing), or along it (no water crossed).
      if (distToSegment(end, a, b) < 1) continue;
      return true;
    }
  }
  return false;
}

/** The distance between two points. */
function dist(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

/** The F-ROUTE ladder's options. */
export interface LadderOptions extends Omit<SolveOptions, 'class'> {
  readonly class: RouteClass;
  /** The class's minimum radius per class (cm), for the approach check. */
  readonly radiusCm: (c: RouteClass) => number;
  /** `crossing.searchBandM` (cm): another site is taken within this distance of the one given up. */
  readonly searchBandCm: number;
  /** The route part's name in the report. */
  readonly route: string;
}

/** A route the ladder found: its nodes, the class it was routed at, its crossings. */
export interface Laddered {
  readonly nodes: number[];
  readonly class: RouteClass;
  readonly crossings: Crossing[];
}

function midpoint(d: DeckSegment): { x: number; y: number } {
  return { x: (d.a.x + d.b.x) * 0.5, y: (d.a.y + d.b.y) * 0.5 };
}

/**
 * F-ROUTE's M0 ladder for one route (see the header), starting from `given` when the route was solved already (S3's
 * gate routes, committed without re-solving) else from a search: a crossing whose approach cannot meet the radius is
 * given up for another site within the search band; then the extra bridge (M1, listed); then the slope limit relaxed
 * one class at a time; then `unserved`. Every rung that ran is appended to `rungs`; route.nodes charged is added to
 * `work`.
 *
 * Giving a deck up (C-0236 (4), refined by C-0297): the deck is impassable to every later search of the ladder, and
 * so is every deck whose midpoint lies beyond the band of the first deck given up — but those the course already
 * crosses with a usable approach — so a re-solve may take, as a new crossing, only another site within the band. The
 * part is re-solved whether or not such a site stands: a course that reaches its destination with no new crossing (the
 * deck given up was not needed) is served, `another_site` held with `to` null; with no course at all the rung did not
 * hold, the extra bridge is listed and the ladder goes on to the slope rung, then `unserved` — `why` 'approach' when no
 * other site stood in the band, else 'no path'.
 */
export function routeLadder(rg: RouteGraph, sources: readonly number[], targets: readonly number[], opts: LadderOptions, rungs: RouteRung[], work: { n: number }, given?: readonly number[]): KernelResult<Laddered | null> {
  const excluded = new Set<string>(opts.excludedDecks ?? []);
  let cls = opts.class;
  let nodes: number[] | null = given === undefined ? null : given.slice();
  let firstGivenUp: DeckSegment | null = null;
  // Whether another site stood in the band when the first deck was given up (the report's `why`).
  let bandEmpty = false;
  for (let guard = 0; guard < 64; guard += 1) {
    if (nodes === null) {
      const s = solve(rg, sources, targets, { ...opts, class: cls, excludedDecks: excluded });
      work.n += s.charged;
      if (!s.ok && s.code === 'work_cut') {
        rungs.push({ route: opts.route, rung: 'work_cut', count: s.charged, limit: opts.nodeLimit ?? Infinity, held: true });
        rungs.push({ route: opts.route, rung: 'unserved', held: true, why: 'work_cut' });
        return ok(null);
      }
      if (!s.ok) {
        const next = CLASS_ORDER.slice(classRank(cls) + 1).find((c) => c === 'primary' || c === 'track' || c === 'path');
        if (firstGivenUp !== null && excluded.size > 0) {
          rungs.push({ route: opts.route, rung: 'another_site', from: firstGivenUp.id, to: null, held: false, why: bandEmpty ? 'no other site in the band' : 'no usable site in the band' });
          rungs.push({ route: opts.route, rung: 'extra_bridge', held: false, why: 'notBuilt(M1)' });
          firstGivenUp = null;
        }
        if (next === undefined || opts.gradeLimits === undefined) {
          rungs.push({ route: opts.route, rung: 'unserved', held: true, why: bandEmpty ? 'approach' : 'no path' });
          return ok(null);
        }
        rungs.push({ route: opts.route, rung: 'slope', fromClass: cls, toClass: next, held: true });
        cls = next;
        continue;
      }
      nodes = s.nodes;
    }
    const cs = crossingsOf(rg, nodes);
    const r = opts.radiusCm(cls);
    const bad = cs.find((c) => !approachUsable(rg, nodes as number[], c, r));
    if (bad === undefined) {
      if (firstGivenUp !== null) {
        const given = midpoint(firstGivenUp);
        const used = cs.find((c) => dist(midpoint(c.deck), given) <= opts.searchBandCm);
        rungs.push({ route: opts.route, rung: 'another_site', from: firstGivenUp.id, to: used === undefined ? null : used.deck.id, held: true });
      }
      return ok({ nodes, class: cls, crossings: cs });
    }
    // The approach cannot meet the radius: the deck is given up, and a re-solve may take another site within the band.
    excluded.add(bad.deck.id);
    if (firstGivenUp === null) {
      firstGivenUp = bad.deck;
      const gm = midpoint(firstGivenUp);
      const kept = new Set(cs.filter((c) => c !== bad && approachUsable(rg, nodes as number[], c, r)).map((c) => c.deck.id));
      bandEmpty = true;
      for (const d of rg.decks) {
        if (excluded.has(d.id) || kept.has(d.id)) continue;
        if (dist(midpoint(d), gm) <= opts.searchBandCm) bandEmpty = false;
        else excluded.add(d.id);
      }
    }
    nodes = null;
  }
  return err('E_INVARIANT', `S4: F-ROUTE's ladder for ${opts.route} did not settle`);
}
