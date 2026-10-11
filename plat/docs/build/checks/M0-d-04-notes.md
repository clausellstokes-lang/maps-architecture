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
