# M0-a-15 — the checker's minor notes (for the hardening milestone M4)

Lane `check/M0-a-15`, 2026-10-05. These notes do not fail the item (J180). The one blocker is in `checks/M0-a-15.md`,
which also uses the mutant ids (C…) and probe ids (P…, KP…, TP…) below.

1. **A loaded arena's next operation is not identical in full.** C-0207 (5) states this and the renumbering test
   bounds it. A face row stores its canonical key, not the record's stored `outer` start. So after a load, the next
   batch's commit record can name the other part of a split as `created` and `changed`, and its `work` can move by up
   to 2 ring reads. The arena, digests and codes stay equal. §3.3's "identical results for the same next edit" lists
   compaction, long sessions and pool merges, not a load, and compaction is identical in full. M4, or M0-a-05's owner,
   should decide whether the re-walk's `work` should stop depending on the stored start.
2. **C35 and C34 survive: the loaded `outer` and `out` starts are not pinned by any test.** C-0207 (5) says the load
   "gives each record its key's half-edge as `outer`". A load that starts at the ring's last half-edge (C35), or sets
   `out` to the last half-edge in the angle order (C34), passes every test, because the renumbering test tolerates
   start-dependent differences. A unit test that checks `outer` is the key's half-edge after a load would hold the
   reading.
3. **C37 survives: the partition of a level-ℓ row on a level-ℓ vertex is untested.** C-0207 (4) puts it in the
   vertex's own partition. No test arena has a vertex row at L2 – L4 in a partitioned arena: CITY's knots are all on L1
   ways. Writing those rows to the `OUTSIDE` chunk passes everything. Add an L2 lane with width knots (or a gate row) to
   the CITY-shaped arena and check its district chunk.
4. **The constructive round trip runs 4 seeds per case** (`SEEDS = 4`; a swept case runs the first 4 of its sweep). The
   whole set at the tier sizes is M0-k-04's run (C-0110, C-0122), so this is not a narrowed bar. The test's header
   could say so, citing C-0122's sentence.
5. **C18 survives: `opts.digests` is not distinguished from the fallback.** `digests.test.ts` reads `levelDigest` after
   `decodeArena(…, { digests: true })`, but `levelDigest` recomputes when nothing is attached, so a load that ignores
   the option passes. Check `hasLevelDigests(r.value)` too.
6. **C39, C40 and C47 survive: three corrupt-cache guards have no crafted negative.** The guards refuse a vertex flag
   outside pinned | steiner | split, a split vertex outside its edge's span, and a vertex of the wrong level for its
   chunk. They are reachable only through a re-hashed malformed chunk, which is beyond the listed "tampered chunk"
   test, a hash mismatch. Add three crafted chunks to `corrupt.test.ts` in the `craft()` form.
7. **The kernel's random arenas never write an L4 split** (C50 survives the kernel tests; the testkit's constructive
   cases kill it). One L4 chain ending on a coarser edge in `roundtrip.test.ts` would keep the kernel-side round trip
   self-sufficient.
8. **The face-kind census (TP1) is worth keeping as a precondition** once B1 is fixed: assert that at least one bar
   arena carries a non-zero kind, so the column cannot fall out of coverage again.
9. **The two cases staged to M1 throw a plain `Error`, not `notBuilt('M1')`:** a level-r route loop off one vertex,
   and two level-r route edges between one pair. C-0207 (3) declares them, and the seat found no honest M0 path that
   reaches them (a run's interior vertices are Steiner vertices within the hot pixel). The `notBuilt` form would make
   the staging greppable like the façade's stubs.
10. **The angle sort's `quadrant` puts the direction (−x, 0) in quadrant 2, which is equivalent to quadrant 1** (C08).
    A comment would stop a later reader from "fixing" either choice.
11. **`decodeArena`'s never-throws property runs 300 fixed draws** (`corrupt.test.ts`). The checker's P7 ran 3 000
    draws on the CITY block with no throw. The test could read `PLAT_FUZZ_RUNS` like the bar files, so the nightly tier
    widens it.
12. **The roundtrip test's header says promotions and demotions occur but does not assert it.** KP1 counted 2
    promotions and 388 demotions over the 48 arenas, so the claim is true. A tally assertion like the existing
    `seen.splits` one would hold it.

## Closing check (lane `check/M0-a-15-close-r1`, 2026-10-05)

These notes do not fail the item either. The mutant ids (K…) and the probe id (CP2) are in `checks/M0-a-15.md`'s
closing section. The probe's file is kept outside the tree at
`~/maps-scratch/waves/check-M0-a-15/close-r1/zz-close-probe2.test.ts.keep`.

13. **K12 survives: the item's tests carry no non-zero face kind at L4.** The fix round's test puts residue faces at
    L0 – L3, which meets B1's required change ("at least one L2 – L4 partition chunk"). A load that drops the kind at
    L4 only (`kind: level === 4 ? 0 : f.kind` at `decode.ts:583`) passes all 31 kernel io tests. The real code is right
    there: probe CP2 builds an L4 residue sliver on the honest path (`absorbSliver` between two L4 `setback` chains), and
    it round-trips with its kind through an L4 partition chunk. CP2 fails under K12 and under K1. Suggested handling:
    add CP2's two L4 chains and the L4 sliver to the face-kind test in `kernel/test/io/roundtrip.test.ts`, so the test
    covers every level. This is M4, or earlier if the file's owner touches it again.
14. **K9 is equivalent on M0's inputs: a load that clamps a kind to {0, 1} passes.** M0 writes only two face kinds: 0
    (the default) and `FACE_KIND_RESIDUE` (1), which `faces/merge.ts:165` writes. Every other writer copies an existing
    kind (`rewalk.ts:385/420`, `relevel.ts:984/1034`, testkit `renumber.ts:218`). The column is a `u16`. When a later
    milestone adds a third kind, its round trip should carry a kind above 1. That belongs to the milestone that adds the
    kind, not to M4.
15. **Note 8 is partly met.** The new kernel test asserts its residue faces before it round-trips them, so the kind column
    cannot silently drop out of the kernel-side coverage. The testkit-side bar arenas (the constructive set, the fuzz
    arenas and CITY) still carry no non-zero kind. Note 8's census precondition stays with M4.
