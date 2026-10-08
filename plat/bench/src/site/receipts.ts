// The site spike's receipts (M0-e-06; M0.md §1 (e)'s bars NOW, §16 M0 (e), §13.1, §2.3, §4.2 S1 (3), (5), §4.3,
// §4.4 *Water and the waterfront*, §4.5; C-0048, C-0049, C-0067, C-0076, C-0087, C-0091, C-0271). Each receipt is read
// from one derivation's committed state — the arena through the kernel's own readers, the stages' records, the
// captured heights before the carve — never from the code under test's verdicts alone: D8 defined on the hydrology grid
// (frame and margin) and on its land cells; the river's bed monotone to its outfall; the carve against `carveMaxCm`;
// the stored relief and its clamp; the water gates (C-0087); the spans through crossing sites (C-0076); containment;
// the count law; the gate and bridgehead wards against the town; FieldBands' cuts; the soft terms at weight 0; the
// district and water faces through M0-a-12's corpus runner; the work per unit (C-0091). A `RunRecord` is plain,
// deterministic data (no time, no function): the report folds them.
import {
  CONCERNS,
  createRng,
  dest,
  faceRings,
  handleOf,
  idOf,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  outgoing,
  pointLocate,
  rowKey,
  rowsOn,
  STAGES,
  type Kernel,
  type LatticePoint,
  type Plat,
  type PlatKey,
  type Polygon,
} from '@plat/kernel';
import type { Bridge, Gate, Terrain, WaterSet } from '@plat/model';
import {
  fieldDriverSources,
  fieldFaces,
  fieldsCells,
  fieldsDigest,
  fieldsOwnTable,
  fieldsPass1,
  type FieldsPass1,
  type GrowthState,
  type S3Commit,
  type S3Slice,
  type S6Output,
  type ScalarField,
  type S4Output,
} from '@plat/layout';
import { hydroParams, rasterise, type RiverReport, type SiteResources } from '@plat/site';
import { parseTable, tableView, type BaseRung, type Table, type TableView } from '@plat/tables';
import { skeletonCorpus, type CorpusReport } from '../skeleton/runner.js';
import type { SpikeConfig, SpikeDerivation } from './compose.js';

const GROUND: PlatKey = Object.freeze({ layer: 'ground', part: 0 }) as PlatKey;

/** Which stages ran to their end, which refused (with the code), which were not reached (an earlier one refused). */
export type StageOutcome = 'ok' | 'not reached' | `refused ${string}`;

/** The hydrology receipt (§2.3; §13.1). */
export interface HydroReceipt {
  readonly cellCm: number;
  readonly cols: number;
  readonly rows: number;
  readonly cells: number;
  /** Cells with a D8 direction (0 … 7). */
  readonly defined: number;
  /** Cells whose centre lies on land (not in a water body's L0 face), and those with a direction. */
  readonly landCells: number;
  readonly landDefined: number;
  /** Every cell's flow path leaves the grid: the off-grid outlets' accumulation sums to the cell count. */
  readonly drainsOff: boolean;
}

/** The river receipt (§4.2 S1 (3)): per river its outcome, the bed under its course, the carve. */
export interface RiverReceipt {
  readonly id: string;
  readonly fits: boolean;
  readonly outfall: string;
  readonly reachesCore: boolean;
  readonly attempt: number;
  /** The bed's heights along the course (the height raster's cells it crosses): their count and whether they never rise. */
  readonly bedCells: number;
  readonly bedMonotone: boolean;
}

/** The carve and the stored relief (§2.3 Heights; §13.1's 3 000 m fixture). */
export interface ReliefReceipt {
  /** The deepest cut (cm), the cap, and the cells raised by the carve (0: it only cuts). */
  readonly deepestCutCm: number;
  readonly carveMaxCm: number;
  readonly raised: number;
  /** The stored relief before the carve (max − min, cm), the clamp warnings' cell count, the limit (cm). */
  readonly reliefCm: number;
  readonly clampedCells: number;
  readonly limitCm: number;
}

/** The water gates (C-0087): the trace across the river only at its water gates. */
export interface WaterGateReceipt {
  readonly gates: number;
  /** Wall edges lying over water (their midpoint in a water body's L0 face), and those carrying exactly one water gate's row. */
  readonly wallOverWater: number;
  readonly wallOverWaterGated: number;
  /** Water gates with exactly one gated wall edge over water, whose two ends are its two resolved gate_end vertices. */
  readonly gatesWithOneEdge: number;
  /** gate_end refs (the gate's own, ordinals 0 and 1) resolving to exactly one vertex, and those on a shore or bank edge of the river. */
  readonly endsResolved: number;
  readonly endsOnShore: number;
  /** Ends at the record's own bank point (`WaterGate.bankAt`): reported, not a bar — the kernel may attract an end on insertion. */
  readonly endsAtRecordedBank: number;
  /** Strip faces, and their vertices lying in the water deeper than WET_DEPTH_CM (0: the strips end at the banks). */
  readonly stripFaces: number;
  readonly stripVerticesInWater: number;
  /** Way N unchanged: main gates equal to the slice's gate sites. */
  readonly mainGates: number;
  readonly gateSites: number;
}

