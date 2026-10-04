// M0-m-01: the stage types (§4.12, §5.1 (5), §3.3, §14; C-0003) — WorkLimitLaw's limit = floor + perUnit × count and
// its log2 variant (lawLimit, with fast-check properties at PLAT_FUZZ_RUNS); StageDecl, StageHookDecl, Stage,
// StageContext, Scope and BatchScope carry the design's fields; a StageContext binds its environment's slots (the
// hand-built context a stage test below @plat/layout uses, C-0123 (1)); STAGE_IDS is C-0020's order and DATA_KEYS
// §4.12's keys. Type assertions are checked by `corepack pnpm build`; the file runs under vitest.
import fc from 'fast-check';
import { describe, expect, expectTypeOf, it } from 'vitest';
import type { KernelResult } from '@plat/kernel';
import {
  DATA_KEYS,
  lawLimit,
  STAGE_IDS,
  type BatchScope,
  type ConcernId,
  type DataKey,
  type Destination,
  type GateSite,
  type Handle,
  type Id,
  type Invariant,
  type KnownDataKey,
  type Ladder,
  type Level,
  type PlatKey,
  type Polygon,
  type Rung,
  type Scope,
  type Stage,
  type StageContext,
  type StageDecl,
  type StageEnv,
  type StageHookDecl,
  type StageId,
  type StageName,
  type StreamOpts,
  type WaterSet,
  type WorkLimitLaw,
  type WorkLimits,
  type WorkUnit,
  type WaterBody,
  type Bridge,
  type PointCm,
  type Cdeg,
  type EditId,
  type EntityKind,
} from '../../src/index.js';

const law = (perUnit: number, floor: number, log2?: boolean): WorkLimitLaw =>
  log2 === undefined ? { counter: 'cut.kernelCalls', unit: 'faces', perUnit, floor } : { counter: 'cut.recursionDepth', unit: 'faces', perUnit, floor, log2 };

describe('WorkLimitLaw (§5.1 (5)): limit = floor + perUnit × count, log2 variant', () => {
  it('the linear form', () => {
    expect(lawLimit(law(3, 100), 0)).toBe(100);
    expect(lawLimit(law(3, 100), 1)).toBe(103);
    expect(lawLimit(law(3, 100), 1_500)).toBe(4_600);
    expect(lawLimit(law(1.5, 0), 220)).toBe(330);
    // a land-area count may be fractional; the limit is the exact double, unrounded
    expect(lawLimit({ counter: 'grower.turns', unit: 'landHa', perUnit: 40, floor: 64 }, 137.5)).toBe(5_564);
    expect(lawLimit(law(0.1, 0), 3)).toBe(0.1 * 3);
  });

  it('the log2 form uses ⌈log2(count)⌉; count 0 and 1 give the floor', () => {
    expect(lawLimit(law(2, 8, true), 0)).toBe(8);
    expect(lawLimit(law(2, 8, true), 1)).toBe(8);
    expect(lawLimit(law(2, 8, true), 2)).toBe(10);
    expect(lawLimit(law(2, 8, true), 3)).toBe(12);
    expect(lawLimit(law(2, 8, true), 4)).toBe(12);
    expect(lawLimit(law(2, 8, true), 5)).toBe(14);
    expect(lawLimit(law(2, 8, true), 1_024)).toBe(28);
    expect(lawLimit(law(2, 8, true), 1_025)).toBe(30);
    expect(lawLimit(law(1, 0, true), 2 ** 31)).toBe(31);
    expect(lawLimit(law(1, 0, true), 2 ** 31 + 1)).toBe(32);
    expect(lawLimit(law(1, 0, true), 0.5)).toBe(0); // a depth is never negative
    expect(lawLimit(law(1, 0, true), 2.5)).toBe(2);
    // log2: false is the linear form
    expect(lawLimit(law(2, 8, false), 5)).toBe(18);
  });

  it('property: the linear form is exactly floor + perUnit × count', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 1e7 }), fc.double({ min: 0, max: 1e3, noNaN: true }), fc.integer({ min: 0, max: 1e6 }), (count, perUnit, floor) => {
        expect(lawLimit({ counter: 'c', unit: 'vertices', perUnit, floor }, count)).toBe(floor + perUnit * count);
      }),
    );
  });

  it('property: the log2 form is floor + perUnit × k with 2^(k−1) < count ≤ 2^k (k = 0 for count ≤ 1), monotone in count', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 2 ** 40 }), fc.integer({ min: 0, max: 2 ** 40 }), (a, b) => {
        const k = lawLimit({ counter: 'c', unit: 'faces', perUnit: 1, floor: 0, log2: true }, a);
        expect(Number.isInteger(k)).toBe(true);
        if (a <= 1) expect(k).toBe(0);
        else {
          expect(2 ** k).toBeGreaterThanOrEqual(a);
          expect(2 ** (k - 1)).toBeLessThan(a);
        }
        const kb = lawLimit({ counter: 'c', unit: 'faces', perUnit: 1, floor: 0, log2: true }, b);
        if (a <= b) expect(k).toBeLessThanOrEqual(kb);
      }),
    );
  });

  it('refuses a negative, NaN or infinite count, and a law whose floor or perUnit is not finite', () => {
    expect(() => lawLimit(law(1, 0), -1)).toThrow(RangeError);
    expect(() => lawLimit(law(1, 0), Number.NaN)).toThrow(RangeError);
    expect(() => lawLimit(law(1, 0), Number.POSITIVE_INFINITY)).toThrow(RangeError);
    expect(() => lawLimit(law(Number.NaN, 0), 1)).toThrow(RangeError);
    expect(() => lawLimit(law(1, Number.POSITIVE_INFINITY), 1)).toThrow(RangeError);
  });

  it('WorkLimitLaw and WorkUnit carry §5.1 (5)\'s fields and units', () => {
    expectTypeOf<WorkLimitLaw>().toEqualTypeOf<{ counter: string; unit: WorkUnit; perUnit: number; floor: number; log2?: boolean }>();
    expectTypeOf<WorkUnit>().toEqualTypeOf<
      'plots' | 'buildings' | 'households' | 'landHa' | 'frameCells' | 'latticeNodes' | 'faces' | 'vertices' | 'moduleCells'
    >();
    expectTypeOf<WorkLimits>().toEqualTypeOf<WorkLimitLaw[]>();
  });
});

