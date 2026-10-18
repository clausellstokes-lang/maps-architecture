# verify-model-r6t — lane coherence/verify-model-r6t (base part §2 domain model, after repair round 6 / assemble-r6)

PROGRESS
- P0 brief read whole (incl. ROUND-6 NOTES, ORCHESTRATION NOTES); round-5 findings VM-R5T-01 – 03 read; adjudication-r6
  head, R6-01, R6-02 (whole, with Part P's amendments), R6-03, R6-10, Part H · model and · pipeline read: done
- P1 repair-r6-model.md and assemble-r6.md (model) read; §2 diff pre/post assemble-r6 (8 hunks): done
- P2 round-5 findings VM-R5T-01 – 03 re-checked against the live text, each END line's second end: done (3/3 closed)
- P3 round-6 §2 blocks re-checked whole subsection by subsection for new problems (R6-02's binding texts word by word,
  the two tables cell by cell, every citation of them in the set): done (4 new findings)
- P4 checks (doc_checks --sections 2, references, ids, narration, sizes), report, result file, LANDED: done

## 0. Basis

* Live base `docs/ARCHITECTURE.md` sha256 `f39f1c30126976c0…` = assemble-r6's recorded output (assemble-r6.md §1). The
  pre-round base is commit `b3f83a0`'s blob, sha256 `2d84eac2d8a379d1…` (assemble-r5's output). No design file written
  by this seat.
* Binding: adjudication-r6.md — R6-01; R6-02 whole as Part P amends it (the crossing table, the way-and-channel table,
  (M1)–(M11), behaviour changes 1–8, the attack, the equivalence, every End); R6-03; R6-10; Part H · model (9 issues,
  2 END lines) and · pipeline (VM-R5T-01, VM-R5T-03); Part P (19 decisions, four exceptions). The earlier adjudication
  files where not superseded by name (R5-02 superseded but what R6-02 restates as standing). Round-5 findings:
  verify-model-r5t.md / results/coherence_verify-model-r5t.json. The repair: repair-r6-model.md (3 REPLACE blocks,
  §2.1, §2.7, §2.9; 8 fixed, 1 merged; 2 END lines; 6 declared differences from R6-02's words; 2 hand-offs).
* §2 diff (scratch `vm6/d2.diff`, word diff `vm6/wd.diff`): 8 hunks — §2.1's wording rule (l. 556); §2.7 `supports`
  comment (l. 2292), `RaisedFoot` comment (l. 2317–2318), *An enceinte's condition by run* (the held-stretch sentence
  removed, l. 2504–2523 re-wrapped), the support step (3) (l. 2537–2556), (6) and (7) (l. 2557–2724), the span rule's
  (2) and last sentence (l. 2734–2748); §2.9's `EpochRecord` comment (l. 3239). No other §2 line moved.

## 1. Round-5 findings re-checked (ROUND-6 NOTES (2))

| id | r5 grade | Part H disposition | verdict | where (live) |
|---|---|---|---|---|
| VM-R5T-01 | major | FIX per R6-02, amended (pipeline): the strips are no longer stopped at all | **FIXED as ruled** — no "strips stopped / stop / stopping" wording survives in the base or any volume. §4.8's lead (P6, l. 7692: "the strips and band as anywhere"), §4.1's S7 row (P1, l. 5051), §4.13's `wall` cell (P11, l. 9060), §4.4 S5a *Outer moats* (P3, l. 5989); ends: §7.3's S7 row (D10, l. 10927), V06 W68 and §3.7.1 (V6-1, V6-6; V06 l. 351, 1465), V11 §3.24.2 (V11-1; V11 l. 3908). VPC-R5-01 closed with it | §4.8 l. 7692 |
| VM-R5T-02 | major | FIX per R6-02 (model): the station and its every life step are gone | **FIXED as ruled** — (M2) (3)'s crossing (l. 2548–2551) and "(4) each pier's `ring`"; (M3) the `supports` comment ends "§4.11)" (l. 2292); (M4) the held-stretch sentence gone from *An enceinte's condition by run*; (M8) (6)'s closing paragraph gone, its last sentence standing (l. 2712). Determinism END (D1), (D3), (D4), (D6), (D9): §5.3's way-and-trace row, §5.4's `warnings` comment (l. 9332), §7.1's aqueduct sentence (l. 10486), `bend.wall.held` deleted (0 hits set-wide), the catch-all (l. 10676). "crossing station", "raised gate", "wall opening" (in this sense), "held stretch", "wall arch": 0 hits in the base, the rationale and the volumes | §2.7 l. 2548, 2712 |
| VM-R5T-03 | major | FIX per R6-02 (pipeline): the case is removed | **CLOSED by the ruling** — §4.8 *Gates* (P8, l. 7729–7742): "Main gates are where S4's and S5b's arterials cross the trace on ground part 0 — a deck passing over a trace is no crossing (§2.7's crossing table)"; "each outer enceinte's gates are its S5b primaries' crossings on ground part 0"; "A raised way and a trace meet by §2.7's crossing table: no station, gate or opening on a deck." The gate-plaza sentence stands, every main gate being on ground part 0; V01 §3.17.3 (6) (V1-3) agrees | §4.8 l. 7729 |

