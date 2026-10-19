// M0-c-03: commitRoutes' validation (C-0236 (12)): a chain whose smoothed course would cross what it may not (here
// the plaza's ring) falls back to its simplified course, and the committed way keeps clear of it. And the
// W_STRETCH_SHARED count's positive control: two routes 20 cm apart for 100 m, which the graph does not merge (their
// points differ) and the fold leaves (two kinds of part), commit as near-duplicates the count reports — so the CITY
// fixture's 0 (backbone.test.ts) is a measurement that can fail; the count is of shares between ways only (a street
// along the plaza's side is none). The hardening round S3's pins on synthetic routes: the T band's edges, a way whose
// first chain is not its highest, the junction kinds after a fallback to the lattice courses, and a spur cut before the
// graph (Q52 A).
import { describe, expect, it } from 'vitest';
import { err, STAGES, type Kernel, type KernelTx } from '@plat/kernel';
import type { Cdeg } from '@plat/model';
import { tableView } from '@plat/tables';
import { commitOuterRing, commitRoutes, type RoutePoint, type S4Route } from '../../src/index.js';
import { edgesWith, kernelFor, P, runSite, segsMeet, smallSite, verticesWith, wayEdges, wayLine } from './support.js';

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

  it('reports the W_STRETCH_SHARED count of a near-duplicate run (the positive control of the count the CITY fixture holds at 0)', () => {
    const site = smallSite(1);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const inward: S4Route = {
      id: 'a',
      order: 0,
      part: 'inward',
      class: 'primary',
      points: [{ at: P(0, 0), pin: 'attach', pinId: 'plaza:0' }, ...[2500, 5000, 7500, 10000, 12500, 15000, 17500].map((x) => ({ at: P(x, 0) })), { at: P(20000, 0), pin: 'gate', pinId: 'gate:0' }],
      spans: [],
      from: { kind: 'plaza', id: 'plaza:0' },
      to: { kind: 'gate', id: 'gate:0' },
    };
    // 20 cm off the first route from x = 50 m to 150 m, joined at its two ends by diagonals.
    const outward: S4Route = {
      id: 'b',
      order: 1,
      part: 'outward',
      class: 'through',
      points: [{ at: P(2500, 6000), pin: 'gate', pinId: 'gate:1' }, ...[5000, 7500, 10000, 12500, 15000].map((x) => ({ at: P(x, 20) })), { at: P(17500, 6000), pin: 'frame' }],
      spans: [],
      from: { kind: 'gate', id: 'gate:1' },
      to: { kind: 'bearing', bearingCdeg: 0 as Cdeg },
    };
    const r = commitRoutes([inward, outward], k, { tables: tableView(), rung: 'CITY', spacingCm: 2500 });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const shared = edgesWith(plat, 'way').filter((e) => e.rows.filter((x) => x.role === 'way').length > 1).length;
    expect(shared).toBeGreaterThan(0);
    expect(r.value.report.stretchShared).toBeGreaterThan(0);
    // The report counts the way edges two or more ways share, read from the arena (c-03 S3).
    expect(r.value.report.stretchShared).toBe(shared);
  });

  it("counts only the shares between ways: a street laid along the plaza's side next to its attach point is no braid (smallSite 5; c-03 S3)", { timeout: 60_000 }, () => {
    const run = runSite(smallSite(5));
    // The precondition (the hardening note 2): an edge carries both a way row and the plaza's reserved row.
    const plazaShared = edgesWith(run.plat, 'way').filter((e) => e.rows.some((x) => x.role === 'reserved'));
    expect(plazaShared.length).toBeGreaterThan(0);
    // The kernel warns of that stretch, but no edge carries two ways' rows: no braid, the count 0.
    expect(edgesWith(run.plat, 'way').filter((e) => e.rows.filter((x) => x.role === 'way').length > 1)).toHaveLength(0);
    expect(run.s4.report.stretchShared).toBe(0);
  });
});