describe('the stage declarations (§4.12, §14, §3.3)', () => {
  it('StageDecl carries §4.12\'s fields; Stage extends it with §14\'s three; StageHookDecl §4.12\'s', () => {
    expectTypeOf<keyof StageDecl>().toEqualTypeOf<
      'id' | 'inputs' | 'outputs' | 'streamKeys' | 'invariants' | 'ladder' | 'workLimits' | 'budgetMs' | 'batch' | 'lineageUnit' | 'lazy' | 'txForm' | 'phase'
    >();
    expectTypeOf<StageDecl['id']>().toEqualTypeOf<StageId>();
    expectTypeOf<StageDecl['invariants']>().toEqualTypeOf<Invariant[]>();
    expectTypeOf<StageDecl['budgetMs']>().toEqualTypeOf<Record<Rung, number>>();
    expectTypeOf<StageDecl['batch']>().toEqualTypeOf<BatchScope>();
    expectTypeOf<StageDecl['lineageUnit']>().toEqualTypeOf<EntityKind>();
    expectTypeOf<StageDecl['txForm']>().toEqualTypeOf<'declared' | 'callback'>();
    expectTypeOf<StageDecl['phase']>().toEqualTypeOf<'main' | 'tail' | undefined>();
    expectTypeOf<StageDecl['ladder']>().toEqualTypeOf<Ladder>();
    expectTypeOf<Stage<number, string>>().toMatchTypeOf<StageDecl>();
    expectTypeOf<Exclude<keyof Stage<number, string>, keyof StageDecl>>().toEqualTypeOf<'version' | 'inputsOf' | 'run'>();
    expectTypeOf<ReturnType<Stage<number, string>['run']>>().toEqualTypeOf<KernelResult<string>>();
    expectTypeOf<keyof StageHookDecl>().toEqualTypeOf<'host' | 'id' | 'inputs' | 'outputs' | 'streamKeys' | 'run'>();
    expectTypeOf<ReturnType<StageHookDecl['run']>>().toEqualTypeOf<KernelResult<void>>();
    expectTypeOf<DataKey>().toEqualTypeOf<string>();
    expectTypeOf<Rung>().toEqualTypeOf<'TOWN' | 'CITY' | 'METROPOLIS' | 'THORP' | 'HAMLET' | 'VILLAGE'>();
  });

  it('Scope is §14\'s and BatchScope §3.3\'s', () => {
    expectTypeOf<Scope>().toEqualTypeOf<
      | { kind: 'all' }
      | { kind: 'entities'; ids: Id[] }
      | { kind: 'region'; ring: Polygon; key: PlatKey; level: Level }
      | { kind: 'epoch'; epoch: number }
    >();
    expectTypeOf<BatchScope>().toEqualTypeOf<
      | { kind: 'stage'; stage: StageId }
      | { kind: 'district'; id: Id }
      | { kind: 'block'; id: Id }
      | { kind: 'edit'; edit: EditId }
      | { kind: 'entity'; id: Id }
    >();
  });

  it('the strategy interfaces\' types are §4.12\'s', () => {
    expectTypeOf<WaterSet>().toEqualTypeOf<{ bodies: WaterBody[]; bridges: Bridge[] }>();
    expectTypeOf<Destination>().toEqualTypeOf<{ id: Id; kind: string; at: PointCm; bearingCdeg?: Cdeg }>();
    expectTypeOf<GateSite>().toEqualTypeOf<{ ordinal: number; at: PointCm; bearingCdeg: Cdeg; kind: 'main' | 'water' | 'harbour'; forced: boolean }>();
  });

  it('StageContext carries §14\'s fields; a package binds its environment once (a hand-built context, as a stage test below @plat/layout builds it)', () => {
    expectTypeOf<keyof StageContext>().toEqualTypeOf<'doc' | 'plats' | 'stream' | 'streamOpts' | 'tables' | 'rung' | 'report' | 'scope' | 'epoch'>();
    expectTypeOf<keyof StageEnv>().toEqualTypeOf<'doc' | 'plat' | 'stream' | 'kernel' | 'tables' | 'rung' | 'report' | 'model'>();
    // an environment that binds the slots to concrete stand-in types
    interface TestEnv extends StageEnv {
      doc: null;
      plat: { key: PlatKey };
      stream: { next(): number };
      kernel: { name: 'k' };
      tables: { get(table: string, key: string): unknown };
      rung: { rung: Rung };
      report: string[];
      model: Map<string, unknown>;
    }
    expectTypeOf<StageContext<TestEnv>['plats']>().toEqualTypeOf<Record<string, { key: PlatKey }>>();
    expectTypeOf<ReturnType<StageContext<TestEnv>['stream']>>().toEqualTypeOf<{ next(): number }>();
    expectTypeOf<Parameters<Stage<number, number, TestEnv>['inputsOf']>[0]>().toEqualTypeOf<Map<string, unknown>>();
    expectTypeOf<Parameters<StageHookDecl<TestEnv>['run']>[1]>().toEqualTypeOf<{ name: 'k' }>();
    const report: string[] = [];
    let draws = 0;
    const ctx: StageContext<TestEnv> = {
      doc: null,
      plats: { 'ground/0': { key: { layer: 'ground', part: 0 } } },
      stream: (concern: ConcernId, entity: Handle, opts: StreamOpts) => ({ next: () => (draws += 1) + concern + entity + opts.reroll }),
      streamOpts: (_concern: ConcernId, _entity: Handle, attempt?: number) => ({ reroll: 0, attempt: attempt ?? 0, epoch: 0, salt: 0 }),
      tables: { get: () => undefined },
      rung: { rung: 'CITY' },
      report,
      epoch: 0,
    };
    const stage: Stage<number, number, TestEnv> = {
      id: 1 as StageId,
      inputs: ['terrain'],
      outputs: ['water'],
      streamKeys: ['water.river'],
      invariants: [{ name: 'water ∩ footprints = ∅', scope: 'batch', class: 'hard', kind: 'check', check: 'waterFootprints' }],
      ladder: [{ failureClass: 'F-RIVER', rungs: ['carve-deeper', 're-trace', 'move-inlet'] }],
      workLimits: [{ counter: 'hydro.cells', unit: 'frameCells', perUnit: 1.5, floor: 1_000 }],
      budgetMs: { TOWN: 10, CITY: 20, METROPOLIS: 30, THORP: 1, HAMLET: 1, VILLAGE: 2 },
      batch: { kind: 'stage', stage: 1 as StageId },
      lineageUnit: 'town',
      lazy: false,
      txForm: 'callback',
      version: '0',
      inputsOf: (model) => model.size,
      run: (input, c) => {
        c.report.push(`S1 ran on ${input}`);
        const s = c.stream(7 as ConcernId, 0, c.streamOpts(7 as ConcernId, 0));
        return { ok: true, value: input + s.next(), warnings: [] };
      },
    };
    const r = stage.run(stage.inputsOf(new Map([['a', 1]]), { kind: 'all' }), ctx);
    expect(r).toEqual({ ok: true, value: 1 + 1 + 7 + 0 + 0, warnings: [] });
    expect(report).toEqual(['S1 ran on 1']);
    expect(lawLimit(stage.workLimits[0] as WorkLimitLaw, 400)).toBe(1_600);
  });
});

