// The base RiverStrategy (M0-e-02; §4.12, §4.2 S1 (3), §5.2 F-RIVER and F-WORK, R12-5, C-0085): `rivers(bp, terrain,
// water, ctx, k)` runs S1 (3) on the terrain S1 (1) made — the hydrology (flood, flats, D8, accumulation) on the
// `hydro` grid, then the river by descent from its inlet with its tributaries, the carve, the corridor's D8 and one
// accumulation, the width law — writes the flow arrays into the terrain record and returns the water with the rivers
// added. The steps' order is the design's: hydrology → trace (F-RIVER's carve and re-trace rungs inside, the inlet rung
// across attempts) → corridor D8 → accumulation once → widths → the carve written into the height raster.
//
// The draws (§6.1): `water.river` on the town root, one stream per attempt (attempt 0, then 1 and 2 for F-RIVER's
// inlet rung, the concern's default cap): an attempt ≥ 1 draws the inlet's shift along its edge first, then every
// trace draws its knots' two uniforms per ordinal, the river's first, its tributaries' after it on the same stream.
import { CONCERNS, dmath, err, keyText, ok, ratio, STAGES, type KernelResult, type Stream, type Warning } from '@plat/kernel';
import type { Cm, CmArray, HydroGrid, Id, Lifecycle, PointCm, StageContext, Terrain, WaterBody, WaterSet } from '@plat/model';
import { BASE_RUNGS, type BaseRung } from '@plat/tables';
import { hydroGridOver } from '../terrain/grid.js';
import { siteFrame, TOWN_ROOT } from '../terrain/strategy.js';
import type { SiteEnv } from '../terrain/types.js';
import { carveCourse, planCarve, rasterGeom } from './carve.js';
import { arcLengths, cellAt, pointSegDist2, rasterise, type XY } from './course.js';
import { accumulate, d8, recomputeCorridors, type Corridor, type D8Result } from './d8.js';
import { cellCount, D8_DX, D8_DY, hydroField, invCols, onBorder, type HydroField } from './field.js';
import { resolveFlats, type FlatsResult } from './flats.js';
import { priorityFlood, type FloodResult } from './flood.js';
import { CORE_SHARE, ESTUARY_FACTOR, ESTUARY_LENGTH_M, hydroParams, type HydroParams } from './params.js';
import { riverSurface, surfaceCapCm, type RiverSurface } from './surface.js';
import { descentLine, edgePoint, inletMasks, knotVertices, MeanderDraws, traceRiver, type Inlet, type RiverTrace } from './trace.js';
import type { RiverBlueprint, RiverLadderUse, RiverOptions, RiverOutcome, RiverReport, RiverRequest, RiverRequested, RiverRun, RiverStrategy } from './types.js';

const PI = 3.141592653589793;
const RAD_PER_CDEG = PI / 18000;
/** F-RIVER's inlet rung: attempts 0 … 2 (the concern's default cap, §6.1, C-0143). */
const ATTEMPTS = 3;
/** 2²⁰: scales a unit vector's components above ratio's 1 cm floor. */
const UNIT_SCALE = 1_048_576;

function quotient(num: number, den: number): number {
  const r = ratio(num, den, 'length');
  if (!r.ok) throw new RangeError(`river: a divisor of ${String(den)}`);
  return r.value;
}

/** The ids of S1's rivers at M0 (§6.3's minting is M0-d-05a's; C-0173 (1)). */
export function riverId(kind: 'river' | 'tributary', ordinal: number): Id {
  return `water:${kind}:${String(ordinal)}`;
}

/**
 * §12.4's hydrology row as the timing phase reports it (M0.md §1 *Timing bars*: "the hydrology row (≈ 16 ms at CITY,
 * reported)"; C-0173 (12)): the unit timed is `hydrology(terrain, grid, lakeThresholdCm)` on the rung's grid — its four
 * steps in this order — and the design's measured receipt per rung beside it. The timing itself is taken outside the
 * model packages (M0-e-06's harness, run by M0-t-01); this is the row's record shape.
 */
export const HYDROLOGY_ROW = Object.freeze({
  section: '§12.4',
  row: 'S1 hydrology',
  unit: 'hydrology(terrain, grid, lakeThresholdCm)',
  steps: Object.freeze(['priorityFlood', 'resolveFlats', 'd8', 'accumulate'] as const),
  reportedAt: 'CITY' as const,
  /** The design's receipt (§2.3; `fixall_kernel_r2_hydro`), ms: [low, high] per rung. */
  designMs: Object.freeze({ TOWN: Object.freeze([6.2, 7.0] as const), CITY: Object.freeze([15.9, 17.2] as const), METROPOLIS: Object.freeze([25.3, 26.5] as const) }),
  /** §12.4's cell count at CITY (≈ 102 000: 320² at 25 m over frame and margin). */
  designCellsCity: 102_000,
});

