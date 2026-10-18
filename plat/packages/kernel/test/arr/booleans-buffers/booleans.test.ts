// M0-a-08's booleans on the arrangement (§3.4, §3.7 *Decision*, §3.11 *no input*): the four operations under both fill
// rules on hand-made operands with known answers, the winding labels, holes and pinches, the empty result, the lattice
// door, and a fast-check property tying the four operations' areas together. The oracle agreement is the testkit
// folder's (C-0122).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { createPlat, handleOf, isHalfEdgeLive, roleIdOf, rowsOn, type Plat, type VertexId } from '../../../src/arena/index.js';
import { booleans, buildOverlay, windingLabels, type Ring, type WindingLabels } from '../../../src/arr/index.js';
import {
  balanceFlow,
  bridgeGaps,
  dropStraight,
  glueWalks,
  orientSegments,
  shortestPath,
  simpleLoops,
  traceKept,
  type Segment,
  type Walk,
} from '../../../src/arr/winding.js';
import { attachIndex } from '../../../src/index/index.js';
import { insertTx, type InsertTx } from '../../../src/insert/classes.js';
import { insertChain } from '../../../src/insert/insertChain.js';
import { LATTICE } from '../../../src/num/index.js';
import type { Cm, LatticePoint } from '../../../src/types/index.js';
import { areaOf, insideRings, perimeterOf, pt, R, rect, simpleRing, TIMEOUT, area2Exact } from './support.js';

function rings(r: ReturnType<typeof booleans>): Ring[] {
  if (!r.ok) throw new Error(`refused: ${r.code} ${r.detail}`);
  return r.value;
}

describe('booleans: the four operations on two overlapping squares', () => {
  const A = [rect(0, 0, 1000, 1000)];
  const B = [rect(500, 500, 1500, 1500)];

  it('union, intersection, difference and xor give the exact areas and canonical counter-clockwise rings', () => {
    const u = rings(booleans('union', A, B, 'nonzero'));
    expect(u).toHaveLength(1);
    expect(areaOf(u)).toBe(1_750_000);
    expect(u[0]).toEqual(R([0, 0], [1000, 0], [1000, 500], [1500, 500], [1500, 1500], [500, 1500], [500, 1000], [0, 1000]));
    const i = rings(booleans('intersection', A, B, 'nonzero'));
    expect(i).toEqual([rect(500, 500, 1000, 1000)]);
    const d = rings(booleans('difference', A, B, 'nonzero'));
    expect(areaOf(d)).toBe(750_000);
    expect(d).toHaveLength(1);
    const x = rings(booleans('xor', A, B, 'evenodd'));
    expect(x).toHaveLength(2);
    expect(areaOf(x)).toBe(1_500_000);
    for (const r of [...u, ...i, ...d, ...x]) {
      expect(simpleRing(r)).toBe(true);
      expect(area2Exact(r) > 0n).toBe(true);
    }
  });

  it('reports no attraction warning on a case where nothing moves', () => {
    const r = booleans('union', A, B, 'nonzero');
    expect(r.ok && r.warnings.filter((w) => ['W_ATTRACTED', 'W_STRETCH_SHARED', 'W_WEDGE_ROUTED', 'W_PLACED'].includes(w.code))).toEqual([]);
  });
});

