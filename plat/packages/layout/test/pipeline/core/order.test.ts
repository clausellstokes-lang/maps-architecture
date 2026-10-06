// Kahn's order with the stage-id tie-break, and a cycle refused at registration (M0-x-02; §4.1 *Registration and
// order*, §4.12 *The pipeline order*, §17.1 (8); C-0020, C-0077, C-0224 (2)).
import fc from 'fast-check';
import { STAGE_REGISTRY, STAGES, stageText, type StageId } from '@plat/kernel';
import { STAGE_IDS } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { createRegistry, kahn, register, RegistrationError, stageOrder, type OrderNode } from '../../../src/index.js';
import { drawn, registerAll, stage } from './support.js';

const names = (ids: readonly StageId[]): string[] => ids.map((id) => stageText(id));

/** Every permutation of a short list. */
function permutations<T>(xs: readonly T[]): T[][] {
  if (xs.length <= 1) return [[...xs]];
  const out: T[][] = [];
  xs.forEach((x, i) => {
    for (const rest of permutations([...xs.slice(0, i), ...xs.slice(i + 1)])) out.push([x, ...rest]);
  });
  return out;
}

describe("Kahn's order over the declared I/O (§4.1, §17.1 (8))", () => {
  it("§4.1's six M0 stages declared with §4.1's I/O give §4.1's drawn order S1, S3, S4, S5, S6, S8 — whatever the registration order", () => {
    const perms = permutations(drawn());
    expect(perms).toHaveLength(720);
    for (const p of perms) {
      const r = createRegistry();
      registerAll(r, p);
      expect(names(stageOrder(r))).toEqual(['S1', 'S3', 'S4', 'S5', 'S6', 'S8']);
    }
  });

  it('the tie-break is the u16 stage id, not the name: independent S10, S2, S9 order S2, S9, S10 in every registration order', () => {
    const set = [stage({ id: STAGES.S10, outputs: ['a'] }), stage({ id: STAGES.S2, outputs: ['b'] }), stage({ id: STAGES.S9, outputs: ['c'] })];
    for (const p of permutations(set)) {
      const r = createRegistry();
      registerAll(r, p);
      expect(names(stageOrder(r))).toEqual(['S2', 'S9', 'S10']);
    }
  });

  it('the tie-break acts at every step among the ready stages, never as a final sort: S7 → S3 with S4 free orders S4, S7, S3', () => {
    const r = createRegistry();
    registerAll(r, [stage({ id: STAGES.S3, inputs: ['x'] }), stage({ id: STAGES.S7, outputs: ['x'] }), stage({ id: STAGES.S4 })]);
    expect(names(stageOrder(r))).toEqual(['S4', 'S7', 'S3']);
  });

  it('a key with two writers holds every reader after both; a stage reading a key it writes waits on the other writers only', () => {
    const r = createRegistry();
    registerAll(r, [
      stage({ id: STAGES.S6, inputs: ['network'] }),
      stage({ id: STAGES.S5, inputs: ['network'], outputs: ['network'] }),
      stage({ id: STAGES.S4, outputs: ['network'] }),
      stage({ id: STAGES.S2 }),
    ]);
    expect(names(stageOrder(r))).toEqual(['S2', 'S4', 'S5', 'S6']);
  });

  it("a key no stage writes (the blueprint before S0, a stage M0 does not build) adds no edge", () => {
    const r = createRegistry();
    registerAll(r, [stage({ id: STAGES.S8, inputs: ['roster'] }), stage({ id: STAGES.S3, inputs: ['blueprint'] })]);
    expect(names(stageOrder(r))).toEqual(['S3', 'S8']);
  });

  it("a product's extraInputs join a stage's declared inputs (§4.1's ProductDecl.extraInputs)", () => {
    const r = createRegistry();
    registerAll(r, [stage({ id: STAGES.S2 }), stage({ id: STAGES.S9, outputs: ['y'] })]);
    expect(names(stageOrder(r))).toEqual(['S2', 'S9']);
    r.products.get('base')?.extraInputs.set(STAGES.S2, ['y']);
    expect(names(stageOrder(r))).toEqual(['S9', 'S2']);
  });

  it('the product decides the set: an unregistered product is refused by name', () => {
    expect(() => stageOrder(createRegistry(), 'village')).toThrow(/no product 'village'/);
  });

  it("is the lexicographically smallest topological order by id (Kahn's with the id tie-break), for any registration order", () => {
    const ids = [STAGES.S1, STAGES.S3, STAGES.S4, STAGES.S5, STAGES.S6];
    const keys = ['a', 'b', 'c', 'd'];
    const nodeArb = fc.tuple(fc.subarray(keys), fc.subarray(keys));
    fc.assert(
      fc.property(fc.array(nodeArb, { minLength: ids.length, maxLength: ids.length }), fc.array(fc.nat(), { minLength: ids.length, maxLength: ids.length }), (io, shuffle) => {
        const nodes: OrderNode[] = io.map(([inputs, outputs], i) => ({ id: ids[i], inputs, outputs }));
        const edge = (p: OrderNode, c: OrderNode): boolean => p.id !== c.id && c.inputs.some((k) => p.outputs.includes(k));
        const topo = (o: readonly OrderNode[]): boolean => o.every((c, j) => o.every((p, i) => !(edge(p, c) && i > j)));
        const lexMin = permutations(nodes).filter(topo).map((o) => o.map((n) => n.id)).sort((x, y) => {
          for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return x[i] - y[i];
          return 0;
        })[0];
        const shuffled = nodes.map((n, i) => ({ n, k: shuffle[i] })).sort((a, b) => a.k - b.k || a.n.id - b.n.id).map((e) => e.n);
        const r = kahn(shuffled);
        if (lexMin === undefined) {
          // A cycle: every consecutive pair of the named cycle is an edge, and it starts at its smallest id.
          expect(r.ok).toBe(false);
          if (r.ok) return;
          const cyc = r.cycle.map((id) => nodes.find((n) => n.id === id) as OrderNode);
          cyc.forEach((n, i) => expect(edge(n, cyc[(i + 1) % cyc.length])).toBe(true));
          expect(Math.min(...r.cycle)).toBe(r.cycle[0]);
        } else {
          expect(r.ok && r.order).toEqual(lexMin);
        }
      }),
    );
  });
});

