# Coherence adjudication — round 7, the family fix pass (coherence/adjudicate-r7v)

PROGRESS (lane `coherence/adjudicate-r7v`, 2026-10-02; fresh start, no earlier CHECKPOINT of this seat)
- [x] A1 read whole: the brief; the six family checks (`famverify-{table,generation,epochs,hand,readers,tests}-r7.md`)
  and their result JSONs (50 findings: 0 blocker, 13 major, 37 minor; 9 held notes); `adjudication-r7.md` Part L (the
  laws, the seven corrections, the restated veto list), Part H's head (the citation rule), Part P pass 8; PROGRESS
  J144 – J151; every quoted old text of the 50 findings located in the live design by its words (base
  `docs/ARCHITECTURE.md`, V01, V04 – V07, V09, V12): all present
- [x] A2 the decision table (below): 50 rows
- [x] A3 Part H by unit, the builders' choices, the held notes; result JSON; LANDED

## What this pass is

Round 7 works the raised-way × wall family alone (J144). Its laws — Part L of `adjudication-r7.md`, normative under
J146 with J147 – J151 — were written into the design at §2.7's support step (6) by fourteen repair seats and assembled
(`assemble-r7.md`). Six family checks then judged the live text, one lens each. This file decides every one of their
50 findings so that the repair seats can write the fixes and the six checks can run again; the loop ends when they find
no major (J144, J151 (2)). Every text below is the exact wording a seat writes. Nothing here changes an owner rule, and
no reading of the owner's words is recorded as the owner's.

