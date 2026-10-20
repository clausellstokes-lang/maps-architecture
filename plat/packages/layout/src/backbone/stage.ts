// S4 Backbone as a Stage and as the base NetworkStrategy's S4 part (M0-c-03; §4.3 *Routes*, *Decks*, *Result*; §4.1's
// S4 row and *Registration and order* — S4 is declared-form; §4.12 `NetworkStrategy`; §5.2 F-ROUTE, F-WORK; §6.3;
// C-0076, C-0085). Readings C-0236 (1), (9), (14), (15):
// * S4 commits M0-c-01's gate routes without re-solving (§4.3 *Routes*): each split at its gate into the inward
//   street (the plaza attach point ↔ the gate, `primary`) and the outward arterial (the gate ↔ the frame at its bearing,
//   `through`), the gate's point between the route's two lattice nodes, so roads leaving the walled stage = N;
// * the through-road runs on from its last lattice node, along its last edge, to the frame's edge — the map border
//   where the context margin begins (§4.3 *Result*: "through-roads continue to the context margin with their
//   bearings"; the item's "gate ↔ frame edge at the bearing"; the strips' corridor runs there too, C-0226 (10)) — its
//   end a `bearing` NodeRef;
// * the route's lattice nodes within `WAY_SPAN_NODES` of its gate edge are held (the way's corridor the strips stop
//   at, C-0226 (10)), so smoothing never carries the way across a strip line;
// * a route's run of edges along a deck becomes the deck's span through its two deck ends (C-0076), the end the route
//   reaches first first; the deck end `a` is ('deck_end', bridge, 0) and `b` is 1; an approach that cannot meet the
//   class radius takes F-ROUTE's ladder (./route.ts) on the stretch beyond the gate's corridor, inside the walled stage
//   for the inward part and outside it for the outward part;
// * each gate part keeps to its side of the committed wall at its gate (c-03 S3; Q52 A): a corridor node next to the
//   gate that the trace left beyond the wall is dropped, the gate joined to the node before it where that segment
//   meets the wall at the gate only and keeps `attractCm` clear of it beyond the gate (c-03 S4: §3.6's insertion would
//   lay a nearer one along the wall), else the part is kept as given; `offGate` counts the parts that still meet the
//   wall off their gate, and the parts whose committed way runs along the wall, read from the arena (C-0236 (9));
// * every route part reaches the commit as a simple path, dry off its decks (C-0250): a re-solve never steps back
//   into the held corridor (the corridor's nodes are masked out of the ladder's search), a part that revisits a node
//   is cut at its first repeated node (its crossings checked again, a failed approach making it `unserved`), a frame
//   stub that would cross water is dropped (the through-road ends at its last lattice node, its frame end), and a part
//   still meeting the water off a deck end is `unserved` — only that part, never the stage;
// * the stage is declared-form with its kernel in its input (as S1's, C-0229 (1): its input is the runner's model
//   record — the slice, the commits, the water, the façade); its run commits through the façade's `tx`, its work limit
//   the insert counters' laws over its batch; it declares the data keys `s3.slice`, `s3.commit`, `water` → `ways`,
//   `junctions`, `bridges`, `gates` (M0-x-04's registration table wires them);
// * the base NetworkStrategy's `grow` is S4's part at stage 1 with no existing network; S5b's (k ≥ 2) is M0-c-04's and
//   is refused here.
import { err, ok, STAGES, type ChainRef, type Kernel, type KernelResult, type LatticePoint, type StageId } from '@plat/kernel';
import type { Cdeg, Destination, Enceinte, Gate, Id, Rung, Scope, Stage, StageContext, Terrain, WaterSet, WorkLimitLaw } from '@plat/model';
import { terrainSampler } from '@plat/site';
import { loadWorkLimits, workLimitOf } from '@plat/tables';
import type { S3Commit } from '../enceinte/commit.js';
import { WAY_SPAN_NODES } from '../enceinte/commit.js';
import { TOUCH_CM, unitOf } from '../enceinte/plane.js';
import { toFrame } from '../enceinte/strips.js';
import type { EnceinteEnv } from '../enceinte/types.js';
import { bearingCdeg, distToSegment2, insideRing, segmentMeetsRing, segmentsMeet } from '../siting/geom.js';
import type { Gate as SliceGate, GateRoute, S3Slice, Site } from '../siting/types.js';
import { classGeometryCm } from './classify.js';
import { commitRoutes, GROUND_PART0, meetsWaterOff, S4_COUNTERS, waterSides, type Seg } from './commit.js';
import { approachUsable, crossingsOf, routeGraph, routeLadder, type Crossing, type RouteGraph } from './route.js';
import type { RouteClass, RoutePoint, RouteRung, S4Result, S4Route } from './types.js';

