// M0-t-00 hardening round S1: the REAL groups' fold code driven on PLANTED derivations through their seams (note 2; no
// real derivation, workload or browser runs — C-0105, C-0115): the call pool is the clock's difference (K46), the S11
// extras name the workload file (K44), a Chromium run that did not run drops its batch naming it, a cell that threw is
// excluded and named; ONE RULE for the fusion gate, the corridorUnion CITY set and the site gate (notes 4 – 6; the
// session's ruling on Q4, J725): a seed that refuses, throws or never reaches the stages a figure needs is EXCLUDED and
// NAMED, the figure the quantile over the seeds that reached; and the legs-of-different-builds rule (RL10 (c)).
import { afterAll, describe, expect, it } from 'vitest';
import type { CrossHostReport } from '@plat/testkit';
import type { TimedValue } from '../../src/timing/harness.js';
import { corridorUnionGroup, fusionChromiumGroup, fusionNodeGroup, s11Group, siteNodeGroup, type ChromiumDeps, type CorridorUnionSeed, type FusionDeps, type S11WorkloadFn, type SiteDeps } from '../../src/timing-phase/workloads.js';
import { readFileSync } from 'node:fs';
import { CHROMIUM, DIFFERENT_BUILDS, runGroup, runPhase, S11_WORKLOAD_FILE, sourceBuild, type BarRecord, type BatchHarness, type Group, type LegBuild, type TimeBatchFn, type TimingsRecord } from '../../src/timing-phase/index.js';
import { DEBUG_LEG, fixtureContext, fixtureGroups, planted, PROD_LEG, removeScratch, stamp } from './fixtures.js';

afterAll(() => removeScratch());

/** The harness's timeBatch seam: runs the batch's work once and stamps it (measured, authoritative, normalisation 1). */
const tb: TimeBatchFn = async (fn) => {
  const v = (await fn()) as TimedValue;
  return stamp({ value: v.value, unit: v.unit });
};
const harness = (build?: LegBuild): BatchHarness => ({ timeBatch: tb, options: {}, own: () => undefined, ...(build === undefined ? {} : { build }) });

/** A clock that advances `tickMs` per reading (ns), so each derivation call measures exactly `tickMs`. */
const ticking = (tickMs: number): (() => bigint) => {
  let t = 1_000_000_000n;
  return () => {
    const now = t;
    t += BigInt(Math.round(tickMs * 1e6));
    return now;
  };
};

interface PlantedFusion {
  readonly stamps?: Readonly<Record<string, number>>;
  readonly refusals?: Readonly<Record<string, { code: string; detail: string }>>;
  readonly throws?: string;
}
const fusionDeps = (bySeed: Readonly<Record<number, PlantedFusion>>, tickMs = 100): FusionDeps => ({
  derive: (seed) => {
    const p = bySeed[seed];
    if (p.throws !== undefined) throw new Error(p.throws);
    return p;
  },
  stamps: (d) => new Map(Object.entries((d as PlantedFusion).stamps ?? {})),
  refusals: (d) => new Map(Object.entries((d as PlantedFusion).refusals ?? {})),
  clock: ticking(tickMs),
});
const FULL = { S1: 4, S3: 9, S4: 10, S5: 30, S8: 20 };

interface PlantedSite {
  readonly times?: Readonly<Record<string, number>>;
  readonly hydrology?: number | null;
  readonly refusals?: Readonly<Record<string, { code: string; detail: string }>>;
  readonly throws?: string;
}
const siteDeps = (byKey: Readonly<Record<string, PlantedSite>>, tickMs = 37): SiteDeps => ({
  derive: (fixture, seed) => {
    const p = byKey[`${fixture}#${String(seed)}`] ?? { times: { S1: 20, S3: 10, S4: 8, S5: 30, S6: 15 }, hydrology: 15 };
    if (p.throws !== undefined) throw new Error(p.throws);
    return p;
  },
  stageTimes: (d) => (d as PlantedSite).times ?? {},
  hydrology: (d) => {
    const h = (d as PlantedSite).hydrology;
    return h === null ? null : { ms: h ?? 15 };
  },
  refusals: (d) => new Map(Object.entries((d as PlantedSite).refusals ?? {})),
  clock: ticking(tickMs),
});