/** The crossing sites and spans (C-0076; §4.2 S1 (5)). */
export interface BridgeReceipt {
  readonly sites: number;
  readonly built: number;
  /** Built bridges whose way has an L1 edge between their two deck_end vertices (the span). */
  readonly builtWithSpan: number;
  /** Built bridges whose way's `bridge` names them. */
  readonly builtWayNamed: number;
  /** Sites still sites whose deck ends meet no way edge. */
  readonly sitesClear: number;
  /** Way edges over water that are not a span (0: routes cross water only at decks). */
  readonly wayOverWaterOffSpan: number;
}

/** The district receipt (§4.5; §16 M0 (e)): containment, the count law, the gate and bridgehead wards. */
export interface DistrictReceipt {
  readonly landHa: number;
  readonly nd: number;
  readonly districts: number;
  readonly countLaw: boolean;
  /** The stage's own count of claimable faces no district holds, and an independent sample. */
  readonly unownedByStage: number;
  readonly samples: number;
  readonly samplesContained: number;
  /** Of those, the samples a district holds (the rest lie in reservations, wall strips or water). */
  readonly samplesInDistricts: number;
  readonly wards: number;
  /** Median areas (ha) of the gate and bridgehead wards and of every district; null when none. */
  readonly wardMedianHa: number | null;
  readonly townMedianHa: number;
  readonly wardsBelow: boolean | null;
  readonly leftovers: number;
  readonly belowFloor: number;
  readonly merges: number;
}

/** One field's FieldBands receipt (C-0049): the land per band against its share, read back from the stored values. */
export interface BandReceipt {
  readonly field: string;
  readonly landCells: number;
  readonly perBand: readonly number[];
  readonly maxErrorCells: number;
  /** The read-back agrees with the record's per-band counts. */
  readonly readBack: boolean;
}

/** The fields' receipt: the bands, the weight-0 identity, the cell size, the work. */
export interface FieldsReceipt {
  readonly cellCm: number;
  readonly bands: readonly BandReceipt[];
  /** The record recomputed from the run's records equals the run's (the composition), and with the soft rows removed. */
  readonly recomputedEqual: boolean;
  readonly weightZeroIdentical: boolean;
}

/** The skeleton corpus counts for one face set and use (M0-a-12's runner, in-process; C-0067). */
export interface CorpusCounts {
  readonly faces: number;
  readonly skeletons: number;
  readonly downgrades: number;
  readonly workLimitHits: number;
  readonly failures: number;
}

/** One counter's charged work and its law's unit count (C-0091). */
export interface WorkRow {
  readonly work: number;
  readonly units: number;
}

/** A derivation's receipts. */
export interface RunRecord {
  readonly fixture: string;
  readonly config: SpikeConfig;
  readonly seed: number;
  readonly stages: Readonly<Record<string, StageOutcome>>;
  readonly bugs: readonly string[];
  readonly hydro: HydroReceipt | null;
  readonly rivers: readonly RiverReceipt[];
  readonly riverRequested: readonly string[];
  readonly relief: ReliefReceipt | null;
  readonly waterGates: WaterGateReceipt | null;
  readonly bridges: BridgeReceipt | null;
  readonly districts: DistrictReceipt | null;
  readonly fields: FieldsReceipt | null;
  readonly corpus: { readonly district: { roof: CorpusCounts; spine: CorpusCounts }; readonly water: { roof: CorpusCounts; spine: CorpusCounts } } | null;
  readonly work: Readonly<Record<string, WorkRow>>;
  /** Per stage: batches committed, refused, and the charged work's share of the limit at its largest. */
  readonly batches: Readonly<Record<string, { committed: number; refused: number; maxShare: number }>>;
}

// ---- small readers ------------------------------------------------------------------------------------------------------

function P(x: number, y: number): LatticePoint {
  return { x: Math.round(x), y: Math.round(y) } as LatticePoint;
}

function ground(d: SpikeDerivation): Plat {
  const p = d.model.plats.get('ground/0');
  if (p === undefined) throw new Error('site spike: the run holds no ground arena');
  return p;
}

