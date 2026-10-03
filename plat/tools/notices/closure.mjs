// The dependency closures and the licence checker of §17.4 (M0-s-01; C-0058). Node built-ins only.
// The production closure is every package reachable through `dependencies` / `optionalDependencies` from the shipped
// packages; the dev closure is everything else installed for the workspace (root devDependencies, the test kit's and the
// bench's dependencies, every package's devDependencies) and reachable from it. Our own packages (`@plat/*`) are walked
// through but never licence-checked. M0-d-07's `tools/lint/licences.mjs` wraps `checkLicences` for the PR-tier lint.
import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PLAT_ROOT = fileURLToPath(new URL('../../', import.meta.url));

/** The packages every shipped bundle is built from (§14's model packages at M0). */
export const SHIPPED = ['@plat/kernel', '@plat/model', '@plat/tables', '@plat/site', '@plat/layout'];

/** §17.4's allowlist (SPDX ids; Sun's fdlibm notice is handled by the notices generator, OFL by the fonts at M1). */
export const ALLOWED = new Set([
  'MIT', 'ISC', 'BSD-2-Clause', 'BSD-3-Clause', 'Apache-2.0', 'BSL-1.0', 'CC0-1.0', 'Unlicense', 'OFL-1.1',
]);

const OURS = (name) => name.startsWith('@plat/') || name === 'plat-workspace';

function readPkg(dir) {
  return JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
}

/** Node's lookup: the first node_modules/<name> walking up from `fromDir`, symbolic links resolved. */
export function findPackageDir(fromDir, name) {
  let d = fromDir;
  for (;;) {
    const candidate = join(d, 'node_modules', name);
    if (existsSync(join(candidate, 'package.json'))) return realpathSync(candidate);
    const up = dirname(d);
    if (up === d) return null;
    d = up;
  }
}

/** The licence of a package.json as one SPDX expression string (legacy `licenses` arrays joined with OR). */
export function licenceOf(pkg) {
  if (typeof pkg.license === 'string') return pkg.license;
  if (pkg.license && typeof pkg.license.type === 'string') return pkg.license.type;
  if (Array.isArray(pkg.licenses)) return pkg.licenses.map((l) => (typeof l === 'string' ? l : l.type)).join(' OR ');
  return 'UNKNOWN';
}

/** Is an SPDX expression (ids joined by OR / AND, optional parentheses) permitted by the allowlist? */
export function permitted(expression, allowed = ALLOWED) {
  const expr = expression.replace(/[()]/g, ' ').trim();
  if (expr === '') return false;
  return expr.split(/\s+OR\s+/).some((alt) => alt.split(/\s+AND\s+/).every((id) => allowed.has(id.trim())));
}

/**
 * Walk dependency edges from the given package directories.
 * @param {string[]} startDirs package directories whose own deps start the walk (the start packages themselves are included)
 * @param {(pkg: object, isStart: boolean) => string[]} edges the dependency names to follow from a package
 * @returns {Map<string, {name: string, version: string, licence: string, dir: string, via: string}>} keyed name@version
 */
export function walk(startDirs, edges) {
  const out = new Map();
  const stack = startDirs.map((dir) => ({ dir, via: '(start)', isStart: true }));
  // A start package reached first through another package's edges is walked again as a start, so the start-only edges
  // (its devDependencies) are never lost to the walk order (the scaffold fix round: testkit's oracles are dev, C-0062).
  const seenDirs = new Set();
  while (stack.length > 0) {
    const { dir, via, isStart } = stack.pop();
    const seenKey = isStart ? `${dir}\0start` : dir;
    if (seenDirs.has(seenKey)) continue;
    seenDirs.add(seenKey);
    const pkg = readPkg(dir);
    const key = `${pkg.name}@${pkg.version}`;
    if (!out.has(key)) out.set(key, { name: pkg.name, version: pkg.version, licence: licenceOf(pkg), dir, via });
    for (const dep of edges(pkg, isStart)) {
      const depDir = findPackageDir(dir, dep);
      if (depDir === null) {
        if ((pkg.optionalDependencies ?? {})[dep] !== undefined) continue; // an optional dependency not installed here
        throw new Error(`closure: ${key} needs ${dep}, which is not installed`);
      }
      stack.push({ dir: depDir, via: key, isStart: false });
    }
  }
  return out;
}

const runtimeEdges = (pkg) => [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.optionalDependencies ?? {}),
];

/** The production closure of the shipped packages under a workspace root. */
export function productionClosure(root = PLAT_ROOT, shipped = SHIPPED) {
  const dirs = shipped.map((name) => join(root, 'packages', name.slice('@plat/'.length)));
  return walk(dirs, runtimeEdges);
}

/** The dev closure: what the workspace installs beyond the production closure. */
export function devClosure(root = PLAT_ROOT, production = productionClosure(root)) {
  const starts = [root, join(root, 'bench'), join(root, 'packages', 'testkit')];
  for (const name of SHIPPED) starts.push(join(root, 'packages', name.slice('@plat/'.length)));
  const all = walk(starts.filter((d) => existsSync(join(d, 'package.json'))), (pkg, isStart) => [
    ...runtimeEdges(pkg),
    ...(isStart ? Object.keys(pkg.devDependencies ?? {}) : []),
  ]);
  for (const key of production.keys()) all.delete(key);
  return all;
}

/**
 * The §17.4 check. A production package outside the allowlist is a failure; a dev-only one is an exception, listed
 * with its reason from `devExceptions` (name → reason) or reported as unlisted. Our own packages are skipped.
 */
export function checkLicences(production, dev, devExceptions = {}, allowed = ALLOWED) {
  const failures = [];
  const exceptions = [];
  const sorted = (m) => [...m.values()].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : a.version < b.version ? -1 : 1));
  for (const p of sorted(production)) {
    if (OURS(p.name)) continue;
    if (!permitted(p.licence, allowed)) failures.push({ ...p, reason: 'production dependency outside the §17.4 allowlist' });
  }
  for (const p of sorted(dev)) {
    if (OURS(p.name)) continue;
    if (!permitted(p.licence, allowed)) exceptions.push({ ...p, reason: devExceptions[p.name] ?? null });
  }
  return { ok: failures.length === 0, failures, exceptions };
}
