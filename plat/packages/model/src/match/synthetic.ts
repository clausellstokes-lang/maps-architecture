// §6.3's synthetic anchor sets (item M0-d-05b; §6.3 *Budget*: "a 450-building district regeneration, a 30 000-entity
// CITY re-derivation (… when the fresh town is unrelated to the old one) and an 80 000-entity METROPOLIS mapping at a
// 2 m radius"). Deterministic old / fresh pairs built from a seed, for the routine's timing harness and its outcome
// tests. A building is no M0 kind (its anchor row comes with M1), so the sets match with `SYNTHETIC_ANCHORS`: the M0
// table without the bridge (whose radius is a table cell and which no synthetic set holds) and with §6.3's building
// row (footprint centroid, 0.5 m) — a measurement-only table, never the routine's M0 table (C-0188).
import type { LineageHash } from '@plat/kernel';
import type { EntityKind, Id, PointCm, PolygonCm } from '../types/index.js';
import { M0_ANCHORS } from './anchors.js';
import type { AnchorSpec, MatchEntity } from './types.js';

/** §6.3's building row, for the synthetic sets only (the building kind and its anchor row are M1's). */
export const SYNTHETIC_BUILDING: AnchorSpec = Object.freeze({
  kind: 'building',
  anchor: 'point',
  text: 'footprint centroid',
  radiusM: 0.5,
  family: 'building class family',
});

/** The synthetic sets' anchor table: M0's rows but the bridge, then the building row. */
export const SYNTHETIC_ANCHORS: readonly AnchorSpec[] = Object.freeze([...M0_ANCHORS.filter((s) => s.kind !== 'bridge'), SYNTHETIC_BUILDING]);

/** The synthetic sets of §6.3. */
export type SyntheticName = 'district' | 'city' | 'city-unrelated' | 'metropolis';

/** One synthetic old / fresh pair. */
export interface SyntheticSet {
  readonly name: SyntheticName;
  readonly seed: number;
  readonly old: readonly MatchEntity[];
  readonly fresh: readonly MatchEntity[];
  readonly anchors: readonly AnchorSpec[];
  /** The old entities per anchor class (the per-entity divisor of the bar: re-derived entities). */
  readonly point: number;
  readonly overlap: number;
}

const U32 = 2.3283064365386963e-10; // 2⁻³²

/**
 * mulberry32 over a u32 seed: a deterministic stream in [0, 1). The synthetic workload's own cheap generator, not the
 * model's RNG (the kernel's keyed streams, §6.1, which take a seed key and a concern a workload fixture has none of);
 * the digest's workload (digest/workload.ts) carries its twin.
 */
function stream(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) * U32;
  };
}

const int = (rnd: () => number, lo: number, hi: number): number => lo + Math.floor(rnd() * (hi - lo + 1));

const FAMILIES = ['small dwellings', 'halls and manors', 'workshops and stores'];

interface Mix {
  /** Point-anchored entities per kind, with each kind's perturbation (cm) — within its radius. */
  readonly points: readonly (readonly [EntityKind, number, number])[];
  /** Overlap-anchored squares per kind. */
  readonly areas: readonly (readonly [EntityKind, number])[];
  /** The extent's side (cm). */
  readonly side: number;
  /** The share of old entities re-derived far away (gone, and a fresh one elsewhere). */
  readonly churn: number;
  readonly unrelated: boolean;
}

const MIXES: Record<SyntheticName, Mix> = {
  district: { points: [['building', 450, 20]], areas: [], side: 40_000, churn: 0.05, unrelated: false },
  city: {
    points: [
      ['junction', 7_000, 60],
      ['block', 7_000, 120],
      ['cell', 1_000, 300],
      ['building', 14_000, 30],
    ],
    areas: [
      ['water', 200],
      ['enceinte', 800],
    ],
    side: 300_000,
    churn: 0.05,
    unrelated: false,
  },
  'city-unrelated': {
    points: [
      ['junction', 7_000, 0],
      ['block', 7_000, 0],
      ['cell', 1_000, 0],
      ['building', 14_000, 0],
    ],
    areas: [
      ['water', 200],
      ['enceinte', 800],
    ],
    side: 300_000,
    churn: 1,
    unrelated: true,
  },
  metropolis: { points: [['block', 80_000, 120]], areas: [], side: 1_000_000, churn: 0.05, unrelated: false },
};