**Grading** (J146 refined by J151, PROGRESS). A case where every outcome keeps every law-1 invariant and owner rule,
passes the runtime check and fails no named test is a minor **valid choice**: picked here where the pick costs no words
and keeps the laws whole, else listed for fix-list.md. A case with no lawful outcome, an outcome that breaks an owner
rule or a law-1 invariant, a law-1 invariant no bar checks, or a check or named test that fails a correct build is
MAJOR. Applied as J151 (2) has it ("the six family checks (famverify) judge the real text under this grading"; the
text the program's, J122): §2.7's worked examples are
non-normative (the laws govern where they differ), so an example's slip is at most a minor; every other text — a
pipeline step, an outcome-table row, a catalogue line, a fixture, a test — is what a builder builds or runs, so a
text whose literal outcome breaks a law-1 invariant or an owner rule, or a bar that fails a correct build, is MAJOR.
A citation, a restatement the laws already decide, a case a fixture may not hold, or a scheduling cell is a minor.

**Totals.** 50 decided — **FIX 45**, **FIX, VALID CHOICE PICKED 1** (VF7-GEN-05), **VALID CHOICE LISTED 2**
(VF7-GEN-06, VF7-RDR-07), **MERGED 2** (VF7-TBL-02 into VF7-GEN-01; VF7-TST-08 into VF7-EPO-03), **INVALID 0**.
**Regraded 1:** VF7-TBL-02, minor → major (the reason is in its row). Graded: 14 major (the 13 reported and VF7-TBL-02),
36 minor; every major is a FIX or MERGED into one. **Laws changed: two END-L lines for the model unit** — law 1 (8)'s
chamber clause (VF7-RDR-02) and *Order*'s place for a regeneration (VF7-TST-04) — both narrower than the words they
replace: the laws lose 5 words and gain none (J150). VF7-TBL-01 restores Part L's own words at the design's home and
changes no law.

**How to read.** Disposition words are `adjudication-r7.md`'s: **FIX** applies the finding's required change as this
file words it (where this file's words differ from the finding's, this file's govern and the row says why); an **END**
line is the exact text a unit writes for a fix another unit owns; an **END-L** line changes the laws at their home and
is the model unit's alone. Every text quoted "old → new" keeps every other word as it stands; a quoted old text may run
across a line break. Line numbers are the live files' as the six checks read them (`docs/ARCHITECTURE.md` unless a
volume is named); a seat locates each old text by its words. No review id (VF7-…, VPC-…, PRB7…) is written into the
design (R3-02). Where two fixes edit one row, each edits only the words it quotes. R7-01 (2)'s sweep stands: each seat
greps its own unit for every restatement of a text it changes and conforms it in the same block, naming each in its
report. **Supersession by name:** this file supersedes, in `adjudication-r7.md`, Part L's law 1 (8) chamber clause and
*Order*'s "a regeneration's" (END-L1, END-L2), E-M2's "hashed with their records" and E-D7's entity comment; every
other ruling, cell and END line of that file stands.

## The decisions

| id | lens | sev | grade | disposition | writes | reason |
|---|---|---|---|---|---|---|
| VF7-TBL-01 | table | minor | minor | FIX | model | Four law parentheticals call program readings the owner's rule (J147's *held*, J148's tier texts, J149's forms, J150's "that changes it", PROGRESS); Part L's own citations restored. |
| VF7-TBL-02 | table | minor | **major** (regraded) | MERGED into VF7-GEN-01 | — | The same defect as VF7-GEN-01 (the over form's span condition dropped from the pull's impassables); regraded because §4.4 S5a and V06's restatements are design text a builder implements, not §2.7's non-normative examples, and a build from them breaks law 1 (2) (J151 (2): the family checks "judge the real text"). Its V06 sites are written under VF7-GEN-01. |
| VF7-TBL-03 | table | minor | minor | FIX | model | W7's last column denies the junction law 1 (5) and W6·C2 give under an aqueduct's clearing arch; the example corrected. |
| VF7-TBL-04 | table | minor | minor | FIX | model | C1's and C11's "nothing reported" withholds law 4's (G2) showing of a reshape of a placement-locked wall; T110-4 (c) asserts the law. |
| VF7-TBL-05 | table | minor | minor | FIX | model | The fixed-place sentence snaps a pulled trace's river crossing and anchor to the nearest point; law 2 (a) (pass 8's pick) gives a searched op's place to its own cost. The laws already pick it; the example corrected. |
| VF7-TBL-06 | table | minor | minor | FIX | model | (3) cites row W8 with no law (Part H's citation rule). |
| VF7-TBL-07 | table | minor | minor | FIX | model, V06 | (6)'s bold "Held" names the keeping the laws call "no hold"; renamed "Kept". |
| VF7-GEN-01 | generation | major | major | FIX | pipeline; END model, V06 | S5a's impassables — which *beneath* and V06's cost field take as the one list — omit, where the channel runs above the wall's top, a span whose soffit does not clear it: a build of the list crosses under it and breaks law 1 (2). |
| VF7-GEN-02 | generation | major | major | FIX | pipeline | S3 (8)'s list of the raised ways standing at S3 omits a creation prefix's declared ones, so its castle filter can seat a weld vertex in a declared road deck's zone (law 1 (6)); the list cites *Newer*. |
| VF7-GEN-03 | generation | major | major | FIX | pipeline | S3 (9)'s **Test** (which §5.3's distance row cites) bounds the stage-1 trace at 40 m with no room for F-WALL's raised-way rung, which law 2 (c) widens to `wall.barrierReachM`: the check fails a correct build. |
| VF7-GEN-04 | generation | minor | minor | FIX | pipeline; END determinism | S5b's `c` does not name the ramp pin row (d) counts, and §5.3's gate row drops *Carried way*'s "or ends"; F-WALL's bar and T110-2 (3) catch the wrong build, no law-1 invariant crossed. |
| VF7-GEN-05 | generation | minor | minor | FIX, VALID CHOICE PICKED | pipeline | S3 (7)'s re-solve trigger is wider than law 1 (5) and narrower than law 1 (4); every outcome lawful and passing. Picked at no word cost: the trigger re-solves exactly where law 1 bars the gate, the route's own cost choosing among the rest (law 2 (a)). |
| VF7-GEN-06 | generation | minor | minor | VALID CHOICE LISTED | — | The `Gate.kind` of a carried way's stage-1 gate is unstated; `main` (not counted in N) and `water` (as the harbour gate's) are both lawful, each read for its own footprint. A pick is not costless: `main` needs words at §4.8 *Gates* and the "main gates = N" bars, `water` misnames a land road's gate. |
| VF7-GEN-07 | generation | minor | minor | FIX | determinism; END scope | F-WALL's detection sends a harbour-mouth chain law 2 (c) leaves unlaid to the stage's rung (a second outcome at S7), and T106-3 names no exception. Minor kept: both outcomes keep law 1, and no T106-3 fixture is shown to hold a raised way barring every pair of heads. |
| VF7-GEN-08 | generation | minor | minor | FIX | pipeline | Two pipeline readers cite the crossing table without the laws. |
| VF7-GEN-09 | generation | minor | minor | FIX | scope | W3·C2's named test, T110-2 (6), runs no carried way's gate at a regeneration; a clause added — its third run in this file's words, so that its fixture holds the case (the finding's "where that gate's footprint would meet a strip" leaves law 2 (a) a lawful gate to find first). |
| VF7-EPO-01 | epochs | major | major | FIX | V06 | H-AQUA's recipe puts its founded viaduct's fixed foot inside the CITY ring's outer wall strip, where law 1 (4) makes a correct founding wait (`raised.waited`), so T-V6-47's viaduct clauses fail a correct build. |
| VF7-EPO-02 | epochs | minor | minor | FIX | V06 | T-V6-11's chamber re-lay holds only where no way, square or channel crossed the span's strip while the ring stood; the fixture's seed search adds that condition. |
| VF7-EPO-03 | epochs | minor | minor | FIX | V04 | T-V4-63's frame clause restates the support step's (7) without its kept old end span; its fixture holds no wall there, so nothing fails. VF7-TST-08 merged here. |
| VF7-EPO-04 | epochs | minor | minor | FIX | V06 | `walls.waited`'s comment and §3.7.6 (5)'s continuity bullet omit the REPLACEMENT's wait and a shape-locked raised way's `vault`-use span, which their "law 2 (c)" already covers. |
| VF7-EPO-05 | epochs | minor | minor | FIX | V06 | Decision row J-V6.91 (the program's, vetoable) still records the pre-J149 rule; marked amended and conformed. |
| VF7-EPO-06 | epochs | minor | minor | FIX | V06, V05 | Eight sites cite the tables alone (Part H's citation rule); V06 §7's take-over row is written in VF7-TST-13's words, one text for one site. |
| VF7-HND-01 | hand | major | major | FIX | determinism; END V09, scope | §7.1's bend rows move a placed, slid or road-made gate out of an aqueduct's strip where law 1 (5) admits it under a clearing arch (against item 101 R2's nearest lawful place; a road's case run by no bar), and give a fixed place in an aqueduct's strip no move (no lawful outcome). The rows cite the laws instead of restating law 1 (5). |
| VF7-HND-02 | hand | major | major | FIX | determinism; END V09, scope | §7.1 ("anywhere") and V09 §4.20.2 (4) ("else merged") read an aqueduct crossing pass 5's way: a hand crossing under a span that does not clear the wall breaks law 1 (2), and the aqueduct stroke's case is run by no bar. |
| VPC-r6-03 | hand | major | major | FIX | determinism; END scope | §7.3 (b) 3 still cuts a standing raised way a moved river's re-traced run meets, against J148 (Tier 2) and law 2 (b); a cutting build passes every bar. |
| VF7-HND-03 | hand | minor | minor | FIX | V09; END determinism | V09 §4.9 has no line for a stroke's crossing moved along a deck, nor for a raised way's own edit bent where it meets a wall or a held building. |
| VF7-RDR-01 | readers | major | major | FIX | V12; END scope | V12's `wall.ungated` and §13.5's P row count a deck passing over a later ring (law 1 (1), (3)) as an ungated crossing: a P bar fails a correct build. |
| VF7-RDR-02 | readers | major | major | FIX (END-L1) | model; END V04, rendering | Law 1 (8) demands a chamber in every span read `vault`, while V04 §3.5.4 (d) (1) lays none in a span too small for one, which the support step's slide can make: a correct V04 build breaks law 1 (8) and fails T-V4-62. The law's own clause is the defect; narrowest change: law 1 (8) cites V04's lay rule (−3 words). |
| VF7-RDR-03 | readers | minor | minor | FIX | rendering; END model | §11.1's CityJSON row cites no law, and *beneath* names end walls in that row. |
| VF7-RDR-04 | readers | minor | minor | FIX | pipeline | §4.5's casters restate law 1 (7) without the support bearing a span; written as its citation. |
| VF7-RDR-05 | readers | minor | minor | FIX | determinism | §5.4's `reshaped` entity list ("locked, pinned or declared"; no ground way) differs from law 4's (G2) and correction 6. |
| VF7-RDR-06 | readers | minor | minor | FIX | V09 | `fate.reshaped` names the field `change` where §5.4 names it `reshape`. |
| VF7-RDR-07 | readers | minor | minor | VALID CHOICE LISTED | — | One stroke meeting several raised ways, and a gate the stroke makes and moves along its way: one line per raised way, or one line with the rest in the effects; both lawful, no bar counts lines. |
| VF7-RDR-08 | readers | minor | minor | FIX | V09 | Three source cells cite the tables alone, one restating its trigger without law 1 (5)'s exception; written with VF7-HND-01's V09 END as one text per cell. |
| VF7-RDR-09 | readers | minor | minor | FIX | V01 | V01's "no gate portal" wording predates J149's gate under a clearing arch; table citations; the hook row omits `stripMarginM`. |
| VF7-RDR-10 | readers | minor | minor | FIX | V09 | `effect.vault.removed` says what an unlocked chamber seats goes, where §2.7 keeps it in existence. |
| VF7-RDR-11 | readers | minor | minor | FIX | V12 | E-V12-1's register line names a held building's strip among `stripMarginM`'s readers; it reads no margin. |
| VF7-TST-01 | tests | major | major | FIX | scope; END V07 | T110-2 (4) and T-V7-48 fix a ramp crossing beyond the foot where law 3 picks the nearer of that and the first lawful crossing under the deck: on the other geometry both bars fail a correct build. |
| VF7-TST-02 | tests | major | major | FIX | V09 | T-V9-52's road bends out of the strip where law 1 (5) admits its gate under a clearing arch: on an over crossing the bar fails a correct build. |
| VF7-TST-03 | tests | major | major | FIX | V04 | T-V4-80 (i) keeps pre-J149 "under another span": a merged crossing at a pier, or a low span law 1 (2) bars, makes it fail a correct build. |
| VF7-TST-04 | tests | major | major | FIX (END-L2) | model; END determinism, scope | The order fields hashed into the model digest make T110-2 (6)'s byte identity and T110-4 (c)'s skeleton round trip fail a correct build, and *Order*'s slot for a regeneration contradicts *Newer*. The fields move to the records digest (E-M2's sentence and §6.2) and *Order* strikes "a regeneration's" (−2 words). |
| VF7-TST-05 | tests | minor | minor | FIX | scope | §13.8 schedules state-sweep states, hand rows and an epoch `shiftCourse` before their providers (M4, E3, E5). |
| VF7-TST-06 | tests | minor | minor | FIX | V07 | V-M3's arch-vault clauses that follow a village epoch's wall event need V04's U5 and V06's E8. |
| VF7-TST-07 | tests | minor | minor | FIX | scope; END V06 | Scripts ask a support `cleared` before both its spans fall, and a `breach` of a support. The C5 hand route is reworded to a `dismantle`, not struck as the finding asks: the `topple` makes only `ruined`, so striking it would leave the `cleared` state unmade on a locked raised way. |
| VF7-TST-08 | tests | minor | minor | MERGED into VF7-EPO-03 | — | The same T-V4-63 clause; VF7-EPO-03's words keep the clause's vault referent. |
| VF7-TST-09 | tests | minor | minor | FIX | scope | T110-4 (c) runs no redo and no (G2) showing of an op's own placement-locked part; a lock's part stays outside the bar (J150). |
| VF7-TST-10 | tests | minor | minor | FIX | scope | T110-4 (a)'s ring merged at a pier names no fixture able to hold it. |
| VF7-TST-11 | tests | minor | minor | FIX | model | W1·C8's village test locks nothing; row (d)'s test cell omits T110-2 (3). |
| VF7-TST-12 | tests | minor | minor | FIX | scope | "counted in neither" can be read as the epoch's count being 0 where the circuit also crosses the deck line; worded as the move's. |
| VF7-TST-13 | tests | minor | minor | FIX | V06; END scope | T-V6-47's take-over omits (4)'s new epoch clauses; V06 §7's rows carry pre-J146 citations and pre-J147 "locked". |

## Part H — by unit

Each unit's work: its FIXes, then the END lines other units' findings ask of it, then any END-L line. "old → new"
keeps every other word as it stands. Where a text below differs from the finding's required change, the note after it
says why.

### model (base §2)

Writes VF7-TBL-01, -03 – -07 and VF7-TST-11 (its FIXes); the ENDs of VF7-GEN-01 and VF7-RDR-03; END-L1 (VF7-RDR-02)
and END-L2 with its type comments (VF7-TST-04). Every edit is inside §2.7.

**M1 · VF7-TBL-01 (FIX)** — §2.7's support step (6) (0), the laws' citations, in Part L's own words (adjudication-r7.md
l. 387, 405, 458, 496):
* l. 2634: "* **The tiers** (the owner's rule, J148)." → "* **The tiers** (J148: the owner's rule and choice; the tier
  texts the program's)."
