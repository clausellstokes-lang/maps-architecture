// lint-as: scripts/zz-fixture-pass.mjs
// Imports, URLs and joined paths that stay inside plat/ (packages through node_modules links inside plat/).
import { join } from 'node:path';
import plugin from '../tools/lint/index.mjs';
import { ESLint } from 'eslint';
const manifest = new URL('../package.json', import.meta.url);
const readme = join(import.meta.dirname, '..', 'README.md');
const later = () => import('typescript-eslint');
const remote = new URL('https://example.org/x', import.meta.url);
export { plugin, ESLint, manifest, readme, later, remote };
