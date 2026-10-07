// The prosperity, density and greenery fields' pass 1 (M0-e-05; §4.5 *Fields*: P(x) = Σ_i w_i · kernel_i(x) +
// characterOffset(district) + ε(x), clamped once to [0, 1]; *Soft terms*; *The band set*; *Bands*; the density and
// greenery fields "by the same construction"; §6.1 `field.chance`; §12.4's S6 row; §5.2 F-WORK; R12-5; C-0049, C-0085;
// readings C-0255).
//
// Pass 1 runs in two declared halves (§4.5, LC-2):
//   * `fieldsDrivers(site, tables)` — the driver kernels that exist after S5, on 32 m cells over frame + margin: per
//     distance class (plaza, markets, main streets, gates, water, walls) one exact Euclidean distance transform
//     (./edt.ts), each field's kernel the linear decay max(0, 1 − d ÷ R) of its row's radius; the elevation above the
//     flood line and the low-and-damp ground from the terrain; the intent's wealth ramp (absent with no bearing); the
//     daylight and water soft terms (C-0049: at weight 0 neither kernel is evaluated, so the model is byte-identical to
//     the model without them; the daylight term's shade sampler is M2b's — a non-zero weight is refused, notBuilt);
//     summed per field in DRIVER_TERMS order with the weights of fields.json, then smoothed by the three-box blur of σ
//     (./blur.ts). This driver-only state is what S6's typing and S5d read (`prosperityAt`).
//   * `fieldsPass1(site, districts, tables, stream)` — after typing, the district-type term (each cell's district's
//     kind's offset, smoothed) and ε (each field's fBm from the `field.chance` stream — its samplers drawn in the order
//     prosperity, density, greenery — normalised over the grid, smoothed, and scaled once so that it carries its declared
//     share of the land's variance against the kernels': Var ε ÷ (Var ε + Var kernels) = 0.15, C-0255 (3)) complete
//     the field; it is clamped once and stored as a raster and per coarse face, and FieldBands' cuts are taken over the
//     land at the default household shares (./cuts.ts), with the middle band and the hysteresis.
// F-WORK (C-0085): `field.cells` is charged cols × rows per field before any field is computed; at its limit the grid
// takes R12-5's coarser step (48 m) and the report carries `work_cut` with the count. The `fieldsCoarsen` switch takes
// the coarser step from the start (R12-5's fallback): it changes the cell size and nothing else.
import { CONCERNS, createRng, dmath, fbmRow, H128, noiseStream, ratio, STAGES, type ConcernId, type Frame, type Hash128, type KernelResult, type StageId, type Stream } from '@plat/kernel';
import { err, ok } from '@plat/kernel';
import { mintTownRoot, type FieldBands, type Id, type Terrain } from '@plat/model';
import { coveringGrid, terrainSampler, type SiteResources } from '@plat/site';
import { loadWorkLimits, workLimitOf, type Table, type TableView, type WorkLimitsTable } from '@plat/tables';
import { blur3, boxFor, type BoxSpec } from './blur.js';
import { cutPoints, fieldBands } from './cuts.js';
import { distanceTransform, type DistanceField } from './edt.js';
import { cellOf, cx, cy, fieldGrid, fillRings, invCell, markArea, markPath, markPoint } from './grid.js';
import { fieldsCells, fieldsOwnTable, isDistanceClass, type FieldCells, type FieldsCells, type TermCells } from './table.js';
import {
  DISTANCE_CLASSES,
  FIELD_NAMES,
  type CutResult,
  type DensityField,
  type DistanceClass,
  type DriverField,
  type DriverTerm,
  type DriverValue,
  type FaceValue,
  type FieldDistricts,
  type FieldDrivers,
  type FieldGrid,
  type FieldName,
  type FieldSources,
  type FieldsReport,
  type FieldsWorkCut,
  type GreeneryField,
  type ProsperityField,
  type ScalarField,
  type XY,
} from './types.js';

const S6 = STAGES.S6 as StageId;