* l. 2651: "nothing else (the owner's rule, J147):" → "nothing else (J147):"
* l. 2704: "nothing of either record written (the owner's rule, J149)" → "nothing of either record written (J149)"
* l. 2741: "a gate made in it (the owner's rules, J147, J150);" → "a gate made in it (J147, J150);"

**M2 · VF7-TBL-03 (FIX)** — the crossing table, row W7's last column (l. 3335): "gates become junctions (none under a
deck)" → "gates become junctions (none under a road deck; one under an aqueduct's arch that clears it a junction there,
as W6·C2)".

**M3 · VF7-TBL-04 (FIX)** —
* *Paths and tests* (l. 3316–3317): "nothing of the wall written but *down before the wall*'s gate, nothing reported —"
  → "nothing of the wall written but *down before the wall*'s gate, nothing reported but each reshape of a
  placement-locked wall law 4's (G2) shows (a merge round the new aqueduct's arch or pier, or a gate *down before the
  wall* makes by hand: by hand the fate *reshaped*, else a `reshaped` entry) —". (The finding names the merge alone; the
  hand gate in a placement-locked wall is the same (G2) case, *down before the wall*.)
* W1·C1 (l. 3329): "a placement-locked wall met as an unlocked one" → "a placement-locked wall met as an unlocked one,
  each reshape of it shown (law 4's (G2))".
* W3·C1 (l. 3331): "a placement-locked wall standing before every stage met as an unlocked one" → "a placement-locked
  wall standing before every stage met as an unlocked one, each reshape of it shown (law 4's (G2))".
* *over the band* (l. 3024–3025): "a placement-locked wall is met as an unlocked one" → "a placement-locked wall is met
  as an unlocked one, a merge round the aqueduct's arch or pier shown by law 4's (G2)".

**M4 · VF7-TBL-05 (FIX)** —
* the fixed-place sentence, *A trace laid after the raised way* (l. 3230–3232): "— at the nearest point clear of the
  zone, a trace by the pull or a cost field treating the river's water and the barrier's edge inside the zone as no
  crossing or anchor site, a stretch of the bent group bent locally to the moved place" → "— clear of the zone: a trace
  by the pull or a cost field treating the river's water and the barrier's edge inside the zone as no crossing or anchor
  site, its own cost choosing among the rest (law 2 (a)), and a place an event or costless rule sets (a stroke's
  crossing or anchor) at the nearest point clear of it (law 2 (a), law 3), a stretch of the bent group bent locally to
  the moved place". (The finding's clauses are reordered so that "(by hand part of its bend, named in
  `bend.wall.raisedCrossing`'s line)", which follows, still attaches to the bent group's stretch.)
* *Strips, zones and nearest points* (l. 2997): "(law 2 (a); a standing one is never moved, law 1 (11))" → "(law 2 (a):
  a place an event or costless rule sets, a pull's or cost field's place being its own cost's; a standing one is never
  moved, law 1 (11))".

**M5 · VF7-TBL-06 (FIX)** — the support step's (3) (l. 2545): "(the crossing table, row W8)" → "(these laws' *what
stands of a wall*; its worked example the crossing table, row W8)".

**M6 · VF7-TBL-07 (FIX)** —
* (6)'s lead (l. 2564–2565): "(6) **Held from its creation; later work gives way.**" → "(6) **Kept from its creation;
  later work gives way.**"
* (6)'s lead (l. 2568): "it is **held**:" → "it is **kept**:"
* (7) (l. 3353): "the way being held ((6))" → "the way being kept ((6))"
§7.4's raised-way lock cell ("its deck and piers held, as every raised way is from its creation", l. 12109) keeps its
words until round 8 (adjudication-r7.md Part A: §7.4's lock column); V06's restatement is V6-9.

**M7 · VF7-TST-11 (FIX)** —
* W1·C8 (l. 3329): "T-V7-48 (V: its declared raised ways)" → "T110-4 (c) (V: its village rung, a raised way
  placement-locked)".
* the way-and-channel table, row (d)'s test cell (l. 2914; the cell's whole text): "T110-2 (2)" → "T110-2 (2), (3)".

**M8 · END for VF7-GEN-01 (VF7-TBL-02 merged)** — *beneath*, the impassables of a pulled or cost-field trace (l.
3075–3077): "an aqueduct's standing supports where its channel runs above the wall's top (each widened so that the
band's half at most touches the ring, *the edge*)," → "where an aqueduct's channel runs above the wall's top, its
standing supports and the strip of each span whose soffit does not clear the wall's top (each widened so that the
band's half at most touches the ring or that strip, *the edge*; law 1 (2): a crossing that fits neither form
unlawful),". (Both findings' words, with the widening extended to the span's strip: a band crossing through a `cleared`
ring between a clearing span and a low one would otherwise reach under the low one.)

