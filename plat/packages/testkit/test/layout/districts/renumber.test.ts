// The grower's renumbering identity (M0-e-04; §4.5: "each turn's skip and pick draws come from district.seed, keyed by
// the grower's seed lineage … and the turn's number"; §6.1; §3.3 *Two op forms*: a callback's issue order is a
// function of its inputs, its streams and canonically sorted query results — never of slots; §13.2's issue-order
// clause; C-0122): S6's one L1 batch through M0-d-08's harness — fresh, again, its slots reversed, its slots randomly
// renumbered — commits the same arena, and its grower takes the same turns with the same draws on every slot
// assignment.
import type { Plat } from '@plat/kernel';
import { s6Batch, type S6Output } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { renumberSlots, runBatch, runTwiceCompare, type DeterminismSequence } from '../../../src/determinism/index.js';
import { smallTown } from './support.js';

describe('S6’s batch through the issue-order harness (M0-d-08)', () => {
  it('commits bit for bit alike: fresh, again, slots reversed, slots renumbered', { timeout: 300_000 }, () => {
    const t = smallTown();
    const seq: DeterminismSequence = {
      name: 'S6',
      arena: (): Plat => smallTown().plat,
      batches: [{ name: 'S6 perimeter, owners, district_bound', build: (p: Plat) => s6Batch(p, t.input, t.perimeter) }],
    };
    const report = runTwiceCompare(seq);
    expect(report.divergence).toBeNull();
    expect(report.identical).toBe(true);
    expect(report.outcomes).toEqual(['commit']);
    expect(report.runs).toEqual(['fresh', 'again', 'reversed', 'renumbered']);
  });

  it('every grower’s turns reproduce under a slot renumbering: the same turn log, seeds, districts and seams', { timeout: 300_000 }, () => {
    const t = smallTown();
    const once = (p: Plat): S6Output => {
      const b = s6Batch(p, t.input, t.perimeter);
      const r = runBatch(p, b);
      if (!r.ok) throw new Error(`S6 refused: ${r.code} ${r.detail}`);
      return r.value.value as S6Output;
    };
    const ref = once(smallTown().plat);
    expect(ref.grow.log.length).toBeGreaterThan(20);
    expect(ref.districts.length).toBeGreaterThan(3);
    // slow (gate) seeds skip, fast ones absorb: the log has both
    expect(ref.grow.log.some((l) => l.what === 'skip')).toBe(true);
    expect(ref.grow.log.some((l) => l.what === 'absorb')).toBe(true);
    for (const [mode, seed] of [
      ['reverse', 1],
      ['random', 1],
      ['random', 2],
      ['random', 3],
    ] as const) {
      const out = once(renumberSlots(smallTown().plat, seed, { mode }));
      expect(JSON.stringify(out.grow.log)).toBe(JSON.stringify(ref.grow.log));
      expect(JSON.stringify(out.grow.grown.map((d) => [d.seed, d.faces, d.mergedInto]))).toBe(JSON.stringify(ref.grow.grown.map((d) => [d.seed, d.faces, d.mergedInto])));
      expect(JSON.stringify(out.districts)).toBe(JSON.stringify(ref.districts));
      expect(JSON.stringify(out.seams)).toBe(JSON.stringify(ref.seams));
      expect(JSON.stringify(out.quarters)).toBe(JSON.stringify(ref.quarters));
    }
  });
});
