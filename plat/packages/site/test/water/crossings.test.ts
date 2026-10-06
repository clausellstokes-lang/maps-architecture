// M0-e-03's siteCrossings (§4.2 S1 (5): "The narrowest and shallowest reaches within the search band … become crossing
// sites, typed `ford` (width < table) or `bridge_site`, with a minimum spacing (FTG's 40 m as the default). Each site is
// a pinned deck: a bank-to-bank segment perpendicular to the local flow (the course tangent averaged over one channel
// width upstream and downstream)"; C-0229 (5)) on hand-built reaches — rectangles and bends whose banks are known.
import type { LatticePoint } from '@plat/kernel';
import type { Cm, CmArray, WaterBody } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { DECK_CLEARANCE_CM, segSeg2, siteCrossings, type CrossingSite, type WaterReach } from '../../src/water/index.js';
import { TABLES } from './support.js';
import { waterParams } from '../../src/water/index.js';

const REACH = { x: 100_000, y: 50_000 };
const P = waterParams(TABLES);
const OPTS = { reach: REACH, minSpacingCm: P.minSpacingCm, fordMaxWidthCm: P.fordMaxWidthCm };

function lp(x: number, y: number): LatticePoint {
  return { x: Math.round(x) as Cm, y: Math.round(y) as Cm };
}

function body(id: string, course: LatticePoint[], widths: number[]): WaterBody {
  return {
    id,
    kind: 'river',
    face: { owner: id, level: 0 },
    shore: { role: 'shore', entity: id },
    course,
    widthProfile: Int32Array.from(widths) as CmArray,
    lifecycle: { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } },
  };
}

/** A straight river along y = 0 from x0 to x1, a course vertex every 10 m, its polygon the given ring (default the rectangle of `width`). */
function straight(width: number, x0 = -100_000, x1 = 100_000, ring?: LatticePoint[]): WaterReach {
  const course: LatticePoint[] = [];
  for (let x = x0; x <= x1; x += 1000) course.push(lp(x, 0));
  const h = width / 2;
  return { body: body('water:river:0', course, course.map(() => width)), parts: [{ rings: [ring ?? [lp(x0, -h), lp(x1, -h), lp(x1, h), lp(x0, h)]], seeds: [lp(0, 0)] }] };
}

function deckLen(s: CrossingSite): number {
  return Math.hypot(s.deck[1].x - s.deck[0].x, s.deck[1].y - s.deck[0].y);
}

/** The angle (degrees, 0 – 90) between the deck and the normal of the flow. */
function offNormalDeg(s: CrossingSite): number {
  const dx = s.deck[1].x - s.deck[0].x;
  const dy = s.deck[1].y - s.deck[0].y;
  const along = Math.abs(dx * s.flow.x + dy * s.flow.y) / Math.hypot(dx, dy);
  return (Math.asin(Math.min(1, along)) * 180) / Math.PI;
}

