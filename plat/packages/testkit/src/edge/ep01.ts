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
// left out and reported, or refused: typed, one bugs entry, and the arena bit-identical to the stage's start (the runner
// rolls a refused stage back whole, M0-x-02 s1, N-55 (6); C-0342 (1) retires C-0278 (1)'s `refused-residue`). A refusal
// of an UNLAWFUL plant is `refused-safe`, a pass only where the cell pins its code (C-0273 (6), C-0278 (4), C-0342 (4));
// a refusal of a LAWFUL input (J264) is `refused-lawful`, a finding for the session named by its seed (C-0342 (3)). A
// plant is lawful when what reaches the stage is lawful geometry: the coincident kind the kernel took (the chain where
// it already stands — one shared stretch, §3.11; Q22, Q37) and S6's ring with exactly collinear vertices (N-56 (2)).
// A run's state is the fixture's first that stands (./standing.ts, C-0278 (2)): the plant fired, the stages before the
// home unrefused, and — when the home refuses — the same state run unplanted not refused by the home too (else the
// refusal is the state's, not the kind's); every lawful-input refusal met on the way is carried in the outcome
// (J264's census, C-0342 (2)).
import { simpleCcw, type S5cRecord, type S6Output, type S8Output, type StreetGrowOptions } from '@plat/layout';
import { loadTable, type WorkLimitsTable } from '@plat/tables';
import type { S1Output } from '@plat/site';
import { s8Stage } from '@plat/layout';
import { restoreSavepoint, takeSavepoint, type KernelResult } from '@plat/kernel';
import { arenaDigest } from '../determinism/print.js';
import { edgeChain, MID_FLAT, restored, SMALL_FLAT, SMALL_RIVER, type ChainOptions, type ChainRun, type ChainStage, type S5Sub } from './chain.js';
import { DEGENERATE_KINDS, degenerateRing, kindLaidProblem, type DegenerateKind } from './kinds.js';
import { arenaProblems, bugsOf, chainCheck, refusalDetail } from './observe.js';
import type { PlantCall } from './plant.js';
import { s8KindProblem, s8State, type S8State } from './s8.js';
import { firstStanding, type Attempt, type AttemptRefusal } from './standing.js';
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
 * Is the plant LAWFUL input for the stage (C-0342 (3); J264)? Lawful when the geometry the stage meets is its own
 * entity's, unchanged as a point set: the coincident chain the kernel took where it already stands (one shared stretch by
 * §3.11's rule — Q22, Q37: "a lawful plant must commit"), S6's boundary carrying exactly collinear vertices or one vertex
 * given twice (the same ring; N-56 (2)), S8's arterial carrying an extra vertex on its own line (zero-length, decimated
 * by §3.11's rule) or a way given again over the ring road (coincident). Every other kind changes the entity — a chain
 * collapsed to a point, a ring of no area, a bow-tie or a loop, a fold back over itself, a ring given twice round — the
 * degenerate input §5.1 (9) has the kernel refuse or the stage's class handle; a coincident plant the kernel refused —
 * its insert, or its batch at commit (`kernelTook` false) — is the kernel's refusal of degenerate input, unlawful too.
 */
export function lawfulPlant(stage: Ep01Stage, kind: DegenerateKind, kernelTook: boolean): boolean {
  if (stage === 'S6') return kind === 'collinear' || kind === 'zero-length';
  if (stage === 'S8') return kind === 'zero-length' || kind === 'coincident';
  return kind === 'coincident' && kernelTook;
}

/**
 * How a stage's refusal ended (§5.1 (8); C-0342 (1), retiring C-0278 (1)'s `refused-residue`): refused only when the
 * runner put the arena back bit for bit (the stage image's version and print equal before and after); a refusal that
 * left the arena moved is `off` with the problem named. A refusal of a lawful plant is `refused-lawful` (J264), of an
 * unlawful one `refused-safe`. The planted batch's own end is a fact (it may have committed before the stage refused:
 * the runner's rollback takes it back). Exported for its unit tests.
 */
