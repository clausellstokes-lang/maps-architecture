// M0-t-00's tier tests over a FIXTURE manifest with planted unit durations and a planted drift (C-0097, C-0103, C-0105,
// C-0121; C-0088): the PR tier's record holds the batched figure — every batch ≤ 60 s or flagged long-batch, each with
// two calibrate scores within 5 % or flagged throttled after two re-runs — and the whole-run figure with its two scores;
// the nightly and milestone records hold at most two whole runs each with their scores and a throttled flag when both
// drifted; the detector's 30 s samples are in every record; a pending job is listed with its reason, in no batch, and
// the gating sum excludes it and says so; no record invokes bench:timing-phase inside a tier. Nothing is spawned.
import { afterAll, describe, expect, it } from 'vitest';
import { manifest } from '../../src/tier-jobs/index.js';
import { manifestProblems, runTier, type RunTierOptions } from '../../src/tiers/runner.js';
import type { TierManifest, TierName, TierReport } from '../../src/tiers/types.js';
import { IDLE_MS } from '../../src/timing/harness.js';
import { SAMPLE_EVERY_MS } from '../../src/timing/sampler.js';
import { PLAT_ROOT, timeTiers, timingPhase, type TierContext, type TierRecord } from '../../src/timing-phase/index.js';
import { fixtureContext, job, removeScratch, scratch, sleeper, tierSeams, watcher } from './fixtures.js';

afterAll(() => removeScratch());

async function tiersWith(drift?: (unit: string, n: number) => number | null, extra: Parameters<typeof tierSeams>[1] = [], watchLog: string[] = [], sleeps: number[] = []): Promise<{ records: TierRecord[]; units: string[] }> {
  const s = tierSeams(drift, extra);
  const c: TierContext = { root: s.tiers.root as string, out: scratch(), ...s.tiers, sleep: sleeper(sleeps), watch: watcher(watchLog) };
  const records = await timeTiers(c);
  return { records, units: s.calls.map((u) => u.name) };
}

const byTier = (rs: TierRecord[], t: TierName): TierRecord => {
  const r = rs.find((x) => x.tier === t);
  if (r === undefined) throw new Error(`no ${t}`);
  return r;
};

describe("the PR tier (C-0097 (1)): the batched gating figure and one whole run, over the fixture manifest's planted durations", () => {
  it('every batch ≤ 60 s or flagged long-batch; two calibrate scores within 5 % or flagged throttled after two re-runs; the sums with the CPU beside', async () => {
    const { records, units } = await tiersWith((u) => (u === 'drifty-unit' ? 110 : null));
    const pr = byTier(records, 'pr');
    expect(pr.projected).toBe(false);
    expect(pr.runs.map((r) => r.mode)).toEqual(['batched', 'whole']);
    const b = pr.runs[0];
    expect(b.batches.map((x) => `${x.job}/${x.unit}`)).toEqual(['lint/kernel', 'lint/model', 'long/long-unit', 'drifty/drifty-unit']);
    for (const x of b.batches) {
      const long = x.wallMs > 60_000;
      expect(x.flags.includes('long-batch'), x.unit).toBe(long);
      const drifted = x.calibration.drift > 0.05;
      expect(x.flags.includes('throttled'), x.unit).toBe(drifted);
      expect(x.calibration.attempts, x.unit).toBe(drifted ? 3 : 1);
      expect(typeof x.calibration.before).toBe('number');
      expect(typeof x.calibration.after).toBe('number');
    }
    expect(b.batches.find((x) => x.unit === 'long-unit')).toMatchObject({ wallMs: 75_000, flags: ['long-batch'] });
    expect(b.batches.find((x) => x.unit === 'drifty-unit')).toMatchObject({ flags: ['throttled'], calibration: { before: 100, after: 110, attempts: 3 } });
    expect(b.batchChecks).toEqual({ longUnflagged: 0, driftUnflagged: 0, longBatches: 1, throttledBatches: 1 });
    expect(units.filter((u) => u === 'drifty-unit')).toHaveLength(3 + 1); // three batched attempts, one whole run
    expect(b.budget).toMatchObject({ figureMs: 115_000, basis: 'wall-clock', ms: 900_000, cores: 8 });
    expect(b.wallMs).toBe(115_000);
    expect(b.cpuMs).toBe(175_000);
    // the whole run: reported with its two scores (a drift is reported, never repeated: the PR tier gates on its batches)
    const w = pr.runs[1];
    expect(w.calibration).toMatchObject({ before: 100, after: 110 });
    expect(w.calibration?.drift).toBeCloseTo(0.1, 12);
    expect(w.wallMs).toBe(115_000);
    expect(pr.runs).toHaveLength(2);
    expect(pr.throttled).toBe(false);
  });

  it('a pending job (after-M-1 with its reviewer) is listed with its reason, in no batch, never run; the gating sum excludes it and says so (C-0121)', async () => {
    const { records, units } = await tiersWith();
    const pr = byTier(records, 'pr');
    expect(pr.pending).toHaveLength(1);
    expect(pr.pending[0]).toMatchObject({ name: 'deny-list scan', file: 'packages/testkit/baselines/denylist.json', reason: 'packages/testkit/baselines/denylist.json absent (C-0069)' });
    expect(units).not.toContain('scan');
    for (const r of pr.runs) expect(r.batches.some((x) => x.job === 'deny-list scan')).toBe(false);
    expect(pr.covers).toBe('the sum over the 3 built job(s); pending, never run or timed: deny-list scan (after-M-1: denylist.json)');
    expect(pr.runs[0].budget.figureMs).toBe(115_000);
  });

  it('with the list present and its review pending, the job stays listed pending with the reviewer named', async () => {
    const s = tierSeams();
    const { writeFileSync, mkdirSync } = await import('node:fs');
    mkdirSync(`${s.tiers.root as string}/packages/testkit/baselines`, { recursive: true });
    writeFileSync(`${s.tiers.root as string}/packages/testkit/baselines/denylist.json`, '{}\n');
    const recs = await timeTiers({ root: s.tiers.root as string, out: scratch(), ...s.tiers, sleep: sleeper(), watch: watcher() }, ['pr']);
    expect(recs[0].pending[0]).toMatchObject({ status: 'after-M-1: denylist.json (review pending: M0-k-07)', reviewPending: ['M0-k-07'] });
    expect(s.calls.map((u) => u.name)).not.toContain('scan');
  });
});

