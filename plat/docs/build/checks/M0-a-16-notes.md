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
