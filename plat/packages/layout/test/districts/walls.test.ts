// S6 on two enceintes (M0-e-04, integration fix round 1: the stage-group-13 check's B-1; C-0257). M0-c-04 lays one
// enceinte per walled growth stage and each gate names its own (`Gate.enceinte`); on c-04's honest three-stage CITY
// run (stage 1 walled, stage 2 walled, stage 3 open) every gate ward is seeded at a face touching its gate, behind its
// own wall and outside every inner enceinte — or, with no free face left there, its gate is dropped and reported
// (never seeded across another wall, never far from its gate); the one-call form that cannot tell the enceintes apart
// is refused; and the typing's `extramural` relation holds exactly where a district lies outside every wall line.
// Every expectation is read from the committed arena and the wall lines with the support's own geometry, never through
// the code under test.
import { CONCERNS, createRng, entityKey, faceRings, seedKey, STAGES, type LatticePoint } from '@plat/kernel';
import type { Id } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { faceGraph, runS6, s6Table, siteFeatures, typingCells, type S6Output } from '../../src/index.js';
import { edgesL1, GROUND, growthRun, insidePoly, ownerOfL1, ringDist, type GrowthRun } from './support.js';

const RUNS = new Map<number, GrowthRun & { out: S6Output }>();
function run(seed: number): GrowthRun & { out: S6Output } {
  let r = RUNS.get(seed);
  if (r === undefined) {
    const g = growthRun(seed);
    const s6 = runS6(g.input);
    if (!s6.ok) throw new Error(`S6 refused: ${s6.code} ${s6.detail}`);
    r = { ...g, out: s6.value };
    RUNS.set(seed, r);
  }
  return r;
}

/** Points farther than this from every wall line decide a side (the arena's wall chain lies within attraction of its line). */
const CLEAR_CM = 200;

/** Where a point lies against the wall lines (innermost first): the index of the innermost line holding it, or the count when none does. */
function regionOf(t: GrowthRun, q: { x: number; y: number }): number | null {
  if (t.walls.some((w) => ringDist(w.line, q) <= CLEAR_CM)) return null;
  const i = t.walls.findIndex((w) => insidePoly(w.line, q));
  return i < 0 ? t.walls.length : i;
}

/** The regions an owner's faces reach, read from the midpoints of the L1 edges it holds a side of (off the wall lines). */
function regionsOfOwner(t: GrowthRun, owner: Id): Set<number> {
  const out = new Set<number>();
  for (const e of edgesL1(t.plat)) {
    if (ownerOfL1(t.plat, e.left) !== owner && ownerOfL1(t.plat, e.right) !== owner) continue;
    const r = regionOf(t, { x: (e.a.x + e.b.x) / 2, y: (e.a.y + e.b.y) / 2 });
    if (r !== null) out.add(r);
  }
  return out;
}

/** The region of one L1 face (slot): its first ring vertex off every wall line. */
function regionOfFace(t: GrowthRun, f: number): number | null {
  for (const ring of faceRings(t.plat, 1, f)) {
    for (const q of ring) {
      const r = regionOf(t, q);
      if (r !== null) return r;
    }
  }
  return null;
}

function gatePoint(t: GrowthRun, id: Id): LatticePoint {
  const r = t.k.resolve({ role: 'gate', entity: id }, GROUND);
  if (r.view !== 'vertices' || r.vertices.length === 0) throw new Error(`no gate vertex for ${id}`);
  return { x: t.plat.vertices.x[r.vertices[0]], y: t.plat.vertices.y[r.vertices[0]] } as LatticePoint;
}

