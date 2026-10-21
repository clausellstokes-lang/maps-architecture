#!/usr/bin/env node
// The vendored scan (§6.5 (4); §17.4's pins; C-0010, C-0011): every third-party library vendored in plat/vendor/ passes
// the same allowlist scan as model code, and its audit record — library, version, scan result, each exception with its
// patch or wrapper — is kept in @plat/kernel (packages/kernel/vendor-audit.json).
//   node tools/lint/vendor-scan.mjs            print the census report; exit 1 when the scan or the record fails
//   node tools/lint/vendor-scan.mjs --write    rewrite the audit record from the scan (after a reviewed change)
// The scan reads the vendored bytes that run: every code file of vendor/<name>@<version>/ (.js, .mjs, .cjs, .ts, .mts
// and .cts sources; declarations, source maps and texts are not code), and the check confirms that each library's
// node_modules links resolve to that folder. Per file it takes the Math census (every member, allowed or not) and runs
// the determinism rules (rules/index.mjs's VENDOR_RULES: the allowlist, `**`, the clock / randomness / host / locale
// reads, comparator-less sorts, key enumeration). A finding fails the library unless it is a reviewed exception below,
// pinned to the file's sha256, line and rule (C-0126 (4)), so any byte change re-opens it. A patch (vendor/patches/) is
// recorded as the library's exception with its spec, its choices row and the adapter that wraps the library.
// `corepack pnpm lint` runs this as the whole-tree check `vendor-scan`: it fails on a failing library, and on an audit
// record that differs from the scan (a stale record: re-run with --write and review the diff).
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, realpathSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Linter } from 'eslint';
import { stableJson } from '../vendor/common.mjs';
import { adapterPath, adoptionTable } from './rules/dependency-direction.mjs';
import { VENDOR_RULE_NAMES, VENDOR_RULES, rules } from './rules/index.mjs';
import {
  DECLARATION_FILE,
  MATH_ALLOWLIST,
  PLAT_ROOT,
  byCodeUnit,
  globalAccesses,
  staticMemberName,
  printReport,
  vendoredLibraries,
} from './rules/shared.mjs';
import { languageOptionsFor } from './standalone.mjs';

export const AUDIT_FILE = 'packages/kernel/vendor-audit.json';
/** The extensions the scan reads (C-0126 (1)): CODE_EXTENSIONS without `.tsx` and `.jsx`, which it does not scan. */
const SCANNED_EXTENSIONS = Object.freeze(['js', 'mjs', 'cjs', 'ts', 'mts', 'cts']);
const SCANNED_CODE = new RegExp(`\\.(${SCANNED_EXTENSIONS.join('|')})$`);
const SCANNED_GLOB = `**/*.{${SCANNED_EXTENSIONS.join(',')}}`;

/**
 * Reviewed exceptions: entries { library, file, sha256, line, rule, choice, what, status }, each pinning one finding
 * to the sha256 of the file it was judged on, its line and its rule, so any byte change re-opens it (C-0126 (4)). None
 * is open. flatbush 4.6.2's power is not one: the patch vendor/patches/flatbush@4.6.2.json replaces it by exact
 * repeated multiplication, and the audit records it as flatbush's patch exception (C-0152).
 */
export const REVIEWED = Object.freeze([]);

/**
 * The sha256 of a file's text re-encoded as UTF-8: the form of the audit's file hashes and of REVIEWED's pins, which
 * differs from the raw bytes' hash only for a file that is not valid UTF-8.
 */
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

/** The code files of a library folder, relative POSIX paths, sorted (node_modules links skipped). */
export function codeFilesOf(dir) {
  const out = [];
  const walk = (d, prefix) => {
    for (const name of readdirSync(d).sort(byCodeUnit)) {
      if (name === 'node_modules') continue;
      const abs = join(d, name);
      const rel = prefix ? `${prefix}/${name}` : name;
      if (statSync(abs).isDirectory()) walk(abs, rel);
      else if (SCANNED_CODE.test(name) && !DECLARATION_FILE.test(name)) out.push(rel);
    }
  };
  walk(dir, '');
  return out;
}

/**
 * Is a plat/-relative path one of the files this scan reads — a code file of a vendored library's folder
 * (`vendor/<name>@<version>/…`, outside its node_modules, not a declaration)? The whole-tree check model-coverage leaves
 * these to the scan and refuses every other model-code file the tree lint does not reach (C-0130).
 */
export function isScannedFile(root, rel) {
  const parts = rel.split('/');
  if (parts[0] !== 'vendor' || parts.length < 3 || parts.includes('node_modules')) return false;
  if (!vendoredLibraries(root).some((l) => l.folder === `vendor/${parts[1]}`)) return false;
  const name = parts[parts.length - 1];
  return SCANNED_CODE.test(name) && !DECLARATION_FILE.test(name);
}

