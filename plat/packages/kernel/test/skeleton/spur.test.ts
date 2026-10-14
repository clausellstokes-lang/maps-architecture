// M0-a-11 (C-0276, C-0283 and the hardening round S3's row): §3.8's pre-clean ("input is pre-cleaned by merging
// collinear vertices and by dropping spurs") drops exact zero-width spurs — a vertex whose two neighbours are one
// lattice point, the ring walking out along a segment and back along the same one (a dead-end street on a district
// face) — with one of the two coincident neighbours, and inexact spurs — a fold-back sharper than 5° whose shorter
// arm's end lies within `attractCm` (26 cm) of the longer arm, every such tip of a round removed at once — to a
// fixpoint, before orientation and the contract's refusals. A spur encloses no area, or less than the lattice's own
// coincidence band, so the face's skeleton is the spur-free face's; a fold-back wider than `attractCm` is still a
// sharp corner the contract refuses (`sharpCorner`). A hole that is all spur — a dead-end network inside the face —
// cleans away and the face runs.
import { describe, expect, it } from 'vitest';
import { runSkeleton } from '../../src/skeleton/skeleton.js';
import { skeleton, type Skeleton, type SkeletonGraph } from '../../src/skeleton/index.js';
import { prepareRings } from '../../src/skeleton/prepare.js';
import type { LatticePoint } from '../../src/types/index.js';
import { TIMEOUT, generator, holedPolygons, intIn, lShape, notched, pt, rotatedSquares, tShape, type Ring } from './support.js';

/** The 20 × 10 m rectangle the pins root their spurs on (counter-clockwise from the origin). */
const RECT: Ring = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(0, 1_000)];

function graph(rings: LatticePoint[][]): SkeletonGraph {
  const r = skeleton(rings, 'roof');
  if (!r.ok) throw new Error(`refused: ${r.code}`);
  if (r.value.kind !== 'skeleton') throw new Error(`downgraded: ${JSON.stringify(r.value.cause)}`);
  return r.value;
}

/** A skeleton less its edge map (the caller's vertex indices differ once a spur is inserted). */
function shape(s: Skeleton): unknown {
  if (s.kind === 'downgrade') return s;
  const { edges, ...rest } = s;
  return { ...rest, edges: edges.map((e) => e.ring) };
}

/** The rectangle's skeleton: what every spurred rectangle below must give. */
const PLAIN = graph([RECT]);