// A three-arm junction at (0, 0): the through pair west–east, a branch θ from the east arm. The branch's first point
// lies 10 m out and its gate 20 m out, so an acute branch cannot be bent within primary's 40 m radius (it stays as
// laid) and the kind is read from the arms as committed.
function branchAt(thetaDeg: number): S4Route[] {
  const c = Math.cos((thetaDeg * Math.PI) / 180);
  const s = Math.sin((thetaDeg * Math.PI) / 180);
  const pt = (x: number, y: number, pin?: RoutePoint['pin'], pinId?: string): RoutePoint => ({ at: P(Math.round(x), Math.round(y)), ...(pin === undefined ? {} : { pin, pinId }) });
  const through: S4Route = { id: 'gate:a/in', order: 0, part: 'inward', class: 'primary', points: [pt(-20000, 0, 'attach', 'plaza:0'), pt(-10000, 0), pt(0, 0), pt(10000, 0), pt(20000, 0, 'gate', 'gate:a')], spans: [], from: { kind: 'plaza', id: 'plaza:0' }, to: { kind: 'gate', id: 'gate:a' } };
  const branch: S4Route = { id: 'gate:b/in', order: 1, part: 'inward', class: 'primary', points: [pt(-20000, 0, 'attach', 'plaza:0'), pt(-10000, 0), pt(0, 0), pt(1000 * c, 1000 * s), pt(2000 * c, 2000 * s, 'gate', 'gate:b')], spans: [], from: { kind: 'plaza', id: 'plaza:0' }, to: { kind: 'gate', id: 'gate:b' } };
  return [through, branch];
}

function kindAtOrigin(routes: readonly S4Route[], kernel?: (k: Kernel) => Kernel): string {
  const site = smallSite(1);
  const { k } = kernelFor(site);
  expect(commitOuterRing(site, k).ok).toBe(true);
  const r = commitRoutes(routes, kernel === undefined ? k : kernel(k), { tables: tableView(), rung: 'CITY', spacingCm: 2500 });
  expect(r.ok).toBe(true);
  if (!r.ok) return '';
  // The one three-arm junction is the origin's (every other chain end is an attach point or a gate).
  const kinds = r.value.network.junctions.map((j) => j.kind).filter((x) => x === 'T' || x === 'Y');
  expect(kinds).toHaveLength(1);
  return kinds[0];
}

describe("the T band's edges (C-0236 (11), C-0239; the hardening note 9)", () => {
  it('a branch 74° or 106° off the through line is a Y; 76° or 104° a T (the band 75°–105°, inclusive)', { timeout: 60_000 }, () => {
    expect([74, 76, 104, 106].map((t) => kindAtOrigin(branchAt(t)))).toEqual(['Y', 'T', 'T', 'Y']);
  });
});

describe('junction kinds after the fallback to the lattice courses (the hardening note 12; c-03 S3)', () => {
  // A branch 45° off the east arm, long enough to bend: the Y → T rule bends it perpendicular on the smoothed course.
  const routes = (): S4Route[] => {
    const pt = (x: number, y: number, pin?: RoutePoint['pin'], pinId?: string): RoutePoint => ({ at: P(x, y), ...(pin === undefined ? {} : { pin, pinId }) });
    return [
      { id: 'gate:a/in', order: 0, part: 'inward', class: 'primary', points: [pt(-20000, 0, 'attach', 'plaza:0'), pt(-10000, 0), pt(0, 0), pt(10000, 0), pt(20000, 0, 'gate', 'gate:a')], spans: [], from: { kind: 'plaza', id: 'plaza:0' }, to: { kind: 'gate', id: 'gate:a' } },
      { id: 'gate:b/in', order: 1, part: 'inward', class: 'primary', points: [pt(-20000, 0, 'attach', 'plaza:0'), pt(-10000, 0), pt(0, 0), pt(5000, 5000), pt(10000, 10000), pt(15000, 15000, 'gate', 'gate:b')], spans: [], from: { kind: 'plaza', id: 'plaza:0' }, to: { kind: 'gate', id: 'gate:b' } },
    ];
  };
  it('the smoothed batch committed: the bent branch makes a T', { timeout: 60_000 }, () => {
    expect(kindAtOrigin(routes())).toBe('T');
  });
  it("the smoothed batch refused and the lattice courses committed: the kind is the lattice arms' — a Y", { timeout: 60_000 }, () => {
    let calls = 0;
    const planted = (k: Kernel): Kernel => ({ ...k, tx: ((t: KernelTx, fn?: never) => (t.stage === STAGES.S4 && calls++ === 0 ? err('E_INVARIANT', 'planted: the smoothed batch refused') : k.tx(t, fn))) as Kernel['tx'] });
    expect(kindAtOrigin(routes(), planted)).toBe('Y');
    expect(calls).toBe(2);
  });
});