describe('booleans: holes, pinches and fill rules', () => {
  it('a difference that leaves a hole returns the outer ring counter-clockwise and the hole clockwise', () => {
    const r = rings(booleans('difference', [rect(0, 0, 3000, 3000)], [rect(1000, 1000, 2000, 2000)], 'nonzero'));
    expect(r).toHaveLength(2);
    expect(area2Exact(r[0]) > 0n).toBe(true);
    expect(area2Exact(r[1]) < 0n).toBe(true);
    expect(areaOf(r)).toBe(8_000_000);
  });

  it('two squares touching at one corner unite as two faces meeting at a point', () => {
    const r = rings(booleans('union', [rect(0, 0, 1000, 1000)], [rect(1000, 1000, 2000, 2000)], 'nonzero'));
    expect(r).toHaveLength(2);
    expect(areaOf(r)).toBe(2_000_000);
  });

  it('two squares sharing a side unite as one face (the shared side removed)', () => {
    const r = rings(booleans('union', [rect(0, 0, 1000, 1000)], [rect(1000, 0, 2000, 1000)], 'nonzero'));
    expect(r).toEqual([rect(0, 0, 2000, 1000)]);
  });

  it('nonzero fills a doubly wound region, evenodd leaves it out (one operand of two overlapping rings)', () => {
    const a = [rect(0, 0, 2000, 2000), rect(1000, 1000, 3000, 3000)];
    const nz = rings(booleans('union', a, [], 'nonzero'));
    expect(areaOf(nz)).toBe(7_000_000);
    const eo = rings(booleans('union', a, [], 'evenodd'));
    expect(areaOf(eo)).toBe(6_000_000);
  });

  it('a clockwise ring winds −1: nonzero keeps it, and it cancels a counter-clockwise copy of itself', () => {
    const cw = rect(0, 0, 1000, 1000).reverse();
    expect(areaOf(rings(booleans('union', [cw], [], 'nonzero')))).toBe(1_000_000);
    const cancel = booleans('union', [cw, rect(0, 0, 1000, 1000)], [], 'nonzero');
    expect(cancel.ok).toBe(false);
  });

  it('rings come out in canonical order: by start vertex (lowest-leftmost), the outer ring before its hole', () => {
    expect(rings(booleans('union', [rect(1000, 1000, 2000, 2000)], [rect(0, 0, 1000, 1000)], 'nonzero'))).toEqual([rect(0, 0, 1000, 1000), rect(1000, 1000, 2000, 2000)]);
    expect(rings(booleans('difference', [rect(0, 0, 3000, 3000)], [rect(1000, 1000, 2000, 2000)], 'nonzero'))).toEqual([
      rect(0, 0, 3000, 3000),
      R([1000, 1000], [1000, 2000], [2000, 2000], [2000, 1000]),
    ]);
  });

  it('a ring that encloses one inserted before it takes it as its hole (the scratch frame, C-0196 (1))', () => {
    expect(rings(booleans('union', [rect(1000, 1000, 2000, 2000)], [rect(0, 0, 3000, 3000)], 'nonzero'))).toEqual([rect(0, 0, 3000, 3000)]);
    expect(booleans('difference', [rect(1000, 1000, 2000, 2000)], [rect(0, 0, 3000, 3000)], 'nonzero')).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    const hole = rings(booleans('difference', [rect(0, 0, 3000, 3000)], [rect(1000, 1000, 2000, 2000)], 'evenodd'));
    expect(areaOf(hole)).toBe(8_000_000);
  });

  it('a run of sub-minEdge segments spanning minEdge or more is bridged, so the ring stays closed (C-0196 (1))', () => {
    // the left side runs down from (0, 1000) in 10 cm steps to (0, 960): each step collapses alone, the run spans 40 cm
    const stair = R([0, 0], [1000, 0], [1000, 1000], [0, 1000], [0, 990], [0, 980], [0, 970], [0, 960]);
    const r = rings(booleans('union', [stair], [], 'nonzero'));
    expect(r).toEqual([rect(0, 0, 1000, 1000)]);
  });

  it('a hole touching its outline inside an outline edge: the touch point is a vertex of both rings (C-0206 (1))', () => {
    // the hole's vertex (1000, 2000) lies on the outline's bottom edge (0, 2000)–(2000, 2000)… of a ring whose own
    // vertices skip it: the outer ring keeps it, so the two rings meet at a shared vertex (a touch inside an edge is
    // what an oracle such as polygon-clipping refuses as a ring)
    const outer = R([0, 0], [2000, 0], [2000, 2000], [0, 2000]);
    const hole = R([1000, 2000], [500, 1000], [1500, 1000]);
    // the hole given either way round (its edges then lie on the overlay's even or its odd half-edges)
    for (const [fill, b] of [['evenodd', hole.slice().reverse()], ['nonzero', hole.slice().reverse()], ['nonzero', hole]] as const) {
      const r = rings(booleans('difference', [outer], [b], fill));
      expect(r).toEqual([R([0, 0], [2000, 0], [2000, 2000], [1000, 2000], [0, 2000]), R([500, 1000], [1000, 2000], [1500, 1000])]);
      expect(areaOf(r)).toBe(4_000_000 - 500_000);
    }
    // two faces touching at a point inside an edge: a diamond's corner on the square's right side
    const touching = rings(booleans('union', [rect(0, 0, 1000, 1000)], [R([1000, 500], [1500, 0], [2000, 500], [1500, 1000])], 'nonzero'));
    expect(touching).toEqual([R([0, 0], [1000, 0], [1000, 500], [1000, 1000], [0, 1000]), R([1500, 0], [2000, 500], [1500, 1000], [1000, 500])]);
    // an xor where a's hole touches a's outline at (−227, 237), inside the edge (4943, −2326)–(−4457, 2334)
    const a = [
      R([4943, -2326], [-4457, 2334], [-9920, 1893], [-13586, -4727], [-17800, -11712], [-8407, -16825], [-1636, -14164], [1813, -10947]),
      R([-2426, -2515], [-3897, -1832], [-1984, -670], [-227, 237], [-864, -752]),
    ];
    const b = [R([8315, 36111], [7858, 36301], [7685, 36300], [7508, 36299], [7653, 36074], [7671, 36007], [7736, 35765], [8063, 35798], [8253, 36034])];
    const x = rings(booleans('xor', a, b, 'evenodd'));
    expect(x).toHaveLength(3);
    expect(x[0]).toContainEqual(pt(-227, 237));
    expect(x[1]).toContainEqual(pt(-227, 237));
    expect(areaOf(x)).toBe(areaOf([a[0]]) - Math.abs(areaOf([a[1]])) + areaOf(b));
  });

  it('a ring given with repeated points (a doubled vertex, the closing point repeated) is the ring without them: the same result, no warning', () => {
    // the overlay reads each ring without consecutive repeats (geom/common.ts distinctRing); a repeat entered as a
    // segment of one point would collapse and report a move that never happened
    const clean = rect(0, 0, 1000, 1000);
    const repeated = R([0, 0], [1000, 0], [1000, 0], [1000, 1000], [0, 1000], [0, 0]);
    const B = [rect(500, 500, 1500, 1500)];
    for (const op of ['union', 'difference'] as const) {
      const want = booleans(op, [clean], B, 'nonzero');
      expect(want).toMatchObject({ ok: true, warnings: [] });
      expect(booleans(op, [repeated], B, 'nonzero')).toEqual(want);
    }
  });

  it('a self-crossing bow-tie: both lobes under either rule', () => {
    const bow = R([0, 0], [2000, 2000], [2000, 0], [0, 2000]);
    const nz = rings(booleans('union', [bow], [], 'nonzero'));
    expect(nz).toHaveLength(2);
    expect(areaOf(nz)).toBe(2_000_000);
  });
});

