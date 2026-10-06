// The bent-cut planner, steps 1–7 of §4.6's recipe (M0-b-02; §4.6, §6.1's cut.* rows, §3.4's obb / sideRuns, §3.7's
// kerb; §13.2's T34-1 τ formula, T36-1, T37-1 and T38-1's shape clauses). A pure function of a face's kerb rings, the
// district's context and the face's streams: it reads no arena and writes nothing — the transaction, the ladder,
// the width, continuation and recursion (steps 8–11) are M0-b-03's, which inserts what this plans.
//
//   1  stop test      obb(F); τ = e_lo · (e_hi / e_lo)^g by dmath.pow, g = bell4 on cut.stop (four uniforms, keyed by
//                     the face's lineage, attempt 0, never retried); the face is a block when its minor extent < τ.
//                     The slope term turns the working major axis toward the contour (a switch: off without a slope,
//                     under a parity preset, or at a slope ≤ 5 %); a ladder attempt k turns it by k × 36° (step 8 (a)).
//   2  position       f = (c + b) / 2, b = mean3 on cut.t; on a holed face f = m + (1 − 2m) · b, m = min(0.45, e_lo / L).
//   3  start          the minor-axis line at f meets F in one segment (the one around the OBB centre's projection);
//                     A is its end on the run most nearly parallel to the working major axis (ties: the earlier run).
//   4  corner         the first leg leaves A along its run's inward normal; λ to the boundary; K at o + (λ − 2o) · b
//                     (b = mean3 on cut.t; o = e_lo, e_lo / 2 on a holed face), or λ / 2 when λ < 2o.
//   5  far side       among the runs facing the first leg whose perpendicular foot from K lies on them and whose K–foot
//                     crosses no boundary, the one meeting the first leg nearest a right angle (ties: earlier); none →
//                     E_NOT_TWO_CROSSINGS. cut.bendMode: flatten drops K below max(cut.flattenM, 0.02 |A–foot|);
//                     straightFirst keeps the first leg straight when its arrival's squared cross product > 0.99.
//   6  fillet         lane and street cuts only: sharp with chance s + (1 − s) · min(1, w_min / ℓ), s = (1 − cos δ) / 2,
//                     one uniform on cut.arc per kept corner; else the kernel's fillet spanning the shorter leg,
//                     chords ≥ w_min or minEdge, ≥ 3 samples, inside the face — or the corner stays sharp.
//   7  ends           each end extended along its arrival to the crossed spine (the T-junction's planned point); an end
//                     with no spine (a strip's setback line) stays square on the kerb; an end on a hole → connectHole;
//                     an end inside an existing portal's gap slides along the spine toward the side keeping its arrival
//                     within 85–95°, else the plan returns 'next rung'.
//
// Every angle test is a dot or cross product against a table cell (no inverse trigonometric call); every power goes
// through dmath.pow and every division through ratio() (§6.5 (3), §3.2 (8)). Every constant is a cut.json cell read
// with its preset value (§7.6) or the design's arithmetic. Readings and open cases: C-0216.
import {
  CONCERNS,
  dmath,
  err,
  fillet,
  keyText,
  LATTICE,
  obb,
  ok,
  ratio,
  STAGES,
  type ConcernId,
  type Hash128,
  type KernelResult,
  type KeyComponents,
  type LatticePoint,
  type Obb,
  type Rng,
  type Stream,
} from '@plat/kernel';
import { loadTable, type Cell, type PresetId, type Table } from '@plat/tables';
import {
  along,
  canonicalRings,
  cross,
  dot,
  faceSides,
  insideFace,
  leftOf,
  len,
  lengthAt,
  lineCrossings,
  lineLength,
  nearestOnSegment,
  pointAtLength,
  rayHit,
  runAt,
  segmentClear,
  sideDir,
  sub,
  unit,
  type FaceSides,
  type XY,
} from './sides.js';

export type { XY } from './sides.js';

// ---------------------------------------------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------------------------------------------

/** An existing portal on a district-bounding spine (§4.6 step 7; the minimal `Seam` record, C-0046). */
export interface KerbPortal {
  /** The portal vertex. */
  readonly at: XY;
  /** The width of the lane already ending there (cm). */
  readonly laneWidthCm: number;
}

/** A spine bounding the face: the way whose buffered corridor the kerb stops at (§3.7). */
export interface KerbSpine {
  /** Its L1 route near the face (cm). */
  readonly points: readonly XY[];
  /** Its half-width there (cm): the corridor the kerb is offset by. */
  readonly halfWidthCm: number;
  /** Does it bound the district — an arterial or a boundary secondary, a chain two districts share (J-P32)? */
  readonly bounding?: boolean;
  /** Its existing baseLane portals (only read on a bounding spine). */
  readonly portals?: readonly KerbPortal[];
}

/**
 * A face as the planner reads it: `kerb(F)`'s rings (the outer ring, then its holes, §3.7) and the spines that bound it
 * (for step 7's ends). A boundary with no spine — a wall strip's setback line, a shore, the border — is simply not
 * listed: an end there stays square on the kerb.
 */
export interface KerbFace {
  readonly rings: readonly (readonly LatticePoint[])[];
  readonly spines?: readonly KerbSpine[];
}

/** A face's mean slope and contour direction (§4.6 step 1's slope term; the field is M0-e-05's, M1's classes). */
export interface FaceSlope {
  /** The face's mean slope (rise over run). */
  readonly meanSlope: number;
  /** A contour direction (any length, either sign). */
  readonly contour: XY;
}

/** The district's context for one face's plan. */
export interface PlanContext {
  /** The district's block-depth range [e_lo, e_hi] in metres (M0-b-01's `blockDepthRange`, §4.6 step 1). */
  readonly depthRangeM: readonly [number, number];
  /** w_min (m): the district's minimum plot frontage (M0-b-01's `minFrontage`, §4.6 step 6). */
  readonly minFrontageM: number;
  /** The cut's class: S8's way cuts (lane, alley, secondary) or a plot cut, which is never filleted (§4.6 step 6). */
  readonly cutKind?: 'way' | 'plot';
  /** The ladder attempt (§6.1's attempt component; step 8 (a)'s frame k, turned by k × 36°); default 0. */
  readonly attempt?: number;
  /** The face's stop draw from its first plan: a later attempt re-plans steps 2–7 only and never redraws cut.stop. */
  readonly stop?: StopRecord;
  /** The face's slope (absent on a flat site: the slope term is 0). */
  readonly slope?: FaceSlope;
  /** A parity preset (§7.6): its per-preset cell values, its option extensions switched off. */
  readonly preset?: PresetId;
  /** The cut table (default the shipped cut.json). */
  readonly table?: Table;
  /** The width of the lane being planned, for the portal gap (cm); default the lane band's top (C-0216 (9)). */
  readonly newLaneWidthCm?: number;
  /** The kerb's corner scale, sideRuns' `arcMaxCm` (cm); default the face's widest spine half-width (C-0216 (4)). */
  readonly cornerScaleCm?: number;
}

