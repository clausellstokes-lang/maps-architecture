// METRICS — the metric registry (M0-k-05; §13.5, §13.2, §14's `@plat/testkit` metrics; C-0018, C-0072, C-0116, C-0180).
// Each entry: the metric's id, its `metricVersion`, its unit (§2.1's vocabulary), its form, the §13.5 row it serves,
// the references whose rows the parity CLI reads for it with their roles, `m1` — the cell §13.5 marks ⟨M-1⟩ and M0
// measures (C-0116) — and `measure(doc)` over one seed's outputs. The ids, units and `metricVersion` 1.0.0 of the
// twenty metrics the AFTER-M-1 items read are attachment A's exactly (`checks/M0-handoff-M1.md`, N-20, N-24: a
// case-sensitive match); the four street-curve metrics are M0's own (no reference row is read for them at M0).
import type { Unit } from '@plat/tables';
import { blockAreas, blockCountsByTemplate, blocksPerHa, courtShare, r4Samples, wallAlignment, wallRing, WALL_BANDS } from './blocks.js';
import { cutArrival85, cutCornerMid, cutFillet, cutLengths, cutSigma } from './cuts.js';
import { NG_CLASS_FLAGS, NG_TEMPLATES, type MetricDoc } from './doc.js';
import { insideRing, lengthInsideM } from './geometry.js';
import { armGapsDeg, hasStraightPair, streetGraph } from './graph.js';
import { ascending, median, quantile7 } from './stats.js';
import { growthDrift600m, headingChange50m, turningPer100m, turnSteps10m } from './street.js';

/** The registry's version (§13.5's `ParityReport.metricsVersion`; attachment A's registry version). */
export const METRICS_VERSION = '1.0.0';

/** What a metric's per-seed value is: one number, one number per field, or a sample. */
export type MetricForm = 'scalar' | 'vector' | 'distribution';

/** A reference whose rows the parity CLI reads for a metric, with the role §13.5 gives it, and its ⟨M-1⟩ mark. */
export interface MetricRef {
  readonly reference: 'MFCG' | 'FTG' | 'NG';
  readonly role: 'target' | 'weakness' | 'descriptive';
  /** §13.5 marks this reference's cell ⟨M-1⟩ (C-0116): with no row it reads `fail`, never `missingBaseline`. */
  readonly m1?: true;
}

/**
 * One seed's measurement: per key a number (a scalar, or a vector's field) or a sample (a distribution) — the key is
 * N-25's trailing segments, `<subset>` or `<subset>/<field>` — or the reason the metric does not apply to the seed.
 */
export type Measured = { readonly values: ReadonlyMap<string, number | readonly number[]> } | { readonly notApplicable: string };

/** A registry entry. */
export interface MetricDef {
  readonly id: string;
  readonly metricVersion: string;
  readonly unit: Unit;
  readonly form: MetricForm;
  /** A vector metric's field names (attachment A), each a row of its own (N-25). */
  readonly fields?: readonly string[];
  /** The §13.5 row the metric serves. */
  readonly row: string;
  readonly refs: readonly MetricRef[];
  /** §13.5 marks one of the metric's cells ⟨M-1⟩ and M0 measures it (C-0116). */
  readonly m1: boolean;
  /** A proxy of the reference's measure (C-0018): compared and reported, never gated; the report names it. */
  readonly proxy?: string;
  /** A weakness row's declared direction and margin (in the metric's unit); none is declared at M0 (C-0180 (8)). */
  readonly weakness?: { readonly direction: 'above' | 'below'; readonly margin: number };
  /** Measured from this milestone; at M0 `measure` reads `notApplicable` naming it (C-0072). */
  readonly from?: string;
  measure(doc: MetricDoc): Measured;
}

const na = (reason: string): Measured => ({ notApplicable: reason });
const one = (key: string, v: number): Measured => (Number.isFinite(v) ? { values: new Map([[key, v]]) } : na('no value'));
const finiteMap = (m: ReadonlyMap<string, number>): Measured => {
  const out = new Map<string, number>();
  for (const [k, v] of m) if (Number.isFinite(v)) out.set(k, v);
  return out.size > 0 ? { values: out } : na('no value');
};
const sampleMap = (m: ReadonlyMap<string, readonly number[]>): Measured => {
  const out = new Map<string, readonly number[]>();
  for (const [k, v] of m) if (v.length > 0) out.set(k, v);
  return out.size > 0 ? { values: out } : na('no sample');
};
const UNWALLED = 'unwalled: the street signature reads walled districts';

