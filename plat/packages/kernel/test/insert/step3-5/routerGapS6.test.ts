// M0-a-05 session fix round S6 (C-0221), on the S5 closing check's failing lines (checks/M0-a-05-s3.md, S5 round):
//   F1 / F2 — N-46 (3): an optional chain whose every route keeping §3.10 leaves N-43 B's bound is refused
//     E_BELOW_MIN_EDGE with detail 'N-43'; it is a refusal the bound caused, counted with E_INVARIANT (caps.ts
//     `countedRefusal`), and the router's further readings — S4's split route, N-42 (b)'s re-landing, S5's third pass —
//     now serve it as they serve E_INVARIANT (`boundRefusal`), its code kept when none commits;
//   F4 — the third pass's free spot and landing rules S5 states (C-0217), each pinned by a unit test: the free spot keeps
//     minEdge from every vertex (Q8) and the kept-content rule's face records (Q10); an in-bound landing within minEdge
//     of the previous vertex merges into it (Q18); a free landing is journalled, so the commit record's roles and the
//     whole-route clearance judge read it (Q19).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { allocVertex, type Plat } from '../../../src/arena/index.js';
import { indexAdd, ITEM_VERTEX } from '../../../src/index/index.js';
import { boundRefusal, freeSpot, land } from '../../../src/insert/insertChain.js';
import { recordHolding } from '../../../src/insert/snapRound.js';
import { chainJournal, FIDELITY_SQ, type ChainCtx } from '../../../src/insert/stretch.js';
import { belowMinEdge, LATTICE } from '../../../src/num/index.js';
import type { Level } from '../../../src/types/index.js';
import type { ArenaSpec } from '../step1-2/support.js';
import { countedRefusal } from './caps.js';
import { fidelityProblems } from './fidelity.js';
import { allProblems, contentPrint, framed, indexed, ins, pt, TIMEOUT, tx } from './support.js';

/** The L0 square [0, 4 000]² as a hand-built arena's outer ring. */
const SQUARE: ArenaSpec = {
  vertices: [[0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0]],
  edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0]],
};

/** routerGapS5.test.ts's thin strip: arm 1 (1 000, 1 000) – (3 000, 1 000), arm 2 (1 020, 1 015) – (3 000, 1 040). */
const STRIP: ArenaSpec = {
  vertices: [...SQUARE.vertices, [1000, 1000, 0], [3000, 1000, 0], [1020, 1015, 0], [3000, 1040, 0]],
  edges: [...SQUARE.edges, [4, 5, 0], [4, 6, 0], [6, 7, 0]],
};

/** A chain context over a transaction (the tests call the router's parts on their own); `strip` the third pass's reading. */
function ctxOf(p: Plat, level: Level = 0, strip: 0 | 1 | null = null): ChainCtx {
  const t = tx(p, level);
  return { tx: t, p, n: level, cls: 'mandatory', rows: [], warnings: [], journal: chainJournal(t), maxPass: 0, strict: false, undo: [], extended: strip !== null, strip: strip === null ? null : { variant: strip, a: null, b: null } };
}

const d2 = (a: { x: number; y: number }, b: { x: number; y: number }): number => (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);

describe('F4: the third pass\'s free spot (C-0217: "keeping minEdge from every vertex and edge and the kept-content rule")', () => {
  // Q8: a free vertex of level ≤ n 5 cm from the chain point and nothing else near. The point itself would stand within
  // minEdge of it; the free spot is the nearest lattice point within the bound that does not, 20 – 25 cm off.
  it('the free spot keeps minEdge from every vertex: a vertex 5 cm from the point moves the spot ≥ 25 cm from it, as near the point as the 16 directions allow', () => {
    const b = indexed(SQUARE);
    const p = b.plat;
    const v = allocVertex(p, pt(2000, 2000), 0, 0);
    indexAdd(p, { kind: ITEM_VERTEX, level: 0, slot: v });
    const at = pt(2005, 2000);
    const f = freeSpot(ctxOf(p, 0, 0), at);
    expect(f.ok).toBe(true);
    if (!f.ok || f.value === null) throw new Error('no free spot');
    expect(belowMinEdge(2000, 2000, f.value.x, f.value.y)).toBe(false);
    expect(d2(f.value, at)).toBeLessThanOrEqual(20 * 20);
    expect(d2(f.value, at)).toBeLessThanOrEqual(FIDELITY_SQ);
  });

  // Q10: a level-1 ring 120 cm square round the chain point, inserted into the framed L0 arena: its face record (L1)
  // holds every point inside it, its edges stand 60 cm from the point. A free L0 vertex inside it would sit in a finer
  // face (§3.3's kept content, as `finerNear` refuses E_KEPT); outside it, every point within the bound lies within
  // attractCm of the ring's edges. So no spot qualifies.
  it('the free spot keeps the kept-content rule\'s face records: inside a finer ring whose edges stand beyond attractCm of the point, no spot within the bound qualifies', () => {
    const p = framed(4000);
    const ring: [number, number][] = [[1940, 1940], [2060, 1940], [2060, 2060], [1940, 2060]];
    expect(ins(tx(p, 1), ring, [{ role: 'way', entity: 'way:ring' }], 'mandatory', { closed: true }).ok).toBe(true);
    const ctx = ctxOf(p, 0, 0);
    expect(recordHolding(ctx, 1, 4000, 4000)).toBeGreaterThanOrEqual(0);
    const f = freeSpot(ctx, pt(2000, 2000));
    expect(f.ok && f.value).toBe(null);
    // The same point at L1 (no finer ring round it: the ring is its own level) finds its spot at once.
    const g = freeSpot(ctxOf(p, 1, 0), pt(2000, 2000));
    expect(g.ok && g.value).toEqual({ x: 2000, y: 2000 });
  });
});

