// EP-01 on every M0 stage × the five degenerate kinds (M0-x-06; §4.13 EP-01: "every stage — zero-length, zero-area,
// self-touching, collinear or coincident geometry — refused by the kernel; the stage's failure class (§4.1) — repair
// locally → retry that piece → simpler shape → leave out and report"; §4.1's transactions table; §5.1 (9); C-0100;
// C-0273 (3)–(6)). Forty-five fixtures `EP-01/<stage>/<kind>`, each the smallest state that reaches its stage:
//   S1, S3, S4, S5a, S5b, S5c, S5d — the base's registered stages through the runner (./chain.ts) on a small frame, the
//     stage's own chain planted with the kind on its way into the kernel (./plant.ts): S1 the river's shore (its water
//     batch), S3 stage 1's trace (the slice's commit), S4 an arterial's spine, S5a stage 2's trace, S5b a main road, S5c
//     a growing street's step, S5d the top-up rim's street step (a demand the stage's land cannot meet makes S5d top up);
//   S6 — the boundary S6 offsets its perimeter from (S5's last boundary with land) made the kind (./kinds.ts's
//     `degenerateRing`): S6 commits through the kernel's free functions, so its input carries the kind;
//   S8 — M0-b-03's Stage on a two-district arena whose west district's faces carry the kind (./s8.ts).
// Each run is judged on: the plant fired (the precondition), no restart, the arena valid after the stage (the kernel's
// whole-arena sweep), and how the stage handled it — absorbed by §3.11's rule, laddered with the rung its record names,
// left out and reported, or (pinned per cell, C-0273 (6)) refused safe: typed, one bugs entry, and rolled back — held on
// the plant's batch log: the planted batch refused and no batch of the stage committed after it (C-0278 (1)); a refusal
// after a commit is `refused-residue`, a pass only where pinned as a known issue. A run's state is the fixture's first
// that stands (./standing.ts, C-0278 (2)): the plant fired, the stages before the home unrefused, and — when the home
// refuses — the same state run unplanted not refused by the home too (else the refusal is the state's, not the kind's).
import { simpleCcw, type S5cRecord, type S6Output, type S8Output, type StreetGrowOptions } from '@plat/layout';
import { loadTable, type WorkLimitsTable } from '@plat/tables';
import type { S1Output } from '@plat/site';
import { s8Stage } from '@plat/layout';
import { edgeChain, MID_FLAT, SMALL_FLAT, SMALL_RIVER, type ChainOptions, type ChainRun, type ChainStage, type S5Sub } from './chain.js';
import { DEGENERATE_KINDS, degenerateRing, type DegenerateKind } from './kinds.js';
import { arenaProblems, bugsOf, chainCheck } from './observe.js';
import type { PlantCall } from './plant.js';
import { s8KindProblem, s8State } from './s8.js';
import { firstStanding, type Attempt } from './standing.js';
import { outcome, type EdgeFixture, type EdgeHandling, type EdgeOutcome } from './types.js';

/** EP-01's stages (§4.1's transactions table, the M0 set: S1's L0 batch, the S3 slice's commits, S4, S5a – S5d, S6, S8). */
export type Ep01Stage = 'S1' | 'S3' | 'S4' | 'S5a' | 'S5b' | 'S5c' | 'S5d' | 'S6' | 'S8';
export const EP01_STAGES: readonly Ep01Stage[] = Object.freeze(['S1', 'S3', 'S4', 'S5a', 'S5b', 'S5c', 'S5d', 'S6', 'S8']);

/** Each stage's failure class (§4.1's transactions table; §5.2). */
export const EP01_CLASS: Readonly<Record<Ep01Stage, string>> = Object.freeze({
  S1: 'F-RIVER (F-OUTLINE, F-CONTOUR, F-SKELETON)',
  S3: 'F-WALL (F-SITE, F-ROUTE, F-CASTLE, F-RIVER)',
  S4: 'F-ROUTE',
  S5a: 'F-WALL',
  S5b: 'F-ROUTE',
  S5c: 'F-NUM (optional chains), F-WORK',
  S5d: 'F-BUDGET-STAGE',
  S6: 'a degenerate district face merges (§4.5); F-ROUTE',
  S8: 'F-CUT',
});

/** The bands' count (the demand S5d's cell hands it has one entry per band). */
function bandCount(): number {
  return loadTable('bands').strs('settings', 'order').length;
}

