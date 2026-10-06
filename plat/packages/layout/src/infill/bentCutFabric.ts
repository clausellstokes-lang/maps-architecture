// BentCutFabric (§4.6 *The strategy slot*, steps 7–11, *The deep-interior rule*, *Holes*, the wall as a barrier; §14
// `FabricStrategy`; §3.3 the callback form, `expect`, `onFail`; §5.1 (5), (6); §5.2 F-CUT and F-WORK; §6.3 the derivation
// unit; C-0036, C-0046, C-0085; M0-b-03). Readings: C-0239.
//
// `partition(district, seam, ctx, sc, k)` runs one callback-form L1 transaction per district (`districtBatch` builds
// it, so the determinism harness can run the same batch on any arena). Inside it, for each of the district's coarse L1
// faces (its cells, in canonical face order) a depth-first recursion:
//   1. the face's kerb (§3.7, the kernel's one kerb function) and the spines bounding it (its L1 boundary's ways, their
//      half-widths, whether the seam records name them — a district-bounding spine — and their portals);
//   2. the reflex pre-cut and the antenna split (ladder.ts), each judged and inserted like any cut;
//   3. planCut (M0-b-02) at attempt 0 — its cut.stop draw recorded (T34-1's replay) — and the ladder: (a) attempts
//      0, 1, 2 (frames turned 36°, cut.t afresh on the attempt component), (b) the mean normal, (c) the perpendicular cut
//      sliding (W_CUT_SLID), (d) substitution as a court block for faces ≤ 2 · e_hi² (C-0036), else (c)'s slide again;
//      no rung restarts anything above the face (§5.1 (1));
//   4. each candidate judged before the kernel (ladder.ts `judge`: landing, contact, the class floor — the band's
//      shallowest plot depth d_lo as the minimum block width, the plot's minimum corner), then `splitFace` (or
//      `connectHole` for a slit onto a hole, §4.6 *Holes*) with the lane's `way` row; a child below the floor after the
//      insertion takes the lane out again (`removeEdges`) and the next rung;
//   5. the lane's width by step 9 (width.ts: its kerb-to-kerb length, the district's OBB major extent, the district's
//      exponent p on cut.width), its class (a lane; a secondary in a walled regime past the lane length band), its Way
//      record, a T-junction row at each spine end (splitThrough) and a `baseLane` portal where the spine bounds the
//      district (portals.ts, C-0046); continuation across a lower-or-equal class only inside the district (step 10);
//   6. recursion on both children (step 11) with their own lineage — the cell is the derivation unit of S8's faces,
//      blocks and lanes (§6.3), each child the next creation index of the cell's run;
//   7. a face that stops becomes a Block: the deep-interior rule (deepInterior.ts) writes depthClass, interior and reach,
//      and a back lane or through alley is cut in the same batch as an L1 spine.
// F-WORK (C-0085): cut.recursionDepth, cut.kernelCalls and cut.candidates are counted against their laws over the
// district's scope (§5.1 (5)); on reaching one the recursion stops at the depth reached and every face still open
// stands as a block, reported `work_cut` with the count. levelledUnits returns [] and terracedEdges is true at M0
// (their readers are M3a's).
import {
  CONCERNS,
  compareFaces,
  connectHole,
  createRng,
  entityKey,
  err,
  faceRings,
  faceWalk,
  idOf,
  isFaceLive,
  isVertexLive,
  kerb,
  keyText,
  LATTICE,
  obb,
  ok,
  outgoing,
  pointLocate,
  ratio,
  removeEdges,
  resolve,
  rowKey,
  rowsOn,
  splitFace,
  splitThrough,
  STAGES,
  area2,
  dmath,
  type FaceId,
  type Hash128,
  type Invariant,
  type Kernel,
  type KernelResult,
  type KernelTx,
  type LatticePoint,
  type LineageHash,
  type Overlay,
  type Plat,
  type PlatKey,
  type Rng,
  type SpineWidths,
  type Stream,
  type VertexId,
} from '@plat/kernel';
import { addressOf, lineageHash, mint, type Block, type District, type Id, type Junction, type LiveEntry, type Portal, type Seam, type Way } from '@plat/model';
import { loadTable, loadWorkLimits, workLimitOf, type PresetId, type Row, type Table, type WorkLimitsTable } from '@plat/tables';
import { bandPlotDepth, blockDepthRange, minFrontage, type GranularityBands } from './granularityBands.js';
import { deepInterior, interiorRow, interiorSpine, type DeepInterior, type InteriorRow } from './deepInterior.js';
import {
  antennaCut,
  antennaTips,
  div,
  judge,
  kerbLength,
  meanNormalCut,
  reflexPreCut,
  slideFeet,
  straightCandidate,
  type BlockFloor,
  type Candidate,
} from './ladder.js';
import { cutCells, planCut, type CutCells, type CutPlan, type KerbFace, type KerbSpine, type PlanContext, type StartPlan, type FarPlan, type XY } from './planner.js';
import { bearingCdeg, chainRuns, kerbPortals, seamOfSpine } from './portals.js';
import { canonicalRings, faceSides, rayHit, type FaceSides } from './sides.js';
import { cutClass, drawWidthExponent, widthCells, widthOf, type CutClass, type WidthCells } from './width.js';

// ---------------------------------------------------------------------------------------------------------------------
// The strategy interface (§14) and the district context
// ---------------------------------------------------------------------------------------------------------------------

/** §14's LevelledUnit: the units S10's and S11's levelling levels (item 110 (a)); its readers are M3a's. */
export type LevelledUnit = { plot?: Id; block?: Id; outline: LatticePoint[]; excluded?: LatticePoint[][] };

/**
 * The district's context as S8 reads it at M0 (V01 §2.3's `DistrictContext` is M1's, C-0239 (1)): its identity and
 * arena, its band at its pass-1 prosperity value (M0-b-01's bands), its density, rung, stage regime row and walled
 * flag, the ways that may bound its faces with their widths (the map the kernel's `spineWidths` reads; S8 adds its
 * lanes to it as it inserts them), and the entities already minted (for §6.3's collision rule).
 */
export interface DistrictContext {
  readonly key: PlatKey;
  /** The district's lineage hash and reroll (§6.3): the unit of its cells, its portals and its cut.width draw. */
  readonly lineage: Readonly<LineageHash>;
  readonly reroll: number;
  /** The derivation's seed key (§6.1). */
  readonly seedKey: Readonly<Hash128>;
  readonly epoch: number;
  /** The pass-1 prosperity and density values in [0, 1] (§4.5). */
  readonly prosperity: number;
  readonly density: number;
  readonly rung: 'TOWN' | 'CITY' | 'METROPOLIS';
  /** The granularity bands at the district's pass-1 band (M0-b-01's `granularityBands`). */
  readonly bands: GranularityBands;
  /** The stage regime's regimes.json row (its block-depth floor; §4.4), absent for none. */
  readonly regime?: Row;
  /** A walled regime (§4.6 step 9's secondary typing). */
  readonly walled: boolean;
  /** The lane length band (m) a walled regime's secondary typing reads; no M0 table holds it (C-0239 (5)). */
  readonly laneLengthM?: readonly [number, number];
  /** A parity preset (§7.6). */
  readonly preset?: PresetId;
  /** The ways a face of the district may be bounded by, by id. */
  readonly ways: ReadonlyMap<Id, Way>;
  /** Way id → width (cm): the map the kernel's spineWidths reads; S8 writes its lanes' widths into it. */
  readonly widths: Map<Id, number>;
  /** Every live entity minted before this district (§6.3's collision rule); partition appends what it mints. */
  readonly live: LiveEntry[];
  /** Test-side tables (default the shipped ones). */
  readonly tables?: { readonly cut?: Table; readonly ways?: Table; readonly interior?: Table; readonly faces?: Table; readonly workLimits?: WorkLimitsTable };
  /** The deep factor (default the design's 0.6, deepInterior.ts). */
  readonly deepFactor?: number;
}

