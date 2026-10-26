// Rung (c) completes on F-CUT's concave faces (queue row Q65; the refusal census's R-27; §4.6 step 8: "(c) the
// always-succeeding cut"; C-0426). On a one-face district whose outer ring is a boundary with no spine, every end is a
// kerb end and must arrive square (§4.6 step 7: it "stays there, square to the line"; C-0237 (10)); the perpendicular
// from the longest run arrives square only on a side parallel to that run, which a concave face may lack — 59 of
// F-CUT's 10⁵ faces at seed 1 ended `unresolved`, every foot of the slide refused 'kerb-arrival' or 'width'. The slide's
// cut now ends square instead (ladder.ts `squaredFarEnd`: the leg runs on to a corner short of the far side and a stub
// leaves it square), so the face is cut. Pinned on six of the 59, drawn and built as M0-b-04's bench draws them, the
// ladder at depth 0 alone (the bench's F-CUT run: `cut.recursionDepth` fixed at 1, no deep factor reached).
import fc from 'fast-check';
import { dest, isHalfEdgeLive, rowKey, rowsOn, type Plat } from '@plat/kernel';
import { runS8 } from '@plat/layout';
import { loadWorkLimits, type WorkLimitsTable } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { arb, seedFamily } from '../../../src/fuzz/index.js';
import { districtCase } from './support.js';

/** The bench's F-CUT work limits (M0-b-04's `depthOneLimits`): `cut.recursionDepth` fixed at 1. */
function depthOne(base: WorkLimitsTable = loadWorkLimits()): WorkLimitsTable {
  return { table: base.table, laws: base.laws, has: (c: string) => base.has(c), law: (c: string) => (c === 'cut.recursionDepth' ? { counter: c, unit: 'fixed', perUnit: 0, floor: 1 } : base.law(c)) } as WorkLimitsTable;
}

/** F-CUT's concave face i at seed 1 as a one-face district (M0-b-04's faceSeed and districtSeed, C-0242 (2)). */
function fcutConcave(i: number): ReturnType<typeof districtCase> {
  const s = seedFamily('bentcut/concave/1', i);
  const [face] = fc.sample(arb.faceSet('concave', { scale: 'block' }), { seed: s | 0, numRuns: 1 });
  return districtCase(face.polygon, s >>> 0);
}

/**
 * The committed chain of way `id` in the arena, as [x, y] points from the end with the smaller (x, y): its live L1 edges
 * carrying the way's row, walked end to end (read from the arena's own tables, never through the code under test).
 */
function chainOf(plat: Plat, id: string): [number, number][] {
  const next = new Map<string, string[]>();
  const keyOf = (v: number): string => `${String(plat.vertices.x[v])},${String(plat.vertices.y[v])}`;
  const link = (a: string, b: string): void => {
    const l = next.get(a);
    if (l === undefined) next.set(a, [b]);
    else if (!l.includes(b)) l.push(b);
  };
  for (let e = 0; e < 2 * plat.slots.pair.top; e += 2) {
    if (!isHalfEdgeLive(plat, e)) continue;
    if (!rowsOn(plat, 'edge', e).some((r) => rowKey(plat, r).role === 'way' && rowKey(plat, r).entity === id)) continue;
    const a = keyOf(plat.halfEdges.origin[e]);
    const b = keyOf(dest(plat, e));
    link(a, b);
    link(b, a);
  }
  const pt = (k: string): [number, number] => k.split(',').map(Number) as [number, number];
  const ends = [...next.entries()].filter(([, l]) => l.length === 1).map(([k]) => k);
  ends.sort((a, b) => pt(a)[0] - pt(b)[0] || pt(a)[1] - pt(b)[1]);
  const out: [number, number][] = [];
  let prev = '';
  let at = ends[0] ?? '';
  while (at !== '') {
    out.push(pt(at));
    const n = (next.get(at) ?? []).find((k) => k !== prev) ?? '';
    prev = at;
    at = n;
  }
  return out;
}

