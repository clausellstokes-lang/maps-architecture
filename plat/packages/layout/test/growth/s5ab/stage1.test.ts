// S5a for k = 1 (§4.4: "Stage 1's boundary is S3's contour, and S5a commits S3's trace for it unchanged"; §4.1's S5
// row, k = 1): S3's L1 batch then S5a's `traceStage1` give the arena `commitS3Slice` gives, level digest for level
// digest (the checker's digest comparison), the same trace, gates and strips; and S5's growth state starts from S3's
// boundary, trace and field, S4's network.
import { describe, expect, it } from 'vitest';
import { err, recomputeLevelDigest, STAGES, type Kernel, type KernelTx, type LatticePoint, type StageId } from '@plat/kernel';
import type { Lifecycle, WaterBody, WaterSet } from '@plat/model';
import { commitOuterRing, commitS3Slice, flatFixture, runS4, s3Slice } from '../../../src/index.js';
import { commitS3ThenStage1 } from '../../../src/growth/boundary.js';
import { growthStart } from '../../../src/growth/mainRoads.js';
import { GROUND, kernelFor, P } from './support.js';

const GENERATED: Lifecycle = { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };

/** A river band laid on L0 (written here): its ring one closed chain carrying `shore` and `bank`, its face the body's. */
function layWater(k: Kernel, ring: readonly LatticePoint[], id = 'river:1'): WaterSet {
  const spec: KernelTx = { key: GROUND, level: 0, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S1 as StageId }, stage: STAGES.S1 as StageId, rederivesFrom: STAGES.S1 as StageId, workLimit: 10_000_000 };
  const r = k.tx(spec, (o) => {
    const a = k.geom.insertChain(o, ring, [{ role: 'shore', entity: id }, { role: 'bank', entity: id }], 'mandatory', { closed: true });
    if (!a.ok) return err(a.code, a.detail);
    const loc = k.geom.pointLocate(GROUND, 0, P(Math.round((ring[0].x + ring[1].x) / 2), 0));
    if (loc.on !== 'face') throw new Error('stage1.test: no water face');
    return k.geom.setOwner(o, [loc.face], id);
  });
  if (!r.ok) throw new Error(`stage1.test: the water was refused: ${r.code} ${r.detail}`);
  const body = { id, kind: 'river', face: { owner: id, level: 0 }, shore: { role: 'shore', entity: id }, lifecycle: GENERATED } as WaterBody;
  return { bodies: [body], bridges: [] };
}

describe('S5a, k = 1', () => {
  it('commits S3\'s trace byte for byte: every level digest equal to commitS3Slice\'s arena', { timeout: 120_000 }, () => {
    for (const site of [flatFixture(3), flatFixture(7, { frameAreaHa: 400, walledHa: 30 })]) {
      const slice = s3Slice(site);
      const a = kernelFor(site);
      const ca = commitS3Slice(slice, a.k);
      expect(ca.ok).toBe(true);
      const b = kernelFor(site);
      expect(commitOuterRing(site, b.k).ok).toBe(true);
      const cb = commitS3ThenStage1(slice, b.k);
      expect(cb.ok).toBe(true);
      if (!ca.ok || !cb.ok) return;
      for (const level of [0, 1, 2, 3, 4] as const) expect(recomputeLevelDigest(b.plat, level)).toEqual(recomputeLevelDigest(a.plat, level));
      expect(cb.value.traced.line).toEqual(ca.value.traced.line);
      expect(cb.value.gates).toEqual(ca.value.gates);
      expect(cb.value.enceinte).toEqual(ca.value.enceinte);
      expect(cb.value.strips).toEqual(ca.value.strips);
      expect(cb.value.plaza).toEqual(ca.value.plaza);
      // The trace is a different arena's if S3's outline is not the one traced: a moved gate site changes the digest.
      expect(cb.value.traced.report).toEqual(ca.value.traced.report);
    }
  });

  // With water (N-24; C-0449 (24)): a river band through the town at x 300 – 340 m with a deck at y 0, laid on L0 by
  // hand in each arena; stage 1 given the water traces over it with its water gates as commitS3Slice does, level digest
  // for level digest, and returns the same warnings.
  it('with a river band given: the same arena, the same water gates and strips, the same warnings', { timeout: 120_000 }, () => {
    const band = [P(30_000, -200_000), P(34_000, -200_000), P(34_000, 200_000), P(30_000, 200_000)];
    for (const seed of [1, 2]) {
      const site = flatFixture(seed, { water: { faces: [band], decks: [{ id: 'bridge:1', a: P(30_000, 0), b: P(34_000, 0) }] } });
      const slice = s3Slice(site);
      const a = kernelFor(site);
      expect(commitOuterRing(site, a.k).ok).toBe(true);
      const ca = commitS3Slice(slice, a.k, { outerRing: 'present', water: layWater(a.k, band) });
      const b = kernelFor(site);
      expect(commitOuterRing(site, b.k).ok).toBe(true);
      const cb = commitS3ThenStage1(slice, b.k, { water: layWater(b.k, band) });
      expect(ca.ok, ca.ok ? '' : ca.detail).toBe(true);
      expect(cb.ok, cb.ok ? '' : cb.detail).toBe(true);
      if (!ca.ok || !cb.ok) return;
      expect(ca.value.waterGates.length).toBeGreaterThan(0);
      for (const level of [0, 1, 2, 3, 4] as const) expect(recomputeLevelDigest(b.plat, level)).toEqual(recomputeLevelDigest(a.plat, level));
      expect(cb.value.waterGates).toEqual(ca.value.waterGates);
      expect(cb.value.strips).toEqual(ca.value.strips);
      expect(cb.value.traced.line).toEqual(ca.value.traced.line);
      expect(cb.warnings).toEqual(ca.warnings);
    }
  });

  it('S5 starts from stage 1 as S3 and S4 left it: S3\'s boundary, field and trace, S4\'s network, no S5b', { timeout: 120_000 }, () => {
    const site = flatFixture(4, { frameAreaHa: 400, walledHa: 30 });
    const slice = s3Slice(site);
    const { k } = kernelFor(site);
    const c = commitS3Slice(slice, k);
    if (!c.ok) throw new Error(c.detail);
    const s4 = runS4({ slice, commit: c.value, kernel: k });
    if (!s4.ok) throw new Error(s4.detail);
    const g = growthStart({ slice, commit: c.value, s4: s4.value, kernel: k });
    expect(g.field).toBe(slice.field);
    expect(g.enclosure).toBe(slice.levelSet.selected);
    expect(g.lastWithLand).toBe(1);
    expect(g.stages.length).toBe(1);
    const st = g.stages[0];
    expect(st.k).toBe(1);
    expect(st.boundary?.set).toBe(slice.levelSet);
    expect(st.boundary?.threshold).toBe(slice.threshold);
    expect(st.wall).toBe(c.value.traced.line);
    expect(st.count).toEqual({ n: slice.n, measure: slice.threshold.landCm2, walled: true, rule: 'gateLaw' });
    expect(st.roads).toEqual([]);
    expect(st.gates).toEqual(s4.value.gates);
    expect(g.ways).toEqual(s4.value.network.ways);
    expect(g.junctions).toEqual(s4.value.network.junctions);
    expect(g.plaza).toBe(c.value.plaza);
    // Gate ordinals continue after S3's.
    expect(g.nextGateOrdinal).toBe(Math.max(...slice.gates.map((x) => x.ordinal)) + 1);
    expect(g.folded).toEqual(site.land.stagesHa.map(() => 0));
  });
});
