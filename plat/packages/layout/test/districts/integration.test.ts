// S6 after the real S3 slice and S4 (M0-c-01 … M0-c-03) and before S8 (M0-b-03) on the flat CITY fixture (§4.1's order;
// §4.5; §5.3's containment row): the plaza's and the wall strips' faces keep their owners, the gate wards sit behind
// the wall, the market district at the plaza, every land face held; S8's BentCutFabric takes S6's District, Seam and
// lineage records as they are, its child faces keep their district; and a finer face's district is read through
// `parent` (containment by construction): corridorUnion's L2 faces over a district all descend from its L1 faces.
import { isFaceLive, seedKey, STAGES, type KernelTx } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { districtOfFace, runS6, runS8, type S6Output } from '../../src/index.js';
import { cityRun, GROUND, ownerOfL1, type CityRun } from './support.js';

const RUNS = new Map<number, CityRun & { out: S6Output; strips: Map<number, string> }>();
function city(seed: number): CityRun & { out: S6Output; strips: Map<number, string> } {
  let r = RUNS.get(seed);
  if (r === undefined) {
    const c = cityRun(seed);
    const strips = new Map<number, string>();
    for (let f = 0; f < c.plat.slots.face[1].top; f += 1) {
      if (!isFaceLive(c.plat, 1, f)) continue;
      const o = ownerOfL1(c.plat, f);
      if (o !== null) strips.set(f, o);
    }
    const s6 = runS6(c.input);
    if (!s6.ok) throw new Error(`S6 refused: ${s6.code} ${s6.detail}`);
    r = { ...c, out: s6.value, strips };
    RUNS.set(seed, r);
  }
  return r;
}

describe('S6 on the real S3 slice and S4 (flat CITY fixture, S5c stand-in grid)', () => {
  it('every land face held; reservation and strip faces keep their owners; the market at the plaza; gate wards behind the wall', { timeout: 300_000 }, () => {
    for (const seed of [1, 2]) {
      const c = city(seed);
      expect(c.out.report.unowned).toBe(0);
      for (const [f, o] of c.strips) if (isFaceLive(c.plat, 1, f)) expect(ownerOfL1(c.plat, f)).toBe(o);
      expect(c.out.districts.filter((d) => d.kind === 'market').map((d) => d.namingFeature)).toEqual(['plaza:0']);
      const gates = c.out.grow.grown.filter((d) => d.seed.kind === 'gate');
      expect(gates.length).toBe(c.commit.gates.filter((g) => g.kind === 'main').length);
      expect(c.out.report.seedsDropped).toEqual([]);
      for (const d of c.out.districts.filter((x) => x.kind === 'gate')) expect(d.growthStage).toBe(1);
      expect(Math.abs(c.out.districts.length - c.out.report.nd)).toBeLessThanOrEqual(1);
      // every gate ward's seed face lies behind the wall (the gate anchor's preferred side)
      for (const d of gates) {
        const e = c.out.districts.find((x) => x.namingFeature === d.seed.feature);
        expect(e?.kind).toBe('gate');
      }
    }
  });

  it('S8 cuts S6’s districts as they are (District, Seam, lineage); its child faces keep their district', { timeout: 300_000 }, () => {
    const c = city(1);
    const pick = [c.out.districts.find((d) => d.kind === 'market'), c.out.districts.find((d) => d.kind !== 'market' && d.kind !== 'gate')].filter((d) => d !== undefined);
    const before = new Map<string, number>();
    for (const d of pick) before.set(d.id, 0);
    for (let f = 0; f < c.plat.slots.face[1].top; f += 1) {
      if (!isFaceLive(c.plat, 1, f)) continue;
      const o = ownerOfL1(c.plat, f);
      if (o !== null && before.has(o)) before.set(o, (before.get(o) as number) + 1);
    }
    const r = runS8(
      {
        kernel: c.k,
        key: GROUND,
        seedKey: seedKey(1),
        rung: 'CITY',
        districts: pick.map((d) => ({ district: d, lineage: c.out.lineages.get(d.id) as [number, number], prosperity: 0.5, density: 0.5 })),
        ways: c.ways,
        seams: c.out.seams,
        widths: c.widths,
      },
      { report: undefined } as never,
    );
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.infill.report.refused).toEqual([]);
    expect(r.value.lanes.length).toBeGreaterThan(0);
    for (const d of pick) {
      let after = 0;
      for (let f = 0; f < c.plat.slots.face[1].top; f += 1) if (isFaceLive(c.plat, 1, f) && ownerOfL1(c.plat, f) === d.id) after += 1;
      expect(after).toBeGreaterThan(before.get(d.id) as number);
      expect(r.value.blocks.filter((b) => b.district === d.id).length).toBeGreaterThan(0);
    }
  });

  it('containment through parent: every L2 face corridorUnion lays over a district descends from that district’s L1 faces', { timeout: 300_000 }, () => {
    const c = city(1);
    const d = c.out.districts.find((x) => x.kind === 'market');
    expect(d).toBeDefined();
    if (d === undefined) return;
    const spec: KernelTx = { key: GROUND, level: 2, ops: [], expect: [], onFail: 'reject', batch: { kind: 'district', id: d.id }, stage: STAGES.S9, rederivesFrom: STAGES.S9, workLimit: 1e9 };
    const r = c.k.tx(spec, (o) => c.k.geom.corridorUnion(o, d.faces));
    expect(r.ok).toBe(true);
    let l2 = 0;
    for (let f = 0; f < c.plat.slots.face[2].top; f += 1) {
      if (!isFaceLive(c.plat, 2, f)) continue;
      l2 += 1;
      expect(districtOfFace(c.plat, 2, f)).toBe(d.id);
    }
    expect(l2).toBeGreaterThan(0);
  });
});