describe('an exact zero-width spur is pre-cleaned: the face skeletonises as the spur-free face (N-52 (3))', () => {
  it('a spur of one segment at a corner, outward and inward', () => {
    const out = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(2_600, 1_700), pt(2_000, 1_000), pt(0, 1_000)];
    const inward = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_400, 400), pt(2_000, 1_000), pt(0, 1_000)];
    for (const ring of [out, inward]) {
      const g = graph([ring]);
      expect(shape(g)).toEqual(shape(PLAIN));
      expect(g.rings).toEqual([RECT]);
      // the root's first visit (caller vertex 2) is kept with its index; the tip (3) and the second visit (4) lie inside
      // the cleaned edge 2 → 5
      expect(g.edges).toEqual([
        { ring: 0, from: 0, to: 1 },
        { ring: 0, from: 1, to: 2 },
        { ring: 0, from: 2, to: 5 },
        { ring: 0, from: 5, to: 0 },
      ]);
    }
  });

  it('a spur of two segments (bent, and straight out along two collinear segments then back along one)', () => {
    const bent = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(2_500, 1_500), pt(2_500, 2_300), pt(2_500, 1_500), pt(2_000, 1_000), pt(0, 1_000)];
    // out (2 000, 1 000) → (2 400, 1 300) → (2 800, 1 600), straight on, then back in one segment: the merge exposes the spur
    const straight = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(2_400, 1_300), pt(2_800, 1_600), pt(2_000, 1_000), pt(0, 1_000)];
    for (const ring of [bent, straight]) {
      expect(shape(graph([ring]))).toEqual(shape(PLAIN));
    }
  });

  it('a spur rooted mid-edge (one and two segments, outward and inward): the root merges, the edge map spans the spur', () => {
    const one = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_200, 1_000), pt(1_200, 1_600), pt(1_200, 1_000), pt(0, 1_000)];
    const g = graph([one]);
    expect(shape(g)).toEqual(shape(PLAIN));
    // caller vertices 3 (the root), 4 (the tip) and 5 (the root again) lie inside the cleaned edge 2 → 6
    expect(g.edges).toEqual([
      { ring: 0, from: 0, to: 1 },
      { ring: 0, from: 1, to: 2 },
      { ring: 0, from: 2, to: 6 },
      { ring: 0, from: 6, to: 0 },
    ]);
    const two = [pt(0, 0), pt(800, 0), pt(800, 600), pt(1_300, 300), pt(800, 600), pt(800, 0), pt(2_000, 0), pt(2_000, 1_000), pt(0, 1_000)];
    expect(shape(graph([two]))).toEqual(shape(PLAIN));
  });

  it('a spur across the ring’s seam (the walk starting at the tip, or at the root), either orientation', () => {
    const spurred = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_200, 1_000), pt(1_200, 1_600), pt(1_200, 1_000), pt(0, 1_000)];
    for (let k = 0; k < spurred.length; k += 1) {
      const rotated = [...spurred.slice(k), ...spurred.slice(0, k)];
      expect(shape(graph([rotated]))).toEqual(shape(PLAIN));
      expect(shape(graph([[...rotated].reverse()]))).toEqual(shape(PLAIN));
    }
  });

  it('a spur continuing a boundary edge straight on past its root, or on the backward extension of the next edge (session fix S2, M13)', () => {
    // the street runs on past the face's corner and stops: the tip's two neighbours are one lattice point (C-0276 (1)), so
    // the spur goes — the spur pass runs before the collinear merge in each round, or the merge would eat the root's
    // first visit (straight on from (0, 0) to the tip) and leave the tip a 0° corner refused `sharpCorner`
    const onIncoming = [pt(0, 0), pt(2_000, 0), pt(2_600, 0), pt(2_000, 0), pt(2_000, 1_000), pt(0, 1_000)];
    const onOutgoingBack = [pt(0, 0), pt(2_000, 0), pt(2_000, -500), pt(2_000, 0), pt(2_000, 1_000), pt(0, 1_000)];
    for (const ring of [onIncoming, onOutgoingBack]) {
      const g = graph([ring]);
      expect(shape(g)).toEqual(shape(PLAIN));
      expect(g.rings).toEqual([RECT]);
      // the root's first visit (caller vertex 1) is kept; the tip (2) and the second visit (3) lie inside the edge 1 → 4
      expect(g.edges).toEqual([
        { ring: 0, from: 0, to: 1 },
        { ring: 0, from: 1, to: 4 },
        { ring: 0, from: 4, to: 5 },
        { ring: 0, from: 5, to: 0 },
      ]);
      for (let k = 0; k < ring.length; k += 1) {
        const rotated = [...ring.slice(k), ...ring.slice(0, k)];
        expect(shape(graph([rotated]))).toEqual(shape(PLAIN));
        expect(shape(graph([[...rotated].reverse()]))).toEqual(shape(PLAIN));
      }
    }
  });

  it('a spur whose tip is the walk’s last vertex: the seam keeps the root’s last visit, the edge map spans the spur (session fix S2, M14)', () => {
    // walk [R, P1, P2, P3, R, T]: T's neighbours are R (index 4) and R (index 0, across the seam); the tip and the walk's
    // first vertex go, the root keeps index 4, so the cleaned ring R(4) P1(1) P2(2) P3(3) has the edges 4 → 1 … 3 → 4
    // (C-0276 (1), (3): the first visit in walk order is the one kept — across the seam that is the walk's last visit)
    const walk = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(0, 1_000), pt(0, 0), pt(-500, -300)];
    const g = graph([walk]);
    expect(shape(g)).toEqual(shape(PLAIN));
    expect(g.rings).toEqual([RECT]);
    expect(g.edges).toEqual([
      { ring: 0, from: 4, to: 1 },
      { ring: 0, from: 1, to: 2 },
      { ring: 0, from: 2, to: 3 },
      { ring: 0, from: 3, to: 4 },
    ]);
  });

  it('a spur on a hole, and a spur from the outer ring reaching into the face, take the holed face’s skeleton', () => {
    const hole: Ring = [pt(600, 300), pt(1_000, 300), pt(1_000, 700), pt(600, 700)];
    const base = graph([RECT, hole]);
    const spurHole: Ring = [pt(600, 300), pt(1_000, 300), pt(1_300, 500), pt(1_000, 300), pt(1_000, 700), pt(600, 700)];
    expect(shape(graph([RECT, spurHole]))).toEqual(shape(base));
    const spurOuter: Ring = [pt(0, 0), pt(1_500, 0), pt(1_500, 400), pt(1_500, 0), pt(2_000, 0), pt(2_000, 1_000), pt(0, 1_000)];
    expect(shape(graph([spurOuter, hole]))).toEqual(shape(base));
  });

  it('a ring that is all spur is degenerate (nothing left to skeletonise), never a crash', () => {
    for (const ring of [
      [pt(0, 0), pt(1_000, 0), pt(0, 0)],
      [pt(0, 0), pt(1_000, 0), pt(1_000, 700), pt(1_000, 0)],
      [pt(0, 0), pt(1_000, 0), pt(1_500, 900), pt(1_000, 0), pt(0, 0), pt(-400, 300)],
    ]) {
      const p = prepareRings([ring]);
      expect(p.ok).toBe(false);
      if (!p.ok) expect(p.refusal).toBe('degenerate');
    }
  });
});

