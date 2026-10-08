// How an EP-01 cell's run is classified (M0-x-06; C-0273 (6), C-0278 (1)): a refusal counts as laddered only when the
// stage's record names the rung, as left out only when the record reports the piece left out, as refused-safe only when
// the plant's batch log shows the planted batch refused and nothing of the stage committed after it (else
// refused-residue), and is otherwise off — never a pass by default; and EP-23's grade judge (C-0273 (12)). Fabricated
// runs, so each branch is held whatever the stages do today.
import { describe, expect, it } from 'vitest';
import type { ChainRun } from '../../src/edge/chain.js';
import { chainHandling, refusalHandling } from '../../src/edge/ep01.js';
import { EP23_GRADES, gradeProblem } from '../../src/edge/rows.js';

interface Fake {
  bugs?: { stage: string; cls: string }[];
  batch?: { committed: boolean; code?: string } | null;
  after?: { committed: boolean; code?: string; level: number }[];
  insert?: { ok: boolean; code?: string; warnings: string[] } | null;
  data?: Record<string, unknown>;
  growth?: unknown[];
  capacity?: unknown[];
}

function fake(f: Fake): ChainRun {
  return {
    report: { bugs: f.bugs ?? [] },
    plant: { fired: {}, insert: f.insert ?? null, batch: f.batch ?? null, after: f.after ?? [], batches: [], calls: 1, armed: false },
    model: { data: new Map(Object.entries(f.data ?? {})) },
    s5: { state: null, growth: f.growth ?? [], prune: [], capacity: f.capacity ?? [], subs: [], refused: null },
    runs: new Map(),
    ran: [],
    refusals: new Map(),
  } as unknown as ChainRun;
}

const refused = { committed: false, code: 'E_DEGENERATE' };
const committed = { committed: true };

describe("EP-01's classification of a chain stage's run", () => {
  it('a bugs entry of the stage is refused-safe with its code only when the planted batch was refused and nothing committed after it', () => {
    const bug = (stage: string, cls: string) => [{ stage, cls }];
    expect(chainHandling('S4', fake({ bugs: bug('S4', 'E_INVARIANT'), batch: refused }))).toMatchObject({ handling: 'refused-safe', rung: 'E_INVARIANT' });
    expect(chainHandling('S5c', fake({ bugs: bug('S5', 'E_DEGENERATE'), batch: refused, after: [{ committed: false, code: 'E_DEGENERATE', level: 1 }] }))).toMatchObject({ handling: 'refused-safe', rung: 'E_DEGENERATE' });
    // the planted batch committed, then the stage refused: the planted geometry stays (C-0273 (6)'s correction, C-0278 (1))
    expect(chainHandling('S1', fake({ bugs: bug('S1', 'E_INVARIANT'), batch: committed }))).toMatchObject({ handling: 'refused-residue', rung: 'E_INVARIANT', facts: { batchCommitted: true, laterCommitted: 0 } });
    // the planted batch refused, but a later batch of the stage committed before the refusal
    expect(chainHandling('S5a', fake({ bugs: bug('S5', 'E_INVARIANT'), batch: refused, after: [{ committed: true, level: 1 }] }))).toMatchObject({ handling: 'refused-residue', facts: { batchCommitted: false, laterCommitted: 1 } });
    // no planted batch logged: never a pass
    expect(chainHandling('S3', fake({ bugs: bug('S3', 'E_INVARIANT') })).handling).toBe('off');
    expect(refusalHandling(fake({ batch: refused }), 'E_DEGENERATE', 1)).toEqual({ handling: 'refused-safe', rung: 'E_DEGENERATE', facts: { bugs: 1, batchCommitted: false, laterCommitted: 0 } });
  });

  it('S4: laddered only when its report names the rung (every chain unsmoothed)', () => {
    const s4 = (unsmoothed: number) => ({ s4: { report: { unsmoothed, stretchShared: 0 }, graph: { chains: [1, 2, 3] } } });
    expect(chainHandling('S4', fake({ batch: refused, data: s4(3) })).handling).toBe('laddered');
    expect(chainHandling('S4', fake({ batch: refused, data: s4(2) })).handling).toBe('off');
    expect(chainHandling('S4', fake({ batch: refused, data: s4(0) })).handling).toBe('off');
    expect(chainHandling('S4', fake({ batch: committed, data: s4(0) })).handling).toBe('absorbed');
    expect(chainHandling('S4', fake({ batch: refused })).handling).toBe('off');
  });

  it('S1: laddered on report.retried, left out on a body dropped as refused, else off', () => {
    const s1 = (retried: boolean, dropped: { id: string; reason: string }[]) => ({ s1: { report: { retried, dropped }, water: { bodies: [1] } } });
    expect(chainHandling('S1', fake({ batch: refused, data: s1(true, []) })).handling).toBe('laddered');
    expect(chainHandling('S1', fake({ batch: refused, data: s1(false, [{ id: 'water:1', reason: 'refused' }]) })).handling).toBe('left-out');
    expect(chainHandling('S1', fake({ batch: refused, data: s1(false, [{ id: 'water:1', reason: 'short' }]) })).handling).toBe('off');
    expect(chainHandling('S1', fake({ batch: refused, data: s1(false, []) })).handling).toBe('off');
    expect(chainHandling('S1', fake({ batch: committed, data: s1(false, []) })).handling).toBe('absorbed');
  });

  it("S5c / S5d: laddered only on an F-NUM rung in the growth record, left out on batchRefused, else off", () => {
    const rec = (rungs: { cause: string; rung: string }[], extra: Record<string, unknown> = {}) => ({ k: 1, rungs, streets: [], ...extra });
    const no = { ok: false, code: 'E_DEGENERATE', warnings: [] };
    expect(chainHandling('S5c', fake({ insert: no, batch: committed, growth: [rec([{ cause: 'F-NUM', rung: 'reject' }])] })).handling).toBe('laddered');
    expect(chainHandling('S5c', fake({ insert: no, batch: committed, growth: [rec([])] })).handling).toBe('off');
    expect(chainHandling('S5c', fake({ insert: no, batch: committed, growth: [rec([{ cause: 'F-WORK', rung: 'work_cut' }])] })).handling).toBe('off');
    expect(chainHandling('S5c', fake({ insert: no, batch: refused, growth: [rec([], { batchRefused: { code: 'E_INVARIANT' } })] })).handling).toBe('left-out');
    expect(chainHandling('S5c', fake({ insert: { ok: true, warnings: [] }, batch: committed, growth: [rec([])] })).handling).toBe('absorbed');
    expect(chainHandling('S5c', fake({ insert: no, batch: committed })).handling).toBe('off');
    expect(chainHandling('S5d', fake({ insert: no, batch: committed, capacity: [{ rim: rec([{ cause: 'F-NUM', rung: 'reject' }]) }] })).handling).toBe('laddered');
    expect(chainHandling('S5d', fake({ insert: no, batch: committed, capacity: [{ rim: rec([]) }] })).handling).toBe('off');
  });

  it('S3, S5a, S5b: a refused batch with no bugs entry is off; a committed one absorbed', () => {
    for (const st of ['S3', 'S5a', 'S5b'] as const) {
      expect(chainHandling(st, fake({ batch: refused })).handling).toBe('off');
      expect(chainHandling(st, fake({ batch: committed })).handling).toBe('absorbed');
    }
  });
});

