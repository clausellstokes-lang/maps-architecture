// M0-c-03: every lawful route part commits as one simple spine (Q52 class A, the refusal census's R-35; c-03 S3). The
// census's seven seeds: M0-x-06's edge fixtures refused S4's batch on their prepared or control state — the base chain
// through S4 on the small flat frame or on EP-20's frame — with `(way, way:n) branches: a linear role forms simple
// chains or rings` (§3.10's role consistency: a way is one simple chain), and e-06's relief-3000 seed 8 the same. Two
// causes, both now cleaned before the commit:
//   * the attach end (4078456246, 1104735897, 2787492733, 1625622056): the inward part's first lattice node lies beyond
//     the attach point and its next edge passes it within `attractCm`, so §3.6's attraction routed that edge through
//     the attach point and the way met itself there — the spur is dropped (`commitRoutes`);
//   * the gate end (EP-20's 1334794515, 3068986432, 3296267945): the inward part's corridor node next to its gate lies
//     beyond the wall S3 committed, so its last edges ran along the wall's and setback's lines and folded onto them —
//     the node is dropped and the gate joined to the node before it (`routesFromSlice`).
// The chain is M0-x-04's base registration through the runner — S1, S3 and S4, S5 kept in its rank but idle — on the
// frames restated here (the testkit's `SMALL_FLAT`, `EP20_BLUEPRINT` and `SMALL_RIVER`; this package's tests cannot
// import the testkit). The gate end's hold never lays a part along the wall (c-03 S4, B-N1, B-N2; the last block).
import { describe, expect, it } from 'vitest';
import { STAGES, ok, type KernelResult, type LatticePoint } from '@plat/kernel';
import { baseArena, createRegistry, partLeavesWall, registerBase, run, type BaseBlueprint, type PipelineStage, type S3Commit, type S3Slice, type S4Output } from '../../src/index.js';
import { edgesOf, insideRing, key, segDist, wayEdges, wayLine } from './support.js';

const SMALL_FLAT: BaseBlueprint = Object.freeze({
  size: Object.freeze({ rung: 'CITY', aspect: 1, areaHa: 30 }),
  site: Object.freeze({ relief: 'plain' as const, river: null }),
  terrain: 'flat',
  walledHa: 6,
}) as BaseBlueprint;
const EP20: BaseBlueprint = Object.freeze({ ...SMALL_FLAT, size: Object.freeze({ rung: 'CITY', aspect: 1, areaHa: 12 }), walledHa: 220 }) as BaseBlueprint;
const SMALL_RIVER: BaseBlueprint = Object.freeze({
  ...SMALL_FLAT,
  site: Object.freeze({ relief: 'plain' as const, river: Object.freeze({ inflowBearingCdeg: 27_000, mouth: 'none' as const }) }),
  terrain: 'base',
}) as BaseBlueprint;

/** `attractCm` (§3.2: 26 cm), written here. */
const ATTRACT_CM = 26;

interface Through {
  slice: S3Slice;
  commit: S3Commit;
  s4: S4Output;
  bugs: readonly string[];
  plat: Parameters<typeof wayEdges>[0];
}

function throughS4(bp: BaseBlueprint, seed: number): Through {
  const registry = createRegistry();
  registerBase(registry);
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('no base product');
  const kept: PipelineStage[] = [];
  for (const s of product.stages) {
    if ((s.id as number) <= STAGES.S4) kept.push(s);
    else if ((s.id as number) === STAGES.S5) kept.push(Object.freeze({ ...s, run: (): KernelResult<Record<string, unknown>> => ok({}) }) as PipelineStage);
  }
  product.stages.length = 0;
  product.stages.push(...kept);
  const { model, report } = run(registry, { ...bp, seed }, { kind: 'all' }, { arenas: () => [baseArena(bp)] });
  const slice = model.data.get('s3.slice') as S3Slice | undefined;
  const commit = model.data.get('s3.commit') as S3Commit | undefined;
  const s4 = model.data.get('s4') as S4Output | undefined;
  const plat = model.plats.get('ground/0');
  const bugs = report.bugs.map((b) => b.key);
  if (slice === undefined || commit === undefined || plat === undefined) throw new Error(`seed ${String(seed)}: the chain stopped before S4 (${bugs.join(', ')})`);
  if (s4 === undefined) throw new Error(`seed ${String(seed)}: S4 was refused (${bugs.join(', ')})`);
  return { slice, commit, s4, bugs, plat };
}

