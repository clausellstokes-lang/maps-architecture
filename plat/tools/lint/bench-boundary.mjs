// The whole-tree check `bench-boundary` (C-0259 (4); run by `corepack pnpm lint`): kernel benchmarks stay separable
// from town benchmarks without moving a file (moving would break landed records). bench/manifest.json classifies every
// folder of bench/src and bench/test;
// a folder missing from it, listed twice, or listed but absent fails; a KERNEL folder whose files import (directly, or
// through bench-internal relative imports) @plat/layout, site, model or tables — by package name or by a relative path
// into packages/<town>/ — fails, naming file:line. `@plat/testkit` is allowed in a KERNEL folder (its fuzz, crosshost,
// constructive and oracles parts import only @plat/kernel); its barrel still loads metrics/parity (model, tables) at run
// time, which a `@plat/testkit/kernel` subpath export would end (owner-gated: a public-API addition).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { CODE_FILE, byCodeUnit, relPath } from './rules/shared.mjs';

/** The town packages a KERNEL bench may not reach: the boundary's notion, not the allowlist's MODEL_PACKAGES. */
export const TOWN = Object.freeze(['layout', 'site', 'model', 'tables']);
const SPEC = /(?:from\s*|import\s*\(\s*|import\s+)['"]([^'"]+)['"]/g;

/**
 * A bench code file's name: every code extension (CODE_FILE, C-0128), `.jsx` among them since the hardening round S1
 * (W-2 (d), queue row L15: a `.jsx` file under a KERNEL bench folder used to escape the walk).
 */
const BENCH_CODE = CODE_FILE;

/** The bench code files under a folder, absolute, in code-unit order. */
function walk(d) {
  return readdirSync(d).sort(byCodeUnit).flatMap((n) => {
    const p = join(d, n);
    return statSync(p).isDirectory() ? walk(p) : BENCH_CODE.test(n) ? [p] : [];
  });
}

function resolveRel(from, spec) {
  const base = resolve(dirname(from), spec.replace(/\?.*$/, ''));
  return [base, base.replace(/\.js$/, '.ts'), `${base}.ts`, join(base, 'index.ts')].find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}

/** The town packages a file reaches through bench-internal relative imports: [{ file, line, pkg }]. */
function townImports(root, file, seen = new Set()) {
  if (seen.has(file)) return [];
  seen.add(file);
  const out = [];
  const text = readFileSync(file, 'utf8');
  const rel = relPath(root, file);
  for (const m of text.matchAll(SPEC)) {
    const spec = m[1];
    const line = text.slice(0, m.index).split('\n').length;
    if (spec.startsWith('@plat/')) {
      const pkg = spec.split('/')[1];
      if (TOWN.includes(pkg)) out.push({ file: rel, line, pkg });
    } else if (spec.startsWith('.')) {
      const target = relative(root, resolve(dirname(file), spec)).split(sep).join('/');
      const parts = target.split('/');
      if (parts[0] === 'packages' && TOWN.includes(parts[1])) out.push({ file: rel, line, pkg: parts[1] });
      else if (parts[0] === 'bench') {
        const t = resolveRel(file, spec);
        if (t) out.push(...townImports(root, t, seen));
      }
    }
  }
  return out;
}

export function checkBenchBoundary(root, manifest = JSON.parse(readFileSync(join(root, 'bench', 'manifest.json'), 'utf8'))) {
  const problems = [];
  const classOf = new Map();
  for (const cls of ['kernel', 'town', 'infra']) {
    for (const d of manifest[cls] ?? []) {
      if (classOf.has(d)) problems.push(`bench/manifest.json: ${d} is listed as ${classOf.get(d)} and ${cls}`);
      classOf.set(d, cls);
      if (!existsSync(join(root, 'bench', d))) problems.push(`bench/manifest.json: ${d} is listed but absent`);
    }
  }
  for (const area of ['src', 'test']) {
    for (const n of readdirSync(join(root, 'bench', area)).sort(byCodeUnit)) {
      const d = `${area}/${n}`;
      if (!statSync(join(root, 'bench', d)).isDirectory()) continue;
      if (!classOf.has(d)) problems.push(`bench/${d}: not classified in bench/manifest.json (kernel | town | infra)`);
      if (classOf.get(d) !== 'kernel') continue;
      for (const f of walk(join(root, 'bench', d))) {
        for (const hit of townImports(root, f)) problems.push(`${hit.file}:${hit.line}: a KERNEL bench (bench/${d}) reaches @plat/${hit.pkg}`);
      }
    }
  }
  return { ok: problems.length === 0, problems };
}

export const check = {
  name: 'bench-boundary',
  run(root) {
    return checkBenchBoundary(resolve(root));
  },
};
