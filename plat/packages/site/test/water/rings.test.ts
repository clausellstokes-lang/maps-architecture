// The hardening round S3's pins on the water rings (checks/M0-e-03-notes.md N-c1-3 – N-c1-6, N-c1-8, N-c1-9; notes 12 and
// Q45's inlet): the fast ring's round caps and its refusal of a sub-centimetre step; the fast ring's own proofs over
// every ring — a fold within RING_CLEAR_CM of itself, a hole meeting an earlier body — and the order of its tests (the
// arena's edge before the proofs); its refusal texts, each with its label (`offset: …`, `mouth: …`); the kernel ring's
// proofs in their order (simple first) and its holes kept; the fixed rule's 2 cm band and the estuary cut's two bank
// points; a course leaving the arena at a grazing angle ending past the edge. Each fixture is hand-built and its
// expectation stated on its own terms: a point, a text, a count — never read from the code under test.
import type { LatticePoint } from '@plat/kernel';
import type { WaterBody } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { offsetRing } from '../../src/water/offset.js';
import { chainOf, fastRings, provedRings, simplifyChain } from '../../src/water/polygons.js';
import { waterPolygons } from '../../src/water/index.js';
import { pt, SMALL_ARENA, waterBody } from './support.js';

/** A 1 000 m × 600 m arena (frame 500 m × 300 m, margin ½): its reach is (50 000, 30 000) cm. */
const { REACH } = SMALL_ARENA;

/** A river on `[x, y]` course pairs, one width for all. */
function river(course: [number, number][], width: number, extra: Partial<WaterBody> = {}): WaterBody {
  return waterBody('water:river:0', 'river', course.map(([x, y]) => pt(x, y)), width, extra);
}

/** The fast ring of a lone body (no earlier body unless `covered` is given), as the polygons build it. */
function fast(b: WaterBody, covered: LatticePoint[][] = [], bodies: readonly WaterBody[] = [b]): LatticePoint[][] | string {
  const chain = chainOf(b, REACH, []);
  if (chain === null) throw new Error('no chain');
  return fastRings(b, simplifyChain(chain.pts, chain.half), chain, bodies, REACH, covered);
}

/** A U: east along y = y0 for 200 m, 10.4 m north, back west — 10 m wide, so its two arms' inner banks run 40 cm apart. */
function u(y0: number): [number, number][] {
  return [
    [-10_000, y0],
    [10_000, y0],
    [10_000, y0 + 1040],
    [-10_000, y0 + 1040],
  ];
}

/** A keyhole: east along y = 0, up a 12 m neck into a diamond loop 160 m tall and back down, then east — 10 m wide. */
const KEYHOLE: [number, number][] = [
  [-30_000, 0],
  [-600, 0],
  [-600, 1000],
  [-8000, 9000],
  [0, 17_000],
  [8000, 9000],
  [600, 1000],
  [600, 0],
  [30_000, 0],
];

describe('the fast ring\'s construction (N-c1-3)', () => {
  it('a round cap is a half-turn at the half-width about the chain\'s end: its vertices at 5 m from the end point, the tip straight on among them', () => {
    const r = offsetRing([pt(0, 0), pt(10_000, 0)], [500, 500], ['round', 'round']);
    if ('refused' in r) throw new Error(r.refused);
    const beyond = r.ring.filter((q) => q.x > 10_000 + 1e-6);
    const before = r.ring.filter((q) => q.x < -1e-6);
    // 11 chords' inner vertices per cap (12 per half-turn), each 5 m from its end point
    expect(beyond).toHaveLength(11);
    expect(before).toHaveLength(11);
    for (const q of beyond) expect(Math.abs(Math.hypot(q.x - 10_000, q.y) - 500)).toBeLessThan(1e-6);
    for (const q of before) expect(Math.abs(Math.hypot(q.x, q.y) - 500)).toBeLessThan(1e-6);
    // the half-turn: the tip 5 m straight on, and the cap reaching within 15° of each side
    expect(beyond.some((q) => Math.abs(q.x - 10_500) < 1e-6 && Math.abs(q.y) < 1e-6)).toBe(true);
    expect(before.some((q) => Math.abs(q.x + 500) < 1e-6 && Math.abs(q.y) < 1e-6)).toBe(true);
    expect(Math.max(...beyond.map((q) => q.y))).toBeGreaterThan(500 * Math.cos(Math.PI / 12) - 1e-6);
    expect(Math.min(...beyond.map((q) => q.y))).toBeLessThan(-500 * Math.cos(Math.PI / 12) + 1e-6);
  });

  it('a step under a centimetre, or a repeated point, is refused `a repeated point`: no direction is read from it', () => {
    expect(offsetRing([pt(0, 0), pt(0, 0), pt(10_000, 0)], [500, 500, 500], ['round', 'round'])).toEqual({ refused: 'a repeated point' });
    expect(offsetRing([{ x: 0, y: 0 }, { x: 0.5, y: 0.5 }, { x: 10_000, y: 0 }], [500, 500, 500], ['round', 'round'])).toEqual({ refused: 'a repeated point' });
  });
});

