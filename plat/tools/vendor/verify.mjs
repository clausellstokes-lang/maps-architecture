#!/usr/bin/env node
// Verifies the vendored libraries against vendor/vendor.lock.json (C-0010, C-0011):
//   node tools/vendor/verify.mjs [--root <vendor folder>]     (`corepack pnpm vendor:verify`)
// Every vendored file's sha256 must equal the lock's; no file may be missing or extra; each patch spec must hash as
// locked, its replaced text must be absent and its replacement present; package.json must carry no scripts or
// devDependencies and depend on other vendored libraries only through `workspace:`; every vendored folder must be locked.
// Exit 0 when clean, 1 with one line per problem (naming the file) otherwise.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCK_FILE, VENDOR_DIR, countOf, listFiles, readJson, sha256File, vendoredDirs } from './common.mjs';

/** @returns {{ ok: boolean, problems: string[], checked: number }} */
export function verifyVendor(vendorRoot = VENDOR_DIR) {
  const problems = [];
  const lockPath = join(vendorRoot, LOCK_FILE);
  if (!existsSync(lockPath)) return { ok: false, problems: [`${LOCK_FILE}: missing`], checked: 0 };
  const lock = readJson(lockPath);
  const libs = lock.libraries ?? {};
  let checked = 0;

  for (const key of vendoredDirs(vendorRoot)) {
    if (!(key in libs)) problems.push(`${key}/: vendored folder has no ${LOCK_FILE} entry`);
  }

  for (const key of Object.keys(libs).sort()) {
    const entry = libs[key];
    const dir = join(vendorRoot, key);
    if (!existsSync(dir)) { problems.push(`${key}/: missing`); continue; }
    const present = new Set(listFiles(dir));
    for (const [file, hash] of Object.entries(entry.files)) {
      checked += 1;
      if (!present.has(file)) { problems.push(`${key}/${file}: missing`); continue; }
      present.delete(file);
      const got = sha256File(join(dir, file));
      if (got !== hash) problems.push(`${key}/${file}: sha256 ${got} differs from the lock's ${hash}`);
    }
    for (const extra of present) problems.push(`${key}/${extra}: not in the lock`);

    if (entry.patch) {
      const specPath = join(vendorRoot, entry.patch);
      if (!existsSync(specPath)) {
        problems.push(`${entry.patch}: missing`);
      } else {
        const specHash = sha256File(specPath);
        if (specHash !== entry.patchSha256) problems.push(`${entry.patch}: sha256 ${specHash} differs from the lock's`);
        const spec = readJson(specPath);
        for (const e of spec.edits ?? []) {
          const file = join(dir, e.file);
          if (!existsSync(file)) continue; // reported above as missing
          const text = readFileSync(file, 'utf8');
          if (countOf(text, e.find) !== 0) problems.push(`${key}/${e.file}: patch not applied (${JSON.stringify(e.find)} present)`);
          if (countOf(text, e.replace) < e.count) problems.push(`${key}/${e.file}: patch replacement ${JSON.stringify(e.replace)} absent`);
        }
      }
    }

    const pkgPath = join(dir, 'package.json');
    if (existsSync(pkgPath)) {
      const pkg = readJson(pkgPath);
      if ('scripts' in pkg) problems.push(`${key}/package.json: carries scripts`);
      if ('devDependencies' in pkg) problems.push(`${key}/package.json: carries devDependencies`);
      for (const [dep, range] of Object.entries(pkg.dependencies ?? {})) {
        if (!String(range).startsWith('workspace:')) problems.push(`${key}/package.json: dependency ${dep}@${range} is not a vendored workspace: link`);
      }
    }
  }
  return { ok: problems.length === 0, problems, checked };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf('--root');
  const root = i > 0 ? process.argv[i + 1] : VENDOR_DIR;
  const r = verifyVendor(root);
  if (r.ok) {
    process.stdout.write(`vendor:verify ok — ${r.checked} files match ${LOCK_FILE}\n`);
  } else {
    for (const p of r.problems) process.stderr.write(`vendor:verify FAIL ${p}\n`);
    process.exit(1);
  }
}
