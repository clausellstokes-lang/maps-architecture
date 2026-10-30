// S5a for every growth stage k (M0-c-04; §4.4 S5a *Boundary* and *Trace*, §4.2 S3 (6), (7), (9), §4.1's S5 batch row;
// C-0017, C-0032, C-0033, C-0087; readings C-0244):
// * the boundary of stage k is a level set of the one field T as it stands when stage k begins: t_k by accumulated cell
//   areas so that the land of {T ≤ t_k} ∪ the enclosure of stage k − 1 equals the land of stages 1 … k (exact to one
//   cell; the union read as T held at 0 on the enclosure's nodes, so S3's threshold and level set run on it unchanged),
//   capped at the reachable land inside the frame as S3 (6) caps t₁ (the shortfall the stage's, reported), its outer
//   contour by C-0017's marching triangles, simplified and Chaikin-smoothed as S3's (M0-c-01's `levelSet`); a capped
//   stage that adds no land to stage k − 1's is folded into the last stage that holds land, its quota with it;
// * stage 1's boundary is S3's contour and S5a commits S3's trace for it unchanged: `traceStage1` lays the registered
//   strategy's trace and the strip stand-in by the enceinte's `traceWithStrips`, the calls `commitS3Slice` makes;
// * T is one field, re-settled incrementally after each S5b at the nodes the new roads lower (`resettleT`): never a
//   new field per stage (SCL-3);
// * for k ≥ 2 the trace is the strategy's, right after S5b, every arterial crossing of the stage's boundary on ground
//   part 0 pinned as a gate: each crossing's vertex is split onto its way, so the wall chain meets the way exactly at
//   its gate vertex, then the trace (with the previous enceinte as its core) and the strip stand-in (C-0033), its stops
//   read from the arena at the gates. The gate splits run inside the trace's own L1 batch, before its insertion, so a
//   refused trace leaves no split behind (N-54 (3); C-0285); where the gates stand is planned first in a batch that is
//   always rejected (the strategy needs the gate points before its batch opens, and only the kernel's split knows them:
//   C-0449 (10)), and the trace's batch refuses if the splits land anywhere else. A crossing on a bridge's span (the way's
//   edge between the bridge's two `deck_end` vertices) is no split: its gate is the bridgehead, the deck end on the
//   stage's side of the boundary, and a crossing in the water off every span, or a span with no single deck end on the
//   stage's side, refuses the trace (E_INVARIANT, detect-and-refuse); the trace's batch refuses too when it leaves a
//   vertex between the two deck ends of any span that stood before it. The stage's strips keep off the water as stage 1's
//   do (a water stop for every water ring, beside the arena's stops), and their batch refuses, nothing of them written,
//   when it would break such a span or leave a setback edge in the water (C-0292; C-0449 (16)). Each seam arms exactly one
//   callback batch: a strategy or a strip stand-in that opened a second is refused, never armed twice (C-0449 (14)).
import {
  BinaryHeap,
  CONCERNS,
  dest,
  err,
  ok,
  outgoing,
  rowKey,
  rowsOn,
  STAGES,
  type Committed,
  type HalfEdgeId,
  type Kernel,
  type KernelResult,
  type KernelTx,
  type LatticePoint,
  type Overlay,
  type Plat,
  type PlatKey,
  type StageId,
  type VertexId,
} from '@plat/kernel';
import type { ChainRef, Enceinte, Gate, GateSite, Id, Reservation, WaterSet } from '@plat/model';
import { commitS3Batch, PLAZA_ID, siteContext, traceWithStrips, type S3Batch, type S3Commit } from '../enceinte/commit.js';
import { crossParams, distToRing, lat, TOUCH_CM, unitOf } from '../enceinte/plane.js';
import { layStrips, stripWidths, traceLine } from '../enceinte/strips.js';
import { baseEnceinte, l1Spec } from '../enceinte/trace.js';
import type { CostField, StripsLaid, StripStop, Traced, WaterGate, XY } from '../enceinte/types.js';
import { GROUND, waterRings, type WaterRing } from '../enceinte/water.js';
import { stageThreshold, type WaterPull } from '../siting/field.js';
import { area2Of, bearingCdeg, distToSegment2, HA_CM2, insideRing, perimeterOf, quot, ringIsSimple } from '../siting/geom.js';
import { levelSet } from '../siting/levelset.js';
import type { Field, LevelSet, S3Slice, Threshold } from '../siting/types.js';

