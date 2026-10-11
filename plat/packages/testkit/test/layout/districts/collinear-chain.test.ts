// S6 takes a lawful boundary with exactly collinear vertices (M0-e-04 session fix round S2; N-56 (2); docs/M0-FIX-QUEUE.md
// Q21; C-0304; C-0122: it reads testkit's chain, so it lies here): on the M0-x-06 checker's seed 1165799859 S5's last
// boundary (31 points) is given M0-x-06's `collinear` kind (42 points, still simple and counter-clockwise) before S6
// reads it; before the round S6 refused it E_INVARIANT ("the overlay's outer ring is not the boundary's offset (the sum
// check failed)") with no batch — a town with no districts. Now S6 commits, and its perimeter is the unplanted run's,
// byte for byte.
import type { LatticePoint } from '@plat/kernel';
import { simpleCcw, type S6Output } from '@plat/layout';
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
});
