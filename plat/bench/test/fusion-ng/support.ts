// The fusion statistics harness's synthetic inputs (M0-c-07; C-0117: "tested entirely on synthetic ng-faces.json and
// baselines.json files the tests write in memory and on M0-c-06's fixture at a few seeds"). Every value here is made up
// by the tests: hand-built hood outlines, planted baseline rows with provenance labels of our own, M0-c-06's planted
// seed record; nothing is read from a capture, a research file or M-1's files. The files live in memory under a folder
// inside plat/ that never exists on disk, through M0-b-05's in-memory file system (`memfs.ts`, the sibling's
// synthetic-file convention shared, C-0117), and the harness reads them through M0-k-05's loaders.
import { join } from 'node:path';
import { TABLE_SOURCES } from '@plat/tables';
import type { Baseline, NgFacesFile, NgHood, NgTemplate } from '@plat/testkit';
import { tableText, type RawTable } from '../../src/bentcut-ng/index.js';
import { PLAT_ROOT } from '../../src/fusion-ng/index.js';
import type { Mem } from '../bentcut-ng/memfs.js';

/** The virtual folder the tests' files live in: inside plat/, never on disk. */
export const MEM_ROOT = join(PLAT_ROOT, '.mem-fusion-ng');

/** The fixture's test size (M0-c-06's, C-0264 (10)): a 900 ha frame, 30 ha walled; one derivation takes seconds. */
export const TEST_SIZE = Object.freeze({ frameHa: 900, walledHa: 30 });
export const SIZE_ARGS = ['--frame-ha', '900', '--walled-ha', '30'];

/** Puts a text file into memory at a path relative to the memory root (the plat/ the tests hand the harness). */
export function put(mem: Mem, rel: string, text: string): string {
  mem.files.set(join(MEM_ROOT, rel), Buffer.from(text, 'utf8'));
  return rel;
}

/** A memory file's text, or undefined. */
export function got(mem: Mem, rel: string): string | undefined {
  const b = mem.files.get(join(MEM_ROOT, rel));
  return b === undefined ? undefined : Buffer.from(b).toString('utf8');
}

/** The shipped tables the writers read, in the data files' layout. */
export const TABLE_TEXT = (id: 'interior' | 'cut' | 'bands'): string => tableText(TABLE_SOURCES.get(id) as RawTable);

/** Clears the memory and its log, and puts the shipped tables the writers read at the memory root's data folder. */
export function resetMem(mem: Mem): void {
  mem.root = MEM_ROOT;
  mem.files.clear();
  mem.log.length = 0;
  for (const id of ['interior', 'cut', 'bands'] as const) put(mem, `packages/tables/data/${id}.json`, TABLE_TEXT(id));
}

/** The registry's units of the metrics the harness reads. */
const UNITS: Readonly<Record<string, string>> = {
  'junction.angles': 'deg',
  'junction.share4': 'share',
  'sgd.tShare': 'share',
  'sgd.deadEnds': 'perKm',
  'blockc.perHa': 'perHa',
  'blockc.lotsPer': 'count',
  'bldg.r4.60': 'ratio',
  'bldg.r4.120': 'ratio',
  'bldg.r4.250': 'ratio',
  'bldg.wallAlign.median': 'deg',
  'bldg.wallAlign.share15': 'share',
  'block.courtShare': 'share',
  'block.area': 'm2',
};

/** A planted baseline row for a metric, key and reference (provenance labels of our own; numbers made up). */
export function row(metric: string, key: string, reference: 'NG' | 'MFCG', values: Baseline['values'], extra: Partial<Baseline> = {}): Baseline {
  return {
    id: `test/${reference.toLowerCase()}/${metric}/${key}`,
    metric,
    unit: UNITS[metric] ?? 'share',
    reference,
    referenceBuild: reference === 'NG' ? 'NG-1.2.2' : 'MFCG-0.11.6',
    capture: 'research:test/synthetic',
    script: 'research:test/planted',
    date: '2026-10-04',
    role: 'target',
    values,
    metricVersion: '1.0.0',
    sample: { family: 'test/plain', indices: [0, 20] },
    estimator: 'type7',
    scale: 'metric',
    ...extra,
  };
}

/** A scalar row's values: p50 and its spread. */
export function scalar(p50: number, p10?: number, p90?: number): Baseline['values'] {
  return { ...(p10 === undefined ? {} : { p10 }), p50, ...(p90 === undefined ? {} : { p90 }), n: 20, seeds: 20 };
}

/** A descriptive row's values: M-1 could not measure the cell (C-0116: values.n 0, every member in sample.failed). */
export function descriptive(metric: string, key: string, reference: 'NG' | 'MFCG'): Baseline {
  return row(metric, key, reference, { n: 0, seeds: 0 }, { role: 'descriptive', sample: { family: 'test/plain', indices: [0, 2], failed: [{ index: 0, reason: 'not in the capture' }, { index: 1, reason: 'not in the capture' }] } });
}

