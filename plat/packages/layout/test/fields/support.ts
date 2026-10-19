// M0-e-05's test support: the fields over M0-e-04's district fixture (`town`, `townS6` — a synthetic town on an indexed
// ground arena, S6 run on it) and over the real S3 slice and S4 on the flat CITY fixture (`cityRun`), plus a hand-built
// terrain for the elevation and low-and-damp kernels (the wet site: a river strip, the terrain, the wells), M0-e-03's
// water fixture laid by S1 (`s1River`), and the readings the folder's files share: the shipped tables'
// cells (`CELLS`) and the three fields of a pass (`all`). Readers of the committed arena are the fields module's own
// (`fieldDriverSources`, `fieldFaces`); the fixtures are M0-e-04's (read, never edited).
import { attachIndex, createKernel, createPlat, createRng, entityKey, seedKey, STAGES, streamFromKey, type Cm, type Frame, type LatticePoint, type Plat } from '@plat/kernel';
import type { StageContext, Terrain, WaterSet } from '@plat/model';
import { buildTerrain, coveringGrid, GROUND_KEY, runRivers, runS1, siteFrame, terrainParams, TOWN_ROOT, type SiteEnv, type SiteResources } from '@plat/site';
import { parseTable, rungProfile, tableView, type Table, type TableView } from '@plat/tables';
import {
  fieldChanceStream,
  fieldDriverSources,
  fieldFaces,
  fieldsCells,
  fieldsOwnTable,
  fieldsPass1,
  runS6,
  type FieldDistricts,
  type FieldsCells,
  type FieldSite,
  type FieldsOptions,
  type FieldsPass1,
  type S6Output,
  type ScalarField,
} from '../../src/index.js';
import { cityRun, townS6, type CityRun, type Town, type TownOptions } from '../districts/support.js';

export const TABLES: TableView = tableView();

/** The shipped tables' fields cells: the weights, the band set and its default shares, σ per rung. */
export const CELLS: FieldsCells = fieldsCells(TABLES);

/** The three fields of a pass, in their order. */
export function all(r: FieldsPass1): ScalarField[] {
  return [r.prosperity, r.density, r.greenery];
}

/** The main-street classes of the shipped own table. */
export function mainClasses(): readonly string[] {
  return fieldsOwnTable().strs('mainStreet', 'classes');
}

/** A town with S6 run and the fields' inputs read from its arena. */
export interface FieldTown {
  readonly seed: number;
  readonly town: Town & { out: S6Output };
  readonly site: FieldSite;
  readonly districts: FieldDistricts;
}

const TOWNS = new Map<string, FieldTown>();

/** M0-e-04's district fixture at `seed` with S6 run on it, and the fields' site and districts read from the arena. */
export function fieldTown(seed: number, opts: TownOptions = {}): FieldTown {
  const k = `${String(seed)}:${JSON.stringify(opts)}`;
  const hit = TOWNS.get(k);
  if (hit !== undefined) return hit;
  const t = townS6(seed, opts);
  const site: FieldSite = {
    frame: t.plat.frame,
    rung: 'CITY',
    sources: fieldDriverSources(t.plat, { reservations: [t.plaza], ways: t.ways, gates: t.gates, mainStreetClasses: mainClasses() }),
  };
  const districts: FieldDistricts = { districts: t.out.districts, faces: fieldFaces(t.plat) };
  const r = { seed, town: t, site, districts };
  TOWNS.set(k, r);
  return r;
}

/** pass 1 over a field town (its own `field.chance` stream at its seed); throws on a refusal. */
export function pass1(ft: FieldTown, opts: FieldsOptions = {}, site: FieldSite = ft.site, tables: TableView = TABLES): FieldsPass1 {
  const r = fieldsPass1(site, ft.districts, tables, fieldChanceStream(seedKey(ft.seed)), opts);
  if (!r.ok) throw new Error(`fields refused: ${r.code} ${r.detail}`);
  return r.value;
}

/** The flat CITY fixture through S3's commits, S4 and S6 (M0-e-04's `cityRun`), with the fields' inputs. */
export function fieldCity(seed: number): FieldTown & { run: CityRun } {
  const c = cityRun(seed);
  const s6 = runS6(c.input);
  if (!s6.ok) throw new Error(`S6 refused: ${s6.code} ${s6.detail}`);
  const site: FieldSite = {
    frame: c.plat.frame,
    rung: 'CITY',
    sources: fieldDriverSources(c.plat, { reservations: [c.commit.plaza], ways: c.ways, gates: c.commit.gates, mainStreetClasses: mainClasses() }),
  };
  return { seed, town: undefined as never, site, districts: { districts: s6.value.districts, faces: fieldFaces(c.plat) }, run: c };
}

/**
 * A terrain record over `frame`-like extent: `cols × rows` cells of `cellCm` from (originX, originY), heights from
 * `h(x, y)` (cm) — enough for the terrain sampler's `heightAt` (no hydrology).
 */
