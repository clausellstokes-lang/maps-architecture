// S5b main roads and the growth stages' S5a / S5b driver (M0-c-04; §4.4 S5b, S5a, §4.1's S5 batch row, §4.3's router,
// §5.2 F-ROUTE, §13.2's S5b test; C-0016, C-0017, C-0032; readings C-S5AB). For each growth stage k ≥ 2, in §4.1's order:
//   S5a's boundary (./boundary.ts) from T as it stands;
//   S5b: N_k by the gate law of §4.2 S3 (4) on the land inside the stage's enceinte (walled; no waterfront or closed-arc
//        reduction at M0, C-0032's slice) or one primary per `mainRoadSpacingM` of boundary (unwalled); the crossings c of
//        the existing ways with the boundary on ground part 0 (M0 has no raised way); when N_k > c, N_k − c radial
//        destinations on the boundary by sequential nested picks — largest angular gaps first, terrain-scored like S3's
//        gates (one uniform per candidate per pick from the `growth.mainroad` stream, so a smaller count is a prefix of a
//        larger one) — each routed by S4's router (`routeLadder`, F-ROUTE's M0 rungs) from the nearest junction it can
//        reach on an existing main road outside the previous enceinte (never through an inner wall nor its strips) to
//        the destination, then outside the stage to the frame at its bearing; committed in one declared L1 batch, the new
//        roads re-settling T (`resettleT`);
//   S5a's trace (walled stages): every crossing a gate (./boundary.ts `traceStage`).
// Stage 1 is S3's: its boundary S3's contour, its trace S3's (committed with S3's batch, `commitS3Slice`, or by
// `traceStage1`), no S5b. The between-stage prune and trim and S5c / S5d are M0-c-05's; their order between stages is
// the registration's (M0-x-04).
import {
  CONCERNS,
  createRng,
  dmath,
  err,
  kernelOp,
  ok,
  STAGES,
  type Kernel,
  type KernelOp,
  type KernelResult,
  type LatticePoint,
  type PlatKey,
  type StageId,
  type Stream,
  type Warning,
} from '@plat/kernel';
import { lineageHash, TOWN_ROOT, type Cdeg, type Cm, type Gate, type Id, type Junction, type Reservation, type Rung, type Scope, type Stage, type StageContext, type WaterSet, type Way, type WorkLimitLaw } from '@plat/model';
import { TOWN_ROOT as TOWN_HANDLE, terrainSampler } from '@plat/site';
import { loadWorkLimits, workLimitOf } from '@plat/tables';
import { S4_COUNTERS } from '../backbone/commit.js';
import { classGeometryCm, widthBandCm } from '../backbone/classify.js';
import { routeGraph, routeLadder, type RouteGraph } from '../backbone/route.js';
import { finishChain, simplifyChain } from '../backbone/smooth.js';
import type { S4Output } from '../backbone/stage.js';
import type { RouteRung } from '../backbone/types.js';
import { WAY_SPAN_NODES, type S3Commit } from '../enceinte/commit.js';
import { distToRing, unitOf } from '../enceinte/plane.js';
import { stripWidths, toFrame } from '../enceinte/strips.js';
import type { EnceinteEnv, XY } from '../enceinte/types.js';
import { generated, GROUND } from '../enceinte/water.js';
import type { WaterPull } from '../siting/field.js';
import { PICK_JITTER, PICK_RANKED, PICK_SLOPE_WEIGHT, gateCount } from '../siting/gates.js';
import { angularGap, bearingCdeg, insideRing, PI, quot, segmentsMeet } from '../siting/geom.js';
import type { Field, Lattice, S3Slice } from '../siting/types.js';
import {
  boundaryCrossings,
  HA_CM2,
  outlineMeasures,
  resettleT,
  stageBoundary,
  traceStage,
  wayLines,
  withPins,
  type BoundaryCrossing,
  type StageBoundary,
  type StageTraceResult,
  type WayLine,
} from './boundary.js';

// ---- N_k ------------------------------------------------------------------------------------------------------------------

/** N_k as S5b counts it (§4.4 S5b). */
export interface MainRoadCount {
  readonly n: number;
  readonly walled: boolean;
  /** `gateLaw`: the land law on the land inside the enceinte; `spacing`: one per `mainRoadSpacingM` of boundary. */
  readonly rule: 'gateLaw' | 'spacing';
}

/** Is stage k's regime walled (regimes.json's `walled` cell of the stage's regime row)? */
export function stageWalled(site: S3Slice['site'], k: number): boolean {
  return site.tables.table('regimes').value(site.land.regimes[k - 1], 'walled') === true;
}

/**
 * N_k (§4.4 S5b): walled — §4.2 S3 (4)'s land law on the land inside the stage's enceinte (the boundary's land, stages
 * 1 … k), with no reduction at M0 (C-0032's slice); unwalled — one primary per `mainRoadSpacingM` of the boundary's
 * length, rounded to the nearest whole road (C-S5AB).
 */
export function mainRoadCount(site: S3Slice['site'], k: number, boundary: StageBoundary): MainRoadCount {
  if (stageWalled(site, k)) return { n: gateCount(quot(boundary.landCm2, HA_CM2, 'count', 'land in ha'), site.tables), walled: true, rule: 'gateLaw' };
  const spacing = site.tables.table('regimes').num(site.land.regimes[k - 1], `mainRoadSpacingM.${site.rung}`) * 100;
  const per = outlineMeasures(boundary.set.outline).perimeterCm;
  return { n: Math.round(quot(per, spacing, 'length', 'main-road spacing')), walled: false, rule: 'spacing' };
}

// ---- the picks ------------------------------------------------------------------------------------------------------------

/** A spawned radial destination on the stage's boundary (§4.4 S5b). */
export interface MainRoadPick {
  readonly ordinal: number;
  /** The contour vertex: the midpoint of the lattice edge [inside node, outside node] it lies on (C-0017). */
  readonly at: LatticePoint;
  readonly edge: readonly [number, number];
  /** The radial bearing from the nucleus through the destination (cdeg): the road's bearing to the frame. */
  readonly bearingCdeg: number;
  /** The candidate edges' inside nodes in score order, the pick first. */
  readonly ranked: readonly number[];
}