/** The street graph's measures inside the wall (the MFCG street signature is a walled-district row). */
function streetSignature(doc: MetricDoc, which: 'tShare' | 'deadEnds'): Measured {
  const wall = wallRing(doc);
  if (wall === null) return na(UNWALLED);
  const g = streetGraph(doc);
  const inside = g.nodes.filter((n) => insideRing(n.at, wall));
  if (which === 'tShare') {
    const deg3 = inside.filter((n) => n.degree === 3);
    if (deg3.length === 0) return na('no degree-3 node inside the wall');
    return one('all', deg3.filter((n) => hasStraightPair(n.bearings)).length / deg3.length);
  }
  let lengthM = 0;
  for (const e of g.edges) lengthM += lengthInsideM(e, wall);
  if (!(lengthM > 0)) return na('no street inside the wall');
  return one('all', inside.filter((n) => n.degree === 1).length / (lengthM / 1000));
}

function junctionAngles(doc: MetricDoc): Measured {
  const gaps: number[] = [];
  for (const n of streetGraph(doc).nodes) if (n.degree >= 3) for (const a of armGapsDeg(n.bearings)) gaps.push(a);
  if (gaps.length === 0) return na('no node of degree three or more');
  const s = ascending(gaps);
  return { values: new Map([['all/median', quantile7(s, 0.5)], ['all/p5', quantile7(s, 0.05)]]) };
}

function junctionShare4(doc: MetricDoc): Measured {
  const nodes = streetGraph(doc).nodes.filter((n) => n.degree >= 3);
  if (nodes.length === 0) return na('no node of degree three or more');
  return one('all', nodes.filter((n) => n.degree === 4).length / nodes.length);
}

function r4(radiusM: number): (doc: MetricDoc) => Measured {
  return (doc) => {
    const s = r4Samples(doc, radiusM);
    return s.length === 0 ? na(`no block with five within ${radiusM} m`) : one('all', median(s));
  };
}

function wallAlign(stat: 'median' | 'share15'): (doc: MetricDoc) => Measured {
  return (doc) => {
    const bands = wallAlignment(doc);
    if (bands === null) return na(UNWALLED);
    const out = new Map<string, number>();
    for (const [field, angles] of bands) {
      if (angles.length === 0) continue;
      out.set(`all/${field}`, stat === 'median' ? median(angles) : angles.filter((a) => a <= 15).length / angles.length);
    }
    return out.size > 0 ? { values: out } : na('no block inside the wall within 200 m of it');
  };
}

function scalarOf(m: ReadonlyMap<string, number>): Measured {
  return finiteMap(m);
}

const DEG_FIELDS_WALL = Object.freeze(WALL_BANDS.map((b) => b.field));
const MFCG_TARGET: readonly MetricRef[] = Object.freeze([{ reference: 'MFCG', role: 'target' }]);
const MFCG_M1: readonly MetricRef[] = Object.freeze([{ reference: 'MFCG', role: 'target', m1: true }]);
const NG_TARGET: readonly MetricRef[] = Object.freeze([{ reference: 'NG', role: 'target' }]);
const NG_M1: readonly MetricRef[] = Object.freeze([{ reference: 'NG', role: 'target', m1: true }]);
const BLOCK_PROXY = 'block OBB axes (C-0018): the reference measures building axes; plots and footprints arrive at M1';

