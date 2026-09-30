# repair-kernel-r1 — lane amendments-c/repair-kernel-r1 (KERNEL part, §3): report and ledger

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/repair-kernel-r1; queued in docs/FABLE-REVIEW-QUEUE.md.

Block file: `docs/validation/amendments-c/repair-r1-kernel.md` (blocks only). Base: `docs/ARCHITECTURE.md` sha256
`7f4c0e253438b41b…`, `docs/ARCHITECTURE-RATIONALE.md` sha256 `22f01184eac296c1…` (assemble-r0's output, unchanged).

PROGRESS (kill-safe ledger; one line per item, updated after every block)
ITEM VKC-04 = VPR0-13 = VD0-21 (39; J-Fredteam-1): planned REPLACE §3.1 (`Warning` union) | done: block 1 (REPLACE §3.1) — complete
ITEM VKC-02 = VPR0-07 = VD0-27 (81 (b)): planned REPLACE §3.2 ((9) frame growth); J-ROWS + RATIONALE-A J-A81.31 (new) | done: block 2 (REPLACE §3.2), block 6 (J-ROWS J-A81.31), block 7 (RATIONALE-A J-A81.31) — complete
ITEM VKC-01 (65): planned REPLACE §3.4 (link exception), REPLACE §3.10 (reference row); J-A65.31 index + Part A restated | done: block 3 (REPLACE §3.4), block 5 (REPLACE §3.10), block 6 (J-ROWS J-A65.31 restated), block 7 (RATIONALE-A J-A65.31 restated) — complete
ITEM VKC-03 (65): planned REPLACE §3.4 (links' far ends); J-A65.31 Part A restated | done: block 3 (REPLACE §3.4), block 7 (RATIONALE-A J-A65.31 restated) — complete
ITEM VKC-07 (65): planned REPLACE §3.4 (quarry example) | done: block 3 (REPLACE §3.4) — complete
ITEM VKC-05 (65): planned REPLACE §3.7 (kerb from `Gallery`, `chamber_wall`); J-A65.32 index + Part A restated | done: block 4 (REPLACE §3.7), block 6 (J-ROWS J-A65.32 restated), block 7 (RATIONALE-A J-A65.32 restated) — complete
ITEM VKC-06 (65): planned REPLACE §3.7 (sewer part wording) | done: block 4 (REPLACE §3.7) — complete
BLOCK FILE: complete — 7 blocks (REPLACE §3.1, §3.2, §3.4, §3.7, §3.10; J-ROWS; RATIONALE-A) + END. RECEIPTS: done (§6). REPORT: done.

## 1 Outcome

All eleven issues routed to this seat are fixed. They reduce to seven distinct kernel issues, because VPR0-07 and VD0-27
are VKC-02 and VPR0-13 and VD0-21 are VKC-04. The fixes are five REPLACE blocks (§3.1, §3.2, §3.4, §3.7, §3.10), one
J-ROWS block and one RATIONALE-A block. There is one new ruling, **J-A81.31**, the kernel's frame growth. It restates
J-A65.31 and J-A65.32 (index and Part A) for VKC-01, VKC-03 and VKC-05.

**One deliberate departure from the verifier's text (VKC-02; vetoable).** VKC-02's required text grows the frame by two
batches that strip the old chains and delete every stretch left with no row. Measured against the design's own rules,
that would break two things.
* **Faces would join into one.** The five levels are views of one arena (§2.2 rule 2), so deleting an L0 edge deletes it
  at every level. Every finer face along the old margin — the hinterland's fields and woods, the through-roads' corridor
  strips — would join the ring's face at its level. Through the ring, all of them would become one face. That face has
  one owner, so the other entities' `FaceRef`s would resolve to nothing, and §3.10's "every stored reference resolves"
  row fails at stage end.
* **The new border would cross finer faces.** When the grown frame's side is less than 1.6 times the old one, the new
  frame rectangle lies inside the old arena. For example, a CITY of 25 km² that crosses to METROPOLIS at 30 000 people
  grows to 38.4 km², a 6.2 km side inside the old 8 km arena. The new rectangle then cuts across the old margin zone's
  finer faces, and neither of VKC-02's batches clears them.

So §3.2 (9) grows the frame by three single-level batches that share one clear region. The region is whole L1 faces,
which is the carve's footprint rule (J-I10):
1. **(a) L1 clearing.** Clears what is finer than L1 in every L1 face beside a *lapsing stretch* — a stretch of an old
   chain with no other row at its level or coarser — and in every L1 face the new rectangle will cross.
2. **(b) L0 margin batch.** Inserts the new ring, adds S1's water on the ring, and strips the old `margin` rows. A
   stretch left with no row is deleted.
3. **(c) L1 border batch.** Inserts the new rectangle and strips the old `border` rows.

This keeps §3.3's one level per transaction, which VKC-02 and VKC-08 asked for. It also covers what VPR0-07 asked for:
the rasters extend by whole cells on their own grid, and every old cell is unchanged. VD0-27's "one L0 batch replaces
both chains" is not adopted, because the border is an L1 chain.

The same paragraph also covers four things no verifier text asked for, each found by tracing the growth through its
lifecycle:
* the cap clamp, which keeps the range bound of §3.2 (1);
* the underground parts, whose outer ring is the frame with its margin (II.7.3);
* the `hydro` flow fields, which are recomputed because an old edge cell gains neighbours;
* replay and undo.

J-A81.31 records every choice. Among them: rasters keep their cell size rather than being re-gridded, and the memory cost
is stated. At the extreme — a TOWN grown in one epoch to the cap — the heights are ≈ 15.7 M cells (≈ 63 MB), against
≈ 3.9 M for a METROPOLIS made at the cap (our count). The pre-decided fallback is a re-grid if M4's measurement breaks
§12.8's METROPOLIS line.

## 2 Per issue

| id (= duplicates) | item | fix (block) | against the required text |
|---|---|---|---|
| VKC-04 = VPR0-13 = VD0-21 | 39 / J-Fredteam-1 | §3.1 `Warning`: `'W_CUT_SLID'` after `'W_DOWNGRADE'`; comment "W_CUT_SLID: §4.6 step 8 (c)'s slid always-succeeding cut, count = the slide's steps (J-Fredteam-1)" (block 1) | verbatim (VKC-04). VD0-21's "in the warning's detail" is not used: `Warning` has `count`, not `detail`. |
| VKC-02 = VPR0-07 = VD0-27 | 81 (b) | §3.2 (9): new paragraph **Frame growth at an epoch (item 81 (b); J-A81.31)** (block 2); J-A81.31 index row and Part A entry (blocks 6, 7) | DEPARTS, as §1 explains: three batches instead of two, plus a clearing step; J-A81.31's wording differs to match. |
| VKC-01 | 65 | §3.4: the link exception, verbatim (block 3); §3.10 "every stored reference resolves" row: "(a link's two `link_end` ordinals each in the part its end names, §3.4)" (block 5); J-A65.31 index row and Part A entry get "(a link's two ends excepted, one vertex in each part)" (blocks 6, 7) | verbatim, plus one extension (§3). |
| VKC-03 | 65 | §3.4: the links' far ends (block 3); J-A65.31 Part A: "… from touching another beyond its links' far ends" (block 7) | two wording extensions (§3). The pointer "(§3.10's arena-isolation row)" moves before "but for", so it still qualifies the byte-identity claim. |
| VKC-07 | 65 | §3.4: "a quarry's workings beneath a catacomb's galleries" (block 3) | verbatim |
| VKC-05 | 65 | §3.7: the kerb from `Gallery.widthCm ÷ 2 + Gallery.wallCm`; "from the half-width its `Gallery` record declares (the kerb above)"; "carrying the structural `chamber_wall` role (§2.2 rule 7)" (block 4); J-A65.32 index and Part A (blocks 6, 7) | verbatim |
| VKC-06 | 65 | §3.7: "the sewer network's part of the underground layer (part 0, §3.4)"; "(that part's level mapping is §2.2 rule 1's;" (block 4) | verbatim, plus one extension (§3) |

## 3 Extensions beyond the required texts (each vetoable)

1. **VKC-01.** §3.4's closing clause "never one entity with geometry in two arenas" becomes "never one entity with faces
   or chains in two arenas". Otherwise the paragraph contradicts the exception it has just stated: a link does have one
   vertex in each of two arenas.
2. **VKC-03.**
   * "placing or stripping" becomes "placing, keeping or stripping". The connection stage also keeps a surviving link's
     far end, and places new links (II.7.6 (2)).
   * "restores the edge it split exactly" becomes "restores the edge it split unless other geometry has met the vertex
     since". §2.2 rule 3 dissolves only a degree-2, split-flagged vertex with no role and no pin.
   * The far ends are written by "one transaction on each part it touches".
3. **VKC-06.** The same paragraph's "over the underground L1 faces" becomes "over that part's L1 faces", and "the
   underground's built blocks" becomes "that part's built blocks". This is the same stale single-arena wording.
4. **VKC-02.** Everything that §1 lists.

## 4 Hand-offs and cross-part notes

**Hand-off (1), for the assembler: restated rows.** Blocks 6 and 7 restate J-A65.31 and J-A65.32 whole, in the index and
in Part A. `apply-blocks.py` appends them as duplicates, and its log reports "DUPLICATE ID inserted"; that is expected.
The restated-row swap then moves each restated row into its older row's place: `swap_restated` of
`docs/validation/amendments-b/assemble-r1-handoff.py`, unchanged. Expected sets:
* index {J-A65.31, J-A65.32};
* Part A {J-A65.31, J-A65.32}.

J-A81.31 is new: one index row and one Part A entry, appended.

**Cross-part notes (the design stays single-source; each owner decides).**
1. **Pipeline — §4.11 *The rung at an epoch* and J-A81.41 (VKC-08).** The pipeline seat, still writing at 05:5x, has
   read this block file. Its current `repair-r1-pipeline.md` text agrees with the three-batch growth: §3.2 (9)'s
   single-level batches over one clear region (J-A81.31), and the stages re-deriving the cleared faces and the ring.
   Its restated J-A81.41 row and Part A entry say the same. One residual remains: "each raster growing by whole cells
   as §3.2 (9) states, every old cell unchanged" should end "every stored height unchanged (§3.2 (9))" or stop at the
   pointer, because §3.2 (9) recomputes the `hydro` flow fields over the grown grid. An old edge cell gains neighbours,
   and the ring may drain inward.
2. **Pipeline / scope — VKC-16 (II.7.5), VKC-17 (§7.3), VKC-19 (§13.2 T65-6).** These should say the far ends are
   "placed, kept or stripped" by one transaction per part, as §3.4 now says. Their verifier texts say "each either
   unchanged or stripped", which omits newly placed links.
3. **Scope — VKC-20 (§13.2 T81-1).** Proposed: "every entity keeping its address, and every face outside the growth's
   region and not beside a deleted stretch keeping its geometry (§3.2 (9))". VKC-20's "every face whose ring ran along
   neither the old margin nor the old border" is too strong once whole L1 faces are cleared.
4. **Model — §2.2 `frame` (VKC-09, landed).** "(§3.2 (9), §4.11; J-A81.41)" agrees. Adding J-A81.31 would be exact but
   is not needed. The `lattice` comment ("a grown frame keeps every old lattice point") agrees with §3.2 (9).
5. **Determinism — §7.7 DR23.** "§3.2 (9)'s frame rule" now resolves. VD0-27's §2.2 comment is the model's (done).

## 5 Held parts (gate (a)) — so nothing is lost

No item routed to the kernel has a part marked HOLD — PLAUSIBLE:
* items 39, 45 and 53 are CONFIRMED by Fable's evidence gate;
* items 65 and 81 are an owner rule and a dossier-port program item.

Nothing was held or applied here beyond them. The file-wide held parts are unchanged and none touches §3. They are 52;
35 (support); 68 (g); and 68 (support) (assemble-r0 §9; verify-kernel-r0 §5).

## 6 Receipts
* **Block file.** `repair-r1-kernel.md`, sha256 `9e176c2e57bdcbc7…`. It holds 7 blocks and a final END (headers at l. 1, 50, 160,
  408, 524, 567 and 572). It was generated by `scratchpad/rk1/gen.py` from the live design `7f4c0e25…` and rationale
  `22f01184…`; both hashes are asserted at every run. Each REPLACE body is the live subsection with its edits applied
  by whitespace-flexible, match-once replacements, and a word diff against the live subsection shows only the edits in
  §2 and §3.
* **Dry run of this file alone** (`apply-blocks.py`, two-pass order). 7 of 7 blocks applied, 0 skipped, audit not-OK 0.
  The expected "DUPLICATE ID inserted" notes name J-A65.31 and J-A65.32. Headings stay 147 → 147 and the fences stay
  balanced.
* **Restated-row swap** (`swap_restated` from amendments-b's `assemble-r1-handoff.py`). The index swapped
  {J-A65.31, J-A65.32} at l. 16680–16681, and Part A swapped the same pair at l. 569–570. J-A81.31 is appended in both.
  The rationale diff is exactly those two rows and the one new row.
* **Combined dry run** with every `repair-r1-*.md` present at 06:0x: determinism, kernel, model, pipeline and
  rendering. 59 of 59 blocks applied and audit not-OK is 0. No other file restates J-A65.31 or J-A65.32
  (`j_ids_in_two_blocks` is empty), and no other file REPLACEs a §3 subsection.
* **Document checks on the repaired document**
  (`doc_checks.py --sections "3,Judgment calls" --allow docs/validation/doc-checks-allow.tsv`): exit 0, with C1 5/0,
  C2 0/0, C3 173/0, C4 0/0, S1 0/0 and S2 0/0. The untouched document gives the same counts on the same corpus
  snapshot. Five C3 runs in the first draft of §3.2 (9) were reworded, so no allow row is proposed.
* **Rationale, whole file.** 503 C3 hits, identical to the untouched rationale's 503, and C4 and S2 are identical too.
  That is after three C3 runs in J-A81.31's first draft were reworded. The rationale's pre-existing unreviewed hits are
  outside this lane.
* **Arithmetic behind J-A81.31** (our count):
  * the cap frame is 153.6 km², so its arena is 153.6 × 1.6² = 393.2 km²;
  * heights at 5 m: 15 728 640 cells × 4 B = 62.9 MB; at 10 m: 3 932 160 cells = 15.7 MB;
  * `hydro` at 16 m: 1 536 000 cells × 9 B (flow direction 1, flat rank 4, accumulation 4) = 13.8 MB; at 32 m:
    384 000 cells = 3.5 MB;
  * CITY at 20 000 people is 25 km²; METROPOLIS at 30 000 is 64 × 30 000 ÷ 50 000 = 38.4 km², a side of 6.20 km, inside
    the old arena's 5 × 1.6 = 8 km side.

## 7 CONFIRMED versus PLAUSIBLE

CONFIRMED by execution:
* the blocks apply cleanly, alone and combined, with the audit;
* the word diffs show only the intended edits;
* the restated-row swap;
* the document checks.

CONFIRMED by reading the design's rules:
* every defect each fix answers;
* the finding that VKC-02's two-batch text would join finer faces across the ring (§2.2 rules 1–2 and 3, §3.3,
  §3.10).

PLAUSIBLE and vetoable:
* the three-batch growth and its region;
* the raster ruling and its memory figures, which M4 measures;
* the four wording extensions of §3;
* the cross-part wordings in §4.

Fable should re-check J-A81.31 first: whether whole-L1-face clearing is the right grain, and whether keeping each raster's
cell size is the right default.