/** S4's input: the S3 slice (M0-c-01), its commits (M0-c-02), the water set with its crossing sites, the façade. */
export interface S4Input {
  readonly slice: S3Slice;
  readonly commit: S3Commit;
  /** The water S1 laid with its bridges (sites); default none. */
  readonly water?: WaterSet;
  readonly kernel: Kernel;
}

/** S4's options. */
export interface S4Options {
  /** Per class, its grade limit (rise over run): none at M0 unless given (C-0236 (2)). */
  readonly gradeLimits?: Partial<Record<RouteClass, number>>;
  /** route.nodes' per-route limit in place of the law's. */
  readonly routeNodesLimit?: number;
  /** The batch's work limit in place of the laws'. */
  readonly workLimit?: number;
}

/** What S4 returns: the result, and the routes it committed. */
export interface S4Output extends S4Result {
  readonly routes: readonly S4Route[];
}

/** The terrain's height at each lattice node (cm). */
export function heightsOf(site: Site, points: readonly LatticePoint[]): Float64Array {
  const s = terrainSampler(site.terrain, site.tables.table('terrain').num('settings', 'slopeQueryM') * 100);
  const out = new Float64Array(points.length);
  for (let i = 0; i < points.length; i += 1) out[i] = s.heightAt(points[i]);
  return out;
}

/** A route part's nodes as points: each crossing's run replaced by its deck's two ends (C-0076). */
function pointsOf(rg: RouteGraph, nodes: readonly number[], crossings: readonly Crossing[], heldNode: (n: number) => boolean): { points: RoutePoint[]; spans: { at: number; bridge: Id }[] } {
  const pts = rg.lattice.points;
  const points: RoutePoint[] = [];
  const spans: { at: number; bridge: Id }[] = [];
  let k = 0;
  for (const c of crossings) {
    for (; k <= c.before; k += 1) points.push(heldNode(nodes[k]) ? { at: pts[nodes[k]], held: true } : { at: pts[nodes[k]] });
    const ordinal = (p: LatticePoint): number => (p.x === c.deck.a.x && p.y === c.deck.a.y ? 0 : 1);
    spans.push({ at: points.length, bridge: c.deck.id });
    points.push({ at: c.entry, pin: 'deck_end', pinId: c.deck.id, pinOrdinal: ordinal(c.entry) });
    points.push({ at: c.exit, pin: 'deck_end', pinId: c.deck.id, pinOrdinal: ordinal(c.exit) });
    k = c.after;
  }
  for (; k < nodes.length; k += 1) points.push(heldNode(nodes[k]) ? { at: pts[nodes[k]], held: true } : { at: pts[nodes[k]] });
  return { points, spans };
}

/**
 * A route's nodes as a simple path (C-0250): at each node met again, the loop since its first visit is cut, so the
 * path keeps its first and last nodes and every edge it keeps is one of its own.
 */
export function simpleCourse(nodes: readonly number[]): number[] {
  const out: number[] = [];
  const at = new Map<number, number>();
  for (const n of nodes) {
    const i = at.get(n);
    if (i === undefined) {
      at.set(n, out.length);
      out.push(n);
      continue;
    }
    for (let j = i + 1; j < out.length; j += 1) at.delete(out[j]);
    out.length = i + 1;
  }
  return out;
}

