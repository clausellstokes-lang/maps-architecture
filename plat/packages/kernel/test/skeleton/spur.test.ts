// M0-a-11, session fix round S1 (N-52 (3), C-0276): §3.8's pre-clean ("input is pre-cleaned by merging collinear
// vertices") drops exact zero-width spurs — a vertex whose two neighbours are one lattice point, the ring walking out
// along a segment and back along the same one (a dead-end street on a district face) — with one of the two coincident
// neighbours, to a fixpoint, before orientation and the contract's refusals. Two coincident collinear edges enclose no
// area, so the face is unchanged and its skeleton is the spur-free face's; a fold-back whose neighbours differ by any
// lattice step is still a 0° corner the contract refuses (`sharpCorner`). Behaviour shift (C-0276): a ring with an exact
// spur took `sharpCorner` before this round and now runs.
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

describe('an inexact fold-back is not a spur: still a 0° corner the contract refuses (C-0168 (3))', () => {
  /** The refusal, checked to have run nothing (events 0, no engine trace line). */
  function refused(rings: LatticePoint[][]): { refusal: string; at?: LatticePoint } {
    const lines: string[] = [];
    const r = runSkeleton(rings, 'roof', {}, { trace: (l) => lines.push(l) });
    if (!r.ok || r.value.kind !== 'downgrade' || r.value.cause.code !== 'contract') throw new Error(`not a contract refusal: ${JSON.stringify(r)}`);
    expect(r.value.events).toBe(0);
    expect(lines).toEqual([]);
    return { refusal: r.value.cause.refusal, ...(r.value.cause.at === undefined ? {} : { at: r.value.cause.at }) };
  }

  it('back to a point 1 cm beside the root, or 1 cm short of it along the spur', () => {
    const beside = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_201, 1_000), pt(1_200, 1_600), pt(1_200, 1_000), pt(0, 1_000)];
    expect(refused([beside])).toEqual({ refusal: 'sharpCorner', at: pt(1_200, 1_600) });
    const short = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_200, 1_000), pt(1_200, 1_600), pt(1_200, 1_001), pt(0, 1_000)];
    expect(refused([short]).refusal).toBe('sharpCorner');
    // the same spur exact: no refusal
    const exact = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_200, 1_000), pt(1_200, 1_600), pt(1_200, 1_000), pt(0, 1_000)];
    expect(shape(graph([exact]))).toEqual(shape(PLAIN));
  });

  it('an exact spur beside an inexact one: the exact one goes, the inexact one is refused at its tip', () => {
    const both = [pt(0, 0), pt(500, 0), pt(500, 400), pt(500, 0), pt(2_000, 0), pt(2_000, 1_000), pt(1_201, 1_000), pt(1_200, 1_600), pt(1_200, 1_000), pt(0, 1_000)];
    expect(refused([both])).toEqual({ refusal: 'sharpCorner', at: pt(1_200, 1_600) });
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