/** One timed run of the row, as the harness records it (its `ms` taken outside the model packages). */
export interface HydrologyRowRecord {
  row: 'S1 hydrology';
  rung: BaseRung;
  cellCm: number;
  cells: number;
  ms: number;
  authority: 'authoritative' | 'contended';
}

/** The hydrology of one grid (the §12.4 S1 row's mechanism, in order): flood, flats, D8, accumulation. */
export interface HydrologyRun {
  field: HydroField;
  flood: FloodResult;
  flats: FlatsResult;
  d8: D8Result;
}

/**
 * The hydrology (§2.3, §4.2 S1 (3)) of `terrain` on `grid`: the cells' heights sampled from the raster, the priority
 * flood with the lake typing, the two-gradient flats, D8 and one accumulation — the unit §12.4's hydrology row times.
 */
export function hydrology(terrain: Terrain, grid: HydroGrid, lakeThresholdCm: number): HydrologyRun {
  const field = hydroField(terrain, grid);
  const flood = priorityFlood(field, lakeThresholdCm);
  const flats = resolveFlats(field);
  const dir = d8(field);
  accumulate(field);
  return { field, flood, flats, d8: dir };
}

function generated(epoch: number): Lifecycle {
  return { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch, seq: 0 } };
}

function isBaseRung(r: string): r is BaseRung {
  return (BASE_RUNGS as readonly string[]).includes(r);
}

/** The four arena edges in the orthogonal D8 order: E, N, W, S. */
type Edge = 0 | 1 | 2 | 3;

/** The border cells of an edge, from its start (south or west end) to its end. */
function edgeCells(field: HydroField, edge: Edge): number[] {
  const g = field.grid;
  const out: number[] = [];
  if (edge === 0 || edge === 2) {
    const i = edge === 0 ? g.cols - 1 : 0;
    for (let j = 0; j < g.rows; j += 1) out.push(j * g.cols + i);
  } else {
    const j = edge === 1 ? g.rows - 1 : 0;
    for (let i = 0; i < g.cols; i += 1) out.push(j * g.cols + i);
  }
  return out;
}

/**
 * The squared distance from the frame's centre to the nearest cell centre of a line on the hydrology grid, and the
 * line's length in cells.
 */
function lineApproach(g: HydroGrid, cells: readonly number[]): number {
  const inv = invCols(g);
  let best = Infinity;
  for (const c of cells) {
    const i = c % g.cols;
    const j = Math.round((c - i) * inv);
    const x = g.originX + (i + 0.5) * g.cellCm;
    const y = g.originY + (j + 0.5) * g.cellCm;
    const d = x * x + y * y;
    if (d < best) best = d;
  }
  return best;
}

/** The outward D8 code of an edge's side. */
const EDGE_CODE: readonly number[] = [0, 2, 4, 6];

/** The river's surface for an inlet on `edge` (./surface.ts: that edge walled, a tributary's river `stop` an outlet). */
function edgeSurface(field: HydroField, edge: Edge, capCm: number, stop: Uint8Array | undefined): RiverSurface {
  const cells = edgeCells(field, edge);
  const masks = inletMasks(field.grid, cells[cells.length >> 1], stop);
  return riverSurface(field, masks.outlet, masks.edge, surfaceCapCm(capCm));
}

/**
 * Whether the river can descend from border cell `c` (C-0175 (6)): on its surface an 8-neighbour is admitted at a level
 * within the surface's cap of c's own height — else the first step would trench, or there is none.
 */
function descends(field: HydroField, surface: RiverSurface, c: number, capCm: number): boolean {
  const g = field.grid;
  const ci = c % g.cols;
  const cj = Math.round((c - ci) * invCols(g));
  const top = field.heightCm[c] + surfaceCapCm(capCm);
  for (let k = 0; k < 8; k += 1) {
    const x = ci + D8_DX[k];
    const y = cj + D8_DY[k];
    if (x < 0 || y < 0 || x >= g.cols || y >= g.rows) continue;
    const m = y * g.cols + x;
    if (surface.admitted[m] === 1 && surface.levelCm[m] <= top) return true;
  }
  return false;
}