describe('the stage and data-key vocabularies', () => {
  it('STAGE_IDS is C-0020\'s registration order: §4.1\'s drawn order, then S7c, S9b, S8.seed', () => {
    expect([...STAGE_IDS]).toEqual([
      'S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S7b', 'SKY', 'S12a', 'S8', 'S9', 'S10a', 'S10', 'S10b', 'S11',
      'S12b', 'S12c', 'S13a', 'S14', 'S15', 'S7c', 'S9b', 'S8.seed',
    ]);
    expect(new Set(STAGE_IDS).size).toBe(STAGE_IDS.length);
    expect(Object.isFrozen(STAGE_IDS)).toBe(true);
    expectTypeOf<'S8.seed'>().toMatchTypeOf<StageName>();
    expectTypeOf<'S13b'>().not.toMatchTypeOf<StageName>(); // view data, never a stage (§4.1)
  });

  it('DATA_KEYS is §4.12\'s list; DataKey stays open for a stage\'s own keys', () => {
    expect([...DATA_KEYS]).toEqual(['terrain', 'water', 'roster', 'reservations', 'reservations.landing', 'allocations', 'allocations.landing', 'raised']);
    expect(Object.isFrozen(DATA_KEYS)).toBe(true);
    expectTypeOf<KnownDataKey>().toMatchTypeOf<DataKey>();
    const own: DataKey = 'districts';
    expect(own).toBe('districts');
  });
});