/** A plant site per chain stage: the stage the runner registers, the sub-stage and k, the call, the frame, the stop. */
interface PlantSite {
  readonly stage: ChainStage;
  readonly sub?: S5Sub;
  readonly k?: number;
  readonly select: (c: PlantCall) => boolean;
  readonly opts: () => Omit<ChainOptions, 'plant'>;
  readonly what: string;
}

const SITES: Readonly<Record<Exclude<Ep01Stage, 'S6' | 'S8'>, PlantSite>> = {
  S1: { stage: 'S1', select: (c) => c.role === 'shore', opts: () => ({ blueprint: SMALL_RIVER, upTo: 'S1' }), what: "the river's shore in S1's water batch (L0)" },
  S3: { stage: 'S3', select: (c) => c.role === 'wall', opts: () => ({ blueprint: SMALL_FLAT, upTo: 'S3' }), what: "stage 1's trace in the slice's commits (L1)" },
  S4: { stage: 'S4', select: (c) => c.role === 'way', opts: () => ({ blueprint: SMALL_FLAT, upTo: 'S4' }), what: "an arterial's spine in S4's batch (L1)" },
  S5a: { stage: 'S5', sub: 'S5a', k: 2, select: (c) => c.role === 'wall', opts: () => ({ blueprint: SMALL_FLAT, upTo: 'S5', s5: { stopAfter: { sub: 'S5a', k: 2 } } }), what: "stage 2's trace in S5a's batch (L1)" },
  S5b: { stage: 'S5', sub: 'S5b', k: 2, select: (c) => c.role === 'way', opts: () => ({ blueprint: MID_FLAT, upTo: 'S5', s5: { stopAfter: { sub: 'S5b', k: 2 } } }), what: "a main road in S5b's batch at stage 2 (L1)" },
  S5c: { stage: 'S5', sub: 'S5c', k: 1, select: (c) => c.cls === 'optional', opts: () => ({ blueprint: MID_FLAT, upTo: 'S5', s5: { stopAfter: { sub: 'S5c', k: 1 } } }), what: "a growing street's step in S5c's batch at stage 1 (L1, optional)" },
  S5d: {
    stage: 'S5',
    sub: 'S5d',
    k: 3,
    select: (c) => c.cls === 'optional',
    opts: () => ({ blueprint: MID_FLAT, upTo: 'S5', s5: { stopAfter: { sub: 'S5d', k: 3 }, grow: { demand: { bandsCm2: new Array<number>(bandCount()).fill(2e11) } } as never } }),
    what: "a street step of S5d's top-up rim at stage 3 (L1, optional; a demand above the stage's land makes it top up)",
  },
};

/** The kernel's answer to the planted chain. */
function kernelAnswer(run: ChainRun): string | undefined {
  const i = run.plant.insert;
  if (i === null) return undefined;
  return i.ok ? `ok${i.warnings.length > 0 ? ` ${i.warnings.join(',')}` : ''}` : (i.code ?? 'refused');
}

/** S5c's or S5d's growth record the plant fired in. */
function growthRecordOf(stage: 'S5c' | 'S5d', run: ChainRun): S5cRecord | null {
  if (stage === 'S5c') return run.s5.growth[run.s5.growth.length - 1] ?? null;
  return run.s5.capacity[run.s5.capacity.length - 1]?.rim ?? null;
}

/**
 * How a stage's refusal ended (C-0278 (1); §5.1 (8)): `refused-safe` only when the planted batch was refused and no
 * batch of the stage committed after the plant fired; `refused-residue` when the planted batch, or a later batch of the
 * stage, committed before the refusal (the planted geometry stays, with no record); off when no planted batch was
 * logged. Exported for its unit tests.
 */
export function refusalHandling(run: ChainRun, code: string, bugs: number): { handling: EdgeHandling; rung: string; facts: Record<string, number | string | boolean> } {
  const b = run.plant.batch;
  const later = run.plant.after.filter((a) => a.committed).length;
  const facts = { bugs, batchCommitted: b === null ? 'none' : b.committed, laterCommitted: later };
  if (b === null) return { handling: 'off', rung: `${code}: the stage refused, and no planted batch was logged`, facts };
  if (!b.committed && later === 0) return { handling: 'refused-safe', rung: code, facts };
  return { handling: 'refused-residue', rung: code, facts };
}