**M9 · END for VF7-RDR-03** — *beneath*, *A `vault` span under the wall* (l. 3098–3099): "no end walls (§11.1's 3-D
and CityJSON rows)" → "no end walls (§11.1's 3-D row) and no `BridgeRoom` (its CityJSON row)".

**M10 · END-L1 for VF7-RDR-02 — a change to the laws** —
* law 1 (8) (l. 2732–2733): "a span read `vault` has its chamber (`collapsed` where V04 §3.5.4 (d) (2) says) and a span
  read `open` none" → "a span read `vault` has the chamber V04 §3.5.4 (d) lays and a span read `open` none". The law
  now cites the chamber's home instead of restating half of it: V04 §3.5.4 (d) (1) lays one chamber in each such span
  but none in one whose inset rectangle falls below `minEdge` on a side (reported), and (d) (2) gives `collapsed`; so a
  span the support step's slide leaves too small holds no chamber lawfully, and no other outcome changes. The law
  loses 3 words (J150).
* the span rule's last sentence (l. 3393–3394), which restates the chamber's existence: "— but one these laws read
  `open` (law 1 (8); its worked example the crossing table's *beneath*) —" → "— but one these laws read `open` (law 1
  (8); its worked example the crossing table's *beneath*) and one whose inset rectangle V04 §3.5.4 (d) (1) finds too
  small, reported —".

**M11 · VF7-TST-04 (FIX) with END-L2 — a change to the laws** —
* END-L2, the laws' *Order* (l. 2668–2669): "then a generation run's, a regeneration's or a village derivation's steps
  in the order it runs them" → "then a generation run's or a village derivation's steps in the order it runs them". A
  regeneration is an event of the log: its stages take "each later event"'s place, ordered within it by `step`, while
  *Newer* already gives every structure it keeps its older date and what it lays again the stage's — so law 1 (3)'s
  stored fields agree with *Newer* (W3·C2: a ring re-derived after a kept road deck passes beneath it). The law loses 2
  words (J150). (The finding's longer wording is not needed once the slot is struck.)
* the `Order` type, its `seq` comment (l. 2303): "a creation prefix's declarations, then a generation run's or a
  regeneration's stages, then each later event" → "a creation prefix's declarations, then a generation run's stages,
  then each later event (a regeneration's stages at its own event's place, after every structure it keeps: §2.7's
  laws' *Newer*)".
* E-M2's sentence (l. 2304): "`Enceinte.laidAt` and `RaisedWayRecord.courseAt` are record fields: hashed with their
  records (§6.2)," → "`Enceinte.laidAt` and `RaisedWayRecord.courseAt` are record fields outside the model digest and
  inside the records digest (§6.2), as a `DerivationRecord` is — so a line a regeneration lays again where it stood, or
  a declaration a skeleton's import moves into the creation prefix, re-dates its `seq` without moving the model digest
  —,".
§6.2's half is D8; the bars' halves are S13.

### kernel (base §3)

No work: no finding and no END line names base §3.

### pipeline (base §4, §10, PART II, PART III)

Writes VF7-GEN-01 – -05, VF7-GEN-08 and VF7-RDR-04 (its FIXes). VF7-GEN-06 is a listed builders' choice; nothing is
written for it.

**P1 · VF7-GEN-01 (FIX; VF7-TBL-02 merged)** — §4.4 S5a *Trace* (2), the pull's impassables (l. 6589): "an aqueduct's
standing supports where its channel runs above the wall's top (its crossing there over)," → "where an aqueduct's
channel runs above the wall's top (its crossing there over), its standing supports and the strip of each span whose
soffit does not clear the wall's top (law 1 (2): a crossing that fits neither form unlawful),". (The finding's "each
span above the band there" is written "each span": the band follows the line being searched, so a span the line does
not cross puts no band beneath it.) V06 §3.7.4 (2) cites this list unchanged; V06's own restatements of the form are
V6-7.

**P2 · VF7-GEN-02 (FIX)** —
* §4.2 S3 (8) (l. 6231): "(the raised stretches of (5)'s routes at S3, S4's and S5b's viaducts at a stage's citadel,
  every held one at a regeneration;" → "(every raised way standing before the stage — a creation prefix's declared ones
  and, at a regeneration, each one it keeps where it stands (§2.7's laws, law 2 *Newer*) —, the raised stretches of
  (5)'s routes at S3, S4's and S5b's viaducts at a stage's citadel;".
* §4.2 S3 (10) (l. 6285): "— at a regeneration, one held (§2.7's support step (6); §2.7's laws, law 2 *Newer*); at
  generation the raised stretches of (5)'s routes," → "— a creation prefix's declared one and, at a regeneration, one it
  keeps where it stands (§2.7's support step (6); §2.7's laws, law 2 *Newer*); at generation, besides, the raised
  stretches of (5)'s routes,".

**P3 · VF7-GEN-03 (FIX)** — §4.2 S3 (9)'s **Test** (l. 6267): "and along a barrier reach, which departs by at most
`wall.barrierReachM`" → "and along a barrier reach or a stretch F-WALL's raised-way rung re-pulled round a raised way
(§5.2; §2.7's laws, law 2 (c)), each of which departs by at most `wall.barrierReachM`". §5.3's distance row (l. 9939)
cites S3 (9) and stays as written.

**P4 · VF7-GEN-04 (FIX)** — §4.4 S5b (l. 6638): "(a crossing on a raised deck no gate, S5a *Trace* (2);" → "(a crossing
on a raised deck no gate, and one on a ramp, stair or foot, pinned beyond the foot, one of them where that pin is lawful
— S5a *Trace* (2); §2.7's laws, law 1 (4), law 2 *Not yet built*; its worked example the way-and-channel table's row
(d);". (Row (d) is cited after the laws, Part H's head.) §5.3's half is D6.

**P5 · VF7-GEN-05 (FIX, VALID CHOICE PICKED)** — §4.2 S3 (7) (l. 6214): "or with its gate's footprint or the band there
over the ends or in the strip (law 1 (1), (4), (5))" → "or with its gate's footprint in a strip where law 1 (5) bars
it, or the band or wall strips there over the ends (law 1 (1), (4), (5))". The pick: the trigger re-solves exactly where
law 1 bars the gate (law 1 (4) naming the wall strips, law 1 (5) admitting a gate under an aqueduct's arch that clears
it), the route's own cost choosing among the lawful rest (law 2 (a)); one phrase for another, no law touched.

**P6 · VF7-GEN-08 (FIX)** —
* §4.1's S7 row (l. 5700): "met by §2.7's crossing table (*beneath*; §4.8's lead)" → "met by §2.7's laws (law 1
  (1)–(9); its worked example the crossing table's *beneath*; §4.8's lead)".
* §4.8 *Gates* (l. 8378): "A raised way and a trace meet by §2.7's crossing table: no station, gate or opening on a
  deck." → "A raised way and a trace meet by §2.7's laws (law 1 (1); its worked example the crossing table): no station,
  gate or opening on a deck."

**P7 · VF7-RDR-04 (FIX)** — §4.5 *The casters* (l. 6873): "walls (a run beneath a road deck's standing span capped at
the lowest soffit there, an aqueduct capping none: §2.7's laws, law 1 (7))" → "walls (each run at its top as §2.7's
laws give it, law 1 (7); its worked example *the cap* in *beneath*)".

### determinism (base §5–§7)

Writes VF7-HND-01, VF7-HND-02, VPC-r6-03, VF7-GEN-07 and VF7-RDR-05 (its FIXes); the ENDs of VF7-GEN-04, VF7-HND-03
and VF7-TST-04. §7.1's lock row, §7.2, §7.3 item 4, §7.4's lock column and §5.3's declared row keep their words
(adjudication-r7.md Part A); none is edited here. D1 and D2 edit different words of one row.

**D1 · VF7-HND-01 (FIX)** — §7.1's outcome table; the finding's parentheses restating law 1 (5) and (6) are written as
citations (Part H's head), its outcomes kept:
* the `bend.wall.raisedCrossing` row (l. 11323), its cause: "or a `placeGate` or a gate's slid crossing inside its
  under-deck strip" → "or a `placeGate` or a gate's slid crossing where §2.7's laws bar a gate there (law 1 (5))";
* the same row's outcome: "a fixed place it lays kept out of the fixed-place zone (law 1 (6))" → "a fixed place it lays
  moved along its tie to the nearest place §2.7's laws admit it (law 1 (6))";
* the same row's outcome: "a slid gate moved back along the trace to the strip's edge its grip came from and a
  `placeGate`'s gate to the nearer edge" → "a placed or slid gate moved along the trace to the nearest point at which
  §2.7's laws admit its footprint (law 1 (5)) — a `placeGate`'s gate to the nearer such point, a slid one back to the
  first such point on the side its grip came from";
* the `bend.raised.underSpan` row (l. 11325), its cause: "or crossing an enceinte's trace inside that strip" → "or
  crossing an enceinte's trace where §2.7's laws bar its gate there";
* the same row's outcome: "its crossing of a trace to the nearest clear of the under-deck strip" → "its crossing of a
  trace to the nearest at which §2.7's laws admit its gate".
V09's half is V9-2 and V9-3; the bar is S9.

**D2 · VF7-HND-02 (FIX)** —
* the `bend.wall.raisedCrossing` row (l. 11323): "(an aqueduct's deck line crossed once anywhere, in the form its
  level there gives, law 1 (2);" → "(an aqueduct's deck line crossed once in the form its level there gives — over,
  under a span that clears the wall's top and never through a standing support, where its channel runs above that top;
  merged where it runs within the wall's height —, law 1 (2);".
* §7.1 *Raised ways* (l. 11133–11135): "never a gate, its course bent clear only of a gate, postern, tower or fixed place
  its arches would not clear (item 363; §2.7's laws, law 1 (2), (5), (6); law 2 (a);" → "never a gate, a course that
  cannot cross so — an over crossing whose span over the band would not clear the wall's top, a gate, postern, tower or
  fixed place its arches would not clear — bent to the nearest course that can, else refused (item 363; §2.7's laws,
  law 1 (2), (5), (6); law 2 (a), (c);".
V09's half is V9-8; the bars are S10.

**D3 · VPC-r6-03 (FIX)** — §7.3 (b) 3 (l. 11675–11676): "and every way but a kept way at a gate that the new strips will
meet," → "and every way but a kept way at a gate and a standing raised way, whose deck passes over the run, that the
new strips will meet (the raised way met by §2.7's laws, law 2 (a); its worked example the crossing table's row W2;
§4.11 *Other crossings*),". (The finding's words in §4.11 *Other crossings*' own order, l. 8946–8947, so a carve and a
moved river read alike.) The bar is S11.

**D4 · VF7-GEN-07 (FIX)** — §5.2's F-WALL row, its detection (l. 9840; not §7.1's refuse row, l. 11324, which carries
the same words and stays): "a fixed place with no clear point in reach" → "a fixed place the trace lays with no clear
point in reach (a harbour-mouth chain S7 lays being not laid, `W_RAISED_MEETING`: §2.7's laws, law 2 (c); its worked
example the fixed-place sentence)". T106-3's half is S8.

**D5 · VF7-RDR-05 (FIX)** — §5.4, the `reshaped` variant's comment (l. 9991): "a locked, pinned or declared wall,
raised way or arch vault whose shape a meeting changed" → "a placement-locked (a pin among them) wall-like structure,
raised way, arch vault or ground way whose shape a meeting changed".

**D6 · END for VF7-GEN-04** — §5.3's gate row (l. 9938): "where the boundary crosses its ground course" → "where the
boundary crosses its ground course or ends".

**D7 · END for VF7-HND-03** — §7.1's catch-all row (l. 11326): "a raised way's clearance, ends, wall and island strokes"
→ "a raised way's clearance, ends, wall and island strokes and its own edits bent where they meet a wall or a held
building (`bend.raised.wall`)".

**D8 · END for VF7-TST-04** — §6.2:
* *Included and excluded* (l. 10370–10371): "**Excluded:** provenance, derivation records and naming records (the
  provenance digest, §2.8; the persisted records form the records digest, below);" → "**Excluded:** provenance,
  derivation records, naming records and the order fields `Enceinte.laidAt` and `RaisedWayRecord.courseAt` (§2.7's
  laws' *Order*) (the provenance digest, §2.8; the persisted records and those fields form the records digest,
  below);"
* *The records digest* (l. 10384–10385): "The persisted derivation and naming records (§2.8) form a second Merkle tree
  beside the model's:" → "The persisted derivation and naming records (§2.8), with the order fields of every enceinte
  and raised way (one leaf per `Enceinte` or `RaisedWayRecord`, its record kind `order` and its fields the `laidAt` or
  `courseAt` profile, at the town node), form a second Merkle tree beside the model's:".

### rendering (base §8, §9, §11, §12)

Writes VF7-RDR-03 (its FIX) and the END of VF7-RDR-02.

**R1 · VF7-RDR-03 (FIX)** — §11.1's CityJSON row (l. 16703): "an arch vault a `BridgeRoom`" → "an arch vault a
`BridgeRoom` — none in a span §2.7's laws read `open` (law 1 (8); its worked example *beneath*)". *beneath*'s half is M9.

**R2 · END for VF7-RDR-02** — §8.11's T-ER-12 outcome cell (l. 15463): "a span's `use` one reading in GeoJSON's `span`
feature, glTF's end walls and CityJSON's `BridgeRoom`" → "a span's `use` one reading in GeoJSON's `span` feature and
glTF's end walls, and CityJSON's `BridgeRoom` wherever V04 lays its arch vault (§2.7's laws, law 1 (8))".

### scope (base §0–§1, §13–§17, the index, INDEX.md)

Writes VF7-GEN-09, VF7-TST-01, -05, -07, -09, -10 and -12 (its FIXes); the ENDs of VF7-GEN-07, VF7-HND-01, VF7-HND-02,
VPC-r6-03, VF7-RDR-01, VF7-TST-04 and VF7-TST-13. S9 and S11 insert at different places of T110-2 (5); S2, S7 and S10's
second item edit different words of T110-2 (4); S5, S6 and S13's second item edit different words of T110-4.

**S1 · VF7-GEN-09 (FIX)** — §13.2's T110-2 (6), before "; and (3)'s table-edit variant regenerated (keep)" (l.
19486–19487) insert: "; a CITY whose skeleton declares a raised road (T4 `road` with `raised`) over the valley beside
S3's ring, placement-locked by the user, regenerated (keep) and given New random, its seed searched so that the stage-1
boundary crosses the raised road's ground course beyond its foot and, on a second run, only its deck — the first run's
gate beside the N main gates on ground part 0, decked where the city moat is wet and counted among the roads leaving the
stage, the second run's trace crossing beneath the deck with no gate and its pull never moving the crossing onto the
ground course, and, on a third run whose seed is searched so that §2.7's laws admit no gate for that way where the
boundary crosses its ground course, the way re-routed by law 2 (b) through the nearest of the stage's gates a way of its
class may pass (§2.7's laws, law 2 *Carried way*, (a), (b); §5.3's gate row)". (The finding's third run, "where that
gate's footprint would meet a strip", is written so that the fixture holds the case: a footprint meeting a strip may
leave law 2 (a) a lawful gate to find first, which a bar asserting the re-route would then reject.)

**S2 · VF7-TST-01 (FIX)** — T110-2 (4) (l. 19366–19367): "and one across a viaduct's ramp — bent beyond its foot
through a gate on the carried way's ground course (§2.7's laws, law 1 (4)) —" → "and one across a viaduct's ramp nearer
its foot than the deck's first lawful crossing — bent beyond its foot through a gate on the carried way's ground course
—, and, on a second run, one across that ramp nearer the deck — bent under the deck's first span clear of the ramp
(§2.7's laws, law 1 (4), law 2 (a), law 3; its worked example the bent-group sentence (i)) —". V07's half is V7-2.

**S3 · VF7-TST-05 (FIX)** — §13.8's T110 row (l. 20377):
* after "the state sweep's `topple` runs at the later of their milestone and M6-E's E5, which builds the hazards," insert
  " the state sweep's other states in a clause scheduled before them — C3 – C5 by `DeclineOp` (M4), C10 by
  `repairRaised` and C12 by a frame growth (M4; V06's E3) — and (4)'s hand rows W4, W5 and W10 (M4; V06's E3) at the
  later of their milestone and those providers, (4)'s epoch `shiftCourse` clause at M6-E's E5, which builds the terrain
  candidates,";
* in T110-4's runs: "its hazards at E5" → "its hazards and water ops (a silting, a `shiftCourse`) at E5".

**S4 · VF7-TST-07 (FIX)** —
* T110-2 (7) (l. 19488): "a span over the band `ruined`, a support by the band `cleared`" → "a span over the band
  `ruined`, then the span beyond one of its supports `ruined` and that support, both its spans fallen, `cleared`";
* T110-2 (7)'s cells'-order clause (l. 19494–19495): "after a support there was `cleared`" → "after a support there was
  `cleared`, both its spans fallen first";
* T110-2's lead, the state sweep's C5 (l. 19240–19241): "(by the `topple`, or by hand `convert`s: a `breach` of both
  spans, then of the support)" → "(by the `topple`, or by hand `convert`s: a `breach` of both spans, then a `dismantle`
  of the support)". (Not the finding's "(by the `topple`)": `DeclineOp` breaches only a span and dismantles a support
  whose spans are both down (§4.11, l. 9401), and the `topple` makes only `ruined`, so striking the hand route would
  leave C5's `cleared` state unmade on a raised way the clause locks.)
V06's half (T-V6-47) is V6-8.

**S5 · VF7-TST-09 (FIX)** — T110-4 (c) (l. 19531–19539):
* "each hand op undone on a second run" → "each hand op undone, and then redone, on a second run";
* "each reshape of a placement-locked structure other than the op's own shown" → "each reshape of a placement-locked
  structure, part or way other than the op's own target, and of a placement-locked part of the op's own (an arch vault),
  shown";
* "each undo restoring the prior digest, or refused `refuse.undo.dependent` with its reason where §2.7's laws would not
  then hold (§2.7's laws, law 4)" → "each undo and each redo restoring the prior digest or re-applying its event's, or
  refused `refuse.undo.dependent` with its reason where §2.7's laws would not then hold (§2.7's laws, law 4; a lock's
  behaviour under either outside this bar, J150)".

**S6 · VF7-TST-10 (FIX)** — T110-4 (a) (l. 19518–19519): "and on a CITY ring an aqueduct crosses merged (its channel
within the ring's height, a pier in the band)" → "and on T110-2 (6)'s New random of (1)'s merged variant, its seed
searched so that the new ring's boundary meets one of the kept aqueduct's supports, the ring crossing the aqueduct merged
there (its channel within the ring's height, a pier in the band)". (The seed search is this file's: a pier stands in a
band only where the ring is laid after the aqueduct and its boundary meets a support.)

**S7 · VF7-TST-12 (FIX)** — T110-2 (4) (l. 19425–19426): "counted in neither `walls.waited` nor
`walls.raisedCrossings`" → "the move counted in neither `walls.waited` nor `walls.raisedCrossings` (each crossing of the
viaduct's deck line the trace makes counted as §2.7's laws give it, law 4; its worked example *beneath*'s
*Reported*)".

**S8 · END for VF7-GEN-07** — §13.2's T106-3 (l. 19156): "and every walled port gets its harbour-mouth chain;" → "and
every walled port gets its harbour-mouth chain, save one §2.7's laws leave out for a raised way, reported
(`W_RAISED_MEETING`; law 2 (c));".

**S9 · END for VF7-HND-01** — T110-2 (5) (l. 19446–19448): after "a hand road drawn across one where a wall runs beneath
it, crossing the trace under the deck — moved along the deck to cross the trace clear of the under-deck strip at a gate
(`bend.raised.underSpan`)" insert "; a hand road drawn across a wall under a standing aqueduct's arch that clears the
gate and the wall, square to the deck and passing the strip by §4.3's crossing rule — its gate made there, no bend —
and, on a second run where that arch does not clear the gate, moved along the deck to the nearest crossing at which
§2.7's laws admit its gate (§2.7's laws, law 1 (5), law 2 (a), law 3)". (", passing the strip by §4.3's crossing rule"
is this file's: law 1 (5)'s gate under an arch needs its way to pass by that rule, the way-and-channel table's row (b).)

**S10 · END for VF7-HND-02** —
* T110-2 (1) (l. 19282): after "refused (`refuse.raised.meeting`), nothing of either built" insert "; and one whose
  channel at the wall runs above the wall's top by less than the deck's depth (`raisedWays.structure.span.deckDepthCm`),
  so that its span over the band would not clear it, its course bent to the nearest crossing whose span clears the
  wall's top, with `bend.wall.aqueductArch`, else refused `refuse.raised.meeting` (§2.7's laws, law 1 (2), law 2 (a),
  (c))". (The finding's words, placed at the end of the hand aqueduct's list rather than after its tower clause, where
  they would break that list's dash pair.)
* T110-2 (4) (l. 19406–19407): "over where its channel runs above the ring's top, every span over the band clearing it,
  else merged," → "over where its channel runs above the ring's top, every span over the band clearing it, merged where
  it runs within the ring's height,". (This file's addition: a fourth text of the class — a bar asserting pass 5's
  "else merged" for a re-shaped aqueduct, which would fail a correct build that bends a high channel's low span.)

**S11 · END for VPC-r6-03** — T110-2 (5) (l. 19453): after "no F-EDIT conflict (§4.11 *Other crossings*) —," insert " a
hand `moveCourseKnot` moving the river of that fixture so that S1's water operator re-traces a run of the ring beneath
the same aqueduct — the run meeting it by §2.7's laws, no F-EDIT conflict and no `cut`, every station, key, span and
state of the aqueduct unchanged (§7.3 (b) 3) —,".

**S12 · END for VF7-RDR-01** — §13.5's "towers and gates" row (l. 20059): "ungated crossings 0;" → "ungated crossings 0
(on ground part 0; a deck passing over a trace is no crossing, §2.7's laws, law 1 (1));"; and "roads leaving each walled
stage = its N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed" → "roads leaving each walled stage on
ground part 0 = its gate count by §5.3's gate row (its N main gates, a harbour gate of §4.2 S3 (7) where one was placed,
and any gate a carried way standing before the stage takes, §2.7's laws, law 2 *Carried way*)".

**S13 · END for VF7-TST-04** —
* T110-2 (6) (l. 19462–19463): "the routes, the ring, its strips, band, towers and gates byte-identical" → "the routes,
  the ring, its strips, band, towers and gates byte-identical in the model digest (§6.2), the ring's `laidAt` taking the
  regeneration's order (§2.7's laws' *Order*, *Newer*)";
* T110-4 (c) (l. 19531–19532): "each op's outcome one digest on two hosts" → "each op's outcome one model digest and one
  records digest on two hosts". (This file's addition: the order fields law 1 (3) reads leave the model digest, so the
  bar's cross-host check names the digest that now holds them.)

**S14 · END for VF7-TST-13** —
* §13.2's runs sentence (l. 19548–19549): "Volume 6 runs T110-2's epoch clauses (4), (5), (7) and (8) on its engine
  (T-V6-47)" → "Volume 6 runs T110-2's epoch clauses (4), (5), (7) and (8) on its engine (T-V6-47; (4)'s arch-vault
  circuit by T-V4-80 (i))";
* the take-over row (l. 19796): "T110-2's epoch clauses (4), (5), (7) and (8) (T-V6-47)" → "T110-2's epoch clauses (4),
  (5), (7) and (8) (T-V6-47; (4)'s arch-vault circuit by T-V4-80 (i))". (This file's addition: the row states the same
  mapping as the runs sentence.)

### V01

**V1-1 · VF7-RDR-09 (FIX)** —
* V01 §3.17.3 (6) (V01 l. 2481–2483), the item's text after its bold head: "A raised way meets a wall by §2.7's crossing
  table, never with a gate or an opening: an aqueduct's arch over a curtain and a deck over a wall laid after it give no
  gate portal, no `gate` rank or kind factor, no gate plaza, no wall-side feature and no S9b square." → "A raised way
  meets a wall by §2.7's laws (its worked example the crossing table), never with a gate or an opening (§2.7's laws, law
  1 (1), (2)): an aqueduct crossing a curtain, over it on an arch or merged into it, and a deck over a wall laid after it
  give no gate portal, no `gate` rank or kind factor, no gate plaza, no wall-side feature and no S9b square — a gate
  standing beneath an aqueduct's arch that clears it (law 1 (5)) being a part-0 gate as any, with its portal, rank and
  plaza." (The finding's (a) and (b) for this item as one text.)
* the gate approach (V01 l. 1423–1424): "An aqueduct's arch over a curtain wall is no gate: no gate portal, no gate plaza
  and no wall-side feature reads it (V01 §3.17.3 (6))." → "An aqueduct's arch over or in a curtain wall is no gate: no
  gate portal, no gate plaza and no wall-side feature reads the arch (V01 §3.17.3 (6)); a gate standing beneath it is a
  gate as any (§2.7's laws, law 1 (5))."
* (a) *Portals and anchors* (V01 l. 978): "no gate stands on a deck, §2.7's crossing table)" → "no gate stands on a
  deck, §2.7's laws, law 1 (1))".
* the strip (V01 l. 2468): "(§2.7's crossing table, *beneath*)" → "(§2.7's laws, law 1 (7), (8); its worked example
  *beneath*)".
* §1.2's hook row (V01 l. 201): "`raisedWays.structure` (`clearanceCm`, `clearWidthM`, `squareDeg`)" →
  "`raisedWays.structure` (`clearanceCm`, `stripMarginM`, `clearWidthM`, `squareDeg`)"; and in its third cell
  "crossings under arches by §4.3's crossing rule (V01 §3.17.3)," → "crossings under arches by §4.3's crossing rule (V01
  §3.17.3), the under-deck strip (V01 §3.17.3 (2)),".

### V02

No work.

### V03

No work.

### V04

**V4-1 · VF7-TST-03 (FIX)** — T-V4-80 (i) (V04 l. 3181): "the circuit crossing under another span and the hand
`drawWall` moved to cross under the nearest span clear of the building's widened strip (§2.7's laws, law 1 (9))" → "the
circuit crossing the deck line clear of that span's strip at the aqueduct's level and the hand `drawWall` moved along
the deck line to the nearest crossing clear of the building's widened strip (§2.7's laws, law 1 (2), (9), law 3)".

**V4-2 · VF7-EPO-03 (FIX; VF7-TST-08 merged)** — T-V4-63's frame-growth clause (V04 l. 3164): "the span from the old
deck's last interior station (with none, its one span) re-derived with the extension" → "the span from the old deck's
last interior station (with none, its one span) re-derived with the extension, save one a wall-like structure crosses,
kept as it stands and the extension laid on from the old foot's point (§2.7's support step (7); §2.7's laws, law 2
(c))". (VF7-EPO-03's words rather than VF7-TST-08's: the clause's following "and its vault laid or deleted by its new
span" keeps a single referent.)

