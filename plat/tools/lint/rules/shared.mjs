// Shared helpers of the PLAT determinism lint (M0-d-07). Node built-ins only; no rule state lives here.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { builtinModules } from 'node:module';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/** plat/, the workspace root (this file is plat/tools/lint/rules/shared.mjs). */
export const PLAT_ROOT = resolve(fileURLToPath(new URL('../../../', import.meta.url)));

/** §6.5 (3)'s allowlist: the only `Math` members model code may name. */
export const MATH_ALLOWLIST = Object.freeze([
  'abs', 'floor', 'ceil', 'round', 'trunc', 'sign', 'min', 'max', 'sqrt', 'imul', 'clz32', 'fround',
]);

/** The model packages of M0, in §14's dependency order (`kernel ← model ← tables ← site ← layout`). */
export const MODEL_PACKAGES = Object.freeze(['kernel', 'model', 'tables', 'site', 'layout']);

/**
 * Every extension a code file can carry — TypeScript's (`tsc` compiles `.ts`, `.tsx`, `.mts` and `.cts` from a
 * package's `src/**\/*`) and JavaScript's (bundled and run though not type-checked) — so no rule's scope narrows to
 * `.ts` (C-0128). Declarations (`.d.ts`, `.d.mts`, `.d.cts`) carry no code that runs.
 */
export const CODE_EXTENSIONS = Object.freeze(['ts', 'tsx', 'mts', 'cts', 'js', 'jsx', 'mjs', 'cjs']);
/** The extensions as one glob part: `**\/*.${CODE_GLOB}`. */
export const CODE_GLOB = `{${CODE_EXTENSIONS.join(',')}}`;
/** A code file's name. */
export const CODE_FILE = new RegExp(`\\.(${CODE_EXTENSIONS.join('|')})$`);
/** A declaration file's name. */
export const DECLARATION_FILE = /\.d\.(ts|mts|cts)$/;
/** A TypeScript-family file's name (parsed with typescript-eslint). */
export const TS_FILE = /\.(ts|tsx|mts|cts)$/;

/** The global objects through which a global can also be reached (`globalThis.Date`, `window.setTimeout`). */
export const GLOBAL_OBJECTS = new Set(['globalThis', 'window', 'self', 'global']);

/** The plat/ root a rule judges paths against: `settings.plat.root` (tests point it at a fixture tree) or PLAT_ROOT. */
export function platRootOf(context) {
  const r = context.settings?.plat?.root;
  return typeof r === 'string' && r.length > 0 ? resolve(r) : PLAT_ROOT;
}

/** A path relative to root in POSIX form, or null when it lies outside root (lexically). */
export function relPath(root, abs) {
  const r = relative(root, abs);
  if (r === '') return '';
  if (r === '..' || r.startsWith(`..${sep}`) || resolve(root, r) !== resolve(abs)) return null;
  return r.split(sep).join('/');
}

/** Is `abs` inside `root` (or root itself), lexically? */
export function isInside(root, abs) {
  return relPath(root, abs) !== null;
}

/** The static name of a member expression's property (`a.b`, `a['b']`), or null when it is computed. */
export function staticMemberName(member) {
  if (!member || member.type !== 'MemberExpression') return null;
  if (!member.computed && member.property.type === 'Identifier') return member.property.name;
  if (!member.computed && member.property.type === 'PrivateIdentifier') return null;
  if (member.computed && member.property.type === 'Literal' && typeof member.property.value === 'string') {
    return member.property.value;
  }
  if (member.computed && member.property.type === 'TemplateLiteral' && member.property.expressions.length === 0) {
    return member.property.quasis[0].value.cooked;
  }
  return null;
}

/**
 * The value references in a file to the globals named in `names`, through scope analysis: a reference that resolves
 * to no declared variable (or to an implicit library global with no definition) is a global one, so a local `Date` or
 * a parameter named `performance` never counts. A reference through a global object (`globalThis.Date`,
 * `window.Math`) counts as a reference to the member, its node the member expression.
 * @returns {{ name: string, node: object }[]} in source order
 */
export function globalAccesses(sourceCode, names) {
  const out = [];
  for (const scope of sourceCode.scopeManager.scopes) {
    for (const ref of scope.references) {
      const id = ref.identifier;
      if (ref.isTypeReference === true && ref.isValueReference !== true) continue; // a type-only reference (TS)
      const v = ref.resolved;
      if (v && v.defs.length > 0) continue;
      if (names.has(id.name)) out.push({ name: id.name, node: id });
      else if (GLOBAL_OBJECTS.has(id.name)) {
        const parent = id.parent;
        if (parent && parent.type === 'MemberExpression' && parent.object === id) {
          const member = staticMemberName(parent);
          if (member !== null && names.has(member)) out.push({ name: member, node: parent, via: id.name });
        }
      }
    }
  }
  return out.sort((a, b) => a.node.range[0] - b.node.range[0]);
}

