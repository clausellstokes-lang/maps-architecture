// M0-e-05's test support: the fields over M0-e-04's district fixture (`town`, `townS6` — a synthetic town on an indexed
// ground arena, S6 run on it) and over the real S3 slice and S4 on the flat CITY fixture (`cityRun`), plus a hand-built
// terrain for the elevation and low-and-damp kernels. Readers of the committed arena are the fields module's own
// (`fieldDriverSources`, `fieldFaces`); the fixtures are M0-e-04's (read, never edited).
import { seedKey, type Cm, type LatticePoint } from '@plat/kernel';
import type { Terrain } from '@plat/model';
import { tableView, type TableView } from '@plat/tables';
import {
  fieldChanceStream,
  fieldDriverSources,
  fieldFaces,
  fieldsOwnTable,
  fieldsPass1,
  runS6,
  type FieldDistricts,
  type FieldSite,
  type FieldsOptions,
  type FieldsPass1,
  type S6Output,
} from '../../src/index.js';
import { cityRun, townS6, type CityRun, type Town, type TownOptions } from '../districts/support.js';

export const TABLES: TableView = tableView();

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

/** A closed ring of a rectangle (counter-clockwise). */
export function rect(x0: number, y0: number, x1: number, y1: number): LatticePoint[] {
  return [
    { x: x0, y: y0 },
    { x: x1, y: y0 },
    { x: x1, y: y1 },
    { x: x0, y: y1 },
  ] as LatticePoint[];
}
