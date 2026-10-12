// N-46 (6) (e) (the session's ruling J211; fix round S6, C-0221): the undo and remove paths of every kind of commit the
// router's fallbacks make restore the arena (§2.2 rule 3). Each fixture of register/s6-lifecycle.json is a B-FUZZ case
// whose last chain commits through one kind — an ordinary commit (the control), a shared stretch (W_STRETCH_SHARED), a
// first-pass W_PLACED commit (a step-2 or crossing fallback), N-42 (a)'s route across a sliver, N-42 (b)'s re-landed
// end, S4's split route, S5's third pass and its second reading (the free spot first), and S6's optional chain that
// N-43 B's bound refused before, committed by the split route (pass 2) or the third pass — found by a probe of the
// pass and route that committed (scratch mirror only; the kind is the fixture's provenance, its warnings pinned here).
//
// Every chain goes through M0-a-06's transaction (`tx`) with M0-a-14's invariant suite wired in (`suiteEnv`), role
// `invisible` (no linear-role row). For the last chain of each case:
//   * the undo path — a batch whose later op refuses after the insert wrote — leaves the arena and its version exactly as
//     they were (`state`);
//   * the commit gives the fixture's warnings, keeps N-43 B's bound (fidelity.ts) and the arena valid;
//   * the remove path — `removeEdges` of the chain's own rows in a later batch — restores the arena exactly: the content
//     print, the encoded chunk refs and the level digests as before the insert (N-47, N-55). Every kind is held to it,
//     and no refusal of the removal is tolerated: the S6 round's `'n13'` reading (N-13's ordinary outcomes) masked
//     exactly two defects, both fixed — a same-level shared stretch's end left undissolved (Q9, M0-a-06 round s4) and a
//     chain's own fold-back point left carrying the `split` flag (Q10, this item's round S7: `control-refused` and
//     `pass2-optional`, whose removals tx's index-freshness row refused).
//   * after every commit and every removal the arena holds no dissolvable vertex (support.ts `dissolvableProblems`).
//
// N-55 (5) (round S7): an overlay kept past its batch — committed or rejected — is closed, and `insertChain` handed it
// throws at its entry; the arena bit for bit and its version as they were. C-0302.
//
// A chain's own fold-back point (C-0302, §2.2 rule 3) and the doors where a split's own-end breach is refused (C-0284 (3))
// are the same lifecycle's: their sections follow the register's.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { isHalfEdgeLive, isVertexLive, outgoing, VERTEX_SPLIT, type HalfEdgeId, type Plat, type VertexId } from '../../../src/arena/index.js';
import { query } from '../../../src/index/index.js';
import { insertTx } from '../../../src/insert/classes.js';
import { insertChain, type ChainInsert } from '../../../src/insert/insertChain.js';
import { splitEndsBreachClearance } from '../../../src/insert/placement.js';
import { pieceOf, planLanding, splitBreaksClearance } from '../../../src/insert/stretch.js';
import { suiteEnv, suiteReport } from '../../../src/invariants/index.js';
import { err, type Warning } from '../../../src/num/index.js';
import { removeEdges, tx, type Overlay } from '../../../src/tx/index.js';
import type { Level } from '../../../src/types/index.js';
import { bits, spec, state } from '../../tx/support.js';
import { fidelityProblems } from './fidelity.js';
import { allProblems, contentPrint, dissolvableProblems, fingerprint, framed, indexed, neighbourPoints, pt, snapshot, TIMEOUT, vertexAtPoint } from './support.js';

/** One chain of a case, as B-FUZZ draws it. */
interface Chain {
  readonly level: Level;
  readonly cls: 'mandatory' | 'optional';
  readonly closed: boolean;
  readonly points: readonly (readonly [number, number])[];
  readonly pinned?: readonly number[];
  readonly entity: string;
}

/** A case: its chains in order into the framed 4 000 cm square, the last one committing through `kind`. */
interface LifeCase {
  readonly kind: string;
  readonly family: string;
  readonly pass: number;
  readonly warnings: readonly Warning[];
  readonly log: readonly Chain[];
}

const CASES = (JSON.parse(readFileSync(new URL('./register/s6-lifecycle.json', import.meta.url), 'utf8')) as { cases: LifeCase[] }).cases;