**V4-3 · END for VF7-RDR-02** —
* T-V4-62 (V04 l. 3163): "an arch vault in exactly each `vault` span §2.7's laws read `vault` (law 1 (8); its worked
  example *beneath*)" → "an arch vault in exactly each `vault` span §2.7's laws read `vault` but one too small for a
  chamber, which holds none and is reported (V04 §3.5.4 (d) (1); law 1 (8); its worked example *beneath*)";
* T-V4-63 (V04 l. 3164): "a user-added raised way's `vault` spans §2.7's laws read `vault` have their vaults in the same
  commit" → "a user-added raised way's `vault` spans §2.7's laws read `vault` have their vaults in the same commit (one
  too small for a chamber none, reported, V04 §3.5.4 (d) (1))"; and "each new `vault` span they read `vault` holds its
  chamber" → "each new `vault` span they read `vault` holds its chamber (one too small for a chamber none, V04 §3.5.4
  (d) (1))". (T-V4-63's two clauses are this file's addition: over 100 % of its sequences they assert the chamber law
  1 (8) no longer demands of such a span.)
Each other bar of V04 that asserts a chamber in every `vault` span is conformed the same way in the seat's sweep
(R7-01 (2)), each named in its report.

### V05

**V5-1 · END for VF7-EPO-06** — T-V5-14 (V05 l. 2565): "(§2.7's crossing table, *unchanged meeting*)" → "(§2.7's laws,
law 4; its worked example *unchanged meeting*)"; (V05 l. 2567): "§2.7's crossing table (row W12) names this clause" →
"§2.7's laws' worked example, the crossing table's row W12, names this clause".