describe('the projected tiers (C-0097 (2)): once whole, one repeat on a > 5 % drift, then throttled — never a loop', () => {
  it('no drift: one run each, its two scores, not throttled', async () => {
    const { records } = await tiersWith();
    for (const t of ['nightly', 'milestone'] as const) {
      const r = byTier(records, t);
      expect(r.projected).toBe(true);
      expect(r.runs).toHaveLength(1);
      expect(r.runs[0].mode).toBe('whole');
      expect(r.runs[0].calibration).toMatchObject({ before: 100, after: 101 });
      expect(r.runs[0].budget).toMatchObject({ basis: 'cpu ÷ 16', gating: false });
      expect(r.throttled).toBe(false);
    }
  });

  it('the first run drifts, the repeat agrees: two runs, not throttled', async () => {
    const { records } = await tiersWith((u, n) => (u === 'b' && n === 1 ? 108 : null));
    for (const t of ['nightly', 'milestone'] as const) {
      const r = byTier(records, t);
      expect(r.runs.map((x) => x.calibration?.after)).toEqual(t === 'nightly' ? [108, 101] : [101]);
      expect(r.throttled).toBe(false);
    }
  });

  it('both runs drift: two runs, both scores kept, throttled; a third run never happens', async () => {
    const { records, units } = await tiersWith((u) => (u === 'b' ? 106 : null));
    for (const t of ['nightly', 'milestone'] as const) {
      const r = byTier(records, t);
      expect(r.runs).toHaveLength(2);
      expect(r.runs.map((x) => [x.calibration?.before, x.calibration?.after])).toEqual([
        [100, 106],
        [100, 106],
      ]);
      expect(r.throttled).toBe(true);
    }
    expect(units.filter((u) => u === 'b')).toHaveLength(4); // two runs × two projected tiers
  });

  it('exactly 5 % is no drift (one run)', async () => {
    const { records } = await tiersWith((u) => (u === 'b' ? 105 : null));
    expect(byTier(records, 'nightly').runs).toHaveLength(1);
  });
});

describe("the detector's 30 s samples in every record (C-0103)", () => {
  it('every run of every tier carries its samples, its sampler started at 30 s and stopped', async () => {
    const log: string[] = [];
    const { records } = await tiersWith(undefined, [], log);
    const runs = records.flatMap((r) => r.runs);
    expect(runs).toHaveLength(4);
    for (const r of runs) {
      expect(r.sampleEveryMs).toBe(30_000);
      expect(r.samples).toHaveLength(2);
      expect(r.samples[0]).toMatchObject({ authority: 'contended', reasons: ['no reference score'], power: 'ac', processes: 1 });
    }
    expect(SAMPLE_EVERY_MS).toBe(30_000);
    expect(log).toEqual(Array.from({ length: 4 }, () => ['start 30000', 'stop']).flat());
  });

  it("a tier job's own processes (the runs' children) are the phase's own in its samples", async () => {
    const s = tierSeams();
    const { machine } = await import('./fixtures.js');
    const child = { pid: 4_100_000, ppid: process.pid, pcpu: 80, comm: 'node' };
    const stranger = { pid: 4_200_000, ppid: 1, pcpu: 0, comm: 'node' };
    const recs = await timeTiers({ root: s.tiers.root as string, out: scratch(), ...s.tiers, sleep: sleeper(), watch: watcher([], [machine([child, stranger])]), referenceScorePath: undefined }, ['pr']);
    const reasons = recs[0].runs[0].samples[0].reasons;
    expect(reasons).toContain('process: node (node, pid 4200000)');
    expect(reasons.some((r) => r.includes('4100000'))).toBe(false);
  });
});

