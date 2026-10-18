// One of NG's recorded faces through our S8 (M0-b-05; §16 M0 (b): "its comparison with NG's distributions on the same
// faces"; §13.8: T34-1 – T41-1 "on … NG's recorded shapes"; C-0043, C-0081, C-0086, C-0117). A task names a face
// record of `ng-faces.json` (read through M0-k-05's `loadNgFaces`), a derivation seed and, for the cut.flattenM
// search, a candidate value of the cell. The face is moved so its outer ring's box is centred on the bench frame's
// origin (a translation by whole centimetres changes no shape, length, area or angle) and run as a one-face district
// through S8 by M0-b-04's harness — its district (`faceDistrict`: a 12 km frame, the CITY band at prosperity 0.3) and
// its replay (`replayDistrict`: every planner cut re-planned on the kerb it was cut on and measured by M0-k-05's cut
// metrics, one metricVersion with M0-b-04's, C-0081). The record holds plain numbers only, so a task can run in a
// worker thread and the folds read the records in task order.
import { addressOf } from '@plat/model';
import { createRng, entityKey, type Cm, type LatticePoint, type PolygonCm } from '@plat/kernel';
import { blockDepthRange, cutCells, minFrontage, runS8, widthCells, type BlockFaces, type DistrictReport, type KerbFace, type PlanContext } from '@plat/layout';
import { loadTable, parseTable, TABLE_SOURCES, type Table } from '@plat/tables';
import { seedFamily, type FuzzFaceKind, type NgFace, type NgTemplate } from '@plat/testkit';
import { faceDistrict, FRAME_HALF_CM, GROUND, replayDistrict, type FaceDistrict, type SignatureCut } from '../bentcut/index.js';
import { writeCells, type RawTable } from './cells.js';
import { checkFacePlans, checkT34, checkT39, checkT40, checkT41Run, checksOf, tallies, type TChecks } from './tbars.js';

/** A task: one face record, the derivation seed index, and an optional candidate cut.flattenM (m). */
export interface NgTask {
  readonly face: NgFace;
  readonly seed: number;
  readonly seedIndex: number;
  readonly flattenM?: number;
  /** Check the T-bars (the comparison's runs; the search's runs measure the one-bend share alone). */
  readonly bars: boolean;
}

/** A measured cut of ours on an NG face: M0-b-04's SignatureCut with the face's template. */
export type NgOurCut = SignatureCut & { readonly template: NgTemplate };

/** A block S8 committed on the face: its kerb ring (cm) and its content. */
export interface NgOurBlock {
  readonly ring: readonly { readonly x: number; readonly y: number }[];
  readonly content: string;
}

/** A task's record. */
export interface NgRecord {
  readonly faceId: number;
  readonly template: NgTemplate;
  readonly holed: boolean;
  readonly seedIndex: number;
  readonly flattenM: number | null;
  /** The kernel refused the face's rings, or the face does not fit the bench frame; null when built. */
  readonly setup: string | null;
  /** S8 refused or threw on the district; null when it ran. */
  readonly refused: string | null;
  /** The replay measured the cuts (false: S8's own run stood, its cuts unmeasured). */
  readonly replayed: boolean;
  readonly cuts: readonly NgOurCut[];
  readonly blocks: readonly NgOurBlock[];
  /** Planner cuts the replay missed (measured nothing). */
  readonly missed: number;
  readonly checks: TChecks | null;
}

/** The fuzz kind a face is labelled with in M0-b-04's records (a label only): its first class flag, else `concave`. */
export function kindOf(face: NgFace): FuzzFaceKind {
  const c = face.classes;
  if (c.holed === 1 || face.holesCm.length > 0) return 'holed';
  if (c.cShaped === 1) return 'C-shaped';
  if (c.triangular === 1) return 'triangular';
  if (c.curved === 1) return 'curved';
  if (c.roundJoined === 1) return 'round-joined';
  return 'concave';
}

/** The face's derivation seed: H32("bentcut-ng/<seed>/face-<id>/<seedIndex>") as a u32 (M0-k-01's seedFamily). */
export function ngSeed(seed: number, faceId: number, seedIndex: number): number {
  return seedFamily(`bentcut-ng/${String(seed)}/face-${String(faceId)}`, seedIndex) >>> 0;
}

/** The margin the moved face keeps inside the bench frame (cm). */
const FRAME_MARGIN_CM = 10_000;

/** A face record's rings, open, moved so the outer ring's box is centred on the origin; a message when it cannot be. */
export function placedPolygon(face: NgFace): PolygonCm | string {
  const outer = face.ringCm;
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const [x, y] of outer) {
    if (x < x0) x0 = x;
    if (y < y0) y0 = y;
    if (x > x1) x1 = x;
    if (y > y1) y1 = y;
  }
  const dx = Math.round((x0 + x1) / 2);
  const dy = Math.round((y0 + y1) / 2);
  const half = Math.max(x1 - dx, dx - x0, y1 - dy, dy - y0);
  if (!(half <= FRAME_HALF_CM - FRAME_MARGIN_CM)) return `face ${String(face.id)}: ${String(half)} cm from its centre, beyond the bench frame's ${String(FRAME_HALF_CM - FRAME_MARGIN_CM)} cm`;
  const ring = (r: readonly (readonly [number, number])[]): LatticePoint[] => r.slice(0, r.length - 1).map(([x, y]) => ({ x: (x - dx) as Cm, y: (y - dy) as Cm }));
  return [ring(face.ringCm), ...face.holesCm.map(ring)];
}

