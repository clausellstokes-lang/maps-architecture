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
14. **KI (closing check s2, `check/M0-a-16-close-s2`; M4) — the in-batch stamp after a cross-commit restore has no
    pin.** Mutant M22 (`batchValue` stamps `{ key, version }` through `stampWith` instead of `stamp(o.plat, value)`,
    dropping the generation for a value an op returns inside a batch) SURVIVES the five façade files (90/90) and, by
    grep, RELATED (no other test pairs `assertCurrent` with `restoreSavepoint`). The tree is right (CONFIRMED, mirror
    probe `zz-inbatch.test.ts`): after `takeSavepoint`, one commit and `restoreSavepoint` (generation 1), an op's result
    asserted inside the next batch is current (`m: null`); under M22 it throws `kernel: a stale slot: stamped at version 0
    in restore generation 0, arena ground/0 is at version 0 in restore generation 1 …` — a loud false refusal of a fresh
    in-batch read, debug build only, healed by the commit's re-stamp. Not one of the round's stated lines (C-0317 (2)
    lists the doors it stamps; the in-batch value is not among them), so a further hardening test, not a fail.
    * **Suggested handling (M4):** add to stamps.test.ts's Q38 block: restore across one commit, then inside the next
      batch `k.assertCurrent(ins, GROUND)` passes and `stampOf(ins)` carries `generation: 1`.
15. **KI (closing check s2; consolidation pass or M4) — the façade keeps its own copy of the arena's stamp form.**
    `facade/stamp.ts`'s `stampNow` repeats `arena/resolve.ts`'s module-private `stamp(p)` line for line (key copy,
    version, generation only when not 0), and `assertStamped`'s generation message repeats `assertStamp`'s text. The
    two agree today (CONFIRMED: P4 messages match after the `kernel:` / `arena:` prefix; C-0317 (1) records why — the
    brief's "arena/resolve.ts exports stamp" is not so on this tree). Two copies of one law can drift.
    * **Suggested handling:** M0-a-02 exports `stamp` (or a `stampOf(p)`) through the arena barrel and the façade calls
      it; or a test that compares `stampNow(p)` with a `Resolved`'s inline stamp across a restore.

## Consolidation round C1 (build/M0-a-16-consolidate-1, 2026-10-13): the builder's map and evidence (J263 Q8, J183)

Round R13's façade part of `consolidation/kernel-plan.md` (§1.12 E-1, §1.4 A-2 / A-4, §2's façade row and index rule,
§3.4 T-facade-new-1); rulings J263 Q1, Q6, Q8 and J270 (a) – (c); choices row C-0346.