/** Every way's edges walk as one open path from end to end (wayLine throws on a branch or a second piece). */
function simpleWays(t: Through): void {
  const ways = wayEdges(t.plat);
  expect(ways.size).toBe(t.s4.network.ways.length);
  for (const w of t.s4.network.ways) {
    const line = wayLine(ways.get(w.id) ?? []);
    expect(line.length, w.id).toBeGreaterThanOrEqual(2);
    expect(new Set(line.map((p) => key(p))).size, `${w.id} meets itself`).toBe(line.length);
  }
}

describe('the attach end: a spur past the attach point is cut (Q52 A on the small flat frame)', { timeout: 120_000 }, () => {
  for (const seed of [4078456246, 1104735897, 2787492733, 1625622056]) {
    it(`${String(seed)}: S4 commits, every way one simple path, the spur's node not on the committed course`, () => {
      const t = throughS4(SMALL_FLAT, seed);
      expect(t.bugs).toEqual([]);
      simpleWays(t);
      // The precondition: an inward part as the slice gave it (S4's routes) leaves its attach point for a node beyond it,
      // whose next edge passes the attach point within attractCm — the spur.
      const spurs = t.s4.routes.filter((r) => r.part === 'inward' && r.points.length >= 3 && segDist(r.points[0].at, r.points[1].at, r.points[2].at) <= ATTRACT_CM);
      expect(spurs.length, 'a spur at an attach point').toBeGreaterThan(0);
      for (const r of spurs) {
        const g = t.s4.graph.routes.find((x) => x.id === r.id);
        expect(g, r.id).toBeDefined();
        expect(g?.points.some((p) => key(p.at) === key(r.points[1].at)), `${r.id}'s spur node`).toBe(false);
      }
    });
  }
});

describe("the gate end: a corridor node beyond the committed wall is dropped (Q52 A on EP-20's frame)", { timeout: 120_000 }, () => {
  for (const seed of [1334794515, 3068986432, 3296267945]) {
    it(`${String(seed)}: S4 commits, every way one simple path, each inward part's points inside the wall`, () => {
      const t = throughS4(EP20, seed);
      expect(t.bugs).toEqual([]);
      simpleWays(t);
      // The precondition: a gate route's lattice node next to its gate (the inward side) lies outside the trace.
      const wall = t.commit.traced.line;
      const beyond: LatticePoint[] = [];
      for (const g of t.slice.gates) {
        const r = t.slice.routes.find((q) => q.ordinal === g.ordinal);
        if (r === undefined) continue;
        const p = t.slice.lattice.points[r.nodes[g.routeIndex]];
        if (!insideRing(wall, p)) beyond.push(p);
      }
      expect(beyond.length, 'a corridor node beyond the wall').toBeGreaterThan(0);
      // Committed: no inward part holds such a node, and every inward point but the gate lies inside the wall.
      for (const r of t.s4.routes.filter((x) => x.part === 'inward')) {
        for (const p of r.points) {
          if (p.pin === 'gate') continue;
          expect(beyond.some((b) => key(b) === key(p.at)), `${r.id} keeps ${key(p.at)}`).toBe(false);
        }
      }
    });
  }
});