export function refusalHandling(run: ChainRun, code: string, bugs: number, lawful = false): { handling: EdgeHandling; rung: string; facts: Record<string, number | string | boolean>; problem?: string } {
  const b = run.plant.batch;
  const later = run.plant.after.filter((a) => a.committed).length;
  const back = restored(run.image);
  const stage = run.image?.stage;
  const detail = stage === undefined ? '' : refusalDetail(run, stage);
  const facts = { bugs, batchCommitted: b === null ? 'none' : b.committed, laterCommitted: later, arenaRestored: back, ...(detail === '' ? {} : { refusal: detail }) };
  if (!back) {
    const i = run.image;
    const moved = i === null ? 'no image of the stage was taken' : `version ${String(i.before.version)} → ${String(i.after.version)}${i.before.digest === i.after.digest ? '' : ', print changed'}`;
    return { handling: 'off', rung: `${code}: the stage refused and its arena was not put back`, facts, problem: `the refused stage's arena is not bit-identical to its start (${moved}): the rollback did not hold` };
  }
  return { handling: lawful ? 'refused-lawful' : 'refused-safe', rung: code, facts };
}

/**
 * S5c's or S5d's answer to the planted step's refused insert, read from the growth record against the planted insert
 * itself (M0-x-06 hardening round S1, note 3: never any F-NUM rung of the record): the planted step is the proposal and
 * attempt the S5 driver's insert hook recorded when the plant fired (`firedStep`). Laddered when the record holds that
 * proposal's F-NUM rung for that attempt with the planted insert's code — `re_propose` after a first attempt (§5.2's
 * F-NUM: re-propose from the next attempt stream), `reject` after the retry (then reject with a report line) — named
 * with the proposal's F-NUM rungs from it on; left out when a first attempt's refusal is not F-NUM's and the record counts
 * it in `refused` (the step left out, reported); null otherwise (the record names no rung for the planted step).
 * Exported for its unit tests.
 */
export function plantedStepRung(rec: S5cRecord, plant: Pick<ChainRun['plant'], 'insert' | 'firedStep'>): { handling: EdgeHandling; rung: string; facts: Record<string, number | string | boolean> } | null {
  const ins = plant.insert;
  const at = plant.firedStep;
  if (ins === null || ins.ok || at === null) return null;
  const code = ins.code ?? 'refused';
  const want = at.attempt === 0 ? 're_propose' : 'reject';
  const fnum = rec.rungs.filter((r): r is Extract<S5cRecord['rungs'][number], { cause: 'F-NUM' }> => r.cause === 'F-NUM' && r.proposal === at.proposal);
  const i = fnum.findIndex((r) => r.rung === want && r.code === code);
  if (i >= 0) {
    const named = fnum.slice(i);
    return { handling: 'laddered', rung: `F-NUM ${named.map((r) => r.rung).join(' → ')} (proposal ${String(at.proposal)}, ${code})`, facts: { fnum: named.length, proposal: at.proposal, attempt: at.attempt } };
  }
  if (at.attempt === 0 && (rec.refused[code] ?? 0) > 0) return { handling: 'left-out', rung: `the planted step left out, reported refused ${code}`, facts: { refused: rec.refused[code] ?? 0, proposal: at.proposal } };
  return null;
}

