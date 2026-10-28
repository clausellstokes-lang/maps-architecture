// M0-x-04: the base S6's detect-and-refuse (C-0264 (9)) and its soft check (x-04 note 8; C-0443 (4)). Before N-51's fix
// (C-0265) S6 claimed only unowned faces while S1's land components own every land face, so S6 claimed nothing and the
// town would have come out silently empty. The base's S6 refuses that case E_INVARIANT with W_LAND_UNCLAIMED, naming the
// owners it found. The fixtures no longer reach it (run.test.ts asserts the built branch), so this file reinstates the
// pre-fix rule — S6 takes only unowned faces — by mocking `s6Takes`, and checks the refusal on the flat fixture: in the
// report (the runner keeps the code and the warning) and in the refusal's own detail, read by wrapping the registered S6
// (the runner drops a stage's detail). A partial loss — the pre-fix rule on the town's western half only — is the soft
// check's: S6 claims land and commits, and the land it left under S5's last boundary is counted, one W_LAND_UNCLAIMED per
// L1 face.
import { idOf, isFaceLive, stageText } from '@plat/kernel';
import { describe, expect, it, vi } from 'vitest';
import type { CoarseFace } from '../../../src/districts/faces.js';

const rule = vi.hoisted(() => ({ kind: 'pre-fix' as 'pre-fix' | 'west' }));

vi.mock('../../../src/districts/faces.js', async (importOriginal) => {
  const orig = await importOriginal<typeof import('../../../src/districts/faces.js')>();
  return {
    ...orig,
    s6Takes: (f: CoarseFace, side: 'inside' | 'outside') =>
      rule.kind === 'pre-fix'
        ? // the pre-fix rule (C-0245 (2) before C-0265): on the side, no water, unowned
          f.side === side && !f.water && f.owner === null
        : // the fixed rule, but the pre-fix one inside the perimeter west of x = 0: part of the land left to land:<n>
          orig.s6Takes(f, side) && !(side === 'inside' && f.owner !== null && orig.isS1LandOwner(f.owner) && f.centroid.x < 0),
  };
});

const { baseArena, createRegistry, FLAT_BLUEPRINT, registerBase, run, W_LAND_UNCLAIMED } = await import('../../../src/index.js');
type BaseBatch = import('../../../src/index.js').BaseBatch;
type PipelineStage = import('../../../src/index.js').PipelineStage;

const BP = { ...FLAT_BLUEPRINT, size: { ...FLAT_BLUEPRINT.size, areaHa: 900 }, walledHa: 30 };

describe('the base S6 refuses a run whose land S6 cannot claim (C-0264 (9))', () => {
  it('flat fixture under the pre-fix claimable rule: one bug S6 E_INVARIANT naming land:0, W_LAND_UNCLAIMED once, no districts, S8 idle', { timeout: 900_000 }, () => {
    rule.kind = 'pre-fix';
    const batches: BaseBatch[] = [];
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
    const r = run(registry, { ...BP, seed: 1 } as never, { kind: 'all' }, { arenas: () => [baseArena(BP)] });
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

describe("the base S6's soft check: land under S5's last boundary that S6 left unclaimed is counted (x-04 note 8; C-0443 (4))", () => {
  it('flat fixture, the western half of the town left to land:0: S6 commits its districts, W_LAND_UNCLAIMED counts the L1 faces left under the boundary', { timeout: 900_000 }, () => {
    rule.kind = 'west';
    const registry = createRegistry();
    registerBase(registry);
    // the base without S8: the arena as S6 left it
    const stages = registry.products.get('base')?.stages ?? [];
    stages.splice(
      stages.findIndex((s) => stageText(s.id) === 'S8'),
      1,
    );
    const r = run(registry, { ...BP, seed: 1 } as never, { kind: 'all' }, { arenas: () => [baseArena(BP)] });
    // S6 is not refused: it claimed land and wrote districts
    expect(r.report.bugs).toEqual([]);
    const s6 = r.model.data.get('s6') as { report: { landHa: number } } | undefined;
    expect(s6?.report.landHa).toBeGreaterThan(0);
    expect((r.model.data.get('districts') as unknown[]).length).toBeGreaterThan(0);
    // the faces counted are L1 faces still owned by an S1 land component, and not all of them: the margin's holed face,
    // whose outer ring is the frame, is land:0's too but lies outside the boundary (its holes hold the town)
    const p = r.model.plats.get('ground/0');
    if (p === undefined) throw new Error('no ground arena');
    let landOwned = 0;
    for (let f = 0; f < p.slots.face[1].top; f += 1) {
      if (!isFaceLive(p, 1, f)) continue;
      const h = p.faces[1].owner[f];
      if (h >= 0 && idOf(p, h).startsWith('land:')) landOwned += 1;
    }
    const counted = r.report.stages.find((s) => s.name === 'S6')?.warnings[W_LAND_UNCLAIMED] ?? 0;
    expect(counted).toBeGreaterThan(0);
    expect(counted).toBeLessThan(landOwned);
  });
});
