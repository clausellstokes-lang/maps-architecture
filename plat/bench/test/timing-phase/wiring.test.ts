// M0-t-00's real wiring, read and built but never run (C-0105, C-0115: no test runs a real bar, a real tier or the
// browser): every bar's group resolves to its item's exported entry; the Chromium leg's stage table bundles for the
// browser (no Node API in it), its stages the gates' calls; the record's path is M0-t-01's file; the dispatcher names
// this item. Hardening round S1: the real groups' seams default to the real entries (note 2), and the Chromium leg's
// table is bundled with M0-d-06's production option and scanned once (RL10 (c)).
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildCrossHostBundles, runCrossHost } from '@plat/testkit';
import { s11Workload } from '../../src/fuzz-bar/s11Workload.js';
import { bundleCache, CHROMIUM_BUNDLE, CHROMIUM_DEPS, corridorUnionSeed, FUSION_DEPS, GATE_STAGES_PATH, SITE_DEPS } from '../../src/timing-phase/workloads.js';
import { legBuildOf } from '../../src/timing-phase/bundle.js';
import { describe, expect, it } from 'vitest';
import { BAR_DEFS, fusionGateOf, GATE_STAGES_ENTRY, PLAT_ROOT, REAL_GROUPS, realGroup, RECORD_PATH } from '../../src/timing-phase/index.js';
import { crosshostStages } from '../../src/timing-phase/gate-stages.js';
import { SITE_FIXTURES } from '../../src/site/fixtures.js';

describe("every bar's real path names its item's exported entry (built, never run here)", () => {
  it('each group a bar folds from resolves to a real group with batches, but the tiers\' (tiers.ts)', async () => {
    const used = new Set(BAR_DEFS.flatMap((d) => d.groups).filter((g) => g !== 'tiers'));
    expect([...used].sort()).toEqual([...REAL_GROUPS].sort());
    for (const id of REAL_GROUPS) {
      const g = await realGroup(id);
      expect(g.id).toBe(id);
      const n = (g.plans?.length ?? 0) + (g.blocks?.items.length ?? 0);
      expect(n, id).toBeGreaterThan(0);
    }
    await expect(realGroup('nope')).rejects.toThrow(/no group/);
  });

  it('the seeds and sizes the gates run at: fusion 1 … 1 000 (BAR_SEEDS), site both CITY fixtures × DEFAULT_SEEDS, both legs alike', async () => {
    const fn = await realGroup('fusion:node');
    const fc = await realGroup('fusion:chromium');
    expect(fn.blocks?.items).toEqual(Array.from({ length: 1000 }, (_, i) => i + 1));
    expect(fc.blocks?.items).toEqual(fn.blocks?.items);
    const sn = await realGroup('site:node');
    const sc = await realGroup('site:chromium');
    expect(sn.blocks?.items).toHaveLength(2 * 200);
    expect(sc.plans).toHaveLength(2 * 20);
    expect(sc.plans?.every((p) => p.leg === 'chromium-worker')).toBe(true);
  });

  it('each bar names a real entry file that exists in plat/', () => {
    for (const d of BAR_DEFS) {
      const files = [...d.entry.matchAll(/bench\/src\/[\w/.-]+\.ts/g)].map((m) => m[0]);
      for (const f of files) expect(existsSync(join(PLAT_ROOT, f)), `${d.id}: ${f}`).toBe(true);
      expect(d.entry.length).toBeGreaterThan(0);
    }
  });
});

describe("the fusion gate's fold from the run's stage stamps (fail safe: a missing gate stage is never summed as 0)", () => {
  it('S4 + S5 + S8 only (S1 and S3 are R12-4 rows, not the gate); a gate stage unstamped or not finite is refused naming it', () => {
    expect(fusionGateOf(new Map([['S1', 4], ['S3', 9], ['S4', 8], ['S5', 35], ['S8', 18]]), 1)).toBe(61);
    for (const missing of ['S4', 'S5', 'S8']) {
      const m = new Map([['S4', 8], ['S5', 35], ['S8', 18]]);
      m.delete(missing);
      expect(() => fusionGateOf(m, 7)).toThrow(new RegExp(`seed 7, stamped no ${missing}`));
    }
    expect(() => fusionGateOf(new Map([['S4', 8], ['S5', Number.NaN], ['S8', 18]]), 2)).toThrow(/stamped no S5/);
  });
});

