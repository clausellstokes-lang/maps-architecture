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

/** A structural precondition of a raw arena primitive: always checked (a programming error, in every build). */
export function check(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(`arena: ${message}`);
}