/** How a chain stage handled its plant (see the header); exported for its unit tests. */
export function chainHandling(stage: Exclude<Ep01Stage, 'S6' | 'S8'>, run: ChainRun): { handling: EdgeHandling; rung: string; facts: Record<string, number | string | boolean> } {
  const name = SITES[stage].stage;
  const bugs = bugsOf(run.report, name);
  if (bugs.length > 0) return refusalHandling(run, bugs[0].cls, bugs.length);
  const batch = run.plant.batch;
  const refused = batch !== null && !batch.committed;
  const insertRefused = run.plant.insert !== null && !run.plant.insert.ok;
  switch (stage) {
    case 'S1': {
      const s1 = run.model.data.get('s1') as S1Output | undefined;
      if (s1 === undefined) return { handling: 'off', rung: 'S1 wrote no record', facts: {} };
      if (refused && s1.report.retried) return { handling: 'laddered', rung: "S1: the water batch re-run on the kernel's polygons (report.retried)", facts: { retried: true } };
      const dropped = s1.report.dropped.filter((d) => d.reason === 'refused');
      if (refused && dropped.length > 0) return { handling: 'left-out', rung: `S1: ${dropped.map((d) => d.id).join(', ')} left out, reported refused`, facts: { dropped: dropped.length } };
      if (!refused) return { handling: 'absorbed', rung: 'S1: the water batch committed', facts: { bodies: s1.water.bodies.length } };
      return { handling: 'off', rung: 'S1: its water batch was refused and its record names no rung', facts: {} };
    }
    case 'S4': {
      const s4 = run.model.data.get('s4') as { report: { unsmoothed: number; stretchShared: number }; graph: { chains: unknown[] } } | undefined;
      if (s4 === undefined) return { handling: 'off', rung: 'S4 wrote no record', facts: {} };
      if (refused && s4.report.unsmoothed === s4.graph.chains.length) return { handling: 'laddered', rung: 'S4: the batch re-run on every chain\'s lattice course (report.unsmoothed = every chain)', facts: { unsmoothed: s4.report.unsmoothed } };
      if (!refused) return { handling: 'absorbed', rung: `S4: the spines' batch committed (stretchShared ${String(s4.report.stretchShared)})`, facts: { stretchShared: s4.report.stretchShared } };
      return { handling: 'off', rung: 'S4: its batch was refused and its report names no rung', facts: {} };
    }
    case 'S5c':
    case 'S5d': {
      const rec = growthRecordOf(stage, run);
      if (rec === null) return { handling: 'off', rung: `${stage} wrote no growth record`, facts: {} };
      const fnum = rec.rungs.filter((r) => r.cause === 'F-NUM');
      const whole = (rec as S5cRecord & { batchRefused?: { code: string } }).batchRefused;
      if (whole !== undefined) return { handling: 'left-out', rung: `${stage}: the growth batch left out, reported batchRefused ${whole.code}`, facts: { batchRefused: whole.code } };
      if (insertRefused && fnum.length > 0) return { handling: 'laddered', rung: `${stage}: F-NUM ${fnum.map((r) => r.rung).join(' → ')}`, facts: { fnum: fnum.length } };
      if (!refused && !insertRefused) return { handling: 'absorbed', rung: `${stage}: the step committed`, facts: { streets: rec.streets.length } };
      return { handling: 'off', rung: `${stage}: the plant was refused and the record names no rung`, facts: {} };
    }
    default:
      if (!refused) return { handling: 'absorbed', rung: `${stage}: the batch committed`, facts: {} };
      return { handling: 'off', rung: `${stage}: its batch was refused and no rung or refusal names it`, facts: {} };
  }
}

/** A cell run's extra: S5c's and S5d's growth options in place of the cell's (F-WORK's class cell lowers a work law). */
export interface Ep01Extra {
  readonly grow?: StreetGrowOptions;
  /** S8's work-limit table in place of the shipped one (F-WORK's class cell lowers cut.kernelCalls). */
  readonly s8WorkLimits?: WorkLimitsTable;
  /** S8's land scale (F-WORK's cell doubles it, so every seed's faces need cuts). */
  readonly s8Scale?: number;
}