/** The cut table with cut.flattenM set to a candidate (an in-memory table; provenance `own`, never written). */
export function cutTableAt(flattenM: number): Table {
  const raw = TABLE_SOURCES.get('cut') as RawTable;
  return parseTable('cut', writeCells(raw, [{ row: 'settings', cell: 'flattenM', value: flattenM }], 'own').raw);
}

function empty(t: NgTask, setup: string | null, refused: string | null): NgRecord {
  return { faceId: t.face.id, template: t.face.template, holed: t.face.holesCm.length > 0, seedIndex: t.seedIndex, flattenM: t.flattenM ?? null, setup, refused, replayed: false, cuts: [], blocks: [], missed: 0, checks: null };
}

function blocksOf(blockFaces: readonly BlockFaces[], content: ReadonlyMap<string, string>): NgOurBlock[] {
  return blockFaces.map((bf) => ({ ring: bf.kerb.map((p) => ({ x: p.x, y: p.y })), content: content.get(bf.block) ?? 'ordinary' }));
}

/** The T-bars on one district's run and the face's own plans. */
function barsOf(fd: FaceDistrict, polygon: PolygonCm, report: DistrictReport, blockFaces: readonly BlockFaces[], table: Table, where: string): TChecks {
  const t = tallies();
  const cells = cutCells(table);
  checkT34(t['T34-1'], fd.input.seedKey, GROUND, report, blockFaces);
  checkT39(t['T39-1'], report, cells);
  checkT40(t['T40-1'], report, widthCells('CITY', table).bands);
  checkT41Run(t['T41-1'], report);
  const first = report.stops[0];
  if (first !== undefined) {
    const [eLoM, eHiM] = blockDepthRange(fd.bands, undefined);
    const ctx: PlanContext = { depthRangeM: [eLoM, eHiM], minFrontageM: minFrontage(fd.bands), cutKind: 'way', table };
    const streams = { rng: createRng(), faceKey: entityKey(fd.input.seedKey, first.lineage, GROUND), entity: addressOf('face', first.lineage, GROUND), reroll: 0, epoch: 0 };
    const face: KerbFace = { rings: polygon };
    checkFacePlans(t, face, ctx, streams, cells, minFrontage(fd.bands) * 100, where);
  }
  return checksOf(t);
}

/** Runs one task (see the module comment). A throw is recorded on the face — never stops the run. */
export function runNgTask(t: NgTask): NgRecord {
  const polygon = placedPolygon(t.face);
  if (typeof polygon === 'string') return empty(t, polygon, null);
  try {
    const table = t.flattenM === undefined ? loadTable('cut') : cutTableAt(t.flattenM);
    const seed = ngSeed(t.seed, t.face.id, t.seedIndex);
    let fd: FaceDistrict;
    try {
      fd = faceDistrict(polygon, seed);
    } catch (e) {
      return empty(t, e instanceof Error ? e.message : String(e), null);
    }
    const withTable = (x: FaceDistrict): FaceDistrict => (t.flattenM === undefined ? x : { ...x, input: { ...x.input, tables: { ...(x.input.tables ?? {}), cut: table } } });
    const where = `face ${String(t.face.id)} seed ${String(t.seedIndex)}`;
    const r = replayDistrict(withTable(fd), kindOf(t.face));
    if (!('error' in r) && !r.overLimit) {
      const content = new Map(r.partition.blocks.map((b) => [b.id as string, b.content as string]));
      return {
        ...empty(t, null, null),
        replayed: true,
        cuts: r.cuts.map((c) => ({ ...c, template: t.face.template })),
        blocks: blocksOf(r.partition.blockFaces, content),
        missed: r.counts.missed,
        checks: t.bars ? barsOf(fd, polygon, r.report, r.partition.blockFaces, table, where) : null,
      };
    }
    // The replay's batch failed or passed S8's own limit: S8's own run on a fresh district stands (M0-b-04's rule).
    const again = withTable(faceDistrict(polygon, seed));
    const s = runS8(again.input, { report: undefined } as never);
    if (!s.ok) return empty(t, null, `${s.code} ${s.detail}`);
    const x = s.value.infill.report.refused[0];
    const d = s.value.infill.report.districts[0];
    if (x !== undefined || d === undefined) return empty(t, null, x === undefined ? 'no district report' : `${x.code} ${x.detail}`);
    const content = new Map(s.value.blocks.map((b) => [b.id as string, b.content as string]));
    return {
      ...empty(t, null, null),
      blocks: blocksOf(s.value.infill.blockFaces, content),
      checks: t.bars ? barsOf(again, polygon, d, s.value.infill.blockFaces, table, where) : null,
    };
  } catch (e) {
    return empty(t, null, `threw: ${e instanceof Error ? e.message : String(e)}`);
  }
}