/** The script on fixture bars (in-process, printed), `groups` replacing some with REAL groups on planted derivations. */
async function barsWith(only: string, groups: Record<string, Group>, extra: Parameters<typeof fixtureContext>[0] = {}): Promise<{ bars: Map<string, BarRecord>; record: TimingsRecord; lines: string[]; code: number }> {
  const c = fixtureContext({ timeBatch: tb, ...extra });
  const code = await runPhase(['--only', only], { ...c, groups: { ...fixtureGroups(), ...groups } });
  const record = JSON.parse(readFileSync(c.recordPath, 'utf8')) as TimingsRecord;
  // no record existed, so the --only run's record is the fresh one with its census, its re-run block appended
  return { bars: new Map(record.rerun[record.rerun.length - 1].bars.map((b) => [b.id, b])), record, lines: c.lines, code };
}

describe('note 2: the real groups\' fold code on planted derivations (K44, K46, the Chromium leg)', () => {
  it('K46: the site Node call pool is the clock\'s difference around the derivation call, per fixture and seed', async () => {
    const r = await runGroup(await siteNodeGroup(2, siteDeps({}, 37)), harness());
    expect(r.dropped).toBe(0);
    for (const f of ['relief-60', 'relief-3000']) expect(r.pools.get(`site:${f}:call`)?.map((p) => p.raw)).toEqual([37, 37]);
    expect(r.pools.get('site:relief-60:gate')?.map((p) => p.raw)).toEqual([43, 43]);
    expect(r.pools.get('site:relief-60:hydrology')?.map((p) => p.raw)).toEqual([15, 15]);
    expect(r.excluded).toEqual([]);
  });

  it('the fusion Node call pool is the clock\'s difference too', async () => {
    const r = await runGroup(fusionNodeGroup([1, 2], fusionDeps({ 1: { stamps: FULL }, 2: { stamps: FULL } }, 41)), harness());
    expect(r.pools.get('fusion:call')?.map((p) => p.raw)).toEqual([41, 41]);
    expect(r.pools.get('fusion:gate')?.map((p) => p.raw)).toEqual([60, 60]);
  });

  it("K44: the S11 batch's extras name M0-k-04's workload file and its per-plot call list", async () => {
    const workload = ((seed: number, n: number) =>
      Promise.resolve({
        seed,
        calls: Array.from({ length: n }, () => ({ us: 2, calls: ['offsetFace', 'obb', 'lir', 'insertChain'].map((op) => ({ op })) })),
        timings: stamp({ unit: 'µs' }),
      })) as unknown as S11WorkloadFn;
    const r = await runGroup(s11Group([5], 3, workload), harness());
    expect(r.extras).toEqual([{ batch: 'S11 synthetic per-plot workload, seed 5, 3 plots', workloadFile: S11_WORKLOAD_FILE, seed: 5, plots: 3, callList: [{ ops: ['offsetFace', 'obb', 'lir', 'insertChain'], plots: 3 }] }]);
    expect(r.pools.get('s11')?.map((p) => p.raw)).toEqual([2, 2, 2]);
  });

  const chromium = (report: (seeds: readonly number[]) => unknown, browser = 'var a = 1;'): ChromiumDeps & { spawned: number[] } => {
    const spawned: number[] = [];
    return {
      spawned,
      runCrossHost: ((fixture: { seeds: readonly number[] }, opts: { onChild?: (pid: number) => void }) => {
        opts.onChild?.(4_300_000);
        spawned.push(4_300_000);
        return Promise.resolve(report(fixture.seeds) as CrossHostReport);
      }) as unknown as ChromiumDeps['runCrossHost'],
      bundles: () => Promise.resolve({ entryPath: '/x/gate-stages.ts', node: '', browser }),
    };
  };
  const ran = (cells: unknown[]): unknown => ({ runs: [{ leg: 'chromium', workers: 'on', status: 'ran', cells }] });

  it('a Chromium run that did not run drops its batch, naming it; the batch\'s child is the phase\'s own', async () => {
    const d = chromium(() => ({ runs: [{ leg: 'chromium', workers: 'on', status: 'blocked', reason: 'chromium-1223 absent from the cache' }] }));
    const r = await runGroup(fusionChromiumGroup([1, 2], d), harness());
    expect(r.dropped).toBeGreaterThan(0);
    expect(r.batches[0]).toMatchObject({ fate: 'dropped', leg: CHROMIUM, error: 'the Chromium worker leg did not run: blocked chromium-1223 absent from the cache' });
    expect(d.spawned).not.toHaveLength(0);
  });

  it('a cell that threw is excluded and named (the others sampled); the batch carries the scanned bundle\'s build', async () => {
    const d = chromium((seeds) => ran(seeds.map((seed) => (seed === 2 ? { stage: 'fusion.call', seed, model: null, records: null, error: 'boom' } : { stage: 'fusion.call', seed, model: 'ab', records: null, ms: 10 + seed }))));
    const r = await runGroup(fusionChromiumGroup([1, 2, 3], d), harness());
    expect(r.dropped).toBe(0);
    expect(r.pools.get(`fusion:call@${CHROMIUM}`)?.map((p) => p.raw)).toEqual([11, 13]);
    expect(r.excluded).toEqual([{ seed: 2, keys: ['fusion:call'], reached: null, missing: [], code: 'threw', message: 'the stage call threw in the worker: boom', leg: CHROMIUM }]);
    expect([...r.builds]).toEqual([[CHROMIUM, ['production', 'production']]]);
    expect(r.batches.every((b) => b.build?.build === 'production')).toBe(true);
  });
});

