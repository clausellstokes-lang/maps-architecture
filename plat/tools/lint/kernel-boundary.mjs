// The whole-tree check `kernel-boundary` (the kernel reuse round, J223 / J224; installed by build/M0-s-01-fix-s1,
// whose choices row records it): @plat/kernel stays a town-free geometry library, reusable on its own (owner
// directive: "keep a lint or test that forbids town concepts inside @plat/kernel"). Run by `corepack pnpm lint`.
// Two halves:
//   (i)  imports — @plat/kernel imports no other @plat package. plat/dependency-direction already refuses it per file
//        (MAY_IMPORT.kernel, fixture fail-kernel-imports-up.ts); this check pins that table entry and the kernel's
//        manifest, so loosening either (a one-word edit) turns the lint red instead of passing silently.
//   (ii) vocabulary — no town noun in an identifier, a string literal (template parts included) or a JSON data value
//        under packages/kernel/src, beyond kernel-boundary.allow.json. Comments are exempt (prose may cite the design).
//        Each allowlist row names a file, a noun, a token kind, a reason and the class the audit gave it, and caps the
//        hit count there (`max`): a row's count may shrink (the check reports the slack, so it is tightened) but never
//        grow. A new file, a new noun, or one more use in an allowed file is a failure that names the line. The
//        allowlist MAY ONLY SHRINK (its header says so): a kernel change that adds a town noun needs a new row with an
//        owner-visible reason (a choices.md row), reviewed as a boundary change; the b-debt rows are KI-8's deferred
//        registries and local leaks, recorded, not refactored at M0.
// A word is matched whole after splitting identifiers at camelCase, digits and `_` (`readKerb` → read, kerb), so
// `plotline` is not `plot` but `plot_line`, `plotLine` and `PLOT_LINE` are.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import tseslint from 'typescript-eslint';
import { MAY_IMPORT } from './rules/dependency-direction.mjs';

export const KERNEL_SRC = 'packages/kernel/src';
export const ALLOW = 'tools/lint/kernel-boundary.allow.json';

/** The town nouns (owner's list). A noun's plural (`s`, `es`; `cities`) counts as the noun. */
export const TOWN_NOUNS = Object.freeze([
  'wall', 'gate', 'street', 'road', 'way', 'river', 'water', 'district', 'plot', 'building', 'block', 'kerb', 'corridor',
  'band', 'ward', 'enceinte', 'settlement', 'town', 'city', 'market', 'house', 'lane', 'field', 'terrain', 'quarter', 'tile',
]);
const FORMS = new Map();
for (const n of TOWN_NOUNS) for (const f of [n, `${n}s`, `${n}es`]) FORMS.set(f, n);
FORMS.set('cities', 'city');

/** The lowercase words of a token: camelCase, acronym runs, digits and every non-letter split. */
export function wordsOf(text) {
  return text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter(Boolean);
}

/** The town nouns a token names, once per occurrence. */
export function nounsIn(text) {
  const out = [];
  for (const w of wordsOf(text)) if (FORMS.has(w)) out.push(FORMS.get(w));
  return out;
}

/** Hits in one source text: [{ line, kind: 'ident'|'string'|'data', noun, text }]. Comments are never read. */
export function scanText(rel, text) {
  const hits = [];
  if (rel.endsWith('.json')) {
    // Every key and string value of a data table, with the line it sits on.
    // A `"$comment": "…"` line is prose, like a code comment, and is skipped whole.
    text.split('\n').forEach((l, i) => {
      if (/^\s*"\$comment"\s*:/.test(l)) return;
      for (const m of l.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
        for (const noun of nounsIn(m[1])) hits.push({ line: i + 1, kind: 'data', noun, text: m[1] });
      }
    });
    return hits;
  }
  const { ast } = tseslint.parser.parseForESLint(text, { range: true, loc: true, tokens: true, comment: true, filePath: rel });
  for (const t of ast.tokens) {
    const kind = t.type === 'Identifier' || t.type === 'PrivateIdentifier' || t.type === 'JSXIdentifier'
      ? 'ident'
      : t.type === 'String' || t.type === 'Template' || t.type === 'JSXText'
        ? 'string'
        : null;
    if (kind === null) continue;
    for (const noun of nounsIn(t.value)) hits.push({ line: t.loc.start.line, kind, noun, text: t.value.slice(0, 80) });
  }
  return hits;
}

