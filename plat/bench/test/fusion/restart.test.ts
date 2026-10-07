// M0-c-06's listed test: "the restart assertion fires on a planted restart in a scratch stage" — §16 M0 (c)'s "0 whole-map
// restarts on 1 000 seeds" (the pipeline has no restart path, §5.1 (1)): the harness counts every registered stage's
// invocations, and a scratch stage that derives the whole map again makes every stage run twice.
import { STAGES, type StageId } from '@plat/kernel';
import { register, run, type PipelineStage } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { derive, foldReport, measure, type SeedRecord } from '../../src/fusion/index.js';
import { TEST_SIZE } from './support.js';

const SIZES = { from: 1, seeds: 1, runs: ['fusion'] as const, frameHa: TEST_SIZE.frameHa, walledHa: TEST_SIZE.walledHa };

describe('the restart assertion', () => {
  it('a plain run counts 0 restarts: every registered stage ran once, S5 once per growth stage', { timeout: 300_000 }, () => {
    const r = measure(derive('fusion', 1, TEST_SIZE));
    expect(r.restarts).toBe(0);
    expect(r.invocations).toEqual({ S1: 1, S3: 1, S4: 1, S5: 1, S8: 1 });
    expect(r.s5.growth).toEqual([1, 2, 3]);
    expect(r.s5.prune).toEqual([1, 2, 3]);
    expect(r.s5.capacity).toEqual([1, 2, 3]);
    const rep = foldReport({ ...SIZES, runs: ['fusion'] }, [r]);
    expect(rep.verdicts.restarts).toBe(true);
  });

  it('fires on a planted restart: a scratch stage that derives the whole map again', { timeout: 300_000 }, () => {
    let restarted = 0;
    const d = derive('fusion', 1, {
      ...TEST_SIZE,
      plant: (registry, blueprint) => {
        // A scratch stage after S5 (S7's id: no M0 stage holds it) whose run restarts the derivation from S1.
        const scratch = {
          id: STAGES.S7 as StageId,
          version: '1',
          inputs: ['s5'],
          outputs: ['scratch'],
          streamKeys: [],
          invariants: [],
          ladder: [],
          workLimits: [],
          budgetMs: { TOWN: 1, CITY: 1, METROPOLIS: 1, THORP: 1, HAMLET: 1, VILLAGE: 1 },
          batch: { kind: 'stage', stage: STAGES.S7 as StageId },
          lineageUnit: 'town',
          lazy: false,
          txForm: 'callback',
          inputsOf: () => null,
          run: () => {
            if (restarted === 0) {
              restarted += 1;
              run(registry, blueprint, { kind: 'all' });
            }
            return { ok: true, value: {}, warnings: [] };
          },
        } as unknown as PipelineStage;
        register(registry, scratch);
      },
    });
    expect(restarted).toBe(1);
    const r: SeedRecord = measure(d);
    // Every stage of the order ran twice in the one derivation (the scratch stage's nested run).
    expect(r.restarts).toBeGreaterThanOrEqual(5);
    expect(r.invocations['S1']).toBe(2);
    expect(r.invocations['S5']).toBe(2);
    const rep = foldReport({ ...SIZES, runs: ['fusion'] }, [r]);
    expect(rep.verdicts.restarts).toBe(false);
    expect(rep.pass).toBe(false);
    expect(rep.runs[0].restarts.total).toBe(r.restarts);
    expect(rep.notes.some((n) => /restart/.test(n))).toBe(true);
  });
});