/**
 * The inlet (§4.2 S1 (3): "the inlet lies on the arena's upstream edge (frame + margin; the requested bearing or the
 * highest edge)"; C-0173 (2), its point refined by C-0175 (6)): with a bearing, where the ray from the frame's centre at
 * that bearing meets the arena's edge; else on the edge of the highest mean height (ties E, N, W, S; `exclude`
 * skipped), at the cell of the edge's middle half whose descent on the river's surface (./surface.ts: that edge walled,
 * carveMaxCm `capCm`, a tributary's river `stop` an outlet) passes nearest the frame's centre — the core F-RIVER asks
 * the river to reach — then runs longest, then comes first along the edge. F-RIVER's inlet rung shifts it along its
 * edge by (u − ½) × the frame's half side (u the attempt stream's first draw), kept beside the frame and a cell inside
 * the edge's ends. Last, a point the river cannot descend from (`descends`: an edge hollow its surface leaves out) moves
 * to the nearest edge cell it can, inside the same limits (the lower end first on a tie).
 */
export function inletOf(
  field: HydroField,
  reach: { x: number; y: number },
  frameHalf: { x: number; y: number },
  bearingCdeg: number | undefined,
  shift: number | null,
  exclude: Edge | -1,
  capCm: number,
  stop?: Uint8Array,
): { inlet: Inlet; edge: Edge } {
  const g = field.grid;
  let edge: Edge;
  let px: number;
  let py: number;
  let surface: RiverSurface;
  if (bearingCdeg !== undefined) {
    const th = bearingCdeg * RAD_PER_CDEG;
    const dx = dmath.sin(th);
    const dy = dmath.cos(th);
    const ax = Math.abs(dx);
    const ay = Math.abs(dy);
    // The ray meets the east or west side first when reach.x ÷ |dx| ≤ reach.y ÷ |dy| (compared without a division);
    // the other coordinate is reach · (the cross component ÷ the hit component), the unit components scaled by 2²⁰
    // so the divisor clears ratio's floor (|dx| ≥ 1 / √5 on the side it hits at any aspect in [½, 2]).
    if (reach.x * ay <= reach.y * ax) {
      edge = dx > 0 ? 0 : 2;
      px = dx > 0 ? reach.x : -reach.x;
      py = quotient(reach.x * dy * UNIT_SCALE, ax * UNIT_SCALE);
    } else {
      edge = dy > 0 ? 1 : 3;
      py = dy > 0 ? reach.y : -reach.y;
      px = quotient(reach.y * dx * UNIT_SCALE, ay * UNIT_SCALE);
    }
    surface = edgeSurface(field, edge, capCm, stop);
  } else {
    let best: Edge = 0;
    let bestMean = -Infinity;
    for (const e of [0, 1, 2, 3] as Edge[]) {
      if (e === exclude) continue;
      const cells = edgeCells(field, e);
      let sum = 0;
      for (const c of cells) sum += field.heightCm[c];
      const mean = ratio(sum, cells.length, 'count');
      const m = mean.ok ? mean.value : -Infinity;
      if (m > bestMean) {
        bestMean = m;
        best = e;
      }
    }
    edge = best;
    surface = edgeSurface(field, edge, capCm, stop);
    // Along the edge's middle half, the cell whose descent on the river's surface passes nearest the frame's centre,
    // then the longest descent, then the first; a cell the river cannot descend from is never picked (the middle cell
    // when every one is).
    const cells = edgeCells(field, edge);
    const len = cells.length;
    const a = Math.floor(len * 0.25);
    const b = Math.max(a + 1, Math.ceil(len * 0.75));
    let pick = cells[len >> 1];
    let pickD = Infinity;
    let pickLen = -1;
    for (let q = a; q < b && q < len; q += 1) {
      if (!descends(field, surface, cells[q], capCm)) continue;
      const line = descentLine(field, surface, cells[q], stop, []);
      if (line.end.kind === 'stuck') continue;
      const d = lineApproach(g, line.cells);
      if (d < pickD || (d === pickD && line.cells.length > pickLen)) {
        pickD = d;
        pickLen = line.cells.length;
        pick = cells[q];
      }
    }
    const p = edgePoint(g, pick, reach, EDGE_CODE[edge]);
    px = p.x;
    py = p.y;
  }
  // Onto the edge exactly, then the attempt's shift along it — (u − ½) × the frame's half side — kept beside the frame
  // (the river arrives facing the town) and a cell clear of the edge's ends.
  const alongX = edge === 1 || edge === 3;
  const half = alongX ? reach.x : reach.y;
  const fh = alongX ? frameHalf.x : frameHalf.y;
  let along = alongX ? px : py;
  if (shift !== null) along += (shift - 0.5) * fh;
  const lim = Math.min(half - g.cellCm, fh);
  if (along > lim) along = lim;
  if (along < -lim) along = -lim;
  const onEdge = (v: number): XY => {
    const r = Math.round(v);
    return edge === 0 ? { x: reach.x, y: r } : edge === 2 ? { x: -reach.x, y: r } : edge === 1 ? { x: r, y: reach.y } : { x: r, y: -reach.y };
  };
  const cellOf = (p: XY): number => {
    const c = cellAt(g, p.x, p.y);
    const i = edge === 0 ? g.cols - 1 : edge === 2 ? 0 : c.i;
    const j = edge === 1 ? g.rows - 1 : edge === 3 ? 0 : c.j;
    return j * g.cols + i;
  };
  let at = onEdge(along);
  let cell = cellOf(at);
  if (!descends(field, surface, cell, capCm)) {
    // The nearest edge cell inside the limits the river can descend from, the lower end first on a tie.
    const cells = edgeCells(field, edge);
    const origin = alongX ? g.originX : g.originY;
    const q0 = alongX ? cell % g.cols : Math.round((cell - (cell % g.cols)) * invCols(g));
    for (let d = 1; d < cells.length; d += 1) {
      let moved = false;
      for (const q of [q0 - d, q0 + d]) {
        if (q < 0 || q >= cells.length) continue;
        const centre = origin + (q + 0.5) * g.cellCm;
        if (centre > lim || centre < -lim || !descends(field, surface, cells[q], capCm)) continue;
        at = onEdge(centre);
        cell = cells[q];
        moved = true;
        break;
      }
      if (moved) break;
    }
  }
  return { inlet: { cell, at }, edge };
}

