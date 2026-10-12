# M0-d-04 — minor notes for the hardening milestone M4

These notes come from lane `check/M0-d-04` on 2026-10-05. None of them fails the item (J180); the blockers are in
`M0-d-04.md`.

1. **N-1 `digestLeaf`'s signature.** M0-work.json lists `digestLeaf(record)`. The code has
   `digestLeaf(entry, geometry)`, where `entry` is the record with its kind, id and identity, and `geometry` resolves
   its references in the arena. C-0194 (3)–(4) implies this but does not name the signature change. A sentence in
   C-0194, or §14's line at M1, would close it.
2. **N-2 Reach paths the oracle shows redundant.** Four mutants survived the fuzz, removal and regression sequences:
   K3 (the promoted and demoted vertices left out of `Ev`), K5 (`pairReg` lookups dropped), M1 (`changedEntities`
   ignored in `onDirty`) and M19 (`dirty.roles` entities ignored). Each path is either a safety margin or covered by
   another path on these runs. A fixture that needs each one alone would pin it. The model test "a record whose face
   changed beside a batch that never named it" does not isolate `changedEntities`, because the batch's own `owners`
   already names `plot:1` (M1 survives it). Either rename the test or find a fixture outside `owners`.
3. **N-3 The chain item's entity.** Mutant K12 (the entity dropped from the chain item's lanes) survived. The entity
   still reaches the digest through the bucket and the sort, but two keys that differ only in entity and land in the same
   bucket hash alike in their items. Add a test that renames one chain's entity.
4. **N-4 The records leaf's kind.** Mutant M23 (the record kind dropped from `recordsLeaf`) survived. It is equivalent
   at M0, because derivation (7 fields) and naming (2 fields) never share a lane stream. When M3a adds the `order` kind,
   a test should pin the kind.
5. **N-5 Naming records.** No test changes a naming record and checks that the records digest moves. It does, since the
   leaf writes `salt`, `epoch` and the slices, but the excluded-fields test only exercises a derivation record.
6. **N-6 The face sort key's ties.** Bucket items with equal `rank` keep their Map insertion order. The key is total for
   live level-m faces (§3.3), but a degenerate face (an outer ring with no vertex of level ≤ m) would fall back to
   [0, 0, 0, 0]. Asserting the key's uniqueness in debug builds would make that visible.
7. **N-7 Equivalent survivor M16.** M16 did not match the code (a bad match: the indentation). The behaviour it aimed
   at, the object key count, is covered by M26 (keys dropped, killed).
8. **N-8 The timing harness has no arena.** `timeDigest`'s recompute does not include the plats layer's level-digest
   recomputation (C-0194 (11)). M0-t-00 times the bar on the spike city with geometry. When the record is read, it
   should say which workload it timed.
9. **N-9 `isOwnChild`'s silent exclusion.** An own child that is also owned differently from its parent is kept in. A
   test with a re-owned materialised own child would pin that rule.
10. **N-10 Test-name precision.** "the oracle catches a stale leaf" catches a stale model leaf only. B-1's test will add
    the kernel half, and the name could say which half it covers.
11. **N-11 Importer reds seen outside scope.** On 2026-10-05, `testkit/test/kernel/arr-booleans-buffers/` (M0-a-08,
    busy) held seven scratch `zz-debug*.test.ts` files that fail, plus 5 reds in `agreement.test.ts`. This is a note for
    the session, not this item's.

## Closing round (lane `check/M0-d-04-close-r1`, 2026-10-05)

None of these notes fails the item. Each is a further hardening test, and the hardening milestone is M4.

12. **N-12 A chain's x coordinates.** Probe mutant K13x (`W.i32(0).i32(q[i])`, so a chain point's x is written as 0)
    survived the kernel digest tests (50/50) and the model digest tests (51/51). The fix round's chain-geometry tests
    move the way only in y (y = 2000 against y = 2100). Its twin K13y (y written as 0) was killed by both tests. To
    pin the x half, add a pair of arenas whose way differs only in x, for example a slanted street whose interior
    point moves east.