describe("a way's class and its knots where its first chain is not its highest (the hardening note 10; C-0236 (10))", () => {
  it('a primary run of two chains, then a through chain: the way is through, its one knot pair on the vertex the class changes at', { timeout: 60_000 }, () => {
    const pt = (x: number, y: number, pin?: RoutePoint['pin'], pinId?: string): RoutePoint => ({ at: P(x, y), ...(pin === undefined ? {} : { pin, pinId }) });
    // r1 runs A1 → X → J → G; r3 crosses it at X (a junction), r2 (a through part) joins it at J and shares J → G.
    const r1: S4Route = { id: 'gate:a/in', order: 0, part: 'inward', class: 'primary', points: [pt(0, 0, 'attach', 'plaza:0'), pt(2500, 0), pt(5000, 0), pt(7500, 0), pt(10000, 0), pt(12500, 0), pt(15000, 0, 'gate', 'gate:a')], spans: [], from: { kind: 'plaza', id: 'plaza:0' }, to: { kind: 'gate', id: 'gate:a' } };
    const r2: S4Route = { id: 'gate:b/in', order: 1, part: 'inward', class: 'through', points: [pt(10000, -10000, 'attach', 'plaza:0'), pt(10000, -5000), pt(10000, 0), pt(12500, 0), pt(15000, 0, 'gate', 'gate:a')], spans: [], from: { kind: 'plaza', id: 'plaza:0' }, to: { kind: 'gate', id: 'gate:a' } };
    const r3: S4Route = { id: 'gate:c/in', order: 2, part: 'inward', class: 'primary', points: [pt(5000, -10000, 'attach', 'plaza:0'), pt(5000, -5000), pt(5000, 0), pt(5000, 5000), pt(5000, 10000, 'gate', 'gate:c')], spans: [], from: { kind: 'plaza', id: 'plaza:0' }, to: { kind: 'gate', id: 'gate:c' } };
    const site = smallSite(1);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const r = commitRoutes([r1, r2, r3], k, { tables: tableView(), rung: 'CITY', spacingCm: 2500 });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const way = r.value.network.ways[0];
    expect(way.id).toBe('way:0');
    // Its chains in way order: two primary, then through (the precondition).
    const mine = r.value.chainWay.map((id, i) => ({ id, i })).filter((x) => x.id === 'way:0').map((x) => r.value.classes[x.i].class);
    expect(mine.slice().sort()).toEqual(['primary', 'primary', 'through']);
    expect(way.class).toBe('through');
    expect(typeof way.width).not.toBe('number');
    const band = (c: string): number => tableView().table('ways').pair(c, 'widthM.CITY')[0] * 100;
    expect(way.width).toEqual({ knotRole: 'width_knot', values: [band('primary'), widthOf(r.value, 'through')], interp: 'linear' });
    expect(verticesWith(plat, 'width_knot', 'way:0', 0)).toEqual([P(10000, 0)]);
    expect(verticesWith(plat, 'width_knot', 'way:0', 1)).toEqual([P(10000, 0)]);
  });
});

/** The width of the widest chain of a class in a commit. */
function widthOf(r: { classes: readonly { class: string; widthCm: number }[] }, c: string): number {
  return Math.max(...r.classes.filter((x) => x.class === c).map((x) => x.widthCm));
}

describe("a route part's spur is cut before the graph: the way stays one simple chain (Q52 A, R-35; c-03 S3)", () => {
  // The attach point (2 000, 0) on the plaza's south side; the part's first lattice node lies 9 m beyond it, and the
  // edge back west passes 23 cm below the attach point — §3.6's attraction would route it through the attach point and
  // the way would branch there (the class of the 4 x-06 seeds on the plaza end, x-06-notes 'Fix round 2').
  const plaza = [P(0, 0), P(4000, 0), P(4000, 4000), P(0, 4000)];
  const spur: S4Route = {
    id: 'gate:a/in',
    order: 0,
    part: 'inward',
    class: 'primary',
    points: [{ at: P(2000, 0), pin: 'attach', pinId: 'plaza:0' }, { at: P(2900, -25) }, { at: P(-2100, -15) }, { at: P(-2100, -10000) }, { at: P(-2100, -20000), pin: 'gate', pinId: 'gate:a' }],
    spans: [],
    from: { kind: 'plaza', id: 'plaza:0' },
    to: { kind: 'gate', id: 'gate:a' },
  };
  it('commits, the spur point gone, the way one open path from the attach point', { timeout: 60_000 }, () => {
    const site = smallSite(1);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const r = commitRoutes([spur], k, { tables: tableView(), rung: 'CITY', spacingCm: 2500, plaza });
    expect(r.ok, r.ok ? '' : r.detail).toBe(true);
    if (!r.ok) return;
    expect(r.value.graph.routes[0].points.map((p) => p.at)).toEqual([P(2000, 0), P(-2100, -15), P(-2100, -10000), P(-2100, -20000)]);
    const line = wayLine(wayEdges(plat).get('way:0') ?? []);
    expect([line[0], line[line.length - 1]]).toContainEqual(P(2000, 0));
  });
});
