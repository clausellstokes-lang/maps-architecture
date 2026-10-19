// M0-c-06: the stop kerb's drift clause read by N-57 (4) (C-0331) — the one-sided distance stop → working and the sliver
// width of working ∖ stop, each within N-52 (1)'s 2 · √2 · attractCm, the Hausdorff distance reported with the needle's
// length; a split block's children against the parent's kerb at the cut less the spine's band; and the S8 ≡ S9 reading's
// boundaries loop by loop (a hole touching the outer ring at a vertex), on the smoke's own blocks and synthetic ones.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  bandPolygon,
  blockDrift,
  boundaryLoops,
  compareBoundaries,
  compareRings,
  cutRegion,
  derive,
  differing,
  directed,
  inRing,
  loopsOf,
  needleCm,
  ringEdges,
  ringRegion,
  S8S9_BOUND_CM,
  S8S9_BOUND_SQ,
  s8s9,
  sliver,
  unionRegion,
  type LaneBand,
  type Seg,
} from '../../src/fusion/index.js';
import { TEST_SIZE } from './support.js';

type Pt = { x: number; y: number };
interface Fixture {
  readonly stop: Pt[];
  readonly working: Pt[][];
  readonly seeds: Pt[];
  readonly s9: Pt[][];
  readonly spines: { way: string; line: Pt[]; hw: number }[];
}

/** The smoke's drifted blocks (fusion 49 and 30 at CITY, read on this tree by the mirror's probe; C-0331 (6)). */
const FIX = JSON.parse(readFileSync(new URL('./drift-fixtures.json', import.meta.url), 'utf8')) as Record<string, Fixture>;
const R = S8S9_BOUND_CM;

function bandsOf(f: Fixture): LaneBand[] {
  return f.spines.map((s) => {
    const xs = s.line.map((q) => q.x);
    const ys = s.line.map((q) => q.y);
    return { way: s.way as never, band: { line: s.line, hw: s.hw }, box: { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) } };
  });
}

const rect = (x0: number, y0: number, x1: number, y1: number): Pt[] => [
  { x: x0, y: y0 },
  { x: x1, y: y0 },
  { x: x1, y: y1 },
  { x: x0, y: y1 },
];

describe('the drift clause on the smoke’s drifted blocks (N-57 (4))', () => {
  it('fusion 49 block:63rwxr8gm4j28 — a 0.8° needle of the working block: Hausdorff 1 593 cm (the old clause’s red), every stop vertex on the working ring; the slivers within the bound', () => {
    const f = FIX['fusion 49 block:63rwxr8gm4j28'];
    const w = f.working[0];
    // The old reading: the Hausdorff distance, metres beyond the bound.
    expect(compareRings(f.stop, w, S8S9_BOUND_SQ)).toEqual({ cm: expect.closeTo(1593.16, 1) as number, within: false });
    const d = blockDrift(f.stop, [w], []);
    expect(d.spines).toEqual([]);
    const row = d.rows[0];
    expect(row.within).toBe(true);
    // N-57 (4) (i), reported: the stop kerb's tip chord across the needle, 18.4 cm from the working ring (its vertices 0.26).
    expect(row.oneSidedCm).toBeCloseTo(18.38, 1);
    expect(row.sliverCm).toBeGreaterThan(5);
    expect(row.sliverCm).toBeLessThanOrEqual(R);
    expect(row.hausdorffCm).toBeCloseTo(1593.16, 1);
    // The needle: about 15.9 m of the working ring on each side of the tip beyond the bound from the stop kerb.
    expect(row.needleCm).toBeGreaterThan(2 * 1400);
    expect(row.needleCm).toBeLessThan(2 * 1600);
    expect(row.drifted).toBe(true);
  });

  it('fusion 30 block:8ern91wcr4p11 and fusion 49 block:dnzm4ncd3tdyf — the needle is the STOP kerb’s (its tip 199.6 / 74.0 cm past the working ring): the slivers within, the one-sided distance stop → working beyond (reported, C-0331 (1))', () => {
    for (const [key, haus] of [
      ['fusion 49 block:dnzm4ncd3tdyf', 73.98],
      ['fusion 30 block:8ern91wcr4p11', 199.61],
    ] as const) {
      const f = FIX[key];
      expect(compareRings(f.stop, f.working[0], S8S9_BOUND_SQ).within, key).toBe(false);
      const row = blockDrift(f.stop, [f.working[0]], []).rows[0];
      expect({ key, within: row.within }).toEqual({ key, within: true });
      expect(row.oneSidedCm, key).toBeCloseTo(haus, 1);
      expect(row.oneSidedCm, key).toBeGreaterThan(R);
      expect(row.sliverCm, key).toBeGreaterThan(1);
      expect(row.sliverCm, key).toBeLessThanOrEqual(R);
      expect(row.hausdorffCm, key).toBeCloseTo(haus, 1);
      // The needle: the stop kerb's tip beyond the bound (at dnzm only 0.44 cm of it, under the 10 cm sampling).
      if (haus > 100) expect(row.needleCm, key).toBeGreaterThan(100);
    }
  });

  it('fusion 30 block:6eppwwjg267pw — a through alley’s split: each child against the parent’s kerb less the spine’s band, within; the parent whole is beyond', () => {
    const f = FIX['fusion 30 block:6eppwwjg267pw'];
    expect(f.working).toHaveLength(2);
    expect(f.spines.map((s) => s.way)).toEqual(['way:58xxd0cdnemv9']);
    const d = blockDrift(f.stop, f.working, bandsOf(f));
    expect(d.spines).toEqual(['way:58xxd0cdnemv9']);
    for (const row of d.rows) {
      expect(row.within).toBe(true);
      expect(row.oneSidedCm).toBeLessThanOrEqual(R);
      expect(row.sliverCm).toBeLessThanOrEqual(R);
    }
    // Without the spine's band the parent's kerb crosses the alley 100 cm from either child: the one-sided bound fails.
    const bare = blockDrift(f.stop, f.working, []);
    expect(bare.rows.every((r) => !r.within)).toBe(true);
    expect(bare.rows[0].oneSidedCm).toBeGreaterThan(R);
    // And each child against the parent's kerb read whole would never see the other child: beyond as well.
    expect(blockDrift(f.stop, [f.working[0]], bandsOf(f)).rows[0].within).toBe(false);
  });
});

