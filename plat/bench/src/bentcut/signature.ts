// The bent-cut signature measured on our cuts (M0-b-04; §13.5's bent-cut signature row, §4.6 steps 2–6, §16 M0 (b);
// C-0073, C-0081; the measures are M0-k-05's `cut.*` metrics over `MetricCut` records, one metricVersion, C-0180 (7)).
//
// What a cut is measured on. A committed S8 cut leaves no record of the face it was planned on — S8 recurses inside one
// transaction, and its report carries each face's stop draw, ladder and rungs but no geometry. So the harness REPLAYS
// each district (C-0242 (4)): it runs the district's own batch (BentCutFabric's `districtBatch`, the very callback S8's
// `partition` hands the façade) in a transaction it rejects at the end, and once the batch has returned, it takes the
// district's lanes out again in the reverse of their insertion order (`removeEdges`, the writer S8's own undo uses).
// Taking lane i out after every later lane restores the face lane i split, so the kerb (§3.7) S8 planned that cut on
// is read again, the face's plan is made again by the planner (`planCut`, M0-b-02) on the face's own streams (its
// lineage from the report's cut.stop record, the attempt the report's rung names — "the rotated retries included"),
// and the replayed plan is accepted only when its chain lands on the committed lane: every vertex of either within
// attractCm + 1 cm of the other polyline. A replay that does not land is counted a miss and measured nothing.
//
// Which cuts. The signature is §4.6's restated law, so it is measured on the cuts the planner made — rung (a), every
// frame (attempt 0, 1, 2); the ladder's own straight cuts (the reflex pre-cut, the antenna split, rungs (b) and (c))
// and the deep-interior spines are counted and their share of all committed cuts reported beside it (C-0242 (5)).
//
// The measures (C-0242 (6)), on the lattice (each planned point snapped as S8 snaps the chain it inserts):
//   startT       the snapped start A's place along the working major axis of the frame the cut was planned in (the
//                recorded frame: attempt k's frame is turned k × 36°), (s − sMin) / L, 0 – 1; `startT0` the same in
//                the first, unturned frame;
//   bends        1 when the corner K was kept, else 0 (two bends never, T37-1);
//   cornerT      K's distance from A over λ, the first leg's course from A to the boundary it meets (§4.6 step 4: "the
//                bend lands near mid-course and at least o from both ends"); `cornerCourseT` K's place along the
//                course A–K–foot (reported only);
//   arrivalCdeg  the angle between the leg the cut arrives along (K → foot bent, A → foot straight; a fillet's arc
//                arrives tangent to it) and the far run's direction at the foot (its chord, or its tangent on a
//                curved run — §4.6 *Sides*), folded into 0 – 90°, in centidegrees; `arrivalChordCdeg` the same for the
//                last chord of the inserted points (the fillet's samples included; reported only);
//   fillet       whether an arc replaced K; `shortLegCm` the shorter leg ℓ and `wMinCm` the district's w_min (§4.6 step 6);
//   lengthCm     the fillet-free course length (the legs' sum);
//   faceKind     `ring` when the face was planned by the holed law (it had a hole), else `plain`.
import {
  addressOf,
  type Id,
} from '@plat/model';
import {
  area2,
  createRng,
  entityKey,
  err,
  faceWalk,
  kerb,
  LATTICE,
  pointLocate,
  ratio,
  removeEdges,
  rowKey,
  rowsOn,
  type FaceId,
  type LatticePoint,
  type Overlay,
  type Plat,
} from '@plat/kernel';
import {
  blockDepthRange,
  chainRuns,
  cutCells,
  districtBatch,
  minFrontage,
  planCut,
  snapChain,
  spineWidthsOf,
  workingFrame,
  type CutGeometry,
  type CutPlanned,
  type DistrictContext,
  type DistrictReport,
  type KerbFace,
  type KerbSpine,
  type PartitionResult,
  type PlanContext,
  type PlanStreams,
  type StopUse,
} from '@plat/layout';
import { loadTable } from '@plat/tables';
import type { MetricCut } from '@plat/testkit';
import { districtFaces, GROUND, type FaceDistrict } from './district.js';
import type { BentCutFaceKind } from './faces.js';

/** A point in centimetres. */
export interface XY {
  readonly x: number;
  readonly y: number;
}