/** §14's FabricStrategy (C-0239 (1): `seam` is C-0046's minimal Seam records, `sc` a StageContext's report sink). */
export interface FabricStrategy {
  partition(district: District, seam: readonly Seam[], ctx: DistrictContext, sc: FabricStageContext, k: Kernel): KernelResult<PartitionResult>;
  levelledUnits(district: District, plots: readonly unknown[], buildings: readonly unknown[]): LevelledUnit[];
  readonly terracedEdges: boolean;
}

/** The part of a StageContext partition writes to: the report sink's warning counter (§5.4), when one is given. */
export interface FabricStageContext {
  readonly report?: { warning(code: string, count?: number): void } | unknown;
}

// ---------------------------------------------------------------------------------------------------------------------
// The report
// ---------------------------------------------------------------------------------------------------------------------

/** One face's stop test (§4.6 step 1): T34-1's replay record — the face, its cut.stop key and four uniforms. */
export interface StopUse {
  /** The face's address (its lineage's token; never persisted). */
  readonly face: string;
  /** The cut.stop stream key's textual form (§6.1). */
  readonly key: string;
  readonly uniforms: readonly [number, number, number, number];
  readonly g: number;
  readonly tauCm: number;
  /** The kerb's outer ring's OBB minor extent (cm). */
  readonly minorCm: number;
  /** The district's block-depth range (cm). */
  readonly eLoCm: number;
  readonly eHiCm: number;
  /** `block` when minor < τ; `cut` when the face went on to the ladder. */
  readonly outcome: 'block' | 'cut';
}

/** One rung the ladder took on a face (§5.1 (3): every rung writes a line). */
export interface RungUse {
  readonly face: string;
  readonly rung: 'pre' | 'antenna' | 'a' | 'b' | 'c' | 'd' | 'deep' | 'work' | 'unresolved';
  /** Rung (a)'s attempt (frame k), 0 elsewhere. */
  readonly attempt: number;
  readonly outcome: 'cut' | 'slit' | 'refused' | 'none' | 'block';
  /** Why a candidate was refused: the judgement's reason or the kernel's code. */
  readonly why?: string;
  /** Rung (c): the slide steps (W_CUT_SLID's count). */
  readonly slide?: number;
  /** The stream key's text the rung drew on (cut.t at the attempt for rung (a)). */
  readonly key?: string;
}

/** One face's ladder: its kernel calls and outcome (F-CUT's bar: ≤ 6 kernel calls; the face count never decreases). */
export interface FaceLadder {
  readonly face: string;
  readonly depth: number;
  readonly kernelCalls: number;
  readonly outcome: 'cut' | 'slit' | 'block' | 'court' | 'empty' | 'unresolved' | 'work_cut';
  /** The faces before (1) and after (2 for a cut, 1 otherwise). */
  readonly facesAfter: number;
}

/** An F-WORK hit (C-0085): the counter, the count reached and its limit. */
export interface WorkCut {
  readonly counter: 'cut.recursionDepth' | 'cut.kernelCalls' | 'cut.candidates';
  readonly count: number;
  readonly limit: number;
}

/** A district's S8 report. */
export interface DistrictReport {
  readonly district: Id;
  readonly cells: number;
  readonly blocks: number;
  readonly lanes: number;
  /** The district's width exponent p and its cut.width uniform. */
  readonly p: number;
  readonly widthU: number;
  readonly lRefCm: number;
  /** The substitution residue: its area, the built area (every block's kerb), the share and the soft flag (≤ 5 %). */
  readonly residueAreaCm2: number;
  readonly builtAreaCm2: number;
  readonly residueShare: number;
  readonly residueSoftExceeded: boolean;
  readonly work: { readonly kernelCalls: number; readonly recursionDepth: number; readonly candidates: number };
  readonly limits: { readonly kernelCalls: number; readonly recursionDepth: number; readonly candidates: number };
  readonly workCut: readonly WorkCut[];
  readonly stops: readonly StopUse[];
  readonly rungs: readonly RungUse[];
  readonly faces: readonly FaceLadder[];
  /** The stage's own warning codes (W_CUT_SLID) and counts. */
  readonly warnings: Readonly<Record<string, number>>;
}

/** A block with the L1 faces S8 left it and the points that find them again (its L2 face is S9's, C-0239 (3)). */
export interface BlockFaces {
  readonly block: Id;
  /** A point inside each of its L1 faces (the inscribed circle's centre; two for a block a spine split). */
  readonly seeds: readonly LatticePoint[];
  /** The kerb's outer ring when it stopped, and the stop test's verdict: `stop`, `court`, `work`, `empty`, `unresolved`. */
  readonly kerb: readonly LatticePoint[];
  readonly how: 'stop' | 'court' | 'work' | 'empty' | 'unresolved';
  /** The cut.stop record of its face (stop blocks), for T34-1's replay. */
  readonly stop: StopUse | null;
}

/** What partition returns. */
export interface PartitionResult {
  readonly blocks: Block[];
  readonly ways: Way[];
  readonly junctions: Junction[];
  /** The seams with the district's new baseLane portals added (every seam handed in, in order). */
  readonly seams: Seam[];
  readonly portals: Portal[];
  readonly blockFaces: BlockFaces[];
  /** Everything minted, for the next district's collision rule. */
  readonly minted: LiveEntry[];
  readonly report: DistrictReport;
}

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------

const S8 = STAGES.S8;
const S6 = STAGES.S6;
const M_TO_CM = 100;

/** The faces' class the floor names (§4.7's class-floor row, read by the kernel's expect when its env injects floors). */
export const BLOCK_FACE_CLASS = 'block';

/** The batch-scope hard row S8's batches carry (§3.3's expect: the class floors of the faces it makes). */
export const BLOCK_FLOOR_ROW: Invariant = Object.freeze({ name: 'block-floor', scope: 'batch', class: 'hard', kind: 'classFloor', faceClass: BLOCK_FACE_CLASS });

/** The work-limit counters S8 charges (M0.md §2.2; C-0085). */
export const S8_COUNTERS = Object.freeze(['cut.kernelCalls', 'cut.recursionDepth', 'cut.candidates'] as const);

/** The kernel's counters the district batch's own work limit sums (§3.3; as S1's batch does). */
const TX_COUNTERS = Object.freeze(['insert.points', 'insert.attractQueries', 'insert.placementCandidates', 'insert.crossings', 'tx.facesWalked'] as const);

function point(p: Plat, v: VertexId): LatticePoint {
  return { x: p.vertices.x[v], y: p.vertices.y[v] } as LatticePoint;
}

function stopError(why: string): never {
  throw new RangeError(`BentCutFabric: ${why}`);
}

/** The width map as the kernel's SpineWidths (half the way's width; a way of no width declares none). */
export function spineWidthsOf(widths: ReadonlyMap<Id, number>): SpineWidths {
  return (chain) => {
    if (chain.role !== 'way') return null;
    const w = widths.get(chain.entity);
    return w === undefined ? null : { halfWidthCm: w / 2 };
  };
}

/** The district's coarse L1 faces (its cells), in canonical face order (§3.3's keys; never a slot order). */
export function districtCells(p: Plat, district: Id): FaceId[] {
  const out: FaceId[] = [];
  const F = p.faces[1];
  for (let f = 0; f < p.slots.face[1].top; f += 1) {
    if (!isFaceLive(p, 1, f)) continue;
    const h = F.owner[f];
    if (h >= 0 && idOf(p, h) === district) out.push(f);
  }
  out.sort((a, b) => compareFaces(p, 1, a, b));
  return out;
}

/** Twice a ring's area, as a number (cm²). */
function areaOf(ring: readonly LatticePoint[]): number {
  return Math.abs(area2(ring)) / 2;
}

