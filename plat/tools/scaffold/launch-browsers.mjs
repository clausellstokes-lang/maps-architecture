#!/usr/bin/env node
// `corepack pnpm browsers:check` (M0-s-01; C-0028, C-0051): launches each cached Playwright build once under the
// pinned playwright-core — Chromium (its headless shell), Firefox, WebKit — from ~/Library/Caches/ms-playwright, with
// no download (PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1), opens no page, and logs the executable and version it reports.
// The log goes to $PLAT_BENCH_OUT/browsers-launch.log (and stdout). Exit 0 only when all three launch.
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { chromium, firefox, webkit } from 'playwright-core';

process.env.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1';
const require = createRequire(import.meta.url);
const pw = require('playwright-core/package.json');
const out = process.env.PLAT_BENCH_OUT || join(tmpdir(), 'plat-bench');
mkdirSync(out, { recursive: true });
const log = join(out, 'browsers-launch.log');
writeFileSync(log, '');
const say = (line) => {
  process.stdout.write(line + '\n');
  appendFileSync(log, line + '\n');
};

const pwDir = dirname(require.resolve('playwright-core/package.json'));
const revs = JSON.parse(readFileSync(join(pwDir, 'browsers.json'), 'utf8')).browsers
  .filter((b) => ['chromium', 'chromium-headless-shell', 'firefox', 'webkit'].includes(b.name))
  .map((b) => `${b.name} ${b.revisionOverrides?.['mac14-arm64'] ?? b.revision}`)
  .join(', ');
say(`playwright-core ${pw.version}; ${process.platform} ${process.arch}; node ${process.version}`);
say(`revisions for this host (browsers.json): ${revs}; headless Chromium runs the chromium-headless-shell build`);
let failed = 0;
for (const [name, type] of [['chromium', chromium], ['firefox', firefox], ['webkit', webkit]]) {
  const exe = type.executablePath();
  try {
    const t0 = process.hrtime.bigint();
    const browser = await type.launch({ headless: true });
    const ms = Number((process.hrtime.bigint() - t0) / 1_000_000n);
    say(`${name}: launched version ${browser.version()} in ${ms} ms from ${exe}`);
    await browser.close();
  } catch (e) {
    failed += 1;
    say(`${name}: FAILED to launch from ${exe}: ${String(e.message ?? e).split('\n')[0]}`);
  }
}
say(failed === 0 ? 'browsers: all three launched' : `browsers: ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
