// M0-c-03: commitRoutes' validation (C-0236 (12)): a chain whose smoothed course would cross what it may not (here
// the plaza's ring) falls back to its simplified course, and the committed way keeps clear of it.
import { describe, expect, it } from 'vitest';
import { tableView } from '@plat/tables';
import { commitOuterRing, commitRoutes, type RoutePoint, type S4Route } from '../../src/index.js';
import { edgesWith, kernelFor, P, segsMeet, smallSite } from './support.js';

describe("commitRoutes' validation and fallback (C-0236 (12))", () => {
  it('a smoothed course that would cut into the plaza falls back; the way never meets the plaza ring', () => {
    const site = smallSite(1);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const pts: [number, number][] = [[0, 0], [2500, 0], [5000, 0], [7500, 0], [10000, 0], [10000, 2500], [10000, 5000], [10000, 7500], [10000, 10000]];
    const points: RoutePoint[] = pts.map((p, i) => ({ at: P(p[0], p[1]), ...(i === 0 ? { pin: 'attach' as const, pinId: 'plaza:9' } : i === pts.length - 1 ? { pin: 'gate' as const, pinId: 'gate:9' } : {}) }));
    const route: S4Route = { id: 'gate:9/in', order: 0, part: 'inward', class: 'primary', points, spans: [], from: { kind: 'plaza', id: 'plaza:9' }, to: { kind: 'gate', id: 'gate:9' } };
    // A square inside the corner where the smoothed curve would run (through (8 237, 825)).
    const square = [P(8000, 500), P(8600, 500), P(8600, 1100), P(8000, 1100)];
    const r = commitRoutes([route], k, { tables: tableView(), rung: 'CITY', spacingCm: 2500, plaza: square });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.report.unsmoothed).toBe(1);
    const sides = square.map((p, i) => [p, square[(i + 1) % square.length]] as const);
    for (const e of edgesWith(plat, 'way')) for (const [a, b] of sides) expect(segsMeet(e.a, e.b, a, b)).toBe(false);
    // Without the square, the same route is smoothed (its corner cut).
    const site2 = smallSite(1);
    const k2 = kernelFor(site2);
    commitOuterRing(site2, k2.k);
    const r2 = commitRoutes([route], k2.k, { tables: tableView(), rung: 'CITY', spacingCm: 2500 });
    expect(r2.ok && r2.value.report.unsmoothed).toBe(0);
    if (r2.ok) expect(r2.value.spines[0].length).toBeGreaterThan(pts.length);
  });
});
