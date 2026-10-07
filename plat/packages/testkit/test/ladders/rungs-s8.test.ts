// M0-x-05: F-CUT's rungs and F-WORK's cut rung on S8's real Stage (§4.6 step 8, §5.2 F-CUT and F-WORK; C-0085,
// C-0268): each rung reached by exactly its fixture and leaving its report code — the reflex pre-cut, the antenna split,
// rung (a)'s turned frame, (b)'s mean normal, (c)'s slid foot with W_CUT_SLID (in S8's record and in the generation
// report), (d)'s court — and the recursion stopped at a low cut.recursionDepth floor, `work_cut` with the count; the
// plain rectangle district leaves none of them. The reader counts a rung only where it took.
import { cutCells, s8Stage, type DistrictReport, type S8Output } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { LADDER_ANTENNA_DISTRICT, LADDER_CONTROLS, LADDER_FIXTURES, LADDER_SLID_DISTRICT, ladderChain, ladderLowFloor, ladderReadS8, ladderSmallFlat } from '@plat/testkit';
import { familyFace, L_SHAPE, RECT, twoDistricts } from '../../src/ladders/fixtures.js';
import { districtOf, type S8Case } from '../../src/ladders/support.js';

const fixture = (id: string) => {
  const f = LADDER_FIXTURES.find((x) => x.id === id) ?? LADDER_CONTROLS.find((x) => x.id === id);
  if (f === undefined) throw new Error(`no fixture ${id}`);
  return f;
};

function s8Of(c: S8Case, patch: Record<string, unknown> = {}): S8Output {
  const st = s8Stage();
  const r = st.run(st.inputsOf({ ...c.input, ...patch }, { kind: 'all' }), { report: undefined } as never);
  if (!r.ok) throw new Error(`S8 refused: ${r.code} ${r.detail}`);
  return r.value as S8Output;
}

const only = (out: S8Output): DistrictReport => {
  expect(out.infill.report.refused).toEqual([]);
  expect(out.infill.report.districts.length).toBe(1);
  return out.infill.report.districts[0];
};