export function terrainOf(cellCm: number, cols: number, rows: number, originX: number, originY: number, h: (x: number, y: number) => number): Terrain {
  const heightCm = new Int32Array(cols * rows);
  for (let j = 0; j < rows; j += 1) for (let i = 0; i < cols; i += 1) heightCm[j * cols + i] = Math.round(h(originX + (i + 0.5) * cellCm, originY + (j + 0.5) * cellCm));
  return {
    id: 'terrain:t',
    key: { layer: 'ground', part: 0 },
    cellCm: cellCm as Cm,
    cols,
    rows,
    originX: originX as Cm,
    originY: originY as Cm,
    datumCm: 0 as Cm,
    heightCm,
    reliefLimitCm: 1_000_000 as Cm,
    hydro: { cellCm: cellCm as Cm, cols, rows, originX: originX as Cm, originY: originY as Cm },
    flowDir: new Uint8Array(0),
    flatRank: new Uint32Array(0),
    flowAccum: new Uint32Array(0),
    outfalls: [],
    seaLevelCm: 0 as Cm,
    wind: { bearingCdeg: 0, strength: 0 },
    features: [],
    lifecycle: { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } },
  } as unknown as Terrain;
}

// The wet site of `relief.test.ts` and `pass1.test.ts`: the arena reaches ± 3 200 m (4 km frame, 30 % margin); a 25 m
// height raster over it; the river a 100 m strip at x ∈ [−1 600, −1 500] m, ground 0 there, rising 1 m per 100 m
// eastward, with a 100 m plateau; the wells' yield 0.5 over a block east of the centre (S1 (10)-shaped resources).
export const WET_T_CELL = 2500;
export const WET_T_N = 256;
export const WET_T_O = -320000;

/** The wet site's ground height (cm) at (x, y). */
export function wetHeight(x: number, y: number): number {
  const rise = x > -150000 ? (x + 150000) / 100 : 0;
  const plateau = x > 100000 && x < 250000 && y > 100000 && y < 250000 ? 10000 : 0;
  return rise + plateau;
}

/** The wet site's terrain record. */
export const WET_TERRAIN: Terrain = terrainOf(WET_T_CELL, WET_T_N, WET_T_N, WET_T_O, WET_T_O, wetHeight);

/** The wet site's river strip. */
export const WET_RIVER: LatticePoint[] = rect(-160000, -320000, -150000, 320000);

/** The wet site's resources: the wells' yield 0.5 over x ∈ (0, 1 000) m, y ∈ (−2 500, −1 000) m, 0 elsewhere. */
export function wetResources(): SiteResources {
  const rg = coveringGrid({ cellCm: WET_T_CELL, cols: WET_T_N, rows: WET_T_N, originX: WET_T_O, originY: WET_T_O }, 10000);
  const wellYield = new Float32Array(rg.cols * rg.rows);
  for (let j = 0; j < rg.rows; j += 1) {
    for (let i = 0; i < rg.cols; i += 1) {
      const x = rg.originX + (i + 0.5) * rg.cellCm;
      const y = rg.originY + (j + 0.5) * rg.cellCm;
      if (x > 0 && x < 100000 && y > -250000 && y < -100000) wellYield[j * rg.cols + i] = 0.5;
    }
  }
  const z = new Float32Array(wellYield.length);
  return { cellCm: 10000, ore: z, stone: z, timber: z, fish: z, clay: z, fertile: z, wellYield, slope: z };
}

/** A field town's site on the wet ground: its own sources with the river strip, the terrain, and (optionally) the wells. */
export function wetSite(ft: FieldTown, wells = false): FieldSite {
  return { ...ft.site, terrain: WET_TERRAIN, ...(wells ? { resources: wetResources() } : {}), sources: { ...ft.site.sources, water: [WET_RIVER] } };
}

/** M0-e-03's water fixture as S1 lays it: the terrain, the water S1 (3) traced and S1's L0 batch on a ground arena. */
export interface S1River {
  readonly frame: Frame;
  readonly terrain: Terrain;
  /** S1's committed water (its bodies own L0 faces of `plat`). */
  readonly water: WaterSet;
  readonly plat: Plat;
}

/**
 * M0-e-03's water fixture (its `stage.test.ts`'s): a 100 ha CITY frame on rolling ground with a river, a tributary and
 * the basic estuary at `seed`, built by M0-e-01's terrain and M0-e-02's rivers and laid by S1's L0 batch (`runS1`) on an
 * indexed ground arena under a hand-built S1 context (the site tests' pattern, C-0123).
 */