/** How a chain stage handled its plant (see the header); exported for its unit tests. */
export function chainHandling(stage: Exclude<Ep01Stage, 'S6' | 'S8'>, run: ChainRun, kind: DegenerateKind | null = null): { handling: EdgeHandling; rung: string; facts: Record<string, number | string | boolean>; problem?: string } {
  const name = SITES[stage].stage;
  const bugs = bugsOf(run.report, name);
  // the kernel took the plant whole: its insert ok and its batch not refused (a batch it refused at commit is the
  // kernel's refusal of the degenerate input, §3.11, §5.1 (9))
  const took = run.plant.insert?.ok === true && run.plant.batch?.committed !== false;
  if (bugs.length > 0) return refusalHandling(run, bugs[0].cls, bugs.length, kind !== null && lawfulPlant(stage, kind, took));
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
      const whole = (rec as S5cRecord & { batchRefused?: { code: string } }).batchRefused;
      if (whole !== undefined) return { handling: 'left-out', rung: `${stage}: the growth batch left out, reported batchRefused ${whole.code}`, facts: { batchRefused: whole.code } };
      if (!refused && !insertRefused) return { handling: 'absorbed', rung: `${stage}: the step committed`, facts: { streets: rec.streets.length } };
      const own = insertRefused ? plantedStepRung(rec, run.plant) : null;
      if (own !== null) return { ...own, rung: `${stage}: ${own.rung}` };
      return { handling: 'off', rung: `${stage}: the plant was refused and the record names no rung for the planted step`, facts: {} };
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
  const lawful: AttemptRefusal[] = [...c.lawful];
  const problems = [...c.problems];
  if (run.plant.fired === null) unmet.push(`the plant never fired: ${site.what} was not met`);
  const h = chainHandling(stage, run, kind);
  const homeBugs = bugsOf(run.report, site.stage);
  if (unmet.length === 0 && homeBugs.length > 0) {
    // the unplanted control: the same state, the same façade, a plant that never fires
    const control = edgeChain(seed, { ...o, plant: plantAt(() => false) });
    const cb = bugsOf(control.report, site.stage);
    if (cb.length > 0) {
      unmet.push(`the home stage refuses this state unplanted: ${site.stage} ${cb[0].cls} (${refusalDetail(control, site.stage).slice(0, 120)})`);
      lawful.push({ stage: site.stage, code: cb[0].cls, where: 'control', detail: refusalDetail(control, site.stage) });
    }
  }
  if (h.problem !== undefined) problems.push(h.problem);
  if (unmet.length === 0 && h.handling === 'refused-lawful') lawful.push({ stage: stage, code: h.rung, where: 'home', detail: `${kind} plant: ${refusalDetail(run, site.stage)}` });
  const rec = stage === 'S5c' || stage === 'S5d' ? growthRecordOf(stage, run) : null;
  const workCut = rec?.rungs.find((r) => r.cause === 'F-WORK');
  const facts = { ...h.facts, ...(run.plant.batch === null ? {} : { batchCommitted: run.plant.batch.committed }), ...(workCut === undefined ? {} : { workCut: `${workCut.rung} ${workCut.counter} ${String(workCut.count)}/${String(workCut.limit)}` }) };
  return { outcome: outcome(h.handling, h.rung, problems, facts, kernelAnswer(run)), unmet, lawful };
}

/** EP-01's run of one (stage, kind) cell at `seed` (the class cells of ./classes.ts run the same cells). */
export function runEp01(stage: Ep01Stage, kind: DegenerateKind, seed: number, extra: Ep01Extra = {}): EdgeOutcome {
  if (stage === 'S8') return runS8Cell(kind, seed, extra);
  return firstStanding(seed, (s) => (stage === 'S6' ? s6Attempt(kind, s) : chainCellAttempt(stage, kind, s, extra)));
}

/**
 * S6's cell on one state: S5's last boundary with land made the kind before S6 offsets its perimeter from it. S6 runs
 * with a façade whose plant never fires (its run otherwise S6's own), so its batches are logged and its image taken: a
 * refusal is judged on the image (C-0342 (1)) — refused-safe (or refused-lawful for the collinear ring, N-56 (2)) only
 * when the arena is bit-identical to S6's start.
 */
function s6Attempt(kind: DegenerateKind, seed: number): Attempt {
  // the kind laid (the precondition): checked on the ring's shape, not on its vertex count alone (note 12)
  let laid: string | null = 'the boundary was not made degenerate (no stage with land)';
  const run = edgeChain(seed, {
    blueprint: SMALL_FLAT,
    upTo: 'S6',
    plant: { stage: 'S6', plant: { kind, select: () => false } },
    s5: {
      after: (state) => {
        const b = state.stages[state.lastWithLand - 1]?.boundary;
        if (b === null || b === undefined) return;
        const before = b.set.outline;
        const after = degenerateRing(before, kind);
        laid = kindLaidProblem(before, after, kind);
        (b.set as { outline: unknown }).outline = after;
      },
    },
  });
  const c = chainCheck(run, 'S6', 'S6');
  const problems = [...c.problems];
  const unmet = [...c.unmet];
  const lawful: AttemptRefusal[] = [...c.lawful];
  if (laid !== null) unmet.push(laid);
  const bugs = bugsOf(run.report, 'S6');
  if (bugs.length > 0) {
    if (unmet.length === 0) {
      const control = edgeChain(seed, { blueprint: SMALL_FLAT, upTo: 'S6' });
      const cb = bugsOf(control.report, 'S6');
      if (cb.length > 0) {
        unmet.push(`the home stage refuses this state unplanted: S6 ${cb[0].cls} (${refusalDetail(control, 'S6').slice(0, 120)})`);
        lawful.push({ stage: 'S6', code: cb[0].cls, where: 'control', detail: refusalDetail(control, 'S6') });
      }
    }
    const h = refusalHandling(run, bugs[0].cls, bugs.length, lawfulPlant('S6', kind, true));
    if (h.problem !== undefined) problems.push(h.problem);
    if (unmet.length === 0 && h.handling === 'refused-lawful') lawful.push({ stage: 'S6', code: h.rung, where: 'home', detail: `${kind} boundary: ${refusalDetail(run, 'S6')}` });
    const committed = run.plant.batches.filter((b) => b.committed).length;
    return { outcome: outcome(h.handling, h.rung, problems, { ...h.facts, s6Batches: run.plant.batches.length, s6Committed: committed }), unmet, lawful };
  }
  if (unmet.length > 0) return { outcome: outcome('absorbed', 'S6: (the state did not stand)', problems), unmet, lawful };
  const s6 = run.model.data.get('s6') as S6Output | undefined;
  if (s6 === undefined) return { outcome: outcome('off', 'S6 wrote no record', problems), unmet, lawful };
  if (!simpleCcw(s6.perimeter)) problems.push('the perimeter S6 committed is not a simple counter-clockwise ring');
  if (s6.report.unowned !== 0) problems.push(`${String(s6.report.unowned)} coarse faces inside the perimeter hold no district`);
  if (s6.districts.length === 0) problems.push('S6 made no district');
  return { outcome: outcome('absorbed', 'S6: the perimeter offset from the degenerate boundary is a simple ring', problems, { districts: s6.districts.length, merges: s6.report.merges, perimeter: s6.perimeter.length }), unmet, lawful };
}

