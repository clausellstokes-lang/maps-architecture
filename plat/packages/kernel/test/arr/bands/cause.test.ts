// RULING J433 (the session, 2026-10-19; N-44 (3): 'a refusal caused in the item's own code'): a refusal raised by the
// dry-run's own post-conditions (KEPT_DEEP, CENSUS_DEEP, UNLAID_DEEP) is classed insertChain's when the replay of the same
// parts through insertChain alone shows the INSERTION changed the part at the refusing place — (a) a run end held off its
// input point (attraction within attractCm, or §3.6's placement fallback), (b) a run's points merged or collapsed under
// minEdge, (c) a run with no route — and stays the item's own where the replay holds the part exactly as given. One
// unit test per reading of replay.ts's `holdOf` (on runs laid by insertChain itself on a small arena), and `classify`'s
// judgement of each.
import { describe, expect, it } from 'vitest';
import { LATTICE } from '../../../src/num/index.js';
import { CENSUS_DEEP, KEPT_DEEP, UNLAID_DEEP } from '../../../src/arr/kerb.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { framed, ins, tx as shell } from '../../insert/step3-5/support.js';
import { classify, holdOf, layRun, POST_CONDITIONS, type Held, type LaidSegs, type Replay, type RunHold } from './replay.js';
import { pt } from './support.js';

/** A run laid on a shell of the arena at L2 under an `invisible` row, every index pinned, as the dry-run lays it. */
function lay(points: [number, number][], closed = false): { p: ReturnType<typeof framed>; run: RunHold; made: Set<number> } {
  const p = framed();
  // L1 content within attractCm of the runs that meet it: a way from (1000, 1000) to (3000, 1000)
  const w = ins(shell(p, 1), [[1000, 1000], [3000, 1000]], [{ role: 'way', entity: 'way:0' }]);
  expect(w.ok).toBe(true);
  const t = shell(p, 2);
  const input = points.map(([x, y]) => pt(x, y));
  const r = ins(t, points, [{ role: 'invisible', entity: 'arr:dry:0' }], 'mandatory', { closed, pinned: points.map((_, k) => k) });
  expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
  if (!r.ok) throw new Error('unreachable');
  return { p, run: { input, closed, status: 'laid', placed: r.value.placed.slice(), given: input }, made: new Set(t.journal.vertices) };
}

const replayOf = (held: Held, chain: LatticePoint[] = [pt(0, 0), pt(100, 0)], wellFormed = true): Replay => ({ where: 'dry-run', code: '', detail: '', chain, closed: false, wellFormed, held });
const refusal = (detail: string) => ({ code: 'E_INVARIANT', detail });

