// The needle rule (queue row L20; M0-c-06's smoke, fusion 49 face 479; §4.6 step 8's min-angle floor read on the
// children's kerbs; C-0423): a cut whose band runs nearly parallel to another spine's, converging, leaves a child whose
// kerb tapers to a needle — on the smoke a 16 m sliver 10–26 cm wide, lawful under the OBB floor, usable by no later
// stage. A tip of a child's kerb below the plot's minimum corner (faces.plot.minInteriorAnglePlotCdeg, 12°) that lies
// on the cut's band refuses the cut like a child below the floor ('needle'), and the ladder goes on.
import { describe, expect, it } from 'vitest';
import { needleSuspect, needleTips } from '../../../src/infill/ladder.js';
import { portalInvariant } from '../../../src/index.js';
import { CELLS, GROUND, needleWedge, P, runFixture, waySegments } from './support.js';

const DEG = Math.PI / 180;

/** The arm a needle's corner is read at: the plot's minimum width (faces.plot.minPlotWidthM, 2.5 m). */
const ARM = 250;

/** p rotated by `deg` about o. */
function turn(o: { x: number; y: number }, p: { x: number; y: number }, deg: number): { x: number; y: number } {
  const c = Math.cos(deg * DEG);
  const s = Math.sin(deg * DEG);
  const dx = p.x - o.x;
  const dy = p.y - o.y;
  return { x: o.x + c * dx - s * dy, y: o.y + s * dx + c * dy };
}