describe('gate wards on two enceintes (C-0257; the g13 integration check’s B-1)', () => {
  it('every gate ward touches its gate, behind its own wall and outside every inner enceinte; a gate with no free face there is dropped and reported', { timeout: 300_000 }, () => {
    for (const seed of [1, 3]) {
      const t = run(seed);
      expect(t.walls.length).toBe(2);
      const main = t.gates.filter((g) => g.kind === 'main');
      const enceintes = [...new Set(main.map((g) => g.enceinte))];
      expect(enceintes.length).toBe(2);
      const dropped = new Set(t.out.report.seedsDropped);
      const g = faceGraph(t.plat, { ways: new Map(t.ways.map((w) => [w.id, w.class])), minBarrierClass: 'primary', perimeter: t.out.hinterland, water: new Set() });
      const edges = edgesL1(t.plat);
      const seeded = t.out.grow.grown.map((d) => d.seed);
      let outerWards = 0;
      for (const gate of main) {
        const own = t.walls.findIndex((w) => w.enceinte === gate.enceinte);
        expect(own).toBeGreaterThanOrEqual(0);
        const at = gatePoint(t, gate.id);
        const touching = edges.filter((e) => (e.a.x === at.x && e.a.y === at.y) || (e.b.x === at.x && e.b.y === at.y));
        expect(touching.length).toBeGreaterThan(0);
        const ward = t.out.districts.find((d) => d.namingFeature === gate.id);
        if (ward === undefined) {
          // dropped and reported, and only because every land face touching the gate on its own side seeds an
          // earlier feature
          expect(dropped.has(gate.id)).toBe(true);
          const gateFeature = t.input.features.findIndex((f) => f.id === gate.id);
          const earlier = new Set(t.input.features.slice(0, gateFeature).map((f) => f.id));
          const ownSide = new Set<number>();
          for (const e of touching) for (const f of [e.left, e.right]) if (f >= 0 && regionOfFace(t, f) === own) ownSide.add(f);
          for (const f of ownSide) {
            const o = ownerOfL1(t.plat, f);
            if (o === null || !t.out.districts.some((d) => d.id === o)) continue;
            const sd = seeded.find((s) => g.faces[s.face].face === f);
            expect(sd?.feature !== undefined && earlier.has(sd.feature)).toBe(true);
          }
          continue;
        }
        expect(dropped.has(gate.id)).toBe(false);
        expect(ward.kind).toBe('gate');
        // at its gate: the ward holds a side of an edge ending at the gate's vertex
        expect(touching.some((e) => ownerOfL1(t.plat, e.left) === ward.id || ownerOfL1(t.plat, e.right) === ward.id)).toBe(true);
        // behind its own wall and outside every inner enceinte: every edge it holds (off the lines) lies in its region
        expect([...regionsOfOwner(t, ward.id)]).toEqual([own]);
        expect(ward.growthStage).toBe(t.growth.stages.filter((st) => st.wall !== null)[own].k);
        if (own > 0) outerWards += 1;
      }
      expect(outerWards).toBeGreaterThanOrEqual(5);
      expect(main.length - dropped.size).toBe(t.out.grow.grown.filter((d) => d.seed.kind === 'gate').length);
      expect(t.out.report.unowned).toBe(0);
    }
  });

  it('two runs of one seed on two enceintes are identical (districts, typing, the report)', { timeout: 300_000 }, () => {
    const a = run(1).out;
    const g = growthRun(1);
    const b = runS6(g.input);
    expect(b.ok).toBe(true);
    if (!b.ok) return;
    expect(JSON.stringify([b.value.districts, b.value.typing, b.value.report])).toBe(JSON.stringify([a.districts, a.typing, a.report]));
  });

  it('the one-call form that cannot tell two enceintes apart, or a gate whose enceinte has no line, is refused', { timeout: 300_000 }, () => {
    const t = run(1);
    expect(() => siteFeatures(t.plat, { gates: t.gates, wall: t.walls[0].line as LatticePoint[] })).toThrow(TypeError);
    expect(() => siteFeatures(t.plat, { gates: t.gates, walls: [t.walls[1]] })).toThrow(/enceinte:1/);
    // each gate's anchor: touching its vertex, within its own line, outside exactly the lines inside that one
    const feats = siteFeatures(t.plat, { gates: t.gates, walls: t.walls });
    for (const f of feats) {
      const gate = t.gates.find((x) => x.id === f.id);
      const own = t.walls.findIndex((w) => w.enceinte === gate?.enceinte);
      expect(f.anchor.kind).toBe('point');
      if (f.anchor.kind !== 'point') continue;
      expect(f.anchor.touching).toBe(true);
      expect(f.anchor.within).toBe(t.walls[own].line);
      expect(f.anchor.outside).toEqual(t.walls.slice(0, own).map((w) => w.line));
    }
    expect(feats.length).toBe(t.gates.filter((x) => x.kind === 'main').length);
    // one enceinte's gates with its line alone: accepted
    const inner = t.gates.filter((x) => x.enceinte === t.walls[0].enceinte);
    expect(siteFeatures(t.plat, { gates: inner, wall: t.walls[0].line as LatticePoint[] }).length).toBe(inner.filter((x) => x.kind === 'main').length);
  });

  it('extramural (the typing’s relation): exactly the districts lying outside every wall line', { timeout: 300_000 }, () => {
    const cells = typingCells(s6Table());
    const sprawl = cells.kinds.findIndex((k) => k.kind === 'sprawl');
    expect(cells.kinds[sprawl].relations.map((r) => [r.to, r.mode])).toEqual([['extramural', 'prefer']]);
    const weight = cells.kinds[sprawl].relations[0].weight;
    const t = run(1);
    const g = faceGraph(t.plat, { ways: new Map(t.ways.map((w) => [w.id, w.class])), minBarrierClass: 'primary', perimeter: t.out.hinterland, water: new Set() });
    const ids = new Set(t.out.districts.map((d) => d.id));
    const area = new Map<Id, number>();
    for (const f of g.faces) if (f.owner !== null && ids.has(f.owner)) area.set(f.owner, (area.get(f.owner) ?? 0) + f.areaCm2);
    let land = 0;
    for (const a of area.values()) land += a;
    const remaining = new Map(cells.kinds.map((k) => [k.kind, k.share * land]));
    const typed = [...t.out.typing].sort((a, b) => (area.get(b.district) as number) - (area.get(a.district) as number) || (a.district < b.district ? -1 : a.district > b.district ? 1 : 0));
    const rng = createRng();
    const seen = new Map<number, number>();
    for (const x of typed) {
      const s = rng.stream(entityKey(seedKey(1), t.out.lineages.get(x.district) as [number, number], GROUND), STAGES.S6, CONCERNS['district.type'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
      let u = 0;
      for (let i = 0; i <= sprawl; i += 1) u = s.float01();
      const rest = x.scores[sprawl][1] - cells.randomWeight * u - cells.demandWeight * (Math.max(0, remaining.get('sprawl') as number) / land);
      const regions = [...regionsOfOwner(t, x.district)];
      expect(regions.length).toBe(1);
      seen.set(regions[0], (seen.get(regions[0]) ?? 0) + 1);
      const extramural = regions[0] === t.walls.length;
      expect(Math.abs(rest - (extramural ? weight : 0))).toBeLessThan(1e-9);
      remaining.set(x.kind, (remaining.get(x.kind) as number) - (area.get(x.district) as number));
    }
    // districts in all three regions: inside the inner wall, between the walls, outside both
    expect([...seen.keys()].sort()).toEqual([0, 1, 2]);
  });
});