/** One hectare in cm²: siting's constant, public here through the growth barrel. */
export { HA_CM2 } from '../siting/geom.js';

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
 * field's own road multiplier 1/a (C-0244), and a decrease-only Dijkstra from those edges lowers exactly the nodes
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
 * row, k = 1): the enceinte's `traceWithStrips` — the registered strategy on S3's outline and gate sites, then the strip
 * stand-in, each main gate's stop its route's lattice edge at the gate and each water ring's water — the calls
 * `commitS3Slice` makes after S3's L1 batch (M0-c-02; C-0226 (2), (10)), so the trace committed is S3's, byte for byte
 * (the item's digest test). A refusal is returned with its code and detail.
 */
export function traceStage1(slice: S3Slice, s3: S3Batch, k: Kernel, opts: Stage1Options = {}): KernelResult<StageTrace> {
  const arena = opts.key ?? GROUND;
  const water: WaterSet = opts.water ?? { bodies: [], bridges: [] };
  const tail = traceWithStrips(slice, k, arena, water, opts.costField, s3.plaza);
  if (!tail.ok) return err(tail.code, tail.detail);
  return ok(tail.value, tail.warnings);
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

/** How far either side of a meeting the way is read to tell a crossing from a graze (cm; closer meetings halve it). */
const THROUGH_CM = 30;

/**
 * The crossings among the meetings `boundaryCrossings` gives (§4.4 S5b's c: "the existing arterials … cross the new
 * boundary c times"; C-0449 (9)): a meeting where the way passes from one side of the outline to the other, read on
 * the way THROUGH_CM before and after it (half the distance to a neighbouring meeting of the same run when that is
 * nearer), and not one where it only touches the outline and stays on its side (a graze). A meeting at a run's end is
 * kept (nothing to read beyond it). The trace's gates are every meeting (`traceStep`): a graze, if one occurs, keeps
 * its pin, so the wall meets the way there at a gate vertex and nowhere beside it. File-level (C-0449 (9)).
 */
export function crossingsThrough(outline: readonly XY[], lines: readonly WayLine[], centre: XY): BoundaryCrossing[] {
  const all = boundaryCrossings(outline, lines, centre);
  // Each meeting's run and its arc position along it.
  const where = all.map((x) => {
    const line = lines.find((l) => l.way === x.way);
    const runs = line === undefined ? [] : line.runs;
    for (let r = 0; r < runs.length; r += 1) {
      const j = runs[r].halfEdges.indexOf(x.halfEdge);
      if (j < 0) continue;
      const pts = runs[r].points;
      let s = 0;
      for (let i = 0; i < j; i += 1) s += Math.sqrt((pts[i + 1].x - pts[i].x) * (pts[i + 1].x - pts[i].x) + (pts[i + 1].y - pts[i].y) * (pts[i + 1].y - pts[i].y));
      const l = Math.sqrt((pts[j + 1].x - pts[j].x) * (pts[j + 1].x - pts[j].x) + (pts[j + 1].y - pts[j].y) * (pts[j + 1].y - pts[j].y));
      return { pts, run: `${x.way}#${String(r)}`, s: s + x.t * l };
    }
    return null;
  });
  /** The run's point at arc position s, or null beyond its ends. */
  const pointAt = (pts: readonly XY[], s: number): XY | null => {
    if (s < 0) return null;
    let left = s;
    for (let i = 0; i + 1 < pts.length; i += 1) {
      const l = Math.sqrt((pts[i + 1].x - pts[i].x) * (pts[i + 1].x - pts[i].x) + (pts[i + 1].y - pts[i].y) * (pts[i + 1].y - pts[i].y));
      if (left <= l && l > 0) {
        const t = quot(left, l, 'length', 'arc position');
        return { x: pts[i].x + t * (pts[i + 1].x - pts[i].x), y: pts[i].y + t * (pts[i + 1].y - pts[i].y) };
      }
      left -= l;
    }
    return null;
  };
  return all.filter((_x, i) => {
    const w = where[i];
    if (w === null) return true;
    let d = THROUGH_CM;
    where.forEach((o, k) => {
      if (k !== i && o !== null && o.run === w.run && o.s !== w.s) d = Math.min(d, Math.abs(o.s - w.s) * 0.5);
    });
    const before = pointAt(w.pts, w.s - d);
    const after = pointAt(w.pts, w.s + d);
    if (before === null || after === null) return true;
    return insideRing(outline, before) !== insideRing(outline, after);
  });
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
  /**
   * The water gates the earlier enceintes hold. Read by nothing since C-0449 (L31): each water gate takes the lowest
   * `gate:w<i>` no earlier enceinte's gate holds (C-0324 (3)), so a stage's water gates never collide with an earlier
   * stage's; kept so the exported options keep their shape (J263 Q1).
   */
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
 * stage's outline (S5b's spawned roads among them, each at its destination); each crossing's gate vertex is put on its
 * way (`placeGateVertices`: the way's own vertex beside the crossing, the bridgehead of a span it crosses, else a split),
 * the outline takes those vertices, and the registered strategy traces it with each a gate (`gate:<ordinal>` from
 * `firstOrdinal`), the previous enceinte's line as its core, the splits made inside the trace's own L1 batch at S5's
 * rank (N-54 (3)); then the strip stand-in, its stops read from the arena at the gates (C-0033). Refused, nothing of the
 * trace written, when a crossing cannot be put on its way, lies in the water off every span or meets a span with no
 * single deck end on the stage's side, or when the trace's batch would leave a vertex on a span. The stage's water gates
 * take the lowest free `gate:w<i>` (C-0324 (3)), so an earlier enceinte's water gates are no bar (L31; C-0449).
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
  // Where the gate vertices stand: planned in a batch that is always rejected (the arena untouched), then made again
  // inside the trace's batch, which refuses if they land anywhere else. The strategy reads the gate points before its
  // batch opens, and only the kernel's split places them (§3.6), so the plan is a batch of its own (C-0449 (10)).
  const wet = waterRings(water, kernel, arena);
  let plan: GatePlan | null = null;
  const probe = kernel.tx(l1Spec(arena, STAGES.S5), (o) => {
    const r = placeGateVertices(kernel, arena, o, crossings, outline, wet);
    if (!r.ok) return r;
    plan = r.value;
    return err('E_INVARIANT', 'S5a: the gate plan (a batch always rejected)');
  });
  if (plan === null) return err(probe.ok ? 'E_INVARIANT' : probe.code, `S5a: the gate vertices could not be put on their ways: ${probe.ok ? 'the plan was not made' : probe.detail}`);
  const planned: GatePlan = plan;
  const placed = planned.placed;
  const along = planned.along;
  // The outline with the gate vertices in it, each crossed square to its way over the outer strip's width on both sides
  // (the outline's vertices within that reach replaced), so the wall meets the way at its gate and nowhere beside it.
  const reach = stripWidths(site.tables.table('walls').row('era.default')).outer;
  const inserted = squareGates(
    insertOnOutline(
      outline,
      crossings.map((c, i) => ({ at: placed[i], side: c.side, u: c.u })),
    ),
    placed,
    along,
    reach,
  );
  // The closed chain starts at a vertex that is no gate (a gate is an existing vertex of its way; C-0244).
  const isGate = (q: XY): boolean => placed.some((g) => g.x === q.x && g.y === q.y);
  const start = inserted.findIndex((q, i) => !isGate(q) && !isGate(inserted[i === 0 ? inserted.length - 1 : i - 1]));
  const boundary = start <= 0 ? inserted : [...inserted.slice(start), ...inserted.slice(0, start)];
  // A gate moved to a bridgehead takes its bearing there.
  const sites: GateSite[] = crossings.map((c, i) => ({
    ordinal: opts.firstOrdinal + i,
    at: placed[i],
    bearingCdeg: (planned.decks[i] === null ? c.bearingCdeg : bearingCdeg(placed[i].x - site.centre.x, placed[i].y - site.centre.y)) as GateSite['bearingCdeg'],
    kind: 'main',
    forced: false,
  }));
  const spans = standingSpans(kernel, arena, water);
  const host = withinTraceBatch(kernel, (o) => {
    const again = placeGateVertices(kernel, arena, o, crossings, outline, wet);
    if (!again.ok) return err(again.code, `S5a: the gate vertices could not be put on their ways: ${again.detail}`);
    const moved = again.value.placed.findIndex((q, i) => q.x !== placed[i].x || q.y !== placed[i].y);
    if (moved >= 0) return err('E_INVARIANT', `S5a: the gate vertex of crossing ${String(moved)} landed at (${String(again.value.placed[moved].x)}, ${String(again.value.placed[moved].y)}), not where it was planned (${String(placed[moved].x)}, ${String(placed[moved].y)})`);
    return ok(null);
  }, () => brokenSpan(kernel, arena, spans), 'S5a: the trace');
  const ctx = siteContext(site);
  const traced = baseEnceinte.trace(
    boundary,
    sites,
    [plaza],
    site.terrain,
    water,
    { waterfront: 'open', placement: 'aroundAll' },
    ctx,
    host.kernel,
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
  // The trace committed through the armed batch and no other (C-0449 (14)): the splits and the span proof ran there.
  if (host.batches() !== 1) return err('E_INVARIANT', `S5a: the trace committed through ${String(host.batches())} batches of S5a's seam, not its one (C-0449 (14))`);
  const t = traced.value.traced;
  const half = Math.round(site.tables.table('ways').pair('through', `widthM.${site.rung}`)[1] * 50);
  // The strips keep off the water as stage 1's do (C-0292): the arena's stops (each main gate's way, each water
  // gate's water) and a water stop for every other water ring; their batch refuses, nothing of the strips written, when
  // it would break a span that stood before S5a or leave a setback vertex or edge in the water.
  const era = site.tables.table('walls').row('era.default');
  const widths = stripWidths(era);
  const rings = waterRings(water, kernel, arena);
  const stops = stageStops(t.enceinte, kernel, arena, half, 4 * (widths.inner + widths.outer), rings);
  const proved = withinTraceBatch(kernel, () => ok(null), () => {
    const s = brokenSpan(kernel, arena, spans);
    if (!s.ok) return err(s.code, `S5a's strips: ${s.detail}`);
    return wetSetback(kernel, arena, t.enceinte.id, rings);
  }, "S5a's strips");
  const strips = layStrips(t.enceinte, era, proved.kernel, { key: arena, stops, frame: site.frameRing });
  if (!strips.ok) return err(strips.code, strips.detail);
  const gateWays = crossings.map((c) => c.way);
  const gates: Gate[] = t.gates.map((g) => {
    if (g.kind !== 'main') return g;
    const i = sites.findIndex((s) => `gate:${String(s.ordinal)}` === g.id);
    return i < 0 ? g : { ...g, way: gateWays[i] };
  });
  return ok({ enceinte: t.enceinte, gates, waterGates: t.waterGates, traced: t, strips: strips.value, gateWays, boundary }, [...traced.warnings, ...strips.warnings]);
}

/** Where each crossing's gate vertex stands on its way: its point, the way's direction there, and the bridge it heads. */
interface GatePlan {
  readonly placed: readonly LatticePoint[];
  readonly along: readonly XY[];
  /** Per crossing: the bridge whose span it crossed (its gate that span's deck end on the stage's side), else null. */
  readonly decks: readonly (Id | null)[];
}

/** The bridges whose two `deck_end` vertices carry the vertex `v` (its `deck_end` rows' entities). */
function decksAt(p: Plat, v: number): Id[] {
  const out: Id[] = [];
  for (const r of rowsOn(p, 'vertex', v as VertexId)) {
    const kk = rowKey(p, r);
    if (kk.role === 'deck_end') out.push(kk.entity);
  }
  return out;
}

/**
 * The gate vertices put on their ways inside the open batch `o`, in crossing order (N-54 (3); C-0244): the way's own
 * vertex where one lies within twice the attraction distance of the crossing (no sub-edge shorter than that beside a
 * gate); else, on a bridge's span (the way's edge between the bridge's two `deck_end` vertices), the deck end inside
 * the stage's outline — the bridgehead on the stage's side, no vertex added to the span; else a vertex split onto the
 * way's nearest half-edge. Refused (E_INVARIANT): a crossing off its way, a span with no single deck end inside the
 * outline, a crossing in the water off every span, two gates at one bridgehead. Each gate keeps its way's direction.
 * The way-vertex snap comes first: a crossing within twice the attraction distance of a deck end — on the span or off
 * it — is that deck end, the way's own vertex, even when it lies just outside the outline as given (the outline moves
 * at most 2 · TOUCH_CM to it; the span stays whole, the gate on land; C-0449 (13)).
 */
function placeGateVertices(kernel: Kernel, arena: PlatKey, o: Overlay, crossings: readonly BoundaryCrossing[], outline: readonly LatticePoint[], wet: readonly WaterRing[]): KernelResult<GatePlan> {
  const placed: LatticePoint[] = [];
  const along: XY[] = [];
  const decks: (Id | null)[] = [];
  for (const c of crossings) {
    const p = kernel.plat(arena);
    const r = kernel.resolve({ role: 'way', entity: c.way }, arena);
    if (r.view !== 'edges') return err('E_INVARIANT', `S5a: the way ${c.way} does not resolve to edges`);
    let best = -1;
    let bestD = Infinity;
    let vtx = -1;
    let vtxD = Infinity;
    for (const run of r.runs) {
      for (const h of run) {
        const ia = p.halfEdges.origin[h];
        const a = { x: p.vertices.x[ia], y: p.vertices.y[ia] };
        const b = { x: p.vertices.x[p.halfEdges.origin[h ^ 1]], y: p.vertices.y[p.halfEdges.origin[h ^ 1]] };
        const d = distToSegment2(c.at, a, b);
        if (d < bestD) {
          bestD = d;
          best = h;
        }
        for (const [iv, q] of [
          [ia, a],
          [p.halfEdges.origin[h ^ 1], b],
        ] as const) {
          const dv = (q.x - c.at.x) * (q.x - c.at.x) + (q.y - c.at.y) * (q.y - c.at.y);
          if (dv < vtxD) {
            vtxD = dv;
            vtx = iv;
          }
        }
      }
    }
    if (best < 0 || bestD > 4) return err('E_INVARIANT', `S5a: the crossing (${String(c.at.x)}, ${String(c.at.y)}) lies off its way ${c.way}`);
    const ia = p.halfEdges.origin[best];
    const ib = p.halfEdges.origin[best ^ 1];
    along.push({ x: p.vertices.x[ib] - p.vertices.x[ia], y: p.vertices.y[ib] - p.vertices.y[ia] });
    if (vtx >= 0 && vtxD <= 4 * TOUCH_CM * TOUCH_CM) {
      placed.push({ x: p.vertices.x[vtx], y: p.vertices.y[vtx] } as LatticePoint);
      decks.push(null);
      continue;
    }
    // A bridge's span: the gate at its deck end on the stage's side (§4.4: a way over water crosses on its deck; a wall
    // vertex on the deck is no lawful gate).
    const atB = decksAt(p, ib);
    const bridge = decksAt(p, ia).find((d) => atB.includes(d));
    if (bridge !== undefined) {
      const ends = [ia, ib].filter((v) => insideRing(outline, { x: p.vertices.x[v], y: p.vertices.y[v] }));
      if (ends.length !== 1) return err('E_INVARIANT', `S5a: the stage boundary crosses ${bridge}'s span at (${String(c.at.x)}, ${String(c.at.y)}) with ${String(ends.length)} of its deck ends on the stage's side; its gate is the bridgehead on that side (N-54 (3))`);
      const head = { x: p.vertices.x[ends[0]], y: p.vertices.y[ends[0]] } as LatticePoint;
      if (placed.some((q) => q.x === head.x && q.y === head.y)) return err('E_INVARIANT', `S5a: two gates at ${bridge}'s bridgehead (${String(head.x)}, ${String(head.y)}) (N-54 (3))`);
      placed.push(head);
      decks.push(bridge);
      continue;
    }
    // Off every span the way is dry (C-0250): a crossing in the water is refused, never split onto the way.
    const inWater = wet.find((w) => insideRing(w.ring, c.at) && distToRing(c.at, w.ring) > TOUCH_CM);
    if (inWater !== undefined) return err('E_INVARIANT', `S5a: the crossing (${String(c.at.x)}, ${String(c.at.y)}) of ${c.way} lies in ${inWater.body} off every bridge span (N-54 (3))`);
    const v = kernel.geom.splitThrough(o, best as HalfEdgeId, c.at);
    if (!v.ok) return err(v.code, v.detail);
    const q = kernel.plat(arena);
    const at = { x: q.vertices.x[v.value], y: q.vertices.y[v.value] } as LatticePoint;
    if (decks.some((d, i) => d !== null && placed[i].x === at.x && placed[i].y === at.y)) return err('E_INVARIANT', `S5a: a gate split onto a bridgehead (${String(at.x)}, ${String(at.y)}) another crossing's gate holds (N-54 (3))`);
    placed.push(at);
    decks.push(null);
  }
  return ok({ placed, along, decks });
}

/** A span standing in the arena: the bridge and its two deck-end vertices, joined by one edge. */
interface StandingSpan {
  readonly bridge: Id;
  readonly ends: readonly [number, number];
}

/** The two vertices of a deck's `deck_end` rows, when both resolve to one vertex each. */
function deckEnds(kernel: Kernel, arena: PlatKey, bridge: WaterSet['bridges'][number]): [number, number] | null {
  const vs: number[] = [];
  for (const ref of bridge.deck) {
    const r = kernel.resolve(ref, arena);
    if (r.view !== 'vertices' || r.vertices.length !== 1) return null;
    vs.push(r.vertices[0]);
  }
  return [vs[0], vs[1]];
}

/** Are the vertices a and b joined by one edge? */
function joined(p: Plat, a: number, b: number): boolean {
  return outgoing(p, a as VertexId).some((h) => dest(p, h) === b);
}

/** Every bridge of the water set whose two deck ends stand joined by one edge (its span) before the trace. */
function standingSpans(kernel: Kernel, arena: PlatKey, water: WaterSet): StandingSpan[] {
  const p = kernel.plat(arena);
  const out: StandingSpan[] = [];
  for (const b of water.bridges) {
    const ends = deckEnds(kernel, arena, b);
    if (ends !== null && joined(p, ends[0], ends[1])) out.push({ bridge: b.id, ends });
  }
  return out;
}

/** The trace's batch broke a span that stood before it (a vertex between its deck ends): refused (N-54 (3)). */
function brokenSpan(kernel: Kernel, arena: PlatKey, spans: readonly StandingSpan[]): KernelResult<null> {
  const p = kernel.plat(arena);
  for (const s of spans) {
    if (!joined(p, s.ends[0], s.ends[1])) return err('E_INVARIANT', `S5a: the trace put a vertex on ${s.bridge}'s span between its deck ends (N-54 (3))`);
  }
  return ok(null);
}

/**
 * The strips' stops for a stage k ≥ 2 (C-0292; C-0449 (Q27)): each main gate's way taken along the trace's normal at
 * the gate over `reachCm` on each side with `halfWidthCm` (this stage's rule: the strips also stop wherever an arena
 * way's corridor runs inside their band, which `layStrips` reads itself, RQ5), then a water stop for every water ring,
 * as `traceStage1` gives one for every ring (§4.8: the strips end at the banks). `layStrips` merges them with the stops
 * it reads from the arena (Q27): a read stop is dropped where a given one names its gate or its ring, so a water gate's
 * water — the ring of its face, one of `rings` — is stopped by the ring given here, never read twice.
 */
function stageStops(enceinte: Enceinte, kernel: Kernel, key: PlatKey, halfWidthCm: number, reachCm: number, rings: readonly WaterRing[]): StripStop[] {
  const p = kernel.plat(key);
  const trace = traceLine(enceinte, kernel, key);
  const out: StripStop[] = [];
  for (const g of enceinte.gates) {
    const r = kernel.resolve({ role: 'gate', entity: g }, key);
    if (r.view !== 'vertices' || r.vertices.length !== 1) continue;
    const v = r.vertices[0];
    const q = { x: p.vertices.x[v], y: p.vertices.y[v] };
    const i = trace.findIndex((u) => u.x === q.x && u.y === q.y);
    const a = trace[i <= 0 ? trace.length - 1 : i - 1];
    const b = trace[i + 1 >= trace.length ? 0 : i + 1];
    const n = unitOf({ x: b.y - a.y, y: -(b.x - a.x) }) ?? { x: 0, y: 1 };
    out.push({ kind: 'way', gate: g, at: q, path: [{ x: q.x - n.x * reachCm, y: q.y - n.y * reachCm }, q, { x: q.x + n.x * reachCm, y: q.y + n.y * reachCm }], halfWidthCm });
  }
  const seen = new Set<string>();
  for (const w of rings) {
    const rk = w.ring.map((q) => `${String(q.x)},${String(q.y)}`).join(';');
    if (seen.has(rk)) continue;
    seen.add(rk);
    out.push({ kind: 'water', gate: w.body, ring: w.ring });
  }
  return out;
}

/** How deep in the water a setback vertex may lie (cm): the water-gate receipt's own depth (M0-e-06's WET_DEPTH_CM). */
const STRIP_WET_DEPTH_CM = 2;

/**
 * How deep a point lies in a water ring read with its holes (cm): its distance from the region's nearest ring line,
 * positive inside the water (in the ring and in none of its holes), negative outside.
 */
function waterDepth(q: XY, w: WaterRing): number {
  let d = distToRing(q, w.ring);
  let wet = insideRing(w.ring, q);
  for (const h of w.holes ?? []) {
    d = Math.min(d, distToRing(q, h));
    if (wet && insideRing(h, q)) wet = false;
  }
  return wet ? d : -d;
}

/**
 * A point of the segment ab lying deeper than `floorCm` in the water ring `w` (its holes dry land), or null (C-0449
 * (16)). The segment is searched by halving: a stretch of half-length h about a point at depth d holds no point deeper
 * than d + h (a distance is 1-Lipschitz), so a stretch is halved only while it could hold a point deeper than the floor;
 * a stretch shorter than half a centimetre is not halved again, so a point deeper than the floor by less than that may
 * go unseen.
 */
export function wetPointOn(a: XY, b: XY, w: WaterRing, floorCm: number): XY | null {
  const len = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
  const at = (t: number): XY => ({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) });
  for (const q of [a, b]) if (waterDepth(q, w) > floorCm) return q;
  const stack: [number, number][] = [[0, 1]];
  while (stack.length > 0) {
    const [t0, t1] = stack.pop() as [number, number];
    const t = (t0 + t1) * 0.5;
    const m = at(t);
    const d = waterDepth(m, w);
    if (d > floorCm) return m;
    const half = (t1 - t0) * 0.5 * len;
    if (d + half <= floorCm || half < 0.25) continue;
    stack.push([t, t1], [t0, t]);
  }
  return null;
}

/**
 * The strips' batch left a setback vertex of the enceinte in the water, or a setback edge crossing it with both ends
 * dry (a point of the edge deeper than STRIP_WET_DEPTH_CM): refused (C-0292 (2); C-0449 (16)).
 */
function wetSetback(kernel: Kernel, arena: PlatKey, enceinte: Id, rings: readonly WaterRing[]): KernelResult<null> {
  if (rings.length === 0) return ok(null);
  const r = kernel.resolve({ role: 'setback', entity: enceinte }, arena);
  if (r.view !== 'edges') return ok(null);
  const p = kernel.plat(arena);
  const pt = (v: number): XY => ({ x: p.vertices.x[v], y: p.vertices.y[v] });
  for (const run of r.runs) {
    for (const h of run) {
      for (const v of [p.halfEdges.origin[h], p.halfEdges.origin[h ^ 1]]) {
        const q = pt(v);
        const w = rings.find((x) => insideRing(x.ring, q) && distToRing(q, x.ring) > STRIP_WET_DEPTH_CM);
        if (w !== undefined) return err('E_INVARIANT', `S5a's strips: a setback vertex of ${enceinte} (${String(q.x)}, ${String(q.y)}) lies in ${w.body} (§4.8: the strips end at the banks)`);
      }
    }
  }
  for (const run of r.runs) {
    for (const h of run) {
      const a = pt(p.halfEdges.origin[h]);
      const b = pt(p.halfEdges.origin[h ^ 1]);
      for (const w of rings) {
        const q = wetPointOn(a, b, w, STRIP_WET_DEPTH_CM);
        if (q !== null) return err('E_INVARIANT', `S5a's strips: a setback edge of ${enceinte} (${String(a.x)}, ${String(a.y)}) → (${String(b.x)}, ${String(b.y)}) crosses ${w.body} at (${String(Math.round(q.x))}, ${String(Math.round(q.y))}) (§4.8: the strips end at the banks)`);
      }
    }
  }
  return ok(null);
}

/** A seam's kernel and the number of batches it has seen. */
interface Seam {
  readonly kernel: Kernel;
  /** The batches opened through the seam so far (the armed one among them). */
  batches(): number;
}

/**
 * The kernel the trace is handed (N-54 (3); C-0285 (2)), and the strips (C-0292 (2)): its one callback batch — the
 * trace's commit, the strips' — runs `before` (the gate splits) on the batch's overlay, then the caller's own callback,
 * then `after` (the span proof; for the strips, the water proof too); a refusal of any of the three rejects the whole
 * batch, so a refused trace leaves no gate split behind and refused strips leave no setback line. The seam arms exactly
 * one batch: a second batch through it, or a declared one, is refused E_INVARIANT, writing nothing, so the splits and
 * the proofs never run in a batch that is not the commit (C-0449 (14)). Every other call is the kernel's.
 */
function withinTraceBatch(kernel: Kernel, before: (o: Overlay) => KernelResult<null>, after: () => KernelResult<null>, what: string): Seam {
  let opened = 0;
  const tx = <T>(spec: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<Committed<T | KernelResult<unknown>[]>> => {
    opened += 1;
    if (opened > 1 || fn === undefined) return err('E_INVARIANT', `${what} opened ${fn === undefined ? 'a declared batch' : `batch ${String(opened)}`} through S5a's seam, which arms exactly one callback batch (C-0449 (14))`);
    return kernel.tx(spec, (o) => {
      const b = before(o);
      if (!b.ok) return err(b.code, b.detail);
      const r = fn(o);
      if (!r.ok) return r;
      const a = after();
      if (!a.ok) return err(a.code, a.detail);
      return r;
    });
  };
  return { kernel: Object.freeze({ ...kernel, tx }) as Kernel, batches: () => opened };
}

/**
 * Each gate crossed square to its way (C-0244): on the outline, the vertices within `reach` of a gate (none of them a
 * gate) are replaced by the two points `reach` along the way's normal on either side of it, ordered as the outline
 * runs. A gate whose reshaping would leave the outline non-simple keeps the outline as it was there.
 */
export function squareGates(outline: readonly LatticePoint[], gates: readonly LatticePoint[], along: readonly XY[], reach: number): LatticePoint[] {
  let ring = outline.slice();
  const isGate = (q: XY): boolean => gates.some((g) => g.x === q.x && g.y === q.y);
  gates.forEach((g, gi) => {
    const n = ring.length;
    const at = ring.findIndex((q) => q.x === g.x && q.y === g.y);
    const d = unitOf({ x: -along[gi].y, y: along[gi].x });
    if (at < 0 || d === null || n < 6) return;
    const far = (q: XY): boolean => (q.x - g.x) * (q.x - g.x) + (q.y - g.y) * (q.y - g.y) >= reach * reach;
    let a = at;
    let steps = 0;
    while (steps < n - 3 && !far(ring[(a - 1 + n) % n]) && !isGate(ring[(a - 1 + n) % n])) {
      a = (a - 1 + n) % n;
      steps += 1;
    }
    let b = at;
    while (steps < n - 3 && !far(ring[(b + 1) % n]) && !isGate(ring[(b + 1) % n])) {
      b = (b + 1) % n;
      steps += 1;
    }
    const before = ring[(a - 1 + n) % n];
    const after = ring[(b + 1) % n];
    // The normal pointing along the outline's run (from the vertex before the reach to the one after).
    const run = { x: after.x - before.x, y: after.y - before.y };
    const s = d.x * run.x + d.y * run.y >= 0 ? 1 : -1;
    const p0 = lat({ x: g.x - s * d.x * reach, y: g.y - s * d.y * reach });
    const p1 = lat({ x: g.x + s * d.x * reach, y: g.y + s * d.y * reach });
    const kept: LatticePoint[] = [];
    for (let i = (b + 1) % n; i !== a; i = (i + 1) % n) kept.push(ring[i]);
    const next: LatticePoint[] = [];
    for (const q of [...kept, p0, g, p1]) if (next.length === 0 || !(next[next.length - 1].x === q.x && next[next.length - 1].y === q.y)) next.push(q);
    while (next.length > 1 && next[0].x === next[next.length - 1].x && next[0].y === next[next.length - 1].y) next.pop();
    if (ringIsSimple(next)) ring = next;
  });
  return ring;
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