/** The registry, in a fixed order. */
export const METRICS: readonly MetricDef[] = Object.freeze([
  // the street-turning row (§13.5) and §13.2's core record: M0's own measures, no reference row read at M0
  {
    id: 'street.turnPer100m',
    metricVersion: '1.0.0',
    unit: 'deg',
    form: 'scalar',
    row: 'street turning',
    refs: [],
    m1: false,
    measure: (doc: MetricDoc) => one('all', turningPer100m(doc)),
  },
  {
    id: 'street.headingChange50m',
    metricVersion: '1.0.0',
    unit: 'deg',
    form: 'distribution',
    row: 'street turning',
    refs: [],
    m1: false,
    measure: (doc: MetricDoc) => sampleMap(new Map([['all', headingChange50m(doc)]])),
  },
  {
    id: 'street.turnStep10m',
    metricVersion: '1.0.0',
    unit: 'deg',
    form: 'distribution',
    row: 'street turning',
    refs: [],
    m1: false,
    measure: (doc: MetricDoc) => sampleMap(new Map([['all', turnSteps10m(doc)]])),
  },
  {
    id: 'growth.drift600m',
    metricVersion: '1.0.0',
    unit: 'deg',
    form: 'distribution',
    row: 'growth drift',
    refs: [],
    m1: false,
    measure: (doc: MetricDoc) => sampleMap(new Map([['all', growthDrift600m(doc)]])),
  },
  // the junction row
  {
    id: 'junction.angles',
    metricVersion: '1.0.0',
    unit: 'deg',
    form: 'vector',
    fields: ['median', 'p5'],
    row: 'junction arm angles and degrees',
    refs: NG_TARGET,
    m1: false,
    measure: junctionAngles,
  },
  {
    id: 'junction.share4',
    metricVersion: '1.0.0',
    unit: 'share',
    form: 'scalar',
    row: 'junction arm angles and degrees',
    refs: NG_TARGET,
    m1: false,
    measure: junctionShare4,
  },
  // the MFCG street signature
  { id: 'bldg.r4.60', metricVersion: '1.0.0', unit: 'ratio', form: 'scalar', row: 'MFCG street signature', refs: MFCG_TARGET, m1: false, proxy: BLOCK_PROXY, measure: r4(60) },
  { id: 'bldg.r4.120', metricVersion: '1.0.0', unit: 'ratio', form: 'scalar', row: 'MFCG street signature', refs: MFCG_TARGET, m1: false, proxy: BLOCK_PROXY, measure: r4(120) },
  { id: 'bldg.r4.250', metricVersion: '1.0.0', unit: 'ratio', form: 'scalar', row: 'MFCG street signature', refs: MFCG_TARGET, m1: false, proxy: BLOCK_PROXY, measure: r4(250) },
  {
    id: 'bldg.wallAlign.median',
    metricVersion: '1.0.0',
    unit: 'deg',
    form: 'vector',
    fields: DEG_FIELDS_WALL,
    row: 'MFCG street signature',
    refs: MFCG_TARGET,
    m1: false,
    proxy: BLOCK_PROXY,
    measure: wallAlign('median'),
  },
  {
    id: 'bldg.wallAlign.share15',
    metricVersion: '1.0.0',
    unit: 'share',
    form: 'vector',
    fields: DEG_FIELDS_WALL,
    row: 'MFCG street signature',
    refs: MFCG_TARGET,
    m1: false,
    proxy: BLOCK_PROXY,
    measure: wallAlign('share15'),
  },
  { id: 'sgd.tShare', metricVersion: '1.0.0', unit: 'share', form: 'scalar', row: 'MFCG street signature', refs: MFCG_M1, m1: true, measure: (doc: MetricDoc) => streetSignature(doc, 'tShare') },
  { id: 'sgd.deadEnds', metricVersion: '1.0.0', unit: 'perKm', form: 'scalar', row: 'MFCG street signature', refs: MFCG_M1, m1: true, measure: (doc: MetricDoc) => streetSignature(doc, 'deadEnds') },
  {
    id: 'blockc.perHa',
    metricVersion: '1.0.0',
    unit: 'perHa',
    form: 'scalar',
    row: 'MFCG street signature',
    refs: MFCG_M1,
    m1: true,
    measure: (doc: MetricDoc) => (wallRing(doc) === null ? na(UNWALLED) : one('all', blocksPerHa(doc))),
  },
  {
    id: 'blockc.lotsPer',
    metricVersion: '1.0.0',
    unit: 'count',
    form: 'scalar',
    row: 'MFCG street signature',
    refs: MFCG_TARGET,
    m1: false,
    from: 'M1',
    measure: () => na('lots per block: lots arrive at M1 (C-0072)'),
  },
  // the blocks row
  {
    id: 'block.area',
    metricVersion: '1.0.0',
    unit: 'm2',
    form: 'distribution',
    row: 'blocks',
    refs: NG_M1,
    m1: true,
    measure: (doc: MetricDoc) => sampleMap(blockAreas(doc)),
  },
  {
    id: 'block.areaRel',
    metricVersion: '1.0.0',
    unit: 'ratio',
    form: 'distribution',
    row: 'blocks',
    refs: [{ reference: 'NG', role: 'descriptive' }],
    m1: false,
    from: 'M1',
    measure: () => na('block area over the median footprint: footprints arrive at M1'),
  },
  {
    id: 'block.countTemplate',
    metricVersion: '1.0.0',
    unit: 'count',
    form: 'scalar',
    row: 'blocks',
    refs: NG_M1,
    m1: true,
    measure: (doc: MetricDoc) => {
      const m = blockCountsByTemplate(doc);
      if (m.size === 0) return na('no district carries a template');
      return scalarOf(new Map([...m].map(([k, v]) => [k, median(v)])));
    },
  },
  // the deep-block-interiors row: both references' cells are ⟨M-1⟩
  {
    id: 'block.courtShare',
    metricVersion: '1.0.0',
    unit: 'share',
    form: 'scalar',
    row: 'deep block interiors',
    refs: [
      { reference: 'NG', role: 'target', m1: true },
      { reference: 'MFCG', role: 'target', m1: true },
    ],
    m1: true,
    measure: (doc: MetricDoc) => {
      const s = courtShare(doc.blocks ?? []);
      return Number.isNaN(s) ? na('no deep built block') : one('all', s);
    },
  },
  // the bent-cut signature (with M0-b-04)
  { id: 'cut.sigma', metricVersion: '1.0.0', unit: 'ratio', form: 'scalar', row: 'bent-cut signature', refs: NG_TARGET, m1: false, measure: (doc: MetricDoc) => scalarOf(cutSigma(doc)) },
  { id: 'cut.cornerMid', metricVersion: '1.0.0', unit: 'share', form: 'scalar', row: 'bent-cut signature', refs: NG_TARGET, m1: false, measure: (doc: MetricDoc) => scalarOf(cutCornerMid(doc)) },
  { id: 'cut.arrival85', metricVersion: '1.0.0', unit: 'share', form: 'scalar', row: 'bent-cut signature', refs: NG_TARGET, m1: false, measure: (doc: MetricDoc) => scalarOf(cutArrival85(doc)) },
  { id: 'cut.fillet', metricVersion: '1.0.0', unit: 'share', form: 'scalar', row: 'bent-cut signature', refs: NG_TARGET, m1: false, measure: (doc: MetricDoc) => scalarOf(cutFillet(doc)) },
  {
    id: 'cut.length',
    metricVersion: '1.0.0',
    unit: 'm',
    form: 'distribution',
    row: 'bent-cut signature (cut lengths per face)',
    refs: NG_M1,
    m1: true,
    measure: (doc: MetricDoc) => sampleMap(cutLengths(doc)),
  },
] satisfies MetricDef[]);

