// How an EP-01 cell's run is classified (M0-x-06; C-0273 (6), C-0342 (1), (3)): a refusal counts as laddered only when
// the stage's record names the rung, as left out only when the record reports the piece left out, as refused (safe for
// an unlawful plant, lawful for a lawful one) only when the arena after the stage is bit-identical to its start — the
// runner's rollback, whatever the planted batch did before it (C-0278 (1)'s refused-residue retired) — and is otherwise
// off — never a pass by default; and EP-23's grade judge (C-0273 (12)). Fabricated runs, so each branch is held whatever
// the stages do today.
import { describe, expect, it } from 'vitest';
import { restored, type ChainRun, type StageImage } from '../../src/edge/chain.js';
import { chainHandling, lawfulPlant, refusalHandling } from '../../src/edge/ep01.js';
import { EP23_GRADES, gradeProblem } from '../../src/edge/rows.js';

interface Fake {
  bugs?: { stage: string; cls: string }[];
  batch?: { committed: boolean; code?: string } | null;
  after?: { committed: boolean; code?: string; level: number }[];
  insert?: { ok: boolean; code?: string; warnings: string[] } | null;
  data?: Record<string, unknown>;
  growth?: unknown[];
  capacity?: unknown[];
  image?: StageImage | null;
}

const back: StageImage = { stage: 'S4', before: { version: 7, digest: 'd7' }, after: { version: 7, digest: 'd7' } };