/**
 * The degraded river kept when no attempt both fits and reaches the core (C-0173 (6)): a fitting course before one cut
 * short, then the delivered course (whole, or cut before its failure) passing nearest the frame's centre, then the
 * earlier attempt.
 */
function better(a: { trace: RiverTrace; dist2: number }, b: { trace: RiverTrace; dist2: number }): boolean {
  if (a.trace.ok !== b.trace.ok) return a.trace.ok;
  return a.dist2 < b.dist2;
}

/** The squared distance from the frame's centre to the course. */
function centreDist2(course: readonly XY[]): number {
  let best = Infinity;
  const o = { x: 0, y: 0 };
  for (let v = 0; v + 1 < course.length; v += 1) {
    const d = pointSegDist2(o, course[v], course[v + 1]);
    if (d < best) best = d;
  }
  if (course.length === 1) best = course[0].x * course[0].x + course[0].y * course[0].y;
  return best;
}

/** A course truncated before vertex `at` (≥ 2 vertices) and cut back further until its bed fits the cap. */
function truncated(terrain: Terrain, course: readonly XY[], at: number, carveMaxCm: number): XY[] {
  let end = Math.max(2, Math.min(course.length, at));
  for (; end > 2; end -= 1) {
    if (planCarve(terrain, course.slice(0, end), carveMaxCm).firstExceed < 0) break;
  }
  return course.slice(0, end);
}

/** The hydrology corridor of a fitting course: its cells in order (a simple path), reaching the border (or its join). */
function corridorOf(field: HydroField, course: readonly XY[], join: number, stop: Uint8Array | undefined): { cells: number[]; exit: number } {
  const g = field.grid;
  let cells = rasterise(g, course, true).cells;
  if (stop !== undefined) {
    // A tributary's corridor stops before the river it joins; it drains into the first of that river's cells it meets.
    const k = cells.findIndex((c) => stop[c] === 1);
    if (k > 0) return { cells: cells.slice(0, k), exit: cells[k] };
    if (k === 0) return { cells: [], exit: -1 };
    return connect(g, cells, join, stop);
  }
  // A course ending on the arena's edge may stop a cell short of the grid's border (the grid overshoots the arena by
  // less than a cell): the corridor steps on to the nearest border.
  const inv = invCols(g);
  for (let guard = 0; guard < g.cols + g.rows; guard += 1) {
    const c = cells[cells.length - 1];
    const i = c % g.cols;
    const j = Math.round((c - i) * inv);
    if (onBorder(g, i, j)) break;
    const { di, dj } = nearestSide(g, i, j);
    cells = [...cells, (j + dj) * g.cols + i + di];
  }
  return { cells, exit: -1 };
}

/** The step towards the nearest border side of cell (i, j). */
function nearestSide(g: HydroGrid, i: number, j: number): { di: number; dj: number } {
  const d = [g.cols - 1 - i, g.rows - 1 - j, i, j];
  let k = 0;
  for (let q = 1; q < 4; q += 1) if (d[q] < d[k]) k = q;
  return k === 0 ? { di: 1, dj: 0 } : k === 1 ? { di: 0, dj: 1 } : k === 2 ? { di: -1, dj: 0 } : { di: 0, dj: -1 };
}

/**
 * Extends a cell path by 8-steps towards `target` (a cell of the joined river) until the last cell is beside a cell of
 * that river: the path and the river's cell it drains into (the first met on the way, else the target).
 */
