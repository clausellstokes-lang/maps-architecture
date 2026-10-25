# M0-s-01 — the check's minor notes (for the hardening pass; none of them fails the item)

These notes come from the closing check of M0-s-01 after the session's kernel reuse round. The lane was
`check/M0-s-01-close-s1` (flow flow-7, stage group S, 2026-10-07), and the round was opened on ruling J224 (lines A – E).
The verdict is in `checks/M0-s-01-s1.md`. Each row is minor under N-45 (J202). It fails safely, it is a deliberate-writer
escape, or it is a test gap on a promise that the checker's own probe confirmed holds today. Each row is tagged `KI` and
names its handling and its milestone. A "survivor" is one of the checker's 28 targeted mutants that left every test of
the `tools` project green (17 files, 237 tests, run in the checker's mirror with `--maxWorkers=1`).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 | **KI. No test checks that the build actually copies the notices (survivor MA5).** If the `copyNotices(root, dir)` call is deleted from `scripts/build.mjs`'s `main()`, all 237 tool tests stay green. `tools/notices/shipped.test.mjs` tests `copyNotices` and `bundleOptions` on their own, but it never runs the loop that calls them. The promise holds today, CONFIRMED: `corepack pnpm build` printed `build: esbuild @plat/kernel -> packages/kernel/dist/index.js (812248 bytes) + LICENSE, THIRD-PARTY-NOTICES.txt` for all six packages, and the packed tarball holds `dist/LICENSE` and `dist/THIRD-PARTY-NOTICES.txt` byte-identical to `plat/`. | Move the per-package body of `main()` into an exported `bundlePackage(platRoot, dir)` that both `main()` and the test call. Then test it against a temp copy, asserting that `dist/` holds `index.js`, `LICENSE` and `THIRD-PARTY-NOTICES.txt`. | M0's close (before any pack is handed out) |
| N-2 | **KI. No test checks that `checkKernelBoundary` fails on allowlist slack (survivor MD1).** If `...v.slack` is dropped from `checkKernelBoundary`'s problems, the tests stay green, so the "may only shrink" ratchet would stop failing on a stale row or an over-wide `max`. The test "fails a stale allowlist row" asserts `vocabularyProblems(...).slack` and does not assert the check's verdict. The promise holds today, CONFIRMED: plant P6 (one `tile` identifier renamed in `arr/tileRings.ts`) made the check fail with `arr/tileRings.ts ident "tile" now has 2 uses, the row caps 3: lower max`. | In that test, also assert `checkKernelBoundary(PLAT, { allow: loose }).ok === false`, and assert that the problem names the row. | M0's close |
| N-3 | **KI. No test checks that a dynamic `import()` in a KERNEL bench is caught (survivor MD14).** If the `import\s*\(` alternative is removed from `bench-boundary.mjs`'s `SPEC`, the tests stay green. The behaviour is right today, CONFIRMED: plant P10, `return import("@plat/layout")` in `bench/src/skeleton/zz-dyn.ts`, gave `a KERNEL bench (bench/src/skeleton) reaches @plat/layout`. | Add a dynamic-import line to the test's town-import fixture. | M4 |
| N-4 | **KI. Deliberate-writer escapes of kernel-boundary.** RegularExpression tokens are not scanned: `export const re = /street/;` in a new kernel file passed, CONFIRMED (plant P9a). A string split across a concatenation (`'str' + 'eet'`) and any town noun outside the owner's list (`castleKeep` passed, P9a) also pass; the second is by design. The comment exemption is also by design. | Also scan `RegularExpression` tokens, and extend the list only by an owner ruling. | M4 |
| N-5 | **KI. Escapes of bench-boundary.** A `require("@plat/layout")` in a KERNEL bench passed, CONFIRMED (plant P9b). `SPEC` matches only `from`, `import ` and `import(`; `createRequire` is unmatched too. A relative import into `packages/testkit/src/metrics/` (which reaches model and tables) passed (P9c). The header documents this as allowed through `@plat/testkit`, and the clean fix is the owner-gated `@plat/testkit/kernel` subpath. Cosmetic: one import is reported once per reaching file per folder (five identical lines for P3). | Add `require(` / `createRequire` to `SPEC`, follow relative paths into `packages/testkit/src/` and check them against testkit's own kernel-only parts, and de-duplicate the problem lines. | M4 (the subpath: owner) |
| N-6 | **KI (owner-gated before any publication). A packed `@plat/kernel` is not the kernel PLAT runs.** `corepack pnpm pack` writes `dependencies` `{"delaunator":"5.1.0","flatbush":"4.6.2","robust-predicates":"3.0.3","simplex-noise":"4.0.3"}` (registry versions, CONFIRMED by extracting the tarball). PLAT itself runs the vendored copies with C-0011's and C-0152's patches (flatbush's `**`, among others), so an outside install would run the unpatched upstream code. That is a determinism hazard for a reuser. The packed `exports` still names `"plat-source": "./src/index.ts"`, which the tarball does not hold. The tarball also ships 363 test declaration files (`dist/types/test/**`) and `dist/types/tsconfig.tsbuildinfo`. The package is `private`, and nothing is published at M0. | Before any publication: publish the patched vendored libraries under scoped names (or bundle them), drop `plat-source` from the published `exports`, and narrow `files` to `dist/index.js`, `dist/types/src`, the two notices and `API.md`. Changing the public surface is an owner call. | before first publication (owner) |
| N-7 | **KI. Nothing keeps `packages/kernel/API.md` current.** Today it is right, CONFIRMED by the checker's census. The TypeScript compiler lists 669 exports of `src/index.ts` (419 values, 250 types), and every one is in Appendix B. `dist/index.js` exports exactly the 419 values. Of the 106 `<!-- src/…:line -->` markers, 102 equal the cited source line exactly, 3 are condensed interfaces with the same fields, and 1 is a comment line. The worked examples re-ran with identical printed values. A later export or a moved line would make it drift silently. | Add a census test: the compiler's export list against Appendix B, and each marker's code against its cited line. | M1 |
| N-8 | **KI. A stale header in `packages/kernel/src/index.ts`** (M0-s-01's file). It still says "so the package exports nothing yet", but the package now exports 669 names. | Rewrite the comment. | M4 |
| N-9 | **KI. `vendor/xoshiro/f2x.c` is credited only collectively.** It carries its own 2026 dedication by Vigna. The xoshiro section of `THIRD-PARTY-NOTICES.txt` quotes `xoshiro128starstar.c`'s 2018 dedication. `f2x.c` is never ported or bundled; it is compiled only for the known-answer vectors (vendor/xoshiro/README.md), so no notice is owed. | Optionally name `f2x.c` in the credit body. | M4 |
| N-10 | **Session note (not this item's). A stray `plat/undefined.cur`.** It is 599 bytes, dated 2026-10-05 00:09, and is a JSON fuzz case (`{"i":199,"c":{"op":"difference","fill":"nonzero"…`) written under a file name built from an undefined variable. It is in no landed record. Also: the related run's one red, `packages/testkit/test/layout/growth-s5cd/drift-grown.test.ts` ("ribbon … over ≥ 100 windows"), belongs to M0-c-05's in-flight files. It timed out at 300 000 ms under load after printing passing values (`windows 646, p50 18.46, over90 2`); see the verdict's replay. | For the steward: find the writer of `undefined.cur` and remove the file; watch `drift-grown`'s runtime against vitest's 300 s timeout. | session |
| N-11 | **KI (round S2, lane `check/M0-s-01-close-s2`). No test pins a lane's row in the FIRST position of §2's table as accepted (survivor A6).** Mutating `strayLedgerRows`'s §2 exclusion from `k >= t.start` to `k > t.start` leaves all 37 `landed.test.mjs` tests green: the fixtures' first §2 row is always `build/m0-spec`'s, a lane that never lands in a test, and the committed-ledger test checks only the lane `build/M0-s-01-fix-s2`. The code is right today, CONFIRMED by the checker's probe (`strayLedgerRows` on a ledger whose first §2 row is the lane's returns `[]`; all 373 lanes of the committed §2 table give no stray). The mutant would fail safe (a false refusal with a message), so this is a pin gap, not a fault. | Widen the committed-ledger test to every lane named in §2's table (it then kills A6 on L-0001), or add a fixture whose first §2 row is the landing lane's. | M4 |
| N-12 | **KI (round S2). No test pins the refusal of an id-less lane row lying in no table (survivor A4).** Dropping the `seatColumn(lines, k) < 0` alternative from `strayLedgerRows` leaves the tests green: the blank-line stray of the test carries an `L-` id, so the `L-` alternative alone catches it. The code refuses such a row today, CONFIRMED by probe (`| ?? | check/a (x) | … |` after a blank line gives `[{"id":"line 15"}]`). A ledger row without an `L-` id already breaks the id rule (C-0104), so this is a deliberate-writer case. | One fixture row without an id after a blank line, expected refused as `line <n>`. | M4 |
| N-13 | **KI (round S2). The carry of an earlier landing is scoped to the same wave, and no test pins that scope (survivor B6).** Carrying from a previous record of ANY wave (`previous.wave === snapshot.label` dropped) leaves the tests green. The effect would be a record whose `lanes` list an earlier wave's lanes, and a claim of a line added in the new wave only when its hash equals a line the old wave's record claimed (a removed-and-re-added identical row). Both are contrived; the same-wave scope is C-0111 (4)'s and holds today by reading. | A fixture that re-lands a record against a later snapshot label and expects `lanes` to hold only the new wave's lanes. | M4 |
| N-14 | **KI (round S2). `landed:verify`'s wave close counts only the wave's records as claimants, and no test pins that (survivor V3).** Taking line claims from records of every wave (`read.records` for `ofWave`) leaves the tests green. A record of an older wave claims lines added since the older snapshot, so it can vouch for a line of the newer wave only when an identical line is re-added — contrived. | A fixture with an older wave's record claiming a hash that a newer wave adds again; expect the newer wave to name the line. | M4 |
| N-15 | **Equivalent survivors (round S2), no test needed.** B7 (only the first `appends` entry per file carried): `buildRecord` writes at most one entry per file, so the filter yields one entry at most. A14 (`ledgerTable` without the separator check): every honest §2 table has its separator row; without one there is no table, and `seatColumn` returns -1 for every row, so a stray would still be refused under the fallback column. | — | — |
| N-16 | **Session note (not this round's code). Under a flow label, M0-s-01's record claims module `index.ts` files whose ownership has passed.** `flow-7` names no wave of `M0-work.json`, so `buildRecord` resolves the item at its own wave 0 (C-0121's note), where the scaffold still owns every `packages/*/src/<module>/index.ts` (C-0013). The re-landed `landed/M0-s-01.json` therefore lists 30 changed or created module index files (for example `layout/src/districts/index.ts` with M0-e-04 s2's in-flight edit, `kernel/src/tx/index.ts`, `layout/src/infill/index.ts`). That is why `landed:verify -- flow-7 --item M0-s-01` passes now and failed before the re-landing (the state note's three files). Attribution, not a wrong committed result: the session stages by file. | For a snapshot label that names no wave, resolve the hand-overs at the latest wave, or skip a handed-over path whose receiver's wave is not after the item's (`ownersAt` with the receiver's wave). Session's choice (the state note's notes row). Also: `landed:verify -- flow-7` (whole wave) still names `CLEAN-ROOM.md:414` (L-0348, `check/M0-d-09`) as claimed by no record. The row lies inside §2, so the session must re-land `check/M0-d-09`'s record or claim the row by hand. | session |

## The consolidation round R2 (lane `build/M0-s-01-consolidate-1`, 2026-10-11; `consolidation/tools-plan.md`, J260, J263 Q8)

no file created or removed.

**Test map, old → new** (no test file merged, no test removed, every `describe` / `it` title kept verbatim; the tools project 248 → 249, the MA5 pin that J273 Q1 lets ride this round). Mutants are this round's, run one at a time in the seat's mirror with `--maxWorkers=1 --bail=1` on the file's folder (F-4's two on the `vitest.config.ts` projects probe).

| file | what changed | mutants it kills (red) |
|---|---|---|
| `landed/landed.test.mjs` | comments only (header, the two section comments; §2.2); fixtures' lane strings kept | A1-del, A1-del2 (`sameNow`'s deleted branch, S2's V1/V2 class), A2-false, A2-verify (`isRecordRel` in both tools), A3-weak (`validLabel` for an item id), A4-sep-false, A4-sep-undef, A4-seat-neg, A4-walk, A4-seat-col (the table grammar) |
| `notices/notices.test.mjs` | comments only (the C-0095 and the credits comment) | N1-gen (the notices' library order) |
| `notices/shipped.test.mjs` | header; + pin "runs the build's per-package step on a copy of a package: dist/ holds index.js and both notices" (`bundlePackage` on a temporary copy of `@plat/tables`) | MA5 (the notice copy dropped; N-1's survivor), MA5-bytes, MA5-build; MA2 (`legalComments: 'none'`) |
| `scaffold/workspace.test.mjs` | header; `SHIPPED` once at module level (F-1); `satisfies`, `barePnpm` no longer exported (F-2); F-3's comment | F1-drop, F1-order, F3-weak; C-0124's project graph G124-1 (a kernel test reference to the test kit), G124-2 (model's reference to the kernel dropped), G124-3 (a test project's include narrowed) |
| `vendor/verify.test.mjs`, `vendor/flatbush-patch.test.mjs` | untouched | — |

Old vs new modules on one tree (scratch scripts, the before-round `tools/landed/`, `notices/` and `vendor/common.mjs` beside the new ones): the 186 flow-7 re-landings (`buildRecord`, write off), `verifyWave` on flow-7 and six wave labels, `ledgerTable` / `seatColumn` / `strayLedgerRows` over the committed ledger and choices for 407 lanes, `listTree`, `statusOf` on every pair of entry shapes, nine bad item ids, the closures, `checkLicences` (with planted ties of name), `noticesText`, `listFiles` of every vendored folder and of `tools/`: identical; every record and snapshot under `docs/build/landed/` round-trips through `formatJson` byte for byte (237 files). Re-landing the 186 records refused 0 before and 0 after.

Mutant summary: 32 targeted mutants on the consolidated code, 23 red. The 9 survivors each survive on the before code too (replayed there with the before files in the mirror), so the round lost no kill; they are the KI rows N-17 – N-19 below.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-17 | **KI (round R2). `tools/landed` pin gaps found by this round's mutants, each surviving on the before code too.** A1-sym (`sameEntry` compares hashes for a symbolic link; before: the same in `sameEntry` and in `sameNow`): no test changes a link's text between the snapshot and the record. A1-undef (`sameEntry` without its `b !== undefined`; before: `sameNow` without `now !== undefined`): no test has a record's non-deleted file vanish before `landed:verify`. A2-nested (`isRecordRel` without the direct-child test; before: both copies): no test puts a file in a sub-folder of `docs/build/landed/` other than `snapshots/`. A4-sep-true (a table header counts without its separator row; before: `seatColumn`'s and `ledgerTable`'s copies, each alone), A4-seat-loose (`/seat/i` for `/^seat\b/i`; before: both copies) and A4-2a (`/^## 2/` for `/^## 2\s/`; before: the same): no fixture has a header-like row without a separator, a column named like `seats` or `reseat`, or a `## 2a` heading before `## 2 `. The code is right today by reading and by the old-vs-new comparison; every mutant but A1-undef fails safe (A1-undef throws, a visible failure). | One fixture each: a link retargeted after the snapshot (expect `changed` and a verify mismatch), a recorded file deleted before verify (expect a mismatch, no throw), a nested landed folder, a table row without separator, a `reseat` column, `## 2a` above `## 2 `. | M4 |
| N-18 | **KI (round R2). `checkLicences`'s name-then-version order has no test pin (N1-clo-ver, N1-clo-rev; both survive on the before comparator too).** Sorting the closure by version only, or versions descending, leaves the notices and lint licence tests green: the notices tests find an exception by name or compare a one-element failure list, and `lint/licences.test.mjs` pins only `report[0]` (the production line, sorted on its own), not the `dev exceptions:` line that follows `checkLicences`'s order (that line is held today only by the whole-tree lint output, compared line for line by this round's oracle). `THIRD-PARTY-NOTICES.txt` is unaffected (its order is `generate.mjs`'s own sort, pinned by "is committed as generated" — N1-gen red). | A planted dev map with two names and two versions of one name, expecting the exceptions in name-then-version order. | M4 |
| N-19 | **KI (round R2). `listFiles`'s final full-path sort has no pin (VT1-final; survives on the before code).** The walk lists `a/x` before `a.js`; `vendor:verify` compares the listing with the lock as a set, so dropping the sort changes no verdict, but the listing's documented order is unpinned. | A test listing a folder holding `a.js` and `a/x`, expecting `['a.js', 'a/x']`. | M4 |
| N-20 | **KI (closing check of R2, lane `check/M0-s-01-consolidate-close-1`). Four more `tools/landed` pin gaps, each surviving on the before code too (replayed on main's files in the checker's mirror).** A1-del-true (`sameNow` matching a `deleted` entry whatever the tree holds; before: the same branch of the old `sameNow`): no test re-creates a file a record lists as deleted. A2-false-landed (`buildRecord`'s not-owned walk without its `isRecordRel` skip; before: the private copy): no test lands a seat while another record lies in `docs/build/landed/`, outside the seat's owns. A4-ledger-cont (`ledgerTable` passing over a table without a separator row to the next table under `## 2 ` instead of returning null) and A4-col-sep (`seatColumn` without the separator test; before: the old inline copies): no fixture holds a separator-less table. The code is right today by reading and by the old-vs-new comparison over the real tree (234 records rebuilt, every wave verified, identical). A1-swap (`sameEntry(now, entry)`) and VT1-walk-rev (the walk's per-folder sort reversed; the final full-path sort restores the order) are equivalent. | One fixture each (a deleted file re-created before verify; a landing beside a foreign record; a separator-less table above §2's). | M4 |
| N-21 | **Session note (flow-7's close; not a gate of this item). The X-1 header edits are per-line claims (J273 Q2) that `landed:verify`'s wave close cannot accept.** `verify.mjs:170–171` accepts a removed line of an append file only when it is a placeholder line the record claims as removed; lines 1–2 of `packages/{kernel,model,layout}/src/index.ts` are not placeholders, so `corepack pnpm landed:verify -- flow-7` names six lines (`line 1` / `line 2 of the snapshot's file removed or edited`, CONFIRMED), although `landed/M0-s-01.json` lists the new lines and the old ones as `removed`. The `removed` hashes are honest (each equals `lineHash` of main's header line, CONFIRMED) but were written into the record by hand: `landed` itself builds `removed: []` for them (a round-trip of the record differs in exactly those three arrays, CONFIRMED with both the before and the consolidated tools). `--whole` was the tool's form and J273 Q2 forbade it. Related wording: `verify.mjs`'s header (c) says every removed line that no record claims is named, while a claimed non-placeholder removal is named too (pre-existing text, code unchanged). | The session attributes the six lines at flow-7's close; L12's round (Q3) or a later one decides whether `landed`/`landed:verify` take a per-line removal of a non-placeholder line, and words header (c) to match. | M4 (or L12's round) |
| N-22 | **Session note.** The kernel header (X-1) was edited at 13:16 while M0-a-01's consolidation lanes were open (close-1 to 13:17, consolidate-2, close-2 to 13:24; M0-a-01 owns `kernel/src/num/`). No barrel line of a module folder was touched and M0-a-01's record claims no line of `kernel/src/index.ts` (`landed:verify -- flow-7 --item M0-a-01` ok, CONFIRMED), so nothing collided; the builder's lane-log reading at 13:12 listed site, tables and testkit as busy and missed kernel. | None for the item; a reminder for the lane-log reading of J273 Q2. | — |
| N-23 | **KI.** `tools/vitest/tiny-sentinel.mjs`'s new last header sentence "The thrown message is pinned text." — no test pins the text; it is kept verbatim by J263 Q6's rule, not by a test. | Say "kept verbatim (J263 Q6)" or add a test that runs the sentinel with the mode unarmed and matches the message. | M4 |

## The closing check of session fix round S3 (lane `check/M0-s-01-close-s3`, 2026-10-11; queue row L12, C-0318)

The verdict is in `checks/M0-s-01-s3.md` (PASS). The rows below are not blockers under N-45 (J202): N-24 is a session
note on the specified reading, N-25 fails safely, N-26 records the two survivors the checker judged equivalent.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-24 | **Session note (the specified reading; not a defect of this round).** A label that names no wave now reads every wave as open, so a GIVER whose file passed to a receiver that has not landed loses its claim on its next re-landing. Re-landing all 197 flow-7 records with the round's tools (write off) changes the file lists of exactly five other items, CONFIRMED: M0-a-08 `kernel/src/arr/index.ts` (to M0-a-09, landed), M0-x-02 `layout/src/pipeline/index.ts` (to M0-x-04, landed), M0-f-02a `bench/src/tier-jobs/index.ts` (to M0-f-02b, not landed), M0-f-03a `tables/data/workLimits.json` (to M0-f-03b, not landed) and M0-k-06 `testkit/baselines/denylist-allow.json` (to M0-k-07, wave AFTER-M-1 (a), not landed). The records on disk still verify (238 per-item verifications identical old vs new), and flow-7's close is unchanged for these files. But if M0-f-03a edits `workLimits.json` in a flow round and re-lands, `landed` names the file as outside its owns, and the close names it unattributed until M0-f-03b lands. `tools/flow_stage.mjs` uses the same reading (`ownersAt(…, Infinity)`), so the two tools agree. | The session decides. One option: under a non-wave label, resolve to the latest owner that has a landed record of that label, else the latest earlier owner, and apply the same rule in `flow_stage.mjs`. The other: route such an edit to the receiver's round. Decide before M0-f-03a, M0-f-02a or M0-k-06 re-lands under a flow label. | session |
| N-25 | **KI. A folder owner's edit of its own barrel line is claimed only by the package index's owner.** `buildRecord` gives the index's owner (the scaffold) every removed line of the snapshot's index (`removed` when `ownIndex`), including a module folder's line. `verify.mjs` accepts an index-line removal only from a record whose item owns the index. So if a folder owner changes its own line (`export * from './x/index.js'`), its record claims the new line, but the old line is named at the close until the scaffold re-lands. The scaffold's record would then vouch for another lane's removal. This fails safely: the close names the line and never passes it silently. CONFIRMED by reading `landed.mjs:528` and `verify.mjs:163–178`. | Let a folder owner's record claim the removal of its own folder's line (C-0064's exact form, the folder it owns), in both `landed` and `verify`. Keep the index owner's removals to lines that are not a module folder's. | M4 |
| N-26 | **KI (equivalent survivors, no test needed).** M7: dropping `folder === null ||` from the index owner's claim (`landed.mjs:509`) survives. `folderMine(null)` resolves `packages/<p>/src/null/index.ts`, which only M0-s-01 owns on the committed `M0-work.json` (CONFIRMED for all six packages). So the mutant differs only for an index owner that lacks the `<module>/index.ts` pattern, and no such owner exists. V4: letting a declared record's `removed` vouch for an index line (`verify.mjs:164`) survives. A declared record whose id is an item already fails step (a) (`verify.mjs:100`), and any other declared id finds no item, so the mutant is equivalent. | None. | — |

## Hardening round S4 (lane `build/M0-s-01-fix-s4`, 2026-10-19; J237 (2), J423 batch B11; C-0389)

The session's hardening round of M0-s-01 over the inventory's FIX-NOW rows `M0-s-01:49 N-17`, `:50 N-18`, `:51 N-19`,
`:52 N-20`, `:55 N-23`, `:65 N-25`, `M0-spec:28 N-17` and this item's parts of the queue rows L14, L15 and L24. Each
row's outcome, its pin (a test red without the fix) and the mutant that pin kills. The mutants ran one at a time in the
lane's mirror with `--maxWorkers=1 --bail=1` on the family's test folder, each file restored and compared with `cmp -s`
before the next one: **40 targeted mutants, 40 killed** (`W-wave` was first aimed at M0-e-04's own wave, a no-op, and
re-aimed). A **before-code replay** (the round's tests over the tool sources as they stood before the round) is red on
exactly the 7 tests of the behaviour changes (N-25, L24, L15, the four main-script tests). The other pins hold promises
that were already kept, so the mutants are their evidence.

| row | outcome | pin (test) | mutants killed |
|---|---|---|---|
| N-17 (`M0-s-01:49`) | **pinned**, six fixtures | `landed.test.mjs` "the hardening round's pins …": a link retargeted after the snapshot (`changed`) and after the record (a mismatch); a recorded file gone before verify (a mismatch, no throw); a file in `docs/build/landed/extra/` declared and claimed; a separator-less table; a `seats` / `reseat` column before `seat …`; `## 2a` above `## 2 ` | A1-sym, A1-undef, A2-nested, A4-sep-true, A4-seat-loose, A4-2a |
| N-20 (`M0-s-01:52`) | **pinned**, four fixtures | the same describe: a deleted file re-created before verify (the item's mismatch, the close names it); a landing beside another seat's record (its notes name no record); §2 whose first table lacks the separator (no ledger table, `null`, the lane's rows refused); the separator-less table's rows unclaimed | A1-del-true, A2-false-landed, A4-ledger-cont, A4-col-sep |
| N-18 (`M0-s-01:50`) | **pinned** | `notices.test.mjs` "lists the exceptions and the failures by name, then version (code-unit order)": a planted map `zz-b@1.0.0`, `zz-a@2.0.0`, `zz-a@10.0.0` gives `zz-a@10.0.0, zz-a@2.0.0, zz-b@1.0.0` | N1-clo-ver, N1-clo-rev |
| N-19 (`M0-s-01:51`) | **pinned** | `verify.test.mjs` "lists a folder's files in full-path code-unit order: a.js before a/x" | VT1-final |
| N-23 (`M0-s-01:55`) | **pinned** (the test, not the rewording) | `tools/vitest/tiny-sentinel.test.mjs` (new): the sentinel imported with `PLAT_TINY_TABLES=1` and the mode unarmed throws the message verbatim; armed, or with the variable `''`, `0`, `true` or `11`, it passes. The header now says where the text is pinned | S-msg, S-cond |
| N-25 (`M0-s-01:65`) | **fixed** (verdict change, declared in C-0389 (1)) | `landed.test.mjs` "a folder owner claims the removal of its own folder's index line": M0-a-01 removing `export * from './num/index.js';` claims the removal and the scaffold does not; the close accepts it; the same removal in the index owner's record alone is named. Under `wave-0` the scaffold, holding `num/index.ts`, claims it | N25-L, N25-V, N25-V-at |
| M0-spec N-17 (`M0-spec:28`) | **fixed**: the validator ported | `tools/scaffold/m0-work.test.mjs` (new, 8 tests): the rules W, D, O, V1 – V3 over the committed `M0-work.json` (0 problem lines) and over a small work file with one planted break per rule | W-dep-later, W-v1-drop, W-same-wave, W-after, W-count, W-wave, W-v2, W-v3; the O rule's `MW-O` survived the closing check and is pinned by fix round S5 (below: MW-O, O-before and 7 more) |
| L14: N-11 – N-14 | **pinned** | `landed.test.mjs`: the lane's row first in §2's table is accepted, and an id-less lane row in no table is refused as `line <n>` (N-11, N-12); a re-landing under a later label carries no earlier wave's lanes (N-13); an older wave's claim on a re-added row is no claim at the newer wave's close (N-14) | A6, A4-idless, B6, V3 |
| L14: the "is main" test | **fixed** (CLI behaviour through a symbolic link, declared in C-0389 (3)) | `workspace.test.mjs` "the main-script test of the scaffold's tools" (the census of the helpers and of the seven CLIs' guards; the scripts' helper through a link; `bench.mjs` spawned through a link exits 64 on an unknown harness); `landed.test.mjs`, `verify.test.mjs`, `notices.test.mjs`: each family's CLI spawned through a link runs | M-landed, M-common, M-vendor, M-notices, M-bench, M-build |
| L14: N-2, N-3 | **REPORTED**: another item's files | `tools/lint/kernel-boundary.test.mjs` and `bench-boundary.test.mjs` are M0-d-07's (`plat/tools/lint/` in its owns; neither file is in M0-s-01's landed record). Rule (1) of the round sends both pins to M0-d-07's round | — |
| L15: N-4, N-5 | **REPORTED**: another item's files | `tools/lint/kernel-boundary.mjs` (RegularExpression tokens) and `bench-boundary.mjs` (`require(`, `createRequire`, relative paths into the test kit) are M0-d-07's | — |
| L15: the fdlibm placeholder branch (tools-plan.md N-3 (c)) | **fixed** (verdict change, declared in C-0389 (2)) | `notices.test.mjs` "refuses to write the notices without Sun's notice: a missing or empty NOTICE.txt throws, naming it (L15)", and the retitled "holds Sun's notice once and never the placeholder …" | FD-placeholder |
| L24 | **fixed** inside `tools/landed/` (`flow_stage.mjs` is outside `plat/` and the item's owns) | `landed.test.mjs` "a file created after the snapshot and deleted since is listed as deleted (L24)" | L24, L24-lane, L24-was |

**Tests changed (map).** `landed/landed.test.mjs` 46 → 61 (+15; the header gains one sentence; every earlier title is kept).
`notices/notices.test.mjs` 15 → 18. One title changed with its behaviour: "holds exactly one of the fdlibm placeholder and
Sun's notice, as vendor/fdlibm-5.3/NOTICE.txt's presence says" is now "holds Sun's notice once and never the placeholder:
vendor/fdlibm-5.3/NOTICE.txt has landed (C-0095, L15)". The test "takes Sun's notice in place of the placeholder …"
keeps its title, but it no longer builds a placeholder text, and it compares the libraries' part with the committed
generation. The new tests are N-18, L15 and the link. `vendor/verify.test.mjs` 6 → 8. `scaffold/workspace.test.mjs`
37 → 39. New files: `scaffold/m0-work.test.mjs` (8) and `vitest/tiny-sentinel.test.mjs` (2).

**Zero shift on the real tree (old vs new `tools/landed/`, write off).** The round re-landed all 356 records under
`docs/build/landed/` with the before and the after tools. All 356 came out identical except their date, and none was
refused before or after. `landed:verify` gave identical problems, notes and summaries on flow-7 and the six wave labels,
both for the whole close and for each of the 356 records. `THIRD-PARTY-NOTICES.txt` is unchanged (`notices:check` ok);
the lint's output is unchanged; the build prints its six lines.

**Refusal census (J264 / N-58).** The families are the `landed` / `landed:verify` re-landings and verifications of the
real tree and the notices generation. The refusal sites are: `landed.mjs` 17 → 17; `verify.mjs` 20 + 2 → 20 + 2;
`vendor/verify.mjs` 12 → 12; `generate.mjs` throws 1 → 2. The added throw is L15's declared refusal. Its input is
UNLAWFUL: a tree whose `vendor/fdlibm-5.3/NOTICE.txt` is missing or empty after Sun's notice has landed. Its verdict is
REFUSE. The alternative is the file itself: M0-d-03's vendored notice, restored from the repository. A repair would have
to guess the notice. Lawful-input refusals: 0 → 0 (356 re-landings, 0 refused before and after). N-25 accepts at the
close a removal that it used to name, from the folder's owner only, so it lowers that naming count.

**Session notes (not this round's code).**

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-27 | **Session note (L24).** `landed` now lists as `deleted` a file that an earlier landing of the record listed and that is gone now, even though the snapshot never held it. Only the same lane's re-landing carries such an entry: a later round's landing assumes that the session committed the deletion with the previous round. If two rounds are committed together, the second round's record no longer names the first round's deletion. In the other direction, `tools/flow_stage.mjs` (outside `plat/`, not read by this seat) may meet a deleted path that git does not track: one created and deleted between two commits. | `flow_stage.mjs` stages a record's `deleted` path with `git rm --cached --ignore-unmatch` (or skips a path not tracked at HEAD). The session commits each round before the next one lands, as it does now. | session |
| N-28 | **Session note (N-25).** At the wave's close, `landed:verify` now accepts the removal of a module folder's exact C-0064 line only from the folder's owner at the label. The index owner's record no longer vouches for another owner's folder line. No committed record does that today: old vs new verify is identical over every label. A folder line in any other form (with trailing white space, or not exact) stays with the index owner, because the snapshot keeps only line hashes. | None. A future owner who reformats its line claims the new line and leaves the old one to the index owner, as before. | — |
| N-29 | **KI (equivalent survivors: none).** Every one of the 40 mutants was killed. The rows the round REPORTED (L14's N-2 and N-3, L15's N-4 and N-5) have no mutant here, because their files are M0-d-07's. | M0-d-07's round. | M4 |

## The closing check of hardening round S4 (lane `check/M0-s-01-close-s4`, 2026-10-19)

The verdict is in `checks/M0-s-01-s4.md` (FAIL on one line: the validator's O rule, `MW-O`). The rows below are not
blockers under N-45 (J202): N-30 records two survivors that fail safely or change no verdict, N-31 one survivor the
checker judged equivalent on every honest input. The checker's mutants ran one at a time in its own mirror
(`scratchpad/waves/check-M0-s-01/s4/ma`) with `--maxWorkers=1` on the family's test files.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-30 | **KI (closing check of S4). Two survivors on L24's new code, each failing safe or changing no verdict.** L24-unclaimed (`!gone.has(path) &&` dropped from `buildRecord`'s not-owned branch): a path the record's earlier landing listed, gone now and no longer the item's (its ownership moved since) is then named as an unclaimed change and `landed` refuses, visibly; no test has a gone path change owner. L24-snap (`before.has(f.path) ||` dropped from the `gone` filter): a snapshot file the earlier landing listed as `changed` and deleted since is still listed `deleted`, only its `was` becomes the last recorded hash instead of the snapshot's; no tool reads `was` (CONFIRMED by search inside `plat/`), so no verdict moves. CONFIRMED: both mutants leave `landed.test.mjs` green. | Two fixtures: a gone path whose folder passes to another item between the landings (expect no refusal, no listing); a snapshot file changed, landed, deleted and re-landed (expect `was` = the snapshot's hash). | M4 |
| N-31 | **KI (equivalent survivor, no test needed).** N25-V-at (`verify.mjs`'s folder-owner resolution at the label alone, `const at = W`, without C-0121's own-wave reading) leaves the tests green. It differs only for an item landing before its own wave under a wave label and removing its own module folder's barrel line; C-0121 lets only run items land early and no run item owns a `packages/*/src/<module>/` folder on the committed `M0-work.json`, and under every flow label `W` is infinite, so the mutant is equivalent on every honest input. | None. | — |

## Fix round S5 (lane `build/M0-s-01-fix-s5`, 2026-10-19; the closing check of S4's one failing line; C-0390)

The closing check of S4 (`checks/M0-s-01-s4.md`) failed one line, `M0-spec:28 N-17`: in the ported validator, the O
rule's scaffold clause excused every overlap between the scaffold and an item that any `handsOver` line names, whatever
the path. The checker's data mutant `MW-O` (M0-d-07 also owning `plat/tools/landed/landed.mjs`) left "passes the
committed docs/build/M0-work.json" green. Its probe found the same for M0-d-03 + `plat/package.json` and for
M0-k-05 + `plat/vitest.config.ts`.

**Outcome: fixed.** In `tools/scaffold/m0-work.test.mjs`, a `handsOver` line now excuses an overlap only when it names
the receiver **and** the path the two items own in common. That path is the narrower of the two patterns, or a folder
above it, written as a whole path with or without `plat/`; a folder is written with its closing `/`. The
`<module>` / `<harness>` clause is kept. The fix is stricter than the checker's variant (`s4/probe/m0-work-tight.test.mjs`).
That variant tests whether a line contains either entry's text, so a receiver taking `plat/tools/` was still excused
by any line holding the word `tools`. The closing `/` also stops the prose "every bench harness folder's index.ts → …"
from naming `bench/`. Without it, M0-b-05, M0-c-07 and M0-t-00 could take `plat/bench/package.json` and four more
scaffold bench paths without a problem line.

**Evidence.**
- The committed `M0-work.json` still gives 0 problem lines.
- The checker's probe (`s4/probe/o-probe.mjs`, run on the new file) names all three escapes, each with one `O …` line.
  M0-a-02 (no hand-over) taking the same file is named as before.
- The checker's three data mutants, planted in the lane's mirror's `M0-work.json`, each turn "passes the committed
  docs/build/M0-work.json" red.
- A sweep put each of the 10 receivers that the scaffold's `handsOver` names on each of the scaffold's 41 plain `owns`
  entries (410 cases). 408 are named. The 2 excused are the handed paths themselves: M0-d-03 +
  `THIRD-PARTY-NOTICES.txt`, which its own entry also declares "handed over from", and M0-d-07 +
  `tools/lint/index.mjs`.

**Pin.** The new test is "O: a scaffold hand-over excuses its receiver only on the path the hand-over line names
(checks/M0-s-01-s4.md, MW-O)". It runs over the small work file. The file's scaffold now owns `plat/tools/vitest/` and
`plat/tools/lint/index.mjs`, and it hands `plat/tools/lint/index.mjs` to M0-k-01, which owns `plat/tools/lint/`. The
test checks four cases:
- the receiver taking `plat/package.json` gives exactly one `O …` line;
- the receiver taking `plat/tools/` gives exactly one `O …` line, against `plat/tools/vitest/`;
- folder hand-overs give no problem: `plat/tools/vitest/ → M0-a-01`, and `tools/vitest/fuzz/ → M0-e-01` for a folder
  inside a scaffold folder;
- a line that names the path with another receiver gives one `O …` line.

The test is red on the S4 clause (mutant O-before). `passes its own small work file` stays green.

**Mutants** (in the lane's mirror; each file restored and checked with `cmp -s`; `--maxWorkers=1 --bail=1` on
`tools/scaffold/`): **10 targeted on the clause, 8 killed, 2 equivalent; the checker's 3 data mutants all killed.**

| mutant | change | killed by |
|---|---|---|
| MW-O (data; with MW-O2 for M0-d-03 + `plat/package.json` and MW-O3 for M0-k-05 + `plat/vitest.config.ts`) | M0-d-07 also owns `plat/tools/landed/landed.mjs` in `M0-work.json` | "passes the committed docs/build/M0-work.json" (each of the 3) |
| O-before | the S4 clause: the line names the receiver, any path | the new O test |
| O-checker-substr | the checker's variant: the line contains either entry's text | the new O test (the receiver taking `plat/tools/`) |
| O-no-receiver | the line names the path, any receiver | the new O test (another receiver) |
| O-broader | the broader pattern taken as the common path | "passes the committed docs/build/M0-work.json" |
| O-no-boundary | a plain substring test in place of the whole-path one | the new O test |
| O-no-slash | a folder named without its closing `/` | the new O test (the prose word "tools") |
| O-no-above | the common path alone, no folder above it | the new O test (the folder hand-overs) |
| O-module-dropped | the `<module>` / `<harness>` clause dropped | "passes the committed docs/build/M0-work.json" |
| O-any-path | either pattern (and the folders above it) named, not only the narrower one | **equivalent**: the two patterns overlap by prefix, so the broader one is the narrower one or a folder above it, and the sets of accepted paths are the same |
| O-plat-alone | the folder walk goes down to `plat/` itself | **equivalent**: the empty path can only match `plat//` or a bare ` /`, which no line holds |

**Refusal census (J264 / N-58).** The round changes no tool, only the validator test. The refusal sites of `landed`,
`landed:verify`, `vendor:verify` and `notices` are unchanged: 17, 20 + 2, 12 and 2 throws. Lawful-input refusals stay
0 → 0. The validator itself names 3 more lines on the three escapes, which are UNLAWFUL work files, and 0 on the
committed one.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-32 | **KI (contrived escape, fails visibly elsewhere).** One `handsOver` line can name several receivers and several paths, as in `plat/bench/src/scan/index.ts → M0-k-06, plat/bench/src/parity/index.ts … → M0-k-05`. The rule does not check which receiver each path goes to, so on such a line M0-k-05 taking `bench/src/scan/index.ts` would be excused. On the committed file every such path is a `<harness>` index, so the `<harness>` clause excuses it anyway, and `landed`'s latest-owner reading gives the path to its latest owner either way. | Pair each path with the receiver after its `→`, if a later round splits the lines. | M4 |
| N-33 | **KI (closing check of S5, lane `check/M0-s-01-close-s5`; equivalent survivor, no test needed).** O-wild-ok (`namesPathOrAbove` returning true on a path through a wildcard segment, in place of skipping it) leaves `tools/scaffold/m0-work.test.mjs` green. Only the scaffold's `<module>`/`<harness>` entries carry wildcard segments in `M0-work.json`, and the `<module>`/`<harness>` clause excuses their overlaps before the hand-over line is read, so the result differs only for a planted receiver entry holding a wildcard. | A planted receiver entry with a `*` segment over a scaffold path, expecting one `O …` line, if receivers ever own wildcard entries. | M4 |

## Session fix round S6 (lane `build/M0-s-01-fix-s6`, 2026-10-25; J451, J468; C-0417)

The session opened this round on two required changes: **N-24** (row 64 above; ruled by J451) and **Q96**
(`docs/M0-FIX-QUEUE.md`, given to this round by J468). Both are fixed inside M0-s-01's owns, and each has a test that
pins it.

### N-24: a receiver without a record never claims under a label that names no wave

**The reading.** Under a wave label, ownership is unchanged: `ownersAt`, the latest owner of an open wave. Under a
label that names no wave (`flow-N`, `session-…`), a handed-over path now goes to the latest owner that has a landed
record of that label. If no owner has one, it goes to the earliest owner, the first giver. Some details:
- The landing item counts as having a record, so a receiver takes the path over the moment its own record lands.
- A receiver with no record never claims, and neither does a middle owner of a chain that has none.
- Co-owners of one wave claim together, as before.
- The code is `claimantsAt(work, path, W, landed)` and `landedItemsOf(root, label)` in `tools/landed/landed.mjs`.
  A record counts when it is `docs/build/landed/<id>.json`, its `item` names its file, and its `wave` is the label.

`landed` uses the reading for a file's claim, a folder's package-index line, and the owner named in a `--touched`
refusal. `landed:verify` reads it the same way:
- for a removed folder line (who vouches for it);
- for a giver's entry on a path whose receiver has landed since and whose receiver's entry matches the tree. That
  entry has **lapsed**: it is a note ("handed over to …, whose record claims it now; …'s entry has lapsed (N-24)"),
  not a mismatch. Without the receiver's matching record, or under a wave label, it stays a mismatch. Without this
  clause, the new reading would give a giver a false red as soon as its receiver lands and edits the file.

**Old tools against new (CONFIRMED).** Each of the 364 flow-7 records on disk was re-landed (write off) with the old
tools and with the new, using the record's own item, lane and declared owns.
- **359 re-landings are identical.**
- 5 differ, each only by **gaining handed-over paths, no file lost and appends identical**:
  - M0-f-02a: `bench/src/tier-jobs/index.ts`, created
  - M0-f-03a: `tables/data/workLimits.json`, changed
  - M0-k-06: `testkit/baselines/denylist-allow.json`, created
  - M0-s-01: 11 module and harness `index.ts` files whose owners have no flow-7 record, all unchanged:
    `bench/src/{calibrate,fusion,fusion-ng,host,timing,timing-phase,worklimits}/index.ts`,
    `kernel/src/{hash,registry,rng}/index.ts` and `testkit/src/fuzz/index.ts`
  - M0-s-02: 5 table data files whose receivers have no flow-7 record, all unchanged: `tables/data/{bands,cut,granularity,interior,regimes}.json`
- **All 364 per-item verifications (`--item`) are identical**, problems and notes.
- N-24's earlier five (M0-a-08's `arr/index.ts` and M0-x-02's `pipeline/index.ts`) are not among the differences: their
  receivers M0-a-09 and M0-x-04 have flow-7 records.

**The whole-tree close.** In the tree, `corepack pnpm landed:verify -- flow-7` names exactly the three paths this
reading returns to givers that have not re-landed since. This round does not re-land them; their own rounds do:
`bench/src/tier-jobs/index.ts` (M0-f-02a), `packages/tables/data/workLimits.json` (M0-f-03a) and
`packages/testkit/baselines/denylist-allow.json` (M0-k-06). Their records were written with the old tools, which
dropped the paths. The reading alone cannot attribute them, because the close attributes a file only by a record entry
that holds its hash. In the lane's mirror (a copy of the tree, the new tools), re-landing those three givers and
M0-s-01 makes the close **green: "landed:verify flow-7: ok — 364 records, 1638 changed paths, 1638 attributed"**
(CONFIRMED). So no other cause leaves a path unattributed.

**`tools/flow_stage.mjs`: the edit the session applies at the landing** (outside plat/, not in the owns; checked with
`node --check` on a scratch copy and never run, since it runs git). Line 24 imports the two new functions and no longer
needs `ownersAt`:

```js
import { claimantsAt, landedItemsOf, lcsDiff, ledgerTable, loadWork, ownsMatch } from '../plat/tools/landed/landed.mjs';
```

Line 51 (`busyOwners`):

```js
const LANDED = LABEL ? landedItemsOf(PLAT, LABEL) : null; const busyOwners = (path) => claimantsAt(work, path, Infinity, LANDED).filter((id) => BUSY.has(id));
```

With `--label` given, a busy item holds a path out only when it is the path's claimant under the reading: a busy
receiver with a record, or a busy giver whose receiver has none. Without `--label` it is the old reading exactly
(`landed` null gives `ownersAt`).

### Q96: the run seed is printed once, and a re-run with it draws the same cases

**Before.** `fast-check.setup.mjs` set no seed when PLAT_FUZZ_SEED was unset. fast-check then drew a fresh seed for
every run (`Date.now() ^ Math.random()·2³²`) and printed none of them. So a red reached through counts, not a thrown
`fc.assert`, could not be replayed.

**The obvious fix breaks a contract between items.** Setting the global seed when PLAT_FUZZ_SEED is unset would break
two readings of the test kit. `fuzzParams` (M0-k-01) and `replaySeed` (M0-k-03, L18) take a global seed to mean
"PLAT_FUZZ_SEED replays". Every H32 family seed would then become the run's random seed, and the fixed family seeds of
L10 and L18 would turn nondeterministic. fast-check's default export has non-configurable getters, so it cannot be
patched either.

**After.**
- `tools/vitest/fuzz-seed.global.mjs` is the vitest global setup, wired in `vitest.config.ts` (`test.globalSetup`).
  It runs once per run in the main process. When PLAT_FUZZ_SEED is unset, it chooses one fresh 32-bit seed, prints
  `seedLine(seed)` to stderr once, and provides it to the workers (`provide` / `inject`, key `platFuzzRunSeed`).
- `fast-check.setup.mjs` replaces `fast-check` (`vi.mock`, every test file of every package project) with the library
  plus wrapped `assert`, `check`, `sample` and `statistics`. These hand the run seed to every run whose parameters and
  global configuration give no seed: exactly the seed a re-run with PLAT_FUZZ_SEED set to it gives that run. A
  property with its own seed keeps it.
- The global configuration keeps no seed, so `fuzzParams` and `replaySeed` read the run as unseeded, as before.
- With PLAT_FUZZ_SEED set, the global setup provides nothing and the mock returns the library itself. So **no suite's
  draws change under a set seed.**
- `PLAT_FUZZ_SEED` is still read back by `fuzzSeed`, which has moved to `fuzz-seed.mjs` and is re-exported from the
  setup.

The pinned line:

`fast-check: PLAT_FUZZ_SEED is unset; this run's seed is <S> — every property without a seed of its own draws from it, and a re-run with PLAT_FUZZ_SEED=<S> draws the same cases (Q96, C-0057)`

A family with its own seed replays unseeded, as it did before.

**Pins** (`tools/vitest/fuzz-seed.test.mjs`, 6 tests):
- the line's text;
- the choice: fresh only when unset, a 32-bit value, a malformed value refused with the setup's message, and the
  printed seed reads back unchanged;
- the hand-in rules;
- the wrapped module: the same draws as the seed given by hand, for all four runners; every other export is the
  library's own; the global seed stays unset;
- the workspace configuration: the global setup is wired, and every package project loads the setup;
- a **nested vitest run** over `fixtures/run-seed/` (two files, two forked workers):
  - unset: exactly one line is printed, and both files' unseeded `assert` and `sample` draws equal fast-check's at the
    printed seed. Their own-seed sample is unchanged, the global seed is `null`, and the runners are wrapped.
  - re-run with PLAT_FUZZ_SEED set to the printed seed: no line is printed, the draws are identical, the global seed is
    the printed one, and fast-check is the library itself.

A cross-section of the package projects under the new setup ran at PLAT_FUZZ_RUNS=1000, W=1: **24 files, 245/245**.
It covered the test kit's `fuzz/seeds`, `oracles/budget` and `budget-arm` (`vi.doMock`, `vi.resetModules`);
`determinism/permute-control` (`vi.mock`); the kernel's `invariants/debug` (`resetModules`), `hash/lanes`,
`num/bfuzz`, `tx/restore` and `faces/bent` (`vi.mock`); layout's `infill/planner/determinism` and
`pipeline/base/guard`; bench's `skeleton/runner` (`node:fs` mock); and the tables' `workLimits` and site's `water`
folders. Every package suite's draws under an unset seed move from fresh per-run seeds to the printed one: the
milestone-end whole-suite run is the first to see all of them.

### Self-check, gates and refusals

**Mutants.** The mutants ran in the lane's mirror (`/home/user/maps-scratch/waves/selfcheck-build-M0-s-01-fix-s6`,
isolation shown), with `--maxWorkers=1 --bail=1` over `tools/landed` and `tools/vitest`. Each file was restored from
the tree and compared byte for byte. **32 targeted mutants: 30 killed, 2 equivalent.** Three first-pass survivors (L8,
V3, Q15) were each pinned by a new test and then killed.

| mutant | change | killed by |
|---|---|---|
| L1 | `claimantsAt` always `ownersAt` (the old reading) | the giver/receiver tests |
| L2 | no group with a record → the latest group, not the earliest | "the giver claims its handed-over file …" |
| L3 | a group claims only when **every** member has a record | the co-owner case of `claimantsAt` |
| L4 | the landing item not counted as having a record | the receiver's first landing (several) |
| L5 / L6 | `landedItemsOf` ignores the label / the item-names-its-file check | "landedItemsOf: …" |
| L7 | folder lines by `ownersAt` | "a folder's index line under a label naming no wave …" |
| L8 | the `--touched` refusal names `ownersAt`'s owner | "names the claimant of a chain when it refuses a touch …" (new) |
| L9 | the record reading applied under a wave label too | "claimantsAt: … a wave label as ownersAt …" |
| L10 / L11 | `mine` by `ownersAt` / an empty record set | the giver/receiver tests |
| V1 | verify's folder vouching ignores the records | "a folder's index line …" |
| V2 | the lapse accepts a receiver's entry that does not match the tree | "landed:verify: a giver's entry lapses …" |
| V3 | the lapse taken even when the record's item is still a claimant | "… keeps a co-owner's stale entry a mismatch" (new) |
| V4 / V6 | no lapse / the lapse reported as a problem | "landed:verify: a giver's entry lapses …" |
| V5 | the record set also built under a wave label | **equivalent**: under a wave label `claimantsAt` ignores it, and a record built by `landed` at a wave label lists only what its item owns there, so no lapse can arise |
| Q1 | the mock never wraps | the nested run |
| Q2 | the mock wraps without checking PLAT_FUZZ_SEED | **equivalent**: with PLAT_FUZZ_SEED set the global setup provides `null`, so the `typeof … === 'number'` check alone already returns the library |
| Q3 / Q4 | the line printed twice / no seed provided | the nested run |
| Q5 | the global seed set when unset (the contract-breaking fix) | the nested run (`globalSeed: null`) |
| Q6 / Q7 | the hand-in ignores the global seed / the run's own seed | the hand-in test |
| Q8 | the line's text | the pinned line |
| Q9 / Q12 / Q13 | no `\| 0` on the chosen seed / on PLAT_FUZZ_SEED; the fresh range unsigned | the choice test |
| Q10 / Q11 / Q14 | `statistics` / `check` / the named exports left unwrapped | the wrapped-module test |
| Q15 | `globalSetup` dropped from `vitest.config.ts` | "runs fuzz-seed.global.mjs once per run …" (new) |

**Before-code replay.** The new tests were run over the old sources: `landed.mjs`, `verify.mjs`, the setup and the
config, with the old reading behind the two new names. They are **red on exactly the 13 behaviour-change tests** (11
in `landed.test.mjs`, 2 in `fuzz-seed.test.mjs`). They stay green on "a wave label's reading is unchanged" and on the
pure-part tests.

**Refusals (J264 / N-58).** The refusal sites are unchanged: `landed` 17, `landed:verify` 20 + 2 mismatch sites (a
mismatch becomes a note only when a landed receiver's matching record has taken the path over), and the setup family 2
throws (`fuzzRuns`; `fuzzSeed`, now in `fuzz-seed.mjs`). Lawful-input refusals stay **0 → 0**. A malformed
PLAT_FUZZ_SEED is UNLAWFUL input, refused with the same text as before, now in the global setup as well, which fails
the run before any worker starts.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-34 | **KI (fails safely in the session's tool).** Under the reading, a giver's record can list a handed-over path whose receiver has not landed. Once the receiver lands and edits it, the giver's entry has lapsed. `landed:verify` reads that as a note, but `tools/flow_stage.mjs` stages a record's files only when the tree still matches, so committing that giver's record afterwards reports "the tree no longer matches". The staging refuses; it never stages a wrong file. | In flow_stage's file loop, skip a path whose claimant under the reading (`claimantsAt(work, f.path, Infinity, LANDED)`) does not include the record's item, as a hand-over, in the same way as `busyOwners`. | session |
| N-35 | **KI (scope of the evidence).** The setup's `vi.mock` of fast-check reaches every package test file. This round ran a 24-file cross-section and its own nested run, not the whole suite (J193). | The milestone-end whole-suite run confirms it. | M0 end |
| N-36 | **KI (closing check S6, `check/M0-s-01-close-s6`; a test gap on a contrived input).** `landed:verify`'s lapse (`takenOverBy`, `tools/landed/verify.mjs`) is not pinned to the path's *claimant*: the checker's mutant V8 (drop `claimants.includes(r.item)`) survives `tools/landed` and `tools/vitest`. It differs only on a chain of three or more owners under a wave-less label whose file reverted to a middle owner's recorded state after the last receiver landed (the giver's `--item` check then reads a lapse instead of a mismatch); the whole-tree close attributes the file the same either way, and on any two-owner hand-over the mutant is equivalent. | One case in `landed.test.mjs`: chain G → R → R2 under `flow-N`, R and R2 landed, the file reverted to R's hash — G's `--item` verify stays a mismatch. | M4 |
| N-37 | **KI (closing check S6; a test tightening).** `freshSeed`'s freshness is unpinned: the checker's mutant Q15 (`freshSeed = () => 42`) survives — the choice test checks only the 32-bit range and the read-back. The code is fresh (`randomInt` over 2³²; five runs of this check printed five different seeds: 736504618, -1824331528, -491848320, 182536329, 1923920166). A constant would freeze every PR run's unseeded fuzzing to one seed: deterministic and replayable, so it fails safely. | In `fuzz-seed.test.mjs`: 64 `freshSeed()` draws are not all equal (or two `chooseRunSeed()` calls differ). | M4 |
| N-38 | **KI (closing check S6; usability of the replay line).** A red in a family-seeded property (`fuzzParams`, M0-k-01) is replayed by a plain re-run, not by `PLAT_FUZZ_SEED=<the printed seed>`: a set PLAT_FUZZ_SEED replaces every family seed (C-0057's "the replay wins"), so that re-run draws other cases and may go green. The pinned line's "every property without a seed of its own" is accurate, but a reader can misapply it. | Say it in the line or in README's test section: "a property with its own (family) seed replays without PLAT_FUZZ_SEED". A line change re-pins `fuzz-seed.test.mjs`. | M4 |
| N-39 | **KI (closing check S6; contract between items, M0-k-03).** `replaySeed()` (`testkit/src/oracles/refusal.ts`) still reads only fast-check's global seed, so a refusal recorded in an unset run carries `seed: null` although the run now has a printed seed every unseeded property drew from. It fails safely (null was the value before Q96), but the refusal record does not carry the replay. | M0-k-03's owner (or the session): `replaySeed()` falls back to the injected run seed (`platFuzzRunSeed`) when the global seed is unset; one test in the refusal oracle's folder. | M4 |
| N-40 | **KI (closing check S6; draw diversity).** Under an unset seed every unseeded run in a vitest run now uses the one run seed, as under a set PLAT_FUZZ_SEED. So two unseeded `fc.sample` calls in one test draw from one stream (e.g. `testkit/test/oracles/report.test.ts:166` and `:173`: the tuples' integer components are correlated), where before each call drew its own fresh seed. Every case is deterministic and replayable, so it fails safely, and diversity across runs is unchanged. | If wanted, a deterministic per-call seed (H32 of the run seed and the call's index) keeps the replay law. Otherwise a sentence in C-0057. | M4 |
| N-41 | **Equivalent survivors (closing check S6).** V1 (verify's record set also counts declared records): a declared record never carries an item id of `M0-work.json`, because `landed` refuses one and verify flags one, so `claimantsAt` never meets it. Q11 (the mock wraps without checking PLAT_FUZZ_SEED): with PLAT_FUZZ_SEED set the global setup provides `null`, so the `typeof … === 'number'` check alone returns the library. | none | — |