/** spawnPrimaries' options. */
export interface SpawnOptions {
  /** The nucleus the angular gaps are seen from (default the origin). */
  readonly centre?: XY;
  /** Per node, 1 where a destination's inside node may lie (the stage's ring outside the previous enceinte). */
  readonly mask?: Uint8Array;
}

/**
 * S5b's spawned destinations (§4.4 S5b): `n − crossings.length` (none when n ≤ c) nested picks on the boundary's contour
 * from `stream`. Candidates: the contour's crossed edges whose inside node is interior dry land (and in `mask`), the
 * destination the edge's contour vertex; pick i scores every candidate by its angular gap (from the nucleus) to the
 * crossings and the earlier picks (largest gaps first), the terrain (steep ground down) and a jitter — one uniform per
 * candidate per pick, as S3's gate picks (C-0201 (2)), so the picks for a smaller count are a prefix of a larger one's.
 */
export function spawnPrimaries(boundary: StageBoundary, n: number, crossings: readonly Pick<BoundaryCrossing, 'bearingCdeg'>[], stream: Stream, opts: SpawnOptions = {}): MainRoadPick[] {
  if (!(Number.isInteger(n) && n >= 0)) throw new RangeError(`spawnPrimaries: N_k is a whole number ≥ 0, got ${String(n)}`);
  const want = n - crossings.length;
  if (want <= 0) return [];
  const set = boundary.set;
  const lattice = set.field.lattice;
  const centre = opts.centre ?? { x: 0, y: 0 };
  const seen = new Set<number>();
  const cands: { u: number; v: number; at: LatticePoint; bearing: number }[] = [];
  set.contourEdges.forEach(([u, v], i) => {
    if (lattice.interior[u] !== 1 || lattice.water[u] !== 0) return;
    if (opts.mask !== undefined && opts.mask[u] !== 1) return;
    const key = u * lattice.points.length + v;
    if (seen.has(key)) return;
    seen.add(key);
    const at = set.contour[i];
    cands.push({ u, v, at, bearing: bearingCdeg(at.x - centre.x, at.y - centre.y) });
  });
  cands.sort((a, b) => a.u - b.u || a.v - b.v);
  const taken: number[] = crossings.map((c) => c.bearingCdeg);
  const picks: MainRoadPick[] = [];
  const used = new Set<number>();
  for (let k = 0; k < want; k += 1) {
    const scored: { c: number; score: number }[] = [];
    for (let c = 0; c < cands.length; c += 1) {
      const u = stream.float01();
      let gap = 1;
      if (taken.length > 0) {
        let g = 18_000;
        for (const b of taken) g = Math.min(g, angularGap(cands[c].bearing, b));
        gap = g / 18_000;
      }
      let score = gap + PICK_JITTER * u - PICK_SLOPE_WEIGHT * lattice.slope[cands[c].u];
      if (used.has(c)) score = -Infinity;
      scored.push({ c, score });
    }
    scored.sort((a, b) => b.score - a.score || cands[a.c].u - cands[b.c].u || cands[a.c].v - cands[b.c].v);
    if (scored.length === 0 || scored[0].score === -Infinity) break;
    const best = cands[scored[0].c];
    used.add(scored[0].c);
    taken.push(best.bearing);
    const ranked = scored.slice(0, PICK_RANKED).filter((s) => s.score > -Infinity).map((s) => cands[s.c].u);
    picks.push({ ordinal: k, at: best.at, edge: [best.u, best.v], bearingCdeg: best.bearing, ranked });
  }
  return picks;
}

// ---- the growth state -----------------------------------------------------------------------------------------------------

/** A main road S5b laid. */
export interface MainRoad {
  readonly way: Way;
  readonly stage: number;
  readonly pick: MainRoadPick;
  /** The lattice course (the start node … the destination's edge … the rim node): T's new road edges. */
  readonly nodes: readonly number[];
  /** The polyline as inserted: the junction vertex, the smoothed course through the destination, the frame point. */
  readonly points: readonly LatticePoint[];
  /** The existing way it leaves and the junction there; the junction at its frame end. */
  readonly from: { readonly way: Id; readonly junction: Id; readonly at: LatticePoint };
  readonly end: Id;
  /** 0: smoothed; 1: simplified; 2: the lattice course (each a fallback when the smoother one failed validation). */
  readonly level: 0 | 1 | 2;
}

/** A destination S5b could not serve (reported; F-ROUTE's `unserved`). */
export interface Unserved {
  readonly stage: number;
  readonly pick: number;
  readonly why: 'no_source' | 'inner' | 'outer' | 'invalid';
  /** For `invalid`: each level's fault (smoothed, simplified, lattice). */
  readonly faults?: readonly RoadFault[];
}

/** One growth stage's S5a / S5b record. */
export interface GrowthStage {
  readonly k: number;
  readonly regime: string;
  readonly walled: boolean;
  /** The boundary (its outline with the destinations kept); null for a folded stage. */
  boundary: StageBoundary | null;
  /** A capped stage that adds no land: folded into this earlier stage (reported). */
  foldedInto: number | null;
  /** N_k and its rule (stage 1: S3's N). */
  count: MainRoadCount;
  /** The crossings of the existing ways with the stage's boundary before S5b (c). */
  crossings: BoundaryCrossing[];
  picks: MainRoadPick[];
  roads: MainRoad[];
  unserved: Unserved[];
  /** The nodes the stage's new roads lowered T at. */
  lowered: number;
  /** The trace (walled stages; stage 1: S3's). */
  trace: StageTraceResult | null;
  /** The stage's gates (walled): one per crossing of the final boundary, the spawned roads' among them. */
  gates: Gate[];
  /** The stage's wall line (walled; stage 1: S3's trace). */
  wall: readonly LatticePoint[] | null;
}

/** The S5 state between the sub-steps: T as it stands, the enclosure, the network and the stages so far. */
export interface GrowthState {
  readonly slice: S3Slice;
  readonly kernel: Kernel;
  readonly key: PlatKey;
  readonly water: WaterSet;
  readonly plaza: Reservation;
  readonly rg: RouteGraph;
  readonly pull?: WaterPull;
  /** T as it stands (S3's, re-settled after each S5b). */
  field: Field;
  /** The enclosure of the last stage that holds land (its selected nodes). */
  enclosure: Uint8Array;
  lastWithLand: number;
  ways: Way[];
  junctions: Junction[];
  stages: GrowthStage[];
  nextGateOrdinal: number;
  /** The quota moved by folded stages into each stage (ha), index k − 1. */
  folded: number[];
  report: { work: { 'route.nodes': number }; rungs: RouteRung[] };
}

