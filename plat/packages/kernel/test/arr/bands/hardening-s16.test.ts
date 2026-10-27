// M0-a-09's fix round S16 (lane build/M0-a-09-fix-s16): B-SIMPLE, the S15 closing check's one blocker (checks/M0-a-09-s15.md;
// notes rows 127, 128). On row 127's widened-family network — a profiled dead-end lane (half-width 54 → 7) from the frame
// across one ring way to another — kerb(F) returned a ring that crosses itself and corridorUnion COMMITTED a block holding
// the lane's right half-band (34 → 11 cm over 22.6 m): each strip of the lane ending at a crossing on its straight route
// had its end corners held on the crossing line by the insertion (§3.6, hw · cos θ < attractCm), and the side from the
// corner its thin end collapsed onto the route was routed through the crossing vertex — the strip's held cycle enclosed
// almost nothing and the band was read as kerb. The faithful read (kerb.ts's module comment, round S16) reads such a face
// once more with the parts of straightened runs laid through stepped points. Each network below is red on the round's
// starting engine (round S15's kerb.ts: face 0's kerb ring not simple) and green on this tree.
import { describe, expect, it } from 'vitest';
import type { FaceId, Plat } from '../../../src/arena/index.js';
import { RING_CROSSES, readKerb, ringCrosses, ringSimple, straightRun, type KerbRead, type Spine, type SpineWidths } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import type { BandResult } from '../../../src/arr/bandUnion.js';
import { LATTICE } from '../../../src/num/index.js';
import type { Cm, LatticePoint } from '../../../src/types/index.js';
import { AT_S9, area2Of, commit, framed, healthy, nestingProblems, own, P, readIn, ringsOf, simpleRing, spineDepth, tilesExactly, way, wideNetwork, widthsOf, type WideWay } from './support.js';

/** kerb(F) read in an L1 batch (S8's read): the read, or its refusal as "code detail". */
function readL1(p: Plat, f: FaceId, ws: SpineWidths): KerbRead | string {
  const k = readIn(p, 1, (o) => readKerb(o, f, ws));
  return k.ok ? k.value : `${k.code} ${k.detail}`;
}

/** The least distance from q to the rings' edges. */
function distTo(rings: readonly (readonly LatticePoint[])[], q: LatticePoint): number {
  let d = Infinity;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      const l2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
      const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((q.x - a.x) * (b.x - a.x) + (q.y - a.y) * (b.y - a.y)) / l2));
      d = Math.min(d, Math.hypot(a.x + t * (b.x - a.x) - q.x, a.y + t * (b.y - a.y) - q.y));
    }
  }
  return d;
}

/** Is q inside the rings (non-zero winding; q off their edges)? */
function windsIn(rings: readonly (readonly LatticePoint[])[], q: { x: number; y: number }): boolean {
  let w = 0;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      const o = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
      if (a.y <= q.y) {
        if (b.y > q.y && o > 0) w += 1;
      } else if (b.y <= q.y && o < 0) w -= 1;
    }
  }
  return w !== 0;
}

/** Row 127's network with ring 1 at half-width `hw1` (the shrunk counterexample: 1; the check's variants P127v: 20, 60). */
const row127 = (hw1: number): WideWay[] => [
  { kind: 'dead', a: 8307, b: 0, x: 805, y: 400, w: 300, h: 300, hw: 54, knots: [54, 7], ends: 'round' },
  { kind: 'ring', a: 0, b: 0, x: 1214, y: 2466, w: 1302, h: 300, hw: hw1, knots: null, ends: 'round' },
  { kind: 'ring', a: 0, b: 0, x: 400, y: 400, w: 688, h: 304, hw: 31, knots: null, ends: 'round' },
];