describe('a cycle is a registration error caught at load (§4.1)', () => {
  it('a planted two-stage cycle is refused at the registration that closes it, naming it; the registry is left as it was', () => {
    const r = createRegistry();
    register(r, stage({ id: STAGES.S3, inputs: ['b'], outputs: ['a'] }));
    let caught: unknown;
    try {
      register(r, stage({ id: STAGES.S4, inputs: ['a'], outputs: ['b'] }));
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeInstanceOf(RegistrationError);
    expect((caught as RegistrationError).cycle).toEqual(['S3', 'S4']);
    expect((caught as Error).message).toMatch(/closes a cycle in the declared inputs and outputs: S3 → S4 → S3 \(§4\.1\)/);
    expect(r.products.get('base')?.stages.map((s) => stageText(s.id))).toEqual(['S3']);
    expect(names(stageOrder(r))).toEqual(['S3']);
  });

  it('a planted three-stage cycle among acyclic stages is named in cycle order from its smallest id', () => {
    const r = createRegistry();
    registerAll(r, [stage({ id: STAGES.S1, outputs: ['t'] }), stage({ id: STAGES.S8, inputs: ['t', 'c'], outputs: ['a'] }), stage({ id: STAGES.S6, inputs: ['a'], outputs: ['b'] })]);
    expect(() => register(r, stage({ id: STAGES.S4, inputs: ['b'], outputs: ['c'] }))).toThrow(RegistrationError);
    try {
      register(r, stage({ id: STAGES.S4, inputs: ['b'], outputs: ['c'] }));
    } catch (e) {
      expect((e as RegistrationError).cycle).toEqual(['S4', 'S8', 'S6']);
    }
    expect(r.products.get('base')?.stages).toHaveLength(3);
  });

  it('a cycle planted past register (the stage set changed in place) is refused by stageOrder', () => {
    const r = createRegistry();
    register(r, stage({ id: STAGES.S3, inputs: ['b'], outputs: ['a'] }));
    r.products.get('base')?.stages.push(stage({ id: STAGES.S4, inputs: ['a'], outputs: ['b'] }));
    expect(() => stageOrder(r)).toThrow(/cycle: S3 → S4 → S3/);
  });

  it("a hook registration is refused by the order: hooks are declared, never registered before M2b (§4.12)", () => {
    const r = createRegistry();
    register(r, stage({ id: STAGES.S7b }));
    r.hooks.set('S7b.afterGreedy', [{ host: 'S7b.afterGreedy', id: STAGES.S7c, inputs: [], outputs: [], streamKeys: [], run: () => ({ ok: true, value: undefined, warnings: [] }) }]);
    expect(() => stageOrder(r)).toThrow(/notBuilt\('M2b'\)/);
    r.hooks.set('S7b.afterGreedy', []);
    expect(names(stageOrder(r))).toEqual(['S7b']);
  });
});

describe("the stage vocabularies agree (C-0142 (6)'s open case: M0-x-02 reads both)", () => {
  it("@plat/model's STAGE_IDS equals the kernel stage-id registry's names, in its id order (C-0020)", () => {
    expect([...STAGE_IDS]).toEqual(STAGE_REGISTRY.rows.map((r) => r.name));
    STAGE_REGISTRY.rows.forEach((r, i) => expect(r.id).toBe(i));
  });
});