/** The kinds, in the register's order: the ordinary commit and its two N-13 controls first. */
const KINDS = ['plain', 'control-faces', 'control-content', 'control-refused', 'stretch', 'placed-pass1', 'sliver-route', 'relanded', 'split-route', 'pass3', 'pass4', 'pass3-optional', 'pass2-optional'];

const ROLE = 'invisible';
const optsOf = (c: Chain): { closed: boolean; pinned?: readonly number[] } => ({ closed: c.closed, ...(c.pinned === undefined ? {} : { pinned: c.pinned }) });
const env = (): ReturnType<typeof suiteEnv> => suiteEnv({ report: suiteReport() });

/** The chain inserted in its own batch through the transaction (the suite wired in); its result. */
function insert(p: Plat, c: Chain): ReturnType<typeof tx> {
  return tx(p, spec(c.level), (o) => insertChain(o, c.points.map(([x, y]) => pt(x, y)), [{ role: ROLE, entity: c.entity }], c.cls, optsOf(c)), env());
}

/** The content print split into its face-record lines and every other line (vertices, edges and their rows). */
function parts(p: Plat): { faces: string[]; rest: string[] } {
  const lines = contentPrint(p).split('\n');
  return { faces: lines.filter((l) => l.startsWith('f')), rest: lines.filter((l) => !l.startsWith('f')) };
}

/** The row keys (kind / entity / level / ordinal) the content print names on vertices and edges, each once. */
function rowKeys(p: Plat): Set<string> {
  const out = new Set<string>();
  for (const l of parts(p).rest) {
    const m = /\[([^\]]*)\]$/.exec(l);
    if (m !== null && m[1] !== '') for (const r of m[1].split(';')) out.add(r);
  }
  return out;
}

describe('N-46 (6) (e), N-55: the undo and remove paths of every kind of fallback-made commit restore the arena exactly (register/s6-lifecycle.json)', () => {
  it('the register holds one case per kind', () => {
    expect(CASES.map((c) => c.kind)).toEqual(KINDS);
  });

  for (const c of CASES) {
    it(`${c.kind} (${c.family}, pass ${c.pass}, ${c.log.length} chain${c.log.length === 1 ? '' : 's'}): undo restores the arena exactly; remove restores it exactly (print, chunk refs, level digests)`, () => {
      const p = framed(4000);
      const earlier = c.log.slice(0, -1);
      const last = c.log[c.log.length - 1];
      for (const k of earlier) {
        const before = state(p);
        const r = insert(p, k);
        if (!r.ok) expect(state(p), `${k.entity} refused (${r.code}) writes nothing`).toBe(before);
        else expect(dissolvableProblems(p), `after ${k.entity}`).toEqual([]);
      }
      expect(allProblems(p)).toEqual([]);
      const before = state(p);
      const { refs: refsBefore, digests: digestsBefore } = snapshot(p);

      // The undo path: the insert writes, then a later op of the batch refuses — everything back, the version too.
      let wrote = false;
      const rejected = tx(p, spec(last.level), (o) => {
        const r = insertChain(o, last.points.map(([x, y]) => pt(x, y)), [{ role: ROLE, entity: last.entity }], last.cls, optsOf(last));
        expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
        wrote = r.ok;
        return err('E_INVARIANT', 'lifecycle: a later op of the batch refused');
      }, env());
      expect(wrote).toBe(true);
      expect(rejected.ok).toBe(false);
      expect(state(p)).toBe(before);

      // The commit: the kind's warnings, within the bound, the arena valid.
      const res = insert(p, last);
      expect(res.ok, res.ok ? '' : `${res.code} ${res.detail}`).toBe(true);
      if (!res.ok) return;
      const out = res.value as unknown as { value: { placed: number[] }; record: { warnings: readonly Warning[] } | null };
      expect(res.warnings).toEqual(c.warnings);
      expect(fidelityProblems(p, last.level, last.cls, last.points, optsOf(last), out.value.placed, last.entity)).toEqual([]);
      expect(allProblems(p)).toEqual([]);
      expect(dissolvableProblems(p)).toEqual([]);
      expect(state(p)).not.toBe(before);
      const keysBefore = rowKeys(p);

      // The remove path: the chain's own rows removed in a later batch commit, and the arena is as before the insert.
      const rm = tx(p, spec(last.level), (o) => removeEdges(o, { role: ROLE, entity: last.entity }), env());
      expect(rm.ok, rm.ok ? '' : `${rm.code} ${rm.detail}`).toBe(true);
      expect(allProblems(p)).toEqual([]);
      expect(dissolvableProblems(p)).toEqual([]);
      const keys = rowKeys(p);
      expect([...keys].filter((k) => k.includes(`/${last.entity}/`))).toEqual([]);
      expect([...keysBefore].filter((k) => !k.includes(`/${last.entity}/`) && !keys.has(k))).toEqual([]);
      expect(contentPrint(p)).toBe(before.slice(0, before.lastIndexOf('\n#v')));
      const after = snapshot(p);
      expect(after.refs).toBe(refsBefore);
      expect(after.digests).toBe(digestsBefore);
    }, TIMEOUT);
  }
});

