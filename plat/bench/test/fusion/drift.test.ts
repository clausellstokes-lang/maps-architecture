// M0-c-06: the stop kerb's drift clause read by N-57 (4) (C-0437) — the one-sided distance stop → working and the sliver
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
  laneBands,
  loopsOf,
  needleCm,
  ringEdges,
  regionLoops,
  ringRegion,
  S8S9_BOUND_CM,
  S8S9_BOUND_SQ,
  s8s9,
  seedComponents,
  sliver,
  stopKerb,
  unionRegion,
  type Band,
  type LaneBand,
  type Region,
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
  /** A lane whose end cap bites the block after its cut (Q60): its centreline, half-width and the start on the block's edge. */
  readonly caps?: { way: string; line: Pt[]; hw: number; at: Pt; boundary: string[]; lane: number }[];
}

/** The smoke's drifted blocks (fusion 49 and 30 at CITY, read on this tree by the mirror's probe; C-0437 (6)). */
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

  it('fusion 30 block:8ern91wcr4p11 and fusion 49 block:dnzm4ncd3tdyf — the needle is the STOP kerb’s (its tip 199.6 / 74.0 cm past the working ring): the slivers within, the one-sided distance stop → working beyond (reported, C-0437 (1))', () => {
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
    // With its seeds the block reads the same: both parts hold a seed, none is seedless.
    const seeded = blockDrift(f.stop, f.working, bandsOf(f), f.seeds);
    expect(seeded.seedless).toBe(0);
    expect(seeded.rows.every((r) => r.within)).toBe(true);
  });

  it('river fusion 2 block:6as10njkpyf8c — the spine’s band cuts a 10 m crescent off the west child at a neck: the parts holding the seeds within, the seedless part counted, not drift (C-0437 (2))', () => {
    const f = FIX['river fusion 2 block:6as10njkpyf8c'];
    expect(f.working).toHaveLength(2);
    const d = blockDrift(f.stop, f.working, bandsOf(f), f.seeds);
    expect(d.spines).toEqual(['way:61waa8axhdj4k']);
    expect(d.seedless).toBe(1);
    for (const row of d.rows) {
      expect(row.within).toBe(true);
      expect(row.sliverCm).toBeLessThanOrEqual(R);
      expect(row.oneSidedCm).toBeLessThanOrEqual(R);
    }
    // Read whole (no seeds), the crescent is a 10 m wide part of the stop region beyond every working ring: beyond.
    const whole = blockDrift(f.stop, f.working, bandsOf(f));
    expect(whole.seedless).toBe(0);
    expect(whole.rows.every((r) => !r.within)).toBe(true);
    expect(whole.rows[0].sliverCm).toBeGreaterThan(900);
    // A child moved 1 m still fails with the seeds given (its own part keeps its seed; the stop part it left uncovered
    // is the block's sliver, so both rows read beyond).
    const moved = f.working[1].map((q) => ({ x: q.x + 100, y: q.y }));
    const m = blockDrift(f.stop, [f.working[0], moved], bandsOf(f), f.seeds);
    expect(m.seedless).toBe(1);
    expect(m.rows.map((r) => r.within)).toEqual([false, false]);
    expect(m.rows[1].sliverCm).toBeGreaterThan(R);
  });

  // Q60 (N-60 (b)) and the seeded tree's other river blocks of its class, as the third continuation measured them: an
  // unsplit block stopped before a later lane T-ed onto its zero-width boundary (a wall or setback line on a district
  // seam) from the other side; the lane's start cap bites the block's kerb by its half-width (C-0438 (2)).
  const BITES = [
    { key: 'river integrated 2 block:223ebebtrn8m3', way: 'way:72aqbdpft7199', sliver: 170.97, oneSided: 170.75, haus: 171.17, s9: Math.SQRT2 },
    { key: 'river integrated 4 block:a7rbrrfn5c1t9', way: 'way:3dp6cgg39cxpr', sliver: 150.53, oneSided: 149.77, haus: 151.84, s9: 0 },
  ] as const;
  it.each(BITES)('$key (Q60’s class, N-60 (b) (ii)) — a band added after the cut: a later lane’s start cap reaches across the zero-width boundary into the stopped block; the clause reads it beyond, S9 ≡ working', (t) => {
    const f = FIX[t.key];
    const cap = f.caps?.[0];
    expect(cap?.way).toBe(t.way);
    if (cap === undefined) return;
    // An unsplit block: no spine enters the stop kerb, its one seed in its one working ring, no seedless part.
    const d = blockDrift(f.stop, f.working, [], f.seeds);
    expect({ spines: d.spines, seedless: d.seedless, rows: d.rows.length }).toEqual({ spines: [], seedless: 0, rows: 1 });
    const row = d.rows[0];
    // The finding as measured: the sliver is the cap's radius read on its chords, beyond the bound.
    expect(row.within).toBe(false);
    expect(row.sliverCm).toBeCloseTo(t.sliver, 1);
    expect(row.oneSidedCm).toBeCloseTo(t.oneSided, 1);
    expect(row.hausdorffCm).toBeCloseTo(t.haus, 1);
    expect(row.drifted).toBe(true);
    // S9 commits the working block: the drift is the stop kerb's, not the commit's.
    const c = compareBoundaries(f.working, f.s9, S8S9_BOUND_SQ);
    expect(c.within).toBe(true);
    expect(c.cm).toBeCloseTo(t.s9, 3);
    // The class (N-60 (b) (ii)): the cap's centre — the lane's start, a junction on the boundary line and district seam —
    // lies on the stop kerb's edge, and every working vertex off the stop kerb lies on the cap's circle (the band's end).
    const stopEdges = ringEdges(f.stop);
    const near = (q: Pt, segs: readonly Seg[]): number => {
      let best = Infinity;
      for (const s of segs) {
        const dx = s.b.x - s.a.x;
        const dy = s.b.y - s.a.y;
        const u = Math.max(0, Math.min(1, ((q.x - s.a.x) * dx + (q.y - s.a.y) * dy) / (dx * dx + dy * dy)));
        best = Math.min(best, Math.hypot(q.x - s.a.x - u * dx, q.y - s.a.y - u * dy));
      }
      return best;
    };
    expect(near(cap.at, stopEdges)).toBeLessThan(1);
    const off = f.working[0].filter((q) => near(q, stopEdges) > 1);
    expect(off.length).toBeGreaterThanOrEqual(8);
    for (const q of off) expect(Math.abs(Math.hypot(q.x - cap.at.x, q.y - cap.at.y) - cap.hw)).toBeLessThan(3);
    // The stop kerb less the lane's band is the working block within the bound: the engine's band, added after the cut.
    const less = cutRegion(f.stop, [{ line: cap.line, hw: cap.hw }]);
    const both = sliver(ringRegion(f.working[0]), less, R);
    const mirror = sliver(less, ringRegion(f.working[0]), R);
    expect({ working: both.within, stop: mirror.within }).toEqual({ working: true, stop: true });
    expect(Math.max(both.cm, mirror.cm)).toBeLessThan(10);
  });
});