describe('an inexact spur within attractCm is pre-cleaned, every tip of a round at once, to a fixpoint (§3.8 as amended by item 130 (f); RQ7 (A))', () => {
  /** The refusal, checked to have run nothing (events 0, no engine trace line). */
  function refused(rings: LatticePoint[][]): { refusal: string; at?: LatticePoint } {
    const lines: string[] = [];
    const r = runSkeleton(rings, 'roof', {}, { trace: (l) => lines.push(l) });
    if (!r.ok || r.value.kind !== 'downgrade' || r.value.cause.code !== 'contract') throw new Error(`not a contract refusal: ${JSON.stringify(r)}`);
    expect(r.value.events).toBe(0);
    expect(lines).toEqual([]);
    return { refusal: r.value.cause.refusal, ...(r.value.cause.at === undefined ? {} : { at: r.value.cause.at }) };
  }

  /** The cleaned rings of every rotation and reversal of the ring, as a set (one member when the clean is order-free). */
  function cleanings(ring: Ring): Set<string> {
    const out = new Set<string>();
    for (let k = 0; k < ring.length; k += 1) {
      for (const r of [[...ring.slice(k), ...ring.slice(0, k)], [...ring.slice(k), ...ring.slice(0, k)].reverse()]) {
        const p = prepareRings([r]);
        out.add(p.ok ? JSON.stringify(p.value.rings) : `${p.refusal} ${JSON.stringify(p.at)}`);
      }
    }
    return out;
  }

  it('back to a point 1 cm beside the root, or 1 cm short of it along the spur: the tip goes and the face runs (the pins of S1 flipped)', () => {
    const beside = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_201, 1_000), pt(1_200, 1_600), pt(1_200, 1_000), pt(0, 1_000)];
    const g = graph([beside]);
    expect(shape(g)).toEqual(shape(PLAIN));
    expect(g.rings).toEqual([RECT]);
    // 1 cm short: the tip goes; the return's end stays, a 1 cm jog in the top edge (two right angles, no spur)
    const short = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_200, 1_000), pt(1_200, 1_600), pt(1_200, 1_001), pt(0, 1_000)];
    expect(graph([short]).rings).toEqual([[pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_200, 1_000), pt(1_200, 1_001), pt(0, 1_000)]]);
    // the tip (caller vertex 4) and the merged root lie inside the cleaned edge 2 → 6 (the kept vertices keep their indices)
    expect(graph([beside]).edges).toEqual([
      { ring: 0, from: 0, to: 1 },
      { ring: 0, from: 1, to: 2 },
      { ring: 0, from: 2, to: 6 },
      { ring: 0, from: 6, to: 0 },
    ]);
  });

  it('an exact spur beside an inexact one: both go', () => {
    const both = [pt(0, 0), pt(500, 0), pt(500, 400), pt(500, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_201, 1_000), pt(1_200, 1_600), pt(1_200, 1_000), pt(0, 1_000)];
    expect(shape(graph([both]))).toEqual(shape(PLAIN));
  });

  it('attractCm is the bound, inclusive: a short arm ending 26 cm from the long arm is a spur, 27 cm is a sharp corner refused at the tip', () => {
    // the long arm (1 200, 2 000) → (1 200, 1 000) on x = 1 200; the short arm's end 26 or 27 cm off it, its foot inside
    const at = (dx: number): Ring => [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_300, 1_000), pt(1_200 + dx, 1_100), pt(1_200, 2_000), pt(1_200, 1_000), pt(0, 1_000)];
    const p26 = prepareRings([at(26)]);
    expect(p26.ok && p26.value.rings).toEqual([[pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_300, 1_000), pt(1_226, 1_100), pt(1_200, 1_000), pt(0, 1_000)]]);
    expect(refused([at(27)])).toEqual({ refusal: 'sharpCorner', at: pt(1_200, 2_000) });
    // a fold-back 30 cm wide at its root (3.4°) stays a sharp corner
    expect(refused([[pt(0, 0), pt(1_000, 0), pt(1_000, 1_000), pt(530, 1_000), pt(500, 1_500), pt(500, 1_000), pt(0, 1_000)]])).toEqual({ refusal: 'sharpCorner', at: pt(500, 1_500) });
  });

  it('only a corner sharper than 5° is a tip: a fold-back at 5.3° or 6.8°, or at 30° or 45°, whose shorter arm ends within attractCm stays; one at 4.95° goes (hardening round S4)', () => {
    // a spike on the top edge from (1 200, 1 000) down to (1 200, 850) and back to (1 200 + dx, 1 000): the tip's corner is
    // atan(dx / 150), its shorter arm (the 150 cm one back to (1 200, 1 000)) ends dx · 150 / |(dx, 150)| cm from the
    // longer one, its foot inside it — within attractCm for every dx here, so only the 5° bound decides
    const spike = (dx: number): Ring => [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_200 + dx, 1_000), pt(1_200, 850), pt(1_200, 1_000), pt(0, 1_000)];
    // dx 13: 4.95° (|cross| 1 950 < tan 5° · dot 1 968.5), the tip goes and the root merges: the plain rectangle
    const under = prepareRings([spike(13)]);
    expect(under.ok && under.value.rings).toEqual([RECT]);
    expect(shape(graph([spike(13)]))).toEqual(shape(PLAIN));
    // a fold-back at 30° (a 26 cm arm ending 13 cm from a 30 cm one) or 45° (a 20 cm arm ending 14.1 cm from a 28 cm
    // one): RQ7 (A)'s literal criterion (any fold, dot > 0) would drop the tip; the round's 5° keeps it
    const notch30: Ring = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_215, 1_000), pt(1_200, 974), pt(1_200, 1_000), pt(0, 1_000)];
    const notch45: Ring = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_220, 1_000), pt(1_200, 980), pt(1_200, 1_000), pt(0, 1_000)];
    // dx 14: 5.33° (|cross| 2 100 > 1 968.5); dx 18: 6.84°, its shorter arm ending 17.9 cm from the longer one; and the
    // two notches — lawful corners the contract accepts, so the clean leaves them: the cleaned ring is the input ring and
    // every reader validates the face with its tip (a clean bounded at 10°, or the literal any-fold criterion, would drop
    // the tip and move a validated result — the closing check S3's survivor K6)
    for (const ring of [spike(14), spike(18), notch30, notch45]) {
      const p = prepareRings([ring]);
      expect(p.ok && p.value.rings).toEqual([ring]);
      for (const use of ['roof', 'spine', 'regions'] as const) {
        const r = skeleton([ring], use);
        expect(r.ok && r.value.kind).toBe('skeleton');
        if (r.ok && r.value.kind === 'skeleton') expect(r.value.rings).toEqual([ring]);
      }
      expect(shape(graph([ring]))).not.toEqual(shape(PLAIN));
    }
  });

  it('the clean never collapses a ring: a sliver narrower than attractCm stays a sharp corner, refused at its tip', () => {
    // the triangle's tip (0, 0) is a 1.15° fold whose short arm ends 20 cm from the long one: dropping it would leave two
    // vertices, so the ring is left whole for the contract (the kernel ladder's `limit/degen-skeleton-sharp-corner`)
    expect(refused([[pt(0, 0), pt(1_000, 0), pt(1_000, 20)]])).toEqual({ refusal: 'sharpCorner', at: pt(0, 0) });
    // relief-3000 seed 3's district 104: a triangle 1.5 cm wide and 47 m long
    expect(refused([[pt(43_132, 75_497), pt(40_053, 79_018), pt(40_009, 79_066)]]).refusal).toBe('sharpCorner');
  });

  it('to a fixpoint: a tapered needle whose tips appear one round after another cleans to the rectangle', () => {
    // round 1 drops (1 205, 2 200); then (1 208, 1 800) folds back (1.5°) onto (1 201, 1 500), then (1 201, 1 500) (1.1°)
    const needle = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_210, 1_000), pt(1_208, 1_800), pt(1_205, 2_200), pt(1_201, 1_500), pt(1_200, 1_000), pt(0, 1_000)];
    expect(shape(graph([needle]))).toEqual(shape(PLAIN));
  });

  it('every tip of a round at once: a zigzag needle of mutually adjacent tips, the same cleaned ring from every start and in both orientations', () => {
    // (1 005, 2 500), (1 010, 1 600) and (1 015, 2 500) are tips together; dropping one first would leave its neighbour a
    // 90° corner, so a one-at-a-time pass depends on where the walk starts
    const zigzag = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_020, 1_000), pt(1_020, 1_500), pt(1_015, 2_500), pt(1_010, 1_600), pt(1_005, 2_500), pt(1_000, 1_500), pt(1_000, 1_000), pt(0, 1_000)];
    const all = cleanings(zigzag);
    expect([...all]).toEqual([JSON.stringify([[pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_020, 1_000), pt(1_020, 1_500), pt(1_000, 1_500), pt(1_000, 1_000), pt(0, 1_000)]])]);
  });

  it('order-free: every rotation and reversal of every spur fixture gives one cleaned ring (N-1’s asymmetric walk included)', () => {
    const fixtures: Ring[] = [
      // N-1: out and back over different vertex sets, the spur continuing an edge straight on (refused before the round)
      [pt(200, 200), pt(200, 100), pt(100, 300), pt(300, 300), pt(200, 0), pt(200, 100), pt(200, 300)],
      [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_201, 1_000), pt(1_200, 1_600), pt(1_200, 1_000), pt(0, 1_000)],
      [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_210, 1_000), pt(1_208, 1_800), pt(1_205, 2_200), pt(1_201, 1_500), pt(1_200, 1_000), pt(0, 1_000)],
      [pt(0, 0), pt(500, 0), pt(500, 400), pt(500, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_201, 1_000), pt(1_200, 1_600), pt(1_200, 1_000), pt(0, 1_000)],
      [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_200, 1_000), pt(1_200, 1_600), pt(1_200, 1_000), pt(0, 1_000)],
    ];
    for (const ring of fixtures) expect(cleanings(ring).size).toBe(1);
    expect([...cleanings(fixtures[0])]).toEqual([JSON.stringify([[pt(200, 0), pt(300, 300), pt(100, 300), pt(200, 100)]])]);
  });
});

