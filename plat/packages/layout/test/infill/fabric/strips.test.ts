// The wall as a barrier (§4.6: "no cut is planned through a wall's band or setback"; "an end that arrives at a wall
// strip's setback line … stays there, square to the line"): S8 over the walled interior of M0-c-02's committed strips
// on the small flat site — 0 lanes cross a wall strip, the strip faces are never split, and every lane end on the
// setback line arrives within 85–95° of it.
import { attachIndex, createKernel, createPlat, faceRings, isFaceLive, rowKey, rowsOn, seedKey, STAGES, type FaceId, type KernelTx, type LatticePoint } from '@plat/kernel';
import { mint, type District, type Id } from '@plat/model';
import { rungProfile } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { commitS3Slice, flatFixture, granularityBands, runS8, s3Slice, spineWidthsOf, type S8Output } from '../../../src/index.js';
import { crossingDeg, generated, GROUND, halfEdgeFaces, minorOf, ownerOf, P } from './support.js';

const SEED = 3;

interface Walled {
  plat: ReturnType<typeof createPlat>;
  out: S8Output;
  district: Id;
  strips: Map<FaceId, string>;
  stripRingsBefore: Map<FaceId, LatticePoint[]>;
}

function walled(): Walled {
  const site = flatFixture(SEED, { frameAreaHa: 400, walledHa: 30 });
  const slice = s3Slice(site);
  const plat = createPlat(GROUND, site.frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const widths = new Map<Id, number>();
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: spineWidthsOf(widths) });
  const c = commitS3Slice(slice, k);
  if (!c.ok) throw new Error(`slice: ${c.code} ${c.detail}`);
  // The strip faces, and the land faces the inner strips bound (the walled interior, the plaza aside).
  const strips = new Map<FaceId, string>();
  for (let f = 0; f < plat.slots.face[1].top; f += 1) if (isFaceLive(plat, 1, f) && ownerOf(plat, f).startsWith('wall_strip:')) strips.set(f, ownerOf(plat, f));
  const hf = halfEdgeFaces(plat);
  const interior = new Set<FaceId>();
  for (const [h, f] of hf) {
    const owner = strips.get(f);
    if (owner === undefined || !owner.endsWith('-inner')) continue;
    const g = hf.get(h ^ 1);
    if (g !== undefined && ownerOf(plat, g) === '') interior.add(g);
  }
  const stripRingsBefore = new Map<FaceId, LatticePoint[]>();
  for (const f of strips.keys()) stripRingsBefore.set(f, faceRings(plat, 1, f)[0]);
  const sk = seedKey(SEED);
  const m = mint([{ kind: 'district', key: { arena: GROUND, unit: null, stage: STAGES.S6, epoch: 0, index: 0, reroll: 0 } }], [], [], sk)[0];
  const spec: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S6 }, stage: STAGES.S6, rederivesFrom: STAGES.S6, workLimit: 10_000_000 };
  const own = k.tx(spec, (o) => k.geom.setOwner(o, [...interior].sort((a, b) => a - b), m.identity.id));
  if (!own.ok) throw new Error(`own: ${own.code}`);
  const district: District = { id: m.identity.id, kind: 'central', quarter: 'quarter:q', faces: { owner: m.identity.id, level: 1 }, seams: [], growthStage: 1, fabric: 'bent-cut', fabricParams: {}, lifecycle: generated() };
  const r = runS8(
    {
      kernel: k,
      key: GROUND,
      seedKey: sk,
      rung: 'CITY',
      districts: [{ district, lineage: m.identity.lineage, prosperity: 0.45, density: 0.6, bands: granularityBands(0.45, rungProfile('CITY')), walled: true }],
      ways: [],
      seams: [],
      widths,
      live: [{ id: m.identity.id, lineage: m.identity.lineage }],
    },
    { report: undefined } as never,
  );
  if (!r.ok) throw new Error(`S8: ${r.code} ${r.detail}`);
  return { plat, out: r.value, district: m.identity.id, strips, stripRingsBefore };
}

describe('S8 inside the wall’s strips (M0-c-02’s committed strips, the small flat site)', () => {
  const w = walled();
  const rep = w.out.infill.report.districts[0];

  it('cuts the walled interior (lanes made, no district refused)', { timeout: 120_000 }, () => {
    expect(w.out.infill.report.refused).toEqual([]);
    expect(w.strips.size).toBeGreaterThan(0);
    expect(rep.lanes).toBeGreaterThan(5);
  });

  it('0 lanes cross a wall strip: every lane edge has the district’s faces on both sides', { timeout: 120_000 }, () => {
    const hf = halfEdgeFaces(w.plat);
    let edges = 0;
    for (const [h, f] of hf) {
      const lane = rowsOn(w.plat, 'edge', h).map((r) => rowKey(w.plat, r)).find((k) => k.role === 'way');
      if (lane === undefined || !w.out.lanes.some((x) => x.id === lane.entity)) continue;
      edges += 1;
      expect(ownerOf(w.plat, f)).toBe(w.district);
    }
    expect(edges).toBeGreaterThan(0);
  });

  it('no strip face is split or cleared: each stands with every corner it had and the same OBB', { timeout: 120_000 }, () => {
    for (const [f, before] of w.stripRingsBefore) {
      expect(isFaceLive(w.plat, 1, f)).toBe(true);
      const now = faceRings(w.plat, 1, f)[0];
      for (const q of before) expect(now.some((p) => p.x === q.x && p.y === q.y)).toBe(true);
      expect(minorOf(now)).toBeCloseTo(minorOf(before), 6);
    }
  });

  it('every lane end on the setback line stays there, square to it (85–95°)', { timeout: 120_000 }, () => {
    const hf = halfEdgeFaces(w.plat);
    let ends = 0;
    for (const lane of w.out.lanes) {
      // The lane's edges and the setback edges they meet.
      for (const [h] of hf) {
        if (!rowsOn(w.plat, 'edge', h).some((r) => rowKey(w.plat, r).role === 'way' && rowKey(w.plat, r).entity === lane.id)) continue;
        const a = h;
        const ox = w.plat.vertices.x[w.plat.halfEdges.origin[a]];
        const oy = w.plat.vertices.y[w.plat.halfEdges.origin[a]];
        const dv = w.plat.halfEdges.origin[a ^ 1];
        const dx = w.plat.vertices.x[dv];
        const dy = w.plat.vertices.y[dv];
        // The setback edges at its far vertex.
        for (const [g] of hf) {
          if (w.plat.halfEdges.origin[g] !== dv) continue;
          if (!rowsOn(w.plat, 'edge', g).some((r) => rowKey(w.plat, r).role === 'setback')) continue;
          const t = w.plat.halfEdges.origin[g ^ 1];
          const deg = crossingDeg(P(ox, oy), P(dx, dy), P(dx, dy), P(w.plat.vertices.x[t], w.plat.vertices.y[t]));
          ends += 1;
          expect(deg).toBeGreaterThanOrEqual(85);
        }
      }
    }
    expect(ends).toBeGreaterThan(0);
  });
});
