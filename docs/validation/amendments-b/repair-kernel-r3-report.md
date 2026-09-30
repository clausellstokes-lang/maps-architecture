# repair-kernel-r3 — lane amendments-b/repair-kernel-r3 (KERNEL part, §3): report and ledger

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/repair-kernel-r3; queued in docs/FABLE-REVIEW-QUEUE.md.

Block file: `docs/validation/amendments-b/repair-r3-kernel.md` (blocks only). Base: `docs/ARCHITECTURE.md` sha256
`831efd429092adf3…`, `docs/ARCHITECTURE-RATIONALE.md` sha256 `f2c2a1ca11a0f1da…` (validate's base, unchanged).

PROGRESS (kill-safe ledger; one line per item, updated after every block)
ITEM VR2-04 (9): planned §3.2 (9) pointer | done: block 1 (REPLACE §3.2) — complete
ITEM VK2-01 (28, 28 (f)): planned §3.4 routes paragraph (answer unit and key); J-A28.34 Part A restated | done: block 2 (REPLACE §3.4), block 3 (RATIONALE-A J-A28.34) — complete
ITEM VK2-02 (28 (f)): planned §3.4 routes paragraph (more than one input side, each) | done: block 2 (REPLACE §3.4) — complete
ITEM VK2-03 (28 (f)): planned §3.4 re-cut paragraph (fixed list from §2.6); J-A28.33 Part A restated (same stale list) | done: block 2 (REPLACE §3.4), block 3 (RATIONALE-A J-A28.33) — complete
ITEM VK2-04 (28): planned §3.4 signature + seed-clip text; J-A28.34 Part A restated | done: block 2 (REPLACE §3.4), block 3 (RATIONALE-A J-A28.34) — complete
ITEM V-MAB2-15 (28): planned §3.4 transientArena `fixed` comment | done: block 2 (REPLACE §3.4) — complete
BLOCK FILE: complete — 4 header lines (REPLACE §3.2, REPLACE §3.4, RATIONALE-A, END). RECEIPTS: done. REPORT: done.

## Outcome

All six issues routed to this seat (VK2-01, VK2-02, VK2-03, VK2-04, V-MAB2-15, VR2-04) are fixed in two REPLACE blocks
(§3.2, §3.4) and one RATIONALE-A block that restates two Part A entries (J-A28.33, J-A28.34). No index row changes, so
there is no J-ROWS block. There is no new ruling: the one sentence of reasoning VK2-01 adds is recorded in J-A28.34's
Part A entry.

**Hand-off (1), for the assembler: restated rows.** The RATIONALE-A block restates J-A28.33 and J-A28.34 whole.
`apply-blocks.py` appends them as duplicates. Its log reports "DUPLICATE ID inserted"; that is expected, not an error.
The restated-row swap of `assemble-r1-handoff.py` (`swap_restated`, reused unchanged by `assemble-r2-handoff.py`) then
moves each restated row into the older row's place. Dry-run receipt: 2 Part A swaps, 0 index swaps, and the rationale
diff is exactly those two rows at lines 353 and 487. No other lane of round 3 restates either id (validate §5 names
J-A28.34 for VK2-04 only; V-MAB2-09 amends J-A28.26).

**Apply order.** Apply this file with V-MAB2-09 (model, §2.6), whose stage-3 contract and step 4 define the "clip
order" that §3.4 now cites. It also goes with VK2-06 (determinism, §5.2 F-PLAN). VK2-02 lands here before VK2-09 (3)
(scope, §13.1), as validate orders them. None of those lanes edits §3.2 or §3.4.

## Per issue

| issue | fixed where | what changed |
|---|---|---|
| VK2-01 | §3.4 routes paragraph; J-A28.34 Part A | "That route is read by placement and by its grid item and is never the unit of an answer": a query and `readBack` return each of the arena's edges as an item of its own. A grid hit on an input side expands into its pieces that meet the query's box (§3.3). Each edge is keyed by §3.3's key read on its own endpoints, so the key stays total |
| VK2-02 | §3.4 routes paragraph | "more than one input side … it reads each", with the counts: a joint (2), a fixed ring's side along a seed side (2), a fixed ring's side along a joint such as a kept room's or the passage room's (3), two fixed rings back to back across a joint (4) |
| VK2-03 | §3.4 re-cut paragraph; J-A28.33 Part A | "passes as `fixed` rings the rings §2.6's re-cut rule fixes (the stair core's bay, the chimney stacks, the passage room, the composer's rooms and the rooms the ladder keeps)" |
| VK2-04 | §3.4 `tileRings` signature and seed-clip text; J-A28.34 Part A | the order is "the caller's clip order (§2.6)"; the pieces are the overlay faces "that it contains and no ring before it contains, united"; new sentence: "§2.6's clip order puts a contained wing after its container, so the refusal marks a caller's bug (F-PLAN, §5.2)"; Part A now says the plan rung's clip order settles the hole case |
| V-MAB2-15 | §3.4 `transientArena` `fixed` comment | "a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`)" |
| VR2-04 | §3.2 (9) | "(the side with its square root; item 9; the cap figures: §12.2)" |

**Deviations from the validator's text, with the reasons:**
* **VK2-01.** One clause is added: "a grid hit on an input side expanding into its pieces that meet the query's box
  (§3.3)". Without it, "the grid holds it as one item" and "a query returns every edge on its own" read as a
  contradiction. The clause names §3.3's own expansion step, which reconciles them.
* **VK2-02.**
  - The wording is "a fixed ring's side along a joint — a kept room's, or the passage room's", not the validator's "a
    kept room's or the passage room's side along a joint". A stair bay or chimney stack against a joint lies on three
    input sides too.
  - The four-side case (two fixed rings back to back across a joint, such as two kept rooms either side of the wall
    between wings) is named. "More than one … each" is the rule, and the list only illustrates it.
* **VK2-03, two more places with the same stale list.**
  - In §3.4's re-cut paragraph, "Its vertices on a seed or anchor side" becomes "on a seed ring's side or on another
    fixed ring's side". "Anchor" is no longer the list's word, and a kept room's vertex can lie on the stair bay's side.
  - J-A28.33's Part A entry carried the same lagging list ("the anchors that never move (… a passage)"), so it is
    restated with §2.6's list. The ruling is unchanged.
* **C3 rewording (document checks).** The first build drew three unreviewed C3 hits, all from the validator's
  suggested words, so they were reworded:
  - "§2.6 step 4" (the digit run "2 6 step 4 s") is now "(§2.6)" in the signature and "(§2.6's clip order)" in the body.
  - "It is the route that …" became "That route is read by placement and by its grid item and is never the unit of an
    answer". A first rewording ("serves placement and the grid and …") drew a fourth C3 hit, "placement and the grid
    and".
  - "every edge between two of the arena's vertices on its own" became "each of the arena's edges as an item of its
    own".
  The meaning is unchanged, and no allow row was added.
* **VK2-04.** "This construction is the one way edges enter a transient arena" becomes "The opening's exact insertion is
  the one way …". The seed-clip text now stands between that sentence and the construction it named, and `tileRings`
  enters no edges.

## Receipts

* **CONFIRMED (executed).**
  - `apply-blocks.py` dry run on the live document (sha256 `831efd42…`) and rationale (`f2c2a1ca…`): 3 blocks found, 3
    applied, 0 skipped. Audit not-OK count 0; headings 145 → 145; fences balanced; title block unchanged. The only note
    is the expected duplicate ids J-A28.33 and J-A28.34 (hand-off (1)). Log: `scratchpad/r3k_apply.json`.
  - The swap from hand-off (1) was run on the output. The rationale then differs from the live file in exactly the two
    restated rows, each in place.
  - A word-level diff of the §3.4 block against the live section shows only the intended substitutions; the reflowed
    lines change no other word.
  - Every old string matched exactly once (the build script asserts it).
  - No inline code span crosses a line.
  - The claims were checked against the text:
    - §3.3's Queries paragraph returns "each level-n route edge once" and keys it on the route's endpoints (VK2-01).
    - §2.6's FIXED list includes "the composer's rooms", and `Composition.rooms` exists (VK2-03, V-MAB2-15).
    - §12.2 holds the cap figures and points back to §3.2 (9) (VR2-04).
    - J-A28.34's Part A holds both phrases VK2-04 replaces.
* **DOC CHECKS.** `doc_checks.py --doc <dry-run output after the swap> --sections "3"` with the live allow file exits
  0. Counts: C1 5 hits / 0 unreviewed (pre-existing), C2 0, C3 97 / 0 unreviewed, C4 0, S1 0, S2 0. Output:
  `scratchpad/r3k_dc3.out`. The dry-run document is sha256 `a6e237d3…` and the rationale after the swap `86a809ed…`.
  The "Judgment calls" section is not touched, because no index row changes. The rationale file is outside
  doc_checks' scope.
* **PLAUSIBLE (reasoning only).**
  - That the container-after clip order leaves no holed piece. The argument: a hole needs a component of the earlier
    rings' union inside the later ring's interior. Each ring of such a component then lies wholly inside the later ring,
    and the clip order puts every such ring after it.
  - The three- and four-side counts, read from the rings §2.6 passes.