describe('§4.2 S1 (5): siteCrossings', () => {
  it('the table cells it reads: the 300 m band, the 40 m spacing, fords below 10 m', () => {
    expect([P.searchBandCm, P.minSpacingCm, P.fordMaxWidthCm, P.outfallStretchCm]).toEqual([30_000, 4000, 1000, 5000]);
  });

  it('a straight 20 m river: one bridge_site per 300 m window clear of the ring, mid-window on a uniform reach, each deck bank-to-bank and perpendicular', () => {
    const sites = siteCrossings([straight(2000)], 300, [], OPTS);
    // windows of 300 m from the course's first point (x = −1 000 m): the deck ends must keep 10 m from the ring
    expect(sites.length).toBeGreaterThanOrEqual(6);
    for (const s of sites) {
      expect(s.type).toBe('bridge_site');
      expect(s.spanCm).toBe(2000);
      expect(s.deck[0].y).toBe(1000); // end 0: the left bank looking downstream (east): north
      expect(s.deck[1].y).toBe(-1000);
      expect(s.deck[0].x).toBe(s.deck[1].x);
      expect(offNormalDeg(s)).toBeLessThanOrEqual(10);
      expect(Math.abs(s.deck[0].x)).toBeLessThanOrEqual(REACH.x - DECK_CLEARANCE_CM);
      // a uniform window offers every vertex at one span: the one nearest the window's middle wins
      const w = Math.floor(s.arcCm / 30_000);
      expect(Math.abs(s.arcCm - (w + 0.5) * 30_000)).toBeLessThanOrEqual(500);
    }
    // ≥ 40 m between any two decks
    for (let i = 0; i < sites.length; i += 1) for (let j = i + 1; j < sites.length; j += 1) expect(Math.sqrt(segSeg2(sites[i].deck[0], sites[i].deck[1], sites[j].deck[0], sites[j].deck[1]))).toBeGreaterThanOrEqual(4000);
    // course order
    expect(sites.map((s) => s.arcCm)).toEqual([...sites.map((s) => s.arcCm)].sort((a, b) => a - b));
  });

  it('the narrowest point of a window wins: a neck at x = 120 m becomes the site of its window', () => {
    // a 30 m river with a 16 m neck between x = 115 m and 125 m (its banks pinched in)
    const ring = [lp(-100_000, -1500), lp(11_500, -1500), lp(12_000, -800), lp(12_500, -1500), lp(100_000, -1500), lp(100_000, 1500), lp(12_500, 1500), lp(12_000, 800), lp(11_500, 1500), lp(-100_000, 1500)];
    const sites = siteCrossings([straight(3000, -100_000, 100_000, ring)], 300, [], OPTS);
    const neck = sites.find((s) => s.arcCm >= 90_000 && s.arcCm < 120_000 + 30_000 && Math.floor(s.arcCm / 30_000) === Math.floor(112_000 / 30_000));
    expect(neck).toBeDefined();
    expect(neck?.at.x).toBe(12_000);
    expect(neck?.spanCm).toBe(1600);
    // every other site spans the full 30 m
    for (const s of sites) if (s !== neck) expect(s.spanCm).toBe(3000);
  });

  it('a ford below crossing.fordMaxWidthM (an 8 m reach), a bridge_site at and above it (a 10 m reach)', () => {
    expect(siteCrossings([straight(800)], 300, [], OPTS).every((s) => s.type === 'ford' && s.spanCm === 800)).toBe(true);
    expect(siteCrossings([straight(1000)], 300, [], OPTS).every((s) => s.type === 'bridge_site')).toBe(true);
  });

  it('the spacing holds against existing decks and between sites: a deck standing at a window\'s middle pushes that window\'s site 40 m off', () => {
    const base = siteCrossings([straight(2000)], 300, [], OPTS);
    const mid = base[2];
    const existing: [LatticePoint, LatticePoint] = [lp(mid.deck[0].x, 1000), lp(mid.deck[0].x, -1000)];
    const sites = siteCrossings([straight(2000)], 300, [existing], OPTS);
    for (const s of sites) expect(Math.abs(s.deck[0].x - existing[0].x)).toBeGreaterThanOrEqual(4000);
    expect(sites.some((s) => Math.floor(s.arcCm / 30_000) === Math.floor(mid.arcCm / 30_000))).toBe(true);
    // a 400 m spacing thins the sites: every pair keeps it
    const wide = siteCrossings([straight(2000)], 300, [], { ...OPTS, minSpacingCm: 40_000 });
    expect(wide.length).toBeLessThan(base.length);
    for (let i = 0; i + 1 < wide.length; i += 1) expect(wide[i + 1].deck[0].x - wide[i].deck[0].x).toBeGreaterThanOrEqual(40_000);
    // the band is read: a 150 m band gives more windows, so more sites
    expect(siteCrossings([straight(2000)], 150, [], OPTS).length).toBeGreaterThan(base.length);
  });

  it('a deck end keeps DECK_CLEARANCE_CM from another body\'s polygon and from the outer ring', () => {
    const river = straight(2000);
    // a second body crossing the river's banks at x ∈ [−30, 30] m: no deck end within 10 m of it
    const other: WaterReach = { body: body('water:tributary:0', [lp(0, 30_000), lp(0, 1000)], [6000, 6000]), parts: [{ rings: [[lp(-3000, 1000), lp(3000, 1000), lp(3000, 30_000), lp(-3000, 30_000)]], seeds: [lp(0, 10_000)] }] };
    const sites = siteCrossings([river, other], 300, [], OPTS);
    for (const s of sites.filter((q) => q.water === 'water:river:0')) {
      for (const e of s.deck) expect(Math.abs(e.x) >= 3000 + DECK_CLEARANCE_CM || e.y < 0).toBe(true);
    }
    // a reach hugging the ring (its banks 5 m from it) has no site
    const hug = straight(2000, -100_000, 100_000, [lp(-100_000, 47_500 - 1000), lp(100_000, 47_500 - 1000), lp(100_000, 49_500), lp(-100_000, 49_500)]);
    hug.body.course = hug.body.course?.map((q) => lp(q.x, 48_500));
    expect(siteCrossings([hug], 300, [], OPTS)).toEqual([]);
  });

  it('on a bend the deck stays perpendicular to the flow averaged over one channel width (within ±10°), and both ends lie on the outer ring of the part', () => {
    // a quarter circle of radius 400 m, 20 m wide
    const course: LatticePoint[] = [];
    for (let a = 0; a <= 90; a += 1) course.push(lp(-40_000 + 40_000 * Math.cos((a * Math.PI) / 180), -40_000 + 40_000 * Math.sin((a * Math.PI) / 180)));
    const outer: LatticePoint[] = [];
    const inner: LatticePoint[] = [];
    for (let a = 0; a <= 90; a += 1) {
      const c = Math.cos((a * Math.PI) / 180);
      const s = Math.sin((a * Math.PI) / 180);
      outer.push(lp(-40_000 + 41_000 * c, -40_000 + 41_000 * s));
      inner.push(lp(-40_000 + 39_000 * c, -40_000 + 39_000 * s));
    }
    const ring = [...outer, ...inner.reverse()];
    const reach: WaterReach = { body: body('water:river:0', course, course.map(() => 2000)), parts: [{ rings: [ring], seeds: [course[45]] }] };
    const sites = siteCrossings([reach], 300, [], OPTS);
    expect(sites.length).toBeGreaterThanOrEqual(2);
    for (const s of sites) {
      expect(offNormalDeg(s)).toBeLessThanOrEqual(10);
      expect(deckLen(s)).toBeGreaterThan(1900);
      expect(deckLen(s)).toBeLessThan(2100);
      expect(s.ends[0].ring).toBe(0);
      expect(s.ends[1].ring).toBe(0);
    }
  });

  it('an island: a ray meeting the hole\'s ring before the bank gives no deck there', () => {
    // a 60 m river with a 20 m island along x ∈ [−50, 50] m
    const river = straight(6000);
    river.parts[0].rings.push([lp(-5000, -1000), lp(-5000, 1000), lp(5000, 1000), lp(5000, -1000)]);
    river.body.course = river.body.course?.map((q) => (Math.abs(q.x) <= 6000 ? lp(q.x, 2000) : q));
    const sites = siteCrossings([river], 300, [], OPTS);
    for (const s of sites) for (const e of s.deck) expect(Math.abs(e.y)).toBe(3000);
  });
});