/** The input S5 starts from: the S3 slice, its commits (stage 1's trace among them), S4's output, the façade. */
export interface GrowthInput {
  readonly slice: S3Slice;
  readonly commit: S3Commit;
  readonly s4: S4Output;
  readonly kernel: Kernel;
  readonly water?: WaterSet;
  readonly key?: PlatKey;
  /** The water pull S3's field was computed with (absent: none). */
  readonly pull?: WaterPull;
}

/** The terrain's height at each lattice node (cm). */
function heightsOf(slice: S3Slice): Float64Array {
  const site = slice.site;
  const s = terrainSampler(site.terrain, site.tables.table('terrain').num('settings', 'slopeQueryM') * 100);
  const pts = slice.lattice.points;
  const out = new Float64Array(pts.length);
  for (let i = 0; i < pts.length; i += 1) out[i] = s.heightAt(pts[i]);
  return out;
}

/**
 * The growth state at the end of stage 1 (§4.4: stage 1 commits S3's boundary, gates and trace): T S3's field, the
 * enclosure S3's selection, the network S4's.
 */
export function growthStart(input: GrowthInput): GrowthState {
  const slice = input.slice;
  const site = slice.site;
  const b1: StageBoundary = {
    k: 1,
    source: slice.field,
    field: slice.field,
    threshold: slice.threshold,
    set: slice.levelSet,
    askedCm2: site.land.stagesHa[0] * HA_CM2,
    landCm2: slice.threshold.landCm2,
    enclosureCm2: 0,
    addedCm2: slice.threshold.landCm2,
    capped: slice.threshold.capped,
    shortfallCm2: slice.threshold.shortfallCm2,
    folded: false,
  };
  let maxOrdinal = -1;
  for (const g of slice.gates) maxOrdinal = Math.max(maxOrdinal, g.ordinal);
  const stage1: GrowthStage = {
    k: 1,
    regime: site.land.regimes[0],
    walled: stageWalled(site, 1),
    boundary: b1,
    foldedInto: null,
    count: { n: slice.n, walled: stageWalled(site, 1), rule: 'gateLaw' },
    crossings: [],
    picks: [],
    roads: [],
    unserved: [],
    lowered: 0,
    trace: null,
    gates: input.s4.gates.slice(),
    wall: input.commit.traced.line,
  };
  return {
    slice,
    kernel: input.kernel,
    key: input.key ?? GROUND,
    water: input.water ?? { bodies: [], bridges: [] },
    plaza: input.commit.plaza,
    rg: routeGraph(slice.lattice, heightsOf(slice)),
    ...(input.pull === undefined ? {} : { pull: input.pull }),
    field: slice.field,
    enclosure: slice.levelSet.selected,
    lastWithLand: 1,
    ways: input.s4.network.ways.slice(),
    junctions: input.s4.network.junctions.slice(),
    stages: [stage1],
    nextGateOrdinal: maxOrdinal + 1,
    folded: site.land.stagesHa.map(() => 0),
    report: { work: { 'route.nodes': 0 }, rungs: [] },
  };
}

// ---- routing --------------------------------------------------------------------------------------------------------------

/** The latest wall line standing (the previous enceinte's), or null when no stage is walled. */
function lastWall(state: GrowthState): readonly LatticePoint[] | null {
  for (let i = state.stages.length - 1; i >= 0; i -= 1) {
    const w = state.stages[i].wall;
    if (w !== null) return w;
  }
  return null;
}

/** Every wall line standing. */
function walls(state: GrowthState): (readonly LatticePoint[])[] {
  const out: (readonly LatticePoint[])[] = [];
  for (const s of state.stages) if (s.wall !== null) out.push(s.wall);
  return out;
}

/**
 * The stage's ring (C-S5AB): the boundary's selected interior dry nodes (an unwalled stage's: any interior dry node)
 * outside the previous enclosure, outside the previous wall and farther from it than its outer strip and the road's
 * half-width (never through an inner wall).
 */
export function ringMask(state: GrowthState, boundary: StageBoundary, walled = true): Uint8Array {
  const lattice = state.slice.lattice;
  const site = state.slice.site;
  const sel = boundary.set.selected;
  const wall = lastWall(state);
  const strips = stripWidths(site.tables.table('walls').row('era.default'));
  const clear = strips.outer + widthBandCm(site.tables, 'primary', site.rung)[1] * 0.5;
  let box: [number, number, number, number] | null = null;
  if (wall !== null) {
    const b = boxOf(wall);
    box = [b[0] - clear, b[1] - clear, b[2] + clear, b[3] + clear];
  }
  const out = new Uint8Array(sel.length);
  for (let i = 0; i < sel.length; i += 1) {
    if ((walled && sel[i] !== 1) || state.enclosure[i] === 1 || lattice.interior[i] !== 1 || lattice.water[i] !== 0) continue;
    const p = lattice.points[i];
    if (wall !== null && box !== null && p.x >= box[0] && p.x <= box[2] && p.y >= box[1] && p.y <= box[3] && (insideRing(wall, p, true) || distToRing(p, wall) <= clear)) continue;
    out[i] = 1;
  }
  return out;
}

/** The rim node nearest where the ray from p at the compass bearing leaves the frame (S3's "to the frame at its bearing"). */
function rimAtBearing(lattice: Lattice, p: XY, bearing: number): number {
  const th = (9_000 - bearing) * quot(PI, 18_000, 'count', 'cdeg');
  const f = lattice.frame;
  const dx = dmath.cos(th);
  const dy = dmath.sin(th);
  let px = p.x;
  let py = p.y;
  while (px > f.minX && px < f.maxX && py > f.minY && py < f.maxY) {
    px += dx * lattice.spacingCm;
    py += dy * lattice.spacingCm;
  }
  let best = -1;
  let bestD = Infinity;
  for (let i = 0; i < lattice.points.length; i += 1) {
    if (lattice.rim[i] !== 1) continue;
    const q = lattice.points[i];
    const d = (q.x - px) * (q.x - px) + (q.y - py) * (q.y - py);
    if (d < bestD) {
      best = i;
      bestD = d;
    }
  }
  return best;
}