/** S8's cell: M0-b-03's Stage on the two-district arena whose west district carries the kind. */
function runS8Cell(kind: DegenerateKind, seed: number, extra: Ep01Extra = {}): EdgeOutcome {
  const st = s8State(seed, kind, extra.s8Scale === undefined ? {} : { scale: extra.s8Scale });
  // the precondition, read before S8 runs (C-0278 (3)): the kind stands in the west district's faces S8 receives
  const reached = s8KindProblem(st, kind);
  const stage = s8Stage(extra.s8WorkLimits === undefined ? {} : { workLimits: extra.s8WorkLimits });
  const input = extra.s8WorkLimits === undefined ? st.input : { ...st.input, tables: { ...st.input.tables, workLimits: extra.s8WorkLimits } };
  return s8CellRun(st, stage, input, kind, seed, reached);
}

/** The part of S8's Stage the cell runs (M0-b-03's `s8Stage`, or a test's fabricated stage). */
export interface S8StageLike {
  inputsOf(model: unknown, scope: { readonly kind: 'all' }): unknown;
  run(input: unknown, ctx: never): KernelResult<unknown>;
}

/**
 * S8's cell run and judgement on the prepared state (see runS8Cell; exported for its unit test — the hardening round S1's
 * row c2-2: the rollback branch, met by no seed of the committed stage, held on a fabricated refusal): `reached` is the
 * precondition's problem (null when the kind reached S8's faces).
 */
