// The repository path rule (§17.1 (3); CLEAN-ROOM.md rule 4): no import specifier, fixture path, script path or
// build input in plat/ resolves outside plat/, symbolic links resolved. This module holds the resolver the ESLint rule
// `plat/repository-path` uses and the whole-tree check `repository-path` that `corepack pnpm lint` runs after ESLint:
//   (1) every symbolic link under plat/ — outside node_modules, and the links pnpm makes inside every workspace
//       member's node_modules — resolves inside plat/;
//   (2) every source file (every code extension, CODE_EXTENSIONS, declarations too — a build input like any other;
//       ESLint-ignored ones included, vendored ones included, build outputs not) passes the ESLint rule, run here
//       through ESLint's Linter so the check stands on its own: inline configuration is off there (no directive can
//       silence it), and only the rule's own reports and parse failures count — a source's directives for other rules
//       are the tree lint's (C-0128);
//   (3) the build inputs that are not source — every tsconfig*.json (extends, references, files, include, exclude, the
//       path-valued compilerOptions: rootDir, outDir, outFile, baseUrl, declarationDir, tsBuildInfoFile, typeRoots,
//       rootDirs and paths), every package.json (main, module, types, typings, browser, bin, exports, file: / link:
//       dependencies, the file paths its scripts name) and pnpm-workspace.yaml's package globs — and every `../` string
//       in a fixture JSON file resolve inside plat/. paths.test.mjs holds a failing case for each form (C-0130).
// A path is judged lexically first: one that leaves plat/ is refused without touching the file system there (the
// clean room's firewall is physical on this machine), and only a path inside plat/ is followed through its links.
// The lint's own red fixtures (tools/lint/fixtures/) are never built, run or resolved and are skipped (C-0127).
// `node tools/lint/paths.mjs` runs the whole-tree check alone: its problems on stderr, its counts on stdout.
import { existsSync, lstatSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { Linter } from 'eslint';
import { judgePath, judgeSpecifier, realOf, realRoot } from './resolve.mjs';
import repositoryPath from './rules/repository-path.mjs';
import { CODE_FILE, CODE_GLOB, PLAT_ROOT, TS_FILE, byCodeUnit, isInside, isMain, isPathSpecifier, relPath } from './rules/shared.mjs';
import { isDirectiveNote, languageOptionsFor } from './standalone.mjs';

export { judgePath, judgeSpecifier } from './resolve.mjs';
export { isDirectiveNote } from './standalone.mjs';

// ---------------------------------------------------------------------------------------------------------------
// the whole-tree check

const SKIP_DIRS = new Set(['node_modules', 'coverage', '.git']);

/** Folders skipped by the walk (plat/-relative): build outputs and the lint's own red fixtures. */
export function skippedFolder(rel) {
  return rel === 'tools/lint/fixtures' || /^(packages\/[^/]+|bench)\/dist$/.test(rel) || rel === 'docs/build/landed/snapshots';
}

/** Every file and symbolic link under root outside node_modules and the skipped folders, plat/-relative, sorted. */
export function walkTree(root) {
  const files = [];
  const links = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir).sort(byCodeUnit)) {
      const abs = join(dir, name);
      const rel = relPath(root, abs);
      const st = lstatSync(abs);
      if (st.isSymbolicLink()) links.push(rel);
      else if (st.isDirectory()) {
        if (!SKIP_DIRS.has(name) && !skippedFolder(rel)) walk(abs);
      } else if (st.isFile()) files.push(rel);
    }
  };
  walk(root);
  return { files, links };
}

/** The workspace members of a root: plat/ itself, packages/*, bench and vendor/* (the folders with a package.json). */
function members(root) {
  const out = [''];
  for (const parent of ['packages', 'vendor']) {
    const d = join(root, parent);
    if (!existsSync(d)) continue;
    for (const n of readdirSync(d).sort(byCodeUnit)) if (existsSync(join(d, n, 'package.json'))) out.push(`${parent}/${n}`);
  }
  if (existsSync(join(root, 'bench', 'package.json'))) out.push('bench');
  return out;
}

/** The links pnpm made in each member's node_modules: its packages (scoped ones too), .bin and .pnpm's package links. */
export function nodeModulesLinks(root) {
  const links = [];
  const entries = (dir) => (existsSync(dir) ? readdirSync(dir).sort(byCodeUnit) : []);
  const scan = (dir, depth) => {
    for (const n of entries(dir)) {
      const p = join(dir, n);
      const st = lstatSync(p);
      if (st.isSymbolicLink()) links.push(relPath(root, p));
      else if (st.isDirectory() && depth > 0 && (n.startsWith('@') || n === '.bin')) scan(p, depth - 1);
    }
  };
  for (const m of members(root)) {
    const nm = join(root, m, 'node_modules');
    scan(nm, 1);
    const pnpmDir = join(nm, '.pnpm');
    scan(join(pnpmDir, 'node_modules'), 1);
    for (const n of entries(pnpmDir)) {
      if (n === 'node_modules') continue;
      scan(join(pnpmDir, n, 'node_modules'), 1);
    }
  }
  return links;
}

