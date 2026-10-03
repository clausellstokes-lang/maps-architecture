// Shared helpers of the vendor tools (C-0010, C-0011). Node built-ins only.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, lstatSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PLAT_ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const VENDOR_DIR = join(PLAT_ROOT, 'vendor');
export const LOCK_FILE = 'vendor.lock.json';
export const PATCH_DIR = 'patches';

/** sha256 of a file's bytes, hex. */
export function sha256File(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

/** npm-style integrity (sha512, base64) of a file's bytes. */
export function sha512Integrity(path) {
  return 'sha512-' + createHash('sha512').update(readFileSync(path)).digest('base64');
}

/**
 * Every file under dir, as POSIX relative paths, sorted by code unit. `node_modules` folders are skipped: inside a
 * vendored library they hold only the links pnpm makes to its sibling vendored libraries, not vendored bytes. Symbolic
 * links are listed (never followed into folders), so a planted link shows up as a file the lock does not know.
 */
export function listFiles(dir) {
  const out = [];
  const walk = (d) => {
    const names = readdirSync(d).sort();
    for (const name of names) {
      if (name === 'node_modules') continue;
      const p = join(d, name);
      const st = lstatSync(p);
      if (st.isDirectory()) walk(p);
      else if (st.isFile() || st.isSymbolicLink()) out.push(relative(dir, p).split(sep).join('/'));
    }
  };
  walk(dir);
  return out.sort(byCodeUnit);
}

export function byCodeUnit(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** JSON with object keys sorted (recursively) and a trailing newline: byte-stable output. */
export function stableJson(value) {
  const norm = (v) => {
    if (Array.isArray(v)) return v.map(norm);
    if (v && typeof v === 'object') {
      const o = {};
      for (const k of Object.keys(v).sort(byCodeUnit)) o[k] = norm(v[k]);
      return o;
    }
    return v;
  };
  return JSON.stringify(norm(value), null, 2) + '\n';
}

export function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

/** The vendored library folders (`<name>@<version>`) present under a vendor root. */
export function vendoredDirs(vendorRoot) {
  if (!existsSync(vendorRoot)) return [];
  return readdirSync(vendorRoot)
    .filter((n) => n.includes('@') && !n.startsWith('@') && statSync(join(vendorRoot, n)).isDirectory())
    .sort(byCodeUnit);
}

/** Count non-overlapping occurrences of `needle` in `hay`. */
export function countOf(hay, needle) {
  if (needle.length === 0) return 0;
  let n = 0;
  let i = hay.indexOf(needle);
  while (i !== -1) {
    n += 1;
    i = hay.indexOf(needle, i + needle.length);
  }
  return n;
}