/** One measured cut: M0-k-05's `MetricCut` and the fields the harness reports beside it. */
export interface SignatureCut extends MetricCut {
  /** The kind of the generated face whose district the cut belongs to. */
  readonly kind: BentCutFaceKind;
  /** Rung (a)'s attempt (frame k) and the frame's turn (cdeg). */
  readonly attempt: number;
  readonly turnCdeg: number;
  /** The start's place in the first (unturned) frame. */
  readonly startT0: number;
  /** K's place along the course A–K–foot (bent cuts; reported only). */
  readonly cornerCourseT?: number;
  /** The last inserted chord's arrival (reported only). */
  readonly arrivalChordCdeg: number;
  /** The shorter leg (bent cuts) and the district's w_min, in cm (§4.6 step 6). */
  readonly shortLegCm?: number;
  readonly wMinCm: number;
}

/**
 * A cut as the measures read it — the plan's geometry reduced to points and directions, so a hand-built cut is measured
 * by the same code as a replayed one.
 */
export interface CutSample {
  /** The frame the cut was planned in and the first frame: centre, unit major axis, the outer ring's sMin and length. */
  readonly frame: FrameLine;
  readonly frame0: FrameLine;
  readonly turnCdeg: number;
  readonly attempt: number;
  /** The cut on the kerb before the fillet: [A, K, foot] bent, [A, end] straight. */
  readonly legs: readonly XY[];
  /** λ, the first leg's course from A to the boundary (bent and straight alike; null when unknown). */
  readonly lambdaCm: number | null;
  /** The far run's direction at the foot; null for a straight-first cut with no far run (then `arrivalCross2`). */
  readonly farDir: XY | null;
  /** straightFirst: the first leg's squared cross product with the run it hits (−1 when not tested). */
  readonly arrivalCross2: number;
  /** The cut's points on the kerb with the fillet's arc in place of K. */
  readonly points: readonly XY[];
  readonly filleted: boolean;
  readonly holed: boolean;
  readonly wMinCm: number;
}

/** A frame's axis as the start measure reads it. */
export interface FrameLine {
  readonly centre: XY;
  readonly major: XY;
  readonly sMin: number;
  readonly lengthCm: number;
}

function snapXY(p: XY): XY {
  return { x: Math.round(p.x), y: Math.round(p.y) };
}

function dist(a: XY, b: XY): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** The line angle between two directions, folded into [0°, 90°], in centidegrees (90° = square). */
export function lineAngleCdeg(u: XY, v: XY): number {
  const c = Math.abs(u.x * v.y - u.y * v.x);
  const d = Math.abs(u.x * v.x + u.y * v.y);
  return (Math.atan2(c, d) * 18_000) / Math.PI;
}

/** A point's place along a frame's major axis, (s − sMin) / L. */
export function placeAlong(f: FrameLine, p: XY): number {
  const s = (p.x - f.centre.x) * f.major.x + (p.y - f.centre.y) * f.major.y;
  return (s - f.sMin) / f.lengthCm;
}

/** The last two distinct points of a polyline as a direction, or null. */
function lastDir(points: readonly XY[]): XY | null {
  for (let i = points.length - 1; i > 0; i -= 1) {
    const a = points[i - 1];
    const b = points[i];
    if (a.x !== b.x || a.y !== b.y) return { x: b.x - a.x, y: b.y - a.y };
  }
  return null;
}

/** Measures one cut (see the module comment). */
export function measureCut(kind: BentCutFaceKind, s: CutSample): SignatureCut {
  const legs = s.legs.map(snapXY);
  const A = legs[0];
  const bent = s.legs.length === 3;
  const n = s.legs.length;
  // The leg the cut arrives along, on the snapped points (an unsnapped leg when snapping collapses it).
  let arrive: XY = { x: legs[n - 1].x - legs[n - 2].x, y: legs[n - 1].y - legs[n - 2].y };
  if (arrive.x === 0 && arrive.y === 0) arrive = { x: s.legs[n - 1].x - s.legs[n - 2].x, y: s.legs[n - 1].y - s.legs[n - 2].y };
  let arrivalCdeg: number;
  if (s.farDir !== null) arrivalCdeg = lineAngleCdeg(arrive, s.farDir);
  else arrivalCdeg = s.arrivalCross2 >= 0 ? (Math.asin(Math.min(1, Math.sqrt(s.arrivalCross2))) * 18_000) / Math.PI : 0;
  const chord = lastDir(s.points.map(snapXY));
  const arrivalChordCdeg = chord !== null && s.farDir !== null ? lineAngleCdeg(chord, s.farDir) : arrivalCdeg;
  let lengthCm = 0;
  for (let i = 1; i < n; i += 1) lengthCm += dist(s.legs[i - 1], s.legs[i]);
  const out: SignatureCut = {
    kind,
    faceKind: s.holed ? 'ring' : 'plain',
    startT: placeAlong(s.frame, A),
    startT0: placeAlong(s.frame0, A),
    bends: bent ? 1 : 0,
    arrivalCdeg,
    arrivalChordCdeg,
    fillet: bent && s.filleted,
    lengthCm,
    attempt: s.attempt,
    turnCdeg: s.turnCdeg,
    wMinCm: s.wMinCm,
    ...(bent && s.lambdaCm !== null && s.lambdaCm > 0 ? { cornerT: dist(A, legs[1]) / s.lambdaCm } : {}),
    ...(bent ? { cornerCourseT: dist(A, legs[1]) / (dist(A, legs[1]) + dist(legs[1], legs[2])), shortLegCm: Math.min(dist(s.legs[0], s.legs[1]), dist(s.legs[1], s.legs[2])) } : {}),
  };
  return out;
}

