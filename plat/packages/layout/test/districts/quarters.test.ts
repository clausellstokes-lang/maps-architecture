// The quarter merge tree (M0-e-04; §4.5 *Quarters*; §9.1 `QuarterNode`): repeatedly merge the adjacent pair with the
// smallest cost — combined area + 1 000 ha across families + 10 000 ha across a wall or water barrier — until one root;
// ties by id; the cut at min(N_q, L) nodes (`cityCut`).
import { describe, expect, it } from 'vitest';
import { quarterTree, type QuarterAdjacency, type QuarterLeaf, type QuarterOptions } from '../../src/index.js';

const HA = 100_000_000;
const opts = (nq: number): QuarterOptions => ({ nq, familyCostHa: 1000, barrierCostHa: 10000, nodeId: (i) => `quarter:${String(i).padStart(3, '0')}` });
const leaf = (id: string, ha: number, family = 'craft'): QuarterLeaf => ({ id, areaCm2: ha * HA, family });
const chain = (n: number): QuarterAdjacency[] => Array.from({ length: n - 1 }, (_, i) => ({ a: i, b: i + 1, separated: false }));

describe('the quarter merge tree (§4.5, §9.1)', () => {
  it('one root over every district; 2L − 1 nodes, each internal one with two children whose members it unites', () => {
    const leaves = [leaf('district:a', 5), leaf('district:b', 7), leaf('district:c', 3), leaf('district:d', 9), leaf('district:e', 4)];
    const t = quarterTree(leaves, chain(5), opts(3));
    expect(t.nodes.length).toBe(9);
    expect(t.root?.members.slice().sort()).toEqual(leaves.map((l) => l.id).sort());
    const byId = new Map(t.nodes.map((n) => [n.id, n]));
    for (const n of t.nodes) {
      if (n.children === null) {
        expect(n.members.length).toBe(1);
        continue;
      }
      const [x, y] = n.children.map((c) => byId.get(c));
      expect([...(x?.members ?? []), ...(y?.members ?? [])].sort()).toEqual(n.members.slice().sort());
      expect(n.name).toBe('');
      expect(n.spine).toEqual([]);
    }
  });

  it('the cut at min(N_q, L): N_q nodes partitioning the districts; every district alone when N_q ≥ L', () => {
    const leaves = [leaf('district:a', 5), leaf('district:b', 7), leaf('district:c', 3), leaf('district:d', 9), leaf('district:e', 4)];
    for (const nq of [1, 2, 3, 4, 5, 9]) {
      const t = quarterTree(leaves, chain(5), opts(nq));
      const cut = t.nodes.filter((n) => n.cityCut);
      expect(cut.length).toBe(Math.min(nq, 5));
      expect(cut.flatMap((n) => n.members).sort()).toEqual(leaves.map((l) => l.id).sort());
      if (nq >= 5) expect(cut.every((n) => n.children === null)).toBe(true);
    }
  });

  it('the smallest combined area merges first', () => {
    // a – b – c – d: (b, c) has the smallest sum.
    const t = quarterTree([leaf('district:a', 10), leaf('district:b', 2), leaf('district:c', 3), leaf('district:d', 10)], chain(4), opts(1));
    expect(t.nodes[4].members).toEqual(['district:b', 'district:c']);
  });

  it('kinds of different families cost 1 000 ha more; a wall or water barrier between them 10 000 ha more', () => {
    // b (2 ha, gate) beside a (1 ha, craft) and c (500 ha, craft): without the family term (a, b) would merge first.
    const fam = quarterTree([leaf('district:a', 1, 'craft'), leaf('district:b', 2, 'gate'), leaf('district:c', 500, 'craft')], [{ a: 0, b: 2, separated: false }, { a: 1, b: 2, separated: false }, { a: 0, b: 1, separated: false }], opts(1));
    expect(fam.nodes[3].members).toEqual(['district:a', 'district:c']);
    // Same family across a barrier: (a, b) at 3 ha + 10 000 loses to (a, c) at 501 ha.
    const bar = quarterTree([leaf('district:a', 1), leaf('district:b', 2), leaf('district:c', 500)], [{ a: 0, b: 1, separated: true }, { a: 0, b: 2, separated: false }], opts(1));
    expect(bar.nodes[3].members).toEqual(['district:a', 'district:c']);
    // Different families at 1 500 ha beat a barrier at 3 ha + 10 000.
    const both = quarterTree([leaf('district:a', 1, 'core'), leaf('district:b', 2, 'core'), leaf('district:c', 1500, 'craft')], [{ a: 0, b: 1, separated: true }, { a: 0, b: 2, separated: false }], opts(1));
    expect(both.nodes[3].members).toEqual(['district:a', 'district:c']);
  });

  it('ties by id: equal costs merge the pair with the smaller node ids first', () => {
    const leaves = [leaf('district:c', 4), leaf('district:a', 4), leaf('district:b', 4)];
    const all: QuarterAdjacency[] = [{ a: 0, b: 1, separated: false }, { a: 1, b: 2, separated: false }, { a: 0, b: 2, separated: false }];
    const t = quarterTree(leaves, all, opts(1));
    // the leaves' nodes are quarter:000 (c), quarter:001 (a), quarter:002 (b): the pair (000, 001) is the smallest
    expect(t.nodes[3].members).toEqual(['district:a', 'district:c']);
    expect(t.nodes[3].children).toEqual(['quarter:000', 'quarter:001']);
    // the next tie (the merged node against b) is the only pair left
    expect(t.nodes[4].children).toEqual(['quarter:002', 'quarter:003']);
  });

  it('parts no adjacency joins merge last, at the barrier cost; an empty model has no root', () => {
    const t = quarterTree([leaf('district:a', 1), leaf('district:b', 1), leaf('district:c', 1), leaf('district:d', 1)], [{ a: 0, b: 1, separated: false }, { a: 2, b: 3, separated: false }], opts(1));
    expect(t.nodes.length).toBe(7);
    expect(t.nodes[6].members.length).toBe(4);
    expect(quarterTree([], [], opts(3))).toEqual({ root: null, nodes: [], cut: [] });
    expect(() => quarterTree([leaf('district:a', 1)], [], opts(0))).toThrow(RangeError);
  });
});
