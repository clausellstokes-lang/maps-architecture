# repair-r3-pipeline — lane coherence/repair-pipeline-r3 (unit pipeline: base §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-pipeline-r3; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-c/apply-blocks.py): text before the first block header is
# ignored. Base: docs/ARCHITECTURE.md sha256 4ed292e9… (assemble-r2's output). Each REPLACE body is the live subsection
# with count-asserted substitutions (generator docs/validation/coherence/work/repair-pipeline-r3/gen.py with edits.py;
# every untouched line verbatim; four paragraphs of §10.2 *Crisis looks* rewrapped at 120 columns after their
# substitutions). 11 REPLACE blocks, 0 RULING REQUEST blocks.
#
# PROGRESS
# - P1 brief read whole (28 routed issues: 2 blocker, 10 major, 16 minor as reported); adjudication-r3 read (TOC; R3-01 –
#   R3-03, R3-09 – R3-12, R3-14, R3-15, R3-17, R3-18, R3-22, R3-25, R3-27 whole; Part H · pipeline with its 5 END lines): done
# - P2 issue sources (verify-*-r2t) and the live text read whole: §4.2 S0/S1/S3, §4.3, §4.4 S5a, §4.6, §4.7, §4.8, §4.9,
#   §4.11 *The clock* and `EpochInputs`, §4.13, §10.2 (whole), II.7.2; the homes V01 §3.16, V06 §3.7.6 (5) and §3.22,
#   V07 §5.6, V08 §3.16 (7), V11 §3.25.9: done
# - P3 30 asserted edits over 11 subsections (edits.py): done
# - P4 checks on scratch copies (receipts below): done
# - P5 result file and LANDED: done
#
# DISPOSITIONS (adjudication-r3 Part H · pipeline) — 20 FIX, 8 MERGED, 0 INVALID; every id closed by the edit named
# - VAF-R2T-04 (FIX per R3-14 (1)): §10.2 (d) — `beyondWalls`, `approachRoads` and `approachByGate` take only `campLand`
#   (R3-14's binding bullets); (e)'s cap "at most `densityCap` of `campLand`'s free land". V01 §1b's row is V01's END.
# - VAL-R2-06: MERGED into VV78-r2-05 (closed by its fix).
# - VAL-R2-08: MERGED into VPC-R2-08 (closed by its fix).
# - VAT2-r2-01 (FIX per R3-17; graded MAJOR): §4.11 *The clock* (4) folds an epoch also "at the week of each newly carried
#   calamity that no other epoch falls on (DR28 …; V08 §3.6 (3); J-V8.55)"; the catch-up clause kept, adding "a calamity
#   then riding the coarse epoch that holds its week".
# - VAT2-r2-03 (FIX per R3-18; BLOCKER): §4.11 *The clock* (1) defines the **present at creation** (the dossier's present
#   week, a standalone map's week 0) and the **creation week** (the `generate` event's week: that present, or on a
#   history-first document the replay's start, `W_p − round(52 × start.yearsAgo)`, V06 §3.20.3); the first epoch's `years`
#   and V06's `prevWeek` read the creation week. EP-15 reads "before a week-0 present". The other base uses of "the creation
#   week" in this unit (§4.2 S2's scar sentence, §4.11 *Works* (1) and (9)) already mean the `generate` event's week and
#   stand.
# - VDC2-10: MERGED into VPC-R2-01.
# - VDC2-13 (FIX per R3-22 (a)), closing VPC-R2-16: §4.7 *Custom chains* — "facing its partner's bearing (§7.7 layer 2's
#   *Bearing*; items 77, 85)". VPC-R2-16's "the trade slice's partner bearing, §7.7 layer 2 and DR3" is not written (DR3
#   reads no bearing; R3-22 (a)).
# - VEW-04 (FIX), closing VM-R2T-06: §4.13 EP-22's hill-town fixture adds the plot within `waterTableM` of a wet moat on
#   the slope (the moat's derived level + `freeboardCm`, never its bank top; the full cellar or crypt rung where that level
#   allows); its outcome cell adds "§2.6's water table".
# - VEW-r2-03 (FIX per R3-14 (6)): §10.2 (d) names the **reference point** (no way leaves the built edge: the boundary point
#   closest to the growth centre, S3's root reservation); `approachRoads`, `approachByGate` and `outside` measure from it with
#   no main approach road; (h) and EP-27 add the unserved mesa with a refugee camp and a quarantine standing. V06's and
#   T-ER-27's ends are END lines under V06 and rendering.
# - VEW-r2-05 (FIX per R3-14 (2)): §10.2 (d) — the walls the places read are the **town enceintes** (kinds other than
#   `bailey`; a castle's curtain only along `Castle.cityWeld`; its keep `gatesAndKeep`'s), **outermost** the outer envelope
#   of their walled arcs (for rings not nested, each ring no other encloses); `beyondWalls`, `outside` and `edge` read it;
#   (f) and (h) "no standing town enceinte" (an unwalled town with a castle draws the blockade); no camp, siege line or
#   other part on a building footprint, a siege line broken at an extramural plot's building; EP-27's four fixtures.
#   T-ER-27's fixtures are rendering's END.
# - VKr2-05 (FIX per R3-25 (a)), closing VM-R2T-04: §4.3 — "its two ends are its feet on ground part 0
#   (`RaisedWayRecord.feet`, §2.7)"; §4.6 — "a raised way's feet (§2.7's `RaisedWayRecord.feet`) are ramps or stairs by the
#   same rule, but a foot at a deck end on the arena's outer ring, which draws neither" (R3-25 (a)'s words).
# - VM-R2T-04: MERGED into VKr2-05. VM-R2T-06: MERGED into VEW-04.
# - VPC-R2-01 (FIX per R3-11, R3-09 (d)), closing VDC2-10 and VV56-r2-08: §10.2 (b) is the END text of VPC-R2-03 and
#   VAH-r2-02 (below) — the source word V08 §3.16 (7) (b) gives, `regional_migration_pressure` the refugee camp, the other
#   regional_* pressures `none`, the stressor–condition pairing cited.
# - VPC-R2-04 (FIX; graded MAJOR): §4.4 S5a step 1 — "in a walled stage the arcs a land barrier closes are impassable to
#   routes as the wall is (§4.2 S3 (7)), while an unwalled one's routes cross them where §4.3's class grade limit admits an
#   edge, else F-ROUTE's `unserved` (§4.2 S3 (9) (a))".
# - VPC-R2-08 (FIX; graded MAJOR), closing VAL-R2-08: II.7.2 — "a bank whose stretch of the boundary is empty or lies wholly
#   on water and that holds no candidate drains by gutter and pit, its area reported unsewered".
# - VPC-R2-09 (FIX per R3-10; graded MAJOR), closing VV56-r2-03: §10.2 (f) `disaster` in R3-10's text (each building leaves
#   the look in the week V06 §3.22 (3)'s `crisisLookYields` turns true on it; a building no such Works reaches keeps it until
#   its condition ends; no week draws both on a building).
# - VPC-R2-11 (FIX per R3-15; graded MAJOR): §10.2 *Crisis looks*' lead — until V01's W10 (M5) no disaster district and
#   `affectedQuarter` by households per hectare; until V06's E2 (M6-E) `approachByGate` by nearness to its gate; at the
#   village rungs before V07's step no disaster unit — "a part whose subject is not yet built draws nothing (§16)"
#   ("(R2-36)" written "(§16)", R3-02).
# - VPC-R2-12 (FIX): §10.2's `CrisisLookRow` gains `label: string; icon?: string` (the display cells, V11 §2.3 and V11
#   §3.1's *Display cells*; read by no stage).
# - VPC-R2-14 (FIX per R3-14 (7); graded MAJOR): §10.2 (d) `approachRoads` — the camped ground divided equally among the
#   roads, the dossier's armies whole on one road each in descending size by trade weight (R3-14's binding bullet).
# - VPC-R2-15 (FIX; graded MAJOR): §4.2 S1 (10) — with no `under.systems` cavern row the ore clause reads false and the flag
#   rests on the roster and dossier clauses; its one reader runs only with that layer; §7.6's invalidation by slice
#   re-derives S1 when the row lands.
# - VPC-R2-16: MERGED into VDC2-13.
# - VPC-R2-17 (FIX): §4.2 S0, §4.9 and §10.2 *Seasons* cite "§7.7's DR42"; §4.8 *Condition at generation* "§7.7's DR41".
# - VRC2T-03 (FIX per R3-14 (3)): §10.2 (d) — never on water, a gate's passage or a label's keep-out, and on a way's
#   carriageway only a `barricade` across it, never a camp or any other part; R3-14 (2)'s footprint clause in the same
#   sentence; EP-27's outcome cell carries both.
# - VV56-r2-03: MERGED into VPC-R2-09. VV56-r2-08: MERGED into VPC-R2-01.
# - VV56-r2-07 (FIX per R3-14 (7); graded MAJOR): §10.2 (d) `approachByGate` — `frontierFor(doc, h)`, `h` the households
#   the sequential roster adds between the present population and that population plus the camp's heads.
# - VV78-r2-05 (FIX per R3-14 (4)–(5)), closing VAL-R2-06: §10.2 (c) one count for a share of n units (round(s × n) clamped
#   to [1, n] where s > 0, none where s ≤ 0, at every rung); (d) the village rungs read V07 §5.6 (2), `affectedQuarter` a
#   unit of V07 §5.6 (3); (f) the siege line at VILLAGE and above only; (h) "and no siege line at THORP and HAMLET"; EP-27.
#
# END LINES WRITTEN (Part H · pipeline)
# - END of VEW-r2-01 (model; R3-25 (c)): §4.4 S5a *Outer moats* — "The carve clears no raised-way support: §2.7's support
#   step (6) re-sites one first in the same commit; a stage gate on a raised arterial is a raised gate whose tower carries
#   the deck, the deck itself crossing the channel (no part-0 deck added for it), the part-0 way beneath taking its own
#   ground gate", the old fact kept after it ("Nothing finer than L1 exists yet, so the carve's footprint clears nothing
#   else"); §4.8 *Gates* — a trace across a standing raised way takes its crossing as S7 furniture in the form V06 §3.7.6
#   (5) gives it (a wall opening for an aqueduct; a raised gate for a viaduct or an elevated road, the part-0 way beneath
#   taking its own ground gate), at generation as at an epoch.
# - END of VRC2T-16 (model): §10.2 (g) "The placed camps' and the ring arcs' bounds".
# - END of VV12-r2-02 (V01; R3-14 (1)): §10.2 (d)'s outskirts sentence as given.
# - END of VPC-R2-03 and VAH-r2-02 (V08; R3-09 (d), R3-12): §10.2 (b)'s source sentence as given, its unmapped-word
#   sentence unchanged.
# - END of ADJ-r3-01 (adjudicator; R3-27): §10.2's comment — "ClimateRow (with its ClimateSeasonCells, item 117, and
#   WeatherSpells, item 124) and ClimateSettings" (V11 §2.8 declares both, V11 l. 584–599).
#
# JUDGMENT CALLS (each vetoable; none changes a ruled outcome)
# 1. The footprint clause (R3-14 (2), "no camp, line or part stands on a building footprint (burned farmsteads excepted)"):
#    (f) and §8.2 also draw a disaster's ruins and its districts' tone, quarantine's marked doors, the occupation's and
#    `gatesAndKeep`'s banners, `boom`'s scaffolding and `bust`'s and famine's shutters ON buildings, so the exception names
#    every part (f) draws on the buildings themselves; read literally, "burned farmsteads excepted" would forbid those
#    owner-item parts (item 122 (b)). Camps, the siege line and every other ground part keep off footprints.
# 2. The walls sentence covers "every place below that reads the outermost enceinte" as well as the siege (VEW-r2-05 names
#    `beyondWalls`, `outside` and `edge`); `edge` reads "the outermost town enceinte's walled arcs (the walls above)".
# 3. Two clean-room rewordings (doc_checks C3, run on the result): R3-14's "(the remainder to the roads in trade-weight
#    order)" is written "(the remainder to the roads one each, in trade-weight order)" — the same rule, stated exactly —
#    and §4.8's citation reads "in the form V06 §3.7.6 (5) gives it". Both hits were generic runs, now gone.
# 4. §4.11 (1): `W_p` is defined in place ("`W_p` that present"), and "the first epoch's `prevWeek` and `years`" is written
#    "the first epoch's `years` (above) and V06's `prevWeek`" (the base's `EpochInputs` has no `prevWeek`; V06's
#    `ProductEpochContext` does). §4.11 (4): the calamity clause joins the dash-enclosed "or sooner" clause with ", and"
#    in place of a third dash; its words are VAT2-r2-01's.
# 5. II.7.2 also writes the base side of V04's VEW-r2-04 (FIX at V04 §3.2 N2 this round, no END line named): the field
#    outfall "reached over land", and a bank "whose every stretch cell's path to a field outfall enters a water face first"
#    drains by gutter and pit like the empty-stretch bank — so II.7.2 keeps every no-outfall case its home states and the
#    VPC-R2-08 class cannot recur there (R3-01 (3)).
# 6. §4.4 *Outer moats*: the END sentence is written verbatim; the sentence it replaces held one more fact (no plot or
#    building exists at S5a), kept after it as "Nothing finer than L1 exists yet, so the carve's footprint clears nothing
#    else" (nothing lost).
# 7. VPC-R2-15: the claim's "or in a pack without the cavern row" is written beside "before the underground layer's rows
#    ship"; "§7.6's table-edit invalidation" is cited by its section's own name, *Invalidation by slice*.
#
# HAND-OFFS (for round 4's verifiers; each other end is that unit's END line or FIX this round unless marked new)
# - scope (new, no END line): §13.2 T76-1's cadence clause — "an epoch folds at each 52-week boundary and at a population
#   move past the roster tolerance" — gains "and at the week of a newly carried calamity no other epoch falls on" (§4.11
#   *The clock* (4) now states three triggers).
# - V04 (new, VEW-r2-04's other end): V04 §3.2 N2's field path over land and its every-path-wet case agree with II.7.2.
# - model: §2.7's support step (6) (VEW-r2-01), which §4.4 *Outer moats* and §4.8 *Gates* cite; §2.9's camp framing
#   (VRC2T-16).
# - V01: `campLand`'s gloss (VV12-r2-02) and §1b's row (END of VAF-R2T-04); V01 §3.16's closing sentence (END of VPC-R2-09).
# - V06: §3.22 (2) d.'s no-road answer (END of VEW-r2-03); §3.3.1's cadence citation (VAT2-r2-02); l. 409 and §3.20.3's
#   creation week (VAT2-r2-04).
# - V08: §3.16 (7) (b)'s calamity source and the stressor–condition pairing (VPC-R2-03, VAH-r2-02), which §10.2 (b) cites.
# - determinism: DR44's map-row clause (VPC-R2-02, R3-11).
# - rendering: T-ER-27's fixtures (ENDs of VEW-r2-03, VEW-r2-05); §8.2's placement sentence and `blockade` cell (VRC2T-02);
#   §8.2's disaster end (VV56-r2-02, R3-10).
#
# RECEIPTS (scratch copies; the live files untouched)
# - Dry run, apply-blocks.py on docs/ARCHITECTURE.md (sha256 4ed292e9…) with this file alone: 11 blocks found, 11 applied,
#   0 skipped; audit 0 not OK; headings 153 → 153; fences balanced (140 → 140); title block unchanged; rationale unchanged;
#   document 22 470 → 22 523 lines. With repair-r3-determinism.md (landed): 16 blocks found, 16 applied, audit 0 not OK.
# - doc_checks on the result, sections 4.2, 4.3, 4.4, 4.6, 4.7, 4.8, 4.9, 4.11, 4.13, 10.2, II.7.2: exit 0 — C1 5/0, C2 1/0,
#   C3 209/0 unreviewed, C4 1/0, S1 0, S2 219/0 — PROVISIONAL: the tool warns the reference corpus is incomplete here
#   (captures, research/patreon, research/devlogs, research/ftg-docs, research/external absent), so the clean-room result is
#   not authoritative.
# - References (assemble-r2's refs.py on a mirror of the set with the result): base 17 645 resolved, 0 broken (live 17 613,
#   0 broken).
# - Words (principle (9)): the unit — base §4, §10, PART II, PART III — 113 622 → 114 790 (+1 168, +1.0 %), all owner-item
#   and ruled content (the camp places, the walls a siege reads, the clock's two weeks and cadence trigger, the raised gate,
#   the pre-landing outcomes); nothing removed but the restated feet and the superseded texts the rulings replace.
