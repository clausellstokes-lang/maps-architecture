// S6 after the real S3 slice and S4 (M0-c-01 … M0-c-03) and before S8 (M0-b-03) on the flat CITY fixture (§4.1's order;
// §4.5; §5.3's containment row): the plaza's and the wall strips' faces keep their owners, the gate wards sit at their
// gates behind the wall (or the gate is dropped and reported, C-0257), the market district at the plaza, every land
// face held; S8's BentCutFabric takes S6's District, Seam and lineage records as they are, its child faces keep their
// district; and a finer face's district is read through `parent` (containment by construction): corridorUnion's L2
// faces over a district all descend from its L1 faces.
import { faceRings, isFaceLive, seedKey, STAGES, type KernelTx } from '@plat/kernel';
import type { Bridge, WaterSet, Way } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { districtOfFace, faceGraph, RIVER_BLUEPRINT, runBase, runS8, siteFeatures, type BaseBlueprint, type S6Output } from '../../src/index.js';
import { bySeed, cityRun, edgesL1, GROUND, insidePoly, ownerOfL1, ringDist, s6Run, s6With, withS6, type CityRun } from './support.js';

/** The CITY run at `seed` with S6 on it, and every L1 face owned before S6 (the reservations' and the strips'). */
const city = bySeed((seed): CityRun & { out: S6Output; strips: Map<number, string> } => {
  const c = cityRun(seed);
  const strips = new Map<number, string>();
  for (let f = 0; f < c.plat.slots.face[1].top; f += 1) {
    if (!isFaceLive(c.plat, 1, f)) continue;
    const o = ownerOfL1(c.plat, f);
    if (o !== null) strips.set(f, o);
  }
  return { ...c, out: s6Run(c.input), strips };
});