/** π (no Math member outside §6.5 (3)'s list). */
const PI = 3.141592653589793;

/** What the driver kernels read of the site (§4.5). */
export interface FieldSite {
  /** The frame (§3.2 (9)): the grid covers it and its margin. */
  readonly frame: Frame;
  /** The rung (the blur's σ row); CITY when absent. */
  readonly rung?: string;
  /** S1's terrain: the elevation and low-and-damp kernels read its heights (flat ground when absent). */
  readonly terrain?: Terrain | null;
  /** S1 (10)'s resources: the water term's q(x) reads `wellYield` (none when absent). Needs `terrain` (its grid). */
  readonly resources?: SiteResources | null;
  readonly sources: FieldSources;
  /** The intent's wealth bearing (§7.7, centidegrees clockwise from north); the term is absent without one. */
  readonly wealthBearingCdeg?: number | null;
}

/** pass 1's options. */
export interface FieldsOptions {
  /** R12-5's switch: the coarser step (48 m) from the start. */
  readonly fieldsCoarsen?: boolean;
  /** The work-limit table `field.cells`' law is read from (default the shipped one). */
  readonly workLimits?: WorkLimitsTable;
  /** `field.cells`' limit in place of the law's (F-WORK's test). */
  readonly fieldCellsLimit?: number;
  /** A variant of this folder's own table (a test's). */
  readonly own?: Table;
  /** The epoch FieldBands records (0: generation). */
  readonly epoch?: number;
}

/** The driver-only state (pass 1's first half) of the three fields, with what the second half reuses. */
export interface FieldsDriverState {
  readonly grid: FieldGrid;
  readonly cells: FieldsCells;
  readonly box: BoxSpec;
  readonly sigmaCm: number;
  /** Per distance class its transform, or null when the site holds no such source. */
  readonly distances: ReadonlyMap<DistanceClass, DistanceField | null>;
  /** The ground height at each cell centre (cm), and the flood line there. */
  readonly heights: Float64Array;
  readonly flood: Float64Array;
  /** The wells' yield at each cell centre (0 … 1; zeros without resources). */
  readonly wells: Float64Array;
  /** The wealth ramp at each cell (null: no bearing). */
  readonly ramp: Float64Array | null;
  readonly fields: readonly DriverField[];
  readonly switchCoarsen: boolean;
  readonly work: { readonly count: number; readonly limit: number };
  readonly workCut: FieldsWorkCut | null;
}