// ---- N-55 (5): insertChain on a closed transaction throws (C-0302) -----------------------------------------------------
//
// An overlay outlives its batch only as a programming error. Before N-55 `insertChain` never looked: on the overlay of a
// committed batch it wrote outside any transaction, the version unchanged (the ruling's probe q13: "returned ok | version
// 1 -> 1 | state same: false"), and alike on a rejected batch's. It now throws at its entry — tx's assertion class
// (N-53 (3)), never a typed refusal — before it reads, charges or writes anything.

/** The overlay of an L1 batch that inserted way:0 across the framed square and then ended as `how`. */
function staleOverlay(how: 'committed' | 'rejected'): { p: Plat; o: Overlay } {
  const p = framed(4000);
  let kept: Overlay | null = null;
  const r = tx(p, spec(1), (o) => {
    kept = o;
    const w = insertChain(o, [pt(500, 500), pt(2500, 700)], [{ role: 'way', entity: 'way:0' }], 'mandatory');
    expect(w.ok).toBe(true);
    return how === 'committed' ? w : err('E_INVARIANT', 'lifecycle: the stage gave up');
  });
  expect(r.ok).toBe(how === 'committed');
  if (kept === null) throw new Error('the callback never ran');
  return { p, o: kept };
}

describe('N-55 (5): insertChain on a closed transaction throws — the overlay of a committed or a rejected batch (C-0302)', () => {
  for (const how of ['committed', 'rejected'] as const) {
    it(`on a ${how} batch's overlay: throws "the transaction is closed"; the arena bit for bit and its version as they were`, () => {
      const { p, o } = staleOverlay(how);
      expect(o.closed).toBe(true);
      const before = bits(p);
      const version = p.version;
      for (const cls of ['mandatory', 'optional'] as const) {
        expect(() => insertChain(o, [pt(600, 3000), pt(3000, 3200)], [{ role: 'way', entity: 'way:1' }], cls)).toThrow(/^insert: the transaction is closed \(committed or rejected\)$/);
        // a chain step 1 would refuse (one point) throws all the same: the door is the op's entry, before decimation
        expect(() => insertChain(o, [pt(600, 3000)], [{ role: 'way', entity: 'way:1' }], cls)).toThrow(/^insert: the transaction is closed/);
        expect(bits(p)).toBe(before);
        expect(p.version).toBe(version);
      }
      expect(allProblems(p)).toEqual([]);
      // the control: the same chain in an open batch commits — the throw was the closed overlay, nothing else
      const r = tx(p, spec(1), (open) => insertChain(open, [pt(600, 3000), pt(3000, 3200)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      expect(r.ok ? 'committed' : `${r.code}: ${r.detail}`).toBe('committed');
      expect(p.version).toBe(version + 1);
      expect(allProblems(p)).toEqual([]);
    });
  }
});

// ---- a chain's own fold-back point (C-0302) ----------------------------------------------------------------------------
//
// N-55 (2), Q10 (session round S7; C-0302): a chain point that step 2 lands by splitting the chain's OWN edge — the chain
// folds back over itself, §3.11 "a collinear overlap is one shared stretch with merged roles" — is the chain's own shape
// vertex (`ChainInsert.placed`, §3.4), and §2.2 rule 3 says "a chain's own shape vertices never carry [the split flag]".
// Before the round it kept the flag `applySplitPlan` gives every split: a degree-2 vertex between identical rows, which
// the dissolution rule removes the moment a later batch touches it — so a chain attached there and then removed took the
// fold-back's vertex with it (the arena "one vertex simpler" than before the attach: remove ≠ undo-by-replay, N-45 (a)).
// The fixture is the ruling's case 5317 (the widened N-47 generator of C-0223 (4), replayed in its probe q10): the L2
// kerb (3142, 2862) – (499, 2966) – (2430, 2874), whose third point stands 16 cm off its own first segment. The control:
// the same point landing on ANOTHER chain's edge keeps the flag, and that chain's removal dissolves the split (rule 3).

type Pts = readonly (readonly [number, number])[];

/** Case 5317's kerb: its third point (2430, 2874) lands 16 cm off its own first segment, at (2431, 2890). */
const KERB: Pts = [[3142, 2862], [499, 2966], [2430, 2874]];
/** Case 5317's later chain, whose last point attracts onto the fold-back's vertex. */
const LATER: Pts = [[0, 3501], [735, 705], [2456, 2886]];
/** Where the kerb's third point lands: on its own first segment. */
const FOLD: readonly [number, number] = [2431, 2890];

/** One chain in its own L`level` batch through M0-a-06's transaction (as restore.test.ts and the ruling's probe insert). */
function insertKerb(p: Plat, level: Level, pts: Pts, entity: string): { placed: VertexId[]; warnings: readonly Warning[] } {
  const r = tx(p, spec(level, { rederivesFrom: 0 as never }), (o) => insertChain(o, pts.map(([x, y]) => pt(x, y)), [{ role: 'kerb', entity }], 'mandatory'));
  if (!r.ok) throw new Error(`${entity} refused: ${r.code} ${r.detail}`);
  return { placed: (r.value.value as ChainInsert).placed, warnings: r.value.record?.warnings ?? [] };
}

/** The chain's rows removed in a later L2 batch. */
function removeKerb(p: Plat, entity: string): void {
  const r = tx(p, spec(2, { rederivesFrom: 0 as never }), (o) => removeEdges(o, { role: 'kerb', entity }));
  if (!r.ok) throw new Error(`the removal of ${entity} refused: ${r.code} ${r.detail}`);
}

const isSplit = (p: Plat, v: VertexId): boolean => (p.vertices.flags[v] & VERTEX_SPLIT) !== 0;

describe('N-55 (2), Q10: a chain\'s own fold-back point carries no split flag (§2.2 rule 3; C-0302)', () => {
  it('case 5317\'s kerb: placed[2] is a live degree-2 vertex at (2431, 2890) on the kerb\'s own edges, carrying no VERTEX_SPLIT; no dissolvable vertex', () => {
    const p = framed();
    const k = insertKerb(p, 2, KERB, 'base:0');
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
    const k = insertKerb(p, 2, KERB, 'base:0');
    const v = k.placed[2];
    const before = snapshot(p);
    const later = insertKerb(p, 2, LATER, 'x:1');
    expect(later.placed[2]).toBe(v); // attracted onto the fold-back's vertex
    expect(later.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 2456, y: 2886 } }]);
    expect(outgoing(p, v)).toHaveLength(3);
    expect(dissolvableProblems(p)).toEqual([]);
    removeKerb(p, 'x:1');
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
    insertKerb(p, 2, KERB.slice(0, 2), 'base:A'); // the kerb's first segment as a chain of its own
    const before = snapshot(p);
    const b = insertKerb(p, 2, [[2430, 2874], [2400, 1500]], 'base:B');
    const v = b.placed[0];
    expect(v).toBe(vertexAtPoint(p, ...FOLD)); // the same landing: a split of base:A's edge at (2431, 2890)
    expect(isSplit(p, v)).toBe(true);
    expect(neighbourPoints(p, v)).toEqual(['2400,1500', '3142,2862', '499,2966']);
    expect(dissolvableProblems(p)).toEqual([]);
    removeKerb(p, 'base:B');
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
      insertKerb(p, 0, [[0, 2000], [4000, 2000]], 'base:A');
      const before = snapshot(p);
      insertKerb(p, 2, pts, 'x:1');
      const crossings = [1250, 1750].map((x) => vertexAtPoint(p, x, 2000));
      expect(crossings.every((v) => v >= 0)).toBe(true);
      for (const v of crossings) {
        expect(isSplit(p, v)).toBe(true);
        expect(outgoing(p, v)).toHaveLength(4);
      }
      removeKerb(p, 'x:1');
      expect(crossings.map((v) => vertexAtPoint(p, p.vertices.x[v], 2000))).toEqual([-1, -1]);
      expect(allProblems(p)).toEqual([]);
      const after = snapshot(p);
      expect(after.print).toBe(before.print);
      expect(after.refs).toBe(before.refs);
      expect(after.digests).toBe(before.digests);
    });
  }
});