/** The face's streams (§6.1): the derivation's Rng and the face's entity key (its lineage's). */
export interface PlanStreams {
  readonly rng: Rng;
  /** The face's entity key: every draw of the plan is keyed by the face's lineage (§6.1's cut.stop row). */
  readonly faceKey: Readonly<Hash128>;
  /** The face's address id, for the report's textual keys only. */
  readonly entity: string;
  readonly reroll?: number;
  readonly epoch?: number;
}

// ---------------------------------------------------------------------------------------------------------------
// The table's cells
// ---------------------------------------------------------------------------------------------------------------

/** The cut table's cells the planner reads, in centimetres, centidegrees and ratios. */
export interface CutCells {
  readonly turnTolCdeg: number;
  readonly tangentWindowCm: number;
  readonly holedMarginMax: number;
  readonly holedOffsetShare: number;
  readonly minSamplePoints: number;
  readonly bendMode: 'flatten' | 'straightFirst';
  readonly flattenCm: number;
  readonly flattenShare: number;
  readonly straightCross2: number;
  readonly portalGapMinCm: number;
  readonly portalGapLaneFactor: number;
  readonly portalArrivalCdeg: readonly [number, number];
  readonly laneWidthCm: readonly [number, number];
  readonly ladderTurnCdeg: number;
  readonly maxFrames: number;
  /** The slope term's cells, or null when its option is switched off (a parity preset, §7.6). */
  readonly slope: { readonly threshold: number; readonly weightMax: number; readonly scale: number } | null;
}

const M_TO_CM = 100;

function cellValue(t: Table, row: string, name: string, preset: PresetId | undefined): unknown {
  const c: Cell = t.cell(row, name);
  const p = preset === undefined ? undefined : c.presets?.[preset];
  return p === undefined ? c.value : p.value;
}

function num(t: Table, row: string, name: string, preset: PresetId | undefined): number {
  const v = cellValue(t, row, name, preset);
  if (typeof v !== 'number' || !Number.isFinite(v)) throw new RangeError(`planner: cut/${row}/${name} is not a finite number`);
  return v;
}

function pair(t: Table, row: string, name: string, preset: PresetId | undefined): [number, number] {
  const v = cellValue(t, row, name, preset);
  if (!Array.isArray(v) || v.length !== 2 || typeof v[0] !== 'number' || typeof v[1] !== 'number' || !(v[0] <= v[1])) {
    throw new RangeError(`planner: cut/${row}/${name} is not a range [lo, hi]`);
  }
  return [v[0], v[1]];
}

/** Is a cell's extension an option the preset switches off (§7.6: parity presets set every option off)? */
function optionOff(t: Table, row: string, name: string, preset: PresetId | undefined): boolean {
  return preset !== undefined && t.cell(row, name).extension?.mode === 'option';
}

/** The planner's cells from the cut table at a preset (its per-preset values; its option extensions off). */
export function cutCells(table: Table = loadTable('cut'), preset?: PresetId): CutCells {
  if (table.id !== 'cut') throw new RangeError(`planner: the cut cells read the cut table, not '${table.id}'`);
  const mode = cellValue(table, 'settings', 'bendMode', preset);
  if (mode !== 'flatten' && mode !== 'straightFirst') throw new RangeError(`planner: cut/settings/bendMode '${String(mode)}' is not flatten or straightFirst`);
  const slopeOff = optionOff(table, 'slope', 'thresholdSlope', preset);
  const scale = num(table, 'slope', 'slopeScale', preset);
  if (!(scale > 0)) throw new RangeError('planner: cut/slope/slopeScale must be positive');
  const lane = pair(table, 'width', 'laneM', preset);
  return {
    turnTolCdeg: num(table, 'sides', 'turnTolCdeg', preset),
    tangentWindowCm: num(table, 'sides', 'tangentWindowM', preset) * M_TO_CM,
    holedMarginMax: num(table, 't', 'holedMarginMax', preset),
    holedOffsetShare: num(table, 'corner', 'holedOffsetShare', preset),
    minSamplePoints: num(table, 'arc', 'minSamplePoints', preset),
    bendMode: mode,
    flattenCm: num(table, 'settings', 'flattenM', preset) * M_TO_CM,
    flattenShare: num(table, 'settings', 'flattenShare', preset),
    straightCross2: num(table, 'settings', 'straightCross2', preset),
    portalGapMinCm: num(table, 'settings', 'portalGapMinM', preset) * M_TO_CM,
    portalGapLaneFactor: num(table, 'settings', 'portalGapLaneFactor', preset),
    portalArrivalCdeg: pair(table, 'settings', 'portalArrivalCdeg', preset),
    laneWidthCm: [lane[0] * M_TO_CM, lane[1] * M_TO_CM],
    ladderTurnCdeg: num(table, 'ladder', 'turnCdeg', preset),
    maxFrames: num(table, 'ladder', 'maxFrames', preset),
    slope: slopeOff
      ? null
      : { threshold: num(table, 'slope', 'thresholdSlope', preset), weightMax: num(table, 'slope', 'weightMax', preset), scale },
  };
}

// ---------------------------------------------------------------------------------------------------------------
// The draws
// ---------------------------------------------------------------------------------------------------------------

/** One draw the plan used: its concern, the stream key's components, its uniforms and the value it gave. */
export class DrawRecord {
  readonly concern: 'cut.stop' | 'cut.t' | 'cut.arc';
  /** What it was for. */
  readonly step: 'stop' | 'position' | 'corner' | 'fillet';
  readonly key: KeyComponents;
  readonly uniforms: readonly number[];
  readonly value: number;

  constructor(concern: DrawRecord['concern'], step: DrawRecord['step'], key: KeyComponents, uniforms: readonly number[], value: number) {
    this.concern = concern;
    this.step = step;
    this.key = key;
    this.uniforms = uniforms;
    this.value = value;
  }

  /** The stream key's textual form, rendered for the report only (§6.1: no string on the generation path). */
  get text(): string {
    return keyText(this.key);
  }
}

/** The stop test's draw (§4.6 step 1): kept with the face, replayed by T34-1's commit clause (M0-b-03). */
export interface StopRecord {
  /** The four uniforms of cut.stop, in draw order. */
  readonly uniforms: readonly [number, number, number, number];
  /** g = |(u₁ + u₂ + u₃ + u₄) / 2 − 1| (bell4). */
  readonly g: number;
  /** τ in cm. */
  readonly tauCm: number;
  readonly draw: DrawRecord;
}

const CONCERN_ID: Readonly<Record<DrawRecord['concern'], ConcernId>> = Object.freeze({
  'cut.stop': CONCERNS['cut.stop'],
  'cut.t': CONCERNS['cut.t'],
  'cut.arc': CONCERNS['cut.arc'],
});

class Draws {
  readonly used: DrawRecord[] = [];
  private readonly streams: PlanStreams;
  private readonly attempt: number;
  private t: Stream | null = null;
  private arc: Stream | null = null;

  constructor(streams: PlanStreams, attempt: number) {
    this.streams = streams;
    this.attempt = attempt;
  }

