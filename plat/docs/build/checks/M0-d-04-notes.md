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

## Hardening round S2 (lane `build/M0-d-04-fix-s2`, 2026-10-19; choices C-0387) — the builder's row-by-row outcome

The session's hardening round of the item (J237 (2)) on the inventory's FIX-NOW rows and the re-triage's rulings (J423:
N-6 KEPT; N-16 DEFERRED to M4, report only). Mutants ran one at a time in this lane's mirror with
`vitest run --maxWorkers=1 --bail=1` over both digest test folders (the item's own: `kernel/test/digest/`,
`model/test/digest/`), each file restored from the tree and checked with `cmp`. "Killed by" names the first red test.

| row | outcome | evidence (pin, or text) | mutant → verdict |
|---|---|---|---|
| N-1 `digestLeaf`'s signature | FIXED (text) | C-0387 (1) names `digestLeaf(entry, geometry)` as the item's `digestLeaf(record)`; `leaf.ts`'s doc says it | — (choices row) |
| N-2 reach paths | PINNED (K3, M1, M19), 2 equivalent | kernel "a promotion moves a face no dirty face names …" (the north L2 face is in no dirty face list and `owners` lacks its owner; only the record's `promoted` reaches it); model "a record whose face a promotion changed, in a batch that names it nowhere (owners, roles) …" (`changedEntities` alone); model "the model's own reach is the batch's owners and roles (§3.3) …" (the kernel half missed: `changedEntities` answers [], so `roles` and `owners` alone); the old test renamed to say its batch names the plot in `owners` | K3, K3a (promoted) → killed; M1 → killed; M19, M19o (`owners` dropped) → killed; K3b (demoted alone), K5 (pair registrations) → survive: PLAUSIBLE equivalent (N-s2-1) |
| N-3 the chain item's entity | PINNED | kernel "a chain's entity enters its chain item: 65 arenas …" (65 entities over 64 buckets: by pigeonhole two share a bucket, where only the entity lane tells their items apart) | K12 → killed (and by the arena golden, model folder alone) |
| N-5 naming records | PINNED | records "a naming record: its salt, its epoch and each cited slice move its leaf, its node and the records root" | N5m (a naming record's fields skipped) → killed |
| N-6 the face key's ties | FIXED + PINNED | `sortItems` refuses two face items with one key (message pinned verbatim); kernel "two faces of one level that share a sort key are refused …" (every vertex written to L4 in place: both L1 faces read [0, 0, 0, 0]; the level and the FaceRef both refuse) — red on the pre-round source (the reconstructed pre-round `levelDigest.ts`: `1 failed | 136 passed (137)`, that test only) | N6m (the check off), N6r (the FaceRef's own sort) → killed |
| N-9 `isOwnChild`'s re-owned child | PINNED | kernel "an own child re-owned is its own face again: it enters its level's tree, and leaves it when owned back" (L0, L1 equal; L2 – L4 move; owned back: every level as before) | N9m (the owner comparison dropped) → killed |
| N-10 the test's name | FIXED (title) | "the oracle catches a stale model leaf (the kernel half: the test above): a record changed in place without its write" | — (title) |
| N-12 a chain's x | PINNED | kernel "a chain's x coordinates enter its chain item: a slanted way whose bend moves 2 m east …" (ChainRef, with and without the ordinal) | K13x → killed (and by the arena golden) |
| N-13 a hole's place | PINNED | kernel "a hole's place enters its face item: the same face with its hole 1 m east, or 1 m north …" (three FaceRefs distinct) | K16c → killed |
| N-14 a face's kind at the model leaf | PINNED | model "a face's kind reaches its owner's leaf: two arenas equal but for one face's kind …" (leaf and root) | K11 → killed by the kernel test, and by this model test alone (model folder only) |
| N-15 `layer()`'s restore sync | PINNED | model 'read at once, no commit and no re-attach' (all six): the eleven `layer()` reads first, equal to a model registered now (under `deferLeaves` the plats node; the leaves wait for the boundary by design), the plats node (and, undeferred, the network node) unlike before the restore | M6 → killed |
| N-16 C-0308 (2)'s cost claim | REPORTED (DEFERRED to M4, J423) | no counter on `ModelDigest` (none built); the timing record carries it | M8 → survives (state confirmed) |
| N-c1-3 persisted roots | PINNED | `roots-golden.json` (recorded on the pre-round sources): syntheticCity(1)'s model root and layers, records root and nodes (records "the persisted roots of syntheticCity(1) …"); the arena's root, layers, five level digests (model "the persisted model root over an arena …"); `writeHash128`'s order and `sameHash`'s lanes (leaf.test.ts, two) | A12, RN1, NL1, LL1, RL1, A1, A2 → killed (golden); X4, X7 → killed (unit) |
| N-c1-6 the plats L4 lane | PINNED | model "an L4 commit moves the plats node and the root, and L0 – L3 stay …" | X22 → killed (and by the arena golden) |
| N-c1-7 the subtree oracle's identity | PINNED | model "the subtree oracle compares the identity node: a lifecycle event changed in place …" (subtrees: `['identity']`; root mode: `['root']`) | X25 → killed |
| L30 (with M0-m-01) | KEPT, no change | `workload.ts`'s frozen `LIFE` is the synthetic workload's constant, not a record writer (queue Q87: "M0-d-04 none") | — |

Mutants: 28 over both folders (25 killed; K3b, K5, M8 survive) and four replays over the model folder alone (K11, K12,
K13x killed; K16c survives there, killed by the kernel test). No output shift: every new test is green on the
reconstructed pre-round kernel source but the N-6 pin; the golden was recorded on the pre-round sources.

**Census (J264, N-58).** Digest operations over the registered families — model fuzz 12 seeds × 3 switch sets × 16 steps
(2 880 operations), kernel fuzz 38 sequences (5 420), syntheticCity 1, 2, 97 (24): **0 refused before, 0 after**, the probe's
output byte-identical. Kernel batch refusals in those families, the kernel's own and unchanged: model fuzz `E_KEPT` 72 per
switch set (UNLAWFUL by §3.3's kept-content rule, REFUSE, as in round C1); kernel fuzz `E_KEPT` 130 and `E_INVARIANT` 4 —
`55433/9`, `2264834/17`, `3310142/5` (a random `stretch` of a way into two parts, more than it declares: §3.10 role
consistency) and `42865547/28` (a removal leaving a vertex within minEdge of an edge: §3.10 clearance) — the generator's
random batches refused by M0-a-06's batch-local invariants, typed and rolled back; no §11.4 door hands a raw kernel batch to
a user. The round's one new refusal class, two face items with one key, is UNLAWFUL (no lawful arena holds it) → REFUSE.

N-s2-1. **K3b and K5 are safety margins** (PLAUSIBLE equivalent, by reading `updateLevelDigests`). A vertex demotes only
when a row at it leaves or moves to a finer level; that row's key is in `dirty.roles`, and step (3) adds its old item's
vertices to `Ev`, so the demoted vertex is reached without `record.demoted.vertices`. Every item registered on a pair is
also registered on both its end vertices, and an item's hash changes only through a dirty face (step 1), a named key
(step 3) or a vertex whose level, flags or place changed (step 2, `Ev`); the pair registrations add no reach those lack.
Both stay: a fail-safe margin costs O(touched).

N-s2-2. **For the session: the stale C-0305 citations (N-c1-5) are untouched** by this round; its new comments and titles
cite C-0308 or C-0387 only.

**Gates (the builder's, at W=1).** install --frozen-lockfile 0; lint 0 (probe-red ok, 9 whole-tree checks); build 0; NEAR
(`kernel/test/digest/`, `model/test/digest/`) 5 files 137/137; RELATED@1000 over `kernel/src/digest/levelDigest.ts` and
`model/src/digest/leaf.ts`: 410 files, 5476/5478 (exit 1). Its two reds are one test in two projects, foreign:
`kernel/test/insert/step3-5/sliver.test.ts` "Q53: corridorUnion over the three-chord sliver commits healthy …" in
`|kernel|` and `|kernel-tiny|` (corridorUnion's band/blocks classes differ from the pin: received band [4, 1, 3, 5, 2],
blocks [0], wholeBand [1, 3, 2]); identically red in a mirror with `levelDigest.ts` set to the pre-round source, so not
this round's (the tree's in-flight kernel edits of other items). The first RELATED run (08:03) died with the container at
09:33 and was re-run whole.

## Closing check of hardening round S2 (lane `check/M0-d-04-close-s2`, 2026-10-19; verdict in `M0-d-04-s2.md`)

This seat's own mutants (Y…) and probes ran in its own mirror (`scratchpad/waves/check-M0-d-04/`). The blocker this check
found (B-1, the maintained level digests miss a re-parented child on the removal path) is in the verdict file, not here.
These rows are not blockers.

N-s2c-1. **`isOwnChild`'s kind clause is unpinned** (CONFIRMED survivor Y7b). Dropping
`p.faces[m].kind[f] === p.faces[up].kind[parent] &&` from `kernel/src/digest/levelDigest.ts` `isOwnChild` passes both
digest folders (`Tests 137 passed (137)`). N-9's new pin holds the owner half only (Y7, the owner comparison dropped, is
killed). The code is right: §2.2 rule 2's own child is of the parent's kind and owner. **Handling:** a pin in which a
materialised own child is retyped in place (for example `FACE_KIND_RESIDUE`, as the N-14 pin writes it) and must enter its
level's tree, then leave it when retyped back. M4, or the item's next touch.

N-s2c-2. **For the session: the blocker B-1's kernel half** (cross-item; `kernel/src/tx/relevel.ts` is M0-a-06's).
`facePass` re-parents a freed record's children to the survivor (`relevel.ts:1025`, `Fu.parent[c] = sv.f`) and does not
list them in the commit record. The insert path does list them (`insert/rewalk.ts:575`: "§3.6 step 5: 'the commit record
lists them' — a re-parented record is in the batch's dirty set at its level … as `changed`"). This seat's mirror probe F2
(`t.log.faces[up].changed.push(c)` beside that write) turns B-1's repro green. So does F1 (inside this item's owns: the
digest re-reads the children of every removed record). The 3 000-sequence probe under F1 gives no mismatch. **Handling:**
the session rules which half is fixed (or both); B-1's failing line names both.