// ---- a split's own-end breach at the doors (C-0284 (3)) -----------------------------------------------------------------
//
// C-0284 (3) (session round S7; C-0302): insertChain's own clearance wrappers round a split are retired. C-0177 (11) had
// insertChain's step 2 (`land`, after `planAttraction`) and step 3's landing (`planLanding`, after `placePoint`) test the
// placed split's sub-edge with `splitBreaksClearance` and fall back onto its nearer end. Since C-0284 the placement rule's
// (iii) applies §3.10's clearance at the split sub-edge's own ends itself (`splitEndsBreachClearance`): a candidate on a
// sub-edge whose ends cannot clear each other's edges once split never qualifies, so `placePoint` answers the endpoint
// fallback (W_PLACED) and the wrappers could no longer see a breaching split. `splitBreaksClearance` (still read by
// `placeOnRun`, which searches a run itself, and by the face partitioners) now IS that predicate. These pins hold the
// claim on the arena of C-0284's own fixture — the shallow corner at the frame: an L1 chord E (3 034, 4 000) – P (2 912,
// 3 984) – (2 000, 2 000) – (2 000, 0), P 16 cm inside the frame at 7.5°, so no point of P–E keeps clearance once split —
// at each door the wrappers stood in: both land on P with W_PLACED and write no vertex on P–E. The control: P 30 cm in.

