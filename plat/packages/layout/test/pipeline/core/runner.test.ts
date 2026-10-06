// The runner over fixture stages (M0-x-02; §4.1, §14 `Stage`, `StageContext`, `Scope`; §3.3 *Two op forms*, kept
// content; §5.1 (1), (5), (8); §5.4; §6.1; §6.2 through M0-d-04; C-0077, C-0090, C-0147, C-0224).
import { readFileSync } from 'node:fs';
import {
  CONCERNS,
  createRng,
  ENGINE_ID,
  err,
  isFaceLive,
  ok,
  opInsertChain,
  STAGES,
  type CommitRecord,
  type Hash128,
  type Handle,
  type Invariant,
  type KernelResult,
  type Stream,
} from '@plat/kernel';
import { mint } from '@plat/model';
import { describe, expect, it } from 'vitest';
import {
  createRegistry,
  OUTPUT_VERSION,
  REPORT_FIELDS,
  REPORT_LISTS,
  run,
  type GenerationReport,
  type PipelineContext,
  type RunOptions,
} from '../../../src/index.js';
import { ALL, ARENAS, bp, CALLS, COUNTS, drawn, LAW, liveFaces, pt, registerAll, SIDE, stage, townStream, type Inputs } from './support.js';

/** A registry holding `stages`. */
function registryOf(stages: Parameters<typeof registerAll>[1]) {
  const r = createRegistry();
  registerAll(r, stages);
  return r;
}

/** The six drawn stages run once at `seed`. */
function runDrawn(seed: number, options: RunOptions = {}, empty = false) {
  return run(registryOf(drawn()), bp(seed, empty), ALL, { arenas: ARENAS, ...options });
}

/** A data key's value's `draws` (the fixture stages record their draws there). */
function drawsOf(data: ReadonlyMap<string, unknown>, key: string): number[] | undefined {
  return (data.get(key) as { draws?: number[] } | undefined)?.draws;
}

/** The S1-ring-only callback stage the batch tests build on. */
function ringStage(over: Partial<Parameters<typeof stage>[0]> = {}) {
  return stage({
    id: STAGES.S1,
    run: (_i, ctx) => {
      const r = ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.insertChain(o, [pt(0, 0), pt(SIDE, 0), pt(SIDE, SIDE), pt(0, SIDE)], [{ role: 'margin', entity: 'terrain:ground' }], 'mandatory', { closed: true }));
      return r.ok ? ok({}) : err(r.code, r.detail);
    },
    ...over,
  });
}

describe('the runner: one eager pass in Kahn\'s order (§4.1, §14)', () => {
  it('runs every stage once, in the order, each reading its declared inputs as the earlier stages wrote them', () => {
    CALLS.clear();
    const { model, report } = runDrawn(7);
    expect(model.order).toEqual(['S1', 'S3', 'S4', 'S5', 'S6', 'S8']);
    expect(report.stages.map((s) => s.name)).toEqual(model.order);
    for (const id of [STAGES.S1, STAGES.S3, STAGES.S4, STAGES.S5, STAGES.S6, STAGES.S8]) expect(CALLS.get(id)).toBe(1);
    expect((model.data.get('reservations') as { ids: string[] }).ids).toEqual(['reservation:plaza']);
    expect((model.data.get('lanes') as { ids: string[] }).ids).toEqual(['way:lane']);
    expect(model.data.get('blueprint')).toEqual(bp(7));
    expect(report.bugs).toEqual([]);
  });

  it('a lazy stage runs eagerly at its place in the order (the laziness contract\'s eager part)', () => {
    const seen: string[] = [];
    const r = registryOf([
      stage({ id: STAGES.S10, lazy: true, inputs: ['a'], run: () => (seen.push('S10'), ok({})) }),
      stage({ id: STAGES.S9, outputs: ['a'], run: () => (seen.push('S9'), ok({ a: 1 })) }),
    ]);
    run(r, bp(1), ALL);
    expect(seen).toEqual(['S9', 'S10']);
  });

  it("refuses a scope other than 'all' by its milestone (a scoped re-derivation is M2a's, an epoch M4's)", () => {
    const r = registryOf(drawn());
    expect(() => run(r, bp(1), { kind: 'entities', ids: [] })).toThrow(/notBuilt\('M2a'\)/);
    expect(() => run(r, bp(1), { kind: 'epoch', epoch: 1 })).toThrow(/notBuilt\('M4'\)/);
  });

  it("reading an undeclared input or returning an undeclared output is a programming error (the order is the declared I/O's)", () => {
    const reader = stage({ id: STAGES.S4, inputs: ['a'] });
    const sneaky = { ...reader, inputsOf: (m: { get(k: string): unknown }) => ({ b: m.get('b') }) };
    expect(() => run(registryOf([sneaky]), bp(1), ALL)).toThrow(/reads 'b', which it does not declare/);
    expect(() => run(registryOf([stage({ id: STAGES.S4, outputs: ['a'], run: () => ok({ a: 1, b: 2 }) })]), bp(1), ALL)).toThrow(/returned 'b', which it does not declare/);
    expect(() => run(registryOf([stage({ id: STAGES.S4, run: () => ok(3) })]), bp(1), ALL)).toThrow(/returns its outputs by data key/);
  });

  it('writes only the declared outputs a stage returned; a key left out (or undefined) stays missing', () => {
    const { model } = run(registryOf([stage({ id: STAGES.S4, outputs: ['a', 'b', 'c'], run: () => ok({ a: 1, c: undefined }) })]), bp(1), ALL);
    expect([...model.data.keys()].sort()).toEqual(['a', 'blueprint']);
  });
});

