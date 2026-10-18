// S6 takes a lawful boundary with exactly collinear vertices (M0-e-04 session fix round S2; N-56 (2); docs/M0-FIX-QUEUE.md
// Q21; C-0305; C-0122: it reads testkit's chain, so it lies here): on the M0-x-06 checker's seed 1165799859 S5's last
// boundary (31 points) is given M0-x-06's `collinear` kind (42 points, still simple and counter-clockwise) before S6
// reads it; before the round S6 refused it E_INVARIANT ("the overlay's outer ring is not the boundary's offset (the sum
// check failed)") with no batch — a town with no districts. Now S6 commits, and its perimeter is the unplanted run's,
// byte for byte.
import type { LatticePoint } from '@plat/kernel';
import { mergeCollinear, simpleCcw, type S6Output } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { edgeChain, SMALL_FLAT } from '../../../src/edge/chain.js';
import { degenerateRing } from '../../../src/edge/kinds.js';

const SEED = 1165799859;

describe('S6 on a boundary with collinear vertices (N-56 (2))', () => {
  it('seed 1165799859: the collinear kind is taken — S6 commits the clean outline’s perimeter', { timeout: 300_000 }, () => {
    const clean = edgeChain(SEED, { blueprint: SMALL_FLAT, upTo: 'S6' });
    let sizes: [number, number] | null = null;
    let simple = false;
    const planted = edgeChain(SEED, {
      blueprint: SMALL_FLAT,
      upTo: 'S6',
      s5: {
        after: (state) => {
          const b = state.stages[state.lastWithLand - 1]?.boundary;
          if (b === null || b === undefined) return;
          const before = b.set.outline.length;
          (b.set as { outline: unknown }).outline = degenerateRing(b.set.outline, 'collinear');
          sizes = [before, b.set.outline.length];
          simple = simpleCcw(b.set.outline as LatticePoint[]);
        },
      },
    });
    expect(sizes).toEqual([31, 42]);
    expect(simple).toBe(true);
    for (const run of [clean, planted]) {
      const ref = run.refusals.get('S6');
      expect(ref === undefined ? 'none' : `${ref.code} ${ref.detail}`).toBe('none');
      expect(run.ran).toContain('S6');
    }
    const a = clean.model.data.get('s6') as S6Output | undefined;
    const b = planted.model.data.get('s6') as S6Output | undefined;
    expect(a !== undefined && b !== undefined).toBe(true);
    if (a === undefined || b === undefined) return;
    expect(b.perimeter).toEqual(a.perimeter);
    expect(b.districts.length).toBe(a.districts.length);
    expect(b.districts.length).toBeGreaterThan(0);
  });

  it('a natural outline with a collinear vertex (seed 103): S6 commits the merged outline’s perimeter — the shift the round makes, by rule', { timeout: 300_000 }, () => {
    // Of the SMALL_FLAT seeds 1–400 whose S5 reaches S6 (398), only seed 103's last boundary carries an exactly
    // collinear vertex (one); its perimeter loses the one redundant vertex the convolution laid on the straight run
    // (314 → 313 points). Every outline without one is unchanged (the 100 count-law seeds' digest in collinear.test.ts).
    let coll = -1;
    const natural = edgeChain(103, {
      blueprint: SMALL_FLAT,
      upTo: 'S6',
      s5: {
        after: (state) => {
          const b = state.stages[state.lastWithLand - 1]?.boundary;
          if (b === null || b === undefined) return;
          coll = b.set.outline.length - mergeCollinear(b.set.outline as LatticePoint[]).length;
        },
      },
    });
    const merged = edgeChain(103, {
      blueprint: SMALL_FLAT,
      upTo: 'S6',
      s5: {
        after: (state) => {
          const b = state.stages[state.lastWithLand - 1]?.boundary;
          if (b === null || b === undefined) return;
          (b.set as { outline: unknown }).outline = mergeCollinear(b.set.outline as LatticePoint[]);
        },
      },
    });
    expect(coll).toBe(1);
    const a = natural.model.data.get('s6') as S6Output | undefined;
    const b = merged.model.data.get('s6') as S6Output | undefined;
    expect(a !== undefined && b !== undefined).toBe(true);
    if (a === undefined || b === undefined) return;
    expect(a.perimeter).toEqual(b.perimeter);
    expect(a.perimeter.length).toBe(313);
  });

  it('self-touching 2191303060 was the collinear defect (its outline carries two collinear vertices): now absorbed; coincident 2708765650 stays refused before any batch (lawful)', { timeout: 300_000 }, () => {
    // N-56 (2) read the ruling's two other cells as lawful refusals of non-simple rings. Replayed here: 2191303060's
    // natural S5 outline carries two exactly collinear vertices, and its self-touching ring (a 5 m loop at the first
    // vertex) went to the overlay, whose union merged them — the Q21 defect. With the merge S6 commits a simple
    // perimeter (sum-checked inside settlementPerimeter) and grows its districts, EP-01's 'absorbed' outcome. The
    // coincident ring (the ring given twice) is still refused by the kernel's union (no route keeps clearance), typed,
    // with nothing committed.
    const plant = (seed: number, kind: 'self-touching' | 'coincident'): { run: ReturnType<typeof edgeChain>; simple: boolean; coll: number } => {
      let simple = true;
      let coll = -1;
      const run = edgeChain(seed, {
        blueprint: SMALL_FLAT,
        upTo: 'S6',
        s5: {
          after: (state) => {
            const b = state.stages[state.lastWithLand - 1]?.boundary;
            if (b === null || b === undefined) return;
            coll = b.set.outline.length - mergeCollinear(b.set.outline as LatticePoint[]).length;
            (b.set as { outline: unknown }).outline = degenerateRing(b.set.outline, kind);
            simple = simpleCcw(b.set.outline as LatticePoint[]);
          },
        },
      });
      return { run, simple, coll };
    };
    const st = plant(2191303060, 'self-touching');
    expect([st.coll, st.simple]).toEqual([2, false]);
    const ref = st.run.refusals.get('S6');
    expect(ref === undefined ? 'none' : `${ref.code} ${ref.detail}`).toBe('none');
    const o = st.run.model.data.get('s6') as S6Output | undefined;
    expect(o).toBeDefined();
    if (o === undefined) return;
    expect(simpleCcw(o.perimeter)).toBe(true);
    expect(o.report.unowned).toBe(0);
    expect(o.districts.length).toBeGreaterThan(0);
    const co = plant(2708765650, 'coincident');
    expect([co.coll, co.simple]).toEqual([0, false]);
    expect(co.run.refusals.get('S6')?.code).toBe('E_INVARIANT');
    expect(co.run.model.data.get('s6')).toBeUndefined();
  });
});