/**
 * The blocks the six faces get after round S7 (C-0426 (2)'s DECLARED shift; recorded in round S8 from the tree as S7
 * landed it, closing check S7's Q65): the one lane rung (c) commits, its chain from the end with the smaller (x, y) —
 * the straight cut stopped at its corner K, min(e_lo / 2, L / 3) short of the kerb end it could not reach square, then
 * the stub from K square to the boundary — and its width. A change to the squared construction (the leg, the corner,
 * the stub) moves a chain here (S7's Y19: the leg L / 2 moved all six).
 */
const SQUARED: Readonly<Record<number, { readonly chain: readonly (readonly [number, number])[]; readonly widthCm: number }>> = {
  106: { chain: [[-242097, 151990], [-240952, 151847], [-238766, 150738]], widthCm: 353.0721587848525 },
  748: { chain: [[158748, -236970], [159393, -238766], [159713, -243219]], widthCm: 403.9678980905083 },
  1274: { chain: [[230272, -126430], [232059, -126193], [238753, -128236]], widthCm: 359.1104188460406 },
  1361: { chain: [[-37926, -60576], [-37296, -62102], [-32367, -59201]], widthCm: 363.34639864530396 },
  1920: { chain: [[-236181, -225785], [-232592, -226735], [-231279, -225760]], widthCm: 385.9167917208956 },
  2015: { chain: [[-241935, -245727], [-241239, -245618], [-239688, -246410]], widthCm: 313.89097636957996 },
};

describe('rung (c) ends square on a boundary with no spine, so a concave face is cut (queue row Q65)', () => {
  for (const i of [106, 748, 1274, 1361, 1920, 2015]) {
    it(`F-CUT concave #${String(i)} (seed 1; before: unresolved, every rung refused): the depth-0 ladder cuts, ≤ 6 kernel calls, every end square`, { timeout: 300_000 }, () => {
      const c = fcutConcave(i);
      const r = runS8({ ...c.input, tables: { workLimits: depthOne() }, deepFactor: 1e9 }, { report: undefined } as never);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.value.infill.report.refused).toEqual([]);
      const rep = r.value.infill.report.districts[0];
      const top = rep.faces.find((f) => f.depth === 0);
      expect(top).toMatchObject({ outcome: 'cut', facesAfter: 2 });
      expect(top?.kernelCalls).toBeLessThanOrEqual(6);
      // The cut is rung (c)'s, and no face of the district stands unresolved.
      const cut = rep.rungs.filter((x) => x.face === top?.face && x.outcome === 'cut');
      expect(cut.map((x) => x.rung)).toEqual(['c']);
      expect(rep.faces.some((f) => f.outcome === 'unresolved')).toBe(false);
      for (const fl of rep.faces) expect(fl.facesAfter).toBeGreaterThanOrEqual(1);
      // The blocks this face now gets (C-0426 (2)'s DECLARED shift, recorded in round S8): the one lane's committed chain
      // and width — the straight leg run on to its corner, the square stub — and the two blocks either side of it.
      expect(r.value.lanes.length).toBe(1);
      const lane = r.value.lanes[0];
      expect(chainOf(c.plat, lane.id)).toEqual(SQUARED[i].chain);
      expect(lane.width).toBeCloseTo(SQUARED[i].widthCm, 6);
      expect(r.value.blocks.length).toBe(2);
      expect(r.value.infill.blockFaces.length).toBe(2);
    });
  }
});

describe('the squared ends are rung (c)’s second pass above the substitution bound only (queue row Q65)', () => {
  it('a face within (d)’s bound (x05/round-joined #25, M0-x-05’s cut/court face): (c)’s straight foot refused, the court of (d) as before, no squared end tried', { timeout: 300_000 }, () => {
    const s = seedFamily('x05/round-joined', 25);
    const [face] = fc.sample(arb.faceSet('round-joined', { scale: 'block' }), { seed: s | 0, numRuns: 1 });
    const c = districtCase(face.polygon, s >>> 0);
    const r = runS8(c.input, { report: undefined } as never);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const rep = r.value.infill.report.districts[0];
    expect(rep.faces.map((f) => f.outcome)).toEqual(['court']);
    expect(rep.rungs.filter((x) => x.rung === 'c').map((x) => x.why)).toEqual(['kerb-arrival']);
    expect(rep.rungs.at(-1)).toMatchObject({ rung: 'd', outcome: 'block' });
  });
});