/** A plan's frame as a FrameLine. */
function lineOf(f: { centre: XY; major: XY; sMin: number; lengthCm: number }): FrameLine {
  return { centre: f.centre, major: f.major, sMin: f.sMin, lengthCm: f.lengthCm };
}

/** The sample of a planned cut: the plan, the geometry S8 inserted (its cut or its alternate) and the face's first frame. */
export function sampleOf(plan: CutPlanned, g: CutGeometry, frame0: FrameLine, wMinCm: number): CutSample {
  return {
    frame: lineOf(plan.frame),
    frame0,
    turnCdeg: plan.frame.turnCdeg,
    attempt: plan.attempt,
    legs: g.legs,
    lambdaCm: plan.corner.lambdaCm,
    farDir: g === plan.cut && g.arrivalCross2 >= 0 ? null : (plan.far?.dir ?? null),
    arrivalCross2: g.arrivalCross2,
    points: g.points,
    filleted: g.fillet?.filleted ?? false,
    holed: plan.start.m !== null,
    wMinCm,
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// The replay
// ---------------------------------------------------------------------------------------------------------------------

/** The replay's counts for one district. */
export interface ReplayCounts {
  /** Committed cuts (lanes) of the district, by the rung that made them. */
  readonly cuts: number;
  readonly planner: number;
  readonly fallback: number;
  readonly deep: number;
  /** Planner cuts whose replayed plan landed on the committed lane, and those that did not. */
  readonly matched: number;
  readonly missed: number;
  /** The first few misses' reasons. */
  readonly misses: readonly string[];
}

/** A district's replay: its report, its measured cuts and the counts; `overLimit` when the batch passed S8's own limit. */
export interface ReplayResult {
  readonly report: DistrictReport;
  readonly partition: PartitionResult;
  readonly cuts: SignatureCut[];
  readonly counts: ReplayCounts;
  /** The batch's own work passed the transaction limit S8 gives it (the run is then not S8's: the harness re-runs it). */
  readonly overLimit: boolean;
  /** The district's L1 faces when the batch returned (before the replay took its lanes out). */
  readonly facesAfter: number;
}

/** Is p inside the ring (even–odd), with S8's arithmetic (BentCutFabric's kerb-face reading). */
function insideRing(ring: readonly LatticePoint[], p: XY): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[i];
    const b = ring[j];
    if (a.y > p.y !== b.y > p.y) {
      const k = ratio(p.y - a.y, b.y - a.y, 'length');
      if (p.x < a.x + (b.x - a.x) * (k.ok ? k.value : 0)) inside = !inside;
    }
  }
  return inside;
}