/** The water bodies' handles in the arena. */
function waterHandles(p: Plat, water: WaterSet): Set<number> {
  const out = new Set<number>();
  for (const b of water.bodies) {
    const h = handleOf(p, b.id);
    if (h >= 0) out.add(h);
  }
  return out;
}

/** Whether a point lies strictly inside a water body's L0 face (a point on a shore edge or vertex is not). */
function inWater(p: Plat, bodies: ReadonlySet<number>, q: LatticePoint): boolean {
  if (bodies.size === 0) return false;
  const loc = pointLocate(p, GROUND, 0, q);
  return loc.on === 'face' && bodies.has(p.faces[loc.level].owner[loc.face]);
}

/** A point counts as in the water only past this depth (cm): M0-c-02's own test's tolerance (C-0087). */
export const WET_DEPTH_CM = 2;

/** The water bodies' L0 faces of one arena: their owners' handles and their rings. */
interface WaterIndex {
  readonly bodies: ReadonlySet<number>;
  readonly rings: readonly (readonly LatticePoint[])[];
}

function waterIndex(p: Plat, water: WaterSet): WaterIndex {
  const bodies = waterHandles(p, water);
  const rings: LatticePoint[][] = [];
  for (let f = 0; f < p.slots.face[0].top; f += 1) if (isFaceLive(p, 0, f) && bodies.has(p.faces[0].owner[f])) rings.push(...faceRings(p, 0, f));
  return { bodies, rings };
}

/** The distance (cm) from a point to the nearest edge of a set of rings. */
function ringsDistance(q: LatticePoint, rings: readonly (readonly LatticePoint[])[]): number {
  let best = Infinity;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const l = dx * dx + dy * dy;
      let t = l === 0 ? 0 : ((q.x - a.x) * dx + (q.y - a.y) * dy) / l;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const d = Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy);
      if (d < best) best = d;
    }
  }
  return best;
}

/** In the water deeper than WET_DEPTH_CM: inside a water body's L0 face and farther than that from its boundary. */
function wetDeep(p: Plat, w: WaterIndex, q: LatticePoint): boolean {
  return inWater(p, w.bodies, q) && ringsDistance(q, w.rings) > WET_DEPTH_CM;
}

/** An edge over water: its midpoint wet past the tolerance (an edge along a shore — a graze, C-0226 (7) — is not). */
function edgeOverWater(p: Plat, w: WaterIndex, e: { a: LatticePoint; b: LatticePoint }): boolean {
  return wetDeep(p, w, P((e.a.x + e.b.x) / 2, (e.a.y + e.b.y) / 2));
}

/** The receipts' one reading of a point, for a test that pins the tolerance: in the water deeper than WET_DEPTH_CM. */
export function pointInWaterDeep(p: Plat, water: WaterSet, q: LatticePoint): boolean {
  return wetDeep(p, waterIndex(p, water), q);
}

/** The receipts' one reading of an edge (the water gates', the spans'): over water by its midpoint past WET_DEPTH_CM. */
export function edgeInWaterDeep(p: Plat, water: WaterSet, a: LatticePoint, b: LatticePoint): boolean {
  return edgeOverWater(p, waterIndex(p, water), { a, b });
}

interface EdgeRow {
  readonly a: LatticePoint;
  readonly b: LatticePoint;
  readonly rows: { role: string; entity: string; ordinal: number }[];
}

/** Every live edge carrying a row of `role`. */
function edgesWith(p: Plat, role: string): EdgeRow[] {
  const out: EdgeRow[] = [];
  for (let h = 0; h < 2 * p.slots.pair.top; h += 2) {
    if (!isHalfEdgeLive(p, h)) continue;
    const rows = rowsOn(p, 'edge', h).map((r) => rowKey(p, r) as { role: string; entity: string; ordinal: number });
    if (!rows.some((r) => r.role === role)) continue;
    const o = p.halfEdges.origin[h];
    const t = dest(p, h);
    out.push({ a: P(p.vertices.x[o], p.vertices.y[o]), b: P(p.vertices.x[t], p.vertices.y[t]), rows });
  }
  return out;
}

/** The live vertex at a point, or −1. */
function vertexAt(p: Plat, q: LatticePoint): number {
  for (let v = 0; v < p.slots.vertex.top; v += 1) if (isVertexLive(p, v) && p.vertices.x[v] === q.x && p.vertices.y[v] === q.y) return v;
  return -1;
}

/** The rows on the edges meeting at vertex v. */
function incidentRows(p: Plat, v: number): { role: string; entity: string }[] {
  return outgoing(p, v).flatMap((h) => rowsOn(p, 'edge', h).map((r) => rowKey(p, r) as { role: string; entity: string }));
}

