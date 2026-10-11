// M0-a-04: a closed transaction (N-55 (5), N-11, N-12; C-0294 (1), C-0296) — every closed-overlay pin of steps 1–2,
// split from splitThrough.test.ts with every describe and it title kept: `splitThrough`, `attractVertex`, `attractRun`,
// `applyAttraction` and `applySplitPlan` on the overlay of a committed, rejected or rolled-back batch throw at their entry.
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../../src/arena/index.js';
import { applyAttraction, attractRun, attractVertex, planAttraction } from '../../../src/insert/attractVertex.js';
import { insertTx, type InsertTx } from '../../../src/insert/classes.js';
import { applySplitPlan, planSplitThrough, splitThrough } from '../../../src/insert/splitThrough.js';
import { tx, type Overlay } from '../../../src/tx/index.js';
import { bits } from '../../tx/support.js';
import { callbackSpec, dressQuarters, edgeNear, indexed, problems, pt, QUARTERS } from './support.js';

// ---- N-55 (5): splitThrough refuses a closed transaction (C-0294) ------------------------------------------------------
//
// An overlay outlives its batch only as a programming error: kept from a callback past the commit, a reject or a throw
// that rolled the batch back, it is closed (`InsertTx.closed`, set by M0-a-06's transaction). `splitThrough` on it throws
// at its entry, before it reads or charges anything — tx's assertion class (N-53 (3)), never a typed refusal, never a
// write outside a transaction (the ruling's probe q13) — and the arena stays as it was, bit for bit (C-0294 (1)).

/**
 * The overlay of a QUARTERS batch at L2 that split (500, 300) on the L1 edge (500, 0)–(500, 500), then ended as `how`;
 * `he` the fixture's half-edges by spec edge (the split keeps every existing slot).
 */
function staleSplitOverlay(how: 'committed' | 'rejected' | 'threw'): { p: Plat; o: Overlay; he: readonly number[] } {
  const b = dressQuarters(indexed(QUARTERS));
  const p = b.plat;
  let kept: Overlay | null = null;
  const run = (): unknown =>
    tx(p, callbackSpec(2), (o) => {
      kept = o;
      const r = splitThrough(o, edgeNear(p, 2, 510, 300), pt(510, 300), { role: 'anchor', entity: 'district:1' });
      expect(r.ok).toBe(true);
      if (how === 'rejected') return { ok: false as const, code: 'E_NO_PATH' as const, detail: 'the stage gave up' };
      if (how === 'threw') throw new Error('stage bug');
      return r;
    });
  if (how === 'threw') expect(run).toThrow(/stage bug/);
  else expect((run() as { ok: boolean }).ok).toBe(how === 'committed');
  if (kept === null) throw new Error('the callback never ran');
  return { p, o: kept, he: b.he };
}

describe('N-55 (5): splitThrough on a closed transaction throws — committed, rejected or rolled back by a throw (C-0294)', () => {
  for (const how of ['committed', 'rejected', 'threw'] as const) {
    it(`on a ${how} batch's overlay: throws "the transaction is closed"; the arena bit for bit and its version as they were`, () => {
      const { p, o } = staleSplitOverlay(how);
      expect(o.closed).toBe(true);
      const before = bits(p);
      const version = p.version;
      const g = edgeNear(p, 2, 510, 150); // (500, 0)–(500, 300) after a commit, the whole L1 edge after a reject or throw
      for (const row of [undefined, { role: 'anchor', entity: 'district:2' }]) {
        expect(() => splitThrough(o, g, pt(510, 150), row)).toThrow(/^insert: the transaction is closed \(committed or rejected\)$/);
        expect(bits(p)).toBe(before);
        expect(p.version).toBe(version);
      }
      expect(problems(p)).toEqual([]);
      // the control: the same split in an open batch writes and commits — the throw was the closed overlay, nothing else
      const r = tx(p, callbackSpec(2), (open) => splitThrough(open, g, pt(510, 150)));
      expect(r.ok ? 'committed' : `${r.code}: ${r.detail}`).toBe('committed');
      expect(p.version).toBe(version + 1);
      expect(bits(p)).not.toBe(before);
      expect(problems(p)).toEqual([]);
    });
  }

  it('an open shell transaction (closed unset) and one marked open (closed false) split as before', () => {
    for (const closed of [undefined, false]) {
      const p = dressQuarters(indexed(QUARTERS)).plat;
      const t: InsertTx = closed === undefined ? insertTx(p, 2) : { ...insertTx(p, 2), closed };
      const r = splitThrough(t, edgeNear(p, 2, 510, 300), pt(510, 300));
      expect(r.ok).toBe(true);
      expect(t.journal.vertices.length).toBe(1);
    }
  });
});

