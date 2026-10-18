// N-57 (3) (checks/M0-spec-notes.md; diagnosis-c06-smoke.md §1; C-0329): a block's seed in each of its L1 faces is the
// pole of that face's kerb component — one definition for the unsplit block and for each child of a back lane's or
// through alley's split (`kerbSeed`), so the seed S9 and the harness find the block by lies in the block, never in a
// corridor; a child whose kerb has no area records no seed. Fixture: fusion 30's face 197 (block:6eppwwjg267pw's east
// child, translated by (680 m, 290 m)) with its three ways' widths — the pole of its FACE ring lies 9 cm inside way:11's
// band, the pole of its kerb inside the kerb. Property: over the fabric's test fixtures every recorded seed lies strictly
// inside one ring of kerb(its L1 face). Refined by J318 (C-0338; splitSeeds.test.ts): a child's seed is the pole of the
// component of kerb(child) inside the parent's kerb at the cut — the property below holds for it unchanged.
import { faceRings, pointLocate, STAGES, type KernelTx, type LatticePoint } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { kerbSeed, localThickness } from '../../../src/index.js';
import { fixture, GROUND, kerbNow, P, runFixture, twoDistricts, type Fixture } from './support.js';

/** Twice a ring's signed area. */
function area2(r: readonly LatticePoint[]): number {
  let s = 0;
  for (let i = 0; i < r.length; i += 1) {
    const a = r[i];
    const b = r[(i + 1) % r.length];
    s += a.x * b.y - b.x * a.y;
  }
  return s;
}

/** Even–odd inside, and the distance to the ring's boundary (cm). */
function inside(ring: readonly LatticePoint[], p: { x: number; y: number }): { in: boolean; d: number } {
  let c = false;
  let d = Infinity;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[i];
    const b = ring[j];
    if (a.y > p.y !== b.y > p.y && p.x < a.x + ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y)) c = !c;
    const l2 = (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);
    const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2));
    d = Math.min(d, Math.hypot(a.x + t * (b.x - a.x) - p.x, a.y + t * (b.y - a.y) - p.y));
  }
  return { in: c, d };
}

/** Is the point strictly inside one outer ring of the kerb and in none of its holes? */
function inKerb(rings: readonly LatticePoint[][], p: { x: number; y: number }): boolean {
  const outers = rings.filter((r) => r.length >= 3 && area2(r) > 0);
  const holes = rings.filter((r) => r.length >= 3 && area2(r) < 0);
  const holder = outers.filter((r) => {
    const x = inside(r, p);
    return x.in && x.d > 0;
  });
  if (holder.length !== 1) return false;
  return !holes.some((h) => {
    const x = inside(h, p);
    return x.in || x.d === 0;
  });
}

/** A batch that writes nothing, for a read of the open overlay. */
const READ: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S8 }, stage: STAGES.S8, rederivesFrom: STAGES.S8, workLimit: 100_000_000 };

/**
 * Fusion 30's face 197 (diagnosis-c06-smoke.md §1; the probe's ring and widths): way:11 (hw 500) on the north, the
 * through alley way:58xx… (hw 100.021) on the west, the dead-end lane way:fawj… (hw 150.289) on the south, and the stand-in
 * district's three spineless edges on the east; each way continued past the face as in the smoke.
 */
function face197(): { f: Fixture; face: number } {
  const f = fixture(
    20_000,
    [
      { id: 'way:11', cls: 'primary', widthCm: 1000, points: [P(5_373, 572), P(3_181, 846), P(2_085, 983), P(623, 724), P(-913, 452), P(-2_801, 750)] },
      { id: 'way:58xx', cls: 'alley', widthCm: 200.042, points: [P(623, 724), P(648, 211), P(730, -1_489), P(738, -1_641)] },
      { id: 'way:fawj', cls: 'lane', widthCm: 300.578, points: [P(1_434, -1_715), P(1_032, -1_674), P(738, -1_641), P(631, -1_629), P(-3_117, -960)] },
      { id: 'way:edge', cls: 'lane', widthCm: 1, points: [P(1_434, -1_715), P(1_613, 189), P(3_115, 148), P(3_181, 846)] },
    ],
    [{ seeds: [P(1_135, 311)], prosperity: 0.3, density: 0.5 }],
  );
  // The east edges are the district's own boundary: no way's corridor (a spineless edge, no width).
  f.widths.delete('way:edge');
  const at = pointLocate(f.plat, GROUND, 1, P(1_135, 311));
  if (at.on !== 'face') throw new Error('face197: the seed is in no face');
  return { f, face: at.face };
}

