// N-55 (2), Q10 (session round S7; C-0297): a chain point that step 2 lands by splitting the chain's OWN edge — the chain
// folds back over itself, §3.11 "a collinear overlap is one shared stretch with merged roles" — is the chain's own shape
// vertex (`ChainInsert.placed`, §3.4), and §2.2 rule 3 says "a chain's own shape vertices never carry [the split flag]".
// Before the round it kept the flag `applySplitPlan` gives every split: a degree-2 vertex between identical rows, which
// the dissolution rule removes the moment a later batch touches it — so a chain attached there and then removed took the
// fold-back's vertex with it (the arena "one vertex simpler" than before the attach: remove ≠ undo-by-replay, N-45 (a)).
// The fixture is the ruling's case 5317 (the widened N-47 generator of C-0223 (4), replayed in its probe q10): the L2
// kerb (3142, 2862) – (499, 2966) – (2430, 2874), whose third point stands 16 cm off its own first segment. The control:
// the same point landing on ANOTHER chain's edge keeps the flag, and that chain's removal dissolves the split (rule 3).
import { describe, expect, it } from 'vitest';
import { outgoing, VERTEX_SPLIT, type Plat, type VertexId } from '../../../src/arena/index.js';
import { recomputeLevelDigest } from '../../../src/digest/index.js';
import { insertChain, type ChainInsert } from '../../../src/insert/insertChain.js';
import { encodeArena } from '../../../src/io/index.js';
import type { Warning } from '../../../src/num/index.js';
import { removeEdges, tx } from '../../../src/tx/index.js';
import type { Level } from '../../../src/types/index.js';
import { spec } from '../../tx/support.js';
import { allProblems, contentPrint, dissolvableProblems, framed, neighbourPoints, pt, vertexAtPoint } from './support.js';

type Pts = readonly (readonly [number, number])[];

/** Case 5317's kerb: its third point (2430, 2874) lands 16 cm off its own first segment, at (2431, 2890). */
const KERB: Pts = [[3142, 2862], [499, 2966], [2430, 2874]];
/** Case 5317's later chain, whose last point attracts onto the fold-back's vertex. */
const LATER: Pts = [[0, 3501], [735, 705], [2456, 2886]];
/** Where the kerb's third point lands: on its own first segment. */
const FOLD: readonly [number, number] = [2431, 2890];

/** One chain in its own L`level` batch through M0-a-06's transaction (as restore.test.ts and the ruling's probe insert). */
function insert(p: Plat, level: Level, pts: Pts, entity: string): { placed: VertexId[]; warnings: readonly Warning[] } {
  const r = tx(p, spec(level, { rederivesFrom: 0 as never }), (o) => insertChain(o, pts.map(([x, y]) => pt(x, y)), [{ role: 'kerb', entity }], 'mandatory'));
  if (!r.ok) throw new Error(`${entity} refused: ${r.code} ${r.detail}`);
  return { placed: (r.value.value as ChainInsert).placed, warnings: r.value.record?.warnings ?? [] };
}

/** The chain's rows removed in a later L2 batch. */
function remove(p: Plat, entity: string): void {
  const r = tx(p, spec(2, { rederivesFrom: 0 as never }), (o) => removeEdges(o, { role: 'kerb', entity }));
  if (!r.ok) throw new Error(`the removal of ${entity} refused: ${r.code} ${r.detail}`);
}

/** The arena's slot-free content print, its encoded chunk refs (§11) and its level digests (§3.9). */
function snapshot(p: Plat): { print: string; refs: string; digests: string } {
  return {
    print: contentPrint(p),
    refs: JSON.stringify(encodeArena(p).map((c) => c.ref)),
    digests: JSON.stringify(([0, 1, 2, 3, 4] as const).map((l) => Array.from(recomputeLevelDigest(p, l) as ArrayLike<number>))),
  };
}

const isSplit = (p: Plat, v: VertexId): boolean => (p.vertices.flags[v] & VERTEX_SPLIT) !== 0;