/** The lattice node nearest each point within one spacing whose mask is set (a bucket grid of one spacing), or −1. */
function nodesNear(lattice: Lattice, mask: Uint8Array, points: readonly XY[]): number[] {
  const s = lattice.spacingCm;
  const f = lattice.frame;
  const cols = Math.ceil(quot(f.maxX - f.minX, s, 'length', 'grid')) + 1;
  const cell = (x: number, y: number): number => Math.floor(quot(y - f.minY, s, 'length', 'grid')) * cols + Math.floor(quot(x - f.minX, s, 'length', 'grid'));
  const buckets = new Map<number, number[]>();
  for (let i = 0; i < lattice.points.length; i += 1) {
    if (mask[i] !== 1) continue;
    const q = lattice.points[i];
    const c = cell(q.x, q.y);
    const l = buckets.get(c);
    if (l === undefined) buckets.set(c, [i]);
    else l.push(i);
  }
  return points.map((p) => {
    const cx = Math.floor(quot(p.x - f.minX, s, 'length', 'grid'));
    const cy = Math.floor(quot(p.y - f.minY, s, 'length', 'grid'));
    let best = -1;
    let bestD = s * s;
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        for (const i of buckets.get((cy + dy) * cols + (cx + dx)) ?? []) {
          const q = lattice.points[i];
          const d = (q.x - p.x) * (q.x - p.x) + (q.y - p.y) * (q.y - p.y);
          if (d < bestD || (d === bestD && i < best)) {
            best = i;
            bestD = d;
          }
        }
      }
    }
    return best;
  });
}

/** The junction vertices standing (every Junction's vertex, resolved): a road never starts on one (C-S5AB). */
function junctionPoints(state: GrowthState): Set<string> {
  const p = state.kernel.plat(state.key);
  const out = new Set<string>();
  for (const j of state.junctions) {
    const r = state.kernel.resolve(j.vertex, state.key);
    if (r.view === 'vertices') for (const v of r.vertices) out.add(`${String(p.vertices.x[v])},${String(p.vertices.y[v])}`);
  }
  for (const s of state.stages) {
    for (const g of s.gates) {
      const r = state.kernel.resolve({ role: 'gate', entity: g.id }, state.key);
      if (r.view === 'vertices') for (const v of r.vertices) out.add(`${String(p.vertices.x[v])},${String(p.vertices.y[v])}`);
    }
  }
  return out;
}

/** The route.nodes limit of one S5b search (§5.1 (5): the workLimits law over the lattice's nodes, S5's scope). */
function routeNodesLimit(lattice: Lattice): number {
  return workLimitOf(loadWorkLimits().law('route.nodes'), { kind: 'stage', stage: STAGES.S5 }, { latticeNodes: lattice.points.length });
}

type Seg = readonly [XY, XY];

function segsOf(pts: readonly XY[], closed: boolean): Seg[] {
  const out: Seg[] = [];
  for (let i = 0; i + 1 < pts.length; i += 1) out.push([pts[i], pts[i + 1]]);
  if (closed && pts.length > 2) out.push([pts[pts.length - 1], pts[0]]);
  return out;
}

function boxOf(pts: readonly XY[]): [number, number, number, number] {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const p of pts) {
    x0 = Math.min(x0, p.x);
    y0 = Math.min(y0, p.y);
    x1 = Math.max(x1, p.x);
    y1 = Math.max(y1, p.y);
  }
  return [x0, y0, x1, y1];
}

function segBoxMeets(s: Seg, b: readonly number[]): boolean {
  return !(Math.max(s[0].x, s[1].x) < b[0] || Math.min(s[0].x, s[1].x) > b[2] || Math.max(s[0].y, s[1].y) < b[1] || Math.min(s[0].y, s[1].y) > b[3]);
}

const same = (a: XY, b: XY): boolean => a.x === b.x && a.y === b.y;

/** Why a road's polyline fails the rules: its first point, an obstacle, a standing way, the outline. */
export type RoadFault = 'start' | 'obstacle' | 'way' | 'outline';

/**
 * Why a road's polyline does not keep the rules (C-S5AB), or null when it does: It meets no wall, the plaza and the water nowhere, no standing way but
 * at its first point (the junction, by its first segment only), no earlier road of the batch at all, and crosses the
 * stage's outline exactly once, at its destination.
 */
function roadFault(pts: readonly LatticePoint[], start: LatticePoint, dest: LatticePoint, obstacles: readonly Seg[], ways: readonly Seg[], outline: readonly XY[] | null): RoadFault | null {
  if (pts.length < 2 || !same(pts[0], start)) return 'start';
  const box = boxOf(pts);
  const near = (s: Seg): boolean => segBoxMeets(s, [box[0] - 1, box[1] - 1, box[2] + 1, box[3] + 1]);
  const obs = obstacles.filter(near);
  const ws = ways.filter(near);
  for (let i = 0; i + 1 < pts.length; i += 1) {
    const a = pts[i];
    const b = pts[i + 1];
    for (const s of obs) if (segmentsMeet(a, b, s[0], s[1])) return 'obstacle';
    for (const s of ws) {
      if (!segmentsMeet(a, b, s[0], s[1])) continue;
      // The first segment leaves its junction, a vertex of its way: it may touch the way's sides at that vertex only
      // (two segments sharing an end meet elsewhere only when they overlap).
      if (i === 0 && (same(s[0], start) || same(s[1], start))) {
        const other = same(s[0], start) ? s[1] : s[0];
        if (!onSeg(b, s) && !onSeg(other, [a, b])) continue;
      }
      return 'way';
    }
  }
  // Exactly one crossing of the outline, at the destination (a walled stage's: its crossings are its gates).
  if (outline === null) return null;
  const lines: WayLine[] = [{ way: '', runs: [{ points: pts, halfEdges: pts.slice(1).map(() => 0) }] }];
  const xs = boundaryCrossings(outline, lines, { x: 0, y: 0 });
  return xs.length === 1 && xs[0].at.x === dest.x && xs[0].at.y === dest.y ? null : 'outline';
}

/** Does p lie on the segment s (exactly)? */
function onSeg(p: XY, s: Seg): boolean {
  return segmentsMeet(p, p, s[0], s[1]);
}

