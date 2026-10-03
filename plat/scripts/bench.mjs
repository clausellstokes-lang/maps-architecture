#!/usr/bin/env node
// The bench dispatcher (M0-s-01), run through tsx with the `plat-source` condition so the bench reads every package
// from source:  corepack pnpm bench -- <harness> [args]   ·   bench:calibrate   ·   bench:timing-phase   ·   tier:pr …
// Each harness is a folder of bench/src/ owned by one M0 item; its index.ts exports
//   run(args: string[], ctx: { out: string }): number | Promise<number>     (the exit code)
// Until the owning item lands, the folder's index exports nothing and the harness exits 2 with "not built: <item>";
// an unknown harness name exits 64.
// Output goes to PLAT_BENCH_OUT (the session's scratchpad build folder on the reference machine), never into plat/;
// inputs never come from it (C-0067). The item named per harness owns the folder's index.ts (M0-work.json; the tier
// runner is M0-f-02a's, the two AFTER-M-1 harnesses' entries M0-b-05a's and M0-c-07a's, ladder-coverage M0-x-05's).
//
// PLAT_BENCH_FIXTURE_ROOT (test-only; C-0095): when set, the dispatcher reads harness folders from
// <PLAT_BENCH_FIXTURE_ROOT>/bench/src/ instead of plat/bench/src/ and knows only FIXTURE_HARNESSES, so the scaffold's
// tests prove the "not built" exit on a fixture (tools/scaffold/fixtures/bench-root/) and never load or run a real
// harness. The fixture root must resolve inside plat/ (§17.1 (3), symbolic links resolved), else exit 64.
// The module exports its maps and resolveHarness() for those tests; it dispatches only when run as the main script.
import { realpathSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

export const HARNESSES = {
  calibrate: { folder: 'calibrate', item: 'M0-f-01' },
  timing: { folder: 'timing', item: 'M0-f-01' },
  'timing-phase': { folder: 'timing-phase', item: 'M0-t-01' },
  'tier:pr': { folder: 'tiers', item: 'M0-f-02a', args: ['pr'] },
  'tier:nightly': { folder: 'tiers', item: 'M0-f-02a', args: ['nightly'] },
  'tier:milestone': { folder: 'tiers', item: 'M0-f-02a', args: ['milestone'] },
  'fuzz-bar': { folder: 'fuzz-bar', item: 'M0-k-04' },
  skeleton: { folder: 'skeleton', item: 'M0-a-12' },
  bentcut: { folder: 'bentcut', item: 'M0-b-04' },
  'bentcut-ng': { folder: 'bentcut-ng', item: 'M0-b-05a' },
  fusion: { folder: 'fusion', item: 'M0-c-06' },
  'fusion-ng': { folder: 'fusion-ng', item: 'M0-c-07a' },
  site: { folder: 'site', item: 'M0-e-06' },
  determinism: { folder: 'determinism', item: 'M0-d-09' },
  crosshost: { folder: 'crosshost', item: 'M0-d-06' },
  worklimits: { folder: 'worklimits', item: 'M0-f-03b' },
  'ladder-coverage': { folder: 'ladder-coverage', item: 'M0-x-05' },
};

/** The only harnesses known under PLAT_BENCH_FIXTURE_ROOT. M0-zz-00 is a fixture id, not a work item (C-0095). */
export const FIXTURE_HARNESSES = {
  'zz-unbuilt': { folder: 'zz-unbuilt', item: 'M0-zz-00' },
};

export const PLAT_ROOT = fileURLToPath(new URL('../', import.meta.url));

/**
 * Resolves a harness name to its index file without loading it.
 * @returns {{ ok: true, folder: string, item: string, args: string[], index: string }
 *         | { ok: false, code: 64, message: string }}
 */
export function resolveHarness(name, env = process.env) {
  let benchRoot = PLAT_ROOT;
  let map = HARNESSES;
  const fixture = env.PLAT_BENCH_FIXTURE_ROOT;
  if (fixture !== undefined && fixture !== '') {
    let real;
    try {
      real = realpathSync(fixture);
    } catch {
      return { ok: false, code: 64, message: `bench: PLAT_BENCH_FIXTURE_ROOT ${JSON.stringify(fixture)} does not exist` };
    }
    const plat = realpathSync(PLAT_ROOT);
    if (real !== plat && !real.startsWith(plat + sep)) {
      return { ok: false, code: 64, message: `bench: PLAT_BENCH_FIXTURE_ROOT ${JSON.stringify(fixture)} resolves outside plat/ (§17.1 (3))` };
    }
    benchRoot = real;
    map = FIXTURE_HARNESSES;
  }
  const h = typeof name === 'string' && Object.hasOwn(map, name) ? map[name] : undefined;
  if (h === undefined) {
    return { ok: false, code: 64, message: `bench: unknown harness ${JSON.stringify(name)}; one of: ${Object.keys(map).join(', ')}` };
  }
  return { ok: true, folder: h.folder, item: h.item, args: h.args ?? [], index: join(benchRoot, 'bench', 'src', h.folder, 'index.ts') };
}

async function main(rawArgs) {
  const argv = rawArgs.filter((a, i) => !(i === 0 && a === '--'));
  const h = resolveHarness(argv[0]);
  if (!h.ok) {
    process.stderr.write(`${h.message}\n`);
    return h.code;
  }
  const out = process.env.PLAT_BENCH_OUT || join(tmpdir(), 'plat-bench');
  const mod = await import(pathToFileURL(h.index).href);
  if (typeof mod.run !== 'function') {
    process.stderr.write(`not built: ${h.item} (bench/src/${h.folder}/index.ts exports no run)\n`);
    return 2;
  }
  const code = await mod.run([...h.args, ...argv.slice(1)], { out });
  return typeof code === 'number' ? code : 0;
}

const isMain = (() => {
  if (!process.argv[1]) return false;
  try {
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
})();
if (isMain) process.exit(await main(process.argv.slice(2)));
