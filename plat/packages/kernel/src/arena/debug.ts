// The debug-build assertion mode for slot stamps (§3.4 *Arenas, keys and services*; §3.10's arena-isolation row): a
// slot a caller holds comes from a result stamped with its arena's key and version, and a debug build asserts, wherever
// it is passed, that the key is the arena the call acts on and the version is current. M0-a-02 holds the switch; the
// build flag that turns it off in production bundles is M0-a-14's (C-0146 (6)). It is on by default: every source run
// (vitest, the plat-source condition) is a debug build. An assertion is a programming error — it throws — never a
// KernelResult (§3.11: "a stale or foreign slot: a debug-build assertion, never a silent read").

let assertions = true;

/** Turns the debug-build assertions on or off (M0-a-14's build flag sets it; tests flip it to see both builds). */
export function setDebugAssertions(on: boolean): void {
  assertions = on;
}

/** Whether this build asserts slot stamps. */
export function debugAssertions(): boolean {
  return assertions;
}

// The tiny-tables mode (N-53 (4), C-0286): a test switch that makes `createPlat` start EVERY table it makes at capacity 1
// — the vertex and edge-pair columns, every level's face columns and hole pool, the role rows, the role-head and owner
// hash tables and the interned-handle table — whatever capacity is asked, and makes the slot tables (vertices, pairs,
// faces, role rows, a level's hole pool) grow by exactly what an allocation needs instead of doubling, so they are
// always full and EVERY allocation replaces its table (the hash tables keep doubling from 1: a power of two at load
// ≤ 0.5). At the default sizes a doubling is rare, so a writer that captured a table before an allocation (the
// stale-capture class of N-53: M0-x-06's rotation crashes) met no test; under this mode every writer meets one at once.
// It changes no output: slots are taken by the high-water mark and the free lists, never by capacity, and nothing
// iterates a hash table (§2.2, J-K22). The mode is read when a table is made or grown. Off by default; the tests turn
// it on from PLAT_TINY_TABLES=1 (kernel test/arena/tiny.ts). Kernel-internal: not exported from the package.

let tiny = false;

/** Turns the tiny-tables mode on or off (tests only; N-53 (4)). */
export function setTinyTables(on: boolean): void {
  tiny = on;
}

/** Whether `createPlat` starts every table at capacity 1 and the slot tables grow by one slot. */
export function tinyTables(): boolean {
  return tiny;
}

/** A structural precondition of a raw arena primitive: always checked (a programming error, in every build). */
export function check(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(`arena: ${message}`);
}
