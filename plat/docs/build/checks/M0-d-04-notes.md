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