13. **N-13 A hole's geometry, beyond its presence.** Probe mutant K16c wrote each hole ring as its length only
    (`for (const h of holes) W.u32(h.length)`). It survived both suites (50/50 and 51/51). The new tests show that a
    hole enters the face's digest and that holes are sorted, but not that moving a hole moves the digest. Add a test
    in which the same face has its hole at two positions, for example `HOLES[0]` shifted by 100 in x.
14. **N-14 A face's kind at the model leaf.** K11 (the face kind written as 0) is now killed by the kernel test, as
    B-3 (a) asked. It still passes the model digest suite (51/51), because no model test retypes a face. The kernel
    test is enough for the promise. A model test that moves a leaf through a retype would pin the end-to-end path.

## Closing check of session round S1 (lane `check/M0-d-04-close-s1`, 2026-10-11; verdict in `M0-d-04-s1.md`)

None of these fails the item (the blocker rule of the lane's brief; N-45, J202): each is a test gap on code that does
what its claim says, an equivalent survivor, or another item's case.

15. **N-15 `ModelDigest.layer()`'s restore sync is unpinned (mutant M6).** C-0305 (2) names `layer` among the reads
    that follow a restore. Mutant M6 (`layer()` without `this.syncGenerations()`) passes the item's own tests
    (`Tests 121 passed (121)`). The code is right, CONFIRMED by this seat's mirror probe `zz-close-s1b.test.ts`: on the
    tree, `md.layer(l)` for every layer, straight after a restore across n = 1 and 3 committed batches (no commit, no
    re-attach, no other read), equals a fresh twin's layers and differs from the pre-restore ones (green); under M6 both
    cases are red (`2 failed`). No honest path reads `layer()` there today: the runner re-registers the arena
    (`addArena`) right after a rollback (C-0295). **Handling:** add `layer()` reads to model.test.ts's "read at once, no
    commit and no re-attach" pin. Hardening milestone M4, or the item's next touch.
16. **N-16 Equivalent survivors of round S1 (judged by this seat).** K2 (the listener's generation skip dropped) and
    K8 (its compare inverted): a foreign state the listener patches keeps its old generation, so the next read rebuilds
    it and counts the build, and `changedEntities` answers [] (it checks the update's generation); the patch path has
    no throw site but the role-name check, so only work differs. M7 (`addArena` does not note the generation), M8 (the
    sync never records the new generation) and M9 (the sync runs only at depth 0): extra re-hashes only, same digests.
    C-0305 (2)'s "O(arenas) per step when nothing moved" is a cost claim; M8 would break it silently, and no timing is
    taken on this machine. **Handling:** if the cost claim is to be held, a count pin (leaves re-hashed per commit after
    a sync) at the hardening pass, M4.
17. **N-17 The dead-image case reaches this item's key (cross-reference: `checks/M0-a-06-notes.md` N-24).** An image
    taken before an earlier cross-commit restore, put back at the version the arena has reached again, does not bump the
    restore generation, so the (generation, version) key names two contents. This seat's mirror probe
    (`zz-close-s1b.test.ts`, A taken, one commit, B taken, restore A, one commit, read, restore B) printed
    `generation 1; read===fresh false; read===seenB true`: the maintained level digests read stale. It is the kernel's
    case (M0-a-06's `restoreSavepoint`, N-24) and is not reachable by the runner, which uses its images last-in
    first-out (C-0295). **Handling:** with N-24's round (M0-a-06). Once the generation also moves there, this item
    needs no change. If that round instead refuses a dead image, this item needs nothing either.

## Consolidation round C1 (R6; lane `build/M0-d-04-consolidate-1`, 2026-10-12) — the builder's map and notes

The round applies `consolidation/model-tables-plan.md` §1.6 D-1 – D-5, §2 C-model-4 and §3.3 T-tests-2 to the MODEL half
of the owns (`model/src/digest/`, `model/test/digest/`); the kernel half (`kernel/src/digest/`, `kernel/test/digest/`)
is untouched (J270 (a), kernel-plan §1.12 D-1). D-3's branch: **R4 had landed** (`identity/lineage.ts` exports the
`unknown`-form `isU32`), so `leaf.ts` and `records.ts` import it by path.

**What changed, file by file** (no test file merged, renamed or moved; every `describe`/`it` title kept — 64 = 64,
`vitest list` before and after):

| old | new |
|---|---|
| `src/digest/model.ts` `writeHash` (5 call sites), `sameHash` (4 call sites) | `src/digest/encode.ts` `writeHash128`, `sameHash` (file-level exports, not in the index); `model.ts` imports both |
| `src/digest/leaf.ts:149` inline four lanes; `:88` inline `>>> 0` lane tests | `writeHash128(W, d)` (the count lane `W.u32(digests.length)` stays outside); `!isU32(lin[0]) \|\| !isU32(lin[1])` from `../identity/lineage.js` (the length test kept) |
| `src/digest/records.ts:87`, `:93` inline four lanes; `:54` inline lane tests | `writeHash128(w, l.hash)`; `w.utf8(p)` then `writeHash128(w, h)` (the partition lane stays outside); `isU32` from `../identity/lineage.js` |
| `src/digest/timing.ts:51` `same` | `sameHash` from `./encode.js` |
| comments: `index.ts:1–5`, `model.ts:19–22`, `canonical.ts:2–4`, `workload.ts:39` (the generator), `records.ts:2` (its own tags) | C-model-4: design statements citing C-0194, C-0305, C-0299, C-0287 (2), C-0295, §6.1, §6.2; no round, note or checker narration |
| `test/digest/leaf.test.ts:32`, `model.test.ts:12`, `records.test.ts:22` — three local `hex` | `test/digest/support.ts` `hex(h: Readonly<Hash128> \| null \| undefined)` (`String(h)` for null/undefined, as `model.test.ts`'s and `records.test.ts`'s gave); `leaf.test.ts`'s `reference()` writer kept local as the independent oracle |
| `test/digest/model.test.ts:2–5` header ("N-16", "Round s1 (N-56 (5) …)") | the rule as it stands (C-0299, C-0305); the describe title `'N-56 (5): a savepoint put back …'` kept verbatim (the checks cite it) |
| `leaf.test.ts` "refuses an entry holding another record, a malformed lineage …", `records.test.ts` "refuses … a malformed slice hash" | the `toThrow(RangeError)` lines kept; added the message pins over `[1.5, 0]`, `[0, 1.5]`, `[-1, 0]`, `[1, 2, 3]` (D-3's promise "messages unchanged" — see N-c1-1) |

**Mutant-kill map** (by title; nothing moved). K1 – K16 (round 1, kernel) and K1 – K8 (s1, kernel) → `kernel/test/digest/
levelDigest.test.ts`, untouched. M1 – M28 (round 1) and M1 – M10 (s1) → `leaf.test.ts`, `model.test.ts`,
`records.test.ts` under the same titles. Re-killed in this round's mirror with the consolidated tests (`--bail=1`, the
model digest folder): M2/M3/M5 (owned digests dropped, as A3/A4: "the leaves of the shaped records are the
snapshot's …"), M6 (pinned flag: "the header: kind, id, lineage, parent, existence and every flag move the leaf …"), M20
(lineage: "every M0 kind has its order and its layer …"), M27 (parent: the snapshot test), M28 (children dropped, A5:
"the oracle catches a stale leaf …").

**This round's targeted mutants** (29 in the mirror, one at a time, restored by copy and `cmp`): A1 (`writeHash128`
drops lane 3), A2 (lanes 0 and 1 swapped), A3, A4 (leaf owned digests), A5 – A9 (model node children, node leaf, layer
tops, root layers, plats level digests), A10, A11 (records node leaves, root node hashes), B1 (`sameHash` always true),
B2 (always false), B5 (timing oracle flag always cleared), H1, H2 (`hex` constant, lane 0 only), P1 (`canonical.js`
imported on the digest path: the source scan), E1 – E3 (M27, M20, M6) — **killed**; C1 – C5 (D-3: a lane test or the
length test dropped in `leaf.ts` / `records.ts`, `isU32` admitting any number) — **killed after the message pins**
(before them they survived, on the pre-round sources too: N-c1-1); A12, B3, B4, H3 — **survive**, each also on the
pre-round sources (N-c1-2, N-c1-3).

**NO-SHIFT evidence.** A probe (mirror only) over the pre-round sources and over the consolidated ones: every model leaf,
layer, root and oracle verdict of `syntheticCity` seeds 1, 2 and 97, every records leaf, node and root, three
re-derived districts each, `timeDigest`'s record under a fake clock; twelve fuzz seeds × three switch sets × sixteen
steps (both roots, the oracle, the eleven layers, the five kernel level digests, every way leaf); the refusal texts of
malformed lineages, geometry digests and slice hashes; the digest index's runtime export names — 80 690 lines,
**byte-identical** (sha256 `ee6d9b14…`). The pre-round tests on the new sources 64/64; the new tests on the pre-round
sources 64/64. The digest index's non-comment lines are identical (exports unchanged; the barrel untouched).

**Refusals (J264, N-58).** Digest operations over the registered families (the twelve fuzz seeds × three switch sets,
the three CITY seeds): **0 refused before, 0 after**. The fuzz generator's kernel batches refused `E_KEPT` 72 times per
switch set, identically before and after: an L1 insert crossing kept finer content — UNLAWFUL by §3.3's kept-content
rule, the kernel's typed REFUSE (M0-a-06/M0-a-07's), not this item's operation; the run skips the batch, and no §11.4
door hands a raw kernel batch to a user (the stages route their inserts). The probe's malformed-input corpus (20
cases): refused 20 before, 20 after, the same `RangeError` texts — UNLAWFUL (a lineage or slice hash is minted, never
typed by a user), REFUSE.

N-c1-1. **D-3's refusal text was unpinned** (CONFIRMED). The two oracle `it`s asserted `toThrow(RangeError)`, which
`LaneWriter.u32`'s own RangeError also meets, so dropping the leaf's or the records leaf's lane or length test (C1 – C5,
and their twins C1b, C2b, C4b on the pre-round inline tests) passed. The `[1, 2, 3]` case is the fail-safety one: without
the length test a three-lane lineage would be digested on its first two lanes. This round adds the message pins inside
the two `it`s (green on the pre-round sources, red under C1 – C5).

