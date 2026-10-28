// Phase b's judgement: the hood runs' blocks and junctions against the blocks and junction rows (M0-c-07; §16 M0 (c),
// §13.5's blocks row "KS by the band rule; inside the NG band on the same face shapes" and junction row; the band rule's
// distribution clause, C-0092; the ⟨M-1⟩ verdicts, C-0116; C-0117).
//
// Each derivation seed's runs are one MetricDoc: every hood's outline (the `district_bound` chain as the arena holds it
// after S8, a closed `secondary` way, so a lane's junction on it is a shared vertex), S8's lanes, its blocks (district
// `hood-<id>`, the hood's template) and the outline as a district with its template — each hood moved by a whole
// multiple of `HOOD_SPACING_CM` along x so no two hoods' streets meet (a translation changes no area or angle). M0-k-05's
// registry measures `block.area` (a distribution per key: `all` and `template-<t>`) and the junction row
// (`junction.share4`, `junction.angles`); M0-k-05's parity report judges them. The gating clauses: every `block.area`
// key the report reads and `junction.share4/all` (the junction-degree share, §16 M0 (c)); the arm angles are reported
// beside. NG's own block areas on the same hoods (`blockAreasCm2` of the hoods' faces) are reported beside ours.
import type { Hash128 } from '@plat/kernel';
import { measureSeeds, type Baseline, type MetricBlock, type MetricDistrict, type MetricDoc, type MetricWay, type NgFacesFile, type ParityOurs } from '@plat/testkit';
import type { Clause } from '../bentcut-ng/index.js';
import { spread } from '../fusion/index.js';
import { clausesOf, judged, rowsDate } from './clauses.js';
import { addRefusal, censusOf, NOTE_FINDING, type CensusTally } from './census.js';
import type { HoodRecord, XYcm } from './hoods.js';

/** The metrics phase b measures. */
export const PHASE_B_METRICS = Object.freeze(['block.area', 'junction.share4', 'junction.angles'] as const);

/** The x step between two hoods in a seed's doc (cm): 20 km, beyond any CITY frame. */
export const HOOD_SPACING_CM = 2_000_000;

/** Phase b's gating predicate: every block.area key, and the junction-degree share. */
export function gateB(metric: string, key: string): boolean {
  return metric === 'block.area' || (metric === 'junction.share4' && key === 'all');
}

const moved = (r: readonly XYcm[], dx: number): XYcm[] => r.map((p) => ({ x: p.x + dx, y: p.y }));

/** The hood ids in order (the docs' x order). */
function hoodOrder(records: readonly HoodRecord[]): number[] {
  return [...new Set(records.map((r) => r.hood))].sort((a, b) => a - b);
}

/** One MetricDoc per derivation seed index (see the module comment); `seeds` docs, in seed-index order. */
export function hoodDocs(records: readonly HoodRecord[], seeds: number): MetricDoc[] {
  const order = hoodOrder(records);
  const docs: MetricDoc[] = [];
  for (let s = 0; s < seeds; s += 1) {
    const ways: MetricWay[] = [];
    const blocks: MetricBlock[] = [];
    const districts: MetricDistrict[] = [];
    for (const r of records) {
      if (r.seedIndex !== s || r.setup !== null || r.refused !== null || r.outline.length < 4) continue;
      const dx = HOOD_SPACING_CM * order.indexOf(r.hood);
      const id = `hood-${String(r.hood)}`;
      ways.push({ id: `${id}/outline`, class: 'secondary', line: moved(r.outline, dx) });
      r.lanes.forEach((l, i) => ways.push({ id: `${id}/lane-${String(i)}`, class: 'lane', line: moved(l, dx) }));
      r.blocks.forEach((b, i) =>
        blocks.push({ id: `${id}/block-${String(i)}`, district: id, ring: moved(b.ring, dx), content: b.content as MetricBlock['content'], depthClass: b.depthClass as MetricBlock['depthClass'], interior: b.interior as MetricBlock['interior'] }),
      );
      districts.push({ id, ring: moved(r.outline, dx), template: r.template });
    }
    docs.push({ ways, blocks, districts });
  }
  return docs;
}

/** Our parity side for phase b. */
export function oursB(docs: readonly MetricDoc[], meta: { date: string; seed: number }): ParityOurs {
  return {
    schema: 'plat.parity-ours/1',
    date: meta.date,
    outputVersion: 'M0',
    generatorVersion: 'fusion-ng',
    rung: 'CITY',
    preset: 'default',
    setting: { population: 0, water: 'none', seedFamily: `fusion-ng-b/${String(meta.seed)}`, seeds: docs.length },
    entries: measureSeeds(docs, [...PHASE_B_METRICS]),
  };
}

