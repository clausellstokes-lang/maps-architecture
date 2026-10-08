// Holes (§4.6 *Holes*, §3.4 connectHole): a reservation inside a district's face is a hole of it; a cut that would
// cross the hole is a slit committed by connectHole, the annulus becomes simply connected and the same ladder cuts it
// (step 2's holed law, step 4's halved offset). The hole's own face is never cut; the face count never decreases.
import { faceRings, isFaceLive, isHalfEdgeLive, pointLocate, rowKey, rowsOn, STAGES, type KernelTx, type Plat } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { fixture, GROUND, ownerOf, P, runFixture, type Fixture } from './support.js';

function holedDistrict(): ReturnType<typeof fixture> {
  const W = 24_000;
  const H = 16_000;
  const hole = [P(10_000, 6_500), P(10_000, 9_500), P(14_000, 9_500), P(14_000, 6_500)];
  return fixture(
    40_000,
    [{ id: 'way:ring', cls: 'secondary', widthCm: 600, points: [P(0, 0), P(W, 0), P(W, H), P(0, H)], closed: true }],
    [{ seeds: [P(2_000, 2_000)], prosperity: 0.3, density: 0.5 }],
    {
      extraL1: (k, plat) => {
        const spec: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S3 }, stage: STAGES.S3, rederivesFrom: STAGES.S3, workLimit: 10_000_000 };
        const r = k.tx(spec, (o) => {
          const c = k.geom.insertChain(o, hole, [{ role: 'reserved', entity: 'reservation:r' }], 'mandatory', { closed: true });
          if (!c.ok) return { ok: false as const, code: c.code, detail: c.detail };
          const at = pointLocate(plat, GROUND, 1, P(12_000, 8_000));
          if (at.on !== 'face') return { ok: false as const, code: 'E_INVARIANT' as const, detail: 'the hole face' };
          return k.geom.setOwner(o, [at.face], 'reservation:r');
        });
        if (!r.ok) throw new Error(`hole: ${r.code} ${r.detail}`);
      },
    },
  );
}

function holeFace(plat: ReturnType<typeof fixture>['plat']): number {
  for (let f = 0; f < plat.slots.face[1].top; f += 1) if (isFaceLive(plat, 1, f) && ownerOf(plat, f) === 'reservation:r') return f;
  return -1;
}

describe('a district face with a reservation hole', () => {
  const f = holedDistrict();
  const d = f.districts[0].district.id;
  const holeRingBefore = JSON.stringify(faceRings(f.plat, 1, holeFace(f.plat)));
  const districtFacesBefore = (() => {
    let n = 0;
    for (let g = 0; g < f.plat.slots.face[1].top; g += 1) if (isFaceLive(f.plat, 1, g) && ownerOf(f.plat, g) === d) n += 1;
    return n;
  })();
  const holesBefore = (() => {
    for (let g = 0; g < f.plat.slots.face[1].top; g += 1) if (isFaceLive(f.plat, 1, g) && ownerOf(f.plat, g) === d) return faceRings(f.plat, 1, g).length - 1;
    return -1;
  })();
  const out = runFixture(f);
  const rep = out.infill.report.districts[0];

  it('the fixture’s district face holds the hole', { timeout: 120_000 }, () => {
    expect(districtFacesBefore).toBe(1);
    expect(holesBefore).toBe(1);
  });

  it('a slit joins the hole by connectHole, and the annulus is then cut by the same ladder', { timeout: 120_000 }, () => {
    const slits = rep.rungs.filter((r) => r.outcome === 'slit');
    expect(slits.length).toBe(1);
    const slitFace = rep.faces.find((x) => x.outcome === 'slit');
    expect(slitFace?.facesAfter).toBe(1);
    // After the slit, faces were cut.
    expect(rep.faces.filter((x) => x.outcome === 'cut').length).toBeGreaterThan(0);
  });

  it('no district face keeps a hole, the hole’s face is untouched, the face count never decreases', { timeout: 120_000 }, () => {
    let n = 0;
    for (let g = 0; g < f.plat.slots.face[1].top; g += 1) {
      if (!isFaceLive(f.plat, 1, g) || ownerOf(f.plat, g) !== d) continue;
      n += 1;
      expect(faceRings(f.plat, 1, g).length).toBe(1);
    }
    expect(n).toBeGreaterThanOrEqual(districtFacesBefore);
    // The hole: its ring now carries the slit's end vertex, but its corners and its owner stand.
    const now = faceRings(f.plat, 1, holeFace(f.plat));
    expect(now.length).toBe(1);
    for (const q of JSON.parse(holeRingBefore)[0] as { x: number; y: number }[]) expect(now[0].some((p) => p.x === q.x && p.y === q.y)).toBe(true);
    expect(out.infill.report.refused).toEqual([]);
    for (const fl of rep.faces) expect(fl.facesAfter).toBeGreaterThanOrEqual(1);
  });

  it('the slit is a lane whose one end is an `end` junction on the hole', { timeout: 120_000 }, () => {
    const slitRung = rep.rungs.find((r) => r.outcome === 'slit');
    expect(slitRung).toBeDefined();
    const ends = out.infill.junctions.filter((j) => j.kind === 'end');
    expect(ends.length).toBeGreaterThan(0);
  });
});

