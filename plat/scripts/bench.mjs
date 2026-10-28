#!/usr/bin/env node
// The bench dispatcher (M0-s-01), run through tsx with the `plat-source` condition so the bench reads every package
// from source:  corepack pnpm bench -- <harness> [args]   ·   bench:calibrate   ·   bench:timing-phase   ·   tier:pr …
//               ·   scan   ·   parity   ·   baselines:check -- <file>
// Each harness is a folder of bench/src/ owned by one M0 item; its index.ts exports
//   run(args: string[], ctx: { out: string }): number | Promise<number>     (the exit code)
// Until the owning item lands, the folder's index exports nothing and the harness exits 2 with "not built: <item>";
// an unknown harness name exits 64.
// Output goes to PLAT_BENCH_OUT (the session's scratchpad build folder on the reference machine), never into plat/;
// inputs never come from it (C-0067). The item named per harness owns the folder's index.ts (M0-work.json; the tier
// runner is M0-f-02a's, the timing-phase script M0-t-00's (C-0115), the NG and MFCG comparison harnesses M0-b-05's and
// M0-c-07's (C-0117), ladder-coverage M0-x-05's). Three entries are the M0 command surface of the design's CLIs
// (C-0113): `scan` (the clean-room content scan, M0-k-06), `parity` (`plat parity`, M0-k-05) and `baselines-check`
// (`plat baselines check <file>`, M0-k-05), with the root shortcuts `corepack pnpm scan | parity | baselines:check`;
// each folder is a thin entry over @plat/testkit's code; the one `plat` bin is M1's (@plat/api).
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
  'timing-phase': { folder: 'timing-phase', item: 'M0-t-00' },
  'tier:pr': { folder: 'tiers', item: 'M0-f-02a', args: ['pr'] },
  'tier:nightly': { folder: 'tiers', item: 'M0-f-02a', args: ['nightly'] },
  'tier:milestone': { folder: 'tiers', item: 'M0-f-02a', args: ['milestone'] },
  'fuzz-bar': { folder: 'fuzz-bar', item: 'M0-k-04' },
  skeleton: { folder: 'skeleton', item: 'M0-a-12' },
  bentcut: { folder: 'bentcut', item: 'M0-b-04' },
  'bentcut-ng': { folder: 'bentcut-ng', item: 'M0-b-05' },
  fusion: { folder: 'fusion', item: 'M0-c-06' },
  'fusion-ng': { folder: 'fusion-ng', item: 'M0-c-07' },
  site: { folder: 'site', item: 'M0-e-06' },
  determinism: { folder: 'determinism', item: 'M0-d-09' },
  crosshost: { folder: 'crosshost', item: 'M0-d-06' },
  worklimits: { folder: 'worklimits', item: 'M0-f-03b' },
  'ladder-coverage': { folder: 'ladder-coverage', item: 'M0-x-05' },
  profile: { folder: 'profile', item: 'M0-c-06' },
  scan: { folder: 'scan', item: 'M0-k-06' },
  parity: { folder: 'parity', item: 'M0-k-05' },
  'baselines-check': { folder: 'baselines-check', item: 'M0-k-05' },
};

/**
 * The only harnesses known under PLAT_BENCH_FIXTURE_ROOT. M0-zz-00 and M0-zz-01 are fixture ids, not work items
 * (C-0095): `zz-unbuilt` exports no run; `zz-echo` prints the arguments it receives (the shortcuts' `-- <file>` form).
 */
export const FIXTURE_HARNESSES = {
  'zz-unbuilt': { folder: 'zz-unbuilt', item: 'M0-zz-00' },
  'zz-echo': { folder: 'zz-echo', item: 'M0-zz-01' },
};

/**
 * The dispatcher's argument rule: one leading `--` (pnpm's separator before the harness name) is dropped, and one `--`
 * directly after the harness name (a shortcut's `corepack pnpm baselines:check -- <file>`) is dropped; everything else
 * reaches the harness unchanged, after the entry's own fixed arguments.
 * @returns {{ name: string | undefined, rest: string[] }}
 */
export function splitArgs(rawArgs) {
  const argv = rawArgs[0] === '--' ? rawArgs.slice(1) : [...rawArgs];
  const rest = argv.slice(1);
  if (rest[0] === '--') rest.shift();
  return { name: argv[0], rest };
}

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
  const { name, rest } = splitArgs(rawArgs);
  const h = resolveHarness(name);
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
  const code = await mod.run([...h.args, ...rest], { out });
  return typeof code === 'number' ? code : 0;
}

/**
 * Is the module at `url` the script node was started with? Real paths compared, so a script named through a symbolic
 * link runs (the tools' one form, as `tools/landed/snapshot.mjs`'s; L14). The scripts' helper: build.mjs imports it.
 */
export const isMain = (url) => {
  if (!process.argv[1]) return false;
  try {
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(url));
  } catch {
    return false;
  }
};
if (isMain(import.meta.url)) process.exit(await main(process.argv.slice(2)));