/** One chain-stage cell's attempt on one state (./standing.ts): its outcome and its unmet preparation. */
function chainCellAttempt(stage: Exclude<Ep01Stage, 'S6' | 'S8'>, kind: DegenerateKind, seed: number, extra: Ep01Extra = {}): Attempt {
  const site = SITES[stage];
  const base = site.opts();
  const o: Omit<ChainOptions, 'plant'> = extra.grow === undefined ? base : { ...base, s5: { ...base.s5, grow: { ...(base.s5?.grow ?? {}), ...extra.grow } } };
  const plantAt = (select: (c: PlantCall) => boolean): ChainOptions['plant'] => ({ stage: site.stage, ...(site.sub === undefined ? {} : { sub: site.sub }), ...(site.k === undefined ? {} : { k: site.k }), plant: { kind, select } });
  const run = edgeChain(seed, { ...o, plant: plantAt(site.select) });
  const c = chainCheck(run, o.upTo, site.stage);
  const unmet = [...c.unmet];
  if (run.plant.fired === null) unmet.push(`the plant never fired: ${site.what} was not met`);
  const h = chainHandling(stage, run);
  if (unmet.length === 0 && bugsOf(run.report, site.stage).length > 0) {
    // the unplanted control: the same state, the same façade, a plant that never fires
    const control = edgeChain(seed, { ...o, plant: plantAt(() => false) });
    const cb = bugsOf(control.report, site.stage);
    if (cb.length > 0) unmet.push(`the home stage refuses this state unplanted: ${site.stage} ${cb[0].cls} (${control.refusals.get(site.stage)?.detail.slice(0, 120) ?? ''})`);
  }
  const rec = stage === 'S5c' || stage === 'S5d' ? growthRecordOf(stage, run) : null;
  const workCut = rec?.rungs.find((r) => r.cause === 'F-WORK');
  const facts = { ...h.facts, ...(run.plant.batch === null ? {} : { batchCommitted: run.plant.batch.committed }), ...(workCut === undefined ? {} : { workCut: `${workCut.rung} ${workCut.counter} ${String(workCut.count)}/${String(workCut.limit)}` }) };
  return { outcome: outcome(h.handling, h.rung, c.problems, facts, kernelAnswer(run)), unmet };
}

/** EP-01's run of one (stage, kind) cell at `seed` (the class cells of ./classes.ts run the same cells). */
export function runEp01(stage: Ep01Stage, kind: DegenerateKind, seed: number, extra: Ep01Extra = {}): EdgeOutcome {
  if (stage === 'S8') return runS8Cell(kind, seed, extra);
  return firstStanding(seed, (s) => (stage === 'S6' ? s6Attempt(kind, s) : chainCellAttempt(stage, kind, s, extra)));
}

/** A cell's pinned refusal codes (C-0273 (6)), or undefined where the stage's ladder takes every seed. */
export function ep01Pinned(stage: Ep01Stage, kind: DegenerateKind): readonly string[] | undefined {
  return PINNED[stage]?.[kind];
}

/**
 * S6's cell on one state: S5's last boundary with land made the kind before S6 offsets its perimeter from it. S6's
 * batches are logged through a façade whose plant never fires (its run otherwise S6's own), so a refusal is judged on
 * them: refused-safe when none committed, refused-residue otherwise (C-0278 (1)).
 */
function s6Attempt(kind: DegenerateKind, seed: number): Attempt {
  let degraded = 0;
  const run = edgeChain(seed, {
    blueprint: SMALL_FLAT,
    upTo: 'S6',
    plant: { stage: 'S6', plant: { kind, select: () => false } },
    s5: {
      after: (state) => {
        const b = state.stages[state.lastWithLand - 1]?.boundary;
        if (b === null || b === undefined) return;
        const before = b.set.outline.length;
        (b.set as { outline: unknown }).outline = degenerateRing(b.set.outline, kind);
        degraded = b.set.outline.length - before;
      },
    },
  });
  const c = chainCheck(run, 'S6', 'S6');
  const problems = [...c.problems];
  const unmet = [...c.unmet];
  // every kind adds vertices to the ring (zero-length one, coincident the ring again): none added, the kind was not laid
  if (degraded === 0) unmet.push('the boundary was not made degenerate (no stage with land, or no edge to carry the kind)');
  const bugs = bugsOf(run.report, 'S6');
  if (bugs.length > 0) {
    if (unmet.length === 0) {
      const control = edgeChain(seed, { blueprint: SMALL_FLAT, upTo: 'S6' });
      const cb = bugsOf(control.report, 'S6');
      if (cb.length > 0) unmet.push(`the home stage refuses this state unplanted: S6 ${cb[0].cls} (${control.refusals.get('S6')?.detail.slice(0, 120) ?? ''})`);
    }
    const committed = run.plant.batches.filter((b) => b.committed).length;
    return { outcome: outcome(committed === 0 ? 'refused-safe' : 'refused-residue', bugs[0].cls, problems, { bugs: bugs.length, s6Batches: run.plant.batches.length, s6Committed: committed }), unmet };
  }
  if (unmet.length > 0) return { outcome: outcome('absorbed', 'S6: (the state did not stand)', problems), unmet };
  const s6 = run.model.data.get('s6') as S6Output | undefined;
  if (s6 === undefined) return { outcome: outcome('off', 'S6 wrote no record', problems), unmet };
  if (!simpleCcw(s6.perimeter)) problems.push('the perimeter S6 committed is not a simple counter-clockwise ring');
  if (s6.report.unowned !== 0) problems.push(`${String(s6.report.unowned)} coarse faces inside the perimeter hold no district`);
  if (s6.districts.length === 0) problems.push('S6 made no district');
  return { outcome: outcome('absorbed', 'S6: the perimeter offset from the degenerate boundary is a simple ring', problems, { districts: s6.districts.length, merges: s6.report.merges, perimeter: s6.perimeter.length }), unmet };
}

