// M0-x-05: F-ROUTE's M0 rungs and F-WORK's S4 rung on S4's real Stage, through the base chain on the small river town at
// seed 2 (§5.2 F-ROUTE; §4.3; C-0076, C-0085, C-0236 (2), C-0269): its east gate's outward route meets a crossing site
// whose approach cannot meet the through class's radius, so the ladder gives the site up and re-solves — another
// crossing site within the band; with through's grade limit (S4's option; none at M0 by default, C-0158) the re-solve
// relaxes the slope one class; with every class limited no class reaches the frame and the destination is unserved;
// with route.nodes' limit at 1 the re-solve is cut, `work_cut` with the count, then unserved. The plain flat town leaves
// none of S4's codes.
import type { RouteRung, S4Output } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { LADDER_FIXTURES, ladderChain, ladderReadModel, ladderSmallRiver, type ChainOverrides } from '@plat/testkit';

const fixture = (id: string) => {
  const f = LADDER_FIXTURES.find((x) => x.id === id);
  if (f === undefined) throw new Error(`no fixture ${id}`);
  return f;
};

/** The river town through S4 with S4's options; its S4 rungs and what it left. */
function riverTown(s4?: ChainOverrides['S4']): { rungs: readonly RouteRung[]; leaves: Record<string, number>; bugs: number } {
  const run = ladderChain({ blueprint: ladderSmallRiver(), seed: 2, until: 'S4', ...(s4 === undefined ? {} : { override: { S4: s4 } }) });
  const s4out = run.model.data.get('s4') as S4Output;
  return { rungs: s4out.report.rungs, leaves: { ...ladderReadModel(run.model) }, bugs: run.report.bugs.length };
}

const RIVER_BASE = { 'S1 F-RIVER carve': 10, 'S3/S5a trace F-WALL union_simplify': 1 };

describe('F-ROUTE on S4’s Stage object (the small river town, seed 2)', () => {
  it('route/another-site — the nearest site given up, the route re-solved: another_site held; the water-bound inward part unserved', { timeout: 300_000 }, () => {
    const r = riverTown();
    expect(r.bugs).toBe(0);
    expect(r.leaves).toEqual({ ...RIVER_BASE, 'S4/S5b F-ROUTE another_site': 1, 'S4/S5b F-ROUTE unserved': 1 });
    expect(fixture('route/another-site').run()).toEqual(r.leaves);
    expect(r.rungs).toContainEqual({ route: 'gate:1/out', rung: 'another_site', from: 'bridge:6', to: null, held: true });
    expect(r.rungs).toContainEqual({ route: 'gate:0/in', rung: 'unserved', held: true, why: 'water' });
    // The extra bridge is M1's: never run, never listed held.
    expect(r.rungs.filter((x) => x.rung === 'extra_bridge' && x.held)).toEqual([]);
  });

  it('route/slope — through’s grade limit 0.01 %: the re-solve relaxes through → primary, held', { timeout: 300_000 }, () => {
    const r = riverTown({ gradeLimits: { through: 0.0001 } });
    expect(r.leaves).toEqual({ ...RIVER_BASE, 'S4/S5b F-ROUTE another_site': 1, 'S4/S5b F-ROUTE slope': 1, 'S4/S5b F-ROUTE unserved': 1 });
    expect(r.rungs.filter((x) => x.rung === 'slope')).toEqual([{ route: 'gate:1/out', rung: 'slope', fromClass: 'through', toClass: 'primary', held: true }]);
  });

  it('route/unserved — every class limited: through → primary → track → path, then the destination unserved (no path)', { timeout: 300_000 }, () => {
    const r = riverTown({ gradeLimits: { through: 0.0001, primary: 0.0001, secondary: 0.0001, track: 0.0001, path: 0.0001 } });
    expect(r.leaves).toEqual({ ...RIVER_BASE, 'S4/S5b F-ROUTE slope': 3, 'S4/S5b F-ROUTE unserved': 2 });
    const out = r.rungs.filter((x) => x.route === 'gate:1/out');
    expect(out.filter((x) => x.rung === 'slope').map((x) => [x.fromClass, x.toClass])).toEqual([
      ['through', 'primary'],
      ['primary', 'track'],
      ['track', 'path'],
    ]);
    expect(out.at(-1)).toEqual({ route: 'gate:1/out', rung: 'unserved', held: true, why: 'no path' });
  });

  it('work/route-s4 — route.nodes’ limit 1: the re-solve is cut, work_cut with the count, then unserved (F-WORK, C-0085)', { timeout: 300_000 }, () => {
    const r = riverTown({ routeNodesLimit: 1 });
    expect(r.leaves).toEqual({ ...RIVER_BASE, 'S4/S5b F-ROUTE unserved': 2, 'S4/S5b F-WORK work_cut': 1 });
    const cut = r.rungs.filter((x) => x.rung === 'work_cut');
    expect(cut).toHaveLength(1);
    expect(cut[0]).toMatchObject({ route: 'gate:1/out', limit: 1, held: true });
    expect(cut[0].count).toBeGreaterThanOrEqual(1);
    expect(r.rungs).toContainEqual({ route: 'gate:1/out', rung: 'unserved', held: true, why: 'work_cut' });
  });
});
