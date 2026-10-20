// commitRoutes (M0-c-03; §4.3 *One graph, then one smoothing*, *Decks*, *Result*; §4.1's S4 row: "L1: the arterial
// graph's spines, inserted once, each span laid through the deck ends its route uses (those bridges become `built`)";
// §2.4 `Way`, `Junction`; §2.7 `Bridge`, `Gate`; §2.2 rules 5, 7; §6.3: S4's ways keyed by the town in destination
// order). The routes are committed as one graph: built, classified, each chain simplified, its junction rules run,
// smoothed and curvature-limited once, then every chain inserted once — one `insertChain` op per chain, a mandatory
// chain carrying its way's `way` row, in one declared L1 batch (§3.3: the ops independent, each computed before the
// batch). Readings C-0236 (10)–(13):
// * ways in destination order: each route part claims, in order, the chains no earlier part claimed, and each maximal
//   run of chains it claims is one way (`way:<n>`), so a run several routes share is one street, the first route's —
//   a run reaching a second deck span ends before it, one deck per way (§2.4 `Way.bridge`, C-0250);
//   its class the highest of its chains', its width a scalar where it keeps one class, else a `width_knot` profile —
//   two knots at each class change (the run before, the run after), linear, so the profile steps there;
// * junctions: every chain end, numbered by its point (lower, then leftmost; §6.3's canonical vertex order),
//   `junction:<n>`, its row ('junction', id, 0) on the vertex; kind `gate`, `bridgehead` (a deck end), `square` (a
//   plaza attach point), `end` (a frame end or a dead end), `X` (four or more arms), else `T` or `Y` by its arms —
//   `T` where the branch leaves the through line (the widest pair, ≥ `THROUGH_MIN_CDEG`, along the difference of its
//   two unit directions, as the Y → T rule's line) at 75°–105°, independent of the arms' order (C-0239);
// * the chains are validated before the batch — none meets another but at a shared end, none meets the water but a
//   span at its deck ends, the plaza but at its attach end, the wall but at its gate end, and each lies on its side of
//   the wall — and a chain that fails falls back to its simplified course, then to its lattice course (reported
//   `unsmoothed`); a batch the kernel refuses is re-run once on every chain's lattice course, else refused;
// * the water rule is never given up (§2.2 rule 7, C-0076; C-0250): a course that still meets the water off a deck end
//   after the fallbacks falls to its lattice course, and a lattice course that does is refused (`E_INVARIANT`), never
//   committed — S4's routes reach here dry (./stage.ts), so the refusal is a fail-safe, not a path;
// * each route part reaches the graph without a spur (c-03 S3; Q52 A): a point whose neighbour lies within `attractCm`
//   of its segment to the other neighbour is dropped, so §3.6's attraction never folds a way onto itself;
// * the junction kinds are read from the courses committed: after a fallback to the lattice courses, from those; the
//   report's `stretchShared` counts the way edges two or more ways share (c-03 S3).
import { compareKeys, err, kernelOp, ok, STAGES, type Kernel, type KernelOp, type KernelResult, type LatticePoint, type PlatKey, type Polygon, type StageId } from '@plat/kernel';
import { lineageHash, TOWN_ROOT, type Bridge, type ChainProfile, type Cm, type Gate, type Id, type Junction, type NodeRef, type Way } from '@plat/model';
import { loadWorkLimits, workLimitOf, type BaseRung, type TableView } from '@plat/tables';
import { TOUCH_CM } from '../enceinte/plane.js';
import { generated } from '../enceinte/water.js';
import { distToSegment, insideRing, segmentsMeet } from '../siting/geom.js';
import { classGeometryCm, classify, classRank } from './classify.js';
import { arterialGraph, chainPoints, foldParallel, pointKey } from './graph.js';
import { angleBetweenCdeg, armsAt, junctionRules, THROUGH_MIN_CDEG } from './junctions.js';
import { finishChain, simplifyChain, type Simplified } from './smooth.js';
import type { ArterialGraph, Chain, ChainClass, JunctionRule, Network, RouteClass, RoutePoint, S4Report, S4Result, S4Route } from './types.js';

/** The ground arena, ground part 0. */
export const GROUND_PART0: PlatKey = Object.freeze({ layer: 'ground', part: 0 });

/** The counters an L1 insertion batch charges (M0.md §2.2's insert and tx rows). */
export const S4_COUNTERS = Object.freeze(['insert.points', 'insert.attractQueries', 'insert.placementCandidates', 'insert.crossings', 'tx.facesWalked'] as const);

/** The batch's work limit (§5.1 (5)): the counters' laws summed over the batch — its points, and twice its chains as faces. */
export function s4WorkLimit(vertices: number, faces: number): number {
  const t = loadWorkLimits();
  const scope = { kind: 'stage' as const, stage: STAGES.S4 };
  let sum = 0;
  for (const c of S4_COUNTERS) sum += workLimitOf(t.law(c), scope, { vertices, faces });
  return sum;
}