/** pass 1, complete. */
export interface FieldsPass1 {
  readonly grid: FieldGrid;
  readonly prosperity: ProsperityField;
  readonly density: DensityField;
  readonly greenery: GreeneryField;
  /** The land: the cells whose centre lies in a district's face. */
  readonly land: Uint8Array;
  readonly report: FieldsReport;
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** 1 ÷ a length (cm), refusing a length below 1 cm. */
function invLength(v: number, what: string): number {
  const r = ratio(1, v, 'length');
  if (!r.ok) throw new RangeError(`fields: ${what} of ${String(v)} cm`);
  return r.value;
}

/** `field.cells`' limit (§5.1 (5); C-0085): its law over the frame's cells — frame + margin at the default 32 m cell. */
export function fieldCellsLimit(frame: Frame, cellCm: number, wl: WorkLimitsTable = loadWorkLimits()): number {
  const g = fieldGrid(frame, cellCm);
  return workLimitOf(wl.law('field.cells'), { kind: 'stage', stage: S6 }, { frameCells: g.cols * g.rows });
}

/** The `field.chance` stream (§6.1: "the prosperity field's ε", keyed by the town root under S6). */
export function fieldChanceStream(seedKey: Readonly<Hash128>, opts: { readonly epoch?: number; readonly reroll?: number } = {}): Stream {
  return createRng().stream(mintTownRoot(seedKey).entityKey, S6, CONCERNS['field.chance'] as ConcernId, { reroll: opts.reroll ?? 0, attempt: 0, epoch: opts.epoch ?? 0, salt: 0 });
}

/** The marked cells of one distance class's sources. */
function sourceMask(cls: DistanceClass, s: FieldSources, g: FieldGrid, inv: number): Uint8Array | null {
  const m = new Uint8Array(g.cols * g.rows);
  let any = false;
  const area = (rings: readonly (readonly XY[])[]): void => {
    if (rings.length === 0) return;
    // each ring filled on its own (a reservation's or a water body's faces, never holes of one another), its edges marked
    for (const r of rings) markArea(m, g, inv, [r]);
    any = true;
  };
  const lines = (paths: readonly (readonly XY[])[]): void => {
    for (const p of paths) {
      if (p.length === 0) continue;
      markPath(m, g, inv, p, false);
      any = true;
    }
  };
  switch (cls) {
    case 'plaza':
      area(s.plaza);
      break;
    case 'market':
      area(s.markets);
      break;
    case 'mainStreet':
      lines(s.mainStreets);
      break;
    case 'gate':
      for (const p of s.gates) {
        markPoint(m, g, inv, p);
        any = true;
      }
      break;
    case 'water':
      area(s.water);
      lines(s.waterLines);
      break;
    case 'wall':
      lines(s.walls);
      break;
  }
  return any ? m : null;
}

/** The linear decay max(0, 1 − d ÷ R) of a distance class at every cell (0 everywhere without a source). */
function decay(d: DistanceField | null, g: FieldGrid, radiusCm: number, out: Float64Array, weight: number): void {
  if (d === null) return;
  const k = g.cellCm * invLength(radiusCm, 'a kernel radius');
  const d2 = d.d2;
  for (let i = 0; i < out.length; i += 1) {
    const t = 1 - Math.sqrt(d2[i]) * k;
    if (t > 0) out[i] += weight * t;
  }
}

/**
 * Adds weight × kernel of one term to `out` (unblurred). A soft term at weight 0 is not evaluated (C-0049); the daylight
 * term's shade sampler is M2b's, so a non-zero daylight weight is refused.
 */
function addTerm(st: Omit<FieldsDriverState, 'fields'>, t: TermCells, out: Float64Array): KernelResult<true> {
  const w = t.weight;
  if (w === 0) return ok(true);
  const n = out.length;
  const c = st.cells;
  if (isDistanceClass(t.term)) {
    decay(st.distances.get(t.term) ?? null, st.grid, t.radiusCm, out, w);
    return ok(true);
  }
  switch (t.term) {
    case 'base': {
      for (let i = 0; i < n; i += 1) out[i] += w;
      return ok(true);
    }
    case 'elevation': {
      const inv = invLength(c.elevationSpanCm, 'the elevation span');
      for (let i = 0; i < n; i += 1) out[i] += w * clamp01((st.heights[i] - st.flood[i]) * inv);
      return ok(true);
    }
    case 'lowDamp': {
      const water = st.distances.get('water') ?? null;
      if (water === null) return ok(true);
      const inv = invLength(c.lowDampBandCm, 'the low-ground band');
      const k = st.grid.cellCm * invLength(c.lowDampRadiusCm, 'the damp radius');
      for (let i = 0; i < n; i += 1) {
        const wet = 1 - Math.sqrt(water.d2[i]) * k;
        if (!(wet > 0)) continue;
        out[i] += w * (1 - clamp01((st.heights[i] - st.flood[i]) * inv)) * wet;
      }
      return ok(true);
    }
    case 'wealthGradient': {
      if (st.ramp === null) return ok(true);
      for (let i = 0; i < n; i += 1) out[i] += w * st.ramp[i];
      return ok(true);
    }
    case 'daylight':
      return err('E_OUT_OF_RANGE', "notBuilt('M2b'): the daylight term's shade sampler (§4.5 item 102; C-0049) — its weight stays 0 at M0");
    case 'waterTerm': {
      const water = st.distances.get('water') ?? null;
      const k = water === null ? 0 : st.grid.cellCm * invLength(c.waterTermRadiusCm, "the water term's radius");
      for (let i = 0; i < n; i += 1) {
        const near = water === null ? 0 : 1 - Math.sqrt(water.d2[i]) * k;
        const q = Math.max(near > 0 ? near : 0, st.wells[i]);
        out[i] += w * q;
      }
      return ok(true);
    }
    default:
      return err('E_OUT_OF_RANGE', `fields: the term '${t.term}' has no kernel`);
  }
}

/** The wealth ramp (§4.5: "a planar ramp rising toward Intent.wealthGradientCdeg"), 0 … 1 across the grid. */
function wealthRamp(g: FieldGrid, bearingCdeg: number): Float64Array {
  const a = (bearingCdeg * PI) / 18000;
  const ux = dmath.sin(a);
  const uy = dmath.cos(a);
  const hx = (g.cols * g.cellCm) / 2;
  const hy = (g.rows * g.cellCm) / 2;
  const ox = g.originX + hx;
  const oy = g.originY + hy;
  const span = Math.abs(ux) * hx + Math.abs(uy) * hy;
  const inv = invLength(2 * span, 'the ramp span');
  const out = new Float64Array(g.cols * g.rows);
  for (let j = 0; j < g.rows; j += 1) {
    const y = cy(g, j) - oy;
    for (let i = 0; i < g.cols; i += 1) out[j * g.cols + i] = clamp01(0.5 + ((cx(g, i) - ox) * ux + y * uy) * inv);
  }
  return out;
}

/** The ground height at each cell centre (bilinear on S1's raster, whole cm; 0 on flat ground). */
function heightsOf(g: FieldGrid, terrain: Terrain | null | undefined): Float64Array {
  const out = new Float64Array(g.cols * g.rows);
  if (terrain === null || terrain === undefined) return out;
  const s = terrainSampler(terrain, 250);
  for (let j = 0; j < g.rows; j += 1) for (let i = 0; i < g.cols; i += 1) out[j * g.cols + i] = s.heightAt({ x: cx(g, i), y: cy(g, j) } as Parameters<typeof s.heightAt>[0]);
  return out;
}

/** The wells' yield at each cell centre (the resource grid's cell holding it; zeros without resources; refused without the terrain). */
function wellsOf(g: FieldGrid, terrain: Terrain | null | undefined, res: SiteResources | null | undefined): KernelResult<Float64Array> {
  const out = new Float64Array(g.cols * g.rows);
  if (res === null || res === undefined) return ok(out);
  if (terrain === null || terrain === undefined) return err('E_OUT_OF_RANGE', 'fields: the resources need the terrain their grid lies on');
  const rg = coveringGrid({ cellCm: terrain.cellCm, cols: terrain.cols, rows: terrain.rows, originX: terrain.originX, originY: terrain.originY }, res.cellCm);
  if (res.wellYield.length !== rg.cols * rg.rows) return err('E_OUT_OF_RANGE', 'fields: the wells raster does not match its grid');
  const inv = invLength(rg.cellCm, 'the resource cell');
  for (let j = 0; j < g.rows; j += 1) for (let i = 0; i < g.cols; i += 1) out[j * g.cols + i] = res.wellYield[cellOf(rg, inv, { x: cx(g, i), y: cy(g, j) })];
  return ok(out);
}

/** A driver field's reader over its raster: the cell holding p, clamped to the grid. */
function reader(g: FieldGrid, values: Float64Array): (p: XY) => number {
  const inv = invCell(g);
  return (p: XY) => values[cellOf(g, inv, p)];
}

/**
 * pass 1's first half (see the module comment): the grid (with F-WORK's rung and the switch), the distance transforms,
 * the heights and flood line, and per field Σ w_i · kernel_i, blurred — the driver-only state.
 */
export function fieldsDrivers(site: FieldSite, tables: TableView, opts: FieldsOptions = {}): KernelResult<FieldsDriverState> {
  const cells = fieldsCells(tables, opts.own ?? fieldsOwnTable());
  const switchCoarsen = opts.fieldsCoarsen === true;
  let cellCm = switchCoarsen ? cells.coarseCellCm : cells.cellCm;
  let grid = fieldGrid(site.frame, cellCm);
  const limit = opts.fieldCellsLimit ?? fieldCellsLimit(site.frame, cells.cellCm, opts.workLimits);
  let count = grid.cols * grid.rows * FIELD_NAMES.length;
  let workCut: FieldsWorkCut | null = null;
  if (count >= limit) {
    const coarsened = cellCm !== cells.coarseCellCm;
    workCut = { code: 'work_cut', counter: 'field.cells', count, limit, coarsened, fromCellCm: cellCm, toCellCm: cells.coarseCellCm };
    cellCm = cells.coarseCellCm;
    grid = fieldGrid(site.frame, cellCm);
    count = grid.cols * grid.rows * FIELD_NAMES.length;
  }
  const inv = invCell(grid);
  const n = grid.cols * grid.rows;
  const distances = new Map<DistanceClass, DistanceField | null>();
  for (const cls of DISTANCE_CLASSES) {
    const m = sourceMask(cls, site.sources, grid, inv);
    distances.set(cls, m === null ? null : distanceTransform(m, grid.cols, grid.rows));
  }
  const heights = heightsOf(grid, site.terrain);
  const flood = new Float64Array(n);
  const water = distances.get('water') ?? null;
  if (water !== null) {
    for (let i = 0; i < n; i += 1) flood[i] = heights[water.nearest[i]] + cells.floodRiseCm;
  } else {
    let lo = Infinity;
    for (let i = 0; i < n; i += 1) if (heights[i] < lo) lo = heights[i];
    flood.fill(lo + cells.floodRiseCm);
  }
  const wellsR = wellsOf(grid, site.terrain, site.resources);
  if (!wellsR.ok) return err(wellsR.code, wellsR.detail);
  const wells = wellsR.value;
  const bearing = site.wealthBearingCdeg;
  const ramp = bearing === null || bearing === undefined ? null : wealthRamp(grid, bearing);
  const sigmaCm = cells.sigmaCm(site.rung ?? 'CITY');
  const box = boxFor(sigmaCm * inv);
  const base = { grid, cells, box, sigmaCm, distances, heights, flood, wells, ramp, switchCoarsen, work: { count, limit }, workCut };
  const fields: DriverField[] = [];
  for (const fc of cells.fields) {
    const k = new Float64Array(n);
    for (const t of fc.terms) {
      const r = addTerm(base, t, k);
      if (!r.ok) return err(r.code, `${fc.field}: ${r.detail}`);
    }
    blur3(k, grid.cols, grid.rows, box);
    const values = new Float64Array(n);
    for (let i = 0; i < n; i += 1) values[i] = clamp01(k[i]);
    const at = reader(grid, values);
    fields.push(Object.freeze({ field: fc.field, name: 'driver-only', grid, unclamped: k, values, valueAt: at, prosperityAt: at }));
  }
  return ok(Object.freeze({ ...base, fields }));
}

/** Mean and variance over the land cells (two passes, in index order). */
function landMoments(a: Float64Array, land: Uint8Array, cells: number): { mean: number; variance: number } {
  if (cells < 1) return { mean: 0, variance: 0 };
  const invN = ratio(1, cells, 'count');
  if (!invN.ok) return { mean: 0, variance: 0 };
  let s = 0;
  for (let i = 0; i < a.length; i += 1) if (land[i] !== 0) s += a[i];
  const mean = s * invN.value;
  let v = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (land[i] === 0) continue;
    const d = a[i] - mean;
    v += d * d;
  }
  return { mean, variance: v * invN.value };
}

