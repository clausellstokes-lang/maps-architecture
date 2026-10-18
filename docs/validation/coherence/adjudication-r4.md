# Adjudication round 4 — binding rulings for repair round 4

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/adjudicate-r4; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/adjudicate-r4`, 2026-10-01)
- P0 brief read whole; inputs located (round4-work 17 files, 145 issues, no V05 file; repair-r3 ×18; verify r3t ×20; adjudication-r2, -r3; canon's dated rulings; file g items 120–126): done
- P1 ruling requests of round 3's repair files: none filed (all eighteen headers say 0; a search finds no block): done
- P2 every issue read whole (145); multi-reporter, ping-pong and round-3-caused groups found; round 3's HAND-OFFS checked in the live text: done
- P3 binding rulings R4-01 – R4-16, each checked against the owner rules it touches and swept for every reader: done
- P4 Part H, all 145 issues (127 FIX, 18 MERGED, 0 INVALID), J141 grades (1 regrade), 49 END lines under 16 units: done
- P5 canon dated ruling "2026-10-01 (adjudication round 4)" appended; result saved; LANDED: done


## How to read this file

**Who reads what.** Each of the eighteen repair seats of round 4 reads (1) its row of the table of contents, (2) every
ruling that row lists, whole, and (3) its unit's heading in Part H: the disposition of each issue it owns, then its
**END lines** — the exact text this unit writes for a fix another unit owns. A seat's whole work is under its own
heading (R3-01, kept by R4-01). V05 owns no issue this round but holds END lines, so it runs (R4-01 (4)).

**Dispositions** (Part H, one row per issue of `docs/validation/coherence/work/round4-work/<unit>.json`):

| word | meaning |
|---|---|
| **FIX** | apply the issue's `required_change` as written |
| **FIX per R4-nn** | apply it, but where R4-nn's text differs from the `required_change`, R4-nn governs |
| **FIX, amended** | apply it with the amendment the note states (the note's text governs) |
| **MERGED into X** | the same defect at the same unit as issue X: X's fix (as ruled) closes it; nothing further at this id |
| **INVALID** | closed for good, with its reason; never raised again |

Where one defect spans several units, each unit's text is its own FIX (or an END line under it), "one fix with" the
primary id; MERGED is used only inside one unit.

**Grades** (J141's SEVERITY STANDARD). The `sev` column is the reporter's; the `grade` column is this adjudicator's,
with a one-line reason where it differs. A regrade never changes the disposition: every issue is FIXED, MERGED or
INVALID this round.

**Precedence used** (principle (3)): the owner's words (file g items 102–126, the owner's instructions, DEFINITION) > an
f item or a J-VI decision > the base's canonical home > a volume's restatement. A ruling made under J122 says so and is
vetoable. adjudication-r2.md and adjudication-r3.md stay binding except where an entry below supersedes one of their
rulings or END lines by name.

**No ruling id in design text** (R3-02, kept). Every text below that a seat writes into the design names a design home,
never an `R4-nn`, `R3-nn` or verifier id; where a quoted text below cites a ruling, the seat writes the home the ruling
names.

## Summary

* **Ruling requests:** none filed in round 3's eighteen repair files (Part A).
* **16 binding rulings** (R4-01 – R4-16), each checked against the owner rules it touches (quoted in the ruling) and
  swept across the set for every text that reads or restates what it changes (an END line for each, or the reason none
  is needed). **Round-3 causes superseded or amended by name:** R3-21's END line for V09 §4.2 — the cause of both
  blockers VAL-R3-01 = VAT-r3-01 — by R4-02 (the view draws its working layer; every switch, Find's **Go there**
  included, writes nothing; owner item 120 (a)); R3-08 (b)'s entry week for a restoring re-cut by R4-03 (blocker
  VV56-r2-06 = VV34-r3-01: the new elements enter the damage when the restoration ends); R3-13's test texts by R4-11
  (VAP-r3-03 – 05: no key withholds a look-bearing condition); R3-25 (c) and support step (6) by R4-09; R3-17 by R4-08
  (a calamity carried late); R3-18's reach by R4-07 (the hint bounded by the present at creation, inclusive); R3-14 (3)
  by R4-06 (the owner's stake barricades and cordon across a way); R3-14 (4) by R4-13; R3-20 (2) by R4-15 (fallbacks at
  an absorb keep the carried fact; the cap still refuses); R3-24 by R4-12 (Find at a drawn week reads the frame's own
  uses).
* **The raised-way crossing family converges on one rule (R4-09, J122):** generation places the supports last — a
  stage's trace re-sites an earlier raised way's crossing station, the support step runs once more after S7, and where
  a moat or strip cannot pass under the deck it stops at the under-deck strip (no S5a walk, no dropped course);
  after generation a standing raised way is **held** — its supports, ramps, stairs, feet and `vault` spans a reservation
  every later way, trace, strip, channel, plot and square gives way to, a later trace bent through one of its stations,
  a locked one crossed by the same rule, nothing waiting. It closes VEW-r3-01 (blocker), VEW-r3-02 – 05, VM-R3T-04 –
  06, VAL-R3-02, VAL-R3-03 and their bars, bends and locality rows.
* **Other recurring classes ruled once:** the disaster look's units and the buildings it stands over, one phrase each,
  V09 asking `looks` per building (R4-04); the view-bound why (R4-05); Auto applying a change while the view is settled
  (R4-10); the roofless case at §6.3 (R4-14); V08's own change for an over-budget catch-up, open since round 2, ruled as
  one absorb batch per epoch (R4-16).
* **Dispositions of the 145 issues:** 127 FIX (73 as written, 46 under a ruling as written, 8 amended by a ruling), 18
  MERGED into a sibling id of the same unit, 0 INVALID. Parts of required changes not written (each in its issue's
  note): VV910-r3-02's `yielded` list (a per-building `over` instead), VM-R3T-04's walk of boundary nodes, VM-R3T-05's
  waiting and span-bending clauses, VM-R3T-06's wait and refusal, VDC3-07's re-run of the support step, VAL-R3-03's three
  listed triggers (one trigger instead), VV56-r2-06's "0 until the next decay run" (the restoration's end week instead).
* **Grades (J141):** reported 5 blocker, 61 major, 79 minor; graded 5 blocker, 62 major, 78 minor — one regrade
  (VM-R3T-07 raised: two units, two outcomes for one case). The blockers: VAL-R3-01 (with VAT-r3-01 merged), VEW-r3-01,
  VV56-r2-06 (with VV34-r3-01 merged).
* **END lines:** 49, under 16 unit headings (kernel and V02 hold none); V05 owns no issue and runs for its three.
* **Canon:** one dated ruling appended to `canon.md` (Part I).

## Table of contents by unit

Each row: the issues the unit owns, the END lines it writes for others, and the rulings it applies whole (every seat
reads R4-01, and R3-01 – R3-03, which stand); then its heading in Part H.

| unit | issues | END lines | rulings binding it (with R4-01) | its heading |
|---|---|---|---|---|
| scope (base §0–§1, §13–§17, the index, INDEX.md) | 13 | 4 | R4-06, R4-08, R4-09, R4-10, R4-11, R4-15 | Part H · scope |
| model (base §2) | 14 | 1 | R4-02, R4-03, R4-04, R4-07, R4-09 | Part H · model |
| kernel (base §3) | 1 | 0 | R4-09 | Part H · kernel |
| pipeline (base §4, §10, PART II, PART III) | 15 | 5 | R4-04, R4-06, R4-08, R4-09, R4-13 | Part H · pipeline |
| determinism (base §5–§7) | 11 | 3 | R4-09, R4-14, R4-15 | Part H · determinism |
| rendering (base §8, §9, §11, §12) | 14 | 5 | R4-02, R4-04, R4-05, R4-06, R4-10, R4-12 | Part H · rendering |
| V01 | 2 | 1 | R4-09, R4-12 | Part H · V01 |
| V02 | 3 | 0 | R4-04, R4-11 | Part H · V02 |
| V03 | 6 | 1 | R4-03, R4-04, R4-11 | Part H · V03 |
| V04 | 4 | 1 | R4-02, R4-04, R4-09, R4-11, R4-12 | Part H · V04 |
| V05 | 0 | 3 | R4-02, R4-09, R4-12 | Part H · V05 |
| V06 | 7 | 6 | R4-03, R4-07, R4-09, R4-16 | Part H · V06 |
| V07 | 5 | 1 | R4-05 | Part H · V07 |
| V08 | 13 | 4 | R4-04, R4-07, R4-08, R4-15, R4-16 | Part H · V08 |
| V09 | 17 | 7 | R4-02, R4-04, R4-05, R4-09, R4-10, R4-12, R4-14, R4-16 | Part H · V09 |
| V10 | 7 | 3 | R4-02, R4-03, R4-04, R4-05 | Part H · V10 |
| V11 | 6 | 1 | R4-04, R4-09 | Part H · V11 |
| V12 | 7 | 3 | R4-06, R4-11, R4-13 | Part H · V12 |

Parts: A the ruling requests · B the whole round (R4-01) · C the rulings (R4-02 – R4-16) · H
per-unit dispositions · I canon changes.

## Part A — the ruling requests

Round 3's eighteen repair files (`docs/validation/coherence/repair-r3-*.md`) carry **no** `RULING REQUEST` block (each
file's header says "Ruling requests: 0"; a search of all eighteen finds none). Nothing to rule here. The questions round
3's seats left in their HAND-OFFS are ruled where they belong: the model's (S5a's last rung, the decline op on a held
stretch, V06's release) in R4-09; the kernel's (§4.11's foot batch and raised re-derivation) under VKr3-01; V08's (the
host's `setLayer` sender, the key and seed fallbacks, B3 against B5) under VV78-r3-04, R4-15 and VV78-r3-01; V09's and
V03's (the deleted look word, `storeyGone`, §8.6's floor row) under VAH-r3-01, VV34-r3-03 and VV34-r3-02; V10's
(`LooksAnswer.festivals`' absent name) as an END line under rendering (VV910-r3-03); V06's (V08's catch-up change) in
R4-16. Every other round-3 hand-off was checked in the live text and found written (V04's per-element `decayPeak`, V02's
X36, V10's `info.damage.patched`, §10.2's `CrisisLookRow.label`, V03's head key, V06 §3.20.4's *Cancel*, §7.1's
`addUndergroundAccess` keys).

## Part B — the whole round

### R4-01 Both ends, the sweep, supersession by name, and grading

**Governs:** every issue of round 4.

**Decision.** (1) R3-01 – R3-03 stand: each seat applies every FIX and every END line under its heading in Part H, in
the same round as the owning seat's share; an END line's text is written as given (where it says "in its words", at
build depth with the content stated); no review id in design text; J141's grades, with R3-03's two recurring classes
(a list that omits an id its own clause runs is MINOR; two units stating two outcomes for one case is MAJOR however rare
the case). (2) **The sweep is the seat's too.** Round 3's rulings broke texts that restated what they changed (the
working-layer switch, the tests staging a withheld key, the creation week's readers). So a seat applying a ruling's text
greps its own unit for the term, field, key and section the ruling changes and conforms every restatement it finds in the
same block, naming each in its report; the restatements this adjudicator's sweep found in other units are the END lines
below; one it missed goes to the seat's HAND-OFFS for round 5's verifiers, never open wording in the design. (3)
**Supersession by name.** This round supersedes or amends: R3-08 (b)'s entry week for a restoring event's re-cut
(R4-03); R3-16's per-district reading at V09 (R4-04 (c); R3-10 stands); R3-14 (3)'s barricade-only carriageway (R4-06);
R3-14 (4)'s count for the `neighbourhoods` place (R4-13); R3-17's trigger for a calamity dated at or before the last epoch
(R4-08); R3-18's reach to `HistoryHint` (R4-07); R3-20 (2)'s fallbacks at an absorb (R4-15); R3-21's END line for V09
§4.2 and row 21 (R4-02); R3-24's "restricted to the entities that frame holds" (R4-12); R3-25 (c) and support step (6)
as round 3 wrote it (R4-09); R3-13's consequences for the tests (R4-11). (4) A seat whose unit owns no issue but holds
END lines runs: V05 (END lines under its heading). (5) No seat re-raises an issue ruled INVALID or MERGED in
adjudication-r2, -r3 or here.

## Part C — the rulings: round-3 causes superseded by name, recurring classes ended

### R4-02 Find's Go there writes nothing: the view draws its working layer

**Governs:** VAL-R3-01 (V09, BLOCKER), VAT-r3-01 (V09, BLOCKER, MERGED), VRC3T-02 (model §2.9), VAT-r3-05 (V10 row 26);
ends at rendering §8.4, §9's label candidates and §11.2's `ExportOpts.layers`, V04 §5.1 and V05 §5.6 (3).
**Supersedes** R3-21's END line for V09 §4.2 and V09 §3.16 row 21 (adjudication-r3, Part H · V09, END of VAT-r2-04),
the cause of both blockers. R3-21 (a) stands.

**Owner rules checked.** Item 120 (a): "Find never changes the model, the document, its hash or the edit log; it is
per-viewer view state". Item 120 (f): matches on another layer are ghost pins, "and the panel says '2 more Below' / '1 on
Sky' with **Go there**". Item 125 (c): a host sends "a week, a layer, a selection" as a user would (R3-21 (a): the host's
layer command is a logged `setLayer`, kept). §11.3's roles: a viewer's client never emits `doc.changed`.

**Decision (J122, vetoable).** (a) R3-21 (a) stands: `LayerSpec.visible` is the document's style state; a layer's own
toggle (§7.8's layer controls, T12 `dress`; the sewer control at CITY and METROPOLIS; the island view toggle) and a host's
layer command are a logged `setLayer`. (b) **The view draws its working layer.** `workingLayer` (§2.9, per viewer; V09
§4.2) is a view key: a view draws its working layer whatever that layer's `LayerSpec.visible`, and every other layer by
its `LayerSpec.visible` (V09 §4.2's 35 % dimming over those drawn). Switching the working layer — V09's view bar, Find's
**Go there**, a clerk's `useTool` on a mode's layer — sets view keys only (`workingLayer`, `depthBand`, the island menu's
`key`) and never writes `LayerSpec`: it sends no event, so a viewer switches as an owner does. A layer toggled off while
it is the working layer stays drawn in that view until its user switches away; the toggle changes what every other view
and the exports' default draw. (c) So **Go there** shows the match's layer and logs nothing (item 120 (a), (f)).
**Why this form over the reporters':** VAL-R3-01's form kept the view bar's switch writing a logged event — a viewer's
switch then needs an event its role cannot send, and every switch to the hidden-by-default underground is an undo step
on the shared style; VAT-r3-01's form kept the document clean but left a layer hidden after its user chose to work on
it (Go there landing on ghost pins, **Show it** a second step). One view rule closes both: what a viewer works on is
drawn for that viewer; what the document shows is its style. It is V09's pre-round-3 behaviour ("view state only") under
R3-21's model of the layers. (d) Readers of "the layers the view shows" read "draws": visible, or the working layer.

**Home:** §8.4's *Toggles are visibility* bullet (rendering). **Texts:**
* **rendering §8.4** (END), after "… a toggle never creates what the settlement lacks (…)": "The view's working layer
  (§2.9's per-viewer `workingLayer`, V09 §4.2) is drawn in that view whatever its `LayerSpec.visible`, every other layer
  by its `LayerSpec.visible`; switching the working layer — V09's view bar, Find's **Go there**, a clerk's `useTool` —
  sets view keys only and never writes `LayerSpec`, so it sends no event and a viewer switches as an owner does
  (§11.3), and Find changes no document, hash or log (item 120 (a)); a layer's own visibility changes only by its toggle
  (§7.8's layer controls, T12 `dress`) or a host's layer command, each a logged `setLayer`."
* **rendering §9's candidate set** (END; l. 14674–14675): "every `LabelTable` row drawn at the band whose layer is
  visible (`LayerSpec.visible`, §8.4 — a hidden underground or sky layer's district, tunnel and cell labels are not
  candidates; …" → "every `LabelTable` row drawn at the band whose layer the view draws (its `LayerSpec.visible`, or the
  view's working layer, §8.4 — a hidden underground or sky layer that is not the working layer: its district, tunnel and
  cell labels are not candidates; …", the rest as it stands.
* **rendering §11.2's `ExportOpts.layers`** (END; l. 16074): "those the view shows (`LayerSpec.visible`, §8.4)" →
  "those the view draws (`LayerSpec.visible`, and the view's working layer, §8.4)".
* **model §2.9** (VRC3T-02): its *View state* list drops "layer choices" and adds after the list: "The layers shown are
  no view key: `LayerSpec.visible` is the document's style state, set by a logged `setLayer` (§8.4, §7.1; §11.3); the
  per-viewer `workingLayer` (below) is drawn whatever its visibility (§8.4)."
* **V09 §4.2** (VAL-R3-01): "Switching layer also sets the layer's visibility on (§7.8's layer controls:
  `LayerSpec.visible`, written by `setLayer`, §8.4) and dims the other layers to 35 % opacity." → "Switching layer
  draws the working layer whatever its `LayerSpec.visible` and dims the other layers drawn to 35 % opacity (§8.4) — a
  view key, per viewer, writing nothing to the document; a layer's own visibility is §7.8's layer controls, T12 `dress`'s
  logged `setLayer`." **Row 21**'s outcome "switching the working layer turns its visibility on (by `setLayer`, §8.4)"
  → "the working layer drawn whatever its visibility, nothing written (§8.4); a layer toggled off while working stays
  drawn in this view until the switch moves". **§4.21.10 (8)**: "Sky sets it to Sky, the island menu's `key` to the
  match's island and a hidden sky layer visible (V05 §5.6 (3))" → "Sky sets it to Sky and the island menu's `key` to the
  match's island — view keys only, a hidden layer drawn as the working layer (§8.4), no event sent (item 120 (a);
  §9.5)". **T-V9-83 (g)**: "(a hidden sky layer shown)" → "(a hidden Below or sky layer drawn as the working layer, 0
  events logged, its `LayerSpec.visible` unchanged)"; (i) stands.
* **V05 §5.6 (3)** (END): "and Go there turns its visibility on, as switching the working layer does" → "and Go there
  makes Sky the working layer, which the view draws whatever its visibility (§8.4), no event sent (item 120 (a))".
* **V04 §5.1** (END): "When the underground layer is visible, one depth band draws at a time" → "When the underground
  layer is drawn — visible, or Below the view's working layer (§8.4) — one depth band draws at a time".
* **V10 §3.23 row 26**: VAT-r3-05's text.

Sweep: §7.8's control rows (l. 12161–12164), II.7.1 (l. 20815) and V09 §4.2's Below group ("while Below is the working
layer or the underground is visible") already agree; no further END.

### R4-03 A restoring re-cut's new elements enter the damage when the restoration ends

**Governs:** VV56-r2-06 (V06, BLOCKER), VV34-r3-01 (V06, BLOCKER, MERGED), VV34-r3-06 (V03); ends at V03, model §2.6 step
7 and V10. **Amends** R3-08 (b)'s entry week "for an element a re-cut mints (… a restoring event's included) … that
change's effective week".

**Owner rule checked.** Item 123 (b): "the building's **decay level** … shows every element whose threshold it has
passed. Damage therefore only accumulates as decay goes on … Restoration (`reused`, a repair) lowers the level and the
damage leaves in reverse order, a repaired element drawn in patch material". A partition, door or furniture piece the
restoring event's own re-cut makes for its new occupants was never decayed: drawing it damaged while the repair Works
runs and then patched for ever is damage that never came (R3-08 (b)'s blocker, not closed by R3-08 (b) for this case).

**Decision (J122, vetoable).** One level per building (item 123 (b)) and the per-element entry week R3-08 (b) already
passes carry the whole case; no per-element level is made. **V06 §3.23 (3)**, after "… or a wing an `extend` adds at
that change's effective week": "— save that an element a restoring event's re-cut mints (V03 §3.11: the new occupants'
partitions, doors and furniture) enters the plan, for its damage, at the week that restoration ends: its `repair`
Works' FINISHED week, or the week a decay run that begins before then starts ((2): such a run starts from the level the
restoration left); with no Works, the event's effective week. Before that week it is drawn as built — no level the
restoration lowers damages it or is its peak — so a restoration's new elements are neither damaged nor repaired by it,
and a kept element keeps its entry week and peak; from that week on it reads the building's level as every element does".
`decayPeak`'s `since` comment: "the element's entry week into the plan, V03 §5.6 (2) (b) — for an element a restoring
event's re-cut mints, the week that restoration ends ((3)); 0 for a week before `since`". **§3.21's decay-level row** adds
VV56-r2-06's row ("a `reoccupy` whose re-cut is made while its `repair` Works runs past its epoch's week | the minted
elements drawn as built throughout the repair, the kept ones leaving the damage and patched"). **T-V6-76 (b)** adds "a
`reoccupy` from derelict whose `repair` Works is still running at its epoch's week: every element its re-cut mints drawn
as built in every week of the Works, and from the Works' FINISHED week reading the level as any element". **J-V6.139**
adds the reading. VV56-r2-06's alternative ("reads 0 until the building's next decay run") differs only where a run
interrupts the repair: there the minted element joins the building's one level from that run's start, as every element
present then does — the owner's single level, nothing relocated, nothing silent.

**Ends** (END lines): **V03 §5.6 (2) (a)** adds "an element is compared with the level only from its entry week ((b);
V06 §3.23 (3))"; **(b)**'s "that change's effective week (V06 §2.11)" → "that change's effective week (V06 §2.11) — for an
element a restoring event's re-cut mints, the week that restoration ends (V06 §3.23 (3))"; §1b's and §2.5's `planDamage`
rows (l. 303, l. 926) name the entry week so; V03 §13's V06 row cites V06 §3.23 (3). **Model §2.6 step 7**: "an element
that entered the plan after its damage left never drawn repaired (V06 §3.23 (3))" → "an element that entered the plan
after its damage left, or that a restoring event's re-cut minted, never drawn damaged by that restoration nor repaired
(V06 §3.23 (3))". **V10** (l. 1844): "an element that entered the plan after its damage left never among them" → "an
element that entered the plan after its damage left, or that a restoring re-cut minted, never among them". Sweep: §8.6
(l. 13980), V02 l. 3058, X34 and X36, V04 l. 2916 and T-V4-82 (f) read `decayPeak` with the `since` V03 passes, which
now carries the case; they need no change. VV34-r3-06's `own` comment is V03's FIX.

### R4-04 A disaster look's units, and the buildings it stands over: one phrase each

**Governs:** VV12-r3-01 (V02), VV12-r3-04 (V03), VV12-r3-02, VAL-R3-06, VAF-R3T-03 (rendering), VV12-r3-05, VAL-R3-08
(pipeline), VAL-R3-09 (V04), VAF-R3T-02, VAH-r3-06 (V11), VM-R3T-07 (model), VV910-r3-02, VAH-r3-02 (V09), VPC-R3-02
(pipeline); ends at V08 l. 2688, V10 l. 1014, rendering §11.2's `looks` member and V02 l. 2455 and J-V2.113. R3-10 and
R3-16 stand; R3-16's per-district reading at V09 is amended by (c).

**Owner rules checked.** Item 122 (b): "**disaster** — whole neighbourhoods in a temporary ruined state"; (a): "a
disaster's ruined look gives way to the Works scaffolding of `reconstruction`"; (d): "Interiors in a disaster's ruined
neighbourhood show item 123's damage as a look while it lasts".

**Decision.** Two phrases, one meaning each, in every unit:
* **(a) A disaster look's units** — the districts V01's `disasterDistricts` returns; at THORP, HAMLET and VILLAGE V07
  §5.6 (3)'s units (`villageDisasterUnits`: its ends, or in an end-less thorp its toft groups), a unit's buildings and
  faces those on the plots `villageUnitPlots(doc, unit)` gives it. Homes: V07 §5.6 (3) (the village units), V01 §3.16
  (1) (the return), §10.2 (d)'s `neighbourhoods` (the base's statement). Every other text writes "the look's units
  (§10.2 (d))" or this gloss — never "V07's ends" alone, never "district" alone at the village rungs.
* **(b) A building a disaster look stands over** — a building of one of the look's units on which V06 §3.22 (3)'s
  `crisisLookYields` is not yet true (no Works other than a `decay` Works begun on it by the view's week, unless finished
  before the overlay's `sinceWeek`); every building of a preview's units (a preview never hands over). Home: V06 §3.22
  (3); §10.2 (f) the base's statement. Every reader of the look's damage, tone, lines and rows reads this predicate:
  §2.6 step 7, §8.2's `ruinTone` (a unit's tone stands while the look stands over any of its buildings), §8.6, V02
  §5.7, V03 §5.6 (4), V04 §5.6 (1), V09's plan panel and why card, V10 §3.9a.
* **(c) V09 reads the predicate, never a district list.** The plan panel's look lines read V03's `planDamage`
  (`PlanDamage.look` set, `PlanDamage.level`), which carries (b) (V03 §5.6 (4)). The why card's `facts` row
  `info.crisis.ruinedFor` on a building reads §11.2's `looks` reader asked with that building: the `looks` member gains
  `building?: Id`, and with it each `disaster` entry of `LooksAnswer.crises` carries `over?: boolean` — whether the look
  stands over that building at the view's week by (b), evaluated in the generation worker (END under rendering).
  VV910-r3-02's `yielded?: Id[]` is **not** written: a list of handed-over buildings can pass the answer's 64 KB and
  `limits.members` at the cap (a struck METROPOLIS rebuilding thousands), where a per-building answer cannot.
* **(d) Before V06's E2** (VPC-R3-02's text at §10.2 *Crisis looks*' lead): until M6-E the hand-over is read directly
  over the base's records, so §8.2's tone, the buildings' damage and V09's rows read one answer from the look's first
  milestone.

**Texts** (each its issue's, (a)–(c) governing): **model §2.6 step 7** (VM-R3T-07, which also closes VAL-R3-08's model
end): "A building of a district a disaster look ruins (item 122 (d))" → "A building a disaster look stands over (item
122 (d); §10.2 (d)'s `neighbourhoods` and (f): a building of one of its units — a district, at THORP, HAMLET and VILLAGE
a unit of V07 §5.6 (3) on the plots `villageUnitPlots` gives it — until V06 §3.22 (3)'s `crisisLookYields` turns true
on it, a preview never handing over)". **Pipeline §10.2 (d)'s `neighbourhoods`** (VV12-r3-05, VAL-R3-08's words): "at
THORP, HAMLET and VILLAGE V07 §5.6 (3)'s units (`villageDisasterUnits`: its ends, or an end-less thorp's toft groups).
Every building of a returned unit — a district's, or one on a returned unit's plots (`villageUnitPlots`) — draws item
123's damage … while the look stands over it ((f))", the rest as it stands. **Rendering** §8.2 (VV12-r3-02's texts, its
last sentence reading "a unit's `ruinTone` stands while the look stands over any of its buildings"), §8.6 (VAL-R3-06:
"A building a disaster look stands over (§10.2 (d)'s units; (f)'s hand-over)"), §11.2's `districts` comment
(VV12-r3-02's text; VAF-R3T-03 MERGED). **V02** (VV12-r3-01) with the sweep's J-V2.113 and l. 2455. **V03** (VV12-r3-04),
**V04** (VAL-R3-09), **V11** (VAF-R3T-02; VAH-r3-06 MERGED). **V09**: VV910-r3-02 amended by (c), VAH-r3-02 MERGED into it.

Grade: the class MAJOR (two outcomes for one case: a struck toft group of an end-less thorp ruined by V07, by no other
unit; a building under its rebuild drawn ruined by V09 and rebuilt by V02, V03 and V10). VM-R3T-07 raised.

### R4-05 The view-bound why

**Governs:** VAT-r3-02 (rendering); ends at V10, V09 and V07. R3-16 (e) stands: at THORP, HAMLET and VILLAGE a
`VillageField`'s and a `VillageEnd`'s crisis row is V07's provider's, shown once.

**Owner rule checked.** Item 122 (f): "The 'Why?' card and the clerk name the crisis and its weeks"; item 117/118's
season and festival as looks (V07's season and festival rows).

**Decision.** VAT-r3-02's text whole: §11.2's `why` member gains `view?: ViewHandle` (a view-bound why: a provider whose
rows state a view's look — V07 §4.5's crisis, season and festival rows — reads that view's §2.9 `week`, `yearWeek`,
`festival` and `crises` and its `looks` evaluation at the view's effective key; absent, no such row is given), and
*Knowledge* adds that a `why` with a `view` admits its view-bound rows as `looks` does. A provider that states no view's
look ignores `view`. A building's crisis row stays V09's, from R4-04 (c). Ends (END lines): V10 §2.13's
`WhyProvider.explain` opts gain `view?`, §3.9's query paragraph names it, the `why` tool passes `ClerkSession.view` where
present; V09 §2.7's `WhyCardModel` passes the card's view; V07 §4.5 and W74 cite `opts.view` for the three rows.

### R4-06 A barrier across a way: a barricade, a beast's stakes, a quarantine's cordon

**Governs:** VPC-R3-03 (pipeline), VAL-R3-07 (pipeline, MERGED), VCS-r3-08 and VV1112-r3-08 (scope); ends at rendering
§8.2 and T-ER-27 and at V12; V07 §5.6 (7) stands as written. **Amends** R3-14 (3)'s "on a way's carriageway only a
`barricade` across it".

**Owner rules checked.** Item 122 (b): **beast attack** — "torn palisade sections, watch-fires along the edge, stake
barricades"; **disease** — "inside, at the neighbourhood band, marked doors in the affected quarter and a cordon";
**raiders** — "barricaded roads"; **rebellion** — "street barricades"; (c): "never on water, a gate's passage or a
label's keep-out". The carriageway rule is a design default; it may not drop the owner's stakes and cordon where they
meet a way.

**Decision.** VPC-R3-03's texts: §10.2 (d) admits on a way's carriageway only a barrier across it — a `barricade`
((f)'s `raiders` barricaded roads and `rebellion` street barricades, §8.2's `blockade` barricade), `beast`'s `stakes`
where the edge crosses a way, and the quarantine's `cordon` where it crosses a way into its quarter — never a camp or
any other part; §10.2 (f)'s `quarantine` draws the cordon closing the `affectedQuarter` along its boundary on the
quarter's side of each bounding way's corridor and across each way that enters it. EP-27 (pipeline's own row) reads "a
carriageway holding only a barrier across it (§10.2 (d))". Ends: rendering §8.2's placement sentence and T-ER-27
(VPC-R3-03's texts, with a quarantine fixture whose quarter ways enter); scope's T122-6 reads "… and on a way's
carriageway only a barrier across it (§10.2 (d)) …" with "(§10.2's placement; `crisis.blocked` 0 and `crisis.share` 0)";
V12's five `crisis.blocked` statements (registry l. 1208, the planted-fault row l. 2338, §3.15.12 l. 2706, edge row 33
l. 2871, T-V12-54 l. 3159) read "a way's carriageway save a barrier across it (a `barricade`, a `beast`'s `stakes`, a
quarantine's `cordon`; §10.2 (d))", T-V12-54's passing cases adding the stakes and the cordon.

### R4-07 The present at creation bounds what the hint carries; a calamity at the present week

**Governs:** VAT3-r3-02 (model), VM-R3T-02 and VPC-R3-05 (model, MERGED), VAH-r3-04 and VAT3-r3-05 (V08, one MERGED),
VAT3-r3-10 (V06); ends at V08 §3.15 (2) and T-V8-51. **Amends** R3-18's reach (R3-18 stands: two values, one name each).

**Owner rules checked.** Item 125 (b): the week is "the dossier's own latest stamped tick (its conditions'
`triggeredAt`, its calamities' and history's ticks)"; item 113: history shapes the map at generation. A calamity whose
tick set the present is the dossier's own latest stamped fact; a map made right after a disaster is a common request.
Dropping it — R3-18 left "before the creation week" in the hint, which on a history-first document now means before the
replay's start — loses DR36's losses and DR37's events silently.

**Decision.** One bound for everything the creation carries — **up to and including the present at creation**: (a) §2.7
`HistoryHint.ageYears`: "the settlement's age at the present at creation (§4.11 *The clock* (1)) — never advanced by
§4.11's clock"; `HistoryHint.calamities`: "`calamityHistory` up to and including the present at creation (§4.11 *The
clock* (1)) — every calamity the creation carries (DR36's losses; DR37's events)". (b) V08 §3.15 (2)'s `calamities`
bullet the same (END under V08). (c) V06 §3.20.2 places an event or a calamity at the present (0 years ago) in the last
replay epoch, at `W_p`, with its §3.21 row and T-V6-71's fixture (VAT3-r3-10's texts); T-V8-51 adds a dossier whose
latest stamped tick is a calamity's, that calamity in the hint and in the last replay epoch (END under V08). (d) V08's
three present-week sites — W64, the present-week field row and §3.16 (4) — name it "the present at creation (§4.11 *The
clock* (1))" (VAH-r3-04; VAT3-r3-05 MERGED). Sweep: every other "creation week" of the set (§4.11 l. 8237, 8330–8334,
8664, 8738, l. 5241, J-A67.47; V06 l. 410, 956, 2336, 2370, 3266, 3421, 3689; V10 l. 1700) already means the `generate`
event's week; V06's "the plan's creation week" (l. 2027, 2037) is a `MutationPlan`'s, qualified, no clash. No further END.

### R4-08 A calamity carried late rides the absorb's first epoch

**Governs:** VAT3-r3-01 (pipeline); VPC-R3-01 (scope, its fixture); ends at V08 §3.6 (3) and its degenerate-input row.
**Amends** R3-17 (the trigger "at the week of each newly carried calamity no other epoch falls on").

**Owner rules checked.** Item 122 (a): what a crisis leaves "reaches the map only by the existing path (the calamity and
the population change into the next epoch, V06's hazard phase …)"; item 125 (b): never refuses, never stalls, reported.

**Decision.** VAT3-r3-01's text at §4.11 *The clock* (4): a newly carried calamity dated at or before the last epoch's
week folds no epoch at its own week; it rides the first epoch the absorb folds (with none, the port folds one at the
absorb's week for it), its `EpochInputs.events` entry at that epoch's first week (the last epoch's week + 1), its own tick
kept in its receipt, so its hazard strikes and its deaths reach the burial need; with the absorb's week itself before the
last epoch's (V08 §3.6's degenerate row) it folds no epoch and its dated changes apply finished, noted. Ends: V08 §3.6
(3)'s calamity clause and its edge row cite it, the row naming the case among its degenerate inputs (END under V08);
§13.2's T76-1 cadence clause (VPC-R3-01's text) adds "a calamity carried one year late, riding the absorb's first epoch,
its event at that epoch's first week".

### R4-09 Raised ways and later work: generation places the supports last; a standing raised way is held

**Governs (the raised-way crossing family, three rounds running):** VEW-r3-01 (pipeline, BLOCKER), VM-R3T-04, VKr3-01,
VM-R3T-08, VPC-R3-06 (pipeline); VEW-r3-02, VEW-r3-03, VEW-r3-04, VEW-r3-05, VM-R3T-06, VAL-R3-02, VKr3-04 (model);
VM-R3T-05, VCS-r3-06 (scope); VDC3-05, VDC3-07, VM-R3T-09 (determinism); VAL-R3-03 (V04); VM-R3T-03 (V06); VDC3-06 (V09);
ends at pipeline, determinism, scope, V01, V05, V06, V09 and V11. **Supersedes** R3-25 (c) and support step (6) as round
3 wrote it (re-running (1)–(5) on a standing raised way for any later trace, with S5a's walk, V06's wait and a hand bend
as its give-way rungs). R3-25 (a), (b), (d) stand.

**Why one rule.** Each round's step (6) re-sited a standing raised way's piers for whatever was laid later, and each
re-siting opened the next edges: a later way through a pier (VEW-r3-01), obstacles S7 lays after the step ran
(VEW-r3-02), ramps and feet under a trace (VEW-r3-03), a station's support that is the wall (VEW-r3-04), a locked raised
way (VM-R3T-06), arch vaults over moved piers (VAL-R3-03), S5a's walk with no last rung (VM-R3T-04), a village palisade
(VAL-R3-02), and the bars, bends and locality rows that follow. Principle (9) under J122: one rule — supports are placed
once, last, at generation; afterwards the raised way is held and everything laid later gives way to it.

**Owner rules checked.** Item 110 (b): a raised way "crosses the ways beneath without a junction"; the aqueduct
"crossing the wall through an arch" — so a trace crossing an aqueduct does so at an arch the wall carries (the crossing
station of (3), kept in both parts below); "a removal is an edit that holds through regeneration". Item 101 R2 (a
declaration bent to the nearest lawful one) and R13 (a declared or pinned thing is held). Item 114 (walls decay into gaps;
the band under a crossing station held while its deck stands, R3-25 (d), kept).

**Decision (J122, vetoable). §2.7's support step (6), binding text (model)** — replacing from "(6) a trace or moat laid
across a standing raised way" to "never dropped for a wall (T110-2)." with:

"(6) **Later work across a raised way.** (a) *At generation.* A stage's S5a trace and outer moat across an earlier
raised way — S4's, or an S5b viaduct, the stage's own included — re-run (1)–(5), and then the span rule, on it in the same
commit: the crossing station on the trace (the nearest interior station on the deck at its level, never on a ramp or a
stair, within p ÷ 2 moved there, keeping its key, else one added), the stations in the new strips' setbacks, glacis,
berm or channel slid or omitted by (3). Where a clear span on either side of that station would then pass
`maxClearSpanM`, or a pier `maxPierM`, or the berm or channel would meet a ramp, a stair or a foot, the stage's berm and
channel — and S7's setback and glacis after them — are not laid under the deck: they stop at the edges of the
under-deck strip and of the ramp or stair, the channel ending against the ground as against a berm (§4.2 S3 (10)) and
the strip lines closed along it, reported (`W_RAISED_CROSSING`), so the spans either side clear only the band's half.
After S7's batches and before S7b the support step runs once more on every raised way, its keys kept by (5), with every
obstacle then standing (S5b's and S5c's ways; S7's strips, gate plazas, castle paths, quays, piers and moles); a station
this run can neither slide nor omit within `maxClearSpanM` and `maxPierM` keeps the place the earlier run gave it, and
the S7 part it meets gives way in that batch — a strip, plaza or square cut round its ring, a quay, pier, mole or castle
path ending at the ring and resuming beyond it — reported. No generated course is dropped for a later stage. (b) *A
standing raised way is held.* After generation nothing laid later re-runs this step on a raised way, moves, adds or
omits a station, mints a key or re-rules a span; only an op that names the raised way changes it (its edits, V06
§3.19's ops, a landfall, a frame growth's extension of its deck, §3.2 (9)), and none drops it. Its supports, its ramps,
stairs and feet (`RaisedWayRecord.feet`) and the under-deck strip of each `vault` span are a reservation on ground part
0 for every later way, trace, strip, berm, channel, plot, square and reservation; the rest of its under-deck strip is
crossed only so: (i) a part-0 way under an `open` span, by §4.3's rule; (ii) a moat's or a carve's channel under an
`open` span, never through a support; (iii) an enceinte's trace through one station on the deck at its level — the one
nearest where the trace would cross, the trace bent along the deck to pass through it, the station never moved — which
becomes its crossing station by (3), its key kept and its support the band's stretch under the deck together with the
pier's former ring (the pier built into the wall, so no clear span grows); the trace's setback, glacis, berm and channel
pass under the deck between that station and each neighbour only where that span is `open` and no other support, ramp,
stair or foot stands in them, and otherwise stop as in (a), reported (V06's wall report at an epoch; the dry run's line
for a hand edit); (iv) a village palisade (`VillagePlan.palisade`) abuts each support standing in its band and passes
beneath every span, with no crossing station and no gate (V07 §3.5a (4)). The later work gives way, never the raised
way: S5c's proposal is deflected along the strip or ends there as at a reservation (§4.4); a route re-solve takes
another course by F-ROUTE's ladder (§4.3); a circuit, contraction or re-anchored stretch takes (iii) (V06 §3.7.6 (5)); S8
holes its plots round the reservation (§4.6); a square or reservation is cut round it; a hand `drawWay`, a moved way, a
carve or a `drawWall` is bent at its dry run (§7.1's outcome table). A lock or pin on the raised way holds what (b)
holds; a crossing station's support taking the band's stretch is the wall's arch (item 110 (b)), so a locked or pinned
raised way is crossed by the same rule (§7.4's lock column)."

**And in (3)** (VAL-R3-02, model): after "— on a gate's line or as an aqueduct's wall arch, the only crossings §4.3
allows —" add "(a village map's palisade, `VillagePlan.palisade`, is no crossing: its trace abuts each support standing
in its band and passes beneath every span, with no crossing station and no gate; V07 §3.5a (4))"; (3)'s crossing-station
sentence takes VEW-r3-04's text (the station's `supports` entry reads its stretch's `condition`; V06's salvage and topple
pass over it; a landfall's breach ruins the spans beside it; a `repairRaised` beside a fallen stretch repairs the stretch
first by `repairWall` in the same batch), which serves both parts of (6). The `RaisedFoot` comment is VKr3-04's text.

**Ends** — each an issue's own FIX or an END line in Part H:
* **pipeline:** §4.3 *Lattice and costs* and §4.4 S5c's legality — VEW-r3-01's texts (its §4.3 sentence opening "A
  standing raised way's support rings, ramps, stairs and feet and the under-deck strips of its `vault` spans are
  impassable …", the crossing rule under an `open` span, `clearWidthM` and `squareDeg` from V11 §3.24.2); §4.4 S5a *Outer
  moats* (VM-R3T-04, amended): its sentence "The carve clears no raised-way support: §2.7's support step (6) re-sites one
  first in the same commit" reads "The carve clears no raised-way support: §2.7's support step (6) (a) re-sites one first
  in the same commit, and where a crossing's spans or piers cannot keep their bounds, or the berm or channel would meet a
  ramp, a stair or a foot, the berm and channel stop at the under-deck strip's edges, reported (`W_RAISED_CROSSING`)" —
  no walk of boundary nodes; §4.3 *The slot* and §4.8's lead (END of VEW-r3-02): "after S7's batches and before S7b,
  §2.7's support step runs once more on every raised way, its keys kept (§2.7 (5); (6) (a))"; §4.8 *Gates* (END of
  VEW-r3-05): "(at generation a stage's trace across an S4 or S5b viaduct, the stage's own included, its crossing station
  put on the trace by §2.7's support step (6) (a); after generation any trace across a standing raised way, through one of
  its stations by (6) (b))"; §4.11's carve (END): "a support the channel meets is re-sited by §2.7's support step (item
  244)" → "a support the channel meets is re-sited at generation by §2.7's support step (6) (a); after generation the
  channel passes under an `open` span, its course bent at the dry run (§2.7's support step (6) (b))"; §4's edge row
  `wall` (END of VAL-R3-02); §4.11 *The rung at an epoch* and J-A81.41 (VKr3-01); §4.8 *Condition at generation*
  (VM-R3T-08); §4.8 *Gates*' gate law (VPC-R3-06).
* **determinism:** §7.1's outcome table (VDC3-05, amended): `bend.wall.held` as VDC3-05 words it; the second row reads
  "| a hand `drawWall`, a moved trace vertex or a re-anchored stretch across a standing raised way (§2.7's support step
  (6) (b)) | bent | the trace through the raised way's station on the deck at its level nearest where it would cross; its
  setback, glacis, berm and channel stopped at the under-deck strip's edges where a support, ramp, stair or foot stands
  in them or the span is `vault`; the raised way unchanged but that station's support; named in one line |
  `bend.wall.raisedCrossing` |"; and (END of VEW-r3-01) "| a ground `drawWay`, a moved way or a carve meeting a standing
  raised way's supports, ramps, stairs, feet or a `vault` span's strip, or crossing its under-deck strip elsewhere than
  under an `open` span (§4.3; §2.7's support step (6) (b)) | bent | the way or channel moved to cross under the nearest
  `open` span that holds it, named in one line | `bend.raised.underSpan` |". §7.3's S7 row (VDC3-07, amended; VM-R3T-09
  MERGED): "; on each standing raised way the new run crosses, the run bent through its nearest station on the deck at
  its level and its strips stopped under the deck where they cannot pass (§2.7's support step (6) (b)) — that raised
  way's crossing station in the effective scope and the fate sheet, nothing else of it re-derived". §7.4's lock column
  for a raised way (END): "its deck and piers held" adds "(a later trace's crossing station taking the band's stretch,
  §2.7's support step (6) (b))".
* **scope:** T110-2 (VM-R3T-05, amended) adds: (1) a CITY c15 town with `moat: 'all'` whose S4 timber viaduct is crossed
  by stage 2's ring at the widest moat row — the berm and channel stopped at the under-deck strip, every clear span within
  20 m, no support in water, the viaduct kept, `W_RAISED_CROSSING` reported; (2) a stage-2 S5b viaduct crossed by stage
  2's own moated ring, and a stage-2 ring whose lattice boundary falls on an S4 viaduct's ramp at a valley rim — the
  crossing station on the deck at its level, no ramp, stair or foot in a strip or the channel; (3) after generation's last
  support run, 0 piers in a setback, glacis, berm, moat, gate plaza, quay, pier or mole on the CITY and METROPOLIS
  fixtures; (4) an epoch circuit across a standing timber elevated road and a hand `drawWall` across a standing aqueduct,
  each run again with the raised way locked — the trace through one station on the deck at its level, its strips stopped
  where a support stands in them, every station, key, span and state of the raised way unchanged but the crossing
  station's support, the hand case naming `bend.wall.raisedCrossing`; (5) an H-AQUA epoch growing a stage over a standing
  aqueduct's land, an epoch route re-solved under a viaduct and a hand road drawn across one — 0 way corridors over a
  support ring, ramp, stair, foot or `vault` span, every crossing under an `open` span (`bend.raised.underSpan` for the
  hand road). The take-over table's evolution row (VCS-r3-06, amended) gives "T110-2's epoch clauses (4) and (5)
  (T-V6-47)". The item-114 group (END of VEW-r3-04) adds its landfall-over-a-raised-gate fixture.
* **V01:** §3.17.3 (3) cites §4.3 for the crossing rule, its two cells now V11's (END of VEW-r3-01; equivalence: V01's
  rule, ladder and values unchanged).
* **V04:** VAL-R3-03, **amended** to one trigger: `ArchVaults.reconcile` and the `foundationObstacles` re-read run in the
  commit of every change to a raised way's `feet`, `supports` or `spans`, whoever makes it (its edits, an epoch's
  raised-way op, a landfall, a trace's crossing station, a frame growth's deck extension) — §1b's row, the lifecycle row
  and §3.10's edit row read so; T-V4-63 adds VAL-R3-03's fixture (an epoch circuit and a hand `drawWall` across a viaduct
  with a `vault` span, and a frame growth extending a deck: every arch vault's key a standing `vault` span's, its footprint
  between that span's supports' inner faces, no chamber under an `open` span).
* **V05:** §3.16's raised-way pier row (END of VEW-r3-04).
* **V06** (END lines): §3.7.1's widening, "the supports of a raised way the trace crosses excepted within one strip width
  of the crossing (§2.7's support step (6) re-sites them, V06 §3.7.6 (5))" → "a standing raised way's under-deck strip,
  supports, ramps, stairs and feet excepted where the trace crosses it (its strips stop there, §2.7's support step (6)
  (b))"; §3.7.6 (5)'s second bullet → "a trace crosses a raised way through one of its stations on the deck at its level,
  the trace bent to it (§2.7's support step (6) (b)); never along its under-deck strip", and its continuity bullet → "a
  trace never waits for a raised way: what cannot pass under its deck stops at the under-deck strip's edges, reported
  (§2.7's support step (6) (b))", `walls.waited` kept for the other continuity rules; §3.19.2 (3)–(5) cite VEW-r3-04's
  text; `EpochScope.raised` and W64 (END of VAL-R3-03): "every raised way whose `feet`, `supports` or `spans` an epoch op,
  a landfall, a trace's crossing station or the frame growth changed"; §3.6 and §3.19 cite §4.3 for the growth and route
  re-solves (END of VEW-r3-01); T-V6-47 takes T110-2's epoch clauses (4) and (5) and reads "(takes T110-2's epoch
  clauses)". VM-R3T-03 (the release on both spans fallen) is V06's FIX.
* **V09:** §4.9's `bend.wall.held` and `bend.wall.raisedCrossing` (VDC3-06) and `bend.raised.underSpan` (END of
  VEW-r3-01), each in V09's words ending with `button.showWhy`.
* **V11:** §3.24.2's `raisedWays.structure` gains `clearWidthM` and `squareDeg` at V01's values (END of VEW-r3-01).

Grades: VEW-r3-01 BLOCKER kept (a street through a masonry pier on an epoch's common path: an impossible result); the
rest as reported.

### R4-10 Auto applies a change while the view is settled

**Governs:** VRC2T-08 (rendering §12.5), VRC3T-03 (scope T121-2), VRC3T-04 (V09 T-V9-84); the sweep's end at V09
§4.21.11 (2).

**Owner rule checked.** Item 121: Auto the default, a manual level beside it; no owner word on timing. §8.8 (J-A121.07)
is the home: an idle view is settled.

**Decision.** One phrase wherever Auto's or a device-pixel-ratio change's timing is stated: "applied while the view is
settled — at once when no gesture runs, at the gesture's settle otherwise — and at most once in 10 s (§8.8)". §12.5
(VRC2T-08's text), T121-2 (VRC3T-03's text), T-V9-84 (VRC3T-04's text), and V09 §4.21.11 (2) (END): "A change takes effect
at the view's next settle, never during a pan, zoom or drag (§8.8's settle rule)" → "A change takes effect while the view
is settled — at once when no gesture runs, at the gesture's settle otherwise — never during a pan, zoom or drag (§8.8)".
V12's edge row 32 and `resolution.changes` speak of changes during a gesture and agree; no END.

### R4-11 A look-bearing condition is public: what the tests stage

**Governs:** VAP-r3-03 (V02), VAP-r3-04 (V03), VAP-r3-05 (V04); the sweep's ends at V12 and scope's T122-2. R3-13 stands;
this ruling writes what its round-3 texts left behind.

**Owner rule checked.** Item 122 (e): "a condition the viewer's key withholds is not drawn (View as, §11.2's admission)"
— kept: DR44 withholds a `none`-row condition (`secret`) from every key below `secret` that does not list it; a
look-bearing condition is `public` (a camp, a quarantine, smoke and ruins are sights), so no key withholds it.

**Decision.** No test or statistic stages a key that withholds a look-bearing condition. Where one names knowledge for a
look, it reads: "under View as at `public`, `local` and `secret` the same drawing, the condition `public` (§7.7's DR44);
a `none`-row condition carried beside it draws, lists and counts nothing at any key". Texts: VAP-r3-03 (T-V2-60 (e),
(g)), VAP-r3-04 (T-V3-40 (b)), VAP-r3-05 (T-V4-82 (i)). Sweep ends: **V12** — `crisis.weeks`' knowledge clause in the
registry row (l. 1208) and §3.15.12's T122-2 bullet (l. 2694), "under a player view whose key withholds a condition,
every look of it drawn counted as a mismatched week (DR44's admission)" → "under a player view, any look drawn for a
`none`-row condition carried beside the looks counted as a mismatched week, and each look-bearing condition's look
drawn in its weeks at every key (`public`, DR44)"; the planted-fault row (l. 2338) "for a condition the viewer's key
withholds" → "for a `none`-row condition"; edge row 33 (l. 2871) "a withheld condition" → "a `none`-row condition beside
the looks (drawn at no key) and a look-bearing one (drawn at every key)". **Scope** — T122-2's "and never for a condition
the viewer's key withholds (DR44's admission)" → "at every key for a look-bearing condition (`public`, DR44) and for no
`none`-row one". V02 §3.18's withheld-condition row and V03 §5.6 (4)–(5)'s general sentences stand (they hold for a
`none`-row condition); V09's T-V9-85 and V10's T-V10-52 already read so.

### R4-12 Find at a drawn week reads the frame

**Governs:** VRC3T-01 (rendering), VV12-r3-03 (V01), VAL-R3-05 (V04); ends at V05 and V09. **Amends** R3-24's "restricted
to the entities that frame holds".

**Owner rules checked.** Item 120 (f): "Every commit, regenerate, undo, advance of time and season change re-evaluates the
chips at once — a new smithy glows as it appears, a closed one goes dark"; (k): "each chip's matches equal the gazetteer
query's rows at the key". At a scrubbed week a building that held a smithy then and a bakery now must glow under
"Smithy", which the head's index restricted to the frame's entities cannot give.

**Decision.** §11.2 *At a drawn week* is VRC3T-01's text: the frame's listing — the head index's matches less those whose
entity, or whose matching use, the frame does not hold open at that week, plus the frame's own uses and entities of the
chip's classes or target that the head lacks or holds otherwise (V06 §3.15.2's frame) — a building matched by its use at
that week, never its head use. Every Find reader at a drawn week reads that listing over the model the view draws: §8.2's
`live.find` (VRC3T-01's citation); V01's `gapUnits(chip, key, week?)` and §5.4 (6)'s Show frame (VV12-r3-03); V04's
`underFindPlaces` over the frame (VAL-R3-05); V05 §5.6 (2)–(5) for the islands (END); V09 §4.21.10 (7), (8) and (10)
(END lines); V10's `read_map find`, which already passes the week.

### R4-13 The disaster's unit count

**Governs:** VV1112-r3-02 (pipeline), VV1112-r3-01 (V12). **Amends** R3-14 (4).

**Owner rule checked.** Item 122 (b): "the share by severity … the calamity's `targets` win where the dossier names the
place hit".

**Decision.** §10.2 (c) keeps round(s × n) clamped to [1, n] as every place's count; the `neighbourhoods` place then draws
at least every matched target (max(k, |`matched`|)) and, by fire, stops where its order ends, the shortfall reported
(V01 §3.16 (5), the home) — VV1112-r3-02's text; V12's `crisis.scale` second count reads it (VV1112-r3-01's text).

### R4-14 The roofless case named at §6.3

**Governs:** VDC3-02 (determinism), VAH-r3-03 (V09), VV910-r3-08 (V09, MERGED). R3-05 stands (home §2.6 step 7); it routed
no text to §6.3, whose "exactly while" then contradicted it.

**Decision.** §6.3 *Plan damage* names §2.6 step 7's one case (VDC3-02's text); V09 §4.21.13 (1) adds it (VAH-r3-03's
text). Sweep: V10 §3.9a, V03 §5.6 (2) (c), §8.6, V02 §5.7 (2) and X34 already state it; no further END.

### R4-15 Item 125 at an absorb, at the cap, and for the key

**Governs:** VEL3-r3-02, VV78-r3-02, VV78-r3-01 (V08), VDC3-03 (determinism), VV78-r3-05 (scope); the end at §14's
`E_OTHER_SETTLEMENT`. **Amends** R3-20 (2)'s reach.

**Owner rule checked.** Item 125 (b): "Every dossier field the map uses has a stated standalone fallback — the generator's
own choice, exactly as on a map made without a dossier — so a missing or empty field never refuses, never stalls, and is
reported"; (e): "A dossier with only SettlementForge's required keys generates a full map".

**Decision.** (a) A field's fallback **value** serves a creation. At an absorb a field that takes its fallback changes
nothing: the carried fact stands, noted `field_fallback` (VEL3-r3-02's texts) — on a map made without a dossier nothing
moves the population, the name, the tier or the institutions, so "exactly as on a map made without a dossier" is the
carried value; the next readable dossier absorbs as usual. (b) A readable whole number above the population cap is
neither missing nor empty: §1.1's and B7's refusal (`E_RUNG_UNAVAILABLE` naming the cap) holds at creation and at every
absorb; a negative, fractional or non-numeric population takes the fallback (VV78-r3-02's texts). (c) The settlement key
falls back as V08 §2.4 states — at a creation the minted `settlement:map:<mapId>`, kept for the document's life; at an
absorb the bound key — and §7.7 item 12 states it (VDC3-03's text); §14's `E_OTHER_SETTLEMENT` comment adds "never for an
offer whose `id` fell back (V08 §2.4)" (END under scope) and §14's port types carry the note kind and comments
(VV78-r3-05). (d) A dossier lacking a `requiredKeys` key of every registered adapter is no dossier of any registered line
(item 125 (e)'s "only SettlementForge's required keys" is its floor): `select` refuses it `E_UNKNOWN_SHAPE` (B3); a
dossier holding every required key of one line whose readable stamp no adapter serves is `E_LINE_UNSUPPORTED` (B5)
(VV78-r3-01's texts) — R3-20's "B3 keeps only what is no dossier at all" read so.

### R4-16 V08's own change for a catch-up whose events pass its budget

**Governs:** VV56-r2-04 (V08; open since round 2), with VV56-r3-01 (V06) and VV56-r3-02 (V09); ends at V06 §6.8 (6) and
T-V6-24.

**Owner rule checked.** Item 119: "as fast as possible; ten seconds of total time is the comfort level; slower only for a
measured gain". §12.10's R12-31: a wait past ten seconds takes the owning path's own change first, else fails the
release until its path is changed — never a declared miss.

**Decision (J122, vetoable).** The change is the port's, and V08 §6's absorb-with-epochs row states it at build depth:
**during a catch-up the dossier events one epoch's span holds are absorbed as one batch** — one digest diff and one fold
per epoch over all its events in their weeks' order, each event's facts still entering that epoch's `EpochInputs.events`
at its own week, never one diff and fold per event — so the events' absorb term grows with the epochs folded, not with
the events. The row states the batch's measured cost per epoch and per event at CITY and at the METROPOLIS cap, its
target (T-V6-24's catch-up fixtures — 200 and 1 000 events, and the 20-event fixture — each within the catch-up's budget
at both rungs), and its bar (a T-V8 property: on those fixtures the model and every model digest are identical to the
per-event absorb's). Where the batch still passes the budget on a fixture, the release fails under R12-31 until the
path is changed again — never a declared miss. V06 §6.8 (6)'s and T-V6-24's over-budget clauses cite the row (END under
V06); V08 §3.6 (3)'s "one epoch over the span always fitting" reads VV56-r2-04's text. VV56-r3-01's and VV56-r3-02's
wordings stand.

## Part H — per-unit dispositions (all 145 issues)

### scope (base §0–§1, §13–§17, the index, INDEX.md)

Rulings: R4-01, R4-06, R4-08, R4-09, R4-10, R4-11, R4-15.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r3-09 | minor | minor | MATRIX-GAP | FIX | V12's end (§3.15.12's head) is an END line under V12 |
| VAT3-r3-03 | major | major | DISAGREE | FIX | V12's sibling is VAT3-r3-04 |
| VDC3-10 | minor | minor | CONFLICT | FIX | one wording with §6.1 (VDC3-09: the `light` mode among the inputs) |
| VKr3-03 | major | major | EDGE-UNTESTED | FIX | one fix with VKr3-02 (kernel) |
| VM-R3T-05 | major | major | EDGE-UNTESTED | FIX per R4-09, amended | T110-2 gains R4-09's fixtures (1)–(5) in place of the waiting and span-bending clauses its required change names (no crossing of a standing raised way waits or bends any more); they also carry VEW-r3-01's, VEW-r3-03's, VEW-r3-05's and VM-R3T-06's fixtures; V06's T-V6-47 takes the epoch clauses (END under V06) |
| VPC-R3-01 | major | major | EDGE-UNTESTED | FIX per R4-08 | its cadence clause with R4-08's late-calamity fixture added |
| VRC3T-03 | major | major | CONFLICT | FIX per R4-10 |  |
| VCS-r3-01 | minor | minor | COHESION | FIX | V12's heads are VCS-r3-02 |
| VCS-r3-06 | minor | minor | WIRING | FIX per R4-09, amended | the evolution row reads "T110-2's epoch clauses (4) and (5) (T-V6-47)," and the T110 group's runs sentence the same; V06's end is an END line under V06 |
| VCS-r3-08 | minor | minor | CONFLICT | FIX per R4-06 | T122-6 reads "… and on a way's carriageway only a barrier across it (§10.2 (d)) …"; one fix with VV1112-r3-08 |
| VV34-r3-04 | minor | minor | COHESION | FIX |  |
| VV78-r3-05 | minor | minor | CONFLICT | FIX per R4-15 | one fix with VDC3-03 (determinism) |
| VV1112-r3-08 | minor | minor | WIRING | FIX | one fix with VCS-r3-08: "(§10.2's placement; `crisis.blocked` 0 and `crisis.share` 0)" |

**END lines under this heading** (other units' fixes this seat writes):

* END of VDC3-03 (determinism): §14's `E_OTHER_SETTLEMENT` comment adds "never for an offer whose `id` fell back (V08 §2.4)". *(R4-15 (c))*
* END of VEW-r3-04 (model): §13.2's item-114 group adds "a landfall over a raised gate, then the deck's repair: the stretch repaired with the deck, never a deck on a breached run; a crossing station whose spans have both fallen keeps its stretch as a wall run, never dismantled as a support". *(R4-09)*
* END of VAP-r3-06 (V06): §13.8's T114-1 – T114-5 row reads "the milestone tier over H-100's epochs and H-AQUA's for T114-3's crossing clause".
* END of R4-11 (adjudicator's sweep): T122-2's "and never for a condition the viewer's key withholds (DR44's admission)" reads "at every key for a look-bearing condition (`public`, DR44) and for no `none`-row one". *(R4-11)*

### model (base §2)

Rulings: R4-01, R4-02, R4-03, R4-04, R4-07, R4-09.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAL-R3-02 | major | major | DISAGREE | FIX per R4-09 | (3)'s palisade clause and (6) (b) (iv) as R4-09 writes them; the edge row `wall` is an END line under pipeline |
| VAT3-r3-02 | major | major | EDGE-UNDEFINED | FIX per R4-07 | §2.7's `ageYears` and `calamities` as R4-07 (a) words them (VM-R3T-02's and VPC-R3-05's sites with them); V08's ends are END lines under V08 |
| VAT3-r3-08 | minor | minor | DISAGREE | FIX |  |
| VEW-r3-02 | major | major | EDGE-UNDEFINED | FIX per R4-09 | R4-09's (6) (a) is its text; its pipeline end (§4.3 *The slot*, §4.8's lead) is an END line under pipeline |
| VEW-r3-03 | major | major | EDGE-UNDEFINED | FIX per R4-09 | R4-09's (6) (a)–(b) carry it (a crossing station on the deck at its level; strips and channel stop at a ramp, stair or foot); its V06 end is R4-09's V06 END; its fixture is (2) of VM-R3T-05's |
| VEW-r3-04 | major | major | CONFLICT | FIX | its text in (3), serving both parts of (6); its V06, V05 and scope ends are END lines there |
| VEW-r3-05 | minor | minor | EDGE-UNDEFINED | FIX per R4-09 | (6) (a)'s "S4's, or an S5b viaduct, the stage's own included"; §4.8's end is an END line under pipeline; its fixture is (2) of VM-R3T-05's |
| VKr3-04 | minor | minor | WIRING | FIX |  |
| VM-R3T-01 | minor | minor | TERM | FIX |  |
| VM-R3T-02 | major | major | CONFLICT | MERGED into VAT3-r3-02 | its `ageYears` site and V08 end are inside VAT3-r3-02's fix; its "before the present at creation" reads "up to and including" (R4-07) |
| VM-R3T-06 | major | major | EDGE-UNDEFINED | FIX per R4-09, amended | (6) (b)'s lock clause: a locked or pinned raised way is crossed by the same rule, nothing it holds changing — no wait, no refusal; §7.4's lock column is an END line under determinism; its fixture is (4) of VM-R3T-05's |
| VM-R3T-07 | minor | **major** — two units state two outcomes for one case (every building of the district against the per-building hand-over), R3-03 (b) | CONFLICT | FIX per R4-04 | R4-04's §2.6 step 7 text, which also closes VAL-R3-08's model end |
| VPC-R3-05 | minor | minor | TERM | MERGED into VAT3-r3-02 | its "up to" reads "up to and including" (R4-07) |
| VRC3T-02 | major | major | CONFLICT | FIX per R4-02 | R4-02's §2.9 sentence (the working layer drawn whatever its visibility) |

**END lines under this heading** (other units' fixes this seat writes):

* END of VV56-r2-06 (V06): §2.6 step 7's "an element that entered the plan after its damage left never drawn repaired (V06 §3.23 (3))" reads "an element that entered the plan after its damage left, or that a restoring event's re-cut minted, never drawn damaged by that restoration nor repaired (V06 §3.23 (3))". *(R4-03)*

### kernel (base §3)

Rulings: R4-01, R4-09.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VKr3-02 | major | major | EDGE-UNDEFINED | FIX | its fixture is scope's VKr3-03 |

**END lines under this heading:** none.

### pipeline (base §4, §10, PART II, PART III)

Rulings: R4-01, R4-04, R4-06, R4-08, R4-09, R4-13.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAL-R3-07 | major | major | DISAGREE | MERGED into VPC-R3-03 |  |
| VAL-R3-08 | minor | minor | DISAGREE | MERGED into VV12-r3-05 | its words for the `neighbourhoods` bullet are VV12-r3-05's text under R4-04; its model end is closed by VM-R3T-07 |
| VAT3-r3-01 | major | major | EDGE-UNDEFINED | FIX per R4-08 | V08's end and T76-1's fixture are an END line under V08 and VPC-R3-01's text |
| VEW-r3-01 | blocker | blocker | EDGE-UNDEFINED | FIX per R4-09 | BLOCKER kept (a street through a masonry pier on an epoch's common path: an impossible result); its §4.3 and S5c texts, the reservation adding ramps, stairs and feet; its ends at V01, V06, V09, V11, determinism and scope are END lines or VM-R3T-05's fixture (5) |
| VKr3-01 | major | major | WIRING | FIX |  |
| VM-R3T-04 | major | major | EDGE-UNDEFINED | FIX per R4-09, amended | §4.4 S5a *Outer moats* states (6) (a)'s stop rung in R4-09's words — no walk of boundary nodes; its fixture is (1) of VM-R3T-05's |
| VM-R3T-08 | minor | minor | WIRING | FIX |  |
| VM-R3T-10 | minor | minor | NEW-PROBLEM | FIX |  |
| VPC-R3-02 | major | major | WIRING | FIX per R4-04 (d) |  |
| VPC-R3-03 | major | major | EDGE-UNDEFINED | FIX per R4-06 | with EP-27's cell "a carriageway holding only a barrier across it (§10.2 (d))"; §8.2's and T-ER-27's ends are END lines under rendering |
| VPC-R3-06 | minor | minor | BROKEN-REFERENCE | FIX |  |
| VPC-R3-07 | minor | minor | BROKEN-REFERENCE | MERGED into VV12-r3-05 |  |
| VV12-r3-05 | minor | minor | BROKEN-REFERENCE | FIX per R4-04 | its `approachRoads` reference as written; its `neighbourhoods` bullet as R4-04 words it |
| VV56-r3-03 | major | major | EDGE-UNDEFINED | FIX |  |
| VV1112-r3-02 | major | major | CONFLICT | FIX per R4-13 |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VEL3-r3-01 (V06): §4.11's delta-demand parenthesis (l. 7880) reads "the suffix of the sequential roster between the old and the new population, §10.2 — prefix-stable, read over the households the town holds where a fall held one (V06 §3.5.1 (1)) — so no survivor's use is withdrawn by arithmetic".
* END of VAL-R3-02 (model): §4's raised-way edge row `wall` (l. 8886) reads "crosses a town enceinte only on a gate's line or as the aqueduct's arch; no support in a wall strip but the crossing's station on the band (§2.7's support step (3), (6)); a village palisade abuts its supports, the deck passing over with no gate (V07 §3.5a (4))". *(R4-09)*
* END of VEW-r3-02 (model): §4.3 *The slot* and §4.8's lead state "after S7's batches and before S7b, §2.7's support step runs once more on every raised way, its keys kept (§2.7's support step (5), (6) (a))". *(R4-09)*
* END of VEW-r3-05 (model): §4.8 *Gates*' parenthesis (l. 7562–7563) reads "(at generation a stage's trace across an S4 or S5b viaduct, the stage's own included, its crossing station put on the trace by §2.7's support step (6) (a); after generation any trace across a standing raised way, through one of its stations by (6) (b))". *(R4-09)*
* END of R4-09 (adjudicator's sweep): §4.11's carve (l. 8128), "a support the channel meets is re-sited by §2.7's support step (item 244)" reads "a support the channel meets is re-sited at generation by §2.7's support step (6) (a); after generation the channel passes under an `open` span, its course bent at the dry run (§2.7's support step (6) (b))". *(R4-09)*

### determinism (base §5–§7)

Rulings: R4-01, R4-09, R4-14, R4-15.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAH-r3-07 | minor | minor | DISAGREE | FIX |  |
| VDC3-01 | major | major | EDGE-UNDEFINED | FIX | its V09 end is an END line under V09 |
| VDC3-02 | major | major | CONFLICT | FIX per R4-14 |  |
| VDC3-03 | major | major | CONFLICT | FIX per R4-15 | §14's `E_OTHER_SETTLEMENT` end is an END line under scope |
| VDC3-04 | minor | minor | CONFLICT | FIX |  |
| VDC3-05 | minor | minor | WIRING | FIX per R4-09, amended | `bend.wall.held` as written; the second row is R4-09's `bend.wall.raisedCrossing` row (the trace bent through a station, nothing of the raised way re-run) |
| VDC3-07 | minor | minor | WIRING | FIX per R4-09, amended | R4-09's S7-row text: the raised way held, its crossing station in the effective scope and the fate sheet |
| VDC3-08 | minor | minor | NARRATION | FIX |  |
| VDC3-09 | minor | minor | WIRING | FIX |  |
| VM-R3T-09 | minor | minor | WIRING | MERGED into VDC3-07 |  |
| VV1112-r3-04 | major | major | CONFLICT | FIX | V09's restatement is VV1112-r3-05 |

**END lines under this heading** (other units' fixes this seat writes):

* END of VEW-r3-01 (pipeline): §7.1's outcome table gains, before the catch-all row, R4-09's `bend.raised.underSpan` row (a ground `drawWay`, a moved way or a carve meeting a standing raised way's supports, ramps, stairs, feet or a `vault` span's strip, or crossing its under-deck strip elsewhere than under an `open` span → bent to the nearest `open` span that holds it, named in one line). *(R4-09)*
* END of VEL3-r3-02 (V08): §7.7 item 10's "reported with the fallback taken (item 125 (b); T125-1)" adds "— at an absorb a field that takes its fallback changes nothing, the carried fact standing (V08 §3.5)". *(R4-15 (a))*
* END of VM-R3T-06 (model): §7.4's lock column for a raised way, "its deck and piers held", adds "(a later trace's crossing station taking the band's stretch, §2.7's support step (6) (b))". *(R4-09)*

### rendering (base §8, §9, §11, §12)

Rulings: R4-01, R4-02, R4-04, R4-05, R4-06, R4-10, R4-12.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R3T-03 | minor | minor | DISAGREE | MERGED into VV12-r3-02 |  |
| VAL-R3-04 | major | major | DISAGREE | FIX | V04 §5.6 (5) already states it; no V04 end |
| VAL-R3-06 | major | major | DISAGREE | FIX per R4-04 | its §8.6 sentence as R4-04 words it; its §8.2 part is VV12-r3-02's |
| VAT-r3-02 | major | major | MATRIX-GAP | FIX per R4-05 | its ends at V10, V09 and V07 are END lines there |
| VAT-r3-04 | minor | minor | DISAGREE | FIX |  |
| VRC2T-08 | major | major | CONFLICT | FIX per R4-10 |  |
| VRC3T-01 | major | major | NEW-PROBLEM | FIX per R4-12 |  |
| VRC2T-12 | minor | minor | WIRING | FIX |  |
| VRC3T-05 | minor | minor | EDGE-UNDEFINED | FIX |  |
| VRC3T-06 | minor | minor | TERM | FIX |  |
| VRC3T-07 | minor | minor | CONFLICT | FIX | V08 §2.2's comment is an END line under V08 |
| VCS-r3-07 | minor | minor | TERM | FIX | and the same retired term in rendering's own §8.8 (l. 14172, 14176), §12's R12-38 row (l. 17298) and J-A68.85, J-A68.89, J-A68.90 |
| VV12-r3-02 | major | major | CONFLICT | FIX per R4-04 | its last sentence reads "a unit's `ruinTone` stands while the look stands over any of its buildings" |
| VV34-r3-02 | major | major | CONFLICT | FIX |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VPC-R3-03 (pipeline): §8.2's placement sentence (l. 13009–13011) and T-ER-27 read VPC-R3-03's texts — a carriageway holding only a barrier across it (a `barricade`, a `beast`'s `stakes`, a quarantine's `cordon`; §10.2 (d)), T-ER-27 adding a quarantine fixture whose quarter ways enter. *(R4-06)*
* END of VV56-r3-03 (pipeline): T-ER-27 adds a refugee camp of two heads, placed by the overflow belt by the gate (`approachByGate`'s `h` at least 1, §10.2 (d)), never undefined.
* END of VAL-R3-01 (V09): §8.4's *Toggles are visibility* sentence, §9's candidate set (l. 14674–14675) and §11.2's `ExportOpts.layers` comment (l. 16074) read R4-02's texts. *(R4-02)*
* END of VV910-r3-02 (V09): §11.2's `looks` member reads `| { kind: 'looks'; view: ViewHandle; building?: Id /* g item 122 (f): with it, each disaster look says whether it stands over that building (§10.2 (f)) */ }` and `LooksAnswer.crises[]` gains `over?: boolean /* with the query's building: whether this disaster look stands over it at the view's week — a building of one of its units on which V06 §3.22 (3)'s crisisLookYields is not yet true; on a preview, every building of its units; evaluated in the generation worker */`. *(R4-04 (c))*
* END of VV910-r3-03 (V10): §11.2's `LooksAnswer.festivals` comment adds "standalone the list is empty (DR43: no tradition exists and none is invented); a previewed generic festival is no entry — it reaches the view by §2.9's `festival`".

### V01

Rulings: R4-01, R4-09, R4-12.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R3T-01 | minor | minor | DISAGREE | FIX |  |
| VV12-r3-03 | major | major | WIRING | FIX per R4-12 | V09's call is an END line under V09 |

**END lines under this heading** (other units' fixes this seat writes):

* END of VEW-r3-01 (pipeline): §3.17.3 (3) cites §4.3's crossing rule for a part-0 way under a raised way ("by §4.3's rule: …"), its `raised.clearWidthM` and `raised.squareDeg` read as V11 §3.24.2's `raisedWays.structure.clearWidthM` and `squareDeg` (values unchanged); its ladder (F-TEMPLATE rungs 1–2, §4.6's for a bent-cut lane) stays V01's. *(R4-09)*

### V02

Rulings: R4-01, R4-04, R4-11.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r3-03 | major | major | DISAGREE | FIX per R4-11 |  |
| VAT3-r3-06 | minor | minor | DISAGREE | FIX |  |
| VV12-r3-01 | major | major | WIRING | FIX per R4-04 | with the sweep's J-V2.113 (l. 4003) and l. 2455 reading R4-04 (a)'s gloss for "V07's ends" |

**END lines under this heading:** none.

### V03

Rulings: R4-01, R4-03, R4-04, R4-11.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r3-04 | major | major | DISAGREE | FIX per R4-11 |  |
| VAT3-r3-07 | minor | minor | DISAGREE | FIX |  |
| VV12-r3-04 | major | major | WIRING | FIX per R4-04 |  |
| VV12-r3-06 | minor | minor | CONFLICT | FIX |  |
| VV34-r3-05 | minor | minor | CONFLICT | FIX |  |
| VV34-r3-06 | minor | minor | NEW-PROBLEM | FIX | its `own` comment as written agrees with R4-03 |

**END lines under this heading** (other units' fixes this seat writes):

* END of VV56-r2-06 (V06): §5.6 (2) (a) adds "an element is compared with the level only from its entry week ((b); V06 §3.23 (3))"; (b)'s "that change's effective week (V06 §2.11)" reads "that change's effective week (V06 §2.11) — for an element a restoring event's re-cut mints, the week that restoration ends (V06 §3.23 (3))"; §1b's and §2.5's `planDamage` rows (l. 303, l. 926) name the entry week so; §13's V06 row cites V06 §3.23 (3). *(R4-03)*

### V04

Rulings: R4-01, R4-02, R4-04, R4-09, R4-11, R4-12.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAL-R3-03 | major | major | MATRIX-GAP | FIX per R4-09, amended | one trigger in place of the three listed cases: every change to a raised way's `feet`, `supports` or `spans`, whoever makes it (R4-09's V04 text); V06's end is an END line under V06; T-V4-63's fixture as written, a frame growth's deck extension added |
| VAL-R3-05 | major | major | MATRIX-GAP | FIX per R4-12 | V05's and V09's ends are END lines there |
| VAL-R3-09 | minor | minor | DISAGREE | FIX per R4-04 |  |
| VAP-r3-05 | major | major | DISAGREE | FIX per R4-11 |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VAL-R3-01 (V09): §5.1's lead, "When the underground layer is visible, one depth band draws at a time" → "When the underground layer is drawn — visible, or Below the view's working layer (§8.4) — one depth band draws at a time". *(R4-02)*

### V05

Rulings: R4-01, R4-02, R4-09, R4-12.

No issue of its own this round; it runs for its END lines (R4-01 (4)).

**END lines under this heading** (other units' fixes this seat writes):

* END of VAL-R3-01 (V09): §5.6 (3)'s "and Go there turns its visibility on, as switching the working layer does" → "and Go there makes Sky the working layer, which the view draws whatever its visibility (§8.4), no event sent (item 120 (a))". *(R4-02)*
* END of VAL-R3-05 (V04): §5.6 (2)–(5) add "At a drawn week whose frame is not the head (V06 §3.15.2), an island's matches, glow, pins, ghost pins and gaps are §11.2's listing at that week, each drawn at its island's anchor in that frame." *(R4-12)*
* END of VEW-r3-04 (model): §3.16's raised-way pier row adds "(a crossing station's support is its wall stretch, §2.7: the wall row's breach)". *(R4-09)*

### V06

Rulings: R4-01, R4-03, R4-07, R4-09, R4-16.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r3-06 | minor | minor | HANDOFF-OPEN | FIX | §13.8's row is an END line under scope |
| VAT3-r3-10 | major | major | EDGE-UNDEFINED | FIX per R4-07 |  |
| VEL3-r3-01 | major | major | CATALOGUE-GAP | FIX | §4.11's parenthesis is an END line under pipeline |
| VM-R3T-03 | major | major | CONFLICT | FIX |  |
| VV34-r3-01 | blocker | blocker | NEW-PROBLEM | MERGED into VV56-r2-06 | its V03, model and §3.21 ends are R4-03's |
| VV56-r2-06 | blocker | blocker | EDGE-UNDEFINED | FIX per R4-03 | BLOCKER kept (every `reoccupy` whose `repair` Works runs past its epoch's week drew new elements damaged, then patched: a silent wrong result; T-V6-76 (b) could not pass); its ends at V03, model and V10 are END lines |
| VV56-r3-01 | minor | minor | CONFLICT | FIX |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VEW-r3-04 (model): §3.19.2 (3)–(5) cite §2.7's support step (3) for a crossing station — the salvage `dismantle` and the `topple` never take it, and `repairRaised` beside a station whose stretch is `breached` or `dismantled` first repairs that stretch by `repairWall` in the same batch, in item 114's patch material. *(R4-09)*
* END of VAL-R3-03 (V04): `EpochScope.raised`'s comment (§2.1, l. 465) and W64's derivation read "every raised way whose `feet`, `supports` or `spans` an epoch op, a landfall, a trace's crossing station or the frame growth changed". *(R4-09)*
* END of VEW-r3-01 (pipeline): §3.6 and §3.19 cite §4.3 for the growth's and the route re-solves' crossing of a standing raised way. *(R4-09)*
* END of VM-R3T-05 and VCS-r3-06 (scope): T-V6-47 takes T110-2's epoch clauses (4) and (5) on H-AQUA and reads "(takes T110-2's epoch clauses)". *(R4-09)*
* END of R4-09 (adjudicator's sweep): §3.7.1's "the supports of a raised way the trace crosses excepted within one strip width of the crossing (§2.7's support step (6) re-sites them, V06 §3.7.6 (5))" → "a standing raised way's under-deck strip, supports, ramps, stairs and feet excepted where the trace crosses it (its strips stop there, §2.7's support step (6) (b))"; §3.7.6 (5)'s second bullet → "a trace crosses a raised way through one of its stations on the deck at its level, the trace bent to it (§2.7's support step (6) (b)), never along its under-deck strip"; its continuity bullet → "a trace never waits for a raised way: what cannot pass under its deck stops at the under-deck strip's edges, reported in the wall report (§2.7's support step (6) (b))", `walls.waited` kept for the other continuity rules. *(R4-09)*
* END of VV56-r2-04 (V08): §6.8 (6)'s and T-V6-24's over-budget clauses cite V08 §6's absorb-with-epochs change (one batch per epoch; R12-31). *(R4-16)*

### V07

Rulings: R4-01, R4-05.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAH-r3-09 | minor | minor | HANDOFF-OPEN | FIX |  |
| VAL-R3-10 | minor | minor | DISAGREE | MERGED into VPC-R3-04 |  |
| VPC-R3-04 | minor | minor | CONFLICT | FIX | one pass with VV78-r3-06 in the same table |
| VV78-r3-06 | minor | minor | CONFLICT | FIX |  |
| VV910-r3-05 | minor | minor | TERM | MERGED into VAH-r3-09 |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VAT-r3-02 (rendering): §4.5 and W74 cite `opts.view` (V10 §2.13; §11.2's view-bound `why`) for the crisis, season and festival rows. *(R4-05)*

### V08

Rulings: R4-01, R4-04, R4-07, R4-08, R4-15, R4-16.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAH-r3-04 | minor | minor | DISAGREE | FIX per R4-07 | with VAT3-r3-05's W64 and field-row sites |
| VAH-r3-05 | minor | minor | DISAGREE | FIX |  |
| VAH-r3-10 | minor | minor | DISAGREE | FIX |  |
| VAH-r3-11 | minor | minor | HANDOFF-OPEN | MERGED into VV1112-r3-03 |  |
| VAT3-r3-05 | minor | minor | TERM | MERGED into VAH-r3-04 |  |
| VEL3-r3-02 | major | major | EDGE-UNDEFINED | FIX per R4-15 |  |
| VCS-r3-03 | minor | minor | COHESION | FIX |  |
| VV56-r2-04 | major | major | WIRING | FIX per R4-16 | the pre-decided change is R4-16's per-epoch batch, stated at build depth with its measured costs, target and identity bar; V06's end is an END line under V06 |
| VV78-r3-01 | major | major | CONFLICT | FIX per R4-15 |  |
| VV78-r3-02 | major | major | CONFLICT | FIX per R4-15 |  |
| VV78-r3-03 | minor | minor | COHESION | FIX |  |
| VV78-r3-04 | minor | minor | WIRING | FIX |  |
| VV1112-r3-03 | major | major | WIRING | FIX |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VAT3-r3-02 (model): §3.15 (2)'s `calamities` bullet reads "`calamityHistory[]` up to and including the present at creation (§4.11 *The clock* (1)), …"; T-V8-51 adds a dossier whose latest stamped tick is a calamity's, that calamity in the hint and in the last replay epoch. *(R4-07)*
* END of VAT3-r3-01 (pipeline): §3.6 (3)'s calamity clause cites §4.11 *The clock* (4)'s rule for a calamity carried at or before the last epoch's week; the edge row (l. 2645) names that case among its degenerate inputs, with its outcome. *(R4-08)*
* END of VRC3T-07 (rendering): §2.2's comment "export.request gains displayNames?: …, knowledge?: Admission …" reads "export.request's `opts` carries `displayNames` and `knowledge` (§11.2's `ExportOpts`)".
* END of VAH-r3-06 (V11): §3.17's combinations row (l. 2688), "V07's ends at the village rungs" → "V07 §5.6 (3)'s units at the village rungs (its ends, or an end-less thorp's toft groups)". *(R4-04)*

### V09

Rulings: R4-01, R4-02, R4-04, R4-05, R4-09, R4-10, R4-12, R4-14, R4-16.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAH-r3-02 | major | major | DISAGREE | MERGED into VV910-r3-02 | its plan-panel text (`PlanDamage.look` set) is written inside VV910-r3-02's §4.21.13 (3) under R4-04 (c) |
| VAH-r3-03 | minor | minor | DISAGREE | FIX per R4-14 |  |
| VAL-R3-01 | blocker | blocker | DISAGREE | FIX per R4-02 | BLOCKER kept (owner item 120 (a) contradicted on Find's common path); its V05 end is an END line under V05 |
| VAT-r3-01 | blocker | blocker | NEW-PROBLEM | MERGED into VAL-R3-01 |  |
| VAT-r3-03 | major | major | DISAGREE | FIX | VV910-r3-02's §2.12 clauses are inside it |
| VAT-r3-06 | minor | minor | NARRATION | FIX |  |
| VDC3-06 | minor | minor | WIRING | FIX per R4-09 | with `bend.raised.underSpan` (END of VEW-r3-01) |
| VDC3-11 | minor | minor | CONFLICT | FIX |  |
| VRC3T-04 | major | major | CONFLICT | FIX per R4-10 |  |
| VV34-r3-03 | major | major | CONFLICT | FIX |  |
| VV56-r3-02 | minor | minor | CONFLICT | FIX |  |
| VV910-r3-01 | major | major | EDGE-UNDEFINED | FIX |  |
| VV910-r3-02 | major | major | CONFLICT | FIX per R4-04, amended | §4.21.12 (4), §5.8 and the card's `facts` row read §11.2's `looks` asked with the building (`over`), never `yielded`; §4.21.13 (3) reads V03's `planDamage` (`PlanDamage.look` set; VAH-r3-02's text); §2.12's triggers are VAT-r3-03's; row 92 and T-V9-86 as written; its rendering end is R4-04 (c)'s END line under rendering |
| VV910-r3-06 | minor | minor | CONFLICT | FIX |  |
| VV910-r3-07 | minor | minor | ELEGANCE | FIX |  |
| VV910-r3-08 | minor | minor | CONFLICT | MERGED into VAH-r3-03 |  |
| VV1112-r3-05 | minor | minor | CONFLICT | FIX | one fix with VV1112-r3-04 (determinism) |

**END lines under this heading** (other units' fixes this seat writes):

* END of VDC3-01 (determinism): §4.21.14 (4) adds "A press while a spell is in force fades that spell out first, the pressed spell starting when it reaches 0; a further press before then changes nothing (§6.1 *The weather stream*)."; row 93 adds that case with its outcome.
* END of VV12-r3-03 (V01): §4.21.10 (10)'s call reads `gapUnits(chip, key, week)`, the view's drawn week (§2.9's `week`). *(R4-12)*
* END of VAL-R3-05 (V04): §4.21.10 (7) passes the model the view draws — at a drawn week whose frame is not the head, that frame (V06 §3.15.2) — to `underFindPlaces` and to V05 §5.6's places. *(R4-12)*
* END of R4-12 (adjudicator's sweep): §4.21.10 (8)'s "§11.2's listing restricted to the entities that frame holds" reads "§11.2's listing at that week (the frame's matches, by the uses it holds open then)". *(R4-12)*
* END of VAT-r3-02 (rendering): §2.7's `WhyCardModel` reads `query({ kind: 'why', …, view })` with the card's view. *(R4-05)*
* END of VEW-r3-01 (pipeline): §4.9 adds `bend.raised.underSpan` (the way or channel moved to cross under {way}'s nearest open arch), in V09's words, ending with `button.showWhy`. *(R4-09)*
* END of R4-10 (adjudicator's sweep): §4.21.11 (2)'s "A change takes effect at the view's next settle, never during a pan, zoom or drag (§8.8's settle rule)" → "A change takes effect while the view is settled — at once when no gesture runs, at the gesture's settle otherwise — never during a pan, zoom or drag (§8.8)". *(R4-10)*

### V10

Rulings: R4-01, R4-02, R4-03, R4-04, R4-05.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAH-r3-01 | minor | minor | HANDOFF-OPEN | FIX | one text for VV910-r3-04 and VV1112-r3-07 |
| VAH-r3-08 | minor | minor | DISAGREE | FIX |  |
| VAT-r3-05 | minor | minor | DISAGREE | FIX per R4-02 |  |
| VCS-r3-04 | minor | minor | COHESION | FIX |  |
| VV910-r3-03 | major | major | CONFLICT | FIX | §11.2's festivals comment is an END line under rendering |
| VV910-r3-04 | minor | minor | BROKEN-REFERENCE | MERGED into VAH-r3-01 |  |
| VV1112-r3-07 | minor | minor | BROKEN-REFERENCE | MERGED into VAH-r3-01 |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VAT-r3-02 (rendering): §2.13's `WhyProvider.explain` opts gain `view?: { week: number; yearWeek: number; festival: ViewState['festival']; crises: ViewState['crises']; looks: LooksAnswer }`; §3.9's query paragraph adds "and, for a view-bound why, the view's state and `looks` answer"; the `why` tool passes `ClerkSession.view` where present (§3.5). *(R4-05)*
* END of VAH-r3-06 (V11): §2.13's `LookAnswer.crises.looks[].districts` comment (l. 1014), "V07's ends" → "V07 §5.6 (3)'s units (its ends, or an end-less thorp's toft groups)". *(R4-04)*
* END of VV56-r2-06 (V06): §3.9a (l. 1844), "an element that entered the plan after its damage left never among them" → "an element that entered the plan after its damage left, or that a restoring re-cut minted, never among them". *(R4-03)*

### V11

Rulings: R4-01, R4-04, R4-09.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R3T-02 | minor | minor | DISAGREE | FIX per R4-04 |  |
| VAH-r3-06 | minor | minor | DISAGREE | MERGED into VAF-R3T-02 | its second ends at V10 and V08 are END lines there; §11.2's is VV12-r3-02's |
| VAP-r3-07 | minor | minor | HANDOFF-OPEN | FIX |  |
| VAT3-r3-09 | minor | minor | DISAGREE | FIX |  |
| VCS-r3-05 | minor | minor | COHESION | FIX |  |
| VV1112-r3-06 | major | major | EDGE-UNDEFINED | FIX |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VEW-r3-01 (pipeline): §3.24.2's `raisedWays.structure` gains `clearWidthM` and `squareDeg` at V01's values (read by §4.3's crossing rule and V01 §3.17.3 (3)). *(R4-09)*

### V12

Rulings: R4-01, R4-06, R4-11, R4-13.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r3-01 | major | major | DISAGREE | FIX |  |
| VAP-r3-02 | major | major | DISAGREE | FIX |  |
| VAP-r3-08 | minor | minor | DISAGREE | FIX |  |
| VAP-r3-10 | minor | minor | DISAGREE | FIX |  |
| VAT3-r3-04 | major | major | DISAGREE | FIX |  |
| VCS-r3-02 | minor | minor | COHESION | FIX |  |
| VV1112-r3-01 | major | major | CONFLICT | FIX per R4-13 |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VAP-r3-09 (scope): §3.15.12's head adds V04's T-V4-82 (i) beside V01's T-V1-60.
* END of VPC-R3-03 (pipeline): `crisis.blocked`'s statements — registry l. 1208, the planted-fault row l. 2338, §3.15.12 l. 2706, edge row 33 l. 2871, T-V12-54 l. 3159 — read "a way's carriageway save a barrier across it (a `barricade`, a `beast`'s `stakes`, a quarantine's `cordon`; §10.2 (d))", T-V12-54's passing cases adding the stakes and the cordon. *(R4-06)*
* END of R4-11 (adjudicator's sweep): `crisis.weeks`' knowledge clause (registry l. 1208; §3.15.12's T122-2 bullet l. 2694), the planted-fault row (l. 2338) and edge row 33 (l. 2871) read R4-11's texts. *(R4-11)*


## Part I — canon changes (appended to canon.md as one dated ruling)

The dated ruling "2026-10-01 (adjudication round 4)" at the end of `docs/validation/coherence/canon.md` records, by
pointer to the rulings above: the seat's own sweep and supersession by name (R4-01); the view drawing its working layer,
every switch and Find's **Go there** writing nothing (R4-02, superseding R3-21's V09 END line); a restoring re-cut's new
elements entering the damage when the restoration ends (R4-03, amending R3-08 (b)); one phrase each for a disaster
look's units and the buildings it stands over, V09 asking `looks` per building (R4-04, amending R3-16's per-district
reading at V09); the view-bound why (R4-05); a barrier across a way — a barricade, a beast's stakes, a quarantine's
cordon (R4-06, amending R3-14 (3)); the present at creation bounding `HistoryHint`, inclusive, and an event at the
present in the last replay epoch (R4-07, amending R3-18's reach); a calamity carried late riding the absorb's first
epoch (R4-08, amending R3-17); raised ways — generation places the supports last, a standing raised way is held and later
work gives way (R4-09, superseding R3-25 (c) and round 3's support step (6)); Auto applying while the view is settled
(R4-10); no test staging a key that withholds a look-bearing condition (R4-11); Find at a drawn week reading the frame's
listing (R4-12, amending R3-24); the disaster's unit count (R4-13, amending R3-14 (4)); the roofless case at §6.3
(R4-14); item 125 at an absorb, at the cap and for the key (R4-15, amending R3-20 (2)); V08's per-epoch absorb batch for
an over-budget catch-up (R4-16). Nothing is ruled INVALID this round.