describe('needleTips: the tips of a kerb a cut made below the minimum corner (queue row L20)', () => {
  // Fusion 49 face 479's stop kerb, as the smoke's diagnosis records it: its corner at lane 3gkn's bend
  // (−38307, 59499), the needle along 3gkn's inner edge to the tip (−35650, 61438) where 0de4's inner edge, 0.8° off,
  // meets it, and the kerb's far corner 110 m back along 0de4.
  const A = P(-38_307, 59_499);
  const T = P(-35_650, 61_438);
  const back = turn(T, A, -0.8);
  const scale = 11_000 / Math.hypot(back.x - T.x, back.y - T.y);
  const D = P(Math.round(T.x + (back.x - T.x) * scale), Math.round(T.y + (back.y - T.y) * scale));
  // Counter-clockwise: A, D, T or A, T, D — whichever has area.
  const ring = (A.x * D.y - D.x * A.y + D.x * T.y - T.x * D.y + T.x * A.y - A.x * T.y) > 0 ? [A, D, T] : [A, T, D];

  it('the smoke’s 0.8° tip is a needle when it lies on the cut’s band, and not when the cut lies elsewhere', () => {
    // The later lane's chain past the tip, 150 cm off it (within its half-width and the margin).
    const near = [P(T.x - 3_000, T.y + 150), P(T.x + 3_000, T.y + 150)];
    const tips = needleTips([ring], near, 164 + 52, 1200, ARM);
    expect(tips).toEqual([T]);
    expect(needleTips([ring], [P(0, 0), P(100, 0)], 216, 1200, ARM)).toEqual([]);
  });

  it('a square kerb, an 80° corner and a hole have no needle', () => {
    const sq = [P(0, 0), P(4000, 0), P(4000, 4000), P(0, 4000)];
    const chain = [P(-100, 0), P(4100, 0), P(4100, 4000)];
    expect(needleTips([sq], chain, 1_000, 1200, ARM)).toEqual([]);
    const c80 = turn(P(0, 0), P(4000, 0), 80);
    const tri = [P(0, 0), P(4000, 0), P(Math.round(c80.x), Math.round(c80.y))];
    expect(needleTips([tri], chain, 10_000, 1200, ARM)).toEqual([]);
    // A clockwise ring (a hole) is never read.
    expect(needleTips([ring.slice().reverse()], [T, P(T.x + 10, T.y)], 10_000, 1200, ARM)).toEqual([]);
  });

  it('a short spur of the kerb at a junction’s wedge is no needle: its sides part within the plot’s width (base flat 2’s block:6s48w43xr9dnp)', () => {
    // The recorded kerb at the cut, about its spur toward lane dpe6's vertex (−12826, −3193): sides 10.9° apart read at
    // 1 m, 80° apart at the plot's 2.5 m.
    const k = [P(-11_324, -5_390), P(-10_719, -4_943), P(-10_032, -4_417), P(-9_356, -3_878), P(-8_892, -3_492), P(-8_692, -3_324), P(-8_038, -2_757), P(-7_397, -2_176), P(-7_066, -1_867), P(-8_766, -81), P(-9_393, -664), P(-10_034, -1_230), P(-10_690, -1_779), P(-11_358, -2_313), P(-12_040, -2_828), P(-12_731, -3_325), P(-12_826, -3_193), P(-12_798, -3_283), P(-12_757, -3_342)];
    const lane = [P(-12_998, -3_313), P(-12_850, -3_209), P(-12_826, -3_193), P(-12_135, -2_696)];
    expect(needleTips([k], lane, 163 + 52, 1200, ARM)).toEqual([]);
  });

  it('a square end whose short side turns within the arm is no needle: the sides are read along the ring (bentcut round-joined #20’s block:dqqt09vsa2frj)', () => {
    // The block's kerb at the cut where lane 3951 meets lane f5aq square: the kerb's corner (80 170, 223 954) between a
    // 377 cm side and a 240 cm one that turns at once. Read at the first ring point 2.5 m away (the far side of the turn)
    // the corner would read 9°; read along the ring it is the square corner it is.
    const k = [P(75_204, 221_145), P(75_500, 221_798), P(75_513, 221_821), P(75_907, 222_404), P(75_924, 222_425), P(76_410, 222_933), P(76_430, 222_951), P(76_995, 223_370), P(77_018, 223_384), P(77_645, 223_703), P(77_670, 223_714), P(78_341, 223_923), P(78_368, 223_928), P(79_065, 224_021), P(79_092, 224_023), P(79_795, 223_998), P(80_170, 223_954), P(80_200, 224_192), P(78_556, 224_411), P(77_836, 224_535), P(77_121, 224_713), P(76_420, 224_943), P(75_738, 225_224), P(75_075, 225_558), P(73_145, 222_050), P(73_770, 221_735), P(74_409, 221_449), P(75_062, 221_192)];
    const lane = [P(79_789, 223_837), P(80_151, 223_794), P(80_385, 223_766)];
    expect(needleTips([k], lane, 160 + 52, 1200, ARM)).toEqual([]);
  });

  it('a blunt-tipped needle is a needle: the tip cut off tens of cm wide, the sides read over the plot’s width (base river 900 seed 2’s block:e6gaq47nyt46z)', () => {
    // The kerb's two sides converge 3° apart over 200 m to a tip cut off square 30 cm wide: (0, 0) and (0, 30). Each tip
    // corner reads about 90° at its adjacent vertices — the sliver's end, not the sliver — but over the plot's minimum
    // width the sides are 10.7° apart (the end's 30 cm and the 2.2 m beyond it along the other side): no plot row fits
    // there. River 900 seed 2's committed kerb on lane way:9x968kc8amk63's band had such a tip, (30 446, 12 378) and
    // (30 404, 12 368), 42 cm apart, its sides 11.8° apart over 2.5 m (closing check S7's Y04: read at the adjacent
    // vertices it stood).
    const back = Math.round(30 + 20_000 * Math.tan(3 * DEG));
    const blunt = [P(0, 0), P(0, 30), P(-20_000, back), P(-20_000, 0)];
    const cut = [P(-3_000, -150), P(3_000, -150)];
    expect(needleTips([blunt], cut, 164 + 52, 1200, ARM)).toEqual([P(0, 0), P(0, 30)]);
    // The sides nearly parallel (0.3°) and the end 42 cm wide, the river kerb's figure: still below the 12° floor.
    const river = [P(0, 0), P(0, 42), P(-20_000, Math.round(42 + 20_000 * Math.tan(0.3 * DEG))), P(-20_000, 0)];
    expect(needleTips([river], cut, 164 + 52, 1200, ARM)).toEqual([P(0, 0), P(0, 42)]);
    // An end 3 m wide (past the plot's minimum width) is a square end, not a needle: each corner reads its own 90°.
    const wide = [P(0, 0), P(0, 300), P(-20_000, Math.round(300 + 20_000 * Math.tan(3 * DEG))), P(-20_000, 0)];
    expect(needleTips([wide], cut, 164 + 52, 1200, ARM)).toEqual([]);
  });

  it('the floor is the plot’s minimum corner: 12° reads the 10° tip, 8° does not', () => {
    const o = P(0, 0);
    const far = turn(o, P(20_000, 0), 10);
    const tri = [o, P(20_000, 0), P(Math.round(far.x), Math.round(far.y))];
    expect(needleTips([tri], [o, P(-500, 0)], 100, 1200, ARM)).toEqual([o]);
    expect(needleTips([tri], [o, P(-500, 0)], 100, 800, ARM)).toEqual([]);
  });
});

