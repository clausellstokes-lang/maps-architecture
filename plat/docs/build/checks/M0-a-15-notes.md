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

## Round C1 — consolidation round R12 (lane `build/M0-a-15-consolidate-1`, flow flow-7, 2026-10-13)

The builder's notes for M0-a-15's consolidation round R12 under `plat/docs/build/consolidation/kernel-plan.md` (§1.11
O-1 – O-3, §1.5 X-2, §1.0 N-4, §2's index comment rule, §3.4's test/io row, §4; J260, J263 Q1, Q7, Q8; J264 (5);
J270 (b)), run as fix round C1 of the item's consolidation lines, after R1 (`num/exact.ts` exports `isLatticeCoord`) and
in the plan's order after R4. Nothing of R4 is adopted. The choices row is C-0352. No behaviour changed.

### What changed

* **O-1, comment only (J263 Q7).** `encode.ts`'s `onward` doc names `index/items.ts`'s `routeRun` / `routePieces` as
  the same runs by definition: a level-r route edge is a run of level ≤ r cut at its vertices of level ≤ r. The doc
  keeps the format's own walk and its structural refusals, because the block is a persisted format (N-45 (b)). No
  T-io-new-1 was added and no code changed: the `onward` and `runsAt` bodies and their `fail` texts are byte-identical.
* **O-2.** `format.ts`'s `inRange(x, y)` is now `isLatticeCoord(x) && isLatticeCoord(y)`, imported from
  `../num/exact.js` by path. The truth table is the same on every input: `Number.isInteger` and `|v| < 2²³`
  (`LATTICE.rangeCm` 8 388 608 = the old `HALF`), with NaN, ±∞ and fractions false on both sides and −0 true on both
  sides. `HALF` and `SPAN` stay, because `pointKey` reads them. `SPAN` is the format's own 2²⁴ row width (N-4: another
  meaning from the kernel's `BOX_RANGE`); its doc says so.
* **O-3.** `decode.ts`'s private `const FREE_KIND = 0xffff` is deleted. `FREE_KIND` is imported from
  `../arena/index.js` (`arena/plat.ts:49`, public, the same 0xffff). `VERTEX_FLAG_MASK = 7` stays, because it has no
  twin; it gains a doc naming the three flags it admits.
* **Comments (§2).** `io/index.ts` loses the scaffold sentence; its exports are byte-identical. `format.ts`'s `roomFor`
  doc states the capacity rule (C-0207 (11)) and no longer tells the history of M0-a-04's stale-table defect, which
  C-0286 (4) has since closed. `bytes.ts`'s module comment cites §6.5 (3) and no longer cites "the checker's" phrase.
* **One test added, nothing merged (§3.4: no merge).** `corrupt.test.ts` gains, in the describe "the corrupt cache
  (§3.9, §3.11)", the it "a coordinate or a lattice-point reference outside the lattice range, or a face of the free
  kind, is a corrupt cache; the range's last coordinates and the last face kind load (§3.2 (1), §3.9)". It covers the
  following, all written with the file's own `craft()`:
  * ±2²³ and beyond, on either axis, refused as a vertex;
  * −(2²³ − 1) loads;
  * a partition's lattice-point reference at 2²³ refused by range, and at 2²³ − 1 it reaches the lookup;
  * a face of kind 0xffff refused;
  * a face of kind 0xfffe loads with its kind.

  Before this round no test reached either guard that O-2 and O-3 touch. Every earlier describe and it title is kept:
  30 it before, 31 after (32 runtime tests with the two-mix loop).
* `packages/testkit/test/kernel/io/` is untouched. A grep over it and over `kernel/test/io` for `inRange`, `FREE_KIND`,
  `VERTEX_FLAG_MASK`, `runsAt` and `onward` finds no title or import that reads a changed name.

### Old file → new file map (J263 Q8)

No file was renamed, merged or split.

| old file | new file | change |
|---|---|---|
| `src/io/encode.ts` | same | O-1: the `onward` doc (comment only) |
| `src/io/format.ts` | same | O-2: `inRange` on `isLatticeCoord`; the `HALF`, `SPAN` and `roomFor` docs |
| `src/io/decode.ts` | same | O-3: `FREE_KIND` from the arena; the `VERTEX_FLAG_MASK` doc |
| `src/io/index.ts` | same | comment only (scaffold sentence dropped) |
| `src/io/bytes.ts` | same | module comment only |
| `src/io/{compact,types}.ts` | same | unchanged |
| `test/io/corrupt.test.ts` | same | + one it: the range and free-kind guards |
| `test/io/{support,roundtrip,outer-ring,digests,compact,format}.test/ts` | same | unchanged |
| `testkit/test/kernel/io/*` | same | unchanged |