Part H · model's other rows checked as §2 text: VAL-R5-01 (no held-stretch clause; W9 *unchanged meeting*), VAL-R5-02
(*A `vault` span under the wall*), VAT5-r5-02 ((7) and `RaisedFoot`, (M9)–(M10); its pipeline end (P10) at §4.11 and
scope end (S2) in T110-2's frame clause), VEW-r5-02 and VV56-r5-02 (the band laid through, *The cap* from standing parts),
VEW-r5-03 ((M1): the band an obstacle whatever its condition; C11), VEW-r5-04 (W3), VRC5T-01 (*The cap*, CityJSON named).
END lines under Part H · model written verbatim: §2.9's `EpochRecord` comment "the greatest week the folded events
carry" (agrees with §4.11 *The clock* (1), l. 8510); §2.1's wording rule "— trees and pins switched by
`StyleSheet.groups` (§8.2)" (the field at §8.2 l. 12601).

## 2. Round-6 blocks in §2 re-checked

* **R6-02's binding texts against the live text.** A word-level comparison of R6-02's four outcomes, the *What beneath
  reads* paragraph, the table note and rows W1–W13 (adjudication-r6 l. 340–456) with the live (d) (l. 2594–2710), and of
  the way-and-channel table (l. 460–474) with the live (a)–(b) (l. 2572–2586), "(amended, PRB6-nn)" markers stripped
  (scratch `vm6/cmp.py`), finds only the repair's declared differences: "one that cannot is re-routed" (the missing
  verb), "(the span rule never reads a wall: its step (2), below)" for "(M11)", and "Rows W12 and W13 are added" left
  out (narration). (M1)–(M11) are present verbatim (M11's dash joined by a comma, declared difference 5); the two names
  are defined at their home ("**the way-and-channel table**", "**the crossing table**", declared difference 1).
* **Every citation of the two tables across the set** (117, scratch `vm6/cites.txt`) names an outcome, a row, a column
  or a cell that exists (*over the band*, *down before the wall*, *beneath*, *unchanged meeting*; rows a–e, W12, W13;
  W1·C6, W1·C12, W2·C12; C12). No lettered "(6) (a)–(e)" citation of the old sub-items survives outside §2.7; the two
  hand-offs repair-r6-model names (§4.3 l. 5743, V11 l. 3962) now cite the way-and-channel table.
* **No restatement in §2** of the tables outside (6): (3)'s crossing clause and obstacle list are (M1)–(M2) as ruled;
  the span rule's last sentence was conformed by the repair's sweep ("but one under a wall, read `open`").
* **The cells (round-6 note (6) (b) (i)).** Each of the 13 × 13 cells gives one outcome. Every test a cell names
  exists (T110-2 (1)–(8) and its frame clause, T110-3, T114-3 and its landfall clause, T-V4-63, T-V5-14, T-V6-11,
  T-V6-47, T-V6-73, T-V7-48 and its clauses, T-V9-52). Three cells name a test that does not run their case:
  W3·C3–C6 and W7·C2's arch vault (**VM-R6T-02**), W11·C2's arch vault (**VM-R6T-03**).
* **R6-03 and R6-10 in §2.** No held late calamity anywhere in §2 (`lateCalamities` and "held in the binding": 0 hits
  set-wide); the two END lines are written (§1).
* **New problems** — §3: one undefined edge in the crossing table (a water gate or an anchor tower in an under-deck
  strip), the two test gaps above, and one ambiguous antecedent in (3).

## 3. New findings (round 6)

### VM-R6T-01 — major — EDGE-UNDEFINED — owner model

**Claim.** The crossing table's *beneath* (l. 2645–2653) bars every gate and tower from an under-deck strip and says how
each one moves: "one the wall's law would place there moves to the nearest point clear of it: a tower along the trace
…; a gate along its way, the trace passing through it there … or along the trace where the way is laid after the gate
and follows it". Two gates and towers that the wall's law fixes in place fit neither clause:
* **a river's water gate.** The trace "never crosses water except at a water gate where a river passes", its two bank
  vertices named by `Gate.banks` (§4.4 S5a *Water and the waterfront*, l. 5963–5967; §2.7 `Gate.banks`). A water gate
  has no way to move along (`way` null), and moving it along the trace would leave the trace crossing the river without
  a gate.
* **the tower at an anchor.** g item 106 (a) puts "a tower at each anchor" (§4.8 *Towers*: "and at every barrier anchor
  (item 106 (a))"; `Enceinte.anchors`, "a tower at each"). Moving it along the trace would leave the anchor bare, and
  the smoothing step never moves an anchor (§4.4 S5a (3)).

Both cases are reachable on a normal CITY site. A stage-2 ring (S5a) laid after an S4 viaduct that spans a river can
cross that river, or end on its bank, inside the viaduct's under-deck strip: the pull treats only ramps, stairs, feet
and an aqueduct's supports as impassable (*beneath*; §4.4 S5a *Trace* (2)), and nothing keeps a river crossing or an
anchor out of the strip. The same holds for an aqueduct laid at S6's end across S3's trace near an anchor. *Over the
band* keeps the aqueduct's under-deck strip clear of "the trace's gates and towers", but S7 lays the towers after S6,
and the text moves only "a tower its spacing would place in the strip".

So two builders can build different walls here. One leaves the water gate and its gatehouse under the deck, contrary to
"no gate … in the under-deck strip" and to W6's premise. Another bends the trace to cross the river outside the strip.
At an anchor, one moves the tower along the trace and leaves the anchor without its tower, against item 106 (a). Another
moves the anchor along the barrier. §4.8's lead narrows the rule further: "(one the spacing or the gate law would place
there moved clear of it)". No bar runs either case: T110-2 (3)'s ring meets no river, and none of its fixtures anchors
inside a strip.

**Required change.** §2.7's crossing table, *beneath*, *No gate and no tower in the under-deck strip*. After "… (a
village track, V07 §3.5a (4))" add: "; a gate or tower whose place the trace fixes — a river's water gate (where the
trace crosses the river, `Gate.banks`) and the tower at a stretch's anchor (`Enceinte.anchors`; item 106 (a): a tower at
each anchor) — moves with the trace: the trace's crossing of the river, or its anchor on the barrier, is moved along the
river or the barrier to the nearest point clear of the strip — a trace laid by the pull or cost field treating the
river's water and the barrier's edge inside an under-deck strip as no crossing or anchor site, a stretch laid by
neither bent locally there (by hand a fate named in `bend.wall.raisedCrossing`'s line)".

In *over the band*, change "its under-deck strip keeps clear of the trace's gates and towers" to "its under-deck strip
keeps clear of the trace's gates, towers and anchors".

Pipeline end: in §4.8's lead, change "(one the spacing or the gate law would place there moved clear of it)" to "(one
the wall's law would place there moved clear of it, a water gate's river crossing or an anchor with it; §2.7's crossing
table, *beneath*)".