/** NG's own block areas on the hoods run (m²), whole and per template, as spreads (reported beside ours). */
export function ngAreasBeside(ng: NgFacesFile, hoods: readonly number[]): Record<string, ReturnType<typeof spread>> {
  const keep = new Set(hoods);
  const by = new Map<string, number[]>([['all', []]]);
  for (const f of ng.faces) {
    if (!keep.has(f.hood)) continue;
    for (const a of f.blockAreasCm2) {
      (by.get('all') as number[]).push(a / 10_000);
      const k = `template-${f.template}`;
      by.set(k, [...(by.get(k) ?? []), a / 10_000]);
    }
  }
  const out: Record<string, ReturnType<typeof spread>> = {};
  for (const k of [...by.keys()].sort()) out[k] = spread(by.get(k) as number[]);
  return out;
}

/** The run clause: every hood placed and run by S8 on every seed, and some block measured (never vacuous). */
export function runClause(records: readonly HoodRecord[]): Clause {
  const setup = records.filter((r) => r.setup !== null).length;
  const refused = records.filter((r) => r.setup === null && r.refused !== null).length;
  let blocks = 0;
  for (const r of records) blocks += r.blocks.length;
  const ok = records.length > 0 && setup === 0 && refused === 0 && blocks > 0;
  return {
    id: 'run',
    metric: 'run',
    key: 'all',
    verdict: ok ? 'pass' : 'fail',
    gating: true,
    ours: blocks,
    reference: null,
    band: {},
    baselineIds: [],
    role: 'target',
    note: `${String(records.length)} hood runs: ${String(setup)} not placed, ${String(refused)} refused by the runner or S8; ${String(blocks)} blocks measured`,
  };
}

/** The hood runs' census (J264): placement and S8 refusals, the report's census fields, by hood and seed. */
export function hoodCensus(t: CensusTally, records: readonly HoodRecord[]): void {
  const source = 'phase b: the hood runs (S1 + S8 on an outline)';
  for (const r of records) {
    if (r.setup !== null) addRefusal(t, { source, code: 'setup', inputKind: 'LAWFUL', verdict: 'MAKE-IT-SUCCEED', note: `the outline passed the loader (lawful) and was not run: ${r.setup.slice(0, 160)}` }, r.seed);
    if (r.refused !== null) addRefusal(t, { source, code: `refused: ${r.refused.split(' ')[0] ?? ''}`, inputKind: 'LAWFUL', verdict: 'MAKE-IT-SUCCEED', note: `S8 on a lawful outline: ${r.refused.slice(0, 160)} (a finding for the session with its seed)` }, r.seed);
    for (const [code, n] of [
      ['kernelDowngrades', r.census.kernelDowngrades],
      ['kernelWorkLimitHits', r.census.kernelWorkLimitHits],
      ['unplaced', r.census.unplaced],
      ['degraded', r.census.degraded],
      ['bugs', r.census.bugs],
    ] as const) {
      addRefusal(t, { source, code, inputKind: 'LAWFUL', verdict: 'MAKE-IT-SUCCEED', note: NOTE_FINDING }, r.seed, n);
    }
  }
}

/** Phase b's statistics judgement (pure): our side, the parity report, the clauses, the beside numbers and the census. */
export function judgeHoods(input: { rows: readonly Baseline[]; info: readonly string[]; hash: Hash128; seed: number; seeds: number; ng: NgFacesFile; records: readonly HoodRecord[] }): {
  ours: ParityOurs;
  parity: ReturnType<typeof judged>;
  clauses: Clause[];
  beside: Record<string, unknown>;
  census: ReturnType<typeof censusOf>;
} {
  const docs = hoodDocs(input.records, input.seeds);
  const ours = oursB(docs, { date: rowsDate(input.rows), seed: input.seed });
  const parity = judged(input.rows, input.hash, ours, input.info);
  const clauses = [runClause(input.records), ...clausesOf(parity, ours, input.rows, gateB)];
  const hoods = hoodOrder(input.records);
  const warnings: Record<string, number> = {};
  for (const r of input.records) for (const [k, n] of Object.entries(r.warnings)) warnings[k] = (warnings[k] ?? 0) + n;
  const tally: CensusTally = new Map();
  hoodCensus(tally, input.records);
  const beside: Record<string, unknown> = {
    hoods: hoods.map((h) => {
      const rs = input.records.filter((r) => r.hood === h);
      let blocks = 0;
      for (const r of rs) blocks += r.blocks.length;
      return { hood: h, template: rs[0]?.template ?? null, runs: rs.length, blocks };
    }),
    ngBlockAreasM2: ngAreasBeside(input.ng, hoods),
    s8Warnings: Object.fromEntries(Object.keys(warnings).sort().map((k) => [k, warnings[k]])),
  };
  return { ours, parity, clauses, beside, census: censusOf(tally) };
}
