// M0-x-04 S2: the base reads one tables view (docs/M0-FIX-QUEUE.md Q99, RL8's x-04 line; J480; x-02 note 24; C-0464).
// The runner gives every stage its registered view, `tableView(TABLE_IDS, [s6Table()])` by default or the view the run
// is handed (runner.ts, M0-x-02 S3). The base's own readers take that view too: the ground arena's frame (`baseArena`'s
// default is the registered view, and `runBase` hands it the run's), and S6 with its sited features (`baseS6Input` passes
// `ctx.tables` to S6's input and to `siteFeatures`). The cells are the same in the bare and the registered view, so no
// output moves (the census, C-0464); the readers are observed here by wrapping `siteFrame` (the frame's one reader of
// the view) and M0-e-04's `s6Stage` / `siteFeatures`, each recording the view it was handed.
import { describe, expect, it, vi } from 'vitest';
import type { TableView } from '@plat/tables';

const seen = vi.hoisted(() => ({ frame: [] as unknown[], s6: [] as unknown[], features: [] as unknown[] }));

vi.mock('@plat/site', async (importOriginal) => {
  const orig = await importOriginal<typeof import('@plat/site')>();
  return {
    ...orig,
    siteFrame: (...args: Parameters<typeof orig.siteFrame>) => {
      seen.frame.push(args[2]);
      return orig.siteFrame(...args);
    },
  };
});

vi.mock('../../../src/districts/stage.js', async (importOriginal) => {
  const orig = await importOriginal<typeof import('../../../src/districts/stage.js')>();
  return {
    ...orig,
    siteFeatures: (...args: Parameters<typeof orig.siteFeatures>) => {
      seen.features.push(args[1].tables);
      return orig.siteFeatures(...args);
    },
    s6Stage: (...args: Parameters<typeof orig.s6Stage>) => {
      const item = orig.s6Stage(...args);
      return {
        ...item,
        inputsOf: (input: Parameters<typeof item.inputsOf>[0], scope: Parameters<typeof item.inputsOf>[1]) => {
          seen.s6.push((input as { readonly tables?: unknown }).tables);
          return item.inputsOf(input, scope);
        },
      };
    },
  };
});

const { TABLE_IDS, tableView } = await import('@plat/tables');
const { baseArena, FLAT_BLUEPRINT, runBase, s6Table } = await import('../../../src/index.js');

const BP = { ...FLAT_BLUEPRINT, size: { ...FLAT_BLUEPRINT.size, areaHa: 900 }, walledHa: 30 };
const REGISTERED = tableView(TABLE_IDS, [s6Table()]);
const BARE = tableView();
const hashOf = (v: unknown): string => JSON.stringify((v as TableView | undefined)?.hash ?? null);
const reset = (): void => {
  seen.frame.length = 0;
  seen.s6.length = 0;
  seen.features.length = 0;
};

describe('the base reads the run\'s one tables view (Q99, J480; x-04 S2, C-0464)', () => {
  it("baseArena's frame reads the registered view by default, and the view it is handed otherwise", () => {
    expect(hashOf(REGISTERED)).not.toBe(hashOf(BARE));
    reset();
    baseArena(BP);
    expect(seen.frame).toHaveLength(1);
    expect(hashOf(seen.frame[0])).toBe(hashOf(REGISTERED));
    expect((seen.frame[0] as TableView).table('s6').hash).toEqual(s6Table().hash);
    reset();
    baseArena(BP, BARE);
    expect(seen.frame).toEqual([BARE]);
    expect(seen.frame[0]).toBe(BARE);
  });

  it("runBase with no view: the arena, S6 and its sited features read the registered view the runner gives the stages", { timeout: 900_000 }, () => {
    reset();
    const { report } = runBase(BP, 1, { kind: 'all' });
    expect(report.bugs).toEqual([]);
    expect(seen.s6).toHaveLength(1);
    expect(seen.features).toHaveLength(1);
    expect(seen.frame.length).toBeGreaterThan(0);
    for (const v of [...seen.frame, ...seen.s6, ...seen.features]) expect(hashOf(v)).toBe(hashOf(REGISTERED));
  });

  it('runBase handed a view: the arena, S6 and its sited features read that very view', { timeout: 900_000 }, () => {
    const given = tableView(TABLE_IDS, [s6Table()]);
    reset();
    const { report } = runBase(BP, 1, { kind: 'all' }, { tables: given });
    expect(report.bugs).toEqual([]);
    expect(seen.s6).toHaveLength(1);
    expect(seen.features).toHaveLength(1);
    expect(seen.frame.length).toBeGreaterThan(0);
    for (const v of [...seen.frame, ...seen.s6, ...seen.features]) expect(v).toBe(given);
  });
});
