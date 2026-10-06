// T34-1's commit clause (§13.2; §4.6 step 1; the checker's SP-r1-01; C-0122): after each district's S8 transaction,
// every block it committed has an OBB minor extent below the τ drawn for the face it came from, and every face the
// ladder cut had one at or above its τ — replayed from the cut.stop draws (the face's stream key and its four uniforms
// in the report) — on the M0 (b) synthetic face set (M0-k-01's generators: curved, round-joined, triangular, C-shaped and
// holed faces) in the PR tier; rungs (b)–(d) run only on faces whose τ test passed. With F-CUT's per-face counts on the
// same faces: the ladder ends in ≤ 6 kernel calls and the face count never decreases.
import fc from 'fast-check';
import { CONCERNS, createRng, entityKey, obb, STAGES, type LatticePoint } from '@plat/kernel';
import { blockDepthRange, runS8, stopThreshold } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { arb, seedFamily, type FuzzFaceKind } from '../../../src/fuzz/index.js';
import { faceAt, faceCase, GROUND, kerbNow } from './support.js';

/** The M0 (b) set's five kinds (§16 M0 (b)). */
const KINDS: readonly FuzzFaceKind[] = ['curved', 'round-joined', 'triangular', 'C-shaped', 'holed'];

/** Faces per kind in the PR tier, at block scale up to 150 m (each face's run is a few seconds on the kernel's kerb). */
const PER_KIND = 3;

function minorOf(ring: readonly LatticePoint[]): number {
  const b = obb(ring);
  return b.ok ? b.value.minorCm : 0;
}

function largest(rings: readonly (readonly LatticePoint[])[]): LatticePoint[] {
  let best: LatticePoint[] = [];
  let bestA = -Infinity;
  for (const r of rings) {
    let a = 0;
    for (let i = 0; i < r.length; i += 1) {
      const p = r[i];
      const q = r[(i + 1) % r.length];
      a += p.x * q.y - q.x * p.y;
    }
    if (a > bestA) {
      bestA = a;
      best = r.slice();
    }
  }
  return best;
}

describe('T34-1’s commit clause on the M0 (b) face set', () => {
  for (const kind of KINDS) {
    it(`${kind}: blocks below τ, cut faces at or above it, replayed from the cut.stop draws`, { timeout: 600_000 }, () => {
      const seed = seedFamily(`m0b/infill-fabric/${kind}`, 0);
      const faces = fc.sample(arb.faceSet(kind, { sizeCm: [4_000, 15_000] }), { seed, numRuns: PER_KIND });
      let blocks = 0;
      let cut = 0;
      for (let i = 0; i < faces.length; i += 1) {
        const c = faceCase(faces[i].polygon, seed + i);
        const r = runS8(c.input, { report: undefined } as never);
        expect(r.ok).toBe(true);
        if (!r.ok) continue;
        expect(r.value.infill.report.refused).toEqual([]);
        const rep = r.value.infill.report.districts[0];
        const d = c.input.districts[0];
        const [eLoM, eHiM] = blockDepthRange(d.bands!, undefined);
        const byFace = new Map(rep.stops.map((s) => [s.face, s]));
        // The replay: each stop's four uniforms from its face's own cut.stop stream, g = |Σu / 2 − 1|, τ the design's.
        for (const s of rep.stops) {
          const st = createRng().stream(entityKey(c.input.seedKey, s.lineage, GROUND), STAGES.S8, CONCERNS['cut.stop'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
          const u = [st.float01(), st.float01(), st.float01(), st.float01()];
          expect(s.uniforms).toEqual(u);
          const g = Math.abs((u[0] + u[1] + u[2] + u[3]) / 2 - 1);
          expect(s.g).toBe(g);
          expect(s.tauCm).toBe(stopThreshold(eLoM * 100, eHiM * 100, g));
          expect(s.key).toContain('cut.stop');
          if (s.outcome === 'cut') {
            // Every face the ladder cut had a minor extent at or above its τ.
            expect(s.minorCm).toBeGreaterThanOrEqual(s.tauCm);
            cut += 1;
          } else expect(s.minorCm).toBeLessThan(s.tauCm);
        }
        // Every block the transaction committed by the stop test: its committed face's kerb — read now from the arena,
        // not from the report — has an OBB minor extent below the τ drawn for its face.
        for (const bf of r.value.infill.blockFaces) {
          if (bf.how !== 'stop') continue;
          const s = bf.stop;
          expect(s).not.toBeNull();
          if (s === null) continue;
          expect(byFace.get(s.face)).toBe(s);
          expect(minorOf(bf.kerb)).toBeLessThan(s.tauCm);
          for (const seedPt of bf.seeds) {
            const f = faceAt(c.plat, seedPt);
            expect(f).toBeGreaterThanOrEqual(0);
            const k = kerbNow(c.k, f);
            expect(minorOf(largest(k))).toBeLessThan(s.tauCm);
          }
          blocks += 1;
        }
        // Rungs (b)–(d) only on faces whose τ test passed.
        for (const ru of rep.rungs) if (ru.rung === 'b' || ru.rung === 'c' || ru.rung === 'd') expect(byFace.get(ru.face)?.outcome).toBe('cut');
        // F-CUT on these faces: ≤ 6 kernel calls per face's ladder; the face count never decreases.
        for (const fl of rep.faces) {
          expect(fl.kernelCalls).toBeLessThanOrEqual(6);
          expect(fl.facesAfter).toBeGreaterThanOrEqual(1);
        }
      }
      // Not vacuous: the set's faces gave both outcomes.
      expect(blocks).toBeGreaterThan(0);
      expect(cut).toBeGreaterThan(0);
    });
  }
});