/** S8's cell: M0-b-03's Stage on the two-district arena whose west district carries the kind. */
function runS8Cell(kind: DegenerateKind, seed: number, extra: Ep01Extra = {}): EdgeOutcome {
  const st = s8State(seed, kind, extra.s8Scale === undefined ? {} : { scale: extra.s8Scale });
  // the precondition, read before S8 runs (C-0278 (3)): the kind stands in the west district's faces S8 receives
  const reached = s8KindProblem(st, kind);
  const stage = s8Stage(extra.s8WorkLimits === undefined ? {} : { workLimits: extra.s8WorkLimits });
  const input = extra.s8WorkLimits === undefined ? st.input : { ...st.input, tables: { ...st.input.tables, workLimits: extra.s8WorkLimits } };
  const r = stage.run(stage.inputsOf(input, { kind: 'all' }), { report: undefined } as never);
  const problems = [...(reached === null ? [] : [`the kind never reached S8's faces: ${reached}`]), ...arenaProblems(st.plat)];
  if (!r.ok) return outcome('refused-safe', r.code, problems, {});
  const v = r.value as S8Output;
  const report = v.infill.report;
  if (report.districts.length + report.refused.length !== 2) problems.push(`S8 reported ${String(report.districts.length + report.refused.length)} of its 2 districts`);
  if (report.refused.length > 0) return outcome('refused-safe', report.refused[0].code, problems, { refused: report.refused.length });
  let refusedRungs = 0;
  const names = new Set<string>();
  for (const d of report.districts) {
    for (const u of d.rungs) {
      if (u.outcome === 'refused' || u.outcome === 'none') {
        refusedRungs += 1;
        names.add(`${u.rung}:${u.outcome}${u.why === undefined ? '' : `:${u.why}`}`);
      }
    }
    for (const f of d.faces) if (f.outcome === 'unresolved') problems.push(`face ${f.face} of ${d.district} is unresolved`);
  }
  if (v.blocks.length === 0) problems.push('S8 made no block');
  const cuts = report.districts.flatMap((d) => d.workCut);
  const workCut: Record<string, string> = cuts.length === 0 ? {} : { workCut: `work_cut ${cuts[0].counter} ${String(cuts[0].count)}/${String(cuts[0].limit)}` };
  if (refusedRungs > 0) return outcome('laddered', `S8: ${[...names].sort().join(', ')}`, problems, { blocks: v.blocks.length, refusedRungs, ...workCut });
  return outcome('absorbed', 'S8: every face cut or stopped on its first rung', problems, { blocks: v.blocks.length, ...workCut });
}

/**
 * The cells' pinned refusals (C-0273 (6), C-0278 (1), (4)): the stage refuses safe — typed, rolled back — where its ladder
 * has no rung for the kind at M0 (a known shortfall for the hardening pass).
 */
const PINNED: Readonly<Partial<Record<Ep01Stage, Partial<Record<DegenerateKind, readonly string[]>>>>> = {
  // S1 self-touching: on ~3 % of seeds the planted shore's insert is ok, the water batch is refused at its end and S1
  // refuses whole without its retry (rolled back) — measured at 1 000 seeds, C-0278 (4)
  S1: { 'zero-length': ['E_DEGENERATE'], 'self-touching': ['E_INVARIANT'] },
  S3: { 'zero-length': ['E_DEGENERATE'], 'self-touching': ['E_INVARIANT'] },
  // S5a coincident: ~0.5 % of seeds, rolled back (C-0278 (4))
  S5a: { 'zero-length': ['E_DEGENERATE'], 'self-touching': ['E_INVARIANT'], coincident: ['E_INVARIANT'] },
  S5b: { 'zero-length': ['E_DEGENERATE'], 'self-touching': ['E_INVARIANT'] },
  // S6 self-touching, collinear, coincident: S6 refuses the degenerate boundary before its batch on < 1 % of seeds
  // (nothing committed; the same state unplanted stands) — C-0278 (4)
  S6: { 'zero-area': ['E_INVARIANT'], 'self-touching': ['E_INVARIANT'], collinear: ['E_INVARIANT'], coincident: ['E_INVARIANT'] },
};

