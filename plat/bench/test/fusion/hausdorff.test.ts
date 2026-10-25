// M0-c-06's listed test: "the Hausdorff check equals 0 on every seed (a planted 1 cm shift fails it)" — §13.2's contract
// "S8's working block equals S9's committed block (Hausdorff 0; §3.7)", read through corridorUnion over every district's
// committed L1 faces (S9's kernel op) and, since N-52 (1), as exactness where the lattice allows it and N-43's bound where
// it does not: Hausdorff ≤ 2 · √2 · attractCm on EVERY block (a larger distance fails the run), the stop kerb's drift
// within the same bound, the exact-0 share ratcheted (≥ 0.95 on seeds 1 – 2) — and the ring geometry it rests on.
// N-52 (5)'s corpus clause rides on the same records: 0 downgrades on seeds 1 – 2, both runs.
import { beforeAll, describe, expect, it } from 'vitest';
import { canonicalRing, compareRings, derive, hausdorffCm, measure, S8S9_BOUND_CM, S8S9_BOUND_SQ, S8S9_EXACT_FLOOR, s8s9, sameRing, stopKerb, vertexWithin, type SeedRecord } from '../../src/fusion/index.js';
import { TEST_SIZE } from './support.js';

const sq = [
  { x: 0, y: 0 },
  { x: 1_000, y: 0 },
  { x: 1_000, y: 1_000 },
  { x: 0, y: 1_000 },
];

/** A brute-force directed distance (every 0.5 cm along every edge) for the bracket's check. */
function dense(a: readonly { x: number; y: number }[], b: readonly { x: number; y: number }[]): number {
  const seg = (p: { x: number; y: number }, u: { x: number; y: number }, v: { x: number; y: number }) => {
    const dx = v.x - u.x;
    const dy = v.y - u.y;
    const L = dx * dx + dy * dy;
    const t = L === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - u.x) * dx + (p.y - u.y) * dy) / L));
    return Math.hypot(u.x + t * dx - p.x, u.y + t * dy - p.y);
  };
  let worst = 0;
  for (let i = 0; i < a.length; i += 1) {
    const u = a[i];
    const v = a[(i + 1) % a.length];
    const n = Math.max(1, Math.ceil(Math.hypot(v.x - u.x, v.y - u.y) / 0.5));
    for (let s = 0; s <= n; s += 1) {
      const p = { x: u.x + (s / n) * (v.x - u.x), y: u.y + (s / n) * (v.y - u.y) };
      let best = Infinity;
      for (let j = 0; j < b.length; j += 1) best = Math.min(best, seg(p, b[j], b[(j + 1) % b.length]));
      worst = Math.max(worst, best);
    }
  }
  return worst;
}