export function s8CellRun(st: S8State, stage: S8StageLike, input: unknown, kind: DegenerateKind, seed: number, reached: string | null): EdgeOutcome {
  // the stage image the runner takes (M0-x-02 s1, N-55 (6)): S8 runs here on the fixture's own arena outside the runner,
  // so its refusal is put back by the runner's own rule — the kernel's savepoint, restored when the version moved — and
  // judged on the print, as every refusal is (C-0342 (1))
  const image = takeSavepoint(st.plat);
  const before = { version: st.plat.version, digest: arenaDigest(st.plat) };
  const r = stage.run(stage.inputsOf(input, { kind: 'all' }), { report: undefined } as never);
  if (!r.ok && st.plat.version !== image.version) restoreSavepoint(image);
  const problems = [...(reached === null ? [] : [`the kind never reached S8's faces: ${reached}`]), ...arenaProblems(st.plat)];
  const lawful = lawfulPlant('S8', kind, true);
  if (!r.ok) {
    const back = st.plat.version === before.version && arenaDigest(st.plat) === before.digest;
    if (!back) problems.push(`S8 refused ${r.code} and its arena is not bit-identical to its start after the runner's rollback (version ${String(before.version)} → ${String(st.plat.version)})`);
    const o = outcome(back ? (lawful ? 'refused-lawful' : 'refused-safe') : 'off', r.code, problems, { arenaRestored: back });
    return lawful ? { ...o, lawful: [{ stateSeed: seed, stage: 'S8', code: r.code, where: 'home', detail: `${kind}: ${r.detail.slice(0, 160)}` }] } : o;
  }
  const v = r.value as S8Output;
  const report = v.infill.report;
  if (report.districts.length + report.refused.length !== 2) problems.push(`S8 reported ${String(report.districts.length + report.refused.length)} of its 2 districts`);
  if (report.refused.length > 0) {
    // a district S8 refused inside its run, the stage going on: tier 6, the district left out and reported (§5.1)
    const o = outcome('left-out', `S8: ${String(report.refused.length)} district(s) refused ${report.refused[0].code}, left out and reported`, problems, { refused: report.refused.length });
    return lawful ? { ...o, lawful: [{ stateSeed: seed, stage: 'S8', code: report.refused[0].code, where: 'home', detail: `${kind}: a district refused, left out` }] } : o;
  }
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
 * A cell's pinned refusal of an UNLAWFUL plant (C-0273 (6), C-0278 (4), C-0342 (4)): the stage refuses the planted kind
 * whole — typed, one bugs entry, the arena bit-identical to the stage's start — where its ladder has no rung for it at M0
 * (fail-safe, N-45; a known shortfall for the hardening pass). `cause` says where the refusal falls and `share` how often
 * the cell met it at 1 000 seeds on the committed tree (the 1 000-seed runs of round 2 and of the hardening round S1); `rolledBack` marks the
 * cells whose planted batch COMMITS before the stage refuses at its own later check, so only the runner's rollback
 * (M0-x-02 s1, N-55 (6)) takes it back — C-0278 (1)'s six residue cells, retired as residue by C-0342 (1).
 */
export interface Ep01Pin {
  readonly codes: readonly string[];
  readonly cause: string;
  readonly share: string;
  readonly route: string;
  readonly rolledBack?: true;
  /** A rare refusal's fixture seeds at 1 000 (every one; the judge refuses the pinned code on any other seed). */
  readonly seeds?: readonly number[];
}

const PINNED: Readonly<Partial<Record<Ep01Stage, Partial<Record<DegenerateKind, Ep01Pin>>>>> = {
  S1: {
    'zero-length': { codes: ['E_DEGENERATE'], cause: "the kernel refuses the zero-length shore (empty) and S1 refuses its water batch whole", share: '1 000 of 1 000', route: 'M0-e-03' },
    'zero-area': { codes: ['E_INVARIANT'], cause: "the kernel takes the zero-area shore as one shared stretch and the water batch commits; S1's stage-end row references-resolve refuses (the crossings' deck_end references find no geometry)", share: '1 000 of 1 000', route: 'M0-e-03', rolledBack: true },
    'self-touching': {
      codes: ['E_INVARIANT'],
      cause: "the planted bow-tie's water batch is refused at commit by §3.10 role consistency ((shore, water:river:0) branches) and S1's slow-path ring is refused too (its fast ring refused near the edge) — no rung left (Q20 class B: a typed refusal of unlawful input; the other 996 seeds are laddered on S1's retry since M0-e-03 S3's Q45 shift, C-0434 — 33 refused before it)",
      share: '4 of 1 000',
      route: 'M0-e-03',
      seeds: [2893352673, 3167842014, 2971082141, 382546462],
    },
    collinear: { codes: ['E_INVARIANT'], cause: "the kernel takes the folded shore as one shared stretch and the water batch commits; S1's stage-end row references-resolve refuses (the crossings' deck_end references find no geometry)", share: '1 000 of 1 000', route: 'M0-e-03', rolledBack: true },
  },
  S3: {
    'zero-length': { codes: ['E_DEGENERATE'], cause: "the kernel refuses the zero-length trace (empty) and S3's slice commit refuses", share: '1 000 of 1 000', route: 'M0-c-01 / M0-c-02' },
    'zero-area': { codes: ['E_INVARIANT'], cause: "the kernel takes the zero-area trace as one shared stretch and its batch commits; S3's check refuses: a gate is not on the committed trace at its point (§4.2 S3 (9))", share: '1 000 of 1 000', route: 'M0-c-01 / M0-c-02', rolledBack: true },
    'self-touching': { codes: ['E_INVARIANT'], cause: "the self-touching trace's batch is refused at commit by §3.10 role consistency ((wall, enceinte:1) branches) and S3's slice commit refuses", share: '1 000 of 1 000', route: 'M0-c-01 / M0-c-02' },
    collinear: { codes: ['E_INVARIANT'], cause: "the kernel takes the folded trace as one shared stretch and its batch commits; S3's check refuses: a gate is not on the committed trace at its point (§4.2 S3 (9))", share: '1 000 of 1 000', route: 'M0-c-01 / M0-c-02', rolledBack: true },
  },
  S5a: {
    'zero-length': { codes: ['E_DEGENERATE'], cause: "the kernel refuses the zero-length trace (empty) and S5a refuses stage 2's trace", share: '1 000 of 1 000', route: 'M0-c-02 / M0-c-04' },
    'zero-area': { codes: ['E_INVARIANT'], cause: "the kernel takes the zero-area trace as one shared stretch and its batch commits (999 seeds; 1 refused at commit); the stage's check refuses: a gate is not on the committed trace at its point (§4.2 S3 (9))", share: '1 000 of 1 000', route: 'M0-c-02 / M0-c-04', rolledBack: true },
    'self-touching': { codes: ['E_INVARIANT'], cause: "the self-touching trace's batch is refused at commit by §3.10 role consistency ((wall, enceinte:2) branches) and S5a refuses stage 2's trace", share: '1 000 of 1 000', route: 'M0-c-02 / M0-c-04' },
    collinear: { codes: ['E_INVARIANT'], cause: "the kernel takes the folded trace as one shared stretch and its batch commits (999 seeds; 1 refused at commit); the stage's check refuses: a gate is not on the committed trace at its point (§4.2 S3 (9))", share: '1 000 of 1 000', route: 'M0-c-02 / M0-c-04', rolledBack: true },
    // coincident: no pin since the hardening round S1 (Q106) — M0-a-05 S9's declared shift (RQ3, item 130 (e), R-42): the
    // doubled trace is absorbed as its run; at 1 000 seeds every one absorbed on its first state (the five once refused,
    // 1658509524, 3650193777, 3114039644, 2262416935, 57196073, among them; repins.test.ts)
  },
  S5b: {
    'zero-length': { codes: ['E_DEGENERATE'], cause: "the kernel refuses the zero-length main road (empty) and S5b refuses stage 2's main roads", share: '1 000 of 1 000', route: 'M0-c-04' },
    'self-touching': { codes: ['E_INVARIANT'], cause: "the self-touching main road's batch is refused at commit by §3.10 role consistency ((way, way:<n>) branches) and S5b refuses stage 2's main roads", share: '1 000 of 1 000', route: 'M0-c-04' },
  },
  S6: {
    'zero-area': { codes: ['E_INVARIANT'], cause: "S6 refuses the boundary with an antenna before its batch: settlementPerimeter's sum check (the overlay's outer ring is not the boundary's offset)", share: '996 of 1 000', route: 'M0-e-04' },
    'self-touching': { codes: ['E_INVARIANT'], cause: "S6 refuses the looped boundary before its batch: settlementPerimeter's sum check (the other 997 seeds absorbed; seed 2191303060, N-56 (2)'s collinear class, now absorbed; 3009257304 refused since round 2 — the hardening round S1's 1 000-seed run, the same cause)", share: '3 of 1 000', route: 'M0-e-04', seeds: [4101706098, 2461000155, 3009257304] },
    coincident: { codes: ['E_INVARIANT'], cause: "S6 refuses the boundary given twice round before its batch: settlementPerimeter's union finds no route within the fidelity bound (Q21: a typed refusal of unlawful input)", share: '2 of 1 000', route: 'M0-e-04', seeds: [2708765650, 14238338] },
  },
};

/**
 * The lawful-input refusals the cells name as findings for the session (J264; C-0342 (3)), by fixture seed: the code
 * the home refused with on that seed of the 1 000-seed family and the route the session gave it. A finding is never a
 * pin of a pass: it is counted in the census, listed in the builder's notes, and a lawful refusal on any seed not listed
 * here fails the cell (a new finding for the session).
 */
const FINDINGS: Readonly<Partial<Record<Ep01Stage, Partial<Record<DegenerateKind, Readonly<Record<number, { readonly code: string; readonly route: string }>>>>>>> = {
  // none on the committed tree: S8's seam-portals refusal of the lawful zero-length arterial at 2521534151 (Q41, N-57 (1))
  // is gone with M0-b-03 s4 (C-0329) — that seed now ladders (deep:refused:portal-gap among its rungs) and its pin is
  // repins.test.ts's; a cell that meets a lawful refusal again fails naming the seed (a new finding for the session)
};

/** A cell's pin (C-0342 (4)), or undefined where the stage's ladder takes every seed. */
export function ep01Pin(stage: Ep01Stage, kind: DegenerateKind): Ep01Pin | undefined {
  return PINNED[stage]?.[kind];
}

/** A cell's pinned refusal codes, or undefined. */
export function ep01Pinned(stage: Ep01Stage, kind: DegenerateKind): readonly string[] | undefined {
  return PINNED[stage]?.[kind]?.codes;
}

/** A cell's named lawful-input findings by fixture seed (C-0342 (3)), or undefined. */
export function ep01Findings(stage: Ep01Stage, kind: DegenerateKind): Readonly<Record<number, { readonly code: string; readonly route: string }>> | undefined {
  return FINDINGS[stage]?.[kind];
}

/** The known-issue line a pinned cell is listed under (C-0273 (6), C-0342 (4); the hardening pass's). */
export function ep01Known(stage: Ep01Stage, kind: DegenerateKind): string | null {
  const pin = PINNED[stage]?.[kind];
  if (pin === undefined) return null;
  const back = pin.rolledBack === true ? ' — the planted batch commits first and the runner rolls the stage back whole (N-55 (6))' : '';
  return `KI EP-01/${stage}/${kind}: ${pin.cause} (${pin.codes.join(' | ')}; ${pin.share} at 1 000 seeds)${back}; refused safe: typed, one bugs entry, the arena bit-identical to the stage's start — no rung of ${EP01_CLASS[stage]} takes the unlawful ${kind} at M0; fail-safe (N-45), routed to ${pin.route} for the hardening pass`;
}

/** The judge of a pinned cell: a refusal it allows holds the rollback (C-0342 (1)), read again from the facts. */
function rollbackJudge(o: EdgeOutcome): string | null {
  if (o.handling !== 'refused-safe' && o.handling !== 'refused-lawful') return null;
  return o.facts.arenaRestored === true ? null : `refused ${o.rung} without the arena put back bit for bit (arenaRestored ${String(o.facts.arenaRestored)})`;
}

/**
 * The handlings a cell allows, its pinned refusal and its named findings (shared by the EP-01 and class fixtures). The
 * seed-named parts — a rare pin's seeds and the findings — are the EP-01 cell's own family's (`own`); a class fixture
 * running the same stage on its own seeds takes the pin's codes only, and no finding.
 */
export function ep01Expect(stage: Ep01Stage, kind: DegenerateKind, own = true): Pick<EdgeFixture['expect'], 'allowed' | 'refusal' | 'findings' | 'judge'> {
  const pin = PINNED[stage]?.[kind];
  const findings = own ? FINDINGS[stage]?.[kind] : undefined;
  const known = ep01Known(stage, kind);
  const allowed: EdgeHandling[] = ['absorbed', 'laddered', 'left-out'];
  if (pin !== undefined && (own || pin.seeds === undefined)) allowed.push('refused-safe');
  if (findings !== undefined) allowed.push('refused-lawful');
  return {
    allowed,
    ...(pin === undefined || known === null || (!own && pin.seeds !== undefined) ? {} : { refusal: { codes: pin.codes, known, ...(pin.seeds === undefined ? {} : { seeds: pin.seeds }) } }),
    ...(findings === undefined ? {} : { findings }),
    judge: rollbackJudge,
  };
}

/** The EP-01 fixtures: every stage × every kind (45). */
export function ep01Fixtures(): EdgeFixture[] {
  const out: EdgeFixture[] = [];
  for (const stage of EP01_STAGES) {
    for (const kind of DEGENERATE_KINDS) {
      out.push({
        id: `EP-01/${stage}/${kind}`,
        home: `§4.13 EP-01; §4.1's transactions table (${stage}: ${EP01_CLASS[stage]}); §5.1 (9); §3.11 degenerate geometry`,
        run: (seed) => runEp01(stage, kind, seed),
        expect: {
          outcome: `${kind} geometry at ${stage}: refused by the kernel (or taken by §3.11's rule) and handled by ${EP01_CLASS[stage]} — repair locally → retry that piece → simpler shape → leave out and report; never a crash, hang, invalid output or whole-map retry`,
          ...ep01Expect(stage, kind),
        },
      });
    }
  }
  return out;
}