/** A plugin whose one rule records the Math census of a file into `sink` (member → count). */
function censusPlugin(sink) {
  return {
    rules: {
      math: {
        meta: { type: 'problem', schema: [] },
        create(context) {
          return {
            'Program:exit'() {
              for (const { node } of globalAccesses(context.sourceCode, new Set(['Math']))) {
                const parent = node.parent;
                const member = parent && parent.type === 'MemberExpression' && parent.object === node ? staticMemberName(parent) ?? '[computed]' : '[value]';
                sink[member] = (sink[member] ?? 0) + 1;
              }
            },
          };
        },
      },
    },
  };
}

/**
 * Lints one file's code with the vendored rule set and the census (standalone.mjs's language options: TypeScript
 * sources through typescript-eslint); a JavaScript file that does not parse as a module is scanned as a classic script.
 */
function scanFile(linter, abs, rel) {
  const code = readFileSync(abs, 'utf8');
  const math = {};
  const ts = /\.(ts|mts|cts)$/.test(rel);
  const base = {
    files: [SCANNED_GLOB],
    plugins: { plat: { rules }, census: censusPlugin(math) },
    rules: { ...VENDOR_RULES, 'census/math': 'error' },
  };
  const attempt = (languageOptions) => {
    for (const k of Object.keys(math)) delete math[k];
    return linter.verify(code, [{ ...base, languageOptions }], { filename: abs });
  };
  let messages = attempt(languageOptionsFor(rel));
  if (!ts && messages.some((m) => m.fatal)) messages = attempt(languageOptionsFor(rel, { script: true }));
  const fatal = messages.find((m) => m.fatal);
  const findings = messages
    .filter((m) => !m.fatal && m.ruleId !== 'census/math')
    .map((m) => ({ line: m.line, column: m.column, rule: m.ruleId, message: m.message }));
  const sorted = Object.fromEntries(Object.keys(math).sort(byCodeUnit).map((k) => [k, math[k]]));
  return { path: rel, sha256: sha256(Buffer.from(code, 'utf8')), math: sorted, findings, fatal: fatal ? fatal.message : null };
}

/**
 * Scans one library folder. `key` is `<name>@<version>` (the reviewed exceptions are matched on it).
 * Returns { files, math, findings, reviewed, result } — result 'pass', 'pass (reviewed exceptions)' or 'fail'.
 */
export function scanLibrary(dir, key = null, reviewed = REVIEWED) {
  const linter = new Linter({ cwd: dir });
  const files = codeFilesOf(dir).map((rel) => scanFile(linter, join(dir, ...rel.split('/')), rel));
  const math = {};
  const findings = [];
  const matched = [];
  for (const f of files) {
    for (const [k, n] of Object.entries(f.math)) math[k] = (math[k] ?? 0) + n;
    if (f.fatal) findings.push({ file: f.path, line: 0, column: 0, rule: 'parse', message: f.fatal });
    for (const x of f.findings) {
      const r = reviewed.find((e) => e.library === key && e.file === f.path && e.sha256 === f.sha256 && e.line === x.line && e.rule === x.rule);
      if (r) matched.push({ ...r, column: x.column, message: x.message });
      else findings.push({ file: f.path, ...x });
    }
  }
  const census = Object.fromEntries(Object.keys(math).sort(byCodeUnit).map((k) => [k, math[k]]));
  const result = findings.length > 0 ? 'fail' : matched.length > 0 ? 'pass (reviewed exceptions)' : 'pass';
  return { files, math: census, findings, reviewed: matched, result };
}

/** Which of the census's members lie outside the allowlist. */
export function outsideAllowlist(math) {
  const allowed = new Set(MATH_ALLOWLIST);
  return Object.keys(math).filter((m) => !allowed.has(m)).sort(byCodeUnit);
}

/** The node_modules links (plat/-relative) through which a vendored library is loaded, each resolved to its folder. */
function runsFrom(root, lib, folder, libs, adoption) {
  const out = [];
  const dependents = [
    ...adoption.get(lib.name).map((p) => `packages/${p}`),
    ...libs.filter((o) => {
      const m = JSON.parse(readFileSync(join(root, o.folder, 'package.json'), 'utf8'));
      return Object.hasOwn(m.dependencies ?? {}, lib.name);
    }).map((o) => o.folder),
  ];
  const real = realpathSync(folder);
  for (const d of dependents) {
    const link = join(root, d, 'node_modules', lib.name);
    if (!existsSync(link)) {
      out.push({ link: `${d}/node_modules/${lib.name}`, resolves: null });
      continue;
    }
    const r = realpathSync(link);
    out.push({ link: `${d}/node_modules/${lib.name}`, resolves: r === real ? lib.folder : r });
  }
  return out;
}

