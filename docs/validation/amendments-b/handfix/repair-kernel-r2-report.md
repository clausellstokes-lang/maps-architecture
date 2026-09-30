# handfix-b/repair-kernel-r2 — the KERNEL part's round-2 hand-fix issue, repaired as blocks

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat handfix-b/repair-kernel-r2; queued in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned verify-model-r1 (VHM1-04, §2 soundness row), verify-scope-r1 §4 (VHM1-04 considered), closing-report §2 #15 and §3, live §3.4 whole, §2.6 stage-3 contract (clip order), §3.1 E_DEGENERATE, §3.10 seed-tiling row, §13.1 oracle + fixture, F-PLAN row, J-A28.34 index row and Part A, J-A28.26 Part A | done
ITEM sweep: planned every restatement of the holed-piece gloss in both files | done (§3.4 l. 2635; J-A28.34 Part A, same gloss, kernel-owned; §13.1 fixture scope-owned, ruled sound by verify-scope-r1; §3.1, §3.10, tileRings comment, F-PLAN carry no gloss)
ITEM compose: planned REPLACE §3.4 (one sentence), RATIONALE-A restated J-A28.34 (same gloss) | done (scratchpad handfix/rk2/compose.py; 2 blocks, file sha256 3362e9c9…)
ITEM verify: planned apply-blocks on copies, restated-row swap, probes, refs.py, doc_checks three copies | done (§4)
ITEM close-out: planned queue row, LANDED line | done
ITEM fable-continuation (Fable 5.1, 2026-09-27, before assemble-r2): planned re-read both blocks against VHM1-04 and the live text, sweep both files for other copies of the gloss, collision check with all six r2 files, re-execute the receipts on copies, run the gloss by script (hole-gloss-check.py), append the continuation section, queue row, second LANDED line | done (§ Fable continuation)

Lane `handfix-b/repair-kernel-r2`, 2026-09-27, an opus stand-in for the Fable seat. Base: `docs/ARCHITECTURE.md` sha256
`e9c0b828…`, `docs/ARCHITECTURE-RATIONALE.md` `dcabf14b…` (unchanged through the lane). This seat edited no design
file. Output: `docs/validation/amendments-b/handfix/repair-r2-kernel.md` (2 blocks, sha256 `3362e9c9…`, with a hand-off
preamble the parser ignores).

## Outcome

VHM1-04 is fixed with the verifier's required text, verbatim; it is not ruled invalid. The same stale gloss also stood
in J-A28.34's Part A entry, the kernel's own record of the seed clip, and that entry is restated with the same wording.
No new ruling is made, so there is no new J id and no index row: J-A28.34's index row carries no hole gloss.

| issue | where | fixed by | as required? |
|---|---|---|---|
| VHM1-04 | §3.4 seed-clip paragraph | REPLACE §3.4 (the one sentence pair; nothing else in §3.4 changes) | yes, verbatim |
| (same shape) | J-A28.34 Part A entry | RATIONALE-A restating J-A28.34 (same id; swap hand-off) | widened by this seat, vetoable |

## 1 The texts

* **§3.4** now reads: "A piece left with a hole — earlier rings lying inside a later one without reaching its sides —
  is refused (…), because a seed is one ring. §2.6's clip order puts a contained wing after its container, and a composed
  tower wholly inside a wing before that container only where an earlier wing the tower overlaps carries its cut to the
  container's sides, so the refusal marks a caller's bug (F-PLAN, §5.2)."
* **J-A28.34, Part A.** "an earlier wing wholly inside a later one" becomes "earlier rings lying inside a later one
  without reaching its sides". The tower clause is added before "(§2.6)". The history tail gains "its holed-piece gloss
  restated by handfix-b repair-kernel-r2 after verify-model-r1's VHM1-04".

**Why the wording is exact (PLAUSIBLE, by reasoning).**

* A piece of ring R is R less the union U of the earlier rings. It has a hole only where a connected part of U lies
  inside R without reaching R's sides. A part that reaches a side cuts a notch or splits R, and a split is allowed:
  "one they cut in two has two".
* A wing before R is never wholly inside R, because the clip order takes a contained wing after its container.
* A tower before all the wings, not wholly inside some wing R, has points outside R. Being connected, it reaches R's
  sides.
* A tower T wholly inside R and before R overlaps an earlier wing B that is not wholly inside R. A path inside B from
  the overlap to a point outside R stays in B ∩ R until it meets R's side. So T joined with B reaches R's sides.
  * This covers T placed before all the wings.
  * It also covers T placed after its first container A, where R is a later wing that also contains T. Then A is that
    earlier wing.
