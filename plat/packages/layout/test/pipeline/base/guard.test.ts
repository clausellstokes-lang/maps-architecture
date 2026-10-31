// M0-x-04: the base S6's detect-and-refuse (C-0264 (9)). Before N-51's fix (C-0265) S6 claimed only unowned faces while
// S1's land components own every land face, so S6 claimed nothing and the town would have come out silently empty. The
// base's S6 refuses that case E_INVARIANT with W_LAND_UNCLAIMED, naming the owners it found. The fixtures no longer reach
// it (run.test.ts asserts the built branch), so this file reinstates the pre-fix rule — S6 takes only unowned faces —
// by mocking `s6Takes`, and checks the refusal on the flat fixture: in the report (the runner keeps the code and the
// warning) and in the refusal's own detail, read by wrapping the registered S6 (the runner drops a stage's detail).
import { stageText } from '@plat/kernel';
import { describe, expect, it, vi } from 'vitest';
import type { CoarseFace } from '../../../src/districts/faces.js';

vi.mock('../../../src/districts/faces.js', async (importOriginal) => {
  const orig = await importOriginal<typeof import('../../../src/districts/faces.js')>();
  // the pre-fix rule (C-0245 (2) before C-0265): on the side, no water, unowned
  return { ...orig, s6Takes: (f: CoarseFace, side: 'inside' | 'outside') => f.side === side && !f.water && f.owner === null };
});

const { baseArena, createRegistry, FLAT_BLUEPRINT, registerBase, run, W_LAND_UNCLAIMED } = await import('../../../src/index.js');
type BaseBatch = import('../../../src/index.js').BaseBatch;
type PipelineStage = import('../../../src/index.js').PipelineStage;

describe('the base S6 refuses a run whose land S6 cannot claim (C-0264 (9))', () => {
  it('flat fixture under the pre-fix claimable rule: one bug S6 E_INVARIANT naming land:0, W_LAND_UNCLAIMED once, no districts, S8 idle', { timeout: 900_000 }, () => {
    const batches: BaseBatch[] = [];
    const bp = { ...FLAT_BLUEPRINT, size: { ...FLAT_BLUEPRINT.size, areaHa: 900 }, walledHa: 30 };
    const registry = createRegistry();
    registerBase(registry, { onBatch: (b) => batches.push(b) });
    // runBase's composition (base.ts), with S6's run wrapped to keep its refusal's detail
    const stages = registry.products.get('base')?.stages ?? [];
    const at = stages.findIndex((s) => stageText(s.id) === 'S6');
    expect(at).toBeGreaterThanOrEqual(0);
    const s6 = stages[at];
    const details: string[] = [];
    stages[at] = Object.freeze({
      ...s6,
      run(input: unknown, ctx: never) {
        const r = s6.run(input as never, ctx);
        if (!r.ok) details.push(`${r.code} ${r.detail}`);
        return r;
      },
    }) as PipelineStage;
    const r = run(registry, { ...bp, seed: 1 } as never, { kind: 'all' }, { arenas: () => [baseArena(bp)] });
    expect(r.report.bugs.map((b) => [b.stage, b.cls])).toEqual([['S6', 'E_INVARIANT']]);
    expect(details).toHaveLength(1);
    expect(details[0]).toMatch(/^E_INVARIANT S6: no claimable land inside the perimeter of S5's last boundary — its L1 faces are owned by land:0 \(/);
    const rep = r.report.stages.find((s) => s.name === 'S6');
    expect(rep?.warnings[W_LAND_UNCLAIMED]).toBe(1);
    // S1 … S5 committed as before: the refusal is S6's alone
    for (const s of ['S1', 'S3', 'S4', 'S5']) expect(batches.some((b) => b.stage === s && b.committed), s).toBe(true);
    for (const k of ['districts', 'lanes', 'fieldBands', 'blocks', 's6']) expect(r.model.data.has(k), k).toBe(false);
    expect(batches.filter((b) => b.stage === 'S8')).toEqual([]);
  });
});