describe('note 4 (Q4): the fusion gate per seed, not per block — a seed that reached no S8 or threw is excluded and named; the p50 over the seeds that reached', () => {
  const plants = {
    1: { stamps: FULL },
    2: { stamps: { S1: 4, S3: 9, S4: 10, S5: 30 }, refusals: { S8: { code: 'E_PLANTED', detail: 'the planted S8 refusal' } } },
    3: { stamps: { ...FULL, S5: 40 } },
    4: { throws: 'planted throw' },
  };

  it('the gate folds seeds 1 and 3 (n 2); seeds 2 and 4 named with the stage reached, the missing stage and the code; the census carries them', async () => {
    const { bars, record, lines } = await barsWith('fusion', { 'fusion:node': fusionNodeGroup([1, 2, 3, 4], fusionDeps(plants)) });
    const f = bars.get('fusion');
    expect(f?.verdict).toBe('pass');
    expect(f?.dropped).toBe(0);
    const p50 = f?.figures[0];
    expect(p50).toMatchObject({ value: 60, n: 2, verdict: 'pass' });
    expect(p50?.excluded).toEqual([
      { seed: 2, keys: ['fusion:gate', 'fusion:S8'], reached: 'S5', missing: ['S8'], code: 'E_PLANTED', message: 'stamped no S8 (reached S5); S8 refused E_PLANTED: the planted S8 refusal', leg: 'node' },
      { seed: 4, keys: ['fusion:gate', 'fusion:call', 'fusion:S1', 'fusion:S3', 'fusion:S4', 'fusion:S5', 'fusion:S8'], reached: null, missing: [], code: 'threw', message: 'the derivation threw: planted throw', leg: 'node' },
    ]);
    expect(f?.figures[1]).toMatchObject({ reduce: 'p95', value: 70, n: 2 });
    expect((record.census['barExclusions'] as Record<string, unknown[]>)['fusion']).toEqual([
      { seed: 2, leg: 'node', reached: 'S5', code: 'E_PLANTED', message: 'stamped no S8 (reached S5); S8 refused E_PLANTED: the planted S8 refusal' },
      { seed: 4, leg: 'node', reached: null, code: 'threw', message: 'the derivation threw: planted throw' },
    ]);
    expect(lines.some((l) => l.startsWith('timing-phase: fusion: S4 + S5 + S8 p50: n 2, excluded 2: node seed 2 (stamped no S8'))).toBe(true);
  });

  it('every seed excluded: unmeasured (no sample), never a 0', async () => {
    const { bars } = await barsWith('fusion', { 'fusion:node': fusionNodeGroup([2, 4], fusionDeps(plants)) });
    expect(bars.get('fusion')?.figures[0]).toMatchObject({ value: null, verdict: 'unmeasured', n: 0 });
    expect(bars.get('fusion')?.figures[0].excluded).toHaveLength(2);
  });

  it("R12-4's fusion rows fold the seeds that stamped them; the S8 row names seed 2", async () => {
    const { bars } = await barsWith('r12-4', { 'fusion:node': fusionNodeGroup([1, 2, 3], fusionDeps(plants)) });
    const r = bars.get('r12-4');
    expect(r?.figures.find((x) => x.name === 'S8 (fusion)')).toMatchObject({ value: 20, n: 2 });
    expect(r?.figures.find((x) => x.name === 'S8 (fusion)')?.excluded?.map((x) => x.seed)).toEqual([2]);
    expect(r?.figures.find((x) => x.name === 'S5 (fusion)')).toMatchObject({ n: 3 });
    expect(r?.figures.find((x) => x.name === 'S5 (fusion)')?.excluded).toBeUndefined();
  });
});

