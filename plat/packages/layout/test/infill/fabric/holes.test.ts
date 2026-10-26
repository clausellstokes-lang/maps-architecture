// Holes (§4.6 *Holes*, §3.4 connectHole): a reservation inside a district's face is a hole of it; a cut that would
// cross the hole is a slit committed by connectHole, the annulus becomes simply connected and the same ladder cuts it
// (step 2's holed law, step 4's halved offset). The hole's own face is never cut; the face count never decreases.
import { area2, faceRings, isFaceLive, pointLocate, STAGES, type KernelTx } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { kerbSeed } from '../../../src/index.js';
import { arenaWays, fixture, GROUND, kerbNow, ownerOf, P, runFixture, waySegments, type Fixture } from './support.js';

const waySegmentsOf = (f: Fixture, id: string) => waySegments(f.plat, id);

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

/** A one-district W × H land inside a ring road (secondary, 6 m), a reservation hole hw × hh (default 10 m) at its centre. */
function deepHoled(W: number, H: number, hw: number, seed: number, hh = 1_000): Fixture {
  const x0 = W / 2 - hw / 2;
  const x1 = W / 2 + hw / 2;
  const y0 = H / 2 - hh / 2;
  const y1 = H / 2 + hh / 2;
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

/** The distance from p to a ring's edges (cm). */
function ringDist(ring: readonly { x: number; y: number }[], p: { x: number; y: number }): number {
  let best = Infinity;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const l2 = dx * dx + dy * dy;
    const t = l2 > 0 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2)) : 0;
    best = Math.min(best, Math.hypot(a.x + t * dx - p.x, a.y + t * dy - p.y));
  }
  return best;
}

/** Even–odd inside a ring. */
function inRing(ring: readonly { x: number; y: number }[], p: { x: number; y: number }): boolean {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[i];
    const b = ring[j];
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) c = !c;
  }
  return c;
}

/**
 * The seed's clearance against its kerb component's best (notes N-23 (f), N-26 C12): a block's seed is the pole of its
 * L1 face's kerb component, its holes counted as boundary — so its distance to the component's rings (the holes among
 * them) is the component's inscribed radius, which a 60 × 60 grid over the component bounds from below to within one
 * cell's half-diagonal. A pole of the outer ring alone (the holes ignored) lies nearer a hole than that. Returns how many
 * seeds sat in a component with a hole (the cases the property reads).
 */
function expectPolesClearHoles(f: Fixture, out: ReturnType<typeof runFixture>): number {
  let holed = 0;
  for (const bf of out.infill.blockFaces) {
    for (const s of bf.seeds) {
      const at = pointLocate(f.plat, GROUND, 1, s);
      expect(at.on).toBe('face');
      if (at.on !== 'face') continue;
      const rings = kerbNow(f.k, at.face);
      const outer = rings.filter((r) => area2(r) > 0 && inRing(r, s));
      expect(outer).toHaveLength(1);
      const holes = rings.filter((r) => area2(r) < 0 && inRing(outer[0], r[0]));
      if (holes.length === 0) continue;
      holed += 1;
      const comp = [outer[0], ...holes];
      const clear = (p: { x: number; y: number }): number => Math.min(...comp.map((r) => ringDist(r, p)));
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      for (const q of outer[0]) {
        x0 = Math.min(x0, q.x);
        y0 = Math.min(y0, q.y);
        x1 = Math.max(x1, q.x);
        y1 = Math.max(y1, q.y);
      }
      let best = 0;
      const n = 60;
      for (let i = 0; i <= n; i += 1) {
        for (let j = 0; j <= n; j += 1) {
          const p = { x: x0 + ((x1 - x0) * i) / n, y: y0 + ((y1 - y0) * j) / n };
          if (!inRing(outer[0], p) || holes.some((h) => inRing(h, p))) continue;
          best = Math.max(best, clear(p));
        }
      }
      const cell = Math.hypot(x1 - x0, y1 - y0) / n;
      expect(holes.some((h) => inRing(h, s))).toBe(false);
      expect(clear(s), `${bf.block}: the seed's clearance against the component's best`).toBeGreaterThanOrEqual(best - cell / 2 - 10);
    }
  }
  return holed;
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
    let holedSeeds = 0;
    for (const W of [12_000, 20_000]) {
      for (const H of [4_500, 5_000]) {
        for (const hw of [600, 2_000]) {
          for (const seed of [1, 2, 3, 4]) {
            const f = deepHoled(W, H, hw, seed);
            const out = runFixture(f);
            expect(out.infill.report.refused).toEqual([]);
            expectWaysAgree(f, out);
            holedSeeds += expectPolesClearHoles(f, out);
            slitRefused += out.infill.report.districts[0].rungs.filter((r) => r.rung === 'deep' && r.why === 'slit').length;
          }
        }
      }
    }
    // The sample reaches the refusal (not only the fixture above), and seeds in components with a hole.
    expect(slitRefused).toBeGreaterThanOrEqual(2);
    expect(holedSeeds).toBeGreaterThanOrEqual(2);
  });
});