// ---- N-11 and N-12 (C-0296): the closed check comes first, and the step-2 writers take it too ---------------------------
//
// N-11: the closed throw precedes every plan, read and charge — a call the plan would refuse (outside the lattice, a
// finer edge, a landing on a finer vertex) still throws the closed message, never a typed refusal, and a lawful attempt
// charges nothing to the dead overlay. N-12: `attractVertex` and `attractRun` (the step-2 entries the barrel exports)
// and the two exported writers under them, `applyAttraction` and `applySplitPlan`, each throw at their entry on a
// closed overlay, never writing it silently (ok, the bits changed, the version +0). The open control of every refused
// shape runs on a shell over the same arena: its refusal or its plan shows what the closed check pre-empts.

const CLOSED = /^insert: the transaction is closed \(committed or rejected\)$/;
const OFF_LATTICE = { x: 1e15, y: 150 } as never;

/** Asserts `call` throws the closed message on `o` with the arena, its version and the overlay's work and warnings as they were. */
function throwsClosed(p: Plat, o: Overlay, call: () => unknown): void {
  const before = bits(p);
  const version = p.version;
  const work = o.work.total;
  const counts = JSON.stringify([...o.work.counts]);
  const warnings = JSON.stringify(o.warnings);
  const journal = JSON.stringify(o.journal);
  expect(call).toThrow(CLOSED);
  expect(bits(p)).toBe(before);
  expect(p.version).toBe(version);
  expect(o.work.total).toBe(work);
  expect(JSON.stringify([...o.work.counts])).toBe(counts);
  expect(JSON.stringify(o.warnings)).toBe(warnings);
  expect(JSON.stringify(o.journal)).toBe(journal);
}

describe('N-11: splitThrough’s closed throw precedes every plan, read and charge (C-0294 (1); C-0296)', () => {
  for (const how of ['committed', 'rejected', 'threw'] as const) {
    it(`on a ${how} batch's overlay: a split the plan would refuse throws the closed message, never a typed refusal; a lawful one charges nothing`, () => {
      const { p, o, he } = staleSplitOverlay(how);
      expect(o.closed).toBe(true);
      const g = edgeNear(p, 2, 510, 150);
      // the controls, on an open shell over the same arena: what the plan answers (nothing written)
      expect(splitThrough(insertTx(p, 2), g, OFF_LATTICE)).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
      expect(splitThrough(insertTx(p, 2), he[23], pt(750, 760))).toMatchObject({ ok: false, code: 'E_LEVEL' }); // an L4 edge
      expect(splitThrough(insertTx(p, 2), he[13], pt(510, 760))).toMatchObject({ ok: false, code: 'E_LEVEL' }); // onto the L4 vertex (500, 750)
      const lawful = insertTx(p, 2);
      expect(planSplitThrough(lawful, g, pt(510, 150)).ok).toBe(true);
      expect(lawful.work.total).toBeGreaterThan(0); // a lawful plan charges
      // the closed overlay: each throws first
      throwsClosed(p, o, () => splitThrough(o, g, OFF_LATTICE));
      throwsClosed(p, o, () => splitThrough(o, he[23], pt(750, 760)));
      throwsClosed(p, o, () => splitThrough(o, he[13], pt(510, 760)));
      throwsClosed(p, o, () => splitThrough(o, g, pt(510, 150)));
      throwsClosed(p, o, () => splitThrough(o, g, pt(510, 150), { role: 'anchor', entity: 'district:2' }));
      expect(problems(p)).toEqual([]);
    });
  }
});

