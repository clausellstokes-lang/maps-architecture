// The runner's stage-end guard (M0-x-02; §5.3, §5.4; C-0316 (1)–(5): a declared stage-end row that no code evaluated
// never reads as a pass with count 0). A stage that reaches its end — its run returns ok and it wrote an output or
// committed on an arena — must have reported every declared row of §5.3's `stage` scope through its sink at least once;
// otherwise the stage is refused E_INVARIANT 'row <name> declared but never evaluated', rolled back whole as any
// refusal (C-0295), with one bug entry and the row's line pass false with count 0. A stage that met missing inputs and
// produced nothing has no stage end to check; batch, save, load and CI rows are not stage-end rows; a stage already
// refused is judged once, by its own code.
import { err, ok, STAGES, type Invariant, type KernelResult } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { createRegistry, run, type PipelineContext } from '../../../src/index.js';
import { neverEvaluatedDetail } from '../../../src/pipeline/runner.js';
import { ALL, ARENAS, bits, bp, CALLS, contentPrint, COUNTS, LAW, pt, registerAll, SIDE, stage, type Inputs } from './support.js';

const END: Invariant = { name: 'fx.end', scope: 'stage', class: 'hard', kind: 'check', check: 'end' };
const BAND: Invariant = { name: 'fx.band', scope: 'stage', class: 'soft', kind: 'check', check: 'band' };
const BATCH: Invariant = { name: 'fx.batch', scope: 'batch', class: 'hard', kind: 'check', check: 'holds' };
const SOFT_BATCH: Invariant = { name: 'fx.softBatch', scope: 'batch', class: 'soft', kind: 'check', check: 'band' };
const SAVE: Invariant = { name: 'fx.save', scope: 'save', class: 'hard', kind: 'check', check: 'save' };
const LOAD: Invariant = { name: 'fx.load', scope: 'load', class: 'hard', kind: 'check', check: 'load' };
const CI: Invariant = { name: 'fx.ci', scope: 'ci', class: 'soft', kind: 'check', check: 'ci' };

/** The transactions' named predicates the batch rows call. */
const env = { checks: { holds: () => null } };

/** What the fixture S1 does: commit the L0 ring, write its output, report rows (name → its verdicts), or refuse. */
interface Plan {
  readonly invariants: readonly Invariant[];
  readonly commit?: boolean;
  readonly write?: boolean;
  readonly report?: Readonly<Record<string, readonly boolean[]>>;
  readonly refuse?: boolean;
}

/** S1 per its plan, then S3 reading S1's output (so a refused S1's output reads missing), each counted in CALLS. */
function runPlan(plan: Plan | null) {
  CALLS.clear();
  const seen: Inputs[] = [];
  const s1 = stage({
    id: STAGES.S1,
    outputs: ['land'],
    invariants: plan?.invariants ?? [],
    run: (_i, ctx: PipelineContext): KernelResult<unknown> => {
      if (plan === null) return ok({});
      if (plan.commit === true) {
        const r = ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.insertChain(o, [pt(0, 0), pt(SIDE, 0), pt(SIDE, SIDE), pt(0, SIDE)], [{ role: 'margin', entity: 'terrain:ground' }], 'mandatory', { closed: true }));
        if (!r.ok) throw new Error(`fixture: ring refused: ${r.code} ${r.detail}`);
      }
      for (const [row, verdicts] of Object.entries(plan.report ?? {})) for (const v of verdicts) ctx.report.invariant(row, v);
      if (plan.refuse === true) return err('E_DEGENERATE', 'fixture: refused at its end');
      return ok(plan.write === true ? { land: 1 } : {});
    },
  });
  const s3 = stage({ id: STAGES.S3, inputs: ['land'], outputs: ['trace'], run: (i) => (seen.push(i), ok({ trace: 2 })) });
  const r = createRegistry();
  registerAll(r, [s1, s3]);
  const { model, report } = run(r, bp(1), ALL, { arenas: ARENAS, env });
  const ground = model.plats.get('ground/0');
  if (ground === undefined) throw new Error('no ground arena');
  return { model, report, seen, calls: [...CALLS.values()], ground };
}

const hex = (h: ArrayLike<number>): string => Array.from(h).join(',');