describe('a deep block whose spine runs onto a hole tries the spine offset clear of it before the court (notes N-21; C-0423)', () => {
  // A 120 × 48 m land with a 6 × 2 m hole at its centre (prosperity 0.3, seed 1): the block's back lane through its
  // centre runs onto the hole (refused 'slit' before this round, the block kept a court); offset 4 m clear of the hole it
  // halves the block with both children above the floor.
  it('the 120 × 48 m land with a 6 × 2 m hole: the offset back lane cuts, two faces with a seed each, the hole in one, no slit, no court', { timeout: 120_000 }, () => {
    const f = deepHoled(12_000, 4_800, 600, 1, 200);
    const out = runFixture(f);
    const rep = out.infill.report.districts[0];
    expect(out.infill.report.refused).toEqual([]);
    const spined = out.blocks.filter((b) => b.interior === 'back_lane' || b.interior === 'through_alley');
    expect(spined).toHaveLength(1);
    expect(rep.rungs.filter((r) => r.rung === 'deep' && r.outcome === 'refused')).toEqual([]);
    expect(rep.warnings.W_DEEP_SPINE_REFUSED ?? 0).toBe(0);
    expect(out.lanes).toHaveLength(rep.rungs.filter((r) => r.outcome === 'cut' || r.outcome === 'slit').length);
    // The spine passes the hole, clear of it by its half-width: no point of its chain within the hole's box widened so.
    const kerb = out.infill.blockFaces.find((x) => x.block === spined[0].id)?.kerb ?? [];
    const lane = out.lanes.find((l) => waySegmentsOf(f, l.id).some(([a, b]) => inRing(kerb, { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })));
    expect(lane).toBeDefined();
    if (lane === undefined) return;
    const hw = (lane.width as number) / 2;
    for (const [a, b] of waySegmentsOf(f, lane.id)) {
      for (let t = 0; t <= 1; t += 0.05) {
        const x = a.x + t * (b.x - a.x);
        const y = a.y + t * (b.y - a.y);
        expect(x > 5_700 - hw && x < 6_300 + hw && y > 2_300 - hw && y < 2_500 + hw).toBe(false);
      }
    }
    expectWaysAgree(f, out);
    // The child on the hole's side holds it: its seed is the pole of a kerb component with a hole (N-26 C12).
    expect(expectPolesClearHoles(f, out)).toBeGreaterThanOrEqual(1);
  });
});


describe('kerbSeed’s unsplit pole counts the kerb’s holes (notes N-23 (f), K20)', () => {
  it('a land holding a reservation hole, before S8: kerbSeed of its face lies in no hole and has the component’s best clearance, holes counted', { timeout: 120_000 }, () => {
    const f = deepHoled(12_000, 4_500, 2_000, 1);
    const d = f.districts[0].district.id;
    let face = -1;
    for (let g = 0; g < f.plat.slots.face[1].top; g += 1) if (isFaceLive(f.plat, 1, g) && ownerOf(f.plat, g) === d) face = g;
    expect(face).toBeGreaterThanOrEqual(0);
    const rings = kerbNow(f.k, face);
    const outer = rings.filter((r) => area2(r) > 0);
    const holes = rings.filter((r) => area2(r) < 0);
    expect(outer).toHaveLength(1);
    expect(holes).toHaveLength(1);
    let seed: { x: number; y: number } | null = null;
    const READ: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S8 }, stage: STAGES.S8, rederivesFrom: STAGES.S8, workLimit: 100_000_000 };
    const r = f.k.tx(READ, (o) => {
      seed = kerbSeed(o, face, f.widths);
      return { ok: true as const, value: undefined, warnings: [] };
    });
    expect(r.ok).toBe(true);
    expect(seed).not.toBeNull();
    if (seed === null) return;
    const s: { x: number; y: number } = seed;
    expect(inRing(holes[0], s)).toBe(false);
    const comp = [outer[0], holes[0]];
    const clear = (p: { x: number; y: number }): number => Math.min(...comp.map((q) => ringDist(q, p)));
    let best = 0;
    for (let i = 0; i <= 80; i += 1) {
      for (let j = 0; j <= 80; j += 1) {
        const p = { x: (12_000 * i) / 80, y: (4_500 * j) / 80 };
        if (!inRing(outer[0], p) || inRing(holes[0], p)) continue;
        best = Math.max(best, clear(p));
      }
    }
    expect(clear(s)).toBeGreaterThanOrEqual(best - Math.hypot(12_000, 4_500) / 160 - 10);
  });
});