describe('needleSuspect: the pre-test passes every edge a needle could stand on (queue row L20)', () => {
  // The cut along y = 0; the child's far edge leaves 100 cm off it at the cut's start and turns away by θ. Any θ below
  // the 12° floor may close a needle with the cut's band, so the pre-test (15°) must pass it; 20° it may rule out.
  const chain = [P(0, 0), P(10_000, 0)];
  const child = (deg: number, off: number): ReturnType<typeof P>[] => [P(0, 0), P(10_000, 0), P(10_000, Math.round(off + 10_000 * Math.tan(deg * DEG))), P(0, off)];
  for (const deg of [3, 8, 11, 14]) {
    it(`an edge ${String(deg)}° off the cut and near it is suspect`, () => {
      expect(needleSuspect([child(deg, 100)], chain, 300)).toBe(true);
    });
  }
  it('an edge 20° off the cut is not, nor an edge 8° off it beyond the reach, nor the cut’s own edge', () => {
    expect(needleSuspect([child(20, 100)], chain, 300)).toBe(false);
    expect(needleSuspect([child(8, 5_000)], chain, 300)).toBe(false);
    expect(needleSuspect([[P(0, 0), P(10_000, 0), P(10_000, 8_000), P(0, 8_000)]], chain, 300)).toBe(false);
  });
});

describe('S8 refuses a cut whose child’s kerb is a needle, and goes on (queue row L20)', () => {
  const f = needleWedge();
  const out = runFixture(f);
  const rep = out.infill.report.districts[0];

  it('the antenna split that would leave the needle is refused ‘needle’; the face is cut by a later rung', { timeout: 300_000 }, () => {
    expect(out.infill.report.refused).toEqual([]);
    const ant = rep.rungs.filter((r) => r.rung === 'antenna');
    expect(ant.length).toBeGreaterThan(0);
    expect(ant[0]).toMatchObject({ outcome: 'refused', why: 'needle' });
    const first = rep.faces.find((x) => x.face === ant[0].face);
    expect(first?.outcome).toBe('cut');
    for (const fl of rep.faces) expect(fl.kernelCalls).toBeLessThanOrEqual(6);
  });

  it('no block S8 recorded has a kerb tip below 12° on the band of a lane S8 cut', { timeout: 300_000 }, () => {
    const chains = out.lanes.map((l) => ({ w: l.width as number, segs: waySegments(f.plat, l.id) }));
    expect(chains.length).toBeGreaterThan(0);
    for (const bf of out.infill.blockFaces) {
      for (const c of chains) for (const [a, b] of c.segs) expect(needleTips([bf.kerb], [a, b], c.w / 2 + 52, 1200, ARM)).toEqual([]);
    }
    expect(portalInvariant(f.plat, GROUND, out.infill.seams, out.lanes, CELLS)).toEqual([]);
  });
});