describe('B-SIMPLE (the S15 closing check’s blocker): row 127’s profiled lane across two ring ways — kerb(F) simple, clear of the lane’s band, committed as read', () => {
  for (const hw1 of [1, 20, 60]) {
    it(`ring 1 at half-width ${String(hw1)}${hw1 === 1 ? ' (row 127’s shrunk counterexample)' : ' (the check’s variant P127v)'}: every face’s kerb(F) is simple, holds no vertex deeper than attractCm in way:0’s band, and corridorUnion commits exactly it`, () => {
      const { p, faces, table } = wideNetwork(row127(hw1));
      const ws = widthsOf(table);
      // the lane runs from the frame (3693, 4000) across ring 1's corner — its route vertices (2516, 2533), (2462, 2466) —
      // and ring 2's top edge at (1049, 704) to its end on ring 2's bottom edge (805, 400)
      expect(faces.length).toBe(5);
      const reads = new Map<FaceId, KerbRead>();
      let lane: Spine | null = null;
      for (const f of faces) {
        const k = readL1(p, f, ws);
        expect(typeof k, `face ${String(f)}: ${String(k)}`).toBe('object');
        if (typeof k === 'string') continue;
        reads.set(f, k);
        for (const r of k.kerb) expect(simpleRing(r), `face ${String(f)}`).toBe(true);
        expect(nestingProblems(k.kerb), `face ${String(f)}`).toEqual([]);
        const s = k.spines.get('way:way:0');
        if (s === undefined) continue;
        lane = s;
        const d = spineDepth(k.kerb, s);
        expect(d.depth, `face ${String(f)} at ${d.at}`).toBeLessThanOrEqual(LATTICE.attractCm);
      }
      expect(lane).not.toBe(null);
      // the lane's band is in no face's kerb where it is wider than attractCm: points halfway out on either side of its
      // centreline (the starting engine kept the right half between the rings as kerb — and committed it as block)
      for (let t = 0.05; t < 0.6; t += 0.05) {
        const c = { x: 3693 - 2888 * t, y: 4000 - 3600 * t };
        const h = (54 - 47 * t) / 2;
        for (const side of [1, -1]) {
          const q = { x: c.x + side * 0.78 * h, y: c.y - side * 0.6257 * h };
          for (const [f, k] of reads) expect(windsIn(k.kerb, q), `face ${String(f)} holds (${q.x.toFixed(1)}, ${q.y.toFixed(1)})`).toBe(false);
        }
      }
      // S9 commits the read (§4.6's S8 ≡ S9): per L1 face, the committed blocks hold the read's region — the same area,
      // every vertex of either within a centimetre of the other's outline (a thin band's centreline, an L1 edge, may run
      // through a block as a bridge of its walk) — and no block vertex lies deeper than attractCm in way:0's band
      const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
      healthy(p);
      expect(tilesExactly(p, 2, faces)).toEqual([]);
      const v = r.value as BandResult;
      for (const [f, k] of reads) {
        const blocks = v.blocks.filter((b) => p.faces[2].parent[b] === f).flatMap((b) => ringsOf(p, 2, b));
        if (v.whole.includes(f)) blocks.push(...ringsOf(p, 1, f));
        // the same area to the lattice's rounding: within a centimetre all round the read's outline
        const perimeter = k.kerb.reduce((sum, r) => sum + r.reduce((t, q, i) => t + Math.hypot(r[(i + 1) % r.length].x - q.x, r[(i + 1) % r.length].y - q.y), 0), 0);
        expect(Math.abs(Number(area2Of(blocks) - area2Of(k.kerb))), `face ${String(f)}`).toBeLessThanOrEqual(2 * perimeter);
        for (const q of blocks.flat()) expect(distTo(k.kerb, q), `face ${String(f)} block vertex ${String(q.x)},${String(q.y)}`).toBeLessThanOrEqual(1);
        for (const q of k.kerb.flat()) expect(distTo(blocks, q), `face ${String(f)} kerb vertex ${String(q.x)},${String(q.y)}`).toBeLessThanOrEqual(1);
        expect(spineDepth(blocks, lane as Spine).depth, `face ${String(f)}`).toBeLessThanOrEqual(LATTICE.attractCm);
      }
    });
  }
});