/** The ways on a face's L1 boundary, sorted by id. */
function boundaryWays(p: Plat, face: FaceId): Id[] {
  const ids = new Set<Id>();
  for (const ring of faceWalk(p, 1, face)) {
    for (const h of ring) {
      for (const r of rowsOn(p, 'edge', h)) {
        const k = rowKey(p, r);
        if (k.role === 'way') ids.add(k.entity);
      }
    }
  }
  return [...ids].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

/**
 * A face as S8's planner reads it, for a district with no seams (BentCutFabric's kerb-face reading: the kerb's largest
 * component with the holes inside it, and the face's bounding spines with their half-widths); null for an empty kerb.
 */
export function kerbFaceOf(o: Overlay, face: FaceId, widths: ReadonlyMap<Id, number>): KerbFace | null {
  const kr = kerb(o, face, spineWidthsOf(widths));
  if (!kr.ok) return null;
  const outer = kr.value.filter((r) => area2(r) > 0);
  if (outer.length === 0) return null;
  let pick = outer[0];
  for (const r of outer) if (area2(r) > area2(pick)) pick = r;
  const holes = kr.value.filter((r) => area2(r) < 0 && insideRing(pick, r[0]));
  const spines: KerbSpine[] = [];
  for (const wayId of boundaryWays(o.plat, face)) {
    const w = widths.get(wayId);
    if (w === undefined) continue;
    for (const run of chainRuns(o.plat, GROUND, { role: 'way', entity: wayId })) spines.push({ points: run, halfWidthCm: w / 2, bounding: false });
  }
  return { rings: [pick, ...holes], spines };
}

/** The largest distance from a vertex of `a` to the polyline `b` (cm). */
function reach(a: readonly XY[], b: readonly XY[]): number {
  let worst = 0;
  for (const p of a) {
    let best = Infinity;
    for (let i = 1; i < b.length; i += 1) {
      const u = b[i - 1];
      const v = b[i];
      const dx = v.x - u.x;
      const dy = v.y - u.y;
      const l2 = dx * dx + dy * dy;
      const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - u.x) * dx + (p.y - u.y) * dy) / l2));
      const d = Math.hypot(u.x + t * dx - p.x, u.y + t * dy - p.y);
      if (d < best) best = d;
    }
    if (b.length === 1) best = dist(p, b[0]);
    if (best > worst) worst = best;
  }
  return worst;
}

/** The replay's landing tolerance (cm): the insertion's attraction radius and a centimetre (C-0242 (4)). */
export const LAND_TOL_CM = LATTICE.attractCm + 1;

/** Does a planned chain land on a committed polyline (both ways within the tolerance)? */
export function lands(planned: readonly XY[], committed: readonly XY[]): boolean {
  return planned.length >= 2 && committed.length >= 2 && reach(planned, committed) <= LAND_TOL_CM && reach(committed, planned) <= LAND_TOL_CM;
}

/** The district's context exactly as `runS8` builds it for a one-face district (stage.ts). */
export function contextOf(fd: FaceDistrict): DistrictContext {
  const d = fd.input.districts[0];
  return {
    key: GROUND,
    lineage: d.lineage,
    reroll: 0,
    seedKey: fd.input.seedKey,
    epoch: 0,
    prosperity: d.prosperity,
    density: d.density,
    rung: fd.input.rung,
    bands: fd.bands,
    walled: false,
    ways: new Map(),
    widths: fd.widths,
    live: (fd.input.live ?? []).slice(),
    ...(fd.input.tables === undefined ? {} : { tables: fd.input.tables }),
    ...(fd.input.deepFactor === undefined ? {} : { deepFactor: fd.input.deepFactor }),
  };
}

/**
 * Runs a one-face district's S8 batch and replays its cuts (see the module comment). The batch runs in a transaction
 * that is rejected at the end, so the arena is left as it was; `overLimit` says the batch passed S8's own transaction
 * limit (the run would have been refused), in which case the caller takes S8's own run instead.
 */
