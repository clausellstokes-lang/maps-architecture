// M0-a-06: the transaction's forms and its atomicity (§3.3 *Two op forms*, *Work limits instead of clocks*, §2.2 rule 8;
// §13.1: "a transaction with no op commits nothing and keeps the version; one exceeding workLimit returns E_WORK_LIMIT
// and commits nothing"), and the interfaces the item lists under the design's names.
import { describe, expect, it } from 'vitest';
import * as kernel from '../../src/index.js';
import { insertChain } from '../../src/insert/index.js';
import type { KernelError } from '../../src/num/index.js';
import { clearFiner, kernelOp, opInsertChain, opRemoveEdges, removeEdges, retypeEdges, setOwner, tx, type Overlay } from '../../src/tx/index.js';
import type { Polygon } from '../../src/types/index.js';
import { between, bits, commit, declared, framed, healthy, lin, must, pt, spec, state } from './support.js';

const way = (n: number, a: readonly [number, number], b: readonly [number, number]) =>
  opInsertChain(lin(n), 0, [pt(a[0], a[1]), pt(b[0], b[1])], [{ role: 'way', entity: `way:${n}` }], 'mandatory');

describe('the interfaces M0-a-06 lists, under the design\'s names through @plat/kernel', () => {
  it('tx, removeEdges, clearFiner, retypeEdges, setOwner, sampleProfile, cutKnot, joinProfiles, renumberKnots (the types are types)', () => {
    for (const name of ['tx', 'removeEdges', 'clearFiner', 'retypeEdges', 'setOwner', 'sampleProfile', 'cutKnot', 'joinProfiles', 'renumberKnots', 'kernelOp', 'canonicalOrder']) {
      expect(typeof (kernel as Record<string, unknown>)[name]).toBe('function');
    }
    const codes: KernelError[] = ['E_WORK_LIMIT', 'E_KEPT', 'E_LEVEL', 'E_STRUCTURAL', 'E_SCOPE'];
    expect(codes).toHaveLength(5);
  });
});

describe('§13.1: a transaction with no op commits nothing and keeps the version', () => {
  it('a declared batch with no op, and a callback that issues none', () => {
    const p = framed();
    const before = state(p);
    const a = declared(p, 1, []);
    expect(a.ok).toBe(true);
    if (a.ok) expect(a.value.record).toBeNull();
    const b = tx(p, spec(1), () => ({ ok: true as const, value: 7, warnings: [] }));
    expect(b.ok).toBe(true);
    if (b.ok) {
      expect(b.value.record).toBeNull();
      expect(b.value.value).toBe(7);
    }
    expect(state(p)).toBe(before);
  });

  it('a callback whose one op is refused (atomically) and which goes on commits nothing either', () => {
    const p = framed();
    const before = state(p);
    const r = tx(p, spec(1), (o) => {
      const x = insertChain(o, [pt(100, 100), pt(110, 100)], [{ role: 'way', entity: 'way:1' }], 'optional');
      expect(x.ok).toBe(false);
      return { ok: true as const, value: null, warnings: [] };
    });
    expect(r.ok && r.value.record === null).toBe(true);
    expect(state(p)).toBe(before);
  });
});

describe('§13.1: a transaction exceeding its workLimit returns E_WORK_LIMIT and commits nothing (a count, never a clock)', () => {
  it('the same declared batch at its measured work commits, one operation less refuses, the version kept', () => {
    const ops = [way(1, [0, 2000], [4000, 2000]), way(2, [2000, 0], [2000, 4000])];
    const probe = framed();
    const ok1 = declared(probe, 1, ops);
    expect(ok1.ok).toBe(true);
    const work = ok1.ok ? (ok1.value.record?.work as number) : -1;
    expect(work).toBeGreaterThan(0);
    // Counts are identical run to run: the same batch on a fresh arena charges the same work.
    const again = framed();
    const ok2 = declared(again, 1, ops, { workLimit: work });
    expect(ok2.ok && ok2.value.record?.work).toBe(work);
    const p = framed();
    const before = state(p);
    const r = declared(p, 1, ops, { workLimit: work - 1 });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_WORK_LIMIT');
    expect(state(p)).toBe(before);
    expect(p.version).toBe(0);
  });

  it('a callback that ignores an op\'s E_WORK_LIMIT and goes on: every later op refuses, the batch rejects', () => {
    const p = framed();
    const before = state(p);
    let later: string | null = null;
    const r = tx(p, spec(1, { workLimit: 3 }), (o) => {
      const a = insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory');
      expect(a.ok).toBe(false);
      const b = removeEdges(o, { role: 'margin', entity: 'terrain:1' });
      later = b.ok ? 'ok' : b.code;
      return { ok: true as const, value: null, warnings: [] };
    });
    expect(later).toBe('E_WORK_LIMIT');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_WORK_LIMIT');
    expect(state(p)).toBe(before);
  });

  it('a fractional limit (a law\'s floor + perUnit × count, C-0174) is a limit like any other (C-0185 (5))', () => {
    const p = framed();
    const r = declared(p, 1, [way(1, [0, 2000], [4000, 2000])], { workLimit: 2.5 });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_WORK_LIMIT');
  });
});

