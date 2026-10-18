# verify-kernel-r3 — lane amendments-b/verify-kernel-r3 (VERIFY the KERNEL part, §3, after repair round 3)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-kernel-r3).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
BASE: docs/ARCHITECTURE.md sha256 1a861c72… (assemble-r3 installed; checked); rationale 8a24a5a7… (checked)
READ: assemble-r3 whole; repair-kernel-r3 report whole; validate.md kernel section; verify-kernel-r2 whole; §3 diff r2→r3 (6 hunks: §3.2 ×1, §3.4 ×5); §3.2, §3.4 whole; §3.3 index and queries; §3.6 placement rule; §3.10 rows; §2.6 stage-3 contract, steps 1–6, re-cut; F-PLAN; §12.7 plan row; §13.1 fixtures; T28-3; §1.1 RungProfile; §12.2; J-A28.33/J-A28.34 index and Part A — done
ITEM 12: PRESENT (unchanged since r1) — done
ITEM 21: PRESENT (unchanged) — done
ITEM 28: PRESENT | new issue on §2.6 composer-room containment (model) — done
ITEM 28 (f): PRESENT | J-A28.33 index row stale word (kernel) — done
ITEM 30: PRESENT (unchanged) — done
RE-CHECK VK2-01..VK2-10 and V-MAB2-15, VR2-04: all 12 resolved — done
CHECKS: single-source, stale, cross-part, deferral wording, broken references, new problems — done (§4)
RECEIPTS: hashes 1a861c72…/8a24a5a7… checked; refs 139/35/470, broken 2 external; doc_checks '3,Judgment calls' exit 0 (C3 161/0) — done (§6)
STATUS: COMPLETE (2026-09-27): 3 issues — 0 blocker, 0 major, 3 minor; owners model 1 (VK3-01), kernel 1 (VK3-02), scope 1 (VK3-03); all 12 round-2 issues resolved

## Outcome

Repair round 3 fixed all six kernel issues as the validator required: VK2-01, VK2-02, VK2-03, VK2-04, V-MAB2-15 and
VR2-04. The four issues this lane routed to other parts in round 2 are fixed too: VK2-05 (model), VK2-06 (determinism),
and VK2-07, VK2-08, VK2-09 and VK2-10 (scope). The repair seat's deviations from the validator's text are sound. The one
clause it added ("a grid hit on an input side expanding into its pieces that meet the query's box (§3.3)") names §3.3's
own expansion step, and its four-side case is correct by count. Items 12, 21, 28, 28 (f) and 30 are PRESENT in the
route's terms. Only §3.2 (9) and §3.4 changed in §3, in 6 diff hunks, all inside the two kernel REPLACE blocks.

Three new issues remain, all minor:
* **VK3-01 (model).** Round 3 made §3.4 name a composer's room among the `fixed` rings, each "inside one seed ring".
  §2.6's clip order places a contained wing, but it gives a composed tower (a round wing held in `Composition.towers`,
  not in `Composition.wings`) no place in "wing order". It also has no rule that keeps a composer's room inside its
  wing's piece where that wing overlaps an earlier one. A round tower that engages a wing's corner and is clipped after
  it therefore has its round room refused, and F-PLAN aborts that refusal as a bug.
* **VK3-02 (kernel).** J-A28.33's index row still passes "the fixed anchors" as `fixed` rings. §2.6's vocabulary
  (J-A28.26, the FIXED list) calls the entrances and hearths anchors, and they are not passed as fixed rings. Round 3
  restated the entry's Part A, but not its index row.
* **VK3-03 (scope).** §13.1's `tileRings` differential compares every case with the oracle's difference. On a case
  with an earlier ring wholly inside a later one, the oracle gives a holed polygon where §3.4 refuses. The gap is in
  the wording this lane's own VK2-09 (1) required.

**Nothing needs the owner's ruling.** VK3-01's required change is a model-seat judgment call: a composed tower comes
before the wings it engages, so that a round tower keeps its round room. It is recorded as a J-A28 row by that seat.

## 1 What was read (whole unless stated)

* `docs/AMENDMENTS-2026-09-25b.md` items 12, 21, 28 (with (f)) and 30, and `route.json`'s four kernel entries (home [],
  referencing 12, 21, 28, 30), as in rounds 1 and 2; their mechanisms in §3.1, §3.7, §3.8 and §3.10 did not change in
  round 3.