function connect(g: HydroGrid, cells: number[], target: number, stop: Uint8Array): { cells: number[]; exit: number } {
  const out = [...cells];
  const inv = invCols(g);
  const ti = target % g.cols;
  const tj = Math.round((target - ti) * inv);
  for (let guard = 0; guard < g.cols + g.rows; guard += 1) {
    const c = out[out.length - 1];
    const i = c % g.cols;
    const j = Math.round((c - i) * inv);
    if (Math.abs(ti - i) <= 1 && Math.abs(tj - j) <= 1) break;
    const next = (j + Math.sign(tj - j)) * g.cols + i + Math.sign(ti - i);
    if (stop[next] === 1) return { cells: out, exit: next };
    out.push(next);
  }
  return { cells: out, exit: target };
}

/** The width law (§4.2 S1 (3)): w0 · acc^exponent through dmath.pow, acc in cells of the rung's hydrology cell, clamped to the band. */
export function widthCm(params: HydroParams, accCells: number, cellCm: number, band: readonly [number, number]): number {
  const s = ratio(cellCm, params.hydroCellCm, 'length');
  const scale = s.ok ? s.value : 1;
  const acc = accCells * scale * scale;
  const w = params.w0Cm * dmath.pow(acc, params.exponent);
  const clamped = w < band[0] ? band[0] : w > band[1] ? band[1] : w;
  return Math.round(clamped);
}