describe('the fast ring\'s proofs, over every ring, after its edge test (N-c1-4, N-c1-8)', () => {
  it('a fold within RING_CLEAR_CM of itself (a U whose arms run 40 cm apart) is refused `near-touch`', () => {
    expect(fast(river(u(0), 1000))).toBe('near-touch');
  });

  it('the same U with a bank 30 cm off the arena\'s edge is refused `near the edge` — the edge test before the proofs', () => {
    // the south arm's bank at y = −29 970: 30 cm inside the edge y = −30 000, off it
    expect(fast(river(u(-29_470), 1000))).toBe('near the edge');
  });

  it('a keyhole loop keeps its pocket as a hole, every proof passing; an earlier body across the hole\'s side (clear of the outer ring) refuses it `meets an earlier body`', () => {
    const k = fast(river(KEYHOLE, 1000));
    if (typeof k === 'string') throw new Error(k);
    expect(k).toHaveLength(2);
    // the hole: the diamond's inside, 5 m in from the course's inner side
    expect(k[1]).toContainEqual(pt(0, 16_293));
    // a 2 m square across the hole's north-west side (its midpoint (−3 653, 12 640)), 8 m and more from the outer ring
    const square = [pt(-3753, 12_540), pt(-3553, 12_540), pt(-3553, 12_740), pt(-3753, 12_740)];
    expect(fast(river(KEYHOLE, 1000), [square])).toBe('meets an earlier body');
  });
});

describe('the fast ring\'s refusal texts, each with its label (N-c1-6)', () => {
  it('a meander whose pocket holds a pocket: `offset: a pocket inside a pocket` (the offset line\'s refusal, the inner line\'s text kept)', () => {
    // an Ω whose 6 m neck is under the river's 10 m width: the neck's inner lines cross inside the bulb's pocket
    const omega: [number, number][] = [[-30_000, 0], [-300, 0], [-300, 3000], [-8000, 6000], [-8000, 18_000], [8000, 18_000], [8000, 6000], [300, 3000], [300, 0], [30_000, 0]];
    const b = river(omega, 1000);
    expect(offsetRing(b.course ?? [], [...(b.widthProfile ?? [])].map((w) => w * 0.5), ['round', 'round'])).toEqual({ refused: 'a pocket inside a pocket' });
    expect(fast(b)).toBe('offset: a pocket inside a pocket');
  });

  it('a joined tributary whose offset lines cross no earlier ring: `mouth: no mouth`', () => {
    const trib = waterBody('water:tributary:0', 'tributary', [pt(0, 20_000), pt(0, 5000)], 600, { flowTo: 'water:river:0' });
    const chain = chainOf(trib, REACH, [river([[-40_000, 0], [40_000, 0]], 2000)]);
    if (chain === null) throw new Error('no chain');
    expect(chain.joined).toBe(true);
    expect(fastRings(trib, simplifyChain(chain.pts, chain.half), chain, [trib], REACH, [])).toBe('mouth: no mouth');
  });
});

