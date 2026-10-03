// lint-as: scripts/zz-fixture-pass.mjs
// Imports, URLs and joined paths that stay inside plat/ (packages through node_modules links inside plat/), in every
// form the rule judges (C-0130).
import { join, resolve } from 'node:path';
import * as path from 'node:path';
import plugin from '../tools/lint/index.mjs';
import { ESLint } from 'eslint';
export { Linter } from 'eslint';
export * from '../tools/lint/rules/shared.mjs';
const manifest = new URL('../package.json', import.meta.url);
const readme = join(import.meta.dirname, '..', 'README.md');
const later = () => import('typescript-eslint');
const remote = new URL('https://example.org/x', import.meta.url);
const resolvedInside = import.meta.resolve('../package.json');
const fromResolve = resolve(import.meta.dirname, '..', 'tools');
const viaMember = path.join(import.meta.dirname, '..', 'README.md');
const commonDir = join(__dirname, '..', 'tools');
const required = require('eslint');
export { plugin, ESLint, manifest, readme, later, remote, resolvedInside, fromResolve, viaMember, commonDir, required };
