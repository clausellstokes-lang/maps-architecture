// The work-limit fit (M0-f-03b; §5.1 (5) *Coefficients* and *Confirmation*, §13.2 "Work limits follow population",
// §5.4's `work_cut`; C-0021, C-0091, C-0301 (3), N-61 (6)): the four harness summaries' work-per-unit quantile blocks in,
// the coefficient report and the F-WORK hit-rate report out. Pure: no file, no clock — `index.ts` reads the four files
// and hands their parsed JSON here, so the same summaries give the same report on every machine.
//
// Per counting counter: the measured work per unit's 99.9th percentile is the largest p999 of the counter's blocks (a
// block is one run, group, fixture or primitive of one summary; the largest is the pooled sample's bound from above),
// and the coefficient is that p999 × 1.5. The row's perUnit and floor both take the coefficient: the spikes divide a
// batch's work by max(1, count) — by max(1, ⌈log2 count⌉) on a log2 law — so floor = perUnit = k is the least law of
// §5.1 (5)'s form floor + k × count that covers k × max(1, count) at every count ≥ 0. A counter whose design law names
// a floor (§3.8's 4 · (n + r) + 64 for `skeleton.events`) is written as max(measured, law), cell by cell (N-61 (6); §5.1
// (5) as amended). A fixed row (`warp.halvings`) is skipped and its block never read (C-0301 (3)); a counting row no
// summary measured keeps its cells as they stand. The fit refuses (FitError) a summary of the wrong shape, a block whose
// unit or log2 form departs from the table's row, a counter the table has no row for (C-0021: a new row and an
// amendment of M0-work.json's list first) and a coefficient that is not a positive finite number.
//
// The hit-rate report (C-0444 (7) as amended by C-0446) has a row for every stage each summary shows RAN — M0-e-06's
// `stages` / `batches` rows, M0-c-06's runs by `C06_RUN_STAGES`, M0-b-04's work stage, M0-k-04's primitives — and on it
// every counter the stage CHARGES (`STAGE_CHARGES`: the base stages' declared work-limit laws and the charges made
// outside a declaration). A charged counter with no block of n > 0 there is UNBOUNDED: the row's `after` is null, never
// 0, and while any row is unbounded the report does not pass (the entry exits 1 and writes no table).
import type { Rung } from '@plat/model';
import { fWorkReport, WORK_LIMIT_COUNTERS, type FWorkBatch, type FWorkReport, type TableWorkLimitLaw, type WorkLimitsTable } from '@plat/tables';

/** The four summaries M0-f-03b reads (C-0091), in the order it reads them. */
export const SUMMARY_IDS = Object.freeze(['M0-c-06', 'M0-e-06', 'M0-b-04', 'M0-k-04'] as const);
export type SummaryId = (typeof SUMMARY_IDS)[number];

/** §5.1 (5)'s × 1.5 over the measured p999. */
export const P999_FACTOR = 1.5;

/** The hit-rate target of the item's test and §5.1 (5)'s confirmation: at most 1 work cut per 1 000 batches. */
export const HIT_RATE_TARGET_PER_THOUSAND = 1;

/** A design law that floors a counter's row (§5.1 (5) as amended; N-61 (6)): the row is max(measured, law) cell by cell. */
export interface LawFloor {
  readonly perUnit: number;
  readonly floor: number;
  readonly law: string;
}

/**
 * The counters whose design law names a floor. `skeleton.events`: §3.8's 4 · (n + r) + 64 events with r ≤ n reflex
 * vertices of n is at most 8 n + 64 — perUnit 8, floor 64 (M0.md §2.2; the kernel's `skeletonEventLimit`, C-0168 (5)).
 */
export const LAW_FLOORS: ReadonlyMap<string, LawFloor> = new Map([
  ['skeleton.events', Object.freeze({ perUnit: 8, floor: 64, law: '§3.8 4 · (n + r) + 64, r ≤ n' })],
]);

/** The kernel's insertion and walk counters: every batch of a stage that commits through the kernel charges them. */
export const KERNEL_COUNTERS = Object.freeze(['insert.points', 'insert.attractQueries', 'insert.placementCandidates', 'insert.crossings', 'tx.facesWalked'] as const);

/** The counters a stage charges, by stage: what the hit-rate report must find a block for at every stage that ran. */
export type StageCharges = ReadonlyMap<string, readonly string[]>;

/**
 * The counters each base stage charges (C-0446): its declared work-limit laws (packages/layout/src/pipeline/base.ts,
 * `registerBase`'s stages' `workLimits`; the test holds this table to them) and the charges made outside a declaration —
 * S1's `hydro.cells` (base.ts `hydroCellsLimit`, the river strategy at S1), S3's kernel counters (its enceinte commit,
 * enceinte/commit.ts, inserts through the kernel at a fixed limit, no table law today) and S6's `field.cells` (fields/
 * pass1.ts, at S6). A stage not listed here is refused (the table is behind the pipeline).
 */