function fake(f: Fake): ChainRun {
  return {
    image: f.image === undefined ? back : f.image,
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
  it('a bugs entry of the stage is refused-safe with its code only when the arena is bit-identical to the stage start', () => {
    const bug = (stage: string, cls: string) => [{ stage, cls }];
    expect(chainHandling('S4', fake({ bugs: bug('S4', 'E_INVARIANT'), batch: refused }))).toMatchObject({ handling: 'refused-safe', rung: 'E_INVARIANT', facts: { arenaRestored: true } });
    expect(chainHandling('S5c', fake({ bugs: bug('S5', 'E_DEGENERATE'), batch: refused, after: [{ committed: false, code: 'E_DEGENERATE', level: 1 }] }))).toMatchObject({ handling: 'refused-safe', rung: 'E_DEGENERATE' });
    // the planted batch committed, then the stage refused: the runner's rollback took it back (C-0278 (1)'s residue retired)
    expect(chainHandling('S1', fake({ bugs: bug('S1', 'E_INVARIANT'), batch: committed }))).toMatchObject({ handling: 'refused-safe', rung: 'E_INVARIANT', facts: { batchCommitted: true, laterCommitted: 0, arenaRestored: true } });
    expect(chainHandling('S5a', fake({ bugs: bug('S5', 'E_INVARIANT'), batch: refused, after: [{ committed: true, level: 1 }] }))).toMatchObject({ handling: 'refused-safe', facts: { batchCommitted: false, laterCommitted: 1, arenaRestored: true } });
    // the arena moved (version, or the print alone), or no image was taken: off, with the problem named — never a pass
    for (const image of [{ ...back, after: { version: 9, digest: 'd9' } }, { ...back, after: { version: 7, digest: 'other' } }, null]) {
      const h = chainHandling('S1', fake({ bugs: bug('S1', 'E_INVARIANT'), batch: committed, image }));
      expect(h.handling).toBe('off');
      expect(h.problem).toMatch(/^the refused stage's arena is not bit-identical to its start \(.*\): the rollback did not hold$/);
      expect(h.facts.arenaRestored).toBe(false);
    }
    // no planted batch logged: still judged on the image (a refusal before the plant's batch, rolled back, is safe)
    expect(chainHandling('S3', fake({ bugs: bug('S3', 'E_INVARIANT') })).handling).toBe('refused-safe');
    expect(refusalHandling(fake({ batch: refused }), 'E_DEGENERATE', 1)).toEqual({ handling: 'refused-safe', rung: 'E_DEGENERATE', facts: { bugs: 1, batchCommitted: false, laterCommitted: 0, arenaRestored: true } });
    // the stage's refusal detail rides in the facts (the replay's words)
    const withDetail = { ...fake({ batch: refused }), refusals: new Map([['S4', { code: 'E_DEGENERATE', detail: 'the spines\' batch was refused' }]]) } as ChainRun;
    expect(refusalHandling(withDetail, 'E_DEGENERATE', 1).facts.refusal).toBe("the spines' batch was refused");
    expect(refusalHandling(fake({ batch: refused }), 'E_INVARIANT', 1, true).handling).toBe('refused-lawful');
    expect(restored(back)).toBe(true);
    expect(restored(null)).toBe(false);
  });

  it('a refusal of a lawful plant is refused-lawful (J264): the coincident kind the kernel took, the same ring or arterial with an extra vertex', () => {
    const bug = [{ stage: 'S5', cls: 'E_INVARIANT' }];
    expect(chainHandling('S5a', fake({ bugs: bug, batch: committed, insert: { ok: true, warnings: ['W_STRETCH_SHARED'] } }), 'coincident').handling).toBe('refused-lawful');
    // the kernel refused the doubled chain — its insert, or its batch at commit (§3.10 role consistency): unlawful input
    expect(chainHandling('S5a', fake({ bugs: bug, batch: refused, insert: { ok: false, code: 'E_DEGENERATE', warnings: [] } }), 'coincident').handling).toBe('refused-safe');
    expect(chainHandling('S5a', fake({ bugs: bug, batch: { committed: false, code: 'E_INVARIANT' }, insert: { ok: true, warnings: [] } }), 'coincident').handling).toBe('refused-safe');
    for (const kind of ['zero-length', 'zero-area', 'self-touching', 'collinear'] as const) expect(chainHandling('S5a', fake({ bugs: bug, batch: committed, insert: { ok: true, warnings: [] } }), kind).handling).toBe('refused-safe');
    // S6: the same ring (collinear vertices, a vertex given twice); S8: an extra vertex on the arterial, a way given again
    for (const kind of ['collinear', 'zero-length'] as const) expect(lawfulPlant('S6', kind, false)).toBe(true);
    for (const kind of ['zero-area', 'self-touching', 'coincident'] as const) expect(lawfulPlant('S6', kind, true)).toBe(false);
    for (const kind of ['zero-length', 'coincident'] as const) expect(lawfulPlant('S8', kind, false)).toBe(true);
    for (const kind of ['zero-area', 'self-touching', 'collinear'] as const) expect(lawfulPlant('S8', kind, true)).toBe(false);
    for (const st of ['S1', 'S3', 'S4', 'S5a', 'S5b', 'S5c', 'S5d'] as const) {
      expect(lawfulPlant(st, 'coincident', true)).toBe(true);
      expect(lawfulPlant(st, 'coincident', false)).toBe(false);
      for (const kind of ['zero-length', 'zero-area', 'self-touching', 'collinear'] as const) expect(lawfulPlant(st, kind, true)).toBe(false);
    }
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

describe("the six rolled-back cells (C-0278 (1)'s residue cells; C-0342 (1), (4))", () => {
  it('S1, S3 and S5a × zero-area and collinear are pinned refused-safe with their codes, rolledBack, under a KI line naming the rollback; no cell allows a residue', async () => {
    const { EDGE_FIXTURES } = await import('../../src/edge/index.js');
    const { ep01Known, ep01Pin } = await import('../../src/edge/ep01.js');
    for (const f of EDGE_FIXTURES) expect(f.expect.allowed as readonly string[]).not.toContain('refused-residue');
    const six: string[] = [];
    for (const f of EDGE_FIXTURES) {
      const [ep, stage, kind] = f.id.split('/') as [string, 'S1', 'zero-area'];
      if (ep === 'EP-01' && ep01Pin(stage, kind)?.rolledBack === true) six.push(f.id);
    }
    expect(six.sort()).toEqual(ROLLED_BACK);
    for (const id of six) {
      const f = EDGE_FIXTURES.find((x) => x.id === id);
      const [, stage, kind] = id.split('/') as [string, 'S1' | 'S3' | 'S5a', 'zero-area' | 'collinear'];
      expect(f?.expect.allowed).toContain('refused-safe');
      expect(f?.expect.refusal?.codes).toEqual(ep01Pin(stage, kind)?.codes);
      expect(ep01Known(stage, kind)).toMatch(/the planted batch commits first and the runner rolls the stage back whole \(N-55 \(6\)\); refused safe: typed, one bugs entry, the arena bit-identical to the stage's start/);
      // the cell's judge refuses a refusal whose facts do not show the arena put back
      const o = { handling: 'refused-safe' as const, rung: 'E_INVARIANT', problems: [], facts: { arenaRestored: false } };
      expect(f?.expect.judge?.(o)).toMatch(/without the arena put back bit for bit/);
      expect(f?.expect.judge?.({ ...o, facts: { arenaRestored: true } })).toBeNull();
    }
  });
});

/** The cells whose planted batch commits before the stage refuses (re-pinned from the round's 1 000-seed run). */
const ROLLED_BACK = ['EP-01/S1/collinear', 'EP-01/S1/zero-area', 'EP-01/S3/collinear', 'EP-01/S3/zero-area', 'EP-01/S5a/collinear', 'EP-01/S5a/zero-area'];