describe('each F-CUT rung by its fixture on S8’s Stage object (§4.6 step 8)', () => {
  it('cut/reflex — the L’s top face is split at its reflex vertex first: the pre-cut takes, nothing else', { timeout: 120_000 }, () => {
    expect(fixture('cut/reflex').run()).toEqual({ 'S8 F-CUT pre': 1 });
    const rep = only(s8Of(districtOf([L_SHAPE], 1)));
    const top = rep.faces[0].face;
    expect(rep.rungs[0]).toMatchObject({ face: top, rung: 'pre', attempt: 0, outcome: 'cut' });
    // The cut leaves the reflex vertex (12 000, 12 000): the L's first face split there, the face count rising.
    expect(rep.faces[0]).toMatchObject({ depth: 0, outcome: 'cut', facesAfter: 2 });
  });

  it('cut/turned-frame — the top face’s attempt-0 plan is refused and the frame turned once cuts (its turn 36°)', { timeout: 120_000 }, () => {
    expect(fixture('cut/turned-frame').run()).toEqual({ 'S8 F-CUT a@attempt>=1': 1 });
    const f = familyFace('curved', 4);
    const rep = only(s8Of(districtOf(f.polygon, f.seed)));
    const turned = rep.rungs.filter((r) => r.rung === 'a' && r.attempt >= 1 && r.outcome === 'cut');
    expect(turned.length).toBe(1);
    const face = turned[0].face;
    const lines = rep.rungs.filter((r) => r.face === face);
    expect(lines.map((r) => [r.rung, r.attempt, r.outcome])).toEqual([
      ['a', 0, 'refused'],
      ['a', 1, 'cut'],
    ]);
    expect(lines[1].turnCdeg).toBe(cutCells().ladderTurnCdeg);
    expect(lines[1].key).toMatch(/cut\.t.*\/a=1/);
  });

  it('cut/mean-normal — the three frames refused, rung (b) cuts the face', { timeout: 120_000 }, () => {
    expect(fixture('cut/mean-normal').run()).toEqual({ 'S8 F-CUT b': 1 });
    const f = familyFace('round-joined', 35);
    const rep = only(s8Of(districtOf(f.polygon, f.seed)));
    const b = rep.rungs.filter((r) => r.rung === 'b' && r.outcome === 'cut');
    expect(b.length).toBe(1);
    const lines = rep.rungs.filter((r) => r.face === b[0].face).map((r) => [r.rung, r.attempt, r.outcome]);
    expect(lines.slice(-4)).toEqual([
      ['a', 0, 'refused'],
      ['a', 1, 'refused'],
      ['a', 2, 'refused'],
      ['b', 0, 'cut'],
    ]);
  });

  it('cut/court — a face within (d)’s area bound that no rung cuts becomes a court block (the substitution, C-0036)', { timeout: 120_000 }, () => {
    expect(fixture('cut/court').run()).toEqual({ 'S8 F-CUT d': 1 });
    const f = familyFace('round-joined', 25);
    const out = s8Of(districtOf(f.polygon, f.seed));
    const rep = only(out);
    expect(rep.rungs.at(-1)).toMatchObject({ rung: 'd', outcome: 'block' });
    expect(rep.rungs.filter((r) => r.rung === 'c').length).toBeGreaterThan(0);
    expect(rep.faces).toHaveLength(1);
    expect(rep.faces[0].outcome).toBe('court');
    expect(out.infill.blockFaces.map((b) => b.how)).toEqual(['court']);
    expect(out.blocks.map((b) => b.interior)).toEqual(['court']);
    expect(rep.residueAreaCm2).toBe(rep.builtAreaCm2);
  });

  it('cut/slide — the small flat town (seed 2) through the base chain: (c)’s foot slid 30 steps, W_CUT_SLID 30 in S8’s record and the generation report', { timeout: 300_000 }, () => {
    expect(fixture('cut/slide').run()).toEqual({ 'S8 F-CUT W_CUT_SLID': 30, 'S8 F-CUT a@attempt>=1': 1, 'S8 F-CUT d': 1, 'S8 F-CUT pre': 1 });
    const run = ladderChain({ blueprint: ladderSmallFlat(), seed: 2, until: 'S8', override: { S8: { districts: [LADDER_SLID_DISTRICT] } } });
    expect(run.report.bugs).toEqual([]);
    const infill = run.model.data.get('infill') as S8Output['infill'];
    expect(infill.report.districts.map((d) => d.district)).toEqual([LADDER_SLID_DISTRICT]);
    const rep = infill.report.districts[0];
    const c = rep.rungs.filter((r) => r.rung === 'c' && r.outcome === 'cut');
    expect(c.map((r) => r.slide)).toEqual([30]);
    expect(rep.warnings['W_CUT_SLID']).toBe(30);
    // §5.4: the warning reaches the generation report through the stage's sink, under S8.
    expect(run.report.stages.find((s) => s.name === 'S8')?.warnings['W_CUT_SLID']).toBe(30);
    expect(run.report.stages.filter((s) => s.name !== 'S8').every((s) => s.warnings['W_CUT_SLID'] === undefined)).toBe(true);
  });

  it('cut/antenna — the small flat town (seed 6): a face whose ring carries a dead-end way’s antenna is split from its tip', { timeout: 300_000 }, () => {
    expect(fixture('cut/antenna').run()).toEqual({ 'S8 F-CUT a@attempt>=1': 1, 'S8 F-CUT antenna': 1 });
    const run = ladderChain({ blueprint: ladderSmallFlat(), seed: 6, until: 'S8', override: { S8: { districts: [LADDER_ANTENNA_DISTRICT] } } });
    const rep = (run.model.data.get('infill') as S8Output['infill']).report.districts[0];
    expect(rep.district).toBe(LADDER_ANTENNA_DISTRICT);
    const an = rep.rungs.filter((r) => r.rung === 'antenna' && r.outcome === 'cut');
    expect(an.length).toBe(1);
    // The face's ladder: the reflex pre-cut refused, then the antenna split, before any plan of step 1 (no rung (a) line).
    expect(rep.rungs.filter((r) => r.face === an[0].face).map((r) => [r.rung, r.outcome])).toEqual([
      ['pre', 'refused'],
      ['antenna', 'cut'],
    ]);
    expect(rep.faces.find((f) => f.face === an[0].face)).toMatchObject({ outcome: 'cut', facesAfter: 2 });
  });
});