Scope end: T110-2 (3) adds "and a stage-2 ring whose boundary crosses the river under an S4 viaduct's span and, on a
second run, is anchored on that river's bank inside its under-deck strip — the river crossing with its water gate, and
the anchor with its tower, moved along the river clear of the strip, the trace laid to them, 0 gates or towers in the
under-deck strip".

The adjudicator may rule another outcome — for example, a water gate lawful under a span whose soffit clears its
gatehouse, capped like the run. Whatever is ruled, each case needs one outcome, item 106 (a)'s tower at each anchor must
hold, and a bar must run it.

### VM-R6T-02 — major — EDGE-UNTESTED — owner scope

**Claim.** The crossing table names tests for cells whose case those tests never run:
* **W3·C3–C6** (l. 2700). Under a regeneration that re-derives a ring under a held raised way whose span fell, whose
  support was cleared or toppled, or whose `vault` span was breached, each cell reads "*beneath* as read · T110-2 (6)".
  T110-2 (6) (l. 18598–18607) regenerates only standing raised ways: (1)'s aqueduct, locked, and (3)'s viaduct, locked.
  The fallen-part readings are run only on the epoch path (T110-2 (7) and T-V6-47, through V06 §3.7.4 (2)'s cost
  field). So the generation path is never run where it reads `state`. That path is S5a's pull (§4.4 S5a *Trace* (2)):
  a `cleared` ring is open ground, and a `ruined` aqueduct support is impassable. The same holds for S10's band built
  whole across a cleared footprint. A build whose pull ignores `state` passes every bar.