/** A road course before its batch: the lattice course, the polyline taken (its level), the junction it leaves. */
interface Course {
  readonly pick: MainRoadPick;
  readonly nodes: number[];
  readonly points: LatticePoint[];
  readonly level: 0 | 1 | 2;
  readonly from: { way: Id; at: LatticePoint };
}

/** A bucket grid of the lattice's nodes, one spacing per cell. */
interface NodeGrid {
  readonly cols: number;
  readonly buckets: Map<number, number[]>;
  cellOf(x: number, y: number): [number, number];
}

function nodeGrid(lattice: Lattice): NodeGrid {
  const s = lattice.spacingCm;
  const f = lattice.frame;
  const cols = Math.ceil(quot(f.maxX - f.minX, s, 'length', 'grid')) + 1;
  const cellOf = (x: number, y: number): [number, number] => [Math.floor(quot(x - f.minX, s, 'length', 'grid')), Math.floor(quot(y - f.minY, s, 'length', 'grid'))];
  const buckets = new Map<number, number[]>();
  for (let i = 0; i < lattice.points.length; i += 1) {
    const q = lattice.points[i];
    const [cx, cy] = cellOf(q.x, q.y);
    const key = cy * cols + cx;
    const l = buckets.get(key);
    if (l === undefined) buckets.set(key, [i]);
    else l.push(i);
  }
  return { cols, buckets, cellOf };
}

/** Every lattice edge that meets one of the segments made impassable in `weights` (S5b's roads never cross a way). */
function blockEdges(weights: Float64Array, lattice: Lattice, grid: NodeGrid, segs: readonly Seg[]): void {
  const g = lattice.graph;
  const pts = lattice.points;
  for (const sg of segs) {
    const [x0, y0] = grid.cellOf(Math.min(sg[0].x, sg[1].x), Math.min(sg[0].y, sg[1].y));
    const [x1, y1] = grid.cellOf(Math.max(sg[0].x, sg[1].x), Math.max(sg[0].y, sg[1].y));
    for (let cy = y0 - 1; cy <= y1 + 1; cy += 1) {
      for (let cx = x0 - 1; cx <= x1 + 1; cx += 1) {
        for (const u of grid.buckets.get(cy * grid.cols + cx) ?? []) {
          for (let e = g.offsets[u]; e < g.offsets[u + 1]; e += 1) {
            if (weights[e] === Infinity) continue;
            if (segmentsMeet(pts[u], pts[g.targets[e]], sg[0], sg[1])) weights[e] = Infinity;
          }
        }
      }
    }
  }
}

/**
 * Each pick's course (S5b; see the header), in pick order: the search from every lattice node beside a standing way
 * vertex in the stage's ring (the way's vertices that are no junction or gate) to the destination's inside node within
 * the ring, then from its outside node to the rim at the radial bearing outside the stage, every lattice edge that meets
 * a standing way or an earlier road of the batch impassable; the polyline from the way vertex through the destination
 * to the frame, smoothed as S4 smooths (simplify, Chaikin, the curvature limit; the junction, the destination and the
 * nodes within `WAY_SPAN_NODES` of it held), taking its smoothest level that keeps the rules (`roadFault`; the simplified
 * and the lattice courses the fallbacks), else left out, reported `invalid`. An unwalled stage's road may leave the ring
 * on its way to the destination (no wall, so no gate count to keep; C-S5AB).
 */
