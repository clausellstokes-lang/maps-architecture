// lint-as: packages/layout/src/zz-fixture/pass.ts
// The layout imports every package below it (§14), its own modules, and types.
import * as kernel from '@plat/kernel';
import type * as model from '@plat/model';
import * as tables from '@plat/tables';
import * as site from '@plat/site';
import * as self from '../index.js';
export { kernel, tables, site, self };
export type M = typeof model;