describe('the winding labels', () => {
  it('label nested squares 1 and 2, the outside 0, consistently', () => {
    const ov = buildOverlay([[rect(0, 0, 3000, 3000), rect(1000, 1000, 2000, 2000)]]);
    expect(ov.ok).toBe(true);
    if (!ov.ok) return;
    const labels = windingLabels(ov.value);
    expect(labels.consistent).toBe(true);
    // the outside and the scratch frame's inside 0, the ring and the nested square 1 and 2
    const values = [...new Set([...labels.winding.values()].map((w) => w[0]))].sort();
    expect(values).toEqual([0, 1, 2]);
    expect(labels.winding.get(-1)).toEqual([0]);
  });
});

describe('the overlay’s shortest path breaks ties by lattice point, never by slot (§3.3)', () => {
  /** The vertex points of the shortest path between two lattice points of the overlay of `ops`. */
  function pathPoints(ops: LatticePoint[][][], from: LatticePoint, to: LatticePoint): string[] {
    const ov = buildOverlay(ops);
    if (!ov.ok) throw new Error(`refused: ${ov.code}`);
    const p = ov.value.plat;
    const O = p.halfEdges.origin;
    const X = p.vertices.x;
    const Y = p.vertices.y;
    const at = (q: LatticePoint): number => {
      for (let h = 0; h < 2 * p.slots.pair.top; h += 1) if (isHalfEdgeLive(p, h) && X[O[h]] === q.x && Y[O[h]] === q.y) return O[h];
      throw new Error('no vertex there');
    };
    const path = shortestPath(p, at(from), at(to));
    const name = (v: number): string => `${String(X[v])},${String(Y[v])}`;
    return path.length === 0 ? [] : [...path.map((h) => name(O[h])), name(O[path[path.length - 1] ^ 1])];
  }
  const rotations = (r: LatticePoint[]): LatticePoint[][] => [...r.map((_, i) => [...r.slice(i), ...r.slice(0, i)]), ...r.map((_, i) => [...r.slice(i), ...r.slice(0, i)].reverse())];

  it('two equal paths round a square: the one through the lower-left vertex (y, then x), whatever the ring’s start and direction', () => {
    for (const ring of rotations(rect(0, 0, 1000, 1000))) {
      expect(pathPoints([[ring]], pt(0, 0), pt(1000, 1000))).toEqual(['0,0', '1000,0', '1000,1000']);
      expect(pathPoints([[ring]], pt(1000, 1000), pt(0, 0))).toEqual(['1000,1000', '1000,0', '0,0']);
      expect(pathPoints([[ring]], pt(1000, 0), pt(0, 1000))).toEqual(['1000,0', '0,0', '0,1000']);
    }
  });

  it('on a grid of equal squares the path is the same whatever order the squares were inserted in', () => {
    const squares: LatticePoint[][] = [];
    for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) squares.push(rect(300 * i, 300 * j, 300 * (i + 1), 300 * (j + 1)));
    const want = pathPoints([squares], pt(0, 0), pt(900, 900));
    expect(want).toHaveLength(7);
    for (const order of [squares.slice().reverse(), [...squares.slice(4), ...squares.slice(0, 4)], squares.map((s) => s.slice().reverse())]) {
      expect(pathPoints([order], pt(0, 0), pt(900, 900))).toEqual(want);
    }
  });
});