* `assemble-r3.md` whole (its §8 cross-part list names "the clip order in §2.6 (cited by §3.4 and §5.2), and `tileRings`
  in §2.6 and §5.2" and "§1.1's pointer to §3.2 (9)"); `repair-kernel-r3-report.md` whole; `validate.md`'s kernel
  section (VK2-01 to VK2-04, V-MAB2-15, VR2-04) and its routing table; the other five repair-r3 reports, grepped for
  §3 and kernel notes (none is addressed to this part); this lane's `verify-kernel-r2.md` whole.
* `docs/ARCHITECTURE.md` §3 (l. 2082–3201), diffed against `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r3-2026-09-27.md`
  §3 (l. 2060–3172): 6 hunks, in §3.2 (9) and in §3.4's signature, `fixed` comment, seed-clip text, routes paragraph and
  re-cut paragraph. §3.2 and §3.4 were read whole in their live text.
* The text the changed kernel cites or that cites it: §3.3's index items, queries and canonical key (l. 2440–2481);
  §3.6's placement rule (l. 2765–2784); §3.10's placement-bound and seed-tiling rows (l. 3170, 3181); §2.6's
  `Composition`, `ComposedTower` and `Room` (l. 982–990), the stage-3 contract with the clip order (l. 1252–1266), plan
  steps 1–6 (l. 1352–1412) and the re-cut's FIXED list and gloss (l. 1500–1513); F-PLAN (l. 5639); §12.7's plan row
  (l. 9859–9863); §13.1's differential clause and the amendments-b fixtures (l. 10088, 10106–10124); T28-3
  (l. 10377–10378); §1.1's `RungProfile` (l. 211); §12.2 (l. 9516–9533); the index rows J-A28.26, J-A28.33 and J-A28.34
  (l. 12828, 12821, 12955) and Part A's J-A28.33 and J-A28.34 (rationale l. 353, 487), word-diffed against the archive.

## 2 Per item — PRESENT, PARTIAL or MISSING in the terms the route required

| item | route's ask of §3 | verdict | the mechanism, quoted (live text) |
|---|---|---|---|
| 12 | §3.7: `bandUnion` / the corridor use on `tunnel` chains, the outer wall the plots' frontage edge | **PRESENT** (unchanged since round 1; verdict of `verify-kernel-r2.md` §2 kept) | §3.7 l. 2952: "in the underground arena a tunnel's corridor half-width, `widthCm ÷ 2 + wallCm`"; `faceNeighbours` takes an `ArenaKey` (l. 2549, 2589). |
| 21 | §3.1: the skeleton row's licence ground | **PRESENT** (unchanged) | §3.1 l. 2098, the straight-skeleton row: "none adopted …"; its GPL ground under §17.4's permissive-only closure is as quoted in round 2. |
| 28 | §3.4 / §3.8 / §3.10: the plan partition's operations; a skeleton reader; rooms tile each storey's wings, outer walls on the wing rings | **PRESENT** | §3.4 l. 2541: "`tileRings(rings: Ring[] /* … in the caller's clip order (§2.6) */)` … per input ring its pieces — the faces of one overlay of all the rings that it contains and no ring before it contains, united"; l. 2639–2640: "§2.6's clip order puts a contained wing after its container, so the refusal marks a caller's bug (F-PLAN, §5.2)"; l. 2664–2668: "That route is read by placement and by its grid item and is never the unit of an answer: a query and `readBack` return each of the arena's edges as an item of its own … keyed by §3.3's canonical key read on that edge's own endpoints". §3.8 and §3.10 unchanged. New issue: VK3-01 (model), VK3-03 (scope). |
| 28 (f) | the re-cut (J-A28.33) | **PRESENT** | §3.4 l. 2678–2680: "passes as `fixed` rings the rings §2.6's re-cut rule fixes (the stair core's bay, the chimney stacks, the passage room, the composer's rooms and the rooms the ladder keeps)"; l. 2670–2673: "on an edge that lies on more than one input side it reads each: a joint lies on two, a fixed ring's side along a seed side on two, a fixed ring's side along a joint … on three, and two fixed rings' sides back to back across a joint on four". New issue: VK3-02 (J-A28.33's index row). |
| 30 | §3.4 / §3.7 / §3.10: the passage keeps planarity and nesting | **PRESENT** (unchanged) | §3.10's nesting row (l. 3169) and the seed-tiling row (l. 3181: "every spanned passage's span ring" on the ground storey; "a wing's ring, or above the ground its ring ∪ the span ring of the passage it spans" above it). |

## 3 The round-2 issues — re-checked against the assembled text

| r2 id | owner | where re-checked (live lines) | verdict |
|---|---|---|---|
| VK2-01 | kernel | §3.4 l. 2664–2668; §3.3 l. 2468–2481; Part A J-A28.34 (rationale l. 487) | **resolved**. The validator's sentence is present, reworded to clear three C3 hits without changing its meaning. The added clause names §3.3's own expansion step ("expands each route-edge hit into the pieces of its level-n route that meet the box"), which reconciles "one item" with "each edge on its own". On a one-level arena every edge is a level-0 route edge under §3.3's definition, so the key read on its own endpoints is §3.3's total key. Part A records the reason. |
| VK2-02 | kernel | §3.4 l. 2670–2673 | **resolved**, with a list wider than required. The counts are right: a joint gives 2; a fixed ring's side along a seed side gives 2; a fixed ring's side along a joint gives 2 seed sides and 1 fixed side, 3 (for the passage room, whose span ring is both seed and fixed, the wing's seed side plus the span ring's two roles, also 3); two fixed rings back to back across a joint give 4. Four is the maximum, because the seeds' interiors and the fixed rings' interiors are each pairwise disjoint. |
| VK2-03 | kernel | §3.4 l. 2678–2680, 2684; §2.6 l. 1502–1507; Part A J-A28.33 (l. 353) | **resolved**. The list matches §2.6's fixed rings. "a seed or anchor side" became "a seed ring's side or on another fixed ring's side". Part A was restated with the same list. The index row still says "fixed anchors" (VK3-02). |
| VK2-04 | kernel | §3.4 l. 2541, 2632–2640; Part A J-A28.34 | **resolved**: the signature, the body ("the first ring in the order passed (§2.6's clip order)"), the new refusal sentence, and both Part A phrases. "This construction is …" became "The opening's exact insertion is …", which is correct because `tileRings` enters no edges. |
| V-MAB2-15 | kernel | §3.4 l. 2613 | **resolved**: "a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`)"; `Composition.rooms` exists (l. 983). Follow-on: VK3-01. |
| VR2-04 | kernel | §3.2 (9) l. 2197–2198; §12.2 l. 9531 | **resolved**: "(the side with its square root; item 9; the cap figures: §12.2)". §12.2 holds the cap figures and points back to §3.2 (9) for the scaling, so there is no longer a loop. |
| VK2-05 | model | §2.6 l. 1262–1266, 1386–1388, 1511–1513 | **resolved**: "the **clip order**: wing order, except that a wing whose extent there lies wholly inside another's is taken after that container (two identical extents keep wing order) … and no piece has a hole, which the clip refuses"; step 4 names `tileRings`; the gloss reads "an overlapping wing, earlier or later in the clip order … (the clip's crossing vertices included, §3.4)". |
| VK2-06 | determinism | F-PLAN l. 5639 | **resolved**: tier 1 reads "a seed or fixed ring the rung's seed clip or transient arena refuses (… §3.4's `tileRings` and `transientArena`)", and tier 2 reads "(its clip order leaves no seed piece with a hole: §2.6's stage-3 contract, §3.4's `tileRings`)". |
| VK2-07 | scope | T28-3 l. 10377–10378 | **resolved**: "through a trapdoor — the one `Basement.access` names, or the `trapdoor` core the plan reports where no bay of the core fits the basement ring (§2.6's fallback; J-A29.25) — or, for a walk-out …, by its outside stair". |
| VK2-08 | scope | §13.1 l. 10110–10111 | **resolved**: "every crossing vertex a vertex of both rings, the joint shared vertex for vertex, and the seeds accepted". |
| VK2-09 | scope | §13.1 l. 10088, 10111–10113, 10123–10124 | **resolved**, all three parts. Part (1)'s required wording has a gap for the hole case (VK3-03). |
| VK2-10 | scope | §1.1 l. 211 | **resolved**: "the frame scales with the requested population (§3.2 (9))". |

## 4 The checks (on the repaired subsections §3.2 and §3.4; everything else keeps `verify-kernel-r2.md` §4's verdict)

**SINGLE-SOURCE.** Each of round 3's mechanisms is stated once. The clip order is homed in §2.6's stage-3 contract, and
§3.4 cites it by name ("the caller's clip order (§2.6)", "§2.6's clip order") without restating it. The answer unit on
a transient arena is homed in §3.4's routes paragraph, and Part A J-A28.34 gives the reason without restating the rule.
The re-cut's fixed list in §3.4 opens with "the rings §2.6's re-cut rule fixes" and lists them in a parenthesis that
matches §2.6's FIXED list. The frame scaling is homed in §3.2 (9), with §12.2 pointing back to it and holding only the
cap figures. There is no kind-duplicate finding.

**STALE.** The r3 diff adds no stale sentence. Probes over the live §3 find no binary wealth, no rich or poor, no
market, no dossier, no proprietary licence, no lots as buildings, no size fixed by tier, and no terrain or water that
never changes. The two hits for "never change" are the index handle and the seed rings under an occupant change;
neither is stale. "wing order" no longer occurs in §3. "anchor" in §3.4 is used only in its kernel sense (an `anchor`
contact name) and, at l. 2626, for a planner's stair bay or stack placed on a wall. One stale phrase remains outside
§3's text but in the kernel's index row: J-A28.33's "the fixed anchors" (VK3-02).

**CROSS-PART.** Every pointer in the changed kernel text resolves to a section that states what the kernel assumes,
with one exception:
* §3.4's `fixed` contract now names the composer's rooms and requires each to lie "inside one seed ring". §2.6 places
  a contained wing's fixed rings in its container's piece. It does not place a composed tower in the clip order, and it
  does not keep a composer's room inside its wing's piece where that wing overlaps an earlier one. This is VK3-01.

§2.6, §5.2, §12.7 and §13.1 all now name `tileRings` or the clip order as §3.4 does. Assemble-r3's cross-part probe list
agrees. No other repair-r3 report addresses a note to this part.

**DEFERRAL-WORDING.** §3 has no "TBD", "open question", "to be decided", "deferred" or "not yet" in the deferral sense.
The 13 hits for "later", "not yet" and "licence" are temporal, a vertex "not yet" placed, or §3.1's licence column.
Round 2's handed-off choice ("which wing takes the enclosed rooms is the plan rung's choice") is gone from Part A, and
§2.6 makes that choice.

**BROKEN-REFERENCE.** `refs.py` finds 139 heading keys, 35 D ids, 470 J ids and 2 broken references: the pre-existing
external pair `os-geometry.md` §2.1.4 (l. 2708) and RFC 7946 §3.1.6 (l. 9200). Every pointer that round 3 added
resolves:
* "§2.6's clip order" resolves to the bold **clip order** at l. 1263;
* "F-PLAN, §5.2" resolves to l. 5639;
* the expansion step "(§3.3)" resolves to l. 2470;
* `Composition.rooms` resolves to l. 983;
* "the cap figures: §12.2" resolves to l. 9526–9533.

**NEW-PROBLEM.** None arises inside §3. Round 3's text is consistent with §3.3's key, §3.6's placement rule (whose
fallback, moving an incoming vertex onto the edge's nearer endpoint, also covers a multi-side edge with no qualifying
lattice point) and §3.10's rows. The two cross-part consequences are VK3-01 (model) and VK3-03 (scope).

## 5 Issues — each with its owning part and the exact required change

Line numbers are the installed document's (`docs/ARCHITECTURE.md`, sha256 `1a861c72…`).

### VK3-01 — minor · conflict · model · item 28 (§2.6 stage-3 contract l. 1262–1266, `ComposedTower` l. 988, `Room.wing` l. 990, step 4 l. 1385–1390; against §3.4's `fixed` contract l. 2613 and F-PLAN tier 2 l. 5639)
**Claim.** Round 3 (V-MAB2-15) made §3.4's `fixed` comment name "a composer's room (a hall, a tower's round room: §2.6's
`Composition.rooms`)" among rings "each inside one seed ring (a room never spans a joint between wings)". The seed
rings are the clipped pieces. §2.6's clip order is "wing order, except that a wing whose extent there lies wholly inside
another's is taken after that container", and it places a contained wing's anchors and fixed rings in the container's
piece. Two cases have no rule:
* **A composed tower has no place in "wing order".** It is "for the plan rung a round wing" (l. 988), but it is held in
  `Composition.towers`, not `Composition.wings`. A tower's room names it by "wings.length + the tower's index" (l. 990),
  which reads as after every wing. A round tower that engages a wing's corner and is clipped after that wing has the
  disk less the wing as its piece. Its round room ("a composed tower is a round room per storey", step 6), the whole
  ring, then crosses the joint.
* **A composer's room in any later wing** that reaches into an earlier wing's extent has the same problem.

§3.4 refuses such a ring (`E_DEGENERATE`, `overlap`: a fixed ring across a seed ring's side). F-PLAN tier 2 aborts that
refusal as a bug of "the shell §2.6's composition contract guarantees", but the contract guarantees it only for seeds
("leaves no seed piece with a hole"). How often a composer's tower engages a wing is PLAUSIBLE, not measured. The
round-2 determinism seat asked Fable whether composer's rooms belong in the abort clause
(`repair-determinism-r2-report.md`, "What Fable should re-check first" (1)). This finding answers that question: they
belong there only once §2.6 guarantees their containment.

**Required change (model, §2.6).**
1. In the stage-3 contract, after "…and no piece has a hole, which the clip refuses." insert: "A composed tower — a
   round wing to the plan rung — stands in the clip order before every wing its ring overlaps without lying wholly
   inside it (a tower wholly inside a wing follows its container, as above), so its round room is its whole ring at
   each storey it reaches and the wing's piece takes the arc; every other composer's room (`Composition.rooms`) lies
   inside its own wing's piece at its storey — the composer emits it inside that wing's extent less the extents before
   the wing in the clip order — so every fixed ring the plan rung passes lies inside one seed piece (§3.4's
   `transientArena`), and F-PLAN's abort on a refused composer's room (§5.2) marks a composer's bug."
2. Record the choice as a judgment call. Use the model seat's next J-A28 id. The index row is "a composed tower before
   the wings it engages in the clip order, so its round room stays round; every composer's room inside its wing's
   piece | §2.6". The Part A entry: chose the tower first over the tower last (its room clipped to a partial disk),
   because a round tower keeps its round room (the realism tiebreaker; the Fantasy-Manor composer's towers are whole),
   and the engaged wing's rooms take the arc as a wall.
3. In J-A28.26's index row, "a wing wholly inside another's at a storey after that container" becomes "a wing wholly
   inside another's at a storey after that container, a composed tower before the wings it engages".

### VK3-02 — minor · stale · kernel · item 28 (f) (index row J-A28.33, l. 12821)
**Claim.** The row reads "with the kept rooms and the fixed anchors as `fixed` rings". §2.6 names the entrances and
hearths as anchors ("every entrance and its door and the hearths — anchors placed before any cut"), and they are not
passed as fixed rings. J-A28.26's index row (l. 12828) keeps the two apart: "the entrances and hearths as anchors, the
stair bay, stacks, passage room, composer's rooms and kept rooms as `fixed` rings". Round 3 dropped "anchor" from
§3.4's re-cut for exactly this reason (repair-kernel-r3's deviation for VK2-03) and restated J-A28.33's Part A, but it
left the index row.

**Required change (kernel, J-ROWS restating J-A28.33; restated-row swap).** "with the kept rooms and the fixed anchors
as `fixed` rings" becomes "with the rings §2.6's re-cut rule passes as `fixed` rings (the stair bay, the chimney
stacks, the passage room, the composer's rooms and the kept rooms)". The rest of the row is unchanged.

### VK3-03 — minor · new-problem · scope · item 28 (§13.1 differential clause, l. 10088)
**Claim.** The clause requires "differential agreement with the CI oracles … on booleans, `tileRings` (each ring's
pieces against the oracle's result for that ring less every earlier ring) and buffers … unattracted cases with equal
face counts and symmetric difference ≤ perimeter × 1 cm". Suppose a drawn case puts an earlier ring wholly inside a
later one. The oracle then returns the later ring's difference as a polygon with a hole, while §3.4 refuses it
(`E_DEGENERATE`, detail `overlap`, l. 2638–2639). A correct kernel therefore fails the differential on every such case.
The transient-arena fixtures test that refusal on its own (l. 10112), so only the differential's wording is at fault.
The gap is in the text this lane's VK2-09 (1) required in round 2.

**Required change (scope, §13.1).** "(each ring's pieces against the oracle's result for that ring less every earlier
ring)" becomes "(each ring's pieces against the oracle's result for that ring less every earlier ring, and a refusal
— detail `overlap` — exactly where that result has a hole)".

## 5a De-duplication with the sibling verify-r3 reports

At 10:34 the sibling verify-r3 files (model, pipeline, determinism) held skeletons only, so there was nothing to
de-duplicate against. VK3-01 touches §2.6 (model) and F-PLAN (determinism). If verify-model-r3 or
verify-determinism-r3 files the same gap, apply one text.

## 6 Receipts (executed 2026-09-27; scratch copies under the session scratchpad `vk3/`)

* **Hashes.** `docs/ARCHITECTURE.md` sha256 `1a861c729f26ba99…` and `docs/ARCHITECTURE-RATIONALE.md` `8a24a5a7b5719460…`
  equal assemble-r3's installed values. They were checked at the start and again after the resolver ran. The archive
  `ARCHITECTURE-pre-amendments-b-repair-r3-2026-09-27.md` is `831efd42…`.
* **§3 diff** between the archive (l. 2060–3172) and the live §3 (l. 2082–3201) has 6 hunks, all inside
  `repair-r3-kernel.md`'s two REPLACE blocks (`sec3-r2.md`, `sec3-r3.md`, `sec3.diff`).
* **Part A word diff** of J-A28.33 and J-A28.34 between the archive and the live file shows only the repair's stated
  substitutions (`pa-old.txt`, `pa-new.txt`).
* **References.** The resolver ran as `python3 docs/validation/amendments-b/refs.py docs/ARCHITECTURE.md
  <scratchpad>/vk3/refs.json`, with its output argument in the scratchpad, never a design file. It found 139 headings,
  35 D ids, 470 J ids and 2 broken references, both pre-existing external citations.
* **Document checks.** `python3 docs/validation/bench/doc_checks.py --sections "3,Judgment calls"` gave C1 5/0, C2
  0/0, C3 161/0, C4 0/0, S1 0/0, S2 0/0, and **exit 0**. The corpus was 9 626 JSON files and 911 940 3-grams, with
  994 unreadable capture-body warnings as in earlier rounds; the run took 1 min 53 s (`dc.out`, `dc.err`). The allow
  file was not touched.
* **Probes** (grep, live text):
  * "wing order" occurs 0 times in §3;
  * `tileRings` occurs at l. 1262, 1388, 2541, 2632, 5639, 9862, 10088, 10111 and 12955;
  * "clip order" occurs in §2.6 (l. 1263, 1375, 1387, 1512), §3.4 (l. 2541, 2634, 2639) and F-PLAN (l. 5639);
  * "composer's room(s)" occurs at l. 1390, 1507, 2613, 2680 and 5639;
  * `ComposedTower` has no clip-order rule (l. 988, 1263–1266);
  * J-A28.33's index row reads "the fixed anchors".

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (quoted text or an executed check):
* the item verdicts (§2) and the round-2 re-check table (§3), each backed by the quoted live text;
* VK3-02, from the quoted index rows;
* VK3-03, from the quoted §13.1 clause against §3.4's refusal;
* VK3-01's textual gap: no clip-order position for a composed tower, and no containment rule for a composer's room in
  an overlapping wing;
* the hashes, the diff, the resolver and the document checks.

**PLAUSIBLE** (reasoning only, since no kernel or composer exists yet):
* how often a composed tower engages a wing, which gives VK3-01's practical weight;
* that the tower-first clip leaves every engaged wing's piece simple (a disk cut from a corner leaves a simple ring
  where the tower's centre lies outside the wing or on its boundary);
* the repair seat's argument that the container-after clip order leaves no holed piece (a hole needs an earlier
  union component inside the later ring's interior, and each ring of that component is then wholly inside it). This
  lane re-derived it and agrees.