/** ε's raw field for one field: its fBm sampler drawn from `stream`, evaluated at every cell, normalised over the grid. */
function chanceRaster(grid: FieldGrid, cells: FieldsCells, stream: Stream): KernelResult<Float64Array> {
  const c = cells.chance;
  const ns = noiseStream(stream, { lacunarity: c.lacunarity, gain: c.gain }, c.octaves);
  if (!ns.ok) return err(ns.code, `ε's sampler: ${ns.detail}`);
  const k = invLength(c.wavelengthCm, "ε's wavelength");
  const n = grid.cols * grid.rows;
  const out = new Float64Array(n);
  const row = new Float64Array(grid.cols);
  for (let j = 0; j < grid.rows; j += 1) {
    fbmRow(row, cx(grid, 0) * k, grid.cellCm * k, grid.cols, cy(grid, j) * k, c.octaves, ns.value);
    out.set(row, j * grid.cols);
  }
  // normalised over the whole grid — the stream's alone: zero mean, unit variance
  const all = new Uint8Array(n).fill(1);
  const m = landMoments(out, all, n);
  if (m.variance > 0) {
    // eslint-disable-next-line plat/ratio-division -- the variance is > 0 on the line above; an fBm's spread on [−1, 1] lies below ratio()'s count floor of 1
    const inv = 1 / Math.sqrt(m.variance);
    for (let i = 0; i < n; i += 1) out[i] = (out[i] - m.mean) * inv;
  } else out.fill(0);
  return ok(out);
}

