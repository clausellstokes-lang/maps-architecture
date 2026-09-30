# repair-kernel-r2 — lane amendments-b/repair-kernel-r2 (KERNEL part, §3): report and ledger

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/repair-kernel-r2; queued in docs/FABLE-REVIEW-QUEUE.md.

Block file: `docs/validation/amendments-b/repair-r2-kernel.md` (blocks only). Base: `docs/ARCHITECTURE.md` sha256
`365e19f24743c88a…`, `docs/ARCHITECTURE-RATIONALE.md` sha256 `50a94f2d6fca8b86…` (assemble-r1's output, unchanged
since verify-r1).

PROGRESS (kill-safe ledger; one line per item, updated after every block)
ITEM VK1-01 (28, 28 (f)): planned §3.4 (routes paragraph, seed clip `tileRings`, re-cut sentence), §3.1 (E_DEGENERATE detail), §3.10 (placement-bound row), J-ROWS + RATIONALE-A J-A28.34 restated | done: blocks 1 (§3.1), 2 (§3.4), 4 (§3.10), 5 (J-ROWS), 6 (RATIONALE-A)
ITEM V-MAB1-07 + VK1-08 (28 (f), 30): planned §3.4 (kept-room sentence), §3.10 (seed-tiling row) | done: blocks 2 (§3.4), 4 (§3.10)
ITEM VK1-05 (28): planned §3.10 (seed-tiling row: stored plan's carry) | done: block 4 (§3.10)
ITEM VK1-06 (12, 28): planned §3.4 (faceNeighbours key; arenas paragraph) | done: block 2 (§3.4)
ITEM VK1-09 (12): planned J-ROWS + RATIONALE-A J-A12.31 restated | done: blocks 5 (J-ROWS), 6 (RATIONALE-A)
ITEM VK1-10 (28): planned §3.4 (joint wording ×2; fixed rings counter-clockwise) + J-A28.34 Part A wording | done: blocks 2 (§3.4), 6 (RATIONALE-A)
ITEM VK1-14 = VP1-18 (19): planned §3.7 (designation template) | done: block 3 (§3.7)
BLOCK FILE: complete — 7 header lines (REPLACE §3.1, §3.4, §3.7, §3.10; J-ROWS; RATIONALE-A; END). RECEIPTS: done. REPORT: done.

## Outcome

All eight issues routed to this seat are fixed in four REPLACE blocks (§3.1, §3.4, §3.7, §3.10) and two restated
judgment rows (J-A12.31, J-A28.34 — index and Part A). The major one, VK1-01, now has a stated mechanism:
* **the input sides are the arena's routes.** A seed or fixed ring's side as passed is the route of every fixed edge on
  it, so §3.6's placement test (i) reads the straight side and never a sub-edge an earlier split left;
* **the seed clip is one overlay**, a listed service `tileRings(rings): Ring[][]`, so every ring carries every crossing
  vertex;
* §3.10's placement-bound row now checks the transient case.

A model of the routes rule over 400 000 splits of rotated and axis-aligned sides puts no vertex beyond the hot pixel,
has no failed placement search and leaves no kept corner unsplittable. Under the old rule the same sides left up to 22 %
of sides with a vertex beyond it.

**Rulings (vetoable, recorded as the amended J-A28.34):**
1. The routes rule.
2. The one-overlay clip as a named service.
3. A clip piece left with a hole (an earlier wing wholly inside a later one at a storey) is refused
   (`E_DEGENERATE`, `overlap`), because a seed is one ring. Which wing takes the enclosed rooms is the plan rung's choice
   (see the cross-part notes).

## Per issue

| issue | fixed where | what changed |
|---|---|---|
| VK1-01 (major) | §3.4, §3.1, §3.10; J-A28.34 | routes paragraph; `tileRings` in the list and the clip text; re-cut acceptance sentence; E_DEGENERATE comment; placement-bound row; index + Part A |
| V-MAB1-07 | §3.4, §3.10 | kept-room sentence reads the seed ring ("at that storey" added to match V-MAB1-06's §2.6 text); tiling row's paraphrase |
| VK1-08 | §3.10 | extents (ring ∪ span ring above the ground), span rings on the ground storey, basement ring below (§2.6 steps 4 and 6) |
| VK1-05 | §3.10 | stored plan's carry: the test on a transient arena of the carried shell's seeds with the rooms as fixed rings; scope cell gains "at a stored plan's carry" |
| VK1-06 | §3.4 | `faceNeighbours(key: ArenaKey, face, level)`; slot-only list without it, "called only inside one"; ArenaKey comment |
| VK1-09 | J-A12.31 | half-width `widthCm ÷ 2 + wallCm` in the index row and Part A |
| VK1-10 | §3.4; J-A28.34 Part A | "joint between two wings", never a `party` wall; fixed rings counter-clockwise; Part A's "party wall" too |
| VK1-14 = VP1-18 | §3.7 | "the designation template" (applied once) |

**Deviations from the verifiers' text, with the reasons:**
* **The routes paragraph** sits after the construction paragraph, not after "…at least `minEdge` from it.", because
  "fixed edge" is defined later in that paragraph. It says "a face partitioner places", because the construction places
  no vertex and only splits at input vertices. It adds edges that lie on two input sides (a joint, or a fixed ring's side
  on a seed side), where the test reads both lines. It also gives the input side its index item, the one §3.6 (i)
  reads.
* **The one overlay is a named service**, because §3.4 is the complete list and the caller needs a call.
* **Other edits:** the §3.10 bar was added. The §3.10 stored-plan wording was changed to clear three C3 corpus hits,
  with the same meaning. J-A28.34's "where" cell is unchanged. The paragraphs are re-wrapped at 120 columns from the
  first changed line; the text is otherwise unchanged.

## Assembler hand-off

1. **Restated rows.** The J-ROWS and RATIONALE-A blocks carry J-A12.31 and J-A28.34 under their existing ids.
   `apply-blocks.py` notes each one as "DUPLICATE ID inserted". Move each appended row into the older row's place and
   delete the older row, as `assemble-r1-handoff.py` step 1 does.
2. **Row clashes.** If another r2 file restates J-A28.34 or J-A12.31 (three occurrences), merge the texts by hand.
3. **A later index REPLACE.** If a later file REPLACEs "# Judgment calls", re-apply both rows after it.

## Cross-part notes (other lanes' text; nothing here edits it)

* **model §2.6:**
  * Step 4 may name the clip call ("… wing order: §3.4's seed clip, `tileRings`"); its semantics stand.
  * A wing whose extent at a storey lies wholly inside a later wing's is now refused. §2.6 should rule on it. For
    example, wing order could put such a wing after its container, which then takes those rooms, or the wing could be
    composed as a fixed ring, as a tower is.
  * The kept-room rule must compare the clipped piece (V-MAB1-06's wording does). One overlay makes an earlier wing's
    piece change when a later wing that crosses it changes.
* **determinism §5.2 (VK1-02):** F-PLAN's seed-refusal path should include the seed clip's holed piece (`overlap`
  from `tileRings`), or cite the model's rule that prevents it.
* **scope §13.1 (VK1-13):** "the input sides as routes" and "clipped to tile as the faces of one overlay" match this
  text. B-FUZZ treats `tileRings` as a boolean case.
* **rendering §12.7:** "O(seed vertices)" is unchanged. The clip adds one overlay per storey where wings overlap.

## Receipts (executed 2026-09-27)

* **Generation.** `scratchpad/rk2/gen.py` builds every block from the live subsection with asserted single-occurrence
  substitutions; the base hashes are asserted as above.
* **Test application.** `apply-blocks.py` on scratch copies applied 6 of 6 blocks, 0 skipped, audit not-OK 0. Headings
  stay 145 → 145, fences are balanced, the title block is unchanged, and PENDING lines stay 0 → 0. After the dedup of
  hand-off (1): 459 index rows and 459 Part A rows, no duplicate id. The document diff is only §3 hunks plus the two rows
  in place.
* **References.** `refs.py`: broken 2, the same pre-existing external pair (`os-geometry.md` §2.1.4 and RFC 7946
  §3.1.6).
* **Document checks.** `doc_checks.py --sections "3,Judgment calls"`: C1 5/0, C2 0/0, C3 161/0, C4 0/0, S1 0/0, S2 0/0,
  **exit 0**. This needed no new allow row; four hits of the first draft's own text were reworded. The live document
  gives C3 159/0, exit 0.
* **Routes model.** `docs/validation/bench/amendb_repair_kernel_r2_routes.py` → `.out`, a companion to the verifier's
  drift model with the same seed and sides:
  * 0 of 400 000 vertices beyond 0.71 cm of the straight side;
  * 0 search failures;
  * largest move from the exact point 0.95 cm;
  * largest bend of the split sub-edge 0.93 cm;
  * shortest sub-edge 39.05 cm;
  * 0 of about 200 000 kept corners unsplittable.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED:** the quoted texts, the block application, the resolver, the document checks and the model's figures.
**PLAUSIBLE:** that the real kernel behaves as the model does, since no kernel exists yet. The model enforces
test (i) against the straight side and minEdge from the sub-edge's ends; it does not model clearance (iii). Also
plausible: that the hole case is rare in real compositions.
