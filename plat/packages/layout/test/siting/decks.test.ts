// §4.2 S3 (7)'s deck rule on the registered river blueprints (M0-c-01 hardening round S2; refusal census R-28, the
// slice's share; C-0365): a gate route that first reaches T = t₁ on a deck edge put its gate on the crossing, in the
// river, and the trace refused the stage (`trace: gate gate:n is not on the committed trace at its point (§4.2 S3 (9))`,
// E_INVARIANT), or found a main gate standing in the water between a crossing's banks (`water: the crossing … has no
// clear chord between its two bank pins (a main gate stands in the water between its banks)`, R-29's class at these
// seeds). The slice now re-solves such a route off the decks straddling the boundary, so every gate stands on ground
// and S3 commits. Each seed below refused at S3 before the rule (red on the pre-round sources), and commits now.
import { describe, expect, it } from 'vitest';
import {
  fieldT,
  gateRoutes,
  gatesOnBoundary,
  insideRing,
  levelSet,
  plazaTree,
  RIVER_BLUEPRINT,
  runBase,
  s3Slice,
  stageA,
  stageThreshold,
  type BaseBlueprint,
  type GatePick,
  type S3Slice,
} from '../../src/index.js';
import { inWater, meetsWater } from '../../src/siting/lattice.js';
import { resolveOffDecks } from '../../src/siting/routes.js';
import { P, smallSite } from './support.js';

/** M0-x-06's small river frame (CITY, 30 ha frame, 6 ha walled, the river from the west, no mouth, the base terrain). */
const SMALL_RIVER: BaseBlueprint = {
  size: { rung: 'CITY', aspect: 1, areaHa: 30 },
  site: { relief: 'plain', river: { inflowBearingCdeg: 27_000, mouth: 'none' } },
  terrain: 'base',
  walledHa: 6,
};

/** M0-x-04's river test frame (900 ha, 30 ha walled; C-0264 (10)). */
const RIVER_900: BaseBlueprint = { ...RIVER_BLUEPRINT, size: { ...RIVER_BLUEPRINT.size, areaHa: 900 }, walledHa: 30 };

const CASES: readonly { name: string; bp: BaseBlueprint; seed: number }[] = [
  { name: 'the small river frame at seed 1409296145 (M0-x-06 cell/bridge×frame, Q52 C)', bp: SMALL_RIVER, seed: 1409296145 },
  { name: 'the small river frame at seed 27 (M0-c-03 N-c1c-3)', bp: SMALL_RIVER, seed: 27 },
  { name: 'the 900 ha river frame at seed 12 (M0-c-02 N-33, gate:2)', bp: RIVER_900, seed: 12 },
  { name: 'the small river frame at seed 396602230 (M0-x-06 cell/bridge×frame, Q52 D: a main gate in the water)', bp: SMALL_RIVER, seed: 396602230 },
  { name: 'the small river frame at seed 765046355 (Q52 D)', bp: SMALL_RIVER, seed: 765046355 },
  { name: 'the small river frame at seed 914597522 (Q52 D)', bp: SMALL_RIVER, seed: 914597522 },
  { name: 'the small river frame at seed 3484178840 (Q52 D)', bp: SMALL_RIVER, seed: 3484178840 },
];

describe("§4.2 S3 (7)'s deck rule: no gate on a deck edge, and S3 commits on the river seeds the trace refused (R-28, R-29; C-0365)", () => {
  for (const { name, bp, seed } of CASES) {
    it(name, { timeout: 600_000 }, () => {
      const out = runBase(bp, seed, { kind: 'all' });
      expect(out.report.bugs.filter((b) => b.stage === 'S3' || b.stage === 'S1')).toEqual([]);
      const slice = out.model.data.get('s3.slice') as S3Slice | undefined;
      expect(slice).toBeDefined();
      if (slice === undefined) return;
      const L = slice.lattice;
      expect(L.costs.water.faces.length).toBeGreaterThan(0);
      expect(slice.gates.length).toBe(slice.n);
      for (const g of slice.gates) {
        const [u, v] = g.edge;
        expect(meetsWater(L, L.points[u], L.points[v])).toBe(false);
        for (const f of L.costs.water.faces) expect(insideRing(f, g.at, true)).toBe(false);
      }
    });
  }
});

