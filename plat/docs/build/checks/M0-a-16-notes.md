# M0-a-16: minor notes for the hardening milestone M4 (check/M0-a-16, 2026-10-06)

Under J180 and N-45 none of these fails the item. Each is a KI row for the hardening pass.

1. **A stale overlay writes outside a transaction.**
   * **What happens:** an `Overlay` captured inside a callback and handed to a façade writer after its batch committed
     changes the arena. No transaction is open, and the version is not bumped.
   * **Evidence:** probe P6: "returned ok=true state same: false version 0".
   * **Whose behaviour:** M0-a-06's module does the same without the façade. The façade inherits it.
   * **Suggestion:** the façade already tracks its open frames, so `writer()` could refuse an overlay that is no open
     frame's (detect-and-refuse). The same guard belongs in `tx/`. This is a session note for M0-a-06.
2. **Slot numbers carry no stamp (C-0220 (3)).**
   * §3.4 asks the debug build to assert key and version "wherever the slot is passed".
   * The façade stamps returned objects and asserts them only through an explicit `assertCurrent`.
   * A stale or foreign `FaceId` passed to a writer is checked only for liveness by the module. A reused slot is
     therefore not caught.
   * The reading is declared in a choices row. The hardening pass could carry handles in the debug build.
3. **Mutant K22 survives.** It weakens the overlay check from "this kernel's arena object" to "an arena under this
   key".
   * **Why it survives:** facade.test.ts shares one Plat between the two kernels, so a second kernel over a different
     ground arena (same key, other object) is never tried.
   * **Suggestion:** add that case. This is a debug-build refusal of a programming error.
4. **Mutant S05 survives.** It makes `stampOf` prefer the inline stamp over the side table.
   * **Why it is not a blocker:** it is equivalent on today's paths, because no batch value the façade re-stamps
     carries an inline `{ key, version }`.
   * **When it would matter:** a later writer or service that returns an inline-stamped object from a rejected batch
     would read as current under the mutant.
   * **Suggestion:** a pinning test.
5. **`resolveVertexAt`'s design signature is carried by no type.**
   * C-0089 says "present under its design name and signature".
   * The stub is `NotBuiltStub<'M2a'>`, and only `CarryMap` is declared.
   * **Suggestion:** a `ResolveVertexAt` type alias (`(key, at, sig, carry: CarryMap) => …`) beside `CarryMap` would
     let M2a's signature compile unchanged.
6. **The mixer census has gaps.**
   * It is a vitest test (`mixer.test.ts`), not a rule of `corepack pnpm lint`.
   * It counts named and namespace calls of `mixInto` / `streamKey`, but not element-access calls (`m['mixInto']`).
   * It does not count a `Stream` built from a key that never went through the mixer. `testkit/src/constructive/draw.ts:50`
     builds `new Stream(H128(utf8Bytes(\`constructive/...\`)))` from a string. That is test infrastructure, not a model
     path, but it is a stream outside the one mixer. This is a session note.
7. **LevelView reads.** `LevelView.faces()` omits a coarser face that is its own child at the level (C-0220 (4)). A
   reader that wants the whole level-n tiling must add `pointLocate`'s answers. A `tiling()` or an `includeOwnChildren`
   reading would remove the trap.
8. **The `notBuilt` site census can miss refusals.** It matches only `notBuilt('M…',` with single quotes. A refusal
   written with double quotes, as a template, or through another helper escapes it. The stub table would then miss a
   site silently.
9. **The §4b kernel-entry filter is the author's own.** `KERNEL_MARKS` matches substrings of the hook cell. My
   independent reading gives the same 8 rows today, but a future §4b kernel row worded otherwise would escape the
   equality. A marker column in §4b, or an explicit row list, would be firmer.

