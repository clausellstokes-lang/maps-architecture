// M0-k-05's test support: hand-built baseline rows, our side, and synthetic geometry in integer centimetres.
import type { Baseline, MetricBlock, MetricWay, MetricXY, NgFacesFile, OursEntry, ParityOurs } from '../../src/index.js';

/** A valid target row with every provenance field; `over` replaces members. */
export function row(over: Partial<Baseline> & { id: string; metric: string }): Baseline {
  return {
    unit: 'share',
    reference: 'NG',
    referenceBuild: '1.2.2',
    capture: 'research:captures-ng/plan-seeds',
    script: 'research:baselines/measure.py',
    date: '2026-10-04',
    role: 'target',
    values: { p10: 0.3, p50: 0.45, p90: 0.55, n: 20, seeds: 20 },
    metricVersion: '1.0.0',
    sample: { family: 'capture/NG', captures: Array.from({ length: 20 }, (_, i) => `ng/seed-${i}`) },
    estimator: 'type7',
    scale: 'metric',
    ...over,
  } as Baseline;
}

/** Our side of a run at CITY, default preset, three seeds unless the entries say otherwise. */
export function ours(entries: OursEntry[], over: Partial<ParityOurs> = {}): ParityOurs {
  return {
    schema: 'plat.parity-ours/1',
    date: '2026-10-04',
    outputVersion: 'm0',
    generatorVersion: 'm0-k-05-test',
    rung: 'CITY',
    preset: 'default',
    setting: { population: 20000, water: 'none', seedFamily: 'test/k05', seeds: 3 },
    entries,
    ...over,
  };
}

/** A scalar entry. */
export function scalar(metric: string, key: string, perSeed: number[]): OursEntry {
  return { metric, metricVersion: '1.0.0', key, perSeed };
}

/** A distribution entry. */
export function dist(metric: string, key: string, samples: number[][]): OursEntry {
  return { metric, metricVersion: '1.0.0', key, samples };
}

/** A point in cm from metres, rounded to the centimetre. */
export const P = (xm: number, ym: number): MetricXY => ({ x: Math.round(xm * 100), y: Math.round(ym * 100) });

/** A rectangle w × h metres centred at (cx, cy) metres, turned by `deg`, counter-clockwise, in cm. */
export function rect(cx: number, cy: number, w: number, h: number, deg = 0): MetricXY[] {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [
    [-w / 2, -h / 2],
    [w / 2, -h / 2],
    [w / 2, h / 2],
    [-w / 2, h / 2],
  ].map(([x, y]) => P(cx + x * c - y * s, cy + x * s + y * c));
}

/** A way through points given in metres. */
export function way(id: string, pts: [number, number][], over: Partial<MetricWay> = {}): MetricWay {
  return { id, class: 'secondary', line: pts.map(([x, y]) => P(x, y)), ...over };
}

/** A polyline of `n` chords on a circle of radius r metres (an arc of `turns` full turns), in metres. */
export function arc(r: number, n: number, turns = 1, cx = 0, cy = 0): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i <= n; i += 1) {
    const t = (2 * Math.PI * turns * i) / n;
    out.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
  }
  return out;
}

/** A block. */
export function block(id: string, ring: MetricXY[], over: Partial<MetricBlock> = {}): MetricBlock {
  return { id, ring, ...over };
}

/** A small deterministic PRNG (mulberry32) for synthetic layouts. */
export function prng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A synthetic file in attachment B's form: two hoods, three faces. */
export function synthetic(): NgFacesFile {
  const sq = (x: number, y: number, s: number): [number, number][] => [
    [x, y],
    [x + s, y],
    [x + s, y + s],
    [x, y + s],
    [x, y],
  ];
  const hole = (x: number, y: number, s: number): [number, number][] => [
    [x, y],
    [x, y + s],
    [x + s, y + s],
    [x + s, y],
    [x, y],
  ];
  return {
    schema: 'plat.ng-faces/1',
    referenceBuild: '1.2.2',
    metricsVersion: '1.0.0',
    scaleDeclared: { mPerModelUnit: 0.35 },
    outlineKind: 1,
    hoods: [
      { id: 1, referenceBuild: '1.2.2', template: 'ring', seedLabel: 'formula/seed-0001', capture: '2026-09-21T14-03-22', outlineCm: sq(0, 0, 50000) },
      { id: 2, referenceBuild: '1.2.2', template: 'area', seedLabel: 'formula/seed-0002', capture: 'research:captures-ng/plan-seeds', outlineCm: sq(60000, 0, 30000) },
    ],
    faces: [
      {
        id: 10,
        referenceBuild: '1.2.2',
        hood: 1,
        template: 'ring',
        classes: { holed: 1, cShaped: 0, triangular: 0, curved: 0, roundJoined: 1 },
        ringCm: sq(1000, 1000, 20000),
        holesCm: [hole(5000, 5000, 3000)],
        blockAreasCm2: [120000000, 98000000],
        cuts: [
          { lengthCm: 18000, cornerT: 512, arrivalCdeg: 8850, fillet: 1, bends: 1 },
          { lengthCm: 9000, cornerT: -1, arrivalCdeg: 9000, fillet: 0, bends: 0 },
        ],
      },
      {
        id: 11,
        referenceBuild: '1.2.2',
        hood: 1,
        template: 'ring',
        classes: { holed: 0, cShaped: 1, triangular: 0, curved: 0, roundJoined: 0 },
        ringCm: [
          [25000, 1000],
          [45000, 1000],
          [35000, 18000],
          [25000, 1000],
        ],
        holesCm: [],
        blockAreasCm2: [170000000],
        cuts: [],
      },
      {
        id: 12,
        referenceBuild: '1.2.2',
        hood: 2,
        template: 'area',
        classes: { holed: 0, cShaped: 0, triangular: 0, curved: 1, roundJoined: 0 },
        ringCm: sq(61000, 1000, 10000),
        holesCm: [],
        blockAreasCm2: [50000000, 50000000],
        cuts: [{ lengthCm: 10000, cornerT: -1, arrivalCdeg: 8700, fillet: 0, bends: 2 }],
      },
    ],
  };
}
