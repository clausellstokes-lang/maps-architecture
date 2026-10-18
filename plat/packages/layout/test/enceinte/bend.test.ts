// M0-c-02, the band hand-in (C-0324; §4.4 S5a *Trace* (2), (3) and *Water and the waterfront*, §2.2 rule 7): a crossing
// whose straight chord would leave the water is lawful input. The base RIVER fixture at seed 2 (900 ha, 30 ha walled) is
// the registered case: stage 2's boundary enters the river on the south bank at (41082, −4616), runs about 90 m inside
// it and U-turns out by the north bank at (49156, −1003), and the straight chord between those banks cuts the south
// bank's bulge. Two rules hold it:
//   (1) such a crossing is ROUTED ALONG ITS BANKS within the band: the trace follows the shore from each bank point to
//       the pair of shore points with the least shore walked whose chord keeps inside the water, and crosses there as
//       one chord (`water.ts`); a crossing no pair clears is refused, typed;
//   (2) each water gate takes the lowest `gate:w<i>` no earlier enceinte holds (C-0324 (3)), so a stage-2 trace crossing
//       the river where stage 1's does never names its gates `gate:w0`, `gate:w1` again (`trace.ts`).
import { describe, expect, it } from 'vitest';
import type { GateSite } from '@plat/model';
import { commitOuterRing, crossWater, RIVER_BLUEPRINT, runBase, siteContext, traceBase, waterRings, type BaseBlueprint } from '../../src/index.js';
import { ccw, lat, openRing } from '../../src/enceinte/plane.js';
import { densify, edgesWith, GROUND, handBuildWater, incidentRows, insideRing, kernelFor, P, ringDist, smallSite, verticesWith, wallsWith } from './support.js';

const k2 = (q: { x: number; y: number }): string => `${String(q.x)},${String(q.y)}`;

// An L-shaped river (water.test.ts's): an arm x 200–240 m from the south turning east along y 320–360 m. The boundary
// crosses the arm square to the south and the bend obliquely, entering on the east arm's south shore (y 320 m, east of
// the inner corner at (240, 320) m) and leaving by the north arm's west shore (x 200 m): the straight chord between those
// banks passes south of the inner corner, over land.
const BEND = [P(20000, -90000), P(24000, -90000), P(24000, 32000), P(90000, 32000), P(90000, 36000), P(20000, 36000)];
const INNER_CORNER = P(24000, 32000);
const CORNERS: [number, number][] = [[-30000, -30000], [30000, -30000], [30000, 31000], [22000, 34000], [16000, 26000], [-30000, 30000]];
const BOUNDARY = densify(CORNERS);
const GATES: GateSite[] = [
  { ordinal: 0, at: P(-30000, 0), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false },
  { ordinal: 1, at: P(0, -30000), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false },
];

/** Does the segment ab keep in the water ring: its 99 inner samples inside it (on the shore within 2 cm allowed)? */
function wetAlong(ring: readonly { x: number; y: number }[], a: { x: number; y: number }, b: { x: number; y: number }): boolean {
  for (let i = 1; i < 100; i += 1) {
    const q = { x: a.x + (i / 100) * (b.x - a.x), y: a.y + (i / 100) * (b.y - a.y) };
    if (!(insideRing(ring, q) || ringDist(q, ring) <= 2)) return false;
  }
  return true;
}

/** Does some inner sample of ab lie in the water deeper than 2 cm? */
function overWater(ring: readonly { x: number; y: number }[], a: { x: number; y: number }, b: { x: number; y: number }): boolean {
  for (let i = 1; i < 100; i += 1) {
    const q = { x: a.x + (i / 100) * (b.x - a.x), y: a.y + (i / 100) * (b.y - a.y) };
    if (insideRing(ring, q) && ringDist(q, ring) > 2) return true;
  }
  return false;
}