function same(a: LatticePoint, b: LatticePoint): boolean {
  return a.x === b.x && a.y === b.y;
}

/** The middle of a list (the mean of the two middles for an even count; M0-e-04's bars test's median). */
export function median(xs: readonly number[]): number {
  const s = xs.slice().sort((a, b) => a - b);
  const n = s.length;
  if (n === 0) return NaN;
  return n % 2 === 1 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}

/** Even–odd containment (strict). */
function insideRing(ring: readonly { x: number; y: number }[], q: { x: number; y: number }): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[i];
    const b = ring[j];
    if (a.y > q.y !== b.y > q.y && q.x < ((b.x - a.x) * (q.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

// ---- the stages' outcomes ---------------------------------------------------------------------------------------------------

/** Each spike stage's outcome from the report: refused (its bug's code), not reached (after a refusal) or ok. */
export function stageOutcomes(d: SpikeDerivation): Record<string, StageOutcome> {
  const out: Record<string, StageOutcome> = {};
  let refused = false;
  for (const s of d.model.order) {
    const bug = d.report.bugs.find((b) => b.stage === s);
    if (bug !== undefined) {
      out[s] = `refused ${bug.cls}`;
      refused = true;
    } else out[s] = refused ? 'not reached' : 'ok';
  }
  return out;
}

// ---- S1 ---------------------------------------------------------------------------------------------------------------------

/** D8 on the hydrology grid (§2.3): every cell, and the land cells (centre not strictly inside a water body). */
export function hydroReceipt(terrain: Terrain, p: Plat, water: WaterSet): HydroReceipt {
  const g = terrain.hydro;
  const n = g.cols * g.rows;
  const bodies = waterHandles(p, water);
  let defined = 0;
  let land = 0;
  let landDefined = 0;
  let off = 0;
  const DX = [1, 1, 0, -1, -1, -1, 0, 1];
  const DY = [0, 1, 1, 1, 0, -1, -1, -1];
  const frameReach = { x: p.frame.widthCm / 2, y: p.frame.heightCm / 2 };
  for (let c = 0; c < n; c += 1) {
    const k = terrain.flowDir[c];
    const ok = k <= 7;
    if (ok) defined += 1;
    const i = c % g.cols;
    const j = Math.floor(c / g.cols);
    const cx = g.originX + (i + 0.5) * g.cellCm;
    const cy = g.originY + (j + 0.5) * g.cellCm;
    // A cell centre outside the arena's frame is margin land (the water bodies lie inside the frame).
    const wet = Math.abs(cx) < frameReach.x && Math.abs(cy) < frameReach.y && inWater(p, bodies, P(cx, cy));
    if (!wet) {
      land += 1;
      if (ok) landDefined += 1;
    }
    if (ok) {
      const ii = i + DX[k];
      const jj = j + DY[k];
      if (ii < 0 || jj < 0 || ii >= g.cols || jj >= g.rows) off += terrain.flowAccum[c];
    }
  }
  return { cellCm: g.cellCm, cols: g.cols, rows: g.rows, cells: n, defined, landCells: land, landDefined, drainsOff: off === n };
}

/** The bed under each river's course (the height raster's cells it crosses, inlet to outfall) never rises. */
export function riverReceipts(terrain: Terrain, water: WaterSet, report: RiverReport | null): RiverReceipt[] {
  const out: RiverReceipt[] = [];
  const g = { cellCm: terrain.cellCm, cols: terrain.cols, rows: terrain.rows, originX: terrain.originX, originY: terrain.originY };
  for (const b of water.bodies) {
    if (b.kind !== 'river' && b.kind !== 'tributary') continue;
    const course = (b.course ?? []).map((q) => ({ x: q.x as number, y: q.y as number }));
    const cells = course.length < 2 ? [] : rasterise(g, course, true).cells;
    let mono = true;
    for (let k = 1; k < cells.length; k += 1) if (terrain.heightCm[cells[k]] > terrain.heightCm[cells[k - 1]]) mono = false;
    const o = report?.rivers.find((r) => r.id === b.id);
    out.push({ id: b.id, fits: o?.fits ?? false, outfall: o?.outfall ?? 'none', reachesCore: o?.reachesCore ?? false, attempt: o?.attempt ?? -1, bedCells: cells.length, bedMonotone: mono && cells.length > 1 });
  }
  return out;
}

/** The carve against its cap and the stored relief against its clamp (§2.3; the pre-carve heights captured). */
export function reliefReceipt(before: Int32Array, after: Terrain, rung: BaseRung, tables: TableView, clamped: number): ReliefReceipt {
  let deepest = 0;
  let raised = 0;
  let lo = Infinity;
  let hi = -Infinity;
  for (let c = 0; c < before.length; c += 1) {
    const cut = before[c] - after.heightCm[c];
    if (cut > deepest) deepest = cut;
    if (cut < 0) raised += 1;
    if (before[c] < lo) lo = before[c];
    if (before[c] > hi) hi = before[c];
  }
  return { deepestCutCm: deepest, carveMaxCm: hydroParams(tables, rung).carveMaxCm, raised, reliefCm: before.length === 0 ? 0 : hi - lo, clampedCells: clamped, limitCm: after.reliefLimitCm };
}

// ---- S3: the water gates ------------------------------------------------------------------------------------------------------

/** C-0087's receipt on the committed arena: the wall over water only at water gates; the gate ends; the strips. */
export function waterGateReceipt(k: Kernel, p: Plat, water: WaterSet, commit: S3Commit, slice: S3Slice): WaterGateReceipt {
  const w = waterIndex(p, water);
  const wall = edgesWith(p, 'wall');
  const gateIds = new Set(commit.waterGates.map((g) => g.id));
  const over = wall.filter((e) => edgeOverWater(p, w, e));
  const gated = over.filter((e) => e.rows.filter((r) => r.role === 'wall_gate' && gateIds.has(r.entity)).length === 1);
  let one = 0;
  let resolved = 0;
  let shore = 0;
  let recorded = 0;
  for (const g of commit.waterGates) {
    const ends: LatticePoint[] = [];
    const banks = g.banks ?? [];
    for (let end = 0; end < 2; end += 1) {
      const ref = banks[end];
      if (ref === undefined || ref.role !== 'gate_end' || ref.entity !== g.id || (ref.ordinal ?? 0) !== end) continue;
      const r = k.resolve(ref, GROUND);
      if (r.view !== 'vertices' || r.vertices.length !== 1) continue;
      const v = r.vertices[0];
      const at = P(p.vertices.x[v], p.vertices.y[v]);
      ends.push(at);
      resolved += 1;
      if (incidentRows(p, v).some((q) => (q.role === 'shore' || q.role === 'bank') && water.bodies.some((b) => b.id === q.entity))) shore += 1;
      if (same(at, g.bankAt[end])) recorded += 1;
    }
    const mine = over.filter((e) => e.rows.some((r) => r.role === 'wall_gate' && r.entity === g.id));
    if (ends.length === 2 && mine.length === 1 && ((same(mine[0].a, ends[0]) && same(mine[0].b, ends[1])) || (same(mine[0].a, ends[1]) && same(mine[0].b, ends[0])))) one += 1;
  }
  // The strips: no strip face's vertex lies in the water deeper than WET_DEPTH_CM.
  const owners = new Set([commit.strips.owners.inner, commit.strips.owners.outer].map((id) => handleOf(p, id)).filter((h) => h >= 0));
  let stripFaces = 0;
  let wet = 0;
  for (let f = 0; f < p.slots.face[1].top; f += 1) {
    if (!isFaceLive(p, 1, f) || !owners.has(p.faces[1].owner[f])) continue;
    stripFaces += 1;
    for (const ring of faceRings(p, 1, f)) for (const q of ring) if (wetDeep(p, w, q)) wet += 1;
  }
  const mains = commit.gates.filter((g: Gate) => g.kind === 'main').length;
  return {
    gates: commit.waterGates.length,
    wallOverWater: over.length,
    wallOverWaterGated: gated.length,
    gatesWithOneEdge: one,
    endsResolved: resolved,
    endsOnShore: shore,
    endsAtRecordedBank: recorded,
    stripFaces,
    stripVerticesInWater: wet,
    mainGates: mains,
    gateSites: slice.gateSites.length,
  };
}

// ---- S4: the spans ------------------------------------------------------------------------------------------------------------

/** C-0076's receipt: a built bridge's way spans its two deck ends; a site no route uses meets no way. */
export function bridgeReceipt(k: Kernel, p: Plat, water: WaterSet, s4: S4Output): BridgeReceipt {
  const w = waterIndex(p, water);
  const ways = edgesWith(p, 'way');
  const ends = (b: Bridge): LatticePoint[] => {
    const out: LatticePoint[] = [];
    for (const ref of b.deck) {
      const r = k.resolve(ref, GROUND);
      if (r.view === 'vertices' && r.vertices.length === 1) out.push(P(p.vertices.x[r.vertices[0]], p.vertices.y[r.vertices[0]]));
    }
    return out;
  };
  let built = 0;
  let span = 0;
  let named = 0;
  let clear = 0;
  const spans = new Set<number>();
  for (const b of s4.bridges) {
    const de = ends(b);
    if (b.state === 'built') {
      built += 1;
      const way = s4.network.ways.find((w) => w.id === b.way);
      if (way?.bridge === b.id) named += 1;
      const i = de.length === 2 ? ways.findIndex((e) => e.rows.some((r) => r.role === 'way' && r.entity === b.way) && ((same(e.a, de[0]) && same(e.b, de[1])) || (same(e.a, de[1]) && same(e.b, de[0])))) : -1;
      if (i >= 0) {
        span += 1;
        spans.add(i);
      }
    } else if (de.length === 2) {
      const touched = de.some((q) => {
        const v = vertexAt(p, q);
        return v >= 0 && incidentRows(p, v).some((r) => r.role === 'way');
      });
      if (!touched && b.way === null) clear += 1;
    }
  }
  let offSpan = 0;
  ways.forEach((e, i) => {
    if (!spans.has(i) && edgeOverWater(p, w, e)) offSpan += 1;
  });
  return { sites: s4.bridges.length, built, builtWithSpan: span, builtWayNamed: named, sitesClear: clear, wayOverWaterOffSpan: offSpan };
}

// ---- S6: districts --------------------------------------------------------------------------------------------------------------

/** The sample spacing of the containment check (cm): one point every 50 m over the perimeter's box. */
export const CONTAINMENT_STEP_CM = 5000;

/** §4.5's bars on one run: containment, the count law (± 1), the gate and bridgehead wards against the town. */
export function districtReceipt(k: Kernel, p: Plat, s6: S6Output): DistrictReceipt {
  const ids = new Set(s6.districts.map((d) => d.id));
  // Containment, sampled: every point inside the perimeter lies in a district or in a face S6 does not claim (a
  // reservation, the wall strips, water) — never in an unowned face, an S1 land component's face or the hinterland.
  let xmin = Infinity;
  let xmax = -Infinity;
  let ymin = Infinity;
  let ymax = -Infinity;
  for (const q of s6.perimeter) {
    xmin = Math.min(xmin, q.x);
    xmax = Math.max(xmax, q.x);
    ymin = Math.min(ymin, q.y);
    ymax = Math.max(ymax, q.y);
  }
  let samples = 0;
  let contained = 0;
  let inDistrict = 0;
  for (let x = Math.ceil(xmin / CONTAINMENT_STEP_CM) * CONTAINMENT_STEP_CM; x <= xmax; x += CONTAINMENT_STEP_CM) {
    for (let y = Math.ceil(ymin / CONTAINMENT_STEP_CM) * CONTAINMENT_STEP_CM; y <= ymax; y += CONTAINMENT_STEP_CM) {
      const q = P(x, y);
      if (!insideRing(s6.perimeter, q)) continue;
      const loc = k.geom.pointLocate(GROUND, 1, q);
      if (loc.on !== 'face') continue;
      samples += 1;
      const h = p.faces[loc.level].owner[loc.face];
      const owner = h >= 0 ? idOf(p, h) : null;
      if (owner !== null && owner !== s6.hinterland && !owner.startsWith('land:')) {
        contained += 1;
        if (ids.has(owner)) inDistrict += 1;
      }
    }
  }
  const alive = s6.grow.grown.filter((d) => d.mergedInto < 0);
  const wards = alive.filter((d) => d.seed.kind === 'gate' || d.seed.kind === 'bridgehead').map((d) => d.areaCm2 / 1e8);
  const town = alive.map((d) => d.areaCm2 / 1e8);
  const wm = wards.length === 0 ? null : median(wards);
  return {
    landHa: s6.report.landHa,
    nd: s6.report.nd,
    districts: s6.districts.length,
    countLaw: Math.abs(s6.districts.length - s6.report.nd) <= 1,
    unownedByStage: s6.report.unowned,
    samples,
    samplesContained: contained,
    samplesInDistricts: inDistrict,
    wards: wards.length,
    wardMedianHa: wm,
    townMedianHa: median(town),
    wardsBelow: wm === null ? null : wm < median(town),
    leftovers: s6.report.leftovers,
    belowFloor: s6.report.belowFloor,
    merges: s6.report.merges,
  };
}

// ---- S6's second half: the fields --------------------------------------------------------------------------------------------

/** fields.json without the soft terms' rows (the daylight and water terms' weights): "the model without them" (C-0049). */
export function withoutSoftRows(base: TableView = tableView()): TableView {
  const t = base.table('fields');
  const rows: Record<string, Record<string, Record<string, unknown>>> = {};
  for (const [rk, row] of t.rows) {
    rows[rk] = {};
    for (const [ck, c] of row) {
      if ((rk === 'prosperity' || rk === 'density' || rk === 'greenery') && (ck === 'daylight.weight' || ck === 'waterTerm.weight')) continue;
      rows[rk][ck] = { ...c, value: Array.isArray(c.value) ? [...(c.value as unknown[])] : c.value };
    }
  }
  const variant: Table = parseTable('fields', { table: t.id, version: t.version, section: t.section, rows });
  return {
    hash: base.hash,
    version: (id) => base.version(id),
    get: (id, key) => base.get(id, key),
    rows: (id) => base.rows(id),
    slice: (id, kind, key) => base.slice(id, kind, key),
    table: (id) => (id === 'fields' ? variant : base.table(id)),
  };
}

/** One field's bands read back from its stored values over the land (C-0049's bar: each band's land within one cell). */
export function bandReceipt(f: ScalarField, land: Uint8Array, shares: readonly number[]): BandReceipt {
  const per = shares.map(() => 0);
  let n = 0;
  for (let i = 0; i < f.values.length; i += 1) {
    if (land[i] !== 1) continue;
    n += 1;
    let b = 0;
    while (b < f.bands.cuts.length && f.values[i] >= f.bands.cuts[b]) b += 1;
    per[b] += 1;
  }
  let worst = 0;
  for (let b = 0; b < per.length; b += 1) worst = Math.max(worst, Math.abs(per[b] - shares[b] * n));
  const readBack = per.length === f.cutResult.perBand.length && per.every((v, i) => v === f.cutResult.perBand[i]);
  return { field: f.field, landCells: n, perBand: per, maxErrorCells: worst, readBack };
}

/**
 * The fields' receipt: the bands; the run's record recomputed from its records over the arena S6 left (the
 * composition, C-0266 (3)); and the same with the soft terms' rows removed — byte-identical by the fields' digest.
 * `tables` is the run's table view (a test may pass a variant to show the receipt is not blind).
 */
export function fieldsReceipt(d: SpikeDerivation, p: Plat, fields: FieldsPass1, coarse: boolean, tables: TableView = tableView()): FieldsReceipt {
  const cells = fieldsCells(tables);
  const bands = [fields.prosperity, fields.density, fields.greenery].map((f) => bandReceipt(f, fields.land, cells.shares));
  const m = d.model;
  const state = m.data.get('s5.growth') as GrowthState;
  const commit = m.data.get('s3.commit') as S3Commit;
  const slice = m.data.get('s3.slice') as S3Slice;
  const water = m.data.get('water') as WaterSet;
  const terrain = m.data.get('terrain') as Terrain;
  const resources = (m.data.get('resources') as SiteResources | undefined) ?? null;
  const s6 = m.data.get('s6') as S6Output;
  const sources = fieldDriverSources(p, { reservations: [commit.plaza], ways: state.ways, gates: state.stages.flatMap((st) => st.gates), water, mainStreetClasses: fieldsOwnTable().strs('mainStreet', 'classes') });
  const site = { frame: p.frame, rung: slice.site.rung, terrain, resources, sources };
  const districts = { districts: s6.districts, faces: fieldFaces(p) };
  const stream = () => createRng().stream(m.town.entityKey, STAGES.S6, CONCERNS['field.chance'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
  const opts = coarse ? { fieldsCoarsen: true } : {};
  const again = fieldsPass1(site, districts, tables, stream(), opts);
  const bare = fieldsPass1(site, districts, withoutSoftRows(tables), stream(), opts);
  const digest = fieldsDigest(fields);
  const eq = (a: readonly number[], b: readonly number[]): boolean => a.length === b.length && a.every((v, i) => v === b[i]);
  return {
    cellCm: fields.report.cellCm,
    bands,
    recomputedEqual: again.ok && eq(fieldsDigest(again.value), digest),
    weightZeroIdentical: bare.ok && eq(fieldsDigest(bare.value), digest),
  };
}

// ---- the skeleton corpus on the district and water faces ------------------------------------------------------------------

function counts(r: CorpusReport): CorpusCounts {
  return { faces: r.faces, skeletons: r.skeletons, downgrades: r.downgrades, workLimitHits: r.workLimitHits, failures: r.failures };
}

/** The district faces (each L1 face a district owns) and the water faces (each L0 face a water body owns), as rings. */
export function spikeFaces(p: Plat, s6: S6Output | null, water: WaterSet): { district: Polygon[][]; water: Polygon[][] } {
  const districtHandles = new Set((s6?.districts ?? []).map((d) => handleOf(p, d.id)).filter((h) => h >= 0));
  const bodies = waterHandles(p, water);
  const district: Polygon[][] = [];
  const wet: Polygon[][] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (isFaceLive(p, 1, f) && districtHandles.has(p.faces[1].owner[f])) district.push(faceRings(p, 1, f) as unknown as Polygon[]);
  for (let f = 0; f < p.slots.face[0].top; f += 1) if (isFaceLive(p, 0, f) && bodies.has(p.faces[0].owner[f])) wet.push(faceRings(p, 0, f) as unknown as Polygon[]);
  return { district, water: wet };
}

/** M0-a-12's corpus runner over the run's district and water faces, in-process (C-0067), both uses. */
export function corpusReceipt(p: Plat, s6: S6Output | null, water: WaterSet): RunRecord['corpus'] {
  const f = spikeFaces(p, s6, water);
  return {
    district: { roof: counts(skeletonCorpus(f.district, 'roof')), spine: counts(skeletonCorpus(f.district, 'spine')) },
    water: { roof: counts(skeletonCorpus(f.water, 'roof')), spine: counts(skeletonCorpus(f.water, 'spine')) },
  };
}

// ---- the record --------------------------------------------------------------------------------------------------------------

/** Every receipt of one derivation (the arena as S6 left it). */
export function runRecord(d: SpikeDerivation): RunRecord {
  const m = d.model;
  const p = ground(d);
  const k = m.kernel;
  const stages = stageOutcomes(d);
  const terrain = m.data.get('terrain') as Terrain | undefined;
  const water = (m.data.get('water') as WaterSet | undefined) ?? { bodies: [], bridges: [] };
  const commit = m.data.get('s3.commit') as S3Commit | undefined;
  const slice = m.data.get('s3.slice') as S3Slice | undefined;
  const s4 = m.data.get('s4') as S4Output | undefined;
  const s6 = m.data.get('s6') as S6Output | undefined;
  const fields = m.data.get('fields') as FieldsPass1 | undefined;
  const river = d.capture.river;
  const rung = d.blueprint.size.rung as BaseRung;
  const clamped = d.capture.terrainWarnings.filter((w) => w.code === 'W_HEIGHT_CLAMPED').reduce((s, w) => s + w.count, 0);
  const work: Record<string, WorkRow> = {};
  if (river !== null && terrain !== undefined) work['hydro.cells'] = { work: river.work['hydro.cells'], units: terrain.hydro.cols * terrain.hydro.rows };
  if (s4 !== undefined && slice !== undefined) work['route.nodes'] = { work: s4.report.work['route.nodes'], units: slice.lattice.points.length };
  if (s6 !== undefined) work['grower.turns'] = { work: s6.report.work['grower.turns'], units: d.capture.s6Faces };
  if (fields !== undefined) work['field.cells'] = { work: fields.report.work['field.cells'], units: fields.report.cols * fields.report.rows };
  const batches: Record<string, { committed: number; refused: number; maxShare: number }> = {};
  for (const b of d.capture.batches) {
    const row = batches[b.stage] ?? { committed: 0, refused: 0, maxShare: 0 };
    if (b.committed) row.committed += 1;
    else if (b.code !== null) row.refused += 1;
    if (b.limit > 0) row.maxShare = Math.max(row.maxShare, b.work / b.limit);
    batches[b.stage] = row;
  }
  return {
    fixture: d.fixture,
    config: d.config,
    seed: d.seed,
    stages,
    bugs: d.report.bugs.map((b) => `${b.stage} ${b.cls}`),
    hydro: terrain === undefined ? null : hydroReceipt(terrain, p, water),
    rivers: terrain === undefined ? [] : riverReceipts(terrain, water, river),
    riverRequested: (river?.requested ?? []).map((q) => `${q.feature} ${q.delivered}${q.cause === undefined ? '' : ` ${q.cause}`}`),
    relief: terrain === undefined || d.capture.preHeights === null ? null : reliefReceipt(d.capture.preHeights, terrain, rung, tableView(), clamped),
    waterGates: commit === undefined || slice === undefined ? null : waterGateReceipt(k, p, water, commit, slice),
    bridges: s4 === undefined ? null : bridgeReceipt(k, p, water, s4),
    districts: s6 === undefined ? null : districtReceipt(k, p, s6),
    fields: fields === undefined ? null : fieldsReceipt(d, p, fields, d.config === 'coarse'),
    corpus: terrain === undefined ? null : corpusReceipt(p, s6 ?? null, water),
    work,
    batches,
  };
}