/**
 * The cells pinned as refused after commit (C-0278 (1)): the kernel takes the planted kind by §3.11's rule (one shared
 * stretch; its batch commits), then the stage refuses at its own later check — typed, one bugs entry — and the planted
 * geometry stays committed with no record. Not §5.1 (8)'s rolled-back state: a known issue routed to the stage's owner
 * (S1 M0-e-03; S3 and S5a's trace M0-c-01 / M0-c-02). Pinned alone, so the cell fails if the outcome changes.
 */
const RESIDUE: Readonly<Partial<Record<Ep01Stage, Partial<Record<DegenerateKind, readonly string[]>>>>> = {
  S1: { 'zero-area': ['E_INVARIANT'], collinear: ['E_INVARIANT'] },
  S3: { 'zero-area': ['E_INVARIANT'], collinear: ['E_INVARIANT'] },
  S5a: { 'zero-area': ['E_INVARIANT'], collinear: ['E_INVARIANT'] },
};

/** A cell's pinned residue codes (C-0278 (1)), or undefined. */
export function ep01Residue(stage: Ep01Stage, kind: DegenerateKind): readonly string[] | undefined {
  return RESIDUE[stage]?.[kind];
}

/** The owners a residue is routed to (C-0278 (1)). */
const RESIDUE_OWNER: Readonly<Partial<Record<Ep01Stage, string>>> = { S1: 'M0-e-03', S3: 'M0-c-01 / M0-c-02', S5a: 'M0-c-01 / M0-c-02' };

/** The known-issue line a pinned cell is listed under (C-0273 (6), C-0278 (1); the hardening pass's). */
export function ep01Known(stage: Ep01Stage, kind: DegenerateKind): string | null {
  const residue = RESIDUE[stage]?.[kind];
  if (residue !== undefined) return `KI EP-01/${stage}/${kind}: the kernel takes the planted ${kind} by §3.11's rule and its batch commits, then ${stage} refuses at its own later check (${residue.join(' | ')}) — the planted geometry stays committed with no record, not §5.1 (8)'s rolled-back state; a fail-safety question routed to ${RESIDUE_OWNER[stage] ?? stage}'s owner`;
  const codes = PINNED[stage]?.[kind];
  return codes === undefined ? null : `KI EP-01/${stage}/${kind}: the stage refuses the planted ${kind} whole (${codes.join(' | ')}), rolled back — no rung of ${EP01_CLASS[stage]} takes it at M0; fail-safe (N-45), for the hardening pass`;
}

/** The EP-01 fixtures: every stage × every kind (45). */
export function ep01Fixtures(): EdgeFixture[] {
  const out: EdgeFixture[] = [];
  for (const stage of EP01_STAGES) {
    for (const kind of DEGENERATE_KINDS) {
      const pinned = PINNED[stage]?.[kind];
      const residue = RESIDUE[stage]?.[kind];
      const known = ep01Known(stage, kind);
      out.push({
        id: `EP-01/${stage}/${kind}`,
        home: `§4.13 EP-01; §4.1's transactions table (${stage}: ${EP01_CLASS[stage]}); §5.1 (9); §3.11 degenerate geometry`,
        run: (seed) => runEp01(stage, kind, seed),
        expect: {
          outcome: `${kind} geometry at ${stage}: refused by the kernel (or taken by §3.11's rule) and handled by ${EP01_CLASS[stage]} — repair locally → retry that piece → simpler shape → leave out and report; never a crash, hang, invalid output or whole-map retry`,
          allowed: residue !== undefined ? ['refused-residue'] : pinned === undefined ? ['absorbed', 'laddered', 'left-out'] : ['absorbed', 'laddered', 'left-out', 'refused-safe'],
          ...(pinned === undefined || known === null ? {} : { refusal: { codes: pinned, known } }),
          ...(residue === undefined || known === null ? {} : { residue: { codes: residue, known } }),
        },
      });
    }
  }
  return out;
}