describe('the third continuation’s smoke: the new findings as measured (C-0438 (3))', () => {
  it('fusion 21 block:b3xpcp1x3fad2 — a round bite (r ≈ 232 cm, centred 156 cm outside the stop kerb) after the cut: 75.13 cm, just beyond; S9 ≡ working', () => {
    const f = FIX['fusion 21 block:b3xpcp1x3fad2'];
    const row = blockDrift(f.stop, f.working, [], f.seeds).rows[0];
    expect(row.within).toBe(false);
    expect(row.sliverCm).toBeCloseTo(75.13, 1);
    expect(row.oneSidedCm).toBeCloseTo(74.94, 1);
    expect(compareBoundaries(f.working, f.s9, S8S9_BOUND_SQ)).toEqual({ cm: 0, within: true });
  });

  it('fusion 25 block:ebxh7bh5a96d2 — a split child’s kerb in two parts at the end (the seed’s and a seedless 172 m² one), joined in the stop region by a 13 cm neck: 776 cm beyond; without the seedless part the stop part is covered', () => {
    const f = FIX['fusion 25 block:ebxh7bh5a96d2'];
    const kerbParts = (f as unknown as { kerbParts: Pt[][][] }).kerbParts;
    expect(f.working).toHaveLength(2);
    expect(kerbParts.map((k) => k.length)).toEqual([0, 1]);
    const d = blockDrift(f.stop, f.working, bandsOf(f), f.seeds);
    expect(d.spines).toEqual(['way:0qckcgm6tysp0']);
    expect(d.seedless).toBe(0);
    expect(d.rows.map((r) => r.within)).toEqual([false, false]);
    expect(d.rows[0].sliverCm).toBeCloseTo(776.31, 0);
    // The seedless kerb part read with its child: every stop part is covered, the slivers within the bound.
    const whole = blockDrift(f.stop, [f.working[0], f.working[1], kerbParts[1][0]], bandsOf(f), [...f.seeds, f.seeds[1]]);
    expect(whole.rows.slice(0, 2).every((r) => r.within)).toBe(true);
    for (const r of whole.rows.slice(0, 2)) expect(r.sliverCm).toBeLessThanOrEqual(R);
    for (const w of f.working) expect(compareBoundaries([w], f.s9.filter((r) => compareBoundaries([w], [r]).cm === 0), S8S9_BOUND_SQ).within).toBe(true);
  });

  it('fusion 1 block:3fhrnvq8q9jy0 — the stop kerb is the working block; S9’s face lacks the working kerb’s 171 cm needle at a corner: beyond', () => {
    const f = FIX['fusion 1 block:3fhrnvq8q9jy0'];
    expect(blockDrift(f.stop, f.working, [], f.seeds).rows[0]).toMatchObject({ within: true, sliverCm: 0, drifted: false });
    const c = compareBoundaries(f.working, f.s9, S8S9_BOUND_SQ);
    expect(c.within).toBe(false);
    expect(c.cm).toBeCloseTo(170.93, 1);
  });
});