  private opts(attempt: number): { reroll: number; attempt: number; epoch: number; salt: number } {
    return { reroll: this.streams.reroll ?? 0, attempt, epoch: this.streams.epoch ?? 0, salt: 0 };
  }

  private key(concern: DrawRecord['concern'], attempt: number): KeyComponents {
    return { entity: this.streams.entity, stage: STAGES.S8, concern: CONCERN_ID[concern], ...this.opts(attempt) };
  }

  private stream(concern: DrawRecord['concern'], attempt: number): Stream {
    return this.streams.rng.stream(this.streams.faceKey, STAGES.S8, CONCERN_ID[concern], this.opts(attempt));
  }

  /** cut.stop: four uniforms folded into bell4's g — keyed at attempt 0 always (never retried, §6.1). */
  stop(): { uniforms: [number, number, number, number]; g: number; draw: DrawRecord } {
    const s = this.stream('cut.stop', 0);
    const u: [number, number, number, number] = [s.float01(), s.float01(), s.float01(), s.float01()];
    // Stream.bell4()'s arithmetic on the same four uniforms, in its order (test: bell4 on a twin stream, to the bit).
    const g = Math.abs((u[0] + u[1] + u[2] + u[3]) * 0.5 - 1);
    const draw = new DrawRecord('cut.stop', 'stop', this.key('cut.stop', 0), u, g);
    this.used.push(draw);
    return { uniforms: u, g, draw };
  }

  /** cut.t: three uniforms averaged (mean3), on this attempt's stream: step 2's, then step 4's. */
  mean3(step: 'position' | 'corner'): number {
    this.t ??= this.stream('cut.t', this.attempt);
    const u = [this.t.float01(), this.t.float01(), this.t.float01()];
    const b = (u[0] + u[1] + u[2]) / 3;
    this.used.push(new DrawRecord('cut.t', step, this.key('cut.t', this.attempt), u, b));
    return b;
  }