/** The FieldDrivers of a field over points (see ScalarField.drivers). */
function driversOf(
  field: FieldName,
  grid: FieldGrid,
  terms: readonly TermCells[],
  termRaster: (t: TermCells) => Float64Array,
  offset: Float64Array,
  chance: Float64Array,
  unclamped: Float64Array,
  values: Float64Array,
  points: readonly XY[],
): FieldDrivers {
  if (points.length === 0) throw new RangeError(`${field}.drivers: no point`);
  const inv = invCell(grid);
  const idx = points.map((p) => cellOf(grid, inv, p));
  const invN = ratio(1, idx.length, 'count');
  if (!invN.ok) throw new RangeError(`${field}.drivers: no point`);
  const mean = (a: Float64Array): number => {
    let s = 0;
    for (const i of idx) s += a[i];
    return s * invN.value;
  };
  const out: DriverValue[] = [];
  let sum = 0;
  for (const t of terms) {
    const v = t.weight === 0 ? 0 : mean(termRaster(t));
    out.push({ term: t.term, weight: t.weight, value: v });
    sum += v;
  }
  const characterOffset = mean(offset);
  const ch = mean(chance);
  sum += characterOffset + ch;
  return { field, points: idx.length, terms: out, characterOffset, brush: 0, drift: 0, chance: ch, sum, unclamped: mean(unclamped), value: mean(values) };
}