/**
 * The repository-path rule over one file through ESLint's Linter: its problems as strings. Inline configuration is off
 * (`noInlineConfig`), so no directive in the file silences this check, and of the Linter's messages only the rule's
 * own reports and fatal parse errors count: the notes ESLint adds about the file's directives (each "has no effect"
 * here) are not path problems — a directive for another rule (C-0125 (6)'s vetted division) is the tree lint's to
 * judge, and the whole-tree check inline-directives judges which directives model code may carry (C-0128). Every
 * other message without a rule — `No matching configuration found for …`, when the file lies where the configuration
 * does not reach — is kept as a problem, so the check fails closed (C-0128 (5), C-0129 (2)). A JavaScript file that
 * does not parse as a module is re-verified once as a classic script (standalone.mjs).
 */
export function lintFile(linter, root, rel) {
  const abs = join(root, ...rel.split('/'));
  const code = readFileSync(abs, 'utf8');
  const ts = TS_FILE.test(rel);
  const config = [
    {
      files: [`**/*.${CODE_GLOB}`],
      languageOptions: languageOptionsFor(rel),
      linterOptions: { noInlineConfig: true, reportUnusedDisableDirectives: 'off' },
      plugins: { plat: { rules: { 'repository-path': repositoryPath } } },
      rules: { 'plat/repository-path': 'error' },
      settings: { plat: { root } },
    },
  ];
  let messages = linter.verify(code, config, { filename: abs });
  if (!ts && messages.some((m) => m.fatal)) {
    config[0].languageOptions = languageOptionsFor(rel, { script: true });
    messages = linter.verify(code, config, { filename: abs });
  }
  return messages
    .filter((m) => m.fatal || m.ruleId === 'plat/repository-path' || (m.ruleId === null && !isDirectiveNote(m)))
    .map((m) => `${rel}:${m.line}: ${m.fatal ? `cannot parse (${m.message})` : m.message}`);
}

/** Path-valued strings of a tsconfig file, with where each sits. */
function tsconfigPaths(json) {
  const out = [];
  const ext = Array.isArray(json.extends) ? json.extends : json.extends ? [json.extends] : [];
  for (const e of ext) out.push({ where: 'extends', value: e, module: true });
  for (const r of json.references ?? []) if (r && typeof r.path === 'string') out.push({ where: 'references', value: r.path });
  for (const key of ['files', 'include', 'exclude']) {
    for (const v of json[key] ?? []) if (typeof v === 'string') out.push({ where: key, value: v, glob: true });
  }
  const co = json.compilerOptions ?? {};
  for (const key of ['rootDir', 'outDir', 'outFile', 'baseUrl', 'declarationDir', 'tsBuildInfoFile']) {
    if (typeof co[key] === 'string') out.push({ where: `compilerOptions.${key}`, value: co[key] });
  }
  for (const key of ['typeRoots', 'rootDirs']) {
    for (const v of co[key] ?? []) if (typeof v === 'string') out.push({ where: `compilerOptions.${key}`, value: v });
  }
  // `paths` maps module names to locations, relative to `baseUrl` when it is set (else to the tsconfig's folder).
  const pathsBase = typeof co.baseUrl === 'string' ? co.baseUrl : '.';
  for (const [k, targets] of Object.entries(co.paths ?? {})) {
    for (const v of Array.isArray(targets) ? targets : []) {
      if (typeof v === 'string') out.push({ where: `compilerOptions.paths.${k}`, value: v, glob: true, base: pathsBase });
    }
  }
  return out;
}