describe('the op form per stage (§3.3 *Two op forms*, §4.1)', () => {
  const formRun = (txForm: 'declared' | 'callback', body: (ctx: PipelineContext) => unknown) => run(registryOf([stage({ id: STAGES.S3, txForm, run: (_i, ctx) => (body(ctx), ok({})) })]), bp(1), ALL, { arenas: ARENAS });
  const ring = [pt(0, 0), pt(SIDE, 0), pt(SIDE, SIDE), pt(0, SIDE)];
  const op = opInsertChain([1, 0], 0, ring, [{ role: 'margin', entity: 'terrain:ground' }], 'mandatory', { closed: true });

  it('a declared stage commits its ops; a callback stage its callback', () => {
    const seen: CommitRecord[] = [];
    formRun('declared', (ctx) => expect(ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS, ops: [op] }).ok).toBe(true));
    run(registryOf([stage({ id: STAGES.S3, txForm: 'declared', run: (_i, ctx) => (ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS, ops: [op] }), ok({})) })]), bp(1), ALL, { arenas: ARENAS, observe: (_s, rec) => seen.push(rec) });
    expect(seen).toHaveLength(1);
    expect(seen[0].faces[0].created).toHaveLength(1);
    formRun('callback', (ctx) => expect(ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.insertChain(o, ring, [{ role: 'margin', entity: 't' }], 'mandatory', { closed: true })).ok).toBe(true));
  });

  it('a batch with both an ops list and a callback is refused (an assertion), in either form', () => {
    for (const form of ['declared', 'callback'] as const) {
      expect(() => formRun(form, (ctx) => ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS, ops: [op] }, () => ok(0)))).toThrow(/an ops list and a callback: never both/);
    }
  });

  it("a declared stage's callback batch and a callback stage's ops batch are refused", () => {
    expect(() => formRun('declared', (ctx) => ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }, () => ok(0)))).toThrow(/declared op form/);
    expect(() => formRun('callback', (ctx) => ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS, ops: [op] }))).toThrow(/callback form/);
    expect(() => formRun('callback', (ctx) => ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS, ops: [] }))).toThrow(/callback form/);
    expect(() => formRun('callback', (ctx) => ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }))).toThrow(/callback form/);
  });

  it("each batch is the stage's own: its ranked faces are kept from a later stage's clear and cleared by its own (rederivesFrom = the stage, §3.3)", () => {
    const LAND = { owner: 'land:0', level: 0 as const };
    const l1 = (ctx: PipelineContext): number => ctx.kernel.view({ layer: 'ground', part: 0 }, 1).faces().length;
    const clear = (ctx: PipelineContext): number => {
      const r = ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.clearFiner(o, LAND, 0));
      expect(r.ok).toBe(true);
      return l1(ctx);
    };
    const counts: Record<string, number> = {};
    run(registryOf([
      stage({ id: STAGES.S1, outputs: ['land'], run: (_i, ctx) => {
        ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.insertChain(o, ring, [{ role: 'margin', entity: 't' }], 'mandatory', { closed: true }));
        const f = ctx.kernel.view({ layer: 'ground', part: 0 }, 0).faces()[0];
        expect(ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.setOwner(o, [f], LAND.owner)).ok).toBe(true);
        return ok({ land: 1 });
      } }),
      stage({ id: STAGES.S3, inputs: ['land'], outputs: ['s3'], run: (_i, ctx) => {
        ctx.batch({ level: 1, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.insertChain(o, [pt(10_000, 0), pt(10_000, SIDE)], [{ role: 'way', entity: 'way:k' }], 'mandatory'));
        counts.made = l1(ctx);
        return ok({ s3: 1 });
      } }),
      stage({ id: STAGES.S6, inputs: ['s3'], outputs: ['s6'], run: (_i, ctx) => ((counts.afterLater = clear(ctx)), ok({ s6: 1 })) }),
    ]), bp(1), ALL, { arenas: ARENAS });
    expect(counts.made).toBe(2);
    expect(counts.afterLater).toBe(2);
    run(registryOf([
      stage({ id: STAGES.S1, outputs: ['land'], run: (_i, ctx) => {
        ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.insertChain(o, ring, [{ role: 'margin', entity: 't' }], 'mandatory', { closed: true }));
        const f = ctx.kernel.view({ layer: 'ground', part: 0 }, 0).faces()[0];
        ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.setOwner(o, [f], LAND.owner));
        return ok({ land: 1 });
      } }),
      stage({ id: STAGES.S3, inputs: ['land'], run: (_i, ctx) => {
        ctx.batch({ level: 1, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.insertChain(o, [pt(10_000, 0), pt(10_000, SIDE)], [{ role: 'way', entity: 'way:k' }], 'mandatory'));
        counts.own = clear(ctx);
        return ok({});
      } }),
    ]), bp(1), ALL, { arenas: ARENAS });
    expect(counts.own).toBe(0);
  });
});