### V06

**V6-1 · VF7-EPO-01 (FIX)** — V06 §7, H-AQUA (V06 l. 4099–4100): "its near rim just outside the ring's band so that the
reading's `A` lies there" → "its near rim just beyond the ring's outer wall strip, so that the reading's `A` lies there
and the viaduct's foot at `A`, widened by `raisedWays.structure.stripMarginM`, lies clear of the ring's band, wall
strips and gatehouse, the main approach road's gate standing beyond the foot (§2.7's laws, law 1 (4); its terms'
*beyond the foot*)".

**V6-2 · VF7-EPO-02 (FIX)** — T-V6-11 (V06 l. 4172): "(law 1 (8); its worked example the crossing table's row W8;
H-AQUA's span over its CITY ring)" → "(law 1 (8); its worked example the crossing table's row W8; H-AQUA's span over its
CITY ring, the recipe's seed searched so that no way, square or channel is laid across that span's strip while the ring
stands over it)".

**V6-3 · VF7-EPO-04 (FIX)** —
* V06 §2.10, `walls.waited`'s comment (V06 l. 755): "or that a held building in an arch vault turns back, and the water
  ops" → "or that a held building in an arch vault or a shape-locked raised way's `vault`-use span turns back, a
  re-section on a kept trace with no lawful shape (V07 §3.11's palisade REPLACEMENT; the crossing table's row W14), and
  the water ops"; and "(§2.7's laws, law 2 (c), law 1 (9), (11);" → "(§2.7's laws, law 2 (c), law 1 (9)–(11);".
* V06 §3.7.6 (5)'s continuity bullet (V06 l. 1618–1619): "or for a held building in an arch vault (law 1 (9); its
  worked example *beneath*)" → "or for a held building in an arch vault or a shape-locked raised way's `vault`-use span
  (law 1 (9), (10); its worked example *beneath*)".