describe('no record invokes bench:timing-phase inside a tier (C-0088, C-0097)', () => {
  it('the fixture tiers: none; a planted job calling it is refused by the runner and named', async () => {
    const clean = await tiersWith();
    for (const r of clean.records) {
      expect(r.timingPhaseInside).toBe(false);
      expect(r.refusedJobs).toEqual([]);
    }
    const bad = job('sneaky', ['timing'], { units: () => [{ name: 'timing', argv: ['corepack', 'pnpm', 'bench:timing-phase'] }] });
    const { records, units } = await tiersWith(undefined, [bad]);
    const pr = byTier(records, 'pr');
    expect(pr.timingPhaseInside).toBe(true);
    expect(pr.refusedJobs).toEqual(['sneaky']);
    expect(units).not.toContain('timing');
  });

  it("M0's real manifests hold no job that runs a tier or the timing phase (read, never run)", () => {
    for (const t of ['pr', 'nightly', 'milestone'] as const) {
      const m: TierManifest = manifest(t, PLAT_ROOT);
      expect(manifestProblems(m).filter((p) => /C-0088/.test(p))).toEqual([]);
      expect(m.jobs.filter((j) => j.source.startsWith('bench/src/timing-phase/'))).toEqual([]);
    }
  });
});

describe('the script passes the runner none of its own readings: the 30 s idle, the 60 s cap, the re-runs and the sampling stay the protocol\'s', () => {
  it('a spied runner sees only the mode, the tree, the output, the executor and the log; each whole run waits 30 s first', async () => {
    const s = tierSeams();
    const seen: Partial<RunTierOptions>[] = [];
    const planted = s.tiers.options as Partial<RunTierOptions>;
    const spy = (m: TierManifest, opts: RunTierOptions): Promise<TierReport> => {
      seen.push(opts);
      return runTier(m, { ...planted, ...opts });
    };
    const sleeps: number[] = [];
    await timeTiers({ root: s.tiers.root as string, out: scratch(), manifest: s.tiers.manifest, runTier: spy, sleep: sleeper(sleeps), watch: watcher() });
    expect(seen.map((o) => o.mode)).toEqual(['batched', 'whole', 'whole', 'whole']);
    for (const o of seen) expect(Object.keys(o).sort()).toEqual(['exec', 'log', 'mode', 'out', 'root']);
    expect(sleeps).toEqual([IDLE_MS, IDLE_MS, IDLE_MS]);
  });
});

describe('the tiers bar in the script\'s record (built readings never gate, C-0047)', () => {
  it("a gating PR figure takes the runner's verdict (its 10 % rule): over budget is a miss, else a pass; the projected tiers are reported", async () => {
    for (const verdict of ['over budget', 'pass'] as const) {
      const c = fixtureContext();
      const spy = async (m: TierManifest, opts: RunTierOptions): Promise<TierReport> => {
        const r = await runTier(m, { ...(c.tiers?.options ?? {}), ...opts });
        return m.tier === 'pr' && opts.mode === 'batched' ? { ...r, budget: { ...r.budget, gating: true, verdict } } : r;
      };
      const o = await timingPhase(['--only', 'tiers'], { ...c, tiers: { ...c.tiers, runTier: spy } });
      if (o.kind !== 'ran') throw new Error(o.kind);
      const t = o.bars[0];
      expect(t.figures[0].verdict).toBe(verdict === 'pass' ? 'pass' : 'miss');
      expect(t.figures[0].value).toBeCloseTo(114_427.86 / 60_000, 4);
      expect(t.verdict).toBe(verdict === 'pass' ? 'pass' : 'miss');
      expect(t.fallback).toBe(verdict === 'pass' ? null : "§13.8's fallback: B-CITY-lite 25 seeds (the spike runs at M0) and random fuzz 5 × 10³ per primitive, the constructive set never cut");
      expect(t.ladder).toBeNull();
      expect(o.code).toBe(verdict === 'pass' ? 0 : 1);
    }
  });

  it('the bar carries the three tier records; its PR figure is measured but unmeasured as a verdict, saying why', async () => {
    const c = fixtureContext();
    const o = await timingPhase(['--only', 'tiers'], c);
    if (o.kind !== 'ran') throw new Error(o.kind);
    const t = o.bars[0];
    expect(t.tiers?.map((x) => x.tier)).toEqual(['pr', 'nightly', 'milestone']);
    expect(t.figures.map((f) => f.name)).toEqual(['PR batched sum (gating)', 'PR whole run', 'nightly (projected, CPU ÷ 16)', 'milestone (projected, CPU ÷ 16)']);
    expect(t.figures[0]).toMatchObject({ verdict: 'unmeasured', budget: 15, unit: 'min' });
    expect(t.figures[0].why).toMatch(/^measured 1\.91 min, not gating: 114\.4 s normalised \(wall-clock\) against 900 s on 8 cores \+ 10 % — not gating \(built readings, C-0047\)$/);
    expect(t.figures[2]).toMatchObject({ verdict: 'reported', unit: 'h', budget: 4 });
    expect(t.verdict).toBe('unmeasured');
  });
});