describe('N-12: attractVertex, attractRun, applyAttraction and applySplitPlan on a closed transaction throw (N-55 (5); C-0296)', () => {
  for (const how of ['committed', 'rejected', 'threw'] as const) {
    it(`on a ${how} batch's overlay: the checker's probes throw "the transaction is closed"; the arena, its version and the overlay's work as they were`, () => {
      const { p, o } = staleSplitOverlay(how);
      expect(o.closed).toBe(true);
      // the probes the check ran (checks/M0-a-04-notes.md N-12): open, each would split the L1 line x = 500
      const plan = planAttraction(insertTx(p, 2), pt(505, 120));
      expect(plan.ok && plan.value.kind).toBe('split');
      throwsClosed(p, o, () => attractVertex(o, pt(505, 120)));
      throwsClosed(p, o, () => attractRun(o, [pt(505, 60), pt(505, 200)]));
      expect(problems(p)).toEqual([]);
      // the control: the same calls in an open batch write and commit — the throw was the closed overlay, nothing else
      const before = bits(p);
      const version = p.version;
      const r = tx(p, callbackSpec(2), (open) => {
        const a = attractVertex(open, pt(505, 120));
        if (!a.ok) return { ok: false as const, code: a.code, detail: a.detail };
        return attractRun(open, [pt(505, 60), pt(505, 200)]);
      });
      expect(r.ok ? 'committed' : `${r.code}: ${r.detail}`).toBe('committed');
      expect(p.version).toBe(version + 1);
      expect(bits(p)).not.toBe(before);
      expect(problems(p)).toEqual([]);
    });

    it(`on a ${how} batch's overlay: the throw comes first — before a refusal the plan would give, a charge, or a warning`, () => {
      const { p, o } = staleSplitOverlay(how);
      // the controls on an open shell: E_OUT_OF_RANGE off the lattice; E_LEVEL where (505, 760)'s foot lands on the L4
      // vertex (500, 750); a lawful attraction charges insert.attractQueries; a run of no points is ok
      expect(attractVertex(insertTx(p, 2), OFF_LATTICE)).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
      expect(attractVertex(insertTx(p, 2), pt(510, 760))).toMatchObject({ ok: false, code: 'E_LEVEL' });
      expect(attractRun(insertTx(p, 2), [pt(505, 60), OFF_LATTICE])).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
      const lawful = insertTx(p, 2);
      expect(planAttraction(lawful, pt(505, 120)).ok).toBe(true);
      expect(lawful.work.total).toBeGreaterThan(0);
      expect(attractRun(insertTx(p, 2), []).ok).toBe(true);
      throwsClosed(p, o, () => attractVertex(o, OFF_LATTICE));
      throwsClosed(p, o, () => attractVertex(o, pt(510, 760)));
      throwsClosed(p, o, () => attractVertex(o, pt(505, 505))); // onto the vertex (500, 500): a warning only, open
      throwsClosed(p, o, () => attractRun(o, [OFF_LATTICE]));
      throwsClosed(p, o, () => attractRun(o, [pt(505, 60), OFF_LATTICE]));
      throwsClosed(p, o, () => attractRun(o, []));
    });

    it(`on a ${how} batch's overlay: applyAttraction and applySplitPlan, handed plans made on an open shell, throw before writing`, () => {
      const { p, o } = staleSplitOverlay(how);
      const shell = insertTx(p, 2);
      const split = planAttraction(shell, pt(505, 120));
      const onto = planAttraction(shell, pt(505, 505));
      const free = planAttraction(shell, pt(300, 300));
      const sp = planSplitThrough(shell, edgeNear(p, 2, 510, 150), pt(510, 150), { role: 'anchor', entity: 'district:2' });
      if (!split.ok || !onto.ok || !free.ok || !sp.ok) throw new Error('a shell plan was refused');
      expect([split.value.kind, onto.value.kind, free.value.kind, sp.value.kind]).toEqual(['split', 'vertex', 'free', 'new']);
      for (const plan of [split.value, onto.value, free.value]) throwsClosed(p, o, () => applyAttraction(o, plan));
      throwsClosed(p, o, () => applySplitPlan(o, sp.value));
      expect(problems(p)).toEqual([]);
    });
  }

  it('an open shell transaction (closed unset) and one marked open (closed false) attract as before', () => {
    for (const closed of [undefined, false]) {
      const p = dressQuarters(indexed(QUARTERS)).plat;
      const t: InsertTx = closed === undefined ? insertTx(p, 2) : { ...insertTx(p, 2), closed };
      const a = attractVertex(t, pt(505, 120));
      expect(a.ok && a.value.kind).toBe('split');
      const r = attractRun(t, [pt(505, 360), pt(505, 420)]);
      expect(r.ok && r.value.map((v) => v.attraction)).toEqual(['split', 'split']);
      const shell = insertTx(p, 2);
      const plan = planSplitThrough(shell, edgeNear(p, 2, 510, 250), pt(510, 250));
      if (!plan.ok) throw new Error(plan.detail);
      expect(applySplitPlan(t, plan.value)).toBeGreaterThanOrEqual(0);
      const ap = planAttraction(shell, pt(505, 640));
      if (!ap.ok) throw new Error(ap.detail);
      expect(applyAttraction(t, ap.value).ok).toBe(true);
      expect(t.journal.vertices.length).toBe(5);
      expect(problems(p)).toEqual([]);
    }
  });
});
