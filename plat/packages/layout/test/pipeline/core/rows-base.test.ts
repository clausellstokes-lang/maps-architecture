// The declared-row walker over the base registration table (M0-x-02, session fix round S2; docs/M0-FIX-QUEUE.md Q32,
// C-0316). The registry is walked as `registerBase` fills it (M0-x-04's table, read here, never edited): every row a base
// stage declares is either a batch-scope hard row — evaluated on every batch that passes the façade's tx as its `expect`
// (§3.3) — or a stage-end row (§5.3's `stage` scope), which the runner's guard requires the stage to report at its end.
// The census below is a ratchet: a row added to a base stage (or a stage added) fails it until the census names the row
// and the row's evaluator is shown — on the flat fixture's run every declared stage-end row of every stage that reached
// its end was reported (count ≥ 1) and the run has no bug (so the guard refused nothing). The river fixture's run, with
// the same rows, is M0-x-04's (test/pipeline/base/run.test.ts asserts its bugs empty, which the guard now implies).
import { stageText } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { createRegistry, FLAT_BLUEPRINT, registerBase, runBase, type BaseBlueprint } from '../../../src/index.js';

/** Every row each base stage declares, as [name, scope, class], in §4.1's order (M0: S1's and S8's, C-0310, C-0298). */
const CENSUS: readonly (readonly [string, readonly (readonly [string, string, string])[]])[] = [
  ['S1', [['references-resolve', 'stage', 'hard']]],
  ['S3', []],
  ['S4', []],
  ['S5', []],
  ['S6', []],
  ['S8', [['block-floor', 'batch', 'hard'], ['seam-portals', 'stage', 'hard']]],
];

function baseStages() {
  const registry = createRegistry();
  registerBase(registry);
  return registry.products.get('base')?.stages ?? [];
}

describe('the base table declares no row without an evaluator (Q32 walker)', () => {
  it('the census of declared rows is the one pinned here; each is a batch-scope hard row (the expect entries) or a stage-end row (the guard\'s)', () => {
    const stages = baseStages();
    expect(stages.map((s) => [stageText(s.id), s.invariants.map((r) => [r.name, r.scope, r.class])])).toEqual(CENSUS);
    for (const s of stages) {
      for (const r of s.invariants) {
        const batchHard = r.scope === 'batch' && r.class === 'hard' && (r.kind === 'check' || r.kind === 'classFloor');
        expect(batchHard || r.scope === 'stage', `${stageText(s.id)} ${r.name} (${r.scope}, ${r.class}): no evaluator in a derivation`).toBe(true);
      }
    }
  });

  it('on the flat fixture every declared stage-end row of every base stage is reported at its end, and the guard refuses nothing', { timeout: 900_000 }, () => {
    const bp: BaseBlueprint = { ...FLAT_BLUEPRINT, size: { ...FLAT_BLUEPRINT.size, areaHa: 900 }, walledHa: 30 };
    const { model, report } = runBase(bp, 1, { kind: 'all' });
    expect(report.bugs).toEqual([]);
    expect(model.refusals.size).toBe(0);
    expect(report.stages.map((s) => s.name)).toEqual(CENSUS.map(([name]) => name));
    for (const [name, rows] of CENSUS) {
      const line = report.stages.find((s) => s.name === name);
      for (const [row, scope] of rows) {
        if (scope !== 'stage') continue;
        const got = line?.invariants.find((l) => l.name === row);
        expect(got, `${name} ${row}`).toBeDefined();
        expect(got?.count ?? 0, `${name} ${row} evaluations`).toBeGreaterThanOrEqual(1);
        expect(got?.pass, `${name} ${row}`).toBe(true);
      }
    }
  });
});
