// Step 10's continuation wired end to end (§4.6 step 10, J-P11, GEO-42; the check's notes N-6, N-23 (a), C1-3, C1-8;
// queue row L25; C-0423): a cut whose end lands within attractCm of an existing junction makes a crossroads, admitted
// only on an interior spine of a lower-or-equal class and collinear within cut.settings.continuationCdeg (6°) with a way
// leaving the junction on the far side — never across a district-boundary edge, whether the end's own spine is a seam's
// or a seam chain of the district runs through the junction. The rule's verdict is unit-tested (ladder.test.ts 'step 10');
// these fixtures drive it through S8: the antenna split continues a dead-end lane straight across its face to an interior
// lane L at J, where a third way B leaves J on the far side.
import { describe, expect, it } from 'vitest';
import { chainRuns, portalInvariant } from '../../../src/index.js';
import { CELLS, fixture, GROUND, P, runFixture, type Fixture, type FixtureDistrict } from './support.js';

const W = 40_000;
const H = 30_000;
const J = P(20_000, 15_000);

/**
 * A 400 m × 300 m ring road (secondary, 6 m) crossed by the interior lane L (y = 150 m); a dead-end lane (the antenna)
 * from the south side at x = 200 m north for 60 m; B from J to the north side, `turnDeg` off north. `split` gives the
 * north-east quarter to a second district (B and L's east half then bound the first).
 */
function crossroads(turnDeg: number, split = false): Fixture {
  const bx = Math.round(20_000 + (H - 15_000) * Math.tan((turnDeg * Math.PI) / 180));
  const districts: FixtureDistrict[] = split
    ? [
        { seeds: [P(10_000, 7_500), P(10_000, 22_500)], prosperity: 0.3, density: 0.5 },
        { seeds: [P(32_000, 22_500)], prosperity: 0.3, density: 0.5 },
      ]
    : [{ seeds: [P(10_000, 7_500), P(10_000, 22_500), P(32_000, 22_500)], prosperity: 0.3, density: 0.5 }];
  return fixture(
    60_000,
    [
      { id: 'way:ring', cls: 'secondary', widthCm: 600, points: [P(0, 0), P(W, 0), P(W, H), P(0, H)], closed: true },
      { id: 'way:l', cls: 'lane', widthCm: 400, points: [P(0, 15_000), P(W, 15_000)] },
      { id: 'way:ant', cls: 'lane', widthCm: 400, points: [P(20_000, 0), P(20_000, 6_000)] },
      { id: 'way:b', cls: 'lane', widthCm: 400, points: [J, P(bx, H)] },
    ],
    districts,
  );
}

/** The antenna rung's report lines of the first district. */
function antennaRungs(out: ReturnType<typeof runFixture>): { outcome: string; why?: string }[] {
  return out.infill.report.districts[0].rungs.filter((r) => r.rung === 'antenna');
}

/** Does a lane S8 committed end at J? */
function endsAtJ(f: Fixture, out: ReturnType<typeof runFixture>): boolean {
  return out.lanes.some((l) => chainRuns(f.plat, GROUND, l.spine).some((run) => [run[0], run[run.length - 1]].some((q) => q.x === J.x && q.y === J.y)));
}

describe('step 10 through S8: a crossroads at an interior junction (notes N-6)', () => {
  it('collinear (B due north): the antenna’s cut continues across L at J — admitted, a lane ends at J', { timeout: 300_000 }, () => {
    const f = crossroads(0);
    const out = runFixture(f);
    expect(out.infill.report.refused).toEqual([]);
    expect(antennaRungs(out)[0]).toMatchObject({ outcome: 'cut' });
    expect(endsAtJ(f, out)).toBe(true);
  });

  it('9° off the arrival (beyond 6°, inside 12° and 60°): refused continuation-angle, and the face is cut by a later rung', { timeout: 300_000 }, () => {
    const f = crossroads(9);
    const out = runFixture(f);
    expect(out.infill.report.refused).toEqual([]);
    const ant = antennaRungs(out);
    expect(ant[0]).toMatchObject({ outcome: 'refused', why: 'continuation-angle' });
    const rep = out.infill.report.districts[0];
    const face = rep.rungs.find((r) => r.rung === 'antenna')?.face;
    expect(rep.faces.find((x) => x.face === face)?.outcome).toBe('cut');
  });
});

describe('step 10 never crosses a district-boundary edge (notes N-6, N-23 (a))', () => {
  it('L bounds the district (its east half the second district’s): refused continuation-boundary', { timeout: 300_000 }, () => {
    const f = crossroads(0, true);
    expect(f.seams.map((s) => s.edges[0].chain.entity).sort()).toEqual(['way:b', 'way:l']);
    const out = runFixture(f, { districts: [f.districts[0]] });
    expect(out.infill.report.refused).toEqual([]);
    expect(antennaRungs(out)[0]).toMatchObject({ outcome: 'refused', why: 'continuation-boundary' });
    expect(endsAtJ(f, out)).toBe(false);
    expect(portalInvariant(f.plat, GROUND, out.infill.seams, out.lanes, CELLS)).toEqual([]);
  });

  it('L in no seam, but B — through J — the district’s seam: the end read on the interior spine L is refused continuation-boundary all the same', { timeout: 300_000 }, () => {
    const f = crossroads(0, true);
    const seams = f.seams.filter((s) => s.edges[0].chain.entity === 'way:b');
    expect(seams).toHaveLength(1);
    const out = runFixture(f, { districts: [f.districts[0]], seams });
    expect(out.infill.report.refused).toEqual([]);
    expect(antennaRungs(out)[0]).toMatchObject({ outcome: 'refused', why: 'continuation-boundary' });
    expect(endsAtJ(f, out)).toBe(false);
  });
});