describe('work limits from the laws and expect from the invariants (§3.3, §5.1 (5), M0-f-03a)', () => {
  /** The work the S1 ring batch charges (read once). */
  const ringWork = (): number => {
    let w = -1;
    run(registryOf([ringStage()]), bp(1), ALL, { arenas: ARENAS, observe: (_s, rec) => (w = rec.work) });
    return w;
  };

  it("the batch's workLimit is the stage's law for its counter over the batch's committed counts: exactly the work passes, one less is E_WORK_LIMIT", () => {
    const w = ringWork();
    expect(w).toBeGreaterThan(2);
    const law = (counter: string) => ({ counter, unit: 'faces' as const, perUnit: 2, floor: w - 6 });
    const at = (faces: number, counter = 'ring') => run(registryOf([stage({
      id: STAGES.S1,
      workLimits: [{ counter: 'other', unit: 'faces', perUnit: 0, floor: 0 }, law('ring')],
      run: (_i, ctx) => {
        const r = ctx.batch({ level: 0, counter, counts: { faces } }, (o) => ctx.kernel.geom.insertChain(o, [pt(0, 0), pt(SIDE, 0), pt(SIDE, SIDE), pt(0, SIDE)], [{ role: 'margin', entity: 'terrain:ground' }], 'mandatory', { closed: true }));
        return r.ok ? ok({}) : err(r.code, r.detail);
      },
    })]), bp(1), ALL, { arenas: ARENAS }).report;
    const exact = at(3);
    expect(exact.bugs).toEqual([]);
    expect(exact.kernel.workLimitHits).toBe(0);
    expect(exact.stages[0].work).toEqual({ other: 0, ring: w });
    const short = at(2);
    expect(short.kernel.workLimitHits).toBe(1);
    expect(short.bugs.map((b) => b.cls)).toEqual(['E_WORK_LIMIT']);
    expect(short.stages[0].work).toEqual({ other: 0, ring: w - 2 });
    // The other law (floor 0) refuses the same batch.
    expect(at(3, 'other').kernel.workLimitHits).toBe(1);
  });

  it('a counter the stage declares no law for is refused', () => {
    expect(() => run(registryOf([stage({ id: STAGES.S1, run: (_i, ctx) => (ctx.batch({ level: 0, counter: 'nope', counts: COUNTS }, () => ok(0)), ok({})) })]), bp(1), ALL, { arenas: ARENAS })).toThrow(/no work-limit law 'nope'/);
  });

  const rows: Invariant[] = [
    { name: 'fx.holds', scope: 'batch', class: 'hard', kind: 'check', check: 'holds' },
    { name: 'fx.fails', scope: 'batch', class: 'hard', kind: 'check', check: 'fails' },
    { name: 'fx.soft', scope: 'batch', class: 'soft', kind: 'check', check: 'fails' },
    { name: 'fx.stage', scope: 'stage', class: 'hard', kind: 'check', check: 'fails' },
  ];
  const env = { checks: { holds: () => null, fails: () => 'no' } };

  it("expect is the stage's batch-scope hard rows: a failing one rejects the batch (E_INVARIANT) and reports pass false; the others are the stage's to report", () => {
    let code = '';
    const { report } = run(registryOf([stage({
      id: STAGES.S1,
      invariants: rows,
      run: (_i, ctx) => {
        const r = ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.insertChain(o, [pt(0, 0), pt(SIDE, 0), pt(SIDE, SIDE), pt(0, SIDE)], [{ role: 'margin', entity: 't' }], 'mandatory', { closed: true }));
        code = r.ok ? 'ok' : `${r.code} ${r.detail}`;
        ctx.report.invariant('fx.soft', true);
        ctx.report.invariant('fx.stage', false);
        ctx.report.invariant('fx.stage', true);
        expect(() => ctx.report.invariant('fx.fails', true)).toThrow(/batch-scope hard row/);
        expect(() => ctx.report.invariant('fx.none', true)).toThrow(/declares no invariant/);
        return ok({});
      },
    })]), bp(1), ALL, { arenas: ARENAS, env });
    expect(code).toBe('E_INVARIANT fx.fails: no');
    expect(report.stages[0].invariants).toEqual([
      { name: 'fx.holds', scope: 'batch', pass: true, count: 1 },
      { name: 'fx.fails', scope: 'batch', pass: false, count: 1 },
      { name: 'fx.soft', scope: 'batch', pass: true, count: 1 },
      { name: 'fx.stage', scope: 'stage', pass: false, count: 2 },
    ]);
  });

  it('a batch holding every hard row commits and each row reports its evaluations', () => {
    const { report } = run(registryOf([ringStage({ invariants: [rows[0]] })]), bp(1), ALL, { arenas: ARENAS, env });
    expect(report.bugs).toEqual([]);
    expect(report.stages[0].invariants).toEqual([{ name: 'fx.holds', scope: 'batch', pass: true, count: 1 }]);
  });
});