**V6-4 · VF7-EPO-05 (FIX)** — V06 ## 9, J-V6.91 (V06 l. 4493): "chose that a raised way and a curtain never bear on each
other — an aqueduct created across a standing curtain crosses it on a span over its band, a road deck comes down before
it, and a trace laid after a raised way runs on beneath its deck, crossing an aqueduct under one of its arches and a road
deck's carried way beyond its foot, a road deck's supports in its band built into its line — with continuity a hard rule
(a moat that cannot pass beneath stopped at the under-deck strip's edges and reported, never a trace waiting; §2.7's
crossing table)," → "*amended by §2.7's laws.* Chose that a raised way and a curtain never bear on each other — they
meet by §2.7's laws (law 1 (2)–(4): an aqueduct crossing a curtain at its own level, over it on an arch or merged into
it, whichever was laid first; a road deck coming down before a curtain standing when its course is laid and passing
over one laid after it, its supports in the band built into its line; a road deck's carried way crossing beyond its
foot) — with continuity a hard rule (a moat that cannot pass beneath stopped at the under-deck strip's edges and
reported; a trace waiting only by §2.7's laws, law 2 (c)),", the rest of the row as it stands.

**V6-5 · VF7-EPO-06 (FIX)** —
* W68 (V06 l. 351): "the meeting by §2.7's crossing table (*beneath*; a founding *over the band* or *down before the
  wall*)" → "the meeting by §2.7's laws (laws 1–2; their worked examples *beneath*, a founding's *over the band* or
  *down before the wall*)"; in the same cell "`wallToWay`'s ring road by §2.7's way-and-channel table" → "`wallToWay`'s
  ring road by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table's row (c))" (this file's
  addition: the same cell's other table citation); and its last cell "§4.4 S5a, §4.8 S7; §2.7's crossing table" →
  "§4.4 S5a, §4.8 S7; §2.7's laws".
* §3.7.4 (4) (V06 l. 1532–1533): "a deck passing over the trace takes none, §2.7's crossing table" → "a deck passing over
  the trace takes none, §2.7's laws, law 1 (1)".
* §3.17 (9) (V06 l. 2503–2504): "(§2.7's crossing table, *down before the wall*; V06 §3.19 (5))" → "(§2.7's laws, law 1
  (3), law 2 (c); its worked example *down before the wall*; V06 §3.19 (5))".
* §3.19's lead (V06 l. 2756): "a wall meets it by §2.7's crossing table (V06 §3.7.6 (5))" → "a wall meets it by §2.7's
  laws (V06 §3.7.6 (5))".
* §3.19 (5) (V06 l. 2845–2846): "(§2.7's crossing table, row W8)" → "(§2.7's laws' *what stands of a wall*; its worked
  example the crossing table's row W8)" (this file's addition, found by the same rule).
* §3.21's raised-way row (V06 l. 3328): "(`raised.waited`; §2.7's crossing table, *down before the wall*)" →
  "(`raised.waited`; §2.7's laws, law 1 (3), law 2 (c); its worked example *down before the wall*)".
* J-V6.114 and J-V6.140 (V06 l. 4516, 4542): "*amended by §2.7's crossing table.*" → "*amended by §2.7's laws.*" (both).
* §7's first T110-2 row (V06 l. 4151): as V6-6 writes it, one text for one site.
Each other V06 citation of §2.7's tables alone is written "§2.7's laws, law n; its worked example …" in the same sweep
(adjudication-r7.md Part H's head), each named in the seat's report.

**V6-6 · VF7-TST-13 (FIX)** —
* §7's first T110-2 row (V06 l. 4151): "each run again locked and pinned, *beneath* (§2.7's crossing table)" → "each run
  again placement-locked and pinned, met by §2.7's laws (law 1 (2)–(9); its worked example *beneath*)"; and at the end
  of its last cell, after "`wallToWay`'s ring road", add "; the epoch circuit under a placement-locked arch vault and with
  a held building (T-V4-80 (i), at E8), and (4)'s other epoch clauses — two raised ways, the fixed-place zone, the
  table-edit wait, the epoch `shiftCourse` at E5 — as T110-2 (4) states them".