/** Does a route part meet the water off its decks: a segment but a span meeting a water side off its deck-end ends? */
export function partMeetsWater(points: readonly RoutePoint[], spans: readonly { readonly at: number }[], sides: readonly Seg[]): boolean {
  if (sides.length === 0) return false;
  const span = new Set(spans.map((s) => s.at));
  for (let i = 0; i + 1 < points.length; i += 1) {
    if (span.has(i)) continue;
    const ends = [points[i], points[i + 1]].filter((p) => p.pin === 'deck_end').map((p) => p.at);
    if (meetsWaterOff(points[i].at, points[i + 1].at, sides, ends)) return true;
  }
  return false;
}

/** Is a point strictly inside (true), strictly outside (false) the ring, or on it (null)? */
function sideOfRing(ring: readonly LatticePoint[], p: LatticePoint): boolean | null {
  if (insideRing(ring, p, true) && !insideRing(ring, p, false)) return null;
  return insideRing(ring, p);
}

/**
 * Does a route part meet the wall anywhere but at its gate (C-0236 (9))? Every point but the gate on its side, and no
 * segment meeting the wall but at the gate.
 */
export function partLeavesWall(points: readonly RoutePoint[], wall: readonly LatticePoint[], inward: boolean): boolean {
  for (const p of points) {
    if (p.pin === 'gate') continue;
    if (sideOfRing(wall, p.at) !== inward) return true;
  }
  for (let i = 0; i + 1 < points.length; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    for (let j = 0; j < wall.length; j += 1) {
      const c = wall[j];
      const d = wall[j + 1 === wall.length ? 0 : j + 1];
      if (!segmentsMeet(a.at, b.at, c, d)) continue;
      const gate = a.pin === 'gate' ? a.at : b.pin === 'gate' ? b.at : null;
      if (gate !== null) {
        // The gate lies on the wall: the segment meets it there.
        const onSide = segmentsMeet(gate, gate, c, d);
        if (onSide) continue;
      }
      return true;
    }
  }
  return false;
}

/**
 * Does the segment from the gate `g` (on the wall) to `p` come within `attractCm` of the wall anywhere but at the gate
 * (c-03 S4; B-N1)? §3.6's insertion lands a point within `attractCm` of the wall on it and routes a segment through
 * every wall vertex it passes that near, so such a segment would be laid along the wall: `p` within `attractCm` of a
 * wall side, or a wall vertex farther than `attractCm` from the gate within `attractCm` of the segment.
 */
function joinNearWall(g: LatticePoint, p: LatticePoint, wall: readonly LatticePoint[]): boolean {
  const r2 = TOUCH_CM * TOUCH_CM;
  for (let i = 0; i < wall.length; i += 1) {
    const c = wall[i];
    const d = wall[i + 1 === wall.length ? 0 : i + 1];
    if (distToSegment2(p, c, d) <= r2) return true;
    const dx = c.x - g.x;
    const dy = c.y - g.y;
    if (dx * dx + dy * dy > r2 && distToSegment2(c, g, p) <= r2) return true;
  }
  return false;
}

/**
 * A gate part held to its side of the committed wall at its gate (c-03 S3; Q52 A, R-35): the part's points next to the
 * gate that lie on the wrong side of the wall S3 committed, or on it — a corridor node the trace left beyond it — are
 * dropped and the gate joined to the first point on its side, when that segment meets the wall at the gate only and
 * keeps `attractCm` clear of it beyond the gate (`joinNearWall`; c-03 S4, B-N1, B-N2); so the split at the gate
 * (C-0236 (1)) holds against the committed trace and the spine never runs along the wall there. Pinned points are
 * never dropped; a part that needs no change, or that the rule cannot repair, is returned as given.
 */
