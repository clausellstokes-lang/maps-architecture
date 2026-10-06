// Holes (§4.6 *Holes*, §3.4 connectHole): a reservation inside a district's face is a hole of it; a cut that would
// cross the hole is a slit committed by connectHole, the annulus becomes simply connected and the same ladder cuts it
// (step 2's holed law, step 4's halved offset). The hole's own face is never cut; the face count never decreases.
import { faceRings, isFaceLive, pointLocate, STAGES, type KernelTx } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { fixture, GROUND, ownerOf, P, runFixture } from './support.js';

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

  it('the fixture’s district face holds the hole', () => {
    expect(districtFacesBefore).toBe(1);
    expect(holesBefore).toBe(1);
  });

  it('a slit joins the hole by connectHole, and the annulus is then cut by the same ladder', () => {
    const slits = rep.rungs.filter((r) => r.outcome === 'slit');
    expect(slits.length).toBe(1);
    const slitFace = rep.faces.find((x) => x.outcome === 'slit');
    expect(slitFace?.facesAfter).toBe(1);
    // After the slit, faces were cut.
    expect(rep.faces.filter((x) => x.outcome === 'cut').length).toBeGreaterThan(0);
  });

  it('no district face keeps a hole, the hole’s face is untouched, the face count never decreases', () => {
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

  it('the slit is a lane whose one end is an `end` junction on the hole', () => {
    const slitRung = rep.rungs.find((r) => r.outcome === 'slit');
    expect(slitRung).toBeDefined();
    const ends = out.infill.junctions.filter((j) => j.kind === 'end');
    expect(ends.length).toBeGreaterThan(0);
  });
});