describe('note 5 (Q4): corridorUnion per seed — a seed with a refused district leaves the CITY-set pool, named; its committed districts stay', () => {
  const unionSeed = (seed: number): CorridorUnionSeed => (seed === 2 ? { districts: [1, 2], refused: 1, codes: ['E_SELF_INTERSECT'] } : { districts: [1, 1, 1], refused: 0, codes: [] });

  it('three seeds, one with a refused district: two CITY samples, every committed district, the seed named with its count and code', async () => {
    const { bars, record } = await barsWith('corridorUnion', { corridorUnion: corridorUnionGroup([1, 2, 3], unionSeed) });
    const b = bars.get('corridorUnion');
    expect(b?.figures[0]).toMatchObject({ name: 'one district', n: 8, value: 1 });
    expect(b?.figures[0].excluded).toBeUndefined();
    expect(b?.figures[1]).toMatchObject({ name: 'the CITY face set', n: 2, value: 3 });
    expect(b?.figures[1].excluded).toEqual([
      { seed: 2, keys: ['corridorUnion:city'], reached: 'S9', missing: [], code: 'E_SELF_INTERSECT', message: "1 district(s) refused by corridorUnion (E_SELF_INTERSECT): the seed's CITY set is not whole, so it leaves the CITY-set pool; its 2 committed district(s) stay in the one-district pool", leg: 'node' },
    ]);
    expect(b?.extras).toEqual([
      { batch: 'corridorUnion: the fusion CITY face set, seeds 1 … 1', refused: 0 },
      { batch: 'corridorUnion: the fusion CITY face set, seeds 2 … 3', refused: 1, refusedBySeed: [{ seed: 2, refused: 1, codes: ['E_SELF_INTERSECT'] }] },
    ]);
    expect(record.census['barRefusals']).toEqual({ corridorUnion: 1 });
  });

  it('no refusal: the samples and extras as before (no excluded list, no refusedBySeed)', async () => {
    const { bars } = await barsWith('corridorUnion', { corridorUnion: corridorUnionGroup([1, 3], unionSeed) });
    const b = bars.get('corridorUnion');
    expect(b?.figures.map((f) => [f.n, f.value, f.excluded])).toEqual([
      [6, 1, undefined],
      [2, 3, undefined],
    ]);
    expect(b?.extras).toEqual([{ batch: 'corridorUnion: the fusion CITY face set, seeds 1 … 1', refused: 0 }, { batch: 'corridorUnion: the fusion CITY face set, seeds 3 … 3', refused: 0 }]);
  });
});

