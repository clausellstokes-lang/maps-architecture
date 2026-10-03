// ESLint flat config (M0-s-01). TypeScript files are parsed with type information (typescript-eslint's project
// service) so the determinism rules can use types; the rules themselves are M0-d-07's, in tools/lint/index.mjs.
import tseslint from 'typescript-eslint';
import plat from './tools/lint/index.mjs';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      'vendor/**',
      'tools/lint/fixtures/**',
      'tools/scaffold/fixtures/**', // the dispatcher's fixture harness (C-0095), outside every TypeScript project
      '**/test/fixtures/**',
      'vitest.config.ts',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    plugins: { plat },
  },
  {
    files: ['**/*.mjs', '**/*.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    plugins: { plat },
  },
  ...plat.configs.recommended,
];