describe("the Chromium leg's stage table (C-0082): the gates' calls, bundled for the browser by M0-d-06's bundler", () => {
  it('one stage per gate: fusion.call and site.<fixture>.call for each CITY fixture', () => {
    expect(crosshostStages.map((s) => s.id)).toEqual(['fusion.call', ...SITE_FIXTURES.map((f) => `site.${f.name}.call`)]);
    expect(existsSync(join(PLAT_ROOT, GATE_STAGES_ENTRY))).toBe(true);
  });

  it('the table bundles for the node and browser legs (esbuild only; no browser is launched)', async () => {
    const b = await buildCrossHostBundles(join(PLAT_ROOT, GATE_STAGES_ENTRY));
    expect(b.browser.length).toBeGreaterThan(1000);
    expect(b.browser).not.toMatch(/require\(["']node:/);
    // the default (debug) build leaves the free flag in: the scan reads it as debug
    expect(legBuildOf(b.browser, 'default')).toMatchObject({ build: 'debug', debugFlagLeft: true });
  }, 120_000);

  it("the timing phase's Chromium bundle (bundleCache: M0-d-06's production option, C-0466) scans production: the free flag gone, no __name", async () => {
    expect(GATE_STAGES_PATH).toBe(join(PLAT_ROOT, GATE_STAGES_ENTRY));
    const b = await bundleCache()();
    const lb = legBuildOf(b.browser, CHROMIUM_BUNDLE);
    expect(lb).toEqual({ build: 'production', from: CHROMIUM_BUNDLE, debugFlagLeft: false, keepNames: 0 });
    expect(legBuildOf(b.node, 'node').build).toBe('production');
    process.stdout.write(`wiring.test: the gate table's Chromium bundle (production option): ${JSON.stringify(lb)}, ${String(b.browser.length)} bytes\n`);
  }, 120_000);
});

describe("the real groups' seams default to the real entries (note 2; read, never run)", () => {
  it('the derivation calls, the fold readers, the clock, the S11 workload, corridorUnionSeed and runCrossHost', () => {
    expect(String(FUSION_DEPS.derive)).toMatch(/derive\)?\(["']fusion["'], seed\)/);
    expect(String(FUSION_DEPS.stamps)).toMatch(/\.ins\.stamps/);
    expect(String(FUSION_DEPS.refusals)).toMatch(/\.model\.refusals/);
    expect(String(SITE_DEPS.derive)).toMatch(/deriveSpike\)?\(siteFixture\(fixture\), seed, ["']default["'], ["']city["']\)/);
    expect(String(SITE_DEPS.stageTimes)).toMatch(/stageTimesOf\)?\(d\)/);
    expect(String(SITE_DEPS.hydrology)).toMatch(/timeHydrology\)?\(d, false\)/);
    for (const clock of [FUSION_DEPS.clock, SITE_DEPS.clock]) expect(typeof clock()).toBe('bigint');
    const cd = CHROMIUM_DEPS();
    expect(cd.runCrossHost).toBe(runCrossHost);
    const src = readFileSync(join(PLAT_ROOT, 'bench', 'src', 'timing-phase', 'workloads.ts'), 'utf8');
    for (const d of ['deps: FusionDeps = FUSION_DEPS', 'deps: SiteDeps = SITE_DEPS', 'unionSeed: (seed: number) => CorridorUnionSeed = corridorUnionSeed', 'workload: S11WorkloadFn = s11Workload', 'deps: ChromiumDeps = CHROMIUM_DEPS()']) expect(src).toContain(d);
    expect(typeof corridorUnionSeed).toBe('function');
    expect(typeof s11Workload).toBe('function');
  });
});

describe("the record's home", () => {
  it("M0-timings.json in docs/build (M0-t-01's file; the script writes it only on a run)", () => {
    expect(RECORD_PATH).toBe(join(PLAT_ROOT, 'docs', 'build', 'M0-timings.json'));
  });
});