  /** cut.arc: one uniform per kept corner (step 6), on this attempt's stream. */
  arcUniform(): number {
    this.arc ??= this.stream('cut.arc', this.attempt);
    const u = this.arc.float01();
    this.used.push(new DrawRecord('cut.arc', 'fillet', this.key('cut.arc', this.attempt), [u], u));
    return u;
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Step 1: the stop threshold and the working frame
// ---------------------------------------------------------------------------------------------------------------

/**
 * τ = e_lo · (e_hi / e_lo)^g (§4.6 step 1; the power by dmath.pow), for g ∈ [0, 1] and 0 < e_lo ≤ e_hi (cm). The
 * result is clamped to [e_lo, e_hi]: e_lo · (e_hi / e_lo) rounds one ulp above e_hi in about 5 % of pairs (C-0137
 * (4)), and §4.6 states τ ∈ [e_lo, e_hi] (C-0216 (5)).
 */
export function stopThreshold(eLoCm: number, eHiCm: number, g: number): number {
  if (!(eLoCm >= LATTICE.unitCm && eHiCm >= eLoCm && eHiCm < Infinity)) {
    throw new RangeError(`planner: the block-depth range must satisfy 1 cm ≤ e_lo ≤ e_hi, got [${String(eLoCm)}, ${String(eHiCm)}] cm`);
  }
  if (!(g >= 0 && g <= 1)) throw new RangeError(`planner: g must lie in [0, 1], got ${String(g)}`);
  const q = ratio(eHiCm, eLoCm, 'length');
  const tau = eLoCm * dmath.pow(q.ok ? q.value : 1, g);
  return tau < eLoCm ? eLoCm : tau > eHiCm ? eHiCm : tau;
}

/** The working frame of a face (§4.6 steps 1–3; step 8 (a)'s turned frames). */
export interface WorkingFrame {
  /** The outer ring's OBB (§3.4). */
  readonly obb: Obb;
  /** The OBB's centre: the axis passes through it. */
  readonly centre: XY;
  /** The working major axis (a unit vector) and its counter-clockwise normal, the minor axis. */
  readonly major: XY;
  readonly minor: XY;
  /** The slope term's weight (0 when the term is off or the slope is at most the threshold). */
  readonly slopeWeight: number;
  /** The frame's turn (cdeg). */
  readonly turnCdeg: number;
  /** The outer ring's extent along the major axis, from the centre: [sMin, sMax], and its length L = sMax − sMin. */
  readonly sMin: number;
  readonly sMax: number;
  readonly lengthCm: number;
}

/** π (Math.PI is outside §6.5 (3)'s allowlist). */
const PI = 3.141592653589793;
const RAD_PER_CDEG = PI / 18000;

function rotate(v: XY, rad: number): XY {
  const c = dmath.cos(rad);
  const s = dmath.sin(rad);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c };
}

/**
 * The slope term's weight (§4.6 step 1, COV-MFCG-C05): min(weightMax, slope / scale) on a face whose mean slope
 * exceeds the threshold, else 0; 0 when the term is switched off.
 */
export function slopeWeight(slope: number, cells: CutCells['slope']): number {
  if (cells === null || !(slope > cells.threshold)) return 0;
  // eslint-disable-next-line plat/ratio-division -- the table's slope scale, a positive cell checked by cutCells()
  const w = slope / cells.scale;
  return w < cells.weightMax ? w : cells.weightMax;
}

/**
 * The OBB major axis rotated toward the contour line by the weight (C-0216 (6)): by weight × the signed angle from
 * the axis line to the contour line, taken in (−90°, 90°] — lines, not directions — through dmath.atan2.
 */
export function towardContour(major: XY, contour: XY, weight: number): XY {
  if (!(weight > 0)) return major;
  const c = unit(contour);
  if (c === null) return major;
  let theta = dmath.atan2(cross(major, c), dot(major, c));
  if (theta > PI / 2) theta -= PI;
  else if (theta <= -PI / 2) theta += PI;
  return rotate(major, theta * weight);
}

/**
 * The face's working frame (§4.6): the outer ring's OBB, its major axis turned toward the contour by the slope term
 * and then by `turnCdeg` (step 8 (a)'s k × 36°), with the outer ring's extent along it. E_DEGENERATE `collinear` for a
 * ring with no area (obb's contract, GEO-7).
 */
export function workingFrame(face: KerbFace, turnCdeg: number, opts: { slope?: FaceSlope; cells?: CutCells } = {}): KernelResult<WorkingFrame> {
  const rings = canonicalRings(face.rings);
  if (rings.length === 0) return err('E_DEGENERATE', 'collinear');
  return frameOf(rings, turnCdeg, opts.slope, (opts.cells ?? cutCells()).slope);
}

function frameOf(rings: readonly (readonly LatticePoint[])[], turnCdeg: number, slope: FaceSlope | undefined, slopeCells: CutCells['slope']): KernelResult<WorkingFrame> {
  if (!Number.isFinite(turnCdeg)) throw new RangeError(`planner: turnCdeg must be finite, got ${String(turnCdeg)}`);
  const box = obb(rings[0]);
  if (!box.ok) return err(box.code, box.detail);
  const w = slope === undefined ? 0 : slopeWeight(slope.meanSlope, slopeCells);
  let major: XY = w > 0 && slope !== undefined ? towardContour(box.value.major, slope.contour, w) : box.value.major;
  if (turnCdeg !== 0) major = rotate(major, turnCdeg * RAD_PER_CDEG);
  const centre = box.value.centre;
  let sMin = Infinity;
  let sMax = -Infinity;
  for (const p of rings[0]) {
    const s = dot(sub(p, centre), major);
    if (s < sMin) sMin = s;
    if (s > sMax) sMax = s;
  }
  return ok({ obb: box.value, centre, major, minor: leftOf(major), slopeWeight: w, turnCdeg, sMin, sMax, lengthCm: sMax - sMin });
}

// ---------------------------------------------------------------------------------------------------------------
// The plan
// ---------------------------------------------------------------------------------------------------------------

/** A cut end (§4.6 step 7). */
export interface EndPlan {
  /**
   * `spine`: extended along its arrival to the crossed spine, a T-junction there; `kerb`: no spine beyond it (a wall
   * strip's setback line, a shore, the border) — it stays square on the kerb; `hole`: on a hole, joined by connectHole.
   */
  readonly kind: 'spine' | 'kerb' | 'hole';
  /** The end on the kerb. */
  readonly kerbPoint: XY;
  /** The planned junction point: on the spine for `spine`, the kerb point otherwise. */
  readonly point: XY;
  /** The unit direction the cut arrives along (outward). */
  readonly arrival: XY;
  /** The spine's index in `KerbFace.spines` (`spine`), the hole's ring index (`hole`), else −1. */
  readonly index: number;
  /** How far the end slid out of a portal's gap along the spine (cm; 0 when it did not). */
  readonly slidCm: number;
}

/** The kept corner's fillet decision (§4.6 step 6). */
export interface FilletPlan {
  /** cos δ of the legs' unit directions, the sharp chance and the cut.arc uniform (null on a plot cut). */
  readonly cosDelta: number;
  readonly pSharp: number;
  readonly u: number | null;
  /** Whether an arc replaced K. */
  readonly filleted: boolean;
  /** The arc's samples from the tangent point on one leg to the one on the other ([] when sharp). */
  readonly arc: readonly XY[];
  /** Why a drawn arc was left sharp: `plot` (a plot cut), `drawn` (the draw kept it), `samples`, `outside`, or null. */
  readonly sharpBecause: 'plot' | 'drawn' | 'samples' | 'outside' | 'fit' | null;
  /** The chord length the arc was sampled at (cm). */
  readonly chordCm: number;
}

/** A planned cut's geometry. */
export interface CutGeometry {
  /** The cut on the kerb: [A, K, foot] when bent, [A, end] when straight — before the fillet. */
  readonly legs: readonly XY[];
  /** Whether K was kept. */
  readonly bent: boolean;
  /** The triangle A–K–foot's height at K (cm), and the flatten threshold it was held against (flatten mode). */
  readonly heightCm: number;
  readonly flattenThresholdCm: number;
  /** straightFirst: the first leg's arrival's squared cross product with the run it hits (−1 when not tested). */
  readonly arrivalCross2: number;
  /** The fillet at a kept corner (null when straight). */
  readonly fillet: FilletPlan | null;
  /** The cut's points on the kerb with the fillet's arc in place of K. */
  readonly points: readonly XY[];
  /** The two ends: [start, far]. */
  readonly ends: readonly [EndPlan, EndPlan];
  /** The chain to insert: the start's junction point, the cut's points, the far junction point. */
  readonly chain: readonly XY[];
}

/** The start (§4.6 step 3). */
export interface StartPlan {
  readonly f: number;
  /** c: the area centroid's relative position (null on a holed face, whose law has no centroid term). */
  readonly c: number | null;
  /** m: the holed law's margin (null on a plain face). */
  readonly m: number | null;
  readonly A: XY;
  /** A's run index in `CutPlan.sides.runs`, its ring and its inward normal (the first leg's direction). */
  readonly run: number;
  readonly ring: number;
  readonly normal: XY;
  /** The other candidate start (the segment's other end) and its run. */
  readonly other: XY;
  readonly otherRun: number;
}

/** The corner (§4.6 step 4). */
export interface CornerPlan {
  readonly lambdaCm: number;
  readonly oCm: number;
  readonly b: number;
  /** K's distance from A along the first leg. */
  readonly atCm: number;
  readonly K: XY;
  /** The first leg's hit on the boundary (A + λ · normal) and its ring. */
  readonly hit: XY;
  readonly hitRing: number;
}

/** The far side (§4.6 step 5). */
export interface FarPlan {
  readonly run: number;
  readonly foot: XY;
  /** The far run's direction at the foot (its chord, or its tangent on a curved run). */
  readonly dir: XY;
  /** The run's outward normal at the foot (rung (b)'s mean normal reads it). */
  readonly outward: XY;
}

interface PlanBase {
  /** The face's stop draw and its OBB minor extent (cm). */
  readonly stop: StopRecord;
  readonly minorCm: number;
  /** Every draw the plan used, in order. */
  readonly draws: readonly DrawRecord[];
  readonly attempt: number;
}

/** The face stops as a block (§4.6 step 1). */
export interface BlockPlan extends PlanBase {
  readonly kind: 'block';
}

/** A planned cut (§4.6 steps 2–7). */
export interface CutPlanned extends PlanBase {
  readonly kind: 'cut';
  readonly frame: WorkingFrame;
  readonly sides: FaceSides;
  readonly start: StartPlan;
  readonly corner: CornerPlan;
  readonly far: FarPlan | null;
  readonly mode: 'flatten' | 'straightFirst';
  readonly cut: CutGeometry;
  /**
   * Under straightFirst, when the straight cut was taken: the cut planned as under flatten, which the transaction
   * takes when the straight one fails step 8's checks (C-0216 (7)).
   */
  readonly alternate: CutGeometry | null;
}

/** The cut cannot be placed: an end lies in a portal's gap and neither slide keeps its arrival (§4.6 step 7). */
export interface NextRungPlan extends PlanBase {
  readonly kind: 'nextRung';
  readonly reason: 'portalGap';
  readonly frame: WorkingFrame;
  readonly sides: FaceSides;
  readonly start: StartPlan;
  readonly corner: CornerPlan;
  readonly far: FarPlan | null;
}

/** The partial plan E_NOT_TWO_CROSSINGS carries: what steps 2–4 found (rung (b)'s mean normal reads `start.normal`). */
export interface FailedPlan extends PlanBase {
  readonly kind: 'failed';
  readonly frame: WorkingFrame;
  readonly sides: FaceSides;
  readonly start: StartPlan | null;
  readonly corner: CornerPlan | null;
}

/** planCut's result: a block, a cut, or the next ladder rung; E_NOT_TWO_CROSSINGS carries a FailedPlan. */
export type CutPlan = BlockPlan | CutPlanned | NextRungPlan | FailedPlan;

// ---------------------------------------------------------------------------------------------------------------
// planCut
// ---------------------------------------------------------------------------------------------------------------

/** The tolerance (cm) for a touch at a segment's end and for a hit too near its origin: half a lattice unit. */
const TOUCH_CM = 0.5;

function checkContext(ctx: PlanContext, cells: CutCells): { eLo: number; eHi: number; wMin: number; attempt: number } {
  const [lo, hi] = ctx.depthRangeM;
  const eLo = lo * M_TO_CM;
  const eHi = hi * M_TO_CM;
  if (!(eLo >= LATTICE.unitCm && eHi >= eLo && eHi < Infinity)) {
    throw new RangeError(`planner: depthRangeM must satisfy 0.01 m ≤ e_lo ≤ e_hi, got [${String(lo)}, ${String(hi)}]`);
  }
  const wMin = ctx.minFrontageM * M_TO_CM;
  if (!(wMin > 0 && wMin < Infinity)) throw new RangeError(`planner: minFrontageM must be positive, got ${String(ctx.minFrontageM)}`);
  const attempt = ctx.attempt ?? 0;
  if (!(Number.isInteger(attempt) && attempt >= 0 && attempt < cells.maxFrames)) {
    throw new RangeError(`planner: attempt must be an integer in [0, ${String(cells.maxFrames - 1)}], got ${String(attempt)}`);
  }
  if (attempt > 0 && ctx.stop === undefined) throw new RangeError('planner: a later attempt re-plans steps 2–7 only: pass the face\'s stop record');
  return { eLo, eHi, wMin, attempt };
}

/** The face's widest spine half-width (cm): the scale of its kerb's round-joined corners (C-0216 (4)). */
function cornerScale(face: KerbFace): number {
  let w = 0;
  for (const s of face.spines ?? []) if (s.halfWidthCm > w) w = s.halfWidthCm;
  return w;
}

/** The area centroid of a ring (shoelace about its first vertex). */
function centroid(ring: readonly LatticePoint[]): XY | null {
  const o = ring[0];
  let a2 = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const p = sub(ring[i], o);
    const q = sub(ring[i + 1 === ring.length ? 0 : i + 1], o);
    const c = cross(p, q);
    a2 += c;
    cx += (p.x + q.x) * c;
    cy += (p.y + q.y) * c;
  }
  const x = ratio(cx, 3 * a2, 'area');
  const y = ratio(cy, 3 * a2, 'area');
  if (!x.ok || !y.ok) return null;
  return { x: o.x + x.value, y: o.y + y.value };
}