describe('the faithful read’s parts and its last guard (round S16)', () => {
  const line = (pts: readonly (readonly [number, number])[], hw: readonly number[], closed = false) => ({
    points: pts.map(([x, y]) => P(x, y)),
    hw: hw.slice(),
    closed,
    junction: [false, false] as const,
  });

  it('straightRun drops a crossing on a straight run (within the hot pixel, its half-width the line’s own), and keeps a bend, a width step, the ends and a ring’s corners', () => {
    // row 127's lane: four route vertices on the straight line (3693, 4000) → (805, 400), the crossings 0.1 – 0.4 cm off it
    const lane = line([[805, 400], [1049, 704], [2462, 2466], [2516, 2533], [3693, 4000]], [7, 10.969681788504607, 33.97028434034206, 34.84660896602152, 54]);
    expect(straightRun(lane).points).toEqual([P(805, 400), P(3693, 4000)]);
    expect(straightRun(lane).hw).toEqual([7, 54]);
    // a bend of 5 cm off the line is kept; so is a knot that changes the sampled half-width by more than the hot pixel
    expect(straightRun(line([[0, 0], [500, 5], [1000, 0]], [30, 30, 30])).points).toEqual([P(0, 0), P(500, 5), P(1000, 0)]);
    expect(straightRun(line([[0, 0], [500, 0], [1000, 0]], [30, 40, 30])).points).toEqual([P(0, 0), P(500, 0), P(1000, 0)]);
    // a ring keeps its four corners, a crossing on its side dropped (the walk from its first corner)
    const ring = straightRun(line([[1214, 2466], [2462, 2466], [2516, 2466], [2516, 2533], [2516, 2766], [1214, 2766]], [1, 1, 1, 1, 1, 1], true));
    expect(ring.points).toEqual([P(1214, 2466), P(2516, 2466), P(2516, 2766), P(1214, 2766)]);
    expect(ring.closed).toBe(true);
  });

  it('ringSimple: a bow-tie, a repeated vertex, a ring touching itself and one of two vertices are not simple; a square and a notched ring are (the refusal’s text pinned)', () => {
    const pts = (xs: readonly (readonly [number, number])[]): LatticePoint[] => xs.map(([x, y]) => P(x, y));
    expect(ringSimple(pts([[0, 0], [100, 0], [100, 100], [0, 100]]))).toBe(true);
    expect(ringSimple(pts([[0, 0], [100, 0], [100, 100], [50, 10], [0, 100]]))).toBe(true);
    expect(ringSimple(pts([[0, 0], [100, 100], [100, 0], [0, 100]]))).toBe(false);
    expect(ringSimple(pts([[0, 0], [100, 0], [50, 0], [50, 50]]))).toBe(false);
    expect(ringSimple(pts([[0, 0], [100, 0], [100, 100], [50, 0], [0, 100]]))).toBe(false);
    expect(ringSimple(pts([[0, 0], [100, 0], [100, 100], [0, 0], [0, 100]]))).toBe(false);
    expect(ringSimple(pts([[0, 0], [100, 0]]))).toBe(false);
    // row 127's ring as round S15's engine returned it: it runs along the lane's centreline and back along its left side
    const r127 = pts([[0, 0], [4000, 0], [4000, 4000], [3746, 4000], [3735, 3966], [2543, 2511], [2516, 2466], [2462, 2466], [1066, 726], [1049, 704], [2435, 2466], [1214, 2466], [1214, 2766], [2516, 2766], [2516, 2589], [3624, 4000], [0, 4000]]);
    expect(ringSimple(r127)).toBe(false);
    expect(simpleRing(r127)).toBe(false);
    expect(RING_CROSSES).toBe('arr: a ring of the read region crosses itself (N-45)');
    expect(r127.every((q) => Number.isInteger(q.x as Cm))).toBe(true);
  });

  it('a face whose own ring touches itself at a vertex — a cut vertex, no band reaching it — is read as its ring and committed whole: the guard refuses crossings only (the smoke’s river integrated 2 face 13)', () => {
    // a diamond of two widthless chains hung on the frame at (2000, 0): the frame face's walk visits that vertex twice
    const p = framed();
    way(p, 'way:a', [[2000, 0], [2500, 500], [2000, 1000]]);
    way(p, 'way:b', [[2000, 1000], [1500, 500], [2000, 0]]);
    const [outer] = own(p, 'district:1', [[200, 3800]]);
    const ws = widthsOf({});
    const k = readL1(p, outer, ws);
    expect(typeof k, String(k)).toBe('object');
    const read = k as KerbRead;
    expect(read.kerb.length).toBe(1);
    expect(read.kerb[0].filter((q) => q.x === 2000 && q.y === 0).length).toBe(2);
    expect(ringSimple(read.kerb[0])).toBe(false);
    expect(ringCrosses(read.kerb[0])).toBe(false);
    const r = commit(p, 2, (o) => corridorUnion(o, [outer], ws), AT_S9);
    healthy(p);
    expect((r.value as BandResult).whole).toEqual([outer]);
  });
});
