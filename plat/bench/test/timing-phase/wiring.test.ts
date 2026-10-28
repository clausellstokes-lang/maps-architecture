// M0-t-00's real wiring, read and built but never run (C-0105, C-0115: no test runs a real bar, a real tier or the
// browser): every bar's group resolves to its item's exported entry; the Chromium leg's stage table bundles for the
// browser (no Node API in it), its stages the gates' calls; the record's path is M0-t-01's file; the dispatcher names
// this item.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { buildCrossHostBundles } from '@plat/testkit';
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
  }, 120_000);
});

describe("the record's home", () => {
  it("M0-timings.json in docs/build (M0-t-01's file; the script writes it only on a run)", () => {
    expect(RECORD_PATH).toBe(join(PLAT_ROOT, 'docs', 'build', 'M0-timings.json'));
  });
});