* No tower lies wholly inside another tower.

So the refusal is reached only by a caller's bug. This agrees with verify-model-r1 §2's soundness row and with §13.1's
oracle, which refuses "exactly where that result has a hole".

## 2 Considered, not changed

* **§13.1's fixture** "on an earlier ring wholly inside a later one (refused …)" is a two-ring test case, and it stays
  true. It is owned by scope, and verify-scope-r1 §4 ruled it sound. Not re-filed.
* **§3.1's `E_DEGENERATE` comment**, the `tileRings` signature comment, §3.10's seed-tiling row and the F-PLAN row were
  checked. None of them glosses what a hole is, so none is stale.
* **A ring touching a later ring's side at one point** gives a pinch rather than a hole. §2.6's composition contract
  (at least `attractCm` apart except at the joints) excludes it, so the gloss need not name it.
* **Sibling round-2 VHM1-03** (`repair-r2-model.md`, its §2.6 block) passes a tower's round room less the spiral bay. It
  changes neither the clip order nor §3.4's `fixed` contract, and it is consistent with this text (§4 combined run).

## 3 Assembler hand-off (also in the block file's preamble)

**Restated row.** RATIONALE-A restates J-A28.34's Part A entry under the same id. The assembler moves it into the older
row's place and deletes the older, using `swap_restated` as `assemble-r1-handoff.py` does. From this file, the expected
Part A id set is {J-A28.34} and the expected index set is empty. `apply-blocks.py` notes "DUPLICATE ID inserted" and
lists "part_a_without_j_rows: J-A28.34". Both are expected until the swap. There is no other hand-off.

## 4 Receipts (scratch: `handfix/rk2/` under the session scratchpad)

* **Composition.** `compose.py` asserts both hashes. It checks that each old string occurs once, both raw and
  whitespace-normalised: in §3.4, in the document, in the J-A28.34 row and in the rationale file. It also checks that the
  raw re-wrap equals the required old and new texts.
* **Applied alone** (`verify.py alone`). 2 of 2 blocks applied, audit not-OK 0.
  * Headings 145 → 145, fences balanced, title block unchanged.
  * The Part A swap covers {J-A28.34} and the index swap is empty.
  * Document diff: 1 hunk, l. 2635–2637 → 5 lines. Rationale diff: 1 row (l. 487).
  * The new texts occur once and the old texts 0 times. J-A28.34 has 1 index row and 1 Part A row.
* **Applied combined** with the sibling round-2 files as they stood during this lane: `repair-r2-determinism.md` `ce62542d…`,
  `-model.md` `67fa25da…` and `-pipeline.md` `1881785f…`.
  * 12 of 12 blocks applied, audit not-OK 0.
  * Swaps: index {J-A28.23, J-A28.26, J-A28.46}; Part A {J-A20.74, J-A28.23, J-A28.26, J-A28.34, J-A28.46}.
  * No heading collides; no other lane touches §3.4 or J-A28.34. My probes occur once.
