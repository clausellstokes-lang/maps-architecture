// Phase a: the fusion harness's statistics on the flat fixture's districts, judged through M0-k-05's parity report
// (M0-c-07; §16 M0 (c), §4.4's gate, §13.5's junction, MFCG street-signature and deep-block-interiors rows; C-0018,
// C-0072, C-0094, C-0116, C-0117).
//
// The statistics come from M0-c-06's harness, in process: its exported entry `fusion` runs the integrated run of the
// flat fixture (S4 + S5 + S6 + S8 with S6's districts — the junction row is the integrated run's, C-0094) seed by seed
// through its own `derive` and `measure`, and folds its FusionGateReport (its report shape, never a copy of its stages or
// its measure). Each seed's derivation is also read as M0-k-05's MetricDoc — M0-c-06's `metricDocOf` (every way at L1
// and the outermost wall) with S8's blocks added (each block's working ring, its district, band, depth class, interior
// and content) — and measured by M0-k-05's registry for the phase's metrics (`PHASE_A_METRICS`).
//
// Which clauses gate (C-0072, C-0094; the work twin's `builds`): the junction row (median, p5, 4-way share; NG's
// target rows), the MFCG rows measurable on M0's ways and blocks — T / Y share, intramural dead ends, blocks per ha
// (⟨M-1⟩ cells) — and the deep-interior row's NG cell (court share of deep blocks; ⟨M-1⟩). R4 and wall alignment are
// block-OBB proxies, marked `reported` by the parity report (C-0018), never pass or fail; lots per block is M1's
// (`notApplicable`, C-0072). The deep-interior row's MFCG cell is the MFCG parity preset's (§4.6: "The MFCG parity
// preset reads MFCG's own row"; presets arrive at M1) and is reported beside, never judged, under the default preset.
//
// The junction row's declared shift (§13.5, C-0094): M0-c-06's verdict on the same records against its absolute
// thresholds is set beside the band rule's verdicts on the recomputed band; a pass turned into a fail is declared with
// the numbers, never a silent re-judgement.
import type { Hash128 } from '@plat/kernel';
import { courtShareByBand, measureSeeds, type Baseline, type MetricBlock, type MetricDoc, type ParityOurs } from '@plat/testkit';
import type { S8Output } from '@plat/layout';
import type { Block } from '@plat/model';
import { loadTable } from '@plat/tables';
import type { Clause } from '../bentcut-ng/index.js';
import { derive, JUNCTION, measure, metricDocOf, type Derivation, type FusionGateReport, type SeedRecord } from '../fusion/index.js';
import { clausesOf, judged, rowsDate } from './clauses.js';
import { addRecordCensus, censusOf, type CensusTally } from './census.js';
import type { JunctionShift, RunSize } from './report.js';

/** The metrics phase a measures (attachment A's ids; the registry's order is kept by measureSeeds). */
export const PHASE_A_METRICS = Object.freeze([
  'junction.angles',
  'junction.share4',
  'sgd.tShare',
  'sgd.deadEnds',
  'blockc.perHa',
  'bldg.r4.60',
  'bldg.r4.120',
  'bldg.r4.250',
  'bldg.wallAlign.median',
  'bldg.wallAlign.share15',
  'blockc.lotsPer',
  'block.courtShare',
] as const);

/** The junction cells (the row M0-c-06 judges now and phase a re-judges, C-0094). */
export const JUNCTION_CLAUSES = Object.freeze(['junction.angles/all/median', 'junction.angles/all/p5', 'junction.share4/all']);

/** The MFCG rows that gate at M0 (C-0072). */
export const MFCG_GATING = Object.freeze(['sgd.tShare', 'sgd.deadEnds', 'blockc.perHa']);

/** The note of the deep-interior row's MFCG cell under the default preset (§4.6). */
export const NOTE_MFCG_PRESET = "the MFCG parity preset's cell (§4.6: the MFCG preset reads MFCG's own row; presets arrive at M1): reported beside under the default preset";

/** Phase a's gating predicate (see the module comment). */
export function gateA(metric: string, key: string, reference: string | null): boolean {
  if (metric === 'junction.angles') return key === 'all/median' || key === 'all/p5';
  if (metric === 'junction.share4') return key === 'all';
  if ((MFCG_GATING as readonly string[]).includes(metric)) return key === 'all';
  if (metric === 'block.courtShare') return key === 'all' && reference === 'NG';
  return false;
}

/**
 * One derivation's MetricDoc for phase a: M0-c-06's `metricDocOf` (the ways at L1 and the outermost wall) with S8's
 * blocks — each block's working ring (S8's kerb, the ring M0-c-06's block areas read), its district and that
 * district's band, its depth class, interior and content.
 */
export function statsDoc(d: Derivation): MetricDoc {
  const base = metricDocOf(d);
  const infill = d.model.data.get('infill') as S8Output['infill'] | undefined;
  const records = (d.model.data.get('blocks') as readonly Block[] | undefined) ?? [];
  const byId = new Map(records.map((b) => [b.id as string, b]));
  const blocks: MetricBlock[] = [];
  for (const bf of infill?.blockFaces ?? []) {
    const b = byId.get(bf.block);
    const district = b?.district as string | undefined;
    const band = district === undefined ? undefined : d.ins.bandOf.get(district as never);
    blocks.push({
      id: bf.block,
      ring: bf.kerb.map((p) => ({ x: p.x, y: p.y })),
      ...(district === undefined ? {} : { district }),
      ...(b === undefined ? {} : { content: b.content, depthClass: b.depthClass, interior: b.interior }),
      ...(band === undefined ? {} : { band }),
    });
  }
  return { ...base, blocks };
}