describe('the kept boundary’s trace helpers (simpleLoops, dropStraight; C-0206 (1))', () => {
  it('simpleLoops cuts a closed walk at every vertex it visits twice, each loop in walk order', () => {
    expect(simpleLoops([1, 2, 3, 1, 4, 5])).toEqual([[1, 2, 3], [1, 4, 5]]);
    expect(simpleLoops([1, 2, 3, 4, 2, 5])).toEqual([[2, 3, 4], [1, 2, 5]]);
    expect(simpleLoops([7, 8, 9])).toEqual([[7, 8, 9]]);
  });

  it('dropStraight drops straight-through vertices until none is left, never one keep names, and never a reversal', () => {
    const square = R([0, 0], [500, 0], [1000, 0], [1000, 400], [1000, 1000], [0, 1000]);
    expect(dropStraight(square, () => false)).toEqual(rect(0, 0, 1000, 1000));
    expect(dropStraight(square, (q) => q.x === 500 && q.y === 0)).toEqual(R([0, 0], [500, 0], [1000, 0], [1000, 1000], [0, 1000]));
    // a fold-back is no straight-through vertex: (1000, 0) → (500, 0) turns round at (1000, 0)
    const spike = R([0, 0], [1000, 0], [500, 0], [500, 500]);
    expect(dropStraight(spike, () => false)).toEqual(spike);
  });
});