describe("F-WALL's re-draw of a route the deck rule re-solved: the re-draw replaces the route T reads (C-0365 (1); C-0201 (6))", () => {
  it('smallSite(3), river at x 200–220 m, deck at y 100 m, N 6: one deck re-solve of gate 5, one re-draw, T the field of the standing routes, no second re-draw', () => {
    // Round S2's closing check (checks/M0-c-01-s2.md, mutant M8): with the re-draw keeping the deck rule's stored "route
    // as (5) solved it", T and the boundary went on reading the dropped pick's route, a second re-draw followed and T
    // was no longer the field of the gates' own routes. This site reaches that branch on lawful input.
    const x0 = 20_000;
    const w = 2_000;
    const deckY = 10_000;
    const band = [P(x0, -100_000), P(x0 + w, -100_000), P(x0 + w, 100_000), P(x0, 100_000)];
    const water = { faces: [band], decks: [{ id: 'bridge:0', a: P(x0, deckY), b: P(x0 + w, deckY) }] };
    const s = s3Slice(smallSite(3, { water }), { requestedN: 6 });
    const L = s.lattice;
    const limit = s.report.routeNodesLimit;
    const a1 = stageA(s.site);
    const areaCm2 = s.site.land.stagesHa[0] * 1e8;
    const tree = plazaTree(L);
    // The premise, step by step. (5)'s first routes (every pick at its first ranked node) give six gates, none sharing a
    // point, and gate 5 standing in the river: the deck rule fires first.
    const firstPicks: GatePick[] = s.picks.map((p) => ({ ...p, node: p.ranked[0], at: L.points[p.ranked[0]] }));
    const first = gateRoutes(tree, firstPicks, { nodeLimit: limit }).routes;
    expect(first.map((r) => r.ordinal)).toEqual([0, 1, 2, 3, 4, 5]);
    const f1 = fieldT(L, first, a1);
    const t1 = stageThreshold(f1, areaCm2).t;
    const set1 = levelSet(f1, t1);
    const g1 = gatesOnBoundary(first, t1, set1);
    const keys1 = g1.map((g) => (g === null ? 'none' : `${String(g.at.x)},${String(g.at.y)}`));
    expect(new Set(keys1).size).toBe(6);
    const g5 = g1[5];
    expect(g5 !== null && inWater(L, g5.at)).toBe(true);
    // The deck rule re-solves gate 5's route off the straddling decks (T and the boundary keep (5)'s route), and the
    // re-solved route's gate meets gate 0 at one point: F-WALL's coincidence on a route the deck rule re-solved.
    const off = resolveOffDecks(L, firstPicks[5], set1.selected, limit);
    expect(off.routes.length).toBe(1);
    const g1b = gatesOnBoundary([...first.slice(0, 5), off.routes[0]], t1, set1);
    expect(g1b[5]?.at).toEqual(g1b[0]?.at);
    // One re-draw rung, of gate 5 against gate 0 from its first ranked node to its second, and no second re-draw.
    expect(s.picks[5].ranked.slice(0, 2)).toEqual([3562, 3722]);
    expect(s.report.gateRungs).toEqual([{ rung: 'redraw', ordinal: 5, with: 0, attempt: 1, from: 3562, to: 3722 }]);
    expect(s.picks.map((p) => p.node)).toEqual([...firstPicks.slice(0, 5).map((p) => p.node), 3722]);
    // The re-draw replaces the route T reads: the standing routes are (5)'s routes of the standing picks, the re-drawn
    // route as (5) solves it, and T is their field byte for byte (not the dropped pick's stored route).
    const standing = gateRoutes(tree, s.picks, { nodeLimit: limit }).routes;
    expect(s.routes).toEqual(standing);
    expect(Buffer.from(s.field.T.buffer).equals(Buffer.from(fieldT(L, standing, a1).T.buffer))).toBe(true);
    expect(Buffer.from(s.field.T.buffer).equals(Buffer.from(fieldT(L, [...first.slice(0, 5), standing[5]], a1).T.buffer))).toBe(true);
    // Six gates, all on ground, none unserved.
    expect(s.report.unserved).toEqual([]);
    expect(s.gates.map((g) => g.ordinal)).toEqual([0, 1, 2, 3, 4, 5]);
    for (const g of s.gates) expect(inWater(L, g.at)).toBe(false);
  });
});
