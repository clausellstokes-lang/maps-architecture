// M0-d-06's test "a browser that refuses to launch is reported blocked by the no-download rule (never faked) — tested by
// pointing the cache path at an empty dir" (C-0028): with PLAYWRIGHT_BROWSERS_PATH at an empty folder each browser leg
// is blocked, its reason naming the pinned build's absent executable inside that folder and the no-download rule; no
// cell is produced for it (nothing faked), nothing is written into the folder (nothing downloaded), the Node legs still
// run, and the verdict is incomplete — never a pass.
import { mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { CROSSHOST_BROWSERS, crossHostCacheRoot, planCrossHostBrowserLeg, planCrossHostLeg, runCrossHost } from '@plat/testkit';
import { RUN_TIMEOUT_MS, runnableNodeLegs, smallKernelFixture } from './support.js';

const empty = mkdtempSync(join(tmpdir(), 'plat-crosshost-empty-cache-'));
afterAll(() => rmSync(empty, { recursive: true, force: true }));
const env = { ...process.env, PLAYWRIGHT_BROWSERS_PATH: empty };

describe('a browser absent from the cache is blocked by the no-download rule, never faked', () => {
  it('plans each browser leg blocked, naming the absent executable inside the empty cache', async () => {
    expect(crossHostCacheRoot(env)).toBe(empty);
    for (const b of CROSSHOST_BROWSERS) {
      const plan = await planCrossHostBrowserLeg(b, env);
      expect(plan.runnable).toBe(false);
      if (plan.runnable) continue;
      expect(plan.reason).toContain(`no ${empty}`);
      expect(plan.reason).toContain('not in the Playwright cache');
      expect(plan.reason).toContain('never downloaded');
    }
  });

  it(
    'a run with the empty cache: the browser runs blocked with no cells, the Node legs ran, the folder still empty, verdict incomplete',
    async () => {
      const legs = [...(await runnableNodeLegs()), ...CROSSHOST_BROWSERS];
      const report = await runCrossHost(smallKernelFixture([1], ['xoshiro', 'regularFit']), { legs, env });
      for (const r of report.runs) {
        if (r.leg.startsWith('node-')) expect(r.status).toBe('ran');
        else {
          expect(r.status).toBe('blocked');
          expect(r.reason).toContain(empty);
          expect(r.cells).toBeUndefined();
          expect(r.host).toBeUndefined();
        }
      }
      expect(report.runs.filter((r) => r.status === 'blocked').length).toBe(6);
      expect(report.verdict).toBe('incomplete');
      expect(report.differences).toEqual([]);
      expect(readdirSync(empty)).toEqual([]);
      expect(process.env['PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD']).toBe('1');
    },
    RUN_TIMEOUT_MS,
  );

  // Hardening round S1, row 8 (checks/M0-d-06-notes.md note 8): the reason ended "— a Mac step" even on the Mac.
  it('the absent build\'s reason ends "— a Mac step" off the reference Mac, and on it names the cache to restore', async () => {
    for (const m of [
      { platform: 'linux', arch: 'x64', execPath: '/n' },
      { platform: 'darwin', arch: 'x64', execPath: '/n' },
      { platform: 'linux', arch: 'arm64', execPath: '/n' },
    ]) {
      const plan = await planCrossHostBrowserLeg('firefox', env, m);
      expect(plan.runnable).toBe(false);
      if (!plan.runnable) {
        expect(plan.reason).toMatch(/^firefox's pinned build \(playwright-core 1\.60\.0, C-0051\) is not in the Playwright cache: no .+; never downloaded \(the no-download rule, C-0028\) — a Mac step$/);
        expect(plan.reason).toContain(`no ${empty}`);
      }
    }
    const mac = await planCrossHostBrowserLeg('webkit', env, { platform: 'darwin', arch: 'arm64', execPath: '/usr/local/bin/node' });
    expect(mac.runnable).toBe(false);
    if (!mac.runnable) {
      expect(mac.reason).toContain('never downloaded (the no-download rule, C-0028) — on the reference Mac: restore the pinned build into the cache ');
      expect(mac.reason.endsWith(`the cache ${empty} (corepack pnpm browsers:check launches the three)`)).toBe(true);
      expect(mac.reason).not.toContain('a Mac step');
    }
    const viaLeg = await planCrossHostLeg('chromium', env, { platform: 'darwin', arch: 'arm64', execPath: '/usr/local/bin/node' });
    if (!viaLeg.runnable) expect(viaLeg.reason).not.toContain('a Mac step');
  });

  it('PLAYWRIGHT_BROWSERS_PATH=0 (a package-local folder) is not the cache: blocked', async () => {
    const plan = await planCrossHostBrowserLeg('chromium', { ...process.env, PLAYWRIGHT_BROWSERS_PATH: '0' });
    expect(plan.runnable).toBe(false);
    if (!plan.runnable) expect(plan.reason).toContain('not the Playwright cache');
  });

  it('the cache root follows playwright-core: the variable, else the OS cache folder', () => {
    expect(crossHostCacheRoot({ PLAYWRIGHT_BROWSERS_PATH: '/x/pw' }, 'darwin', '/h')).toBe('/x/pw');
    expect(crossHostCacheRoot({}, 'darwin', '/Users/o')).toBe('/Users/o/Library/Caches/ms-playwright');
    expect(crossHostCacheRoot({}, 'linux', '/home/o')).toBe('/home/o/.cache/ms-playwright');
    expect(crossHostCacheRoot({ XDG_CACHE_HOME: '/c' }, 'linux', '/home/o')).toBe('/c/ms-playwright');
    expect(crossHostCacheRoot({ PLAYWRIGHT_BROWSERS_PATH: '0' }, 'linux', '/home/o')).toBeNull();
  });
});