describe('the stage-end guard: every declared stage-end row of a stage that reaches its end was evaluated (Q32)', () => {
  it('a stage declaring a stage-end row it never reports is refused E_INVARIANT naming the row: rolled back whole, one bug entry, its line pass false count 0', () => {
    const { model, report, seen, calls, ground } = runPlan({ invariants: [END], commit: true, write: true });
    const town = model.town.identity.id;
    expect(report.bugs).toEqual([{ cls: 'E_INVARIANT', entity: town, key: `S1@${town}`, stage: 'S1' }]);
    expect(model.refusals.get('S1')).toEqual({ code: 'E_INVARIANT', detail: 'row fx.end declared but never evaluated' });
    expect([...model.refusals.keys()]).toEqual(['S1']);
    expect(report.stages[0].invariants).toEqual([{ name: 'fx.end', scope: 'stage', pass: false, count: 0 }]);
    // Nothing it wrote stands (C-0295): no output, its ring rolled back, the roots those of a run in which S1 produced nothing.
    expect(model.data.has('land')).toBe(false);
    expect(seen).toEqual([{ land: undefined }]);
    const idle = runPlan(null);
    expect(bits(ground)).toBe(bits(idle.ground));
    expect(contentPrint(ground)).toBe('');
    expect(hex(model.root)).toBe(hex(idle.model.root));
    expect(hex(model.stageRoots.get('S1') ?? [])).toBe(hex(idle.model.stageRoots.get('S1') ?? []));
    // The derivation goes on, every stage once (§5.1 (1)); the work the rolled-back batch charged stays spent.
    expect(model.order).toEqual(['S1', 'S3']);
    expect(calls).toEqual([1, 1]);
    expect(model.data.get('trace')).toBe(2);
    expect(report.stages[0].work[LAW.counter]).toBeGreaterThan(0);
  });

  it('the honest stage — the row reported once — passes: its output written, its ring kept, its line pass true count 1', () => {
    const { model, report, seen, ground } = runPlan({ invariants: [END], commit: true, write: true, report: { 'fx.end': [true] } });
    expect(report.bugs).toEqual([]);
    expect(model.refusals.size).toBe(0);
    expect(report.stages[0].invariants).toEqual([{ name: 'fx.end', scope: 'stage', pass: true, count: 1 }]);
    expect(model.data.get('land')).toBe(1);
    expect(seen).toEqual([{ land: 1 }]);
    expect(contentPrint(ground)).not.toBe('');
    expect(hex(model.stageRoots.get('S1') ?? [])).not.toBe(hex(runPlan(null).model.stageRoots.get('S1') ?? []));
  });

  it("the report carries each row's count and verdict; a failed evaluation is an evaluation (the stage's to act on), never the guard's", () => {
    const { model, report } = runPlan({ invariants: [END, BAND], write: true, report: { 'fx.end': [false, true], 'fx.band': [true, true, true] } });
    expect(report.bugs).toEqual([]);
    expect(model.refusals.size).toBe(0);
    expect(model.data.get('land')).toBe(1);
    expect(report.stages[0].invariants).toEqual([
      { name: 'fx.end', scope: 'stage', pass: false, count: 2 },
      { name: 'fx.band', scope: 'stage', pass: true, count: 3 },
    ]);
  });

  it('hard and soft stage-end rows alike: the one left unreported is named alone; two left unreported give one bug entry naming both, in declaration order', () => {
    const one = runPlan({ invariants: [END, BAND], write: true, report: { 'fx.band': [true] } });
    expect(one.report.bugs.map((b) => [b.stage, b.cls])).toEqual([['S1', 'E_INVARIANT']]);
    expect(one.model.refusals.get('S1')?.detail).toBe('row fx.end declared but never evaluated');
    expect(one.report.stages[0].invariants).toEqual([
      { name: 'fx.end', scope: 'stage', pass: false, count: 0 },
      { name: 'fx.band', scope: 'stage', pass: true, count: 1 },
    ]);
    const soft = runPlan({ invariants: [END, BAND], write: true, report: { 'fx.end': [true] } });
    expect(soft.model.refusals.get('S1')?.detail).toBe('row fx.band declared but never evaluated');
    const both = runPlan({ invariants: [END, BAND], write: true });
    expect(both.report.bugs).toHaveLength(1);
    expect(both.model.refusals.get('S1')?.detail).toBe(neverEvaluatedDetail(['fx.end', 'fx.band']));
    expect(neverEvaluatedDetail(['fx.end', 'fx.band'])).toBe('row fx.end declared but never evaluated; row fx.band declared but never evaluated');
    expect(both.report.stages[0].invariants.map((l) => [l.name, l.pass, l.count])).toEqual([['fx.end', false, 0], ['fx.band', false, 0]]);
    expect(both.model.data.has('land')).toBe(false);
  });

  it('reaching the end is producing something: an output written with no batch, or a commit with no output, is judged; each refused here', () => {
    const output = runPlan({ invariants: [END], write: true });
    expect(output.model.refusals.get('S1')?.code).toBe('E_INVARIANT');
    expect(output.model.data.has('land')).toBe(false);
    const commit = runPlan({ invariants: [END], commit: true });
    expect(commit.model.refusals.get('S1')?.detail).toBe('row fx.end declared but never evaluated');
    expect(commit.report.bugs).toHaveLength(1);
    expect(bits(commit.ground)).toBe(bits(runPlan(null).ground));
  });

  it('a stage that met missing inputs and produced nothing has no stage end: its rows stay unevaluated (pass true, count 0), no bug (§5.4 whole report)', () => {
    const { model, report, calls } = runPlan({ invariants: [END, BAND] });
    expect(report.bugs).toEqual([]);
    expect(model.refusals.size).toBe(0);
    expect(report.stages[0].invariants).toEqual([
      { name: 'fx.end', scope: 'stage', pass: true, count: 0 },
      { name: 'fx.band', scope: 'stage', pass: true, count: 0 },
    ]);
    expect(calls).toEqual([1, 1]);
  });

  it('batch, save, load and CI rows are not stage-end rows: unreported, they refuse nothing; a batch-scope hard row counts the batches the runner checked', () => {
    const rows = [BATCH, SOFT_BATCH, SAVE, LOAD, CI];
    const bare = runPlan({ invariants: rows, write: true });
    expect(bare.report.bugs).toEqual([]);
    expect(bare.model.data.get('land')).toBe(1);
    expect(bare.report.stages[0].invariants.map((l) => [l.name, l.pass, l.count])).toEqual(rows.map((r) => [r.name, true, 0]));
    const batched = runPlan({ invariants: [...rows, END], commit: true, write: true, report: { 'fx.end': [true] } });
    expect(batched.report.bugs).toEqual([]);
    expect(batched.report.stages[0].invariants.map((l) => [l.name, l.count])).toEqual([['fx.batch', 1], ['fx.softBatch', 0], ['fx.save', 0], ['fx.load', 0], ['fx.ci', 0], ['fx.end', 1]]);
  });

  it('a stage refused by its own run is judged once, by its own code: one bug entry, its detail kept, its unreported row unevaluated (pass true, count 0)', () => {
    const { model, report, ground } = runPlan({ invariants: [END], commit: true, write: true, refuse: true });
    const town = model.town.identity.id;
    expect(report.bugs).toEqual([{ cls: 'E_DEGENERATE', entity: town, key: `S1@${town}`, stage: 'S1' }]);
    expect(model.refusals.get('S1')).toEqual({ code: 'E_DEGENERATE', detail: 'fixture: refused at its end' });
    expect(report.stages[0].invariants).toEqual([{ name: 'fx.end', scope: 'stage', pass: true, count: 0 }]);
    expect(bits(ground)).toBe(bits(runPlan(null).ground));
  });

  it('two runs of one plan give equal reports, refusals and roots (the guard is deterministic)', () => {
    const a = runPlan({ invariants: [END, BAND], commit: true, write: true, report: { 'fx.band': [true] } });
    const b = runPlan({ invariants: [END, BAND], commit: true, write: true, report: { 'fx.band': [true] } });
    expect(b.report).toEqual(a.report);
    expect([...b.model.refusals]).toEqual([...a.model.refusals]);
    expect(hex(b.model.root)).toBe(hex(a.model.root));
  });
});
