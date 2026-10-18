// The resolver of the repository path rule (§17.1 (3)): judges a path or a module specifier written in a plat/ file
// against plat/. A path is judged lexically first — one that leaves plat/ is refused without touching the file system
// there (the clean room's firewall is physical on this machine) — and only a path inside plat/ is followed through its
// symbolic links. Used by the ESLint rule `plat/repository-path` and the whole-tree check in paths.mjs.
import { lstatSync, readFileSync, readlinkSync, realpathSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { isBuiltin, isInside, isPathSpecifier, packageNameOf } from './rules/shared.mjs';

const lexists = (p) => {
  try {
    lstatSync(p);
    return true;
  } catch {
    return false;
  }
};

const realRoots = new Map();
/** realpath of a root, cached. */
export function realRoot(root) {
  if (!realRoots.has(root)) realRoots.set(root, realpathSync(root));
  return realRoots.get(root);
}

/**
 * Where an existing path really lies: its realpath, or for a dangling link the lexical resolution of its target
 * (judged without following it further).
 */
export function realOf(p) {
  try {
    return realpathSync(p);
  } catch {
    const st = lstatSync(p);
    if (st.isSymbolicLink()) return resolve(dirname(p), readlinkSync(p));
    throw new Error(`paths: cannot resolve ${p}`);
  }
}

/**
 * Judges an absolute path against plat/: { ok: true } or { ok: false, reason: 'outside' | 'link', target }.
 * `candidates` are extra spellings to try first (an import's `.ts` for `.js`, an index file); the first that exists
 * is followed through its links, else the deepest existing ancestor (never above root) is.
 */
export function judgePath(root, abs, candidates = []) {
  if (!isInside(root, abs)) return { ok: false, reason: 'outside', target: abs };
  const rr = realRoot(root);
  for (const c of [abs, ...candidates]) {
    if (!isInside(root, c) || !lexists(c)) continue;
    const real = realOf(c);
    return isInside(rr, real) ? { ok: true } : { ok: false, reason: 'link', target: real };
  }
  let p = dirname(abs);
  while (!lexists(p) && p !== root) p = dirname(p);
  const real = realOf(p);
  return isInside(rr, real) ? { ok: true } : { ok: false, reason: 'link', target: real };
}

/** The nearest package.json at or above a folder, inside root: { dir, name } (name null when unnamed), else null. */
export function nearestManifest(root, fromDir) {
  for (let d = fromDir; isInside(root, d); d = dirname(d)) {
    const p = join(d, 'package.json');
    if (lexists(p)) {
      try {
        const name = JSON.parse(readFileSync(p, 'utf8')).name;
        return { dir: d, name: typeof name === 'string' ? name : null };
      } catch {
        return { dir: d, name: null };
      }
    }
    if (d === root) break;
  }
  return null;
}

/**
 * The spellings a module path may resolve to: an extension added (every code extension, C-0128), TypeScript's output
 * spelling naming its source (`.js` → `.ts` / `.tsx`, `.jsx` → `.tsx`, `.mjs` → `.mts`, `.cjs` → `.cts`), index files.
 */
export function moduleCandidates(abs) {
  const out = [];
  for (const ext of ['.ts', '.tsx', '.mts', '.cts', '.d.ts', '.js', '.jsx', '.mjs', '.cjs', '.json']) out.push(abs + ext);
  if (abs.endsWith('.js')) out.push(abs.slice(0, -3) + '.ts', abs.slice(0, -3) + '.tsx');
  if (abs.endsWith('.jsx')) out.push(abs.slice(0, -4) + '.tsx');
  if (abs.endsWith('.mjs')) out.push(abs.slice(0, -4) + '.mts');
  if (abs.endsWith('.cjs')) out.push(abs.slice(0, -4) + '.cts');
  for (const idx of ['index.ts', 'index.tsx', 'index.js', 'index.jsx', 'index.mjs']) out.push(join(abs, idx));
  return out;
}

/**
 * Judges one module specifier written in `fromFile`: a path specifier as a path; a bare one through the
 * `node_modules` walk from the file's folder up to plat/ (never above it) — the package folder found must lie inside
 * plat/ with its links resolved, and a package found nowhere inside plat/ would resolve outside it. Built-ins pass.
 */
export function judgeSpecifier(root, fromFile, spec) {
  if (isBuiltin(spec) || /^[a-z][a-z0-9+.-]*:/i.test(spec)) return { ok: true }; // node:, data:, https: …
  if (isPathSpecifier(spec)) {
    const abs = resolve(dirname(fromFile), spec);
    return judgePath(root, abs, moduleCandidates(abs));
  }
  const name = packageNameOf(spec);
  const rr = realRoot(root);
  const scope = nearestManifest(root, dirname(fromFile));
  if (scope !== null && scope.name === name) {
    // Node's self-reference: a package imports itself by its own name through its `exports`.
    const real = realOf(scope.dir);
    return isInside(rr, real) ? { ok: true } : { ok: false, reason: 'link', target: real };
  }
  for (let d = dirname(fromFile); isInside(root, d); d = dirname(d)) {
    const candidate = join(d, 'node_modules', name);
    if (lexists(candidate)) {
      const real = realOf(candidate);
      return isInside(rr, real) ? { ok: true } : { ok: false, reason: 'link', target: real };
    }
    if (d === root) break;
  }
  return { ok: false, reason: 'unresolved', target: name };
}