describe('F-WORK on S8’s cut counters (C-0085)', () => {
  it('work/cut — two districts under cut.recursionDepth floor 2: the recursion stops at depth 2, work_cut with the count, the faces there blocks', { timeout: 120_000 }, () => {
    expect(fixture('work/cut').run()).toEqual({ 'S8 F-WORK work_cut': 2 });
    const out = s8Of(twoDistricts(7), { tables: { workLimits: ladderLowFloor('cut.recursionDepth', 2) } });
    expect(out.infill.report.refused).toEqual([]);
    for (const rep of out.infill.report.districts) {
      expect(rep.workCut).toEqual([{ counter: 'cut.recursionDepth', count: 2, limit: 2 }]);
      const stopped = rep.faces.filter((f) => f.outcome === 'work_cut');
      expect(stopped.length).toBeGreaterThan(0);
      for (const f of stopped) expect(f.depth).toBe(2);
      expect(rep.rungs.filter((r) => r.rung === 'work').length).toBe(stopped.length);
    }
  });
});

describe('the plain district and the reader', () => {
  it('plain/s8 — a 200 m × 150 m rectangle district takes no F-CUT rung beyond (a) at attempt 0, no work_cut', { timeout: 120_000 }, () => {
    expect(fixture('plain/s8').run()).toEqual({});
    const rep = only(s8Of(districtOf([RECT], 1)));
    // (The deep-interior rule's spine lines are §4.6's, not a rung of F-CUT's ladder.)
    const cutBy = rep.rungs.filter((r) => r.rung !== 'deep' && (r.outcome === 'cut' || r.outcome === 'slit' || r.outcome === 'block'));
    expect(cutBy.length).toBeGreaterThan(0);
    for (const r of cutBy) expect([r.rung, r.attempt]).toEqual(['a', 0]);
    expect(rep.warnings['W_CUT_SLID']).toBeUndefined();
    expect(rep.workCut).toEqual([]);
  });

  it('readS8 counts a rung where it took: refusals, attempt-0 cuts and the deep spine are not counted; W_CUT_SLID summed; work_cut per record', () => {
    const line = (rung: string, outcome: string, attempt = 0) => ({ face: 'f', rung, attempt, outcome });
    const district = (rungs: ReturnType<typeof line>[], warnings: Record<string, number>, workCut: unknown[]) => ({ district: 'd', rungs, warnings, workCut });
    const t: Record<string, number> = {};
    ladderReadS8(t, {
      infill: {
        report: {
          refused: [],
          districts: [
            district([line('pre', 'refused'), line('pre', 'cut'), line('antenna', 'none'), line('antenna', 'slit'), line('a', 'cut'), line('a', 'refused', 1), line('a', 'cut', 2), line('b', 'refused'), line('b', 'cut'), line('c', 'cut'), line('d', 'block'), line('deep', 'cut'), line('unresolved', 'block')], { W_CUT_SLID: 3, W_DEEP_SPINE_REFUSED: 4 }, [{}, {}]),
            district([line('a', 'slit', 1)], { W_CUT_SLID: 2 }, []),
          ],
        },
      } as never,
    });
    expect(t).toEqual({ 'S8 F-CUT pre': 1, 'S8 F-CUT antenna': 1, 'S8 F-CUT a@attempt>=1': 2, 'S8 F-CUT b': 1, 'S8 F-CUT d': 1, 'S8 F-CUT W_CUT_SLID': 5, 'S8 F-WORK work_cut': 2 });
  });
});