describe('the ring geometry (canonical forms, Hausdorff, the bound)', () => {
  it('one closed point set has one canonical form: rotation, direction, a closing vertex, repeats and collinear vertices', () => {
    const c = canonicalRing(sq);
    expect(c).toEqual(sq);
    expect(canonicalRing([sq[2], sq[3], sq[0], sq[1]])).toEqual(c);
    expect(canonicalRing([...sq].reverse())).toEqual(c);
    expect(canonicalRing([...sq, sq[0]])).toEqual(c);
    expect(canonicalRing([sq[0], sq[0], { x: 500, y: 0 }, sq[1], sq[2], { x: 1_000, y: 1_000 }, sq[3]])).toEqual(c);
    expect(sameRing([{ x: 500, y: 0 }, ...sq.slice(1), sq[0]], sq)).toBe(true);
    expect(hausdorffCm([{ x: 0, y: 500 }, ...sq], sq)).toBe(0);
    // A degenerate ring has no form.
    expect(canonicalRing([{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 9, y: 0 }])).toEqual([]);
  });

  it('a spike folds back to its base and the base corner stays (the smoke’s fusion seed 21 block: S9’s face with a 27 cm spur)', () => {
    // A 30 cm spur from the square's corner (1 000, 0), and one from mid-edge: each ring is the square.
    expect(canonicalRing([sq[0], sq[1], { x: 1_030, y: -10 }, sq[1], sq[2], sq[3]])).toEqual(sq);
    expect(canonicalRing([sq[0], { x: 500, y: 0 }, { x: 500, y: 40 }, { x: 500, y: 0 }, sq[1], sq[2], sq[3]])).toEqual(sq);
    // The spur's base a turning corner of an L: kept (removing every collinear vertex at once dropped both copies).
    const ell = [{ x: 0, y: 0 }, { x: 600, y: 0 }, { x: 600, y: 300 }, { x: 300, y: 300 }, { x: 300, y: 600 }, { x: 0, y: 600 }];
    const spurred = [...ell.slice(0, 3), { x: 627, y: 297 }, ell[2], ...ell.slice(3)];
    expect(canonicalRing(spurred)).toEqual(ell);
    expect(sameRing(spurred, ell)).toBe(true);
    // The same corner cut (the corner missing) is a miss, never folded to equal.
    const cut = [ell[0], ell[1], { x: 600, y: 200 }, { x: 500, y: 300 }, ...ell.slice(3)];
    expect(sameRing([...cut.slice(0, 3), { x: 600, y: 300 }, { x: 610, y: 300 }, { x: 600, y: 300 }, ...cut.slice(3)], cut)).toBe(false);
    // The smoke's block (fusion seed 21, block:9w7xvex90dnmn): S9's face carries the working block's corner
    // (−8327, −74208) and a 27 cm spur from it; read as regions they are one block (Hausdorff 0), never 124 cm.
    const W = [[-8934, -75858], [-8819, -75766], [-8243, -75374], [-7635, -75025], [-8204, -73937], [-8232, -73873], [-8566, -72889], [-8327, -74208], [-8449, -74184], [-8476, -74179], [-8595, -74142], [-8621, -74134], [-8735, -74086], [-8761, -74075], [-8870, -74016], [-8894, -74003], [-8998, -73932], [-9020, -73917], [-9115, -73836], [-9136, -73818], [-9222, -73729], [-9241, -73709], [-9318, -73611], [-9335, -73590], [-9402, -73484], [-9416, -73461], [-9484, -73325], [-9538, -73183], [-11091, -69828], [-12001, -69297], [-13487, -71751], [-13568, -71884], [-13340, -72023], [-12788, -72371], [-12250, -72740], [-11727, -73130], [-11219, -73539], [-10727, -73967], [-10252, -74414], [-9794, -74878], [-9353, -75360]].map(([x, y]) => ({ x, y }));
    const at = W.findIndex((q) => q.x === -8327 && q.y === -74208);
    const S9 = [...W.slice(0, at + 1), { x: -8300, y: -74211 }, W[at], ...W.slice(at + 1)];
    expect(canonicalRing(S9)).toEqual(canonicalRing(W));
    expect(canonicalRing(S9).some((q) => q.x === -8327 && q.y === -74208)).toBe(true);
    expect(compareRings(W, S9, S8S9_BOUND_SQ)).toEqual({ cm: 0, within: true });
  });

  it('a 1 cm shift of one vertex is a Hausdorff distance > 0 (at most the shift), never 0', () => {
    const moved = [{ x: 1, y: 0 }, ...sq.slice(1)];
    expect(sameRing(moved, sq)).toBe(false);
    const d = hausdorffCm(moved, sq);
    expect(d).toBeGreaterThan(0.99);
    expect(d).toBeLessThanOrEqual(1.001);
    const out = [sq[0], { x: 1_001, y: 0 }, sq[2], sq[3]];
    expect(hausdorffCm(out, sq)).toBeCloseTo(1, 2);
    // A far vertex is measured as far: (1 000, 1 500) stands 500 cm off the square's boundary.
    expect(hausdorffCm([sq[0], sq[1], { x: 1_000, y: 1_500 }, sq[3]], sq)).toBeCloseTo(500, 2);
    // An inserted vertex 1 cm off an edge: a new turning vertex, > 0.
    expect(hausdorffCm([sq[0], { x: 500, y: 1 }, sq[1], sq[2], sq[3]], sq)).toBeCloseTo(1, 2);
  });

  it('the distance is bracketed from above within its tolerance, the maximum met inside an edge as well as at a vertex', () => {
    // A wide notch from the top edge down to 40 cm above the bottom one: every vertex of each ring lies within 40 cm of
    // the other, and the distance is met inside edges — (500, 1 000) of the square ≈ 195.8 cm from the notch's sides.
    const notch = [sq[0], sq[1], sq[2], { x: 700, y: 1_000 }, { x: 500, y: 40 }, { x: 300, y: 1_000 }, sq[3]];
    const ab = dense(sq, notch);
    const ba = dense(notch, sq);
    const h = hausdorffCm(sq, notch);
    expect(h).toBeGreaterThanOrEqual(Math.max(ab, ba) - 1e-9);
    // The dense sampling steps 0.5 cm, so it under-reads a peak by up to 0.5 cm (slope ≤ 1).
    expect(h).toBeLessThanOrEqual(Math.max(ab, ba) + 0.5);
    expect(ab).toBeCloseTo((200 * 960) / Math.hypot(200, 960), 1);
    // The notch's side (700, 1 000) → (500, 40) peaks inside: 300 + 200 s = 1 000 − 960 s at s = 0.603…, 420.69 cm.
    expect(h).toBeCloseTo(300 + (200 * 700) / 1_160, 2);
    expect(h).toBeGreaterThanOrEqual(300 + (200 * 700) / 1_160);
    // A random family: the bracket never under-reads the dense sampling and stays within its 0.5 cm step of it.
    let s = 12_345;
    const rnd = (n: number) => {
      s = (s * 1_103_515_245 + 12_345) % 2_147_483_648;
      return Math.floor((s / 2_147_483_648) * n);
    };
    for (let k = 0; k < 40; k += 1) {
      const a = [{ x: 0, y: 0 }, { x: 600 + rnd(400), y: rnd(60) - 30 }, { x: 800 + rnd(200), y: 600 + rnd(400) }, { x: rnd(60) - 30, y: 700 + rnd(300) }];
      const b = a.map((q) => ({ x: q.x + rnd(81) - 40, y: q.y + rnd(81) - 40 }));
      const want = Math.max(dense(a, b), dense(b, a));
      const got = hausdorffCm(a, b);
      expect(got).toBeGreaterThanOrEqual(want - 1e-9);
      expect(got).toBeLessThanOrEqual(want + 0.5);
    }
  });

  it('N-52 (1)’s bound is 2 · √2 · attractCm, judged exactly at the vertices: 5 408 cm² in, 5 409 out', () => {
    expect(S8S9_BOUND_SQ).toBe(5_408);
    expect(S8S9_BOUND_CM).toBeCloseTo(73.539, 3);
    // A vertex at (−52, −52) from the square's corner stands exactly √5 408 cm off it.
    expect(vertexWithin({ x: -52, y: -52 }, sq, S8S9_BOUND_SQ)).toBe(true);
    expect(vertexWithin({ x: -52, y: -53 }, sq, S8S9_BOUND_SQ)).toBe(false);
    // The same corner met first as an edge's start (the ring rotated: the edge (0, 0) → (1 000, 0) is read first).
    const rotated = [sq[1], sq[2], sq[3], sq[0]];
    expect(vertexWithin({ x: -52, y: -52 }, rotated, S8S9_BOUND_SQ)).toBe(true);
    expect(vertexWithin({ x: -53, y: -52 }, rotated, S8S9_BOUND_SQ)).toBe(false);
    // Against an edge's interior: a slanted edge, the perpendicular distance squared compared in integers.
    const slant = [{ x: 0, y: 0 }, { x: 7_000_000, y: 3_000_001 }, { x: 0, y: 3_000_001 }];
    expect(vertexWithin({ x: 3_500_000, y: 1_500_000 }, slant, S8S9_BOUND_SQ)).toBe(true);
    // The same vertex 74 cm south of that edge's line (the cross product needs BigInt: its square passes 2^53).
    expect(vertexWithin({ x: 3_500_000, y: 1_499_919 }, slant, S8S9_BOUND_SQ)).toBe(false);
    expect(vertexWithin({ x: 3_500_000, y: 1_499_934 }, slant, S8S9_BOUND_SQ)).toBe(true);
    // Exactly on the bound against an edge's interior: the diagonal (0, 0) → (1 000, 1 000), a vertex 104 / √2 cm off it.
    const diag = [{ x: 0, y: 0 }, { x: 1_000, y: 1_000 }, { x: -2_000, y: 1_000 }];
    expect(vertexWithin({ x: 448, y: 552 }, diag, S8S9_BOUND_SQ)).toBe(true);
    expect(vertexWithin({ x: 447, y: 552 }, diag, S8S9_BOUND_SQ)).toBe(false);
    // A near-tie no double decides: a vertex 8.9e-11 cm beyond the bound off a long edge (d² = 5 408 + 297 521 / l², l² ≈
    // 2.3e13) — its distance in doubles reads ≤ the bound, the exact test refuses it, and so does the rings' verdict.
    const tri = [{ x: 0, y: 0 }, { x: 3_355_167, y: 3_393_757 }, { x: 0, y: 3_393_757 }];
    const tie = { x: 2_883_896, y: 2_916_961 };
    expect(vertexWithin(tie, tri, S8S9_BOUND_SQ)).toBe(false);
    expect(vertexWithin({ x: tie.x - 1, y: tie.y }, tri, S8S9_BOUND_SQ)).toBe(true);
    expect(compareRings([tri[0], tie, tri[1], tri[2]], tri, S8S9_BOUND_SQ).within).toBe(false);
    const corner = [{ x: -52, y: -52 }, sq[1], sq[2], sq[3]];
    expect(compareRings(corner, sq, S8S9_BOUND_SQ)).toEqual({ cm: expect.closeTo(73.539, 2) as number, within: true });
    expect(compareRings([{ x: -52, y: -53 }, sq[1], sq[2], sq[3]], sq, S8S9_BOUND_SQ).within).toBe(false);
    // An interior maximum beyond the bound fails it though every vertex lies within (the wide notch: ≥ 190 cm inside edges).
    const notch = [sq[0], sq[1], sq[2], { x: 700, y: 1_000 }, { x: 500, y: 40 }, { x: 300, y: 1_000 }, sq[3]];
    expect(notch.every((q) => vertexWithin(q, sq, S8S9_BOUND_SQ)) && sq.every((q) => vertexWithin(q, notch, S8S9_BOUND_SQ))).toBe(true);
    expect(compareRings(sq, notch, S8S9_BOUND_SQ).within).toBe(false);
    expect(compareRings(notch, sq, S8S9_BOUND_SQ).within).toBe(false);
    // Just beyond and just within, met inside an edge only: a thin strip notched from its top edge to 10 cm above its
    // bottom; the top edge's point (500, 140) stands w · 130 / √(w² + 130²) off the notch's sides — 74.00 cm at w = 90,
    // 72.87 cm at w = 88 — while every vertex of either ring lies within 10 cm of the other.
    const strip = [{ x: 0, y: 0 }, { x: 1_000, y: 0 }, { x: 1_000, y: 140 }, { x: 0, y: 140 }];
    const notched = (w: number, c = 500) => [strip[0], strip[1], strip[2], { x: c + w, y: 140 }, { x: c, y: 10 }, { x: c - w, y: 140 }, strip[3]];
    const beyond = compareRings(strip, notched(90), S8S9_BOUND_SQ);
    expect(beyond.cm).toBeCloseTo(11_700 / Math.sqrt(25_000), 2);
    expect(beyond.within).toBe(false);
    // Either order, and off the edge's dyadic points (the notch centred at x = 437).
    expect(compareRings(notched(90), strip, S8S9_BOUND_SQ).within).toBe(false);
    expect(compareRings(strip, notched(90, 437), S8S9_BOUND_SQ).within).toBe(false);
    expect(compareRings(notched(90, 437), strip, S8S9_BOUND_SQ).within).toBe(false);
    expect(compareRings(notched(88, 437), strip, S8S9_BOUND_SQ).within).toBe(true);
    const inside = compareRings(strip, notched(88), S8S9_BOUND_SQ);
    expect(inside.cm).toBeCloseTo(11_440 / Math.sqrt(88 * 88 + 16_900), 2);
    expect(inside.within).toBe(true);
    const shallow = [sq[0], { x: 400, y: 0 }, { x: 500, y: 60 }, { x: 600, y: 0 }, sq[1], sq[2], sq[3]];
    expect(compareRings(sq, shallow, S8S9_BOUND_SQ)).toEqual({ cm: expect.closeTo(60, 2) as number, within: true });
    expect(compareRings(sq, sq, S8S9_BOUND_SQ)).toEqual({ cm: 0, within: true });
    expect(compareRings(sq, [], S8S9_BOUND_SQ)).toEqual({ cm: Infinity, within: false });
  });
});