describe('the fourth continuation’s smoke: its beyond and drift-beyond blocks as measured (C-0439 (2), (3))', () => {
  type Line = { way: string; line: Pt[]; hw: number };
  /** A point's depth in a way's band: its half-width less the distance to the centreline (positive inside). */
  const depthIn = (q: Pt, b: Line): number => {
    let best = Infinity;
    for (let i = 1; i < b.line.length; i += 1) {
      const a = b.line[i - 1];
      const c = b.line[i];
      const dx = c.x - a.x;
      const dy = c.y - a.y;
      const u = Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / (dx * dx + dy * dy)));
      best = Math.min(best, Math.hypot(q.x - a.x - u * dx, q.y - a.y - u * dy));
    }
    return b.hw - best;
  };
  const deepest = (rings: readonly (readonly Pt[])[], b: Line): number => Math.max(...rings.flat().map((q) => depthIn(q, b)));
  // attractCm: the depth the faithful read keeps a vertex within (N-65 (2)); S9's committed blocks hold it here.
  const A = R / (2 * Math.SQRT2);

  it.each([
    { key: 'integrated 11 block:frgdxgv5et5yr', way: 'way:c78mb5xyqc0ps', cm: 139.06 },
    { key: 'integrated 36 block:9bfqve4sd4pf1', way: 'way:ak690sgajnsgm', cm: 137.27 },
  ])('$key — the kerb at the cut and the working kerb keep a needle into $way’s band that S9’s block lacks: beyond (N-60 (b) (ii), M0-a-09)', (t) => {
    const f = FIX[t.key] as Fixture & { needleBand: Line };
    expect(f.needleBand.way).toBe(t.way);
    // An unsplit block whose kerb did not move after the cut.
    const d = blockDrift(f.stop, f.working, [], f.seeds);
    expect({ spines: d.spines, seedless: d.seedless, within: d.rows[0].within }).toEqual({ spines: [], seedless: 0, within: true });
    expect(d.rows[0].sliverCm).toBeLessThan(1);
    const c = compareBoundaries(f.working, f.s9, S8S9_BOUND_SQ);
    expect(c.within).toBe(false);
    expect(c.cm).toBeCloseTo(t.cm, 1);
    // The class: the read keeps a vertex > 130 cm deep in the lane's band (its tip under attractCm wide), S9's block
    // stays within attractCm of the band's edge.
    expect(deepest(f.working, f.needleBand)).toBeGreaterThan(130);
    expect(deepest([f.stop], f.needleBand)).toBeGreaterThan(130);
    expect(deepest(f.s9, f.needleBand)).toBeLessThan(A);
  });

  it('fusion 23 block:6j7dap3athxnt — a split child’s working kerb 96 cm into way:4’s band where the kerb at the cut held 2 cm: an 80.74 cm sliver, beyond; S9 ≡ working (N-60 (b) (ii), M0-a-09)', () => {
    const f = FIX['fusion 23 block:6j7dap3athxnt'] as Fixture & { lostBand: Line };
    expect(f.lostBand.way).toBe('way:4');
    const d = blockDrift(f.stop, f.working, bandsOf(f), f.seeds);
    expect({ spines: d.spines, seedless: d.seedless, within: d.rows.map((r) => r.within) }).toEqual({ spines: ['way:bpg8zreabvv8e'], seedless: 0, within: [true, false] });
    expect(d.rows[1].sliverCm).toBeCloseTo(80.74, 1);
    expect(d.rows[1].oneSidedCm).toBeCloseTo(70.29, 1);
    // The class (ii): the band the engine no longer subtracts after the cut.
    expect(deepest([f.working[1]], f.lostBand)).toBeGreaterThan(90);
    expect(deepest([f.stop], f.lostBand)).toBeLessThan(5);
    expect(f.s9.some((r) => compareBoundaries([f.working[1]], [r]).cm === 0)).toBe(true);
  });

  it('integrated 38 block:4wrpx01r22ktq — Q102’s class: a split child’s kerb in two parts (the seed’s and a seedless one): 974.53 cm beyond; with the seedless part read the stop is covered (N-60 (b) (i), M0-b-03)', () => {
    const f = FIX['integrated 38 block:4wrpx01r22ktq'] as Fixture & { kerbParts: Pt[][][] };
    expect(f.kerbParts.map((k) => k.length)).toEqual([1, 0]);
    const d = blockDrift(f.stop, f.working, bandsOf(f), f.seeds);
    expect({ spines: d.spines, seedless: d.seedless, within: d.rows.map((r) => r.within) }).toEqual({ spines: ['way:dd4g6jvka1p2n'], seedless: 0, within: [false, false] });
    expect(d.rows[0].sliverCm).toBeCloseTo(974.53, 0);
    const whole = blockDrift(f.stop, [f.working[0], f.working[1], f.kerbParts[0][0]], bandsOf(f), [...f.seeds, f.seeds[0]]);
    expect(whole.rows.slice(0, 2).map((r) => r.within)).toEqual([true, true]);
    for (const w of f.working) expect(f.s9.some((r) => compareBoundaries([w], [r], S8S9_BOUND_SQ).within)).toBe(true);
  });

  it('fusion 24 block:4f566g8549yp6 — the acute tip (N-65 (3)): S9’s block keeps a 16.7° tip on F’s edge that the S8 read folds: 87.32 cm beyond; the stop kerb ≡ the working block', () => {
    const f = FIX['fusion 24 block:4f566g8549yp6'] as Fixture & { face: Pt[][] };
    expect(blockDrift(f.stop, f.working, [], f.seeds).rows[0]).toMatchObject({ within: true, sliverCm: 0, drifted: false });
    const c = compareBoundaries(f.working, f.s9, S8S9_BOUND_SQ);
    expect(c.within).toBe(false);
    expect(c.cm).toBeCloseTo(87.32, 1);
    // The tip's apex: S9's vertex on F's boundary, 87.32 cm off the working ring.
    const tip = f.s9[0].find((q) => q.x === -63466 && q.y === 32114);
    expect(tip).toBeDefined();
    if (tip === undefined) return;
    expect(Math.min(...f.face.map((r) => Math.min(...ringEdges(r).map((s) => segDistance(tip, s)))))).toBeLessThan(0.5);
    expect(Math.min(...ringEdges(f.working[0]).map((s) => segDistance(tip, s)))).toBeCloseTo(87.32, 1);
  });
});

