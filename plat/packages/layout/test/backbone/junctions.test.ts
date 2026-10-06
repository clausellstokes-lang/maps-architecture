// M0-c-03: the junction rules (§4.3: "minimum crossing angle 30° (else deflect); Y → T conversion where the acute arm
// can be bent within its class curvature limit (G-P5)"; C-0236 (8)) on synthetic graphs.
import { describe, expect, it } from 'vitest';
import { tableView } from '@plat/tables';
import { arterialGraph, chainPoints, classGeometryCm, classify, junctionAngles, junctionRules, type RoutePoint, type S4Route, type Simplified } from '../../src/index.js';
import { P } from './support.js';

const T = tableView();

function route(id: string, order: number, pts: [number, number][]): S4Route {
  const points: RoutePoint[] = pts.map((p, i) => (i === 0 ? { at: P(p[0], p[1]), pin: 'attach', pinId: 'plaza:0' } : i === pts.length - 1 ? { at: P(p[0], p[1]), pin: 'gate', pinId: `gate:${id}` } : { at: P(p[0], p[1]) }));
  return { id, order, part: 'inward', class: 'primary', points, spans: [], from: { kind: 'plaza', id: 'plaza:0' }, to: { kind: 'gate', id: `gate:${id}` } };
}

function rulesOn(routes: S4Route[]): { rules: ReturnType<typeof junctionRules>; polys: Simplified[]; g: ReturnType<typeof arterialGraph> } {
  const g = arterialGraph(routes, 800);
  const classes = classify(g, { tables: T, rung: 'CITY' });
  const polys: Simplified[] = g.chains.map((c) => {
    const pts = chainPoints(g, c);
    return { points: pts, anchor: pts.map((_, i) => i === 0 || i === pts.length - 1) };
  });
  const rules = junctionRules(g, polys, classes, { minCrossingCdeg: 3000, spacingCm: 2500, radiusCm: (ci) => classGeometryCm(T, classes[ci].class).minRadiusCm, obstacles: [] });
  return { rules, polys, g };
}

function branchDir(polys: Simplified[], chain: number): { x: number; y: number } {
  const p = polys[chain].points;
  const j = p[0].x === 0 && p[0].y === 0 ? 0 : p.length - 1;
  const q = j === 0 ? p[1] : p[p.length - 2];
  return { x: q.x, y: q.y };
}

describe('Y → T (§4.3; G-P5)', () => {
  it('bends an acute branch to leave perpendicular to the through line when it can within its radius', () => {
    const through = route('a', 0, [[-20000, 0], [-10000, 0], [0, 0], [10000, 0], [20000, 0]]);
    const branch = route('b', 1, [[-20000, 0], [-10000, 0], [0, 0], [5000, 5000], [10000, 10000], [15000, 15000]]);
    const { rules, polys } = rulesOn([through, branch]);
    expect(rules).toHaveLength(1);
    expect(rules[0]).toMatchObject({ rule: 'y_to_t', applied: true, at: P(0, 0) });
    expect(Math.round(rules[0].beforeCdeg)).toBe(4500);
    expect(Math.round(rules[0].afterCdeg)).toBe(9000);
    const d = branchDir(polys, rules[0].chain);
    expect(d.x).toBe(0);
    expect(d.y).toBeGreaterThan(0);
  });

  it('leaves a Y where the bend cannot keep the branch class radius, and a symmetric Y alone', () => {
    const through = route('a', 0, [[-20000, 0], [-10000, 0], [0, 0], [10000, 0], [20000, 0]]);
    const tight = route('b', 1, [[-20000, 0], [-10000, 0], [0, 0], [1000, 1000], [2000, 2000], [15000, 15000]]);
    const { rules } = rulesOn([through, tight]);
    expect(rules.filter((r) => r.rule === 'y_to_t')).toEqual([expect.objectContaining({ applied: false })]);
    const y1 = route('a', 0, [[-20000, 0], [-10000, 0], [0, 0], [8660, 5000], [17320, 10000]]);
    const y2 = route('b', 1, [[-20000, 0], [-10000, 0], [0, 0], [8660, -5000], [17320, -10000]]);
    expect(rulesOn([y1, y2]).rules).toEqual([]);
  });
});

describe('the 30° minimum crossing angle (§4.3)', () => {
  it('deflects an arm closer than 30° to its neighbour to just over 30°', () => {
    const through = route('a', 0, [[-20000, 0], [-10000, 0], [0, 0], [10000, 0], [20000, 0]]);
    // A branch 20° above the east arm, too short to bend to a T: deflected.
    const branch = route('b', 1, [[-20000, 0], [-10000, 0], [0, 0], [1000, 364], [1500, 364], [15000, 5000]]);
    const { rules, polys, g } = rulesOn([through, branch]);
    const d = rules.filter((r) => r.rule === 'deflect');
    expect(d).toHaveLength(1);
    expect(d[0].applied).toBe(true);
    expect(d[0].beforeCdeg).toBeLessThan(3000);
    expect(d[0].afterCdeg).toBeGreaterThanOrEqual(3000);
    for (const a of junctionAngles(g, polys)) expect(a.minCdeg).toBeGreaterThanOrEqual(3000);
  });

  it('measures each junction: the smallest angle between adjacent arms', () => {
    const through = route('a', 0, [[-20000, 0], [-10000, 0], [0, 0], [10000, 0], [20000, 0]]);
    const branch = route('b', 1, [[-20000, 0], [-10000, 0], [0, 0], [0, 10000], [0, 20000]]);
    const g = arterialGraph([through, branch], 800);
    const polys = g.chains.map((c) => ({ points: chainPoints(g, c), anchor: [] as boolean[] }));
    expect(junctionAngles(g, polys).map((a) => Math.round(a.minCdeg))).toEqual([9000]);
  });
});