// The gate end's hold and the off-gate count (c-03 S4; the closing check of S3's B-N1 and B-N2; C-0236 (9)). The hold
// joins the gate to the first point on its side only where that segment meets the wall at the gate alone and keeps
// attractCm clear of it beyond the gate — §3.6's insertion lands a point that near on the wall and routes a segment
// through every wall vertex it passes that near — else the part is kept as given; and `offGate` counts every part that
// meets the wall off its gate, the parts whose committed way runs along the wall (an edge carrying the wall's row too)
// among them. The registered seeds:
//   * small river 9: `gate:1/in`'s nodes next to its gate lie beyond the wall (the gate at the tip of a trace spike); the
//     join to the first node inside passed the wall vertex (11522, 1159) 15 cm off, and the commit laid the way on the
//     wall edge up to the gate with `offGate` 0. Kept as given now: it crosses the wall, counted, as before the round.
//   * small river 1192931101: `gate:0/in`'s join to the first node inside crosses the wall at (-8343, 5210)'s sides;
//     kept as given, with its two nodes beyond the wall, counted.
//   * EP-20 3068986432: `gate:0/out`'s first corridor node lies 16 cm outside the wall's side, and the insertion lays the
//     outward way along it — read from the arena and counted.
describe("the gate end's hold never lays a way along the wall uncounted (c-03 S4; C-0236 (9))", { timeout: 120_000 }, () => {
  /** The parts whose committed way runs along the wall: a way edge carrying the wall's row too, its part the way's. */
  function alongWall(t: Through): Set<string> {
    const ways = new Set<string>();
    for (const e of edgesOf(t.plat)) if (e.rows.some((r) => r.role === 'wall')) for (const r of e.rows) if (r.role === 'way') ways.add(r.entity);
    const parts = new Set<string>();
    t.s4.chainWay.forEach((w, ci) => {
      if (ways.has(w)) parts.add(t.s4.graph.routes[Math.min(...t.s4.graph.chains[ci].routes)].id);
    });
    return parts;
  }
  /** The off-gate count's parts: those meeting the wall off their gate, and those laid along it. */
  function offGateParts(t: Through): Set<string> {
    const wall = t.commit.traced.line;
    const out = alongWall(t);
    for (const r of t.s4.routes) if (partLeavesWall(r.points, wall, r.part === 'inward')) out.add(r.id);
    return out;
  }
  const route = (t: Through, id: string): string[] => (t.s4.routes.find((r) => r.id === id)?.points ?? []).map((p) => key(p.at));

  it('small river 9: the join along the spike is refused, the part kept as given — no way on the wall, the part counted', () => {
    const t = throughS4(SMALL_RIVER, 9);
    expect(t.bugs).toEqual([]);
    simpleWays(t);
    expect([...alongWall(t)]).toEqual([]);
    // As given: the nodes beyond the wall next to the gate are kept, so the part crosses the wall and is counted.
    expect(route(t, 'gate:1/in').slice(-4)).toEqual(['9693,-175', '12749,386', '13861,2083', '15278,2087']);
    expect([...offGateParts(t)]).toEqual(['gate:1/in']);
    expect(t.s4.report.offGate).toBe(1);
  });

  it('small river 1192931101: a join crossing the wall elsewhere is refused, the part kept as given and counted', () => {
    const t = throughS4(SMALL_RIVER, 1192931101);
    expect(t.bugs).toEqual([]);
    simpleWays(t);
    expect([...alongWall(t)]).toEqual([]);
    expect(route(t, 'gate:0/in').slice(-4)).toEqual(['-7669,4665', '-9873,4587', '-11202,6534', '-12082,7651']);
    expect([...offGateParts(t)]).toEqual(['gate:0/in']);
    expect(t.s4.report.offGate).toBe(1);
  });

  it('EP-20 3068986432: the outward way the insertion lays along the wall is read from the arena and counted', () => {
    const t = throughS4(EP20, 3068986432);
    expect(t.bugs).toEqual([]);
    simpleWays(t);
    expect([...alongWall(t)]).toEqual(['gate:0/out']);
    expect(t.s4.report.offGate).toBe(offGateParts(t).size);
    expect(t.s4.report.offGate).toBe(1);
  });
});
