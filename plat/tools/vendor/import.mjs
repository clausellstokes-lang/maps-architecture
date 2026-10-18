#!/usr/bin/env node
// Vendors registry tarballs into plat/vendor/<name>@<version>/ (C-0010):
//   node tools/vendor/import.mjs <tarball.tgz> [<tarball.tgz> ...]
// The tarballs are fetched beforehand by the operator (`npm pack <name>@<version>` in a scratch folder) and their
// integrity compared with the registry's `dist.integrity`; this tool records that integrity in vendor.lock.json.
// Per library it: unpacks the tarball; strips `scripts` and `devDependencies` from package.json; rewrites a dependency on
// another vendored library to `workspace:<version>` (so no registry copy enters the production closure, C-0055);
// applies vendor/patches/<name>@<version>.json (exact replacements with expected counts, C-0011); and records every
// file's post-patch sha256, the pre-patch sha256 of each changed file and the package.json edits.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import {
  LOCK_FILE, PATCH_DIR, VENDOR_DIR, countOf, listFiles, readJson, sha256File, sha512Integrity, stableJson, vendoredDirs,
} from './common.mjs';

function fail(msg) {
  process.stderr.write(`vendor import: ${msg}\n`);
  process.exit(1);
}

/** Does `version` satisfy a caret or exact range (the only forms the vendored libraries use)? */
function admits(range, version) {
  const parse = (v) => v.split('.').map((x) => Number.parseInt(x, 10));
  const [M, m, p] = parse(version);
  if (/^\d+\.\d+\.\d+$/.test(range)) return range === version;
  const caret = /^\^(\d+)\.(\d+)\.(\d+)$/.exec(range);
  if (!caret) return false;
  const [rM, rm, rp] = caret.slice(1).map(Number);
  if (M !== rM) return false;
  return m > rm || (m === rm && p >= rp);
}

const tarballs = process.argv.slice(2);
if (tarballs.length === 0) fail('usage: node tools/vendor/import.mjs <tarball.tgz> ...');

// Unpack everything first, so inter-library dependencies are known before package.json is rewritten.
const staged = [];
for (const tgz of tarballs) {
  if (!existsSync(tgz)) fail(`no such tarball: ${tgz}`);
  const tmp = mkdtempSync(join(tmpdir(), 'plat-vendor-'));
  const r = spawnSync('tar', ['-xzf', tgz, '-C', tmp], { encoding: 'utf8' });
  if (r.status !== 0) fail(`tar failed on ${tgz}: ${r.stderr}`);
  const dir = join(tmp, 'package');
  const pkg = readJson(join(dir, 'package.json'));
  staged.push({ tgz, tmp, dir, pkg, integrity: sha512Integrity(tgz) });
}

const lockPath = join(VENDOR_DIR, LOCK_FILE);
const lock = existsSync(lockPath) ? readJson(lockPath) : { lockVersion: 1, libraries: {} };

const versionOf = new Map();
for (const key of vendoredDirs(VENDOR_DIR)) {
  const at = key.lastIndexOf('@');
  versionOf.set(key.slice(0, at), key.slice(at + 1));
}
for (const s of staged) versionOf.set(s.pkg.name, s.pkg.version);

for (const s of staged) {
  const { pkg, dir } = s;
  const key = `${pkg.name}@${pkg.version}`;
  const before = new Map(listFiles(dir).map((f) => [f, sha256File(join(dir, f))]));

  const edits = [];
  if ('scripts' in pkg) { delete pkg.scripts; edits.push('removed scripts'); }
  if ('devDependencies' in pkg) { delete pkg.devDependencies; edits.push('removed devDependencies'); }
  for (const [dep, range] of Object.entries(pkg.dependencies ?? {})) {
    const v = versionOf.get(dep);
    if (v === undefined) fail(`${key} depends on ${dep}@${range}, which is not vendored`);
    if (!admits(range, v)) fail(`${key} needs ${dep}@${range}; the vendored ${dep} is ${v}`);
    pkg.dependencies[dep] = `workspace:${v}`;
    edits.push(`dependency ${dep}: ${range} -> workspace:${v}`);
  }
  writeFileSync(join(dir, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');

  const patchRel = `${PATCH_DIR}/${key}.json`;
  const patchPath = join(VENDOR_DIR, patchRel);
  let patch = null;
  let patchSha256 = null;
  if (existsSync(patchPath)) {
    const spec = readJson(patchPath);
    for (const e of spec.edits) {
      const file = join(dir, e.file);
      const text = readFileSync(file, 'utf8');
      const n = countOf(text, e.find);
      if (n !== e.count) fail(`${key}/${e.file}: expected ${e.count} of ${JSON.stringify(e.find)}, found ${n}`);
      writeFileSync(file, text.split(e.find).join(e.replace));
    }
    patch = patchRel;
    patchSha256 = sha256File(patchPath);
  }

  const files = {};
  const original = {};
  for (const f of listFiles(dir)) {
    files[f] = sha256File(join(dir, f));
    const was = before.get(f);
    if (was !== undefined && was !== files[f]) original[f] = was;
  }

  const dest = join(VENDOR_DIR, key);
  rmSync(dest, { recursive: true, force: true });
  try { renameSync(dir, dest); } catch { cpSync(dir, dest, { recursive: true }); }
  rmSync(s.tmp, { recursive: true, force: true });

  lock.libraries[key] = {
    name: pkg.name,
    version: pkg.version,
    licence: pkg.license ?? null,
    tarball: basename(s.tgz),
    integrity: s.integrity,
    packageJsonEdits: edits,
    patch,
    patchSha256,
    original,
    files,
  };
  process.stdout.write(`vendored ${key} (${Object.keys(files).length} files, ${Object.keys(original).length} changed)\n`);
}

writeFileSync(lockPath, stableJson(lock));
