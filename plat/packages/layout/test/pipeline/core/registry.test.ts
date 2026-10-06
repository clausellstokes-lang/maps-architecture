// The StrategyRegistry and registration (M0-x-02; §4.12, §14 `StrategyRegistry`; §3.3 *Two op forms*; §4.1 the op form
// per stage; C-0077, C-0224 (1), (4)).
import { STAGE_VIEW, STAGES, type StageId } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { createRegistry, register, RegistrationError, type PipelineStage } from '../../../src/index.js';
import { stage } from './support.js';

/** §14's StrategyRegistry members, in its order. */
const MEMBERS = ['terrain', 'coast', 'river', 'manifest', 'network', 'enceinte', 'fabric', 'plots', 'sitePlan', 'building', 'evolution', 'sky', 'sewer', 'underground', 'hooks', 'products'];

/** A stage with one field replaced by a value its type does not allow (what a cast or a JSON declaration could hand in). */
function withField(field: string, value: unknown, id: StageId = STAGES.S4): PipelineStage {
  return { ...stage({ id }), [field]: value } as unknown as PipelineStage;
}

describe('the StrategyRegistry (§14)', () => {
  it("holds §14's members, each an empty Map, and the base product with no stage: no M0 stage is registered here (C-0077: the base table is M0-x-04's)", () => {
    const r = createRegistry();
    expect(Object.getOwnPropertyNames(r)).toEqual(MEMBERS);
    for (const m of MEMBERS) expect((r as unknown as Record<string, unknown>)[m]).toBeInstanceOf(Map);
    for (const m of MEMBERS.slice(0, 15)) expect(((r as unknown as Record<string, Map<unknown, unknown>>)[m]).size).toBe(0);
    expect([...r.products.keys()]).toEqual(['base']);
    const base = r.products.get('base');
    expect(base?.id).toBe('base');
    expect(base?.stages).toEqual([]);
    expect(base?.extraInputs.size).toBe(0);
  });

  it('two registries share nothing', () => {
    const a = createRegistry();
    const b = createRegistry();
    register(a, stage({ id: STAGES.S1 }));
    expect(b.products.get('base')?.stages).toEqual([]);
  });

  it('register adds the stage to the base product, in registration order', () => {
    const r = createRegistry();
    const s4 = stage({ id: STAGES.S4 });
    const s1 = stage({ id: STAGES.S1 });
    register(r, s4);
    register(r, s1);
    expect(r.products.get('base')?.stages).toEqual([s4, s1]);
  });
});

describe('register refuses a malformed declaration, leaving the registry as it was', () => {
  const refused = (s: PipelineStage, pattern: RegExp): void => {
    const r = createRegistry();
    register(r, stage({ id: STAGES.S1 }));
    expect(() => register(r, s)).toThrow(RegistrationError);
    expect(() => register(r, s)).toThrow(pattern);
    expect(r.products.get('base')?.stages.map((x) => x.id)).toEqual([STAGES.S1]);
  };

  it('a stage registered with both op forms — an ops list and a callback — is refused (an assertion, §3.3)', () => {
    refused(withField('txForm', ['declared', 'callback']), /exactly one op form.*never both/);
    refused(withField('txForm', 'both'), /never both/);
    refused(withField('txForm', undefined), /never both/);
  });

  it('either single form registers', () => {
    const r = createRegistry();
    register(r, stage({ id: STAGES.S3, txForm: 'declared' }));
    register(r, stage({ id: STAGES.S5, txForm: 'callback' }));
    expect(r.products.get('base')?.stages.map((s) => s.txForm)).toEqual(['declared', 'callback']);
  });

  it('a second stage with the same id', () => {
    refused(stage({ id: STAGES.S1, outputs: ['other'] }), /already registered/);
  });

  it('an id the stage-id registry does not hold, STAGE_VIEW, a fraction', () => {
    refused(withField('id', 4000), /no stage of the stage-id registry/);
    refused(withField('id', STAGE_VIEW), /no stage of the stage-id registry/);
    refused(withField('id', 4.5), /no stage of the stage-id registry/);
  });

  it("a tail stage is M6-U's; an unknown phase is refused; 'main' and no phase register", () => {
    refused(withField('phase', 'tail'), /notBuilt\('M6-U'\)/);
    refused(withField('phase', 'late'), /phase/);
    const r = createRegistry();
    register(r, withField('phase', 'main', STAGES.S2));
    register(r, stage({ id: STAGES.S3 }));
    expect(r.products.get('base')?.stages).toHaveLength(2);
  });

  it('inputs and outputs are lists of distinct, non-empty data keys', () => {
    refused(withField('inputs', ['a', 'a']), /inputs/);
    refused(withField('inputs', ['']), /inputs/);
    refused(withField('outputs', 'terrain'), /outputs/);
    refused(withField('outputs', ['b', 'b']), /outputs/);
  });

  it("stream keys name registered, unretired concerns (§6.1)", () => {
    refused(withField('streamKeys', ['no.such']), /no concern of the registry/);
    refused(withField('streamKeys', ['cut.side']), /retired concern/);
    refused(withField('streamKeys', ['route', 'route']), /streamKeys/);
  });

  it("invariant rows carry distinct names and §5.3's scope and class; work-limit laws distinct counters", () => {
    const row = { name: 'r', scope: 'batch', class: 'hard', kind: 'check', check: 'c' };
    refused(withField('invariants', [row, row]), /own non-empty name/);
    refused(withField('invariants', [{ ...row, scope: 'tile' }]), /scope and class/);
    refused(withField('invariants', [{ ...row, class: 'firm' }]), /scope and class/);
    const law = { counter: 'c', unit: 'faces', perUnit: 1, floor: 1 };
    refused(withField('workLimits', [law, law]), /own counter/);
    refused(withField('workLimits', [{ ...law, counter: '' }]), /own counter/);
  });

  it('a stage carries its version, inputsOf and run; lazy is a boolean', () => {
    refused(withField('run', undefined), /version, inputsOf and run/);
    refused(withField('inputsOf', 3), /version, inputsOf and run/);
    refused(withField('version', 1), /version, inputsOf and run/);
    refused(withField('lazy', 'no'), /lazy/);
  });
});