/** A run of S1 (3): the hydrology, the rivers and the report (the strategy's body; tests and harnesses read the report). */
export function runRivers(bp: RiverBlueprint, terrain: Terrain, water: WaterSet, ctx: StageContext<SiteEnv>, opts: RiverOptions = {}): KernelResult<RiverRun> {
  const rung = ctx.rung.rung;
  if (!isBaseRung(rung)) return err('E_OUT_OF_RANGE', 'rung');
  if (!(terrain.cols >= 2 && terrain.rows >= 2 && terrain.heightCm.length === terrain.cols * terrain.rows)) return err('E_OUT_OF_RANGE', 'terrain');
  const frame = siteFrame(bp.size, ctx.rung, ctx.tables);
  if (!frame.ok) return err(frame.code, frame.detail);
  const params = hydroParams(ctx.tables, rung);
  const reach = { x: Math.ceil(frame.value.widthCm * (0.5 + frame.value.marginShare)), y: Math.ceil(frame.value.heightCm * (0.5 + frame.value.marginShare)) };
  const frameHalf = { x: frame.value.widthCm * 0.5, y: frame.value.heightCm * 0.5 };
  const extent = rasterGeom(terrain);
  const ladderUses: RiverLadderUse[] = [];
  const requested: RiverRequested[] = [];
  const warnings: Warning[] = [];
  const concern = CONCERNS['water.river'];
  const keyOf = (attempt: number): string => keyText({ entity: 'town', stage: STAGES.S1, concern, ...ctx.streamOpts(concern, TOWN_ROOT, attempt) });

  // F-WORK (C-0085): hydro.cells over its limit → R12-5's coarser step, the flood run there, reported work_cut.
  let cellCm = opts.hydroCoarsen === true ? params.hydroCoarseCellCm : params.hydroCellCm;
  let grid = hydroGridOver(extent, cellCm);
  const limit = opts.hydroCellsLimit ?? Infinity;
  let workCut: RiverReport['workCut'] = null;
  const count = cellCount(grid);
  if (count > limit) {
    const coarsened = cellCm !== params.hydroCoarseCellCm;
    workCut = { counter: 'hydro.cells', count, limit, coarsened, fromCellCm: cellCm, toCellCm: params.hydroCoarseCellCm };
    ladderUses.push({ cause: 'F-WORK', code: 'work_cut', rung: 1, name: 'coarsen', tier: 4, entity: terrain.id, key: keyOf(0), value: count });
    cellCm = params.hydroCoarseCellCm;
    grid = hydroGridOver(extent, cellCm);
  }
  const hyd = hydrology(terrain, grid, params.lakeThresholdCm);
  const field = hyd.field;
  const bodies: WaterBody[] = [];
  const outcomes: RiverOutcome[] = [];
  const request: RiverRequest | null | undefined = bp.site.river;

  if (request !== null && request !== undefined) {
    const streams = new Map<number, { stream: Stream; shift: number | null }>();
    const streamOf = (attempt: number): { stream: Stream; shift: number | null } => {
      let s = streams.get(attempt);
      if (s === undefined) {
        const stream = ctx.stream(concern, TOWN_ROOT, ctx.streamOpts(concern, TOWN_ROOT, attempt));
        const shift = attempt > 0 ? stream.float01() : null;
        s = { stream, shift };
        streams.set(attempt, s);
      }
      return s;
    };
    const coreR = CORE_SHARE * Math.min(frame.value.widthCm, frame.value.heightCm);
    const corridors: Corridor[] = [];
    const stopMask = new Uint8Array(cellCount(field.grid));
    const plans: { id: Id; kind: 'river' | 'tributary'; trace: RiverTrace; course: XY[]; corridor: number[] | null; band: readonly [number, number]; mouth: boolean; flowTo?: Id; ordinal: number }[] = [];

    // The river: F-RIVER's inlet rung over attempts 0 … 2.
    const mainId = riverId('river', 0);
    let mainEdge: 0 | 1 | 2 | 3 | -1 = -1;
    type Candidate = { trace: RiverTrace; attempt: number; core: boolean; edge: 0 | 1 | 2 | 3; dist2: number; course: XY[] };
    let chosen: Candidate | null = null;
    let fallback: Candidate | null = null;
    for (let attempt = 0; attempt < ATTEMPTS; attempt += 1) {
      const s = streamOf(attempt);
      const { inlet, edge } = inletOf(field, reach, frameHalf, request.inflowBearingCdeg, s.shift, -1, params.carveMaxCm);
      const trace = traceRiver(field, inlet, new MeanderDraws(s.stream), { terrain, carveMaxCm: params.carveMaxCm, spacingCm: params.controlSpacingCm, clearanceCm: params.riverBandCm[0], reach });
      for (const e of trace.events) {
        ladderUses.push({ cause: 'F-RIVER', rung: e.rung === 'carve' ? 1 : 2, name: e.rung, tier: 2, entity: mainId, key: keyOf(attempt), value: e.value });
      }
      // What this attempt would deliver: the course whole when it fits, else cut before its failure (C-0173 (6)); the
      // core and the degraded pick are measured on that delivered course.
      const delivered = trace.ok ? trace.course : truncated(terrain, trace.course, trace.cutAt, params.carveMaxCm);
      const dist2 = centreDist2(delivered);
      const core = dist2 <= coreR * coreR;
      const cand = { trace, attempt, core, edge, dist2, course: delivered };
      if (trace.ok && core) {
        chosen = cand;
        break;
      }
      if (fallback === null || better(cand, fallback)) fallback = cand;
      if (attempt + 1 < ATTEMPTS) ladderUses.push({ cause: 'F-RIVER', rung: 3, name: 'inlet', tier: 3, entity: mainId, key: keyOf(attempt + 1), value: attempt + 1 });
    }
    const main = chosen ?? fallback;
    if (main !== null) {
      mainEdge = main.edge;
      const fits = main.trace.ok;
      const course = main.course;
      let corridor: number[] | null = null;
      if (fits && main.trace.end.kind === 'frame') {
        const cor = corridorOf(field, course, -1, undefined);
        corridor = cor.cells;
        corridors.push({ cells: cor.cells, bedCm: runningMin(field, cor.cells), exit: -1 });
        for (const c of cor.cells) stopMask[c] = 1;
      }
      plans.push({ id: mainId, kind: 'river', trace: main.trace, course, corridor, band: params.riverBandCm, mouth: request.mouth === 'estuary' || request.mouth === 'delta', ordinal: 0 });
      const delivered = fits && main.core ? 'full' : 'degraded';
      requested.push({ feature: 'river', delivered, tier: delivered === 'full' ? tierOf(main.trace, main.attempt) : 4, entity: mainId, ...(delivered === 'full' ? {} : { cause: 'F-RIVER' }) });
      outcomes.push({ id: mainId, kind: 'river', attempt: main.attempt, fits, reachesCore: main.core, outfall: fits ? 'frame' : 'sink', maxCarveCm: planCarve(terrain, course, params.carveMaxCm).maxCarveCm, corridor: corridor !== null });
    }
    if (request.mouth === 'delta') requested.push({ feature: 'river.mouth.delta', delivered: 'degraded', tier: 4, entity: mainId, cause: 'M1: distributaries (§4b); the estuary widening built' });
    if (request.islands !== undefined && request.islands > 0) requested.push({ feature: 'river.islands', delivered: 'omitted', tier: 6, entity: mainId, cause: 'M1: river islands (§4b)' });

    // Tributaries, by the same rule from secondary inlets; each joins the river's corridor (or another tributary's).
    const tribs = request.tributaries ?? [];
    for (let t = 0; t < tribs.length; t += 1) {
      const id = riverId('tributary', t);
      const joinable = corridors.length > 0;
      let best: { trace: RiverTrace; attempt: number } | null = null;
      for (let attempt = 0; attempt < ATTEMPTS; attempt += 1) {
        const s = streamOf(attempt);
        const { inlet } = inletOf(field, reach, frameHalf, tribs[t].inflowBearingCdeg, s.shift, mainEdge, params.carveMaxCm, joinable ? stopMask : undefined);
        const trace = traceRiver(field, inlet, new MeanderDraws(s.stream), {
          terrain,
          carveMaxCm: params.carveMaxCm,
          spacingCm: params.controlSpacingCm,
          clearanceCm: params.tributaryBandCm[0],
          reach,
          ...(joinable ? { stop: stopMask } : {}),
        });
        for (const e of trace.events) {
          ladderUses.push({ cause: 'F-RIVER', rung: e.rung === 'carve' ? 1 : 2, name: e.rung, tier: 2, entity: id, key: keyOf(attempt), value: e.value });
        }
        if (best === null || (trace.ok && !best.trace.ok)) best = { trace, attempt };
        if (trace.ok) break;
        if (attempt + 1 < ATTEMPTS) ladderUses.push({ cause: 'F-RIVER', rung: 3, name: 'inlet', tier: 3, entity: id, key: keyOf(attempt + 1), value: attempt + 1 });
      }
      if (best === null) continue;
      const fits = best.trace.ok;
      const course = fits ? best.trace.course : truncated(terrain, best.trace.course, best.trace.cutAt, params.carveMaxCm);
      let corridor: number[] | null = null;
      const joined = best.trace.end.kind === 'join';
      if (fits) {
        const cor = corridorOf(field, course, best.trace.end.cell, joined ? stopMask : undefined);
        if (cor.cells.length > 0) {
          corridor = cor.cells;
          corridors.push({ cells: cor.cells, bedCm: runningMin(field, cor.cells), exit: joined ? cor.exit : -1 });
          for (const c of cor.cells) stopMask[c] = 1;
        }
      }
      plans.push({ id, kind: 'tributary', trace: best.trace, course, corridor, band: params.tributaryBandCm, mouth: false, ...(joined && fits ? { flowTo: mainId } : {}), ordinal: t });
      requested.push({ feature: `river.tributary.${String(t)}`, delivered: fits ? 'full' : 'degraded', tier: fits ? tierOf(best.trace, best.attempt) : 4, entity: id, ...(fits ? {} : { cause: 'F-RIVER' }) });
      outcomes.push({ id, kind: 'tributary', attempt: best.attempt, fits, reachesCore: true, outfall: fits ? (joined ? 'join' : 'frame') : 'sink', maxCarveCm: planCarve(terrain, course, params.carveMaxCm).maxCarveCm, corridor: corridor !== null });
    }

    // The corridors' D8, then accumulation once (§4.2 S1 (3)).
    if (corridors.length > 0) {
      recomputeCorridors(field, corridors);
      accumulate(field);
    }

    // Widths, then the carve written into the height raster, then the records.
    for (const p of plans) {
      const widths = widthProfile(field, params, p.course, p.corridor, p.band, cellCm, p.mouth);
      const half = widths.map((w) => w * 0.5);
      let course = p.course;
      let carved = carveCourse(terrain, course, params.carveMaxCm, half);
      // A later course meets ground an earlier carve lowered: cut it back until its bed fits (never trenched).
      while (!carved.ok && course.length > 2) {
        course = truncated(terrain, course, course.length - 1, params.carveMaxCm);
        carved = carveCourse(terrain, course, params.carveMaxCm, half.slice(0, course.length));
      }
      if (carved.ok) warnings.push(...carved.warnings);
      const used = course === p.trace.course ? p.trace.knots : knotsUpTo(p.trace, course);
      bodies.push({
        id: p.id,
        kind: p.kind,
        face: { owner: p.id, level: 0 },
        shore: { role: 'shore', entity: p.id },
        course: course.map((q) => ({ x: q.x as Cm, y: q.y as Cm }) as PointCm),
        controls: used.map((k, o) => ({ ordinal: o, at: { x: k.at.x as Cm, y: k.at.y as Cm } as PointCm })),
        nextControl: used.length,
        widthProfile: Int32Array.from(widths.slice(0, course.length)) as CmArray,
        ...(p.flowTo !== undefined ? { flowTo: p.flowTo } : {}),
        lifecycle: generated(ctx.epoch),
      });
    }
  }

  // The terrain record takes the hydrology (on the coarser grid when F-WORK or the switch took it).
  terrain.hydro = field.grid;
  terrain.flowDir = field.flowDir;
  terrain.flatRank = field.flatRank;
  terrain.flowAccum = field.flowAccum;
  let undefinedCells = 0;
  for (const k of field.flowDir) if (k > 7) undefinedCells += 1;
  const report: RiverReport = {
    work: { 'hydro.cells': hyd.flood.cells },
    workCut,
    ladderUses,
    requested,
    hydrology: {
      cellCm: field.grid.cellCm,
      cols: field.grid.cols,
      rows: field.grid.rows,
      d8Undefined: undefinedCells,
      flatCells: hyd.flats.flatCells,
      flats: hyd.flats.flats,
      depressions: hyd.flood.depressions,
    },
    rivers: outcomes,
    warnings,
  };
  return ok({ water: { bodies: [...water.bodies, ...bodies], bridges: water.bridges }, report }, warnings);
}