/** One seed of phase a: the integrated run derived once, read as a MetricDoc, then measured by M0-c-06's `measure`. */
export function seedRun(seed: number, size: RunSize): { record: SeedRecord; doc: MetricDoc } {
  const d = derive('integrated', seed, { ...(size.frameHa === null ? {} : { frameHa: size.frameHa }), ...(size.walledHa === null ? {} : { walledHa: size.walledHa }) });
  const doc = statsDoc(d);
  return { record: measure(d), doc };
}

/** Our parity side for phase a (C-0180 (9)'s shape; the date the rows' newest, never a wall-clock). */
export function oursA(docs: readonly MetricDoc[], meta: { date: string; from: number }): ParityOurs {
  return {
    schema: 'plat.parity-ours/1',
    date: meta.date,
    outputVersion: 'M0',
    generatorVersion: 'fusion-ng',
    rung: 'CITY',
    preset: 'default',
    setting: { population: 0, water: 'none', seedFamily: `fusion-ng-a/${String(meta.from)}`, seeds: docs.length },
    entries: measureSeeds(docs, [...PHASE_A_METRICS]),
  };
}

/**
 * The deep-interior row's MFCG cell under the default preset: a band verdict on its one row kept in the note and the
 * cell reported; any other verdict (its ⟨M-1⟩ row missing, a duplicate) stands, the cell never gating.
 */
function presetCell(c: Clause): Clause {
  if (c.metric !== 'block.courtShare' || !c.id.endsWith('@MFCG')) return c;
  if ((c.verdict !== 'pass' && c.verdict !== 'fail') || c.baselineIds.length !== 1) return { ...c, note: c.note === undefined ? NOTE_MFCG_PRESET : `${c.note}; ${NOTE_MFCG_PRESET}` };
  return { ...c, verdict: 'reported', note: `${NOTE_MFCG_PRESET}; ${c.verdict === 'pass' ? 'in band' : 'out of band'}` };
}

/** The junction row's shift record (see the module comment). */
export function junctionShift(clauses: readonly Clause[], gate: FusionGateReport | null): JunctionShift {
  const run = gate?.runs.find((r) => r.run === 'integrated');
  const m0c06 = gate === null ? null : gate.verdicts.junction;
  const cells = JUNCTION_CLAUSES.map((id) => {
    const c = clauses.find((x) => x.id === id);
    return { id, ours: c?.ours ?? null, band: c?.band ?? {}, baselineIds: c?.baselineIds ?? [], verdict: c?.verdict ?? 'absent' };
  });
  const judgedCells = cells.filter((c) => c.verdict === 'pass' || c.verdict === 'fail');
  const bandRule = judgedCells.length === cells.length && cells.every((c) => c.verdict === 'pass');
  let direction: JunctionShift['direction'] = 'none';
  if (judgedCells.length > 0 && m0c06 === true && judgedCells.some((c) => c.verdict === 'fail')) direction = 'pass→fail';
  else if (m0c06 === false && bandRule) direction = 'fail→pass';
  const fin = (x: number | undefined): number | null => (x === undefined || !Number.isFinite(x) ? null : x);
  return {
    m0c06,
    thresholds: { ...JUNCTION },
    m0c06Readings: { pooledMedian: fin(run?.junction.pooled.median), p5Min: fin(run?.junction.perSeed.p5Min), share4Max: fin(run?.junction.perSeed.share4Max), nodes: run?.junction.pooled.nodes ?? 0 },
    bandRule,
    direction,
    declared: direction === 'pass→fail',
    cells,
  };
}

/** The per-band court shares beside the row (§13.5: "the share within the band row's target per class"; §4.6's cells). */
export function courtBeside(docs: readonly MetricDoc[]): Record<string, { ours: number; target: number | null }> {
  const blocks: MetricBlock[] = [];
  for (const d of docs) blocks.push(...(d.blocks ?? []));
  const shares = courtShareByBand({ ways: [], blocks });
  const interior = loadTable('interior');
  const out: Record<string, { ours: number; target: number | null }> = {};
  for (const band of [...shares.keys()].sort()) {
    out[band] = { ours: shares.get(band) as number, target: interior.has(band, 'shares.court') ? interior.num(band, 'shares.court') : null };
  }
  return out;
}

/** Phase a's judgement (pure in its inputs): the clauses, the shift, the statistics beside and the census. */
export function judgeA(input: {
  rows: readonly Baseline[];
  info: readonly string[];
  hash: Hash128;
  from: number;
  docs: readonly MetricDoc[];
  records: readonly SeedRecord[];
  gate: FusionGateReport | null;
}): { ours: ParityOurs; parity: ReturnType<typeof judged>; clauses: Clause[]; shift: JunctionShift; beside: Record<string, unknown>; census: ReturnType<typeof censusOf> } {
  const ours = oursA(input.docs, { date: rowsDate(input.rows), from: input.from });
  const parity = judged(input.rows, input.hash, ours, input.info);
  const clauses = clausesOf(parity, ours, input.rows, gateA).map(presetCell);
  const shift = junctionShift(clauses, input.gate);
  const tally: CensusTally = new Map();
  for (const r of input.records) addRecordCensus(tally, 'phase a: the fixture’s integrated run (M0-c-06’s measure)', r);
  const run = input.gate?.runs.find((r) => r.run === 'integrated');
  const beside: Record<string, unknown> = {
    courtShareByBand: courtBeside(input.docs),
    m0c06: input.gate === null ? null : { pass: input.gate.pass, verdicts: input.gate.verdicts, junction: run?.junction ?? null, faces: run === undefined ? null : { districts: run.faces.districts, blocks: run.faces.blocks } },
    seeds: input.records.map((r) => r.seed),
  };
  return { ours, parity, clauses, shift, beside, census: censusOf(tally) };
}