/** The convex hull's OBB major extent of a point set (the district's L_ref, §4.6 step 9). */
function majorExtent(points: readonly LatticePoint[]): number {
  const box = obb(points.length >= 3 ? hullRing(points) : points);
  return box.ok ? box.value.majorCm : 0;
}

/** A counter-clockwise hull ring of points (monotone chain on the lattice, exact). */
function hullRing(points: readonly LatticePoint[]): LatticePoint[] {
  const pts = points.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  const cr = (o: LatticePoint, a: LatticePoint, b: LatticePoint): number => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower: LatticePoint[] = [];
  for (const q of pts) {
    while (lower.length >= 2 && cr(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
    lower.push(q);
  }
  const upper: LatticePoint[] = [];
  for (let i = pts.length - 1; i >= 0; i -= 1) {
    const q = pts[i];
    while (upper.length >= 2 && cr(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
    upper.push(q);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

/** The ways on a face's L1 boundary, sorted by id (a representation-free order). */
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

// ---------------------------------------------------------------------------------------------------------------------
// The district run
// ---------------------------------------------------------------------------------------------------------------------

/** One face waiting in the recursion: its slot now, its lineage, its depth and its cell. */
interface Pending {
  face: FaceId;
  readonly hash: LineageHash;
  readonly depth: number;
  readonly cell: number;
  /** A point inside the face when it was made (to find it again if a neighbour's cut re-walked it). */
  readonly seed: LatticePoint | null;
}

/** The mutable state of one district's run (inside the transaction). */
class Run {
  readonly p: Plat;
  readonly rng: Rng;
  readonly live: LiveEntry[];
  readonly minted: LiveEntry[] = [];
  readonly cells: CutCells;
  readonly wcells: WidthCells;
  readonly floor: BlockFloor;
  readonly planBase: PlanContext;
  readonly eLo: number;
  readonly eHi: number;
  readonly plotDepthCm: number;
  readonly interior: InteriorRow;
  readonly substitutionMaxCm2: number;
  readonly limits: { kernelCalls: number; recursionDepth: number; candidates: number };
  readonly work = { kernelCalls: 0, recursionDepth: 0, candidates: 0 };
  readonly workCut: WorkCut[] = [];
  stopped: WorkCut['counter'] | null = null;
  p_: number = 1;
  widthU = 0;
  lRef = 1;
  readonly stops: StopUse[] = [];
  readonly rungs: RungUse[] = [];
  readonly faces: FaceLadder[] = [];
  readonly warnings = new Map<string, number>();
  readonly blocks: Block[] = [];
  readonly blockFaces: BlockFaces[] = [];
  readonly ways: Way[] = [];
  readonly junctions: Junction[] = [];
  readonly portals: Portal[] = [];
  readonly portalAt: { portal: Portal; at: LatticePoint; spine: Id }[] = [];
  readonly seams: Seam[];
  residueArea = 0;
  builtArea = 0;
  /** Per cell: its next creation index (§6.3's creation order of the cell's run). */
  readonly counters: number[] = [];
  readonly cellHashes: LineageHash[] = [];
  portalIndex = 0;
  kernelCallsThisFace = 0;

  constructor(
    readonly o: Overlay,
    readonly district: District,
    seams: readonly Seam[],
    readonly ctx: DistrictContext,
  ) {
    this.p = o.plat;
    this.rng = createRng();
    this.live = ctx.live.slice();
    this.seams = seams.map((s) => ({ ...s, portals: s.portals.slice() }));
    const cutT = ctx.tables?.cut ?? loadTable('cut');
    this.cells = cutCells(cutT, ctx.preset);
    this.wcells = widthCells(ctx.rung, cutT, ctx.tables?.ways ?? loadTable('ways'));
    const [eLoM, eHiM] = blockDepthRange(ctx.bands, ctx.regime);
    this.eLo = eLoM * M_TO_CM;
    this.eHi = eHiM * M_TO_CM;
    this.plotDepthCm = bandPlotDepth(ctx.bands) * M_TO_CM;
    const faces = ctx.tables?.faces ?? loadTable('faces');
    const angle = faces.cell('plot', 'minInteriorAnglePlotCdeg').value;
    if (typeof angle !== 'number') stopError('faces/plot/minInteriorAnglePlotCdeg is not a number');
    this.floor = { minWidthCm: ctx.bands.depthM[0] * M_TO_CM, minAngleCdeg: angle };
    this.planBase = { depthRangeM: [eLoM, eHiM], minFrontageM: minFrontage(ctx.bands), cutKind: 'way', table: cutT, ...(ctx.preset === undefined ? {} : { preset: ctx.preset }) };
    this.interior = interiorRow(ctx.prosperity, ctx.density, ctx.rung, this.plotDepthCm, { ...(ctx.tables?.interior === undefined ? {} : { table: ctx.tables.interior }), ...(ctx.deepFactor === undefined ? {} : { deepFactor: ctx.deepFactor }) });
    const factor = cutT.cell('ladder', 'substitutionAreaFactor').value;
    if (typeof factor !== 'number') stopError('cut/ladder/substitutionAreaFactor is not a number');
    this.substitutionMaxCm2 = factor * this.eHi * this.eHi;
    this.limits = { kernelCalls: 0, recursionDepth: 0, candidates: 0 };
  }

  // ---- identity -------------------------------------------------------------------------------------------------

  /** The lineage hash of a key in the cell's run (unit: the cell; stage S8). */
  hashIn(unit: LineageHash, index: number): LineageHash {
    return lineageHash({ arena: this.ctx.key, unit, stage: S8, epoch: this.ctx.epoch, index, reroll: this.ctx.reroll });
  }

  /** Mints one entity of `kind` under a unit's creation index (§6.3; the collision rule over everything live). */
  mintOne(kind: string, unit: LineageHash, index: number): { id: Id; key: Readonly<Hash128>; hash: LineageHash } {
    const m = mint([{ kind, key: { arena: this.ctx.key, unit, stage: S8, epoch: this.ctx.epoch, index, reroll: this.ctx.reroll } }], this.live, [], this.ctx.seedKey)[0];
    const entry = { id: m.identity.id, lineage: m.identity.lineage };
    this.live.push(entry);
    this.minted.push(entry);
    return { id: m.identity.id, key: m.entityKey, hash: m.identity.lineage };
  }

  faceAddress(hash: LineageHash): string {
    return addressOf('face', hash, this.ctx.key);
  }

  stream(entityKeyOf: Readonly<Hash128>, concern: keyof typeof CONCERNS, attempt = 0): Stream {
    return this.rng.stream(entityKeyOf, S8, CONCERNS[concern], { reroll: this.ctx.reroll, attempt, epoch: this.ctx.epoch, salt: 0 });
  }

  warn(code: string, n = 1): void {
    this.warnings.set(code, (this.warnings.get(code) ?? 0) + n);
  }

  // ---- work -----------------------------------------------------------------------------------------------------

  /** Charges one unit of a counter; on reaching its limit the run stops recursing (F-WORK, C-0085). */
  charge(counter: 'kernelCalls' | 'candidates'): boolean {
    if (this.stopped !== null) return false;
    this.work[counter] += 1;
    if (this.work[counter] > this.limits[counter]) {
      const name = counter === 'kernelCalls' ? 'cut.kernelCalls' : 'cut.candidates';
      this.stopped = name;
      this.workCut.push({ counter: name, count: this.work[counter], limit: this.limits[counter] });
      return false;
    }
    return true;
  }

  // ---- the faces' geometry --------------------------------------------------------------------------------------

  /** A face's slot now: itself when live and the district's, else the face holding its seed point. */
  locate(f: Pending): FaceId | null {
    const F = this.p.faces[1];
    if (isFaceLive(this.p, 1, f.face) && F.owner[f.face] >= 0 && idOf(this.p, F.owner[f.face]) === this.district.id) {
      if (f.seed === null) return f.face;
      const at = pointLocate(this.p, this.ctx.key, 1, f.seed);
      if (at.on !== 'face' || at.face === f.face) return f.face;
    }
    if (f.seed === null) return null;
    const at = pointLocate(this.p, this.ctx.key, 1, f.seed);
    return at.on === 'face' && at.level === 1 ? at.face : null;
  }

  /** The face as the planner reads it: its kerb's largest component (with its holes) and the spines bounding it. */
  kerbFace(face: FaceId): { kf: KerbFace; rings1: LatticePoint[][]; empty: boolean } | { error: string } {
    const rings1 = canonicalRings(faceRings(this.p, 1, face));
    const kr = kerb(this.o, face, spineWidthsOf(this.ctx.widths));
    if (!kr.ok) return { error: `${kr.code} ${kr.detail}` };
    const outer = kr.value.filter((r) => area2(r) > 0);
    if (outer.length === 0 || rings1.length === 0) return { kf: { rings: [], spines: [] }, rings1, empty: true };
    // The largest component (C-0239 (7)); ties by its canonical first vertex.
    let pick = outer[0];
    for (const r of outer) if (area2(r) > area2(pick)) pick = r;
    const holes = kr.value.filter((r) => area2(r) < 0 && insideRing(pick, r[0]));
    const spines: KerbSpine[] = [];
    for (const wayId of boundaryWays(this.p, face)) {
      const w = this.ctx.widths.get(wayId);
      if (w === undefined) continue;
      const runs = chainRuns(this.p, this.ctx.key, { role: 'way', entity: wayId });
      const seam = seamOfSpine(this.seams, wayId);
      for (const run of runs) {
        spines.push({
          points: run,
          halfWidthCm: w / 2,
          bounding: seam !== undefined,
          ...(seam === undefined ? {} : { portals: kerbPortals(this.p, this.ctx.key, seam, wayId, this.portalAt) }),
        });
      }
    }
    return { kf: { rings: [pick, ...holes], spines }, rings1, empty: false };
  }

  /** The way a KerbFace spine index belongs to (its route's first point on the way's chain). */
  spineWay(face: FaceId, kf: KerbFace, index: number): Id | null {
    const sp = (kf.spines ?? [])[index];
    if (sp === undefined) return null;
    for (const wayId of boundaryWays(this.p, face)) {
      for (const run of chainRuns(this.p, this.ctx.key, { role: 'way', entity: wayId })) {
        if (run.length === sp.points.length && run[0].x === sp.points[0].x && run[0].y === sp.points[0].y) return wayId;
      }
    }
    return null;
  }
}

/** Is p inside the ring (even–odd)? */
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

/** The planner's streams for a face (§6.1: keyed by the face's lineage). */
function planStreams(run: Run, hash: LineageHash): { rng: Rng; faceKey: Readonly<Hash128>; entity: string; reroll: number; epoch: number } {
  return { rng: run.rng, faceKey: entityKey(run.ctx.seedKey, hash, run.ctx.key), entity: run.faceAddress(hash), reroll: run.ctx.reroll, epoch: run.ctx.epoch };
}

/** A lattice point inside a face's kerb (its inscribed circle's centre), or null. */
function seedOf(rings: readonly (readonly LatticePoint[])[]): LatticePoint | null {
  if (rings.length === 0) return null;
  const c = deepInteriorCentre(rings);
  return c;
}

function deepInteriorCentre(rings: readonly (readonly LatticePoint[])[]): LatticePoint | null {
  // The same best-first search the deep-interior rule measures thickness with.
  const r = deepThickness(rings);
  if (r === null) return null;
  return { x: Math.round(r.x), y: Math.round(r.y) } as LatticePoint;
}

let deepThickness: (rings: readonly (readonly LatticePoint[])[]) => XY | null = () => null;

/** The outcome of one candidate tried on the face. */
type TryResult = { readonly ok: true; readonly children: FaceId[]; readonly slit: boolean } | { readonly ok: false; readonly why: string };

/**
 * Tries one candidate on a face (§4.6 steps 7–9 and 8's transaction): the judgement (no kernel call when it refuses),
 * the lane's id and width, the kernel's splitFace or connectHole, the children checked against the floor (the lane taken
 * out again by removeEdges when one fails), then the ends' junction rows and portals.
 */
function tryCandidate(run: Run, face: FaceId, kf: KerbFace, rings1: readonly (readonly LatticePoint[])[], cand: Candidate, cell: number, faceAddr: string, attempt: number, laneClass?: CutClass): TryResult {
  if (!run.charge('candidates')) return { ok: false, why: 'work_cut' };
  // A 2 cm margin over the floor: the insertion lands each end within a centimetre of where it was judged.
  const j = judge(rings1, cand.chain, run.floor, 2 * LATTICE.unitCm);
  if (!j.ok) return { ok: false, why: j.why };
  // Continuation (step 10): an end landing on an existing junction of an interior lower-or-equal class spine makes a
  // crossroads, admitted only collinear within 6° and inside the district; a bounding spine's gap keeps it off there.
  const cont = continuationRefused(run, face, kf, cand, laneClass ?? 'lane');
  if (cont !== null) return { ok: false, why: cont };
  const L = kerbLength(cand.kerbPoints);
  const cls: CutClass = laneClass ?? cutClass(L, run.ctx.walled, run.ctx.laneLengthM);
  const width = widthOf(L, run.lRef, run.p_, run.wcells.bands[cls]);
  const cellHash = run.cellHashes[cell];
  const index = run.counters[cell];
  const lane = run.mintOne('way', cellHash, index);
  run.ctx.widths.set(lane.id, width);
  if (!run.charge('kernelCalls')) {
    run.ctx.widths.delete(lane.id);
    return { ok: false, why: 'work_cut' };
  }
  run.kernelCallsThisFace += 1;
  const rows = [{ role: 'way' as const, entity: lane.id }];
  let children: FaceId[];
  let slit = false;
  if (j.kind === 'slit') {
    const r = connectHole(run.o, face, cand.chain, { rows });
    if (!r.ok) {
      run.ctx.widths.delete(lane.id);
      run.live.pop();
      run.minted.pop();
      return { ok: false, why: r.code };
    }
    children = [r.value];
    slit = true;
  } else {
    const r = splitFace(run.o, face, cand.chain, { rows });
    if (!r.ok) {
      run.ctx.widths.delete(lane.id);
      run.live.pop();
      run.minted.pop();
      return { ok: false, why: r.code };
    }
    children = [r.value[0], r.value[1]];
    // The floor on the committed-to-be children (the kernel's expect when the env injects floors reads the same).
    for (const c of children) {
      const box = obb(canonicalRings(faceRings(run.p, 1, c))[0] ?? []);
      if (!box.ok || box.value.minorCm < run.floor.minWidthCm) {
        run.kernelCallsThisFace += 1;
        run.charge('kernelCalls');
        const back = removeEdges(run.o, { role: 'way', entity: lane.id });
        run.ctx.widths.delete(lane.id);
        run.live.pop();
        run.minted.pop();
        if (!back.ok) return { ok: false, why: `removeEdges ${back.code}` };
        return { ok: false, why: 'floor' };
      }
    }
  }
  run.counters[cell] += 1;
  // The ends: a T-junction row at each end on a spine or the kerb, a portal where the spine bounds the district.
  const ends = laneEnds(run, lane.id, cand.chain);
  const way: Way = {
    id: lane.id,
    class: cls,
    spine: { role: 'way', entity: lane.id },
    width: width,
    from: { kind: 'junction', id: '' },
    to: { kind: 'junction', id: '' },
    growthStage: 0,
    epoch: run.ctx.epoch,
    provisional: false,
    lifecycle: generated(run.ctx.epoch),
  };
  const nodes: string[] = [];
  for (let e = 0; e < 2; e += 1) {
    const end = cand.ends[e];
    const v = ends[e];
    const spineWay = end.kind === 'spine' && end.index >= 0 ? run.spineWay(face, kf, end.index) : cand.rung === 'antenna' && e === 0 ? antennaWay(run, v) : null;
    const jId = junctionAt(run, v, lane.id, spineWay, cell);
    nodes.push(jId);
    if (spineWay !== null) {
      const seam = seamOfSpine(run.seams, spineWay);
      if (seam !== undefined && v !== null) addPortal(run, seam, spineWay, lane.id, cls, width, v, cand.chain[e === 0 ? 1 : cand.chain.length - 2] ?? cand.chain[e]);
    }
  }
  way.from = { kind: 'junction', id: nodes[0] };
  way.to = { kind: 'junction', id: nodes[1] };
  run.ways.push(way);
  run.rungs.push({ face: faceAddr, rung: cand.rung, attempt, outcome: slit ? 'slit' : 'cut', ...(cand.slide > 0 ? { slide: cand.slide } : {}) });
  return { ok: true, children, slit };
}

/** The way an antenna's tip lies on (its L1 edges' way row), or null. */
function antennaWay(run: Run, v: VertexId | null): Id | null {
  if (v === null) return null;
  for (const h of outgoing(run.p, v)) {
    for (const r of rowsOn(run.p, 'edge', h)) {
      const k = rowKey(run.p, r);
      if (k.role === 'way' && !run.ways.some((w) => w.id === k.entity)) return k.entity;
    }
  }
  return null;
}

/** The lane's two end vertices, matched to the chain's two ends (its run's ends, by distance). */
function laneEnds(run: Run, laneId: Id, chain: readonly LatticePoint[]): [VertexId | null, VertexId | null] {
  const r = resolve(run.p, { role: 'way', entity: laneId }, run.ctx.key);
  if (r.view !== 'edges' || r.runs.length === 0) return [null, null];
  const O = run.p.halfEdges.origin;
  const first = r.runs[0];
  const last = r.runs[r.runs.length - 1];
  const a = O[first[0]];
  const b = O[last[last.length - 1] ^ 1];
  const d = (v: VertexId, q: LatticePoint): number => {
    const pt = point(run.p, v);
    return (pt.x - q.x) * (pt.x - q.x) + (pt.y - q.y) * (pt.y - q.y);
  };
  const c0 = chain[0];
  return d(a, c0) <= d(b, c0) ? [a, b] : [b, a];
}

/** A vertex role row on a vertex (splitThrough at the vertex: its endpoint takes the row, §3.4). */
function addVertexRow(run: Run, v: VertexId, role: 'junction' | 'portal', entity: Id): boolean {
  if (!isVertexLive(run.p, v)) return false;
  const hs = outgoing(run.p, v);
  if (hs.length === 0) return false;
  const r = splitThrough(run.o, hs[0], point(run.p, v), { role, entity });
  return r.ok && r.value === v;
}

/**
 * The junction at a lane end (§4.6 step 7: the T-junction): an existing junction row on the vertex is reused (the lane
 * an arm of it, a crossroads by continuation); else a fresh S8 Junction — `T` on a spine, `end` on a kerb or a hole —
 * with its ('junction', id) row. Returns the junction's id.
 */
function junctionAt(run: Run, v: VertexId | null, laneId: Id, spineWay: Id | null, cell: number): Id {
  if (v !== null) {
    for (const r of rowsOn(run.p, 'vertex', v)) {
      const k = rowKey(run.p, r);
      if (k.role !== 'junction') continue;
      const own = run.junctions.find((j) => j.id === k.entity);
      if (own !== undefined) {
        own.arms.push(laneId);
        own.kind = own.arms.length >= 4 ? 'X' : own.kind === 'end' ? 'T' : own.kind;
      }
      return k.entity;
    }
  }
  const m = run.mintOne('junction', run.cellHashes[cell], run.counters[cell]);
  run.counters[cell] += 1;
  const arms = spineWay === null ? [laneId] : [spineWay, laneId];
  const j: Junction = { id: m.id, vertex: { role: 'junction', entity: m.id }, arms, kind: spineWay === null ? 'end' : 'T', lifecycle: generated(run.ctx.epoch) };
  if (v !== null && addVertexRow(run, v, 'junction', m.id)) run.junctions.push(j);
  else run.junctions.push(j);
  return m.id;
}

/** A baseLane portal at a lane end on a district-bounding spine (C-0046): the vertex's row and the seam's record. */
function addPortal(run: Run, seam: Seam, spineWay: Id, laneId: Id, cls: CutClass, widthCm: number, v: VertexId, inner: LatticePoint): void {
  const m = run.mintOne('portal', run.ctx.lineage as LineageHash, run.portalIndex);
  run.portalIndex += 1;
  if (!addVertexRow(run, v, 'portal', m.id)) return;
  const at = point(run.p, v);
  const dir = { x: inner.x - at.x, y: inner.y - at.y };
  const portal: Portal = {
    id: m.id,
    wayId: laneId,
    class: cls,
    widthCm: widthCm as Portal['widthCm'],
    at: { role: 'portal', entity: m.id },
    bearing: bearingCdeg(dir, (y, x) => dmath.atan2(y, x)) as Portal['bearing'],
    from: 'baseLane',
    by: run.district.id,
  };
  const s = run.seams.find((x) => x.id === seam.id);
  if (s !== undefined) s.portals.push(portal);
  run.portals.push(portal);
  run.portalAt.push({ portal, at, spine: spineWay });
}

/** cos of 6° (cut.settings.continuationCdeg) is read from the cells at use. */
function continuationRefused(run: Run, face: FaceId, kf: KerbFace, cand: Candidate, cls: CutClass): string | null {
  const n = cand.chain.length;
  for (let e = 0; e < 2; e += 1) {
    const end = cand.ends[e];
    if (end.kind !== 'spine' || end.index < 0) continue;
    const at = cand.chain[e === 0 ? 0 : n - 1];
    const loc = pointLocate(run.p, run.ctx.key, 1, at);
    // Within attractCm of an existing vertex of the spine: the insertion would land there.
    const near = nearestJunction(run, at);
    if (near === null) continue;
    void loc;
    const wayId = run.spineWay(face, kf, end.index);
    const way = wayId === null ? undefined : run.ctx.ways.get(wayId) ?? run.ways.find((w) => w.id === wayId);
    const spineClass = way?.class ?? 'secondary';
    const bounding = wayId !== null && seamOfSpine(run.seams, wayId) !== undefined;
    if (bounding) return 'continuation-boundary';
    const rank = (c: string): number => (c === 'alley' ? 0 : c === 'lane' ? 1 : c === 'secondary' ? 2 : 3);
    if (rank(spineClass) > rank(cls)) return 'continuation-class';
    // Collinear within 6°: the new end's arrival against the existing lane's direction through the junction.
    const cosTol = dmath.cos(continuationCdeg(run) * (3.141592653589793 / 18000));
    if (!collinearThrough(run, near, end.arrival, cosTol)) return 'continuation-angle';
  }
  return null;
}

function continuationCdeg(run: Run): number {
  const t = run.ctx.tables?.cut ?? loadTable('cut');
  const v = t.cell('settings', 'continuationCdeg').value;
  return typeof v === 'number' ? v : 600;
}

/** An existing junction vertex (degree ≥ 3, or a junction row) within attractCm of p, or null. */
function nearestJunction(run: Run, p: LatticePoint): VertexId | null {
  const at = pointLocate(run.p, run.ctx.key, 1, p);
  const cand: VertexId[] = [];
  if (at.on === 'vertex') cand.push(at.vertex);
  else if (at.on === 'edge') {
    const h = at.edge;
    cand.push(run.p.halfEdges.origin[h], run.p.halfEdges.origin[h ^ 1]);
  }
  for (const v of cand) {
    const q = point(run.p, v);
    const d2 = (q.x - p.x) * (q.x - p.x) + (q.y - p.y) * (q.y - p.y);
    if (d2 > LATTICE.attractCm * LATTICE.attractCm) continue;
    if (outgoing(run.p, v).length >= 3) return v;
  }
  return null;
}

/** Does an existing non-spine edge at v continue the arrival within the tolerance (its direction ≈ −arrival reversed)? */
function collinearThrough(run: Run, v: VertexId, arrival: XY, cosTol: number): boolean {
  const o = point(run.p, v);
  for (const h of outgoing(run.p, v)) {
    const q = point(run.p, run.p.halfEdges.origin[h ^ 1]);
    const d = { x: q.x - o.x, y: q.y - o.y };
    const l = Math.sqrt(d.x * d.x + d.y * d.y);
    const x = div(d.x, l);
    const y = div(d.y, l);
    if (x === null || y === null) continue;
    // The existing lane leaves v on the far side: the same direction as the arrival.
    if (x * arrival.x + y * arrival.y >= cosTol) return true;
  }
  return false;
}

/** The generated lifecycle (§2.8). */
function generated(epoch: number): Block['lifecycle'] {
  return { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch, seq: 0 } };
}

// ---------------------------------------------------------------------------------------------------------------------
// The ladder on one face
// ---------------------------------------------------------------------------------------------------------------------

/** The plan's start and far side (rung (b)'s inputs) from any plan kind. */
function startFar(plan: CutPlan | null): { start: StartPlan | null; far: FarPlan | null } {
  if (plan === null || plan.kind === 'block') return { start: null, far: null };
  if (plan.kind === 'failed') return { start: plan.start, far: null };
  return { start: plan.start, far: plan.far };
}

/** Makes a block of a face that stops (or stands): the deep-interior rule, its record, its residue accounting. */
function makeBlock(run: Run, face: FaceId, hash: LineageHash, kerbRing: readonly (readonly LatticePoint[])[], how: BlockFaces['how'], stop: StopUse | null, depth: number, cell: number): void {
  const m = run.mintOne('block', run.cellHashes[cell], indexOfHash(run, hash, cell));
  const area = kerbRing.length > 0 ? areaOf(kerbRing[0]) : 0;
  run.builtArea += area;
  let d: DeepInterior;
  let interior: Block['interior'];
  let reach: Block['reach'];
  let depthClass: Block['depthClass'];
  if (how === 'empty') {
    depthClass = 'standard';
    interior = 'empty';
    reach = 'open';
    d = { depthClass, interior, reach, thicknessCm: 0, centre: { x: 0, y: 0 }, uniforms: null };
  } else if (how === 'court') {
    // Rung (d): substitution as a court block counted as residue (C-0036).
    run.residueArea += area;
    depthClass = 'standard';
    interior = 'court';
    reach = 'open';
    d = { depthClass, interior, reach, thicknessCm: 0, centre: { x: 0, y: 0 }, uniforms: null };
  } else {
    d = deepInterior({ rings: kerbRing }, run.interior, run.stream(m.key, 'cut.interior'));
    depthClass = d.depthClass;
    interior = d.interior;
    reach = d.reach;
  }
  const seeds: LatticePoint[] = [];
  const s0 = seedOf(kerbRing);
  if (s0 !== null) seeds.push(s0);
  // A back lane or a through alley: its spine in the same batch (§4.6), or the block keeps a court (C-0239 (8)).
  if ((interior === 'back_lane' || interior === 'through_alley') && run.stopped === null && kerbRing.length > 0) {
    const sp = interiorSpine(kerbRing[0], d.centre, interior);
    const cand = sp === null ? null : spineCandidate(run, face, kerbRing, sp, interior);
    let done = false;
    if (cand !== null) {
      const k = run.kerbFace(face);
      if (!('error' in k) && !k.empty) {
        const t = tryCandidate(run, face, k.kf, k.rings1, cand, cell, run.faceAddress(hash), 0, interior === 'back_lane' ? 'lane' : 'alley');
        if (t.ok && !t.slit) {
          done = true;
          seeds.length = 0;
          for (const c of t.children) {
            const s = seedOf(canonicalRings(faceRings(run.p, 1, c)));
            if (s !== null) seeds.push(s);
          }
        }
      }
    }
    if (!done) {
      run.warn('W_DEEP_SPINE_REFUSED');
      interior = 'court';
      reach = d.reach === 'open' ? 'open' : d.reach;
    }
    run.rungs.push({ face: run.faceAddress(hash), rung: 'deep', attempt: 0, outcome: done ? 'cut' : 'refused' });
  }
  const block: Block = {
    id: m.id,
    face: { owner: m.id, level: 2 },
    district: run.district.id,
    depthClass,
    interior,
    reach,
    content: 'ordinary',
    lifecycle: generated(run.ctx.epoch),
  };
  run.blocks.push(block);
  run.blockFaces.push({ block: m.id, seeds, kerb: kerbRing[0] ?? [], how, stop });
  if (depth > run.work.recursionDepth) run.work.recursionDepth = depth;
}

/** The creation index a face's lineage was made with (kept beside it). */
const FACE_INDEX = new WeakMap<object, number>();
function indexOfHash(_run: Run, hash: LineageHash, _cell: number): number {
  return FACE_INDEX.get(hash) ?? 0;
}

/** A back lane's or through alley's straight spine through the block, clipped to its kerb (both ways from the centre). */
function spineCandidate(run: Run, face: FaceId, kerbRings: readonly (readonly LatticePoint[])[], sp: { origin: XY; dir: XY }, treatment: 'back_lane' | 'through_alley'): Candidate | null {
  const k = run.kerbFace(face);
  if ('error' in k || k.empty) return null;
  const sides = faceSides(k.kf.rings, run.cells.turnTolCdeg, 0, run.cells.tangentWindowCm);
  const fwd = rayHit(sides.rings, sp.origin, sp.dir, 0.5);
  const back = rayHit(sides.rings, sp.origin, { x: -sp.dir.x, y: -sp.dir.y }, 0.5);
  if (fwd === null || back === null) return null;
  void kerbRings;
  const width = treatment === 'back_lane' ? run.wcells.bands.lane[1] : run.wcells.bands.alley[1];
  const c = straightCandidate(k.kf, sides.rings, back.point, fwd.point, [back.ring, fwd.ring], run.cells, width, 'deep');
  return c;
}

/** The ladder on one face (see the module comment). Returns the faces to recurse on. */
function ladderOn(run: Run, item: Pending): Pending[] {
  const face = run.locate(item);
  const faceAddr = run.faceAddress(item.hash);
  run.kernelCallsThisFace = 0;
  const done = (outcome: FaceLadder['outcome'], after: number): void => {
    run.faces.push({ face: faceAddr, depth: item.depth, kernelCalls: run.kernelCallsThisFace, outcome, facesAfter: after });
  };
  if (face === null) {
    run.rungs.push({ face: faceAddr, rung: 'unresolved', attempt: 0, outcome: 'none', why: 'lost' });
    done('unresolved', 1);
    return [];
  }
  const kr = run.kerbFace(face);
  if ('error' in kr) {
    run.rungs.push({ face: faceAddr, rung: 'unresolved', attempt: 0, outcome: 'block', why: kr.error });
    makeBlock(run, face, item.hash, [], 'unresolved', null, item.depth, item.cell);
    done('unresolved', 1);
    return [];
  }
  if (kr.empty) {
    makeBlock(run, face, item.hash, [], 'empty', null, item.depth, item.cell);
    done('empty', 1);
    return [];
  }
  const { kf, rings1 } = kr;
  // F-WORK: a stopped run, or a face at the depth limit, stands as a block (C-0085).
  if (run.stopped !== null || item.depth >= run.limits.recursionDepth) {
    if (run.stopped === null) {
      run.stopped = 'cut.recursionDepth';
      run.workCut.push({ counter: 'cut.recursionDepth', count: item.depth, limit: run.limits.recursionDepth });
    }
    run.rungs.push({ face: faceAddr, rung: 'work', attempt: 0, outcome: 'block', why: run.stopped });
    makeBlock(run, face, item.hash, kf.rings, 'work', null, item.depth, item.cell);
    done('work_cut', 1);
    return [];
  }
  const sides = faceSides(kf.rings, run.cells.turnTolCdeg, cornerScale(kf), run.cells.tangentWindowCm);
  const newLane = run.wcells.bands.lane[1];
  const children = (t: Extract<TryResult, { ok: true }>, outcome: FaceLadder['outcome']): Pending[] => {
    done(outcome, t.children.length);
    return t.children.map((c) => {
      const index = run.counters[item.cell];
      run.counters[item.cell] += 1;
      const hash = run.hashIn(run.cellHashes[item.cell], index);
      FACE_INDEX.set(hash, index);
      return { face: c, hash, depth: item.depth + 1, cell: item.cell, seed: seedOf(canonicalRings(faceRings(run.p, 1, c))) };
    });
  };

  // The reflex pre-cut and the antenna split (before step 1).
  const pre = reflexPreCut(kf, sides, run.plotDepthCm, run.cells, newLane);
  if (pre !== null) {
    const t = tryCandidate(run, face, kf, rings1, pre, item.cell, faceAddr, 0);
    if (t.ok) return children(t, t.slit ? 'slit' : 'cut');
    run.rungs.push({ face: faceAddr, rung: 'pre', attempt: 0, outcome: 'refused', why: t.why });
  }
  if (antennaTips(rings1[0] ?? []).length > 0) {
    const an = antennaCut(kf, sides, rings1[0], run.cells, newLane);
    if (an !== null) {
      const t = tryCandidate(run, face, kf, rings1, an, item.cell, faceAddr, 0);
      if (t.ok) return children(t, t.slit ? 'slit' : 'cut');
      run.rungs.push({ face: faceAddr, rung: 'antenna', attempt: 0, outcome: 'refused', why: t.why });
    }
  }

  // Step 1 and rung (a).
  const streams = planStreams(run, item.hash);
  const p0 = planCut(kf, run.planBase, streams);
  if (!p0.ok && p0.partial === undefined) {
    run.rungs.push({ face: faceAddr, rung: 'unresolved', attempt: 0, outcome: 'block', why: p0.code });
    makeBlock(run, face, item.hash, kf.rings, 'unresolved', null, item.depth, item.cell);
    done('unresolved', 1);
    return [];
  }
  const plan0 = (p0.ok ? p0.value : (p0.partial as CutPlan));
  const stop: StopUse = {
    face: faceAddr,
    key: keyText(plan0.stop.draw.key),
    uniforms: plan0.stop.uniforms,
    g: plan0.stop.g,
    tauCm: plan0.stop.tauCm,
    minorCm: plan0.minorCm,
    eLoCm: run.eLo,
    eHiCm: run.eHi,
    outcome: plan0.kind === 'block' ? 'block' : 'cut',
  };
  run.stops.push(stop);
  if (plan0.kind === 'block') {
    makeBlock(run, face, item.hash, kf.rings, 'stop', stop, item.depth, item.cell);
    done('block', 1);
    return [];
  }
  for (let attempt = 0; attempt < run.cells.maxFrames; attempt += 1) {
    let plan: CutPlan | null = plan0;
    if (attempt > 0) {
      if (!run.charge('candidates')) break;
      const pk = planCut(kf, { ...run.planBase, attempt, stop: plan0.stop }, streams);
      plan = pk.ok ? pk.value : ((pk.partial as CutPlan | undefined) ?? null);
    }
    const tKey = plan !== null && plan.draws.length > 1 ? keyText(plan.draws[plan.draws.length > 1 ? 1 : 0].key) : undefined;
    if (plan !== null && plan.kind === 'cut') {
      for (const g of plan.alternate === null ? [plan.cut] : [plan.cut, plan.alternate]) {
        const chain = snapGeometry(g.chain);
        if (chain === null) continue;
        const cand: Candidate = { rung: 'a', chain, kerbPoints: g.points, ends: [g.ends[0], g.ends[1]], slide: 0 };
        const t = tryCandidate(run, face, kf, rings1, cand, item.cell, faceAddr, attempt);
        if (t.ok) return children(t, t.slit ? 'slit' : 'cut');
        run.rungs.push({ face: faceAddr, rung: 'a', attempt, outcome: 'refused', why: t.why, ...(tKey === undefined ? {} : { key: tKey }) });
      }
    } else {
      run.rungs.push({ face: faceAddr, rung: 'a', attempt, outcome: 'none', why: plan === null ? 'plan' : plan.kind, ...(tKey === undefined ? {} : { key: tKey }) });
    }
    if (run.stopped !== null) break;
  }
  // Rung (b): the mean normal, from the unturned frame's start and far side.
  const sf = startFar(plan0);
  if (sf.start !== null && run.stopped === null) {
    const b = meanNormalCut(kf, sides, sf.start, sf.far, run.cells, newLane);
    if (b !== null) {
      const t = tryCandidate(run, face, kf, rings1, b, item.cell, faceAddr, 0);
      if (t.ok) return children(t, t.slit ? 'slit' : 'cut');
      run.rungs.push({ face: faceAddr, rung: 'b', attempt: 0, outcome: 'refused', why: t.why });
    } else run.rungs.push({ face: faceAddr, rung: 'b', attempt: 0, outcome: 'none' });
  }
  // Rung (c), then (d): the slide; a small face becomes a court block, a larger one slides on.
  const area = areaOf(kf.rings[0]);
  const feet = run.stopped === null ? slideFeet(sides, Math.max(1, run.limits.candidates - run.work.candidates)) : [];
  let triedC = false;
  for (const foot of feet) {
    if (run.stopped !== null) break;
    if (!foot.clear || foot.hit === null) {
      if (!run.charge('candidates')) break;
      continue;
    }
    const cand = straightCandidate(kf, sides.rings, foot.foot, foot.hit, [0, foot.hitRing], run.cells, newLane, 'c', foot.k);
    if (cand === null) continue;
    const t = tryCandidate(run, face, kf, rings1, cand, item.cell, faceAddr, 0);
    if (t.ok) {
      if (foot.k > 0) run.warn('W_CUT_SLID');
      return children(t, t.slit ? 'slit' : 'cut');
    }
    run.rungs.push({ face: faceAddr, rung: 'c', attempt: 0, outcome: 'refused', why: t.why, slide: foot.k });
    if (!triedC) {
      triedC = true;
      if (area <= run.substitutionMaxCm2) break;
    }
  }
  if (area <= run.substitutionMaxCm2 && run.stopped === null) {
    run.rungs.push({ face: faceAddr, rung: 'd', attempt: 0, outcome: 'block' });
    makeBlock(run, face, item.hash, kf.rings, 'court', stop, item.depth, item.cell);
    done('court', 1);
    return [];
  }
  if (run.stopped !== null) {
    run.rungs.push({ face: faceAddr, rung: 'work', attempt: 0, outcome: 'block', why: run.stopped });
    makeBlock(run, face, item.hash, kf.rings, 'work', stop, item.depth, item.cell);
    done('work_cut', 1);
    return [];
  }
  // Nothing cut it: the face stands as a block, reported (tier 6, never silent).
  run.rungs.push({ face: faceAddr, rung: 'unresolved', attempt: 0, outcome: 'block', why: 'ladder' });
  makeBlock(run, face, item.hash, kf.rings, 'unresolved', stop, item.depth, item.cell);
  done('unresolved', 1);
  return [];
}

/** The face's widest spine half-width (the kerb's corner scale; C-0222 (3)). */
function cornerScale(kf: KerbFace): number {
  let w = 0;
  for (const s of kf.spines ?? []) if (s.halfWidthCm > w) w = s.halfWidthCm;
  return w;
}

/** A planned chain on the lattice. */
function snapGeometry(chain: readonly XY[]): LatticePoint[] | null {
  const out: LatticePoint[] = [];
  for (const q of chain) {
    const x = Math.round(q.x);
    const y = Math.round(q.y);
    const last = out[out.length - 1];
    if (last === undefined || last.x !== x || last.y !== y) out.push({ x, y } as LatticePoint);
  }
  return out.length >= 2 ? out : null;
}

// ---------------------------------------------------------------------------------------------------------------------
// The batch and the strategy
// ---------------------------------------------------------------------------------------------------------------------

/** The scope counts a district's laws read (§5.1 (5)): its expected block count from its land and its band. */
export function districtCounts(p: Plat, cells: readonly FaceId[], eLoCm: number): { faces: number; vertices: number } {
  let area = 0;
  for (const f of cells) {
    const r = canonicalRings(faceRings(p, 1, f));
    if (r.length > 0) area += areaOf(r[0]);
  }
  const q = ratio(area, eLoCm * eLoCm, 'area');
  const faces = Math.max(1, Math.ceil(q.ok ? q.value : 1));
  return { faces, vertices: 16 * faces };
}

/** The district batch's work-limit total (§3.3): the kernel counters' laws over the scope's counts, summed. */
export function districtTxLimit(counts: { faces: number; vertices: number }, district: Id, wl: WorkLimitsTable = loadWorkLimits()): number {
  let sum = 0;
  for (const c of TX_COUNTERS) sum += workLimitOf(wl.law(c), { kind: 'district', id: district }, counts);
  return sum;
}

/** A district's batch: its KernelTx and its callback (the determinism harness runs the same pair on any arena). */
export interface DistrictBatch {
  readonly spec: KernelTx;
  readonly fn: (o: Overlay) => KernelResult<PartitionResult>;
}

/** Builds a district's batch on arena `p` as it stands (the limits read from the district's committed land). */
export function districtBatch(p: Plat, district: District, seams: readonly Seam[], ctx: DistrictContext): DistrictBatch {
  const [eLoM] = blockDepthRange(ctx.bands, ctx.regime);
  const cells0 = districtCells(p, district.id);
  const counts = districtCounts(p, cells0, eLoM * M_TO_CM);
  const wl = ctx.tables?.workLimits ?? loadWorkLimits();
  const scope = { kind: 'district' as const, id: district.id };
  const spec: KernelTx = {
    key: ctx.key,
    level: 1,
    ops: [],
    expect: [BLOCK_FLOOR_ROW],
    onFail: 'reject',
    batch: scope,
    stage: S8,
    rederivesFrom: S8,
    workLimit: districtTxLimit(counts, district.id, wl),
  };
  const fn = (o: Overlay): KernelResult<PartitionResult> => {
    const run = new Run(o, district, seams, ctx);
    run.limits.kernelCalls = workLimitOf(wl.law('cut.kernelCalls'), scope, counts);
    run.limits.recursionDepth = workLimitOf(wl.law('cut.recursionDepth'), scope, counts);
    run.limits.candidates = workLimitOf(wl.law('cut.candidates'), scope, counts);
    const cells = districtCells(run.p, district.id);
    // The district's width exponent (one cut.width draw keyed by the district) and L_ref (its OBB major extent).
    const dKey = entityKey(ctx.seedKey, ctx.lineage, ctx.key);
    const w = drawWidthExponent(run.stream(dKey, 'cut.width'), run.wcells);
    run.p_ = w.p;
    run.widthU = w.u;
    const pts: LatticePoint[] = [];
    for (const f of cells) for (const q of canonicalRings(faceRings(run.p, 1, f))[0] ?? []) pts.push(q);
    run.lRef = Math.max(1, majorExtent(pts));
    cells.forEach((f, ci) => {
      run.cellHashes.push(lineageHash({ arena: ctx.key, unit: ctx.lineage, stage: S6, epoch: ctx.epoch, index: ci, reroll: ctx.reroll }));
      run.counters.push(1);
      const hash = run.hashIn(run.cellHashes[ci], 0);
      FACE_INDEX.set(hash, 0);
      // Depth-first, issue order: the left child before the right (a stack, the right pushed first).
      const stack: Pending[] = [{ face: f, hash, depth: 0, cell: ci, seed: seedOf(canonicalRings(faceRings(run.p, 1, f))) }];
      while (stack.length > 0) {
        const item = stack.pop() as Pending;
        const next = ladderOn(run, item);
        for (let i = next.length - 1; i >= 0; i -= 1) stack.push(next[i]);
      }
    });
    const report: DistrictReport = {
      district: district.id,
      cells: cells.length,
      blocks: run.blocks.length,
      lanes: run.ways.length,
      p: run.p_,
      widthU: run.widthU,
      lRefCm: run.lRef,
      residueAreaCm2: run.residueArea,
      builtAreaCm2: run.builtArea,
      residueShare: run.builtArea > 0 ? (div(run.residueArea, run.builtArea) ?? 0) : 0,
      residueSoftExceeded: run.builtArea > 0 && run.residueArea > softShare(ctx) * run.builtArea,
      work: { ...run.work },
      limits: { ...run.limits },
      workCut: run.workCut.slice(),
      stops: run.stops,
      rungs: run.rungs,
      faces: run.faces,
      warnings: Object.freeze(Object.fromEntries([...run.warnings.entries()].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)))),
    };
    return ok({ blocks: run.blocks, ways: run.ways, junctions: run.junctions, seams: run.seams, portals: run.portals, blockFaces: run.blockFaces, minted: run.minted, report });
  };
  return { spec, fn };
}

function softShare(ctx: DistrictContext): number {
  const t = ctx.tables?.cut ?? loadTable('cut');
  const v = t.cell('ladder', 'substitutionSoftShare').value;
  return typeof v === 'number' ? v : 0.05;
}

/**
 * §4.6's `partition(district, seam, ctx)` for `bent-cut`: the district's batch through the façade's tx (one callback
 * L1 transaction); on a commit the minted entities join `ctx.live` and the stage's warnings go to the report sink.
 */
function partition(district: District, seam: readonly Seam[], ctx: DistrictContext, sc: FabricStageContext, k: Kernel): KernelResult<PartitionResult> {
  if (district.fabric !== 'bent-cut') stopError(`district ${district.id} asks for fabric '${district.fabric}', not bent-cut`);
  const b = districtBatch(k.plat(ctx.key), district, seam, ctx);
  const r = k.tx(b.spec, b.fn);
  if (!r.ok) return err(r.code, r.detail);
  const value = r.value.value as PartitionResult;
  ctx.live.push(...value.minted);
  const sink = sc.report as { warning?: (code: string, count?: number) => void } | undefined;
  if (sink !== undefined && typeof sink.warning === 'function') {
    for (const [code, n] of Object.entries(value.report.warnings).sort((a, b) => (a[0] < b[0] ? -1 : 1))) sink.warning(code, n);
  }
  return ok(value, r.warnings);
}

/** The base's fabric (§4.6 *The strategy slot*): registered for `bent-cut`. */
export const BentCutFabric: FabricStrategy = Object.freeze({
  partition,
  levelledUnits: (): LevelledUnit[] => [],
  terracedEdges: true,
});

/** The fabric row's id the base registers it under (§2.5's FabricStrategyId). */
export const BENT_CUT = 'bent-cut';

// The inscribed-circle centre for seeds: deepInterior.ts's search, bound here once (no import cycle at module load).
import { localThickness } from './deepInterior.js';
deepThickness = (rings) => {
  const r = localThickness(rings);
  return r.thicknessCm > 0 ? r.centre : null;
};
