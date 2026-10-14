// The refusal census's R-36 (J290 / N-58: our own intermediate, verdict (a); queue Q55) on the registered plain seeds that
// meet it — 9, 17, 20 and 23 of the flat fixture (`flatFixture(seed)`, defaults; the bar's seeds): S5c's walk meets its
// own intermediates there — a dead end whose `end` junction the kernel would not mark (`W_END_UNMARKED`, once a seed)
// and, at 20 and 23, F-NUM's re-proposal then reject (`E_BELOW_MIN_EDGE`) on that same proposal (§5.2) — and absorbs
// them: S5 runs whole (`fixtureRun` throws on any refusal of S3, S4 or S5), no S5c record, no rim and no prune reports a
// refusal, and each intermediate is reported where it belongs — the unmarked end under the record's `intermediates`,
// F-NUM's rungs on their proposal in `rungs` — never in `refused`.
import { describe, expect, it } from 'vitest';
import type { S5cRecord } from '@plat/layout';
import { fixtureRun } from './support.js';

/** The seeds and what the walk meets on each (the census's harvest, c-05 c1 N-c1-4; re-measured by this round). */
const SEEDS: readonly { readonly seed: number; readonly fnum: boolean }[] = [
  { seed: 9, fnum: false },
  { seed: 17, fnum: false },
  { seed: 20, fnum: true },
  { seed: 23, fnum: true },
];

describe('S5c absorbs its own intermediates on the registered plain seeds (census R-36)', () => {
  const tally = { unmarked: 0, rejects: 0 };
  for (const { seed, fnum } of SEEDS) {
    it(`plain seed ${String(seed)}: the stage succeeds; the unmarked end is an intermediate${fnum ? ', F-NUM rejects on its proposal' : ''}, never a refusal`, { timeout: 300_000 }, () => {
      const r = fixtureRun(seed);
      const recs: S5cRecord[] = [...r.run.growth, ...r.run.capacity.flatMap((d) => (d.rim === null ? [] : [d.rim]))];
      // The stage succeeds: no step refused by the kernel, no batch refused, no prune or trim refusal.
      for (const g of recs) {
        expect(g.refused, `stage ${String(g.k)}'s refused`).toEqual({});
        expect(g.batchRefused).toBeUndefined();
        expect(Object.keys(g.intermediates).filter((c) => c !== 'W_END_UNMARKED')).toEqual([]);
      }
      for (const p of r.run.prune) expect(p.refused).toEqual({});
      // The intermediate: one dead end left unmarked, counted under `intermediates`, the street standing with a bearing.
      const unmarked = recs.reduce((n, g) => n + (g.intermediates['W_END_UNMARKED'] ?? 0), 0);
      expect(unmarked).toBe(1);
      const bearing = recs.flatMap((g) => g.streets.filter((s) => s.way.to.kind === 'bearing'));
      expect(bearing.length).toBe(unmarked);
      for (const s of bearing) {
        expect(s.ends).toBe('dead');
        expect(s.points.length).toBeGreaterThanOrEqual(2);
      }
      // F-NUM (§5.2): re-proposed from the next attempt stream, then rejected with its report line — on the proposal
      // whose street then ends unmarked.
      const rungs = recs.flatMap((g) => g.rungs.filter((x) => x.cause === 'F-NUM'));
      if (!fnum) expect(rungs).toEqual([]);
      else {
        expect(rungs.map((x) => (x.cause === 'F-NUM' ? `${x.rung} ${x.code}` : ''))).toEqual(['re_propose E_BELOW_MIN_EDGE', 'reject E_BELOW_MIN_EDGE']);
        const proposals = new Set(rungs.map((x) => (x.cause === 'F-NUM' ? x.proposal : -1)));
        expect(proposals.size).toBe(1);
        expect(bearing.map((s) => s.proposal)).toEqual([...proposals]);
      }
      tally.unmarked += unmarked;
      tally.rejects += rungs.filter((x) => x.cause === 'F-NUM' && x.rung === 'reject').length;
    });
  }
  it('over the four seeds: four unmarked ends and two F-NUM rejects, every run whole (the census, before = after)', () => {
    expect(tally).toEqual({ unmarked: 4, rejects: 2 });
  });
});