describe('the kernel ring\'s proofs and the fixed rule (N-c1-4, N-c1-5, N-c1-8, N-c1-9; note 12)', () => {
  it('a ring both not simple and near-touch is refused `not clear (not simple)`: simplicity is proved first', () => {
    // a ring crossing itself (the side (2 000, 2 000) → (2 000, 40) crosses (2 040, −1 000) … (1 000, 1 000)'s run) with a
    // 40 cm slot between (2 000, 40) and (2 040, 40)'s neighbours: no vertex the clean may drop
    const ring = [pt(0, 0), pt(4000, 0), pt(4000, 2000), pt(2000, 2000), pt(2000, 40), pt(2040, 40), pt(2040, -1000), pt(1000, -1000), pt(1000, 1000), pt(0, 1000)];
    expect(provedRings([ring], REACH, [])).toBe('not clear (not simple)');
  });

  it('a hole the clean keeps stays a ring of the result, after the outer ring', () => {
    const outer = [pt(0, 0), pt(10_000, 0), pt(10_000, 10_000), pt(0, 10_000)];
    const hole = [pt(3000, 3000), pt(3000, 7000), pt(7000, 7000), pt(7000, 3000)];
    expect(provedRings([outer, hole], REACH, [])).toEqual([outer, hole]);
  });

  it('the fixed band is 2 cm: a vertex 2 cm off an earlier body\'s ring, 28 cm after the vertex before it, is kept; one 3 cm off is dropped', () => {
    const earlier = [pt(0, -3000), pt(3000, -3000), pt(3000, 3000), pt(0, 3000)];
    const at2 = [pt(-5000, -1000), pt(-15, -1025), pt(-2, -1000), pt(0, 1000), pt(-5000, 1000)];
    expect(provedRings([at2], REACH, [earlier])).toEqual([at2]);
    const at3 = [pt(-5000, -1000), pt(-15, -1025), pt(-3, -1000), pt(0, 1000), pt(-5000, 1000)];
    expect(provedRings([at3], REACH, [earlier])).toEqual([[at3[0], at3[1], at3[3], at3[4]]]);
  });

  it('the estuary cut\'s two bank points stay through the clean where it would drop them (a needle under 30° at a skewed cut)', () => {
    // the river's last reach turns 63° into its estuary: the flat end, on the original segment's normal, meets each bank
    // line at under 30° on one side
    const r = river([[-20_000, 0], [0, 0]], 2000, { flowTo: 'water:estuary:0' });
    const est = waterBody('water:estuary:0', 'estuary', [pt(0, 0), pt(500, 40_000)], 2000, { flowFrom: 'water:river:0' });
    const ring = fast(r, [], [r, est]);
    if (typeof ring === 'string') throw new Error(ring);
    const len = Math.hypot(20_500, 40_000);
    const n = { x: -40_000 / len, y: 20_500 / len };
    for (const s of [1, -1]) expect(ring[0]).toContainEqual(pt(Math.round(s * n.x * 1000), Math.round(s * n.y * 1000)));
  });
});

describe('Q45: a course leaving the arena at a grazing angle ends past the edge — the clip, never a cut, shapes its end', () => {
  it('a 20 m river entering 5.7° off the west edge: its fast ring stands, and every vertex off the edge keeps the half-width from it', () => {
    // in at (−500 m, 0), its first step 2 m east for 20 m north; then east across the arena
    const b = river([[-50_000, 0], [-49_800, 2000], [-40_000, 3000], [50_000, 3000]], 2000);
    const p = waterPolygons([b], REACH);
    if (!p.ok) throw new Error(p.detail);
    expect(p.value.fallbacks).toEqual([]);
    const ring = p.value.reaches[0].parts[0].rings[0];
    const off = ring.filter((q) => Math.abs(q.x) !== REACH.x && Math.abs(q.y) !== REACH.y);
    for (const q of off) expect(Math.min(REACH.x - Math.abs(q.x), REACH.y - Math.abs(q.y))).toBeGreaterThanOrEqual(990);
  });
});