describe('a hole that is all spur cleans away: the face runs as the face without it (census Q73)', () => {
  it('a dead-end network inside the face (relief-60 seed 3’s district at (32 770, −86 089)), a single segment, a tree', () => {
    const hole: Ring = [pt(600, 300), pt(1_000, 300), pt(1_000, 700), pt(600, 700)];
    const base = graph([RECT, hole]);
    const segment: Ring = [pt(1_300, 400), pt(1_700, 600)];
    const tree: Ring = [pt(1_300, 400), pt(1_500, 500), pt(1_700, 400), pt(1_500, 500), pt(1_500, 800), pt(1_500, 500)];
    for (const dead of [segment, tree]) {
      for (const rings of [[RECT, dead, hole], [RECT, hole, dead]]) {
        const g = graph(rings);
        const { edges: _e, ...rest } = g;
        const { edges: _b, ...want } = base;
        expect(rest).toEqual(want);
        // the edge map keeps the caller's ring index of the hole that stays
        expect(g.edges.map((e) => e.ring)).toEqual([0, 0, 0, 0, rings.indexOf(hole), rings.indexOf(hole), rings.indexOf(hole), rings.indexOf(hole)]);
      }
    }
    // an outer ring that is all spur stays `degenerate`, holes or none
    const p = prepareRings([segment, hole]);
    expect(p.ok).toBe(false);
    if (!p.ok) expect(p.refusal).toBe('degenerate');
  });
});