N-c1-2. **Equivalent or golden-only survivors** (PLAUSIBLE equivalent in output on honest input). B3 (`sameHash` on lane
0 only: two digests differing in lanes 1 – 3 alone is a 2⁻⁹⁶ event), B4 (`timeDigest`'s oracle flag cleared only when
both trees differ: the workload's trees never differ), H3 (`hex(null)` as zeros: no test compares a null digest's text
with a hash's).

N-c1-3. **The records root's partition lane has no golden** (CONFIRMED survivor A12, and A12b on the pre-round
sources). Dropping `w.utf8(p)` from `rootHash` changes the persisted records root but not its equality with the
recomputation (both use the writer), and the node hash already commits to the partition. The same holds for any change
of the node, layer and root writers' lane forms that both the maintained and the fresh paths share: only
`leaf-snapshot.json` pins persisted bytes (the leaves). This round kept every byte (the probe). **Handling:** a
roots golden (`syntheticCity(1)`'s model and records roots) at the hardening pass, M4, or with M1's stored root (§2.9).

N-c1-4. **A comment in another item's file is now incomplete** (for the session). `model/src/identity/lineage.ts:14`
says `isU32` … are shared by "the identity and matching modules"; the digest module now imports `isU32` too (D-3). The
file is M0-d-05a's: one word at that item's next touch ("the identity, matching and digest modules").

## Closing check of consolidation round C1 (lane `check/M0-d-04-consolidate-close-1`, 2026-10-12; verdict in `M0-d-04-c1.md`)

None of these fails the item under the lane's blocker rule. Each one is a citation slip that comes from the brief and
the plan, a test gap on code that is right, or another item's case. Each test gap also survives on the pre-round
sources. These are this seat's own mutants (X…), run in its own mirror.

N-c1-5. **The comments cite C-0305 for the restore-generation reading, but that row is now C-0308** (CONFIRMED by
reading `choices.md`). C-0305 is now M0-e-04's collinear-perimeter row. The digest row was renumbered to C-0308, whose
own text says "Renumbered from C-0305 (collision) … (J266)". The stale id appears in this round's rewritten comments:
`model/src/digest/index.ts:5` ("Readings … C-0194, C-0305", new in this round), `model.ts:19` and
`test/digest/model.test.ts:5`. It also appears in the kept describe title `model.test.ts:272`, in the untouched kernel
half (`kernel/src/digest/levelDigest.ts:34, 111, 648`, `kernel/test/digest/levelDigest.test.ts:5, 326`), in C-0330's
cited rows and in notes N-15 and N-16 above. The plan (§2 C-model-4) and the lane's brief both prescribed "C-0305", so
the builder followed them. The comments describe the code correctly; only the row id is wrong. **Handling (belongs
before M4):** the session replaces C-0305 with C-0308 in the item's comments at its next touch, for example the kernel
plan's R13 or a session doc sweep. The session also decides whether the two describe titles change, since J263 Q8 keeps
cited titles, and corrects the plan's C-model-4 text.

N-c1-6. **The plats node's level-4 lane is unpinned** (mutant X22, PLAUSIBLE equivalent on the item's families). In
`model.ts` `platsHash`, `[0, 1, 2, 3, 4]` → `[0, 1, 2, 3]` passes the model digest tests (`64 passed (64)`). It also
passes `bench/test/determinism` at 1000 (`51 passed (51)`), and its twin X22b passes on the pre-round sources. The fuzz
generator writes levels 1–3 only, so L4's digest never moves in a test. The code is right: it reads `[0, 1, 2, 3, 4]`,
and the NO-SHIFT probe is byte-identical. **Handling:** at M4, a pin that a level-4 commit moves the model root and the
`plats` layer.

