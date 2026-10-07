// The harness tests' synthetic inputs (M0-b-05; C-0117: "tested entirely on a synthetic ng-faces.json and a synthetic
// baselines.json the tests write in memory, with planted rows (passing, failing, descriptive, missing)"). Every value
// here is made up by the tests: hand-built rings, faces drawn by M0-k-01's generators, planted baseline rows with
// provenance labels of our own; nothing is read from a capture, a research file or M-1's files.
import { join } from 'node:path';
import type { LatticePoint } from '@plat/kernel';
import { TABLE_SOURCES } from '@plat/tables';
import type { Baseline, NgFace, NgFacesFile, NgTemplate } from '@plat/testkit';
import { faceAt } from '../../src/bentcut/index.js';
import { PLAT_ROOT, tableText, type RawTable } from '../../src/bentcut-ng/index.js';
import type { Mem } from './memfs.js';

/** The virtual folder the tests' files live in: inside plat/, never on disk. */
export const MEM_ROOT = join(PLAT_ROOT, '.mem-bentcut-ng');

/**
 * Puts a text file into memory at a path relative to the memory root — the plat/ the tests hand the harness as its
 * `platRoot` — and returns that path.
 */
export function put(mem: Mem, rel: string, text: string): string {
  mem.files.set(join(MEM_ROOT, rel), Buffer.from(text, 'utf8'));
  return rel;
}

/** A memory file's text, or undefined. */
export function got(mem: Mem, rel: string): string | undefined {
  const b = mem.files.get(join(MEM_ROOT, rel));
  return b === undefined ? undefined : Buffer.from(b).toString('utf8');
}

/** Clears the memory and its log, and puts the shipped tables the writers read at the memory root's data folder. */
export function resetMem(mem: Mem): void {
  mem.root = MEM_ROOT;
  mem.files.clear();
  mem.log.length = 0;
  for (const id of ['granularity', 'regimes', 'cut']) put(mem, `packages/tables/data/${id}.json`, tableText(TABLE_SOURCES.get(id as 'cut') as RawTable));
}

/** A ring closed and offset (so the harness's move to the frame's centre is exercised). */
function closed(r: readonly { x: number; y: number }[], dx: number, dy: number): [number, number][] {
  const out = r.map((p) => [p.x + dx, p.y + dy] as [number, number]);
  out.push([out[0][0], out[0][1]]);
  return out;
}

/** A recorded cut of a synthetic face record. */
export interface PlantedCut {
  lengthCm: number;
  cornerT: number;
  arrivalCdeg: number;
  fillet: 0 | 1;
  bends: number;
}

/** A synthetic face record: its rings (outer counter-clockwise, holes clockwise, open), template and recorded cuts. */
export function ngFace(id: number, rings: readonly (readonly { x: number; y: number }[])[], template: NgTemplate, cuts: PlantedCut[], hood = 1): NgFace {
  const dx = 250_000 + 1_000 * id;
  const dy = -120_000;
  return {
    id,
    referenceBuild: 'NG-1.2.2',
    hood,
    template,
    classes: { holed: rings.length > 1 ? 1 : 0, cShaped: 0, triangular: 0, curved: 0, roundJoined: 0 },
    ringCm: closed(rings[0], dx, dy),
    holesCm: rings.slice(1).map((r) => closed(r, dx, dy)),
    blockAreasCm2: [12_000_000, 9_000_000],
    cuts,
  };
}

/** A rectangle w × h cm, counter-clockwise from the origin. */
export function rect(w: number, h: number): { x: number; y: number }[] {
  return [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: h },
    { x: 0, y: h },
  ];
}

/** M0-k-01's generated face of a kind (CITY block scale, seed 1), its rings as plain points. */
export function genRings(kind: 'round-joined' | 'holed' | 'curved' | 'C-shaped' | 'triangular', i: number): { x: number; y: number }[][] {
  return faceAt(kind, i, 1).polygon.map((r: readonly LatticePoint[]) => r.map((p) => ({ x: p.x as number, y: p.y as number })));
}

