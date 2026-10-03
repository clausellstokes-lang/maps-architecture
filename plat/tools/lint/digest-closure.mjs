// The scope of §6.5 (3)'s allowlist beyond the model packages: "the import closure of every digest-feeding function",
// found from the program so a module that joins it is linted without being listed. At M0 the walk is seeded with the
// five model packages' sources (the labels / render seeds join at M1, with those packages — M0-d-07's defers); every
// file the seeds reach through imports (relative, `@plat/<package>` through its `plat-source` entry) is in the closure,
// and the plugin applies the model rule set to the closure's files outside the model packages too. Vendored libraries
// the closure reaches are listed (the vendored scan covers them, §6.5 (4)); any other third-party package is listed
// as external (the dependency-direction rule refuses it in a model package).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import ts from 'typescript';
import { moduleCandidates } from './resolve.mjs';
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
 * The digest closure under root: { seeds, files, outside, vendored, external, unresolved } — plat/-relative paths and
 * package names, each sorted. `outside` is the closure's files that lie outside the model packages' sources.
 */
export function digestClosure(root = PLAT_ROOT, seedPackages = MODEL_PACKAGES) {
  const seeds = seedPackages.flatMap((p) => codeFiles(join(root, 'packages', p, 'src')));
  const vendoredNames = new Set(vendoredLibraries(root).map((l) => l.name));
  const seen = new Set();
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
        else if (vendoredNames.has(name)) {
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
      if (relPath(root, target) === null) continue; // outside plat/: the repository path rule's
      stack.push(target);
    }
  }
  const files = [...seen].map((f) => relPath(root, f)).sort(byCodeUnit);
  const inModel = (rel) => seedPackages.some((p) => rel.startsWith(`packages/${p}/src/`));
  return {
    seeds: seeds.map((f) => relPath(root, f)).sort(byCodeUnit),
    files,
    outside: files.filter((f) => !inModel(f)),
    vendored: [...vendored].sort(byCodeUnit),
    external: [...external].sort(byCodeUnit),
    unresolved: unresolved.sort(byCodeUnit),
  };
}