// The overlay's stages pinned on inputs built for them (C-0196 (1); C-0365): no drawn input reaches `glueWalks` or
// `balanceFlow`, and `balanceFlow` cancels an off-path flow `orientSegments` would add, so each stage is called here on
// a scratch arena and its own output read — the net before balancing included. The flows are read along named lattice
// points, never by slot.
describe('the overlay’s stages on inputs built to reach them (C-0196 (1))', () => {
  /** A scratch arena as `buildOverlay` makes it: L0, 2²⁴ cm wide, no table, an open insertion transaction. */
  function scratch(): InsertTx {
    const plat = createPlat({ layer: 'ground', part: 0 }, { widthCm: (2 * LATTICE.rangeCm) as Cm, heightCm: (2 * LATTICE.rangeCm) as Cm, aspect: 1, marginShare: 0 });
    attachIndex(plat, { gridCellCm: 64 });
    return insertTx(plat, 0);
  }
  /** The overlay's vertex at a lattice point. */
  function vertexAt(p: Plat, q: LatticePoint): VertexId {
    const O = p.halfEdges.origin;
    for (let h = 0; h < 2 * p.slots.pair.top; h += 1) if (isHalfEdgeLive(p, h) && p.vertices.x[O[h]] === q.x && p.vertices.y[O[h]] === q.y) return O[h];
    throw new Error(`no vertex at ${String(q.x)}, ${String(q.y)}`);
  }
  /** The live edge pair joining u and v, and whether its even half-edge leaves u. */
  function pairOf(p: Plat, u: VertexId, v: VertexId): { e: number; fromU: boolean } {
    const O = p.halfEdges.origin;
    for (let e = 0; e < p.slots.pair.top; e += 1) {
      if (!isHalfEdgeLive(p, 2 * e)) continue;
      if (O[2 * e] === u && O[2 * e + 1] === v) return { e, fromU: true };
      if (O[2 * e] === v && O[2 * e + 1] === u) return { e, fromU: false };
    }
    throw new Error('no edge there');
  }
  /** Operand 0's net traversals from u to v (one operand; never −0). */
  function flow(p: Plat, net: Int32Array, u: VertexId, v: VertexId): number {
    const { e, fromU } = pairOf(p, u, v);
    return fromU ? net[e] : 0 - net[e];
  }
  /** Sets operand 0's net from u to v (one operand). */
  function put(p: Plat, net: Int32Array, u: VertexId, v: VertexId, n: number): void {
    const { e, fromU } = pairOf(p, u, v);
    net[e] = fromU ? n : -n;
  }
  /** Operand 0's flow out of each vertex less its flow in, the vertices where it is not 0 (one operand). */
  function divergence(p: Plat, net: Int32Array): Map<string, number> {
    const O = p.halfEdges.origin;
    const out = new Map<string, number>();
    const name = (v: VertexId): string => `${String(p.vertices.x[v])},${String(p.vertices.y[v])}`;
    for (let e = 0; e < p.slots.pair.top; e += 1) {
      if (!isHalfEdgeLive(p, 2 * e) || net[e] === 0) continue;
      out.set(name(O[2 * e]), (out.get(name(O[2 * e])) ?? 0) + net[e]);
      out.set(name(O[2 * e + 1]), (out.get(name(O[2 * e + 1])) ?? 0) - net[e]);
    }
    for (const [k, n] of [...out]) if (n === 0) out.delete(k);
    return out;
  }
  /** The overlay of one square ring and its four corners' vertices (lower-left, lower-right, upper-right, upper-left). */
  function squareOverlay(): { p: Plat; v: [VertexId, VertexId, VertexId, VertexId] } {
    const ov = buildOverlay([[rect(0, 0, 1000, 1000)]]);
    if (!ov.ok) throw new Error(`refused: ${ov.code}`);
    const p = ov.value.plat;
    return { p, v: [vertexAt(p, pt(0, 0)), vertexAt(p, pt(1000, 0)), vertexAt(p, pt(1000, 1000)), vertexAt(p, pt(0, 1000))] };
  }

  it('orientSegments: a segment’s edges off its one path carry nothing — the net before glueWalks and balanceFlow', () => {
    // one segment A → C whose row lies on A–B–C and on a spur B–D (an antenna attraction could leave): the spur nets 0
    const tx = scratch();
    const [A, B, C, D] = [pt(0, 0), pt(1000, 0), pt(1000, 1000), pt(2000, -500)];
    const path = insertChain(tx, [A, B, C], [{ role: 'invisible', entity: 'arr:s0' }], 'mandatory');
    const spur = insertChain(tx, [B, D], [{ role: 'invisible', entity: 'arr:s0' }], 'mandatory');
    expect(path.ok && spur.ok).toBe(true);
    if (!path.ok) return;
    const p = tx.plat;
    const segments: Segment[] = [{ a: A, b: C, mult: Int32Array.of(1) }];
    const net = orientSegments(p, segments, [path.value.placed[0]], [path.value.placed[path.value.placed.length - 1]], 1);
    const [a, b, c, d] = [A, B, C, D].map((q) => vertexAt(p, q));
    expect([flow(p, net, a, b), flow(p, net, b, c), flow(p, net, b, d)]).toEqual([1, 1, 0]);
    expect(divergence(p, net)).toEqual(new Map([['0,0', 1], ['1000,1000', -1]]));
    // a reversed repeat of the segment (multiplicity −1) reverses the flow on the same path, the spur still 0
    const back = orientSegments(p, [{ a: A, b: C, mult: Int32Array.of(-1) }], [path.value.placed[0]], [path.value.placed[path.value.placed.length - 1]], 1);
    expect([flow(p, back, a, b), flow(p, back, b, c), flow(p, back, b, d)]).toEqual([-1, -1, 0]);
  });

  it('glueWalks: a gap in a ring’s walk is closed by the shortest overlay path, its tie decided by lattice point', () => {
    const { p, v } = squareOverlay();
    const [ll, lr, ur, ul] = v;
    const pairs = p.slots.pair.top;
    // a walk of two segments, ll → lr and ur → ul: the gaps lr → ur and ul → ll are glued along the square's sides
    const net = new Int32Array(pairs);
    glueWalks(p, [{ operand: 0, steps: [1, 2] }], [ll, ur], [lr, ul], 1, net);
    expect([flow(p, net, lr, ur), flow(p, net, ul, ll), flow(p, net, ll, lr), flow(p, net, ur, ul)]).toEqual([1, 1, 0, 0]);
    // a gap across the diagonal, ll → ur: two equal paths, the one through the lower-left of the two middles (lr, y 0)
    const tie = new Int32Array(pairs);
    glueWalks(p, [{ operand: 0, steps: [1, 2] }], [ul, ur], [ll, ul], 1, tie);
    expect([flow(p, tie, ll, lr), flow(p, tie, lr, ur), flow(p, tie, ll, ul), flow(p, tie, ul, ur)]).toEqual([1, 1, 0, 0]);
    // a closed walk adds nothing
    const closed = new Int32Array(pairs);
    glueWalks(p, [{ operand: 0, steps: [1, 2] }], [ll, ur], [ur, ll], 1, closed);
    expect(closed.every((n) => n === 0)).toBe(true);
  });

  it('balanceFlow: a source and a sink in one piece are joined by the shortest path, so the divergence is 0 everywhere', () => {
    const { p, v } = squareOverlay();
    const [ll, lr, ur, ul] = v;
    // a flow ll → lr → ur that stops at ur: the surplus returns ur → ll along the tie-decided path, through lr (y 0)
    const net = new Int32Array(p.slots.pair.top);
    put(p, net, ll, lr, 1);
    put(p, net, lr, ur, 1);
    expect(divergence(p, net)).toEqual(new Map([['0,0', 1], ['1000,1000', -1]]));
    balanceFlow(p, 1, net);
    expect(divergence(p, net)).toEqual(new Map());
    expect([flow(p, net, ll, lr), flow(p, net, lr, ur), flow(p, net, ur, ul), flow(p, net, ul, ll)]).toEqual([0, 0, 0, 0]);
    // a flow round the square already balanced is left as it is
    const loop = new Int32Array(p.slots.pair.top);
    for (const [u, w] of [[ll, lr], [lr, ur], [ur, ul], [ul, ll]] as const) put(p, loop, u, w, 1);
    balanceFlow(p, 1, loop);
    expect([flow(p, loop, ll, lr), flow(p, loop, lr, ur), flow(p, loop, ur, ul), flow(p, loop, ul, ll)]).toEqual([1, 1, 1, 1]);
  });

  it('bridgeGaps splices each bridge into the walk, so the ring stays one closed walk of inserted edges', () => {
    // the overlay's insertions as buildOverlay makes them for one ring: the frame, then each segment in ring order
    const RIGHT: [number, number][] = Array.from({ length: 10 }, (_, i) => [1000, 10 * (i + 1)]);
    const ring = R([0, 0], [1000, 0], ...RIGHT, [1000, 1000], [0, 1000], [0, 990], [0, 980], [0, 970], [0, 960]);
    const tx = scratch();
    const f = insertChain(tx, [pt(-4096, -4096), pt(5096, -4096), pt(5096, 5096), pt(-4096, 5096)], [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true });
    expect(f.ok).toBe(true);
    const segments: Segment[] = [];
    const starts: VertexId[] = [];
    const ends: VertexId[] = [];
    for (let s = 0; s < ring.length; s += 1) {
      const a = ring[s];
      const b = ring[(s + 1) % ring.length];
      segments.push({ a, b, mult: Int32Array.of(1) });
      const r = insertChain(tx, [a, b], [{ role: 'invisible', entity: `arr:s${String(s)}` }], 'mandatory');
      starts.push(r.ok ? r.value.placed[0] : -1);
      ends.push(r.ok ? r.value.placed[r.value.placed.length - 1] : -1);
    }
    const walk: Walk = { operand: 0, steps: segments.map((_, s) => s + 1) };
    expect(bridgeGaps(tx, segments, [walk], starts, ends, 1)).toBeNull();
    // segments 1 – 10 and 13 – 16 collapsed; the bridges are segments 18 ((1000, 0) → (1000, 100)) and 19 ((0, 1000) → (0, 960)),
    // each in the walk where its gap was
    expect(walk.steps).toEqual([1, 19, 12, 13, 20, 18]);
    expect(segments.slice(18).map((s) => [s.a, s.b])).toEqual([
      [pt(1000, 0), pt(1000, 100)],
      [pt(0, 1000), pt(0, 960)],
    ]);
    // every step of the walk ends on the vertex the next one starts on: glueWalks finds no gap and adds nothing
    const p = tx.plat;
    const net = orientSegments(p, segments, starts, ends, 1);
    const glued = net.slice();
    glueWalks(p, [walk], starts, ends, 1, glued);
    expect([...glued]).toEqual([...net]);
    expect(divergence(p, net)).toEqual(new Map());
  });

  it('traceKept: a kept boundary that does not close is E_INVARIANT, never a throw (§3.11)', () => {
    const ov = buildOverlay([[rect(0, 0, 1000, 1000)]]);
    expect(ov.ok).toBe(true);
    if (!ov.ok) return;
    const p = ov.value.plat;
    const keep = (w: readonly number[]): boolean => w[0] !== 0;
    expect(traceKept(ov.value, windingLabels(ov.value), keep)).toMatchObject({ ok: true, value: [rect(0, 0, 1000, 1000)] });
    // labels no valid overlay gives: one half-edge of the square kept on its left, every other slot unlabelled, so the
    // walk from it turns round its end vertex for ever
    const h0 = pairOf(p, vertexAt(p, pt(0, 0)), vertexAt(p, pt(1000, 0))).e * 2;
    const faceOf = new Int32Array(2 * p.slots.pair.top).fill(-2);
    faceOf[h0] = 0;
    faceOf[h0 ^ 1] = -1;
    const planted: WindingLabels = { operands: 1, faceOf, winding: new Map([[-1, [0]], [0, [1]]]), consistent: true };
    let r: ReturnType<typeof traceKept> | undefined;
    expect(() => {
      r = traceKept(ov.value, planted, keep);
    }).not.toThrow();
    expect(r).toEqual({ ok: false, code: 'E_INVARIANT', detail: 'arr: the kept boundary does not close' });
  });
});