describe('a crossing whose chord would leave the water is routed along its banks within the band (Q40 (1); C-0324 (1))', () => {
  it('crossWater with the band: the oblique crossing walks the shore to the inner corner and crosses there as one clear chord; without the band it is left as before', () => {
    const ring = ccw(openRing(BOUNDARY.map(lat)));
    // Without a band (waterGates' reading of a committed trace): no route, the oblique crossing has no chord (C-0300).
    const plain = crossWater(ring, new Set(), [{ body: 'river:1', ring: BEND }]);
    const plainOblique = plain.crossings.filter((c) => c.entry.y > 0);
    expect(plainOblique).toHaveLength(1);
    expect(plainOblique[0].chord).toBe(false);
    expect(plainOblique[0].routed).toBeUndefined();

    const r = crossWater(ring, new Set(), [{ body: 'river:1', ring: BEND }], undefined, { ring, bandCm: 4000 });
    expect(r.crossings).toHaveLength(2);
    const square = r.crossings.filter((c) => c.entry.y < 0);
    expect(square).toHaveLength(1);
    expect(square[0].routed).toBeUndefined();
    expect(square[0].course).toEqual([square[0].entry, square[0].exit]);
    const oblique = r.crossings.filter((c) => c.entry.y > 0);
    expect(oblique).toHaveLength(1);
    const c = oblique[0];
    expect(c.routed).toBe(true);
    expect(c.chord).toBe(true);
    expect(c.clear).toBe(true);
    expect(c.course).toEqual([c.entry, c.exit]);
    // The original banks (the boundary's crossings of the two shores) are kept on the ring.
    const was = plainOblique[0];
    expect(r.keep.has(k2(was.entry))).toBe(true);
    expect(r.keep.has(k2(was.exit))).toBe(true);
    // The least shore walked: the entry walks west along the east arm's south shore to the inner corner, the exit stays.
    expect(c.entry).toEqual(INNER_CORNER);
    expect(c.exit).toEqual(was.exit);
    // The new chord keeps in the water (independent: 99 samples), the old one did not.
    expect(wetAlong(BEND, c.entry, c.exit)).toBe(true);
    expect(wetAlong(BEND, was.entry, was.exit)).toBe(false);
    // The ring runs entry → inner corner (along the shore) → the north arm's west bank, every walked point kept.
    const at = r.ring.findIndex((q) => q.x === was.entry.x && q.y === was.entry.y);
    expect(at).toBeGreaterThanOrEqual(0);
    expect(r.ring[(at + 1) % r.ring.length]).toEqual(INNER_CORNER);
    expect(r.ring[(at + 2) % r.ring.length]).toEqual(was.exit);
    expect(r.keep.has(k2(INNER_CORNER))).toBe(true);
    // The boundary's own vertices in the water there (its corner at (220, 340) m) are no longer on the ring.
    expect(r.ring.some((q) => q.x === 22000 && q.y === 34000)).toBe(false);
  });

  it('crossWater: no route when the band does not reach a clear chord (the inner corner 33 m from the entry, a 5 m band)', () => {
    const ring = ccw(openRing(BOUNDARY.map(lat)));
    const r = crossWater(ring, new Set(), [{ body: 'river:1', ring: BEND }], undefined, { ring, bandCm: 500 });
    const oblique = r.crossings.filter((c) => c.entry.y > 0);
    expect(oblique).toHaveLength(1);
    expect(oblique[0].chord).toBe(false);
    expect(oblique[0].clear).toBe(false);
    expect(oblique[0].routed).toBeUndefined();
  });

  it('crossWater: a pair whose chord leaves the band is no route (the inner corner\'s chord 18.6 m from the boundary under a 15 m band, its walk 11.7 m)', () => {
    const ring = ccw(openRing(BOUNDARY.map(lat)));
    const r = crossWater(ring, new Set(), [{ body: 'river:1', ring: BEND }], undefined, { ring, bandCm: 1500 });
    const oblique = r.crossings.filter((c) => c.entry.y > 0);
    expect(oblique).toHaveLength(1);
    expect(oblique[0].routed).toBeUndefined();
    expect(oblique[0].chord).toBe(false);
  });

  it('crossWater: a chord through a thin land needle between its nine samples is not clear — another pair is taken, its chord crossing no shore', () => {
    // The L-bend with a needle of land from the north arm's east shore just below the inner corner: base 10 cm on x 240 m,
    // tip at (210, 316) m. The inner corner's chord to the west bank crosses it about 15 m from its base, where it is
    // 5 cm wide, between two of the nine samples, and every needle vertex lies about 1 m off that chord (no contact for
    // the settling to take). The next pair by shore walked whose chord is clear: the entry itself and the west shore's
    // corner (200, 360) m.
    const NEEDLE = [P(20000, -90000), P(24000, -90000), P(24000, 31890), P(21000, 31600), P(24000, 31900), P(24000, 32000), P(90000, 32000), P(90000, 36000), P(20000, 36000)];
    const ring = ccw(openRing(BOUNDARY.map(lat)));
    const r = crossWater(ring, new Set(), [{ body: 'river:1', ring: NEEDLE }], undefined, { ring, bandCm: 4000 });
    const oblique = r.crossings.filter((c) => c.entry.y > 0);
    expect(oblique).toHaveLength(1);
    const c = oblique[0];
    expect(c.routed).toBe(true);
    // Independent: the corner's chord properly crosses a side of the needle; the chord taken crosses none.
    const crosses = (a: { x: number; y: number }, b: { x: number; y: number }): boolean => {
      const o = (p: { x: number; y: number }, q: { x: number; y: number }, t: { x: number; y: number }): number => Math.sign((q.x - p.x) * (t.y - p.y) - (q.y - p.y) * (t.x - p.x));
      for (let i = 0; i < NEEDLE.length; i += 1) {
        const u = NEEDLE[i];
        const v = NEEDLE[(i + 1) % NEEDLE.length];
        if (o(a, b, u) * o(a, b, v) < 0 && o(u, v, a) * o(u, v, b) < 0) return true;
      }
      return false;
    };
    const plain = crossWater(ring, new Set(), [{ body: 'river:1', ring: NEEDLE }]).crossings.filter((q) => q.entry.y > 0)[0];
    expect(crosses(INNER_CORNER, plain.exit)).toBe(true);
    expect(crosses(c.entry, c.exit)).toBe(false);
    expect([c.entry, c.exit]).toEqual([plain.entry, P(20000, 36000)]);
  });

  it('crossWater: a main gate in the water between the banks keeps the course (not routed), as before', () => {
    const ring = ccw(openRing(BOUNDARY.map(lat)));
    const gate = ring.find((q) => q.x === 22000 && q.y === 34000);
    expect(gate).toBeDefined();
    const r = crossWater(ring, new Set([k2(gate as { x: number; y: number })]), [{ body: 'river:1', ring: BEND }], undefined, { ring, bandCm: 4000 });
    const oblique = r.crossings.filter((c) => c.entry.y > 0);
    expect(oblique).toHaveLength(1);
    expect(oblique[0].chord).toBe(false);
    expect(oblique[0].routed).toBeUndefined();
  });

  it('through the strategy: the L-bend commits, each water gate one wall_gate edge across the water joining its two gate_end vertices on the shores, no other wall edge over water', () => {
    const site = smallSite(2);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const water = handBuildWater(k, BEND, 'river:1', P(22000, 0));
    // The straight chord would leave the water: unrouted, the crossing is refused E_INVARIANT "water: the crossing from …
    // has no clear chord between its two bank pins (its chord would leave the water)" (C-0300); routed, it commits.
    const r = traceBase(BOUNDARY, GATES, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k);
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    if (!r.ok) return;
    const wgs = r.value.traced.waterGates;
    expect(wgs.map((g) => g.id)).toEqual(['gate:w0', 'gate:w1']);
    for (const g of wgs) {
      const ends = [0, 1].map((o) => verticesWith(plat, 'gate_end', g.id, o));
      for (const e of ends) expect(e).toHaveLength(1);
      expect(ends.map((e) => e[0])).toEqual([g.bankAt[0], g.bankAt[1]]);
      for (const e of ends) {
        expect(ringDist(e[0], BEND)).toBeLessThanOrEqual(1);
        expect(incidentRows(plat, e[0]).some((q) => q.role === 'shore')).toBe(true);
      }
      const gated = edgesWith(plat, 'wall_gate', g.id);
      expect(gated).toHaveLength(1);
      expect([k2(gated[0].a), k2(gated[0].b)].sort()).toEqual([k2(g.bankAt[0]), k2(g.bankAt[1])].sort());
      expect(wetAlong(BEND, gated[0].a, gated[0].b)).toBe(true);
    }
    // The routed gate's bank 0 is the inner corner (an L0 shore vertex), its bank 1 the boundary's crossing of the west shore.
    const routed = wgs.find((g) => g.bankAt[0].y > 0 || g.bankAt[1].y > 0);
    expect(routed?.bankAt[0]).toEqual(INNER_CORNER);
    // Every wall edge over the water carries a wall_gate row.
    for (const e of edgesWith(plat, 'wall')) {
      if (overWater(BEND, e.a, e.b)) expect(e.rows.some((q) => q.role === 'wall_gate'), `${k2(e.a)} → ${k2(e.b)}`).toBe(true);
    }
  }, 120_000);

  it('through the strategy with a 5 m band: no bank route reaches a clear chord, so the trace is refused E_INVARIANT `water`, named, nothing written', () => {
    const site = smallSite(2, { tables: wallsWith('trace', 'searchBandM', 5) });
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const water = handBuildWater(k, BEND, 'river:1', P(22000, 0));
    const shores = edgesWith(plat, 'shore').length;
    const r = traceBase(BOUNDARY, GATES, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toMatch(/^water: the crossing from \S+ to \S+ has no clear chord between its two bank pins \(its chord would leave the water, and no route along its banks within the band gives a clear chord \(C-0324\)\)/);
    expect(edgesWith(plat, 'wall')).toEqual([]);
    expect(edgesWith(plat, 'wall_gate')).toEqual([]);
    expect(edgesWith(plat, 'shore')).toHaveLength(shores);
  }, 120_000);
});

describe('water gate ids across enceintes (Q40 (2); C-0324 (3))', () => {
  it('a second trace crossing the river where the first holds gate:w0 and gate:w1 takes gate:w2 and gate:w3, each gate_end resolving to one vertex', () => {
    const site = smallSite(2);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const river = [P(20000, -90000), P(24000, -90000), P(24000, 90000), P(20000, 90000)];
    const water = handBuildWater(k, river, 'river:1', P(22000, 0));
    const first = traceBase(densify([[-30000, -30000], [30000, -30000], [30000, 30000], [-30000, 30000]]), GATES, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k);
    expect(first.ok ? 'ok' : `${first.code} ${first.detail}`).toBe('ok');
    if (!first.ok) return;
    expect(first.value.traced.waterGates.map((g) => g.id)).toEqual(['gate:w0', 'gate:w1']);
    // A second, larger ring (enceinte:2) crossing the same river further out: its gates take the next free ids. Named
    // gate:w0 and gate:w1 again, their gate_end refs would resolve to two vertices each and the batch would be refused
    // E_DEGENERATE `stretch`.
    const gates2: GateSite[] = [
      { ordinal: 2, at: P(-60000, 0), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false },
      { ordinal: 3, at: P(0, -60000), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false },
    ];
    const second = traceBase(densify([[-60000, -60000], [60000, -60000], [60000, 60000], [-60000, 60000]]), gates2, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, { stage: 2, enceinteId: 'enceinte:2' });
    expect(second.ok ? 'ok' : `${second.code} ${second.detail}`).toBe('ok');
    if (!second.ok) return;
    expect(second.value.traced.waterGates.map((g) => g.id)).toEqual(['gate:w2', 'gate:w3']);
    expect(second.value.gates).toEqual(['gate:2', 'gate:3', 'gate:w2', 'gate:w3']);
    expect(second.value.traced.gates.map((g) => g.id)).toEqual(['gate:2', 'gate:3', 'gate:w2', 'gate:w3']);
    for (const id of ['gate:w0', 'gate:w1', 'gate:w2', 'gate:w3']) {
      for (const o of [0, 1]) expect(verticesWith(plat, 'gate_end', id, o), `${id} ${String(o)}`).toHaveLength(1);
      expect(edgesWith(plat, 'wall_gate', id), id).toHaveLength(1);
    }
    // The first trace's gates where they were.
    for (const g of first.value.traced.waterGates) expect([0, 1].map((o) => verticesWith(plat, 'gate_end', g.id, o)[0])).toEqual([g.bankAt[0], g.bankAt[1]]);
  }, 120_000);
});

describe('the base RIVER fixture at seed 2, 900 ha, 30 ha walled (Q40; the replay of M0-x-02 s2 finding (b))', () => {
  const RIVER: BaseBlueprint = { ...RIVER_BLUEPRINT, size: { ...RIVER_BLUEPRINT.size, areaHa: 900 }, walledHa: 30 };

  it('runBase commits every stage with no bug: stage 2 crosses the river at gate:w2 (routed along the south bank) and gate:w3, and S6 and S8 run', () => {
    const r = runBase(RIVER, 2, { kind: 'all' });
    // No bug: a refused S5 would read [{ cls: 'E_INVARIANT', stage: 'S5', … }], with S6 and S8 idle on missing inputs.
    expect(r.report.bugs).toEqual([]);
    const k = r.model.kernel;
    const plat = k.plat(GROUND);
    // S5's gate records: stage 2's water gates after stage 1's in the arena (stage 1's gate:w0 and gate:w1 stand, S3's).
    const gates = r.model.data.get('gates') as { id: string; kind: string; enceinte: string }[];
    const ids = gates.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(gates.filter((g) => g.kind === 'water').map((g) => [g.id, g.enceinte])).toEqual([
      ['gate:w2', 'enceinte:2'],
      ['gate:w3', 'enceinte:2'],
    ]);
    const enceintes = r.model.data.get('enceintes') as { id: string; gates: string[] }[];
    expect(enceintes.find((e) => e.id === 'enceinte:2')?.gates.filter((g) => g.startsWith('gate:w'))).toEqual(['gate:w2', 'gate:w3']);
    // gate:w2 is the crossing that was refused: bank 0 walked one shore vertex along the south bank from the boundary's
    // crossing (41082, -4616) to (41323, -4451), bank 1 the boundary's crossing of the north bank.
    expect(verticesWith(plat, 'gate_end', 'gate:w2', 0)).toEqual([P(41323, -4451)]);
    expect(verticesWith(plat, 'gate_end', 'gate:w2', 1)).toEqual([P(49156, -1003)]);
    const rings = waterRings(r.model.data.get('water') as never, k, GROUND).map((w) => w.ring);
    expect(rings.length).toBeGreaterThan(0);
    const onShore = (q: { x: number; y: number }): boolean => rings.some((w) => ringDist(q, w) <= 1);
    for (const g of ['gate:w0', 'gate:w1', 'gate:w2', 'gate:w3']) {
      const ends = [0, 1].map((o) => verticesWith(plat, 'gate_end', g, o));
      for (const e of ends) {
        expect(e, g).toHaveLength(1);
        expect(onShore(e[0]), g).toBe(true);
      }
      const gated = edgesWith(plat, 'wall_gate', g);
      expect(gated, g).toHaveLength(1);
      expect([k2(gated[0].a), k2(gated[0].b)].sort(), g).toEqual([k2(ends[0][0]), k2(ends[1][0])].sort());
      expect(rings.some((w) => wetAlong(w, gated[0].a, gated[0].b)), g).toBe(true);
    }
    // No wall edge of either enceinte lies over the water but a water gate's chord.
    for (const e of edgesWith(plat, 'wall')) {
      if (rings.some((w) => overWater(w, e.a, e.b))) expect(e.rows.some((q) => q.role === 'wall_gate'), `${k2(e.a)} → ${k2(e.b)}`).toBe(true);
    }
    // Stage 2's strips were laid, and S6 and S8 ran on the seed (they idled on missing inputs before).
    const v = k.view(GROUND, 1);
    const owners = v.faces().map((f) => v.owner(f) ?? '');
    expect(owners.some((o) => o === 'wall_strip:2-inner')).toBe(true);
    expect(owners.some((o) => o === 'wall_strip:2-outer')).toBe(true);
    expect((r.model.data.get('districts') as unknown[]).length).toBeGreaterThan(0);
    const infill = r.model.data.get('infill') as { report: { districts: unknown[]; refused: unknown[] } };
    expect(infill.report.refused).toEqual([]);
    expect((r.model.data.get('blocks') as unknown[]).length).toBeGreaterThan(0);
  }, 900_000);
});