// N-52 (4) (C-0288): a block that stops while holding a hole and draws a back lane or a through alley — its spine,
// through the inscribed circle's centre, can run onto the hole, which the judge reads as a slit. The spine must halve
// its block, so a slit is refused before the kernel: the block keeps a court (W_DEEP_SPINE_REFUSED, its 'deep' rung
// refused 'slit') and no lane stays in the arena. Before the fix the slit lane stayed inserted (a Way, its junction
// rows) while the block was recorded a court with its pre-slit kerb.

/** A one-district W × H land inside a ring road (secondary, 6 m), a reservation hole hw × 10 m at its centre. */
function deepHoled(W: number, H: number, hw: number, seed: number): Fixture {
  const x0 = W / 2 - hw / 2;
  const x1 = W / 2 + hw / 2;
  const y0 = H / 2 - 500;
  const y1 = H / 2 + 500;
  const hole = [P(x0, y0), P(x0, y1), P(x1, y1), P(x1, y0)];
  return fixture(
    Math.max(W, H) + 10_000,
    [{ id: 'way:ring', cls: 'secondary', widthCm: 600, points: [P(0, 0), P(W, 0), P(W, H), P(0, H)], closed: true }],
    [{ seeds: [P(300, 300)], prosperity: 0.3, density: 0.5 }],
    {
      seed,
      extraL1: (k, plat) => {
        const spec: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S3 }, stage: STAGES.S3, rederivesFrom: STAGES.S3, workLimit: 10_000_000 };
        const r = k.tx(spec, (o) => {
          const c = k.geom.insertChain(o, hole, [{ role: 'reserved', entity: 'reservation:r' }], 'mandatory', { closed: true });
          if (!c.ok) return { ok: false as const, code: c.code, detail: c.detail };
          const at = pointLocate(plat, GROUND, 1, P(W / 2, H / 2));
          if (at.on !== 'face') return { ok: false as const, code: 'E_INVARIANT' as const, detail: 'the hole face' };
          return k.geom.setOwner(o, [at.face], 'reservation:r');
        });
        if (!r.ok) throw new Error(`hole: ${r.code} ${r.detail}`);
      },
    },
  );
}

/** The way ids carried by the arena's live edges (read from its own tables, never through the code under test). */
function arenaWays(plat: Plat): Set<string> {
  const ids = new Set<string>();
  for (let e = 0; e < 2 * plat.slots.pair.top; e += 1) {
    if (!isHalfEdgeLive(plat, e)) continue;
    for (const r of rowsOn(plat, 'edge', e)) {
      const k = rowKey(plat, r);
      if (k.role === 'way') ids.add(k.entity);
    }
  }
  return ids;
}

/**
 * Ways ⇔ block interiors: the lanes S8 reports are exactly the lanes in the arena; every lane is one cut or slit rung;
 * a deep spine is cut exactly for each back-lane / through-alley block, which two L1 faces hold; a block refused its
 * spine keeps a court in one face; no deep spine is ever a slit.
 */
