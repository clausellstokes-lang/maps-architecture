# repair-r4-pipeline — lane coherence/repair-pipeline-r4 (unit pipeline: base §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-pipeline-r4; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-c/apply-blocks.py): text before the first block header is
# ignored. Base: docs/ARCHITECTURE.md sha256 593c657d… (assemble-r3's output); rationale e7b59eac… . Each REPLACE body is
# the live subsection with count-asserted substitutions (generator docs/validation/coherence/work/repair-pipeline-r4/gen.py
# with edits.py; every untouched line verbatim). 8 blocks: 7 REPLACE (§4.1, §4.3, §4.4, §4.8, §4.11, §4.13, §10.2) and
# 1 RATIONALE-A (J-A81.41 restated; see NOTE FOR ASSEMBLE). 0 RULING REQUEST blocks.
#
# PROGRESS
# - P1 brief read whole (15 routed issues: 1 blocker, 8 major, 6 minor as reported); adjudication-r4 read (TOC; R4-01,
#   R4-04, R4-06, R4-08, R4-09, R4-13 whole; R3-01 – R3-03; Part H · pipeline with its 5 END lines): done
# - P2 issue sources (round4-work/pipeline.json, the verifiers' claims) and the live text read whole: §4.1's transactions
#   table, §4.3, §4.4, §4.6's strip and feet, §4.8, §4.11 (*The one built path*, the carve, *The clock*, *The rung at an
#   epoch*, `EpochInputs`), §4.13, §10.2 *Crisis looks* (whole); the homes §2.7's support step, §3.2 (9), V01 §3.17.3 (3),
#   V06 §3.22 (2)–(3), V07 §5.6 (3), V08 §3.6 (3) and its edge row; rationale J-A81.41: done
# - P3 29 asserted edits over 7 subsections (edits.py) and one restated Part A row (extra-blocks.md): done
# - P4 checks on scratch copies (checks.sh; receipts below): done
# - P5 result file and LANDED: done
#
# DISPOSITIONS (adjudication-r4 Part H · pipeline) — 12 FIX, 3 MERGED, 0 INVALID; every id closed by the edit named
# - VAT3-r3-01 (FIX per R4-08): §4.11 *The clock* (4) — the calamity trigger reads "each newly carried calamity dated after
#   the last epoch's week that no other epoch falls on", and R4-08's text follows the catch-up clause: a calamity dated at
#   or before the last epoch's week rides the first epoch the absorb folds (with none, one at the absorb's week), its
#   `EpochInputs.events` entry at that epoch's first week, its tick kept; with the absorb's week before the last epoch's,
#   no epoch, its changes applied finished, noted. V08's end and T76-1's fixture are V08's END and scope's text.
# - VEW-r3-01 (FIX per R4-09; BLOCKER): §4.3 *Lattice and costs* — "A standing raised way's support rings, ramps, stairs
#   and feet … and the under-deck strips of its `vault` spans are impassable to every route and growth proposal on ground
#   part 0" once generation has ended (and at generation where it is locked or pinned, model (6) (a)'s lock clause); the
#   rest of the strip crossed only under an `open` span of clear width ≥ the way's width + `raisedWays.structure.clearWidthM`,
#   soffit meeting §2.7's *The clearance*, within ± `raisedWays.structure.squareDeg` of square (V11 §3.24.2), never along
#   the strip; the crossing shifts to the nearest such span, else F-ROUTE's ladder. Equivalence (principle (9)): V01
#   §3.17.3 (3)'s rule — the way's width + `clearWidthM`, the clearance (held, else the class's), ± `squareDeg`, never along
#   the strip, never through a pier — stated here unchanged; V01's own ladders (F-TEMPLATE rungs 1–2, §4.6's for a lane)
#   stay V01's; its cells move to V11 (END under V11), V01 cites §4.3 (END under V01). §4.4 S5c's legality: a proposal
#   meeting what §4.3 makes impassable, or the strip anywhere else than a crossing §4.3 admits, is deflected along the strip
#   to the nearest admitted crossing or ends there as at a reservation.
# - VKr3-01 (FIX): §4.11 *The rung at an epoch* — "an L0 batch replacing the `margin` chain (on part 0 two, a raised way's
#   ring-end foot moved between them, §3.2 (9))" and the raised parts' re-derivation "on each raised part of the ground
#   layer §3.2 (9) grows, its raised way's re-derivation (§3.4) for that part's cleared faces, which also extends a deck
#   ending on the old ring to the new ring and re-places both ends of that foot (§2.7 `RaisedFoot`)"; rationale J-A81.41's
#   Part A entry "an L0 batch that replaces the margin chain (on part 0 two where a raised way's foot lies at a deck end on
#   the old ring)" (RATIONALE-A, restated; its index row unchanged).
# - VM-R3T-04 (FIX per R4-09, amended — no walk of boundary nodes): §4.4 S5a *Outer moats* reads R4-09's sentence: "The
#   carve clears no raised-way support: §2.7's support step (6) (a) re-sites one first in the same commit, and where a
#   crossing's spans or piers cannot keep their bounds, or the berm or channel would meet a ramp, a stair or a foot, the
#   berm and channel stop at the under-deck strip's edges, reported (`W_RAISED_CROSSING`)". Its fixture is scope's T110-2 (1).
# - VM-R3T-08 (FIX): §4.8 *Condition at generation* — "a `breached` draw on the band's stretch under a raised way's crossing
#   station read as `worn` while its deck stands (§2.7's support step (3))", joined to the clause before it by a comma (the
#   dash form would have nested inside the castle clause's open dash; content as required).
# - VM-R3T-10 (FIX): §10.2 (g) "(§2.9's *The crisis framing*; …".
# - VPC-R3-02 (FIX per R4-04 (d)): §10.2 *Crisis looks*' lead — until V06's E2 (M6-E) a building leaves the `disaster` look
#   by the yield read directly over the base's records (`Building.works`, §2.6; the lifecycle's weeks once a record
#   retires, §4.11 *Works* (9)) — V06 §3.22 (3)'s rule, never for a preview — so §8.2's `ruinTone`, the buildings' damage and
#   V09's rows (R4-04 (d)'s third reader) read one answer from the look's first milestone. The base citations stand before
#   the volume's in the sentence so the reference checker reads §2.6 as the base's (no new ambiguous form); "the yield" is
#   V06 §3.22 (3)'s own word (the retired-term pattern `hand-over` belongs to the sky unit-run view).
# - VPC-R3-03 (FIX per R4-06; closes VAL-R3-07): §10.2 (d) — "on a way's carriageway only a barrier across it — a
#   `barricade` (…), `beast`'s `stakes` where the edge crosses a way, and the quarantine's `cordon` where it crosses a way
#   into its quarter; item 122 (b) — never a camp or any other part"; (f) `quarantine` — "a cordon closing the
#   `affectedQuarter` — along its boundary on the quarter's side of each bounding way's corridor, across each way that
#   enters it"; EP-27's cell "a carriageway holding only a barrier across it (§10.2 (d))". §8.2's and T-ER-27's ends are
#   rendering's END lines; V07 §5.6 (7) stands as written.
# - VPC-R3-06 (FIX): §4.8 *Gates* — "taking its own ground gate (§4.4 *Outer moats*) by §4.2 S3 (4)'s gate law" (both homes
#   cited as required; the order avoids a doc_checks C3 section-pointer false positive that "(§4.2 S3 (4); §4.4" raised).
# - VV12-r3-05 (FIX per R4-04; closes VPC-R3-07 and VAL-R3-08): §10.2 (d) `approachRoads` "(V01 §3.16's `campLand` (2))";
#   `neighbourhoods` "at THORP, HAMLET and VILLAGE V07 §5.6 (3)'s units (`villageDisasterUnits`: its ends, or an end-less
#   thorp's toft groups). Every building of a returned unit — a district's, or one on a returned unit's plots
#   (`villageUnitPlots`) — draws item 123's damage … while the look stands over it ((f))", the rest as it stood.
#   VAL-R3-08's model end is closed by the model's VM-R3T-07 (R4-04).
# - VV56-r3-03 (FIX): §10.2 (d) `approachByGate` — `h` "at least 1, so a camp smaller than one household is seated where
#   the next household would be"; (h) and EP-27 add the case (a refugee camp of two heads). T-ER-27's fixture is rendering's
#   END line.
# - VV1112-r3-02 (FIX per R4-13): §10.2 (c) — "; the `neighbourhoods` place then draws at least every matched target
#   (max(k, |`matched`|), k that count) and, by fire, stops where its order ends, the shortfall reported (V01 §3.16 (5))".
# - VAL-R3-07: MERGED into VPC-R3-03. VAL-R3-08: MERGED into VV12-r3-05. VPC-R3-07: MERGED into VV12-r3-05.
#
# END LINES WRITTEN (Part H · pipeline, as given)
# - VEL3-r3-01 (V06): §4.11's delta demand "— prefix-stable, read over the households the town holds where a fall held one
#   (V06 §3.5.1 (1)) — so no survivor's use is withdrawn by arithmetic".
# - VAL-R3-02 (model): §4.13's combination row `wall` × raised way, verbatim.
# - VEW-r3-02 (model): §4.3 *The slot* and §4.8's lead, "after S7's batches and before S7b, §2.7's support step runs once
#   more on every raised way, its keys kept (§2.7's support step (5), (6) (a))".
# - VEW-r3-05 (model): §4.8 *Gates*' parenthesis, verbatim.
# - R4-09's sweep: §4.11's carve, "a support the channel meets is re-sited at generation by §2.7's support step (6) (a);
#   after generation the channel passes under an `open` span, its course bent at the dry run (§2.7's support step (6) (b))".
#
# THE SEAT'S OWN SWEEP (R4-01 (2)) — restatements in this unit of what R4-04, R4-06, R4-08, R4-09 and R4-13 change,
# conformed in the same blocks
# - §4.1's transactions table, S7's row: the support step's last run after the last enceinte's batches, an S7 part a
#   station that can be neither slid nor omitted meets cut round its ring or ended at it in one L1 batch (R4-09 (6) (a);
#   the S7 parts are L1 geometry, the supports point attributes of the raised way's record).
# - §4.3: the generation half of the crossing rule — before the span rule has run, a later stage's way keeps off an
#   unlocked raised way's ramps, stairs and feet and crosses its strip only where the soffit meets *The clearance*, the
#   last run sliding the supports (R4-09 (6) (a) re-sites supports only; ramps, stairs and feet never move and no span has a
#   `use` yet, so without it a later stage's street could run through a ramp — VEW-r3-01's class at generation).
# - §4.4 S5a *Outer moats*: an epoch stage's trace and moat (S5a runs at every epoch) across a standing raised way, or a
#   locked or pinned one at generation, by (6) (b) (iii) — the trace through the station nearest where it would cross, the
#   berm and channel under `open` spans only, else stopped alike — where "(6) (a)" alone would have re-sited it.
# - §4.13's combination row `river, coast, moat` × raised way: "and one laid after the course stopped at the under-deck
#   strip where it cannot pass under the deck, the course kept (§2.7's support step (6); `W_RAISED_CROSSING`)" — the row's
#   "drops a generated course (`raised_too_long`)" now reads only for a moat standing before the course (R4-09: no
#   generated course is dropped for a later stage).
# - §10.2 (f) `disaster`: the base's statement of R4-04 (b)'s phrase — the look **stands over** a building of one of its
#   units until `crisisLookYields` turns true on it ("by the view's week, unless finished before the overlay's
#   `sinceWeek`"), a preview never handing over (rendering's §8.6 now cites "(f)'s hand-over").
# - Checked and unchanged: §4.3 *Where it may not go* and the `square or reservation`, `plots and buildings` cells (no
#   support on a square, the strip S8's hole — true under (b)); §4.6's hole (the under-deck strip covers the ramps, the
#   first and last spans running from the feet); II.7.6's arch vaults ("following its raised way at every rung", V04's
#   reconcile its mechanism); §10.2's other `district` uses (base rungs only; the village rungs read V07 §5.6 (2)–(3) by
#   (d)'s lead); EP-27's other fixtures; the creation-week uses of §4.11 (R4-07's sweep: no END here).
#
# HAND-OFFS (for round 5's verifiers; new — no END line names them)
# 1. model, §2.7's support step (6) (a): the run after S7 names a give-way only for an S7 part a kept station meets
#    ("a strip, plaza or square cut round its ring, a quay, pier, mole or castle path …"); a station that can be neither
#    slid nor omitted meeting an S5b or S5c way (not an S7 part) has no stated outcome. §4.3 now keeps the later stages'
#    ways off ramps, stairs and feet at generation; the pier case is (6) (a)'s to close (e.g. the way bent round the
#    ring, or the station's support taking the next lawful slide past `slideMaxFactor`, reported).
# 2. model, §2.7's support step (6) (a): may cite §4.3 for the generation half of the crossing rule written there (ramps,
#    stairs and feet; the clearance before the span rule has run).
# 3. V01 §3.17.3 (3) cites §4.3 (V01's END this round) — its F-TEMPLATE rungs 1–2 and §4.6's lane ladder stay V01's.
#
# NOTE FOR ASSEMBLE (one restated decision; assemble-r1's swap rule, script
# docs/validation/coherence/work/repair-pipeline-r4/swap_restated.py)
#  The RATIONALE-A block's row restates J-A81.41's Part A entry (its judgment-index row is unchanged). After every block
#  file is applied, run
#    python3 docs/validation/coherence/work/repair-pipeline-r4/swap_restated.py RATIONALE_IN RATIONALE_OUT
#  — the appended row takes the older row's place (rationale l. 639 on the live file) and the older row is deleted; it
#  stops unless J-A81.41 occurs exactly twice in Part A. Independent of any other seat's swap (no other round-4 file
#  names J-A81.41).
#
# RECEIPTS (scratch copies; the live files untouched; docs/validation/coherence/work/repair-pipeline-r4/checks.sh)
# - Dry run, apply-blocks.py on docs/ARCHITECTURE.md (sha256 593c657d…) and the rationale (e7b59eac…) with this file
#   alone: 8 blocks found, 8 applied, 0 skipped; audit 0 not OK; headings 153 → 153; fences balanced (140 → 140); title
#   block unchanged; document 22 731 → 22 788 lines. Then the swap: J-A81.41 l. 639 ← l. 852; Part A 805 rows, 0
#   duplicates; index 805 = Part A 805, one id set.
# - Combined dry run with the round-4 base files present (model, determinism, scope, rendering) and this one: 33 blocks
#   found, 33 applied, 0 skipped, audit 0 not OK (no heading shared with another seat).
# - Table rows changed (§4.1's S7 row; §4.13's EP-27, `river, coast, moat`, `wall`): column counts unchanged (4, 6, 6, 6).
# - doc_checks on the result, sections 4.1, 4.3, 4.4, 4.8, 4.11, 4.13, 10.2: exit 0 — C1 5/0, C2 1/0, C3 93/0
#   unreviewed, C4 0/0, S1 0/0, S2 254/0 — PROVISIONAL: the tool warns the reference corpus is incomplete here (captures,
#   research/patreon, research/devlogs, research/ftg-docs, research/external absent), so the clean-room result is not
#   authoritative. (Live, same sections: C3 93/0, S2 251/0.)
# - References (assemble-r3's refs.py on a mirror of the set with the result): base 17 974 resolved, 0 broken, ambiguous
#   13 → 13 (live 17 939 resolved, 0 broken); volumes unchanged.
# - Scans of the 93 changed lines (scan.py): canon's 35 retired-term patterns 0; deferral wording 0; review ids in design
#   text 0; phone 0; vague wording 0.
# - Words (principle (9)): the unit — base §4, §10, PART II, PART III — 114 795 → 115 854 (+1 059, +0.9 %), all ruled
#   content: R4-09's crossing rule and its generation half, S5a's stop rung and epoch case, the support step's last run at
#   its three statements (§4.1, §4.3, §4.8); R4-08's late calamity; R4-04's look units and hand-over predicate; R4-06's
#   barriers and the cordon's course; R4-13's count; VKr3-01's raised parts at a frame growth. Nothing removed but the
#   superseded texts the rulings replace; no shrink source applies to an addition of this kind.
