// S5a for every growth stage k (M0-c-04; §4.4 S5a *Boundary* and *Trace*, §4.2 S3 (6), (7), (9), §4.1's S5 batch row;
// C-0017, C-0032, C-0033, C-0087; readings C-S5AB):
// * the boundary of stage k is a level set of the one field T as it stands when stage k begins: t_k by accumulated cell
//   areas so that the land of {T ≤ t_k} ∪ the enclosure of stage k − 1 equals the land of stages 1 … k (exact to one
//   cell; the union read as T held at 0 on the enclosure's nodes, so S3's threshold and level set run on it unchanged),
//   capped at the reachable land inside the frame as S3 (6) caps t₁ (the shortfall the stage's, reported), its outer
//   contour by C-0017's marching triangles, simplified and Chaikin-smoothed as S3's (M0-c-01's `levelSet`); a capped
//   stage that adds no land to stage k − 1's is folded into the last stage that holds land, its quota with it;
// * stage 1's boundary is S3's contour and S5a commits S3's trace for it unchanged, through the registered strategy and
//   the strip stand-in exactly as M0-c-02's `commitS3Slice` lays them (`traceStage1`);
// * T is one field, re-settled incrementally after each S5b at the nodes the new roads lower (`resettleT`): never a
//   new field per stage (SCL-3);
// * for k ≥ 2 the trace is the strategy's, right after S5b, every arterial crossing of the stage's boundary on ground
//   part 0 pinned as a gate: each crossing's vertex is split onto its way first (one L1 callback batch), so the wall
//   chain meets the way exactly at its gate vertex, then the trace (with the previous enceinte as its core) and the
//   strip stand-in (C-0033), its stops read from the arena at the gates.
import { BinaryHeap, CONCERNS, err, ok, STAGES, type HalfEdgeId, type Kernel, type KernelResult, type LatticePoint, type PlatKey, type StageId } from '@plat/kernel';
import type { ChainRef, Enceinte, Gate, GateSite, Id, Reservation, WaterSet } from '@plat/model';
import { commitS3Batch, PLAZA_ID, siteContext, WAY_SPAN_NODES, type S3Batch, type S3Commit } from '../enceinte/commit.js';
import { crossParams, lat, unitOf } from '../enceinte/plane.js';
import { layStrips, toFrame } from '../enceinte/strips.js';
import { baseEnceinte, l1Spec } from '../enceinte/trace.js';
import type { CostField, StripsLaid, StripStop, Traced, WaterGate, XY } from '../enceinte/types.js';
import { GROUND, waterGates, waterRings } from '../enceinte/water.js';
import { stageThreshold, type WaterPull } from '../siting/field.js';
import { area2Of, bearingCdeg, perimeterOf, quot } from '../siting/geom.js';
import { levelSet } from '../siting/levelset.js';
import type { Field, LevelSet, S3Slice, Threshold } from '../siting/types.js';

/** One hectare in cm². */
export const HA_CM2 = 100_000_000;

/** The stage lands S2 gives (the fixture's, C-0016): stage k's land is `stagesHa[k − 1]`. */
export interface StageQuotas {
  readonly stagesHa: readonly number[];
}

/** The land (cm²) of a node set: its interior, dry nodes' cells (the measure S3's threshold accumulates). */
export function landOf(field: Pick<Field, 'lattice'>, selected: Uint8Array): number {
  const { interior, water, cellAreaCm2 } = field.lattice;
  let n = 0;
  for (let i = 0; i < selected.length; i += 1) if (selected[i] === 1 && interior[i] === 1 && water[i] === 0) n += 1;
  return n * cellAreaCm2;
}

/**
 * The field the stage's threshold reads (§4.4 S5a): T with the enclosure of stage k − 1 held at 0, so that
 * {T' ≤ t} = {T ≤ t} ∪ enclosure for every t ≥ 0 and the land nodes sort with the enclosure first. `enclosure` null:
 * T itself (stage 1).
 */
