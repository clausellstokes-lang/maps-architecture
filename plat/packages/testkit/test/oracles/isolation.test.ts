// M0-k-03's checker line "neither oracle is reachable from any shipped package's import graph" (§3.7: the oracles are
// dev dependencies of @plat/testkit only; §14: the test kit is imported by nothing shipped; §17.4), held as a test:
// every static and dynamic import reachable from each shipped package's src/index.ts — relative files and @plat/
// packages followed through their sources — names neither oracle library nor the test kit, no shipped manifest lists
// them, and inside the test kit only the two adapter files import the libraries.
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const PLAT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const SHIPPED = ['kernel', 'model', 'tables', 'site', 'layout'];
const ORACLES = ['clipper2-wasm', 'polygon-clipping'];

/** Every import specifier of a TypeScript source: `import … from`, `export … from`, bare `import '…'`, `import('…')`. */
function specifiers(source: string): string[] {
  const out: string[] = [];
  const re = /(?:^|[^\w.$])(?:import|export)\s*(?:type\s+)?(?:[^'"`;]*?\sfrom\s*)?['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)/gm;
  for (const m of source.matchAll(re)) out.push(m[1] ?? m[2]);
  return out;
}

/** The source file a relative specifier names (`.js` written for `.ts`, or a folder's index). */
function resolveRelative(from: string, spec: string): string | null {
  const base = resolve(dirname(from), spec);
  for (const c of [base.replace(/\.js$/, '.ts'), `${base}.ts`, join(base, 'index.ts'), base]) {
    if (existsSync(c) && statSync(c).isFile()) return c;
  }
  return null;
}

/** The files and bare specifiers reachable from a package's src/index.ts under a plat/ root. */
function reach(pkg: string, root: string = PLAT): { files: Set<string>; bare: Set<string> } {
  const files = new Set<string>();
  const bare = new Set<string>();
  const queue = [join(root, 'packages', pkg, 'src', 'index.ts')];
  while (queue.length > 0) {
    const f = queue.pop() as string;
    if (files.has(f)) continue;
    files.add(f);
    for (const spec of specifiers(readFileSync(f, 'utf8'))) {
      if (spec.startsWith('.')) {
        const t = resolveRelative(f, spec);
        if (t !== null) queue.push(t);
        continue;
      }
      bare.add(spec);
      if (spec.startsWith('@plat/')) {
        const entry = join(root, 'packages', spec.slice('@plat/'.length).split('/')[0], 'src', 'index.ts');
        if (existsSync(entry)) queue.push(entry);
      }
    }
  }
  return { files, bare };
}

function tsFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...tsFiles(p));
    else if (p.endsWith('.ts')) out.push(p);
  }
  return out;
}

describe('neither oracle is reachable from any shipped package’s import graph', () => {
  it('finds the specifier forms it walks', () => {
    const src = [
      "import a from 'x-default';",
      "import { b } from './b.js';",
      "export * from '../c/index.js';",
      "import type { D } from '@plat/kernel';",
      "import 'side-effect';",
      "const m = await import('dyn');",
    ].join('\n');
    expect(specifiers(src).sort()).toEqual(['../c/index.js', './b.js', '@plat/kernel', 'dyn', 'side-effect', 'x-default']);
  });

  it('catches a planted import two hops away, through a relative file and through another package', () => {
    const root = mkdtempSync(join(tmpdir(), 'm0-k-03-isolation-'));
    try {
      const put = (rel: string, text: string): void => {
        mkdirSync(dirname(join(root, rel)), { recursive: true });
        writeFileSync(join(root, rel), text);
      };
      put('packages/kernel/src/index.ts', "export * from './a/index.js';\n");
      put('packages/kernel/src/a/index.ts', "import pc from 'polygon-clipping';\nexport const x = pc;\n");
      put('packages/model/src/index.ts', "export * from '@plat/kernel';\nexport { y } from './b.js';\n");
      put('packages/model/src/b.ts', "export const y = await import('@plat/testkit');\n");
      put('packages/testkit/src/index.ts', "import factory from 'clipper2-wasm';\nexport const z = factory;\n");
      const { files, bare } = reach('model', root);
      expect([...bare].sort()).toEqual(['@plat/kernel', '@plat/testkit', 'clipper2-wasm', 'polygon-clipping']);
      expect([...files].map((f) => relative(root, f)).sort()).toEqual([
        'packages/kernel/src/a/index.ts',
        'packages/kernel/src/index.ts',
        'packages/model/src/b.ts',
        'packages/model/src/index.ts',
        'packages/testkit/src/index.ts',
      ]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it.each(SHIPPED.map((p) => [p]))('@plat/%s reaches no oracle, no test-kit file and no @plat/testkit', (pkg) => {
    const { files, bare } = reach(pkg);
    expect(files.size).toBeGreaterThan(0);
    for (const o of ORACLES) expect([...bare].filter((s) => s === o || s.startsWith(`${o}/`))).toEqual([]);
    expect([...bare].filter((s) => s.startsWith('@plat/testkit'))).toEqual([]);
    const intoTestkit = [...files].filter((f) => relative(PLAT, f).startsWith('packages/testkit/'));
    expect(intoTestkit).toEqual([]);
  });

  it.each(SHIPPED.map((p) => [p]))('the @plat/%s manifest lists neither oracle nor the test kit', (pkg) => {
    const m = JSON.parse(readFileSync(join(PLAT, 'packages', pkg, 'package.json'), 'utf8')) as Record<string, Record<string, string> | undefined>;
    const deps = { ...m.dependencies, ...m.devDependencies, ...m.peerDependencies, ...m.optionalDependencies };
    for (const name of [...ORACLES, '@plat/testkit']) expect(Object.hasOwn(deps, name), `${pkg} → ${name}`).toBe(false);
  });

  it('the test kit holds the oracles as dev dependencies, imported by the two adapter files alone', () => {
    const m = JSON.parse(readFileSync(join(PLAT, 'packages', 'testkit', 'package.json'), 'utf8')) as Record<string, Record<string, string> | undefined>;
    expect(m.devDependencies?.['clipper2-wasm']).toBe('0.4.0');
    expect(m.devDependencies?.['polygon-clipping']).toBe('0.15.7');
    expect(m.dependencies?.['clipper2-wasm']).toBeUndefined();
    expect(m.dependencies?.['polygon-clipping']).toBeUndefined();
    const importers = tsFiles(join(PLAT, 'packages', 'testkit', 'src'))
      .filter((f) => !f.endsWith('.d.ts'))
      .filter((f) => specifiers(readFileSync(f, 'utf8')).some((s) => ORACLES.includes(s)))
      .map((f) => relative(PLAT, f))
      .sort();
    expect(importers).toEqual(['packages/testkit/src/oracles/clipper2.ts', 'packages/testkit/src/oracles/polygon-clipping.ts']);
  });
});