/** commitRoutes' options. */
export interface CommitRoutesOptions {
  readonly tables: TableView;
  readonly rung: BaseRung;
  /** The lattice spacing (cm): Visvalingam's minimum segment and the junction rules' insertion cap. */
  readonly spacingCm: number;
  readonly key?: PlatKey;
  readonly epoch?: number;
  /** What the chains may not cross: the water faces' rings, the plaza's ring, the wall's ring (lattice points). */
  readonly water?: readonly (readonly LatticePoint[])[];
  readonly plaza?: readonly LatticePoint[];
  readonly wall?: readonly LatticePoint[];
  /** The water set's bridges: the ones a committed span uses become `built`. */
  readonly bridges?: readonly Bridge[];
  /** The main gates: each takes its outward way and its junction. */
  readonly gates?: readonly Gate[];
  /** A work limit for the batch in place of the laws' (a test's override). */
  readonly workLimit?: number;
  /** Carried into the report (F-ROUTE's rungs and route.nodes from the route building). */
  readonly rungs?: S4Report['rungs'];
  readonly routeNodes?: number;
  readonly unserved?: readonly string[];
  readonly offGate?: number;
}

/** A side as a segment: x0, y0, x1, y1. */
export type Seg = readonly [number, number, number, number];

function ringSegs(ring: readonly LatticePoint[]): Seg[] {
  const out: Seg[] = [];
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[i + 1 === ring.length ? 0 : i + 1];
    out.push([a.x, a.y, b.x, b.y]);
  }
  return out;
}

/** The segments of a polyline. */
function polySegs(pts: readonly LatticePoint[]): Seg[] {
  const out: Seg[] = [];
  for (let i = 0; i + 1 < pts.length; i += 1) out.push([pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y]);
  return out;
}

function box(pts: readonly { x: number; y: number }[]): [number, number, number, number] {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const p of pts) {
    if (p.x < x0) x0 = p.x;
    if (p.y < y0) y0 = p.y;
    if (p.x > x1) x1 = p.x;
    if (p.y > y1) y1 = p.y;
  }
  return [x0, y0, x1, y1];
}

function boxesMeet(a: readonly number[], b: readonly number[]): boolean {
  return !(a[2] < b[0] || b[2] < a[0] || a[3] < b[1] || b[3] < a[1]);
}

/** Does the segment ab meet the side s anywhere but at `end` (an endpoint of ab lying on s, the other off its line)? */
function meetsOff(a: LatticePoint, b: LatticePoint, s: Seg, ends: readonly LatticePoint[]): boolean {
  const c = { x: s[0], y: s[1] };
  const d = { x: s[2], y: s[3] };
  if (!segmentsMeet(a, b, c, d)) return false;
  for (const e of ends) {
    const isA = a.x === e.x && a.y === e.y;
    const isB = b.x === e.x && b.y === e.y;
    if (!isA && !isB) continue;
    if (distToSegment(e, c, d) >= 1) continue;
    const other = isA ? b : a;
    if (distToSegment(other, c, d) >= 1) return false;
  }
  return true;
}

/** Do two chains' polylines meet anywhere but at a shared end (where they may not overlap)? */
function chainsMeet(p: readonly LatticePoint[], q: readonly LatticePoint[]): boolean {
  const shared: LatticePoint[] = [];
  for (const e of [p[0], p[p.length - 1]]) for (const f of [q[0], q[q.length - 1]]) if (e.x === f.x && e.y === f.y) shared.push(e);
  for (let i = 0; i + 1 < p.length; i += 1) {
    for (let j = 0; j + 1 < q.length; j += 1) {
      const a = p[i];
      const b = p[i + 1];
      const c = q[j];
      const d = q[j + 1];
      if (!segmentsMeet(a, b, c, d)) continue;
      let atShared = false;
      for (const e of shared) {
        const onAB = (a.x === e.x && a.y === e.y) || (b.x === e.x && b.y === e.y);
        const onCD = (c.x === e.x && c.y === e.y) || (d.x === e.x && d.y === e.y);
        if (!onAB || !onCD) continue;
        const u = a.x === e.x && a.y === e.y ? b : a;
        const v = c.x === e.x && c.y === e.y ? d : c;
        if (angleBetweenCdeg({ x: u.x - e.x, y: u.y - e.y }, { x: v.x - e.x, y: v.y - e.y }) > 1) atShared = true;
      }
      if (!atShared) return true;
    }
  }
  return false;
}

/** The validation context: the obstacle sides and each chain's allowed ends and side of the wall. */
interface Rules {
  readonly water: Seg[];
  readonly plaza: Seg[];
  readonly wall: Seg[];
  readonly wallRing: readonly LatticePoint[] | null;
}

