// M0-d-08: the issue-order harness (§13.2 "a callback-form stage run twice, on a slot-renumbered arena and inside the
// pool at sizes 0–3 gives identical digests (issue order; op permutation does not apply to it, §3.3)"). runTwiceCompare's
// report, the bar on M0-a-06's callback-form fixtures and the crowded and partitioner fixtures, and the controls: a
// callback whose issue order follows slot numbers, and one carrying state from an earlier run, are both caught.
import { describe, expect, it, vi } from 'vitest';
import { insertChain, isFaceLive, setOwner, type Overlay, type Plat } from '@plat/kernel';
import {
  compareOutcomes,
  determinismPoint as lp,
  fixtureSpec,
  runSequenceOutcomes,
  runTwiceCompare,
  type DeterminismSequence,
} from '@plat/testkit';
import { CROWDED, KERNEL_SEQUENCES, partitionerSequence, SEQUENCE_DATA } from './support.js';

// The bars run every fixture through several runs each: more than vitest's default 5 s per test.
vi.setConfig({ testTimeout: 180_000 });

describe('runTwiceCompare(seq): fresh, again, reversed slots and renumbered slots before every batch', () => {
  it('reports the runs, one digest and outcome per batch, and the deferred pool clause (M1)', () => {
    const s = KERNEL_SEQUENCES[2];
    const r = runTwiceCompare(s);
    expect(r.name).toBe(s.name);
    expect(r.runs).toEqual(['fresh', 'again', 'reversed', 'renumbered']);
    expect(r.batches).toBe(3);
    expect(r.outcomes).toEqual(['commit', 'refused E_INVARIANT', 'commit']);
    expect(new Set(r.digests).size).toBe(3);
    for (const d of r.digests) expect(d).toMatch(/^[0-9a-f]{32}$/);
    expect(r.identical).toBe(true);
    expect(r.divergence).toBeNull();
    expect(r.deferred).toEqual(['pool sizes 0–3 (§13.2; the pool and its overlays, §3.3) → M1 (§4b)']);
  });

  it('the digests are the outcomes\' (one batch\'s print changed changes its digest only)', () => {
    const a = runSequenceOutcomes(KERNEL_SEQUENCES[0]);
    const b = runSequenceOutcomes(KERNEL_SEQUENCES[0]);
    expect(b.map((o) => o.digest)).toEqual(a.map((o) => o.digest));
    const c = b.map((o, i) => (i === 3 ? { ...o, digest: 'x', print: `${o.print}\nextra` } : o));
    const d = compareOutcomes('edited', a, c);
    expect(d).toEqual({ run: 'edited', batch: a[3].batch, line: a[3].print.split('\n').length, expected: '(none)', actual: 'extra' });
    expect(compareOutcomes('short', a, a.slice(0, 2))?.batch).toBe(a[2].batch);
  });
});

describe('the bar: the callback form\'s issue order — run twice and on renumbered arenas, identical (§13.2)', () => {
  it('every M0-a-06 batch fixture (callback batches among declared ones), under three renumbering seeds', () => {
    const callbacks = SEQUENCE_DATA.flatMap((s) => s.batches.filter((b) => b.form === 'callback')).length;
    expect(callbacks).toBeGreaterThanOrEqual(8);
    for (const s of KERNEL_SEQUENCES) {
      for (const seed of [1, 2, 3]) {
        const r = runTwiceCompare(s, { seed });
        expect(r.divergence, `${s.name} seed ${seed}`).toBeNull();
      }
    }
  });

  it('the crowded fixtures and M0-a-07\'s partitioners', () => {
    for (const s of [...CROWDED, partitionerSequence()]) expect(runTwiceCompare(s).divergence, s.name).toBeNull();
  });
});

describe('the controls: an issue order that follows slots, and state carried between runs, are caught', () => {
  /** The grid; then a callback that owns the free L1 blocks one after another in face-slot order, each by the next name. */
  function slotOrdered(): DeterminismSequence {
    const grid = KERNEL_SEQUENCES[0];
    return {
      name: 'issue order by face slot',
      arena: grid.arena,
      batches: [
        grid.batches[0],
        {
          name: 'own blocks in slot order',
          build: (p: Plat) => ({
            spec: fixtureSpec(1),
            fn: (o: Overlay) => {
              let k = 0;
              for (let f = 0; f < p.slots.face[1].top; f++) {
                if (!isFaceLive(p, 1, f) || p.faces[1].owner[f] >= 0) continue;
                const r = setOwner(o, [f], `district:${k++}`);
                if (!r.ok) return r;
              }
              return { ok: true, value: null, warnings: [] };
            },
          }),
        },
      ],
    };
  }

  it('an issue order by slot is caught on the renumbered arenas, not by running twice', () => {
    const r = runTwiceCompare(slotOrdered());
    expect(r.identical).toBe(false);
    expect(r.divergence?.run).toBe('reversed');
    expect(r.divergence?.batch).toBe('own blocks in slot order');
  });

  it('a callback reading state an earlier run left (a counter outside the batch) is caught by running again', () => {
    let calls = 0;
    const leaky: DeterminismSequence = {
      name: 'state carried between runs',
      arena: KERNEL_SEQUENCES[0].arena,
      batches: [
        {
          name: 'a chain placed by a counter',
          build: () => ({
            spec: fixtureSpec(1),
            fn: (o: Overlay) => {
              calls++;
              return insertChain(o, [lp(500, 500 + 100 * (calls % 2)), lp(2500, 2500)], [{ role: 'way', entity: 'way:leak' }], 'mandatory');
            },
          }),
        },
      ],
    };
    const r = runTwiceCompare(leaky);
    expect(r.identical).toBe(false);
    expect(r.divergence?.run).toBe('again');
  });
});