function courses(state: GrowthState, k: number, boundary: StageBoundary, walled: boolean, picks: readonly MainRoadPick[], lines: readonly WayLine[], unserved: Unserved[]): Course[] {
  const slice = state.slice;
  const site = slice.site;
  const lattice = slice.lattice;
  const mask = ringMask(state, boundary, walled);
  const outside = new Uint8Array(mask.length);
  for (let i = 0; i < outside.length; i += 1) outside[i] = boundary.set.selected[i] === 1 ? 0 : 1;
  // The candidate junction vertices: every standing way vertex in the ring that is no junction or gate vertex.
  const taken = junctionPoints(state);
  const cand: { way: Id; at: LatticePoint }[] = [];
  for (const line of lines) {
    for (const run of line.runs) {
      for (const q of run.points) {
        if (taken.has(`${String(q.x)},${String(q.y)}`)) continue;
        cand.push({ way: line.way, at: q });
      }
    }
  }
  const candNode = nodesNear(lattice, mask, cand.map((c) => c.at));
  const sourceOf = new Map<number, number>();
  candNode.forEach((n, i) => {
    if (n < 0) return;
    const c = cand[i].at;
    const q = lattice.points[n];
    const d = (q.x - c.x) * (q.x - c.x) + (q.y - c.y) * (q.y - c.y);
    const had = sourceOf.get(n);
    if (had === undefined) {
      sourceOf.set(n, i);
      return;
    }
    const h = cand[had].at;
    const dh = (q.x - h.x) * (q.x - h.x) + (q.y - h.y) * (q.y - h.y);
    if (d < dh) sourceOf.set(n, i);
  });
  const sources = [...sourceOf.keys()].sort((a, b) => a - b);
  const limit = routeNodesLimit(lattice);
  const band = site.tables.table('terrain').num('crossing', 'searchBandM') * 100;
  const radius = (c: Parameters<typeof classGeometryCm>[1]): number => classGeometryCm(site.tables, c).minRadiusCm;
  const work = { n: 0 };
  // Decks are not taken by S5b's roads at M0 (the span through a site is S4's; C-S5AB): every deck excluded.
  const excludedDecks = new Set<string>(state.rg.decks.map((d) => d.id));
  const chaikinPasses = site.tables.table('ways').num('graph', 'chaikinPasses');
  const minRadius = radius('primary');
  const obstacleRings = [...lattice.costs.water.faces.map((r) => r.slice()), slice.plaza.ring.slice(), ...walls(state).map((w) => w.slice())];
  const obstacles: Seg[] = [...lattice.costs.water.faces.flatMap((r) => segsOf(r, true)), ...segsOf(slice.plaza.ring, true), ...walls(state).flatMap((w) => segsOf(w, true))];
  const standing: Seg[] = lines.flatMap((l) => l.runs.flatMap((r) => segsOf(r.points, false)));
  // The router's graph with every lattice edge across a standing way impassable (then each kept road's, in turn).
  const grid = nodeGrid(lattice);
  const weights = Float64Array.from(lattice.graph.weights);
  blockEdges(weights, lattice, grid, standing);
  const rg: RouteGraph = { ...state.rg, lattice: { ...lattice, graph: { ...lattice.graph, weights } } };
  const outline = walled ? boundary.set.outline : null;
  const out: Course[] = [];
  for (const pick of picks) {
    const name = `s5b:${String(k)}/${String(pick.ordinal)}`;
    if (sources.length === 0) {
      unserved.push({ stage: k, pick: pick.ordinal, why: 'no_source' });
      continue;
    }
    const [u, v] = pick.edge;
    const inner = routeLadder(rg, sources, [u], { class: 'primary', radiusCm: radius, searchBandCm: band, route: `${name}/in`, mask, nodeLimit: limit, excludedDecks }, state.report.rungs, work);
    if (!inner.ok || inner.value === null) {
      unserved.push({ stage: k, pick: pick.ordinal, why: 'inner' });
      continue;
    }
    const rim = rimAtBearing(lattice, pick.at, pick.bearingCdeg);
    const outer = routeLadder(rg, [v], [rim], { class: 'primary', radiusCm: radius, searchBandCm: band, route: `${name}/out`, mask: outside, nodeLimit: limit, excludedDecks }, state.report.rungs, work);
    if (!outer.ok || outer.value === null) {
      unserved.push({ stage: k, pick: pick.ordinal, why: 'outer' });
      continue;
    }
    const inNodes = inner.value.nodes;
    const outNodes = outer.value.nodes;
    const from = cand[sourceOf.get(inNodes[0]) as number];
    const pts = lattice.points;
    // The polyline: the way vertex in place of the course's first node (the node beside it), the rest of the inner
    // course, the destination, the outer course, the frame.
    const line: LatticePoint[] = [from.at];
    const held: boolean[] = [true];
    for (let i = inNodes.length > 1 ? 1 : 0; i < inNodes.length; i += 1) {
      line.push(pts[inNodes[i]]);
      held.push(inNodes.length - 1 - i < WAY_SPAN_NODES);
    }
    line.push(pick.at);
    held.push(true);
    for (let i = 0; i < outNodes.length; i += 1) {
      line.push(pts[outNodes[i]]);
      held.push(i < WAY_SPAN_NODES);
    }
    const last = line[line.length - 1];
    const prev = line[line.length - 2];
    const d = unitOf({ x: last.x - prev.x, y: last.y - prev.y });
    const f = d === null ? null : toFrame(last, d, site.frameRing);
    if (f !== null && (Math.abs(f.x - last.x) >= 100 || Math.abs(f.y - last.y) >= 100)) {
      line.push({ x: Math.round(f.x), y: Math.round(f.y) } as LatticePoint);
      held.push(true);
    }
    // Consecutive duplicates dropped (the junction vertex may stand on its node).
    const lat0: LatticePoint[] = [];
    const held0: boolean[] = [];
    line.forEach((p, i) => {
      if (lat0.length > 0 && same(lat0[lat0.length - 1], p)) return;
      lat0.push(p);
      held0.push(held[i]);
    });
    const sm = simplifyChain(lat0, held0, { minSegmentCm: lattice.spacingCm, obstacles: obstacleRings });
    const fin = finishChain(sm, { chaikinPasses, minRadiusCm: minRadius });
    const levels = [fin.points, sm.points, lat0];
    const ways = [...standing, ...out.flatMap((x) => segsOf(x.points, false))];
    let chosen = -1;
    const faults: RoadFault[] = [];
    for (let l = 0; l < 3 && chosen < 0; l += 1) {
      const fault = roadFault(levels[l], from.at, pick.at, obstacles, ways, outline);
      if (fault === null) chosen = l;
      else faults.push(fault);
    }
    if (chosen < 0) {
      unserved.push({ stage: k, pick: pick.ordinal, why: 'invalid', faults });
      continue;
    }
    const points = levels[chosen].slice();
    out.push({ pick, nodes: [...inNodes, ...outNodes], points, level: chosen as 0 | 1 | 2, from });
    blockEdges(weights, lattice, grid, segsOf(points, false));
  }
  state.report.work['route.nodes'] += work.n;
  return out;
}

/** The S5b batch's work limit (§5.1 (5)): the insert counters' laws over the batch, S5's scope. */
export function s5bWorkLimit(vertices: number, faces: number): number {
  const t = loadWorkLimits();
  let sum = 0;
  for (const c of S4_COUNTERS) sum += workLimitOf(t.law(c), { kind: 'stage', stage: STAGES.S5 }, { vertices, faces });
  return sum;
}

/**
 * S5b's L1 batch (§4.1's S5 row: "S5b L1: the main roads"): one declared batch, one mandatory `insertChain` per road
 * carrying its way's `way` row, the junction it leaves (`T`, on the standing way's vertex) and its frame end (`end`)
 * each a ('junction', id, 0) row.
 */