* §7's second T110-2 row (V06 l. 4152): "(*over the band*, the gap left a gap)" → "(§2.7's laws, law 1 (2); its worked
  example *over the band*, the gap left a gap)"; and in the same row (not H-AQUA's, V06 l. 4099) "(*down before the
  wall*)" → "(§2.7's laws, law 1 (3), law 2 (c); its worked example *down before the wall*)".
The base's runs sentence and take-over row are S14.

**V6-7 · END for VF7-GEN-01 (VF7-TBL-02's V06 sites)** — at each of five sites, V06 §3.7.6 (5) (V06 l. 1609), §3.19 (5)
(l. 2847–2848), T-V6-11 (l. 4172), T-V6-47 (l. 4208) and T-V6-73 (l. 4234): "over where its channel runs above the
wall's top, else merged" → "over where its channel runs above the wall's top and every span over the band clears it,
merged where its channel runs within the wall's height".

**V6-8 · END for VF7-TST-07** — T-V6-47's cells'-order clause (V06 l. 4208): "after a support by its planned line was
`cleared`" → "after a support by its planned line was `cleared`, both its spans fallen first".

**V6-9 · END for VF7-TBL-07** — V06 §3.6 (V06 l. 1441): "the raised way held (§2.7's support step (6))" → "the raised
way kept (§2.7's support step (6))". (This file's addition: (6)'s term is renamed, M6.)

### V07

**V7-1 · VF7-TST-06 (FIX)** —
* ## 8's V-M3 cell (V07 l. 3762): "and its arch-vault clauses at the later of that exit and V04's U3 (risk (8))" → "and
  its arch-vault clauses at the later of that exit and V04's U3 — those whose arch-vault outcome follows a village
  epoch's wall event (the REPLACEMENT's, the `absorbWall`'s and the sweep's epoch C6 runs) at the later of that exit,
  V04's U5 and V06's E8 (risk (8))";
* §1 (14) (V07 l. 196): "and for T-V7-48's state sweep a `topple` (V06 §3.11, E5)" → "and for T-V7-48's state sweep a
  `topple` (V06 §3.11, E5) and, for its arch-vault clauses that follow a village epoch's wall event, the epoch's
  arch-vault reconcile (V06's `under.extend`, E8)".

**V7-2 · END for VF7-TST-01** — T-V7-48 (V07 l. 3708): "and bent to pass beyond each ramp's foot," → "and, where it
crosses a ramp, bent to the nearer by law 3 of the first lawful crossing under the deck and the one beyond the ramp's
foot (§2.7's laws, law 1 (4), law 3; its worked example the bent-group sentence (i)),".

### V08

No work.

### V09

Writes VF7-TST-02, VF7-RDR-06, -08, -10 and VF7-HND-03 (its FIXes) and the ENDs of VF7-HND-01 and VF7-HND-02. §4.9's
rows are given one block each, so that VF7-RDR-08, VF7-HND-01's END and VF7-HND-03 write each cell once. VF7-RDR-07 is a
listed builders' choice; nothing is written for it.

**V9-1 · `bend.raised.wall` (V09 l. 2102; VF7-RDR-08, VF7-HND-03 (b))** — its line cell, after ""The raised road comes
down before the {wall} and passes through its gate."" add " — and, for a raised way's own re-shape bent back along its
drag, "{way} cannot cross {wall} there, so your change stops {m} m short."; for its Arch spacing, Deck height or width
bent to the nearest lawful value, "{way}'s {measure} is {v}, the nearest that {wall} allows." — `{wall}` the wall's or
held building's name, else its kind's word; `{measure}` the edited value's word; the line taking its form by what was
edited"; its source cell "(§2.7's crossing table, *down before the wall*)" → "(§2.7's laws, law 1 (3), law 2 *Carried
way*; its worked example *down before the wall*); a raised way's own edit bent where it meets a wall-like structure or
a held building (§2.7's laws, law 2 (a), law 3; its worked example the crossing table's C13)". (The finding's "width or
class" is written "width", and its "keeps clear of" "allows": C13 sends a class edit to law 2 (b), then (c), never to a
nearest value, and an aqueduct's Deck height may be bent to keep an arch clearing a gate, not to keep clear of the wall.)

**V9-2 · `bend.wall.raisedCrossing` (V09 l. 2104; VF7-HND-01's END, VF7-HND-03 (a))** — its gate form "No gate can
stand beneath {way}, so it moves {m} m along {wall}." → "No gate can stand there beneath {way}, so it moves {m} m along
{wall}."; and after its keep-clear form ""The wall keeps clear of {way}, {m} m off your line."" add " — and, for a
crossing moved along {way} to the nearest lawful one (under an arch that clears the wall, or beyond a road deck's foot
through a gate there), "The wall crosses {way} {m} m from your line, where it can pass."".

**V9-3 · `bend.raised.underSpan` (V09 l. 2105; VF7-HND-01's END with VF7-RDR-08)** —
* its line cell: "for a way whose crossing of a wall's trace was moved clear of the under-deck strip," → "for a way
  whose crossing of a wall's trace was moved to where a gate can stand,"; and "{name} crosses {wall} at a gate clear of
  {way}, {m} m off your line." → "{name} crosses {wall} where a gate can stand, {m} m off your line.";
* its source cell: "or crossing an enceinte's trace inside that strip (§2.7's way-and-channel table, row (b))" → "or
  crossing an enceinte's trace where §2.7's laws bar its gate there (law 1 (1), (5), (8); its worked example the
  way-and-channel table's row (b))"; "(§2.7's way-and-channel table, row (e))" → "(§2.7's laws, law 1 (1), (8); its
  worked example the way-and-channel table's row (e))"; and "— its crossing of a trace to the nearest clear of the
  under-deck strip —" → "— its crossing of a trace to the nearest at which §2.7's laws admit its gate —".
(The line cell's trigger and the source cell's outcome are this file's: they restate §7.1's row, which D1 rewrites.)

**V9-4 · `bend.raised.around` (V09 l. 2106; VF7-RDR-08)** — its source cell "(§7.1's `bend.raised.underSpan` row;
§2.7's way-and-channel table, row (e))" → "(§7.1's `bend.raised.underSpan` row; §2.7's laws, law 1 (8); its worked
example the way-and-channel table's row (e))".

**V9-5 · VF7-RDR-06 (FIX)** — `fate.reshaped` (V09 l. 2033): "its change by the fate's `change` (§5.4's `reshaped`
entry's)" → "its change by the fate's `change` (§7.1's `EditFate`, a `ReshapeChange` as §5.4's `reshaped` entry's
`reshape`)".

**V9-6 · VF7-RDR-10 (FIX)** — `effect.vault.removed` (V09 l. 2148), its line cell, after ""The arch vault under {way}
goes, with what is in it."" add " — or, where §2.7's laws come to read its span `open` (law 1 (8): a wall or anything
else across its strip), "The arch vault under {way} is removed while {met} lies across it; what stood in it is kept." —
`{met}` the thing across, its name, else its kind's word; the line taking its form by its cause". (The finding's
"closes" is written "is removed": the chamber is removed, not walled up.)

**V9-7 · VF7-TST-02 (FIX)** — T-V9-52 (V09 l. 4427): "and a road drawn across that wall there crosses it clear of the
strip, with `bend.raised.underSpan` in its wall form;" → "and a road drawn across that wall there — on a variant whose
aqueduct crosses merged there, or whose arch over the road clears the wall but not the gate's top — crosses it clear of
the strip, with `bend.raised.underSpan` in its wall form, and, where the crossing is over and the arch clears the gate
and the wall, a road drawn square under that span and passing the strip by §4.3's crossing rule makes its gate under
the arch, no bend (§2.7's laws, law 1 (2), (5), law 2 (a); its worked example the way-and-channel table's row (b));".
(", passing the strip by §4.3's crossing rule" is this file's, as at S9.)

**V9-8 · END for VF7-HND-02** — §4.20.2 (4) (V09 l. 3020–3023): "over it on one of its arches where its channel there
runs above the wall's top, its supports off the band and its spans clearing the wall, else merged into it, the wall
built up round its arch or pier and the water passing through —, never a gate, its course bent clear only of a gate,
postern, tower or fixed place its arches would not clear (§2.7's laws, law 1 (2), (5), (6), (10), law 2 (a);" → "over
it on one of its arches where its channel there runs above the wall's top, its supports off the band and its spans
clearing the wall, merged into it where its channel runs within the wall's height, the wall built up round its arch or
pier and the water passing through —, never a gate, a course that cannot cross so bent to the nearest course that can,
else refused (§2.7's laws, law 1 (2), (5), (6), (10), law 2 (a), (c);".

### V10

No work.

### V11

No work.

### V12

**V12-1 · VF7-RDR-01 (FIX)** — the `wall.ungated` metric cell (V12 l. 1167): "arterial ways crossing a curtain at no
gate" → "arterial ways on ground part 0 crossing a curtain at no gate (a way's `part` ≥ 1 never counted: a deck passing
over a curtain is no crossing, §2.7's laws, law 1 (1), (3); §5.3's gate row)"; and the reading rules (V12 l.
1128–1129), after "`wall.*`, `gate.count` and `wall.ungated` read `wall` features only, never `retaining`" add ";
`wall.ungated` reads ways of `part` 0 only (§2.7's laws, law 1 (1))". §13.5's half is S12.

**V12-2 · VF7-RDR-11 (FIX)** — E-V12-1's register line (V12 l. 2177): "— the strip, the ends, the zone and a held
building's strip of their terms —" → "— the strip, the ends and the zone of their terms (a span's strip and a held
building's strip read no margin) —".

## Builders' choices for fix-list.md

* **VF7-GEN-06** — base §4.2 S3 (7): the `Gate.kind` of a carried way's stage-1 gate (beside the N main gates, decked
  and counted as the harbour gate is) is `main`, not counted in N, or `water`, as the harbour gate's is — either read
  for its footprint from its own gatehouse row (§2.7's laws, law 1 (5)), the gate standing or the way re-routed by law 2
  *Carried way*.
* **VF7-RDR-07** — V09 §4.9's `bend.wall.raisedCrossing` and `bend.wall.aqueductArch` for one stroke meeting several
  raised ways: one line per raised way in its meeting's form, or one line for the first met with the rest among the dry
  run's effects; a gate the stroke makes for a ground way and moves along that way is worded in the stretch's
  keep-clear form either way.

## Held for the next full round

Outside the family; never graded here (the checks' held notes, each with its site).

1. (generation) Base §5.2 F-WALL (l. 9840) × §4.2 S3 (9)'s **Test** (l. 6264–6268) × §5.3's distance row (l. 9939):
   F-WALL's non-raised rung "re-offset with a larger radius" can move stage 1's trace more than 40 m from the boundary,
   and neither the Test nor the row excepts it (VF7-GEN-03's class).
2. (generation) Base §4.2 S3 (7) (l. 6214) × §5.3's way-and-trace row (l. 9924): each gate is a route's first point at
   `T = t_1`, but nothing states that a (5) route crosses `T = t_1` once; a later re-crossing would cross the trace with
   no gate.
3. (generation) Base §4.3 *Raised ways* (l. 6447–6449) × §2.7's support step (3) (l. 2551–2553): S3 (5) prices a raised
   stretch over a canal by span length alone, and S4's commit may drop it as `raised_too_long`, leaving a committed gate
   route without its crossing (raised way × channel).
4. (hand) V09 T-V9-52 (V09 l. 4427): "a carve across a viaduct passes beneath clear of its piers, with
   `bend.raised.underSpan`" names the bend key where row (e) and §7.1 bend only a drawn crossing that meets a support;
   the fixture does not say it does (raised way × channel).
5. (readers) V09 §4.20.8 (2) (V09 l. 3256–3258): a span selected in the hit stack carries the path `spans/<n>`, while
   §7.1's binding, V09 §4.20.6 (2) and V10's `span` row key a span `spans/<a>-<b>` (E-D15).
6. (readers) V09 T-V9-58 (V09 l. 4433) with §4.20.8 (2): the walled-up span's fixture needs the street under a
   neighbouring span within the hit radius, a street across a span keeping it `open` (law 1 (8)); it does not say so.
7. (readers) Base §4.5 *The casters* (l. 6871–6874) and §8.4's shadow casters (l. 14611–14612): "walls" and "curtain
   walls" cast with no word on a `breached` or `dismantled` run (item 114), which glTF and CityJSON draw as none; the
   model's daylight term may differ by builder.
8. (tests) Base §13.2 T101-4 (l. 19103–19104), §6.5 (9) (l. 10918–10919), §11.1's skeleton row (l. 16706): a skeleton's
   round trip reproduces its model digest only for a source whose declarations stand in its creation prefix, the
   lifecycle event block in the digest's identity layer being re-dated by the import.
9. (tests) Base §7.1's Regenerate (keep settings) (l. 11069–11070); §7.3 item 7 (iv), (vi) (l. 11779, 11797–11798):
   "byte-identical when nothing upstream changed" does not say which digest it compares, a re-derived scope writing
   lifecycle entries that cite the regenerate event's `seq` (the family's order fields leave the model digest by
   VF7-TST-04, D8).
