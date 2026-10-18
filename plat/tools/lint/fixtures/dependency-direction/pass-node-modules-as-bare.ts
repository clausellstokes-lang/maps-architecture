// lint-as: packages/kernel/test/zz-fixture/reference.test.ts
// A path into a node_modules folder is judged as the bare name it names (C-0129): a kernel test may import an adopted
// library as its reference and the test runner, as it may by name (C-0127).
import { orient2d } from '../../node_modules/robust-predicates/esm/orient2d.js';
import { it } from '../../../../node_modules/.pnpm/vitest@5.0.3/node_modules/vitest/dist/index.js';
import * as self from '../../node_modules/@plat/kernel/src/index.js';
export { orient2d, it, self };