/** The sides of rings (water faces) as segments, for `meetsWaterOff`. */
export function waterSides(rings: readonly (readonly LatticePoint[])[]): Seg[] {
  return rings.flatMap((r) => ringSegs(r));
}

/** Does the segment ab meet a water side anywhere but at one of `ends` (a deck end landing on that side)? */
export function meetsWaterOff(a: LatticePoint, b: LatticePoint, sides: readonly Seg[], ends: readonly LatticePoint[]): boolean {
  const x0 = Math.min(a.x, b.x);
  const x1 = Math.max(a.x, b.x);
  const y0 = Math.min(a.y, b.y);
  const y1 = Math.max(a.y, b.y);
  for (const s of sides) {
    if (Math.max(s[0], s[2]) < x0 || Math.min(s[0], s[2]) > x1 || Math.max(s[1], s[3]) < y0 || Math.min(s[1], s[3]) > y1) continue;
    if (meetsOff(a, b, s, ends)) return true;
  }
  return false;
}

/** A chain's end points pinned `deck_end`. */
function deckEndsOf(g: ArterialGraph, c: Chain, pts: readonly LatticePoint[]): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const e of [pts[0], pts[pts.length - 1]]) {
    for (const n of [c.nodes[0], c.nodes[c.nodes.length - 1]]) if (g.nodes[n].at.x === e.x && g.nodes[n].at.y === e.y && g.nodes[n].pin === 'deck_end') out.push(e);
  }
  return out;
}

/** Does a chain's polyline meet the water off its deck ends (a span never does: it is the deck)? */
function overWater(g: ArterialGraph, c: Chain, pts: readonly LatticePoint[], rules: Rules): boolean {
  if (c.span !== null || rules.water.length === 0) return false;
  const ends = deckEndsOf(g, c, pts);
  for (let i = 0; i + 1 < pts.length; i += 1) if (meetsWaterOff(pts[i], pts[i + 1], rules.water, ends)) return true;
  return false;
}

/** Does a chain's polyline keep the obstacle rules (see the header)? */
function chainKeeps(g: ArterialGraph, c: Chain, pts: readonly LatticePoint[], rules: Rules, inward: boolean | null): boolean {
  const ends = [pts[0], pts[pts.length - 1]];
  const pinOf = (p: LatticePoint): string | null => {
    for (const n of [c.nodes[0], c.nodes[c.nodes.length - 1]]) if (g.nodes[n].at.x === p.x && g.nodes[n].at.y === p.y) return g.nodes[n].pin;
    return null;
  };
  const attachEnds = ends.filter((e) => pinOf(e) === 'attach');
  const gateEnds = ends.filter((e) => pinOf(e) === 'gate');
  if (overWater(g, c, pts, rules)) return false;
  for (let i = 0; i + 1 < pts.length; i += 1) {
    const a = pts[i];
    const z = pts[i + 1];
    for (const s of rules.plaza) if (meetsOff(a, z, s, attachEnds)) return false;
    for (const s of rules.wall) if (meetsOff(a, z, s, gateEnds)) return false;
  }
  if (rules.wallRing !== null && inward !== null && pts.length >= 2) {
    const k = Math.floor(pts.length * 0.5) - 1;
    const i = k < 0 ? 0 : k;
    const mid = { x: (pts[i].x + pts[i + 1].x) * 0.5, y: (pts[i].y + pts[i + 1].y) * 0.5 };
    if (insideRing(rules.wallRing, mid) !== inward) return false;
  }
  return true;
}

/** The way a route part's chains form: per chain index in route order, its orientation. */
function chainsAlong(g: ArterialGraph, ri: number): { chain: number; forward: boolean }[] {
  const r = g.routes[ri];
  const nodeAt = new Map<string, number>();
  g.nodes.forEach((n, i) => nodeAt.set(pointKey(n.at), i));
  const edgeChain = new Map<number, number>();
  for (const c of g.chains) for (const e of c.edges) edgeChain.set(e, c.index);
  const out: { chain: number; forward: boolean }[] = [];
  for (let i = 0; i + 1 < r.points.length; i += 1) {
    const u = nodeAt.get(pointKey(r.points[i].at)) as number;
    const v = nodeAt.get(pointKey(r.points[i + 1].at)) as number;
    const e = g.nodes[u].edges.find((x) => (g.edges[x].a === u && g.edges[x].b === v) || (g.edges[x].a === v && g.edges[x].b === u));
    if (e === undefined) continue;
    const ci = edgeChain.get(e) as number;
    if (out.length > 0 && out[out.length - 1].chain === ci) continue;
    const ch = g.chains[ci];
    out.push({ chain: ci, forward: ch.nodes[0] === u || (ch.nodes.indexOf(u) !== -1 && ch.nodes.indexOf(u) < ch.nodes.indexOf(v)) });
  }
  return out;
}