/** C-0284's arena (splitThrough.test.ts `nearFrame`): the L0 frame [0, 4 000]² and the L1 chord E – P – (2 000, 2 000) – (2 000, 0). */
function nearFrame(d: number): ReturnType<typeof indexed> {
  return indexed({
    vertices: [
      [0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0], // 0 – 3
      [3034, 4000, 1], [2912, 4000 - d, 1], [2000, 2000, 1], [2000, 0, 1], // 4 E, 5 P, 6, 7
    ],
    edges: [
      [0, 7, 0], [7, 1, 0], [1, 2, 0], [2, 4, 0], [4, 3, 0], [3, 0, 0],
      [4, 5, 1], [5, 6, 1], [6, 7, 1],
    ],
  });
}

/** The half-edge the level-n index names the edge P–E by (its route edge, as step 3's query answers it). */
function routeEdge(p: Plat, n: Level, a: VertexId, b: VertexId): HalfEdgeId {
  const O = p.halfEdges.origin;
  const box = { minX: 2800, minY: 3900, maxX: 3100, maxY: 4000 };
  const h = query(p, p.key, n, box, { edges: true }).edges.find((g) => (O[g] === a && O[g ^ 1] === b) || (O[g] === b && O[g ^ 1] === a));
  if (h === undefined) throw new Error('the index names no route edge P–E');
  return h;
}

/** Every live vertex of the arena lying strictly between P and E on their segment (a split of P–E). */
function onPE(p: Plat, P: VertexId, E: VertexId): VertexId[] {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const out: VertexId[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (v === P || v === E || !isVertexLive(p, v)) continue;
    const cross = (X[E] - X[P]) * (Y[v] - Y[P]) - (Y[E] - Y[P]) * (X[v] - X[P]);
    const dot = (X[v] - X[P]) * (X[E] - X[P]) + (Y[v] - Y[P]) * (Y[E] - Y[P]);
    const l2 = (X[E] - X[P]) * (X[E] - X[P]) + (Y[E] - Y[P]) * (Y[E] - Y[P]);
    if (cross * cross <= 2 * l2 && dot > 0 && dot < l2) out.push(v); // within 1.42 cm of the segment, inside it
  }
  return out;
}