export function onGateSide(points: readonly RoutePoint[], spans: readonly { at: number; bridge: Id }[], wall: readonly LatticePoint[], inward: boolean): { points: RoutePoint[]; spans: { at: number; bridge: Id }[] } {
  const keep = points.map(() => true);
  for (const [gi, step] of [
    [points.length - 1, -1],
    [0, 1],
  ] as const) {
    if (points[gi].pin !== 'gate') continue;
    let j = gi + step;
    while (j >= 0 && j < points.length && points[j].pin === undefined && sideOfRing(wall, points[j].at) !== inward) j += step;
    if (j === gi + step || j < 0 || j >= points.length || sideOfRing(wall, points[j].at) !== inward) continue;
    if (partLeavesWall(step < 0 ? [points[j], points[gi]] : [points[gi], points[j]], wall, inward)) continue;
    if (joinNearWall(points[gi].at, points[j].at, wall)) continue;
    for (let m = gi + step; m !== j; m += step) keep[m] = false;
  }
  if (keep.every((x) => x)) return { points: points.slice(), spans: spans.slice() };
  const index = new Map<number, number>();
  const out: RoutePoint[] = [];
  points.forEach((p, i) => {
    if (!keep[i]) return;
    index.set(i, out.length);
    out.push(p);
  });
  return { points: out, spans: spans.map((x) => ({ at: index.get(x.at) as number, bridge: x.bridge })) };
}