describe('the empty result and the lattice door (§3.11)', () => {
  it('an empty boolean result is E_DEGENERATE empty', () => {
    const disjoint = booleans('intersection', [rect(0, 0, 1000, 1000)], [rect(2000, 0, 3000, 1000)], 'nonzero');
    expect(disjoint).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    const covered = booleans('difference', [rect(0, 0, 1000, 1000)], [rect(-10, -10, 1010, 1010)], 'nonzero');
    expect(covered).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    expect(booleans('union', [], [], 'evenodd')).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    expect('warnings' in disjoint).toBe(true);
  });

  it('an empty result attraction made carries the move (C-0196 (4)); one where nothing moved carries none', () => {
    const moves = (r: ReturnType<typeof booleans>): number =>
      ((r as { warnings?: { code: string; count: number }[] }).warnings ?? []).filter((w) => MOVES.includes(w.code)).reduce((s, w) => s + w.count, 0);
    // a 10 cm sliver, narrower than attractCm: its two sides are attracted together and nothing is left
    const sliver = booleans('intersection', [rect(0, 0, 1000, 1000)], [rect(990, 0, 2000, 1000)], 'nonzero');
    expect(sliver).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    expect(moves(sliver)).toBeGreaterThan(0);
    // a ring all of whose segments are shorter than minEdge collapses: the collapse alone is the move (C-0196 (1))
    const speck = booleans('union', [R([0, 0], [10, 0], [0, 10])], [], 'nonzero');
    expect(speck).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    expect(moves(speck)).toBeGreaterThan(0);
    const disjoint = booleans('intersection', [rect(0, 0, 1000, 1000)], [rect(2000, 0, 3000, 1000)], 'nonzero');
    expect(moves(disjoint)).toBe(0);
  });

  it('a coordinate off the lattice is E_OUT_OF_RANGE', () => {
    expect(booleans('union', [[pt(0, 0), pt(1.5, 0), pt(0, 10)]], [], 'nonzero')).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
    expect(booleans('union', [[pt(0, 0), pt(8_388_608, 0), pt(0, 10)]], [], 'nonzero')).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
  });
});