/** A face's outer-ring centroid (its first vertex when the ring has no area). */
function centroidOf(ring: readonly XY[]): XY {
  let a2 = 0;
  let sx = 0;
  let sy = 0;
  const n = ring.length;
  for (let k = 0; k < n; k += 1) {
    const p = ring[k];
    const q = ring[k + 1 === n ? 0 : k + 1];
    const c = p.x * q.y - q.x * p.y;
    a2 += c;
    sx += (p.x + q.x) * c;
    sy += (p.y + q.y) * c;
  }
  const inv = ratio(1, 3 * a2, 'area');
  if (!inv.ok || n === 0) return n === 0 ? { x: 0, y: 0 } : { x: ring[0].x, y: ring[0].y };
  return { x: sx * inv.value, y: sy * inv.value };
}

/**
 * pass 1, complete (§4.5; see the module comment): the driver-only state (`opts`' or computed here), then after typing
 * the district-type term and ε, the clamp, the per-face values and FieldBands per field. `stream` is the `field.chance`
 * stream (`fieldChanceStream`); its draws are ε's samplers, prosperity's first.
 */
export function fieldsPass1(site: FieldSite, districts: FieldDistricts, tables: TableView, stream: Stream, opts: FieldsOptions & { readonly drivers?: FieldsDriverState } = {}): KernelResult<FieldsPass1> {
  let st: FieldsDriverState;
  if (opts.drivers !== undefined) st = opts.drivers;
  else {
    const d = fieldsDrivers(site, tables, opts);
    if (!d.ok) return err(d.code, d.detail);
    st = d.value;
  }
  const { grid, cells, box } = st;
  const n = grid.cols * grid.rows;
  // The faces: each face's cells (centres inside its rings), the land (the districts' faces), each cell's kind.
  const kindOf = new Map<Id, string>();
  for (const d of districts.districts) kindOf.set(d.id, d.kind);
  const faceOf = new Int32Array(n).fill(-1);
  districts.faces.forEach((f, fi) => {
    fillRings(grid, f.rings, (i) => {
      faceOf[i] = fi;
    });
  });
  const land = new Uint8Array(n);
  let landCells = 0;
  const kindAt: (string | null)[] = districts.faces.map((f) => (f.owner === null ? null : (kindOf.get(f.owner) ?? null)));
  for (let i = 0; i < n; i += 1) {
    const fi = faceOf[i];
    if (fi >= 0 && kindAt[fi] !== null) {
      land[i] = 1;
      landCells += 1;
    }
  }
  const missing = new Set<string>();
  const out: ScalarField[] = [];
  for (let fx = 0; fx < cells.fields.length; fx += 1) {
    const fc: FieldCells = cells.fields[fx];
    const drv = st.fields[fx];
    // the district-type term, smoothed
    const offset = new Float64Array(n);
    for (let i = 0; i < n; i += 1) {
      const fi = faceOf[i];
      const kind = fi >= 0 ? kindAt[fi] : null;
      if (kind === null) continue;
      const o = fc.offset.get(kind);
      if (o === undefined) missing.add(kind);
      else offset[i] = o;
    }
    blur3(offset, grid.cols, grid.rows, box);
    // ε: the stream's fBm, normalised, smoothed, scaled to its share of the land's variance against the kernels'
    const raw = chanceRaster(grid, cells, stream);
    if (!raw.ok) return err(raw.code, `${fc.field}: ${raw.detail}`);
    const chance = raw.value;
    blur3(chance, grid.cols, grid.rows, box);
    const vk = landMoments(drv.unclamped, land, landCells).variance;
    const vn = landMoments(chance, land, landCells).variance;
    let scale = 0;
    if (vk > 0 && vn > 0) {
      const s = cells.epsilonShare;
      // eslint-disable-next-line plat/ratio-division -- vn > 0 and 1 − s > 0 (the share lies in [0, 1), checked by fieldsCells): the variances of a [0, 1] field lie far below ratio()'s count floor of 1
      scale = Math.sqrt(((s / (1 - s)) * vk) / vn);
    }
    for (let i = 0; i < n; i += 1) chance[i] *= scale;
    const unclamped = new Float64Array(n);
    const values = new Float64Array(n);
    for (let i = 0; i < n; i += 1) {
      const u = drv.unclamped[i] + offset[i] + chance[i];
      unclamped[i] = u;
      values[i] = clamp01(u);
    }
    // per coarse face: the mean over its cells, else the cell at its centroid
    const sums = new Float64Array(districts.faces.length);
    const counts = new Int32Array(districts.faces.length);
    for (let i = 0; i < n; i += 1) {
      const fi = faceOf[i];
      if (fi < 0) continue;
      sums[fi] += values[i];
      counts[fi] += 1;
    }
    const inv = invCell(grid);
    const faces: FaceValue[] = districts.faces.map((f, fi) => {
      let value: number;
      if (counts[fi] > 0) {
        const r = ratio(sums[fi], counts[fi], 'count');
        value = r.ok ? r.value : 0;
      } else value = values[cellOf(grid, inv, centroidOf(f.rings[0] ?? []))];
      return { key: f.key, owner: f.owner, cells: counts[fi], value };
    });
    const cut: CutResult = cutPoints(values, cells.shares, land);
    const bands: FieldBands = fieldBands(fc.field, cut, cells.bands, cells.shares, cells.hysteresis, opts.epoch ?? 0);
    // the oracle's per-term rasters, computed on first read (each term weighted and smoothed alone)
    const cache = new Map<DriverTerm, Float64Array>();
    const termRaster = (t: TermCells): Float64Array => {
      const hit = cache.get(t.term);
      if (hit !== undefined) return hit;
      const a = new Float64Array(n);
      const r = addTerm(st, t, a);
      if (!r.ok) throw new RangeError(`${fc.field}.drivers: ${r.detail}`);
      blur3(a, grid.cols, grid.rows, box);
      cache.set(t.term, a);
      return a;
    };
    const at = reader(grid, values);
    const field = fc.field;
    const terms = fc.terms;
    const f: ScalarField = {
      field,
      name: `pass1:${field}`,
      grid,
      unclamped,
      values,
      faces,
      bands,
      cutResult: cut,
      chanceScale: scale,
      valueAt: at,
      drivers: (points: readonly XY[]) => driversOf(field, grid, terms, termRaster, offset, chance, unclamped, values, points),
    };
    out.push(field === 'prosperity' ? Object.freeze({ ...f, prosperityAt: at }) : Object.freeze(f));
  }
  const report: FieldsReport = {
    cellCm: grid.cellCm,
    switchCoarsen: st.switchCoarsen,
    cols: grid.cols,
    rows: grid.rows,
    work: { 'field.cells': st.work.count, limit: st.work.limit },
    workCut: st.workCut,
    sigmaM: st.sigmaCm / 100,
    blur: { radius: box.radius, alpha: box.alpha },
    sourced: DISTANCE_CLASSES.filter((c) => st.distances.get(c) !== null),
    kindsWithoutOffset: [...missing].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)),
    landCells,
  };
  return ok({
    grid,
    prosperity: out[0] as ProsperityField,
    density: out[1] as DensityField,
    greenery: out[2] as GreeneryField,
    land,
    report,
  });
}