/** A NodeRef for a graph node: the entity its pin names, else the junction there. */
function nodeRef(g: ArterialGraph, v: number, junctionOf: ReadonlyMap<number, Id>, fallback: NodeRef | null): NodeRef {
  if (fallback !== null) return fallback;
  const n = g.nodes[v];
  if (n.pin === 'gate' && n.pinId !== null) return { kind: 'gate', id: n.pinId };
  if (n.pin === 'deck_end' && n.pinId !== null) return { kind: 'bridge', id: n.pinId };
  if (n.pin === 'attach' && n.pinId !== null) return { kind: 'plaza', id: n.pinId };
  return { kind: 'junction', id: junctionOf.get(v) as Id };
}

/** The kind of a junction by its pin and its arms (see the header). */
function junctionKind(g: ArterialGraph, polys: readonly Simplified[], v: number, arms: number): Junction['kind'] {
  const n = g.nodes[v];
  if (n.pin === 'gate') return 'gate';
  if (n.pin === 'deck_end') return 'bridgehead';
  if (n.pin === 'attach') return 'square';
  if (n.pin === 'frame' || arms <= 1) return 'end';
  if (arms >= 4) return 'X';
  if (arms === 2) return 'end';
  const as = armsAt(g, polys, v);
  if (as.length !== 3) return 'Y';
  // The through line: the widest pair of arms (every pair as wide, on an exact tie), ≥ THROUGH_MIN_CDEG apart.
  const pairs: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 2],
  ];
  const gaps = pairs.map(([i, j]) => angleBetweenCdeg(as[i].dir, as[j].dir));
  const widest = Math.max(...gaps);
  if (widest < THROUGH_MIN_CDEG) return 'Y';
  for (let p = 0; p < 3; p += 1) {
    if (gaps[p] !== widest) continue;
    const [i, j] = pairs[p];
    const di = as[i].dir;
    const dj = as[j].dir;
    // ui − uj, scaled by |di|·|dj| (no division): the line's direction.
    const li = Math.sqrt(di.x * di.x + di.y * di.y);
    const lj = Math.sqrt(dj.x * dj.x + dj.y * dj.y);
    const line = { x: di.x * lj - dj.x * li, y: di.y * lj - dj.y * li };
    const off = angleBetweenCdeg(as[3 - i - j].dir, line);
    if (off >= 7_500 && off <= 10_500) return 'T';
  }
  return 'Y';
}

/**
 * A route part's course made one simple spine before the graph (c-03 S3; Q52 A, R-35): §4.3 inserts each chain once "as
 * a spine — a `mandatory` chain carrying the `way` role", and a way is one simple chain (§3.10's role consistency). A
 * spur — a point whose two neighbours fold back onto each other, one of them within `attractCm` of the segment from the
 * point to the other — is a course §3.6's attraction routes through that neighbour, so the way would branch there (the
 * attach point's lattice neighbour lying beyond it, the next edge passing the attach point within a few cm): the point
 * is dropped and the course runs straight along the segment it folded onto, until none is left. Pinned points are never
 * dropped, nor a point whose two neighbours' segment would meet one of `avoid`'s sides (the plaza's, the wall's, the
 * water's) but at its own ends; a part with no spur is returned as it is.
 */
function withoutSpurs(r: S4Route, avoid: readonly Seg[]): S4Route {
  const pts = r.points;
  const keep = pts.map(() => true);
  let changed = false;
  for (let guard = 0; guard < pts.length; guard += 1) {
    const live: number[] = [];
    for (let i = 0; i < pts.length; i += 1) if (keep[i]) live.push(i);
    let cut = -1;
    for (let m = 1; m + 1 < live.length && cut === -1; m += 1) {
      const p = pts[live[m]];
      if (p.pin !== undefined) continue;
      const a = pts[live[m - 1]].at;
      const b = pts[live[m + 1]].at;
      if (distToSegment(a, p.at, b) > TOUCH_CM && distToSegment(b, a, p.at) > TOUCH_CM) continue;
      if (!avoid.some((side) => meetsOff(a, b, side, [a, b]))) cut = live[m];
    }
    if (cut === -1) break;
    keep[cut] = false;
    changed = true;
  }
  if (!changed) return r;
  const index = new Map<number, number>();
  const points: RoutePoint[] = [];
  pts.forEach((p, i) => {
    if (!keep[i]) return;
    index.set(i, points.length);
    points.push(p);
  });
  return { ...r, points, spans: r.spans.map((s) => ({ at: index.get(s.at) as number, bridge: s.bridge })) };
}

/**
 * §4.3's commit of `routes` as one graph (see the header): the graph, the classes, the smoothing, the way and junction
 * records, the batch. Refused with the kernel's code when the batch is refused on the lattice courses too.
 */