const MOVES = ['W_ATTRACTED', 'W_STRETCH_SHARED', 'W_WEDGE_ROUTED', 'W_PLACED'];

describe('a property over random rectangles (inclusion–exclusion within the split tolerance of §3.7)', () => {
  const box = fc
    .record({ x: fc.integer({ min: -5000, max: 5000 }), y: fc.integer({ min: -5000, max: 5000 }), w: fc.integer({ min: 100, max: 4000 }), h: fc.integer({ min: 100, max: 4000 }) })
    .map(({ x, y, w, h }) => rect(x, y, x + w, y + h));
  it('area(A ∪ B) + area(A ∩ B) = area(A) + area(B), and xor = union − intersection', { timeout: TIMEOUT }, () => {
    fc.assert(
      fc.property(box, box, (a, b) => {
        let moved = false;
        const area = (r: ReturnType<typeof booleans>): number => {
          const ws = r.ok ? r.warnings : 'warnings' in r ? (r as { warnings: { code: string; count: number }[] }).warnings : [];
          if (ws.some((w) => MOVES.includes(w.code) && w.count > 0)) moved = true;
          return r.ok ? areaOf(r.value) : 0;
        };
        const u = area(booleans('union', [a], [b], 'nonzero'));
        const i = area(booleans('intersection', [a], [b], 'nonzero'));
        const x = area(booleans('xor', [a], [b], 'nonzero'));
        const d = area(booleans('difference', [a], [b], 'nonzero'));
        // unattracted: 1 cm per cm of perimeter; attracted: √2 · attractCm (§3.7), each of the three sums at most twice
        const tol = perimeterOf([a, b]) * (moved ? 2 * Math.SQRT2 * 26 : 1);
        return Math.abs(u + i - areaOf([a]) - areaOf([b])) <= tol && Math.abs(x - (u - i)) <= tol && Math.abs(d - (u - areaOf([b]))) <= tol;
      }),
      { numRuns: 500 },
    );
  });
});