/** A point's distance to a segment. */
function segDistance(q: Pt, s: Seg): number {
  const dx = s.b.x - s.a.x;
  const dy = s.b.y - s.a.y;
  const u = Math.max(0, Math.min(1, ((q.x - s.a.x) * dx + (q.y - s.a.y) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(q.x - s.a.x - u * dx, q.y - s.a.y - u * dy);
}

describe('the drift clause on synthetic blocks', () => {
  const stop = rect(0, 0, 4_000, 2_000);

  it('the same ring: 0 on every distance, not drifted', () => {
    const row = blockDrift(stop, [stop], []).rows[0];
    expect(row).toEqual({ oneSidedCm: 0, sliverCm: 0, within: true, hausdorffCm: 0, needleCm: 0, drifted: false });
  });

  it('a chamber behind a neck: the widest disc lies far from the working piece the boundaries differ on, near only the stop kerb’s walls — found (3 m), beyond', () => {
    // The stop kerb lacks a notch from the top edge: a 20 cm neck down to a 3 m × 3 m chamber. working ∖ stop is the
    // notch; the working ring differs from the stop kerb only on the neck's 20 cm mouth, the chamber's walls are the stop
    // kerb's (`differing` both ways bounds the cells near them).
    const notched: Pt[] = [
      { x: 0, y: 0 },
      { x: 4_000, y: 0 },
      { x: 4_000, y: 2_000 },
      { x: 2_010, y: 2_000 },
      { x: 2_010, y: 1_350 },
      { x: 2_150, y: 1_350 },
      { x: 2_150, y: 1_050 },
      { x: 1_850, y: 1_050 },
      { x: 1_850, y: 1_350 },
      { x: 1_990, y: 1_350 },
      { x: 1_990, y: 2_000 },
      { x: 0, y: 2_000 },
    ];
    const s = sliver(ringRegion(stop), ringRegion(notched), R);
    expect(s.within).toBe(false);
    expect(s.cm).toBeGreaterThan(298);
    expect(s.cm).toBeLessThanOrEqual(300.001);
    expect(sliver(ringRegion(notched), ringRegion(stop), R)).toEqual({ cm: 0, within: true });
    const row = blockDrift(notched, [stop], []).rows[0];
    expect(row.within).toBe(false);
    expect(row.sliverCm).toBeGreaterThan(298);
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
    // … and 1.5 cm off them (hw 101.5): still within the bound, but drifted (the 1 cm line is the classification's edge).
    const off = blockDrift(stop, [a, b], [{ ...spine, band: { ...spine.band, hw: 101.5 } }]);
    for (const row of off.rows) {
      expect(row.hausdorffCm).toBeGreaterThan(1.4);
      expect(row.hausdorffCm).toBeLessThan(1.6);
      expect(row.drifted).toBe(true);
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

  it('regionLoops and seedComponents: a parent less two bands in three parts, the part with no seed counted and left out; a hole kept with its part', () => {
    const parent = rect(0, 0, 4_000, 2_000);
    const v: Band = { line: [{ x: 2_000, y: -500 }, { x: 2_000, y: 2_500 }], hw: 100 };
    const h: Band = { line: [{ x: 2_000, y: 1_500 }, { x: 4_500, y: 1_500 }], hw: 100 };
    const region = cutRegion(parent, [v, h]);
    const loops = regionLoops(region.edges);
    expect(loops).not.toBeNull();
    expect((loops ?? []).length).toBe(3);
    const west = { x: 1_000, y: 1_000 };
    const eastSouth = { x: 3_000, y: 700 };
    const eastNorth = { x: 3_000, y: 1_800 };
    const kept = seedComponents(region, [west, eastSouth]);
    expect(kept.seedless).toBe(1);
    expect(kept.region.inside(west)).toBe(true);
    expect(kept.region.inside(eastSouth)).toBe(true);
    expect(region.inside(eastNorth)).toBe(true);
    expect(kept.region.inside(eastNorth)).toBe(false);
    // The kept boundary: no piece of the seedless part (y > 1 600 east of the spine).
    expect(kept.region.edges.some((e) => e.a.x > 2_100 && e.a.y > 1_600 && e.b.y > 1_600)).toBe(false);
    expect(kept.region.edges.length).toBeLessThan(region.edges.length);
    // A band wholly inside the west part (a hole of it): kept with its part — its boundary in the kept region's, its
    // inside out of the kept region — while the seedless part is still left out.
    const inner: Band = { line: [{ x: 600, y: 1_000 }, { x: 1_400, y: 1_000 }], hw: 50 };
    const holedRegion = cutRegion(parent, [v, h, inner]);
    expect((regionLoops(holedRegion.edges) ?? []).length).toBe(4);
    const kh = seedComponents(holedRegion, [{ x: 1_000, y: 400 }, eastSouth]);
    expect(kh.seedless).toBe(1);
    expect(kh.region.inside({ x: 1_000, y: 1_000 })).toBe(false);
    expect(kh.region.inside({ x: 1_000, y: 400 })).toBe(true);
    expect(kh.region.edges.filter((e) => Math.abs(e.a.y - 1_000) <= 51 && e.a.x > 500 && e.a.x < 1_500).length).toBeGreaterThan(4);
    const sides: Seg[] = [{ a: { x: 600, y: 950 }, b: { x: 1_400, y: 950 } }, { a: { x: 600, y: 1_050 }, b: { x: 1_400, y: 1_050 } }];
    expect(directed(sides, kh.region.edges).cm).toBeLessThan(1e-6);
    // All three seeded: nothing left out; no seed given: the region whole.
    expect(seedComponents(region, [west, eastSouth, eastNorth]).seedless).toBe(0);
    expect(seedComponents(region, []).region).toBe(region);
    // A ring with a hole: one outer loop and one clockwise hole, kept together with the seed's part.
    const hole = rect(500, 500, 900, 900).reverse();
    const holed: Region = { edges: [...ringEdges(parent), ...ringEdges(hole).map((e) => ({ a: e.b, b: e.a }))], inside: (q) => inRing(q, parent) && !inRing(q, hole) };
    const hl = regionLoops(holed.edges) ?? [];
    expect(hl).toHaveLength(2);
    expect(seedComponents(holed, [west]).seedless).toBe(0);
    // A boundary that does not close: no loops, the region kept whole.
    expect(regionLoops([{ a: { x: 0, y: 0 }, b: { x: 10, y: 0 } }])).toBeNull();
    expect(seedComponents({ edges: [{ a: { x: 0, y: 0 }, b: { x: 10, y: 0 } }], inside: () => true }, [west]).seedless).toBe(0);
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
    // The sampling rule on a straight run: 10 m of edge whose points lie farther than R from a short stop piece past
    // x = R; a step counts only when both its ends lie beyond, so the length is never over-read and under-read by < 1 step.
    const run: Seg[] = [{ a: { x: 0, y: 0 }, b: { x: 1_000, y: 0 } }];
    const at0: Seg[] = [{ a: { x: 0, y: -1 }, b: { x: 0, y: 1 } }];
    const exact = 1_000 - R;
    expect(needleCm(run, at0, R)).toBeLessThanOrEqual(exact);
    expect(needleCm(run, at0, R)).toBeGreaterThan(exact - 10);
    expect(needleCm(run, at0, R)).toBeCloseTo(920, 9);
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

describe('S8 ≡ S9 boundaries loop by loop (C-0437 (3))', () => {
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

/**
 * A run's S8 ≡ S9 record beside its counts recounted from the blocks (C-0437 (2), (5); the fourth continuation's
 * self-check, C-0439 (3)): a split block is one of more than one seed, every seed compared once; drifted, drift beyond and
 * the seedless stop parts are the sums of each block's own drift reading, the working blocks as s8s9 compared them (an
 * identity plant records each).
 */
function recounted(d: ReturnType<typeof derive>) {
  const working = new Map<string, Pt[][]>();
  const h = s8s9(d, (block, ring) => {
    working.set(block, [...(working.get(block) ?? []), ring.slice()]);
    return ring;
  });
  const blockFaces = (d.model.data.get('infill') as { blockFaces: { block: string; kerb: Pt[]; seeds: Pt[] }[] }).blockFaces;
  const lanes = laneBands(d);
  const rows = blockFaces.map((b) => blockDrift(stopKerb(b as never), working.get(b.block) ?? [], lanes, b.seeds));
  const sums = {
    blocks: blockFaces.length,
    split: blockFaces.filter((b) => b.seeds.length > 1).length,
    compared: blockFaces.reduce((n, b) => n + b.seeds.length, 0),
    drifted: rows.reduce((n, r) => n + r.rows.filter((x) => x.drifted).length, 0),
    driftBeyond: rows.reduce((n, r) => n + r.rows.filter((x) => !x.within).length, 0),
    driftSeedless: rows.reduce((n, r) => n + r.seedless, 0),
  };
  return { h, faces: blockFaces.length, sums };
}

describe('S8 ≡ S9 on the river fixture (N-59’s routed finding; C-0437 (3), (4))', () => {
  it('base river seeds 2 and 4 (900 ha, 30 ha walled): no block beyond the bound — S9’s block read where L2 holds no record (the L1 face itself) and its faces’ pinched holes loop by loop', { timeout: 600_000 }, () => {
    for (const seed of [2, 4]) {
      const { h, faces, sums } = recounted(derive('integrated', seed, { ...TEST_SIZE, river: true }));
      const at = `river seed ${String(seed)}`;
      expect({ blocks: h.blocks, split: h.split, compared: h.compared, drifted: h.drifted, driftBeyond: h.driftBeyond, driftSeedless: h.driftSeedless }, at).toEqual(sums);
      expect(h.split, at).toBeGreaterThan(0);
      expect(h.split, at).toBeLessThan(faces);
      expect(h.drifted, at).toBeGreaterThan(0);
      expect(h.compared, at).toBeGreaterThan(100);
      // Spineless faces (water banks, the frame) whose kerb is the face: S9 commits no L2 record there (§2.2 rule 2).
      expect(h.s9OwnL1, at).toBeGreaterThan(0);
      // Soft: a red names every seed's blocks (Q60's class at seeds 2 and 4 on the seeded tree, C-0438 (2)).
      expect.soft({ at, beyond: h.beyond, driftBeyond: h.driftBeyond, s9Refused: h.s9Refused, kerbReads: h.kerbReads, firstBeyond: h.misses.find((m) => m.beyond) ?? null }).toEqual({ at, beyond: 0, driftBeyond: 0, s9Refused: 0, kerbReads: 0, firstBeyond: null });
      expect(h.maxCm, at).toBeLessThanOrEqual(S8S9_BOUND_CM);
    }
    // The fusion run at river seed 2: the drift clause within on every block. Before M0-a-09's S15 a split block's
    // spine band cut a seedless part off its west child (block:6as10njkpyf8c, pinned by the fixture above); on the
    // landed engine (a-09 S14–S17, 9f631a41) that split no longer occurs — splits 11 → 7, driftSeedless 1 → 0, the
    // engine's declared shift (M0-a-09-notes rows 124 and 126), re-recorded here by the fourth continuation (C-0439 (1)).
    const f2 = s8s9(derive('fusion', 2, { ...TEST_SIZE, river: true }));
    expect({ beyond: f2.beyond, driftBeyond: f2.driftBeyond, firstBeyond: f2.misses.find((m) => m.beyond) ?? null }).toEqual({ beyond: 0, driftBeyond: 0, firstBeyond: null });
    expect(f2.driftSeedless).toBe(0);
  });

  it('flat fusion seed 5 (test size): a seedless stop part counted, never drift; the record’s counts are its blocks’ (C-0439 (3))', { timeout: 600_000 }, () => {
    // On the landed engine the test size’s one seedless stop part (32 runs scanned: flat and river, both runs, seeds
    // 1 – 8) is flat fusion 5’s: a split child’s parent kerb less the spine band keeps a part with no seed.
    const { h, sums } = recounted(derive('fusion', 5, TEST_SIZE));
    expect({ blocks: h.blocks, split: h.split, compared: h.compared, drifted: h.drifted, driftBeyond: h.driftBeyond, driftSeedless: h.driftSeedless }).toEqual(sums);
    expect(h.driftSeedless).toBeGreaterThanOrEqual(1);
    expect({ beyond: h.beyond, driftBeyond: h.driftBeyond, s9Refused: h.s9Refused, kerbReads: h.kerbReads }).toEqual({ beyond: 0, driftBeyond: 0, s9Refused: 0, kerbReads: 0 });
  });
});