N-s2c-3. **Kernel batch refusals the wider probe met** (kernel's, not this item's; outside the registered families). In
3 000 sequences of the kernel fuzz generator (1 500 × 30 steps DEFAULT_MIX from seed 104 729·s + 3, 1 500 × 24 steps
ALONG_MIX from seed 1 299 709·s + 11; 80 982 batches): `E_KEPT` 29 460, `E_INVARIANT` 564, and `E_DEGENERATE` 3 —
seeds `115935006` step 6, `454898161` step 17, `1655829277` step 19, each "insert lane L2" refused with the detail `empty`
(PLAUSIBLE: the generator's two random lane points give a chain with no extent — UNLAWFUL, the kernel's typed REFUSE;
not replayed further by this seat). Digest operations
refused: 0 of 50 955 reads (the maintained and the fresh state at every level). **Handling:** none for this item; the
seeds are for the session's census of the kernel's own classes.

Re-run on 2026-10-20 (the same lane, resumed under the CONTINUE RULE in a new container): Y7b survives again
(`Tests 137 passed (137)`); B-1 and its fix probes F1 and F2 re-confirmed (`M0-d-04-s2.md` section 3).

## Fix round S3 (lane `build/M0-d-04-fix-s3`, 2026-10-20; choices C-0388) — the builder's outcome on the closing check's B-1

