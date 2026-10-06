// M0-c-02: F-WALL's trace rungs M0 builds (§5.2 F-WALL; C-0085): a boundary with a notch narrower than twice the 40 m
// band, its walls pulled together by the cost surface, makes the smoothed trace self-touch; the re-offset rung (the
// closing by the band's radius, C-0226 (6)), then the topology-preserving union-simplify rung, each reached by its own
// fixture and reported; a trace neither repairs is refused (the later rungs are M1's). A notch twice the band or wider
// takes no rung.
import { describe, expect, it } from 'vitest';
import type { CostField, GateSite } from '../../src/index.js';
import { commitOuterRing, defectOf, selfTouches, siteContext, traceBase } from '../../src/index.js';
import { closedChain, densify, kernelFor, maxDeparture, P, smallSite, verticesWith } from './support.js';

type Corner = readonly [number, number];
const TOP = (w: number): Corner[] => [[w / 2, 30000], [w / 2, 20000], [-w / 2, 20000], [-w / 2, 30000]];
const BOTTOM = (w: number): Corner[] => [[-w / 2, -30000], [-w / 2, -20000], [w / 2, -20000], [w / 2, -30000]];
/** A 600 m square with a notch down from its north side and, optionally, one up from its south side. */
const square = (top: Corner[], bottom: Corner[] = []): Corner[] => [[-30000, -30000], ...bottom, [30000, -30000], [30000, 30000], ...top, [-30000, 30000]];
/** High ground along the north notch's centre line: standing nearer x = 0 there costs less (a ridge down the notch). */
const ridge: CostField = (q) => (Math.abs(q.x) < 6000 && q.y > 15000 ? Math.abs(q.x) / 100 : 0);

function run(corners: Corner[], gates: Corner[], cost?: CostField, core: Corner[][] = []) {
  const site = smallSite(2);
  const { plat, k } = kernelFor(site);
  expect(commitOuterRing(site, k).ok).toBe(true);
  const sites: GateSite[] = gates.map(([x, y], i) => ({ ordinal: i, at: P(x, y), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false }));
  const boundary = densify(corners);
  const r = traceBase(boundary, sites, [], site.terrain, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, {
    ...(cost === undefined ? {} : { costField: cost }),
    core: core.map((ring) => ring.map(([x, y]) => P(x, y))),
  });
  return { r, plat, boundary, sites };
}

const SIDES: Corner[] = [[-30000, 0], [30000, 0], [0, -30000]];

describe('F-WALL\'s trace rungs (C-0085)', () => {
  it('a 60 m notch (narrower than twice the band) whose walls the pull brings together self-touches; the re-offset rung repairs it', () => {
    const { r, plat, boundary, sites } = run(square(TOP(6000)), SIDES, ridge);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const rep = r.value.traced.report;
    expect(rep.rungs).toEqual([{ rung: 'reoffset', cause: 'self_touch', radiusCm: 4000, held: true }]);
    const wall = closedChain(plat, { role: 'wall', entity: 'enceinte:1' });
    expect(selfTouches(wall)).toBe(false);
    // The notch is closed off: no wall vertex inside it below its mouth's last 10 m.
    expect(wall.some((q) => Math.abs(q.x) < 2900 && q.y < 29000 && q.y > 20000)).toBe(false);
    expect(maxDeparture(wall, boundary)).toBeLessThanOrEqual(4000);
    for (const s of sites) expect(verticesWith(plat, 'gate', `gate:${String(s.ordinal)}`)).toEqual([s.at]);
  }, 60_000);

  it('the same notch at 100 m (wider than twice the band) takes no rung: its walls stop 20 m apart', () => {
    const { r } = run(square(TOP(10000)), SIDES, ridge);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.traced.report.rungs).toEqual([]);
  }, 60_000);

  it('with a gate on the wall of a second, 70 m notch the re-offset would close over, the re-offset loses the gate and the union-simplify rung repairs the trace', () => {
    const gates: Corner[] = [[-30000, 0], [30000, 0], [-3500, -25000]];
    const { r, plat, boundary, sites } = run(square(TOP(6000), BOTTOM(7000)), gates, ridge);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.traced.report.rungs).toEqual([
      { rung: 'reoffset', cause: 'self_touch', radiusCm: 4000, held: false, why: 'pin_lost' },
      { rung: 'union_simplify', cause: 'self_touch', radiusCm: 0, held: true },
    ]);
    const wall = closedChain(plat, { role: 'wall', entity: 'enceinte:1' });
    expect(selfTouches(wall)).toBe(false);
    expect(maxDeparture(wall, boundary)).toBeLessThanOrEqual(4000);
    for (const s of sites) expect(verticesWith(plat, 'gate', `gate:${String(s.ordinal)}`)).toEqual([s.at]);
    // The gated notch stands: the wall still runs down into it.
    expect(wall.some((q) => q.y > -25500 && q.y < -24500 && Math.abs(q.x + 3500) <= 1)).toBe(true);
  }, 60_000);

  it('a trace crossing the core that neither rung repairs is refused, E_SELF_INTERSECT, nothing committed', () => {
    // A core ring straddling the boundary's east side: the closing adds no ground on a straight side, the union keeps it.
    const core: Corner[][] = [[[28000, -2000], [33000, -2000], [33000, 2000], [28000, 2000]]];
    const { r, plat } = run(square([]), [[-30000, 0], [0, -30000]], undefined, core);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe('E_SELF_INTERSECT');
      expect(r.detail).toMatch(/crosses the core/);
    }
    expect(() => closedChain(plat, { role: 'wall', entity: 'enceinte:1' })).toThrow();
  }, 60_000);

  it('the detection: a self-touch (sides within the attraction distance, or crossing) and a crossing of the core', () => {
    const sq = [P(0, 0), P(10000, 0), P(10000, 10000), P(0, 10000)];
    expect(defectOf(sq, [])).toBeNull();
    expect(defectOf(sq, [[P(4000, 4000), P(6000, 4000), P(6000, 6000)]])).toBeNull();
    expect(defectOf(sq, [[P(9000, 4000), P(11000, 4000), P(11000, 6000)]])).toBe('core');
    expect(defectOf(sq, [[P(20000, 4000), P(21000, 4000), P(21000, 6000)]])).toBe('core');
    // A slot whose two walls pass 20 cm apart touches; 30 cm apart does not.
    const slot = (gap: number) => [P(0, 0), P(10000, 0), P(10000, 10000), P(5000 + gap, 10000), P(5000 + gap, 2000), P(5000, 2000), P(5000, 10000), P(0, 10000)];
    expect(defectOf(slot(20), [])).toBe('self_touch');
    expect(defectOf(slot(30), [])).toBeNull();
    // A figure of eight crosses itself.
    expect(defectOf([P(0, 0), P(10000, 10000), P(10000, 0), P(0, 10000)], [])).toBe('self_touch');
  });
});