describe('F4: the third pass\'s step-2 landing (insertChain `land`, C-0217)', () => {
  // The chain point (1 300, 1 008) stands inside the strip, 8 cm above arm 1: the placement rule falls back on A, 300 cm
  // off, so the third pass lands it in bound — across the strip onto arm 1 at (1 300, 1 000) (reading 0), or at a free
  // spot outside the strip (reading 1, the free spot first).
  it('reading 0 lands the point across the strip on arm 1, a split at (1 300, 1 000) reported W_PLACED; without the third pass it takes the far fallback', () => {
    const p = indexed(STRIP).plat;
    const ctx = ctxOf(p, 0, 0);
    const l = land(ctx, pt(1300, 1008), -1, null, pt(1300, 1200));
    expect(l.ok).toBe(true);
    if (!l.ok) return;
    expect(l.value.merged).toBe(false);
    expect([p.vertices.x[l.value.vertex], p.vertices.y[l.value.vertex]]).toEqual([1300, 1000]);
    expect(ctx.warnings.map((w) => w.code)).toContain('W_PLACED');
    const q = indexed(STRIP).plat;
    const plain = land(ctxOf(q, 0, null), pt(1300, 1008), -1, null, pt(1300, 1200));
    expect(plain.ok).toBe(true);
    if (!plain.ok) return;
    expect(d2({ x: q.vertices.x[plain.value.vertex], y: q.vertices.y[plain.value.vertex] }, pt(1300, 1008))).toBeGreaterThan(FIDELITY_SQ);
  });

  // Q18: the merge rule (§3.6 step 2: a vertex attraction brought within minEdge of the previous one merges into it,
  // W_ATTRACTED) holds for the third pass's landings too. The previous vertex here stands 20 cm from the across landing
  // (it is not entered in the index, so it changes no candidate: only the merge rule reads it).
  it('an in-bound landing within minEdge of the previous vertex merges into it (W_ATTRACTED), writing nothing', () => {
    const p = indexed(STRIP).plat;
    const prev = allocVertex(p, pt(1300, 1020), 0, 0);
    const before = contentPrint(p);
    const ctx = ctxOf(p, 0, 0);
    const l = land(ctx, pt(1300, 1008), prev, pt(1300, 1020), pt(1300, 1200));
    expect(l.ok).toBe(true);
    if (!l.ok) return;
    expect(l.value).toEqual({ vertex: prev, merged: true });
    expect(ctx.warnings.map((w) => w.code)).toEqual(['W_ATTRACTED']);
    expect(contentPrint(p)).toBe(before);
  });

  // Q19: reading 1's free landing is a new vertex of the chain's own: it goes into the transaction's journal like any
  // free chain vertex (insertChain `land`'s last lines), which the whole-route clearance judge (`wholeProblem`), N-42
  // (b)'s `freeSince`, the rollback and the commit record's role keys (M0-a-06's tx.ts reads `journal.vertices`) all read.
  it('reading 1 lands the point at a free spot outside the strip, within the bound, keeping minEdge from both arms — a new vertex in the journal, W_PLACED', () => {
    const p = indexed(STRIP).plat;
    const ctx = ctxOf(p, 0, 1);
    const from = ctx.tx.journal.vertices.length;
    const l = land(ctx, pt(1300, 1008), -1, null, pt(1300, 1200));
    expect(l.ok).toBe(true);
    if (!l.ok) return;
    const v = l.value.vertex;
    const at = { x: p.vertices.x[v], y: p.vertices.y[v] };
    expect(l.value.merged).toBe(false);
    expect(p.vertices.out[v]).toBe(-1);
    expect(ctx.tx.journal.vertices.slice(from)).toEqual([v]);
    expect(d2(at, pt(1300, 1008))).toBeLessThanOrEqual(FIDELITY_SQ);
    expect(at.y < 1000 - LATTICE.minEdgeCm + 1 || at.y > 1040).toBe(true);
    expect(ctx.warnings.find((w) => w.code === 'W_PLACED')?.at).toEqual(at);
    expect(allProblems(p)).toEqual([]);
  });
});

// ---- F1 / F2: the optional chain refused for the bound ------------------------------------------------------------------

