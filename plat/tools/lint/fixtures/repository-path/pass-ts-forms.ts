// lint-as: scripts/zz-fixture-ts-pass.ts
// The same TypeScript module forms resolving inside plat/ (packages through node_modules links inside plat/) pass.
import type { Linter } from 'eslint';
import ts = require('typescript');
export type { Rule } from 'eslint';
export type Config = import('eslint').Linter.Config;
export type Both = Linter | typeof ts;