export function unionField(T: Field, enclosure: Uint8Array | null): Field {
  if (enclosure === null) return T;
  if (enclosure.length !== T.T.length) throw new RangeError(`unionField: the enclosure has ${String(enclosure.length)} nodes, the field ${String(T.T.length)}`);
  const t = Float64Array.from(T.T);
  for (let i = 0; i < t.length; i += 1) if (enclosure[i] === 1) t[i] = 0;
  return { lattice: T.lattice, T: t, road: T.road, a: T.a };
}

/** The stage boundary's options: the previous stage's enclosure (k ≥ 2), the points the outline keeps as vertices. */
export interface StageBoundaryOptions {
  /** The enclosure of stage k − 1 (its selected nodes, `StageBoundary.set.selected`); required for k ≥ 2. */
  readonly enclosure?: Uint8Array | null;
  /** Contour vertices the outline keeps (S5b's destinations, S3's gates). */
  readonly pins?: readonly LatticePoint[];
}

/** A stage's boundary (§4.4 S5a *Boundary*). */
export interface StageBoundary {
  readonly k: number;
  /** T as it stood when the stage began. */
  readonly source: Field;
  /** The union field the threshold and the level set read (T held at 0 on the enclosure). */
  readonly field: Field;
  readonly threshold: Threshold;
  /** The selection, the exact contour and the outline (C-0017). */
  readonly set: LevelSet;
  /** The land of stages 1 … k asked (cm²). */
  readonly askedCm2: number;
  /** The land of {T ≤ t_k} ∪ enclosure(k − 1) (cm²): the threshold's, exact to one cell. */
  readonly landCm2: number;
  /** The enclosure's land (cm²; 0 at k = 1). */
  readonly enclosureCm2: number;
  /** landCm2 − enclosureCm2: the land the stage adds. */
  readonly addedCm2: number;
  readonly capped: boolean;
  /** asked − land when capped (cm²): the stage's shortfall, carried to S5d. */
  readonly shortfallCm2: number;
  /** A capped stage that adds no land: folded into the last stage that holds land, its quota with it (reported). */
  readonly folded: boolean;
}

/**
 * The boundary of stage k (§4.4 S5a; see the header): `T` the field as it stands, `quotas` the stage lands, the
 * previous stage's enclosure in `opts` for k ≥ 2.
 */
export function stageBoundary(T: Field, k: number, quotas: StageQuotas, opts: StageBoundaryOptions = {}): StageBoundary {
  if (!(Number.isInteger(k) && k >= 1 && k <= quotas.stagesHa.length)) throw new RangeError(`stageBoundary: k is a stage 1 … ${String(quotas.stagesHa.length)}, got ${String(k)}`);
  const enclosure = opts.enclosure ?? null;
  if (k >= 2 && enclosure === null) throw new RangeError(`stageBoundary: stage ${String(k)} needs the enclosure of stage ${String(k - 1)}`);
  let asked = 0;
  for (let j = 0; j < k; j += 1) asked += quotas.stagesHa[j] * HA_CM2;
  const field = unionField(T, k >= 2 ? enclosure : null);
  const threshold = stageThreshold(field, asked);
  const set = levelSet(field, threshold.t, opts.pins === undefined ? {} : { pins: opts.pins });
  const enclosureCm2 = enclosure === null || k === 1 ? 0 : landOf(T, enclosure);
  const added = threshold.landCm2 - enclosureCm2;
  return {
    k,
    source: T,
    field,
    threshold,
    set,
    askedCm2: asked,
    landCm2: threshold.landCm2,
    enclosureCm2,
    addedCm2: added,
    capped: threshold.capped,
    shortfallCm2: threshold.shortfallCm2,
    folded: k >= 2 && threshold.capped && added <= 0,
  };
}

/** The outline of a stage boundary with more contour vertices kept (the selection unchanged). */
export function withPins(b: StageBoundary, pins: readonly LatticePoint[]): StageBoundary {
  return { ...b, set: levelSet(b.field, b.threshold.t, { pins }) };
}

/** The re-settled field and the nodes the new roads lowered. */
export interface Resettled {
  readonly field: Field;
  /** The nodes whose T the new roads lowered, ascending. */
  readonly lowered: number[];
  /** The road edges the new roads added (graph edges, both directions). */
  readonly addedEdges: number;
}