export function s1River(seed = 2): S1River {
  const rung = rungProfile('CITY');
  const frame = siteFrame({ areaHa: 100 }, rung, TABLES);
  if (!frame.ok) throw new Error(frame.detail);
  const t = buildTerrain({ id: 'terrain:ground', key: GROUND_KEY, frame: frame.value, params: terrainParams(TABLES, 'CITY'), epoch: 0 }, { relief: 'rolling' }, streamFromKey([seed, 7, 0, 0]));
  if (!t.ok) throw new Error(t.detail);
  const rng = createRng();
  const town = entityKey(seedKey(seed), [0, 0], { layer: 'ground', part: 0 });
  const ctx: StageContext<SiteEnv> = {
    doc: undefined,
    plats: {},
    tables: TABLES,
    rung,
    report: undefined,
    epoch: 0,
    stream(concern, entity, opts) {
      if (entity !== TOWN_ROOT) throw new Error(`no entity key for handle ${String(entity)}`);
      return rng.stream(town, STAGES.S1, concern, opts);
    },
    streamOpts(_concern, _entity, attempt = 0) {
      return { reroll: 0, attempt, epoch: 0, salt: 0 };
    },
  };
  const rv = runRivers({ size: { areaHa: 100 }, site: { river: { tributaries: [{}], mouth: 'estuary' } } }, t.value, { bodies: [], bridges: [] }, ctx);
  if (!rv.ok) throw new Error(rv.detail);
  const plat = createPlat(GROUND_KEY, frame.value, { vertices: 4096, edgePairs: 4096, roleRows: 8192 });
  attachIndex(plat, { gridCellCm: [10_000, 5_000, 2_500, 1_200, 600] });
  const kernel = createKernel(new Map([[GROUND_KEY, plat]]));
  const s1 = runS1({ terrain: t.value, water: rv.value.water, kernel, mouth: 'estuary' }, ctx);
  if (!s1.ok) throw new Error(`S1 refused: ${s1.code} ${s1.detail}`);
  return { frame: frame.value, terrain: s1.value.terrain, water: s1.value.water, plat };
}

/** A closed ring of a rectangle (counter-clockwise). */
export function rect(x0: number, y0: number, x1: number, y1: number): LatticePoint[] {
  return [
    { x: x0, y: y0 },
    { x: x1, y: y0 },
    { x: x1, y: y1 },
    { x: x0, y: y1 },
  ] as LatticePoint[];
}

/** A table's raw form (its rows and cells as the loader read them), for a test's variant. */
export function rawOf(t: Table): { table: string; version: number; section: string; rows: Record<string, Record<string, Record<string, unknown>>> } {
  const rows: Record<string, Record<string, Record<string, unknown>>> = {};
  for (const [rk, row] of t.rows) {
    rows[rk] = {};
    for (const [ck, c] of row) rows[rk][ck] = { ...c, value: Array.isArray(c.value) ? [...(c.value as unknown[])] : c.value };
  }
  return { table: t.id, version: t.version, section: t.section, rows };
}

/** The run's view with some tables replaced (a test's variants of fields.json or bands.json). */
export function viewWith(over: ReadonlyMap<string, Table>, base: TableView = TABLES): TableView {
  return {
    hash: base.hash,
    version: (id) => base.version(id),
    get: (id, key) => base.get(id, key),
    rows: (id) => base.rows(id),
    slice: (id, kind, key) => base.slice(id, kind, key),
    table: (id) => over.get(id) ?? base.table(id),
  };
}

/** fields.json with `edit` applied to its raw rows, as a view. */
export function fieldsVariant(edit: (rows: Record<string, Record<string, Record<string, unknown>>>) => void): TableView {
  const raw = rawOf(TABLES.table('fields'));
  edit(raw.rows);
  return viewWith(new Map([['fields', parseTable('fields', raw)]]));
}

/** This folder's own table with `edit` applied, parsed. */
export function ownVariant(edit: (rows: Record<string, Record<string, Record<string, unknown>>>) => void): Table {
  const raw = rawOf(fieldsOwnTable());
  edit(raw.rows);
  return parseTable('fieldsPass1', raw);
}

/** Every cell centre of the grid whose cell is land, as points. */
export function landPoints(r: FieldsPass1): { x: number; y: number }[] {
  const g = r.grid;
  const out: { x: number; y: number }[] = [];
  for (let j = 0; j < g.rows; j += 1) for (let i = 0; i < g.cols; i += 1) if (r.land[j * g.cols + i]) out.push({ x: g.originX + (i + 0.5) * g.cellCm, y: g.originY + (j + 0.5) * g.cellCm });
  return out;
}

/** Population variance. */
export function variance(xs: readonly number[]): number {
  let m = 0;
  for (const x of xs) m += x;
  m /= xs.length;
  let v = 0;
  for (const x of xs) v += (x - m) ** 2;
  return v / xs.length;
}

/** Even–odd point-in-rings (the test's own, independent of the code under test). */
export function insideRings(rings: readonly (readonly { x: number; y: number }[])[], x: number, y: number): boolean {
  let c = false;
  for (const ring of rings) {
    for (let a = 0, b = ring.length - 1; a < ring.length; b = a, a += 1) {
      const p = ring[a];
      const q = ring[b];
      if (p.y > y !== q.y > y && x < ((q.x - p.x) * (y - p.y)) / (q.y - p.y) + p.x) c = !c;
    }
  }
  return c;
}
