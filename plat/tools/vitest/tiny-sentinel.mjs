// The kernel-tiny project's sentinel (C-0286 (5): the tiny run must never run at default sizes and report green): runs
// after test/arena/tiny.ts in every worker of that project and fails the whole project when PLAT_TINY_TABLES=1 is set
// but the kernel's tiny-tables mode is not armed — so a broken wiring of the switch (tiny.ts reading another value, the
// env entry dropped from vitest.config.ts) can never run the tiny tier at default sizes and report green. Any other
// value of the variable is not this file's business. The thrown message is pinned text (tiny-sentinel.test.mjs;
// J263 Q6).
import { tinyTables } from '../../packages/kernel/src/arena/debug.ts';

if (process.env.PLAT_TINY_TABLES === '1' && !tinyTables()) {
  throw new Error('kernel-tiny: PLAT_TINY_TABLES=1 but the tiny-tables mode is not armed (packages/kernel/test/arena/tiny.ts must set it before this sentinel; N-s1-1, Q26)');
}
