// The synthetic, schema-shaped CITY workload of the digest's bars (C-0015: "schema-shaped synthetic records at §6.2's
// CITY counts for the digest bars"; §6.2: "≈ 10 900 derivation and 3 500 naming records at CITY … on a synthetic,
// schema-shaped workload"; M0-d-04). Deterministic from a seed: 26 districts, 1 000 blocks and 9 900 plots under them,
// 600 ways and 500 junctions — the model records, each of its M0 record type with every required field — and the
// 10 900 derivation records (one per block and plot) and 3 500 naming records (the ways, the districts and 2 874 named
// plots) of the records tree, each in its node: a block's and a plot's in its district's partition (a plot in five
// hundred in the partition outside districts), a way's and a district's in the town node. No arena: the records'
// references resolve to their unresolved digests (their geometry is the spikes', M0-d-09). B-CITY's own run is M1's.
import type { Cdeg, Cm, Id, LineageHash, M } from '@plat/kernel';
import type { Block, District, Plot } from '../records/districts.js';
import type { Junction, Way } from '../records/network.js';
import type { Lifecycle } from '../types/identity.js';
import type { DerivationRecord, NamingRecord, SliceRef } from '../types/vocabulary.js';
import type { DigestEntry } from './leaf.js';
import { RECORDS_OUTSIDE, RECORDS_TOWN, type RecordsEntry } from './records.js';

/** §6.2's CITY counts (and the model records beside them). */
export const CITY_COUNTS = Object.freeze({
  districts: 26,
  blocks: 1000,
  plots: 9900,
  ways: 600,
  junctions: 500,
  derivation: 10_900,
  naming: 3500,
});

/** The workload: the model's records and the records tree's. */
export interface SyntheticCity {
  readonly seed: number;
  readonly model: readonly DigestEntry[];
  readonly records: readonly RecordsEntry[];
  readonly districts: readonly Id[];
}

const U32 = 2.3283064365386963e-10; // 2⁻³²

/**
 * mulberry32 over a u32 seed: a deterministic stream of u32 words and of units in [0, 1). The synthetic workload's own
 * cheap generator, not the model's RNG (the kernel's keyed streams, §6.1, which take a seed key and a concern a workload
 * fixture has none of); the matching module's synthetic workload (match/synthetic.ts) carries its twin.
 */
function stream(seed: number): { u32: () => number; unit: () => number } {
  let a = seed >>> 0;
  const u32 = (): number => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (t ^ (t >>> 14)) >>> 0;
  };
  return { u32, unit: () => u32() * U32 };
}

type Rnd = ReturnType<typeof stream>;

const LIFE: Lifecycle = Object.freeze({
  existence: 'generated',
  flags: Object.freeze({ locked: false, pinned: false, edited: false, assigned: false }),
  since: Object.freeze({ epoch: 0, seq: 0 }),
}) as Lifecycle;

const KEY = Object.freeze({ layer: 'ground' as const, part: 0 });

const cm = (n: number): Cm => n as Cm;
const metres = (n: number): M => n as M;
const hash64 = (r: Rnd): [number, number] => [r.u32(), r.u32()];
const pick = <T>(r: Rnd, xs: readonly T[]): T => xs[r.u32() % xs.length];

function slices(r: Rnd, n: number): SliceRef[] {
  const out: SliceRef[] = [];
  for (let i = 0; i < n; i++) {
    out.push({ table: pick(r, ['roster.classes', 'plots.subdivision', 'naming.grammar', 'bands.cuts']), version: '1', kind: pick(r, ['row', 'weights', 'bracket', 'thresholds', 'match'] as const), key: `row${r.u32() % 400}`, hash: hash64(r) });
  }
  return out;
}

function derivation(r: Rnd, placements: number): DerivationRecord {
  const rec: DerivationRecord = {
    ctx: hash64(r),
    fields: { prosperity: r.unit(), density: r.unit(), greenery: r.unit() },
    band: pick(r, ['b1', 'b2', 'b3', 'b4']),
    allocationRow: r.u32() % 64,
    epoch: 0,
    params: hash64(r),
    slices: slices(r, 4 + (r.u32() % 5)),
  };
  if (placements > 0) {
    rec.placements = [];
    for (let k = 0; k < placements; k++) rec.placements.push({ use: `use:${r.u32() % 100_000}`, seq: 0, k, pass: 1 });
  }
  return rec;
}