N-c1-7. **The subtree oracle's identity comparison is unpinned** (mutant X25; its twin X25b also survives on the
pre-round sources). Dropping `if (!sameHash(this.layer(layer), identityHash(…))) mismatches.push(layer)` passes the
model digest tests. No test makes the identity layer stale under `subtreeOracle`. **Handling:** at M4, a stale
tombstone or event-block pin under `{ subtreeOracle: true }` that the oracle must name `identity`.

N-c1-8. **Survivors on the round's own helpers** (judged by this seat; overlap with N-c1-2 and N-c1-3).
* X4 and X7 (`sameHash` ignores lane 3 or lane 0): equivalent in output on honest digests.
* X27 and X28 (`timeDigest`'s flag reads one tree only; X27b and X28b survive pre-round): the workload's trees never
  disagree, so only fault injection could tell. X29 (the flag inverted) is killed.
* X15 (the records root's partition lane dropped) is the builder's A12 / N-c1-3. This seat confirmed it independently,
  and it also survives `bench/test/determinism` at 1000 (`51 passed (51)`). The node hash already commits to the
  partition. This seat's NO-SHIFT probe shows the bytes kept.

**Handling:** with N-c1-3's roots golden (M4, or M1's stored root). A direct unit pin of `writeHash128`'s lane order and
`sameHash`'s four lanes would close X4 and X7 too.

N-c1-9. **A fourth copy of the digest equality sits outside this item** (for the session's bench consolidation plan).
`bench/src/determinism/records.ts:29` `same` is the same four `===` as `encode.ts` `sameHash`. The file is M0-d-09's.
Model-tables-plan §1.6 D-2 does not list it, because the plan covers @plat/model and @plat/tables only. Whether the
bench should import a model file-level helper is a dependency-direction question (the lint's bench-boundary).
**Handling:** the bench's consolidation plan.

N-c1-10. **A foreign RELATED red, routed to the session with its seed.** `testkit/test/edge/repins.test.ts`
"EP-01/S8/zero-length at 2521534151: S8's seam-portals row refuses lawful input — refused-lawful, named, rolled back
(Q41)" now reads `expected 'laddered' to be 'refused-lawful'`. The once-refused lawful input now succeeds, which lowers
the refusal count. Replayed red identically in this seat's pre-round mirror (`Tests 1 failed | 23 skipped (24)`), and
the test file is the same as the tree's. It is not this item's: the pin is stale after another item's Q41 fix.
**Handling:** that item's next round re-pins the cell to its laddered outcome.