describe('stage ranks: every face carries the rank of the stage whose batch created it (§3.3 kept content)', () => {
  it('on the drawn stages, which insert chains at L0 and L1', () => {
    const creator = new Map<string, string>();
    const { model } = runDrawn(11, {
      observe: (s, rec) => {
        for (const lv of rec.faces) {
          for (const f of lv.removed) creator.delete(`${String(lv.level)}:${String(f)}`);
          for (const f of lv.created) creator.set(`${String(lv.level)}:${String(f)}`, s);
        }
      },
    });
    expect([...model.ranks]).toEqual([['S1', 0], ['S3', 1], ['S4', 2], ['S5', 3], ['S6', 4], ['S8', 5]]);
    const p = model.plats.get('ground/0');
    if (p === undefined) throw new Error('no ground arena');
    const live = liveFaces(p);
    expect(live.length).toBeGreaterThan(6);
    const seen = new Set<string>();
    for (const key of live) {
      const s = creator.get(key);
      expect(s, `face ${key} was created by no batch`).toBeDefined();
      const [l, f] = key.split(':').map(Number);
      expect(p.faces[l as 0].stage[f], `face ${key}`).toBe(model.ranks.get(s as string));
      seen.add(s as string);
    }
    // Every stage's batch left faces of its own rank (S1's at L0, the rest at L1).
    expect([...seen].sort()).toEqual(['S1', 'S3', 'S4', 'S5', 'S6', 'S8']);
  });

  it('the kernel reads the same ranks: a re-own by a later stage writes that stage\'s rank (env.rankOf is the order\'s)', () => {
    let face = -1;
    const { model } = run(registryOf([
      ringStage(),
      stage({ id: STAGES.S6, inputs: ['x'], run: (_i, ctx) => {
        const p = ctx.kernel.plat({ layer: 'ground', part: 0 });
        face = ctx.kernel.view({ layer: 'ground', part: 0 }, 0).faces()[0];
        const r = ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.setOwner(o, [face], 'district:a'));
        expect(r.ok).toBe(true);
        expect(p.faces[0].stage[face]).toBe(2);
        return ok({});
      } }),
      stage({ id: STAGES.S2, outputs: ['x'] }),
    ]), bp(1), ALL, { arenas: ARENAS });
    expect(model.order).toEqual(['S1', 'S2', 'S6']);
    expect(model.ranks.get('S6')).toBe(2);
    expect(model.plats.get('ground/0')?.faces[0].stage[face]).toBe(2);
  });
});

