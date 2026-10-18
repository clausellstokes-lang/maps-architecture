// lint-as: scripts/zz-fixture-ts-forms.ts
// TypeScript's module forms that leave plat/ (C-0127 (2), C-0130): a type-only import and re-export, an import type
// `import('x').T`, and import-equals `import x = require('x')` — each judged like any specifier.
import type { T } from '../../research/t.js'; // planted: outside
import legacy = require('../../research/legacy.js'); // planted: outside
export type { U } from '../../captures/u.js'; // planted: outside
export type V = import('../../reference/v.js').V; // planted: outside
export type W = T | typeof legacy;