describe('the drift clause on synthetic blocks', () => {
  const stop = rect(0, 0, 4_000, 2_000);

  it('the same ring: 0 on every distance, not drifted', () => {
    const row = blockDrift(stop, [stop], []).rows[0];
    expect(row).toEqual({ oneSidedCm: 0, sliverCm: 0, within: true, hausdorffCm: 0, needleCm: 0, drifted: false });
  });

  it('a planted 1 m parallel shift of a whole edge fails, outward and inward (a 1 m wide sliver; the one-sided distance 1 m)', () => {
    const out = rect(0, 0, 4_100, 2_000);
    const o = blockDrift(stop, [out], []).rows[0];
    expect(o.within).toBe(false);
    expect(o.oneSidedCm).toBeCloseTo(100, 1);
    expect(o.sliverCm).toBeGreaterThan(R);
    expect(o.sliverCm).toBeLessThanOrEqual(100);
    expect(o.sliverCm).toBeGreaterThan(98);
    const inward = rect(0, 0, 3_900, 2_000);
    const i = blockDrift(stop, [inward], []).rows[0];
    expect(i.within).toBe(false);
    expect(i.oneSidedCm).toBeCloseTo(100, 1);
    // Inward the strip is the stop kerb's beyond the working block: the mirror sliver, 1 m wide.
    expect(i.sliverCm).toBeGreaterThan(98);
    expect(sliver(ringRegion(inward), ringRegion(stop), R)).toEqual({ cm: 0, within: true });
    // At the bound and one centimetre past it (an edge 73 cm out holds; 75 cm out fails both).
    expect(blockDrift(stop, [rect(0, 0, 4_073, 2_000)], []).rows[0].within).toBe(true);
    const past = blockDrift(stop, [rect(0, 0, 4_075, 2_000)], []).rows[0];
    expect(past.within).toBe(false);
    expect(directed(ringEdges(stop), ringEdges(rect(0, 0, 4_075, 2_000)), R).within).toBe(false);
    expect(sliver(ringRegion(rect(0, 0, 4_075, 2_000)), ringRegion(stop), R).within).toBe(false);
    expect(sliver(ringRegion(rect(0, 0, 4_073, 2_000)), ringRegion(stop), R).within).toBe(true);
  });

  it('a 0.5° wedge: the working needle runs 30 m past the stop kerb’s tip — Hausdorff metres, one-sided 0, the sliver its tip’s width', () => {
    const half = (0.25 * Math.PI) / 180;
    const L = 11_000;
    const tip = { x: 0, y: 0 };
    const top = { x: Math.round(L * Math.cos(half)), y: Math.round(L * Math.sin(half)) };
    const bot = { x: top.x, y: -top.y };
    const working = [tip, bot, top];
    // The stop kerb ends where the two inner edges come within 26 cm of each other (attractCm).
    const cut = Math.round(13 / Math.tan(half));
    const stopW = [
      { x: cut, y: -13 },
      bot,
      top,
      { x: cut, y: 13 },
    ];
    const row = blockDrift(stopW, [working], []).rows[0];
    expect(row.hausdorffCm).toBeGreaterThan(2_900);
    expect(row.oneSidedCm).toBeLessThanOrEqual(13.01);
    expect(row.sliverCm).toBeGreaterThan(20);
    expect(row.sliverCm).toBeLessThanOrEqual(26);
    expect(row.within).toBe(true);
    expect(row.needleCm).toBeGreaterThan(2 * 2_800);
    // The mirror: the stop kerb's needle runs on past the working block's tip (fusion 30's figure) — within as well.
    const mirror = blockDrift(working, [stopW], []).rows[0];
    expect(mirror.within).toBe(true);
    expect(mirror.oneSidedCm).toBeGreaterThan(2_900);
    expect(mirror.sliverCm).toBeLessThanOrEqual(26);
    // The same wedge with the stop kerb's long edge 1 m off (a real offset, not a tip): beyond.
    const shifted = [{ x: cut, y: -13 }, bot, { x: top.x, y: top.y - 100 }, { x: cut, y: 13 }];
    expect(blockDrift(shifted, [working], []).rows[0].within).toBe(false);
  });

  it('a split block: two children inset by the spine’s half-width hold against the parent’s kerb less the band; a child shifted 1 m does not', () => {
    const spine: LaneBand = { way: 'way:spine' as never, band: { line: [{ x: 2_000, y: -500 }, { x: 2_000, y: 2_500 }], hw: 100 }, box: { x0: 2_000, y0: -500, x1: 2_000, y1: 2_500 } };
    const a = rect(0, 0, 1_900, 2_000);
    const b = rect(2_100, 0, 4_000, 2_000);
    const d = blockDrift(stop, [a, b], [spine]);
    expect(d.spines).toEqual(['way:spine']);
    for (const row of d.rows) {
      expect(row.within).toBe(true);
      expect(row.oneSidedCm).toBeLessThan(0.5);
      expect(row.sliverCm).toBe(0);
      expect(row.drifted).toBe(false);
    }
    // The children's kerbs a lattice step off the rebuilt band edges (hw 100.4: 0.4 cm): within, not drifted (beyond 1 cm only).
    const near = blockDrift(stop, [a, b], [{ ...spine, band: { ...spine.band, hw: 100.4 } }]);
    for (const row of near.rows) {
      expect(row.hausdorffCm).toBeGreaterThan(0.3);
      expect(row.hausdorffCm).toBeLessThan(0.5);
      expect(row.drifted).toBe(false);
      expect(row.within).toBe(true);
    }
    const moved = blockDrift(stop, [a, rect(2_200, 0, 4_100, 2_000)], [spine]);
    expect(moved.rows[0].within).toBe(false);
    expect(moved.rows[1].within).toBe(false);
    expect(moved.rows[1].sliverCm).toBeGreaterThan(R);
    // A lane that does not enter the stop kerb is no spine (a bounding lane runs outside it).
    const outside: LaneBand = { way: 'way:out' as never, band: { line: [{ x: -300, y: -500 }, { x: -300, y: 2_500 }], hw: 150 }, box: { x0: -300, y0: -500, x1: -300, y1: 2_500 } };
    expect(blockDrift(stop, [stop], [outside]).spines).toEqual([]);
    // A missing working ring is beyond.
    expect(blockDrift(stop, [[]], []).rows[0].within).toBe(false);
    expect(blockDrift([], [stop], []).rows[0].within).toBe(false);
  });

  it('differing: the pieces of one boundary off the other — a shared piece only when both run the same way', () => {
    const a = ringEdges(rect(0, 0, 1_000, 1_000));
    // The same square: nothing differs; its right half overlapping a longer edge, cut at that edge's vertices.
    expect(differing(a, a)).toEqual([]);
    const wide = ringEdges(rect(0, 0, 2_000, 1_000));
    const off = differing(a, wide);
    expect(off).toEqual([{ a: { x: 1_000, y: 0 }, b: { x: 1_000, y: 1_000 } }]);
    // A neighbour across x = 1 000 runs that edge the other way (its region on the other side): it differs.
    const next = ringEdges(rect(1_000, 0, 2_000, 1_000));
    expect(differing(a, next).length).toBe(4);
    expect(differing(a, next)).toContainEqual({ a: { x: 1_000, y: 0 }, b: { x: 1_000, y: 1_000 } });
    // A clockwise ring reads counter-clockwise (the region on the left of every edge).
    expect(differing(ringEdges(rect(0, 0, 1_000, 1_000).reverse()), a)).toEqual([]);
    // Two neighbours side by side: the sliver of one beyond the other is the whole of it.
    expect(sliver(ringRegion(rect(1_000, 0, 2_000, 1_000)), ringRegion(rect(0, 0, 1_000, 1_000)), R).within).toBe(false);
  });

  it('cutRegion: the parent less a band — membership and boundary', () => {
    const band = { line: [{ x: 2_000, y: -500 }, { x: 2_000, y: 2_500 }], hw: 100 };
    const r = cutRegion(stop, [band]);
    expect(r.inside({ x: 1_000, y: 1_000 })).toBe(true);
    expect(r.inside({ x: 2_050, y: 1_000 })).toBe(false);
    expect(r.inside({ x: 5_000, y: 1_000 })).toBe(false);
    // The two band edges inside the parent (2 × 2 000 cm) and the parent's edges outside the band (2 × 3 800 + 2 × 2 000).
    const len = r.edges.reduce((s, e) => s + Math.hypot(e.b.x - e.a.x, e.b.y - e.a.y), 0);
    expect(len).toBeCloseTo(4_000 + 7_600 + 4_000, 3);
    expect(cutRegion(stop, []).edges).toHaveLength(4);
    const poly = bandPolygon({ x: 0, y: 0 }, { x: 1_000, y: 0 }, 100);
    expect(inRing({ x: 500, y: 99 }, poly)).toBe(true);
    expect(inRing({ x: 500, y: 101 }, poly)).toBe(false);
    expect(inRing({ x: -95, y: 0 }, poly)).toBe(true);
    expect(inRing({ x: 1_101, y: 0 }, poly)).toBe(false);
  });

  it('directed, sliver and needle against brute force on the fixtures', () => {
    const f = FIX['fusion 30 block:8ern91wcr4p11'];
    const w = f.working[0];
    const dense = (a: Pt[], b: Pt[]) => {
      let worst = 0;
      for (const e of ringEdges(a)) {
        const n = Math.max(1, Math.ceil(Math.hypot(e.b.x - e.a.x, e.b.y - e.a.y) / 2));
        for (let s = 0; s <= n; s += 1) {
          const p = { x: e.a.x + (s / n) * (e.b.x - e.a.x), y: e.a.y + (s / n) * (e.b.y - e.a.y) };
          let best = Infinity;
          for (const g of ringEdges(b)) {
            const dx = g.b.x - g.a.x;
            const dy = g.b.y - g.a.y;
            const L2 = dx * dx + dy * dy;
            const t = L2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - g.a.x) * dx + (p.y - g.a.y) * dy) / L2));
            best = Math.min(best, Math.hypot(g.a.x + t * dx - p.x, g.a.y + t * dy - p.y));
          }
          worst = Math.max(worst, best);
        }
      }
      return worst;
    };
    const d1 = directed(ringEdges(f.stop), ringEdges(w));
    expect(d1.cm).toBeGreaterThanOrEqual(dense(f.stop, w) - 1e-6);
    expect(d1.cm).toBeLessThanOrEqual(dense(f.stop, w) + 0.02);
    expect(d1.cm).toBeCloseTo(199.61, 1);
    const d2 = directed(ringEdges(w), ringEdges(f.stop));
    expect(d2.cm).toBeCloseTo(40.29, 1);
    expect(directed(ringEdges(w), ringEdges(f.stop), R).within).toBe(true);
    expect(directed(ringEdges(f.stop), ringEdges(w), R).within).toBe(false);
    expect(needleCm(ringEdges(w), ringEdges(f.stop), R)).toBe(0);
    expect(needleCm(ringEdges(f.stop), ringEdges(w), R)).toBeGreaterThan(100);
    // The sliver's disc: no point of the region lies farther than half the width from both boundaries (a 5 cm grid).
    const sl = sliver(ringRegion(w), ringRegion(f.stop), R);
    let best = 0;
    const xs = w.map((q) => q.x);
    const ys = w.map((q) => q.y);
    const reg = ringRegion(w);
    const st = ringRegion(f.stop);
    const dist = (p: Pt, es: readonly Seg[]) => Math.min(...es.map((g) => {
      const dx = g.b.x - g.a.x;
      const dy = g.b.y - g.a.y;
      const L2 = dx * dx + dy * dy;
      const t = L2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - g.a.x) * dx + (p.y - g.a.y) * dy) / L2));
      return Math.hypot(g.a.x + t * dx - p.x, g.a.y + t * dy - p.y);
    }));
    for (let x = Math.min(...xs); x <= Math.max(...xs); x += 25) {
      for (let y = Math.min(...ys); y <= Math.max(...ys); y += 25) {
        const p = { x, y };
        if (reg.inside(p) && !st.inside(p)) best = Math.max(best, 2 * Math.min(dist(p, reg.edges), dist(p, st.edges)));
      }
    }
    expect(sl.cm).toBeGreaterThanOrEqual(best - 2);
    expect(sl.within).toBe(true);
    expect(unionRegion([w, []]).edges).toHaveLength(ringEdges(w).length);
  });
});

