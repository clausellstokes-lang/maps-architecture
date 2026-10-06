// F-WORK (§5.2; §5.1 (5); C-0085): a test-side workLimits table with a low cut.recursionDepth floor makes S8 stop
// recursing at the depth reached — every face still open there stands as a block — reported work_cut with the count;
// the map stays valid and the face count never decreases. The other two counters likewise.
import { readFileSync } from 'node:fs';
import { checkCI, isFaceLive } from '@plat/kernel';
import { parseWorkLimits, workLimitOf } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { ownerOf, runFixture, twoDistricts } from './support.js';


const RAW = JSON.parse(readFileSync(new URL('../../../../tables/data/workLimits.json', import.meta.url), 'utf8')) as { rows: Record<string, Record<string, { value: unknown }>> };

function table(counter: string, floor: number) {
  const raw = JSON.parse(JSON.stringify(RAW)) as typeof RAW;
  raw.rows[counter].floor.value = floor;
  raw.rows[counter].perUnit.value = 0;
  return parseWorkLimits(raw);
}

function districtFaces(f: ReturnType<typeof twoDistricts>, id: string): number {
  let n = 0;
  for (let g = 0; g < f.plat.slots.face[1].top; g += 1) if (isFaceLive(f.plat, 1, g) && ownerOf(f.plat, g) === id) n += 1;
  return n;
}

describe('F-WORK on cut.recursionDepth (C-0085)', () => {
  const f = twoDistricts();
  const before = f.districts.map((d) => districtFaces(f, d.district.id));
  const wl = table('cut.recursionDepth', 2);
  const out = runFixture(f, { tables: { workLimits: wl } });

  it('the law is the table’s: floor 2, nothing per unit', { timeout: 120_000 }, () => {
    expect(workLimitOf(wl.law('cut.recursionDepth'), { kind: 'district', id: 'd' }, { faces: 999 })).toBe(2);
    for (const rep of out.infill.report.districts) expect(rep.limits.recursionDepth).toBe(2);
  });

  it('stops recursing at depth 2: no face deeper is planned, the faces there stand as blocks, reported work_cut with the count', { timeout: 120_000 }, () => {
    expect(out.infill.report.refused).toEqual([]);
    for (const rep of out.infill.report.districts) {
      expect(rep.workCut).toEqual([{ counter: 'cut.recursionDepth', count: 2, limit: 2 }]);
      for (const fl of rep.faces) expect(fl.depth).toBeLessThanOrEqual(2);
      const cutAtDepth = rep.faces.filter((x) => x.outcome === 'work_cut');
      expect(cutAtDepth.length).toBeGreaterThan(0);
      for (const x of cutAtDepth) expect(x.depth).toBe(2);
      // Every face at depth 2 that stood is a block; nothing at depth 2 was cut.
      expect(rep.faces.filter((x) => x.depth === 2 && (x.outcome === 'cut' || x.outcome === 'slit'))).toEqual([]);
      expect(rep.rungs.filter((r) => r.rung === 'work').length).toBe(cutAtDepth.length);
      expect(rep.blocks).toBe(out.infill.blockFaces.filter((b) => out.blocks.some((x) => x.id === b.block && x.district === rep.district)).length);
    }
  });

  it('the map stays valid (every hard row of the whole-arena sweep holds) and the face count never decreases', { timeout: 120_000 }, () => {
    const rows = checkCI(f.plat);
    for (const r of rows) if (r.class === 'hard') expect([r.name, r.holds, r.problems.slice(0, 3)]).toEqual([r.name, true, []]);
    f.districts.forEach((d, i) => expect(districtFaces(f, d.district.id)).toBeGreaterThanOrEqual(before[i]));
  });

  it('cuts fewer faces than the unlimited run, with every block still recorded', { timeout: 300_000 }, () => {
    const g = twoDistricts();
    const full = runFixture(g);
    expect(out.lanes.length).toBeLessThan(full.lanes.length);
    expect(out.blocks.length).toBeGreaterThan(0);
  });
});

describe('F-WORK on cut.kernelCalls and cut.candidates', () => {
  for (const [counter, floor] of [['cut.kernelCalls', 3], ['cut.candidates', 4]] as const) {
    it(`${counter}: the run stops at its count, every open face a block, reported work_cut`, { timeout: 300_000 }, () => {
      const f = twoDistricts();
      const out = runFixture(f, { tables: { workLimits: table(counter, floor) } });
      expect(out.infill.report.refused).toEqual([]);
      for (const rep of out.infill.report.districts) {
        const hit = rep.workCut.find((w) => w.counter === counter);
        expect(hit).toBeDefined();
        expect(hit?.limit).toBe(floor);
        expect(hit?.count).toBe(floor + 1);
        const key = counter === 'cut.kernelCalls' ? 'kernelCalls' : 'candidates';
        expect(rep.work[key]).toBe(floor + 1);
        expect(rep.faces.some((x) => x.outcome === 'work_cut')).toBe(true);
        expect(rep.blocks).toBeGreaterThan(0);
      }
      for (const r of checkCI(f.plat)) if (r.class === 'hard') expect([r.name, r.holds]).toEqual([r.name, true]);
    });
  }
});
