// ESLint's Linter on one file outside the tree's configuration: the language options a file's extension needs, and
// the note ESLint adds for an inline directive when inline configuration is off. Used by paths.mjs's lintFile,
// directives.mjs's directivesOf and vendor-scan.mjs's scanFile. The path check and the scan re-parse a JavaScript file
// that fails as a module as a classic script; inline-directives does not, since model code is module code (C-0128 (5),
// C-0129 (2), C-0126 (1)).
import tseslint from 'typescript-eslint';
import { TS_FILE } from './rules/shared.mjs';

/**
 * The language options for one file linted alone (plat/- or library-relative name): the TypeScript family (TS_FILE)
 * through typescript-eslint as module code; JavaScript through espree, `.cjs` as CommonJS and the rest as module code,
 * or as a classic script when `script` is set (a TypeScript file ignores it); JSX for `.tsx` and `.jsx` only.
 */
export function languageOptionsFor(rel, { script = false } = {}) {
  const jsx = rel.endsWith('.tsx') || rel.endsWith('.jsx');
  if (TS_FILE.test(rel)) {
    return { parser: tseslint.parser, parserOptions: { sourceType: 'module', ecmaFeatures: { jsx } } };
  }
  const sourceType = script ? 'script' : rel.endsWith('.cjs') ? 'commonjs' : 'module';
  return { ecmaVersion: 'latest', sourceType, parserOptions: { ecmaFeatures: { jsx } } };
}

/**
 * A note ESLint adds for each inline directive when inline configuration is off. Every other message without a rule
 * (a configuration that does not reach the file, say) is kept as a problem, so the check fails closed.
 */
export function isDirectiveNote(m) {
  return m.ruleId === null && !m.fatal && / has no effect because you have 'noInlineConfig' setting/.test(m.message);
}