* **W7·C2** (l. 2704). This cell's outcome includes "V04 lays again an arch vault the old wall stood over · T110-2 (8),
  T-V6-47". Neither T110-2 (8) (l. 18615–18618) nor T-V6-47's `wallToWay` clause (V06 l. 4170) has a `vault` span under
  the ring. T-V4-63 runs the re-lay for a hand delete only. A `wallToWay` that leaves the chamber unlaid, or lays it
  under the new ring road's corridor, passes every bar. That is the case where the re-laid vault makes the `vault`
  span's strip impassable again and row (c)'s re-route must avoid it.

R6-01's grading: an edge the text defines but that no bar runs, so that a wrong build passes every bar, is MAJOR.

**Required change.** T110-2 (6) adds: "and (1)'s c15 fixture with its locked aqueduct's span over the band `ruined`,
a support by the band `cleared` and a `vault` span over the trace breached by scripted `DeclineOp`s, regenerated
(keep) — the ring re-derived on its old trace at its own top beneath the fallen span, the trace through the cleared
ring as open ground and the band whole across its footprint, no chamber under the wall, every station, key, span and
state of the aqueduct unchanged (§2.7's crossing table, W3·C3–C6)".

T110-2 (8) adds: "with (3)'s viaduct holding a `vault` span under the ring — after `wallToWay` its arch vault laid
again with the same id (V04 §3.5.4 (d)), the ring road crossing the under-deck strip clear of that span's strip
(§2.7's way-and-channel table, row c; W7·C2)".

### VM-R6T-03 — minor — BROKEN-REFERENCE — owner model

**Claim.** The crossing table's W11·C2 (l. 2708) reads "*unchanged meeting*: the run (its band, towers, gates) removed,
the raised way untouched; V04 lays again an arch vault the run stood over · T110-2 (4)". T110-2 (4)'s delete case (l.
18574–18575: "a hand `delete` of a run beneath a standing viaduct — the viaduct unchanged, no bend, the run back on its
undo") holds no `vault` span. The vault re-lay on a delete is run by T-V4-63 ("the hand wall's delete laying it again
with the same id"), which the cell does not name.

**Required change.** W11·C2's test "· T110-2 (4)" → "· T110-2 (4), T-V4-63".

### VM-R6T-04 — minor — NEW-PROBLEM — owner model

**Claim.** The support step (3) bounds a slid station by "both neighbouring spans stay ≤
`raisedWays.structure.slideMaxFactor` × the band's upper bound" (l. 2541). (M1) made the obstacle list just before it
read "an enceinte's band (`Enceinte.band`, or before S10 has built it the band beside the standing trace, its
half-widths …)" (l. 2537–2539). So the nearest "band" is now the wall's band, which has half-widths and no upper bound.
The bound meant is (1)'s `pierSpacingM` band (l. 2532), as V11 §2.8c's comment on `slideMaxFactor` says: "× the
`pierSpacingM` band's upper bound" (V11 l. 717).

**Required change.** (3): "× the band's upper bound" → "× the `pierSpacingM` band's upper bound ((1))".

### Considered and not raised

* The C7 cells "no meeting · —": the event meets no raised way, and the wall op's own tests run it.
* W4's cells C3–C13 cite T114-3, which runs C2: the op reads nothing of the raised way (*unchanged meeting*), so one
  state runs the mechanism.
* A frame growth's extension over a standing gate or tower cannot occur. Inside the old frame the course and strip are
  unchanged, and the gates and towers were moved clear when the band was laid. Beyond it the land is new.
* §5.4's `warnings` comment names S5a's and S7's `W_RAISED_CROSSING` but not VS3's or S3's at a regeneration (row W1,
  row (e)). The list is open (it names none of V07's own codes), so it is not a finding.
* The bullet label "(a)–(b)" over a table whose rows run (a)–(e): the ruling's wording, and every citation names the
  table and its row, so no builder builds differently.
* (6)'s lead "everything laid after the raised way gives way to it" against *beneath*'s band laid through a road
  deck's support: (d) is the specific rule, and attack 1 (a ring is a point attribute) holds.
* V06 §3.7.4 (2)'s cost field treats every standing support as impassable, the generation pull only an aqueduct's. Both
  lie within *beneath*'s lawful outcomes ("under a span or at a support"), and the parenthesis says so.
* R6-02's behaviour changes 1–8 differ from the earlier design by ruling, and are the owner's to veto (round-6 note (6)
  (d)). The text builds each of them one way.
* A river re-coursed by hand or by an epoch's `shiftCourse` under a standing raised way is named in neither table's
  rows. That gap predates this round (the replaced (6) (b) named only moats and carves), and the repair neither made
  nor touched it. It is left to the edge sweep, under the brief's rule that ids outside the round keep their verdict.

## 4. Checks

* `doc_checks.py --sections 2` on the live base exits 0 — C1 5/0, C2 1/0, C3 408/0 unreviewed, C4 1/0, S1 0/0, S2
  298/0 (every § pointer resolves). On the pre-round base: C3 397/0, S2 287/0. **PROVISIONAL**: the tool warns that the
  reference corpus is INCOMPLETE in this checkout (captures, research/patreon, research/devlogs, research/ftg-docs and
  research/external are absent), so the clean-room result is not authoritative until re-run where the corpus is held.
* Homes the new §2 text cites resolve. Base: §4.2 S3 (10), §4.3 *Where it may not go* and *Lattice and costs*, §4.4
  S5a *Trace* (2) and *Outer moats*, §4.4 S5b, §4.6, §4.7 S10 (0), §4.8, §5.3's gate row, §7.1 (`bend.raised.wall`,
  `bend.wall.aqueductArch`, `bend.wall.raisedCrossing`, `bend.raised.underSpan`, `bend.raised.around`, the lock row),
  §7.2, §7.3's S4 and S7 operators, §8.2 (`StyleSheet.groups`), §8.4, §11.1, §13.2. Volumes: V01 §3.17.3 (2)–(3), V04
  §3.5.4 (d) (1), V05 §3.16 (4), V06 §2.10, §3.2, §3.7, §3.7.4 (2), §3.7.6 (3)–(4), §3.19 (5), V07 §3.4 (8), §3.5a (4),
  §3.12. `bend.raised.wall` and `bend.wall.aqueductArch` are V09 §4.9's keys (l. 2101–2102); §7.1's prose states the
  rule.
