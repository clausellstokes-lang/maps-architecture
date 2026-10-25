// M0-d-06's test "a browser that refuses to launch is reported blocked by the no-download rule (never faked) — tested by
// pointing the cache path at an empty dir" (C-0028): with PLAYWRIGHT_BROWSERS_PATH at an empty folder each browser leg
// is blocked, its reason naming the pinned build's absent executable inside that folder and the no-download rule; no
// cell is produced for it (nothing faked), nothing is written into the folder (nothing downloaded), the Node legs still
// run, and the verdict is incomplete — never a pass.
import { mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { CROSSHOST_BROWSERS, crossHostCacheRoot, planCrossHostBrowserLeg, runCrossHost } from '@plat/testkit';
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