describe('note 6 (Q4): the site gate names, per fixture, each derivation that did not reach S6 (the values as before)', () => {
  it('relief-60 seed 2 refused at S5: excluded from its fixture\'s gate, named with the stage reached and the code; relief-3000 whole', async () => {
    const plants = { 'relief-60#2': { times: { S1: 20, S3: 10, S4: 8, S5: 30 }, refusals: { S5: { code: 'E_SELF_INTERSECT', detail: 'the trace touches itself' } } } };
    const { bars, record } = await barsWith('site', { 'site:node': await siteNodeGroup(2, siteDeps(plants, 100)) });
    const [r60, r3000] = bars.get('site')?.figures ?? [];
    expect(r60).toMatchObject({ value: 43, n: 1, verdict: 'pass' });
    expect(r60.excluded).toEqual([
      { seed: 2, fixture: 'relief-60', keys: ['site:relief-60:gate', 'site:relief-60:S6'], reached: 'S5', missing: ['S6'], code: 'E_SELF_INTERSECT', message: 'stamped no S6 (reached S5); S5 refused E_SELF_INTERSECT: the trace touches itself', leg: 'node' },
    ]);
    expect(r3000).toMatchObject({ value: 43, n: 2 });
    expect(r3000.excluded).toBeUndefined();
    expect((record.census['barExclusions'] as Record<string, { fixture: string; seed: number }[]>)['site'].map((x) => `${x.fixture} ${String(x.seed)}`)).toEqual(['relief-60 2']);
  });

  it('a derivation that throws is excluded from every pool of its fixture, named (before: the whole block dropped)', async () => {
    const { bars } = await barsWith('site', { 'site:node': await siteNodeGroup(2, siteDeps({ 'relief-3000#1': { throws: 'planted' } }, 100)) });
    const [, r3000] = bars.get('site')?.figures ?? [];
    expect(bars.get('site')?.dropped).toBe(0);
    expect(r3000).toMatchObject({ n: 1, value: 43 });
    expect(r3000.excluded?.map((x) => [x.fixture, x.seed, x.code])).toEqual([['relief-3000', 1, 'threw']]);
  });
});

describe('RL10 (c): a cross-engine figure whose legs are of different builds is unmeasured, never judged on either', () => {
  it('both production: judged as before; a debug Chromium leg, or a debug Node leg: unmeasured naming the leg', async () => {
    const both = await barsWith('fusion', {});
    expect(both.bars.get('fusion')?.figures[0]).toMatchObject({ verdict: 'pass', value: 80, legBuilds: { node: ['production'], chromium: ['production'] } });
    const debugChromium = await barsWith('fusion,site', {
      'fusion:chromium': planted('fusion:chromium', [{ samples: { 'fusion:call': [105] }, leg: CHROMIUM, build: DEBUG_LEG }]),
    });
    const f = debugChromium.bars.get('fusion')?.figures[0];
    expect(f).toMatchObject({ verdict: 'unmeasured', value: null, legBuilds: { node: ['production'], chromium: ['debug'] } });
    expect(f?.why).toBe(`${DIFFERENT_BUILDS}: Node production, Chromium worker debug — judged on neither (§12.1's ± 15 % rule compares one build, C-0082)`);
    expect(debugChromium.bars.get('site')?.verdict).toBe('pass');
    expect(debugChromium.code).toBe(1);
    expect(debugChromium.lines).toContain(`timing-phase: fusion: S4 + S5 + S8 p50: unmeasured — ${f?.why ?? ''}`);
    const debugNode = await barsWith('site', {}, { build: sourceBuild() });
    for (const x of debugNode.bars.get('site')?.figures ?? []) {
      expect(x.verdict).toBe('unmeasured');
      expect(x.why).toMatch(new RegExp(`^${DIFFERENT_BUILDS.replace(/[()]/g, '\\$&')}: Node debug, Chromium worker production`));
    }
  });

  it("a Chromium batch whose build was not read is 'unknown': unmeasured too", async () => {
    const r = await barsWith('fusion', { 'fusion:chromium': planted('fusion:chromium', [{ samples: { 'fusion:call': [105] }, leg: CHROMIUM }]) });
    expect(r.bars.get('fusion')?.figures[0]).toMatchObject({ verdict: 'unmeasured', legBuilds: { node: ['production'], chromium: ['unknown'] } });
  });

  it('the scan on planted bundle texts: the flag gone and no __name is production; the free flag, or a __name, is debug', async () => {
    const { legBuildOf } = await import('../../src/timing-phase/index.js');
    expect(legBuildOf('var a = { PLAT_DEBUG_BUILD: "false" }; const s = "PLAT_DEBUG_BUILD";', 'x').build).toBe('production');
    expect(legBuildOf('var DEBUG_BUILD = typeof PLAT_DEBUG_BUILD === "undefined" || PLAT_DEBUG_BUILD !== false;', 'x')).toMatchObject({ build: 'debug', debugFlagLeft: true });
    expect(legBuildOf('var f = __name(function f() {}, "f");', 'x')).toMatchObject({ build: 'debug', keepNames: 1 });
    expect(PROD_LEG.build).toBe('production');
  });
});