/**
 * Step 3's start for a position f (§4.6): the minor-axis line at f, the segment of it inside F around the OBB centre's
 * projection (else the nearest, ties the lower), its two ends the candidates, A the one on the run whose chord is most
 * nearly parallel to the major axis (the smaller squared cross product; ties the earlier run; one run, the lower end).
 * Draws nothing: a pure function of the face, the frame and f (T36-1). Null when the line misses the face.
 */
export function startOf(sides: FaceSides, frame: WorkingFrame, f: number): Omit<StartPlan, 'f' | 'c' | 'm'> | null {
  const P = along(frame.centre, frame.major, frame.sMin + f * frame.lengthCm);
  const xs = lineCrossings(sides.rings, P, frame.minor);
  if (xs.length < 2) return null;
  let pick = -1;
  let pickD = Infinity;
  for (let i = 0; i + 1 < xs.length; i += 2) {
    const lo = xs[i].t;
    const hi = xs[i + 1].t;
    const d = lo <= 0 && hi >= 0 ? 0 : lo > 0 ? lo : -hi;
    if (d < pickD) {
      pickD = d;
      pick = i;
    }
  }
  const lo = xs[pick];
  const hi = xs[pick + 1];
  const rLo = runAt(sides, lo.ring, lo.point);
  const rHi = runAt(sides, hi.ring, hi.point);
  if (rLo < 0 || rHi < 0) return null;
  const par = (r: number): number => {
    const c = cross(sides.runs[r].dir, frame.major);
    return c * c;
  };
  const pLo = par(rLo);
  const pHi = par(rHi);
  const takeHi = pHi < pLo || (pHi === pLo && rHi < rLo);
  const a = takeHi ? hi : lo;
  const b = takeHi ? lo : hi;
  const run = takeHi ? rHi : rLo;
  const normal = leftOf(sideDir(sides, sides.runs[run], a.point));
  return { A: a.point, run, ring: a.ring, normal, other: b.point, otherRun: takeHi ? rLo : rHi };
}

/** Bisection steps for a foot: the run's length ÷ 2⁶⁰, far below a lattice unit. */
const FOOT_STEPS = 60;

/**
 * The perpendicular foot from K on a run (§4.6 step 5; C-0216 (8)): the point p of the run's own vertices' polyline
 * where K − p is perpendicular to the run's direction there — its chord, or on a curved run its tangent over the ±
 * window (*Sides*) — found by bisection on arc length between samples (every vertex and edge midpoint) where
 * (K − p) · direction changes sign; the root nearest K (ties: the lower arc length). A foot within half a lattice unit
 * of the run's ends falls outside it. Null when no foot falls inside the run.
 */
function footOn(sides: FaceSides, r: number, K: XY): { foot: XY; dir: XY } | null {
  const run = sides.runs[r];
  const pts = run.points;
  const total = lineLength(pts);
  if (!(total > 2 * TOUCH_CM)) return null;
  const at = (s: number): { p: XY; d: XY; g: number } | null => {
    const q = pointAtLength(pts, s);
    if (q === null) return null;
    const d = sideDir(sides, run, q.p);
    return { p: q.p, d, g: dot(sub(K, q.p), d) };
  };
  const samples: number[] = [];
  let acc = 0;
  for (let i = 0; i + 1 < pts.length; i += 1) {
    const l = len(sub(pts[i + 1], pts[i]));
    samples.push(acc, acc + l / 2);
    acc += l;
  }
  samples.push(total);
  let best: { foot: XY; dir: XY; d2: number } | null = null;
  let prev = at(samples[0]);
  for (let i = 1; i < samples.length; i += 1) {
    const cur = at(samples[i]);
    if (prev === null || cur === null) {
      prev = cur;
      continue;
    }
    if (prev.g > 0 !== cur.g > 0) {
      let lo = samples[i - 1];
      let hi = samples[i];
      let gLo = prev.g;
      for (let k = 0; k < FOOT_STEPS; k += 1) {
        const mid = (lo + hi) / 2;
        const m = at(mid);
        if (m === null) break;
        if (m.g > 0 === gLo > 0) {
          lo = mid;
          gLo = m.g;
        } else hi = mid;
      }
      const s = (lo + hi) / 2;
      const root = at(s);
      if (root !== null && s > TOUCH_CM && s < total - TOUCH_CM) {
        const e = sub(K, root.p);
        const d2 = dot(e, e);
        if (best === null || d2 < best.d2) best = { foot: root.p, dir: root.d, d2 };
      }
    }
    prev = cur;
  }
  return best === null ? null : { foot: best.foot, dir: best.dir };
}

