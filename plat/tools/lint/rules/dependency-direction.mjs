// plat/dependency-direction (§14's dependency rules; M0.md §4's package rules): `kernel ← model ← tables ← site ←
// layout`; `testkit` may import every package and is imported by nothing shipped; `bench` imports the packages and the
// test kit; every adopted runtime library is imported in exactly one adapter file of the one package that uses it
// (`packages/<package>/src/adapters/<library>.ts`); no model package's source imports a Node built-in or a third-party
// library other than through its adapters. A file belongs to the folder directly under `packages/` (or to `bench/`), at
// every depth — so `packages/testkit/test/kernel/<folder>/` is test-kit code (C-0122, the spec note N-12). A package's
// tests follow its package's direction (C-0056) but may import an adopted library directly, as the reference a test
// compares against (C-0127). A relative import into another package counts as an import of that package.
import { dirname, resolve } from 'node:path';
import {
  MODEL_PACKAGES,
  isBuiltin,
  isPathSpecifier,
  packageNameOf,
  platRootOf,
  readManifest,
  relPath,
  specifierVisitors,
  vendoredLibraries,
} from './shared.mjs';

/** What each package may import (itself included), §14 at M0. A package missing here is refused until it is added. */
export const MAY_IMPORT = Object.freeze({
  kernel: ['kernel'],
  model: ['kernel', 'model'],
  tables: ['kernel', 'model', 'tables'],
  site: ['kernel', 'model', 'tables', 'site'],
  layout: ['kernel', 'model', 'tables', 'site', 'layout'],
  testkit: [...MODEL_PACKAGES, 'testkit'],
  bench: [...MODEL_PACKAGES, 'testkit', 'bench'],
});

const SHIPPED = new Set(MODEL_PACKAGES);
const cache = new Map();

/**
 * The adopted libraries under a root: each vendored library with the shipped packages whose manifest depends on it
 * (its adapter's package) — { name → string[] }.
 */
export function adoptionTable(root) {
  if (cache.has(root)) return cache.get(root);
  const table = new Map();
  for (const lib of vendoredLibraries(root)) table.set(lib.name, []);
  for (const pkg of MODEL_PACKAGES) {
    const m = readManifest(root, `packages/${pkg}`);
    for (const dep of Object.keys(m?.dependencies ?? {})) {
      if (table.has(dep)) table.get(dep).push(pkg);
    }
  }
  cache.set(root, table);
  return table;
}

/** The package a plat/-relative path belongs to: { pkg, area } ('src' | 'test' | other), or null outside the graph. */
export function packageOf(rel) {
  if (rel === null) return null;
  const parts = rel.split('/');
  if (parts[0] === 'packages' && parts.length >= 3) return { pkg: parts[1], area: parts[2] };
  if (parts[0] === 'bench' && parts.length >= 2) return { pkg: 'bench', area: parts[1] };
  return null;
}

export const adapterPath = (pkg, lib) => `packages/${pkg}/src/adapters/${lib}.ts`;

export default {
  meta: {
    type: 'problem',
    docs: { description: '§14 dependency direction, the test kit imported by nothing shipped, one adapter file per adopted library' },
    schema: [],
    messages: {
      direction: '@plat/{{from}} may not import @plat/{{to}}: §14 allows {{allowed}} (kernel ← model ← tables ← site ← layout; the test kit is imported by nothing shipped).',
      unknownPackage: '@plat/{{name}} is not in the dependency table of M0 (§14); add it to tools/lint/rules/dependency-direction.mjs with its milestone.',
      outsideGraph: 'A package imports {{target}}, outside the package graph (§14): packages import packages, never build tools or scripts.',
      outsideAdapter: '{{lib}} is an adopted library: only its one adapter file may import it ({{adapter}}; §14).',
      nodeBuiltin: 'A model package imports the Node built-in {{name}} (§14: no Node globals or modules in model packages).',
      thirdPartyInModel: 'A model package imports {{name}}, which is not an adopted library (§14, §17.4: the production closure is the vendored libraries, each through its adapter).',
    },
  },
  create(context) {
    const root = platRootOf(context);
    const filename = context.physicalFilename ?? context.filename;
    const rel = relPath(root, resolve(filename));
    const home = packageOf(rel);
    if (home === null) return {};
    const known = Object.hasOwn(MAY_IMPORT, home.pkg);
    const isModelSrc = SHIPPED.has(home.pkg) && home.area === 'src';
    const adoption = adoptionTable(root);

    function checkPackage(node, to) {
      if (!Object.hasOwn(MAY_IMPORT, to)) {
        context.report({ node, messageId: 'unknownPackage', data: { name: to } });
        return;
      }
      if (!known) return; // reported once at the program
      const allowed = MAY_IMPORT[home.pkg];
      if (!allowed.includes(to)) {
        context.report({ node, messageId: 'direction', data: { from: home.pkg, to, allowed: allowed.map((p) => `@plat/${p}`).join(', ') } });
      }
    }

    function checkLibrary(node, lib) {
      if (home.area === 'test') return;
      const owners = adoption.get(lib);
      const adapter = owners.length === 1 ? adapterPath(owners[0], lib) : null;
      if (adapter !== null && rel === adapter) return;
      const where = owners.length === 0
        ? 'no shipped package depends on it, so no file may import it'
        : owners.length > 1
          ? `it is depended on by ${owners.map((p) => `@plat/${p}`).join(' and ')}; one package may adopt it`
          : adapter;
      context.report({ node, messageId: 'outsideAdapter', data: { lib, adapter: where } });
    }

    const visitors = specifierVisitors((spec, node) => {
      if (isBuiltin(spec)) {
        if (isModelSrc) context.report({ node, messageId: 'nodeBuiltin', data: { name: spec } });
        return;
      }
      if (isPathSpecifier(spec)) {
        const target = relPath(root, resolve(dirname(resolve(filename)), spec));
        if (target === null) return; // outside plat/: plat/repository-path's report
        const there = packageOf(target);
        if (there !== null) {
          if (there.pkg !== home.pkg) checkPackage(node, there.pkg);
          return;
        }
        const parts = target.split('/');
        if (parts[0] === 'vendor' && parts.length >= 2) {
          const lib = parts[1].slice(0, parts[1].lastIndexOf('@'));
          if (adoption.has(lib)) {
            checkLibrary(node, lib);
            return;
          }
        }
        context.report({ node, messageId: 'outsideGraph', data: { target } });
        return;
      }
      const name = packageNameOf(spec);
      if (name.startsWith('@plat/')) {
        checkPackage(node, name.slice('@plat/'.length));
        return;
      }
      if (adoption.has(name)) {
        checkLibrary(node, name);
        return;
      }
      if (isModelSrc) context.report({ node, messageId: 'thirdPartyInModel', data: { name } });
    });

    return {
      ...visitors,
      Program(node) {
        if (!known) context.report({ node, loc: { line: 1, column: 0 }, messageId: 'unknownPackage', data: { name: home.pkg } });
      },
    };
  },
};
