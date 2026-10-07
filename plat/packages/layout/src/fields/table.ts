// The fields' cells (M0-e-05; §4.5 *Fields*: "driver kernels from a table"; C-0049; readings C-XXXX (1)). Every weight and
// radius is a cell of `fields.json` (M0-s-02's table: one row per field, `<term>.weight` and `<term>.radiusM`, and its
// `settings` — the 32 m cell, R12-5's 48 m step, ε's share 0.15, the blur's σ per rung); the band set and its default
// household shares are `bands.json`'s; the mechanism's own cells (ε's fBm shape, the main-street classes, the elevation
// and low-and-damp spans, the water term's q radius, the district-type term per C-0035's synthetic kind) are this
// folder's own table `pass1.json`, checked by @plat/tables' `parseTable` like every table. No weight or radius constant is
// written in code; a cell of a field's row that names no known term is refused, never ignored.
import { parseTable, type Table, type TableView } from '@plat/tables';
import raw from './pass1.json';
import { DRIVER_TERMS, DISTANCE_CLASSES, FIELD_NAMES, type DistanceClass, type DriverTerm, type FieldName } from './types.js';

/** The fields' own table, checked once. */
let OWN: Table | null = null;

/** The `fieldsPass1` table (this folder's `pass1.json`), parsed and checked on first use. */
export function fieldsOwnTable(): Table {
  if (OWN === null) OWN = parseTable('fieldsPass1', raw);
  return OWN;
}

/** One term of a field's row: its weight and, for a distance class, its radius (cm). */
export interface TermCells {
  readonly term: DriverTerm;
  readonly weight: number;
  /** The radius of a distance class, cm (0 for the other terms). */
  readonly radiusCm: number;
}

/** One field's cells: its terms in DRIVER_TERMS order (only those its row carries) and its district-type term. */
export interface FieldCells {
  readonly field: FieldName;
  readonly terms: readonly TermCells[];
  /** characterOffset per kind (C-0035's synthetic kinds). */
  readonly offset: ReadonlyMap<string, number>;
}

/** Every cell pass 1 reads. */
export interface FieldsCells {
  readonly fields: readonly FieldCells[];
  readonly cellCm: number;
  readonly coarseCellCm: number;
  readonly epsilonShare: number;
  /** The blur's σ (cm) per rung row; `sigmaCm(rung)` reads it. */
  readonly sigmaCm: (rung: string) => number;
  readonly chance: { readonly wavelengthCm: number; readonly octaves: number; readonly lacunarity: number; readonly gain: number };
  readonly mainStreetClasses: readonly string[];
  readonly floodRiseCm: number;
  readonly elevationSpanCm: number;
  readonly lowDampBandCm: number;
  readonly lowDampRadiusCm: number;
  readonly waterTermRadiusCm: number;
  /** The band set in order, each band's household share (they sum to 1) and the hysteresis (bands.json). */
  readonly bands: readonly string[];
  readonly shares: readonly number[];
  readonly hysteresis: number;
}

function refuse(reason: string): never {
  throw new RangeError(`fields: ${reason}`);
}

const TERM_SET: ReadonlySet<string> = new Set(DRIVER_TERMS);
const DISTANCE_SET: ReadonlySet<string> = new Set(DISTANCE_CLASSES);