describe('the kerb S8 stopped on (C-0270 (5), N-57 (4))', () => {
  it('is the record — the kerb at the cut, never re-read; for a split block the parent’s, its children’s stop kerbs rebuilt by stopRegion (drift.test.ts)', () => {
    const stop = sq as never;
    expect(stopKerb({ kerb: stop })).toBe(stop);
  });
});

describe('S8 ≡ S9 on the flat fixture (the test size)', () => {
  it('a planted 1 cm shift of one vertex of every working block fails the check (exact share 0 < the floor); a 1 m shift breaks the bound', { timeout: 300_000 }, () => {
    const base = s8s9(derive('fusion', 1, TEST_SIZE));
    expect(base.compared).toBeGreaterThan(50);
    expect(base.zero / base.compared).toBeGreaterThanOrEqual(S8S9_EXACT_FLOOR);
    expect(base.beyond).toBe(0);
    // The stop kerb drifts on the fixture (C-0270 (18): later lanes' T-junctions re-shape it) and the drift is measured.
    expect(base.drifted).toBeGreaterThan(0);
    expect(base.driftMaxCm).toBeGreaterThan(1);
    expect(base.driftMaxCm).toBeLessThanOrEqual(S8S9_BOUND_CM);
    // Each ring's first turning vertex moved 1 cm east (a collinear vertex moved along its line would move no point).
    const shifted = s8s9(derive('fusion', 1, TEST_SIZE), (_block, ring) => canonicalRing(ring).map((q, i) => (i === 0 ? { x: q.x + 1, y: q.y } : q)) as unknown as typeof ring);
    expect(shifted.compared).toBe(base.compared);
    // No block holds exactly once its working block moved by 1 cm: the ratchet fails; every block stays within the bound.
    expect(shifted.zero).toBe(0);
    expect(shifted.zero / shifted.compared).toBeLessThan(S8S9_EXACT_FLOOR);
    expect(shifted.within1cm).toBeGreaterThanOrEqual(base.zero);
    expect(shifted.beyond).toBe(base.beyond);
    expect(shifted.driftBeyond).toBe(0);
    expect(shifted.misses.length).toBeGreaterThan(0);
    for (const m of shifted.misses) expect(m.cm).toBeGreaterThan(0);
    // A 1 m shift of the whole working block is beyond the bound on every block.
    const far = s8s9(derive('fusion', 1, TEST_SIZE), (_block, ring) => ring.map((q) => ({ x: q.x + 100, y: q.y })) as unknown as typeof ring);
    expect(far.beyond).toBe(far.compared);
    // … and 1 m off the kerb S8 stopped on: the drift clause fails on every block too.
    expect(far.driftBeyond).toBe(far.compared);
    expect(far.driftMaxCm).toBeGreaterThanOrEqual(99);
    expect(far.misses.every((m) => m.beyond)).toBe(true);
  });

  describe('seeds 1 – 2, both runs', () => {
    const recs: SeedRecord[] = [];
    beforeAll(() => {
      for (const seed of [1, 2]) for (const run of ['fusion', 'integrated'] as const) recs.push(measure(derive(run, seed, TEST_SIZE)));
    }, 900_000);

    it('the Hausdorff check equals 0 on every seed (seeds 1 – 2, both runs): no block beyond 2 · √2 · attractCm, the stop kerb’s drift within it, the exact share ≥ the measured floor (C-0320 (4): N-52 (5)’s 0.95 waits on the exact-0 KI)', () => {
      expect(recs).toHaveLength(4);
      for (const r of recs) {
        const h = r.hausdorff;
        const at = `${r.run} seed ${String(r.seed)}`;
        expect(h.compared, at).toBeGreaterThan(0);
        expect({ at, beyond: h.beyond, driftBeyond: h.driftBeyond, s9Refused: h.s9Refused, kerbReads: h.kerbReads, firstBeyond: h.misses.find((m) => m.beyond) ?? null }).toEqual({ at, beyond: 0, driftBeyond: 0, s9Refused: 0, kerbReads: 0, firstBeyond: null });
        expect(h.maxCm, at).toBeLessThanOrEqual(S8S9_BOUND_CM + 1e-9);
        expect(h.driftMaxCm, at).toBeLessThanOrEqual(S8S9_BOUND_CM + 1e-9);
        expect(h.zero / h.compared, at).toBeGreaterThanOrEqual(S8S9_EXACT_FLOOR);
        expect(h.missCm).toHaveLength(h.compared - h.zero);
      }
    });

    it('the skeleton corpus on the district faces: 0 downgrades on seeds 1 – 2, both runs (N-52 (5))', () => {
      for (const r of recs) {
        const at = `${r.run} seed ${String(r.seed)}`;
        expect(r.corpus.faces, at).toBeGreaterThan(0);
        expect({ at, roof: r.corpus.roof.downgrades, spine: r.corpus.spine.downgrades, failures: r.corpus.roof.failures + r.corpus.spine.failures, hits: r.corpus.roof.workLimitHits + r.corpus.spine.workLimitHits }).toEqual({ at, roof: 0, spine: 0, failures: 0, hits: 0 });
        expect(r.refusals.corpusRoof + r.refusals.corpusSpine, at).toBe(0);
      }
    });

    it('the refusal census (J264) reads zero on seeds 1 – 2, both runs: no stage, union, kerb read or corpus refusal', () => {
      for (const r of recs) {
        const at = `${r.run} seed ${String(r.seed)}`;
        expect({ at, ...r.refusals }).toEqual({ at, s8: 0, s9: 0, kerbReads: 0, corpusRoof: 0, corpusSpine: 0, kernelDowngrades: 0, kernelWorkLimitHits: 0, unplaced: 0, degraded: 0 });
        expect({ at, restarts: r.restarts, bugs: r.bugs }).toEqual({ at, restarts: 0, bugs: [] });
      }
    });
  });
});
