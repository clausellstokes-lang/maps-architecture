// lint-as: packages/kernel/test/zz-fixture/reference.test.ts
// A kernel test imports its own package, the test runner, Node, and an adopted library as the reference it compares
// against (C-0127) — never a package above the kernel.
import { orient2d } from 'robust-predicates';
import { readFileSync } from 'node:fs';
import { it } from 'vitest';
import * as kernel from '@plat/kernel';
import * as self from '../../src/index.js';
export { orient2d, readFileSync, it, kernel, self };