export function replayDistrict(fd: FaceDistrict, kind: BentCutFaceKind): ReplayResult | { readonly error: string } {
  const d = fd.input.districts[0];
  const ctx = contextOf(fd);
  const batch = districtBatch(fd.plat, d.district, [], ctx);
  const limit = batch.spec.workLimit;
  const cutT = ctx.tables?.cut ?? loadTable('cut');
  const [eLoM, eHiM] = blockDepthRange(fd.bands, undefined);
  const planBase: PlanContext = { depthRangeM: [eLoM, eHiM], minFrontageM: minFrontage(fd.bands), cutKind: 'way', table: cutT };
  const cells = cutCells(cutT);
  const wMinCm = minFrontage(fd.bands) * 100;
  let result: ReplayResult | { error: string } = { error: 'the batch did not run' };
  fd.k.tx({ ...batch.spec, workLimit: Number.MAX_SAFE_INTEGER }, (o) => {
    const r = batch.fn(o);
    if (!r.ok) {
      result = { error: `${r.code} ${r.detail}` };
      return err('E_INVARIANT', 'replay: the batch failed');
    }
    const overLimit = o.work.total > limit;
    const facesAfter = districtFaces(o.plat, d.district.id);
    const part = r.value;
    const report = part.report;
    const lanes = part.ways;
    const made = report.rungs.filter((x) => x.outcome === 'cut' || x.outcome === 'slit');
    const cuts: SignatureCut[] = [];
    const misses: string[] = [];
    let planner = 0;
    let fallback = 0;
    let deep = 0;
    let matched = 0;
    let missed = 0;
    const miss = (why: string): void => {
      missed += 1;
      if (misses.length < 4) misses.push(why);
    };
    if (made.length !== lanes.length) {
      result = { report, partition: part, cuts, counts: { cuts: lanes.length, planner: 0, fallback: 0, deep: 0, matched: 0, missed: lanes.length, misses: [`${String(made.length)} cut rungs for ${String(lanes.length)} lanes`] }, overLimit, facesAfter };
      return err('E_INVARIANT', 'replay: rejected');
    }
    const stops = new Map<string, StopUse>(report.stops.map((s) => [s.face, s]));
    // The junction rows each lane's insertion wrote (a fresh `end` junction carries [lane], a fresh `T` [spine, lane]).
    const rowsOf = new Map<Id, Id[]>();
    for (const j of part.junctions) {
      const by = j.arms.length === 1 ? j.arms[0] : j.arms[1];
      const list = rowsOf.get(by);
      if (list === undefined) rowsOf.set(by, [j.id]);
      else list.push(j.id);
    }
    const rng = createRng();
    for (let i = lanes.length - 1; i >= 0; i -= 1) {
      const lane = lanes[i];
      const rung = made[i];
      const runs = chainRuns(o.plat, GROUND, { role: 'way', entity: lane.id });
      const committed: XY[] = runs.length === 1 ? runs[0] : [];
      for (const jid of rowsOf.get(lane.id) ?? []) removeEdges(o, { role: 'junction', entity: jid });
      const out = removeEdges(o, { role: 'way', entity: lane.id });
      if (rung.rung === 'deep') {
        deep += 1;
        continue;
      }
      if (rung.rung !== 'a') {
        fallback += 1;
        continue;
      }
      planner += 1;
      if (!out.ok) {
        miss(`lane ${String(i)}: removeEdges ${out.code}`);
        continue;
      }
      if (committed.length < 2) {
        miss(`lane ${String(i)}: ${String(runs.length)} runs`);
        continue;
      }
      const m = Math.floor((committed.length - 1) / 2);
      const q = { x: Math.round((committed[m].x + committed[m + 1].x) / 2), y: Math.round((committed[m].y + committed[m + 1].y) / 2) } as LatticePoint;
      const at = pointLocate(o.plat, GROUND, 1, q);
      if (at.on !== 'face' || at.level !== 1) {
        miss(`lane ${String(i)}: its point lies on a ${at.on}`);
        continue;
      }
      const kf = kerbFaceOf(o, at.face, fd.widths);
      const stop = stops.get(rung.face);
      if (kf === null || stop === undefined) {
        miss(`lane ${String(i)}: ${kf === null ? 'no kerb' : 'no stop record'}`);
        continue;
      }
      const streams: PlanStreams = { rng, faceKey: entityKey(fd.input.seedKey, stop.lineage, GROUND), entity: addressOf('face', stop.lineage, GROUND), reroll: 0, epoch: 0 };
      const p0 = planCut(kf, planBase, streams);
      const plan0 = p0.ok ? p0.value : p0.partial;
      if (plan0 === undefined || plan0.stop.uniforms.some((u, ix) => u !== stop.uniforms[ix])) {
        miss(`lane ${String(i)}: the stop draw differs`);
        continue;
      }
      const pk = rung.attempt === 0 ? p0 : planCut(kf, { ...planBase, attempt: rung.attempt, stop: plan0.stop }, streams);
      if (!pk.ok || pk.value.kind !== 'cut') {
        miss(`lane ${String(i)}: the replayed plan is ${pk.ok ? pk.value.kind : pk.code}`);
        continue;
      }
      const plan = pk.value;
      const g = [plan.cut, plan.alternate].find((x): x is CutGeometry => x !== null && (() => {
        const c = snapChain(x.chain);
        return c !== null && lands(c, committed);
      })());
      if (g === undefined) {
        miss(`lane ${String(i)}: the replayed chain does not land on the lane`);
        continue;
      }
      const f0 = workingFrame(kf, 0, { cells });
      if (!f0.ok) {
        miss(`lane ${String(i)}: no first frame`);
        continue;
      }
      matched += 1;
      cuts.push(measureCut(kind, sampleOf(plan, g, lineOf(f0.value), wMinCm)));
    }
    cuts.reverse();
    result = { report, partition: part, cuts, counts: { cuts: lanes.length, planner, fallback, deep, matched, missed, misses }, overLimit, facesAfter };
    return err('E_INVARIANT', 'replay: rejected on purpose (nothing commits)');
  });
  return result;
}