/** The re-settlement's options: the water pull the field was computed with (§4.2 S3 (6); absent: none). */
export interface ResettleOptions {
  readonly pull?: WaterPull;
}

/**
 * §4.4 S5a / S5b: the new main roads re-settle T incrementally (SCL-3) — their lattice edges join the road set at the
 * field's own road multiplier 1/a (C-S5AB), and a decrease-only Dijkstra from those edges lowers exactly the nodes
 * whose cost they lower. The edge weights are computed as `fieldT` computes them (the road multiplier, then the water
 * pull), so the result equals a full recompute over the extended road set.
 */
export function resettleT(T: Field, newRoads: readonly { readonly nodes: readonly number[] }[], opts: ResettleOptions = {}): Resettled {
  const lattice = T.lattice;
  const g = lattice.graph;
  const road = Uint8Array.from(T.road);
  const added: number[] = [];
  const mark = (u: number, v: number): void => {
    for (let d = 0; d < 6; d += 1) {
      if (lattice.adjacency[6 * u + d] !== v) continue;
      const e = lattice.slot[6 * u + d];
      if (e !== -1 && road[e] === 0) {
        road[e] = 1;
        added.push(e);
      }
      return;
    }
    throw new RangeError(`resettleT: nodes ${String(u)} and ${String(v)} are not lattice neighbours`);
  };
  for (const r of newRoads) {
    for (let i = 1; i < r.nodes.length; i += 1) {
      mark(r.nodes[i - 1], r.nodes[i]);
      mark(r.nodes[i], r.nodes[i - 1]);
    }
  }
  const factor = quot(1, T.a, 'count', 'road multiplier');
  const pull = opts.pull;
  const weight = (u: number, e: number): number => {
    let w = g.weights[e];
    if (road[e] === 1) w *= factor;
    if (pull !== undefined) {
      const p = lattice.points[u];
      const q = lattice.points[g.targets[e]];
      w *= 1 - pull.weight * pull.q({ x: (p.x + q.x) * 0.5, y: (p.y + q.y) * 0.5 });
    }
    return w;
  };
  const from = new Int32Array(g.targets.length);
  for (let u = 0; u < g.n; u += 1) for (let e = g.offsets[u]; e < g.offsets[u + 1]; e += 1) from[e] = u;
  const dist = Float64Array.from(T.T);
  const heap = new BinaryHeap();
  const lowered = new Uint8Array(g.n);
  added.sort((a, b) => a - b);
  for (const e of added) {
    const u = from[e];
    const v = g.targets[e];
    const cand = dist[u] + weight(u, e);
    if (cand < dist[v]) {
      dist[v] = cand;
      lowered[v] = 1;
      heap.push(v, cand);
    }
  }
  while (heap.size > 0) {
    const u = heap.pop();
    const du = dist[u];
    for (let e = g.offsets[u]; e < g.offsets[u + 1]; e += 1) {
      const v = g.targets[e];
      const cand = du + weight(u, e);
      if (cand < dist[v]) {
        dist[v] = cand;
        lowered[v] = 1;
        heap.push(v, cand);
      }
    }
  }
  const out: number[] = [];
  for (let i = 0; i < g.n; i += 1) if (lowered[i] === 1) out.push(i);
  return { field: { lattice, T: dist, road, a: T.a }, lowered: out, addedEdges: added.length };
}

// ---- the trace: stage 1 (S3's, unchanged) ---------------------------------------------------------------------------------

/** What S5a's trace laid: the enceinte, its gates, the run's records and the strips. */
export interface StageTrace {
  readonly enceinte: Enceinte;
  /** Main gates in gate-site order, then the water gates. */
  readonly gates: readonly Gate[];
  readonly waterGates: readonly WaterGate[];
  readonly traced: Traced;
  readonly strips: StripsLaid;
}

/** The options of `traceStage1`. */
export interface Stage1Options {
  readonly water?: WaterSet;
  readonly costField?: CostField;
  readonly key?: PlatKey;
}