/** block.area's 24 log-spaced edges over 50 – 50 000 m² with an underflow and an overflow bin (attachment A). */
export function areaHistogram(areasM2: readonly number[]): Baseline['values'] {
  const bins = Array.from({ length: 24 }, (_, i) => Math.round(50 * 1000 ** (i / 23) * 1000) / 1000);
  const counts = new Array<number>(25).fill(0);
  for (const a of areasM2) {
    let k = 0;
    while (k < bins.length && a >= bins[k]) k += 1;
    counts[k] += 1;
  }
  let n = 0;
  for (const c of counts) n += c;
  return { bins, histogram: counts, n, seeds: 20 };
}

/** baselines.json's text from rows. */
export function baselinesText(rows: readonly Baseline[]): string {
  return `${JSON.stringify(rows, null, 2)}\n`;
}

/** A closed ring from open points, moved by (dx, dy). */
export function closed(pts: readonly (readonly [number, number])[], dx = 0, dy = 0): [number, number][] {
  const r = pts.map(([x, y]) => [x + dx, y + dy] as [number, number]);
  r.push([r[0][0], r[0][1]]);
  return r;
}

/** A synthetic hood (counter-clockwise outline in integer cm) with its template. */
export function hood(id: number, template: NgTemplate, outline: [number, number][]): NgHood {
  return { id, referenceBuild: 'NG-1.2.2', template, seedLabel: `test/hood-${String(id)}`, capture: 'research:test/synthetic', outlineCm: outline };
}

/** Two synthetic hoods that run through S8 in seconds: a pentagon (`area`) and a rectangle (`street`). */
export function twoHoods(): NgHood[] {
  return [
    hood(1, 'area', closed([[0, 0], [30_000, -2_000], [33_000, 20_000], [15_000, 26_000], [-1_000, 21_000]], 100_000, 40_000)),
    hood(2, 'street', closed([[0, 0], [18_000, 0], [18_000, 15_000], [0, 15_000]], 500_000, -80_000)),
  ];
}

/** A synthetic ng-faces.json (attachment B's shape) over the hoods: one face per hood, its ring the outline. */
export function ngFile(hoods: readonly NgHood[]): NgFacesFile {
  return {
    schema: 'plat.ng-faces/1',
    referenceBuild: 'NG-1.2.2',
    metricsVersion: '1.0.0',
    scaleDeclared: { mPerModelUnit: 0.35 },
    outlineKind: 1,
    hoods: hoods.map((h) => ({ ...h, outlineCm: h.outlineCm.map((p) => [p[0], p[1]] as [number, number]) })),
    faces: hoods.map((h) => ({
      id: h.id,
      referenceBuild: 'NG-1.2.2',
      hood: h.id,
      template: h.template,
      classes: { holed: 0, cShaped: 0, triangular: 0, curved: 0, roundJoined: 0 },
      ringCm: h.outlineCm.map((p) => [p[0], p[1]] as [number, number]),
      holesCm: [],
      blockAreasCm2: [12_000_000, 9_000_000, 7_500_000],
      cuts: [],
    })),
  };
}

/** ng-faces.json's text. */
export function ngFacesText(f: NgFacesFile): string {
  return `${JSON.stringify(f)}\n`;
}

/** A cells file's text (`plat.table-cells/1`). */
export function cellsText(provenance: string, tables: Record<string, { row: string; cell: string; value: unknown }[]>): string {
  return `${JSON.stringify({ schema: 'plat.table-cells/1', provenance, tables })}\n`;
}

/** §4.6's re-fitted default shares (N-29), as phase a's cells file names them. */
export const FITTED_SHARES: Readonly<Record<string, readonly [number, number, number, number]>> = {
  poor: [0.355, 0.248, 0.298, 0.099],
  modest: [0.457, 0.296, 0.148, 0.099],
  prosperous: [0.659, 0.146, 0.049, 0.146],
  rich: [0.761, 0.096, 0, 0.143],
};

/** The interior cells of the fitted shares. */
export function fittedCells(shares: Readonly<Record<string, readonly number[]>> = FITTED_SHARES): { row: string; cell: string; value: number }[] {
  const names = ['shares.court', 'shares.backLane', 'shares.throughAlley', 'shares.rearPlots'];
  const out: { row: string; cell: string; value: number }[] = [];
  for (const band of Object.keys(shares)) shares[band].forEach((v, i) => out.push({ row: band, cell: names[i], value: v }));
  return out;
}

/** The lines two texts differ in, by line number (both split on newlines). */
export function changedLines(a: string, b: string): number[] {
  const x = a.split('\n');
  const y = b.split('\n');
  const out: number[] = [];
  for (let i = 0; i < Math.max(x.length, y.length); i += 1) if (x[i] !== y[i]) out.push(i);
  return out;
}