/** A lattice point on the edge a → b strictly between its ends, or null when the edge holds none. */
function onEdge(rnd: () => number, a: LatticePoint, b: LatticePoint): LatticePoint | null {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  let g = Math.abs(dx);
  let h = Math.abs(dy);
  while (h !== 0) [g, h] = [h, g % h];
  if (g < 2) return null;
  const k = intIn(rnd, 1, g - 1);
  return pt(a.x + (dx / g) * k, a.y + (dy / g) * k);
}

/**
 * The ring with a spur of 1 – 3 segments inserted at a random vertex or a random lattice point inside an edge: the
 * walk goes root, t₁ … t_k, t_{k−1} … t₁, root and on — a tree walked out and back, any direction, crossing what it may.
 */
function withSpur(rnd: () => number, ring: Ring): Ring {
  const i = intIn(rnd, 0, ring.length - 1);
  const a = ring[i];
  const b = ring[(i + 1) % ring.length];
  const mid = rnd() < 0.5 ? onEdge(rnd, a, b) : null;
  const root = mid ?? a;
  const tips: LatticePoint[] = [];
  let at = root;
  for (let k = intIn(rnd, 1, 3); k > 0; k -= 1) {
    let q: LatticePoint;
    do q = pt(at.x + intIn(rnd, -1_500, 1_500), at.y + intIn(rnd, -1_500, 1_500));
    while (q.x === at.x && q.y === at.y);
    tips.push(q);
    at = q;
  }
  const walk = [root, ...tips, ...tips.slice(0, -1).reverse(), root];
  // at a vertex root the walk replaces it (it starts and ends there); at an edge point it is inserted after a
  return mid === null ? [...ring.slice(0, i), ...walk, ...ring.slice(i + 1)] : [...ring.slice(0, i + 1), ...walk, ...ring.slice(i + 1)];
}