/** The routes S4 commits from the slice (see the header), with F-ROUTE's rungs, route.nodes charged and the parts unserved. */
export function routesFromSlice(
  slice: S3Slice,
  commit: S3Commit,
  rg: RouteGraph,
  opts: S4Options = {},
): { routes: S4Route[]; rungs: RouteRung[]; work: number; unserved: string[]; wallCrossings: string[] } {
  const site = slice.site;
  const lattice = slice.lattice;
  const pts = lattice.points;
  const limit = opts.routeNodesLimit ?? workLimitOf(loadWorkLimits().law('route.nodes'), { kind: 'stage', stage: STAGES.S4 }, { latticeNodes: pts.length });
  const band = site.tables.table('terrain').num('crossing', 'searchBandM') * 100;
  const radius = (c: RouteClass): number => classGeometryCm(site.tables, c).minRadiusCm;
  const selected = slice.levelSet.selected;
  const inside = new Uint8Array(selected.length);
  const outside = new Uint8Array(selected.length);
  for (let i = 0; i < selected.length; i += 1) {
    inside[i] = selected[i] === 1 ? 1 : 0;
    outside[i] = selected[i] === 1 ? 0 : 1;
  }
  const rim: number[] = [];
  for (let i = 0; i < pts.length; i += 1) if (lattice.rim[i] === 1) rim.push(i);
  const rungs: RouteRung[] = [];
  const work = { n: 0 };
  const unserved: string[] = [];
  const wallCrossings: string[] = [];
  const routes: S4Route[] = [];
  const wall = commit.traced.line;
  const faces = lattice.costs.water.faces;
  const sides = waterSides(faces);
  // Without `except`: the mask with those nodes closed (a held corridor the re-solve may not step back into).
  const without = (mask: Uint8Array, except: readonly number[]): Uint8Array => {
    if (except.length === 0) return mask;
    const m = mask.slice();
    for (const n of except) m[n] = 0;
    return m;
  };
  // A part's nodes cut to a simple path; null when the cut leaves a crossing whose approach cannot meet the radius.
  const simple = (nodes: readonly number[], cls: RouteClass, name: string): number[] | null => {
    const cut = simpleCourse(nodes);
    if (cut.length === nodes.length) return cut;
    if (crossingsOf(rg, cut).some((c) => !approachUsable(rg, cut, c, radius(cls)))) {
      rungs.push({ route: name, rung: 'unserved', held: true, why: 'approach' });
      return null;
    }
    return cut;
  };
  const dry = (part: S4Route): boolean => {
    if (!partMeetsWater(part.points, part.spans, sides)) return true;
    rungs.push({ route: part.id, rung: 'unserved', held: true, why: 'water' });
    unserved.push(part.id);
    return false;
  };
  const order = slice.gates.map((g, i) => ({ g, i })).sort((a, b) => a.g.ordinal - b.g.ordinal);
  order.forEach(({ g, i }, rank) => {
    const r = slice.routes.find((q) => q.ordinal === g.ordinal) as GateRoute | undefined;
    const gate = commit.gates[i];
    if (r === undefined || gate === undefined) return;
    const gi = g.routeIndex;
    const heldNode = (n: number): boolean => {
      const at = r.nodes.indexOf(n);
      return at >= gi - WAY_SPAN_NODES && at <= gi + 1 + WAY_SPAN_NODES;
    };
    // The inward part: the stretch beyond the gate's corridor is the ladder's to keep or re-solve.
    // A re-solve keeps out of the part's held corridor (C-0250).
    const keepIn = Math.max(0, gi - WAY_SPAN_NODES);
    const inward = laddered(rg, r.nodes.slice(0, keepIn + 1), [r.nodes[0]], [r.nodes[keepIn]], without(inside, r.nodes.slice(keepIn + 1, gi + 1)), 'primary', `${gate.id}/in`);
    const outFrom = Math.min(r.nodes.length - 1, gi + 1 + WAY_SPAN_NODES);
    const outward = laddered(rg, r.nodes.slice(outFrom), [r.nodes[outFrom]], rim, without(outside, r.nodes.slice(gi + 1, outFrom)), 'through', `${gate.id}/out`);
    const inNodes = inward === null ? null : simple([...inward.nodes, ...r.nodes.slice(keepIn + 1, gi + 1)], inward.class, `${gate.id}/in`);
    const outNodes = outward === null ? null : simple([...r.nodes.slice(gi + 1, outFrom), ...outward.nodes], outward.class, `${gate.id}/out`);
    if (inward !== null && inNodes !== null) {
      const nodes = inNodes;
      const made = pointsOf(rg, nodes, crossingsOf(rg, nodes), heldNode);
      const held = onGateSide([{ at: r.attach, pin: 'attach', pinId: commit.plaza.id, pinOrdinal: r.attachIndex }, ...made.points, { at: g.at, pin: 'gate', pinId: gate.id }], made.spans.map((s) => ({ at: s.at + 1, bridge: s.bridge })), wall, true);
      const points = held.points;
      const part: S4Route = {
        id: `${gate.id}/in`,
        order: rank,
        part: 'inward',
        class: inward.class,
        points,
        spans: held.spans,
        from: { kind: 'plaza', id: commit.plaza.id },
        to: { kind: 'gate', id: gate.id },
      };
      if (dry(part)) {
        if (partLeavesWall(points, wall, true)) wallCrossings.push(part.id);
        routes.push(part);
      }
    } else unserved.push(`${gate.id}/in`);
    if (outward !== null && outNodes !== null) {
      const nodes = outNodes;
      const made = pointsOf(rg, nodes, crossingsOf(rg, nodes), heldNode);
      const last = made.points[made.points.length - 1].at;
      const prev = made.points.length >= 2 ? made.points[made.points.length - 2].at : g.at;
      const d = unitOf({ x: last.x - prev.x, y: last.y - prev.y });
      const f = d === null ? null : toFrame(last, d, site.frameRing);
      const raw: RoutePoint[] = [{ at: g.at, pin: 'gate', pinId: gate.id }, ...made.points];
      const fp = f === null ? null : ({ x: Math.round(f.x), y: Math.round(f.y) } as LatticePoint);
      // The stub to the frame runs on dry ground only: across water it is dropped, and the through-road ends at its
      // last lattice node (C-0250).
      const stubDry = fp !== null && !faces.some((ring) => segmentMeetsRing(ring, last, fp));
      if (fp !== null && stubDry && (Math.abs(fp.x - last.x) >= 100 || Math.abs(fp.y - last.y) >= 100)) raw.push({ at: fp, pin: 'frame' });
      else raw[raw.length - 1] = { ...raw[raw.length - 1], pin: 'frame' };
      const held = onGateSide(raw, made.spans.map((s) => ({ at: s.at + 1, bridge: s.bridge })), wall, false);
      const points = held.points;
      const end = points[points.length - 1].at;
      const part: S4Route = {
        id: `${gate.id}/out`,
        order: rank,
        part: 'outward',
        class: outward.class,
        points,
        spans: held.spans,
        from: { kind: 'gate', id: gate.id },
        to: { kind: 'bearing', bearingCdeg: bearingCdeg(end.x - g.at.x, end.y - g.at.y) as Cdeg },
      };
      if (dry(part)) {
        if (partLeavesWall(points, wall, false)) wallCrossings.push(part.id);
        routes.push(part);
      }
    } else unserved.push(`${gate.id}/out`);
  });
  return { routes, rungs, work: work.n, unserved, wallCrossings };

  function laddered(g: RouteGraph, given: number[], sources: number[], targets: number[], mask: Uint8Array, cls: RouteClass, name: string): { nodes: number[]; class: RouteClass; crossings: Crossing[] } | null {
    const out = routeLadder(g, sources, targets, { class: cls, radiusCm: radius, searchBandCm: band, route: name, mask, nodeLimit: limit, ...(opts.gradeLimits === undefined ? {} : { gradeLimits: opts.gradeLimits }) }, rungs, work, given);
    if (!out.ok || out.value === null) return null;
    return out.value;
  }
}