describe('N-55 (2), Q10: a chain\'s own fold-back point carries no split flag (§2.2 rule 3; C-0297)', () => {
  it('case 5317\'s kerb: placed[2] is a live degree-2 vertex at (2431, 2890) on the kerb\'s own edges, carrying no VERTEX_SPLIT; no dissolvable vertex', () => {
    const p = framed();
    const k = insert(p, 2, KERB, 'base:0');
    // the fold-back: the third point attracted onto the kerb's first segment, the second segment shared back along it
    expect(k.warnings).toEqual([
      { code: 'W_ATTRACTED', count: 1, at: { x: 2430, y: 2874 } },
      { code: 'W_STRETCH_SHARED', count: 1, at: { x: 499, y: 2966 } },
    ]);
    const v = k.placed[2];
    expect(v).toBe(vertexAtPoint(p, ...FOLD));
    expect(p.vertices.level[v]).toBe(2);
    expect(outgoing(p, v)).toHaveLength(2);
    expect(neighbourPoints(p, v)).toEqual(['3142,2862', '499,2966']);
    expect(isSplit(p, v)).toBe(false);
    expect(dissolvableProblems(p)).toEqual([]);
    expect(allProblems(p)).toEqual([]);
  });

  it('a later chain attached at the fold-back\'s vertex and removed in a later batch restores the arena exactly (print, chunk refs, level digests); the vertex stays', () => {
    const p = framed();
    const k = insert(p, 2, KERB, 'base:0');
    const v = k.placed[2];
    const before = snapshot(p);
    const later = insert(p, 2, LATER, 'x:1');
    expect(later.placed[2]).toBe(v); // attracted onto the fold-back's vertex
    expect(later.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 2456, y: 2886 } }]);
    expect(outgoing(p, v)).toHaveLength(3);
    expect(dissolvableProblems(p)).toEqual([]);
    remove(p, 'x:1');
    expect(allProblems(p)).toEqual([]);
    expect(dissolvableProblems(p)).toEqual([]);
    const after = snapshot(p);
    expect(after.print).toBe(before.print);
    expect(after.refs).toBe(before.refs);
    expect(after.digests).toBe(before.digests);
    expect(vertexAtPoint(p, ...FOLD)).toBe(v);
  });

  it('the control: the same point landing on ANOTHER chain\'s edge splits it with the flag kept, and that chain\'s removal dissolves the split — the edge as before', () => {
    const p = framed();
    insert(p, 2, KERB.slice(0, 2), 'base:A'); // the kerb's first segment as a chain of its own
    const before = snapshot(p);
    const b = insert(p, 2, [[2430, 2874], [2400, 1500]], 'base:B');
    const v = b.placed[0];
    expect(v).toBe(vertexAtPoint(p, ...FOLD)); // the same landing: a split of base:A's edge at (2431, 2890)
    expect(isSplit(p, v)).toBe(true);
    expect(neighbourPoints(p, v)).toEqual(['2400,1500', '3142,2862', '499,2966']);
    expect(dissolvableProblems(p)).toEqual([]);
    remove(p, 'base:B');
    expect(vertexAtPoint(p, ...FOLD)).toBe(-1); // dissolved: base:A is one edge again
    expect(allProblems(p)).toEqual([]);
    const after = snapshot(p);
    expect(after.print).toBe(before.print);
    expect(after.refs).toBe(before.refs);
    expect(after.digests).toBe(before.digests);
  });

  // The second control: a pair this op wrote is not by itself the chain's own edge. A chain crossing one base edge twice
  // splits it at the first crossing (the far sub-edge is a new pair of this op, carrying the base's rows) and then at the
  // second, which may fall on that new pair: both crossings keep the flag, and the chain's removal dissolves both — the
  // base one edge again. Both directions of the chain, so one of them splits the op's new pair.
  for (const pts of [[[1000, 1500], [1500, 2500], [2000, 1500]], [[2000, 1500], [1500, 2500], [1000, 1500]]] as const) {
    it(`the second control: a chain ${JSON.stringify(pts)} crossing one base edge twice keeps both crossings' flags; its removal dissolves both`, () => {
      const p = framed();
      insert(p, 0, [[0, 2000], [4000, 2000]], 'base:A');
      const before = snapshot(p);
      insert(p, 2, pts, 'x:1');
      const crossings = [1250, 1750].map((x) => vertexAtPoint(p, x, 2000));
      expect(crossings.every((v) => v >= 0)).toBe(true);
      for (const v of crossings) {
        expect(isSplit(p, v)).toBe(true);
        expect(outgoing(p, v)).toHaveLength(4);
      }
      remove(p, 'x:1');
      expect(crossings.map((v) => vertexAtPoint(p, p.vertices.x[v], 2000))).toEqual([-1, -1]);
      expect(allProblems(p)).toEqual([]);
      const after = snapshot(p);
      expect(after.print).toBe(before.print);
      expect(after.refs).toBe(before.refs);
      expect(after.digests).toBe(before.digests);
    });
  }
});