### NO-SHIFT, API and refusals (receipts in the lane's scratchpad, `a15c1/`)

* **Before and after images.** A mirror of the tree was taken before any edit (`cp -a`; no symlink into the tree;
  `@plat/kernel` resolved inside the mirror). Two probes ran on it, before and after the round's sources were copied in:
  * `zz-noshift-kernel`: every chunk's bytes (sha256) and `ref`, the load's re-encoding, the compaction's encoding and
    the five level digests. It covered the framed square, QUARTERS (bare and dressed), LAKE, 2 × 24 random batch arenas
    (the roundtrip test's seeds and mixes) and 2 × 6 longer ones (240 batches). It also recorded the decoder's answer,
    ok with its re-encoding or code with detail, on every single-byte tamper (^0x01, ^0x80, ^0xff, ref re-hashed so the
    parser is reached) of up to three chunks of six arenas: 6 384 tamper lines. Fourteen crafted boundary coordinates
    went through the decoder too.
  * `zz-noshift-testkit`: the same receipts on every M0 constructive case (seeds 0 – 3, before and after its next op),
    400 of the fuzz bar's arenas (its arbitraries and `fuzzParams('m0-a-15/round-trip')`) and the CITY arena.

  Both runs gave 10 915 lines, byte-identical: sha256 `91990e26d24619601011fd1b0262bce4d1d688768042f4c60e5febd8339022c2`.
  So every block, digest, refusal code and pinned message text is unchanged. A truth-table probe compared the old
  `inRange` body with the new on 200 784 inputs (28 × 28 special values, among them ±0, ±(2²³ ± 1), ±2²³, halves,
  ±2³¹, ±2⁵³, NaN, ±∞ and MAX_VALUE, plus 200 000 seeded near-bound draws) and found them equal.
* **API (J263 Q1).** The TypeScript checker's export listing of `src/io/index.ts` (16 names) and of the barrel
  `src/index.ts` (673) is identical before and after: sha256
  `98eb3c64aecd5c9e3ac46098dc1502f853b4f7e0b4f0d86111b8be44ee5b064b` both times.
* **Refusals (J264 (5), J290).** The io's registered runs are the round trips over the constructive set, the fuzz
  arenas, CITY and the random batch arenas. They refuse nothing lawful: 0 before and 0 after (the probe's `refusals 0`;
  the bar files green). The refusals in `corrupt.test.ts`, including the new case's, are UNLAWFUL input by design
  (bytes that no `encodeArena` writes), with the verdict REFUSE: typed `E_INVARIANT corrupt-cache: …`, never a partial
  arena. The layer that gives the user the alternative is the replay of §2.9 step 5, which is M1's (§4b, C-0037).

### Self-check (J183; mirror `waves/selfcheck-build-M0-a-15-consolidate-1`, deleted after)

21 targeted mutants ran, each over `kernel/test/io` and then `testkit/test/kernel/io` (B-FUZZ at the PR size),
`--maxWorkers=1 --bail=1 --testTimeout=60000`. Each mutated file was restored from the tree and checked with `cmp`.

* O2a – O2e (`inRange` checks x only / y only / no range / `≤ 2²³` / `≥ −2²³`), O3a (free-kind guard off) and O3b (the
  guard against 0xfffe) were all **killed** by the new corrupt case.
* K1 – K8, K10 and K11 (the face-kind mutants of the closing check, re-planned on today's lines) were **killed**: K1 by
  the new case's 0xfffe face, K7 by "loads the chunks in any order …", the rest by "carries the face kind column …".
* **K9** (clamp the kind to {0, 1}) is **now killed** by the new case's 0xfffe face. Note 14 recorded it as equivalent
  on M0's inputs.
* **K12** (drop the kind at L4 only) **survives as recorded** (note 13, unchanged). Under it the whole item set is green:
  32/32 and 95/95, which also stands as the mirror's baseline.
* The earlier C02 (decode drops the flags) and C24 (zig-zag decode without its sign) were **killed**.

The `roundtrip.test.ts` 'random batch arenas (default mix)' 5 s note (M0-a-02 N-c1-6) is honoured: the mirror's io runs
and NEAR pass `--testTimeout=60000`. A timeout there is not a red; an assertion is.

## Closing check of round C1 (lane `check/M0-a-15-consolidate-close-1`, 2026-10-13)

These notes do not fail the item (the verdict is in `checks/M0-a-15-c1.md`, PASS). Notes 13 and 14 stand as revised
there: K12 still survives (kernel io 32 / 32, testkit io 95 / 95), and K9 is now killed by the new 0xfffe face.

16. **`decode.ts`'s module comment leaves the vertices out of the load order.** Lines 2 – 3 say "the partitions level by
    level in key order (each level's splits first, sorted along each coarser edge by position, then its edges, then
    its rows)". `rebuild` adds each level's vertices before its splits (`decode.ts:372–376`; the loop's own comment
    says "each level's vertices, then its splits …, then its edges, then its rows"). The relative order the module
    comment does state holds, and the text is pre-round (identical at `23d13d5`), so it is not a rewritten comment
    that fails to match. Suggested handling: name the vertices step in the module comment at the file's next touch.
    M4.
17. **For the session: ids collide with main (C-0104).** At main's head `70d94005`, C-0352 is `build/M0-a-09-fix-s4`'s
    row and L-0493 is `check/M0-a-09-close-s3`'s. In this tree the same two ids are this round's choices row and its
    builder's CLEAN-ROOM row. They are cited by number in `checks/M0-a-15-notes.md` (round C1), in
    `landed/M0-a-15.json`'s appends and in `checks/M0-a-15-c1.md`. No source file cites them. Suggested handling: the
    next writer renumbers at commit (never the checker) and carries the new numbers into those places. This closing
    check's CLEAN-ROOM row takes L-0507, above every L-id on main (L-0506) and in the tree. M0, at this wave's commit.

## Hardening round S1 (lane `build/M0-a-15-fix-s1`, flow flow-7, 2026-10-14)

The builder's notes for M0-a-15's hardening round S1 (J237 (2); the FIX-NOW rows that `hardening-inventory.md`
assigns to the item, and the queue row L16 of `docs/M0-FIX-QUEUE.md`). The choices row is C-0361. Every source note
was read whole. The mutant ids M…, the probe ids P… and the receipts are this round's own; the mutants and probes ran in
the lane's mirror `waves/selfcheck-build-M0-a-15-fix-s1` (deleted after). Receipts are in the lane's scratchpad
(`a15s1/`).

### Row by row

| row (source note) | outcome | what changed | evidence |
|---|---|---|---|
| M0-a-02:114 N-c1-6 (the 5 s timeout) | **fixed** (no pin, as the row says) | `roundtrip.test.ts`'s two "random batch arenas" cases carry an explicit 120 s timeout, with a comment that a timing here is informative only. | NEAR in the tree without `--testTimeout`: 10 files 132/132; the cases ran 3.5 s and 2.5 s on one worker. |
| M0-a-15:12 note 2 (C35, C34) | **pinned** | New it in `roundtrip.test.ts`: "a load gives each face record its key's half-edge as `outer` (and each hole entry its ring key's), and each vertex as `out` its first outgoing half-edge counter-clockwise from +x". It covers 6 random arenas, both mixes, 72 records and 4 hole entries. It also asserts that 26 of the originals' stored starts differ from the key's half-edge, so the test reads the load's own choice. | M2a (the outer start at the ring's last half-edge, C35), M2b (`out` = the last in the angle order, C34) and M2c (each hole entry at its ring's last half-edge) were all **killed** by this it. |
| M0-a-15:17 note 3 (C37) | **pinned** | The CITY-shaped arena's 35 lanes carry width knots at both ends: level-2 rows on level-2 vertices. New it in `city.test.ts`: "a level-ℓ row on a level-ℓ vertex goes to that vertex's own partition". Each L2 district chunk's vertex rows are exactly its own knot vertices (70 in all), and no L2 `OUTSIDE` chunk exists. `cityArena()` also returns `knots`. | M3 (`lv === r ? OUTSIDE : …` at `encode.ts:301`, C37) was **killed** by the new it and by the existing "four districts at each of L2, L3 and L4" assertion. Before the knots, nothing reached that branch. |
| M0-a-15:21 note 4 | **fixed** (comment only) | `constructive.test.ts`'s `SEEDS` doc says 4 seeds per case and that the set at the tier sizes is M0-k-04's run. It quotes C-0122's sentence and C-0110. | the text |
| M0-a-15:24 note 5 (C18) | **pinned** | `digests.test.ts` asserts `hasLevelDigests` false after a load without `opts.digests`, and true with it. | M5 (the load ignores `opts.digests`) was **killed**: "expected false to be true", `digests.test.ts:26`. |
| M0-a-15:27 note 6 (C39, C40, C47) | **pinned** | New it in `corrupt.test.ts`, written with `craft()`. It has positive controls (flags 7 load; a split at x = 1000 loads). Flags 8, 15 and 0x80 are refused. A split at x = 5000, 4001, −1 and −3000 on the 0 – 4000 edge is refused. A vertex of level 2 in the routes chunk is refused, as is a vertex of level 3 / 1 / 2 / 3 in an L2 / L2 / L3 / L4 partition. Each refusal is matched by its own message. | M6a (the flag guard off, C39), M6b (the span guard off, C40: the load then failed later with "two edges leave (5000, …)", not the guard's message) and M6c (the level guard off, C47) were all **killed**. |
| M0-a-15:31 note 7 (C50) | **pinned** | New it in `roundtrip.test.ts`: "an L4 chain ending inside a coarser route edge writes L4 splits". An L4 chain runs from inside an L1 way's route edge to inside an L3 plot line. The L4 chunk has exactly 2 splits and at least 4 foreign references, and the arena round-trips. | M7a (the load skips L4 splits) and M7b (the encoder drops L4 splits) were **killed** by this it and by the extended face-kind it (row 13). |
| M0-a-15:36 note 9 | **REPORTED** (another item's file) | Not changed. `notBuilt('M1', …)` at `encode.ts:113` would be a `notBuilt` site that M0-a-16's stub table does not list. `test/facade/stubs.test.ts` "every notBuilt('…') the kernel's sources throw is a refused row's site …" then goes red. Listing it needs a refused row in `facade/notBuilt.ts` (M0-a-16). That row's `deferred` must be a §4b first cell that the stubs test counts as a kernel entry. The natural row, "the `.plat` document, `zod` schemas, the unit lint (§2.9, §2.1)" with the hook "the arena block (C-0037)", carries no kernel mark, so the test's 8-row equality or its `KERNEL_MARKS` (M0-a-16) or M0.md §4b (the spec lane) must move too. C-0207 (3) stages only the loop to M1. Two route edges of one level between one pair break §3.3's key totality: that is a programming error on an invalid arena, not a staged feature, so it stays a plain throw. | Probe P9 (mirror): the loop's `fail` replaced by `notBuilt('M1', …)` from `tx/state.ts`. `stubs.test.ts` went 1 failed / 8 passed: `+ "io/encode.ts M1"`. The file was restored and checked with `cmp`. |
| M0-a-15:40 note 10 (C08) | **fixed** (comment only) | `quadrant`'s doc in `decode.ts` says that (−x, 0) in quadrant 2 or in quadrant 1 is equivalent, and why: inside a quadrant, `orient2d` orders any two directions less than 180° apart. | the text |
| M0-a-15:42 note 11 | **pinned** | The never-throws property draws `fc.readConfigureGlobal().numRuns` (PLAT_FUZZ_RUNS: 10⁴ at the PR size, about 1 s here) and asserts the count it drew. It has an explicit 300 s timeout for the nightly size. | M11 (back to a fixed 300) was **killed**: "expected 300 to be 10000". |
| M0-a-15:45 note 12 | **pinned**, and the header corrected | `support.ts`'s `randomArena` takes an optional `LevelMoves` tally. It counts promotions and demotions per element that lives across a committed batch: a vertex on the same slot and point; an edge on the same pair slot whose segment lies on its segment before. The two random-arena cases assert demotions > 0 (10 on the default mix, 377 on the along mix). By this reading the generator promotes **0** times on both mixes. KP1's count of 2 is not reproduced, so the header no longer claims promotions occur there. A constructed it holds them instead: "a promotion round-trips: an L2 chain attracting onto an L3 plot line's Steiner end takes the vertex over". That is M0-d-04's neighbour step: the vertex goes L3 → L2 (`record.promoted`) and moves from the L3 chunk to the L2 chunk, and the loaded arena keeps L2. | M12a (the generator's way and stretch removals refused) was **killed** by "expected 0 to be greater than 0" at the default mix's demotion assertion. The along mix keeps demotions under M12a, from its other draws. |
| M0-a-15:55 note 13 (K12) — taken with the round (inventory §3 lists it with the item's rows; the brief's list does not) | **pinned** | The face-kind it adds two L4 `setback` chains and their sliver (`absorbSliver` → residue), so a residue face is round-tripped at L0 – L4. The L4 one is written in an L4 partition chunk. The it's title is kept. | K12 (`kind: level === 4 ? 0 : f.kind`) was **killed**. |
| M0-a-15:175 note 16 | **fixed** (comment only) | `decode.ts`'s module comment names each level's vertices before its splits. It also says that §3.9 names the splits first: a split needs its vertex, and the allocation order is no output. | the text |
| queue L16 (M0-a-02 N-s2-3) | **REPORTED** (other items' files; a contract change) | Not changed. A compacted copy cannot carry a fresh state name from inside `io/`. The restore generation lives in `tx/savepoint.ts`'s private `RESTORES` WeakMap (M0-a-06), and only `restoreSavepoint` moves it. `isCurrent` and `assertStamp` (`arena/resolve.ts`, M0-a-02) compare key, generation and version. A fresh key would change every chunk header, since the key is written and checked on load (C-0207 (6)). It would also change the copy's identity, which is a contract change. Driving `restoreSavepoint` on the copy to bump its generation would misuse the restore protocol: the stale-slot message would claim a savepoint was put back. It would also still collide once the original restores to the same version. Suggested shape for the session: the stamp carries an arena identity, for example a per-`Plat` lineage token assigned at creation in `resolve.ts`'s own WeakMap and compared by `isCurrent` / `assertStamp`. Every copy (compaction, load) is then a fresh object and every old stamp fails loudly, with no change to `compact.ts`. Alternatively, `savepoint.ts` exports a generation setter that `compactSlots` and `decodeArena` call with a value no stamp of the original can carry. Either is C-0313's class (M0-a-02 / M0-a-06). | Probe P16 (mirror): `isCurrent(compactSlots(p), stamp(p))` is **true** (p at version 40, the copy at 40). The same class appears on a load: `isCurrent(load(framed), stamp(framed))` is **true** at version 0. A load of a committed arena (version 40 → 0) reads false. |

### Declared shifts, API, refusals

* **No source behaviour changed.** `decode.ts` changed in comments only. Its code lines are byte-identical to the
  before-image, compared by `diff` with the comment lines stripped. `bytes.ts`, `compact.ts`, `encode.ts`, `format.ts`,
  `index.ts` and `types.ts` are untouched (`cmp`). No block, digest, refusal code or message text moves.
* **Fixture shift (test-side; nothing persisted).** The CITY-shaped arena (`testkit/test/kernel/io/support.ts`) gives
  its 35 lanes two width knots each. Its L2 district chunks' bytes change, but no golden or hash of them is recorded
  anywhere, so none is re-recorded. Its other counts are as before: tally 12 / 1 / 35 / ≥ 17 / 105 / 36, refused 0;
  L3 edge rows 141.
* **API frozen (J263 Q1).** `io/index.ts` and the barrel are untouched. `cityArena()` gains a `knots` field; it is test
  support in the item's own folder, not an export.
* **Refusals (J264, J290).** The item's registered families are the round trips over the constructive set (4 seeds per
  case), M0-k-01's fuzz arenas (10⁴), the CITY-shaped arena and the kernel's random batch arenas. Lawful refusals:
  **0 before** (the mirror on the pre-round tree: item NEAR 10 files 127/127 at the PR size; every `load` throws on a
  refusal) and **0 after** (132/132). The new refusals in `corrupt.test.ts` are UNLAWFUL input by design (re-hashed
  bytes that no `encodeArena` writes), with the verdict REFUSE: typed `E_INVARIANT corrupt-cache: …`, never partial.
  The layer that gives the user the alternative is §2.9 step 5's replay, which is M1's (§4b, C-0037).

### Gates (in the tree, W=1)

* `corepack pnpm install --frozen-lockfile`: exit 0. `corepack pnpm lint`: exit 0 ("eslint 1140 files, 0 errors, 0
  warnings", "probe-red ok", 9 whole-tree checks). `corepack pnpm build`: exit 0 ("tsc -b ok").
* NEAR, at the PR size: `vitest run packages/kernel/test/io packages/testkit/test/kernel/io` gave 10 files, 132/132,
  exit 0. It ran without `--testTimeout`, so the explicit case timeouts hold.
* RELATED, at `PLAT_FUZZ_RUNS=1000` over the round's one changed source, `kernel/src/io/decode.ts` (comments only):
  402 files, 5 257/5 257, exit 0, 7 365 s.

### Self-check (J183): the mutant table

13 targeted mutants ran in the mirror with `--maxWorkers=1 --bail=1` over `kernel/test/io` and `testkit/test/kernel/io`.
Each mutated file was restored from the tree and checked with `cmp`. M3, M7a, M7b and M12a were re-run without `--bail`
on their own file, to show that the round's new or changed test is a killer.

| mutant | file / line | row | verdict (killing test) |
|---|---|---|---|
| M2a | `decode.ts` allocFace `outer` = the ring's last half-edge | 2 (C35) | killed (the outer / out it) |
| M2b | `decode.ts` linkRotations `out = list[n − 1]` | 2 (C34) | killed (same) |
| M2c | `decode.ts` hole entries at their ring's last half-edge | 2 | killed (same) |
| M3 | `encode.ts` level-ℓ vertex row → `OUTSIDE` | 3 (C37) | killed (city: the new it, and the L2 key list) |
| M5 | `decode.ts` `opts.digests` ignored | 5 (C18) | killed (`digests.test.ts:26`) |
| M6a | `decode.ts` flag guard off | 6 (C39) | killed (the new corrupt it) |
| M6b | `decode.ts` split-span guard off | 6 (C40) | killed (same) |
| M6c | `decode.ts` vertex-level guard off | 6 (C47) | killed (same) |
| M7a | `decode.ts` L4 splits not applied | 7 (C50) | killed (the L4-split it; the face-kind it) |
| M7b | `encode.ts` L4 splits not written | 7 (C50) | killed (same) |
| M11 | `corrupt.test.ts` `numRuns: 300` | 11 | killed ("expected 300 to be 10000") |
| M12a | `test/tx/fuzzgen.ts` way and stretch removals refused | 12 | killed (default mix: demotions 0) |
| K12 | `decode.ts` `kind: level === 4 ? 0 : f.kind` | 13 | killed (the face-kind it) |

### Notes for the session (none fails the round)

* **N-s1-1 (foreign; M0-a-06's `test/tx/fuzzgen.ts`; KI).** The generator's "clear" branch clears the first owned L1
  face in **slot order** (`for (let f = 0; …) … return clearFiner(…)`), so the same draw picks a different face on a
  renumbered or loaded arena. Its unused `owners` list holds handle numbers, which are not slot-free either.
  `roundtrip.test.ts`'s "a loaded arena takes further batches as the original does" passes on the honest draws. Under
  M12a it fails: the loaded arena loses an L2 lane that the original keeps. Probe P12 replaced the branch's pick with
  the smallest owner id (slot-free), and the case passed under M12a, so the divergence is the generator's, not the
  block's. Suggested handling: M0-a-06 picks the owned face by a canonical key in its hardening round. M4.
* **N-s1-2 (the builder's slip).** One read-only `git status` (output discarded) ran inside a compound shell command
  of this lane, against the working rule "run NO git command". It changed no state, and nothing of its output was
  read or used.
* **N-s1-3.** Rows 9 and L16 above are REPORTED with their probes, for the session's routing (M0-a-16 with §4b;
  M0-a-02 / M0-a-06 under C-0313's class).

## Closing check of hardening round S1 (lane `check/M0-a-15-close-s1`, flow flow-7, 2026-10-14)

These notes do not fail the item (the verdict is in `checks/M0-a-15-s1.md`, PASS). Each is an equivalence judged, a
tightening of a claim, or a report for the session. The mutant ids (M…, X…, K12) and probe ids (P…, PT) are this
check's own, in `checks/M0-a-15-s1.md`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s1c-1 (equivalent on M0's resolvers) | Mutant X3a sends a level-ℓ row on a level-ℓ vertex to the smaller key of the level-ℓ faces around the vertex (`finerKey`) instead of the vertex's own key (`vertexKey[v]`, `encode.ts:301`). It survives the new city it, because the two keys agree there. In CITY's resolver a vertex's districts are the ones at its point, and the faces around it lie in those districts, so the smaller key is the same on a district boundary too. They can differ only under a resolver that gives a vertex a district none of its level-ℓ faces has. §3.3's districts are unions of L1 faces, so such a resolver is contrived. M3 (OUTSIDE) and X3b (a wrong district) are killed. | A test resolver that keys a vertex apart from its faces would separate the readings. This is hardening only. | M4 |
| N-s1c-2 (equivalent) | Mutant X6b3 widens the split-span guard to admit the edge's two ends (`t >= 0 && t <= len2`, `decode.ts:435`) and survives. A split at either end puts a second vertex on that end's lattice point. Probe PB crafted a split at x = 0 and at x = 4000 on the square's south edge. The parse refuses both, under the real guard and under X6b3, with `a lattice-point reference to a vertex the chunk holds`. The one-point check refuses the cross-chunk form. So the boundary of the guard is unreachable. | No test needed. | — |
| N-s1c-3 (not a promise break) | Mutant M12b makes the generator's stretch removals no-ops and survives. The default mix still demotes through whole-way removals, so "demotions occur" holds under it. M12 (whole-way removals made no-ops) is killed, but by the case's `seen.partitions ≥ 24` precondition, which comes before the demotion assertion. M12c (both removal kinds refused) and X12t (the tally's demotion branch disabled in `support.ts`) show that the demotion assertion itself is live: see the verdict's mutant table. | None. | — |
| N-s1c-4 (title tightening) | The face-kind it is titled "… residue faces at L0, L1 (routes chunk) and L2, L3 (partition chunks) round-trip …". Its body now covers L4 as well (row 13, K12 killed), and the round notes say the title was kept on purpose. The title understates the case. | At the file's next touch, name L4 in the title: "L2 – L4 (partition chunks)". | M4 |
| N-s1c-5 (row 12's history) | Probe PT re-counted the random arenas' birth-level moves by lattice point rather than by slot. Default mix: 0 promotions, 8 vertex demotions. Along mix: 0 promotions, 199. The slot tally gives 0 / 10 and 0 / 377 (vertices and edges). KP1's "2 promotions" from the first check is not reproduced by either reading. The header's correction (it no longer claims promotions on these arenas) and the constructed promotion case are therefore the right holding of note 12. | None. | — |
| N-s1c-6 (for the session: ids collide with main, C-0104) | At main's head `a000282`, C-0361 is `build/M0-e-05-consolidate-1`'s row and L-0526 is `session/refusal-census-1`'s. In this tree the same two ids are this round's choices row and its builder's CLEAN-ROOM row. They are cited in the "Hardening round S1" section above, in `landed/M0-a-15.json`'s appends, in `checks/M0-a-15-s1.md` and in the lane log. No source file cites them. This check's CLEAN-ROOM row takes L-0535, above every L-id on main (L-0534) and in the tree (L-0526). | The next writer renumbers at commit (never the checker) and carries the new numbers into those places. | M0, at this wave's commit |
| N-s1c-7 (for the session: queue L16 stays open) | Probe P16 (this check's own) gave `isCurrent(compactSlots(p), stamp(p))` **true** at version 16, and `isCurrent(load(framed), stamp(framed))` **true** at version 0. The round's REPORTED reading stands: the fix needs a fresh state name that `io/` cannot mint. That means an arena identity in `arena/resolve.ts`'s stamp (M0-a-02) or a generation setter in `tx/savepoint.ts` (M0-a-06). A fresh key would change every chunk header and the copy's identity, which is a contract change. | The session routes L16 to M0-a-02 / M0-a-06 under C-0313's class. | session |
| N-s1c-8 (for the session: note 9 stays open) | Probe P9 (this check's own) replaced `encode.ts:113`'s `fail` with `notBuilt('M1', …)` from `tx/state.ts`. M0-a-16's `test/facade/stubs.test.ts` "every notBuilt('…') the kernel's sources throw is a refused row's site …" then fails (1 failed / 8 passed) with `+ "io/encode.ts M1"`. The row needs a refused row in `facade/notBuilt.ts` and a §4b kernel entry first. Those are other items' files, so the round reported the row and did not build it. C-0207 (3) stages only the loop to M1. | The session routes note 9 to M0-a-16 together with §4b. Then `io/encode.ts` takes the `notBuilt('M1', …)` form at its next touch. | session |