/**
 * S5a for k = 1 (§4.4: "Stage 1's boundary is S3's contour, and S5a commits S3's trace for it unchanged"; §4.1's S5
 * row, k = 1): the registered strategy on S3's outline and gate sites, then the strip stand-in, each main gate's stop
 * its route's lattice edge at the gate and each water gate's water — exactly the calls `commitS3Slice` makes after S3's
 * L1 batch (M0-c-02; C-0226 (2), (10)), so the trace committed is S3's, byte for byte (the item's digest test).
 */
export function traceStage1(slice: S3Slice, s3: S3Batch, k: Kernel, opts: Stage1Options = {}): KernelResult<StageTrace> {
  const site = slice.site;
  const arena = opts.key ?? GROUND;
  const water: WaterSet = opts.water ?? { bodies: [], bridges: [] };
  const traced = baseEnceinte.trace(
    slice.levelSet.outline,
    slice.gateSites,
    [s3.plaza],
    site.terrain,
    water,
    { waterfront: 'open', placement: 'aroundAll' },
    siteContext(site),
    k,
    { key: arena, ...(opts.costField === undefined ? {} : { costField: opts.costField }) },
  );
  if (!traced.ok) return err(traced.code, traced.detail);
  const t = traced.value.traced;
  const half = Math.round(site.tables.table('ways').pair('through', `widthM.${site.rung}`)[1] * 50);
  const stops: StripStop[] = [];
  slice.gates.forEach((g, i) => {
    const route = slice.routes.find((r) => r.ordinal === g.ordinal);
    const nodes = route === undefined ? [g.edge[0], g.edge[1]] : route.nodes.slice(Math.max(0, g.routeIndex - WAY_SPAN_NODES), g.routeIndex + 2 + WAY_SPAN_NODES);
    const path: XY[] = nodes.map((n) => slice.lattice.points[n]);
    if (route !== undefined && nodes[nodes.length - 1] === route.nodes[route.nodes.length - 1] && path.length >= 2) {
      const a = path[path.length - 2];
      const b = path[path.length - 1];
      const d = unitOf({ x: b.x - a.x, y: b.y - a.y });
      const f = d === null ? null : toFrame(b, d, site.frameRing);
      if (f !== null && (f.x !== b.x || f.y !== b.y)) path.push(lat(f));
    }
    stops.push({ kind: 'way', gate: t.gates[i].id, at: g.at, path, halfWidthCm: half });
  });
  for (const r of waterRings(water, k, arena)) stops.push({ kind: 'water', gate: r.body, ring: r.ring });
  const strips = layStrips(t.enceinte, site.tables.table('walls').row('era.default'), k, { key: arena, stops, frame: site.frameRing });
  if (!strips.ok) return err(strips.code, strips.detail);
  return ok({ enceinte: t.enceinte, gates: t.gates, waterGates: t.waterGates, traced: t, strips: strips.value }, [...traced.warnings, ...strips.warnings]);
}

/**
 * S3's commits with stage 1's trace laid by S5a (`traceStage1`): S3's L1 batch (`commitS3Batch`), then S5a's trace and
 * strips — the record `commitS3Slice` returns, assembled from the two (the outer ring must already stand).
 */
export function commitS3ThenStage1(slice: S3Slice, k: Kernel, opts: Stage1Options = {}): KernelResult<S3Commit> {
  const arena = opts.key ?? GROUND;
  const s3 = commitS3Batch(slice, k, arena);
  if (!s3.ok) return err(s3.code, s3.detail);
  const t = traceStage1(slice, s3.value, k, opts);
  if (!t.ok) return err(t.code, t.detail);
  const margin: ChainRef = { role: 'margin', entity: slice.site.terrain.id };
  return ok({ margin, border: s3.value.border, plaza: s3.value.plaza, enceinte: t.value.enceinte, gates: t.value.gates, waterGates: t.value.waterGates, traced: t.value.traced, strips: t.value.strips }, t.warnings);
}

// ---- the ways a boundary crosses -------------------------------------------------------------------------------------------

/** A way's committed line as the arena holds it: per run, its vertices in order (with each edge's half-edge). */
export interface WayLine {
  readonly way: Id;
  readonly runs: readonly { readonly points: readonly LatticePoint[]; readonly halfEdges: readonly number[] }[];
}

