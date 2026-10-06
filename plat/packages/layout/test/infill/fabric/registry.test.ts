// T41-1 (§13.2; §6.1, with M0-d-01's registry): cut.stop registered with its reader S8; cut.side and cut.farSideAlt
// reserved ids that no reader draws — and S8's own declaration: the concerns it draws, never a retired one, its op form,
// its ladders and laws, and its registration in a StrategyRegistry; BentCutFabric under `bent-cut`.
import { CONCERN_REGISTRY, CONCERNS, STAGES } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { BASE_FABRICS, BentCutFabric, BENT_CUT, BLOCK_FLOOR_ROW, createRegistry, register, s8Stage, S8_COUNTERS, SEAM_PORTAL_ROW, type PipelineStage } from '../../../src/index.js';

const row = (name: string) => CONCERN_REGISTRY.rows.find((r) => r.name === name);

describe('T41-1: the cut concerns in the registry', () => {
  it('cut.stop is registered, live, with S8 as its reader and no retry (cap 0)', () => {
    const r = row('cut.stop');
    expect(r).toBeDefined();
    expect(r?.retired).toBe(false);
    expect(r?.readers).toEqual(['S8']);
    expect(r?.cap).toBe(0);
    expect(CONCERNS['cut.stop']).toBe(r?.id);
  });

  it('cut.side and cut.farSideAlt are reserved ids no reader draws', () => {
    for (const name of ['cut.side', 'cut.farSideAlt']) {
      const r = row(name);
      expect(r).toBeDefined();
      expect(r?.retired).toBe(true);
      expect(r?.readers).toEqual([]);
    }
  });

  it('S8 draws exactly cut.stop, cut.t, cut.arc, cut.width and cut.interior — each a live concern S8 reads, never a reserved one', () => {
    const s = s8Stage();
    expect([...s.streamKeys].sort()).toEqual(['cut.arc', 'cut.interior', 'cut.stop', 'cut.t', 'cut.width']);
    for (const k of s.streamKeys) {
      const r = row(k);
      expect(r?.retired).toBe(false);
      expect(r?.readers).toContain('S8');
    }
    expect(s.streamKeys).not.toContain('cut.side');
    expect(s.streamKeys).not.toContain('cut.farSideAlt');
    // cut.t's cap 2: attempts 0–2, the three frames of rung (a).
    expect(row('cut.t')?.cap).toBe(2);
  });
});

describe('S8’s declaration (§4.1, §4.12) and the fabric slot (§4.6)', () => {
  it('is the callback form under S8’s id, with F-CUT’s and F-WORK’s ladders, the three cut counters and its two rows', () => {
    const s = s8Stage();
    expect(s.id).toBe(STAGES.S8);
    expect(s.txForm).toBe('callback');
    expect(s.ladder.map((l) => l.failureClass)).toEqual(['F-CUT', 'F-WORK']);
    expect(s.ladder[0].rungs).toEqual(['reflexPreCut', 'antennaSplit', 'turnedFrame', 'meanNormal', 'perpendicularSlide', 'substitution']);
    expect(s.workLimits.map((l) => l.counter)).toEqual([...S8_COUNTERS]);
    expect(s.workLimits.find((l) => l.counter === 'cut.recursionDepth')?.log2).toBe(true);
    expect(s.invariants).toEqual([BLOCK_FLOOR_ROW, SEAM_PORTAL_ROW]);
    expect(BLOCK_FLOOR_ROW).toMatchObject({ scope: 'batch', class: 'hard', kind: 'classFloor', faceClass: 'block' });
  });

  it('registers in a StrategyRegistry (its declaration checked by M0-x-02’s register)', () => {
    const reg = createRegistry();
    register(reg, s8Stage() as unknown as PipelineStage);
    expect(reg.products.get('base')?.stages.map((x) => x.id)).toEqual([STAGES.S8]);
    reg.fabric.set(BENT_CUT, BentCutFabric);
    expect(reg.fabric.get('bent-cut')).toBe(BentCutFabric);
  });

  it('BentCutFabric: registered for bent-cut; levelledUnits [] and terracedEdges true at M0 (their readers are M3a’s)', () => {
    expect(BASE_FABRICS.get('bent-cut')).toBe(BentCutFabric);
    expect(BentCutFabric.levelledUnits({} as never, [], [])).toEqual([]);
    expect(BentCutFabric.terracedEdges).toBe(true);
    expect(typeof BentCutFabric.partition).toBe('function');
  });
});