function naming(r: Rnd): NamingRecord {
  return { slices: slices(r, 4 + (r.u32() % 5)), salt: r.u32(), epoch: 0 };
}

function lineage(r: Rnd): LineageHash {
  return hash64(r);
}

function plot(r: Rnd, id: Id, block: Id, district: Id, derivedFrom: DerivationRecord): Plot {
  const frontageCm = cm(400 + (r.u32() % 1600));
  return {
    id,
    face: { owner: id, level: 3 },
    block,
    district,
    frontage: { role: 'frontage', entity: id },
    access: { role: 'access', entity: id },
    depthCm: cm(1200 + (r.u32() % 3000)),
    frontageCm,
    exposure: pick(r, ['street', 'lane', 'alley', 'court'] as const),
    knownTo: 'public',
    tenure: pick(r, ['owned', 'rented', 'common', 'informal'] as const),
    partyWalls: { role: 'party_wall', entity: id },
    bounds: [
      { id: `${id}/b0`, edges: { role: 'treatment', entity: `${id}/b0` }, side: 'rear', treatment: pick(r, ['none', 'fence', 'hedge', 'wall'] as const), heightCm: cm(120 + (r.u32() % 200)), gates: [], ownedBy: id, lifecycle: LIFE },
    ],
    use: pick(r, ['house', 'shop', 'workshop', 'inn', 'vacant']),
    sitePlan: {
      arrangement: pick(r, ['row', 'compound', 'detached'] as const),
      coverage: r.unit(),
      slots: [{ role: 'main', entranceOn: { role: 'access', entity: id } }],
      frontJitterCm: cm(r.u32() % 60),
      ruleRow: `site.${r.u32() % 40}`,
    },
    buildings: [`building:${r.u32() % 1_000_000}`],
    yard: [],
    builtBand: 'b2',
    builtProsperity: r.unit(),
    fieldBand: 'b2',
    ctx: {
      areaM2: 50 + r.unit() * 400,
      shape: { obbW: metres(6 + r.unit() * 10), obbD: metres(12 + r.unit() * 30), compactness: r.unit(), reflex: r.u32() % 3, corner: r.unit() < 0.2, wedge: r.unit() < 0.05 },
      frontageM: frontageCm * 0.01,
      roadClass: pick(r, ['primary', 'secondary', 'lane'] as const),
      roadWidthM: 4 + r.unit() * 8,
      districtKind: 'riverside',
      quarter: district,
      venueMix: 'mix:0',
      prosperity: r.unit(),
      prosperityBand: 'b2',
      density: r.unit(),
      greenery: r.unit(),
      dist: { centre: metres(r.unit() * 900), plaza: metres(r.unit() * 400), market: metres(r.unit() * 500), gate: metres(r.unit() * 700), water: metres(r.unit() * 600), shore: metres(r.unit() * 600) },
      upstream: r.unit(),
      slope: r.unit() * 0.1,
      aspect: (r.u32() % 36_000) as Cdeg,
      upwind: r.unit(),
      baseCm: cm(r.u32() % 4000),
      terrainClass: pick(r, ['high', 'mid', 'low'] as const),
      growthStage: r.u32() % 4,
      epoch: 0,
      buildingScale: 1,
      arena: 'ground',
    },
    derivedFrom,
    lifecycle: LIFE,
  };
}