describe('J433: the cause reading of a dry-run post-condition refusal (replay.ts holdOf, classify)', () => {
  it('(a) a run end held off its point by attraction within attractCm: displaced, insertChain\'s', () => {
    // the run's first point (1010, 1012) lies 12 cm from the L1 way: the insertion holds it on the way
    const { p, run, made } = lay([[1010, 1012], [1600, 2000], [2200, 2600]]);
    const h = holdOf(p, 3, [run], made);
    expect(h.reading).toBe('displaced');
    expect(h.part).toBe(3);
    expect(h.at).toEqual(pt(1010, 1012));
    expect(h.vertex).not.toEqual(pt(1010, 1012));
    expect(h.cm).toBeGreaterThan(0);
    expect(h.cm).toBeLessThanOrEqual(LATTICE.attractCm);
    expect(h.all[0]).toMatch(/^displaced \(1010, 1012\) -> /);
    for (const d of POST_CONDITIONS) expect(classify(refusal(d), replayOf(h))).toBe('insertChain');
  });

  it('(b) two points of a run closer than minEdge merged at the first (pinned against decimation): merged, insertChain\'s', () => {
    const { p, run, made } = lay([[2000, 2000], [2010, 2000], [2600, 2600]]);
    expect(run.placed[0]).toBe(run.placed[1]);
    const h = holdOf(p, 0, [run], made);
    expect(h.reading).toBe('merged');
    expect(h.at).toEqual(pt(2010, 2000));
    expect(h.vertex).toEqual(pt(2000, 2000));
    expect(h.cm).toBe(10);
    expect(classify(refusal(CENSUS_DEEP), replayOf(h))).toBe('insertChain');
    // a run collapsing to one point (E_DEGENERATE 'empty') is the same reading
    const c = holdOf(p, 0, [{ ...run, status: 'collapsed', placed: [] }], made);
    expect(c.reading).toBe('merged');
  });

  it('(c) a run no route laid: no-route, insertChain\'s', () => {
    const { p, run, made } = lay([[2000, 3000], [2500, 3200], [3000, 3000]]);
    const h = holdOf(p, 1, [{ ...run, status: 'no-route', placed: [] }], made);
    expect(h.reading).toBe('no-route');
    expect(h.at).toEqual(pt(2000, 3000));
    expect(classify(refusal(UNLAID_DEEP), replayOf(h))).toBe('insertChain');
  });

  it('an exact hold (every run where it was given) stays the item\'s own; so does a non-post-condition or a malformed part', () => {
    const { p, run, made } = lay([[2000, 3000], [2500, 3200], [3000, 3000]]);
    const h = holdOf(p, 2, [run], made);
    expect(h.reading).toBe('exact');
    expect(h.all).toEqual([]);
    expect(classify(refusal(KEPT_DEEP), replayOf(h))).toBe('own');
    // a displaced hold judges only the post-conditions: another of the item's refusals stays its own
    const { p: q, run: d, made: m } = lay([[1010, 1012], [1600, 2000], [2200, 2600]]);
    const moved = holdOf(q, 0, [d], m);
    expect(classify(refusal('outline: piece 0 of the face 1 ends on a dangling tip at (1, 2), off the face\'s boundary (N-57 (2))'), replayOf(moved))).toBe('own');
    // and a part whose input is not well formed is the item's own
    expect(classify(refusal(KEPT_DEEP), replayOf(moved, [pt(0, 0), pt(0, 0)], false))).toBe('own');
    // the pre-J433 reading stands beside it: the same code and detail met by insertChain alone
    expect(classify(refusal('insert: no route from (0, 228) to (43, 231)'), { where: 'dry-run', code: 'E_INVARIANT', detail: 'insert: no route from (0, 228) to (43, 231)', chain: [pt(0, 228), pt(43, 231)], closed: false, wellFormed: true })).toBe('insertChain');
    expect(classify(refusal(KEPT_DEEP), null)).toBe('own');
  });

  it('the replay lays a segment an earlier part laid along that part\'s held edges (the dry-run\'s sharedPath; notes row 45)', () => {
    // part 0's run passes 10 cm from the L1 way's end w = (2000, 2010): held through w; part 1 repeats its segment the
    // other way round, and is given through w as part 0 holds it (laid apart, it would be attracted on its own)
    const p = framed();
    const w = ins(shell(p, 1), [[2000, 2010], [2000, 3000]], [{ role: 'way', entity: 'way:w' }]);
    expect(w.ok).toBe(true);
    const sh = shell(p, 2);
    const segs: LaidSegs = new Map();
    const a = layRun(sh, segs, 'arr:dry:0', { points: [pt(1000, 2000), pt(3000, 2000)], closed: false });
    expect('where' in a).toBe(false);
    expect((a as RunHold).status).toBe('laid');
    expect(segs.size).toBe(1);
    const b = layRun(sh, segs, 'arr:dry:1', { points: [pt(3000, 2000), pt(1000, 2000), pt(1000, 1500)], closed: false });
    expect('where' in b).toBe(false);
    const held = b as RunHold;
    expect(held.status).toBe('laid');
    expect(held.input).toEqual([pt(3000, 2000), pt(1000, 2000), pt(1000, 1500)]);
    expect(held.given).toEqual([pt(3000, 2000), pt(2000, 2010), pt(1000, 2000), pt(1000, 1500)]);
  });
});
