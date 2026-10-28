// M0-x-04: `registerBase` asserts the base set's Kahn order (x-04 note 5; C-0432 (5); M0-work.json's builds: "asserts the
// registered set's Kahn order is §4.1's drawn order"). The six stages' declared I/O form a chain (table.test.ts: each reads
// a key the one before it writes), so no registration order and no extra input reorders them without a cycle, which
// `register` names. The check is reached here by its wiring: Kahn's sort (./order.ts) is wrapped to hand back a
// reordered set, and registerBase must refuse it before it registers anything.
import { stageText } from '@plat/kernel';
import { describe, expect, it, vi } from 'vitest';

const swap = vi.hoisted(() => ({ on: false }));

vi.mock('../../../src/pipeline/order.js', async (importOriginal) => {
  const orig = await importOriginal<typeof import('../../../src/pipeline/order.js')>();
  return {
    ...orig,
    kahn: (...args: Parameters<typeof orig.kahn>) => {
      const r = orig.kahn(...args);
      // S4 and S5 exchanged in the order a six-stage set gives
      if (!swap.on || !r.ok || r.order.length !== 6) return r;
      return { ok: true as const, order: [r.order[0], r.order[1], r.order[3], r.order[2], r.order[4], r.order[5]] };
    },
  };
});

const { BASE_ORDER, createRegistry, registerBase, RegistrationError, stageOrder } = await import('../../../src/index.js');

describe("registerBase asserts §4.1's drawn order before it registers (x-04 note 5; C-0432 (5))", () => {
  it('a set Kahn orders otherwise is a RegistrationError naming both orders, the registry left as it was', () => {
    swap.on = true;
    const reg = createRegistry();
    let thrown: unknown = null;
    try {
      registerBase(reg);
    } catch (e) {
      thrown = e;
    }
    expect(thrown).toBeInstanceOf(RegistrationError);
    expect((thrown as Error).message).toBe("registerBase: the base set orders S1, S3, S5, S4, S6, S8, not §4.1's drawn order S1, S3, S4, S5, S6, S8 (C-0432 (5))");
    expect(reg.products.get('base')?.stages).toEqual([]);
    expect(reg.terrain.size + reg.river.size + reg.enceinte.size + reg.network.size + reg.fabric.size).toBe(0);
    swap.on = false;
  });

  it("the drawn order registers: the six stages in §4.1's order", () => {
    swap.on = false;
    const reg = createRegistry();
    registerBase(reg);
    expect(stageOrder(reg).map((id) => stageText(id))).toEqual([...BASE_ORDER]);
  });
});
