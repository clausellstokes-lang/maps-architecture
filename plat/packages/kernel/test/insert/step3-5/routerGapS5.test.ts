// M0-a-05 session fix round S5 (C-0217): insertChain's third pass, under N-44 as the session applied it for the refusal
// cap (J204, J207, J208). S4's two passes fail safe but refused 5 – 17 chains per 10⁴ random B-FUZZ cases and ≈ 4.5 % of
// M0-a-08's buffer and offsetFace agreement cases. The cause table (C-0217): almost every refusal is a placement whose
// candidates all fail (iii) because a near-parallel edge within minEdge — a thin strip or sliver between two edges joined
// at one end — blocks them, so the endpoint fallback lands 75 – 770 cm along the edge, beyond N-43 B's bound. The third
// pass, run only for a chain both earlier passes refuse E_INVARIANT, keeps every landing within the bound: the step across
// the strip (its far side's sub-edge left out of (iii), `stripPartner`, `placeOnRun`), the nearest qualifying point of the
// run within the bound, the nearest existing vertex within it, a free spot within it (step 2), and a wedge corner only
// within the bound of the input segment; a second reading tries the free spot first. Every route is still judged whole
// (§3.10) and against the bound; whatever no reading commits stays refused E_INVARIANT and counted (the register below).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { allocVertex, createPlat, type Plat } from '../../../src/arena/index.js';
import { attachIndex, indexAdd, ITEM_VERTEX } from '../../../src/index/index.js';
import { exactCrossings, placeOnRun, sliverPartner, stripPartner } from '../../../src/insert/crossings.js';
import { placePoint } from '../../../src/insert/placement.js';
import { chainJournal, FIDELITY_SQ, inInputBound, type ChainCtx } from '../../../src/insert/stretch.js';
import type { Cm, Level } from '../../../src/types/index.js';
import { GROUND } from '../../arena/support.js';
import type { ArenaSpec } from '../step1-2/support.js';
import { MEASURED_PER_1E4, poissonCap, refusalCap } from './caps.js';
import { fidelityProblems } from './fidelity.js';
import { allProblems, contentPrint, framed, indexed, ins, pt, TIMEOUT, tx } from './support.js';

/** The L0 square [0, 4 000]² as a hand-built arena's outer ring (spec vertices 0 – 3, edges 0 – 3). */
const SQUARE: ArenaSpec = {
  vertices: [[0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0]],
  edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0]],
};

/**
 * A thin strip: arm 1 A (1 000, 1 000) – B (3 000, 1 000); arm 2 D (1 020, 1 015) – C (3 000, 1 040), joined to arm 1 at
 * A by the 25 cm edge A – D. D stands 15 cm from arm 1 — lawful, A is its neighbour (§3.10's one-ring) — and the strip
 * is narrower than minEdge from x = 1 020 to x ≈ 1 812 (20 cm wide at x = 1 400), so no point of either arm there keeps
 * minEdge from the other: the placement rule finds none and falls back on an arm's end, metres away.
 */
const STRIP: ArenaSpec = {
  vertices: [...SQUARE.vertices, [1000, 1000, 0], [3000, 1000, 0], [1020, 1015, 0], [3000, 1040, 0]],
  edges: [...SQUARE.edges, [4, 5, 0], [4, 6, 0], [6, 7, 0]],
};

/** A chain context over a transaction (the tests call the router's parts on their own). */
function ctxOf(p: Plat, level: Level = 0): ChainCtx {
  const t = tx(p, level);
  return { tx: t, p, n: level, cls: 'mandatory', rows: [], warnings: [], journal: chainJournal(t), maxPass: 0, strict: false, undo: [] };
}

/** A commit's warnings as [code, count] pairs. */
const codes = (r: ReturnType<typeof ins>): [string, number][] => (r.ok ? r.warnings.map((w) => [w.code, w.count] as [string, number]) : []);