/** Each way's committed line, read through the façade (§3.4 `resolve`: the chain's runs of half-edges). */
export function wayLines(k: Kernel, ways: readonly Id[], key: PlatKey = GROUND): WayLine[] {
  const p = k.plat(key);
  const out: WayLine[] = [];
  for (const way of ways) {
    const r = k.resolve({ role: 'way', entity: way }, key);
    if (r.view !== 'edges') {
      out.push({ way, runs: [] });
      continue;
    }
    const runs = r.runs.map((run) => {
      const pts: LatticePoint[] = run.map((h) => ({ x: p.vertices.x[p.halfEdges.origin[h]], y: p.vertices.y[p.halfEdges.origin[h]] }) as LatticePoint);
      const last = run[run.length - 1];
      const tip = p.halfEdges.origin[last ^ 1];
      pts.push({ x: p.vertices.x[tip], y: p.vertices.y[tip] } as LatticePoint);
      return { points: pts, halfEdges: [...run] };
    });
    out.push({ way, runs });
  }
  return out;
}

/** One crossing of a way with a boundary's outline. */
export interface BoundaryCrossing {
  readonly way: Id;
  /** The crossing point (rounded to the lattice). */
  readonly at: LatticePoint;
  /** The way's half-edge it lies on (its run order), and its parameter along it. */
  readonly halfEdge: number;
  readonly t: number;
  /** The outline side it lies on (index of the side's first vertex) and its parameter there. */
  readonly side: number;
  readonly u: number;
  /** The compass bearing (cdeg) from `centre` to the crossing. */
  readonly bearingCdeg: number;
}

/**
 * Every crossing of the ways' lines with the closed outline (§4.4 S5b: "the existing arterials … cross the new
 * boundary c times on ground part 0"; M0 has no raised way), in way order then along each way; two crossings closer
 * than one centimetre (a line through an outline vertex) count once.
 */
export function boundaryCrossings(outline: readonly XY[], lines: readonly WayLine[], centre: XY): BoundaryCrossing[] {
  const out: BoundaryCrossing[] = [];
  const n = outline.length;
  for (const line of lines) {
    const mine: BoundaryCrossing[] = [];
    for (const run of line.runs) {
      for (let j = 0; j + 1 < run.points.length; j += 1) {
        const a = run.points[j];
        const b = run.points[j + 1];
        const hits: BoundaryCrossing[] = [];
        for (let i = 0; i < n; i += 1) {
          const c = outline[i];
          const d = outline[i + 1 === n ? 0 : i + 1];
          if (Math.max(a.x, b.x) < Math.min(c.x, d.x) || Math.min(a.x, b.x) > Math.max(c.x, d.x) || Math.max(a.y, b.y) < Math.min(c.y, d.y) || Math.min(a.y, b.y) > Math.max(c.y, d.y)) continue;
          const x = crossParams(a, b, c, d);
          if (x === null) continue;
          const at = lat({ x: a.x + x.t * (b.x - a.x), y: a.y + x.t * (b.y - a.y) });
          hits.push({ way: line.way, at, halfEdge: run.halfEdges[j], t: x.t, side: i, u: x.u, bearingCdeg: bearingCdeg(at.x - centre.x, at.y - centre.y) });
        }
        hits.sort((p, q) => p.t - q.t || p.side - q.side);
        for (const h of hits) {
          const dup = mine.some((m) => (m.at.x - h.at.x) * (m.at.x - h.at.x) + (m.at.y - h.at.y) * (m.at.y - h.at.y) < 1);
          if (!dup) mine.push(h);
        }
      }
    }
    out.push(...mine);
  }
  return out;
}

