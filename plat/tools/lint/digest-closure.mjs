// The scope of §6.5 (3)'s allowlist beyond the model packages: "the import closure of every digest-feeding function",
// found from the program so a module that joins it is linted without being listed. At M0 the walk is seeded with the
// five model packages' sources (the labels / render seeds join at M1, with those packages — M0-d-07's defers); every
// code file the seeds reach through imports (relative, `@plat/<package>` through its `plat-source` entry) is in the
// closure, and the plugin applies the model rule set to the closure's files outside the model packages too. Vendored
// libraries the closure reaches are listed (the vendored scan covers them, §6.5 (4)); any other third-party package is
// listed as external (the dependency-direction rule refuses it in a model package).
// What the walk reaches that is not code is not model code (C-0131; the checker's B1, closing round r3): a JSON file —
// C-0005's registries (`kernel/src/arena/roles.json`, `kernel/src/registry/*.json`), read by the kernel through an
// import since model code may not use node:fs — is data, listed in `data`, carries no code for a model rule to judge
// and is never linted as code; any other file that is neither code nor JSON (a WebAssembly module, a native addon, an
// asset) is listed in `unjudged`, which the model-coverage check refuses, since the lint cannot judge it. The import
// itself is still judged by the path and graph rules. A relative path into a node_modules folder names the package
// after its last node_modules segment, as dependency-direction reads it (C-0129 (3)): when that package is a vendored
// library and the path's real target lies in that library's own folder, the import is the library's — listed in
// `vendored`, its bytes the scan's — exactly as its bare name; any other path into node_modules (third-party bytes, a
// copy or a link elsewhere) stays a closure file, which the checks refuse as unread (C-0129 (2), C-0130 (1)).
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import ts from 'typescript';
import { moduleCandidates, realRoot } from './resolve.mjs';
import { nodeModulesPackage } from './rules/dependency-direction.mjs';
import {
  CODE_FILE,
  DECLARATION_FILE,
  MODEL_PACKAGES,
  PLAT_ROOT,
  byCodeUnit,
  isBuiltin,
  isPathSpecifier,
  packageNameOf,
  relPath,
  vendoredLibraries,
} from './rules/shared.mjs';

const isDeclaration = (p) => DECLARATION_FILE.test(p);

/** A JSON file's name: data an import reads as a value (C-0005's registries), not code (C-0131). */
export const DATA_FILE = /\.json$/;

/** Every code file under a folder (every code extension, no declarations, no node_modules), absolute, sorted. */
export function codeFiles(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir).sort(byCodeUnit)) {
    const abs = join(dir, name);
    if (name === 'node_modules') continue;
    if (statSync(abs).isDirectory()) out.push(...codeFiles(abs));
    else if (CODE_FILE.test(name) && !isDeclaration(name)) out.push(abs);
  }
  return out;
}

/** The first existing file a path import names (TypeScript's `.js` → `.ts`, index files), or null. */
function resolveFile(abs) {
  for (const c of [abs, ...moduleCandidates(abs)]) {
    if (existsSync(c) && statSync(c).isFile() && !isDeclaration(c)) return c;
  }
  return null;
}

/**
 * Does a path into a node_modules folder that names a vendored library really lie in that library's own `folder`
 * (`vendor/<name>@<version>/`, outside any node_modules below it) — the bytes the vendored scan reads?
 */
function inVendoredFolder(root, abs, folder) {
  let real;
  try {
    real = realpathSync(abs);
  } catch {
    return false;
  }
  const rel = relPath(realRoot(root), real);
  return rel !== null && rel.startsWith(`${folder}/`) && !rel.slice(folder.length + 1).split('/').includes('node_modules');
}

/**
 * The digest closure under root: { seeds, files, outside, data, unjudged, vendored, external, unresolved } —
 * plat/-relative paths and package names, each sorted. `files` is model code: the code files reached (`seeds` among
 * them), and `outside` those of them that lie outside the model packages' sources; `data` is the JSON files reached and
 * `unjudged` every other file reached that is not code (C-0131).
 */
export function digestClosure(root = PLAT_ROOT, seedPackages = MODEL_PACKAGES) {
  const seeds = seedPackages.flatMap((p) => codeFiles(join(root, 'packages', p, 'src')));
  const vendoredFolders = new Map(vendoredLibraries(root).map((l) => [l.name, l.folder]));
  const seen = new Set();
  const data = new Set();
  const unjudged = new Set();
  const vendored = new Set();
  const external = new Set();
  const unresolved = [];
  const stack = [...seeds];
  while (stack.length > 0) {
    const file = stack.pop();
    if (seen.has(file)) continue;
    seen.add(file);
    const info = ts.preProcessFile(readFileSync(file, 'utf8'), true, true);
    for (const { fileName: spec } of info.importedFiles) {
      if (isBuiltin(spec)) continue;
      let target = null;
      if (isPathSpecifier(spec)) target = resolveFile(resolve(dirname(file), spec));
      else {
        const name = packageNameOf(spec);
        if (name.startsWith('@plat/')) target = resolveFile(join(root, 'packages', name.slice('@plat/'.length), 'src', 'index.ts'));
        else if (vendoredFolders.has(name)) {
          vendored.add(name);
          continue;
        } else {
          external.add(name);
          continue;
        }
      }
      if (target === null) {
        unresolved.push(`${relPath(root, file)}: ${spec}`);
        continue;
      }
      const rel = relPath(root, target);
      if (rel === null) continue; // outside plat/: the repository path rule's
      const named = nodeModulesPackage(rel);
      if (named !== null && vendoredFolders.has(named) && inVendoredFolder(root, target, vendoredFolders.get(named))) {
        vendored.add(named); // `../../node_modules/flatbush/index.js` is flatbush, as its bare name is
        continue;
      }
      if (!CODE_FILE.test(target)) {
        (DATA_FILE.test(target) ? data : unjudged).add(rel); // not model code (C-0131)
        continue;
      }
      stack.push(target);
    }
  }
  const files = [...seen].map((f) => relPath(root, f)).sort(byCodeUnit);
  const inModel = (rel) => seedPackages.some((p) => rel.startsWith(`packages/${p}/src/`));
  return {
    seeds: seeds.map((f) => relPath(root, f)).sort(byCodeUnit),
    files,
    outside: files.filter((f) => !inModel(f)),
    data: [...data].sort(byCodeUnit),
    unjudged: [...unjudged].sort(byCodeUnit),
    vendored: [...vendored].sort(byCodeUnit),
    external: [...external].sort(byCodeUnit),
    unresolved: unresolved.sort(byCodeUnit),
  };
}