**What changed.** (1) E-1: `facade/stamp.ts`'s private `keyName` is gone; `stamp.ts` and `kernel.ts` import the
arena's (`arena/resolve.ts`, by path; the identical `${layer}/${part}`), and `kernel.ts`'s own `keyText`
(`${layer}/${String(part)}`, the same text for every number) is gone with it. `stampNow` returns the arena's `stamp(p)`
(the same body line for line; it closes note 15's "two copies of one law"). (2) C-facade-1: `kernel.ts`'s module
comment, `isClosed`'s and `writer`'s docs state the rule ("a closed overlay is no open transaction; refused in every
build", §3.3, C-0290) without the ruling narration; `isClosed` reads the declared `InsertTx.closed` instead of a
structural cast (the same property, the same `=== true`); the pinned text at `kernel.ts:158` is byte-identical.
`stamp.ts`'s header drops the queue ids (Q38, Q28, Q33). (3) `facade/index.ts` carries no scaffold sentence on this
tree: it is untouched (byte-identical). (4) T-facade-new-1 (A-4, J270 (c)): a new `it` in `facade.test.ts` — the
lattice-point `signature` on an arena with content and no index (the block decoded without one) finds the live vertex,
its own rows and its edges' structural rows, and empty off a vertex, as on its indexed twin; written from §3.4's
`signature` contract and `VertexSig`'s fields. (5) `NO_OPEN` now pins the closed-overlay refusal's whole text (it pinned
the prefix only). (6) Test section comments lose their round history (fix rounds 1 – 3, s1, Q13, Q38, probe P6); no
describe or it title changed.

### Old file → new file map (J263 Q8)

No file was renamed, merged or split; every describe and it title is kept (facade 8 describe / 34 it before, 8 / 35
after: T-facade-new-1 added; mixer 2 / 5, reflection 3 / 11, stamps 3 / 15, stubs 3 / 9 unchanged; vitest 90 → 91 cases).

| old file | new file | change |
|---|---|---|
| `src/facade/stamp.ts` | same | E-1 `keyName` and `stampNow` from `arena/resolve.ts`; header comment |
| `src/facade/kernel.ts` | same | E-1 `keyText` → the arena's `keyName`; C-facade-1 comments; `isClosed` reads `InsertTx.closed` |
| `src/facade/{index,types,notBuilt,engine}.ts` | same | unchanged (byte-identical) |
| `test/facade/facade.test.ts` | same | + T-facade-new-1; `NO_OPEN` the whole text; section comments |
| `test/facade/stamps.test.ts` | same | one section comment |
| `test/facade/{mixer,reflection,stubs}.test.ts`, `support.ts` | same | unchanged |

### NO-SHIFT and API (J260 (3), J263 Q1)

* **Before-image:** the tree before the first edit, equal file for file to `landed/M0-a-16.json` (lane
  build/M0-a-16-fix-s2) — kept in the lane's scratch, outside plat/.
* **Probe** (mirror only, `zz-noshift.test.ts`): every façade output, stamp (`stampOf`), thrown message text, level
  digest (L0 – L4), arena block ref and runtime export name it reaches, in the debug build and with the assertions off —
  the crossing arena's keyed doors and services, the lattice-point signature on a 17 × 9 grid (indexed) and a 9 × 9 grid
  (decoded, no index), a commit sequence with in-batch, committed, rejected and closed-overlay values, the stale /
  foreign / unstamped / no-arena / restore-generation assertions after a cross-commit restore, a second arena's
  transaction: 608 lines, sha256 `010cd4d09c707c2584030d32bc1d54e8d7caca7d9035ebcd30bbcc5e11f56f77` before and after —
  byte-identical.
* **Exported names:** `facade/index.ts` 8 runtime names and the barrel's runtime names identical (probe); the emitted
  declarations `facade/index.d.ts`, `kernel.d.ts`, `types.d.ts`, `notBuilt.d.ts`, `engine.d.ts` and the barrel's
  `index.d.ts` byte-identical before (the pre-round build) and after; `stamp.d.ts` differs in `stampNow`'s doc comment
  only.
* **Refusals (J264 (5), J290 / N-58):** the façade refuses only programming errors. Census of every `kernel: `-prefixed
  error constructed while the five façade files run (mirror-only setup hook): 192 before, 192 after, the identical
  multiset — closed overlay 111, stale / generation / foreign / unstamped / no-arena stamps, a dead face at a view's
  level, an unknown or mis-keyed arena, both op forms, a service outside a transaction, a missing spineWidths. Every one
  is UNLAWFUL input (a caller's programming error, §3.11) with verdict REFUSE (a throw, visible); no user reaches them
  through §11.4's doors — the stages call the façade. Lawful-input refusals: 0 before, 0 after.

### Self-check (J183): faults re-introduced in the lane's mirror

Each mutant applied alone to the lane's one mirror (isolation shown: no link into the tree; testkit's `@plat/kernel`
resolves inside the copy), run as `vitest run --maxWorkers=1 --bail=1` over the five façade files, restored from the
tree with a `cmp -s` check. Controls: the new tests are green on the pre-round sources (91/91 — the pins hold the
behaviour that was there); N11 SURVIVES the pre-round tests (90/90), as note 10 recorded, and TXT survives them too.

| id | file | fault | result |
|---|---|---|---|
| N11 | kernel.ts | the no-index scan always returns empty (note 10) | KILLED by T-facade-new-1 |
| N11b | kernel.ts | the no-index scan drops the vertex's own rows | KILLED by T-facade-new-1 |
| N09 | kernel.ts | the indexed lattice-point signature always empty | KILLED |
| N10 | kernel.ts | the index / scan routing inverted | KILLED |
| K01 | kernel.ts | the closed-overlay guard dropped | KILLED |
| K03 | kernel.ts | the guard after the op | KILLED |
| K04 | kernel.ts | the wrong field read | KILLED |
| K05 | kernel.ts | `closed !== false` (an absent `closed` reads closed) | SURVIVED — before and after alike (equivalent: every overlay a transaction mints carries `closed` as a boolean, `tx/state.ts`; only a fabricated shell has none, note 12's class) |
| K07 | kernel.ts | the guard debug-only | KILLED |
| K10 | kernel.ts | a silent typed refusal instead of the throw | KILLED |
| TXT | kernel.ts | the pinned text loses its ruling id | KILLED (by the whole-text `NO_OPEN`; survived the pre-round tests) |
| K21 | kernel.ts | a map entry's key need not name its arena | KILLED |
| KN1 | arena/resolve.ts | `keyName` re-spelt `layer:part` | KILLED in `facade.test.ts` (the façade's own messages now follow the arena's `keyName`; on the pre-round code only `stamps.test.ts`' direct `assertStamp` pin fell) |
| KN2 | stamp.ts | the foreign-slot message names the arenas swapped | KILLED |
| M02 | arena/resolve.ts | a version-only arena stamp | KILLED |
| M02f | stamp.ts | a version-only `stampNow` | KILLED |
| M05 | arena/resolve.ts | the generation always written | KILLED |
| M01 | stamp.ts | the generation compare dropped | KILLED |
| M20 | stamp.ts | the generation message text changed | KILLED |
| S01 | stamp.ts | the version check dropped | KILLED |
| S02 | stamp.ts | the foreign check dropped | KILLED |
| S04 | stamp.ts | an unstamped value passes | KILLED |
| M07 | stamp.ts | the version checked before the generation | KILLED |

**RELATED@1000** (the tree, `PLAT_FUZZ_RUNS=1000 vitest related --run --maxWorkers=1` over `src/facade/stamp.ts` and
`src/facade/kernel.ts`): Test Files 326 passed (326), Tests 4 002 passed (4 002), exit 0 (8 447 s) — no red (the
session's known foreign reds did not appear in this run).

## Closing check of consolidation round C1 (check/M0-a-16-consolidate-close-1, 2026-10-13): hardening notes (N-45, J202)

16. **KI (closing check C1; M4) — `stampNow`'s "a copy of its key" has no pin.** Own mutant X14 (`stampNow` returns
    `{ ...arenaStamp(p), key: p.key }`: the stamp's key is the arena's own key object, not a copy) SURVIVES the five
    façade files (91/91); the same aliasing on the pre-round body (`const key = p.key;`, X14o) survived the pre-round
    tests (90/90) alike, so it is no shift of this round. The tree is right (CONFIRMED by reading: `arena/resolve.ts`'s
    `stamp` builds `{ layer: p.key.layer, part: p.key.part }`). Only a deliberate writer that mutates a stamp it was
    handed (`stampOf(v).key.part = …`) would see the difference: it would re-key the arena.
    * **Suggested handling (M4):** in stamps.test.ts, `expect(stampOf(r)?.key).not.toBe(p.key)` and, after mutating the
      returned stamp's key, `p.key` unchanged and `assertCurrent` still current.
17. **KI (closing check C1; M4; with note 15) — the generation message's tail is not pinned.** Own mutant X19 (the
    façade's `(a savepoint was put back across committed batches since)` shortened to `(a savepoint was put back)` in
    `assertStamped`) SURVIVES 91/91, and survived the pre-round image (90/90) alike; the pinned part (`… in restore
    generation g, arena ground/0 is at version v in restore generation g'`) is held (X19b, M20's form: 4 red). The text
    is byte-identical before and after this round (CONFIRMED, this check's NO-SHIFT dump). It is the second copy of the
    arena's `assertStamp` text (note 15's remaining half), so the two can drift unseen.
    * **Suggested handling (M4):** pin the whole generation message (as `NO_OPEN` now pins the closed-overlay text), or
      a test that compares the façade's text with the arena's after the `kernel:` / `arena:` prefix.
18. **KI (closing check C1, resumed seat; M4) — the foreign-arena writer message's arena name is not pinned.** Own
    mutant KN7 (`onArena`'s `kernel: the transaction acts on the arena ${keyName(p.key)}, which this kernel does not hold
    (§3.4)` naming `${p.key.layer}` only) SURVIVES the five façade files (91/91); the same change on the pre-round
    `keyText` body (KN7b) survived the pre-round image (90/90) alike, so it is no shift of this round, and the text is
    byte-identical before and after (CONFIRMED, this check's NO-SHIFT dump: `… acts on the arena ground/0, which this
    kernel does not hold (§3.4)`). The other `keyName` messages are held (KN1 – KN6, K21 red). Equivalent survivors seen
    in the same sweep, no test needed: K05 (`closed !== false`: every overlay a transaction mints carries a boolean
    `closed`, `tx/tx.ts:116`); N11e (`arena/resolve.ts` `vertexAt` without its liveness test: an arena without an index
    holds no dead vertex slot — a fresh one has none and a decoded one is compact, probe: 3 dead slots before
    encode, 0 after decode — and a removal needs a transaction, which needs an index).
    * **Suggested handling (M4):** pin the whole text in `facade.test.ts`' foreign-overlay case, as `NO_OPEN` pins the
      closed-overlay text.