function commitRoads(state: GrowthState, k: number, kept: readonly Course[]): KernelResult<MainRoad[]> {
  const slice = state.slice;
  const site = slice.site;
  if (kept.length === 0) return ok([]);
  const width = widthBandCm(site.tables, 'primary', site.rung)[0];
  let wayN = 0;
  let jN = 0;
  for (const w of state.ways) wayN = Math.max(wayN, idNumber(w.id, 'way:') + 1);
  for (const j of state.junctions) jN = Math.max(jN, idNumber(j.id, 'junction:') + 1);
  const town = lineageHash(TOWN_ROOT);
  const ops: KernelOp[] = [];
  const roads: MainRoad[] = [];
  let vertices = 0;
  kept.forEach((x, i) => {
    const wayId = `way:${String(wayN + i)}`;
    const jFrom = `junction:${String(jN + 2 * i)}`;
    const jEnd = `junction:${String(jN + 2 * i + 1)}`;
    const pts = x.points;
    vertices += pts.length;
    const knots = [
      { index: 0, role: 'junction', ordinal: 0, entity: jFrom },
      { index: pts.length - 1, role: 'junction', ordinal: 0, entity: jEnd },
    ];
    const pinned: number[] = [0, pts.length - 1];
    const di = pts.findIndex((p) => same(p, x.pick.at));
    if (di > 0 && di < pts.length - 1) pinned.push(di);
    const lineage = lineageHash({ arena: state.key, unit: town, stage: STAGES.S5 as StageId, epoch: 0, index: wayN + i, reroll: 0 });
    ops.push(kernelOp('insertChain', lineage, 0, (o) => state.kernel.geom.insertChain(o, pts, [{ role: 'way', entity: wayId }], 'mandatory', { knots, pinned })));
    const end = pts[pts.length - 1];
    const way: Way = {
      id: wayId,
      class: 'primary',
      spine: { role: 'way', entity: wayId },
      width: width as Cm,
      from: { kind: 'junction', id: jFrom },
      to: { kind: 'bearing', bearingCdeg: bearingCdeg(end.x - x.pick.at.x, end.y - x.pick.at.y) as Cdeg },
      growthStage: k,
      epoch: 0,
      provisional: false,
      lifecycle: generated(0),
    };
    roads.push({ way, stage: k, pick: x.pick, nodes: x.nodes, points: pts, from: { way: x.from.way, junction: jFrom, at: x.from.at }, end: jEnd, level: x.level });
  });
  const committed = state.kernel.tx({
    key: state.key,
    level: 1,
    ops,
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: STAGES.S5 as StageId },
    stage: STAGES.S5 as StageId,
    rederivesFrom: STAGES.S5 as StageId,
    workLimit: s5bWorkLimit(vertices, 2 * kept.length + 2),
  });
  if (!committed.ok) return err(committed.code, `S5b: stage ${String(k)}'s main roads were refused: ${committed.detail}`);
  // The destination as the arena placed it (the gate the trace pins there reads the vertex itself).
  const p = state.kernel.plat(state.key);
  const placedRoads = roads.map((r) => {
    const res = state.kernel.resolve({ role: 'way', entity: r.way.id }, state.key);
    if (res.view !== 'edges') return r;
    let best: LatticePoint = r.pick.at;
    let bestD = Infinity;
    for (const run of res.runs) {
      for (const h of run) {
        const q = { x: p.vertices.x[p.halfEdges.origin[h]], y: p.vertices.y[p.halfEdges.origin[h]] } as LatticePoint;
        const d = (q.x - r.pick.at.x) * (q.x - r.pick.at.x) + (q.y - r.pick.at.y) * (q.y - r.pick.at.y);
        if (d < bestD) {
          bestD = d;
          best = q;
        }
      }
    }
    return same(best, r.pick.at) ? r : { ...r, pick: { ...r.pick, at: best } };
  });
  for (const r of placedRoads) {
    state.ways.push(r.way);
    const existing = r.from.way;
    state.junctions.push({ id: r.from.junction, vertex: { role: 'junction', entity: r.from.junction, ordinal: 0 }, arms: [existing, r.way.id].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)), kind: 'T', lifecycle: generated(0) });
    state.junctions.push({ id: r.end, vertex: { role: 'junction', entity: r.end, ordinal: 0 }, arms: [r.way.id], kind: 'end', lifecycle: generated(0) });
  }
  return ok(placedRoads, committed.warnings);
}

/** The number after an id's prefix (`way:12` → 12), −1 when it has another form. */
function idNumber(id: Id, prefix: string): number {
  if (!id.startsWith(prefix)) return -1;
  const n = Number(id.slice(prefix.length));
  return Number.isInteger(n) ? n : -1;
}

// ---- the stage steps ------------------------------------------------------------------------------------------------------

