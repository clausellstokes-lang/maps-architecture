// §4.2 S3 (7)'s deck rule on the registered river blueprints (M0-c-01 hardening round S2; refusal census R-28, the
// slice's share; C-0365): a gate route that first reaches T = t₁ on a deck edge put its gate on the crossing, in the
// river, and the trace refused the stage (`trace: gate gate:n is not on the committed trace at its point (§4.2 S3 (9))`,
// E_INVARIANT), or found a main gate standing in the water between a crossing's banks (`water: the crossing … has no
// clear chord between its two bank pins (a main gate stands in the water between its banks)`, R-29's class at these
// seeds). The slice now re-solves such a route off the decks straddling the boundary, so every gate stands on ground
// and S3 commits. Each seed below refused at S3 before the rule (red on the pre-round sources), and commits now.
import { describe, expect, it } from 'vitest';
import { insideRing, RIVER_BLUEPRINT, runBase, type BaseBlueprint, type S3Slice } from '../../src/index.js';
import { meetsWater } from '../../src/siting/lattice.js';

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