/** A free vertex (no edge) at (x, y), entered in the index. */
function free(p: Plat, x: number, y: number, level: Level = 0): number {
  const v = allocVertex(p, pt(x, y), level, 0);
  indexAdd(p, { kind: ITEM_VERTEX, level, slot: v });
  return v;
}

describe('S5: the bound of the input segment and the strip\'s far side', () => {
  it('inInputBound is N-43 B\'s bound, 8 · 26² = 5 408 squared: a point 73 cm off the input segment is within it, 74 cm is not; so are the ends\' discs', () => {
    expect(FIDELITY_SQ).toBe(5408);
    const a = pt(1000, 1000);
    const b = pt(2000, 1000);
    expect(inInputBound(a, b, 1500, 1073)).toBe(true);
    expect(inInputBound(a, b, 1500, 1074)).toBe(false);
    expect(inInputBound(a, b, 927, 1000)).toBe(true);
    expect(inInputBound(a, b, 926, 1000)).toBe(false);
    expect(inInputBound(a, b, 2052, 1052)).toBe(true);
    expect(inInputBound(a, b, 2053, 1053)).toBe(false);
  });

  // The segment (1 300, 900) → (1 550, 1 150) crosses arm 1 at (1 400, 1 000) and arm 2 at ≈ (1 420, 1 020), 28 cm
  // apart along it: N-42 (a)'s sliver partner (a next crossing closer than minEdge) does not apply, yet every placement
  // candidate of the first crossing stands within minEdge of arm 2.
  it('a segment crossing the strip at 45°: the placement rule falls back on arm 1\'s end; no sliver partner; stripPartner names arm 2; placed with arm 2 left out of (iii), the crossing lands on arm 1 beside its exact position', () => {
    const b = indexed(STRIP);
    const p = b.plat;
    expect(allProblems(p)).toEqual([]);
    const ctx = ctxOf(p);
    const a = free(p, 1300, 900);
    const e = free(p, 1550, 1150);
    const cs = exactCrossings(ctx, a, e);
    expect(cs.ok).toBe(true);
    if (!cs.ok) return;
    expect(cs.value.map((c) => [Math.round(c.x), Math.round(c.y)])).toEqual([[1400, 1000], [1420, 1020]]);
    const first = cs.value[0];
    const pl = placePoint(ctx.tx, first.piece.edge, { x: first.x, y: first.y }, { c: pt(1300, 900), d: pt(1550, 1150) });
    expect(pl.ok && pl.value.kind).toBe('endpoint');
    const sp = sliverPartner(ctx, a, e, first);
    expect(sp.ok && sp.value).toBe(null);
    const tp = stripPartner(ctx, a, e, first);
    expect(tp.ok).toBe(true);
    if (!tp.ok || tp.value === null) throw new Error('no strip partner');
    expect(tp.value.map((v) => [p.vertices.x[v], p.vertices.y[v]]).sort()).toEqual([[1020, 1015], [3000, 1040]]);
    const without = placeOnRun(ctx, first.piece.edge, first, { a, b: e, partner: null, reach: 26 });
    expect(without.ok && without.value).toBe(null);
    const across = placeOnRun(ctx, first.piece.edge, first, { a, b: e, partner: tp.value, reach: 26 });
    expect(across.ok).toBe(true);
    if (!across.ok || across.value === null || across.value.kind !== 'split') throw new Error('not placed across');
    expect(across.value.plan.at).toEqual({ x: 1400, y: 1000 });
  });

  it('the chain itself, (1 300, 900) → (1 550, 1 150), mandatory: S4 refused it (its crossing fell back 400 cm along arm 1); the third pass commits it within the bound, across the strip (W_PLACED), the arena valid', () => {
    const b = indexed(STRIP);
    const p = b.plat;
    const chain: [number, number][] = [[1300, 900], [1550, 1150]];
    const r = ins(tx(p, 0), chain, [{ role: 'way', entity: 'way:s' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(codes(r).find(([c]) => c === 'W_PLACED')).toBeDefined();
    expect(fidelityProblems(p, 0, 'mandatory', chain, {}, r.value.placed, 'way:s')).toEqual([]);
    expect(allProblems(p)).toEqual([]);
  });

  it('step 2 inside the strip: a chain from (1 300, 1 008), 8 cm above arm 1, to (1 300, 1 200) across arm 2 — its first point\'s placement falls back on A, 300 cm off — lands on arm 1 across the strip (the far side the chain crosses left out of (iii)) and commits within the bound', () => {
    const b = indexed(STRIP);
    const p = b.plat;
    const chain: [number, number][] = [[1300, 1008], [1300, 1200]];
    const r = ins(tx(p, 0), chain, [{ role: 'way', entity: 'way:t' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(codes(r).find(([c]) => c === 'W_PLACED')).toBeDefined();
    expect(fidelityProblems(p, 0, 'mandatory', chain, {}, r.value.placed, 'way:t')).toEqual([]);
    expect(allProblems(p)).toEqual([]);
  });
});

// ---- the cases that found the readings, and the residual register -------------------------------------------------------

/** One B-FUZZ case: its chains in order, each into the framed arena of its family (support.ts `framed`). */
interface FuzzCase {
  readonly seed: string;
  readonly family: string;
  readonly case: number;
  readonly log: readonly { readonly level: Level; readonly cls: 'mandatory' | 'optional'; readonly closed: boolean; readonly points: readonly (readonly [number, number])[]; readonly pinned?: readonly number[]; readonly entity: string }[];
}
interface Rescue extends FuzzCase {
  readonly mechanism: string;
  readonly warnings: readonly { readonly code: string; readonly count: number; readonly at?: { readonly x: number; readonly y: number } }[];
}
interface Residual {
  readonly class: string;
  readonly detail: string;
  readonly family: string;
  readonly seed?: string;
  readonly case?: number;
  readonly log?: FuzzCase['log'];
  readonly gridCellCm?: number;
  readonly frame?: readonly (readonly [number, number])[];
  readonly segments?: readonly (readonly (readonly [number, number])[])[];
}

const RESCUES = (JSON.parse(readFileSync(new URL('./register/s5-rescues.json', import.meta.url), 'utf8')) as { cases: Rescue[] }).cases;
const RESIDUAL = (JSON.parse(readFileSync(new URL('./register/s5-register.json', import.meta.url), 'utf8')) as { cases: Residual[] }).cases;

/**
 * Replays a B-FUZZ case's chains as B-FUZZ judges them: a refusal writes nothing; a commit keeps N-43 B's bound; the
 * arena valid at the end. Returns the last chain's result.
 */
function replayFuzz(c: FuzzCase): { p: Plat; r: ReturnType<typeof ins>; before: string } {
  const p = framed(4000);
  let r: ReturnType<typeof ins> | null = null;
  let before = '';
  c.log.forEach((k) => {
    const t = tx(p, k.level);
    before = contentPrint(p);
    const opts = { closed: k.closed, ...(k.pinned === undefined ? {} : { pinned: k.pinned }) };
    r = ins(t, k.points, [{ role: 'way', entity: k.entity }], k.cls, opts);
    if (r.ok) expect(fidelityProblems(p, k.level, k.cls, k.points, opts, r.value.placed, k.entity), k.entity).toEqual([]);
    else expect(contentPrint(p)).toBe(before);
  });
  expect(allProblems(p)).toEqual([]);
  return { p, r: r as unknown as ReturnType<typeof ins>, before };
}

describe('S5\'s third pass on the B-FUZZ cases S4 refused (register/s5-rescues.json): each commits within the bound, the arena valid', () => {
  for (const c of RESCUES) {
    it(`${c.mechanism}: seed ${c.seed}, ${c.family} case ${c.case} (${c.log.length} chain${c.log.length === 1 ? '' : 's'})`, () => {
      const { r } = replayFuzz(c);
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(r.warnings).toEqual(c.warnings);
    }, TIMEOUT);
  }
});

/** M0-a-08's overlay arena: a ground arena 2²⁴ cm wide (no margin), its index on a grid of `cell` cm. */
function wideArena(cell: number): Plat {
  const p = createPlat(GROUND, { widthCm: (1 << 24) as Cm, heightCm: (1 << 24) as Cm, aspect: 1, marginShare: 0 });
  attachIndex(p, { gridCellCm: cell });
  return p;
}

describe('N-44 (4): S5\'s residual register (register/s5-register.json) — one case per remaining cause class, each refused E_INVARIANT, writing nothing', () => {
  for (const c of RESIDUAL) {
    it(`${c.class}: ${c.family}${c.seed === undefined ? '' : ` seed ${c.seed} case ${c.case}`} — ${c.detail.slice(0, 60)}…`, () => {
      if (c.log !== undefined) {
        const { r } = replayFuzz({ seed: c.seed ?? '', family: c.family, case: c.case ?? 0, log: c.log });
        expect(r.ok).toBe(false);
        if (r.ok) return;
        expect(r.code).toBe('E_INVARIANT');
        expect(r.detail).toBe(c.detail);
        return;
      }
      const p = wideArena(c.gridCellCm ?? 512);
      const t = tx(p, 0);
      expect(ins(t, c.frame ?? [], [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true }).ok).toBe(true);
      const segs = c.segments ?? [];
      segs.forEach((seg, i) => {
        const before = contentPrint(p);
        const warningsBefore = JSON.stringify(t.warnings);
        const r = ins(t, seg, [{ role: 'invisible', entity: `arr:s${i}` }]);
        if (i < segs.length - 1) {
          if (!r.ok) expect(`${r.code} ${r.detail}`).toBe('E_DEGENERATE empty');
          return;
        }
        expect(r.ok).toBe(false);
        if (r.ok) return;
        expect(r.code).toBe('E_INVARIANT');
        expect(r.detail).toBe(c.detail);
        expect(contentPrint(p)).toBe(before);
        expect(JSON.stringify(t.warnings)).toBe(warningsBefore);
      });
      expect(allProblems(p)).toEqual([]);
    }, TIMEOUT);
  }
});

describe('N-44 (3) as J207 / J208 apply it (caps.ts, C-0217): each property\'s cap is its measured residual plus seed noise', () => {
  it('poissonCap is the 99.9 % point of a Poisson count, at least 1', () => {
    expect(poissonCap(0)).toBe(1);
    expect(poissonCap(0.1)).toBe(2);
    expect(poissonCap(1)).toBe(5);
    expect(poissonCap(10)).toBe(21);
  });

  it('the caps at the PR size are 7 (random), 4 (constructive), 8 (mandatory-only) and 4 (the fidelity property), each above the most any of the 31 measured seeds refused (6, 2, 6, 2); 2, 2, 3 and 1 at 10³; 227, 87, 259 and 67 nightly', () => {
    const fams = ['random', 'constructive', 'mandatory', 'fidelity'] as const;
    expect(fams.map((f) => refusalCap(f, 10_000))).toEqual([7, 4, 8, 4]);
    expect(fams.map((f) => refusalCap(f, 1_000))).toEqual([2, 2, 3, 1]);
    expect(fams.map((f) => refusalCap(f, 1_000_000))).toEqual([227, 87, 259, 67]);
    const most = [6, 2, 6, 2];
    fams.forEach((f, i) => expect(refusalCap(f, 10_000)).toBeGreaterThan(most[i]));
    // The target stays 1 per 10⁴ (KI-1): every measured mean is above it, none is below 0.
    for (const f of fams) expect(MEASURED_PER_1E4[f]).toBeGreaterThan(0);
  });
});