**Session note (not the item's).** Two reds in the related run, `testkit/test/kernel/arr-booleans-buffers/agreement-buffer.test.ts`
and `agreement-faces.test.ts`, are insertChain N-43 ("no route … keeps clearance … within the fidelity bound"). That is
M0-a-05's fix-s6 work in flight, and integration g9 logged the same two reds.

## Closing round 3 (check/M0-a-16-close-r3, 2026-10-06): KI test-gap notes under N-48 (J214)

10. **KI — mutant N11 survives: the lattice-point `signature` on an arena WITHOUT an index is tested only where it
    finds nothing.**
    * **Mutant N11** (`src/facade/kernel.ts`): in `geom.signature`'s no-index branch,
      `return w === -1 ? { v: [], e: [] } : vertexSignature(p, w);` becomes `return { v: [], e: [] };`. It survives the
      item's whole test set ("Test Files 5 passed (5) · Tests 78 passed (78)"), because the only unindexed test
      ('signature routes a lattice point … scans one without an index') reads pt(5, 5) on a bare `createPlat`, which
      has no vertex.
    * **The code is correct (CONFIRMED).** Probe P14 (`~/maps-scratch/waves/check-M0-a-16/close/r3/probes/zz-r3-probe.test.ts`)
      builds an indexed arena with an L1 `way:7` chain and an `entrance` knot at (500, 500), round-trips it through
      `encodeArena` / `decodeArena` without `opts.index` (an honest unindexed arena with content; a transaction
      refuses an arena without an index, so a decoded arena is the only way to get one), and asserts that
      `k.geom.signature(GROUND, pt(500, 500))` equals the scan `signature(p, pt, GROUND)` and holds
      `{ role: 'entrance', entity: 'way:7', ordinal: 0 }`. On the real code: "Tests 1 passed (1)". Under N11:
      "Tests 1 failed (1)", "expected { v: [], e: [] } to deeply equal { …(2) }".
    * **Why a note, not a blocker (N-48):** a new own mutant on probe-confirmed-correct code; no listed test id or exit
      bar of M0-a-16 is left unproven, and the lattice-point signature contract is covered on indexed arenas (the
      L3-knot and L4-only-knot tests).
    * **Suggested handling (M4 hardening, or M1 when the document first loads arenas through `decodeArena`):** add
      P14 as a façade test.

## Closing check of session fix round s1 (check/M0-a-16-close-s1, 2026-10-08): N-55 (5) (1) notes under N-45

11. **Session note — the round's guard is C-0290's closed-overlay test, not N-55 (5) (1)'s "no open frame of this
    kernel"; the ruled line is MEASURED to break three committed tests of other items and one of this item's own.**
    * **Observation (CONFIRMED, own mirror `~/maps-scratch/waves/check-M0-a-16/close-s1/`, mutant K06 = the ruling's
      exact line `if (!frames.some((f) => f.o === o)) fail(…)`):** the façade folder "3 failed | 81 passed (84)" —
      the two acceptance pins and the pre-existing `owner() names the entity whose interned handle is 0` (which hands
      `k.geom.setOwner` a MODULE `commit()` overlay: the risk N-55 (5) (1) named); `bench/test/fuzz-bar/entry.test.ts`
      + `testkit/test/layout/growth-s5cd/derivation-unit.test.ts` "3 failed | 3 passed (6)" (green, 6/6, on the
      round's code). The harnesses: `testkit/src/invariants/primitives.ts` `writer()` (opens on a fresh kernel, writes
      through another) and `testkit/src/determinism/issue.ts` `runBatch` (module `tx()`, S5c writes through
      `kernel.geom.insertChain`, `layout/src/growth/proposals.ts:592`).
    * **Why not a fail:** an open overlay, however opened, writes inside its transaction (probe: "other kernel open:
      ok=true v=1", "module tx open: ok=true v=1" — the version moves, the batch commits or rolls back whole), so N-45
      (a)'s silent write is closed by the closed-overlay test alone; refusing a foreign OPEN overlay is hygiene, and the
      brief's own "no behaviour shift on any lawful path" forbids breaking those three lawful paths.
    * **Suggested handling (the session; veto path already written in C-0290):** if the ruled line is wanted, open
      rounds for M0-k (primitives.ts `writer()` through the writing kernel's `k.tx`) and M0-d-08 (`issue.ts`
      `runBatch` through `kernel.tx`), then M0-a-16 moves its `owner()` test to `k.tx` and flips the two acceptance
      pins. Otherwise M4 hardening.
12. **KI — a fabricated overlay (an `InsertTx` shell with `open: true`) still writes through a façade writer outside
    any transaction.**
    * **Repro (CONFIRMED, probe `zz-check-s1.test.ts` in the mirror):** `k.geom.insertChain(Object.assign(shell(p, 1),
      { open: true }), …)` → "RETURNED ok=true | v 0->0 | bits same false", on the old code and on the fix, debug on
      and off. `insertTx` is a public export of `@plat/kernel` (`insert/index.ts:13`), and `{ ...insertTx(p, 1), open:
      true }` type-checks as an `Overlay` without a cast. No production path does this (grep: `insertTx(` outside
      `insert/` only in `arr/winding.ts:162` and `testkit/src/determinism/fixtures.ts:105`, neither through the façade).
    * **Why a note:** a deliberate-writer escape (N-45's deferred class); `closed` is never set on a shell that no
      transaction minted.
    * **Suggested handling (M4, or with M0-a-06 when convenient):** `tx/state.ts` exports `isOpenTx(o)` (its `open`
      WeakSet ∧ `!closed`) and `writer()` checks that instead of `closed === true` — it refuses the shell and still
      accepts every open transaction, so the two harnesses of note 11 stay green.
13. **KI (PLAUSIBLE, reasoning only) — a value a writer returns through a kernel that did not open the batch is not
    re-stamped at the commit.** `batchValue` keeps the value only in a frame of the writing kernel whose overlay is
    `o`; with note 11's harness shape (open on kernel A, write through kernel B) B has no such frame, so the value
    keeps the in-batch version and a later `B.assertCurrent(value)` would assert it stale in the debug build. Fail-loud,
    debug-only, no committed state touched; the hardening pass can pin it or route the stamp through the transaction.