/** §5.1's tier of a delivered trace: 3 after the inlet rung (an attempt), 2 after a carve or re-trace, else 0. */
function tierOf(trace: RiverTrace, attempt: number): number {
  if (attempt > 0) return 3;
  return trace.events.length > 0 ? 2 : 0;
}

/**
 * The knots of a course cut short (a degraded course, C-0173 (6)): the knots whose nearest vertex of the full course
 * lies before the cut, then the cut's end as the outlet knot, ordinals renumbered in course order.
 */
function knotsUpTo(trace: RiverTrace, course: readonly XY[]): RiverTrace['knots'] {
  const end = course[course.length - 1];
  const at = knotVertices(trace.course, trace.knots);
  const out: RiverTrace['knots'] = [];
  trace.knots.forEach((k, q) => {
    if (at[q] < course.length - 1) out.push({ ...k, ordinal: out.length });
  });
  out.push({ ordinal: out.length, at: { x: end.x, y: end.y }, base: { x: end.x, y: end.y }, offsetCm: 0 });
  return out;
}

/** The running minimum of the hydrology heights along a corridor: its bed on the grid (non-increasing). */
function runningMin(field: HydroField, cells: readonly number[]): number[] {
  const out: number[] = [];
  let m = Infinity;
  for (const c of cells) {
    const v = field.heightCm[c];
    if (v < m) m = v;
    out.push(m);
  }
  return out;
}