describe("the stage's streams (§6.1, §14 StageContext.stream; C-0147)", () => {
  it('are keyed by the stage id and the town root\'s cached entity key; a second request continues the same stream', () => {
    const got: { first: number; same: boolean; next: number }[] = [];
    let town: Readonly<Hash128> | undefined;
    const { model } = run(registryOf([stage({ id: STAGES.S5, streamKeys: ['growth.heading'], run: (_i, ctx) => {
      const a = townStream(ctx, 'growth.heading');
      const first = a.u32();
      const b = townStream(ctx, 'growth.heading');
      got.push({ first, same: a === b, next: b.u32() });
      town = ctx.seedKey;
      return ok({});
    } })]), bp(42), ALL);
    const fresh = createRng().stream(model.town.entityKey, STAGES.S5, CONCERNS['growth.heading'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
    expect(got).toEqual([{ first: fresh.u32(), same: true, next: fresh.u32() }]);
    expect(town).toBeDefined();
    expect(model.town.identity.kind).toBe('town');
  });

  it('a stream request with the same concern from another stage is another stream (the stage id is in the key)', () => {
    const firsts = new Map<string, number>();
    run(registryOf([
      stage({ id: STAGES.S5, streamKeys: ['route'], run: (_i, ctx) => (firsts.set('S5', townStream(ctx, 'route').u32()), ok({})) }),
      stage({ id: STAGES.S4, streamKeys: ['route'], run: (_i, ctx) => (firsts.set('S4', townStream(ctx, 'route').u32()), ok({})) }),
    ]), bp(42), ALL);
    expect(firsts.get('S4')).not.toBe(firsts.get('S5'));
  });

  it("a concern the stage's streamKeys do not declare, and a handle no entity is bound to, are refused", () => {
    expect(() => run(registryOf([stage({ id: STAGES.S5, streamKeys: ['route'], run: (_i, ctx) => (townStream(ctx, 'growth.heading'), ok({})) })]), bp(1), ALL)).toThrow(/streamKeys do not declare/);
    expect(() => run(registryOf([stage({ id: STAGES.S5, streamKeys: ['route'], run: (_i, ctx) => (ctx.stream(CONCERNS.route, 9 as Handle, ctx.streamOpts(CONCERNS.route, 0)), ok({})) })]), bp(1), ALL)).toThrow(/no entity of this derivation is bound/);
  });

  it("bind gives a minted entity a handle whose stream is its cached key's and whose default reroll is its own", () => {
    let seen: { first: number; reroll: number; again: Handle; h: Handle } | undefined;
    const { model } = run(registryOf([stage({ id: STAGES.S10, streamKeys: ['plot.width'], run: (_i, ctx) => {
      const [m] = mint([{ kind: 'plot', key: { arena: { layer: 'ground', part: 0 }, unit: null, stage: STAGES.S10, epoch: 0, index: 3, reroll: 0 }, reroll: 4 }], [], [], ctx.seedKey);
      const h = ctx.bind(m);
      const opts = ctx.streamOpts(CONCERNS['plot.width'], h);
      seen = { first: ctx.stream(CONCERNS['plot.width'], h, opts).u32(), reroll: opts.reroll, again: ctx.bind(m), h };
      const fresh: Stream = createRng().stream(m.entityKey, STAGES.S10, CONCERNS['plot.width'], { reroll: 4, attempt: 0, epoch: 0, salt: 0 });
      expect(seen.first).toBe(fresh.u32());
      return ok({});
    } })]), bp(3), ALL);
    expect(seen?.reroll).toBe(4);
    expect(seen?.h).toBe(1);
    expect(seen?.again).toBe(seen?.h);
    expect(model.town.identity.id).toMatch(/^town:/);
  });
});

describe('determinism through the model digest (§6.2, M0-d-04)', () => {
  it('two runs of the same fixture blueprint and seed give identical model digests, stage roots and reports', () => {
    const a = runDrawn(5);
    const b = runDrawn(5);
    expect([...a.model.root]).toEqual([...b.model.root]);
    expect([...a.model.stageRoots]).toEqual([...b.model.stageRoots]);
    expect(a.report).toEqual(b.report);
    expect([...a.model.digest.recomputeRoot()]).toEqual([...a.model.root]);
  });

  it('the digest covers what the stages wrote: another seed moves the root, and every stage end moves it', () => {
    const a = runDrawn(5);
    const c = runDrawn(6);
    expect([...c.model.root]).not.toEqual([...a.model.root]);
    const roots = [...a.model.stageRoots.values()].map((h) => h.join(','));
    expect(new Set(roots).size).toBe(roots.length);
  });
});

describe('per-stage rerolls (C-0090; §6.1 the reroll component)', () => {
  const SEED = 9;

  it('rerolls { S5: 1 } changes only the S5 stage streams\' draws: every other stage\'s draws, and the roots before S5, equal the run without it', () => {
    const base = runDrawn(SEED);
    const re = runDrawn(SEED, { rerolls: { S5: 1 } });
    for (const key of ['terrain', 'reservations', 'arterials', 'districts', 'lanes']) {
      expect(drawsOf(re.model.data, key), key).toEqual(drawsOf(base.model.data, key));
      expect(drawsOf(re.model.data, key), key).toBeDefined();
    }
    expect(drawsOf(re.model.data, 'network')).not.toEqual(drawsOf(base.model.data, 'network'));
    for (const s of ['S1', 'S3', 'S4']) expect(re.model.stageRoots.get(s)?.join(','), s).toBe(base.model.stageRoots.get(s)?.join(','));
    expect(re.model.stageRoots.get('S5')?.join(',')).not.toBe(base.model.stageRoots.get('S5')?.join(','));
    // The reroll is the stream key's reroll component (§6.1's mixer: stage and reroll keyed together).
    const fresh = createRng().stream(re.model.town.entityKey, STAGES.S5, CONCERNS['growth.heading'], { reroll: 1, attempt: 0, epoch: 0, salt: 0 });
    expect(drawsOf(re.model.data, 'network')).toEqual([fresh.u32(), fresh.u32()]);
  });

  it("the stage's default options carry the reroll for the town root only; a ladder use's key shows it", () => {
    const opts: Record<string, number> = {};
    const { report } = run(registryOf([stage({ id: STAGES.S5, streamKeys: ['growth.heading'], run: (_i, ctx) => {
      const c = CONCERNS['growth.heading'];
      const o = ctx.streamOpts(c, 0, 1);
      opts.reroll = o.reroll;
      opts.attempt = o.attempt;
      opts.epoch = o.epoch;
      opts.salt = o.salt;
      ctx.report.ladderUse({ cause: 'F-ROUTE', rung: 1, tier: 3, entity: 0, concern: c, opts: o });
      return ok({});
    } }), stage({ id: STAGES.S4, streamKeys: ['route'], run: (_i, ctx) => {
      opts.s4 = ctx.streamOpts(CONCERNS.route, 0).reroll;
      return ok({});
    } })]), bp(2), ALL, { rerolls: { S5: 3 } });
    expect(opts).toEqual({ reroll: 3, attempt: 1, epoch: 0, salt: 0, s4: 0 });
    const town = report.stages[1].ladderUses[0].entity;
    expect(report.stages[1].ladderUses).toEqual([{ cause: 'F-ROUTE', rung: 1, tier: 3, entity: town, key: `S5/growth.heading@${town}/r=3/a=1` }]);
    expect(report.stages[1].attempts).toBe(1);
  });

  it('a rerolls entry naming no stage of the order, or a count that is no u16, is refused', () => {
    expect(() => runDrawn(1, { rerolls: { S9: 1 } })).toThrow(/rerolls names 'S9'/);
    expect(() => runDrawn(1, { rerolls: { S5a: 1 } })).toThrow(/rerolls names 'S5a'/);
    expect(() => runDrawn(1, { rerolls: { S5: -1 } })).toThrow(/no u16/);
    expect(() => runDrawn(1, { rerolls: { S5: 1.5 } })).toThrow(/no u16/);
    expect(() => runDrawn(1, { rerolls: { S5: 0x10000 } })).toThrow(/no u16/);
    expect(runDrawn(1, { rerolls: { S5: 0xffff } }).report.bugs).toEqual([]);
  });
});

/** The report a derivation that meets only missing inputs gives: every field, every list [], every stage whole. */
function wholeOn(report: GenerationReport): void {
  expect(Object.keys(report)).toEqual([...REPORT_FIELDS]);
  for (const k of REPORT_LISTS) expect(Array.isArray(report[k]), k).toBe(true);
  for (const s of report.stages) {
    expect(Object.keys(s)).toEqual(['name', 'work', 'attempts', 'warnings', 'ladderUses', 'invariants']);
    expect(Array.isArray(s.ladderUses) && Array.isArray(s.invariants)).toBe(true);
  }
}

describe("the generation report's schema (§5.4: a whole report with [] lists when inputs are missing)", () => {
  it('a derivation whose stages meet missing inputs gives the whole report, every list []', () => {
    const { model, report } = runDrawn(4, {}, true);
    wholeOn(report);
    expect([...model.data.keys()]).toEqual(['blueprint']);
    expect(report).toEqual({
      outputVersion: OUTPUT_VERSION,
      recipe: { seed: 4, rung: 'CITY' },
      stages: ['S1', 'S3', 'S4', 'S5', 'S6', 'S8'].map((name) => ({ name, work: { 'fixture.ops': 0 }, attempts: 0, warnings: {}, ladderUses: [], invariants: [] })),
      requested: [],
      prefix: [],
      requestedVsBuilt: [],
      autoResolved: [],
      unserved: [],
      unplaced: [],
      bugs: [],
      dossier: [],
      dossierNotes: [],
      epochs: [],
      changes: [],
      kernel: { engine: ENGINE_ID, warnings: {}, downgrades: 0, workLimitHits: 0 },
    });
  });

  it('an empty registry gives the whole report with no stage', () => {
    const { report, model } = run(createRegistry(), bp(1), ALL, { outputVersion: 'v-test' });
    wholeOn(report);
    expect(report.stages).toEqual([]);
    expect(report.outputVersion).toBe('v-test');
    expect(model.order).toEqual([]);
  });

  it('every declared row and counter appears, unevaluated, on a stage that ran no batch', () => {
    const inv: Invariant = { name: 'fx', scope: 'stage', class: 'soft', kind: 'check', check: 'x' };
    const { report } = run(registryOf([stage({ id: STAGES.S2, invariants: [inv], workLimits: [{ counter: 'b', unit: 'faces', perUnit: 0, floor: 1 }, { counter: 'a', unit: 'faces', perUnit: 0, floor: 1 }] })]), bp(1), ALL);
    expect(report.stages[0]).toEqual({ name: 'S2', work: { a: 0, b: 0 }, attempts: 0, warnings: {}, ladderUses: [], invariants: [{ name: 'fx', scope: 'stage', pass: true, count: 0 }] });
    expect(Object.keys(report.stages[0].work)).toEqual(['a', 'b']);
  });

  it("carries what the stages write through the sink, in order, and the kernel's warnings by code", () => {
    const { report } = run(registryOf([
      stage({ id: STAGES.S3, run: (_i, ctx) => {
        ctx.report.warning('W_ZED');
        ctx.report.warning('W_ALPHA', 2);
        ctx.report.warning('W_ZED', 3);
        ctx.report.requested({ feature: 'river', delivered: 'degraded', tier: 4, cause: 'F-RIVER' });
        ctx.report.autoResolved({ param: 'gates', value: 3, reason: 'rung', layer: 'preset' });
        ctx.report.unserved('way:x');
        ctx.report.unplaced('plot:y');
        ctx.report.unserved('way:w');
        expect(() => ctx.report.warning('W_BAD', -1)).toThrow(/not a whole number/);
        expect(() => ctx.report.warning('')).toThrow(/names its code/);
        return { ok: true, value: {}, warnings: [{ code: 'W_DOWNGRADE', count: 2 }, { code: 'W_ATTRACTED', count: 1 }] } as KernelResult<unknown>;
      } }),
      stage({ id: STAGES.S4, streamKeys: ['route'], run: (_i, ctx) => {
        ctx.report.bug({ cls: 'F-NUM', entity: 0, concern: CONCERNS.route, opts: ctx.streamOpts(CONCERNS.route, 0, 2) });
        ctx.report.ladderUse({ cause: 'F-ROUTE', code: 'unserved', rung: 2, tier: 6, entity: 0, concern: CONCERNS.route, opts: ctx.streamOpts(CONCERNS.route, 0) });
        return { ok: true, value: {}, warnings: [{ code: 'W_DOWNGRADE', count: 1 }] } as KernelResult<unknown>;
      } }),
    ]), bp(1), ALL);
    const town = report.stages[1].ladderUses[0].entity;
    expect(report.stages[0].warnings).toEqual({ W_ALPHA: 2, W_ZED: 4 });
    expect(Object.keys(report.stages[0].warnings)).toEqual(['W_ALPHA', 'W_ZED']);
    expect(report.requested).toEqual([{ feature: 'river', delivered: 'degraded', tier: 4, cause: 'F-RIVER' }]);
    expect(report.autoResolved).toEqual([{ param: 'gates', value: 3, reason: 'rung', layer: 'preset' }]);
    expect(report.unserved).toEqual(['way:x', 'way:w']);
    expect(report.unplaced).toEqual(['plot:y']);
    expect(report.bugs).toEqual([{ cls: 'F-NUM', entity: town, key: `S4/route@${town}/a=2`, stage: 'S4' }]);
    expect(report.stages[1].ladderUses).toEqual([{ cause: 'F-ROUTE', code: 'unserved', rung: 2, tier: 6, entity: town, key: `S4/route@${town}` }]);
    expect(report.stages[1].attempts).toBe(0);
    expect(report.kernel).toEqual({ engine: ENGINE_ID, warnings: { W_ATTRACTED: 1, W_DOWNGRADE: 3 }, downgrades: 3, workLimitHits: 0 });
  });
});

describe('no restart path (§5.1 (1)): a refused stage is a bug entry, never a re-run', () => {
  it('a stage whose run is refused writes no output and one bug entry; every stage still runs exactly once', () => {
    CALLS.clear();
    const seen: Inputs[] = [];
    const { model, report } = run(registryOf([
      stage({ id: STAGES.S1, outputs: ['a'], run: () => ok({ a: 1 }) }),
      stage({ id: STAGES.S4, inputs: ['a'], outputs: ['b'], run: () => err('E_DEGENERATE', 'fixture') }),
      stage({ id: STAGES.S6, inputs: ['b'], outputs: ['c'], run: (i) => (seen.push(i), ok({ c: 2 })) }),
    ]), bp(1), ALL);
    expect([...CALLS.values()]).toEqual([1, 1, 1]);
    expect(seen).toEqual([{ b: undefined }]);
    expect(model.data.has('b')).toBe(false);
    expect(model.data.get('c')).toBe(2);
    expect(report.bugs).toEqual([{ cls: 'E_DEGENERATE', entity: model.town.identity.id, key: `S4@${model.town.identity.id}`, stage: 'S4' }]);
    wholeOn(report);
  });

  it('the runner holds one forward pass over the order and calls a stage\'s run at one place (no re-entry above a stage)', () => {
    const src = readFileSync(new URL('../../../src/pipeline/runner.ts', import.meta.url), 'utf8');
    const code = src.split('\n').filter((l) => !l.trim().startsWith('//')).join('\n');
    expect(code.match(/\.run\(/g)).toHaveLength(1);
    expect(code.match(/\bfor \(const id of order\)/g)).toHaveLength(1);
    expect(code).not.toMatch(/\bwhile\b|\bdo \{|retry|restart|\.inputsOf\([^)]*\)[\s\S]*\.inputsOf\(/);
    expect(code.match(/\bstageOrder\(/g)).toHaveLength(1);
  });

  it('a stage that throws ends the run (a programming error), never a retry: earlier stages ran once and nothing re-ran', () => {
    CALLS.clear();
    const r = registryOf([stage({ id: STAGES.S1, outputs: ['a'], run: () => ok({ a: 1 }) }), stage({ id: STAGES.S4, inputs: ['a'], run: () => { throw new Error('boom'); } })]);
    expect(() => run(r, bp(1), ALL)).toThrow('boom');
    expect([...CALLS.entries()]).toEqual([[STAGES.S1, 1], [STAGES.S4, 1]]);
  });

  it('the town root is the derivation\'s first handle and every live face of a fixture run is valid', () => {
    const { model } = runDrawn(3);
    const p = model.plats.get('ground/0');
    expect(p).toBeDefined();
    if (p === undefined) return;
    for (const key of liveFaces(p)) {
      const [l, f] = key.split(':').map(Number);
      expect(isFaceLive(p, l as 0, f)).toBe(true);
    }
    expect(model.kernel.view({ layer: 'ground', part: 0 }, 1).faces()).toHaveLength(7);
  });
});
