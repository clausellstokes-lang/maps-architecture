# repair-r4-model — lane coherence/repair-model-r4 (unit model: base §2)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-model-r4; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header
# is ignored. Base: docs/ARCHITECTURE.md sha256 593c657d34849302… (assemble-r3's output, the live file). Each REPLACE body
# is the live subsection with count-asserted substitutions (generator docs/validation/coherence/work/repair-model-r4/
# gen.py with edits.py: 19 edits over 13 line ranges, each applied exactly once; only the touched line ranges are
# re-wrapped, every other line verbatim). 3 REPLACE blocks (§2.6, §2.7, §2.9), 0 RULING REQUEST blocks. Binding:
# adjudication-r4.md (R4-01 – R4-04, R4-07, R4-09; Part H · model), with R3-01 – R3-03 standing.
#
# PROGRESS
# - P0 brief read whole; adjudication-r4 TOC, R4-01, R4-02, R4-03, R4-04, R4-07, R4-09 and Part H · model read whole;
#   R3-01 – R3-03 (standing) read: done
# - P1 issue texts (round4-work/model.json; no also_reported, no orchestrator_note); live §2.6 (BuildingInput, plan rung
#   steps 1 and 7), §2.7 whole, §2.9 View state; V06 §3.19.2, §3.23, §3.7.7, §2.8 repairWall; V07 §3.5a (4), §5.6 (3);
#   V08 §3.15; §3.2 (9); §4.2 S3 (10); §4.3 *The slot*; §4.6; §10.2 (d), (f); §4.11 *The clock* (1): done
# - P2 count-asserted edits (work dir docs/validation/coherence/work/repair-model-r4/): done
# - P3 blocks, dry run on a copy, checks, result, LANDED: done
#
# DISPOSITIONS — 14 routed issues: 12 FIXED, 2 MERGED (closed by VAT3-r3-02's fix, no block of their own), 0 INVALID,
# 0 ruling requests
# - VAL-R3-02 (major; FIX per R4-09): §2.7 support step (3) — after "— on a gate's line or as an aqueduct's wall arch, the
#   only crossings §4.3 allows —": "(a village map's palisade, `VillagePlan.palisade`, is no crossing: its trace abuts each
#   support standing in its band, never moving it, and passes beneath every span, with no crossing station and no gate;
#   V07 §3.5a (4))"; and (6) (b) (iv) as R4-09 writes it. The edge row `wall` is pipeline's END line.
# - VAT3-r3-02 (major; FIX per R4-07; closes VM-R3T-02 and VPC-R3-05, MERGED): §2.7 `HistoryHint.ageYears` "the
#   settlement's age at the present at creation (§4.11 *The clock* (1)) — never advanced by §4.11's clock";
#   `HistoryHint.calamities` "calamityHistory up to and including the present at creation (§4.11 *The clock* (1)) — every
#   calamity the creation carries (DR36's losses; DR37's events)". Sweep (R4-01 (2)): the hint's head ("the dossier's
#   history up to and including the present at creation"), `population`'s tick reading ("the week the present at
#   creation", as V08 §3.15 reads it) and §2.9's `Recipe.history` comment name the same bound. V08 §3.15 (2) and
#   T-V8-51 are V08's END lines.
# - VAT3-r3-08 (minor; FIX): §2.6 step 7 — "one item 113's replay abandons or ruins ages from the week its change shows in
#   that replay epoch (V06 §3.23 (4): the epoch's week where it starts no Works)".
# - VEW-r3-02 (major; FIX per R4-09): §2.7 support step (6) (a) — after S7's batches and before S7b the support step runs
#   once more on every raised way, its keys kept by (5) and its span rule then running at its eager time, with every
#   obstacle then standing (S5b's and S5c's ways; S7's strips, gate plazas, castle paths, quays, piers and moles); a
#   station it can neither slide nor omit within its bounds keeps its place and the S7 part gives way, reported. The
#   S5a-commit run takes the berm and channel S5a carves; the strips' setbacks and glacis are taken at the run after S7
#   (judgment (1)). Pipeline's §4.3 *The slot* and §4.8 lead are its END lines.
# - VEW-r3-03 (major; FIX per R4-09): (6) (a)–(b) — a crossing station stands on the deck at its level, never on a ramp
#   or a stair (a trace meeting the raised way on a ramp or stair bent through the nearest deck-level station, judgment
#   (2)); where the berm or channel would meet a ramp, a stair or a foot they stop at the under-deck strip's and the
#   ramp's edges, reported (`W_RAISED_CROSSING`); after generation the ramps, stairs and feet are a reservation and a
#   trace's strips pass under the deck only where no support, ramp, stair or foot stands in them. V06's end is R4-09's V06
#   END; the fixture is scope's (2) of VM-R3T-05.
# - VEW-r3-04 (major; FIX): §2.7 support step (3) — a crossing station's `supports` entry carries no `state` of its own,
#   reading its stretch's `condition` (`standing`, `worn`, `patched` a standing support; `breached`, `dismantled` a
#   ruined one); V06 §3.19.2 (3)'s salvage `dismantle` and (4)'s `topple` never take it, its stretch decaying as the
#   wall's once both spans have fallen; a landfall over it breaches it and ruins the spans beside it (V05 §3.16's landfall
#   table: (3)'s existing landfall clause, one statement); a `repairRaised` beside a fallen stretch, V06 §3.19.2 (5)'s or
#   a hand Repair, first repairs it by `repairWall` in the same batch, in item 114's patch material (judgment (6)). The
#   record's `supports[].state` comment points to (3). V06, V05 and scope ends are their END lines.
# - VEW-r3-05 (minor; FIX per R4-09): (6) (a) "A stage's S5a trace and outer moat across an earlier raised way — S4's, or
#   an S5b viaduct, the stage's own included —". §4.8's end is pipeline's END line; its fixture is scope's (2).
# - VKr3-04 (minor; FIX): §2.7 `RaisedFoot` comment — "A frame growth (§3.2 (9)) first moves the foot's ground end onto
#   the new ring (its foot batch, between part 0's two L0 batches), then extends the deck to the new ring as §4.11
#   continues a through-road, …"; its writer list adds "a ring-end foot's ground end moved first by a frame growth's foot
#   batch (§3.2 (9); below)", the omitted writer the claim names.
# - VM-R3T-01 (minor; FIX): §2.6 `BuildingInput.stage` "its running build Works' stage at the drawn week (§4.11; a
#   `decay` or `repair` Works is none, step 7)"; step 1 "the running build Works' stage (item 67; a `decay` or `repair`
#   Works is none, step 7)"; step 7's first use "A building whose running build Works — a Works of any kind but `decay`
#   and `repair` (§2.7's `Works.kind`) — stands before FINISHED …". §2.8's two sites already read "build Works".
# - VM-R3T-06 (major; FIX per R4-09, amended): (6) (b)'s lock clause — a lock or pin holds what (b) holds, the crossing
#   station's support taking the band's stretch being the wall's arch (item 110 (b)), so a locked or pinned raised way is
#   crossed as an unlocked one is, nothing it holds changing: no wait, no refusal. The claim's Re-derive case is written
#   in (6) (a) (judgment (3)). §7.4's lock column is determinism's END line; the fixture is scope's (4).
# - VM-R3T-07 (graded major; FIX per R4-04; also closes VAL-R3-08's model end): §2.6 step 7 — "A building a disaster
#   look stands over (item 122 (d); §10.2 (d)'s `neighbourhoods` and (f): a building of one of its units — a district, at
#   THORP, HAMLET and VILLAGE a unit of V07 §5.6 (3) on the plots `villageUnitPlots` gives it — until V06 §3.22 (3)'s
#   `crisisLookYields` turns true on it, a preview never handing over) draws the same layer …"; so no week draws both the
#   look and the build stage on one building.
# - VRC3T-02 (major; FIX per R4-02): §2.9 *View state* drops "layer choices" and adds after the list: "The layers shown are
#   no view key: `LayerSpec.visible` is the document's style state, set by a logged `setLayer` (§8.4, §7.1; §11.3); the
#   per-viewer `workingLayer` (above) is drawn whatever its visibility (§8.4)." (judgment (7)).
# - VM-R3T-02 (MERGED into VAT3-r3-02): its `ageYears` site written in VAT3-r3-02's fix; "before" reads "up to and
#   including" (R4-07).
# - VPC-R3-05 (MERGED into VAT3-r3-02): its "up to" reads "up to and including" (R4-07).
#
# R4-09'S BINDING TEXT — §2.7's support step (6), whole, as two sub-items under the support-step bullet: "(6) **later work
# across a raised way**, at generation and after it:" (a) *At generation* and (b) *A standing raised way is held*, with
# (i)–(iv) inside (b). It replaces the old (6) from "a trace or moat laid across a standing raised way" to "never dropped
# for a wall (T110-2)." Every clause of the ruling's text is written; the additions and their reasons are judgments (1)–(5).
#
# END LINES written this round (R4-01; Part H · model)
# - END of VV56-r2-06 (V06; R4-03): §2.6 step 7's "an element that entered the plan after its damage left never drawn
#   repaired (V06 §3.23 (3))" reads "an element that entered the plan after its damage left, or that a restoring event's
#   re-cut minted, never drawn damaged by that restoration nor repaired (V06 §3.23 (3))".
#
# JUDGMENT CALLS (vetoable; each keeps the ruling's meaning and closes an edge its text left implicit)
# (1) (6) (a): R4-09's "the stations in the new strips' setbacks, glacis, berm or channel slid or omitted by (3)" is
#     written by when each exists — the berm and channel at the S5a-commit run, the setbacks and glacis (which S7 cuts) at
#     the run after S7 — VEW-r3-02's own statement ("the strips are taken at this later run"): at S5a no strip exists.
# (2) (6) (a): "the nearest interior station on the deck at its level, never on a ramp or a stair, … else one added"
#     has no place to add one where the trace meets the raised way on its ramp or stair (VEW-r3-03's valley-rim case).
#     There the trace is bent along the deck through the nearest deck-level station, as in (b) (iii) — the only reading
#     under which the ruling's clause and its fixture (scope's (2): "the crossing station on the deck at its level") both
#     hold.
# (3) (6) (a): VM-R3T-06's claim names a Re-derive's S5a trace across a locked aqueduct. R4-09's lock clause ("a lock or
#     pin holds what (b) holds") is read at generation too, a locked entity being a fixed input of the run (§7.2; §7.4's
#     lock column): such a raised way is crossed as a standing one ((b)), and the run after S7 moves none of its stations,
#     the S7 parts giving way. Otherwise (a) would re-site a locked way's piers at every Re-derive.
# (4) (6) (a): the run after S7 is followed by the span rule at its eager time (VEW-r3-02's text: the spans are keyed by
#     the stations), and its give-way is reported under the code (a) names for its other give-way, `W_RAISED_CROSSING`;
#     "No generated course is dropped for a later stage" cites its bar (T110-2).
# (5) (6) (b) (iii): the station's support change is written in the trace's commit and restored by its undo (the old
#     (6)'s "the trace's undo restoring them", kept); the bent hand edits add "a moved trace vertex", as §7.1's row for
#     this rule names it (R4-09's determinism END), so the two homes list the same edits.
# (6) VEW-r3-04: its landfall sentence is folded into (3)'s existing landfall clause ("ruins the spans beside it (V05
#     §3.16's landfall table)"; was "ruins the deck there by V05's landfall table") and its "decays as the wall's once
#     both spans have fallen" points to (3)'s release, so each fact is stated once. "In item 114's patch material" names
#     its row's home — "the row V06 §3.7.7 (3) draws" (the kind's and culture's `walls.patchMaterials` rows by weight) —
#     and a `dismantled` stretch takes `repairWall`'s own bend (V06 §2.8: a new stretch drawn on its line), so the
#     repair is defined for both fallen states (on a `dismantled` run `repairWall` alone bends).
# (7) VRC3T-02: R4-02's sentence says "`workingLayer` (below)"; the sentence follows the list in which that key stands,
#     so it reads "(above)".
# (8) R4-09's "a locked or pinned raised way is crossed by the same rule" reads "is crossed as an unlocked one is": the
#     first wording's tokens matched a reference-corpus 3-gram run by coincidence (doc_checks C3); the meaning is the same.
#
# HAND-OFFS (R3-01 (3), kept by R4-01: ends no line names; for round 5's verifiers)
# - determinism §5.4: `GenerationReport.stages[].warnings`' comment lists the stage warning codes; §2.7's support step
#   (6) (a) issues `W_RAISED_CROSSING` (S5a's berm and channel stopped at the under-deck strip; S7's parts giving way to a
#   station after the last support run), so the list may name it (S5a, S7).
# - pipeline §4.4 S5a: (6) (a)'s two bends of a generation trace — through the nearest deck-level station where the trace
#   meets an earlier raised way on its ramp or stair (judgment (2)), and across a locked or pinned raised way at a
#   Re-derive by (b) (iii) (judgment (3)) — are §2.7's rule; S5a's *Outer moats* sentence (VM-R3T-04's END) may cite them.
# - pipeline §4.8: S7's parts that give way to a station after the last support run (a strip, plaza or square cut round
#   its ring; a quay, pier, mole or castle path ending at it and resuming beyond) are §2.7's (6) (a); §4.8's lead (END of
#   VEW-r3-02) may cite it.
# - V06 §3.19.2 (5) (END of VEW-r3-04): §2.7 (3) names the patch row's home (V06 §3.7.7 (3)'s draw) and the
#   `dismantled` stretch's repair (`repairWall`'s bend, V06 §2.8); V06's citation may name both.
# - scope §13.2 T110-2 and the item-114 group: a Re-derive with a locked viaduct crossed by a stage-2 trace (no station
#   moved, the trace through one deck-level station, the S7 parts giving way), and a `repairRaised` beside a station
#   whose stretch is `dismantled` (the stretch re-laid with the deck, never a deck on a gap), beside the fixtures R4-09
#   gives scope.
#
# CHECKS (on scratch copies; live files untouched)
# - apply-blocks.py (the assembler's applier, unchanged) on a copy of the live base and rationale: 3 blocks found, 3
#   applied, 0 skipped; audit 3 × OK; headings 153 → 153; fences balanced, 140 → 140 fence lines; title block unchanged;
#   rationale byte-identical; document 22 731 → 22 781 lines.
# - whole-document diff = 13 hunks (live l. 1489, 1991–1994, 2069–2071, 2099–2108 (§2.6); 2288, 2305–2307, 2310–2311,
#   2443–2444, 2451–2452, 2540–2567 (§2.7); 3054, 3318, 3346–3350 (§2.9)); no other line moves.
# - doc_checks.py --sections 2.6,2.7,2.9 before and after: exit 0 both (C1 5/0, C2 1/0, C3 299 → 298 / 0 unreviewed, C4
#   1/0, S1 0/0, S2 251 → 256 / 0 unreviewed: every new § pointer resolves). A first draft's "crossed by the same rule"
#   matched corpus 3-grams by coincidence and was reworded (judgment (8)). The tool warns the reference corpus is
#   INCOMPLETE in this checkout (captures, research/patreon, research/devlogs, research/ftg-docs, research/external
#   absent): its clean-room result is NOT authoritative — provisional until re-run on the machine that holds the corpus.
# - every cited volume home resolves: V05 §3.16; V06 §2.8, §3.7.6 (5), §3.7.7 (3), §3.19.2 (3)–(5), §3.22 (3), §3.23 (3),
#   (4); V07 §3.5a (4), §5.6 (3); and in the base §3.2 (9), §4.2 S3 (10), §4.3, §4.4, §4.6, §7.1, §7.2, §7.4, §8.4, §10.2
#   (d), (f), §11.3, §4.11 *The clock* (1).
# - no review id (R3-nn, R4-nn, a verifier id) and no deferral wording in any block's new text (R3-02; principle (6));
#   the new text's "later" words are all temporal ("a later trace", "laid later").
# - sweep (R4-01 (2)) of §2 for each changed term: "running Works" (2 sites, both written), "creation week" (1, written),
#   "pre-creation" (2, written), the tick's "week" (1, written), "district a disaster look" (1, written), "layer choices"
#   (1, written), "the layers the view shows" (0), "entered the plan" (1, written), support step (6) and "re-sit" (none
#   else); §2.1's `LayerSpec` sentence, §2.7's condition paragraph and the dossier's staged records already agree.
#
# SIZE (principle (9)): §2.6, §2.7, §2.9 40 021 → 41 121 words (+1 100, +2.7 %): §2.6 +106, §2.7 +954, §2.9 +40 (§2 whole
#  61 970 → 63 070). Removed: the old support step (6) (a re-siting rule R4-09 supersedes, unified into one rule held after
#  generation) and the landfall restatement in (3) (folded). No word removed from content. The growth is R4-09's binding
#  text (the generation pass and the held raised way with its four crossings), the crossing station's support reading and
#  repair, and the bounds and predicates the issues require; a repair round adds no shrink of its own.
