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
in the plan's order after R4. Nothing of R4 is adopted. The choices row is C-0346. No behaviour changed.

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
17. **For the session: ids collide with main (C-0104).** At main's head `70d94005`, C-0346 is `build/M0-a-09-fix-s4`'s
    row and L-0493 is `check/M0-a-09-close-s3`'s. In this tree the same two ids are this round's choices row and its
    builder's CLEAN-ROOM row. They are cited by number in `checks/M0-a-15-notes.md` (round C1), in
    `landed/M0-a-15.json`'s appends and in `checks/M0-a-15-c1.md`. No source file cites them. Suggested handling: the
    next writer renumbers at commit (never the checker) and carries the new numbers into those places. This closing
    check's CLEAN-ROOM row takes L-0507, above every L-id on main (L-0506) and in the tree. M0, at this wave's commit.
