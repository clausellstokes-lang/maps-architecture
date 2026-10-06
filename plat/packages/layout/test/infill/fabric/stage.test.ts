// The S8 stage over two districts (§4.6; §4.1's callback form; §5.1 (1) no restart path; §5.2 F-CUT's counters; T34-1's
// stop test as S8 records it): the map valid after it, two runs equal, the ladder's kernel calls per face ≤ 6 and the
// face count never decreasing, the stop test's verdict per face, no restart above a face, and a district whose fabric
// is not registered refused and reported while the others are cut.
import { checkCI, CONCERNS, createRng, entityKey, isFaceLive, STAGES } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { blockDepthRange, stopThreshold, type S8Output } from '../../../src/index.js';
import { GROUND, ownerOf, runFixture, twoDistricts, waySegments } from './support.js';

function fingerprint(out: S8Output, f: ReturnType<typeof twoDistricts>): string {
  const lanes = out.lanes.map((w) => ({ id: w.id, cls: w.class, width: w.width, from: w.from, to: w.to, segs: waySegments(f.plat, w.id).map(([a, b]) => `${a.x},${a.y}>${b.x},${b.y}`).sort() }));
  return JSON.stringify({ lanes, blocks: out.blocks, junctions: out.infill.junctions, seams: out.infill.seams, report: out.infill.report });
}

describe('S8 over two districts sharing an arterial', () => {
  const f = twoDistricts();
  const before = f.districts.map((d) => {
    let n = 0;
    for (let g = 0; g < f.plat.slots.face[1].top; g += 1) if (isFaceLive(f.plat, 1, g) && ownerOf(f.plat, g) === d.district.id) n += 1;
    return n;
  });
  const out = runFixture(f);

  it('cuts both districts: blocks and lanes in each, none refused', { timeout: 120_000 }, () => {
    expect(out.infill.report.refused).toEqual([]);
    expect(out.infill.report.districts.length).toBe(2);
    for (const rep of out.infill.report.districts) {
      expect(rep.blocks).toBeGreaterThan(5);
      expect(rep.lanes).toBeGreaterThan(5);
    }
  });

  it('leaves a valid map: every hard row of the whole-arena sweep holds', { timeout: 120_000 }, () => {
    for (const r of checkCI(f.plat)) if (r.class === 'hard') expect([r.name, r.holds, r.problems.slice(0, 3)]).toEqual([r.name, true, []]);
  });

  it('F-CUT: each face’s ladder ends in ≤ 6 kernel calls and the face count never decreases', { timeout: 120_000 }, () => {
    for (const rep of out.infill.report.districts) {
      for (const fl of rep.faces) {
        expect(fl.kernelCalls).toBeLessThanOrEqual(6);
        expect(fl.facesAfter).toBeGreaterThanOrEqual(1);
      }
    }
    f.districts.forEach((d, i) => {
      let n = 0;
      for (let g = 0; g < f.plat.slots.face[1].top; g += 1) if (isFaceLive(f.plat, 1, g) && ownerOf(f.plat, g) === d.district.id) n += 1;
      expect(n).toBeGreaterThanOrEqual(before[i]);
      expect(n).toBe(before[i] + out.infill.report.districts.find((r) => r.district === d.district.id)!.faces.reduce((acc, x) => acc + x.facesAfter - 1, 0) + out.infill.blockFaces.filter((b) => b.seeds.length === 2 && out.blocks.some((x) => x.id === b.block && x.district === d.district.id)).length);
    });
  });

  it('the stop test: each face’s cut.stop draw replays from its lineage, τ is the design’s, and the face stops exactly when its minor extent is below τ', { timeout: 120_000 }, () => {
    for (const rep of out.infill.report.districts) {
      const d = f.districts.find((x) => x.district.id === rep.district);
      const [eLo, eHi] = blockDepthRange(d!.bands!, undefined);
      for (const s of rep.stops) {
        const st = createRng().stream(entityKey(f.input.seedKey, s.lineage, GROUND), STAGES.S8, CONCERNS['cut.stop'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
        const u = [st.float01(), st.float01(), st.float01(), st.float01()];
        expect(s.uniforms).toEqual(u);
        const g = Math.abs((u[0] + u[1] + u[2] + u[3]) / 2 - 1);
        expect(s.g).toBe(g);
        expect(s.eLoCm).toBe(eLo * 100);
        expect(s.eHiCm).toBe(eHi * 100);
        expect(s.tauCm).toBe(stopThreshold(eLo * 100, eHi * 100, g));
        expect(s.outcome).toBe(s.minorCm < s.tauCm ? 'block' : 'cut');
      }
      // Rungs (b)–(d) run only on faces whose τ test passed; every face cut or stood after its stop test.
      for (const r of rep.rungs) {
        if (r.rung !== 'b' && r.rung !== 'c' && r.rung !== 'd') continue;
        expect(rep.stops.find((s) => s.face === r.face)?.outcome).toBe('cut');
      }
    }
  });

  it('never restarts anything above a face: each face’s rungs come before its children’s, and no face is planned twice', { timeout: 120_000 }, () => {
    for (const rep of out.infill.report.districts) {
      const faces = rep.faces.map((x) => x.face);
      expect(new Set(faces).size).toBe(faces.length);
      const stopFaces = rep.stops.map((x) => x.face);
      expect(new Set(stopFaces).size).toBe(stopFaces.length);
      // A face's rung lines are contiguous (its ladder ran once, then its children's).
      const seen = new Set<string>();
      let last = '';
      for (const r of rep.rungs.filter((x) => x.rung !== 'deep')) {
        if (r.face !== last) {
          expect(seen.has(r.face)).toBe(false);
          seen.add(last);
          last = r.face;
        }
      }
    }
  });

  it('two runs of one input give equal outputs and equal arenas', { timeout: 300_000 }, () => {
    const g = twoDistricts();
    const again = runFixture(g);
    expect(fingerprint(again, g)).toBe(fingerprint(out, f));
  });
});

describe('a district whose fabric no strategy is registered for', () => {
  it('is refused, reported not_built, and the others are cut', { timeout: 300_000 }, () => {
    const f = twoDistricts();
    const odd = { ...f.districts[0], district: { ...f.districts[0].district, fabric: 'template:x' } };
    const out = runFixture(f, { districts: [odd, f.districts[1]] });
    expect(out.infill.report.refused).toEqual([{ district: odd.district.id, code: 'not_built', detail: "no fabric registered for 'template:x'" }]);
    expect(out.infill.report.districts.map((d) => d.district)).toEqual([f.districts[1].district.id]);
    expect(out.blocks.every((b) => b.district === f.districts[1].district.id)).toBe(true);
  });
});