function expectWaysAgree(f: Fixture, out: ReturnType<typeof runFixture>): void {
  const fixtureWays = new Set(f.ways.map((w) => w.id));
  const inArena = [...arenaWays(f.plat)].filter((id) => !fixtureWays.has(id)).sort();
  expect(inArena).toEqual(out.lanes.map((w) => w.id).sort());
  const rungs = out.infill.report.districts.flatMap((d) => d.rungs);
  const inserted = rungs.filter((r) => r.outcome === 'cut' || r.outcome === 'slit');
  expect(inserted.length).toBe(out.lanes.length);
  // Every lane a deep rung inserted is the spine of a back-lane / through-alley block, and each such block has one.
  const spined = out.blocks.filter((b) => b.interior === 'back_lane' || b.interior === 'through_alley');
  expect(inserted.filter((r) => r.rung === 'deep').length).toBe(spined.length);
  expect(out.lanes.length).toBe(inserted.filter((r) => r.rung !== 'deep').length + spined.length);
  expect(rungs.filter((r) => r.rung === 'deep' && r.outcome === 'slit')).toEqual([]);
  for (const b of out.blocks) {
    const bf = out.infill.blockFaces.find((x) => x.block === b.id);
    expect(bf).toBeDefined();
    const faces = new Set((bf?.seeds ?? []).map((s) => {
      const at = pointLocate(f.plat, GROUND, 1, s);
      return at.on === 'face' ? at.face : -1;
    }));
    if (b.interior === 'back_lane' || b.interior === 'through_alley') expect(faces.size).toBe(2);
    else expect(faces.size).toBeLessThanOrEqual(1);
  }
}

describe('a deep block holding a hole: its spine never slits (N-52 (4), C-0288)', () => {
  it('the 120 × 45 m land with a 6 × 10 m hole at seed 1: the spine runs onto the hole, is refused, no lane stays', { timeout: 120_000 }, () => {
    const f = deepHoled(12_000, 4_500, 600, 1);
    const d = f.districts[0].district.id;
    const out = runFixture(f);
    const rep = out.infill.report.districts[0];
    expect(out.infill.report.refused).toEqual([]);
    // The face stops at step 1 (its kerb's minor 39 m < e_lo) as one deep block whose back lane meets the hole.
    expect(rep.faces.map((x) => x.outcome)).toEqual(['block']);
    expect(out.blocks.length).toBe(1);
    expect(out.blocks[0]).toMatchObject({ depthClass: 'deep', interior: 'court' });
    expect(rep.rungs.filter((r) => r.rung === 'deep')).toEqual([{ face: rep.faces[0].face, rung: 'deep', attempt: 0, outcome: 'refused', why: 'slit' }]);
    expect(rep.warnings).toEqual({ W_DEEP_SPINE_REFUSED: 1 });
    // No lane: none reported, none in the arena, no junction, no width written.
    expect(out.lanes).toEqual([]);
    expect(rep.lanes).toBe(0);
    expect(rep.laneLengths).toEqual([]);
    expect(out.infill.junctions).toEqual([]);
    expect([...arenaWays(f.plat)]).toEqual(['way:ring']);
    expect([...f.widths.keys()]).toEqual(['way:ring']);
    // The district's face still holds the hole, and the block's one seed finds it.
    const own: number[] = [];
    for (let g = 0; g < f.plat.slots.face[1].top; g += 1) if (isFaceLive(f.plat, 1, g) && ownerOf(f.plat, g) === d) own.push(g);
    expect(own.length).toBe(1);
    expect(faceRings(f.plat, 1, own[0]).length).toBe(2);
    const seeds = out.infill.blockFaces[0].seeds;
    expect(seeds.length).toBe(1);
    const at = pointLocate(f.plat, GROUND, 1, seeds[0]);
    expect(at.on === 'face' ? at.face : -1).toBe(own[0]);
    expectWaysAgree(f, out);
  });

  it('over holed lands that stop as one deep block (two lengths, two depths, two holes, four seeds): ways agree with the blocks', { timeout: 300_000 }, () => {
    let slitRefused = 0;
    for (const W of [12_000, 20_000]) {
      for (const H of [4_500, 5_000]) {
        for (const hw of [600, 2_000]) {
          for (const seed of [1, 2, 3, 4]) {
            const f = deepHoled(W, H, hw, seed);
            const out = runFixture(f);
            expect(out.infill.report.refused).toEqual([]);
            expectWaysAgree(f, out);
            slitRefused += out.infill.report.districts[0].rungs.filter((r) => r.rung === 'deep' && r.why === 'slit').length;
          }
        }
      }
    }
    // The sample reaches the refusal (not only the fixture above).
    expect(slitRefused).toBeGreaterThanOrEqual(2);
  });
});