/** The outline with each point put in as a vertex on the side it lies on (in side order, then along the side). */
export function insertOnOutline(outline: readonly LatticePoint[], points: readonly { at: LatticePoint; side: number; u: number }[]): LatticePoint[] {
  const bySide = new Map<number, { at: LatticePoint; u: number }[]>();
  for (const p of points) {
    const l = bySide.get(p.side) ?? [];
    l.push({ at: p.at, u: p.u });
    bySide.set(p.side, l);
  }
  const out: LatticePoint[] = [];
  const same = (a: XY, b: XY): boolean => a.x === b.x && a.y === b.y;
  for (let i = 0; i < outline.length; i += 1) {
    const v = outline[i];
    if (out.length === 0 || !same(out[out.length - 1], v)) out.push(v);
    const on = (bySide.get(i) ?? []).slice().sort((a, b) => a.u - b.u);
    for (const q of on) if (!same(out[out.length - 1], q.at) && !same(outline[i + 1 === outline.length ? 0 : i + 1], q.at)) out.push(q.at);
  }
  while (out.length > 1 && same(out[0], out[out.length - 1])) out.pop();
  return out;
}

// ---- the trace for k ≥ 2 ---------------------------------------------------------------------------------------------------

/** The options of `traceStage`. */
export interface StageTraceOptions {
  readonly key?: PlatKey;
  readonly water?: WaterSet;
  readonly costField?: CostField;
  /** The enceinte's id (default `enceinte:<k>`). */
  readonly enceinteId?: Id;
  /** The ordinal the stage's first gate takes (gate ids are `gate:<ordinal>`, after every earlier stage's). */
  readonly firstOrdinal: number;
  /** The water gates the earlier enceintes hold (their ids `gate:w<i>` would collide with this stage's). */
  readonly earlierWaterGates?: number;
}

/** What `traceStage` laid: the trace, its gates with their ways, and the gate vertices it split onto the ways. */
export interface StageTraceResult extends StageTrace {
  /** Per main gate (gate-site order): the way it lies on. */
  readonly gateWays: readonly Id[];
  /** The boundary the trace was given: the outline with every crossing's vertex in it. */
  readonly boundary: readonly LatticePoint[];
}

/**
 * S5a's trace for a walled stage k ≥ 2 (§4.4 S5a *Trace*; see the header): `crossings` every crossing of a way with the
 * stage's outline (S5b's spawned roads among them, each at its destination); each crossing's point is split onto its way
 * (one L1 callback batch at S5's rank), the outline takes those vertices, and the registered strategy traces it with each
 * a gate (`gate:<ordinal>` from `firstOrdinal`), the previous enceinte's line as its core; then the strip stand-in, its
 * stops read from the arena at the gates (C-0033). Refused, nothing of the trace written, when a crossing cannot be put
 * on its way, or when the stage's trace would write water gates while an earlier enceinte holds some (their ids would
 * collide: `notBuilt('M1')`, C-S5AB).
 */