describe("EP-23's grade judge (C-0273 (12))", () => {
  it('a route within its class grade passes; one above it, or at a class with no limit, is named', () => {
    for (const [cls, limit] of Object.entries(EP23_GRADES) as [keyof typeof EP23_GRADES, number][]) {
      expect(gradeProblem('gate:1', cls, limit)).toBeNull();
      expect(gradeProblem('gate:1', cls, limit * 0.5)).toBeNull();
      expect(gradeProblem('gate:1', cls, limit * 1.01)).toMatch(/^gate:1: routed at .* climbs /);
    }
    expect(gradeProblem('gate:2', 'secondary', 0)).toBe('gate:2: routed at secondary, a class with no grade limit');
    expect(EP23_GRADES).toEqual({ through: 0.3, primary: 0.6, track: 1.2, path: 2.4 });
  });
});

describe("the pinned residue cells (C-0278 (1): C-0273 (6)'s correction)", () => {
  it('S1, S3 and S5a × zero-area and collinear allow only refused-residue E_INVARIANT, under a KI line naming the residue', async () => {
    const { EDGE_FIXTURES } = await import('../../src/edge/index.js');
    const { ep01Known, ep01Pinned, ep01Residue } = await import('../../src/edge/ep01.js');
    const six: string[] = [];
    for (const f of EDGE_FIXTURES) if (f.expect.allowed.includes('refused-residue')) six.push(f.id);
    expect(six.sort()).toEqual(['EP-01/S1/collinear', 'EP-01/S1/zero-area', 'EP-01/S3/collinear', 'EP-01/S3/zero-area', 'EP-01/S5a/collinear', 'EP-01/S5a/zero-area']);
    for (const id of six) {
      const f = EDGE_FIXTURES.find((x) => x.id === id);
      const [, stage, kind] = id.split('/') as [string, 'S1' | 'S3' | 'S5a', 'zero-area' | 'collinear'];
      expect(f?.expect.allowed).toEqual(['refused-residue']);
      expect(f?.expect.residue?.codes).toEqual(['E_INVARIANT']);
      expect(ep01Residue(stage, kind)).toEqual(['E_INVARIANT']);
      expect(ep01Pinned(stage, kind)).toBeUndefined();
      expect(ep01Known(stage, kind)).toMatch(/batch commits, then .* refuses at its own later check \(E_INVARIANT\) — the planted geometry stays committed with no record/);
    }
  });
});
