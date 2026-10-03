// The PLAT determinism lint — an ESLint plugin (§6.5 (3)–(5), §14's dependency rules, §17.1 (3), §17.4; M0-d-07).
// The scaffold (M0-s-01) created this file empty and wired it (C-0060): eslint.config.js registers the plugin as `plat`
// and spreads `configs.recommended`; scripts/lint.mjs (`corepack pnpm lint`) runs ESLint over plat/ with zero warnings
// and then every whole-tree check in `checks` ([{ name, run(platRoot) }] → { ok, problems }).
//
// Rules (rules/): math-allowlist, no-exponent-operator (C-0008), no-object-key-iteration (C-0009), ratio-division
// (C-0044), no-nondeterminism, sort-with-comparator — the model rule set — and dependency-direction, repository-path,
// no-bare-pnpm (C-0093).
// Scopes (configs.recommended), each over every code extension (CODE_EXTENSIONS: ts tsx mts cts js jsx mjs cjs; C-0128):
// the model rule set on the five model packages' sources and on every file of the digest closure beyond them
// (digest-closure.mjs, seeded with the model packages at M0); dependency-direction on packages/ and bench/;
// repository-path on every linted file; no-bare-pnpm's spawn part on scripts/ and tools/. The scaffold's config parses
// `.ts`, `.js` and `.mjs`; the parsers for the other extensions are given here, so none of them escapes unparsed.
// Whole-tree checks: probe-red (the lint's acceptance probe, C-0106), vendor-scan (§6.5 (4) and the audit record),
// repository-path (links, ignored sources, build inputs), inline-directives (model code silences no rule but by
// C-0125 (6)'s vetted division, C-0128), no-bare-pnpm (package scripts and Markdown command lines), licences (§17.4's
// allowlist over the production closure).
import tseslint from 'typescript-eslint';
import { digestClosure } from './digest-closure.mjs';
import { check as inlineDirectives } from './directives.mjs';
import { check as licences } from './licences.mjs';
import repositoryPathCheck from './paths.mjs';
import { check as probeRed } from './probe.mjs';
import { check as noBarePnpm } from './rules/no-bare-pnpm.mjs';
import { MODEL_RULES, rules } from './rules/index.mjs';
import { CODE_GLOB, MODEL_PACKAGES, PLAT_ROOT } from './rules/shared.mjs';
import { check as vendorScan } from './vendor-scan.mjs';

/** The model packages' sources, every code extension (§6.5 (3)'s "model packages"; their tests are not model code). */
export const MODEL_FILES = [`packages/{${MODEL_PACKAGES.join(',')}}/src/**/*.${CODE_GLOB}`];

/** The digest closure's files outside the model packages (none at M0), linted under the model rule set too. */
export const closure = digestClosure(PLAT_ROOT);

const plugin = {
  meta: { name: '@plat/lint', version: '0.1.0' },
  rules,
  configs: {},
  checks: [probeRed, vendorScan, repositoryPathCheck, inlineDirectives, noBarePnpm, licences],
};

plugin.configs.recommended = [
  // Parsers for the code extensions eslint.config.js leaves to ESLint's defaults (C-0128): the TypeScript family with
  // type information like `.ts`, `.jsx` with JSX, `.cjs` as CommonJS (ESLint's default for it).
  {
    name: 'plat/parse-typescript',
    files: ['**/*.{tsx,mts,cts}'],
    languageOptions: { parser: tseslint.parser, parserOptions: { projectService: true, tsconfigRootDir: PLAT_ROOT } },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    plugins: { plat: plugin },
  },
  {
    name: 'plat/parse-jsx',
    files: ['**/*.jsx'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } } },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    plugins: { plat: plugin },
  },
  {
    name: 'plat/parse-cjs',
    files: ['**/*.cjs'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'commonjs' },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    plugins: { plat: plugin },
  },
  { name: 'plat/model-packages', files: MODEL_FILES, rules: { ...MODEL_RULES } },
  ...(closure.outside.length > 0 ? [{ name: 'plat/digest-closure', files: closure.outside, rules: { ...MODEL_RULES } }] : []),
  {
    name: 'plat/package-graph',
    files: [`packages/**/*.${CODE_GLOB}`, `bench/**/*.${CODE_GLOB}`],
    rules: { 'plat/dependency-direction': 'error' },
  },
  { name: 'plat/repository-path', files: [`**/*.${CODE_GLOB}`], rules: { 'plat/repository-path': 'error' } },
  { name: 'plat/no-bare-pnpm', files: [`scripts/**/*.${CODE_GLOB}`, `tools/**/*.${CODE_GLOB}`], rules: { 'plat/no-bare-pnpm': 'error' } },
];

export default plugin;
