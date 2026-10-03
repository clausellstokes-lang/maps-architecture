// lint-as: packages/testkit/test/kernel/zz-folder/pass.test.ts
// The spec note N-12 (C-0122): a package item's test in the test kit's test project is test-kit code at every depth —
// it imports the package by name, the test kit, an oracle and the test runner.
import * as kernel from '@plat/kernel';
import * as testkit from '@plat/testkit';
import polygonClipping from 'polygon-clipping';
import fc from 'fast-check';
import { describe } from 'vitest';
import * as kit from '../../../src/index.js';
export { kernel, testkit, polygonClipping, fc, describe, kit };