describe('C-0284 (3): a split\'s own-end breach is refused by the placement rule before insertChain\'s retired wrappers could see it (C-0302)', () => {
  it('splitBreaksClearance is the placement rule\'s (iii) at the split\'s ends: equal to splitEndsBreachClearance on every edge, both ways, of the shallow corner and its control', () => {
    // splitBreaksClearance is splitEndsBreachClearance under a second name (stretch.ts re-exports it, C-0284 (2)), so the
    // equality below holds by identity; what still pins the rule is the breaching count (P–E alone, only at 16 cm).
    expect(splitBreaksClearance).toBe(splitEndsBreachClearance);
    for (const d of [16, 30]) {
      const p = nearFrame(d).plat;
      let breaching = 0;
      for (let e = 0; e < p.slots.pair.top; e++) {
        if (!isHalfEdgeLive(p, 2 * e)) continue;
        const [s, t] = [p.halfEdges.origin[2 * e], p.halfEdges.origin[2 * e + 1]];
        expect(splitBreaksClearance(p, s, t)).toBe(splitEndsBreachClearance(p, s, t));
        expect(splitBreaksClearance(p, t, s)).toBe(splitEndsBreachClearance(p, t, s));
        if (splitBreaksClearance(p, s, t)) breaching += 1;
      }
      // P–E alone breaches, and only on the shallow corner (not vacuous)
      expect(breaching).toBe(d === 16 ? 1 : 0);
    }
  });

  for (const level of [1, 2] as const) {
    it(`step 3's landing at L${level} (planLanding, the contact, join or leave point door): a position on P–E lands on P by the placement's own fallback, W_PLACED — no split planned`, () => {
      const b = nearFrame(16);
      const p = b.plat;
      const [E, P] = [b.v[4], b.v[5]];
      const t = insertTx(p, level);
      const before = fingerprint(p);
      const l = planLanding(t, pieceOf(p, routeEdge(p, level, P, E), level), 2966, 3991.08);
      expect(l.ok && l.value).toEqual({ kind: 'vertex', vertex: P, onto: 'fallback', warnings: [{ code: 'W_PLACED', count: 1, at: pt(2912, 3984) }] });
      expect(fingerprint(p)).toBe(before);
    });

    it(`step 2 at L${level} (insertChain's land, the attraction door): a chain point 6 cm off P–E lands on P, W_PLACED; no vertex written on P–E; §3.10 holds`, () => {
      const b = nearFrame(16);
      const p = b.plat;
      const [E, P] = [b.v[4], b.v[5]];
      const t = insertTx(p, level);
      const r = insertChain(t, [pt(2966, 3985), pt(3600, 3200)], [{ role: 'way', entity: 'way:t' }], 'mandatory');
      expect(r.ok ? r.value.placed[0] : `${r.code} ${r.detail}`).toBe(P);
      expect(r.ok ? r.warnings.filter((w) => w.code === 'W_PLACED') : []).toEqual([{ code: 'W_PLACED', count: 1, at: pt(2912, 3984) }]);
      expect(onPE(p, P, E)).toEqual([]);
      expect(outgoing(p, P).map((h) => p.halfEdges.origin[h ^ 1]).includes(E)).toBe(true); // P–E still one edge
      expect(allProblems(p)).toEqual([]);
    });
  }

  it('the control: P 30 cm inside the frame — the same chain point splits P–E (the placement places it), §3.10 holds', () => {
    const b = nearFrame(30);
    const p = b.plat;
    const [E, P] = [b.v[4], b.v[5]];
    const t = insertTx(p, 1);
    const r = insertChain(t, [pt(2966, 3985), pt(3600, 3200)], [{ role: 'way', entity: 'way:t' }], 'mandatory');
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.placed[0]).not.toBe(P);
    expect(onPE(p, P, E)).toEqual([r.value.placed[0]]);
    expect(allProblems(p)).toEqual([]);
  });
});