The closing check of round S2 (`M0-d-04-s2.md`) failed the item on one line, B-1: on the item's own oracle sequence
`oracleRun(44_509_828, 12, DEFAULT_MIX)` the maintained L2 – L4 digests differed from the recomputation after step 11
(`stretch (rekeyed)`, L1). Mutants ran one at a time in this lane's mirror (`waves/selfcheck-build-M0-d-04-fix-s3`,
isolation proved: no link into the tree, `@plat/kernel` resolving inside the mirror) with
`vitest run --maxWorkers=1 --bail=1` over both digest folders, each file restored and checked with `cmp`.

| row | outcome | evidence (pin) | mutant → verdict |
|---|---|---|---|
| B-1 a child re-parented on the removal path | FIXED + PINNED | `levelDigest.ts` `updateLevelDigests` step (1a): every child of every removed level-m record (m < 4), read from `st.children[m + 1]`, joins the faces re-read, so its item carries its new parent and `placeFace` judges its own-child standing on the survivor. Pin: kernel "a removed record's children are re-read: a re-level that re-parents them unlisted keeps L2 – L4 as recomputed (B-1, seed 44509828)" (the verdict's repro, `oracleRun(44_509_828, 12, DEFAULT_MIX)`). On the pre-round source in the mirror it fails with the verdict's message and digests: `seed 44509828 step 11 (stretch (rekeyed), L1)`, maintained `7ce7fb7b…`, `c216a1ab…`, `b59419c9…` against recomputed `1234d1cc…`, `784008cf…`, `a5c8617e…` (L0, L1 equal); with the fix, NEAR `Tests 138 passed (138)` | F1m (step (1a) removed: the pre-round source) → killed; F1n (`d.changed` read in place of `d.removed`) → killed; F1q (the children re-read at the parent's level) → killed; F1r (removed records of level 0 only) → killed — each by the pin |

No output shift: the fix changes which items are re-read, not any item, lane or node form; the recomputation is
untouched, and the persisted goldens (`roots-golden.json`, `leaf-snapshot.json`) stay green (NEAR). The maintained
reading now equals the recomputation where it did not (a correction, C-0388).

**Wide probe (informative, mirror).** 10 000 kernel fuzz sequences under the fix (8 000 × 30 steps `DEFAULT_MIX` from
seed 104 729·s + 44 509 828, 2 000 × 16 steps `ALONG_MIX` from seed 1 299 709·s + 17; 272 000 level reads): mismatch 0,
digest refusals 0. A smaller run of the same generator (1 500 × 14 steps `DEFAULT_MIX`, 500 × 16 steps `ALONG_MIX`) met no
mismatch on the pre-round source either: B-1 is rare, and the pin is its one known sequence.

**Census (J264, N-58).** The kernel fuzz family with the pin's sequence added (39 sequences): before (pre-round source)
`digestRefused 0, mismatch 1` (`44509828/11`), after `digestRefused 0, mismatch 0`; the kernel batch refusals unchanged,
seed for seed (`E_KEPT` 132 — the 130 of round S2 and 2 in the new sequence — and `E_INVARIANT` 4 at `55433/9`,
`2264834/17`, `3310142/5`, `42865547/28`). Model fuzz (12 seeds × 3 switch sets × 16 steps) and syntheticCity 1, 2, 97:
0 refused before and after (`E_KEPT` 72 per switch set, the kernel's). **Digest refusals 0 → 0: not risen.** B-1 was a
wrong maintained reading, never a refusal. The wide probe's kernel batch refusals (`E_KEPT` 99 223, `E_INVARIANT` 1 986,
`E_DEGENERATE` 6 — seeds `115935006/6`, `447507020/25`, `542182036/17`, `630468583/1`, `798453899/26`, `841916434/1`) are
the kernel's own classes, outside the item's registered families, and unchanged by this round (the same counts' kind as
N-s2c-3); for the session's census of the kernel.

N-s3-1. **For the session (N-s2c-2 stands): the kernel half of B-1** is not this item's file. `kernel/src/tx/relevel.ts`
(`facePass`, `Fu.parent[c] = sv.f`) still re-parents a freed record's children without listing them, unlike
`insert/rewalk.ts`'s "the commit record lists them". The digest no longer depends on it (step (1a)); another commit
listener that reads `dirty.faces` for a record's parent may. The session rules whether M0-a-06 journals the re-parent.

N-s3-2. **Step (1a) reads removed records only.** A record that stays live but loses a child to another parent without
listing it would not be covered; the kernel journals no such move today (the insert path lists its re-parented records as
`changed`, and relevel's re-parent is from a freed record). The wide probe met none. A hardening note for M4, not a fix.

**Gates (the builder's, at W=1).** install --frozen-lockfile 0; lint 0 (probe-red ok, 9 whole-tree checks); build 0
(`tsc -b ok`); NEAR (`kernel/test/digest/`, `model/test/digest/`) 5 files 138/138; RELATED@1000 over
`kernel/src/digest/levelDigest.ts`: 410 files, `Tests 2 failed | 5477 passed (5479)` (7 678 s), the two reds the known
foreign pair — `kernel` and `kernel-tiny` `test/insert/step3-5/sliver.test.ts` Q53 — red identically in the mirror with
`levelDigest.ts` at its pre-round source (`Tests 1 failed | 2 passed (3)`), so not this round's; no B-FUZZ or J176 file
red. The mirror's `node_modules` and the mirror itself removed after.

## Re-check 3 (closing checker, lane check/M0-d-04-close-s3, 2026-10-20)

B-1 confirmed FIXED + PINNED (verdict `checks/M0-d-04-s3.md`). One new row, not a blocker:

N-s3c-1. **The B-1 pin holds step (1a) at level 1 only.** This seat's mutant F1s (step (1a) applied to removed level-1
records only) survives NEAR (`138 passed`) and a 5 001-sequence wide probe of the item's generator (4 000 × 30 steps
`DEFAULT_MIX` from seed 104 729·s + 7 777 777, 1 000 × 16 steps `ALONG_MIX` from seed 1 299 709·s + 99, plus the pin's
sequence). Not equivalent in principle (a removed level-0, -2 or -3 record's re-parented children need the same re-read),
but no sequence of the item's generator reaches one. The same probe on the pre-fix source found two further independent
B-1 sequences, both at L1 and both cleared by the fix: `260488854/23` (`stretch (rekeyed)`) and `370140117/13`
(`remove way`). Suggested handling: add the two sequences as regressions and a constructed removal at another level that
re-parents unlisted children, pinning F1s. Hardening, M4.
