// M0-e-06's committed summary is the item's whole run (the session's hardening round S2; checks/M0-e-06-notes.md
// note 1, C-0271 (9), J238 (2)): docs/build/summaries/M0-e-06.json is what `corepack pnpm bench -- site --workers W
// --summary` writes at full strength — CITY, DEFAULT_SEEDS seeds from 1, both relief fixtures under both
// configurations — never a shortened run's (an 8-seed run left M0-f-03b reading p999 as the maximum of eight). Each
// group holds every seed's derivation, and each work counter's quantiles are taken over at most that many derivations
// and over the derivations that reached its stage.
//
// Hardening round S3 (C-0453): the summary names each refusal class's seeds and message (Q122), carries per-stage work
// blocks in M0-f-03b's reader's form for every counter each spike stage charges (Q118), and is anchored to what it was
// derived on (Q36): the harness's sources byte for byte and one CITY record re-derived on the tree — a stale summary is
// red, not a passing shape.
import { readFileSync } from 'node:fs';
import { loadWorkLimits } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { HARNESS_SCOPE, recordDigest, scopeDigest, SOURCE_SCOPE } from '../../src/site/anchor.js';
import { BAR_NAMES, DEFAULT_SEEDS, PLAT_ROOT, runSpikeTask, SUMMARY_PATH } from '../../src/site/index.js';
import { STAGE_WORK } from '../../src/site/report.js';
import { fitWorkLimits, inputPath, STAGE_CHARGES, SUMMARY_IDS, type SummaryId } from '../../src/worklimits/index.js';

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
  batches: Record<string, { committed: number; refused: number; maxShare: number }>;
  refusals: { stage: string; code: string; count: number; seeds: number[]; message: string | null; messages: number }[];
  stageWork: Record<string, Record<string, { stage: string; unit: string; units: Q; unitsTotal: number; perUnit: Q; charged: number }>>;
}
interface Digest {
  scope: string[];
  files: number;
  sha256: string;
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
  anchor: { tree: string | null; harness: Digest; sources: Digest; canary: { seed: number; fixture: string; config: string; sha256: string } };
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

const ordered = (q: Q): boolean => q.p50 <= q.p99 && q.p99 <= q.p999 && q.p999 <= q.max;
const ran = (g: Group, stage: string): number => (g.stages[stage]?.ok ?? 0) + Object.values(g.stages[stage]?.refused ?? {}).reduce((a, b) => a + b, 0);

describe('the refusal census names its seeds (hardening round S3, Q122)', () => {
  it('every refusal class of every group: stage × code → the sorted seeds, their count the stage\'s refused count, the message once', () => {
    for (const g of s.groups) {
      const at = `${g.fixture} ${g.config}`;
      expect(Array.isArray(g.refusals), at).toBe(true);
      const classes = g.refusals.map((c) => `${c.stage} ${c.code}`);
      expect(classes, at).toEqual([...classes].sort());
      const counted = Object.entries(g.stages).flatMap(([st, o]) => Object.entries(o.refused).filter(([, n]) => n > 0).map(([code, n]) => [`${st} ${code}`, n] as const));
      expect(g.refusals.map((c) => [`${c.stage} ${c.code}`, c.count]), at).toEqual(counted.sort((a, b) => (a[0] < b[0] ? -1 : 1)));
      for (const c of g.refusals) {
        const where = `${at} ${c.stage} ${c.code}`;
        expect(c.seeds.length, where).toBe(c.count);
        expect(c.seeds, where).toEqual([...new Set(c.seeds)].sort((a, b) => a - b));
        for (const seed of c.seeds) expect(Number.isInteger(seed) && seed >= s.seeds.first && seed < s.seeds.first + s.seeds.count, where).toBe(true);
        expect(c.message === null || (typeof c.message === 'string' && c.message.length > 0), where).toBe(true);
        expect(Number.isInteger(c.messages) && c.messages >= (c.message === null ? 0 : 1) && c.messages <= c.count, where).toBe(true);
      }
    }
  });
});

describe('the per-stage work blocks (hardening round S3, Q118)', () => {
  it('STAGE_WORK is M0-f-03b\'s STAGE_CHARGES for every stage the spike runs', () => {
    for (const [stage, counters] of Object.entries(STAGE_WORK)) expect([stage, [...counters].sort()]).toEqual([stage, [...(STAGE_CHARGES.get(stage) ?? [])].sort()]);
  });

  it('every stage that ran in a group has a block of n > 0 for every counter it charges, in the reader\'s form with the table\'s unit', () => {
    const table = loadWorkLimits();
    for (const g of s.groups) {
      for (const stage of Object.keys(STAGE_WORK)) {
        const at = `${g.fixture} ${g.config} ${stage}`;
        if (ran(g, stage) === 0) continue;
        const blocks = g.stageWork[stage];
        expect(Object.keys(blocks ?? {}).sort(), at).toEqual([...STAGE_WORK[stage]].sort());
        const batches = (g.batches[stage]?.committed ?? 0) + (g.batches[stage]?.refused ?? 0);
        for (const [counter, b] of Object.entries(blocks)) {
          const where = `${at} ${counter}`;
          expect([b.stage, b.unit], where).toEqual([stage, table.law(counter).unit]);
          expect(b.units.n > 0 && b.perUnit.n === b.units.n && ordered(b.units) && ordered(b.perUnit), where).toBe(true);
          expect(b.charged >= 0 && b.charged <= b.perUnit.n, where).toBe(true);
          // a kernel counter's sample is one batch of the stage (committed or refused) — all of them
          if (!['hydro.cells', 'route.nodes', 'growth.proposals', 'growth.candidates', 'grower.turns', 'field.cells'].includes(counter)) expect(b.perUnit.n, where).toBe(batches);
          // a stage-scope counter's sample is one derivation's stage (one per S5c record for growth.*)
          if (counter === 'route.nodes' || counter === 'hydro.cells') expect(b.perUnit.n, where).toBeLessThanOrEqual(ran(g, stage));
        }
      }
    }
  });

  it('read in M0-f-03b\'s reader form, one stage per group, the blocks leave no e-06 row unbounded (the reader\'s one-loop change, REPORTED)', () => {
    const summaries = Object.fromEntries(SUMMARY_IDS.map((id) => [id, JSON.parse(readFileSync(inputPath(id), 'utf8')) as unknown])) as Record<SummaryId, unknown>;
    const perStage = s.groups.flatMap((g) =>
      Object.keys(g.stageWork).map((stage) => ({ fixture: g.fixture, config: `${g.config} ${stage}`, stages: { [stage]: g.stages[stage] }, batches: { [stage]: g.batches[stage] }, work: g.stageWork[stage] })),
    );
    const r = fitWorkLimits(loadWorkLimits(), { ...summaries, 'M0-e-06': { ...s, groups: perStage } }, '2026-10-30');
    const rows = r.hitRate.rows.filter((x) => x.summary === 'M0-e-06');
    expect(rows.length).toBe(s.groups.reduce((t, g) => t + Object.keys(STAGE_WORK).filter((st) => ran(g, st) > 0).length, 0));
    expect(rows.filter((x) => x.unbounded.length > 0).map((x) => `${x.at} ${x.stage}: ${x.unbounded.join(', ')}`)).toEqual([]);
  });
});

describe('the summary is anchored to what it was derived on (hardening round S3, Q36)', () => {
  it('the anchor names the tree, the harness\'s and the derivation\'s sources, and the canary', () => {
    expect(s.anchor.tree === null || /^[0-9a-f]{40}$/.test(s.anchor.tree)).toBe(true);
    expect(s.anchor.harness.scope).toEqual([...HARNESS_SCOPE]);
    expect(s.anchor.sources.scope).toEqual([...SOURCE_SCOPE]);
    expect([s.anchor.canary.fixture, s.anchor.canary.config]).toEqual([expect.stringMatching(/^relief-(60|3000)$/), expect.stringMatching(/^(default|coarse)$/)]);
    expect(/^[0-9a-f]{64}$/.test(s.anchor.canary.sha256)).toBe(true);
  });

  it('the harness (bench/src/site) is byte for byte the code the summary was derived and folded with: a changed harness re-runs the summary', () => {
    expect(scopeDigest(PLAT_ROOT, HARNESS_SCOPE)).toEqual(s.anchor.harness);
  });

  it('the canary CITY record re-derived on this tree is the run\'s: a stage change that moves it makes the summary stale (re-run, Q36)', { timeout: 3_600_000 }, () => {
    const c = s.anchor.canary;
    const r = runSpikeTask({ fixture: c.fixture, config: c.config as 'default' | 'coarse', seed: c.seed, size: 'city' });
    expect(Object.values(r.record.stages).every((o) => o === 'ok'), JSON.stringify(r.record.stages)).toBe(true);
    expect(recordDigest(r.record), `${c.fixture} ${c.config} seed ${String(c.seed)} moved: re-run the summary (Q36)`).toBe(c.sha256);
  });

  it('the derivation\'s sources: recorded and reported, never failed on (C-0453: a strict digest is red at every stage landing)', () => {
    const now = scopeDigest(PLAT_ROOT, SOURCE_SCOPE);
    if (now.sha256 !== s.anchor.sources.sha256) console.warn(`summaries/M0-e-06.json: the derivation's sources moved since the run (${String(s.anchor.sources.files)} → ${String(now.files)} files); the canary judges the summary, the session's Q36 procedure decides a re-run`);
    expect(now.scope).toEqual(s.anchor.sources.scope);
  });
});