/** The stream S5b's picks draw from outside the pipeline's runner: the town root's `growth.mainroad` under S5. */
export function mainRoadStream(slice: S3Slice): Stream {
  return createRng().stream(slice.site.townKey, STAGES.S5 as StageId, CONCERNS['growth.mainroad'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
}

/**
 * S5a's boundary and S5b for stage k ≥ 2 (see the header): the stage's record appended to `state` (its boundary with the
 * destinations kept, its crossings, picks, roads and the unserved), T re-settled by the new roads. A folded stage is
 * recorded with its quota moved to the last stage with land. Refused with the kernel's code when S5b's batch is.
 */
export function mainRoadsStep(state: GrowthState, k: number, stream: Stream): KernelResult<GrowthStage> {
  const site = state.slice.site;
  const K = site.land.stagesHa.length;
  if (!(Number.isInteger(k) && k >= 2 && k <= K)) throw new RangeError(`mainRoadsStep: k is a stage 2 … ${String(K)}, got ${String(k)}`);
  if (state.stages.length !== k - 1) throw new RangeError(`mainRoadsStep: stage ${String(k)} follows stage ${String(state.stages.length)}`);
  const walled = stageWalled(site, k);
  const b0 = stageBoundary(state.field, k, site.land, { enclosure: state.enclosure });
  const rec: GrowthStage = {
    k,
    regime: site.land.regimes[k - 1],
    walled,
    boundary: b0,
    foldedInto: null,
    count: { n: 0, walled, rule: walled ? 'gateLaw' : 'spacing' },
    crossings: [],
    picks: [],
    roads: [],
    unserved: [],
    lowered: 0,
    trace: null,
    gates: [],
    wall: null,
  };
  if (b0.folded) {
    rec.boundary = null;
    rec.foldedInto = state.lastWithLand;
    state.folded[state.lastWithLand - 1] += site.land.stagesHa[k - 1];
    state.stages.push(rec);
    return ok(rec);
  }
  const centre = site.centre;
  const lines = wayLines(state.kernel, state.ways.map((w) => w.id), state.key);
  const c0 = boundaryCrossings(b0.set.outline, lines, centre);
  rec.crossings = c0;
  rec.count = mainRoadCount(site, k, b0);
  const mask = ringMask(state, b0, walled);
  const picks = spawnPrimaries(b0, rec.count.n, c0, stream, { centre, mask });
  rec.picks = picks;
  // The boundary with the destinations kept as outline vertices (the selection unchanged).
  const b1 = picks.length === 0 ? b0 : withPins(b0, picks.map((p) => p.at));
  rec.boundary = b1;
  const cs = courses(state, k, b1, walled, picks, lines, rec.unserved);
  const committed = commitRoads(state, k, cs);
  if (!committed.ok) return err(committed.code, committed.detail);
  rec.roads = committed.value;
  if (rec.roads.length > 0) {
    const r = resettleT(state.field, rec.roads, state.pull === undefined ? {} : { pull: state.pull });
    state.field = r.field;
    rec.lowered = r.lowered.length;
  }
  state.stages.push(rec);
  return ok(rec, committed.warnings);
}

/**
 * S5a's trace for stage k (§4.4 S5a *Trace*): k = 1 — S3's trace, already committed with S3's batch (`commitS3Slice`),
 * read unchanged; k ≥ 2 walled — every crossing of the stage's boundary (S5b's roads among them) a gate, traced by the
 * strategy (`traceStage`); unwalled — no trace. The stage's selection becomes the enclosure the next stage reads.
 */
export function traceStep(state: GrowthState, k: number): KernelResult<GrowthStage> {
  const rec = state.stages[k - 1];
  if (rec === undefined || rec.k !== k) throw new RangeError(`traceStep: stage ${String(k)} has no S5b record`);
  if (k === 1 || rec.boundary === null) return ok(rec);
  const site = state.slice.site;
  const b = rec.boundary;
  if (rec.walled) {
    const lines = wayLines(state.kernel, state.ways.map((w) => w.id), state.key);
    const xs = boundaryCrossings(b.set.outline, lines, site.centre);
    const prev = lastWall(state);
    if (prev === null) return err('E_INVARIANT', `S5a: stage ${String(k)} is walled with no earlier enceinte standing`);
    let earlierWater = 0;
    for (const s of state.stages) if (s.trace !== null) earlierWater += s.trace.waterGates.length;
    const t = traceStage(k, b.set.outline, xs, state.slice, state.plaza, prev, state.kernel, { key: state.key, water: state.water, firstOrdinal: state.nextGateOrdinal, earlierWaterGates: earlierWater });
    if (!t.ok) return err(t.code, t.detail);
    rec.trace = t.value;
    rec.gates = t.value.gates.slice();
    rec.wall = t.value.traced.line;
    state.nextGateOrdinal += xs.length;
  }
  state.enclosure = b.set.selected;
  state.lastWithLand = k;
  return ok(rec);
}

/** S5a and S5b for every stage k = 1 … K in order (no S5c / S5d: M0-c-05's run between them). */
export function runS5ab(input: GrowthInput, stream?: Stream): KernelResult<GrowthState> {
  const state = growthStart(input);
  const s = stream ?? mainRoadStream(input.slice);
  const K = input.slice.site.land.stagesHa.length;
  const warnings: Warning[] = [];
  for (let k = 2; k <= K; k += 1) {
    const m = mainRoadsStep(state, k, s);
    if (!m.ok) return err(m.code, m.detail);
    warnings.push(...m.warnings);
    const t = traceStep(state, k);
    if (!t.ok) return err(t.code, t.detail);
    warnings.push(...t.warnings);
  }
  return ok(state, warnings);
}

// ---- the Stage declarations -----------------------------------------------------------------------------------------------

/** §12.4's S5 row (40 ms at CITY): reported only; the other rungs report against it until their rows (M1). */
const BUDGET_MS: Record<Rung, number> = { TOWN: 40, CITY: 40, METROPOLIS: 40, THORP: 40, HAMLET: 40, VILLAGE: 40 };

/** The laws of the counters S5a and S5b charge: route.nodes and the insert counters of their batches. */
function laws(): WorkLimitLaw[] {
  const t = loadWorkLimits();
  return ['route.nodes', ...S4_COUNTERS].map((c) => {
    const law = t.law(c);
    if (law.unit === 'fixed') throw new RangeError(`S5: the counter ${c} has a fixed law; its declaration needs a unit`);
    return { ...law };
  });
}

/** What S5a's and S5b's Stage reads: the growth state (`growthStart`'s, then each step's). */
export interface S5Input {
  readonly growth: GrowthState;
}

function inputsOf(model: unknown, _scope: Scope): S5Input {
  const m = model as Partial<S5Input> | null | undefined;
  if (m === null || m === undefined || m.growth === undefined) throw new TypeError('S5: the model hands S5 its growth state (growthStart over the S3 slice, its commits and S4)');
  return m as S5Input;
}

/**
 * S5b as §14's Stage for stage k (declared form; F-ROUTE its ladder): S5a's boundary and the main roads, its picks from
 * the town root's `growth.mainroad` stream. Registered with S5a, S5c and S5d under the one S5 id by M0-x-04 (§4.1: each
 * stage k runs S5a – S5d in order; C-S5AB).
 */
export function s5bStage(k: number): Stage<S5Input, GrowthStage, EnceinteEnv> {
  return Object.freeze({
    id: STAGES.S5 as StageId,
    version: '1',
    inputs: ['s5.growth'],
    outputs: ['s5.growth', 'ways', 'junctions'],
    streamKeys: ['growth.mainroad'],
    invariants: [],
    ladder: [{ failureClass: 'F-ROUTE', rungs: ['another_site', 'extra_bridge', 'slope', 'unserved'] }],
    workLimits: laws(),
    budgetMs: BUDGET_MS,
    batch: { kind: 'stage' as const, stage: STAGES.S5 as StageId },
    lineageUnit: 'town',
    lazy: false,
    txForm: 'declared' as const,
    inputsOf,
    run(input: S5Input, ctx: StageContext<EnceinteEnv>): KernelResult<GrowthStage> {
      const concern = CONCERNS['growth.mainroad'];
      return mainRoadsStep(input.growth, k, ctx.stream(concern, TOWN_HANDLE, ctx.streamOpts(concern, TOWN_HANDLE)));
    },
  });
}

/** S5a as §14's Stage for stage k (declared form; F-WALL its ladder): stage 1's trace S3's, k ≥ 2 the strategy's. */
export function s5aStage(k: number): Stage<S5Input, GrowthStage, EnceinteEnv> {
  return Object.freeze({
    id: STAGES.S5 as StageId,
    version: '1',
    inputs: ['s5.growth'],
    outputs: ['s5.growth', 'enceintes', 'gates'],
    streamKeys: [] as string[],
    invariants: [],
    ladder: [{ failureClass: 'F-WALL', rungs: ['reoffset', 'union_simplify'] }],
    workLimits: laws(),
    budgetMs: BUDGET_MS,
    batch: { kind: 'stage' as const, stage: STAGES.S5 as StageId },
    lineageUnit: 'town',
    lazy: false,
    txForm: 'declared' as const,
    inputsOf,
    run(input: S5Input, _ctx: StageContext<EnceinteEnv>): KernelResult<GrowthStage> {
      return traceStep(input.growth, k);
    },
  });
}