/**
 * Step 5's far run from K for a first leg along u1 (§4.6): among the runs facing the first leg (inward normal against
 * u1) with a perpendicular foot from K inside them and a K–foot crossing no boundary, the one whose direction at the
 * foot meets u1 nearest a right angle (the larger squared cross product; ties the earlier run). Draws nothing; null
 * when no run qualifies (E_NOT_TWO_CROSSINGS).
 */
export function farSide(sides: FaceSides, K: XY, u1: XY): FarPlan | null {
  let best: FarPlan | null = null;
  let bestScore = -1;
  for (let r = 0; r < sides.runs.length; r += 1) {
    const ft = footOn(sides, r, K);
    if (ft === null) continue;
    const inward = leftOf(ft.dir);
    if (!(dot(inward, u1) < 0)) continue;
    if (!(len(sub(ft.foot, K)) >= TOUCH_CM)) continue;
    if (!segmentClear(sides.rings, K, ft.foot, TOUCH_CM)) continue;
    const c = cross(u1, ft.dir);
    const score = c * c;
    if (score > bestScore) {
      bestScore = score;
      best = { run: r, foot: ft.foot, dir: ft.dir, outward: { x: -inward.x, y: -inward.y } };
    }
  }
  return best;
}

interface EndInput {
  readonly kerbPoint: XY;
  readonly ring: number;
  /** The neighbouring cut vertex the end is reached from. */
  readonly from: XY;
}

/** The squared-cosine bound of the portal arrival band: an arrival within [lo, hi] cdeg has dot² at most this. */
function arrivalDot2(cells: CutCells): number {
  const [lo, hi] = cells.portalArrivalCdeg;
  const a = dmath.cos(lo * RAD_PER_CDEG);
  const b = dmath.cos(hi * RAD_PER_CDEG);
  return Math.max(a * a, b * b);
}

/** The first spine the ray from an end crosses within reach (C-0216 (10)): 2 × its half-width + attractCm. */
function spineHit(face: KerbFace, from: XY, dir: XY): { spine: number; t: number; point: XY; seg: number } | null {
  let best: { spine: number; t: number; point: XY; seg: number } | null = null;
  (face.spines ?? []).forEach((sp, si) => {
    const reach = 2 * sp.halfWidthCm + LATTICE.attractCm;
    const pts = sp.points;
    for (let i = 0; i + 1 < pts.length; i += 1) {
      const a = pts[i];
      const b = pts[i + 1];
      const e = sub(b, a);
      const den = cross(dir, e);
      const w = sub(a, from);
      const t = ratio(cross(w, e), den, 'length');
      const u = ratio(cross(w, dir), den, 'length');
      if (!t.ok || !u.ok || !(u.value >= 0 && u.value <= 1) || !(t.value >= 0 && t.value <= reach)) continue;
      if (best === null || t.value < best.t) best = { spine: si, t: t.value, point: along(from, dir, t.value), seg: i };
    }
  });
  return best;
}

/** An end extended to its spine, or kept on the kerb or the hole (step 7, before any portal slide). */
function endOf(face: KerbFace, e: EndInput): EndPlan {
  const arrival = unit(sub(e.kerbPoint, e.from)) ?? { x: 0, y: 0 };
  if (e.ring > 0) return { kind: 'hole', kerbPoint: e.kerbPoint, point: e.kerbPoint, arrival, index: e.ring, slidCm: 0 };
  const h = spineHit(face, e.kerbPoint, arrival);
  if (h === null) return { kind: 'kerb', kerbPoint: e.kerbPoint, point: e.kerbPoint, arrival, index: -1, slidCm: 0 };
  return { kind: 'spine', kerbPoint: e.kerbPoint, point: h.point, arrival, index: h.spine, slidCm: 0 };
}

/** Does the leg from `from` arrive at the spine point within the portal arrival band? */
function arrivesSquare(spineDir: XY, from: XY, at: XY, bound: number): boolean {
  const u = unit(sub(at, from));
  if (u === null) return false;
  const d = dot(u, spineDir);
  return d * d <= bound;
}

/**
 * The portal-gap slide of one spine end (§4.6 step 7): an end inside max(6 m, 2 × the wider lane's width) of an
 * existing portal on a district-bounding spine moves along the spine to the gap's edge, toward the side that keeps
 * its arrival within the band (both: the nearer slide, then the lower arc length; C-0216 (9)), its kerb point where
 * the new leg meets the kerb. Null when neither side does; the end unchanged when it lies in no gap.
 */
function slideEnd(face: KerbFace, sides: FaceSides, end: EndPlan, from: XY, cells: CutCells, newLaneCm: number): EndPlan | null {
  if (end.kind !== 'spine') return end;
  const sp = (face.spines ?? [])[end.index];
  if (sp === undefined || sp.bounding !== true || (sp.portals ?? []).length === 0) return end;
  const line = sp.points;
  const total = lineLength(line);
  const sE = lengthAt(line, end.point);
  const gaps = (sp.portals ?? []).map((p) => ({
    s: lengthAt(line, p.at),
    gap: Math.max(cells.portalGapMinCm, cells.portalGapLaneFactor * Math.max(p.laneWidthCm, newLaneCm)),
  }));
  const inGap = (s: number): boolean => gaps.some((g) => Math.abs(s - g.s) < g.gap);
  if (!inGap(sE)) return end;
  const bound = arrivalDot2(cells);
  const options: { s: number; slid: number }[] = [];
  for (const g of gaps) {
    if (!(Math.abs(sE - g.s) < g.gap)) continue;
    for (const s of [g.s - g.gap, g.s + g.gap]) if (s >= 0 && s <= total && !inGap(s)) options.push({ s, slid: Math.abs(s - sE) });
  }
  options.sort((a, b) => a.slid - b.slid || a.s - b.s);
  for (const o of options) {
    const at = pointAtLength(line, o.s);
    if (at === null) continue;
    if (!arrivesSquare(at.dir, from, at.p, bound)) continue;
    const u = unit(sub(at.p, from));
    if (u === null) continue;
    // The new kerb point: where the leg toward the slid junction leaves the face.
    const hit = rayHit(sides.rings, from, u, TOUCH_CM, len(sub(at.p, from)));
    if (hit === null || hit.ring !== 0 || !segmentClear(sides.rings, from, hit.point, TOUCH_CM)) continue;
    return { kind: 'spine', kerbPoint: hit.point, point: at.p, arrival: u, index: end.index, slidCm: o.slid };
  }
  return null;
}

/**
 * Step 6's arc at the corner K of the legs A–K–B (§4.6), once the draw has chosen to round it: the kernel's fillet
 * tangent where the shorter leg ends (so the arc spans it) and as far from K on the longer leg, sampled in chords no
 * shorter than max(w_min, minEdge) — the sampling chord raised until every straight chord holds that floor (the
 * kernel samples by arc length; at most three tries) — left sharp when it holds fewer than `minSamplePoints` points
 * or leaves the face. Draws nothing.
 */