/**
 * The route parts whose committed way runs along the wall (C-0236 (9); c-03 S4, B-N1): a way edge that carries the
 * wall's row too, read from the arena after the batch — §3.6's insertion lays a course passing within `attractCm` of
 * the wall onto it, which no check of the course before the batch sees. The part is the way's: its chains' first route.
 */
function partsAlongWall(out: S4Result, k: Kernel, wall: ChainRef): string[] {
  const w = k.resolve(wall, GROUND_PART0);
  if (w.view !== 'edges') return [];
  const pairs = new Set<number>();
  for (const run of w.runs) for (const h of run) pairs.add(Math.floor(h * 0.5));
  const parts = new Set<string>();
  for (const way of out.network.ways) {
    const r = k.resolve({ role: 'way', entity: way.id }, GROUND_PART0);
    if (r.view !== 'edges' || !r.runs.some((run) => run.some((h) => pairs.has(Math.floor(h * 0.5))))) continue;
    out.chainWay.forEach((id, ci) => {
      if (id === way.id && out.graph.chains[ci].routes.length > 0) parts.add(out.graph.routes[Math.min(...out.graph.chains[ci].routes)].id);
    });
  }
  return [...parts];
}

/** S4 (see the header): the routes from the slice, committed as one graph through the façade. */
export function runS4(input: S4Input, opts: S4Options = {}): KernelResult<S4Output> {
  const slice = input.slice;
  const site = slice.site;
  const lattice = slice.lattice;
  const rg = routeGraph(lattice, heightsOf(site, lattice.points));
  const built = routesFromSlice(slice, input.commit, rg, opts);
  const water = input.water ?? { bodies: [], bridges: [] };
  const r = commitRoutes(built.routes, input.kernel, {
    tables: site.tables,
    rung: site.rung,
    spacingCm: lattice.spacingCm,
    water: lattice.costs.water.faces,
    plaza: slice.plaza.ring,
    wall: input.commit.traced.line,
    bridges: water.bridges,
    gates: input.commit.gates.filter((g) => g.kind === 'main'),
    rungs: built.rungs,
    routeNodes: built.work,
    unserved: built.unserved,
    offGate: built.wallCrossings.length,
    ...(opts.workLimit === undefined ? {} : { workLimit: opts.workLimit }),
  });
  if (!r.ok) return err(r.code, r.detail);
  // The off-gate count (C-0236 (9)): the parts meeting the wall off their gate, and the parts laid along it.
  const offGate = new Set([...built.wallCrossings, ...partsAlongWall(r.value, input.kernel, input.commit.enceinte.trace)]).size;
  return ok({ ...r.value, report: { ...r.value.report, offGate }, routes: built.routes }, r.warnings);
}