/** The value references to the global objects themselves (`window`, `self`, `global`, `globalThis`). */
export function globalObjectRefs(sourceCode) {
  const out = [];
  for (const scope of sourceCode.scopeManager.scopes) {
    for (const ref of scope.references) {
      const id = ref.identifier;
      if (!GLOBAL_OBJECTS.has(id.name)) continue;
      if (ref.isTypeReference === true && ref.isValueReference !== true) continue;
      if (ref.resolved && ref.resolved.defs.length > 0) continue;
      out.push(id);
    }
  }
  return out.sort((a, b) => a.range[0] - b.range[0]);
}

/** Strips TypeScript's expression wrappers (`x as T`, `x satisfies T`, `x!`, `<T>x`) and parentheses' remnants. */
export function unwrap(node) {
  let n = node;
  for (;;) {
    if (!n) return n;
    if (n.type === 'TSAsExpression' || n.type === 'TSSatisfiesExpression' || n.type === 'TSNonNullExpression' ||
      n.type === 'TSTypeAssertion' || n.type === 'TSInstantiationExpression') n = n.expression;
    else if (n.type === 'ChainExpression') n = n.expression;
    else return n;
  }
}

/** The numeric value of a numeric or bigint literal, optionally under unary `-` / `+`; null for anything else. */
export function numericLiteralValue(node) {
  const n = unwrap(node);
  if (!n) return null;
  if (n.type === 'Literal' && typeof n.value === 'number') return n.value;
  if (n.type === 'Literal' && typeof n.bigint === 'string') return Number(BigInt(n.bigint));
  if (n.type === 'UnaryExpression' && (n.operator === '-' || n.operator === '+')) {
    const v = numericLiteralValue(n.argument);
    return v === null ? null : n.operator === '-' ? -v : v;
  }
  return null;
}

/** The variable an identifier resolves to, walking the scope chain from its own scope; null for a global. */
export function resolveIdentifier(sourceCode, id) {
  let scope = sourceCode.getScope(id);
  while (scope) {
    const v = scope.set.get(id.name);
    if (v && v.defs.length > 0) return v;
    scope = scope.upper;
  }
  return null;
}

/** Is a specifier one of Node.js's built-in modules (with or without the `node:` prefix)? */
const BUILTINS = new Set(builtinModules);
export function isBuiltin(spec) {
  if (spec.startsWith('node:')) return true;
  return BUILTINS.has(spec) || BUILTINS.has(spec.split('/')[0]);
}

/** The package name of a bare specifier (`@scope/name/sub` → `@scope/name`, `name/sub` → `name`). */
export function packageNameOf(spec) {
  const parts = spec.split('/');
  return spec.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

/** Is a specifier relative or absolute (a path), rather than bare? */
export function isPathSpecifier(spec) {
  return spec.startsWith('./') || spec.startsWith('../') || spec === '.' || spec === '..' || spec.startsWith('/');
}

/** The vendored libraries (`vendor/<name>@<version>/`) under root, as { name, version, folder } sorted by name. */
export function vendoredLibraries(root) {
  const dir = join(root, 'vendor');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((n) => n.includes('@', 1) && statSync(join(dir, n)).isDirectory())
    .map((n) => {
      const at = n.lastIndexOf('@');
      return { name: n.slice(0, at), version: n.slice(at + 1), folder: `vendor/${n}` };
    })
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
}

/** A package.json under root (relative POSIX path), parsed, or null when absent. */
export function readManifest(root, rel) {
  const p = join(root, ...rel.split('/'), 'package.json');
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
}

/** The string of a literal or an expression-free template literal, else null. */
export function stringValue(node) {
  if (!node) return null;
  if (node.type === 'Literal' && typeof node.value === 'string') return node.value;
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return node.quasis[0].value.cooked;
  return null;
}

/**
 * ESLint visitors that call `onSpecifier(specifier, node)` for every module specifier in a file: static imports and
 * re-exports (type-only ones too), dynamic `import()`, `require()`, TypeScript's `import('x').T` types and
 * `import x = require('x')`. `node` is the specifier's own node (the place a report points at).
 */
export function specifierVisitors(onSpecifier) {
  const fromSource = (node) => {
    const s = stringValue(node.source);
    if (s !== null) onSpecifier(s, node.source);
  };
  return {
    ImportDeclaration: fromSource,
    ExportNamedDeclaration: (node) => node.source && fromSource(node),
    ExportAllDeclaration: fromSource,
    ImportExpression: fromSource,
    CallExpression(node) {
      if (node.callee.type === 'Identifier' && node.callee.name === 'require' && node.arguments.length >= 1) {
        const s = stringValue(node.arguments[0]);
        if (s !== null) onSpecifier(s, node.arguments[0]);
      }
    },
    TSImportType(node) {
      const lit = node.argument?.type === 'TSLiteralType' ? node.argument.literal : node.source ?? node.argument;
      const s = stringValue(lit);
      if (s !== null) onSpecifier(s, lit);
    },
    TSExternalModuleReference(node) {
      const s = stringValue(node.expression);
      if (s !== null) onSpecifier(s, node.expression);
    },
  };
}

/** Code-unit order (deterministic across locales; never localeCompare). */
export function byCodeUnit(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** dirname that keeps working on virtual (not yet existing) paths. */
export const dirOf = dirname;