export function traceStage(
  k: number,
  outline: readonly LatticePoint[],
  crossings: readonly BoundaryCrossing[],
  slice: S3Slice,
  plaza: Reservation,
  previousLine: readonly LatticePoint[],
  kernel: Kernel,
  opts: StageTraceOptions,
): KernelResult<StageTraceResult> {
  const site = slice.site;
  const arena = opts.key ?? GROUND;
  const water: WaterSet = opts.water ?? { bodies: [], bridges: [] };
  if ((opts.earlierWaterGates ?? 0) > 0 && waterGates(outline.slice(), water, kernel, { key: arena }).length > 0) {
    return err('E_INVARIANT', `notBuilt('M1'): stage ${String(k)}'s trace crosses water while an earlier enceinte holds water gates; their ids gate:w<i> would collide (C-S5AB)`);
  }
  // The crossing vertices split onto their ways, in crossing order (each on the half-edge as the arena holds it now).
  const placed: LatticePoint[] = [];
  const split = kernel.tx(l1Spec(arena, STAGES.S5), (o) => {
    for (const c of crossings) {
      const p = kernel.plat(arena);
      const r = kernel.resolve({ role: 'way', entity: c.way }, arena);
      if (r.view !== 'edges') return err('E_INVARIANT', `S5a: the way ${c.way} does not resolve to edges`);
      // The half-edge of the way nearest the crossing point now (an earlier split may have cut the original).
      let best = -1;
      let bestD = Infinity;
      for (const run of r.runs) {
        for (const h of run) {
          const a = { x: p.vertices.x[p.halfEdges.origin[h]], y: p.vertices.y[p.halfEdges.origin[h]] };
          const b = { x: p.vertices.x[p.halfEdges.origin[h ^ 1]], y: p.vertices.y[p.halfEdges.origin[h ^ 1]] };
          const d = segD2(c.at, a, b);
          if (d < bestD) {
            bestD = d;
            best = h;
          }
        }
      }
      if (best < 0 || bestD > 4) return err('E_INVARIANT', `S5a: the crossing (${String(c.at.x)}, ${String(c.at.y)}) lies off its way ${c.way}`);
      const v = kernel.geom.splitThrough(o, best as HalfEdgeId, c.at);
      if (!v.ok) return err(v.code, v.detail);
      const q = kernel.plat(arena);
      placed.push({ x: q.vertices.x[v.value], y: q.vertices.y[v.value] } as LatticePoint);
    }
    return ok(null);
  });
  if (!split.ok) return err(split.code, `S5a: the gate vertices could not be put on their ways: ${split.detail}`);
  // The outline with the gate vertices in it (each within a centimetre of its crossing; the strategy pins it there).
  const boundary = insertOnOutline(
    outline,
    crossings.map((c, i) => ({ at: placed[i], side: c.side, u: c.u })),
  );
  const sites: GateSite[] = crossings.map((c, i) => ({ ordinal: opts.firstOrdinal + i, at: placed[i], bearingCdeg: c.bearingCdeg as GateSite['bearingCdeg'], kind: 'main', forced: false }));
  const ctx = siteContext(site);
  const traced = baseEnceinte.trace(
    boundary,
    sites,
    [plaza],
    site.terrain,
    water,
    { waterfront: 'open', placement: 'aroundAll' },
    ctx,
    kernel,
    {
      key: arena,
      stage: k,
      enceinteId: opts.enceinteId ?? `enceinte:${String(k)}`,
      core: [previousLine],
      batchStage: STAGES.S5,
      ...(opts.costField === undefined ? {} : { costField: opts.costField }),
    },
  );
  if (!traced.ok) return err(traced.code, traced.detail);
  const t = traced.value.traced;
  const half = Math.round(site.tables.table('ways').pair('through', `widthM.${site.rung}`)[1] * 50);
  const strips = layStrips(t.enceinte, site.tables.table('walls').row('era.default'), kernel, { key: arena, wayHalfWidthCm: half, frame: site.frameRing });
  if (!strips.ok) return err(strips.code, strips.detail);
  const gateWays = crossings.map((c) => c.way);
  const gates: Gate[] = t.gates.map((g) => {
    if (g.kind !== 'main') return g;
    const i = sites.findIndex((s) => `gate:${String(s.ordinal)}` === g.id);
    return i < 0 ? g : { ...g, way: gateWays[i] };
  });
  return ok({ enceinte: t.enceinte, gates, waterGates: t.waterGates, traced: t, strips: strips.value, gateWays, boundary }, [...split.warnings, ...traced.warnings, ...strips.warnings]);
}

/** The squared distance from p to the segment ab. */
function segD2(p: XY, a: XY, b: XY): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let t = l2 === 0 ? 0 : quot((p.x - a.x) * dx + (p.y - a.y) * dy, l2, 'area', 'segment foot');
  if (t < 0) t = 0;
  if (t > 1) t = 1;
  const fx = a.x + t * dx - p.x;
  const fy = a.y + t * dy - p.y;
  return fx * fx + fy * fy;
}

/** The outline's perimeter (cm) and twice its area (the boundary's measures S5b and the reports read). */
export function outlineMeasures(outline: readonly XY[]): { perimeterCm: number; areaCm2: number } {
  return { perimeterCm: perimeterOf(outline), areaCm2: Math.abs(area2Of(outline)) * 0.5 };
}

/** The S5 town-root stream of S5b's picks (`growth.mainroad`), for a run outside the pipeline's runner. */
export const MAINROAD_CONCERN = CONCERNS['growth.mainroad'];

/** The stage id S5a and S5b run under (§4.1: one S5, its sub-steps per stage k). */
export const S5_STAGE = STAGES.S5 as StageId;

export { PLAZA_ID };