/** Little-endian bytes of the pass's stored state, for the digest. */
class Bytes {
  private buf = new Uint8Array(1 << 16);
  private view = new DataView(this.buf.buffer);
  private at = 0;

  private room(k: number): void {
    if (this.at + k <= this.buf.length) return;
    let cap = this.buf.length;
    while (cap < this.at + k) cap *= 2;
    const next = new Uint8Array(cap);
    next.set(this.buf.subarray(0, this.at));
    this.buf = next;
    this.view = new DataView(next.buffer);
  }

  f64(v: number): void {
    this.room(8);
    this.view.setFloat64(this.at, v, true);
    this.at += 8;
  }

  text(s: string): void {
    this.f64(s.length);
    for (let i = 0; i < s.length; i += 1) this.f64(s.charCodeAt(i));
  }

  bytes(): Uint8Array {
    return this.buf.subarray(0, this.at);
  }
}

/**
 * The digest of pass 1's stored state (§4.5's weight-0 identity is judged on it; C-0049): per field in order, the grid,
 * the clamped raster, the per-face values and the FieldBands record. Float64 values as their little-endian bytes.
 */
export function fieldsDigest(r: FieldsPass1): Hash128 {
  const b = new Bytes();
  for (const f of [r.prosperity, r.density, r.greenery] as ScalarField[]) {
    b.text(f.field);
    b.f64(f.grid.cellCm);
    b.f64(f.grid.cols);
    b.f64(f.grid.rows);
    b.f64(f.grid.originX);
    b.f64(f.grid.originY);
    for (let i = 0; i < f.values.length; i += 1) b.f64(f.values[i]);
    b.f64(f.faces.length);
    for (const fv of f.faces) {
      for (const k of fv.key) b.f64(k);
      b.text(fv.owner ?? '');
      b.f64(fv.cells);
      b.f64(fv.value);
    }
    b.text(f.bands.field);
    b.f64(f.bands.cuts.length);
    for (const c of f.bands.cuts) b.f64(c);
    b.f64(f.bands.hysteresis);
    for (const x of f.bands.bands) b.text(x);
    b.text(f.bands.middle);
    b.text(f.bands.source);
    b.f64(f.bands.epoch);
  }
  return H128(b.bytes());
}