/** The literal folder part of a glob (`src/**\/*` → `src`; `../x/*.ts` → `../x`). */
function globBase(v) {
  const parts = v.split('/');
  const keep = [];
  for (const p of parts) {
    if (/[*?{[]/.test(p)) break;
    keep.push(p);
  }
  return keep.join('/') || '.';
}

/** Path-valued strings of a package.json. */
function manifestPaths(json) {
  const out = [];
  for (const key of ['main', 'module', 'types', 'typings', 'browser']) if (typeof json[key] === 'string') out.push({ where: key, value: json[key] });
  // `browser` as a map: each replacement module (a string; `false` drops one) is a path the bundler reads.
  if (json.browser && typeof json.browser === 'object') {
    for (const [k, v] of Object.entries(json.browser)) if (typeof v === 'string' && isPathSpecifier(v)) out.push({ where: `browser.${k}`, value: v });
  }
  if (typeof json.bin === 'string') out.push({ where: 'bin', value: json.bin });
  else for (const [k, v] of Object.entries(json.bin ?? {})) if (typeof v === 'string') out.push({ where: `bin.${k}`, value: v });
  const leaves = (v, where) => {
    if (typeof v === 'string') out.push({ where, value: v, glob: v.includes('*') });
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) leaves(x, `${where}.${k}`);
  };
  leaves(json.exports, 'exports');
  for (const field of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
    for (const [k, v] of Object.entries(json[field] ?? {})) {
      const m = /^(file|link):(.*)$/.exec(String(v));
      if (m) out.push({ where: `${field}.${k}`, value: m[2] });
    }
  }
  for (const [k, cmd] of Object.entries(json.scripts ?? {})) {
    for (const raw of String(cmd).split(/\s+/)) {
      const tok = raw.includes('=') ? raw.slice(raw.indexOf('=') + 1) : raw;
      if (tok === '' || tok.startsWith('-') || /^[a-z][a-z0-9+.-]*:/i.test(tok)) continue;
      if (tok.includes('/') || /\.(m?[jt]s|c[jt]s|json)$/.test(tok)) out.push({ where: `scripts.${k}`, value: tok.replace(/^['"]|['"]$/g, ''), glob: tok.includes('*') });
    }
  }
  return out;
}

/** pnpm-workspace.yaml's `packages` entries (the only path-valued key it holds). */
function workspacePaths(text) {
  const out = [];
  let inPackages = false;
  for (const line of text.split('\n')) {
    if (/^packages:\s*$/.test(line)) inPackages = true;
    else if (/^\S/.test(line)) inPackages = false;
    else if (inPackages) {
      const m = /^\s*-\s*["']?([^"'#]+?)["']?\s*(#.*)?$/.exec(line);
      if (m) out.push({ where: 'packages', value: m[1].replace(/^!/, ''), glob: true });
    }
  }
  return out;
}

/** Every `../` string in a JSON value, with its JSON path. */
function upStrings(v, where = '$', out = []) {
  if (typeof v === 'string') {
    if (v.startsWith('../') || v === '..') out.push({ where, value: v });
  } else if (Array.isArray(v)) v.forEach((x, i) => upStrings(x, `${where}[${i}]`, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) upStrings(x, `${where}.${k}`, out);
  return out;
}

/**
 * The whole-tree check. Returns { ok, problems, counts }.
 * @param {string} root plat/ (a fixture tree in the tests)
 */
export function checkRepositoryPaths(root = PLAT_ROOT) {
  const problems = [];
  const describe = (j) => (j.reason === 'outside' ? 'resolves outside plat/' : j.reason === 'link' ? `resolves outside plat/ through a link (to ${j.target})` : 'is found nowhere inside plat/');
  const { files, links } = walkTree(root);
  const nmLinks = nodeModulesLinks(root);
  for (const rel of [...links, ...nmLinks]) {
    const abs = join(root, ...rel.split('/'));
    const real = realOf(abs);
    if (!isInside(realRoot(root), real)) problems.push(`${rel}: symbolic link resolves outside plat/ (to ${real})`);
  }
  const linter = new Linter({ cwd: root });
  let sources = 0;
  let inputs = 0;
  for (const rel of files) {
    const abs = join(root, ...rel.split('/'));
    const base = rel.split('/').pop();
    if (CODE_FILE.test(rel)) {
      sources += 1;
      problems.push(...lintFile(linter, root, rel));
      continue;
    }
    let entries = null;
    if (/^tsconfig.*\.json$/.test(base)) entries = tsconfigPaths(JSON.parse(readFileSync(abs, 'utf8')));
    else if (base === 'package.json') entries = manifestPaths(JSON.parse(readFileSync(abs, 'utf8')));
    else if (base === 'pnpm-workspace.yaml') entries = workspacePaths(readFileSync(abs, 'utf8'));
    else if (base.endsWith('.json') && rel.split('/').includes('fixtures')) entries = upStrings(JSON.parse(readFileSync(abs, 'utf8')));
    if (entries === null) continue;
    inputs += 1;
    for (const e of entries) {
      const value = e.glob ? globBase(e.value) : e.value;
      const j = e.module && !isPathSpecifier(value) ? judgeSpecifier(root, abs, value) : judgePath(root, resolve(dirname(abs), e.base ?? '.', value));
      if (!j.ok) problems.push(`${rel}: ${e.where} ${JSON.stringify(e.value)} ${describe(j)}`);
    }
  }
  return {
    ok: problems.length === 0,
    problems,
    counts: { files: files.length, sources, inputs, links: links.length, nodeModulesLinks: nmLinks.length },
  };
}

export const check = {
  name: 'repository-path',
  run(root) {
    return checkRepositoryPaths(resolve(root));
  },
};
export default check;

if (isMain(import.meta.url)) {
  const r = checkRepositoryPaths();
  for (const p of r.problems) process.stderr.write(`repository-path: ${p}\n`);
  process.stdout.write(`repository-path ${r.ok ? 'ok' : 'FAIL'} — ${JSON.stringify(r.counts)}\n`);
  if (!r.ok) process.exit(1);
}