export const STAGE_CHARGES: StageCharges = new Map<string, readonly string[]>([
  ['S1', Object.freeze([...KERNEL_COUNTERS, 'hydro.cells'])],
  ['S3', Object.freeze([...KERNEL_COUNTERS, 'route.nodes'])],
  ['S4', Object.freeze([...KERNEL_COUNTERS, 'route.nodes'])],
  ['S5', Object.freeze([...KERNEL_COUNTERS, 'growth.proposals', 'growth.candidates', 'route.nodes'])],
  ['S6', Object.freeze([...KERNEL_COUNTERS, 'grower.turns', 'field.cells'])],
  ['S8', Object.freeze(['cut.kernelCalls', 'cut.recursionDepth', 'cut.candidates'])],
]);

/**
 * The stages each M0-c-06 run drives (bench/src/fusion/runs.ts's header; C-0446): the FUSION run the base's S1 (the
 * flat L0 batch), S3's slice, S4 and S5, then S8 over stand-in districts — no S6; the INTEGRATED run the base's six
 * stages. The summary's work blocks and timing stamps are checked against it (a stage outside it is refused).
 */
export const C06_RUN_STAGES: ReadonlyMap<string, readonly string[]> = new Map<string, readonly string[]>([
  ['fusion', Object.freeze(['S1', 'S3', 'S4', 'S5', 'S8'])],
  ['integrated', Object.freeze(['S1', 'S3', 'S4', 'S5', 'S6', 'S8'])],
]);

/** Where M0-c-06's summary keeps each run's stage stamps (bench/src/fusion/report.ts `summaryOf`). */
const C06_TIMING: ReadonlyMap<string, string> = new Map([
  ['fusion', 'r12_4'],
  ['integrated', 'integrated'],
]);

/** C-0091's quantile block { n, p50, p99, p999, max } of one counter's work per unit. */
export interface WorkQuantiles {
  readonly n: number;
  readonly p50: number;
  readonly p99: number;
  readonly p999: number;
  readonly max: number;
}

/** One counter's block in one summary: where it lies, its stage and its quantiles. */
export interface WorkBlock {
  readonly summary: SummaryId;
  /** The block's place in its summary (`runs/0 (fusion)`, `groups/2 (relief-3000/default)`, `primitives/splitFace`). */
  readonly at: string;
  /** The stage (S1, S4, S5, S6, S8) or, in M0-k-04, the kernel primitive the batches ran. */
  readonly stage: string;
  readonly counter: string;
  readonly perUnit: WorkQuantiles;
  /** The batches' unit counts, where the summary carries them (the fixture size the batches ran at). */
  readonly units: WorkQuantiles | null;
}

/** One stage of one run, group, fixture or primitive: its blocks, its batch count and its recorded hits. */
export interface StageGroup {
  readonly summary: SummaryId;
  readonly at: string;
  readonly stage: string;
  /** The rung the spike ran at (CITY for the three stage spikes); null for M0-k-04's kernel fuzz, which has none. */
  readonly rung: Rung | null;
  /**
   * The batches the stage ran: the count the summary states for the stage (M0-e-06's `batches` row, committed +
   * refused; M0-c-06's and M0-b-04's per block), else the largest sample of its blocks; null where neither exists.
   */
  readonly batches: number | null;
  /** The counters the stage charges (STAGE_CHARGES' row and every counter its blocks name), in the counter list's order. */
  readonly charged: readonly string[];
  /** E_WORK_LIMIT hits the summary records at the placeholder coefficients it ran at, or null where it records none. */
  readonly before: number | null;
  readonly blocks: readonly WorkBlock[];
}

/** A summary's shape fault, a unit departing from the table's row, a counter without a row, a coefficient not positive. */
export class FitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FitError';
  }
}

type Json = Record<string, unknown>;

