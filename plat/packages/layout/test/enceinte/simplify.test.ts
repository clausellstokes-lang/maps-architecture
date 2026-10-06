// M0-c-02: the trace's topology-preserving simplify (§4.4 S5a *Trace* (3): Visvalingam, minimum segment 20 m, no
// interior angle < 100°; "a removal that would make the trace touch itself, cross water, enter a reservation, move a
// pinned vertex … is refused") on a trace fixture: a 600 m square with a 90° spike on its north side — a vertex the
// simplify removes (its interior angle below 100°) unless the removal is refused — and, in turn, a notch from the south
// reaching up under the spike, a reservation inside it, a lake inside it, or a gate on it. The smoothing passes are set
// to 0 (a walls.json cell) so the simplify meets the fixture's corners as drawn.
import { describe, expect, it } from 'vitest';
import type { GateSite } from '@plat/model';
import { commitOuterRing, selfTouches, siteContext, traceBase } from '../../src/index.js';
import { closedChain, densify, handBuildWater, kernelFor, P, smallSite, wallsWith } from './support.js';

type Corner = readonly [number, number];
const SPIKE: Corner[] = [[2000, 30000], [0, 32000], [-2000, 30000]];
/** The square, its north side carrying the spike; a notch from the south side up to y = tipY when given. */
function boundary(tipY?: number): Corner[] {
  const south: Corner[] = tipY === undefined ? [] : [[-150, -30000], [-150, tipY], [150, tipY], [150, -30000]];
  return [[-30000, -30000], ...south, [30000, -30000], [30000, 30000], ...SPIKE, [-30000, 30000]];
}
const GATES: Corner[] = [[-30000, 0], [30000, 0]];
const BOX = (y0: number, y1: number): Corner[] => [[-200, y0], [200, y0], [200, y1], [-200, y1]];

function trace(corners: Corner[], opts: { gates?: Corner[]; core?: Corner[]; lake?: Corner[] } = {}) {
  // No smoothing passes (walls.json's cell set to 0 here), so the simplify meets the fixture's own corners.
  const site = smallSite(2, { tables: wallsWith('trace', 'smoothPasses', 0) });
  const { plat, k } = kernelFor(site);
  expect(commitOuterRing(site, k).ok).toBe(true);
  const water = opts.lake === undefined ? { bodies: [], bridges: [] } : handBuildWater(k, opts.lake.map(([x, y]) => P(x, y)), 'lake:1');
  const sites: GateSite[] = (opts.gates ?? GATES).map(([x, y], i) => ({ ordinal: i, at: P(x, y), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false }));
  const r = traceBase(densify(corners), sites, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, {
    ...(opts.core === undefined ? {} : { core: [opts.core.map(([x, y]) => P(x, y))] }),
  });
  if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
  return { line: r.value.traced.line, report: r.value.traced.report, wall: closedChain(plat, { role: 'wall', entity: 'enceinte:1' }) };
}

/** The highest point of the trace near x = 0: the spike's tip while it stands. */
const top = (line: readonly { x: number; y: number }[]): number => Math.max(...line.filter((q) => Math.abs(q.x) < 1500).map((q) => q.y));

describe('the trace\'s simplify and its refusals', () => {
  it('removes the spike\'s tip (interior angle 90° < 100°) when nothing refuses it', () => {
    const t = trace(boundary());
    expect(t.report.simplify.skipped).toBe(false);
    expect(top(t.line)).toBeLessThan(30500);
  }, 60_000);

  it('a removal that would make the trace touch itself is refused: with a notch reaching up under the spike, the tip stands and the trace stays simple', () => {
    const t = trace(boundary(30500));
    expect(t.report.simplify.skipped).toBe(false);
    expect(top(t.line)).toBeGreaterThan(31000);
    expect(selfTouches(t.wall)).toBe(false);
    // The notch stands too: the wall still reaches up it.
    expect(t.line.some((q) => Math.abs(q.x) <= 150 && q.y > 30000 && q.y < 30600)).toBe(true);
  }, 60_000);

  it('a removal that would enter a reservation (the core) is refused', () => {
    const t = trace(boundary(), { core: BOX(30200, 30600) });
    expect(t.report.simplify.skipped).toBe(false);
    expect(top(t.line)).toBeGreaterThan(31000);
  }, 60_000);

  it('a removal that would cross the water is refused', () => {
    const t = trace(boundary(), { lake: BOX(30200, 30600) });
    expect(t.report.simplify.skipped).toBe(false);
    expect(top(t.line)).toBeGreaterThan(31000);
  }, 60_000);

  it('a pinned vertex is never removed: a gate on the spike\'s tip', () => {
    const t = trace(boundary(), { gates: [...GATES, [0, 32000]] });
    expect(t.line.some((q) => q.x === 0 && q.y === 32000)).toBe(true);
  }, 60_000);
});
