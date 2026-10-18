#!/usr/bin/env node
// dmath's exit bar (M0-d-03; §16 M0 (d); C-0029): "known-answer tests pass on Node arm64 and under Rosetta".
//
//   node packages/kernel/test/dmath/kat-hosts.mjs        (from plat/, on the reference Mac, under arm64 Node)
//
// Bundles kat-run.ts (the vitest test's own check) with esbuild into one plain JavaScript file in a temporary folder,
// runs it with this Node binary as arm64 (`arch -arm64`) and as x64 under Rosetta 2 (`arch -x86_64`; Node 24 ships as a
// universal binary), each run checking every routine against both architectures' vectors, and prints one line per host.
// Exit 0 when both hosts report every case bit-identical and the two vector sets identical; 1 on any miss; 2 when this
// machine cannot run the two legs (not macOS on arm64). vitest is not used for the x64 leg: its bundler's native binding
// is installed for arm64 only. The browsers and the workers are M0-d-06's cross-host harness.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const here = fileURLToPath(new URL('.', import.meta.url));
const vectors = fileURLToPath(new URL('../vectors/fdlibm/', import.meta.url));

if (process.platform !== 'darwin' || process.arch !== 'arm64') {
  process.stderr.write(`kat-hosts: needs macOS on arm64 with Rosetta 2 (this is ${process.platform} ${process.arch})\n`);
  process.exit(2);
}

const entry = [
  "import { pathToFileURL } from 'node:url';",
  "import { runKat } from './kat-run.ts';",
  'const report = runKat(pathToFileURL(process.argv[2]));',
  'process.stdout.write(JSON.stringify(report));',
  'process.exitCode = report.ok ? 0 : 1;',
].join('\n');

const built = await esbuild.build({
  stdin: { contents: entry, resolveDir: here, sourcefile: 'kat-hosts-entry.ts', loader: 'ts' },
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node24',
  write: false,
  logLevel: 'silent',
});
const dir = mkdtempSync(join(tmpdir(), 'plat-dmath-kat-'));
const bundle = join(dir, 'kat.mjs');
writeFileSync(bundle, built.outputFiles[0].contents);

let ok = true;
try {
  for (const [flag, expectArch] of [['-arm64', 'arm64'], ['-x86_64', 'x64']]) {
    const run = spawnSync('arch', [flag, process.execPath, bundle, vectors], { encoding: 'utf8', maxBuffer: 1 << 26 });
    let report = null;
    try {
      report = JSON.parse(run.stdout);
    } catch {
      report = null;
    }
    if (report === null || run.status === null) {
      ok = false;
      process.stdout.write(`kat-hosts arch ${flag}: no report (exit ${run.status}); ${String(run.stderr).slice(0, 400)}\n`);
      continue;
    }
    const hostOk = report.ok && report.host.endsWith(` ${expectArch}`) && run.status === 0;
    ok &&= hostOk;
    const cases = report.results.map((r) => `${r.name}/${r.arch} ${r.cases - r.missCount}/${r.cases}`).join(', ');
    const same = Object.values(report.identical).every(Boolean) ? 'sets identical' : 'SETS DIFFER';
    process.stdout.write(`kat-hosts ${report.host}: ${hostOk ? 'ok' : 'FAIL'} — ${same}; ${cases}\n`);
    for (const r of report.results) for (const m of r.misses) process.stdout.write(`  ${r.arch} ${m}\n`);
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}
process.stdout.write(ok ? 'kat-hosts: ok on Node arm64 and Node x64 under Rosetta 2\n' : 'kat-hosts: FAIL\n');
process.exit(ok ? 0 : 1);