/** The winding number of a closed ring about (x, y) (doubles; the ring as drawn, crossings and all). */
function windingAt(ring: readonly LatticePoint[], x: number, y: number): number {
  let w = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    const side = (b.x - a.x) * (y - a.y) - (x - a.x) * (b.y - a.y);
    if (a.y <= y && b.y > y && side > 0) w += 1;
    else if (a.y > y && b.y <= y && side < 0) w -= 1;
  }
  return w;
}

describe('a retraced spur on a segment row nets nothing (the spec note N-41 (3); C-0196 (1))', () => {
  // The seven-segment ring of C-0205 (3): its seventh segment s6, A (−48140, 46382) → B (−48863, 44833),
  // commits through the endpoint route as A–P–Q–P–R–B: out along P–Q, an edge s4 also carries, and back. The winding
  // walk reads a segment's row as the one path from its first vertex to its last, so the spur nets 0 for s6 — a row
  // that traverses an edge out and back is lawful (N-41 (3)), and the region is the one s6's plain path A–P–R–B bounds.
  const RING = R([-48863, 44833], [-48080, 46354], [-48522, 45607], [-48031, 46325], [-48468, 45739], [-47267, 47616], [-48140, 46382]);
  const P = pt(-48450, 45728);
  const Q = pt(-48389, 45801);

  it('s6 walks out along P–Q and back; that edge carries s4’s flow alone and the labels stay consistent', () => {
    const ov = buildOverlay([[RING]]);
    expect(ov.ok).toBe(true);
    if (!ov.ok) return;
    const p = ov.value.plat;
    const O = p.halfEdges.origin;
    const X = p.vertices.x;
    const Y = p.vertices.y;
    const role = roleIdOf('invisible');
    const rowsOfPair = (e: number): number[] =>
      [...rowsOn(p, 'edge', 2 * e)].filter((r) => p.roles.kind[r] === role).map((r) => p.roles.entity[r]);
    const at = (v: number, q: LatticePoint): boolean => X[v] === q.x && Y[v] === q.y;
    let spur = -1;
    const s6Degree = new Map<string, number>();
    for (let e = 0; e < p.slots.pair.top; e += 1) {
      if (!isHalfEdgeLive(p, 2 * e)) continue;
      const rows = rowsOfPair(e);
      if (!rows.includes(handleOf(p, 'arr:s6'))) continue;
      for (const v of [O[2 * e], O[2 * e + 1]]) s6Degree.set(`${String(X[v])},${String(Y[v])}`, (s6Degree.get(`${String(X[v])},${String(Y[v])}`) ?? 0) + 1);
      if ((at(O[2 * e], P) && at(O[2 * e + 1], Q)) || (at(O[2 * e], Q) && at(O[2 * e + 1], P))) {
        spur = e;
        expect(rows).toContain(handleOf(p, 'arr:s4'));
      }
    }
    // the precondition (C-0205 (3)): s6's edges form a path with a spur — Q is a dead end of s6's row
    expect(spur).toBeGreaterThanOrEqual(0);
    expect(s6Degree.get(`${String(Q.x)},${String(Q.y)}`)).toBe(1);
    expect(s6Degree.get(`${String(P.x)},${String(P.y)}`)).toBe(3);
    // s4 runs P → Q once; s6's out-and-back adds nothing (counting both traversals would add ±2, or ±1 for one)
    const sgn = at(O[2 * spur], P) ? 1 : -1;
    expect(sgn * ov.value.net[spur]).toBe(1);
    expect(windingLabels(ov.value).consistent).toBe(true);
  });

  it('the ring’s region under either fill rule: valid rings within §3.7’s attracted bound of the ring as drawn', () => {
    for (const fill of ['nonzero', 'evenodd'] as const) {
      const r = rings(booleans('union', [RING], [], fill));
      expect(r.every(simpleRing)).toBe(true);
      // |ours Δ the ring's region| on a 4 cm grid over the box (the ring's own winding numbers, not our engine's)
      const step = 4;
      let diff = 0;
      for (let x = -48863 + step / 2; x < -47267; x += step) {
        for (let y = 44833 + step / 2; y < 47616; y += step) {
          const w = windingAt(RING, x, y);
          const want = fill === 'nonzero' ? w !== 0 : (w & 1) !== 0;
          if (want !== insideRings(r, x, y)) diff += step * step;
        }
      }
      const bound = (perimeterOf([RING]) + perimeterOf(r)) * Math.SQRT2 * LATTICE.attractCm;
      expect(diff).toBeGreaterThan(0); // the case is attracted: something moved
      expect(diff).toBeLessThanOrEqual(bound);
    }
  });
});