export function fitFillet(
  rings: readonly (readonly LatticePoint[])[],
  A: XY,
  K: XY,
  B: XY,
  wMinCm: number,
  minSamplePoints: number,
): { filleted: boolean; arc: XY[]; chordCm: number; sharpBecause: 'samples' | 'outside' | 'fit' | null } {
  const la = len(sub(K, A));
  const lb = len(sub(B, K));
  const shorter = la < lb ? la : lb;
  const floor = Math.max(wMinCm, LATTICE.minEdgeCm);
  let chordCm = floor;
  for (let tries = 0; tries < 3; tries += 1) {
    const fl = fillet(A, K, B, { chordCm, tangentCm: shorter });
    if (!fl.filleted) return { filleted: false, arc: [], chordCm, sharpBecause: 'fit' };
    const pts = fl.points;
    const arc = pts.slice(shorter < la ? 1 : 0, shorter < lb ? pts.length - 1 : pts.length);
    if (arc.length < minSamplePoints) return { filleted: false, arc: [], chordCm, sharpBecause: 'samples' };
    let minChord = Infinity;
    for (let i = 0; i + 1 < arc.length; i += 1) {
      const c = len(sub(arc[i + 1], arc[i]));
      if (c < minChord) minChord = c;
    }
    if (minChord < floor) {
      const up = ratio(floor, minChord, 'length');
      chordCm = chordCm * (up.ok ? up.value : 2) * CHORD_RAISE;
      continue;
    }
    for (let i = 1; i + 1 < arc.length; i += 1) if (!insideFace(rings, arc[i])) return { filleted: false, arc: [], chordCm, sharpBecause: 'outside' };
    for (let i = 0; i + 1 < arc.length; i += 1) {
      if (!segmentClear(rings, arc[i], arc[i + 1], TOUCH_CM)) return { filleted: false, arc: [], chordCm, sharpBecause: 'outside' };
    }
    return { filleted: true, arc, chordCm, sharpBecause: null };
  }
  return { filleted: false, arc: [], chordCm, sharpBecause: 'fit' };
}

/** A raised sampling chord's margin above the ratio that lifts the shortest chord to the floor. */
const CHORD_RAISE = 1.000001;

/**
 * The fillet's sharp chance at the corner K of A–K–B (§4.6 step 6): s + (1 − s) · min(1, w_min / ℓ), s = (1 − cos δ) / 2
 * with cos δ the legs' unit directions' dot product and ℓ the shorter leg — no trigonometric call.
 */
export function sharpChance(A: XY, K: XY, B: XY, wMinCm: number): { cosDelta: number; pSharp: number } {
  const u1 = unit(sub(K, A));
  const u2 = unit(sub(B, K));
  const cosDelta = u1 !== null && u2 !== null ? dot(u1, u2) : 1;
  const s = (1 - cosDelta) / 2;
  const la = len(sub(K, A));
  const lb = len(sub(B, K));
  const q = ratio(wMinCm, la < lb ? la : lb, 'length');
  const short = q.ok ? (q.value < 1 ? q.value : 1) : 1;
  return { cosDelta, pSharp: s + (1 - s) * short };
}

/** Step 6 on the legs A–K–B (§4.6): the fillet decision and the arc, with one cut.arc uniform on a way cut. */
function filletOf(sides: FaceSides, A: XY, K: XY, B: XY, ctx: PlanContext, cells: CutCells, wMin: number, draws: Draws): FilletPlan {
  const { cosDelta, pSharp } = sharpChance(A, K, B, wMin);
  const floor = Math.max(wMin, LATTICE.minEdgeCm);
  const sharp = (u: number | null, why: FilletPlan['sharpBecause'], chordCm = floor): FilletPlan => ({ cosDelta, pSharp, u, filleted: false, arc: [], sharpBecause: why, chordCm });
  if ((ctx.cutKind ?? 'way') === 'plot') return sharp(null, 'plot');
  const u = draws.arcUniform();
  if (u < pSharp) return sharp(u, 'drawn');
  const fit = fitFillet(sides.rings, A, K, B, wMin, cells.minSamplePoints);
  if (!fit.filleted) return sharp(u, fit.sharpBecause, fit.chordCm);
  return { cosDelta, pSharp, u, filleted: true, arc: fit.arc, sharpBecause: null, chordCm: fit.chordCm };
}

/**
 * Steps 6–7 for one candidate cut: the ends (extended, slid out of a portal's gap) and the fillet on the final legs.
 * Null when an end lies in a portal's gap and neither slide keeps its arrival (the next rung).
 */
function finish(
  face: KerbFace,
  sides: FaceSides,
  ctx: PlanContext,
  cells: CutCells,
  wMin: number,
  draws: Draws,
  legs: XY[],
  rings: [number, number],
  shape: { bent: boolean; heightCm: number; flattenThresholdCm: number; arrivalCross2: number },
): CutGeometry | null {
  const newLane = ctx.newLaneWidthCm ?? cells.laneWidthCm[1];
  const n = legs.length;
  let start = endOf(face, { kerbPoint: legs[0], ring: rings[0], from: legs[1] });
  let far = endOf(face, { kerbPoint: legs[n - 1], ring: rings[1], from: legs[n - 2] });
  const s1 = slideEnd(face, sides, start, legs[1], cells, newLane);
  if (s1 === null) return null;
  start = s1;
  legs[0] = start.kerbPoint;
  const s2 = slideEnd(face, sides, far, legs[n - 2], cells, newLane);
  if (s2 === null) return null;
  far = s2;
  legs[n - 1] = far.kerbPoint;
  if (!shape.bent && (start.slidCm > 0 || far.slidCm > 0)) {
    // A straight cut's two ends see each other: after both slides each must still arrive within the band.
    const bound = arrivalDot2(cells);
    for (const [e, from] of [[start, legs[1]], [far, legs[0]]] as const) {
      if (e.kind !== 'spine') continue;
      const sp = (face.spines ?? [])[e.index];
      if (sp?.bounding !== true || (sp.portals ?? []).length === 0) continue;
      const at = pointAtLength(sp.points, lengthAt(sp.points, e.point));
      if (at === null || !arrivesSquare(at.dir, from, e.point, bound)) return null;
    }
  }
  let fl: FilletPlan | null = null;
  let points: XY[] = legs.slice();
  if (shape.bent) {
    fl = filletOf(sides, legs[0], legs[1], legs[2], ctx, cells, wMin, draws);
    if (fl.filleted) {
      const head = legs[0];
      const tail = legs[2];
      points = [head];
      for (const p of fl.arc) {
        const q = points[points.length - 1];
        if (q.x !== p.x || q.y !== p.y) points.push(p);
      }
      const q = points[points.length - 1];
      if (q.x !== tail.x || q.y !== tail.y) points.push(tail);
    }
  }
  const chain: XY[] = [];
  const push = (p: XY): void => {
    const q = chain[chain.length - 1];
    if (q === undefined || q.x !== p.x || q.y !== p.y) chain.push(p);
  };
  push(start.point);
  for (const p of points) push(p);
  push(far.point);
  return { legs, bent: shape.bent, heightCm: shape.heightCm, flattenThresholdCm: shape.flattenThresholdCm, arrivalCross2: shape.arrivalCross2, fillet: fl, points, ends: [start, far], chain };
}

