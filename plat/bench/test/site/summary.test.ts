// M0-e-06's committed summary is the item's whole run (the session's hardening round S2; checks/M0-e-06-notes.md
// note 1, C-0271 (9), J238 (2)): docs/build/summaries/M0-e-06.json is what `corepack pnpm bench -- site --workers W
// --summary` writes at full strength — CITY, DEFAULT_SEEDS seeds from 1, both relief fixtures under both
// configurations — never a shortened run's (an 8-seed run left M0-f-03b reading p999 as the maximum of eight). Each
// group holds every seed's derivation, and each work counter's quantiles are taken over at most that many derivations
// and over the derivations that reached its stage.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BAR_NAMES, DEFAULT_SEEDS, SUMMARY_PATH } from '../../src/site/index.js';

interface Q {
  n: number;
  p50: number;
  p99: number;
  p999: number;
  max: number;
}
interface Group {
  fixture: string;
  config: string;
  runs: number;
  stages: Record<string, { ok: number; refused: Record<string, number>; notReached: number }>;
  bars: Record<string, { verdict: string }>;
  work: Record<string, { stage: string; units: Q; perUnit: Q }>;
}
interface Summary {
  item: string;
  size: string;
  seeds: { first: number; count: number };
  fixtures: string[];
  configs: string[];
  pass: boolean;
  verdicts: Record<string, string>;
  groups: Group[];
  timing: { fixture: string; config: string; runs: number; mode: string }[];
}

const s = JSON.parse(readFileSync(SUMMARY_PATH, 'utf8')) as Summary;

describe('the committed summary is the full CITY run (note 1)', () => {
  it('CITY, seeds 1 … DEFAULT_SEEDS, both fixtures × both configurations: every group holds every seed', () => {
    expect(DEFAULT_SEEDS).toBe(200);
    expect({ item: s.item, size: s.size, seeds: s.seeds, fixtures: s.fixtures, configs: s.configs }).toEqual({
      item: 'M0-e-06',
      size: 'city',
      seeds: { first: 1, count: DEFAULT_SEEDS },
      fixtures: ['relief-60', 'relief-3000'],
      configs: ['default', 'coarse'],
    });
    expect(s.groups.map((g) => [g.fixture, g.config, g.runs])).toEqual([
      ['relief-60', 'default', DEFAULT_SEEDS],
      ['relief-60', 'coarse', DEFAULT_SEEDS],
      ['relief-3000', 'default', DEFAULT_SEEDS],
      ['relief-3000', 'coarse', DEFAULT_SEEDS],
    ]);
    expect(s.timing.map((t) => [t.fixture, t.config, t.runs, t.mode])).toEqual(s.groups.map((g) => [g.fixture, g.config, DEFAULT_SEEDS, 'informative']));
  });

  it('each stage accounts for every derivation, and each work counter\'s quantiles span the derivations that reached its stage', () => {
    for (const g of s.groups) {
      for (const [stage, o] of Object.entries(g.stages)) {
        const refused = Object.values(o.refused).reduce((a, b) => a + b, 0);
        expect(o.ok + refused + o.notReached, `${g.fixture} ${g.config} ${stage}`).toBe(g.runs);
      }
      // S1 runs on every derivation and charges hydro.cells once: its quantiles are over all of them
      expect(g.work['hydro.cells']?.perUnit.n, `${g.fixture} ${g.config}`).toBe(g.stages['S1'].ok);
      for (const [name, w] of Object.entries(g.work)) {
        const reached = g.stages[w.stage]?.ok ?? 0;
        expect(w.units.n, `${g.fixture} ${g.config} ${name}`).toBeLessThanOrEqual(reached);
        expect(w.perUnit.n, `${g.fixture} ${g.config} ${name}`).toBe(w.units.n);
        expect(w.perUnit.p50 <= w.perUnit.p99 && w.perUnit.p99 <= w.perUnit.p999 && w.perUnit.p999 <= w.perUnit.max, `${g.fixture} ${g.config} ${name}`).toBe(true);
      }
    }
  });

  it('it is this code\'s fold (the Q36-class re-run on the round\'s receipts): the bed observed on fitting rivers, the shared wet sides counted, the corpus downgrades by cause', () => {
    for (const g of s.groups) {
      const at = `${g.fixture} ${g.config}`;
      const bars = g.bars as Record<string, { verdict: string; of?: string; numbers?: Record<string, number | null> }>;
      expect(bars['bedMonotone'].of, at).toBe('fitting rivers');
      expect(Object.keys(bars['bedMonotone'].numbers ?? {}), at).toEqual(expect.arrayContaining(['fits', 'fittingMonotone', 'degraded', 'degradedMonotone']));
      expect(Object.keys(bars['waterGates'].numbers ?? {}), at).toContain('sharedWallOverWater');
      const corpus = bars['corpus'].numbers ?? {};
      for (const set of ['districtRoof', 'districtSpine', 'waterRoof', 'waterSpine']) expect(Object.keys(corpus), `${at} ${set}`).toContain(`${set}.workLimit`);
    }
  });

  it('its verdicts are its groups\' folded (fail if any group fails, else pass if any observed), and pass only when every bar passed', () => {
    for (const b of BAR_NAMES) {
      const vs = s.groups.map((g) => g.bars[b].verdict);
      expect(s.verdicts[b], b).toBe(vs.includes('fail') ? 'fail' : vs.includes('pass') ? 'pass' : 'unobserved');
    }
    expect(s.pass).toBe(BAR_NAMES.every((b) => s.verdicts[b] === 'pass'));
  });
});