* **References** (`refs.py`). Live and mine both show headings 139, D 35, J 472 and 2 broken references. The 2 are the
  pre-existing external citations `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6.
* **Document checks** (`doc_checks.py --sections "3"`, one corpus snapshot of 9 626 JSON files):

| copy | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|
| untouched (live), runs 1 and 2 | 5 | 0 | 97 | 0 | 0 | 0 | 0 | 0 |
| mine (live + this file + swap) | 5 | 0 | 97 | 0 | 0 | 0 | 0 | 0 |
| combined (+ determinism r2 file) | 5 | 0 | 97 | 0 | 0 | 0 | 0 | 0 |
| untouched vs mine, empty allow file | identical hit sets (108 lines each), added 0 | | | | | | | |
| rationale whole, untouched vs mine | identical hit sets (281 lines each), added 0 | | | | | | | |

  The two untouched runs were identical, so the corpus held still.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed). The following were run and match the tables above:

* the blocks parse and apply, alone and combined;
* the swap;
* the diffs, which touch only the intended text;
* the probes;
* the references;
* the document checks, which add 0 hits.

Every quoted live text was read in place.

**PLAUSIBLE** (reasoning, for Fable):

* the hole argument of §1;
* that widening to J-A28.34's Part A entry is in scope;
* that the assembler applies the swap.

## Fable continuation (2026-09-27)

Seat: Claude Fable 5.1, finishing the opus stand-in's lane. State at this seat: the round-2 block files were NOT yet
assembled (no `handfix-b/assemble-r2` line in `docs/lane-events.log`), so a correction would have gone into this file,
the block regenerated whole. Live hashes at this seat: `docs/ARCHITECTURE.md` `e9c0b828…`, `docs/ARCHITECTURE-RATIONALE.md`
`dcabf14b…`, checked again after the last write of the lane. This seat edited no design file and changed no byte of the
block file (sha256 still `3362e9c9…`). Scratch: `handfix/frk2/` under the session scratchpad.

### What was re-checked

* **Block 1 (REPLACE §3.4) against VHM1-04 and the live §3.4** (l. 2499–2691, read whole). A line diff of the block body
  against the live subsection shows one change: l. 2635–2637 become 5 lines carrying the verifier's required text
  verbatim. The body also lacks the subsection's trailing blank line, which `apply-blocks.py` restores by rule (REPLACE
  keeps the replaced range's trailing blank lines): the applied copy has +2 lines and 1 hunk.
* **Block 2 (RATIONALE-A J-A28.34) against the live row** (rationale l. 487). A word diff shows exactly three deltas: "an
  earlier wing wholly inside a later one" → "earlier rings lying inside a later one without reaching its sides"; the tower
  clause added after "which takes the enclosed rooms"; the history tail extended. Its vocabulary matches J-A28.26's Part
  A ("carrying its cut to the container's edge", l. 360) and §2.6 l. 1266.
* **The gloss against the order it glosses.** §2.6 l. 1263–1266 (live) and `repair-r2-model.md` l. 333–338 (the round-2
  §2.6 that lands in the same assembly) state the same two places for a tower — directly after its first container when it
  overlaps no wing taken before that container, before all the wings otherwise — and no tower inside another. VHM1-03's
  addition concerns the round room less the spiral bay, not the seed pieces, so the gloss holds for both texts.
* **Sweep for other copies** ("wholly inside", both files). §2.6 l. 1263 and 1266 and J-A28.26 (index l. 12819, Part A
  l. 360) state the order itself; §3.7 l. 2959 is an L2-face rule; §13.1 l. 10104 is the two-ring fixture, scope-owned
  and ruled sound by verify-scope-r1 §4 (the differential is keyed on the oracle's actual hole). The only glosses were §3.4
  l. 2635 and J-A28.34's Part A — the stand-in's sweep was complete.
* **Collision.** The six r2 files replace §5.2 and §7.4 (determinism), §3.4 (this file), §2.6 (model), §4.7 and §10.2
  (pipeline), §8.2 (rendering) and §13.2 (scope); none other touches §3.4 or J-A28.34, and in the combined assembly the
  only §3 hunk is this lane's (l. 2637 after §2.6's growth).

### Verdicts on the queue row's "check first" items

| item | verdict | evidence |
|---|---|---|
| the hole argument (§1 above): is the gloss exactly the hole condition under the round-1 order, a tower after its first container and inside a later wing included? | right; CONFIRMED on the raster model, argument general | `hole-gloss-check.py` below: G1 gloss ⇔ topological hole on 18 092 rings, 0 failures; G3 covers both tower placements, 0 failures |
| widening the fix to J-A28.34's Part A entry | in scope, sound | the same stale gloss in the kernel's own record of the seed clip (single source); no new ruling, no new id; the restated-row swap is the assembler's standard hand-off |
| the verifier's text verbatim, or a sharper phrase | keep verbatim (JUDGMENT below) | the next sentence names the tower case and the caller's guarantee; the operative rule is the detection ("naming a vertex of the hole") |

**The gloss, executed.** `docs/validation/amendments-b/handfix/hole-gloss-check.py` (stdlib; imports
`tower-order-check.py`'s raster model and adds L-shaped wings, so the rings are no longer convex). Per ring R with U the
union of the rings before it: GLOSS = some connected part of R ∩ U has no cell on R's sides (`has_hole`); TOPO = a
4-connected flood of the non-piece cells from the rim of R's box, widened by one, never reaches some cell. G1: GLOSS ==
TOPO under a random permutation of the rings and under the r1 order; G2: no hole under the r1 order; G3: every tower taken
before a wing that wholly contains it overlaps an earlier wing whose part inside that wing — the part holding the tower's
overlap — reaches its sides; G4: the count of cases where the old gloss ("an earlier ring wholly inside a later one") names
a legal, hole-free order. Results, seeds 1 and 2, 2 000 cases each, **0 failures on G1–G3**: 9 011 + 9 081 rings, 1 875 +
1 837 L-shaped wings, 233 + 255 holes under random orders (so both directions of G1 were exercised), G3 on 59 + 74 free
towers inside a wing and 22 + 12 towers after their container inside a later wing, G4 81 + 86 — the VHM1-04 defect
reproduced: each is a case the old wording described as refused and the clip accepts. `tower-order-check.py` re-run with
seed 3: 3 000 cases, 0 failures on H1–H4, 139 VHM-04 configurations. The written argument (§1) holds for any connected
ring: an earlier wing that is not wholly inside the later ring has a point outside it, so every connected part of its
overlap reaches the later ring's sides; a touch at one point is excluded by §2.6's composition contract (at least
`attractCm` apart except at the joints), as the stand-in noted.

### Corrections to the block file

None. Both blocks are right and complete against VHM1-04 and the live text, so neither was regenerated.

JUDGMENT: kept the verifier's gloss verbatim over a sharper phrase ("a connected part of the earlier rings lying inside a
later one without reaching its sides"), because the sentence that follows names the tower case and the caller's
guarantee, the operative rule is the detection, and the wording matches J-A28.26's Part A — say "veto" to flip it (the
change would be one REPLACE of §3.4 and one RATIONALE-A row in this file, before assemble-r2).

### Receipts re-executed (`handfix/frk2/`)

* **Alone** (`rk2/verify.py`, this file only): 2 of 2 applied, audit not-OK 0; swap Part A {J-A28.34}, index none;
  probes new 1 / old 0 in both files; J-A28.34 has 1 index row and 1 Part A row; diff document 1 hunk (−3 +5 at l. 2635),
  rationale 1 hunk (l. 487). The final copies are byte-identical (`cmp`) to the stand-in's `rk2/alone/`.
* **Combined with all six r2 files as they stand now** — determinism `ce62542d…`, kernel `3362e9c9…`, model `aa4dc3a4…`
  (changed since the stand-in's run), pipeline `ffbe0d87…`, rendering `69a226bd…`, scope `04d0945c…`: 14 of 14 applied,
  audit not-OK 0; swaps index {J-A28.23, J-A28.26, J-A28.46}, Part A {J-A20.74, J-A28.23, J-A28.26, J-A28.34, J-A28.46};
  headings 145 → 145, fences balanced, title block unchanged; my probes once; 22 document hunks and 5 rationale hunks,
  none in §3 but mine.
* **References** (`refs.py <document> <out.json>`) on live, alone and combined: headings 139, D ids 35, J ids 472, broken
  2 — the pre-existing external citations `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6.
