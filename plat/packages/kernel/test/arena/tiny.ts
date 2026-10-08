// The tiny-tables switch for the tests (N-53 (4), C-XXXX): PLAT_TINY_TABLES=1 turns on the kernel's tiny-tables mode,
// in which `createPlat` starts every table at capacity 1, so every allocation that fills a table doubles it and every
// writer meets the re-read rule (plat.ts, above `PlatCapacity`) at once. Imported by this folder's `support.ts` (so
// `buildArena`, and M0-a-04's `indexed` built on it, honour the variable) and named as a vitest setup file by the PR
// tier's tiny run, which arms it for every arena the insert step1-2, step3-5 and tx folders make — `createPlat` called
// directly included. Any other value, or none, leaves the default sizes.
import { setTinyTables } from '../../src/arena/debug.js';

/** Whether this test process runs with every arena table starting at capacity 1. */
export const TINY_TABLES = process.env.PLAT_TINY_TABLES === '1';

if (TINY_TABLES) setTinyTables(true);