describe('N-46 (3): a refusal N-43 B\'s bound caused is one class, whatever its code', () => {
  it('boundRefusal (the router\'s gate) and countedRefusal (B-FUZZ\'s tally) agree: E_INVARIANT and an optional chain\'s E_BELOW_MIN_EDGE naming N-43; no other precision refusal', () => {
    const cases: [string, string, boolean][] = [
      ['E_INVARIANT', 'insert: no route from (1, 2) to (3, 4) keeps clearance (§3.10) within the fidelity bound (N-43)', true],
      ['E_INVARIANT', 'insert: the vertex (1, 2) stands within minEdge of the edge (3, 4)–(5, 6)', true],
      ['E_BELOW_MIN_EDGE', 'every route from (1, 2) to (3, 4) keeping clearance leaves the fidelity bound (N-43)', true],
      ['E_BELOW_MIN_EDGE', 'the chain collapses below one edge', false],
      ['E_BELOW_MIN_ANGLE', 'a corner below minFaceAngle', false],
      ['E_KEPT', 'a chain vertex within attractCm of a finer vertex (kept content)', false],
    ];
    for (const [code, detail, want] of cases) {
      expect(boundRefusal({ code: code as 'E_INVARIANT', detail }), `${code} ${detail}`).toBe(want);
      expect(countedRefusal(code, detail), `${code} ${detail}`).toBe(want);
    }
  });
});

/** One B-FUZZ case: its chains in order, each into the framed 4 000 cm square. */
interface FuzzCase {
  readonly kind?: string;
  readonly seed?: string;
  readonly family: string;
  readonly case?: number;
  readonly code?: string;
  readonly detail?: string;
  readonly warnings?: readonly { readonly code: string; readonly count: number; readonly at?: { readonly x: number; readonly y: number } }[];
  readonly log: readonly { readonly level: Level; readonly cls: 'mandatory' | 'optional'; readonly closed: boolean; readonly points: readonly (readonly [number, number])[]; readonly pinned?: readonly number[]; readonly entity: string }[];
}

const LIFE = (JSON.parse(readFileSync(new URL('./register/s6-lifecycle.json', import.meta.url), 'utf8')) as { cases: FuzzCase[] }).cases;
const REGISTER = (JSON.parse(readFileSync(new URL('./register/s6-register.json', import.meta.url), 'utf8')) as { cases: FuzzCase[] }).cases;

/** Replays a case's chains as B-FUZZ judges them; the last chain's result, the arena, its content before that chain. */
function replay(c: FuzzCase, role: string): { p: Plat; r: ReturnType<typeof ins>; before: string } {
  const p = framed(4000);
  let r: ReturnType<typeof ins> | null = null;
  let before = '';
  c.log.forEach((k) => {
    before = contentPrint(p);
    const opts = { closed: k.closed, ...(k.pinned === undefined ? {} : { pinned: k.pinned }) };
    r = ins(tx(p, k.level), k.points, [{ role, entity: k.entity }], k.cls, opts);
    if (r.ok) expect(fidelityProblems(p, k.level, k.cls, k.points, opts, r.value.placed, k.entity), k.entity).toEqual([]);
    else expect(contentPrint(p)).toBe(before);
  });
  expect(allProblems(p)).toEqual([]);
  return { p, r: r as unknown as ReturnType<typeof ins>, before };
}

describe('F2: optional chains S5 refused E_BELOW_MIN_EDGE for the bound now commit within it (register/s6-lifecycle.json)', () => {
  // pass2-optional: S5's second pass refused the optional chain's segment for the bound and went no further (its split
  // route and the re-landing ran only on E_INVARIANT); S6's split route commits it, the split point W_PLACED.
  // pass3-optional: S5 never ran the third pass for it (gated on E_INVARIANT); S6's third pass commits it.
  for (const kind of ['pass2-optional', 'pass3-optional']) {
    it(`${kind}: the optional chain commits within the bound, the arena valid, its warnings as recorded`, () => {
      const c = LIFE.find((x) => x.kind === kind);
      if (c === undefined) throw new Error(`no ${kind} case`);
      const { r } = replay(c, 'invisible');
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(c.log[c.log.length - 1].cls).toBe('optional');
      expect(r.warnings).toEqual(c.warnings);
      expect(r.warnings.map((w) => w.code)).toContain('W_PLACED');
    }, TIMEOUT);
  }
});

describe('N-44 (4): S6\'s register of the optional N-43 class (register/s6-register.json) — each refused E_BELOW_MIN_EDGE for the bound, cleanly, and counted', () => {
  for (const c of REGISTER) {
    it(`${c.family} seed ${c.seed} case ${c.case}: ${(c.detail ?? '').slice(0, 70)}…`, () => {
      const { p, r, before } = replay(c, 'way');
      expect(r.ok).toBe(false);
      if (r.ok) return;
      expect(c.log[c.log.length - 1].cls).toBe('optional');
      expect([r.code, r.detail]).toEqual([c.code, c.detail]);
      expect(countedRefusal(r.code, r.detail)).toBe(true);
      expect(contentPrint(p)).toBe(before);
    }, TIMEOUT);
  }
});