* **Document checks** (`doc_checks.py --sections "3"`, one corpus snapshot: 9 626 JSON files, 911 940 C3 3-grams):

| copy | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|
| untouched (live), runs 1 and 2 bracketing the others | 5 | 0 | 97 | 0 | 0 | 0 | 0 | 0 |
| mine (alone final copy) | 5 | 0 | 97 | 0 | 0 | 0 | 0 | 0 |
| combined (six-file final copy) | 5 | 0 | 97 | 0 | 0 | 0 | 0 | 0 |
| untouched vs mine, empty allow file | 102 hits each; identical after normalising line numbers (the 4 C1 hits below l. 2635 shift by +2); no hit in l. 2635–2640 | | | | | | | |
| rationale whole (`--heads docs/ARCHITECTURE.md`), untouched vs mine | identical hit sets (274 unreviewed lines each, all pre-existing; exit 1 on both, as the stand-in found) | | | | | | | |

  The two untouched runs were identical, so the corpus held still; the change adds 0 hits.

### Observations, no change

1. §13.1's fixture "on an earlier ring wholly inside a later one (refused …)" stays a true two-ring case. A three-ring
   fixture for the tower case (A − T − B accepted, no hole) would belong to scope's lists; verify-scope-r1's VSR-01 already
   adds the composed-tower clip order to the B-PLAN fixtures (`repair-r2-scope.md`). Not re-filed.
2. The raster family has rectangles, L-shapes and disks; §13.1's T and curved-quad rings were not generated. The written
   argument covers any connected ring.

### CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed): the block bodies' identity with the live text except at the gloss; G1–G4 and H1–H4 on the raster
families as stated; the alone and combined assemblies, the swaps, the probes, the references and the document checks as
tabulated; the live hashes unchanged through the lane.
**PLAUSIBLE** (reasoning): the raster model's fidelity to lattice rings (the written argument is general); how often a
tower stands on a wing overlap.

The queue row `A-handfix-b/repair-kernel-r2` exists (docs/FABLE-REVIEW-QUEUE.md l. 247) and is left for workflows/05 or
15; its "check first" items are the two verdicts above. The PENDING line stays.