/** §12.4's S4 row (10 ms at CITY; reporting only — the other rungs report against it until their rows, M1). */
const BUDGET_MS: Record<Rung, number> = { TOWN: 10, CITY: 10, METROPOLIS: 10, THORP: 10, HAMLET: 10, VILLAGE: 10 };

/** The laws of the counters S4 charges: route.nodes, and the insert counters of its batch. */
function laws(): WorkLimitLaw[] {
  const t = loadWorkLimits();
  return ['route.nodes', ...S4_COUNTERS].map((c) => {
    const law = t.law(c);
    if (law.unit === 'fixed') throw new RangeError(`S4: the counter ${c} has a fixed law; its declaration needs a unit`);
    return { ...law };
  });
}

/** S4 as §14's Stage (see the header): id S4, declared form, F-ROUTE its ladder, the town its lineage unit. */
export function s4Stage(opts: S4Options = {}): Stage<S4Input, S4Output, EnceinteEnv> {
  return Object.freeze({
    id: STAGES.S4 as StageId,
    version: '1',
    inputs: ['s3.slice', 's3.commit', 'water'],
    outputs: ['ways', 'junctions', 'bridges', 'gates'],
    streamKeys: [] as string[],
    invariants: [],
    ladder: [{ failureClass: 'F-ROUTE', rungs: ['another_site', 'extra_bridge', 'slope', 'unserved'] }],
    workLimits: laws(),
    budgetMs: BUDGET_MS,
    batch: { kind: 'stage' as const, stage: STAGES.S4 as StageId },
    lineageUnit: 'town',
    lazy: false,
    txForm: 'declared' as const,
    inputsOf(model: unknown, _scope: Scope): S4Input {
      const m = model as Partial<S4Input> | null | undefined;
      if (m === null || m === undefined || m.slice === undefined || m.commit === undefined || m.kernel === undefined) {
        throw new TypeError('s4Stage.inputsOf: the model hands S4 the S3 slice, its commits and the kernel façade');
      }
      return m as S4Input;
    },
    run(input: S4Input, _ctx: StageContext<EnceinteEnv>): KernelResult<S4Output> {
      return runS4(input, opts);
    },
  });
}

/** The base NetworkStrategy's options beside §4.12's parameters: the S3 slice and its commits S4 reads. */
export interface NetworkOptions extends S4Options {
  readonly slice: S3Slice;
  readonly commit: S3Commit;
}

/** §4.12's NetworkStrategy, its S4 part (stage 1, no existing network). */
export interface NetworkStrategy {
  grow(
    site: Site,
    destinations: readonly Destination[],
    terrain: Terrain,
    water: WaterSet,
    enceintes: readonly Enceinte[],
    existing: S4Output | null,
    stage: number,
    ctx: StageContext<EnceinteEnv>,
    k: Kernel,
    opts?: NetworkOptions,
  ): KernelResult<S4Output>;
}

/** The base network strategy's registered name. */
export const NETWORK_STRATEGY_ID = 'base';

/** The base NetworkStrategy's S4 part (see the header). */
export const baseNetwork: NetworkStrategy = Object.freeze({
  grow(
    _site: Site,
    _destinations: readonly Destination[],
    _terrain: Terrain,
    water: WaterSet,
    _enceintes: readonly Enceinte[],
    existing: S4Output | null,
    stage: number,
    _ctx: StageContext<EnceinteEnv>,
    k: Kernel,
    opts?: NetworkOptions,
  ): KernelResult<S4Output> {
    if (stage !== 1 || existing !== null) return err('E_INVARIANT', `NetworkStrategy base: stage ${String(stage)}'s main roads are S5b's (M0-c-04); S4 builds stage 1's backbone only`);
    if (opts === undefined) return err('E_INVARIANT', 'NetworkStrategy base: S4 reads the S3 slice and its commits (opts.slice, opts.commit)');
    return runS4({ slice: opts.slice, commit: opts.commit, water, kernel: k }, opts);
  },
});

/** A main gate of the slice and its record (re-exported for readers of the S4 part). */
export type { Gate, SliceGate };
