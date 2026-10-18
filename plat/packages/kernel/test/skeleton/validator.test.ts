// M0-a-11: §3.8's post-condition validator — "every skeleton result is checked before any use" — judged by negative
// controls: each of its four checks rejects a valid skeleton corrupted the way that check guards against (an arc
// crossing another or leaving the face; a face left open, branched or carried on the wrong side; a node off its
// height or a pit; a node with no arc), and a malformed graph returns a typed failure, never a throw. The positive side
// is every skeleton the other tests return (each passed the validator inside skeleton()).
import { describe, expect, it } from 'vitest';
import { skeleton, validateSkeleton, type SkeletonGraph, type ValidatorCheck } from '../../src/skeleton/index.js';
import { pitOf } from '../../src/skeleton/validate.js';
import type { LatticePoint } from '../../src/types/index.js';
import { pt } from './support.js';

const L = [pt(0, 0), pt(2_000, 0), pt(2_000, 500), pt(500, 500), pt(500, 2_000), pt(0, 2_000)];
const BAND = [
  [pt(0, 0), pt(3_000, 0), pt(3_000, 3_000), pt(0, 3_000)],
  [pt(1_000, 1_000), pt(2_000, 1_000), pt(2_000, 2_000), pt(1_000, 2_000)],
];

function graph(rings: LatticePoint[][]): SkeletonGraph {
  const r = skeleton(rings, 'spine');
  if (!r.ok || r.value.kind !== 'skeleton') throw new Error('expected a skeleton');
  return r.value;
}

/** A deep copy to corrupt. */
function copy(g: SkeletonGraph): SkeletonGraph {
  return JSON.parse(JSON.stringify(g)) as SkeletonGraph;
}

function fails(g: SkeletonGraph): ValidatorCheck {
  const v = validateSkeleton(g);
  if (v.ok) throw new Error('the corrupted graph validated');
  return v.check;
}

/** The interior node at (x, y). */
function at(g: SkeletonGraph, x: number, y: number): number {
  const i = g.nodes.findIndex((q, j) => j >= 6 && Math.abs(q.x - x) < 1e-6 && Math.abs(q.y - y) < 1e-6);
  if (i < 0) throw new Error(`no node at ${x}, ${y}`);
  return i;
}

describe('validateSkeleton: the valid outputs pass, with their faces', () => {
  it('the L and the band validate and return the faces skeleton() returned', () => {
    for (const rings of [[L], BAND]) {
      const g = graph(rings);
      expect(validateSkeleton(g)).toEqual({ ok: true, faces: g.faces });
    }
  });
});

describe('(1) planarity on millimetre-rounded nodes', () => {
  it('two nodes swapped make arcs cross', () => {
    const g = copy(graph([L]));
    const a = at(g, 250, 250);
    const b = at(g, 1_750, 250);
    const tmp = g.nodes[a];
    g.nodes[a] = { ...g.nodes[b], t: tmp.t };
    g.nodes[b] = { ...tmp, t: g.nodes[b].t };
    expect(fails(g)).toBe('planarity');
  });

  it('a node moved out of the face, or into the hole', () => {
    const g = copy(graph([L]));
    g.nodes[at(g, 1_750, 250)].y = -300;
    expect(fails(g)).toBe('planarity');
    const h = copy(graph(BAND));
    const k = h.nodes.findIndex((q, j) => j >= 8 && q.x === 500 && q.y === 500);
    h.nodes[k] = { x: 1_200, y: 1_300, t: h.nodes[k].t };
    expect(fails(h)).toBe('planarity');
  });

  it('an arc doubled along another (a collinear overlap) is a conflict', () => {
    const g = copy(graph([L]));
    g.arcs.push({ ...g.arcs[g.arcs.length - 1] });
    expect(fails(g)).toBe('planarity');
  });
});

describe('(2) one face per input edge, monotone, covering', () => {
  it('an arc’s faces swapped is a face on the wrong side', () => {
    const g = copy(graph([L]));
    const e = g.arcs[0];
    g.arcs[0] = { ...e, left: e.right, right: e.left };
    expect(fails(g)).toBe('faces');
  });

  it('an arc removed leaves its faces open', () => {
    const g = copy(graph([L]));
    g.arcs.pop();
    expect(fails(g)).toBe('faces');
  });

  it('an arc relabelled with a third face branches or opens a face', () => {
    const g = copy(graph(BAND));
    g.arcs[0] = { ...g.arcs[0], left: (g.arcs[0].left + 3) % 8 === g.arcs[0].right ? (g.arcs[0].left + 2) % 8 : (g.arcs[0].left + 3) % 8 };
    expect(fails(g)).toBe('faces');
  });
});

describe('(3) heights consistent and no pit', () => {
  it('a node 2 cm off its time', () => {
    const g = copy(graph([L]));
    g.nodes[at(g, 250, 1_750)].t += 2;
    expect(fails(g)).toBe('heights');
  });

  it('an interior node at time 0, and a non-finite one', () => {
    const g = copy(graph([L]));
    g.nodes[at(g, 250, 250)].t = 0;
    expect(fails(g)).toBe('heights');
    const h = copy(graph([L]));
    h.nodes[at(h, 250, 250)].x = Number.NaN;
    expect(fails(h)).toBe('heights');
  });

  it('a pit: a node every neighbour of which is higher by more than 1 mm, reached from no input vertex', () => {
    // input vertices 0, 1; nodes 2 (t 5) and 3 (t 4.8): 3 hangs below 2 only
    const nodes = [
      { t: 0 },
      { t: 0 },
      { t: 5 },
      { t: 4.8 },
    ];
    expect(pitOf(nodes, [{ a: 0, b: 2 }, { a: 1, b: 2 }, { a: 2, b: 3 }], 2)).toBe(3);
    // within the 1 mm step it is reached
    nodes[3].t = 4.95;
    expect(pitOf(nodes, [{ a: 0, b: 2 }, { a: 1, b: 2 }, { a: 2, b: 3 }], 2)).toBe(-1);
    // and every valid skeleton has none
    for (const rings of [[L], BAND]) {
      const g = graph(rings);
      expect(pitOf(g.nodes, g.arcs, g.rings.reduce((s, r) => s + r.length, 0))).toBe(-1);
    }
  });
});

describe('(4) connected, one arc per input vertex, h cycles', () => {
  it('an interior node with no arc', () => {
    const g = copy(graph([L]));
    g.nodes.push({ x: 300, y: 300, t: 250 });
    expect(fails(g)).toBe('topology');
  });
});

describe('a malformed graph is a typed failure, never a throw', () => {
  it('no rings, too few nodes, an arc out of range or onto itself, a face label out of range', () => {
    const g = graph([L]);
    expect(fails({ ...copy(g), rings: [] })).toBe('topology');
    expect(fails({ ...copy(g), nodes: g.nodes.slice(0, 3) })).toBe('topology');
    const a = copy(g);
    a.arcs[0] = { ...a.arcs[0], b: 999 };
    expect(fails(a)).toBe('topology');
    const b = copy(g);
    b.arcs[0] = { ...b.arcs[0], b: b.arcs[0].a };
    expect(fails(b)).toBe('topology');
    const c = copy(g);
    c.arcs[0] = { ...c.arcs[0], left: 77 };
    expect(fails(c)).toBe('faces');
    const d = copy(g);
    d.nodes[0] = { x: 1, y: 0, t: 0 };
    expect(fails(d)).toBe('heights');
  });
});