const BY_ID: ReadonlyMap<string, MetricDef> = new Map(METRICS.map((m) => [m.id, m]));

/** The registry entry of an id (a case-sensitive match, N-24), or undefined. */
export function metricById(id: string): MetricDef | undefined {
  return BY_ID.get(id);
}

/** The ⟨M-1⟩ cells M0 measures (C-0116), as metric ids in registry order. */
export function m1Metrics(): string[] {
  return METRICS.filter((m) => m.m1).map((m) => m.id);
}

/**
 * The ⟨M-1⟩ cells of §13.5 that M0 does not measure, each with its milestone (C-0116): their rows cross and are read
 * by the milestone that builds their subject.
 */
export const M1_CELLS_LATER: readonly { readonly cell: string; readonly row: string; readonly milestone: string }[] = Object.freeze([
  { cell: 'lots per block (MFCG sweep)', row: 'MFCG street signature', milestone: 'M1' },
  { cell: "FTG's median turning per 100 m (organic presets)", row: 'street turning', milestone: 'M1' },
  { cell: 'MFCG street-edge recoverability', row: 'figure-ground and streetwall (plot texture)', milestone: 'M1' },
  { cell: 'MFCG streetwall continuity', row: 'figure-ground and streetwall (plot texture)', milestone: 'M1' },
  { cell: 'between-seed variety (MFCG, FTG)', row: 'between-seed variety', milestone: 'M1' },
  { cell: 'MFCG secondary markets and adjacent pairs', row: 'markets', milestone: 'M1' },
  { cell: "FTG's lifestyle distribution", row: 'wealth bands', milestone: 'M1' },
]);