describe('S8 ≡ S9 boundaries loop by loop (C-0331 (3))', () => {
  const outer = rect(0, 0, 1_000, 1_000);
  // A triangle hole touching the outer ring at (0, 0): the L2 face walk carries it as a loop of the outer ring.
  const tri = [{ x: 0, y: 0 }, { x: 300, y: 600 }, { x: 600, y: 300 }];
  const walked = [{ x: 0, y: 0 }, { x: 600, y: 300 }, { x: 300, y: 600 }, { x: 0, y: 0 }, { x: 0, y: 1_000 }, { x: 1_000, y: 1_000 }, { x: 1_000, y: 0 }];

  it('loopsOf cuts a ring at a repeated vertex; spurs and repeats give no loop', () => {
    expect(loopsOf(walked)).toHaveLength(2);
    expect(loopsOf(outer)).toHaveLength(1);
    expect(loopsOf([...outer, outer[0]])).toHaveLength(1);
    expect(loopsOf([outer[0], { x: 500, y: 0 }, { x: 500, y: -300 }, { x: 500, y: 0 }, outer[1], outer[2], outer[3]])).toEqual(loopsOf(outer));
    expect(boundaryLoops([walked])).toEqual(boundaryLoops([outer, tri.slice().reverse()]));
  });

  it('the walked face equals the kerb’s outer ring with its hole (0); without the hole it does not', () => {
    expect(compareBoundaries([outer, tri.slice().reverse()], [walked], S8S9_BOUND_SQ)).toEqual({ cm: 0, within: true });
    const miss = compareBoundaries([outer], [walked], S8S9_BOUND_SQ);
    expect(miss.within).toBe(false);
    expect(miss.cm).toBeGreaterThan(400);
    // The ring-only reading (the old) on the same pair reads the hole as a far miss.
    expect(compareRings(outer, walked, S8S9_BOUND_SQ).within).toBe(false);
    // A hole moved 1 m is a miss beyond the bound; one moved 1 cm is within it.
    const far = tri.map((q) => ({ x: q.x + 100, y: q.y + 100 }));
    expect(compareBoundaries([outer, far], [walked], S8S9_BOUND_SQ).within).toBe(false);
    const near = [{ x: 1, y: 0 }, { x: 301, y: 600 }, { x: 601, y: 300 }];
    const n1 = compareBoundaries([outer, near], [walked], S8S9_BOUND_SQ);
    expect(n1.within).toBe(true);
    expect(n1.cm).toBeGreaterThan(0.4);
    expect(n1.cm).toBeLessThanOrEqual(1.001);
  });
});

describe('S8 ≡ S9 on the river fixture (N-59’s routed finding; C-0331 (3), (4))', () => {
  it('base river seeds 2 and 4 (900 ha, 30 ha walled): no block beyond the bound — S9’s block read where L2 holds no record (the L1 face itself) and its faces’ pinched holes loop by loop', { timeout: 600_000 }, () => {
    for (const seed of [2, 4]) {
      const h = s8s9(derive('integrated', seed, { ...TEST_SIZE, river: true }));
      const at = `river seed ${String(seed)}`;
      expect(h.compared, at).toBeGreaterThan(100);
      // Spineless faces (water banks, the frame) whose kerb is the face: S9 commits no L2 record there (§2.2 rule 2).
      expect(h.s9OwnL1, at).toBeGreaterThan(0);
      expect({ at, beyond: h.beyond, driftBeyond: h.driftBeyond, s9Refused: h.s9Refused, kerbReads: h.kerbReads, firstBeyond: h.misses.find((m) => m.beyond) ?? null }).toEqual({ at, beyond: 0, driftBeyond: 0, s9Refused: 0, kerbReads: 0, firstBeyond: null });
      expect(h.maxCm, at).toBeLessThanOrEqual(S8S9_BOUND_CM);
    }
  });
});