describe('S6 on the real S3 slice and S4 (flat CITY fixture, S5c stand-in grid)', () => {
  it('every land face held; reservation and strip faces keep their owners; the market at the plaza; gate wards at their gates behind the wall', { timeout: 300_000 }, () => {
    for (const seed of [1, 2]) {
      const c = city(seed);
      expect(c.out.report.unowned).toBe(0);
      for (const [f, o] of c.strips) if (isFaceLive(c.plat, 1, f)) expect(ownerOfL1(c.plat, f)).toBe(o);
      expect(c.out.districts.filter((d) => d.kind === 'market').map((d) => d.namingFeature)).toEqual(['plaza:0']);
      const gates = c.out.grow.grown.filter((d) => d.seed.kind === 'gate');
      const main = c.commit.gates.filter((g) => g.kind === 'main');
      const dropped = new Set(c.out.report.seedsDropped);
      expect(gates.length + dropped.size).toBe(main.length);
      for (const d of c.out.districts.filter((x) => x.kind === 'gate')) expect(d.growthStage).toBe(1);
      expect(Math.abs(c.out.districts.length - c.out.report.nd)).toBeLessThanOrEqual(1);
      // every gate ward at its gate and behind the wall (C-0257): it holds a side of an edge ending at the gate's
      // vertex, and every edge it holds off the wall line lies inside the line; a gate whose land faces at its vertex
      // inside the wall all seed earlier features is dropped and reported (the flat CITY fixture: one per seed)
      const wall = c.commit.traced.line;
      const edges = edgesL1(c.plat);
      const g = faceGraph(c.plat, { ways: new Map(c.ways.map((w) => [w.id, w.class])), minBarrierClass: 'primary', perimeter: c.out.hinterland, water: new Set() });
      for (const gate of main) {
        const r = c.k.resolve({ role: 'gate', entity: gate.id }, GROUND);
        if (r.view !== 'vertices') throw new Error('no gate vertex');
        const at = { x: c.plat.vertices.x[r.vertices[0]], y: c.plat.vertices.y[r.vertices[0]] };
        const touching = edges.filter((e) => (e.a.x === at.x && e.a.y === at.y) || (e.b.x === at.x && e.b.y === at.y));
        const ward = c.out.districts.find((x) => x.namingFeature === gate.id);
        if (ward === undefined) {
          expect(dropped.has(gate.id)).toBe(true);
          const earlier = new Set(c.input.features.slice(0, c.input.features.findIndex((f) => f.id === gate.id)).map((f) => f.id));
          for (const e of touching) {
            for (const f of [e.left, e.right]) {
              const o = ownerOfL1(c.plat, f);
              if (o === null || !c.out.districts.some((d) => d.id === o)) continue;
              const ring = faceRings(c.plat, 1, f)[0];
              const q = ring.find((p) => ringDist(wall, p) > 200);
              if (q === undefined || !insidePoly(wall, q)) continue;
              const sd = c.out.grow.grown.map((d) => d.seed).find((s) => g.faces[s.face].face === f);
              expect(sd?.feature !== undefined && earlier.has(sd.feature)).toBe(true);
            }
          }
          continue;
        }
        expect(ward.kind).toBe('gate');
        expect(touching.some((e) => ownerOfL1(c.plat, e.left) === ward.id || ownerOfL1(c.plat, e.right) === ward.id)).toBe(true);
        for (const e of edges) {
          if (ownerOfL1(c.plat, e.left) !== ward.id && ownerOfL1(c.plat, e.right) !== ward.id) continue;
          const mid = { x: (e.a.x + e.b.x) / 2, y: (e.a.y + e.b.y) / 2 };
          if (ringDist(wall, mid) > 200) expect(insidePoly(wall, mid)).toBe(true);
        }
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

describe('S6 on the river fixture: the water clause and the water seeds (§4.5; C-0245 (3), (4); note 2)', () => {
  it('river at seed 2 (900 ha, 30 ha walled): no district holds both sides of a shore or bank; one riverbank seed per river; both deck ends of each built arterial bridge seed', { timeout: 900_000 }, () => {
    const RIVER: BaseBlueprint = { ...RIVER_BLUEPRINT, size: { ...RIVER_BLUEPRINT.size, areaHa: 900 }, walledHa: 30 };
    // seed 2: the town reaches the river's banks and S4 builds a primary bridge (at seed 5 the town's land touches no
    // bank: the riverbank feature is dropped and reported, C-0245 (4))
    const r = runBase(RIVER, 2, { kind: 'all' });
    expect(r.report.bugs).toEqual([]);
    const s6 = r.model.data.get('s6') as S6Output;
    const water = r.model.data.get('water') as WaterSet;
    const bridges = r.model.data.get('bridges') as Bridge[];
    const ways = r.model.data.get('ways') as Way[];
    // the bridgehead features S6 met: seeded, or dropped and reported (no free face left at the deck end)
    const heads = [...s6.grow.grown.filter((g) => g.seed.kind === 'bridgehead').map((g) => g.seed.feature as string), ...s6.report.seedsDropped.filter((id) => id.includes('/end:'))].sort();
    // both landward deck ends of every built bridge carrying an arterial (class ≥ primary), and no other bridge
    const classOf = new Map(ways.map((w) => [w.id, w.class]));
    const arterial = bridges.filter((b) => b.state === 'built' && b.way !== null && ['through', 'primary'].includes(classOf.get(b.way) as string));
    expect(arterial.length).toBeGreaterThan(0);
    expect(heads).toEqual(arterial.flatMap((b) => [`${b.id}/end:0`, `${b.id}/end:1`]).sort());
    // the class the bridge must carry is the edge test's, read from the run's `s6` when its tables carry one (note 4):
    // at `through` the primary bridge seeds no bridgehead
    const p0 = r.model.kernel.plat(GROUND);
    const sited = (tables?: ReturnType<typeof withS6>) => siteFeatures(p0, { bridges, ways, water, ...(tables === undefined ? {} : { tables }) }).filter((f) => f.kind === 'bridgehead').map((f) => f.id);
    expect(arterial.every((b) => classOf.get(b.way as string) === 'primary')).toBe(true);
    expect(sited().sort()).toEqual(heads);
    expect(sited(withS6(s6With([['edge', 'minBarrierClass', 'through']])))).toEqual([]);
    // one riverbank seed per river, at a face along its bank
    const rivers = water.bodies.filter((b) => b.kind === 'river').map((b) => b.id);
    expect(rivers.length).toBeGreaterThan(0);
    expect(s6.grow.grown.filter((g) => g.seed.kind === 'riverbank').map((g) => g.seed.feature)).toEqual(rivers);
    // the water clause: no district holds both sides of a shore or a bank
    const p = r.model.kernel.plat(GROUND);
    const ids = new Set(s6.districts.map((d) => d.id));
    let waterEdges = 0;
    let besideDistrict = 0;
    for (const e of edgesL1(p)) {
      if (!e.rows.some((x) => x.role === 'shore' || x.role === 'bank')) continue;
      waterEdges += 1;
      const l = ownerOfL1(p, e.left);
      const o = ownerOfL1(p, e.right);
      if ((l !== null && ids.has(l)) || (o !== null && ids.has(o))) besideDistrict += 1;
      expect(l !== null && ids.has(l) && l === o).toBe(false);
    }
    expect(waterEdges).toBeGreaterThan(100);
    expect(besideDistrict).toBeGreaterThan(100);
  });
});