/** A field's row of fields.json read as its terms (refusing a cell that names no known term or field). */
function fieldRow(t: Table, field: FieldName, own: Table): FieldCells {
  const row = t.row(field);
  const weights = new Map<DriverTerm, number>();
  const radii = new Map<DriverTerm, number>();
  for (const [cell, c] of row) {
    const dot = cell.lastIndexOf('.');
    const term = cell.slice(0, dot);
    const what = cell.slice(dot + 1);
    if (dot < 0 || !TERM_SET.has(term)) refuse(`fields.json ${field}/${cell} names no driver term of §4.5`);
    if (typeof c.value !== 'number' || !Number.isFinite(c.value)) refuse(`fields.json ${field}/${cell} is not a number`);
    if (what === 'weight') weights.set(term as DriverTerm, c.value);
    else if (what === 'radiusM') {
      if (!(c.value > 0)) refuse(`fields.json ${field}/${cell}: a radius is a length > 0`);
      radii.set(term as DriverTerm, c.value * 100);
    } else refuse(`fields.json ${field}/${cell}: a term's cell is its weight or its radiusM`);
  }
  const terms: TermCells[] = [];
  for (const term of DRIVER_TERMS) {
    const w = weights.get(term);
    if (w === undefined) {
      if (radii.has(term)) refuse(`fields.json ${field}/${term}.radiusM has no weight`);
      continue;
    }
    const r = radii.get(term);
    if (DISTANCE_SET.has(term) && r === undefined) refuse(`fields.json ${field}/${term}.weight: a distance kernel needs its radiusM`);
    terms.push({ term, weight: w, radiusCm: DISTANCE_SET.has(term) ? (r as number) : 0 });
  }
  const offset = new Map<string, number>();
  const prefix = `${field}.`;
  for (const [cell, c] of own.row('characterOffset')) {
    if (!cell.startsWith(prefix)) continue;
    if (typeof c.value !== 'number' || !Number.isFinite(c.value)) refuse(`pass1.json characterOffset/${cell} is not a number`);
    offset.set(cell.slice(prefix.length), c.value);
  }
  return { field, terms, offset };
}

/** pass 1's cells from the run's tables (`tables`: fields.json and bands.json) and this folder's own (`own`). */
export function fieldsCells(tables: TableView, own: Table = fieldsOwnTable()): FieldsCells {
  const f = tables.table('fields');
  const b = tables.table('bands');
  const fields = FIELD_NAMES.map((n) => fieldRow(f, n, own));
  const cellCm = f.num('settings', 'cellM') * 100;
  const coarseCellCm = f.num('settings', 'coarseCellM') * 100;
  if (!(Number.isInteger(cellCm) && cellCm >= 1 && Number.isInteger(coarseCellCm) && coarseCellCm >= cellCm)) refuse('the cell and its coarser step are whole centimetres, the step ≥ the cell');
  const epsilonShare = f.num('settings', 'epsilonShare');
  if (!(epsilonShare >= 0 && epsilonShare < 1)) refuse(`ε's share ${String(epsilonShare)} lies outside [0, 1)`);
  const sigma = new Map<string, number>();
  for (const [cell, c] of f.row('settings')) {
    if (!cell.startsWith('gaussianSigmaM.')) continue;
    if (typeof c.value !== 'number' || !(c.value > 0)) refuse(`fields.json settings/${cell}: σ is a length > 0`);
    sigma.set(cell.slice('gaussianSigmaM.'.length), c.value * 100);
  }
  const city = sigma.get('CITY');
  if (city === undefined) refuse('fields.json settings carries no gaussianSigmaM.CITY');
  const bands = [...b.strs('settings', 'order')];
  const shares = bands.map((x) => b.num(x, 'share'));
  let sum = 0;
  for (const s of shares) {
    if (!(s >= 0)) refuse('a band share is negative');
    sum += s;
  }
  if (!(Math.abs(sum - 1) <= 1e-9)) refuse(`the band shares sum to ${String(sum)}, not 1`);
  const octaves = own.num('chance', 'octaves');
  if (!(Number.isInteger(octaves) && octaves >= 1)) refuse('ε has a whole number of octaves ≥ 1');
  const mainStreetClasses = [...own.strs('mainStreet', 'classes')];
  return {
    fields,
    cellCm,
    coarseCellCm,
    epsilonShare,
    // One block width per rung: CITY's row stands for a rung without its own (C-XXXX (4)).
    sigmaCm: (rung: string) => sigma.get(rung) ?? city,
    chance: { wavelengthCm: own.num('chance', 'wavelengthM') * 100, octaves, lacunarity: own.num('chance', 'lacunarity'), gain: own.num('chance', 'gain') },
    mainStreetClasses,
    floodRiseCm: own.num('flood', 'riseM') * 100,
    elevationSpanCm: own.num('elevation', 'spanM') * 100,
    lowDampBandCm: own.num('lowDamp', 'bandM') * 100,
    lowDampRadiusCm: own.num('lowDamp', 'radiusM') * 100,
    waterTermRadiusCm: own.num('waterTerm', 'radiusM') * 100,
    bands,
    shares,
    hysteresis: b.num('settings', 'hysteresis'),
  };
}

/** Is `c` a distance class? */
export function isDistanceClass(c: DriverTerm): c is DistanceClass {
  return DISTANCE_SET.has(c);
}
