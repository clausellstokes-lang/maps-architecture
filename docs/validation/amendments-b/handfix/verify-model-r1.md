# handfix-b/verify-model-r1 — verification of the MODEL part's fixes after repair round 1

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-model-r1).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned closing-report §2 (model #5 #7 #14 #15 #16 #18 #19), §3, handfix/apply.md, verify-model-r0, repair-model-r1 report + block file, assemble-r1, sibling issues VKH-01/02, VPH-04, VSH-03 | done
ITEM diff: planned word diffs archive(pre-handfix-b) -> live and archive(pre-repair-r1) -> live, by subsection | done (scratchpad handfix/vm1/wdiff-{all,r1}.txt; §2.5/§2.6/§7.1 r1 changes = the intended fixes only)
ITEM per-fix: planned PRESENT / PARTIAL / MISSING / MISAPPLIED for the closing fixes and the repair-r1 model fixes | done (closing 23/23 present or superseded as recorded; r1 24 probes once, 9 retired texts 0)
ITEM sweeps: planned untouched text, single source, references, deferral, item 20, over §2.5, §2.6, §7.1 whole and the citing subsections | done (refs 2 pre-existing; deferral 0; item 20 held; 5 minor issues)
ITEM checks: planned doc_checks.py (three-copy method; this lane edits no design text) | done (untouched x3 = 555 C3, exit 0; proposals copy adds 0 hits, exit 0)
ITEM close: planned queue row, LANDED line | done

Lane `handfix-b/verify-model-r1`, 2026-09-27, a verifier seat (opus). Inputs: `docs/ARCHITECTURE.md` sha256
`e9c0b828…` and `docs/ARCHITECTURE-RATIONALE.md` `dcabf14b…` (as handfix-b/assemble-r1 installed them; unchanged through
this lane). The befores: `docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md` (`1a861c72…`, before the hand fix) and
`docs/archive/ARCHITECTURE-pre-handfix-b-repair-r1-2026-09-27.md` (`5d752c9b…`, before repair round 1), with their
rationale twins. This seat edits no design text.

## Outcome

* **Every model fix is in place, once, where it belongs.** The 23 sub-changes of the closing report's model issues
  (#5, #7 with #6 (ii), #14, #15, #16, #18, #19) are PRESENT. Six of them were later widened or replaced by repair round
  1, as that round recorded, and their core text is still there (§1). All ten round-1 model repairs (VHM-01 … VHM-06,
  VKH-01, VKH-02, VPH-04, VSH-03) are PRESENT, including the hand-offs H1 (§7.3 item 1) and H2 (§13.2 T8-3), the
  carried T30-4 clause, and J-A30.26. Scripted probes found each new text exactly once and each retired text zero times
  (§2).
* **No other text changed.** In §2.5, §2.6 and §7.1, repair round 1 changed only the intended clauses. The same holds
  for the model index rows (J-A28.23, J-A28.26, J-A28.28, J-A29.25, J-A30.26) and the Part A entries (J-A28.26 restated,
  J-A30.26 new).
* **Other checks pass.** References: 2 broken, both pre-existing citations of outside documents. Deferral wording: 0.
  Item 20 holds: no model text lets an epoch, an edit or a solver rung remove a dossier element or a household on a
  dossier's roster.
* **Five minor issues are returned (§4).** Each is a gap the fixes left or exposed, and none needs the owner:
  * 3 model: VHM1-01 (the `Basement.access` comment), VHM1-02 (step 5's walk-out root), VHM1-03 (a tower's spiral stair
    and its round room overlap as fixed rings);
  * 1 kernel: VHM1-04 (§3.4's description of a holed piece);
  * 1 rendering: VHM1-05 (§8.2's arch glyph does not say it needs a `frontBuilding`).

  All seven required changes were applied together to a scratch copy. There they add 0 document-check hits and 0
  broken references.

## 1 The closing report's model fixes (#5, #7, #14, #15, #16, #18, #19)

Probe: `scratchpad/handfix/vm1/closing_checks.py`, which reads `handfix.py`'s rows. Counts are whitespace-normalised.
"Live" means the installed text; "arch" means the pre-handfix-b archive.

| # | sub | verdict | evidence |
|---|---|---|---|
| 5 | (i) | PRESENT | new text 1 in live, 0 in arch; the old text 0 in live. It reads "the last in address order passing over a locked or pinned one (§7.2), which keeps its building" |
| 5 | (ii) | PRESENT | new 1, old 0: "No such change is refused for it, except a hand edit whose excess cannot be re-homed …" |
| 5 | (iii) | PRESENT as amended by VHM-06 | the J-A28.23 row reads "never by refusing the change, except a hand edit whose excess cannot be re-homed, which returns F-EDIT; the re-homing passes over locked and pinned households". It has the same content in an order that no longer contradicts itself |
| 5 | (iv) | PRESENT | J-A28.23's Part A sentence, 1 |
| 6 | (ii), carrying 7 (3) | PRESENT | F-EDIT: "a heights edit that would leave a base wing spanning a passage below two floors (§2.5 `Passage.headroomCm`; item 30);" |
| 7 | (1) | PRESENT as amended by VHM-01 (1) | the closing text's three parts are each present once: "the passage's clear height … and so on every re-fit,", "as the least ground-storey height (eaveCm ÷ floors …) over the base wings that span it" and "S11 gives every spanning wing at least two floors …" |
| 7 | (2) | PRESENT as amended by VHM-01 (2) and VHM-02 | "`Passage.headroomCm` and `Passage.frontBuilding` are derived — …" |
| 7 | (4) | PRESENT as amended by VHM-01 (3) | T30-4: "every passage with a `frontBuilding` has its `headroomCm` written and equal to §2.5's rule, after a heights edit of a spanning wing too, each base wing spanning it has at least two floors …" |
| 7 | (5), (6) | PRESENT | J-A30.25 index row and Part A entry, 1 each |
| 14 | (i)–(v) | PRESENT | new 1, old 0, for each |
| 15 | (1) | PRESENT as replaced by VHM-04 with VKH-01 | the closing ruling's substance holds: a tower that engages a wing stands before the wings, and every composer's room lies inside one seed piece. The round room is now its ring less any earlier tower it engages, as J-A28.26 records |
| 15 | (2) | PRESENT as replaced | J-A28.26 index row: "the composed towers before all the wings in `Composition.towers` order, but …" |
| 15 | (3) | PRESENT | Part A sentence, 1. It is kept as history; the round-1 sentence after it records the amendment |
| 16 | — | PRESENT | step 5: "and a walk-out basement's outside door (step 3, `external`) the root of the basement's storeys;" (see VHM1-02) |
| 18 | (i)–(iii) | PRESENT | new 1, old 0, for each |
| 19 | — | PRESENT | new 1, old 0 |

Nothing is PARTIAL, MISSING or MISAPPLIED.

## 2 Repair round 1's model fixes

Probe: `scratchpad/handfix/vm1/r1_probes.py` → `r1_probes.out`. Each text below occurs once in live and zero times in
the pre-round-1 archive. Each retired text occurs zero times in live: the old `spans` writer ("written and cleared only
by S11", which was 2 before), the old step 4 gloss, the old tower parenthesis, the old J-A29.25 / J-A28.23 / J-A28.28
wordings, the two old clamp glosses, and the old headroom tail.

| issue | where (live) | verdict | note |
|---|---|---|---|
| VHM-01 (1) | §2.5 `Passage.headroomCm` | PRESENT (recorded deviation, judged sound) | The event is named as "(a `setAttr` of heights, §7.1, or the `undo` of one, §7.4)", not as "its former value in that event's undo record". An inverse `setAttr` is itself a heights event, so it re-derives; §7.4's Application paragraph holds each event's replaced records in its undo record. "Kept … read by no reader, while none does" closes the empty set left after a clearance |
| VHM-01 (2) | §7.1 registry sentence | PRESENT (widened) | also declares `frontBuilding` derived, which §2.8's registry rule needs |
| VHM-01 (3) | §13.2 T30-4 | PRESENT verbatim | carried by the scope block |
| VHM-02 (1)–(3) | §2.6 `BaseWing.spans`; §2.5 `frontBuilding`; §7.1 buildings row | PRESENT (widened to `robStone`, and to `demolish` clearing `spans` too) | §2.8 confirms that `robStone` and `clear` both reach `cleared`, which zeroes the heights |
| H1 | §7.3 item 1 | PRESENT once | "an event that changes a spanning wing's heights, or makes its building a footprint trace or a tombstone, holds the passage it spans …" |
| H2 | §13.2 T8-3 | PRESENT once | the bar for the trace-and-tombstone rule. Its milestone is M4, with the decline hooks it tests (J-A8.01) |
| VHM-03 = VKH-02 | §2.6 step 4 | PRESENT (VKH-02's pointer) | "in the clip order, which the stage-3 contract states, by §3.4's seed clip" |
| VHM-04 + VKH-01 | §2.6 stage-3 contract; J-A28.26 index row and Part A | PRESENT (reconciled ruling) | The order is sound. A tower that precedes its container overlaps an earlier wing B. B is not wholly inside that container, so every part of B inside the container touches its sides, and no piece gets a hole. A contained tower that follows its container avoids every earlier wing, so its room lies in the container's piece. See VHM1-03 and VHM1-04 for two consequences |
| VHM-05 | J-A29.25 index row | PRESENT (reworded to avoid a C3 hit) | |
| VHM-06 | J-A28.23 index row | PRESENT verbatim | |
| VPH-04 (1), (2) | §2.6 `households` comment; capacity bullet | PRESENT verbatim | |
| VSH-03 | J-A28.28 index row | PRESENT verbatim | |
| J-A30.26 | index row and Part A | PRESENT once each | "(amends J-A30.25)", following the document's convention for amended rows |
| VHM-07 (scope) | §13.2 T28-2, T28-3 | PRESENT | cited here because VHM1-02 aligns step 5 with it |

## 3 Sweeps

**What was read.** §2.5 and §2.6 were read whole in the live text (l. 826–1532), and §7.1 whole (l. 6392–6622).
Also read, at the places that cite them:

* §2.8: the decline states, the elaboration record and the registry;
* §3.4: the `tileRings` and `transientArena` contracts and the seed-clip paragraph;
* §4.7: S11's passage sentence;
* §5.2: the F-PLAN and F-EDIT rows;
* §7.3: item 1;
* §7.4: the setAttr, convert, undo and passage rows, and the Application paragraph;
* §8.2: the passage-arch row; §8.4: the casters; §8.5 (2): the span mark;
* §11.1: the glTF and CityJSON rows;
* §13.2: T8-3, T28-2, T28-3 and T30-4;
* the model's index rows and Part A entries;
* item 30 of `docs/AMENDMENTS-2026-09-25b.md`.

* **No other text changed.** CONFIRMED by the subsection word diffs.
* **Single source.** Round 1 moved step 4's copy of the clip order to a pointer. Three restatements that the fixes left
  inexact are VHM1-01, VHM1-02 and VHM1-04. The fifth issue, VHM1-05, concerns a rendering home (§8.2) that does not
  state the drawing consequence §2.6 now declares.
* **Lifecycle of `Passage.frontBuilding`, which now has two writers:**
  * create and regenerate: S11, with `spans`;
  * clear: the trace or tombstone event, which H1 puts in the event's effective scope;
  * read: §7.3 item 1, §8.5 (2), T30-4, and implicitly §8.2 (VHM1-05);
  * persist: the passage leaf;
  * undo: §7.4's Application paragraph. The undo record holds the records the scope replaced, and H1 puts the passage
    in the scope;
  * migrate: no older document has a passage.
* **Lifecycle of `Passage.headroomCm`.** It is re-derived by S11 and by every heights event, including an undo of one,
  and kept unread while no wing spans the passage. CONFIRMED on the text.
* **References.** Run on the live document: 139 heading keys, 35 D ids, 472 J ids, 2 broken. The two are `os-geometry.md`
  §2.1.4 (l. 2705) and RFC 7946 §3.1.6 (l. 9192), both pre-existing citations of outside documents. Every J id the new
  Part A text cites resolves in both files: J-A30.42, J-A30.25, J-A28.33, J-A28.71 and J-P48.
* **Deferral wording.** 0 hits in §2.5, §2.6, §7.1 and the six model rows. Probes: TBD, to be decided / determined,
  open question, deferred to, decide later, later pass / round, TODO, FIXME, left open, revisit.
* **Owner rules.** Item 20 holds: round 1 adds no removal of a dossier element or a roster household. Item 30 (c)
  defines a passage as covered; J-A30.26 keeps it a passage face, open above, after its front building is cleared.
  That is a recorded, vetoable call and contradicts no owner text: decline changes existence and drawing (§7.4's
  convert row), and exposure is never a sight line (J-A30.42). It is listed under PLAUSIBLE for the Fable review.
* **Sibling filed to model.** VPH1-02 (verify-pipeline-r1): a building built for a slot without `houses` should get
  capacity 0. It was read. It touches none of this lane's anchors and is not re-filed.

## 4 Issues

| id | owner | severity · kind | where | defect |
|---|---|---|---|---|
| VHM1-01 | model | minor · stale gloss | §2.6 `Basement.access` comment | glosses the core's trapdoor fallback but not the walk-out's (#18 (ii)) |
| VHM1-02 | model | minor · partial | §2.6 step 5 | roots a walk-out basement at an outside door that step 3's fallback does not open (T28-2 already says "where step 3 opens one") |
| VHM1-03 | model | minor · conflict | §2.6 stage-3 contract; J-A28.26 | a tower that is the spiral core passes its bay and its round room as two overlapping fixed rings, which §3.4 refuses |
| VHM1-04 | kernel | minor · stale gloss | §3.4 seed-clip paragraph | glosses a holed piece as "an earlier ring wholly inside a later one", which round 1's tower order now makes legal without a hole |
| VHM1-05 | rendering | minor · partial (single source) | §8.2 passage-arch row | does not key the glyph on `Passage.frontBuilding`, while §2.6 now says that no arch glyph is drawn over an uncovered passage |

Every old string below occurs exactly once in its file, whitespace-normalised (a single space may match one soft line
break; `vm1/proposals.py`).

### VHM1-01 — the `Basement.access` comment omits the walk-out's fallback (minor · model)

**Claim.** The comment at l. 1019 glosses the plan rung's joins: "the stair core (where no bay of the core fits inside
the ring, a trapdoor core the plan reports: the plan rung, step 3), a trapdoor, or an outside stair". #18 (ii) gave
`external` the same reported trapdoor fallback where no side of `Basement.ring` fits a door. So the second statement
now covers one fallback and not the other, and a reader of the type would take `external` always to mean an outside
stair. CONFIRMED on the text.

**Required change.** §2.6 `Basement.access`: replace "a trapdoor, or an outside stair; derived with the basement, a shell
fact (Basements, below) */" with "a trapdoor, or an outside stair (step 3's reported trapdoor core where no side of
`Basement.ring` is long enough for its door); derived with the basement, a shell fact (Basements, below) */".

### VHM1-02 — step 5 roots every walk-out at an outside door (minor · model)

**Claim.** Step 5 reads "and a walk-out basement's outside door (step 3, `external`) the root of the basement's
storeys". After #18 (ii), a walk-out whose ring has no side a door fits takes the trapdoor fallback. `Basement.access`
stays `external` ("stays as derived"), and no outside door exists. A plan keyed on `external` would therefore root the
basement at a missing door. VHM-07 fixed the same gap in T28-2 ("at its outside door where step 3 opens one"); the rule
itself was left without it. CONFIRMED on the text.

**Required change.** §2.6 step 5: replace "and a walk-out basement's outside door (step 3, `external`) the root of the
basement's storeys;" with "and a walk-out basement's outside door, where step 3 opens one (`external`), the root of the
basement's storeys;".

### VHM1-03 — a tower's spiral core and its round room overlap as fixed rings (minor · model)

**Claim.** The plan rung treats a spiral stair in a tower in these places:

* §2.6 step 3: the stair core is "the composed tower as a spiral" (`StairCore.tower`).
* Step 6: "a composed tower is a round room per storey with the spiral inside".
* The stage-3 contract: every composer's room, "a tower's round room included", is passed as a fixed ring.
* Step 4 and the re-cut bullet: the stair core's bay is passed as a fixed ring too.

§3.4's `transientArena` requires fixed rings with "interiors pairwise disjoint" and refuses an overlap (`E_DEGENERATE`,
`overlap`). F-PLAN tier 2 then either exhausts the bay's candidates, all inside the tower, and takes tier 6, or aborts on
the refused composer's room as a bug. Either way, every composed tower that carries its spiral fails.

Round 1's ruling routes a stair inside a tower to exactly this path ("a stair inside a tower is its spiral core,
`StairCore.tower`"). That is what makes the gap part of this pass: it existed before round 1 but was not found.

The conflict is CONFIRMED on the text. The ruling proposed is PLAUSIBLE and vetoable, following the realism tiebreaker:
a tower's spiral stair stands against its wall, or fills a stair turret.

**Required change.**

(1) §2.6 stage-3 contract. Replace "a tower that follows its container has no piece there, and its round room lies
inside the container's piece." with "a tower that follows its container has no piece there, and its round room lies
inside the container's piece. A tower that serves as the spiral core (`StairCore.tower`, step 3) has the core's bay
placed against its wall, and at each storey the core serves the plan rung passes its round room less that bay — the bay
alone where it fills the ring, a stair turret — so the bay and the round room, both fixed rings, never overlap (§3.4's
`transientArena`)."

(2) J-A28.26's index row. Replace "so no piece has a hole, every composer's room inside one seed piece | §2.6 |" with
"so no piece has a hole, every composer's room inside one seed piece, a tower's round room passed less its spiral
core's bay | §2.6 |".

(3) J-A28.26's Part A entry. Replace "(handfix-b verify-model-r0 VHM-04 with verify-kernel-r0 VKH-01, reconciled). |"
with "(handfix-b verify-model-r0 VHM-04 with verify-kernel-r0 VKH-01, reconciled). A tower that serves as the spiral
core passes its round room less the core's bay, the bay set against the tower's wall so that the room has no hole, or
the bay alone where it fills the ring (a stair turret), over passing the bay and the whole round room, which §3.4's
transient arena refuses as overlapping fixed rings, and over a bay in the middle of the room, which would leave the
room a ring with a hole (handfix-b verify-model-r1 VHM1-03). |". (The repair seat restates the row and swaps it in.)

### VHM1-04 — §3.4's description of a holed piece is stale after the tower order (minor · kernel)

**Claim.** §3.4 describes the seed-clip refusal this way: "A piece left with a hole — an earlier ring wholly inside a
later one — is refused … §2.6's clip order puts a contained wing after its container, so the refusal marks a caller's
bug".

Round 1's tower order puts a tower that lies wholly inside wing A, and overlaps an earlier wing B, before A. That is an
earlier ring wholly inside a later one, yet no hole results, because B carries the cut to A's sides (§2).

The detection itself names "a vertex of the hole", so it is exact. The description, however, would lead an implementer
to refuse a legal order, and it states the caller's guarantee for wings only. CONFIRMED on the text, by reasoning.

**Required change.** §3.4: replace "A piece left with a hole — an earlier ring wholly inside a later one — is refused
(`E_DEGENERATE`, detail `overlap`, naming a vertex of the hole), because a seed is one ring. §2.6's clip order puts a
contained wing after its container, so the refusal marks a caller's bug (F-PLAN, §5.2)." with "A piece left with a
hole — earlier rings lying inside a later one without reaching its sides — is refused (`E_DEGENERATE`, detail
`overlap`, naming a vertex of the hole), because a seed is one ring. §2.6's clip order puts a contained wing after its
container, and a composed tower wholly inside a wing before that container only where an earlier wing the tower
overlaps carries its cut to the container's sides, so the refusal marks a caller's bug (F-PLAN, §5.2)."

### VHM1-05 — §8.2's arch glyph does not name `frontBuilding` (minor · rendering)

**Claim.** VHM-02 made §2.6 say that an uncovered passage has "no span mark, span caster or arch glyph drawn over it",
and J-A30.26 rests that on every reader keying on `spans` or `frontBuilding`. The readers differ:

* §8.5 (2), §8.4 and §11.1 key on `Passage.frontBuilding` or `BaseWing.spans` explicitly.
* §8.2's row draws "an arch glyph on the front building's outline at each end of the face", keyed on the passage face.

After a `clear`, the cleared trace still stands on the front plot with its outline, so an implementer could still draw
the glyph there. The rendering home should state the condition that the model section now declares. CONFIRMED on the
text.

**Required change.** §8.2's passage-arch row: replace "an arch glyph on the front building's outline at each end of the
face" with "an arch glyph on the front building's outline (`Passage.frontBuilding`; none while the passage has none,
§2.6's `BaseWing.spans`) at each end of the face".

## 5 Document checks and references (receipts in `scratchpad/handfix/vm1/`)

`python3 docs/validation/bench/doc_checks.py --sections "2,3,8,Judgment calls"` was run against one corpus snapshot
(9 626 JSON files, 911 940 C3 3-grams). This lane writes no design text, so "mine" and "combined" are one copy: the
live document with this lane's seven required changes applied (`vm1/proposals.py` → `doc-mine.md`).

| run | copy | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|---|
| untouched ×3 (before, between, after) | live `e9c0b828…` | 5 | 0 | 555 | 3 | 0 | 0 | 0 | 0 |
| mine = combined (final wording) | live + VHM1-01 … 05 | 5 | 0 | 555 | 3 | 0 | 0 | 0 | 0 |

* The three untouched runs were identical, so the corpus held still.
* A run of both copies with an empty allow file shows no added hit (`dc-noallow-*`).
* Two first drafts did add hits, and both were reworded: "where the plan rung takes" (VHM1-03, unreviewed) and
  "side of the ring is" (VHM1-01, already covered by an allow row).
* References on the proposal copy: 2 broken, the same 2 pre-existing.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read in place):

* The 23 closing sub-changes and the round-1 repairs are present once, the retired texts are gone, and the diffs show
  no other change.
* The references and deferral probes are as stated.
* The texts that VHM1-01 … 05 rest on were read in place, and every anchor occurs once.
* The proposals add 0 document-check hits.

**PLAUSIBLE** (reasoning, for the Fable review):

* The clip-order soundness argument of §2.
* VHM1-03's proposed ruling: a spiral bay against the wall, or a stair turret's bay alone.
* J-A30.26's choice to keep an uncovered passage as a passage face with its exposure unchanged. This is item 30 (c)'s
  "covered way" against the decline rule.
* How often the VHM1-02 … 04 paths are reached.
