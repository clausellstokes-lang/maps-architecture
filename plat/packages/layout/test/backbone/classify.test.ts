// M0-c-03: class and width (§4.3: "Class and width come from multiplicity and betweenness on this graph (the width
// table `ways.widths` keyed by class and rung, the class by betweenness)"; §17.1 (8) Brandes' betweenness; C-0236 (6)).
import { describe, expect, it } from 'vitest';
import { tableView } from '@plat/tables';
import { arterialGraph, chainBetweenness, classify, PROMOTE_FLOWS, widthAt, widthBandCm, type RoutePoint, type S4Route } from '../../src/index.js';
import { P, waysWith } from './support.js';

const T = tableView();

function route(id: string, order: number, pts: (RoutePoint | [number, number])[], part: 'inward' | 'outward', cls: 'primary' | 'through', to: S4Route['to'], from: S4Route['from'] = { kind: 'plaza', id: 'plaza:0' }): S4Route {
  return { id, order, part, class: cls, points: pts.map((p) => (Array.isArray(p) ? { at: P(p[0], p[1]) } : p)), spans: [], from, to };
}
const attach: RoutePoint = { at: P(0, 0), pin: 'attach', pinId: 'plaza:0' };
const gate = (x: number, y: number, id: string): RoutePoint => ({ at: P(x, y), pin: 'gate', pinId: id });
const frame = (x: number, y: number): RoutePoint => ({ at: P(x, y), pin: 'frame' });

/** Two gate routes from one attach point, sharing a run, each split at its gate (in, out). */
function star(): S4Route[] {
  return [
    route('g0/in', 0, [attach, [2000, 0], [4000, 0], gate(6000, 2000, 'gate:0')], 'inward', 'primary', { kind: 'gate', id: 'gate:0' }),
    route('g0/out', 0, [gate(6000, 2000, 'gate:0'), [8000, 4000], frame(10000, 6000)], 'outward', 'through', { kind: 'bearing', bearingCdeg: 4500 as never }, { kind: 'gate', id: 'gate:0' }),
    route('g1/in', 1, [attach, [2000, 0], [4000, 0], gate(6000, -2000, 'gate:1')], 'inward', 'primary', { kind: 'gate', id: 'gate:1' }),
    route('g1/out', 1, [gate(6000, -2000, 'gate:1'), [8000, -4000], frame(10000, -6000)], 'outward', 'through', { kind: 'bearing', bearingCdeg: 13500 as never }, { kind: 'gate', id: 'gate:1' }),
  ];
}

describe("Brandes' betweenness over the plaza flows (§17.1 (8); C-0236 (6))", () => {
  it('counts each plaza-to-destination pair whose shortest path crosses a chain', () => {
    const g = arterialGraph(star(), 800);
    const b = chainBetweenness(g);
    // The shared run carries both flows; each branch one.
    const shared = g.chains.find((c) => c.multiplicity === 2);
    expect(shared).toBeDefined();
    expect(b[shared?.index ?? -1]).toBe(2);
    for (const c of g.chains) if (c !== shared) expect(b[c.index]).toBe(1);
  });

  it('splits a pair between two equal shortest paths (σ counted)', () => {
    // A diamond: attach → (2 000, ±1 000) → (4 000, 0) → frame, the two sides of equal length.
    const routes = [
      route('a/in', 0, [attach, [2000, 1000], { at: P(4000, 0), pin: 'gate', pinId: 'gate:0' }], 'inward', 'primary', { kind: 'gate', id: 'gate:0' }),
      route('b/in', 1, [attach, [2000, -1000], { at: P(4000, 0), pin: 'gate', pinId: 'gate:0' }], 'inward', 'primary', { kind: 'gate', id: 'gate:0' }),
      route('a/out', 0, [{ at: P(4000, 0), pin: 'gate', pinId: 'gate:0' }, frame(8000, 0)], 'outward', 'through', { kind: 'bearing', bearingCdeg: 9000 as never }, { kind: 'gate', id: 'gate:0' }),
    ];
    const g = arterialGraph(routes, 800);
    const b = chainBetweenness(g);
    const sides = g.chains.filter((c) => c.nodes.some((n) => g.nodes[n].at.y !== 0));
    expect(sides).toHaveLength(2);
    for (const c of sides) expect(b[c.index]).toBe(0.5);
    const out = g.chains.find((c) => c.nodes.some((n) => g.nodes[n].at.x === 8000));
    expect(b[out?.index ?? -1]).toBe(1);
  });
});

describe('class and width (§4.3; C-0236 (6))', () => {
  it('a primary chain carrying two plaza flows is through; the route split gives the rest; widths in their bands', () => {
    const g = arterialGraph(star(), 800);
    const cls = classify(g, { tables: T, rung: 'CITY' });
    const shared = g.chains.find((c) => c.multiplicity === 2);
    expect(PROMOTE_FLOWS).toBe(2);
    for (const c of g.chains) {
      const parts = c.routes.map((r) => g.routes[r].part);
      const want = c === shared || parts.includes('outward') ? 'through' : 'primary';
      expect(cls[c.index].class).toBe(want);
      const [lo, hi] = T.table('ways').pair(want, 'widthM.CITY');
      // N = 2 gate routes: multiplicity 1 → lo, 2 → hi.
      expect(cls[c.index].widthCm).toBe(Math.round((c.multiplicity === 2 ? hi : lo) * 100));
    }
  });

  it('reads the ways.widths cells: another CITY band gives other widths, another rung its own', () => {
    const g = arterialGraph(star(), 800);
    const t2 = waysWith('through', 'widthM.CITY', [20, 30]);
    const cls = classify(g, { tables: t2, rung: 'CITY' });
    for (const c of cls) if (c.class === 'through') expect([2000, 3000]).toContain(c.widthCm);
    const town = classify(g, { tables: T, rung: 'TOWN' });
    for (const c of town) {
      const [lo, hi] = T.table('ways').pair(c.class, 'widthM.TOWN');
      expect(c.widthCm).toBeGreaterThanOrEqual(lo * 100);
      expect(c.widthCm).toBeLessThanOrEqual(hi * 100);
    }
    expect(widthBandCm(T, 'track', 'CITY')).toEqual(widthBandCm(T, 'lane' as never, 'CITY'));
  });

  it('widthAt: lo at multiplicity 1 or one route, hi when every route shares, linear between', () => {
    expect(widthAt([800, 1200], 1, 7)).toBe(800);
    expect(widthAt([800, 1200], 7, 7)).toBe(1200);
    expect(widthAt([800, 1200], 4, 7)).toBe(1000);
    expect(widthAt([800, 1200], 3, 1)).toBe(800);
    expect(widthAt([800, 1200], 9, 7)).toBe(1200);
  });
});