/**
 * The width profile (§4.2 S1 (3)): at each course vertex w0 · acc^0.4 from the accumulation of its hydrology cell
 * (on a corridor, the corridor cell's), never narrower than upstream (O1 (b): width never decreases downstream),
 * clamped to the class band; the basic estuary widens the last ESTUARY_LENGTH_M to ESTUARY_FACTOR times.
 */
export function widthProfile(field: HydroField, params: HydroParams, course: readonly XY[], corridor: readonly number[] | null, band: readonly [number, number], cellCm: number, estuary: boolean): number[] {
  const g = field.grid;
  const onCorridor = new Map<number, number>();
  if (corridor !== null) corridor.forEach((c, k) => onCorridor.set(c, k));
  const out: number[] = [];
  let acc = 1;
  let lastK = -1;
  for (const p of course) {
    const { i, j } = cellAt(g, p.x, p.y);
    const c = j * g.cols + i;
    const k = onCorridor.get(c);
    if (corridor === null) {
      if (field.flowAccum[c] > acc) acc = field.flowAccum[c];
    } else if (k !== undefined && k >= lastK) {
      lastK = k;
      if (field.flowAccum[c] > acc) acc = field.flowAccum[c];
    }
    const w = widthCm(params, acc, cellCm, band);
    out.push(out.length > 0 && out[out.length - 1] > w ? out[out.length - 1] : w);
  }
  if (estuary && course.length > 1) {
    const arcs = arcLengths(course);
    const total = arcs[arcs.length - 1];
    const e = ESTUARY_LENGTH_M * 100;
    for (let v = 0; v < course.length; v += 1) {
      const into = arcs[v] - (total - e);
      if (into <= 0) continue;
      const r = ratio(into, e, 'length');
      const share = r.ok ? Math.min(1, r.value) : 1;
      out[v] = Math.round(out[v] * (1 + (ESTUARY_FACTOR - 1) * share));
    }
  }
  return out;
}

/** The S1 (3) strategy with its configuration (C-0173 (8)): the switch, F-WORK's limit and the report's sink. */
export function riverStrategy(opts: RiverOptions = {}): RiverStrategy {
  return Object.freeze({
    rivers(bp: RiverBlueprint, terrain: Terrain, water: WaterSet, ctx: StageContext<SiteEnv>, _k: SiteEnv['kernel']): KernelResult<WaterSet> {
      const run = runRivers(bp, terrain, water, ctx, opts);
      if (!run.ok) return err(run.code, run.detail);
      if (opts.onReport !== undefined) opts.onReport(run.value.report);
      return ok(run.value.water, run.warnings);
    },
  });
}

/** The base RiverStrategy (§4.12; registered as `base` by M0-x-04): the default switch (off) and no work limit. */
export const baseRivers: RiverStrategy = riverStrategy();