/** The workload of `seed` (default 1). */
export function syntheticCity(seed = 1): SyntheticCity {
  const r = stream(seed);
  const model: DigestEntry[] = [];
  const records: RecordsEntry[] = [];
  const districts: Id[] = [];
  const C = CITY_COUNTS;
  for (let d = 0; d < C.districts; d++) {
    const id = `district:${d}`;
    districts.push(id);
    const rec: District = {
      id,
      kind: 'riverside',
      quarter: `quarter:${d % 6}`,
      faces: { owner: id, level: 1 },
      seams: [],
      growthStage: d % 4,
      fabric: 'bent-cut',
      fabricParams: { depthM: 30 + d, spread: 0.25 },
      name: `District ${d}`,
      lifecycle: LIFE,
    };
    model.push({ kind: 'district', id, identity: { lineage: lineage(r), key: KEY }, record: rec });
    records.push({ entity: id, kind: 'naming', partition: RECORDS_TOWN, record: naming(r) });
  }
  for (let w = 0; w < C.ways; w++) {
    const id = `way:${w}`;
    const rec: Way = {
      id,
      class: pick(r, ['primary', 'secondary', 'lane', 'alley'] as const),
      spine: { role: 'way', entity: id },
      width: cm(400 + (r.u32() % 800)),
      name: `Way ${w}`,
      from: { kind: 'junction', id: `junction:${r.u32() % C.junctions}` },
      to: { kind: 'bearing', bearingCdeg: (r.u32() % 36_000) as Cdeg },
      growthStage: w % 4,
      epoch: 0,
      provisional: false,
      lifecycle: LIFE,
    };
    model.push({ kind: 'way', id, identity: { lineage: lineage(r), key: KEY }, record: rec });
    records.push({ entity: id, kind: 'naming', partition: RECORDS_TOWN, record: naming(r) });
  }
  for (let j = 0; j < C.junctions; j++) {
    const id = `junction:${j}`;
    const rec: Junction = { id, vertex: { role: 'junction', entity: id }, arms: [`way:${r.u32() % C.ways}`, `way:${r.u32() % C.ways}`], kind: pick(r, ['T', 'X', 'Y'] as const), lifecycle: LIFE };
    model.push({ kind: 'junction', id, identity: { lineage: lineage(r), key: KEY }, record: rec });
  }
  for (let b = 0; b < C.blocks; b++) {
    const id = `block:${b}`;
    const district = districts[b % C.districts];
    const rec: Block = { id, face: { owner: id, level: 2 }, district, depthClass: 'standard', interior: 'plots', reach: 'open', content: 'ordinary', lifecycle: LIFE };
    model.push({ kind: 'block', id, identity: { lineage: lineage(r), parent: district, key: KEY }, record: rec });
    records.push({ entity: id, kind: 'derivation', partition: district, record: derivation(r, 0) });
  }
  const namedPlots = C.naming - C.ways - C.districts;
  for (let i = 0; i < C.plots; i++) {
    const id = `plot:${i}`;
    const block = `block:${i % C.blocks}`;
    const district = districts[(i % C.blocks) % C.districts];
    const d = derivation(r, r.u32() % 3);
    const partition = i % 500 === 499 ? RECORDS_OUTSIDE : district;
    model.push({ kind: 'plot', id, identity: { lineage: lineage(r), parent: block, key: KEY }, record: plot(r, id, block, district, d) });
    records.push({ entity: id, kind: 'derivation', partition, record: d });
    if (i < namedPlots) records.push({ entity: id, kind: 'naming', partition, record: naming(r) });
  }
  return Object.freeze({ seed, model: Object.freeze(model), records: Object.freeze(records), districts: Object.freeze(districts) });
}

/**
 * A district's re-derivation in the workload: its blocks' and plots' records drawn afresh from `seed` (the derivation
 * records and the plots' attributes), the model entries and records entries a batch would write. The timing harness's
 * batch (timing.ts).
 */
export function rederiveDistrict(city: SyntheticCity, district: Id, seed: number): { model: DigestEntry[]; records: RecordsEntry[] } {
  const r = stream(seed);
  const model: DigestEntry[] = [];
  const records: RecordsEntry[] = [];
  for (const e of city.model) {
    if (e.kind !== 'plot') continue;
    const p = e.record as Plot;
    if (p.district !== district) continue;
    const d = derivation(r, r.u32() % 3);
    model.push({ ...e, record: plot(r, e.id, p.block, district, d) });
    records.push({ entity: e.id, kind: 'derivation', partition: district, record: d });
  }
  return { model, records };
}