/** The scanned files of the kernel's sources, plat/-relative with `/`, in code-unit order. */
export function kernelFiles(root) {
  const base = join(root, ...KERNEL_SRC.split('/'));
  const out = [];
  const walk = (d) => {
    for (const n of readdirSync(d).sort()) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(ts|tsx|mts|cts|js|jsx|mjs|cjs|json)$/.test(n)) out.push(relative(root, p).split(sep).join('/'));
    }
  };
  if (existsSync(base)) walk(base);
  return out;
}

/** The imports half: the dependency table and the kernel's manifest keep the kernel at the bottom of the graph. */
export function importProblems(root, mayImport = MAY_IMPORT) {
  const out = [];
  const allowed = mayImport.kernel ?? [];
  if (allowed.length !== 1 || allowed[0] !== 'kernel') {
    out.push(`tools/lint/rules/dependency-direction.mjs: MAY_IMPORT.kernel is [${allowed.join(', ')}]; it must be exactly [kernel] (the kernel imports no town package)`);
  }
  const manifest = join(root, 'packages', 'kernel', 'package.json');
  if (existsSync(manifest)) {
    const m = JSON.parse(readFileSync(manifest, 'utf8'));
    for (const field of ['dependencies', 'peerDependencies', 'optionalDependencies', 'devDependencies']) {
      for (const dep of Object.keys(m[field] ?? {})) {
        if (dep.startsWith('@plat/')) out.push(`packages/kernel/package.json: ${field} names ${dep} (the kernel depends on no @plat package)`);
      }
    }
  }
  return out;
}

/**
 * The vocabulary half. `extra` are in-memory files ([{ rel, text }]) scanned as if they were in the tree — the
 * self-test's planted file, so no file is ever written into a package folder.
 * @returns {{ problems: string[], slack: string[], hits: object[] }}
 */
export function vocabularyProblems(root, allow, extra = []) {
  const files = kernelFiles(root).map((rel) => ({ rel, text: readFileSync(join(root, ...rel.split('/')), 'utf8') }));
  const byRel = new Map(files.map((f) => [f.rel, f]));
  for (const e of extra) if (e.rel.startsWith(`${KERNEL_SRC}/`)) byRel.set(e.rel, e); // an extra file replaces its namesake
  const all = [...byRel.values()];
  const rows = new Map(allow.rows.map((r) => [`${r.file}\u0000${r.kind}\u0000${r.noun}`, r]));
  const problems = [];
  const slack = [];
  const hitsAll = [];
  const seen = new Set();
  for (const { rel, text } of all) {
    const file = rel.slice(KERNEL_SRC.length + 1);
    const groups = new Map();
    for (const h of scanText(rel, text)) {
      hitsAll.push({ file, ...h });
      const k = `${file}\u0000${h.kind}\u0000${h.noun}`;
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(h);
    }
    for (const [k, hs] of groups) {
      seen.add(k);
      const row = rows.get(k);
      const cap = row ? row.max : 0;
      if (hs.length > cap) {
        const where = row ? `${hs.length} uses, the allowlist caps ${cap}` : 'not in the allowlist';
        const lines = [...new Set(hs.map((h) => h.line))].join(', ');
        problems.push(`${rel}:${lines}: town noun "${hs[0].noun}" in ${hs[0].kind === 'data' ? 'data' : `a${hs[0].kind === 'ident' ? 'n identifier' : ' string'}`} (${where}; e.g. ${JSON.stringify(hs[0].text)}) — @plat/kernel names geometry, not towns; rename it or add a reasoned row to ${ALLOW}`);
      } else if (hs.length < cap) {
        slack.push(`${ALLOW}: ${file} ${hs[0].kind} "${hs[0].noun}" now has ${hs.length} uses, the row caps ${cap}: lower max`);
      }
    }
  }
  for (const [k, r] of rows) {
    if (!seen.has(k)) slack.push(`${ALLOW}: the row ${r.file} ${r.kind} "${r.noun}" matches nothing: remove it`);
  }
  return { problems, slack, hits: hitsAll };
}

export function loadAllow(root) {
  const p = join(root, ...ALLOW.split('/'));
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, 'utf8'));
}

/** The check: both halves; slack in the allowlist fails too (a ratchet that has shrunk is tightened in the same change). */
export function checkKernelBoundary(root, { extra = [], allow = loadAllow(root) } = {}) {
  if (allow === null) return { ok: false, problems: [`${ALLOW}: missing`] };
  const v = vocabularyProblems(root, allow, extra);
  const problems = [...importProblems(root), ...v.problems, ...v.slack];
  return { ok: problems.length === 0, problems };
}

export const check = {
  name: 'kernel-boundary',
  run(root) {
    return checkKernelBoundary(resolve(root));
  },
};