/** The ring started at a random vertex, in a random orientation. */
function reseat(rnd: () => number, ring: Ring): Ring {
  const k = intIn(rnd, 0, ring.length - 1);
  const r = [...ring.slice(k), ...ring.slice(0, k)];
  return rnd() < 0.5 ? r.reverse() : r;
}

describe('property: exact spurs anywhere change nothing but the edge map (N-52 (3))', () => {
  it('rectangles, L, T and notched shapes and holed polygons with 1 – 4 random spurs, reseated', { timeout: TIMEOUT }, () => {
    const rnd = generator(0x5b07);
    const faces: Ring[][] = [
      ...rotatedSquares(11, 150).map((r) => [r]),
      ...Array.from({ length: 60 }, (_, k) => [lShape(3_000 + 37 * k, 900, 2_400, 700, k * 1.5, 0, 0)]),
      ...Array.from({ length: 60 }, (_, k) => [tShape(3_200, 800 + 9 * k, 2_000, 700, k * 1.5, 0, 0)]),
      ...Array.from({ length: 60 }, (_, k) => [notched(2_000, 1_000, 100 + 5 * k, 300, 200, k * 1.5, 0, 0)]),
      ...holedPolygons(3, 200),
    ];
    const counts = { cases: 0, validated: 0, downgraded: 0, spurs: 0 };
    for (const rings of faces) {
      const base = skeleton(rings, 'roof');
      if (!base.ok) throw new Error(`base refused: ${base.code}`);
      const spurred = rings.map((r) => r.slice());
      for (let s = intIn(rnd, 1, 4); s > 0; s -= 1) {
        const k = intIn(rnd, 0, spurred.length - 1);
        spurred[k] = withSpur(rnd, spurred[k]);
        counts.spurs += 1;
      }
      const r = skeleton(spurred.map((ring) => reseat(rnd, ring)), 'roof');
      if (!r.ok) throw new Error(`spurred refused: ${r.code}`);
      expect(shape(r.value)).toEqual(shape(base.value));
      expect(r.warnings).toEqual(base.warnings);
      counts.cases += 1;
      if (r.value.kind === 'skeleton') counts.validated += 1;
      else counts.downgraded += 1;
    }
    console.log(`[M0-a-11 spur property] ${counts.cases} faces, ${counts.spurs} spurs: ${counts.validated} validated, ${counts.downgraded} downgraded (each as its spur-free face)`);
    expect(counts.validated).toBeGreaterThan(counts.cases * 0.9);
  });
});