* Ids: no new T-, D- or J- id in §2, and the new text cites existing tests only. No review id, ruling id, "(M…)" label,
  "PRB6" or "amended" marker survives in the design text. Every "later" in it is temporal.
* Size (whitespace-split): §2 62 229 → 65 975 words (+3 746, +6.0 %); §2.7 12 646 → 16 388; §2.1 715 → 722; §2.9 8 236 →
  8 233. The growth is R6-02's ruled table, written "in these words". The station's text it replaces is removed, and
  some forty sites elsewhere now cite the table instead of restating it. A repair round adds no shrink of its own.

## 5. Summary

All three round-5 findings are closed. VM-R5T-01 (the stopped strips) and VM-R5T-02 (the crossing station's life) are
fixed as R6-02 rules, at every end. VM-R5T-03 (the gate plaza at a raised gate) is closed because no raised gate exists.
R6-02's two tables and (M1)–(M11) are written verbatim, apart from the repair's six declared, meaning-keeping
differences. The R6-03 and R6-10 END lines are written. Every citation of the tables across the set names an outcome,
row, column or cell that exists, and no crossing station, raised gate, wall opening, held stretch or held late calamity
survives anywhere.

There are four new findings: 0 blocker, 2 major, 2 minor.
* **VM-R6T-01** (model, major): a water gate or an anchor's tower that would fall in an under-deck strip has no defined
  move, with ends at pipeline and scope.
* **VM-R6T-02** (scope, major): T110-2 (6) and (8) run neither W3·C3–C6 nor W7·C2's vault re-lay.
* **VM-R6T-03** (model, minor): W11·C2 does not name T-V4-63.
* **VM-R6T-04** (model, minor): (3)'s "the band's upper bound" now reads as the wall's band.