export function commitRoutes(routes: readonly S4Route[], k: Kernel, opts: CommitRoutesOptions): KernelResult<S4Result> {
  const tables = opts.tables;
  const key = opts.key ?? GROUND_PART0;
  const epoch = opts.epoch ?? 0;
  const ways = tables.table('ways');
  const mergeCm = ways.num('graph', 'junctionMergeM') * 100;
  const avoid: Seg[] = [...(opts.plaza === undefined ? [] : ringSegs(opts.plaza)), ...(opts.wall === undefined ? [] : ringSegs(opts.wall)), ...(opts.water ?? []).flatMap((r) => ringSegs(r))];
  const sorted = routes.slice().sort((a, b) => a.order - b.order || (a.part === b.part ? 0 : a.part === 'inward' ? -1 : 1)).map((r) => withoutSpurs(r, avoid));
  // The fold reads each part's class; a part whose chains the betweenness promotes is folded again at the class it
  // took (C-0236 (16)): two passes.
  let folded = foldParallel(sorted, (r) => classGeometryCm(tables, r.class).separationCm, opts.spacingCm, avoid);
  let g = arterialGraph(folded.routes, mergeCm);
  let classes = classify(g, { tables, rung: opts.rung });
  const taken = new Map<string, RouteClass>();
  g.chains.forEach((ch) => {
    for (const ri of ch.routes) {
      const id = g.routes[ri].id;
      const was = taken.get(id) ?? g.routes[ri].class;
      if (classRank(classes[ch.index].class) < classRank(was)) taken.set(id, classes[ch.index].class);
    }
  });
  if (taken.size > 0) {
    folded = foldParallel(sorted, (r) => classGeometryCm(tables, taken.get(r.id) ?? r.class).separationCm, opts.spacingCm, avoid);
    g = arterialGraph(folded.routes, mergeCm);
    classes = classify(g, { tables, rung: opts.rung });
  }
  const radius = (c: RouteClass): number => classGeometryCm(tables, c).minRadiusCm;

  // The chains' lattice courses, oriented canonically, with their held points.
  const raw: LatticePoint[][] = g.chains.map((c) => chainPoints(g, c));
  const held: boolean[][] = g.chains.map((c) => c.nodes.map((n) => g.nodes[n].held || g.nodes[n].pin !== null));
  const waterRings = (opts.water ?? []).map((r) => r.slice());
  const fixedObstacles: Polygon[] = [...waterRings, ...(opts.plaza === undefined ? [] : [opts.plaza.slice()]), ...(opts.wall === undefined ? [] : [opts.wall.slice()])];
  // Simplify each chain with the others' lattice courses as obstacles (a degenerate ring each).
  const asRing = (pts: readonly LatticePoint[]): LatticePoint[] => (pts.length <= 2 ? pts.slice() : [...pts, ...pts.slice(1, -1).reverse()]);
  const simplified: Simplified[] = g.chains.map((c) => {
    if (c.span !== null) return { points: raw[c.index].slice(), anchor: raw[c.index].map(() => true) };
    const near = box(raw[c.index]);
    const others: Polygon[] = [];
    for (const o of g.chains) {
      if (o.index === c.index) continue;
      const b = box(raw[o.index]);
      if (boxesMeet([near[0] - 5000, near[1] - 5000, near[2] + 5000, near[3] + 5000], b)) others.push(asRing(raw[o.index]));
    }
    return simplifyChain(raw[c.index], held[c.index], { minSegmentCm: opts.spacingCm, obstacles: [...fixedObstacles, ...others] });
  });
  // The junction rules, on the simplified chains.
  const obstacleSegs: Seg[] = fixedObstacles.flatMap((r) => ringSegs(r));
  const junctionRulesRun: JunctionRule[] = junctionRules(g, simplified, classes, {
    minCrossingCdeg: ways.num('graph', 'minCrossingCdeg'),
    spacingCm: opts.spacingCm,
    radiusCm: (ci) => radius(classes[ci].class),
    obstacles: obstacleSegs,
  });
  // Chaikin and the curvature limit.
  const passes = ways.num('graph', 'chaikinPasses');
  let belowRadius = 0;
  const finals: LatticePoint[][] = g.chains.map((c) => {
    if (c.span !== null) return simplified[c.index].points.slice();
    const f = finishChain(simplified[c.index], { chaikinPasses: passes, minRadiusCm: radius(classes[c.index].class) });
    belowRadius += f.belowRadius;
    return f.points;
  });

  // Validation and fallback: final → simplified → lattice course.
  const rules: Rules = {
    water: waterRings.flatMap((r) => ringSegs(r)),
    plaza: opts.plaza === undefined ? [] : ringSegs(opts.plaza),
    wall: opts.wall === undefined ? [] : ringSegs(opts.wall),
    wallRing: opts.wall === undefined ? null : opts.wall,
  };
  const sideOf = g.chains.map((c): boolean | null => {
    let side: boolean | null = null;
    for (const ri of c.routes) {
      const s = g.routes[ri].part === 'inward';
      if (side === null) side = s;
      else if (side !== s) return null;
    }
    return side;
  });
  const level = g.chains.map(() => 0);
  const course = (ci: number): LatticePoint[] => (level[ci] === 0 ? finals[ci] : level[ci] === 1 ? simplified[ci].points : raw[ci]);
  for (const c of g.chains) {
    while (level[c.index] < 2 && !chainKeeps(g, c, course(c.index), rules, sideOf[c.index])) level[c.index] += 1;
  }
  const boxes = g.chains.map((c) => box(course(c.index)));
  for (let round = 0; round < 3; round += 1) {
    let changed = false;
    for (let i = 0; i < g.chains.length; i += 1) {
      for (let j = i + 1; j < g.chains.length; j += 1) {
        if (!boxesMeet(boxes[i], boxes[j])) continue;
        if (!chainsMeet(course(i), course(j))) continue;
        for (const x of [i, j]) {
          if (level[x] < 2) {
            level[x] += 1;
            boxes[x] = box(course(x));
            changed = true;
          }
        }
      }
    }
    if (!changed) break;
  }
  // The water rule on the courses as they stand (C-0250): down to the lattice course, then refused, never committed.
  for (const c of g.chains) {
    while (overWater(g, c, course(c.index), rules)) {
      if (level[c.index] === 2) return err('E_INVARIANT', waterRefusal(g, c));
      level[c.index] += 1;
    }
  }
  let unsmoothed = 0;
  for (const l of level) if (l > 0) unsmoothed += 1;

  // Ways, in destination order: each route part claims the chains no earlier part claimed.
  const owner = new Array<number>(g.chains.length).fill(-1);
  const wayChains: { chain: number; forward: boolean }[][] = [];
  const wayRoute: number[] = [];
  g.routes.forEach((_r, ri) => {
    const along = chainsAlong(g, ri);
    let run: { chain: number; forward: boolean }[] = [];
    const flush = (): void => {
      if (run.length === 0) return;
      for (const x of run) owner[x.chain] = wayChains.length;
      wayChains.push(run);
      wayRoute.push(ri);
      run = [];
    };
    for (const x of along) {
      if (owner[x.chain] === -1 && !run.some((y) => y.chain === x.chain)) {
        // One deck per way (§2.4 `Way.bridge`, C-0250): a second span starts the next way.
        if (g.chains[x.chain].span !== null && run.some((y) => g.chains[y.chain].span !== null)) flush();
        run.push(x);
      } else flush();
    }
    flush();
  });
  // A chain no route part claimed (never, every chain lies on a route): its own way.
  for (const c of g.chains) {
    if (owner[c.index] !== -1) continue;
    owner[c.index] = wayChains.length;
    wayChains.push([{ chain: c.index, forward: true }]);
    wayRoute.push(c.routes[0] ?? 0);
  }
  const wayIds = wayChains.map((_w, i) => `way:${String(i)}`);

  // Junctions: every chain end, numbered by its point.
  const endNodes = new Set<number>();
  for (const c of g.chains) {
    endNodes.add(c.nodes[0]);
    endNodes.add(c.nodes[c.nodes.length - 1]);
  }
  const jNodes = [...endNodes].sort((a, b) => g.nodes[a].at.y - g.nodes[b].at.y || g.nodes[a].at.x - g.nodes[b].at.x);
  const junctionOf = new Map<number, Id>();
  jNodes.forEach((v, i) => junctionOf.set(v, `junction:${String(i)}`));
  // The junction records, their kinds read from the courses committed (re-read after a fallback to the lattice courses).
  const junctionsOn = (courseOf: (ci: number) => LatticePoint[]): Junction[] => {
    const polys: Simplified[] = g.chains.map((c) => ({ points: courseOf(c.index), anchor: courseOf(c.index).map(() => false) }));
    return jNodes.map((v) => {
      const arms = new Set<string>();
      let count = 0;
      for (const c of g.chains) {
        const a = c.nodes[0];
        const b = c.nodes[c.nodes.length - 1];
        if (a === v) {
          arms.add(wayIds[owner[c.index]]);
          count += 1;
        }
        if (b === v) {
          arms.add(wayIds[owner[c.index]]);
          count += 1;
        }
      }
      const id = junctionOf.get(v) as Id;
      return { id, vertex: { role: 'junction', entity: id, ordinal: 0 }, arms: [...arms].sort(compareKeys), kind: junctionKind(g, polys, v, count), lifecycle: generated(epoch) };
    });
  };
  let junctions = junctionsOn(course);

  // Way records, with their width profiles.
  const knotsOf = new Map<number, { index: number; role: string; ordinal: number; entity: Id }[]>();
  const pushKnot = (ci: number, kn: { index: number; role: string; ordinal: number; entity: Id }): void => {
    const l = knotsOf.get(ci) ?? [];
    l.push(kn);
    knotsOf.set(ci, l);
  };
  const wayRecords: Way[] = wayChains.map((run, wi) => {
    const id = wayIds[wi];
    const route = g.routes[wayRoute[wi]];
    let cls: RouteClass = 'path';
    for (const x of run) if (classRank(classes[x.chain].class) < classRank(cls)) cls = classes[x.chain].class;
    // The class runs along the way and their widths (the run's widest chain).
    const runs: { cls: RouteClass; width: number; last: number }[] = [];
    run.forEach((x, i) => {
      const cc = classes[x.chain];
      const top = runs[runs.length - 1];
      if (top !== undefined && top.cls === cc.class) {
        top.width = Math.max(top.width, cc.widthCm);
        top.last = i;
      } else runs.push({ cls: cc.class, width: cc.widthCm, last: i });
    });
    let width: Cm | ChainProfile<Cm>;
    if (runs.length === 1) width = runs[0].width as Cm;
    else {
      const values: Cm[] = [];
      for (let r = 0; r + 1 < runs.length; r += 1) {
        // Two knots on the vertex where run r ends: its width, then the next run's.
        const x = run[runs[r].last];
        const pts = course(x.chain);
        const index = x.forward ? pts.length - 1 : 0;
        pushKnot(x.chain, { index, role: 'width_knot', ordinal: values.length, entity: id });
        values.push(runs[r].width as Cm);
        pushKnot(x.chain, { index, role: 'width_knot', ordinal: values.length, entity: id });
        values.push(runs[r + 1].width as Cm);
      }
      width = { knotRole: 'width_knot', values, interp: 'linear' };
    }
    const first = run[0];
    const last = run[run.length - 1];
    const startNode = first.forward ? g.chains[first.chain].nodes[0] : g.chains[first.chain].nodes[g.chains[first.chain].nodes.length - 1];
    const endNode = last.forward ? g.chains[last.chain].nodes[g.chains[last.chain].nodes.length - 1] : g.chains[last.chain].nodes[0];
    const routeStart = g.routes[wayRoute[wi]].points[0].at;
    const routeEnd = g.routes[wayRoute[wi]].points[g.routes[wayRoute[wi]].points.length - 1].at;
    const sameAt = (v: number, p: LatticePoint): boolean => g.nodes[v].at.x === p.x && g.nodes[v].at.y === p.y;
    const span = run.map((x) => g.chains[x.chain].span).find((s) => s !== null) ?? null;
    return {
      id,
      class: cls,
      spine: { role: 'way', entity: id },
      width,
      from: nodeRef(g, startNode, junctionOf, sameAt(startNode, routeStart) ? route.from : null),
      to: nodeRef(g, endNode, junctionOf, sameAt(endNode, routeEnd) ? route.to : null),
      growthStage: 1,
      epoch,
      provisional: false,
      ...(span === null ? {} : { bridge: span }),
      lifecycle: generated(epoch),
    };
  });

  // The batch: one insertChain op per chain, in one declared L1 batch.
  const town = lineageHash(TOWN_ROOT);
  const opsFor = (courseOf: (ci: number) => LatticePoint[]): { ops: KernelOp[]; vertices: number } => {
    const ops: KernelOp[] = [];
    let vertices = 0;
    const firstAt = new Map<number, number>();
    for (const c of g.chains) {
      for (const v of [c.nodes[0], c.nodes[c.nodes.length - 1]]) if (!firstAt.has(v)) firstAt.set(v, c.index);
    }
    const posInWay = new Map<number, number>();
    wayChains.forEach((run) => run.forEach((x, i) => posInWay.set(x.chain, i)));
    for (const c of g.chains) {
      const pts = courseOf(c.index);
      vertices += pts.length;
      const knots: { index: number; role: string; ordinal: number; entity: Id }[] = [];
      for (const [v, idx] of [
        [c.nodes[0], 0],
        [c.nodes[c.nodes.length - 1], pts.length - 1],
      ] as const) {
        if (firstAt.get(v) === c.index && !knots.some((x) => x.role === 'junction' && x.index === idx)) knots.push({ index: idx, role: 'junction', ordinal: 0, entity: junctionOf.get(v) as Id });
      }
      for (const kn of knotsOf.get(c.index) ?? []) knots.push({ ...kn, index: kn.index === 0 ? 0 : pts.length - 1 });
      const pinned: number[] = [0, pts.length - 1];
      const heldAt = new Set<string>();
      c.nodes.forEach((n) => {
        if (g.nodes[n].held || g.nodes[n].pin !== null) heldAt.add(pointKey(g.nodes[n].at));
      });
      pts.forEach((p, i) => {
        if (i > 0 && i < pts.length - 1 && heldAt.has(pointKey(p))) pinned.push(i);
      });
      const wi = owner[c.index];
      const lineage = lineageHash({ arena: key, unit: town, stage: STAGES.S4 as StageId, epoch, index: wi, reroll: 0 });
      const roles = [{ role: 'way', entity: wayIds[wi] }];
      ops.push(kernelOp('insertChain', lineage, posInWay.get(c.index) ?? 0, (o) => k.geom.insertChain(o, pts, roles, 'mandatory', { knots, pinned })));
    }
    return { ops, vertices };
  };
  const submit = (courseOf: (ci: number) => LatticePoint[]): ReturnType<Kernel['tx']> => {
    const { ops, vertices } = opsFor(courseOf);
    return k.tx({
      key,
      level: 1,
      ops,
      expect: [],
      onFail: 'reject',
      batch: { kind: 'stage', stage: STAGES.S4 as StageId },
      stage: STAGES.S4 as StageId,
      rederivesFrom: STAGES.S4 as StageId,
      workLimit: opts.workLimit ?? s4WorkLimit(vertices, 2 * g.chains.length + 2),
    });
  };
  let committed = submit(course);
  let spines = g.chains.map((c) => course(c.index));
  if (!committed.ok && committed.code !== 'E_WORK_LIMIT') {
    // Re-run once on the lattice courses (planar by construction), each of them dry (C-0250).
    for (const c of g.chains) if (overWater(g, c, raw[c.index], rules)) return err('E_INVARIANT', waterRefusal(g, c));
    const again = submit((ci) => raw[ci]);
    if (!again.ok) return err(again.code, `S4: the spines' batch was refused (${committed.code}: ${committed.detail}); on the lattice courses too: ${again.detail}`);
    committed = again;
    spines = raw.map((r) => r.slice());
    unsmoothed = g.chains.length;
    junctions = junctionsOn((ci) => raw[ci]);
  }
  if (!committed.ok) return err(committed.code, `S4: the spines' batch: ${committed.detail}`);
  // The braids the graph merge missed: the way edges two or more ways share, read from the arena (c-03 S3; a way laid
  // along a non-way ring — the plaza's side next to its attach point — shares a stretch the kernel warns of, no braid).
  const wayOfPair = new Map<number, Id>();
  let stretchShared = 0;
  for (const id of wayIds) {
    const r = k.resolve({ role: 'way', entity: id }, key);
    if (r.view !== 'edges') continue;
    for (const run of r.runs) {
      for (const h of run) {
        const pair = Math.floor(h * 0.5);
        const other = wayOfPair.get(pair);
        if (other === undefined) wayOfPair.set(pair, id);
        else if (other !== id) stretchShared += 1;
      }
    }
  }

  // The bridges a span uses become built; the gates take their outward way and junction.
  const spanWay = new Map<Id, Id>();
  g.chains.forEach((c) => {
    if (c.span !== null && !spanWay.has(c.span)) spanWay.set(c.span, wayIds[owner[c.index]]);
  });
  const bridges = (opts.bridges ?? []).map((b): Bridge => {
    const w = spanWay.get(b.id);
    return w === undefined ? b : { ...b, state: 'built', way: w };
  });
  const gateNode = new Map<Id, number>();
  g.nodes.forEach((n, i) => {
    if (n.pin === 'gate' && n.pinId !== null) gateNode.set(n.pinId, i);
  });
  const gates = (opts.gates ?? []).map((gt): Gate => {
    const v = gateNode.get(gt.id);
    if (v === undefined) return gt;
    // The outward way: the way of the outward part's first chain at the gate.
    let way: Id | null = gt.way;
    g.routes.forEach((r, ri) => {
      if (r.part !== 'outward' || r.from.kind !== 'gate' || r.from.id !== gt.id) return;
      const along = chainsAlong(g, ri);
      if (along.length > 0) way = wayIds[owner[along[0].chain]];
    });
    return { ...gt, way, junction: junctionOf.get(v) as Id };
  });
  const network: Network = { ways: wayRecords, junctions };
  const report: S4Report = {
    work: { 'route.nodes': opts.routeNodes ?? 0 },
    rungs: opts.rungs ?? [],
    folds: folded.folds,
    merges: g.merges,
    keptApart: g.keptApart,
    junctionRules: junctionRulesRun,
    belowRadius,
    unsmoothed,
    offGate: opts.offGate ?? 0,
    stretchShared,
    unserved: opts.unserved ?? [],
  };
  return ok(
    { network, bridges, gates, graph: g, classes, spines, chainWay: g.chains.map((c) => wayIds[owner[c.index]]), report },
    committed.warnings,
  );
}

/** The refusal of a chain whose lattice course meets the water off a deck end (C-0250). */
function waterRefusal(g: ArterialGraph, c: Chain): string {
  const routes = c.routes.map((ri) => g.routes[ri].id).join(', ');
  return `S4: chain ${String(c.index)} (${routes}) meets the water off a deck on its lattice course; refused, never committed (§2.2 rule 7, C-0076)`;
}

/** The class of each chain as `ChainClass` (re-exported for the stage's report). */
export type { ChainClass };