/** The audit record of every vendored library under root, as the scan finds it now. */
export function buildAudit(root = PLAT_ROOT) {
  const lock = JSON.parse(readFileSync(join(root, 'vendor', 'vendor.lock.json'), 'utf8')).libraries ?? {};
  const libs = vendoredLibraries(root);
  const adoption = adoptionTable(root);
  const libraries = libs.map((lib) => {
    const key = `${lib.name}@${lib.version}`;
    const folder = join(root, lib.folder);
    const scan = scanLibrary(folder, key);
    const owners = adoption.get(lib.name) ?? [];
    const adapter = owners.length === 1 ? adapterPath(owners[0], lib.name) : null;
    const entry = lock[key] ?? {};
    const exceptions = [];
    if (entry.patch) {
      const spec = JSON.parse(readFileSync(join(root, 'vendor', entry.patch), 'utf8'));
      exceptions.push({
        kind: 'patch',
        spec: `vendor/${entry.patch}`,
        choice: spec.choice ?? null,
        what: spec.reason ?? null,
        files: [...new Set((spec.edits ?? []).map((e) => e.file))].sort(byCodeUnit),
        wrapper: adapter,
      });
    }
    for (const r of scan.reviewed) {
      exceptions.push({ kind: 'reviewed', file: r.file, line: r.line, column: r.column, rule: r.rule, choice: r.choice, what: r.what, status: r.status, wrapper: adapter });
    }
    return {
      library: lib.name,
      version: lib.version,
      folder: lib.folder,
      integrity: entry.integrity ?? null,
      licence: entry.licence ?? null,
      adapter: adapter ?? (owners.length === 0 ? 'none: no shipped package imports it (reached only through another vendored library)' : `ambiguous: ${owners.join(', ')}`),
      runsFrom: runsFrom(root, lib, folder, libs, adoption),
      result: scan.result,
      math: scan.math,
      outsideAllowlist: outsideAllowlist(scan.math),
      files: scan.files.map((f) => ({ path: f.path, sha256: f.sha256, math: f.math })),
      exceptions,
      findings: scan.findings,
    };
  });
  return {
    $comment: '§6.5 (4): the vendored scan\'s audit record, generated by tools/lint/vendor-scan.mjs --write and checked by `corepack pnpm lint` (vendor-scan). Edit the scan or the patches, never this file.',
    scanner: 'tools/lint/vendor-scan.mjs',
    allowlist: [...MATH_ALLOWLIST],
    rules: VENDOR_RULE_NAMES.map((n) => `plat/${n}`),
    libraries,
  };
}

/** The whole-tree check: { ok, problems, report }. */
export function checkVendorScan(root = PLAT_ROOT) {
  const problems = [];
  const audit = buildAudit(root);
  const report = [];
  for (const lib of audit.libraries) {
    const members = Object.entries(lib.math).map(([m, n]) => `${m}×${n}`).join(' ') || 'none';
    report.push(`${lib.library}@${lib.version}: ${lib.result} — Math ${members}; ${lib.files.length} code files; exceptions ${lib.exceptions.map((e) => (e.kind === 'patch' ? `patch ${e.spec}` : `reviewed ${e.file}:${e.line} ${e.rule}`)).join(', ') || 'none'}`);
    if (lib.result === 'fail') {
      for (const f of lib.findings) problems.push(`${lib.folder}/${f.file}:${f.line}:${f.column} ${f.rule}: ${f.message}`);
    }
    for (const r of lib.runsFrom) {
      if (r.resolves !== lib.folder) problems.push(`${r.link}: does not resolve to ${lib.folder} (resolves to ${r.resolves ?? 'nothing'}) — the scanned bytes are not the bytes that run`);
    }
  }
  const text = stableJson(audit);
  const path = join(root, ...AUDIT_FILE.split('/'));
  const committed = existsSync(path) ? readFileSync(path, 'utf8') : null;
  if (committed === null) problems.push(`${AUDIT_FILE}: missing — run node tools/lint/vendor-scan.mjs --write`);
  else if (committed !== text) problems.push(`${AUDIT_FILE}: differs from the scan — run node tools/lint/vendor-scan.mjs --write and review the diff (§6.5 (4))`);
  return { ok: problems.length === 0, problems, report, audit, text };
}

export const check = {
  name: 'vendor-scan',
  run(root) {
    const r = checkVendorScan(resolve(root));
    printReport('vendor-scan', r.report);
    return { ok: r.ok, problems: r.problems };
  },
};

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const r = checkVendorScan();
  for (const line of r.report) process.stdout.write(`${line}\n`);
  if (process.argv.includes('--write')) {
    writeFileSync(join(PLAT_ROOT, ...AUDIT_FILE.split('/')), r.text);
    process.stdout.write(`vendor-scan: ${AUDIT_FILE} written\n`);
    const failing = r.audit.libraries.filter((l) => l.result === 'fail');
    if (failing.length > 0) process.exit(1);
  } else {
    for (const p of r.problems) process.stderr.write(`vendor-scan FAIL ${p}\n`);
    if (!r.ok) process.exit(1);
  }
}