const square = (x: number, y: number, s: number): PolygonCm =>
  [
    [
      { x, y },
      { x: x + s, y },
      { x: x + s, y: y + s },
      { x, y: y + s },
    ] as unknown as PointCm[],
  ] as unknown as PolygonCm;

const lineage = (a: number, b: number): Readonly<LineageHash> => Object.freeze([a >>> 0, b >>> 0]) as unknown as Readonly<LineageHash>;
const pad = (i: number): string => String(i).padStart(6, '0');

/**
 * The synthetic pair `name` at `seed`: the old entities re-derived (none survives), the fresh ones each within its
 * kind's radius of its old one but for the churned share, which is re-derived far away; `city-unrelated` draws the
 * fresh town independently of the old. Ids `<kind>:o<n>` and `<kind>:f<n>`, lineages from the seed.
 */
export function syntheticSet(name: SyntheticName, seed: number): SyntheticSet {
  const mix = MIXES[name];
  if (mix === undefined) throw new RangeError(`match: no synthetic set named ${String(name)}`);
  const rnd = stream(seed);
  const fresh2 = stream(seed ^ 0x5bd1e995);
  const old: MatchEntity[] = [];
  const fresh: MatchEntity[] = [];
  let n = 0;
  let point = 0;
  let overlap = 0;
  for (const [kind, count, jitter] of mix.points) {
    for (let i = 0; i < count; i += 1) {
      n += 1;
      const x = int(rnd, 0, mix.side);
      const y = int(rnd, 0, mix.side);
      const family = kind === 'building' ? FAMILIES[i % FAMILIES.length] : undefined;
      const base = { kind, ...(family === undefined ? {} : { family }) };
      old.push({ ...base, id: `${kind}:o${pad(i)}` as Id, lineage: lineage(n, seed), anchor: { point: { x, y } as unknown as PointCm } });
      const far = mix.unrelated || rnd() < mix.churn;
      const fx = far ? int(fresh2, 0, mix.side) : x + int(rnd, -jitter, jitter);
      const fy = far ? int(fresh2, 0, mix.side) : y + int(rnd, -jitter, jitter);
      fresh.push({ ...base, id: `${kind}:f${pad(i)}` as Id, lineage: lineage(n, seed + 1), anchor: { point: { x: fx, y: fy } as unknown as PointCm } });
      point += 1;
    }
  }
  // Squares on a coarse grid, row by row, apart from each other; a fresh one shifted by up to a tenth of its side.
  const pitch = 9_000;
  let across = 1;
  while ((across + 1) * pitch <= mix.side) across += 1;
  let cx = 0;
  let cy = 0;
  for (const [kind, count] of mix.areas) {
    for (let i = 0; i < count; i += 1) {
      n += 1;
      const gx = cx * pitch;
      const gy = cy * pitch;
      cx += 1;
      if (cx === across) {
        cx = 0;
        cy += 1;
      }
      const s = int(rnd, 2_000, 8_000);
      old.push({ kind, id: `${kind}:o${pad(i)}` as Id, lineage: lineage(n, seed), anchor: { area: square(gx, gy, s) } });
      const far = mix.unrelated || rnd() < mix.churn;
      const d = Math.floor(s * 0.1);
      const fx = far ? int(fresh2, 0, mix.side) : gx + int(rnd, -d, d);
      const fy = far ? int(fresh2, 0, mix.side) : gy + int(rnd, -d, d);
      fresh.push({ kind, id: `${kind}:f${pad(i)}` as Id, lineage: lineage(n, seed + 1), anchor: { area: square(fx, fy, s) } });
      overlap += 1;
    }
  }
  return Object.freeze({ name, seed, old: Object.freeze(old), fresh: Object.freeze(fresh), anchors: SYNTHETIC_ANCHORS, point, overlap });
}