function isObject(v: unknown): v is Json {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function obj(v: unknown, where: string): Json {
  if (!isObject(v)) throw new FitError(`${where}: not an object`);
  return v;
}

function arr(v: unknown, where: string): readonly unknown[] {
  if (!Array.isArray(v)) throw new FitError(`${where}: not an array`);
  return v;
}

function str(v: unknown, where: string): string {
  if (typeof v !== 'string' || v.length === 0) throw new FitError(`${where}: not a name`);
  return v;
}

function count(v: unknown, where: string): number {
  if (typeof v !== 'number' || !Number.isInteger(v) || v < 0) throw new FitError(`${where}: not a count`);
  return v;
}

function quantilesAt(v: unknown, where: string): WorkQuantiles {
  const o = obj(v, where);
  const n = count(o['n'], `${where}/n`);
  const q: number[] = [];
  for (const k of ['p50', 'p99', 'p999', 'max'] as const) {
    const x = o[k];
    if (typeof x !== 'number' || !Number.isFinite(x) || x < 0) throw new FitError(`${where}/${k}: not a finite number ≥ 0`);
    q.push(x);
  }
  const [p50, p99, p999, max] = q;
  if (!(p50 <= p99 && p99 <= p999 && p999 <= max)) throw new FitError(`${where}: the quantiles are not in order (p50 ≤ p99 ≤ p999 ≤ max)`);
  return Object.freeze({ n, p50, p99, p999, max });
}

/** The table's law for a counter a summary names, or a refusal (C-0021: a counter beyond the list needs its row first). */
function lawFor(table: WorkLimitsTable, counter: string, where: string): Readonly<TableWorkLimitLaw> {
  if (!table.has(counter)) {
    throw new FitError(`${where}: counter '${counter}' has no row in workLimits.json — a new row in M0-f-03a's form and an amendment of M0-work.json's counter list come first (C-0021)`);
  }
  return table.law(counter);
}

/** A block's stated unit and log2 form against the table's row (a summary that states none is read as the row's). */
function sameUnit(law: Readonly<TableWorkLimitLaw>, unit: unknown, log2: unknown, where: string): void {
  if (unit !== undefined && unit !== law.unit) throw new FitError(`${where}: unit '${String(unit)}' departs from the row's '${law.unit}'`);
  const rowLog2 = 'log2' in law && law.log2 === true;
  if (log2 !== undefined && log2 !== rowLog2) throw new FitError(`${where}: log2 ${String(log2)} departs from the row's ${String(rowLog2)}`);
}

/** Sorted own keys (one total order; never the engine's enumeration order). */
function keysOf(o: Json): string[] {
  return Object.keys(o).sort();
}

interface Draft {
  readonly at: string;
  readonly stage: string;
  readonly rung: Rung | null;
  readonly before: number | null;
  /** The batch count a summary states for the group, else the largest block sample. */
  readonly batches?: number;
  readonly blocks: WorkBlock[];
}

/** The counter list's order (M0-work.json's), a counter beyond it after, by name. */
function counterOrder(names: Iterable<string>): string[] {
  const set = new Set(names);
  const listed = WORK_LIMIT_COUNTERS.map((c) => c.counter).filter((c) => set.has(c));
  return [...listed, ...[...set].filter((c) => !listed.includes(c)).sort()];
}

/** The counters a stage charges: its STAGE_CHARGES row (refused when it has none) and its blocks' counters. */
function chargedAt(charges: StageCharges, summary: SummaryId, at: string, stage: string, blocks: readonly WorkBlock[]): string[] {
  const row = charges.get(stage);
  if (row === undefined) throw new FitError(`${summary}/${at}: stage '${stage}' has no row in the stage-charge table (STAGE_CHARGES, C-0446) — the table is behind the pipeline`);
  return counterOrder([...row, ...blocks.map((b) => b.counter)]);
}

function group(summary: SummaryId, d: Draft, charged: readonly string[]): StageGroup {
  let batches: number | null = d.batches ?? null;
  for (const b of d.blocks) if (batches === null || b.perUnit.n > batches) batches = b.perUnit.n;
  return Object.freeze({ summary, at: d.at, stage: d.stage, rung: d.rung, batches, charged: Object.freeze([...charged]), before: d.before, blocks: Object.freeze([...d.blocks]) });
}

/**
 * The counters a block object names, the fixed ones dropped before their blocks are read (C-0301 (3)): the fixed row's
 * block is informative only, never a coefficient's input, so it is not even shape-checked.
 */
function countingKeys(table: WorkLimitsTable, work: Json, where: string): string[] {
  return keysOf(work).filter((c) => lawFor(table, c, `${where}/${c}`).unit !== 'fixed');
}

/**
 * M0-c-06: runs[i].work[counter] = { stage, batches, units, unitsTotal, perUnit, limitHits } (C-0091); a row per stage
 * the run drives (C06_RUN_STAGES), its blocks those the run records at the stage (none at S1, S3, S4 today) — a stage
 * without a block records no batch count and no hit count (`batches` and `before` null).
 */
function c06Groups(table: WorkLimitsTable, charges: StageCharges, s: Json): StageGroup[] {
  const out: StageGroup[] = [];
  const runs = arr(s['runs'], 'M0-c-06/runs');
  const timing = obj(s['timing'], 'M0-c-06/timing');
  runs.forEach((r, i) => {
    const run = obj(r, `M0-c-06/runs/${i}`);
    const name = str(run['run'], `M0-c-06/runs/${i}/run`);
    const at = `runs/${i} (${name})`;
    const stages = C06_RUN_STAGES.get(name);
    if (stages === undefined) throw new FitError(`M0-c-06/runs/${i}/run: '${name}' is not a run the stage table knows (C06_RUN_STAGES: ${[...C06_RUN_STAGES.keys()].join(', ')})`);
    // The run's stamps name the stages it ran: each must be one the table gives the run.
    const key = C06_TIMING.get(name) as string;
    if (timing[key] !== null && timing[key] !== undefined) {
      const stamps = obj(timing[key], `M0-c-06/timing/${key}`);
      for (const st of keysOf(stamps)) {
        if (stamps[st] !== null && !stages.includes(st)) throw new FitError(`M0-c-06/timing/${key}/${st}: the ${name} run stamped stage ${st}, which C06_RUN_STAGES does not give it`);
      }
    }
    const work = obj(run['work'], `M0-c-06/runs/${i}/work`);
    const byStage = new Map<string, { batches: number; hits: number; blocks: WorkBlock[] }>();
    for (const c of countingKeys(table, work, `M0-c-06/runs/${i}/work`)) {
      const where = `M0-c-06/runs/${i}/work/${c}`;
      const w = obj(work[c], where);
      sameUnit(lawFor(table, c, where), w['unit'], w['log2'], where);
      const stage = str(w['stage'], `${where}/stage`);
      if (!stages.includes(stage)) throw new FitError(`${where}/stage: the ${name} run records ${c} at ${stage}, which C06_RUN_STAGES does not give it`);
      const g = byStage.get(stage) ?? { batches: 0, hits: 0, blocks: [] };
      g.batches = Math.max(g.batches, count(w['batches'], `${where}/batches`));
      g.hits += count(w['limitHits'], `${where}/limitHits`);
      g.blocks.push(Object.freeze({ summary: 'M0-c-06', at, stage, counter: c, perUnit: quantilesAt(w['perUnit'], `${where}/perUnit`), units: quantilesAt(w['units'], `${where}/units`) }));
      byStage.set(stage, g);
    }
    for (const stage of [...stages].sort()) {
      const g = byStage.get(stage);
      const blocks = g === undefined ? [] : g.blocks;
      const d: Draft = g === undefined ? { at, stage, rung: 'CITY', before: null, blocks } : { at, stage, rung: 'CITY', before: g.hits, batches: g.batches, blocks };
      out.push(group('M0-c-06', d, chargedAt(charges, 'M0-c-06', at, stage, blocks)));
    }
  });
  return out;
}

/**
 * M0-e-06: groups[i].work[counter] = { stage, unit, units, unitsTotal, perUnit }; its stages' outcomes by code
 * (`stages[S]`: ok, refused, notReached) and batches (`batches[S]`: committed, refused). A row per stage that ran (an
 * outcome ok or refused, or a block), its batches the committed and refused ones.
 */
function e06Groups(table: WorkLimitsTable, charges: StageCharges, s: Json): StageGroup[] {
  if (s['size'] !== 'city') throw new FitError(`M0-e-06/size: '${String(s['size'])}' — the spike's work blocks are read at CITY`);
  const out: StageGroup[] = [];
  const groups = arr(s['groups'], 'M0-e-06/groups');
  groups.forEach((gr, i) => {
    const g = obj(gr, `M0-e-06/groups/${i}`);
    const at = `groups/${i} (${str(g['fixture'], `M0-e-06/groups/${i}/fixture`)}/${str(g['config'], `M0-e-06/groups/${i}/config`)})`;
    const work = obj(g['work'], `M0-e-06/groups/${i}/work`);
    const stages = obj(g['stages'], `M0-e-06/groups/${i}/stages`);
    const batchRows = obj(g['batches'], `M0-e-06/groups/${i}/batches`);
    const byStage = new Map<string, WorkBlock[]>();
    for (const c of countingKeys(table, work, `M0-e-06/groups/${i}/work`)) {
      const where = `M0-e-06/groups/${i}/work/${c}`;
      const w = obj(work[c], where);
      sameUnit(lawFor(table, c, where), w['unit'], w['log2'], where);
      const stage = str(w['stage'], `${where}/stage`);
      const list = byStage.get(stage) ?? [];
      list.push(Object.freeze({ summary: 'M0-e-06', at, stage, counter: c, perUnit: quantilesAt(w['perUnit'], `${where}/perUnit`), units: quantilesAt(w['units'], `${where}/units`) }));
      byStage.set(stage, list);
    }
    for (const stage of [...new Set([...keysOf(stages), ...byStage.keys()])].sort()) {
      const sw = `M0-e-06/groups/${i}/stages/${stage}`;
      const st = obj(stages[stage], sw);
      const refused = obj(st['refused'], `${sw}/refused`);
      let outcomes = count(st['ok'], `${sw}/ok`);
      for (const code of keysOf(refused)) outcomes += count(refused[code], `${sw}/refused/${code}`);
      const blocks = byStage.get(stage) ?? [];
      if (outcomes === 0 && blocks.length === 0) continue; // the stage never ran in the group (notReached in every run)
      const bw = `M0-e-06/groups/${i}/batches/${stage}`;
      const b = obj(batchRows[stage], bw);
      const batches = count(b['committed'], `${bw}/committed`) + count(b['refused'], `${bw}/refused`);
      const hits = refused['E_WORK_LIMIT'] === undefined ? 0 : count(refused['E_WORK_LIMIT'], `${sw}/refused/E_WORK_LIMIT`);
      out.push(group('M0-e-06', { at, stage, rung: 'CITY', before: hits, batches, blocks }, chargedAt(charges, 'M0-e-06', at, stage, blocks)));
    }
  });
  return out;
}

/** M0-b-04: work = { stage, fixture, counters: { counter: { unit, log2, districts, units, unitsTotal, perUnit } } }. */
function b04Groups(table: WorkLimitsTable, charges: StageCharges, s: Json): StageGroup[] {
  const work = obj(s['work'], 'M0-b-04/work');
  const fixture = str(work['fixture'], 'M0-b-04/work/fixture');
  if (!fixture.includes('CITY')) throw new FitError(`M0-b-04/work/fixture: '${fixture}' — the spike's work blocks are read at CITY`);
  const stage = str(work['stage'], 'M0-b-04/work/stage');
  const at = `work (${fixture})`;
  const counters = obj(work['counters'], 'M0-b-04/work/counters');
  const blocks: WorkBlock[] = [];
  let batches = 0;
  for (const c of countingKeys(table, counters, 'M0-b-04/work/counters')) {
    const where = `M0-b-04/work/counters/${c}`;
    const w = obj(counters[c], where);
    sameUnit(lawFor(table, c, where), w['unit'], w['log2'], where);
    batches = Math.max(batches, count(w['districts'], `${where}/districts`));
    blocks.push(Object.freeze({ summary: 'M0-b-04', at, stage, counter: c, perUnit: quantilesAt(w['perUnit'], `${where}/perUnit`), units: quantilesAt(w['units'], `${where}/units`) }));
  }
  // The summary records no E_WORK_LIMIT count for this fixture (its batches are the ones that ran: refused ones dropped).
  return blocks.length === 0 ? [] : [group('M0-b-04', { at, stage, rung: 'CITY', before: null, batches, blocks }, chargedAt(charges, 'M0-b-04', at, stage, blocks))];
}

/**
 * M0-k-04: primitives[p].work[counter] = { unit, n, p50, p99, p999, max, units }; primitives[p].workLimitHits. A
 * primitive is no stage: what it charges is what its kernel fuzz recorded (its blocks), a primitive with none no row.
 */
function k04Groups(table: WorkLimitsTable, s: Json): StageGroup[] {
  const out: StageGroup[] = [];
  const prims = obj(s['primitives'], 'M0-k-04/primitives');
  for (const p of keysOf(prims)) {
    const prim = obj(prims[p], `M0-k-04/primitives/${p}`);
    const work = obj(prim['work'], `M0-k-04/primitives/${p}/work`);
    const blocks: WorkBlock[] = [];
    for (const c of countingKeys(table, work, `M0-k-04/primitives/${p}/work`)) {
      const where = `M0-k-04/primitives/${p}/work/${c}`;
      const w = obj(work[c], where);
      sameUnit(lawFor(table, c, where), w['unit'], w['log2'], where);
      blocks.push(Object.freeze({ summary: 'M0-k-04', at: `primitives/${p}`, stage: p, counter: c, perUnit: quantilesAt(w, where), units: null }));
    }
    if (blocks.length > 0) out.push(group('M0-k-04', { at: `primitives/${p}`, stage: p, rung: null, before: count(prim['workLimitHits'], `M0-k-04/primitives/${p}/workLimitHits`), blocks }, counterOrder(blocks.map((b) => b.counter))));
  }
  return out;
}

/**
 * Every stage group of the four summaries, in SUMMARY_IDS order, each summary's groups in its own order: one per stage
 * each summary shows ran, with the counters that stage charges (`charges`, default STAGE_CHARGES).
 */
export function stageGroups(table: WorkLimitsTable, summaries: Readonly<Record<SummaryId, unknown>>, charges: StageCharges = STAGE_CHARGES): StageGroup[] {
  const out: StageGroup[] = [];
  for (const id of SUMMARY_IDS) {
    const s = obj(summaries[id], id);
    if (s['item'] !== id) throw new FitError(`${id}/item: '${String(s['item'])}' — not the ${id} summary`);
    if (id === 'M0-c-06') out.push(...c06Groups(table, charges, s));
    else if (id === 'M0-e-06') out.push(...e06Groups(table, charges, s));
    else if (id === 'M0-b-04') out.push(...b04Groups(table, charges, s));
    else out.push(...k04Groups(table, s));
  }
  return out;
}

/** A block the fit read: where it lies and its sample. */
export interface BlockRef {
  readonly summary: SummaryId;
  readonly at: string;
  readonly stage: string;
  readonly n: number;
  readonly p999: number;
  readonly max: number;
}

/** What the fit did with a row. */
export type FitStatus = 'measured' | 'floored' | 'fixed-skipped' | 'unmeasured';

/** One row's coefficients before and after. */
export interface Coefficients {
  readonly perUnit: number;
  readonly floor: number;
  readonly perUnitProvenance: string;
  readonly floorProvenance: string;
}

/** One counter's fit. */
export interface CounterFit {
  readonly counter: string;
  readonly unit: string;
  readonly log2: boolean;
  readonly status: FitStatus;
  /** The blocks read (none for a fixed or unmeasured row). */
  readonly sources: readonly BlockRef[];
  /** The largest p999 of the blocks (the measured work per unit's 99.9th percentile), or null. */
  readonly p999: number | null;
  /** p999 × 1.5, or null. */
  readonly coefficient: number | null;
  /** The design law that floors the row, where one does (N-61 (6)). */
  readonly law: LawFloor | null;
  readonly before: Coefficients;
  readonly after: Coefficients;
}

/** A counter's share of a stage group's hits at the written coefficients. */
export interface CounterHits {
  readonly counter: string;
  readonly n: number;
  readonly max: number;
  readonly p999: number;
  /** min(perUnit, floor) of the written law: a batch that reaches its limit has work per unit at least this. */
  readonly threshold: number;
  /** At most this many of the block's batches reach the limit (0 when the block's max is below the threshold). */
  readonly bound: number;
}

/** One stage group's F-WORK hit rate: before (recorded at the placeholders) and after (bounded at the measured law). */
export interface HitRateRow {
  readonly summary: SummaryId;
  readonly at: string;
  readonly stage: string;
  readonly rung: Rung | null;
  /** The batches the stage ran, or null where the summary records no count for the stage. */
  readonly batches: number | null;
  /** The batches' unit counts (the fixture size run), per counter, where the summary carries them. */
  readonly sizes: readonly { readonly counter: string; readonly units: WorkQuantiles }[];
  readonly before: number | null;
  /** The counters the stage charges (STAGE_CHARGES and its blocks). */
  readonly charged: readonly string[];
  /** The charged counters with no block of n > 0 at the stage: nothing bounds their hits (C-0446). */
  readonly unbounded: readonly string[];
  /** At most this many batches reach a limit at the written coefficients; null while a charged counter is unbounded. */
  readonly after: number | null;
  /** True when `after` is 0 by every block's max: no batch can reach the limit (never while a counter is unbounded). */
  readonly afterExact: boolean;
  /** after per 1 000 batches; null while a charged counter is unbounded. */
  readonly perThousand: number | null;
  /** The bounded counters: one per block of n > 0. */
  readonly counters: readonly CounterHits[];
}

/** A stage row's charged counters without a block: the blocks a summary's owner must add before the hit rate is known. */
export interface MissingBlocks {
  readonly summary: SummaryId;
  readonly at: string;
  readonly stage: string;
  readonly counters: readonly string[];
}

/** The hit-rate report: a row per stage group, the totals, and the stage spikes' rows in M0-f-03a's FWorkReport shape. */
export interface HitRateReport {
  readonly rows: readonly HitRateRow[];
  /** The batches of every row that records a count. */
  readonly batches: number;
  readonly before: number;
  /** Rows whose summary records no hit count (M0-b-04's work fixture; M0-c-06's stages without a block). */
  readonly beforeUnrecorded: number;
  /** The bounded rows' after, summed (an unbounded row adds nothing: it is listed in `unbounded`, never counted as 0). */
  readonly after: number;
  /** The largest perThousand of a bounded row. */
  readonly worstPerThousand: number;
  /** Every row with an unbounded charged counter, and the counters (C-0446): while one exists the report fails. */
  readonly unbounded: readonly MissingBlocks[];
  /**
   * The worst case at the written coefficients in `fWorkReport`'s shape (§13.2; M0-f-03a's report): the stage spikes'
   * rows (rung CITY, the one size each spike runs read as the band's target; the band's bottom and top are M1's sweep),
   * each group's `after` bound counted as cut batches — an unbounded row's every batch (the worst case it cannot exclude).
   */
  readonly fWork: FWorkReport;
  /** No row unbounded, and every row at or under HIT_RATE_TARGET_PER_THOUSAND. */
  readonly pass: boolean;
}

/** WorkLimitCoefficientReport (the item's interface): what the fit read, what it wrote, and the hit rates. */
export interface WorkLimitCoefficientReport {
  readonly item: 'M0-f-03b';
  /** The provenance the written cells carry: `M0 spike ⟨date⟩` (C-0154 (1)). */
  readonly provenance: string;
  readonly date: string;
  readonly counters: readonly CounterFit[];
  readonly hitRate: HitRateReport;
}

/** The provenance form M0-f-03b writes (C-0021, C-0154 (1)). */
export function spikeProvenance(date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new FitError(`date '${date}' is not YYYY-MM-DD`);
  return `M0 spike ${date}`;
}

function coefficientsOf(table: WorkLimitsTable, counter: string): Coefficients {
  const row = table.table.row(counter);
  const p = row.get('perUnit');
  const f = row.get('floor');
  if (p === undefined || f === undefined) throw new FitError(`workLimits.json row '${counter}' lacks perUnit or floor`);
  return Object.freeze({ perUnit: p.value as number, floor: f.value as number, perUnitProvenance: p.provenance, floorProvenance: f.provenance });
}

/** The fit of every row of `table` from the stage groups (rows in the table's key order). */
export function fitCounters(table: WorkLimitsTable, groups: readonly StageGroup[], date: string): CounterFit[] {
  const provenance = spikeProvenance(date);
  const blocks = new Map<string, WorkBlock[]>();
  for (const g of groups) {
    for (const b of g.blocks) {
      const list = blocks.get(b.counter) ?? [];
      list.push(b);
      blocks.set(b.counter, list);
    }
  }
  const out: CounterFit[] = [];
  for (const law of table.laws) {
    const before = coefficientsOf(table, law.counter);
    const log2 = 'log2' in law && law.log2 === true;
    const base = { counter: law.counter, unit: law.unit, log2, before };
    if (law.unit === 'fixed') {
      out.push(Object.freeze({ ...base, status: 'fixed-skipped', sources: [], p999: null, coefficient: null, law: null, after: before }));
      continue;
    }
    const read = (blocks.get(law.counter) ?? []).filter((b) => b.perUnit.n > 0);
    if (read.length === 0) {
      out.push(Object.freeze({ ...base, status: 'unmeasured', sources: [], p999: null, coefficient: null, law: null, after: before }));
      continue;
    }
    let p999 = 0;
    for (const b of read) if (b.perUnit.p999 > p999) p999 = b.perUnit.p999;
    const coefficient = p999 * P999_FACTOR;
    if (!(Number.isFinite(coefficient) && coefficient > 0)) {
      throw new FitError(`${law.counter}: the measured coefficient ${String(coefficient)} is not a positive finite number — a zero limit would refuse every batch that charges the counter`);
    }
    const floorLaw = LAW_FLOORS.get(law.counter) ?? null;
    const perUnit = floorLaw === null ? coefficient : Math.max(coefficient, floorLaw.perUnit);
    const floor = floorLaw === null ? coefficient : Math.max(coefficient, floorLaw.floor);
    const floored = floorLaw !== null && (perUnit !== coefficient || floor !== coefficient);
    const sources = read.map((b) => Object.freeze({ summary: b.summary, at: b.at, stage: b.stage, n: b.perUnit.n, p999: b.perUnit.p999, max: b.perUnit.max }));
    out.push(
      Object.freeze({
        ...base,
        status: floored ? 'floored' : 'measured',
        sources: Object.freeze(sources),
        p999,
        coefficient,
        law: floorLaw,
        after: Object.freeze({ perUnit, floor, perUnitProvenance: provenance, floorProvenance: provenance }),
      }),
    );
  }
  return out;
}

/**
 * At most how many of a block's batches reach a law whose threshold is `t` (min(perUnit, floor)): a batch of work w over
 * u units reaches floor + perUnit × u only with w / max(1, u) ≥ t, so none when the block's max is below t; else at most
 * the batches above the block's p999 — ⌈n / 1 000⌉ under both the type-7 (M0-c-06, M0-e-06, M0-b-04) and the
 * nearest-rank (M0-k-04) definitions — when t is above p999, and every batch otherwise.
 */
export function hitBound(q: WorkQuantiles, t: number): number {
  if (q.n === 0 || q.max < t) return 0;
  if (t > q.p999) return Math.ceil(q.n / 1000);
  return q.n;
}

/** The F-WORK hit-rate report at the fitted coefficients. */
export function hitRates(groups: readonly StageGroup[], fits: readonly CounterFit[]): HitRateReport {
  const byCounter = new Map<string, CounterFit>();
  for (const f of fits) byCounter.set(f.counter, f);
  const rows: HitRateRow[] = [];
  const missing: MissingBlocks[] = [];
  const batches: FWorkBatch[] = [];
  let total = 0;
  let before = 0;
  let unrecorded = 0;
  let after = 0;
  let worst = 0;
  for (const g of groups) {
    const counters: CounterHits[] = [];
    let bound = 0;
    let exact = true;
    const measured = new Set<string>();
    for (const b of g.blocks) {
      if (b.perUnit.n === 0) continue; // no sample: the counter is not measured here
      const f = byCounter.get(b.counter);
      if (f === undefined) throw new FitError(`${g.summary}/${b.at}: counter '${b.counter}' has no fit`);
      measured.add(b.counter);
      const threshold = Math.min(f.after.perUnit, f.after.floor);
      const k = hitBound(b.perUnit, threshold);
      if (b.perUnit.max >= threshold) exact = false;
      bound += k;
      counters.push(Object.freeze({ counter: b.counter, n: b.perUnit.n, max: b.perUnit.max, p999: b.perUnit.p999, threshold, bound: k }));
    }
    const unbounded = g.charged.filter((c) => !measured.has(c));
    const open = unbounded.length > 0;
    const cut = open ? null : Math.min(g.batches ?? 0, bound);
    const perThousand = cut === null ? null : g.batches === null || g.batches === 0 ? 0 : (1000 * cut) / g.batches;
    const sizes = g.blocks.filter((b) => b.units !== null).map((b) => Object.freeze({ counter: b.counter, units: b.units as WorkQuantiles }));
    rows.push(
      Object.freeze({
        summary: g.summary,
        at: g.at,
        stage: g.stage,
        rung: g.rung,
        batches: g.batches,
        sizes: Object.freeze(sizes),
        before: g.before,
        charged: g.charged,
        unbounded: Object.freeze(unbounded),
        after: cut,
        afterExact: exact && !open,
        perThousand,
        counters: Object.freeze(counters),
      }),
    );
    if (open) missing.push(Object.freeze({ summary: g.summary, at: g.at, stage: g.stage, counters: Object.freeze(unbounded) }));
    if (g.batches !== null) total += g.batches;
    if (g.before === null) unrecorded += 1;
    else before += g.before;
    if (cut !== null) after += cut;
    if (perThousand !== null && perThousand > worst) worst = perThousand;
    if (g.rung !== null && g.batches !== null) {
      let left = cut ?? g.batches;
      if (cut === null) {
        for (let i = 0; i < g.batches; i += 1) batches.push({ stage: g.stage, rung: g.rung, position: 'target', cut: unbounded[0] });
        left = 0;
      }
      for (const c of counters) {
        const k = Math.min(left, c.bound);
        for (let i = 0; i < k; i += 1) batches.push({ stage: g.stage, rung: g.rung, position: 'target', cut: c.counter });
        left -= k;
      }
      if (cut !== null) for (let i = cut; i < g.batches; i += 1) batches.push({ stage: g.stage, rung: g.rung, position: 'target', cut: null });
    }
  }
  return Object.freeze({
    rows: Object.freeze(rows),
    batches: total,
    before,
    beforeUnrecorded: unrecorded,
    after,
    worstPerThousand: worst,
    unbounded: Object.freeze(missing),
    fWork: fWorkReport(batches),
    pass: missing.length === 0 && rows.every((r) => r.perThousand !== null && r.perThousand <= HIT_RATE_TARGET_PER_THOUSAND),
  });
}

/**
 * The whole fit: the four parsed summaries and the table in force → WorkLimitCoefficientReport. `charges` is the
 * stage-charge table the hit-rate report holds the stages to (default STAGE_CHARGES; a test may narrow it).
 */
export function fitWorkLimits(table: WorkLimitsTable, summaries: Readonly<Record<SummaryId, unknown>>, date: string, charges: StageCharges = STAGE_CHARGES): WorkLimitCoefficientReport {
  const groups = stageGroups(table, summaries, charges);
  const counters = fitCounters(table, groups, date);
  return Object.freeze({ item: 'M0-f-03b', provenance: spikeProvenance(date), date, counters: Object.freeze(counters), hitRate: hitRates(groups, counters) });
}