describe('a block’s seed is the pole of its L1 face’s kerb, split or not (N-57 (3))', () => {
  it('fusion 30’s face 197: the pole of the face ring lies in way:11’s band (outside the kerb); kerbSeed lies strictly inside the kerb', { timeout: 120_000 }, () => {
    const { f, face } = face197();
    const ring = faceRings(f.plat, 1, face)[0];
    expect(ring.length).toBe(10);
    const kr = kerbNow(f.k, face);
    expect(kr.filter((r) => area2(r) > 0).length).toBe(1);
    // The old seed: the pole of the child's FACE ring (makeBlock's split branch before this round).
    const facePole = localThickness([ring]).centre;
    expect(inKerb(kr, facePole)).toBe(false);
    let seed: LatticePoint | null = null;
    const r = f.k.tx(READ, (o) => {
      seed = kerbSeed(o, face, f.widths);
      return { ok: true as const, value: undefined, warnings: [] };
    });
    expect(r.ok).toBe(true);
    expect(seed).not.toBeNull();
    if (seed === null) return;
    expect(inKerb(kr, seed)).toBe(true);
    // The L1 face holding the seed is the face itself.
    const at = pointLocate(f.plat, GROUND, 1, seed);
    expect(at.on === 'face' && at.face === face).toBe(true);
  });

  it('a face whose kerb has no area gives no seed', { timeout: 120_000 }, () => {
    // A 4 m wide strip between two 6 m ways: their corridors cover it.
    const f = fixture(
      20_000,
      [
        { id: 'way:n', cls: 'secondary', widthCm: 600, points: [P(-5_000, 200), P(5_000, 200)] },
        { id: 'way:s', cls: 'secondary', widthCm: 600, points: [P(-5_000, -200), P(5_000, -200)] },
        { id: 'way:w', cls: 'secondary', widthCm: 600, points: [P(-5_000, -200), P(-5_000, 200)] },
        { id: 'way:e', cls: 'secondary', widthCm: 600, points: [P(5_000, -200), P(5_000, 200)] },
      ],
      [{ seeds: [P(0, 0)], prosperity: 0.3, density: 0.5 }],
    );
    const at = pointLocate(f.plat, GROUND, 1, P(0, 0));
    expect(at.on).toBe('face');
    if (at.on !== 'face') return;
    let seed: LatticePoint | null = P(1, 1);
    const r = f.k.tx(READ, (o) => {
      seed = kerbSeed(o, at.face, f.widths);
      return { ok: true as const, value: undefined, warnings: [] };
    });
    expect(r.ok).toBe(true);
    expect(seed).toBeNull();
  });

  for (const seed of [7, 11]) {
    it(`property (two districts, seed ${String(seed)}): every recorded seed lies strictly inside one ring of kerb(its L1 face), the split blocks’ two among them`, { timeout: 300_000 }, () => {
      const f = twoDistricts({ seed });
      const out = runFixture(f);
      let split = 0;
      let seeds = 0;
      // Each split child's seed against the pole of its kerb read now (kerbSeed after the stage, with the parent's kerb
      // at the cut, J318, C-0338): the same definition, within the drift of a kerb read at the split against the stage's
      // end (N-57 (4): ≤ 2 · attractCm on an edge; measured ≤ 8 cm here, where the child FACE's pole lies 13–389 cm off).
      const poles = new Map<string, LatticePoint | null>();
      const r = f.k.tx(READ, (o) => {
        for (const b of out.infill.blockFaces) {
          if (b.seeds.length < 2) continue;
          for (const s of b.seeds) {
            const at = pointLocate(f.plat, GROUND, 1, s);
            if (at.on === 'face') poles.set(`${String(s.x)},${String(s.y)}`, kerbSeed(o, at.face, f.widths, [b.kerb.slice()]));
          }
        }
        return { ok: true as const, value: undefined, warnings: [] };
      });
      expect(r.ok).toBe(true);
      for (const b of out.infill.blockFaces) {
        if (b.seeds.length > 1) split += 1;
        for (const s of b.seeds) {
          seeds += 1;
          const at = pointLocate(f.plat, GROUND, 1, s);
          expect(at.on).toBe('face');
          if (at.on !== 'face') continue;
          expect(inKerb(kerbNow(f.k, at.face), s)).toBe(true);
          if (b.seeds.length < 2) continue;
          const pole = poles.get(`${String(s.x)},${String(s.y)}`) ?? null;
          expect(pole).not.toBeNull();
          if (pole !== null) expect(Math.hypot(pole.x - s.x, pole.y - s.y)).toBeLessThanOrEqual(100);
        }
        // A split block's two seeds lie in two different L1 faces.
        if (b.seeds.length === 2) {
          const a0 = pointLocate(f.plat, GROUND, 1, b.seeds[0]);
          const a1 = pointLocate(f.plat, GROUND, 1, b.seeds[1]);
          expect(a0.on === 'face' && a1.on === 'face' && a0.face !== a1.face).toBe(true);
        }
      }
      expect(split).toBeGreaterThan(0);
      expect(seeds).toBeGreaterThan(out.blocks.length);
    });
  }
});
