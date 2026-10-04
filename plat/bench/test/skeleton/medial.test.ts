// M0-a-12 (fix round 1; C-0176): the sampled medial axis over the whole committed corpus — the footprints §3.8 sends to
// the skeleton, whose `spine` downgrade the axis is. Every face is resolved, connected and has exactly one independent
// cycle per hole (C-0176 (2), (3)): the pruning works from the leaves only, so it never splits a face — the replaced rule
// (C-0172 (5)), which cut every arc failing the ratio wherever it lay, split 216 of these 2 000 faces into two or three
// pieces (notched 92, quad 81, rectilinear 33, irregular 6, compound 4). Judged by references written here from their
// definitions (components and independent cycles; even–odd containment), never with the code under test.
import { medialAxis, MEDIAL_STEP_CM, type MedialAxis, type Polygon } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { loadCorpus } from '../../src/skeleton/index.js';

const TIMEOUT = 600_000;

/** A graph's connected components and its independent cycles (arcs − nodes + components). */
function topology(axis: MedialAxis): { components: number; cycles: number } {
  const parent = axis.nodes.map((_, i) => i);
  const find = (i: number): number => {
    let r = i;
    while (parent[r] !== r) r = parent[r];
    return r;
  };
  for (const { a, b } of axis.arcs) parent[find(a)] = find(b);
  const roots = new Set(axis.nodes.map((_, i) => find(i)));
  return { components: roots.size, cycles: axis.arcs.length - axis.nodes.length + roots.size };
}

/** Even–odd containment over every ring by a ray to +x (a point on an edge never arises here: nodes keep ≥ 1 cm). */
function insideEvenOdd(rings: readonly Polygon[], x: number, y: number): boolean {
  let odd = false;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      if (a.y > y === b.y > y) continue;
      if (a.x + ((y - a.y) * (b.x - a.x)) / (b.y - a.y) > x) odd = !odd;
    }
  }
  return odd;
}

function axisOf(rings: readonly Polygon[]): MedialAxis {
  const r = medialAxis(rings, MEDIAL_STEP_CM);
  if (!r.ok) throw new Error(`medialAxis refused: ${r.code} ${r.detail}`);
  return r.value;
}

describe('the sampled medial axis over the committed corpus (C-0176): never split by the pruning, one cycle per hole', () => {
  it(
    'every one of the 2 000 footprints: resolved, connected, exactly h independent cycles for its h holes, every node inside',
    () => {
      const corpus = loadCorpus();
      expect(corpus.faces.length).toBe(2000);
      let holed = 0;
      for (const [i, rings] of corpus.faces.entries()) {
        const axis = axisOf(rings);
        const label = `face ${i} (${corpus.familyNames[corpus.families[i]]})`;
        expect(axis.resolved, label).toBe(true);
        expect(axis.nodes.length, label).toBeGreaterThan(0);
        expect(topology(axis), label).toEqual({ components: 1, cycles: rings.length - 1 });
        for (const n of axis.nodes) expect(insideEvenOdd(rings, n.x, n.y), label).toBe(true);
        if (rings.length > 1) holed += 1;
      }
      // the courtyards: one hole each (C-0172 (8)'s 10 % family)
      expect(holed).toBeGreaterThan(150);
    },
    TIMEOUT,
  );

  it('face 9, a notched footprint the replaced rule split into three pieces (27 nodes, 24 arcs), is one tree', () => {
    const corpus = loadCorpus();
    expect(corpus.familyNames[corpus.families[9]]).toBe('notched');
    const axis = axisOf(corpus.faces[9]);
    expect(topology(axis)).toEqual({ components: 1, cycles: 0 });
    expect(axis.arcs.length).toBe(axis.nodes.length - 1);
  });
});