/** The flatten plan A → K → foot, K dropped below max(cut.flattenM, 0.02 × |A–foot|) (§4.6 step 5). */
function flattenPlan(
  face: KerbFace,
  sides: FaceSides,
  ctx: PlanContext,
  cells: CutCells,
  wMin: number,
  draws: Draws,
  A: XY,
  K: XY,
  far: FarPlan,
  rings: [number, number],
): CutGeometry | null {
  const af = sub(far.foot, A);
  const base = len(af);
  const area2 = Math.abs(cross(af, sub(K, A)));
  const thr = Math.max(cells.flattenCm, cells.flattenShare * base);
  const h = ratio(area2, base, 'length');
  const height = h.ok ? h.value : 0;
  // K kept exactly when height ≥ thr, compared as area2 ≥ thr · base (no division in the test).
  const keep = area2 >= thr * base;
  const legs = keep ? [A, K, far.foot] : [A, far.foot];
  return finish(face, sides, ctx, cells, wMin, draws, legs, rings, { bent: keep, heightCm: height, flattenThresholdCm: thr, arrivalCross2: -1 });
}

/**
 * Plans one cut on a face's kerb (§4.6 steps 1–7). Returns a `block` when the face stops (step 1), a `cut`, or
 * `nextRung` when an end is caught in a portal's gap; E_NOT_TWO_CROSSINGS (with the steps found so far as its
 * partial) when no far run qualifies or the start line misses the face; obb's E_DEGENERATE for a face with no area.
 * Throws a RangeError on a malformed context (a programming error, never a geometric one).
 */
export function planCut(face: KerbFace, ctx: PlanContext, streams: PlanStreams): KernelResult<CutPlan> {
  const cells = cutCells(ctx.table, ctx.preset);
  const { eLo, eHi, wMin, attempt } = checkContext(ctx, cells);
  const rings = canonicalRings(face.rings);
  if (rings.length === 0) return err('E_DEGENERATE', 'collinear');
  const box = obb(rings[0]);
  if (!box.ok) return err(box.code, box.detail);
  const minorCm = box.value.minorCm;
  const draws = new Draws(streams, attempt);

  // Step 1: the stop test.
  let stop: StopRecord;
  if (ctx.stop !== undefined) stop = ctx.stop;
  else {
    const d = draws.stop();
    stop = { uniforms: d.uniforms, g: d.g, tauCm: stopThreshold(eLo, eHi, d.g), draw: d.draw };
  }
  const base = { stop, minorCm, attempt };
  if (minorCm < stop.tauCm) return ok({ kind: 'block', ...base, draws: draws.used });

  const fr = frameOf(rings, attempt * cells.ladderTurnCdeg, ctx.slope, cells.slope);
  if (!fr.ok) return err(fr.code, fr.detail);
  const frame = fr.value;
  const sides = faceSides(rings, cells.turnTolCdeg, ctx.cornerScaleCm ?? cornerScale(face), cells.tangentWindowCm);
  const holed = rings.length > 1;
  const failed = (start: StartPlan | null, corner: CornerPlan | null, why: string): KernelResult<CutPlan> =>
    err<CutPlan>('E_NOT_TWO_CROSSINGS', why, { kind: 'failed', ...base, draws: draws.used, frame, sides, start, corner });

  // Step 2: the position.
  const b1 = draws.mean3('position');
  let f: number;
  let c: number | null = null;
  let m: number | null = null;
  if (holed) {
    const r = ratio(eLo, frame.lengthCm, 'length');
    m = r.ok && r.value < cells.holedMarginMax ? r.value : cells.holedMarginMax;
    f = m + (1 - 2 * m) * b1;
  } else {
    const g = centroid(rings[0]);
    const r = g === null ? null : ratio(dot(sub(g, frame.centre), frame.major) - frame.sMin, frame.lengthCm, 'length');
    c = r !== null && r.ok ? (r.value < 0 ? 0 : r.value > 1 ? 1 : r.value) : 0.5;
    f = (c + b1) / 2;
  }

  // Step 3: the start.
  const st = startOf(sides, frame, f);
  if (st === null) return failed(null, null, 'start line');
  const start: StartPlan = { f, c, m, ...st };

  // Step 4: the corner.
  const b2 = draws.mean3('corner');
  const u1 = start.normal;
  const hit = rayHit(sides.rings, start.A, u1, TOUCH_CM);
  const o = holed ? eLo * cells.holedOffsetShare : eLo;
  if (hit === null || !insideFace(sides.rings, along(start.A, u1, hit.t / 2))) return failed(start, null, 'first leg');
  const lambda = hit.t;
  const atCm = lambda >= 2 * o ? o + (lambda - 2 * o) * b2 : lambda / 2;
  const K = along(start.A, u1, atCm);
  const corner: CornerPlan = { lambdaCm: lambda, oCm: o, b: b2, atCm, K, hit: hit.point, hitRing: hit.ring };

  // Step 5: the far side and the bend.
  const far = farSide(sides, K, u1);
  let cut: CutGeometry | null = null;
  let alternate: CutGeometry | null = null;
  if (cells.bendMode === 'straightFirst') {
    const hr = runAt(sides, hit.ring, hit.point);
    const d = hr < 0 ? null : sideDir(sides, sides.runs[hr], hit.point);
    const c2 = d === null ? 0 : cross(u1, d) * cross(u1, d);
    if (c2 > cells.straightCross2 && segmentClear(sides.rings, start.A, hit.point, TOUCH_CM)) {
      cut = finish(face, sides, ctx, cells, wMin, draws, [start.A, hit.point], [start.ring, hit.ring], { bent: false, heightCm: 0, flattenThresholdCm: 0, arrivalCross2: c2 });
      if (cut === null) return ok({ kind: 'nextRung', reason: 'portalGap', ...base, draws: draws.used, frame, sides, start, corner, far });
      if (far !== null) alternate = flattenPlan(face, sides, ctx, cells, wMin, draws, start.A, K, far, [start.ring, sides.runs[far.run].ring]);
      return ok({ kind: 'cut', ...base, draws: draws.used, frame, sides, start, corner, far, mode: cells.bendMode, cut, alternate });
    }
  }
  if (far === null) return failed(start, corner, 'far run');
  cut = flattenPlan(face, sides, ctx, cells, wMin, draws, start.A, K, far, [start.ring, sides.runs[far.run].ring]);
  if (cut === null) return ok({ kind: 'nextRung', reason: 'portalGap', ...base, draws: draws.used, frame, sides, start, corner, far });
  return ok({ kind: 'cut', ...base, draws: draws.used, frame, sides, start, corner, far, mode: cells.bendMode, cut, alternate });
}