/** The subsets of N-25: `all`, the bent-cut face kinds, `template-<t>` and `class-<flag>` of attachment B. */
export const SUBSETS: readonly string[] = Object.freeze([
  'all',
  'plain',
  'ring',
  ...NG_TEMPLATES.map((t) => `template-${t}`),
  ...NG_CLASS_FLAGS.map((f) => `class-${f}`),
]);
const SUBSET_SET: ReadonlySet<string> = new Set(SUBSETS);

/** Is `key` a key of the metric: `<subset>`, or `<subset>/<field>` for a vector metric (N-25)? */
export function isMetricKey(def: MetricDef, key: string): boolean {
  const parts = key.split('/');
  if (def.form === 'vector') return parts.length === 2 && SUBSET_SET.has(parts[0]) && (def.fields ?? []).includes(parts[1]);
  return parts.length === 1 && SUBSET_SET.has(parts[0]);
}

/** A row id's trailing segments as the metric's key (N-25), or null when they name no known subset or field. */
export function keyOfRowId(def: MetricDef, id: string): string | null {
  const parts = id.split('/');
  const n = def.form === 'vector' ? 2 : 1;
  if (parts.length < n + 1) return null;
  const key = parts.slice(parts.length - n).join('/');
  return isMetricKey(def, key) ? key : null;
}

/** One measured cell of our side, as the parity CLI reads it (`ParityOurs.entries`, C-0180 (9)). */
export interface OursEntry {
  readonly metric: string;
  readonly metricVersion: string;
  /** N-25's trailing segments: `<subset>` or `<subset>/<field>`. */
  readonly key: string;
  /** A scalar's or a vector field's per-seed values (ours = their median). */
  readonly perSeed?: readonly number[];
  /** A distribution's per-seed samples (ours = the median single-seed KS). */
  readonly samples?: readonly (readonly number[])[];
  /** The metric does not apply to this rung or setting (every seed said so); the cell reads `notApplicable`. */
  readonly notApplicable?: string;
}

/**
 * Our side of a parity run from one `MetricDoc` per seed (C-0180 (9)): every registered metric (or the ids given) measured
 * on every seed; a key's per-seed values (scalar, vector field) or samples (distribution) in seed order, keys in
 * code-unit order; a metric every seed finds inapplicable gives one `notApplicable` entry per key of its `all` subset.
 */
export function measureSeeds(docs: readonly MetricDoc[], ids?: readonly string[]): OursEntry[] {
  const out: OursEntry[] = [];
  const defs = ids === undefined ? METRICS : ids.map((id) => {
    const d = metricById(id);
    if (d === undefined) throw new Error(`measureSeeds: metric ${JSON.stringify(id)} is not registered`);
    return d;
  });
  for (const def of defs) {
    const results = docs.map((d) => def.measure(d));
    const keys = new Set<string>();
    let reason: string | undefined;
    for (const r of results) {
      if ('notApplicable' in r) reason ??= r.notApplicable;
      else for (const k of r.values.keys()) keys.add(k);
    }
    if (keys.size === 0) {
      const naKeys = def.form === 'vector' ? (def.fields ?? []).map((f) => `all/${f}`) : ['all'];
      for (const key of naKeys) out.push({ metric: def.id, metricVersion: def.metricVersion, key, notApplicable: reason ?? 'no seed' });
      continue;
    }
    for (const key of [...keys].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))) {
      if (def.form === 'distribution') {
        const samples = results.map((r) => {
          if ('notApplicable' in r) return [];
          const v = r.values.get(key);
          return Array.isArray(v) ? [...(v as readonly number[])] : [];
        });
        out.push({ metric: def.id, metricVersion: def.metricVersion, key, samples });
      } else {
        const perSeed: number[] = [];
        for (const r of results) {
          if ('notApplicable' in r) continue;
          const v = r.values.get(key);
          if (typeof v === 'number' && Number.isFinite(v)) perSeed.push(v);
        }
        out.push({ metric: def.id, metricVersion: def.metricVersion, key, perSeed });
      }
    }
  }
  return out;
}