describe('§2.2 rule 8: a failed batch leaves the arena at the previous version, bit for bit', () => {
  it('a declared batch whose later op is refused: every earlier op undone', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const before = state(p);
    // way:2 commits; removing the L0 margin from an L1 batch is E_LEVEL, so the batch rejects.
    const r = declared(p, 1, [way(2, [2000, 0], [2000, 4000]), opRemoveEdges(lin(3), 0, { role: 'margin', entity: 'terrain:1' })]);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_LEVEL');
    expect(state(p)).toBe(before);
    healthy(p);
  });

  it('a callback that throws: the arena restored, the error passed on', () => {
    const p = framed();
    const before = state(p);
    expect(() => tx(p, spec(1), (o) => {
      must(insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      throw new Error('stage bug');
    })).toThrow('stage bug');
    expect(state(p)).toBe(before);
    healthy(p);
    // The arena takes the next batch as usual.
    commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    healthy(p);
  });

  it('a callback returning a refusal: nothing committed', () => {
    const p = framed();
    const before = state(p);
    const r = tx(p, spec(1), (o) => {
      must(insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return { ok: false as const, code: 'E_NO_PATH' as const, detail: 'the stage gave up' };
    });
    expect(r.ok).toBe(false);
    expect(state(p)).toBe(before);
  });
});

describe('the declarations a transaction refuses (programming errors and staged features)', () => {
  it('both forms at once is an assertion', () => {
    const p = framed();
    expect(() => tx(p, spec(1, { ops: [way(1, [0, 2000], [4000, 2000])] }), () => ({ ok: true as const, value: 0, warnings: [] }))).toThrow(/never both/);
  });

  it('clearRegion and prepared are M3a\'s; a transient arena\'s key is M6-P\'s; another arena\'s key, a soft expect row', () => {
    const p = framed();
    const ring: Polygon = [pt(0, 0), pt(10, 0), pt(10, 10)];
    expect(() => tx(p, spec(1, { clearRegion: [ring] }), (o: Overlay) => ({ ok: true as const, value: o.level, warnings: [] }))).toThrow(/notBuilt\('M3a'\)/);
    expect(() => tx(p, spec(1, { prepared: [] }), () => ({ ok: true as const, value: 0, warnings: [] }))).toThrow(/notBuilt\('M3a'\)/);
    expect(() => tx(p, spec(1, { key: { transient: true, owner: 'building:1', n: 0 } }), () => ({ ok: true as const, value: 0, warnings: [] }))).toThrow(/notBuilt\('M6-P'\)/);
    expect(() => tx(p, spec(1, { key: { layer: 'ground', part: 1 } }), () => ({ ok: true as const, value: 0, warnings: [] }))).toThrow(/arena its key names/);
    expect(() => tx(p, spec(1, { expect: [{ name: 'soft', scope: 'batch', class: 'soft', kind: 'check', check: 'x' }] }), () => ({ ok: true as const, value: 0, warnings: [] }))).toThrow(/hard rows only/);
    expect(state(p)).toContain('#v0');
  });

  it('a writer handed a closed overlay is a programming error', () => {
    const p = framed();
    let kept: Overlay | null = null;
    commit(p, 1, (o) => {
      kept = o;
      return insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory');
    });
    expect(() => removeEdges(kept as unknown as Overlay, { role: 'way', entity: 'way:1' })).toThrow(/closed/);
  });
});

/** The overlay of a batch that ended as `how` (its callback wrote a way first), and the arena after it. */
function staleOverlay(how: 'committed' | 'rejected' | 'threw'): { p: ReturnType<typeof framed>; o: Overlay } {
  const p = framed();
  commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
  let kept: Overlay | null = null;
  const run = (): unknown => tx(p, spec(1), (o) => {
    kept = o;
    must(insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    if (how === 'rejected') return { ok: false as const, code: 'E_NO_PATH' as const, detail: 'the stage gave up' };
    if (how === 'threw') throw new Error('stage bug');
    return { ok: true as const, value: null, warnings: [] };
  });
  if (how === 'threw') expect(run).toThrow(/stage bug/);
  else run();
  return { p, o: kept as unknown as Overlay };
}

describe('N-55 (5): tx\'s writers refuse a closed overlay — committed, rejected or rolled back by a throw (a programming error)', () => {
  const writers: [string, (o: Overlay) => unknown][] = [
    ['removeEdges', (o) => removeEdges(o, { role: 'way', entity: 'way:1' })],
    ['clearFiner', (o) => clearFiner(o, { owner: 'block:1', level: 1 }, 1)],
    ['retypeEdges', (o) => retypeEdges(o, { role: 'way', entity: 'way:1' }, [{ role: 'district_bound', entity: 'district:1' }], [])],
    ['setOwner', (o) => setOwner(o, [0], 'block:1')],
  ];
  for (const how of ['committed', 'rejected', 'threw'] as const) {
    for (const [name, write] of writers) {
      it(`${name} on a ${how} batch's overlay throws; the arena bit for bit and its version as they were`, () => {
        const { p, o } = staleOverlay(how);
        const before = bits(p);
        const version = p.version;
        expect(() => write(o)).toThrow(/^tx: the transaction is closed \(committed or rejected\)$/);
        expect(bits(p)).toBe(before);
        expect(p.version).toBe(version);
        healthy(p);
      });
    }
  }
});

/** The error `f` throws (the test fails when it throws none). */
function thrown(f: () => unknown): Error {
  try {
    f();
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
    return e as Error;
  }
  throw new Error('nothing was thrown');
}

describe('N-53 (3): a throw inside a batch rolls it back whole and is rethrown with where it arose (§3.11\'s assertion class)', () => {
  /** A committed L1 way: the arena the throwing batches start from. */
  const start = (): ReturnType<typeof framed> => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    return p;
  };
  /** After a throw: the arena bit for bit and its version as before, the next batch opens and commits. */
  const unchanged = (p: ReturnType<typeof framed>, before: string, version: number): void => {
    expect(bits(p)).toBe(before);
    expect(p.version).toBe(version);
    healthy(p);
    const c = commit(p, 1, (o) => insertChain(o, [pt(1000, 0), pt(1000, 4000)], [{ role: 'way', entity: 'way:9' }], 'mandatory'));
    expect(c.record?.version).toBe(version + 1);
    expect(p.version).toBe(version + 1);
    healthy(p);
  };

  it('a callback throwing after several writes: the image back, the error prefixed `tx <stage>/L<level>/callback/fn: ` with its cause', () => {
    const p = start();
    const before = bits(p);
    const version = p.version;
    const bug = new Error('stage bug');
    const e = thrown(() => tx(p, spec(1), (o) => {
      must(insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
      must(insertChain(o, [pt(0, 1000), pt(4000, 1000)], [{ role: 'way', entity: 'way:3' }], 'mandatory'));
      must(removeEdges(o, { role: 'way', entity: 'way:3' }));
      throw bug;
    }));
    expect(e.message).toBe('tx 8/L1/callback/fn: stage bug');
    expect(e.cause).toBe(bug);
    unchanged(p, before, version);
  });

  it('a callback that corrupts a rotation (a planted invalid write) and then throws: the image back, bit for bit', () => {
    const p = start();
    const before = bits(p);
    const version = p.version;
    const e = thrown(() => tx(p, spec(1), (o) => {
      must(insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
      const h = between(o.plat, [2000, 2000], [4000, 2000]);
      o.plat.halfEdges.next[h] = h; // the rotation at (4000,2000) no longer closes
      throw new Error('planted');
    }));
    expect(e.message).toBe('tx 8/L1/callback/fn: planted');
    unchanged(p, before, version);
  });

  it('a callback that corrupts a rotation and returns ok: the batch never commits the corruption (the arena\'s check throws at commit)', () => {
    const p = start();
    const before = bits(p);
    const version = p.version;
    const e = thrown(() => tx(p, spec(1), (o) => {
      must(insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
      const h = between(o.plat, [2000, 2000], [4000, 2000]);
      o.plat.halfEdges.next[h] = h;
      return { ok: true as const, value: null, warnings: [] };
    }));
    expect(e.message).toMatch(/^tx 8\/L1\/callback\/commit: /);
    expect(e.cause).toBeInstanceOf(Error);
    unchanged(p, before, version);
  });

  it('one of tx\'s writers throwing inside a callback names itself; a writer that returned leaves `fn`', () => {
    const p = start();
    const before = bits(p);
    const version = p.version;
    const e = thrown(() => tx(p, spec(1), (o) => {
      must(insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
      return removeEdges(o, { role: 'no_such_role', entity: 'way:2' });
    }));
    expect(e.message).toBe('tx 8/L1/callback/removeEdges: tx: no role named no_such_role');
    expect((e.cause as Error).message).toBe('tx: no role named no_such_role');
    unchanged(p, before, version);
    const e2 = thrown(() => tx(p, spec(1, { stage: 5 as never }), (o) => {
      must(removeEdges(o, { role: 'way', entity: 'way:9' }));
      throw new Error('after the writer');
    }));
    expect(e2.message).toBe('tx 5/L1/callback/fn: after the writer');
  });

  it('a declared op throwing after an earlier op wrote: the image back, the error names the op\'s kind', () => {
    const p = start();
    const before = bits(p);
    const version = p.version;
    const e = thrown(() => declared(p, 1, [way(2, [2000, 0], [2000, 4000]), kernelOp('setOwner', lin(7), 0, () => {
      throw new Error('op bug');
    })]));
    expect(e.message).toBe('tx 8/L1/declared/setOwner: op bug');
    unchanged(p, before, version);
  });
});