/** The recorded cuts every synthetic face carries: one bent and filleted, one bent and sharp, one straight. */
export const PLANTED_CUTS: PlantedCut[] = [
  { lengthCm: 6_000, cornerT: 480, arrivalCdeg: 8_950, fillet: 1, bends: 1 },
  { lengthCm: 4_500, cornerT: 530, arrivalCdeg: 9_000, fillet: 0, bends: 1 },
  { lengthCm: 3_000, cornerT: -1, arrivalCdeg: 8_700, fillet: 0, bends: 0 },
];

/** Three faces that run fast through S8: a round-joined one (area), a holed one (ring), a plain rectangle (street). */
export function threeFaces(): NgFace[] {
  return [ngFace(7, genRings('round-joined', 0), 'area', PLANTED_CUTS), ngFace(8, genRings('holed', 0), 'ring', PLANTED_CUTS, 2), ngFace(9, [rect(9_000, 5_000)], 'street', PLANTED_CUTS, 3)];
}

/** A synthetic ng-faces.json (attachment B's shape) over the faces, one hood per distinct hood id. */
export function ngFile(faces: readonly NgFace[]): NgFacesFile {
  const hoods = [...new Map(faces.map((f) => [f.hood, f])).values()].map((f) => ({ id: f.hood, referenceBuild: 'NG-1.2.2', template: f.template, seedLabel: `test/hood-${String(f.hood)}`, capture: 'research:test/synthetic', outlineCm: f.ringCm.map((p) => [p[0], p[1]] as [number, number]) }));
  return { schema: 'plat.ng-faces/1', referenceBuild: 'NG-1.2.2', metricsVersion: '1.0.0', scaleDeclared: { mPerModelUnit: 0.35 }, outlineKind: 1, hoods, faces: [...faces] };
}

/** The registry's units of the metrics the harness reads. */
const UNITS: Readonly<Record<string, string>> = { 'cut.sigma': 'ratio', 'cut.cornerMid': 'share', 'cut.arrival85': 'share', 'cut.fillet': 'share', 'cut.length': 'm', 'block.area': 'm2' };

/** A planted baseline row of NG's for a metric and key (provenance labels of our own; numbers made up). */
export function row(metric: string, key: string, values: Baseline['values'], extra: Partial<Baseline> = {}): Baseline {
  return {
    id: `test/ng/${metric}/${key}`,
    metric,
    unit: UNITS[metric] ?? 'share',
    reference: 'NG',
    referenceBuild: 'NG-1.2.2',
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

/** A scalar row's values. */
export function scalar(p50: number, p10?: number, p90?: number): Baseline['values'] {
  return { ...(p10 === undefined ? {} : { p10 }), p50, ...(p90 === undefined ? {} : { p90 }), n: 20, seeds: 20 };
}

/** A histogram row's values over edges, with a count per bin and the overflow. */
export function histogram(bins: number[], counts: number[]): Baseline['values'] {
  let n = 0;
  for (const c of counts) n += c;
  return { bins, histogram: counts, n, seeds: 20 };
}

/** cut.length's 5 m bins from 0 to 400 m with an overflow bin (attachment A), counts from a sample of lengths (m). */
export function lengthHistogram(lengthsM: readonly number[]): Baseline['values'] {
  const bins = Array.from({ length: 81 }, (_, i) => 5 * i);
  const counts = new Array<number>(81).fill(0);
  for (const l of lengthsM) counts[Math.min(80, Math.floor(l / 5))] += 1;
  return histogram(bins, counts);
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
  return histogram(bins, counts);
}

/** baselines.json's text from rows. */
export function baselinesText(rows: readonly Baseline[]): string {
  return `${JSON.stringify(rows, null, 2)}\n`;
}

/** ng-faces.json's text. */
export function ngFacesText(f: NgFacesFile): string {
  return `${JSON.stringify(f)}\n`;
}
